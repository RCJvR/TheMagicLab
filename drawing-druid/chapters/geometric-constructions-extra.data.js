// Geometrical constructions (Gr 10), JPEGD-volume pass 2: the construction types the workbook has that
// were still missing (a line in a given ratio, a square and any regular polygon in a circle, a tangent arc
// in an acute angle, an arc touching one circle and enclosing another, the trammel ellipse) and two more
// "copy the figure" parts. Original designs, small steps. Runs after geometric-constructions-figures.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  if (!C || !ORDER || global.DD_BUILDERS_ONLY) return;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3.2, anchor: 'middle', color: '#fde047' }, opts || {});
  const pt = (at, label) => ({ kind: 'point', at, label });
  const circle = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const unit = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const rad = d => d * Math.PI / 180;
  const ang = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]) * 180 / Math.PI;
  const mod = a => ((a % 360) + 360) % 360;
  const arcS = (c, r, a0, a1, lt) => ({ kind: 'arc-construction', center: c, r, startDeg: a0, endDeg: a1, lineType: lt || 'construction' });
  const arcVia = (c, r, p, q, m, lt) => {
    const ap = ang(c, p), aq = ang(c, q), am = ang(c, m);
    return mod(am - ap) < mod(aq - ap) ? arcS(c, r, ap, ap + mod(aq - ap), lt) : arcS(c, r, aq, aq + mod(ap - aq), lt);
  };
  const swingAt = (c, r, deg, half) => arcS(c, r, deg - (half || 12), deg + (half || 12));
  const swing = (c, r, p, half) => swingAt(c, r, ang(c, p), half);
  const cc = (c1, r1, c2, r2) => {
    const d = dist(c1, c2), a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    const u = unit(sub(c2, c1)), m = add(c1, mul(u, a));
    return [add(m, [-u[1] * h, u[0] * h]), add(m, [u[1] * h, -u[0] * h])];
  };
  const foot = (p, a, b) => { const u = unit(sub(b, a)), t = (p[0] - a[0]) * u[0] + (p[1] - a[1]) * u[1]; return add(a, mul(u, t)); };
  const ext = (a, b, k) => add(b, mul(unit(sub(b, a)), k));
  const added = [];
  function make(id, title, summary, prompt, steps) {
    C[id] = { id, title, summary, workbookPrompt: prompt, bounds: { w: 200, h: 180 }, steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(id); added.push(id);
  }

  // ── Divide a line in a given ratio (2 : 3) ──
  (function () {
    const A = [30, 135], B = [160, 135], u = [Math.cos(rad(30)), -Math.sin(rad(30))], s = 18;
    const N = [1, 2, 3, 4, 5].map(k => add(A, mul(u, s * k)));
    const P = add(A, mul(sub(B, A), 2 / 5));
    make('divide-line-ratio', 'Divide a Line in a Given Ratio (2 : 3)',
      'Divide a line into parts in a given ratio: step off 2 + 3 = 5 equal spaces on a line at an angle, join the last mark to the end, and draw a parallel through mark 2.',
      'Line AB is 130 mm long. Divide it in the ratio 2 : 3 by construction. Show all construction and measure the two parts.',
      [
        { instruction: 'Draw AB, 130 long.', calloutAt: B, reveals: [L(A, B), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'The ratio 2 : 3 has 2 + 3 = 5 parts. From A draw a thin line AC at about 30° to AB.', calloutAt: add(A, mul(u, 100)), reveals: [L(A, add(A, mul(u, 105)), 'construction'), pt(add(A, mul(u, 105)), 'C')] },
        { instruction: 'Set the compass to any convenient radius (18) and step off FIVE equal spaces along AC from A: marks 1 to 5.', calloutAt: N[2],
          reveals: [...N.map((p, i) => swing(i === 0 ? A : N[i - 1], s, p, 8)), ...N.map((p, i) => pt(p, String(i + 1)))] },
        { instruction: 'Join mark 5 to B.', calloutAt: mul(add(N[4], B), 0.5), reveals: [L(N[4], B, 'construction')] },
        { instruction: 'Slide a set square along a ruler to draw a line through mark 2 PARALLEL to 5B. It cuts AB at P.', calloutAt: P, reveals: [L(N[1], P, 'construction'), pt(P, 'P')] },
        { instruction: 'AP : PB = 2 : 3. Measure to check: AP = 52 and PB = 78.', calloutAt: [100, 150],
          reveals: [{ kind: 'dimension', p1: A, p2: P, offset: 12, text: '52' }, { kind: 'dimension', p1: P, p2: B, offset: 12, text: '78' }] },
      ]);
  })();

  // ── Square inscribed in a circle ──
  (function () {
    const O = [100, 92], r = 50, A = [O[0] - r, O[1]], B = [O[0] + r, O[1]], R = 75;
    const E = cc(A, R, B, R), Eu = E[0][1] < E[1][1] ? E[0] : E[1], Ed = E[0][1] < E[1][1] ? E[1] : E[0];
    const Cq = [O[0], O[1] - r], D = [O[0], O[1] + r];
    make('square-in-circle', 'Square Inscribed in a Circle',
      'Two diameters at right angles cut the circle at the four corners of a square: the second diameter is the perpendicular bisector of the first.',
      'Draw a circle of Ø100. Inscribe a square in it by construction. Show all construction.',
      [
        { instruction: 'Draw the circle, centre O, radius 50.', calloutAt: O, reveals: [circle(O, r), pt(O, 'O')] },
        { instruction: 'Draw a horizontal diameter AB through O.', calloutAt: A, reveals: [L(A, B, 'construction'), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'Bisect AB: with centres A and B and radius 75 (more than half of AB), draw arcs that cross above and below the circle at E and F.', calloutAt: Eu,
          reveals: [swing(A, R, Eu, 9), swing(B, R, Eu, 9), swing(A, R, Ed, 9), swing(B, R, Ed, 9), pt(Eu, 'E'), pt(Ed, 'F')] },
        { instruction: 'Join E and F: the second diameter, at 90° to AB. It cuts the circle at C and D.', calloutAt: Cq, reveals: [L(Eu, Ed, 'construction'), pt(Cq, 'C'), pt(D, 'D'), { kind: 'right-angle-marker', at: O, size: 5 }] },
        { instruction: 'Join A, C, B and D with thick lines: the inscribed square. Each side is r√2 ≈ 70,7.', calloutAt: mul(add(A, Cq), 0.5),
          reveals: [L(A, Cq), L(Cq, B), L(B, D), L(D, A)] },
      ]);
  })();

  // ── Any regular polygon in a circle (general method): a heptagon ──
  (function () {
    const O = [110, 92], r = 50, A = [O[0], O[1] - r], B = [O[0], O[1] + r], n = 7;
    const u = unit([-Math.sin(rad(30)), Math.cos(rad(30))]), s = 12;                 // inclined line from A, down to the left
    const M = Array.from({ length: n }, (_, k) => add(A, mul(u, s * (k + 1))));
    const D = Array.from({ length: n - 1 }, (_, k) => add(A, mul(sub(B, A), (k + 1) / n)));
    const E = (cc(A, 2 * r, B, 2 * r).find(p => p[0] < O[0]));
    // the line from E through division 2 meets the circle again beyond it at C
    const v = unit(sub(D[1], E)), w = sub(E, O), bq = w[0] * v[0] + w[1] * v[1], cq = w[0] * w[0] + w[1] * w[1] - r * r;
    const Cp = add(E, mul(v, -bq + Math.sqrt(bq * bq - cq)));
    const side = dist(A, Cp), step = 2 * Math.asin(side / (2 * r));
    const a0 = Math.atan2(A[1] - O[1], A[0] - O[0]), dir = Math.sign(Math.sin(Math.atan2(Cp[1] - O[1], Cp[0] - O[0]) - a0)) || 1;
    const V = Array.from({ length: n }, (_, k) => [O[0] + r * Math.cos(a0 + dir * step * k), O[1] + r * Math.sin(a0 + dir * step * k)]);
    make('polygon-in-circle', 'Regular Heptagon in a Circle (General Method)',
      'The general method for any regular polygon in a circle: divide the diameter into as many equal parts as the polygon has sides, and draw a line from an arc intersection through division 2.',
      'Draw a circle of Ø100 and inscribe a regular heptagon (seven sides) in it, using the general method. Show all construction.',
      [
        { instruction: 'Draw the circle, centre O, radius 50, and a vertical diameter AB.', calloutAt: O, reveals: [circle(O, r), L(A, B, 'construction'), pt(O, 'O'), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'A heptagon has 7 sides, so divide AB into 7 equal parts: step 7 equal spaces along a thin line from A, join the last mark to B, and draw parallels through the other marks.', calloutAt: M[3],
          reveals: [L(A, M[n - 1], 'construction'), L(M[n - 1], B, 'construction'), ...D.map((p, k) => L(M[k], p, 'construction')), ...D.map((p, k) => pt(p, String(k + 1)))] },
        { instruction: 'With centres A and B and radius AB (100), draw arcs that cross at E, outside the circle.', calloutAt: E, reveals: [swing(A, 2 * r, E, 8), swing(B, 2 * r, E, 8), pt(E, 'E')] },
        { instruction: 'Draw a line from E through division 2 and on to the circle at C. AC is one side of the heptagon. (Always use division 2, whatever the number of sides.)', calloutAt: Cp, reveals: [L(E, Cp, 'construction'), pt(Cp, 'C')] },
        { instruction: 'Set the compass to AC and step it round the circle from C to mark the other corners.', calloutAt: V[3], reveals: V.slice(2).map((p, k) => swing(V[k + 1], side, p, 7)) },
        { instruction: 'Join the corners with thick lines. The general method is very close but not exact: if the last side differs slightly, share the error round the circle.', calloutAt: V[4],
          reveals: V.map((p, k) => L(p, V[(k + 1) % n])) },
      ]);
  })();

  // ── Tangent arc in an acute angle ──
  (function () {
    const V = [35, 150], th = 50, d2 = [Math.cos(rad(th)), -Math.sin(rad(th))], R = 25;
    const P1 = [185, 150], P2 = add(V, mul(d2, 150));
    const O = add(V, mul([Math.cos(rad(th / 2)), -Math.sin(rad(th / 2))], R / Math.sin(rad(th / 2))));
    const n1 = [0, -1], n2 = [Math.sin(rad(th)), Math.cos(rad(th))];
    const T1 = foot(O, V, P1), T2 = foot(O, V, P2);
    const a1 = add(V, [110, 0]), b1 = add(V, [140, 0]), a2 = add(V, mul(d2, 95)), b2 = add(V, mul(d2, 125));
    const deg = n => Math.atan2(n[1], n[0]) * 180 / Math.PI;
    make('arc-acute-angle', 'Tangent Arc in an Acute Angle',
      'Round off a 50° corner with an R25 arc: the centre lies 25 from both lines, found with two parallel lines, and the tangent points lie square to the lines from the centre.',
      'Two lines meet at 50°. Round off the corner with an arc of radius 25 that touches both lines. Show all construction and the tangent points.',
      [
        { instruction: 'Draw the two lines meeting at V at 50°.', calloutAt: V, reveals: [L(V, P1, 'construction'), L(V, P2, 'construction'), pt(V, 'V')] },
        { instruction: 'With radius 25, swing arcs from two points on each line, on the inside of the angle.', calloutAt: add(a1, [0, -R]),
          reveals: [swingAt(a1, R, deg(n1), 14), swingAt(b1, R, deg(n1), 14), swingAt(a2, R, deg(n2), 14), swingAt(b2, R, deg(n2), 14)] },
        { instruction: 'Draw a line touching each pair of arcs, parallel to its line. The two parallels cross at O, the centre of the arc.', calloutAt: O,
          reveals: [L(add(V, [40, -R]), add(b1, [10, -R]), 'construction'), L(add(add(V, mul(d2, 45)), mul(n2, R)), add(add(V, mul(d2, 135)), mul(n2, R)), 'construction'), pt(O, 'O')] },
        { instruction: 'From O draw lines square to each line: the tangent points T1 and T2.', calloutAt: T2,
          reveals: [L(O, T1, 'construction'), L(O, T2, 'construction'), pt(T1, 'T1'), pt(T2, 'T2'), { kind: 'right-angle-marker', at: T1, size: 4 }] },
        { instruction: 'With centre O and radius 25, draw the arc from T1 to T2. Line in the straight lines from the tangent points outwards (thick).', calloutAt: T1,
          reveals: [arcVia(O, R, T1, T2, add(O, mul(unit(sub(V, O)), R)), 'A'), L(T1, P1), L(T2, P2)] },
      ]);
  })();

  // ── Arc touching one circle outside and enclosing the other ──
  (function () {
    const A = [55, 105], ra = 18, B = [145, 100], rb = 28, R = 70;
    const O = cc(A, R + ra, B, R - rb).find(p => p[1] < 100);
    const TA = add(A, mul(unit(sub(O, A)), ra)), TB = add(O, mul(unit(sub(B, O)), R));
    const mid = add(O, mul(unit(add(unit(sub(TA, O)), unit(sub(TB, O)))), R));
    make('arc-circle-outside-enclose', 'Tangent Arc Touching One Circle and Enclosing Another',
      'An R70 arc that touches circle A on the outside and wraps round circle B: from A the radius is R + r, from B it is R − r.',
      'Circle A is Ø36 and circle B is Ø56; B is 90 to the right of A and 5 higher. Draw an R70 arc that touches A on the outside and encloses B. Show all construction and the tangent points.',
      [
        { instruction: 'Draw the two circles: A, radius 18, and B, radius 28, with their centre lines.', calloutAt: A,
          reveals: [circle(A, ra), circle(B, rb), pt(A, 'A'), pt(B, 'B'), L([A[0] - 24, A[1]], [B[0] + 34, B[1] + (B[1] - A[1]) * 34 / 90], 'centre')] },
        { instruction: 'The arc touches A on the OUTSIDE: from A draw an arc of radius 70 + 18 = 88.', calloutAt: O, reveals: [swing(A, R + ra, O, 14)] },
        { instruction: 'The arc ENCLOSES B: from B draw an arc of radius 70 − 28 = 42. The two arcs cross at O.', calloutAt: O, reveals: [swing(B, R - rb, O, 18), pt(O, 'O')] },
        { instruction: 'Join O to A: it cuts circle A at the tangent point TA. Draw a line from O through B, extended to circle B: the tangent point TB.', calloutAt: TB,
          reveals: [L(O, A, 'construction'), L(O, TB, 'construction'), pt(TA, 'TA'), pt(TB, 'TB')] },
        { instruction: 'With centre O and radius 70, draw the arc from TA to TB (thick).', calloutAt: mid, reveals: [arcVia(O, R, TA, TB, mid, 'A')] },
      ]);
  })();

  // ── Ellipse: trammel method ──
  (function () {
    const Oc = [100, 88], a = 70, b = 40;
    const P = t => [Oc[0] + a * Math.cos(rad(t)), Oc[1] - b * Math.sin(rad(t))];
    const Rm = t => [Oc[0], Oc[1] - (b - a) * Math.sin(rad(t))], Qm = t => [Oc[0] + (a - b) * Math.cos(rad(t)), Oc[1]];
    const ts = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const curve = Array.from({ length: 73 }, (_, i) => P(i * 5));
    const S0 = [30, 160];
    make('ellipse-trammel', 'Ellipse: Trammel Method',
      'A paper strip (trammel) marked with half the major and half the minor axis: keep one mark on each axis and the end of the strip traces the ellipse.',
      'Draw an ellipse with a major axis of 140 and a minor axis of 80 by the trammel method. Show at least twelve plotted points.',
      [
        { instruction: 'Draw the major axis AB (140) and the minor axis CD (80), crossing at right angles at their midpoints.', calloutAt: [Oc[0] + a, Oc[1]],
          reveals: [L([Oc[0] - a, Oc[1]], [Oc[0] + a, Oc[1]], 'construction'), L([Oc[0], Oc[1] - b], [Oc[0], Oc[1] + b], 'construction'),
            pt([Oc[0] - a, Oc[1]], 'A'), pt([Oc[0] + a, Oc[1]], 'B'), pt([Oc[0], Oc[1] - b], 'C'), pt([Oc[0], Oc[1] + b], 'D')] },
        { instruction: 'Make the trammel: on the straight edge of a paper strip mark P near one end, then Q 40 from P (half the minor axis) and R 70 from P (half the major axis).', calloutAt: S0,
          reveals: [{ kind: 'polygon', points: [S0, add(S0, [80, 0]), add(S0, [80, 6]), add(S0, [0, 6])], lineType: 'B' },
            pt(S0, 'P'), pt(add(S0, [b, 0]), 'Q'), pt(add(S0, [a, 0]), 'R')] },
        { instruction: 'Lay the strip so that Q is on the major axis and R is on the minor axis. Mark the paper at P: a point on the ellipse.', calloutAt: P(30),
          reveals: [L(Rm(30), P(30), 'construction'), pt(Qm(30)), pt(Rm(30)), pt(P(30), '1')] },
        { instruction: 'Move the strip, keeping Q on the major axis and R on the minor axis, and mark P again: work round all four quadrants for twelve or more points.', calloutAt: P(150),
          reveals: [L(Rm(150), P(150), 'construction'), ...ts.filter(t => t !== 30).map(t => pt(P(t)))] },
        { instruction: 'Join the points with a smooth freehand curve (or a French curve), thick.', calloutAt: P(250), reveals: [{ kind: 'polyline', points: curve, lineType: 'A' }] },
      ]);
  })();

  // the new basics sit before the "copy a figure" parts
  added.forEach(id => ORDER.splice(ORDER.indexOf(id), 1));
  const firstFig = ORDER.indexOf('fig-rocker-arm');
  ORDER.splice(firstFig >= 0 ? firstFig : ORDER.length, 0, ...added);

  // ── Two more "copy the figure" parts (figure() from geometric-constructions-figures.data.js) ──
  const fig = global.DDBuild && global.DDBuild.figure;
  if (!fig) return;
  fig({ id: 'fig-gear-lever', title: 'Copy a Figure: Gear Lever', part: 'gear lever',
    bosses: [{ c: [60, 120], r: 24, hole: 20 }, { c: [175, 70], r: 14, hole: 10 }],
    links: [{ type: 'enclose', R: 110 }, { type: 'arc', R: 60 }],
    summary: 'A two-boss lever with a large R110 arc wrapped round both bosses on one side and an R60 concave arc on the other.',
    prompt: 'B is 115 right and 50 up from A. An R110 arc encloses both bosses on one side; an R60 concave arc joins them on the other.' });
  fig({ id: 'fig-swing-link', title: 'Copy a Figure: Swing Link', part: 'swing link',
    bosses: [{ c: [55, 130], r: 18, hole: 14 }, { c: [140, 60], r: 22, hole: 20 }, { c: [215, 125], r: 12, hole: 8 }],
    links: [{ type: 'arc', R: 50 }, { type: 'line' }, { type: 'enclose', R: 130 }],
    summary: 'A three-boss swing link: an R50 concave arc, a straight tangent and a big R130 arc enclosing the two lower bosses.',
    prompt: 'B is 85 right and 70 up from A; C is 160 right and 5 up from A. An R50 concave arc joins A and B, a straight tangent joins B and C, and an R130 arc encloses C and A.' });
})(window);
