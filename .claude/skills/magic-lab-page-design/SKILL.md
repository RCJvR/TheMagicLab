---
name: magic-lab-page-design
description: Design and critique Magic Lab web pages for a polished, calm, attractive result. Use when asked to design, redesign, restyle or "make a page look better" on The Magic Lab site, including the homepage, tool landing pages, lessons and the Timer Talisman. Pair with magic-lab-design for the conventions.
---

# Designing Magic Lab pages

This skill is the method. For the tokens, themes and per-feature rules, read
`.claude/skills/magic-lab-design/SKILL.md` first.

## 1. Brief before pixels

Write down, in two or three lines:

- **Who** reads it: a Grade 8 learner on a phone, a teacher on a projector,
  a parent on a laptop.
- **What they must do** on the page, in one sentence.
- **The one thing** that should be remembered after leaving it.

If the page has no clear answer to these, ask before designing.

## 2. Hierarchy first

Before choosing any colour, fix the order of attention:

1. One primary heading that says what the page is.
2. The one action or the one piece of content the brief names.
3. Supporting text, then detail, then navigation.

Every page should be readable by squinting: the top two levels should
still be distinct when the page is blurred.

## 3. Aesthetic moves that work here

- **Whitespace is a feature.** Prefer one more line of space between
  sections to one more border or card.
- **Type does the work.** A confident size step (for example 52px heading
  over 17px body) beats an extra colour or icon. Keep to the site's type
  scale; do not invent sizes.
- **One accent per view.** The tool's colour, used for the single thing
  that matters. Everything else stays neutral.
- **Align to the grid.** Use the shared gutter and the 4px spacing scale;
  every left edge should line up.
- **Real content over decoration.** A real sentence, a real diagram, or a
  real example beats an illustration of nothing.
- **Motion has a reason.** A transition explains a state change. Nothing
  moves on its own, and everything respects reduced motion.

## 4. Avoid the generic-AI look

Do not use any of these without a specific reason:

- Gradient washes across the page or behind headings.
- Glowing or coloured drop shadows under cards.
- A card in every section, all the same size and radius.
- Left-border accent stripes on cards.
- Emoji or stock icons standing in for real content.
- Five or more text colours or opacities on one screen.
- Centred, paragraph-length hero copy with two identical buttons.

## 5. Build with what exists

- Use the tokens in `assets/magic-lab.css` and each page's local variables.
- Reuse existing components (`.ml-pill`, `.ml-btn`, `.ml-tag`, `.ml-label`,
  the lesson section pattern) before writing new ones.
- Keep page-specific styles in the page's own `<style>`, as the site does.

## 6. Review before handing over

Render the page and look at it. Do not claim a page is finished without
seeing it. Use Playwright (Chromium is pre-installed; do not reinstall it):

```js
const { chromium } = require('playwright');
const b = await chromium.launch();
for (const [name, vp] of [['desk', { width: 1280, height: 800 }],
                          ['phone', { width: 390, height: 844 }]]) {
  const p = await b.newPage({ viewport: vp, isMobile: vp.width < 500, hasTouch: vp.width < 500 });
  await p.goto('http://localhost:8765/PATH.html', { waitUntil: 'load' });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: name + '.png' });
  // sideways overflow: should be false
  console.log(name, await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  await p.close();
}
await b.close();
```

Serve the repo with `python3 -m http.server 8765` from its root first. Then
check, against the brief:

- Can the one thing from the brief be found in under five seconds?
- Does the phone view fit without sideways scrolling?
- Does each colour on the page mean something?
- Does the page still look right in dark, light and prism?
- Is every text colour readable on its ground?

Report what you looked at and what you could not check (for example a real
device, or a logged-in view).

## 7. Stop and ask when

- The change alters what a learner is asked to do, or the wording of lesson
  content (content is not rewritten without approval).
- A new visual system is proposed rather than a refinement of the current one.
- The result needs a decision only the owner can make, such as a brand choice.
