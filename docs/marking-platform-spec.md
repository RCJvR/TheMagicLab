# Grading Grimoire: assignment submission and marking platform

Design spec. Written 2026-11-12; **approved by the founder 2026-11-12** (decisions in §11).
SQL drafts: [`marking-platform-schema.sql`](marking-platform-schema.sql) (not run on any database yet).

> **Name.** "Grading Grimoire" follows the site's naming rule (a function word plus a magical
> word). It is a working title; change it freely. Below, "the platform" means the whole
> feature, "the editor" the learner's writing page, "the marking view" the teacher's page and
> "the markbook" the merged record of marks.

---

## 0. Why, and what "better than an LMS" means here

Blackboard, Canvas, Moodle and Teams all do submission and marking. They are weak in the
places a South African teacher feels most:

| Gap in the big LMSs | What the platform does instead |
|---|---|
| Marking is a comment box and one number. Paper marking (a tick per mark, totals in the margin) is not supported. | Ticks that carry marks and add themselves up per question and in total, like a red pen on paper. |
| Rubrics are either points-per-level or weighted percentages. CAPS rubrics give each level a **mark range** (Level 7: 8–10) and the teacher picks the exact mark. | Six rubric types, including mark ranges per level, holistic, single-point and checklist, with optional weighting. |
| Annotations sit on a PDF render, or on fixed pixel positions that drift on another screen size. | Every annotation is anchored to a block and a text position in the learner's (frozen) work, so it stays on the right word at any width. |
| Moderation (SBA moderation by an HOD) is not modelled. | A moderator layer in a second pen colour (phase 3). |
| CAPS achievement levels 1–7, terms and the weighted year mark are spreadsheet work. | The markbook converts percentages to levels and works out the term and year marks, as the Assessment Tracker already does. |
| Practice data (quizzes, tools) lives in a different silo from formal marks. | One markbook merges Test Tome, Math Magician, lesson results and marked work. |
| English only. | Afrikaans UI layer (phase 3), following the site's `.af` conventions. |

Non-goals for now: a full LMS (forums, modules, calendars), video submissions, plagiarism
detection, a school-wide admin role.

### Briefs (per the page-design skill)

- **Editor.** Who: a Grade 8–12 learner, often on a phone or a cheap laptop, sometimes offline.
  Must: write and hand in a task. Remember: "my work is saved, and I can see when it is handed in".
- **Marking view.** Who: a teacher on a laptop, marking 30–150 scripts in one sitting.
  Must: mark quickly and fairly. Remember: "this was as fast as a red pen, and the totals were right".
- **Markbook.** Who: a teacher (and later an HOD) at the end of a term. Must: see and export
  marks per learner, task and class. Remember: "the year mark is done".

---

## 1. Where data lives today, and the unification

The audit found teacher data in three places:

| System | Storage | Keyed on | Used by |
|---|---|---|---|
| Supabase classes | `classes`, `class_members` (+ `profiles`) | learner **account** id | Assignments, Arena, Test Tome sharing, results RLS (`teacher_has_student`, `is_class_teacher`) |
| Local class lists | `localStorage` `aa:classes` (`assets/teacher-shared.js`) | learner **name** (unique per class) | Report comments, Rubric marking, random picker, class log, Assessment Tracker |
| Rubric Builder, Assessment Tracker | `localStorage` `aa:rubric`, `aa:rubric-marks`, `aa:tracker` | rubric criterion **position**; learner name | `assets/teacher-admin-tools.js`, `assets/teacher-class-tools.js` |

Problems: work is lost when the browser is cleared, nothing moves between devices, names are
the only link to a learner, and rubric marks are stored by criterion position (reordering
criteria after marking shifts every mark; the panel says so).

**Unification rule: the Supabase class is the one class list.** It gets a **roster** (§6.2):
one row per learner in the class, either linked to a learner account or a name-only row for a
learner who has not signed up. Every mark in the platform points at a roster row, never at a
name or an account directly. That lets the markbook hold the whole class from day one, while
learners join at their own pace.

Local class lists, the Rubric Builder and the Assessment Tracker move into Supabase through a
one-time import (§9). The browser copies stay readable until the teacher confirms the import.

---

## 2. The learner editor

### 2.1 Library choice: TipTap (ProseMirror), MIT

The site is static (GitHub Pages, no bundler), so the editor must load as browser ES modules.

| Option | Licence | Static-site fit | Verdict |
|---|---|---|---|
| **TipTap 3** on ProseMirror | MIT (core and the extensions we need) | ES modules from a CDN; schema-based JSON documents | **Chosen** |
| Plain ProseMirror | MIT | Same, but every menu and command is hand-written | Fallback if TipTap's CDN build misbehaves |
| Quill 2 | BSD | Single UMD file, easy | Delta format, weaker tables, no stable block ids |
| Lexical | MIT | Needs a bundler in practice | No |
| CKEditor 5, TinyMCE | GPL or commercial | Licence cost or copyleft | No |
| `contenteditable` by hand | n/a | | Not safe or consistent across browsers |

What decides it: TipTap stores the document as **ProseMirror JSON**, a validated tree of
nodes. That gives us stable block ids for annotation anchors (§3.3), a read-only render for the
teacher with the same schema (no learner HTML is ever injected with `innerHTML`), and positions
(`posAtCoords`, `coordsAtPos`) to place annotations.

**Loading.** One import map in the editor and marking pages, versions pinned exactly:

```html
<script type="importmap">
{ "imports": {
  "@tiptap/core":               "https://esm.sh/@tiptap/core@3.x.y",
  "@tiptap/starter-kit":        "https://esm.sh/@tiptap/starter-kit@3.x.y?external=@tiptap/core",
  "@tiptap/extension-table":    "https://esm.sh/@tiptap/extension-table@3.x.y?external=@tiptap/core",
  "@tiptap/extension-image":    "https://esm.sh/@tiptap/extension-image@3.x.y?external=@tiptap/core",
  "@tiptap/extension-mathematics": "https://esm.sh/@tiptap/extension-mathematics@3.x.y?external=@tiptap/core"
} }
</script>
```

(`3.x.y` is filled in with one exact, checked version at build time.)

