---
name: gr4-math-chapter
description: Build, fix or extend a Grade 4 Math Magician chapter (math-magician/gr4, CAPS Intermediate Phase) from the bilingual generator in scripts/math-gr4. Use for "do Grade 4 maths Chapter N", changes to a Gr 4 maths lesson, sim, practice question, workbook or answer key.
---

# Grade 4 Math Magician chapter recipe

Everything below is settled. Do not re-explore the engine: read only what a step names.

## What a chapter is

- **Source:** two files per chapter, both bilingual (EN + AF in one place):
  - `scripts/math-gr4/gen_chN.js`: topics, lessons, questions, workbook.
  - `scripts/math-gr4/sims_chN.js`: one interactive sim per topic.
- **Output:** the generator writes `math-magician/gr4/chN.js`, `chN.af.js` and `chN.help.js`. Never edit those three by hand.
- **Shared helpers:** `scripts/math-gr4/lib.js` (62 lines). Chapter 1 predates it and has its own copies.
- **Page:** `math-magician/gr4/index.html` is the shell. Its `CHAPTER_MANIFEST` sits at about line 615. The `.g4-*` CSS lives at about line 511.
- **Topic ids:** `N01…N0k`, for example 701, 702, 703.

## CAPS source

- The Grade 4 CAPS text is in `caps-gr4.txt` next to this file (local only, not committed). Read only your chapter's lines:

  | Ch | Topic | Lines | Term |
  |---|---|---|---|
  | 7 | Perimeter, area, capacity and volume | 601–629 | T2 |
  | 8 | Financial maths | 652–665 | T3 |
  | 9 | Common fractions | 666–704 | T3 |
  | 10 | Ratio and rate | 705–736 | T3 |
  | 11 | Symmetry and views of 3-D objects | 742–759 | T4 |
  | 12 | Patterns and input–output | 760–796 | T4 |
  | 13 | Time | 797–807 | T4 |
  | 14 | Data handling and probability | 808–859 | T4 |

- If the file is missing, re-extract it from `C:\Users\Ruhan JvR\OneDrive - Curro Holdings\Desktop\MATHEMATICS.pdf` with pypdf. The Grade 4 section is pages 19–30. Write it to the scratchpad.
- The draft has mistakes. Fix them and note each fix in a header comment of `gen_chN.js`. Typical fixes so far:
  - Examples that only work with brackets were written with brackets.
  - Wrong answers were corrected.
  - Decimals are not taught in Grade 4. Rewrite them as whole units (3 500 mm, not 3,5 m), or change the numbers.

## Writing gen_chN.js

Copy the skeleton of `gen_ch5.js`, the shortest file at 119 lines. Read its first topic, lines 1–26, as the model. Shape:

```js
const { ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT } = require('./lib.js');
const S = require('./sims_chN.js');
const T = [];
T.push({
  id: 701, name: { en, af }, full: { en, af },            // short sidebar name; full lesson heading
  body: lang => { const en = lang === 'en';
    const L = en ? {/* sim strings + functions */} : {/* same keys in AF */};
    const m = `<h4>🎮 ${title}</h4><p class="how">…</p> …markup with data-k="…" hooks…`;
    return hero('sticker', 'intro…') + def(title, html) + ex(title, [steps]) + sim('g4-s701', S.s701, L, m) + tip(html);
  },
  qs: [ { en, af, o: [[en options], [af options]] /* omit o for typed answers */, a: answer, lv: 'K'|'R'|'C'|'P',
          h: [hintEn, hintAf], s: [[stepsEn…], [stepsAf…]] } ],   // 8 per topic, a mix of levels
  wb: { en: [{ t: 'question', p: ['part a', 'part b'], m: [2, 2] }], af: [...same shape],
        ans: [[answer, noteEn, noteAf], …] }                       // one ans entry per workbook PART
});
writeChapter(N, { en: 'Chapter name', af: 'Hoofstuknaam' }, T, process.argv[2] || OUT_DEFAULT);
```

Rules learned the hard way:

