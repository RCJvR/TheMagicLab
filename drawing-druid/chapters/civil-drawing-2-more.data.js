// Civil Drawing II (Gr 11-12): answer-book style exercises. Detailed sections at 1:20 through a
// window and through doors (wooden and metal frames), from foundation up to ceiling height, each
// drawn from a given partial floor plan with cutting plane A-A.
// Runs after civil-drawing-2.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 2.6, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const dim = (p1, p2, offset, text) => ({ kind: 'dimension', p1, p2, offset, text });
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
    const xa = Math.min(x0, x1), ya = Math.min(y0, y1), w = Math.abs(x1 - x0), h = Math.abs(y1 - y0);
    const n = Math.max(3, Math.round(w * h * (density || 0.12)));
    for (let i = 0; i < n; i++) {
      const x = xa + 0.6 + rnd() * (w - 1.2), y = ya + 0.5 + rnd() * (h - 1);
      out.push(i % 2 ? poly([[x, y - 0.4], [x + 0.4, y + 0.3], [x - 0.4, y + 0.3]], 'C') : { kind: 'circle', center: [x, y], r: 0.18, lineType: 'C' });
    }
    return out;
  }
  function hardcore(x0, y0, x1, y1) {
    const out = [];
    for (let x = x0 + 1.5; x < x1 - 1.5; x += 3.2) for (let y = y0 + 1.2; y < y1 - 0.8; y += 2.4) {
      const dx = ((x * 7 + y * 3) % 1.2) - 0.6;
      out.push(poly([[x + dx, y], [x + 1.1 + dx, y - 0.5], [x + 1.6 + dx, y + 0.5], [x + 0.5 + dx, y + 0.9]], 'C'));
    }
    return out;
  }
  const earth = (x0, x1, y) => { const out = []; for (let x = x0 + 1; x < x1 - 2; x += 4) out.push(L([x, y + 1], [x + 2, y + 3], 'C'), L([x + 1.2, y + 1], [x + 3.2, y + 3], 'C')); return out; };
  const finish = (id, title, scale, summary, prompt, steps) => {
    C[id] = { id, title, scale, projection: 'first', summary, workbookPrompt: prompt, printLayout: 'full', steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(id);
  };

  // ═══ Detailed section at 1:20 through a window or a door, foundation to ceiling ═══
  //   kind: 'window' | 'wood' | 'metal'. Section: y across the wall (0 = outside face, 230 = inside face), z up from FFL.
  function detail(cfg) {
    const S = 20, X0 = 182, Z0 = 166, P = (y, z) => [X0 + y / S, Z0 - z / S];
    const W = 230, IN = 1130, ngl = -150, fTop = -450, fBot = -700, fw = 600, cy = W / 2;
    const plate = 2550, head = 2100, lint = 75, sill = 900, kind = cfg.kind, isDoor = kind !== 'window';
    const rect = (y0, z0, y1, z1, lt) => poly([P(y0, z0), P(y1, z0), P(y1, z1), P(y0, z1)], lt);
    const hb = (y0, z0, y1, z1) => { const a = P(y0, z0), b = P(y1, z1); return hatchBox(a[0], a[1], b[0], b[1], 1.5); };
    const conc = (y0, z0, y1, z1, d) => { const a = P(y0, z0), b = P(y1, z1); return concrete(a[0], a[1], b[0], b[1], d || 0.25); };
    const grain = (y0, z0, y1, z1) => {
      const a = P(y0, z1), b = P(y1, z0), w = b[0] - a[0], h = b[1] - a[1];
      return w >= h ? [0.35, 0.68].map(t => pl([[a[0] + 0.5, a[1] + h * t], [a[0] + w / 2, a[1] + h * t - 0.5], [b[0] - 0.5, a[1] + h * t]], 'C'))
        : [0.35, 0.68].map(t => pl([[a[0] + w * t, a[1] + 0.5], [a[0] + w * t + 0.4, a[1] + h / 2], [a[0] + w * t, b[1] - 0.5]], 'C'));
    };
    const cross = (y0, z0, y1, z1) => [rect(y0, z0, y1, z1), L(P(y0, z0), P(y1, z1), 'B'), L(P(y0, z1), P(y1, z0), 'B')];
    const brk = (y, z0, z1) => { const m = (z0 + z1) / 2; return pl([P(y, z0 - 40), P(y, m - 60), P(y + 50, m - 20), P(y - 50, m + 20), P(y, m + 60), P(y, z1 + 40)], 'B'); };

    // ── the given partial floor plan (1:20): a along the wall, b from the inside face (0) to the outside face (W) ──
    const PX = 24, PY = 128, Q = (a, b) => [PX + a / S, PY + b / S], len = 2100;
    const op = isDoor ? [600, 1500] : [450, 1650], cutA = (op[0] + op[1]) / 2;
    const qrect = (a0, b0, a1, b1, lt) => poly([Q(a0, b0), Q(a1, b0), Q(a1, b1), Q(a0, b1)], lt);
    const qhb = (a0, b0, a1, b1) => { const p = Q(a0, b0), q = Q(a1, b1); return hatchBox(p[0], p[1], q[0], q[1], 1.5); };
    const plan = [qrect(0, 0, op[0], W), qrect(op[1], 0, len, W), ...qhb(0, 0, op[0], W), ...qhb(op[1], 0, len, W)];
    if (kind === 'window') plan.push(L(Q(op[0], 70), Q(op[1], 70)), L(Q(op[0], 110), Q(op[1], 110)), L(Q(op[0], 90), Q(op[1], 90), 'B'),
      pl([Q(op[0], 0), Q(op[0] - 50, 0), Q(op[0] - 50, -100), Q(op[1] + 50, -100), Q(op[1] + 50, 0), Q(op[1], 0)], 'B'),
      pl([Q(op[0], W), Q(op[0] - 50, W), Q(op[0] - 50, W + 50), Q(op[1] + 50, W + 50), Q(op[1] + 50, W), Q(op[1], W)], 'B'));
    let leafW = 0, hingeA = 0, hingeB = 0;
    if (kind === 'wood') {
      const jamb = s => { const a = s < 0 ? op[0] : op[1], k = s < 0 ? 1 : -1; return [Q(a, 55), Q(a + k * 55, 55), Q(a + k * 55, 97), Q(a + k * 67, 97), Q(a + k * 67, 175), Q(a, 175)]; };
      plan.push(poly(jamb(-1)), poly(jamb(1)));
      leafW = op[1] - op[0] - 110; hingeA = op[1] - 55; hingeB = 56;
    }
    if (kind === 'metal') {
      const prof = [[0, 0], [0, 50], [85, 50], [85, 95], [145, 95], [145, 50], [230, 50], [230, 0]];
      plan.push(pl(prof.map(([y, d]) => Q(op[0] + d, W - y))), pl(prof.map(([y, d]) => Q(op[1] - d, W - y))));
      leafW = op[1] - op[0] - 100; hingeA = op[1] - 50; hingeB = 44;
    }
    if (isDoor) plan.push(qrect(hingeA - 40, hingeB - leafW, hingeA, hingeB),
      { kind: 'arc-construction', center: Q(hingeA, hingeB), r: leafW / S, startDeg: 180, endDeg: 270, lineType: 'C' });
    const cT = Q(cutA, -900), cB = Q(cutA, W + 600);
    const arrow = (p, dy) => [L(p, [p[0] - 7, p[1]], 'B'), pl([[p[0] - 4.5, p[1] - 1.5], [p[0] - 7, p[1]], [p[0] - 4.5, p[1] + 1.5]], 'B'), lbl([p[0] - 9, p[1] + dy], 'A', Object.assign({ size: 3.6 }, YEL))];
    plan.push(L(cT, cB, 'centre'), L(cT, [cT[0], cT[1] + 5]), L(cB, [cB[0], cB[1] - 5]), ...arrow(cT, -1.5), ...arrow(cB, 4),
      lbl(Q(len / 2 - 550, -500), 'INSIDE / BINNE', Object.assign({ size: 2.2 }, GREY)), lbl(Q(len / 2 + 450, W + 450), 'OUTSIDE / BUITE', Object.assign({ size: 2.2 }, GREY)),
      dim(Q(op[0], W), Q(op[1], W), 14, String(op[1] - op[0])), dim(Q(len, W), Q(len, 0), 6, '230'),
      lbl(Q(len / 2, W + 1300), 'PARTIAL FLOOR PLAN / GEDEELTELIKE VLOERPLAN', Object.assign({ size: 2.6 }, YEL)), lbl(Q(len / 2, W + 1550), 'SCALE / SKAAL 1:20', Object.assign({ size: 2.4 }, GREY)));

    const S0 = { kind: 'point', at: P(0, ngl), label: 'S' };
    const given = [...plan, L(P(-900, ngl), P(0, ngl)), ...earth(P(-900, 0)[0], P(isDoor ? -400 : 0, 0)[0], P(0, ngl)[1]), S0];
    const steps = [
      { instruction: 'GIVEN: the partial floor plan at 1:20 with cutting plane A-A ' + (isDoor ? 'through the door' : 'through the window') + ', and the natural ground level NGL with the starting point S on the outside face of the 230 mm wall. Draw, to scale 1:20, the detailed section on A-A from the foundation up to ceiling height. The outside is on the LEFT (look in the direction of the arrows).',
        calloutAt: Q(cutA, -900), reveals: given },
      { instruction: 'The FOOTING: 600 × 250 concrete, centred under the wall, its top 300 below NGL. Show the concrete symbol.', calloutAt: P(cy, -575),
        reveals: [rect(cy - fw / 2, fTop, cy + fw / 2, fBot), ...conc(cy - fw / 2, fTop, cy + fw / 2, fBot, 0.12)] },
      { instruction: 'The FOUNDATION WALL: 230 brickwork from the footing up to the DPC (35 below the FFL). Hatch it at 45°.', calloutAt: P(cy, -250),
        reveals: [rect(0, fTop, W, -35), ...hb(0, fTop, W, -35)] },
      { instruction: 'Inside: compacted HARDCORE, then the 100 mm SURFACE BED and a 25 mm SCREED. The top of the screed is the FFL, 150 above NGL. ' + (isDoor ? 'At the door the screed runs over the wall to the outside face: the threshold.' : '') + ' End the floor with a break line.',
        calloutAt: P(800, -75),
        reveals: [rect(W, -125, IN, -25), ...conc(W, -125, IN, -25, 0.3), rect(isDoor ? 0 : W, -25, IN, 0, 'B'),
          ...(() => { const a = P(W, -125), b = P(IN, -320); return hardcore(a[0], a[1], b[0], b[1]); })(), brk(IN, -320, 0)] },
      { instruction: 'The DPC (damp-proof course) across the wall, under the floor level.', calloutAt: P(cy, -30), reveals: [rect(0, -35, W, -25)] },
      isDoor
        ? { instruction: 'Outside the door: a concrete STEP (landing) 400 wide, its top 25 below the FFL, cast on the ground. The NGL continues from it.', calloutAt: P(-200, -100),
            reveals: [rect(-400, -250, 0, -25), ...conc(-400, -250, 0, -25, 0.3)] }
        : { instruction: 'The WALL from the DPC up to the sill, 900 above the FFL. Hatch it.', calloutAt: P(cy, 450), reveals: [rect(0, -25, W, sill), ...hb(0, -25, W, sill)] },
    ];
    if (kind === 'window') steps.push(
      { instruction: 'The SILLS: a precast concrete sill outside, sloping away from the window and projecting 50 past the wall; inside, the 170 × 35 FIBRE-CEMENT sill on the wall.', calloutAt: P(30, sill + 20),
        reveals: [poly([P(-50, sill), P(120, sill), P(120, sill + 40), P(-50, sill + 20)]), ...conc(-40, sill, 110, sill + 20, 0.6), rect(160, sill, 330, sill + 35)] },
      { instruction: 'The STEEL WINDOW: the bottom and top frame members in section (40 × 40) and the glass line between them. Beyond the cut you see the reveals (the wall faces of the opening) as thin lines.', calloutAt: P(140, 1500),
        reveals: [rect(120, sill, 160, sill + 40), rect(120, head - 40, 160, head), L(P(140, sill + 40), P(140, head - 40), 'B'),
          L(P(120, sill + 40), P(120, head - 40), 'B'), L(P(160, sill + 40), P(160, head - 40), 'B'), L(P(0, sill + 23), P(0, head), 'B'), L(P(W, sill + 35), P(W, head), 'B')] });
    if (kind === 'wood') steps.push(
      { instruction: 'The WOODEN DOOR FRAME: the head of the frame in section (120 × 67, rebated 12 mm on the inside for the door), its top at the 2100 door height. Show wood grain. Beyond the cut, the jamb of the frame and the reveals show as thin lines.', calloutAt: P(100, 2060),
        reveals: [poly([P(55, head), P(175, head), P(175, head - 55), P(133, head - 55), P(133, head - 67), P(55, head - 67)]), ...grain(60, head - 62, 128, head - 4),
          L(P(55, 0), P(55, head - 67), 'B'), L(P(0, 0), P(0, head), 'B'), L(P(W, 0), P(W, head), 'B')] },
      { instruction: 'The 40 mm DOOR in section, closed in the rebate, from 10 above the FFL to the frame. Show its grain.', calloutAt: P(154, 1000),
        reveals: [rect(134, 10, 174, head - 57), ...grain(134, 20, 174, head - 67)] });
    if (kind === 'metal') {
      const prof = [[0, 0], [0, 50], [85, 50], [85, 95], [145, 95], [145, 50], [230, 50], [230, 0]];
      steps.push(
        { instruction: 'The METAL (pressed-steel) DOOR FRAME: it wraps the full wall thickness and has a DOUBLE REBATE (a stop in the middle). Draw the head of the frame in section, its top at 2100. Beyond the cut, the stop and the reveals show as thin lines.', calloutAt: P(115, 2030),
          reveals: [poly(prof.map(([y, d]) => P(y, head - d))), L(P(85, 0), P(85, head - 95), 'B'), L(P(0, 0), P(0, head), 'B'), L(P(W, 0), P(W, head), 'B')] },
        { instruction: 'The 40 mm DOOR in section, closed in the inside rebate against the stop, from 10 above the FFL to the frame.', calloutAt: P(166, 1000),
          reveals: [rect(146, 10, 186, head - 52), ...grain(146, 20, 186, head - 62)] });
    }
    steps.push(
      { instruction: 'The DOUBLE LINTEL over the opening: two precast lintels side by side (each 110 × 75), from the outside face and the inside face.', calloutAt: P(cy, head + 40),
        reveals: [rect(0, head, 110, head + lint), rect(120, head, W, head + lint), ...conc(0, head, 110, head + lint, 0.5), ...conc(120, head, W, head + lint, 0.5)] },
      { instruction: 'The brickwork above the lintels up to 2550, the top of the wall. Hatch it.', calloutAt: P(cy, 2350), reveals: [rect(0, head + lint, W, plate), ...hb(0, head + lint, W, plate)] },
      { instruction: 'The WALL PLATE (114 × 38) on the inside half of the wall, and the TIE BEAM (bottom chord of the roof truss, 114 deep) lying on it. Break the tie beam off both sides.', calloutAt: P(500, 2650),
        reveals: [rect(W - 114, plate, W, plate + 38), ...grain(W - 110, plate + 4, W - 4, plate + 34), rect(-150, plate + 38, IN, plate + 152), ...grain(-100, plate + 45, IN - 60, plate + 145), brk(IN, plate + 38, plate + 152), brk(-150, plate + 38, plate + 152)] },
      { instruction: 'The CEILING: 38 × 38 brandering (cut timber, shown with a cross) nailed under the tie beam, and the 9 mm ceiling board under the brandering.', calloutAt: P(700, 2540),
        reveals: [...cross(500, plate + 0, 538, plate + 38), ...cross(950, plate + 0, 988, plate + 38), rect(W, plate - 9, IN, plate, 'B')] });
    const right = [['TIE BEAM / BINDBALK', [800, plate + 95]], ['BRANDERING 38 × 38', [519, plate + 19]], ['WALL PLATE 114 × 38 / MUURPLAAT', [200, plate + 19]], ['9 mm CEILING BOARD / PLAFONBORD', [700, plate - 5]],
      ['DOUBLE LINTEL / DUBBELE LATEI', [180, head + 40]],
      ...(kind === 'window' ? [['STEEL WINDOW / STAALVENSTER', [140, 1500]], ['170 × 35 FIBRE-CEMENT SILL / VESELSEMENT VENSTERBANK', [300, sill + 18]]]
        : kind === 'wood' ? [['WOODEN DOOR FRAME / HOUTKOSYN', [160, head - 30]], ['40 mm DOOR / DEUR', [154, 1000]]] : [['PRESSED-STEEL FRAME / STAALKOSYN', [200, head - 25]], ['40 mm DOOR / DEUR', [166, 1000]]]),
      ['230 BRICK WALL / BAKSTEENMUUR', isDoor ? [180, 2350] : [180, 450]], ['FFL / VVV', [700, 0]], ['25 SCREED / BLAD', [850, -12]], ['DPC / VWL', [200, -30]], ['100 SURFACE BED / BETONVLOER', [850, -75]], ['HARDCORE / PUINVULLING', [850, -230]], ['FOOTING 600 × 250 / FONDAMENT', [400, -600]]]
      .sort((p, q) => q[1][1] - p[1][1]);
    // label heights: start at each target's own height, then push apart (min 190 mm) so no leaders cross
    const lzs = right.map(r => r[1][1]), gap = 190;
    for (let k = 0; k < 40; k++) { for (let i = 1; i < lzs.length; i++) if (lzs[i - 1] - lzs[i] < gap) { const m = (lzs[i - 1] + lzs[i]) / 2; lzs[i - 1] = m + gap / 2; lzs[i] = m - gap / 2; } }
    steps.push(
      { instruction: 'Label the section. Use the correct ABBREVIATIONS for natural ground level (NGL), finished floor level (FFL) and damp-proof course (DPC).', calloutAt: P(1300, 1000),
        reveals: [...right.flatMap(([t, at], i) => { const lz = lzs[i]; return [L(P(...at), P(1200, lz), 'B'), L(P(1200, lz), P(1260, lz), 'B'), lbl(P(1290, lz - 25), t, { anchor: 'start', size: 2.2 })]; }),
          lbl(P(-780, ngl + 60), 'NGL / NGV', { size: 2.4 }), lbl(P(-850, 1100), 'OUTSIDE / BUITE', Object.assign({ size: 2.2 }, GREY)), lbl(P(700, 1500), 'INSIDE / BINNE', Object.assign({ size: 2.2 }, GREY))] },
      { instruction: 'Dimension the heights from the FFL and the footing, and add the title and scale.', calloutAt: P(cy, -900),
        reveals: [dim(P(0, ngl), P(0, 0), -14, '150'), ...(isDoor ? [dim(P(0, 0), P(0, head), -14, '2100')] : [dim(P(0, 0), P(0, sill), -14, '900'), dim(P(0, sill), P(0, head), -14, '1200')]),
          dim(P(0, head), P(0, plate), -14, '450'), dim(P(0, 0), P(0, plate), -24, '2550'),
          dim(P(cy - fw / 2, fBot), P(cy + fw / 2, fBot), 9, '600'), dim(P(cy + fw / 2, fBot), P(cy + fw / 2, fTop), 10, '250'),
          lbl(P(cy + 300, fBot - 420), 'SECTION A-A / SNIT A-A   SCALE / SKAAL 1:20', Object.assign({ size: 3.2 }, YEL))] });
    finish(cfg.id, cfg.title, '1:20', cfg.summary, cfg.prompt, steps);
  }

  detail({ id: 'detail-window-section', kind: 'window', title: 'Detailed Section of a Window up to Ceiling Height (1:20)',
    summary: 'A detailed section through a steel window in a 230 mm wall at 1:20: footing, foundation wall, DPC, floor, precast and fibre-cement sills, the window, a double lintel, the wall plate, tie beam and ceiling.',
    prompt: 'Using the given partial floor plan, draw to scale 1:20 the detailed section on A-A through the window, from the foundation up to ceiling height: 600 × 250 footing, 230 brick walls, DPC, hardcore, 100 surface bed and 25 screed (FFL 150 above NGL), the sills (170 × 35 fibre-cement inside), the steel window (sill 900, head 2100), a DOUBLE lintel, the wall plate, tie beam, brandering and ceiling. Show all hatching and label NGL, FFL and DPC.' });
  detail({ id: 'detail-door-wooden-frame', kind: 'wood', title: 'Section of a Door with a Wooden Frame (1:20)',
    summary: 'A detailed section through an external door with a rebated WOODEN frame at 1:20: the threshold and outside step, the frame head with wood grain, the door in its rebate, a double lintel and the ceiling.',
    prompt: 'Using the given partial floor plan, draw to scale 1:20 the detailed section on A-A through the external door with a wooden frame (120 × 67, 12 mm rebate), from the foundation up to ceiling height: footing, foundation wall, DPC, floor with threshold, outside step, door frame and door (2100 high), a DOUBLE lintel, the wall plate and ceiling. Show all hatching and label NGL, FFL and DPC.' });
  detail({ id: 'detail-door-metal-frame', kind: 'metal', title: 'Section of a Door with a Metal Frame (1:20)',
    summary: 'The same door opening with a pressed-steel frame at 1:20: the frame wraps the whole wall and has a double rebate, so the door closes against a stop in the middle of the wall.',
    prompt: 'Using the given partial floor plan, draw to scale 1:20 the detailed section on A-A through the external door with a pressed-steel frame with a double rebate, from the foundation up to ceiling height: footing, foundation wall, DPC, floor with threshold, outside step, frame and door (2100 high), a DOUBLE lintel, the wall plate and ceiling. Show all hatching and label NGL, FFL and DPC.' });

  // label heights for a column of leaders: start at each target's height, then push apart so no leaders cross
  function spread(zs, gap) {
    const out = zs.slice();
    for (let k = 0; k < 60; k++) for (let i = 1; i < out.length; i++) if (out[i - 1] - out[i] < gap) { const m = (out[i - 1] + out[i]) / 2; out[i - 1] = m + gap / 2; out[i] = m - gap / 2; }
    return out;
  }

  // ═══ Single bedroom with a built-in cupboard, 1:25 ═══
  //   Plan: x west → east (inside 0..3600), y north → south (inside 0..3200). North wall 230 with window W1,
  //   west and east walls 230, south wall 110 (internal) with door D1. BIC in the south-east corner behind the door.
  const BR = { IW: 3600, ID: 3200, E: 230, I: 110, win: [1200, 2400], door: [1600, 2500], bic: [2700, 3600, 600], cut: 2000 };

  (function () {
    const S = 25, X0 = 70, Y0 = 42, P = (x, y) => [X0 + x / S, Y0 + y / S];
    const { IW, ID, E, I, win, door, bic, cut } = BR, end = ID + I + 400;
    const box = (x0, y0, x1, y1, lt) => poly([P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)], lt);
    const hb = (x0, y0, x1, y1) => { const a = P(x0, y0), b = P(x1, y1); return hatchBox(a[0], a[1], b[0], b[1], 1.5); };
    const walls = [[-E, -E, win[0], 0], [win[1], -E, IW + E, 0], [-E, 0, 0, end], [IW, 0, IW + E, end], [0, ID, door[0], ID + I], [door[1], ID, IW, ID + I]];
    const brks = [-E, IW].map(x => pl([P(x - 60, end), P(x + 60, end - 60), P(x + E - 60, end + 60), P(x + E + 60, end)], 'B'));
    const fr = 50, leaf = door[1] - door[0] - 2 * fr, hx = door[1] - fr;
    const cT = P(cut, -1100), cB = P(cut, end + 500);
    const arrow = (p, dy) => [L(p, [p[0] - 7, p[1]], 'B'), pl([[p[0] - 4.5, p[1] - 1.5], [p[0] - 7, p[1]], [p[0] - 4.5, p[1] + 1.5]], 'B'), lbl([p[0] - 9, p[1] + dy], 'A', Object.assign({ size: 3.6 }, YEL))];
    const sched = [['WINDOW SCHEDULE / VENSTERSKEDULE', YEL], ['W1: STEEL WINDOW 1200 × 1200, SILL 900'], ['170 × 35 FIBRE-CEMENT SILL INSIDE'], ['D1: 813 × 2032 DOOR IN A 50 mm'], ['WOODEN FRAME (OPENING 900 × 2100)'], ['BIC: 900 × 600, BEHIND THE DOOR']];
    const steps = [
      { instruction: 'GIVEN: the incomplete floor plan of a single bedroom at 1:25: the outlines of the 230 external walls and the 110 internal wall with the openings for window W1 and door D1, and the schedule. Complete the floor plan to scale 1:25 (1st-angle).',
        calloutAt: P(IW / 2, ID / 2),
        reveals: [...walls.map(w => box(...w)), ...brks, lbl(P(win[0] + 300, 350), 'W1', Object.assign({ size: 2.6 }, GREY)), lbl(P(door[0] - 350, ID + I + 330), 'D1', Object.assign({ size: 2.6 }, GREY)),
          ...sched.map(([t, c], i) => lbl(P(IW + E + 700, 300 + i * 220), t, Object.assign({ anchor: 'start', size: 2.3 }, c || {})))] },
      { instruction: 'Hatch all the walls at 45°: the external and internal walls are both brick.', calloutAt: P(-E / 2, ID / 2), reveals: walls.flatMap(w => hb(...w)) },
      { instruction: 'Window W1 in the middle of its opening: the steel frame and glass lines in the wall, the 170 mm fibre-cement sill inside and the sill outside.', calloutAt: P((win[0] + win[1]) / 2, -E / 2),
        reveals: [L(P(win[0], -E + 120), P(win[1], -E + 120)), L(P(win[0], -E + 160), P(win[1], -E + 160)), L(P(win[0], -E + 140), P(win[1], -E + 140), 'B'),
          pl([P(win[0], 0), P(win[0] - 50, 0), P(win[0] - 50, 100), P(win[1] + 50, 100), P(win[1] + 50, 0), P(win[1], 0)], 'B'),
          pl([P(win[0], -E), P(win[0] - 50, -E), P(win[0] - 50, -E - 50), P(win[1] + 50, -E - 50), P(win[1] + 50, -E), P(win[1], -E)], 'B')] },
      { instruction: 'Door D1: the 50 mm wooden frames at both jambs, and the door hinged on the right-hand (east) frame, opening into the bedroom, with its swing.', calloutAt: P(door[1] - 300, ID - 400),
        reveals: [box(door[0], ID, door[0] + fr, ID + I), box(door[1] - fr, ID, door[1], ID + I), box(hx - 40, ID - leaf, hx, ID),
          { kind: 'arc-construction', center: P(hx, ID), r: leaf / S, startDeg: 180, endDeg: 270, lineType: 'C' }] },
      { instruction: 'The BUILT-IN CUPBOARD behind the door, in the south-east corner: 900 wide and 600 deep. Draw its front and a diagonal, and mark it BIC.', calloutAt: P((bic[0] + bic[1]) / 2, ID - bic[2] / 2),
        reveals: [pl([P(bic[0], ID), P(bic[0], ID - bic[2]), P(bic[1], ID - bic[2])]), L(P(bic[0], ID - bic[2]), P(bic[1], ID), 'B'), lbl(P(bic[0] + 250, ID - 120), 'BIC', { size: 2.6 })] },
      { instruction: 'Cutting plane A-A from north to south through the window and the door, with the arrows looking WEST.', calloutAt: cT,
        reveals: [L(cT, cB, 'centre'), L(cT, [cT[0], cT[1] + 5]), L(cB, [cB[0], cB[1] - 5]), ...arrow(cT, -1.5), ...arrow(cB, 4)] },
      { instruction: 'The room designation with its floor finish, the dimensions, the north point, the title and the scale.', calloutAt: P(IW / 2, end + 900),
        reveals: [lbl(P(1000, 1500), 'BEDROOM / SLAAPKAMER', { size: 2.8 }), lbl(P(1000, 1750), 'CARPET / MAT', Object.assign({ size: 2.3 }, GREY)),
          dim(P(0, -E), P(win[0], -E), -10, String(win[0])), dim(P(win[0], -E), P(win[1], -E), -10, String(win[1] - win[0])), dim(P(win[1], -E), P(IW, -E), -10, String(IW - win[1])),
          dim(P(0, 1100), P(IW, 1100), 0, String(IW)), dim(P(IW + E, ID), P(IW + E, 0), 8, String(ID)),
          dim(P(door[0], ID + I), P(door[1], ID + I), 8, String(door[1] - door[0])),
          { kind: 'circle', center: P(-1300, -500), r: 6, lineType: 'B' }, poly([[P(-1300, 0)[0], P(0, -500)[1] - 7], [P(-1300, 0)[0] + 2.2, P(0, -500)[1] + 2], P(-1300, -500), [P(-1300, 0)[0] - 2.2, P(0, -500)[1] + 2]]),
          lbl([P(-1300, 0)[0], P(0, -500)[1] - 9], 'N', { size: 3.4 }),
          lbl(P(IW / 2, end + 800), 'FLOOR PLAN / VLOERPLAN', Object.assign({ size: 3.4 }, YEL)), lbl(P(IW / 2, end + 1050), 'SCALE / SKAAL 1:25', Object.assign({ size: 2.6 }, GREY))] },
    ];
    finish('bedroom-plan', 'Single Bedroom with a BIC: Floor Plan (1:25)', '1:25',
      'A single bedroom at 1:25: 230 external and 110 internal walls, a steel window with sills, a door in a wooden frame, a built-in cupboard behind the door, cutting plane A-A, the room name and floor finish.',
      'Using the given incomplete floor plan and schedule, draw to scale 1:25 the complete floor plan of the single bedroom: hatched walls, window W1 in the middle of its opening with both sills, door D1 with its frames and swing, a built-in cupboard behind the door, cutting plane A-A looking west, the room name with floor finish (carpet), dimensions and the north point.',
      steps);
  })();

  (function () {
    // Sectional elevation A-A looking west: north (window) on the RIGHT, the internal wall (door) on the LEFT.
    // u = 3200 - y: u = 0 at the inside face of the 110 wall, 3200 at the inside face of the north wall.
    const S = 25, X0 = 108, Z0 = 160, P = (u, z) => [X0 + u / S, Z0 - z / S];
    const N0 = 3200, N1 = 3430, W0 = -110, ngl = -150, fTop = -450, fBot = -700, plate = 2550, head = 2100, sill = 900, lint = 75;
    const Lf = -650, Rt = N1 + 800;                   // break line in the passage; end of the outside ground
    const rect = (u0, z0, u1, z1, lt) => poly([P(u0, z0), P(u1, z0), P(u1, z1), P(u0, z1)], lt);
    const hb = (u0, z0, u1, z1) => { const a = P(u0, z0), b = P(u1, z1); return hatchBox(a[0], a[1], b[0], b[1], 1.5); };
    const conc = (u0, z0, u1, z1, d) => { const a = P(u0, z0), b = P(u1, z1); return concrete(a[0], a[1], b[0], b[1], d || 0.25); };
    const hc = (u0, z0, u1, z1) => { const a = P(u0, z0), b = P(u1, z1); return hardcore(a[0], a[1], b[0], b[1]); };
    const grain = (u0, z0, u1, z1) => { const a = P(u0, z1), b = P(u1, z0), h = b[1] - a[1]; return [0.35, 0.68].map(t => pl([[a[0] + 0.4, a[1] + h * t], [(a[0] + b[0]) / 2, a[1] + h * t - 0.4], [b[0] - 0.4, a[1] + h * t]], 'C')); };
    const cross = (u0, z0, u1, z1) => [rect(u0, z0, u1, z1), L(P(u0, z0), P(u1, z1), 'B'), L(P(u0, z1), P(u1, z0), 'B')];
    const brk = (u, z0, z1) => { const m = (z0 + z1) / 2; return pl([P(u, z0 - 40), P(u, m - 60), P(u + 60, m - 20), P(u - 60, m + 20), P(u, m + 60), P(u, z1 + 40)], 'B'); };
    const nC = (N0 + N1) / 2, sC = W0 / 2;
    const floor = (u0, u1) => [rect(u0, -125, u1, -25), ...conc(u0, -125, u1, -25, 0.3), rect(u0, -25, u1, 0, 'B'), ...hc(u0, -125, u1, -320)];
    const steps = [
      { instruction: 'GIVEN: the floor plan of the bedroom (previous exercise) with cutting plane A-A looking west, so the north wall with the window is on the RIGHT and the internal wall with the door on the LEFT. NGL outside, the starting point S and the wall positions are given. Draw sectional elevation A-A to scale 1:25.',
        calloutAt: P(N1, ngl),
        reveals: [L(P(N1, ngl), P(Rt, ngl)), ...earth(P(N1 + 60, 0)[0], P(Rt, 0)[0], P(0, ngl)[1]), { kind: 'point', at: P(N1, ngl), label: 'S' },
          ...[W0, 0, N0, N1].map(u => L(P(u, ngl - 100), P(u, plate + 100), 'construction')), L(P(Lf, plate), P(N1 + 300, plate), 'construction')] },
      { instruction: 'The FOOTINGS: 600 × 250 under the 230 external wall and 400 × 250 under the 110 internal wall, their tops 300 below NGL.', calloutAt: P(nC, -575),
        reveals: [rect(nC - 300, fTop, nC + 300, fBot), ...conc(nC - 300, fTop, nC + 300, fBot, 0.12), rect(sC - 200, fTop, sC + 200, fBot), ...conc(sC - 200, fTop, sC + 200, fBot, 0.12)] },
      { instruction: 'The FOUNDATION WALLS up to the DPC, hatched.', calloutAt: P(nC, -250), reveals: [rect(N0, fTop, N1, -35), ...hb(N0, fTop, N1, -35), rect(W0, fTop, 0, -35), ...hb(W0, fTop, 0, -35)] },
      { instruction: 'The FLOOR on both sides of the internal wall: hardcore, 100 surface bed and 25 screed (FFL 150 above NGL). End the passage floor with a break line.', calloutAt: P(1600, -75),
        reveals: [...floor(0, N0), ...floor(Lf, W0), brk(Lf, -320, 0)] },
      { instruction: 'The DPC across both walls.', calloutAt: P(N0, -30), reveals: [rect(N0, -35, N1, -25), rect(W0, -35, 0, -25)] },
      { instruction: 'NORTH WALL: brickwork from the DPC up to the 900 sill, hatched.', calloutAt: P(nC, 450), reveals: [rect(N0, -25, N1, sill), ...hb(N0, -25, N1, sill)] },
      { instruction: 'The sills: precast sill outside (right), the 170 × 35 fibre-cement sill inside (left).', calloutAt: P(N0 - 50, sill + 20),
        reveals: [poly([P(N1 + 50, sill), P(N1 - 120, sill), P(N1 - 120, sill + 40), P(N1 + 50, sill + 20)]), rect(N1 - 330, sill, N1 - 160, sill + 35)] },
      { instruction: 'Window W1: the steel frame members in section, the glass line, and the reveals beyond the cut.', calloutAt: P(N1 - 140, 1500),
        reveals: [rect(N1 - 160, sill, N1 - 120, sill + 40), rect(N1 - 160, head - 40, N1 - 120, head), L(P(N1 - 140, sill + 40), P(N1 - 140, head - 40), 'B'),
          L(P(N1, sill + 23), P(N1, head), 'B'), L(P(N0, sill + 35), P(N0, head), 'B')] },
      { instruction: 'The DOUBLE LINTEL over the window and the brickwork up to the wall plate at 2550, hatched.', calloutAt: P(nC, 2350),
        reveals: [rect(N1 - 110, head, N1, head + lint), rect(N0, head, N1 - 120, head + lint), ...conc(N1 - 110, head, N1, head + lint, 0.5), ...conc(N0, head, N1 - 120, head + lint, 0.5),
          rect(N0, head + lint, N1, plate), ...hb(N0, head + lint, N1, plate)] },
      { instruction: 'INTERNAL WALL (through the door): the 50 mm wooden frame head at 2100, a single 110 × 75 lintel, and the wall above up to the ceiling. The jamb beyond shows as thin lines.', calloutAt: P(sC, 2300),
        reveals: [rect(W0, head - 50, 0, head), ...grain(W0, head - 50, 0, head), rect(W0, head, 0, head + lint), ...conc(W0, head, 0, head + lint, 0.6),
          rect(W0, head + lint, 0, plate), ...hb(W0, head + lint, 0, plate), L(P(W0, 0), P(W0, head - 50), 'B'), L(P(0, 0), P(0, head - 50), 'B')] },
      { instruction: 'The WALL PLATE (114 × 38) on the north wall and the TIE BEAM of the roof truss on it, spanning the room. Break it off at both ends.', calloutAt: P(1600, plate + 95),
        reveals: [rect(N0, plate, N0 + 114, plate + 38), ...grain(N0, plate, N0 + 114, plate + 38), rect(Lf, plate + 38, N1 + 300, plate + 152), ...grain(Lf + 100, plate + 38, N1 + 200, plate + 152),
          brk(Lf, plate + 38, plate + 152), brk(N1 + 300, plate + 38, plate + 152)] },
      { instruction: 'The CEILING: 38 × 38 brandering under the tie beam (cut, shown with a cross) and the ceiling board on both sides of the internal wall.', calloutAt: P(1600, plate - 5),
        reveals: [...[-400, 300, 750, 1200, 1650, 2100, 2550, 3000].flatMap(u => cross(u, plate, u + 38, plate + 38)), rect(0, plate - 9, N0, plate, 'B'), rect(Lf, plate - 9, W0, plate, 'B')] },
    ];
    const right = [['TIE BEAM / BINDBALK', [3000, plate + 95]], ['WALL PLATE 114 × 38 / MUURPLAAT', [N0 + 57, plate + 19]], ['DOUBLE LINTEL / DUBBELE LATEI', [N1 - 55, head + 40]], ['STEEL WINDOW W1 / STAALVENSTER', [N1 - 140, 1500]],
      ['170 × 35 FIBRE-CEMENT SILL', [N1 - 245, sill + 18]], ['230 BRICK WALL / BAKSTEENMUUR', [nC, 450]], ['DPC / VWL', [nC, -30]], ['FOOTING 600 × 250 / FONDAMENT', [nC + 250, -575]]];
    const left = [['CEILING / PLAFON', [-300, plate - 5]], ['LINTEL / LATEI', [sC, head + 38]], ['DOOR FRAME / DEURKOSYN', [sC, head - 25]], ['FFL / VVV', [-400, 0]], ['SCREED / BLAD', [-500, -12]], ['SURFACE BED / BETONVLOER', [-450, -75]], ['HARDCORE / PUINVULLING', [-350, -230]], ['FOOTING 400 × 250', [sC - 150, -575]]];
    const rz = spread(right.map(r => r[1][1]), 220), lz = spread(left.map(r => r[1][1]), 220);
    steps.push(
      { instruction: 'Label the section: the room and its floor finish, and the parts. Use the abbreviations NGL, FFL and DPC.', calloutAt: P(1800, 1200),
        reveals: [...right.flatMap(([t, at], i) => [L(P(...at), P(Rt + 150, rz[i]), 'B'), L(P(Rt + 150, rz[i]), P(Rt + 220, rz[i]), 'B'), lbl(P(Rt + 260, rz[i] - 30), t, { anchor: 'start', size: 2.2 })]),
          ...left.flatMap(([t, at], i) => [L(P(...at), P(Lf - 200, lz[i]), 'B'), L(P(Lf - 200, lz[i]), P(Lf - 270, lz[i]), 'B'), lbl(P(Lf - 310, lz[i] - 30), t, { anchor: 'end', size: 2.2 })]),
          lbl(P(N1 + 650, ngl + 70), 'NGL / NGV', { size: 2.3 }), lbl(P(1900, 1250), 'BEDROOM / SLAAPKAMER', { size: 2.8 }), lbl(P(1900, 1050), 'CARPET / MAT', Object.assign({ size: 2.3 }, GREY)),
          lbl(P(-380, 1250), 'PASSAGE', Object.assign({ size: 2.2 }, GREY)), lbl(P(-380, 1080), 'GANG', Object.assign({ size: 2.2 }, GREY)), L(P(0, 12), P(N0, 12), 'C')] },
      { instruction: 'Dimension the heights (FFL to the ceiling, the window sill and head) and the footings, and add the title and scale.', calloutAt: P(1600, fBot - 350),
        reveals: [dim(P(700, 0), P(700, plate - 9), 0, '2541'), dim(P(2900, 0), P(2900, sill), 0, '900'), dim(P(2900, sill), P(2900, head), 0, '1200'),
          dim(P(N1, ngl), P(N1, 0), 10, '150'), dim(P(nC - 300, fBot), P(nC + 300, fBot), 8, '600'), dim(P(sC - 200, fBot), P(sC + 200, fBot), 8, '400'),
          lbl(P(1600, fBot - 320), 'SECTIONAL ELEVATION A-A / DEURSNEE A-A', Object.assign({ size: 3.2 }, YEL)), lbl(P(1600, fBot - 520), 'SCALE / SKAAL 1:25', Object.assign({ size: 2.6 }, GREY))] });
    finish('bedroom-section', 'Single Bedroom: Sectional Elevation A-A (1:25)', '1:25',
      'Sectional elevation A-A of the single bedroom at 1:25, looking west: the external wall with the window and a double lintel, the internal wall cut through the door, both foundations, the floor, the wall plate, tie beam and ceiling.',
      'Using the floor plan of the single bedroom, draw to scale 1:25 the complete sectional elevation on cutting plane A-A: both footings (600 × 250 and 400 × 250), foundation walls, DPC, floors, the north wall with window W1, sills and a DOUBLE lintel, the internal wall through door D1, the wall plate (114 × 38), tie beam and ceiling. Show all hatching, label the room with its floor finish and use the abbreviations NGL, FFL and DPC.',
      steps);
  })();
})(window);
