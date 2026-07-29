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
        },
        {
          type: "input",
          text: "Find the standard deviation of the data set 5, 7, 7, 9, 12, correct to 2 decimal places.",
          answer: "2.37",
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "input",
          text: "A data set of 8 values has a mean of 12. Seven of the values are 9, 10, 11, 13, 14, 15, 16. Find the 8th value.",
          answer: "8",
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
        },
        {
          type: "input",
          text: "For the data set 12, 15, 18, 20, 22, 24, 60: find Q1, Q3, and the IQR, then state whether 60 is an outlier using the 1.5×IQR rule. Answer 'yes' or 'no'.",
          answer: "yes",
          topic: "Skewness, outliers & data interpretation"
        }
      ]
    },
    {
      id: 1102,
      chapter: 11,
      name: "Comparing datasets with standard deviation",
      fullName: "Using standard deviation to interpret and compare the spread of two or more datasets",
      lesson: {
        heading: "Comparing datasets using standard deviation",
        sub: "Chapter 11 · Topic 3",
        body: `
          <p>CAPS emphasises <strong>interpreting</strong> standard deviation, not just calculating it. A common exam task is comparing two datasets (e.g. two classes' test marks) using both mean and standard deviation together.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Interpreting standard deviation</div>
            <p>
              • A <strong>small</strong> σ means data is clustered tightly around the mean (consistent, predictable).<br>
              • A <strong>large</strong> σ means data is spread widely (variable, less predictable).<br>
              • Two datasets can have the <em>same mean</em> but very different spreads — σ tells the difference.<br>
              • Always interpret σ <em>in context</em>: "Class A's marks (σ = 4) were more consistent than Class B's (σ = 11)."
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Health, social & economic contexts</div>
            <p>
              CAPS explicitly wants statistics problems drawn from health, social, economic, cultural, political and environmental contexts — e.g. comparing rainfall consistency between two towns, blood pressure readings, or household income spread between two regions.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Comparing two classes</div>
            <p>Class A marks: mean = 62, σ = 4.2. Class B marks: mean = 62, σ = 11.5.<br>
            Both classes averaged the same mark, but Class A's marks were far more <strong>consistent</strong> (clustered near 62), while Class B had a much wider spread — some learners did very well, others very poorly.</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Never compare raw standard deviations of datasets with very different means or units without also considering the mean — always interpret spread relative to context.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Two-Dataset Comparison Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter two comma-separated datasets — compare their means and standard deviations.</p>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px;">
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Dataset A</div>
                <input id="g11c11t3a" type="text" value="58,60,61,62,63,64,66" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <div>
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Dataset B</div>
                <input id="g11c11t3b" type="text" value="30,45,50,62,70,85,92" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c11t3Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;align-self:flex-start;">Compare</button>
            </div>
            <div id="g11c11t3Out" style="font-size:13px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function stats(arr){
                const n=arr.length,mean=arr.reduce((a,b)=>a+b,0)/n;
                const variance=arr.reduce((a,b)=>a+(b-mean)*(b-mean),0)/n;
                return {n,mean,variance,sigma:Math.sqrt(variance)};
              }
              function calc(){
                const out=document.getElementById('g11c11t3Out');
                const A=document.getElementById('g11c11t3a').value.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                const B=document.getElementById('g11c11t3b').value.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                if(A.length<2||B.length<2){out.innerHTML='<span style="color:#fca5a5;">Enter at least 2 values in each dataset.</span>';return;}
                const sa=stats(A),sb=stats(B);
                let html='<span style="color:#fcd34d;">Dataset A: n='+sa.n+', mean='+f(sa.mean)+', σ='+f(sa.sigma)+'</span><br>';
                html+='<span style="color:#a5b4fc;">Dataset B: n='+sb.n+', mean='+f(sb.mean)+', σ='+f(sb.sigma)+'</span><br>';
                if(Math.abs(sa.mean-sb.mean)<0.01) html+='<span style="color:rgba(221,225,240,0.60);">Both datasets have essentially the same mean, but ';
                else html+='<span style="color:rgba(221,225,240,0.60);">The means differ, but ';
                if(sa.sigma<sb.sigma) html+='Dataset A is more consistent (smaller σ) — its values cluster closer to the mean than Dataset B.</span>';
                else if(sb.sigma<sa.sigma) html+='Dataset B is more consistent (smaller σ) — its values cluster closer to the mean than Dataset A.</span>';
                else html+='both datasets have identical spread (equal σ).</span>';
                out.innerHTML=html;
              }
              ['g11c11t3a','g11c11t3b'].forEach(id=>{document.getElementById(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});});
              document.getElementById('g11c11t3Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Two classes have the same mean test mark, but Class X has σ = 3 and Class Y has σ = 14. Which class had more consistent marks?",
          options: ["Class X", "Class Y", "Both equally consistent", "Cannot tell without the marks"],
          answer: 0,
          topic: "Comparing datasets with standard deviation"
        },
        {
          type: "mc",
          text: "A large standard deviation indicates that the data is:",
          options: ["Tightly clustered around the mean", "Widely spread out from the mean", "All equal to the mean", "Negatively valued"],
          answer: 1,
          topic: "Comparing datasets with standard deviation"
        },
        {
          type: "input",
          text: "Two towns' monthly rainfall (mm): Town P: 40,42,41,39,43,40 and Town Q: 10,70,15,65,20,80. Which town (P or Q) has the smaller standard deviation? Answer 'P' or 'Q'.",
          answer: "P",
          topic: "Comparing datasets with standard deviation"
        },
        {
          type: "mc",
          text: "CAPS recommends statistics problems be set in contexts such as:",
          options: ["Health, social, economic, cultural, political and environmental issues", "Only sports statistics", "Only financial statistics", "Purely abstract number sets with no context"],
          answer: 0,
          topic: "Comparing datasets with standard deviation"
        },
        {
          type: "mc",
          text: "Dataset A has mean 50, σ = 2. Dataset B has mean 50, σ = 9. A value of 54 would be considered:",
          options: ["Unusual in Dataset A, ordinary in Dataset B", "Unusual in both", "Ordinary in both", "Unusual in Dataset B, ordinary in Dataset A"],
          answer: 0,
          topic: "Comparing datasets with standard deviation"
        },
        {
          type: "input",
          text: "Class P scores: 50, 52, 54, 56, 58. Class Q scores: 20, 40, 54, 68, 88. Both classes have the same mean (54). Calculate σ for each class and find σ_Q − σ_P, correct to 2 decimal places.",
          answer: "20.43",
          topic: "Comparing datasets with standard deviation"
        }
      ]
    },
    {
      id: 1103,
      chapter: 11,
      name: "Standard deviation from a frequency table",
      fullName: "Calculating the mean, variance, and standard deviation of ungrouped data given in a frequency table",
      lesson: {
        heading: "Standard deviation from a frequency table",
        sub: "Chapter 11 · Topic 4",
        body: `
          <p>Data is often given as a <strong>frequency table</strong> rather than a raw list. CAPS allows the use of a calculator's built-in statistical mode, but you must understand what it is computing.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Mean and standard deviation with frequencies</div>
            <p>
              For values xᵢ with frequencies fᵢ (n = Σfᵢ):<br>
              <span class="math">x̄ = Σ(fᵢxᵢ) / Σfᵢ</span><br>
              <span class="math">σ = √( Σfᵢ(xᵢ − x̄)² / Σfᵢ )</span><br><br>
              Each deviation is weighted by how many times that value occurs.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Frequency table</div>
            <p>Marks out of 10: value 6 (freq 2), 7 (freq 5), 8 (freq 8), 9 (freq 3), 10 (freq 2). n = 20<br>
            Σfx = 6(2)+7(5)+8(8)+9(3)+10(2) = 12+35+64+27+20 = 158<br>
            Mean = 158/20 = 7.9<br>
            Σf(x−x̄)² = 2(1.9)²+5(0.9)²+8(0.1)²+3(1.1)²+2(2.1)² ≈ 7.22+4.05+0.08+3.63+8.82 = 23.8<br>
            σ = √(23.8/20) ≈ √1.19 ≈ 1.09</p>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>On a calculator, entering data with frequencies (e.g. as a "FREQ" column in STAT mode) gives x̄ and σ directly — you should still know how to build the table by hand for full-mark method questions.</span></div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Frequency Table Standard Deviation Calculator</div>
            <p style="margin-bottom:8px;color:rgba(221,225,240,0.70);font-size:13px;">Enter value:frequency pairs separated by commas (e.g. 6:2,7:5,8:8).</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:220px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Value:Frequency pairs</div>
                <input id="g11c11t4data" type="text" value="6:2,7:5,8:8,9:3,10:2" style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g11c11t4Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g11c11t4Out" style="font-size:13px;line-height:2.0;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function f(n){return n.toFixed(4);}
              function calc(){
                const raw=document.getElementById('g11c11t4data').value;
                const out=document.getElementById('g11c11t4Out');
                const pairs=raw.split(',').map(p=>{
                  const parts=p.split(':').map(s=>parseFloat(s.trim()));
                  return {x:parts[0],freq:parts[1]};
                }).filter(p=>!isNaN(p.x)&&!isNaN(p.freq)&&p.freq>0);
                if(pairs.length<2){out.innerHTML='<span style="color:#fca5a5;">Enter at least 2 value:frequency pairs, e.g. 6:2,7:5.</span>';return;}
                const n=pairs.reduce((a,p)=>a+p.freq,0);
                const sumfx=pairs.reduce((a,p)=>a+p.freq*p.x,0);
                const mean=sumfx/n;
                const sumfd2=pairs.reduce((a,p)=>a+p.freq*(p.x-mean)*(p.x-mean),0);
                const variance=sumfd2/n;
                const sigma=Math.sqrt(variance);
                let table='<table style="border-collapse:collapse;font-size:12px;margin:8px 0;">';
                table+='<tr><th style="padding:3px 8px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">x</th><th style="padding:3px 8px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">f</th><th style="padding:3px 8px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">fx</th><th style="padding:3px 8px;color:rgba(221,225,240,0.45);border-bottom:1px solid rgba(99,102,241,0.20);">f(x−x̄)²</th></tr>';
                pairs.forEach(p=>{table+='<tr><td style="padding:3px 8px;color:#fcd34d;text-align:center;">'+p.x+'</td><td style="padding:3px 8px;color:rgba(221,225,240,0.70);text-align:center;">'+p.freq+'</td><td style="padding:3px 8px;color:rgba(221,225,240,0.70);text-align:center;">'+(p.freq*p.x)+'</td><td style="padding:3px 8px;color:rgba(221,225,240,0.70);text-align:center;">'+f(p.freq*(p.x-mean)*(p.x-mean))+'</td></tr>';});
                table+='</table>';
                let html=table;
                html+='<span style="color:rgba(221,225,240,0.50);">n = Σf = '+n+'   Σfx = '+sumfx+'</span><br>';
                html+='<span style="color:#fcd34d;">Mean x̄ = Σfx/n = '+f(mean)+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Σf(x−x̄)² = '+f(sumfd2)+'</span><br>';
                html+='<span style="color:#6ee7b7;">Variance σ² = '+f(variance)+'   Standard deviation σ = '+f(sigma)+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g11c11t4data').addEventListener('keydown',e=>{if(e.key==='Enter')calc();});
              document.getElementById('g11c11t4Btn').addEventListener('click',calc);
              calc();
            })();
            </script>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "For a frequency table, the mean is calculated as:",
          options: ["Σ(fx) / Σf", "Σx / n", "Σf / Σx", "Σ(x − x̄)² / n"],
          answer: 0,
          topic: "Standard deviation from a frequency table"
        },
        {
          type: "input",
          text: "Values 4 (freq 3) and 8 (freq 2). Find the mean.",
          answer: "5.6",
          topic: "Standard deviation from a frequency table"
        },
        {
          type: "mc",
          text: "In the formula σ = √(Σf(x−x̄)²/Σf), the frequency f represents:",
          options: ["How many times each value x occurs", "The class width", "The rank of each value", "The cumulative frequency"],
          answer: 0,
          topic: "Standard deviation from a frequency table"
        },
        {
          type: "input",
          text: "Values: 2 (freq 1), 4 (freq 2), 6 (freq 1). Find the standard deviation (to 2 decimal places).",
          answer: "1.41",
          topic: "Standard deviation from a frequency table"
        },
        {
          type: "mc",
          text: "A calculator's statistical (STAT/FREQ) mode is used for frequency table data mainly to:",
          options: ["Compute x̄ and σ directly without manual summation", "Draw a histogram automatically", "Skip the need for a mean altogether", "Convert frequencies into percentages only"],
          answer: 0,
          topic: "Standard deviation from a frequency table"
        },
        {
          type: "input",
          text: "A frequency table has value 4 (freq 3), value 10 (freq x), value 13 (freq 2), and the mean of all the data is 8. Find x.",
          answer: "1",
          topic: "Standard deviation from a frequency table"
        },
        {
          type: "input",
          text: "Frequency table: value 4 (freq 3), value 10 (freq 1), value 13 (freq 2). Find the standard deviation, correct to 2 decimal places.",
          answer: "4.12",
          topic: "Standard deviation from a frequency table"
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
      },
      {
        number: 3,
        text: "An ogive (cumulative frequency curve) has been plotted for the ages of 60 runners in a marathon, passing through the following points (upper class boundary ; cumulative frequency):",
        parts: [
          { label: "", text: "(10 ; 0), (20 ; 4), (30 ; 14), (40 ; 32), (50 ; 48), (60 ; 56), (70 ; 60)", marks: 0 },
          { label: "a", text: "Using the ogive, estimate the median age. (Read off where cumulative frequency = 30, interpolating between the two nearest plotted points.)", marks: 3 },
          { label: "b", text: "Estimate Q1 and Q3 from the ogive (read off at cumulative frequency = 15 and 45), and hence the IQR.", marks: 4 },
          { label: "c", text: "Estimate the number of runners older than 50.", marks: 2 }
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
      },
      3: {
        a: "n=60, median position = 30th value. 30 lies between (30;14) and (40;32): fraction=(30−14)/(32−14)=16/18; median ≈ 30 + (16/18)×10 ≈ 38.9 years",
        b: "Q1 position=15th value, between (30;14) and (40;32): fraction=(15−14)/18=1/18; Q1 ≈ 30 + (1/18)×10 ≈ 30.6. Q3 position=45th value, between (40;32) and (50;48): fraction=(45−32)/16=13/16; Q3 ≈ 40 + (13/16)×10 ≈ 48.1. IQR ≈ 48.1 − 30.6 = 17.5",
        c: "Cumulative frequency at 50 is 48, so runners older than 50 = 60 − 48 = 12"
      }
    }
  }
});
