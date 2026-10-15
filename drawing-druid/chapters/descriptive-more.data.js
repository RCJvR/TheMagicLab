// Descriptive geometry (Gr 10): true length and true inclinations of a sloping edge of a pyramid,
// workbook style. 1st angle: front view above XY, top view below it. Rotation method: the top view
// of the line is swung about a1 until parallel to XY and projected up (true length, angle to the
// HP); the front view is swung about a until parallel to XY and projected down (angle to the VP).
// Runs after descriptive-geometry.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, RED = { color: '#f87171' }, GREY = { color: '#94a3b8' };
  const pt = (at, label) => ({ kind: 'point', at, label });
  const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;

  // cfg: id, title, n (sides), R (base circumradius), a0 (angle of the first corner, degrees),
  //      h (height), b (index of the corner B), name
  function pyramidLine(cfg) {
    const X0 = 30, XY = 30 + cfg.h + 10, D0 = 12 + cfg.R;          // XY line; base centre lies D0 in front of the VP
    const cx = X0 + cfg.R + 10;
    const base = Array.from({ length: cfg.n }, (_, k) => { const a = rad(cfg.a0 + 360 * k / cfg.n); return [cfg.R * Math.cos(a), -cfg.R * Math.sin(a)]; });   // (x, depth offset): +depth = further in front
    const F = (x, z) => [cx + x, XY - z];                            // front view
    const T = (x, d) => [cx + x, XY + D0 + d];                       // top view (1st angle: below XY)
    const A = { x: 0, d: 0, z: cfg.h }, Bc = base[cfg.b], B = { x: Bc[0], d: Bc[1], z: 0 };
    const a = F(A.x, A.z), b = F(B.x, B.z), a1 = T(A.x, A.d), b1 = T(B.x, B.d);
    const plan = Math.hypot(B.x - A.x, B.d - A.d), elev = Math.hypot(B.x - A.x, B.z - A.z);
    const TL = Math.hypot(B.x - A.x, B.d - A.d, B.z - A.z);
    const sg = B.x >= A.x ? 1 : -1;
    const b1r = [a1[0] + sg * plan, a1[1]];                          // top view swung parallel to XY
    const bR = [b1r[0], b[1]];                                      // projected up to B's height
    const bF = [a[0] + sg * elev, a[1]];                             // front view swung parallel to XY
    const bT = [bF[0], b1[1]];                                       // projected down to B's depth
    const theta = deg(Math.atan2(cfg.h, plan)), phi = deg(Math.atan2(Math.abs(B.d - A.d), elev));
    const fvEdges = [], tvEdges = [];
    base.forEach((p, k) => {
      const q = base[(k + 1) % cfg.n];
      tvEdges.push(L(T(p[0], p[1]), T(q[0], q[1])));
      if (k !== cfg.b) tvEdges.push(L(T(0, 0), T(p[0], p[1])));
    });
    const xsB = base.map(p => p[0]), xl = Math.min(...xsB), xr = Math.max(...xsB);
    fvEdges.push(L(F(xl, 0), F(xr, 0)));
    // front-view slant edges: to each base corner, hidden if the corner is at the back (and its edge is not on the outline)
    base.forEach((p, k) => {
      if (k === cfg.b) return;
      const onOutline = Math.abs(p[0] - xl) < 1e-6 || Math.abs(p[0] - xr) < 1e-6;
      const back = p[1] < -1e-6;
      fvEdges.push(L(F(0, cfg.h), F(p[0], 0), back && !onOutline ? 'hidden' : 'A'));
    });
    const lineAB = [L(a, b, 'A'), L(a1, b1, 'A')];
    lineAB.forEach(r => Object.assign(r, { color: '#f87171' }));
    const ang = (v, p1, p2, r, t) => ({ kind: 'angle-arc', vertex: v, p1, p2, radius: r, text: t });
    const steps = [
      { instruction: 'GIVEN (1st angle): the front view and the top view of a ' + cfg.name + ', with the sloping edge AB marked (a, b in the front view; a1, b1 in the top view). Find (1) the TRUE LENGTH of AB, (2) its true inclination to the HP and (3) its true inclination to the VP.',
        calloutAt: a, reveals: [L([X0 - 6, XY], [cx + cfg.R + 70, XY], 'B'), lbl([X0 - 9, XY + 1], 'X', { anchor: 'end', size: 3.4 }), lbl([cx + cfg.R + 73, XY + 1], 'Y', { anchor: 'start', size: 3.4 }),
          ...fvEdges, ...tvEdges, ...lineAB, pt(a, 'a'), pt(b, 'b'), pt(a1, 'a1'), pt(b1, 'b1')] },
      { instruction: 'TRUE LENGTH and the angle with the HP: in the TOP view, with a1 as centre and radius a1b1, swing b1 round until a1b1 is parallel to XY. Call the new point b1\'.',
        calloutAt: b1r, reveals: [{ kind: 'arc-construction', center: a1, r: plan, startDeg: Math.min(Math.atan2(b1[1] - a1[1], b1[0] - a1[0]) * 180 / Math.PI, sg > 0 ? 0 : 180), endDeg: Math.max(Math.atan2(b1[1] - a1[1], b1[0] - a1[0]) * 180 / Math.PI, sg > 0 ? 0 : 180), lineType: 'construction' }, L(a1, b1r, 'construction'), pt(b1r, "b1'")] },
      { instruction: 'Project b1\' straight up into the front view, to the level of b (b stays at the same height when it is swung round).',
        calloutAt: bR, reveals: [L(b1r, [bR[0], bR[1] - 4], 'construction'), L(b, bR, 'construction'), pt(bR, "b'")] },
      { instruction: 'Join a to b\'. This line is the TRUE LENGTH of AB, and the angle it makes with XY is the true inclination of AB to the HP (θ).',
        calloutAt: [(a[0] + bR[0]) / 2, (a[1] + bR[1]) / 2], reveals: [Object.assign(L(a, bR, 'A'), { color: '#fde047' }), (sg > 0 ? ang(bR, [bR[0] - 10, bR[1]], a, 8, 'θ') : ang(bR, a, [bR[0] + 10, bR[1]], 8, 'θ')), lbl([(a[0] + bR[0]) / 2 + sg * 6, (a[1] + bR[1]) / 2], 'TL', YEL)] },
      { instruction: 'The angle with the VP: in the FRONT view, with a as centre and radius ab, swing b round until ab is parallel to XY.',
        calloutAt: bF, reveals: [{ kind: 'arc-construction', center: a, r: elev, startDeg: Math.min(Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI, sg > 0 ? 0 : 180), endDeg: Math.max(Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI, sg > 0 ? 0 : 180), lineType: 'construction' }, L(a, bF, 'construction'), pt(bF, 'b2')] },
      { instruction: 'Project b2 straight down into the top view, to the depth of b1 (a horizontal line through b1).',
        calloutAt: bT, reveals: [L(bF, bT, 'construction'), L(b1, bT, 'construction'), pt(bT, "b1''")] },
      { instruction: 'Join a1 to b1\'\'. It is the true length again (check it against the first answer), and the angle it makes with XY is the true inclination of AB to the VP (φ).',
        calloutAt: [(a1[0] + bT[0]) / 2, (a1[1] + bT[1]) / 2], reveals: [Object.assign(L(a1, bT, 'A'), { color: '#fde047' }), (sg > 0 ? ang(a1, [a1[0] + 10, a1[1]], bT, 9, 'φ') : ang(a1, bT, [a1[0] - 10, a1[1]], 9, 'φ'))] },
      { instruction: 'Write the answers in the answer block: true length, true inclination to the HP and true inclination to the VP.',
        calloutAt: [cx + cfg.R + 40, XY - cfg.h], reveals: [['ANSWER / ANTWOORD', YEL], ['1. TL AB = ' + TL.toFixed(1) + ' mm'], ['2. θ (HP) = ' + theta.toFixed(1) + '°'], ['3. φ (VP) = ' + phi.toFixed(1) + '°']]
          .map(([t, c], i) => lbl([cx + cfg.R + 40, XY - cfg.h + i * 5.5], t, Object.assign({ anchor: 'start', size: 2.9 }, c || {}))) },
    ];
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'first', summary: cfg.summary || ('Find the true length of a sloping edge of a ' + cfg.name + ' and its true inclinations to the HP and the VP by swinging each view parallel to XY.'),
      workbookPrompt: 'The front and top views of a ' + cfg.name + ' (base circumradius ' + cfg.R + ' mm, height ' + cfg.h + ' mm) are given in 1st angle, with the edge AB marked. Determine (1) the true length of AB, (2) its true inclination to the HP and (3) its true inclination to the VP. Show all construction.',
      printLayout: 'full', steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(cfg.id);
  }

  pyramidLine({ id: 'dg-tl-triangular', title: 'True Length: Edge of a Triangular Pyramid', name: 'triangular pyramid', n: 3, R: 26, a0: 90, h: 55, b: 1 });
  pyramidLine({ id: 'dg-tl-square', title: 'True Length: Edge of a Square Pyramid', name: 'square pyramid', n: 4, R: 26, a0: 30, h: 50, b: 3 });
  pyramidLine({ id: 'dg-tl-square-45', title: 'True Length: Square Pyramid at 45°', name: 'square pyramid (edges at 45°)', n: 4, R: 28, a0: 45, h: 55, b: 3 });
  pyramidLine({ id: 'dg-tl-pentagonal', title: 'True Length: Edge of a Pentagonal Pyramid', name: 'pentagonal pyramid', n: 5, R: 28, a0: 90, h: 58, b: 3 });
  pyramidLine({ id: 'dg-tl-hexagonal', title: 'True Length: Edge of a Hexagonal Pyramid', name: 'hexagonal pyramid', n: 6, R: 28, a0: 0, h: 60, b: 5 });
  pyramidLine({ id: 'dg-tl-octagonal', title: 'True Length: Edge of an Octagonal Pyramid', name: 'octagonal pyramid', n: 8, R: 28, a0: 22.5, h: 62, b: 6 });
})(window);
