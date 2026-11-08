# Question bank

`question-bank.html` (Build a practice paper) reads these files. `manifest.json` lists one
bank per topic, and each bank file holds that topic's `slots` and `items`.

Learners tick topics and choose how many questions of each kind they want. The builder
lays the paper out in sections in the order a school test uses: multiple choice, one word,
missing words, true/false, matching, steps in order, calculations, then written answers.
The paper opens in Test Tome, so it uses the same question types and marking (see
`assets/test-tome/README.md`).

## Items

Every item has an `id`, a `slot` and a `type`. A missing `type` means `mcq`. The other
fields are the same as a Test Tome question of that type, with `Af` twins:

| type | fields |
|---|---|
| `mcq` | `q`, `options`, `answer` (index), `explain` |
| `word` | `q` (the description), `answer` [accepted forms] |
| `blank` | `q`, `text` with `[[]]` per gap, `blanks` [[accepted, …], …] |
| `tf` | `q` (a statement), `answer` true/false, `explain` |
| `match` | `q`, `pairs` [[A, B], …] |
| `order` | `q`, `steps` in the right order |
| `num` | `q`, `answer` (number), `unit`, `marks` (default 1), optional `tol` |
| `written` | `q`, `points` [memo points] (1 mark each, or `marks`) |

Two kinds are also made from other items, so every topic offers them:

- **Calculations.** An `mcq` whose right answer is one number, with or without a unit (for
  example `340 m` or `25%`), can be asked as a typed answer. This is skipped when the question
  says "which / following / statement / correct / true / false", or when the item sets
  `"noNum": true`.
- **Matching.** Four or five `word` items that are not already in the paper become one
  "match each description with the term" question.

Bump a bank's `rev` when its items change.
