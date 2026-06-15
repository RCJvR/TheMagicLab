// Math Magician — Grade 12, Chapter 3
// Finance — Annuities and Loan Calculations

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 0,
      chapter: 3,
      name: "Future value annuities",
      fullName: "Annuities, future value, and sinking funds",
      lesson: {
        heading: "Future value annuities",
        sub: "Chapter 3 · Topic 1",
        body: `
          <p>An <strong>annuity</strong> is a series of equal payments made at regular intervals. Grade 12 Finance uses geometric series to derive annuity formulae.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Future value annuity (savings)</div>
            <p>
              Regular payment x, made at the END of each period, at interest rate i per period, for n periods:<br><br>
              <span class="math">F = x · [(1+i)ⁿ − 1] / i</span><br><br>
              Use when: saving towards a goal (e.g. retirement fund, car fund)<br>
              F = future value (accumulated amount)<br>
              x = payment per period
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Retirement savings</div>
            <p>R2 000 per month for 20 years at 9% p.a. compounded monthly.<br>
            i = 0.09/12 = 0.0075; n = 240<br>
            <span class="math">F = 2000 · [(1.0075)²⁴⁰ − 1] / 0.0075</span><br>
            <span class="math">F = 2000 · [6.0092 − 1] / 0.0075</span><br>
            <span class="math">F = 2000 · 667.89 ≈ R1 335 780</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Finding x (the required payment)</div>
            <p>
              Rearrange for x: <span class="math">x = F · i / [(1+i)ⁿ − 1]</span><br><br>
              Used for <strong>sinking funds</strong>: saving to replace an asset.
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "R1 000 per month for 5 years at 12% p.a. compounded monthly. Which is correct?", options: ["F = 1000[(1.01)⁶⁰−1]/0.01", "F = 1000[(1.12)⁵−1]/0.12", "F = 1000·60·0.01", "F = 1000(1.01)⁶⁰"], answer: 0, topic: "Future value annuities" },
        { type: "mc", text: "A sinking fund formula finds:", options: ["The future value", "The payment needed to reach a future value", "The interest rate", "The number of periods"], answer: 1, topic: "Future value annuities" },
        { type: "mc", text: "Payments at the END of each period is called:", options: ["Annuity due", "Ordinary annuity", "Perpetuity", "Deferred annuity"], answer: 1, topic: "Future value annuities" },
        { type: "input", text: "Using F = x[(1+i)ⁿ−1]/i with x=500, i=0.01, n=3: find F.", answer: "1515.05", altAnswers: ["1515"], topic: "Future value annuities" },
        { type: "mc", text: "To accumulate R100 000 in 10 years at 8% p.a. compounded annually, the annual payment x satisfies:", options: ["100000 = x[(1.08)¹⁰−1]/0.08", "x = 100000·0.08/[(1.08)¹⁰−1]", "Both A and B", "Neither"], answer: 2, topic: "Future value annuities" }
      ]
    },
    {
      id: 1,
      chapter: 3,
      name: "Present value annuities & loan repayments",
      fullName: "Present value annuities, loan repayments, and outstanding balances",
      lesson: {
        heading: "Present value annuities and loan repayments",
        sub: "Chapter 3 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Present value annuity (loans)</div>
            <p>
              The present value P of n equal payments of x at interest rate i per period:<br><br>
              <span class="math">P = x · [1 − (1+i)⁻ⁿ] / i</span><br><br>
              Use for: home loans, car finance, any loan with equal repayments.<br>
              Rearranged for payment: <span class="math">x = P · i / [1 − (1+i)⁻ⁿ]</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Car loan</div>
            <p>Car costs R250 000. 10% deposit. 60 monthly payments at 11% p.a. compounded monthly.<br>
            P = R225 000; i = 0.11/12 ≈ 0.009167; n = 60<br>
            <span class="math">x = 225000 · 0.009167 / [1 − (1.009167)⁻⁶⁰]</span><br>
            <span class="math">x ≈ 225000 · 0.009167 / 0.4225 ≈ R4 882 per month</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Outstanding balance</div>
            <p>
              The outstanding balance after k payments is the present value of the <em>remaining</em> (n − k) payments:<br>
              <span class="math">Balance_k = x · [1 − (1+i)⁻⁽ⁿ⁻ᵏ⁾] / i</span><br><br>
              Or: calculate using the future value method — carry the original loan forward and subtract the future value of payments made.
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Home loan R1 000 000 at 8.5% p.a. compounded monthly over 20 years. Monthly payment formula:", options: ["x = 1000000·(0.085/12)/[1−(1+0.085/12)⁻²⁴⁰]", "x = 1000000·0.085/20", "x = 1000000/240", "x = 1000000·0.085"], answer: 0, topic: "Present value annuities & loan repayments" },
        { type: "mc", text: "The present value formula is used to:", options: ["Find how much to save", "Find the loan amount that corresponds to given repayments", "Find the future value of savings", "Find compound interest"], answer: 1, topic: "Present value annuities & loan repayments" },
        { type: "mc", text: "After 5 years of a 20-year loan with monthly payments x, the outstanding balance uses:", options: ["n = 20 and k = 60", "n−k = 180 remaining payments", "x and the original principal only", "The future value formula"], answer: 1, topic: "Present value annuities & loan repayments" },
        { type: "input", text: "P = 10000, i = 0.01 per month, n = 12. Find x (monthly payment) to nearest rand. Use x = Pi/[1−(1.01)⁻¹²]. Answer ≈", answer: "889", topic: "Present value annuities & loan repayments" },
        { type: "mc", text: "Total interest paid on a loan = ", options: ["Principal × rate × time", "Total repayments − original loan amount", "Monthly payment × n", "Future value − present value"], answer: 1, topic: "Present value annuities & loan repayments" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 3 Workbook — Finance",
    questions: [
      { number: 1, text: "Thabo saves R800 per month in an account earning 7.2% p.a. compounded monthly.", parts: [
        { label: "a", text: "How much will he have after 10 years?", marks: 3 },
        { label: "b", text: "How much has he contributed in total?", marks: 1 },
        { label: "c", text: "How much interest did he earn?", marks: 1 }
      ]},
      { number: 2, text: "A house costs R1 800 000. A 20% deposit is paid and the balance is financed over 25 years at 10.5% p.a. compounded monthly.", parts: [
        { label: "a", text: "Find the loan amount.", marks: 1 },
        { label: "b", text: "Find the monthly repayment.", marks: 3 },
        { label: "c", text: "Find the outstanding balance after 5 years (60 payments).", marks: 4 },
        { label: "d", text: "Find the total interest paid over the full 25 years.", marks: 2 }
      ]},
      { number: 3, text: "A company needs to replace machinery costing R500 000 in 6 years. They set up a sinking fund paying equal annual amounts at 8% p.a. compounded annually.", parts: [
        { label: "a", text: "Find the annual payment required.", marks: 3 },
        { label: "b", text: "How much less would be needed if the interest rate were 10%?", marks: 3 }
      ]}
    ],
    answers: {
      1: { a: "F=800·[(1.006)¹²⁰−1]/0.006≈800·173.08≈R138 464", b: "800×120=R96 000", c: "138464−96000=R42 464" },
      2: { a: "Loan=0.8×1800000=R1 440 000", b: "i=0.105/12=0.00875; n=300; x=1440000×0.00875/[1−(1.00875)⁻³⁰⁰]≈R13 786/month", c: "Balance=13786·[1−(1.00875)⁻²⁴⁰]/0.00875≈R1 345 000", d: "Total paid=13786×300=R4 135 800; Interest=4135800−1440000≈R2 695 800" },
      3: { a: "x=500000×0.08/[(1.08)⁶−1]=500000×0.08/0.5869≈R68 138", b: "x at 10%: 500000×0.10/[(1.10)⁶−1]=500000×0.10/0.7716≈R64 802; saves R68138−R64802=R3 336" }
    }
  }
});
