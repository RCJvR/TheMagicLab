// Math Magician — Grade 8, Chapter 12 data
// Decimal Fractions

MathMagician.registerChapter(12, {
  topics: [
    {
      id: 1201,
      chapter: 12,
      name: "The decimal system",
      fullName: "Revision of the decimal system",
      lesson: {
        heading: "Revision of the decimal system",
        sub: "Chapter 12 · Topic 1",
        body: `
          <p>Decimals are fractions written using place value. Each position to the right of the decimal point represents a power of ten in the denominator.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Place value</div>
            <p>
              <strong>Digits left of decimal:</strong> units, tens, hundreds, …<br>
              <strong>Digits right of decimal:</strong> tenths (1/10), hundredths (1/100), thousandths (1/1000), …<br><br>
              <strong>Example:</strong> <span class="math">34.758</span><br>
              3 = tens, 4 = units, 7 = tenths, 5 = hundredths, 8 = thousandths<br><br>
              <strong>Converting decimals to fractions:</strong><br>
              <span class="math">0.7 = 7/10</span>, <span class="math">0.35 = 35/100 = 7/20</span>, <span class="math">0.125 = 125/1000 = 1/8</span><br><br>
              <strong>Comparing decimals:</strong> align decimal points, compare digit by digit from left to right.
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>When comparing or ordering decimals, write them with the same number of decimal places by adding zeros. e.g. 0.3 = 0.300, which makes it clear that 0.300 > 0.299.</span></div>
        `
      },
      questions: [
        { type: "mc", text: "In 47.356, what is the value of the digit 3?", options: ["3 tenths", "3 hundredths", "3 units", "3 thousandths"], answer: 0, topic: "Decimals" },
        { type: "input", text: "Convert 0.625 to a fraction in simplest form (write as a/b).", answer: "5/8", topic: "Decimals" },
        { type: "mc", text: "Which is largest?", options: ["0.409", "0.49", "0.4", "0.041"], answer: 1, topic: "Decimals" },
        { type: "input", text: "Convert 3/8 to a decimal.", answer: "0.375", topic: "Decimals" },
        { type: "mc", text: "Order from smallest to largest: 0.3, 0.03, 0.303, 0.033", options: ["0.3, 0.03, 0.303, 0.033", "0.03, 0.033, 0.3, 0.303", "0.033, 0.03, 0.3, 0.303", "0.03, 0.3, 0.033, 0.303"], answer: 1, topic: "Decimals" },
        { type: "input", text: "Write 9/20 as a decimal, and state whether it is greater than, less than, or equal to 0.45. (Answer with the decimal value)", answer: "0.45", topic: "Decimals" },
        { type: "mc", text: "Which lists these values in order from smallest to largest: 0.6, 5/8, 0.65, 7/10?", options: ["0.6, 5/8, 0.65, 7/10", "5/8, 0.6, 0.65, 7/10", "0.6, 0.65, 5/8, 7/10", "7/10, 0.65, 5/8, 0.6"], answer: 0, topic: "Decimals" },
      ]
    },
    {
      id: 1202,
      chapter: 12,
      name: "Adding and subtracting decimals",
      fullName: "Addition and subtraction with decimals",
      lesson: {
        heading: "Addition and subtraction with decimals",
        sub: "Chapter 12 · Topic 2",
        body: `
          <p>Addition and subtraction of decimals follows the same rules as whole numbers — the key is <strong>aligning the decimal points</strong>.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Method</div>
            <p>
              1. Write numbers vertically with decimal points aligned.<br>
              2. Add trailing zeros so all numbers have the same decimal places.<br>
              3. Add or subtract as with whole numbers.<br>
              4. Place the decimal point in the answer directly below the others.
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Examples</div>
            <div class="example-step"><span class="step-num">1</span><span><span class="math">12.34 + 5.7 + 0.056</span>: align → 12.340 + 5.700 + 0.056 = 18.096</span></div>
            <div class="example-step"><span class="step-num">2</span><span><span class="math">20 − 7.345</span>: write as 20.000 − 7.345 = 12.655</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>The most common mistake is misaligning decimal points. Always write calculations vertically in an exam — it prevents errors and shows method.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate 14.7 + 3.85 + 0.067.", answer: "18.617", topic: "Decimals" },
        { type: "mc", text: "Calculate 25 − 8.46.", options: ["17.54", "16.54", "17.64", "16.64"], answer: 0, topic: "Decimals" },
        { type: "input", text: "Calculate 7.3 + 2.98 − 4.156.", answer: "6.124", topic: "Decimals" },
        { type: "mc", text: "A plank is 3.4 m. Two pieces of 0.75 m and 1.285 m are cut off. What remains?", options: ["1.365 m", "1.375 m", "1.465 m", "1.475 m"], answer: 0, topic: "Decimals" },
        { type: "input", text: "Calculate 100 − 34.567.", answer: "65.433", topic: "Decimals" },
        { type: "input", text: "A plumber has a 12.5 m pipe. He uses 3.75 m, then 2.9 m, then joins on another 1.65 m length. What is the final total length of pipe in m?", answer: "7.5", topic: "Decimals" },
        { type: "input", text: "Three friends' heights are 1.58 m, 1.62 m, and 1.71 m. A fourth friend's height equals the average of the other three (rounded to 2 d.p.) plus 0.05 m. Find the fourth friend's height in m.", answer: "1.69", topic: "Decimals" },
      ]
    },
    {
      id: 1203,
      chapter: 12,
      name: "Multiplying and dividing decimals",
      fullName: "Multiplication and division with decimals",
      lesson: {
        heading: "Multiplication and division with decimals",
        sub: "Chapter 12 · Topic 3",
        body: `
          <p>Multiplying and dividing decimals can be done by working with whole numbers and then adjusting the decimal point.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Multiplication</div>
            <p>
              1. Ignore decimal points and multiply as whole numbers.<br>
              2. Count total decimal places in both factors.<br>
              3. Place that many decimal places in the product.<br><br>
              <strong>Example:</strong> <span class="math">2.4 × 1.5</span><br>
              24 × 15 = 360; total decimal places = 2 → <span class="math">3.60</span>
            </p>
          </div>
          <div class="def-box">
            <div class="def-box-title">📖 Division</div>
            <p>
              <strong>Dividing by a decimal:</strong> multiply both numbers by a power of 10 to make the divisor a whole number.<br>
              e.g. <span class="math">4.8 ÷ 0.4</span>: multiply both by 10 → <span class="math">48 ÷ 4 = 12</span><br><br>
              <strong>Dividing by 10, 100, 1000:</strong> move decimal point left by 1, 2, 3 places.<br>
              <strong>Multiplying by 10, 100, 1000:</strong> move decimal point right.
            </p>
          </div>
          <div class="def-box" style="border-color:rgba(99,102,241,0.30);background:rgba(99,102,241,0.07);">
            <div class="def-box-title" style="color:#a5b4fc;">🎮 Try it — Decimal Operations</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px;margin-top:8px;">
              <input id="decA" type="number" step="any" value="2.4" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <select id="decOp" style="background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#a5b4fc;padding:7px 10px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;">
                <option>×</option><option>÷</option>
              </select>
              <input id="decB" type="number" step="any" value="1.5" style="width:75px;background:#1e1b4b;border:1px solid rgba(99,102,241,0.40);color:#fcd34d;padding:7px 8px;border-radius:7px;font-size:14px;font-family:JetBrains Mono,monospace;text-align:center;">
              <button id="decBtn" style="padding:7px 14px;border-radius:7px;border:none;background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;font-family:DM Sans,sans-serif;font-size:12px;font-weight:700;cursor:pointer;">= ?</button>
              <div id="decOut" style="font-family:JetBrains Mono,monospace;font-size:15px;color:#6ee7b7;padding:7px 14px;background:rgba(110,231,183,0.08);border:1px solid rgba(110,231,183,0.20);border-radius:7px;min-width:60px;text-align:center;"></div>
            </div>
          </div>
          <script>
          (function(){
            function calc(){
              const a=parseFloat(document.getElementById('decA').value);
              const b=parseFloat(document.getElementById('decB').value);
              const op=document.getElementById('decOp').value;
              const el=document.getElementById('decOut');
              if(isNaN(a)||isNaN(b)){el.textContent='?';return;}
              if(op==='÷'&&b===0){el.textContent='∞';return;}
              const res=op==='×'?a*b:a/b;
              el.textContent=parseFloat(res.toFixed(10)).toString();
            }
            document.getElementById('decBtn').addEventListener('click',calc);
            document.getElementById('decOp').addEventListener('change',calc);

          })();
          </script>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Count decimal places carefully in multiplication. <span class="math">0.3 × 0.3 = 0.09</span> — not 0.9. The answer has two decimal places because each factor has one.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate 3.6 × 2.5.", answer: "9", topic: "Decimals" },
        { type: "mc", text: "Calculate 7.56 ÷ 0.6.", options: ["12.6", "1.26", "12", "126"], answer: 0, topic: "Decimals" },
        { type: "input", text: "Calculate 0.04 × 0.3.", answer: "0.012", topic: "Decimals" },
        { type: "mc", text: "Calculate 4.5 ÷ 0.009.", options: ["5", "500", "50", "0.5"], answer: 1, topic: "Decimals" },
        { type: "input", text: "Calculate 1.2 × 3.4 − 0.08.", answer: "4", topic: "Decimals" },
        { type: "input", text: "A rectangular garden measures 4.5 m by 3.2 m. Calculate its area, then determine how many 0.8 m² paving slabs are needed to cover it exactly.", answer: "18", topic: "Decimals" },
        { type: "input", text: "A car uses 6.4 litres of fuel to travel 76.8 km. At this rate, how many litres are needed to travel 300 km?", answer: "25", topic: "Decimals" },
      ]
    },
    {
      id: 1204,
      chapter: 12,
      name: "Squares, cubes and roots of decimals",
      fullName: "Squares, cubes, square roots, and cube roots of decimals",
      lesson: {
        heading: "Squares, cubes, square roots, and cube roots of decimals",
        sub: "Chapter 12 · Topic 4",
        body: `
          <p>Squaring and cubing decimals follow the same multiplication rules — but take care with the number of decimal places.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Key rules</div>
            <p>
              <strong>Square:</strong> multiply the decimal by itself.<br>
              <span class="math">(0.4)² = 0.4 × 0.4 = 0.16</span> (2 d.p. + 2 d.p. = 4 d.p.? No — check: 4×4=16, 2 d.p. total → 0.16)<br><br>
              <strong>Square root:</strong> <span class="math">√0.16 = 0.4</span> (half the decimal places)<br><br>
              <strong>Cube:</strong> <span class="math">(0.2)³ = 0.2 × 0.2 × 0.2 = 0.008</span><br><br>
              <strong>Cube root:</strong> <span class="math">∛0.008 = 0.2</span><br><br>
              <strong>Useful perfect squares of decimals:</strong><br>
              0.1²=0.01, 0.2²=0.04, 0.3²=0.09, 0.4²=0.16, 0.5²=0.25
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>For √ of a decimal: pair the digits from the decimal point outward. Or convert to a fraction first — <span class="math">√0.36 = √(36/100) = 6/10 = 0.6</span>.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate (0.3)².", answer: "0.09", topic: "Decimals" },
        { type: "mc", text: "Calculate √0.49.", options: ["0.7", "0.07", "7", "0.49"], answer: 0, topic: "Decimals" },
        { type: "input", text: "Calculate (0.2)³.", answer: "0.008", topic: "Decimals" },
        { type: "mc", text: "Calculate ∛0.027.", options: ["0.03", "0.3", "3", "0.003"], answer: 1, topic: "Decimals" },
        { type: "input", text: "Calculate (1.2)² − √0.64.", answer: "0.64", topic: "Decimals" },
        { type: "input", text: "Calculate (0.6)² + (0.2)³ − √0.01.", answer: "0.268", topic: "Decimals" },
        { type: "input", text: "A square tile has area 0.49 m². A cube-shaped box has volume 0.125 m³. Find the tile's side length and the box's edge length, then calculate the sum of these two lengths in m.", answer: "1.2", topic: "Decimals" },
      ]
    },
    {
      id: 1205,
      chapter: 12,
      name: "Rounding and estimating",
      fullName: "Rounding off and estimating with decimals",
      lesson: {
        heading: "Rounding off and estimating with decimals",
        sub: "Chapter 12 · Topic 5",
        body: `
          <p>Rounding gives approximate values that are easier to work with. Estimation helps check whether an answer is reasonable.</p>
          <div class="def-box">
            <div class="def-box-title">📖 Rounding rules</div>
            <p>
              1. Identify the rounding digit (the place you're rounding to).<br>
              2. Look at the digit immediately to its right:<br>
              &nbsp;&nbsp;&nbsp;• If it is <strong>0–4</strong>: round down (keep the rounding digit).<br>
              &nbsp;&nbsp;&nbsp;• If it is <strong>5–9</strong>: round up (add 1 to the rounding digit).<br>
              3. Replace all digits to the right with zeros (or drop them if after the decimal).<br><br>
              <strong>Examples:</strong><br>
              <span class="math">3.746</span> to 2 d.p. → look at 3rd d.p. (6 ≥ 5) → round up → <span class="math">3.75</span><br>
              <span class="math">3.742</span> to 2 d.p. → look at 3rd d.p. (2 &lt; 5) → round down → <span class="math">3.74</span>
            </p>
          </div>
          <div class="example-box">
            <div class="example-box-title">✏️ Estimation</div>
            <div class="example-step"><span class="step-num">1</span><span>Estimate <span class="math">4.87 × 3.12</span>: round to <span class="math">5 × 3 = 15</span>. Actual ≈ 15.19 ✓</span></div>
            <div class="example-step"><span class="step-num">2</span><span>Estimate <span class="math">√26.1</span>: nearest perfect square is 25 → estimate ≈ 5.1</span></div>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Always estimate before calculating in exams — it tells you if your answer is in the right ballpark. If you get 150 when your estimate was 15, you made a decimal-point error.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Round 7.3856 to 2 decimal places.", answer: "7.39", topic: "Decimals" },
        { type: "mc", text: "Round 0.00548 to 3 decimal places.", options: ["0.006", "0.005", "0.0054", "0.0055"], answer: 1, topic: "Decimals" },
        { type: "input", text: "Estimate 9.87 × 4.12 by rounding each to the nearest whole number.", answer: "40", topic: "Decimals" },
        { type: "mc", text: "Round 25.449 to 1 decimal place.", options: ["25.4", "25.5", "25.45", "26.0"], answer: 0, topic: "Decimals" },
        { type: "input", text: "Between which two consecutive whole numbers does √45 lie?", answer: "6 and 7", topic: "Decimals" },
        { type: "input", text: "A quantity of 2.3846 kg must be rounded to the nearest 0.05 kg for packaging. What package size (in kg) would be used?", answer: "2.4", topic: "Decimals" },
        { type: "input", text: "Estimate 48.7 × 5.12 ÷ 9.89 by rounding each number to 1 significant figure.", answer: "25", topic: "Decimals" },
      ]
    },
    {
      id: 1206,
      chapter: 12,
      name: "Ch 12 Exam focus",
      fullName: "Examination focus exercise",
      lesson: {
        heading: "Chapter 12 — Examination focus",
        sub: "Chapter 12 · Review",
        body: `
          <p>Decimal exam questions test place value, all four operations, powers, roots, and rounding. Always show working and include units in answers.</p>
          <div class="def-box">
            <div class="def-box-title">📋 Chapter 12 summary</div>
            <p>
              ✅ Place value: tenths, hundredths, thousandths<br>
              ✅ Add/subtract: align decimal points<br>
              ✅ Multiply: count total decimal places<br>
              ✅ Divide by decimal: multiply both by power of 10 first<br>
              ✅ (a.b)²: multiply by itself; √: half the decimal places<br>
              ✅ Rounding: look one place right; 5+ rounds up<br>
              ✅ Estimate: round to 1 sig. fig. before calculating
            </p>
          </div>
          <div class="tip-box"><span class="tip-icon">💡</span><span>Check decimal-point position in every answer. A misplaced decimal turns 3.6 into 36 or 0.36 — both wrong even if the digits are right.</span></div>
        `
      },
      questions: [
        { type: "input", text: "Calculate 2.4² − √1.44.", answer: "4.56", topic: "Mixed" },
        { type: "mc", text: "Calculate 0.05 × 0.04.", options: ["0.2", "0.002", "0.02", "0.0002"], answer: 1, topic: "Mixed" },
        { type: "input", text: "Round 0.08653 to 3 significant figures.", answer: "0.0865", topic: "Mixed" },
        { type: "mc", text: "Calculate 6.3 ÷ 0.09.", options: ["0.7", "7", "70", "700"], answer: 2, topic: "Mixed" },
        { type: "input", text: "Estimate then calculate (2.95 + 4.08) × 1.97. Round answer to 2 d.p.", answer: "13.85", topic: "Mixed" },
        { type: "input", text: "Calculate (0.5)³ + (1.4)² − √0.25.", answer: "1.585", topic: "Mixed" },
        { type: "input", text: "A tank is filled at a rate of 3.6 litres per 0.4 minutes. At this rate, how many litres are added in 5 minutes?", answer: "45", topic: "Mixed" },
      ]
    },
  ],
  workbook: {
    chapter: 12, chapterName: "Decimal Fractions",
    topics: [
      {
        name: "Adding, subtracting, multiplying and dividing decimals",
        questions: [
          { num: "1", text: "Calculate, showing all working:", parts: [
            { label: "a)", text: "<span class='math'>34.07 + 8.9 − 12.456</span>", marks: 3 },
            { label: "b)", text: "<span class='math'>2.4 × 0.35</span>", marks: 2 },
            { label: "c)", text: "<span class='math'>17.28 ÷ 0.08</span>", marks: 3 },
            { label: "d)", text: "A car travels 245.6 km on 32.4 litres of fuel. Find fuel consumption in km/litre (2 d.p.).", marks: 3 },
          ]},
        ]
      },
      {
        name: "Squares, cubes, roots and rounding",
        questions: [
          { num: "2", text: "Without a calculator:", parts: [
            { label: "a)", text: "Calculate <span class='math'>(0.4)³ + √0.09</span>", marks: 3 },
            { label: "b)", text: "Round 3.08765 to 3 decimal places.", marks: 1 },
            { label: "c)", text: "Between which two consecutive integers does <span class='math'>√52</span> lie?", marks: 2 },
            { label: "d)", text: "Estimate <span class='math'>√98</span> to one decimal place without a calculator.", marks: 2 },
          ]},
          { num: "3", text: "Use a calculator to evaluate (round to 2 d.p. where necessary):", parts: [
            { label: "a)", text: "<span class='math'>√182</span>", marks: 1 },
            { label: "b)", text: "<span class='math'>∛512</span>", marks: 1 },
            { label: "c)", text: "<span class='math'>(1.2)⁴</span>", marks: 2 },
          ]},
        ]
      },
    ]
  },
  answerKey: {
    chapter: 12, chapterName: "Chapter 12 — Decimal Fractions",
    topics: [
      {
        name: "Adding, subtracting, multiplying and dividing decimals",
        answers: [
          { num: "Q1a", ans: "30.514", note: "34.07+8.9=42.97; 42.97−12.456=30.514" },
          { num: "Q1b", ans: "0.84", note: "24×35=840; 1+2=3 d.p. → 0.840=0.84" },
          { num: "Q1c", ans: "216", note: "Multiply both by 100: 1728÷8=216" },
          { num: "Q1d", ans: "7.58 km/litre", note: "245.6÷32.4≈7.58" },
        ]
      },
      {
        name: "Squares, cubes, roots and rounding",
        answers: [
          { num: "Q2a", ans: "0.364", note: "(0.4)³=0.064; √0.09=0.3; total=0.364" },
          { num: "Q2b", ans: "3.088", note: "4th d.p. is 6 ≥ 5, round up" },
          { num: "Q2c", ans: "7 and 8", note: "7²=49 < 52 < 64=8²" },
          { num: "Q2d", ans: "≈ 9.9", note: "9.9²=98.01 ≈ 98" },
          { num: "Q3a", ans: "≈ 13.49", note: "√182 ≈ 13.4907" },
          { num: "Q3b", ans: "8", note: "∛512=8 exactly (8³=512)" },
          { num: "Q3c", ans: "≈ 2.07", note: "1.2⁴=1.2²×1.2²=1.44×1.44=2.0736" },
        ]
      },
    ]
  }
});
