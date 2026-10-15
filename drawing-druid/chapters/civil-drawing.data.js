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

  // Sizes follow the conventions in the school's papers: a load-bearing wall is 222 mm brick (one
  // brick length, the SANS minimum), drawn 250 mm thick when plastered on both sides;
  // 110 mm internal walls, 600 x 250 footings (400 x 250 under 110 walls), 100 mm surface bed,
  // DPC at floor level, 900 x 2000 doors in 50 mm frames.
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3.4, anchor: 'start', color: '#e8eaf2' }, opts || {});
  const leader = (from, to) => ({ kind: 'line', p1: from, p2: to, lineType: 'B' });

  // 45° hatching of an axis-aligned rectangle given by its corners.
  function hatchBox(x0, y0, x1, y1, sp) { return hatchRect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0), sp); }

  // Concrete in section: scattered small triangles and dots (aggregate), deterministic.
  function concrete(x0, y0, x1, y1, density) {
    const out = [];
    let seed = Math.round(x0 * 7 + y0 * 13 + x1 * 3);
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const n = Math.max(3, Math.round((x1 - x0) * (y1 - y0) * (density || 0.12)));
    for (let i = 0; i < n; i++) {
      const x = x0 + 0.8 + rnd() * (x1 - x0 - 1.6), y = y0 + 0.8 + rnd() * (y1 - y0 - 1.6);
      if (i % 2) out.push({ kind: 'polygon', points: [[x, y - 0.6], [x + 0.6, y + 0.45], [x - 0.6, y + 0.45]], lineType: 'C' });
      else out.push({ kind: 'circle', center: [x, y], r: 0.22, lineType: 'C' });
    }
    return out;
  }

  // Natural ground in section: short sloping strokes under the ground line.
  function earth(x0, x1, y) {
    const out = [];
    for (let x = x0 + 1; x < x1 - 2; x += 4) out.push({ kind: 'line', p1: [x, y + 1], p2: [x + 2, y + 3], lineType: 'C' }, { kind: 'line', p1: [x + 1.2, y + 1], p2: [x + 3.2, y + 3], lineType: 'C' });
    return out;
  }

  // Hardcore fill: small freehand stones.
  function hardcore(x0, y0, x1, y1) {
    const out = [];
    for (let x = x0 + 1.5; x < x1 - 1; x += 3.2) for (let y = y0 + 1.2; y < y1 - 0.6; y += 2.4) {
      const dx = ((x * 7 + y * 3) % 1.2) - 0.6;
      out.push({ kind: 'polygon', points: [[x + dx, y], [x + 1.1 + dx, y - 0.5], [x + 1.6 + dx, y + 0.5], [x + 0.5 + dx, y + 0.9]], lineType: 'C' });
    }
    return out;
  }

  // ── 1. Floor plan of one room, scale 1:50 ──
  (function () {
    const S = 50;                                  // 1:50 → 1 unit = 50 mm
    const t = 250 / S;                             // 5 units
    const X0 = 30, Y0 = 30, W = 3500 / S, H = 3100 / S;      // outside of the walls
    const xi0 = X0 + t, yi0 = Y0 + t, xi1 = X0 + W - t, yi1 = Y0 + H - t;
    const door = { x0: X0 + 700 / S, w: 900 / S, frame: 50 / S };   // in the bottom wall
    const win = { y0: Y0 + 900 / S, h: 1200 / S };                  // in the right wall
    const d1 = door.x0 + door.w, w1 = win.y0 + win.h;
    const xo1 = X0 + W, yo1 = Y0 + H;
    const walls = [
      [X0, Y0, xo1, yi0], [X0, yi0, xi0, yo1], [xi0, yi1, door.x0, yo1], [d1, yi1, xi1, yo1],
      [xi1, yi0, xo1, win.y0], [xi1, w1, xo1, yo1],
    ];
    const leaf = door.w - 2 * door.frame;
    const hinge = [door.x0 + door.frame, yi1];

    CONSTRUCTIONS['floor-plan'] = {
      id: 'floor-plan', title: 'Floor Plan: One Room (1:50)', scale: '1:50',
      summary: 'A room in 250 mm load-bearing walls at 1:50: walls hatched in section, a 900 mm door in its frame with its swing, a window with its sill, room name and floor finish, dimensions in millimetres.',
      bounds: { w: 150, h: 120 },
      workbookPrompt: 'Draw the floor plan of the bedroom to a scale of 1:50. External walls are 222 mm brick (the SANS minimum for a load-bearing wall), 250 mm thick with plaster on both sides. Show the 900 mm door (50 mm frame) with its swing, the 1200 mm window with its sill, wall hatching, the room name and floor finish, overall dimensions, the north point and the scale.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the outside and inside faces of the walls: 3500 x 3100 outside. A load-bearing wall is 222 mm brick (one brick length, the SANS minimum); with plaster on both sides it is drawn 250 mm thick (5 mm at 1:50). Leave the door and window openings open.',
          calloutAt: [X0 + W / 2, Y0 + t / 2],
          reveals: [
            { kind: 'polyline', points: [[door.x0, yo1], [X0, yo1], [X0, Y0], [xo1, Y0], [xo1, win.y0]], lineType: 'A' },
            { kind: 'polyline', points: [[xo1, w1], [xo1, yo1], [d1, yo1]], lineType: 'A' },
            { kind: 'polyline', points: [[door.x0, yi1], [xi0, yi1], [xi0, yi0], [xi1, yi0], [xi1, win.y0]], lineType: 'A' },
            { kind: 'polyline', points: [[xi1, w1], [xi1, yi1], [d1, yi1]], lineType: 'A' },
            ...[[door.x0, yi1, door.x0, yo1], [d1, yi1, d1, yo1], [xi1, win.y0, xo1, win.y0], [xi1, w1, xo1, w1]].map(([a, b, c, d]) => ({ kind: 'line', p1: [a, b], p2: [c, d], lineType: 'A' })),
          ],
        },
        {
          id: 2,
          instruction: 'Hatch the walls: they are cut by the horizontal section plane of the plan, so they get 45° section lines (Type B).',
          calloutAt: [X0 + t / 2, Y0 + H / 2],
          reveals: walls.flatMap(([a, b, c, d]) => hatchBox(a, b, c, d, 1.6)),
        },
        {
          id: 3,
          instruction: 'Door: draw the 50 mm frame on both jambs, the door leaf open at 90° against the wall, and its swing as a thin quarter circle.',
          calloutAt: [hinge[0] + leaf / 2, yi1 - leaf / 2],
          reveals: [
            { kind: 'polygon', points: [[door.x0, yi1], [door.x0 + door.frame, yi1], [door.x0 + door.frame, yo1], [door.x0, yo1]], lineType: 'A' },
            { kind: 'polygon', points: [[d1 - door.frame, yi1], [d1, yi1], [d1, yo1], [d1 - door.frame, yo1]], lineType: 'A' },
            { kind: 'polygon', points: [[hinge[0], yi1], [hinge[0] + 0.8, yi1], [hinge[0] + 0.8, yi1 - leaf], [hinge[0], yi1 - leaf]], lineType: 'A' },
            { kind: 'arc-construction', center: hinge, r: leaf, startDeg: 270, endDeg: 360, lineType: 'C' },
          ],
        },
        {
          id: 4,
          instruction: 'Window: two lines for the frame and glass in the middle of the wall, the wall-face lines across the opening, and the sill projecting outside.',
          calloutAt: [xo1, win.y0 + win.h / 2],
          reveals: [
            { kind: 'line', p1: [xi1 + t / 2 - 0.5, win.y0], p2: [xi1 + t / 2 - 0.5, w1], lineType: 'A' },
            { kind: 'line', p1: [xi1 + t / 2 + 0.5, win.y0], p2: [xi1 + t / 2 + 0.5, w1], lineType: 'A' },
            { kind: 'line', p1: [xi1, win.y0], p2: [xi1, w1], lineType: 'B' },
            { kind: 'polyline', points: [[xo1, win.y0 - 1], [xo1 + 1.2, win.y0 - 1], [xo1 + 1.2, w1 + 1], [xo1, w1 + 1]], lineType: 'B' },
          ],
        },
        {
          id: 5,
          instruction: 'Label the room and its floor finish in both languages, dimension the outside sizes in millimetres, and add the north point, the title and the scale.',
          calloutAt: [X0 + W / 2, Y0 + H / 2],
          reveals: [
            lbl([X0 + W / 2, Y0 + H / 2 - 2], 'BEDROOM / SLAAPKAMER', { anchor: 'middle', size: 3.6 }),
            lbl([X0 + W / 2, Y0 + H / 2 + 3], 'CARPET / MAT', { anchor: 'middle', size: 2.8, color: '#94a3b8' }),
            { kind: 'dimension', p1: [X0, Y0], p2: [xo1, Y0], offset: -10, text: '3500' },
            { kind: 'dimension', p1: [X0, yo1], p2: [X0, Y0], offset: -10, text: '3100' },
            { kind: 'circle', center: [xo1 + 22, Y0 + 8], r: 6, lineType: 'B' },
            { kind: 'polygon', points: [[xo1 + 22, Y0 + 1], [xo1 + 24.2, Y0 + 10], [xo1 + 22, Y0 + 8.5], [xo1 + 19.8, Y0 + 10]], lineType: 'A' },
            lbl([xo1 + 22, Y0 - 1.5], 'N', { anchor: 'middle', size: 3.6 }),
            lbl([X0 + W / 2, yo1 + 12], 'FLOOR PLAN / VLOERPLAN', { anchor: 'middle', size: 3.8, color: '#fde047' }),
            lbl([X0 + W / 2, yo1 + 17], 'SCALE / SKAAL 1:50', { anchor: 'middle', size: 3, color: '#94a3b8' }),
          ],
        },
      ],
    };
  })();

  // Shared foundation section, scale 1:25 (1 unit = 25 mm).
  function foundationSection(id, title, wallMm, footingMm, insideBothSides) {
    const S = 25;
    const wt = wallMm / S, fw = footingMm / S, fd = 250 / S;
    const CX = 70;
    const yFootBot = 140, yFootTop = yFootBot - fd;
    const yNGL = yFootTop - 300 / S;            // footing top 300 below natural ground
    const yFFL = yNGL - 200 / S;                // floor 200 above natural ground
    const slab = 100 / S;
    const yTop = yFFL - 700 / S;                // wall shown up to a break line
    const wx0 = CX - wt / 2, wx1 = CX + wt / 2;
    const fx0 = CX - fw / 2, fx1 = CX + fw / 2;
    const left = insideBothSides ? wx0 - 34 : wx0 - 34, right = wx1 + 34;
    const inside = insideBothSides ? [[left, wx0], [wx1, right]] : [[wx1, right]];
    const reveals1 = [
      { kind: 'polygon', points: [[fx0, yFootTop], [fx1, yFootTop], [fx1, yFootBot], [fx0, yFootBot]], lineType: 'A' },
      ...concrete(fx0, yFootTop, fx1, yFootBot),
    ];
    const reveals2 = [
      { kind: 'line', p1: [wx0, yFootTop], p2: [wx0, yTop], lineType: 'A' },
      { kind: 'line', p1: [wx1, yFootTop], p2: [wx1, yTop], lineType: 'A' },
      { kind: 'polyline', points: [[wx0 - 1, yTop + 1], [CX - 1, yTop + 1], [CX + 0.6, yTop - 1.5], [CX + 0.2, yTop + 2.5], [wx1 + 1, yTop]], lineType: 'B' },
      ...hatchBox(wx0, yTop + 2.5, wx1, yFootTop, 1.6),
    ];
    const reveals3 = [];
    if (!insideBothSides) {
      reveals3.push({ kind: 'line', p1: [left, yNGL], p2: [wx0, yNGL], lineType: 'A' }, ...earth(left, wx0, yNGL));
    }
    inside.forEach(([a, b]) => {
      reveals3.push(
        { kind: 'polygon', points: [[a, yFFL], [b, yFFL], [b, yFFL + slab], [a, yFFL + slab]], lineType: 'A' },
        ...concrete(a, yFFL, b, yFFL + slab, 0.25),
        ...hardcore(a, yFFL + slab, b, yNGL),
        { kind: 'line', p1: [a, yNGL], p2: [b, yNGL], lineType: 'B' }, ...earth(a, b, yNGL)
      );
    });
    const labX = right + 4;
    const reveals4 = [
      { kind: 'polygon', points: [[wx0, yFFL - 0.5], [wx1, yFFL - 0.5], [wx1, yFFL + 0.5], [wx0, yFFL + 0.5]], lineType: 'A' },
      leader([wx1, yFFL], [labX - 1, yFFL - 8]), lbl([labX, yFFL - 8], 'DPC / VWL'),
      leader([right - 4, yFFL], [labX - 1, yFFL - 1]), lbl([labX, yFFL - 1], 'FFL / VVV'),
      leader([right - 8, yFFL + slab / 2], [labX - 1, yFFL + 4]), lbl([labX, yFFL + 4], '100 SURFACE BED / BETONVLOER'),
      leader([right - 10, yNGL - 1.5], [labX - 1, yNGL]), lbl([labX, yNGL], 'HARDCORE FILL / PUINVULLING'),
      leader([fx1, yFootBot - fd / 2], [labX - 1, yFootBot - 2]), lbl([labX, yFootBot - 2], 'FOOTING / FONDAMENT'),
      lbl([labX, yNGL + 6], insideBothSides ? 'NGL / NGV (under the floor)' : 'NGL / NGV'),
      { kind: 'dimension', p1: [fx0, yFootBot], p2: [fx1, yFootBot], offset: 8, text: String(footingMm) },
      { kind: 'dimension', p1: [fx0, yFootBot], p2: [fx0, yFootTop], offset: insideBothSides ? 8 : 18, text: '250' },
      { kind: 'dimension', p1: [wx0, yTop + 6], p2: [wx1, yTop + 6], offset: -6, text: String(wallMm) },
    ];
    if (!insideBothSides) reveals4.push(leader([left + 6, yNGL], [left - 2, yNGL - 6]), lbl([left - 3, yNGL - 7], 'NGL / NGV', { anchor: 'end' }));
    return {
      id, title, scale: '1:25',
      summary: 'A sectional elevation through a wall foundation at 1:25: concrete footing, brick foundation wall, natural ground level, hardcore fill, the 100 mm surface bed, and the damp-proof course at floor level.',
      bounds: { w: 190, h: 150 },
      workbookPrompt: 'Draw the sectional elevation through the foundation of a ' + wallMm + ' mm ' + (insideBothSides ? 'internal (non-load-bearing)' : 'external (load-bearing)') + ' wall to a scale of 1:25. Footing ' + footingMm + ' x 250. Show all hatching and label the DPC, FFL and NGL.',
      steps: [
        { id: 1, instruction: 'Draw the concrete footing, ' + footingMm + ' wide and 250 deep (' + fw + ' x ' + fd + ' mm at 1:25), centred under the wall. Concrete in section is shown with small stones (triangles and dots).', calloutAt: [CX, yFootBot - fd / 2], reveals: reveals1 },
        { id: 2, instruction: 'Draw the ' + wallMm + ' mm wall standing on the middle of the footing, up to a break line' + (wallMm === 250 ? ' (222 mm brick, the SANS minimum for a load-bearing wall, plus plaster)' : ' (a half-brick wall: 106 mm brick plus plaster)') + '. Brick in section is hatched at 45°.', calloutAt: [CX, (yTop + yFootTop) / 2], reveals: reveals2 },
        { id: 3, instruction: insideBothSides
            ? 'This wall is inside the house, so there is floor on BOTH sides: the 100 mm concrete surface bed on compacted hardcore fill, with natural ground below.'
            : 'Outside, draw the natural ground level (NGL) with the earth symbol. Inside, the 100 mm concrete surface bed sits on compacted hardcore fill; its top is the finished floor level (FFL), 200 above NGL.',
          calloutAt: [right - 12, yFFL + slab], reveals: reveals3 },
        { id: 4, instruction: 'Draw the damp-proof course (DPC) across the wall at floor level, so moisture cannot rise into the wall above. Label everything in both languages and dimension the footing and the wall.', calloutAt: [CX, yFFL], reveals: reveals4 },
      ],
    };
  }

  CONSTRUCTIONS['foundation-section'] = foundationSection('foundation-section', 'Foundation: Load-Bearing Wall (1:25)', 250, 600, false);
  CONSTRUCTIONS['foundation-section-110'] = foundationSection('foundation-section-110', 'Foundation: 110 mm Internal Wall (1:25)', 110, 400, true);

  // ── Sanitary fixtures at 1:25 ──
  (function () {
    const S = 25;
    const u = mm => mm / S;
    const BATH = { x: 10, y: 20, w: u(1950), h: u(750) };
    const WC = { x: 100, y: 20, w: u(500), h: u(850) };
    const WB = { x: 130, y: 20, w: u(600), h: u(450) };
    const SINK = { x: 10, y: 70, w: u(1200), h: u(400) };
    const name = (b, t, en, af) => [
      lbl([b.x + b.w / 2, b.y + b.h + 6], t, { anchor: 'middle', size: 3.6, color: '#fde047' }),
      lbl([b.x + b.w / 2, b.y + b.h + 10.5], en + ' / ' + af, { anchor: 'middle', size: 2.8, color: '#94a3b8' }),
    ];
    CONSTRUCTIONS['bathroom-fixtures'] = {
      id: 'bathroom-fixtures', title: 'Sanitary Fixtures (1:25)', scale: '1:25',
      summary: 'The plan symbols for a bath, water closet, wash basin and kitchen sink, drawn to their standard sizes at 1:25 and labelled with their abbreviations.',
      bounds: { w: 170, h: 110 },
      workbookPrompt: 'Draw the plan symbols of the bath (1950 x 750), water closet (850 x 500), wash basin (600 x 450) and single kitchen sink (1200 x 400) to a scale of 1:25. Label each with its abbreviation.',
      steps: [
        {
          id: 1, instruction: 'BATH (B), 1950 x 750: the outside rectangle, the inside of the tub with rounded corners, and the waste outlet at the tap end.',
          calloutAt: [BATH.x + BATH.w / 2, BATH.y + BATH.h / 2],
          reveals: [
            { kind: 'polygon', points: [[BATH.x, BATH.y], [BATH.x + BATH.w, BATH.y], [BATH.x + BATH.w, BATH.y + BATH.h], [BATH.x, BATH.y + BATH.h]], lineType: 'A' },
            { kind: 'polygon', points: [[BATH.x + 3, BATH.y + 2.5], [BATH.x + BATH.w - 2, BATH.y + 2.5], [BATH.x + BATH.w - 2, BATH.y + BATH.h - 2.5], [BATH.x + 3, BATH.y + BATH.h - 2.5]], lineType: 'B' },
            { kind: 'circle', center: [BATH.x + 6, BATH.y + BATH.h / 2], r: 1.2, lineType: 'B' },
            ...name(BATH, 'B', 'BATH', 'BAD'),
          ],
        },
        {
          id: 2, instruction: 'WATER CLOSET (WC), 850 long x 500 wide: the cistern against the wall (250 deep) and the oval bowl in front of it.',
          calloutAt: [WC.x + WC.w / 2, WC.y + WC.h * 0.6],
          reveals: [
            { kind: 'polygon', points: [[WC.x, WC.y], [WC.x + WC.w, WC.y], [WC.x + WC.w, WC.y + u(250)], [WC.x, WC.y + u(250)]], lineType: 'A' },
            { kind: 'polyline', points: Array.from({ length: 33 }, (_, i) => { const a = Math.PI * i / 32; return [WC.x + WC.w / 2 + (WC.w / 2 - 1) * Math.cos(a), WC.y + u(250) + 2 + (WC.h - u(250) - 2) * Math.sin(a)]; }).concat([[WC.x + 1, WC.y + u(250) + 2]]), lineType: 'A' },
            ...name(WC, 'WC', 'WATER CLOSET', 'SPOELKLOSET'),
          ],
        },
        {
          id: 3, instruction: 'WASH BASIN (WB), 600 x 450: the outline against the wall, the bowl and the tap hole.',
          calloutAt: [WB.x + WB.w / 2, WB.y + WB.h / 2],
          reveals: [
            { kind: 'polygon', points: [[WB.x, WB.y], [WB.x + WB.w, WB.y], [WB.x + WB.w, WB.y + WB.h], [WB.x, WB.y + WB.h]], lineType: 'A' },
            { kind: 'polyline', points: Array.from({ length: 33 }, (_, i) => { const a = 2 * Math.PI * i / 32; return [WB.x + WB.w / 2 + (WB.w / 2 - 2.5) * Math.cos(a), WB.y + WB.h / 2 + 1.2 + (WB.h / 2 - 3.5) * Math.sin(a)]; }), lineType: 'B' },
            { kind: 'circle', center: [WB.x + WB.w / 2, WB.y + 2], r: 0.7, lineType: 'B' },
            ...name(WB, 'WB', 'WASH BASIN', 'WASBAK'),
          ],
        },
        {
          id: 4, instruction: 'SINGLE KITCHEN SINK (S), 1200 x 400 in the worktop: the bowl at one end and the drainer with its grooves.',
          calloutAt: [SINK.x + SINK.w / 2, SINK.y + SINK.h / 2],
          reveals: [
            { kind: 'polygon', points: [[SINK.x, SINK.y], [SINK.x + SINK.w, SINK.y], [SINK.x + SINK.w, SINK.y + SINK.h], [SINK.x, SINK.y + SINK.h]], lineType: 'A' },
            { kind: 'polygon', points: [[SINK.x + 2, SINK.y + 2], [SINK.x + u(350) + 2, SINK.y + 2], [SINK.x + u(350) + 2, SINK.y + SINK.h - 2], [SINK.x + 2, SINK.y + SINK.h - 2]], lineType: 'B' },
            { kind: 'circle', center: [SINK.x + u(175) + 2, SINK.y + SINK.h / 2], r: 1, lineType: 'B' },
            ...Array.from({ length: 6 }, (_, i) => ({ kind: 'line', p1: [SINK.x + u(350) + 7 + i * 4.5, SINK.y + 3], p2: [SINK.x + u(350) + 7 + i * 4.5, SINK.y + SINK.h - 3], lineType: 'C' })),
            ...name(SINK, 'S', 'SINK', 'OPWASBAK'),
            lbl([120, 88], 'SCALE / SKAAL 1:25', { size: 3, color: '#94a3b8' }),
          ],
        },
      ],
    };
  })();

  // ── Electrical symbols ──
  (function () {
    const rows = [
      { en: 'ONE-WAY SWITCH (SINGLE POLE)', af: 'EENRIGTINGSKAKELAAR (ENKELPOOL)', draw: (x, y) => [{ kind: 'circle', center: [x, y], r: 1.4, lineType: 'A' }, { kind: 'line', p1: [x + 1, y - 1], p2: [x + 5, y - 5], lineType: 'A' }, { kind: 'line', p1: [x + 5, y - 5], p2: [x + 6.6, y - 3.4], lineType: 'A' }] },
      { en: 'ONE-WAY SWITCH (DOUBLE POLE)', af: 'EENRIGTINGSKAKELAAR (DUBBELPOOL)', draw: (x, y) => [{ kind: 'circle', center: [x, y], r: 1.4, lineType: 'A' }, { kind: 'line', p1: [x + 1, y - 1], p2: [x + 5, y - 5], lineType: 'A' }, { kind: 'line', p1: [x + 5, y - 5], p2: [x + 6.6, y - 3.4], lineType: 'A' }, { kind: 'line', p1: [x + 3.6, y - 3.6], p2: [x + 5.2, y - 2], lineType: 'A' }] },
      { en: 'REGULATING SWITCH (DIMMER)', af: 'REGULEERSKAKELAAR (DOWWER)', draw: (x, y) => [{ kind: 'circle', center: [x, y], r: 1.4, lineType: 'A' }, { kind: 'line', p1: [x + 1, y - 1], p2: [x + 5, y - 5], lineType: 'A' }, { kind: 'line', p1: [x + 5, y - 5], p2: [x + 6.6, y - 3.4], lineType: 'A' }, { kind: 'line', p1: [x - 2.5, y + 3], p2: [x + 3, y - 2.5], lineType: 'B' }, { kind: 'polyline', points: [[x + 1.6, y - 2.6], [x + 3, y - 2.5], [x + 2.9, y - 1.1]], lineType: 'B' }] },
      { en: 'SOCKET OUTLET', af: 'KRAGPUNT', draw: (x, y) => [{ kind: 'arc-construction', center: [x, y + 1], r: 2.6, startDeg: 180, endDeg: 360, lineType: 'A' }, { kind: 'line', p1: [x - 2.6, y + 1], p2: [x + 2.6, y + 1], lineType: 'A' }, { kind: 'line', p1: [x, y - 1.6], p2: [x, y - 4], lineType: 'A' }] },
      { en: 'SWITCHED SOCKET OUTLET', af: 'SKAKELAARKRAGPUNT', draw: (x, y) => [{ kind: 'arc-construction', center: [x, y + 1], r: 2.6, startDeg: 180, endDeg: 360, lineType: 'A' }, { kind: 'line', p1: [x - 2.6, y + 1], p2: [x + 2.6, y + 1], lineType: 'A' }, { kind: 'line', p1: [x, y - 1.6], p2: [x + 3, y - 4.6], lineType: 'A' }, { kind: 'line', p1: [x + 3, y - 4.6], p2: [x + 4.4, y - 3.2], lineType: 'A' }] },
      { en: 'CEILING LIGHT', af: 'PLAFONLIG', draw: (x, y) => [{ kind: 'line', p1: [x - 2.5, y - 2.5], p2: [x + 2.5, y + 2.5], lineType: 'A' }, { kind: 'line', p1: [x - 2.5, y + 2.5], p2: [x + 2.5, y - 2.5], lineType: 'A' }] },
      { en: 'WALL-MOUNTED LIGHT', af: 'MUURLIG', draw: (x, y) => [{ kind: 'line', p1: [x - 2.5, y - 2.5], p2: [x + 2.5, y + 2.5], lineType: 'A' }, { kind: 'line', p1: [x - 2.5, y + 2.5], p2: [x + 2.5, y - 2.5], lineType: 'A' }, { kind: 'line', p1: [x - 3.5, y + 3.5], p2: [x + 3.5, y + 3.5], lineType: 'A' }] },
      { en: 'FLUORESCENT LIGHT (2 x 40 W)', af: 'FLUORESSERENDE LIG (2 x 40 W)', draw: (x, y) => [{ kind: 'line', p1: [x - 6, y - 0.8], p2: [x + 6, y - 0.8], lineType: 'A' }, { kind: 'line', p1: [x - 6, y + 0.8], p2: [x + 6, y + 0.8], lineType: 'A' }, { kind: 'line', p1: [x - 6, y - 2], p2: [x - 6, y + 2], lineType: 'A' }, { kind: 'line', p1: [x + 6, y - 2], p2: [x + 6, y + 2], lineType: 'A' }] },
      { en: 'DISTRIBUTION BOARD', af: 'VERDEELBORD', draw: (x, y) => [{ kind: 'polygon', points: [[x - 4, y - 2], [x + 4, y - 2], [x + 4, y + 2], [x - 4, y + 2]], lineType: 'A' }, ...hatchBox(x, y - 2, x + 4, y + 2, 1)] },
      { en: 'WIRING (SWITCH TO LIGHT)', af: 'BEDRADING (SKAKELAAR NA LIG)', draw: (x, y) => [{ kind: 'polyline', points: Array.from({ length: 13 }, (_, i) => [x - 6 + i, y + 1.5 - 3 * Math.sin(Math.PI * i / 12)]), lineType: 'hidden' }] },
    ];
    const X = 22, Y0 = 18, RH = 11;
    const table = (i) => [{ kind: 'line', p1: [8, Y0 - 6 + i * RH], p2: [170, Y0 - 6 + i * RH], lineType: 'C' }];
    const steps = [0, 1, 2, 3].map(k => {
      const sl = k === 0 ? rows.slice(0, 3) : k === 1 ? rows.slice(3, 5) : k === 2 ? rows.slice(5, 8) : rows.slice(8);
      const start = k === 0 ? 0 : k === 1 ? 3 : k === 2 ? 5 : 8;
      return {
        id: k + 1,
        instruction: [
          'Switches: a small circle on the wall with a line at 45°. One end-stroke = single pole, two = double pole; a dimmer has an arrow through it.',
          'Socket outlets: a half circle against the wall with its stem. A switched socket outlet adds a switch stroke to the stem.',
          'Lights: a ceiling light is a cross; a wall-mounted light adds a line for the wall bracket; a fluorescent fitting is a long tube shape, with the number and wattage of tubes noted.',
          'The distribution board (half hatched), and the wiring from a switch to the light it controls, drawn as a curved broken line.',
        ][k],
        calloutAt: [X, Y0 + (start + 0.5) * RH],
        reveals: sl.flatMap((r, j) => {
          const i = start + j, y = Y0 + i * RH;
          return [...r.draw(X, y), lbl([40, y - 0.5], r.en, { size: 3.2 }), lbl([40, y + 3.6], r.af, { size: 2.7, color: '#94a3b8' }), ...table(i + 1)];
        }),
      };
    });
    steps[0].reveals.unshift(
      lbl([8, Y0 - 11.5], 'SYMBOL /', { size: 3, color: '#fde047' }),
      lbl([8, Y0 - 7.5], 'SIMBOOL', { size: 3, color: '#fde047' }),
      lbl([40, Y0 - 9], 'DESCRIPTION / BESKRYWING', { size: 3.2, color: '#fde047' }),
      ...table(0)
    );
    CONSTRUCTIONS['electrical-symbols'] = {
      id: 'electrical-symbols', title: 'Electrical Symbols on Floor Plans', scale: 'NTS',
      summary: 'The electrical symbols used on South African floor plans: switches, socket outlets, lights, the distribution board and wiring, in a bilingual table.',
      bounds: { w: 175, h: 125 },
      workbookPrompt: 'Draw the table of electrical symbols with each symbol and its description in English and Afrikaans.',
      steps,
    };
  })();

  // ── Roof structure: identify the parts of a king-post truss ──
  (function () {
    const SPAN = 120, PITCH = 26 * Math.PI / 180;
    const X0 = 20, YB = 110;                         // tie beam underside at the wall plates
    const rise = SPAN / 2 * Math.tan(PITCH);
    const apex = [X0 + SPAN / 2, YB - 4 - rise];
    const eaveL = [X0 - 14, YB - 4 + 14 * Math.tan(PITCH)];
    const eaveR = [X0 + SPAN + 14, eaveL[1]];
    const along = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const nrm = Math.SQRT1_2;
    const rafterTopL = (t) => { const p = along(eaveL, apex, t); return [p[0] - 2 * Math.sin(PITCH), p[1] - 2 * Math.cos(PITCH)]; };
    const bubble = (letter, at, to) => [
      leader(to, at),
      { kind: 'circle', center: at, r: 3, lineType: 'B' },
      lbl([at[0], at[1] + 1.3], letter, { anchor: 'middle', size: 3.4 }),
    ];
    const KEY = [
      ['A', 'RIDGE CAPPING', 'NOKBEDEKKING'], ['B', 'ROOF SHEETING', 'DAKBEDEKKING'], ['C', 'PURLIN', 'DAKLAT'],
      ['D', 'RAFTER', 'DAKSPAR'], ['E', 'KING POST', 'HOOFKAPBALK'], ['F', 'STRUT', 'STUT'],
      ['G', 'TIE BEAM', 'BINDBALK'], ['H', 'WALL PLATE', 'MUURPLAAT'], ['I', 'FASCIA BOARD', 'FASSIEPLANK'],
      ['J', 'GUTTER', 'GEUT'], ['K', 'BRANDERING', 'LATWERK'], ['L', 'CEILING BOARD', 'PLAFONBORD'],
    ];
    void nrm;
    CONSTRUCTIONS['roof-detail-section'] = {
      id: 'roof-detail-section', title: 'Roof Structure: Parts of a Truss', scale: 'NTS',
      summary: 'A king-post roof truss on two load-bearing walls, with its roof covering and ceiling. Each part is lettered; the key names it in English and Afrikaans.',
      bounds: { w: 250, h: 130 },
      workbookPrompt: 'Study the roof truss. Write the name of each lettered part, in English and Afrikaans, in the key.',
      steps: [
        {
          id: 1,
          instruction: 'The walls carry a timber WALL PLATE each; the TIE BEAM spans between them and the two RAFTERS meet at the apex, overhanging the walls at the eaves.',
          calloutAt: [X0 + SPAN / 2, YB - 2],
          reveals: [
            ...[X0 - 2.5, X0 + SPAN - 2.5].flatMap(x => [
              { kind: 'polygon', points: [[x - 2.5, YB], [x + 7.5, YB], [x + 7.5, YB + 22], [x - 2.5, YB + 22]], lineType: 'A' },
              ...hatchBox(x - 2.5, YB, x + 7.5, YB + 22, 1.6),
              { kind: 'polygon', points: [[x - 1, YB - 2.5], [x + 6, YB - 2.5], [x + 6, YB], [x - 1, YB]], lineType: 'A' },
            ]),
            { kind: 'polygon', points: [[X0 - 4, YB - 6.5], [X0 + SPAN + 4, YB - 6.5], [X0 + SPAN + 4, YB - 2.5], [X0 - 4, YB - 2.5]], lineType: 'A' },
            { kind: 'polyline', points: [eaveL, apex, eaveR], lineType: 'A' },
            { kind: 'polyline', points: [rafterTopL(0), [apex[0], apex[1] - 2 / Math.cos(PITCH)], [2 * apex[0] - rafterTopL(0)[0], rafterTopL(0)[1]]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'The KING POST runs from the apex down to the middle of the tie beam; two STRUTS brace the rafters from the foot of the king post. Steel nail plates join the timbers.',
          calloutAt: [apex[0], (apex[1] + YB) / 2],
          reveals: [
            { kind: 'polygon', points: [[apex[0] - 2, apex[1]], [apex[0] + 2, apex[1]], [apex[0] + 2, YB - 6.5], [apex[0] - 2, YB - 6.5]], lineType: 'A' },
            { kind: 'line', p1: [apex[0] - 2, YB - 10], p2: along(eaveL, apex, 0.62), lineType: 'A' },
            { kind: 'line', p1: [apex[0] + 2, YB - 10], p2: along(eaveR, apex, 0.62), lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'On top of the rafters: PURLINS (small timbers at most 1200 apart for IBR sheeting), then the ROOF SHEETING and the RIDGE CAPPING. At the eaves: the FASCIA BOARD and the GUTTER. Under the tie beam: BRANDERING and the CEILING BOARD.',
          calloutAt: along(eaveL, apex, 0.5),
          reveals: [
            ...[0.15, 0.4, 0.65, 0.9].flatMap(t => [rafterTopL(t), [2 * apex[0] - rafterTopL(t)[0], rafterTopL(t)[1]]].map(p => ({ kind: 'polygon', points: [[p[0] - 1.6, p[1] - 2.4], [p[0] + 1.6, p[1] - 2.4], [p[0] + 1.6, p[1]], [p[0] - 1.6, p[1]]], lineType: 'A' }))),
            { kind: 'polyline', points: [[eaveL[0] - 1, eaveL[1] - 5], [apex[0], apex[1] - 6.6], [eaveR[0] + 1, eaveR[1] - 5]], lineType: 'A' },
            { kind: 'polyline', points: [[apex[0] - 5, apex[1] - 4.6], [apex[0], apex[1] - 8.6], [apex[0] + 5, apex[1] - 4.6]], lineType: 'A' },
            ...[eaveL, eaveR].flatMap((e, s) => {
              const sx = s ? 1 : -1;
              return [
                { kind: 'polygon', points: [[e[0], e[1] - 4], [e[0] + sx * 1.6, e[1] - 4], [e[0] + sx * 1.6, e[1] + 4], [e[0], e[1] + 4]], lineType: 'A' },
                { kind: 'arc-construction', center: [e[0] + sx * 6, e[1] - 2], r: 4, startDeg: 0, endDeg: 180, lineType: 'A' },
                { kind: 'line', p1: [e[0] + sx * 2, e[1] - 2], p2: [e[0] + sx * 10, e[1] - 2], lineType: 'B' },
              ];
            }),
            ...Array.from({ length: 8 }, (_, i) => X0 + 4 + i * 15.5).map(x => ({ kind: 'polygon', points: [[x - 1.4, YB - 2.5], [x + 1.4, YB - 2.5], [x + 1.4, YB - 0.5], [x - 1.4, YB - 0.5]], lineType: 'B' })),
            { kind: 'line', p1: [X0 + 5, YB - 0.2], p2: [X0 + SPAN - 5, YB - 0.2], lineType: 'A' },
          ],
        },
        {
          id: 4,
          instruction: 'Identify each lettered part and complete the key in both languages.',
          calloutAt: [X0 + SPAN + 40, 30],
          reveals: [
            ...bubble('A', [apex[0] + 8, apex[1] - 16], [apex[0] + 2, apex[1] - 8]),
            ...bubble('B', [apex[0] + 30, apex[1] - 4], along([apex[0], apex[1] - 6.6], [eaveR[0], eaveR[1] - 5], 0.3)),
            ...bubble('C', [X0 + 6, apex[1]], [rafterTopL(0.4)[0], rafterTopL(0.4)[1] - 1.2]),
            ...bubble('D', [X0 + 4, apex[1] + 26], along(eaveL, apex, 0.32)),
            ...bubble('E', [apex[0] - 14, apex[1] + 18], [apex[0] - 2, apex[1] + 22]),
            ...bubble('F', [apex[0] + 22, YB - 22], along([apex[0] + 2, YB - 10], along(eaveR, apex, 0.62), 0.5)),
            ...bubble('G', [apex[0] + 20, YB + 10], [apex[0] + 18, YB - 4.5]),
            ...bubble('H', [X0 - 16, YB + 16], [X0 - 1, YB - 1]),
            ...bubble('I', [eaveL[0] - 12, eaveL[1] - 10], [eaveL[0] - 1, eaveL[1] - 2]),
            ...bubble('J', [eaveR[0] + 14, eaveR[1] + 10], [eaveR[0] + 8, eaveR[1] + 1]),
            ...bubble('K', [X0 + 30, YB + 12], [X0 + 35, YB - 1.5]),
            ...bubble('L', [X0 + 60, YB + 16], [X0 + 62, YB - 0.2]),
            ...KEY.flatMap(([l, en, af], i) => [
              lbl([X0 + SPAN + 36, 18 + i * 8.2], l, { size: 3.4, color: '#fde047' }),
              lbl([X0 + SPAN + 42, 18 + i * 8.2], en + ' / ' + af, { size: 3, color: '#e8eaf2' }),
              { kind: 'line', p1: [X0 + SPAN + 34, 20.6 + i * 8.2], p2: [X0 + SPAN + 110, 20.6 + i * 8.2], lineType: 'C' },
            ]),
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
      id: 'window-detail', title: 'Window Detail — Sill, Frame and Lintel', scale: 'NTS',
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
      id: 'drainage-waste-line', title: 'Drainage — Waste Line with Fall', scale: 'NTS',
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
      text: 'In a sectional elevation through a foundation, how are the brick wall and the concrete footing shown?',
      options: [
        'The brick wall is hatched with 45° lines; the concrete is shown with small stones (triangles and dots)',
        'Both are left blank',
        'The concrete is hatched with 45° lines; the brick is left blank',
        'Both are filled in solid black',
      ],
      answer: 0,
      explanation: 'Each material cut by the section has its own symbol: brick is hatched with 45° section lines, concrete is shown with small triangles and dots (its stone aggregate), hardcore with loose stones and natural ground with short earth strokes.',
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
      text: 'On a floor plan, what does the ceiling light symbol (a cross) connect to via a dashed line?',
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
    'floor-plan', 'foundation-section', 'foundation-section-110', 'bathroom-fixtures',
    'electrical-symbols', 'roof-detail-section', 'window-detail', 'drainage-waste-line',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
