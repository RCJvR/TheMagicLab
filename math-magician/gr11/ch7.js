// Math Magician — Grade 11, Chapter 7
// Measurement (advanced)

MathMagician.registerChapter(7, {
  topics: [
    {
      id: 700,
      chapter: 7,
      name: "Surface area of complex solids",
      fullName: "Surface area of pyramids, cones, spheres, and combinations",
      lesson: {
        heading: "Surface area of complex solids",
        sub: "Chapter 7 · Topic 1",
        body: `
          <p>Grade 11 Measurement revisits 3D shapes with greater rigour and introduces combination solids.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Surface area formulae (recap)</div>
            <p>
              <strong>Right prism:</strong> SA = 2 × base area + lateral area<br>
              <strong>Cylinder:</strong> SA = 2πr² + 2πrh<br>
              <strong>Cone:</strong> SA = πr² + πrl, where l = slant height = √(r² + h²)<br>
              <strong>Sphere:</strong> SA = 4πr²<br>
              <strong>Square pyramid:</strong> SA = b² + 4(½ × b × l)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Combination solid</div>
            <p>Cylinder (r = 4, h = 10) with hemisphere on top.<br>
            Cylinder SA (no top): 2π(4)² + 2π(4)(10) − π(4)² = π(16 + 80 − 16) ... wait:<br>
            — Bottom circle: π(4)² = 16π<br>
            — Curved cylinder: 2π(4)(10) = 80π<br>
            — Hemisphere: 2π(4)² = 32π (curved surface only)<br>
            Total = 16π + 80π + 32π = 128π ≈ 402.1 cm²</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Combination solids — key idea</div>
            <p>
              For a solid made from two shapes joined together:<br>
              SA = SA of shape 1 + SA of shape 2 − 2 × (area of the joined face)<br>
              (The joined face is hidden from both shapes)
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Combination Solid SA Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Select a combination — enter dimensions — get the total external surface area.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Combination</div>
                <select id="g11c7combo" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="cylhem">Cylinder + Hemisphere on top</option>
                  <option value="cylcone">Cylinder + Cone on top</option>
                  <option value="cubesphere">Cube − inscribed sphere removed</option>
                </select>
              </div>
              <div id="g11c7inputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="g11c7Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate SA</button>
            </div>
            <div id="g11c7Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function f(n){return n.toFixed(2);}
              function inp(id,label,val){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              function build(){
                const c=document.getElementById('g11c7combo').value;
                const d=document.getElementById('g11c7inputs');
                if(c==='cylhem') d.innerHTML=inp('g11c7r','Radius r','4')+inp('g11c7h','Cyl. height h','10');
                else if(c==='cylcone') d.innerHTML=inp('g11c7r','Radius r','5')+inp('g11c7h','Cyl. height h','8')+inp('g11c7ch','Cone height','3');
                else d.innerHTML=inp('g11c7s','Cube side a','10');
                ['g11c7r','g11c7h','g11c7ch','g11c7s'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              }
              function calc(){
                const c=document.getElementById('g11c7combo').value;
                const out=document.getElementById('g11c7Out');
                let html='';
                if(c==='cylhem'){
                  const r=gv('g11c7r'),h=gv('g11c7h');
                  if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                  const bottom=π*r*r,curved=2*π*r*h,hemi=2*π*r*r;
                  const total=bottom+curved+hemi;
                  html='<span style="color:rgba(221,225,240,0.50);">Bottom circle: πr² = '+f(bottom)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Curved cylinder: 2πrh = '+f(curved)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Hemisphere (curved only): 2πr² = '+f(hemi)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">Total SA = '+f(total)+' units²</span>';
                } else if(c==='cylcone'){
                  const r=gv('g11c7r'),h=gv('g11c7h'),ch=gv('g11c7ch');
                  if([r,h,ch].some(isNaN)||[r,h,ch].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                  const l=Math.sqrt(r*r+ch*ch);
                  const bottom=π*r*r,curved=2*π*r*h,coneSA=π*r*l;
                  const total=bottom+curved+coneSA;
                  html='<span style="color:rgba(221,225,240,0.50);">Slant height l = √('+r+'²+'+ch+'²) = '+f(l)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Bottom: πr² = '+f(bottom)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Cylinder curved: 2πrh = '+f(curved)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">Cone lateral: πrl = '+f(coneSA)+'</span><br>';
                  html+='<span style="color:#6ee7b7;">Total SA = '+f(total)+' units²</span>';
                } else {
                  const s=gv('g11c7s');
                  if(isNaN(s)||s<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive side length.</span>';return;}
                  const cubeSA=6*s*s;
                  html='<span style="color:rgba(221,225,240,0.50);">Cube SA = 6a² = '+f(cubeSA)+'</span><br>';
                  html+='<span style="color:rgba(221,225,240,0.50);">(Note: removing a sphere from inside doesn\'t change external SA)</span><br>';
                  html+='<span style="color:#6ee7b7;">External SA = '+f(cubeSA)+' units²</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g11c7combo').addEventListener('change',()=>{build();});
              document.getElementById('g11c7Btn').addEventListener('click',calc);
              build();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>When two solids share a face, subtract that circular area <strong>twice</strong> (once from each solid's SA). The shared face is internal and not part of the external surface.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A cone has r = 5 cm and h = 12 cm. Slant height l =",
          options: ["13 cm", "17 cm", "7 cm", "√119 cm"],
          answer: 0,
          topic: "Surface area of complex solids"
        },
        {
          type: "input",
          text: "Total SA of a sphere with r = 6 cm (in terms of π).",
          answer: "144π",
          topic: "Surface area of complex solids"
        },
        {
          type: "mc",
          text: "A closed cylinder has r = 3 and h = 7. SA =",
          options: ["60π", "42π", "66π", "48π"],
          answer: 0,
          topic: "Surface area of complex solids"
        },
        {
          type: "mc",
          text: "A square pyramid has base 6 cm and slant height 5 cm. SA =",
          options: ["96 cm²", "60 cm²", "132 cm²", "72 cm²"],
          answer: 0,
          topic: "Surface area of complex solids"
        },
        {
          type: "mc",
          text: "A hemisphere is placed on top of a cylinder. Which surface is excluded from the total SA?",
          options: ["The curved cylinder surface", "The flat circular face shared between them", "The bottom circle", "None — all surfaces are included"],
          answer: 1,
          topic: "Surface area of complex solids"
        }
      ]
    },
    {
      id: 701,
      chapter: 7,
      name: "Volume & the effect of scale factor k",
      fullName: "Volume of solids and the effect of multiplying dimensions by k",
      lesson: {
        heading: "Volume and the scale factor effect",
        sub: "Chapter 7 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Volume formulae</div>
            <p>
              <strong>Prism/Cylinder:</strong> V = base area × height<br>
              <strong>Pyramid/Cone:</strong> V = ⅓ × base area × height<br>
              <strong>Sphere:</strong> V = (4/3)πr³
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effect of multiplying a dimension by k</div>
            <p>
              Multiplying <em>one</em> linear dimension by k:<br>
              Length → k × original length<br>
              Area → k × original area (linear, not squared)<br>
              Volume → k × original volume<br><br>
              Multiplying <em>all</em> dimensions by k (similar enlargement):<br>
              Length → k<br>
              Surface area → k²<br>
              Volume → k³
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Scale factor k = 3</div>
            <p>If a box has SA = 54 cm² and V = 27 cm³, and all dimensions are tripled:<br>
            New SA = 9 × 54 = 486 cm²<br>
            New V = 27 × 27 = 729 cm³</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Only one dimension doubled?</div>
            <p>
              Cylinder V = πr²h. If only h is doubled: new V = πr²(2h) = 2V → doubles.<br>
              If only r is doubled: new V = π(2r)²h = 4πr²h = 4V → quadruples.<br>
              <em>Be specific</em> about which dimension changes!
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Volume & Scale Factor Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Calculate volume, then see how scale factor k affects SA and V.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Shape</div>
                <select id="g11c7t2shape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="sphere">Sphere</option>
                  <option value="cylinder">Cylinder</option>
                  <option value="cone">Cone</option>
                  <option value="cube">Cube</option>
                </select>
              </div>
              <div id="g11c7t2inputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Scale factor k</div>
                <input id="g11c7t2k" type="number" value="2" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g11c7t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c7t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function f(n){return n.toFixed(3);}
              function inp(id,label,val){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              function build(){
                const s=document.getElementById('g11c7t2shape').value;
                const d=document.getElementById('g11c7t2inputs');
                if(s==='sphere') d.innerHTML=inp('g11c7t2r','Radius r','5');
                else if(s==='cylinder') d.innerHTML=inp('g11c7t2r','Radius r','4')+inp('g11c7t2h','Height h','8');
                else if(s==='cone') d.innerHTML=inp('g11c7t2r','Radius r','3')+inp('g11c7t2h','Height h','4');
                else d.innerHTML=inp('g11c7t2a','Side a','6');
                ['g11c7t2r','g11c7t2h','g11c7t2a','g11c7t2k'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              }
              function calc(){
                const s=document.getElementById('g11c7t2shape').value;
                const k=gv('g11c7t2k');
                const out=document.getElementById('g11c7t2Out');
                if(isNaN(k)||k<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a positive scale factor.</span>';return;}
                let V,sa,label;
                if(s==='sphere'){const r=gv('g11c7t2r');if(isNaN(r)||r<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive radius.</span>';return;}V=(4/3)*π*r*r*r;sa=4*π*r*r;label='r='+r;}
                else if(s==='cylinder'){const r=gv('g11c7t2r'),h=gv('g11c7t2h');if([r,h].some(isNaN)||[r,h].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}V=π*r*r*h;sa=2*π*r*(r+h);label='r='+r+', h='+h;}
                else if(s==='cone'){const r=gv('g11c7t2r'),h=gv('g11c7t2h');if([r,h].some(isNaN)||[r,h].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}const l=Math.sqrt(r*r+h*h);V=(1/3)*π*r*r*h;sa=π*r*(r+l);label='r='+r+', h='+h;}
                else{const a=gv('g11c7t2a');if(isNaN(a)||a<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive side.</span>';return;}V=a*a*a;sa=6*a*a;label='a='+a;}
                const newV=V*k*k*k,newSA=sa*k*k;
                let html='<span style="color:rgba(221,225,240,0.50);">Original ('+s+', '+label+')</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Volume V = '+f(V)+'</span>   <span style="color:rgba(221,225,240,0.50);">Surface Area = '+f(sa)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Scale factor k = '+k+' → SA × k² = × '+f(k*k)+'   V × k³ = × '+f(k*k*k)+'</span><br>';
                html+='<span style="color:#fcd34d;">New SA = '+f(newSA)+'</span>   <span style="color:#6ee7b7;">New V = '+f(newV)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c7t2shape').addEventListener('change',()=>{build();});
              document.getElementById('g11c7t2Btn').addEventListener('click',calc);
              build();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "All dimensions of a solid are halved. Its volume becomes:",
          options: ["1/2 of original", "1/4 of original", "1/8 of original", "1/16 of original"],
          answer: 2,
          topic: "Volume & the effect of scale factor k"
        },
        {
          type: "input",
          text: "Cone: r = 3 cm, h = 4 cm. Find volume in terms of π.",
          answer: "12π",
          topic: "Volume & the effect of scale factor k"
        },
        {
          type: "mc",
          text: "A sphere's radius is doubled. Its surface area increases by factor:",
          options: ["2", "4", "8", "16"],
          answer: 1,
          topic: "Volume & the effect of scale factor k"
        },
        {
          type: "mc",
          text: "If the height of a cylinder is tripled (radius unchanged), the volume:",
          options: ["Triples", "Increases by 9×", "Doubles", "Increases by 27×"],
          answer: 0,
          topic: "Volume & the effect of scale factor k"
        },
        {
          type: "input",
          text: "V of a sphere with r = 3 cm (to 2 decimal places, use π ≈ 3.14159).",
          answer: "113.10",
          altAnswers: ["113.1"],
          topic: "Volume & the effect of scale factor k"
        }
      ]
    },
    {
      id: 702,
      chapter: 7,
      name: "Composite shapes in context",
      fullName: "Solving practical, real-world problems involving multiple composite 2D and 3D shapes",
      lesson: {
        heading: "Composite shapes in context",
        sub: "Chapter 7 · Topic 3",
        body: `
          <p>CAPS requires you to apply the surface area and volume formulae to <strong>real, practical problems</strong> — tanks, silos, packaging, building materials — where a single object is made of several joined shapes, and you must reason about which faces are "real" (painted, filled, exposed) and which are internal.</p>

          <div class="def-box">
            <div class="def-box-title">📖 A practical problem-solving checklist</div>
            <p>
              1. Sketch (or imagine) the solid and label every shape that makes it up.<br>
              2. Decide: do you need surface area (paint, material, wrapping) or volume (capacity, contents, cost of filling)?<br>
              3. Identify shared/internal faces that must be <em>excluded</em> from surface area.<br>
              4. Convert units consistently (e.g. cm³ → litres: 1000 cm³ = 1 ℓ) before answering.<br>
              5. Round sensibly for the context (money, materials) but keep full accuracy mid-calculation.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Silo capacity</div>
            <p>A grain silo is a cylinder (r = 3 m, h = 6 m) topped with a cone (same radius, height 2 m).<br>
            Volume = cylinder + cone = π(3)²(6) + ⅓π(3)²(2) = 54π + 6π = 60π ≈ 188.5 m³<br>
            In litres: 188.5 m³ × 1000 = 188 496 ℓ (using more accurate π)</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Material and cost</div>
            <p>An open-top rectangular water tank (no lid) is 2 m × 1.5 m × 1 m. Sheet metal costs R185/m².<br>
            Surface area (base + 4 sides, no top) = (2×1.5) + 2(2×1) + 2(1.5×1) = 3 + 4 + 3 = 10 m²<br>
            Cost = 10 × R185 = R1 850</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Always re-read the question to check whether a lid/base/top is included — "open tank" or "no lid" means you must subtract that face from the total surface area.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Unit Conversion & Cost Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Convert a volume to litres, or find material cost from an area and a price per m².</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
              <button id="g11c7t3vol" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.50);cursor:pointer;font-size:13px;font-weight:600;background:rgba(99,102,241,0.30);color:#a5b4fc;">Volume → Litres</button>
              <button id="g11c7t3cost" style="padding:6px 14px;border-radius:6px;border:1px solid rgba(99,102,241,0.20);cursor:pointer;font-size:13px;font-weight:600;background:transparent;color:rgba(221,225,240,0.50);">Area → Cost</button>
            </div>
            <div id="g11c7t3volP" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Volume (cm³)</div><input id="g11c7t3v" type="number" value="5000" min="0" style="width:100px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c7t3volBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Convert</button>
            </div>
            <div id="g11c7t3costP" style="display:none;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Area (m²)</div><input id="g11c7t3a" type="number" value="10" min="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Price (R/m²)</div><input id="g11c7t3p" type="number" value="185" min="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c7t3costBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate Cost</button>
            </div>
            <div id="g11c7t3Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function R(n){return 'R'+n.toLocaleString('en-ZA',{minimumFractionDigits:2,maximumFractionDigits:2});}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              const volBtn=document.getElementById('g11c7t3vol'),costBtn=document.getElementById('g11c7t3cost');
              const volP=document.getElementById('g11c7t3volP'),costP=document.getElementById('g11c7t3costP');
              const out=document.getElementById('g11c7t3Out');
              function setMode(m){
                if(m==='vol'){volP.style.display='flex';costP.style.display='none';volBtn.style.background='rgba(99,102,241,0.30)';volBtn.style.color='#a5b4fc';volBtn.style.borderColor='rgba(99,102,241,0.50)';costBtn.style.background='transparent';costBtn.style.color='rgba(221,225,240,0.50)';costBtn.style.borderColor='rgba(99,102,241,0.20)';}
                else{costP.style.display='flex';volP.style.display='none';costBtn.style.background='rgba(99,102,241,0.30)';costBtn.style.color='#a5b4fc';costBtn.style.borderColor='rgba(99,102,241,0.50)';volBtn.style.background='transparent';volBtn.style.color='rgba(221,225,240,0.50)';volBtn.style.borderColor='rgba(99,102,241,0.20)';}
                out.innerHTML='';
              }
              volBtn.addEventListener('click',()=>setMode('vol'));
              costBtn.addEventListener('click',()=>setMode('cost'));
              document.getElementById('g11c7t3volBtn').addEventListener('click',()=>{
                const v=gv('g11c7t3v');
                if(isNaN(v)||v<0){out.innerHTML='<span style="color:#fca5a5;">Enter a non-negative volume.</span>';return;}
                const litres=v/1000;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">1000 cm³ = 1 litre</span><br><span style="color:#6ee7b7;">'+v+' cm³ = '+litres.toLocaleString('en-ZA',{maximumFractionDigits:3})+' ℓ</span>';
              });
              document.getElementById('g11c7t3costBtn').addEventListener('click',()=>{
                const a=gv('g11c7t3a'),p=gv('g11c7t3p');
                if([a,p].some(isNaN)||a<0||p<0){out.innerHTML='<span style="color:#fca5a5;">Enter non-negative values.</span>';return;}
                const cost=a*p;
                out.innerHTML='<span style="color:rgba(221,225,240,0.50);">Cost = Area × Price = '+a+' m² × '+R(p)+'/m²</span><br><span style="color:#6ee7b7;">Total cost = '+R(cost)+'</span>';
              });
              setMode('vol');
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A closed rectangular box 40 cm × 30 cm × 20 cm holds water. Its capacity in litres is:",
          options: ["24 ℓ", "2.4 ℓ", "240 ℓ", "0.24 ℓ"],
          answer: 0,
          topic: "Composite shapes in context"
        },
        {
          type: "mc",
          text: "A silo is a cylinder (r = 2 m, h = 5 m) with a cone (r = 2 m, h = 1.5 m) on top. Total volume (in terms of π):",
          options: ["22π m³", "20π m³", "24π m³", "26π m³"],
          answer: 0,
          topic: "Composite shapes in context"
        },
        {
          type: "input",
          text: "An open (no lid) cube tank has side 1.2 m. Sheet costs R150/m². Find the total cost (to the nearest rand). [Surface = 5 faces]",
          answer: "1080",
          topic: "Composite shapes in context"
        },
        {
          type: "mc",
          text: "Which quantity would you use to answer 'how much paint is needed to cover this water tower'?",
          options: ["Volume", "Surface area", "Perimeter", "Diameter"],
          answer: 1,
          topic: "Composite shapes in context"
        },
        {
          type: "input",
          text: "A cylindrical can (r = 7 cm, h = 15 cm, closed both ends) is to be re-covered in paper. Find the surface area to the nearest cm² (use π ≈ 3.142).",
          answer: "968",
          altAnswers: ["967", "969"],
          topic: "Composite shapes in context"
        },
        {
          type: "mc",
          text: "A rectangular swimming pool 8 m × 4 m × 1.5 m (deep) is filled with water. The volume of water needed, in kilolitres (1 kℓ = 1 m³), is:",
          options: ["48 kℓ", "480 kℓ", "4.8 kℓ", "12 kℓ"],
          answer: 0,
          topic: "Composite shapes in context"
        }
      ]
    },
    {
      id: 703,
      chapter: 7,
      name: "Measurement with trigonometry",
      fullName: "Solving 2D and 3D measurement problems that combine surface area/volume with trigonometric ratios",
      lesson: {
        heading: "Measurement combined with trigonometry",
        sub: "Chapter 7 · Topic 4",
        body: `
          <p>CAPS explicitly requires problems in 2D and 3D that combine measurement (surface area, volume, perimeter) with trigonometry — usually you must first use a trig ratio or the Pythagorean theorem to find an unknown length or angle, and then substitute it into a measurement formula.</p>

          <div class="def-box">
            <div class="def-box-title">📖 The two-stage method</div>
            <p>
              <strong>Stage 1 — Trigonometry:</strong> Use SOH-CAHTOA, the sine rule, cosine rule, or Pythagoras to find a missing side or angle (often the height, slant height, or radius).<br>
              <strong>Stage 2 — Measurement:</strong> Substitute the value found into the relevant surface area, volume, or perimeter formula.<br><br>
              Common triggers: "angle of elevation", "the slant makes an angle of...", "cross-section is a triangle with angle...".
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Cone height from a half-angle</div>
            <p>A cone has base radius 6 cm. The slant side makes an angle of 65° with the base.<br>
            Stage 1: tan(65°) = h/6 → h = 6 tan(65°) ≈ 12.867 cm<br>
            Slant height l = 6/cos(65°) ≈ 14.199 cm<br>
            Stage 2: Volume = ⅓π(6)²(12.867) ≈ 485.1 cm³</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Prism cross-section using the area rule</div>
            <p>A triangular prism has length 12 cm. Its triangular cross-section has two sides 8 cm and 10 cm with an included angle of 50°.<br>
            Cross-section area = ½(8)(10)sin(50°) ≈ 30.64 cm²<br>
            Volume = area × length ≈ 30.64 × 12 ≈ 367.7 cm³</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Keep full calculator accuracy for trig values through Stage 1 — only round the final answer in Stage 2, otherwise rounding errors compound.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Cone Height-from-Angle → Volume Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the base radius and the base angle the slant makes with the base — get height, slant height, and volume.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radius r (cm)</div><input id="g11c7t4r" type="number" value="6" min="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Base angle (°)</div><input id="g11c7t4ang" type="number" value="65" min="1" max="89" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g11c7t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c7t4Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function f(n){return n.toFixed(3);}
              function gv(id){return parseFloat(document.getElementById(id).value);}
              function calc(){
                const r=gv('g11c7t4r'),ang=gv('g11c7t4ang');
                const out=document.getElementById('g11c7t4Out');
                if([r,ang].some(isNaN)||r<=0||ang<=0||ang>=90){out.innerHTML='<span style="color:#fca5a5;">Enter r > 0 and an angle strictly between 0° and 90°.</span>';return;}
                const rad=ang*π/180;
                const h=r*Math.tan(rad);
                const l=r/Math.cos(rad);
                const V=(1/3)*π*r*r*h;
                const SA=π*r*r+π*r*l;
                let html='<span style="color:rgba(221,225,240,0.50);">Stage 1 — Trig: h = r·tan('+ang+'°) = '+r+'×tan('+ang+'°) = '+f(h)+' cm</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Slant l = r/cos('+ang+'°) = '+f(l)+' cm</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Stage 2 — Measurement: V = ⅓πr²h = '+f(V)+' cm³</span><br>';
                html+='<span style="color:#6ee7b7;">Total SA = πr² + πrl = '+f(SA)+' cm²</span>   <span style="color:#fcd34d;">Volume = '+f(V)+' cm³</span>';
                out.innerHTML=html;
              }
              ['g11c7t4r','g11c7t4ang'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c7t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A cone has base radius 5 cm. The slant makes an angle of 60° with the base. The height is:",
          options: ["5tan(60°) cm", "5cos(60°) cm", "5sin(60°) cm", "5/tan(60°) cm"],
          answer: 0,
          topic: "Measurement with trigonometry"
        },
        {
          type: "mc",
          text: "A triangular prism (length 10 cm) has a cross-section with two sides 6 cm and 9 cm and an included angle of 40°. Its volume is closest to:",
          options: ["173.6 cm³", "270 cm³", "347.2 cm³", "54 cm³"],
          answer: 0,
          topic: "Measurement with trigonometry"
        },
        {
          type: "input",
          text: "A cone has radius 4 cm and the slant side makes a 70° angle with the base. Find the height (to 2 decimal places).",
          answer: "10.99",
          topic: "Measurement with trigonometry"
        },
        {
          type: "mc",
          text: "To find the cross-sectional area of a triangular prism when two sides and the included angle are known, you should use:",
          options: ["Area = ½ab sin(C)", "Area = ½ base × height only", "The cosine rule directly for area", "Heron's formula only"],
          answer: 0,
          topic: "Measurement with trigonometry"
        },
        {
          type: "mc",
          text: "A ladder leans against a cylindrical water tower of radius 3 m, touching the ground 8 m from the base. What must you compute first before finding any surface area involving the ladder's length?",
          options: ["The ladder's length using Pythagoras/trigonometry", "The tower's volume", "The tower's surface area", "The tower's circumference"],
          answer: 0,
          topic: "Measurement with trigonometry"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 7 Workbook — Measurement",
    questions: [
      {
        number: 1,
        text: "A solid consists of a cylinder (r = 5 cm, h = 8 cm) with a cone on top (r = 5 cm, h = 3 cm).",
        parts: [
          { label: "a", text: "Calculate the slant height of the cone.", marks: 2 },
          { label: "b", text: "Calculate the total surface area of the combined solid (exclude the shared base).", marks: 5 },
          { label: "c", text: "Calculate the total volume.", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "A sphere has radius 6 cm.",
        parts: [
          { label: "a", text: "Find the volume (leave in terms of π).", marks: 2 },
          { label: "b", text: "The radius is increased by 50%. Find the new volume (terms of π).", marks: 3 },
          { label: "c", text: "By what factor has the volume increased?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "l = √(25+9) = √34 ≈ 5.83 cm",
        b: "Bottom circle: 25π; cylinder curved: 80π; cone curved: 5√34·π; Total = (105 + 5√34)π ≈ 422.1 cm²",
        c: "Cylinder: π(25)(8)=200π; Cone: ⅓π(25)(3)=25π; Total=225π≈706.9 cm³"
      },
      2: {
        a: "V = (4/3)π(216) = 288π cm³",
        b: "r=9; V=(4/3)π(729)=972π cm³",
        c: "972π/288π = 3.375 = (3/2)³ = k³ where k=1.5 ✓"
      }
    }
  }
});
