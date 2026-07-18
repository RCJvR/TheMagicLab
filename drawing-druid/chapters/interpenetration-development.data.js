// Interpenetration & Development — Chapter data. Requires engine-geometry.js loaded first
// (window.ConstructionGeometry). Grade 11-12: the curve where two solids/pipes intersect, and
// the flat "unrolled" pattern (development) of a solid's surface — two related SAGS topics
// covered together, matching how the real Course Drawing schedule groups them.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};
  const D2R = Math.PI / 180;

  // ── 1. Interpenetration of Two Equal-Diameter Cylinders ──
  (function () {
    const mainCX = 100, R1 = 25, mainTop = 30, mainBottom = 150;
    const branchAxisY = 105, R2 = 25, branchLeft = mainCX + R1, branchRight = 190;
    const N = 12;
    const pts = Array.from({ length: N + 1 }, (_, i) => {
      const th = i * (360 / N) * D2R;
      const Z = R2 * Math.cos(th), Yoff = R2 * Math.sin(th);
      const X = Math.sqrt(Math.max(0, R1 * R1 - Z * Z));
      return [mainCX + X, branchAxisY - Yoff];
    });

    CONSTRUCTIONS['interpenetration-equal-cylinders'] = {
      id: 'interpenetration-equal-cylinders', title: 'Interpenetration of Two Equal-Diameter Cylinders',
      summary: 'Two pipes of the SAME diameter meeting at right angles — a special case where the curve of interpenetration turns out to be two straight lines, not a curve at all.',
      bounds: { w: 220, h: 175 },
      workbookPrompt: 'Draw the main cylinder (50 mm diameter) and the branch cylinder (also 50 mm diameter) meeting at right angles, and construct the curve of interpenetration where their surfaces meet.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the main cylinder (vertical) and the branch cylinder (horizontal), both the SAME diameter, meeting at right angles.',
          calloutAt: [mainCX, branchAxisY],
          reveals: [
            { kind: 'line', p1: [mainCX - R1, mainTop], p2: [mainCX - R1, mainBottom], lineType: 'A' },
            { kind: 'line', p1: [mainCX + R1, mainTop], p2: [mainCX + R1, mainBottom], lineType: 'A' },
            { kind: 'line', p1: [mainCX - R1, branchAxisY - R2], p2: [branchRight, branchAxisY - R2], lineType: 'A' },
            { kind: 'line', p1: [mainCX - R1, branchAxisY + R2], p2: [branchRight, branchAxisY + R2], lineType: 'A' },
            { kind: 'line', p1: [branchLeft, mainTop], p2: [branchLeft, branchAxisY - R2], lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Divide the branch\'s circular end into 12 equal parts — the same "equal divisions" method used throughout this course for anything that can\'t be measured directly.',
          calloutAt: [branchLeft, branchAxisY],
          reveals: pts.slice(0, N).map((p, i) => ({ kind: 'point', at: [branchLeft, branchAxisY - R2 * Math.sin(i * 30 * D2R)], size: 1.1, color: '#eab308' })),
        },
        {
          id: 3,
          instruction: 'For each division, find where that point actually lies on the MAIN cylinder\'s surface — using its depth offset and the main cylinder\'s own true radius — and plot it in the front view.',
          calloutAt: pts[3],
          reveals: pts.map(p => ({ kind: 'point', at: p, size: 1.3, color: '#f472b6' })),
        },
        {
          id: 4,
          instruction: 'Join the points. Because both cylinders share the SAME diameter, every point lands exactly on one of two straight lines — a genuine special case, not an approximation.',
          calloutAt: [branchLeft + 15, branchAxisY],
          reveals: [
            { kind: 'line', p1: pts[0], p2: pts[6], lineType: 'A' },
            { kind: 'line', p1: pts[6], p2: pts[12], lineType: 'A' },
            { kind: 'label', at: [branchLeft, mainTop + 10], text: 'EQUAL DIAMETERS → STRAIGHT LINES', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. Interpenetration of Two Different-Diameter Cylinders ──
  (function () {
    const mainCX = 100, R1 = 32, mainTop = 20, mainBottom = 150;
    const branchAxisY = 95, R2 = 16, branchLeft = mainCX + R1, branchRight = 185;
    const N = 12;
    const pts = Array.from({ length: N + 1 }, (_, i) => {
      const th = i * (360 / N) * D2R;
      const Z = R2 * Math.cos(th), Yoff = R2 * Math.sin(th);
      const X = Math.sqrt(Math.max(0, R1 * R1 - Z * Z));
      return [mainCX + X, branchAxisY - Yoff];
    });
    const smooth = G.catmullRomExpand(pts, 6);

    CONSTRUCTIONS['interpenetration-unequal-cylinders'] = {
      id: 'interpenetration-unequal-cylinders', title: 'Interpenetration of Two Different-Diameter Cylinders',
      summary: 'The general method: when the two pipes are different sizes, the curve of interpenetration is a genuine curve, found point by point.',
      bounds: { w: 215, h: 170 },
      workbookPrompt: 'Draw a 64 mm main cylinder and a 32 mm branch cylinder meeting at right angles, and construct the true curve of interpenetration using 12 points.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the main cylinder (64 mm diameter, vertical) and the smaller branch cylinder (32 mm diameter, horizontal), meeting at right angles.',
          calloutAt: [mainCX, branchAxisY],
          reveals: [
            { kind: 'line', p1: [mainCX - R1, mainTop], p2: [mainCX - R1, mainBottom], lineType: 'A' },
            { kind: 'line', p1: [mainCX + R1, mainTop], p2: [mainCX + R1, mainBottom], lineType: 'A' },
            { kind: 'line', p1: [mainCX - R1, branchAxisY - R2], p2: [branchRight, branchAxisY - R2], lineType: 'A' },
            { kind: 'line', p1: [mainCX - R1, branchAxisY + R2], p2: [branchRight, branchAxisY + R2], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Divide the branch\'s circular end into 12 equal parts.',
          calloutAt: [branchLeft, branchAxisY],
          reveals: Array.from({ length: N }, (_, i) => ({ kind: 'point', at: [branchLeft, branchAxisY - R2 * Math.sin(i * 30 * D2R)], size: 1.1, color: '#eab308' })),
        },
        {
          id: 3,
          instruction: 'For each division, find its true position on the main cylinder\'s surface (using its depth offset and the main cylinder\'s radius) and plot the point in the front view.',
          calloutAt: pts[3],
          reveals: pts.map(p => ({ kind: 'point', at: p, size: 1.3, color: '#f472b6' })),
        },
        {
          id: 4,
          instruction: 'Join the 12 points with a smooth curve — this time a genuine curve, since the two diameters differ. The curve is always steepest where the branch is widest (at its own centre line).',
          calloutAt: [branchLeft + 15, branchAxisY],
          reveals: [{ kind: 'polyline', points: smooth, lineType: 'A' }],
        },
      ],
    };
  })();

  // ── 3. Interpenetration — Square Prism Through a Cylinder ──
  (function () {
    const mainCX = 100, R1 = 28, mainTop = 25, mainBottom = 145;
    const branchAxisY = 90, half = 16, branchLeft = mainCX + R1, branchRight = 185;
    function ptFor(Z, Yoff) {
      const X = Math.sqrt(Math.max(0, R1 * R1 - Z * Z));
      return [mainCX + X, branchAxisY - Yoff];
    }
    const corners = [ptFor(half, half), ptFor(half, -half), ptFor(-half, -half), ptFor(-half, half)];

    CONSTRUCTIONS['interpenetration-square-prism'] = {
      id: 'interpenetration-square-prism', title: 'Interpenetration — Square Prism Through a Cylinder',
      summary: 'When the branch has flat faces instead of a round one, only its CORNERS need to be plotted — straight edges only need their end points.',
      bounds: { w: 215, h: 165 },
      workbookPrompt: 'A 32 mm square prism penetrates a 56 mm diameter cylinder at right angles. Plot the four corner points and join them to find the curve (in this case, a set of straight edges) of interpenetration.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the main cylinder and the square branch prism, meeting at right angles.',
          calloutAt: [mainCX, branchAxisY],
          reveals: [
            { kind: 'line', p1: [mainCX - R1, mainTop], p2: [mainCX - R1, mainBottom], lineType: 'A' },
            { kind: 'line', p1: [mainCX + R1, mainTop], p2: [mainCX + R1, mainBottom], lineType: 'A' },
            { kind: 'line', p1: [mainCX - R1, branchAxisY - half], p2: [branchRight, branchAxisY - half], lineType: 'A' },
            { kind: 'line', p1: [mainCX - R1, branchAxisY + half], p2: [branchRight, branchAxisY + half], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Since a square has flat sides, not a curve, only the FOUR CORNERS of its cross-section need to be plotted — no in-between points are needed for a straight edge.',
          calloutAt: [branchLeft, branchAxisY],
          reveals: [
            { kind: 'point', at: [branchLeft, branchAxisY - half], label: '' }, { kind: 'point', at: [branchLeft, branchAxisY + half], label: '' },
          ],
        },
        {
          id: 3,
          instruction: 'Find each corner\'s true position on the main cylinder\'s surface, exactly as before — using its depth offset and the main cylinder\'s radius.',
          calloutAt: corners[0],
          reveals: corners.map(p => ({ kind: 'point', at: p, size: 1.3, color: '#f472b6' })),
        },
        {
          id: 4,
          instruction: 'Join the four points with STRAIGHT lines, not a smooth curve — the prism\'s flat faces produce a faceted intersection, not a rounded one.',
          calloutAt: [branchLeft + 15, branchAxisY],
          reveals: [
            { kind: 'line', p1: corners[0], p2: corners[1], lineType: 'A' },
            { kind: 'line', p1: corners[1], p2: corners[2], lineType: 'A' },
            { kind: 'line', p1: corners[2], p2: corners[3], lineType: 'A' },
            { kind: 'line', p1: corners[3], p2: corners[0], lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 4. Development of a Cylinder (Stretch-Out Method) ──
  (function () {
    const R = 20, H = 60, circumference = 2 * Math.PI * R;
    const FV_CX = 65, FV_LEFT = FV_CX - R, FV_RIGHT = FV_CX + R, FV_TOP = 30, FV_BOTTOM = FV_TOP + H;
    const DEV_LEFT = 110, DEV_TOP = FV_TOP, DEV_BOTTOM = FV_BOTTOM, DEV_RIGHT = DEV_LEFT + circumference;

    CONSTRUCTIONS['development-cylinder'] = {
      id: 'development-cylinder', title: 'Development of a Cylinder',
      summary: 'The flat pattern a cylinder\'s curved surface unrolls into — a simple rectangle, exactly as wide as the circle\'s circumference.',
      bounds: { w: 260, h: 110 },
      workbookPrompt: 'Given a cylinder of 40 mm diameter and 60 mm height, calculate its circumference and draw the development (the unrolled surface) as a rectangle.',
      steps: [
        {
          id: 1,
          instruction: 'Given the cylinder (40 mm diameter, 60 mm tall), calculate its circumference: π × diameter.',
          measurement: { label: 'circumference = π × 40 ≈ ' + circumference.toFixed(1) + ' mm' },
          calloutAt: [FV_CX, (FV_TOP + FV_BOTTOM) / 2],
          reveals: [
            { kind: 'line', p1: [FV_LEFT, FV_TOP], p2: [FV_RIGHT, FV_TOP], lineType: 'A' },
            { kind: 'line', p1: [FV_LEFT, FV_BOTTOM], p2: [FV_RIGHT, FV_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [FV_LEFT, FV_TOP], p2: [FV_LEFT, FV_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [FV_RIGHT, FV_TOP], p2: [FV_RIGHT, FV_BOTTOM], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the STRETCH-OUT line — a straight line exactly as long as the circumference — level with the base of the cylinder.',
          calloutAt: [(DEV_LEFT + DEV_RIGHT) / 2, DEV_BOTTOM + 10],
          reveals: [
            { kind: 'line', p1: [DEV_LEFT, DEV_BOTTOM], p2: [DEV_RIGHT, DEV_BOTTOM], lineType: 'centre' },
            { kind: 'dimension', p1: [DEV_LEFT, DEV_BOTTOM + 8], p2: [DEV_RIGHT, DEV_BOTTOM + 8], offset: 0, text: circumference.toFixed(1) },
          ],
        },
        {
          id: 3,
          instruction: 'Erect verticals at each end, equal to the cylinder\'s true height, and complete the development rectangle.',
          calloutAt: [(DEV_LEFT + DEV_RIGHT) / 2, (DEV_TOP + DEV_BOTTOM) / 2],
          reveals: [
            { kind: 'line', p1: [DEV_LEFT, DEV_TOP], p2: [DEV_LEFT, DEV_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [DEV_RIGHT, DEV_TOP], p2: [DEV_RIGHT, DEV_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [DEV_LEFT, DEV_TOP], p2: [DEV_RIGHT, DEV_TOP], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Divide the stretch-out line into 12 equal parts (matching 12 points around the original circle) — this reference grid is essential for developments where the top edge isn\'t flat.',
          calloutAt: [DEV_LEFT, DEV_TOP - 6],
          reveals: [
            ...Array.from({ length: 13 }, (_, i) => ({ kind: 'line', p1: [DEV_LEFT + i * circumference / 12, DEV_TOP], p2: [DEV_LEFT + i * circumference / 12, DEV_BOTTOM], lineType: 'construction' })),
            { kind: 'label', at: [DEV_LEFT, DEV_TOP - 6], text: 'SEAM', size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 5. Development of an Obliquely Cut Cylinder ──
  (function () {
    const R = 20, H = 55, DROP = 26, N = 12;
    const FV_CX = 55, FV_LEFT = FV_CX - R, FV_RIGHT = FV_CX + R, FV_BOTTOM = 130, FV_TOP_FULL = FV_BOTTOM - H;
    const circumference = 2 * Math.PI * R;
    function cutHeight(thetaDeg) { return H - (DROP / 2) * (1 - Math.cos(thetaDeg * D2R)); }
    const cutPts = Array.from({ length: N + 1 }, (_, i) => {
      const th = i * 30;
      return [FV_LEFT + i * (2 * R / N), FV_BOTTOM - cutHeight(th)];
    });

    const DEV_LEFT = 105, DEV_BOTTOM = FV_BOTTOM, DEV_RIGHT = DEV_LEFT + circumference;
    const devPts = Array.from({ length: N + 1 }, (_, i) => {
      const th = i * 30;
      return [DEV_LEFT + i * circumference / N, DEV_BOTTOM - cutHeight(th)];
    });
    const devSmooth = G.catmullRomExpand(devPts, 6);

    CONSTRUCTIONS['development-oblique-cylinder'] = {
      id: 'development-oblique-cylinder', title: 'Development of an Obliquely Cut Cylinder',
      summary: 'When a cylinder is cut on the slant, its development is no longer a plain rectangle — the top edge becomes a smooth wave, one full wave per revolution.',
      bounds: { w: 260, h: 150 },
      workbookPrompt: 'Given a cylinder (40 mm diameter) cut by an inclined plane (26 mm drop across the diameter), develop its surface, transferring each of 12 points\' true height onto the stretch-out line.',
      steps: [
        {
          id: 1,
          instruction: 'Given the cylinder cut by an inclined plane, divide the front view into 12 equal divisions across the diameter, and read the cut\'s height at each.',
          calloutAt: [FV_CX, FV_TOP_FULL + 10],
          reveals: [
            { kind: 'line', p1: [FV_LEFT, FV_BOTTOM], p2: [FV_LEFT, FV_TOP_FULL], lineType: 'A' }, { kind: 'line', p1: [FV_RIGHT, FV_BOTTOM], p2: [FV_RIGHT, FV_TOP_FULL], lineType: 'A' },
            { kind: 'polyline', points: cutPts, lineType: 'A' },
            { kind: 'line', p1: [FV_LEFT, FV_BOTTOM], p2: [FV_RIGHT, FV_BOTTOM], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the stretch-out line (length = circumference) and divide it into the SAME 12 equal parts.',
          calloutAt: [(DEV_LEFT + DEV_RIGHT) / 2, DEV_BOTTOM + 10],
          reveals: [
            { kind: 'line', p1: [DEV_LEFT, DEV_BOTTOM], p2: [DEV_RIGHT, DEV_BOTTOM], lineType: 'centre' },
            ...Array.from({ length: N + 1 }, (_, i) => ({ kind: 'line', p1: [DEV_LEFT + i * circumference / N, DEV_BOTTOM], p2: [DEV_LEFT + i * circumference / N, DEV_BOTTOM - H], lineType: 'construction' })),
          ],
        },
        {
          id: 3,
          instruction: 'At each division, erect a vertical equal to THAT point\'s true height, read directly from the front view — never the same height twice.',
          calloutAt: devPts[3],
          reveals: devPts.map(p => ({ kind: 'point', at: p, size: 1.2, color: '#f472b6' })),
        },
        {
          id: 4,
          instruction: 'Join the 12 points with a smooth curve. This wave shape — one full cycle across the full circumference — is the classic development of an obliquely truncated cylinder.',
          calloutAt: [DEV_LEFT, DEV_BOTTOM - H - 8],
          reveals: [{ kind: 'polyline', points: devSmooth, lineType: 'A' }],
        },
      ],
    };
  })();

  // ── 6. Development of a Cone (Sector Method) ──
  (function () {
    const R = 20, H = 45, L = Math.sqrt(R * R + H * H);
    const sectorDeg = (R / L) * 360;
    const FV_CX = 50, FV_BOTTOM = 130, FV_TOP = FV_BOTTOM - H;
    const DEV_CX = 150, DEV_CY = FV_BOTTOM;
    const halfSector = sectorDeg / 2;
    const arcStart = -90 - halfSector, arcEnd = -90 + halfSector;
    const sectorLeft = [DEV_CX + L * Math.cos(arcStart * D2R), DEV_CY + L * Math.sin(arcStart * D2R)];
    const sectorRight = [DEV_CX + L * Math.cos(arcEnd * D2R), DEV_CY + L * Math.sin(arcEnd * D2R)];
    const arcPts = Array.from({ length: 13 }, (_, i) => {
      const a = arcStart + (arcEnd - arcStart) * i / 12;
      return [DEV_CX + L * Math.cos(a * D2R), DEV_CY + L * Math.sin(a * D2R)];
    });

    CONSTRUCTIONS['development-cone'] = {
      id: 'development-cone', title: 'Development of a Cone (Sector Method)',
      summary: 'A cone\'s development is a sector of a circle — its radius is the cone\'s true slant height, and its arc length must exactly equal the base circumference.',
      bounds: { w: 220, h: 160 },
      workbookPrompt: 'Given a cone (40 mm base diameter, 45 mm tall), find the true slant height, then construct the sector development: radius = slant height, arc length = base circumference.',
      steps: [
        {
          id: 1,
          instruction: 'Given the cone, find the TRUE SLANT HEIGHT — the true length of the sloping side, from apex to base edge.',
          measurement: { label: 'slant height L = √(R² + H²) = ' + L.toFixed(1) + ' mm' },
          calloutAt: [FV_CX, FV_TOP + H / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_CX - R, FV_BOTTOM], [FV_CX + R, FV_BOTTOM], [FV_CX, FV_TOP]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'From a chosen apex point, draw an arc of radius equal to the slant height — the sector\'s curved edge will be marked along this arc.',
          calloutAt: [DEV_CX, DEV_CY - L / 2],
          reveals: [
            { kind: 'point', at: [DEV_CX, DEV_CY], label: '' },
            { kind: 'arc-construction', center: [DEV_CX, DEV_CY], r: L, startDeg: arcStart, endDeg: arcEnd, lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Calculate the sector angle so that the arc length exactly equals the base circumference, then mark it off from the apex.',
          measurement: { label: 'sector angle = (R / L) × 360° ≈ ' + sectorDeg.toFixed(1) + '°' },
          calloutAt: [DEV_CX, DEV_CY - L - 6],
          reveals: [
            { kind: 'line', p1: [DEV_CX, DEV_CY], p2: sectorLeft, lineType: 'A' },
            { kind: 'line', p1: [DEV_CX, DEV_CY], p2: sectorRight, lineType: 'A' },
            { kind: 'angle-arc', vertex: [DEV_CX, DEV_CY], p1: sectorLeft, p2: sectorRight, radius: 14, text: sectorDeg.toFixed(0) + '°' },
          ],
        },
        {
          id: 4,
          instruction: 'Join the arc — the development is complete: a sector (a "pie slice") of a circle, radius = slant height, arc length = base circumference.',
          calloutAt: [DEV_CX, DEV_CY - L + 10],
          reveals: [{ kind: 'polyline', points: arcPts, lineType: 'A' }],
        },
      ],
    };
  })();

  // ── 7. Development of a Square Prism ──
  (function () {
    const side = 25, H = 50;
    const DEV_LEFT = 40, DEV_TOP = 40, DEV_BOTTOM = DEV_TOP + H;
    const xs = Array.from({ length: 5 }, (_, i) => DEV_LEFT + i * side);

    CONSTRUCTIONS['development-square-prism'] = {
      id: 'development-square-prism', title: 'Development of a Square Prism',
      summary: 'A square prism\'s development is the simplest of all: four identical rectangles in a row, one per side face, plus the base squares if the box is to be closed.',
      bounds: { w: 190, h: 165 },
      workbookPrompt: 'Develop a square prism (25 mm side, 50 mm tall): four side faces in a row, plus a base square attached to close the pattern.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the stretch-out line, divided into 4 EQUAL parts — one per side face, since all four faces of a square prism are identical.',
          calloutAt: [(DEV_LEFT + xs[4]) / 2, DEV_BOTTOM + 8],
          reveals: [
            ...xs.map(x => ({ kind: 'line', p1: [x, DEV_TOP], p2: [x, DEV_BOTTOM], lineType: 'construction' })),
            { kind: 'line', p1: [DEV_LEFT, DEV_BOTTOM], p2: [xs[4], DEV_BOTTOM], lineType: 'centre' },
          ],
        },
        {
          id: 2,
          instruction: 'Complete the four rectangles — the unrolled side faces.',
          calloutAt: [(DEV_LEFT + xs[4]) / 2, (DEV_TOP + DEV_BOTTOM) / 2],
          reveals: [
            { kind: 'line', p1: [DEV_LEFT, DEV_TOP], p2: [xs[4], DEV_TOP], lineType: 'A' },
            { kind: 'line', p1: [DEV_LEFT, DEV_BOTTOM], p2: [xs[4], DEV_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [DEV_LEFT, DEV_TOP], p2: [DEV_LEFT, DEV_BOTTOM], lineType: 'A' },
            { kind: 'line', p1: [xs[4], DEV_TOP], p2: [xs[4], DEV_BOTTOM], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Attach the base square to one of the fold lines, so the pattern folds up into a complete closed box.',
          calloutAt: [(xs[0] + xs[1]) / 2, DEV_BOTTOM + side / 2 + 6],
          reveals: [
            { kind: 'polygon', points: [[xs[0], DEV_BOTTOM], [xs[1], DEV_BOTTOM], [xs[1], DEV_BOTTOM + side], [xs[0], DEV_BOTTOM + side]], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Label each fold line — every internal vertical is a FOLD (Type B), while only the outer boundary is the true cut edge (Type A).',
          calloutAt: [xs[2], DEV_TOP - 8],
          reveals: [
            { kind: 'label', at: [DEV_LEFT, DEV_TOP - 8], text: 'OUTER EDGE = CUT · INNER LINES = FOLD', size: 3.8, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 8. Development of a Square Pyramid (True-Length Method) ──
  (function () {
    const base = 30, H = 40;
    const halfDiag = base * Math.SQRT2 / 2;
    const trueEdge = Math.sqrt(H * H + halfDiag * halfDiag);
    const FV_CX = 50, FV_BOTTOM = 120, FV_TOP = FV_BOTTOM - H;
    const apex = [160, 35];
    const N = 4;
    const pts = [apex];
    let ang = -90 - 25;
    for (let i = 0; i <= N; i++) {
      const a = (-90 - 25) + i * 50;
      pts.push([apex[0] + trueEdge * Math.cos(a * D2R), apex[1] + trueEdge * Math.sin(a * D2R)]);
    }

    CONSTRUCTIONS['development-square-pyramid'] = {
      id: 'development-square-pyramid', title: 'Development of a Square Pyramid (True-Length Method)',
      summary: 'A pyramid\'s sloping edges are foreshortened in every standard view — their TRUE length must be found first, then swung out by compass to build the fan-shaped development.',
      bounds: { w: 220, h: 175 },
      workbookPrompt: 'Given a square pyramid (30 mm base, 40 mm height), find the true length of a sloping edge, then construct the four-triangle fan development using compass arcs.',
      steps: [
        {
          id: 1,
          instruction: 'Given the pyramid\'s front view, find the TRUE LENGTH of a sloping edge — never read directly off the front view, since it is foreshortened there.',
          measurement: { label: 'true edge = √(H² + half-diagonal²) = ' + trueEdge.toFixed(1) + ' mm' },
          calloutAt: [FV_CX, FV_TOP + H / 2],
          reveals: [
            { kind: 'polygon', points: [[FV_CX - base / 2, FV_BOTTOM], [FV_CX + base / 2, FV_BOTTOM], [FV_CX, FV_TOP]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'From a single apex point, swing an arc of radius equal to the true edge length — every one of the pyramid\'s four sloping edges will be marked along this same arc.',
          calloutAt: [apex[0], apex[1] + trueEdge / 2],
          reveals: [
            { kind: 'point', at: apex, label: '' },
            { kind: 'arc-construction', center: apex, r: trueEdge, startDeg: -140, endDeg: 25, lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Step off the four base corners along the arc, each exactly one base-side-length from the next — the same compass-step method used to construct a hexagon.',
          calloutAt: pts[2],
          reveals: pts.slice(1).map(p => ({ kind: 'point', at: p, size: 1.3, color: '#f472b6' })),
        },
        {
          id: 4,
          instruction: 'Join the apex to each point, and adjacent points to each other, to complete the fan-shaped development — four true-size triangles, ready to fold up into the pyramid.',
          calloutAt: [apex[0] - 30, apex[1] + 40],
          reveals: [
            ...pts.slice(1).map(p => ({ kind: 'line', p1: apex, p2: p, lineType: 'A' })),
            { kind: 'line', p1: pts[1], p2: pts[2], lineType: 'A' },
            { kind: 'line', p1: pts[2], p2: pts[3], lineType: 'A' },
            { kind: 'line', p1: pts[3], p2: pts[4], lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'What is the "curve of interpenetration"?',
      options: [
        'The line where the surfaces of two intersecting (penetrating) solids meet',
        'The outline of a single solid, with no second solid involved',
        'Another name for a centre line',
        'The path a cutting tool follows when machining a hole',
      ],
      answer: 0,
      explanation: 'When two solids or hollow pipes intersect, their surfaces meet along a curve (or, in special cases, straight lines) — this is the curve of interpenetration.',
    },
    {
      text: 'Two pipes of the SAME diameter intersect at right angles. What is special about their curve of interpenetration?',
      options: [
        'It is not a curve at all — it reduces to two straight lines',
        'It is always a perfect circle',
        'No interpenetration curve exists between equal-diameter pipes',
        'It can only be found using calculus, never by construction',
      ],
      answer: 0,
      explanation: 'Equal-diameter cylinders meeting at 90° is a well-known special case: the general point-by-point method still applies, but every point happens to fall on one of two straight lines.',
    },
    {
      text: 'A square (not round) branch penetrates a cylindrical pipe. How does the construction method differ from two intersecting cylinders?',
      options: [
        'Only the branch\'s FOUR CORNERS need to be plotted and joined with straight lines — no in-between curve points are needed for a flat face',
        'The method is completely different and unrelated to the cylinder-cylinder case',
        'A square branch can never be plotted using this method',
        'All twelve points are still needed, exactly as for a round branch',
      ],
      answer: 0,
      explanation: 'The same principle (find where each point on the branch\'s cross-section meets the main solid\'s surface) still applies — but since a square only has 4 corners (no curved edges), only those 4 points are needed, joined by straight lines.',
    },
    {
      text: 'What is a "development" of a solid, in the sense used in this chapter?',
      options: [
        'The flat pattern produced by unrolling or unfolding a solid\'s surface, as if cut open and laid flat',
        'A more detailed, "developed" version of an orthographic view',
        'A synonym for an isometric drawing',
        'The process of 3D-printing a solid from its drawing',
      ],
      answer: 0,
      explanation: 'A development (or "surface development") shows what a solid\'s surface looks like unrolled flat — like a cardboard box template — useful for manufacturing sheet-metal or fabric parts.',
    },
    {
      text: 'What determines the WIDTH of a cylinder\'s development (its stretch-out length)?',
      options: [
        'The circle\'s circumference (π × diameter)',
        'The cylinder\'s height',
        'The cylinder\'s radius alone, with no other calculation',
        'It is always exactly 360 mm, regardless of the cylinder\'s size',
      ],
      answer: 0,
      explanation: 'Unrolling a cylinder\'s curved surface produces a flat rectangle whose width exactly equals the circle\'s circumference — the distance around the original circular cross-section.',
    },
    {
      text: 'Why does the development of an OBLIQUELY cut cylinder have a wavy (not straight) top edge?',
      options: [
        'Because the height of the cut varies continuously around the circumference, following a sine-wave pattern, as the oblique plane crosses at a different height at every point',
        'It is a drawing error — the top edge should always be straight',
        'Only cones can ever have a wavy development edge',
        'The wave shape has no real cause; it is purely decorative',
      ],
      answer: 0,
      explanation: 'An oblique cutting plane crosses the cylinder at a continuously changing height around the circumference — developing (unrolling) that varying height produces the characteristic sine-wave curve.',
    },
    {
      text: 'What are the radius and arc length of a cone\'s sector development?',
      options: [
        'Radius = the cone\'s true slant height; arc length = the base circumference',
        'Radius = the base diameter; arc length = the cone\'s height',
        'Both the radius and arc length equal the base radius',
        'A cone cannot be developed at all — only cylinders and prisms can',
      ],
      answer: 0,
      explanation: 'A cone unrolls into a sector (pie slice) of a circle: the sector\'s radius is the cone\'s true slant height (apex to base edge), and its arc length must exactly equal the base circle\'s circumference.',
    },
    {
      text: 'Why must the TRUE LENGTH of a pyramid\'s sloping edge be found before its development can be constructed?',
      options: [
        'The sloping edge is foreshortened in every standard orthographic view, so measuring it directly from the front or top view would give the wrong (too short) length',
        'Pyramids do not actually have sloping edges',
        'The front view already shows every edge true length, so this step is unnecessary',
        'True length is only needed for cones, never for pyramids',
      ],
      answer: 0,
      explanation: 'Like any oblique line, a pyramid\'s sloping edge is not parallel to any projection plane, so it appears foreshortened in the standard views — its true length must be constructed (e.g. by the right-triangle method) before it can be used as a compass radius in the development.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'interpenetration-equal-cylinders', 'interpenetration-unequal-cylinders', 'interpenetration-square-prism',
    'development-cylinder', 'development-oblique-cylinder', 'development-cone',
    'development-square-prism', 'development-square-pyramid',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
