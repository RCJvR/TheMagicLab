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

  // ── 1. Isometric Wedge: Isometric vs Non-Isometric Lines ──
  (function () {
    const O = [90, 120];
    const WIDTH = 55, DEPTH = 40, HEIGHT = 45;
    const A = iso(O, WIDTH, 0);
    const B = iso(O, 0, DEPTH);
    const C = iso(O, WIDTH, DEPTH);
    const FrontTop = [O[0], O[1] - HEIGHT];
    const RightTop = [A[0], A[1] - HEIGHT];
    const LeftTop = [B[0], B[1] - HEIGHT];
    const axisTip = { up: [O[0], O[1] - 18], right: iso(O, 18, 0), left: iso(O, 0, 18) };

    CONSTRUCTIONS['isometric-wedge'] = {
      id: 'isometric-wedge', title: 'Isometric Wedge',
      summary: 'Build a wedge block from the three isometric axes, then add its sloped top — a non-isometric line that must be constructed, not measured.',
      bounds: { w: 190, h: 145 },
      workbookPrompt: 'Draw the isometric wedge block. Start with the three axes, build the base and vertical edges to true size, then join the sloped top with straight (non-isometric) lines.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the three isometric axes from a single corner O: one vertical (true height), one at 30° to the right (true width), one at 30° to the left (true depth).',
          calloutAt: O,
          reveals: [
            { kind: 'line', p1: O, p2: axisTip.up, lineType: 'construction' },
            { kind: 'line', p1: O, p2: axisTip.right, lineType: 'construction' },
            { kind: 'line', p1: O, p2: axisTip.left, lineType: 'construction' },
            { kind: 'point', at: O, label: 'O' },
          ],
        },
        {
          id: 2,
          instruction: 'Mark the true width and depth along the two receding axes to find corners A and B, then complete the base by drawing to the back corner C — every one of these lines is isometric (parallel to an axis), so all are measured directly.',
          calloutAt: [A[0], A[1] - 6],
          reveals: [
            { kind: 'line', p1: O, p2: A, lineType: 'A' },
            { kind: 'line', p1: O, p2: B, lineType: 'A' },
            { kind: 'line', p1: A, p2: C, lineType: 'A' },
            { kind: 'line', p1: B, p2: C, lineType: 'A' },
            { kind: 'point', at: A, label: 'A' }, { kind: 'point', at: B, label: 'B' }, { kind: 'point', at: C, label: 'C' },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the vertical edges at O, A and B up to the front height — still isometric lines, since they run parallel to the vertical axis.',
          calloutAt: [O[0] - 8, (O[1] + FrontTop[1]) / 2],
          reveals: [
            { kind: 'line', p1: O, p2: FrontTop, lineType: 'A' },
            { kind: 'line', p1: A, p2: RightTop, lineType: 'A' },
            { kind: 'line', p1: B, p2: LeftTop, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Connect the peak: join FrontTop to RightTop and to LeftTop. These are also isometric lines, parallel to the width and depth axes.',
          calloutAt: [FrontTop[0], FrontTop[1] - 6],
          reveals: [
            { kind: 'line', p1: FrontTop, p2: RightTop, lineType: 'A' },
            { kind: 'line', p1: FrontTop, p2: LeftTop, lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'The top now slopes down to nothing at the back corner C. This sloped edge is NON-isometric — it isn\'t parallel to any of the three axes, so its length can\'t be measured directly. Since both its endpoints (RightTop and C) are already known, simply join them with a straight line.',
          calloutAt: [(RightTop[0] + C[0]) / 2 + 6, (RightTop[1] + C[1]) / 2],
          reveals: [
            { kind: 'line', p1: RightTop, p2: C, lineType: 'A' },
            { kind: 'line', p1: LeftTop, p2: C, lineType: 'A' },
          ],
        },
        {
          id: 6,
          instruction: 'Add dimensions for width, depth and height, and note the two non-isometric lines.',
          calloutAt: [70, 138],
          reveals: [
            { kind: 'dimension', p1: O, p2: A, offset: 14, text: String(WIDTH) },
            { kind: 'dimension', p1: O, p2: B, offset: -14, text: String(DEPTH) },
            { kind: 'dimension', p1: [O[0] - 20, O[1]], p2: [O[0] - 20, FrontTop[1]], offset: -6, text: String(HEIGHT) },
            { kind: 'label', at: [55, 138], text: 'NON-ISOMETRIC LINES: RightTop–C, LeftTop–C', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 2. Isometric Circle: Coordinate (Ordinate) Method ──
  (function () {
    const O2 = [70, 108];
    const S = 50, R = S / 2; // diameter S, radius R
    const A2 = iso(O2, S, 0), C2 = iso(O2, S, S), B2 = iso(O2, 0, S);
    const centre = iso(O2, R, R);

    const circlePts = [];
    for (let i = 0; i < 12; i++) {
      const th = i * Math.PI / 6;
      circlePts.push(iso(O2, R + R * Math.cos(th), R + R * Math.sin(th)));
    }
    const closedPts = circlePts.concat([circlePts[0], circlePts[1]]);
    const smoothCurve = G.catmullRomExpand(closedPts, 8);

    CONSTRUCTIONS['isometric-circle'] = {
      id: 'isometric-circle', title: 'Isometric Circle',
      summary: 'Construct an isometric circle (an ellipse) on the top face by plotting points from the true circle onto the isometric grid, then joining them with a smooth curve.',
      bounds: { w: 160, h: 130 },
      workbookPrompt: 'Draw the isometric square, plot at least 8 points of the circle onto it using the coordinate method, and join them into a smooth isometric circle.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the isometric square (rhombus) on the top face — its side length equals the circle\'s true diameter.',
          calloutAt: centre,
          reveals: [
            { kind: 'line', p1: O2, p2: A2, lineType: 'A' },
            { kind: 'line', p1: A2, p2: C2, lineType: 'A' },
            { kind: 'line', p1: C2, p2: B2, lineType: 'A' },
            { kind: 'line', p1: B2, p2: O2, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'A curved line can\'t be measured directly, so plot points instead: divide the true circle into equal steps, then transfer each point onto the isometric grid using the same two axis directions.',
          calloutAt: [centre[0], centre[1] - 8],
          reveals: circlePts.map((p, i) => ({ kind: 'point', at: p, size: 1.1, color: '#fde047' })),
        },
        {
          id: 3,
          instruction: 'Join the plotted points with a smooth curve — this is the isometric circle. Notice it is an ellipse, not a circle, even though it represents a true circle on the top face.',
          calloutAt: [centre[0] + 20, centre[1]],
          reveals: [{ kind: 'polyline', points: smoothCurve, lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Add the centre lines through the ellipse, along the same two isometric axis directions.',
          calloutAt: [centre[0], centre[1] + 10],
          reveals: [
            { kind: 'line', p1: iso(centre, -R - 4, 0), p2: iso(centre, R + 4, 0), lineType: 'centre' },
            { kind: 'line', p1: iso(centre, 0, -R - 4), p2: iso(centre, 0, R + 4), lineType: 'centre' },
          ],
        },
      ],
    };
  })();

  // ── 3. Isometric Hexagonal Prism (Box Method for Polygons) ──
  (function () {
    const O3 = [95, 145], PRISM_H = 30;
    const r = 25; // hexagon circumradius (= side length)
    const trueVerts = Array.from({ length: 6 }, (_, i) => {
      const a = i * Math.PI / 3;
      return [r * Math.cos(a) + r, r * Math.sin(a) + r * 0.866]; // shifted into a bounding box, x:[0,2r], y:[0,~1.73r]
    });
    const boxW = 2 * r, boxD = r * Math.sqrt(3);
    const topVerts = trueVerts.map(p => iso(O3, p[0], p[1]));
    const boxCorners = [O3, iso(O3, boxW, 0), iso(O3, boxW, boxD), iso(O3, 0, boxD)];
    const botVerts = topVerts.map(p => raise(p, -PRISM_H)); // extrude DOWN (prism hangs below the top face)

    CONSTRUCTIONS['isometric-hexagon'] = {
      id: 'isometric-hexagon', title: 'Isometric Hexagonal Prism (Box Method)',
      summary: 'Construct a regular hexagon in isometric using the box method: every hexagon vertex is located by its true X/Y offset within an isometric bounding rectangle.',
      bounds: { w: 190, h: 190 },
      workbookPrompt: 'Construct the isometric bounding box for a regular hexagon (side 25 mm), plot the six vertices using their true offsets, then extrude the prism 30 mm.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the isometric bounding rectangle for the hexagon on the top face — every edge of a rectangle is isometric, so the box itself is fully measurable.',
          calloutAt: O3,
          reveals: boxCorners.map((p, i) => ({ kind: 'line', p1: p, p2: boxCorners[(i + 1) % 4], lineType: 'construction' })),
        },
        {
          id: 2,
          instruction: 'The hexagon\'s edges are NOT isometric — so instead of measuring them directly, plot each vertex using its true X and Y offset from the box corner. Each offset itself IS isometric, since it runs parallel to a box edge.',
          calloutAt: topVerts[0],
          reveals: topVerts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#fde047' })),
        },
        {
          id: 3,
          instruction: 'Join the six points to complete the isometric hexagon on the top face.',
          calloutAt: G.midpoint(topVerts[0], topVerts[1]),
          reveals: [{ kind: 'polygon', points: topVerts, lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Extrude the prism downward by the true height — every vertical edge is isometric — then complete the two visible side faces.',
          calloutAt: [O3[0], O3[1] - PRISM_H / 2],
          reveals: [
            ...topVerts.map((p, i) => ({ kind: 'line', p1: p, p2: botVerts[i], lineType: 'A' })),
            { kind: 'line', p1: botVerts[0], p2: botVerts[1], lineType: 'A' },
            { kind: 'line', p1: botVerts[1], p2: botVerts[2], lineType: 'A' },
            { kind: 'line', p1: botVerts[2], p2: botVerts[3], lineType: 'A' },
            { kind: 'dimension', p1: topVerts[0], p2: botVerts[0], offset: -14, text: String(PRISM_H) },
          ],
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
    // Given (small) orthographic views, top-left of the canvas.
    const GX = 12, GY = 12, GW = 50, GH = 40, STEP_W = 20, STEP_H = 25;
    const fv = [[GX, GY], [GX + STEP_W, GY], [GX + STEP_W, GY + (GH - STEP_H)], [GX + GW, GY + (GH - STEP_H)], [GX + GW, GY + GH], [GX, GY + GH]];
    const tv = { x: GX, y: GY + GH + 10, w: GW, h: 24 };

    // Isometric build, main area.
    const O5 = [110, 175], BASE_W = 50, BASE_D = 35, BASE_H = 15, UP_W = 20, UP_D = 35, UP_H = 25;
    const bA = iso(O5, BASE_W, 0), bB = iso(O5, 0, BASE_D), bC = iso(O5, BASE_W, BASE_D);
    const bA_t = raise(bA, BASE_H), bB_t = raise(bB, BASE_H), bC_t = raise(bC, BASE_H), bO_t = raise(O5, BASE_H);
    const uO = bO_t, uB = bB_t; // upright sits on the back-left of the base
    const uA = iso(uO, UP_W, 0), uC = iso(uO, UP_W, UP_D), uB2 = iso(uO, 0, UP_D);
    const uA_t = raise(uA, UP_H), uB_t = raise(uB2, UP_H), uC_t = raise(uC, UP_H), uO_t = raise(uO, UP_H);

    CONSTRUCTIONS['isometric-from-views'] = {
      id: 'isometric-from-views', title: 'Isometric Drawing from Given Orthographic Views',
      summary: 'The real exam skill: given a front and top view, build the isometric pictorial by reading dimensions straight off them — no dimensions are given as raw numbers.',
      bounds: { w: 210, h: 210 },
      workbookPrompt: 'Given the front and top views of the L-shaped block, draw a full isometric pictorial. Every isometric dimension must be read directly off the two given views.',
      steps: [
        {
          id: 1,
          instruction: 'GIVEN: study the front view (an L-shaped profile — a low wide base with a narrower upright at the back-left) and the top view (a plain rectangle, since the L-shape doesn\'t change through the depth).',
          calloutAt: [GX + GW / 2, GY + GH / 2],
          reveals: [
            { kind: 'polygon', points: fv, lineType: 'A' },
            { kind: 'polygon', points: [[tv.x, tv.y], [tv.x + tv.w, tv.y], [tv.x + tv.w, tv.y + tv.h], [tv.x, tv.y + tv.h]], lineType: 'A' },
            { kind: 'label', at: [GX, GY - 4], text: 'GIVEN', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'Start the isometric build with the wide BASE box, reading width, depth and height straight off the given views (50 × 35 × 15 mm).',
          calloutAt: O5,
          reveals: [
            { kind: 'line', p1: O5, p2: bA, lineType: 'A' }, { kind: 'line', p1: O5, p2: bB, lineType: 'A' }, { kind: 'line', p1: bA, p2: bC, lineType: 'A' }, { kind: 'line', p1: bB, p2: bC, lineType: 'A' },
            { kind: 'line', p1: O5, p2: bO_t, lineType: 'A' }, { kind: 'line', p1: bA, p2: bA_t, lineType: 'A' }, { kind: 'line', p1: bB, p2: bB_t, lineType: 'A' }, { kind: 'line', p1: bC, p2: bC_t, lineType: 'A' },
            { kind: 'line', p1: bO_t, p2: bA_t, lineType: 'A' }, { kind: 'line', p1: bO_t, p2: bB_t, lineType: 'A' }, { kind: 'line', p1: bA_t, p2: bC_t, lineType: 'A' }, { kind: 'line', p1: bB_t, p2: bC_t, lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Add the narrower UPRIGHT box on top of the base\'s back-left portion (20 × 35 × 25 mm) — again, every dimension is read off the given views, not invented.',
          calloutAt: uO,
          reveals: [
            { kind: 'line', p1: uO, p2: uA, lineType: 'A' }, { kind: 'line', p1: uO, p2: uB2, lineType: 'A' }, { kind: 'line', p1: uA, p2: uC, lineType: 'A' }, { kind: 'line', p1: uB2, p2: uC, lineType: 'A' },
            { kind: 'line', p1: uA, p2: uA_t, lineType: 'A' }, { kind: 'line', p1: uB2, p2: uB_t, lineType: 'A' }, { kind: 'line', p1: uC, p2: uC_t, lineType: 'A' }, { kind: 'line', p1: uO, p2: uO_t, lineType: 'A' },
            { kind: 'line', p1: uO_t, p2: uA_t, lineType: 'A' }, { kind: 'line', p1: uO_t, p2: uB_t, lineType: 'A' }, { kind: 'line', p1: uA_t, p2: uC_t, lineType: 'A' }, { kind: 'line', p1: uB_t, p2: uC_t, lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Unlike the wedge earlier in this chapter, every single edge on this L-shaped prism is isometric — there is no sloped, non-isometric line to worry about here.',
          calloutAt: [O5[0] + BASE_W / 2, O5[1] + 20],
          reveals: [
            { kind: 'label', at: [O5[0] - 20, O5[1] + 20], text: 'EVERY EDGE IS ISOMETRIC — NO SLOPE', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 6. Sectioned Isometric — Quarter Section ──
  (function () {
    const O6 = [105, 160], W = 50, D = 50, H = 35;
    const A6 = iso(O6, W, 0), B6 = iso(O6, 0, D), C6 = iso(O6, W, D);
    const MidA = iso(O6, W / 2, 0), MidB = iso(O6, 0, D / 2), Mid = iso(O6, W / 2, D / 2);
    const bottomOutline = [MidA, A6, C6, B6, MidB, Mid];
    const topOutline = bottomOutline.map(p => raise(p, H));

    function isoHatch(p1, p2, h, n) {
      const lines = [];
      for (let i = 1; i < n; i++) {
        const p = lerp(p1, p2, i / n);
        lines.push({ kind: 'line', p1: p, p2: raise(p, h), lineType: 'B' });
      }
      return lines;
    }

    CONSTRUCTIONS['sectioned-isometric'] = {
      id: 'sectioned-isometric', title: 'Sectioned Isometric — Quarter Section',
      summary: 'To section an isometric drawing, a quarter is imagined removed along the two vertical planes through the centre — exposing two internal faces, hatched exactly like an orthographic section.',
      bounds: { w: 180, h: 200 },
      workbookPrompt: 'Draw the 50 mm cube in isometric with a quarter removed (cut along the two vertical centre planes), and hatch both newly-exposed internal faces.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the full isometric block — this is the object BEFORE sectioning, all three faces solid and unbroken.',
          calloutAt: O6,
          reveals: [
            { kind: 'line', p1: O6, p2: A6, lineType: 'construction' }, { kind: 'line', p1: O6, p2: B6, lineType: 'construction' },
            { kind: 'line', p1: A6, p2: C6, lineType: 'construction' }, { kind: 'line', p1: B6, p2: C6, lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Mark the halfway points on the two front edges, and the point directly above them where the two internal cutting planes will meet — the true vertical centre line of the block.',
          calloutAt: Mid,
          reveals: [
            { kind: 'point', at: MidA, label: '' }, { kind: 'point', at: MidB, label: '' }, { kind: 'point', at: Mid, label: '' },
            { kind: 'line', p1: Mid, p2: raise(Mid, H), lineType: 'centre' },
          ],
        },
        {
          id: 3,
          instruction: 'Remove the front quarter: redraw the top and bottom outlines as an L-shape (six points each) instead of the original rhombus, then join with vertical edges — this exposes two new internal faces along the cut.',
          calloutAt: [Mid[0], Mid[1] - H / 2],
          reveals: [
            { kind: 'polygon', points: bottomOutline, lineType: 'A' },
            { kind: 'polygon', points: topOutline, lineType: 'A' },
            ...bottomOutline.map((p, i) => ({ kind: 'line', p1: p, p2: topOutline[i], lineType: 'A' })),
          ],
        },
        {
          id: 4,
          instruction: 'Hatch both newly-exposed cut faces — the same sectioning convention used throughout this course, just applied on an isometric drawing instead of an orthographic one. The rest of the block stays a normal, unhatched exterior view.',
          calloutAt: [MidA[0] + 10, MidA[1] - H / 2],
          reveals: [
            ...isoHatch(Mid, MidA, H, 5),
            ...isoHatch(Mid, MidB, H, 5),
          ],
        },
      ],
    };
  })();

  // ── 7. Isometric Cylinder ──
  (function () {
    const O7 = [90, 165], R = 22, H = 45;
    const botPts = Array.from({ length: 12 }, (_, i) => {
      const th = i * Math.PI / 6;
      return iso(O7, R + R * Math.cos(th), R + R * Math.sin(th));
    });
    const topPts = botPts.map(p => raise(p, H));
    const botSmooth = G.catmullRomExpand(botPts.concat([botPts[0], botPts[1]]), 8);
    const topSmooth = G.catmullRomExpand(topPts.concat([topPts[0], topPts[1]]), 8);
    let leftI = 0, rightI = 0;
    botPts.forEach((p, i) => { if (p[0] < botPts[leftI][0]) leftI = i; if (p[0] > botPts[rightI][0]) rightI = i; });
    const centreBot = iso(O7, R, R), centreTop = raise(centreBot, H);

    CONSTRUCTIONS['isometric-cylinder'] = {
      id: 'isometric-cylinder', title: 'Isometric Cylinder',
      summary: 'Two isometric circles, one raised above the other by the true height, joined by the two tangent lines where the round surface\'s silhouette actually is — the standard way to draw a cylinder, pin or bush.',
      bounds: { w: 155, h: 190 },
      workbookPrompt: 'Construct an isometric cylinder, 44 mm diameter, 45 mm tall: the bottom circle, the top circle (raised by the true height), and the two tangent side lines.',
      steps: [
        {
          id: 1,
          instruction: 'Plot and join the BOTTOM isometric circle on the base plane, using the coordinate (point-plotting) method.',
          calloutAt: centreBot,
          reveals: [{ kind: 'polyline', points: botSmooth, lineType: 'A' }],
        },
        {
          id: 2,
          instruction: 'Plot and join the TOP isometric circle — identical in shape to the bottom one, simply raised by the cylinder\'s true height.',
          calloutAt: centreTop,
          reveals: [{ kind: 'polyline', points: topSmooth, lineType: 'A' }],
        },
        {
          id: 3,
          instruction: 'Find the leftmost and rightmost points on each ellipse — this is exactly where the cylinder\'s round outer surface is tangent to your line of sight — and join top to bottom with two straight vertical lines. These complete the visible sides of the cylinder.',
          calloutAt: botPts[leftI],
          reveals: [
            { kind: 'line', p1: botPts[leftI], p2: topPts[leftI], lineType: 'A' },
            { kind: 'line', p1: botPts[rightI], p2: topPts[rightI], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Add centre lines through both ellipses and dimension the diameter and height.',
          calloutAt: [centreBot[0], centreBot[1] + 15],
          reveals: [
            { kind: 'line', p1: iso(centreBot, -R - 4, 0), p2: iso(centreBot, R + 4, 0), lineType: 'centre' },
            { kind: 'line', p1: iso(centreTop, -R - 4, 0), p2: iso(centreTop, R + 4, 0), lineType: 'centre' },
            { kind: 'line', p1: centreBot, p2: centreTop, lineType: 'centre' },
            { kind: 'dimension', p1: botPts[leftI], p2: topPts[leftI], offset: -12, text: String(H) },
          ],
        },
      ],
    };
  })();

  // ── 8. Isometric Circle on a Vertical Face ──
  (function () {
    const O8 = [70, 150], S = 44, R = S / 2;
    const A8 = iso(O8, S, 0), topO8 = raise(O8, S), topA8 = raise(A8, S);
    const circlePts = Array.from({ length: 12 }, (_, i) => {
      const th = i * Math.PI / 6;
      return isoFront(O8, R + R * Math.cos(th), R + R * Math.sin(th));
    });
    const smoothCurve = G.catmullRomExpand(circlePts.concat([circlePts[0], circlePts[1]]), 8);
    const centre = isoFront(O8, R, R);

    CONSTRUCTIONS['isometric-circle-vertical'] = {
      id: 'isometric-circle-vertical', title: 'Isometric Circle on a Vertical Face',
      summary: 'The same coordinate method builds a circle on ANY isometric face — but the ellipse tilts differently on each of the three principal planes. This is the front-face version.',
      bounds: { w: 130, h: 150 },
      workbookPrompt: 'Draw the isometric square on the front-right face (44 mm side), plot the circle\'s points using the vertical and width axes, and join them into a smooth curve.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the isometric square on the FRONT-RIGHT face this time — built from the true vertical axis and the right 30° (width) axis, not the two receding axes used for a top-face circle.',
          calloutAt: centre,
          reveals: [
            { kind: 'line', p1: O8, p2: A8, lineType: 'A' },
            { kind: 'line', p1: A8, p2: topA8, lineType: 'A' },
            { kind: 'line', p1: topA8, p2: topO8, lineType: 'A' },
            { kind: 'line', p1: topO8, p2: O8, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Plot the circle\'s points using the same coordinate method as before, but now along the vertical and width axes.',
          calloutAt: [centre[0], centre[1] - 8],
          reveals: circlePts.map(p => ({ kind: 'point', at: p, size: 1.1, color: '#fde047' })),
        },
        {
          id: 3,
          instruction: 'Join the points with a smooth curve. Compare this ellipse\'s tilt to the top-face circle earlier in this chapter — each of the three isometric planes produces a differently-oriented ellipse for the exact same true circle.',
          calloutAt: [centre[0] + 18, centre[1]],
          reveals: [{ kind: 'polyline', points: smoothCurve, lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'Add the centre lines, again along the vertical and width axes.',
          calloutAt: [centre[0], centre[1] + 10],
          reveals: [
            { kind: 'line', p1: isoFront(centre, -R - 4, 0), p2: isoFront(centre, R + 4, 0), lineType: 'centre' },
            { kind: 'line', p1: raise(centre, -R - 4), p2: raise(centre, R + 4), lineType: 'centre' },
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
      explanation: 'The sloped edges run from the full-height peak down to a zero-height back corner — a direction that does not match the vertical axis or either 30° axis, which is exactly what makes a line non-isometric.',
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
