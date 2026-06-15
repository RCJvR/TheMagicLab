// Math Magician — Grade 12, Chapter 1
// Sequences and Series

MathMagician.registerChapter(1, {
  topics: [
    {
      id: 0,
      chapter: 1,
      name: "Arithmetic & geometric sequences",
      fullName: "Arithmetic sequences, geometric sequences, and their general terms",
      lesson: {
        heading: "Arithmetic and geometric sequences",
        sub: "Chapter 1 · Topic 1",
        body: `
          <p>Grade 12 sequences revisit arithmetic (linear) sequences from Grade 10, introduce <strong>geometric sequences</strong>, and culminate in <strong>series</strong> (sums of sequences).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Arithmetic sequence</div>
            <p>
              Constant difference <span class="math">d</span> between terms.<br>
              General term: <span class="math">Tₙ = a + (n − 1)d</span><br>
              where a = first term, d = common difference.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Geometric sequence</div>
            <p>
              Constant <strong>ratio</strong> <span class="math">r</span> between consecutive terms (<span class="math">r = Tₙ₊₁/Tₙ</span>).<br>
              General term: <span class="math">Tₙ = a · rⁿ⁻¹</span><br>
              where a = first term, r = common ratio (r ≠ 0, r ≠ 1).<br><br>
              If r > 1: geometric growth &nbsp;|&nbsp; If 0 &lt; r &lt; 1: geometric decay &nbsp;|&nbsp; If r &lt; 0: alternating signs
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Examples</div>
            <p><strong>Arithmetic:</strong> 3, 7, 11, 15, … → a = 3, d = 4; T₁₀ = 3 + 9(4) = 39</p>
            <p><strong>Geometric:</strong> 2, 6, 18, 54, … → a = 2, r = 3; T₇ = 2 · 3⁶ = 1458</p>
            <p><strong>Geometric decay:</strong> 80, 40, 20, 10, … → a = 80, r = ½; T₆ = 80 · (½)⁵ = 2.5</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Finding r or d from two terms</div>
            <p>
              Arithmetic: <span class="math">d = (Tₙ − Tₘ)/(n − m)</span><br>
              Geometric: <span class="math">rⁿ⁻ᵐ = Tₙ/Tₘ → r = (Tₙ/Tₘ)^(1/(n−m))</span>
            </p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Geometric sequence: 4, 12, 36, … Find T₅.", options: ["324", "108", "972", "432"], answer: 0, topic: "Arithmetic & geometric sequences" },
        { type: "input", text: "Arithmetic sequence: T₃ = 11 and T₇ = 27. Find d.", answer: "4", topic: "Arithmetic & geometric sequences" },
        { type: "mc", text: "A geometric sequence has T₂ = 6 and T₅ = 48. Find r.", options: ["2", "3", "4", "8"], answer: 0, topic: "Arithmetic & geometric sequences" },
        { type: "mc", text: "Which sequence is geometric? ", options: ["1, 3, 5, 7, …", "2, 6, 18, 54, …", "1, 4, 9, 16, …", "3, 6, 9, 12, …"], answer: 1, topic: "Arithmetic & geometric sequences" },
        { type: "input", text: "Geometric: a = 5, r = −2. Find T₄.", answer: "-40", altAnswers: ["−40"], topic: "Arithmetic & geometric sequences" }
      ]
    },
    {
      id: 1,
      chapter: 1,
      name: "Series — arithmetic, geometric & infinite",
      fullName: "Arithmetic series, geometric series, sigma notation, and infinite geometric series",
      lesson: {
        heading: "Series: sums of sequences",
        sub: "Chapter 1 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Sigma notation</div>
            <p>
              <span class="math">Σᵢ₌₁ⁿ Tᵢ</span> means "sum the sequence from term 1 to term n".<br>
              Example: <span class="math">Σᵢ₌₁⁵ (2i + 1) = 3 + 5 + 7 + 9 + 11 = 35</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Arithmetic series sum</div>
            <p>
              <span class="math">Sₙ = n/2 · (2a + (n−1)d)</span> &nbsp; or equivalently &nbsp; <span class="math">Sₙ = n/2 · (a + l)</span><br>
              where l = last term = Tₙ
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Geometric series sum</div>
            <p>
              <span class="math">Sₙ = a(rⁿ − 1)/(r − 1)</span> if r ≠ 1 &nbsp; (use r > 1 form)<br>
              or <span class="math">Sₙ = a(1 − rⁿ)/(1 − r)</span> (use 0 &lt; r &lt; 1 form)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Infinite geometric series (|r| &lt; 1)</div>
            <p>
              When |r| &lt; 1, the series converges:<br>
              <span class="math">S∞ = a/(1 − r)</span><br>
              If |r| ≥ 1, the series diverges (no finite sum).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Examples</div>
            <p><strong>Arithmetic S₁₀:</strong> a = 3, d = 4 → S₁₀ = 10/2 · (6 + 36) = 5 · 42 = 210</p>
            <p><strong>Geometric S₆:</strong> a = 2, r = 3 → S₆ = 2(3⁶−1)/(3−1) = 2(728)/2 = 728</p>
            <p><strong>Infinite:</strong> a = 8, r = ½ → S∞ = 8/(1 − ½) = 16</p>
          </div>
        `
      },
      questions: [
        { type: "mc", text: "Arithmetic series: a = 5, d = 3, n = 10. Find S₁₀.", options: ["185", "170", "200", "150"], answer: 0, topic: "Series — arithmetic, geometric & infinite" },
        { type: "input", text: "Geometric series: a = 3, r = 2, n = 5. Find S₅.", answer: "93", topic: "Series — arithmetic, geometric & infinite" },
        { type: "mc", text: "Infinite geometric series: a = 12, r = ⅓. Find S∞.", options: ["18", "24", "36", "6"], answer: 0, topic: "Series — arithmetic, geometric & infinite" },
        { type: "mc", text: "Σᵢ₌₁⁴ (3i) = ", options: ["30", "24", "36", "42"], answer: 0, topic: "Series — arithmetic, geometric & infinite" },
        { type: "mc", text: "For which value of r does an infinite geometric series converge?", options: ["r = 1", "r = −2", "r = 0.8", "r = −1.1"], answer: 2, topic: "Series — arithmetic, geometric & infinite" }
      ]
    }
  ],
  workbook: {
    title: "Chapter 1 Workbook — Sequences and Series",
    questions: [
      { number: 1, text: "An arithmetic sequence has T₄ = 19 and T₉ = 44.", parts: [
        { label: "a", text: "Find d and a.", marks: 4 },
        { label: "b", text: "Find T₂₀.", marks: 2 },
        { label: "c", text: "Find S₂₀.", marks: 3 }
      ]},
      { number: 2, text: "A geometric sequence has T₂ = 6 and T₄ = 54.", parts: [
        { label: "a", text: "Find r and a.", marks: 4 },
        { label: "b", text: "Find S₆.", marks: 3 },
        { label: "c", text: "Does the infinite series converge? Why?", marks: 2 }
      ]},
      { number: 3, text: "Evaluate: Σₖ₌₁¹⁰ (4k − 1)", parts: [
        { label: "a", text: "Write out the first 3 terms and identify the type of series.", marks: 2 },
        { label: "b", text: "Evaluate the sum.", marks: 3 }
      ]},
      { number: 4, text: "A ball is dropped from 10 m. Each bounce reaches 60% of the previous height.", parts: [
        { label: "a", text: "Write the sequence of bounce heights.", marks: 2 },
        { label: "b", text: "Find the total distance travelled (including all up and down bounces).", marks: 4 }
      ]}
    ],
    answers: {
      1: { a: "d=(44−19)/5=5; a=19−3(5)=4", b: "T₂₀=4+19(5)=99", c: "S₂₀=20/2·(8+95)=10·103=1030" },
      2: { a: "r²=54/6=9→r=3; a=6/3=2", b: "S₆=2(3⁶−1)/2=728", c: "r=3>1 → diverges, no infinite sum" },
      3: { a: "3, 7, 11, … arithmetic series, a=3, d=4", b: "S₁₀=10/2·(6+36)=210" },
      4: { a: "6, 3.6, 2.16, … geometric r=0.6", b: "Down: 10+10(0.6)+10(0.6)²+…=10/(1−0.6)=25m; Up: same starting from 6m=6/(1−0.6)=15m; Total=10+2(15)=40m" }
    }
  }
});