Risk, and the guard against it: ProseMirror breaks if two copies of `prosemirror-model` or
`prosemirror-state` load (one per extension). With esm.sh, mark `@tiptap/core` and the
`@tiptap/pm/*` packages as `external` so every extension shares one copy, and test that
`editor.schema` contains every node. **Fallback:** if the CDN graph proves fragile, build one
file once with esbuild on a developer machine and commit it as `assets/vendor/tiptap.bundle.js`
(still no bundler in the site's build; the file is a checked-in asset). This also suits the
network-first service worker and schools with filtered internet. A checked-in vendor file is
approved (§11); the phase 0 spike picks whichever proves more reliable. The rest of the design
is the same either way.

### 2.2 What the editor supports

| Feature | MVP | How |
|---|---|---|
| Headings (H2, H3), paragraphs | ✓ | StarterKit. H1 is reserved for the task title. |
| Bold, italic, underline, strike, sub/superscript | ✓ | StarterKit + Underline, Subscript, Superscript (chemistry: H₂O, units: m²) |
| Bullet and numbered lists, task lists | ✓ | StarterKit + TaskList |
| Tables (with header row, merge cells) | ✓ | Table, TableRow, TableHeader, TableCell. Max 20 × 12. |
| Inline images | ✓ | Image node storing a **storage path**, not a URL (§2.4) |
| Hyperlinks | ✓ | Link; protocols `https`, `http`, `mailto` only; `rel="noopener noreferrer nofollow"`, opens in a new tab |
| Undo / redo, paste from Word or Google Docs | ✓ | StarterKit; paste is reduced to the schema, so foreign styling is dropped |
| Word count | ✓ | CharacterCount; the teacher can set a limit |
| Maths (inline and block) | Phase 2 | `@tiptap/extension-mathematics` (KaTeX). It was released as open source with TipTap 3; confirm the licence of the pinned version. Fallback: a ~60-line custom `math` node holding LaTeX, rendered with KaTeX (MIT). Learners type `$x^2$`; a small symbol palette helps those who do not know LaTeX. |
| Code blocks | Phase 2 | For CAT/IT tasks; CodeBlockLowlight with a small language set |
| Drawing / diagram | Later | Out of scope; learners attach a photo instead |

Toolbar: one row, wraps on phones, icons from the site's Lucide set with `aria-label` and
`title`; all marks reachable by the usual shortcuts (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K for link).

**Block ids.** Every top-level block (and table cell) gets a stable `bid` attribute (8-char
random id) the moment it is created, using TipTap's UniqueID extension (open source since
TipTap 3) or a 30-line plugin. Copy-paste inside the document generates new ids for duplicates.
Ids are what annotations anchor to.

**Task templates.** A teacher may give the task a starting document (for example question
headings 1.1, 1.2, 2.1 with an empty paragraph under each). Template headings carry a
`qid` attribute linking them to the assignment's questions (§3.5). Learners can write under
them but not delete or retype them (a ProseMirror filter rejects transactions that remove a
`qid` heading).

### 2.3 Document format and limits

- Stored as ProseMirror JSON (`jsonb`). The schema version is stored alongside (`doc_schema`
  int) so later changes can migrate old documents.
- Size cap: 1 MB of JSON per draft (checked in the client and by the database), 30 images per
  submission.
- Sanitising: JSON from the client is never trusted. The marking view renders it through a
  read-only TipTap instance with the same schema: unknown nodes and marks are dropped by
  ProseMirror's `Node.fromJSON` with a strict schema, and links pass the protocol allow-list
  again. No stored HTML is ever rendered.
- Plain-text extract (`doc_text`) is saved with each submitted version for search, word
  count and (later) similarity checks.

### 2.4 Images in Supabase Storage

- Private bucket `submission-files`, following the `drawing-checks` precedent.
- Path: `<student_id>/<submission_id>/<random>.webp`. The first folder must equal
  `auth.uid()` on upload.
- In the browser, before upload: decode, scale to at most 1600 px on the long side,
  re-encode as WebP (JPEG where WebP encoding is missing) at quality 0.82. Re-encoding through
  a canvas **strips EXIF** (GPS location, device) — a POPIA win. Limit 2 MB after resize;
  accepted inputs: JPEG, PNG, WebP, HEIC where the browser can decode it.
- Paste and drag-and-drop of images go through the same path; a placeholder with a progress
  ring is inserted at the drop position and replaced once uploaded.
- Display: the Image node stores `{ path, w, h, alt }`. Pages request short-lived signed URLs
  (`createSignedUrls`, one hour, batched per document) and swap them in. `w`/`h` reserve space
  so the layout does not jump while images load, which also keeps annotation anchors steady.
- Alt text: learners are prompted (optional) for a caption/alt text.
- Orphans: images deleted from a draft stay in storage until the submission is submitted or
  abandoned; a weekly clean-up (Edge Function on a schedule) removes paths not referenced by
  any draft or version.

### 2.5 Autosave, submit, lock, resubmit

```
            save_draft (autosave)            teacher reopens / resubmission allowed
          ┌────────────┐                   ┌──────────────────────────────┐
          ▼            │                   │                              │
   (none) ─► draft ────┴─► submitted ──► marking ──► returned ──────────────┘
                 submit_submission()   (teacher opens)  (marks released)
```

- **Autosave, two layers.**
  1. Every change writes to `localStorage` within 500 ms (key `ml-sub-<assignment_id>`), so a
     dropped connection or a closed tab loses nothing. Same idea as `work-autosave.js`.
  2. Every 3 s of quiet, and on `visibilitychange` / `pagehide`, the draft goes to Supabase via
     `save_draft(submission_id, doc, expected_version)`. The function bumps `draft_version`
     and refuses a stale `expected_version` (another tab or device saved first). The editor
     then offers "Keep this version / Load the other one", never a silent overwrite.
- Status line under the toolbar, in plain words: "Saved 14:02", "Saving…", "Offline — saved on
  this device", "Couldn't save — retrying". `aria-live="polite"`.
- **Submit.** A clear primary button. A confirmation shows word count, image count and, if
  late, "This is 2 days late". `submit_submission()` (security definer) copies the draft into
  an immutable `submission_versions` row (attempt n), sets `status = 'submitted'`,
  `submitted_at = now()` and works out `is_late` on the server from the due time and any
  per-learner extension. Learners cannot fake time.
