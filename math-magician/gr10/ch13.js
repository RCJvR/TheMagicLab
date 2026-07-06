// Math Magician — Grade 10, Chapter 13
// Measurement

MathMagician.registerChapter(13, {
  topics: [
    {
      id: 1300,
      chapter: 13,
      name: "Area & surface area",
      fullName: "Area of polygons, surface area of prisms, cylinders, pyramids, cones, and spheres",
      lesson: {
        heading: "Area and surface area",
        sub: "Chapter 13 · Topic 1",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Area of 2D shapes</div>
            <p>
              <strong>Rectangle:</strong> A = l × w<br>
              <strong>Triangle:</strong> A = ½bh<br>
              <strong>Parallelogram:</strong> A = b × h<br>
              <strong>Trapezium:</strong> A = ½(a+b)×h<br>
              <strong>Circle:</strong> A = πr²
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Surface area (SA) of 3D shapes</div>
            <p>
              <strong>Right prism:</strong> SA = 2 × (area of base) + perimeter of base × height<br>
              <strong>Cylinder:</strong> SA = 2πr² + 2πrh<br>
              <strong>Cone:</strong> SA = πr² + πrl (where l = slant height = √(r²+h²))<br>
              <strong>Sphere:</strong> SA = 4πr²<br>
              <strong>Square pyramid:</strong> SA = base² + 4 × (½ × base × slant height)
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Cylinder SA</div>
            <p>Cylinder: r = 4 cm, h = 10 cm<br>
            SA = 2π(4)² + 2π(4)(10)<br>
            = 32π + 80π = 112π ≈ 351.86 cm²</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Surface Area Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Select a 3D shape and enter its dimensions — get the full surface area calculation.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Shape</div>
                <select id="g10c13shape"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="cylinder">Cylinder</option>
                  <option value="cone">Cone</option>
                  <option value="sphere">Sphere</option>
                  <option value="rect_prism">Rectangular Prism</option>
                </select>
              </div>
              <div id="g10c13inputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <button id="g10c13Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c13Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function inp(id,label,val){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="0.01" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function f(n){return n.toFixed(2);}
              function buildInputs(){
                const s=document.getElementById('g10c13shape').value;
                const c=document.getElementById('g10c13inputs');
                if(s==='cylinder') c.innerHTML=inp('g10c13r','Radius (r)','4')+inp('g10c13h','Height (h)','10');
                else if(s==='cone') c.innerHTML=inp('g10c13r','Radius (r)','3')+inp('g10c13h','Height (h)','4');
                else if(s==='sphere') c.innerHTML=inp('g10c13r','Radius (r)','5');
                else c.innerHTML=inp('g10c13l','Length (l)','6')+inp('g10c13w','Width (w)','4')+inp('g10c13h','Height (h)','3');
                ['g10c13r','g10c13h','g10c13l','g10c13w'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              }
              function val(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              function calc(){
                const s=document.getElementById('g10c13shape').value;
                const out=document.getElementById('g10c13Out');
                let SA,formula,working;
                if(s==='cylinder'){
                  const r=val('g10c13r'),h=val('g10c13h');
                  if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                  SA=2*π*r*r+2*π*r*h;
                  formula='SA = 2πr² + 2πrh';
                  working='= 2π('+r+')² + 2π('+r+')('+h+') = '+f(2*π*r*r)+' + '+f(2*π*r*h);
                } else if(s==='cone'){
                  const r=val('g10c13r'),h=val('g10c13h');
                  if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                  const l=Math.sqrt(r*r+h*h);
                  SA=π*r*r+π*r*l;
                  formula='SA = πr² + πrl (slant l = √(r²+h²))';
                  working='l = √('+r+'²+'+h+'²) = '+f(l)+'\n= π('+r+')² + π('+r+')('+f(l)+') = '+f(π*r*r)+' + '+f(π*r*l);
                } else if(s==='sphere'){
                  const r=val('g10c13r');
                  if(isNaN(r)||r<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive radius.</span>';return;}
                  SA=4*π*r*r;
                  formula='SA = 4πr²';
                  working='= 4π('+r+')² = '+f(4*π*r*r);
                } else {
                  const l=val('g10c13l'),w=val('g10c13w'),h=val('g10c13h');
                  if([l,w,h].some(isNaN)||[l,w,h].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                  SA=2*(l*w+l*h+w*h);
                  formula='SA = 2(lw + lh + wh)';
                  working='= 2('+l+'×'+w+' + '+l+'×'+h+' + '+w+'×'+h+') = 2('+f(l*w+l*h+w*h)+')';
                }
                let html='<span style="color:rgba(221,225,240,0.50);">Formula: </span><span style="color:#fcd34d;">'+formula+'</span><br>';
                working.split('\n').forEach(line=>{ html+='<span style="color:rgba(221,225,240,0.50);">'+line+'</span><br>'; });
                html+='<span style="color:#6ee7b7;">SA = '+f(SA)+' units²</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c13shape').addEventListener('change',()=>{buildInputs();});
              document.getElementById('g10c13Btn').addEventListener('click',calc);
              buildInputs();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>For a cone, always calculate the <strong>slant height</strong> l = √(r² + h²) first — the SA formula uses l, not the vertical height h.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A cone has base radius 3 cm and slant height 5 cm. Its curved surface area is:",
          options: ["15π cm²", "9π cm²", "24π cm²", "45π cm²"],
          answer: 0,
          topic: "Area & surface area"
        },
        {
          type: "input",
          text: "A rectangle has l = 8 cm and w = 5 cm. Find its area.",
          answer: "40",
          topic: "Area & surface area"
        },
        {
          type: "mc",
          text: "Total surface area of a sphere with r = 6 cm:",
          options: ["36π cm²", "72π cm²", "144π cm²", "288π cm²"],
          answer: 2,
          topic: "Area & surface area"
        },
        {
          type: "mc",
          text: "A right prism has a triangular base (b=6, h=4) and height 10. Its lateral surface area is:",
          options: ["172 cm²", "200 cm²", "240 cm²", "150 cm²"],
          answer: 0,
          topic: "Area & surface area"
        },
        {
          type: "input",
          text: "Cylinder r = 3 cm, h = 7 cm. Find the curved surface area in terms of π.",
          answer: "42π",
          topic: "Area & surface area"
        }
      ]
    },
    {
      id: 1301,
      chapter: 13,
      name: "Volume & scale factor",
      fullName: "Volume of 3D shapes and the effect of a scale factor",
      lesson: {
        heading: "Volume and the effect of a scale factor",
        sub: "Chapter 13 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Volume of 3D shapes</div>
            <p>
              <strong>Right prism/cylinder:</strong> V = area of base × height<br>
              → Cylinder: V = πr²h<br>
              <strong>Pyramid:</strong> V = ⅓ × base area × height<br>
              <strong>Cone:</strong> V = ⅓πr²h<br>
              <strong>Sphere:</strong> V = (4/3)πr³
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Effect of multiplying a dimension by k</div>
            <p>
              If all dimensions are multiplied by k:<br>
              • <strong>Length</strong> scales by k<br>
              • <strong>Area / Surface area</strong> scales by k²<br>
              • <strong>Volume</strong> scales by k³<br><br>
              This applies only when ALL dimensions are scaled by the same factor.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Scale factor</div>
            <p>A box has volume 24 cm³. All dimensions are doubled (k=2).<br>
            New volume = 24 × 2³ = 24 × 8 = 192 cm³<br><br>
            A sphere with r = 3 cm is enlarged to r = 6 cm (k=2).<br>
            SA increases by factor 4 (2²); Volume by factor 8 (2³).</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Volume &amp; Scale Factor Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Select a shape, enter dimensions and a scale factor — compare original and scaled volumes.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Shape</div>
                <select id="g10c13t2shape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="cylinder">Cylinder</option>
                  <option value="cone">Cone</option>
                  <option value="sphere">Sphere</option>
                  <option value="rect_prism">Rect. Prism</option>
                  <option value="pyramid">Sq. Pyramid</option>
                </select>
              </div>
              <div id="g10c13t2inputs" style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Scale factor k</div><input id="g10c13t2k" type="number" value="2" step="0.5" min="0.1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c13t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c13t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function inp(id,label,val){return '<div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">'+label+'</div><input id="'+id+'" type="number" value="'+val+'" min="0.01" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:\'JetBrains Mono\',monospace;text-align:center;"></div>';}
              function f(n){return parseFloat(n.toFixed(4)).toString();}
              function build(){
                const s=document.getElementById('g10c13t2shape').value;
                const c=document.getElementById('g10c13t2inputs');
                if(s==='cylinder') c.innerHTML=inp('g10c13t2r','Radius','4')+inp('g10c13t2h','Height','10');
                else if(s==='cone') c.innerHTML=inp('g10c13t2r','Radius','3')+inp('g10c13t2h','Height','4');
                else if(s==='sphere') c.innerHTML=inp('g10c13t2r','Radius','5');
                else if(s==='rect_prism') c.innerHTML=inp('g10c13t2l','Length','6')+inp('g10c13t2w','Width','4')+inp('g10c13t2h','Height','3');
                else c.innerHTML=inp('g10c13t2b','Base side','5')+inp('g10c13t2h','Height','8');
                ['g10c13t2r','g10c13t2h','g10c13t2l','g10c13t2w','g10c13t2b','g10c13t2k'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              }
              function gv(id){const el=document.getElementById(id);return el?parseFloat(el.value):NaN;}
              function calc(){
                const s=document.getElementById('g10c13t2shape').value;
                const k=gv('g10c13t2k');
                const out=document.getElementById('g10c13t2Out');
                if(isNaN(k)||k<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a positive scale factor.</span>';return;}
                let V,label;
                if(s==='cylinder'){const r=gv('g10c13t2r'),h=gv('g10c13t2h');if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Positive values required.</span>';return;}V=π*r*r*h;label='π×'+r+'²×'+h;}
                else if(s==='cone'){const r=gv('g10c13t2r'),h=gv('g10c13t2h');if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Positive values required.</span>';return;}V=π*r*r*h/3;label='⅓π×'+r+'²×'+h;}
                else if(s==='sphere'){const r=gv('g10c13t2r');if(isNaN(r)||r<=0){out.innerHTML='<span style="color:#fca5a5;">Positive radius required.</span>';return;}V=4/3*π*r*r*r;label='(4/3)π×'+r+'³';}
                else if(s==='rect_prism'){const l=gv('g10c13t2l'),w=gv('g10c13t2w'),h=gv('g10c13t2h');if([l,w,h].some(isNaN)||[l,w,h].some(x=>x<=0)){out.innerHTML='<span style="color:#fca5a5;">Positive values required.</span>';return;}V=l*w*h;label=l+'×'+w+'×'+h;}
                else{const b=gv('g10c13t2b'),h=gv('g10c13t2h');if(isNaN(b)||isNaN(h)||b<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Positive values required.</span>';return;}V=b*b*h/3;label='⅓×'+b+'²×'+h;}
                const Vnew=V*k*k*k;
                let html='<span style="color:rgba(221,225,240,0.50);">Original V = '+label+' = </span><span style="color:#fcd34d;">'+f(V)+' units³</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Scale factor k = '+k+' → Volume scales by k³ = '+f(k*k*k)+'</span><br>';
                html+='<span style="color:#6ee7b7;">New volume = '+f(V)+' × '+f(k*k*k)+' = '+f(Vnew)+' units³</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">SA scales by k² = '+f(k*k)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c13t2shape').addEventListener('change',()=>{build();});
              document.getElementById('g10c13t2Btn').addEventListener('click',calc);
              build();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Scale factor k affects: length → ×k, area/SA → ×k², volume → ×k³. Doubling all dimensions increases volume by 8, not 2.</span></div>
        `
      },
      questions: [
        {
          type: "input",
          text: "Sphere with r = 3 cm. Find volume in terms of π.",
          answer: "36π",
          topic: "Volume & scale factor"
        },
        {
          type: "mc",
          text: "A cylinder has r = 2 and h = 5. If r is doubled only, the new volume is:",
          options: ["4 times the original", "2 times", "8 times", "Same"],
          answer: 0,
          topic: "Volume & scale factor"
        },
        {
          type: "mc",
          text: "All dimensions of a shape are tripled. By what factor does the surface area increase?",
          options: ["3", "6", "9", "27"],
          answer: 2,
          topic: "Volume & scale factor"
        },
        {
          type: "mc",
          text: "A cone has V = 120 cm³. If all dimensions are halved, the new volume is:",
          options: ["60 cm³", "30 cm³", "15 cm³", "90 cm³"],
          answer: 2,
          topic: "Volume & scale factor"
        },
        {
          type: "input",
          text: "A rectangular box is 4×3×5 cm. Find its volume.",
          answer: "60",
          topic: "Volume & scale factor"
        }
      ]
    },
    {
      id: 1302,
      chapter: 13,
      name: "Composite solids",
      fullName: "Volume and surface area of composite (combined) solid figures",
      lesson: {
        heading: "Composite solids",
        sub: "Chapter 13 · Topic 3",
        body: `
          <p>A <strong>composite solid</strong> is made by joining two or more basic solids together (e.g. a cone on top of a cylinder, or a hemisphere on top of a cone).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Strategy for composite solids</div>
            <p>
              <strong>Volume:</strong> simply ADD the volumes of the separate parts.<br>
              <strong>Surface area:</strong> you must be careful — do NOT add the full surface areas of each part. Any face where two solids join is <em>internal</em> and must be EXCLUDED from the total surface area (it is not an outer surface).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Cylinder + hemisphere + cone</div>
            <p>A solid has a cylinder (r=2, h=10), a hemisphere on one end (r=2), and a cone on the other end (r=2, height 2, so slant l=√(2²+2²)=√8).<br><br>
            <strong>Volume</strong> = cylinder + hemisphere + cone<br>
            = πr²h + ⅔πr³ + ⅓πr²h_cone<br>
            = π(2)²(10) + ⅔π(2)³ + ⅓π(2)²(2)<br>
            = 40π + 16π/3 + 8π/3 = 40π + 8π = 48π ≈ 150.80 cm³<br><br>
            <strong>Surface area</strong> = curved cylinder + curved hemisphere + curved cone (flat circular ends are internal, excluded)<br>
            = 2πrh + 2πr² + πrl<br>
            = 2π(2)(10) + 2π(2)² + π(2)(√8) ≈ 125.66 + 25.13 + 17.77 ≈ 168.56 cm²</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Common trap</div>
            <p>Never include the flat circular face(s) where two solids are joined in the surface area — only the OUTER, visible surfaces count.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Composite Solid Calculator — Cylinder with Cone/Hemisphere Cap</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Build a cylinder with an optional cone or hemisphere on top — get the combined volume and surface area.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Radius r</div><input id="g10c13cr" type="number" value="2" min="0.1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Cylinder height</div><input id="g10c13ch" type="number" value="10" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Top cap</div>
                <select id="g10c13cap" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="none">None (plain cylinder)</option>
                  <option value="cone">Cone</option>
                  <option value="hemisphere">Hemisphere</option>
                </select>
              </div>
              <div id="g10c13capH" style="display:none;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Cone height</div><input id="g10c13coneh" type="number" value="2" min="0.1" style="width:65px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:monospace;text-align:center;"></div>
              <button id="g10c13cBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c13cOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const π=Math.PI;
              function f(n){return n.toFixed(2);}
              function toggleConeH(){document.getElementById('g10c13capH').style.display=document.getElementById('g10c13cap').value==='cone'?'':'none';}
              function run(){
                const r=parseFloat(document.getElementById('g10c13cr').value);
                const h=parseFloat(document.getElementById('g10c13ch').value);
                const cap=document.getElementById('g10c13cap').value;
                const out=document.getElementById('g10c13cOut');
                if(isNaN(r)||isNaN(h)||r<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive radius and height.</span>';return;}
                let V=π*r*r*h;
                let SA=2*π*r*h+π*r*r; // curved cylinder + ONE flat base (bottom); top face replaced or open
                let detail='<span style="color:rgba(221,225,240,0.50);">Cylinder: V = πr²h = '+f(π*r*r*h)+' cm³; curved SA = 2πrh = '+f(2*π*r*h)+' cm²; base SA = πr² = '+f(π*r*r)+' cm²</span><br>';
                if(cap==='cone'){
                  const ch=parseFloat(document.getElementById('g10c13coneh').value);
                  if(isNaN(ch)||ch<=0){out.innerHTML='<span style="color:#fca5a5;">Enter a positive cone height.</span>';return;}
                  const Vcone=π*r*r*ch/3;
                  const l=Math.sqrt(r*r+ch*ch);
                  const SAcone=π*r*l;
                  V+=Vcone;
                  SA+=SAcone; // top circular face is internal, excluded
                  detail+='<span style="color:rgba(221,225,240,0.50);">Cone cap: V = ⅓πr²h = '+f(Vcone)+' cm³; slant l = √(r²+h²) = '+f(l)+'; curved SA = πrl = '+f(SAcone)+' cm² (flat join excluded)</span><br>';
                } else if(cap==='hemisphere'){
                  const Vhemi=(2/3)*π*r*r*r;
                  const SAhemi=2*π*r*r;
                  V+=Vhemi;
                  SA+=SAhemi; // flat circle of hemisphere is internal, excluded
                  detail+='<span style="color:rgba(221,225,240,0.50);">Hemisphere cap: V = ⅔πr³ = '+f(Vhemi)+' cm³; curved SA = 2πr² = '+f(SAhemi)+' cm² (flat join excluded)</span><br>';
                } else {
                  SA+=π*r*r; // plain cylinder: include the top face too
                  detail+='<span style="color:rgba(221,225,240,0.50);">No cap: top flat face included = πr² = '+f(π*r*r)+' cm²</span><br>';
                }
                let html=detail;
                html+='<span style="color:#6ee7b7;">Total volume = '+f(V)+' cm³</span><br>';
                html+='<span style="color:#6ee7b7;">Total surface area = '+f(SA)+' cm²</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c13cap').addEventListener('change',()=>{toggleConeH();run();});
              document.getElementById('g10c13cBtn').addEventListener('click',run);
              ['g10c13cr','g10c13ch','g10c13coneh'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              toggleConeH();
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Before calculating, sketch the composite solid and shade the faces that are actually on the OUTSIDE — this prevents the common mistake of double-counting or including internal joins.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A composite solid is a cylinder (r=3, h=8) with a hemisphere (r=3) on top. Its total volume is closest to:",
          options: ["282.7 cm³", "226.2 cm³", "339.3 cm³", "254.5 cm³"],
          answer: 0,
          topic: "Composite solids"
        },
        {
          type: "mc",
          text: "When finding the surface area of a composite solid formed by joining two shapes, you must:",
          options: ["Add both full surface areas", "Exclude the internal joined face(s) from the total", "Only calculate the volume, not surface area", "Double the smaller shape's surface area"],
          answer: 1,
          topic: "Composite solids"
        },
        {
          type: "input",
          text: "A cone (r=3, h=4) sits on a cylinder (r=3, h=6). Find the total volume in terms of π.",
          answer: "66π",
          topic: "Composite solids"
        },
        {
          type: "mc",
          text: "A composite solid = cube (side 4 cm) with a square pyramid (base 4×4, height 3 cm) on top. Total volume is:",
          options: ["80 cm³", "64 cm³", "16 cm³", "112 cm³"],
          answer: 0,
          topic: "Composite solids"
        },
        {
          type: "mc",
          text: "For a cylinder capped with a hemisphere, which face is excluded from the total surface area calculation?",
          options: ["The curved cylinder surface", "The bottom circular base", "The flat circle where the hemisphere meets the cylinder", "The curved hemisphere surface"],
          answer: 2,
          topic: "Composite solids"
        }
      ]
    },
    {
      id: 1303,
      chapter: 13,
      name: "Pyramids and cones in depth",
      fullName: "Detailed volume and surface area problems involving right pyramids and cones",
      lesson: {
        heading: "Pyramids and cones in depth",
        sub: "Chapter 13 · Topic 4",
        body: `
          <p>CAPS specifies that pyramid bases in Grade 10 are either an <strong>equilateral triangle</strong> or a <strong>square</strong> — this section works through both cases carefully.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Square-based pyramid</div>
            <p>
              <strong>Volume:</strong> V = ⅓ × base² × height (perpendicular height)<br>
              <strong>Surface area:</strong> SA = base² + 4 × (½ × base × slant height)<br>
              Slant height (of a triangular face) is found using Pythagoras: <span class="math">l_face² = h² + (base/2)²</span> if h is the perpendicular height from the centre of the base.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Triangular-based pyramid (equilateral triangle base)</div>
            <p>
              <strong>Base area</strong> (equilateral triangle, side a): <span class="math">A = (√3/4)a²</span><br>
              <strong>Volume:</strong> V = ⅓ × base area × height
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Cone recap</div>
            <p>
              <strong>Volume:</strong> V = ⅓πr²h<br>
              <strong>Slant height:</strong> l = √(r² + h²)<br>
              <strong>Total surface area:</strong> SA = πr² + πrl
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Square pyramid</div>
            <p>Square pyramid: base = 6 cm, perpendicular height = 4 cm.<br>
            Slant height of a face: <span class="math">l = √(4² + 3²) = √25 = 5 cm</span> (using half the base = 3)<br>
            Volume = ⅓(6²)(4) = ⅓(144) = 48 cm³<br>
            SA = 6² + 4(½×6×5) = 36 + 60 = 96 cm²</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Square Pyramid Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the base side and the perpendicular height — get the slant height, volume, and total surface area.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Base side</div><input id="g10c13pb" type="number" value="6" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Perp. height</div><input id="g10c13ph" type="number" value="4" min="0.1" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c13pBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c13pOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(2);}
              function run(){
                const b=parseFloat(document.getElementById('g10c13pb').value);
                const h=parseFloat(document.getElementById('g10c13ph').value);
                const out=document.getElementById('g10c13pOut');
                if(isNaN(b)||isNaN(h)||b<=0||h<=0){out.innerHTML='<span style="color:#fca5a5;">Enter positive values.</span>';return;}
                const l=Math.sqrt(h*h+(b/2)*(b/2));
                const V=(b*b*h)/3;
                const SA=b*b+4*(0.5*b*l);
                let html='<span style="color:rgba(221,225,240,0.50);">Slant height l = √(h² + (b/2)²) = √('+h+'² + '+(b/2)+'²) = </span><span style="color:#fcd34d;">'+f(l)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Volume = ⅓b²h = ⅓('+b+'²)('+h+') = </span><span style="color:#6ee7b7;">'+f(V)+' units³</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">SA = b² + 4(½bl) = '+b+'² + 4(½×'+b+'×'+f(l)+') = </span><span style="color:#6ee7b7;">'+f(SA)+' units²</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c13pBtn').addEventListener('click',run);
              ['g10c13pb','g10c13ph'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Don't confuse the pyramid's perpendicular height (used in the volume formula) with the slant height of a triangular face (used in the surface area formula) — they are different lengths found using different right triangles.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A square pyramid has base 8 cm and perpendicular height 3 cm. Its volume is:",
          options: ["64 cm³", "192 cm³", "24 cm³", "96 cm³"],
          answer: 0,
          topic: "Pyramids and cones in depth"
        },
        {
          type: "input",
          text: "A square pyramid has base 10 cm and perpendicular height 12 cm. Find the slant height of a triangular face.",
          answer: "13",
          topic: "Pyramids and cones in depth"
        },
        {
          type: "mc",
          text: "A cone has radius 5 cm and height 12 cm. Its total surface area (in terms of π) is:",
          options: ["90π cm²", "60π cm²", "25π cm²", "156π cm²"],
          answer: 0,
          topic: "Pyramids and cones in depth"
        },
        {
          type: "mc",
          text: "The area of an equilateral triangle with side 6 cm is:",
          options: ["9√3 cm²", "18 cm²", "36 cm²", "6√3 cm²"],
          answer: 0,
          topic: "Pyramids and cones in depth"
        },
        {
          type: "input",
          text: "A square pyramid has base 6 cm and total surface area 96 cm². Given the base area is 36 cm², find the total lateral (triangular faces) area.",
          answer: "60",
          topic: "Pyramids and cones in depth"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 13 Workbook — Measurement",
    questions: [
      {
        number: 1,
        text: "A composite shape consists of a rectangle 10 cm × 6 cm with a semicircle attached to one short end.",
        parts: [
          { label: "a", text: "Calculate the area of the composite shape (to 2 decimal places).", marks: 4 },
          { label: "b", text: "Calculate the perimeter.", marks: 4 }
        ]
      },
      {
        number: 2,
        text: "A cone has base diameter 12 cm and height 8 cm.",
        parts: [
          { label: "a", text: "Calculate the slant height l.", marks: 2 },
          { label: "b", text: "Calculate the total surface area (in terms of π, then to 2 d.p.).", marks: 4 },
          { label: "c", text: "Calculate the volume (in terms of π).", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "A model of a building has a rectangular prism base (6×4×3 cm) with a square pyramid on top (base 6×4 cm, height 2 cm).",
        parts: [
          { label: "a", text: "Calculate the total volume of the model.", marks: 4 },
          { label: "b", text: "The actual building is 50 times larger in each dimension. What is its actual volume?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Rectangle: 10×6=60; semicircle: ½π(3)²=4.5π≈14.14; Total≈74.14 cm²",
        b: "2 long sides + 1 short side + semicircle circumference: 2(10)+6+π(3)=26+3π≈35.42 cm"
      },
      2: {
        a: "l = √(6²+8²) = √100 = 10 cm",
        b: "SA = π(6²) + π(6)(10) = 36π + 60π = 96π ≈ 301.59 cm²",
        c: "V = ⅓π(6²)(8) = 96π cm³"
      },
      3: {
        a: "Prism: 6×4×3=72; Pyramid: ⅓×24×2=16; Total=88 cm³",
        b: "Scale factor=50; Volume scales by 50³=125000; Actual=88×125000=11 000 000 cm³=11 m³"
      }
    }
  }
});
