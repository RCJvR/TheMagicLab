// Math Magician — Grade 8, Chapter 17 data
// Probability

MathMagician.registerChapter(17, {
  topics: [
    {
      id: 96,
      chapter: 17,
      name: "Probability concepts",
      fullName: "Introduction to probability",
      lesson: {
        heading: "Introduction to probability",
        sub: "Chapter 17 · Topic 1",
        body: `
          <p><strong>Probability</strong> is the mathematics of chance — it measures how likely an event is to occur, on a scale from 0 (impossible) to 1 (certain).</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key vocabulary</div>
            <p>
              <strong>Experiment:</strong> an action with uncertain outcomes, e.g. rolling a die.<br>
              <strong>Outcome:</strong> a single result, e.g. rolling a 4.<br>
              <strong>Event:</strong> one or more outcomes of interest, e.g. rolling an even number.<br>
              <strong>Sample space (S):</strong> the set of all possible outcomes.<br>
              &nbsp;&nbsp;e.g. Rolling a die: <span class="math">S = {1, 2, 3, 4, 5, 6}</span>, n(S) = 6.<br><br>
              <strong>Probability formula:</strong><br>
              <span class="math">P(event) = number of favourable outcomes ÷ total outcomes</span><br>
              <span class="math">P(E) = n(E) ÷ n(S)</span><br><br>
              <strong>Probability scale:</strong><br>
              &nbsp;&nbsp;• P = 0: impossible &nbsp;&nbsp; P = 0.5: equally likely &nbsp;&nbsp; P = 1: certain<br>
              &nbsp;&nbsp;• 0 ≤ P(E) ≤ 1 always.<br><br>
              <strong>Complement:</strong> <span class="math">P(not E) = 1 − P(E)</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked examples</div>
            <div class="example-step"><span class="step-num">1</span><span>A fair die is rolled. P(rolling a 3) = <span class="math">1/6</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>P(rolling an even number) = <span class="math">3/6 = 1/2</span> (outcomes: 2, 4, 6)</span></div>
            <div class="example-step"><span class="step-num">3</span><span>P(rolling a number > 4) = <span class="math">2/6 = 1/3</span> (outcomes: 5, 6)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>P(not rolling a 3) = <span class="math">1 − 1/6 = 5/6</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Probability Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Set the sample space size and number of favourable outcomes.</p>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Favourable n(E)</label>
                <input id="probFav" type="number" value="3" min="0" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Total n(S)</label>
                <input id="probTotal" type="number" value="6" min="1" style="width:72px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:15px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div id="probOut" style="font-family:JetBrains Mono,monospace;font-size:13px;line-height:2.2;"></div>
          </div>
          <script>
          (function(){
            function gcd(a,b){ return b===0?a:gcd(b,a%b); }
            function update(){
              const f=parseInt(document.getElementById('probFav').value)||0;
              const t=parseInt(document.getElementById('probTotal').value)||1;
              if(f<0||t<1||f>t){
                document.getElementById('probOut').innerHTML='<span style="color:#fca5a5;">Check values: 0 ≤ n(E) ≤ n(S)</span>';
                return;
              }
              const g=gcd(f,t);
              const dec=(f/t);
              const pct=(dec*100);
              let desc='';
              if(dec===0) desc='Impossible';
              else if(dec<0.25) desc='Unlikely';
              else if(dec<0.5) desc='Less likely than not';
              else if(dec===0.5) desc='Equally likely';
              else if(dec<0.75) desc='More likely than not';
              else if(dec<1) desc='Very likely';
              else desc='Certain';
              document.getElementById('probOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">P(E):</span><span style="color:#fcd34d;">'+(f/g)+'/'+(t/g)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Decimal:</span><span style="color:#6ee7b7;">'+dec.toFixed(4)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Percentage:</span><span style="color:#a5b4fc;">'+pct.toFixed(1)+'%</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">P(not E):</span><span style="color:#fbbf24;">'+((t-f)/g)+'/'+(t/g)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:140px;display:inline-block;">Description:</span><span style="color:rgba(221,225,240,0.60);">'+desc+'</span></div>',
              ].join('');
            }
            ['probFav','probTotal'].forEach(id=>document.getElementById(id).addEventListener('input',update));
            update();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always simplify probability fractions. And always check: P(E) + P(not E) = 1. If they don't add to 1, you've made an error.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "A bag has 3 red, 5 blue, 2 green balls. P(red) = ?", options: ["3/5", "3/8", "3/10", "1/3"], answer: 2, topic: "Probability" },
        { type: "input", text: "A fair die is rolled. P(rolling a number less than 3) = ? (write as a fraction e.g. 1/3)", answer: "1/3", topic: "Probability" },
        { type: "mc", text: "P(an event) = 0.7. What is P(not the event)?", options: ["0.7", "0.3", "1.7", "0.07"], answer: 1, topic: "Probability" },
        { type: "mc", text: "Which probability value is impossible?", options: ["0", "0.5", "1", "1.2"], answer: 3, topic: "Probability" },
        { type: "input", text: "A spinner has 8 equal sections: 3 yellow, 2 red, 3 blue. P(not yellow) = ? (fraction)", answer: "5/8", topic: "Probability" },
      ]
    },
    {
      id: 97,
      chapter: 17,
      name: "Listing outcomes",
      fullName: "Listing outcomes and sample spaces",
      lesson: {
        heading: "Listing outcomes and sample spaces",
        sub: "Chapter 17 · Topic 2",
        body: `
          <p>To calculate probability accurately, you need to list all possible outcomes completely and systematically.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Methods for listing outcomes</div>
            <p>
              <strong>List notation:</strong> write all outcomes in a set: <span class="math">S = {HH, HT, TH, TT}</span>.<br><br>
              <strong>Tree diagram:</strong> branches show each stage of the experiment. Multiply along branches for compound events.<br><br>
              <strong>Two-way table (grid):</strong> rows = outcomes of event 1, columns = outcomes of event 2. Each cell = one combined outcome.<br><br>
              <strong>Fundamental counting principle:</strong><br>
              If event 1 has <em>m</em> outcomes and event 2 has <em>n</em> outcomes, the total combined outcomes = <span class="math">m × n</span>.<br>
              e.g. A coin AND a die: <span class="math">2 × 6 = 12</span> possible outcomes.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Two coins flipped — tree diagram</div>
            <div class="example-step"><span class="step-num">1</span><span>Coin 1: H or T → Coin 2: H or T each time.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Sample space: <span class="math">S = {HH, HT, TH, TT}</span>, n(S) = 4.</span></div>
            <div class="example-step"><span class="step-num">3</span><span>P(exactly one H) = <span class="math">2/4 = 1/2</span> (HT and TH)</span></div>
            <div class="example-step"><span class="step-num">4</span><span>P(at least one H) = <span class="math">3/4</span> (HH, HT, TH)</span></div>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Two-way table — die and coin</div>
            <div class="example-step"><span class="step-num">1</span><span>Die: {1,2,3,4,5,6} × Coin: {H,T} → 12 outcomes.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>P(H and even number) = <span class="math">3/12 = 1/4</span> (H2, H4, H6)</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Sample Space Generator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter outcomes for two events (comma-separated) to see the full sample space.</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;align-items:flex-end;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Event 1 outcomes</label>
                <input id="ss1" type="text" value="H,T" style="width:160px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Event 2 outcomes</label>
                <input id="ss2" type="text" value="1,2,3,4,5,6" style="width:160px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:13px;font-family:JetBrains Mono,monospace;">
              </div>
              <button id="ssGen" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Generate</button>
            </div>
            <div id="ssOut" style="font-size:12px;"></div>
          </div>
          <script>
          (function(){
            function gen(){
              const a=document.getElementById('ss1').value.split(',').map(s=>s.trim()).filter(Boolean);
              const b=document.getElementById('ss2').value.split(',').map(s=>s.trim()).filter(Boolean);
              const pairs=[];
              a.forEach(x=>b.forEach(y=>pairs.push('('+x+','+y+')')));
              const el=document.getElementById('ssOut');
              if(!pairs.length){el.innerHTML='<span style="color:#fca5a5;">Enter at least one outcome for each event.</span>';return;}
              el.innerHTML='<div style="color:rgba(221,225,240,0.45);font-family:JetBrains Mono,monospace;font-size:11px;margin-bottom:6px;">n(S) = '+a.length+' × '+b.length+' = <span style="color:#fbbf24;">'+pairs.length+'</span></div>'
                +'<div style="color:rgba(165,180,252,0.80);font-family:JetBrains Mono,monospace;font-size:12px;line-height:1.8;">S = { '+pairs.join(', ')+' }</div>';
            }
            document.getElementById('ssGen').addEventListener('click',gen);
            gen();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>When listing outcomes systematically, always fix one event and vary the other — this ensures you don't miss any combinations or double-count.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A coin is flipped and a die is rolled. How many outcomes are in the sample space?", answer: "12", topic: "Sample space" },
        { type: "mc", text: "Two coins are flipped. What is P(both tails)?", options: ["1/2", "1/4", "1/3", "3/4"], answer: 1, topic: "Sample space" },
        { type: "mc", text: "A bag has 3 shirts (red, blue, green) and 2 hats (cap, beanie). How many outfit combinations?", options: ["5", "6", "9", "3"], answer: 1, topic: "Sample space" },
        { type: "input", text: "Two dice are rolled. How many outcomes are in the sample space?", answer: "36", topic: "Sample space" },
        { type: "mc", text: "Two coins are flipped. P(at least one head) = ?", options: ["1/4", "1/2", "2/4", "3/4"], answer: 3, topic: "Sample space" },
      ]
    },
    {
      id: 98,
      chapter: 17,
      name: "Relative frequency",
      fullName: "Relative frequency and experimental probability",
      lesson: {
        heading: "Relative frequency and experimental probability",
        sub: "Chapter 17 · Topic 3",
        body: `
          <p><strong>Theoretical probability</strong> is calculated from equally likely outcomes. <strong>Experimental probability</strong> (relative frequency) is measured by actually carrying out an experiment.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Experimental vs theoretical probability</div>
            <p>
              <strong>Theoretical probability:</strong> <span class="math">P(E) = n(E) ÷ n(S)</span> — assumes all outcomes equally likely.<br><br>
              <strong>Experimental probability (relative frequency):</strong><br>
              <span class="math">P(E) ≈ number of times E occurred ÷ total number of trials</span><br><br>
              <strong>Key principle:</strong> as the number of trials increases, experimental probability gets closer to theoretical probability. This is the <em>Law of Large Numbers</em>.<br><br>
              <strong>Fair vs biased:</strong><br>
              &nbsp;&nbsp;• A fair coin/die: each outcome equally likely.<br>
              &nbsp;&nbsp;• A biased (loaded) die: some outcomes more likely than others — experimental probability will differ from theoretical.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>A coin is flipped 100 times. Heads appears 47 times.</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Experimental P(H) = <span class="math">47/100 = 0.47</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Theoretical P(H) = <span class="math">1/2 = 0.50</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>The difference (0.03) is due to chance — with more flips, results would get closer to 0.50.</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Relative Frequency Calculator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Enter number of successes and total trials to compare with theoretical probability.</p>
            <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Successes</label>
                <input id="rfSucc" type="number" value="47" min="0" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Total trials</label>
                <input id="rfTrials" type="number" value="100" min="1" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
              <div style="display:flex;flex-direction:column;gap:4px;">
                <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Theoretical P</label>
                <input id="rfTheo" type="number" value="0.5" min="0" max="1" step="0.01" style="width:80px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              </div>
            </div>
            <div id="rfOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2.1;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const s=parseFloat(document.getElementById('rfSucc').value)||0;
              const t=parseFloat(document.getElementById('rfTrials').value)||1;
              const th=parseFloat(document.getElementById('rfTheo').value)||0;
              const exp=s/t;
              const diff=Math.abs(exp-th);
              document.getElementById('rfOut').innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Experimental P:</span><span style="color:#fcd34d;">'+exp.toFixed(4)+'</span> ('+s+'/'+t+')</div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Theoretical P:</span><span style="color:#a5b4fc;">'+th.toFixed(4)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);width:180px;display:inline-block;">Difference:</span><span style="color:'+(diff<0.05?'#6ee7b7':'#fca5a5')+';">'+diff.toFixed(4)+'</span></div>',
                '<div style="margin-top:4px;font-size:11px;opacity:0.45;">'+((diff<0.05)?'Close to theoretical — results look fair.':'Notable difference — possibly biased, or more trials needed.')+'</div>',
              ].join('');
            }
            ['rfSucc','rfTrials','rfTheo'].forEach(id=>document.getElementById(id).addEventListener('input',calc));
            calc();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>In exams: experimental probability is always an estimate. The more trials, the more reliable the estimate. Never say experimental = theoretical — say "approaches" or "approximates".</span></div>
        `
      },
      questions: [
        { type: "input", text: "A die is rolled 60 times. A 6 appears 8 times. What is the experimental P(6)? (fraction)", answer: "2/15", topic: "Relative frequency" },
        { type: "mc", text: "Theoretical P(6) on a fair die is 1/6 ≈ 0.167. Experimental P(6) = 8/60 ≈ 0.133. What can you conclude?", options: ["The die is definitely biased", "The die might be biased, or the difference is due to chance", "The experiment was wrong", "Experimental and theoretical must always match"], answer: 1, topic: "Relative frequency" },
        { type: "mc", text: "As the number of trials increases, experimental probability:", options: ["Moves further from theoretical", "Gets closer to theoretical probability", "Stays the same", "Becomes exactly equal immediately"], answer: 1, topic: "Relative frequency" },
        { type: "input", text: "A coin is flipped 200 times. Heads appears 95 times. What is the experimental P(heads) as a decimal?", answer: "0.475", topic: "Relative frequency" },
        { type: "mc", text: "Experimental P(red) from a spinner = 0.42 after 50 spins. Theoretical P(red) = 0.40. The best explanation is:", options: ["The spinner is biased", "The theoretical probability is wrong", "The difference is likely due to chance with only 50 trials", "Red is more likely than theory predicts"], answer: 2, topic: "Relative frequency" },
      ]
    },
    {
      id: 99,
      chapter: 17,
      name: "Ch 17 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 17 — Examination focus",
        sub: "Chapter 17 · Review",
        body: `
          <p>Probability exam questions test your ability to calculate probabilities, list sample spaces, and interpret experimental results.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 17 summary</div>
            <p>
              ✅ Probability = n(E) ÷ n(S); always between 0 and 1<br>
              ✅ P(not E) = 1 − P(E)<br>
              ✅ Sample space: list ALL outcomes — use tree diagrams or two-way tables<br>
              ✅ Counting principle: m × n outcomes for two independent events<br>
              ✅ Experimental P = successes ÷ trials (an estimate)<br>
              ✅ More trials → experimental P approaches theoretical P<br>
              ✅ Express probability as a fraction, decimal, or percentage
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">📝 Common exam mistakes to avoid</div>
            <div class="example-step"><span class="step-num">✗</span><span>Writing P(E) > 1 — impossible. Always check your answer is between 0 and 1.</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Forgetting to list all outcomes — use a systematic method (tree/grid).</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Confusing "at least one" with "exactly one".</span></div>
            <div class="example-step"><span class="step-num">✗</span><span>Saying experimental = theoretical — always say "approximately" or "approaches".</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Check: P(E) + P(not E) = 1. If your two probabilities don't add to 1, you've made an error somewhere.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A bag has 4 red, 3 blue, 3 green balls. What is P(blue)? (fraction)", answer: "3/10", topic: "Mixed" },
        { type: "mc", text: "A fair die is rolled. P(factor of 6) = ? Factors of 6: {1,2,3,6}", options: ["4/6", "2/6", "3/6", "1/6"], answer: 0, topic: "Mixed" },
        { type: "input", text: "Two coins are flipped. What is P(both heads)? (fraction)", answer: "1/4", topic: "Mixed" },
        { type: "mc", text: "A spinner is spun 80 times. Red appears 28 times. Experimental P(red) is closest to:", options: ["0.25", "0.30", "0.35", "0.40"], answer: 2, topic: "Mixed" },
        { type: "input", text: "P(winning a game) = 0.35. What is P(not winning)?", answer: "0.65", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 17, chapterName: "Probability",
    topics: [
      {
        name: "Theoretical probability and sample spaces",
        questions: [
          {
            num: "1",
            text: "A bag contains 5 red, 3 blue, and 2 yellow marbles.",
            parts: [
              { label: "a)", text: "Write down the sample space.", marks: 1 },
              { label: "b)", text: "Find P(red).", marks: 2 },
              { label: "c)", text: "Find P(not blue).", marks: 2 },
              { label: "d)", text: "Find P(red or yellow).", marks: 2 },
              { label: "e)", text: "Is picking a green marble possible? Explain.", marks: 1 },
            ]
          },
          {
            num: "2",
            text: "A fair die and a fair coin are used together.",
            parts: [
              { label: "a)", text: "Draw a two-way table showing all outcomes.", marks: 3 },
              { label: "b)", text: "How many outcomes are in the sample space?", marks: 1 },
              { label: "c)", text: "Find P(Head and an odd number).", marks: 2 },
              { label: "d)", text: "Find P(Tail and a number greater than 4).", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Experimental probability",
        questions: [
          {
            num: "3",
            text: "A thumbtack is dropped 200 times. It lands point-up 74 times and point-down 126 times.",
            parts: [
              { label: "a)", text: "Calculate the experimental P(point-up).", marks: 2 },
              { label: "b)", text: "Calculate the experimental P(point-down).", marks: 1 },
              { label: "c)", text: "Do these probabilities sum to 1? Show this.", marks: 1 },
              { label: "d)", text: "If the experiment is repeated 500 times, how many times would you expect it to land point-up?", marks: 2 },
            ]
          },
          {
            num: "4",
            text: "A learner claims a spinner is fair (4 equal sections: red, blue, green, yellow). After 60 spins: red 20, blue 12, green 16, yellow 12.",
            parts: [
              { label: "a)", text: "Calculate the experimental probability for each colour.", marks: 4 },
              { label: "b)", text: "What is the theoretical probability for each colour?", marks: 1 },
              { label: "c)", text: "Is the spinner likely to be fair? Justify your answer.", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 17, chapterName: "Chapter 17 — Probability",
    topics: [
      {
        name: "Theoretical probability and sample spaces",
        answers: [
          { num: "Q1a", ans: "S = {red, red, red, red, red, blue, blue, blue, yellow, yellow} or describe: 10 marbles", note: "n(S) = 10" },
          { num: "Q1b", ans: "P(red) = 5/10 = 1/2", note: "5 red out of 10 total" },
          { num: "Q1c", ans: "P(not blue) = 7/10", note: "1 − 3/10 = 7/10; or (5+2)/10" },
          { num: "Q1d", ans: "P(red or yellow) = 7/10", note: "(5+2)/10 = 7/10" },
          { num: "Q1e", ans: "No — there are no green marbles in the bag; P(green) = 0", note: "Impossible event" },
          { num: "Q2a", ans: "Two-way table: rows H/T, columns 1–6; 12 cells filled with e.g. H1, H2, … T6", note: "All 12 outcomes listed" },
          { num: "Q2b", ans: "n(S) = 12", note: "2 × 6 = 12" },
          { num: "Q2c", ans: "P(H and odd) = 3/12 = 1/4", note: "Odd numbers: 1,3,5; with H: H1, H3, H5 → 3 outcomes" },
          { num: "Q2d", ans: "P(T and >4) = 2/12 = 1/6", note: ">4: 5, 6; with T: T5, T6 → 2 outcomes" },
        ]
      },
      {
        name: "Experimental probability",
        answers: [
          { num: "Q3a", ans: "P(point-up) = 74/200 = 0.37", note: "74÷200" },
          { num: "Q3b", ans: "P(point-down) = 126/200 = 0.63", note: "126÷200" },
          { num: "Q3c", ans: "0.37 + 0.63 = 1.00 ✓", note: "Sum = 1 confirms no errors" },
          { num: "Q3d", ans: "Expected: 500 × 0.37 = 185 times", note: "Use experimental probability as estimate" },
          { num: "Q4a", ans: "Red 20/60=0.33; Blue 12/60=0.20; Green 16/60=0.27; Yellow 12/60=0.20", note: "All sum to 1.00" },
          { num: "Q4b", ans: "Each = 1/4 = 0.25", note: "Equal sections → equal probability" },
          { num: "Q4c", ans: "Possibly not fair — red appears more often (0.33 vs 0.25); but with only 60 spins, could be chance. More trials needed to be certain.", note: "Accept reasoned answer either way" },
        ]
      },
    ]
  }
});
