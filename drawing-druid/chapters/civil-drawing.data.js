// Civil Drawing — Chapter 7 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

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

  // ── 1. Simple Floor Plan (Single-Storey Dwelling) ──
  (function () {
    // Outer wall footprint and inner wall face (wall thickness = 6).
    const OX1 = 40, OY1 = 40, OX2 = 110, OY2 = 90;
    const T = 6;
    const IX1 = OX1 + T, IY1 = OY1 + T, IX2 = OX2 - T, IY2 = OY2 - T;

    const doorX1 = 60, doorX2 = 75; // gap in the bottom wall
    const winY1 = 55, winY2 = 75;   // gap in the right wall

    CONSTRUCTIONS['floor-plan'] = {
      id: 'floor-plan', title: 'Simple Floor Plan',
      summary: 'Draw a single-storey floor plan in 1st-angle convention: cavity walls, a door with its swing symbol, a window, dimensions and the floor area.',
      bounds: { w: 155, h: 135 },
      workbookPrompt: 'Draw the floor plan of this single room at a scale of 1:100. Show the cavity wall, door swing, window frame lines, overall dimensions and the calculated floor area.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the outer wall line first — the true outside footprint of the dwelling.',
          calloutAt: [(OX1 + OX2) / 2, OY1],
          reveals: [
            { kind: 'line', p1: [OX1, OY1], p2: [OX2, OY1], lineType: 'A' },
            { kind: 'line', p1: [OX2, OY1], p2: [OX2, winY1], lineType: 'A' },
            { kind: 'line', p1: [OX2, winY2], p2: [OX2, OY2], lineType: 'A' },
            { kind: 'line', p1: [OX2, OY2], p2: [doorX2, OY2], lineType: 'A' },
            { kind: 'line', p1: [doorX1, OY2], p2: [OX1, OY2], lineType: 'A' },
            { kind: 'line', p1: [OX1, OY2], p2: [OX1, OY1], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the inner wall face, offset in from the outer line by the wall thickness — this is what makes it a proper cavity wall in plan, not just a single line.',
          calloutAt: [(IX1 + IX2) / 2, IY1],
          reveals: [
            { kind: 'line', p1: [IX1, IY1], p2: [IX2, IY1], lineType: 'A' },
            { kind: 'line', p1: [IX2, IY1], p2: [IX2, winY1], lineType: 'A' },
            { kind: 'line', p1: [IX2, winY2], p2: [IX2, IY2], lineType: 'A' },
            { kind: 'line', p1: [IX2, IY2], p2: [doorX2, IY2], lineType: 'A' },
            { kind: 'line', p1: [doorX1, IY2], p2: [IX1, IY2], lineType: 'A' },
            { kind: 'line', p1: [IX1, IY2], p2: [IX1, IY1], lineType: 'A' },
            { kind: 'line', p1: [doorX1, OY2], p2: [doorX1, IY2], lineType: 'A' },
            { kind: 'line', p1: [doorX2, OY2], p2: [doorX2, IY2], lineType: 'A' },
            { kind: 'line', p1: [OX2, winY1], p2: [IX2, winY1], lineType: 'A' },
            { kind: 'line', p1: [OX2, winY2], p2: [IX2, winY2], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'At the door opening, draw the door leaf at its hinge and the quarter-circle swing symbol showing the path it sweeps through as it opens.',
          calloutAt: [doorX1 + 7, IY2 - 10],
          reveals: [
            { kind: 'line', p1: [doorX1, IY2], p2: [doorX1, IY2 - (doorX2 - doorX1)], lineType: 'B' },
            { kind: 'arc-construction', center: [doorX1, IY2], r: doorX2 - doorX1, startDeg: -90, endDeg: 0, lineType: 'C' },
          ],
        },
        {
          id: 4,
          instruction: 'At the window opening, draw thin parallel lines across the gap to represent the window frame and glazing bars.',
          calloutAt: [OX2 + 8, (winY1 + winY2) / 2],
          reveals: [
            { kind: 'line', p1: [IX2, winY1 + 3], p2: [OX2, winY1 + 3], lineType: 'B' },
            { kind: 'line', p1: [IX2, (winY1 + winY2) / 2], p2: [OX2, (winY1 + winY2) / 2], lineType: 'B' },
            { kind: 'line', p1: [IX2, winY2 - 3], p2: [OX2, winY2 - 3], lineType: 'B' },
          ],
        },
        {
          id: 5,
          instruction: 'Label the room, dimension the overall (outer) width and height, and calculate the floor area from the inner dimensions. Assume this plan is drawn at a scale of 1:100 — each drawing unit represents 100 mm.',
          calloutAt: [(OX1 + OX2) / 2, (OY1 + OY2) / 2],
          reveals: [
            { kind: 'label', at: [(IX1 + IX2) / 2 - 14, (IY1 + IY2) / 2], text: 'BEDROOM', size: 4.2, anchor: 'start', color: '#94a3b8' },
            { kind: 'dimension', p1: [OX1, OY1 - 8], p2: [OX2, OY1 - 8], offset: -6, text: ((OX2 - OX1) / 10).toFixed(1) + 'm' },
            { kind: 'dimension', p1: [OX1 - 8, OY1], p2: [OX1 - 8, OY2], offset: -6, text: ((OY2 - OY1) / 10).toFixed(1) + 'm' },
            { kind: 'label', at: [OX1, OY2 + 16], text: 'Floor area = ' + ((IX2 - IX1) / 10).toFixed(1) + 'm × ' + ((IY2 - IY1) / 10).toFixed(1) + 'm = ' + (((IX2 - IX1) / 10) * ((IY2 - IY1) / 10)).toFixed(2) + 'm²', size: 4.2, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. Sectional Elevation: Foundation to Slab ──
  (function () {
    const wallCX = 100, wallHalf = 12.5;
    const footingY1 = 130, footingY2 = 150, footingHalf = 25;
    const dpcY = 85, groundY = 90;
    const slabY1 = 75, slabY2 = 85, slabLeftX = 60;
    const breakY = 40;

    CONSTRUCTIONS['foundation-section'] = {
      id: 'foundation-section', title: 'Foundation-to-Slab Section',
      summary: 'A sectional elevation through an external wall, from the concrete strip foundation up to the floor slab — including the damp-proof course.',
      bounds: { w: 150, h: 165 },
      workbookPrompt: 'Draw the sectional elevation from the foundation footing up to the floor slab, hatching all concrete correctly and clearly labelling the DPC, footing, slab and ground level.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the concrete strip foundation (the footing) below ground level, and hatch it — concrete that has been cut through is always shown hatched.',
          calloutAt: [wallCX, (footingY1 + footingY2) / 2],
          reveals: [
            { kind: 'polygon', points: [[wallCX - footingHalf, footingY1], [wallCX + footingHalf, footingY1], [wallCX + footingHalf, footingY2], [wallCX - footingHalf, footingY2]], lineType: 'A' },
            ...hatchRect(wallCX - footingHalf, footingY1, footingHalf * 2, footingY2 - footingY1, 6),
          ],
        },
        {
          id: 2,
          instruction: 'Draw the foundation wall rising from the footing up to just below ground level — narrower than the footing, and left unhatched to show it is masonry, not concrete.',
          calloutAt: [wallCX, (dpcY + footingY1) / 2],
          reveals: [
            { kind: 'line', p1: [wallCX - wallHalf, dpcY], p2: [wallCX - wallHalf, footingY1], lineType: 'A' },
            { kind: 'line', p1: [wallCX + wallHalf, dpcY], p2: [wallCX + wallHalf, footingY1], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Add the ground line, and the damp-proof course (DPC) just above it — a waterproof membrane, shown as a short thick line, that stops rising damp from reaching the wall above.',
          calloutAt: [wallCX - wallHalf - 20, groundY],
          reveals: [
            { kind: 'line', p1: [40, groundY], p2: [wallCX - wallHalf, groundY], lineType: 'B' },
            { kind: 'label', at: [38, groundY - 2], text: 'GROUND LEVEL', size: 3.6, anchor: 'end', color: '#94a3b8' },
            { kind: 'line', p1: [wallCX - wallHalf - 2, dpcY], p2: [wallCX + wallHalf + 2, dpcY], lineType: 'A' },
            { kind: 'label', at: [wallCX + wallHalf + 5, dpcY + 1], text: 'DPC', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'Draw the concrete floor slab resting at DPC level (hatched, since it too is concrete), and continue the wall upward above it — shown cut off with a break line, since this is only a partial detail.',
          calloutAt: [(slabLeftX + wallCX + wallHalf) / 2, (slabY1 + slabY2) / 2],
          reveals: [
            { kind: 'polygon', points: [[slabLeftX, slabY1], [wallCX + wallHalf, slabY1], [wallCX + wallHalf, slabY2], [slabLeftX, slabY2]], lineType: 'A' },
            ...hatchRect(slabLeftX, slabY1, (wallCX + wallHalf) - slabLeftX, slabY2 - slabY1, 6),
            { kind: 'line', p1: [wallCX - wallHalf, slabY1], p2: [wallCX - wallHalf, breakY + 4], lineType: 'A' },
            { kind: 'line', p1: [wallCX + wallHalf, slabY1], p2: [wallCX + wallHalf, breakY + 4], lineType: 'A' },
            { kind: 'polyline', points: [[wallCX - wallHalf - 3, breakY + 4], [wallCX - wallHalf + 2, breakY], [wallCX - wallHalf - 2, breakY - 4], [wallCX - wallHalf + 3, breakY - 8]], lineType: 'B' },
            { kind: 'polyline', points: [[wallCX + wallHalf - 3, breakY + 4], [wallCX + wallHalf + 2, breakY], [wallCX + wallHalf - 2, breakY - 4], [wallCX + wallHalf + 3, breakY - 8]], lineType: 'B' },
          ],
        },
        {
          id: 5,
          instruction: 'Label each part of the section: footing, foundation wall, and floor slab.',
          calloutAt: [wallCX + footingHalf + 6, (footingY1 + footingY2) / 2],
          reveals: [
            { kind: 'label', at: [wallCX + footingHalf + 4, (footingY1 + footingY2) / 2], text: 'FOOTING', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [wallCX + wallHalf + 4, (dpcY + footingY1) / 2], text: 'FOUNDATION WALL', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [slabLeftX, slabY2 + 8], text: 'FLOOR SLAB', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 3. Bathroom Fixture Symbols ──
  (function () {
    const RX1 = 30, RY1 = 30, RX2 = 150, RY2 = 110;

    CONSTRUCTIONS['bathroom-fixtures'] = {
      id: 'bathroom-fixtures', title: 'Bathroom Fixture Symbols',
      summary: 'The standard SANS plan-view symbols for a bath, water closet (WC) and wash basin (WB) — every EGD floor plan with a bathroom uses these exact shapes.',
      bounds: { w: 190, h: 145 },
      workbookPrompt: 'Draw the bathroom outline and place the standard symbols for a bath, WC and wash basin, each correctly labelled with its abbreviation.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the bathroom\'s wall outline.',
          calloutAt: [(RX1 + RX2) / 2, RY1],
          reveals: [
            { kind: 'polygon', points: [[RX1, RY1], [RX2, RY1], [RX2, RY2], [RX1, RY2]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the BATH (B) — a rectangle against one wall, with rounded ends approximated by short chamfers.',
          calloutAt: [70, 45],
          reveals: [
            { kind: 'polygon', points: [[35, 35], [105, 35], [105, 60], [35, 60]], lineType: 'A' },
            { kind: 'label', at: [65, 50], text: 'B', size: 5, anchor: 'middle', color: '#94a3b8' },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the WC (water closet) — an oval seat shape with a rectangular cistern tank behind it against the wall.',
          calloutAt: [130, 45],
          reveals: [
            { kind: 'circle', center: [130, 50], r: 10, lineType: 'A' },
            { kind: 'polygon', points: [[120, 32], [140, 32], [140, 40], [120, 40]], lineType: 'A' },
            { kind: 'label', at: [130, 51], text: 'WC', size: 4, anchor: 'middle', color: '#94a3b8' },
          ],
        },
        {
          id: 4,
          instruction: 'Draw the WASH BASIN (WB) — an oval bowl fixed against the wall.',
          calloutAt: [130, 85],
          reveals: [
            { kind: 'circle', center: [130, 85], r: 12, lineType: 'A' },
            { kind: 'line', p1: [130, 73], p2: [130, 68], lineType: 'B' },
            { kind: 'label', at: [130, 86], text: 'WB', size: 4, anchor: 'middle', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 4. Electrical Symbols on a Floor Plan ──
  (function () {
    const RX1 = 30, RY1 = 30, RX2 = 140, RY2 = 110;
    const lightC = [85, 55], switchC = [45, 95];

    CONSTRUCTIONS['electrical-symbols'] = {
      id: 'electrical-symbols', title: 'Electrical Symbols on a Floor Plan',
      summary: 'The standard symbols for a ceiling light, a one-way switch, and a socket outlet — plus the dashed line showing which switch controls which light.',
      bounds: { w: 175, h: 140 },
      workbookPrompt: 'Draw the room outline, place a ceiling light and its switch, connect them with the dashed control line, and add a socket outlet.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the room outline.',
          calloutAt: [(RX1 + RX2) / 2, RY1],
          reveals: [{ kind: 'polygon', points: [[RX1, RY1], [RX2, RY1], [RX2, RY2], [RX1, RY2]], lineType: 'A' }],
        },
        {
          id: 2,
          instruction: 'Draw the CEILING LIGHT symbol — a circle with a cross inside — roughly centred in the room.',
          calloutAt: lightC,
          reveals: [
            { kind: 'circle', center: lightC, r: 6, lineType: 'A' },
            { kind: 'line', p1: [lightC[0] - 6, lightC[1] - 6], p2: [lightC[0] + 6, lightC[1] + 6], lineType: 'A' },
            { kind: 'line', p1: [lightC[0] - 6, lightC[1] + 6], p2: [lightC[0] + 6, lightC[1] - 6], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the SWITCH symbol (S) near the door, and a dashed line connecting it to the light it controls.',
          calloutAt: switchC,
          reveals: [
            { kind: 'circle', center: switchC, r: 3, lineType: 'A' },
            { kind: 'label', at: [switchC[0] + 5, switchC[1] + 1], text: 'S', size: 4, anchor: 'start', color: '#94a3b8' },
            { kind: 'line', p1: switchC, p2: lightC, lineType: 'hidden' },
          ],
        },
        {
          id: 4,
          instruction: 'Add a SOCKET OUTLET symbol on a wall and label all three fittings.',
          calloutAt: [RX2 - 15, RY2 - 10],
          reveals: [
            { kind: 'circle', center: [RX2 - 15, RY2 - 10], r: 3, lineType: 'A' },
            { kind: 'line', p1: [RX2 - 18, RY2 - 12], p2: [RX2 - 12, RY2 - 12], lineType: 'A' },
            { kind: 'label', at: [RX1, RY2 + 12], text: 'CEILING LIGHT · S SWITCH · SOCKET OUTLET', size: 3.8, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 5. Roof Detail — Sectional Elevation ──
  (function () {
    const wallCX = 100, wallHalf = 12.5;
    const breakY = 130, plateY = 100, ceilingY = 100;
    const ridgeX = wallCX, ridgeY = 40;
    const eaveOut = 20;
    const rafterOuterX1 = wallCX - wallHalf - eaveOut, rafterOuterX2 = wallCX + wallHalf + eaveOut;

    CONSTRUCTIONS['roof-detail-section'] = {
      id: 'roof-detail-section', title: 'Roof Detail — Sectional Elevation',
      summary: 'Continuing the wall section upward: the wall plate, ceiling, sloped rafter and roof covering, extending past the wall face to form the eave overhang.',
      bounds: { w: 170, h: 160 },
      workbookPrompt: 'Draw the roof detail continuing from the top of the wall: wall plate, ceiling, rafter and roof covering, with a clear eave overhang beyond the wall face.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the top of the wall (broken off below, since this is only the roof portion of the section) and the wall plate resting on it — the timber the rafters bear onto.',
          calloutAt: [wallCX, plateY - 5],
          reveals: [
            { kind: 'line', p1: [wallCX - wallHalf, breakY], p2: [wallCX - wallHalf, plateY], lineType: 'A' },
            { kind: 'line', p1: [wallCX + wallHalf, breakY], p2: [wallCX + wallHalf, plateY], lineType: 'A' },
            { kind: 'polygon', points: [[wallCX - wallHalf - 3, plateY - 6], [wallCX + wallHalf + 3, plateY - 6], [wallCX + wallHalf + 3, plateY], [wallCX - wallHalf - 3, plateY]], lineType: 'A' },
            { kind: 'label', at: [wallCX + wallHalf + 6, plateY - 3], text: 'WALL PLATE', size: 3.8, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the ceiling — a horizontal line at wall-plate level, fixed to the INSIDE face of the wall.',
          calloutAt: [wallCX, ceilingY],
          reveals: [
            { kind: 'line', p1: [wallCX - wallHalf, ceilingY - 6], p2: [wallCX + wallHalf, ceilingY - 6], lineType: 'B' },
            { kind: 'label', at: [wallCX - wallHalf, ceilingY - 10], text: 'CEILING', size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the rafter, sloping up from the wall plate to the ridge, and the roof covering following the same slope — extending PAST the wall to form the eave overhang.',
          calloutAt: [(wallCX + rafterOuterX2) / 2, (plateY + ridgeY) / 2],
          reveals: [
            { kind: 'line', p1: [rafterOuterX2, plateY - 6], p2: [ridgeX, ridgeY], lineType: 'A' },
            { kind: 'line', p1: [rafterOuterX2, plateY - 12], p2: [ridgeX, ridgeY - 6], lineType: 'A' },
            { kind: 'line', p1: [wallCX + wallHalf + 3, plateY - 9], p2: [rafterOuterX2, plateY - 9], lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'Dimension the eave overhang and label the rafter and eave.',
          calloutAt: [rafterOuterX2 - 5, plateY - 3],
          reveals: [
            { kind: 'dimension', p1: [wallCX + wallHalf, breakY + 10], p2: [rafterOuterX2, breakY + 10], offset: 0, text: String(eaveOut) },
            { kind: 'label', at: [rafterOuterX1 - 30, plateY - 25], text: 'RAFTER', size: 3.8, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [rafterOuterX2 - 10, plateY - 16], text: 'EAVE', size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 6. Window Detail — Sill, Frame and Lintel ──
  (function () {
    const wallL = 60, wallR = 140, wallT = 30, wallB = 130;
    const openL = 75, openR = 125, openT = 55, openB = 95;
    const lintelT = openT - 10;
    const sillB = openB + 10;

    CONSTRUCTIONS['window-detail'] = {
      id: 'window-detail', title: 'Window Detail — Sill, Frame and Lintel',
      summary: 'A cross-section through a window opening: the lintel carrying the wall load above the gap, the frame and glazing, and the sill sloped to shed water.',
      bounds: { w: 200, h: 160 },
      workbookPrompt: 'Draw the wall in section with a window opening: the lintel above, the frame and glazing within the opening, and the sloped sill below.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the wall with the window opening left as a gap.',
          calloutAt: [wallL + 8, wallT + 10],
          reveals: [
            ...hatchRect(wallL, wallT, openL - wallL, wallB - wallT, 5),
            ...hatchRect(openR, wallT, wallR - openR, wallB - wallT, 5),
            { kind: 'polygon', points: [[wallL, wallT], [wallR, wallT], [wallR, wallB], [wallL, wallB]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the LINTEL above the opening — a concrete or steel beam spanning across the gap, carrying the wall\'s weight above it so the wall does not need a support directly under it.',
          calloutAt: [(openL + openR) / 2, (lintelT + openT) / 2],
          reveals: [
            ...hatchRect(wallL, lintelT, wallR - wallL, openT - lintelT, 5),
            { kind: 'polygon', points: [[wallL, lintelT], [wallR, lintelT], [wallR, openT], [wallL, openT]], lineType: 'A' },
            { kind: 'label', at: [wallR + 5, (lintelT + openT) / 2], text: 'LINTEL', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the window frame and glazing within the opening.',
          calloutAt: [(openL + openR) / 2, (openT + openB) / 2],
          reveals: [
            { kind: 'polygon', points: [[openL, openT], [openR, openT], [openR, openB], [openL, openB]], lineType: 'A' },
            { kind: 'line', p1: [(openL + openR) / 2, openT], p2: [(openL + openR) / 2, openB], lineType: 'B' },
          ],
        },
        {
          id: 4,
          instruction: 'Draw the SILL at the bottom, sloped outward and downward — this sheds rainwater away from the wall face instead of letting it pool and seep in.',
          calloutAt: [(openL + openR) / 2, sillB],
          reveals: [
            { kind: 'polygon', points: [[openL - 4, openB], [openR + 4, openB], [openR + 8, sillB], [openL - 8, sillB]], lineType: 'A' },
            { kind: 'label', at: [wallR + 5, sillB - 4], text: 'SILL', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 7. Drainage — Waste Line with Fall ──
  (function () {
    const fixtureP = [40, 40], manholeP = [140, 100];

    CONSTRUCTIONS['drainage-waste-line'] = {
      id: 'drainage-waste-line', title: 'Drainage — Waste Line with Fall',
      summary: 'A waste pipe run from a fixture to a manhole, always shown flowing downhill (a "fall") toward the sewer connection, with the manhole symbol and direction arrow.',
      bounds: { w: 175, h: 130 },
      workbookPrompt: 'Draw the 110 mm waste pipe from the fixture to the manhole, with a direction arrow showing the flow and a labelled fall of 1:60.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the pipe run from the fixture to the manhole — waste pipes are always laid to fall (slope downhill) toward the point of disposal, never uphill.',
          calloutAt: G.midpoint(fixtureP, manholeP),
          reveals: [
            { kind: 'point', at: fixtureP, size: 1.3, color: '#fde047' },
            { kind: 'line', p1: fixtureP, p2: manholeP, lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the MANHOLE symbol at the low end — a circle with a diagonal cross, marking the access chamber where the pipe connects to the main sewer line.',
          calloutAt: manholeP,
          reveals: [
            { kind: 'circle', center: manholeP, r: 8, lineType: 'A' },
            { kind: 'line', p1: [manholeP[0] - 5.6, manholeP[1] - 5.6], p2: [manholeP[0] + 5.6, manholeP[1] + 5.6], lineType: 'A' },
            { kind: 'line', p1: [manholeP[0] - 5.6, manholeP[1] + 5.6], p2: [manholeP[0] + 5.6, manholeP[1] - 5.6], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Add a direction arrow along the pipe, always pointing the way the waste flows — toward the manhole.',
          calloutAt: G.midpoint(fixtureP, manholeP),
          reveals: [
            { kind: 'polygon', points: [[110, 82], [102, 78], [104, 86]], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Label the pipe diameter and the required fall (gradient) — the minimum slope needed to keep waste flowing without blockages.',
          calloutAt: [70, 55],
          reveals: [
            { kind: 'label', at: [50, 60], text: '110 Ø PVC PIPE, FALL 1:60', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [manholeP[0] - 10, manholeP[1] + 16], text: 'MANHOLE', size: 3.8, anchor: 'start', color: '#94a3b8' },
          ],
        },
      ],
    };
  })();

  // ── 8. Load-Bearing vs Non-Load-Bearing Walls ──
  (function () {
    const LB_X = 40, LB_W = 25, WALL_Y1 = 40, WALL_Y2 = 110;
    const NLB_X = 110, NLB_W = 11;

    CONSTRUCTIONS['loadbearing-wall-comparison'] = {
      id: 'loadbearing-wall-comparison', title: 'Load-Bearing vs Non-Load-Bearing Walls',
      summary: 'A structural (load-bearing) wall is drawn thicker than a partition (non-load-bearing) wall — the thickness itself is the convention that tells the reader which walls actually carry the roof load.',
      bounds: { w: 165, h: 130 },
      workbookPrompt: 'Draw a 250 mm load-bearing wall and a 110 mm non-load-bearing wall side by side in section, hatched, dimensioned and clearly labelled.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the LOAD-BEARING wall — 250 mm thick, since it must carry the weight of the roof and any floors above down to the foundation.',
          calloutAt: [LB_X + LB_W / 2, (WALL_Y1 + WALL_Y2) / 2],
          reveals: [
            { kind: 'polygon', points: [[LB_X, WALL_Y1], [LB_X + LB_W, WALL_Y1], [LB_X + LB_W, WALL_Y2], [LB_X, WALL_Y2]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Hatch it and dimension its thickness.',
          calloutAt: [LB_X + LB_W / 2, WALL_Y1 - 10],
          reveals: [
            ...hatchRect(LB_X, WALL_Y1, LB_W, WALL_Y2 - WALL_Y1, 5),
            { kind: 'dimension', p1: [LB_X, WALL_Y1 - 8], p2: [LB_X + LB_W, WALL_Y1 - 8], offset: 0, text: String(LB_W * 10) },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the NON-LOAD-BEARING wall alongside — only 110 mm thick (a single brick width), since it only needs to divide space, not carry any structural load.',
          calloutAt: [NLB_X + NLB_W / 2, (WALL_Y1 + WALL_Y2) / 2],
          reveals: [
            { kind: 'polygon', points: [[NLB_X, WALL_Y1], [NLB_X + NLB_W, WALL_Y1], [NLB_X + NLB_W, WALL_Y2], [NLB_X, WALL_Y2]], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Hatch it, dimension its thickness, and label both walls clearly — the thickness alone tells a builder which walls are structural.',
          calloutAt: [NLB_X + NLB_W / 2, WALL_Y1 - 10],
          reveals: [
            ...hatchRect(NLB_X, WALL_Y1, NLB_W, WALL_Y2 - WALL_Y1, 5),
            { kind: 'dimension', p1: [NLB_X, WALL_Y1 - 8], p2: [NLB_X + NLB_W, WALL_Y1 - 8], offset: 0, text: String(NLB_W * 10) },
            { kind: 'label', at: [LB_X - 5, WALL_Y2 + 12], text: 'LOAD-BEARING (250 mm)', size: 3.8, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [NLB_X - 5, WALL_Y2 + 22], text: 'NON-LOAD-BEARING (110 mm)', size: 3.8, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'Which SANS guideline governs civil drawing conventions (as opposed to SANS 0111 for general/mechanical drawing)?',
      options: ['SANS 0143', 'SANS 0111', 'SANS 10400', 'SANS 0157'],
      answer: 0,
      explanation: 'Civil working drawings — floor plans, elevations and sectional elevations — must comply with the SANS (SABS) 0143 Guidelines.',
    },
    {
      text: 'On a floor plan, what does the quarter-circle arc at a door opening represent?',
      options: [
        'The path swept by the door leaf as it opens',
        'A window',
        'A structural column',
        'The direction of north'
      ],
      answer: 0,
      explanation: 'The quarter-circle (or similar arc) shows the swing of the door leaf, letting the reader see which way the door opens and confirming it will not obstruct anything.',
    },
    {
      text: 'On a floor plan, how is a window opening typically shown, as opposed to a door opening?',
      options: [
        'As a gap in the wall crossed by thin parallel frame lines, with no swing arc',
        'Exactly the same as a door, including a swing arc',
        'As a solid, unbroken wall line',
        'Windows are never shown on floor plans',
      ],
      answer: 0,
      explanation: 'A window opening is shown with thin lines across the gap representing the frame and glazing bars — there is no swing arc, since a window does not swing open the way a hinged door does.',
    },
    {
      text: 'Why is concrete shown hatched wherever a section cuts through it, while masonry (brick) is often left unhatched?',
      options: [
        'It is a drawing convention used to visually distinguish between different materials cut by the section',
        'Concrete is always the same colour as brick, so hatching is needed to tell them apart in a photograph',
        'It has no real purpose — it is purely decorative',
        'Masonry can never be hatched under any circumstances',
      ],
      answer: 0,
      explanation: 'Hatching (and varying the hatch style) is a drawing convention that lets the reader instantly distinguish which material a sectioned surface is made of.',
    },
    {
      text: 'What is the purpose of the damp-proof course (DPC)?',
      options: [
        'To form a waterproof barrier that stops rising damp/moisture from the ground reaching the wall above',
        'To support the full weight of the roof',
        'To provide the building\'s electrical earth connection',
        'It is purely decorative brickwork',
      ],
      answer: 0,
      explanation: 'The DPC is a waterproof membrane built into the wall, positioned above ground level, specifically to stop moisture rising up through the masonry from the ground.',
    },
    {
      text: 'Why is the strip foundation (footing) wider than the wall that sits on top of it?',
      options: [
        'To spread the building\'s load over a larger area of soil, preventing excessive settlement',
        'To save on concrete costs',
        'It has no structural purpose, only an aesthetic one',
        'Because SANS 0143 requires all footings to be exactly double the wall width',
      ],
      answer: 0,
      explanation: 'A wider footing spreads the structure\'s weight over more ground area, reducing the pressure on the soil and helping prevent the foundation from sinking unevenly.',
    },
    {
      text: 'How is the floor area of a room calculated from a floor plan?',
      options: [
        'By multiplying the INNER (internal) width and length of the room, not the outer wall-to-wall dimensions',
        'By multiplying the outer wall-to-wall width and length',
        'By adding the perimeter and the room\'s height',
        'Floor area cannot be calculated from a plan — it must be measured on site',
      ],
      answer: 0,
      explanation: 'Floor area refers to usable internal space, so it is always calculated using the inner (internal) dimensions of the room, measured from the inside wall faces — not the outer footprint, which includes the wall thickness.',
    },
    {
      text: 'What does a jagged "break line" on a sectional elevation indicate?',
      options: [
        'That the drawing has been deliberately cut off there, because only part of the full height needed to be shown',
        'A structural crack in the wall',
        'The exact location of the damp-proof course',
        'That the material is broken or damaged'
      ],
      answer: 0,
      explanation: 'A break line shows that the drawing has intentionally been shortened — the object continues beyond that point, but showing it in full was not necessary for this detail.',
    },
    {
      text: 'On a floor plan, what does the ceiling light symbol (a circle with a cross inside) connect to via a dashed line?',
      options: [
        'The switch that controls it',
        'The nearest window',
        'The manhole',
        'Nothing — the dashed line is purely decorative',
      ],
      answer: 0,
      explanation: 'The dashed line between a light symbol and a switch symbol shows the control relationship — which switch turns which light on and off — information a builder needs to wire the circuit correctly.',
    },
    {
      text: 'Why is a LINTEL required above a window or door opening?',
      options: [
        'It spans the gap and carries the weight of the wall above down to the solid wall either side, since there is no wall directly under it to bear that load',
        'It is purely decorative and has no structural function',
        'It replaces the need for a foundation',
        'It is only used above doors, never above windows',
      ],
      answer: 0,
      explanation: 'Without a lintel, the wall above the opening would have nothing to bear on. The lintel bridges the gap, transferring that load safely to the solid wall on either side.',
    },
    {
      text: 'Why is a window sill sloped, rather than flat?',
      options: [
        'To shed rainwater away from the wall face instead of letting it pool and seep into the building',
        'To make the window easier to open',
        'It is a purely decorative shape with no functional purpose',
        'Flat sills are actually preferred; slopes are a common construction mistake',
      ],
      answer: 0,
      explanation: 'A sloped sill directs rainwater running down the window away from the wall, preventing water from pooling against the building and causing damp or damage over time.',
    },
    {
      text: 'Why must a waste (drainage) pipe always be laid with a "fall" toward the manhole/sewer connection, never uphill?',
      options: [
        'Waste pipes rely on gravity alone to keep the contents flowing — a pipe running uphill would allow waste to sit and cause blockages',
        'The fall is purely a legal formality with no functional purpose',
        'Pipes are laid uphill on purpose to slow the flow down',
        'Fall only matters for water supply pipes, never for waste pipes',
      ],
      answer: 0,
      explanation: 'Domestic waste pipes are not pumped — they depend entirely on gravity, so a continuous downhill gradient ("fall") toward the sewer connection is essential to keep them clear.',
    },
    {
      text: 'What visually distinguishes a load-bearing wall from a non-load-bearing (partition) wall on a floor plan?',
      options: [
        'The load-bearing wall is drawn noticeably thicker (e.g. 250 mm vs 110 mm), since it must be strong enough to carry structural load down to the foundation',
        'Load-bearing walls are always drawn in a different colour',
        'There is no visual difference between the two on a floor plan',
        'Non-load-bearing walls are never shown on a floor plan at all',
      ],
      answer: 0,
      explanation: 'Wall thickness is the key convention: a load-bearing wall needs enough mass and strength to carry structural load, so it is built (and drawn) substantially thicker than a simple space-dividing partition wall.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'floor-plan', 'foundation-section', 'bathroom-fixtures', 'electrical-symbols',
    'roof-detail-section', 'window-detail', 'drainage-waste-line', 'loadbearing-wall-comparison',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
