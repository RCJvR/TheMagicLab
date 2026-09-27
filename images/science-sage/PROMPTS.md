# Science Sage: diagram image prompts (ChatGPT image generation)

This pack covers the Grade 7–12 Science Sage lessons that need a static diagram in the **Lesson** tab. It has eight parts:

1. [How to use this pack](#1-how-to-use-this-pack)
2. [House style decisions](#2-house-style-decisions) (the reasons behind the setup prompt)
3. [SETUP PROMPT](#3-setup-prompt-paste-once-at-the-start-of-every-chat): paste this once at the start of every chat
4. [Fix-up prompts](#4-fix-up-prompts) for correcting an image without redrawing it
5. [Audit of the existing images](#5-audit-of-the-existing-images)
6. [Do NOT use AI for these; build them in code](#6-do-not-use-ai-for-these-build-them-in-code)
7. [Image prompts by grade](#7-image-prompts-by-grade) (103 briefs: 67 tagged **A** = core/assessed, 36 tagged **B** = nice to have)
8. [Content issues found in the lessons](#8-content-issues-found-in-the-lessons-while-writing-this)

---

## 1. How to use this pack

1. **Open a new ChatGPT chat** and paste the [SETUP PROMPT](#3-setup-prompt-paste-once-at-the-start-of-every-chat). Wait for "Ready".
2. **Paste one brief at a time** (the grey block under each heading). Don't batch several into one message.
3. **Check it** against the brief's *Check* line before you save it. Every brief lists the specific mistakes image models tend to make on that subject.
4. **Fix it, don't reroll it.** If only a label or detail is wrong, use a [fix-up prompt](#4-fix-up-prompts). A full reroll often brings back errors you had already fixed.
5. **Start a fresh chat every 6–8 images.** Style drifts and mistakes carry over (gradients creep back, labels get smaller). Paste the setup prompt again.
6. **Save** as PNG to the path in the brief, e.g. `images/science-sage/<lesson-slug>/<name>.png` (the same folder pattern the existing images use).
7. **Embed** it in the lesson with the existing component (the CSS already exists in every lesson page):

```html
<div class="lesson-photo">
  <img src="../../../images/science-sage/<lesson-slug>/<name>.png" alt="<describe what the diagram shows, including the labels>" loading="lazy">
  <div class="lesson-photo-caption"><Short caption></div>
</div>
```

   Add the same block to the matching `.af.html` page with an Afrikaans `alt` and caption. For Afrikaans *labels*, see fix-up prompt **F4**.

**Rule of thumb:** the model is good at *drawing* and poor at *counting, spelling and connecting*. Every brief therefore spells out counts, exact label text and what connects to what. When you check an image, look at those three things first.

---

## 2. House style decisions

| Decision | Why |
|---|---|
| **Dark plate, `#0E1117` background** | Lessons sit on `#08090b` with dark cards. The existing images are white or cream, which glare inside the dark `lesson-photo` card. `#0E1117` is a touch lighter than the page, so the image reads as a panel. |
| **No title, heading or caption in the image** | The `lesson-photo-caption` bar already captions every image. Titles inside the image caused most of the duplicated-text errors in the current set. |
| **Labels: Cabinet Grotesk look, `#E3E8EF`** | Cabinet Grotesk is the site's display font and `#E3E8EF` is `--text`. ChatGPT can't load the exact font, so the prompt describes it and gives Inter/Helvetica as the fallback look. |
| **Numbers, formulas, units: JetBrains Mono look** | This matches the site's `--fm` mono (used in key-facts and captions), and monospace keeps subscripts and superscripts tidy. |
| **One accent per strand, used only for the key idea** | The accents match the tab colour of each lesson: Life Sciences / Life & Living `#22c55e` · FET Chemistry `#c084fc` · FET Physics `#60a5fa` · Planet Earth & Beyond `#fb923c` · Energy & Change `#fbbf24` · Matter & Materials: Gr 7 `#60a5fa`, Gr 8–9 `#fbbf24`. Each brief states its accent. |
| **3:2 landscape (1536 × 1024)** | This is ChatGPT's native landscape size and suits the 720 px lesson column. A few briefs ask for another ratio. |
| **Labels at ~2.5 % of image height** | At 720 px wide, smaller text becomes unreadable on phones. |
| **Scientific colour conventions kept** | Red for oxygenated and blue for deoxygenated blood, CPK colours for atoms, and so on. Learners see these conventions in exams, so "design" must not override them. |

*If you ever want a light version (e.g. for printed workbooks):* in the setup prompt, change the background to `#FFFFFF`, the label colour to `#1F2933` and the leader lines to `#6B7280`. Everything else stays the same.

---

## 3. SETUP PROMPT (paste once at the start of every chat)

```text
You are my scientific illustrator for "Science Sage", a South African high-school science platform (CAPS curriculum, Grades 7–12). For the rest of this chat I will send you image briefs one at a time. Produce each brief as ONE image that follows this house style exactly. Scientific accuracy beats beauty: if anything in a brief conflicts with textbook science, follow the science and tell me in one sentence after the image.

CANVAS
- Landscape 3:2 (1536 × 1024) unless the brief says otherwise.
- Solid flat background colour #0E1117 (near-black blue-grey). No gradient, vignette, texture, noise, paper grain, pattern or glow on the background.
- Clear margin of about 6% on every side. Nothing touches the edge or is cropped by it.
- The image is shown about 720 px wide on a dark web page that already has its own caption bar, so: NO title, NO heading, NO caption, NO figure number inside the image.

ILLUSTRATION STYLE
- Modern educational textbook illustration: clean flat vector shapes, crisp even contour lines (one consistent line weight throughout) and at most one soft tonal step of shading to show form. A precise editorial diagram, not concept art, not a painting, not a 3D render.
- Muted, slightly desaturated fills, lifted enough in value to read clearly on the dark background. Standard scientific colour conventions: oxygenated blood red, deoxygenated blood blue, nerves pale yellow, bone ivory, plant tissue green, water pale blue. CPK colours for atoms: carbon mid-grey, hydrogen white, oxygen red, nitrogen blue, chlorine green, sodium violet, sulfur yellow.
- Cross-sections are drawn straight-on (orthographic), never at dramatic angles. One view per object: never merge a side view and a front view into one hybrid drawing.
- Real anatomy, real apparatus, correct proportions. Asymmetric things stay asymmetric (heart, liver, gut, lab setups). When the brief gives a number of anything, draw exactly that many.
- Each brief names an ACCENT colour. Use it sparingly and only for the key idea (the main flow arrows, or the pathway or part the diagram is about). Everything else stays neutral or follows convention.

LABELS AND TEXT
- Use ONLY the labels listed in the brief, spelled exactly as written, and each label exactly once. Do not add, merge, shorten, translate or invent labels, letters, codes or numbers.
- Label font: a clean geometric grotesque sans-serif in the style of Cabinet Grotesk (fallback look: Inter or Helvetica Neue), medium weight, colour #E3E8EF, sentence case. Chemical formulas, charges, numbers and units: a monospaced font in the style of JetBrains Mono, with correct subscripts and superscripts (CO₂, Na⁺, cm³, 23.5°).
- Labels are large and legible: cap height about 2.5% of the image height. Nothing smaller.
- Place labels outside the drawing in tidy vertical columns (left column right-aligned, right column left-aligned). Join each label to its structure with a thin straight leader line in #8B95A5 (at most one bend) that ends in a small dot exactly on the correct structure. Leader lines never cross each other and never pass through other labels.
- Arrows: one consistent style, solid stroke, a single clean arrowhead, pointing exactly the way the brief says.
- Never write my instructions into the image: no hex codes, font names, "inset", "called out", "label", "e.g." or bracketed notes.

DO NOT (common AI-image faults)
- No glow, neon, bloom, lens flare, sparkles, bokeh, light rays, smoke, dramatic lighting, glossy/plastic 3D rendering or airbrushed gradients.
- No decorative filler: no DNA strips, floating molecules, microbes in corners, hexagon grids, circuit patterns, ghosted body outlines, magnifying-glass icons or background scenery unless the brief asks for them.
- No watermark, logo, signature, or star/sparkle mark in any corner.
- No gibberish or pseudo-text anywhere, including on apparatus, screens, scales and bottles. If a scale needs numbers, the brief gives them; otherwise leave it unmarked.
- No extra or missing fingers, no merged or duplicated parts, no extra planets, rings, legs or petals, and no impossible connections: every tube, vessel, duct and wire connects where it really connects.
- No zoom circles unless the brief asks for a zoom. If it does, draw the zoom as a rounded rectangle joined to its source area by two thin lines.

After each image, write two short lines: (1) the labels you used, in order; (2) anything in the science you were unsure about. Reply "Ready" now and wait for the first brief.
```

---

## 4. Fix-up prompts

Use these instead of rerolling.

**F1 — Correct a label or detail (keeps the rest):**
```text
Edit the last image. Keep everything else exactly the same: composition, colours, line work, every other label. Change ONLY this: <e.g. the label "Oesphagus" must read "Oesophagus"> / <the arrow between X and Y must point towards Y>.
```

**F2 — Remove additions:**
```text
Edit the last image. Remove <the duplicated "Stomach" label on the right / the sparkle in the bottom-right corner / the background gradient>. Change nothing else.
```

**F3 — Text-free base (for diagrams where the model keeps misspelling or misplacing labels):**
```text
Recreate the last image identically but with ALL text removed. Keep every leader line and its end dot exactly where it is, so I can add the labels myself.
```
Then set the labels yourself in Figma or Canva using Cabinet Grotesk Medium, `#E3E8EF`, at 2.5 % of image height. This is the most reliable route for complex diagrams (heart, nephron, flower, protein synthesis).

**F4 — Afrikaans version (the `.af.html` pages currently show English-labelled images):**
```text
Edit the last image. Keep it identical in every way except the label text. Replace each label exactly as follows:
"Cornea" → "Kornea"
"Lens" → "Lens"
"Retina" → "Retina"
"Optic nerve" → "Oogsenuwee"
(… one line per label …)
```
Take the Afrikaans terms from the matching `.af.html` lesson so the labels match the lesson text. Save as `<name>.af.png` and point the `.af.html` `<img>` at it.

**F5 — Style drift:**
```text
This image has drifted from the house style (<gradient background / small text / glow / title added>). Regenerate the same content following the house style from my first message exactly.
```

---

## 5. Audit of the existing images

None of the current images are in the house style: they use white or cream backgrounds and two different illustration looks. Several also contain science or text errors. Recommendation: **regenerate all of them** with the briefs below. The ones marked ✗ are wrong and should be replaced first.

| Existing file | Status | Problems found | Replacement brief |
|---|---|---|---|
| `nervous-system-senses/eye-anatomy.png` | ✗ | Iris, pupil, ciliary muscle and suspensory ligaments are missing, although the lesson's light pathway names the pupil and the next section is about accommodation. The single arrow from nowhere doesn't show refraction. | G12-R1 |
| `nervous-system-senses/reflex-arc.png` | ✗ | The sensory neuron's cell body is drawn at the fingertip (it belongs in the dorsal root ganglion). Both roots have a ganglion. "Receptor" points at the hot rod, not the skin. The rod has a glow. Capitalisation is mixed. | G12-R2 |
| `nervous-system-senses/neuron-structure.png` | ~ | The myelin sheath is drawn but not labelled, and there is no arrow for the direction of the impulse. "Neurotransmitter & response" is vague. | G12-R3 |
| `nervous-system-senses/ear-anatomy.png` | ? | Not checked in detail. Regenerate for style. | G12-R4 |
| `human-endocrine-system/endocrine-glands-overview.png` | ✗ | One body has both testes and ovaries. There are ghosted body outlines in the background, a magnifying-glass cliché, and the label "Pituitary - Master Gland". | G12-R5 |
| `human-endocrine-system/pancreas-endocrine-exocrine.png` | ✗ | "Exocrine function (ducted secretion)" appears **twice**. Ghost body outline in the background. | G12-R6 |
| `human-endocrine-system/hormone-target-specificity.png` | ✗ | A liver organ is pasted on top of a cell cluster. Hormones pour out of the open cut end of a vessel instead of leaving through a capillary wall. | G12-R7 |
| `human-endocrine-system/nervous-vs-endocrine-control.png` | ✗ | Both headings are duplicated (top and bottom). A neon ECG zigzag glows on the axon. | G12-R8 |
| `human-reproduction/male-reproductive-system.png` | ✗ | The "epididymis" leader points at the penis. The route of the sperm duct is wrong. Urethra and bladder are unlabelled. There is a sparkle watermark (bottom right). | G12-R9 |
| `human-reproduction/female-reproductive-system.png` | ✗ | A front-view uterus is merged with a side-view pelvis (impossible hybrid). "Ovary" and "fallopian tube" are labelled twice. Sparkle watermark. | G12-R10 |
| `human-reproduction/fertilisation-implantation.png` | ✗ | Fertilisation is drawn at the fimbriae (it happens in the upper third of the oviduct). "Blastocyst", "Uterine blood vessels", "Fertilisation" and "Implantation" each appear twice. Sparkle watermark. | G12-R11 |
| `human-reproduction/menstrual-cycle-hormones.png` | ✗ | This is a graph, which should be built in code (section 6). Leaked prompt text: "(e.g. arbitrary units or ng/mL)". | code |
| `04-photosynthesis-leaf-cross-section-NEEDS-FIX-typo.jfif` | ✗ | Typo (already flagged). Not used in any lesson yet. | G8-09 |
| `07-nutrients-digestive-tract-NEEDS-FIX-colon-labels.jfif` | ✗ | "Ascending", "Jejunum" and "Ileum" are duplicated; "Stomach" appears twice. Mouth, gut and colon are drawn as separate pieces rather than one continuous tract. DNA strip. Letter codes. | G9-13 |
| `09-reproduction-plants-flower-NEEDS-REDO-fetus-in-ovule.jfif` | ✗ | A **human fetus inside the ovule**. Leaked prompt text "(called out)". DNA strip. | G9-14 |
| `10-systems-human-body-heart-double-pump-OK.jfif` | ~ | Invented labels ("Double pump 1/2"), a floating "Deoxygenated" label, DNA strip. | G10-15 |
| `02`, `03`, `06`, `08`, `11` (.jfif) | ~ | Not used in any lesson. Decorative DNA strip and cream background. Regenerate for style if you want to use them. | — |

---

## 6. Do NOT use AI for these; build them in code

Image models can't reliably place points on axes, keep geometry exact, count particles or get symbols right. These items belong in SVG or canvas (the repo already has `assets/plot-kit.js`, `science-sage/lab-graph.html` and `reaction-graphs.html`):

- **Any graph:** motion graphs (Gr 10 motion, Gr 12 projectiles), potential energy diagrams, Maxwell–Boltzmann curves, rate/concentration–time graphs, titration curves, population growth curves, the menstrual-cycle hormone graph, and cooling/heating curves.
- **Circuit diagrams and circuit symbols** (all circuits lessons).
- **Free-body diagrams, vector diagrams, inclined planes, electric field line patterns.**
- **Moon phases and tides.** Models almost always light the wrong side, and the lesson needs the Southern Hemisphere view (see section 8).
- **Periodic tables, Bohr diagrams, Lewis dot diagrams, structural and condensed formulae** (organic chemistry), and **particle diagrams where counts matter** (element / compound / mixture boxes).
- **Punnett squares, pedigrees, karyotypes, dichotomous keys, classification flowcharts, negative-feedback loops, the Haber and Contact process flow charts, the geological timescale.**
- **Emission and absorption line spectra** (line positions carry the meaning).

---

## 7. Image prompts by grade

Each entry gives the file path, the lesson and the heading to place it after, and the priority. The grey block is what you paste; the *Check* line lists what to verify.

### Grade 7

#### G7-01 · Earth's internal structure — **A**
`earth-moon/earth-layers.png` · `gr7/earth/earth-moon.html` → after *Earth's Internal Structure*
```text
Brief G7-01. ACCENT #fb923c.
Planet Earth with a quarter-wedge cut away to show its internal layers, viewed straight-on, with Africa facing the viewer on the uncut surface. Layers drawn as concentric shells in these approximate proportions of Earth's radius: inner core to 19%, outer core to 55%, mantle up to the surface, and the crust as a very thin outer skin (slightly exaggerated so it is visible, but still clearly the thinnest layer). Colours: crust grey-brown, mantle deep orange-brown, outer core bright orange (liquid), inner core pale yellow (solid). Use the accent only as a thin highlight outlining the cut faces.
Labels (exactly these): "Crust (5–70 km)"; "Mantle (~2 900 km)"; "Outer core: liquid iron and nickel (~2 200 km)"; "Inner core: solid iron and nickel (~1 200 km radius)".
```
*Check:* the crust is the thinnest layer by far; the mantle is the thickest; the four layers are in the right order; the continents look like real continents.

#### G7-02 · Why we have seasons (Southern Hemisphere) — **A**
`seasons/seasons-orbit.png` · `gr7/earth/seasons.html` → after *Earth's Axial Tilt*
```text
Brief G7-02. ACCENT #fb923c.
The Sun in the centre, drawn as a simple flat disc (no glow, no rays), with Earth's orbit as a thin ellipse seen from slightly above. Show Earth at exactly TWO positions: on the left of the Sun (December) and on the right of the Sun (June). At both positions Earth's axis is tilted 23.5° from vertical and leans the SAME way in space: the north end tilts to the upper-left in both positions. This means that in December (left position) the Southern Hemisphere leans towards the Sun, and in June (right position) it leans away. Draw the axis as a thin line through each Earth, the equator as a line around each Earth, and a small accent-coloured dot marking South Africa. Shade the half of each Earth facing away from the Sun darker (night side). Draw one small curved arrow on the orbit showing anticlockwise motion as seen from above.
Labels: "December: summer in South Africa"; "June: winter in South Africa"; "Axis"; "Equator"; "23.5°"; "South Africa".
```
*Check:* both axes are parallel (the most common error is tilting them in opposite directions); in December the Southern Hemisphere leans towards the Sun; the day/night shading faces the Sun at both positions.

#### G7-03 · Solar and lunar eclipses — **B**
`earth-moon/eclipses.png` · `gr7/earth/earth-moon.html` → after *Eclipses*
```text
Brief G7-03. ACCENT #fb923c.
Two horizontal diagrams stacked one above the other, each with the Sun on the far left drawn as a flat disc (no glow), and the note "Not to scale" once in small mono text at the bottom right.
Top: SOLAR ECLIPSE. Order left to right: Sun, Moon, Earth. The Moon's shadow is a dark cone (umbra) that narrows to a point just reaching Earth's surface, surrounded by a lighter wider cone (penumbra). The small spot where the umbra touches Earth is marked with an accent dot.
Bottom: LUNAR ECLIPSE. Order left to right: Sun, Earth, Moon. Earth's umbra cone extends to the right and the Moon sits inside it, tinted dull red-brown.
Straight shadow edges drawn as thin lines from the edges of the Sun past the edges of the blocking body.
Labels: "Solar eclipse"; "Lunar eclipse"; "Sun" (once, on the top diagram); "Moon" (on each diagram, so twice, the only allowed repeat); "Earth" (on each diagram, twice); "Umbra"; "Penumbra"; "Not to scale".
```
*Check:* the order of bodies is right in each diagram; the umbra converges (narrows) behind the Moon; the lunar-eclipse Moon is reddish, not black.

#### G7-04 · The five kingdoms — **B**
`biodiversity/five-kingdoms.png` · `gr7/life/biodiversity.html` → after *The Five Kingdoms*
```text
Brief G7-04. ACCENT #22c55e.
Five equal rounded-rectangle panels in one row, each with a thin #2A313C border, and a kingdom name centred at the top of each panel in the accent colour.
1 Monera: three rod-shaped and two round bacteria, each with a cell wall and loose circular DNA but NO nucleus.
2 Protista: one amoeba with pseudopodia and a nucleus, and one slipper-shaped Paramecium covered in cilia.
3 Fungi: a single mushroom (cap, gills, stalk) growing from a patch of thread-like hyphae, plus a few budding yeast cells.
4 Plantae: a King Protea flower head on its stem with leaves, and a small fern frond.
5 Animalia: a beetle (exactly 6 legs), a fish, and a small mammal (e.g. a meerkat standing upright, 4 limbs).
Labels (the five panel titles only): "Monera"; "Protista"; "Fungi"; "Plantae"; "Animalia".
```
*Check:* the bacteria have no nucleus; the beetle has 6 legs; there are no extra organisms or labels.

#### G7-05 · Four separation methods — **A**
`separating-mixtures/separation-methods.png` · `gr7/matter/separating-mixtures.html` → after *Methods of Separating Mixtures*
```text
Brief G7-05. ACCENT #60a5fa.
Four school-laboratory set-ups in a 2 × 2 grid, drawn as clean glassware line illustrations with pale translucent liquids.
Top-left FILTRATION: a glass funnel holding a cone of folded filter paper in a clamp on a retort stand; muddy sandy water in the paper; sand (residue) caught in the paper; clear filtrate dripping into a beaker below.
Top-right EVAPORATION: an evaporating basin of salt solution on a gauze and tripod over a Bunsen burner with a blue flame; white salt crystals forming at the edge of the liquid.
Bottom-left SIMPLE DISTILLATION: a round-bottomed flask of salt water over a Bunsen burner, a thermometer bulb level with the side-arm, a sloping Liebig condenser with cooling water entering at the LOWER end and leaving at the UPPER end (show with two small arrows), and pure water dripping into a beaker at the end of the condenser.
Bottom-right PAPER CHROMATOGRAPHY: a strip of chromatography paper hanging in a beaker of solvent; a pencil start line just ABOVE the solvent level; an ink spot on the line separated into three coloured spots higher up the paper.
Use the accent colour only for the four small section titles and the water-flow arrows.
Labels: "Filtration"; "Evaporation"; "Distillation"; "Chromatography"; "Residue"; "Filtrate"; "Condenser"; "Water in"; "Water out"; "Solvent"; "Start line".
```
*Check:* condenser water goes in at the bottom and out at the top; the thermometer bulb is at the side-arm, not in the liquid; the start line is above the solvent; the filtrate is clear.

#### G7-06 · Drinking-water treatment — **B**
`separating-mixtures/water-treatment.png` · `gr7/matter/separating-mixtures.html` → after *Real-world application: Drinking water treatment*
```text
Brief G7-06. ACCENT #60a5fa.
A simplified side-view cutaway of a water treatment plant read from left to right as one continuous flow, with thick accent-coloured arrows between the stages: river intake with a metal screen catching sticks and leaves → a settling (sedimentation) tank with mud collected on the bottom → a filter tank showing layers of sand over gravel → a chlorination tank with a small dosing pipe → a reservoir → a pipe leading to a house tap. All tanks are open-topped concrete, drawn flat and simple.
Labels: "Screening (sieving)"; "Sedimentation"; "Filtration (sand and gravel)"; "Chlorination"; "Clean water to homes".
```
*Check:* the stages are in this order; the flow arrows all point left to right; the filter layers are sand on top of gravel.

### Grade 8

#### G8-01 · The Solar System — **A**
`solar-system/planets-in-order.png` · `gr8/earth/solar-system.html` → after *The eight planets*
```text
Brief G8-01. ACCENT #fb923c. Canvas: wide 16:9 (1792 × 1024).
A left-to-right row: a large partial arc of the Sun cut off by the left edge of the canvas (the only thing allowed to touch the edge), then EXACTLY eight planets in this order, their centres on one horizontal line: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Between Mars and Jupiter draw a loose band of small grey rocks (asteroid belt). Relative sizes roughly correct: Jupiter largest, Saturn slightly smaller with flat rings seen at a slight tilt, Uranus and Neptune about 4× Earth, Mercury smallest, Venus slightly smaller than Earth, Mars about half of Earth. Recognisable flat colours: Mercury grey, Venus pale yellow-cream, Earth blue with white clouds and green-brown land, Mars rust-red, Jupiter banded cream and brown with the Great Red Spot, Saturn pale gold, Uranus pale cyan, Neptune deeper blue. Only Saturn has visible rings. No stars, no nebula, no moons.
Labels: "Sun"; "Mercury"; "Venus"; "Earth"; "Mars"; "Asteroid belt"; "Jupiter"; "Saturn"; "Uranus"; "Neptune"; "Sizes roughly to scale, distances not to scale".
```
*Check:* exactly 8 planets; the order matches the mnemonic; only Saturn has rings; Jupiter is the biggest; no Pluto.

#### G8-02 · Types of galaxies and where we are — **B**
`beyond-solar-system/galaxy-types.png` · `gr8/earth/beyond-solar-system.html` → after *Types of galaxies*
```text
Brief G8-02. ACCENT #fb923c.
Left, taking half the width: the Milky Way as a barred spiral seen face-on, rendered in a restrained flat-illustrative way (soft pale stars, no glow or bloom): a central bar and spiral arms. Mark the Sun's position with a small accent dot about halfway from the centre to the edge, on one of the arms, and label the distance with a thin accent line from the centre to the dot.
Right, three small panels stacked vertically: a spiral galaxy (tilted), an elliptical galaxy (smooth oval, no arms), and an irregular galaxy (patchy, no shape, like the Large Magellanic Cloud).
Labels: "Milky Way (barred spiral)"; "Our Sun"; "~26 000 light years"; "Spiral"; "Elliptical"; "Irregular (e.g. Magellanic Clouds)".
```
*Check:* the elliptical has no arms; the Sun is not at the centre; there is no lens flare or glow.

#### G8-03 · Refracting vs reflecting telescope — **B**
`telescopes/refracting-vs-reflecting.png` · `gr8/earth/telescopes.html` → after *Types of telescopes*
```text
Brief G8-03. ACCENT #fb923c.
Two simplified cutaway telescopes side by side, each a plain tube seen from the side, with light rays drawn as thin accent lines.
Left, REFRACTING: parallel rays enter the front, pass through a large convex objective lens at the front, converge to a focus, then pass through a small eyepiece lens at the back, where an eye icon is drawn.
Right, REFLECTING (Newtonian): parallel rays enter the open front, travel down the tube to a concave primary mirror at the back, reflect forward and converge onto a small flat secondary mirror tilted at 45° near the front, which sends them sideways out through an eyepiece on the side of the tube.
Labels: "Refracting telescope"; "Reflecting telescope"; "Objective lens"; "Eyepiece"; "Concave mirror"; "Flat mirror".
```
*Check:* rays actually refract at the lenses and reflect at the mirrors; the Newtonian eyepiece is on the side; the primary mirror is concave.

#### G8-04 · From power station to home — **A**
`electricity-grid/grid-journey.png` · `gr8/energy/electricity-grid.html` → after *The journey from power station to home* (also usable in `gr9/energy/national-electricity-supply.html` → *Transmission*)
```text
Brief G8-04. ACCENT #fbbf24. Canvas: wide 16:9 (1792 × 1024).
A flat side-view landscape strip read left to right, all objects sitting on one ground line: a coal-fired power station (boiler building, turbine hall, two cooling towers with pale steam, one chimney) → a step-up transformer yard → tall steel lattice pylons carrying high-voltage lines across a long distance (draw three pylons with a gap to suggest distance) → a substation with a step-down transformer → a wooden distribution pole with a small pole transformer → a house with a lit window. A thin accent line runs along the cables, with small accent arrows pointing right to show the direction of energy transfer.
Labels: "Power station (11–22 kV)"; "Step-up transformer"; "Transmission lines (~400 kV)"; "Substation: step-down transformer"; "Distribution"; "Home (230 V)".
```
*Check:* step-up happens at the power station and step-down at the substation; the voltages are attached to the right stages; the pylons carry three conductors each, consistently.

#### G8-05 · Dispersion of white light by a prism — **A**
`light/prism-dispersion.png` · `gr8/energy/light.html` → after *The spectrum of visible light*
```text
Brief G8-05. ACCENT #fbbf24.
An equilateral glass triangular prism, point up, drawn as a pale translucent triangle. One narrow white ray arrives from the left, angled slightly upward, and strikes the left face. Draw a dashed normal line at the entry point. Inside the prism the ray bends TOWARDS the normal and begins to fan slightly. At the right face each colour bends AWAY from the normal and the fan widens into a spectrum projected onto a plain screen at the right. From top to bottom on the screen: red, orange, yellow, green, blue, indigo, violet, so red is deviated least (highest) and violet most (lowest). Colours are flat bands, not glowing.
Labels: "White light"; "Normal"; "Glass prism"; "Red (deviated least)"; "Violet (deviated most)"; "Spectrum".
```
*Check:* violet bends the most (lowest on the screen); the order is ROYGBIV from top to bottom; the ray bends at both faces (not only at the exit).

#### G8-06 · Sound as a longitudinal wave — **A**
`sound/longitudinal-wave.png` · `gr8/energy/sound.html` → after *Sound as a longitudinal wave*
```text
Brief G8-06. ACCENT #fbbf24.
On the left, a tuning fork vibrating (two small curved motion marks beside the prongs only). To its right, a long horizontal band of air particles drawn as small neutral dots: regions where the dots are crowded together (compressions) alternate evenly with regions where they are spread apart (rarefactions), repeating 4 times across the band. Under the band, a thick accent arrow pointing right labelled "Direction of wave travel". Above one particle, a short double-headed arrow parallel to the travel direction shows that particles vibrate back and forth along the same line. A bracket above the band spans from the centre of one compression to the centre of the next.
Labels: "Tuning fork"; "Compression"; "Rarefaction"; "Wavelength (λ)"; "Particles vibrate parallel to the direction of travel"; "Direction of wave travel".
```
*Check:* the particle-vibration arrow is horizontal (parallel), not vertical; the wavelength bracket runs from compression to compression; the spacing is even.

#### G8-07 · Charging by friction — **B**
`static-electricity/charging-by-friction.png` · `gr8/energy/static-electricity.html` → after *Charging by friction*
```text
Brief G8-07. ACCENT #fbbf24.
Two panels, left and right.
Left, BEFORE: a plastic rod and a woollen cloth side by side, each showing an equal number of small "+" and "−" symbols (6 of each on each object), labelled neutral.
Right, AFTER RUBBING: the rod now shows 6 "+" and 10 "−" (negatively charged) and the cloth shows 6 "+" and 2 "−" (positively charged). A curved accent arrow from the cloth to the rod is labelled "Electrons transferred". The "+" signs never move.
Labels: "Before rubbing: both neutral"; "After rubbing"; "Plastic rod: negative"; "Woollen cloth: positive"; "Electrons transferred".
```
*Check:* the counts add up (4 electrons move from cloth to rod); only the "−" signs move; the plus counts are the same before and after.

#### G8-08 · A savanna food web — **A**
`ecosystems/savanna-food-web.png` · `gr8/life/ecosystems.html` → after *Food Chains and Food Webs*
```text
Brief G8-08. ACCENT #22c55e.
A food web of South African savanna organisms drawn as small, clean, naturalistic flat illustrations (no background scenery), arranged in trophic rows from bottom to top.
Bottom row (producers): grass; acacia tree.
Second row (herbivores): zebra; impala; giraffe.
Third row: cheetah; black-backed jackal.
Top: lion.
Side: dung beetle and fungi, labelled decomposers.
Arrows point FROM the organism that is eaten TO the organism that eats it (direction of energy flow), drawn in the accent colour, exactly these 11 arrows: grass→zebra, grass→impala, acacia→giraffe, acacia→impala, zebra→lion, impala→lion, impala→cheetah, impala→jackal, giraffe→lion, cheetah→lion (rare, dashed), and one arrow from the lion to the decomposers.
Labels (organism names only, each once): "Grass"; "Acacia"; "Zebra"; "Impala"; "Giraffe"; "Cheetah"; "Jackal"; "Lion"; "Decomposers".
```
*Check:* **every** arrowhead points at the eater; there are exactly 11 arrows; the animals are anatomically right (giraffe ossicones, zebra stripes, spotted cheetah with tear marks).

#### G8-09 · Leaf cross-section (replaces `04-…-NEEDS-FIX-typo`) — **A**
`photosynthesis/leaf-cross-section.png` · `gr8/life/photosynthesis.html` → after *Where does photosynthesis happen?*
```text
Brief G8-09. ACCENT #22c55e.
A rectangular block cut from a leaf and shown in straight-on cross-section, drawn as in a textbook. From top to bottom: a thin transparent waxy cuticle; a single layer of flat, colourless upper epidermis cells; a layer of tall, tightly packed column-shaped palisade cells packed with many green chloroplasts; spongy mesophyll made of rounded cells with fewer chloroplasts and large air spaces between them; a vein (vascular bundle) in the spongy layer showing xylem (upper part, wide empty tubes) and phloem (lower part, smaller cells); a single layer of lower epidermis with ONE stoma, opened between two bean-shaped guard cells (the guard cells contain chloroplasts). Accent arrows: CO₂ entering through the stoma, O₂ and water vapour leaving.
Labels: "Cuticle"; "Upper epidermis"; "Palisade mesophyll"; "Spongy mesophyll"; "Air space"; "Xylem"; "Phloem"; "Lower epidermis"; "Guard cell"; "Stoma"; "CO₂ in"; "O₂ and H₂O out".
```
*Check:* the stoma is in the LOWER epidermis; the palisade has the most chloroplasts; the epidermis cells have none (guard cells do); xylem sits above phloem in the vein; spelling of "mesophyll" and "stoma".

#### G8-10 · The carbon cycle — **B**
`photosynthesis/carbon-cycle.png` · `gr8/life/photosynthesis.html` → after *Role in the Carbon Cycle* (also usable in `gr8/life/ecosystems.html` → *Nutrient Cycles*)
```text
Brief G8-10. ACCENT #22c55e.
A simple flat landscape scene with a band of sky at the top containing a rounded label area for "CO₂ in the atmosphere". On the ground: a tree, a cow, a fallen log with mushrooms, a small factory with a chimney and a car, and underground (cutaway) a coal seam. Accent arrows show carbon movement, exactly these 6: atmosphere → tree (photosynthesis); tree → cow (feeding); tree → atmosphere (respiration); cow → atmosphere (respiration); log and mushrooms → atmosphere (decomposition); factory and car → atmosphere (combustion). Draw a thin neutral dashed arrow from dead plants down to the coal seam.
Labels: "CO₂ in the atmosphere"; "Photosynthesis"; "Respiration" (next to the tree arrow only); "Feeding"; "Decomposition"; "Combustion"; "Fossil fuels".
```
*Check:* photosynthesis is the only arrow going INTO the plant from the air; respiration arrows go OUT of the organisms; there are 6 accent arrows.

#### G8-11 · History of atomic models — **A**
`atoms/atomic-models-timeline.png` · `gr8/matter/atoms.html` → after *History of atomic models* (also usable in `gr10/chemistry/atomic-structure.html` → *History of Atomic Models*)
```text
Brief G8-11. ACCENT #fbbf24.
Four atom models in a left-to-right row on a thin horizontal timeline, with the year in mono text under each.
1 Dalton 1803: a plain solid sphere, no internal detail.
2 Thomson 1904: a large pale sphere of positive charge with 8 small "−" electrons scattered evenly through it (plum pudding).
3 Rutherford 1911: a tiny dense "+" nucleus at the centre, mostly empty space around it, and 6 electrons scattered around it on no fixed paths.
4 Bohr 1913: a small nucleus with fixed circular orbits (shells) drawn as thin rings: 2 electrons on the inner ring and 4 on the second ring (carbon).
Accent only on the timeline and the year dots.
Labels: "Dalton: solid sphere"; "Thomson: plum pudding"; "Rutherford: nuclear model"; "Bohr: electron shells"; "1803"; "1904"; "1911"; "1913".
```
*Check:* the Rutherford nucleus is tiny; the Bohr atom has 2 electrons in shell 1 and 4 in shell 2; the Thomson electrons are inside the sphere.

#### G8-12 · States of matter and changes of state — **B**
`particle-model/states-and-changes.png` · `gr8/matter/particle-model.html` → after *Change of state*
```text
Brief G8-12. ACCENT #fbbf24.
Three identical square glass containers in a row, each a cutaway, particles drawn as identical neutral spheres.
SOLID (left): particles touching in a regular grid, 6 × 6, with tiny vibration marks.
LIQUID (middle): the same number of particles, touching but irregular, filling the bottom two-thirds of the container with a flat surface.
GAS (right): 10 particles far apart, spread through the whole container, each with a short motion trail showing random directions.
Curved accent arrows between the containers: above, solid→liquid "Melting" and liquid→gas "Evaporation / boiling"; below, gas→liquid "Condensation" and liquid→solid "Freezing".
Labels: "Solid"; "Liquid"; "Gas"; "Melting"; "Evaporation / boiling"; "Condensation"; "Freezing".
```
*Check:* the arrows point the right way for each process name; liquid particles still touch; gas particles are far apart.

### Grade 9

#### G9-01 · Layers of the atmosphere — **A**
`atmosphere/atmosphere-layers.png` · `gr9/earth/atmosphere.html` → after *The Four Main Layers*
```text
Brief G9-01. ACCENT #fb923c. Canvas: portrait 2:3 (1024 × 1536).
A vertical cross-section of the atmosphere above a thin strip of Earth's curved surface at the bottom (a mountain and a few clouds low down). Four horizontal bands with thin boundary lines at these heights on a mono altitude scale on the left: 0, 12, 50, 80 km, with the top band continuing upward and fading into a flat darker tone. Inside the bands, small simple icons only: clouds and a passenger jet in the troposphere; a thin accent-coloured ozone band between 20 and 35 km in the stratosphere; a few short meteor streaks in the mesosphere; a small aurora ribbon and the International Space Station in the thermosphere. On the right, a thin temperature line that zig-zags: decreasing with height through the troposphere, increasing through the stratosphere, decreasing through the mesosphere, increasing through the thermosphere.
Labels: "Troposphere"; "Stratosphere"; "Mesosphere"; "Thermosphere"; "Ozone layer"; "0 km"; "12 km"; "50 km"; "80 km"; "Temperature".
```
*Check:* the ozone layer is inside the stratosphere; the temperature line goes down-up-down-up; the altitude numbers are at the boundaries; the layers are in the right order.

#### G9-02 · Natural vs enhanced greenhouse effect — **A**
`atmosphere/greenhouse-effect.png` · `gr9/earth/atmosphere.html` → after *The Greenhouse Effect*; also `gr9/earth/climate-change.html` → after *The Enhanced Greenhouse Effect*
```text
Brief G9-02. ACCENT #fb923c.
Two side-by-side panels, each showing a curved strip of Earth's surface at the bottom, a translucent layer of atmosphere above it (thin in the left panel, visibly thicker in the right), and the Sun as a flat disc in the top-left corner of each panel.
In both panels: straight yellow arrows (short-wave solar radiation) pass through the atmosphere and hit the ground; wavy red arrows (long-wave infrared) rise from the ground. Left, NATURAL: about half of the infrared arrows escape to space and half are re-radiated back down by the greenhouse gas layer. Right, ENHANCED: most infrared arrows are re-radiated back down and only a few escape. Include a factory chimney and a car on the ground in the right panel only.
Labels: "Natural greenhouse effect"; "Enhanced greenhouse effect"; "Short-wave solar radiation"; "Long-wave infrared radiation"; "Greenhouse gases (CO₂, CH₄, H₂O)"; "Re-radiated heat".
```
*Check:* incoming arrows are straight and outgoing ones wavy; incoming radiation isn't shown being trapped; the enhanced panel shows more heat returned and less escaping.

#### G9-03 · Earth's four spheres — **B**
`earth-as-a-system/four-spheres.png` · `gr9/earth/earth-as-a-system.html` → after *The four spheres*
```text
Brief G9-03. ACCENT #fb923c.
One flat, stylised landscape cross-section: sky with clouds at the top, a mountain with exposed rock layers cut away to show underground strata, a river flowing into the sea, trees, grazing antelope and a person. Four thin accent-coloured leader brackets mark each sphere: the air; the water (river, sea, clouds); the rocks and soil (including the cutaway); all the living things. Draw two curved accent arrows showing interactions: water evaporating from the sea into a cloud, and rain falling onto the mountain.
Labels: "Atmosphere"; "Hydrosphere"; "Lithosphere"; "Biosphere"; "Evaporation"; "Rain".
```
*Check:* each sphere label points to the right thing; clouds belong to the hydrosphere, not the atmosphere label.

#### G9-04 · How a fossil forms — **A**
`geological-history/fossil-formation.png` · `gr9/earth/geological-history.html` → after *How Fossils Form*
```text
Brief G9-04. ACCENT #fb923c.
Five panels in a row, each the same side-view cross-section of a lake bed with the ground surface in the same position, showing one sequence:
1 A fish dies and lies on the muddy lake bottom (water above).
2 It is quickly covered by sediment; the soft tissue has gone and only the skeleton remains.
3 Many more layers of sediment build up on top and harden into rock layers; the skeleton is now pale mineral-coloured (permineralised).
4 The lake is gone; the rock layers have been pushed up and slightly tilted (uplift).
5 Erosion has worn the top layers away and the fossil skeleton is exposed at the surface.
Keep the SAME fish skeleton shape and size in panels 2 to 5. A small accent number badge 1–5 at the top of each panel.
Labels: "Death and rapid burial"; "Soft parts decay"; "Permineralisation"; "Uplift"; "Erosion exposes the fossil"; "1"; "2"; "3"; "4"; "5".
```
*Check:* same skeleton in every panel; layers are added on top (never underneath); the fossil stays in the same layer.

#### G9-05 · Rock layers and index fossils — **B**
`geological-history/superposition-index-fossils.png` · `gr9/earth/geological-history.html` → after *Relative and Absolute Dating*
```text
Brief G9-05. ACCENT #fb923c.
Two cliff-face cross-sections side by side representing Site A and Site B, far apart. Each shows 5 horizontal sedimentary layers in distinct muted colours. One distinctive layer containing an ammonite (spiral shell) fossil appears in both sites, at a different depth at each site; draw a dashed accent line connecting that layer across the two columns. On the left edge of Site A, a vertical accent arrow pointing DOWN labelled "Older".
Labels: "Site A"; "Site B"; "Index fossil (ammonite)"; "Youngest layer at the top"; "Older".
```
*Check:* the matching layer contains the same fossil at both sites; the older arrow points down.

#### G9-06 · Life cycle of stars — **A**
`life-cycle-of-stars/star-life-cycles.png` · `gr9/earth/life-cycle-of-stars.html` → after *Death of a massive star*
```text
Brief G9-06. ACCENT #fb923c.
A flow diagram with flat, restrained space illustrations (no lens flare, no bloom). Start at the left with one nebula (a soft cloud of gas and dust), then a protostar. From there the path splits into two rows joined by accent arrows:
Top row (Sun-like, lower-mass star): main-sequence star (yellow) → red giant (large, orange-red) → planetary nebula (a ring-shaped glowing shell with a tiny core) → white dwarf (very small, white).
Bottom row (massive star): main-sequence star (blue-white, larger) → red supergiant (much larger than the red giant) → supernova (a burst drawn flat) → a split into two endings: neutron star (tiny) and black hole (a black disc with a thin bright ring edge).
Labels: "Nebula"; "Protostar"; "Main-sequence star" (on each row; the only allowed repeat); "Red giant"; "Planetary nebula"; "White dwarf"; "Red supergiant"; "Supernova"; "Neutron star"; "Black hole"; "Lower-mass star (like the Sun)"; "Massive star".
```
*Check:* the Sun-like path never goes through a supernova; the red supergiant is bigger than the red giant; the white dwarf and neutron star are tiny.

#### G9-07 · The rock cycle — **A**
`lithosphere-mining/rock-cycle.png` · `gr9/earth/lithosphere-mining.html` → after *The rock cycle*
```text
Brief G9-07. ACCENT #fb923c.
A landscape cross-section showing a volcano with a magma chamber below it, a mountain range, a river carrying sediment to the sea, and layers of sediment on the sea floor. Place three rock-type badges on the scene, each with a small rock sample drawing: igneous (granite, speckled) near the volcano and cooled lava; sedimentary (sandstone, layered) at the sea floor layers; metamorphic (banded, folded rock) deep under the mountain. Accent arrows showing processes, exactly these 6: magma → igneous (cooling); igneous → sediment (weathering and erosion); sediment → sedimentary (compaction and cementation); sedimentary → metamorphic (heat and pressure); metamorphic → magma (melting); igneous → metamorphic (heat and pressure, short arrow).
Labels: "Magma"; "Igneous rock"; "Sedimentary rock"; "Metamorphic rock"; "Cooling"; "Weathering and erosion"; "Compaction and cementation"; "Heat and pressure"; "Melting".
```
*Check:* "Heat and pressure" produces metamorphic rock without melting; "Melting" leads to magma; each process label sits on the right arrow.

#### G9-08 · Magnetic field of a bar magnet — **A**
`magnetism/bar-magnet-field.png` · `gr9/energy/magnetism.html` → after *Magnetic field lines*
```text
Brief G9-08. ACCENT #fbbf24.
A horizontal bar magnet in the centre, left half red marked "N" and right half blue marked "S". Around it, 8 smooth closed field lines symmetric above and below: they leave the N end, curve around, and enter the S end; lines are close together near the poles and spread out far from the magnet; no two lines ever cross or touch. Each line has one small arrowhead pointing from N towards S outside the magnet. Place 4 small compass needles on the lines (above, below, left of N, right of S), each needle aligned along its field line with its red tip pointing in the direction of the field.
Labels: "N"; "S"; "Field lines run from N to S outside the magnet"; "Strong field (lines close together)"; "Weak field (lines far apart)"; "Compass".
```
*Check:* arrows go N→S outside; the compass red tips follow the arrows (the compass left of N points AWAY from the magnet); no lines cross.

#### G9-09 · Earth's magnetic field — **B**
`magnetism/earth-magnetic-field.png` · `gr9/energy/magnetism.html` → after *Earth as a magnet*
```text
Brief G9-09. ACCENT #fbbf24.
Earth drawn as a flat disc seen from the side, with the geographic axis as a vertical dashed line. Inside Earth, an imaginary bar magnet drawn semi-transparent, tilted about 11° from the geographic axis, with its S pole near the geographic north (top) and its N pole near the geographic south (bottom). Smooth field lines loop around Earth, leaving the bottom (southern) end and entering near the top (northern) end, with arrowheads pointing north outside Earth. A small compass on Earth's surface points its red tip towards the geographic North Pole.
Labels: "Geographic North Pole"; "Geographic South Pole"; "Magnetic south pole of Earth's magnet"; "Magnetic north pole of Earth's magnet"; "Compass".
```
*Check:* the imaginary magnet's S end is at the top (north); the field arrows point north outside Earth; the compass red tip points north.

#### G9-10 · Inducing a current with a magnet — **A**
`electromagnetic-induction/magnet-coil-galvanometer.png` · `gr9/energy/electromagnetic-induction.html` → after *Electromagnetic Induction*
```text
Brief G9-10. ACCENT #fbbf24.
Three panels side by side, each showing the same horizontal copper-coloured coil (8 visible turns) with its two ends connected by wires to a centre-zero galvanometer with a needle (the dial has no numbers, only a centre mark).
1 A bar magnet (N end red, facing the coil) moving INTO the coil (accent arrow pointing towards the coil): the needle deflects to the right.
2 The magnet held still inside the coil: the needle points to zero.
3 The magnet moving OUT of the coil (accent arrow pointing away): the needle deflects to the left.
Labels: "Magnet moving in"; "Magnet stationary"; "Magnet moving out"; "Coil"; "Galvanometer"; "No current".
```
*Check:* the needle directions are opposite in panels 1 and 3 and centred in 2; the coil ends really connect to the meter; there are no numbers on the dial.

#### G9-11 · The electromagnetic spectrum — **A**
`waves/em-spectrum.png` · `gr9/energy/waves.html` → after *The Electromagnetic Spectrum* (also usable in `gr11/physics/optical-phenomena.html`)
```text
Brief G9-11. ACCENT #fbbf24. Canvas: wide 16:9 (1792 × 1024).
A horizontal band divided into 7 regions from left to right: radio waves, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays. Above the band, a single continuous sine wave whose wavelength shrinks smoothly from very long at the left to very short at the right. The visible region is a narrow rainbow strip ordered red (left) to violet (right). Under each region, one small flat icon: radio mast; microwave oven; thermal camera; eye; sun with sunscreen bottle; X-ray of a hand; radiotherapy machine. Below everything, two long accent arrows: one pointing right labelled "Increasing frequency and energy", and one pointing left labelled "Increasing wavelength".
Labels: "Radio waves"; "Microwaves"; "Infrared"; "Visible light"; "Ultraviolet"; "X-rays"; "Gamma rays"; "Increasing frequency and energy"; "Increasing wavelength".
```
*Check:* the order is right; the wave shortens from left to right; red is next to infrared and violet next to ultraviolet.

#### G9-12 · Plant cell vs animal cell — **A**
`cells/plant-vs-animal-cell.png` · `gr9/life/cells.html` → after *Plant cells vs Animal cells*
```text
Brief G9-12. ACCENT #22c55e.
Two cells side by side, drawn as flat 2D cross-sections at the same scale.
Left, PLANT CELL: a rectangular cell with a thick green-grey cellulose cell wall, a thin cell membrane just inside it, a large central vacuole filling most of the cell, the nucleus pushed to one side, 6 oval green chloroplasts with visible internal stacks, 3 mitochondria, and fine ribosome dots in the cytoplasm.
Right, ANIMAL CELL: an irregular rounded cell with only a thin cell membrane, a central nucleus, 4 mitochondria, ribosome dots, and NO cell wall, NO chloroplasts and NO large vacuole.
Leader lines from the shared labels go to both cells; use the accent colour for the three plant-only labels.
Labels: "Cell wall"; "Chloroplast"; "Large vacuole"; "Cell membrane"; "Nucleus"; "Cytoplasm"; "Mitochondrion"; "Ribosomes"; "Plant cell"; "Animal cell".
```
*Check:* the animal cell has no chloroplasts or wall; the membrane sits inside the wall in the plant cell; mitochondria show inner folds.

#### G9-13 · The human digestive system (replaces `07-…-colon-labels`) — **A**
`nutrients/digestive-system.png` · `gr9/life/nutrients.html` → after *The Digestive System*
```text
Brief G9-13. ACCENT #22c55e. Canvas: portrait 2:3 (1024 × 1536).
A front view of the human digestive system inside a simple neutral outline of the head and torso. The head is drawn in side profile so the mouth and oesophagus show clearly; this textbook convention is the one allowed exception to the one-view rule. One CONTINUOUS tract: mouth with teeth and tongue → salivary gland → oesophagus running down behind the heart area → J-shaped stomach on the body's LEFT side (the viewer's right) → duodenum curving around the pancreas → coiled small intestine filling the lower abdomen → large intestine framing the small intestine (ascending on the body's right, across the top, descending on the body's left) → rectum → anus. The liver is large, on the body's RIGHT side (viewer's left), partly over the stomach, with the green gall bladder tucked under it and a bile duct joining the duodenum. The pancreas lies behind and below the stomach, with its duct joining the duodenum. The appendix is a small finger at the start of the large intestine on the body's right.
Labels: "Mouth"; "Salivary gland"; "Oesophagus"; "Liver"; "Gall bladder"; "Stomach"; "Pancreas"; "Duodenum"; "Small intestine"; "Large intestine"; "Appendix"; "Rectum"; "Anus".
```
*Check:* one unbroken tube from mouth to anus; the liver is on the body's right (viewer's left); the stomach is on the other side; the appendix is at the lower right of the body; no label appears twice.

#### G9-14 · Structure of a flower (replaces `09-…-fetus-in-ovule`) — **A**
`reproduction-plants/flower-structure.png` · `gr9/life/reproduction-plants.html` → after *Structure of a Flower* (also usable in `gr11/life/reproduction-plants.html` → *The flower*)
```text
Brief G9-14. ACCENT #22c55e.
A longitudinal section (cut exactly down the middle) of a simple bisexual insect-pollinated flower, drawn like a botanical textbook plate. From the bottom: the stalk, the swollen receptacle, green sepals, pink petals, 4 visible stamens around the centre, each with a slender filament topped by a two-lobed anther with a few pollen grains, and a single central carpel: a sticky flattened stigma on top, a long slender style, and an ovary at the base cut open to show 5 small round green-white ovules attached inside. The ovules are plain small ovals; nothing is drawn inside them. Put brackets on the right grouping anther + filament as the stamen, and stigma + style + ovary as the carpel.
Labels: "Stigma"; "Style"; "Ovary"; "Ovule"; "Anther"; "Filament"; "Petal"; "Sepal"; "Receptacle"; "Stamen (male)"; "Carpel (female)".
```
*Check:* **nothing** is drawn inside the ovules; the ovary is at the base, inside the petals; the style connects stigma to ovary; stamens don't have stigmas; no DNA or decorative background.

#### G9-15 · Germination of a bean seed — **B**
`reproduction-plants/bean-germination.png` · `gr9/life/reproduction-plants.html` → after *Germination*
```text
Brief G9-15. ACCENT #22c55e.
Five stages of a bean seed germinating, left to right, shown in cross-section through soil (the soil surface is a straight line across the whole image at the same height in every stage):
1 A seed in the soil, swollen with water.
2 The seed coat splits and the radicle (young root) grows DOWN.
3 The root branches with root hairs, and the hypocotyl arches upward as a hook.
4 The hook breaks through the soil surface pulling up two cotyledons.
5 The shoot straightens, the cotyledons open and shrink, and two true leaves open above them; the root system is larger.
Labels: "Seed coat"; "Radicle"; "Root hairs"; "Cotyledons"; "First leaves"; "Soil surface".
```
*Check:* the root always grows down and the shoot up; the soil line is at the same height in every stage.

#### G9-16 · The respiratory system — **A**
`systems-human-body/respiratory-system.png` · `gr9/life/systems-human-body.html` → after *The Respiratory System*
```text
Brief G9-16. ACCENT #22c55e.
Front view of the human respiratory system inside a simple neutral outline of the head and chest: nasal cavity, mouth, trachea with C-shaped cartilage rings, two bronchi, branching bronchioles drawn inside two semi-transparent lungs (the RIGHT lung, on the viewer's left, has 3 lobes; the LEFT lung, on the viewer's right, has 2 lobes and a notch for the heart), the ribs drawn as thin arcs, intercostal muscles between two of them, and a dome-shaped diaphragm under the lungs. To the right, a rounded-rectangle zoom joined by two thin lines to the end of one bronchiole, showing a cluster of alveoli covered with a red-blue capillary network.
Labels: "Nasal cavity"; "Trachea"; "Bronchus"; "Bronchiole"; "Lung"; "Ribs"; "Intercostal muscles"; "Diaphragm"; "Alveoli"; "Capillaries".
```
*Check:* 3 lobes on the body's right and 2 on the left; the diaphragm is dome-shaped under the lungs; the trachea rings are C-shaped; one bronchus goes to each lung.

#### G9-17 · Breathing in and out — **A**
`systems-human-body/breathing-mechanism.png` · `gr9/life/systems-human-body.html` → after *The Breathing Mechanism*
```text
Brief G9-17. ACCENT #22c55e.
Two side-by-side front-view diagrams of the chest (ribcage, lungs, diaphragm), same scale.
Left, INHALATION: the ribcage raised and wider (arrows up and outward on the ribs), the diaphragm contracted and FLATTENED (arrow down), lungs larger, an accent arrow showing air entering through the trachea.
Right, EXHALATION: the ribcage lower and narrower (arrows down and inward), the diaphragm relaxed and DOMED upward (arrow up), lungs smaller, an accent arrow showing air leaving.
Labels: "Inhalation"; "Exhalation"; "Diaphragm contracts and flattens"; "Diaphragm relaxes and domes up"; "Ribs move up and out"; "Ribs move down and in"; "Air in"; "Air out".
```
*Check:* the diaphragm is flat when breathing IN and domed when breathing OUT (the model often swaps these); the arrows match their labels.

#### G9-18 · pH scale and universal indicator — **B**
`acids-bases/ph-scale.png` · `gr9/matter/acids-bases.html` → after *The pH Scale*
```text
Brief G9-18. ACCENT #fbbf24. Canvas: wide 16:9 (1792 × 1024).
A horizontal bar divided into 15 equal cells numbered 0 to 14 in mono text, coloured with the universal indicator sequence: 0–2 red, 3–4 orange, 5–6 yellow, 7 green, 8–9 blue-green to blue, 10–12 indigo-blue, 13–14 violet. Under the bar, small flat icons with a thin line to the right number: battery (0), lemon (2), vinegar bottle (3), coffee cup (5), glass of water (7), baking soda box (9), ammonia bottle (11), bleach bottle (12). Above the bar, three brackets: 0–6, 7, 8–14.
Labels: "Acidic"; "Neutral"; "Alkaline (basic)"; "0"; "1"; "2"; "3"; "4"; "5"; "6"; "7"; "8"; "9"; "10"; "11"; "12"; "13"; "14".
```
*Check:* 15 cells from 0 to 14; green only at 7; each icon lines up with the right pH; there is no gibberish on the bottles.

### Grade 10

#### G10-01 · Flame tests — **A**
`atomic-structure/flame-tests.png` · `gr10/chemistry/atomic-structure.html` → after *Atomic Spectra & Flame Tests*
```text
Brief G10-01. ACCENT #c084fc.
Five identical Bunsen burners in a row, drawn as clean flat line illustrations with the air hole visible. Above each, a nichrome wire loop on a handle holds a tiny amount of white salt in the flame. Each flame is a flat, stylised, clearly shaped flame (a pale inner cone and a coloured outer flame), NOT a photo-real fire and with no glow halo:
1 crimson red; 2 bright yellow-orange; 3 pale lilac; 4 brick orange-red; 5 blue-green.
Labels (under each burner, in this order): "Lithium (Li⁺)"; "Sodium (Na⁺)"; "Potassium (K⁺)"; "Calcium (Ca²⁺)"; "Copper (Cu²⁺)".
```
*Check:* colour order Li red, Na yellow, K lilac, Ca orange-red, Cu blue-green; lithium and calcium look different from each other (crimson vs brick orange).

#### G10-02 · VSEPR molecular shapes — **B** (check carefully)
`chemical-bonding/vsepr-shapes.png` · `gr10/chemistry/chemical-bonding.html` → after *VSEPR Theory — Predicting Molecular Shape*
```text
Brief G10-02. ACCENT #c084fc. Canvas: wide 16:9 (1792 × 1024).
Five ball-and-stick molecules in a row, flat illustrative style with one tonal shading step, CPK colours, each drawn in its true 3D geometry at a clear viewing angle:
1 CO₂: grey C in the middle, 2 red O, in a straight line (180°).
2 BF₃: a pale-pink B in the centre with 3 pale-green F in a flat triangle (120°).
3 CH₄: grey C with 4 white H at tetrahedral positions (109.5°); one bond drawn as a solid wedge and one as a dashed wedge.
4 NH₃: blue N with 3 white H in a pyramid below it and one translucent accent-coloured lone-pair lobe on top (107°).
5 H₂O: red O with 2 white H in a bent shape and two translucent accent-coloured lone-pair lobes (104.5°).
Draw one small angle arc on each with its value in mono text.
Labels: "Linear"; "Trigonal planar"; "Tetrahedral"; "Trigonal pyramidal"; "Bent (angular)"; "CO₂"; "BF₃"; "CH₄"; "NH₃"; "H₂O"; "180°"; "120°"; "109.5°"; "107°"; "104.5°"; "Lone pair".
```
*Check:* **count atoms and bonds** (CH₄ has exactly 4 H, NH₃ exactly 3 H and 1 lone pair, H₂O exactly 2 H and 2 lone pairs); CO₂ is straight; BF₃ is flat. If the geometry is off after two tries, build this one in code.

#### G10-03 · The water cycle — **A**
`hydrosphere/water-cycle.png` · `gr10/chemistry/hydrosphere.html` → after *The Water Cycle*
```text
Brief G10-03. ACCENT #c084fc.
A flat landscape cross-section, left to right: the sea, a coastal plain with trees, a river flowing from mountains back to the sea, and a cutaway of the ground showing groundwater in a pale-blue layer seeping towards the sea. The Sun is a flat disc at the top-left. Accent arrows, exactly these 7: wavy arrows rising from the sea (evaporation); wavy arrows rising from the trees (transpiration); clouds forming as vapour rises and cools (condensation); rain falling on the mountains (precipitation); water running down the slopes into the river (surface run-off); water soaking down into the ground (infiltration); and groundwater flow towards the sea.
Labels: "Evaporation"; "Transpiration"; "Condensation"; "Precipitation"; "Surface run-off"; "Infiltration"; "Groundwater flow".
```
*Check:* evaporation comes off water and transpiration off plants; the rain falls from the clouds; the river flows downhill to the sea.

#### G10-04 · Hydrogen bonding in water — **A**
`intermolecular-forces/hydrogen-bonding-water.png` · `gr10/chemistry/intermolecular-forces.html` → after *Type 3 — Hydrogen Bonding*
```text
Brief G10-04. ACCENT #c084fc.
Exactly 6 water molecules as flat space-filling models (one large red O with two smaller white H attached in a bent shape, 104.5°), arranged loosely around a central molecule. Hydrogen bonds are drawn as short dashed accent lines, each running from an H of one molecule to an O of a NEIGHBOURING molecule (never between atoms of the same molecule). The central molecule forms 4 hydrogen bonds: its 2 H atoms each bond to a neighbour's O, and its O accepts 2 bonds from 2 neighbours' H atoms. On the central molecule only, show "δ−" next to O and "δ+" next to each H. Draw the covalent O–H bond inside one molecule as a solid short line so it can be labelled.
Labels: "Hydrogen bond"; "Covalent bond (intramolecular)"; "Water molecule"; "δ−"; "δ+" (next to both H of the central molecule; the only allowed repeat).
```
*Check:* the dashed bonds always run H···O between different molecules; each water molecule has exactly 2 H; O is larger than H.

#### G10-05 · Dissolving NaCl in water — **A**
`reactions-aqueous-solution/nacl-dissolving.png` · `gr10/chemistry/reactions-aqueous-solution.html` → after *Dissolving Ionic Compounds in Water*
```text
Brief G10-05. ACCENT #c084fc.
Left: the corner of a NaCl crystal lattice drawn as alternating spheres in a cube grid (small violet Na⁺ and larger green Cl⁻; Cl⁻ clearly bigger). Right: two ions that have left the lattice, each surrounded by 5 water molecules (red O with 2 white H in a bent shape):
around the Na⁺ ion, every water molecule points its O (red, δ−) TOWARDS the ion;
around the Cl⁻ ion, every water molecule points one H (white, δ+) TOWARDS the ion.
A curved accent arrow from the lattice to the hydrated ions.
Labels: "NaCl crystal lattice"; "Na⁺"; "Cl⁻"; "Hydrated Na⁺ ion"; "Hydrated Cl⁻ ion"; "Water molecule".
```
*Check:* **orientation**: O faces Na⁺ and H faces Cl⁻ (the most common error is to draw both the same); Cl⁻ is bigger than Na⁺; the lattice alternates perfectly.

#### G10-06 · Levels of ecological organisation — **B**
`biosphere-ecosystems/levels-of-organisation.png` · `gr10/life/biosphere-ecosystems.html` → after *From biosphere to ecosystem*
```text
Brief G10-06. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
Six rounded panels in a row, each a zoom-out of the one before, joined by small accent chevrons pointing right:
1 One impala.
2 A herd of impala (same species only).
3 A community: impala, zebra, giraffe, acacia trees and grass together.
4 An ecosystem: the same community plus visible non-living parts (a waterhole, soil, the Sun, rocks).
5 A biome: a wide savanna landscape stretching to the horizon.
6 The biosphere: planet Earth with Africa facing the viewer.
Labels: "Organism"; "Population"; "Community"; "Ecosystem"; "Biome"; "Biosphere".
```
*Check:* the population panel has one species only; the ecosystem panel includes non-living factors.

#### G10-07 · The phases of mitosis — **A**
`cell-division-mitosis/mitosis-phases.png` · `gr10/life/cell-division-mitosis.html` → after *The phases of mitosis*
```text
Brief G10-07. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
Five round animal cells in a row, the same size, showing mitosis in a cell with 4 chromosomes (2 long, 2 short). Chromosomes: in panels 2–3 each chromosome is an X shape of two sister chromatids joined at a centromere; one long and one short chromosome are coloured pink and the other long and short are coloured blue.
1 Interphase: intact nucleus with a nucleolus and loose thread-like chromatin; a pair of centrioles outside the nucleus.
2 Prophase: 4 visible X-shaped chromosomes; the nuclear membrane breaking up (dashed); centrioles moving to opposite poles with spindle fibres forming.
3 Metaphase: the 4 X-shaped chromosomes lined up in a single row across the equator; spindle fibres from each pole attached to each centromere.
4 Anaphase: sister chromatids pulled apart: exactly 4 single chromatids moving to EACH pole, V-shaped with the centromere leading; the cell slightly elongated.
5 Telophase: two new nuclear membranes forming, each holding 4 chromosomes (2 long, 2 short); a cleavage furrow pinching in at the middle.
Labels: "Interphase"; "Prophase"; "Metaphase"; "Anaphase"; "Telophase"; "Centromere"; "Spindle fibres"; "Sister chromatids"; "Cleavage furrow".
```
*Check:* **count the chromosomes** (4 in prophase and metaphase; 4 + 4 in anaphase; 4 per nucleus in telophase); metaphase is one single line; the anaphase chromatids lead with the centromere.

#### G10-08 · Cytokinesis in animal vs plant cells — **B**
`cell-division-mitosis/cytokinesis-plant-animal.png` · `gr10/life/cell-division-mitosis.html` → after *Cytokinesis — plant vs animal*
```text
Brief G10-08. ACCENT #22c55e.
Two panels, same scale.
Left, ANIMAL: a round cell at late telophase with 2 nuclei at opposite ends; the cell membrane pinches inward from both sides at the middle (accent arrows pointing inward), forming a cleavage furrow.
Right, PLANT: a rectangular cell with a thick cell wall, 2 nuclei at opposite ends, and a new cell plate forming as a line of small vesicles across the middle from the centre OUTWARD towards the walls (accent arrows pointing outward along the plate). The outer cell wall does not bend inward.
Labels: "Animal cell"; "Plant cell"; "Cleavage furrow"; "Cell plate"; "Cell wall".
```
*Check:* the plant wall does not pinch; the cell plate grows from the centre outward.

#### G10-09 · Organelles of an animal cell (Grade 10 detail) — **A**
`cell-structure/animal-cell-organelles.png` · `gr10/life/cell-structure.html` → after *Organelles — structure and function*
```text
Brief G10-09. ACCENT #22c55e.
A large generalised animal cell as a 2D cross-section, drawn as in a Grade 10 textbook: cell membrane; cytoplasm; a large nucleus with a double nuclear membrane with visible pores, grainy chromatin and a darker nucleolus; rough endoplasmic reticulum as flattened sacs studded with dots (ribosomes), continuous with the nuclear membrane; smooth ER as tubes without dots; a Golgi body as a stack of 5 curved flattened sacs with small vesicles budding off its outer face; 3 mitochondria with a smooth outer membrane and folded inner membrane (cristae); 2 lysosomes as small round sacs; free ribosome dots; 2 centrioles near the nucleus; one small vacuole.
Labels: "Cell membrane"; "Cytoplasm"; "Nuclear membrane"; "Nuclear pore"; "Nucleolus"; "Chromatin"; "Rough ER"; "Smooth ER"; "Ribosome"; "Golgi body"; "Vesicle"; "Mitochondrion"; "Lysosome"; "Centrioles".
```
*Check:* the rough ER has ribosomes and the smooth ER none; there are no chloroplasts or cell wall; the Golgi body is a separate stack, not connected to the membrane.

#### G10-10 · The fluid mosaic model — **B**
`cell-structure/fluid-mosaic-membrane.png` · `gr10/life/cell-structure.html` → after *The cell membrane — a fluid mosaic*
```text
Brief G10-10. ACCENT #22c55e.
A 3D cutaway slab of cell membrane in flat illustrative style. A phospholipid bilayer: two rows of phospholipids, each drawn as a round head with two wavy tails; the heads face OUTWARD (towards the watery outside and the cytoplasm) and the tails face INWARD towards each other. Embedded in it: one channel protein spanning the whole bilayer with a pore through it; one carrier protein spanning the bilayer; one peripheral protein on the inner surface only; a few short branched glycoprotein chains on the OUTER surface only; cholesterol molecules as small flat shapes between the tails.
Labels: "Phospholipid bilayer"; "Hydrophilic head"; "Hydrophobic tails"; "Channel protein"; "Carrier protein"; "Glycoprotein"; "Cholesterol"; "Outside the cell"; "Cytoplasm".
```
*Check:* the heads face out on both sides and the tails meet in the middle; glycoproteins only on the outside.

#### G10-11 · Enzyme lock-and-key model — **B**
`chemistry-of-life/enzyme-lock-and-key.png` · `gr10/life/chemistry-of-life.html` → after *Enzymes — biological catalysts*
```text
Brief G10-11. ACCENT #22c55e.
Four stages left to right, joined by accent arrows, with the enzyme drawn as the same large rounded blob in every stage with one notch-shaped active site:
1 The enzyme and a separate substrate whose shape exactly fits the active site.
2 The enzyme–substrate complex (the substrate sitting in the active site).
3 The substrate split into two product pieces, still in the site.
4 The two products released and moving away; the enzyme unchanged, ready again.
Below, a small separate panel: the same enzyme with a distorted active site (denatured, labelled with a small thermometer icon) and the substrate no longer fitting.
Labels: "Enzyme"; "Active site"; "Substrate"; "Enzyme–substrate complex"; "Products"; "Enzyme unchanged"; "Denatured enzyme: active site changed".
```
*Check:* the enzyme is identical in stages 1, 2 and 4; the two products fit together into the original substrate shape.

#### G10-12 · Plant tissues — **B**
`plant-animal-tissues/plant-tissues.png` · `gr10/life/plant-animal-tissues.html` → after *The seven plant tissues*
```text
Brief G10-12. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
Seven small rounded panels in a row, each showing a few cells of one plant tissue as seen under a light microscope, drawn as clean line illustrations (not photographs):
Meristematic: small tightly packed cubic cells with large nuclei and no vacuoles.
Epidermis: a single row of flat, tightly fitting cells with a waxy cuticle on top.
Parenchyma: large rounded thin-walled cells with air spaces between them.
Collenchyma: cells with walls thickened only at the corners.
Sclerenchyma: very thick-walled cells with a tiny central lumen (cells dead, no contents).
Xylem: long hollow tubes (vessels) with spiral or ring thickening and no cell contents.
Phloem: sieve tubes with perforated sieve plates, and a narrow companion cell with a nucleus beside each.
Labels: "Meristematic"; "Epidermis"; "Parenchyma"; "Collenchyma"; "Sclerenchyma"; "Xylem"; "Phloem".
```
*Check:* collenchyma is thickened at the corners only; xylem and sclerenchyma have no cell contents; phloem shows sieve plates and companion cells.

#### G10-13 · The human skeleton — **A**
`support-systems-animals/human-skeleton.png` · `gr10/life/support-systems-animals.html` → after *The human skeleton*
```text
Brief G10-13. ACCENT #22c55e. Canvas: portrait 2:3 (1024 × 1536).
A full human skeleton, front view, standing with arms slightly away from the body and palms facing forward, drawn in ivory with thin contour lines, anatomically correct: 12 pairs of ribs, sternum, clavicles, scapulae, humerus, radius (thumb side) and ulna, carpals, metacarpals and phalanges (5 digits per hand), pelvic girdle, femur, patella, tibia (inner, thicker) and fibula (outer, thinner), tarsals, metatarsals and phalanges (5 toes per foot), and a vertebral column. Tint the AXIAL skeleton (skull, vertebral column, ribs, sternum) with a soft accent-green wash; leave the APPENDICULAR skeleton (limbs and girdles) ivory.
Labels: "Skull (cranium)"; "Clavicle"; "Scapula"; "Sternum"; "Ribs"; "Humerus"; "Vertebral column"; "Pelvic girdle"; "Radius"; "Ulna"; "Femur"; "Patella"; "Tibia"; "Fibula"; "Axial skeleton"; "Appendicular skeleton".
```
*Check:* 5 fingers and 5 toes on each; the radius is on the thumb side and the fibula on the outside; the girdles are in the appendicular colour; the ribs join the sternum.

#### G10-14 · A synovial joint — **B**
`support-systems-animals/synovial-joint.png` · `gr10/life/support-systems-animals.html` → after *Bones and joints*
```text
Brief G10-14. ACCENT #22c55e.
A longitudinal section of a knee-type synovial joint drawn as a simple textbook diagram: the ends of two long bones meeting, each capped with smooth pale-blue articular cartilage; a joint cavity between them filled with pale synovial fluid; a synovial membrane lining the capsule; a fibrous capsule enclosing the joint; ligaments on each side running bone to bone; a muscle above attached to the bone by a tendon. Show spongy bone and marrow inside one bone end.
Labels: "Bone"; "Articular cartilage"; "Synovial fluid"; "Synovial membrane"; "Ligament (bone to bone)"; "Tendon (muscle to bone)"; "Muscle".
```
*Check:* ligaments join bone to bone and the tendon joins muscle to bone; there is cartilage on both bone ends.

#### G10-15 · Internal structure of the heart (replaces `10-…-heart-double-pump`) — **A**
`transport-in-mammals/heart-structure.png` · `gr10/life/transport-in-mammals.html` → after *A double, closed circulatory system* (also usable in `gr9/life/systems-human-body.html` → *The Heart — a Double Pump*)
```text
Brief G10-15. ACCENT #22c55e.
A frontal section of the human heart as seen in a textbook, drawn as if the person is facing the viewer, so the heart's RIGHT side is on the viewer's LEFT. Right-side chambers and vessels are tinted blue (deoxygenated) and left-side ones red (oxygenated). The left-ventricle wall is visibly about 3 times thicker than the right-ventricle wall. Include: superior and inferior vena cava entering the right atrium; the tricuspid valve between the right atrium and right ventricle; the pulmonary artery leaving the right ventricle with a semilunar valve at its base; pulmonary veins entering the left atrium; the bicuspid (mitral) valve between the left atrium and left ventricle; the aorta arching up and over from the left ventricle with a semilunar valve; chordae tendineae (thin cords) connecting the valve flaps to the ventricle walls; a thick septum separating left and right. Small accent arrows show the direction of blood flow through each chamber.
Labels: "Superior vena cava"; "Inferior vena cava"; "Right atrium"; "Tricuspid valve"; "Right ventricle"; "Pulmonary artery"; "Pulmonary veins"; "Left atrium"; "Bicuspid valve"; "Left ventricle"; "Aorta"; "Semilunar valve"; "Septum"; "Chordae tendineae".
```
*Check:* the right side is on the viewer's left; the left ventricle is the thickest; the aorta comes from the LEFT ventricle and the pulmonary artery from the RIGHT; the flow arrows go atrium → ventricle → artery; no "double pump 1/2" style labels. Good candidate for F3 (text-free base).

#### G10-16 · Arteries, veins and capillaries — **A**
`transport-in-mammals/blood-vessels.png` · `gr10/life/transport-in-mammals.html` → after *Blood vessels*
```text
Brief G10-16. ACCENT #22c55e.
Three blood vessels side by side, each shown as a short 3D cut section (the cut face towards the viewer) at a size that shows the differences clearly:
Artery (red): a small round lumen, a THICK wall with an outer connective tissue layer, a thick middle layer of muscle and elastic fibres, and a thin inner endothelium.
Vein (blue): a larger, slightly flattened lumen, a THIN wall with the same three layers but a much thinner muscle layer, and one pocket valve visible inside the cut.
Capillary (purple-red, drawn noticeably smaller): a wall only ONE cell thick, with a single red blood cell squeezing through.
Labels: "Artery"; "Vein"; "Capillary"; "Thick muscular and elastic wall"; "Small lumen"; "Thin wall"; "Large lumen"; "Valve"; "Wall one cell thick".
```
*Check:* the artery wall is thicker than the vein wall; only the vein has a valve; the capillary is one cell thick.

#### G10-17 · Transverse sections of a dicot root and stem — **A**
`transport-in-plants/dicot-root-stem-ts.png` · `gr10/life/transport-in-plants.html` → after *Two transport systems, one plant*
```text
Brief G10-17. ACCENT #22c55e.
Two circular transverse sections side by side, drawn as clean textbook diagrams (low-power plan view with tissue regions outlined, not individual cells except where noted).
Left, DICOT STEM: an outer epidermis; a cortex; a RING of 8 vascular bundles near the edge, each with phloem on the OUTSIDE and xylem on the INSIDE separated by a thin band of cambium; a large central pith.
Right, DICOT ROOT: an epidermis with a few root hairs; a wide cortex; an endodermis ring around a central vascular cylinder in which the xylem forms a 4-armed star (X shape) at the very centre, with phloem in the 4 spaces between the arms.
Labels: "Dicot stem"; "Dicot root"; "Epidermis"; "Cortex"; "Vascular bundle"; "Phloem"; "Xylem"; "Cambium"; "Pith"; "Root hair"; "Endodermis".
```
*Check:* the stem bundles are in a ring with phloem outside; the root xylem is a central star with phloem between the arms.

#### G10-18 · The path of water through a plant — **B**
`transport-in-plants/water-pathway-transpiration.png` · `gr10/life/transport-in-plants.html` → after *Transpiration — the engine that pulls water up*
```text
Brief G10-18. ACCENT #22c55e.
A small whole plant on the left (roots in soil, stem, leaves) with thick accent arrows running up through it, and three rounded zoom rectangles on the right joined to the plant by thin lines:
Bottom zoom: a root hair cell extending into soil particles, with water moving into it and across the cortex cells towards the xylem.
Middle zoom: a length of xylem vessel in the stem with water moving upward.
Top zoom: a leaf section with water evaporating from the mesophyll cells into an air space and water vapour diffusing out through an open stoma.
Labels: "Root hair absorbs water"; "Xylem carries water up"; "Water vapour leaves through the stoma"; "Transpiration pull".
```
*Check:* all arrows point upward and outward; the stoma is on the underside of the leaf.

#### G10-19 · Total internal reflection in an optical fibre — **B**
`waves-sound-light/total-internal-reflection.png` · `gr10/physics/waves-sound-light.html` → after *Total Internal Reflection*
```text
Brief G10-19. ACCENT #60a5fa.
Top: three small side-by-side ray diagrams at a glass–air boundary (glass below, air above), each with a dashed normal: (1) angle of incidence less than the critical angle, where the ray refracts into the air bending away from the normal, with a faint reflected ray; (2) angle equal to the critical angle, where the refracted ray runs along the boundary; (3) angle greater than the critical angle, where ALL light is reflected back into the glass (angle of reflection equal to angle of incidence).
Bottom: a gently curved optical fibre (a core inside a thinner cladding layer) with one accent ray zig-zagging along the core by repeated total internal reflection at the core–cladding boundary.
Labels: "Less than critical angle"; "Equal to critical angle"; "Greater than critical angle"; "Normal"; "Core"; "Cladding"; "Glass"; "Air".
```
*Check:* the refracted ray bends away from the normal; in the third case the reflection angle equals the incidence angle; the fibre ray stays inside the core.

### Grade 11

#### G11-01 · Collision theory: effective vs ineffective collisions — **B**
`rate-of-reaction/collision-theory.png` · `gr11/chemistry/rate-of-reaction.html` → after *Collision Theory*
```text
Brief G11-01. ACCENT #c084fc.
Three horizontal rows, each showing the same two-atom molecules A–B (a red and a blue sphere) and C (a single green sphere) approaching each other, then the outcome, left to right with small arrows.
Row 1, TOO LITTLE ENERGY: slow molecules (short motion trails), correct orientation, bounce apart unchanged.
Row 2, WRONG ORIENTATION: fast molecules (long trails), but C hits the red end instead of the blue end, bounce apart unchanged.
Row 3, EFFECTIVE COLLISION: fast molecules with C hitting the blue end: the products are a new C–B molecule and a separate red A.
Mark row 3 with a small accent tick and rows 1–2 with a small neutral cross.
Labels: "Not enough energy"; "Wrong orientation"; "Effective collision"; "Reactants"; "Products".
```
*Check:* only row 3 changes the molecules; the atom colours are consistent across rows.

#### G11-02 · Rusting under a water droplet — **A**
`redox/rusting-droplet.png` · `gr11/chemistry/redox.html` → after *Corrosion of Iron (Rusting)*
```text
Brief G11-02. ACCENT #c084fc.
A cross-section of a single dome-shaped water droplet sitting on the flat surface of an iron plate (the iron shown as a grey block below). At the CENTRE of the droplet, where the oxygen is low, the iron surface has a small pit, with Fe²⁺ ions moving up into the water: this is the anode. At the EDGE of the droplet, where oxygen from the air dissolves easily, O₂ molecules arrive at the iron surface: this is the cathode, and OH⁻ ions are formed. Accent arrows inside the iron block show electrons flowing from the centre (anode) outward to the edge (cathode). A ring of orange-brown rust is deposited in the water between the centre and the edge, where Fe²⁺ and OH⁻ meet.
Labels: "Water droplet (electrolyte)"; "Iron"; "Anode: Fe → Fe²⁺ + 2e⁻"; "Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻"; "e⁻"; "Rust (Fe₂O₃·xH₂O)"; "O₂ from air".
```
*Check:* the anode is in the centre and the cathode at the edge; electrons flow through the metal, not the water; the equations are correct character by character (use F1 to fix any subscript).

#### G11-03 · Titration apparatus — **A**
`stoichiometry/titration-setup.png` · `gr11/chemistry/stoichiometry.html` → after *Volumetric Analysis — Titration* (also usable in `gr12/chemistry/acids-bases-gr12.html` → *Titrations & Calculations*)
```text
Brief G11-03. ACCENT #c084fc. Canvas: portrait 2:3 (1024 × 1536).
A school titration set-up drawn as a clean line illustration: a retort stand with a burette clamp holding a vertical 50 cm³ burette filled with colourless solution; the burette graduation marks are fine unnumbered lines except "0" at the TOP and "50" near the bottom, with the curved meniscus visible just below the 0 mark; a glass stopcock (tap) at the bottom; directly beneath, a conical (Erlenmeyer) flask on a white tile, containing a small volume of solution just turning pale pink at the point where a drop lands. Beside the stand, a volumetric pipette with a pipette filler (rubber bulb) on top, lying on the bench.
Labels: "Burette"; "Meniscus"; "Stopcock"; "Conical flask"; "White tile"; "Retort stand"; "Pipette"; "Pipette filler"; "0"; "50".
```
*Check:* **0 is at the TOP of the burette**; the burette is straight and vertical with its tip inside the neck of the flask; there is no gibberish on the glassware.

#### G11-04 · Structure of a villus — **A**
`animal-nutrition/villus.png` · `gr11/life/animal-nutrition.html` → after *Absorption and the role of the liver*
```text
Brief G11-04. ACCENT #22c55e.
A single villus as a longitudinal section, finger-shaped and standing up from the intestinal wall, drawn as in a textbook. The surface is a single layer of columnar epithelial cells whose exposed edge has a fine fringe of microvilli (shown in a small rounded zoom rectangle at the top right). Inside: a dense network of blood capillaries (red on the arteriole side, turning blue towards the venule) and a single central lacteal (pale cream lymph vessel) running up the middle. At the base, an arteriole, a venule leading to the hepatic portal vein, and the lacteal joining a lymph vessel. Small accent arrows: glucose and amino acids into the capillaries; fatty acids and glycerol into the lacteal.
Labels: "Epithelium (one cell thick)"; "Microvilli"; "Blood capillaries"; "Lacteal"; "Arteriole"; "Venule (to hepatic portal vein)"; "Glucose and amino acids"; "Fatty acids and glycerol".
```
*Check:* the lacteal is central and fat goes into it; the capillaries surround the lacteal; the epithelium is one cell thick.

#### G11-05 · Dentition: herbivore vs carnivore — **A**
`animal-nutrition/dentition-herbivore-carnivore.png` · `gr11/life/animal-nutrition.html` → after *Dentition reflects diet*
```text
Brief G11-05. ACCENT #22c55e.
Two skulls in side view facing left, the same size, drawn as clean ivory line illustrations (neutral, not scary):
Left, SHEEP (herbivore): no upper incisors, with a hard toothless dental pad at the front of the upper jaw; lower incisors angled forward biting against the pad; a wide toothless gap (diastema) between the front teeth and the cheek teeth; broad, flat, ridged premolars and molars for grinding.
Right, DOG (carnivore): small sharp incisors; long pointed canines; sharp jagged premolars and molars, including one large blade-like carnassial tooth in each jaw; no large gap.
Labels: "Herbivore (sheep)"; "Carnivore (dog)"; "Horny pad"; "Diastema"; "Grinding molars"; "Canine"; "Carnassial tooth"; "Incisors".
```
*Check:* the sheep has no upper incisors and no canines; the dog's canines are prominent; the carnassials are shearing blades.

#### G11-06 · Body plans: symmetry and body cavities — **B**
`biodiversity-animals/body-plans.png` · `gr11/life/biodiversity-animals.html` → after *Comparing body plans*
```text
Brief G11-06. ACCENT #22c55e.
Top row, SYMMETRY: a jellyfish seen from above with several dashed lines through its centre (radial symmetry), and a simplified flatworm seen from above with ONE dashed midline (bilateral symmetry) and a small head end with eyespots (cephalisation).
Bottom row, TISSUE LAYERS AND BODY CAVITY: three simple circular cross-sections of a body wall, colour-coded the same in all three: ectoderm outer ring (blue), endoderm lining the gut (yellow), mesoderm middle layer (red):
1 Diploblastic: ectoderm and endoderm only, with jelly between them and a central gut.
2 Triploblastic acoelomate: ectoderm, solid mesoderm, endoderm around the gut, NO cavity.
3 Triploblastic coelomate: ectoderm, mesoderm split into two layers with a fluid-filled coelom between them, endoderm around the gut.
Labels: "Radial symmetry"; "Bilateral symmetry"; "Diploblastic"; "Triploblastic acoelomate"; "Triploblastic coelomate"; "Ectoderm"; "Mesoderm"; "Endoderm"; "Gut"; "Coelom".
```
*Check:* the coelom sits INSIDE the mesoderm (lined by mesoderm on both sides); the diploblastic section has no mesoderm; the colours are consistent across the three sections.

#### G11-07 · The four plant divisions — **B**
`biodiversity-plants/plant-divisions.png` · `gr11/life/biodiversity-plants.html` → after *Four divisions of the plant kingdom*
```text
Brief G11-07. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
Four plants in a row, each standing on the same ground line, drawn as clean botanical illustrations, with a thin accent arrow running underneath from left to right:
1 Bryophyte: a low cushion of moss with thin stalks topped by small spore capsules.
2 Pteridophyte: a fern with an underground rhizome, unrolling fiddlehead fronds, and brown sori dots on the underside of one frond turned to show them.
3 Gymnosperm: a young pine with needles and one woody cone.
4 Angiosperm: a flowering plant with a flower and a fruit.
Labels: "Bryophytes (mosses)"; "Pteridophytes (ferns)"; "Gymnosperms (conifers)"; "Angiosperms (flowering plants)"; "Spore capsule"; "Sori"; "Cone"; "Flower"; "Fruit"; "Less dependent on water for reproduction".
```
*Check:* the sori are on the underside of the frond; the moss has no roots or flowers; the arrow points right.

#### G11-08 · Urinary system and kidney section — **A**
`excretion/urinary-system-kidney.png` · `gr11/life/excretion.html` → after *The urinary system and the kidney*
```text
Brief G11-08. ACCENT #22c55e.
Left: front view of the urinary system inside a faint neutral outline of the lower back: two bean-shaped kidneys (the RIGHT kidney, on the viewer's left, sits slightly LOWER than the left), a renal artery (red) and renal vein (blue) at the hilum of each kidney joining the aorta and vena cava, a ureter from each kidney down to the bladder, and a urethra leaving the bladder.
Right: a longitudinal section of one kidney: an outer cortex (darker), an inner medulla made of 7 triangular pyramids, a funnel-shaped renal pelvis collecting into the ureter at the hilum, and the renal artery and vein entering and leaving at the hilum.
Labels: "Kidney"; "Renal artery"; "Renal vein"; "Aorta"; "Vena cava"; "Ureter"; "Bladder"; "Urethra"; "Cortex"; "Medulla (pyramids)"; "Renal pelvis".
```
*Check:* the ureters (not the urethra) run from kidney to bladder; the right kidney is lower; the pelvis drains into the ureter.

#### G11-09 · The nephron — **A**
`excretion/nephron.png` · `gr11/life/excretion.html` → after *The nephron*; also `gr12/life/osmoregulation-excretion.html` → after *The nephron — the kidney's functional unit*
```text
Brief G11-09. ACCENT #22c55e. Canvas: portrait 2:3 (1024 × 1536).
One nephron with its blood supply, drawn as a textbook diagram. A faint horizontal line divides the cortex (top) from the medulla (bottom). In the cortex: a cup-shaped Bowman's capsule enclosing a knot of capillaries (the glomerulus), fed by a WIDER afferent arteriole and drained by a NARROWER efferent arteriole; the coiled proximal convoluted tubule leaving the capsule; the loop of Henle dipping down into the medulla (descending limb) and returning up (ascending limb); the coiled distal convoluted tubule in the cortex, next to the capsule; the DCT emptying into a straight collecting duct that runs down through the medulla (and receives other nephrons). A capillary network from the efferent arteriole wraps around the tubules. Use small accent arrows to show the direction of flow through the tubule.
Labels: "Afferent arteriole"; "Efferent arteriole"; "Glomerulus"; "Bowman's capsule"; "Proximal convoluted tubule"; "Loop of Henle"; "Distal convoluted tubule"; "Collecting duct"; "Capillary network"; "Cortex"; "Medulla".
```
*Check:* the afferent arteriole is wider than the efferent; the loop of Henle is in the medulla; the order is capsule → PCT → loop → DCT → collecting duct; the collecting duct runs downward. Good candidate for F3 (text-free base).

#### G11-10 · Gas exchange at an alveolus — **A**
`gas-exchange/alveolus.png` · `gr11/life/gas-exchange.html` → after *What makes a good gas exchange surface?*
```text
Brief G11-10. ACCENT #22c55e.
One alveolus in cross-section with a single capillary wrapped against it. The alveolus wall is a thin layer of flat squamous cells lined with a thin film of moisture. The capillary wall is also one flat cell thick, with red blood cells inside flowing from left to right, blue (deoxygenated) where the capillary arrives and red (oxygenated) where it leaves. Accent arrows: O₂ diffusing from the air in the alveolus INTO the blood; CO₂ diffusing from the blood OUT into the alveolus. A small air arrow at the top shows air entering and leaving via the bronchiole.
Labels: "Alveolus"; "Thin moist wall (one cell thick)"; "Capillary"; "Red blood cell"; "O₂ diffuses into blood"; "CO₂ diffuses into alveolus"; "Deoxygenated blood"; "Oxygenated blood"; "Air from bronchiole".
```
*Check:* O₂ goes into the blood and CO₂ out; the blood colour changes from blue to red along the flow direction.

#### G11-11 · Gas exchange surfaces in different organisms — **B**
`gas-exchange/gas-exchange-organisms.png` · `gr11/life/gas-exchange.html` → after *Different organisms, different solutions*
```text
Brief G11-11. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
Five rounded panels in a row, each showing one organism and a small zoom of its gas-exchange surface:
Earthworm: moist skin with capillaries just below the surface.
Insect (grasshopper): spiracles along the abdomen, leading into a branching network of tracheae.
Bony fish: the operculum lifted to show gills, and a zoom of gill filaments with lamellae; water flows over the gills in the OPPOSITE direction to the blood.
Mammal: lungs and alveoli.
Dicot plant: a leaf with stomata on the lower surface and air spaces in the spongy mesophyll.
Labels: "Earthworm: moist skin"; "Insect: tracheal system"; "Spiracle"; "Fish: gills"; "Mammal: lungs"; "Plant: stomata"; "Water flow"; "Blood flow".
```
*Check:* the fish counter-current arrows point in opposite directions; the insect has 6 legs; the stomata are on the lower surface of the leaf.

#### G11-12 · Four groups of micro-organisms — **A**
`microorganisms-classification/microorganism-groups.png` · `gr11/life/microorganisms-classification.html` → after *An enormous, mostly invisible world*
```text
Brief G11-12. ACCENT #22c55e.
Four rounded panels (2 × 2), each a clean labelled textbook diagram:
VIRUS (e.g. a bacteriophage): a geometric protein head (capsid) containing coiled genetic material, a tail sheath, and tail fibres. No cell membrane, no cytoplasm.
BACTERIUM: a rod-shaped cell with a capsule, cell wall and cell membrane, cytoplasm, a loose coiled circular DNA region (no nucleus), a few small plasmid rings, ribosome dots, and one long flagellum.
PROTIST: an amoeba with pseudopodia, a nucleus, a contractile vacuole and food vacuoles.
FUNGUS: bread mould with branching hyphae forming a mycelium and upright stalks topped by round sporangia releasing spores.
Labels: "Virus"; "Bacterium"; "Protist"; "Fungus"; "Capsid"; "Genetic material"; "Tail fibres"; "Cell wall"; "Circular DNA"; "Plasmid"; "Flagellum"; "Nucleus"; "Pseudopodium"; "Contractile vacuole"; "Hyphae"; "Sporangium".
```
*Check:* the bacterium has no nucleus and the protist does; the virus has no cell structures.

#### G11-13 · The chloroplast — **A**
`photosynthesis/chloroplast.png` · `gr11/life/photosynthesis.html` → after *What photosynthesis needs*
```text
Brief G11-13. ACCENT #22c55e.
A single chloroplast as a long oval, cut open lengthwise to show its inside in a flat 3D cutaway: a double membrane (outer and inner, drawn as two close parallel lines); a fluid stroma filling the inside; 7 stacks (grana) of flat coin-shaped thylakoids, each stack 5–8 thylakoids tall; thin intergranal lamellae connecting neighbouring stacks; 2 small round starch grains in the stroma. Tint the thylakoids green (the site of the light phase) and use a soft accent outline on the stroma region.
Labels: "Outer membrane"; "Inner membrane"; "Stroma"; "Granum"; "Thylakoid"; "Lamella"; "Starch grain"; "Light phase: in the grana"; "Dark phase: in the stroma".
```
*Check:* a double membrane; the grana are stacks joined by lamellae; the starch is in the stroma.

#### G11-14 · The mitochondrion — **A**
`respiration/mitochondrion.png` · `gr11/life/respiration.html` → after *Aerobic respiration*
```text
Brief G11-14. ACCENT #22c55e.
A single mitochondrion as a sausage shape, cut open lengthwise in a flat 3D cutaway: a smooth outer membrane; an inner membrane folded into many finger-like cristae projecting inward; a gel-like matrix filling the inner space, containing a few small ribosome dots and a small loop of mitochondrial DNA; a narrow intermembrane space between the two membranes.
Labels: "Outer membrane"; "Inner membrane"; "Cristae"; "Matrix"; "Intermembrane space"; "Mitochondrial DNA"; "Krebs cycle: in the matrix"; "Oxidative phosphorylation: on the cristae".
```
*Check:* the cristae are folds of the INNER membrane only; the outer membrane is smooth.

#### G11-15 · Primary succession — **B**
`population-ecology/primary-succession.png` · `gr11/life/population-ecology.html` → after *Ecological succession*
```text
Brief G11-15. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
One continuous landscape strip that changes gradually from left to right over time, with a thin soil layer in cutaway at the bottom that gets visibly deeper from left to right: bare rock → lichens on the rock → mosses → grasses and small herbs → shrubs → a mature forest with tall trees. A thin accent arrow along the bottom pointing right, labelled "Time (hundreds of years)".
Labels: "Bare rock"; "Pioneer species: lichens"; "Mosses"; "Grasses"; "Shrubs"; "Climax community"; "Soil"; "Time (hundreds of years)".
```
*Check:* the soil deepens left to right; there is no soil under the bare rock; the lichens come first.

#### G11-16 · Pollen tube and fertilisation — **A**
`reproduction-plants/pollen-tube-fertilisation.png` · `gr11/life/reproduction-plants.html` → after *Fertilisation, seeds, and fruit*
```text
Brief G11-16. ACCENT #22c55e.
A longitudinal section of a carpel only (stigma, style, ovary), enlarged. Two pollen grains sit on the sticky stigma. From one, a pollen tube (accent colour) grows down through the style, enters the ovary, and reaches ONE ovule through the small opening (micropyle) at its end. Inside the tube near its tip are two small male gamete nuclei. Inside that ovule, draw a simple embryo sac containing the egg cell near the micropyle. Show two other ovules in the ovary with no tubes. To the right, a small separate panel with an arrow from the carpel: the ovary developed into a pod-like fruit and the ovules into seeds.
Labels: "Pollen grain"; "Stigma"; "Style"; "Pollen tube"; "Male gametes"; "Ovary"; "Ovule"; "Micropyle"; "Egg cell"; "Ovary becomes the fruit"; "Ovule becomes the seed".
```
*Check:* the tube enters at the micropyle; only one tube per ovule; nothing animal-like is drawn inside the ovule.

### Grade 12

#### G12-01 · Galvanic cell (Zn–Cu Daniell cell) — **A**
`electrochemistry/galvanic-cell.png` · `gr12/chemistry/electrochemistry.html` → after *Galvanic (Voltaic) Cells*
```text
Brief G12-01. ACCENT #c084fc.
Two glass beakers side by side. Left beaker: a grey zinc strip half-immersed in colourless ZnSO₄ solution. Right beaker: an orange-brown copper strip half-immersed in blue CuSO₄ solution. An inverted U-tube salt bridge with a porous plug at each end dips into both solutions. The tops of the two metal strips are joined by wires to a voltmeter between the beakers whose display reads "1.10 V". Accent arrows along the wire show ELECTRON flow from the zinc to the copper (left to right). Inside the salt bridge, two small arrows: cations moving to the right (towards the copper half-cell) and anions moving to the left (towards the zinc half-cell).
Labels: "Zinc anode (−)"; "Copper cathode (+)"; "ZnSO₄(aq)"; "CuSO₄(aq)"; "Salt bridge (KNO₃)"; "Voltmeter"; "1.10 V"; "e⁻"; "Oxidation: Zn → Zn²⁺ + 2e⁻"; "Reduction: Cu²⁺ + 2e⁻ → Cu".
```
*Check:* electrons go Zn → Cu through the wire; zinc is the negative anode; cations in the salt bridge move towards the copper side; the CuSO₄ is blue and the ZnSO₄ colourless; the equations are correct character by character.

#### G12-02 · Electrolytic cell: silver-plating a spoon — **A**
`electrochemistry/electroplating-cell.png` · `gr12/chemistry/electrochemistry.html` → after *Electrolytic Cells*
```text
Brief G12-02. ACCENT #c084fc.
One glass beaker of colourless AgNO₃ solution. On the left, a silver bar dips into the solution; on the right, a steel spoon hangs in it. Above the beaker, a DC power supply (a simple battery symbol drawn as a box with clear "+" and "−" terminals). The silver bar is wired to the "+" terminal and the spoon to the "−" terminal. Accent arrows on the wires show electron flow: from the silver bar to the "+" terminal, and from the "−" terminal to the spoon. In the solution, small Ag⁺ ions drift from the silver bar towards the spoon, and the spoon has a thin shiny silver coating forming.
Labels: "Silver anode (+)"; "Spoon cathode (−)"; "AgNO₃(aq)"; "DC power supply"; "e⁻"; "Ag⁺"; "Oxidation: Ag → Ag⁺ + e⁻"; "Reduction: Ag⁺ + e⁻ → Ag".
```
*Check:* the anode is connected to + (the opposite of the galvanic sign convention, and correct here); the spoon is the cathode; the electrons never travel through the solution.

#### G12-03 · Structure of DNA — **A**
`dna-code-of-life/dna-structure.png` · `gr12/life/dna-code-of-life.html` → after *The structure of DNA*
```text
Brief G12-03. ACCENT #22c55e.
Left: a vertical DNA double helix, about 2 full turns, drawn in flat illustrative style. It must be a RIGHT-HANDED helix (the strands rise from lower-left to upper-right on the front face), with visible alternating major and minor grooves. Two sugar-phosphate backbones as ribbons and the base pairs as horizontal rungs.
Right: the same molecule "untwisted" into a straight ladder section of 5 base pairs, joined to the helix by a thin bracket. Each backbone is drawn as alternating pentagons (deoxyribose) and small circles (phosphate). The rungs, from top to bottom: A–T, G–C, T–A, C–G, A–T. A–T pairs are joined by 2 dashed hydrogen-bond lines and G–C pairs by 3. Colours: A green, T red, G yellow, C blue. One nucleotide (a phosphate + sugar + base) is outlined with an accent bracket.
Labels: "Double helix"; "Sugar-phosphate backbone"; "Deoxyribose sugar"; "Phosphate"; "Nitrogenous base"; "Hydrogen bonds"; "Nucleotide"; "Adenine (A)"; "Thymine (T)"; "Guanine (G)"; "Cytosine (C)".
```
*Check:* **right-handed** helix (the models often draw it left-handed); A always pairs with T and G with C; 2 vs 3 hydrogen bonds; the sequence letters match the brief.

#### G12-04 · DNA replication — **B**
`dna-code-of-life/dna-replication.png` · `gr12/life/dna-code-of-life.html` → after *DNA replication*
```text
Brief G12-04. ACCENT #22c55e.
A DNA ladder (untwisted, as a straight ladder) that is double-stranded at the top and unzipped into a Y shape below. The two ORIGINAL strands are dark grey. In the unzipped part, free nucleotides (floating single units) pair with the exposed bases, and the NEW strands being built are drawn in the accent colour. At the bottom, two complete daughter molecules side by side, each with one grey (old) strand and one accent (new) strand. Use the A–T, G–C pairing with bases coloured A green, T red, G yellow, C blue, and keep the base sequence on each original strand the same in the daughter molecules.
Labels: "Original DNA"; "Hydrogen bonds break (unzipping)"; "Template strand"; "Free nucleotides"; "New strand"; "Two identical DNA molecules"; "Semi-conservative: one old and one new strand".
```
*Check:* each daughter has exactly one old and one new strand; the pairs are A–T and G–C throughout; both daughters have the same sequence.

#### G12-05 · Protein synthesis: transcription and translation — **A**
`dna-code-of-life/protein-synthesis.png` · `gr12/life/dna-code-of-life.html` → after *From gene to protein: the genetic code*
```text
Brief G12-05. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
Left half, inside a large curved nucleus boundary with one nuclear pore: a short section of DNA unwound. The template strand reads, in mono letters, "TAC CGA AAG". An mRNA strand is being built against it, reading "AUG GCU UUC" (U instead of T), and leaves through the nuclear pore (accent arrow).
Right half, in the cytoplasm: the same mRNA ("AUG GCU UUC") passes through a ribosome drawn as two rounded subunits. Three tRNA molecules (simple clover-leaf shapes), each with its anticodon at the bottom and one amino acid ball on top: "UAC" carrying "Met", "CGA" carrying "Ala", "AAG" carrying "Phe". The first two amino acids are already joined by a peptide bond; the third tRNA is arriving.
Labels: "Nucleus"; "Nuclear pore"; "DNA template strand"; "mRNA"; "Transcription"; "Ribosome"; "tRNA"; "Anticodon"; "Codon"; "Amino acid"; "Translation"; "Peptide bond"; "TAC CGA AAG"; "AUG GCU UUC" (appears twice, in the nucleus and at the ribosome; the only allowed repeat); "UAC"; "CGA"; "AAG"; "Met"; "Ala"; "Phe".
```
*Check:* **read every letter**: DNA TAC CGA AAG → mRNA AUG GCU UUC → anticodons UAC CGA AAG → Met, Ala, Phe; the mRNA has no T; transcription is in the nucleus and translation in the cytoplasm. Strong candidate for F3 (text-free base).

#### G12-06 · Meiosis I and II — **A**
`meiosis/meiosis-stages.png` · `gr12/life/meiosis.html` → after *Meiosis II — sister chromatids separate*
```text
Brief G12-06. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
Meiosis in an animal cell with 2n = 4: one LONG homologous pair and one SHORT homologous pair; in each pair one chromosome is pink (maternal) and one is blue (paternal).
Top row, MEIOSIS I, four stages:
Prophase I: the homologous chromosomes paired side by side as 2 bivalents (each a group of 4 chromatids); in the long pair, one pink and one blue chromatid cross over at a chiasma.
Metaphase I: the 2 bivalents lined up in PAIRS on the equator, spindle fibres from the poles.
Anaphase I: whole chromosomes (each still 2 chromatids joined at the centromere) pulled to opposite poles; the swapped segments are visible as a pink tip on a blue chromatid and vice versa.
Telophase I: 2 cells, each with 2 chromosomes (one long, one short), each chromosome still 2 chromatids.
Bottom row, MEIOSIS II, in both cells: Metaphase II (chromosomes in a single line on the equator), Anaphase II (sister chromatids pulled apart), Telophase II: 4 haploid cells, each with 2 single chromosomes (one long, one short), with different pink/blue combinations.
Labels: "Prophase I"; "Metaphase I"; "Anaphase I"; "Telophase I"; "Metaphase II"; "Anaphase II"; "Telophase II"; "Crossing over"; "Chiasma"; "Bivalent"; "Four haploid cells (n = 2)".
```
*Check:* **count**: each of the 4 final cells has exactly 1 long and 1 short chromosome; Metaphase I is paired, Metaphase II is single-file; the crossover segments are traceable. If counts are off after two edits, build it in code.

#### G12-07 · Crossing over (close-up) — **B**
`meiosis/crossing-over.png` · `gr12/life/meiosis.html` → after *Meiosis I — homologous pairs separate*
```text
Brief G12-07. ACCENT #22c55e.
Three stages left to right joined by accent arrows, showing ONE homologous pair only (one pink maternal chromosome, one blue paternal chromosome, each of 2 sister chromatids joined at a centromere):
1 The homologues pair up side by side (synapsis) to form a bivalent of 4 chromatids.
2 One pink and one blue non-sister chromatid cross at a single chiasma.
3 The pair separates: the two crossed chromatids now each carry a swapped end segment (a pink chromatid with a blue tip and a blue chromatid with a pink tip); the other two chromatids are unchanged.
Place allele letters in mono text on the chromatids: "A" and "B" on the pink chromatids, "a" and "b" on the blue ones, with B/b in the tip region that is swapped, so that stage 3 shows recombinant chromatids "A b" and "a B".
Labels: "Synapsis"; "Bivalent"; "Chiasma"; "Non-sister chromatids"; "Recombinant chromatids"; "A"; "B"; "a"; "b".
```
*Check:* only non-sister chromatids exchange; exactly 2 recombinant and 2 parental chromatids at the end.

#### G12-08 · Natural selection: the peppered moth — **B**
`darwinism-natural-selection/peppered-moth.png` · `gr12/life/darwinism-natural-selection.html` → after *Case study: the peppered moth*
```text
Brief G12-08. ACCENT #22c55e.
Two side-by-side panels of tree bark, the same size, each with the same two moths (a pale speckled form and a dark melanic form, wings spread, exactly 4 wings and 2 antennae each):
Left, BEFORE INDUSTRIALISATION: pale bark covered in pale lichen; the pale moth is well camouflaged and the dark moth stands out, with a small bird (a thrush) about to take it.
Right, AFTER INDUSTRIALISATION: soot-darkened bark with no lichen; the dark moth is camouflaged and the pale moth stands out, with the bird about to take it.
Labels: "Before industrialisation"; "After industrialisation (soot-covered bark)"; "Pale form"; "Dark form"; "Predation by birds".
```
*Check:* the camouflaged moth is different in each panel; the moths have correct insect anatomy; the bird takes the visible moth.

#### G12-09 · Skull comparison: chimpanzee, Australopithecus, Homo sapiens — **A**
`evolution-human-evolution/skull-comparison.png` · `gr12/life/evolution-human-evolution.html` → after *Bipedalism — walking on two legs*
```text
Brief G12-09. ACCENT #22c55e.
Three skulls in side view, all facing left, at the same scale, drawn as clean neutral ivory line illustrations (not scary):
1 Chimpanzee: small braincase, heavy brow ridge, strongly protruding jaw (prognathous), large canines, the foramen magnum set towards the BACK of the skull base.
2 Australopithecus africanus (like "Mrs Ples" from Sterkfontein): a slightly larger braincase, a noticeable brow ridge, a moderately protruding jaw, smaller canines, the foramen magnum further forward.
3 Homo sapiens: a large rounded braincase with a high forehead, no brow ridge, a flat face, small canines, a prominent chin, the foramen magnum directly UNDERNEATH the skull.
Beneath each skull, draw a small inset of the skull seen from below with the foramen magnum highlighted in the accent colour. Between the skulls, a thin arrow pointing right labelled "Trend over time".
Labels: "Chimpanzee"; "Australopithecus africanus"; "Homo sapiens"; "Brow ridge"; "Protruding jaw"; "Large canine"; "Rounded cranium"; "Chin"; "Foramen magnum"; "Trend over time".
```
*Check:* the foramen magnum moves from the back to underneath; the brow ridge shrinks and the cranium grows left to right; there is no Homo sapiens brow ridge.

#### G12-10 · Making human insulin with recombinant DNA — **A**
`genetic-engineering/recombinant-insulin.png` · `gr12/life/genetic-engineering.html` → after *Making recombinant DNA — the insulin example*
```text
Brief G12-10. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
Six numbered steps joined by accent arrows, flowing left to right in two rows of three:
1 A human cell with a short DNA segment highlighted in the accent colour (the insulin gene) being cut out by a small pair of "scissors" icon, leaving staggered sticky ends.
2 A bacterium with its chromosome and a small circular plasmid; the plasmid is removed and cut open by the same enzyme, showing matching sticky ends.
3 The insulin gene fitting into the opened plasmid; a small glue-drop icon where the ends join (ligase), forming a closed recombinant plasmid with the accent segment in it.
4 The recombinant plasmid entering a bacterium.
5 A steel fermentation tank full of multiplying bacteria.
6 A vial of insulin.
Place a small number badge 1–6 on each step.
Labels: "Insulin gene cut out by restriction enzyme"; "Plasmid cut with the same restriction enzyme"; "Sticky ends"; "DNA ligase joins the gene into the plasmid"; "Recombinant plasmid"; "Transformation: plasmid enters bacterium"; "Bacteria multiply in a fermenter"; "Human insulin extracted and purified"; "1"; "2"; "3"; "4"; "5"; "6".
```
*Check:* the same enzyme cuts both; the sticky ends are complementary; the recombinant plasmid is a closed ring containing the gene.

#### G12-11 · Gel electrophoresis — **B**
`genetic-engineering/gel-electrophoresis.png` · `gr12/life/genetic-engineering.html` → after *Gel electrophoresis & DNA profiling*
```text
Brief G12-11. ACCENT #22c55e.
A gel electrophoresis tank seen from slightly above: a rectangular tray of translucent gel covered by buffer, a black negative electrode at the TOP end and a red positive electrode at the BOTTOM end, connected by wires to a power supply. A row of 4 wells near the negative end. Bands of DNA (drawn in the accent colour) have moved down from each well. Band positions in each lane, measured from the wells (0 = at the wells, 10 = the far end): Lane 1: 2, 5, 8. Lane 2: 3, 6, 7. Lane 3: 2, 5, 8 (identical to lane 1). Lane 4: 1, 4, 9. A large accent arrow beside the gel points from − to + and is labelled "DNA moves to the positive electrode".
Labels: "Wells"; "Negative electrode (−)"; "Positive electrode (+)"; "Crime scene"; "Suspect 1"; "Suspect 2"; "Suspect 3"; "Larger fragments"; "Smaller fragments"; "DNA moves to the positive electrode".
Lane labels: lane 1 "Crime scene", lane 2 "Suspect 1", lane 3 "Suspect 2", lane 4 "Suspect 3". "Larger fragments" beside the top of the gel, "Smaller fragments" beside the bottom.
```
*Check:* the wells are at the negative end; lanes 1 and 3 match exactly and no other lane does. If the bands won't match, build the band pattern in code and keep only the tank drawing.

#### G12-12 · Thermoregulation in the skin — **A**
`homeostasis/thermoregulation-skin.png` · `gr12/life/homeostasis.html` → after *Thermoregulation*
```text
Brief G12-12. ACCENT #22c55e.
One block of skin in cross-section, split down the middle into two halves, the same structures on each side: epidermis at the top, dermis below, a fatty layer at the bottom. Each half contains a hair in its follicle with a small hair erector muscle, a coiled sweat gland with its duct opening at a sweat pore, and a surface arteriole looping close to the skin surface.
Left half, TOO HOT: the arteriole WIDE and flushed red (vasodilation); sweat droplets on the surface above the pore; the hair erector muscle relaxed and the hair lying flat; wavy accent arrows showing heat leaving the surface.
Right half, TOO COLD: the arteriole NARROW (vasoconstriction); no sweat; the hair erector muscle contracted and the hair standing upright, trapping a layer of air; only one small heat arrow.
Labels: "Too hot"; "Too cold"; "Epidermis"; "Dermis"; "Vasodilation"; "Vasoconstriction"; "Sweat gland"; "Sweat pore"; "Hair erector muscle"; "Heat lost"; "Trapped air".
```
*Check:* the hot side has the wide vessel, sweat and flat hair; the cold side has the narrow vessel, no sweat and erect hair.

#### G12-13 · Phototropism and geotropism: the role of auxin — **A**
`plant-responses/tropisms-auxin.png` · `gr12/life/plant-responses.html` → after *The role of auxin*
```text
Brief G12-13. ACCENT #22c55e.
Left panel, PHOTOTROPISM: three stages of a young shoot (coleoptile) lit only from the RIGHT (parallel light arrows coming from the right edge). Stage 1 upright, with auxin (small accent dots) made in the tip. Stage 2: the auxin dots have gathered on the LEFT (shaded) side, and the cells drawn on that side are longer than on the lit side. Stage 3: the shoot bends TOWARDS the light (to the right).
Right panel, GEOTROPISM: a seedling lying horizontally in a clear container. Auxin dots collect on the LOWER side of both the shoot and the root. The shoot tip curves UP (negative geotropism; cells on its lower side elongate more). The root tip curves DOWN (positive geotropism; auxin inhibits elongation on the root's lower side). A small arrow pointing down labelled "Gravity".
Labels: "Phototropism"; "Geotropism"; "Light"; "Auxin"; "Shaded side: cells elongate more"; "Shoot bends towards light"; "Shoot grows up"; "Root grows down"; "Gravity".
```
*Check:* the auxin is on the shaded side and the shoot bends towards the light; in the horizontal seedling the auxin is on the lower side of both organs, yet the shoot curves up and the root curves down.

#### G12-14 · The amniotic egg — **B**
`reproduction-vertebrates/amniotic-egg.png` · `gr12/life/reproduction-vertebrates.html` → after *Oviparity, ovoviviparity, and viviparity*
```text
Brief G12-14. ACCENT #22c55e.
A longitudinal section of a bird egg with a developing embryo, drawn as a textbook diagram: a porous shell with two shell membranes and an air space at the blunt end; albumen (egg white); a large yellow yolk enclosed by the yolk sac, with blood vessels connecting it to the embryo; a small curled embryo floating in fluid inside the amnion; the allantois as a sac growing out from the embryo's gut, lying against the chorion; the chorion as the outermost membrane lining the shell.
Labels: "Shell"; "Air space"; "Albumen"; "Yolk sac"; "Embryo"; "Amnion"; "Allantois"; "Chorion".
```
*Check:* the amnion immediately surrounds the embryo; the chorion is outermost; the yolk sac is joined to the embryo.

#### G12-15 · Accommodation: distant vs near object — **A**
`nervous-system-senses/accommodation.png` · `gr12/life/nervous-system-senses.html` → after *Accommodation — how the eye focuses*
```text
Brief G12-15. ACCENT #22c55e.
Two identical horizontal cross-sections of the eye stacked one above the other, light entering from the left. Show clearly in each: cornea, iris, lens, suspensory ligaments running from the lens to the ciliary muscle ring, retina.
Top, DISTANT OBJECT: parallel accent light rays arrive from the left, refract slightly at the cornea and the lens, and meet at a point on the retina. The ciliary muscles are relaxed (drawn slimmer), the suspensory ligaments pulled taut (straight lines), the lens thin and flat.
Bottom, NEAR OBJECT: a small upright arrow object close to the eye on the left; the rays diverge from it, refract more strongly and meet at a point on the retina. The ciliary muscles are contracted (drawn thicker), the suspensory ligaments slack (slightly wavy), the lens thick and round.
Labels: "Distant object"; "Near object"; "Ciliary muscles relaxed"; "Ciliary muscles contracted"; "Suspensory ligaments taut"; "Suspensory ligaments slack"; "Lens thin and flat"; "Lens thick and round"; "Retina".
```
*Check:* relaxed muscle + taut ligament + flat lens = distant; contracted muscle + slack ligament + round lens = near (the models swap these); the rays focus ON the retina in both.

#### G12-16 · AC generator — **A**
`electrodynamics/ac-generator.png` · `gr12/physics/electrodynamics.html` → after *AC Generator (Alternator)* (also usable in `gr11/physics/electromagnetic-induction.html` → *AC Generator* and `gr9/energy/electromagnetic-induction.html` → *The AC Generator*)
```text
Brief G12-16. ACCENT #60a5fa.
A clean 3D line illustration at a gentle three-quarter angle: two curved permanent magnets facing each other (N pole red on the left, S pole blue on the right), with straight field lines running from N to S between them. Between the poles, a single rectangular coil (armature) of copper wire on an axle. The two ends of the coil connect to TWO SEPARATE, complete, unsplit copper slip rings on the axle, each pressed on by its own carbon brush. The brushes connect by wires to a small light bulb. A curved accent arrow shows the coil's rotation. Beside it, a small inset graph of output emf against time showing a smooth sine wave that goes above and below zero (no numbers).
Labels: "N"; "S"; "Coil (armature)"; "Slip rings"; "Brushes"; "Axle"; "Magnetic field"; "Rotation"; "Alternating emf".
```
*Check:* two whole, separate slip rings (NOT a split ring); each brush touches its own ring; the field runs N → S; the output graph crosses zero.

#### G12-17 · DC generator (split-ring commutator) — **B**
`electrodynamics/dc-generator.png` · `gr12/physics/electrodynamics.html` → after *DC Generator*
```text
Brief G12-17. ACCENT #60a5fa.
The same layout and style as an AC generator (two curved magnets, N red on the left and S blue on the right, a rectangular coil on an axle), but the coil ends connect to ONE copper ring split into two halves with two narrow insulating gaps (a split-ring commutator). Two carbon brushes press on opposite sides of the split ring and connect to a light bulb. A curved accent arrow shows the rotation. Beside it, a small inset graph of output emf against time showing a series of positive half-wave humps that never go below zero (no numbers).
Labels: "N"; "S"; "Coil"; "Split-ring commutator"; "Brushes"; "Rotation"; "Pulsating DC emf".
```
*Check:* one ring split into two halves with gaps; the output graph never goes negative.

#### G12-18 · DC electric motor — **A**
`electrodynamics/dc-motor.png` · `gr12/physics/electrodynamics.html` → after *Electric Motor*
```text
Brief G12-18. ACCENT #60a5fa.
A clean 3D line illustration viewed from slightly above and in front: two curved permanent magnets (N red on the left, S blue on the right) with field lines running from N to S (left to right). Between them, a flat rectangular coil lying horizontally on an axle that points TOWARDS the viewer; the split-ring commutator and its two carbon brushes are at the FRONT end of the axle (nearest the viewer), wired to a battery. Small accent arrows on the coil show the conventional current: it enters at the commutator, runs along the RIGHT side of the coil AWAY from the viewer, across the back end, and returns along the LEFT side TOWARDS the viewer to the commutator. Two thick force arrows: on the LEFT side of the coil pointing UP; on the RIGHT side pointing DOWN. A curved arrow at the front shows the resulting CLOCKWISE rotation as seen from the commutator end.
Labels: "N"; "S"; "Coil"; "Split-ring commutator"; "Brushes"; "Battery"; "Current"; "Force"; "Rotation".
```
*Check:* field left→right, current towards the viewer on the left side → force up (F = IL × B), and the reverse on the right side, so the rotation is clockwise from the commutator end; the commutator is split. If the model flips any arrow, use F1 to fix that one arrow.

#### G12-19 · Step-up and step-down transformers — **A**
`electrodynamics/transformers.png` · `gr12/physics/electrodynamics.html` → after *Transformers* (also usable in `gr11/physics/electromagnetic-induction.html` and `gr9/energy/electromagnetic-induction.html` → *Transformers*)
```text
Brief G12-19. ACCENT #60a5fa.
Two transformers side by side, each built on a square laminated soft-iron core drawn as a grey square ring with visible thin laminations. The primary coil is wound on the LEFT limb and the secondary coil on the RIGHT limb. An accent loop inside the core shows the changing magnetic flux circulating around it.
Left, STEP-UP: the primary has 4 turns and the secondary 12 turns (count them).
Right, STEP-DOWN: the primary has 12 turns and the secondary 4 turns.
Each primary connects to an AC supply symbol (a circle with a small sine wave) and each secondary to a resistor-shaped load.
Labels: "Step-up transformer"; "Step-down transformer"; "Primary coil"; "Secondary coil"; "Soft-iron core"; "AC input"; "Output"; "Ns > Np"; "Ns < Np"; "Magnetic flux".
```
*Check:* **count the turns** (4 and 12); the step-up has more secondary turns; the coils sit on opposite limbs; the supply is AC.

#### G12-20 · The Doppler effect: moving source — **A**
`doppler-effect/doppler-wavefronts.png` · `gr12/physics/doppler-effect.html` → after *Definition and Cause*
```text
Brief G12-20. ACCENT #60a5fa.
A simple ambulance (side view, no text on it) moving to the RIGHT, shown with a thick accent velocity arrow. Around it, 6 circular wavefronts drawn as thin lines. The circles are NOT concentric: each was emitted from an earlier position of the ambulance, so their centres are spaced along a line to the LEFT of the ambulance, with the largest (oldest) circle's centre furthest left. As a result the circles are crowded together on the right (in front of the ambulance) and spread apart on the left (behind it). Every circle is a complete circle that fully encloses the smaller ones, and no circles cross. A listener stands on each side: on the right, "Listener A" with a short wavelength bracket; on the left, "Listener B" with a longer wavelength bracket.
Labels: "Source moving"; "Listener A: shorter wavelength, higher frequency"; "Listener B: longer wavelength, lower frequency"; "Wavefront".
```
*Check:* the centres shift towards the rear; the circles never intersect; the crowding is in front; the ambulance has no gibberish lettering.

#### G12-21 · The photoelectric effect — **A**
`photoelectric-effect/photoelectric-effect.png` · `gr12/physics/photoelectric-effect.html` → after *The Photoelectric Effect*
```text
Brief G12-21. ACCENT #60a5fa.
Three panels side by side, each showing a flat grey metal plate at the bottom with light arriving from the upper left as wavy photon packets (short wave squiggles with arrowheads), with small blue electron dots on the surface of the plate.
1 RED LIGHT, bright (many photons), frequency below threshold: no electrons leave the plate.
2 BLUE LIGHT, dim (few photons), frequency above threshold: a few electrons are ejected, each with a speed arrow.
3 BLUE LIGHT, bright (many photons): MORE electrons are ejected, but with speed arrows the SAME length as in panel 2.
Labels: "f < f₀: no electrons emitted"; "f > f₀: electrons emitted"; "Higher intensity: more electrons, same maximum Ek"; "Photon"; "Electron"; "Metal surface".
```
*Check:* red ejects nothing however bright; panels 2 and 3 have identical arrow lengths; panel 3 has more electrons.

### Grade 12: replacements for the existing images

#### G12-R1 · The human eye (replaces `eye-anatomy.png`) — **A**
`nervous-system-senses/eye-anatomy.png` · `gr12/life/nervous-system-senses.html` (same place)
```text
Brief G12-R1. ACCENT #22c55e.
A horizontal cross-section of the right eye, front facing left, drawn as a textbook diagram. Outer layers: a white sclera continuous with a transparent bulging cornea at the front; a dark choroid layer inside the sclera; the retina as the innermost layer lining the back. At the front: the coloured iris with a central gap (pupil), clear aqueous humour between the cornea and the iris, the biconvex lens behind the iris held by suspensory ligaments attached to the ciliary body/muscle ring. The large chamber behind the lens is filled with clear vitreous humour. At the back: a small pit (fovea / yellow spot) directly opposite the lens, and the optic nerve leaving slightly towards the nose side, where there is a blind spot with no retina. Two accent light rays come from the left, bend at the cornea and again at the lens, pass through the pupil, and meet at the fovea.
Labels: "Cornea"; "Iris"; "Pupil"; "Aqueous humour"; "Lens"; "Suspensory ligaments"; "Ciliary muscle"; "Vitreous humour"; "Sclera"; "Choroid"; "Retina"; "Fovea (yellow spot)"; "Blind spot"; "Optic nerve".
```
*Check:* the rays pass through the pupil and focus at the fovea; the blind spot is where the optic nerve leaves; the lens sits behind the iris.

#### G12-R2 · The reflex arc (replaces `reflex-arc.png`) — **A**
`nervous-system-senses/reflex-arc.png` · `gr12/life/nervous-system-senses.html` (same place)
```text
Brief G12-R2. ACCENT #22c55e.
Left: a hand whose fingertip touches the hot surface of a pan (a flat, stylised, no-glow hot plate; 5 fingers). Centre: a transverse section of the spinal cord: butterfly-shaped grey matter inside white matter, a small central canal, a dorsal root (towards the top of the image) with a swelling (the dorsal root ganglion) and a ventral root (towards the bottom) with NO swelling. Right: the upper-arm flexor (biceps) muscle.
Pathway, drawn as one continuous chain with accent arrows showing the direction: a receptor in the skin of the fingertip → the sensory neuron running to the spinal cord, with its cell body INSIDE the dorsal root ganglion → entering the dorsal part of the grey matter and synapsing with a short relay neuron inside the grey matter → the relay neuron synapsing with a motor neuron whose cell body is in the ventral grey matter → the motor neuron leaving through the ventral root and running to the biceps, ending in motor end plates.
Labels: "Receptor (in skin)"; "Sensory neuron"; "Dorsal root ganglion"; "Relay neuron"; "Grey matter"; "White matter"; "Motor neuron"; "Effector (muscle)"; "Spinal cord".
```
*Check:* only the dorsal root has a ganglion; the sensory cell body is in the ganglion, not the finger; the arrows run receptor → sensory → relay → motor → effector.

#### G12-R3 · Structure of a motor neuron (replaces `neuron-structure.png`) — **B**
`nervous-system-senses/neuron-structure.png` · `gr12/life/nervous-system-senses.html` (same place)
```text
Brief G12-R3. ACCENT #22c55e.
A motor neuron drawn horizontally: branching dendrites around a cell body with a nucleus on the left; a long axon running right, wrapped in segments of myelin sheath separated by small gaps (nodes of Ranvier); the axon ending in branched axon terminals on the right. An accent arrow along the axon shows the direction of the impulse from the cell body towards the terminals. A rounded-rectangle zoom joined to one terminal by two thin lines shows a synapse: the terminal knob containing round synaptic vesicles, neurotransmitter molecules crossing a narrow synaptic cleft, and receptor sites on the next cell's membrane.
Labels: "Dendrites"; "Cell body"; "Nucleus"; "Axon"; "Myelin sheath"; "Node of Ranvier"; "Axon terminals"; "Direction of impulse"; "Synaptic vesicle"; "Neurotransmitter"; "Synaptic cleft"; "Receptor".
```
*Check:* the impulse arrow points away from the cell body; the myelin is in segments with gaps.

#### G12-R4 · The human ear (replaces `ear-anatomy.png`) — **A**
`nervous-system-senses/ear-anatomy.png` · `gr12/life/nervous-system-senses.html` (same place)
```text
Brief G12-R4. ACCENT #22c55e.
A frontal cross-section of the right ear, the outside of the head on the left: the pinna, the ear canal leading to a thin tympanic membrane (eardrum); in the air-filled middle ear, the three ossicles in a chain (hammer touching the eardrum, anvil, stirrup whose footplate sits in the oval window); a Eustachian tube running down from the middle ear towards the throat; in the inner ear, the three semi-circular canals (at right angles to each other) and the snail-shaped cochlea (about 2.5 turns), with the auditory nerve leaving the cochlea. Three brackets across the top group the outer, middle and inner ear. An accent arrow shows sound entering the ear canal.
Labels: "Outer ear"; "Middle ear"; "Inner ear"; "Pinna"; "Ear canal"; "Tympanic membrane"; "Ossicles"; "Oval window"; "Eustachian tube"; "Semi-circular canals"; "Cochlea"; "Auditory nerve".
```
*Check:* the ossicles connect eardrum to oval window in the right order; 3 semi-circular canals; the Eustachian tube leaves the MIDDLE ear.

#### G12-R5 · Major endocrine glands (replaces `endocrine-glands-overview.png`) — **A**
`human-endocrine-system/endocrine-glands-overview.png` · `gr12/life/human-endocrine-system.html` (same place)
```text
Brief G12-R5. ACCENT #22c55e.
Centre: a plain, neutral, gender-neutral human outline (front view, head in the same view) showing only these glands in position, in the accent colour: hypothalamus and pituitary gland at the base of the brain; the butterfly-shaped thyroid in the front of the neck; the pancreas behind the stomach area; an adrenal gland capping the top of each kidney (kidneys drawn in pale neutral outline for reference). No blood vessels, no other organs, no background.
Bottom corners: two small separate rounded panels (NOT attached to the body): bottom-left "male" showing the two testes in a scrotum outline; bottom-right "female" showing the uterus outline with the two ovaries.
Labels: "Hypothalamus"; "Pituitary gland"; "Thyroid gland"; "Adrenal glands"; "Pancreas"; "Testes (male)"; "Ovaries (female)".
```
*Check:* there are no gonads on the central body; the adrenals sit on the kidneys; there are no ghosted background figures or magnifying glass.

#### G12-R6 · The pancreas: endocrine and exocrine (replaces `pancreas-endocrine-exocrine.png`) — **A**
`human-endocrine-system/pancreas-endocrine-exocrine.png` · `gr12/life/human-endocrine-system.html` (same place)
```text
Brief G12-R6. ACCENT #22c55e.
Top centre: the pancreas (elongated, pale pink-cream) with its pancreatic duct joining the C-shaped duodenum on the left.
Two rounded-rectangle zooms below, each joined to the pancreas by two thin lines:
Left zoom, ENDOCRINE: a pale cluster of cells (an islet of Langerhans) beside a blood capillary; small accent hormone shapes pass from the cells THROUGH the capillary wall into the blood. No duct.
Right zoom, EXOCRINE: a ring of wedge-shaped acinar cells around a small central space that drains into a duct; small enzyme shapes (a different shape, neutral colour) flow into the duct towards the duodenum.
Labels: "Pancreas"; "Pancreatic duct"; "Duodenum"; "Endocrine: islet of Langerhans"; "Insulin and glucagon into the blood"; "Capillary"; "Exocrine: acinar cells"; "Digestive enzymes into the duct".
```
*Check:* every label appears once; the hormones go into the blood and the enzymes into the duct; no ghost body outline.

#### G12-R7 · Hormones act only on target cells (replaces `hormone-target-specificity.png`) — **B**
`human-endocrine-system/hormone-target-specificity.png` · `gr12/life/human-endocrine-system.html` (same place)
```text
Brief G12-R7. ACCENT #22c55e.
A blood capillary running horizontally across the top third, with red blood cells and many small triangular hormone molecules (accent colour) inside it. Some triangles pass THROUGH the thin capillary wall into the tissue fluid below. Below, three cells in a row: the middle cell has triangular receptor notches on its membrane that exactly fit the triangles, and several triangles are bound to them; the left and right cells have receptors of different shapes (square and round notches) and the triangles pass them by without binding. No organs are drawn.
Labels: "Capillary"; "Hormone"; "Target cell: matching receptors"; "Non-target cell: no matching receptors"; "Receptor".
```
*Check:* the hormones leave through the capillary wall (not an open cut end); only the middle cell binds them; "Non-target cell" appears once, with leader lines to both outer cells (allowed).

#### G12-R8 · Nervous vs endocrine control (replaces `nervous-vs-endocrine-control.png`) — **B**
`human-endocrine-system/nervous-vs-endocrine-control.png` · `gr12/life/human-endocrine-system.html` (same place)
```text
Brief G12-R8. ACCENT #22c55e.
Two panels separated by a thin vertical line.
Left, NERVOUS: a single neuron whose axon runs directly to one muscle, with a row of small accent arrows along the axon showing an impulse (no glow, no zigzag).
Right, ENDOCRINE: a small gland releasing hormone molecules into a blood vessel; the vessel branches and carries the hormones to three distant target cells.
Under each panel, three short mono-style lines comparing speed, route and duration.
Labels: "Nervous control"; "Endocrine control"; "Electrical impulse along a neuron"; "Hormones carried in the blood"; "Fast · short-lived · localised"; "Slower · longer-lasting · widespread".
```
*Check:* each heading appears once; there is no glowing zigzag.

#### G12-R9 · Male reproductive system (replaces `male-reproductive-system.png`) — **A**
`human-reproduction/male-reproductive-system.png` · `gr12/life/human-reproduction.html` (same place)
```text
Brief G12-R9. ACCENT #22c55e.
A side-view (sagittal) section of the male pelvis, facing left, drawn as a neutral textbook diagram. Structures: the bladder; the urethra running from the bladder through the prostate gland and along the length of the penis; a testis inside the scrotum, with the epididymis coiled along its back; the vas deferens (sperm duct) running UP from the epididymis, looping over the top of the ureter, passing behind the bladder and joining the duct of the seminal vesicle, then entering the prostate to join the urethra; the seminal vesicle behind the bladder; a small Cowper's gland below the prostate. Trace the route of sperm with a thin accent line with small arrows: testis → epididymis → vas deferens → urethra.
Labels: "Bladder"; "Seminal vesicle"; "Prostate gland"; "Cowper's gland"; "Vas deferens"; "Urethra"; "Penis"; "Epididymis"; "Testis"; "Scrotum".
```
*Check:* each leader lands on its own structure (the old image pointed "epididymis" at the penis); the vas deferens goes up and over the ureter, not straight into the bladder; there is no sparkle watermark.

#### G12-R10 · Female reproductive system (replaces `female-reproductive-system.png`) — **A**
`human-reproduction/female-reproductive-system.png` · `gr12/life/human-reproduction.html` (same place)
```text
Brief G12-R10. ACCENT #22c55e.
A FRONT-view section only (no side-view parts, no pelvis bones, no spine, no bladder) of the female reproductive organs, symmetrical: a pear-shaped uterus cut open to show its cavity, with the thick muscular wall (myometrium) and the inner lining (endometrium) as a distinct layer; a narrow cervix at the base leading into the vagina; an oviduct (fallopian tube) leaving each upper corner of the uterus and curving out to a fringed funnel (fimbriae) next to an oval ovary on each side, the ovaries attached to the uterus by a short ligament. Label structures on ONE side only: the leader lines go to the left ovary and the left oviduct.
Labels: "Ovary"; "Oviduct (fallopian tube)"; "Fimbriae"; "Uterus"; "Endometrium"; "Myometrium"; "Cervix"; "Vagina".
```
*Check:* front view only (no hybrid); each label once; the oviducts open near the ovaries rather than attaching to them.

#### G12-R11 · From ovulation to implantation (replaces `fertilisation-implantation.png`) — **A**
`human-reproduction/fertilisation-implantation.png` · `gr12/life/human-reproduction.html` (same place)
```text
Brief G12-R11. ACCENT #22c55e. Canvas: wide 16:9 (1792 × 1024).
A front-view section of one ovary, the oviduct and one half of the uterus, arranged so the journey reads left to right. In the ovary, a mature follicle releases an egg (ovulation). The egg is swept into the fimbriae. In the UPPER THIRD of the oviduct, several sperm surround the egg and one fuses with it (fertilisation) to form a zygote. Along the oviduct, in order: 2-cell stage, 4-cell stage, morula (solid ball of cells), blastocyst (hollow ball with a fluid-filled cavity and an inner cell mass), each drawn the same overall size. In the uterus, the blastocyst embeds in the thick endometrium (implantation). An accent arrow runs along the whole path.
Labels: "Ovary"; "Ovulation"; "Fimbriae"; "Fertilisation"; "Zygote"; "Morula"; "Blastocyst"; "Implantation"; "Endometrium".
```
*Check:* fertilisation happens in the upper oviduct, not at the fimbriae; the embryo doesn't grow in size before implantation; each label once.

---

## 8. Content issues found in the lessons while writing this

These are in the lesson text, not the images, but the images will contradict them unless they are fixed:

1. **`gr7/earth/earth-moon.html`, Moon Phases table.** The table says a waxing crescent is a "thin sliver visible on **right**", first quarter is "**right** half lit", and so on. That is the **Northern** Hemisphere view. The note directly under the table correctly says the lit side appears on the **left** during waxing phases in the Southern Hemisphere. South African learners see the opposite of what the table says. Swap left and right in the table (or add a "Southern Hemisphere view" column).
2. **`gr8/energy/light.html`, spectrum of visible light.** The text says the colours are listed "from lowest frequency (longest wavelength) to highest", then lists **V I B G Y O R**, which runs from highest frequency to lowest. Either reverse the list to ROYGBIV or change the wording to "from highest frequency to lowest".
3. **`gr10/life/support-systems-animals.html`, The human skeleton.** The axial skeleton is described as only "the skull (cranium and facial bones)…". It should also include the vertebral column, ribs and sternum. Brief G10-13 shades the full axial skeleton, so the text and image will disagree until this is fixed.
