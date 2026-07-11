// Isometric Drawing — Chapter 4 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // The two receding isometric axes: 30° above horizontal, left and right of vertical.
  const U = [Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6)]; // right axis (width)
  const V = [Math.cos(7 * Math.PI / 6), Math.sin(7 * Math.PI / 6)]; // left axis (depth)
  function iso(origin, a, b) { return [origin[0] + a * U[0] + b * V[0], origin[1] + a * U[1] + b * V[1]]; }

  // ── 1. Isometric Wedge: Isometric vs Non-Isometric Lines ──
  (function () {
    const O = [90, 120];
    const WIDTH = 55, DEPTH = 40, HEIGHT = 45;
    const A = iso(O, WIDTH, 0);
    const B = iso(O, 0, DEPTH);
    const C = iso(O, WIDTH, DEPTH);
    const FrontTop = [O[0], O[1] - HEIGHT];
    const RightTop = [A[0], A[1] - HEIGHT];
    const LeftTop = [B[0], B[1] - HEIGHT];
    const axisTip = { up: [O[0], O[1] - 18], right: iso(O, 18, 0), left: iso(O, 0, 18) };

    CONSTRUCTIONS['isometric-wedge'] = {
      id: 'isometric-wedge', title: 'Isometric Wedge',
      summary: 'Build a wedge block from the three isometric axes, then add its sloped top — a non-isometric line that must be constructed, not measured.',
      bounds: { w: 190, h: 145 },
      workbookPrompt: 'Draw the isometric wedge block. Start with the three axes, build the base and vertical edges to true size, then join the sloped top with straight (non-isometric) lines.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the three isometric axes from a single corner O: one vertical (true height), one at 30° to the right (true width), one at 30° to the left (true depth).',
          calloutAt: O,
          reveals: [
            { kind: 'line', p1: O, p2: axisTip.up, lineType: 'construction' },
            { kind: 'line', p1: O, p2: axisTip.right, lineType: 'construction' },
            { kind: 'line', p1: O, p2: axisTip.left, lineType: 'construction' },
            { kind: 'point', at: O, label: 'O' },
          ],
        },
        {
          id: 2,
          instruction: 'Mark the true width and depth along the two receding axes to find corners A and B, then complete the base by drawing to the back corner C — every one of these lines is isometric (parallel to an axis), so all are measured directly.',
          calloutAt: [A[0], A[1] - 6],
          reveals: [
            { kind: 'line', p1: O, p2: A, lineType: 'A' },
            { kind: 'line', p1: O, p2: B, lineType: 'A' },
            { kind: 'line', p1: A, p2: C, lineType: 'A' },
            { kind: 'line', p1: B, p2: C, lineType: 'A' },
            { kind: 'point', at: A, label: 'A' }, { kind: 'point', at: B, label: 'B' }, { kind: 'point', at: C, label: 'C' },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the vertical edges at O, A and B up to the front height — still isometric lines, since they run parallel to the vertical axis.',
          calloutAt: [O[0] - 8, (O[1] + FrontTop[1]) / 2],
          reveals: [
            { kind: 'line', p1: O, p2: FrontTop, lineType: 'A' },
            { kind: 'line', p1: A, p2: RightTop, lineType: 'A' },
            { kind: 'line', p1: B, p2: LeftTop, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Connect the peak: join FrontTop to RightTop and to LeftTop. These are also isometric lines, parallel to the width and depth axes.',
          calloutAt: [FrontTop[0], FrontTop[1] - 6],
          reveals: [
            { kind: 'line', p1: FrontTop, p2: RightTop, lineType: 'A' },
            { kind: 'line', p1: FrontTop, p2: LeftTop, lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'The top now slopes down to nothing at the back corner C. This sloped edge is NON-isometric — it isn\'t parallel to any of the three axes, so its length can\'t be measured directly. Since both its endpoints (RightTop and C) are already known, simply join them with a straight line.',
          calloutAt: [(RightTop[0] + C[0]) / 2 + 6, (RightTop[1] + C[1]) / 2],
          reveals: [
            { kind: 'line', p1: RightTop, p2: C, lineType: 'A' },
            { kind: 'line', p1: LeftTop, p2: C, lineType: 'A' },
          ],
        },
        {
          id: 6,
          instruction: 'Add dimensions for width, depth and height, and note the two non-isometric lines.',
          calloutAt: [70, 138],
          reveals: [
            { kind: 'dimension', p1: O, p2: A, offset: 14, text: String(WIDTH) },
            { kind: 'dimension', p1: O, p2: B, offset: -14, text: String(DEPTH) },
            { kind: 'dimension', p1: [O[0] - 20, O[1]], p2: [O[0] - 20, FrontTop[1]], offset: -6, text: String(HEIGHT) },
            { kind: 'label', at: [55, 138], text: 'NON-ISOMETRIC LINES: RightTop–C, LeftTop–C', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 2. Isometric Circle: Coordinate (Ordinate) Method ──
  (function () {
    const O2 = [70, 108];
    const S = 50, R = S / 2; // diameter S, radius R
    const A2 = iso(O2, S, 0), C2 = iso(O2, S, S), B2 = iso(O2, 0, S);
    const centre = iso(O2, R, R);

    const circlePts = [];
    for (let i = 0; i < 12; i++) {
      const th = i * Math.PI / 6;
      circlePts.push(iso(O2, R + R * Math.cos(th), R + R * Math.sin(th)));
    }
    const closedPts = circlePts.concat([circlePts[0], circlePts[1]]);
    const smoothCurve = G.catmullRomExpand(closedPts, 8);

    CONSTRUCTIONS['isometric-circle'] = {
      id: 'isometric-circle', title: 'Isometric Circle',
      summary: 'Construct an isometric circle (an ellipse) on the top face by plotting points from the true circle onto the isometric grid, then joining them with a smooth curve.',
      bounds: { w: 160, h: 130 },
      workbookPrompt: 'Draw the isometric square, plot at least 8 points of the circle onto it using the coordinate method, and join them into a smooth isometric circle.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the isometric square (rhombus) on the top face — its side length equals the circle\'s true diameter.',
          calloutAt: centre,
          reveals: [
            { kind: 'line', p1: O2, p2: A2, lineType: 'A' },
            { kind: 'line', p1: A2, p2: C2, lineType: 'A' },
            { kind: 'line', p1: C2, p2: B2, lineType: 'A' },
            { kind: 'line', p1: B2, p2: O2, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'A curved line can\'t be measured directly, so plot points instead: divide the true circle into equal steps, then transfer each point onto the isometric grid using the same two axis directions.',
          calloutAt: [centre[0], centre[1] - 8],
          reveals: circlePts.map((p, i) => ({ kind: 'point', at: p, size: 1.1, color: '#fde047' })),
        },
        {
          id: 3,
          instruction: 'Join the plotted points with a smooth curve — this is the isometric circle. Notice it is an ellipse, not a circle, even though it represents a true circle on the top face.',
          calloutAt: [centre[0] + 20, centre[1]],
          reveals: [{ kind: 'polyline', points: smoothCurve, lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Add the centre lines through the ellipse, along the same two isometric axis directions.',
          calloutAt: [centre[0], centre[1] + 10],
          reveals: [
            { kind: 'line', p1: iso(centre, -R - 4, 0), p2: iso(centre, R + 4, 0), lineType: 'centre' },
            { kind: 'line', p1: iso(centre, 0, -R - 4), p2: iso(centre, 0, R + 4), lineType: 'centre' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'How many isometric axes are there, and at what angle are the two non-vertical ones drawn?',
      options: ['Three axes: one vertical, and two at 30° to the horizontal', 'Two axes at 45° to each other', 'Four axes, one for each side of a square', 'Three axes all at 60° to each other'],
      answer: 0,
      explanation: 'Isometric drawing uses three axes: one vertical (true height) and two receding axes drawn at 30° above the horizontal, one to the left and one to the right.',
    },
    {
      text: 'What makes a line "isometric"?',
      options: ['It is parallel to one of the three isometric axes', 'It is any straight line on the drawing', 'It is always vertical', 'It is always curved'],
      answer: 0,
      explanation: 'A line is isometric only if it runs parallel to one of the three isometric axes (vertical, or one of the two 30° axes). Only isometric lines can be measured directly to their true length.',
    },
    {
      text: 'How is the true length of a NON-isometric line found on an isometric drawing?',
      options: ['By locating its two endpoints using isometric (measurable) lines first, then joining them with a straight line', 'By measuring it directly with a ruler on the drawing', 'It cannot be drawn at all', 'By assuming it is the same length as the nearest isometric edge'],
      answer: 0,
      explanation: 'A non-isometric line is never measured directly — its true length would be distorted on the drawing. Instead, its two endpoints are located using isometric (measurable) construction lines, and then simply joined with a straight line.',
    },
    {
      text: 'On the isometric wedge in this chapter, why are the two sloped edges non-isometric?',
      options: ['Because they are not parallel to the vertical axis or either of the two 30° axes', 'Because they are curved', 'Because they are the shortest lines on the drawing', 'Every edge on a wedge is automatically non-isometric'],
      answer: 0,
      explanation: 'The sloped edges run from the full-height peak down to a zero-height back corner — a direction that does not match the vertical axis or either 30° axis, which is exactly what makes a line non-isometric.',
    },
    {
      text: 'Why can\'t an isometric circle be drawn with a compass in one continuous curve?',
      options: [
        'Because a true circle appears as an ellipse in isometric view, which a compass cannot draw directly',
        'Because circles are never allowed in isometric drawings',
        'Because a compass can only draw straight lines',
        'Because isometric drawings are not allowed to contain curves',
      ],
      answer: 0,
      explanation: 'A true circle, viewed from an isometric angle, appears as an ellipse. A standard compass draws true circles, not ellipses, so an isometric circle must be built up from plotted points (or approximated with four arcs) instead.',
    },
    {
      text: 'In the coordinate (ordinate) method for an isometric circle, what is plotted onto the isometric grid?',
      options: [
        'A series of points taken from the true circle, transferred using the two isometric axis directions',
        'The centre point only',
        'A single diameter line',
        'Random points anywhere on the page',
      ],
      answer: 0,
      explanation: 'The true circle is divided into equal steps, and each of those points is transferred onto the isometric grid using the same two axis directions used to build the rest of the drawing — then the points are joined with a smooth curve.',
    },
    {
      text: 'What shape does the isometric square (used to construct an isometric circle) have?',
      options: ['A rhombus with 60° and 120° angles', 'A perfect square with all 90° angles', 'A rectangle', 'An irregular quadrilateral with no equal angles'],
      answer: 0,
      explanation: 'Because the two isometric axes are 120° apart, the "isometric square" is actually a rhombus with two 60° (acute) corners and two 120° (obtuse) corners, even though all four sides are the same true length.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['isometric-wedge', 'isometric-circle'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
