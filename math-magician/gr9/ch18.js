// Math Magician — Grade 9, Chapter 18
// Data Handling

MathMagician.registerChapter(18, {
  topics: [
    {
      id: 35,
      chapter: 18,
      name: "Collect, organise and summarise data",
      fullName: "Collecting, organising and summarising data",
      lesson: {
        heading: "Collecting, organising and summarising data",
        sub: "Chapter 18 · Topic 1",
        body: `
          <p>Grade 9 builds on Grade 8's data handling skills, with a stronger focus on choosing appropriate methods for the type of data and questioning how reliable the data source is.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary (recap and extension)</div>
            <p>
              <strong>Population:</strong> the entire group being studied. <strong>Sample:</strong> a smaller group used to represent the population.<br>
              <strong>Categorical data:</strong> non-numerical (e.g. favourite subject). <strong>Numerical data:</strong> discrete (countable) or continuous (measured).<br><br>
              <strong>Sampling methods:</strong><br>
              &nbsp;&nbsp;• <strong>Random sample:</strong> every member has an equal chance of being chosen.<br>
              &nbsp;&nbsp;• <strong>Systematic sample:</strong> chosen at fixed intervals (e.g. every 10th learner).<br>
              &nbsp;&nbsp;• <strong>Convenience sample:</strong> whoever is easiest to reach — often biased.<br><br>
              <strong>Summary tools:</strong> tally table, frequency table, grouped frequency table (class intervals for continuous/wide-range data).
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Measures of central tendency and spread</div>
            <p>
              <strong>Mean:</strong> <span class="math">x̄ = Σx ÷ n</span> &nbsp; <strong>Median:</strong> middle value of sorted data &nbsp; <strong>Mode:</strong> most frequent value<br>
              <strong>Range:</strong> max − min<br><br>
              <strong>Grouped data mean (estimate):</strong> use the <em>midpoint</em> of each class interval, multiply by frequency, sum, then divide by total frequency.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Estimating the mean of grouped data</div>
            <div class="example-step"><span class="step-num">1</span><span>Class 0–10 (f=4, midpoint=5); 10–20 (f=6, midpoint=15); 20–30 (f=10, midpoint=25)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Σ(f × midpoint) = 4(5) + 6(15) + 10(25) = 20 + 90 + 250 = 360</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Total frequency = 4+6+10 = 20</span></div>
            <div class="example-step"><span class="step-num">4</span><span>Estimated mean = <span class="math">360 ÷ 20 = 18</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Grouped Data Mean Estimator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter class midpoints and frequencies (comma-separated, matching order) to estimate the mean.</p>
            <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Midpoints</label>
                <input id="gdMid" type="text" value="5,15,25" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Frequencies</label>
                <input id="gdFreq" type="text" value="4,6,10" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <button id="gdCalc" style="align-self:flex-start;padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Estimate mean</button>
            </div>
            <div id="gdOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const mids = document.getElementById('gdMid').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              const freqs = document.getElementById('gdFreq').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              const out = document.getElementById('gdOut');
              if(!mids.length || mids.length !== freqs.length){
                out.innerHTML = '<span style="color:#fca5a5;">Enter the same number of midpoints and frequencies.</span>';
                return;
              }
              let sumFX = 0, sumF = 0, rows = '';
              mids.forEach((m,i) => {
                const f = freqs[i];
                sumFX += m*f; sumF += f;
                rows += '<div><span style="color:rgba(221,225,240,0.45);">Midpoint '+m+' × f='+f+' = </span><span style="color:#a5b4fc;">'+(m*f)+'</span></div>';
              });
              out.innerHTML = rows +
                '<div style="margin-top:6px;"><span style="color:rgba(221,225,240,0.45);">Σ(f×midpoint) = </span><span style="color:#fbbf24;">'+sumFX+'</span></div>' +
                '<div><span style="color:rgba(221,225,240,0.45);">Σf = </span><span style="color:#fbbf24;">'+sumF+'</span></div>' +
                '<div><span style="color:rgba(221,225,240,0.45);">Estimated mean = </span><span style="color:#6ee7b7;font-weight:700;">'+(sumFX/sumF).toFixed(2)+'</span></div>';
            }
            document.getElementById('gdCalc').addEventListener('click', calc);
            calc();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For grouped data the mean is only an <strong>estimate</strong> — you don't know the exact values inside each class, only the midpoint used as a stand-in.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "Choosing survey respondents by selecting every 8th name on a register is an example of:", options: ["Convenience sampling", "Systematic sampling", "Random sampling", "Biased sampling"], answer: 1, topic: "Data" },
        { type: "mc", text: "Interviewing only friends outside the school gate about a school-wide issue is an example of:", options: ["Random sampling", "Systematic sampling", "Convenience sampling (likely biased)", "A census"], answer: 2, topic: "Data" },
        { type: "input", text: "Class intervals 0-10 (f=5, midpoint 5) and 10-20 (f=5, midpoint 15). Estimate the mean.", answer: "10", topic: "Data" },
        { type: "mc", text: "A grouped frequency table is most appropriate when:", options: ["Data has only 3 distinct values", "Data is categorical", "Data is continuous and spans a wide range", "There are fewer than 10 data values"], answer: 2, topic: "Data" },
        { type: "input", text: "Classes 0-20 (f=3, mid=10), 20-40 (f=7, mid=30). Estimate the mean (round to 1 decimal).", answer: "24", topic: "Data" },
      ]
    },
    {
      id: 36,
      chapter: 18,
      name: "Represent data",
      fullName: "Representing data — including histograms and scatter plots",
      lesson: {
        heading: "Representing data — histograms and scatter plots",
        sub: "Chapter 18 · Topic 2",
        body: `
          <p>Beyond the bar graphs, pie charts and stem-and-leaf plots from Grade 8, Grade 9 introduces two powerful new representations: <strong>histograms</strong> for grouped continuous data, and <strong>scatter plots</strong> for exploring relationships between two variables.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Histograms</div>
            <p>
              A <strong>histogram</strong> displays grouped continuous data using touching bars — the bar width represents a class interval, and there are no gaps between bars (unlike a bar graph).<br><br>
              <strong>Building one:</strong> choose equal class intervals, count the frequency in each, draw bars with height = frequency and width = interval.<br>
              A taller bar means more data values fall in that interval.
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Scatter plots</div>
            <p>
              A <strong>scatter plot</strong> plots pairs of values (x; y) as points to explore whether a relationship (correlation) exists between two variables.<br><br>
              <strong>Positive correlation:</strong> as x increases, y tends to increase (points trend upward).<br>
              <strong>Negative correlation:</strong> as x increases, y tends to decrease (points trend downward).<br>
              <strong>No correlation:</strong> points are scattered with no clear pattern.<br><br>
              A <strong>line of best fit</strong> can be drawn through the middle of the points to show the trend — it is not required to touch every point.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Reading a scatter plot</div>
            <div class="example-step"><span class="step-num">1</span><span>Hours studied vs test score: (1;40), (2;50), (3;58), (4;68), (5;80)</span></div>
            <div class="example-step"><span class="step-num">2</span><span>As hours studied increases, score increases → <strong>positive correlation</strong></span></div>
            <div class="example-step"><span class="step-num">3</span><span>A line of best fit would slope upward from left to right.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Histogram & Scatter Plot Builder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Switch modes: build a histogram from class frequencies, or plot points to see the correlation.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <select id="dhMode" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:12px;font-family:DM Sans,sans-serif;">
                <option value="hist">Histogram (frequencies)</option>
                <option value="scatter">Scatter plot (x,y pairs)</option>
              </select>
              <input id="dhInput" type="text" value="4,7,10,6,3" style="flex:1;min-width:200px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 12px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              <button id="dhBuild" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Build</button>
            </div>
            <svg id="dhSvg" viewBox="0 0 320 180" style="width:100%;max-width:320px;height:180px;border-radius:8px;background:rgba(10,15,30,0.60);margin-bottom:10px;"></svg>
            <div id="dhOut" style="font-size:12px;color:rgba(221,225,240,0.55);"></div>
          </div>
          <script>
          (function(){
            function setPlaceholder(){
              const mode = document.getElementById('dhMode').value;
              document.getElementById('dhInput').value = mode === 'hist' ? '4,7,10,6,3' : '1,40,2,50,3,58,4,68,5,80';
            }
            function build(){
              const mode = document.getElementById('dhMode').value;
              const svg = document.getElementById('dhSvg');
              const out = document.getElementById('dhOut');
              const raw = document.getElementById('dhInput').value.split(',').map(s=>parseFloat(s.trim())).filter(n=>!isNaN(n));
              let html = '';
              if(mode === 'hist'){
                if(!raw.length){ out.innerHTML='Enter comma-separated frequencies.'; return; }
                const max = Math.max(...raw);
                const barW = 300/raw.length;
                raw.forEach((f,i) => {
                  const h = (f/max)*140;
                  html += '<rect x="'+(10+i*barW)+'" y="'+(160-h)+'" width="'+(barW-2)+'" height="'+h+'" fill="#6366f1" opacity="0.8"/>';
                  html += '<text x="'+(10+i*barW+barW/2)+'" y="172" font-size="9" fill="rgba(221,225,240,0.55)" text-anchor="middle" font-family="JetBrains Mono,monospace">'+f+'</text>';
                });
                svg.innerHTML = html;
                out.innerHTML = 'Histogram: '+raw.length+' touching bars, class frequencies '+raw.join(', ')+'. Total = '+raw.reduce((a,b)=>a+b,0)+'.';
              } else {
                if(raw.length < 4 || raw.length % 2 !== 0){ out.innerHTML='Enter x,y pairs, e.g. 1,40,2,50,3,58'; return; }
                const pts = [];
                for(let i=0;i<raw.length;i+=2) pts.push([raw[i],raw[i+1]]);
                const xs = pts.map(p=>p[0]), ys = pts.map(p=>p[1]);
                const minX=Math.min(...xs), maxX=Math.max(...xs), minY=Math.min(...ys), maxY=Math.max(...ys);
                pts.forEach(([x,y]) => {
                  const px = 20 + (maxX===minX?0:(x-minX)/(maxX-minX))*280;
                  const py = 160 - (maxY===minY?0:(y-minY)/(maxY-minY))*140;
                  html += '<circle cx="'+px+'" cy="'+py+'" r="4" fill="#fbbf24"/>';
                });
                svg.innerHTML = html;
                // simple correlation sign check
                const n = pts.length;
                const meanX = xs.reduce((a,b)=>a+b,0)/n, meanY = ys.reduce((a,b)=>a+b,0)/n;
                let cov = 0;
                pts.forEach(([x,y]) => cov += (x-meanX)*(y-meanY));
                const trend = cov > 0 ? 'positive correlation (upward trend)' : cov < 0 ? 'negative correlation (downward trend)' : 'no clear correlation';
                out.innerHTML = pts.length+' points plotted. Pattern suggests: <strong style="color:#a5b4fc;">'+trend+'</strong>.';
              }
            }
            document.getElementById('dhMode').addEventListener('change', function(){ setPlaceholder(); build(); });
            document.getElementById('dhBuild').addEventListener('click', build);
            build();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Histogram bars always touch (continuous data, no gaps). Scatter plots never connect points with lines — only a single line of best fit summarises the trend.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "What is the main visual difference between a histogram and a bar graph?", options: ["Histograms use colour, bar graphs don't", "Histogram bars touch; bar graph bars are separated", "Bar graphs can only show one category", "There is no difference"], answer: 1, topic: "Graphs" },
        { type: "mc", text: "A scatter plot of ice-cream sales vs temperature shows points trending upward. This suggests:", options: ["Negative correlation", "No correlation", "Positive correlation", "The data is unusable"], answer: 2, topic: "Graphs" },
        { type: "mc", text: "A scatter plot of 'hours of TV watched' vs 'test score' trends downward. This suggests:", options: ["Positive correlation", "Negative correlation", "No correlation", "A histogram is needed instead"], answer: 1, topic: "Graphs" },
        { type: "input", text: "A histogram has class intervals of width 10, starting at 0. How many classes are needed to cover values from 0 up to 50?", answer: "5", topic: "Graphs" },
        { type: "mc", text: "A line of best fit on a scatter plot should:", options: ["Pass through every single point exactly", "Connect the points in order", "Show the general trend through the middle of the points", "Always be horizontal"], answer: 2, topic: "Graphs" },
      ]
    },
    {
      id: 37,
      chapter: 18,
      name: "Interpret, analyse and report data",
      fullName: "Interpreting, analysing and reporting on data",
      lesson: {
        heading: "Interpreting, analysing and reporting on data",
        sub: "Chapter 18 · Topic 3",
        body: `
          <p>Grade 9 goes further than describing a data set — you must critically evaluate <strong>how the data was collected</strong> and whether the <strong>source is reliable</strong>, in addition to spotting outliers and misleading graphs.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Bias and source reliability</div>
            <p>
              <strong>Bias</strong> occurs when a data collection method favours certain outcomes or excludes certain groups, making conclusions unreliable.<br><br>
              <strong>Questions to ask about any data source:</strong><br>
              &nbsp;&nbsp;• Who collected the data, and why? (Do they have an interest in a particular result?)<br>
              &nbsp;&nbsp;• How was the sample chosen? Is it representative of the whole population?<br>
              &nbsp;&nbsp;• Was the sample size large enough?<br>
              &nbsp;&nbsp;• Were the survey questions neutral, or worded to lead respondents to a particular answer?<br><br>
              <strong>Outliers:</strong> extreme values that pull the mean away from the typical value — median is more resistant ("robust") to outliers.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Evaluating a claim</div>
            <div class="example-step"><span class="step-num">1</span><span>Claim: "90% of learners prefer Maths" — based on a survey of 10 learners in the Maths Olympiad club.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Problem: sample is small (n=10) and drawn only from a group already interested in Maths.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>Conclusion: the sample is <strong>biased</strong> and not representative of all learners — the claim is unreliable.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Source Reliability Checklist</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Tick the boxes that describe a data source or survey to get an instant reliability rating.</p>
            <div id="relChecks" style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px;font-size:12.5px;color:rgba(221,225,240,0.70);"></div>
            <div id="relOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;"></div>
          </div>
          <script>
          (function(){
            const issues = [
              {t:'Sample size is small (fewer than ~30)', w:1},
              {t:'Sample was a convenience sample (not random/systematic)', w:1},
              {t:'Survey questions seem leading or one-sided', w:1},
              {t:'Data collector benefits from a particular result', w:1},
              {t:'Sample excludes a large part of the population', w:1},
            ];
            const div = document.getElementById('relChecks');
            issues.forEach((it,i) => {
              const row = document.createElement('label');
              row.style.cssText = 'display:flex;gap:8px;align-items:center;cursor:pointer;';
              row.innerHTML = '<input type="checkbox" data-i="'+i+'" style="width:15px;height:15px;">' + it.t;
              div.appendChild(row);
            });
            function update(){
              const checked = div.querySelectorAll('input:checked').length;
              const out = document.getElementById('relOut');
              let verdict, colour;
              if(checked === 0){ verdict = 'No red flags selected — source looks reliable so far.'; colour = '#6ee7b7'; }
              else if(checked <= 1){ verdict = 'Minor concern — interpret conclusions with some caution.'; colour = '#fcd34d'; }
              else if(checked <= 3){ verdict = 'Several red flags — the data is likely biased or unreliable.'; colour = '#fbbf24'; }
              else { verdict = 'Many red flags — this source should not be trusted without further evidence.'; colour = '#fca5a5'; }
              out.innerHTML = '<span style="color:'+colour+';">'+checked+' issue(s) selected: '+verdict+'</span>';
            }
            div.querySelectorAll('input').forEach(inp => inp.addEventListener('change', update));
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In exams, always justify bias claims with a reason — e.g. "the sample only included club members, so it does not represent all learners."</span></div>
        `
      },
      questions: [
        { type: "mc", text: "A survey on 'favourite subject' only asks learners waiting outside the science lab. This sample is likely:", options: ["Random and reliable", "Biased — not representative of all learners", "A census", "Perfectly systematic"], answer: 1, topic: "Interpretation" },
        { type: "mc", text: "Which measure of central tendency is most resistant to outliers?", options: ["Mean", "Median", "Range", "Mode always"], answer: 1, topic: "Interpretation" },
        { type: "mc", text: "A company survey asks: 'Don't you agree our product is the best?' This question is problematic because it is:", options: ["Too short", "Leading/biased wording", "Numerical", "A census question"], answer: 1, topic: "Interpretation" },
        { type: "mc", text: "A claim is based on a sample of 8 people out of a town of 50 000. The main concern is:", options: ["The sample is too large", "The sample size is too small to be representative", "There is no concern", "8 is an even number"], answer: 1, topic: "Interpretation" },
        { type: "input", text: "Data: 22, 24, 23, 25, 90. Which single value should be investigated as a possible outlier?", answer: "90", topic: "Interpretation" },
      ]
    },
  ],
  workbook: {
    chapter: 18, chapterName: "Data Handling",
    topics: [
      {
        name: "Grouped data and representations",
        questions: [
          {
            num: "1",
            text: "The ages of 30 gym members were grouped: 10-20 (f=6), 20-30 (f=12), 30-40 (f=8), 40-50 (f=4).",
            parts: [
              { label: "a)", text: "Write down the midpoint of each class interval.", marks: 2 },
              { label: "b)", text: "Estimate the mean age.", marks: 3 },
              { label: "c)", text: "Draw a histogram to represent this data.", marks: 3 },
            ]
          },
          {
            num: "2",
            text: "A learner records hours of exercise per week (x) and resting heart rate (y) for 6 people: (1;80), (2;76), (3;74), (4;70), (5;66), (6;62).",
            parts: [
              { label: "a)", text: "Draw a scatter plot of this data.", marks: 3 },
              { label: "b)", text: "Describe the correlation shown.", marks: 2 },
              { label: "c)", text: "Sketch an appropriate line of best fit.", marks: 2 },
            ]
          },
          {
            num: "3",
            text: "The frequency table below shows the time (in minutes) that 40 learners spent on homework one evening:<br>0–10 (f=5), 10–20 (f=9), 20–30 (f=14), 30–40 (f=8), 40–50 (f=4)",
            parts: [
              { label: "a)", text: "Write down the modal class.", marks: 2 },
              { label: "b)", text: "Estimate the mean time spent on homework, using class midpoints.", marks: 3 },
              { label: "c)", text: "What percentage of the 40 learners spent 30 minutes or more on homework?", marks: 3 },
              { label: "d)", text: "If this data were drawn as a histogram, how many touching bars would it have?", marks: 1 },
            ]
          },
        ]
      },
      {
        name: "Bias and reliability",
        questions: [
          {
            num: "4",
            text: "A magazine claims '95% of teenagers love social media', based on an online poll of 40 of the magazine's own social media followers.",
            parts: [
              { label: "a)", text: "Identify two problems with how this data was collected.", marks: 4 },
              { label: "b)", text: "Suggest a better sampling method for this claim.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 18, chapterName: "Chapter 18 — Data Handling",
    topics: [
      {
        name: "Grouped data and representations",
        answers: [
          { num: "Q1a", ans: "Midpoints: 15, 25, 35, 45", note: "Average of each interval's endpoints" },
          { num: "Q1b", ans: "Estimated mean ≈ 27.3", note: "(6×15+12×25+8×35+4×45)÷30 = 820÷30 ≈ 27.33" },
          { num: "Q1c", ans: "Histogram with 4 touching bars of heights 6, 12, 8, 4 over the given intervals", note: "No gaps between bars — continuous data" },
          { num: "Q2a", ans: "Scatter plot with 6 points plotted as described", note: "x = hours exercise, y = heart rate" },
          { num: "Q2b", ans: "Negative correlation — as exercise hours increase, heart rate decreases", note: "" },
          { num: "Q2c", ans: "A line sloping downward from left to right through the middle of the points", note: "" },
          { num: "Q3a", ans: "20–30 (the modal class)", note: "Highest frequency is 14, in the 20–30 class" },
          { num: "Q3b", ans: "Estimated mean = 24.25 minutes", note: "(5×5+9×15+14×25+8×35+4×45)÷40 = 970÷40 = 24.25" },
          { num: "Q3c", ans: "30%", note: "(8+4)/40 × 100 = 12/40 × 100 = 30%" },
          { num: "Q3d", ans: "5 bars", note: "One touching bar per class interval; 5 class intervals" },
        ]
      },
      {
        name: "Bias and reliability",
        answers: [
          { num: "Q4a", ans: "The sample (magazine's own followers) is not representative of all teenagers; the sample size (40) is small; followers likely already like social media, biasing the result", note: "Any two reasonable issues" },
          { num: "Q4b", ans: "Use a random or systematic sample drawn from a broad, representative population of teenagers, with a larger sample size", note: "" },
        ]
      },
    ]
  }
});
