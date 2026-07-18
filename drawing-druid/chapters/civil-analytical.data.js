// Civil Analytical — Chapter data. Requires engine-geometry.js loaded first
// (window.ConstructionGeometry). Grade 10-12: a READING/INTERPRETATION chapter for civil/
// building drawings — same pattern as mechanical-analytical.data.js: step 1 reveals the whole
// drawing, then each later step adds one numbered balloon (the engine's built-in calloutAt)
// explaining a specific site-plan, floor-plan, schedule, symbol, section or level convention.
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  function hatchRect(x0, y0, w, h, spacing, angleDeg) {
    angleDeg = angleDeg == null ? 45 : angleDeg;
    const a = angleDeg * Math.PI / 180;
    const tx = Math.cos(a), ty = Math.sin(a);
    const diag = Math.hypot(w, h) + spacing;
    const n = Math.ceil(diag / spacing);
    const lines = [];
    for (let i = -n; i <= n; i++) {
      const ox = i * spacing * -ty, oy = i * spacing * tx;
      const cx = x0 + w / 2 + ox, cy = y0 + h / 2 + oy;
      const p1 = [cx - tx * diag, cy - ty * diag];
      const p2 = [cx + tx * diag, cy + ty * diag];
      const clipped = clipToRect(p1, p2, x0, y0, w, h);
      if (clipped) lines.push({ kind: 'line', p1: clipped[0], p2: clipped[1], lineType: 'B' });
    }
    return lines;
  }
  function clipToRect(p1, p2, x0, y0, w, h) {
    const x1v = x0, x2v = x0 + w, y1v = y0, y2v = y0 + h;
    let t0 = 0, t1 = 1;
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    const checks = [[-dx, p1[0] - x1v], [dx, x2v - p1[0]], [-dy, p1[1] - y1v], [dy, y2v - p1[1]]];
    for (const [p, q] of checks) {
      if (p === 0) { if (q < 0) return null; continue; }
      const r = q / p;
      if (p < 0) { if (r > t1) return null; if (r > t0) t0 = r; }
      else { if (r < t0) return null; if (r < t1) t1 = r; }
    }
    return [[p1[0] + t0 * dx, p1[1] + t0 * dy], [p1[0] + t1 * dx, p1[1] + t1 * dy]];
  }

  // ── 1. Reading a Site Plan ──
  (function () {
    CONSTRUCTIONS['site-plan-reading'] = {
      id: 'site-plan-reading', title: 'Reading a Site Plan',
      summary: 'A site plan shows the whole property — boundary, building line, orientation and the proposed structure — all drawn to a small scale so the entire erf fits on one sheet.',
      bounds: { w: 200, h: 165 },
      workbookPrompt: 'Given a site plan with an erf boundary, a 4.5 m building line and a building footprint, state whether the footprint complies with the building line, and give the real-world site width if it measures 80 mm on paper at 1:200.',
      steps: [
        {
          id: 1,
          instruction: 'A typical site plan: property boundary, building line, and the proposed house footprint. Balloon 1: the NORTH POINT — every civil drawing must show true orientation, since a site plan is meaningless without knowing which way it faces.',
          calloutAt: [165, 20],
          reveals: [
            { kind: 'polygon', points: [[20, 30], [180, 30], [180, 130], [20, 130]], lineType: 'A' },
            { kind: 'line', p1: [165, 30], p2: [165, 15], lineType: 'B' },
            { kind: 'polygon', points: [[165, 15], [162, 21], [168, 21]], lineType: 'B' },
            { kind: 'label', at: [165, 12], text: 'N', size: 4.4, anchor: 'middle', color: '#fde047' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the solid outer rectangle is the ERF (property) BOUNDARY — the legal extent of the stand. Nothing may ever be built beyond this line, and it is always drawn as a thick, solid, unbroken line.',
          calloutAt: [20, 80],
          reveals: [],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the broken (short-dash) inset rectangle is the BUILDING LINE — a minimum setback distance from the boundary, set by the local municipality. The building footprint must sit entirely inside this line, never on or beyond it.',
          calloutAt: [35, 45],
          reveals: [
            { kind: 'polygon', points: [[35, 45], [165, 45], [165, 115], [35, 115]], lineType: 'hidden' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: the hatched rectangle is the proposed BUILDING FOOTPRINT — the house drawn to scale within the site, positioned safely inside the building line on every side.',
          calloutAt: [100, 80],
          reveals: [
            { kind: 'polygon', points: [[55, 60], [145, 60], [145, 100], [55, 100]], lineType: 'A' },
            ...hatchRect(55, 60, 90, 40, 8),
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5: "SCALE 1:200" — every 1 unit measured on this paper represents 200 of that same unit in real life. A boundary line measuring 80 mm on the sheet is therefore 80 × 200 = 16 000 mm = 16 m on the actual site.',
          calloutAt: [25, 140],
          reveals: [
            { kind: 'label', at: [25, 140], text: 'SCALE 1:200', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [25, 146], text: 'ERF 1247', size: 4, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 6,
          instruction: 'Balloon 6: a site plan is always drawn at a much SMALLER scale (e.g. 1:200) than a floor plan (e.g. 1:100) — the whole erf, including surrounding boundary, has to fit on one sheet, so far less individual construction detail can be shown.',
          calloutAt: [100, 150],
          reveals: [],
        },
      ],
    };
  })();

  // ── 2. Reading a Floor Plan ──
  (function () {
    CONSTRUCTIONS['floor-plan-reading'] = {
      id: 'floor-plan-reading', title: 'Reading a Floor Plan',
      summary: 'Walls, doors and windows are drawn to true thickness in a floor plan — the gap between the double lines of a wall IS the actual wall material.',
      bounds: { w: 190, h: 150 },
      workbookPrompt: 'Given a floor plan with a 110 mm exterior wall dimension and a door swing symbol, state whether the wall is single-brick or double-brick, and which way the door opens.',
      steps: [
        {
          id: 1,
          instruction: 'A simple two-room floor plan. Balloon 1: the double parallel lines forming the outer wall are drawn at the wall\'s TRUE thickness to the plan\'s scale — the gap between the two lines is the actual brickwork, not empty space.',
          calloutAt: [23, 25],
          reveals: [
            { kind: 'polygon', points: [[20, 30], [170, 30], [170, 120], [20, 120]], lineType: 'A' },
            { kind: 'polygon', points: [[26, 36], [164, 36], [164, 114], [26, 114]], lineType: 'A' },
            { kind: 'line', p1: [97, 36], p2: [97, 114], lineType: 'A' }, { kind: 'line', p1: [103, 36], p2: [103, 114], lineType: 'A' },
            { kind: 'line', p1: [20, 30], p2: [26, 36], lineType: 'A' }, { kind: 'line', p1: [170, 30], p2: [164, 36], lineType: 'A' },
            { kind: 'line', p1: [20, 120], p2: [26, 114], lineType: 'A' }, { kind: 'line', p1: [170, 120], p2: [164, 114], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: "110" dimensioned across the wall gap is the wall thickness in mm — 110 mm is a single skin of brick; 230 mm (roughly double) would indicate a full double-brick (cavity or solid) wall.',
          calloutAt: [23, 22],
          reveals: [{ kind: 'dimension', p1: [20, 30], p2: [26, 30], offset: -8, text: '110' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: in the internal wall, a gap with a straight line and a quarter-circle arc is a DOOR symbol — the straight line is the door leaf, and the arc traces its swing path, showing exactly which way and how far it opens.',
          calloutAt: [100, 95],
          reveals: [
            { kind: 'line', p1: [97, 88], p2: [97, 100], lineType: 'B' }, { kind: 'line', p1: [103, 88], p2: [103, 100], lineType: 'B' },
            { kind: 'line', p1: [100, 100], p2: [110, 100], lineType: 'A' },
            { kind: 'arc-construction', center: [100, 100], r: 10, startDeg: -90, endDeg: 0, lineType: 'B' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: the gap in the exterior wall with two thin parallel lines spanning it is a WINDOW symbol — the lines represent the glazing, always drawn at the wall\'s true thickness, never as a simple blank gap.',
          calloutAt: [70, 33],
          reveals: [
            { kind: 'line', p1: [60, 33], p2: [60, 33] },
            { kind: 'line', p1: [55, 36], p2: [85, 36], lineType: 'A' }, { kind: 'line', p1: [55, 30], p2: [85, 30], lineType: 'A' },
            { kind: 'line', p1: [58, 32], p2: [82, 32], lineType: 'B' }, { kind: 'line', p1: [58, 34], p2: [82, 34], lineType: 'B' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5: every enclosed space is labelled by function — "BEDROOM", "BATHROOM" — and on a full working drawing, the room\'s floor area in m² is often added directly beneath its name.',
          calloutAt: [55, 75],
          reveals: [
            { kind: 'label', at: [40, 76], text: 'BEDROOM', size: 4.2, anchor: 'start', color: '#e8eaf2' },
            { kind: 'label', at: [118, 76], text: 'BATHROOM', size: 4.2, anchor: 'start', color: '#e8eaf2' },
          ],
        },
        {
          id: 6,
          instruction: 'Balloon 6: because a floor plan needs to show real construction detail (wall thickness, door swings, fittings), it is drawn at a much LARGER scale than a site plan — typically 1:100 or even 1:50.',
          calloutAt: [95, 135],
          reveals: [],
        },
      ],
    };
  })();

  // ── 3. Reading a Door & Window Schedule ──
  (function () {
    const tblX = 115, tblY = 30, rowH = 12, colW = [16, 22, 24, 14];
    function tblRow(rowIdx, cells, color) {
      return cells.map((t, ci) => {
        const cx = tblX + colW.slice(0, ci).reduce((a, b) => a + b, 0) + colW[ci] / 2;
        return { kind: 'label', at: [cx, tblY + rowIdx * rowH + 8], text: t, size: 3.2, anchor: 'middle', color: color || '#e8eaf2' };
      });
    }
    const tblW = colW.reduce((a, b) => a + b, 0);
    CONSTRUCTIONS['door-window-schedule'] = {
      id: 'door-window-schedule', title: 'Reading a Door & Window Schedule',
      summary: 'Numbered balloons on the plan cross-reference rows in a schedule table — exactly like a parts list on an assembly drawing, but for openings.',
      bounds: { w: 195, h: 135 },
      workbookPrompt: 'Given a wall with two numbered door openings and one numbered window, and a matching schedule table, write out the full door/window schedule (item, type, size, quantity).',
      steps: [
        {
          id: 1,
          instruction: 'A wall segment with a door and a window, each numbered. Balloon 1 (door "D1"): find "D1" again in the schedule table — it reads "Door, 813×2032, QTY 1". This is exactly the same cross-referencing idea as a mechanical parts list.',
          calloutAt: [45, 60],
          reveals: [
            { kind: 'line', p1: [20, 90], p2: [95, 90], lineType: 'A' },
            { kind: 'line', p1: [40, 90], p2: [40, 70], lineType: 'B' }, { kind: 'arc-construction', center: [40, 90], r: 20, startDeg: -90, endDeg: 0, lineType: 'B' },
            { kind: 'line', p1: [tblX, tblY], p2: [tblX + tblW, tblY], lineType: 'A' },
            ...[0, 1, 2, 3].map(i => ({ kind: 'line', p1: [tblX + colW.slice(0, i).reduce((a, b) => a + b, 0), tblY], p2: [tblX + colW.slice(0, i).reduce((a, b) => a + b, 0), tblY + rowH * 3], lineType: 'A' })),
            { kind: 'line', p1: [tblX + tblW, tblY], p2: [tblX + tblW, tblY + rowH * 3], lineType: 'A' },
            ...[0, 1, 2, 3].map(i => ({ kind: 'line', p1: [tblX, tblY + i * rowH], p2: [tblX + tblW, tblY + i * rowH], lineType: 'A' })),
            ...tblRow(0, ['ITEM', 'TYPE', 'SIZE (mm)', 'QTY'], '#94a3b8'),
            ...tblRow(1, ['D1', 'Door', '813 × 2032', '1']),
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2 (window "W1"): row 2 of the schedule reads "Window, 900×1200, QTY 1" — on a real drawing with many repeated openings, the QTY column is what tells the builder exactly how many identical units to order.',
          calloutAt: [75, 20],
          reveals: [
            { kind: 'line', p1: [65, 90], p2: [65, 86], lineType: 'A' }, { kind: 'line', p1: [65, 94], p2: [65, 90], lineType: 'A' },
            { kind: 'line', p1: [60, 88], p2: [80, 88], lineType: 'A' }, { kind: 'line', p1: [60, 92], p2: [80, 92], lineType: 'A' },
            { kind: 'line', p1: [63, 89], p2: [77, 89], lineType: 'B' }, { kind: 'line', p1: [63, 91], p2: [77, 91], lineType: 'B' },
            { kind: 'label', at: [70, 20], text: 'W1', size: 4, anchor: 'middle', color: '#f472b6' },
            ...tblRow(2, ['W1', 'Window', '900 × 1200', '1']),
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: schedules exist because a floor plan alone can only show a symbol\'s LOCATION — the actual size, type and quantity of every door and window on the whole project is collected in one place, so nothing gets ordered wrong.',
          calloutAt: [tblX + tblW / 2, tblY - 6],
          reveals: [],
        },
      ],
    };
  })();

  // ── 4. Reading Electrical Symbols on a Plan ──
  (function () {
    CONSTRUCTIONS['electrical-symbols-plan'] = {
      id: 'electrical-symbols-plan', title: 'Reading Electrical Symbols on a Plan',
      summary: 'A handful of simple symbols represent every light, switch, socket and distribution point on a building — and a thin control line quietly tells you which switch operates which light.',
      bounds: { w: 185, h: 130 },
      workbookPrompt: 'Given a plan with one light point, one switch, one socket outlet and a DB, with a control line linking the switch to the light, describe what each symbol represents and what the control line shows.',
      steps: [
        {
          id: 1,
          instruction: 'A room with four standard electrical symbols. Balloon 1: a small circle with a cross is a CEILING LIGHT POINT — the position where a light fitting is mounted, wired back to the distribution board.',
          calloutAt: [90, 45],
          reveals: [
            { kind: 'polygon', points: [[20, 30], [160, 30], [160, 100], [20, 100]], lineType: 'A' },
            { kind: 'circle', center: [90, 55], r: 5, lineType: 'B' },
            { kind: 'line', p1: [86, 51], p2: [94, 59], lineType: 'B' }, { kind: 'line', p1: [94, 51], p2: [86, 59], lineType: 'B' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: a small square marked "S" on the wall is a ONE-WAY SWITCH. The thin dashed line curving from the switch to the light point is a CONTROL line — it shows which switch operates which light, not a physical wire route.',
          calloutAt: [35, 90],
          reveals: [
            { kind: 'polygon', points: [[32, 88], [40, 88], [40, 94], [32, 94]], lineType: 'B' },
            { kind: 'label', at: [36, 92], text: 'S', size: 3.6, anchor: 'middle', color: '#e8eaf2' },
            { kind: 'arc-construction', center: [63, 71], r: 32, startDeg: 200, endDeg: 300, lineType: 'centre' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: a circle with two short prongs is a SOCKET OUTLET — a wall power point where appliances plug in.',
          calloutAt: [140, 90],
          reveals: [
            { kind: 'circle', center: [140, 88], r: 4, lineType: 'B' },
            { kind: 'line', p1: [138, 84], p2: [138, 80], lineType: 'B' }, { kind: 'line', p1: [142, 84], p2: [142, 80], lineType: 'B' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: a small rectangle marked "DB" is the DISTRIBUTION BOARD — where every circuit in the building originates. On a complete electrical plan, every light and socket traces back to a DB, directly or indirectly.',
          calloutAt: [140, 40],
          reveals: [
            { kind: 'polygon', points: [[132, 35], [148, 35], [148, 45], [132, 45]], lineType: 'A' },
            { kind: 'label', at: [140, 41], text: 'DB', size: 3.6, anchor: 'middle', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 5. Reading Plumbing & Drainage Symbols ──
  (function () {
    CONSTRUCTIONS['plumbing-drainage-symbols'] = {
      id: 'plumbing-drainage-symbols', title: 'Reading Plumbing & Drainage Symbols',
      summary: 'A drainage line always flows downhill — the fall arrow and its ratio tell you exactly how much, and an inspection eye marks where a blockage can be cleared.',
      bounds: { w: 190, h: 130 },
      workbookPrompt: 'Given a drainage line falling from an IE to a gully at a fall of 1:60 over a run of 6 m, calculate the total vertical drop in mm.',
      steps: [
        {
          id: 1,
          instruction: 'A small bathroom layout with its drainage line. Balloon 1: the oval-with-tank schematic is the WC (toilet) symbol.',
          calloutAt: [40, 50],
          reveals: [
            { kind: 'polygon', points: [[20, 30], [170, 30], [170, 100], [20, 100]], lineType: 'A' },
            { kind: 'polygon', points: [[30, 40], [50, 40], [50, 46], [30, 46]], lineType: 'B' },
            { kind: 'circle', center: [40, 56], r: 9, lineType: 'B' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the small oval against the wall is the BASIN symbol — a wash-hand basin, drawn as a simplified plan outline exactly as it would be seen from directly above.',
          calloutAt: [90, 36],
          reveals: [{ kind: 'circle', center: [90, 36], r: 8, lineType: 'B' }],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the line running from the fittings to the outside is the DRAINAGE line, and the arrow on it always points DOWNHILL — the direction waste actually flows, under gravity alone (drains are almost never pumped).',
          calloutAt: [120, 75],
          reveals: [
            { kind: 'line', p1: [40, 65], p2: [150, 90], lineType: 'B' },
            { kind: 'polygon', points: [[150, 90], [143, 87], [145, 93]], lineType: 'B' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: the small circle partway along the drainage line is an IE (Inspection Eye) — an access point where a blocked drain can be rodded and cleared without digging up the whole pipe run.',
          calloutAt: [95, 77],
          reveals: [{ kind: 'circle', center: [95, 77], r: 3, lineType: 'A' }],
        },
        {
          id: 5,
          instruction: 'Balloon 5: "FALL 1:60" means the pipe drops 1 unit vertically for every 60 units it runs horizontally. Over a 6 m (6000 mm) run, that\'s a drop of 6000 ÷ 60 = 100 mm — just enough slope to keep waste flowing, not so much it outruns the flush water.',
          calloutAt: [95, 100],
          reveals: [{ kind: 'label', at: [75, 105], text: 'FALL 1:60', size: 4, anchor: 'start', color: '#fde047' }],
        },
      ],
    };
  })();

  // ── 6. Reading a Building Section — Levels ──
  (function () {
    const groundY = 100, gx0 = 20, gx1 = 170;
    CONSTRUCTIONS['building-section-levels'] = {
      id: 'building-section-levels', title: 'Reading a Building Section — Levels',
      summary: 'Every height on a building section is measured up from ONE fixed datum — usually 0.000 at natural ground level — so any two levels on the drawing can be directly compared.',
      bounds: { w: 190, h: 165 },
      workbookPrompt: 'Given NGL = 0.000, FFL = +0.150 and wall plate level = +2.550, calculate the total wall height from FFL to wall plate.',
      steps: [
        {
          id: 1,
          instruction: 'A simple wall section from ground to roof. Balloon 1: NGL — Natural Ground Level, the site\'s existing ground surface. It is almost always chosen as the fixed 0.000 datum that every other level on the drawing is measured from.',
          calloutAt: [30, groundY + 10],
          reveals: [
            { kind: 'line', p1: [gx0, groundY], p2: [gx1, groundY], lineType: 'B' },
            ...Array.from({ length: 12 }, (_, i) => ({ kind: 'line', p1: [gx0 + i * 13, groundY], p2: [gx0 + i * 13 - 5, groundY + 8], lineType: 'B' })),
            { kind: 'label', at: [gx1 + 3, groundY + 2], text: 'NGL ±0.000', size: 3.6, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: DPC — Damp-Proof Course, a thin waterproof membrane built into the wall just above ground level. It stops rising damp from being drawn up into the brickwork by capillary action.',
          calloutAt: [85, groundY - 4],
          reveals: [
            { kind: 'line', p1: [60, groundY - 8], p2: [120, groundY - 8], lineType: 'A' },
            { kind: 'label', at: [122, groundY - 6], text: 'DPC', size: 3.6, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: FFL — Finished Floor Level, the level of the completed internal floor surface. It sits ABOVE NGL (commonly +150 mm) specifically to keep surface water from ever reaching the internal floor.',
          calloutAt: [85, groundY - 20],
          reveals: [
            { kind: 'line', p1: [60, groundY - 15], p2: [120, groundY - 15], lineType: 'A' },
            { kind: 'label', at: [122, groundY - 13], text: 'FFL +0.150', size: 3.6, anchor: 'start', color: '#fde047' },
            { kind: 'line', p1: [60, groundY - 15], p2: [60, 30], lineType: 'A' }, { kind: 'line', p1: [120, groundY - 15], p2: [120, 30], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: the wall plate is the timber member fixed along the TOP of the wall, which the roof rafters bear directly onto — its level is the standard reference point for "wall height" on any set of building plans.',
          calloutAt: [90, 30],
          reveals: [
            { kind: 'line', p1: [58, 30], p2: [122, 30], lineType: 'A' },
            { kind: 'label', at: [124, 32], text: 'Wall plate +2.550', size: 3.4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5: the roof\'s PITCH ANGLE (here 17.5°) is the slope measured from horizontal. It directly determines which roofing material may be used — concrete tiles need a steeper minimum pitch than corrugated sheeting.',
          calloutAt: [90, 15],
          reveals: [
            { kind: 'line', p1: [58, 30], p2: [90, 12], lineType: 'A' }, { kind: 'line', p1: [122, 30], p2: [90, 12], lineType: 'A' },
            { kind: 'angle-arc', vertex: [58, 30], p1: [122, 30], p2: [90, 12], radius: 12, text: '17.5°' },
          ],
        },
        {
          id: 6,
          instruction: 'Balloon 6: because NGL, DPC, FFL and wall plate are all measured from the SAME datum (0.000), a builder can find the wall height (FFL to wall plate) with simple subtraction: 2.550 − 0.150 = 2.400 m — no separate on-site measurement needed.',
          calloutAt: [90, 60],
          reveals: [],
        },
      ],
    };
  })();

  // ── 7. Reading Roof Plan Conventions ──
  (function () {
    CONSTRUCTIONS['roof-plan-conventions'] = {
      id: 'roof-plan-conventions', title: 'Reading Roof Plan Conventions',
      summary: 'A roof plan is read from directly above — ridge, hip and valley lines, plus small fall arrows, tell a roofer exactly how water is meant to run off every plane.',
      bounds: { w: 195, h: 140 },
      workbookPrompt: 'Given a hip-roof plan with a ridge line, four hip lines and a 500 mm eaves overhang dimension, identify each labelled line and state the overhang\'s purpose.',
      steps: [
        {
          id: 1,
          instruction: 'A simple hip-roof plan, viewed from directly above. Balloon 1: the central horizontal line is the RIDGE — the roof\'s highest line, where the two main opposing roof planes meet at the top.',
          calloutAt: [95, 45],
          reveals: [
            { kind: 'polygon', points: [[20, 30], [170, 30], [170, 100], [20, 100]], lineType: 'hidden' },
            { kind: 'line', p1: [55, 45], p2: [135, 45], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: the diagonal lines running from each corner of the building to the ends of the ridge are HIP lines — the sloping line formed where two roof planes meet at an EXTERNAL corner (as opposed to a valley, which is an internal corner).',
          calloutAt: [35, 40],
          reveals: [
            { kind: 'line', p1: [20, 30], p2: [55, 45], lineType: 'A' }, { kind: 'line', p1: [20, 100], p2: [55, 45], lineType: 'A' },
            { kind: 'line', p1: [170, 30], p2: [135, 45], lineType: 'A' }, { kind: 'line', p1: [170, 100], p2: [135, 45], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Balloon 3: the small arrows on each roof plane are FALL/DRAINAGE arrows — they always point AWAY from the ridge, down toward the eaves and gutter, showing which way rainwater runs off that particular plane.',
          calloutAt: [40, 65],
          reveals: [
            { kind: 'line', p1: [40, 55], p2: [30, 70], lineType: 'B' }, { kind: 'polygon', points: [[30, 70], [34, 65], [36, 71]], lineType: 'B' },
            { kind: 'line', p1: [95, 55], p2: [95, 90], lineType: 'B' }, { kind: 'polygon', points: [[95, 90], [92, 84], [98, 84]], lineType: 'B' },
          ],
        },
        {
          id: 4,
          instruction: 'Balloon 4: the dashed outline beyond the solid wall line is the EAVES OVERHANG, dimensioned here at 500 mm — the roof projects past the wall face specifically to shed rainwater clear of the wall and any windows below.',
          calloutAt: [95, 110],
          reveals: [{ kind: 'dimension', p1: [20, 105], p2: [15, 105], offset: 0, text: '500' }],
        },
        {
          id: 5,
          instruction: 'Balloon 5: this is a HIP roof (sloped on all four sides, meeting at hip lines and a short ridge). A GABLE roof instead has a vertical wall — a gable end — rising straight up to the ridge at each end, with no hip lines at all.',
          calloutAt: [95, 125],
          reveals: [],
        },
      ],
    };
  })();

  // ── 8. Reading Levels, Abbreviations & a Combined Drawing Set ──
  (function () {
    CONSTRUCTIONS['levels-abbreviations-capstone'] = {
      id: 'levels-abbreviations-capstone', title: 'Reading Levels, Abbreviations & a Combined Drawing Set',
      summary: 'A short glossary of the abbreviations used across every civil drawing in this chapter, plus one worked drainage-run example tying site plan, section and drainage reading together.',
      bounds: { w: 195, h: 165 },
      workbookPrompt: 'Given IL (invert level) = 98.250 at a manhole and a 1:80 fall over a 24 m pipe run to the next manhole, calculate the invert level at the far end.',
      steps: [
        {
          id: 1,
          instruction: 'A glossary of common civil-drawing abbreviations, plus a small worked drainage run below. Balloon 1: NGL = Natural Ground Level — the site\'s existing ground surface, almost always the drawing\'s fixed datum.',
          calloutAt: [30, 34],
          reveals: [
            { kind: 'label', at: [20, 34], text: 'NGL — Natural Ground Level', size: 3.8, anchor: 'start', color: '#e8eaf2' },
            { kind: 'label', at: [20, 44], text: 'FFL — Finished Floor Level', size: 3.8, anchor: 'start', color: '#e8eaf2' },
            { kind: 'label', at: [20, 54], text: 'SSL — Structural Slab Level', size: 3.8, anchor: 'start', color: '#e8eaf2' },
            { kind: 'label', at: [20, 64], text: 'DPC — Damp-Proof Course', size: 3.8, anchor: 'start', color: '#e8eaf2' },
            { kind: 'label', at: [20, 74], text: 'IL — Invert Level (pipe)', size: 3.8, anchor: 'start', color: '#e8eaf2' },
            { kind: 'label', at: [20, 84], text: 'BL — Building Line', size: 3.8, anchor: 'start', color: '#e8eaf2' },
          ],
        },
        {
          id: 2,
          instruction: 'Balloon 2: FFL = Finished Floor Level — always ABOVE NGL, exactly as seen in the building-section chapter earlier.',
          calloutAt: [30, 44],
          reveals: [],
        },
        {
          id: 3,
          instruction: 'Balloon 3: SSL = Structural Slab Level — the level of the TOP of the structural concrete slab itself, before floor finishes (tiles, screed) are added — usually slightly below FFL.',
          calloutAt: [30, 54],
          reveals: [],
        },
        {
          id: 4,
          instruction: 'Balloon 4: IL = Invert Level — the level of the LOWEST INTERNAL point of a drain pipe (its inside bottom surface) at a given manhole. Below: manhole 1 has IL 98.250; the pipe falls at 1:80 over a 24 m run.',
          calloutAt: [130, 110],
          reveals: [
            { kind: 'circle', center: [50, 130], r: 8, lineType: 'A' }, { kind: 'circle', center: [170, 150], r: 8, lineType: 'A' },
            { kind: 'line', p1: [58, 132], p2: [162, 148], lineType: 'B' },
            { kind: 'polygon', points: [[162, 148], [155, 146], [157, 152]], lineType: 'B' },
            { kind: 'label', at: [30, 122], text: 'MH1  IL 98.250', size: 3.6, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [140, 162], text: 'MH2  IL = ?', size: 3.6, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [90, 135], text: 'FALL 1:80, 24 m RUN', size: 3.4, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 5,
          instruction: 'Balloon 5: drop = run ÷ fall ratio = 24 000 mm ÷ 80 = 300 mm = 0.300 m. So MH2\'s invert level = 98.250 − 0.300 = 97.950 — the SAME "drop = run ÷ fall" calculation used for the bathroom drainage line earlier in this chapter.',
          calloutAt: [110, 145],
          reveals: [],
        },
        {
          id: 6,
          instruction: 'Balloon 6: a real building project is never just one drawing — a site plan, floor plan, schedules, sections and a drainage layout are all issued TOGETHER as one drawing set, each showing the same building from a different angle of information.',
          calloutAt: [100, 20],
          reveals: [],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'On a site plan, what is the difference between the erf (property) boundary and the building line?',
      options: [
        'The boundary is the legal property limit; the building line is a setback INSIDE it — the structure must be built inside the building line, not just inside the boundary',
        'They are two names for exactly the same line',
        'The building line is always further out than the boundary',
        'The building line only applies to swimming pools'],
      answer: 0,
      explanation: 'The boundary is the legal extent of the erf. The building line is a municipally-set minimum setback distance inside that boundary — the actual structure may never cross it.',
    },
    {
      text: 'A site plan is drawn at 1:200 and a boundary line measures 40 mm on the page. What is its real length?',
      options: ['8000 mm (8 m)', '40 mm', '200 mm', '800 mm'],
      answer: 0,
      explanation: '40 mm × 200 = 8000 mm = 8 m — every measured length on the page is multiplied by the scale factor to get the real-world size.',
    },
    {
      text: 'On a floor plan, why are walls drawn as two parallel lines rather than one single line?',
      options: [
        'The gap between the two lines represents the wall\'s true thickness (the actual brickwork), drawn to scale',
        'It is purely decorative and has no technical meaning',
        'It shows that the wall is temporary and will be removed',
        'Two lines always mean the wall is load-bearing'],
      answer: 0,
      explanation: 'A wall\'s true thickness is drawn to scale as the gap between its two boundary lines — a single line would lose that dimensional information entirely.',
    },
    {
      text: 'What does the quarter-circle arc on a door symbol represent?',
      options: [
        'The door\'s swing path — showing which way and how far it opens',
        'The door\'s exact colour',
        'A structural beam above the doorway',
        'The door is glazed (has glass panels)'],
      answer: 0,
      explanation: 'The arc traces the path the door leaf sweeps through as it opens — essential for planning furniture clearance and safe evacuation routes.',
    },
    {
      text: 'On a drainage plan, which direction does the fall (slope) arrow always point?',
      options: ['Downhill — the direction waste water actually flows under gravity', 'Uphill, toward the manhole', 'Toward North, regardless of the pipe layout', 'Fall arrows are only used on roof plans, never drainage'],
      answer: 0,
      explanation: 'Drains rely on gravity, so the fall arrow always points downhill, in the actual direction of flow — from the fixture toward the sewer connection.',
    },
    {
      text: 'What does DPC stand for, and what is its purpose in a wall section?',
      options: [
        'Damp-Proof Course — a waterproof layer built into the wall just above ground level, to stop rising damp',
        'Distribution Panel Connector — an electrical fitting',
        'Drainage Pipe Clamp — used to secure underground pipework',
        'Door Panel Centre — a dimensioning reference point'],
      answer: 0,
      explanation: 'DPC is a waterproof membrane built into a wall near ground level, stopping moisture from being drawn up into the brickwork by capillary action.',
    },
    {
      text: 'On a hip-roof plan, what is the difference between a hip line and a valley line?',
      options: [
        'A hip line forms where two roof planes meet at an EXTERNAL corner; a valley forms where they meet at an INTERNAL corner',
        'They are the same thing, just different regional names',
        'A hip line is always horizontal; a valley is always vertical',
        'Valley lines only appear on flat roofs'],
      answer: 0,
      explanation: 'Hips project outward (external corners, like a roof\'s corner pointing away from the building); valleys fold inward (internal corners, like where an L-shaped roof meets itself), and both carry water very differently.',
    },
    {
      text: 'A drain falls at 1:80 over a 16 m run. What is the total vertical drop?',
      options: ['200 mm', '80 mm', '1600 mm', '16 mm'],
      answer: 0,
      explanation: 'Drop = run ÷ fall ratio = 16 000 mm ÷ 80 = 200 mm — the same calculation method used for the manhole invert-level example in this chapter.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'site-plan-reading', 'floor-plan-reading', 'door-window-schedule', 'electrical-symbols-plan',
    'plumbing-drainage-symbols', 'building-section-levels', 'roof-plan-conventions', 'levels-abbreviations-capstone',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
