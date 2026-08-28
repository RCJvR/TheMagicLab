// Math Magician — Graad 12, Hoofstuk 1
// Rye en Reekse

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 100,
      chapter: 1,
      name: "Rekenkundige & meetkundige rye",
      fullName: "Rekenkundige rye, meetkundige rye, en hul algemene terme",
      lesson: {
        heading: "Rekenkundige en meetkundige rye",
        sub: "Hoofstuk 1 · Onderwerp 1",
        body: `
          <p>Graad 12-rye herbesoek rekenkundige (lineêre) rye van Graad 10, stel <strong>meetkundige rye</strong> bekend, en kulmineer in <strong>reekse</strong> (somme van rye).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Rekenkundige ry</div>
            <p>
              Konstante verskil <span class="math">d</span> tussen terme.<br>
              Algemene term: <span class="math">Tₙ = a + (n − 1)d</span><br>
              waar a = eerste term, d = gemeenskaplike verskil.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Meetkundige ry</div>
            <p>
              Konstante <strong>verhouding</strong> <span class="math">r</span> tussen opeenvolgende terme (<span class="math">r = Tₙ₊₁/Tₙ</span>).<br>
              Algemene term: <span class="math">Tₙ = a · rⁿ⁻¹</span><br>
              waar a = eerste term, r = gemeenskaplike verhouding (r ≠ 0, r ≠ 1).<br><br>
              As r > 1: meetkundige groei &nbsp;|&nbsp; As 0 &lt; r &lt; 1: meetkundige verval &nbsp;|&nbsp; As r &lt; 0: wisselende tekens
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeelde</div>
            <p><strong>Rekenkundig:</strong> 3, 7, 11, 15, … → a = 3, d = 4; T₁₀ = 3 + 9(4) = 39</p>
            <p><strong>Meetkundig:</strong> 2, 6, 18, 54, … → a = 2, r = 3; T₇ = 2 · 3⁶ = 1458</p>
            <p><strong>Meetkundige verval:</strong> 80, 40, 20, 10, … → a = 80, r = ½; T₆ = 80 · (½)⁵ = 2.5</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Vind r of d uit twee terme</div>
            <p>
              Rekenkundig: <span class="math">d = (Tₙ − Tₘ)/(n − m)</span><br>
              Meetkundig: <span class="math">rⁿ⁻ᵐ = Tₙ/Tₘ → r = (Tₙ/Tₘ)^(1/(n−m))</span>
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Ry-Term-Sakrekenaar</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g12c1arith" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Rekenkundig</button>
              <button id="g12c1geom" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Meetkundig</button>
            </div>
            <div id="g12c1arithP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Eerste term a</div><input id="g12c1aa" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gemeensk. verskil d</div><input id="g12c1ad" type="number" value="4" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vind Tₙ (n=)</div><input id="g12c1an" type="number" value="10" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1aBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g12c1geomP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Eerste term a</div><input id="g12c1ga" type="number" value="2" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Gemeensk. verh. r</div><input id="g12c1gr" type="number" value="3" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Vind Tₙ (n=)</div><input id="g12c1gn" type="number" value="7" min="1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1gBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
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
                if([a,d,n].some(isNaN)||n<1){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in.</span>';return;}
                const tn=a+(n-1)*d;
                const terms=Array.from({length:Math.min(n,8)},(_,i)=>a+i*d);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Tₙ = a + (n−1)d = '+a+' + ('+n+'−1)('+d+')</span><br>'+
                  '<span style="color:#6ee7b7;">T'+n+' = '+f(tn)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Eerste '+Math.min(n,8)+' terme: '+terms.map(f).join(', ')+(n>8?' …':'')+'</span>';
              });
              document.getElementById('g12c1gBtn').addEventListener('click',()=>{
                const a=gv('g12c1ga'),r=gv('g12c1gr'),n=gv('g12c1gn');
                if([a,r,n].some(isNaN)||n<1||r===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (r ≠ 0).</span>';return;}
                const tn=a*Math.pow(r,n-1);
                const terms=Array.from({length:Math.min(n,8)},(_,i)=>a*Math.pow(r,i));
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Tₙ = a·rⁿ⁻¹ = '+a+'·('+r+')^('+n+'−1)</span><br>'+
                  '<span style="color:#6ee7b7;">T'+n+' = '+f(tn)+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Eerste '+Math.min(n,8)+' terme: '+terms.map(f).join(', ')+(n>8?' …':'')+'</span>';
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
        { type: "mc", text: "Meetkundige ry: 4, 12, 36, … Vind T₅.", options: ["324", "108", "972", "432"], answer: 0, topic: "Rekenkundige & meetkundige rye" },
        { type: "input", text: "Rekenkundige ry: T₃ = 11 en T₇ = 27. Vind d.", answer: "4", topic: "Rekenkundige & meetkundige rye" },
        { type: "mc", text: "'n Meetkundige ry het T₂ = 6 en T₅ = 48. Vind r.", options: ["2", "3", "4", "8"], answer: 0, topic: "Rekenkundige & meetkundige rye" },
        { type: "mc", text: "Watter ry is meetkundig? ", options: ["1, 3, 5, 7, …", "2, 6, 18, 54, …", "1, 4, 9, 16, …", "3, 6, 9, 12, …"], answer: 1, topic: "Rekenkundige & meetkundige rye" },
        { type: "input", text: "Meetkundig: a = 5, r = −2. Vind T₄.", answer: "-40", altAnswers: ["−40"], topic: "Rekenkundige & meetkundige rye" },
        { type: "input", text: "Die 3de term van 'n meetkundige ry is 20 en die 6de term is 160. Vind die eerste term a.", answer: "5", topic: "Rekenkundige & meetkundige rye" }
      ]
    },
    {
      id: 101,
      chapter: 1,
      name: "Reekse — rekenkundig, meetkundig & oneindig",
      fullName: "Rekenkundige reekse, meetkundige reekse, sigma-notasie, en oneindige meetkundige reekse",
      lesson: {
        heading: "Reekse: somme van rye",
        sub: "Hoofstuk 1 · Onderwerp 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Sigma-notasie</div>
            <p>
              <span class="math">Σᵢ₌₁ⁿ Tᵢ</span> beteken "tel die ry op van term 1 tot term n".<br>
              Voorbeeld: <span class="math">Σᵢ₌₁⁵ (2i + 1) = 3 + 5 + 7 + 9 + 11 = 35</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Som van 'n rekenkundige reeks</div>
            <p>
              <span class="math">Sₙ = n/2 · (2a + (n−1)d)</span> &nbsp; of ekwivalent &nbsp; <span class="math">Sₙ = n/2 · (a + l)</span><br>
              waar l = laaste term = Tₙ
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Som van 'n meetkundige reeks</div>
            <p>
              <span class="math">Sₙ = a(rⁿ − 1)/(r − 1)</span> as r ≠ 1 &nbsp; (gebruik die r > 1-vorm)<br>
              of <span class="math">Sₙ = a(1 − rⁿ)/(1 − r)</span> (gebruik die 0 &lt; r &lt; 1-vorm)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Oneindige meetkundige reeks (|r| &lt; 1)</div>
            <p>
              Wanneer |r| &lt; 1, konvergeer die reeks:<br>
              <span class="math">S∞ = a/(1 − r)</span><br>
              As |r| ≥ 1, divergeer die reeks (geen eindige som nie).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeelde</div>
            <p><strong>Rekenkundige S₁₀:</strong> a = 3, d = 4 → S₁₀ = 10/2 · (6 + 36) = 5 · 42 = 210</p>
            <p><strong>Meetkundige S₆:</strong> a = 2, r = 3 → S₆ = 2(3⁶−1)/(3−1) = 2(728)/2 = 728</p>
            <p><strong>Oneindig:</strong> a = 8, r = ½ → S∞ = 8/(1 − ½) = 16</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Reeks-Som-Sakrekenaar</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g12c1sarith" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Rekenkundige Sₙ</button>
              <button id="g12c1sgeom" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Meetkundige Sₙ</button>
              <button id="g12c1sinf" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Oneindige S∞</button>
            </div>
            <div id="g12c1sarithP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c1saa" type="number" value="3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">d</div><input id="g12c1sad" type="number" value="4" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n terme</div><input id="g12c1san" type="number" value="10" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1saBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g12c1sgeomP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c1sga" type="number" value="2" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r</div><input id="g12c1sgr" type="number" value="3" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">n terme</div><input id="g12c1sgn" type="number" value="6" min="1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1sgBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
            </div>
            <div id="g12c1sinfP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">a</div><input id="g12c1sia" type="number" value="8" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">r (|r|&lt;1)</div><input id="g12c1sir" type="number" value="0.5" step="0.01" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1siBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Bereken</button>
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
                if([a,d,n].some(isNaN)||n<1){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in.</span>';return;}
                const sn=n/2*(2*a+(n-1)*d);
                const tn=a+(n-1)*d;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Sₙ = n/2·(2a+(n−1)d) = '+n+'/2·('+2*a+'+'+(n-1)+'×'+d+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">T'+n+' (laaste term) = '+f(tn)+'</span><br>'+
                  '<span style="color:#6ee7b7;">S'+n+' = '+f(sn)+'</span>';
              });
              document.getElementById('g12c1sgBtn').addEventListener('click',()=>{
                const a=gv('g12c1sga'),r=gv('g12c1sgr'),n=gv('g12c1sgn');
                if([a,r,n].some(isNaN)||n<1||r===1||r===0){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in (r ≠ 0, r ≠ 1).</span>';return;}
                const sn=a*(Math.pow(r,n)-1)/(r-1);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Sₙ = a(rⁿ−1)/(r−1) = '+a+'·(('+r+')^'+n+'−1)/('+r+'−1)</span><br>'+
                  '<span style="color:#6ee7b7;">S'+n+' = '+f(sn)+'</span>';
              });
              document.getElementById('g12c1siBtn').addEventListener('click',()=>{
                const a=gv('g12c1sia'),r=gv('g12c1sir');
                if([a,r].some(isNaN)){out.innerHTML='<span style="color:#fca5a5;">Voer geldige waardes in.</span>';return;}
                if(Math.abs(r)>=1){out.innerHTML='<span style="color:#fca5a5;">|r| moet kleiner as 1 wees sodat die reeks kan konvergeer.</span>';return;}
                const sinf=a/(1-r);
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">|r| = '+Math.abs(r)+' < 1 → reeks konvergeer</span><br>'+
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
        { type: "mc", text: "Rekenkundige reeks: a = 5, d = 3, n = 10. Vind S₁₀.", options: ["185", "170", "200", "150"], answer: 0, topic: "Reekse — rekenkundig, meetkundig & oneindig" },
        { type: "input", text: "Meetkundige reeks: a = 3, r = 2, n = 5. Vind S₅.", answer: "93", topic: "Reekse — rekenkundig, meetkundig & oneindig" },
        { type: "mc", text: "Oneindige meetkundige reeks: a = 12, r = ⅓. Vind S∞.", options: ["18", "24", "36", "6"], answer: 0, topic: "Reekse — rekenkundig, meetkundig & oneindig" },
        { type: "mc", text: "Σᵢ₌₁⁴ (3i) = ", options: ["30", "24", "36", "42"], answer: 0, topic: "Reekse — rekenkundig, meetkundig & oneindig" },
        { type: "mc", text: "Vir watter waarde van r konvergeer 'n oneindige meetkundige reeks?", options: ["r = 1", "r = −2", "r = 0.8", "r = −1.1"], answer: 2, topic: "Reekse — rekenkundig, meetkundig & oneindig" },
        { type: "input", text: "Die som van die eerste n terme van 'n rekenkundige reeks is Sₙ = 4n² + 3n. Vind die 5de term (T₅).", answer: "39", topic: "Reekse — rekenkundig, meetkundig & oneindig" }
      ]
    },
    {
      id: 102,
      chapter: 1,
      name: "Sigma-notasie & getalpatrone",
      fullName: "Werk met sigma-notasie, algemene terme van patrone, en manipulering van reekse",
      lesson: {
        heading: "Sigma-notasie en getalpatrone",
        sub: "Hoofstuk 1 · Onderwerp 3",
        body: `
          <p>Voordat jy 'n reeks kan optel, help dit om heeltemal vaardig te wees in die <strong>lees, skryf en manipulering van sigma-notasie</strong>, en om die algemene term van 'n getalpatroon te herken wat nie voor die hand liggend rekenkundig of meetkundig is nie.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Lees van sigma-notasie</div>
            <p>
              <span class="math">Σᵢ₌₁ⁿ Tᵢ</span> vertel jou: die <strong>veranderlike</strong> (i), die <strong>begin­waarde</strong> (1), die <strong>eind­waarde</strong> (n), en die <strong>formule</strong> vir elke term (Tᵢ).<br><br>
              Aantal terme in die som = (boonste waarde) − (onderste waarde) + 1.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Skryf van 'n reeks in sigma-notasie</div>
            <p>
              Gegee 'n reeks, bepaal eers of dit rekenkundig of meetkundig is, vind die algemene term Tₙ, en skryf dan:<br>
              <span class="math">Σₙ₌₁ᵏ Tₙ</span> waar k die aantal terme is.<br><br>
              Voorbeeld: 5 + 8 + 11 + … + 32 → rekenkundig, a=5, d=3, Tₙ = 3n+2. Aangesien T₁₀=32, is dit <span class="math">Σₙ₌₁¹⁰ (3n+2)</span>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Voorbeelde</div>
            <p><strong>Evalueer:</strong> Σᵢ₌₃⁶ (i² − 1) = (9−1)+(16−1)+(25−1)+(36−1) = 8+15+24+35 = 82</p>
            <p><strong>Splits 'n som:</strong> Σᵢ₌₁ⁿ (2i + 3) = 2Σᵢ₌₁ⁿ i + Σᵢ₌₁ⁿ 3 = 2·[n(n+1)/2] + 3n = n(n+1) + 3n = n² + 4n</p>
            <p><strong>Grootste n sodat 'n som onder 'n grens bly:</strong> word dikwels opgelos deur Sₙ in terme van n te skryf en 'n ongelykheid op te los, bv. vind die grootste n waarvoor 3 + 7 + 11 + … (n terme) &lt; 400 → los op n/2(6+(n−1)4) &lt; 400.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Nie-lineêre patrone</div>
            <p>As eerste verskille nie konstant is nie, probeer <strong>tweede verskille</strong> — as dié konstant is, is die patroon kwadraties: Tₙ = an² + bn + c. Gebruik drie vergelykings (uit T₁, T₂, T₃) om a, b, c op te los.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Sigma-Notasie-Evalueerder</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Evalueer Σ vir 'n termformule van die vorm <strong>An² + Bn + C</strong> vanaf n=begin tot n=einde.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">A (n²)</div><input id="g12c1sigA" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">B (n)</div><input id="g12c1sigB" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">C (konst.)</div><input id="g12c1sigC" type="number" value="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">begin</div><input id="g12c1sigS" type="number" value="1" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">einde</div><input id="g12c1sigE" type="number" value="5" min="0" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1sigBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Evalueer</button>
            </div>
            <div id="g12c1sigOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const A=gv('g12c1sigA'),B=gv('g12c1sigB'),C=gv('g12c1sigC'),s=gv('g12c1sigS'),e=gv('g12c1sigE');
                const out=document.getElementById('g12c1sigOut');
                if([A,B,C,s,e].some(isNaN)||s>e||!Number.isInteger(s)||!Number.isInteger(e)){out.innerHTML='<span style="color:#fca5a5;">Voer heelgetal-begin ≤ einde en geldige koëffisiënte in.</span>';return;}
                let terms=[],sum=0;
                for(let n=s;n<=e;n++){const t=A*n*n+B*n+C;terms.push(t);sum+=t;}
                const shown=terms.slice(0,8).map(t=>parseFloat(t.toFixed(4)));
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Terme (n='+s+' tot '+e+'): '+shown.join(', ')+(terms.length>8?' …':'')+'</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">Aantal terme = '+(e-s+1)+'</span><br>'+
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
        { type: "input", text: "Evalueer: Σᵢ₌₁⁴ (2i + 1)", answer: "24", topic: "Sigma-notasie & getalpatrone" },
        { type: "mc", text: "Σᵢ₌₁ⁿ (2i + 3) vereenvoudig tot:", options: ["n² + 4n", "n² + 3n", "2n² + 3", "n(n+3)"], answer: 0, topic: "Sigma-notasie & getalpatrone" },
        { type: "mc", text: "Die reeks 4 + 9 + 14 + … + 49 in sigma-notasie geskryf (met Tₙ = 5n − 1) is:", options: ["Σₙ₌₁¹⁰ (5n − 1)", "Σₙ₌₁⁹ (5n − 1)", "Σₙ₌₀⁹ (5n − 1)", "Σₙ₌₁⁴⁹ (5n − 1)"], answer: 0, topic: "Sigma-notasie & getalpatrone" },
        { type: "input", text: "'n Kwadratiese getalpatroon het eerste verskille 4, 7, 10, … Vind die tweede verskil.", answer: "3", topic: "Sigma-notasie & getalpatrone" },
        { type: "mc", text: "Hoeveel terme is daar in Σₖ₌₅¹² Tₖ?", options: ["7", "8", "12", "17"], answer: 1, topic: "Sigma-notasie & getalpatrone" },
        { type: "mc", text: "Vind die grootste n sodat 3 + 7 + 11 + … (n terme) < 200.", options: ["9", "10", "11", "12"], answer: 0, topic: "Sigma-notasie & getalpatrone" },
        { type: "input", text: "'n Kwadratiese getalpatroon het terme T₁ = 2, T₂ = 7, T₃ = 16, T₄ = 29. Gebruik tweede verskille om T₅ te vind.", answer: "46", topic: "Sigma-notasie & getalpatrone" }
      ]
    },
    {
      id: 103,
      chapter: 1,
      name: "Aflei van reeksformules & toepassings",
      fullName: "Aflei van die rekenkundige en meetkundige reeksformules, en toepassing van reekse in werklike kontekste",
      lesson: {
        heading: "Aflei en toepas van reeksformules",
        sub: "Hoofstuk 1 · Onderwerp 4",
        body: `
          <p>CAPS vereis spesifiek dat jy die rekenkundige en meetkundige reeksformules kan <strong>aflei</strong> (nie net gebruik nie) — dit is op sy eie eksamineerbaar.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Aflei van die rekenkundige reeksformule</div>
            <p>
              Skryf Sₙ voorwaarts en agterwaarts, en tel dan die twee rye op:<br>
              <span class="math">Sₙ = a + (a+d) + (a+2d) + … + (a+(n−1)d)</span><br>
              <span class="math">Sₙ = (a+(n−1)d) + (a+(n−2)d) + … + a</span><br>
              Optelling: <span class="math">2Sₙ = n·[2a + (n−1)d]</span> → <span class="math">Sₙ = n/2·[2a + (n−1)d]</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Aflei van die meetkundige reeksformule</div>
            <p>
              Skryf Sₙ, vermenigvuldig dan die hele vergelyking met r, en trek af:<br>
              <span class="math">Sₙ = a + ar + ar² + … + arⁿ⁻¹</span><br>
              <span class="math">rSₙ = ar + ar² + … + arⁿ⁻¹ + arⁿ</span><br>
              Aftrekking: <span class="math">Sₙ − rSₙ = a − arⁿ → Sₙ(1−r) = a(1−rⁿ) → Sₙ = a(1−rⁿ)/(1−r)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Aflei van die oneindige som (konvergensievoorwaarde)</div>
            <p>
              Soos n → ∞, as <span class="math">−1 &lt; r &lt; 1</span>, dan <span class="math">rⁿ → 0</span>, dus:<br>
              <span class="math">S∞ = a(1 − 0)/(1 − r) = a/(1 − r)</span><br><br>
              Dit is waarom die voorwaarde vir konvergensie streng <span class="math">−1 &lt; r &lt; 1</span> is (ekwivalent |r| &lt; 1) — vir enige ander r, streef rⁿ nie na 0 nie.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Toepassings</div>
            <p><strong>Herhalende desimaal as 'n reeks:</strong> 0,999... = 9/10 + 9/100 + 9/1000 + … is meetkundig met a=9/10, r=1/10.<br>
            S∞ = (9/10)/(1 − 1/10) = (9/10)/(9/10) = 1. Dus 0,999... = 1 presies.</p>
            <p><strong>Stuiterbal / herhalende halvering-kontekste</strong> gebruik die oneindige meetkundige som sodra jy die herhalende verhouding herken.</p>
          </div>

          <div class="tip-box">
            <div class="tip-box-title">💡 Eksamenwenk</div>
            <p>"Lei af"- of "bewys"-vrae verwag dat jy die voorwaarts/agterwaarts-optel-tegniek (rekenkundig) of vermenigvuldig-met-r-en-aftrek-tegniek (meetkundig) toon — om net die finale formule aan te haal, verdien geen punte nie.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Herhalende Desimaal → Breuk Omskakelaar</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Voer die herhalende syferblok in en sien dit uitgedruk as 'n oneindige meetkundige reeks wat omgeskakel is na 'n breuk.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Herhalende syfers (bv. 3, 27, 142)</div><input id="g12c1recD" type="text" value="27" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c1recBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Skakel om</button>
            </div>
            <div id="g12c1recOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){[x,y]=[y,x%y];}return x;}
              function calc(){
                const raw=document.getElementById('g12c1recD').value.trim();
                const out=document.getElementById('g12c1recOut');
                if(!/^[0-9]+$/.test(raw)){out.innerHTML='<span style="color:#fca5a5;">Voer slegs syfers in, bv. 27.</span>';return;}
                const k=raw.length;
                const a=parseInt(raw)/Math.pow(10,k);
                const r=1/Math.pow(10,k);
                const num=parseInt(raw),den=Math.pow(10,k)-1;
                const g=gcd(num,den);
                const sn=num/g,sd=den/g;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">0,'+raw+raw+raw+'... = '+a.toFixed(k)+' + '+a.toFixed(k)+'×(1/'+Math.pow(10,k)+') + …  (a='+a.toFixed(k)+', r=1/'+Math.pow(10,k)+')</span><br>'+
                  '<span style="color:rgba(221,225,240,0.50);">S∞ = a/(1−r) = '+num+'/'+den+'</span><br>'+
                  '<span style="color:#6ee7b7;">= '+sn+'/'+sd+' (vereenvoudig)</span>';
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
        { type: "mc", text: "Om Sₙ vir 'n rekenkundige reeks af te lei, is die sleuteltegniek om:", options: ["Sₙ voorwaarts en agterwaarts te skryf, en dan op te tel", "Sₙ met r te vermenigvuldig en af te trek", "Logaritmes van albei kante te neem", "Sₙ te differensieer"], answer: 0, topic: "Aflei van reeksformules & toepassings" },
        { type: "mc", text: "Om Sₙ vir 'n meetkundige reeks af te lei, vermenigvuldig ons Sₙ met r en dan:", options: ["Tel die twee vergelykings op", "Trek die twee vergelykings af", "Deel die twee vergelykings", "Neem die vierkantswortel"], answer: 1, topic: "Aflei van reeksformules & toepassings" },
        { type: "mc", text: "Die voorwaarde vir 'n oneindige meetkundige reeks om te konvergeer, is:", options: ["r > 1", "r < 0", "−1 < r < 1", "r = 0"], answer: 2, topic: "Aflei van reeksformules & toepassings" },
        { type: "input", text: "Druk 0,555... uit as 'n breuk deur die oneindige meetkundige reeks te gebruik (a=0.5, r=0.1).", answer: "5/9", topic: "Aflei van reeksformules & toepassings" },
        { type: "mc", text: "Soos n → ∞ met −1 < r < 1, streef rⁿ na:", options: ["1", "r", "0", "∞"], answer: 2, topic: "Aflei van reeksformules & toepassings" },
        { type: "input", text: "Druk 0,181818... uit as 'n breuk in eenvoudigste vorm.", answer: "2/11", topic: "Aflei van reeksformules & toepassings" },
        { type: "input", text: "'n Meetkundige reeks het a = 9 en S∞ = 12. Vind r.", answer: "1/4", topic: "Aflei van reeksformules & toepassings" }
      ]
    }
  ],
  workbook: {
    title: "Hoofstuk 1 Werkboek — Rye en Reekse",
    questions: [
      { number: 1, text: "'n Rekenkundige ry het T₄ = 19 en T₉ = 44.", parts: [
        { label: "a", text: "Vind d en a.", marks: 4 },
        { label: "b", text: "Vind T₂₀.", marks: 2 },
        { label: "c", text: "Vind S₂₀.", marks: 3 }
      ]},
      { number: 2, text: "'n Meetkundige ry het T₂ = 6 en T₄ = 54.", parts: [
        { label: "a", text: "Vind r en a.", marks: 4 },
        { label: "b", text: "Vind S₆.", marks: 3 },
        { label: "c", text: "Konvergeer die oneindige reeks? Waarom?", marks: 2 }
      ]},
      { number: 3, text: "Evalueer: Σₖ₌₁¹⁰ (4k − 1)", parts: [
        { label: "a", text: "Skryf die eerste 3 terme uit en identifiseer die tipe reeks.", marks: 2 },
        { label: "b", text: "Evalueer die som.", marks: 3 }
      ]},
      { number: 4, text: "'n Bal word van 10 m af laat val. Elke stuiter bereik 60% van die vorige hoogte.", parts: [
        { label: "a", text: "Skryf die ry van stuiterhoogtes.", marks: 2 },
        { label: "b", text: "Vind die totale afstand afgelê (insluitend al die op- en af-stuiters).", marks: 4 }
      ]},
      { number: 5, text: "'n Spaarrekening se saldo word aan die einde van elke jaar aangeteken, soos in die tabel hieronder getoon:<br><table style='border-collapse:collapse;font-family:monospace;font-size:12px;margin-top:6px;'><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Jaar (n)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>2</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>4</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><th style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>Saldo (R)</th><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 050,00</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 102,50</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 157,63</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 215,51</td><td style='padding:4px 10px;border:1px solid rgba(255,255,255,0.15);'>1 276,28</td></tr></table>", parts: [
        { label: "a", text: "Gebruik twee opeenvolgende saldo's uit die tabel om die gemeenskaplike verhouding r te bepaal.", marks: 2 },
        { label: "b", text: "Skryf die algemene term Tₙ vir hierdie ry neer in die vorm Tₙ = a·rⁿ.", marks: 2 },
        { label: "c", text: "Gebruik jou formule om die saldo aan die einde van jaar 10 te voorspel (tot die naaste sent).", marks: 3 }
      ]}
    ],
    answers: {
      1: { a: "d=(44−19)/5=5; a=19−3(5)=4", b: "T₂₀=4+19(5)=99", c: "S₂₀=20/2·(8+95)=10·103=1030" },
      2: { a: "r²=54/6=9→r=3; a=6/3=2", b: "S₆=2(3⁶−1)/2=728", c: "r=3>1 → divergeer, geen oneindige som nie" },
      3: { a: "3, 7, 11, … rekenkundige reeks, a=3, d=4", b: "S₁₀=10/2·(6+36)=210" },
      4: { a: "6, 3.6, 2.16, … meetkundig r=0.6", b: "Af: 10+10(0.6)+10(0.6)²+…=10/(1−0.6)=25m; Op: dieselfde vanaf 6m=6/(1−0.6)=15m; Totaal=10+2(15)=40m" },
      5: {
        a: "r = 1102,50 ÷ 1050,00 = 1,05",
        b: "a = 1000 (die deposito voor rente); Tₙ = 1000(1,05)ⁿ",
        c: "T₁₀ = 1000(1,05)¹⁰ ≈ R1 628,89"
      }
    }
  }
});
