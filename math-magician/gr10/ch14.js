// Math Magician — Grade 10, Chapter 14
// Probability

MathMagician.registerChapter(14, {
  topics: [
    {
      id: 0,
      chapter: 14,
      name: "Probability basics & Venn diagrams",
      fullName: "Theoretical probability, relative frequency, and Venn diagrams",
      lesson: {
        heading: "Probability basics and Venn diagrams",
        sub: "Chapter 14 · Topic 1",
        body: `
          <p><strong>Probability</strong> is the likelihood of an event occurring, expressed as a value between 0 and 1 (or 0% and 100%).</p>

          <div class="def-box">
            <div class="def-box-title">📖 Theoretical probability</div>
            <p>
              <span class="math">P(E) = n(E) / n(S)</span><br>
              where n(E) = number of favourable outcomes, n(S) = total number of equally likely outcomes (sample space).<br><br>
              Always: <span class="math">0 ≤ P(E) ≤ 1</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Relative frequency (experimental probability)</div>
            <p>
              <span class="math">P(E) ≈ frequency of E / total trials</span><br>
              As the number of trials increases, relative frequency approaches theoretical probability.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Venn diagrams</div>
            <p>
              Two events A and B in sample space S:<br>
              <span class="math">A ∩ B</span> = A AND B (intersection — overlap)<br>
              <span class="math">A ∪ B</span> = A OR B (union — total in either)<br>
              <span class="math">A'</span> = NOT A (complement)<br><br>
              <strong>Addition rule:</strong> <span class="math">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Venn diagram</div>
            <p>In a class of 30, 18 play soccer (S), 12 play tennis (T), and 5 play both.<br>
            n(S only) = 13; n(T only) = 7; n(both) = 5; n(neither) = 5<br>
            P(S ∪ T) = (13+7+5)/30 = 25/30 = 5/6</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "A bag has 4 red and 6 blue marbles. P(red) =",
          options: ["4/6", "2/5", "4/10", "Both B and C"],
          answer: 3,
          topic: "Probability basics & Venn diagrams"
        },
        {
          type: "input",
          text: "P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Find P(A∪B).",
          answer: "0.7",
          altAnswers: ["0,7"],
          topic: "Probability basics & Venn diagrams"
        },
        {
          type: "mc",
          text: "If P(A) = 0.3, then P(A') =",
          options: ["0.3", "0.7", "0.03", "1.3"],
          answer: 1,
          topic: "Probability basics & Venn diagrams"
        },
        {
          type: "mc",
          text: "A fair die is rolled. P(even OR greater than 4) =",
          options: ["4/6", "5/6", "3/6", "2/6"],
          answer: 0,
          topic: "Probability basics & Venn diagrams"
        },
        {
          type: "input",
          text: "In a group, P(A) = 0.6, P(B) = 0.4, P(A∪B) = 0.8. Find P(A∩B).",
          answer: "0.2",
          altAnswers: ["0,2"],
          topic: "Probability basics & Venn diagrams"
        }
      ]
    },
    {
      id: 1,
      chapter: 14,
      name: "Mutually exclusive & complementary events",
      fullName: "Mutually exclusive events, complementary events, and probability identities",
      lesson: {
        heading: "Mutually exclusive and complementary events",
        sub: "Chapter 14 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Mutually exclusive events</div>
            <p>
              Events A and B are <strong>mutually exclusive</strong> if they <em>cannot both occur</em> at the same time.<br>
              <span class="math">A ∩ B = ∅</span>, so <span class="math">P(A ∩ B) = 0</span><br>
              Therefore: <span class="math">P(A ∪ B) = P(A) + P(B)</span>
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Complementary events</div>
            <p>
              The complement of A (written A') contains all outcomes NOT in A.<br>
              <span class="math">P(A) + P(A') = 1</span><br>
              <span class="math">P(A') = 1 − P(A)</span><br><br>
              This is very useful for "at least one" probability problems: <span class="math">P(at least one) = 1 − P(none)</span>
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: At least one</div>
            <p>Two dice are rolled. P(at least one six)?<br>
            P(no six on one die) = 5/6<br>
            P(no sixes on either) = (5/6)² = 25/36<br>
            P(at least one six) = 1 − 25/36 = 11/36</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Probability identities</div>
            <p>
              <span class="math">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</span> (general addition rule)<br>
              If mutually exclusive: <span class="math">P(A ∪ B) = P(A) + P(B)</span><br>
              <span class="math">P(A') = 1 − P(A)</span>
            </p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Events A and B are mutually exclusive. P(A) = 0.3, P(B) = 0.4. P(A∪B) =",
          options: ["0.12", "0.7", "1.0", "0.58"],
          answer: 1,
          topic: "Mutually exclusive & complementary events"
        },
        {
          type: "mc",
          text: "If P(A∩B) = 0, the events are:",
          options: ["Complementary", "Mutually exclusive", "Equally likely", "Independent"],
          answer: 1,
          topic: "Mutually exclusive & complementary events"
        },
        {
          type: "input",
          text: "P(event) = 0.35. Find P(complement).",
          answer: "0.65",
          altAnswers: ["0,65"],
          topic: "Mutually exclusive & complementary events"
        },
        {
          type: "mc",
          text: "Three coins are tossed. P(at least one head) =",
          options: ["½", "⅞", "¾", "⅜"],
          answer: 1,
          topic: "Mutually exclusive & complementary events"
        },
        {
          type: "mc",
          text: "Which pair of events is mutually exclusive?",
          options: ["Rolling a 3 and rolling an odd number", "Drawing a red card and drawing a king", "Rolling an even number and rolling a 4", "Getting heads and getting tails on one coin flip"],
          answer: 3,
          topic: "Mutually exclusive & complementary events"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 14 Workbook — Probability",
    questions: [
      {
        number: 1,
        text: "A survey of 50 Grade 10 learners asked about sports. 28 play soccer (S), 20 play cricket (C), and 8 play both.",
        parts: [
          { label: "a", text: "Draw a Venn diagram and fill in all regions.", marks: 3 },
          { label: "b", text: "How many play neither sport?", marks: 2 },
          { label: "c", text: "Find P(C only).", marks: 2 },
          { label: "d", text: "Find P(S ∪ C).", marks: 2 },
          { label: "e", text: "Are S and C mutually exclusive? Explain.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "A card is drawn from a standard pack of 52 cards.",
        parts: [
          { label: "a", text: "Find P(heart).", marks: 1 },
          { label: "b", text: "Find P(face card: J, Q, or K).", marks: 2 },
          { label: "c", text: "Find P(heart OR face card).", marks: 3 },
          { label: "d", text: "Find P(not a heart).", marks: 1 }
        ]
      },
      {
        number: 3,
        text: "The probability that it rains on any day is 0.35. For two independent days:",
        parts: [
          { label: "a", text: "Find P(rain on both days).", marks: 2 },
          { label: "b", text: "Find P(at least one day with rain).", marks: 3 }
        ]
      }
    ],
    answers: {
      1: {
        a: "S only: 20; both: 8; C only: 12; neither: 10",
        b: "50−(20+8+12) = 10",
        c: "12/50 = 6/25",
        d: "40/50 = 4/5",
        e: "No — 8 learners play both, so events are not mutually exclusive"
      },
      2: {
        a: "13/52 = 1/4",
        b: "12/52 = 3/13",
        c: "P(H∪F)=P(H)+P(F)−P(H∩F)=13/52+12/52−3/52=22/52=11/26",
        d: "3/4"
      },
      3: {
        a: "0.35×0.35=0.1225",
        b: "1−P(no rain)²=1−(0.65)²=1−0.4225=0.5775"
      }
    }
  }
});