- **Lock.** After submitting, the draft is read-only. `save_draft` refuses unless the status is
  `draft` or `reopened`.
- **Resubmission.** Allowed when the assignment says so (`allow_resubmit`, `max_attempts`) and
  the work is not yet released, or when the teacher reopens one learner's work. Reopening keeps
  every earlier version; the marking view shows the latest by default with a version picker.
  Annotations belong to the version they were made on (§3.3).
- **Due dates.** `due_at` (timestamptz, South African time shown), optional `close_at` after
  which no submission is accepted, per-learner extensions in `assignment_extensions`.
- **No account yet?** Name-only roster learners cannot submit online. The teacher can attach a
  photo/scan of paper work to their roster row from the marking view (phase 2), so the
  markbook still has the whole class.

---

## 3. The teacher marking view

### 3.1 Layout

```
┌───────────────────────────────────────────────────────────────────────────────┐
│ ‹ Gr 10A · Essay: Load shedding    Thandi M. (12 of 31) ‹ ›    Mark mode [M]   │  top bar
├──────────────────────────────────────────────┬────────────────────────────────┤
│                                    margin │  │  Rubric · Comments · Versions  │
│  1.1  Define renewable energy        ✓ ✓  │2 │  ───────────────────────────── │
│  Renewable energy is energy that comes ✓  │  │  Argument          L5  12/15 ▾ │
│  from sources that ...                    │  │  Evidence          L4   9/15 ▾ │
│                                           │  │  Language          L6   8/10 ▾ │
│  1.2  ...                  ✗ "units?"     │1 │  ───────────────────────────── │
│  [image: graph]   ✓(2)                    │  │  Ticks        23 / 30          │
│                                           │  │  Rubric       29 / 40          │
│                                           │  │  Total        52 / 70  74% L6  │
│                                           │  │  [ Save ]  [ Release ]          │
└──────────────────────────────────────────────┴────────────────────────────────┘
```

- Left: the learner's submitted version, rendered read-only at a comfortable reading width
  (max 72ch), with a right-hand **margin lane** (64 px) where margin ticks and question
  sub-totals sit, like the margin of an answer sheet.
- Right: a pane (360 px, resizable, collapsible) with tabs **Rubric**, **Comments** (bank, §3.6)
  and **Versions**. The running total is pinned at the bottom of the pane.
- Below 900 px wide the pane becomes a bottom sheet; marking on a tablet is supported, on a
  phone it is view-only (too small to mark fairly).
- Next/previous learner without leaving the page; the order is the roster order, with filters
  "not marked", "late", "resubmitted".
