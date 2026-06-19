// Math Magician — Grade 11, Chapter 11
// Statistics

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 1100,
      chapter: 11,
      name: "Histograms, ogives & standard deviation",
      fullName: "Histograms, frequency polygons, ogives, variance and standard deviation",
      lesson: {
        heading: "Histograms, ogives, and standard deviation",
        sub: "Chapter 11 · Topic 1",
        body: `
          <p>Grade 11 Statistics extends to new graphical representations and introduces <strong>standard deviation</strong> as a precise measure of spread.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Histograms and ogives</div>
            <p>
              <strong>Histogram:</strong> bar chart for grouped data where bars touch. Width = class interval. Height = frequency.<br><br>
              <strong>Ogive (cumulative frequency curve):</strong> plots cumulative frequency against upper class boundary. S-shaped curve. Used to read off percentiles and the five-number summary.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Variance and standard deviation</div>
            <p>
              <strong>Variance (σ²):</strong> <span class="math">σ² = Σ(xᵢ − x̄)² / n</span><br>
              <strong>Standard deviation (σ):</strong> <span class="math">σ = √(Σ(xᵢ − x̄)² / n)</span><br><br>
              A larger σ means data is more spread out from the mean. σ is in the <em>same units</em> as the data.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Standard deviation</div>
            <p>Data: 4, 6, 8, 10, 12. Mean = 8.<br>
            Deviations: −4, −2, 0, 2, 4<br>
            Squared: 16, 4, 0, 4, 16 → sum = 40<br>
            Variance = 40/5 = 8<br>
            σ = √8 = 2√2 ≈ 2.83</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Standard Deviation Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter comma-separated data values → mean, deviations table, variance, σ.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Data (comma-separated)</div>
                <input id="g11c11data" type="text" value="4,6,8,10,12" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c11Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c11Out" style="font-size:13px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function calc(){
                const raw=document.getElementById('g11c11data').value;
                const out=document.getElementById('g11c11Out');
                const arr=raw.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
                if(arr.length<2){out.innerHTML='<span style="color:#fca5a5;">Enter at least 2 numbers.</span>';return;}
                const n=arr.length;
                const mean=arr.reduce((a,b)=>a+b,0)/n;
                const devs=arr.map(x=>x-mean);
                const sq=devs.map(d=>d*d);
                const variance=sq.reduce((a,b)=>a+b,0)/n;
                const sigma=Math.sqrt(variance);
                const within1=arr.filter(x=>Math.abs(x-mean)<=sigma).length;
                const within2=arr.filter(x=>Math.abs(x-mean)<=2*sigma).length;
                let devTable='<table style="border-collapse:collapse;font-size:12px;margin:8px 0;">';
                devTable+='<tr><th style="padding:3px 10px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">xᵢ</th><th style="padding:3px 10px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">xᵢ − x̄</th><th style="padding:3px 10px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">(xᵢ − x̄)²</th></tr>';
                arr.forEach((x,i)=>{devTable+='<tr><td style="padding:3px 10px;color:#fcd34d;text-align:center;">'+x+'</td><td style="padding:3px 10px;color:rgba(221,225,240,0.70);text-align:center;">'+f(devs[i])+'</td><td style="padding:3px 10px;color:rgba(221,225,240,0.70);text-align:center;">'+f(sq[i])+'</td></tr>';});
                devTable+='</table>';
                let html=devTable;
                html+='<span style="color:rgba(221,225,240,0.50);">n = '+n+'   x̄ = '+f(mean)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Σ(xᵢ−x̄)² = '+f(sq.reduce((a,b)=>a+b,0))+'</span><br>';
                html+='<span style="color:#fcd34d;">Variance σ² = '+f(variance)+'</span>   <span style="color:#6ee7b7;">Standard deviation σ = '+f(sigma)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Within 1σ of mean: '+within1+'/'+n+' values; within 2σ: '+within2+'/'+n+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c11data').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c11Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Standard deviation is always:",
          options: ["Negative", "Zero", "Non-negative", "Greater than the mean"],
          answer: 2,
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "input",
          text: "Data: 2, 4, 4, 6. Find the mean.",
          answer: "4",
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "mc",
          text: "An ogive is used to find:",
          options: ["Mode", "Median and percentiles", "Mean only", "Standard deviation directly"],
          answer: 1,
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "mc",
          text: "Data: 3, 3, 3, 3, 3. The standard deviation is:",
          options: ["1", "3", "0", "Cannot determine"],
          answer: 2,
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "mc",
          text: "If all data values increase by 5, the standard deviation:",
          options: ["Increases by 5", "Stays the same", "Decreases by 5", "Doubles"],
          answer: 1,
          topic: "Histograms, ogives & standard deviation"
        }
      ]
    },
    {
      id: 1101,
      chapter: 11,
      name: "Skewness, outliers & data interpretation",
      fullName: "Symmetric and skewed data, outlier identification, and interpretation",
      lesson: {
        heading: "Skewness, outliers, and data interpretation",
        sub: "Chapter 11 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Symmetric vs skewed data</div>
            <p>
              <strong>Symmetric:</strong> Mean ≈ Median ≈ Mode. Bell-shaped distribution.<br>
              <strong>Positively skewed (right-skewed):</strong> Mean > Median > Mode. Tail to the right. Few very high values pull the mean up.<br>
              <strong>Negatively skewed (left-skewed):</strong> Mean &lt; Median &lt; Mode. Tail to the left.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Outlier identification</div>
            <p>
              <strong>IQR method:</strong> A value is an outlier if it falls outside:<br>
              <span class="math">Q1 − 1.5 × IQR</span> (lower fence) or <span class="math">Q3 + 1.5 × IQR</span> (upper fence)<br><br>
              <strong>Standard deviation method:</strong> A value is an outlier if it is more than 2σ (or sometimes 3σ) from the mean.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Choosing the right measure</div>
            <p>
              <strong>Skewed data or outliers present:</strong> Use median and IQR (more resistant).<br>
              <strong>Symmetric data, no outliers:</strong> Use mean and standard deviation (more informative).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Outlier check</div>
            <p>Q1 = 10, Q3 = 22, IQR = 12<br>
            Lower fence = 10 − 18 = −8; Upper fence = 22 + 18 = 40<br>
            Any value below −8 or above 40 is an outlier.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Skewness & Outlier Analyser</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter comma-separated data → five-number summary, IQR, outlier fences, skewness classification.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Data (comma-separated)</div>
                <input id="g11c11t2data" type="text" value="12,15,18,18,20,22,24,25,28,30,34,42" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c11t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse</button>
            </div>
            <div id="g11c11t2Out" style="font-size:13px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return parseFloat(n.toFixed(4));}
              function med(arr){const m=Math.floor(arr.length/2);return arr.length%2===1?arr[m]:(arr[m-1]+arr[m])/2;}
              function calc(){
                const raw=document.getElementById('g11c11t2data').value;
                const out=document.getElementById('g11c11t2Out');
                const arr=raw.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n)).sort((a,b)=>a-b);
                if(arr.length<4){out.innerHTML='<span style="color:#fca5a5;">Enter at least 4 values.</span>';return;}
                const n=arr.length;
                const mean=arr.reduce((a,b)=>a+b,0)/n;
                const median=med(arr);
                const half=Math.floor(n/2);
                const lower=n%2===0?arr.slice(0,half):arr.slice(0,half);
                const upper=n%2===0?arr.slice(half):arr.slice(half+1);
                const Q1=med(lower),Q3=med(upper);
                const IQR=Q3-Q1;
                const lFence=Q1-1.5*IQR,uFence=Q3+1.5*IQR;
                const outliers=arr.filter(x=>x<lFence||x>uFence);
                let skew='symmetric';
                if(mean>median+0.5) skew='positively skewed (right-skewed) — tail to the right';
                else if(mean<median-0.5) skew='negatively skewed (left-skewed) — tail to the left';
                let html='<span style="color:rgba(221,225,240,0.50);">Sorted: ['+arr.join(', ')+']</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">n = '+n+'   Mean = '+f(mean)+'   Median = '+f(median)+'</span><br>';
                html+='<span style="color:#fcd34d;">Min = '+arr[0]+'   Q1 = '+f(Q1)+'   Median = '+f(median)+'   Q3 = '+f(Q3)+'   Max = '+arr[n-1]+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">IQR = Q3 − Q1 = '+f(IQR)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Lower fence = Q1 − 1.5×IQR = '+f(lFence)+'   Upper fence = Q3 + 1.5×IQR = '+f(uFence)+'</span><br>';
                if(outliers.length) html+='<span style="color:#fca5a5;">Outliers: ['+outliers.join(', ')+']</span><br>';
                else html+='<span style="color:#6ee7b7;">No outliers detected.</span><br>';
                html+='<span style="color:#6ee7b7;">Skewness: '+skew+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c11t2data').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c11t2Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Mean = 45, Median = 50, Mode = 55. The data is:",
          options: ["Symmetric", "Positively skewed", "Negatively skewed", "Cannot determine"],
          answer: 2,
          topic: "Skewness, outliers & data interpretation"
        },
        {
          type: "mc",
          text: "Q1 = 15, Q3 = 35. IQR = 20. Upper outlier fence =",
          options: ["65", "55", "45", "70"],
          answer: 0,
          topic: "Skewness, outliers & data interpretation"
        },
        {
          type: "mc",
          text: "For skewed data with outliers, the best measure of central tendency is:",
          options: ["Mean", "Mode", "Median", "Standard deviation"],
          answer: 2,
          topic: "Skewness, outliers & data interpretation"
        },
        {
          type: "input",
          text: "Mean = 20, σ = 4. How many standard deviations from the mean is the value 30?",
          answer: "2.5",
          altAnswers: ["2,5"],
          topic: "Skewness, outliers & data interpretation"
        },
        {
          type: "mc",
          text: "In a positively skewed distribution, which is typically largest?",
          options: ["Mode", "Median", "Mean", "All equal"],
          answer: 2,
          topic: "Skewness, outliers & data interpretation"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 11 Workbook — Statistics",
    questions: [
      {
        number: 1,
        text: "Test scores: 12, 15, 18, 18, 20, 22, 24, 25, 28, 30, 34, 42.",
        parts: [
          { label: "a", text: "Calculate the mean and median.", marks: 3 },
          { label: "b", text: "Find the five-number summary.", marks: 4 },
          { label: "c", text: "Calculate the IQR and identify any outliers.", marks: 3 },
          { label: "d", text: "Describe the skewness. Justify using the relationship between mean and median.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "The following grouped data shows the time (minutes) learners spend on homework:",
        parts: [
          { label: "", text: "| Time | 0–20 | 20–40 | 40–60 | 60–80 | 80–100 |\n| Freq | 3 | 8 | 14 | 10 | 5 |", marks: 0 },
          { label: "a", text: "Draw a histogram.", marks: 3 },
          { label: "b", text: "Complete the cumulative frequency table.", marks: 2 },
          { label: "c", text: "Draw the ogive and estimate the median from it.", marks: 4 },
          { label: "d", text: "Estimate the percentage of learners who spend more than 70 minutes.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Mean=(12+15+18+18+20+22+24+25+28+30+34+42)/12=288/12=24; Median=(22+24)/2=23",
        b: "Min=12; Q1=18; Median=23; Q3=29; Max=42",
        c: "IQR=11; Lower fence=18−16.5=1.5; Upper fence=29+16.5=45.5; 42 is NOT an outlier (42<45.5)",
        d: "Mean(24)>Median(23) → slight positive skew (tail to the right, pulled by 42)"
      },
      2: {
        a: "Bars at heights 3,8,14,10,5 for intervals 0–20, 20–40, 40–60, 60–80, 80–100",
        b: "Cum freq: 3, 11, 25, 35, 40",
        c: "Plot (20,3),(40,11),(60,25),(80,35),(100,40); median at cum freq 20 → read off ≈ 53 min",
        d: "At 70 min: read cum freq ≈ 30; remaining = 40−30=10; 10/40=25%"
      }
    }
  }
});
