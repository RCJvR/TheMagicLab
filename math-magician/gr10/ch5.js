// Math Magician — Grade 10, Chapter 5
// Trigonometry (Part 1)

MathMagician.registerChapter(5, {
  topics: [
    {
      id: 500,
      chapter: 5,
      name: "Trig ratios & special angles",
      fullName: "Defining trigonometric ratios, reciprocal ratios, and special angles",
      lesson: {
        heading: "Trigonometric ratios and special angles",
        sub: "Chapter 5 · Topic 1",
        body: `
          <p><strong>Trigonometry</strong> studies the relationships between the angles and sides of triangles. In a right-angled triangle:</p>

          <div class="def-box">
            <div class="def-box-title">📖 The three primary ratios (SOH-CAH-TOA)</div>
            <p>
              <span class="math">sin θ = opposite / hypotenuse</span><br>
              <span class="math">cos θ = adjacent / hypotenuse</span><br>
              <span class="math">tan θ = opposite / adjacent</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reciprocal ratios</div>
            <p>
              <span class="math">cosec θ = 1/sin θ</span><br>
              <span class="math">sec θ = 1/cos θ</span><br>
              <span class="math">cot θ = 1/tan θ</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Special angles (no calculator)</div>
            <p>
              | θ | sin | cos | tan |<br>
              | 30° | ½ | √3/2 | 1/√3 = √3/3 |<br>
              | 45° | √2/2 | √2/2 | 1 |<br>
              | 60° | √3/2 | ½ | √3 |<br>
              | 0° | 0 | 1 | 0 |<br>
              | 90° | 1 | 0 | undefined |
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Evaluate without a calculator</div>
            <p><span class="math">sin 60° · cos 30° + cos 60° · sin 30°</span><br>
            <span class="math">= (√3/2)(√3/2) + (½)(½)</span><br>
            <span class="math">= 3/4 + 1/4 = 1</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Special Angles Explorer</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Select any special angle and ratio — see the exact value and its derivation.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Angle</div>
                <select id="g10c5angle"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="0">0°</option>
                  <option value="30">30°</option>
                  <option value="45">45°</option>
                  <option value="60">60°</option>
                  <option value="90">90°</option>
                </select>
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Ratio</div>
                <select id="g10c5ratio"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin</option>
                  <option value="cos">cos</option>
                  <option value="tan">tan</option>
                </select>
              </div>
            </div>
            <div id="g10c5Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              const vals={
                sin:{'0':'0','30':'½','45':'√2/2','60':'√3/2','90':'1'},
                cos:{'0':'1','30':'√3/2','45':'√2/2','60':'½','90':'0'},
                tan:{'0':'0','30':'√3/3','45':'1','60':'√3','90':'undefined'}
              };
              const dec={
                sin:{'0':'0','30':'0.5000','45':'0.7071','60':'0.8660','90':'1'},
                cos:{'0':'1','30':'0.8660','45':'0.7071','60':'0.5000','90':'0'},
                tan:{'0':'0','30':'0.5774','45':'1.0000','60':'1.7321','90':'—'}
              };
              const explain={
                '30sin':'From a 30-60-90 triangle: sides 1, √3, 2. Opposite to 30° = 1, hypotenuse = 2.',
                '30cos':'From a 30-60-90 triangle: adjacent to 30° = √3, hypotenuse = 2.',
                '30tan':'Opposite/adjacent = 1/√3 = √3/3 (rationalised).',
                '45sin':'From a 45-45-90 triangle: sides 1, 1, √2. Opposite = 1, hyp = √2.',
                '45cos':'Adjacent = 1, hypotenuse = √2. Same as sin 45°.',
                '45tan':'Opposite = adjacent = 1, so tan 45° = 1.',
                '60sin':'From a 30-60-90 triangle: opposite to 60° = √3, hypotenuse = 2.',
                '60cos':'Adjacent to 60° = 1, hypotenuse = 2.',
                '60tan':'Opposite/adjacent = √3/1 = √3.',
                '0sin':'At 0°, the opposite side has length 0.',
                '0cos':'At 0°, adjacent = hypotenuse, so ratio = 1.',
                '0tan':'sin 0°/cos 0° = 0/1 = 0.',
                '90sin':'At 90°, opposite = hypotenuse, so ratio = 1.',
                '90cos':'At 90°, adjacent = 0.',
                '90tan':'sin 90°/cos 90° = 1/0 — undefined.'
              };
              function update(){
                const a=document.getElementById('g10c5angle').value;
                const r=document.getElementById('g10c5ratio').value;
                const exact=vals[r][a];
                const decVal=dec[r][a];
                const expl=explain[a+r]||'';
                const undef=exact==='undefined';
                document.getElementById('g10c5Out').innerHTML=
                  '<span style="color:rgba(221,225,240,0.50);">'+r+' '+a+'° = </span>'
                  +'<span style="color:#fcd34d;font-size:16px;">'+exact+'</span>'
                  +(undef?'':' <span style="color:rgba(221,225,240,0.40);">≈ '+decVal+'</span>')+'<br>'
                  +(expl?'<span style="color:rgba(221,225,240,0.55);font-size:13px;">'+expl+'</span>':'');
              }
              document.getElementById('g10c5angle').addEventListener('change',update);
              document.getElementById('g10c5ratio').addEventListener('change',update);
              update();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Draw the 30-60-90 (sides: 1, √3, 2) and 45-45-90 (sides: 1, 1, √2) triangles from memory — all special angle values come from these two triangles.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a right triangle, the side opposite θ is 5 and the hypotenuse is 13. Find sin θ:",
          options: ["5/13", "12/13", "5/12", "13/5"],
          answer: 0,
          topic: "Trig ratios & special angles"
        },
        {
          type: "input",
          text: "Evaluate (no calculator): tan 45° + sin 30°",
          answer: "3/2",
          altAnswers: ["1.5"],
          topic: "Trig ratios & special angles"
        },
        {
          type: "mc",
          text: "If sin θ = 3/5, what is cos θ (acute angle)?",
          options: ["4/5", "3/4", "5/3", "5/4"],
          answer: 0,
          topic: "Trig ratios & special angles"
        },
        {
          type: "mc",
          text: "Evaluate: sin²30° + cos²30°",
          options: ["½", "1", "√3/2", "3/4"],
          answer: 1,
          topic: "Trig ratios & special angles"
        },
        {
          type: "input",
          text: "Evaluate: cos 60° ÷ tan 60°",
          answer: "√3/6",
          topic: "Trig ratios & special angles"
        }
      ]
    },
    {
      id: 501,
      chapter: 5,
      name: "Trig equations & Cartesian plane",
      fullName: "Solving trig equations and defining ratios in the Cartesian plane",
      lesson: {
        heading: "Solving trig equations and the Cartesian plane",
        sub: "Chapter 5 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Ratios in the Cartesian plane — CAST rule</div>
            <p>For a point P(x, y) on a circle of radius r = √(x² + y²):<br>
            <span class="math">sin θ = y/r, cos θ = x/r, tan θ = y/x</span><br><br>
            <strong>CAST rule</strong> — which ratios are positive in each quadrant:<br>
            Q1 (0°–90°): <strong>All</strong> positive<br>
            Q2 (90°–180°): <strong>Sine</strong> only<br>
            Q3 (180°–270°): <strong>Tangent</strong> only<br>
            Q4 (270°–360°): <strong>Cosine</strong> only</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reference angles</div>
            <p>To find trig ratios for angles in Q2, Q3, Q4, use the acute reference angle θ_ref:<br>
            Q2: <span class="math">sin(180°−θ) = sin θ</span>, <span class="math">cos(180°−θ) = −cos θ</span><br>
            Q3: <span class="math">sin(180°+θ) = −sin θ</span>, <span class="math">cos(180°+θ) = −cos θ</span><br>
            Q4: <span class="math">sin(360°−θ) = −sin θ</span>, <span class="math">cos(360°−θ) = cos θ</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Solve for θ ∈ [0°; 360°]</div>
            <p><span class="math">sin θ = −½</span><br>
            Reference angle: <span class="math">sin 30° = ½</span><br>
            sin is negative in Q3 and Q4:<br>
            <span class="math">θ = 180° + 30° = 210°</span><br>
            <span class="math">θ = 360° − 30° = 330°</span></p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 CAST Rule & Trig Equation Solver</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter a trig ratio value — find all solutions for θ ∈ [0°; 360°] using the CAST rule.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Ratio</div>
                <select id="g10c5cratio"
                  style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;">
                  <option value="sin">sin θ</option>
                  <option value="cos">cos θ</option>
                  <option value="tan">tan θ</option>
                </select>
              </div>
              <div style="padding-bottom:9px;color:rgba(221,225,240,0.60);font-size:16px;">=</div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Value</div>
                <input id="g10c5cval" type="number" step="0.001" value="-0.5"
                  style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;">
              </div>
              <button id="g10c5cBtn"
                style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">
                Solve
              </button>
            </div>
            <div id="g10c5cOut" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function round1(x){return Math.round(x*10)/10;}
              function solve(){
                const r=document.getElementById('g10c5cratio').value;
                const v=parseFloat(document.getElementById('g10c5cval').value);
                const out=document.getElementById('g10c5cOut');
                if(isNaN(v)){out.innerHTML='<span style="color:#fca5a5;">Enter a decimal value.</span>';return;}
                if((r==='sin'||r==='cos')&&(v<-1||v>1)){out.innerHTML='<span style="color:#fca5a5;">'+r+' θ must be between −1 and 1.</span>';return;}
                let ref=Math.round(Math.abs(Math.asin(r==='sin'?v:r==='cos'?v:0)*180/Math.PI)*10)/10;
                if(r==='cos') ref=Math.round(Math.acos(Math.abs(v))*180/Math.PI*10)/10;
                if(r==='tan') ref=Math.round(Math.atan(Math.abs(v))*180/Math.PI*10)/10;
                const pos=v>=0;
                let quads=[], solutions=[];
                if(r==='sin'){
                  quads=pos?['Q1','Q2']:['Q3','Q4'];
                  solutions=pos?[ref, 180-ref]:[180+ref, 360-ref];
                } else if(r==='cos'){
                  quads=pos?['Q1','Q4']:['Q2','Q3'];
                  solutions=pos?[ref, 360-ref]:[180-ref, 180+ref];
                } else {
                  quads=pos?['Q1','Q3']:['Q2','Q4'];
                  solutions=pos?[ref, 180+ref]:[180-ref, 360-ref];
                }
                solutions=solutions.map(x=>Math.round(x*10)/10).filter(x=>x>=0&&x<=360);
                let html='<span style="color:rgba(221,225,240,0.50);">Equation: </span><span style="color:#fcd34d;">'+r+' θ = '+v+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Reference angle: θ_ref = '+ref+'°</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">'+r+' is '+(pos?'positive':'negative')+' in '+quads.join(' and ')+'</span><br>';
                html+='<span style="color:#6ee7b7;">θ = '+solutions.join('° or ')+'°</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c5cBtn').addEventListener('click',solve);
              document.getElementById('g10c5cval').addEventListener('keydown',e=>{if(e.key==='Enter')solve();});
              solve();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span><strong>CAST</strong> — reading anti-clockwise from Q4: Cos, All, Sin, Tan tells you which ratio is positive in each quadrant. The reference angle is always the acute angle from the x-axis.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In which quadrant is sin positive and cos negative?",
          options: ["Quadrant 1", "Quadrant 2", "Quadrant 3", "Quadrant 4"],
          answer: 1,
          topic: "Trig equations & Cartesian plane"
        },
        {
          type: "mc",
          text: "Solve for θ ∈ [0°; 360°]: cos θ = √3/2",
          options: ["30° only", "30° and 330°", "30° and 150°", "60° and 300°"],
          answer: 1,
          topic: "Trig equations & Cartesian plane"
        },
        {
          type: "mc",
          text: "If point P(−3, 4) is on a circle, find sin θ:",
          options: ["4/5", "−3/5", "−4/5", "3/5"],
          answer: 0,
          topic: "Trig equations & Cartesian plane"
        },
        {
          type: "input",
          text: "Solve: tan θ = 1 for θ ∈ [0°; 360°]. Give the smaller solution.",
          answer: "45",
          topic: "Trig equations & Cartesian plane"
        },
        {
          type: "mc",
          text: "sin 150° equals:",
          options: ["−½", "√3/2", "½", "−√3/2"],
          answer: 2,
          topic: "Trig equations & Cartesian plane"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 5 Workbook — Trigonometry",
    questions: [
      {
        number: 1,
        text: "In △ABC with right angle at C, AB = 10 and BC = 6.",
        parts: [
          { label: "a", text: "Calculate AC.", marks: 2 },
          { label: "b", text: "Write down sin A, cos A, and tan A as fractions.", marks: 3 },
          { label: "c", text: "Find the size of angle A (to the nearest degree).", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Evaluate without a calculator (show all steps):",
        parts: [
          { label: "a", text: "sin 60° · cos 30° − sin 30° · cos 60°", marks: 3 },
          { label: "b", text: "(tan 45° + sin 60°) / cos 30°", marks: 3 },
          { label: "c", text: "cos²45° − sin²45°", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "Point P(−5, 12) lies on the terminal arm of angle θ.",
        parts: [
          { label: "a", text: "Calculate r.", marks: 2 },
          { label: "b", text: "In which quadrant does P lie?", marks: 1 },
          { label: "c", text: "Determine sin θ, cos θ, and tan θ.", marks: 3 }
        ]
      },
      {
        number: 4,
        text: "Solve for θ ∈ [0°; 360°]:",
        parts: [
          { label: "a", text: "sin θ = √3/2", marks: 3 },
          { label: "b", text: "cos θ = −1/2", marks: 3 },
          { label: "c", text: "2tan θ + 2 = 0", marks: 4 }
        ]
      }
    ],
    answers: {
      1: {
        a: "AC = √(100−36) = 8",
        b: "sin A = 6/10 = 3/5; cos A = 8/10 = 4/5; tan A = 6/8 = 3/4",
        c: "A = sin⁻¹(0.6) ≈ 37°"
      },
      2: {
        a: "(√3/2)(√3/2)−(1/2)(1/2) = 3/4−1/4 = 1/2",
        b: "(1+√3/2)/(√3/2) = 2/√3 + 1 = 2√3/3 + 1",
        c: "1/2 − 1/2 = 0"
      },
      3: {
        a: "r = 13",
        b: "Quadrant 2",
        c: "sin θ = 12/13; cos θ = −5/13; tan θ = −12/5"
      },
      4: {
        a: "θ = 60° or 120°",
        b: "θ = 120° or 240°",
        c: "tan θ = −1 → θ = 135° or 315°"
      }
    }
  }
});
