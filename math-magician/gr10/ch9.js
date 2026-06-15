// Math Magician — Grade 10, Chapter 9
// Finance and Growth

MathMagician.registerChapter(9, {
  topics: [
    {
      id: 0,
      chapter: 9,
      name: "Simple & compound interest",
      fullName: "Simple interest, compound interest, and growth calculations",
      lesson: {
        heading: "Simple and compound interest",
        sub: "Chapter 9 · Topic 1",
        body: `
          <p>Financial mathematics introduces the concept of <strong>interest</strong> — money earned on an investment or paid on a loan.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Simple interest</div>
            <p>Interest is calculated only on the <strong>original principal</strong> each year.<br>
            <span class="math">A = P(1 + in)</span><br>
            where: P = principal, i = annual interest rate (decimal), n = time in years, A = accumulated amount</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Compound interest</div>
            <p>Interest is calculated on the <strong>balance including previous interest</strong> (interest on interest).<br>
            <span class="math">A = P(1 + i)ⁿ</span><br>
            Compound interest always gives a <em>higher</em> accumulated amount than simple interest (over the same period).</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Compare simple vs compound</div>
            <p>R5 000 invested at 8% p.a. for 3 years:<br><br>
            <strong>Simple:</strong> <span class="math">A = 5000(1 + 0.08 × 3) = 5000(1.24) = R6 200</span><br>
            <strong>Compound:</strong> <span class="math">A = 5000(1.08)³ = 5000 × 1.2597 ≈ R6 298.56</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding P, i, or n</div>
            <p>
              Rearrange <span class="math">A = P(1 + i)ⁿ</span>:<br>
              <span class="math">P = A/(1+i)ⁿ</span> (present value)<br>
              <span class="math">i = (A/P)^(1/n) − 1</span> (interest rate)
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "R8 000 invested at 6% simple interest for 4 years. Find A:",
          options: ["R9 920", "R10 099", "R9 320", "R10 000"],
          answer: 0,
          topic: "Simple & compound interest"
        },
        {
          type: "input",
          text: "R10 000 at 5% compound interest for 2 years. Find A (to the nearest rand).",
          answer: "11025",
          topic: "Simple & compound interest"
        },
        {
          type: "mc",
          text: "Which earns more after 5 years: 10% simple or 10% compound?",
          options: ["Simple", "Compound", "Same", "Depends on principal"],
          answer: 1,
          topic: "Simple & compound interest"
        },
        {
          type: "mc",
          text: "A = R15 000, i = 8% compound, n = 3. Find P (to nearest rand):",
          options: ["R11 907", "R12 500", "R11 250", "R13 000"],
          answer: 0,
          topic: "Simple & compound interest"
        },
        {
          type: "input",
          text: "R6 000 grows to R7 500 with simple interest over 5 years. Find i (as a %).",
          answer: "5",
          topic: "Simple & compound interest"
        }
      ]
    },
    {
      id: 1,
      chapter: 9,
      name: "Exchange rates & hire purchase",
      fullName: "Foreign exchange rates and hire purchase (HP) agreements",
      lesson: {
        heading: "Exchange rates and hire purchase",
        sub: "Chapter 9 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Exchange rates</div>
            <p>An <strong>exchange rate</strong> gives the value of one currency in terms of another.<br>
            Example: R18.50 = $1 (1 US dollar = 18.50 South African rand)<br><br>
            To convert:<br>
            Rand → Dollar: divide by rate<br>
            Dollar → Rand: multiply by rate</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Currency conversion</div>
            <p>Rate: £1 = R21.20<br>
            Convert R5 300 to pounds: <span class="math">5300 ÷ 21.20 = £250</span><br>
            Convert £180 to rand: <span class="math">180 × 21.20 = R3 816</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Hire purchase (HP)</div>
            <p>Buying on credit with a deposit and monthly instalments. Simple interest is applied to the <em>full loan amount</em> (not reducing balance), making HP expensive.<br><br>
            Steps:<br>
            1. Loan = cash price − deposit<br>
            2. Total interest = Loan × i × n<br>
            3. Total repayment = Loan + interest<br>
            4. Monthly instalment = Total repayment ÷ number of months</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: HP calculation</div>
            <p>TV costs R9 000. Deposit = R900. HP at 15% p.a. simple interest over 2 years.<br>
            Loan = R8 100<br>
            Interest = 8100 × 0.15 × 2 = R2 430<br>
            Total = R10 530<br>
            Monthly = R10 530 ÷ 24 = R438.75</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "If $1 = R17.50, how many dollars does R3 500 buy?",
          options: ["$200", "$61 250", "$2 000", "$20"],
          answer: 0,
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "input",
          text: "€1 = R19.80. Convert €250 to rand.",
          answer: "4950",
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "mc",
          text: "Laptop costs R12 000. Deposit 10%. HP at 18% p.a. for 3 years. Monthly instalment:",
          options: ["R450", "R445", "R540", "R416"],
          answer: 0,
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "mc",
          text: "You pay R350/month for 24 months with a R500 deposit for a R7 500 item. Total interest paid:",
          options: ["R1 400", "R900", "R8 400", "R8 900"],
          answer: 0,
          topic: "Exchange rates & hire purchase"
        },
        {
          type: "input",
          text: "If ¥1 = R0.12, convert R6 000 to yen.",
          answer: "50000",
          topic: "Exchange rates & hire purchase"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 9 Workbook — Finance and Growth",
    questions: [
      {
        number: 1,
        text: "Simphiwe invests R15 000 at 7.5% per annum.",
        parts: [
          { label: "a", text: "Calculate the amount after 5 years using simple interest.", marks: 3 },
          { label: "b", text: "Calculate the amount after 5 years using compound interest.", marks: 3 },
          { label: "c", text: "How much more does compound interest earn?", marks: 1 }
        ]
      },
      {
        number: 2,
        text: "Lerato wants R50 000 in 4 years. How much must she invest today at 9% compound interest per annum?",
        parts: [
          { label: "a", text: "Write the formula and substitute values.", marks: 2 },
          { label: "b", text: "Calculate P (to the nearest rand).", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "A washing machine costs R8 500. Johan pays a 15% deposit and the balance on HP at 20% p.a. simple interest over 2 years.",
        parts: [
          { label: "a", text: "Calculate the deposit.", marks: 1 },
          { label: "b", text: "Calculate the loan amount.", marks: 1 },
          { label: "c", text: "Calculate the total interest charged.", marks: 2 },
          { label: "d", text: "Calculate the monthly instalment.", marks: 2 }
        ]
      },
      {
        number: 4,
        text: "The exchange rate is R1 = A$0.085 (Australian dollar).",
        parts: [
          { label: "a", text: "Convert R25 000 to Australian dollars.", marks: 2 },
          { label: "b", text: "A product costs A$340. What is the rand price?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "A = 15000(1 + 0.075×5) = 15000(1.375) = R20 625",
        b: "A = 15000(1.075)⁵ = 15000×1.4356 ≈ R21 534",
        c: "R21 534 − R20 625 = R909"
      },
      2: {
        a: "50000 = P(1.09)⁴",
        b: "P = 50000/1.4116 ≈ R35 420"
      },
      3: {
        a: "Deposit = 0.15×8500 = R1 275",
        b: "Loan = R7 225",
        c: "Interest = 7225×0.20×2 = R2 890",
        d: "Monthly = (7225+2890)/24 = R421.46"
      },
      4: {
        a: "25000×0.085 = A$2 125",
        b: "340 ÷ 0.085 = R4 000"
      }
    }
  }
});
