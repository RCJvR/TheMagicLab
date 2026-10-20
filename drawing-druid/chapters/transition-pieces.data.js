// Transition Pieces — Chapter data. Requires engine-geometry.js loaded first
// (window.ConstructionGeometry). Grade 11-12: hoppers and other pieces that connect two
// different cross-sectional shapes — the surface development technique of TRIANGULATION,
// used whenever a shape can't be unrolled as a simple cone, cylinder or prism.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};
  const D2R = Math.PI / 180;

  // ── 1. Square-to-Square Hopper — Front and Top Views ──
  (function () {
    const baseHalf = 30, topHalf = 14, H = 45;
    // 3rd angle: the top view above the front view, with a gap between them
    const TV_CX = 90, TV_CY = 40;
    const FV_CX = 90, FV_TOP = TV_CY + baseHalf + 16, FV_BOTTOM = FV_TOP + H;

    CONSTRUCTIONS['hopper-views'] = {
      id: 'hopper-views', projection: 'third', title: 'Square-to-Square Hopper — Front and Top Views',
      summary: 'A transition piece (hopper) connects two different cross-sections — here, a wide square base narrowing to a smaller square top, exactly like a chute or funnel.',
      bounds: { w: 180, h: 185 },
      workbookPrompt: 'Draw the front and top views of a hopper: 60 mm square base, 28 mm square top (aligned, concentric), 45 mm tall.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view: the wide base and narrower top, joined by sloping sides.',
          calloutAt: [FV_CX, FV_TOP + H / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_CX - baseHalf, FV_BOTTOM], [FV_CX + baseHalf, FV_BOTTOM], [FV_CX + topHalf, FV_TOP], [FV_CX - topHalf, FV_TOP]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the top view: two concentric squares — the true-size base outline and the true-size top outline, one inside the other.',
          calloutAt: [TV_CX, TV_CY],
          reveals: [
            { kind: 'polygon', points: [[TV_CX - baseHalf, TV_CY - baseHalf], [TV_CX + baseHalf, TV_CY - baseHalf], [TV_CX + baseHalf, TV_CY + baseHalf], [TV_CX - baseHalf, TV_CY + baseHalf]], lineType: 'A' },
            { kind: 'polygon', points: [[TV_CX - topHalf, TV_CY - topHalf], [TV_CX + topHalf, TV_CY - topHalf], [TV_CX + topHalf, TV_CY + topHalf], [TV_CX - topHalf, TV_CY + topHalf]], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Join each base corner to the corresponding top corner in the top view — these are the hopper\'s four sloping corner edges, seen from above.',
          calloutAt: [TV_CX + baseHalf - 10, TV_CY - baseHalf + 10],
          reveals: [
            { kind: 'line', p1: [TV_CX - baseHalf, TV_CY - baseHalf], p2: [TV_CX - topHalf, TV_CY - topHalf], lineType: 'A' },
            { kind: 'line', p1: [TV_CX + baseHalf, TV_CY - baseHalf], p2: [TV_CX + topHalf, TV_CY - topHalf], lineType: 'A' },
            { kind: 'line', p1: [TV_CX + baseHalf, TV_CY + baseHalf], p2: [TV_CX + topHalf, TV_CY + topHalf], lineType: 'A' },
            { kind: 'line', p1: [TV_CX - baseHalf, TV_CY + baseHalf], p2: [TV_CX - topHalf, TV_CY + topHalf], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'A hopper like this — aligned and symmetric — is really just a TRUNCATED (cut-off) square pyramid. An offset hopper (where the top is shifted sideways, common in real ducting) uses exactly the same principles, just with unequal edge lengths on each side.',
          calloutAt: [FV_CX, FV_BOTTOM + 15],
          reveals: [
            { kind: 'label', at: [FV_CX - baseHalf, FV_BOTTOM + 15], text: 'A TRUNCATED SQUARE PYRAMID', size: 4.2, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. True Length of a Hopper's Sloping Edge ──
  (function () {
    const baseHalf = 30, topHalf = 14, H = 45;
    const Ap = [55, 90], Bp = [Ap[0] + (baseHalf - topHalf), Ap[1] - H];
    const App = [55, 150], Bpp = [App[0] + (baseHalf - topHalf), App[1] + (baseHalf - topHalf)];
    const dirTop = [1 / Math.SQRT2, 1 / Math.SQRT2];
    const perpTop = [-dirTop[1], dirTop[0]];
    const topLen = G.distance(App, Bpp);
    const P = [Bpp[0] + perpTop[0] * H, Bpp[1] + perpTop[1] * H];
    const TL = G.distance(App, P);

    CONSTRUCTIONS['hopper-true-length'] = {
      id: 'hopper-true-length', title: 'True Length of a Hopper\'s Sloping Edge',
      summary: 'Every sloping edge of a hopper is foreshortened in the standard views — its true length must be found before any development can be constructed.',
      bounds: { w: 175, h: 220 },
      workbookPrompt: 'Given the front and top views of one corner edge of the hopper, construct its true length using the right-triangle method.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front and top views of ONE corner edge, from a base corner to the corresponding top corner.',
          calloutAt: G.midpoint(Ap, Bp),
          reveals: [
            { kind: 'line', p1: Ap, p2: Bp, lineType: 'A' }, { kind: 'point', at: Ap, label: 'A' }, { kind: 'point', at: Bp, label: 'B' },
            { kind: 'line', p1: App, p2: Bpp, lineType: 'A' }, { kind: 'point', at: App, label: 'A' }, { kind: 'point', at: Bpp, label: 'B' },
          ],
        },
        {
          id: 2,
          instruction: 'From the top view, add a perpendicular equal to the height difference (read from the front view).',
          calloutAt: G.midpoint(Bpp, P),
          reveals: [{ kind: 'line', p1: Bpp, p2: P, lineType: 'construction' }],
        },
        {
          id: 3,
          instruction: 'Join A to the new point. This hypotenuse is the TRUE LENGTH of the sloping edge — every one of the hopper\'s four corner edges is found exactly this way.',
          measurement: { label: 'TL = ' + TL.toFixed(1) + ' mm' },
          calloutAt: G.midpoint(App, P),
          reveals: [
            { kind: 'line', p1: App, p2: P, lineType: 'A' },
            { kind: 'label', at: [(App[0] + P[0]) / 2 - 5, (App[1] + P[1]) / 2], text: 'TL = ' + TL.toFixed(1), size: 4.5, anchor: 'end', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'This true length becomes the compass radius used to construct the development — exactly like the true edge of a full pyramid.',
          calloutAt: [App[0], App[1] + 20],
          reveals: [
            { kind: 'label', at: [P[0], P[1] + 10], text: 'USED AS THE COMPASS RADIUS NEXT', size: 3.8, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 3. Development of a Truncated Square Pyramid Hopper ──
  (function () {
    const baseSide = 60, topSide = 28, baseHalfDiag = baseSide * Math.SQRT2 / 2, topHalfDiag = topSide * Math.SQRT2 / 2, H = 45;
    const trueEdge = Math.sqrt(H * H + (baseHalfDiag - topHalfDiag) * (baseHalfDiag - topHalfDiag));
    const virtualFull = trueEdge * baseHalfDiag / (baseHalfDiag - topHalfDiag);
    const cutLen = virtualFull - trueEdge;
    const apex = [130, 85];
    // each face subtends 2·asin(half the base side / the full edge) at the apex, so every outer chord is
    // exactly one base side and every inner chord one top side; the fan is centred on -40°
    const angStep = 2 * Math.asin(baseSide / 2 / virtualFull) / D2R, angStart = -40 - 2 * angStep;
    const outerPts = Array.from({ length: 5 }, (_, i) => {
      const a = angStart + i * angStep;
      return [apex[0] + virtualFull * Math.cos(a * D2R), apex[1] + virtualFull * Math.sin(a * D2R)];
    });
    const innerPts = Array.from({ length: 5 }, (_, i) => {
      const a = angStart + i * angStep;
      return [apex[0] + cutLen * Math.cos(a * D2R), apex[1] + cutLen * Math.sin(a * D2R)];
    });

    CONSTRUCTIONS['hopper-development'] = {
      id: 'hopper-development', title: 'Development of a Truncated Square Pyramid Hopper',
      summary: 'Extend the hopper\'s edges back to where they would meet at a virtual apex, then use similar triangles to find both the outer and inner development radii from that same point.',
      bounds: { w: 240, h: 190 },
      workbookPrompt: 'Given the true edge length, calculate the virtual full-pyramid apex distance, then construct the four-trapezoid development using compass arcs from that apex.',
      steps: [
        {
          id: 1,
          instruction: 'Extend the true sloping edge back until it would meet the other three at a single VIRTUAL apex — the point where this hopper would come to if it weren\'t cut off.',
          measurement: { label: 'virtual full edge = TL × baseHalfDiag ÷ (baseHalfDiag − topHalfDiag) ≈ ' + virtualFull.toFixed(1) + ' mm' },
          calloutAt: apex,
          reveals: [{ kind: 'point', at: apex, label: '' }],
        },
        {
          id: 2,
          instruction: 'From the virtual apex, swing the OUTER arc (the virtual full edge length), and step off 4 points along it, each exactly one base-side-length apart — the same compass-step method used for a full pyramid.',
          calloutAt: outerPts[2],
          reveals: [
            { kind: 'arc-construction', center: apex, r: virtualFull, startDeg: angStart, endDeg: angStart + 4 * angStep, lineType: 'construction' },
            ...outerPts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#f472b6' })),
          ],
        },
        {
          id: 3,
          instruction: 'On each of the same radial lines, mark the INNER point at the "cut" distance from the apex — this is where the hopper\'s top edge actually is.',
          measurement: { label: 'cut distance = virtual full edge − true edge ≈ ' + cutLen.toFixed(1) + ' mm' },
          calloutAt: innerPts[2],
          reveals: [
            ...outerPts.map(p => ({ kind: 'line', p1: apex, p2: p, lineType: 'construction' })),
            ...innerPts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#eab308' })),
          ],
        },
        {
          id: 4,
          instruction: 'Join adjacent outer points and adjacent inner points — the development is four true-size trapezoids, ready to fold up into the hopper.',
          calloutAt: [apex[0] - 40, apex[1] + 60],
          reveals: [
            { kind: 'line', p1: outerPts[0], p2: outerPts[1], lineType: 'A' }, { kind: 'line', p1: outerPts[1], p2: outerPts[2], lineType: 'A' },
            { kind: 'line', p1: outerPts[2], p2: outerPts[3], lineType: 'A' }, { kind: 'line', p1: outerPts[3], p2: outerPts[4], lineType: 'A' },
            { kind: 'line', p1: innerPts[0], p2: innerPts[1], lineType: 'A' }, { kind: 'line', p1: innerPts[1], p2: innerPts[2], lineType: 'A' },
            { kind: 'line', p1: innerPts[2], p2: innerPts[3], lineType: 'A' }, { kind: 'line', p1: innerPts[3], p2: innerPts[4], lineType: 'A' },
            { kind: 'line', p1: innerPts[0], p2: outerPts[0], lineType: 'A' }, { kind: 'line', p1: innerPts[4], p2: outerPts[4], lineType: 'A' },
            ...[1, 2, 3].map(k => ({ kind: 'line', p1: innerPts[k], p2: outerPts[k], lineType: 'B' })),
          ],
        },
      ],
    };
  })();

  // ── 4. Round-to-Square Transition — the Triangulation Principle ──
  (function () {
    const TV_CX = 100, TV_CY = 95, sq = 35, R = 24, N = 12;
    const corners = [[TV_CX - sq, TV_CY - sq], [TV_CX + sq, TV_CY - sq], [TV_CX + sq, TV_CY + sq], [TV_CX - sq, TV_CY + sq]];
    // 12 points from the right-hand side, 30° apart: points 0, 3, 6 and 9 face the middles of the sides
    const circlePts = Array.from({ length: N }, (_, i) => { const a = i * 30 * D2R; return [TV_CX + R * Math.cos(a), TV_CY + R * Math.sin(a)]; });
    // how far round (degrees) point i is from the direction of corner c; a corner's own quarter is ≤ 45°
    const off = (c, i) => { const a = Math.atan2(c[1] - TV_CY, c[0] - TV_CX) / D2R; return Math.abs(((i * 30 - a) % 360 + 540) % 360 - 180); };
    const join = (pred, lt) => corners.flatMap(c => circlePts.filter((p, i) => pred(off(c, i))).map(p => ({ kind: 'line', p1: c, p2: p, lineType: lt })));

    CONSTRUCTIONS['triangulation-principle'] = {
      id: 'triangulation-principle', title: 'Round-to-Square Transition — the Triangulation Principle',
      summary: 'A round-to-square transition can\'t be developed as a simple cone or prism — it has to be broken into a mesh of small TRIANGLES, alternating between the square\'s corners and the circle\'s points.',
      bounds: { w: 200, h: 155 },
      workbookPrompt: 'Draw the top view of a round-to-square transition (70 mm square base, 48 mm diameter top), and construct the triangulation: each square corner joined to the circle points of its own quarter.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the top view: the square base and, concentric with it, the round top divided into 12 equal points.',
          calloutAt: [TV_CX, TV_CY],
          reveals: [
            { kind: 'polygon', points: corners, lineType: 'A' },
            { kind: 'circle', center: [TV_CX, TV_CY], r: R, lineType: 'A' },
            ...circlePts.map(p => ({ kind: 'point', at: p, size: 1, color: '#94a3b8' })),
          ],
        },
        {
          id: 2,
          instruction: 'Join each SQUARE CORNER only to the circle points of its own quarter, never across the circle: first the two points in the middle of the quarter.',
          calloutAt: corners[1],
          reveals: join(d => d < 30, 'B'),
        },
        {
          id: 3,
          instruction: 'Then join the circle point in the middle of each side to both corners of that side. Each corner now has a fan of three CORNER triangles, and each side a flat SIDE triangle between two fans.',
          calloutAt: circlePts[9],
          reveals: join(d => Math.abs(d - 45) < 1e-6, 'B'),
        },
        {
          id: 4,
          instruction: 'The result is a complete mesh of alternating triangles, all the way around — this mesh is what gets individually true-lengthed and unfolded to build the development.',
          calloutAt: [TV_CX, TV_CY - R - 12],
          reveals: [
            { kind: 'label', at: [TV_CX - sq, TV_CY - sq - 10], text: 'ALTERNATING CORNER & SIDE TRIANGLES', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 5. True Length of a Corner-Triangle Edge ──
  (function () {
    const cornerFront = [55, 130], H = 40, radialOffset = 32;
    const cornerTop = [55, 170];
    const circlePtTop = [cornerTop[0] + radialOffset, cornerTop[1] - 8];
    const circlePtFront = [circlePtTop[0], cornerFront[1] - H];   // the circle (top) is H above the square (base)
    const dirTop = unitVec2(circlePtTop, cornerTop);
    const perpTop = [-dirTop[1], dirTop[0]];
    const topLen = G.distance(cornerTop, circlePtTop);
    const P = [circlePtTop[0] + perpTop[0] * H, circlePtTop[1] + perpTop[1] * H];
    const TL = G.distance(cornerTop, P);
    function unitVec2(a, b) { const dx = a[0] - b[0], dy = a[1] - b[1]; const L = Math.hypot(dx, dy); return [dx / L, dy / L]; }

    CONSTRUCTIONS['corner-triangle-true-length'] = {
      id: 'corner-triangle-true-length', title: 'True Length of a Corner-Triangle Edge',
      summary: 'Before any triangle in the mesh can be unfolded, every one of its sloping edges needs its own true length — found exactly the same way, every time.',
      bounds: { w: 170, h: 195 },
      workbookPrompt: 'Given the front and top views of one edge from a square corner to a nearby circle point, construct its true length.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front and top views of one representative edge — a square corner joined to a nearby circle point.',
          calloutAt: G.midpoint(cornerFront, circlePtFront),
          reveals: [
            { kind: 'line', p1: cornerFront, p2: circlePtFront, lineType: 'A' }, { kind: 'point', at: cornerFront, label: '' }, { kind: 'point', at: circlePtFront, label: '' },
            { kind: 'line', p1: cornerTop, p2: circlePtTop, lineType: 'A' }, { kind: 'point', at: cornerTop, label: '' }, { kind: 'point', at: circlePtTop, label: '' },
          ],
        },
        {
          id: 2,
          instruction: 'From the top view, add a perpendicular equal to the height (read from the front view).',
          calloutAt: G.midpoint(circlePtTop, P),
          reveals: [{ kind: 'line', p1: circlePtTop, p2: P, lineType: 'construction' }],
        },
        {
          id: 3,
          instruction: 'Join to complete the right triangle — the hypotenuse is the true length of this edge.',
          measurement: { label: 'TL = ' + TL.toFixed(1) + ' mm' },
          calloutAt: G.midpoint(cornerTop, P),
          reveals: [
            { kind: 'line', p1: cornerTop, p2: P, lineType: 'A' },
            { kind: 'label', at: [(cornerTop[0] + P[0]) / 2 - 5, (cornerTop[1] + P[1]) / 2 + 4], text: 'TL = ' + TL.toFixed(1), size: 4.5, anchor: 'end', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'In a real transition piece, this same construction is repeated for every distinct sloping edge in the triangulation mesh — tedious, but each one is exactly this simple.',
          calloutAt: [cornerTop[0], cornerTop[1] + 20],
          reveals: [],
        },
      ],
    };
  })();

  // ── 6. Development of Two Representative Triangles ──
  // One corner fan of a square-to-round transition (60 mm square base, Ø48 top, 50 high): corner C and
  // circle points 1, 2, 3 of its quarter. Plan lengths C-1 = 30.6, C-2 = C-3 = 20.2; with the height 50
  // the true lengths are 58.6, 53.9 and 53.9. The chords 1-2 and 2-3 are true length (the circle is
  // level): 2 × 24 × sin 15° = 12.4. Each new triangle shares its sloping edge with the one before.
  (function () {
    const TL1 = 58.6, TL2 = 53.9, TL3 = 53.9, CH = 12.4;
    function thirdPoint(a, b, ra, rb, sign) {
      const d = G.distance(a, b);
      const x = (ra * ra - rb * rb + d * d) / (2 * d);
      const h = Math.sqrt(Math.max(0, ra * ra - x * x));
      const ux = (b[0] - a[0]) / d, uy = (b[1] - a[1]) / d;
      const mx = a[0] + x * ux, my = a[1] + x * uy;
      return [mx - sign * h * uy, my + sign * h * ux];
    }
    const C = [60, 115];
    const P1 = [C[0] + TL1 * Math.cos(-105 * D2R), C[1] + TL1 * Math.sin(-105 * D2R)];
    const P2 = thirdPoint(C, P1, TL2, CH, 1);
    const P3 = thirdPoint(C, P2, TL3, CH, 1);
    const angOf = (o, p) => Math.atan2(p[1] - o[1], p[0] - o[0]) / D2R;
    const arcAt = (o, r, p) => ({ kind: 'arc-construction', center: o, r, startDeg: angOf(o, p) - (o === C ? 6 : 30), endDeg: angOf(o, p) + (o === C ? 6 : 30), lineType: 'construction' });
    const edge = G.catmullRomExpand([P1, P2, P3], 6);

    CONSTRUCTIONS['two-triangles-development'] = {
      id: 'two-triangles-development', title: 'Development of Two Representative Triangles',
      summary: 'Once every edge has a true length, the triangles unfold edge-to-edge, one at a time, exactly like the panels of a pyramid — just less regular.',
      bounds: { w: 170, h: 130 },
      workbookPrompt: 'Given the true lengths of two adjacent triangles\' edges and their shared base length, unfold them edge-to-edge to begin the transition piece\'s development.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the first known edge of the fan at its true length: corner C to circle point 1 (found as in the previous exercise).',
          measurement: { label: 'C-1 = ' + TL1 + ' mm (true length)' },
          calloutAt: G.midpoint(C, P1),
          reveals: [
            { kind: 'line', p1: C, p2: P1, lineType: 'B' }, { kind: 'point', at: C, label: 'C' }, { kind: 'point', at: P1, label: '1' },
          ],
        },
        {
          id: 2,
          instruction: 'Triangle C-1-2: from C swing an arc of the true length C-2, and from point 1 an arc of the chord 1-2 (true length, because the circle is level). Where they cross is point 2.',
          measurement: { label: 'C-2 = ' + TL2 + ' mm, 1-2 = ' + CH + ' mm' },
          calloutAt: P2,
          reveals: [
            arcAt(C, TL2, P2), arcAt(P1, CH, P2),
            { kind: 'line', p1: C, p2: P2, lineType: 'B' }, { kind: 'point', at: P2, label: '2' },
          ],
        },
        {
          id: 3,
          instruction: 'The SECOND triangle, C-2-3, shares the edge C-2 that is already drawn: from C swing the true length C-3, and from point 2 the chord 2-3. Where they cross is point 3.',
          measurement: { label: 'C-3 = ' + TL3 + ' mm, 2-3 = ' + CH + ' mm' },
          calloutAt: P3,
          reveals: [
            arcAt(C, TL3, P3), arcAt(P2, CH, P3),
            { kind: 'line', p1: C, p2: P3, lineType: 'B' }, { kind: 'point', at: P3, label: '3' },
          ],
        },
        {
          id: 4,
          instruction: 'Each new triangle attaches to the one before it along a shared true-length edge — continuing this all the way around eventually completes the full transition-piece development.',
          calloutAt: [C[0] + 20, C[1] - 10],
          reveals: [
            { kind: 'polyline', points: edge, lineType: 'A' },
            { kind: 'label', at: [C[0] + 12, C[1] + 6], text: 'CONTINUE AROUND THE FULL MESH', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 7. Seam Allowance on a Development ──
  (function () {
    const R = 18, H = 55, circumference = 2 * Math.PI * R, seam = 8;
    const DEV_LEFT = 40, DEV_TOP = 30, DEV_BOTTOM = DEV_TOP + H, DEV_RIGHT = DEV_LEFT + circumference;

    CONSTRUCTIONS['seam-allowance'] = {
      id: 'seam-allowance', title: 'Seam Allowance on a Development',
      summary: 'A real fabricated development needs a little extra material at the join — a seam allowance — folded over or overlapped to actually close the seam.',
      bounds: { w: 175, h: 130 },
      workbookPrompt: 'Given a cylindrical development (36 mm diameter, 55 mm tall), add an 8 mm seam allowance flap along one edge, with the fold line clearly marked.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the plain development rectangle, as before — this is the surface itself, with no allowance yet.',
          measurement: { label: 'circumference = ' + circumference.toFixed(1) + ' mm' },
          calloutAt: [(DEV_LEFT + DEV_RIGHT) / 2, (DEV_TOP + DEV_BOTTOM) / 2],
          reveals: [
            { kind: 'polygon', points: [[DEV_LEFT, DEV_TOP], [DEV_RIGHT, DEV_TOP], [DEV_RIGHT, DEV_BOTTOM], [DEV_LEFT, DEV_BOTTOM]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Mark the FOLD LINE, a set distance in from one edge — this is where the seam allowance flap will bend over.',
          calloutAt: [DEV_RIGHT - seam / 2, (DEV_TOP + DEV_BOTTOM) / 2],
          reveals: [
            { kind: 'line', p1: [DEV_RIGHT - seam, DEV_TOP], p2: [DEV_RIGHT - seam, DEV_BOTTOM], lineType: 'centre' },
          ],
        },
        {
          id: 3,
          instruction: 'Extend the development by the seam allowance amount beyond the true outline — this extra strip is what actually gets folded or overlapped to close the joint.',
          measurement: { label: 'seam allowance = ' + seam + ' mm' },
          calloutAt: [DEV_RIGHT + seam / 2, DEV_TOP - 8],
          reveals: [
            { kind: 'line', p1: [DEV_RIGHT, DEV_TOP], p2: [DEV_RIGHT + seam, DEV_TOP], lineType: 'A' },
            { kind: 'line', p1: [DEV_RIGHT, DEV_BOTTOM], p2: [DEV_RIGHT + seam, DEV_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [DEV_RIGHT + seam, DEV_TOP], p2: [DEV_RIGHT + seam, DEV_BOTTOM], lineType: 'A' },
            { kind: 'dimension', p1: [DEV_RIGHT, DEV_TOP - 6], p2: [DEV_RIGHT + seam, DEV_TOP - 6], offset: 0, text: String(seam) },
          ],
        },
        {
          id: 4,
          instruction: 'Label the seam allowance and the fold line clearly — without this note, a fabricator wouldn\'t know the flap isn\'t part of the finished surface.',
          calloutAt: [DEV_LEFT, DEV_BOTTOM + 12],
          reveals: [
            { kind: 'label', at: [DEV_LEFT, DEV_BOTTOM + 12], text: 'SEAM ALLOWANCE — FOLD BEFORE ASSEMBLY', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 8. Industrial Worked Example — A Hopper Chute ──
  (function () {
    const baseSide = 70, topSide = 24, H = 50;
    const baseHalfDiag = baseSide * Math.SQRT2 / 2, topHalfDiag = topSide * Math.SQRT2 / 2;
    const trueEdge = Math.sqrt(H * H + (baseHalfDiag - topHalfDiag) * (baseHalfDiag - topHalfDiag));
    const virtualFull = trueEdge * baseHalfDiag / (baseHalfDiag - topHalfDiag);
    const cutLen = virtualFull - trueEdge;

    const FV_CX = 55, FV_BOTTOM = 130, FV_TOP = FV_BOTTOM - H;
    const apex = [135, 80];
    // each face subtends 2·asin(half the base side / the full edge) at the apex, so every outer chord is
    // exactly one base side and every inner chord one top side; the fan is centred on -40°
    const angStep = 2 * Math.asin(baseSide / 2 / virtualFull) / D2R, angStart = -40 - 2 * angStep;
    const outerPts = Array.from({ length: 5 }, (_, i) => {
      const a = angStart + i * angStep;
      return [apex[0] + virtualFull * Math.cos(a * D2R), apex[1] + virtualFull * Math.sin(a * D2R)];
    });
    const innerPts = Array.from({ length: 5 }, (_, i) => {
      const a = angStart + i * angStep;
      return [apex[0] + cutLen * Math.cos(a * D2R), apex[1] + cutLen * Math.sin(a * D2R)];
    });

    CONSTRUCTIONS['hopper-chute-worked-example'] = {
      id: 'hopper-chute-worked-example', title: 'Industrial Worked Example — A Hopper Chute',
      summary: 'A grain, sand or aggregate feed chute is exactly this shape — a square-to-square hopper, fabricated from a single flat development pattern.',
      bounds: { w: 240, h: 190 },
      workbookPrompt: 'A feed hopper (70 mm square inlet, 24 mm square outlet, 50 mm tall — at 1:20 scale, a real 1.4 m × 0.48 m chute) is to be fabricated from sheet steel. Draw the front view and the complete development pattern.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view of the hopper — the shape a fabricator would be given as the design.',
          calloutAt: [FV_CX, FV_TOP + H / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_CX - baseSide / 2, FV_BOTTOM], [FV_CX + baseSide / 2, FV_BOTTOM], [FV_CX + topSide / 2, FV_TOP], [FV_CX - topSide / 2, FV_TOP]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Find the true edge length, then the virtual full-pyramid apex distance — the same calculation as every hopper development in this chapter.',
          measurement: { label: 'TL = ' + trueEdge.toFixed(1) + ' mm, virtual apex distance = ' + virtualFull.toFixed(1) + ' mm' },
          calloutAt: apex,
          reveals: [{ kind: 'point', at: apex, label: '' }],
        },
        {
          id: 3,
          instruction: 'Construct the outer and inner radial points, exactly as before.',
          calloutAt: G.midpoint(outerPts[2], innerPts[2]),
          reveals: [
            ...outerPts.map(p => ({ kind: 'line', p1: apex, p2: p, lineType: 'construction' })),
            ...outerPts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#f472b6' })),
            ...innerPts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#eab308' })),
          ],
        },
        {
          id: 4,
          instruction: 'Join the outer and inner points to complete the fabrication-ready development — this flat pattern is what actually gets cut from the sheet steel, then folded on the four internal lines.',
          calloutAt: [apex[0] - 40, apex[1] + 70],
          reveals: [
            { kind: 'line', p1: outerPts[0], p2: outerPts[1], lineType: 'A' }, { kind: 'line', p1: outerPts[1], p2: outerPts[2], lineType: 'A' },
            { kind: 'line', p1: outerPts[2], p2: outerPts[3], lineType: 'A' }, { kind: 'line', p1: outerPts[3], p2: outerPts[4], lineType: 'A' },
            { kind: 'line', p1: innerPts[0], p2: innerPts[1], lineType: 'A' }, { kind: 'line', p1: innerPts[1], p2: innerPts[2], lineType: 'A' },
            { kind: 'line', p1: innerPts[2], p2: innerPts[3], lineType: 'A' }, { kind: 'line', p1: innerPts[3], p2: innerPts[4], lineType: 'A' },
            { kind: 'line', p1: innerPts[0], p2: outerPts[0], lineType: 'A' }, { kind: 'line', p1: innerPts[4], p2: outerPts[4], lineType: 'A' },
            ...[1, 2, 3].map(k => ({ kind: 'line', p1: innerPts[k], p2: outerPts[k], lineType: 'B' })),
            { kind: 'label', at: [outerPts[4][0] + 6, outerPts[4][1] + 2], text: 'READY TO CUT & FOLD', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'What is a "transition piece" in engineering drawing?',
      options: [
        'A fitting that connects two different cross-sectional shapes, e.g. a square duct to a round pipe',
        'Any drawing showing a solid mid-way through construction',
        'A synonym for a cutting plane',
        'A part that has no development at all',
      ],
      answer: 0,
      explanation: 'A transition piece (commonly a hopper or duct fitting) smoothly connects two different shapes — most often a square/rectangular opening at one end and a round one at the other.',
    },
    {
      text: 'Why can\'t a round-to-square transition piece be developed using the simple cone or prism method?',
      options: [
        'Because its surface is neither a true cone nor a true prism — it needs to be broken into a mesh of individual triangles (triangulation) instead',
        'Round-to-square transitions cannot be developed at all, by any method',
        'The cone method always works for every possible shape',
        'Only cylinders can ever be developed',
      ],
      answer: 0,
      explanation: 'Since the surface is doubly curved / irregular (neither a simple cone nor a prism), it has to be approximated by a mesh of flat triangular panels, each developed individually and joined — the triangulation method.',
    },
    {
      text: 'In the triangulation method for a round-to-square transition, what are the two kinds of triangles in the mesh?',
      options: [
        '"Corner" triangles (apex at a square corner) and "side" triangles (apex at a circle point), alternating all the way around',
        'Only one kind of triangle is ever used',
        'Triangles are never used — only rectangles',
        'The mesh uses squares, not triangles',
      ],
      answer: 0,
      explanation: 'The standard method alternates between triangles with their apex at a square corner (spanning to two nearby circle points) and triangles with their apex at a circle point (spanning to a square edge) — together tiling the whole transition surface.',
    },
    {
      text: 'For an ALIGNED (concentric) square-to-square hopper, what shape is its development?',
      options: [
        'Four true-size trapezoids, found using the true edge length and a "virtual full pyramid" apex, via similar triangles',
        'A single rectangle, exactly like a cylinder',
        'It cannot be developed since it has two different-size ends',
        'Four identical isoceles triangles, exactly like a full pyramid',
      ],
      answer: 0,
      explanation: 'A concentric square-to-square hopper is a truncated (cut-off) pyramid. Extending its edges to a virtual full apex, and using similar triangles to find both the outer and inner radii, produces four true-size trapezoids.',
    },
    {
      text: 'Why is a "seam allowance" added to a development, beyond its true outline?',
      options: [
        'To provide extra material that gets folded or overlapped to physically close and seal the joint when the flat sheet is formed into its 3D shape',
        'It is a mistake — developments should never be larger than the true surface',
        'Seam allowances are purely decorative',
        'It replaces the need for any fold lines',
      ],
      answer: 0,
      explanation: 'The true development shows only the finished surface. A little extra material — the seam allowance — has to be added at the join so there is something to fold over or overlap and fasten, closing the seam.',
    },
    {
      text: 'Before ANY triangle in a triangulation mesh can be unfolded into the development, what must be found first?',
      options: [
        'The TRUE LENGTH of each of its sloping edges — foreshortened edges cannot be used directly as compass radii',
        'The colour of the finished part',
        'Nothing extra is needed; the front view lengths can be used directly',
        'Only the area of the triangle, not its edge lengths',
      ],
      answer: 0,
      explanation: 'Every sloping edge in the mesh is (in general) an oblique line, foreshortened in the standard views — exactly like any other true-length problem, it must be solved before that length can be used as a compass radius in the development.',
    },
    {
      text: 'Once the true lengths of a triangle\'s three sides are known, how is that triangle actually constructed in the development?',
      options: [
        'Draw one known edge at true length, then swing arcs of the other two true lengths from its ends — their intersection is the third point',
        'Simply copy the triangle\'s shape directly from the front view',
        'Estimate the triangle\'s shape by eye',
        'Triangles cannot be constructed from three known side lengths alone',
      ],
      answer: 0,
      explanation: 'This is the standard "swing two arcs" method: with all three true side lengths known, a triangle can always be constructed exactly by drawing one side, then intersecting arcs of the other two lengths from its ends.',
    },
    {
      text: 'A hopper connects a 1.4 m square inlet to a 0.48 m square outlet, drawn at a scale of 1:20. What real-world industries commonly use exactly this kind of transition piece?',
      options: [
        'Bulk material handling (grain, sand, aggregate feed chutes) and HVAC ducting',
        'Only aerospace engineering uses transition pieces',
        'Transition pieces have no real industrial application — they are only an academic exercise',
        'Only electronics manufacturing uses this shape',
      ],
      answer: 0,
      explanation: 'Hoppers and transition pieces are everyday sheet-metal fabrications — feed chutes in bulk material handling, and duct transitions in HVAC systems, are both built directly from developments exactly like the ones in this chapter.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'hopper-views', 'hopper-true-length', 'hopper-development', 'triangulation-principle',
    'corner-triangle-true-length', 'two-triangles-development', 'seam-allowance', 'hopper-chute-worked-example',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
