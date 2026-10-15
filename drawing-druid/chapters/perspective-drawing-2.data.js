// Perspective Drawing II — Grade 11-12: two-point perspective by the plan (measured) method,
// with curved work for Grade 12. Requires engine-geometry.js, perspective-kit.js and solid-kit.js.
(function (global) {
  'use strict';
  const K = global.PerspectiveKit;
  const SK = global.SolidKit;
  const CONSTRUCTIONS = {};

  const lbl = (at, text, anchor, size, color) => ({ kind: 'label', at, text, size: size || 3.4, anchor: anchor || 'middle', color: color || '#94a3b8' });
  const line = (a, b, t) => ({ kind: 'line', p1: a, p2: b, lineType: t || 'construction' });
  const keyUV = (u, v) => u.toFixed(2) + ',' + v.toFixed(2);

  // One two-point exercise from a 3D model (object axes: u along the right-receding side,
  // v along the left-receding side, z up; the corner u = v = 0 touches PP).
  function twoPoint(cfg) {
    const P = K.setup(Object.assign({ cx: cfg.setup.sx }, cfg.setup));
    const { LVP, RVP, LPP, RPP } = P.vps;
    const view = SK.perspView(P);
    const fin = SK.hlr(cfg.solids, view);
    const planView = { toViewer: () => [0, 0, 1], distance: () => Infinity, project: p => P.plan(p[0], p[1]) };
    const plan = SK.draw(cfg.planSolids || cfg.solids, planView, { hidden: true });
    let uMax = 0, vMax = 0, zMax = 0;
    cfg.solids.forEach(s => s.forEach(f => f.pts.forEach(p => { uMax = Math.max(uMax, p[0]); vMax = Math.max(vMax, p[1]); zMax = Math.max(zMax, p[2]); })));
    // perspective extents, to place the given views either side of it on GL
    let px0 = Infinity, px1 = -Infinity;
    fin.visible.forEach(s => s.forEach(p => { const x = view.project(p)[0]; px0 = Math.min(px0, x); px1 = Math.max(px1, x); }));
    const gap = cfg.viewGap || 10;
    const lvRight = px0 - gap;                                  // LEFT VIEW: v runs to the left, front (v = 0) at its right edge
    const fvLeft = px1 + gap;                                   // FRONT VIEW: u runs to the right
    const leftView = { toViewer: () => [-1, 0, 0], distance: () => Infinity, project: p => [lvRight - p[1], P.yGL - p[2]] };
    const frontView = { toViewer: () => [0, -1, 0], distance: () => Infinity, project: p => [fvLeft + p[0], P.yGL - p[2]] };
    const lv = SK.draw(cfg.solids, leftView, { hidden: true });
    const fv = SK.draw(cfg.solids, frontView, { hidden: true });
    const x0 = Math.min(lvRight - vMax, LVP[0]) - 14, x1 = Math.max(fvLeft + uMax, RVP[0]) + 8;

    // true heights: every height a visible corner has, marked on the corner touching PP
    const heights = [...new Set(fin.visible.flatMap(s => s.map(p => +p[2].toFixed(3))))].filter(z => z > 1e-6).sort((a, b) => a - b);
    const C0 = P.persp(0, 0, 0);
    // plan points for rays: every visible corner not on the true-height line
    const depth = new Map();
    fin.visible.forEach(seg => seg.forEach(p => {
      if (Math.abs(p[0]) < 1e-6 && Math.abs(p[1]) < 1e-6) return;
      const k = keyUV(p[0], p[1]);
      if (!depth.has(k) || depth.get(k)[2] < p[2]) depth.set(k, p);
    }));
    const dpts = [...depth.values()];
    const notes = cfg.notes || [];

    CONSTRUCTIONS[cfg.id] = {
      id: cfg.id, title: cfg.title, summary: cfg.summary, workbookPrompt: cfg.prompt,
      printLayout: 'full', bounds: { w: x1 - x0, h: 200 },
      steps: [
        {
          id: 1,
          instruction: 'Set up: the TOP VIEW turned at ' + cfg.setup.theta + '° (right) and ' + (90 - cfg.setup.theta) + '° (left), touching PP at its nearest corner. From SP draw lines at those same angles, to the right and to the left, up to PP; drop them to the HL for RVP and LVP. Draw the given LEFT and FRONT views on GL. ' + (notes[0] || ''),
          calloutAt: RVP,
          reveals: [
            ...K.frame(P, x0, x1),
            ...plan,
            lbl([P.plan(uMax / 2, vMax / 2)[0], P.plan(uMax / 2, vMax / 2)[1] - Math.max(uMax, vMax) * 0.55 - 6], 'TOP VIEW / BO-AANSIG'),
            ...K.spMark(P),
            line(P.SP, LPP), line(P.SP, RPP), line(LPP, LVP), line(RPP, RVP),
            { kind: 'point', at: LVP, label: 'LVP', size: 1.3 },
            { kind: 'point', at: RVP, label: 'RVP', size: 1.3 },
            ...lv, lbl([lvRight - vMax / 2, P.yGL + 7], 'LEFT VIEW / LINKERAANSIG'),
            ...fv, lbl([fvLeft + uMax / 2, P.yGL + 7], 'FRONT VIEW / VOORAANSIG'),
          ],
        },
        {
          id: 2,
          instruction: 'The corner touching PP is the TRUE-HEIGHT LINE. Drop it from PP and mark every height on it, projected across from the given views. Join the marks to both vanishing points. ' + (notes[1] || ''),
          calloutAt: [C0[0], C0[1] - zMax / 2],
          reveals: [
            line(P.plan(0, 0), C0),
            line(C0, P.persp(0, 0, zMax), 'B'),
            ...heights.map(z => line([lvRight, P.yGL - z], P.persp(0, 0, z))),
            ...[0].concat(heights).flatMap(z => [line(P.persp(0, 0, z), LVP), line(P.persp(0, 0, z), RVP)]),
          ],
        },
        {
          id: 3,
          instruction: 'Draw visual rays from SP to the corners of the top view; where each crosses PP, drop a vertical line into the drawing. ' + (notes[2] || ''),
          calloutAt: P.onPP(uMax, 0),
          reveals: [
            ...dpts.map(p => line(P.SP, P.plan(p[0], p[1]))),
            ...dpts.map(p => line(P.onPP(p[0], p[1]), P.persp(p[0], p[1], p[2]))),
          ],
        },
        {
          id: 4,
          instruction: 'Each corner is where its dropped vertical meets the right VP line. Heights of parts that are not on the corner are carried along the VP lines from their true-height mark. Line in all visible edges; hidden edges are left out. ' + (notes[3] || ''),
          calloutAt: P.persp(uMax / 2, vMax / 2, zMax),
          reveals: fin.visible.map(([p, q]) => line(view.project(p), view.project(q), 'A')),
        },
      ],
    };
  }

  const S = SK;

  // 1. Block at 45° / 45°
  twoPoint({
    id: 'two-point-block', title: 'Two-Point: Block at 45° / 45°',
    summary: 'The two-point set-up with a plain block turned 45° each way: both VPs the same distance either side of SP.',
    prompt: 'Draw the block (40 x 40 x 30) in two-point perspective. The top view is at 45° / 45° touching PP at its nearest corner; SP and HL are as given.',
    setup: { sx: 190, d: 105, yPP: 72, yGL: 168, h: 58, theta: 45 },
    solids: [S.box(0, 0, 0, 40, 40, 30)],
  });

  // 2. L-block at 30° / 60°
  twoPoint({
    id: 'two-point-l-block', title: 'Two-Point: L-Block at 30° / 60°',
    summary: 'An L-shaped block: the step\'s height is marked on the true-height line and carried along a VP line to where the step is.',
    prompt: 'Draw the L-block in two-point perspective. The top view is at 30° (right) / 60° (left), touching PP at its nearest corner.',
    setup: { sx: 150, d: 110, yPP: 70, yGL: 168, h: 60, theta: 30 },
    solids: [S.extrude([[0, 0], [50, 0], [50, 16], [22, 16], [22, 36], [0, 36]], 'xz', 0, 32)],
  });

  // 3. Block with a sloping face at 45° / 45°
  twoPoint({
    id: 'two-point-sloped-block', title: 'Two-Point: Block with a Sloping Face',
    summary: 'A block with one sloping face: the sloping edges are not drawn to a VP, they are found by joining their two end points.',
    prompt: 'Draw the block with the sloping face in two-point perspective at 45° / 45°.',
    setup: { sx: 186, d: 108, yPP: 72, yGL: 168, h: 62, theta: 45 },
    solids: [S.extrude([[0, 0], [48, 0], [48, 14], [24, 36], [0, 36]], 'xz', 0, 34)],
    notes: ['', '', '', 'The sloping edges do not go to a VP: join their two ends.'],
  });

  // 4. Hexagonal prism on a square base at 30° / 60°
  (function () {
    const R = 16, cx = 25, cy = 25;
    const hex = Array.from({ length: 6 }, (_, i) => { const a = (i * 60) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
    twoPoint({
      id: 'two-point-hex-prism', title: 'Two-Point: Hexagonal Prism on a Base',
      summary: 'A hexagonal prism on a square base. The hexagon\'s corners are not on the base edges, so every corner needs its own ray and its height carried along VP lines.',
      prompt: 'Draw the hexagonal prism (across corners 32, 36 high) standing on the square base (50 x 50 x 10) in two-point perspective at 30° / 60°.',
      setup: { sx: 150, d: 112, yPP: 72, yGL: 170, h: 70, theta: 30 },
      solids: [S.box(0, 0, 0, 50, 50, 10), S.extrude(hex, 'xy', 10, 46)],
      notes: ['', '', 'Send a ray to every corner of the hexagon.', 'Each hexagon corner\'s vertical edge stands where its ray drops; its top and bottom heights come along VP lines from the true-height line.'],
    });
  })();

  // 5. T-shaped base with a block on top at 45° / 45°
  twoPoint({
    id: 'two-point-t-model', title: 'Two-Point: T-Base with an Upright Block',
    summary: 'A T-shaped base with an upright block standing on it: a model with corners at several depths and heights.',
    prompt: 'Draw the model in two-point perspective at 45° / 45° from the given views.',
    setup: { sx: 196, d: 110, yPP: 74, yGL: 172, h: 66, theta: 45 },
    solids: [S.extrude([[0, 0], [60, 0], [60, 18], [40, 18], [40, 40], [20, 40], [20, 18], [0, 18]], 'xy', 0, 10), S.box(22, 2, 10, 38, 16, 38)],
  });

  // 6. Gable-roof house with door and windows at 30° / 60°  (1:100)
  (function () {
    const house = S.extrude([[0, 0], [40, 0], [40, 24], [20, 36], [0, 24]], 'yz', 0, 62);
    S.openingAt(house, 0, [0, 10, 9], [0, 30, 19], 2.5);          // window in the gable end (u = 0 face)
    const longWall = house.findIndex(f => f.n[1] < -0.9);
    S.openingAt(house, longWall, [12, 0, 0], [21, 0, 21], 2.5);   // door
    S.openingAt(house, longWall, [34, 0, 9], [52, 0, 19], 2.5);   // window
    twoPoint({
      id: 'two-point-gable-house', title: 'Two-Point: Gable-Roof House',
      summary: 'A house seen from its corner: the ridge height is marked on the true-height line and carried back to the middle of the gable; doors and windows show the wall thickness.',
      prompt: 'Draw the house in two-point perspective at 1:100, 30° / 60°. Show the wall thickness at the openings.',
      setup: { sx: 160, d: 125, yPP: 80, yGL: 180, h: 18, theta: 30 },
      solids: [house],
      notes: ['The gable end faces left.', 'Mark the ridge height on the true-height line too, even though the ridge is not on this corner.', 'Rays also go to both ends of the ridge.', ''],
    });
  })();

  // 7. Hipped-roof house with a veranda at 45° / 45°  (1:100)
  (function () {
    const walls = S.box(0, 12, 0, 56, 52, 26);
    S.openingAt(walls, 2, [10, 12, 0], [19, 12, 21], 2.5);
    S.openingAt(walls, 2, [30, 12, 9], [48, 12, 19], 2.5);
    const roof = S.hipRoof(-3, 9, 59, 55, 26, 42);
    const veranda = S.box(0, 0, 26, 56, 12, 28);
    const posts = [0, 26, 53].map(x => S.box(x, 0, 0, x + 3, 3, 26));
    const floor = S.box(0, 0, 0, 56, 12, 2);
    twoPoint({
      id: 'two-point-hip-veranda', title: 'Two-Point: Hipped Roof with a Veranda',
      summary: 'A hipped-roof house with a flat-roofed veranda on posts in front. The veranda roof hides part of the front wall; the hips run from the eave corners to the ridge ends.',
      prompt: 'Draw the house with its veranda in two-point perspective at 1:100, 45° / 45°.',
      setup: { sx: 196, d: 130, yPP: 82, yGL: 184, h: 16, theta: 45 },
      solids: [walls, roof, veranda, floor, ...posts],
      notes: ['', 'Mark the eaves, ridge, veranda roof and opening heights on the true-height line.', 'Include the posts and the hip and ridge ends.', 'Look at what the veranda roof hides.'],
    });
  })();

  // 8. House with a chimney and a garage at 30° / 60°  (1:100)
  (function () {
    const house = S.extrude([[0, 0], [36, 0], [36, 24], [18, 36], [0, 24]], 'yz', 0, 48);
    const chimney = S.box(30, 4, 28, 37, 11, 44);
    const garage = S.box(48, 0, 0, 74, 30, 22);
    const gFront = garage.findIndex(f => f.n[1] < -0.9);
    S.openingAt(garage, gFront, [51, 0, 0], [71, 0, 18], 2.5);
    const hFront = house.findIndex(f => f.n[1] < -0.9);
    S.openingAt(house, hFront, [8, 0, 0], [17, 0, 21], 2.5);
    S.openingAt(house, hFront, [24, 0, 9], [40, 0, 19], 2.5);
    twoPoint({
      id: 'two-point-house-garage', title: 'Two-Point: House with Chimney and Garage',
      summary: 'A gable-roof house with a chimney through the roof and a flat-roofed garage at one end.',
      prompt: 'Draw the house, chimney and garage in two-point perspective at 1:100, 30° / 60°.',
      setup: { sx: 150, d: 128, yPP: 84, yGL: 184, h: 20, theta: 30 },
      solids: [house, chimney, garage],
      notes: ['', '', 'The chimney needs rays to its corners; its base is where it comes through the roof slope.', ''],
    });
  })();

  // 9. Two-storey house at 60° / 30°  (1:100)
  (function () {
    const lower = S.box(0, 0, 0, 40, 50, 26);
    const upper = S.extrude([[0, 26], [40, 26], [40, 48], [20, 60], [0, 48]], 'xz', 0, 34);
    const lf = lower.findIndex(f => f.n[1] < -0.9);
    S.openingAt(lower, lf, [6, 0, 0], [15, 0, 21], 2.5);
    S.openingAt(lower, lf, [22, 0, 9], [36, 0, 19], 2.5);
    const uf = upper.findIndex(f => f.n[1] < -0.9);
    S.openingAt(upper, uf, [12, 0, 32], [28, 0, 42], 2.5);
    const flat = S.box(0, 34, 26, 40, 50, 28);
    twoPoint({
      id: 'two-point-double-storey', title: 'Two-Point: Double-Storey House',
      summary: 'A double-storey house: the upper floor with its gable stands on part of the lower floor, the rest has a flat roof.',
      prompt: 'Draw the double-storey house in two-point perspective at 1:100, 60° (right) / 30° (left).',
      setup: { sx: 196, d: 120, yPP: 82, yGL: 186, h: 20, theta: 60 },
      solids: [lower, upper, flat],
    });
  })();

  // 10. Braai area at 45° / 45°  (1:100)
  (function () {
    const slab = S.box(0, 0, 0, 60, 44, 2);
    const wallL = S.box(0, 0, 2, 4, 44, 12);
    const braai = S.box(30, 32, 2, 52, 44, 16);
    S.openingAt(braai, braai.findIndex(f => f.n[1] < -0.9), [34, 32, 5], [48, 32, 12], 6);
    const chimney = S.box(36, 38, 16, 46, 44, 44);
    const bench = S.box(12, 8, 2, 30, 14, 7);
    twoPoint({
      id: 'two-point-braai-area', title: 'Two-Point: Braai Area',
      summary: 'An outdoor braai area: a paved slab, a low side wall, a bench and a braai with its chimney.',
      prompt: 'Draw the braai area in two-point perspective at 1:100, 45° / 45°.',
      setup: { sx: 196, d: 120, yPP: 76, yGL: 176, h: 40, theta: 45 },
      solids: [slab, wallL, braai, chimney, bench],
    });
  })();

  // 11. Bathroom interior at 45° / 45°  (1:100)
  (function () {
    const U = 56, V = 56, H = 28, F = SK.face;
    const room = [
      F([[0, 0, 0], [U, 0, 0], [U, V, 0], [0, V, 0]], { n: [0, 0, 1] }),     // floor
      F([[U, 0, 0], [U, V, 0], [U, V, H], [U, 0, H]], { n: [-1, 0, 0] }),    // right back wall
      F([[0, V, 0], [U, V, 0], [U, V, H], [0, V, H]], { n: [0, -1, 0] }),    // left back wall
    ];
    SK.openingAt(room, 2, [16, V, 14], [32, V, 22], 2.5);
    const bath = S.box(U - 14, 8, 0, U, 44, 8);
    const basin = S.box(6, V - 9, 0, 20, V, 12);
    const wc = S.box(28, V - 12, 0, 36, V, 6);
    const cistern = S.box(27, V - 4, 6, 37, V, 12);
    twoPoint({
      id: 'two-point-bathroom-interior', title: 'Two-Point: Bathroom Interior',
      summary: 'An interior in two-point: you look into the corner of a bathroom. The two back walls run to the two VPs; the bath, basin cabinet and WC are boxes found with rays and VP lines.',
      prompt: 'Draw the bathroom interior in two-point perspective at 1:100: the floor, the two back walls with the window, the bath, the basin cabinet and the WC.',
      setup: { sx: 196, d: 110, yPP: 74, yGL: 172, h: 20, theta: 45 },
      solids: [room, bath, basin, wc, cistern],
      notes: ['For an interior the near walls are left away, so you can see in: the corner of the floor nearest you touches PP.', '', '', 'You see the inside faces of the back walls.'],
    });
  })();

  // 12. Grade 12: a block with a semicircular end (curves in perspective)
  (function () {
    const L = 40, R = 16, N = 12;
    const arc = Array.from({ length: N + 1 }, (_, i) => { const t = (-90 + 180 * i / N) * Math.PI / 180; return [L + R * Math.cos(t), R + R * Math.sin(t)]; });
    const prof = [[0, 0], ...arc, [0, 2 * R]];
    const smooth = new Set(arc.map((_, i) => i + 1));
    twoPoint({
      id: 'two-point-curved-end', title: 'Curves in Perspective: Rounded-End Block (Gr 12)',
      summary: 'A curve is plotted point by point: divide the arc in the top view, send a visual ray to every point, and carry each point\'s heights along VP lines. The outline of the curved side is where the rays just touch the arc.',
      prompt: 'Draw the block with the semicircular end (straight part 40, R16, 24 high) in two-point perspective at 30° / 60°. Plot at least 7 points on the arc.',
      setup: { sx: 150, d: 112, yPP: 72, yGL: 168, h: 62, theta: 30 },
      solids: [S.extrude(prof, 'xy', 0, 24, smooth)],
      notes: ['Divide the semicircle in the top view into equal parts.', '', 'Every arc point gets its own ray.', 'Join the points with smooth curves; the two outline lines of the curved side are where the rays touch the arc.'],
    });
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
    'two-point-block', 'two-point-l-block', 'two-point-sloped-block', 'two-point-hex-prism',
    'two-point-t-model', 'two-point-gable-house', 'two-point-hip-veranda', 'two-point-house-garage',
    'two-point-double-storey', 'two-point-braai-area', 'two-point-bathroom-interior', 'two-point-curved-end',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
