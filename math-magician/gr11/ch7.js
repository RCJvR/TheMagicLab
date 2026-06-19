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
              document.getElementById('g11c7combo').addEventListener('change',()=>{build();calc();});
              document.getElementById('g11c7Btn').addEventListener('click',calc);
              build(); calc();
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
              document.getElementById('g11c7t2shape').addEventListener('change',()=>{build();calc();});
              document.getElementById('g11c7t2Btn').addEventListener('click',calc);
              build(); calc();
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
