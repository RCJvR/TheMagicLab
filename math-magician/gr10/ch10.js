// Math Magician — Grade 10, Chapter 10
// Statistics

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 1000,
      chapter: 10,
      name: "Measures of central tendency",
      fullName: "Collecting data, measures of central tendency, and grouping data",
      lesson: {
        heading: "Central tendency and grouping data",
        sub: "Chapter 10 · Topic 1",
        body: `
          <p><strong>Statistics</strong> involves collecting, organising, displaying, and interpreting data.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Measures of central tendency</div>
            <p>
              <strong>Mean (x̄):</strong> sum of values ÷ number of values<br>
              <strong>Median:</strong> middle value when data is ordered (average of two middle values if even)<br>
              <strong>Mode:</strong> most frequently occurring value (may be none or multiple)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Grouped data</div>
            <p>When data is grouped in class intervals, we use <strong>midpoints</strong> of each interval to estimate the mean.<br>
            Estimated mean = Σ(midpoint × frequency) / Σfrequency<br><br>
            The <strong>modal class</strong> is the class interval with the highest frequency.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>Data: 4, 7, 7, 9, 12, 15, 18<br>
            Mean = (4+7+7+9+12+15+18)/7 = 72/7 ≈ 10.3<br>
            Median = 9 (4th value of 7)<br>
            Mode = 7</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Mean, Median & Mode Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter comma-separated values — get all measures of central tendency instantly.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:200px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Data values (comma separated)</div>
                <input id="g10c10data" type="text" value="4, 7, 7, 9, 12, 15, 18"
                  style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g10c10Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Calculate</button>
            </div>
            <div id="g10c10Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function run(){
                const raw=document.getElementById('g10c10data').value;
                const out=document.getElementById('g10c10Out');
                const vals=raw.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                if(vals.length<1){out.innerHTML='<span style="color:#fca5a5;">Enter at least one value.</span>';return;}
                const sorted=[...vals].sort((a,b)=>a-b);
                const n=vals.length;
                const mean=vals.reduce((s,x)=>s+x,0)/n;
                const mid=Math.floor(n/2);
                const median=n%2===1?sorted[mid]:(sorted[mid-1]+sorted[mid])/2;
                const freq={};
                vals.forEach(x=>freq[x]=(freq[x]||0)+1);
                const maxF=Math.max(...Object.values(freq));
                const modes=Object.keys(freq).filter(k=>freq[k]===maxF).map(Number).sort((a,b)=>a-b);
                const modeStr=maxF===1?'None (all values unique)':modes.join(', ');
                let html='<span style="color:rgba(221,225,240,0.50);">Sorted: </span><span style="color:rgba(221,225,240,0.60);">'+sorted.join(', ')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">n = '+n+' values</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Mean x̄ = sum/n = '+(vals.reduce((s,x)=>s+x,0).toFixed(2))+'/'+n+' = </span><span style="color:#6ee7b7;">'+mean.toFixed(4).replace(/\.?0+$/,'')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Median = </span><span style="color:#6ee7b7;">'+median+(n%2===0?' (avg of '+sorted[mid-1]+' and '+sorted[mid]+')':'')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Mode = </span><span style="color:#6ee7b7;">'+modeStr+'</span>';
                out.innerHTML=html;
              }
              document.getElementById('g10c10Btn').addEventListener('click',run);
              document.getElementById('g10c10data').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>Always sort your data first — finding the median and mode from an unsorted list is error-prone. A quick ascending sort takes seconds and prevents mistakes.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Data: 3, 8, 5, 12, 7, 5. The mode is:",
          options: ["3", "5", "7", "8"],
          answer: 1,
          topic: "Measures of central tendency"
        },
        {
          type: "input",
          text: "Data: 10, 14, 9, 17, 5. Find the median.",
          answer: "10",
          topic: "Measures of central tendency"
        },
        {
          type: "mc",
          text: "Data: 2, 4, 6, 8, 10. The mean is:",
          options: ["5", "6", "7", "8"],
          answer: 1,
          topic: "Measures of central tendency"
        },
        {
          type: "mc",
          text: "For grouped data, the estimated mean uses:",
          options: ["Actual values", "Upper bounds", "Midpoints of intervals", "Lower bounds"],
          answer: 2,
          topic: "Measures of central tendency"
        },
        {
          type: "input",
          text: "The mean of 5 values is 12. One value of 14 is removed. Find the new mean.",
          answer: "11.5",
          altAnswers: ["11,5"],
          topic: "Measures of central tendency"
        }
      ]
    },
    {
      id: 1001,
      chapter: 10,
      name: "Dispersion & five-number summary",
      fullName: "Measures of dispersion, five-number summary, and box-and-whisker plots",
      lesson: {
        heading: "Dispersion and the five-number summary",
        sub: "Chapter 10 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Measures of dispersion</div>
            <p>
              <strong>Range:</strong> maximum − minimum<br>
              <strong>Interquartile range (IQR):</strong> Q3 − Q1<br>
              <strong>Variance:</strong> average of squared deviations from the mean<br>
              <strong>Standard deviation (σ):</strong> √variance — most useful; same units as data
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Five-number summary</div>
            <p>
              1. Minimum (min)<br>
              2. First quartile (Q1) — median of lower half<br>
              3. Median (Q2)<br>
              4. Third quartile (Q3) — median of upper half<br>
              5. Maximum (max)<br><br>
              Used to draw a <strong>box-and-whisker plot</strong>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Five-number summary</div>
            <p>Data (ordered): 2, 5, 7, 8, 11, 14, 16, 20<br>
            Min = 2, Max = 20<br>
            Median = (8+11)/2 = 9.5<br>
            Q1 = median of {2, 5, 7, 8} = (5+7)/2 = 6<br>
            Q3 = median of {11, 14, 16, 20} = (14+16)/2 = 15<br>
            IQR = 15 − 6 = 9</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Outliers</div>
            <p>A data point is a suspected outlier if it is more than 1.5 × IQR below Q1 or above Q3.</p>
          </div>

          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🔢 Five-Number Summary Calculator</div>
            <p style="margin-bottom:10px;color:rgba(221,225,240,0.70);font-size:13px;">Enter comma-separated values — get min, Q1, median, Q3, max, IQR, and outlier check.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px;">
              <div style="flex:1;min-width:200px;">
                <div style="font-size:11px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Data values (comma separated)</div>
                <input id="g10c10t2data" type="text" value="2, 5, 7, 8, 11, 14, 16, 20"
                  style="width:100%;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px;border-radius:7px;font-size:14px;font-family:'JetBrains Mono',monospace;box-sizing:border-box;">
              </div>
              <button id="g10c10t2Btn" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;padding:7px 16px;border-radius:7px;font-weight:700;cursor:pointer;border:none;font-size:14px;">Analyse</button>
            </div>
            <div id="g10c10t2Out" style="font-size:14px;line-height:2.2;color:rgba(221,225,240,0.85);min-height:24px;"></div>
            <script>
            (function(){
              function med(arr){const m=Math.floor(arr.length/2);return arr.length%2===1?arr[m]:(arr[m-1]+arr[m])/2;}
              function run(){
                const raw=document.getElementById('g10c10t2data').value;
                const out=document.getElementById('g10c10t2Out');
                const vals=raw.split(',').map(s=>parseFloat(s.trim())).filter(x=>!isNaN(x));
                if(vals.length<4){out.innerHTML='<span style="color:#fca5a5;">Enter at least 4 values for a meaningful five-number summary.</span>';return;}
                const s=[...vals].sort((a,b)=>a-b);
                const n=s.length;
                const mn=s[0],mx=s[n-1];
                const Q2=med(s);
                const lower=n%2===1?s.slice(0,Math.floor(n/2)):s.slice(0,n/2);
                const upper=n%2===1?s.slice(Math.floor(n/2)+1):s.slice(n/2);
                const Q1=med(lower),Q3=med(upper);
                const IQR=Q3-Q1;
                const range=mx-mn;
                const fenceL=Q1-1.5*IQR,fenceH=Q3+1.5*IQR;
                const outliers=s.filter(x=>x<fenceL||x>fenceH);
                let html='<span style="color:rgba(221,225,240,0.50);">Sorted: </span><span style="color:rgba(221,225,240,0.60);">'+s.join(', ')+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">Min = </span><span style="color:#fcd34d;">'+mn+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Q1 = </span><span style="color:#fcd34d;">'+Q1+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Median Q2 = </span><span style="color:#6ee7b7;">'+Q2+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Q3 = </span><span style="color:#fcd34d;">'+Q3+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Max = </span><span style="color:#fcd34d;">'+mx+'</span><br>';
                html+='<span style="color:rgba(221,225,240,0.50);">IQR = Q3 − Q1 = '+Q3+' − '+Q1+' = </span><span style="color:#6ee7b7;">'+IQR+'</span>  ';
                html+='<span style="color:rgba(221,225,240,0.50);">Range = </span><span style="color:#6ee7b7;">'+range+'</span><br>';
                if(outliers.length){
                  html+='<span style="color:#fca5a5;">Suspected outliers (outside ['+fenceL.toFixed(2)+'; '+fenceH.toFixed(2)+']): '+outliers.join(', ')+'</span>';
                } else {
                  html+='<span style="color:rgba(221,225,240,0.50);">No outliers (fences: ['+fenceL.toFixed(2)+'; '+fenceH.toFixed(2)+'])</span>';
                }
                out.innerHTML=html;
              }
              document.getElementById('g10c10t2Btn').addEventListener('click',run);
              document.getElementById('g10c10t2data').addEventListener('keydown',e=>{if(e.key==='Enter')run();});
              run();
            })();
            </script>
          </div>

          <div class="tip-box"><span class="tip-icon">💡</span><span>To find Q1 and Q3: split the data at the median (exclude the median itself if n is odd), then find the median of each half.</span></div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Data: 3, 7, 9, 12, 15, 20. The IQR is:",
          options: ["11", "8", "9", "13"],
          answer: 1,
          topic: "Dispersion & five-number summary"
        },
        {
          type: "input",
          text: "Data: 4, 8, 12, 16, 20. Find the range.",
          answer: "16",
          topic: "Dispersion & five-number summary"
        },
        {
          type: "mc",
          text: "For data: 2, 5, 8, 11, 14, 17, 20, 23, what is Q1?",
          options: ["5", "6.5", "8", "5.5"],
          answer: 1,
          topic: "Dispersion & five-number summary"
        },
        {
          type: "mc",
          text: "A box-and-whisker plot shows: min=5, Q1=10, median=15, Q3=22, max=30. The IQR is:",
          options: ["25", "12", "20", "15"],
          answer: 1,
          topic: "Dispersion & five-number summary"
        },
        {
          type: "mc",
          text: "Which measure of dispersion uses squared deviations?",
          options: ["Range", "IQR", "Standard deviation", "Variance"],
          answer: 3,
          topic: "Dispersion & five-number summary"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 10 Workbook — Statistics",
    questions: [
      {
        number: 1,
        text: "The following marks (out of 50) were scored in a test: 34, 28, 41, 22, 34, 45, 37, 29, 41, 18, 34, 40.",
        parts: [
          { label: "a", text: "Find the mean, median, and mode.", marks: 5 },
          { label: "b", text: "Find the five-number summary.", marks: 5 },
          { label: "c", text: "Calculate the IQR.", marks: 1 },
          { label: "d", text: "Draw a box-and-whisker plot.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "The grouped frequency table shows ages of club members:",
        parts: [
          { label: "", text: "| Age | 10–19 | 20–29 | 30–39 | 40–49 | 50–59 |\n| Freq | 4 | 11 | 9 | 5 | 1 |", marks: 0 },
          { label: "a", text: "Estimate the mean age.", marks: 4 },
          { label: "b", text: "Identify the modal class.", marks: 1 },
          { label: "c", text: "How many members are there in total?", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Ordered: 18,22,28,29,34,34,34,37,40,41,41,45; Mean=37.75/12... recalc: sum=403, mean≈33.6; Median=(34+34)/2=34; Mode=34",
        b: "Min=18; Q1=(28+29)/2=28.5; Median=34; Q3=(40+41)/2=40.5; Max=45",
        c: "IQR=12",
        d: "Box from 28.5 to 40.5, median line at 34, whiskers to 18 and 45"
      },
      2: {
        a: "Midpoints: 14.5,24.5,34.5,44.5,54.5; Mean=(4×14.5+11×24.5+9×34.5+5×44.5+1×54.5)/30 = (58+269.5+310.5+222.5+54.5)/30 = 914.5/30 ≈ 30.5",
        b: "Modal class: 20–29",
        c: "30 members"
      }
    }
  }
});
