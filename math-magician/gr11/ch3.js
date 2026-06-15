// Math Magician — Grade 11, Chapter 3
// Number Patterns — Quadratic Sequences

MathMagician.registerChapter(3, {
  topics: [
    {
      id: 0,
      chapter: 3,
      name: "Quadratic sequences",
      fullName: "Identifying and finding the general term of quadratic sequences",
      lesson: {
        heading: "Quadratic sequences",
        sub: "Chapter 3 · Topic 1",
        body: `
          <p>In Grade 10 we studied linear sequences (constant first difference). Grade 11 introduces <strong>quadratic sequences</strong>, where the <em>second</em> difference is constant.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Identifying a quadratic sequence</div>
            <p>
              A sequence is quadratic if the <strong>first differences</strong> are not constant but the <strong>second differences</strong> are constant and non-zero.<br><br>
              Example: 1, 4, 9, 16, 25, …<br>
              1st differences: 3, 5, 7, 9, … (not constant)<br>
              2nd differences: 2, 2, 2, … (constant ✓) → quadratic
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 General term of a quadratic sequence</div>
            <p>
              <span class="math">Tₙ = an² + bn + c</span><br><br>
              To find a, b, c:<br>
              • <span class="math">2a</span> = second difference<br>
              • Use <span class="math">T₁, T₂, T₃</span> to set up and solve for b and c
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Find Tₙ for 3, 8, 15, 24, …</div>
            <p>1st differences: 5, 7, 9, … &nbsp; 2nd differences: 2, 2<br>
            <span class="math">2a = 2 → a = 1</span><br>
            <span class="math">T₁ = a + b + c = 3 → 1 + b + c = 3 → b + c = 2</span><br>
            <span class="math">T₂ = 4a + 2b + c = 8 → 4 + 2b + c = 8 → 2b + c = 4</span><br>
            Subtract: <span class="math">b = 2, c = 0</span><br>
            <span class="math">Tₙ = n² + 2n</span><br>
            Check: T₃ = 9 + 6 = 15 ✓</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Sequence: 2, 6, 12, 20, 30, … What is the second difference?",
          options: ["4", "2", "8", "6"],
          answer: 1,
          topic: "Quadratic sequences"
        },
        {
          type: "mc",
          text: "For Tₙ = an² + bn + c, if the second difference is 6, then a =",
          options: ["6", "12", "3", "2"],
          answer: 2,
          topic: "Quadratic sequences"
        },
        {
          type: "input",
          text: "Tₙ = n² + 3n − 1. Find T₅.",
          answer: "39",
          topic: "Quadratic sequences"
        },
        {
          type: "mc",
          text: "Which sequence is quadratic?",
          options: ["5, 8, 11, 14, …", "1, 3, 7, 13, 21, …", "2, 4, 8, 16, …", "3, 6, 9, 12, …"],
          answer: 1,
          topic: "Quadratic sequences"
        },
        {
          type: "mc",
          text: "Tₙ = 2n² − n + 1. What is T₁?",
          options: ["2", "4", "3", "1"],
          answer: 0,
          topic: "Quadratic sequences"
        }
      ]
    },
    {
      id: 1,
      chapter: 3,
      name: "Working with quadratic sequences",
      fullName: "Finding terms, term numbers, and using quadratic sequences in context",
      lesson: {
        heading: "Working with quadratic sequences",
        sub: "Chapter 3 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Finding which term equals a given value</div>
            <p>
              Set <span class="math">Tₙ = given value</span> and solve the resulting quadratic equation for n.<br>
              Remember: n must be a <strong>positive integer</strong>. Reject non-integer or negative solutions.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>For <span class="math">Tₙ = n² + 2n</span>, which term equals 80?<br>
            <span class="math">n² + 2n = 80 → n² + 2n − 80 = 0 → (n+10)(n−8) = 0</span><br>
            <span class="math">n = 8</span> (reject n = −10)<br>
            → T₈ = 80 ✓</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Mixed sequences</div>
            <p>
              Sometimes you need to identify whether a sequence is linear, quadratic, or neither:<br>
              • Constant 1st difference → linear<br>
              • Constant 2nd difference (non-zero) → quadratic<br>
              • Constant ratio between terms → geometric (Grade 12)<br>
              • None of the above → other (exponential, cubic, etc.)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Shortcut: a from second difference</div>
            <p>
              If second difference = d₂, then <span class="math">a = d₂/2</span>.<br>
              The first difference between T₁ and T₂ = <span class="math">3a + b</span>.<br>
              And <span class="math">T₁ = a + b + c</span>.<br>
              Use these three facts to find a, b, c systematically.
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "input",
          text: "For Tₙ = n² − n + 3, which term equals 45?",
          answer: "7",
          topic: "Working with quadratic sequences"
        },
        {
          type: "mc",
          text: "Sequence: 4, 7, 12, 19, 28, … What is Tₙ?",
          options: ["n² + 3", "n² + 2n + 1", "n² − n + 4", "2n² + 2"],
          answer: 0,
          topic: "Working with quadratic sequences"
        },
        {
          type: "mc",
          text: "For Tₙ = 2n² + 3n − 1, the second difference is:",
          options: ["3", "4", "2", "6"],
          answer: 1,
          topic: "Working with quadratic sequences"
        },
        {
          type: "mc",
          text: "A quadratic sequence has T₁ = 3, T₂ = 7, T₃ = 13. Find T₄.",
          options: ["19", "20", "21", "22"],
          answer: 2,
          topic: "Working with quadratic sequences"
        },
        {
          type: "input",
          text: "Tₙ = n² + 4n. Find the value of n for which Tₙ = 96.",
          answer: "8",
          topic: "Working with quadratic sequences"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 3 Workbook — Number Patterns",
    questions: [
      {
        number: 1,
        text: "For each sequence, determine whether it is linear, quadratic, or neither, and find Tₙ where possible:",
        parts: [
          { label: "a", text: "5, 9, 13, 17, …", marks: 3 },
          { label: "b", text: "2, 5, 10, 17, 26, …", marks: 4 },
          { label: "c", text: "1, 2, 4, 8, 16, …", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "A quadratic sequence has first term T₁ = 1, and first differences 4, 8, 12, 16, …",
        parts: [
          { label: "a", text: "Write the first five terms of the sequence.", marks: 2 },
          { label: "b", text: "Find the second difference.", marks: 1 },
          { label: "c", text: "Determine the general term Tₙ.", marks: 4 },
          { label: "d", text: "Find the value of n for which Tₙ = 121.", marks: 3 }
        ]
      },
      {
        number: 3,
        text: "The number of handshakes when n people each shake hands with every other person is given by H(n) = n(n−1)/2.",
        parts: [
          { label: "a", text: "Show this is a quadratic sequence by finding the first and second differences.", marks: 4 },
          { label: "b", text: "How many handshakes occur at a party of 12 people?", marks: 2 },
          { label: "c", text: "How many people are needed for exactly 45 handshakes?", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Linear; d=4; Tₙ=4n+1",
        b: "1st diffs: 3,5,7,9 → 2nd diffs: 2,2,2 → quadratic; Tₙ=n²+2n−1",
        c: "Neither — ratio is constant (×2), geometric sequence"
      },
      2: {
        a: "1, 5, 13, 25, 41",
        b: "Second difference = 4",
        c: "2a=4→a=2; T₁:2+b+c=1; 1st diff(T₁→T₂)=3a+b=4→6+b=4→b=−2; c=1; Tₙ=2n²−2n+1",
        d: "2n²−2n+1=121→2n²−2n−120=0→n²−n−60=0→(n−8)(n+7.5)... → n=8"
      },
      3: {
        a: "H(1)=0,H(2)=1,H(3)=3,H(4)=6,H(5)=10; 1st diffs:1,2,3,4; 2nd diffs:1,1,1 → constant ✓ quadratic",
        b: "H(12)=66",
        c: "n(n−1)/2=45→n²−n−90=0→(n−10)(n+9)=0→n=10"
      }
    }
  }
});