- Design: neutral ground, one accent (the platform's tool colour) for the primary action only.
  Annotations use **pen tokens**, not semantic tokens: `--pen-marker` (red, the SA marking
  convention) and, in phase 3, `--pen-moderator` (green). Both are defined for the dark, light
  and prism themes with a measured contrast of at least 4.5:1 against the page ground, and the
  annotation layer carries `data-ml-no-theme` so the theme engine does not remap them. A tick
  and a cross differ by **shape**, never by colour alone.

### 3.2 Annotation types

| Type | Placed on | Carries | Default key (mark mode) |
|---|---|---|---|
| Tick ✓ | a point (in the text or margin) | marks (default 1; ½ steps allowed; 0 allowed for "seen") | T |
| Cross ✗ | a point | optional reason | X |
| Comment | a point or a text range | text (from the bank or typed), optional marks | C |
| Stamp | a point | one of a set: "Excellent", "See me", "Incomplete", "Check units", "Show working", custom per teacher | S, then 1–9 |
| Highlight | a text range | colour (3 choices), optional comment | H |
| Question total | auto-placed at the end of each question | sum of tick marks in that question / question max | (automatic) |
| Pen stroke | a block region | an SVG path in block-relative units | Phase 3 (tablets with a stylus) |

### 3.3 Anchoring that survives reflow

The key fact: **a submitted version never changes.** Annotations attach to one
`submission_version`, so the text under them is fixed; only the layout changes (window width,
font size, phone vs. laptop, light vs. dark). An anchor therefore needs to name a place in the
*content*, not a pixel.

Anchor shapes (stored as `jsonb` in `annotations.anchor`):

```jsonc
// 1. Text point: a tick on a word. offset = character offset within the block's text.
{ "kind": "point", "bid": "k3f9a2xq", "offset": 41, "lane": "text" }

// 2. Margin point: a tick in the margin beside a line of the block.
{ "kind": "point", "bid": "k3f9a2xq", "offset": 41, "lane": "margin" }

// 3. Box point: on an image, a table cell or empty space. Fractions of the block's box.
{ "kind": "box", "bid": "img7h2p0", "fx": 0.62, "fy": 0.35 }

// 4. Text range: a highlight or a comment on a phrase. Offsets within each block, plus a
//    quote (W3C Web Annotation TextQuoteSelector) as a cross-check and for carrying the
//    annotation forward to a resubmitted version.
{ "kind": "range",
  "from": { "bid": "k3f9a2xq", "offset": 12 },
  "to":   { "bid": "p0w8m1zz", "offset": 7 },
  "quote": { "exact": "comes from sources", "prefix": "energy that ", "suffix": " that are" } }
```

**Placing.** On click, `view.posAtCoords({left, top})` gives the document position; walk up to
the nearest ancestor with a `bid` (a top-level block or table cell); the offset is the position
minus the block's start, counted in text characters. A click on an image or on blank space in a
block becomes a box anchor. A click in the margin lane uses the line at that height
(`posAtCoords` at the text column's x).

**Rendering.** An overlay layer (absolutely positioned, same scroll container) recomputes
positions with `view.coordsAtPos(blockStart + offset)` (text and margin) or the block's
`getBoundingClientRect()` × fractions (box). Recompute on a `ResizeObserver` of the document
and after images load. Stacked marks on one line spread sideways in the margin so they never
overlap.

Why offsets within a block and not absolute document positions: the same model works if a
later schema change alters the document's node structure outside that block, and block ids give
an easy integrity check (a missing `bid` flags the annotation as "unplaced" instead of drawing
it in the wrong spot). Unplaced annotations are listed in the pane, never lost.

**Carrying forward (phase 3).** When a learner resubmits, the teacher can copy annotations to
the new version: same `bid` and identical block text keep the offset; otherwise the quote
selector re-finds the text; otherwise the annotation is listed as unplaced.

### 3.4 Keyboard shortcuts and mark mode

Constraint: Chrome and Edge reserve **Ctrl+1…8** (switch to tab n) and Ctrl+9 (last tab); a
page cannot override them. Firefox on Linux uses **Alt+1…9** for tabs; on macOS, Option+digit
types characters (¡ ™ £), so shortcut handlers must read `event.code` ("Digit1"), not
`event.key`.

Proposal: a **mark mode**, toggled with **M** or the top-bar switch, during which single keys
are shortcuts. Single keys are free in every browser and fastest for a teacher marking 100
scripts. They are ignored whenever focus is in a text field (the comment box, a mark input),
so typing is never hijacked. Outside mark mode, Alt+key equivalents work.

| Key (mark mode) | Outside mark mode | Action |
|---|---|---|
| T | Alt+1 | Tick at the caret or the last click; the next number typed (1–9, `.` for ½) sets its marks |
| X | Alt+2 | Cross |
| C | Alt+3 | Comment (opens the box with the bank search focused) |
| H | Alt+4 | Highlight the current text selection |
| S then 1–9 | Alt+5 | Stamp n from the teacher's stamp set |
| Delete / Backspace | same | Remove the selected annotation |
| [ / ] | same | Previous / next annotation (moves focus, announces it) |
| J / K | Alt+↓ / Alt+↑ | Next / previous learner (saves first) |
| R | | Focus the rubric pane; ↑ ↓ choose a criterion, ← → a level, digits type the exact mark |
| Ctrl+Z / Ctrl+Shift+Z | same | Undo / redo annotation changes |
| ? | same | Shortcut sheet |
| Esc | | Leave mark mode or close the open popover |

Keyboard placement: the read-only document still has a caret (ProseMirror selection), moved
with the arrow keys; T/X/C place at the caret. So marking is fully possible without a mouse,
and every annotation is a focusable element with an accessible name ("Tick, 2 marks, on
'renewable energy'").

### 3.5 Marks that add themselves up

South African paper marking: each tick is a mark, the marker writes the question total in the
margin, then the paper total on the cover.

- The assignment can define **questions** (`assignment_questions`: number "1.1", max marks,
  order). If the task has a template (§2.2), each question heading carries its `qid`.
- A tick (or a comment with marks) belongs to the question whose heading most closely precedes
  its block. Ticks before any question heading, or in a task with no questions, count to
  "Unsorted".
- Each question shows "3 / 4" in the margin at its end. Over-max totals show a warning, never a
  silent cap. The teacher can override a question total by typing it (stored as
  `question_overrides`, so the ticks stay as evidence).
- The paper total = Σ question totals. With a rubric as well, the assignment chooses how they
  combine: **ticks only**, **rubric only**, **ticks + rubric** (e.g. 30 content marks by ticks,
  20 by a language rubric), or **direct mark** (just type a number).
- Percentages and the CAPS level (1–7, same bands as `capsLevel()` in
  `assets/teacher-shared.js`) are shown next to the total.
- The computed total is saved in `submission_marks` (`score`, `score_max`) every time marking
  is saved, so the markbook never re-derives it from annotations.

### 3.6 Comment bank

- Per teacher, in Supabase (`comment_bank`), with optional tags (subject, grade, assignment)
  and a usage count for ordering.
- Searchable inside the comment box: typing filters the bank; Enter inserts the top match; Tab
  cycles. Pinned comments for the current assignment appear first.
- A comment can carry default marks (useful for "Correct formula ✓" worth 1).
- Save any typed comment to the bank with one click.
- Rubric level descriptors can be inserted as comments ("Evidence, Level 4: …").
- Starter packs per subject (e.g. Science: "Units missing", "Show the formula first",
  "Significant figures") ship as JSON in `assets/marking/comment-packs/`, copied into a
  teacher's bank on request. Teachers' own banks are private.

### 3.7 Releasing marks

Marking and releasing are separate (Canvas calls this a muted assignment). A teacher marks the
whole class, then releases marks and feedback to all, or to selected learners. Learners see
nothing until `released_at` is set. After release the learner sees their work with the
annotations, **each question's total** (in the margin, as on paper) and the paper total, the
rubric with the chosen levels highlighted, and the teacher's overall comment; annotation markers are keyboard-reachable for screen-reader users.

---

## 4. Rubrics

### 4.1 Types

| Type | Shape | Scoring | Example |
|---|---|---|---|
| `analytic_points` | criteria × levels | each level has fixed points (can differ per criterion) | Today's Rubric Builder (4 levels → 4, 3, 2, 1) |
| `analytic_range` | criteria × levels | each level has a **mark range**; the teacher picks the exact mark in it | CAPS essay rubric: Level 7 = 8–10, Level 6 = 7 … |
| `holistic` | one row of levels | one level, points or range | Oral: 1 overall impression level |
| `single_point` | criteria with one "meets the standard" descriptor | per criterion: a mark 0…max, plus "concerns" and "exceeds" notes | Project feedback |
| `checklist` | items | each item yes/no (optionally partial) with its marks | Practical: "Labelled axes (1)", "Units (1)" |
| `marking_grid` | questions × max marks | typed marks per question (no descriptors) | A memo-style grid when ticks are not used |

### 4.2 Weighting (optional)

- Off (default): the rubric total is the sum of criterion marks.
- On: each criterion has a weight. Score = Σ (wᵢ × markᵢ / maxᵢ) / Σ wᵢ × rubric total. The
  rubric total is set by the teacher (e.g. 50) so a weighted rubric still yields a mark out of
  a whole number, as CAPS tasks need.

### 4.3 Definition format

A rubric's content is one JSON document. Criteria and levels have **stable ids**, so a mark
records `criterion_id`, never a position (this fixes today's position bug).

```jsonc
{
  "type": "analytic_range",
  "total": 40,                       // optional; required when weighted
  "weighted": false,
  "levels": [                        // shared scale (analytic types); a criterion may override
    { "id": "l7", "label": "Level 7 · Outstanding", "min": 9, "max": 10 },
    { "id": "l6", "label": "Level 6 · Meritorious", "min": 7, "max": 8 }
  ],
  "criteria": [
    { "id": "c1", "name": "Argument", "weight": 1, "max": 10,
      "cells": { "l7": "Sustained, original argument …", "l6": "Clear argument …" },
      "levels": null }               // or a per-criterion level list with its own ranges
  ]
}
```

Checklist items use `{ "id", "text", "marks", "partial": false }`; single-point criteria use
`{ "id", "name", "max", "standard" }`.

### 4.4 Versions

Rubrics are edited freely, but an assignment links to an **immutable rubric version**
(`rubric_versions`). Editing a rubric creates a new version; marked work stays tied to the
version it was marked with. The teacher can move an unmarked assignment to the new version;
moving a marked one asks for confirmation and lists criteria that disappear.

### 4.5 Sharing

Phase 2: share a rubric with another teacher (copy, not live link); phase 3: a public library
of CAPS rubrics per subject.

### 4.6 Migrating the Rubric Builder

Today (`assets/teacher-admin-tools.js`): `aa:rubric = { title, levels: 3|4|5, rows: [{ name, cells[] }] }`,
top level scores highest (`levels - index`). Marks: `aa:rubric-marks = { [localClassId]: { [learnerName]: { picks: [levelIndex…], note } } }`.

Migration:
1. The Rubric Builder gets a "Save to my account" button. It writes an `analytic_points`
   rubric: level ids `l1…ln` with points `n…1`, criterion ids `c1…cm` in the current order.
   This happens once per rubric; afterwards the builder loads from and saves to Supabase, and
   keeps the local copy as a cache.
2. Rubric marks are imported with the class lists (§9): each local class is matched to a
   Supabase class and each learner name to a roster row; then each `picks` array becomes
   `rubric_scores` rows on a markbook task ("Rubric: <title>"). Positions are converted to
   criterion ids at this moment, using the rubric as it is now.
3. The Build and Mark sub-tabs stay in the teacher dashboard for quick, non-submission marking
   (e.g. marking an oral against a rubric). They write to the same tables.

---

## 5. Assignments (extending the existing table)

Today `assignments` (`assignments-schema.sql`, `assignments.js`) tracks **lesson completion**:
`tool`, `title`, `instructions`, `due_date`, topic refs in `assignment_topics`, optional
`student_ids`. Completion is computed from `progress_events` and `lesson_results`.

The platform adds a **kind** column and keeps one table, so a class's task list, due dates and
the learner's "My assignments" stay in one place:

| Column | Meaning |
|---|---|
| `kind` | `'lessons'` (default, today's behaviour) or `'written'` (a submission task). Later: `'upload'` (file only), `'offline'` (marked on paper, entered in the markbook) |
| `due_at` | timestamptz; `due_date` stays for lesson assignments and older rows |
| `close_at` | no submissions after this (null = accept late work) |
| `allow_resubmit`, `max_attempts` | resubmission rule |
| `brief` | the task instructions as a TipTap document (rich), `instructions` stays as plain text |
| `template` | optional starting document for learners (§2.2) |
| `scoring` | `'ticks' \| 'rubric' \| 'ticks_rubric' \| 'direct'` |
| `total_marks` | out of |
| `rubric_version_id` | optional |
| `term`, `task_type` | for the markbook (Term 1–4; Test, Assignment, Project, Practical, …) |
| `word_limit` | optional |

For `kind = 'written'`, `tool` is set to `'written-task'` (it is `not null`). **Required code
change:** `assignments.js` completion logic and `my-assignments.js` must branch on `kind`;
until they do, an old client would show a written task as a tool-wide assignment that never
completes. Ship the client change before or with the first written task. A written
assignment's "done" state for the learner is "submitted".

Creating a written assignment automatically creates its markbook task (§6.3), so marks flow
into the markbook on release without double entry.

---

## 6. Data model

### 6.1 Overview

```
classes ──< class_roster >── profiles (learner, optional)
   │             │
   │             ├──< mb_marks >── mb_tasks ─── (assignment | tome session | manual | practice import)
   │             │                     │
assignments ──< submissions ──< submission_versions ──< annotations
   │   │             ├── submission_marks (1:1, hidden until release)
   │   │             └──< rubric_scores >── rubric_versions >── rubrics
   │   └──< assignment_questions
   └──< assignment_extensions

comment_bank, stamp sets            (per teacher)
mark_audit                          (append-only log of mark changes)
storage: submission-files bucket    (images)
```

### 6.2 Tables (full DDL in the SQL draft)

| Table | Purpose | Key points |
|---|---|---|
| `class_roster` | one row per learner per class | `student_id` nullable (name-only learners); `display_name`; `admission_no` (for SA-SAMS and school systems); `active`; unique (class, student) and (class, lower(name)). A trigger adds a roster row when a learner joins via `class_members`, and links a name-only row with the same name if the teacher confirms. |
| `rubrics` | header: owner, title, subject, grade, type, current version | private to the owner |
| `rubric_versions` | immutable JSON definition (§4.3) | insert-only |
| `assignment_questions` | numbered questions with max marks | for tick totals |
| `assignment_extensions` | per-learner new due time | |
| `submissions` | one per (assignment, learner): status, draft doc, `draft_version`, attempt, `released_at` | learner writes only through RPCs; the teacher may only set status to `marking` |
| `submission_marks` | score, score max, question overrides, overall comment, marked version | a separate table because RLS works per row, not per column: learners can read it only after release |
| `submission_versions` | immutable snapshot per attempt: doc, text, word count, `submitted_at`, `is_late` | created only by `submit_submission()` |
| `annotations` | type, anchor (§3.3), marks, text, stamp, colour, `layer` (marker/moderator) | belongs to a version |
| `rubric_scores` | per (submission or markbook mark, criterion): level id, mark, note | criterion ids, not positions |
| `comment_bank` | teacher's reusable comments | |
| `mb_tasks` | markbook columns | `source`: `assignment`, `manual`, `tome`, `practice`; term, type, total, weight, `counts_to_year`, optional `rubric_version_id` |
| `mb_marks` | one per (task, roster row): mark, status (`missing`, `absent`, `excused`, `exempt`), comment | the single source for exports |
| `mark_audit` | who changed which mark, from what to what, when | append-only; supports SBA moderation and disputes |

### 6.3 How marks reach the markbook

| Source | How | Live or snapshot |
|---|---|---|
| Written assignments | On release, `release_marks()` upserts `mb_marks` for the assignment's task from `submissions.score` | written on release; re-release updates |
| Manual / offline tasks | Typed into the markbook grid (as in today's Assessment Tracker) | stored |
| Assessment Tracker (local) | One-time import (§9): tasks → `mb_tasks`, marks → `mb_marks` | stored |
| Test Tome (`tome_results`) | "Add Test Tome session to markbook": pick a session; rows with `learner_id` match roster rows by account; the rest are matched by name with the teacher confirming each uncertain match (same screen as §9) | snapshot on import (re-import button) |
| Math Magician (`mm_results`), lesson results (`lesson_results`) | These are practice records (recent right/wrong per topic), not formal marks. The markbook shows a **Practice** band per learner (topics attempted, % correct) read live through `teacher_has_student`. A teacher can freeze it into a task ("Gr 9 Algebra practice, % correct on 30 Nov") with `counts_to_year = false` by default | live view; optional snapshot |
| Drawing Druid (`drawing_submissions.mark`) | Phase 3: same pattern as Test Tome | snapshot |

Why snapshots for practice data: the jsonb records keep only recent results and change with
every attempt, so a "live" year-mark component would move under the teacher's feet.

### 6.4 The year mark

Same model as the Assessment Tracker, so teachers recognise it: each counted task has a weight
(% of the year mark); year mark so far = Σ (mark/total × weight) / Σ weight of marked tasks.
Added:

- Term marks: same formula within a term, or per-term weights if the school uses them
  (`mb_settings` per class: `{ "term_weights": [25,25,25,25] }` or `null`).
- Status handling: `excused`/`exempt` drop out of both sums; `missing` counts as 0 only when
  the teacher turns on "count missing as 0"; `absent` stays out until a mark is entered.
- One calculation module, `assets/markbook-calc.js`, shared by the grid, the learner view and
  every export, with unit tests run in the browser test page. No second copy in SQL.
- CAPS level from the percentage with the existing `capsLevel()` bands.

### 6.5 Markbook views

All for the signed-in teacher's own classes (RLS):

- **Class grid**: learners × tasks, with term and year columns, class average, sort, filters
  (term, type, counted only). Cells are editable for manual tasks; assignment cells link to the
  marking view.
- **Task**: distribution (histogram by CAPS level), average, highest/lowest, missing list,
  per-question averages for ticked tasks (which question did the class struggle with), rubric
  criterion averages.
- **Learner**: all tasks for that learner across the teacher's classes, practice band, trend,
  and a printable one-page summary (useful for parent meetings).
- **Subject + grade**: the teacher's classes of the same subject and grade side by side
  (e.g. three Gr 10 Physical Sciences classes), common tasks compared.
- A school-wide view (HOD, grade head) needs a school role and school membership the site
  does not have yet; it is noted as phase 3+, not designed here. (The deprecated Skills Seer
  `schools` tables are not reused.)

### 6.7 Co-teachers (approved 2026-11-12)

A class can have more than one teacher, for example two teachers sharing a Grade 10 class or a
student teacher helping with marking.

- `classes.teacher_id` stays the **owner**. A new `class_teachers` table lists up to five
  **co-teachers** per class.
- **Adding one:** the owner presses "Invite a co-teacher" and gets an 8-character code (valid 7
  days, single use). The colleague types it into their own teacher dashboard. A code, not an
  email lookup, so no teacher can find out whether an address has an account. Only teacher
  accounts can accept.
- **What a co-teacher can do:** everything in the class (see learners, set assignments, mark,
  release, use the markbook) except delete or rename the class and manage the teacher list.
  The owner can remove a co-teacher; a co-teacher can leave.
- **How:** the live `is_class_teacher()` and `teacher_has_student()` check only
  `classes.teacher_id` (read from the database on 2026-11-12). Both are widened to "owner or
  co-teacher", so every policy built on them (assignments, results, drawing submissions,
  planner summaries and all the new marking tables) covers co-teachers at once. A scan of the
  live policies found four that test `classes.teacher_id` directly and must change too: the two
  owner policies on `classes` (kept for the owner; a read policy is added for co-teachers),
  "Teachers manage own assignments", `progress_events_teacher_read` and the class timetable
  policy.
- **Client code:** every place that lists "my classes" with `classes.eq('teacher_id', me)` must
  also include classes from `class_teachers` (teacher dashboard, assignment creation, Arena,
  Test Tome sharing). Ship this with the SQL, or co-teachers will not see their classes.
- **Two teachers, one script:** annotations record their author, and `submission_marks` records
  who saved last and when. The marking view shows "Being marked by Ms X" when another teacher
  saved in the last 10 minutes, and refuses a save based on an older copy (it reloads instead).
- **Moderation (phase 3)** builds on this: a moderator is a co-teacher with the moderator
  layer turned on.

### 6.6 Export

| Format | How | Notes |
|---|---|---|
| CSV | built in the browser | UTF-8 with BOM so Excel shows ê, ë, ô correctly; `;` separator option for SA-locale Excel, where the decimal separator is a comma |
| Excel (.xlsx) | SheetJS Community Edition (Apache-2.0), loaded on demand from `cdn.sheetjs.com` (the npm package is out of date), pinned | one sheet per class, frozen header row and learner column, percentages formatted, a "Totals" sheet |
| PDF / print | print stylesheet of the class grid and the learner summary | A4 landscape |
| SA-SAMS mark sheet | **feasible as a configurable export, needs a sample file** | see below |

**SA-SAMS.** SA-SAMS (the DBE's school administration system, used by most public schools) is
a Windows desktop application with no public API, so the platform cannot push marks into it.
What is realistic is a **file the school's SA-SAMS administrator imports or captures from**:
one row per learner keyed on the **learner's admission number** (hence
`class_roster.admission_no`), with surname, first names, and one raw mark per SA-SAMS
assessment task (mark out of the task's total). The exact columns, task codes and import route
differ between SA-SAMS versions and provinces, so the export is built as a **column mapping**
the teacher sets once per subject (our task → their task code, mark as raw or %), saved in
`mb_settings`. Before building it, get one real SA-SAMS mark-sheet export or import template
from a partner school and confirm the format; until then, treat this as unverified. The same
mapping covers independent-school systems (d6, Adam, Edupac, Pinnacle and others) that accept
CSV mark imports.

---

## 7. Security: RLS and functions

Existing helpers reused, **widened for co-teachers** (§6.7; same names and signatures):

- `public.is_class_teacher(p_class_id uuid)`: the caller owns or co-teaches this class.
- `public.teacher_has_student(p_student_id uuid)`: the caller owns or co-teaches a class this
  learner is in.
- New: `public.is_class_owner(p_class_id uuid)` for the few owner-only actions.

New helpers (security definer, `search_path = public`, execute revoked from `anon`, as in
`supabase-security-hardening.sql`):

- `public.can_mark_assignment(assignment_id)` → `is_class_teacher(assignments.class_id)`.
- `public.is_assignment_learner(assignment_id)` → caller is in the class and in `student_ids`
  if that is set (the same rule as the existing "Students read class assignments" policy).

Policy summary:

| Table | Learner | Class teacher | anon |
|---|---|---|---|
| `class_roster` | read own row | all, within own classes | none |
| `rubrics`, `rubric_versions` | read the version linked to an assignment they can see | owner: all (versions insert-only) | none |
| `submissions` | read own; insert own (via `start_submission()`); **no direct update** — `save_draft()`, `submit_submission()` only | read; set status to `marking` (column grant); release/reopen via RPCs | none |
| `submission_marks` | read own **after release** | all | none |
| `submission_versions` | read own | read | none; inserts only by `submit_submission()` |
| `annotations` | read on own work **after release** | all on submissions they can mark | none |
| `rubric_scores` | read own after release | all | none |
| `comment_bank` | none | owner only | none |
| `mb_tasks`, `mb_marks` | read own released marks (phase 2 "My marks") | all within own classes | none |
| `mark_audit` | none | read for own classes; insert by trigger only | none |
| storage `submission-files` | upload/read/delete under `<own id>/` while the submission is a draft | read files of submissions they can mark | none |

Integrity rules enforced in the database, not only the client:

- A learner cannot change `status`, `score`, `released_at`, `is_late` or any marking column:
  no update grant; the RPCs touch only the columns they own.
- `save_draft()` refuses unless status is `draft`/`reopened` and the caller owns the row;
  checks `pg_column_size(doc) < 1 MB` and the expected version.
- `submit_submission()` computes lateness with the server clock and any extension.
- `submission_versions` and `rubric_versions` have no update or delete grant (immutable);
  deleting the parent cascades.
- `mark_audit` rows are written by triggers on `submission_marks` (score), `submissions`
  (released_at) and `mb_marks` (mark, status).
- All size-capped text columns have `check (char_length(...) <= n)`, matching house style.

---

## 8. POPIA notes

Learner work is personal information, and most learners are children (under 18), so POPIA's
rules on children's information (sections 34–35) apply alongside the general conditions.

- **Roles.** For school use, the **school** is the responsible party and The Magic Lab is its
  **operator** (sections 20–21). Schools using the platform need a short operator agreement
  (data processing terms): purpose (teaching and assessment only), security measures, breach
  notification, return/deletion at the end. Draft: [`school-operator-agreement-draft.md`](school-operator-agreement-draft.md). Teachers who sign up individually act for their
  school; the onboarding text should say so. This is a business step to settle before schools
  use the platform for formal marks.
- **Lawful basis for children's information.** Processing that the school does for its
  educational duty, with the consent of a competent person (parent/guardian) gathered by the
  school or at learner sign-up, as the site's existing sign-up flow should already state.
  Confirm the existing consent wording covers "work you write and upload, and your teacher's
  marks and comments on it", and update `privacy.html` (sections on what is collected, purpose,
  retention, operators) before launch.
- **Cross-border transfer (section 72).** The Supabase project runs in **eu-west-1 (Ireland)**
  (checked 2026-11-12; `privacy.html` wrongly said Frankfurt and has been corrected). Users are
  South African, but the data is stored in the EU, so section 72 applies. The basis: the
  recipient is subject to the GDPR, a law giving adequate protection, plus Supabase's data
  processing agreement. Supabase does not, as far as we know, offer a South African region; if
  keeping data in South Africa becomes a requirement (for example a provincial department
  contract), that means moving the database, a separate project. The privacy policy names the
  transfer.
- **Minimality.** Collect only the work, marks and comments. No ID numbers. `admission_no` is
  optional and only for export to the school's own system. EXIF (GPS, device) is stripped from
  images by re-encoding (§2.4). The editor's image dialog reminds learners not to upload photos
  of people.
- **Security safeguards (section 19).** Private bucket, signed URLs that expire in an hour,
  RLS on every table, no anon access, immutable versions and an audit log of mark changes,
  RPCs for all learner writes.
- **Retention (approved 2026-11-12).** Default: submissions, versions and images are deleted
  **18 months after the end of the academic year** they belong to (covering moderation, appeals and the following
  year's queries); marks in `mb_marks` are kept while the class exists. Schools may set a
  different period to match their records policy. A scheduled Edge Function does the deletion
  and logs counts (not content).
- **Data subject rights.** A learner can download all their submissions with feedback (one
  HTML/PDF file per task) from "My assignments". Deleting a learner account cascades to their
  submissions, versions, annotations and images; their roster row keeps the name and marks for
  the teacher's records (anonymisable by the teacher), as the school must keep assessment
  records.
- **Teacher access.** Only the class teacher (and later a moderator the school assigns) sees a
  learner's work. The admin role does not get a blanket read policy on submissions; support
  access happens only through a logged, time-limited procedure, if ever needed.
- **Breach notification (section 22).** The operator agreement commits to telling the school
  without undue delay; the school notifies the Information Regulator and affected people.
- **AI.** If AI-assisted marking is added later (the site already has `tome_ai_marks`), it must
  be opt-in per assignment, the learner work sent to the model must be named in the privacy
  policy, and every AI suggestion must be confirmed by the teacher before it counts.

This is a design note, not legal advice; have the operator agreement and privacy text checked
by someone qualified in POPIA.

---

## 9. Migration of browser-only data

A one-time **"Move my class data to my account"** flow in the teacher dashboard, shown when
`aa:classes`, `aa:rubric`, `aa:rubric-marks` or `aa:tracker` exist in this browser:

1. **Match classes.** Each local class (name + learners) is shown beside a dropdown of the
   teacher's Supabase classes (`classes` where `teacher_id = me`), with "create a new class"
   as an option. Best guess pre-selected by name similarity.
2. **Match learners.** For each local name: auto-match to a roster row by normalised name
   (case, accents, spacing, "Surname, First" vs "First Surname"); uncertain matches are
   listed for a click to confirm; unmatched names become name-only roster rows.
3. **Import.** Rubric → `rubrics` + `rubric_versions` (§4.6). Tracker tasks → `mb_tasks`
   (`source = 'manual'`, same term, type, date, total, weight). Tracker marks → `mb_marks`.
   Rubric marks → a manual task per rubric with `rubric_scores`. Report-comment class lists
   stay local (they are a separate tool) but use the roster names from now on.
4. **Confirm and keep a backup.** A summary ("3 classes, 94 learners, 11 tasks, 812 marks").
   The flow downloads the existing JSON backup (the tools already have "Save to file") before
   writing, and keeps the local data until the teacher presses "Clear the copy in this browser".
5. The import is idempotent: it stores the local ids it imported (`import_ref`) and skips
   them on a second run.

---

## 10. Phased build plan

### Phase 0 — Foundations (about 1 week)

- Co-teachers first (§6.7): `class_teachers`, invite codes, widened `is_class_teacher()` /
  `teacher_has_student()`, the four direct policies, and the "my classes" queries in the client.
- Run the SQL for `class_roster`, rubrics and the markbook core; backfill roster rows from
  `class_members`.
- Rubric Builder saves to and loads from Supabase (§4.6 step 1), with stable ids.
- Spike: TipTap loading via import map vs. the vendored bundle (both approved); pick (§2.1).

### Phase 1 — MVP: hand in, mark, return (about 3–4 weeks)

Goal: a teacher can set a written task, learners write and submit it, the teacher marks it
with ticks, comments and a rubric, releases it, and exports the marks.

- `assignments.kind = 'written'`, due/close times, resubmit rule; client changes in
  `assignments.js` and `my-assignments.js`.
- Editor: headings, bold/italic/underline, sub/superscript, lists, tables, images
  (Storage, resize, EXIF strip), links, word count; two-layer autosave; submit, lock, reopen.
- Marking view: read-only render, ticks with marks, crosses, comments (point and range),
  margin lane, question totals, mark mode with T/X/C/J/K, analytic points and range rubrics,
  overall comment, save and release.
- Learner sees released feedback.
- CSV export of one assignment's marks.
- RLS and RPCs from the SQL draft, tested with a learner, a second learner, a teacher of
  another class and anon (each must be refused what is not theirs).
- Out of the MVP: maths, comment bank, stamps, highlights, markbook grid, Excel export,
  moderation, Afrikaans.

### Phase 2 — The markbook (about 3 weeks)

- Markbook grid, task/learner/subject views, year and term marks (`markbook-calc.js`).
- Migration flow (§9): class lists, Assessment Tracker, rubric marks.
- Test Tome import, practice band (Math Magician, lesson results).
- Excel export (SheetJS), print views.
- Comment bank and starter packs, stamps, highlights.
- Holistic, single-point, checklist and marking-grid rubrics; weighting.
- Maths in the editor; code blocks for CAT/IT.
- Per-learner extensions; paper-work photo for name-only learners.

### Phase 3 — Beyond the LMSs

- Moderation layer (green pen, moderator role assigned per class, moderation sample picker,
  moderator's marks beside the marker's), audit view.
- Pen annotations for stylus tablets.
- Carry annotations forward to a resubmission.
- SA-SAMS / school-system export mapping (after a sample file is confirmed).
- Afrikaans UI (`.af` layer, first-language check before release).
- Shared rubric library; school/HOD views once a school role exists.
- Optional, opt-in AI marking suggestions confirmed by the teacher.

### Acceptance checks for the MVP

- A learner's draft survives: closing the tab mid-sentence, going offline for 10 minutes,
  editing in two tabs (conflict prompt appears).
- A submitted learner cannot change the work through the UI or a crafted API call.
- Ticks stay on the same words at 390 px, 1024 px and 1600 px wide, and after zooming to 200%.
- Question totals and the paper total match a hand count on a 30-tick script.
- A learner never sees another learner's work, or their own marks before release.
- A teacher marks a 2-page script with the keyboard alone.
- Layouts checked at 390 px portrait and 844×390 landscape (view-only on phones), no
  sideways overflow, all three themes.

---

## 11. Decisions (founder, 2026-11-12)

| # | Question | Decision |
|---|---|---|
| 1 | Approve the spec? | **Approved.** |
| 2 | Name | **"Grading Grimoire"** for now. |
| 3 | Co-teachers | **Yes**: designed in §6.7, built in phase 0 before the rest. |
| 4 | Checked-in TipTap vendor file | **Yes, allowed** (§2.1). |
| 5 | Data location | **Users are South African; the data may stay in Ireland** (eu-west-1), under section 72 (§8). No database move. |
| 6 | Retention | **18 months after the end of the academic year**, as the default (§8). |
| 7 | POPIA paperwork | **Update.** `privacy.html` updated (learner work, teacher marks, Ireland hosting, retention); operator agreement drafted in `school-operator-agreement-draft.md`. Both need checking by someone qualified in POPIA. The privacy update goes live whenever this branch merges; the text is worded for the feature as designed. |
| 8 | What learners see after release | **Each question's total and the paper total** (§3.7). |
| 9 | SA-SAMS sample file | **Later.** The SA-SAMS export stays in phase 3 and unverified. |
