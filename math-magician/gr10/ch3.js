// Math Magician — Grade 10, Chapter 3
// Number Patterns

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 0,
      chapter: 3,
      name: "Linear sequences",
      fullName: "Describing and generalising linear (arithmetic) sequences",
      lesson: {
        heading: "Linear number patterns",
        sub: "Chapter 3 · Topic 1",
        body: `
          <p>A <strong>sequence</strong> is an ordered list of numbers. In Grade 10 we focus on <strong>linear sequences</strong>, where the difference between consecutive terms is constant.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Linear (arithmetic) sequence</div>
            <p>A sequence where each term increases or decreases by a fixed amount called the <strong>common difference (d)</strong>.<br><br>
            General term (nth term): <span class="math">Tₙ = a + (n − 1)d</span><br>
            where <span class="math">a</span> = first term, <span class="math">d</span> = common difference, <span class="math">n</span> = term number.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example 1: Find the nth term</div>
            <p>Sequence: 3, 7, 11, 15, …<br>
            <span class="math">a = 3</span>, <span class="math">d = 4</span><br>
            <span class="math">Tₙ = 3 + (n − 1)(4) = 3 + 4n − 4 = 4n − 1</span><br>
            Check: <span class="math">T₁ = 4(1) − 1 = 3 ✓</span> &nbsp; <span class="math">T₄ = 4(4) − 1 = 15 ✓</span></p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example 2: Find which term equals a value</div>
            <p>For <span class="math">Tₙ = 4n − 1</span>, which term equals 79?<br>
            <span class="math">4n − 1 = 79</span><br>
            <span class="math">4n = 80</span><br>
            <span class="math">n = 20</span> → It is the 20th term.</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding d from the pattern</div>
            <p>
              <span class="math">d = T₂ − T₁ = T₃ − T₂ = …</span><br>
              You can also find <span class="math">d</span> if given two non-consecutive terms:<br>
              If <span class="math">Tₘ</span> and <span class="math">Tₙ</span> are known: <span class="math">d = (Tₙ − Tₘ)/(n − m)</span>
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "The sequence 5, 9, 13, 17, … has nth term:",
          options: ["4n + 1", "4n − 1", "5n − 4", "n + 4"],
          answer: 0,
          topic: "Linear sequences"
        },
        {
          type: "input",
          text: "For Tₙ = 3n + 2, what is T₇?",
          answer: "23",
          topic: "Linear sequences"
        },
        {
          type: "mc",
          text: "Which term of 2, 5, 8, 11, … equals 98?",
          options: ["30th", "32nd", "33rd", "34th"],
          answer: 2,
          topic: "Linear sequences"
        },
        {
          type: "input",
          text: "A sequence has T₃ = 10 and T₇ = 22. Find d.",
          answer: "3",
          topic: "Linear sequences"
        },
        {
          type: "mc",
          text: "The 1st term of a linear sequence is 8 and d = −3. What is T₅?",
          options: ["−4", "−7", "20", "−4"],
          answer: 0,
          topic: "Linear sequences"
        }
      ]
    },
    {
      id: 1,
      chapter: 3,
      name: "Patterns in context",
      fullName: "Number patterns in tables, graphs, and real-world contexts",
      lesson: {
        heading: "Patterns in context — tables, diagrams, and graphs",
        sub: "Chapter 3 · Topic 2",
        body: `
          <p>Number patterns appear in matchstick puzzles, growth problems, cost tables, and many real-world settings. The key skill is identifying the pattern and writing a general rule.</p>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Matchstick pattern</div>
            <p>A pattern of squares is built with matchsticks:</p>
            <p>1 square → 4 sticks<br>
            2 squares → 7 sticks<br>
            3 squares → 10 sticks</p>
            <p>The differences are constant (d = 3), so it's linear.<br>
            <span class="math">Tₙ = 4 + (n−1)(3) = 3n + 1</span><br>
            Check: <span class="math">n=1</span>: 4 ✓ &nbsp; <span class="math">n=3</span>: 10 ✓</p>
            <p>How many sticks for 20 squares? <span class="math">T₂₀ = 3(20) + 1 = 61</span></p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Reading patterns from a table</div>
            <p>
              Given a table of values, check whether the differences are constant.<br>
              If yes → linear; find <span class="math">a</span> and <span class="math">d</span> to write <span class="math">Tₙ</span>.<br>
              <br>
              | n | 1 | 2 | 3 | 4 |<br>
              | T | 7 | 11 | 15 | 19 |<br>
              Differences: all 4 → <span class="math">d = 4, a = 7</span><br>
              <span class="math">Tₙ = 4n + 3</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Graphs of linear sequences</div>
            <p>
              When plotted as (n, Tₙ), a linear sequence gives <strong>discrete points</strong> that lie on a straight line.<br>
              The gradient of that line equals <span class="math">d</span>.<br>
              The y-intercept equals <span class="math">a − d</span> (the "zeroth term").
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A pattern of triangles uses matches: 1 triangle = 3, 2 = 5, 3 = 7. Formula for n triangles:",
          options: ["3n", "2n + 1", "n + 2", "2n + 3"],
          answer: 1,
          topic: "Patterns in context"
        },
        {
          type: "input",
          text: "A table shows n = 1: T = 5, n = 2: T = 8, n = 3: T = 11. Find T for n = 10.",
          answer: "32",
          topic: "Patterns in context"
        },
        {
          type: "mc",
          text: "For Tₙ = 5n − 2, the gradient when plotted on a graph is:",
          options: ["−2", "3", "5", "5n"],
          answer: 2,
          topic: "Patterns in context"
        },
        {
          type: "mc",
          text: "A linear sequence is plotted. Points lie on a line with gradient 4 and y-intercept 1. The nth term is:",
          options: ["4n + 1", "4n − 3", "n + 4", "4n + 5"],
          answer: 1,
          topic: "Patterns in context"
        },
        {
          type: "input",
          text: "Tₙ = an + b. Given T₂ = 9 and T₅ = 18. Find a.",
          answer: "3",
          topic: "Patterns in context"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 3 Workbook — Number Patterns",
    questions: [
      {
        number: 1,
        text: "For each sequence, find the common difference and the general term Tₙ:",
        parts: [
          { label: "a", text: "6, 10, 14, 18, …", marks: 3 },
          { label: "b", text: "20, 17, 14, 11, …", marks: 3 },
          { label: "c", text: "−5, −1, 3, 7, …", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "A linear sequence has T₃ = 14 and T₈ = 34.",
        parts: [
          { label: "a", text: "Find the common difference.", marks: 2 },
          { label: "b", text: "Find the first term.", marks: 2 },
          { label: "c", text: "Write the general term Tₙ.", marks: 2 },
          { label: "d", text: "Is 100 a term in this sequence? Show working.", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "A pattern of pentagons is built with matchsticks: 1 pentagon uses 5 sticks, and each new pentagon shares one side with the previous.",
        parts: [
          { label: "a", text: "Complete the table for n = 1, 2, 3, 4.", marks: 2 },
          { label: "b", text: "Find the formula for the number of sticks for n pentagons.", marks: 3 },
          { label: "c", text: "How many sticks are needed for 15 pentagons?", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "d=4; Tₙ = 4n + 2",
        b: "d=−3; Tₙ = −3n + 23",
        c: "d=4; Tₙ = 4n − 9"
      },
      2: {
        a: "d = (34−14)/(8−3) = 4",
        b: "T₁ = 14 − 2(4) = 6",
        c: "Tₙ = 4n + 2",
        d: "4n+2=100 → n=24.5 → not a whole number → 100 is NOT a term"
      },
      3: {
        a: "5, 9, 13, 17",
        b: "Tₙ = 4n + 1",
        c: "T₁₅ = 61 sticks"
      }
    }
  }
});
