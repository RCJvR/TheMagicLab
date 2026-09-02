// Math Magician � Grade 9, Chapter 15 data
// Surface Area and Volume

MathMagician.registerChapter(15, {
  topics: [
    {
      id: 29,
      chapter: 15,
      name: "Surface area",
      fullName: "Surface area of prisms and cylinders",
      lesson: {
        heading: "Surface area of 3D objects",
        sub: "Chapter 15 � Topic 1",
        body: `
          <p><strong>Surface area</strong> is the total area of all faces of a 3D object. Imagine unfolding the shape into a net.</p>
          <div class="def-box">
            <div class="def-box-title">?? Surface area formulas</div>
            <p>
              <strong>Rectangular prism (cuboid):</strong><br>
              SA = 2(lw + lh + wh)<br><br>
              <strong>Cube:</strong> SA = 6s�<br><br>
              <strong>Triangular prism:</strong><br>
              SA = 2 � (area of triangle) + 3 � (area of rectangles)<br><br>
              <strong>Cylinder:</strong><br>
              SA = 2pr� + 2prh = 2pr(r + h)<br><br>
              <strong>Cone:</strong> SA = pr� + prl (l = slant height)<br><br>
              <strong>Sphere:</strong> SA = 4pr�
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Cylinder example</div>
            <div class="example-step"><span class="step-num">1</span><span>r = 4 cm, h = 10 cm</span></div>
            <div class="example-step"><span class="step-num">2</span><span>SA = 2p(4)� + 2p(4)(10) = 32p + 80p = 112p � 351,86 cm�</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Surface area is the total area of all faces of a 3D shape � think of it as the amount of wrapping paper needed to cover it.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; Surface Area Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Select a 3D solid and enter its dimensions. See the formula, each face's area, and the total surface area.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Solid</label>
                <select id="saShape" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                  <option value="cube">Cube</option>
                  <option value="rect">Rectangular prism</option>
                  <option value="tri">Triangular prism</option>
                  <option value="cyl">Cylinder</option>
                </select>
              </div>
              <div id="saInputs" style="display:flex;gap:8px;flex-wrap:wrap;"></div>
              <button id="saBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="saOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var solids={
              cube:{labels:['Side (s)'],defaults:[5],formula:'SA = 6s�',
                calc:function(v){var s=v[0];return {total:6*s*s,faces:['6 squares: 6 � '+s+'� = '+6*s*s]};} },
              rect:{labels:['Length (l)','Width (w)','Height (h)'],defaults:[8,5,4],formula:'SA = 2(lw + lh + wh)',
                calc:function(v){var l=v[0],w=v[1],h=v[2];var lw=l*w,lh=l*h,wh=w*h;return{total:2*(lw+lh+wh),faces:['2 � lw = 2�'+lw+' = '+2*lw,'2 � lh = 2�'+lh+' = '+2*lh,'2 � wh = 2�'+wh+' = '+2*wh]};} },
              tri:{labels:['Base (b)','Height of tri (h)','Length (l)','Slant sides (s1, s2)','s2'],defaults:[6,4,10,5,5],formula:'SA = bh + l(b + s1 + s2)',
                calc:function(v){var b=v[0],h=v[1],l=v[2],s1=v[3],s2=v[4];var bases=b*h,rect1=l*b,rect2=l*s1,rect3=l*s2;return{total:bases+rect1+rect2+rect3,faces:['2 triangular faces: '+b+'�'+h+' = '+bases,'Rectangular base: '+l+'�'+b+' = '+rect1,'Side face 1: '+l+'�'+s1+' = '+rect2,'Side face 2: '+l+'�'+s2+' = '+rect3]};} },
              cyl:{labels:['Radius (r)','Height (h)'],defaults:[4,10],formula:'SA = 2pr� + 2prh',
                calc:function(v){var r=v[0],h=v[1];var circles=2*Math.PI*r*r,lateral=2*Math.PI*r*h;return{total:circles+lateral,faces:['2 circles: 2p('+r+')� = '+circles.toFixed(3),'Curved surface: 2p('+r+')('+h+') = '+lateral.toFixed(3)]};} },
            };
            function setShape(){
              var key=document.getElementById('saShape').value;var s=solids[key];
              document.getElementById('saInputs').innerHTML=s.labels.map(function(lbl,i){
                return '<div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);">'+lbl+'</label><input class="saVal" type="number" value="'+s.defaults[i]+'" style="width:62px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;text-align:center;"></div>';
              }).join('');
            }
            function calc(){
              var key=document.getElementById('saShape').value;var s=solids[key];
              var vals=Array.from(document.querySelectorAll('.saVal')).map(function(el){return parseFloat(el.value)||0;});
              var res=s.calc(vals);
              document.getElementById('saOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Formula: </span><span style="color:#fbbf24;">'+s.formula+'</span></div>',
                res.faces.map(function(f){return '<div style="color:rgba(221,225,240,0.50);font-size:11px;">? '+f+'</div>';}).join(''),
                '<div style="margin-top:4px;"><span style="color:rgba(221,225,240,0.45);">Total SA: </span><span style="color:#6ee7b7;font-size:17px;font-weight:700;">'+(typeof res.total==='number'&&res.total%1!==0?res.total.toFixed(3):res.total)+'</span> <span style="color:rgba(221,225,240,0.35);">units�</span></div>',
              ].join('');
            }
            document.getElementById('saShape').addEventListener('change',function(){setShape();});
            document.getElementById('saBtn').addEventListener('click',calc);
            setShape();
          })();
          </script>
        Draw the net of the solid first. Count each face and calculate its area separately before adding together.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the surface area of a cube with side 5 cm.", answer: "150", topic: "Surface Area" },
        { type: "mc", text: "A cylinder has r = 3 cm and h = 7 cm. Its surface area (using p � 3,14) is approximately:", options: ["188,4 cm�", "94,2 cm�", "56,52 cm�", "376,8 cm�"], answer: 0, topic: "Surface Area" },
        { type: "input", text: "A rectangular prism has l = 8, w = 5, h = 3 cm. Find the surface area.", answer: "158", topic: "Surface Area" },
        { type: "mc", text: "The lateral surface area of a cylinder (just the curved side, not the ends) with r = 4 cm, h = 6 cm is:", options: ["150,72 cm�", "100,48 cm�", "50,24 cm�", "75,36 cm�"], answer: 0, topic: "Surface Area" },
        { type: "input", text: "Find the surface area of a sphere with radius 6 cm. (Use p � 3,14; give to nearest whole number)", answer: "452", topic: "Surface Area" },
        { type: "input", text: "The surface area of a cube is 216 cm². Find the side length (in cm).", answer: "6", topic: "Surface Area" },
        { type: "input", text: "A cylinder has surface area 314 cm² and radius 5 cm. Using p ≈ 3,14, find its height (in cm).", answer: "5", topic: "Surface Area" },
      ]
    },
    {
      id: 30,
      chapter: 15,
      name: "Volume",
      fullName: "Volume of prisms, cylinders and spheres",
      lesson: {
        heading: "Volume of 3D objects",
        sub: "Chapter 15 � Topic 2",
        body: `
          <p><strong>Volume</strong> is the amount of 3D space a solid occupies, measured in cubic units (cm�, m�, etc.).</p>
          <div class="def-box">
            <div class="def-box-title">?? Volume formulas</div>
            <p>
              <strong>Prism/Cylinder:</strong> V = area of base � height<br>
              ? Rectangular prism: V = l � w � h<br>
              ? Triangular prism: V = �bh � length<br>
              ? Cylinder: V = pr�h<br><br>
              <strong>Pyramid/Cone:</strong> V = ? � base area � height<br>
              ? Square pyramid: V = ?s�h<br>
              ? Cone: V = ?pr�h<br><br>
              <strong>Sphere:</strong> V = 4/3 pr�
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">?? Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>Cylinder r = 5, h = 12: V = p(25)(12) = 300p � 942,48 cm�</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Cone r = 6, h = 8: V = ?p(36)(8) = 96p � 301,59 cm�</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Sphere r = 3: V = 4/3p(27) = 36p � 113,10 cm�</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">??</span><span>Pyramid/cone volume = ? � (
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">&#127918; Try it &#8212; 3D Volume & Surface Area</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Select a solid, enter dimensions, and get V and SA instantly.</p>
            <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px;">
              <select id="volShape4" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="cub">Rectangular prism</option>
                <option value="cyl">Cylinder</option>
                <option value="cone">Cone</option>
                <option value="sph">Sphere</option>
              </select>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="volL14">l</label><input id="volV14" type="number" value="5" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="volL24">w</label><input id="volV24" type="number" value="3" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <div style="display:flex;flex-direction:column;gap:4px;"><label style="font-size:10px;color:rgba(221,225,240,0.45);" id="volL34">h</label><input id="volV34" type="number" value="4" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;"></div>
              <button id="volBtn4" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="volOut4" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            var PI=Math.PI;function f(v){return Math.round(v*100)/100;}
            var cfg={cub:{l1:'l',l2:'w',l3:'h'},cyl:{l1:'r',l2:'h',l3:''},cone:{l1:'r',l2:'h',l3:''},sph:{l1:'r',l2:'',l3:''}};
            function setL(){var s=document.getElementById('volShape4').value;var c=cfg[s];document.getElementById('volL14').textContent=c.l1;document.getElementById('volL24').textContent=c.l2;document.getElementById('volL34').textContent=c.l3;document.getElementById('volV24').disabled=(s==='sph');document.getElementById('volV34').disabled=(s!=='cub');}
            function calc(){
              var s=document.getElementById('volShape4').value;
              var v1=parseFloat(document.getElementById('volV14').value)||0,v2=parseFloat(document.getElementById('volV24').value)||0,v3=parseFloat(document.getElementById('volV34').value)||0;
              var V,SA;
              if(s==='cub'){V=v1*v2*v3;SA=2*(v1*v2+v1*v3+v2*v3);}
              else if(s==='cyl'){V=PI*v1*v1*v2;SA=2*PI*v1*(v1+v2);}
              else if(s==='cone'){V=PI*v1*v1*v2/3;var sl=Math.sqrt(v1*v1+v2*v2);SA=PI*v1*(v1+sl);}
              else{V=4/3*PI*v1*v1*v1;SA=4*PI*v1*v1;}
              document.getElementById('volOut4').innerHTML='<div><span style="color:rgba(221,225,240,0.45);width:80px;display:inline-block;">Volume:</span><span style="color:#6ee7b7;font-size:15px;font-weight:700;">'+f(V)+' units\xb3</span></div><div><span style="color:rgba(221,225,240,0.45);width:80px;display:inline-block;">Surf. Area:</span><span style="color:#a5b4fc;">'+f(SA)+' units\xb2</span></div>';
            }
            document.getElementById('volShape4').addEventListener('change',function(){setL();});
            document.getElementById('volBtn4').addEventListener('click',calc);
            ['volV14','volV24','volV34'].forEach(function(id){document.getElementById(id).addEventListener('keydown',function(e){if(e.key==='Enter')calc();});});
            setL();
          })();
          </script>
        volume of the corresponding prism/cylinder). A useful check!</span></div>

          <div style="margin:26px 0 14px;">
            <div style="font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:13px;color:#fbbf24;text-transform:uppercase;letter-spacing:0.07em;">&#128209; Quick reference &mdash; all 6 solids</div>
            <p style="font-size:11.5px;color:rgba(221,225,240,0.40);margin:4px 0 0;">Surface area and volume formulas for every shape in this chapter, with one worked example each.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin-bottom:6px;">

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 18px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="#a5b4fc" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M10 18 L24 10 L38 18 L38 32 L24 40 L10 32 Z"/><path d="M10 18 L24 26 L38 18"/><path d="M24 26 L24 40"/></svg>
                <div><div style="font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;color:#e8eaf4;">Cube</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(221,225,240,0.40);">side = s</div></div>
              </div>
              <div class="def-box" style="padding:10px 12px;margin:0 0 8px;">
                <div class="def-box-title" style="margin-bottom:6px;">Formulas</div>
                <div class="math-block" style="margin:0 0 5px;padding:7px 10px;font-size:13px;">SA = 6s&sup2;</div>
                <div class="math-block" style="margin:0;padding:7px 10px;font-size:13px;">V = s&sup3;</div>
              </div>
              <div class="example-box" style="padding:9px 12px;margin:0;">
                <div class="example-box-title" style="margin-bottom:5px;">Worked example</div>
                <p style="margin:0;font-size:11.5px;">s = 4 cm &rarr; SA = 96 cm&sup2;, V = 64 cm&sup3;</p>
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 18px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="#a5b4fc" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M4 20 L24 10 L44 20 L44 32 L24 42 L4 32 Z"/><path d="M4 20 L24 28 L44 20"/><path d="M24 28 L24 42"/></svg>
                <div><div style="font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;color:#e8eaf4;">Rectangular prism</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(221,225,240,0.40);">l, w, h</div></div>
              </div>
              <div class="def-box" style="padding:10px 12px;margin:0 0 8px;">
                <div class="def-box-title" style="margin-bottom:6px;">Formulas</div>
                <div class="math-block" style="margin:0 0 5px;padding:7px 10px;font-size:13px;">SA = 2(lw + lh + wh)</div>
                <div class="math-block" style="margin:0;padding:7px 10px;font-size:13px;">V = l &times; w &times; h</div>
              </div>
              <div class="example-box" style="padding:9px 12px;margin:0;">
                <div class="example-box-title" style="margin-bottom:5px;">Worked example</div>
                <p style="margin:0;font-size:11.5px;">l=8, w=5, h=3 cm &rarr; SA = 158 cm&sup2;, V = 120 cm&sup3;</p>
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 18px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="#a5b4fc" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M8 38 L8 16 L24 38 Z"/><path d="M20 28 L20 6 L36 28 Z"/><path d="M8 38 L20 28 M8 16 L20 6 M24 38 L36 28"/></svg>
                <div><div style="font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;color:#e8eaf4;">Triangular prism</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(221,225,240,0.40);">tri. base b, height h &middot; length L</div></div>
              </div>
              <div class="def-box" style="padding:10px 12px;margin:0 0 8px;">
                <div class="def-box-title" style="margin-bottom:6px;">Formulas</div>
                <div class="math-block" style="margin:0 0 5px;padding:7px 10px;font-size:12px;line-height:1.5;">SA = 2&times;(&#9651; area) + (perimeter &times; L)</div>
                <div class="math-block" style="margin:0;padding:7px 10px;font-size:13px;">V = (&frac12;bh) &times; L</div>
              </div>
              <div class="example-box" style="padding:9px 12px;margin:0;">
                <div class="example-box-title" style="margin-bottom:5px;">Worked example</div>
                <p style="margin:0;font-size:11.5px;">3-4-5 triangle, L=10 cm &rarr; SA = 132 cm&sup2;, V = 60 cm&sup3;</p>
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 18px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="#a5b4fc" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="24" cy="12" rx="14" ry="6"/><ellipse cx="24" cy="36" rx="14" ry="6"/><path d="M10 12 L10 36 M38 12 L38 36"/></svg>
                <div><div style="font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;color:#e8eaf4;">Cylinder</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(221,225,240,0.40);">radius r, height h</div></div>
              </div>
              <div class="def-box" style="padding:10px 12px;margin:0 0 8px;">
                <div class="def-box-title" style="margin-bottom:6px;">Formulas</div>
                <div class="math-block" style="margin:0 0 5px;padding:7px 10px;font-size:13px;">SA = 2&pi;r&sup2; + 2&pi;rh</div>
                <div class="math-block" style="margin:0;padding:7px 10px;font-size:13px;">V = &pi;r&sup2;h</div>
              </div>
              <div class="example-box" style="padding:9px 12px;margin:0;">
                <div class="example-box-title" style="margin-bottom:5px;">Worked examples</div>
                <p style="margin:0;font-size:11.5px;line-height:1.6;">r=4, h=10 cm &rarr; SA &asymp; 351,86 cm&sup2;<br>r=5, h=12 cm &rarr; V &asymp; 942,48 cm&sup3;</p>
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 18px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="#a5b4fc" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="24" cy="36" rx="14" ry="6"/><path d="M24 8 L10 36 M24 8 L38 36"/></svg>
                <div><div style="font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;color:#e8eaf4;">Cone</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(221,225,240,0.40);">radius r, height h, slant l</div></div>
              </div>
              <div class="def-box" style="padding:10px 12px;margin:0 0 8px;">
                <div class="def-box-title" style="margin-bottom:6px;">Formulas</div>
                <div class="math-block" style="margin:0 0 5px;padding:7px 10px;font-size:13px;">SA = &pi;r&sup2; + &pi;rl</div>
                <div class="math-block" style="margin:0;padding:7px 10px;font-size:13px;">V = &#8531;&pi;r&sup2;h</div>
              </div>
              <div class="example-box" style="padding:9px 12px;margin:0;">
                <div class="example-box-title" style="margin-bottom:5px;">Worked example</div>
                <p style="margin:0;font-size:11.5px;">r=6, h=8 cm &rarr; V = &#8531;&pi;(36)(8) = 96&pi; &asymp; 301,59 cm&sup3;</p>
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 18px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                <svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="#a5b4fc" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><circle cx="24" cy="24" r="16"/><ellipse cx="24" cy="24" rx="16" ry="5.5"/></svg>
                <div><div style="font-family:'Cabinet Grotesk',sans-serif;font-weight:700;font-size:14px;color:#e8eaf4;">Sphere</div><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(221,225,240,0.40);">radius r</div></div>
              </div>
              <div class="def-box" style="padding:10px 12px;margin:0 0 8px;">
                <div class="def-box-title" style="margin-bottom:6px;">Formulas</div>
                <div class="math-block" style="margin:0 0 5px;padding:7px 10px;font-size:13px;">SA = 4&pi;r&sup2;</div>
                <div class="math-block" style="margin:0;padding:7px 10px;font-size:13px;">V = &#8532;&pi;r&sup3;</div>
              </div>
              <div class="example-box" style="padding:9px 12px;margin:0;">
                <div class="example-box-title" style="margin-bottom:5px;">Worked example</div>
                <p style="margin:0;font-size:11.5px;">r=3 cm &rarr; V = &#8532;&pi;(27) = 36&pi; &asymp; 113,10 cm&sup3;</p>
              </div>
            </div>

          </div>
        `
      },
      questions: [
        { type: "input", text: "Find the volume of a rectangular prism with dimensions 6 cm � 4 cm � 9 cm.", answer: "216", topic: "Volume" },
        { type: "mc", text: "Find the volume of a cylinder with r = 5 cm and h = 8 cm. (p � 3,14)", options: ["628 cm�", "251,2 cm�", "502,4 cm�", "1256 cm�"], answer: 0, topic: "Volume" },
        { type: "input", text: "Find the volume of a cone with r = 6 cm and h = 9 cm. (Use p � 3,14; give to nearest whole number)", answer: "339", topic: "Volume" },
        { type: "mc", text: "A sphere has radius 4 cm. Its volume (p � 3,14) is approximately:", options: ["200,96 cm�", "267,95 cm�", "803,84 cm�", "134,04 cm�"], answer: 1, topic: "Volume" },
        { type: "input", text: "A triangular prism has a right-triangle base with legs 6 cm and 8 cm. Its length is 15 cm. Find the volume.", answer: "360", topic: "Volume" },
        { type: "input", text: "A rectangular prism has a volume of 480 cm³. Its length is 10 cm and its width is 6 cm. Find its height (in cm).", answer: "8", topic: "Volume" },
        { type: "input", text: "A cylindrical tank has a volume of 6 280 cm³ and a height of 20 cm. Using p ≈ 3,14, find its radius (in cm).", answer: "10", topic: "Volume" },
      ]
    },
  ],
  workbook: {
    chapter: 15, chapterName: "Surface Area and Volume",
    topics: [
      {
        name: "Surface Area",
        questions: [
          {
            num: "1",
            text: "Calculate the surface area of each solid. (Use p = 3,14 where needed)",
            parts: [
              { label: "a)", text: "A rectangular prism with l = 12 cm, w = 8 cm and h = 5 cm.", marks: 4 },
              { label: "b)", text: "A cylinder with r = 6 cm and h = 10 cm.", marks: 4 },
              { label: "c)", text: "A sphere with radius 5 cm.", marks: 3 },
            ]
          },
        ]
      },
      {
        name: "Volume",
        questions: [
          {
            num: "2",
            text: "Calculate the volume of each solid. (Use p = 3,14 where needed)",
            parts: [
              { label: "a)", text: "A cylinder with r = 7 cm and h = 15 cm.", marks: 3 },
              { label: "b)", text: "A cone with r = 9 cm and h = 12 cm.", marks: 3 },
              { label: "c)", text: "A sphere with diameter 10 cm.", marks: 3 },
            ]
          },
          {
            num: "3",
            text: "A cylindrical water tank has a radius of 1,2 m and a height of 2,5 m.",
            parts: [
              { label: "a)", text: "Calculate the volume of water it can hold (in m�).", marks: 3 },
              { label: "b)", text: "Convert your answer to litres (1 m� = 1 000 litres).", marks: 1 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 15, chapterName: "Chapter 15 � Surface Area and Volume",
    topics: [
      {
        name: "Surface Area",
        answers: [
          { num: "Q1a", ans: "392 cm�", note: "2(96+60+40) = 2�196 = 392" },
          { num: "Q1b", ans: "603,19 cm�", note: "2�3,14�36 + 2�3,14�6�10 = 226,08+376,8 = 602,88 � 603 cm�" },
          { num: "Q1c", ans: "314 cm�", note: "4�3,14�25 = 314" },
        ]
      },
      {
        name: "Volume",
        answers: [
          { num: "Q2a", ans: "2 307,9 cm�", note: "3,14�49�15 = 2 307,9" },
          { num: "Q2b", ans: "1 017,36 cm�", note: "?�3,14�81�12 = 1 017,36" },
          { num: "Q2c", ans: "523,33 cm�", note: "r=5; 4/3�3,14�125 = 523,33" },
          { num: "Q3a", ans: "� 11,31 m�", note: "3,14�1,44�2,5 = 11,304" },
          { num: "Q3b", ans: "� 11 304 litres", note: "11,304 � 1 000" },
        ]
      },
    ]
  }
});
