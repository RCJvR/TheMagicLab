// Freehand drawing: step-by-step sketching exercises on square and isometric grid paper.
// The lines are shown straight here; on paper they are sketched freehand, lightly first.
(function (global) {
  'use strict';
  const C = {}, ORDER = [];
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#94a3b8' }, opts || {});
  const YEL = { color: '#fde047' };
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const pt = (at, label) => ({ kind: 'point', at, label });
  const C30 = Math.cos(Math.PI / 6);
  const grid = (x0, y0, x1, y1, s) => {
    const out = [];
    for (let x = x0; x <= x1 + 1e-6; x += s) out.push(L([x, y0], [x, y1], 'C'));
    for (let y = y0; y <= y1 + 1e-6; y += s) out.push(L([x0, y], [x1, y], 'C'));
    return out;
  };
  const isoGrid = (S, R, s) => {          // isometric grid through S, clipped to rectangle R
    const out = [], a = [s * C30, -s / 2], b = [-s * C30, -s / 2];
    const clip = (p, d) => { let t0 = -1e9, t1 = 1e9;
      for (const [pi, di, lo, hi] of [[p[0], d[0], R[0], R[2]], [p[1], d[1], R[1], R[3]]]) { if (Math.abs(di) < 1e-12) { if (pi < lo || pi > hi) return null; continue; } let u = (lo - pi) / di, v = (hi - pi) / di; if (u > v) [u, v] = [v, u]; t0 = Math.max(t0, u); t1 = Math.min(t1, v); }
      return t1 - t0 > 0.5 ? [[p[0] + d[0] * t0, p[1] + d[1] * t0], [p[0] + d[0] * t1, p[1] + d[1] * t1]] : null; };
    for (let k = -40; k <= 40; k++) [[[S[0] - k * s * C30, S[1] - k * s / 2], a], [[S[0] + k * s * C30, S[1] - k * s / 2], b], [[S[0] + k * s * C30, S[1]], [0, 1]]].forEach(([p, d]) => { const c = clip(p, d); if (c) out.push(L(c[0], c[1], 'C')); });
    return out;
  };
  const curve = (c, rx, ry, a0, a1, n, lt) => pl(Array.from({ length: n + 1 }, (_, i) => { const t = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [c[0] + rx * Math.cos(t), c[1] + ry * Math.sin(t)]; }), lt || 'A');
  function add(id, title, summary, prompt, steps, extra) {
    C[id] = Object.assign({ id, title, summary, workbookPrompt: prompt, projection: 'none', bounds: { w: 220, h: 170 },
      steps: steps.map((s, i) => Object.assign({ id: i + 1, compass: false }, s)) }, extra || {});
    ORDER.push(id);
  }

  // ═══ 1. Copy a figure on a square grid ═══
  (function () {
    const s = 10, G0 = [20, 30], G1 = [120, 30];
    const shape = [[0, 0], [8, 0], [8, 2], [6, 2], [6, 5], [8, 5], [8, 7], [0, 7], [0, 5], [2, 5], [2, 2], [0, 2]];
    const P = (o, q) => [o[0] + q[0] * s * 0.5, o[1] + 120 - q[1] * s * 0.5 - 40];
    const Q = q => [G1[0] + q[0] * s, G1[1] + 100 - q[1] * s];
    add('fh-grid-copy', 'Grid Copy: I-Shaped Plate', 'Copy a figure onto a 10 mm grid by counting squares: corners first, then sketch the lines between them.',
      'Copy the I-shaped plate onto 10 mm grid paper, full size, by counting squares. Sketch lightly first, then line in.',
      [
        { instruction: 'GIVEN: the figure on a 5 mm grid (left). On your 10 mm grid (right) each square stands for one square of the given grid: the copy comes out TWICE as large. Find the bottom-left corner first.', calloutAt: Q([0, 0]),
          reveals: [...grid(G0[0], G0[1] + 40, G0[0] + 50, G0[1] + 90, 5), poly(shape.map(q => P(G0, q))), ...grid(G1[0], G1[1], G1[0] + 90, G1[1] + 100, 10), pt(Q([0, 0]), 'S')] },
        { instruction: 'Count along and up for every corner, and mark each one with a small dot. Check: the plate is 8 squares wide and 7 high.', calloutAt: Q([8, 7]), reveals: shape.map(q => pt(Q(q))) },
        { instruction: 'Sketch the outline lightly between the dots: keep your eye on the next dot, not on the pencil point.', calloutAt: Q([4, 2]), reveals: [poly(shape.map(Q), 'construction')] },
        { instruction: 'Line in the outline with firm, even freehand lines.', calloutAt: Q([4, 7]), reveals: [poly(shape.map(Q))] },
      ]);
  })();

  // ═══ 2. Circle by the box method ═══
  (function () {
    const c = [100, 90], r = 35, k = r * Math.SQRT1_2;
    add('fh-box-circle', 'Freehand Circle: Box Method', 'A freehand circle built from a square, its centre lines and diagonals: eight guide points, then short arcs between them.',
      'Sketch a Ø70 circle freehand by the box method. Show the light construction.',
      [
        { instruction: 'Sketch a light square 70 × 70 and its two centre lines. The circle touches the square at the four centre-line points.', calloutAt: [c[0], c[1] - r],
          reveals: [poly([[c[0] - r, c[1] - r], [c[0] + r, c[1] - r], [c[0] + r, c[1] + r], [c[0] - r, c[1] + r]], 'construction'), L([c[0] - r - 6, c[1]], [c[0] + r + 6, c[1]], 'centre'), L([c[0], c[1] - r - 6], [c[0], c[1] + r + 6], 'centre'),
            ...[[0, -r], [r, 0], [0, r], [-r, 0]].map(([dx, dy]) => pt([c[0] + dx, c[1] + dy]))] },
        { instruction: 'Sketch the two diagonals. On each half-diagonal mark a point about 7/10 of the way out from the centre: four more points on the circle.', calloutAt: [c[0] + k, c[1] - k],
          reveals: [L([c[0] - r, c[1] - r], [c[0] + r, c[1] + r], 'construction'), L([c[0] + r, c[1] - r], [c[0] - r, c[1] + r], 'construction'), ...[[1, 1], [1, -1], [-1, 1], [-1, -1]].map(([a, b]) => pt([c[0] + a * k, c[1] + b * k]))] },
        { instruction: 'Sketch short arcs through each group of three points, turning the paper so your hand always moves comfortably.', calloutAt: [c[0] - k, c[1] + k], reveals: [curve(c, r, r, 0, 360, 72, 'construction')] },
        { instruction: 'Line in the circle with one smooth, even line and check it is round.', calloutAt: [c[0], c[1] + r], reveals: [curve(c, r, r, 0, 360, 72)] },
      ]);
  })();

  // ═══ 3. Isometric circle on isometric grid ═══
  (function () {
    const S = [110, 130], s = 10, n = 5, e = [s * n * C30, -s * n / 2], f = [-s * n * C30, -s * n / 2];
    const A = S, B = [S[0] + e[0], S[1] + e[1]], D = [S[0] + f[0], S[1] + f[1]], Cc = [B[0] + f[0], B[1] + f[1]];
    const M = [A, B, Cc, D].map((p, i, a) => { const q = a[(i + 1) % 4]; return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; });
    const cen = [(A[0] + Cc[0]) / 2, (A[1] + Cc[1]) / 2];
    // the true ellipse in the rhombus: axes along the rhombus diagonals
    const a1 = Math.hypot(A[0] - Cc[0], A[1] - Cc[1]) / 2 * Math.SQRT1_2, b1 = Math.hypot(B[0] - D[0], B[1] - D[1]) / 2 * Math.SQRT1_2;   // axes 0.71 of the diagonals
    const ell = (lt) => pl(Array.from({ length: 73 }, (_, i) => { const t = i * 5 * Math.PI / 180; return [cen[0] + b1 * Math.cos(t) * 1.0, cen[1] + a1 * Math.sin(t)]; }), lt);
    add('fh-iso-circle', 'Freehand Isometric Circle on Isometric Grid', 'An isometric circle sketched in a rhombus on isometric grid paper: touch the four side midpoints, flat at the long diagonal, tight at the short one.',
      'On isometric grid paper, sketch a 50 mm isometric circle on a horizontal face (a rhombus 5 grid spaces each way).',
      [
        { instruction: 'Count 5 grid spaces along each 30° line from S and sketch the rhombus (the square, seen in isometric).', calloutAt: S, reveals: [...isoGrid(S, [30, 40, 190, 150], s), pt(S, 'S'), poly([A, B, Cc, D], 'construction')] },
        { instruction: 'Mark the midpoint of each side: the circle touches the rhombus there.', calloutAt: M[0], reveals: M.map(m => pt(m)) },
        { instruction: 'Sketch the long diagonal lightly. Sketch the two long flat curves first (they run past the ends of the short diagonal), then the two tight ends.', calloutAt: cen, reveals: [L(B, D, 'construction'), ell('construction')] },
        { instruction: 'Line in the ellipse smoothly. It must touch all four sides at their midpoints and never cross them.', calloutAt: [cen[0] + b1, cen[1]], reveals: [ell('A')] },
      ]);
  })();

  // ═══ 4. Three views sketched from an isometric ═══
  (function () {
    const s = 5, F0 = [40, 140], T0 = [40, 70], R0 = [140, 140];
    const iso = (x, y, z) => [235 + (x - y) * s * C30, 150 - (x + y) * s / 2 - z * s];
    // L-block 8 long, 4 deep, 6 high; upright 2 long at the left
    const isoEdges = [[[0, 0, 0], [8, 0, 0]], [[8, 0, 0], [8, 0, 2]], [[8, 0, 2], [2, 0, 2]], [[2, 0, 2], [2, 0, 6]], [[2, 0, 6], [0, 0, 6]], [[0, 0, 6], [0, 0, 0]],
      [[0, 0, 0], [0, 4, 0]], [[0, 4, 0], [0, 4, 6]], [[0, 4, 6], [0, 0, 6]], [[0, 4, 6], [2, 4, 6]], [[2, 4, 6], [2, 0, 6]], [[2, 4, 6], [2, 4, 2]], [[2, 4, 2], [8, 4, 2]], [[8, 4, 2], [8, 0, 2]]];
    const P = (o, u, v) => [o[0] + u * s * 2, o[1] - v * s * 2];
    const fv = [[0, 0], [8, 0], [8, 2], [2, 2], [2, 6], [0, 6]], tv = [[0, 0], [8, 0], [8, 4], [0, 4]], rv = [[0, 0], [4, 0], [4, 6], [0, 6]];
    add('fh-views-from-iso', 'Freehand: Three Views from an Isometric', 'Sketch the front, top and right views of an L-block on square grid paper by counting squares off the isometric (3rd angle).',
      'From the given isometric (5 mm grid spaces), sketch on 10 mm square grid paper the front view, top view and right view of the L-block in 3rd-angle projection.',
      [
        { instruction: 'GIVEN: the isometric of an L-block. Count its sizes in grid spaces: 8 long, 4 deep, 6 high, with the upright 2 long. On your square grid each space is one square.', calloutAt: iso(4, 0, 3),
          reveals: [...grid(25, 30, 195, 150, 10), ...isoEdges.map(([a, b]) => L(iso(...a), iso(...b))), lbl([235, 158], 'GIVEN / GEGEE', YEL)] },
        { instruction: 'FRONT VIEW: sketch the L shape, 8 squares long and 6 high, the upright 2 squares wide on the left.', calloutAt: P(F0, 4, 3), reveals: [poly(fv.map(([u, v]) => P(F0, u, v)))] },
        { instruction: 'TOP VIEW (above it, 3rd angle): 8 × 4 squares, with the line where the upright meets the base, 2 squares from the left.', calloutAt: P(T0, 4, 2),
          reveals: [poly(tv.map(([u, v]) => P(T0, u, v))), L(P(T0, 2, 0), P(T0, 2, 4)), ...[0, 8].map(u => L(P(F0, u, 6), P(T0, u, 0), 'construction'))] },
        { instruction: 'RIGHT VIEW (to the right): 4 squares wide and 6 high, with the line of the base top 2 squares up.', calloutAt: P(R0, 2, 3),
          reveals: [poly(rv.map(([u, v]) => P(R0, u, v))), L(P(R0, 0, 2), P(R0, 4, 2)), ...[0, 6].map(v => L(P(F0, 8, v), P(R0, 0, v), 'construction'))] },
        { instruction: 'Line in all three views and name them.', calloutAt: P(F0, 4, -1),
          reveals: [lbl(P(F0, 4, -1.3), 'FRONT', { size: 2.6 }), lbl(P(T0, 4, 4.6), 'TOP', { size: 2.6 }), lbl(P(R0, 2, -1.3), 'RIGHT', { size: 2.6 })] },
      ], { projection: 'third' });
  })();

  // ═══ 5. Enlarging by grid ═══
  (function () {
    const small = [[0, 2], [2, 0], [5, 0], [6, 1], [9, 1], [10, 2], [9, 3], [6, 3], [5, 4], [2, 4]];
    const P = q => [25 + q[0] * 5, 70 - q[1] * 5], Q = q => [90 + q[0] * 12, 130 - q[1] * 12];
    add('fh-enlarge', 'Enlarging a Figure by Grid', 'Enlarge a figure with a bigger grid: every point keeps its position in its square, so the whole shape grows in proportion.',
      'Enlarge the spanner end to 2.4 times its size by copying it from the 5 mm grid onto a 12 mm grid.',
      [
        { instruction: 'GIVEN: the spanner end on a 5 mm grid. Draw a 12 mm grid with the same number of squares: the copy will be 12/5 = 2.4 times as large.', calloutAt: Q([0, 0]),
          reveals: [...grid(25, 50, 75, 70, 5), poly(small.map(P)), ...grid(90, 82, 210, 130, 12)] },
        { instruction: 'Mark each corner in the same place in its square, counting squares across and up.', calloutAt: Q([5, 0]), reveals: small.map(q => pt(Q(q))) },
        { instruction: 'Sketch the lines between the points lightly, then line them in.', calloutAt: Q([9, 3]), reveals: [poly(small.map(Q))] },
        { instruction: 'Check: every side is 2.4 times as long as on the given figure, and every angle is unchanged.', calloutAt: Q([2, 4]), reveals: [lbl([150, 145], 'ENLARGED 2.4 : 1', YEL)] },
      ]);
  })();

  // ═══ 6. A hexagon nut sketched freehand ═══
  (function () {
    const c = [100, 90], af = 60, R = af / 2 / C30;
    const hex = Array.from({ length: 6 }, (_, i) => { const t = i * 60 * Math.PI / 180; return [c[0] + R * Math.cos(t), c[1] + R * Math.sin(t)]; });
    add('fh-nut-sketch', 'Freehand: Hexagon Nut (End View)', 'Sketch a nut end view freehand: a circle by the box method, then the hexagon round it with its flats touching.',
      'Sketch freehand the end view of an M30-size nut: across flats 60, hole Ø30, chamfer circle touching the flats.',
      [
        { instruction: 'Sketch the centre lines and a light circle Ø60 by the box method (this is the across-flats circle).', calloutAt: [c[0], c[1] - af / 2],
          reveals: [L([c[0] - R - 6, c[1]], [c[0] + R + 6, c[1]], 'centre'), L([c[0], c[1] - af / 2 - 6], [c[0], c[1] + af / 2 + 6], 'centre'), curve(c, af / 2, af / 2, 0, 360, 72, 'construction')] },
        { instruction: 'Sketch the hexagon round it: two flats horizontal (top and bottom) and the other four at 60°, each touching the circle. The corners lie on the horizontal centre line.', calloutAt: hex[0], reveals: [poly(hex)] },
        { instruction: 'Line in the chamfer circle (the Ø60 circle) and sketch the Ø30 hole.', calloutAt: [c[0], c[1] - 15], reveals: [curve(c, af / 2, af / 2, 0, 360, 72), curve(c, 15, 15, 0, 360, 48)] },
      ]);
  })();

  global.CONSTRUCTIONS = C;
  global.CONSTRUCTION_ORDER = ORDER;
})(window);
