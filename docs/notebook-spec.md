# Study Spellbook: a learner notebook built into lessons

Design spec. Written 2026-11-20. **Phase 1 built 2026-11-20** (branch `feature/lesson-notebook`).

> **Decisions made by the founder, 2026-11-20 (these override anything below):**
> - **Pro only.** Writing needs the Pro or School plan, enforced in the database
>   (`notebook_can_write()` in `notebook-schema.sql`), not just in the page. Others see a
>   "part of Pro" card with an Upgrade link. If a plan lapses, the learner can still **read and
>   print** everything (reading is never gated), so no one loses work.
> - **No signed-out notes.** The notebook needs an account; there is no device-only mode.
> - **The account is the backup** so learners on shared or unreliable devices don't lose work.
>   OneDrive is a later, optional **one-way copy** into the learner's own OneDrive (deleting it
>   there never deletes anything here). Not the learner's or anyone else's single store.
> - Still open: the name (working title kept), and teacher access (notes are private for now).
>
> **What Phase 1 includes:** Notebook button on Science Sage, Tech Tower and Math Magician
> lessons; split view on wide screens, full-screen sheet on phones, pop-out window; dividers and
> pages (create, rename, colour, reorder, drag between dividers, duplicate, delete to a 30-day
> bin with Undo and Restore); rich text (headings, bold/italic/underline/strike, highlight in 5
> colours, text colour, lists, checklists, quotes, links, tables, sub/superscript); page
> backgrounds (blank, lined, grid, dotted); clipping from lessons with a link back to the section;
> device-first saving with versioned backup and keep-both-copies conflicts; printing a page, a
> divider or the whole notebook. Drawing, whiteboards, comments, templates and search are still
> Phases 2–3.

> **Name.** "Study Spellbook" is a working title that follows the site's naming rule
> (a function word plus a magical word). Change it freely. Below, "the notebook" means
> the whole feature.

---

## 0. What it is, and why

A OneNote-style notebook that lives inside The Magic Lab. On any lesson, a learner taps
**Notebook**, and their notebook opens beside the lesson. They can clip text and images
from the lesson, type, highlight, comment, add links, draw, use a whiteboard page, and print.
Notes are sorted into subject dividers. They work offline on the device and back up to the
learner's account, so the learner can open them on any device once signed in.

Why it helps learning: making notes (selecting, condensing, rewriting, drawing) is active
processing, which beats re-reading. Keeping the notebook next to the lesson removes the
juggling between tabs and apps. And every clip remembers which lesson it came from, which
OneNote can't do.

**Opt-in, as the design rules ask.** The button is always there, but nothing opens or nags
until a learner uses it.

---

## 1. What already exists that this builds on

| Need | Existing piece | Notes |
|---|---|---|
| Rich-text editor | `assets/vendor/tiptap-3.32.1.bundle.js` (built from `scripts/tiptap-bundle/`) | Grading Grimoire's editor. The notebook gets its **own** bundle with extra extensions (§5), so Grimoire is untouched. |
| Save on the device first, then the server | `assets/grimoire-write.js` | Already does local copy → server save with a version number and conflict check. The notebook reuses the same pattern, with IndexedDB instead of localStorage (more space, images). |
| Accounts, Supabase client | `auth.js` → `window.MagicLabAuth`, `sb()` in `grimoire-core.js` | Same project, same login. |
| Offline | `sw.js` (network-first, falls back to cache) | Add the notebook's files to the precache list so it opens offline even before its first use. |
| Lesson identity | `lesson-catalog.js` `ref` ids (`ss:…`, `tt:…`, `mm:…`) | Used to link a clip back to its lesson and to pick the default divider. |
| A hook on every lesson page | `assets/lesson-toc.js` (loaded by 329 Science Sage and 28 Tech Tower pages) | One line in it loads the notebook button, so we don't have to edit 357 files. Math Magician's 6 grade pages get a script tag each. |
| Design tokens, themes | `assets/magic-lab.css`, `assets/theme.js` | Notebook UI uses the tokens and respects dark / light / prism. Subject divider colours use each tool's `--t-*` accent. |

> **Change from my first suggestion.** I first suggested Yjs for sync and tldraw/Excalidraw for
> drawing. After reading the code I recommend against both: the site is plain HTML/JS with no
> React and no build step for pages, tldraw needs a paid licence key in production, and a
> notebook has a single owner, so the simpler versioned-save approach Grimoire already uses is
> enough. Drawing uses a small canvas tool of our own built on `perfect-freehand` (MIT, ~2 KB).

---

## 2. How learners use it

