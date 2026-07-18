// Isometric Drawing II — Deeper Sectioning. Chapter data. Requires engine-geometry.js loaded
// first (window.ConstructionGeometry). Grade 12 tier escalation of isometric-drawing.data.js
// (Ch4, which already introduced a basic quarter-sectioned isometric block) — this chapter goes
// further: half-sections, ribs-not-hatched, isometric dimensioning, sectioned holes, exploded
// views and sectioned assemblies.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // Same isometric axes and helpers as isometric-drawing.data.js (each chapter file is
  // self-contained, matching the pattern already used throughout Drawing Druid).
  const U = [Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6)];
  const V = [Math.cos(7 * Math.PI / 6), Math.sin(7 * Math.PI / 6)];
  function iso(origin, a, b) { return [origin[0] + a * U[0] + b * V[0], origin[1] + a * U[1] + b * V[1]]; }
  function raise(p, h) { return [p[0], p[1] - h]; }
  function lerp(p1, p2, t) { return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t]; }
  function isoHatch(p1, p2, h, n) {
    const lines = [];
    for (let i = 1; i < n; i++) {
      const p = lerp(p1, p2, i / n);
      lines.push({ kind: 'line', p1: p, p2: raise(p, h), lineType: 'B' });
    }
    return lines;
  }

  // ── 1. Isometric Half-Section ──
  (function () {
    const O = [95, 130], W = 60, D = 60, H = 40;
    const P1 = iso(O, 0, D / 2), P2 = iso(O, W, D / 2);
    const C = iso(O, W, D), B = iso(O, 0, D);
    const bottomOutline = [P1, P2, C, B];
    const topOutline = bottomOutline.map(p => raise(p, H));
    CONSTRUCTIONS['isometric-half-section'] = {
      id: 'isometric-half-section', title: 'Isometric Half-Section',
      summary: 'A half-section removes exactly HALF the object along a single cutting plane — simpler than the quarter-section already covered, and just as common on real components.',
      bounds: { w: 190, h: 195 },
      workbookPrompt: 'Draw a 60 mm cube in isometric with the near half removed along a single vertical cutting plane, hatching the one newly-exposed face.',
      steps: [
        {
          id: 1,
          instruction: 'The full isometric block, before sectioning.',
          calloutAt: O,
          reveals: [
            { kind: 'line', p1: O, p2: iso(O, W, 0), lineType: 'construction' }, { kind: 'line', p1: O, p2: B, lineType: 'construction' },
            { kind: 'line', p1: iso(O, W, 0), p2: C, lineType: 'construction' }, { kind: 'line', p1: B, p2: C, lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Unlike the quarter-section (two cutting planes, one quarter removed), a half-section uses just ONE cutting plane, straight through the block\'s centre — removing an entire half in one cut.',
          calloutAt: [P1[0], P1[1] - H / 2],
          reveals: [
            { kind: 'line', p1: P1, p2: P2, lineType: 'centre' },
          ],
        },
        {
          id: 3,
          instruction: 'Redraw the outline with the near half gone — a simple 4-point outline (still parallelogram-shaped), far simpler than the quarter-section\'s 6-point L-shape.',
          calloutAt: [P2[0], P2[1] - H / 2],
          reveals: [
            { kind: 'polygon', points: bottomOutline, lineType: 'A' },
            { kind: 'polygon', points: topOutline, lineType: 'A' },
            ...bottomOutline.map((p, i) => ({ kind: 'line', p1: p, p2: topOutline[i], lineType: 'A' })),
          ],
        },
        {
          id: 4,
          instruction: 'Hatch the single newly-exposed face — one cutting plane, one hatched face, the rest of the object is left as a normal unhatched exterior view.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] - H / 2],
          reveals: [...isoHatch(P1, P2, H, 8)],
        },
      ],
    };
  })();

  // ── 2. Sectioned Isometric — Rib Not Hatched ──
  (function () {
    const O = [95, 155], W = 60, D = 60, H = 20, ribA0 = 26, ribA1 = 34, RIBH = 30;
    const P1 = iso(O, 0, D / 2), P2 = iso(O, W, D / 2);
    const C = iso(O, W, D), B = iso(O, 0, D);
    const bottomOutline = [P1, P2, C, B];
    const topOutline = bottomOutline.map(p => raise(p, H));
    const ribP1 = iso(O, ribA0, D / 2), ribP2 = iso(O, ribA1, D / 2);
    const ribBase1 = raise(ribP1, H), ribBase2 = raise(ribP2, H);
    const ribTop1 = raise(ribP1, H + RIBH), ribTop2 = raise(ribP2, H + RIBH);
    CONSTRUCTIONS['isometric-rib-not-hatched'] = {
      id: 'isometric-rib-not-hatched', title: 'Sectioned Isometric — Rib Not Hatched',
      summary: 'A rib or web is a THIN strengthening wall, not solid bulk material — even when the cutting plane slices straight through it, convention says leave it unhatched.',
      bounds: { w: 190, h: 190 },
      workbookPrompt: 'Draw a half-sectioned base plate with a vertical rib rising from it, positioned exactly on the cutting plane. Hatch the base but leave the rib\'s own cut face unhatched.',
      steps: [
        {
          id: 1,
          instruction: 'The half-sectioned base plate, hatched exactly as in the previous sheet.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] - H / 2],
          reveals: [
            { kind: 'polygon', points: bottomOutline, lineType: 'A' }, { kind: 'polygon', points: topOutline, lineType: 'A' },
            ...bottomOutline.map((p, i) => ({ kind: 'line', p1: p, p2: topOutline[i], lineType: 'A' })),
            ...isoHatch(P1, P2, H, 8),
          ],
        },
        {
          id: 2,
          instruction: 'A thin rib rises from the base, positioned exactly on the same cutting plane — so its own cross-section is exposed too, sitting directly above the hatched base.',
          calloutAt: [(ribBase1[0] + ribTop1[0]) / 2, (ribBase1[1] + ribTop1[1]) / 2],
          reveals: [
            { kind: 'line', p1: ribBase1, p2: ribTop1, lineType: 'A' }, { kind: 'line', p1: ribBase2, p2: ribTop2, lineType: 'A' },
            { kind: 'line', p1: ribTop1, p2: ribTop2, lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Notice the rib\'s exposed face is OUTLINED but deliberately left unhatched — if it were hatched like solid material, the drawing would falsely suggest the rib is far bulkier than it really is, misleading anyone reading wall thicknesses off the drawing.',
          calloutAt: [(ribBase1[0] + ribBase2[0]) / 2, (ribBase1[1] + ribTop1[1]) / 2 + 4],
          reveals: [],
        },
        {
          id: 4,
          instruction: 'This is the exact same rule already used throughout orthographic sectioning — ribs, webs and similar thin strengthening features are never hatched in section, on any type of drawing, isometric or orthographic.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] + 15],
          reveals: [],
        },
      ],
    };
  })();

  // ── 3. Isometric Dimensioning ──
  (function () {
    const O = [80, 150], W = 50, D = 35, H = 40;
    const A = iso(O, W, 0), B = iso(O, 0, D), C = iso(O, W, D);
    const Ot = raise(O, H), At = raise(A, H), Bt = raise(B, H), Ct = raise(C, H);
    CONSTRUCTIONS['isometric-dimensioning'] = {
      id: 'isometric-dimensioning', title: 'Isometric Dimensioning',
      summary: 'Unlike an orthographic drawing, an isometric dimension line is never simply horizontal or vertical — it runs parallel to whichever isometric axis it is measuring.',
      bounds: { w: 175, h: 175 },
      workbookPrompt: 'Draw a 50 x 35 x 40 mm isometric block, fully dimensioned — width, depth and height — with each dimension line correctly parallel to its own axis.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the plain isometric block first, exactly as in earlier chapters.',
          calloutAt: O,
          reveals: [
            { kind: 'polygon', points: [O, A, C, B], lineType: 'A' }, { kind: 'polygon', points: [Ot, At, Ct, Bt], lineType: 'A' },
            { kind: 'line', p1: O, p2: Ot, lineType: 'A' }, { kind: 'line', p1: A, p2: At, lineType: 'A' },
            { kind: 'line', p1: B, p2: Bt, lineType: 'A' }, { kind: 'line', p1: C, p2: Ct, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the WIDTH dimension line runs parallel to the width (U) axis — the same direction as the edge it measures, never a flat horizontal line as it would be on an orthographic view.',
          calloutAt: lerp(O, A, 0.5),
          reveals: [{ kind: 'dimension', p1: O, p2: A, offset: 14, text: '50' }],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the DEPTH dimension line runs parallel to the depth (V) axis, at its own distinct angle — different from both the width and height dimension lines.',
          calloutAt: lerp(O, B, 0.5),
          reveals: [{ kind: 'dimension', p1: O, p2: B, offset: -14, text: '35' }],
        },
        {
          id: 4,
          instruction: 'Balloon 3: the HEIGHT dimension is the one case that still looks familiar — the vertical axis is genuinely vertical in isometric, so its dimension line is a plain vertical line, exactly like an orthographic height dimension.',
          calloutAt: lerp(O, Ot, 0.5),
          reveals: [{ kind: 'dimension', p1: O, p2: Ot, offset: -16, text: '40' }],
        },
      ],
    };
  })();

  // ── 4. Isometric Half-Section Through a Blind Hole ──
  (function () {
    const O = [95, 150], W = 60, D = 60, H = 40, holeA0 = 20, holeA1 = 40, holeDepth = 20;
    const P1 = iso(O, 0, D / 2), P2 = iso(O, W, D / 2);
    const C = iso(O, W, D), B = iso(O, 0, D);
    const bottomOutline = [P1, P2, C, B];
    const topOutline = bottomOutline.map(p => raise(p, H));
    const holeBottomH = H - holeDepth;
    const holeP1 = iso(O, holeA0, D / 2), holeP2 = iso(O, holeA1, D / 2);
    function sectionHatchWithHole(p1, p2, fullH, skipA0, skipA1, holeFloorH, n) {
      const lines = [];
      for (let i = 1; i < n; i++) {
        const t = i / n;
        const a = t * W;
        const p = lerp(p1, p2, t);
        const capH = (a > skipA0 && a < skipA1) ? holeFloorH : fullH;
        if (capH > 0.01) lines.push({ kind: 'line', p1: p, p2: raise(p, capH), lineType: 'B' });
      }
      return lines;
    }
    CONSTRUCTIONS['isometric-half-section-blind-hole'] = {
      id: 'isometric-half-section-blind-hole', title: 'Isometric Half-Section Through a Blind Hole',
      summary: 'Where a blind (not-through) hole crosses the cutting plane, the hatching simply stops at the hole\'s floor — leaving the hole itself as a clean, unhatched gap in the section.',
      bounds: { w: 190, h: 195 },
      workbookPrompt: 'Draw a half-sectioned 60 mm block containing a 20 mm deep blind hole, 20 mm wide, centred on the cutting plane. Hatch the section, stopping the hatching at the hole\'s floor.',
      steps: [
        {
          id: 1,
          instruction: 'The plain half-sectioned outline, exactly as in the first sheet of this chapter.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] - H],
          reveals: [
            { kind: 'polygon', points: bottomOutline, lineType: 'A' }, { kind: 'polygon', points: topOutline, lineType: 'A' },
            ...bottomOutline.map((p, i) => ({ kind: 'line', p1: p, p2: topOutline[i], lineType: 'A' })),
          ],
        },
        {
          id: 2,
          instruction: 'Mark the hole\'s floor (its blind bottom) and its two side walls — the hole is centred exactly on the cutting plane, so both its walls and its floor are now directly visible.',
          calloutAt: raise(lerp(holeP1, holeP2, 0.5), holeBottomH),
          reveals: [
            { kind: 'line', p1: holeP1, p2: raise(holeP1, holeBottomH), lineType: 'A' }, { kind: 'line', p1: holeP2, p2: raise(holeP2, holeBottomH), lineType: 'A' },
            { kind: 'line', p1: raise(holeP1, holeBottomH), p2: raise(holeP2, holeBottomH), lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Hatch the section — everywhere the hole is present, the hatching simply stops at the floor line instead of continuing to the full top surface; everywhere else, hatching runs the full height as usual.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] - H / 2],
          reveals: [...sectionHatchWithHole(P1, P2, H, holeA0, holeA1, holeBottomH, 10)],
        },
        {
          id: 4,
          instruction: 'The result reads unambiguously as a blind hole in section: solid material hatched right up to the surface everywhere except directly above the hole, where the hatching correctly stops at its floor.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] + 15],
          reveals: [],
        },
      ],
    };
  })();

  // ── 5. Exploded Isometric Assembly ──
  (function () {
    const O = [95, 195], W = 50, D = 50;
    const Ha = 15, GAP1 = 22, Hb = 15, GAP2 = 22, Hc = 10;
    const baseTop = Ha;
    const midStart = baseTop + GAP1, midTop = midStart + Hb;
    const capStart = midTop + GAP2;
    const Ob = raise(O, midStart), Oc = raise(O, capStart);
    function block(origin, h) {
      const a = iso(origin, W, 0), b = iso(origin, 0, D), c = iso(origin, W, D);
      const at = raise(a, h), bt = raise(b, h), ct = raise(c, h), ot = raise(origin, h);
      return [
        { kind: 'polygon', points: [origin, a, c, b], lineType: 'A' }, { kind: 'polygon', points: [ot, at, ct, bt], lineType: 'A' },
        { kind: 'line', p1: origin, p2: ot, lineType: 'A' }, { kind: 'line', p1: a, p2: at, lineType: 'A' },
        { kind: 'line', p1: b, p2: bt, lineType: 'A' }, { kind: 'line', p1: c, p2: ct, lineType: 'A' },
      ];
    }
    const centreBase = iso(O, W / 2, D / 2);
    CONSTRUCTIONS['exploded-isometric-assembly'] = {
      id: 'exploded-isometric-assembly', title: 'Exploded Isometric Assembly',
      summary: 'Pulling every part apart along one shared axis, connected by a single centre line, shows exactly how an assembly goes together — without any part hiding another.',
      bounds: { w: 175, h: 230 },
      workbookPrompt: 'Draw three stacked blocks (a base, a middle spacer, and a cap) exploded apart along the vertical axis, connected by a single common centre line through all three.',
      steps: [
        {
          id: 1,
          instruction: 'Balloon 1: the BASE part, drawn first in its normal isometric form.',
          calloutAt: O,
          reveals: [...block(O, Ha)],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the MIDDLE part, drawn exactly the same way but shifted up along the vertical axis, leaving a clear gap — the exploded distance is simply a drawing convention, not a real gap in the assembled part.',
          calloutAt: Ob,
          reveals: [...block(Ob, Hb)],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the CAP part, exploded further still — every part now fully visible, none hidden behind another.',
          calloutAt: Oc,
          reveals: [...block(Oc, Hc)],
        },
        {
          id: 4,
          instruction: 'Balloon 4: a single centre line threads through every part\'s true assembled position — this is what proves to the reader exactly how, and in what order, the parts go back together.',
          calloutAt: [centreBase[0], centreBase[1] - (capStart + Hc + 15)],
          reveals: [
            { kind: 'line', p1: iso(O, W / 2, D / 2), p2: raise(iso(O, W / 2, D / 2), capStart + Hc + 10), lineType: 'centre' },
          ],
        },
      ],
    };
  })();

  // ── 6. Sectioned Isometric Assembly — Housing & Insert ──
  (function () {
    const O = [90, 150], W = 60, D = 60, H = 40;
    const pocketA0 = 15, pocketA1 = 45, pocketDepth = 25;
    const insetA0 = 17, insetA1 = 43, insetH = 20, GAP = 2;
    const P1 = iso(O, 0, D / 2), P2 = iso(O, W, D / 2);
    const C = iso(O, W, D), B = iso(O, 0, D);
    const bottomOutline = [P1, P2, C, B];
    const topOutline = bottomOutline.map(p => raise(p, H));
    const pocketFloorH = H - pocketDepth;
    function sectionHatchWithPocket(p1, p2, fullH, skipA0, skipA1, floorH, n) {
      const lines = [];
      for (let i = 1; i < n; i++) {
        const t = i / n;
        const a = t * W;
        const p = lerp(p1, p2, t);
        const capH = (a > skipA0 && a < skipA1) ? floorH : fullH;
        if (capH > 0.01) lines.push({ kind: 'line', p1: p, p2: raise(p, capH), lineType: 'B' });
      }
      return lines;
    }
    const insetP1 = iso(O, insetA0, D / 2), insetP2 = iso(O, insetA1, D / 2);
    const insetFloorH = pocketFloorH;
    function insetHatch(p1, p2, floorH, topH, n) {
      const lines = [];
      for (let i = 1; i < n; i++) {
        const t = i / n;
        const p = raise(lerp(p1, p2, t), floorH);
        lines.push({ kind: 'line', p1: p, p2: raise(p, topH - floorH), lineType: 'B' });
      }
      return lines;
    }
    CONSTRUCTIONS['sectioned-isometric-assembly'] = {
      id: 'sectioned-isometric-assembly', title: 'Sectioned Isometric Assembly — Housing & Insert',
      summary: 'Two separate mating parts, both sectioned by the same cutting plane at once — a small clearance line between them is all that separates "one solid part" from "two parts that fit together".',
      bounds: { w: 190, h: 195 },
      workbookPrompt: 'Draw a half-sectioned housing block with a 25 mm deep pocket, containing a 20 mm tall insert seated in the pocket with a small clearance gap all round.',
      steps: [
        {
          id: 1,
          instruction: 'The housing block, half-sectioned exactly as earlier in this chapter, with a pocket recessed from the top.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] - H],
          reveals: [
            { kind: 'polygon', points: bottomOutline, lineType: 'A' }, { kind: 'polygon', points: topOutline, lineType: 'A' },
            ...bottomOutline.map((p, i) => ({ kind: 'line', p1: p, p2: topOutline[i], lineType: 'A' })),
            ...sectionHatchWithPocket(P1, P2, H, pocketA0, pocketA1, pocketFloorH, 10),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the housing\'s pocket floor and walls, exactly like the blind hole from the earlier sheet — but this time, something else is going to sit inside it.',
          calloutAt: raise(lerp(iso(O, pocketA0, D / 2), iso(O, pocketA1, D / 2), 0.5), pocketFloorH),
          reveals: [],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the INSERT, seated on the pocket floor, is drawn slightly smaller than the pocket itself — the small gap on each side is the clearance that lets the two parts actually be assembled and separated again.',
          calloutAt: raise(lerp(insetP1, insetP2, 0.5), insetFloorH + insetH / 2),
          reveals: [
            { kind: 'line', p1: raise(insetP1, insetFloorH), p2: raise(insetP1, insetFloorH + insetH), lineType: 'A' },
            { kind: 'line', p1: raise(insetP2, insetFloorH), p2: raise(insetP2, insetFloorH + insetH), lineType: 'A' },
            { kind: 'line', p1: raise(insetP1, insetFloorH + insetH), p2: raise(insetP2, insetFloorH + insetH), lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 3: hatch the insert\'s own cut face too, since the SAME cutting plane slices through it as well — but as two separate parts, this hatching is its own independent pattern, not a continuation of the housing\'s.',
          calloutAt: raise(lerp(insetP1, insetP2, 0.5), insetFloorH + insetH / 2 - 8),
          reveals: [...insetHatch(insetP1, insetP2, insetFloorH, insetFloorH + insetH, 5)],
        },
      ],
    };
  })();

  // ── 7. Sectioned Bracket — Rib and Hole Together ──
  (function () {
    const O = [90, 150], W = 60, D = 60, H = 24, ribA0 = 8, ribA1 = 16, RIBH = 26;
    const holeA0 = 34, holeA1 = 50, holeDepth = 14;
    const P1 = iso(O, 0, D / 2), P2 = iso(O, W, D / 2);
    const C = iso(O, W, D), B = iso(O, 0, D);
    const bottomOutline = [P1, P2, C, B];
    const topOutline = bottomOutline.map(p => raise(p, H));
    const ribP1 = iso(O, ribA0, D / 2), ribP2 = iso(O, ribA1, D / 2);
    const holeFloorH = H - holeDepth;
    function sectionHatchWithHole(p1, p2, fullH, skipA0, skipA1, holeFloorH, n) {
      const lines = [];
      for (let i = 1; i < n; i++) {
        const t = i / n;
        const a = t * W;
        const p = lerp(p1, p2, t);
        const capH = (a > skipA0 && a < skipA1) ? holeFloorH : fullH;
        if (capH > 0.01) lines.push({ kind: 'line', p1: p, p2: raise(p, capH), lineType: 'B' });
      }
      return lines;
    }
    CONSTRUCTIONS['sectioned-bracket-rib-and-hole'] = {
      id: 'sectioned-bracket-rib-and-hole', title: 'Sectioned Bracket — Rib and Hole Together',
      summary: 'A single realistic component, both conventions applied at once: the rib stays unhatched, the blind hole\'s hatching stops at its floor, and the surrounding solid material is hatched throughout.',
      bounds: { w: 190, h: 195 },
      workbookPrompt: 'Draw a half-sectioned bracket combining a rib (left) and a blind hole (right) in the same section, applying the correct convention to each.',
      steps: [
        {
          id: 1,
          instruction: 'The half-sectioned base outline.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] - H - 12],
          reveals: [
            { kind: 'polygon', points: bottomOutline, lineType: 'A' }, { kind: 'polygon', points: topOutline, lineType: 'A' },
            ...bottomOutline.map((p, i) => ({ kind: 'line', p1: p, p2: topOutline[i], lineType: 'A' })),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 1: the rib on the left — outlined, but left unhatched, exactly per the rib convention.',
          calloutAt: raise(lerp(ribP1, ribP2, 0.5), H + RIBH / 2),
          reveals: [
            { kind: 'line', p1: raise(ribP1, H), p2: raise(ribP1, H + RIBH), lineType: 'A' }, { kind: 'line', p1: raise(ribP2, H), p2: raise(ribP2, H + RIBH), lineType: 'A' },
            { kind: 'line', p1: raise(ribP1, H + RIBH), p2: raise(ribP2, H + RIBH), lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 2: the blind hole on the right — its hatching correctly stops at the hole\'s own floor, exactly per the blind-hole convention.',
          calloutAt: raise(lerp(iso(O, holeA0, D / 2), iso(O, holeA1, D / 2), 0.5), holeFloorH + 4),
          reveals: [
            { kind: 'line', p1: iso(O, holeA0, D / 2), p2: raise(iso(O, holeA0, D / 2), holeFloorH), lineType: 'A' }, { kind: 'line', p1: iso(O, holeA1, D / 2), p2: raise(iso(O, holeA1, D / 2), holeFloorH), lineType: 'A' },
            { kind: 'line', p1: raise(iso(O, holeA0, D / 2), holeFloorH), p2: raise(iso(O, holeA1, D / 2), holeFloorH), lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Hatch the whole solid base, skipping the rib\'s footprint (which is empty air below the rib, and unhatched above it) and stopping the hatching at the hole\'s floor.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] + 12],
          reveals: [...sectionHatchWithHole(P1, P2, H, holeA0, holeA1, holeFloorH, 10)],
        },
      ],
    };
  })();

  // ── 8. Capstone — Fully Sectioned & Dimensioned Isometric Bracket ──
  (function () {
    const O = [90, 165], W = 60, D = 60, H = 24, ribA0 = 8, ribA1 = 16, RIBH = 26;
    const holeA0 = 34, holeA1 = 50, holeDepth = 14;
    const P1 = iso(O, 0, D / 2), P2 = iso(O, W, D / 2);
    const C = iso(O, W, D), B = iso(O, 0, D);
    const bottomOutline = [P1, P2, C, B];
    const topOutline = bottomOutline.map(p => raise(p, H));
    const ribP1 = iso(O, ribA0, D / 2), ribP2 = iso(O, ribA1, D / 2);
    const holeFloorH = H - holeDepth;
    function sectionHatchWithHole(p1, p2, fullH, skipA0, skipA1, holeFloorH, n) {
      const lines = [];
      for (let i = 1; i < n; i++) {
        const t = i / n;
        const a = t * W;
        const p = lerp(p1, p2, t);
        const capH = (a > skipA0 && a < skipA1) ? holeFloorH : fullH;
        if (capH > 0.01) lines.push({ kind: 'line', p1: p, p2: raise(p, capH), lineType: 'B' });
      }
      return lines;
    }
    CONSTRUCTIONS['isometric-section-capstone'] = {
      id: 'isometric-section-capstone', title: 'Capstone — Fully Sectioned & Dimensioned Isometric Bracket',
      summary: 'Every technique from this chapter, applied together on one finished, fully dimensioned working drawing: half-section, rib convention, blind-hole convention, and correctly-angled isometric dimensioning.',
      bounds: { w: 195, h: 195 },
      workbookPrompt: 'Draw the complete bracket: half-sectioned, showing a correctly-unhatched rib and a correctly-terminated blind hole, fully dimensioned with width, depth and height.',
      steps: [
        {
          id: 1,
          instruction: 'The full sectioned bracket: half-section outline, rib left unhatched, hole hatching stopped at its floor.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] - H - 15],
          reveals: [
            { kind: 'polygon', points: bottomOutline, lineType: 'A' }, { kind: 'polygon', points: topOutline, lineType: 'A' },
            ...bottomOutline.map((p, i) => ({ kind: 'line', p1: p, p2: topOutline[i], lineType: 'A' })),
            { kind: 'line', p1: raise(ribP1, H), p2: raise(ribP1, H + RIBH), lineType: 'A' }, { kind: 'line', p1: raise(ribP2, H), p2: raise(ribP2, H + RIBH), lineType: 'A' },
            { kind: 'line', p1: raise(ribP1, H + RIBH), p2: raise(ribP2, H + RIBH), lineType: 'A' },
            { kind: 'line', p1: iso(O, holeA0, D / 2), p2: raise(iso(O, holeA0, D / 2), holeFloorH), lineType: 'A' }, { kind: 'line', p1: iso(O, holeA1, D / 2), p2: raise(iso(O, holeA1, D / 2), holeFloorH), lineType: 'A' },
            { kind: 'line', p1: raise(iso(O, holeA0, D / 2), holeFloorH), p2: raise(iso(O, holeA1, D / 2), holeFloorH), lineType: 'A' },
            ...sectionHatchWithHole(P1, P2, H, holeA0, holeA1, holeFloorH, 10),
          ],
        },
        {
          id: 2,
          instruction: 'Add the WIDTH dimension, parallel to the U axis.',
          calloutAt: lerp(P1, P2, 0.5),
          reveals: [{ kind: 'dimension', p1: P1, p2: P2, offset: 16, text: '60' }],
        },
        {
          id: 3,
          instruction: 'Add the HEIGHT dimension, plainly vertical since the height axis is the one axis that stays true-vertical in isometric.',
          calloutAt: lerp(P2, raise(P2, H), 0.5),
          reveals: [{ kind: 'dimension', p1: P2, p2: raise(P2, H), offset: 14, text: '24' }],
        },
        {
          id: 4,
          instruction: 'The finished working drawing: a real, buildable component, fully described by a single sectioned isometric view — this is exactly the standard this whole chapter has been building toward.',
          calloutAt: [(P1[0] + P2[0]) / 2, P1[1] + 15],
          reveals: [],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'What is the key difference between a half-section and the quarter-section covered earlier in this course?',
      options: [
        'A half-section uses only ONE cutting plane and removes an entire half; a quarter-section uses TWO cutting planes and removes only a quarter',
        'A half-section is only used on cylindrical parts, never on blocks',
        'They are exactly the same technique with different names',
        'A half-section always shows less internal detail than a quarter-section'],
      answer: 0,
      explanation: 'A half-section is a single straight cut removing half the object, producing one exposed face and a simple 4-point outline — simpler than the quarter-section\'s two cuts and 6-point L-shaped outline.',
    },
    {
      text: 'Why is a rib (a thin strengthening web) left unhatched, even when the cutting plane passes directly through it?',
      options: [
        'Hatching it like solid material would falsely suggest it is far bulkier than it actually is',
        'Ribs are never actually cut by a cutting plane in real components',
        'Hatching a rib is optional and purely a matter of personal drawing style',
        'Ribs are always shown as hidden (dashed) detail instead of solid outline'],
      answer: 0,
      explanation: 'A rib is thin, not solid bulk. Hatching it exactly like the surrounding solid material would misrepresent its true (thin) cross-section to anyone reading the drawing.',
    },
    {
      text: 'How does an isometric dimension line differ from an ordinary orthographic dimension line?',
      options: [
        'It runs parallel to whichever isometric axis it is measuring, rather than always being flat horizontal or vertical',
        'Isometric drawings are never dimensioned at all',
        'It is always drawn as a dashed line instead of a solid one',
        'It always uses a different unit of measurement (inches instead of mm)'],
      answer: 0,
      explanation: 'Because isometric edges run along three different axis directions (two receding, one true-vertical), each dimension line must be drawn parallel to the specific edge it measures.',
    },
    {
      text: 'In a sectioned isometric view showing a blind hole, what happens to the hatching directly above the hole?',
      options: [
        'The hatching stops exactly at the hole\'s floor, leaving the hole itself as a clean, unhatched gap',
        'The hatching continues straight through the hole as if it were solid material',
        'The entire section is left completely unhatched wherever any hole exists anywhere on the part',
        'Blind holes are never shown in an isometric section, only through-holes are'],
      answer: 0,
      explanation: 'A blind hole is empty space down to its floor. The hatching correctly terminates at that floor line, showing solid material everywhere else and leaving the hole itself blank.',
    },
    {
      text: 'What is the purpose of the single centre line running through every part of an exploded isometric assembly?',
      options: [
        'It shows the shared assembly axis, proving exactly how and in what order the parts fit back together',
        'It marks the position of the cutting plane for a section view',
        'It is purely decorative, with no real technical meaning',
        'It indicates which part is the heaviest in the assembly'],
      answer: 0,
      explanation: 'The exploded gaps are only a drawing convention — the centre line threading through every part\'s true assembled position is what tells the reader how they actually align and reassemble.',
    },
    {
      text: 'When two separate mating parts (e.g. a housing and an insert) are both sliced by the same cutting plane in a sectioned assembly, how are their two hatched areas kept visually distinct?',
      options: [
        'Each part gets its own independent hatching, distinguishing it as a separate component from its neighbour',
        'Only one of the two parts is ever hatched; the other is always left blank',
        'The two parts must always be drawn in completely different colours',
        'Sectioned assemblies never show two different parts on the same cutting plane'],
      answer: 0,
      explanation: 'Exactly like an orthographic sectioned assembly, each individual part gets its own separate hatching pattern, so touching parts still read clearly as distinct components.',
    },
    {
      text: 'In the "rib and hole together" bracket, why are the rib and the hole positioned in different regions of the block\'s width?',
      options: [
        'So each convention (rib unhatched, hole hatching terminated at its floor) can be applied cleanly without the two features overlapping',
        'Because a rib and a hole can never legally exist on the same real component',
        'It has no technical reason, purely an arbitrary drawing layout choice',
        'Because ribs must always be positioned to the left of any hole on every drawing'],
      answer: 0,
      explanation: 'Separating the two features keeps each convention clean and unambiguous to read — in a real component they could be positioned however the design requires, as long as each is still handled with its own correct convention.',
    },
    {
      text: 'On the capstone bracket, which single dimension line is the ONE that still looks like an ordinary orthographic dimension?',
      options: [
        'The height dimension, since the true-vertical isometric axis is genuinely vertical on the page',
        'The width dimension, since it is always drawn horizontally',
        'The depth dimension, since it always matches the height dimension exactly',
        'None of the three dimensions ever resemble an orthographic dimension'],
      answer: 0,
      explanation: 'Both the width and depth axes recede at an angle in isometric, so their dimension lines are angled too. Only the vertical (height) axis stays genuinely vertical, so only that dimension line looks like a normal orthographic one.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'isometric-half-section', 'isometric-rib-not-hatched', 'isometric-dimensioning', 'isometric-half-section-blind-hole',
    'exploded-isometric-assembly', 'sectioned-isometric-assembly', 'sectioned-bracket-rib-and-hole', 'isometric-section-capstone',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
