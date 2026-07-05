// Math Magician — Grade 9, Chapter 19
// Probability

MathMagician.registerChapter(19, {
  topics: [
    {
      id: 38,
      chapter: 19,
      name: "Probability of events, relative frequency",
      fullName: "Theoretical probability, relative frequency and comparing the two",
      lesson: {
        heading: "Theoretical probability vs relative frequency",
        sub: "Chapter 19 · Topic 1",
        body: `
          <p>Grade 9 recaps the probability formula from Grade 8, then focuses on <strong>comparing</strong> theoretical probability with experimental (relative frequency) results, and explaining differences between them.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Recap and comparison</div>
            <p>
              <strong>Theoretical probability:</strong> <span class="math">P(E) = n(E) ÷ n(S)</span> — based on equally likely outcomes, calculated without doing an experiment.<br><br>
              <strong>Relative frequency (experimental probability):</strong><br>
              <span class="math">Relative frequency = number of times E occurred ÷ total number of trials</span><br><br>
              <strong>Comparing them:</strong><br>
              &nbsp;&nbsp;• With few trials, relative frequency can differ noticeably from theoretical probability — this is normal, due to chance.<br>
              &nbsp;&nbsp;• As the number of trials increases, relative frequency tends to get closer to the theoretical probability (Law of Large Numbers).<br>
              &nbsp;&nbsp;• A large, persistent difference across many trials may indicate the outcomes are not actually equally likely (e.g. a biased die).
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example</div>
            <div class="example-step"><span class="step-num">1</span><span>A fair die: theoretical P(rolling a 6) = <span class="math">1/6 ≈ 0.167</span></span></div>
            <div class="example-step"><span class="step-num">2</span><span>Rolled 30 times, a 6 appears 3 times → relative frequency = <span class="math">3/30 = 0.10</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>Rolled 300 times, a 6 appears 52 times → relative frequency = <span class="math">52/300 ≈ 0.173</span></span></div>
            <div class="example-step"><span class="step-num">4</span><span>With more trials, the relative frequency (0.173) is much closer to the theoretical value (0.167) than with only 30 trials (0.10).</span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Dice Roll Simulator</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Simulate rolling a fair die many times and compare the relative frequency of each outcome to the theoretical 1/6.</p>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;">
              <label style="font-size:10px;color:rgba(221,225,240,0.45);text-transform:uppercase;letter-spacing:0.06em;">Number of rolls</label>
              <input id="drTrials" type="number" value="60" min="1" max="10000" style="width:90px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="drRoll" style="padding:7px 16px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Roll the die!</button>
            </div>
            <div id="drOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function roll(){
              const trials = Math.max(1, Math.min(10000, parseInt(document.getElementById('drTrials').value)||60));
              const counts = [0,0,0,0,0,0];
              for(let i=0;i<trials;i++){ counts[Math.floor(Math.random()*6)]++; }
              let html = '';
              counts.forEach((c,i) => {
                const rf = c/trials;
                const diff = Math.abs(rf - 1/6);
                html += '<div><span style="color:rgba(221,225,240,0.45);display:inline-block;width:60px;">Face '+(i+1)+':</span><span style="color:#fbbf24;">'+c+'</span> <span style="color:rgba(221,225,240,0.40);">→ rel.freq='+rf.toFixed(3)+'</span> <span style="color:'+(diff<0.05?'#6ee7b7':'#fca5a5')+';">(theory 0.167)</span></div>';
              });
              html += '<div style="margin-top:6px;font-size:11px;opacity:0.45;">Total rolls: '+trials+'. Run it again — relative frequencies will vary each time, especially with fewer trials.</div>';
              document.getElementById('drOut').innerHTML = html;
            }
            document.getElementById('drRoll').addEventListener('click', roll);
            roll();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Never claim relative frequency IS the probability — it is an estimate that approaches the true probability only as trials increase.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A fair coin is flipped. What is the theoretical P(heads)? (as a decimal)", answer: "0.5", topic: "Probability" },
        { type: "mc", text: "A die is rolled 40 times; a 6 comes up 9 times. The relative frequency of rolling a 6 is:", options: ["1/6", "9/40", "6/40", "40/9"], answer: 1, topic: "Probability" },
        { type: "mc", text: "As the number of trials in an experiment increases, relative frequency generally:", options: ["Moves further from the theoretical probability", "Gets closer to the theoretical probability", "Becomes exactly 1", "Has no relationship to theoretical probability"], answer: 1, topic: "Probability" },
        { type: "input", text: "A spinner is spun 250 times; red appears 62 times. What is the relative frequency of red, as a decimal (round to 2 dp)?", answer: "0.25", topic: "Probability" },
        { type: "mc", text: "A coin is flipped 20 times giving 16 heads. A learner concludes 'this coin is definitely biased.' The best response is:", options: ["Agree — 16/20 proves it is biased", "20 trials is a small sample; more trials are needed before concluding bias", "Relative frequency must always equal 0.5", "The result is impossible"], answer: 1, topic: "Probability" },
      ]
    },
    {
      id: 39,
      chapter: 19,
      name: "Probability models and two-way tables",
      fullName: "Simple probability models and two-way tables",
      lesson: {
        heading: "Simple probability models and two-way tables",
        sub: "Chapter 19 · Topic 2",
        body: `
          <p>A <strong>two-way table</strong> (contingency table) organises data about two categorical variables at once, making it easy to calculate probabilities involving combinations of both.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Reading a two-way table</div>
            <p>
              Rows represent one variable, columns represent another, and each cell shows the count for that combination. The final row/column ("totals" or "marginal totals") give the total for each category and the grand total.<br><br>
              <strong>P(row and column)</strong> = cell count ÷ grand total.<br>
              <strong>P(a category)</strong> = that row or column's total ÷ grand total.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Worked example — learners and transport</div>
            <div class="example-step"><span class="step-num">1</span><span>
              <table style="border-collapse:collapse;font-family:JetBrains Mono,monospace;font-size:12px;">
                <tr><th style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);"></th><th style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Bus</th><th style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Walk</th><th style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Total</th></tr>
                <tr><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Boys</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">12</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">8</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">20</td></tr>
                <tr><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Girls</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">10</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">20</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">30</td></tr>
                <tr><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">Total</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">22</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">28</td><td style="padding:4px 10px;border:1px solid rgba(255,255,255,0.15);">50</td></tr>
              </table>
            </span></div>
            <div class="example-step"><span class="step-num">2</span><span>P(a randomly chosen learner is a girl who walks) = <span class="math">20/50 = 2/5</span></span></div>
            <div class="example-step"><span class="step-num">3</span><span>P(learner takes the bus) = <span class="math">22/50 = 11/25</span></span></div>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Two-Way Table Probability Builder</div>
            <p style="font-size:11px;color:rgba(221,225,240,0.40);margin-bottom:10px;">Edit the four cell counts to build your own two-way table and see the probabilities calculated live.</p>
            <div style="display:grid;grid-template-columns:80px 70px 70px;gap:6px;margin-bottom:12px;align-items:center;">
              <div></div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-align:center;">Column A</div><div style="font-size:11px;color:rgba(221,225,240,0.45);text-align:center;">Column B</div>
              <div style="font-size:11px;color:rgba(221,225,240,0.45);">Row 1</div>
              <input id="twA1" type="number" value="12" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-family:JetBrains Mono,monospace;text-align:center;">
              <input id="twB1" type="number" value="8" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-family:JetBrains Mono,monospace;text-align:center;">
              <div style="font-size:11px;color:rgba(221,225,240,0.45);">Row 2</div>
              <input id="twA2" type="number" value="10" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-family:JetBrains Mono,monospace;text-align:center;">
              <input id="twB2" type="number" value="20" style="width:60px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:6px;border-radius:6px;font-family:JetBrains Mono,monospace;text-align:center;">
            </div>
            <div id="twOut" style="font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:2;"></div>
          </div>
          <script>
          (function(){
            function calc(){
              const a1=parseFloat(document.getElementById('twA1').value)||0;
              const b1=parseFloat(document.getElementById('twB1').value)||0;
              const a2=parseFloat(document.getElementById('twA2').value)||0;
              const b2=parseFloat(document.getElementById('twB2').value)||0;
              const rowTotal1=a1+b1, rowTotal2=a2+b2;
              const colTotalA=a1+a2, colTotalB=b1+b2;
              const grand=rowTotal1+rowTotal2;
              const out=document.getElementById('twOut');
              if(grand===0){ out.innerHTML='<span style="color:#fca5a5;">Enter at least one non-zero count.</span>'; return; }
              out.innerHTML=[
                '<div><span style="color:rgba(221,225,240,0.45);">Grand total:</span> <span style="color:#fbbf24;">'+grand+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">P(Row 1 and Col A):</span> <span style="color:#6ee7b7;">'+a1+'/'+grand+' = '+(a1/grand).toFixed(3)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">P(Row 2 and Col B):</span> <span style="color:#6ee7b7;">'+b2+'/'+grand+' = '+(b2/grand).toFixed(3)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">P(Row 1):</span> <span style="color:#a5b4fc;">'+rowTotal1+'/'+grand+' = '+(rowTotal1/grand).toFixed(3)+'</span></div>',
                '<div><span style="color:rgba(221,225,240,0.45);">P(Col A):</span> <span style="color:#a5b4fc;">'+colTotalA+'/'+grand+' = '+(colTotalA/grand).toFixed(3)+'</span></div>',
              ].join('');
            }
            ['twA1','twB1','twA2','twB2'].forEach(id=>document.getElementById(id).addEventListener('input',calc));
            calc();
          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always calculate the grand total first (sum of all cells) — every probability from a two-way table is some count divided by this grand total.</span></div>
        `
      },
      questions: [
        { type: "input", text: "A two-way table shows 15 boys who play sport and 25 girls who play sport, out of 60 learners total. What is P(a learner plays sport)? (as a fraction, e.g. 2/3)", answer: "2/3", topic: "Two-way tables" },
        { type: "mc", text: "In a two-way table, the 'grand total' refers to:", options: ["The largest single cell", "The sum of one row only", "The sum of all cells in the table", "The number of columns"], answer: 2, topic: "Two-way tables" },
        { type: "input", text: "Table: Row 1 = {8, 12}, Row 2 = {10, 20}. What is the grand total?", answer: "50", topic: "Two-way tables" },
        { type: "mc", text: "Using the transport example (Boys: Bus 12, Walk 8; Girls: Bus 10, Walk 20; total 50), what is P(boy who takes the bus)?", options: ["12/20", "12/50", "22/50", "20/50"], answer: 1, topic: "Two-way tables" },
        { type: "input", text: "In a two-way table, Column A total = 22 and grand total = 50. What is P(Column A), as a decimal (2 dp)?", answer: "0.44", topic: "Two-way tables" },
      ]
    },
  ],
  workbook: {
    chapter: 19, chapterName: "Probability",
    topics: [
      {
        name: "Relative frequency vs theoretical probability",
        questions: [
          {
            num: "1",
            text: "A fair spinner has 5 equal sections numbered 1 to 5. It is spun 200 times; the number 3 comes up 52 times.",
            parts: [
              { label: "a)", text: "State the theoretical probability of spinning a 3.", marks: 1 },
              { label: "b)", text: "Calculate the relative frequency of spinning a 3 from the experiment.", marks: 2 },
              { label: "c)", text: "Compare the two values and comment on whether the spinner appears fair.", marks: 2 },
            ]
          },
        ]
      },
      {
        name: "Two-way tables",
        questions: [
          {
            num: "2",
            text: "A survey of 80 learners recorded whether they own a pet and their grade: Grade 8 — pet 18, no pet 12; Grade 9 — pet 24, no pet 26.",
            parts: [
              { label: "a)", text: "Draw the two-way table with row and column totals.", marks: 3 },
              { label: "b)", text: "Find P(a learner is in Grade 9 and owns a pet).", marks: 2 },
              { label: "c)", text: "Find P(a learner owns a pet).", marks: 2 },
              { label: "d)", text: "Find P(a learner is in Grade 8).", marks: 2 },
            ]
          },
        ]
      },
    ]
  },
  answerKey: {
    chapter: 19, chapterName: "Chapter 19 — Probability",
    topics: [
      {
        name: "Relative frequency vs theoretical probability",
        answers: [
          { num: "Q1a", ans: "P(3) = 1/5 = 0.2", note: "5 equally likely sections" },
          { num: "Q1b", ans: "Relative frequency = 52/200 = 0.26", note: "" },
          { num: "Q1c", ans: "0.26 is reasonably close to 0.20; with 200 trials some difference is expected by chance — the spinner is probably fair but could be checked with more trials", note: "Accept reasoned answers" },
        ]
      },
      {
        name: "Two-way tables",
        answers: [
          { num: "Q2a", ans: "Grade 8: pet 18, no pet 12, total 30; Grade 9: pet 24, no pet 26, total 50; Column totals: pet 42, no pet 38; grand total 80", note: "" },
          { num: "Q2b", ans: "P(Grade 9 and pet) = 24/80 = 3/10", note: "" },
          { num: "Q2c", ans: "P(pet) = 42/80 = 21/40", note: "" },
          { num: "Q2d", ans: "P(Grade 8) = 30/80 = 3/8", note: "" },
        ]
      },
    ]
  }
});
