// Math Magician — Grade 11, Chapter 10
// Probability

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 0,
      chapter: 10,
      name: "Independent & dependent events",
      fullName: "Independent events, dependent events, and the product rule",
      lesson: {
        heading: "Independent and dependent events",
        sub: "Chapter 10 · Topic 1",
        body: `
          <p>Grade 11 probability introduces the formal definition of independent events and probability trees for sequential events.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Independent events</div>
            <p>
              Events A and B are <strong>independent</strong> if the occurrence of one does not affect the probability of the other.<br>
              Test: <span class="math">P(A ∩ B) = P(A) × P(B)</span><br><br>
              For independent events: <span class="math">P(A and B) = P(A) × P(B)</span><br>
              Example: Coin flip AND die roll are independent.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Dependent events (conditional probability)</div>
            <p>
              Events are <strong>dependent</strong> if the occurrence of one affects the other.<br>
              <span class="math">P(A and B) = P(A) × P(B|A)</span><br>
              where P(B|A) = "probability of B given A has occurred"<br><br>
              Example: Drawing without replacement.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Tree diagram (without replacement)</div>
            <p>Bag: 3 red, 2 blue. Draw 2 without replacement.<br>
            P(RR) = 3/5 × 2/4 = 6/20 = 3/10<br>
            P(RB) = 3/5 × 2/4 = 6/20 = 3/10<br>
            P(BR) = 2/5 × 3/4 = 6/20 = 3/10<br>
            P(BB) = 2/5 × 1/4 = 2/20 = 1/10<br>
            Check: sum = 1 ✓</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "P(A) = 0.4, P(B) = 0.3, P(A∩B) = 0.12. Are A and B independent?",
          options: ["Yes — P(A)×P(B)=0.12=P(A∩B)", "No — P(A∩B) should be 0.7", "Yes — they are mutually exclusive", "No — 0.12 ≠ 0"],
          answer: 0,
          topic: "Independent & dependent events"
        },
        {
          type: "mc",
          text: "Bag: 4 green, 6 red. Two drawn without replacement. P(both green) =",
          options: ["4/10 × 3/9", "4/10 × 4/10", "4/10 × 3/10", "3/10 × 2/9"],
          answer: 0,
          topic: "Independent & dependent events"
        },
        {
          type: "input",
          text: "P(A) = 0.5, P(B) = 0.6, and A and B are independent. Find P(A∩B).",
          answer: "0.3",
          altAnswers: ["0,3"],
          topic: "Independent & dependent events"
        },
        {
          type: "mc",
          text: "A coin is tossed and a card is drawn. These events are:",
          options: ["Dependent", "Mutually exclusive", "Independent", "Complementary"],
          answer: 2,
          topic: "Independent & dependent events"
        },
        {
          type: "mc",
          text: "Drawing two cards WITHOUT replacement makes the events:",
          options: ["Independent", "Dependent", "Mutually exclusive", "Complementary"],
          answer: 1,
          topic: "Independent & dependent events"
        }
      ]
    },
    {
      id: 1,
      chapter: 10,
      name: "Venn diagrams, tree diagrams & contingency tables",
      fullName: "Advanced Venn diagrams, tree diagrams, and contingency tables",
      lesson: {
        heading: "Tree diagrams and contingency tables",
        sub: "Chapter 10 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Tree diagrams</div>
            <p>
              Used for sequential (multi-stage) experiments.<br>
              <strong>Rules:</strong><br>
              • Probabilities on each branch must sum to 1<br>
              • Multiply along branches for joint probabilities<br>
              • Add across rows for "or" outcomes<br>
              • All final outcomes must sum to 1
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Contingency tables (two-way tables)</div>
            <p>
              Display frequencies or probabilities for two variables simultaneously.<br><br>
              | | B | B' | Total |<br>
              | A | P(A∩B) | P(A∩B') | P(A) |<br>
              | A' | P(A'∩B) | P(A'∩B') | P(A') |<br>
              | Total | P(B) | P(B') | 1 |<br><br>
              Test independence: if P(A∩B) = P(A) × P(B) for all cells.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Contingency table</div>
            <p>150 students: 80 play sport, 60 play music, 30 do both.<br>
            | | Music | No Music | Total |<br>
            | Sport | 30 | 50 | 80 |<br>
            | No Sport | 30 | 40 | 70 |<br>
            | Total | 60 | 90 | 150 |<br><br>
            P(Sport) = 80/150; P(Music) = 60/150<br>
            P(Sport)×P(Music) = 0.213 ≠ P(Sport∩Music) = 30/150 = 0.2 → NOT independent</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "In a tree diagram, the probabilities on all branches from any node must sum to:",
          options: ["0", "0.5", "1", "100"],
          answer: 2,
          topic: "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          type: "mc",
          text: "A contingency table shows P(A∩B) = 0.15, P(A) = 0.5, P(B) = 0.3. Are A and B independent?",
          options: ["Yes, since 0.5×0.3=0.15", "No, since 0.15≠0.3−0.5", "No, since P(A)+P(B)≠1", "Cannot determine"],
          answer: 0,
          topic: "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          type: "input",
          text: "200 learners surveyed. 120 walk to school, 90 bring lunch, 50 do both. How many do neither?",
          answer: "40",
          topic: "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          type: "mc",
          text: "A bag has 5 red and 3 blue balls. Two are drawn with replacement. P(one red, one blue) =",
          options: ["15/32", "15/64", "30/64", "15/56"],
          answer: 2,
          topic: "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          type: "mc",
          text: "To find P(at least one) using a tree diagram, the easiest method is:",
          options: ["Add all branches with at least one", "1 − P(none at all)", "Multiply all probabilities", "Use the addition rule once"],
          answer: 1,
          topic: "Venn diagrams, tree diagrams & contingency tables"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 10 Workbook — Probability",
    questions: [
      {
        number: 1,
        text: "A bag contains 4 white and 3 black balls. Two balls are drawn without replacement.",
        parts: [
          { label: "a", text: "Draw a tree diagram showing all outcomes and their probabilities.", marks: 4 },
          { label: "b", text: "Find P(both white).", marks: 2 },
          { label: "c", text: "Find P(at least one black).", marks: 3 },
          { label: "d", text: "Find P(one of each colour).", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "A survey of 200 Grade 11 learners asked about social media use and academic performance:",
        parts: [
          { label: "", text: "| | Good results | Poor results | Total |\n| High SM use | 45 | 55 | 100 |\n| Low SM use | 70 | 30 | 100 |\n| Total | 115 | 85 | 200 |", marks: 0 },
          { label: "a", text: "Find P(high SM use AND good results).", marks: 1 },
          { label: "b", text: "Find P(good results).", marks: 1 },
          { label: "c", text: "Find P(high SM use) × P(good results).", marks: 2 },
          { label: "d", text: "Are social media use and academic results independent? Justify.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Branch 1: W(4/7)→W(3/6), B(3/6); Branch 2: B(3/7)→W(4/6), B(2/6)",
        b: "P(WW)=4/7×3/6=12/42=2/7",
        c: "P(at least 1 black)=1−P(WW)=1−2/7=5/7",
        d: "P(WB)+P(BW)=4/7×3/6+3/7×4/6=12/42+12/42=24/42=4/7"
      },
      2: {
        a: "45/200=0.225",
        b: "115/200=0.575",
        c: "(100/200)×(115/200)=0.5×0.575=0.2875",
        d: "0.225≠0.2875 → NOT independent (high SM use correlates with poorer results)"
      }
    }
  }
});
