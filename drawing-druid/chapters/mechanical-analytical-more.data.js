// Mechanical analytical (Gr 10): a complete detail drawing with title block, revisions and notes,
// and a set of questions answered one at a time, as in the workbooks and exam papers.
// Runs after mechanical-analytical.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 2.8, anchor: 'start', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const circ = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const rect = (x0, y0, x1, y1, lt) => ({ kind: 'polygon', points: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], lineType: lt || 'A' });
  const dim = (p1, p2, offset, text) => ({ kind: 'dimension', p1, p2, offset, text });
  const arc = (c, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [c[0] + r * Math.cos(a), c[1] - r * Math.sin(a)]; });

  // ── the bearing bracket (cast iron), 3rd angle: top view above the front view ──
  const OX = 70, GY = 170;                        // front view: x = 0 on the axis, base underside at GY
  const F = (x, z) => [OX + x, GY - z];
  const TY = GY - 72 - 22 - 25;                   // top view: y = 0 (centre of the depth) at TY
  const T = (x, y) => [OX + x, TY + y];           // y towards the front is +
  const fv = [
    rect(...F(-50, 12), ...F(50, 0)),
    pl([F(-20, 12), F(-20, 52), ...arc(F(0, 52), 20, 180, 0, 18).slice(1), F(20, 12)]),
    circ(F(0, 52), 10),
    ...[-36, 36].flatMap(x => [L(F(x - 6, 0), F(x - 6, 12), 'hidden'), L(F(x + 6, 0), F(x + 6, 12), 'hidden'), L(F(x, -3), F(x, 15), 'centre')]),
    L(F(-14, 52), F(14, 52), 'centre'), L(F(0, 38), F(0, 76), 'centre'),
  ];
  const tv = [
    rect(...T(-50, -25), ...T(50, 25)),
    rect(...T(-20, -10), ...T(20, 10)),
    L(T(-10, -10), T(-10, 10), 'hidden'), L(T(10, -10), T(10, 10), 'hidden'),
    ...[-36, 36].flatMap(x => [circ(T(x, 0), 6), L(T(x - 9, 0), T(x + 9, 0), 'centre'), L(T(x, -9), T(x, 9), 'centre')]),
    L(T(0, -14), T(0, 14), 'centre'),
  ];
  const dims = [
    dim(F(-50, 0), F(50, 0), 12, '100'),
    dim(F(-36, 0), F(36, 0), 6, '72'),
    dim(F(50, 0), F(50, 12), -8, '12'),
    dim(F(-50, 0), F(-50, 52), 10, '52'),
    dim(F(-20, 12), F(20, 12), -4, '40'),
    dim(T(50, -25), T(50, 25), -8, '50'),
    dim(T(20, -10), T(20, 10), -5, '20'),
  ];
  const callout = (from, to, text) => [L(from, to, 'B'), lbl([to[0] + 1, to[1] - 1], text, { size: 2.8 })];
  const notes = [
    ...callout(F(7, 59), F(34, 80), 'Ø20 H7'),
    ...callout(F(-14, 66), F(-40, 84), 'R20'),
    ...callout(T(-40, -4), T(-62, -32), '2 x Ø12 THRU'),
  ];
  // surface texture symbol on the underside of the base: machined, Ra 3.2
  const sx = OX + 10, sy = GY;
  const surf = [pl([[sx - 3, sy + 5], [sx, sy], [sx + 6, sy + 10]], 'B'), L([sx - 3, sy + 5], [sx + 2.7, sy + 5], 'B'), lbl([sx + 2, sy + 13], 'Ra 3.2', { size: 2.4 })];
  // title block and revisions
  const TBX = 150, TBY = 150, rows = [['MAGIC LAB ENGINEERING', ''], ['TITLE: BEARING BRACKET', 'DRG No: MLE-104'], ['MATERIAL: CAST IRON', 'SCALE: 1:1'], ['DRAWN: T. MOKOENA  2025-02-03', 'SHEET 1 OF 1'], ['CHECKED: A. VAN WYK', '3RD ANGLE']];
  const tb = [rect(TBX, TBY, TBX + 150, TBY + 40, 'A'), ...rows.slice(1).map((r, i) => L([TBX, TBY + 8 * (i + 1)], [TBX + 150, TBY + 8 * (i + 1)], 'B')), L([TBX + 100, TBY + 8], [TBX + 100, TBY + 40], 'B'),
    ...rows.flatMap((r, i) => [lbl([TBX + 2, TBY + 5.5 + 8 * i], r[0], { size: 2.7 }), lbl([TBX + 102, TBY + 5.5 + 8 * i], r[1], { size: 2.7 })]),
    // 3rd-angle symbol: a cone frustum and its end view (circles to the RIGHT)
    pl([[TBX + 128, TBY + 33], [TBX + 128, TBY + 37], [TBX + 136, TBY + 38], [TBX + 136, TBY + 32], [TBX + 128, TBY + 33]], 'B'), circ([TBX + 142, TBY + 35], 3, 'B'), circ([TBX + 142, TBY + 35], 1.5, 'B')];
  const rev = [rect(TBX, TBY - 22, TBX + 150, TBY - 4, 'A'), L([TBX, TBY - 16], [TBX + 150, TBY - 16], 'B'), L([TBX + 10, TBY - 22], [TBX + 10, TBY - 4], 'B'), L([TBX + 112, TBY - 22], [TBX + 112, TBY - 4], 'B'),
    lbl([TBX + 2, TBY - 17.5], 'REV', { size: 2.5 }), lbl([TBX + 12, TBY - 17.5], 'DESCRIPTION / BESKRYWING', { size: 2.5 }), lbl([TBX + 114, TBY - 17.5], 'DATE', { size: 2.5 }),
    lbl([TBX + 3, TBY - 8.5], 'A', { size: 2.7 }), lbl([TBX + 12, TBY - 8.5], 'BORE CHANGED FROM Ø18 TO Ø20 H7', { size: 2.6 }), lbl([TBX + 114, TBY - 8.5], '2025-03-10', { size: 2.6 })];
  const gen = [lbl([TBX, TBY - 48], 'NOTES / NOTAS:', Object.assign({ size: 2.8 }, YEL)), lbl([TBX, TBY - 42], '1. ALL DIMENSIONS IN mm.', { size: 2.6 }), lbl([TBX, TBY - 37], '2. UNLESS OTHERWISE STATED, TOLERANCES ±0.5.', { size: 2.6 }), lbl([TBX, TBY - 32], '3. ALL UNSPECIFIED RADII R2.', { size: 2.6 }), lbl([TBX, TBY - 27], '4. REMOVE ALL SHARP EDGES.', { size: 2.6 })];
  const labels = [lbl(F(-12, -26), 'FRONT VIEW', GREY), lbl(T(-12, -36), 'TOP VIEW', GREY)];

  // the questions: [question, answer, where to point]
  const Q = [
    ['Which method of projection is used, and how can you tell?', '3rd-angle projection: the symbol in the title block shows the end view on the RIGHT, and the top view is drawn ABOVE the front view.', [TBX + 138, TBY + 35]],
    ['What is the scale of the drawing?', '1:1 (full size).', [TBX + 120, TBY + 21]],
    ['What material is the part made of?', 'Cast iron.', [TBX + 20, TBY + 21]],
    ['What is the overall length of the base?', '100 mm.', F(0, -12)],
    ['What is the height from the underside of the base to the centre of the bearing hole?', '52 mm.', F(-60, 26)],
    ['What do the dashed lines in the front view (at the ends of the base) show?', 'Hidden detail: the two Ø12 bolt holes running through the base, which cannot be seen from the front.', F(-36, 6)],
    ['How many bolt holes are there, of what size, and at what centres?', 'Two holes of Ø12, drilled right through (THRU), at 72 mm centres.', T(-36, 0)],
    ['What does "Ø20 H7" mean?', 'A bore of 20 mm diameter with tolerance class H7: a close-fit HOLE tolerance (capital H = hole), so a shaft or bush fits it accurately.', F(10, 60)],
    ['What is the tolerance on the 40 mm width of the upright?', '±0.5 mm (general note 2), so it may measure from 39.5 to 40.5 mm.', F(0, 8)],
    ['What does the symbol under the base mean?', 'Surface texture: the underside must be MACHINED (the bar on the tick) to a roughness of Ra 3.2 µm.', [sx, sy + 4]],
    ['What size are the radii that are not dimensioned?', 'R2 (general note 3).', [TBX + 30, TBY - 32]],
    ['What was changed in revision A, and when?', 'The bore was changed from Ø18 to Ø20 H7, on 2025-03-10.', [TBX + 50, TBY - 9]],
    ['Who drew the drawing, who checked it, and what is the drawing number?', 'Drawn by T. Mokoena, checked by A. van Wyk; drawing number MLE-104.', [TBX + 30, TBY + 29]],
    ['How thick is the upright, and how wide is the base from front to back?', 'The upright is 20 mm thick; the base is 50 mm deep (both from the top view).', T(30, 0)],
  ];
  const ring = at => [circ(at, 4.5, 'B')];
  const steps = [
    { instruction: 'GIVEN: the detail drawing of a bearing bracket, with its title block, revision table and general notes. Study it, then answer the questions one at a time. (Each answer is shown with the feature it refers to.)',
      calloutAt: F(0, 40), reveals: [...fv, ...tv, ...dims, ...notes, ...surf, ...tb, ...rev, ...gen, ...labels] },
    ...Q.map(([q, a, at], i) => ({ instruction: 'QUESTION ' + (i + 1) + ': ' + q + '  ANSWER: ' + a, calloutAt: at, reveals: [...ring(at), lbl([at[0] + 5, at[1] - 4], String(i + 1), Object.assign({ size: 3.2 }, YEL))] })),
  ];
  C['analytical-bearing-bracket'] = { id: 'analytical-bearing-bracket', title: 'Analytical: Bearing Bracket Detail Drawing', projection: 'third',
    summary: 'A complete detail drawing (front and top views, dimensions, a fit tolerance, surface texture, title block, revisions and notes) with fourteen questions answered one at a time, exam style.',
    workbookPrompt: 'Study the detail drawing of the bearing bracket and answer the questions: projection method, scale, material, sizes, hidden detail, holes, the H7 fit, tolerances, the surface texture symbol, radii, the revision, the title block and the depths.',
    printLayout: 'full', steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
  ORDER.push('analytical-bearing-bracket');
})(window);
