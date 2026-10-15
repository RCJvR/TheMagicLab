// Geometric Constructions: more Gr 10 exercises (parallels, perpendiculars, triangle circles,
// the general polygon method and tangent arcs). Runs after geometric-constructions.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3.6, anchor: 'middle', color: '#fde047' }, opts || {});
  const pt = (at, label) => ({ kind: 'point', at, label });
  const circle = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const unit = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const ang = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]) * 180 / Math.PI;     // screen degrees
  const mod = a => ((a % 360) + 360) % 360;
  const arcS = (c, r, a0, a1, lt) => ({ kind: 'arc-construction', center: c, r, startDeg: a0, endDeg: a1, lineType: lt || 'construction' });
  // the arc of circle (c, r) from p to q that passes near m
  const arcVia = (c, r, p, q, m, lt) => {
    const ap = ang(c, p), aq = ang(c, q), am = ang(c, m);
    return mod(am - ap) < mod(aq - ap) ? arcS(c, r, ap, ap + mod(aq - ap), lt) : arcS(c, r, aq, aq + mod(ap - aq), lt);
  };
  // a short construction arc of circle (c, r) centred on the direction of p
  const swing = (c, r, p, half) => { const a = ang(c, p); return arcS(c, r, a - (half || 12), a + (half || 12)); };
  // circle-circle intersections
  const cc = (c1, r1, c2, r2) => {
    const d = dist(c1, c2), a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    const u = unit(sub(c2, c1)), m = add(c1, mul(u, a));
    return [add(m, [-u[1] * h, u[0] * h]), add(m, [u[1] * h, -u[0] * h])];
  };
  const upper = ps => ps[0][1] < ps[1][1] ? ps[0] : ps[1], lower = ps => ps[0][1] > ps[1][1] ? ps[0] : ps[1];
  const foot = (p, a, b) => { const u = unit(sub(b, a)), t = (p[0] - a[0]) * u[0] + (p[1] - a[1]) * u[1]; return add(a, mul(u, t)); };
  const lineX = (p, q, r, s) => {   // intersection of lines pq and rs
    const d = (p[0] - q[0]) * (r[1] - s[1]) - (p[1] - q[1]) * (r[0] - s[0]);
    const t = ((p[0] - r[0]) * (r[1] - s[1]) - (p[1] - r[1]) * (r[0] - s[0])) / d;
    return add(p, mul(sub(q, p), t));
  };
  const ext = (a, b, k) => add(b, mul(unit(sub(b, a)), k));   // b pushed on along a→b by k

  function add2(id, title, summary, prompt, steps) {
    C[id] = { id, title, summary, workbookPrompt: prompt, bounds: { w: 200, h: 180 }, steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(id);
  }

  // ── Parallel line through a point (rhombus method) ──
  (function () {
    const X = [30, 120], Y = [175, 120], P = [70, 80], R = 50;
    const A = [P[0] + Math.sqrt(R * R - 40 * 40), 120], B = [A[0] + R, 120];
    const Q = add(P, sub(B, A));
    add2('parallel-through-point', 'Parallel Line Through a Point',
      'Draw a line through a given point, parallel to a given line, with compass and straightedge only: the four equal sides of a rhombus keep the opposite sides parallel.',
      'Given line XY and point P, 40 mm above it. Construct a line through P parallel to XY. Show all construction.',
      [
        { instruction: 'Draw the given line XY and mark point P, 40 mm above it.', calloutAt: P, reveals: [L(X, Y), pt(P, 'P'), lbl([X[0] - 4, X[1] + 1], 'X'), lbl([Y[0] + 4, Y[1] + 1], 'Y')] },
        { instruction: 'With P as centre and a radius of ' + R + ' mm, draw an arc that cuts XY at A.', calloutAt: A, reveals: [swing(P, R, A, 14), pt(A, 'A')] },
        { instruction: 'With A as centre and the same radius, draw an arc through P that cuts XY again at B.', calloutAt: B, reveals: [arcVia(A, R, B, P, [A[0] + R * 0.7, A[1] - R * 0.7]), pt(B, 'B')] },
        { instruction: 'With the same radius, draw arcs from P and from B. They cross at Q. (PABQ is a rhombus: all four sides are ' + R + ' mm.)', calloutAt: Q, reveals: [swing(P, R, Q, 10), swing(B, R, Q, 10), pt(Q, 'Q')] },
        { instruction: 'Draw a line through P and Q, extended both ways: it is parallel to XY.', calloutAt: ext(Q, P, 6), reveals: [L(ext(Q, P, 30), ext(P, Q, 30))] },
      ]);
  })();

  // ── Perpendicular from a point to a line ──
  (function () {
    const X = [30, 110], Y = [175, 110], P = [95, 60], R = 62;
    const dx = Math.sqrt(R * R - 50 * 50), A = [P[0] - dx, 110], B = [P[0] + dx, 110];
    const Q = [P[0], 110 + 40], N = [P[0], 110], r2 = dist(A, Q);
    add2('perpendicular-from-point', 'Perpendicular From a Point to a Line',
      'Drop a perpendicular from a point to a line: the point and the meeting point of two equal arcs both lie on the perpendicular bisector of AB.',
      'Given line XY and point P, 50 mm above it. Construct the perpendicular from P to XY and label its foot N. Show all construction.',
      [
        { instruction: 'Draw line XY and mark point P, 50 mm above it.', calloutAt: P, reveals: [L(X, Y), pt(P, 'P'), lbl([X[0] - 4, X[1] + 1], 'X'), lbl([Y[0] + 4, Y[1] + 1], 'Y')] },
        { instruction: 'With P as centre, draw an arc that cuts XY at A and B.', calloutAt: B, reveals: [arcVia(P, R, A, B, [P[0], P[1] + R]), pt(A, 'A'), pt(B, 'B')] },
        { instruction: 'With A and B as centres and the same radius (more than half of AB), draw two arcs below XY that cross at Q.', calloutAt: Q, reveals: [swing(A, r2, Q, 12), swing(B, r2, Q, 12), pt(Q, 'Q')] },
        { instruction: 'Join P to Q. Where it crosses XY is N, the foot of the perpendicular. Mark the right angle.', calloutAt: N,
          reveals: [L(P, Q, 'construction'), L(P, N), pt(N, 'N'), { kind: 'right-angle-marker', at: N, size: 4 }] },
      ]);
  })();

  // ── Inscribed circle of a triangle ──
  (function () {
    const A = [40, 140], B = [160, 140], Cc = [75, 50];
    const a = dist(B, Cc), b = dist(A, Cc), c = dist(A, B);
    const I = [(a * A[0] + b * B[0] + c * Cc[0]) / (a + b + c), (a * A[1] + b * B[1] + c * Cc[1]) / (a + b + c)];
    const F = foot(I, A, B), r = dist(I, F);
    const bis = (V, P1, P2, rr) => {
      const p = add(V, mul(unit(sub(P1, V)), rr)), q = add(V, mul(unit(sub(P2, V)), rr));
      const m = add(V, mul(unit(add(unit(sub(P1, V)), unit(sub(P2, V)))), rr * 1.6));
      return { p, q, m, arcs: [arcVia(V, rr, p, q, add(V, mul(unit(add(sub(p, V), sub(q, V))), rr))), swing(p, dist(p, m), m, 10), swing(q, dist(q, m), m, 10)] };
    };
    const bA = bis(A, B, Cc, 22), bB = bis(B, A, Cc, 22);
    add2('triangle-inscribed-circle', 'Inscribed Circle of a Triangle',
      'The centre of the inscribed circle is where the angle bisectors meet: it is the same distance from all three sides.',
      'Draw triangle ABC (AB = 120 mm, the other corners as shown) and construct its inscribed circle. Show all construction.',
      [
        { instruction: 'Draw triangle ABC.', calloutAt: Cc, reveals: [{ kind: 'polygon', points: [A, B, Cc], lineType: 'A' }, lbl([A[0] - 4, A[1] + 3], 'A'), lbl([B[0] + 4, B[1] + 3], 'B'), lbl([Cc[0], Cc[1] - 4], 'C')] },
        { instruction: 'Bisect angle A: an arc from A cutting both sides, then two equal arcs from those points that cross inside the angle.', calloutAt: bA.m, reveals: bA.arcs },
        { instruction: 'Draw the bisector of angle A from A through the crossing.', calloutAt: bA.m, reveals: [L(A, ext(A, I, 20), 'construction')] },
        { instruction: 'Bisect angle B the same way.', calloutAt: bB.m, reveals: [...bB.arcs, L(B, ext(B, I, 20), 'construction')] },
        { instruction: 'The bisectors cross at I, the centre of the inscribed circle. From I, construct a perpendicular to AB (or measure square to it) to find the radius IF.', calloutAt: I, reveals: [pt(I, 'I'), L(I, F, 'construction'), pt(F, 'F')] },
        { instruction: 'With centre I and radius IF, draw the circle. It touches all three sides.', calloutAt: [I[0], I[1] - r], reveals: [circle(I, r)] },
      ]);
  })();

  // ── Circumscribed circle of a triangle ──
  (function () {
    const A = [50, 140], B = [150, 140], Cc = [120, 70];
    const pb = (P, Q) => { const M = mul(add(P, Q), 0.5), d = dist(P, Q), r = d * 0.7, h = Math.sqrt(r * r - d * d / 4), n = unit([-(Q[1] - P[1]), Q[0] - P[0]]); return { M, r, s: add(M, mul(n, h)), t: add(M, mul(n, -h)) }; };
    const p1 = pb(A, B), p2 = pb(B, Cc);
    const O = lineX(p1.s, p1.t, p2.s, p2.t), R = dist(O, A);
    add2('triangle-circumscribed-circle', 'Circumscribed Circle of a Triangle',
      'The centre of the circle through all three corners is where the perpendicular bisectors of the sides meet.',
      'Draw triangle ABC as shown and construct the circle that passes through all three corners. Show all construction.',
      [
        { instruction: 'Draw triangle ABC.', calloutAt: Cc, reveals: [{ kind: 'polygon', points: [A, B, Cc], lineType: 'A' }, lbl([A[0] - 4, A[1] + 3], 'A'), lbl([B[0] + 4, B[1] + 3], 'B'), lbl([Cc[0], Cc[1] - 4], 'C')] },
        { instruction: 'Bisect side AB: equal arcs from A and B, more than half of AB, crossing above and below it.', calloutAt: p1.t, reveals: [swing(A, p1.r, p1.s, 10), swing(A, p1.r, p1.t, 10), swing(B, p1.r, p1.s, 10), swing(B, p1.r, p1.t, 10)] },
        { instruction: 'Draw the perpendicular bisector of AB through the two crossings.', calloutAt: p1.s, reveals: [L(ext(p1.s, p1.t, 6), ext(p1.t, p1.s, 6), 'construction')] },
        { instruction: 'Bisect side BC the same way.', calloutAt: p2.s, reveals: [swing(B, p2.r, p2.s, 10), swing(B, p2.r, p2.t, 10), swing(Cc, p2.r, p2.s, 10), swing(Cc, p2.r, p2.t, 10), L(ext(p2.s, p2.t, 6), ext(p2.t, p2.s, 6), 'construction')] },
        { instruction: 'The bisectors cross at O. With centre O and radius OA, draw the circle: it passes through A, B and C.', calloutAt: O, reveals: [pt(O, 'O'), circle(O, R)] },
      ]);
  })();

  // ── Regular polygon on a given side: general method (heptagon) ──
  (function () {
    const n = 7, s = 36, A = [90, 150], B = [A[0] + s, 150], Bp = [A[0] - s, 150];
    const phi = 180 / n;
    const D = k => [A[0] - s * Math.cos(Math.PI * k / n), 150 - s * Math.sin(Math.PI * k / n)];   // division k from B'
    const V = Array.from({ length: n }, (_, k) => { const a = (k * 360 / n) * Math.PI / 180; return k === 0 ? A : null; });
    // vertices anticlockwise from A: A, B, then on
    const verts = [A, B]; let dir = 0;
    for (let k = 2; k < n; k++) { dir += 360 / n; const p = verts[k - 1]; verts.push([p[0] + s * Math.cos(dir * Math.PI / 180), p[1] - s * Math.sin(dir * Math.PI / 180)]); }
    void V;
    add2('polygon-general-method', 'Regular Heptagon on a Given Side (General Method)',
      'The general method for any regular polygon on a given side: divide a semicircle into as many parts as the polygon has sides, and the lines from A through the divisions carry the corners.',
      'Construct a regular heptagon (7 sides) on side AB = 36 mm using the general (semicircle) method. Show all construction.',
      [
        { instruction: 'Draw side AB, 36 mm, and extend it to the left of A.', calloutAt: B, reveals: [L(A, B), L(ext(B, A, s + 6), A, 'construction'), lbl([A[0], A[1] + 5], 'A'), lbl([B[0], B[1] + 5], 'B')] },
        { instruction: 'With centre A and radius AB, draw a semicircle from the extension (B\') over to B.', calloutAt: D(3), reveals: [arcS(A, s, 180, 360), lbl([Bp[0] - 2, Bp[1] + 5], 'B\'', { size: 3 })] },
        { instruction: 'Divide the semicircle into 7 equal parts (each ' + phi.toFixed(1) + '°, by trial with dividers or with a protractor). Number them 1 to 7 from B\'.', calloutAt: D(1),
          reveals: Array.from({ length: n - 1 }, (_, i) => i + 1).flatMap(k => [pt(D(k)), lbl(add(A, mul(unit(sub(D(k), A)), s + 5)), String(k), { size: 2.8, color: '#eab308' })]) },
        { instruction: 'Join A to point 2: this is the second side of the heptagon (the exterior angle is 2 × ' + phi.toFixed(1) + '°).', calloutAt: D(2), reveals: [L(A, D(2))] },
        { instruction: 'Draw thin lines from A through points 3, 4, 5 and 6, and extend them well beyond the semicircle.', calloutAt: D(4), reveals: [3, 4, 5, 6].map(k => L(A, add(A, mul(unit(sub(D(k), A)), s * 2.4)), 'construction')) },
        { instruction: 'With centre B and radius AB, cut the line through 6. With the new point as centre, cut the line through 5, and so on round the polygon.', calloutAt: verts[2], reveals: verts.slice(2, n - 1).map((v, i) => swing(verts[i + 1], s, v, 10)) },
        { instruction: 'Join the corners to complete the heptagon.', calloutAt: verts[3], reveals: [{ kind: 'polygon', points: verts, lineType: 'A' }] },
      ]);
  })();

  // ── Arc through a point, tangent to a circle ──
  (function () {
    const Cc = [130, 100], r = 22, P = [55, 75], R = 30;
    const O = upper(cc(P, R, Cc, r + R)), T = add(Cc, mul(unit(sub(O, Cc)), r));
    add2('arc-point-circle', 'Tangent Arc Through a Point to a Circle',
      'An arc of given radius through a point, touching a circle: its centre is R from the point and R + r from the circle\'s centre.',
      'Given a circle (radius 22 mm) and point P. Construct an arc of radius 30 mm that passes through P and touches the circle on the outside. Show all construction.',
      [
        { instruction: 'Draw the given circle (radius ' + r + ') with its centre lines, and mark point P.', calloutAt: P, reveals: [circle(Cc, r), L([Cc[0] - r - 5, Cc[1]], [Cc[0] + r + 5, Cc[1]], 'centre'), L([Cc[0], Cc[1] - r - 5], [Cc[0], Cc[1] + r + 5], 'centre'), pt(P, 'P')] },
        { instruction: 'The centre of the arc is ' + R + ' mm from P: with centre P, draw an arc of radius ' + R + '.', calloutAt: O, reveals: [swing(P, R, O, 30)] },
        { instruction: 'It is also ' + (r + R) + ' mm (' + r + ' + ' + R + ') from the circle\'s centre: draw an arc of that radius. The arcs cross at O.', calloutAt: O, reveals: [swing(Cc, r + R, O, 25), pt(O, 'O')] },
        { instruction: 'Join O to the circle\'s centre. Where the line crosses the circle is the tangent point T.', calloutAt: T, reveals: [L(O, Cc, 'construction'), pt(T, 'T')] },
        { instruction: 'With centre O and radius ' + R + ', draw the arc from P to T.', calloutAt: add(O, mul(unit(sub(mul(add(P, T), 0.5), O)), R)), reveals: [arcVia(O, R, P, T, add(O, mul(unit(sub(mul(add(P, T), 0.5), O)), R)), 'A')] },
      ]);
  })();

  // ── Arc tangent to two circles: outside (excluding) and enclosing ──
  function twoCircles(id, title, enclose) {
    const C1 = [60, 110], r1 = 18, C2 = [150, 110], r2 = 26, R = enclose ? 85 : 40;
    const O = enclose ? lower(cc(C1, R - r1, C2, R - r2)) : upper(cc(C1, R + r1, C2, R + r2));
    const T1 = enclose ? add(O, mul(unit(sub(C1, O)), R)) : add(C1, mul(unit(sub(O, C1)), r1));
    const T2 = enclose ? add(O, mul(unit(sub(C2, O)), R)) : add(C2, mul(unit(sub(O, C2)), r2));
    const mid = add(O, mul(unit(sub(mul(add(T1, T2), 0.5), O)), R));
    const rad1 = enclose ? R - r1 : R + r1, rad2 = enclose ? R - r2 : R + r2;
    const how = enclose ? 'R − r' : 'R + r';
    add2(id, title,
      enclose ? 'An arc that encloses both circles: its centre is R − r from each circle\'s centre, and the tangent points lie on the lines from the arc centre through the circle centres, extended.'
        : 'An arc that touches two circles on the outside: its centre is R + r from each circle\'s centre, and the tangent points lie on the lines joining the centres.',
      'Given two circles, radius ' + r1 + ' and ' + r2 + ' mm, 90 mm apart. Construct an arc of radius ' + R + ' mm that touches both circles ' + (enclose ? 'and encloses them' : 'on the outside') + '. Show all construction.',
      [
        { instruction: 'Draw the two circles with their centre lines.', calloutAt: C1, reveals: [circle(C1, r1), circle(C2, r2), L([C1[0] - r1 - 5, 110], [C2[0] + r2 + 5, 110], 'centre'), L([C1[0], 110 - r1 - 5], [C1[0], 110 + r1 + 5], 'centre'), L([C2[0], 110 - r2 - 5], [C2[0], 110 + r2 + 5], 'centre')] },
        { instruction: 'From the left centre, draw an arc of radius ' + rad1 + ' mm (' + how + ' = ' + R + (enclose ? ' − ' : ' + ') + r1 + ').', calloutAt: O, reveals: [swing(C1, rad1, O, 18)] },
        { instruction: 'From the right centre, draw an arc of radius ' + rad2 + ' mm (' + R + (enclose ? ' − ' : ' + ') + r2 + '). The arcs cross at O, the centre of the tangent arc.', calloutAt: O, reveals: [swing(C2, rad2, O, 18), pt(O, 'O')] },
        { instruction: enclose ? 'Draw lines from O through each circle centre and extend them to cut the circles at T1 and T2: the tangent points.' : 'Join O to each circle centre. The lines cut the circles at T1 and T2: the tangent points.',
          calloutAt: T1, reveals: [L(O, enclose ? ext(O, C1, r1) : C1, 'construction'), L(O, enclose ? ext(O, C2, r2) : C2, 'construction'), pt(T1, 'T1'), pt(T2, 'T2')] },
        { instruction: 'With centre O and radius ' + R + ', draw the arc from T1 to T2.', calloutAt: mid, reveals: [arcVia(O, R, T1, T2, mid, 'A')] },
      ]);
  }
  twoCircles('arc-two-circles-outside', 'Tangent Arc Outside Two Circles', false);
  twoCircles('arc-two-circles-enclosing', 'Tangent Arc Enclosing Two Circles', true);

  // ── Arc tangent to two lines meeting at an angle ──
  (function () {
    const V = [50, 140], a = 55 * Math.PI / 180, R = 24;
    const P1 = [175, 140], P2 = [V[0] + 125 * Math.cos(a), 140 - 125 * Math.sin(a)];
    const u1 = [1, 0], u2 = unit(sub(P2, V));
    const q1 = add(V, [0, -R]);                               // R inside the bottom line
    const o2a = add(V, mul([-u2[1], u2[0]], R));              // R inside the sloping line
    const O = lineX(q1, add(q1, u1), o2a, add(o2a, u2));
    const T1 = foot(O, V, P1), T2 = foot(O, V, P2);
    const mid = add(O, mul(unit(sub(V, O)), R));
    add2('arc-two-lines', 'Tangent Arc Between Two Lines',
      'Round off the corner between two lines with an arc of given radius: the centre is R from both lines, so it lies where two parallels, each R away, cross.',
      'Two lines meet at 55°. Join them with an arc of radius 24 mm. Show all construction and the tangent points.',
      [
        { instruction: 'Draw the two lines meeting at 55°.', calloutAt: V, reveals: [L(V, P1, 'construction'), L(V, P2, 'construction'), { kind: 'angle-arc', vertex: V, p1: P2, p2: P1, radius: 14, text: '55°' }] },
        { instruction: 'Draw a thin line parallel to the bottom line, ' + R + ' mm inside the angle.', calloutAt: add(q1, [60, 0]), reveals: [L(add(q1, mul(u1, 10)), add(q1, mul(u1, 110)), 'construction')] },
        { instruction: 'Draw a thin line parallel to the sloping line, ' + R + ' mm inside the angle. The two parallels cross at O.', calloutAt: O, reveals: [L(add(o2a, mul(u2, 10)), add(o2a, mul(u2, 110)), 'construction'), pt(O, 'O')] },
        { instruction: 'From O, drop perpendiculars to both lines: the feet T1 and T2 are the tangent points.', calloutAt: T1, reveals: [L(O, T1, 'construction'), L(O, T2, 'construction'), pt(T1, 'T1'), pt(T2, 'T2')] },
        { instruction: 'With centre O and radius ' + R + ', draw the arc from T1 to T2, then line in the two straight parts up to the tangent points.', calloutAt: mid, reveals: [arcVia(O, R, T1, T2, mid, 'A'), L(T1, P1), L(T2, P2)] },
      ]);
  })();

  // ── Arc tangent to a line and a circle ──
  (function () {
    const X = [25, 140], Y = [180, 140], Cc = [125, 80], r = 20, R = 26;
    const yl = 140 - R;
    // centre on y = yl, distance r + R from Cc, on the left
    const dx = Math.sqrt((r + R) * (r + R) - (yl - Cc[1]) * (yl - Cc[1])), O = [Cc[0] - dx, yl];
    const T1 = [O[0], 140], T2 = add(Cc, mul(unit(sub(O, Cc)), r));
    const mid = add(O, mul(unit(sub(mul(add(T1, T2), 0.5), O)), R));
    add2('arc-line-circle', 'Tangent Arc to a Line and a Circle',
      'An arc touching a straight line and a circle: its centre is on a parallel R from the line and on an arc R + r from the circle\'s centre.',
      'Given line XY and a circle of radius 20 mm. Construct an arc of radius 26 mm that touches both, on the left of the circle. Show all construction.',
      [
        { instruction: 'Draw line XY and the circle with its centre lines.', calloutAt: Cc, reveals: [L(X, Y), circle(Cc, r), L([Cc[0] - r - 5, Cc[1]], [Cc[0] + r + 5, Cc[1]], 'centre'), L([Cc[0], Cc[1] - r - 5], [Cc[0], Cc[1] + r + 5], 'centre'), lbl([X[0] - 4, X[1] + 1], 'X'), lbl([Y[0] + 4, Y[1] + 1], 'Y')] },
        { instruction: 'Draw a thin line parallel to XY, ' + R + ' mm above it.', calloutAt: [60, yl], reveals: [L([30, yl], [150, yl], 'construction')] },
        { instruction: 'With the circle\'s centre, draw an arc of radius ' + (r + R) + ' mm (' + r + ' + ' + R + ') to cut the parallel at O.', calloutAt: O, reveals: [swing(Cc, r + R, O, 20), pt(O, 'O')] },
        { instruction: 'Drop a perpendicular from O to XY for T1, and join O to the circle\'s centre for T2.', calloutAt: T1, reveals: [L(O, T1, 'construction'), L(O, Cc, 'construction'), pt(T1, 'T1'), pt(T2, 'T2')] },
        { instruction: 'With centre O and radius ' + R + ', draw the arc from T1 to T2.', calloutAt: mid, reveals: [arcVia(O, R, T1, T2, mid, 'A')] },
      ]);
  })();

  // ── Copy a figure: a lever with an external tangent and a tangent arc ──
  (function () {
    const A = [55, 100], RA = 24, B = [165, 100], RB = 15;
    // upper external tangent
    const d = dist(A, B), th = Math.acos((RA - RB) / d), u = unit(sub(B, A));
    const rot = (v, t) => [v[0] * Math.cos(t) - v[1] * Math.sin(t), v[0] * Math.sin(t) + v[1] * Math.cos(t)];
    const nU = rot(u, -th);                          // towards the top (screen y up is negative)
    const TA = add(A, mul(nU, RA)), TB = add(B, mul(nU, RB));
    const K = add(A, mul(nU, RA - RB));               // point on the construction circle
    // lower concave arc, radius 70, outside both circles
    const R = 70, O = lower(cc(A, R + RA, B, R + RB));
    const SA = add(A, mul(unit(sub(O, A)), RA)), SB = add(B, mul(unit(sub(O, B)), RB));
    const midL = add(O, mul(unit(sub(mul(add(SA, SB), 0.5), O)), R));
    const M = mul(add(A, B), 0.5);
    add2('figure-lever', 'Copy a Figure: Lever with Tangents',
      'An original lever outline that combines two constructions: an external tangent line between two bosses, and a concave tangent arc underneath them.',
      'Copy the lever to scale 1:1: bosses R24 and R15 at 110 mm centres, holes Ø24 and Ø14, a straight tangent along the top and an R70 tangent arc underneath. Show all construction.',
      [
        { instruction: 'Draw the centre lines and the two boss circles, R' + RA + ' and R' + RB + ', 110 mm apart.', calloutAt: A,
          reveals: [L([A[0] - RA - 6, 100], [B[0] + RB + 6, 100], 'centre'), L([A[0], 100 - RA - 6], [A[0], 100 + RA + 6], 'centre'), L([B[0], 100 - RB - 6], [B[0], 100 + RB + 6], 'centre'), circle(A, RA, 'construction'), circle(B, RB, 'construction')] },
        { instruction: 'TOP TANGENT: with centre A, draw a thin circle of radius ' + (RA - RB) + ' mm (the difference of the radii).', calloutAt: K, reveals: [circle(A, RA - RB, 'construction')] },
        { instruction: 'Bisect AB and draw a semicircle on it from the midpoint. It cuts the small circle at K (AK is square to BK).', calloutAt: K, reveals: [pt(M), arcVia(M, d / 2, A, B, [M[0], M[1] - d / 2]), pt(K, 'K')] },
        { instruction: 'Draw a line from A through K to the large circle: TA. Draw a parallel line from B to the small circle: TB. Join TA to TB.', calloutAt: TA, reveals: [L(A, TA, 'construction'), L(B, TB, 'construction'), pt(TA, 'TA'), pt(TB, 'TB'), L(TA, TB)] },
        { instruction: 'BOTTOM ARC (R' + R + '): from A draw an arc of radius ' + (R + RA) + ' (' + R + ' + ' + RA + '), and from B one of radius ' + (R + RB) + '. They cross at O, below the lever.', calloutAt: O, reveals: [swing(A, R + RA, O, 12), swing(B, R + RB, O, 12), pt(O, 'O')] },
        { instruction: 'Join O to A and to B to find the tangent points SA and SB, then draw the R' + R + ' arc between them.', calloutAt: midL, reveals: [L(O, A, 'construction'), L(O, B, 'construction'), pt(SA), pt(SB), arcVia(O, R, SA, SB, midL, 'A')] },
        { instruction: 'Line in the outside of each boss between its tangent points, and draw the holes Ø24 and Ø14.', calloutAt: [A[0] - RA, 100],
          reveals: [arcVia(A, RA, TA, SA, [A[0] - RA, 100], 'A'), arcVia(B, RB, TB, SB, [B[0] + RB, 100], 'A'), circle(A, 12), circle(B, 7)] },
      ]);
  })();
})(window);
