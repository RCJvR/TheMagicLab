// Geometrical constructions (Gr 10): the basic constructions drilled in the workbooks, each in small
// steps with compass, ruler and set squares. Runs after geometric-constructions-more.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3.4, anchor: 'middle', color: '#fde047' }, opts || {});
  const pt = (at, label) => ({ kind: 'point', at, label });
  const circle = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const unit = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const rot = (v, t) => [v[0] * Math.cos(t) - v[1] * Math.sin(t), v[0] * Math.sin(t) + v[1] * Math.cos(t)];
  const ang = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]) * 180 / Math.PI;
  const mod = a => ((a % 360) + 360) % 360;
  const arcS = (c, r, a0, a1, lt) => ({ kind: 'arc-construction', center: c, r, startDeg: a0, endDeg: a1, lineType: lt || 'construction' });
  const arcVia = (c, r, p, q, m, lt) => {
    const ap = ang(c, p), aq = ang(c, q), am = ang(c, m);
    return mod(am - ap) < mod(aq - ap) ? arcS(c, r, ap, ap + mod(aq - ap), lt) : arcS(c, r, aq, aq + mod(ap - aq), lt);
  };
  const swing = (c, r, p, half) => { const a = ang(c, p); return arcS(c, r, a - (half || 12), a + (half || 12)); };
  const cc = (c1, r1, c2, r2) => {
    const d = dist(c1, c2), a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    const u = unit(sub(c2, c1)), m = add(c1, mul(u, a));
    return [add(m, [-u[1] * h, u[0] * h]), add(m, [u[1] * h, -u[0] * h])];
  };
  const upper = ps => ps[0][1] < ps[1][1] ? ps[0] : ps[1], lower = ps => ps[0][1] > ps[1][1] ? ps[0] : ps[1];
  const foot = (p, a, b) => { const u = unit(sub(b, a)), t = (p[0] - a[0]) * u[0] + (p[1] - a[1]) * u[1]; return add(a, mul(u, t)); };
  const lineX = (p, q, r, s) => {
    const d = (p[0] - q[0]) * (r[1] - s[1]) - (p[1] - q[1]) * (r[0] - s[0]);
    const t = ((p[0] - r[0]) * (r[1] - s[1]) - (p[1] - r[1]) * (r[0] - s[0])) / d;
    return add(p, mul(sub(q, p), t));
  };
  const ext = (a, b, k) => add(b, mul(unit(sub(b, a)), k));
  const XY = (X, Y) => [L(X, Y), lbl([X[0] - 4, X[1] + 1], 'X', { size: 3 }), lbl([Y[0] + 4, Y[1] + 1], 'Y', { size: 3 })];
  function make(id, title, summary, prompt, steps) {
    C[id] = { id, title, summary, workbookPrompt: prompt, bounds: { w: 200, h: 180 }, steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(id);
  }

  // ── Perpendicular at a point ON a line ──
  (function () {
    const X = [30, 120], Y = [180, 120], P = [100, 120], r = 30, A = [70, 120], Bp = [130, 120], R = 45;
    const Q = upper(cc(A, R, Bp, R));
    make('perp-at-point', 'Perpendicular at a Point on a Line',
      'Erect a line at 90° to a given line through a point on it: equal arcs from P mark two points, and arcs from those meet on the perpendicular.',
      'Given line XY and point P on it. Construct a line through P perpendicular to XY. Show all construction.',
      [
        { instruction: 'Draw line XY and mark P on it.', calloutAt: P, reveals: [...XY(X, Y), pt(P, 'P')] },
        { instruction: 'With centre P and radius 30, cut XY on both sides of P at A and B.', calloutAt: A, reveals: [swing(P, r, A, 10), swing(P, r, Bp, 10), pt(A, 'A'), pt(Bp, 'B')] },
        { instruction: 'With centres A and B and a larger radius (45), draw arcs that cross above the line at Q.', calloutAt: Q, reveals: [swing(A, R, Q, 12), swing(Bp, R, Q, 12), pt(Q, 'Q')] },
        { instruction: 'Join P to Q and extend it: PQ is perpendicular to XY.', calloutAt: Q, reveals: [L(P, ext(P, Q, 15)), { kind: 'right-angle-marker', at: P, size: 5 }] },
      ]);
  })();

  // ── Perpendicular at the END of a line ──
  (function () {
    const A = [40, 130], B = [150, 130], r = 30, O = [B[0] - 18, B[1] - 24];
    const rr = dist(O, B);
    const Cpt = [B[0] - 2 * (B[0] - O[0]), B[1]];                   // second cut on AB
    const D = add(O, mul(unit(sub(O, Cpt)), rr));                    // diameter through C
    make('perp-at-end', 'Perpendicular at the End of a Line',
      'Erect a perpendicular at the end of a line without extending it: a circle through B, and a diameter of that circle, give a right angle at B (the angle in a semicircle).',
      'Given line AB. Construct a perpendicular to AB at B without extending the line. Show all construction.',
      [
        { instruction: 'Draw line AB.', calloutAt: A, reveals: [L(A, B), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'Choose a point O above the line, near B. With centre O and radius OB, draw a circle that cuts AB again at C.', calloutAt: O, reveals: [pt(O, 'O'), circle(O, rr, 'construction'), pt(Cpt, 'C')] },
        { instruction: 'Draw a line from C through O to cut the circle at D. CD is a diameter.', calloutAt: D, reveals: [L(Cpt, D, 'construction'), pt(D, 'D')] },
        { instruction: 'Join B to D: BD is perpendicular to AB (the angle in a semicircle is 90°).', calloutAt: D, reveals: [L(B, ext(B, D, 10)), { kind: 'right-angle-marker', at: B, size: 5, rotationDeg: -90 }] },
      ]);
  })();

  // ── Parallel line at a given distance ──
  (function () {
    const X = [25, 135], Y = [180, 135], d = 35, P1 = [55, 135], P2 = [150, 135];
    const T1 = [55, 100], T2 = [150, 100];
    make('parallel-at-distance', 'Parallel Line at a Given Distance',
      'Draw a line parallel to a given line, a fixed distance away: two arcs of that radius, and the common tangent to them.',
      'Given line XY. Construct a line parallel to XY and 35 mm from it. Show all construction.',
      [
        { instruction: 'Draw line XY.', calloutAt: X, reveals: XY(X, Y) },
        { instruction: 'Mark two points well apart on XY. With each as centre and radius 35, draw an arc above the line.', calloutAt: T1, reveals: [pt(P1), pt(P2), arcS(P1, d, 230, 310), arcS(P2, d, 230, 310)] },
        { instruction: 'Draw a line just touching the tops of both arcs (the common tangent). It is parallel to XY and 35 from it.', calloutAt: T2, reveals: [L([25, 100], [180, 100]), L(P2, T2, 'construction'), { kind: 'dimension', p1: P2, p2: T2, offset: -8, text: '35' }] },
      ]);
  })();

  // ── Equilateral triangle on a given side ──
  (function () {
    const A = [60, 140], B = [140, 140], s = 80, Cp = upper(cc(A, s, B, s));
    make('triangle-on-side', 'Equilateral Triangle on a Given Side',
      'All three sides equal: arcs of radius AB from both ends of the side meet at the third corner.',
      'Construct an equilateral triangle on a side AB of 80 mm. Show all construction.',
      [
        { instruction: 'Draw the side AB, 80 mm long.', calloutAt: A, reveals: [L(A, B), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'With centre A and radius AB, draw an arc above the line.', calloutAt: Cp, reveals: [arcVia(A, s, B, Cp, add(A, rot([s, 0], -0.6)), 'construction')] },
        { instruction: 'With centre B and the same radius, draw an arc to cross the first one at C.', calloutAt: Cp, reveals: [arcVia(B, s, A, Cp, add(B, rot([-s, 0], 0.6)), 'construction'), pt(Cp, 'C')] },
        { instruction: 'Join A and B to C.', calloutAt: Cp, reveals: [L(A, Cp), L(B, Cp)] },
      ]);
  })();

  // ── Square on a given side ──
  (function () {
    const A = [60, 150], B = [130, 150], s = 70, D = [60, 80], Cq = [130, 80];
    const E = [60 - 30, 150], F = [60 + 30, 150], Q = upper(cc(E, 45, F, 45));
    make('square-on-side', 'Square on a Given Side',
      'Erect a perpendicular at one end of the side, step the side length up it, and close the square with arcs.',
      'Construct a square on a side AB of 70 mm. Show all construction.',
      [
        { instruction: 'Draw the side AB, 70 mm long, extended a little to the left of A.', calloutAt: A, reveals: [L([25, 150], B, 'construction'), L(A, B), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'Erect a perpendicular at A: arcs of 30 from A mark the line on both sides; arcs of 45 from those points cross above A.', calloutAt: Q, reveals: [swing(A, 30, E, 8), swing(A, 30, F, 8), swing(E, 45, Q, 10), swing(F, 45, Q, 10), L(A, ext(A, Q, 30), 'construction')] },
        { instruction: 'With centre A and radius 70, cut the perpendicular at D.', calloutAt: D, reveals: [swing(A, s, D, 10), pt(D, 'D')] },
        { instruction: 'With radius 70, draw arcs from B and from D. They cross at C.', calloutAt: Cq, reveals: [swing(B, s, Cq, 10), swing(D, s, Cq, 10), pt(Cq, 'C')] },
        { instruction: 'Line in the square ABCD.', calloutAt: Cq, reveals: [L(A, D), L(D, Cq), L(Cq, B)] },
      ]);
  })();

  // ── Regular hexagon on a given side ──
  (function () {
    const A = [80, 150], B = [120, 150], s = 40, O = upper(cc(A, s, B, s));
    const P = Array.from({ length: 6 }, (_, i) => add(O, rot(sub(A, O), -i * Math.PI / 3)));
    make('hexagon-on-side', 'Regular Hexagon on a Given Side',
      'A hexagon is six equilateral triangles: the centre is found from the side, and the side length steps round the circle exactly six times.',
      'Construct a regular hexagon on a side AB of 40 mm. Show all construction.',
      [
        { instruction: 'Draw the side AB, 40 mm long.', calloutAt: A, reveals: [L(A, B), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'With radius 40, draw arcs from A and B to cross at O: the centre of the hexagon.', calloutAt: O, reveals: [swing(A, s, O, 12), swing(B, s, O, 12), pt(O, 'O')] },
        { instruction: 'With centre O and radius 40, draw the circle through A and B.', calloutAt: add(O, [0, -s]), reveals: [circle(O, s, 'construction')] },
        { instruction: 'Step the radius 40 round the circle from B: the other four corners.', calloutAt: P[3], reveals: P.slice(2).map((p, i) => swing(P[i + 1], s, p, 8)) },
        { instruction: 'Join the corners to complete the hexagon.', calloutAt: P[3], reveals: P.map((p, i) => L(p, P[(i + 1) % 6])) },
      ]);
  })();

  // ── Regular octagon on a given side (45° set square) ──
  (function () {
    const A = [85, 160], B = [125, 160], s = 40, k = s / Math.SQRT2;
    const P = [A, B, [B[0] + k, B[1] - k], [B[0] + k, B[1] - k - s], [B[0], B[1] - 2 * k - s], [A[0], A[1] - 2 * k - s], [A[0] - k, A[1] - k - s], [A[0] - k, A[1] - k]];
    make('octagon-on-side', 'Regular Octagon on a Given Side',
      'Each outside angle of an octagon is 45°: build it round from the given side with the 45° set square, stepping the side length each time.',
      'Construct a regular octagon on a side AB of 40 mm, using the 45° set square. Show all construction.',
      [
        { instruction: 'Draw the side AB, 40 mm long.', calloutAt: A, reveals: [L(A, B), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'With the 45° set square, draw lines at 45° up and out from A and from B. Mark 40 along each.', calloutAt: P[2], reveals: [L(B, ext(B, P[2], 10), 'construction'), L(A, ext(A, P[7], 10), 'construction'), swing(B, s, P[2], 8), swing(A, s, P[7], 8), pt(P[2]), pt(P[7])] },
        { instruction: 'From those corners draw vertical sides 40 long.', calloutAt: P[3], reveals: [L(P[2], P[3], 'construction'), L(P[7], P[6], 'construction'), pt(P[3]), pt(P[6])] },
        { instruction: 'From their tops draw lines at 45° inwards, 40 long, and join the last two corners: the top side is parallel to AB.', calloutAt: P[4], reveals: [L(P[3], P[4], 'construction'), L(P[6], P[5], 'construction'), pt(P[4]), pt(P[5])] },
        { instruction: 'Line in the octagon.', calloutAt: P[4], reveals: P.map((p, i) => L(p, P[(i + 1) % 8])) },
      ]);
  })();

  // ── Regular octagon in a square ──
  (function () {
    const c = [100, 95], h = 50, sq = [[c[0] - h, c[1] - h], [c[0] + h, c[1] - h], [c[0] + h, c[1] + h], [c[0] - h, c[1] + h]];
    const r = h * Math.SQRT2;
    const P = [];                                       // two cuts on each side, in order round the square
    sq.forEach((q, i) => { const nx = sq[(i + 1) % 4], u = unit(sub(nx, q)); P.push(add(q, mul(u, 2 * h - r)), add(q, mul(u, r))); });
    const order = P;
    make('octagon-in-square', 'Regular Octagon in a Square',
      'An octagon cut from a square: arcs from each corner with radius half the diagonal mark the eight corners on the sides.',
      'Construct a regular octagon inside a 100 mm square. Show all construction.',
      [
        { instruction: 'Draw the 100 mm square and its two diagonals. They cross at the centre O.', calloutAt: c, reveals: [...sq.map((q, i) => L(q, sq[(i + 1) % 4])), L(sq[0], sq[2], 'construction'), L(sq[1], sq[3], 'construction'), pt(c, 'O')] },
        { instruction: 'With each corner as centre and radius from the corner to O (half the diagonal), draw arcs to cut the two sides next to it.', calloutAt: P[0], reveals: sq.map(q => arcVia(q, r, add(q, mul(unit(sub(sq[(sq.indexOf(q) + 1) % 4], q)), r)), add(q, mul(unit(sub(sq[(sq.indexOf(q) + 3) % 4], q)), r)), c)) },
        { instruction: 'The eight cuts are the corners of the octagon. Join them.', calloutAt: P[2], reveals: [...P.map(p => pt(p)), ...order.map((p, i) => L(p, order[(i + 1) % 8]))] },
      ]);
  })();

  // ── Centre of a given circle ──
  (function () {
    const O = [100, 95], R = 50, a1 = [-160, -100], a2 = [-40, 20];
    const on = a => add(O, [R * Math.cos(a * Math.PI / 180), R * Math.sin(a * Math.PI / 180)]);
    const A = on(a1[0]), B = on(a1[1]), Cc = on(a2[0]), D = on(a2[1]);
    const bis = (p, q) => { const m = mul(add(p, q), 0.5), u = unit(sub(q, p)), n = [-u[1], u[0]]; return [add(m, mul(n, -70)), add(m, mul(n, 70))]; };
    const b1 = bis(A, B), b2 = bis(Cc, D);
    make('centre-of-circle', 'Find the Centre of a Circle',
      'The perpendicular bisector of any chord passes through the centre: bisect two chords and the bisectors cross at it.',
      'A circle is given without its centre. Find the centre by construction. Show all construction.',
      [
        { instruction: 'Draw the given circle (its centre is not known).', calloutAt: on(-90), reveals: [circle(O, R)] },
        { instruction: 'Draw two chords AB and CD that are not parallel.', calloutAt: A, reveals: [L(A, B, 'construction'), L(Cc, D, 'construction'), pt(A, 'A'), pt(B, 'B'), pt(Cc, 'C'), pt(D, 'D')] },
        { instruction: 'Bisect chord AB (equal arcs from A and B; join the crossings).', calloutAt: b1[0], reveals: [L(...b1, 'construction')] },
        { instruction: 'Bisect chord CD the same way. The bisectors cross at O, the centre.', calloutAt: O, reveals: [L(...b2, 'construction'), pt(O, 'O'), L([O[0] - R - 5, O[1]], [O[0] + R + 5, O[1]], 'centre'), L([O[0], O[1] - R - 5], [O[0], O[1] + R + 5], 'centre')] },
      ]);
  })();

  // ── Arc between two lines: right angle and obtuse angle ──
  function cornerArc(id, title, deg, R) {
    const V = [60, 150], a = deg * Math.PI / 180;
    const P1 = [185, 150], P2 = [V[0] + 120 * Math.cos(a), 150 - 120 * Math.sin(a)];
    const u1 = [1, 0], u2 = unit(sub(P2, V));
    const q1 = add(V, [0, -R]), o2 = add(V, mul([-u2[1], u2[0]], R));
    const O = lineX(q1, add(q1, u1), o2, add(o2, u2)), T1 = foot(O, V, P1), T2 = foot(O, V, P2);
    const mid = add(O, mul(unit(sub(V, O)), R));
    make(id, title,
      'Round the corner between two lines with an arc of radius ' + R + ': its centre is ' + R + ' from both lines, where two parallels meet.',
      'Two lines meet at ' + deg + '°. Join them with an arc of radius ' + R + ' mm. Show all construction and the tangent points.',
      [
        { instruction: 'Draw the two lines meeting at ' + deg + '°.', calloutAt: V, reveals: [L(V, P1, 'construction'), L(V, P2, 'construction'), { kind: 'angle-arc', vertex: V, p1: P2, p2: P1, radius: 12, text: deg + '°' }] },
        { instruction: 'Draw a parallel to each line, ' + R + ' mm inside the angle (arcs of ' + R + ' and a tangent, or the set square). They cross at O.', calloutAt: O,
          reveals: [L(add(q1, mul(u1, 5)), add(q1, mul(u1, 120)), 'construction'), L(add(o2, mul(u2, 5)), add(o2, mul(u2, 110)), 'construction'), pt(O, 'O')] },
        { instruction: 'Drop perpendiculars from O to both lines: the tangent points T1 and T2.', calloutAt: T1, reveals: [L(O, T1, 'construction'), L(O, T2, 'construction'), pt(T1, 'T1'), pt(T2, 'T2')] },
        { instruction: 'Draw the R' + R + ' arc from T1 to T2 and line in the straight parts.', calloutAt: mid, reveals: [arcVia(O, R, T1, T2, mid, 'A'), L(T1, P1), L(T2, P2)] },
      ]);
  }
  cornerArc('arc-right-angle', 'Tangent Arc in a Right Angle', 90, 30);
  cornerArc('arc-obtuse-angle', 'Tangent Arc in an Obtuse Angle', 125, 28);

  // ── Belts: open (external) and crossed (internal) common tangents ──
  function belt(id, title, crossed) {
    const A = [60, 100], rA = 30, B = [160, 100], rB = 18, d = dist(A, B), M = mul(add(A, B), 0.5);
    const rc = crossed ? rA + rB : rA - rB;
    const Ks = cc(M, d / 2, A, rc);                 // where the semicircle on AB cuts the construction circle
    const tang = K => { const v = unit(sub(K, A)); const tA = add(A, mul(v, rA)); const tB = crossed ? add(B, mul(v, -rB)) : add(B, mul(v, rB)); return { K, tA, tB }; };
    const T = Ks.map(tang);
    make(id, title,
      crossed ? 'A crossed belt: the two internal tangents cross between the pulleys. The construction circle has radius R + r.'
        : 'An open belt: the two external tangents. The construction circle has radius R − r, the difference of the radii.',
      'Two pulleys, R' + rA + ' and R' + rB + ', are 100 mm apart. Draw ' + (crossed ? 'a crossed belt (internal tangents)' : 'an open belt (external tangents)') + ' round them. Show all construction.',
      [
        { instruction: 'Draw the two pulleys with their centre lines.', calloutAt: A, reveals: [circle(A, rA), circle(B, rB), L([A[0] - rA - 5, 100], [B[0] + rB + 5, 100], 'centre'), L([A[0], 100 - rA - 5], [A[0], 100 + rA + 5], 'centre'), L([B[0], 100 - rB - 5], [B[0], 100 + rB + 5], 'centre'), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'From A draw a thin circle of radius ' + rc + ' (' + rA + (crossed ? ' + ' : ' − ') + rB + ').', calloutAt: add(A, [0, -rc]), reveals: [circle(A, rc, 'construction')] },
        { instruction: 'Bisect AB and draw a circle on AB as diameter. It cuts the thin circle at K1 and K2.', calloutAt: T[0].K, reveals: [pt(M), circle(M, d / 2, 'construction'), pt(T[0].K, 'K1'), pt(T[1].K, 'K2')] },
        { instruction: 'Draw lines from A through K1 and K2 to the big pulley: two tangent points. From B draw lines parallel to them' + (crossed ? ', on the opposite side' : '') + ': the other two.', calloutAt: T[0].tA,
          reveals: T.flatMap(t => [L(A, crossed ? t.K : t.tA, 'construction'), L(B, t.tB, 'construction'), pt(t.tA), pt(t.tB)]) },
        { instruction: 'Join the tangent points in pairs: the belt.', calloutAt: T[1].tB, reveals: T.map(t => L(t.tA, t.tB)) },
      ]);
  }
  belt('belt-open', 'Open Belt: External Tangents to Two Circles', false);
  belt('belt-crossed', 'Crossed Belt: Internal Tangents to Two Circles', true);

  // ── Ellipse: rectangle method ──
  (function () {
    const c = [100, 95], a = 70, b = 40, n = 5;
    const div = k => Array.from({ length: n + 1 }, (_, i) => i / n * k);
    // P(k) on half-side AD, k/n up from A; R2(k) on OA, k/n in from A. Line C-P(k) meets line E-R2(k) on the ellipse.
    const Ctop = [c[0], c[1] - b], Ebot = [c[0], c[1] + b];
    const Q = [];
    div(1).forEach((t, i) => {
      if (i === 0 || i === n) return;
      const P = [c[0] + a, c[1] - b * t];
      const R2 = [c[0] + a * (1 - t), c[1]];
      Q.push({ P, R2, X: lineX(Ctop, P, Ebot, R2) });
    });
    const quarter = [[c[0], c[1] - b], ...Q.map(q => q.X).reverse(), [c[0] + a, c[1]]];   // top of the minor axis round to A
    make('ellipse-rectangle', 'Ellipse: Rectangle Method',
      'Divide the half-side and half-length of the enclosing rectangle into the same number of parts; lines from the ends of the axes cross on the ellipse.',
      'Construct an ellipse with a major axis of 140 mm and a minor axis of 80 mm by the rectangle method. Show the construction for one quarter, then complete the curve.',
      [
        { instruction: 'Draw the major axis (140) and minor axis (80) crossing at the centre, and the rectangle round them.', calloutAt: c,
          reveals: [L([c[0] - a - 5, c[1]], [c[0] + a + 5, c[1]], 'centre'), L([c[0], c[1] - b - 5], [c[0], c[1] + b + 5], 'centre'), { kind: 'polygon', points: [[c[0] - a, c[1] - b], [c[0] + a, c[1] - b], [c[0] + a, c[1] + b], [c[0] - a, c[1] + b]], lineType: 'construction' }] },
        { instruction: 'Divide AD (half the short side, from A at the end of the major axis up to the corner D) and OA (half the major axis) into ' + n + ' equal parts each. Number both from A.', calloutAt: [c[0] + a, c[1] - b / 2],
          reveals: Q.flatMap(q => [pt(q.P), pt(q.R2)]) },
        { instruction: 'Join the points on AD to C, the top end of the minor axis. From E, the bottom end, draw lines through the points on OA and extend them upwards.', calloutAt: [c[0] + a / 2, c[1] - b / 2],
          reveals: Q.flatMap(q => [L(Ctop, q.P, 'construction'), L(Ebot, q.X, 'construction')]) },
        { instruction: 'Lines with the same number cross on the ellipse. Mark the points, then repeat for the other three quarters.', calloutAt: Q[1].X, reveals: Q.map(q => pt(q.X)) },
        { instruction: 'Draw a smooth curve through all the points.', calloutAt: [c[0], c[1] - b], reveals: [{ kind: 'polyline', points: Array.from({ length: 97 }, (_, i) => [c[0] + a * Math.cos(i * Math.PI / 48), c[1] + b * Math.sin(i * Math.PI / 48)]), lineType: 'A' }] },
      ]);
  })();

  // ── Angles of 60°, 30°, 90° and 45° by compass ──
  (function () {
    const V = [40, 150], R = 50, X = [190, 150];
    const P60 = add(V, [R * Math.cos(Math.PI / 3), -R * Math.sin(Math.PI / 3)]), A = add(V, [R, 0]);
    const B30 = add(V, mul(unit(sub(mul(add(A, P60), 0.5), V)), R));
    const P120 = add(V, [R * Math.cos(2 * Math.PI / 3), -R * Math.sin(2 * Math.PI / 3)]);
    const U90 = add(V, [0, -R]);
    const H45 = add(V, mul(unit([1, -1]), R));
    make('angles-by-compass', 'Angles of 60°, 30°, 90° and 45° by Compass',
      'Every set-square angle can be made with a compass: 60° from an equilateral triangle, 30° by bisecting it, 90° from two 60° steps bisected, and 45° by bisecting 90°.',
      'From point V on line VX, construct angles of 60°, 30°, 90° and 45° with compass and ruler only. Show all construction.',
      [
        { instruction: 'Draw line VX. With centre V and radius 50, draw a large arc cutting VX at A.', calloutAt: A, reveals: [L(V, X), pt(V, 'V'), arcS(V, R, -135, 0), pt(A, 'A')] },
        { instruction: '60°: with centre A and the same radius, cut the arc at B. VB is at 60° to VX.', calloutAt: P60, reveals: [swing(A, R, P60, 10), pt(P60, 'B'), L(V, ext(V, P60, 25)), lbl(add(V, mul(unit(sub(P60, V)), R + 32)), '60°', { size: 3 })] },
        { instruction: '30°: bisect the angle AVB (equal arcs from A and B). The bisector is at 30°.', calloutAt: B30, reveals: [L(V, ext(V, B30, 40)), lbl(add(V, mul(unit(sub(B30, V)), R + 46)), '30°', { size: 3 })] },
        { instruction: '90°: from B step the radius again to C (120°), then bisect angle BVC. The bisector is at 90°.', calloutAt: U90, reveals: [swing(P60, R, P120, 10), pt(P120, 'C'), L(V, ext(V, U90, 25)), lbl(add(V, [0, -R - 30]), '90°', { size: 3 })] },
        { instruction: '45°: bisect the 90° angle (between VX and the vertical).', calloutAt: H45, reveals: [L(V, ext(V, H45, 35)), lbl(add(V, mul(unit([1, -1]), R + 40)), '45°', { size: 3 })] },
      ]);
  })();

  // ── Divide a circle into twelve equal parts ──
  (function () {
    const O = [100, 95], R = 55;
    const P = Array.from({ length: 12 }, (_, i) => add(O, [R * Math.cos(i * Math.PI / 6), -R * Math.sin(i * Math.PI / 6)]));
    const ends = [0, 3, 6, 9];
    make('circle-twelve-parts', 'Divide a Circle into Twelve Equal Parts',
      'The radius steps round a circle six times; from the four ends of two diameters, each step lands on a 30° division: twelve parts with the compass only (used for helices and cams).',
      'Divide a circle of radius 55 mm into twelve equal parts with the compass. Number the points 0 to 11.',
      [
        { instruction: 'Draw the circle and two diameters at right angles.', calloutAt: O, reveals: [circle(O, R), L([O[0] - R - 6, O[1]], [O[0] + R + 6, O[1]], 'centre'), L([O[0], O[1] - R - 6], [O[0], O[1] + R + 6], 'centre')] },
        { instruction: 'With radius 55 and each of the four ends of the diameters as centre, cut the circle on both sides.', calloutAt: P[1], reveals: ends.flatMap(i => [swing(P[i], R, P[(i + 2) % 12], 6), swing(P[i], R, P[(i + 10) % 12], 6)]) },
        { instruction: 'The cuts and the four ends give twelve equal divisions of 30°. Number them 0 to 11 and draw radial lines.', calloutAt: P[2],
          reveals: [...P.map((p, i) => L(O, p, 'construction')), ...P.map((p, i) => lbl(add(O, mul(unit(sub(p, O)), R + 6)), String(i), { size: 2.8 }))] },
      ]);
  })();
})(window);
