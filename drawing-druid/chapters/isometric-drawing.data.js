// Isometric Drawing — Chapter 4 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // The two receding isometric axes: 30° above horizontal, left and right of vertical.
  const U = [Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6)]; // right axis (width)
  const V = [Math.cos(7 * Math.PI / 6), Math.sin(7 * Math.PI / 6)]; // left axis (depth)
  function iso(origin, a, b) { return [origin[0] + a * U[0] + b * V[0], origin[1] + a * U[1] + b * V[1]]; }
  function raise(p, h) { return [p[0], p[1] - h]; } // true vertical axis: always straight up on screen
  function isoFront(origin, a, b) { return [origin[0] + a * U[0], origin[1] + a * U[1] - b]; } // width axis + true vertical
  function lerp(p1, p2, t) { return [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t]; }


  // ── 3D → isometric ──
  // x = width (the right-hand 30° axis), y = depth (the left-hand 30° axis), z = height (vertical).
  // Every part below is defined in 3D and projected, so lengths along the axes are true and
  // ellipses touch their isometric squares exactly at the mid-points of the sides.
  const C30 = Math.cos(Math.PI / 6);
  function P(o, x, y, z) { return [o[0] + (x - y) * C30, o[1] - (x + y) * 0.5 - z]; }
  // The viewer looks down from the front corner: a face is visible when its outward
  // normal points towards (-1, -1, 1). Isometric drawings show no hidden detail, so only
  // the edges of visible faces are drawn.
  const VIEW = [-1, -1, 1];

  // Extrude a 2D profile (anticlockwise in its own a-b axes) into a prism.
  //   'xz': profile (x, z), extruded along y from t0 to t1
  //   'yz': profile (y, z), extruded along x
  //   'xy': profile (x, y), extruded along z
  function extrude(profile, plane, t0, t1) {
    const to3 = (a, b, t) => plane === 'xz' ? [a, t, b] : plane === 'yz' ? [t, a, b] : [a, b, t];
    const n3 = (na, nb) => plane === 'xz' ? [na, 0, nb] : plane === 'yz' ? [0, na, nb] : [na, nb, 0];
    const axis = plane === 'xz' ? [0, 1, 0] : plane === 'yz' ? [1, 0, 0] : [0, 0, 1];
    const faces = [];
    faces.push({ pts: profile.map(([a, b]) => to3(a, b, t0)), n: axis.map(v => -v), cap: 0 });
    faces.push({ pts: profile.map(([a, b]) => to3(a, b, t1)), n: axis, cap: 1 });
    profile.forEach((p, i) => {
      const q = profile[(i + 1) % profile.length];
      faces.push({ pts: [to3(p[0], p[1], t0), to3(q[0], q[1], t0), to3(q[0], q[1], t1), to3(p[0], p[1], t1)], n: n3(q[1] - p[1], -(q[0] - p[0])) });
    });
    return faces;
  }

  function visibleEdges(faces) {
    const seen = new Set(), edges = [];
    const key = p => p.map(v => v.toFixed(3)).join(',');
    faces.forEach(f => {
      if (f.n[0] * VIEW[0] + f.n[1] * VIEW[1] + f.n[2] * VIEW[2] <= 1e-9) return;
      f.pts.forEach((p, i) => {
        const q = f.pts[(i + 1) % f.pts.length];
        const k = [key(p), key(q)].sort().join('|');
        if (seen.has(k)) return;
        seen.add(k);
        edges.push([p, q]);
      });
    });
    return edges;
  }

  function lines3(o, edges, lineType) {
    return edges.map(([p, q]) => ({ kind: 'line', p1: P(o, ...p), p2: P(o, ...q), lineType }));
  }

  // The thin enclosing box (crate) every isometric is built in: its visible edges.
  function crate(o, W, D, H) {
    return lines3(o, visibleEdges(extrude([[0, 0], [W, 0], [W, H], [0, H]], 'xz', 0, D)), 'construction');
  }

  // A true circle on one of the three isometric planes, as projected points.
  function isoCircle(o, c, r, plane, a0, a1, n) {
    a0 = a0 == null ? 0 : a0; a1 = a1 == null ? 360 : a1; n = n || 48;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = (a0 + (a1 - a0) * i / n) * Math.PI / 180;
      const u = r * Math.cos(t), v = r * Math.sin(t);
      const p3 = plane === 'xy' ? [c[0] + u, c[1] + v, c[2]] : plane === 'xz' ? [c[0] + u, c[1], c[2] + v] : [c[0], c[1] + u, c[2] + v];
      pts.push(P(o, ...p3));
    }
    return pts;
  }

  // 45° hatching on a rectangular cut face, drawn in the plane of that face.
  //   origin: 3D corner; uDir/vDir: unit 3D directions of the face's sides; U, V: their lengths.
  function hatchFace(o, origin, uDir, U, vDir, V, spacing, mirror) {
    const out = [];
    const at = (u, v) => P(o, origin[0] + uDir[0] * u + vDir[0] * v, origin[1] + uDir[1] * u + vDir[1] * v, origin[2] + uDir[2] * u + vDir[2] * v);
    for (let k = -V + spacing / 2; k < U; k += spacing) {
      // line u - v = k (or u + v = k + V when mirrored), clipped to the face
      const vLo = Math.max(0, -k), vHi = Math.min(V, U - k);
      if (vHi <= vLo) continue;
      const a = mirror ? [U - (vLo + k), vLo] : [vLo + k, vLo];
      const b = mirror ? [U - (vHi + k), vHi] : [vHi + k, vHi];
      out.push({ kind: 'line', p1: at(...a), p2: at(...b), lineType: 'B' });
    }
    return out;
  }

  // Start corner marker, as on the given views: a short arrow up to the corner and a letter.
  function startMark(pt, letter) {
    return [
      { kind: 'line', p1: [pt[0], pt[1] + 7], p2: [pt[0], pt[1] + 1.5], lineType: 'B' },
      { kind: 'polyline', points: [[pt[0] - 1.3, pt[1] + 3.6], [pt[0], pt[1] + 1.5], [pt[0] + 1.3, pt[1] + 3.6]], lineType: 'B' },
      { kind: 'label', at: [pt[0], pt[1] + 11.5], text: letter, size: 4, anchor: 'middle', color: '#e8eaf2' },
    ];
  }

  // ── 1. Isometric Wedge: Isometric vs Non-Isometric Lines ──
  (function () {
    const O = [80, 120];
    const W = 60, D = 40, H = 35;
    // A triangular prism: its end profile (depth, height) has a sloping face from the front
    // bottom edge up to the back top edge.
    const pO = P(O, 0, 0, 0), pA = P(O, W, 0, 0), pB = P(O, 0, D, 0), pBt = P(O, 0, D, H), pCt = P(O, W, D, H);
    global.ISO_WEDGE = { O: pO, A: pA, B: pB, Bt: pBt, Ct: pCt };

    CONSTRUCTIONS['isometric-wedge'] = {
      id: 'isometric-wedge', title: 'Isometric Wedge',
      summary: 'Build a wedge inside its enclosing box from the three isometric axes; its sloping edges are non-isometric, so they are found by their end points, never measured.',
      bounds: { w: 170, h: 140 },
      workbookPrompt: 'Draw the wedge (60 long, 40 deep, 35 high) in isometric. Build the enclosing box in thin lines from corner O, mark the corners of the wedge on it, then join the two sloping (non-isometric) edges.',
      steps: [
        {
          id: 1,
          instruction: 'From the lowest front corner O, draw the three isometric axes: one vertical, and two at 30° to the horizontal, to the right (length) and to the left (depth).',
          calloutAt: pO,
          reveals: [
            { kind: 'line', p1: pO, p2: P(O, 0, 0, 20), lineType: 'construction' },
            { kind: 'line', p1: pO, p2: P(O, 22, 0, 0), lineType: 'construction' },
            { kind: 'line', p1: pO, p2: P(O, 0, 22, 0), lineType: 'construction' },
            { kind: 'point', at: pO, label: 'O' },
          ],
        },
        {
          id: 2,
          instruction: 'Build the enclosing box in thin construction lines: measure the TRUE length (60), depth (40) and height (35) along the axes. Every edge of the box is isometric, so it can be measured directly.',
          calloutAt: P(O, W, 0, H / 2),
          reveals: crate(O, W, D, H),
        },
        {
          id: 3,
          instruction: 'Mark the wedge\'s corners on the box and draw its isometric edges with Type A lines: the front edge O–A, the end edge O–B, the vertical back edge at B and the top back edge. All of them lie along an axis.',
          calloutAt: P(O, W / 2, D, H),
          reveals: [
            { kind: 'line', p1: pO, p2: pA, lineType: 'A' },
            { kind: 'line', p1: pO, p2: pB, lineType: 'A' },
            { kind: 'line', p1: pB, p2: pBt, lineType: 'A' },
            { kind: 'line', p1: pBt, p2: pCt, lineType: 'A' },
            { kind: 'point', at: pA, label: 'A' }, { kind: 'point', at: pB, label: 'B' },
          ],
        },
        {
          id: 4,
          instruction: 'Now join O to the top of B, and A to the far top corner. These sloping edges are NON-isometric: they are not parallel to any axis, so their length cannot be measured on the drawing. Their end points were found on the box, so simply join them. The back corner under the slope is hidden and is not drawn.',
          calloutAt: [(pO[0] + pBt[0]) / 2, (pO[1] + pBt[1]) / 2],
          reveals: [
            { kind: 'line', p1: pO, p2: pBt, lineType: 'A' },
            { kind: 'line', p1: pA, p2: pCt, lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'Dimension the length, depth and height. On an isometric drawing, dimensions are measured along the isometric axes only.',
          calloutAt: P(O, W / 2, 0, -8),
          reveals: [
            { kind: 'dimension', p1: pO, p2: pA, offset: 10, text: String(W) },
            { kind: 'dimension', p1: pB, p2: pO, offset: 10, text: String(D) },
            { kind: 'dimension', p1: pBt, p2: pB, offset: 10, text: String(H) },
          ],
        },
      ],
    };
  })();

  // ── 2. Isometric Circle: Ordinate Method ──
  (function () {
    const O = [70, 112];
    const S = 50, R = S / 2;
    const c3 = [R, R, 0];
    // Auxiliary view: the circle in true shape, in its square, with the ordinates used to
    // transfer points (every 30°).
    const AUX = { x: 128, y: 40 };
    const ords = [R * Math.cos(Math.PI / 6), R / 2];
    const angles = Array.from({ length: 12 }, (_, i) => i * 30);
    const isoPts = angles.map(a => P(O, R + R * Math.cos(a * Math.PI / 180), R + R * Math.sin(a * Math.PI / 180), 0));
    const auxPts = angles.map(a => [AUX.x + R + R * Math.cos(a * Math.PI / 180), AUX.y + R - R * Math.sin(a * Math.PI / 180)]);

    CONSTRUCTIONS['isometric-circle'] = {
      id: 'isometric-circle', title: 'Isometric Circle',
      summary: 'A circle on a horizontal face becomes an ellipse in isometric. Plot it by ordinates: points measured on the true circle in an auxiliary view are transferred into the isometric square.',
      bounds: { w: 185, h: 130 },
      workbookPrompt: 'Draw a 50 mm circle on a horizontal face in isometric, using the ordinate method. Draw the true circle as an auxiliary view first and transfer at least 12 points.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the circle\'s enclosing square in isometric: a rhombus with 50 mm sides along the two 30° axes. Add the two centre lines through its middle, parallel to the sides. The ellipse will touch the rhombus at the four mid-points of its sides.',
          calloutAt: P(O, R, R, 0),
          reveals: [
            { kind: 'polygon', points: [P(O, 0, 0, 0), P(O, S, 0, 0), P(O, S, S, 0), P(O, 0, S, 0)], lineType: 'construction' },
            { kind: 'line', p1: P(O, -6, R, 0), p2: P(O, S + 6, R, 0), lineType: 'centre' },
            { kind: 'line', p1: P(O, R, -6, 0), p2: P(O, R, S + 6, 0), lineType: 'centre' },
            ...[0, 3, 6, 9].map(i => ({ kind: 'point', at: isoPts[i], size: 1.1 })),
          ],
        },
        {
          id: 2,
          instruction: 'AUXILIARY VIEW: draw the circle in its TRUE shape in a 50 mm square. Divide it every 30° and draw ordinates (lines parallel to one side) through the points. Each point is now fixed by two measurements from the corner of the square.',
          calloutAt: [AUX.x + R, AUX.y + R],
          reveals: [
            { kind: 'polygon', points: [[AUX.x, AUX.y], [AUX.x + S, AUX.y], [AUX.x + S, AUX.y + S], [AUX.x, AUX.y + S]], lineType: 'construction' },
            { kind: 'circle', center: [AUX.x + R, AUX.y + R], r: R, lineType: 'B' },
            ...[-1, 1].flatMap(sg => ords.map(d => ({ kind: 'line', p1: [AUX.x + R + sg * d, AUX.y], p2: [AUX.x + R + sg * d, AUX.y + S], lineType: 'construction' }))),
            ...auxPts.map(p => ({ kind: 'point', at: p, size: 1 })),
            { kind: 'label', at: [AUX.x + R, AUX.y - 5], text: 'AUXILIARY VIEW', size: 3.6, anchor: 'middle', color: '#94a3b8' },
          ],
        },
        {
          id: 3,
          instruction: 'Transfer the ordinates into the rhombus (parallel to its sides, at the same distances), then step off each point along its ordinate with dividers. You now have 12 points on the isometric circle.',
          calloutAt: isoPts[1],
          reveals: [
            ...[-1, 1].flatMap(sg => ords.map(d => ({ kind: 'line', p1: P(O, R + sg * d, 0, 0), p2: P(O, R + sg * d, S, 0), lineType: 'construction' }))),
            ...isoPts.map(p => ({ kind: 'point', at: p, size: 1.1 })),
          ],
        },
        {
          id: 4,
          instruction: 'Join the points with a smooth freehand curve, or a French curve, in a Type A line. Check that the ellipse just touches the rhombus at the four mid-points, and that its long axis lies along the long diagonal.',
          calloutAt: isoPts[0],
          reveals: [{ kind: 'polyline', points: isoCircle(O, c3, R, 'xy'), lineType: 'A' }],
        },
      ],
    };
  })();

  // ── 3. Isometric Hexagonal Prism (Box Method for Polygons) ──
  (function () {
    const O = [78, 128];
    const R = 25, h = R * Math.sqrt(3) / 2, W = 2 * R, D = 2 * h, H = 30;
    const hex = [[R / 2, 0], [3 * R / 2, 0], [2 * R, h], [3 * R / 2, 2 * h], [R / 2, 2 * h], [0, h]];
    const faces = extrude(hex, 'xy', 0, H);
    const topIso = hex.map(([x, y]) => P(O, x, y, H));
    const AUX = { x: 132, y: 30 };
    const auxPts = hex.map(([x, y]) => [AUX.x + x, AUX.y + D - y]);
    const lowerEdges = visibleEdges(faces).filter(([p, q]) => !(p[2] === H && q[2] === H));

    CONSTRUCTIONS['isometric-hexagon'] = {
      id: 'isometric-hexagon', title: 'Isometric Hexagonal Prism (Box Method)',
      summary: 'A shape with sloping sides, like a hexagon, is drawn true size in an auxiliary view, boxed in, and its corners are transferred to the isometric box by measuring along the box edges.',
      bounds: { w: 190, h: 140 },
      workbookPrompt: 'Draw a hexagonal prism (50 mm across corners, 30 mm high) standing upright, in isometric. Draw the true hexagon in an auxiliary view inside its enclosing rectangle and transfer its corners to the isometric box.',
      steps: [
        {
          id: 1,
          instruction: 'AUXILIARY VIEW: draw the hexagon true size (50 mm across corners) and box it in a rectangle. Four corners lie on the long sides, 12.5 mm in from each end; the other two touch the middle of the short sides.',
          calloutAt: [AUX.x + R, AUX.y + h],
          reveals: [
            { kind: 'polygon', points: [[AUX.x, AUX.y], [AUX.x + W, AUX.y], [AUX.x + W, AUX.y + D], [AUX.x, AUX.y + D]], lineType: 'construction' },
            { kind: 'polygon', points: auxPts, lineType: 'B' },
            { kind: 'line', p1: [AUX.x - 4, AUX.y + h], p2: [AUX.x + W + 4, AUX.y + h], lineType: 'centre' },
            { kind: 'line', p1: [AUX.x + R, AUX.y - 4], p2: [AUX.x + R, AUX.y + D + 4], lineType: 'centre' },
            { kind: 'label', at: [AUX.x + R, AUX.y - 7], text: 'AUXILIARY VIEW', size: 3.6, anchor: 'middle', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the enclosing box in isometric with thin lines: 50 long, 43.3 deep (the hexagon\'s width across flats) and 30 high.',
          calloutAt: P(O, W, 0, H / 2),
          reveals: crate(O, W, D, H),
        },
        {
          id: 3,
          instruction: 'On the TOP of the box, step off the same distances you measured in the auxiliary view along the box edges: 12.5 mm in from each end on the long edges, and the middle of the short edges. Join the six points: this is the top hexagon.',
          calloutAt: P(O, R, h, H),
          reveals: [
            ...topIso.map(p => ({ kind: 'point', at: p, size: 1.1 })),
            { kind: 'polygon', points: topIso, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Drop vertical edges from the three front corners of the hexagon, 30 mm down, and join their feet. The three back faces are hidden, and isometric drawings never show hidden detail, so those edges are left out.',
          calloutAt: P(O, R / 2, 0, H / 2),
          reveals: lines3(O, lowerEdges, 'A'),
        },
      ],
    };
  })();

  // ── 4. Isometric Angle — Locating a True-Angle Line ──
  (function () {
    const O4 = [70, 140], WIDTH = 50, HEIGHT = 35, ANGLE_DEG = 35;
    const FR = iso(O4, WIDTH, 0);
    const TL = raise(O4, HEIGHT), TR = raise(FR, HEIGHT);
    const xOff = 40, yOff = xOff * Math.tan(ANGLE_DEG * Math.PI / 180);
    const baseP = iso(O4, xOff, 0);
    const anglePoint = raise(baseP, yOff);

    CONSTRUCTIONS['isometric-angle'] = {
      id: 'isometric-angle', title: 'Isometric Angle — Locating a True-Angle Line',
      summary: 'A true angle can never be protracted directly onto an isometric drawing — it distorts. Instead, locate the line\'s endpoint using its true X and Y offsets, each measured along a real isometric axis.',
      bounds: { w: 150, h: 145 },
      workbookPrompt: 'On the isometric front face (50 x 35 mm), construct a line from the bottom-left corner at a true angle of 35° to the base, using the coordinate (offset) method — not a protractor.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front face as an isometric rectangle, using the vertical axis (true height) and the right 30° axis (true width) — both are real isometric axes, so both are measured directly.',
          calloutAt: O4,
          reveals: [
            { kind: 'line', p1: O4, p2: FR, lineType: 'A' },
            { kind: 'line', p1: FR, p2: TR, lineType: 'A' },
            { kind: 'line', p1: TR, p2: TL, lineType: 'A' },
            { kind: 'line', p1: TL, p2: O4, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: `A protractor placed at O reading ${ANGLE_DEG}° on this isometric drawing would NOT locate the true angle — isometric projection distorts angles. Instead, work out the true horizontal run and vertical rise of the line (from the true 35° angle) and mark each as a separate isometric offset.`,
          measurement: { label: `run = ${xOff} mm, rise = ${xOff} × tan(35°) ≈ ${yOff.toFixed(1)} mm` },
          calloutAt: baseP,
          reveals: [
            { kind: 'line', p1: O4, p2: baseP, lineType: 'construction' },
            { kind: 'point', at: baseP, label: 'X' },
          ],
        },
        {
          id: 3,
          instruction: 'From that point, mark the true vertical rise straight up — vertical is always a true isometric axis, on every face.',
          calloutAt: anglePoint,
          reveals: [
            { kind: 'line', p1: baseP, p2: anglePoint, lineType: 'construction' },
            { kind: 'point', at: anglePoint, label: 'Y' },
          ],
        },
        {
          id: 4,
          instruction: 'Join O to the located point. This line is now at the CORRECT true 35° angle — even though the line itself is non-isometric and was never measured or protracted directly.',
          calloutAt: G.midpoint(O4, anglePoint),
          reveals: [
            { kind: 'line', p1: O4, p2: anglePoint, lineType: 'A' },
            { kind: 'label', at: [O4[0] - 4, O4[1] + 12], text: '35° (TRUE ANGLE)', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 5. Isometric Drawing from Given Orthographic Views ──
  (function () {
    const O = [62, 150];
    const W = 60, D = 35, H = 45;
    // End profile (length, height): a 15 mm base with an upright at the right-hand end whose
    // top inside corner is chamfered 5 x 5.
    const profile = [[0, 0], [60, 0], [60, 45], [50, 45], [45, 40], [45, 15], [0, 15]];
    const faces = extrude(profile, 'xz', 0, D);
    const frontEdges = visibleEdges(faces).filter(([p, q]) => p[1] === 0 && q[1] === 0);
    const restEdges = visibleEdges(faces).filter(([p, q]) => !(p[1] === 0 && q[1] === 0));

    // Given views at half size, 3rd angle: top view above the front view, right view to its right.
    const k = 0.5, GX = 140, GY = 150;
    const fv = (x, z) => [GX + x * k, GY - z * k];
    const TY0 = GY - H * k - 7;
    const tv = (x, y) => [GX + x * k, TY0 - y * k];
    const SX0 = GX + W * k + 7;
    const sv = (y, z) => [SX0 + y * k, GY - z * k];

    CONSTRUCTIONS['isometric-from-views'] = {
      id: 'isometric-from-views', title: 'Isometric Drawing from Given Orthographic Views',
      summary: 'Read three given views in 3rd-angle projection and build the isometric drawing inside its enclosing box, starting from the marked corner S.',
      bounds: { w: 200, h: 165 },
      workbookPrompt: 'The front, top and right views of a support block are given in 3rd-angle projection (half size). Draw the block full size in isometric, starting at corner S. Do not show hidden detail.',
      steps: [
        {
          id: 1,
          instruction: 'Study the GIVEN views (3rd angle: top view above the front view, right view to its right). The front view shows the block\'s profile: a 15 mm base, a 15 mm upright at the right with a small chamfer, 60 long and 45 high. The top view gives the depth: 35 mm. Find the start corner S on the front view.',
          calloutAt: fv(30, 22),
          reveals: [
            { kind: 'polygon', points: profile.map(([x, z]) => fv(x, z)), lineType: 'A' },
            { kind: 'polygon', points: [tv(0, 0), tv(W, 0), tv(W, D), tv(0, D)], lineType: 'A' },
            { kind: 'line', p1: tv(45, 0), p2: tv(45, D), lineType: 'A' },
            { kind: 'line', p1: tv(50, 0), p2: tv(50, D), lineType: 'A' },
            { kind: 'polygon', points: [sv(0, 0), sv(D, 0), sv(D, H), sv(0, H)], lineType: 'A' },
            { kind: 'line', p1: sv(0, 15), p2: sv(D, 15), lineType: 'hidden' },
            { kind: 'line', p1: sv(0, 40), p2: sv(D, 40), lineType: 'hidden' },
            ...startMark(fv(0, 0), 'S'),
            { kind: 'label', at: [GX, tv(0, D)[1] - 5], text: 'GIVEN (3RD ANGLE, HALF SIZE)', size: 3.4, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'From S, build the enclosing box full size in thin lines: 60 along the right-hand axis, 35 along the left-hand axis and 45 up.',
          calloutAt: P(O, W, 0, H / 2),
          reveals: [...crate(O, W, D, H), ...startMark(P(O, 0, 0, 0), 'S')],
        },
        {
          id: 3,
          instruction: 'Draw the front-view profile on the front face of the box, measuring every corner along the box edges. The chamfer is the only non-isometric line: plot its two ends (5 mm in from the corner each way) and join them.',
          calloutAt: P(O, 47, 0, 42),
          reveals: lines3(O, frontEdges, 'A'),
        },
        {
          id: 4,
          instruction: 'Draw a 35 mm receding edge back from each visible corner of the profile, and join their ends. The back of the riser and the far end are hidden and are not drawn. Line in the result with Type A lines.',
          calloutAt: P(O, 20, D, 15),
          reveals: lines3(O, restEdges, 'A'),
        },
      ],
    };
  })();

  // ── 6. Sectioned Isometric — Quarter Section ──
  (function () {
    const O = [92, 135];
    const W = 60, D = 60, H = 45, Q = 30;
    const faces = extrude([[Q, 0], [W, 0], [W, D], [0, D], [0, Q], [Q, Q]], 'xy', 0, H);

    CONSTRUCTIONS['sectioned-isometric'] = {
      id: 'sectioned-isometric', title: 'Sectioned Isometric — Quarter Section',
      summary: 'Remove the front quarter of a block by two cutting planes, then hatch the two exposed cut faces with 45° lines drawn in the plane of each face.',
      bounds: { w: 160, h: 145 },
      workbookPrompt: 'Draw the block (60 x 60 x 45) in isometric with its front quarter removed. Hatch both cut faces at 45° in their own planes.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the whole block in thin construction lines: its enclosing box, 60 x 60 x 45.',
          calloutAt: P(O, W, 0, H / 2),
          reveals: crate(O, W, D, H),
        },
        {
          id: 2,
          instruction: 'Imagine two cutting planes through the middle, one along the length and one across it, and remove the front quarter they enclose. Draw the remaining block with Type A lines, including the two new cut faces and the vertical edge where they meet.',
          calloutAt: P(O, Q, Q, H),
          reveals: lines3(O, visibleEdges(faces), 'A'),
        },
        {
          id: 3,
          instruction: 'Hatch the two cut faces. Hatching is drawn at 45° in the plane of each face, so on the drawing the lines run at a steep angle. On the two faces they slope towards the shared corner edge and meet there in a V, which shows that both faces belong to the same part.',
          calloutAt: P(O, Q, Q / 2, H / 2),
          reveals: [
            ...hatchFace(O, [Q, 0, 0], [0, 1, 0], Q, [0, 0, 1], H, 5),
            ...hatchFace(O, [0, Q, 0], [1, 0, 0], Q, [0, 0, 1], H, 5),
          ],
        },
        {
          id: 4,
          instruction: 'Only material that a cutting plane passes through is hatched. The outside faces stay plain, and the drawing still shows no hidden detail.',
          calloutAt: P(O, W / 2, D, H),
          reveals: [{ kind: 'label', at: [O[0], O[1] + 14], text: 'QUARTER SECTION', size: 4.4, anchor: 'middle', color: '#fde047' }],
        },
      ],
    };
  })();

  // ── 7. Isometric Cylinder ──
  (function () {
    const O = [78, 140];
    const R = 20, H = 45;
    const top = isoCircle(O, [R, R, H], R, 'xy');
    // Outline edges: where the screen-horizontal extent of the ellipse is greatest.
    const sideL = 135, sideR = -45;
    const at = (a, z) => P(O, R + R * Math.cos(a * Math.PI / 180), R + R * Math.sin(a * Math.PI / 180), z);

    CONSTRUCTIONS['isometric-cylinder'] = {
      id: 'isometric-cylinder', title: 'Isometric Cylinder',
      summary: 'Draw the top ellipse in its isometric square, drop the two outline edges where the ellipse is widest, and draw only the front half of the bottom ellipse.',
      bounds: { w: 150, h: 145 },
      workbookPrompt: 'Draw a cylinder (Ø40, 45 high) standing upright, in isometric. Show only the visible half of the base ellipse.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the enclosing box in thin lines (40 x 40 x 45) and the centre lines on its top face.',
          calloutAt: P(O, 2 * R, 0, H / 2),
          reveals: [
            ...crate(O, 2 * R, 2 * R, H),
            { kind: 'line', p1: P(O, -5, R, H), p2: P(O, 2 * R + 5, R, H), lineType: 'centre' },
            { kind: 'line', p1: P(O, R, -5, H), p2: P(O, R, 2 * R + 5, H), lineType: 'centre' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the top ellipse in the top square (ordinate or four-centre method). It touches the square at the mid-points of the four sides.',
          calloutAt: at(0, H),
          reveals: [{ kind: 'polyline', points: top, lineType: 'A' }],
        },
        {
          id: 3,
          instruction: 'Draw the two vertical outline edges from the left-most and right-most points of the top ellipse (NOT from the corners of the square). Then draw only the FRONT half of the bottom ellipse between them; its back half is hidden.',
          calloutAt: at(225, 0),
          reveals: [
            { kind: 'line', p1: at(sideL, H), p2: at(sideL, 0), lineType: 'A' },
            { kind: 'line', p1: at(sideR, H), p2: at(sideR, 0), lineType: 'A' },
            { kind: 'polyline', points: isoCircle(O, [R, R, 0], R, 'xy', sideL, sideR + 360, 32), lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Add the vertical axis as a centre line and dimension the height. The diameter is given with the Ø symbol.',
          calloutAt: P(O, R, R, H + 8),
          reveals: [
            { kind: 'line', p1: P(O, R, R, H + 6), p2: P(O, R, R, -6), lineType: 'centre' },
            { kind: 'dimension', p1: at(sideL, 0), p2: at(sideL, H), offset: 10, text: String(H) },
            { kind: 'label', at: [P(O, R, R, H)[0] + 30, P(O, R, R, H)[1] - 14], text: 'Ø' + 2 * R, size: 4.2, anchor: 'start', color: '#e8eaf2' },
          ],
        },
      ],
    };
  })();

  // ── 8. Isometric Circles on Vertical Faces ──
  (function () {
    const O = [100, 128];
    const S = 50, R = S / 2;
    const ords = [R * Math.cos(Math.PI / 6), R / 2];
    const angles = Array.from({ length: 12 }, (_, i) => i * 30);
    const ptsFront = angles.map(a => P(O, R + R * Math.cos(a * Math.PI / 180), 0, R + R * Math.sin(a * Math.PI / 180)));

    CONSTRUCTIONS['isometric-circle-vertical'] = {
      id: 'isometric-circle-vertical', title: 'Isometric Circle on a Vertical Face',
      summary: 'On a vertical face the isometric square has two vertical sides; the ellipse is plotted the same way, by ordinates, and leans along the face.',
      bounds: { w: 160, h: 140 },
      workbookPrompt: 'Draw a 50 mm cube in isometric with a 50 mm circle on each of its two visible vertical faces, using the ordinate method.',
      steps: [
        {
          id: 1,
          instruction: 'On the right-hand vertical face, draw the isometric square: two vertical sides and two sides along the 30° length axis. Add the centre lines (one vertical, one parallel to the length axis) and mark the four mid-points of the sides.',
          calloutAt: P(O, R, 0, R),
          reveals: [
            { kind: 'polygon', points: [P(O, 0, 0, 0), P(O, S, 0, 0), P(O, S, 0, S), P(O, 0, 0, S)], lineType: 'construction' },
            { kind: 'line', p1: P(O, R, 0, -6), p2: P(O, R, 0, S + 6), lineType: 'centre' },
            { kind: 'line', p1: P(O, -6, 0, R), p2: P(O, S + 6, 0, R), lineType: 'centre' },
            ...[0, 3, 6, 9].map(i => ({ kind: 'point', at: ptsFront[i], size: 1.1 })),
          ],
        },
        {
          id: 2,
          instruction: 'Transfer the ordinates from the true circle (as in the Isometric Circle lesson). On this face they run vertically, so step the points off up and down each one.',
          calloutAt: ptsFront[1],
          reveals: [
            ...[-1, 1].flatMap(sg => ords.map(d => ({ kind: 'line', p1: P(O, R + sg * d, 0, 0), p2: P(O, R + sg * d, 0, S), lineType: 'construction' }))),
            ...ptsFront.map(p => ({ kind: 'point', at: p, size: 1.1 })),
          ],
        },
        {
          id: 3,
          instruction: 'Join the points with a smooth Type A curve. The ellipse leans: its long axis lies along the long diagonal of the rhombus.',
          calloutAt: ptsFront[0],
          reveals: [{ kind: 'polyline', points: isoCircle(O, [R, 0, R], R, 'xz'), lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Repeat on the left-hand face (vertical and the 30° depth axis) and complete the cube. The two ellipses are the same size and mirror each other, because both faces are at the same angle to the viewer.',
          calloutAt: P(O, 0, R, R),
          reveals: [
            { kind: 'polygon', points: [P(O, 0, 0, 0), P(O, 0, S, 0), P(O, 0, S, S), P(O, 0, 0, S)], lineType: 'construction' },
            { kind: 'line', p1: P(O, 0, R, -6), p2: P(O, 0, R, S + 6), lineType: 'centre' },
            { kind: 'line', p1: P(O, 0, -6, R), p2: P(O, 0, S + 6, R), lineType: 'centre' },
            { kind: 'polyline', points: isoCircle(O, [0, R, R], R, 'yz'), lineType: 'A' },
            ...lines3(O, visibleEdges(extrude([[0, 0], [S, 0], [S, S], [0, S]], 'xz', 0, S)), 'A'),
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'How many isometric axes are there, and at what angle are the two non-vertical ones drawn?',
      options: ['Three axes: one vertical, and two at 30° to the horizontal', 'Two axes at 45° to each other', 'Four axes, one for each side of a square', 'Three axes all at 60° to each other'],
      answer: 0,
      explanation: 'Isometric drawing uses three axes: one vertical (true height) and two receding axes drawn at 30° above the horizontal, one to the left and one to the right.',
    },
    {
      text: 'What makes a line "isometric"?',
      options: ['It is parallel to one of the three isometric axes', 'It is any straight line on the drawing', 'It is always vertical', 'It is always curved'],
      answer: 0,
      explanation: 'A line is isometric only if it runs parallel to one of the three isometric axes (vertical, or one of the two 30° axes). Only isometric lines can be measured directly to their true length.',
    },
    {
      text: 'How is the true length of a NON-isometric line found on an isometric drawing?',
      options: ['By locating its two endpoints using isometric (measurable) lines first, then joining them with a straight line', 'By measuring it directly with a ruler on the drawing', 'It cannot be drawn at all', 'By assuming it is the same length as the nearest isometric edge'],
      answer: 0,
      explanation: 'A non-isometric line is never measured directly — its true length would be distorted on the drawing. Instead, its two endpoints are located using isometric (measurable) construction lines, and then simply joined with a straight line.',
    },
    {
      text: 'On the isometric wedge in this chapter, why are the two sloped edges non-isometric?',
      options: ['Because they are not parallel to the vertical axis or either of the two 30° axes', 'Because they are curved', 'Because they are the shortest lines on the drawing', 'Every edge on a wedge is automatically non-isometric'],
      answer: 0,
      explanation: 'The sloping edges rise from the front bottom edge to the back top edge, a direction that matches neither the vertical axis nor either 30° axis. That is exactly what makes a line non-isometric: it is plotted from its end points, never measured.',
    },
    {
      text: 'Why can\'t an isometric circle be drawn with a compass in one continuous curve?',
      options: [
        'Because a true circle appears as an ellipse in isometric view, which a compass cannot draw directly',
        'Because circles are never allowed in isometric drawings',
        'Because a compass can only draw straight lines',
        'Because isometric drawings are not allowed to contain curves',
      ],
      answer: 0,
      explanation: 'A true circle, viewed from an isometric angle, appears as an ellipse. A standard compass draws true circles, not ellipses, so an isometric circle must be built up from plotted points (or approximated with four arcs) instead.',
    },
    {
      text: 'In the coordinate (ordinate) method for an isometric circle, what is plotted onto the isometric grid?',
      options: [
        'A series of points taken from the true circle, transferred using the two isometric axis directions',
        'The centre point only',
        'A single diameter line',
        'Random points anywhere on the page',
      ],
      answer: 0,
      explanation: 'The true circle is divided into equal steps, and each of those points is transferred onto the isometric grid using the same two axis directions used to build the rest of the drawing — then the points are joined with a smooth curve.',
    },
    {
      text: 'What shape does the isometric square (used to construct an isometric circle) have?',
      options: ['A rhombus with 60° and 120° angles', 'A perfect square with all 90° angles', 'A rectangle', 'An irregular quadrilateral with no equal angles'],
      answer: 0,
      explanation: 'Because the two isometric axes are 120° apart, the "isometric square" is actually a rhombus with two 60° (acute) corners and two 120° (obtuse) corners, even though all four sides are the same true length.',
    },
    {
      text: 'When constructing an isometric polygon (e.g. a hexagon), why is a bounding rectangle drawn first?',
      options: [
        'Because a rectangle\'s edges are all isometric (measurable), so it gives a reliable frame to plot each non-isometric polygon vertex from its true X/Y offset',
        'It is purely decorative and has no construction purpose',
        'Because polygons cannot otherwise be drawn in isometric at all',
        'A bounding rectangle is only needed for circles, never for straight-edged polygons',
      ],
      answer: 0,
      explanation: 'The box method works because the box\'s own edges are isometric and can be measured directly — every polygon vertex is then located using true offsets from the box, exactly the same principle used for isometric circles.',
    },
    {
      text: 'Why can\'t a true angle (e.g. 35°) be measured directly with a protractor on an isometric drawing?',
      options: [
        'Isometric projection distorts angles — a true angle only appears correct if it happens to align with the isometric axes',
        'Protractors physically cannot be used on any technical drawing',
        'Isometric drawings never contain angled lines',
        'It can always be measured directly; there is no distortion in isometric projection',
      ],
      answer: 0,
      explanation: 'Isometric projection preserves true LENGTHS along the three axes, but not true angles between arbitrary lines — a true angle must be located via coordinate offsets, never protracted directly on the isometric view.',
    },
    {
      text: 'How is an isometric drawing sectioned (e.g. to show an internal feature)?',
      options: [
        'A quarter of the object is imagined removed along the two vertical planes through the centre, exposing two internal faces which are then hatched',
        'The entire object is cut exactly in half, the same way as an orthographic full section',
        'Isometric drawings can never be sectioned',
        'Only the top face is ever removed, never a side face',
      ],
      answer: 0,
      explanation: 'Because an isometric view already shows three faces at once, the standard convention removes a quarter of the object (along two vertical cutting planes meeting at the centre line), exposing two hatched internal faces while the rest stays a normal exterior view.',
    },
    {
      text: 'The exact same true circle is drawn once on the TOP face and once on the FRONT face of an isometric cube. What is true of the two resulting ellipses?',
      options: [
        'They are tilted in different directions, since each of the three isometric planes has its own distinct ellipse orientation',
        'They are always identical in every way',
        'Only the top face can ever contain an isometric circle',
        'The front-face version is always smaller than the top-face version',
      ],
      answer: 0,
      explanation: 'Each of the three principal isometric planes (top, front-right, front-left) is built from a different pair of axes, so the same true circle projects as a differently-tilted ellipse depending on which face it sits on.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'isometric-wedge', 'isometric-circle', 'isometric-hexagon', 'isometric-angle',
    'isometric-from-views', 'sectioned-isometric', 'isometric-cylinder', 'isometric-circle-vertical',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
