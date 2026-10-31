---
name: magic-lab-design
description: The Magic Lab's visual design language and its lesson, theme and timer conventions. Use when changing any page's look, colours, type, lesson layout, the light/dark/prism theme, the focus-reading view, or the Timer Talisman controls.
---

# The Magic Lab design language

## Principles

- **Calm and legible over decorative.** Few surfaces, few borders, no glow,
  no gradient washes, no emoji as icons. Type and spacing carry hierarchy.
- **Colour means something.** Each tool owns one accent (the index page's
  `--t-*` colours). Semantic states (`--good`, `--warn`, `--crit`) never
  borrow a subject colour.
- **Neutral ground.** The page ground is a true neutral (`#08090b`), not
  navy, so accents keep their own temperature.
- **Don't rewrite content.** Restructure lesson content (sections, layout),
  never its wording.
- **Only add a feature where it helps learning.** Opt-in by default.

## Where the tokens live

- `assets/magic-lab.css`: the shared tokens (`--ink-*`, `--text*`, `--t-*`,
  `--fam-*`, `--space-*`, `--radius-*`, `--ease-*`, `--dur-*`). Use tokens
  rather than new hex values.
- Lesson pages carry their own local variables (for example `--blue`,
  `--muted`, `--border`). Keep those names; the theme engine depends on them.
- Type: Cabinet Grotesk (Fontshare) for UI and display, JetBrains Mono for
  data such as grade ranges, counts and codes, Instrument Serif for accents.

## Themes (`assets/theme.js`)

- Three palettes, stored in `localStorage` as `ml-theme`: `dark` (default),
  `light` (derived by remapping every page colour) and `prism`.
- **Prism** keeps the dark ground and recolours every accent to the tool's
  index colour. The tool-to-colour map is `TOOL_ACCENT` in `theme.js`; update
  it if an index card colour changes. Prism also adds a 10% tool-coloured
  wash to the ground and a short rule above each lesson `h2`.
- Neutrals are never recoloured in prism. Text on accent text is lifted to
  a minimum lightness of 0.62 so it stays readable on the dark ground.
- Any new element that must not be remapped gets `data-ml-no-theme`.

## Lessons

- Lesson content lives in `.lesson-body`, with one `h2` per section.
- **Focus reading** (`assets/focus-reading.js` and `.css`) is opt-in. It
  shows one section sharp and blurs the rest. It is a visual aid only:
  add no ARIA to the blur, keep all text in order, and let keyboard and
  pointer users operate the sections as real buttons.
- It is offered only on lessons with at least four sections and none longer
  than 400 words. The introduction and the "still want this?" prompt are
  shown at most once and never on ineligible lessons.
- The table of contents (`assets/lesson-toc.js`) only appears on wide screens
  with room beside the text.

## Timer Talisman (`timer.html`)

- The control bar is `position: fixed` at the bottom. Desktop keeps the
  original large buttons.
- Below 600px wide, or in landscape on a touch device with height of 500px
  or less, the bar becomes a compact strip: the primary control keeps its
  label, the rest are 44px icon buttons with `aria-label` and `title`, and
  the strip wraps to two rows rather than scrolling sideways.
- The settings panel's segmented rows wrap on phones only.
- On touch screens, never focus a `<select>` programmatically: iOS opens its
  picker straight away. Use `focusControl()`, which focuses the close button
  on touch.

## Working in this repo

- Test layouts at 390px wide (portrait, touch) and 844×390 (landscape). A
  bar or panel that fits on desktop can still overflow on a phone.
- Check for sideways overflow: `document.documentElement.scrollWidth` should
  equal `clientWidth`.
- The service worker (`sw.js`) is network-first, so changed assets reach
  users without bumping the cache.
- Afrikaans copy (`.af.html`, and `lang="af"`) needs a first-language check
  before it is treated as final.
