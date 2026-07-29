// Math Magician — Grade 10, Chapter 11
// Trigonometry Part 2 — 2D Problems

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 1100,
      chapter: 11,
      name: "2D trig problems",
      fullName: "Solving two-dimensional problems using trigonometry",
      lesson: {
        heading: "Two-dimensional trigonometry problems",
        sub: "Chapter 11 · Topic 1",
        body: `
          <p>Trigonometry is applied to real-world problems involving <strong>angles of elevation</strong>, <strong>angles of depression</strong>, and problems requiring multiple triangles.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Angles of elevation and depression</div>
            <p>
              <strong>Angle of elevation:</strong> the angle measured <em>upward</em> from the horizontal to the line of sight.<br>
              <strong>Angle of depression:</strong> the angle measured <em>downward</em> from the horizontal to the line of sight.<br><br>
              These are equal (alternate angles) when the observer and object are on a horizontal plane.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Height of a building</div>
            <p>From a point 40 m from the base of a building, the angle of elevation to the top is 32°.<br>
            <span class="math">tan 32° = height/40</span><br>
            <span class="math">height = 40 × tan 32° ≈ 40 × 0.6249 ≈ 25.0 m</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Strategy for 2D problems</div>
            <p>
              1. Draw a clear diagram.<br>
              2. Label all known and unknown sides and angles.<br>
              3. Identify the right triangle(s).<br>
              4. Apply the appropriate ratio (sin/cos/tan).<br>
              5. Solve for the unknown.<br>
              6. State your answer in context with correct units.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Right Triangle Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter an angle and one side — find the remaining sides using SOH-CAH-TOA.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle θ (°)</div>
                <input id="g10c11ang" type="number" value="32" min="1" max="89"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Known side</div>
                <select id="g10c11side"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:13px;font-family:'JetBrains Mono',monospace;">
                  <option value="adj">Adjacent</option>
                  <option value="opp">Opposite</option>
                  <option value="hyp">Hypotenuse</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Length</div>
                <input id="g10c11len" type="number" value="40" min="0.01"
                  style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c11Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <div id="g10c11Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function run(){
                const ang=parseFloat(document.getElementById('g10c11ang').value);
                const side=document.getElementById('g10c11side').value;
                const len=parseFloat(document.getElementById('g10c11len').value);
                const out=document.getElementById('g10c11Out');
                if(isNaN(ang)||isNaN(len)||ang<=0||ang>=90||len<=0){out.innerHTML='<span style="color:#fca5a5;">Enter valid angle (1°–89°) and positive length.</span>';return;}
                const rad=ang*Math.PI/180;
                const sinA=Math.sin(rad),cosA=Math.cos(rad),tanA=Math.tan(rad);
                let adj,opp,hyp;
                if(side==='adj'){adj=len;opp=adj*tanA;hyp=adj/cosA;}
                else if(side==='opp'){opp=len;adj=opp/tanA;hyp=opp/sinA;}
                else{hyp=len;opp=hyp*sinA;adj=hyp*cosA;}
                const used=side==='adj'?'tan θ = opp/adj → opp = adj × tan θ\ncos θ = adj/hyp → hyp = adj/cos θ'
                  :side==='opp'?'tan θ = opp/adj → adj = opp/tan θ\nsin θ = opp/hyp → hyp = opp/sin θ'
                  :'sin θ = opp/hyp → opp = hyp × sin θ\ncos θ = adj/hyp → adj = hyp × cos θ';
                let html='<span style="color:rgba(221,225,240,0.50);">θ = '+ang+'°, sin = '+f(sinA)+', cos = '+f(cosA)+', tan = '+f(tanA)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+used.replace('\n','<br><span style="color:rgba(221,225,240,0.50);">')+'</span><br>';
                html+='<span style="color:#6ee7b7;">Adjacent = '+f(adj)+'</span>  <span style="color:#6ee7b7;">Opposite = '+f(opp)+'</span>  <span style="color:#6ee7b7;">Hypotenuse = '+f(hyp)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c11Btn').addEventListener('click',run);
              ['g10c11ang','g10c11len'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>For elevation/depression problems, the angle is always measured from the <strong>horizontal</strong>. The adjacent side is the horizontal distance and the opposite is the vertical height.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "From the top of a 30 m cliff, the angle of depression to a boat is 28°. The horizontal distance to the boat is:",
          options: ["30/tan28°", "30·tan28°", "30·sin28°", "30/sin28°"],
          answer: 0,
          topic: "2D trig problems"
        },
        {
          type: "input",
          text: "A ladder leans against a wall. The ladder is 5 m and makes a 60° angle with the ground. How high up the wall does it reach? (to 1 decimal place)",
          answer: "4.3",
          altAnswers: ["4,3"],
          topic: "2D trig problems"
        },
        {
          type: "mc",
          text: "The angle of elevation from A to the top of a tower is 45°. If the tower is 20 m tall, the distance from A to the base is:",
          options: ["20 m", "10 m", "20√2 m", "40 m"],
          answer: 0,
          topic: "2D trig problems"
        },
        {
          type: "mc",
          text: "From the top of a building 50 m high, the angle of depression to a car is 35°. The distance from the base of the building to the car (to nearest metre) is:",
          options: ["35 m", "71 m", "29 m", "61 m"],
          answer: 1,
          topic: "2D trig problems"
        },
        {
          type: "mc",
          text: "Two people stand on opposite sides of a flagpole. Person A is 8 m away and sees the top at 60°. Person B sees the top at 45°. What equation finds the height h?",
          options: ["h = 8·tan60°", "h = 8·sin60°", "h = 8/tan60°", "h = 8·cos60°"],
          answer: 0,
          topic: "2D trig problems"
        },
        {
          type: "input",
          text: "From a point 25 m from the base of a tower, the angle of elevation to the top is 38°. Find the height of the tower, correct to 2 decimal places.",
          answer: "19.53",
          altAnswers: ["19,53"],
          topic: "2D trig problems"
        },
        {
          type: "input",
          text: "A vertical pole 12 m tall casts a horizontal shadow of 9 m. Find the angle of elevation of the sun, correct to 1 decimal place.",
          answer: "53.1",
          altAnswers: ["53,1", "53.1°"],
          topic: "2D trig problems"
        }
      ]
    },
    {
      id: 1101,
      chapter: 11,
      name: "Multi-triangle problems",
      fullName: "Problems involving two or more triangles",
      lesson: {
        heading: "Problems involving multiple triangles",
        sub: "Chapter 11 · Topic 2",
        body: `
          <p>Some problems require you to work through <strong>two triangles</strong> in sequence, using the answer from the first to solve the second.</p>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Two-triangle problem</div>
            <p>From point A, the angle of elevation to the top (T) of a building is 55°. From point B, which is 20 m further away from the building's base (C), the angle is 35°.<br><br>
            Let BC = 20, AC = d (unknown), CT = h.<br>
            From △ACT: <span class="math">tan 55° = h/d → h = d·tan55°</span><br>
            From △BCT: <span class="math">tan 35° = h/(d+20)</span><br>
            Substitute: <span class="math">d·tan55° = (d+20)·tan35°</span><br>
            <span class="math">d(tan55° − tan35°) = 20·tan35°</span><br>
            <span class="math">d = 20·tan35°/(tan55° − tan35°)</span><br>
            Then h = d·tan55°</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Tip: Carrying exact values</div>
            <p>When solving in two stages, keep the intermediate answer <em>unrounded</em> in your calculator, then round only at the final step.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Two-Triangle Height Finder</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Two observers at A (closer) and B (further) see the top of a vertical structure. Enter angles of elevation and the distance AB — find the height.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle at A (°)</div><input id="g10c11t2a" type="number" value="55" min="1" max="89" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle at B (°)</div><input id="g10c11t2b" type="number" value="35" min="1" max="89" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Distance AB (m)</div><input id="g10c11t2d" type="number" value="20" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c11t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <div id="g10c11t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(3);}
              function run(){
                const angA=parseFloat(document.getElementById('g10c11t2a').value);
                const angB=parseFloat(document.getElementById('g10c11t2b').value);
                const AB=parseFloat(document.getElementById('g10c11t2d').value);
                const out=document.getElementById('g10c11t2Out');
                if(isNaN(angA)||isNaN(angB)||isNaN(AB)||angA<=angB||angA>=90||angB<=0||AB<=0){
                  out.innerHTML='<span style="color:#fca5a5;">Angle at A must be greater than angle at B (A is closer). Both must be between 1° and 89°.</span>';return;
                }
                const tA=Math.tan(angA*Math.PI/180),tB=Math.tan(angB*Math.PI/180);
                // h = d·tanA·tanB/(tanA − tanB)
                const h=AB*tA*tB/(tA-tB);
                const d=h/tA;
                let html='<span style="color:rgba(221,225,240,0.50);">From △ACT: h = d·tanA → d = h/tanA</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">From △BCT: h = (d+AB)·tanB</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Solving: h = AB·tanA·tanB/(tanA−tanB) = '+AB+'×'+f(tA)+'×'+f(tB)+'/('+f(tA)+'−'+f(tB)+')</span><br>';
                html+='<span style="color:#6ee7b7;">Height = '+f(h)+' m</span>  <span style="color:rgba(221,225,240,0.50);">Distance AC = '+f(d)+' m</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c11t2Btn').addEventListener('click',run);
              ['g10c11t2a','g10c11t2b','g10c11t2d'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The formula h = d·tanA·tanB/(tanA − tanB) comes from setting up both tan equations and eliminating d algebraically — a key exam technique.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a two-triangle problem, you must always:",
          options: ["Use the same angle in both triangles", "Find a shared side between the two triangles", "Use sin for one and cos for the other", "Convert to degrees first"],
          answer: 1,
          topic: "Multi-triangle problems"
        },
        {
          type: "mc",
          text: "From A, the elevation to a tower top is 40°. From B (15 m further back), it is 25°. The shared side is:",
          options: ["The tower height", "The base from B", "The hypotenuse", "The distance AB"],
          answer: 0,
          topic: "Multi-triangle problems"
        },
        {
          type: "mc",
          text: "A kite string makes 50° with the ground and is 80 m long. Assuming the string is straight, the height of the kite is approximately:",
          options: ["51 m", "61 m", "73 m", "80 m"],
          answer: 1,
          topic: "Multi-triangle problems"
        },
        {
          type: "mc",
          text: "When carrying intermediate values in calculator, you should:",
          options: ["Round to 2 decimal places each step", "Round only at the final answer", "Use only special angles", "Convert to radians first"],
          answer: 1,
          topic: "Multi-triangle problems"
        },
        {
          type: "input",
          text: "In a right triangle, which ratio relates the opposite side to the hypotenuse?",
          answer: "sin",
          topic: "Multi-triangle problems"
        },
        {
          type: "input",
          text: "From A, the angle of elevation to the top of a tower is 50°. From B, 15 m further from the tower along the same line, the angle is 30°. Find the height of the tower, correct to 2 decimal places.",
          answer: "16.80",
          altAnswers: ["16.8", "16,80", "16,8"],
          topic: "Multi-triangle problems"
        }
      ]
    },
    {
      id: 1102,
      chapter: 11,
      name: "Bearings & navigation problems",
      fullName: "Solving two-dimensional problems involving compass bearings",
      lesson: {
        heading: "Bearings and navigation problems",
        sub: "Chapter 11 · Topic 3",
        body: `
          <p>A <strong>bearing</strong> is a way of describing direction as an angle measured <em>clockwise from North</em>, always written as three digits (e.g. 035°, 270°).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Reading and using bearings</div>
            <p>
              • North = 000°, East = 090°, South = 180°, West = 270°.<br>
              • A bearing of 060° means 60° clockwise from North.<br>
              • To find the return (back) bearing, add 180° if the original bearing is under 180°, or subtract 180° if it is 180° or more.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Strategy for bearing problems</div>
            <p>
              1. Draw a diagram with compass directions marked at each point.<br>
              2. Convert bearings into angles inside the triangle formed by the paths (often using co-interior or alternate angle facts, since North lines at different points are parallel).<br>
              3. Apply right-angled trigonometry (or split into right triangles) to find the unknown distance or angle.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>A ship sails from port P on a bearing of 090° (due East) for 40 km to point Q. From Q, it's known that the bearing back to P is 270°.<br>
            A hiker at P wants the bearing of a mountain M, due North of Q at a distance of 30 km.<br>
            Since PQ ⊥ QM (P→Q is East, Q→M is North), △PQM is right-angled at Q.<br>
            <span class="math">tan(∠QPM) = 30/40 = 0.75 → ∠QPM ≈ 36.87°</span><br>
            Bearing of M from P = 090° − 36.87° ≈ 053.1°</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Right-Angle Bearing Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">A person travels East then North (a right-angle turn) — enter both distances to find the direct distance and the bearing back to the start.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">East leg (km)</div><input id="g10c11bE" type="number" value="40" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">North leg (km)</div><input id="g10c11bN" type="number" value="30" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c11bBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Solve</button>
            </div>
            <div id="g10c11bOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(2);}
              function run(){
                const E=parseFloat(document.getElementById('g10c11bE').value);
                const N=parseFloat(document.getElementById('g10c11bN').value);
                const out=document.getElementById('g10c11bOut');
                if(isNaN(E)||isNaN(N)||E<=0||N<=0){out.innerHTML='<span style="color:#fca5a5;">Enter two positive distances.</span>';return;}
                const dist=Math.sqrt(E*E+N*N);
                const angleFromEast=Math.atan2(N,E)*180/Math.PI; // angle above the East line at start
                const bearingOut=90-angleFromEast; // bearing of final point from start
                const bearingBack=(bearingOut+180)%360;
                let html='<span style="color:rgba(221,225,240,0.50);">Direct distance = √(E²+N²) = √('+E+'²+'+N+'²) = </span><span style="color:#6ee7b7;">'+f(dist)+' km</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Angle above East line = tan⁻¹('+N+'/'+E+') ≈ '+f(angleFromEast)+'°</span><br>';
                html+='<span style="color:#6ee7b7;">Bearing of finish point from start ≈ '+f(bearingOut)+'°</span>  ';
                html+='<span style="color:#fcd34d;">Bearing back to start ≈ '+f(bearingBack)+'°</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c11bBtn').addEventListener('click',run);
              ['g10c11bE','g10c11bN'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>North lines drawn at two different points are parallel — this lets you use alternate/co-interior angle facts to transfer a bearing angle into a usable triangle angle.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A bearing of 135° means the direction is:",
          options: ["Due South", "South-East", "North-East", "South-West"],
          answer: 1,
          topic: "Bearings & navigation problems"
        },
        {
          type: "mc",
          text: "If the bearing from A to B is 050°, the bearing from B to A (the return bearing) is:",
          options: ["050°", "130°", "230°", "310°"],
          answer: 2,
          topic: "Bearings & navigation problems"
        },
        {
          type: "input",
          text: "A hiker walks 60 km East then 25 km North. Find the direct distance back to the start (to 1 decimal place).",
          answer: "65.0",
          altAnswers: ["65", "65,0"],
          topic: "Bearings & navigation problems"
        },
        {
          type: "mc",
          text: "A ship travels 50 km on a bearing of 090° then 50 km on a bearing of 000°. The angle between its outbound leg and its final position (as seen from the start), measured from East towards North, is closest to:",
          options: ["30°", "45°", "60°", "90°"],
          answer: 1,
          topic: "Bearings & navigation problems"
        },
        {
          type: "mc",
          text: "Two towns' North lines are used in a bearing problem. Why can alternate angles be used between them?",
          options: ["The North lines are perpendicular", "The North lines are parallel", "The towns are the same distance from the equator", "Bearings are always less than 180°"],
          answer: 1,
          topic: "Bearings & navigation problems"
        },
        {
          type: "input",
          text: "A hiker walks 18 km on a bearing of 060°, then 24 km on a bearing of 150° (a right-angle turn). Find the direct distance from the start to the final point.",
          answer: "30",
          altAnswers: ["30 km", "30.0"],
          topic: "Bearings & navigation problems"
        },
        {
          type: "input",
          text: "A ship sails 45 km on a bearing of 090°, then 28 km on a bearing of 000°. Find the bearing of the final position from the start point, to the nearest degree.",
          answer: "058",
          altAnswers: ["58", "058°", "58°"],
          topic: "Bearings & navigation problems"
        }
      ]
    },
    {
      id: 1103,
      chapter: 11,
      name: "Mixed 2D trigonometry applications",
      fullName: "Combining elevation, depression, and multi-triangle techniques in mixed problems",
      lesson: {
        heading: "Mixed 2D trigonometry applications",
        sub: "Chapter 11 · Topic 4",
        body: `
          <p>Exam problems often combine several ideas at once — elevation and depression, two triangles, and sometimes the sine or cosine rule extended informally through right-angled splitting.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Recognising the right approach</div>
            <p>
              • If ONE right triangle and one unknown → use SOH-CAH-TOA directly.<br>
              • If TWO triangles share a common side or angle → set up two equations and solve simultaneously (as in the flagpole/two-triangle method).<br>
              • If a problem gives both an angle of elevation and an angle of depression from the same point → the two angles combine to give the full angle between the lines of sight.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Elevation and depression together</div>
            <p>From the top of a 45 m tower, the angle of elevation to the top of a taller building is 20°, and the angle of depression to the base of the same building is 35°. The buildings are on level ground.<br>
            Horizontal distance: <span class="math">tan35° = 45/d → d = 45/tan35° ≈ 64.26 m</span><br>
            Extra height above tower level: <span class="math">tan20° = h/d → h = 64.26 × tan20° ≈ 23.39 m</span><br>
            Total building height ≈ 45 + 23.39 ≈ 68.39 m</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 The classic "two flagpoles" problem</div>
            <p>Two flagpoles of different heights stand a known distance apart, connected by two ropes crossing between the top of each pole and the foot of the other. The height at which the ropes cross can be found using similar triangles: <span class="math">height = (h₁ × h₂)/(h₁ + h₂)</span>, independent of the distance between the poles!</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Two Flagpoles — Rope Crossing Height</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter the heights of two flagpoles — find where two ropes (top-to-foot) crossing between them intersect.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Pole 1 height (m)</div><input id="g10c11fh1" type="number" value="10" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Pole 2 height (m)</div><input id="g10c11fh2" type="number" value="15" min="0.1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Distance apart (m)</div><input id="g10c11fd" type="number" value="30" min="0.1" style="width:85px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g10c11fBtn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c11fOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(3);}
              function run(){
                const h1=parseFloat(document.getElementById('g10c11fh1').value);
                const h2=parseFloat(document.getElementById('g10c11fh2').value);
                const d=parseFloat(document.getElementById('g10c11fd').value);
                const out=document.getElementById('g10c11fOut');
                if([h1,h2,d].some(isNaN)||h1<=0||h2<=0||d<=0){out.innerHTML='<span style="color:#fca5a5;">Enter three positive values.</span>';return;}
                const h=(h1*h2)/(h1+h2);
                let html='<span style="color:rgba(221,225,240,0.50);">height = (h₁×h₂)/(h₁+h₂) = ('+h1+'×'+h2+')/('+h1+'+'+h2+')</span><br>';
                html+='<span style="color:#6ee7b7;">Crossing height ≈ '+f(h)+' m</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">— notice this does NOT depend on the distance apart ('+d+' m had no effect)!</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c11fBtn').addEventListener('click',run);
              ['g10c11fh1','g10c11fh2','g10c11fd'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')run();}));
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>The flagpole-crossing-height formula surprises many learners because the distance between the poles cancels out algebraically — always check whether a "obviously needed" value actually cancels before assuming you're missing information.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Two flagpoles are 12 m and 8 m tall. Ropes connect the top of each to the foot of the other. The height where they cross is:",
          options: ["4.8 m", "10 m", "6 m", "20 m"],
          answer: 0,
          topic: "Mixed 2D trigonometry applications"
        },
        {
          type: "mc",
          text: "From a 50 m tower, the angle of depression to the base of a nearby building is 40°, and the angle of elevation to its top is 15°. Which two right triangles are needed?",
          options: ["Only one — they use the same triangle", "One triangle for the horizontal distance, another for the extra height above the tower", "Neither — use the sine rule only", "The building height cannot be found"],
          answer: 1,
          topic: "Mixed 2D trigonometry applications"
        },
        {
          type: "input",
          text: "Two flagpoles are 20 m and 30 m tall. Find the height (in m, to 1 decimal place) where the connecting ropes cross.",
          answer: "12.0",
          altAnswers: ["12", "12,0"],
          topic: "Mixed 2D trigonometry applications"
        },
        {
          type: "mc",
          text: "In the flagpole-crossing problem, the distance between the poles:",
          options: ["Must be measured first", "Cancels out of the final height formula", "Doubles the crossing height", "Is needed to find which rope is longer"],
          answer: 1,
          topic: "Mixed 2D trigonometry applications"
        },
        {
          type: "mc",
          text: "From the top of a cliff, the angle of depression to a boat is 25° and to a second boat further out is 12°. To find the distance between the boats, you should:",
          options: ["Subtract the two horizontal distances found separately", "Add the two angles", "Use only the closer boat's data", "Multiply the two tangent ratios"],
          answer: 0,
          topic: "Mixed 2D trigonometry applications"
        },
        {
          type: "input",
          text: "From the top of a 36 m tower, the angle of depression to the base of a nearby building is 32°, and the angle of elevation to the top of the same building is 18°. Find the total height of the building, correct to 2 decimal places.",
          answer: "54.72",
          altAnswers: ["54,72"],
          topic: "Mixed 2D trigonometry applications"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 11 Workbook — Trigonometry Part 2",
    questions: [
      {
        number: 1,
        text: "A pilot flying at 3 500 m altitude sees an airport at an angle of depression of 18°.",
        parts: [
          { label: "a", text: "Draw a diagram.", marks: 2 },
          { label: "b", text: "Calculate the horizontal distance from the plane to the airport (to the nearest metre).", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "From point A on level ground, the angle of elevation to the top of a vertical tower BC is 48°. Point A is 25 m from the base B.",
        parts: [
          { label: "a", text: "Find the height of the tower (to 2 decimal places).", marks: 3 },
          { label: "b", text: "Point D is on the same line as A and B, on the other side of B, 10 m from B. Find the angle of elevation from D to the top of the tower.", marks: 4 }
        ]
      },
      {
        number: 3,
        text: "From the top of a cliff 60 m high, two boats A and B are observed in the sea. Boat A has angle of depression 42°, boat B has angle of depression 28°. Boats A and B are on the same side of the cliff in a straight line.",
        parts: [
          { label: "a", text: "Find the distance from the base of the cliff to boat A.", marks: 3 },
          { label: "b", text: "Find the distance from the base of the cliff to boat B.", marks: 3 },
          { label: "c", text: "Find the distance between the two boats.", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Right triangle: horizontal distance from directly below plane to airport",
        b: "tan18° = 3500/d → d = 3500/tan18° ≈ 10 763 m"
      },
      2: {
        a: "tan48° = BC/25 → BC = 25×tan48° ≈ 27.77 m",
        b: "tan θ = 27.77/35 → θ ≈ 38.4°"
      },
      3: {
        a: "tan42° = 60/dA → dA = 60/tan42° ≈ 66.64 m",
        b: "tan28° = 60/dB → dB = 60/tan28° ≈ 112.87 m",
        c: "AB = 112.87 − 66.64 ≈ 46.23 m"
      }
    }
  }
});
