// Orthographic Projection — Chapter 3 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // Generates 45°-hatching line segments clipped to a rectangle [x0,x0+w] x [y0,y0+h].
  function hatchRect(x0, y0, w, h, spacing) {
    const lines = [];
    for (let k = -h; k <= w + 0.01; k += spacing) {
      const vLo = Math.max(0, -k), vHi = Math.min(h, w - k);
      if (vHi <= vLo) continue;
      const u1 = vLo + k, v1 = vLo, u2 = vHi + k, v2 = vHi;
      lines.push({ kind: 'line', p1: [x0 + u1, y0 + v1], p2: [x0 + u2, y0 + v2], lineType: 'C' });
    }
    return lines;
  }

  // ── 1. L-Bracket: Three Views (3rd angle) ──
  (function () {
    // Front view: L-shaped outline
    const fv = [[60, 110], [60, 70], [75, 70], [75, 95], [120, 95], [120, 110]];
    // Top view: plan rectangle, aligned above (same X range as front view)
    const tv = { x: 60, y: 40, w: 60, h: 15 };
    const holeX = 100, holeTopY = tv.y + tv.h / 2, holeR = 4;
    // Side view: aligned to the right of front view (same Y range as front view)
    const sv = { x: 135, y: 70, w: 15, h: 40 };
    const holeSideY = 102.5;

    CONSTRUCTIONS['l-bracket-views'] = {
      id: 'l-bracket-views', title: 'L-Bracket: Three Views',
      summary: 'Project the top and side views from a front view using 3rd-angle projection, then add hidden detail, centre lines and dimensions.',
      bounds: { w: 190, h: 140 },
      workbookPrompt: 'Draw the front, top and side views of the L-bracket in 3rd-angle projection. Include the hidden hole, centre lines and overall dimensions.',
      steps: [
        {
          id: 1,
          instruction: 'Start with the FRONT view — the view that shows the most shape detail. This bracket has an L-shaped profile: a tall narrow back (15 mm wide) and a wide base (60 mm wide, 15 mm tall).',
          calloutAt: [67, 90],
          reveals: [{ kind: 'polygon', points: fv, lineType: 'A' }],
        },
        {
          id: 2,
          instruction: 'Project the TOP view directly ABOVE the front view — this is the rule for 3rd-angle projection. Align it using thin projection lines from the front view\'s left and right edges.',
          calloutAt: [60, 55],
          reveals: [
            { kind: 'polygon', points: [[tv.x, tv.y], [tv.x + tv.w, tv.y], [tv.x + tv.w, tv.y + tv.h], [tv.x, tv.y + tv.h]], lineType: 'A' },
            { kind: 'line', p1: [60, 70], p2: [60, 55], lineType: 'construction' },
            { kind: 'line', p1: [120, 70], p2: [120, 55], lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Project the (right) SIDE view to the RIGHT of the front view, aligned by height using thin projection lines from the front view\'s top and bottom edges.',
          calloutAt: [142, 90],
          reveals: [
            { kind: 'polygon', points: [[sv.x, sv.y], [sv.x + sv.w, sv.y], [sv.x + sv.w, sv.y + sv.h], [sv.x, sv.y + sv.h]], lineType: 'A' },
            { kind: 'line', p1: [120, 70], p2: [135, 70], lineType: 'construction' },
            { kind: 'line', p1: [120, 110], p2: [135, 110], lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'The bracket has a vertical hole drilled through the base. Looking DOWN the hole (top view) it is fully visible — draw it as a solid circle. Looking ACROSS the hole (front and side views), it is HIDDEN — draw it as two dashed lines.',
          calloutAt: [holeX, holeTopY],
          reveals: [
            { kind: 'circle', center: [holeX, holeTopY], r: holeR, lineType: 'A' },
            { kind: 'line', p1: [holeX - holeR, 95], p2: [holeX - holeR, 110], lineType: 'hidden' },
            { kind: 'line', p1: [holeX + holeR, 95], p2: [holeX + holeR, 110], lineType: 'hidden' },
            { kind: 'line', p1: [sv.x, holeSideY - holeR], p2: [sv.x + sv.w, holeSideY - holeR], lineType: 'hidden' },
            { kind: 'line', p1: [sv.x, holeSideY + holeR], p2: [sv.x + sv.w, holeSideY + holeR], lineType: 'hidden' },
          ],
        },
        {
          id: 5,
          instruction: 'Add a centre line (chain line) through the hole in every view, then dimension the bracket\'s overall width and height.',
          calloutAt: [90, 130],
          reveals: [
            { kind: 'line', p1: [holeX, tv.y - 4], p2: [holeX, tv.y + tv.h + 4], lineType: 'centre' },
            { kind: 'line', p1: [holeX - holeR - 5, 102.5], p2: [holeX + holeR + 5, 102.5], lineType: 'centre' },
            { kind: 'line', p1: [sv.x - 4, holeSideY], p2: [sv.x + sv.w + 4, holeSideY], lineType: 'centre' },
            { kind: 'dimension', p1: [60, 116], p2: [120, 116], offset: 8, text: '60' },
            { kind: 'dimension', p1: [46, 70], p2: [46, 110], offset: -8, text: '40' },
            { kind: 'label', at: [60, 128], text: 'THIRD-ANGLE PROJECTION', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 2. Stepped Block: Sectional View & Hatching ──
  (function () {
    const block = { x: 60, y: 70, w: 80, h: 40 };
    const pocket = { x: 85, y: 70, w: 30, h: 20 };
    const tv = { x: 60, y: 42, w: 80, h: 14 };

    CONSTRUCTIONS['sectional-view'] = {
      id: 'sectional-view', title: 'Stepped Block: Sectional View',
      summary: 'Mark a cutting plane, convert hidden detail into a sectional view, and add 45° hatching to the solid material that the cutting plane passes through.',
      bounds: { w: 150, h: 130 },
      workbookPrompt: 'Draw the front view of the block as a full section on cutting plane A-A, showing the pocket and correctly hatching all solid material.',
      steps: [
        {
          id: 1,
          instruction: 'This block has a rectangular pocket cut into its top face. Draw the front view outline, and the top view showing the pocket opening (visible from above, so it is drawn solid).',
          calloutAt: [70, 90],
          reveals: [
            { kind: 'polygon', points: [[block.x, block.y], [block.x + block.w, block.y], [block.x + block.w, block.y + block.h], [block.x, block.y + block.h]], lineType: 'A' },
            { kind: 'polygon', points: [[tv.x, tv.y], [tv.x + tv.w, tv.y], [tv.x + tv.w, tv.y + tv.h], [tv.x, tv.y + tv.h]], lineType: 'A' },
            { kind: 'polygon', points: [[pocket.x, tv.y], [pocket.x + pocket.w, tv.y], [pocket.x + pocket.w, tv.y + tv.h], [pocket.x, tv.y + tv.h]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Without a section, the pocket is hidden inside the block when viewed from the front — draw it dashed. This is exactly what a section will let us avoid.',
          calloutAt: [100, 80],
          reveals: [
            { kind: 'line', p1: [pocket.x, pocket.y + pocket.h], p2: [pocket.x, block.y + block.h], lineType: 'hidden' },
            { kind: 'line', p1: [pocket.x + pocket.w, pocket.y + pocket.h], p2: [pocket.x + pocket.w, block.y + block.h], lineType: 'hidden' },
            { kind: 'line', p1: [pocket.x, pocket.y + pocket.h], p2: [pocket.x + pocket.w, pocket.y + pocket.h], lineType: 'hidden' },
          ],
        },
        {
          id: 3,
          instruction: 'Mark a cutting plane A-A across the top view, through the pocket, showing exactly where we imagine slicing the block to see inside it.',
          calloutAt: [100, 49],
          reveals: [
            { kind: 'line', p1: [52, 49], p2: [148, 49], lineType: 'centre' },
            { kind: 'label', at: [48, 47], text: 'A', size: 5, anchor: 'end', color: '#fde047' },
            { kind: 'label', at: [148, 47], text: 'A', size: 5, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'Redraw the front view AS the section on A-A: the previously hidden pocket edges are now exposed by the cut, so they become solid Type A lines instead of dashed.',
          calloutAt: [100, 80],
          reveals: [
            { kind: 'polygon', points: [[pocket.x, pocket.y], [pocket.x + pocket.w, pocket.y], [pocket.x + pocket.w, pocket.y + pocket.h], [pocket.x, pocket.y + pocket.h]], lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'Add 45° hatching to every area of SOLID material the cutting plane passes through — never hatch the pocket itself, since that space is empty.',
          calloutAt: [70, 100],
          reveals: [
            ...hatchRect(block.x, block.y, pocket.x - block.x, block.h, 5),
            ...hatchRect(pocket.x + pocket.w, block.y, (block.x + block.w) - (pocket.x + pocket.w), block.h, 5),
            ...hatchRect(pocket.x, pocket.y + pocket.h, pocket.w, (block.y + block.h) - (pocket.y + pocket.h), 5),
          ],
        },
        {
          id: 6,
          instruction: 'Label the section and dimension the pocket\'s width and depth.',
          calloutAt: [100, 120],
          reveals: [
            { kind: 'label', at: [60, 120], text: 'SECTION A-A', size: 5, anchor: 'start', color: '#fde047' },
            { kind: 'dimension', p1: [85, 116], p2: [115, 116], offset: 8, text: '30' },
            { kind: 'dimension', p1: [122, 70], p2: [122, 90], offset: 8, text: '20' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'CAPS Grade 10 mechanical drawings use which projection angle?',
      options: ['3rd-angle projection', '1st-angle projection', '2nd-angle projection', 'Isometric projection'],
      answer: 0,
      explanation: 'Grade 10 mechanical/working drawings use 3rd-angle projection. (Solid geometry and civil drawing later in the year use 1st-angle projection instead — the two are not interchangeable.)',
    },
    {
      text: 'In 3rd-angle projection, where is the top view placed relative to the front view?',
      options: ['Directly above the front view', 'Directly below the front view', 'To the left of the front view', 'It can be placed anywhere'],
      answer: 0,
      explanation: 'In 3rd-angle projection, each view is placed on the same side as the direction you\'re viewing from — so the top view sits directly above the front view.',
    },
    {
      text: 'Where is the right side view placed relative to the front view in 3rd-angle projection?',
      options: ['To the right of the front view', 'To the left of the front view', 'Above the front view', 'Below the top view'],
      answer: 0,
      explanation: 'The right side view is placed to the right of the front view, aligned by height using projection lines.',
    },
    {
      text: 'An edge or hole that cannot be seen directly in a particular view is drawn using:',
      options: ['A dashed hidden-detail line', 'A thick continuous Type A line', 'A centre (chain) line', 'No line at all — it is left out'],
      answer: 0,
      explanation: 'Features that exist but are hidden behind other material in a specific view are drawn as dashed hidden-detail lines, so the reader knows they are there without seeing them directly.',
    },
    {
      text: 'What is the purpose of a cutting-plane line on a drawing?',
      options: [
        'It shows exactly where an imaginary cut is made through the object to reveal a sectional view',
        'It marks the centre of every hole',
        'It shows where to physically cut the real material with a saw',
        'It replaces the need for a title block',
      ],
      answer: 0,
      explanation: 'A cutting-plane line (a chain line with direction arrows, usually labelled e.g. A-A) marks exactly where an imaginary slice is made through the object so its hidden internal detail can be drawn as a visible sectional view.',
    },
    {
      text: 'In a sectional view, a hole or edge that was previously hidden and is now exposed by the cut is drawn as:',
      options: ['A solid Type A line, since the cutting plane exposes it directly', 'Still a dashed hidden line', 'A centre line only', 'It is left blank'],
      answer: 0,
      explanation: 'Once the cutting plane exposes a feature, it is no longer hidden in that view — it becomes a solid, visible Type A line.',
    },
    {
      text: 'What convention shows solid material that the cutting plane has sliced through?',
      options: ['Thin, evenly-spaced 45° hatching lines', 'Filling the area solid black', 'Thick dashed lines', 'A centre line grid'],
      answer: 0,
      explanation: 'Solid material cut through by the section is shown using thin, evenly-spaced hatching lines, conventionally drawn at 45°. Empty space (like a pocket or hole) is never hatched.',
    },
    {
      text: 'Why is a centre line added through a hole in every view it appears in?',
      options: [
        'It marks the true centre/axis of the hole, which is needed for accurate dimensioning',
        'It is purely decorative',
        'It replaces the need to draw the hole itself',
        'It only appears in the top view, never in other views',
      ],
      answer: 0,
      explanation: 'A centre line marks the true axis of symmetry of a round feature, and dimensions to a hole are always measured to its centre line — so it needs to appear in every view that shows the hole.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['l-bracket-views', 'sectional-view'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