1. **Open.** A **Notebook** button sits in the lesson's top bar (next to Help). Tapping it:
   - **Wide screen (≥ 1100px):** opens a split view. The lesson stays on the left, the notebook
     slides in on the right, and the "On this page" list hides while it's open. The divider
     between them can be dragged.
   - **Tablet / phone:** opens the notebook as a full-screen sheet with a "Back to lesson" tab.
   - **Pop out** button (in the notebook header): opens `notebook.html` in its own named window
     (`window.open(url, 'ml-notebook')`), for two screens or side-by-side windows. Clips sent from
     the lesson still arrive there (via `BroadcastChannel`).
2. **Where it lands.** The notebook opens in the divider for the lesson's subject (created on first
   use, e.g. "Chemistry – Gr 10"), on a page named after the lesson. If that page exists, it's
   reopened. The learner can move it anywhere.
3. **Clip.** Selecting text or an image in the lesson shows a small **Add to notes** button by the
   selection. The clip is added to the open page as a quote block with a "From: *Stoichiometry*"
   link that jumps back to that lesson section. Normal copy and paste also works, and pasted lesson
   content is cleaned up the same way.
4. **Write.** Type, format, highlight, comment, add links, add checklists, insert a drawing or a
   whiteboard, add images (§4).
5. **Organise.** Sidebar: dividers (colour + name, drag to reorder) → pages (drag to reorder or move
   between dividers, rename, duplicate, delete to a 30-day bin). Search across all notes.
6. **Print.** Print a page, a divider, or the whole notebook. Clean print layout, drawings included.

---

## 3. Structure

```
Notebook (one per learner)
└── Dividers  (subject; name, colour, order — "Maths", "Chemistry", "My stuff"…)
    └── Pages  (title, background style, order, linked lesson ref)
        └── Content  (Tiptap document: text, clips, images, drawings, comments)
    └── Whiteboard pages  (a free canvas instead of a text page)
```

Learners can make as many dividers and pages as they want. Auto-created subject dividers are
just normal dividers: they can be renamed, recoloured, or deleted.

---

## 4. Features by block

| Feature | How |
|---|---|
| Type, headings, bold/italic/underline, lists, tables | Tiptap StarterKit + TableKit (already in the bundle) |
| Highlight (several colours) | `@tiptap/extension-highlight` (multicolour) |
| Text colour, font size | `TextStyle` + `Color` |
| Links | StarterKit's Link (v3), with a small link popover |
| Checklists | `TaskList` / `TaskItem` |
| Comments | Custom `comment` mark: the highlighted text keeps a note, shown in the margin on wide screens and as a pop-up on phones. Comments are notes to self (no other users in v1). |
| Clip from lesson | Custom `clip` node: sanitised HTML + `{ lessonRef, url, sectionId, title }`. Maths rendered by MathJax is clipped as its TeX source and re-rendered. |
| Images | Paste, drag in, or pick a file. Resized on the device (reuse `prepareImage` from `grimoire-core.js`), stored in IndexedDB and uploaded to a private bucket. |
| Drawing block | Custom `drawing` node in a page: a canvas with pen, highlighter, eraser, shapes, colours, undo. Strokes saved as vectors (small, sharp when printed). |
| Whiteboard page | Same canvas, full page, with pan and zoom, sticky notes, text boxes and pasted images. |
| Page backgrounds | Blank, lined, grid, dotted (also printed) |
| Templates | Cornell notes, mind map (whiteboard), vocab list, summary card |
| Stylus | Pointer events with pressure; palm rejection while a pen is down |

---

## 5. Technical design

### Files

- `notebook.html`: the full notebook (used for pop-out, and opened directly from the dashboard).
- `assets/notebook.js`: the notebook app (sidebar, editor, saving, sync).
- `assets/notebook-launcher.js`: the lesson-side button, split view, and clipping. Loaded from
  `lesson-toc.js` and Math Magician's grade pages.
