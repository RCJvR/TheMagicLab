// Descriptive geometry (Gr 10): lines in space given by their end points (height above the HP and
// distance in front of the VP), and applied true-length problems. 1st angle, rotation method:
// a, b in the front view; a1, b1 in the top view. Runs after descriptive-more.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' };
  const pt = (at, label) => ({ kind: 'point', at, label });
  const deg = r => r * 180 / Math.PI;
  const ang = (c, p) => deg(Math.atan2(p[1] - c[1], p[0] - c[0]));
  // the short arc from the direction of p to screen angle target, centred on c
  const swing = (c, p, target) => {
    const a0 = ang(c, p), r = Math.hypot(p[0] - c[0], p[1] - c[1]);
    const d = ((target - a0 + 540) % 360) - 180, s = d > 0 ? a0 : a0 + d;
    return { kind: 'arc-construction', center: c, r, startDeg: s, endDeg: s + Math.abs(d), lineType: 'construction' };
  };
  const angArc = (v, p1, p2, r, t) => ({ kind: 'angle-arc', vertex: v, p1, p2, radius: r, text: t });

  // cfg: id, title, A { x, h, v }, B { x, h, v } (mm: along XY, above the HP, in front of the VP),
  //      name (e.g. 'line AB'), context (sentence for the GIVEN step), summary
  function lineTL(cfg) {
    const A = cfg.A, B = cfg.B, X0 = 30, XY = 30 + Math.max(A.h, B.h) + 14;
    const F = p => [X0 + p.x, XY - p.h], T = p => [X0 + p.x, XY + p.v];
    const a = F(A), b = F(B), a1 = T(A), b1 = T(B);
    const sg = B.x >= A.x ? 1 : -1;
    const plan = Math.hypot(B.x - A.x, B.v - A.v), elev = Math.hypot(B.x - A.x, B.h - A.h);
    const TL = Math.hypot(B.x - A.x, B.v - A.v, B.h - A.h);
    const theta = deg(Math.atan2(Math.abs(B.h - A.h), plan)), phi = deg(Math.atan2(Math.abs(B.v - A.v), elev));
    const b1r = [a1[0] + sg * plan, a1[1]], bR = [b1r[0], b[1]];
    const bF = [a[0] + sg * elev, a[1]], bT = [bF[0], b1[1]];
    const xMax = Math.max(A.x, B.x, A.x + sg * plan, A.x + sg * elev), right = X0 + xMax + 18;
    const high = B.h >= A.h;                      // which end is higher decides where θ opens
    const thetaArc = sg > 0 ? (high ? angArc(a, bR, [a[0] + 12, a[1]], 9, 'θ') : angArc(a, [a[0] + 12, a[1]], bR, 9, 'θ'))
      : (high ? angArc(a, [a[0] - 12, a[1]], bR, 9, 'θ') : angArc(a, bR, [a[0] - 12, a[1]], 9, 'θ'));
    const front = B.v >= A.v;
    const phiArc = sg > 0 ? (front ? angArc(a1, [a1[0] + 12, a1[1]], bT, 9, 'φ') : angArc(a1, bT, [a1[0] + 12, a1[1]], 9, 'φ'))
      : (front ? angArc(a1, bT, [a1[0] - 12, a1[1]], 9, 'φ') : angArc(a1, [a1[0] - 12, a1[1]], bT, 9, 'φ'));
    const nm = cfg.name || 'line AB';
    const steps = [
      { instruction: 'GIVEN: ' + cfg.context + ' Draw the XY line and two projectors ' + Math.abs(B.x - A.x) + ' apart, one for each end.',
        calloutAt: [X0 + A.x, XY], reveals: [L([X0 - 8, XY], [right, XY], 'B'), lbl([X0 - 11, XY + 1], 'X', { anchor: 'end', size: 3.4 }), lbl([right + 3, XY + 1], 'Y', { anchor: 'start', size: 3.4 }),
          L([a[0], a[1] - 4], [a1[0], a1[1] + 4], 'construction'), L([b[0], b[1] - 4], [b1[0], b1[1] + 4], 'construction')] },
      { instruction: 'FRONT VIEW (above XY in 1st angle): mark a ' + A.h + ' above XY and b ' + B.h + ' above XY on their projectors. Join them.', calloutAt: a,
        reveals: [pt(a, 'a'), pt(b, 'b'), Object.assign(L(a, b), { color: '#f87171' })] },
      { instruction: 'TOP VIEW (below XY): mark a1 ' + A.v + ' below XY and b1 ' + B.v + ' below XY (their distances in front of the VP). Join them.', calloutAt: a1,
        reveals: [pt(a1, 'a1'), pt(b1, 'b1'), Object.assign(L(a1, b1), { color: '#f87171' })] },
      { instruction: 'Neither view shows the true length: the line slopes to both planes. In the TOP view, with a1 as centre and radius a1b1, swing b1 round until it is parallel to XY.', calloutAt: b1r,
        reveals: [swing(a1, b1, sg > 0 ? 0 : 180), L(a1, b1r, 'construction'), pt(b1r, "b1'")] },
      { instruction: 'Project b1\' straight up to the height of b (draw a horizontal line through b to meet it): b\'.', calloutAt: bR,
        reveals: [L(b1r, [bR[0], bR[1] - 4], 'construction'), L(b, bR, 'construction'), pt(bR, "b'")] },
      { instruction: 'Join a to b\': the TRUE LENGTH of the ' + nm + '. Its angle with XY is the true inclination to the HP, θ.', calloutAt: [(a[0] + bR[0]) / 2, (a[1] + bR[1]) / 2],
        reveals: [Object.assign(L(a, bR), { color: '#fde047' }), thetaArc, lbl([(a[0] + bR[0]) / 2 - sg * 4, (a[1] + bR[1]) / 2 - 3], 'TL', YEL)] },
      { instruction: 'For the angle with the VP: in the FRONT view, with a as centre and radius ab, swing b until it is parallel to XY: b2.', calloutAt: bF,
        reveals: [swing(a, b, sg > 0 ? 0 : 180), L(a, bF, 'construction'), pt(bF, 'b2')] },
      { instruction: 'Project b2 straight down to the depth of b1 (a horizontal line through b1): b1\'\'.', calloutAt: bT,
        reveals: [L(bF, [bT[0], bT[1] + 4], 'construction'), L(b1, bT, 'construction'), pt(bT, "b1''")] },
      { instruction: 'Join a1 to b1\'\': the true length again (check it), and its angle with XY is the true inclination to the VP, φ.', calloutAt: [(a1[0] + bT[0]) / 2, (a1[1] + bT[1]) / 2],
        reveals: [Object.assign(L(a1, bT), { color: '#fde047' }), phiArc] },
      { instruction: 'Write the answers: the true length, θ and φ.', calloutAt: [right - 40, XY + Math.max(A.v, B.v) + 16],
        reveals: [['ANSWER / ANTWOORD', YEL], ['TL = ' + TL.toFixed(1) + ' mm' + (cfg.scale ? ' (= ' + (TL * cfg.scale / 1000).toFixed(2) + ' m)' : '')], ['θ (HP) = ' + theta.toFixed(1) + '°'], ['φ (VP) = ' + phi.toFixed(1) + '°']]
          .map(([t, c], i) => lbl([right - 70, XY + Math.max(A.v, B.v) + 14 + i * 5.5], t, Object.assign({ anchor: 'start', size: 2.9 }, c || {}))) },
    ];
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'first', printLayout: 'full', summary: cfg.summary,
      workbookPrompt: cfg.context + ' Determine, by the rotation method in 1st angle, the true length of the ' + nm + ' and its true inclinations to the HP and the VP.' + (cfg.scale ? ' Scale 1:' + cfg.scale + '.' : ''),
      steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(cfg.id);
  }

  // Course Drawings page: export the builder and stop before this chapter's own exercises.
  global.DDBuild = Object.assign(global.DDBuild || {}, { lineTL: cfg => { lineTL(cfg); return C[cfg.id]; } });
  if (global.DD_BUILDERS_ONLY) return;

  lineTL({ id: 'dg-line-1', title: 'Line in Space 1: Rising to the Right', A: { x: 20, h: 15, v: 50 }, B: { x: 80, h: 55, v: 20 },
    context: 'Line AB: A is 15 above the HP and 50 in front of the VP; B is 55 above the HP and 20 in front of the VP. The ends are 60 apart along XY.',
    summary: 'A line given by its end points: draw both views from the measurements, then find the true length and both inclinations by rotation.' });
  lineTL({ id: 'dg-line-2', title: 'Line in Space 2: Falling Towards the Front', A: { x: 15, h: 50, v: 15 }, B: { x: 85, h: 20, v: 55 },
    context: 'Line AB: A is 50 above the HP and 15 in front of the VP; B is 20 above the HP and 55 in front of the VP, 70 to the right of A.',
    summary: 'A line that drops as it comes forward: the high end is at the back, so θ opens downwards from a.' });
  lineTL({ id: 'dg-line-3', title: 'Line in Space 3: Steep Line', A: { x: 30, h: 10, v: 30 }, B: { x: 60, h: 65, v: 50 },
    context: 'Line AB: A is 10 above the HP and 30 in front of the VP; B is 65 above the HP and 50 in front of the VP, 30 to the right of A.',
    summary: 'A steep line with ends close together along XY: a large θ and a small φ.' });
  lineTL({ id: 'dg-line-4', title: 'Line in Space 4: Running Back to the Left', A: { x: 90, h: 20, v: 60 }, B: { x: 30, h: 45, v: 15 },
    context: 'Line AB: A is 20 above the HP and 60 in front of the VP; B is 45 above the HP and 15 in front of the VP, 60 to the LEFT of A.',
    summary: 'The second end is to the left of the first, so every swing goes to the left.' });
  lineTL({ id: 'dg-hip-rafter', title: 'Applied: Hip Rafter of a Roof (1:50)', name: 'hip rafter', scale: 50,
    A: { x: 15, h: 0, v: 15 }, B: { x: 75, h: 48, v: 75 },
    context: 'A hip rafter runs from the corner of a wall plate (A) up to the end of the ridge (B). At scale 1:50 it rises 48 mm (2.4 m) and runs 60 mm along XY and 60 mm back from the front wall.',
    summary: 'A hip rafter: it slopes in both views, so the length to cut it is found by rotation. The answer is converted back from 1:50 to metres.' });
  lineTL({ id: 'dg-stay-wire', title: 'Applied: Stay Wire of a Mast (1:100)', name: 'stay wire', scale: 100,
    A: { x: 20, h: 0, v: 60 }, B: { x: 70, h: 70, v: 20 },
    context: 'A stay wire is anchored in the ground at A and tied to a mast at B, 7 m up (70 mm at 1:100). A is 50 mm to the left of the mast and 40 mm further in front of the VP.',
    summary: 'A stay wire from a ground anchor to a mast: the true length gives the length of wire to order.' });
  lineTL({ id: 'dg-conveyor', title: 'Applied: Inclined Conveyor (1:100)', name: 'conveyor', scale: 100,
    A: { x: 15, h: 10, v: 20 }, B: { x: 95, h: 50, v: 45 },
    context: 'A conveyor runs from a hopper at A (1 m up) to a silo inlet at B (5 m up). At 1:100, B is 80 mm to the right of A and 25 mm further from the VP.',
    summary: 'The true length of a conveyor belt run and its slope θ, which must not be too steep for the load.' });
})(window);