- **Sim strings:** functions in `L` must be **top-level keys**. Nested functions, or functions inside arrays, are lost in serialisation. Pass data as arrays of plain objects.
- **MC answers:** for `mc`, `a` is the exact option text in the EN list. AF options must be the same length and in the same order.
- **Typed answers:** `a` may contain spaces ("1 250"), an R prefix or units. The checker accepts these.
- **`same(s)` helper:** only for steps with no words, i.e. pure arithmetic. If a step has words, write separate AF text. English left inside AF steps has been a repeated bug.
- **Afrikaans terms:** use proper ones: *omtrek, oppervlakte, volume, breuk, teller, noemer, verhouding, koers, simmetrielyn, invoer/uitvoer, waarskynlikheid*. Decimal comma style: "3,5".
- **Stickers:** `hero(sticker, html)` takes a name from `assets/stickers/` (141 webp files; `ls assets/stickers | grep -v @2x`). The hero already keeps "4 000"-style numbers from breaking across lines.
- **Diagrams:** every geometry, measurement or shape question gets a figure (inline SVG). Never use word-only figures.
- **Volume:** at least 4 topics' worth of practice per chapter, 8 questions per topic, 3–5 workbook questions per topic.

## Writing sims_chN.js

Model: `sims_ch5.js` (112 lines). Each sim is `exports.sNNN = function (L, root) { const { q, rnd, num, fmt, shuffle, pt, stk } = window.G4; … }`.

- Get elements with `q(root, 'key')`, matching `data-k="key"` in the markup. Use one delegated click listener on `root`.
- Use only `window.G4` and DOM APIs, with no module-level code. The generator runs in Node, and the sim is stringified into the page.
- **CSS classes available:**
  - Buttons: `.g4-btn`, `.g4-btn.ghost`, and `[aria-pressed]` for toggles.
  - Layout: `.g4-row`, `.g4-col`.
  - Inputs and text: `.g4-input`, `.g4-big`.
  - Drawing: `.g4-stage svg`, whose viewBox is usually `0 0 640 H`.
  - Feedback: `.g4-out`, `.g4-out.good`, `.g4-out.bad`.
  - Tables and lists: `.g4-chart`, `.g4-steps`.

  Add new CSS to the Grade 4 block in `index.html` only if none of these fits.
- **Stickers as objects in an SVG:** use about 80–150 units, and crop the viewBox to the content so they render large on a phone. Sticker PNGs have transparent padding, so let them overlap what they sit on by about 15 units.
- **Aim of each sim:** one hands-on idea, such as measuring, building, sorting, predicting or balancing. Each needs "New one" (`W[lang].newQ`) and immediate feedback saying *why*.

## Build

Run from the repo root:

```bash
node scripts/math-gr4/gen_chN.js
```

Then set the manifest line in `math-magician/gr4/index.html`. Set `topics` to the real count and change `file: null, fileAf: null` to `file: "chN.js", fileAf: "chN.af.js"`. Then:

```bash
node scripts/build-math-topic-index.js && node scripts/build-math-catalog.js
```

## Verify (keep it cheap)

1. Run `python -m http.server 8765 --bind 127.0.0.1` in the background. Then make a test copy without the auth gate:
   `sed '/require-auth.js/d' math-magician/gr4/index.html > math-magician/gr4/_test.html`
2. In the built-in browser, open `http://127.0.0.1:8765/math-magician/gr4/_test.html?v=N`. Change N every load to bust the cache. Then run:
   `document.documentElement.style.visibility='visible'`, remove fixed overlays with z-index above 50, and `document.querySelectorAll('.topic-item')[i].click()`.
   - Topic items are indexed across all chapters: Ch1 0–6, Ch2 7–10, Ch3 11–15, Ch4 16–20, Ch5 21–23, Ch6 24–27, and Ch7 starts at 28.
   - The page may open in Afrikaans (saved in localStorage). That's fine: test both.
3. **Check with JavaScript first:**
   - no console errors
   - every sim renders
   - drive each sim's buttons, and assert correct and wrong feedback
   - practice tab loads 8 questions per topic
4. **Screenshots last:** one per sim at the `mobile` preset (375 px). Look for overlap, tiny elements and clipped labels. Reset the viewport to `desktop` afterwards.
5. Delete `_test.html` before committing.

## Ship

- Stage only the chapter files, the generated files, `index.html`, `topic-index.js` and `lesson-catalog.js` (plus `math-magician/index.html` if the catalog changed it).
- Commit message: `Math Magician Grade 4: Chapter N (Name)`, ending with the Co-Authored-By trailer.
- Push to main (this deploys). Confirm it's live with `curl -s "https://themagiclab.co.za/math-magician/gr4/chN.js?v=$RANDOM" | head -c 200`.
- Update the memory file `project_math_gr4.md` and its `MEMORY.md` line, e.g. "Ch 1–N live (date)".

## Shell pitfalls on this machine

- Python heredocs can turn `\b` into a raw backspace character. For regex edits, use the Edit tool or `node -e` with `String.fromCharCode`.
- The Edit tool needs a Read first. After a `sed -i`, re-Read before using Edit.
- Generated files are LF. Git's CRLF warnings are harmless.
