// Perspective Drawing II — Grade 11-12: two-point perspective by the plan (measured) method,
// with curved work for Grade 12. Requires engine-geometry.js and perspective-kit.js.
(function (global) {
  'use strict';
  const K = global.PerspectiveKit;
  const CONSTRUCTIONS = {};

  const lbl = (at, text, anchor, size) => ({ kind: 'label', at, text, size: size || 3.4, anchor: anchor || 'middle', color: '#94a3b8' });
  const toVP = (P, from, vp) => ({ kind: 'line', p1: from, p2: vp, lineType: 'construction' });
  // Is the curved surface at (u, v), with outward plan normal (nu, nv), facing the eye?
  function frontFacing(P, nu, nv, u, v) {
    const [X, Y] = P.world(u, v);
    const nx = nu * P.cs - nv * P.sn, ny = nu * P.sn + nv * P.cs;
    return nx * (P.eye[0] - X) + ny * (P.eye[1] - Y) > 0;
  }

  // The common set-up for every two-point exercise: plan, SP, the two lines from SP parallel
  // to the plan's edges, the VPs dropped onto HL, and the GL / HL / PP lines.
  function setupReveals(P, planPts, x0, x1, extraPlan) {
    const { LVP, RVP, LPP, RPP } = P.vps;
    return [
      ...K.frame(P, x0, x1),
      { kind: 'polygon', points: planPts.map(([u, v]) => P.plan(u, v)), lineType: 'A' },
      ...(extraPlan || []),
      ...K.spMark(P),
      { kind: 'line', p1: P.SP, p2: LPP, lineType: 'construction' },
      { kind: 'line', p1: P.SP, p2: RPP, lineType: 'construction' },
      { kind: 'line', p1: LPP, p2: LVP, lineType: 'construction' },
      { kind: 'line', p1: RPP, p2: RVP, lineType: 'construction' },
      { kind: 'point', at: LVP, label: 'LVP', size: 1.3 },
      { kind: 'point', at: RVP, label: 'RVP', size: 1.3 },
    ];
  }

  // A front elevation (the face along u) standing on GL at ex, heights projected across to the
  // true-height line at the corner that touches PP.
  function elevation(P, ex, profile, heights) {
    const tx = P.persp(0, 0, 0)[0];
    return [
      { kind: 'polygon', points: profile.map(([u, z]) => [ex + u, P.yGL - z]), lineType: 'A' },
      lbl([ex + Math.max(...profile.map(p => p[0])) / 2, P.yGL + 7], 'FRONT VIEW / VOORAANSIG'),
      ...heights.map(z => ({ kind: 'line', p1: [ex + Math.max(...profile.filter(p => Math.abs(p[1] - z) < 1e-6).map(p => p[0]).concat([0])), P.yGL - z], p2: [tx, P.yGL - z], lineType: 'construction' })),
    ];
  }

  // ── 1. Setting up two-point perspective: a block at 30° / 60° ──
  (function () {
    const W = 44, D = 30, H = 32;
    const P = K.setup({ sx: 100, d: 117, yPP: 72, yGL: 168, h: 52, theta: 30, cx: 100 });
    const faces = K.extrude([[0, 0], [W, 0], [W, H], [0, H]], 'uz', 0, D);
    const edges = K.visibleEdges(P, faces);
    const { LVP, RVP } = P.vps;
    const EX = Math.round(P.vps.LVP[0]) - 54;
    const C0 = P.persp(0, 0, 0), C1 = P.persp(0, 0, H);

    CONSTRUCTIONS['two-point-setup'] = {
      printLayout: 'full',
      id: 'two-point-setup', title: 'Two-Point Perspective: Setting Up (Block)',
      summary: 'The full two-point set-up: the top view at 30°/60° touching PP at one corner, the vanishing points found from SP, the true-height line, and the block found by visual rays.',
      bounds: { w: 330, h: 190 },
      workbookPrompt: 'Draw the block (44 x 30 x 32) in two-point perspective. The top view touches PP at its nearest corner, with its long side at 30° to PP. SP is 117 mm in front of PP, directly in line with that corner; the eye is 52 mm above GL.',
      steps: [
        {
          id: 1,
          instruction: 'Draw PP and the TOP VIEW above it, turned so its long side makes 30° with PP and its short side 60°. Only the nearest corner touches the picture plane.',
          calloutAt: P.plan(W / 2, D / 2),
          reveals: [
            { kind: 'line', p1: [EX - 26, P.yPP], p2: [RVP[0] + 4, P.yPP], lineType: 'B' },
            lbl([EX - 28, P.yPP - 1], 'PP', 'end', 3.6), lbl([EX - 28, P.yPP + 5.5], 'PV', 'end', 3.6),
            { kind: 'polygon', points: [P.plan(0, 0), P.plan(W, 0), P.plan(W, D), P.plan(0, D)], lineType: 'A' },
            lbl([P.plan(W, D)[0], P.plan(W, D)[1] - 6], 'TOP VIEW / BO-AANSIG'),
          ],
        },
        {
          id: 2,
          instruction: 'Mark SP. From SP draw a line PARALLEL to each edge of the top view up to the PP (30° and 60° set-square lines). Drop verticals from those two points to the HL: they are the left and right vanishing points, LVP and RVP. Draw GL and HL.',
          calloutAt: RVP,
          reveals: setupReveals(P, [[0, 0], [W, 0], [W, D], [0, D]], EX - 26, RVP[0] + 4).filter(r => r.kind !== 'polygon'),
        },
        {
          id: 3,
          instruction: 'The corner touching PP is the TRUE-HEIGHT LINE: the only line in the drawing shown at true scale. Drop it from PP to GL and mark its true height, projected across from the front view drawn on GL.',
          calloutAt: [C0[0], (C0[1] + C1[1]) / 2],
          reveals: [
            { kind: 'line', p1: P.plan(0, 0), p2: C0, lineType: 'construction' },
            ...elevation(P, EX, [[0, 0], [W, 0], [W, H], [0, H]], [H]),
            { kind: 'line', p1: C0, p2: C1, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Join the top and bottom of the true-height line to BOTH vanishing points. Every edge of the block lies on one of these four lines.',
          calloutAt: [(C1[0] + RVP[0]) / 2, (C1[1] + RVP[1]) / 2],
          reveals: [toVP(P, C0, LVP), toVP(P, C1, LVP), toVP(P, C0, RVP), toVP(P, C1, RVP)],
        },
        {
          id: 5,
          instruction: 'Visual rays from SP to the other plan corners; where they cross PP drop verticals. They cut the VP lines at the block\'s corners. Draw the visible edges with Type A lines.',
          calloutAt: P.persp(W, 0, H / 2),
          reveals: [
            ...K.rays(P, [[W, 0], [0, D], [W, D]]),
            ...K.drops(P, [[W, 0, 0], [0, D, 0], [W, D, H]]),
            ...K.perspLines(P, edges.filter(([p, q]) => !(p[0] === 0 && p[1] === 0 && q[0] === 0 && q[1] === 0)), 'A'),
          ],
        },
      ],
    };
  })();

  // ── 2. Stepped block ──
  (function () {
    const W = 50, D = 30;
    const prof = [[0, 0], [W, 0], [W, 14], [20, 14], [20, 34], [0, 34]];
    const P = K.setup({ sx: 150, d: 112, yPP: 72, yGL: 170, h: 60, theta: 60, cx: 160 });
    const faces = K.extrude(prof, 'uz', 0, D);
    const edges = K.visibleEdges(P, faces);
    const { LVP, RVP } = P.vps;
    const EX = Math.round(P.vps.LVP[0]) - 54;
    const C0 = P.persp(0, 0, 0);

    CONSTRUCTIONS['two-point-stepped-block'] = {
      printLayout: 'full',
      id: 'two-point-stepped-block', title: 'Two-Point Perspective: Stepped Block',
      summary: 'Heights that are not on the true-height corner are measured on it first and carried along a VP line to where they belong.',
      bounds: { w: 330, h: 190 },
      workbookPrompt: 'Draw the stepped block in two-point perspective. The top view touches PP at its nearest corner, its long side at 60° to PP on the right and its short side at 30° on the left. SP is 112 mm in front of PP, 10 mm left of that corner; the eye is 60 mm above GL.',
      steps: [
        {
          id: 1,
          instruction: 'Set up: this time the top view is turned 60° on the right and 30° on the left (they always add up to 90°). From SP draw lines at those same angles, 60° to the right and 30° to the left, up to PP, and drop them to HL for RVP and LVP. Draw the front view on GL at the side.',
          calloutAt: P.plan(W / 2, D / 2),
          reveals: [
            ...setupReveals(P, [[0, 0], [W, 0], [W, D], [0, D]], EX - 26, RVP[0] + 4, [{ kind: 'line', p1: P.plan(20, 0), p2: P.plan(20, D), lineType: 'A' }]),
            ...elevation(P, EX, prof, []),
          ],
        },
        {
          id: 2,
          instruction: 'Mark BOTH heights (14 and 34) on the true-height line by projecting them across from the front view, and join them to the VPs.',
          calloutAt: P.persp(0, 0, 24),
          reveals: [
            { kind: 'line', p1: P.plan(0, 0), p2: C0, lineType: 'construction' },
            ...[14, 34].map(z => ({ kind: 'line', p1: [EX + (z === 14 ? W : 20), P.yGL - z], p2: P.persp(0, 0, z), lineType: 'construction' })),
            ...[0, 14, 34].flatMap(z => [toVP(P, P.persp(0, 0, z), LVP), toVP(P, P.persp(0, 0, z), RVP)]),
          ],
        },
        {
          id: 3,
          instruction: 'Rays from SP to the plan corners, including both ends of the riser line at 20 mm. Drop verticals. The riser\'s height (34 down to 14) comes from the VP lines through the true-height marks, not from measuring.',
          calloutAt: P.persp(20, 0, 24),
          reveals: [
            ...K.rays(P, [[20, 0], [W, 0], [0, D], [20, D], [W, D]]),
            ...K.drops(P, [[20, 0, 34], [W, 0, 14], [0, D, 34], [20, D, 34], [W, D, 14]]),
          ],
        },
        {
          id: 4,
          instruction: 'Complete the visible edges. The tread and the top of the upright both run to LVP, the front edges to RVP; every vertical stays vertical.',
          calloutAt: P.persp(35, D / 2, 14),
          reveals: K.perspLines(P, edges, 'A'),
        },
      ],
    };
  })();

  // ── 3. Gable-roof building with a door and a window ──
  (function () {
    const L = 56, D = 34, WALL = 26, RIDGE = 42;
    // gable profile in (depth, height), extruded along the length
    const prof = [[0, 0], [D, 0], [D, WALL], [D / 2, RIDGE], [0, WALL]];
    const P = K.setup({ sx: 104, d: 120, yPP: 76, yGL: 176, h: 18, theta: 45, cx: 100 });
    const faces = K.extrude(prof, 'vz', 0, L);
    const edges = K.visibleEdges(P, faces);
    const { LVP, RVP } = P.vps;
    const EX = Math.round(P.vps.LVP[0]) - 54;
    const C0 = P.persp(0, 0, 0);
    const DOOR = { u0: 30, u1: 40, h: 20 };          // on the long side wall (v = 0)
    const WIN = { v0: 10, v1: 22, z0: 9, z1: 19 };   // on the gable end (u = 0)

    CONSTRUCTIONS['two-point-building'] = {
      printLayout: 'full',
      id: 'two-point-building', title: 'Two-Point Perspective: Gable-Roof Building',
      summary: 'A small building seen from a corner: the ridge height is measured on the true-height line and carried back to the middle of the gable, the door and window go on different receding walls.',
      bounds: { w: 340, h: 200 },
      workbookPrompt: 'Draw the building in two-point perspective with the top view at 45°/45°, touching PP at its near corner. SP is 120 mm in front of PP; the eye is 18 mm above GL. Show the door on the long wall and the window on the gable end.',
      steps: [
        {
          id: 1,
          instruction: 'Set up: the top view is at 45° on both sides, touching PP at the near corner (the ridge line drawn on it). From SP draw 45° lines left and right up to PP and drop them to HL: with 45°/45° the two VPs are the same distance either side of SP. Use a low HL for a natural standing view and draw the gable end (left view) on GL at the side.',
          calloutAt: P.plan(L / 2, D / 2),
          reveals: [
            ...setupReveals(P, [[0, 0], [L, 0], [L, D], [0, D]], EX - 26, RVP[0] + 4, [{ kind: 'line', p1: P.plan(0, D / 2), p2: P.plan(L, D / 2), lineType: 'A' }]),
            { kind: 'polygon', points: prof.map(([v, z]) => [EX + v, P.yGL - z]), lineType: 'A' },
            lbl([EX + D / 2, P.yGL + 7], 'LEFT VIEW / LINKERAANSIG'),
            { kind: 'polygon', points: [[EX + WIN.v0, P.yGL - WIN.z0], [EX + WIN.v1, P.yGL - WIN.z0], [EX + WIN.v1, P.yGL - WIN.z1], [EX + WIN.v0, P.yGL - WIN.z1]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'On the true-height line mark the wall height and the RIDGE height (the ridge is not on this corner, but its height is measured here). Join the wall height and the ground to both VPs, and the ridge height to LVP (the gable runs that way).',
          calloutAt: P.persp(0, 0, RIDGE),
          reveals: [
            { kind: 'line', p1: P.plan(0, 0), p2: C0, lineType: 'construction' },
            ...[WALL, RIDGE].map(z => ({ kind: 'line', p1: [EX + D, P.yGL - z], p2: P.persp(0, 0, z), lineType: 'construction' })),
            { kind: 'line', p1: C0, p2: P.persp(0, 0, RIDGE), lineType: 'construction' },
            ...[0, WALL].flatMap(z => [toVP(P, P.persp(0, 0, z), LVP), toVP(P, P.persp(0, 0, z), RVP)]),
            toVP(P, P.persp(0, 0, RIDGE), LVP),
          ],
        },
        {
          id: 3,
          instruction: 'Rays to the plan corners and to both ends of the ridge; drop verticals. The near ridge point is where its vertical cuts the ridge-height line to LVP. Join the far ridge end to RVP, then draw the visible outline.',
          calloutAt: P.persp(0, D / 2, RIDGE),
          reveals: [
            ...K.rays(P, [[L, 0], [0, D], [0, D / 2], [L, D / 2]]),
            ...K.drops(P, [[L, 0, 0], [0, D, 0], [0, D / 2, RIDGE], [L, D / 2, RIDGE]]),
            toVP(P, P.persp(0, D / 2, RIDGE), RVP),
            ...K.perspLines(P, edges, 'A'),
          ],
        },
        {
          id: 4,
          instruction: 'Door on the long wall: mark its sides in the top view, ray and drop; its height goes on the true-height line and runs to RVP. Window on the gable end: same idea, with its sill and head heights running to LVP.',
          calloutAt: P.persp((DOOR.u0 + DOOR.u1) / 2, 0, DOOR.h / 2),
          reveals: [
            ...K.rays(P, [[DOOR.u0, 0], [DOOR.u1, 0], [0, WIN.v0], [0, WIN.v1]]),
            toVP(P, P.persp(0, 0, DOOR.h), RVP),
            toVP(P, P.persp(0, 0, WIN.z0), LVP), toVP(P, P.persp(0, 0, WIN.z1), LVP),
            { kind: 'polyline', points: [P.persp(DOOR.u0, 0, 0), P.persp(DOOR.u0, 0, DOOR.h), P.persp(DOOR.u1, 0, DOOR.h), P.persp(DOOR.u1, 0, 0)], lineType: 'A' },
            { kind: 'polygon', points: [P.persp(0, WIN.v0, WIN.z0), P.persp(0, WIN.v1, WIN.z0), P.persp(0, WIN.v1, WIN.z1), P.persp(0, WIN.v0, WIN.z1)], lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 4. Grade 12: a block with a semicircular end (curves in perspective) ──
  (function () {
    const L = 40, R = 16, H = 24;
    const N = 12;                                   // arc divided every 15°
    const arc = Array.from({ length: N + 1 }, (_, i) => {
      const t = (-90 + 180 * i / N) * Math.PI / 180;
      return [L + R * Math.cos(t), R + R * Math.sin(t)];
    });
    const prof = [[0, 0], ...arc, [0, 2 * R]];
    // the arc and its two tangent ends are smooth: no edge line there except the outline
    const smooth = new Set(arc.map((_, i) => i + 1));
    const P = K.setup({ sx: 108, d: 118, yPP: 74, yGL: 172, h: 62, theta: 30, cx: 100 });
    const faces = K.extrude(prof, 'uv', 0, H, smooth);
    const edges = K.visibleEdges(P, faces);
    const { LVP, RVP } = P.vps;
    const EX = Math.round(P.vps.LVP[0]) - 54;
    const C0 = P.persp(0, 0, 0), C1 = P.persp(0, 0, H);
    const plotted = arc.filter((_, i) => i % 2 === 0);

    CONSTRUCTIONS['two-point-curved-end'] = {
      printLayout: 'full',
      id: 'two-point-curved-end', title: 'Curves in Perspective: Rounded-End Block (Gr 12)',
      summary: 'A curve is plotted point by point: divide the arc in the top view, send a visual ray to every point, and find each point\'s depth with a line to a VP. The outline of the curved side is where the rays just touch the arc.',
      bounds: { w: 330, h: 190 },
      workbookPrompt: 'Draw the block with the semicircular end (straight part 40, R16, 24 high) in two-point perspective. Divide the arc into at least 6 equal parts and plot each point at the top and the bottom.',
      steps: [
        {
          id: 1,
          instruction: 'Set up as usual: top view at 30° touching PP at the square corner, SP, VPs, GL and HL. Divide the semicircle in the top view into equal parts (every 30°).',
          calloutAt: P.plan(L + R, R),
          reveals: [
            ...setupReveals(P, prof, EX - 26, RVP[0] + 4).filter(r => r.kind !== 'polygon'),
            { kind: 'polyline', points: prof.map(([u, v]) => P.plan(u, v)).concat([P.plan(0, 0)]), lineType: 'A' },
            ...plotted.map(([u, v]) => ({ kind: 'point', at: P.plan(u, v), size: 0.9 })),
            lbl([P.plan(L, 2 * R)[0], P.plan(L, 2 * R)[1] - 8], 'TOP VIEW / BO-AANSIG'),
          ],
        },
        {
          id: 2,
          instruction: 'True-height line at the square corner, height from the front view; join its top and bottom to both VPs and draw the two straight sides.',
          calloutAt: [C0[0], (C0[1] + C1[1]) / 2],
          reveals: [
            { kind: 'line', p1: P.plan(0, 0), p2: C0, lineType: 'construction' },
            { kind: 'polygon', points: [[EX, P.yGL], [EX + L + R, P.yGL], [EX + L + R, P.yGL - H], [EX, P.yGL - H]], lineType: 'A' },
            lbl([EX + (L + R) / 2, P.yGL + 7], 'FRONT VIEW / VOORAANSIG'),
            { kind: 'line', p1: [EX + L + R, P.yGL - H], p2: C1, lineType: 'construction' },
            toVP(P, C0, LVP), toVP(P, C1, LVP), toVP(P, C0, RVP), toVP(P, C1, RVP),
          ],
        },
        {
          id: 3,
          instruction: 'Send a visual ray to EVERY point on the arc and drop verticals from PP. For each point\'s height: in the top view, draw a line from the point parallel to the long side until it meets PP. Heights are true there, so mark the height and join it to RVP; it cuts the point\'s dropped vertical at the right place (shown for the end point of the arc).',
          calloutAt: P.persp(L + R, R, H),
          reveals: [
            { kind: 'line', p1: P.plan(L + R, R), p2: P.plan(-R * P.cs / P.sn, R), lineType: 'construction' },
            { kind: 'line', p1: P.plan(-R * P.cs / P.sn, R), p2: P.persp(-R * P.cs / P.sn, R, 0), lineType: 'construction' },
            { kind: 'line', p1: P.persp(-R * P.cs / P.sn, R, 0), p2: P.persp(-R * P.cs / P.sn, R, H), lineType: 'B' },
            toVP(P, P.persp(-R * P.cs / P.sn, R, H), RVP), toVP(P, P.persp(-R * P.cs / P.sn, R, 0), RVP),
            ...K.rays(P, plotted),
            ...plotted.map(([u, v]) => ({ kind: 'point', at: P.persp(u, v, H), size: 0.8 })),
            ...plotted.filter(([u, v]) => frontFacing(P, u - L, v - R, u, v)).map(([u, v]) => ({ kind: 'point', at: P.persp(u, v, 0), size: 0.8 })),
            ...K.drops(P, plotted.map(([u, v]) => [u, v, 0])),
          ],
        },
        {
          id: 4,
          instruction: 'Join the points with smooth curves. The whole top curve shows; at the bottom, only the part facing you. The two vertical outline lines of the curved side are where the visual rays just touch the arc, not at the plotted points.',
          calloutAt: P.persp(L + R, R, 0),
          reveals: K.perspLines(P, edges, 'A'),
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'How many vanishing points does two-point perspective use, and where must they sit?',
      options: ['Two, both on the horizon (eye-level) line', 'Two, one above and one below the horizon', 'Three, forming a triangle around the object', 'One, exactly like one-point perspective'],
      answer: 0,
      explanation: 'Two-point perspective uses exactly two vanishing points, VPL and VPR, and both always lie on the horizon line, since the horizon represents the viewer\'s own eye level.',
    },
    {
      text: 'Which single line in a two-point perspective drawing can be measured true-to-scale directly?',
      options: ['The corner vertical, at the object\'s nearest point to the viewer', 'Any horizontal line receding to either VP', 'The horizon line itself', 'Every vertical line in the drawing, regardless of position'],
      answer: 0,
      explanation: 'Only the corner vertical sits at the picture plane, where distances are still true to scale. Every other vertical is still vertical in direction, but must have its height transferred from the corner.',
    },
    {
      text: 'Why does erecting a vertical between two projectors that both go to the SAME vanishing point automatically give the correct box height at that depth?',
      options: [
        'Because both the top and bottom projector are foreshortened by exactly the same amount at any given depth along that VP',
        'It does not — a separate height-transfer step is always required',
        'Because vanishing points only affect horizontal measurements, never vertical ones',
        'Because the vertical is always drawn at true, unforeshortened height'],
      answer: 0,
      explanation: 'Since top and bottom projectors both converge toward the same VP, they are foreshortened identically at any chosen depth — so the vertical distance between them at that depth is automatically correct.',
    },
    {
      text: 'A chimney is taller than the rest of the box. What is the correct way to find its true perspective height at a point partway along a receding base edge?',
      options: [
        'Mark the new true height on the corner vertical, draw a new line from there to the same VP, then erect a vertical at the point up to that new line',
        'Simply estimate the extra height by eye and extend the vertical upward',
        'Use the OTHER vanishing point instead of the one the base edge converges to',
        'True heights can only ever be found at the corner vertical itself, nowhere else'],
      answer: 0,
      explanation: 'The corner vertical is the only true-height measuring line. A new height is marked there, receded to the same VP as the target point\'s base edge, and the crossing point gives the correct foreshortened height.',
    },
    {
      text: 'How is the exact centre of a receding face found in perspective, when a simple eye-measured midpoint would be wrong?',
      options: [
        'By drawing both diagonals of the face and marking where they cross',
        'By measuring the face with a ruler directly on the finished drawing',
        'By using the horizon line as a reference for the centre',
        'The centre of a receding face cannot be found accurately at all'],
      answer: 0,
      explanation: 'The two diagonals of any quadrilateral cross exactly at its centre — this holds true even for a foreshortened, receding face in perspective, unlike a naive eye-measured halfway point.',
    },
    {
      text: 'In a "worm\'s-eye" two-point perspective view, where does the horizon sit relative to the object, and what happens to the top face?',
      options: [
        'The horizon sits BELOW the whole object, and the top face disappears from view entirely',
        'The horizon sits ABOVE the object, revealing more of the top face',
        'The horizon passes through the object\'s exact centre',
        'Worm\'s-eye views do not use a horizon line at all'],
      answer: 0,
      explanation: 'A worm\'s-eye view means looking steeply upward at the object, which happens when the horizon is placed below it — from that angle, the top face is hidden and both top edges slope upward toward their vanishing points.',
    },
    {
      text: 'What is the purpose of the "true-height" line drawn from a marked point on the corner vertical toward a vanishing point?',
      options: [
        'It shows the correctly foreshortened version of that exact height at every depth along that line',
        'It marks the position of the horizon for that particular feature',
        'It is only a construction aid with no meaning in the final drawing',
        'It represents the true WIDTH of the object, not its height'],
      answer: 0,
      explanation: 'Once a true height is marked on the corner (the only true-scale reference), receding that point to a VP produces a line showing that same height, correctly foreshortened, at any depth position along it.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'two-point-setup', 'two-point-stepped-block', 'two-point-building', 'two-point-curved-end',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
