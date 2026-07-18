// Solid Geometry — Chapter 5 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // 45°-hatching line segments clipped to a rectangle [x0,x0+w] x [y0,y0+h]. B-weight per
  // the CAPS/SANS line-type spec.
  function hatchRect(x0, y0, w, h, spacing) {
    const lines = [];
    for (let k = -h; k <= w + 0.01; k += spacing) {
      const vLo = Math.max(0, -k), vHi = Math.min(h, w - k);
      if (vHi <= vLo) continue;
      const u1 = vLo + k, v1 = vLo, u2 = vHi + k, v2 = vHi;
      lines.push({ kind: 'line', p1: [x0 + u1, y0 + v1], p2: [x0 + u2, y0 + v2], lineType: 'B' });
    }
    return lines;
  }

  // ── 1. Hexagonal Prism — First-Angle Views ──
  (function () {
    const R = 25, H = 55;
    const hexLocal = G.regularPolygonInCircle([0, 0], R, 6, -90);
    const xs = hexLocal.map(p => p[0]), ys = hexLocal.map(p => p[1]);
    const hexW = Math.max(...xs) - Math.min(...xs); // front-view width
    const hexD = Math.max(...ys) - Math.min(...ys); // side-view width

    const FV_CX = 100, FV_TOP = 55, FV_BOTTOM = FV_TOP + H;
    const FV_LEFT = FV_CX - hexW / 2, FV_RIGHT = FV_CX + hexW / 2;

    const GAP = 18;
    const topCY = FV_BOTTOM + GAP + R;
    const hexTop = G.regularPolygonInCircle([FV_CX, topCY], R, 6, -90);

    const SV_RIGHT = FV_LEFT - GAP, SV_LEFT = SV_RIGHT - hexD;

    CONSTRUCTIONS['hex-prism-first-angle'] = {
      id: 'hex-prism-first-angle', title: 'Hexagonal Prism (1st Angle)',
      summary: 'Draw a hexagonal prism in first-angle projection — the mirror-image layout rule of the 3rd-angle projection used for mechanical drawings.',
      bounds: { w: 150, h: 205 },
      workbookPrompt: 'Draw the front, top and side views of the hexagonal prism in FIRST-angle projection. Remember: the top view goes below the front view, and the side view goes to the left.',
      steps: [
        {
          id: 1,
          instruction: 'In FIRST-angle projection, the object sits between you and the projection plane, so each view lands on the OPPOSITE side from the direction you\'re viewing from. Start with the front view — a simple rectangle for this upright hexagonal prism.',
          calloutAt: [FV_CX, (FV_TOP + FV_BOTTOM) / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_LEFT, FV_TOP], [FV_RIGHT, FV_TOP], [FV_RIGHT, FV_BOTTOM], [FV_LEFT, FV_BOTTOM]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Project the TOP view — but in 1st angle, it goes BELOW the front view (the opposite of 3rd angle). Since the prism stands upright, the top view shows the hexagon in its true shape.',
          calloutAt: [FV_CX, topCY],
          reveals: [
            { kind: 'polygon', points: hexTop, lineType: 'A' },
            { kind: 'line', p1: [FV_LEFT, FV_BOTTOM], p2: [FV_LEFT, topCY - R], lineType: 'construction' },
            { kind: 'line', p1: [FV_RIGHT, FV_BOTTOM], p2: [FV_RIGHT, topCY - R], lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Project the SIDE view — in 1st angle, it goes to the LEFT of the front view (again, the opposite of 3rd angle).',
          calloutAt: [(SV_LEFT + SV_RIGHT) / 2, (FV_TOP + FV_BOTTOM) / 2],
          reveals: [
            { kind: 'polygon', points: [[SV_LEFT, FV_TOP], [SV_RIGHT, FV_TOP], [SV_RIGHT, FV_BOTTOM], [SV_LEFT, FV_BOTTOM]], lineType: 'A' },
            { kind: 'line', p1: [SV_RIGHT, FV_TOP], p2: [FV_LEFT, FV_TOP], lineType: 'construction' },
            { kind: 'line', p1: [SV_RIGHT, FV_BOTTOM], p2: [FV_LEFT, FV_BOTTOM], lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'Add a centre line through the hexagon and dimension the across-flats width and the prism height.',
          calloutAt: [FV_CX, FV_BOTTOM + 10],
          reveals: [
            { kind: 'line', p1: [FV_CX, topCY - R - 5], p2: [FV_CX, topCY + R + 5], lineType: 'centre' },
            { kind: 'line', p1: [FV_CX - hexW / 2 - 5, topCY], p2: [FV_CX + hexW / 2 + 5, topCY], lineType: 'centre' },
            { kind: 'dimension', p1: [FV_LEFT, FV_TOP - 8], p2: [FV_RIGHT, FV_TOP - 8], offset: -6, text: hexW.toFixed(1) },
            { kind: 'dimension', p1: [SV_LEFT - 8, FV_TOP], p2: [SV_LEFT - 8, FV_BOTTOM], offset: -6, text: String(H) },
          ],
        },
      ],
    };
  })();

  // ── 2. Square Prism: True Shape of an Inclined Cut ──
  (function () {
    const S = 45, H = 70, DROP = 30;
    const FV_LEFT = 100, FV_TOP = 30;
    const FV_RIGHT = FV_LEFT + S, FV_BOTTOM = FV_TOP + H;
    const cutP1 = [FV_LEFT, FV_TOP];
    const cutP2 = [FV_RIGHT, FV_TOP + DROP];
    const slopeLength = G.distance(cutP1, cutP2);

    // "Removed" true-shape view, placed clear of the front view, labelled and dimensioned.
    const TS_LEFT = FV_LEFT, TS_TOP = FV_BOTTOM + 30;

    CONSTRUCTIONS['inclined-cut-true-shape'] = {
      id: 'inclined-cut-true-shape', title: 'Inclined Cut: True Shape',
      summary: 'Cut a square prism with an inclined plane and find the true shape of the cut surface — an auxiliary "removed view", labelled and placed clear of the main drawing.',
      bounds: { w: 165, h: 190 },
      workbookPrompt: 'Draw the square prism with the inclined cutting plane shown true length in the front view, then construct the true shape of the cut surface as a labelled removed view.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view of the upright square prism.',
          calloutAt: [(FV_LEFT + FV_RIGHT) / 2, (FV_TOP + FV_BOTTOM) / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_LEFT, FV_TOP], [FV_RIGHT, FV_TOP], [FV_RIGHT, FV_BOTTOM], [FV_LEFT, FV_BOTTOM]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the cutting plane as a straight line across the front face. Because this plane does not vary through the prism\'s depth, it appears here at its TRUE LENGTH — but its width across the page (foreshortened) is NOT its true shape.',
          calloutAt: [(cutP1[0] + cutP2[0]) / 2, (cutP1[1] + cutP2[1]) / 2 - 8],
          reveals: [
            { kind: 'line', p1: cutP1, p2: cutP2, lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'The true shape of the cut is a rectangle: one side is the true length of the cutting line you just drew; the other side is the prism\'s depth, which the cut does not distort at all. Draw this as a labelled "removed view" placed clear of the main drawing.',
          calloutAt: [TS_LEFT + slopeLength / 2, TS_TOP + S / 2],
          reveals: [
            { kind: 'polygon', points: [[TS_LEFT, TS_TOP], [TS_LEFT + slopeLength, TS_TOP], [TS_LEFT + slopeLength, TS_TOP + S], [TS_LEFT, TS_TOP + S]], lineType: 'A' },
            { kind: 'label', at: [TS_LEFT, TS_TOP - 6], text: 'TRUE SHAPE OF SECTION A-A', size: 4.5, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'Dimension the true shape: its length equals the true length of the cutting line, and its width equals the prism\'s side length.',
          calloutAt: [TS_LEFT + slopeLength / 2, TS_TOP + S + 14],
          reveals: [
            { kind: 'dimension', p1: [TS_LEFT, TS_TOP + S + 6], p2: [TS_LEFT + slopeLength, TS_TOP + S + 6], offset: 8, text: slopeLength.toFixed(1) },
            { kind: 'dimension', p1: [TS_LEFT - 8, TS_TOP], p2: [TS_LEFT - 8, TS_TOP + S], offset: -6, text: String(S) },
            { kind: 'label', at: [cutP1[0], cutP1[1] - 4], text: 'A', size: 5, anchor: 'middle', color: '#fde047' },
            { kind: 'label', at: [cutP2[0] + 4, cutP2[1]], text: 'A', size: 5, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 3. Square Pyramid — First-Angle Views ──
  (function () {
    const W = 50, H = 45, FV_CX = 100, FV_TOP = 55, FV_BOTTOM = FV_TOP + H;
    const FV_LEFT = FV_CX - W / 2, FV_RIGHT = FV_CX + W / 2;
    const GAP = 18;
    const TV_TOP = FV_BOTTOM + GAP, TV_BOTTOM = TV_TOP + W;
    const TV_LEFT = FV_LEFT, TV_RIGHT = FV_RIGHT;
    const tvCentre = [FV_CX, (TV_TOP + TV_BOTTOM) / 2];
    const SV_RIGHT = FV_LEFT - GAP, SV_LEFT = SV_RIGHT - W;

    CONSTRUCTIONS['square-pyramid-views'] = {
      id: 'square-pyramid-views', title: 'Square Pyramid — First-Angle Views',
      summary: 'Project the three 1st-angle views of a right square pyramid — the base projects true size in the top view, with all four sloped edges visible from directly above.',
      bounds: { w: 190, h: 210 },
      workbookPrompt: 'Draw the front, top and side views of the square pyramid (base 50 mm, height 45 mm) in FIRST-angle projection.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view: an isoceles triangle — the base is the pyramid\'s true width, the apex sits directly above the centre at the true height.',
          calloutAt: [FV_CX, FV_TOP + H / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_LEFT, FV_BOTTOM], [FV_RIGHT, FV_BOTTOM], [FV_CX, FV_TOP]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Project the TOP view BELOW the front view (1st-angle rule): the true-size square base, with all four sloped edges drawn solid — they are visible from directly above, not hidden.',
          calloutAt: tvCentre,
          reveals: [
            { kind: 'polygon', points: [[TV_LEFT, TV_TOP], [TV_RIGHT, TV_TOP], [TV_RIGHT, TV_BOTTOM], [TV_LEFT, TV_BOTTOM]], lineType: 'A' },
            { kind: 'line', p1: [TV_LEFT, TV_TOP], p2: tvCentre, lineType: 'A' },
            { kind: 'line', p1: [TV_RIGHT, TV_TOP], p2: tvCentre, lineType: 'A' },
            { kind: 'line', p1: [TV_LEFT, TV_BOTTOM], p2: tvCentre, lineType: 'A' },
            { kind: 'line', p1: [TV_RIGHT, TV_BOTTOM], p2: tvCentre, lineType: 'A' },
            { kind: 'line', p1: [FV_LEFT, FV_BOTTOM], p2: [TV_LEFT, TV_TOP], lineType: 'construction' },
            { kind: 'line', p1: [FV_RIGHT, FV_BOTTOM], p2: [TV_RIGHT, TV_TOP], lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Project the SIDE view to the LEFT of the front view (1st-angle rule) — by symmetry, it is the identical triangle shape as the front view.',
          calloutAt: [(SV_LEFT + SV_RIGHT) / 2, FV_TOP + H / 2],
          reveals: [
            { kind: 'polygon', points: [[SV_LEFT, FV_BOTTOM], [SV_RIGHT, FV_BOTTOM], [(SV_LEFT + SV_RIGHT) / 2, FV_TOP]], lineType: 'A' },
            { kind: 'line', p1: [SV_RIGHT, FV_BOTTOM], p2: [FV_LEFT, FV_BOTTOM], lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'Add centre lines and dimension the base and height.',
          calloutAt: [FV_CX, FV_BOTTOM + 8],
          reveals: [
            { kind: 'line', p1: [FV_CX, FV_TOP - 6], p2: [FV_CX, FV_BOTTOM + 4], lineType: 'centre' },
            { kind: 'line', p1: [TV_LEFT - 5, tvCentre[1]], p2: [TV_RIGHT + 5, tvCentre[1]], lineType: 'centre' },
            { kind: 'dimension', p1: [FV_LEFT, FV_BOTTOM + 10], p2: [FV_RIGHT, FV_BOTTOM + 10], offset: 0, text: String(W) },
            { kind: 'dimension', p1: [FV_LEFT - 10, FV_TOP], p2: [FV_LEFT - 10, FV_BOTTOM], offset: 0, text: String(H) },
          ],
        },
      ],
    };
  })();

  // ── 4. Pentagonal Prism — First-Angle Views ──
  (function () {
    const R = 28, H = 55;
    const pentaLocal = G.regularPolygonInCircle([0, 0], R, 5, -90);
    const pxs = pentaLocal.map(p => p[0]), pys = pentaLocal.map(p => p[1]);
    const pentaW = Math.max(...pxs) - Math.min(...pxs), pentaD = Math.max(...pys) - Math.min(...pys);

    const FV_CX = 100, FV_TOP = 55, FV_BOTTOM = FV_TOP + H;
    const FV_LEFT = FV_CX - pentaW / 2, FV_RIGHT = FV_CX + pentaW / 2;
    const GAP = 18;
    const topCY = FV_BOTTOM + GAP - Math.min(...pys);
    const pentaTop = G.regularPolygonInCircle([FV_CX, topCY], R, 5, -90);
    const SV_RIGHT = FV_LEFT - GAP, SV_LEFT = SV_RIGHT - pentaD;

    CONSTRUCTIONS['pentagonal-prism-views'] = {
      id: 'pentagonal-prism-views', title: 'Pentagonal Prism — First-Angle Views',
      summary: 'Project the three 1st-angle views of a right regular pentagonal prism, one of the five side-counts (3, 4, 5, 6 or 8) CAPS prescribes for Grade 10 solid geometry.',
      bounds: { w: 200, h: 210 },
      workbookPrompt: 'Draw the front, top and side views of the pentagonal prism (circumradius 28 mm, height 55 mm) in FIRST-angle projection.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view as a plain rectangle — the prism stands upright, so its height profile has no sloped or curved edges.',
          calloutAt: [FV_CX, (FV_TOP + FV_BOTTOM) / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_LEFT, FV_TOP], [FV_RIGHT, FV_TOP], [FV_RIGHT, FV_BOTTOM], [FV_LEFT, FV_BOTTOM]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Project the TOP view BELOW the front view (1st-angle rule): the pentagon in true shape, since we\'re looking straight down the prism\'s axis.',
          calloutAt: [FV_CX, topCY],
          reveals: [
            { kind: 'polygon', points: pentaTop, lineType: 'A' },
            { kind: 'line', p1: [FV_LEFT, FV_BOTTOM], p2: [FV_LEFT, topCY - R], lineType: 'construction' },
            { kind: 'line', p1: [FV_RIGHT, FV_BOTTOM], p2: [FV_RIGHT, topCY - R], lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Project the SIDE view to the LEFT of the front view (1st-angle rule), using the pentagon\'s depth extent from the top view.',
          calloutAt: [(SV_LEFT + SV_RIGHT) / 2, (FV_TOP + FV_BOTTOM) / 2],
          reveals: [
            { kind: 'polygon', points: [[SV_LEFT, FV_TOP], [SV_RIGHT, FV_TOP], [SV_RIGHT, FV_BOTTOM], [SV_LEFT, FV_BOTTOM]], lineType: 'A' },
            { kind: 'line', p1: [SV_RIGHT, FV_TOP], p2: [FV_LEFT, FV_TOP], lineType: 'construction' },
            { kind: 'line', p1: [SV_RIGHT, FV_BOTTOM], p2: [FV_LEFT, FV_BOTTOM], lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'Add a centre line through the pentagon and dimension the circumradius and prism height.',
          calloutAt: [FV_CX, FV_BOTTOM + 10],
          reveals: [
            { kind: 'line', p1: [FV_CX, topCY - R - 5], p2: [FV_CX, topCY + pentaD + Math.min(...pys) + 5], lineType: 'centre' },
            { kind: 'dimension', p1: [FV_CX, topCY - R], p2: [FV_CX, topCY], offset: 10, text: String(R) },
            { kind: 'dimension', p1: [SV_LEFT - 8, FV_TOP], p2: [SV_LEFT - 8, FV_BOTTOM], offset: -6, text: String(H) },
          ],
        },
      ],
    };
  })();

  // ── 5. Cylinder — True Shape of an Oblique Cut ──
  (function () {
    const R = 22, H = 70, DROP = 35, N = 12;
    const FV_LEFT = 100, FV_TOP = 30, FV_RIGHT = FV_LEFT + 2 * R, FV_BOTTOM = FV_TOP + H;
    const FV_CX = FV_LEFT + R;
    const cutP1 = [FV_LEFT, FV_TOP], cutP2 = [FV_RIGHT, FV_TOP + DROP];
    const slopeLength = G.distance(cutP1, cutP2);

    const TV_CY = FV_BOTTOM + 30;
    const topPts = Array.from({ length: N }, (_, i) => {
      const th = i * 2 * Math.PI / N;
      return { th, x: R * Math.cos(th), y: R * Math.sin(th) };
    });

    const TS_LEFT = FV_LEFT, TS_TOP = TV_CY + R + 30, TS_CX = TS_LEFT + slopeLength / 2, TS_CY = TS_TOP + R;
    const truePts = topPts.map(p => {
      const t = (p.x + R) / (2 * R); // fraction of the way across the cut
      const alongSlope = t * slopeLength;
      return [TS_LEFT + alongSlope, TS_CY + p.y];
    });
    const smoothTrue = G.catmullRomExpand(truePts.concat([truePts[0], truePts[1]]), 6);

    CONSTRUCTIONS['cylinder-oblique-true-shape'] = {
      id: 'cylinder-oblique-true-shape', title: 'Cylinder — True Shape of an Oblique Cut',
      summary: 'Cut a cylinder with an inclined plane and find the true shape of the cut — an ellipse, found the same way as any inclined true shape: project points around the circle, transfer the true along-slope distance for each.',
      bounds: { w: 175, h: 260 },
      workbookPrompt: 'Draw the cylinder (44 mm diameter, 70 mm tall) cut by an inclined plane, then construct the true shape of the cut surface using 12 points taken from the top-view circle.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view (a plain rectangle — a cylinder standing upright has no sloped edges) and the top view (the true-size circle).',
          calloutAt: [FV_CX, (FV_TOP + FV_BOTTOM) / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_LEFT, FV_TOP], [FV_RIGHT, FV_TOP], [FV_RIGHT, FV_BOTTOM], [FV_LEFT, FV_BOTTOM]], lineType: 'A' },
            { kind: 'circle', center: [FV_CX, TV_CY], r: R, lineType: 'A' },
            { kind: 'line', p1: [FV_LEFT, FV_BOTTOM], p2: [FV_LEFT, TV_CY - R], lineType: 'construction' },
            { kind: 'line', p1: [FV_RIGHT, FV_BOTTOM], p2: [FV_RIGHT, TV_CY - R], lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the inclined cutting line across the front view — true length here, since it does not vary through the depth. Divide the top-view circle into 12 equal parts.',
          calloutAt: G.midpoint(cutP1, cutP2),
          reveals: [
            { kind: 'line', p1: cutP1, p2: cutP2, lineType: 'A' },
            ...topPts.map(p => ({ kind: 'point', at: [FV_CX + p.x, TV_CY + p.y], size: 1.1, color: '#eab308' })),
          ],
        },
        {
          id: 3,
          instruction: 'For each of the 12 points, its true distance along the slope is proportional to how far across the cut it falls — mark that distance on the true-shape baseline, and its depth (from the top view) unchanged.',
          calloutAt: [TS_CX, TS_CY],
          reveals: truePts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#f472b6' })),
        },
        {
          id: 4,
          instruction: 'Join the 12 points with a smooth curve — an ELLIPSE. Even though a cylinder\'s cross-section is a circle, an OBLIQUE cut through it is never circular.',
          calloutAt: [TS_CX, TS_CY - R - 8],
          reveals: [
            { kind: 'polyline', points: smoothTrue, lineType: 'A' },
            { kind: 'label', at: [TS_LEFT, TS_TOP - 6], text: 'TRUE SHAPE — AN ELLIPSE', size: 4.5, anchor: 'start', color: '#fde047' },
            { kind: 'dimension', p1: [TS_LEFT, TS_CY + R + 8], p2: [TS_LEFT + slopeLength, TS_CY + R + 8], offset: 0, text: slopeLength.toFixed(1) },
          ],
        },
      ],
    };
  })();

  // ── 6. Block with a Prismatic (Square) Hole — Sectional View ──
  (function () {
    const block = { x: 65, y: 55, w: 70, h: 45 };
    const hole = { x: 90, y: 55, w: 20, h: 45 };
    const tv = { x: 65, y: 27, w: 70, h: 14 };
    const holeTv = { x: 90, y: 27, w: 20, h: 14 };

    CONSTRUCTIONS['prismatic-hole-block'] = {
      id: 'prismatic-hole-block', title: 'Block with a Prismatic Hole — Sectional View',
      summary: 'A straight-sided (prismatic) hole running through a block — hidden in the front view until a cutting plane reveals its true rectangular section.',
      bounds: { w: 150, h: 130 },
      workbookPrompt: 'Draw the front view of the block as a full section through the square prismatic hole, and the top view showing the hole in true shape.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the block outline, and the top view showing the square hole in true shape — visible, since we\'re looking straight down its axis.',
          calloutAt: [(block.x + block.w / 2), (tv.y + tv.h / 2)],
          reveals: [
            { kind: 'polygon', points: [[block.x, block.y], [block.x + block.w, block.y], [block.x + block.w, block.y + block.h], [block.x, block.y + block.h]], lineType: 'A' },
            { kind: 'polygon', points: [[tv.x, tv.y], [tv.x + tv.w, tv.y], [tv.x + tv.w, tv.y + tv.h], [tv.x, tv.y + tv.h]], lineType: 'A' },
            { kind: 'polygon', points: [[holeTv.x, tv.y], [holeTv.x + holeTv.w, tv.y], [holeTv.x + holeTv.w, tv.y + tv.h], [holeTv.x, tv.y + tv.h]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'In the front view, the hole runs vertically through the block — from this angle, it is HIDDEN, so its edges are drawn dashed.',
          calloutAt: [hole.x + hole.w / 2, block.y + block.h / 2],
          reveals: [
            { kind: 'line', p1: [hole.x, hole.y], p2: [hole.x, hole.y + hole.h], lineType: 'hidden' },
            { kind: 'line', p1: [hole.x + hole.w, hole.y], p2: [hole.x + hole.w, hole.y + hole.h], lineType: 'hidden' },
          ],
        },
        {
          id: 3,
          instruction: 'Mark cutting plane A-A across the top view, through the hole, then redraw the front view as the section on A-A: the hole\'s edges are now exposed, so they become solid Type A lines.',
          calloutAt: [100, 20],
          reveals: [
            { kind: 'line', p1: [50, 20], p2: [150, 20], lineType: 'centre' },
            { kind: 'label', at: [46, 18], text: 'A', size: 5, anchor: 'end', color: '#fde047' },
            { kind: 'label', at: [150, 18], text: 'A', size: 5, anchor: 'start', color: '#fde047' },
            { kind: 'line', p1: [hole.x, hole.y], p2: [hole.x, hole.y + hole.h], lineType: 'A' },
            { kind: 'line', p1: [hole.x + hole.w, hole.y], p2: [hole.x + hole.w, hole.y + hole.h], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Hatch the solid material either side of the hole, and dimension its width.',
          calloutAt: [block.x + 15, block.y + block.h / 2],
          reveals: [
            ...hatchRect(block.x, block.y, hole.x - block.x, block.h, 5),
            ...hatchRect(hole.x + hole.w, block.y, (block.x + block.w) - (hole.x + hole.w), block.h, 5),
            { kind: 'dimension', p1: [hole.x, block.y - 8], p2: [hole.x + hole.w, block.y - 8], offset: 0, text: String(hole.w) },
          ],
        },
      ],
    };
  })();

  // ── 7. Cone — Frustum by a Cutting Plane Parallel to the Base ──
  (function () {
    const D = 50, H = 60, R = D / 2, CUT_H = 25; // cut this far up from the base
    const FV_CX = 100, FV_TOP = 40, FV_BOTTOM = FV_TOP + H;
    const FV_LEFT = FV_CX - R, FV_RIGHT = FV_CX + R;
    const cutY = FV_BOTTOM - CUT_H;
    const remainingFromApex = H - CUT_H;
    const cutR = R * (remainingFromApex / H); // similar triangles: radius shrinks proportionally with distance from the apex
    const cutLeft = FV_CX - cutR, cutRight = FV_CX + cutR;
    const GAP = 20, TV_CY = FV_BOTTOM + GAP + R;
    const cutTV_CY = TV_CY + R + GAP + cutR;

    CONSTRUCTIONS['cone-frustum'] = {
      id: 'cone-frustum', title: 'Cone — Frustum by a Cutting Plane Parallel to the Base',
      summary: 'A cutting plane parallel to the base needs no true-shape construction at all — it gives a true-size circle directly, unlike the oblique cuts elsewhere in this chapter.',
      bounds: { w: 190, h: 260 },
      workbookPrompt: 'Draw the cone (50 mm base diameter, 60 mm tall) with a cutting plane parallel to the base, 25 mm up from it. Draw the resulting frustum and the true-size circle at the cut.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view (a triangle) and the top view (the true-size base circle) of the full cone.',
          calloutAt: [FV_CX, FV_TOP + H / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_LEFT, FV_BOTTOM], [FV_RIGHT, FV_BOTTOM], [FV_CX, FV_TOP]], lineType: 'construction' },
            { kind: 'circle', center: [FV_CX, TV_CY], r: R, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Mark the cutting plane horizontal (parallel to the base) at the given height, cutting off the apex to leave a frustum.',
          calloutAt: [FV_CX, cutY],
          reveals: [
            { kind: 'line', p1: [FV_LEFT - 6, cutY], p2: [FV_RIGHT + 6, cutY], lineType: 'centre' },
            { kind: 'dimension', p1: [FV_LEFT - 14, FV_BOTTOM], p2: [FV_LEFT - 14, cutY], offset: 0, text: String(CUT_H) },
          ],
        },
        {
          id: 3,
          instruction: 'Because the cutting plane is parallel to the base, the cut is a circle in TRUE SIZE directly — no distortion, no true-shape construction needed. Its radius shrinks in proportion to how close the cut is to the apex.',
          measurement: { label: `cut radius = ${R} × (${remainingFromApex}/${H}) ≈ ${cutR.toFixed(1)} mm` },
          calloutAt: [FV_CX, cutTV_CY],
          reveals: [
            { kind: 'line', p1: [cutLeft, cutY], p2: [cutRight, cutY], lineType: 'A' },
            { kind: 'circle', center: [FV_CX, cutTV_CY], r: cutR, lineType: 'A' },
            { kind: 'line', p1: [cutLeft, cutY], p2: [FV_CX - cutR, cutTV_CY - cutR], lineType: 'construction' },
            { kind: 'line', p1: [cutRight, cutY], p2: [FV_CX + cutR, cutTV_CY - cutR], lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'Redraw the front view as the finished frustum — a flat top instead of a point — and label it.',
          calloutAt: [FV_CX, FV_TOP + 30],
          reveals: [
            { kind: 'polygon', points: [[FV_LEFT, FV_BOTTOM], [FV_RIGHT, FV_BOTTOM], [cutRight, cutY], [cutLeft, cutY]], lineType: 'A' },
            { kind: 'label', at: [FV_LEFT, FV_TOP + 15], text: 'FRUSTUM', size: 4.5, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 8. Block with a Pyramidal Hole — Sectional View ──
  (function () {
    const block = { x: 60, y: 40, w: 80, h: 45 };
    const OPEN_W = 30, TAPER_D = 25;
    const CX = block.x + block.w / 2;
    const openL = CX - OPEN_W / 2, openR = CX + OPEN_W / 2;
    const apexY = block.y + TAPER_D;

    CONSTRUCTIONS['pyramidal-hole-block'] = {
      id: 'pyramidal-hole-block', title: 'Block with a Pyramidal Hole — Sectional View',
      summary: 'A tapered (pyramidal) hole — wide at the surface, narrowing to a point below it — drawn directly as a sectioned front view.',
      bounds: { w: 200, h: 130 },
      workbookPrompt: 'Draw the sectioned front view of a block with a pyramidal hole: 30 mm wide opening, tapering to a point 25 mm below the surface. Hatch the solid material around the taper.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the block outline, and mark the pyramidal hole\'s opening — 30 mm wide, centred in the top face.',
          measurement: { label: 'opening = 30 mm' },
          calloutAt: [CX, block.y],
          reveals: [
            { kind: 'polygon', points: [[block.x, block.y], [block.x + block.w, block.y], [block.x + block.w, block.y + block.h], [block.x, block.y + block.h]], lineType: 'A' },
            { kind: 'point', at: [openL, block.y], label: '' }, { kind: 'point', at: [openR, block.y], label: '' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the two sloped sides of the hole, converging to a point 25 mm below the surface — this is the taper of a pyramidal hole.',
          measurement: { label: 'taper depth = 25 mm' },
          calloutAt: [CX, apexY],
          reveals: [
            { kind: 'line', p1: [openL, block.y], p2: [CX, apexY], lineType: 'A' },
            { kind: 'line', p1: [openR, block.y], p2: [CX, apexY], lineType: 'A' },
            { kind: 'line', p1: [CX, block.y - 6], p2: [CX, apexY + 6], lineType: 'centre' },
          ],
        },
        {
          id: 3,
          instruction: 'Hatch the solid material on both sides of the taper — since this is already drawn directly as a sectioned view.',
          calloutAt: [block.x + 15, block.y + 20],
          reveals: [
            ...hatchRect(block.x, block.y, openL - block.x, block.h, 5),
            ...hatchRect(openR, block.y, (block.x + block.w) - openR, block.h, 5),
            ...hatchRect(openL, apexY, openR - openL, (block.y + block.h) - apexY, 5),
          ],
        },
        {
          id: 4,
          instruction: 'Dimension the opening width and taper depth, and label it a pyramidal hole.',
          calloutAt: [CX, block.y + block.h + 14],
          reveals: [
            { kind: 'dimension', p1: [openL, block.y - 10], p2: [openR, block.y - 10], offset: 0, text: String(OPEN_W) },
            { kind: 'dimension', p1: [block.x + block.w + 10, block.y], p2: [block.x + block.w + 10, apexY], offset: 0, text: String(TAPER_D) },
            { kind: 'label', at: [block.x, block.y + block.h + 12], text: 'PYRAMIDAL (TAPERED) HOLE', size: 4.4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'CAPS Grade 10 solid geometry (prisms, pyramids, cylinders, cones) uses which projection angle?',
      options: ['1st-angle projection', '3rd-angle projection', '2nd-angle projection', 'Isometric projection'],
      answer: 0,
      explanation: 'Solid geometry and civil drawing use 1st-angle projection, in contrast to the 3rd-angle projection used for mechanical working drawings earlier in the year.',
    },
    {
      text: 'In 1st-angle projection, where is the top view placed relative to the front view?',
      options: ['Below the front view', 'Above the front view', 'To the right of the front view', 'It can be placed anywhere'],
      answer: 0,
      explanation: '1st-angle projection places each view on the opposite side from the viewing direction, so the top view goes BELOW the front view — the mirror image of 3rd-angle projection.',
    },
    {
      text: 'In 1st-angle projection, where is the (right) side view placed relative to the front view?',
      options: ['To the left of the front view', 'To the right of the front view', 'Above the top view', 'Below the front view'],
      answer: 0,
      explanation: 'In 1st-angle projection the side view is placed to the LEFT of the front view — again, the opposite of 3rd-angle projection, where it would go to the right.',
    },
    {
      text: 'Which of these is NOT one of the regular prism/pyramid side-counts prescribed for Grade 10 solid geometry?',
      options: ['7-sided', '3-sided', '6-sided', '8-sided'],
      answer: 0,
      explanation: 'Grade 10 solid geometry is limited to right-regular prisms and pyramids with 3, 4, 5, 6 and 8 sides only — 7-sided solids are not included.',
    },
    {
      text: 'When a solid\'s axis is perpendicular to the horizontal plane (standing upright), what does the top view show?',
      options: ['The true shape of the solid\'s base', 'A rectangle', 'Nothing — the top view is left blank', 'Only the hidden detail'],
      answer: 0,
      explanation: 'When a solid stands with its axis perpendicular to the horizontal plane, looking straight down shows the base in its true shape and size, undistorted.',
    },
    {
      text: 'A cutting plane is drawn across a front view. When is that line shown at its TRUE LENGTH in that view?',
      options: [
        'When the cutting plane does not vary through the depth of the object (it only changes with width and height)',
        'Always, no matter how the plane is oriented',
        'Never — cutting planes are never shown true length',
        'Only if the object is a cylinder',
      ],
      answer: 0,
      explanation: 'A line appears at its true length in a view only when it lies in a plane parallel to that view. Since this cutting plane only varies with width and height (not depth), its edge is shown true length in the front view.',
    },
    {
      text: 'What is the "true shape" of a cut surface, and why is a separate (auxiliary/removed) view needed to see it?',
      options: [
        'The actual, undistorted shape and size of the cut surface — the standard front/top/side views show it foreshortened (distorted) because the cut is inclined',
        'It is always identical to whatever shape is shown in the top view',
        'It refers to the shape of the solid before it was cut',
        'It only applies to cylinders and cones, never prisms',
      ],
      answer: 0,
      explanation: 'Because the cutting plane is inclined, none of the standard views shows its true size and shape — each foreshortens it. An auxiliary (or "removed") view, built from the true dimensions, is needed to see the cut surface as it actually is.',
    },
    {
      text: 'For a square prism cut by a plane inclined only in the width-height direction (not the depth direction), what are the two true dimensions of the cut surface?',
      options: [
        'The true length of the sloped cutting line, and the prism\'s depth (unchanged by the cut)',
        'The prism\'s height and width, unchanged',
        'Two identical measurements equal to the prism\'s side length',
        'It cannot be determined without a full 3D model',
      ],
      answer: 0,
      explanation: 'Since the cutting plane does not vary through the depth, that dimension is never distorted — it stays the prism\'s true side length. The other true dimension is the true (sloped) length of the cutting line itself.',
    },
    {
      text: 'In the top view of a square pyramid, why are the four sloped edges drawn as solid lines rather than hidden?',
      options: [
        'Because they are visible from directly above — nothing hides them when looking straight down',
        'They should actually be hidden, and drawing them solid is a common mistake',
        'Sloped edges are never shown in any view',
        'They are only solid if the pyramid is upside down',
      ],
      answer: 0,
      explanation: 'The top view looks straight down the pyramid\'s axis, so every sloped edge from base corner to apex is directly visible — there is no material blocking the view of them from above.',
    },
    {
      text: 'An oblique plane cuts through a cylinder. What shape is the true shape of that cut?',
      options: ['An ellipse', 'A perfect circle', 'A rectangle', 'A triangle'],
      answer: 0,
      explanation: 'A circular cross-section viewed obliquely always foreshortens into an ellipse — the same reason an isometric circle is drawn as an ellipse.',
    },
    {
      text: 'A cutting plane through a cone is exactly PARALLEL to its base. What is the true shape of that cut, and does it need a special true-shape construction?',
      options: [
        'A circle, shown true size directly — no special construction is needed, since the cutting plane is parallel to the plane it\'s projected onto',
        'An ellipse, requiring the same point-by-point method as an oblique cylinder cut',
        'A triangle, since all cone cuts are triangular',
        'It cannot be determined without knowing the cone\'s material',
      ],
      answer: 0,
      explanation: 'A plane parallel to the base is parallel to the top-view projection plane too, so the cut appears true size and shape immediately — true-shape/auxiliary constructions are only needed for INCLINED cuts.',
    },
    {
      text: 'What is the difference between a "prismatic hole" and a "pyramidal hole" in a solid?',
      options: [
        'A prismatic hole has straight, parallel sides all the way through; a pyramidal hole tapers to a point (or a smaller opening)',
        'They are two different names for exactly the same feature',
        'A prismatic hole is always round; a pyramidal hole is always square',
        'Pyramidal holes cannot be sectioned, only prismatic holes can',
      ],
      answer: 0,
      explanation: 'A prismatic hole keeps the same cross-sectional shape and size along its full depth; a pyramidal hole narrows (tapers) as it gets deeper, converging toward a point.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'hex-prism-first-angle', 'inclined-cut-true-shape', 'square-pyramid-views', 'pentagonal-prism-views',
    'cylinder-oblique-true-shape', 'prismatic-hole-block', 'cone-frustum', 'pyramidal-hole-block',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
