// Mechanical Assemblies (Gr 11-12): permanent joints, drawn to SANS 10111 conventions in 3rd angle.
// Rivets to proportions, a riveted lap joint and a double-strap butt joint (rivets are NOT sectioned),
// the common welds with their welding symbols (welds in section are filled solid), and an exam-style
// welded bracket (the gusset, cut lengthwise, is not hatched). Replaces the older concept exercises.
// Runs after mechanical-assemblies-2.data.js and before mechanical-assemblies-2-more.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER, AK = global.AssemblyKit;
  ORDER.splice(0).forEach(id => { delete C[id]; });
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 2.8, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const solid = pts => ({ kind: 'polygon', points: pts, lineType: 'A', solid: true });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const circ = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const dim = (p1, p2, offset, text) => ({ kind: 'dimension', p1, p2, offset, text });
  const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const hatch = (polys, ang, sp) => AK.hatch(polys, ang, sp || 2.2);
  const cross = (c, r) => [L([c[0] - r, c[1]], [c[0] + r, c[1]], 'centre'), L([c[0], c[1] - r], [c[0], c[1] + r], 'centre')];
  const zig = (x, y0, y1) => { const m = (y0 + y1) / 2; return pl([[x, y0 - 1.5], [x, m - 3], [x + 2.5, m - 1], [x - 2.5, m + 1], [x, m + 3], [x, y1 + 1.5]], 'B'); };
  // intervals of [a, b] left after taking out the holes [[h0, h1], ...]
  const pieces = (a, b, holes) => { const out = []; let s = a; holes.slice().sort((p, q) => p[0] - q[0]).forEach(([h0, h1]) => { if (h0 > s) out.push([s, h0]); s = Math.max(s, h1); }); if (s < b) out.push([s, b]); return out; };
  const finish = (id, title, summary, prompt, steps, extra) => {
    C[id] = Object.assign({ id, title, projection: 'third', summary, workbookPrompt: prompt, printLayout: 'full', steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) }, extra || {});
    ORDER.push(id);
  };
  // snap head on a base line at y, of shank d: dir -1 = head upwards on the paper, +1 = downwards
  function snapArc(cx, y, d, dir) {
    const a = 0.8 * d, H = 0.6 * d, R = (a * a + H * H) / (2 * H), cy = y - dir * (R - H), al = Math.atan2(R - H, a);
    return Array.from({ length: 21 }, (_, i) => { const t = dir < 0 ? -al - (Math.PI - 2 * al) * i / 20 : al + (Math.PI - 2 * al) * i / 20; return [cx + R * Math.cos(t), cy + R * Math.sin(t)]; });
  }
  // a closed snap-head rivet between base lines yTop and yBot (heads outside them)
  const rivet = (cx, yTop, yBot, d) => {
    const top = snapArc(cx, yTop, d, -1), bot = snapArc(cx, yBot, d, 1);
    return poly([...top, [cx - d / 2, yTop], [cx - d / 2, yBot], ...bot.slice().reverse(), [cx + d / 2, yBot], [cx + d / 2, yTop]]);
  };

  // ═══ 1. Rivets to proportions (d = 20) ═══
  (function () {
    const d = 20, D = 1.6 * d, H = 0.6 * d, a = D / 2, R = (a * a + H * H) / (2 * H);
    const sx = 90, cx2 = 220, yb = 110, ye = 160, ty = 50;                 // front views: head base at yb, shank end at ye; top views at ty
    const cyArc = yb + (R - H), top = [sx, yb - H], edge = [sx + a, yb], mid = [(top[0] + edge[0]) / 2, (top[1] + edge[1]) / 2];
    const nrm = [edge[1] - top[1], -(edge[0] - top[0])], nl = Math.hypot(...nrm);
    const csD = yb + (D - d) / 2;                                           // 90° countersink depth
    const steps = [
      { instruction: 'Rivets are drawn to PROPORTIONS of the shank diameter d. Here d = 20. SNAP HEAD: draw the centre line and the shank (Ø20, 50 long below the head).', calloutAt: [sx, 135],
        reveals: [L([sx, yb - H - 6], [sx, ye + 5], 'centre'), pl([[sx - d / 2, yb], [sx - d / 2, ye], [sx + d / 2, ye], [sx + d / 2, yb]])] },
      { instruction: 'The base of the head: 1.6d = 32 wide. The head is 0.6d = 12 high: mark the top point T on the centre line.', calloutAt: [sx, yb - H],
        reveals: [L([sx - a, yb], [sx + a, yb]), L([sx - a, yb], [sx - a, yb - H - 3], 'construction'), L([sx + a, yb], [sx + a, yb - H - 3], 'construction'), { kind: 'point', at: top, label: 'T' }] },
      { instruction: 'Find the centre of the head arc: join T to the edge of the base and bisect that line. The bisector cuts the centre line at the arc centre O (inside the shank).', calloutAt: [sx, cyArc],
        reveals: [L(top, edge, 'construction'), L([mid[0] - nrm[0] / nl * 14, mid[1] - nrm[1] / nl * 14], [mid[0] + nrm[0] / nl * 14, mid[1] + nrm[1] / nl * 14], 'construction'), { kind: 'point', at: [sx, cyArc], label: 'O' }] },
      { instruction: 'With centre O, draw the head arc through T and both edges of the base.', calloutAt: top, reveals: [pl(snapArc(sx, yb, d, -1))] },
      { instruction: 'TOP VIEW of the snap head (3rd angle: above the front view): a Ø32 circle with centre lines. The shank cannot be seen.', calloutAt: [sx, ty], reveals: [circ([sx, ty], a), ...cross([sx, ty], a + 4), L([sx - a, yb - H - 6], [sx - a, ty], 'construction'), L([sx + a, yb - H - 6], [sx + a, ty], 'construction')] },
      { instruction: 'COUNTERSUNK HEAD: draw the centre line, the top of the head (1.6d = 32) and, with the 45° set square, the 90° countersink down to the shank.', calloutAt: [cx2, yb + 3],
        reveals: [L([cx2, yb - 6], [cx2, ye + 5], 'centre'), L([cx2 - a, yb], [cx2 + a, yb]), L([cx2 - a, yb], [cx2 - d / 2, csD]), L([cx2 + a, yb], [cx2 + d / 2, csD])] },
      { instruction: 'Complete the shank of the countersunk rivet, and its top view: a Ø32 circle.', calloutAt: [cx2, 135],
        reveals: [pl([[cx2 - d / 2, csD], [cx2 - d / 2, ye], [cx2 + d / 2, ye], [cx2 + d / 2, csD]]), circ([cx2, ty], a), ...cross([cx2, ty], a + 4)] },
      { instruction: 'Dimension the proportions and name the views.', calloutAt: [155, 185],
        reveals: [dim([sx - d / 2, ye], [sx + d / 2, ye], 8, 'Ø20 = d'), dim([sx - a, yb], [sx + a, yb], -18, '1,6d'), dim([sx + a, yb], [sx + a, yb - H], 8, '0,6d'),
          dim([cx2 - a, yb], [cx2 + a, yb], -8, '1,6d'),
          lbl([cx2 + a + 4, csD + 2], '90°', { size: 2.8, anchor: 'start' }), lbl([sx, ye + 22], 'SNAP HEAD / KOEPELKOP', YEL), lbl([cx2, ye + 22], 'COUNTERSUNK / VERSONKE KOP', YEL),
          lbl([310, 70], 'PROPORTIONS / VERHOUDINGS', Object.assign({ anchor: 'start', size: 2.8 }, YEL)), lbl([310, 78], 'SNAP HEAD: Ø1,6d × 0,6d HIGH', { anchor: 'start', size: 2.5 }),
          lbl([310, 85], 'COUNTERSUNK: Ø1,6d, 90°', { anchor: 'start', size: 2.5 }), lbl([310, 92], 'RIVETS ARE NEVER SECTIONED', { anchor: 'start', size: 2.5 }), lbl([310, 99], '(NOT HATCHED) IN AN ASSEMBLY.', { anchor: 'start', size: 2.5 })] },
    ];
    finish('rivet-proportions', 'Rivets Drawn to Proportions',
      'A snap-head and a countersunk rivet of d = 20 drawn to the standard proportions: the snap-head arc centre is found by bisecting a chord, and the countersink is set out with the 45° set square.',
      'Draw, full size in 3rd-angle projection, the front and top views of a Ø20 snap-head rivet (head Ø1,6d × 0,6d) and a Ø20 countersunk rivet (head Ø1,6d, 90°), each with a 50 mm shank. Show the construction for the snap-head arc and dimension the proportions.', steps);
  })();

  // ═══ 2. Single-riveted lap joint (t = 8, d = 16, pitch 3d, margin 1,5d) ═══
  (function () {
    const t = 8, d = 16, a = 12.8, p = 48, m = 24, OX = 150, FY = 205, TY = 158;
    const F = (x, z) => [OX + x, FY - z], T = (x, y) => [OX + x, TY - y];
    const ys = [m, m + p, m + 2 * p], W = 2 * m + 2 * p;
    const hole = [[-d / 2, d / 2]];
    const plA = pieces(-90, m, hole).map(([u, v]) => rect(...F(u, 2 * t), ...F(v, t))), plB = pieces(-m, 90, hole).map(([u, v]) => rect(...F(u, t), ...F(v, 0)));
    const cut = ys[1];
    const arrowUp = (x, y) => [L([x, y], [x, y - 7], 'B'), solid([[x - 1.2, y - 4.5], [x, y - 7], [x + 1.2, y - 4.5]]), lbl([x + 4, y - 7], 'A', Object.assign({ size: 3.2 }, YEL))];
    const steps = [
      { instruction: 'GIVEN: two 8 mm plates joined by a single row of three Ø16 snap-head rivets, lapped 48 mm. Pitch = 3d = 48, margin = 1,5d = 24. Draw, full size in 3rd-angle projection, the top view and the sectional front view A-A.', calloutAt: T(0, W / 2),
        reveals: [lbl([300, 30], 'LAP JOINT / OORLAPLAS', Object.assign({ anchor: 'start', size: 3 }, YEL)), lbl([300, 38], 'PLATES / PLATE: 8 THICK', { anchor: 'start', size: 2.5 }), lbl([300, 45], 'RIVETS / KLINKNAELS: Ø16 SNAP HEAD', { anchor: 'start', size: 2.5 }),
          lbl([300, 52], 'PITCH / STEEK 3d = 48', { anchor: 'start', size: 2.5 }), lbl([300, 59], 'MARGIN / KANTAFSTAND 1,5d = 24', { anchor: 'start', size: 2.5 })] },
      { instruction: 'TOP VIEW: the upper plate (left) ends 24 to the right of the rivet line; the lower plate (right) starts 24 to the left of it, so its edge is HIDDEN under the upper plate. Break both plates off at the outer ends.', calloutAt: T(0, W),
        reveals: [pl([T(-90, 0), T(m, 0), T(m, W), T(-90, W)]), L(T(m, 0), T(90, 0)), L(T(m, W), T(90, W)), L(T(-m, 0), T(-m, W), 'hidden'), zig(OX - 90, TY - W, TY), zig(OX + 90, TY - W, TY)] },
      { instruction: 'Mark the rivet centres on the rivet line: 24 (the margin) from the edges and 48 (the pitch) apart, with centre lines.', calloutAt: T(0, cut),
        reveals: [L(T(0, -4), T(0, W + 4), 'centre'), ...ys.map(y => L(T(-a - 3, y), T(a + 3, y), 'centre'))] },
      { instruction: 'The rivet heads: Ø1,6d = Ø25,6 circles.', calloutAt: T(a, ys[2]), reveals: ys.map(y => circ(T(0, y), a)) },
      { instruction: 'The cutting plane A-A across the joint through the middle rivet, with the arrows pointing in the direction of viewing.', calloutAt: T(-100, cut),
        reveals: [L(T(-104, cut), T(104, cut), 'centre'), L(T(-104, cut), T(-98, cut)), L(T(98, cut), T(104, cut)), ...arrowUp(OX - 104, TY - cut), ...arrowUp(OX + 104, TY - cut)] },
      { instruction: 'SECTION A-A: project down and draw the two plates (8 thick), the upper one on top. Leave the rivet hole open.', calloutAt: F(-50, t),
        reveals: [...[...plA, ...plB].map(r => poly(r)), zig(OX - 90, FY - 2 * t, FY - t), zig(OX + 90, FY - t, FY), ...[-m, m].map(x => L(T(x, 0), F(x, 2 * t + 3), 'construction'))] },
      { instruction: 'The RIVET with both snap heads. A rivet lies along the cutting plane but is NEVER sectioned: draw its full outline and do not hatch it.', calloutAt: F(0, 2 * t + 6),
        reveals: [rivet(OX, FY - 2 * t, FY, d), L(F(0, 2 * t + 14), F(0, -14), 'centre')] },
      { instruction: 'Hatch the plates at 45°, in OPPOSITE directions because they are different parts. The hatching stops at the rivet.', calloutAt: F(60, t / 2),
        reveals: [...hatch(plA, 45, 2), ...hatch(plB, 135, 2)] },
      { instruction: 'Dimension the joint and label the views.', calloutAt: F(0, -25),
        reveals: [dim(T(-90, 0), T(-90, ys[0]), 8, '24'), dim(T(-90, ys[0]), T(-90, ys[1]), 8, '48'), dim(T(-m, 0), T(m, 0), 7, '48'),
          dim(F(90, 0), F(90, t), 8, '8'),
          lbl([OX + 110, TY - 4], 'TOP VIEW / BOAANSIG', Object.assign({ anchor: 'start' }, GREY)), lbl([OX + 110, FY - 4], 'SECTION A-A / SNIT A-A', Object.assign({ anchor: 'start' }, GREY)), lbl([300, 75], 'NOTE: RIVETS ARE NOT HATCHED.', Object.assign({ anchor: 'start', size: 2.5 }, YEL))] },
    ];
    finish('riveted-lap-joint-3rd', 'Riveted Lap Joint: Top View and Section',
      'Two plates lapped and joined by a row of snap-head rivets: the margin and pitch set out in the top view, the hidden edge of the lower plate, and a section in which the plates are hatched in opposite directions and the rivet is NOT sectioned.',
      'Two 8 mm plates are lapped 48 mm and joined by three Ø16 snap-head rivets (pitch 3d, margin 1,5d). Draw, full size in 3rd-angle projection, the top view and sectional front view A-A. Show hidden detail, centre lines and hatching, and dimension.', steps);
  })();

  // ═══ 3. Double-riveted (chain) butt joint with two cover straps ═══
  (function () {
    const t = 10, s = 8, d = 16, a = 12.8, OX = 160, FY = 196, TY = 140;
    const F = (x, z) => [OX + x, FY - z], T = (x, y) => [OX + x, TY - y];
    const rows = [-64, -24, 24, 64], ys = [24, 80], W = 104, SE = 88, PE = 140;
    const holesAt = xs => xs.map(x => [x - d / 2, x + d / 2]);
    const bandsF = (u0, u1, z0, z1) => pieces(u0, u1, holesAt(rows.filter(x => x > u0 && x < u1))).map(([u, v]) => rect(...F(u, z1), ...F(v, z0)));
    const pL = bandsF(-PE, 0, 0, t), pR = bandsF(0, PE, 0, t), sT = bandsF(-SE, SE, t, t + s), sB = bandsF(-SE, SE, -s, 0);
    const arrowUp = (x, y) => [L([x, y], [x, y - 7], 'B'), solid([[x - 1.2, y - 4.5], [x, y - 7], [x + 1.2, y - 4.5]]), lbl([x + 4, y - 7], 'A', Object.assign({ size: 3.2 }, YEL))];
    const steps = [
      { instruction: 'GIVEN: two 10 mm plates BUTTED together and joined by two 8 mm cover straps, one above and one below, with two rows of Ø16 rivets on each side (chain riveting). Draw, full size in 3rd-angle projection, the top view and sectional front view A-A.', calloutAt: T(0, W / 2),
        reveals: [lbl([300, 22], 'BUTT JOINT, DOUBLE STRAP', Object.assign({ anchor: 'start', size: 2.8 }, YEL)), lbl([300, 29], 'STOMPLAS, DUBBELE DEKSTROOK', Object.assign({ anchor: 'start', size: 2.5 }, YEL)),
          lbl([300, 37], 'PLATES 10, STRAPS 8 THICK', { anchor: 'start', size: 2.4 }), lbl([300, 44], 'RIVETS Ø16, PITCH 56', { anchor: 'start', size: 2.4 }), lbl([300, 51], 'ROWS 24 AND 64 FROM THE BUTT', { anchor: 'start', size: 2.4 })] },
      { instruction: 'TOP VIEW: the top strap (176 long) over the two plates; the butt line between the plates is HIDDEN under the strap. Break the plates off at the ends.', calloutAt: T(0, W),
        reveals: [poly([T(-SE, 0), T(SE, 0), T(SE, W), T(-SE, W)]), L(T(-PE, 0), T(-SE, 0)), L(T(-PE, W), T(-SE, W)), L(T(SE, 0), T(PE, 0)), L(T(SE, W), T(PE, W)),
          L(T(0, 0), T(0, W), 'hidden'), zig(OX - PE, TY - W, TY), zig(OX + PE, TY - W, TY)] },
      { instruction: 'The rivet centres: four rows (24 and 64 each side of the butt), two rivets in each row at a pitch of 56. In CHAIN riveting the rivets of neighbouring rows line up.', calloutAt: T(64, 80),
        reveals: [...rows.map(x => L(T(x, -4), T(x, W + 4), 'centre')), ...ys.map(y => L(T(-SE - 4, y), T(SE + 4, y), 'centre'))] },
      { instruction: 'The rivet heads: Ø25,6 circles.', calloutAt: T(-64, 24), reveals: rows.flatMap(x => ys.map(y => circ(T(x, y), a))) },
      { instruction: 'Cutting plane A-A across the joint through the front row of rivets.', calloutAt: T(-150, ys[0]),
        reveals: [L(T(-154, ys[0]), T(154, ys[0]), 'centre'), L(T(-154, ys[0]), T(-148, ys[0])), L(T(148, ys[0]), T(154, ys[0])), ...arrowUp(OX - 154, TY - ys[0]), ...arrowUp(OX + 154, TY - ys[0])] },
      { instruction: 'SECTION A-A: the two plates butted at the centre, and the two straps above and below them. Leave the rivet holes open.', calloutAt: F(-110, t / 2),
        reveals: [...[...pL, ...pR, ...sT, ...sB].map(r => poly(r)), zig(OX - PE, FY - t, FY), zig(OX + PE, FY - t, FY)] },
      { instruction: 'The four rivets, with snap heads on the outside of both straps. They are NOT sectioned.', calloutAt: F(24, t + s + 8),
        reveals: rows.flatMap(x => [rivet(OX + x, FY - t - s, FY + s, d), L(F(x, t + s + 13), F(x, -s - 13), 'centre')]) },
      { instruction: 'Hatch the four parts so that no two parts that touch look the same: the plates at 45° in opposite directions, the straps at a wider spacing.', calloutAt: F(-110, t / 2),
        reveals: [...hatch(pL, 135, 2), ...hatch(pR, 45, 2), ...hatch(sT, 45, 3.6), ...hatch(sB, 45, 3.6)] },
      { instruction: 'Dimension and label.', calloutAt: F(0, -30),
        reveals: [dim(T(0, W), T(rows[2], W), -8, '24'), dim(T(rows[2], W), T(rows[3], W), -8, '40'), dim(T(rows[3], W), T(SE, W), -8, '24'), dim(T(SE + 20, ys[0]), T(SE + 20, ys[1]), -6, '56'),
          dim(F(PE, 0), F(PE, t), 8, '10'), dim(F(SE, t), F(SE, t + s), 8, '8'),
          lbl([OX, TY + 10], 'TOP VIEW / BOAANSIG', GREY), lbl([OX, FY + 30], 'SECTION A-A / SNIT A-A', GREY)] },
    ];
    finish('riveted-butt-joint-3rd', 'Double-Strap Butt Joint (Chain Riveted)',
      'Two plates butted and joined by cover straps above and below with two rows of rivets each side: the hidden butt line in the top view, and a section with four parts hatched so that touching parts differ, and the rivets left unsectioned.',
      'Two 10 mm plates are butted and joined by two 8 mm cover straps (176 long) with Ø16 snap-head rivets, chain riveted in rows 24 and 64 from the butt at a pitch of 56. Draw, full size in 3rd-angle projection, the top view and sectional front view A-A. Dimension and label.', steps);
  })();

  // ═══ 4. Welds in section and their welding symbols ═══
  (function () {
    // Arrow side: the weld symbol goes BELOW the reference line. Other side: ABOVE it.
    const panel = (px, py) => ({ P: (x, z) => [px + x, py - z], px, py });
    const symLine = (o, tip) => [L(o, [o[0] + 40, o[1]], 'B'), L(o, tip, 'B'), solid([tip, [tip[0] + (o[0] - tip[0]) * 0.1 + (o[1] - tip[1]) * 0.03, tip[1] + (o[1] - tip[1]) * 0.1 - (o[0] - tip[0]) * 0.03], [tip[0] + (o[0] - tip[0]) * 0.1 - (o[1] - tip[1]) * 0.03, tip[1] + (o[1] - tip[1]) * 0.1 + (o[0] - tip[0]) * 0.03]])];
    const filletSym = (x, y, below) => poly([[x, y], [x, y + (below ? 5 : -5)], [x + 5, y]], 'B');
    const steps = [], add = (instruction, calloutAt, reveals) => steps.push({ instruction, calloutAt, reveals });
    add('GIVEN: four welded joints. For each one, draw the joint in section with the weld FILLED SOLID, and then the WELDING SYMBOL. The arrow points at the joint; a symbol BELOW the reference line means the weld is on the ARROW SIDE, ABOVE means the OTHER SIDE.', [200, 20],
      [lbl([200, 18], 'WELDING SYMBOLS / SWEISSIMBOLE  (SANS 10111)', Object.assign({ size: 3.2 }, YEL)), L([30, 112], [370, 112], 'B'), L([200, 26], [200, 200], 'B')]);
    // (a) single fillet, arrow side
    {
      const { P } = panel(40, 90), base = rect(...P(0, 10), ...P(70, 0)), up = rect(...P(30, 50), ...P(40, 10));
      add('(a) A T-JOINT: a 10 mm plate standing on a 10 mm base plate. Draw both plates in section and hatch them in opposite directions.', P(35, 25), [poly(base), poly(up), ...hatch([base], 45), ...hatch([up], 135)]);
      add('(a) A 6 mm FILLET WELD on the left of the joint: a right-angled triangle, legs 6, filled solid.', P(27, 13), [solid([P(30, 10), P(24, 10), P(30, 16)])]);
      add('(a) The symbol: arrow to the weld, reference line, and the fillet symbol (a triangle, upright side on the left) BELOW the line because the weld is on the arrow side. The leg size 6 goes on the left.', [130, 55],
        [...symLine([115, 55], P(25, 14)), filletSym(125, 55, true), lbl([121, 59.5], '6', { size: 2.8 }), lbl([137, 70], 'FILLET, ARROW SIDE', Object.assign({ size: 2.2 }, GREY))]);
    }
    // (b) double fillet
    {
      const { P } = panel(220, 90), base = rect(...P(0, 10), ...P(70, 0)), up = rect(...P(30, 50), ...P(40, 10));
      add('(b) The same T-joint, now welded on BOTH sides. Draw and hatch the plates.', P(35, 25), [poly(base), poly(up), ...hatch([base], 45), ...hatch([up], 135)]);
      add('(b) Two 6 mm fillet welds, one each side of the upright plate, filled solid.', P(35, 13), [solid([P(30, 10), P(24, 10), P(30, 16)]), solid([P(40, 10), P(46, 10), P(40, 16)])]);
      add('(b) The symbol: fillet symbols BELOW and ABOVE the reference line (both sides), each with its size 6.', [310, 55],
        [...symLine([295, 55], P(46.5, 14)), filletSym(305, 55, true), filletSym(305, 55, false), lbl([301, 59.5], '6', { size: 2.8 }), lbl([301, 53.5], '6', { size: 2.8 }), lbl([317, 70], 'FILLET, BOTH SIDES', Object.assign({ size: 2.2 }, GREY))]);
    }
    // (c) single-V butt
    {
      const { P } = panel(40, 175), tn = Math.tan(Math.PI / 6);
      const lp = [P(0, 0), P(34, 0), P(34 - 10 * tn, 10), P(0, 10)], rp = [P(36, 0), P(70, 0), P(70, 10), P(36 + 10 * tn, 10)];
      add('(c) A BUTT JOINT between two 10 mm plates, each edge bevelled at 30° (a 60° V) with a 2 mm root gap. Draw and hatch the plates.', P(35, 5), [poly(lp), poly(rp), ...hatch([lp], 45), ...hatch([rp], 135)]);
      add('(c) The SINGLE-V BUTT WELD fills the V, filled solid.', P(35, 8), [solid([P(34, 0), P(36, 0), P(36 + 10 * tn, 10), P(34 - 10 * tn, 10)])]);
      add('(c) The symbol: a V BELOW the line (arrow side), the groove angle 60° under it and the root gap 2 inside it.', [130, 150],
        [...symLine([115, 150], P(35, 10.5)), pl([[124, 156], [128, 150], [132, 156]], 'B'), lbl([128, 162], '60°', { size: 2.4 }), lbl([128, 155.6], '2', { size: 1.7 }), lbl([137, 140], 'SINGLE-V BUTT, ARROW SIDE', Object.assign({ size: 2.2 }, GREY))]);
    }
    // (d) spot welds on a lap joint
    {
      const { P } = panel(220, 175), up = rect(...P(0, 6), ...P(50, 3)), lo = rect(...P(20, 3), ...P(70, 0));
      add('(d) A LAP JOINT of two 3 mm sheets. Draw and hatch them.', P(35, 3), [poly(up), poly(lo), ...hatch([up], 45, 1.5), ...hatch([lo], 135, 1.5)]);
      add('(d) Two SPOT WELDS where the sheets overlap: small lens-shaped nuggets at the joint face, filled solid.', P(35, 3),
        [30, 42].map(x => solid(Array.from({ length: 16 }, (_, i) => { const t = 2 * Math.PI * i / 16; return P(x + 3 * Math.cos(t), 3 + 1.4 * Math.sin(t)); }))));
      add('(d) The symbol: a circle ON the reference line (a spot weld has no side). Ø5 on the left; the pitch 12 on the right.', [310, 150],
        [...symLine([295, 150], P(42, 4.5)), circ([306, 150], 2.4, 'B'), lbl([299, 151], 'Ø5', { size: 2.2, anchor: 'end' }), lbl([312, 151], '12', { size: 2.2, anchor: 'start' }), lbl([317, 140], 'SPOT WELD', Object.assign({ size: 2.2 }, GREY))]);
    }
    add('Name each joint. Remember: welds in section are FILLED SOLID; the symbol below the line = arrow side, above = other side.', [200, 205],
      [lbl([95, 108], '(a) T-JOINT, FILLET WELD', YEL), lbl([275, 108], '(b) T-JOINT, DOUBLE FILLET', YEL), lbl([95, 196], '(c) BUTT JOINT, SINGLE V', YEL), lbl([275, 196], '(d) LAP JOINT, SPOT WELDS', YEL)]);
    finish('welding-symbols', 'Welds in Section and Welding Symbols',
      'Four common welded joints: a single and a double fillet weld on a T-joint, a single-V butt weld and spot welds on a lap joint. Each is drawn in section with the weld filled solid, then given its welding symbol (arrow side below the reference line).',
      'For each joint draw the section with the weld filled solid and the welding symbol: (a) 6 mm fillet on the arrow side of a T-joint, (b) 6 mm fillets on both sides, (c) a single-V butt weld with a 60° groove and 2 mm root gap, (d) Ø5 spot welds at 12 pitch on a lap joint of 3 mm sheets.', steps);
  })();

  // ═══ 5. Welded bracket (exam style): sectional front view, top view and left view ═══
  (function () {
    // base 120 × 60 × 10; upright 10 thick at x 20..30, up to 90; gusset 8 thick (y 26..34), legs 50; fillets 6.
    const OX = 160, FY = 205, TY = 92, LX = 60;
    const F = (x, z) => [OX + x, FY - z], T = (x, y) => [OX + x, TY - y], Lv = (y, z) => [LX + (60 - y), FY - z];
    const base = rect(...F(0, 10), ...F(120, 0)), up = rect(...F(20, 90), ...F(30, 10)), gus = [F(30, 10), F(80, 10), F(30, 60)];
    const arrowUp = (x, y) => [L([x, y], [x, y - 7], 'B'), solid([[x - 1.2, y - 4.5], [x, y - 7], [x + 1.2, y - 4.5]]), lbl([x + 4, y - 7], 'A', Object.assign({ size: 3.2 }, YEL))];
    const sym = (o, tip, both, txt) => [L(o, [o[0] + 34, o[1]], 'B'), L(o, tip, 'B'), solid([tip, [tip[0] + (o[0] - tip[0]) * 0.12 + 1, tip[1] + (o[1] - tip[1]) * 0.12 - 1], [tip[0] + (o[0] - tip[0]) * 0.12 - 1, tip[1] + (o[1] - tip[1]) * 0.12 + 1]]),
      poly([[o[0] + 10, o[1]], [o[0] + 10, o[1] + 5], [o[0] + 15, o[1]]], 'B'), ...(both ? [poly([[o[0] + 10, o[1]], [o[0] + 10, o[1] - 5], [o[0] + 15, o[1]]], 'B'), lbl([o[0] + 6.5, o[1] - 1], '6', { size: 2.6 })] : []),
      lbl([o[0] + 6.5, o[1] + 4.5], '6', { size: 2.6 }), lbl([o[0] + 18, o[1] + (both ? 9 : 4.5)], txt, Object.assign({ anchor: 'start', size: 2.1 }, GREY))];
    const parts = [['PARTS LIST / ONDERDELELYS', YEL], ['1  BASE PLATE / GRONDPLAAT 120 × 60 × 10'], ['2  UPRIGHT / STAANDER 80 × 60 × 10'], ['3  GUSSET / HOEKPLAAT 50 × 50 × 8'], ['WELDS: 6 mm FILLET / HOEKLAS']];
    const steps = [
      { instruction: 'GIVEN: a welded bracket of three mild-steel plates (see the parts list): the upright stands on the base 20 from its left end, and the gusset is welded centrally in the corner. Draw, full size in 3rd-angle projection: the top view, the sectional front view A-A and the left view. Show the welds and welding symbols.',
        calloutAt: [300, 30], reveals: parts.map(([t, c], i) => lbl([292, 22 + i * 7], t, Object.assign({ anchor: 'start', size: 2.4 }, c || {}))) },
      { instruction: 'TOP VIEW: the base (120 × 60), the upright across it (10 wide, 20 from the left end) and the gusset (8 wide, central).', calloutAt: T(60, 30),
        reveals: [poly([T(0, 0), T(120, 0), T(120, 60), T(0, 60)]), L(T(20, 0), T(20, 60)), L(T(30, 0), T(30, 60)), pl([T(30, 26), T(80, 26), T(80, 34), T(30, 34)])] },
      { instruction: 'The weld edges in the top view: the 6 mm fillet outside the upright, the fillets inside the upright on either side of the gusset, and the fillets along both sides of the gusset.', calloutAt: T(55, 20),
        reveals: [L(T(14, 0), T(14, 60), 'B'), L(T(36, 0), T(36, 20), 'B'), L(T(36, 40), T(36, 60), 'B'), L(T(30, 20), T(80, 20), 'B'), L(T(30, 40), T(80, 40), 'B')] },
      { instruction: 'The cutting plane A-A along the middle of the gusset, with the arrows pointing in the direction of viewing.', calloutAt: T(-8, 30),
        reveals: [L(T(-8, 30), T(128, 30), 'centre'), L(T(-8, 30), T(-2, 30)), L(T(122, 30), T(128, 30)), ...arrowUp(OX - 8, TY - 30), ...arrowUp(OX + 128, TY - 30)] },
      { instruction: 'SECTION A-A: project down and draw the base, the upright and the gusset.', calloutAt: F(60, 30),
        reveals: [poly(base), poly(up), poly(gus), ...[0, 20, 30, 80, 120].map(x => L(T(x, 0), F(x, x === 20 || x === 30 ? 93 : 13), 'construction'))] },
      { instruction: 'Hatch the base and the upright in opposite directions. The GUSSET is a rib (web) cut LENGTHWISE, so it is NOT hatched.', calloutAt: F(45, 25),
        reveals: [...hatch([base], 45), ...hatch([up], 135)] },
      { instruction: 'The fillet weld outside the upright is cut by the plane: draw it filled solid (legs 6).', calloutAt: F(17, 13), reveals: [solid([F(20, 10), F(14, 10), F(20, 16)])] },
      { instruction: 'LEFT VIEW (3rd angle: to the LEFT of the front view): the end of the base, the upright, and the toe of the outside weld across it.', calloutAt: Lv(30, 50),
        reveals: [poly([Lv(0, 0), Lv(60, 0), Lv(60, 10), Lv(0, 10)]), poly([Lv(0, 10), Lv(60, 10), Lv(60, 90), Lv(0, 90)]), L(Lv(0, 16), Lv(60, 16), 'B'),
          ...[0, 10, 90].map(z => L(F(0, z), Lv(0, z), 'construction'))] },
      { instruction: 'The gusset is behind the upright in the left view: show it with hidden lines.', calloutAt: Lv(30, 40), reveals: [pl([Lv(26, 16), Lv(26, 60), Lv(34, 60), Lv(34, 16)], 'hidden')] },
      { instruction: 'The WELDING SYMBOLS: a 6 mm fillet on the arrow side for the outside weld, and 6 mm fillets on both sides for the gusset.', calloutAt: F(-30, 45),
        reveals: [...sym(F(-35, 55), F(14.5, 13), false, 'FILLET'), ...sym(F(70, 75), F(58, 11), true, 'BOTH SIDES')] },
      { instruction: 'Dimension the bracket.', calloutAt: F(60, -12),
        reveals: [dim(F(0, 0), F(120, 0), 10, '120'), dim(F(0, 0), F(20, 0), 4, '20'), dim(F(120, 0), F(120, 10), -6, '10'), dim(F(20, 10), F(20, 90), -8, '80'),
          dim(F(80, 10), F(30, 60), -6, ''), dim(T(120, 0), T(120, 60), -6, '60'), dim(T(80, 26), T(80, 34), -10, '8')].filter(r => r.text)
          .concat([dim(F(30, 60), F(30, 10), -8, '50'), dim(F(30, 10), F(80, 10), -14, '50')]) },
      { instruction: 'Number the parts and name the views.', calloutAt: F(60, -25),
        reveals: [...[['1', F(100, 5), [OX + 112, FY + 14]], ['2', F(25, 80), [OX + 5, FY - 102]], ['3', F(45, 25), [OX + 95, FY - 50]]].flatMap(([n, at, to]) => [L(at, to, 'B'), circ(to, 3.2, 'B'), lbl([to[0], to[1] + 1.1], n, { size: 3 })]),
          lbl([OX + 60, TY + 12], 'TOP VIEW / BOAANSIG', GREY), lbl([OX + 60, FY + 24], 'SECTION A-A / SNIT A-A', GREY), lbl([LX + 30, FY + 24], 'LEFT VIEW / LINKERAANSIG', GREY)] },
    ];
    finish('welded-bracket', 'Welded Bracket: Section, Top and Left Views',
      'An exam-style welded assembly of three plates: top view with the weld edges and cutting plane, sectional front view in which the gusset (a rib cut lengthwise) is not hatched and the cut weld is filled solid, a left view with hidden detail, welding symbols, dimensions and part numbers.',
      'The welded bracket consists of a 120 × 60 × 10 base plate, an 80 × 60 × 10 upright (20 from the left end) and a central 50 × 50 × 8 gusset, joined with 6 mm fillet welds. Draw, full size in 3rd-angle projection: the top view, sectional front view A-A through the gusset and the left view. Show the welds, welding symbols, hidden detail and part numbers, and dimension.', steps);
  })();
})(window);