- `assets/notebook-ink.js`: the drawing canvas and whiteboard.
- `assets/notebook.css`: styles and print styles.
- `assets/vendor/tiptap-notebook-3.32.1.bundle.js`: built from a new `scripts/tiptap-notebook/entry.js`
  (Grimoire's exports + Highlight, TextStyle, Color, TaskList, TaskItem, Typography).
- `assets/vendor/perfect-freehand-1.2.2.min.js`.
- `notebook-schema.sql`: tables, policies, bucket.

The split view mounts the same notebook app in a side panel on the lesson page (not an iframe), so
clipping is direct. The pop-out window runs `notebook.html`, and the two talk over `BroadcastChannel('ml-notebook')`.

### Data (Supabase)

```sql
notebook_dividers (id uuid pk, owner uuid → auth.users, name text, colour text,
                   sort float8, created_at, updated_at, deleted_at)
notebook_pages    (id uuid pk, owner uuid, divider_id uuid → notebook_dividers,
                   title text, kind text check (kind in ('page','whiteboard')),
                   background text, sort float8, lesson_ref text, lesson_url text,
                   doc jsonb, version int, text_index text,   -- plain text for search
                   created_at, updated_at, deleted_at)
storage bucket  notebook-media  (private; path = <owner>/<page id>/<file>)
```

Row-level security: **owner only** (select/insert/update/delete where `owner = auth.uid()`). Teachers
and admins cannot read notes in v1 (see §10). Pages in the bin are hard-deleted after 30 days by a
scheduled function. Deleting an account removes the notebook (`on delete cascade` + bucket cleanup).

### On the device, and syncing

- **IndexedDB** (`ml-notebook` database): `dividers`, `pages`, `media`, and an `outbox` of unsent
  changes. The notebook always reads and writes here first, so it is instant and works offline.
- **Sync** (signed in): edits save locally right away; after 1.5 s idle, the changed page is sent with
  its `version`. The server accepts it only if the version matches (same check as Grimoire's
  `draft_version`) and returns the new version.
- **Conflict** (the same page edited offline on two devices): the newer save wins and the other copy is
  kept as "*Page title* (other device)" next to it. Nothing is lost. This is rare for one learner, so we
  don't need live merging.
- **On opening:** pull everything changed since the last sync (`updated_at > lastSync`).
- **Signed out:** the notebook works on that device only, with a note: "Sign in to back up your notes."
  On sign-in, local notes are uploaded into the account.
- **Storage:** typed notes are tiny. Images are the cost: suggest a 100 MB limit per learner, with a
  meter in the notebook's settings.

### Printing

`@media print` styles render the chosen pages one after another with a divider title page, page
backgrounds kept and drawings converted to SVG. The browser's own print dialog also allows "Save as PDF".

---

## 6. Accessibility and design

- Keyboard: all toolbar buttons are real buttons with labels; `Ctrl+Alt+N` opens the notebook; Esc closes.
- The split view never covers lesson text; on narrow screens it's a separate sheet.
- Uses design tokens, follows dark / light / prism, `data-ml-no-theme` on drawing canvases (their ink colours are the learner's).
- Test at 390px portrait and 844×390 landscape; no sideways overflow.
- Afrikaans UI strings (needs a first-language check, as with other `.af` copy).

---

## 7. Privacy (POPIA)

- Notes are the learner's own and are private by default (owner-only RLS, private bucket).
- Add a section to `privacy.html`: what's stored, where, how long, how to delete.
- Clips copy lesson content into a private notebook, which is fine for personal study; printing is
  limited to the learner's own notebook.

---

## 8. Phases

| Phase | What ships | Rough effort |
|---|---|---|
| **1. Core notebook** | Notebook button on Science Sage, Tech Tower and Math Magician lessons; split view + pop-out; dividers and pages; typing, formatting, highlight, links, checklists; clipping with links back; IndexedDB + Supabase sync; print; signed-out local mode | 3–4 weeks |
| **2. Drawing** | Drawing blocks, whiteboard pages, stylus, page backgrounds, images in notes | 2–3 weeks |
| **3. Extras** | Comments, templates, search, bin, storage meter, Afrikaans UI, notebook card on the learner dashboard, other tools (Drawing Druid, Computer Codex) | 2–3 weeks |
| **Later (optional)** | Share a page with a teacher; teacher "starter notes" on a lesson; ink on top of typed pages; export to PDF/Word | — |

---

## 9. Risks

- **Scope creep.** "Like OneNote" has no end. Ship phase 1, watch how learners use it, then decide.
- **Storage costs** grow with images: limit and resize them.
- **Older school devices** (low-RAM Chromebooks): keep the editor bundle lean and load drawing code only when a drawing is opened.
- **Lesson layout variety:** Science Sage, Tech Tower and Math Magician lay out lessons differently, so the launcher must find each one's `.lesson-body`. Test one lesson per tool and grade band.

---

## 10. Open decisions

1. **Name:** keep "Study Spellbook" or choose another?
2. **Teacher access:** keep notes fully private (recommended for v1), or allow learners to share a page with a teacher?
3. **Signed-out use:** allow local-only notes for visitors who aren't signed in, or require an account?
4. **Paid feature?** Included for everyone, or part of a paid plan (lessons are already partly paywalled via `.ml-paywalled`)?
5. **Storage limit** per learner (suggested 100 MB).
