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
})(window);
