// Loci — Chapter 12 data (Cam, Mechanism & Helix). Requires engine-geometry.js loaded first
// (window.ConstructionGeometry). Renamed from "Mechanical Analytical" — that name is reserved
// for the real reading/interpretation-skill topic (dimensioning, symbols, tolerances), a
// separate chapter. This chapter covers the actual CAPS/SAGS "Loci" topic: cam displacement
// diagrams & profiles, mechanism loci, and the helix.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};
  const D2R = Math.PI / 180;

  function polarPt(cx, cy, r, thetaDeg) {
    const a = (thetaDeg - 90) * D2R;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }

  // ── 1. Cam Displacement Diagram — The Semicircle (SHM) Method ──
  (function () {
    const GX0 = 40, DIV_W = 25, DIVISIONS = 6;
    const BASE_Y = 150, LIFT = 60, TOP_Y = BASE_Y - LIFT;
    const GX = i => GX0 + i * DIV_W;
    const GX6 = GX(DIVISIONS);

    // Semicircle on the lift line as diameter, centre C, radius LIFT/2, bulging LEFT (away
    // from the graph body) so it can be divided without overlapping the curve it generates.
    const C = [GX0, (BASE_Y + TOP_Y) / 2], SR = LIFT / 2;
    function semiPt(t) { // t in [0,1] maps to angle 90°→270° (the left-bulging half)
      const a = (90 + 180 * t) * D2R;
      return [C[0] + SR * Math.cos(a), C[1] + SR * Math.sin(a)];
    }
    const semiArc = [];
    for (let i = 0; i <= 48; i++) semiArc.push(semiPt(i / 48));

    const divPts = []; // the DIVISIONS+1 equally-spaced points ON the semicircle
    for (let i = 0; i <= DIVISIONS; i++) divPts.push(semiPt(i / DIVISIONS));
    const curvePts = divPts.map((p, i) => [GX(i), p[1]]); // projected onto the graph
    const smoothCurve = G.catmullRomExpand(curvePts, 14);

    CONSTRUCTIONS['cam-shm-semicircle'] = {
      id: 'cam-shm-semicircle', title: 'Cam Displacement Diagram — SHM Semicircle Method',
      summary: 'The classic drafting technique for plotting a simple-harmonic-motion displacement curve without any trigonometry — a semicircle, divided into equal parts, projected across.',
      bounds: { w: 210, h: 175 },
      workbookPrompt: 'Construct the SHM displacement diagram for a 60 mm rise over 180° of cam rotation, using the semicircle method: divide the semicircle into 6 equal parts, project each division across, and join the points with a smooth curve.',
      steps: [
        {
          id: 1,
          instruction: 'Set up the displacement diagram axes: the horizontal axis is cam rotation angle (0°–180° for this rise), the vertical axis is follower displacement. Divide the angle axis into 6 equal parts (30° each).',
          calloutAt: [(GX0 + GX6) / 2, BASE_Y],
          reveals: [
            { kind: 'line', p1: [GX0, BASE_Y], p2: [GX6 + 6, BASE_Y], lineType: 'A' },
            { kind: 'line', p1: [GX0, BASE_Y + 4], p2: [GX0, TOP_Y - 4], lineType: 'A' },
            ...Array.from({ length: DIVISIONS + 1 }, (_, i) => ({ kind: 'line', p1: [GX(i), BASE_Y], p2: [GX(i), TOP_Y], lineType: 'construction' })),
            ...Array.from({ length: DIVISIONS + 1 }, (_, i) => ({ kind: 'label', at: [GX(i) - 4, BASE_Y + 10], text: (i * 30) + '°', size: 3.6, anchor: 'start', color: '#94a3b8' })),
          ],
        },
        {
          id: 2,
          instruction: 'On the vertical lift line, draw a semicircle with the full lift as its diameter, then divide it into the SAME 6 equal angular parts (30° each) using a protractor.',
          calloutAt: [C[0] - SR, C[1]],
          reveals: [
            { kind: 'polyline', points: semiArc, lineType: 'A' },
            ...divPts.map(p => ({ kind: 'point', at: p, size: 1.1, color: '#eab308' })),
            ...divPts.map(p => ({ kind: 'line', p1: C, p2: p, lineType: 'construction' })),
            { kind: 'dimension', p1: [GX0 - 14, BASE_Y], p2: [GX0 - 14, TOP_Y], offset: -6, text: LIFT.toFixed(0) },
          ],
        },
        {
          id: 3,
          instruction: 'Project each of the 6 semicircle division points horizontally across the diagram until it meets its matching angle division line, and mark the intersection point.',
          calloutAt: [(GX0 + GX6) / 2, (BASE_Y + TOP_Y) / 2],
          reveals: [
            ...divPts.map((p, i) => ({ kind: 'line', p1: p, p2: curvePts[i], lineType: 'construction' })),
            ...curvePts.map(p => ({ kind: 'point', at: p, size: 1.3, color: '#f472b6' })),
          ],
        },
        {
          id: 4,
          instruction: 'Join the 7 intersection points with a smooth curve — this is the SHM displacement diagram. Notice it is NOT a straight line: the follower accelerates away from each dwell and decelerates smoothly into the next, unlike uniform velocity motion.',
          calloutAt: [GX(3), curvePts[3][1] - 10],
          reveals: [
            { kind: 'polyline', points: smoothCurve, lineType: 'A' },
            { kind: 'label', at: [GX(1), TOP_Y - 8], text: 'SHM DISPLACEMENT CURVE', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. Locus of a Point on a Slider-Crank Mechanism ──
  (function () {
    const O = [60, 100], R = 15, L = 45, N = 12;
    const SLIDE_X0 = O[0] + 20, SLIDE_X1 = O[0] + R + L + 5;

    function crankPos(i) {
      const a = (i * 360 / N) * D2R;
      return [O[0] + R * Math.cos(a), O[1] + R * Math.sin(a)];
    }
    function sliderPos(A) {
      const dy = A[1] - O[1];
      return [A[0] + Math.sqrt(L * L - dy * dy), O[1]];
    }

    const positions = Array.from({ length: N }, (_, i) => {
      const A = crankPos(i);
      const B = sliderPos(A);
      const M = G.midpoint(A, B);
      return { A, B, M };
    });
    const locusPts = positions.map(p => p.M);
    const smoothLocus = G.catmullRomExpand([...locusPts, locusPts[0]], 10);

    CONSTRUCTIONS['slider-crank-locus'] = {
      id: 'slider-crank-locus', title: 'Locus of a Point on a Slider-Crank Mechanism',
      summary: 'Trace the path swept by the midpoint of a connecting rod through one full revolution of the crank — the "loci of points on a mechanism" construction.',
      bounds: { w: 150, h: 130 },
      workbookPrompt: 'Divide the crank\'s path into 12 equal 30° positions. For each, construct the connecting rod to the slider and mark the midpoint of the rod. Join the 12 midpoints to plot the complete locus.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the fixed pivot O and the slider guideway (a straight track the far end of the mechanism is constrained to move along).',
          calloutAt: [O[0], O[1]],
          reveals: [
            { kind: 'point', at: O, size: 1.4, color: '#fde047', label: 'O' },
            { kind: 'line', p1: [SLIDE_X0, O[1]], p2: [SLIDE_X1, O[1]], lineType: 'A' },
            { kind: 'circle', center: O, r: R, lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Divide the crank\'s circular path into 12 equal 30° positions and mark the crank pin (point A) at each one — this is the same "equal divisions" idea used for cam profiles.',
          calloutAt: crankPos(0),
          reveals: positions.flatMap((p, i) => ([
            { kind: 'line', p1: O, p2: p.A, lineType: 'construction' },
            { kind: 'point', at: p.A, size: 1.1, color: '#38bdf8' },
          ])),
        },
        {
          id: 3,
          instruction: 'From each crank position, swing the connecting rod (true length L) down to the guideway to find where the slider (point B) sits, then mark the midpoint of each rod — the point whose locus we want.',
          calloutAt: positions[0].B,
          reveals: positions.flatMap(p => ([
            { kind: 'line', p1: p.A, p2: p.B, lineType: 'construction' },
            { kind: 'point', at: p.B, size: 1.1, color: '#94a3b8' },
            { kind: 'point', at: p.M, size: 1.3, color: '#f472b6' },
          ])),
        },
        {
          id: 4,
          instruction: 'Join all 12 midpoint positions with a smooth closed curve — this egg-like curve is the LOCUS of the connecting rod\'s midpoint over one full revolution of the crank.',
          calloutAt: G.midpoint(locusPts[0], locusPts[6]),
          reveals: [
            { kind: 'polyline', points: smoothLocus, lineType: 'A' },
            { kind: 'label', at: [locusPts[9][0] - 6, locusPts[9][1] + 10], text: 'LOCUS OF M', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 3. Cam Profile — Roller Follower (Envelope Method) ──
  (function () {
    const CX = 95, CY = 105, BASE_R = 20, LIFT = 24, ROLLER_R = 6, N = 6;
    const thetaOf = i => i * 30;
    const pitchR = i => BASE_R + LIFT * (i / N);
    const pitchPts = Array.from({ length: N + 1 }, (_, i) => polarPt(CX, CY, pitchR(i), thetaOf(i)));
    const surfacePts = Array.from({ length: N + 1 }, (_, i) => polarPt(CX, CY, pitchR(i) - ROLLER_R, thetaOf(i)));
    const smoothSurface = G.catmullRomExpand(surfacePts, 10);

    CONSTRUCTIONS['cam-roller-envelope'] = {
      id: 'cam-roller-envelope', title: 'Cam Profile — Roller Follower (Envelope Method)',
      summary: 'Hand-construct the actual machined cam surface from a roller follower\'s pitch curve — draw the roller at each division, then thread a curve tangent to the inside of every circle.',
      bounds: { w: 175, h: 175 },
      workbookPrompt: 'Given the pitch curve of a cam rise, construct the actual cam profile for a 12 mm diameter roller follower using the envelope (rolling-circle) method: draw the roller circle at each of the 6 divisions, then draw the profile tangent to their inner edges.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the base circle and 6 equally-spaced (30°) radial construction lines across the rise — the same "equal divisions" technique used for every cam and mechanism construction in this chapter.',
          calloutAt: [CX, CY],
          reveals: [
            { kind: 'circle', center: [CX, CY], r: BASE_R, lineType: 'construction' },
            ...Array.from({ length: N + 1 }, (_, i) => ({ kind: 'line', p1: [CX, CY], p2: polarPt(CX, CY, pitchR(N) + ROLLER_R + 6, thetaOf(i)), lineType: 'construction' })),
          ],
        },
        {
          id: 2,
          instruction: 'Mark the pitch point on each radial line at the height taken from the displacement diagram — this is the path the ROLLER\'S CENTRE follows, not the actual cam surface. Join them with a thin chain (centre) line as a reference.',
          calloutAt: pitchPts[N],
          reveals: [
            { kind: 'polyline', points: pitchPts, lineType: 'centre' },
            ...pitchPts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#94a3b8' })),
          ],
        },
        {
          id: 3,
          instruction: 'At every pitch point, draw the roller itself (its true diameter). The finished cam must clear every one of these circles — the roller rides on the OUTSIDE of the actual cam body, never inside it.',
          calloutAt: pitchPts[3],
          reveals: pitchPts.map(p => ({ kind: 'circle', center: p, r: ROLLER_R, lineType: 'construction' })),
        },
        {
          id: 4,
          instruction: 'Draw the actual cam profile as a smooth curve tangent to the INNER (axis-side) edge of every roller circle — this, not the pitch curve, is the surface the cam must be machined to.',
          calloutAt: surfacePts[3],
          reveals: [
            { kind: 'polyline', points: smoothSurface, lineType: 'A' },
            { kind: 'dimension', p1: pitchPts[0], p2: [pitchPts[0][0], pitchPts[0][1] - ROLLER_R * 2], offset: 10, text: '⌀' + (ROLLER_R * 2) },
            { kind: 'label', at: [surfacePts[0][0] + 6, surfacePts[0][1] - 4], text: 'ACTUAL CAM SURFACE', size: 3.8, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 4. Multi-Segment Cam Displacement Diagram ──
  (function () {
    const GX0 = 30, DEG_W = 160 / 360, BASE_Y = 140, LIFT = 20, SCALE = 44 / LIFT, TOP_Y = BASE_Y - LIFT * SCALE;
    const X = deg => GX0 + deg * DEG_W;
    const bounds = [0, 40, 160, 200, 320, 360];

    function disp(deg) {
      if (deg <= 40) return 0;
      if (deg <= 160) return LIFT * (deg - 40) / 120;             // rise, uniform velocity
      if (deg <= 200) return LIFT;                                 // dwell at top
      if (deg <= 320) { const t = (deg - 200) / 120; return LIFT * 0.5 * (1 + Math.cos(Math.PI * t)); } // fall, SHM
      return 0;                                                    // dwell at bottom
    }
    function curve(d0, d1) {
      const pts = [];
      for (let d = d0; d <= d1; d += 4) pts.push([X(d), BASE_Y - disp(d) * SCALE]);
      return pts;
    }

    CONSTRUCTIONS['multi-segment-cam'] = {
      id: 'multi-segment-cam', title: 'Multi-Segment Cam Displacement Diagram',
      summary: 'A real cam is not limited to one rise-dwell-fall cycle — segments can be chained in any sequence. This diagram has five: dwell, rise, dwell, fall, dwell, two of them using different motion laws.',
      bounds: { w: 210, h: 130 },
      workbookPrompt: 'Construct the complete displacement diagram: dwell 0°-40°, uniform-velocity rise 40°-160° to 20 mm, dwell 160°-200°, SHM fall 200°-320° back to 0, dwell 320°-360°.',
      steps: [
        {
          id: 1,
          instruction: 'Set up the axes and mark the FIVE segment boundaries (0°, 40°, 160°, 200°, 320°, 360°) — a cam profile can chain as many rise/dwell/fall segments as the application needs, in any order.',
          calloutAt: [X(180), BASE_Y],
          reveals: [
            { kind: 'line', p1: [GX0, BASE_Y], p2: [X(360) + 6, BASE_Y], lineType: 'A' },
            { kind: 'line', p1: [GX0, BASE_Y + 4], p2: [GX0, TOP_Y - 4], lineType: 'A' },
            ...bounds.map(d => ({ kind: 'line', p1: [X(d), BASE_Y], p2: [X(d), TOP_Y], lineType: 'construction' })),
            ...bounds.map(d => ({ kind: 'label', at: [X(d) - 6, BASE_Y + 10], text: d + '°', size: 3.4, anchor: 'start', color: '#94a3b8' })),
            { kind: 'label', at: [X(20) - 10, TOP_Y - 6], text: 'DWELL', size: 3.4, anchor: 'start', color: '#64748b' },
            { kind: 'label', at: [X(80) - 10, TOP_Y - 6], text: 'RISE (UNIFORM)', size: 3.4, anchor: 'start', color: '#eab308' },
            { kind: 'label', at: [X(165) - 10, TOP_Y - 6], text: 'DWELL', size: 3.4, anchor: 'start', color: '#64748b' },
            { kind: 'label', at: [X(240) - 6, TOP_Y - 6], text: 'FALL (SHM)', size: 3.4, anchor: 'start', color: '#38bdf8' },
            { kind: 'label', at: [X(335) - 10, TOP_Y - 6], text: 'DWELL', size: 3.4, anchor: 'start', color: '#64748b' },
          ],
        },
        {
          id: 2,
          instruction: 'Plot the first dwell (flat, no movement) then the uniform-velocity rise — a straight line, since displacement increases at a constant rate.',
          calloutAt: [X(100), BASE_Y - LIFT * SCALE * 0.5],
          reveals: [{ kind: 'polyline', points: curve(0, 160), lineType: 'A' }],
        },
        {
          id: 3,
          instruction: 'Plot the second dwell (flat at full lift) then the SHM fall — a smooth curve, easing out of the dwell and into the final dwell at zero.',
          calloutAt: [X(260), BASE_Y - LIFT * SCALE * 0.5],
          reveals: [{ kind: 'polyline', points: curve(160, 360), lineType: 'A' }],
        },
        {
          id: 4,
          instruction: 'The complete diagram: five segments, two different motion laws, one continuous displacement curve — exactly the kind of profile the Cam & Loci Simulator\'s segment list can build.',
          calloutAt: [X(180), TOP_Y - 14],
          reveals: [{ kind: 'label', at: [X(140), TOP_Y - 16], text: 'FIVE SEGMENTS, ONE CONTINUOUS CYCLE', size: 4, anchor: 'start', color: '#fde047' }],
        },
      ],
    };
  })();

  // ── 5. Helix Construction — Auger / Helicoid Principle ──
  (function () {
    const TOP_CX = 70, TOP_CY = 50, BASE_R = 22, PITCH = 60;
    const hp = G.helixPoints(BASE_R, PITCH, 1, 12); // 13 points, one full turn
    const topPts = hp.map(p => [TOP_CX + p.x, TOP_CY + p.y]);
    const FRONT_BASE_Y = TOP_CY + BASE_R + 35, FRONT_TOP_Y = FRONT_BASE_Y - PITCH;
    const SCALE_X = TOP_CX - BASE_R - 15;
    const frontPts = hp.map(p => [TOP_CX + p.x, FRONT_BASE_Y - p.rise]);
    const smoothFront = G.catmullRomExpand(frontPts, 8);

    CONSTRUCTIONS['helix-auger'] = {
      id: 'helix-auger', title: 'Helix Construction — Auger / Helicoid Principle',
      summary: 'Project a helix — the curve traced by a point that both rotates around and rises along a cylinder — using the classic divide-the-circle-and-project method. The basis of augers, spiral chutes, threads and springs.',
      bounds: { w: 130, h: 145 },
      workbookPrompt: 'Construct one full turn of a helix on a 44 mm diameter cylinder with a 60 mm pitch: divide the top view into 12 equal parts, project each down to its matching height, and join with a smooth curve.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the top view: a circle representing the cylinder, divided into 12 equal 30° parts with radial construction lines.',
          calloutAt: [TOP_CX, TOP_CY],
          reveals: [
            { kind: 'circle', center: [TOP_CX, TOP_CY], r: BASE_R, lineType: 'A' },
            ...topPts.slice(0, 12).map(p => ({ kind: 'line', p1: [TOP_CX, TOP_CY], p2: p, lineType: 'construction' })),
            ...topPts.slice(0, 12).map(p => ({ kind: 'point', at: p, size: 1.1, color: '#eab308' })),
          ],
        },
        {
          id: 2,
          instruction: 'Draw the front-view height line representing ONE FULL PITCH, directly below the top view, divided into the same 12 equal parts.',
          calloutAt: [SCALE_X, (FRONT_BASE_Y + FRONT_TOP_Y) / 2],
          reveals: [
            { kind: 'line', p1: [SCALE_X, FRONT_BASE_Y], p2: [SCALE_X, FRONT_TOP_Y], lineType: 'A' },
            ...Array.from({ length: 13 }, (_, i) => ({ kind: 'line', p1: [SCALE_X - 3, FRONT_BASE_Y - PITCH * i / 12], p2: [SCALE_X + 3, FRONT_BASE_Y - PITCH * i / 12], lineType: 'construction' })),
            { kind: 'dimension', p1: [SCALE_X - 12, FRONT_BASE_Y], p2: [SCALE_X - 12, FRONT_TOP_Y], offset: -6, text: PITCH.toFixed(0) },
          ],
        },
        {
          id: 3,
          instruction: 'Project each top-view point straight down, and each height division straight across — where a pair meets is a point on the helix.',
          calloutAt: frontPts[6],
          reveals: [
            ...topPts.slice(0, 12).map((p, i) => ({ kind: 'line', p1: p, p2: [p[0], frontPts[i][1]], lineType: 'construction' })),
            ...frontPts.map((p, i) => ({ kind: 'line', p1: [SCALE_X, p[1]], p2: p, lineType: 'construction' })),
            ...frontPts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#f472b6' })),
          ],
        },
        {
          id: 4,
          instruction: 'Join the 13 points with a smooth curve — the front-view of a helix is always a sine-like wave, one full wave per turn. This is the principle behind augers, spiral chutes, screw threads and coil springs.',
          calloutAt: [frontPts[3][0] + 8, frontPts[3][1]],
          reveals: [
            { kind: 'polyline', points: smoothFront, lineType: 'A' },
            { kind: 'label', at: [frontPts[0][0] + 6, frontPts[0][1] - 4], text: 'HELIX (1 TURN)', size: 3.8, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 6. Helix Application — Single-Start Coil Spring ──
  (function () {
    const CX = 70, BASE_R = 16, PITCH = 22, TURNS = 2, STEPS = 24;
    function phaseHelix(phaseDeg) {
      const pts = [];
      for (let i = 0; i <= STEPS; i++) {
        const t = i / (STEPS / TURNS);
        const a = t * 2 * Math.PI + phaseDeg * D2R;
        pts.push({ x: BASE_R * Math.cos(a), rise: t * PITCH });
      }
      return pts;
    }
    const FRONT_BASE_Y = 150, TOTAL_RISE = PITCH * TURNS, FRONT_TOP_Y = FRONT_BASE_Y - TOTAL_RISE;
    const front = phaseHelix(0).map(p => [CX + p.x, FRONT_BASE_Y - p.rise]);
    const back = phaseHelix(180).map(p => [CX + p.x, FRONT_BASE_Y - p.rise]);
    const smoothFront = G.catmullRomExpand(front, 5);
    const smoothBack = G.catmullRomExpand(back, 5);

    CONSTRUCTIONS['coil-spring-helix'] = {
      id: 'coil-spring-helix', title: 'Helix Application — Single-Start Coil Spring',
      summary: 'Two helices, half a turn out of phase, trace the front and back wire of a coil spring — the same divide-and-project principle as the auger, applied twice.',
      bounds: { w: 100, h: 165 },
      workbookPrompt: 'Construct a single-start, right-hand coil spring: 2 full turns, 32 mm outer diameter, 22 mm pitch. Plot the front-wire helix, then the back-wire helix offset by half a turn.',
      steps: [
        {
          id: 1,
          instruction: 'Mark the pitch divisions down the centre line for 2 full turns (24 divisions of 30° each) and dimension the outer diameter and pitch.',
          calloutAt: [CX, (FRONT_BASE_Y + FRONT_TOP_Y) / 2],
          reveals: [
            { kind: 'line', p1: [CX, FRONT_BASE_Y + 4], p2: [CX, FRONT_TOP_Y - 4], lineType: 'centre' },
            { kind: 'dimension', p1: [CX - BASE_R - 10, FRONT_BASE_Y], p2: [CX + BASE_R + 10, FRONT_BASE_Y], offset: 8, text: '⌀' + (BASE_R * 2) },
            { kind: 'dimension', p1: [CX + BASE_R + 14, FRONT_BASE_Y], p2: [CX + BASE_R + 14, FRONT_BASE_Y - PITCH], offset: 6, text: PITCH.toFixed(0) },
          ],
        },
        {
          id: 2,
          instruction: 'Plot the FRONT wire — the same divide-the-circle-and-project method as the auger, run twice (once per turn), joined with a smooth curve.',
          calloutAt: front[6],
          reveals: [{ kind: 'polyline', points: smoothFront, lineType: 'A' }],
        },
        {
          id: 3,
          instruction: 'Plot the BACK wire — an identical helix, but starting half a turn (180°) out of phase. Together the two curves weave into the familiar coil-spring silhouette. This is a SINGLE-START, right-hand spring: one continuous wire, winding in one direction only.',
          calloutAt: back[6],
          reveals: [
            { kind: 'polyline', points: smoothBack, lineType: 'A' },
            { kind: 'label', at: [CX - BASE_R - 6, FRONT_TOP_Y + 4], text: 'SINGLE-START · RIGHT-HAND', size: 3.8, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 7. Locus of a Point on a Four-Bar Linkage (Coupler Curve) ──
  (function () {
    const O2 = [45, 70], O4 = [105, 70], CRANK = 18, COUPLER = 55, ROCKER = 42, OFFSET = 20, N = 12;

    function circleIntersect(c1, r1, c2, r2, branch) {
      const dx = c2[0] - c1[0], dy = c2[1] - c1[1];
      const d = Math.hypot(dx, dy);
      const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
      const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
      const mx = c1[0] + a * dx / d, my = c1[1] + a * dy / d;
      const ux = -dy / d, uy = dx / d;
      return branch >= 0 ? [mx + h * ux, my + h * uy] : [mx - h * ux, my - h * uy];
    }

    let prevB = null;
    const positions = Array.from({ length: N }, (_, i) => {
      const a = (i * 360 / N) * D2R;
      const A = [O2[0] + CRANK * Math.cos(a), O2[1] + CRANK * Math.sin(a)];
      const cands = [circleIntersect(A, COUPLER, O4, ROCKER, 1), circleIntersect(A, COUPLER, O4, ROCKER, -1)];
      const B = prevB ? (G.distance(cands[0], prevB) < G.distance(cands[1], prevB) ? cands[0] : cands[1]) : cands[0];
      prevB = B;
      // Coupler point P: offset from the mid-point of AB, perpendicular to it.
      const mid = G.midpoint(A, B);
      const dx = B[0] - A[0], dy = B[1] - A[1];
      const len = Math.hypot(dx, dy) || 1;
      const P = [mid[0] - (dy / len) * OFFSET, mid[1] + (dx / len) * OFFSET];
      return { A, B, P };
    });
    const couplerPts = positions.map(p => p.P);
    const smoothCoupler = G.catmullRomExpand([...couplerPts, couplerPts[0]], 8);

    CONSTRUCTIONS['fourbar-coupler-locus'] = {
      id: 'fourbar-coupler-locus', title: 'Locus of a Point on a Four-Bar Linkage',
      summary: 'A point rigidly fixed to the coupler link of a four-bar mechanism traces a far richer path than a point on a crank or rocker — the classic "coupler curve", found by two intersecting arcs at each position.',
      bounds: { w: 150, h: 130 },
      workbookPrompt: 'Divide the crank into 12 equal 30° positions. For each, find the rocker position by intersecting the coupler-length and rocker-length arcs, mark the coupler point (fixed relative to the coupler link), and plot the complete locus.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the two FIXED pivots — O2 (the crank\'s pivot) and O4 (the rocker\'s pivot) — and the crank\'s circular path.',
          calloutAt: G.midpoint(O2, O4),
          reveals: [
            { kind: 'point', at: O2, size: 1.4, color: '#fde047', label: 'O2' },
            { kind: 'point', at: O4, size: 1.4, color: '#fde047', label: 'O4' },
            { kind: 'circle', center: O2, r: CRANK, lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Divide the crank into 12 equal 30° positions, marking point A at each — unlike the slider-crank, BOTH ends of this mechanism\'s middle link (the coupler) are free to swing, which is what produces the richer locus.',
          calloutAt: positions[0].A,
          reveals: positions.flatMap(p => ([
            { kind: 'line', p1: O2, p2: p.A, lineType: 'construction' },
            { kind: 'point', at: p.A, size: 1.1, color: '#38bdf8' },
          ])),
        },
        {
          id: 3,
          instruction: 'At each position, swing an arc of the coupler\'s true length from A, and an arc of the rocker\'s true length from O4 — where they intersect is point B. Mark the coupler point P, rigidly offset from the line AB.',
          calloutAt: positions[0].B,
          reveals: positions.flatMap(p => ([
            { kind: 'line', p1: p.A, p2: p.B, lineType: 'construction' },
            { kind: 'line', p1: O4, p2: p.B, lineType: 'construction' },
            { kind: 'point', at: p.B, size: 1.1, color: '#94a3b8' },
            { kind: 'point', at: p.P, size: 1.3, color: '#f472b6' },
          ])),
        },
        {
          id: 4,
          instruction: 'Join the 12 positions of P with a smooth closed curve — this is the coupler curve, the classic "interesting" locus in mechanism design (the same principle behind Watt\'s straight-line linkage).',
          calloutAt: couplerPts[9],
          reveals: [
            { kind: 'polyline', points: smoothCoupler, lineType: 'A' },
            { kind: 'label', at: [couplerPts[3][0] + 6, couplerPts[3][1]], text: 'COUPLER CURVE', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 8. Comparing the Three Motion Laws ──
  (function () {
    const GX0 = 30, GX1 = 170, PW = GX1 - GX0, PLIFT = 30, PH = 45;
    function lawFrac(law, t) {
      if (law === 'uniform') return t;
      if (law === 'shm') return 0.5 * (1 - Math.cos(Math.PI * t));
      return t <= 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t); // uar
    }
    function panelReveals(baseY, law, label, color) {
      const topY = baseY - PH;
      const pts = [];
      for (let d = 0; d <= 180; d += 4) pts.push([GX0 + d * (PW / 180), baseY - lawFrac(law, d / 180) * PH]);
      return {
        pts,
        reveals: [
          { kind: 'line', p1: [GX0, baseY], p2: [GX1, baseY], lineType: 'A' },
          { kind: 'line', p1: [GX0, baseY + 3], p2: [GX0, topY - 3], lineType: 'A' },
          { kind: 'polyline', points: pts, lineType: 'A' },
          { kind: 'label', at: [GX0, topY - 6], text: label, size: 4.2, anchor: 'start', color },
        ],
      };
    }
    const p1 = panelReveals(70, 'uniform', 'UNIFORM VELOCITY', '#eab308');
    const p2 = panelReveals(140, 'shm', 'SIMPLE HARMONIC MOTION', '#38bdf8');
    const p3 = panelReveals(210, 'uar', 'UNIFORM ACCEL / RETARD', '#f472b6');

    CONSTRUCTIONS['motion-laws-comparison'] = {
      id: 'motion-laws-comparison', title: 'Comparing the Three Motion Laws',
      summary: 'The same 180° rise, the same 30 mm lift, plotted three ways — the exact shape difference between the three CAPS/SAGS-prescribed cam motion laws, side by side.',
      bounds: { w: 190, h: 240 },
      workbookPrompt: 'Plot the same rise (180°, 30 mm lift) using all three prescribed motion laws — uniform velocity, SHM, and uniform acceleration/retardation — stacked for direct comparison.',
      steps: [
        {
          id: 1,
          instruction: 'UNIFORM VELOCITY: displacement increases at a constant rate — a straight line. Simple to construct, but the follower starts and stops abruptly (a sudden jump in velocity at each end), causing shock in real machinery at speed.',
          calloutAt: [GX0 + PW / 2, 70 - PH / 2],
          reveals: p1.reveals,
        },
        {
          id: 2,
          instruction: 'SIMPLE HARMONIC MOTION: the semicircle-method curve — smooth, symmetric, easing in and out of each dwell with zero velocity at both ends.',
          calloutAt: [GX0 + PW / 2, 140 - PH / 2],
          reveals: p2.reveals,
        },
        {
          id: 3,
          instruction: 'UNIFORM ACCELERATION/RETARDATION: two parabolic curves joined at the mid-point — constant acceleration for the first half, constant deceleration for the second. A middle ground: gentler than uniform velocity, less demanding to construct than SHM.',
          calloutAt: [GX0 + PW / 2, 210 - PH / 2],
          reveals: p3.reveals,
        },
        {
          id: 4,
          instruction: 'All three reach exactly half the lift at exactly half the time — the difference is entirely in HOW they get there. Choosing the right motion law is a real design decision: uniform velocity is simplest but harshest; SHM is smoothest; uniform acceleration/retardation splits the difference.',
          calloutAt: [GX0 + PW / 2, 20],
          reveals: [
            { kind: 'label', at: [GX0, 20], text: 'SAME RISE · SAME LIFT · THREE DIFFERENT SHAPES', size: 4.4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'In a cam displacement diagram, what does the horizontal axis represent, and what does the vertical axis represent?',
      options: [
        'Horizontal = cam shaft rotation angle (0°–360°); vertical = follower displacement (lift)',
        'Horizontal = time in seconds; vertical = cam radius',
        'Horizontal = follower displacement; vertical = rotation angle',
        'Both axes represent the same quantity, rotation angle, at different scales',
      ],
      answer: 0,
      explanation: 'A displacement diagram plots how far the follower has moved (vertical) against how far the cam has rotated (horizontal), over one full 360° cycle.',
    },
    {
      text: 'Which three follower motion types are prescribed by SAGS for cam design?',
      options: [
        'Uniform velocity, simple harmonic motion (SHM), and uniform acceleration/retardation',
        'Uniform velocity, random motion, and free fall',
        'SHM, exponential decay, and constant jerk',
        'Only uniform velocity is used for cam design',
      ],
      answer: 0,
      explanation: 'SAGS lists uniform motion and/or simple harmonic motion and/or uniform acceleration and retardation motion as the prescribed cam follower motion laws.',
    },
    {
      text: 'Describe the semicircle method for constructing a simple-harmonic-motion (SHM) displacement curve.',
      options: [
        'Draw a semicircle on the lift as its diameter, divide it into equal angular parts, project each division horizontally onto the matching angle division, and join the points with a smooth curve',
        'Calculate each point using the sine formula and plot the results with a calculator',
        'Draw a full circle, not a semicircle, and project every point vertically instead of horizontally',
        'SHM curves cannot be constructed by hand; they require computer software',
      ],
      answer: 0,
      explanation: 'The semicircle method is the standard hand-drafting technique for plotting an accurate SHM curve using only compass-and-straightedge construction, without any trigonometric calculation.',
    },
    {
      text: 'What is a "dwell" in a cam displacement diagram?',
      options: [
        'A period during which the follower\'s displacement stays constant while the cam continues to rotate',
        'The moment the follower reaches its maximum speed',
        'The total angle through which the cam rotates',
        'Another name for the base circle',
      ],
      answer: 0,
      explanation: 'During a dwell, the cam profile radius does not change over that angular range, so the follower remains stationary even though the cam keeps turning.',
    },
    {
      text: 'A cam rise-fall cycle is not limited to one rise, one dwell and one fall. Why might a real cam use several dwell-rise-dwell-rise-dwell-fall segments in one 360° cycle?',
      options: [
        'A single cam can be designed to move a follower through several distinct stages in one rotation — e.g. an indexing or feed mechanism that steps forward twice before returning — so segments are chained in whatever sequence the application needs',
        'It is never done — every cam must have exactly one rise, one dwell and one fall',
        'Extra segments are only ever added by mistake',
        'A cam profile can only ever contain a maximum of three segments',
      ],
      answer: 0,
      explanation: 'A cam profile is built from as many rise/dwell/fall segments, in whatever order, as the mechanism requires — the displacement diagram is simply the sum of however many stages the machine needs to perform in one revolution.',
    },
    {
      text: 'For a ROLLER follower, where is the actual physical cam surface relative to the pitch curve (the roller centre\'s path)?',
      options: [
        'Offset INWARD (toward the cam\'s axis) by the roller\'s radius, since the roller rides on the outside of the cam body',
        'Offset OUTWARD (away from the axis) by the roller\'s radius',
        'Exactly on the pitch curve — there is no offset for a roller follower',
        'The offset depends on the direction of rotation',
      ],
      answer: 0,
      explanation: 'The roller\'s centre traces the pitch curve; since the roller rides on the OUTSIDE of the physical cam, the actual machined surface sits closer to the axis, offset inward by exactly the roller radius.',
    },
    {
      text: 'Why are cam profiles and mechanism loci typically constructed using a fixed number of equal angular divisions (e.g. 12 positions, 30° apart)?',
      options: [
        'Equal angular steps let each point be transferred accurately and consistently by simple radial construction, without needing to calculate every position mathematically',
        'It is a legal requirement with no technical purpose',
        'Using more or fewer divisions than 12 is never allowed',
        'It makes the drawing symmetrical, which is required for every mechanism',
      ],
      answer: 0,
      explanation: 'Dividing a full rotation into equal steps is a practical drafting technique: each step is transferred by the same simple construction, keeping the method accurate without trigonometric calculation at every point.',
    },
    {
      text: 'What is a "locus"?',
      options: [
        'The path traced out by a point as it moves according to a given rule or constraint',
        'The fixed pivot point of a mechanism',
        'The maximum speed reached by a moving part',
        'Another name for a cam\'s base circle',
      ],
      answer: 0,
      explanation: 'A locus is the curve or path swept out by a point in motion — for example, the path traced by the midpoint of a connecting rod as a crank rotates through a full cycle.',
    },
    {
      text: 'In a slider-crank mechanism, what constrains the motion of the slider point, and how does that differ from a point on the COUPLER of a four-bar linkage?',
      options: [
        'The slider is restricted to a straight guideway; a coupler point is not pivoted about any fixed centre at all, which is why it traces a far more complex curve',
        'Both points are constrained identically — there is no real difference',
        'The slider moves in a circle, exactly like the coupler point',
        'A coupler point cannot have a locus, only slider and crank points can',
      ],
      answer: 0,
      explanation: 'A slider is constrained to a straight line; a coupler link, in contrast, is only connected to two other MOVING points (not a fixed pivot), which is exactly what produces the richer "coupler curve" locus.',
    },
    {
      text: 'What is the maximum number of points SAGS allows a mechanism-loci question to ask you to plot the locus of?',
      options: ['3 points', '1 point only', '12 points', 'There is no limit'],
      answer: 0,
      explanation: 'SAGS caps mechanism-locus questions at a maximum of 3 moving points, keeping the construction manageable within exam time.',
    },
    {
      text: 'What does "single-start, right-hand" mean when describing a coil spring or square thread?',
      options: [
        'The helix is formed by a single continuous wire/ridge (not two or more interleaved ones), winding in the right-hand (clockwise, moving away from the viewer) direction',
        'The spring only has one coil in total',
        '"Right-hand" means the spring can only be installed on the right side of a machine',
        'It describes the material the spring is made from',
      ],
      answer: 0,
      explanation: '"Start" refers to how many separate helical ridges/wires wind together (single vs double/triple-start); "hand" refers to the winding direction — both are standard callouts on a thread or spring drawing.',
    },
    {
      text: 'In the front (elevation) view of a helix, what shape does the curve take?',
      options: [
        'A sine-like wave — one full wave per turn of the helix',
        'A straight diagonal line',
        'A perfect circle',
        'A series of unconnected dots — a helix cannot be shown as a continuous curve in the front view',
      ],
      answer: 0,
      explanation: 'Because the helix rotates at a constant rate while rising at a constant rate, its horizontal position follows a cosine curve against a linearly-increasing height — the classic front-view "sine wave" of a helix, auger flight or spring.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'cam-shm-semicircle', 'slider-crank-locus', 'cam-roller-envelope', 'multi-segment-cam',
    'helix-auger', 'coil-spring-helix', 'fourbar-coupler-locus', 'motion-laws-comparison',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
