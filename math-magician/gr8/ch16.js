// Math Magician — Grade 8, Chapter 16 data
// Data Handling

MathMagician.registerChapter(16, {
  topics: [
    {
      id: 1601,
      chapter: 16,
      name: "Collecting and organising data",
      fullName: "Collecting and organising data",
      lesson: {
        heading: "Collecting and organising data",
        sub: "Chapter 16 · Topic 1",
        body: `
          <p>Data handling starts with collecting data systematically and organising it so patterns become visible.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary</div>
            <p>
              <strong>Data:</strong> information collected for analysis.<br>
              <strong>Population:</strong> the entire group being studied.<br>
              <strong>Sample:</strong> a smaller group chosen to represent the population.<br><br>
              <strong>Types of data:</strong><br>
              &nbsp;&nbsp;• <strong>Categorical (qualitative):</strong> non-numerical — e.g. favourite colour, sport.<br>
              &nbsp;&nbsp;• <strong>Numerical (quantitative):</strong> numbers — e.g. heights, marks.<br>
              &nbsp;&nbsp;&nbsp;&nbsp;– <em>Discrete:</em> whole/countable values (e.g. number of siblings).<br>
              &nbsp;&nbsp;&nbsp;&nbsp;– <em>Continuous:</em> any value in a range (e.g. height, mass).<br><br>
              <strong>Tally table:</strong> records raw data using tally marks in groups of 5.<br>
              <strong>Frequency table:</strong> shows how often each value or category occurs.<br>
              <strong>Grouped frequency table:</strong> used for wide-range data — values sorted into class intervals.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Building a frequency table</div>
            <div class="example-step"><span class="step-num">1</span><span>Raw data (test scores): 7, 5, 8, 7, 6, 9, 5, 7, 8, 6, 7, 10, 5, 6, 8</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Tally each value: 5→3, 6→3, 7→4, 8→3, 9→1, 10→1. Total = 15.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Relative frequency: each frequency ÷ 15. e.g. 7 → 4/15 ≈ 0.27.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Frequency Table Builder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter comma-separated numbers and see the frequency table instantly.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="ftInput" type="text" value="7,5,8,7,6,9,5,7,8,6,7,10,5,6,8" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="ftBuild" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Build</button>
            </div>
            <div id="ftOut" style="font-size:12px;overflow-x:auto;"></div>
          </div>
          <script>
          (function(){
            function build(){
              const nums = document.getElementById('ftInput').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              if(!nums.length) return;
              const freq = {};
              nums.forEach(n => freq[n] = (freq[n]||0)+1);
              const sorted = Object.keys(freq).map(Number).sort((a,b)=>a-b);
              let html = '<table style="border-collapse:collapse;font-family:JetBrains Mono,monospace;font-size:12px;width:100%;max-width:420px;">';
              html += '<tr style="border-bottom:1px solid rgba(255,255,255,0.15);">';
              ['Value','Frequency','Rel. Freq.'].forEach(h =>
                html += '<th style="padding:5px 14px;color:rgba(245,158,11,0.80);text-align:left;font-family:Syne,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.06em;">'+h+'</th>'
              );
              html += '</tr>';
              sorted.forEach(v => {
                const f = freq[v];
                html += '<tr style="border-bottom:1px solid rgba(255,255,255,0.06);"><td style="padding:5px 14px;color:#fcd34d;">'+v+'</td><td style="padding:5px 14px;color:#6ee7b7;">'+f+'</td><td style="padding:5px 14px;color:rgba(221,225,240,0.55);">'+(f/nums.length).toFixed(2)+'</td></tr>';
              });
              html += '<tr><td style="padding:5px 14px;color:rgba(221,225,240,0.40);font-size:11px;" colspan="1">Total</td><td style="padding:5px 14px;color:#fbbf24;font-weight:700;">'+nums.length+'</td><td style="padding:5px 14px;color:#fbbf24;">1.00</td></tr>';
              html += '</table>';
              document.getElementById('ftOut').innerHTML = html;
            }
            document.getElementById('ftBuild').addEventListener('click', build);
            document.getElementById('ftInput').addEventListener('keydown', e => e.key==='Enter' && build());
            build();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always check that frequencies add up to the total number of data values. If they don't, you've miscounted somewhere.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "The heights of 30 learners is an example of:", options: ["Categorical data", "Discrete numerical data", "Continuous numerical data", "Qualitative data"], answer: 2, topic: "Data" },
        { type: "mc", text: "In a frequency table, the relative frequency of a value is:", options: ["The value ÷ total", "The frequency ÷ total", "The frequency × total", "The value × frequency"], answer: 1, topic: "Data" },
        { type: "input", text: "Data set: 3, 5, 3, 7, 3, 5, 7, 5, 3. What is the frequency of 3?", answer: "4", topic: "Data" },
        { type: "mc", text: "Which type of data would suit a grouped frequency table best?", options: ["Favourite colours of 10 learners", "Ages of 100 adults ranging from 18 to 75", "Number of pets owned (0 to 4)", "Days of the week"], answer: 1, topic: "Data" },
        { type: "input", text: "A frequency table shows values 2, 4, 6, 8 with frequencies 5, 3, 6, 6. What is the total number of data values?", answer: "20", topic: "Data" },
        { type: "input", text: "A survey of 20 learners' number of siblings gives frequencies: 0 → 5, 1 → 8, 2 → 4, 3 → x. If all frequencies must sum to 20, find x.", answer: "3", topic: "Data" },
        { type: "mc", text: "A teacher wants to summarise 40 learners' favourite subjects (categorical data) using a graph. Which of these would be an INCORRECT choice?", options: ["Bar graph — categories compared with separated bars", "Pie chart — shows proportions of each subject", "Histogram — because histograms require continuous numerical data grouped into intervals, not categories", "Frequency table — organises counts per category"], answer: 2, topic: "Data" },
      ]
    },
    {
      id: 1602,
      chapter: 16,
      name: "Measures of central tendency",
      fullName: "Measures of central tendency",
      lesson: {
        heading: "Measures of central tendency",
        sub: "Chapter 16 · Topic 2",
        body: `
          <p>Measures of central tendency describe the <strong>middle</strong> or <strong>typical value</strong> of a data set.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Mean, Median, Mode, Range</div>
            <p>
              <strong>Mean:</strong> <span class="math">x̄ = Σx ÷ n</span> — sum of all values ÷ number of values.<br><br>
              <strong>Median:</strong> middle value when data is arranged in order.<br>
              &nbsp;&nbsp;• Odd n: middle value. Even n: mean of the two middle values.<br><br>
              <strong>Mode:</strong> value that appears most often. Can be none, one, or multiple.<br><br>
              <strong>Range:</strong> highest − lowest. Measures spread.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>Data: <span class="math">4, 7, 2, 9, 4, 6, 4, 8</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span><strong>Mean:</strong> <span class="math">44 ÷ 8 = 5.5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span><strong>Median (sorted):</strong> 2,4,4,4,6,7,8,9 → <span class="math">(4+6)÷2 = 5</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span><strong>Mode:</strong> 4 &nbsp;&nbsp; <strong>Range:</strong> <span class="math">9−2=7</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Mean, Median, Mode Calculator</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <input id="mmmInput" type="text" value="4,7,2,9,4,6,4,8" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="mmmCalc" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Calculate</button>
            </div>
            <div id="mmmOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const nums = document.getElementById('mmmInput').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              if(!nums.length) return;
              const sorted = [...nums].sort((a,b)=>a-b);
              const n = nums.length;
              const mean = nums.reduce((a,b)=>a+b,0)/n;
              const mid = Math.floor(n/2);
              const median = n%2===1 ? sorted[mid] : (sorted[mid-1]+sorted[mid])/2;
              const freq = {};
              nums.forEach(v => freq[v]=(freq[v]||0)+1);
              const maxF = Math.max(...Object.values(freq));
              const modes = Object.keys(freq).filter(k=>freq[k]===maxF).map(Number).sort((a,b)=>a-b);
              const range = sorted[n-1]-sorted[0];
              document.getElementById('mmmOut').innerHTML = [
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Sorted:</span><span style="color:rgba(165,180,252,0.75);">'+sorted.join(', ')+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Mean:</span><span style="color:#fcd34d;">'+(mean%1===0?mean:mean.toFixed(2))+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Median:</span><span style="color:#6ee7b7;">'+median+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Mode:</span><span style="color:#fbbf24;">'+(maxF===1?'No mode':modes.join(', '))+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:90px;">Range:</span><span style="color:rgba(221,225,240,0.65);">'+range+'</span></div>',
              ].join('');
            }
            document.getElementById('mmmCalc').addEventListener('click', calc);
            document.getElementById('mmmInput').addEventListener('keydown', e => e.key==='Enter' && calc());

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always sort data first before finding the median. Finding the middle position of unsorted data gives the wrong answer every time.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Find the mean of: 12, 15, 9, 18, 6.", answer: "12", topic: "Central tendency" },
        { type: "mc", text: "Data: 3, 7, 7, 9, 11, 13. What is the median?", options: ["7", "8", "9", "7.5"], answer: 1, topic: "Central tendency" },
        { type: "input", text: "Data: 5, 8, 5, 3, 5, 9, 8. What is the mode?", answer: "5", topic: "Central tendency" },
        { type: "mc", text: "A data set has mean 14 with 5 values. A 6th value of 14 is added. What is the new mean?", options: ["14", "13", "15", "Cannot determine"], answer: 0, topic: "Central tendency" },
        { type: "input", text: "Data: 2, 6, 10, 14, 18. What is the range?", answer: "16", topic: "Central tendency" },
        { type: "input", text: "A set of 6 numbers has a mean of 15. Five of the numbers are 12, 14, 16, 18, and 10. Find the sixth number.", answer: "20", topic: "Central tendency" },
        { type: "input", text: "The mean of 8 numbers is 22. One number, 46, is removed. What is the mean of the remaining 7 numbers, to 2 decimal places?", answer: "18.57", topic: "Central tendency" },
      ]
    },
    {
      id: 1603,
      chapter: 16,
      name: "Representing data",
      fullName: "Representing data — graphs and charts",
      lesson: {
        heading: "Representing data — graphs and charts",
        sub: "Chapter 16 · Topic 3",
        body: `
          <p>Choosing the correct graph type for your data type is essential in exams and in practice.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Graph types and when to use them</div>
            <p>
              <strong>Bar graph:</strong> compares categories — bars are separated. Use for categorical/discrete data.<br>
              <strong>Double bar graph:</strong> compares two groups side by side across categories.<br>
              <strong>Histogram:</strong> bars touch — used for continuous grouped data.<br>
              <strong>Pie chart:</strong> shows proportions. Angle = <span class="math">(freq ÷ total) × 360°</span>.<br>
              <strong>Line graph:</strong> shows change over time.<br>
              <strong>Stem-and-leaf:</strong> shows all values. Stem = tens digit; leaf = units digit.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Pie chart sector angles</div>
            <div class="example-step"><span class="step-num">1</span><span>Soccer 15, Rugby 10, Cricket 8, Other 7. Total = 40.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Soccer: <span class="math">(15÷40)×360° = 135°</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Rugby: 90° · Cricket: 72° · Other: 63°</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Check: <span class="math">135+90+72+63 = 360° ✓</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Pie Chart Angle Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter category names and frequencies to see the sector angles.</p>
            <div id="pieRows" style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;"></div>
            <button id="pieCalc" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;margin-bottom:12px;">Calculate angles</button>
            <div id="pieOut" style="font-family:JetBrains Mono,monospace;font-size:12px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            const cats=[{n:'Soccer',f:15},{n:'Rugby',f:10},{n:'Cricket',f:8},{n:'Other',f:7}];
            const cols=['#f59e0b','#6366f1','#10b981','#ec4899'];
            function buildRows(){
              const div=document.getElementById('pieRows');
              div.innerHTML='';
              cats.forEach((c,i)=>{
                const row=document.createElement('div');
                row.style.cssText='display:flex;gap:8px;align-items:center;';
                row.innerHTML='<div style="width:12px;height:12px;border-radius:3px;background:'+cols[i%cols.length]+';flex-shrink:0;"></div><input data-i="'+i+'" data-t="n" value="'+c.n+'" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.30);color:#a5b4fc;padding:5px 8px;border-radius:6px;font-size:12px;font-family:DM Sans,sans-serif;"><input data-i="'+i+'" data-t="f" type="number" value="'+c.f+'" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.30);color:#fcd34d;padding:5px 8px;border-radius:6px;font-size:12px;font-family:JetBrains Mono,monospace;text-align:center;">';
                div.appendChild(row);
              });
              div.querySelectorAll('input').forEach(inp=>inp.addEventListener('input',()=>{
                const i=+inp.dataset.i,t=inp.dataset.t;
                if(t==='n') cats[i].n=inp.value; else cats[i].f=parseFloat(inp.value)||0;
              }));
            }
            function calcAngles(){
              const total=cats.reduce((s,c)=>s+(c.f||0),0);
              if(!total) return;
              let html='',sum=0;
              cats.forEach((c,i)=>{
                const ang=(c.f||0)/total*360; sum+=ang;
                html+='<div><span style="color:'+cols[i%cols.length]+';display:inline-block;width:75px;">'+c.n+'</span> <span style="color:rgba(221,225,240,0.50);">f='+c.f+'</span>  →  <span style="color:#fcd34d;">'+ang.toFixed(1)+'°</span></div>';
              });
              html+='<div style="margin-top:6px;opacity:0.45;">Total: '+total+' | Sum: '+sum.toFixed(1)+'°</div>';
              document.getElementById('pieOut').innerHTML=html;
            }
            document.getElementById('pieCalc').addEventListener('click',calcAngles);
            buildRows(); calcAngles();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always label graph axes with titles and units, give the graph a heading, and for pie charts show the angle or percentage for each sector.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Which graph is most appropriate for showing how a learner's scores changed over 6 months?", options: ["Bar graph", "Pie chart", "Line graph", "Histogram"], answer: 2, topic: "Graphs" },
        { type: "input", text: "A category has frequency 9 out of 36 total. What is the pie chart sector angle in degrees?", answer: "90", topic: "Graphs" },
        { type: "mc", text: "In a stem-and-leaf plot, the entry 4 | 2 5 8 represents:", options: ["4, 5, 8", "42, 45, 48", "24, 54, 84", "4.2, 4.5, 4.8"], answer: 1, topic: "Graphs" },
        { type: "mc", text: "What distinguishes a histogram from a bar graph?", options: ["Histograms use circles", "Histogram bars touch (continuous data)", "Bar graphs can't show frequencies", "They are identical"], answer: 1, topic: "Graphs" },
        { type: "input", text: "Four categories have frequencies 6, 9, 12, 3. What is the total?", answer: "30", topic: "Graphs" },
        { type: "input", text: "A pie chart shows 4 categories with angles 144°, 90°, 72°, and x°. Find x, then state what percentage of the total this represents.", answer: "15", topic: "Graphs" },
        { type: "input", text: "A bar graph has 4 categories totalling 90 units. Category A = 24 units and category B = 18 units. The remaining two categories, C and D, have equal frequency. Find the frequency of category C.", answer: "24", topic: "Graphs" },
      ]
    },
    {
      id: 1604,
      chapter: 16,
      name: "Interpreting data",
      fullName: "Interpreting and analysing data",
      lesson: {
        heading: "Interpreting and analysing data",
        sub: "Chapter 16 · Topic 4",
        body: `
          <p>Reading graphs critically — identifying trends, outliers, and misleading features — is a key exam skill.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key concepts</div>
            <p>
              <strong>Trend:</strong> is data increasing, decreasing, or stable over time?<br>
              <strong>Outlier:</strong> a value far from the rest. Affects the mean significantly but not the median.<br>
              <strong>Misleading graphs — watch for:</strong><br>
              &nbsp;&nbsp;• Y-axis not starting at 0 (exaggerates differences).<br>
              &nbsp;&nbsp;• Unequal intervals on axes.<br>
              &nbsp;&nbsp;• Missing labels or titles.<br>
              &nbsp;&nbsp;• 3D effects that distort proportions.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Effect of outliers</div>
            <div class="example-step"><span class="step-num">1</span><span>Data: 10, 11, 12, 12, 13, 80</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Mean = 138÷6 = <strong>23</strong> — pulled up by 80</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Median = (12+12)/2 = <strong>12</strong> — not affected</span></div>
            <div class="example-step"><span class="step-num">4</span><span>When an outlier is present, <strong>median</strong> is usually a better measure.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Outlier Effect Explorer</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Change the outlier value and watch how mean vs median responds.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <span style="font-size:12px;color:rgba(221,225,240,0.55);">Base data: 10, 11, 12, 12, 13 + outlier:</span>
              <input id="outlierVal" type="number" value="80" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
            <div id="outlierOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            const base=[10,11,12,12,13];
            function update(){
              const out=parseFloat(document.getElementById('outlierVal').value);
              if(isNaN(out)) return;
              const data=[...base,out].sort((a,b)=>a-b);
              const n=data.length;
              const mean=data.reduce((a,b)=>a+b,0)/n;
              const median=n%2===1?data[Math.floor(n/2)]:(data[n/2-1]+data[n/2])/2;
              const baseMean=base.reduce((a,b)=>a+b,0)/base.length;
              document.getElementById('outlierOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Without outlier:</span>mean=<span style="color:#fcd34d;">'+baseMean.toFixed(2)+'</span>, median=<span style="color:#6ee7b7;">11.5</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">With outlier '+out+':</span>mean=<span style="color:#fca5a5;">'+mean.toFixed(2)+'</span>, median=<span style="color:#6ee7b7;">'+median+'</span></div>',
                '<div style="margin-top:4px;font-size:11px;opacity:0.45;">Mean shifted by '+(mean-baseMean).toFixed(2)+' — median shifted by '+(median-11.5).toFixed(1)+'</div>',
              ].join('');
            }
            document.getElementById('outlierVal').addEventListener('input',update);
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>When asked "which measure best represents the data" — if there are outliers, choose median. Without outliers, mean is usually best.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Data: 5, 6, 7, 7, 8, 50. Which measure is most affected by the outlier 50?", options: ["Mode", "Median", "Mean", "Range only"], answer: 2, topic: "Interpretation" },
        { type: "mc", text: "A bar chart's y-axis starts at 95 instead of 0. This:", options: ["Improves clarity", "Misleads by exaggerating differences", "Is required when values are close", "Only affects pie charts"], answer: 1, topic: "Interpretation" },
        { type: "input", text: "Data: 3, 5, 5, 6, 7, 40. What is the median?", answer: "5.5", topic: "Interpretation" },
        { type: "mc", text: "Test scores over 5 weeks: 40, 55, 62, 70, 68. The general trend is:", options: ["Decreasing", "No trend", "Increasing then slightly decreasing", "Constant"], answer: 2, topic: "Interpretation" },
        { type: "mc", text: "Which would NOT make a graph misleading?", options: ["Starting y-axis at 50", "3D effects on a bar chart", "Leaving out a title", "Labelling both axes clearly"], answer: 3, topic: "Interpretation" },
        { type: "input", text: "Data set: 4, 6, 6, 8, 9, 47. Calculate the mean (to 2 d.p.).", answer: "13.33", topic: "Interpretation" },
        { type: "input", text: "A shop records daily sales (in Rand) for a week: 800, 850, 900, 820, 780, 3200, 830. Identify the outlier and calculate the mean sales WITHOUT it (round to the nearest Rand).", answer: "830", topic: "Interpretation" },
      ]
    },
    {
      id: 1605,
      chapter: 16,
      name: "Ch 16 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 16 — Examination focus",
        sub: "Chapter 16 · Review",
        body: `
          <p>Data handling exam questions combine reading tables and graphs, calculating measures, drawing graphs, and critically evaluating representations.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 16 summary</div>
            <p>
              ✅ Categorical vs numerical (discrete/continuous)<br>
              ✅ Tally and frequency tables — frequencies must sum to total<br>
              ✅ Mean = sum ÷ n &nbsp; Median = middle (sort first!) &nbsp; Mode = most frequent<br>
              ✅ Range = max − min<br>
              ✅ Outliers affect mean most — median is more robust<br>
              ✅ Graph types: bar (categorical), histogram (continuous), line (over time), pie (proportions), stem-and-leaf (all values)<br>
              ✅ Pie angle = (f ÷ total) × 360°<br>
              ✅ Identify misleading features in graphs
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always show the angle calculation for pie charts, always sort before finding the median, and always check that frequencies sum to the total.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Data: 8, 12, 7, 15, 8, 10. Find the mean.", answer: "10", topic: "Mixed" },
        { type: "mc", text: "Data: 2, 4, 4, 6, 7, 9, 10. What is the median?", options: ["4", "5", "6", "7"], answer: 2, topic: "Mixed" },
        { type: "input", text: "A pie chart category has 18 out of 72 values. What is the sector angle in degrees?", answer: "90", topic: "Mixed" },
        { type: "mc", text: "Which graph best shows the distribution of 50 learners' heights?", options: ["Pie chart", "Line graph", "Histogram", "Double bar graph"], answer: 2, topic: "Mixed" },
        { type: "input", text: "Data: 3, 3, 5, 7, 9, 11, 11. List both modes separated by a comma.", answer: "3,11", topic: "Mixed" },
        { type: "input", text: "A data set of 7 values has mean 20. Six of the values are 15, 18, 22, 25, 19, and 21. Find the seventh value.", answer: "20", topic: "Mixed" },
        { type: "input", text: "A pie chart shows sport preferences: Soccer 40%, Rugby 25%, Cricket x%, Netball 15%, Other 10%. If 200 learners were surveyed, find x, then calculate how many learners chose Cricket.", answer: "20", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 16, chapterName: "Data Handling",
    topics: [
      {
        name: "Frequency tables and measures",
        questions: [
          {
            num: "1",
            text: "Marks (out of 20) for 15 learners: 14, 17, 12, 18, 14, 15, 17, 11, 14, 19, 16, 17, 13, 14, 12.",
            parts: [
              { label: "a)", text: "Construct a frequency table.", marks: 4 },
              { label: "b)", text: "State the modal mark.", marks: 1 },
              { label: "c)", text: "Calculate the mean mark.", marks: 3 },
              { label: "d)", text: "Find the median mark.", marks: 3 },
              { label: "e)", text: "State the range.", marks: 1 },
            ]
          },
          {
            num: "2",
            text: "40 learners' favourite subject: Maths 12, Science 10, English 8, History 6, Art 4.",
            parts: [
              { label: "a)", text: "Calculate the pie chart angle for each subject.", marks: 5 },
              { label: "b)", text: "Draw a clearly labelled pie chart.", marks: 4 },
              { label: "c)", text: "What percentage of learners chose Maths?", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Graphs and interpretation",
        questions: [
          {
            num: "3",
            text: "A learner's test scores over 6 months: Jan 45, Feb 52, Mar 58, Apr 55, Jun 70, Jul 68.",
            parts: [
              { label: "a)", text: "Draw a labelled line graph.", marks: 4 },
              { label: "b)", text: "Describe the general trend.", marks: 1 },
              { label: "c)", text: "Calculate the mean score.", marks: 2 },
              { label: "d)", text: "Between which two months was there the greatest improvement?", marks: 1 },
            ]
          },
          {
            num: "4",
            text: "Data set: 12, 25, 28, 29, 30, 31, 32, 90.",
            parts: [
              { label: "a)", text: "Identify the outlier(s).", marks: 1 },
              { label: "b)", text: "Calculate the mean with and without the outliers.", marks: 4 },
              { label: "c)", text: "Which measure — mean or median — better represents the data? Explain.", marks: 2 },
            ]
          },
          {
            num: "5",
            text: "The double bar graph data below shows the number of learners in each mark range for two Grade 8 classes on the same test:<br><br><table style='border-collapse:collapse;font-family:JetBrains Mono,monospace;font-size:13px;'><tr><th style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>Mark range</th><th style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>8A</th><th style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>8B</th></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>50–59</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>5</td></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>60–69</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>8</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>6</td></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>70–79</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>10</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>9</td></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>80–89</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>6</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>7</td></tr><tr><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>90–99</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>3</td><td style='padding:4px 12px;border:1px solid rgba(255,255,255,0.15);'>3</td></tr></table>",
            parts: [
              { label: "a)", text: "How many learners are in class 8A in total?", marks: 1 },
              { label: "b)", text: "Which mark range has exactly the same number of learners in both classes?", marks: 1 },
              { label: "c)", text: "Calculate the total number of learners (both classes combined) who scored 80 or above.", marks: 2 },
              { label: "d)", text: "What percentage of class 8B scored in the 70–79 range? (to 1 d.p.)", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 16, chapterName: "Chapter 16 — Data Handling",
    topics: [
      {
        name: "Frequency tables and measures",
        answers: [
          { num: "Q1a", ans: "11→1, 12→2, 13→1, 14→4, 15→1, 16→1, 17→3, 18→1, 19→1; Total=15", note: "All 15 values accounted for" },
          { num: "Q1b", ans: "Mode = 14", note: "Appears 4 times" },
          { num: "Q1c", ans: "Mean ≈ 14.87", note: "Sum=223; 223÷15=14.87" },
          { num: "Q1d", ans: "Median = 14", note: "Sorted 15 values; 8th = 14" },
          { num: "Q1e", ans: "Range = 8", note: "19−11=8" },
          { num: "Q2a", ans: "Maths 108°; Science 90°; English 72°; History 54°; Art 36°", note: "(f÷40)×360 for each" },
          { num: "Q2b", ans: "Pie chart with all 5 labelled sectors; angles sum to 360°", note: "Check labelling" },
          { num: "Q2c", ans: "30%", note: "12÷40=0.30" },
        ]
      },
      {
        name: "Graphs and interpretation",
        answers: [
          { num: "Q3a", ans: "Line graph: months on x-axis, scores on y-axis; points plotted and connected", note: "Both axes labelled" },
          { num: "Q3b", ans: "Generally increasing with a slight dip in April and July", note: "" },
          { num: "Q3c", ans: "Mean = 58", note: "348÷6=58" },
          { num: "Q3d", ans: "April to June (+15 marks)", note: "55→70" },
          { num: "Q4a", ans: "Outliers: 12 and 90", note: "Both far from the 25–32 cluster" },
          { num: "Q4b", ans: "With all 8: mean=34.6; without 12 and 90: mean=29.2", note: "277÷8=34.6; 175÷6=29.2" },
          { num: "Q4c", ans: "Median (≈29.5) better represents the data", note: "Mean distorted by outliers 12 and 90" },
          { num: "Q5a", ans: "30 learners", note: "3+8+10+6+3 = 30" },
          { num: "Q5b", ans: "90–99 (3 learners in both classes)", note: "Only range where 8A and 8B match exactly" },
          { num: "Q5c", ans: "19 learners", note: "8A: 6+3=9; 8B: 7+3=10; total = 9+10 = 19" },
          { num: "Q5d", ans: "30.0%", note: "9÷30×100 = 30%" },
        ]
      },
    ]
  }
});
