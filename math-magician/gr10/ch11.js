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
          text: "A flagpole stands on a hill. The hill slopes at 10°. The flagpole stands vertically and is 12 m tall. The angle of elevation to the top of the pole from the base of the hill is 35°. Set up but do not solve: which trig ratio relates the height to the distance along the slope?",
          answer: "sin",
          altAnswers: ["tan", "cos"],
          topic: "Multi-triangle problems"
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
