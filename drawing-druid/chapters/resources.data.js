// Drawing Druid resources: step-by-step reference drawings (not exercises): the hexagon bolt,
// nut, washer and locknut to standard proportions, and the regular polygons and the ellipse.
// civil-symbols.data.js adds the symbol sheets after this file.
(function (global) {
  'use strict';
  const C = {}, ORDER = [];
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const circ = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const pt = (at, label) => ({ kind: 'point', at, label });
  const rad = d => d * Math.PI / 180;
  const at = (c, r, deg) => [c[0] + r * Math.cos(rad(deg)), c[1] - r * Math.sin(rad(deg))];   // maths angle, y up
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const scrDeg = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]) * 180 / Math.PI;
  const swing = (c, r, p, half) => { const a = scrDeg(c, p); return { kind: 'arc-construction', center: c, r, startDeg: a - (half || 12), endDeg: a + (half || 12), lineType: 'construction' }; };
  const dim = (p1, p2, offset, text) => ({ kind: 'dimension', p1, p2, offset, text });
  function add(id, title, summary, steps) {
    C[id] = { id, title, scale: '1:1', projection: 'none', summary, workbookPrompt: summary, printLayout: 'full', steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(id);
  }

  // ═══ Hexagon bolt, nut, washer and locknut (D = M20) ═══
  const D = 20, AF = 1.5 * D, AC = AF / Math.cos(rad(30)), SIDE = AC / 2;

  // end view of the hexagon. corners: 'lr' (corners left and right: the side view shows three
  // faces) or 'tb' (corners top and bottom: the side view shows two faces)
  function hexEnd(c, corners) {
    const a0 = corners === 'lr' ? 0 : 30;
    return Array.from({ length: 6 }, (_, k) => at(c, AC / 2, a0 + 60 * k));
  }
  // the faces seen in the side view, as [x0, x1] relative to the axis
  const facesOf = n => n === 3 ? [[-AC / 2, -SIDE / 2], [-SIDE / 2, SIDE / 2], [SIDE / 2, AC / 2]] : [[-AF / 2, 0], [0, AF / 2]];
  // The 30° chamfer drops every corner of the head by the same amount below the top line:
  const DROP = (AC / 2 - AF / 2) * Math.tan(rad(30));
  // chamfer arc on one face: it touches the top line at the middle of the face and meets both
  // edges of the face at the chamfer depth (R1 on the narrow faces, R2 on the middle face, R3
  // in the two-face view)
  function faceArc(cx, yTop, f, down) {
    const w = f[1] - f[0], m = cx + (f[0] + f[1]) / 2, R = ((w / 2) * (w / 2) + DROP * DROP) / (2 * DROP), s = down ? -1 : 1;
    const c = [m, yTop + s * R], half = Math.asin((w / 2) / R) * 180 / Math.PI;
    const pts = Array.from({ length: 17 }, (_, i) => { const a = -half + 2 * half * i / 16; return [c[0] + R * Math.sin(rad(a)), c[1] - s * R * Math.cos(rad(a))]; });
    const endY = c[1] - s * R * Math.cos(rad(half));
    return { c, R, pts, endY, touch: [m, yTop], corners: [[cx + f[0], yTop], [cx + f[1], yTop]] };
  }
  // side view of a hexagon head or nut: n faces, height h, chamfered on top (and bottom if both)
  function hexSide(cx, yTop, h, n, both) {
    const fs = facesOf(n), arcs = fs.map(f => faceArc(cx, yTop, f, false)), arcsB = both ? fs.map(f => faceArc(cx, yTop + h, f, true)) : [];
    const yB = yTop + h;
    const edges = [...new Set(fs.flatMap(f => [f[0], f[1]]).map(x => +x.toFixed(4)))].map(x => {
      const top = Math.max(...arcs.filter(a => Math.abs(a.corners[0][0] - cx - x) < 1e-3 || Math.abs(a.corners[1][0] - cx - x) < 1e-3).map(a => a.endY));
      const bot = both ? Math.min(...arcsB.filter(a => Math.abs(a.corners[0][0] - cx - x) < 1e-3 || Math.abs(a.corners[1][0] - cx - x) < 1e-3).map(a => a.endY)) : yB;
      return L([cx + x, top], [cx + x, bot]);
    });
    const W2 = (n === 3 ? AC : AF) / 2;
    const chamfer = [];
    if (n === 3) [-1, 1].forEach(k => { chamfer.push(L([cx + k * AF / 2, yTop], [cx + k * W2, yTop + DROP], 'construction')); if (both) chamfer.push(L([cx + k * AF / 2, yB], [cx + k * W2, yB - DROP], 'construction')); });
    chamfer.push(L([cx - W2 - 3, yTop + DROP], [cx + W2 + 3, yTop + DROP], 'construction'));
    if (both) chamfer.push(L([cx - W2 - 3, yB - DROP], [cx + W2 + 3, yB - DROP], 'construction'));
    return {
      chamfer,
      box: [poly([[cx - (n === 3 ? AC : AF) / 2, yTop], [cx + (n === 3 ? AC : AF) / 2, yTop], [cx + (n === 3 ? AC : AF) / 2, yB], [cx - (n === 3 ? AC : AF) / 2, yB]], 'construction')],
      constr: [...arcs, ...arcsB].flatMap(a => [L(a.corners[0], a.c, 'construction'), L(a.corners[1], a.c, 'construction'), L(a.c, a.touch, 'B'), pt(a.c)]),
      arcs: [...arcs, ...arcsB].map(a => pl(a.pts)),
      outline: [...edges, ...(both ? [] : [L([cx - (n === 3 ? AC : AF) / 2, yB], [cx + (n === 3 ? AC : AF) / 2, yB])])],
    };
  }

  // 1. End views
  (function () {
    const A = [50, 50], B = [130, 50];
    const view = (c, corners, label) => {
      const hex = hexEnd(c, corners);
      return {
        cl: [L([c[0] - AC / 2 - 6, c[1]], [c[0] + AC / 2 + 6, c[1]], 'centre'), L([c[0], c[1] - AC / 2 - 6], [c[0], c[1] + AC / 2 + 6], 'centre')],
        circle: [circ(c, AF / 2, 'construction')],
        hex: [poly(hex)],
        chamfer: [circ(c, AF / 2, 'B'), lbl([c[0], c[1] + AC / 2 + 12], label, Object.assign({ size: 2.8 }, YEL))],
      };
    };
    const a = view(A, 'lr', 'SIDE VIEW SHOWS THREE FACES'), b = view(B, 'tb', 'SIDE VIEW SHOWS TWO FACES');
    add('res-hex-end', 'Nut & Bolt: The Hexagon (End View)', 'The end view of a hexagon head or nut, drawn around a circle 1.5D across the flats with a 60° set square, in the two positions used for side views.', [
      { instruction: 'M20 means the bolt diameter D = 20 mm (M = D = Ø). Every size of the bolt, nut and washer is a multiple of D. Draw the centre lines of the two end views.', calloutAt: A, reveals: [...a.cl, ...b.cl] },
      { instruction: 'Draw a thin circle 1.5D = 30 mm in diameter. Its diameter is the distance ACROSS FLATS (AF) of the hexagon.', calloutAt: A, reveals: [...a.circle, ...b.circle] },
      { instruction: 'Left: with the 60° set square on the T-square, draw the six sides touching the circle, with two flats at the top and bottom and the corners left and right. Right: the same with the 30°/60° set square turned, so the corners are at the top and bottom.', calloutAt: [A[0] + AF / 2, A[1]], reveals: [...a.hex, ...b.hex] },
      { instruction: 'The circle drawn in thin is also the CHAMFER circle seen on the top of the head: line it in. Label the across-flats (1.5D) and across-corners sizes.', calloutAt: B,
        reveals: [...a.chamfer, ...b.chamfer, dim([A[0] - AC / 2 - 10, A[1] - AF / 2], [A[0] - AC / 2 - 10, A[1] + AF / 2], -4, 'AF 1.5D'), dim([B[0] - AF / 2, B[1] - AC / 2 - 8], [B[0] + AF / 2, B[1] - AC / 2 - 8], -4, 'AF 1.5D')] },
    ]);
  })();

  // 2/3. Side views of the head
  function headSheet(id, title, n) {
    const cx = 60, ec = [cx, 40], yTop = 82, h = 0.7 * D;
    const hex = hexEnd(ec, n === 3 ? 'lr' : 'tb');
    const s = hexSide(cx, yTop, h, n, false);
    const xs = [...new Set(hex.map(p => +p[0].toFixed(3)))];
    const rName = n === 3 ? 'R1 on the two narrow faces and R2 on the middle face' : 'R3 on each of the two faces';
    add(id, title, 'The side view of a hexagon bolt head showing ' + (n === 3 ? 'three' : 'two') + ' faces, with the chamfer curves drawn as arcs found with the 30°/60° set square (' + rName + ').', [
      { instruction: 'Draw the end view of the head (' + (n === 3 ? 'corners left and right' : 'corners at the top and bottom') + ') and its centre lines.', calloutAt: ec, reveals: [poly(hex), circ(ec, AF / 2, 'B'), L([ec[0] - AC / 2 - 6, ec[1]], [ec[0] + AC / 2 + 6, ec[1]], 'centre'), L([ec[0], ec[1] - AC / 2 - 6], [ec[0], yTop + h + 6], 'centre')] },
      { instruction: 'Project the corners straight down. The head is 0.7D = 14 mm high (a nut is 0.8D). Draw the thin box of the head: ' + (n === 3 ? 'it is as wide as the hexagon across CORNERS, and you see three faces' : 'it is as wide as the hexagon across FLATS, and you see two faces') + '.',
        calloutAt: [cx, yTop + h / 2], reveals: [...xs.map(x => L([x, ec[1]], [x, yTop + h], 'construction')), ...s.box] },
      { instruction: n === 3 ? 'THE CHAMFER: project the chamfer circle (Ø1.5D) down to the top line. From there, draw a 30° line (30° set square) to each outer edge. Where it meets the edge is the depth of the chamfer at every corner: draw a thin line across at that depth.' : 'THE CHAMFER DEPTH: take it from the three-face view (the 30° lines at the outer corners), and draw a thin line across at that depth.',
        calloutAt: [cx + (n === 3 ? AC : AF) / 2, yTop], reveals: s.chamfer },
      { instruction: 'Each face gets an arc that touches the top line at the middle of the face and meets both edges of the face on the chamfer line. Find its centre on the centre line of the face, below the head: ' + (n === 3 ? 'R1 (about 0.4D) for the narrow faces and R2 (about 1.4D) for the middle face.' : 'R3 (about 1.1D) for each face.'),
        calloutAt: s.constr.find(r => r.kind === 'point').at, reveals: s.constr.filter(r => r.kind === 'point' || r.lineType === 'B') },
      { instruction: 'Draw the arcs. ' + (n === 3 ? 'R1 arcs on the narrow faces, the R2 arc on the middle face.' : 'R3 arcs on both faces.'), calloutAt: [cx, yTop], reveals: s.arcs },
      { instruction: 'Line in the head: the vertical edges up to where the arcs meet them, and the bottom line. The top line of the box stays thin (it is not an edge).', calloutAt: [cx - (n === 3 ? AC : AF) / 2, yTop + h / 2],
        reveals: [...s.outline, dim([cx + (n === 3 ? AC : AF) / 2 + 8, yTop], [cx + (n === 3 ? AC : AF) / 2 + 8, yTop + h], 5, '0.7D'),
          lbl([cx, yTop + h + 12], n === 3 ? 'SHOWS THREE FACES / TOON DRIE VLAKKE' : 'SHOWS TWO FACES / TOON TWEE VLAKKE', Object.assign({ size: 2.8 }, YEL))] },
    ]);
  }
  headSheet('res-head-three', 'Nut & Bolt: Head Showing Three Faces', 3);
  headSheet('res-head-two', 'Nut & Bolt: Head Showing Two Faces', 2);

  // 4. The complete bolt
  (function () {
    const cx = 60, yTop = 20, h = 0.7 * D, Lb = 80, yS = yTop + h, yE = yS + Lb, tl = 2 * D, td = 0.1 * D;
    const s = hexSide(cx, yTop, h, 3, false);
    add('res-bolt', 'Nut & Bolt: The Complete Bolt (M20 × 80)', 'A hexagon bolt to standard proportions: head 0.7D showing three faces, shank D, thread length 2D, thread depth 0.1D shown with thin lines, and a 45° chamfer on the end.', [
      { instruction: 'Draw the centre line and the head (three faces, 0.7D high) as on the previous sheet.', calloutAt: [cx, yTop + h / 2], reveals: [L([cx, yTop - 5], [cx, yE + 6], 'centre'), ...s.arcs, ...s.outline] },
      { instruction: 'The shank: D = 20 wide, 80 long under the head (the bolt length is measured from under the head).', calloutAt: [cx + D / 2, (yS + yE) / 2], reveals: [L([cx - D / 2, yS], [cx - D / 2, yE - td]), L([cx + D / 2, yS], [cx + D / 2, yE - td]), dim([cx - AC / 2 - 10, yS], [cx - AC / 2 - 10, yE], -4, 'BOLT LENGTH 80')] },
      { instruction: 'The end is chamfered at 45° by the thread depth 0.1D = 2 mm. Draw the chamfer and the end line.', calloutAt: [cx, yE], reveals: [L([cx - D / 2, yE - td], [cx - D / 2 + td, yE]), L([cx + D / 2, yE - td], [cx + D / 2 - td, yE]), L([cx - D / 2 + td, yE], [cx + D / 2 - td, yE])] },
      { instruction: 'The thread is 2D = 40 long. Show it conventionally: thin lines 0.1D inside each side (the root of the thread), and a thick line across where the thread ends.', calloutAt: [cx + D / 2 - td, yE - tl / 2],
        reveals: [L([cx - D / 2 + td, yE], [cx - D / 2 + td, yE - tl], 'B'), L([cx + D / 2 - td, yE], [cx + D / 2 - td, yE - tl], 'B'), L([cx - D / 2, yE - tl], [cx + D / 2, yE - tl]),
          dim([cx + D / 2 + 8, yE - tl], [cx + D / 2 + 8, yE], 5, '2D'), dim([cx + D / 2 - td, yE + 6], [cx + D / 2, yE + 6], 5, '0.1D')] },
      { instruction: 'Label the drawing. (An alternative end is a rounded end drawn with R = 1.25D.)', calloutAt: [cx, yE + 12], reveals: [lbl([cx, yE + 16], 'M20 × 80 HEXAGON BOLT / SESKANTIGE BOUT', Object.assign({ size: 2.8 }, YEL))] },
    ]);
  })();

  // 5. Nut, washer and locknut
  (function () {
    const cx = 60, yN = 20, hN = 0.8 * D, yW = 60, yL = 90, hL = 0.5 * D;
    const nut = hexSide(cx, yN, hN, 3, true), lock = hexSide(cx, yL, hL, 3, true);
    add('res-nut-washer', 'Nut & Bolt: Nut, Washer and Locknut', 'A hexagon nut (0.8D, chamfered both sides), a plain washer (2D × 0.2D) and a locknut (0.5D), drawn to the standard proportions for an M20 bolt.', [
      { instruction: 'NUT: draw it like the bolt head, three faces, but 0.8D = 16 high and chamfered on BOTH sides: the chamfer depth is marked at the top and at the bottom.', calloutAt: [cx, yN + hN / 2], reveals: [...nut.box, ...nut.chamfer] },
      { instruction: 'Draw the arcs and line in the nut.', calloutAt: [cx, yN], reveals: [...nut.arcs, ...nut.outline, L([cx, yN - 5], [cx, yN + hN + 5], 'centre'), dim([cx + AC / 2 + 12, yN], [cx + AC / 2 + 12, yN + hN], 5, '0.8D')] },
      { instruction: 'WASHER: 2D = 40 in diameter and 0.2D = 4 thick, with a hole a little bigger than D (hidden lines).', calloutAt: [cx, yW],
        reveals: [poly([[cx - D, yW], [cx + D, yW], [cx + D, yW + 0.2 * D], [cx - D, yW + 0.2 * D]]), L([cx - D / 2 - 0.5, yW], [cx - D / 2 - 0.5, yW + 0.2 * D], 'hidden'), L([cx + D / 2 + 0.5, yW], [cx + D / 2 + 0.5, yW + 0.2 * D], 'hidden'), L([cx, yW - 5], [cx, yW + 9], 'centre'),
          dim([cx - D, yW + 0.2 * D + 6], [cx + D, yW + 0.2 * D + 6], 4, '2D'), dim([cx + D + 8, yW], [cx + D + 8, yW + 0.2 * D], 5, '0.2D')] },
      { instruction: 'LOCKNUT: a thin nut, 0.5D = 10 high, chamfered both sides, used under the main nut to lock it.', calloutAt: [cx, yL + hL / 2],
        reveals: [...lock.arcs, ...lock.outline, L([cx, yL - 5], [cx, yL + hL + 5], 'centre'), dim([cx + AC / 2 + 12, yL], [cx + AC / 2 + 12, yL + hL], 5, '0.5D')] },
      { instruction: 'Summary of the proportions: head 0.7D, nut 0.8D, locknut 0.5D, across flats 1.5D, washer 2D × 0.2D, thread length 2D, thread depth 0.1D.', calloutAt: [cx + 50, yN],
        reveals: [['PROPORTIONS / VERHOUDINGS (D = Ø)', YEL], ['ACROSS FLATS / OORKANTS: 1.5D'], ['BOLT HEAD / BOUTKOP: 0.7D'], ['NUT / MOER: 0.8D'], ['LOCKNUT / SLUITMOER: 0.5D'], ['WASHER / WASTER: 2D × 0.2D'], ['THREAD / SKROEFDRAAD: 2D LONG, 0.1D DEEP']]
          .map(([t, c], i) => lbl([cx + 40, yN + i * 6], t, Object.assign({ anchor: 'start', size: 2.7 }, c || {}))) },
    ]);
  })();

  // ═══ Polygons and the ellipse ═══
  // Triangle on a given side
  (function () {
    const A = [40, 90], B = [100, 90], s = 60, Cp = [70, 90 - s * Math.sin(rad(60))];
    add('res-triangle', 'Polygon: Equilateral Triangle on a Given Side', 'An equilateral triangle on side AB: two arcs of radius AB from A and B meet at the third corner.', [
      { instruction: 'Draw side AB, 60 mm.', calloutAt: B, reveals: [L(A, B), lbl([A[0] - 3, A[1] + 4], 'A', YEL), lbl([B[0] + 3, B[1] + 4], 'B', YEL)] },
      { instruction: 'With A as centre and radius AB, draw an arc above AB.', calloutAt: Cp, reveals: [swing(A, s, Cp, 20)] },
      { instruction: 'With B as centre and the same radius, draw an arc crossing the first one at C.', calloutAt: Cp, reveals: [swing(B, s, Cp, 20), pt(Cp, 'C')] },
      { instruction: 'Join A and B to C: every side is 60 mm and every angle 60°.', calloutAt: Cp, reveals: [L(A, Cp), L(B, Cp)] },
    ]);
  })();
  // Square on a given side (perpendicular by compass)
  (function () {
    const s = 50, A = [40, 110], B = [90, 110], Cc = [90, 60], Dd = [40, 60], r = 20, P = [B[0] - r, 110], Q = [B[0] + r, 110], k = 32, X = [B[0], 110 - Math.sqrt(k * k - r * r)];
    add('res-square', 'Polygon: Square on a Given Side', 'A square on side AB by construction: a perpendicular at B with the compass, then the side length stepped off and two arcs for the last corner.', [
      { instruction: 'Draw side AB, 50 mm, and extend it a little past B.', calloutAt: B, reveals: [L(A, B), L(B, [Q[0] + 6, 110], 'construction'), lbl([A[0] - 3, A[1] + 4], 'A', YEL), lbl([B[0], B[1] + 5], 'B', YEL)] },
      { instruction: 'PERPENDICULAR AT B: with B as centre, draw an arc cutting the line on both sides of B at P and Q.', calloutAt: Q, reveals: [{ kind: 'arc-construction', center: B, r, startDeg: 180, endDeg: 360, lineType: 'construction' }, pt(P, 'P'), pt(Q, 'Q')] },
      { instruction: 'With P and Q as centres and a larger radius, draw two arcs crossing above B. Join B to the crossing: the perpendicular.', calloutAt: X, reveals: [swing(P, k, X, 10), swing(Q, k, X, 10), L(B, [X[0], X[1] - 8], 'construction')] },
      { instruction: 'With B as centre and radius AB, cut the perpendicular at C.', calloutAt: Cc, reveals: [swing(B, s, Cc, 10), pt(Cc, 'C')] },
      { instruction: 'With A and C as centres and radius AB, draw two arcs crossing at D.', calloutAt: Dd, reveals: [swing(A, s, Dd, 10), swing(Cc, s, Dd, 10), pt(Dd, 'D')] },
      { instruction: 'Join the corners: the square ABCD.', calloutAt: Dd, reveals: [L(B, Cc), L(Cc, Dd), L(Dd, A)] },
    ]);
  })();
  // Pentagon in a circle
  (function () {
    const O = [70, 70], R = 35, top = [70, 35], E = [O[0] + R, O[1]], M = [O[0] + R / 2, O[1]], mr = dist(M, top), N = [M[0] - mr, O[1]], side = dist(top, N);
    const vs = Array.from({ length: 5 }, (_, k) => at(O, R, 90 + 72 * k));
    add('res-pentagon', 'Polygon: Pentagon in a Circle', 'A regular pentagon inscribed in a circle: bisect a radius, swing an arc to find the side length, and step it round the circle.', [
      { instruction: 'Draw the circle (radius 35) with a horizontal and a vertical diameter.', calloutAt: O, reveals: [circ(O, R), L([O[0] - R - 5, O[1]], [O[0] + R + 5, O[1]], 'centre'), L([O[0], O[1] - R - 5], [O[0], O[1] + R + 5], 'centre'), pt(top, '1')] },
      { instruction: 'Bisect the right-hand radius to find its midpoint M.', calloutAt: M, reveals: [swing(O, 22, [M[0], O[1] - 18], 10), swing(E, 22, [M[0], O[1] - 18], 10), swing(O, 22, [M[0], O[1] + 18], 10), swing(E, 22, [M[0], O[1] + 18], 10), L([M[0], O[1] - 20], [M[0], O[1] + 20], 'construction'), pt(M, 'M')] },
      { instruction: 'With M as centre and radius M to point 1 (the top of the circle), swing an arc to cut the horizontal diameter at N.', calloutAt: N, reveals: [{ kind: 'arc-construction', center: M, r: mr, startDeg: scrDeg(M, top), endDeg: 180, lineType: 'construction' }, pt(N, 'N')] },
      { instruction: 'The distance from 1 to N is the side of the pentagon. Step it round the circle from point 1 with the compass.', calloutAt: vs[1], reveals: [L(top, N, 'construction'), ...vs.slice(1).map((v, i) => swing(vs[i], side, v, 8))] },
      { instruction: 'Join the five points.', calloutAt: vs[2], reveals: [poly(vs)] },
    ]);
  })();
  // Hexagon in a circle
  (function () {
    const O = [70, 70], R = 32, vs = Array.from({ length: 6 }, (_, k) => at(O, R, 180 - 60 * k));
    add('res-hexagon', 'Polygon: Hexagon in a Circle', 'A regular hexagon: its side equals the radius of the circle, so the radius is stepped six times round the circle.', [
      { instruction: 'Draw the circle (radius 32) and its horizontal diameter.', calloutAt: O, reveals: [circ(O, R), L([O[0] - R - 5, O[1]], [O[0] + R + 5, O[1]], 'centre'), pt(vs[0], '1')] },
      { instruction: 'Keep the compass at the radius. From point 1, step round the circle: each step is one side.', calloutAt: vs[2], reveals: vs.slice(1).map((v, i) => swing(vs[i], R, v, 8)) },
      { instruction: 'Join the six points: the hexagon. Across corners = the circle\'s diameter (64); across flats = 0.866 × 64 = 55.4. (With the T-square and 60° set square, a hexagon can also be drawn round a circle: see the nut and bolt sheets.)', calloutAt: vs[3], reveals: [poly(vs), ...vs.map((v, i) => pt(v, String(i + 1)))] },
    ]);
  })();
  // Octagon in a square
  (function () {
    const a = 60, x0 = 40, y0 = 30, Cn = [[x0, y0], [x0 + a, y0], [x0 + a, y0 + a], [x0, y0 + a]], O = [x0 + a / 2, y0 + a / 2], hd = a / Math.SQRT2;
    const pts = [];
    Cn.forEach(c => { [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { const p = [c[0] + dx * hd, c[1] + dy * hd]; if (p[0] >= x0 - 1e-6 && p[0] <= x0 + a + 1e-6 && p[1] >= y0 - 1e-6 && p[1] <= y0 + a + 1e-6) pts.push(p); }); });
    const oct = pts.sort((p, q) => Math.atan2(p[1] - O[1], p[0] - O[0]) - Math.atan2(q[1] - O[1], q[0] - O[0]));
    add('res-octagon', 'Polygon: Octagon in a Square', 'A regular octagon inside a square: arcs from each corner, with radius half the diagonal, cut the sides at the eight corners of the octagon.', [
      { instruction: 'Draw the square (60 mm) and its two diagonals. They cross at the centre.', calloutAt: O, reveals: [poly(Cn, 'B'), L(Cn[0], Cn[2], 'construction'), L(Cn[1], Cn[3], 'construction')] },
      { instruction: 'With each corner as centre and radius half the diagonal (corner to centre), draw an arc cutting the two sides next to it.', calloutAt: Cn[0], reveals: Cn.map((c, i) => ({ kind: 'arc-construction', center: c, r: hd, startDeg: [0, 90, 180, 270][i], endDeg: [90, 180, 270, 360][i], lineType: 'construction' })) },
      { instruction: 'The arcs cut the sides at eight points. Join them: the regular octagon.', calloutAt: oct[0], reveals: [poly(oct), ...oct.map(p => pt(p))] },
    ]);
  })();
  // Ellipse: concentric circles
  (function () {
    const O = [80, 60], a = 50, b = 30, n = 12;
    const ang = k => 360 * k / n;
    const P = k => [O[0] + a * Math.cos(rad(ang(k))), O[1] - b * Math.sin(rad(ang(k)))];
    add('res-ellipse', 'Ellipse: Concentric-Circles Method', 'An ellipse from its major axis (100) and minor axis (60): two circles, twelve radial lines, and the points where vertical and horizontal lines from them cross.', [
      { instruction: 'Draw the major axis (100) and the minor axis (60) crossing at right angles at the centre.', calloutAt: O, reveals: [L([O[0] - a - 5, O[1]], [O[0] + a + 5, O[1]], 'centre'), L([O[0], O[1] - b - 15], [O[0], O[1] + b + 15], 'centre')] },
      { instruction: 'Draw two circles on the centre: one on the major axis (radius 50) and one on the minor axis (radius 30).', calloutAt: [O[0] + a, O[1]], reveals: [circ(O, a, 'construction'), circ(O, b, 'construction')] },
      { instruction: 'Divide them with 12 radial lines, 30° apart (use the 30°/60° set square).', calloutAt: at(O, a, 30), reveals: Array.from({ length: 6 }, (_, k) => L(at(O, a, ang(k)), at(O, a, ang(k) + 180), 'construction')) },
      { instruction: 'Where a radial line cuts the BIG circle, draw a vertical line; where it cuts the SMALL circle, draw a horizontal line. They cross at a point on the ellipse.', calloutAt: P(1),
        reveals: Array.from({ length: n }, (_, k) => k).filter(k => k % 3).flatMap(k => [L(at(O, a, ang(k)), P(k), 'construction'), L(at(O, b, ang(k)), P(k), 'construction'), pt(P(k))]) },
      { instruction: 'Join the points with a smooth curve through the ends of both axes.', calloutAt: P(2), reveals: [pl(Array.from({ length: 73 }, (_, i) => [O[0] + a * Math.cos(rad(5 * i)), O[1] - b * Math.sin(rad(5 * i))]))] },
    ]);
  })();

  global.CONSTRUCTIONS = C;
  global.CONSTRUCTION_ORDER = ORDER;
  global.PRACTICE_QUESTIONS = [
    { text: 'For an M20 bolt, what is the distance across the flats of the hexagon head?', options: ['30 mm (1.5D)', '20 mm (D)', '40 mm (2D)', '14 mm (0.7D)'], answer: 0, explanation: 'Across flats = 1.5D = 1.5 × 20 = 30 mm.' },
    { text: 'How high is a standard nut compared with a bolt head?', options: ['Nut 0.8D, head 0.7D', 'Both 0.7D', 'Nut 0.5D, head 0.8D', 'Both D'], answer: 0, explanation: 'The bolt head is 0.7D high and the nut 0.8D; a locknut is 0.5D.' },
    { text: 'How is the thread of a bolt shown in a side view?', options: ['Thin lines 0.1D inside each side, with a thick line where the thread ends', 'Every thread drawn as a zig-zag', 'Hidden lines along the full length', 'It is not shown'], answer: 0, explanation: 'Threads are drawn conventionally: thin root lines 0.1D in from the outside, ending at a thick line across.' },
    { text: 'When does the side view of a hexagon head show THREE faces?', options: ['When the end view has its corners to the left and right', 'When the end view has its flats to the left and right', 'Always', 'Never: it always shows two'], answer: 0, explanation: 'Looking at a corner-left/corner-right hexagon from the front you see the middle face square on and two narrow faces at the sides.' },
    { text: 'In a regular hexagon drawn in a circle, the side of the hexagon equals:', options: ['The radius of the circle', 'The diameter', 'Half the radius', 'The across-flats size'], answer: 0, explanation: 'Six equilateral triangles meet at the centre, so each side equals the radius.' },
  ];
})(window);
