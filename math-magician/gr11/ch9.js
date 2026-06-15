// Math Magician — Grade 11, Chapter 9
// Finance, Growth and Decay

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 0,
      chapter: 9,
      name: "Depreciation & timelines",
      fullName: "Simple and compound depreciation, and using timelines",
      lesson: {
        heading: "Depreciation and financial timelines",
        sub: "Chapter 9 · Topic 1",
        body: `
          <p>Grade 11 Finance introduces <strong>depreciation</strong> (assets losing value) and <strong>timelines</strong> for tracking complex multi-stage investments.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Depreciation formulae</div>
            <p>
              <strong>Straight-line (simple) depreciation:</strong><br>
              <span class="math">A = P(1 − in)</span><br>
              Asset loses the same rand value each year.<br><br>
              <strong>Reducing-balance (compound) depreciation:</strong><br>
              <span class="math">A = P(1 − i)ⁿ</span><br>
              Asset loses the same <em>percentage</em> of its current value each year. Always > straight-line for same rate.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Compare depreciation</div>
            <p>Car bought for R250 000. Depreciation rate 15% p.a. Value after 5 years:<br>
            <strong>Straight-line:</strong> A = 250000(1 − 0.15 × 5) = 250000(0.25) = R62 500<br>
            <strong>Reducing-balance:</strong> A = 250000(0.85)⁵ ≈ 250000 × 0.4437 ≈ R110 929</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Timelines</div>
            <p>
              A <strong>timeline</strong> is a diagram showing money at different points in time. Used for:<br>
              • Multi-stage investments (different rates at different periods)<br>
              • Finding when the value reaches a certain amount<br>
              • Comparing future values<br><br>
              Always move money to the <em>same point in time</em> before comparing.
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Machine cost R80 000. Straight-line depreciation 20% p.a. Value after 4 years:",
          options: ["R16 000", "R32 768", "R16 384", "R20 000"],
          answer: 0,
          topic: "Depreciation & timelines"
        },
        {
          type: "mc",
          text: "Reducing-balance depreciation always gives _____ book value than straight-line for same rate:",
          options: ["Lower", "Higher", "Equal", "Depends on number of years"],
          answer: 1,
          topic: "Depreciation & timelines"
        },
        {
          type: "input",
          text: "Equipment: R120 000. Reducing-balance depreciation 10% p.a. Find value after 3 years (to nearest rand).",
          answer: "87480",
          topic: "Depreciation & timelines"
        },
        {
          type: "mc",
          text: "A car depreciates straight-line from R200 000 to R50 000 in 5 years. The annual depreciation rate is:",
          options: ["15%", "10%", "20%", "30%"],
          answer: 0,
          topic: "Depreciation & timelines"
        },
        {
          type: "mc",
          text: "A timeline is used primarily to:",
          options: ["Find interest rates", "Compare money at different points in time at the same point", "Calculate monthly payments", "Draw graphs of exponential growth"],
          answer: 1,
          topic: "Depreciation & timelines"
        }
      ]
    },
    {
      id: 1,
      chapter: 9,
      name: "Nominal & effective interest rates",
      fullName: "Nominal interest rates, effective interest rates, and compounding periods",
      lesson: {
        heading: "Nominal and effective interest rates",
        sub: "Chapter 9 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Compounding periods</div>
            <p>
              Interest can be compounded more frequently than annually:<br>
              <span class="math">A = P(1 + i/n)^(nt)</span><br>
              where n = compounding periods per year, t = time in years<br><br>
              Common periods:<br>
              • Annually: n = 1<br>
              • Semi-annually: n = 2<br>
              • Quarterly: n = 4<br>
              • Monthly: n = 12<br>
              • Daily: n = 365
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Nominal vs effective interest rate</div>
            <p>
              <strong>Nominal rate (i_nom):</strong> the stated annual rate (e.g. "12% p.a. compounded monthly")<br>
              <strong>Effective rate (i_eff):</strong> the equivalent annual rate that would give the same result with annual compounding<br><br>
              Conversion: <span class="math">(1 + i_eff) = (1 + i_nom/n)ⁿ</span><br>
              So: <span class="math">i_eff = (1 + i_nom/n)ⁿ − 1</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Nominal to effective</div>
            <p>12% p.a. compounded monthly:<br>
            <span class="math">i_eff = (1 + 0.12/12)¹² − 1 = (1.01)¹² − 1 ≈ 0.1268 = 12.68% p.a.</span></p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "R5000 invested at 8% p.a. compounded quarterly for 3 years. A =",
          options: ["R6 341", "R6 298", "R6 325", "R6 500"],
          answer: 0,
          topic: "Nominal & effective interest rates"
        },
        {
          type: "mc",
          text: "Effective annual rate equivalent to 10% p.a. compounded semi-annually:",
          options: ["10.25%", "10.50%", "10%", "10.10%"],
          answer: 0,
          topic: "Nominal & effective interest rates"
        },
        {
          type: "input",
          text: "Which gives more: 12% p.a. compounded monthly OR 12.5% p.a. compounded annually? Calculate effective rate of 12% monthly (to 2 d.p. as %).",
          answer: "12.68",
          altAnswers: ["12.68%"],
          topic: "Nominal & effective interest rates"
        },
        {
          type: "mc",
          text: "The formula A = P(1 + i/n)^(nt). If n = 12 and the nominal annual rate is 18%, the rate per period is:",
          options: ["1.5%", "18%", "1.5°", "18/100"],
          answer: 0,
          topic: "Nominal & effective interest rates"
        },
        {
          type: "mc",
          text: "More frequent compounding of the same nominal rate means:",
          options: ["Less interest earned", "The same interest", "More interest earned", "The effective rate decreases"],
          answer: 2,
          topic: "Nominal & effective interest rates"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 9 Workbook — Finance, Growth and Decay",
    questions: [
      {
        number: 1,
        text: "A truck is bought for R450 000.",
        parts: [
          { label: "a", text: "Calculate the book value after 6 years using straight-line depreciation at 12% p.a.", marks: 3 },
          { label: "b", text: "Calculate the book value after 6 years using reducing-balance depreciation at 12% p.a.", marks: 3 },
          { label: "c", text: "After how many years will the straight-line value equal zero?", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "Nomvula invests R20 000 for 5 years.",
        parts: [
          { label: "a", text: "Calculate the accumulated value at 9% p.a. compounded monthly.", marks: 3 },
          { label: "b", text: "Calculate the effective annual interest rate for 9% compounded monthly (to 4 decimal places as %).", marks: 3 },
          { label: "c", text: "Compare: would she earn more with 9.4% p.a. compounded annually?", marks: 2 }
        ]
      },
      {
        number: 3,
        text: "R30 000 is invested at 8% p.a. compounded annually for 3 years, then the full amount is reinvested at 10% p.a. compounded semi-annually for 2 more years. Use a timeline.",
        parts: [
          { label: "a", text: "Draw the timeline and find the value after 3 years.", marks: 3 },
          { label: "b", text: "Find the final value after the full 5 years.", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "A=450000(1−0.12×6)=450000(0.28)=R126 000",
        b: "A=450000(0.88)⁶≈450000×0.4644≈R208 980",
        c: "1−0.12n=0 → n=1/0.12≈8.33 years (after 8⅓ years)"
      },
      2: {
        a: "A=20000(1+0.09/12)^60=20000(1.0075)^60≈20000×1.5657≈R31 314",
        b: "i_eff=(1.0075)^12−1≈0.09381=9.3807%",
        c: "9.4%>9.3807% → 9.4% annual gives slightly more"
      },
      3: {
        a: "A₃=30000(1.08)³≈30000×1.2597≈R37 791",
        b: "A₅=37791(1+0.10/2)⁴=37791(1.05)⁴≈37791×1.2155≈R45 953"
      }
    }
  }
});
