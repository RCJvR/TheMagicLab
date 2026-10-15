// Civil Drawing (Gr 10): more exercises. A granny flat (floor plan 1:50 and sectional elevation
// A-A with a pitched roof at 1:25), an office with a toilet (1:25 with a schedule of areas), a
// strip foundation detail (1:5) and a door opening with a wooden frame (1:10).
// Runs after civil-drawing.data.js and civil-house.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  function hatchBox(x0, y0, x1, y1, sp) {
    const a = Math.min(x0, x1), b = Math.min(y0, y1), w = Math.abs(x1 - x0), h = Math.abs(y1 - y0), out = [];
    for (let k = -h; k <= w + 0.01; k += sp) {
      const lo = Math.max(0, -k), hi = Math.min(h, w - k);
      if (hi > lo) out.push(L([a + lo + k, b + h - lo], [a + hi + k, b + h - hi], 'B'));
    }
    return out;
  }
  function concrete(x0, y0, x1, y1, density) {
    const out = []; let seed = Math.round(x0 * 7 + y0 * 13 + x1 * 3);
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const n = Math.max(3, Math.round(Math.abs((x1 - x0) * (y1 - y0)) * (density || 0.12)));
    const xa = Math.min(x0, x1), ya = Math.min(y0, y1), w = Math.abs(x1 - x0), h = Math.abs(y1 - y0);
    for (let i = 0; i < n; i++) {
      const x = xa + 0.8 + rnd() * (w - 1.6), y = ya + 0.6 + rnd() * (h - 1.2);
      out.push(i % 2 ? poly([[x, y - 0.5], [x + 0.5, y + 0.4], [x - 0.5, y + 0.4]], 'C') : { kind: 'circle', center: [x, y], r: 0.2, lineType: 'C' });
    }
    return out;
  }
  const earth = (x0, x1, y) => { const out = []; for (let x = x0 + 1; x < x1 - 2; x += 4) out.push(L([x, y + 1], [x + 2, y + 3], 'C'), L([x + 1.2, y + 1], [x + 3.2, y + 3], 'C')); return out; };
  function hardcore(x0, y0, x1, y1) {
    const out = [];
    for (let x = x0 + 1.5; x < x1 - 1.5; x += 3.2) for (let y = y0 + 1.2; y < y1 - 0.8; y += 2.4) {
      const dx = ((x * 7 + y * 3) % 1.2) - 0.6;
      out.push(poly([[x + dx, y], [x + 1.1 + dx, y - 0.5], [x + 1.6 + dx, y + 0.5], [x + 0.5 + dx, y + 0.9]], 'C'));
    }
    return out;
  }
  const leader = (a, b) => L(a, b, 'B');
  const arcPts = (c, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
  const finish = (id, title, scale, summary, prompt, steps) => {
    C[id] = { id, title, scale, projection: 'first', summary, workbookPrompt: prompt, printLayout: 'full', steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(id);
  };

  // ═══ Granny flat: x left→right, y back (0) → front (D) ═══
  const W = 7000, D = 4800, E = 222, I = 111;
  const VX = 4200;                                     // internal wall x VX..VX+I
  const HY = 2600;                                     // bedroom/bathroom wall y HY..HY+I (right part)
  const frontDoor = [1000, 1900], lounWin = [2500, 3700], kitWin = [800, 2000], bedWin = [5000, 6200];
  const bathWin = [3300, 3900];                        // right end wall (y)
  const bedDoor = [1000, 1800], bathDoor = [3700, 4400];   // in the internal wall (y)
  const CUT = 1500;

  (function () {
    const S = 50, X0 = 34, Y0 = 34, P = (x, y) => [X0 + x / S, Y0 + y / S];
    const box = (x0, y0, x1, y1) => [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
    const ext = [
      [0, 0, kitWin[0], E], [kitWin[1], 0, bedWin[0], E], [bedWin[1], 0, W, E],
      [0, E, E, D], [W - E, E, W, bathWin[0]], [W - E, bathWin[1], W, D],
      [E, D - E, frontDoor[0], D], [frontDoor[1], D - E, lounWin[0], D], [lounWin[1], D - E, W - E, D],
    ];
    const int = [[VX, E, VX + I, bedDoor[0]], [VX, bedDoor[1], VX + I, bathDoor[0]], [VX, bathDoor[1], VX + I, D - E], [VX + I, HY, W - E, HY + I]];
    const out = ws => ws.map(w => poly(box(...w)));
    const fr = 50;
    const doorV = (y0, y1, wallX0, wallX1, into) => {   // a door in a vertical wall, opening towards +x (into = 1) or -x
      const hx = into > 0 ? wallX1 : wallX0, leaf = y1 - y0 - 2 * fr;
      return [poly(box(wallX0, y0, wallX1, y0 + fr)), poly(box(wallX0, y1 - fr, wallX1, y1)),
        poly(box(hx, y1 - fr - 40, hx + into * leaf, y1 - fr)),
        { kind: 'arc-construction', center: P(hx, y1 - fr), r: leaf / S, startDeg: into > 0 ? 270 : 180, endDeg: into > 0 ? 360 : 270, lineType: 'C' }];
    };
    const frontD = (() => { const leaf = frontDoor[1] - frontDoor[0] - 2 * fr; return [poly(box(frontDoor[0], D - E, frontDoor[0] + fr, D)), poly(box(frontDoor[1] - fr, D - E, frontDoor[1], D)),
      poly(box(frontDoor[1] - fr - 40, D - E - leaf, frontDoor[1] - fr, D - E)),
      { kind: 'arc-construction', center: P(frontDoor[1] - fr, D - E), r: leaf / S, startDeg: 180, endDeg: 270, lineType: 'C' }]; })();
    const winH = ([a, b], yIn, yOut) => { const m = (yIn + yOut) / 2; return [L(P(a, m - 15), P(b, m - 15)), L(P(a, m + 15), P(b, m + 15)), L(P(a, yIn), P(b, yIn), 'B'),
      pl([P(a - 50, yOut), P(a - 50, yOut + (yOut > yIn ? 60 : -60)), P(b + 50, yOut + (yOut > yIn ? 60 : -60)), P(b + 50, yOut)], 'B')]; };
    const winV = ([a, b]) => { const m = W - E / 2; return [L(P(m - 15, a), P(m - 15, b)), L(P(m + 15, a), P(m + 15, b)), L(P(W - E, a), P(W - E, b), 'B'), pl([P(W, a - 50), P(W + 60, a - 50), P(W + 60, b + 50), P(W, b + 50)], 'B')]; };
    const kitchen = [poly(box(2200, E, 3400, E + 600)), poly(box(2300, E + 100, 2800, E + 480), 'B'), poly(box(2850, E + 100, 3350, E + 480), 'B'),
      poly(box(3500, E, VX, E + 600)), ...[[3700, E + 160], [4000, E + 160], [3700, E + 440], [4000, E + 440]].map(([x, y]) => ({ kind: 'circle', center: P(x, y), r: 1.8, lineType: 'B' }))];
    const bath = [poly(box(W - E - 750, HY + I + 100, W - E, HY + I + 1800)), poly(box(W - E - 690, HY + I + 160, W - E - 60, HY + I + 1740), 'B')];
    const wc = [poly(box(5000, D - E - 250, 5500, D - E)), pl(Array.from({ length: 21 }, (_, i) => { const a = Math.PI + Math.PI * i / 20; return P(5250 + 230 * Math.cos(a), D - E - 250 + 600 * Math.sin(a)); }))];
    const basin = [poly(box(4700, HY + I, 5300, HY + I + 450)), pl(Array.from({ length: 25 }, (_, i) => { const a = 2 * Math.PI * i / 24; return P(5000 + 220 * Math.cos(a), HY + I + 230 + 150 * Math.sin(a)); }), 'B')];
    const light = (x, y) => { const c = P(x, y), r = 2.4, k = r * Math.SQRT1_2; return [{ kind: 'circle', center: c, r, lineType: 'B' }, L([c[0] - k, c[1] - k], [c[0] + k, c[1] + k], 'B'), L([c[0] - k, c[1] + k], [c[0] + k, c[1] - k], 'B')]; };
    const plug = (x, y) => { const c = P(x, y); return [{ kind: 'polyline', points: arcPts(c, 2, 180, 360, 8), lineType: 'B' }, L([c[0] - 2, c[1]], [c[0] + 2, c[1]], 'B'), L([c[0], c[1] - 2], [c[0], c[1] - 4], 'B')]; };
    const cutTop = P(CUT, -900), cutBot = P(CUT, D + 900);
    const arrow = (p, dy) => [L(p, [p[0] - 7, p[1]], 'B'), pl([[p[0] - 4.5, p[1] - 1.5], [p[0] - 7, p[1]], [p[0] - 4.5, p[1] + 1.5]], 'B'), lbl([p[0] - 9, p[1] + dy], 'A', Object.assign({ size: 4 }, YEL))];
    const steps = [
      { instruction: 'Draw the 222 mm external walls of the granny flat, 7000 × 4800 outside, with the openings for the front door, the four windows (one in the right-hand end wall) left open.', calloutAt: P(W / 2, E / 2), reveals: out(ext) },
      { instruction: 'Draw the 111 mm internal walls: one across the flat 4200 from the left, with openings for the bedroom and bathroom doors, and one between the bedroom and the bathroom.', calloutAt: P(VX, 2200), reveals: out(int) },
      { instruction: 'Hatch all the walls at 45°.', calloutAt: P(E / 2, D / 2), reveals: [...ext, ...int].flatMap(w => { const a = P(w[0], w[1]), b = P(w[2], w[3]); return hatchBox(a[0], a[1], b[0], b[1], 1.5); }) },
      { instruction: 'The front door: 50 mm frames, the leaf open into the lounge, and its swing.', calloutAt: P(1450, D - 600), reveals: frontD },
      { instruction: 'The bedroom door and the bathroom door in the internal wall, both opening away from the lounge.', calloutAt: P(VX + 400, 1400), reveals: [...doorV(bedDoor[0], bedDoor[1], VX, VX + I, 1), ...doorV(bathDoor[0], bathDoor[1], VX, VX + I, 1)] },
      { instruction: 'The windows: frame and glass lines in the middle of the wall, the inside face across each opening, and a sill outside.', calloutAt: P((lounWin[0] + lounWin[1]) / 2, D), reveals: [...winH(kitWin, E, 0), ...winH(bedWin, E, 0), ...winH(lounWin, D - E, D), ...winV(bathWin)] },
      { instruction: 'The kitchen against the back wall of the lounge: a double-bowl sink unit (1200 × 600) and a stove (600 wide with four plates).', calloutAt: P(2800, E + 300), reveals: kitchen },
      { instruction: 'The bathroom: the bath against the end wall, the WC against the front wall and the wash basin against the bedroom wall.', calloutAt: P(W - E - 375, 3600), reveals: [...bath, ...wc, ...basin, lbl(P(W - E - 375, 3800), 'B', { size: 2.6 }), lbl(P(5250, D - E - 500), 'WC', { size: 2.2 }), lbl(P(5000, HY + I + 240), 'WB', { size: 2 })] },
      { instruction: 'Electrical: a light point in each room and a plug point in the kitchen and the bedroom.', calloutAt: P(2100, 2500), reveals: [...light(2100, 1500), ...light(5600, 1400), ...light(5300, 3700), ...plug(3300, E + 650), ...plug(6600, 1800)] },
      { instruction: 'The cutting plane A-A through the front door and the kitchen window, with arrows looking to the left.', calloutAt: cutTop,
        reveals: [L(cutTop, cutBot, 'centre'), L(cutTop, [cutTop[0], cutTop[1] + 6], 'A'), L(cutBot, [cutBot[0], cutBot[1] - 6], 'A'), ...arrow(cutTop, -1.5), ...arrow(cutBot, 4.5)] },
      { instruction: 'Name the rooms and floor finishes, dimension the plan, and add the north point, title and scale.', calloutAt: P(W / 2, D + 1500),
        reveals: [lbl(P(2300, 2500), 'LOUNGE / KITCHEN'), lbl(P(2300, 2750), 'SITKAMER / KOMBUIS', { size: 2.6 }), lbl(P(2300, 3000), 'TILES / TEËLS', Object.assign({ size: 2.2 }, GREY)),
          lbl(P(5600, 1100), 'BEDROOM'), lbl(P(5600, 1350 + 300), 'SLAAPKAMER', { size: 2.6 }), lbl(P(5600, 1900), 'CARPET / MAT', Object.assign({ size: 2.2 }, GREY)),
          lbl(P(5200, 3350), 'BATHROOM', { size: 2.4 }), lbl(P(5200, 3550), 'BADKAMER', { size: 2.4 }),
          { kind: 'dimension', p1: P(0, -600), p2: P(W, -600), offset: -6, text: '7000' },
          { kind: 'dimension', p1: P(W + 700, 0), p2: P(W + 700, D), offset: 6, text: '4800' },
          { kind: 'circle', center: P(-1200, 600), r: 6, lineType: 'B' }, poly([[P(-1200, 0)[0], P(0, 600)[1] - 7], [P(-1200, 0)[0] + 2.2, P(0, 600)[1] + 2], P(-1200, 600), [P(-1200, 0)[0] - 2.2, P(0, 600)[1] + 2]]),
          lbl([P(-1200, 0)[0], P(0, 600)[1] - 9], 'N', { size: 3.6 }),
          lbl(P(W / 2, D + 1500), 'FLOOR PLAN / VLOERPLAN', Object.assign({ size: 3.8 }, YEL)), lbl(P(W / 2, D + 1800), 'SCALE / SKAAL 1:50', Object.assign({ size: 2.8 }, GREY))] },
    ];
    finish('granny-flat-plan', 'Granny Flat: Floor Plan (1:50)', '1:50',
      'An exam-style floor plan of a granny flat: lounge with kitchen, bedroom and bathroom; 222 and 111 walls, three doors, four windows, kitchen and bathroom fittings, electrical points and cutting plane A-A.',
      'Draw the floor plan of the granny flat to scale 1:50 (outside 7000 × 4800; 222 external and 111 internal walls). Show all doors with swings, windows with sills, kitchen and bathroom fittings, light and plug points, hatching, cutting plane A-A, room names, floor finishes, dimensions, the north point, title and scale.',
      steps);
  })();

  // ═══ Granny flat: sectional elevation A-A with a pitched roof, 1:25 (front wall on the right) ═══
  (function () {
    const S = 25, X0 = 46, Z0 = 140, P = (y, z) => [X0 + y / S, Z0 - z / S];
    const ngl = -200, footTop = -500, footBot = -750, fw = 600, plate = 2550, sill = 900, head = 2100, over = 450, pitch = 30;
    const back = [0, E], front = [D - E, D];
    const rect = (y0, z0, y1, z1) => poly([P(y0, z0), P(y1, z0), P(y1, z1), P(y0, z1)]);
    const hb = (y0, z0, y1, z1) => { const a = P(y0, z0), b = P(y1, z1); return hatchBox(a[0], a[1], b[0], b[1], 1.6); };
    const t30 = Math.tan(pitch * Math.PI / 180), mid = D / 2, rise = (mid - 0) * t30;
    const roofZ = y => plate + (mid - Math.abs(y - mid)) * t30;          // top of the rafter line over the walls' outer faces
    const rafterD = 114;                                                // rafter depth (perpendicular-ish, drawn vertically)
    const steps = [
      { instruction: 'Draw NGL (200 below the floor) with the earth symbol outside, and the two 600 × 250 footings, their tops 300 below NGL.', calloutAt: P(-400, ngl),
        reveals: [L(P(-800, ngl), P(0, ngl)), ...earth(P(-800, 0)[0], P(0, 0)[0], P(0, ngl)[1]), L(P(D, ngl), P(D + 800, ngl)), ...earth(P(D, 0)[0], P(D + 800, 0)[0], P(0, ngl)[1]),
          ...[back, front].flatMap(([a, b]) => { const c = (a + b) / 2; return [rect(c - fw / 2, footTop, c + fw / 2, footBot), ...concrete(P(c - fw / 2, 0)[0], P(0, footTop)[1], P(c + fw / 2, 0)[0], P(0, footBot)[1])]; })] },
      { instruction: 'Draw the foundation walls up to floor level and hatch them.', calloutAt: P(E, -250), reveals: [back, front].flatMap(([a, b]) => [rect(a, footTop, b, 0), ...hb(a, footTop, b, 0)]) },
      { instruction: 'Hardcore fill, then the 100 mm surface bed on top: its top is the FFL.', calloutAt: P(D / 2, -50),
        reveals: [rect(E, 0, D - E, -100), ...concrete(P(E, 0)[0], P(0, 0)[1], P(D - E, 0)[0], P(0, -100)[1], 0.3), ...hardcore(P(E, 0)[0], P(0, -100)[1], P(D - E, 0)[0], P(0, ngl)[1])] },
      { instruction: 'The DPC across both walls at floor level.', calloutAt: P(D - E, 0), reveals: [back, front].map(([a, b]) => rect(a, 0, b, 20)) },
      { instruction: 'Back wall (left, through the kitchen window): wall to the 900 sill, then from the 2100 head up to the wall plate at 2550. Hatch it.', calloutAt: P(E / 2, sill / 2),
        reveals: [rect(back[0], 20, back[1], sill), ...hb(back[0], 20, back[1], sill), rect(back[0], head, back[1], plate), ...hb(back[0], head, back[1], plate)] },
      { instruction: 'The window: sill sloping outwards, frame and glass in the opening.', calloutAt: P(E / 2, 1500),
        reveals: [poly([P(-60, sill - 25), P(E - 60, sill), P(E - 60, sill + 10), P(-60, sill - 10)]), rect(E / 2 - 25, sill, E / 2 + 25, head), L(P(E / 2, sill), P(E / 2, head), 'B')] },
      { instruction: 'Front wall (right, through the door): only the part above the 2100 door head is cut. Hatch it and draw the door frame in the opening.', calloutAt: P(D - E / 2, head),
        reveals: [rect(front[0], head, front[1], plate), ...hb(front[0], head, front[1], plate), rect(D - E / 2 - 25, 20, D - E / 2 + 25, head)] },
      { instruction: 'The wall plates (114 × 38) on top of both walls, and the tie beam (bottom chord of the truss) resting on them across the room.', calloutAt: P(D / 2, plate),
        reveals: [rect(0, plate, 114, plate + 38), rect(D - 114, plate, D, plate + 38), rect(-over + 100, plate + 38, D + over - 100, plate + 152)] },
      { instruction: 'The rafters (top chords) at 30°, from the eaves (450 overhang) up to the ridge in the middle, and the struts of the truss.', calloutAt: P(mid, plate + rise),
        reveals: [pl([P(-over, roofZ(0) - over * t30), P(mid, plate + rise), P(D + over, roofZ(D) - over * t30)]),
          pl([P(-over, roofZ(0) - over * t30 - rafterD), P(mid, plate + rise - rafterD), P(D + over, roofZ(D) - over * t30 - rafterD)], 'B'),
          L(P(mid, plate + 152), P(mid, plate + rise - rafterD), 'B'), L(P(D / 4, plate + 152), P(mid, plate + rise - rafterD), 'B'), L(P(3 * D / 4, plate + 152), P(mid, plate + rise - rafterD), 'B')] },
      { instruction: 'The roof covering (tiles on battens) on the rafters, the fascia boards at the eaves, and the ceiling under the tie beam.', calloutAt: P(D + over, plate),
        reveals: [pl([P(-over - 30, roofZ(0) - (over + 30) * t30 + 50), P(mid, plate + rise + 50), P(D + over + 30, roofZ(D) - (over + 30) * t30 + 50)]),
          rect(-over - 25, roofZ(0) - over * t30 - 230, -over, roofZ(0) - over * t30), rect(D + over, roofZ(D) - over * t30 - 230, D + over + 25, roofZ(D) - over * t30),
          L(P(E, plate - 10), P(D - E, plate - 10), 'B')] },
      { instruction: 'Label the section (DPC, FFL, NGL, surface bed, hardcore, footing, sill, lintel, wall plate, truss, roof tiles, fascia, ceiling), add the heights and the title.', calloutAt: P(D + 900, 0),
        reveals: [
          ...[[front[1], 10, 400, 'DPC / VWL'], [D - 400, 0, 120, 'FFL / VVV'], [D - 700, -50, -160, '100 SURFACE BED / BETONVLOER'], [D + 400, ngl, -440, 'NGL / NGV'], [D - 1000, -150, -720, 'HARDCORE / PUINVULLING'], [D + 300, -620, -1000, 'FOOTING 600 × 250 / FONDAMENT'],
            [D, 2300, 2300, 'LINTEL / LATEI'], [D - 60, plate + 20, plate + 120, 'WALL PLATE / MUURPLAAT'], [D * 0.7, plate + 100, plate + 450, 'TRUSS / KAPSPAN'], [D * 0.8, roofZ(D * 0.8) + 50, plate + 900, 'ROOF TILES / DAKTEËLS'], [D + over + 12, roofZ(D) - over * t30 - 100, plate + 1200, 'FASCIA / BOEIPLANK'], [D - 600, plate - 10, plate - 400, 'CEILING / PLAFON']]
            .flatMap(([y, z, lz, t]) => [leader(P(y, z), P(D + 1100, lz)), lbl(P(D + 1150, lz), t, { anchor: 'start', size: 2.4 })]),
          leader(P(-60, sill - 15), P(-800, 600)), lbl(P(-850, 600), 'SILL / VENSTERBANK', { anchor: 'end', size: 2.4 }),
          { kind: 'dimension', p1: P(-650, 0), p2: P(-650, plate), offset: -6, text: '2550' },
          { kind: 'dimension', p1: P(0, footBot - 120), p2: P(D, footBot - 120), offset: 6, text: '4800' },
          lbl(P(D / 2, footBot - 420), 'SECTION A-A / SNIT A-A', Object.assign({ size: 3.8 }, YEL)), lbl(P(D / 2, footBot - 580), 'SCALE / SKAAL 1:25', Object.assign({ size: 2.8 }, GREY))] },
    ];
    finish('granny-flat-section', 'Granny Flat: Section A-A with a Pitched Roof (1:25)', '1:25',
      'The sectional elevation on A-A of the granny flat: foundations, floor and walls as before, and now a 30° pitched roof: wall plates, a truss (tie beam, rafters and struts), roof tiles, fascia boards and the ceiling.',
      'Draw sectional elevation A-A of the granny flat to scale 1:25, looking in the direction of the arrows: footings, foundation walls, DPC, surface bed on hardcore, the window and door openings, walls 2550 to the wall plate, and a 30° pitched roof with trusses, tiles, a 450 eaves overhang, fascias and ceiling. Label and dimension.',
      steps);
  })();

  // ═══ Office with a toilet, 1:25, with plaster and a schedule of areas ═══
  (function () {
    const S = 25, X0 = 30, Y0 = 30, P = (x, y) => [X0 + x / S, Y0 + y / S];
    const IW = 3600, IH = 2800, e = 222, i = 111, plaster = 15, TW = 1300;   // office inside 3600 × 2800; toilet 1300 wide on the right
    const box = (x0, y0, x1, y1) => [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
    const door = [900, 1800], win = [700, 2100], tdoor = [1700, 2400];     // front wall (x); office window back wall (x); toilet door in internal wall (y)
    const walls = [[-e, -e, win[0], 0], [win[1], -e, IW + e, 0], [-e, 0, 0, IH + e], [IW, 0, IW + e, IH + e], [0, IH, door[0], IH + e], [door[1], IH, IW, IH + e], [IW - TW - i, 0, IW - TW, tdoor[0]], [IW - TW - i, tdoor[1], IW - TW, IH]];
    const steps = [
      { instruction: 'Draw the 222 mm external walls round the office (inside 3600 × 2800) and the 111 mm wall that closes off the toilet (1300 wide) on the right. Leave the openings for the front door, the window and the toilet door.', calloutAt: P(IW / 2, -e / 2), reveals: walls.map(w => poly(box(...w))) },
      { instruction: 'Hatch the walls, and draw the 15 mm plaster on every inside face as a thin line (plaster is shown, but not hatched).', calloutAt: P(-e / 2, IH / 2),
        reveals: [...walls.flatMap(w => { const a = P(w[0], w[1]), b = P(w[2], w[3]); return hatchBox(a[0], a[1], b[0], b[1], 1.4); }),
          pl([P(plaster, plaster), P(IW - TW - i - plaster, plaster)], 'C'), pl([P(IW - TW + plaster, plaster), P(IW - plaster, plaster), P(IW - plaster, IH - plaster), P(IW - TW + plaster, IH - plaster)], 'C'),
          pl([P(plaster, plaster), P(plaster, IH - plaster), P(door[0], IH - plaster)], 'C')] },
      { instruction: 'The front door (900) and the toilet door (700) with their frames and swings, and the 1400 window with its sill.', calloutAt: P(1350, IH - 500),
        reveals: [poly(box(door[0], IH, door[0] + 40, IH + e)), poly(box(door[1] - 40, IH, door[1], IH + e)), poly(box(door[1] - 80, IH - 820, door[1] - 40, IH)),
          { kind: 'arc-construction', center: P(door[1] - 40, IH), r: 820 / S, startDeg: 180, endDeg: 270, lineType: 'C' },
          poly(box(IW - TW - i, tdoor[0], IW - TW, tdoor[0] + 40)), poly(box(IW - TW - i, tdoor[1] - 40, IW - TW, tdoor[1])), poly(box(IW - TW, tdoor[1] - 80, IW - TW + 620, tdoor[1] - 40)),
          { kind: 'arc-construction', center: P(IW - TW, tdoor[1] - 40), r: 620 / S, startDeg: 270, endDeg: 360, lineType: 'C' },
          L(P(win[0], -e / 2 - 12), P(win[1], -e / 2 - 12)), L(P(win[0], -e / 2 + 12), P(win[1], -e / 2 + 12)), pl([P(win[0] - 50, -e), P(win[0] - 50, -e - 60), P(win[1] + 50, -e - 60), P(win[1] + 50, -e)], 'B')] },
      { instruction: 'The toilet fittings: a WC against the back wall and a small hand basin (400 × 300) against the end wall.', calloutAt: P(IW - 650, 500),
        reveals: [poly(box(IW - 900, 0, IW - 400, 250)), pl(Array.from({ length: 21 }, (_, k) => { const a = Math.PI * k / 20; return P(IW - 650 + 230 * Math.cos(a), 250 + 600 * Math.sin(a)); })),
          poly(box(IW - 300, 1700, IW, 2100)), pl(Array.from({ length: 25 }, (_, k) => { const a = 2 * Math.PI * k / 24; return P(IW - 160 + 100 * Math.cos(a), 1900 + 150 * Math.sin(a)); }), 'B'),
          lbl(P(IW - 650, 550), 'WC', { size: 2.4 }), lbl(P(IW - 160, 1600), 'HB', { size: 2.2 })] },
      { instruction: 'Label the rooms and floor finishes, dimension the inside sizes, and complete the schedule of areas.', calloutAt: P(IW / 2, IH + 900),
        reveals: [lbl(P(1150, 1200), 'OFFICE / KANTOOR'), lbl(P(1150, 1450), 'CARPET TILES / MATTEËLS', Object.assign({ size: 2.2 }, GREY)), lbl(P(IW - 650, 1300), 'TOILET', { size: 2.6 }), lbl(P(IW - 650, 1500), 'TILES / TEËLS', Object.assign({ size: 2.2 }, GREY)),
          { kind: 'dimension', p1: P(0, -e - 300), p2: P(IW, -e - 300), offset: -6, text: '3600' }, { kind: 'dimension', p1: P(IW + e + 300, 0), p2: P(IW + e + 300, IH), offset: 6, text: '2800' },
          lbl([P(IW + e, 0)[0] + 24, P(0, 0)[1] + 10], 'SCHEDULE OF AREAS', { anchor: 'start', size: 3, color: '#fde047' }),
          lbl([P(IW + e, 0)[0] + 24, P(0, 0)[1] + 16], 'Office: 2.189 × 2.8 = 6.13 m²', { anchor: 'start', size: 2.6 }),
          lbl([P(IW + e, 0)[0] + 24, P(0, 0)[1] + 21], 'Toilet: 1.3 × 2.8 = 3.64 m²', { anchor: 'start', size: 2.6 }),
          lbl([P(IW + e, 0)[0] + 24, P(0, 0)[1] + 26], 'Total floor area (to outside of walls):', { anchor: 'start', size: 2.6 }),
          lbl([P(IW + e, 0)[0] + 24, P(0, 0)[1] + 31], '4.044 × 3.244 = 13.12 m²', { anchor: 'start', size: 2.6 }),
          lbl(P(IW / 2, IH + 900), 'FLOOR PLAN / VLOERPLAN  1:25', Object.assign({ size: 3.4 }, YEL))] },
    ];
    finish('office-toilet-plan', 'Office with a Toilet (1:25)', '1:25',
      'A small office with a toilet at 1:25: 222 and 111 walls with the plaster shown, two doors, a window, the WC and hand basin, and a schedule of areas worked out from the plan.',
      'Draw the floor plan of the office and toilet to scale 1:25 (office and toilet inside 3600 × 2800 together; the toilet is 1300 wide). Show plaster without hatching, the doors with swings, the window, the WC and hand basin, room names, floor finishes, dimensions and a schedule of areas.',
      steps);
  })();

  // ═══ Strip foundation detail, 1:5 ═══
  (function () {
    const S = 5, X0 = 30, Z0 = 60, P = (x, z) => [X0 + x / S, Z0 - z / S];
    const wall = 222, fw = 600, fd = 250, ngl = -150, footTop = -450, slab = 100, screed = 30;
    const wx = 400, cx = wx + wall / 2;                     // wall from x = 400 to 622 (inside on the right)
    const steps = [
      { instruction: 'At 1:5 every 5 mm on the drawing is 25 mm. Draw the footing (600 × 250) centred under the wall position.', calloutAt: P(cx, footTop - fd / 2),
        reveals: [poly([P(cx - fw / 2, footTop), P(cx + fw / 2, footTop), P(cx + fw / 2, footTop - fd), P(cx - fw / 2, footTop - fd)]), ...concrete(P(cx - fw / 2, 0)[0], P(0, footTop)[1], P(cx + fw / 2, 0)[0], P(0, footTop - fd)[1], 0.05)] },
      { instruction: 'Draw the 222 mm brick wall standing on it, up to a break line 200 above the floor. Show the brick courses (75 mm high) as thin lines and hatch the wall.', calloutAt: P(cx, 150),
        reveals: [L(P(wx, footTop), P(wx, 200)), L(P(wx + wall, footTop), P(wx + wall, 200)), pl([P(wx - 20, 200), P(cx - 10, 200), P(cx, 230), P(cx + 10, 170), P(wx + wall + 20, 200)], 'B'),
          ...Array.from({ length: 10 }, (_, k) => footTop + 75 * (k + 1)).filter(z => z < 200).map(z => L(P(wx, z), P(wx + wall, z), 'C')),
          ...hatchBox(P(wx, 0)[0], P(0, 200)[1], P(wx + wall, 0)[0], P(0, footTop)[1], 3)] },
      { instruction: 'Outside (left): the natural ground level NGL 300 above the footing, with the earth symbol.', calloutAt: P(200, ngl), reveals: [L(P(0, ngl), P(wx, ngl)), ...earth(P(0, 0)[0], P(wx, 0)[0], P(0, ngl)[1])] },
      { instruction: 'Inside (right): compacted hardcore up to 130 below the floor, the 100 mm concrete surface bed, and a 30 mm screed on top. The top of the screed is the FFL, 150 above NGL.', calloutAt: P(900, -50),
        reveals: [poly([P(wx + wall, -screed), P(1150, -screed), P(1150, -screed - slab), P(wx + wall, -screed - slab)]), ...concrete(P(wx + wall, 0)[0], P(0, -screed)[1], P(1150, 0)[0], P(0, -screed - slab)[1], 0.08),
          poly([P(wx + wall, 0), P(1150, 0), P(1150, -screed), P(wx + wall, -screed)], 'B'), ...hardcore(P(wx + wall, 0)[0], P(0, -screed - slab)[1], P(1150, 0)[0], P(0, ngl - 120)[1])] },
      { instruction: 'The DPC across the wall at floor level (the bottom of the screed) and turned under the surface bed.', calloutAt: P(cx, -screed),
        reveals: [poly([P(wx, -screed), P(wx + wall, -screed), P(wx + wall, -screed - 8), P(wx, -screed - 8)]), L(P(wx + wall, -screed - slab - 4), P(1150, -screed - slab - 4), 'B')] },
      { instruction: 'Label every part (in both languages) and add the dimensions: wall 222, footing 600 × 250, 300 to NGL, 150 to FFL.', calloutAt: P(1300, 0),
        reveals: [...[[wx + wall, 120, 200, 'BRICK WALL / BAKSTEENMUUR'], [wx + wall, -screed - 4, 120, 'DPC / VWL'], [1000, 0, 30, 'FFL / VVV'], [1000, -15, -60, 'SCREED / BLAD'], [1000, -80, -150, 'SURFACE BED / BETONVLOER'], [900, -240, -260, 'HARDCORE / PUINVULLING'], [cx + fw / 2, footTop - 100, -560, 'FOOTING / FONDAMENT']]
            .flatMap(([x, z, lz, t]) => [leader(P(x, z), P(1250, lz)), lbl(P(1280, lz), t, { anchor: 'start', size: 2.6 })]),
          leader(P(100, ngl), P(60, ngl + 120)), lbl(P(40, ngl + 140), 'NGL / NGV', { anchor: 'start', size: 2.6 }),
          { kind: 'dimension', p1: P(wx, 160), p2: P(wx + wall, 160), offset: -4, text: '222' },
          { kind: 'dimension', p1: P(cx - fw / 2, footTop - fd), p2: P(cx + fw / 2, footTop - fd), offset: 6, text: '600' },
          { kind: 'dimension', p1: P(cx - fw / 2, footTop - fd), p2: P(cx - fw / 2, footTop), offset: -6, text: '250' },
          { kind: 'dimension', p1: P(60, footTop), p2: P(60, ngl), offset: -6, text: '300' },
          lbl(P(cx, footTop - fd - 110), 'STRIP FOUNDATION / STROOKFONDAMENT  1:5', Object.assign({ size: 3.2 }, YEL))] },
    ];
    finish('strip-foundation-1to5', 'Strip Foundation Detail (1:5)', '1:5',
      'A large-scale detail of the foundation of a 222 mm load-bearing wall at 1:5: footing, brick courses, NGL, hardcore, surface bed, screed and the DPC, all labelled.',
      'Draw, to scale 1:5, the detail of the strip foundation of a 222 mm load-bearing wall: 600 × 250 footing with its top 300 below NGL, brick wall, hardcore, 100 mm surface bed, 30 mm screed with the FFL 150 above NGL, and the DPC. Label all parts in both languages and dimension.',
      steps);
  })();

  // ═══ External door opening with a wooden frame, 1:10 ═══
  (function () {
    const S = 10, u = mm => mm / S;
    const opening = 900, wall = 222, frW = 67, frD = 120, rebate = 12, leafT = 40;   // the frame is 67 × 120 with a 12 mm rebate for the door
    const X0 = 30, Y0 = 60, P = (x, d) => [X0 + u(x), Y0 - u(d)];                 // d from the inside face outwards
    const fr = side => {   // frame profile at a jamb (wood, hatched with grain), rebated on the inside
      const x = side < 0 ? 0 : opening, s = side < 0 ? 1 : -1, d0 = (wall - frD) / 2, d1 = d0 + frD;
      return [P(x, d0), P(x + s * frW, d0), P(x + s * frW, d0 + leafT + 2), P(x + s * (frW - rebate), d0 + leafT + 2), P(x + s * (frW - rebate), d1), P(x, d1)];
    };
    const grain = pts => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys); return [0.3, 0.55, 0.8].map(t => pl([[x0 + 1, y0 + (y1 - y0) * t], [x0 + (x1 - x0) * 0.5, y0 + (y1 - y0) * t - 1], [x1 - 1, y0 + (y1 - y0) * t]], 'C')); };
    const hinge = [opening - frW, (wall - frD) / 2], leaf = opening - 2 * frW + 2 * rebate;
    const steps = [
      { instruction: 'Draw the two wall ends either side of the 900 opening (222 thick, 22.2 mm at 1:10).', calloutAt: P(-250, wall / 2),
        reveals: [[-500, 0], [opening, opening + 500]].map(([a, b]) => poly([P(a, 0), P(b, 0), P(b, wall), P(a, wall)])) },
      { instruction: 'Hatch the wall ends at 45°.', calloutAt: P(-250, wall / 2), reveals: [[-500, 0], [opening, opening + 500]].flatMap(([a, b]) => { const p = P(a, 0), q = P(b, wall); return hatchBox(p[0], p[1], q[0], q[1], 1.6); }) },
      { instruction: 'Draw the WOODEN frame at each jamb: 67 × 120, centred in the wall, with a 12 mm rebate on the inside for the door to close against. Wood in section is shown with grain lines, not hatching.', calloutAt: P(frW / 2, wall / 2),
        reveals: [poly(fr(-1)), poly(fr(1)), ...grain(fr(-1)), ...grain(fr(1))] },
      { instruction: 'The 40 mm door leaf, hinged on the right-hand frame in the rebate, open at 90° into the room.', calloutAt: P(hinge[0] - leafT / 2, -leaf / 2),
        reveals: [poly([P(hinge[0], hinge[1]), P(hinge[0] - leafT, hinge[1]), P(hinge[0] - leafT, hinge[1] - leaf), P(hinge[0], hinge[1] - leaf)])] },
      { instruction: 'The door swing, the dimensions and the title.', calloutAt: P(opening / 2, -leaf / 2),
        reveals: [{ kind: 'arc-construction', center: P(hinge[0], hinge[1]), r: u(leaf), startDeg: 90, endDeg: 180, lineType: 'C' },
          { kind: 'dimension', p1: P(0, wall), p2: P(opening, wall), offset: -8, text: '900' },
          { kind: 'dimension', p1: P(opening + 500, 0), p2: P(opening + 500, wall), offset: -8, text: '222' },
          lbl([X0 + u(opening) / 2, Y0 + u(leaf) + 12], 'EXTERNAL DOOR, WOODEN FRAME / EKSTERNE DEUR, HOUTKOZYN - PLAN 1:10', Object.assign({ size: 3 }, YEL))] },
    ];
    finish('door-wooden-frame', 'Door Opening with a Wooden Frame (1:10)', '1:10',
      'The plan of an external door opening at 1:10 with a rebated wooden frame: wood in section is shown with grain lines, and the door closes against the rebate.',
      'Using the given frame profile (67 × 120 with a 12 mm rebate), draw to scale 1:10 the plan of the external door opening in a 222 mm wall: both frames, the 40 mm door and its swing.',
      steps);
  })();
})(window);
