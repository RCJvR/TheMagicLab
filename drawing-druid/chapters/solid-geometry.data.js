// Solid Geometry — Chapter 5 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

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
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['hex-prism-first-angle', 'inclined-cut-true-shape'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
