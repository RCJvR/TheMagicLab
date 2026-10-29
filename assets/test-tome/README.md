# Test Tome quiz files

`manifest.json` lists the quizzes; each quiz is one JSON file in this folder.
Adding a file plus a manifest entry is all it takes.

```json
{
  "id": "gr8-example", "title": "Grade 8 Example Test", "grade": 8,
  "subject": "Natural Sciences", "minutes": 45,
  "sections": [
    { "title": "Multiple choice", "intro": "Choose the best answer.",
      "questions": [ ...question objects... ] }
  ]
}
```

Every question can carry `"skill": "knowledge"` (the default) or
`"application"`, and an `"explain"` shown in the review after the test.

| type | fields | marks |
|---|---|---|
| `mcq` | `q`, `options` [..], `answer` (0-based index); options are shuffled per attempt unless `"keepOrder": true` | `marks`, default 1 |
| `tf` | `q` (a statement), `answer` true/false | `marks`, default 1 |
| `match` | `q`, `pairs` [[A, B], ..], optional `extra` [B distractors] | 1 per pair |
| `order` | `q`, `steps` [in the correct order] | 1 per step in its right place |
| `pairs` | `q`, `pairs` [[term, partner], ..] (cards, find the pairs) | 1 per pair |
| `fill` | `q`, `fill` (code with `[[]]` for each blank), `blanks` [answer, or [accepted, …]] | 1 per blank; exact match, spaces ignored, case counts |
| `scenario` | `scenario` (text), `questions` [any of the types above] | the sum of its parts |

Scenario sub-questions count as application unless they say otherwise.
A test file's `"rev"` number goes up when its questions change; an attempt saved
for an older rev starts again instead of mixing old answers with new questions.

Blueprint (rev 2, 50 marks): Java 10 (loops weighted most), HTML & CSS 8 (incl.
the three comment styles), Excel 8 (formulas + charts), computational thinking 8
(pillars + IPO), FreeCAD 8 (DOF; fully/under/over constrained), TinkerCAD 8
(Ohm's law resistor for an LED with a 2 V drop; digital vs analog, PWM in Gr 9).
`match`, `order` and `pairs` may set `marks` to scale their total.
## Afrikaans

Every text field can have an Afrikaans twin with `Af` on the end, in the same
order as the English: `titleAf`, `subjectAf`, `introAf`, `qAf`, `optionsAf`,
`pairsAf`, `extraAf`, `stepsAf`, `scenarioAf`, `explainAf` (and `titleAf` /
`subjectAf` in manifest.json). The EN/AF toggle swaps them in; a field without
a twin stays English. Code, formulas and tags stay as they are. Use a decimal
comma in Afrikaans text (0,03 A), but keep the point inside code (1.65).

A question or a scenario may add `"code"`: a block of program code shown
exactly as written (keep the indentation; use \n for new lines).

## Versions

Entries in manifest.json that share a `"set"` are versions of one paper, each
with a `"version"` letter (A, B, C, D). The list shows the set once; the start
screen lets the learner pick a version, and the results suggest the next one.
Share links point to the set's first version.

## Topics and class results

Every top-level question has a `"topic"`: html, excel, ct, java, freecad or
tinkercad (scenario sub-questions inherit it). The teacher's Class results
view groups marks by topic. Results reach a teacher through a class code; see
supabase-test-tome-results.sql.

## Open tests (no sign-in)

`window.TT_OPEN` at the top of `test-tome.html` lists the tests that work
without signing in, through their own link (`/test-tome?quiz=<id>`). The list
of tests and every other test stay behind the login. The Share button on a
test shows its link as a QR code for a projector.

These JSON files can be opened by anyone who knows their address, gated or
not, so write practice questions here, never a copy of a real exam paper.
