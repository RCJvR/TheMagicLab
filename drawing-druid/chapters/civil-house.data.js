// Civil Drawing (Gr 10): a complete exam-style question on two sheets: the floor plan of a small
// cottage at 1:50 with cutting plane A-A, and sectional elevation A-A at 1:25. 222 mm external
// walls, a 111 mm internal wall, 600 x 250 footings, 100 mm surface bed, DPC at floor level.
// Runs after civil-drawing.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
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
    const n = Math.max(3, Math.round((x1 - x0) * (y1 - y0) * (density || 0.12)));
    for (let i = 0; i < n; i++) {
      const x = x0 + 0.8 + rnd() * (x1 - x0 - 1.6), y = y0 + 0.6 + rnd() * (y1 - y0 - 1.2);
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
  const finish = (id, title, scale, summary, prompt, steps) => {
    C[id] = { id, title, scale, projection: 'first', summary, workbookPrompt: prompt, printLayout: 'full', steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(id);
  };

  // ── The cottage (mm). x: left to right, y: back (0) to front (4200). ──
  const W = 6000, D = 4200, E = 222, I = 111;
  const IWX = 3600;                                   // internal wall x IWX .. IWX + I
  const doorExt = [900, 1800], doorInt = [2900, 3700]; // front wall (x), internal wall (y)
  const winBed = [1000, 2500], winBath = [4400, 5000]; // back wall (x)
  const CUT = 1400;                                    // cutting plane A-A at x = 1400

  // ═══ Sheet 1: floor plan 1:50 ═══
  (function () {
    const S = 50, X0 = 34, Y0 = 34, P = (x, y) => [X0 + x / S, Y0 + y / S];
    const box = (x0, y0, x1, y1) => [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
    // wall pieces (rectangles, mm)
    const ext = [
      [0, 0, winBed[0], E], [winBed[1], 0, winBath[0], E], [winBath[1], 0, W, E],      // back wall, broken by the windows
      [0, E, E, D], [W - E, E, W, D],                                                   // ends
      [E, D - E, doorExt[0], D], [doorExt[1], D - E, W - E, D],                         // front wall, broken by the door
    ];
    const int = [[IWX, E, IWX + I, doorInt[0]], [IWX, doorInt[1], IWX + I, D - E]];
    const outlines = ws => ws.map(w => poly(box(...w)));
    // door: frame 50, leaf 40, opening into the room
    const fr = 50;
    const extDoor = [poly(box(doorExt[0], D - E, doorExt[0] + fr, D)), poly(box(doorExt[1] - fr, D - E, doorExt[1], D)),
      poly(box(doorExt[1] - fr - 40, D - E - 800, doorExt[1] - fr, D - E)),
      { kind: 'arc-construction', center: P(doorExt[1] - fr, D - E), r: 800 / S, startDeg: 180, endDeg: 270, lineType: 'C' }];
    const intDoor = [poly(box(IWX, doorInt[0], IWX + I, doorInt[0] + fr)), poly(box(IWX, doorInt[1] - fr, IWX + I, doorInt[1])),
      poly(box(IWX + I, doorInt[1] - fr - 40, IWX + I + 700, doorInt[1] - fr)),
      { kind: 'arc-construction', center: P(IWX + I, doorInt[1] - fr), r: 700 / S, startDeg: 270, endDeg: 360, lineType: 'C' }];
    const win = ([a, b]) => [L(P(a, E / 2 - 15), P(b, E / 2 - 15)), L(P(a, E / 2 + 15), P(b, E / 2 + 15)), L(P(a, E), P(b, E), 'B'),
      { kind: 'polyline', points: [P(a - 50, 0), P(a - 50, -60), P(b + 50, -60), P(b + 50, 0)], lineType: 'B' }];
    const bath = [poly(box(W - E - 1700, E, W - E, E + 750)), poly(box(W - E - 1640, E + 70, W - E - 80, E + 680), 'B'), { kind: 'circle', center: P(W - E - 1540, E + 375), r: 0.9, lineType: 'B' }];
    const wcX = W - E, wc = [poly(box(wcX - 250, 1600, wcX, 2100)),
      { kind: 'polyline', points: Array.from({ length: 21 }, (_, i) => { const a = Math.PI / 2 + Math.PI * i / 20; return P(wcX - 250 + 600 * Math.cos(a), 1850 + 230 * Math.sin(a)); }), lineType: 'A' }];
    const basin = [poly(box(4600, D - E - 450, 5200, D - E)), { kind: 'polyline', points: Array.from({ length: 25 }, (_, i) => { const a = 2 * Math.PI * i / 24; return P(4900 + 220 * Math.cos(a), D - E - 230 + 150 * Math.sin(a)); }), lineType: 'B' }];
    const light = (x, y) => { const c = P(x, y), r = 2.4, k = r * Math.SQRT1_2; return [{ kind: 'circle', center: c, r, lineType: 'B' }, L([c[0] - k, c[1] - k], [c[0] + k, c[1] + k], 'B'), L([c[0] - k, c[1] + k], [c[0] + k, c[1] - k], 'B')]; };
    const sw = (x, y, lx, ly) => { const c = P(x, y), e = P(lx, ly); return [{ kind: 'circle', center: c, r: 0.9, lineType: 'B' }, L(c, [c[0] + 2.4, c[1] - 2.4], 'B'), { kind: 'polyline', points: [c, [(c[0] + e[0]) / 2 + 3, (c[1] + e[1]) / 2], e], lineType: 'hidden' }]; };
    const cutTop = P(CUT, -900), cutBot = P(CUT, D + 900);
    const arrow = (p, dy) => [L(p, [p[0] - 7, p[1]], 'B'), { kind: 'polyline', points: [[p[0] - 4.5, p[1] - 1.5], [p[0] - 7, p[1]], [p[0] - 4.5, p[1] + 1.5]], lineType: 'B' }, lbl([p[0] - 9, p[1] + dy], 'A', Object.assign({ size: 4 }, YEL))];
    const steps = [
      { instruction: 'Draw the external walls, 222 mm brick (4.4 mm at 1:50): outside 6000 × 4200. Leave the openings for the front door (900) and the two windows (1500 and 600).', calloutAt: P(W / 2, E / 2), reveals: outlines(ext) },
      { instruction: 'Draw the 111 mm internal wall between the bedroom and the bathroom, 3600 from the outside of the left-hand wall, with the 800 door opening near the front.', calloutAt: P(IWX, 1500), reveals: outlines(int) },
      { instruction: 'Hatch every wall cut by the plan at 45°.', calloutAt: P(E / 2, D / 2), reveals: [...ext, ...int].flatMap(w => { const a = P(w[0], w[1]), b = P(w[2], w[3]); return hatchBox(a[0], a[1], b[0], b[1], 1.5); }) },
      { instruction: 'The front door: 50 mm frames on both jambs, the leaf open at 90° into the bedroom, and its swing.', calloutAt: P((doorExt[0] + doorExt[1]) / 2, D - 600), reveals: extDoor },
      { instruction: 'The internal door: frames, the leaf opening into the bathroom, and its swing.', calloutAt: P(IWX + 400, doorInt[1] - 400), reveals: intDoor },
      { instruction: 'The windows in the back wall: frame and glass lines in the middle of the wall, the inside face across the opening, and the sill outside.', calloutAt: P((winBed[0] + winBed[1]) / 2, -60), reveals: [...win(winBed), ...win(winBath)] },
      { instruction: 'The step outside the front door: 1100 × 300.', calloutAt: P((doorExt[0] + doorExt[1]) / 2, D + 150), reveals: [poly(box(doorExt[0] - 100, D, doorExt[1] + 100, D + 300)), lbl(P((doorExt[0] + doorExt[1]) / 2, D + 170), 'STEP / TREE', Object.assign({ size: 2.2 }, GREY))] },
      { instruction: 'Bathroom fittings from the symbol sheet: the bath (1700 × 750) along the back wall, the WC against the end wall and the wash basin against the front wall.', calloutAt: P(W - E - 850, E + 375), reveals: [...bath, ...wc, ...basin, lbl(P(W - E - 850, E + 420), 'B', { size: 2.6 }), lbl(P(wcX - 420, 1880), 'WC', { size: 2.4 }), lbl(P(4900, D - E - 210), 'WB', { size: 2.2 })] },
      { instruction: 'Electrical: a light point in the middle of each room and a switch beside each door, joined by a thin broken line.', calloutAt: P(1900, 2000), reveals: [...light(1900, 2000), ...light(4600, 1450), ...sw(doorExt[0] - 200, D - E - 150, 1900, 2000), ...sw(IWX + I + 150, doorInt[0] - 200, 4600, 1450)] },
      { instruction: 'The cutting plane A-A: a thin chain line, thick at the ends, through the front door and the bedroom window, with arrows showing the direction of viewing (to the left).', calloutAt: cutTop,
        reveals: [L(cutTop, cutBot, 'centre'), L(cutTop, [cutTop[0], cutTop[1] + 6], 'A'), L(cutBot, [cutBot[0], cutBot[1] - 6], 'A'), ...arrow(cutTop, -1.5), ...arrow(cutBot, 4.5)] },
      { instruction: 'Name the rooms and their floor finishes in both languages, and add the overall and room dimensions, the north point, the title and the scale.', calloutAt: P(W / 2, D + 900),
        reveals: [lbl(P(2100, 1500), 'BEDROOM / SLAAPKAMER'), lbl(P(2100, 1750), 'CARPET / MAT', Object.assign({ size: 2.4 }, GREY)),
          lbl(P(4750, 2500), 'BATHROOM', { size: 2.6 }), lbl(P(4750, 2700), 'BADKAMER', { size: 2.6 }), lbl(P(4750, 2900), 'TILES / TEËLS', Object.assign({ size: 2.2 }, GREY)),
          { kind: 'dimension', p1: P(0, -600), p2: P(W, -600), offset: -6, text: '6000' },
          { kind: 'dimension', p1: P(0, D + 700), p2: P(IWX, D + 700), offset: 6, text: '3600' },
          { kind: 'dimension', p1: P(IWX, D + 700), p2: P(W, D + 700), offset: 6, text: '2400' },
          { kind: 'dimension', p1: P(W + 600, 0), p2: P(W + 600, D), offset: 6, text: '4200' },
          { kind: 'circle', center: P(W + 1500, 600), r: 6, lineType: 'B' }, poly([P(W + 1500, 600 - 300), [P(W + 1500, 0)[0] + 2.2, P(0, 600)[1] + 2], P(W + 1500, 600), [P(W + 1500, 0)[0] - 2.2, P(0, 600)[1] + 2]]),
          lbl([P(W + 1500, 0)[0], P(0, 600)[1] - 8], 'N', { size: 3.6 }),
          lbl(P(W / 2, D + 1500), 'FLOOR PLAN / VLOERPLAN', Object.assign({ size: 3.8 }, YEL)), lbl(P(W / 2, D + 1800), 'SCALE / SKAAL 1:50', Object.assign({ size: 2.8 }, GREY))] },
    ];
    finish('cottage-floor-plan', 'Cottage: Floor Plan with Cutting Plane (1:50)', '1:50',
      'A complete Gr 10 civil question, part 1: the floor plan of a two-room cottage with 222 mm external walls and a 111 mm internal wall, doors, windows, a step, bathroom fittings, electrical points and cutting plane A-A.',
      'Draw the floor plan of the cottage to scale 1:50: external walls 222 mm, internal wall 111 mm, a 900 front door and 800 internal door (50 mm frames), windows 1500 and 600 with sills, the step, the bath, WC and wash basin, a light and switch per room, all hatching, cutting plane A-A, room names, floor finishes, dimensions, north point, title and scale.',
      steps);
  })();

  // ═══ Sheet 2: sectional elevation A-A 1:25 (looking to the left: front wall on the right) ═══
  (function () {
    const S = 25, X0 = 40, Z0 = 150;                       // Z0: screen y of the finished floor (z = 0)
    const P = (y, z) => [X0 + y / S, Z0 - z / S];
    const ngl = -200, footTop = -500, footBot = -750, fw = 600, wallTop = 2700, slabT = 170, over = 300;
    const sill = 900, head = 2100;
    // walls: back wall (left) at y 0..E, front wall (right) at y D-E..D
    const walls = [[0, E], [D - E, D]];
    const footings = walls.map(([a, b]) => { const c = (a + b) / 2; return [c - fw / 2, c + fw / 2]; });
    const rect = (y0, z0, y1, z1) => poly([P(y0, z0), P(y1, z0), P(y1, z1), P(y0, z1)]);
    const hb = (y0, z0, y1, z1) => { const a = P(y0, z0), b = P(y1, z1); return hatchBox(a[0], a[1], b[0], b[1], 1.6); };
    const back = walls[0], front = walls[1];
    const steps = [
      { instruction: 'Draw the natural ground level (NGL), 200 below the finished floor, with the earth symbol outside the walls.', calloutAt: P(-500, ngl),
        reveals: [L(P(-900, ngl), P(back[0], ngl)), ...earth(P(-900, 0)[0], P(back[0], 0)[0], P(0, ngl)[1]), L(P(front[1], ngl), P(D + 900, ngl)), ...earth(P(front[1], 0)[0], P(D + 900, 0)[0], P(0, ngl)[1])] },
      { instruction: 'Draw the two concrete footings, 600 × 250, centred under the walls with their tops 300 below NGL.', calloutAt: P(footings[0][0], footBot),
        reveals: footings.flatMap(([a, b]) => [rect(a, footTop, b, footBot), ...concrete(P(a, 0)[0], P(0, footTop)[1], P(b, 0)[0], P(0, footBot)[1])]) },
      { instruction: 'Draw the 222 mm foundation walls from the footings up to floor level, and hatch them.', calloutAt: P(back[1], -250),
        reveals: walls.flatMap(([a, b]) => [rect(a, footTop, b, 0), ...hb(a, footTop, b, 0)]) },
      { instruction: 'Inside, fill up to 100 below the floor with compacted hardcore, then the 100 mm concrete surface bed. Its top is the finished floor level (FFL).', calloutAt: P(D / 2, -50),
        reveals: [rect(back[1], 0, front[0], -100), ...concrete(P(back[1], 0)[0], P(0, 0)[1], P(front[0], 0)[0], P(0, -100)[1], 0.3), ...hardcore(P(back[1], 0)[0], P(0, -100)[1], P(front[0], 0)[0], P(0, ngl)[1]), L(P(back[1], ngl), P(front[0], ngl), 'C')] },
      { instruction: 'Draw the damp-proof course (DPC) across both walls at floor level.', calloutAt: P(front[0], 0), reveals: walls.map(([a, b]) => poly([P(a, 0), P(b, 0), P(b, 20), P(a, 20)])) },
      { instruction: 'Back wall (on the left, cut through the bedroom window): the wall from the floor up to the 900 sill, and from the window head at 2100 up to 2700. Hatch both parts.', calloutAt: P(E / 2, sill / 2),
        reveals: [rect(back[0], 20, back[1], sill), ...hb(back[0], 20, back[1], sill), rect(back[0], head, back[1], wallTop), ...hb(back[0], head, back[1], wallTop)] },
      { instruction: 'The window in the back wall: the sill sloping outwards, the steel frame and the glass line in the opening.', calloutAt: P(E / 2, (sill + head) / 2),
        reveals: [poly([P(back[0] - 60, sill - 25), P(back[1] - 60, sill), P(back[1] - 60, sill + 10), P(back[0] - 60, sill - 10)]), rect(E / 2 - 25, sill, E / 2 + 25, head), L(P(E / 2, sill), P(E / 2, head), 'B')] },
      { instruction: 'Front wall (on the right, cut through the door): only the part above the door, from 2100 to 2700, is cut. Hatch it. Draw the door frame and the closed door in the opening.', calloutAt: P(D - E / 2, head),
        reveals: [rect(front[0], head, front[1], wallTop), ...hb(front[0], head, front[1], wallTop), rect(D - E / 2 - 25, 20, D - E / 2 + 25, head), L(P(D - E / 2 - 20, 20), P(D - E / 2 - 20, head - 50), 'B')] },
      { instruction: 'The concrete roof slab, 170 thick, on top of the walls, overhanging 300 at each end. Concrete in section: hatch it with the stone symbol.', calloutAt: P(D / 2, wallTop + slabT / 2),
        reveals: [rect(-over, wallTop, D + over, wallTop + slabT), ...concrete(P(-over, 0)[0], P(0, wallTop + slabT)[1], P(D + over, 0)[0], P(0, wallTop)[1], 0.2)] },
      { instruction: 'Beyond the cutting plane you look at the inside face of the left-hand end wall: draw the line where it meets the ceiling and the floor (thin lines).', calloutAt: P(D / 2, wallTop - 300),
        reveals: [L(P(back[1], wallTop), P(front[0], wallTop), 'B')] },
      { instruction: 'Label the section in both languages (DPC, FFL, NGL, surface bed, hardcore, footing, lintel, sill), add the heights, and the title SECTION A-A with its scale.', calloutAt: P(D + 900, 0),
        reveals: [
          leader(P(front[1], 10), P(D + 700, 500)), lbl(P(D + 750, 500), 'DPC / VWL', { anchor: 'start', size: 2.6 }),
          leader(P(front[0] - 300, 0), P(D + 700, 180)), lbl(P(D + 750, 180), 'FFL / VVV', { anchor: 'start', size: 2.6 }),
          leader(P(front[0] - 600, -50), P(D + 700, -140)), lbl(P(D + 750, -140), '100 SURFACE BED / BETONVLOER', { anchor: 'start', size: 2.6 }),
          leader(P(front[0] - 900, -150), P(D + 700, -780)), lbl(P(D + 750, -780), 'HARDCORE / PUINVULLING', { anchor: 'start', size: 2.6 }),
          leader(P(footings[1][1], -620), P(D + 700, -1100)), lbl(P(D + 750, -1100), 'FOOTING 600 × 250 / FONDAMENT', { anchor: 'start', size: 2.6 }),
          leader(P(D + 500, ngl), P(D + 700, -460)), lbl(P(D + 750, -460), 'NGL / NGV', { anchor: 'start', size: 2.6 }),
          leader(P(front[1], 2400), P(D + 700, 2400)), lbl(P(D + 750, 2400), 'LINTEL / LATEI', { anchor: 'start', size: 2.6 }),
          leader(P(back[0] - 60, sill - 15), P(-700, 600)), lbl(P(-750, 600), 'SILL / VENSTERBANK', { anchor: 'end', size: 2.6 }),
          { kind: 'dimension', p1: P(-500, 0), p2: P(-500, wallTop), offset: -6, text: '2700' },
          { kind: 'dimension', p1: P(-500, sill), p2: P(-500, 0), offset: 14, text: '900' },
          { kind: 'dimension', p1: P(0, footBot - 100), p2: P(D, footBot - 100), offset: 6, text: '4200' },
          lbl(P(D / 2, footBot - 700), 'SECTION A-A / SNIT A-A', Object.assign({ size: 3.8 }, YEL)), lbl(P(D / 2, footBot - 950), 'SCALE / SKAAL 1:25', Object.assign({ size: 2.8 }, GREY))] },
    ];
    finish('cottage-section-aa', 'Cottage: Sectional Elevation A-A (1:25)', '1:25',
      'Part 2 of the cottage question: the section on A-A through the front door and the bedroom window, from the footings to the roof slab, with every material shown by its own symbol.',
      'Draw sectional elevation A-A of the cottage to scale 1:25, looking in the direction of the arrows: 600 × 250 footings 300 below NGL, 222 mm walls, DPC at floor level, 100 mm surface bed on hardcore, FFL 200 above NGL, the window (sill at 900, head at 2100), the door, walls 2700 high and a 170 concrete roof slab overhanging 300. Label and dimension.',
      steps);
  })();
})(window);
