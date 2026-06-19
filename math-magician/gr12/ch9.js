// Math Magician — Grade 12, Chapter 9
// Statistics — Regression and Correlation

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 900,
      chapter: 9,
      name: "Scatter plots & regression",
      fullName: "Scatter plots, line of best fit, and least squares regression",
      lesson: {
        heading: "Scatter plots and regression",
        sub: "Chapter 9 · Topic 1",
        body: `
          <p>Grade 12 Statistics introduces <strong>bivariate data</strong> — studying the relationship between two variables.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Scatter plots</div>
            <p>
              A <strong>scatter plot</strong> displays pairs of data (x, y) as points on a Cartesian plane.<br>
              Used to visually identify whether a relationship (correlation) exists between x and y.<br><br>
              Patterns to look for:<br>
              • Points rising left to right → positive correlation<br>
              • Points falling left to right → negative correlation<br>
              • No pattern → no correlation
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Line of best fit (regression line)</div>
            <p>
              The <strong>least squares regression line</strong> (ŷ = a + bx) minimises the sum of squared vertical distances from data points to the line.<br><br>
              Formulae (can use calculator in exam):<br>
              <span class="math">b = (nΣxy − ΣxΣy) / (nΣx² − (Σx)²)</span><br>
              <span class="math">a = ȳ − bx̄</span><br><br>
              The line always passes through the <strong>mean point (x̄, ȳ)</strong>.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Using the regression line</div>
            <p>
              <strong>Interpolation:</strong> predicting y for an x within the data range (reliable)<br>
              <strong>Extrapolation:</strong> predicting y for an x outside the data range (unreliable)<br><br>
              Always state whether a prediction is an interpolation or extrapolation.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Regression Line Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter paired data (x and y comma-separated) — compute ŷ = a + bx, r, and make predictions.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:8px;">
              <div style="flex:1;min-width:200px;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x values (comma-separated)</div><input id="g12c9xv" type="text" value="2,3,4,5,6,8" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;"></div>
              <div style="flex:1;min-width:200px;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y values (comma-separated)</div><input id="g12c9yv" type="text" value="45,52,58,65,70,82" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;"></div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Predict at x=</div><input id="g12c9xp" type="number" value="7" style="width:70px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:15px;font-family:'JetBrains Mono',monospace;text-align:center;"></div>
              <button id="g12c9Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Compute</button>
            </div>
            <div id="g12c9Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function calc(){
                const xraw=document.getElementById('g12c9xv').value,yraw=document.getElementById('g12c9yv').value;
                const xs=xraw.split(',').map(s=>parseFloat(s.trim())),ys=yraw.split(',').map(s=>parseFloat(s.trim()));
                const out=document.getElementById('g12c9Out');
                if(xs.some(isNaN)||ys.some(isNaN)||xs.length<2||xs.length!==ys.length){out.innerHTML='<span style="color:#fca5a5;">Enter equal-length numeric x and y lists (min 2).</span>';return;}
                const n=xs.length;
                const sx=xs.reduce((a,b)=>a+b,0),sy=ys.reduce((a,b)=>a+b,0);
                const sxy=xs.reduce((a,x,i)=>a+x*ys[i],0);
                const sx2=xs.reduce((a,x)=>a+x*x,0);
                const sy2=ys.reduce((a,y)=>a+y*y,0);
                const b=(n*sxy-sx*sy)/(n*sx2-sx*sx);
                const xbar=sx/n,ybar=sy/n;
                const a=ybar-b*xbar;
                const r=(n*sxy-sx*sy)/Math.sqrt((n*sx2-sx*sx)*(n*sy2-sy*sy));
                const xp=parseFloat(document.getElementById('g12c9xp').value);
                const xmin=Math.min(...xs),xmax=Math.max(...xs);
                const pred=a+b*xp;
                const strength=Math.abs(r)>=0.8?'strong':Math.abs(r)>=0.5?'moderate':'weak';
                const dir=r>=0?'positive':'negative';
                let html='<span style="color:rgba(221,225,240,0.50);">n='+n+'  x̄='+f(xbar)+'  ȳ='+f(ybar)+'</span><br>';
                html+='<span style="color:#6ee7b7;">ŷ = '+f(a)+' + '+f(b)+'x</span><br>';
                html+='<span style="color:#fcd34d;">r = '+f(r)+'  ('+strength+' '+dir+' correlation)</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">r² = '+f(r*r)+' → '+f(r*r*100)+'% of variation in y explained by x</span>';
                if(!isNaN(xp)){
                  const interp=xp>=xmin&&xp<=xmax;
                  html+='<br><span style="color:#6ee7b7;">ŷ('+xp+') = '+f(pred)+'  ['+(interp?'interpolation':'extrapolation — less reliable')+']</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g12c9Btn').addEventListener('click',calc);
              ['g12c9xp'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "A scatter plot shows points falling from left to right. The correlation is:", options: ["Positive", "Negative", "Zero", "Cannot determine"], answer: 1, topic: "Scatter plots & regression" },
        { type: "mc", text: "The regression line always passes through:", options: ["The origin", "The median point", "The mean point (x̄, ȳ)", "The point (0, a)"], answer: 2, topic: "Scatter plots & regression" },
        { type: "mc", text: "Predicting y for x = 50 when data ranges from x = 10 to 40 is:", options: ["Interpolation", "Extrapolation", "Correlation", "Regression"], answer: 1, topic: "Scatter plots & regression" },
        { type: "input", text: "Regression line: ŷ = 3.2 + 1.5x. Predict y when x = 4.", answer: "9.2", altAnswers: ["9,2"], topic: "Scatter plots & regression" },
        { type: "mc", text: "The least squares line minimises:", options: ["The sum of residuals", "The sum of squared residuals", "The product of x and y", "The range of y"], answer: 1, topic: "Scatter plots & regression" }
      ]
    },
    {
      id: 901,
      chapter: 9,
      name: "Correlation coefficient",
      fullName: "Pearson's correlation coefficient and interpreting the strength of correlation",
      lesson: {
        heading: "Correlation coefficient",
        sub: "Chapter 9 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Pearson's correlation coefficient (r)</div>
            <p>
              The <strong>correlation coefficient r</strong> measures the strength and direction of the linear relationship between x and y.<br><br>
              <span class="math">−1 ≤ r ≤ 1</span><br><br>
              Interpretation:<br>
              r = 1: perfect positive linear correlation<br>
              r = −1: perfect negative linear correlation<br>
              r = 0: no linear correlation<br>
              0.8 ≤ |r| < 1: strong correlation<br>
              0.5 ≤ |r| < 0.8: moderate correlation<br>
              |r| < 0.5: weak correlation
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Important distinctions</div>
            <p>
              <strong>Correlation ≠ Causation</strong><br>
              A high r value means the variables are linearly related, but does NOT prove that one causes the other. There may be a confounding variable.<br><br>
              Example: Ice cream sales and drowning rates both increase in summer → correlated, but ice cream doesn't cause drowning.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 r² (coefficient of determination)</div>
            <p>
              <span class="math">r²</span> tells us the proportion of variation in y that is explained by x.<br>
              E.g. r = 0.9 → r² = 0.81 → 81% of variation in y is explained by the linear relationship with x.
            </p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Correlation Coefficient Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter paired x and y values to compute r and r², with interpretation.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:200px;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">x values (comma-separated)</div><input id="g12c9t2x" type="text" value="1,2,3,4,5" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;"></div>
              <div style="flex:1;min-width:200px;"><div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">y values (comma-separated)</div><input id="g12c9t2y" type="text" value="2,4,5,4,5" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;"></div>
            </div>
            <button id="g12c9t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;margin-bottom:10px;">Compute r</button>
            <div id="g12c9t2Out" style="font-size:13px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n,d=4){return parseFloat(n.toFixed(d));}
              function calc(){
                const xs=document.getElementById('g12c9t2x').value.split(',').map(s=>parseFloat(s.trim()));
                const ys=document.getElementById('g12c9t2y').value.split(',').map(s=>parseFloat(s.trim()));
                const out=document.getElementById('g12c9t2Out');
                if(xs.some(isNaN)||ys.some(isNaN)||xs.length<2||xs.length!==ys.length){out.innerHTML='<span style="color:#fca5a5;">Enter equal-length numeric x and y lists (min 2).</span>';return;}
                const n=xs.length;
                const sx=xs.reduce((a,b)=>a+b,0),sy=ys.reduce((a,b)=>a+b,0);
                const sxy=xs.reduce((a,x,i)=>a+x*ys[i],0);
                const sx2=xs.reduce((a,x)=>a+x*x,0),sy2=ys.reduce((a,y)=>a+y*y,0);
                const num=n*sxy-sx*sy;
                const den=Math.sqrt((n*sx2-sx*sx)*(n*sy2-sy*sy));
                if(den===0){out.innerHTML='<span style="color:#fca5a5;">Cannot compute r — one of the datasets has zero variance.</span>';return;}
                const r=num/den;
                const r2=r*r;
                const strength=Math.abs(r)>=0.8?'strong':Math.abs(r)>=0.5?'moderate':'weak';
                const dir=r>0?'positive':r<0?'negative':'no';
                let html='<span style="color:#6ee7b7;">r = '+f(r)+'</span>';
                html+='<span style="color:rgba(221,225,240,0.50);"> → '+strength+' '+dir+' linear correlation</span><br>';
                html+='<span style="color:#fcd34d;">r² = '+f(r2)+' → '+f(r2*100,2)+'% of variation in y is explained by x</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">⚠ Correlation ≠ causation. A high |r| does not mean x causes y.</span>';
                out.innerHTML=html;
              }
              document.getElementById('g12c9t2Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "r = −0.92 indicates:", options: ["Weak negative correlation", "Strong positive correlation", "Strong negative correlation", "No correlation"], answer: 2, topic: "Correlation coefficient" },
        { type: "mc", text: "r = 0.6 means what percentage of variation in y is explained by x?", options: ["60%", "36%", "0.6%", "6%"], answer: 1, topic: "Correlation coefficient" },
        { type: "mc", text: "Which r-value shows the weakest correlation?", options: ["r = 0.9", "r = −0.85", "r = 0.3", "r = −0.95"], answer: 2, topic: "Correlation coefficient" },
        { type: "mc", text: "A study finds r = 0.88 between hours of study and test scores. This means:", options: ["Studying causes good scores", "Strong positive linear association between the variables", "More study always leads to better scores", "The relationship is exactly linear"], answer: 1, topic: "Correlation coefficient" },
        { type: "input", text: "r = 0.75. Find r² as a percentage (%).", answer: "56.25", altAnswers: ["56,25"], topic: "Correlation coefficient" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 9 Workbook — Statistics",
    questions: [
      { number: 1, text: "The table shows the number of hours of practice (x) and exam scores (y) for 6 students:", parts: [
        { label: "", text: "| x | 2 | 3 | 4 | 5 | 6 | 8 |\n| y | 45 | 52 | 58 | 65 | 70 | 82 |", marks: 0 },
        { label: "a", text: "Plot the scatter diagram.", marks: 3 },
        { label: "b", text: "Calculate x̄ and ȳ.", marks: 2 },
        { label: "c", text: "Using your calculator, find the equation of the least squares regression line.", marks: 3 },
        { label: "d", text: "Find the correlation coefficient r and comment on the strength of the relationship.", marks: 2 },
        { label: "e", text: "Predict the score for a student who practises 7 hours. Is this interpolation or extrapolation?", marks: 2 }
      ]},
      { number: 2, text: "A researcher claims that shoe size and IQ are correlated (r = 0.72 in a study of children aged 5–15).", parts: [
        { label: "a", text: "What does r = 0.72 suggest about the relationship?", marks: 2 },
        { label: "b", text: "Suggest a confounding variable that could explain this correlation.", marks: 2 },
        { label: "c", text: "Why is it incorrect to conclude that bigger feet cause higher IQ?", marks: 2 }
      ]}
    ],
    answers: {
      1: { a: "Points plotted correctly", b: "x̄=28/6≈4.67; ȳ=372/6=62", c: "Use calculator: ŷ ≈ 33.4 + 6.13x", d: "r≈0.999 (very strong positive linear correlation)", e: "ŷ ≈ 33.4 + 6.13(7) ≈ 33.4 + 42.9 ≈ 76.3; interpolation (7 is within range 2–8)" },
      2: { a: "Moderate to strong positive linear association", b: "Age — older children have both larger feet and higher IQ due to development", c: "Correlation does not imply causation — a third variable (age) drives both" }
    }
  }
});
