// Civil analytical (Gr 10): an exam-style site plan with questions answered one at a time.
// Runs after civil-analytical.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 2.8, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const circ = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const dim = (p1, p2, offset, text) => ({ kind: 'dimension', p1, p2, offset, text });
  function hatch(x0, y0, x1, y1, sp) {
    const out = [], w = x1 - x0, h = y1 - y0;
    for (let k = -h; k <= w; k += sp) { const lo = Math.max(0, -k), hi = Math.min(h, w - k); if (hi > lo) out.push(L([x0 + lo + k, y1 - lo], [x0 + hi + k, y1 - hi], 'C')); }
    return out;
  }

  // 1:200 → 1 m = 5 mm. Erf 20 m wide × 32 m deep; street along the bottom (south).
  const u = m => m * 5, X0 = 60, Y0 = 30;                // top-left corner of the erf
  const P = (x, y) => [X0 + u(x), Y0 + u(y)];            // x east, y south (metres from the back-left peg)
  const W = 20, Dp = 32;
  const box = (x0, y0, x1, y1) => [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
  const pegs = [['A', 0, 0], ['B', W, 0], ['C', W, Dp], ['D', 0, Dp]];
  const drawing = [
    // erf boundary and pegs
    poly(box(0, 0, W, Dp)), ...pegs.flatMap(([n, x, y]) => [circ(P(x, y), 1.2, 'B'), lbl([P(x, y)[0] + (x ? 3 : -3), P(x, y)[1] + (y ? 4 : -2)], n, { size: 2.8, anchor: x ? 'start' : 'end' })]),
    lbl(P(9, 9.5), 'ERF 412', Object.assign({ size: 3.4 }, YEL)), lbl(P(9, 11), '640 m²', { size: 2.6 }),
    // neighbours and the street
    lbl(P(-6, 16), 'ERF 411', GREY), lbl(P(26, 16), 'ERF 413', GREY), lbl(P(10, -8), 'ERF 420', GREY),
    L(P(-8, Dp + 2), P(W + 8, Dp + 2), 'B'), L(P(-8, Dp + 9), P(W + 8, Dp + 9), 'B'), lbl(P(10, Dp + 6.2), 'MOPANI STREET / MOPANISTRAAT', { size: 3 }),
    // building line 3 m from the street boundary
    L(P(0, Dp - 3), P(W, Dp - 3), 'hidden'), lbl(P(15.5, Dp - 3.6), '3 m BUILDING LINE / BOULYN', { size: 2.2, color: '#94a3b8' }),
    // 2 m servitude along the back with the municipal sewer and manholes
    L(P(0, 2), P(W, 2), 'hidden'), pl([P(-6, 1), P(W + 6, 1)], 'centre'), circ(P(1.5, 1), 1.6, 'B'), circ(P(18.5, 1), 1.6, 'B'), lbl(P(1.5, -1.6), 'MH', { size: 2.4 }), lbl(P(18.5, -1.6), 'MH', { size: 2.4 }),
    lbl(P(10, 1.6), '2 m SEWER SERVITUDE / RIOOLSERWITUUT', { size: 2.1, color: '#94a3b8' }),
    // existing dwelling, new addition, outbuilding to be demolished
    poly(box(3, 12, 15, 26)), lbl(P(9, 19), 'EXISTING DWELLING', { size: 2.5 }), lbl(P(9, 20.6), 'BESTAANDE WONING', { size: 2.3 }),
    poly(box(15, 14, 18, 22)), ...hatch(...P(15, 14), ...P(18, 22), 1.6), lbl(P(19.6, 13), 'NEW ADDITION', { size: 2.2, anchor: 'start' }),
    poly(box(13, 4, 18, 8), 'hidden'), lbl(P(15.5, 6.3), 'TO BE DEMOLISHED', { size: 2 }),
    // driveway and a tree
    L(P(16.5, 22), P(16.5, Dp)), L(P(19.5, 22), P(19.5, Dp)), lbl(P(18, 28.5), 'DRIVEWAY', { size: 2, anchor: 'middle' }),
    circ(P(4, 7), 7, 'B'), circ(P(4, 7), 0.8, 'B'), lbl(P(4, 9.6), 'TREE', { size: 2 }),
    // dimensions
    dim(P(0, 0), P(W, 0), -10, '20 000'), dim(P(W, 0), P(W, Dp), -14, '32 000'), dim(P(0, Dp - 3), P(0, Dp), 8, '3 000'), dim(P(18, 18), P(W, 18), -4, '2 000'),
    // north point and title
    circ(P(W + 18, 4), 6, 'B'), poly([[P(W + 18, 0)[0], P(0, 4)[1] - 7], [P(W + 18, 0)[0] + 2.2, P(0, 4)[1] + 2], P(W + 18, 4), [P(W + 18, 0)[0] - 2.2, P(0, 4)[1] + 2]]), lbl([P(W + 18, 0)[0], P(0, 4)[1] - 9], 'N', { size: 3.6 }),
    lbl(P(10, Dp + 14), 'SITE PLAN / TERREINPLAN   SCALE / SKAAL 1:200', Object.assign({ size: 3.2 }, YEL)),
  ];
  const Q = [
    ['What is the number of the erf, and its area?', 'Erf 412; 20 m × 32 m = 640 m².', P(9, 10)],
    ['What is the scale of the plan, and what does 5 mm on the plan represent?', '1:200, so 5 mm on the plan is 1 000 mm = 1 m on the site.', P(10, Dp + 14)],
    ['What is the name of the street, and on which side of the erf is it?', 'Mopani Street, on the south side (the north point shows north is to the top).', P(10, Dp + 6)],
    ['What does the broken line 3 m from the street boundary show?', 'The building line: no building may be built between it and the street boundary.', P(5, Dp - 3)],
    ['What is the 2 m strip along the back boundary, and why may nothing be built on it?', 'A municipal sewer servitude: the council must be able to reach the sewer line that runs along it.', P(10, 1)],
    ['What do the circles marked MH show?', 'Manholes: access points to the municipal sewer.', P(18.5, 1)],
    ['Which building is shown with broken lines, and why?', 'The outbuilding in the north-east corner: broken lines show existing work that is TO BE DEMOLISHED.', P(15.5, 6)],
    ['How is the new work shown, and what is it?', 'Hatched: the new addition on the east side of the existing dwelling.', P(16.5, 18)],
    ['How far is the new addition from the east boundary?', '2 000 mm (2 m).', P(19, 18)],
    ['Name the neighbouring erven.', 'Erf 411 (west), Erf 413 (east) and Erf 420 (north, at the back).', P(-6, 16)],
    ['What do the small circles at the corners of the erf, lettered A to D, show?', 'The survey pegs (beacons) that fix the corners of the boundary.', P(W, Dp)],
    ['What is the real width of the driveway? Measure it on the plan.', 'It measures 15 mm on the plan: 15 × 200 = 3 000 mm = 3 m.', P(18, 30)],
  ];
  const steps = [
    { instruction: 'GIVEN: the site plan of Erf 412 at 1:200. Study it, then answer the questions one at a time. (Each answer is shown with the feature it refers to.)', calloutAt: P(10, 16), reveals: drawing },
    ...Q.map(([q, a, at], i) => ({ instruction: 'QUESTION ' + (i + 1) + ': ' + q + '  ANSWER: ' + a, calloutAt: at, reveals: [circ(at, 4.5, 'B'), lbl([at[0] + 6, at[1] - 4], String(i + 1), Object.assign({ size: 3.2 }, YEL))] })),
  ];
  C['analytical-site-plan'] = { id: 'analytical-site-plan', title: 'Analytical: Site Plan of Erf 412', scale: '1:200',
    summary: 'An exam-style site plan with building line, sewer servitude and manholes, existing and new work, work to be demolished, survey pegs and the north point, with twelve questions answered one at a time.',
    workbookPrompt: 'Study the site plan of Erf 412 and answer the questions: erf number and area, scale, street and orientation, building line, servitude, manholes, demolition, new work, distances, neighbours, survey pegs and a measured size.',
    printLayout: 'full', steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
  ORDER.push('analytical-site-plan');
})(window);
