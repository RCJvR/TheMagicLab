// Orthographic Projection — Chapter 3 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  // Generates 45°-hatching line segments clipped to a rectangle [x0,x0+w] x [y0,y0+h].
  // Hatching is B-weight (medium) per the CAPS/SANS line-type spec, not C.
  function hatchRect(x0, y0, w, h, spacing) {
    const lines = [];
    for (let k = -h; k <= w + 0.01; k += spacing) {
      const vLo = Math.max(0, -k), vHi = Math.min(h, w - k);
      if (vHi <= vLo) continue;
      const u1 = vLo + k, v1 = vLo, u2 = vHi + k, v2 = vHi;
      lines.push({ kind: 'line', p1: [x0 + u1, y0 + v1], p2: [x0 + u2, y0 + v2], lineType: 'B' });
    }
    return lines;
  }

  // ── 1. L-Bracket: Three Views (3rd angle) ──
  (function () {
    // Front view: L-shaped outline
    const fv = [[60, 110], [60, 70], [75, 70], [75, 95], [120, 95], [120, 110]];
    // Top view: plan rectangle, aligned above (same X range as front view)
    const tv = { x: 60, y: 40, w: 60, h: 15 };
    const holeX = 100, holeTopY = tv.y + tv.h / 2, holeR = 4;
    // Side view: aligned to the right of front view (same Y range as front view)
    const sv = { x: 135, y: 70, w: 15, h: 40 };
    const holeSideY = 102.5;

    CONSTRUCTIONS['l-bracket-views'] = {
      id: 'l-bracket-views', title: 'L-Bracket: Three Views',
      summary: 'Project the top and side views from a front view using 3rd-angle projection, then add hidden detail, centre lines and dimensions.',
      bounds: { w: 190, h: 140 },
      workbookPrompt: 'Draw the front, top and side views of the L-bracket in 3rd-angle projection. Include the hidden hole, centre lines and overall dimensions.',
      steps: [
        {
          id: 1,
          instruction: 'Start with the FRONT view — the view that shows the most shape detail. This bracket has an L-shaped profile: a tall narrow back (15 mm wide) and a wide base (60 mm wide, 15 mm tall).',
          calloutAt: [67, 90],
          reveals: [{ kind: 'polygon', points: fv, lineType: 'A' }],
        },
        {
          id: 2,
          instruction: 'Project the TOP view directly ABOVE the front view — this is the rule for 3rd-angle projection. Align it using thin projection lines from the front view\'s left and right edges.',
          calloutAt: [60, 55],
          reveals: [
            { kind: 'polygon', points: [[tv.x, tv.y], [tv.x + tv.w, tv.y], [tv.x + tv.w, tv.y + tv.h], [tv.x, tv.y + tv.h]], lineType: 'A' },
            { kind: 'line', p1: [60, 70], p2: [60, 55], lineType: 'construction' },
            { kind: 'line', p1: [120, 70], p2: [120, 55], lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Project the (right) SIDE view to the RIGHT of the front view, aligned by height using thin projection lines from the front view\'s top and bottom edges.',
          calloutAt: [142, 90],
          reveals: [
            { kind: 'polygon', points: [[sv.x, sv.y], [sv.x + sv.w, sv.y], [sv.x + sv.w, sv.y + sv.h], [sv.x, sv.y + sv.h]], lineType: 'A' },
            { kind: 'line', p1: [120, 70], p2: [135, 70], lineType: 'construction' },
            { kind: 'line', p1: [120, 110], p2: [135, 110], lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'The bracket has a vertical hole drilled through the base. Looking DOWN the hole (top view) it is fully visible — draw it as a solid circle. Looking ACROSS the hole (front and side views), it is HIDDEN — draw it as two dashed lines.',
          calloutAt: [holeX, holeTopY],
          reveals: [
            { kind: 'circle', center: [holeX, holeTopY], r: holeR, lineType: 'A' },
            { kind: 'line', p1: [holeX - holeR, 95], p2: [holeX - holeR, 110], lineType: 'hidden' },
            { kind: 'line', p1: [holeX + holeR, 95], p2: [holeX + holeR, 110], lineType: 'hidden' },
            { kind: 'line', p1: [sv.x, holeSideY - holeR], p2: [sv.x + sv.w, holeSideY - holeR], lineType: 'hidden' },
            { kind: 'line', p1: [sv.x, holeSideY + holeR], p2: [sv.x + sv.w, holeSideY + holeR], lineType: 'hidden' },
          ],
        },
        {
          id: 5,
          instruction: 'Add a centre line (chain line) through the hole in every view, then dimension the bracket\'s overall width and height.',
          calloutAt: [90, 130],
          reveals: [
            { kind: 'line', p1: [holeX, tv.y - 4], p2: [holeX, tv.y + tv.h + 4], lineType: 'centre' },
            { kind: 'line', p1: [holeX - holeR - 5, 102.5], p2: [holeX + holeR + 5, 102.5], lineType: 'centre' },
            { kind: 'line', p1: [sv.x - 4, holeSideY], p2: [sv.x + sv.w + 4, holeSideY], lineType: 'centre' },
            { kind: 'dimension', p1: [60, 116], p2: [120, 116], offset: 8, text: '60' },
            { kind: 'dimension', p1: [46, 70], p2: [46, 110], offset: -8, text: '40' },
            { kind: 'label', at: [60, 128], text: 'THIRD-ANGLE PROJECTION', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 2. Stepped Block: Sectional View & Hatching ──
  (function () {
    const block = { x: 60, y: 70, w: 80, h: 40 };
    const pocket = { x: 85, y: 70, w: 30, h: 20 };
    const tv = { x: 60, y: 42, w: 80, h: 14 };

    CONSTRUCTIONS['sectional-view'] = {
      id: 'sectional-view', title: 'Stepped Block: Sectional View',
      summary: 'Mark a cutting plane, convert hidden detail into a sectional view, and add 45° hatching to the solid material that the cutting plane passes through.',
      bounds: { w: 150, h: 130 },
      workbookPrompt: 'Draw the front view of the block as a full section on cutting plane A-A, showing the pocket and correctly hatching all solid material.',
      steps: [
        {
          id: 1,
          instruction: 'This block has a rectangular pocket cut into its top face. Draw the front view outline, and the top view showing the pocket opening (visible from above, so it is drawn solid).',
          calloutAt: [70, 90],
          reveals: [
            { kind: 'polygon', points: [[block.x, block.y], [block.x + block.w, block.y], [block.x + block.w, block.y + block.h], [block.x, block.y + block.h]], lineType: 'A' },
            { kind: 'polygon', points: [[tv.x, tv.y], [tv.x + tv.w, tv.y], [tv.x + tv.w, tv.y + tv.h], [tv.x, tv.y + tv.h]], lineType: 'A' },
            { kind: 'polygon', points: [[pocket.x, tv.y], [pocket.x + pocket.w, tv.y], [pocket.x + pocket.w, tv.y + tv.h], [pocket.x, tv.y + tv.h]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Without a section, the pocket is hidden inside the block when viewed from the front — draw it dashed. This is exactly what a section will let us avoid.',
          calloutAt: [100, 80],
          reveals: [
            { kind: 'line', p1: [pocket.x, pocket.y + pocket.h], p2: [pocket.x, block.y + block.h], lineType: 'hidden' },
            { kind: 'line', p1: [pocket.x + pocket.w, pocket.y + pocket.h], p2: [pocket.x + pocket.w, block.y + block.h], lineType: 'hidden' },
            { kind: 'line', p1: [pocket.x, pocket.y + pocket.h], p2: [pocket.x + pocket.w, pocket.y + pocket.h], lineType: 'hidden' },
          ],
        },
        {
          id: 3,
          instruction: 'Mark a cutting plane A-A across the top view, through the pocket, showing exactly where we imagine slicing the block to see inside it.',
          calloutAt: [100, 49],
          reveals: [
            { kind: 'line', p1: [52, 49], p2: [148, 49], lineType: 'centre' },
            { kind: 'label', at: [48, 47], text: 'A', size: 5, anchor: 'end', color: '#fde047' },
            { kind: 'label', at: [148, 47], text: 'A', size: 5, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'Redraw the front view AS the section on A-A: the previously hidden pocket edges are now exposed by the cut, so they become solid Type A lines instead of dashed.',
          calloutAt: [100, 80],
          reveals: [
            { kind: 'polygon', points: [[pocket.x, pocket.y], [pocket.x + pocket.w, pocket.y], [pocket.x + pocket.w, pocket.y + pocket.h], [pocket.x, pocket.y + pocket.h]], lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'Add 45° hatching to every area of SOLID material the cutting plane passes through — never hatch the pocket itself, since that space is empty.',
          calloutAt: [70, 100],
          reveals: [
            ...hatchRect(block.x, block.y, pocket.x - block.x, block.h, 5),
            ...hatchRect(pocket.x + pocket.w, block.y, (block.x + block.w) - (pocket.x + pocket.w), block.h, 5),
            ...hatchRect(pocket.x, pocket.y + pocket.h, pocket.w, (block.y + block.h) - (pocket.y + pocket.h), 5),
          ],
        },
        {
          id: 6,
          instruction: 'Label the section and dimension the pocket\'s width and depth.',
          calloutAt: [100, 120],
          reveals: [
            { kind: 'label', at: [60, 120], text: 'SECTION A-A', size: 5, anchor: 'start', color: '#fde047' },
            { kind: 'dimension', p1: [85, 116], p2: [115, 116], offset: 8, text: '30' },
            { kind: 'dimension', p1: [122, 70], p2: [122, 90], offset: 8, text: '20' },
          ],
        },
      ],
    };
  })();

  // ── 3. Half-Sectional View — Symmetric Plate ──
  (function () {
    const PLATE = { x: 40, y: 60, w: 120, h: 50 }, CX = 100;
    const holeR = 6, leftHole = [70, 85], rightHole = [130, 85];

    CONSTRUCTIONS['half-sectional-view'] = {
      id: 'half-sectional-view', title: 'Half-Sectional View — Symmetric Plate',
      summary: 'For a symmetric part, only HALF needs to be sectioned — the other half stays a plain exterior view, since the reader already knows it mirrors the sectioned side.',
      bounds: { w: 200, h: 130 },
      workbookPrompt: 'Draw the plate as a half-sectional front view: hatch and section the right half only (showing the true hole edge), leave the left half as a plain exterior view.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the plate outline, mark BOTH hole positions with centre lines (the pattern is symmetric), and draw the plate\'s own vertical centre line — the axis the section is built around.',
          calloutAt: [CX, PLATE.y + PLATE.h / 2],
          reveals: [
            { kind: 'polygon', points: [[PLATE.x, PLATE.y], [PLATE.x + PLATE.w, PLATE.y], [PLATE.x + PLATE.w, PLATE.y + PLATE.h], [PLATE.x, PLATE.y + PLATE.h]], lineType: 'A' },
            { kind: 'line', p1: [leftHole[0] - holeR - 4, leftHole[1]], p2: [leftHole[0] + holeR + 4, leftHole[1]], lineType: 'centre' },
            { kind: 'line', p1: [rightHole[0] - holeR - 4, rightHole[1]], p2: [rightHole[0] + holeR + 4, rightHole[1]], lineType: 'centre' },
            { kind: 'line', p1: [CX, PLATE.y - 6], p2: [CX, PLATE.y + PLATE.h + 6], lineType: 'centre' },
          ],
        },
        {
          id: 2,
          instruction: 'Section the RIGHT half only: hatch the solid material (leaving a gap for the hole) and draw that hole\'s edges as solid Type A lines — they are exposed by the cut.',
          calloutAt: [rightHole[0] + 20, rightHole[1]],
          reveals: [
            ...hatchRect(CX, PLATE.y, rightHole[0] - holeR - CX, PLATE.h, 4),
            ...hatchRect(rightHole[0] + holeR, PLATE.y, (PLATE.x + PLATE.w) - (rightHole[0] + holeR), PLATE.h, 4),
            { kind: 'circle', center: rightHole, r: holeR, lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Leave the LEFT half completely plain — no hatching, and no line at all for the left hole. Because the plate is symmetric, repeating it (even as hidden detail) would only clutter the drawing.',
          calloutAt: [leftHole[0] - 15, leftHole[1] + 20],
          reveals: [
            { kind: 'label', at: [PLATE.x + 4, PLATE.y + PLATE.h - 4], text: 'PLAIN (UNSECTIONED)', size: 3.8, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 4,
          instruction: 'Label the view HALF SECTION and dimension the overall width and hole spacing.',
          calloutAt: [CX, PLATE.y + PLATE.h + 20],
          reveals: [
            { kind: 'label', at: [PLATE.x, PLATE.y + PLATE.h + 30], text: 'HALF SECTION', size: 5, anchor: 'start', color: '#fde047' },
            { kind: 'dimension', p1: [PLATE.x, PLATE.y - 10], p2: [PLATE.x + PLATE.w, PLATE.y - 10], offset: -6, text: PLATE.w.toFixed(0) },
            { kind: 'dimension', p1: leftHole, p2: rightHole, offset: 14, text: (rightHole[0] - leftHole[0]).toFixed(0) },
          ],
        },
      ],
    };
  })();

  // ── 4. Auxiliary View — True Shape of an Inclined Face ──
  (function () {
    const P1 = [60, 80], P2 = [100, 60]; // inclined edge, front view (already true length)
    const FV = [[60, 110], P1, P2, [140, 60], [140, 110]];
    const TV = { x: 60, y: 15, w: 80, h: 30 }; // top view, depth = 30
    const DEPTH = 30, GAP = 15;
    const d = [P2[0] - P1[0], P2[1] - P1[1]];
    const len = Math.hypot(d[0], d[1]);
    const perp = [-d[1] / len, d[0] / len]; // outward (away from the block)
    const F1 = [P1[0] + perp[0] * GAP, P1[1] + perp[1] * GAP];
    const F2 = [P2[0] + perp[0] * GAP, P2[1] + perp[1] * GAP];
    const A1 = [P1[0] + perp[0] * (GAP + DEPTH), P1[1] + perp[1] * (GAP + DEPTH)];
    const A2 = [P2[0] + perp[0] * (GAP + DEPTH), P2[1] + perp[1] * (GAP + DEPTH)];

    CONSTRUCTIONS['auxiliary-view'] = {
      id: 'auxiliary-view', title: 'Auxiliary View — True Shape of an Inclined Face',
      summary: 'Neither the front nor top view shows an inclined face true size — an auxiliary view, projected perpendicular to it via a fold line, does.',
      bounds: { w: 190, h: 140 },
      workbookPrompt: 'Given the front and top views of the wedge block, construct the auxiliary view of the inclined face: draw a fold line parallel to the incline, project perpendicular to it, and transfer the true depth (30 mm) from the top view.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the front view (the inclined edge is already TRUE LENGTH here, since it lies in a plane parallel to the front view) and the top view, showing the block\'s depth.',
          measurement: { label: 'depth = 30 mm' },
          calloutAt: [100, 90],
          reveals: [
            { kind: 'polygon', points: FV, lineType: 'A' },
            { kind: 'polygon', points: [[TV.x, TV.y], [TV.x + TV.w, TV.y], [TV.x + TV.w, TV.y + TV.h], [TV.x, TV.y + TV.h]], lineType: 'A' },
            { kind: 'dimension', p1: [TV.x - 8, TV.y], p2: [TV.x - 8, TV.y + TV.h], offset: -6, text: DEPTH.toFixed(0) },
          ],
        },
        {
          id: 2,
          instruction: 'Draw a fold (reference) line parallel to the inclined edge, offset clear of the block. Project construction lines from P1 and P2 perpendicular to the incline, through the fold line and beyond.',
          calloutAt: G.midpoint(F1, F2),
          reveals: [
            { kind: 'line', p1: F1, p2: F2, lineType: 'centre' },
            { kind: 'line', p1: P1, p2: A1, lineType: 'construction' },
            { kind: 'line', p1: P2, p2: A2, lineType: 'construction' },
          ],
        },
        {
          id: 3,
          instruction: 'Using dividers, transfer the TRUE DEPTH (30 mm, measured on the top view) along each projector, starting from the fold line — this marks the two far points of the auxiliary view.',
          calloutAt: G.midpoint(A1, A2),
          reveals: [
            { kind: 'point', at: F1, size: 1.2, color: '#38bdf8' },
            { kind: 'point', at: F2, size: 1.2, color: '#38bdf8' },
            { kind: 'point', at: A1, size: 1.2, color: '#f472b6' },
            { kind: 'point', at: A2, size: 1.2, color: '#f472b6' },
          ],
        },
        {
          id: 4,
          instruction: 'Join the four points to complete the auxiliary view — the true shape and true size of the inclined face, which neither the front nor top view could show directly.',
          calloutAt: G.midpoint(G.midpoint(F1, F2), G.midpoint(A1, A2)),
          reveals: [
            { kind: 'polygon', points: [F1, F2, A2, A1], lineType: 'A' },
            { kind: 'label', at: [Math.min(A1[0], A2[0]) - 4, Math.min(A1[1], A2[1]) - 4], text: 'AUXILIARY VIEW — TRUE SHAPE', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 5. Break-Line Convention — Shortening a Long Shaft ──
  (function () {
    const Y_TOP = 80, Y_BOT = 100, CY = 90;
    const LEFT_END = 30, BREAK1 = 85, BREAK2 = 115, RIGHT_END = 190;
    function breakZigzag(x, yTop, yBot, amp, n) {
      const pts = []; const step = (yBot - yTop) / n;
      for (let i = 0; i <= n; i++) {
        const y = yTop + step * i;
        const dx = (i === 0 || i === n) ? 0 : (i % 2 === 0 ? -amp : amp);
        pts.push([x + dx, y]);
      }
      return pts;
    }
    CONSTRUCTIONS['break-line-shaft'] = {
      id: 'break-line-shaft', title: 'Break-Line Convention — Shortening a Long Shaft',
      summary: 'A shaft much longer than it is wide doesn\'t need to be drawn full length — a break-line convention removes the uninteresting middle section, while the dimension still states the true length.',
      bounds: { w: 220, h: 130 },
      workbookPrompt: 'Draw a shaft using the break-line convention: draw both ends in full detail, break out the uniform middle section, and dimension the TRUE overall length (450 mm) even though the drawing is shortened.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the shaft\'s LEFT (near) end in full detail, stopping at the first break point.',
          calloutAt: [(LEFT_END + BREAK1) / 2, CY],
          reveals: [
            { kind: 'line', p1: [LEFT_END, Y_TOP], p2: [BREAK1, Y_TOP], lineType: 'A' },
            { kind: 'line', p1: [LEFT_END, Y_BOT], p2: [BREAK1, Y_BOT], lineType: 'A' },
            { kind: 'line', p1: [LEFT_END, Y_TOP], p2: [LEFT_END, Y_BOT], lineType: 'A' },
            { kind: 'line', p1: [LEFT_END - 10, CY], p2: [BREAK1, CY], lineType: 'centre' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the shaft\'s RIGHT (far) end, starting at the second break point — the material in between is identical, uniform-diameter shaft, so there is no need to draw it at all.',
          calloutAt: [(BREAK2 + RIGHT_END) / 2, CY],
          reveals: [
            { kind: 'line', p1: [BREAK2, Y_TOP], p2: [RIGHT_END, Y_TOP], lineType: 'A' },
            { kind: 'line', p1: [BREAK2, Y_BOT], p2: [RIGHT_END, Y_BOT], lineType: 'A' },
            { kind: 'line', p1: [RIGHT_END, Y_TOP], p2: [RIGHT_END, Y_BOT], lineType: 'A' },
            { kind: 'line', p1: [BREAK2, CY], p2: [RIGHT_END + 10, CY], lineType: 'centre' },
          ],
        },
        {
          id: 3,
          instruction: 'Add the break-line symbol (a jagged line) at each cut — this tells the reader that material has been removed from the DRAWING, not from the real part.',
          calloutAt: [(BREAK1 + BREAK2) / 2, CY],
          reveals: [
            { kind: 'polyline', points: breakZigzag(BREAK1, Y_TOP - 3, Y_BOT + 3, 3, 6), lineType: 'B' },
            { kind: 'polyline', points: breakZigzag(BREAK2, Y_TOP - 3, Y_BOT + 3, 3, 6), lineType: 'B' },
          ],
        },
        {
          id: 4,
          instruction: 'Dimension the shaft\'s TRUE overall length. Even though the drawing is physically shortened, the dimension always states the real, full length of the part.',
          calloutAt: [(LEFT_END + RIGHT_END) / 2, Y_BOT + 20],
          reveals: [
            { kind: 'dimension', p1: [LEFT_END, Y_BOT + 14], p2: [RIGHT_END, Y_BOT + 14], offset: 6, text: '450 (TRUE LENGTH)' },
          ],
        },
      ],
    };
  })();

  // ── 6. Basic Bolted Joint — Two Plates (Introductory) ──
  (function () {
    const CX = 100, PLATE_L = 60, PLATE_R = 140;
    const P1_TOP = 60, P1_BOT = 72, P2_TOP = 72, P2_BOT = 88;
    const HOLE_R = 5;
    const HEAD_TOP = 48, HEAD_BOT = 60, HEAD_AF = 18, HEAD_R = HEAD_AF / Math.sqrt(3);
    const SHANK_R = 5, SHANK_BOT = 98;
    const NUT_TOP = 98, NUT_BOT = 110, NUT_AF = 16, NUT_R = NUT_AF / Math.sqrt(3);
    const headHex = G.regularPolygonInCircle([CX, (HEAD_TOP + HEAD_BOT) / 2], HEAD_R, 6, 0);
    const nutHex = G.regularPolygonInCircle([CX, (NUT_TOP + NUT_BOT) / 2], NUT_R, 6, 0);

    CONSTRUCTIONS['basic-bolted-joint'] = {
      id: 'basic-bolted-joint', title: 'Basic Bolted Joint — Two Plates',
      summary: 'An introduction to drawing a bolted assembly in section: two plates joined by a single bolt and nut, hatched correctly, with the fastener itself left unsectioned.',
      bounds: { w: 200, h: 150 },
      workbookPrompt: 'Draw the sectional front view of two plates joined by a bolt and nut. Hatch both plates but leave the bolt and nut unsectioned, and add a centre line through the assembly.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the two plates with a clearance gap for the bolt hole, and the bolt (hex head and shank) passing through — drawn as a plain outline only. Fasteners are never hatched, even when the cutting plane runs straight through them.',
          calloutAt: [CX, HEAD_TOP + 4],
          reveals: [
            { kind: 'polygon', points: [[PLATE_L, P1_TOP], [PLATE_R, P1_TOP], [PLATE_R, P1_BOT], [PLATE_L, P1_BOT]], lineType: 'A' },
            { kind: 'polygon', points: [[PLATE_L, P2_TOP], [PLATE_R, P2_TOP], [PLATE_R, P2_BOT], [PLATE_L, P2_BOT]], lineType: 'A' },
            { kind: 'polygon', points: headHex, lineType: 'A' },
            { kind: 'line', p1: [CX - SHANK_R, HEAD_BOT], p2: [CX - SHANK_R, SHANK_BOT], lineType: 'A' },
            { kind: 'line', p1: [CX + SHANK_R, HEAD_BOT], p2: [CX + SHANK_R, SHANK_BOT], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Hatch both plates, since the section cuts through solid material in each — leave a gap for the bolt hole.',
          calloutAt: [PLATE_L + 15, (P1_TOP + P2_BOT) / 2],
          reveals: [
            ...hatchRect(PLATE_L, P1_TOP, (CX - HOLE_R) - PLATE_L, P1_BOT - P1_TOP, 4),
            ...hatchRect(CX + HOLE_R, P1_TOP, PLATE_R - (CX + HOLE_R), P1_BOT - P1_TOP, 4),
            ...hatchRect(PLATE_L, P2_TOP, (CX - HOLE_R) - PLATE_L, P2_BOT - P2_TOP, 4),
            ...hatchRect(CX + HOLE_R, P2_TOP, PLATE_R - (CX + HOLE_R), P2_BOT - P2_TOP, 4),
          ],
        },
        {
          id: 3,
          instruction: 'Add the nut at the bottom of the shank — also left unsectioned — and a centre line through the whole assembly.',
          calloutAt: [CX, (NUT_TOP + NUT_BOT) / 2],
          reveals: [
            { kind: 'polygon', points: nutHex, lineType: 'A' },
            { kind: 'line', p1: [CX, HEAD_TOP - 6], p2: [CX, NUT_BOT + 6], lineType: 'centre' },
          ],
        },
        {
          id: 4,
          instruction: 'Dimension the plate thicknesses and label the view.',
          calloutAt: [PLATE_R + 25, (P1_TOP + P2_BOT) / 2],
          reveals: [
            { kind: 'dimension', p1: [PLATE_R + 10, P1_TOP], p2: [PLATE_R + 10, P1_BOT], offset: 0, text: (P1_BOT - P1_TOP).toFixed(0) },
            { kind: 'dimension', p1: [PLATE_R + 10, P2_TOP], p2: [PLATE_R + 10, P2_BOT], offset: 0, text: (P2_BOT - P2_TOP).toFixed(0) },
            { kind: 'label', at: [PLATE_L, P2_BOT + 16], text: 'SECTIONAL FRONT VIEW', size: 4.4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 7. Removed Section — Shaft with a Flat ──
  (function () {
    const CY = 90, R = 12, X0 = 40, X1 = 160, FLAT_X0 = 90, FLAT_X1 = 115, FLAT_DEPTH = 5;
    const SEC_CX = 140, SEC_CY = 45;
    CONSTRUCTIONS['removed-section-flat'] = {
      id: 'removed-section-flat', title: 'Removed Section — Shaft with a Flat',
      summary: 'A feature that\'s hard to read in the main view (a milled flat on a round shaft) can be shown clearly as a removed section — a true cross-section, drawn separately and labelled.',
      bounds: { w: 190, h: 120 },
      workbookPrompt: 'Draw the shaft with a flat milled into it, mark the section plane B-B, and draw the removed section showing the true cross-sectional shape (a circle with one flat side).',
      steps: [
        {
          id: 1,
          instruction: 'Draw the shaft with the flat visible as a shallow step in the top edge — hard to read fully from this view alone.',
          calloutAt: [(FLAT_X0 + FLAT_X1) / 2, CY - R],
          reveals: [
            { kind: 'line', p1: [X0, CY - R], p2: [FLAT_X0, CY - R], lineType: 'A' },
            { kind: 'line', p1: [FLAT_X0, CY - R], p2: [FLAT_X0, CY - R + FLAT_DEPTH], lineType: 'A' },
            { kind: 'line', p1: [FLAT_X0, CY - R + FLAT_DEPTH], p2: [FLAT_X1, CY - R + FLAT_DEPTH], lineType: 'A' },
            { kind: 'line', p1: [FLAT_X1, CY - R + FLAT_DEPTH], p2: [FLAT_X1, CY - R], lineType: 'A' },
            { kind: 'line', p1: [FLAT_X1, CY - R], p2: [X1, CY - R], lineType: 'A' },
            { kind: 'line', p1: [X0, CY + R], p2: [X1, CY + R], lineType: 'A' },
            { kind: 'line', p1: [X0, CY - R], p2: [X0, CY + R], lineType: 'A' },
            { kind: 'line', p1: [X1, CY - R], p2: [X1, CY + R], lineType: 'A' },
            { kind: 'line', p1: [X0 - 6, CY], p2: [X1 + 6, CY], lineType: 'centre' },
          ],
        },
        {
          id: 2,
          instruction: 'Mark the section plane B-B straight through the flat, with direction arrows showing which way to look.',
          calloutAt: [(FLAT_X0 + FLAT_X1) / 2, CY],
          reveals: [
            { kind: 'line', p1: [(FLAT_X0 + FLAT_X1) / 2, CY - R - 10], p2: [(FLAT_X0 + FLAT_X1) / 2, CY + R + 10], lineType: 'centre' },
            { kind: 'label', at: [(FLAT_X0 + FLAT_X1) / 2 - 12, CY - R - 12], text: 'B', size: 5, anchor: 'middle', color: '#fde047' },
            { kind: 'label', at: [(FLAT_X0 + FLAT_X1) / 2 - 12, CY + R + 16], text: 'B', size: 5, anchor: 'middle', color: '#fde047' },
          ],
        },
        {
          id: 3,
          instruction: 'Away from the main view, draw the full round guide circle for the removed section — the shaft\'s true diameter at that point.',
          calloutAt: [SEC_CX, SEC_CY],
          reveals: [
            { kind: 'circle', center: [SEC_CX, SEC_CY], r: R, lineType: 'construction' },
            { kind: 'line', p1: [SEC_CX - R - 5, SEC_CY], p2: [SEC_CX + R + 5, SEC_CY], lineType: 'centre' },
            { kind: 'line', p1: [SEC_CX, SEC_CY - R - 5], p2: [SEC_CX, SEC_CY + R + 5], lineType: 'centre' },
          ],
        },
        {
          id: 4,
          instruction: 'Cut the flat into the circle at the SAME depth as the main view, hatch the solid material, and label it SECTION B-B.',
          calloutAt: [SEC_CX, SEC_CY - R + FLAT_DEPTH / 2],
          reveals: [
            { kind: 'line', p1: [SEC_CX - Math.sqrt(R * R - (R - FLAT_DEPTH) * (R - FLAT_DEPTH)), SEC_CY - R + FLAT_DEPTH], p2: [SEC_CX + Math.sqrt(R * R - (R - FLAT_DEPTH) * (R - FLAT_DEPTH)), SEC_CY - R + FLAT_DEPTH], lineType: 'A' },
            { kind: 'arc-construction', center: [SEC_CX, SEC_CY], r: R, startDeg: 0, endDeg: 180, lineType: 'A' },
            { kind: 'label', at: [SEC_CX - R, SEC_CY + R + 12], text: 'SECTION B-B', size: 4.4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 8. Assembling Two Given Components (Reading Exercise) ──
  (function () {
    const R = 7;
    const BASE_G = { x: 30, y: 105, w: 55, h: 30 }; // given base
    const PIN_G = { x: 100, y: 111, w: 55, h: R * 2 }; // given pin, y matches hole centre
    const holeCY = BASE_G.y + BASE_G.h / 2;
    const BASE_A = { x: 30, y: 40, w: 55, h: 30 }; // assembled position
    const pinCY = BASE_A.y + BASE_A.h / 2;

    CONSTRUCTIONS['assembling-given-parts'] = {
      id: 'assembling-given-parts', title: 'Assembling Two Given Components',
      summary: 'Given two separate component drawings — a base and a pin — redraw them assembled and sectioned, applying every convention from this chapter in one exercise.',
      bounds: { w: 175, h: 150 },
      workbookPrompt: 'Given the base (with its through-hole) and the pin, redraw them assembled: the pin through the base, hole and shaft on a shared centre line, base hatched, pin left unsectioned.',
      steps: [
        {
          id: 1,
          instruction: 'GIVEN: the base, with a through-hole shown hidden (its axis runs left-right, so it\'s concealed from this view) — and separately, the pin that fits it. Study both before assembling.',
          calloutAt: [BASE_G.x + BASE_G.w / 2, BASE_G.y + BASE_G.h / 2],
          reveals: [
            { kind: 'polygon', points: [[BASE_G.x, BASE_G.y], [BASE_G.x + BASE_G.w, BASE_G.y], [BASE_G.x + BASE_G.w, BASE_G.y + BASE_G.h], [BASE_G.x, BASE_G.y + BASE_G.h]], lineType: 'A' },
            { kind: 'line', p1: [BASE_G.x, holeCY - R], p2: [BASE_G.x + BASE_G.w, holeCY - R], lineType: 'hidden' },
            { kind: 'line', p1: [BASE_G.x, holeCY + R], p2: [BASE_G.x + BASE_G.w, holeCY + R], lineType: 'hidden' },
            { kind: 'line', p1: [BASE_G.x - 6, holeCY], p2: [BASE_G.x + BASE_G.w + 6, holeCY], lineType: 'centre' },
            { kind: 'label', at: [BASE_G.x, BASE_G.y - 5], text: 'GIVEN: BASE', size: 4, anchor: 'start', color: '#94a3b8' },
            { kind: 'polygon', points: [[PIN_G.x, PIN_G.y], [PIN_G.x + PIN_G.w, PIN_G.y], [PIN_G.x + PIN_G.w, PIN_G.y + PIN_G.h], [PIN_G.x, PIN_G.y + PIN_G.h]], lineType: 'A' },
            { kind: 'line', p1: [PIN_G.x - 6, PIN_G.y + R], p2: [PIN_G.x + PIN_G.w + 6, PIN_G.y + R], lineType: 'centre' },
            { kind: 'label', at: [PIN_G.x, PIN_G.y - 5], text: 'GIVEN: PIN', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'Redraw the base in its assembled position, then slide the pin through the hole — the pin now runs the full width, on the shared centre line.',
          calloutAt: [BASE_A.x + BASE_A.w / 2, pinCY],
          reveals: [
            { kind: 'polygon', points: [[BASE_A.x, BASE_A.y], [BASE_A.x + BASE_A.w, BASE_A.y], [BASE_A.x + BASE_A.w, BASE_A.y + BASE_A.h], [BASE_A.x, BASE_A.y + BASE_A.h]], lineType: 'A' },
            { kind: 'line', p1: [BASE_A.x - 15, pinCY - R], p2: [BASE_A.x + BASE_A.w + 15, pinCY - R], lineType: 'A' },
            { kind: 'line', p1: [BASE_A.x - 15, pinCY + R], p2: [BASE_A.x + BASE_A.w + 15, pinCY + R], lineType: 'A' },
            { kind: 'line', p1: [BASE_A.x - 21, pinCY], p2: [BASE_A.x + BASE_A.w + 21, pinCY], lineType: 'centre' },
          ],
        },
        {
          id: 3,
          instruction: 'Section the assembly: hatch the base, since the cutting plane slices through its solid material — but leave the pin itself unhatched, the same fastener/shaft convention used throughout this chapter.',
          calloutAt: [BASE_A.x + 12, BASE_A.y + 8],
          reveals: [
            ...hatchRect(BASE_A.x, BASE_A.y, BASE_A.w, pinCY - R - BASE_A.y, 4),
            ...hatchRect(BASE_A.x, pinCY + R, BASE_A.w, (BASE_A.y + BASE_A.h) - (pinCY + R), 4),
          ],
        },
        {
          id: 4,
          instruction: 'Dimension the pin diameter and label the completed assembly.',
          calloutAt: [BASE_A.x + BASE_A.w + 30, pinCY],
          reveals: [
            { kind: 'dimension', p1: [BASE_A.x + BASE_A.w + 30, pinCY - R], p2: [BASE_A.x + BASE_A.w + 30, pinCY + R], offset: 0, text: '⌀' + (R * 2) },
            { kind: 'label', at: [BASE_A.x, BASE_A.y - 6], text: 'ASSEMBLED & SECTIONED', size: 4.4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'CAPS Grade 10 mechanical drawings use which projection angle?',
      options: ['3rd-angle projection', '1st-angle projection', '2nd-angle projection', 'Isometric projection'],
      answer: 0,
      explanation: 'Grade 10 mechanical/working drawings use 3rd-angle projection. (Solid geometry and civil drawing later in the year use 1st-angle projection instead — the two are not interchangeable.)',
    },
    {
      text: 'In 3rd-angle projection, where is the top view placed relative to the front view?',
      options: ['Directly above the front view', 'Directly below the front view', 'To the left of the front view', 'It can be placed anywhere'],
      answer: 0,
      explanation: 'In 3rd-angle projection, each view is placed on the same side as the direction you\'re viewing from — so the top view sits directly above the front view.',
    },
    {
      text: 'Where is the right side view placed relative to the front view in 3rd-angle projection?',
      options: ['To the right of the front view', 'To the left of the front view', 'Above the front view', 'Below the top view'],
      answer: 0,
      explanation: 'The right side view is placed to the right of the front view, aligned by height using projection lines.',
    },
    {
      text: 'An edge or hole that cannot be seen directly in a particular view is drawn using:',
      options: ['A dashed hidden-detail line', 'A thick continuous Type A line', 'A centre (chain) line', 'No line at all — it is left out'],
      answer: 0,
      explanation: 'Features that exist but are hidden behind other material in a specific view are drawn as dashed hidden-detail lines, so the reader knows they are there without seeing them directly.',
    },
    {
      text: 'What is the purpose of a cutting-plane line on a drawing?',
      options: [
        'It shows exactly where an imaginary cut is made through the object to reveal a sectional view',
        'It marks the centre of every hole',
        'It shows where to physically cut the real material with a saw',
        'It replaces the need for a title block',
      ],
      answer: 0,
      explanation: 'A cutting-plane line (a chain line with direction arrows, usually labelled e.g. A-A) marks exactly where an imaginary slice is made through the object so its hidden internal detail can be drawn as a visible sectional view.',
    },
    {
      text: 'In a sectional view, a hole or edge that was previously hidden and is now exposed by the cut is drawn as:',
      options: ['A solid Type A line, since the cutting plane exposes it directly', 'Still a dashed hidden line', 'A centre line only', 'It is left blank'],
      answer: 0,
      explanation: 'Once the cutting plane exposes a feature, it is no longer hidden in that view — it becomes a solid, visible Type A line.',
    },
    {
      text: 'What convention shows solid material that the cutting plane has sliced through?',
      options: ['Thin, evenly-spaced 45° hatching lines', 'Filling the area solid black', 'Thick dashed lines', 'A centre line grid'],
      answer: 0,
      explanation: 'Solid material cut through by the section is shown using thin, evenly-spaced hatching lines, conventionally drawn at 45°. Empty space (like a pocket or hole) is never hatched.',
    },
    {
      text: 'Why is a centre line added through a hole in every view it appears in?',
      options: [
        'It marks the true centre/axis of the hole, which is needed for accurate dimensioning',
        'It is purely decorative',
        'It replaces the need to draw the hole itself',
        'It only appears in the top view, never in other views',
      ],
      answer: 0,
      explanation: 'A centre line marks the true axis of symmetry of a round feature, and dimensions to a hole are always measured to its centre line — so it needs to appear in every view that shows the hole.',
    },
    {
      text: 'For a symmetric part, why is only HALF of it sectioned in a half-sectional view?',
      options: [
        'The unsectioned half is a mirror image of the sectioned half, so drawing it again (even as hidden detail) would only clutter the view',
        'Half sections are only used on parts with no internal features at all',
        'It saves the draughtsman time and is otherwise meaningless',
        'The unsectioned half must still be hatched, just at a different angle',
      ],
      answer: 0,
      explanation: 'A half-sectional view relies on the part\'s symmetry: the sectioned half reveals the internal detail, and since the other half is identical, it is left as a plain exterior view with no extra lines.',
    },
    {
      text: 'Why is an auxiliary view needed to show the true shape of an inclined surface, when the front and top views are already given?',
      options: [
        'An inclined surface is foreshortened (distorted) in every standard view — only a view projected perpendicular to it shows its true size and shape',
        'Auxiliary views are only decorative and are not actually required',
        'The front view always already shows every surface true size',
        'Auxiliary views replace the front and top views entirely',
      ],
      answer: 0,
      explanation: 'Because an inclined surface is not parallel to any of the three standard viewing directions, all three standard views foreshorten it — an auxiliary view, projected perpendicular to the surface itself via a fold line, is the only view that shows it undistorted.',
    },
    {
      text: 'What is the purpose of the break-line convention on a long, uniform shaft?',
      options: [
        'It lets the middle (uninteresting, uniform) section be left out of the drawing to save space, while the part is still dimensioned at its true, full length',
        'It indicates the exact point where the real part must be physically cut',
        'It means the shaft\'s length is unknown and cannot be dimensioned',
        'It is only used for shafts, never for pipes or bars',
      ],
      answer: 0,
      explanation: 'A break line removes a uniform, uninteresting middle section from the DRAWING (never from the real part), keeping the drawing compact while the true overall length is still stated in the dimension.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'l-bracket-views', 'sectional-view', 'half-sectional-view', 'auxiliary-view',
    'break-line-shaft', 'basic-bolted-joint', 'removed-section-flat', 'assembling-given-parts',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
