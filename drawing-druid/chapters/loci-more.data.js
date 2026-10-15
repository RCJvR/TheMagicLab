// Loci: generated helix and cam exercises (Gr 11-12). Runs after loci.data.js and adds to
// CONSTRUCTIONS and CONSTRUCTION_ORDER. The top view of a helix sits above its front view.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const PL = (points, lineType) => ({ kind: 'polyline', points, lineType: lineType || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const dot = at => ({ kind: 'point', at });
  const rad = d => d * Math.PI / 180;
  // a circular arc as a polyline: centre, radius, from/to angles in maths degrees (y up)
  const arc = (c, r, a0, a1, lt) => {
    const n = Math.max(6, Math.ceil(Math.abs(a1 - a0) / 4));
    return PL(Array.from({ length: n + 1 }, (_, i) => { const a = rad(a0 + (a1 - a0) * i / n); return [c[0] + r * Math.cos(a), c[1] - r * Math.sin(a)]; }), lt);
  };
  // 45° hatching inside a circle
  const hatchCircle = (c, r, sp) => {
    const out = [];
    for (let s = -r + sp / 2; s < r; s += sp) {
      const h = Math.sqrt(r * r - s * s), k = Math.SQRT1_2;
      // lines along (1,-1)/√2, offset s along (1,1)/√2
      const m = [c[0] + s * k, c[1] + s * k];
      out.push(L([m[0] - h * k, m[1] + h * k], [m[0] + h * k, m[1] - h * k], 'B'));
    }
    return out;
  };
  // runs of consecutive visible samples → polylines
  const runs = (pts, vis, lt) => {
    const out = []; let cur = [];
    pts.forEach((p, i) => { if (vis[i]) cur.push(p); else { if (cur.length > 1) out.push(PL(cur, lt)); cur = []; } });
    if (cur.length > 1) out.push(PL(cur, lt));
    return out;
  };
  function finish(id, title, summary, prompt, steps, extra) {
    steps = steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s));
    C[id] = Object.assign({ id, title, summary, workbookPrompt: prompt, steps, printLayout: 'full' }, extra || {});
    ORDER.push(id);
  }

  // ═══ Helix ═══
  //   cfg: kind 'line' (a helix on a solid round shaft) | 'auger' (a blade on a shaft) | 'spring'
  //        D: outside diameter; d: shaft diameter (auger); wire: wire diameter (spring)
  //        pitch, turns, hand 'R' | 'L'
  function helix(cfg) {
    const s = cfg.hand === 'L' ? -1 : 1, p = cfg.pitch, T = cfg.turns, H = p * T;
    const spring = cfg.kind === 'spring', auger = cfg.kind === 'auger';
    const Ro = cfg.D / 2, w = cfg.wire || 0;
    const R = spring ? Ro - w / 2 : Ro, r = auger ? cfg.d / 2 : 0;
    const a0 = 180;                                             // point 0 on the left
    const z0 = spring ? w / 2 : 0, Htot = H + (spring ? w : 0);
    const CX = 30 + Ro + 20, TCY = 22 + Ro, FY = TCY + Ro + 24 + Htot;
    const th = z => a0 + s * 360 * z / p;                        // angle at height z (above z0)
    const P3 = (rho, z) => [rho * Math.cos(rad(th(z))), rho * Math.sin(rad(th(z))), z0 + z];
    const F = q => [CX + q[0], FY - q[2]];                         // front view
    const Tv = q => [CX + q[0], TCY - q[1]];                       // top view (front of the object at the bottom)
    const N = 12, nPts = Math.round(T * N);
    const handTxt = s > 0 ? 'right-hand' : 'left-hand';
    const steps = [];

    // 1. top view
    const top = [L([CX - Ro - 6, TCY], [CX + Ro + 6, TCY], 'centre'), L([CX, TCY - Ro - 6], [CX, TCY + Ro + 6], 'centre'), { kind: 'circle', center: [CX, TCY], r: Ro, lineType: 'A' }];
    if (auger) top.push({ kind: 'circle', center: [CX, TCY], r, lineType: 'A' });
    if (spring) top.push({ kind: 'circle', center: [CX, TCY], r: Ro - w, lineType: 'A' }, { kind: 'circle', center: [CX, TCY], r: R, lineType: 'centre' });
    steps.push({ instruction: 'Draw the TOP VIEW: the centre lines and ' + (spring ? 'the outside and inside circles of the coil, with the centre line of the wire as a chain-line circle.' : auger ? 'the outside circle of the blade and the circle of the shaft.' : 'the circle of the shaft.'),
      calloutAt: [CX + Ro, TCY - Ro], reveals: top });
    // 2. divisions
    const divs = Array.from({ length: N }, (_, k) => a0 + s * 30 * k);
    steps.push({ instruction: 'Divide the ' + (spring ? 'centre-line circle' : 'outside circle') + ' into 12 equal parts. Number them from the starting point 0, in the direction of rotation: a ' + handTxt + ' helix that rises turns ' + (s > 0 ? 'ANTICLOCKWISE' : 'CLOCKWISE') + ' seen from above.',
      calloutAt: [CX - Ro, TCY],
      reveals: divs.flatMap((a, k) => {
        const e = [CX + Ro * Math.cos(rad(a)), TCY - Ro * Math.sin(rad(a))], t = [CX + (Ro + 5) * Math.cos(rad(a)), TCY - (Ro + 5) * Math.sin(rad(a)) + 1.2];
        return [L([CX, TCY], e, 'construction'), lbl(t, k === 0 ? '0/12' : String(k), { size: 2.8, color: '#eab308' })];
      }) });
    // 3. front-view outline
    const outline = [L([CX, FY + 5], [CX, FY - Htot - 5], 'centre'), L([CX - Ro - 4, FY], [CX + Ro + 4, FY], 'B')];
    if (cfg.kind === 'line') outline.push({ kind: 'polygon', points: [[CX - R, FY], [CX + R, FY], [CX + R, FY - H], [CX - R, FY - H]], lineType: 'A' });
    steps.push({ instruction: 'Start the FRONT VIEW below it: the centre line and the base line' + (cfg.kind === 'line' ? ', and the outline of the shaft (' + cfg.D + ' mm by ' + H + ' mm).' : '.'),
      calloutAt: [CX, FY - Htot / 2], reveals: outline });
    // 4. heights, one step per turn
    const xL = CX - Ro - 12, xR = CX + Ro + 4;
    for (let t = 0; t < Math.ceil(T); t++) {
      const k1 = Math.min(nPts, (t + 1) * N), ks = [];
      for (let k = t === 0 ? 0 : t * N + 1; k <= k1; k++) ks.push(k);
      steps.push({ instruction: (t === 0 ? 'Mark the pitch (' + p + ' mm, one full turn) up the side and divide it into 12 equal parts. Draw thin horizontal lines through the marks.' : 'Do the same for the next turn' + (k1 - t * N < N ? ' (half a turn: 6 parts).' : '.')) + (spring ? ' Measure from the centre of the wire, ' + (w / 2) + ' mm above the base.' : ''),
        calloutAt: [xL, FY - z0 - (t + 0.5) * p],
        reveals: [...ks.map(k => L([xL, FY - z0 - k * p / N], [xR, FY - z0 - k * p / N], 'construction')), ...ks.filter(k => k % 3 === 0).map(k => lbl([xL - 2, FY - z0 - k * p / N + 1], String(k % 12 === 0 && k ? 12 : k % 12), { size: 2.6, anchor: 'end', color: '#eab308' }))] });
    }
    // 5. project the divisions down
    const xs = []; divs.forEach(a => { const x = R * Math.cos(rad(a)); if (!xs.some(v => Math.abs(v - x) < 0.05)) xs.push(x); });
    const tvR = R;
    steps.push({ instruction: 'Project each division point straight down from the top view into the front view.',
      calloutAt: [CX + R, (TCY + FY - Htot) / 2], reveals: xs.map(x => L([CX + x, TCY - Math.sqrt(Math.max(0, tvR * tvR - x * x)) * 0], [CX + x, FY - z0], 'construction')) });
    if (auger) {
      const xi = []; divs.forEach(a => { const x = r * Math.cos(rad(a)); if (!xi.some(v => Math.abs(v - x) < 0.05)) xi.push(x); });
      steps.push({ instruction: 'Do the same for the points where the radial lines cross the shaft circle.', calloutAt: [CX + r, (TCY + FY - Htot) / 2], reveals: xi.map(x => L([CX + x, TCY], [CX + x, FY], 'construction')) });
    }
    // 6. plot the points, one step per turn
    for (let t = 0; t < Math.ceil(T); t++) {
      const k1 = Math.min(nPts, (t + 1) * N), ks = [];
      for (let k = t * N; k <= k1; k++) ks.push(k);
      steps.push({ instruction: t === 0 ? 'Point 0 lies on line 0, point 1 where projector 1 crosses height line 1, and so on. Mark the points of the first turn.' : 'Mark the points of the next turn the same way.',
        calloutAt: F(P3(R, (t + 0.5) * p)), reveals: [...ks.map(k => dot(F(P3(R, k * p / N)))), ...(auger ? ks.map(k => dot(F(P3(r, k * p / N)))) : [])] });
    }
    // 7. the curves
    const M = Math.ceil(T * 180);
    const samp = rho => Array.from({ length: M + 1 }, (_, i) => P3(rho, H * i / M));
    if (cfg.kind === 'line') {
      const q = samp(R);
      steps.push({ instruction: 'Join the points with a smooth curve. Only the FRONT half of each turn is seen; the back half is behind the shaft (no hidden detail is needed).',
        calloutAt: F(q[Math.round(M * 0.25 / T)]), reveals: runs(q.map(F), q.map(v => v[1] <= 1e-6)) });
    } else if (auger) {
      const blocked = v => {
        if (Math.abs(v[0]) < r - 1e-6 && v[1] > 1e-6) return true;            // behind the shaft
        const zz = v[2] - z0, t0 = rad(th(zz)), c = Math.cos(t0);
        if (zz < -1e-6 || zz > H + 1e-6 || Math.abs(c) < 1e-6) return false;
        const rho = v[0] / c;
        return rho >= r - 1e-6 && rho <= R + 1e-6 && rho * Math.sin(t0) < v[1] - 0.05;
      };
      const qo = samp(R), qi = samp(r);
      steps.push({ instruction: 'Join the outside points with a smooth curve. Leave out the parts the blade or the shaft hides.', calloutAt: F(qo[Math.round(M * 0.25 / T)]), reveals: runs(qo.map(F), qo.map(v => !blocked(v))) });
      steps.push({ instruction: 'Join the points on the shaft with a smooth curve: where the blade meets the shaft. Only the parts in front of the shaft are seen.', calloutAt: F(qi[Math.round(M * 0.25 / T)]), reveals: runs(qi.map(F), qi.map(v => !blocked(v) && v[1] <= 1e-6)) });
      const sh = [], edge = (x0) => { const pts = Array.from({ length: 121 }, (_, i) => [x0, 0, H * i / 120]); return runs(pts.map(F), pts.map(v => !blocked([v[0], -1e-4, v[2]]))); };
      sh.push(...edge(-r), ...edge(r), L(F([-r, 0, 0]), F([r, 0, 0])), L(F([-r, 0, H]), F([r, 0, H])));
      const ends = [0, H].map(zz => { const a = P3(r, zz), b = P3(R, zz); return L(F(a), F(b)); });
      steps.push({ instruction: 'Draw the shaft: its two sides, broken where the blade passes in front of it, and the straight edges at the start and end of the blade.', calloutAt: [CX + r, FY - H / 2], reveals: [...sh, ...ends] });
    } else {
      const qc = samp(R);
      steps.push({ instruction: 'Join the points with a smooth chain line: the centre line of the wire.', calloutAt: F(qc[Math.round(M * 0.25 / T)]), reveals: [PL(qc.map(F), 'centre')] });
      const ks = []; for (let k = 0; k <= nPts; k++) ks.push(k);
      steps.push({ instruction: 'With each point as centre, draw a circle the size of the wire (Ø' + w + ').', calloutAt: F(P3(R, p / 4)), reveals: ks.map(k => ({ kind: 'circle', center: F(P3(R, k * p / N)), r: w / 2, lineType: 'construction' })) });
      // outline: offsets of the projected centre line, hidden where a nearer part of the wire covers them
      const c2 = qc.map(F), side = [], sideB = [];
      const tangent = i => { const a = c2[Math.max(0, i - 1)], b = c2[Math.min(c2.length - 1, i + 1)]; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
      c2.forEach((c, i) => { const t = tangent(i); side.push([c[0] - t[1] * w / 2, c[1] + t[0] * w / 2]); sideB.push([c[0] + t[1] * w / 2, c[1] - t[0] * w / 2]); });
      const visOf = pts => pts.map((pt, i) => !qc.some((q, j) => Math.abs(i - j) > M / T / 4 && q[1] < qc[i][1] - 0.5 && Math.hypot(c2[j][0] - pt[0], c2[j][1] - pt[1]) < w / 2 - 0.05));
      steps.push({ instruction: 'Draw the outline of the wire: smooth curves touching the circles on both sides. Where a coil at the front crosses one at the back, the front coil hides the back one.',
        calloutAt: side[Math.round(M * 0.25 / T)], reveals: [...runs(side, visOf(side)), ...runs(sideB, visOf(sideB))] });
      steps.push({ instruction: 'The wire is cut square at the start and the end: show the two cut ends as hatched circles.',
        calloutAt: c2[0], reveals: [c2[0], c2[c2.length - 1]].flatMap(c => [{ kind: 'circle', center: c, r: w / 2, lineType: 'A' }, ...hatchCircle(c, w / 2, 1.8)]) });
    }
    // 8. labels and dimensions
    steps.push({ instruction: 'Add the pitch dimension and label the views.',
      calloutAt: [CX, FY + 8],
      reveals: [{ kind: 'dimension', p1: [CX + Ro + 10, FY - z0], p2: [CX + Ro + 10, FY - z0 - p], offset: 6, text: 'PITCH ' + p },
        lbl([CX, TCY + Ro + 12], 'TOP VIEW / BOAANSIG', GREY), lbl([CX, FY + 8], 'FRONT VIEW / VOORAANSIG', GREY),
        lbl([CX, FY + 13], (s > 0 ? 'RIGHT-HAND / REGSHANDIGE ' : 'LEFT-HAND / LINKSHANDIGE ') + (cfg.kind === 'spring' ? 'COIL SPRING / KRONKELVEER' : cfg.kind === 'auger' ? 'AUGER / AWEGAAR' : 'HELIX / HELIKS'), Object.assign({ size: 2.8 }, YEL))] });
    finish(cfg.id, cfg.title, cfg.summary, cfg.prompt, steps);
  }

  // ═══ Cam ═══
  //   cfg: base (min distance cam profile → shaft centre), shaft (Ø), dir 'cw' | 'ccw', follower
  //        'knife' | 'roller', roller (Ø), sc (graph mm per 30°), segs [{ to, lift, law }]
  const LAW = {
    uniform: t => t,
    shm: t => (1 - Math.cos(Math.PI * t)) / 2,
    uarm: t => t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t),
  };
  const LAWNAME = { uniform: 'uniform motion', shm: 'simple harmonic motion', uarm: 'uniform acceleration and retardation' };
  function cam(cfg) {
    const segs = []; let a = 0, sNow = 0;
    cfg.segs.forEach(g => { segs.push(Object.assign({ a, b: g.to, s0: sNow, s1: sNow + (g.lift || 0) }, g)); a = g.to; sNow += g.lift || 0; });
    const disp = th => { const g = segs.find(q => th >= q.a - 1e-9 && th <= q.b + 1e-9) || segs[segs.length - 1]; if (!g.lift) return g.s0; return g.s0 + g.lift * LAW[g.law]((th - g.a) / (g.b - g.a)); };
    const maxS = Math.max(...segs.map(g => Math.max(g.s0, g.s1)));
    const roller = cfg.follower === 'roller', rr = roller ? cfg.roller / 2 : 0;
    const R0 = cfg.base + rr;                                       // radius of the lowest follower point
    const Rmax = R0 + maxS + rr;
    const cx = 30 + Rmax, cy = 50 + R0 + maxS + 10;
    const baseY = cy - R0;
    const sc = cfg.sc || 10, GX = cx + Rmax + 28;
    const gx = th => GX + th / 30 * sc, gy = s => baseY - s;
    const alpha = th => cfg.dir === 'cw' ? 90 + th : 90 - th;
    const camPt = (th, rho) => { const al = rad(alpha(th)); return [cx + rho * Math.cos(al), cy - rho * Math.sin(al)]; };
    const steps = [];
    const segName = g => !g.lift ? 'DWELL / RUS' : g.lift > 0 ? 'RISE / STYG' : 'FALL / DAAL';

    // graph
    steps.push({ instruction: 'DISPLACEMENT GRAPH: draw the base line, ' + (12 * sc) + ' mm long for 360° (scale ' + sc + ' mm = 30°), level with the lowest position of the follower' + (roller ? '\'s roller centre' : ' point') + '. Divide it every 30° and draw thin verticals.',
      calloutAt: [gx(180), baseY + 6],
      reveals: [L([gx(0), baseY], [gx(360), baseY], 'A'), ...Array.from({ length: 13 }, (_, k) => L([gx(30 * k), baseY], [gx(30 * k), baseY - maxS - 4], 'construction')),
        ...Array.from({ length: 13 }, (_, k) => lbl([gx(30 * k), baseY + 4.5], (30 * k) + '°', { size: 2.2, color: '#eab308' }))] });
    segs.forEach((g, i) => {
      const ks = [0, 1, 2, 3, 4, 5, 6], pts = ks.map(k => { const t = g.a + (g.b - g.a) * k / 6; return [gx(t), gy(disp(t))]; });
      if (!g.lift) {
        steps.push({ instruction: g.a + '° to ' + g.b + '°: DWELL. The follower stays at ' + g.s0 + ' mm: a horizontal line.', calloutAt: [gx((g.a + g.b) / 2), gy(g.s0) - 3], reveals: [L([gx(g.a), gy(g.s0)], [gx(g.b), gy(g.s0)])] });
        return;
      }
      const verb = g.lift > 0 ? 'rises' : 'falls';
      const divs = ks.slice(1, 6).map(k => L([gx(g.a + (g.b - g.a) * k / 6), baseY], [gx(g.a + (g.b - g.a) * k / 6), gy(Math.max(g.s0, g.s1)) - 2], 'construction'));
      if (g.law === 'uniform') {
        steps.push({ instruction: g.a + '° to ' + g.b + '°: the follower ' + verb + ' ' + Math.abs(g.lift) + ' mm with UNIFORM MOTION: a straight line.', calloutAt: [gx((g.a + g.b) / 2), gy((g.s0 + g.s1) / 2) - 3], reveals: [L(pts[0], pts[6])] });
        return;
      }
      const h = Math.abs(g.lift), lo = Math.min(g.s0, g.s1);
      if (g.law === 'shm') {
        // semicircle on the lift, on the vertical at the start of the part, bulging to the left
        const ccx = gx(g.a), ccy = gy(lo + h / 2);
        const semi = arc([ccx, ccy], h / 2, 90, 270, 'construction');
        const sp = ks.map(k => [ccx - (h / 2) * Math.sin(Math.PI * k / 6), ccy + (g.lift > 0 ? 1 : -1) * (h / 2) * Math.cos(Math.PI * k / 6)]);
        steps.push({ instruction: g.a + '° to ' + g.b + '°: the follower ' + verb + ' ' + h + ' mm with SIMPLE HARMONIC MOTION. Divide this part of the graph into 6 equal parts. Draw a semicircle on the ' + h + ' mm lift beside the graph and divide it into 6 equal parts (30° each).',
          calloutAt: [ccx, ccy], reveals: [...divs, semi, L([ccx, gy(lo)], [ccx, gy(lo + h)], 'construction'), ...sp.map(q => dot(q))] });
        steps.push({ instruction: 'Project each point on the semicircle across to its matching vertical (point 1 to line 1, and so on).', calloutAt: [gx((g.a + g.b) / 2), gy(lo + h / 2)], reveals: ks.map(k => L(sp[k], pts[k], 'construction')) });
      } else {
        steps.push({ instruction: g.a + '° to ' + g.b + '°: the follower ' + verb + ' ' + h + ' mm with UNIFORM ACCELERATION AND RETARDATION. Divide this part of the graph into 6 equal parts. Divide the lift in the ratio 1 : 3 : 5 : 5 : 3 : 1 (heights 1, 4, 9 parts of 18, then mirrored) and draw thin lines across at those heights.',
          calloutAt: [gx((g.a + g.b) / 2), gy(lo + h / 2)], reveals: [...divs, ...ks.map(k => L([gx(g.a) - 4, pts[k][1]], [pts[k][0], pts[k][1]], 'construction'))] });
      }
      steps.push({ instruction: 'Mark where each height line meets its vertical and join the points with a smooth curve.', calloutAt: pts[3], reveals: [...pts.map(dot), PL(Array.from({ length: 31 }, (_, i) => { const t = g.a + (g.b - g.a) * i / 30; return [gx(t), gy(disp(t))]; }))] });
    });
    steps.push({ instruction: 'Label each part of the graph and give its scale.', calloutAt: [gx(180), baseY + 10],
      reveals: [...segs.flatMap(g => { const n = segName(g).split(' / '), at = [gx((g.a + g.b) / 2), gy(Math.max(g.s0, g.s1)) - 7]; return [lbl(at, n[0], Object.assign({ size: 2.3 }, YEL)), lbl([at[0], at[1] + 3], n[1], Object.assign({ size: 2 }, YEL))]; }),
        lbl([gx(180), baseY + 10], 'DISPLACEMENT GRAPH / VERPLASINGSGRAFIEK', GREY), lbl([gx(180), baseY + 14.5], 'SCALE ' + sc + ' mm = 30° / SKAAL ' + sc + ' mm = 30°', Object.assign({ size: 2.6 }, GREY))] });

    // cam
    const shaft = cfg.shaft / 2;
    steps.push({ instruction: 'CAM: draw the centre lines and the camshaft (Ø' + cfg.shaft + '). Draw a thin circle of radius ' + R0 + ' mm: the ' + (roller ? 'path of the roller centre at its lowest (base circle + roller radius)' : 'base circle, the minimum distance from the profile to the centre') + '.',
      calloutAt: [cx + R0, cy], reveals: [L([cx - Rmax - 4, cy], [cx + Rmax + 4, cy], 'centre'), L([cx, cy + Rmax + 4], [cx, baseY - maxS - 8], 'centre'),
        { kind: 'circle', center: [cx, cy], r: shaft, lineType: 'A' }, { kind: 'circle', center: [cx, cy], r: R0, lineType: 'construction' }, ...(roller ? [{ kind: 'circle', center: [cx, cy], r: cfg.base, lineType: 'construction' }] : [])] });
    const fol = [];
    if (roller) {
      fol.push({ kind: 'circle', center: [cx, baseY], r: rr, lineType: 'A' }, dot([cx, baseY]), PL([[cx - 5, baseY - rr + 1], [cx - 5, baseY - rr - 30]]), PL([[cx + 5, baseY - rr + 1], [cx + 5, baseY - rr - 30]]));
    } else {
      fol.push(PL([[cx - 5, baseY - 30], [cx - 5, baseY - 8.66], [cx, baseY], [cx + 5, baseY - 8.66], [cx + 5, baseY - 30]]));
    }
    steps.push({ instruction: 'Draw the ' + (roller ? 'ROLLER follower (Ø' + cfg.roller + ' roller)' : 'KNIFE-EDGE (wedge-ended) follower') + ' in its lowest position on the vertical centre line.', calloutAt: [cx + 6, baseY - 20], reveals: fol });
    // rotation arrow on the shaft
    const ar = shaft + 5, aa = cfg.dir === 'cw' ? [150, 60] : [30, 120];
    const tip = [cx + ar * Math.cos(rad(aa[1])), cy - ar * Math.sin(rad(aa[1]))];
    const tdir = cfg.dir === 'cw' ? -1 : 1, tg = [-Math.sin(rad(aa[1])) * tdir, -Math.cos(rad(aa[1])) * tdir];
    steps.push({ instruction: 'Show the direction of rotation (' + (cfg.dir === 'cw' ? 'clockwise' : 'anticlockwise') + ') with an arrow on the shaft.', calloutAt: tip,
      reveals: [arc([cx, cy], ar, aa[0], aa[1], 'B'), PL([[tip[0] - tg[0] * 2.5 + tg[1] * 1.3, tip[1] - tg[1] * 2.5 - tg[0] * 1.3], tip, [tip[0] - tg[0] * 2.5 - tg[1] * 1.3, tip[1] - tg[1] * 2.5 + tg[0] * 1.3]], 'B')] });
    // radial lines
    const angs = []; segs.forEach(g => { for (let k = 0; k <= 6; k += g.lift ? 1 : 6) { const t = g.a + (g.b - g.a) * k / 6; if (!angs.some(v => Math.abs(v - t) < 1e-6) && t < 360 - 1e-6) angs.push(t); } });
    const main = angs.filter(t => Math.abs(t / 30 - Math.round(t / 30)) < 1e-6), extra = angs.filter(t => !main.includes(t));
    const radial = list => list.flatMap(t => [L([cx, cy], camPt(t, Rmax + 4), 'construction'), lbl(camPt(t, Rmax + 8), t + '°', { size: 2.3, color: '#eab308' })]);
    steps.push({ instruction: 'Draw radial lines every 30°, starting on the follower line (0°). Number them AGAINST the direction of rotation: the cam turns ' + (cfg.dir === 'cw' ? 'clockwise' : 'anticlockwise') + ', so the 30° line is the one that comes under the follower next.',
      calloutAt: camPt(30, Rmax), reveals: radial(main) });
    if (extra.length) steps.push({ instruction: 'Add radial lines at the extra divisions of the graph (where a part is divided into 6 and does not fall on a 30° line).', calloutAt: camPt(extra[0], Rmax), reveals: radial(extra) });
    // transfer, one step per segment
    const ptsOf = g => [0, 1, 2, 3, 4, 5, 6].map(k => g.a + (g.b - g.a) * k / 6);
    const transfer = (ths, text) => {
      const out = [], seen = [];
      ths.forEach(t => {
        if (t >= 360 - 1e-6 || seen.includes(t)) return; seen.push(t);
        const rho = R0 + disp(t), y = cy - rho;
        out.push(L([gx(t), gy(disp(t))], [cx, y], 'construction'));
        let sw = ((alpha(t) - 90) % 360 + 540) % 360 - 180;
        if (Math.abs(sw) > 1e-6) out.push(arc([cx, cy], rho, 90, 90 + sw, 'construction'));
        out.push(dot(camPt(t, rho)));
      });
      return { instruction: text, calloutAt: camPt(ths[3] || ths[0], R0 + disp(ths[3] || ths[0])), reveals: out };
    };
    segs.forEach((g, i) => {
      const ths = g.lift ? ptsOf(g) : [g.a, g.b];
      steps.push(transfer(ths, i === 0 ? 'Transfer the displacements: project each graph point across to the follower line, then swing it round with a compass, about the shaft centre, to its radial line. ' + g.a + '° to ' + g.b + '° first.' : 'Transfer ' + g.a + '° to ' + g.b + '° the same way' + (g.lift ? '.' : ' (a dwell: one arc of constant radius).')));
    });
    // profile
    const prof = [];
    if (roller) {
      const ths = angs.filter(t => t < 360);
      steps.push({ instruction: 'With each point as centre, draw the roller (Ø' + cfg.roller + '): these are the positions of the roller around the cam.', calloutAt: camPt(90, R0 + disp(90)), reveals: ths.map(t => ({ kind: 'circle', center: camPt(t, R0 + disp(t)), r: rr, lineType: 'construction' })) });
      const centres = Array.from({ length: 360 }, (_, i) => { const q = camPt(i, R0 + disp(i)); return [q[0] - cx, cy - q[1]]; });
      for (let psi = 0; psi <= 360; psi += 1.5) {
        const u = [Math.cos(rad(psi)), Math.sin(rad(psi))];
        let best = Infinity;
        centres.forEach(P => { const d = P[0] * u[0] + P[1] * u[1], pp = P[0] * P[0] + P[1] * P[1] - d * d; if (d > 0 && pp <= rr * rr) best = Math.min(best, d - Math.sqrt(rr * rr - pp)); });
        if (best < Infinity) prof.push([cx + best * u[0], cy - best * u[1]]);
      }
      steps.push({ instruction: 'Draw the CAM PROFILE: a smooth curve touching the inside of every roller circle.', calloutAt: camPt(180, cfg.base + disp(180)), reveals: [{ kind: 'polygon', points: prof, lineType: 'A' }] });
    } else {
      for (let t = 0; t < 360; t += 2) prof.push(camPt(t, R0 + disp(t)));
      steps.push({ instruction: 'Draw the CAM PROFILE: a smooth curve through all the points.', calloutAt: camPt(180, R0 + disp(180)), reveals: [{ kind: 'polygon', points: prof, lineType: 'A' }] });
    }
    steps.push({ instruction: 'Label the parts of the cam to match the graph.', calloutAt: [cx, cy + Rmax + 8],
      reveals: [...segs.map(g => lbl(camPt((g.a + g.b) / 2, Math.max(shaft + 8, (R0 + disp((g.a + g.b) / 2)) * 0.6)), segName(g), Object.assign({ size: 2.4 }, YEL))),
        lbl([cx, cy + Rmax + 16], 'CAM PROFILE / NOKPROFIEL', GREY)] });
    finish(cfg.id, cfg.title, cfg.summary, cfg.prompt, steps);
  }

  // ═══ Square thread (single start): crest and root helices, half a pitch apart ═══
  //   cfg: D (outside), d (core), pitch, turns, hand
  function squareThread(cfg) {
    const s = cfg.hand === 'L' ? -1 : 1, p = cfg.pitch, T = cfg.turns, H = p * T, R = cfg.D / 2, r = cfg.d / 2;
    const a0 = 180, CX = 30 + R + 20, TCY = 22 + R, FY = TCY + R + 24 + H;
    const th = z => a0 + s * 360 * z / p;
    const P3 = (rho, z, dz) => { const a = rad(th(z)); return [rho * Math.cos(a), rho * Math.sin(a), z + (dz || 0)]; };
    const F = q => [CX + q[0], FY - q[2]];
    // the thread (ridge) occupies the band where the phase is in [0, p/2)
    const inRidge = (x, y, z) => {
      const rho = Math.hypot(x, y);
      if (rho <= r + 1e-6) return z >= -1e-6 && z <= H + 1e-6;
      if (rho > R + 1e-6 || z < 0 || z > H) return false;
      let phi = Math.atan2(y, x) * 180 / Math.PI;
      // height of the ridge's lower flank at this angle, then the phase of z above it
      const base = s * (phi - a0) / 360 * p;
      const ph = (((z - base) % p) + p) % p;
      return ph < p / 2 - 1e-6;
    };
    const hiddenAt = q => {
      for (let t = 0.35; q[1] - t > -R - 1; t += 0.35) if (inRidge(q[0], q[1] - t, q[2])) return true;
      return false;
    };
    const M = Math.ceil(T * 240);
    // the whole threaded length: each helix runs from the bottom end to the top end
    const curve = (rho, dz) => Array.from({ length: M + 1 }, (_, i) => P3(rho, -dz + (H + dz) * i / M, dz)).filter(q => q[2] >= -1e-6 && q[2] <= H + 1e-6);
    const runs = (pts, lt) => { const out = []; let cur = []; pts.forEach(q => { if (!hiddenAt(q)) cur.push(F(q)); else { if (cur.length > 1) out.push(PL(cur, lt)); cur = []; } }); if (cur.length > 1) out.push(PL(cur, lt)); return out; };
    const N = 12, divs = Array.from({ length: N }, (_, k) => a0 + s * 30 * k);
    const xsOf = rho => { const xs = []; divs.forEach(a => { const x = rho * Math.cos(rad(a)); if (!xs.some(v => Math.abs(v - x) < 0.05)) xs.push(x); }); return xs; };
    // side profile at the left (x = -R) and right (x = +R): crests and roots
    const side = sx => {
      const out = [], phiDeg = sx < 0 ? 180 : 0, base = s * (phiDeg - a0) / 360 * p;
      const zs = []; for (let k = -2; k <= 2 * T + 2; k++) zs.push(base + k * p / 2);
      for (let k = 0; k + 1 < zs.length; k++) {
        const z0 = Math.max(0, zs[k]), z1 = Math.min(H, zs[k + 1]);
        if (z1 - z0 < 1e-6) continue;
        const ridge = ((((zs[k] - base) % p) + p) % p) < 1e-6;
        const xr = sx * (ridge ? R : r);
        out.push(L([CX + xr, FY - z0], [CX + xr, FY - z1]));
        if (zs[k + 1] < H - 1e-6 && zs[k + 1] > 1e-6) out.push(L([CX + sx * r, FY - zs[k + 1]], [CX + sx * R, FY - zs[k + 1]]));
      }
      return out;
    };
    const handTxt = s > 0 ? 'right-hand' : 'left-hand';
    const steps = [
      { instruction: 'Draw the TOP VIEW: the outside circle (Ø' + cfg.D + ') and the core circle (Ø' + cfg.d + ') with their centre lines. A square thread is as deep as half the pitch is wide: depth ' + (R - r) + ', width ' + p / 2 + '.',
        calloutAt: [CX + R, TCY - R], reveals: [L([CX - R - 6, TCY], [CX + R + 6, TCY], 'centre'), L([CX, TCY - R - 6], [CX, TCY + R + 6], 'centre'), { kind: 'circle', center: [CX, TCY], r: R, lineType: 'A' }, { kind: 'circle', center: [CX, TCY], r, lineType: 'A' }] },
      { instruction: 'Divide both circles into 12 equal parts and number them from 0, in the direction of rotation (' + (s > 0 ? 'anticlockwise' : 'clockwise') + ' seen from above for a ' + handTxt + ' thread).',
        calloutAt: [CX - R, TCY], reveals: divs.flatMap((a, k) => { const e = [CX + R * Math.cos(rad(a)), TCY - R * Math.sin(rad(a))], t = [CX + (R + 5) * Math.cos(rad(a)), TCY - (R + 5) * Math.sin(rad(a)) + 1.2]; return [L([CX, TCY], e, 'construction'), lbl(t, k === 0 ? '0/12' : String(k), { size: 2.8, color: '#eab308' })]; }) },
      { instruction: 'Start the FRONT VIEW: the centre line, the ends of the threaded length (' + H + ' mm) and the core lines (Ø' + cfg.d + ') in thin lines.',
        calloutAt: [CX, FY - H / 2], reveals: [L([CX, FY + 5], [CX, FY - H - 5], 'centre'), L([CX - R, FY], [CX + R, FY]), L([CX - R, FY - H], [CX + R, FY - H]), L([CX - r, FY], [CX - r, FY - H], 'construction'), L([CX + r, FY], [CX + r, FY - H], 'construction')] },
      { instruction: 'Divide each pitch (' + p + ' mm) into 12 equal parts up the side and draw thin horizontal lines through the marks.',
        calloutAt: [CX - R - 12, FY - p / 2], reveals: Array.from({ length: Math.round(T * N) + 1 }, (_, k) => L([CX - R - 12, FY - k * p / N], [CX + R + 4, FY - k * p / N], 'construction')) },
      { instruction: 'Project the outside division points straight down into the front view.', calloutAt: [CX + R, (TCY + FY - H) / 2], reveals: xsOf(R).map(x => L([CX + x, TCY], [CX + x, FY], 'construction')) },
      { instruction: 'Project the core division points down as well.', calloutAt: [CX + r, (TCY + FY - H) / 2], reveals: xsOf(r).map(x => L([CX + x, TCY], [CX + x, FY], 'construction')) },
      { instruction: 'Draw the outline of the thread on both sides: the crests (Ø' + cfg.D + ') and roots (Ø' + cfg.d + '), each ' + p / 2 + ' long, joined by the flanks.', calloutAt: [CX - R, FY - p], reveals: [...side(-1), ...side(1)] },
      { instruction: 'Plot the CREST helices: point k where projector k meets height line k. There are two, half a pitch apart (the top and the bottom edge of the thread). Draw the parts you can see.',
        calloutAt: F(P3(R, p / 4)), reveals: [...runs(curve(R, 0), 'A'), ...runs(curve(R, p / 2), 'A')] },
      { instruction: 'Plot the ROOT helices on the core the same way. Only short pieces show, in the grooves between the threads.',
        calloutAt: F(P3(r, p / 4)), reveals: [...runs(curve(r, 0), 'A'), ...runs(curve(r, p / 2), 'A')] },
      { instruction: 'Add the pitch and the thread width, and label the view.', calloutAt: [CX, FY + 8],
        reveals: [{ kind: 'dimension', p1: [CX + R + 10, FY], p2: [CX + R + 10, FY - p], offset: 6, text: 'PITCH ' + p },
          lbl([CX, TCY + R + 12], 'TOP VIEW / BOAANSIG', GREY), lbl([CX, FY + 8], 'FRONT VIEW / VOORAANSIG', GREY),
          lbl([CX, FY + 13], (s > 0 ? 'RIGHT-HAND / REGSHANDIGE' : 'LEFT-HAND / LINKSHANDIGE') + ' SQUARE THREAD / VIERKANTSKROEFDRAAD', Object.assign({ size: 2.8 }, YEL))] },
    ];
    finish(cfg.id, cfg.title, cfg.summary, cfg.prompt, steps);
  }

  // ═══ Exercises ═══
  helix({ id: 'helix-line-rh', title: 'Helix on a Shaft: Right-Hand, One Turn', kind: 'line', D: 60, pitch: 72, turns: 1, hand: 'R',
    summary: 'One turn of a right-hand helix on a Ø60 shaft: divide the top view into 12, the pitch into 12, and plot the front half of the curve.',
    prompt: 'A point moves round a Ø60 shaft, starting at 0 on the left, and rises 72 mm in one full turn (right-hand). Draw the top view and the front view of the helix to scale 1:1. Show all construction; no hidden detail.' });
  helix({ id: 'helix-line-lh', title: 'Helix on a Shaft: Left-Hand, Two Turns', kind: 'line', D: 64, pitch: 48, turns: 2, hand: 'L',
    summary: 'Two turns of a left-hand helix on a Ø64 shaft with a 48 mm pitch: the same method, turned the other way.',
    prompt: 'Draw two turns of a LEFT-hand helix on a Ø64 shaft, pitch 48 mm, starting at 0 on the left. Draw the top view and front view to scale 1:1. Show all construction; no hidden detail.' });
  helix({ id: 'auger-rh', title: 'Auger: Right-Hand, One and a Half Turns', kind: 'auger', D: 80, d: 28, pitch: 60, turns: 1.5, hand: 'R',
    summary: 'A right-hand auger blade on a Ø28 shaft: two helices, one on the outside of the blade and one where it meets the shaft, with the shaft hidden where the blade passes in front.',
    prompt: 'A right-hand single-start auger has an outside diameter of 80 mm, a Ø28 shaft and a pitch of 60 mm. Starting at 0 on the left, draw one and a half turns in the front view, with the top view. Scale 1:1, no hidden detail.' });
  helix({ id: 'auger-lh', title: 'Auger: Left-Hand, Two Turns', kind: 'auger', D: 76, d: 24, pitch: 50, turns: 2, hand: 'L',
    summary: 'Two turns of a left-hand auger: plot both helices, then decide which parts the blade hides.',
    prompt: 'A left-hand single-start auger: outside diameter 76 mm, shaft Ø24, pitch 50 mm. Draw two turns in the front view, starting at 0 on the left, with the top view. Scale 1:1, no hidden detail.' });
  helix({ id: 'spring-rh', title: 'Coil Spring: Right-Hand, One and a Half Turns', kind: 'spring', D: 72, wire: 12, pitch: 60, turns: 1.5, hand: 'R',
    summary: 'A right-hand coil spring of round wire: plot the helix of the wire\'s centre, draw the wire at each point, then the outline touching the circles.',
    prompt: 'A right-hand coil spring: outside diameter 72 mm, round wire Ø12, pitch 60 mm. Draw one and a half turns in the front view, starting at 0 on the left, with the top view. Show the cut ends hatched. Scale 1:1.' });
  helix({ id: 'spring-lh', title: 'Coil Spring: Left-Hand, Two Turns', kind: 'spring', D: 66, wire: 10, pitch: 46, turns: 2, hand: 'L',
    summary: 'Two turns of a left-hand coil spring: the front coils hide parts of the back coils.',
    prompt: 'A left-hand coil spring: outside diameter 66 mm, round wire Ø10, pitch 46 mm. Draw two turns in the front view with the top view, starting at 0 on the left. Show the cut ends hatched. Scale 1:1.' });

  squareThread({ id: 'square-thread-rh', title: 'Square Thread: Right-Hand, One and a Half Turns', D: 70, d: 50, pitch: 40, turns: 1.5, hand: 'R',
    summary: 'A single-start right-hand square thread: two crest helices and two root helices, half a pitch apart, with the square profile showing on each side.',
    prompt: 'A single-start right-hand square thread has an outside diameter of 70 mm, a core diameter of 50 mm and a pitch of 40 mm. Draw the top view and one and a half turns in the front view, starting at 0 on the left. Scale 1:1, no hidden detail.' });
  cam({ id: 'cam-knife-uniform', title: 'Cam: Knife-Edge Follower, Uniform Motion', follower: 'knife', base: 26, shaft: 22, dir: 'cw', sc: 10,
    segs: [{ to: 150, lift: 30, law: 'uniform' }, { to: 210 }, { to: 330, lift: -30, law: 'uniform' }, { to: 360 }],
    summary: 'Uniform motion: draw the displacement graph, then transfer it radially to the cam to find the profile for a knife-edge follower.',
    prompt: 'A cam turning clockwise lifts a knife-edge follower in line with the shaft. Camshaft Ø22; minimum distance from the profile to the shaft centre 26 mm. 0°–150°: rise 30 mm, uniform motion; 150°–210°: dwell; 210°–330°: fall 30 mm, uniform motion; 330°–360°: dwell. Draw the displacement graph (10 mm = 30°) and the cam profile, scale 1:1.' });
  cam({ id: 'cam-knife-shm-uarm', title: 'Cam: Knife-Edge, SHM Rise and UARM Fall', follower: 'knife', base: 24, shaft: 20, dir: 'ccw', sc: 10,
    segs: [{ to: 120, lift: 36, law: 'shm' }, { to: 180 }, { to: 300, lift: -36, law: 'uarm' }, { to: 360 }],
    summary: 'A simple harmonic rise (semicircle method) and a uniformly accelerated and retarded fall (1:3:5 ratio), on an anticlockwise cam.',
    prompt: 'A cam turning anticlockwise drives a knife-edge follower. Camshaft Ø20; minimum distance 24 mm. 0°–120°: rise 36 mm with simple harmonic motion; 120°–180°: dwell; 180°–300°: fall 36 mm with uniform acceleration and retardation; 300°–360°: dwell. Draw the displacement graph (10 mm = 30°) and the cam profile.' });
  cam({ id: 'cam-roller-uniform', title: 'Cam: Roller Follower, Uniform Motion', follower: 'roller', roller: 16, base: 22, shaft: 20, dir: 'cw', sc: 10,
    segs: [{ to: 90, lift: 25, law: 'uniform' }, { to: 150 }, { to: 270, lift: -25, law: 'uniform' }, { to: 360 }],
    summary: 'With a roller follower the graph is transferred to the path of the roller centre; the cam profile touches the inside of the roller at every position.',
    prompt: 'A cam turning clockwise lifts a Ø16 roller follower. Camshaft Ø20; minimum distance from the profile to the shaft centre 22 mm. 0°–90°: rise 25 mm, uniform motion; 90°–150°: dwell; 150°–270°: fall 25 mm, uniform motion; 270°–360°: dwell. Draw the displacement graph (10 mm = 30°) and the cam profile.' });
  cam({ id: 'cam-roller-shm', title: 'Cam: Roller Follower, SHM Rise and Fall', follower: 'roller', roller: 14, base: 20, shaft: 18, dir: 'ccw', sc: 10,
    segs: [{ to: 150, lift: 32, law: 'shm' }, { to: 210 }, { to: 360, lift: -32, law: 'shm' }],
    summary: 'Simple harmonic motion up and down, with a dwell at the top: the classic smooth, pear-shaped cam.',
    prompt: 'A cam turning anticlockwise drives a Ø14 roller follower. Camshaft Ø18; minimum distance 20 mm. 0°–150°: rise 32 mm with simple harmonic motion; 150°–210°: dwell; 210°–360°: fall 32 mm with simple harmonic motion. Draw the displacement graph (10 mm = 30°) and the cam profile.' });
  cam({ id: 'cam-roller-combined', title: 'Cam: Roller Follower, Three Motion Laws', follower: 'roller', roller: 18, base: 22, shaft: 22, dir: 'cw', sc: 10,
    segs: [{ to: 60, lift: 15, law: 'uniform' }, { to: 90 }, { to: 180, lift: 20, law: 'shm' }, { to: 210 }, { to: 330, lift: -35, law: 'uarm' }, { to: 360 }],
    summary: 'All three motion laws on one cam: a uniform rise, a simple harmonic rise and a uniformly accelerated and retarded fall, with dwells between them.',
    prompt: 'A cam turning clockwise drives a Ø18 roller follower. Camshaft Ø22; minimum distance 22 mm. 0°–60°: rise 15 mm, uniform motion; 60°–90°: dwell; 90°–180°: rise a further 20 mm, simple harmonic motion; 180°–210°: dwell; 210°–330°: fall 35 mm, uniform acceleration and retardation; 330°–360°: dwell. Draw the displacement graph (10 mm = 30°) and the cam profile.' });
  cam({ id: 'cam-knife-uarm', title: 'Cam: Knife-Edge, UARM Rise and Fall', follower: 'knife', base: 28, shaft: 24, dir: 'ccw', sc: 10,
    segs: [{ to: 120, lift: 30, law: 'uarm' }, { to: 210 }, { to: 330, lift: -30, law: 'uarm' }, { to: 360 }],
    summary: 'Uniform acceleration and retardation both ways: the graph is two mirrored parabolas, each built from the 1:3:5:5:3:1 height ratio.',
    prompt: 'A cam turning anticlockwise drives a knife-edge follower. Camshaft Ø24; minimum distance 28 mm. 0°–120°: rise 30 mm with uniform acceleration and retardation; 120°–210°: dwell; 210°–330°: fall 30 mm with uniform acceleration and retardation; 330°–360°: dwell. Draw the displacement graph (10 mm = 30°) and the cam profile.' });
})(window);
