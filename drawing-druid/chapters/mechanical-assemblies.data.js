// Mechanical Assemblies — sectional assembly drawings from given parts (Gr 10-11).
// Requires engine-geometry.js and assembly-kit.js.
(function (global) {
  'use strict';
  const A = global.AssemblyKit;
  const CONSTRUCTIONS = {};
  const L = (p1, p2, t) => ({ kind: 'line', p1, p2, lineType: t || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3.2, anchor: 'middle', color: '#e8eaf2' }, opts || {});

  // clip a segment to the part outside a circle (centre c, radius R)
  function outsideCircle(p, q, c, R) {
    const d = [q[0] - p[0], q[1] - p[1]], f = [p[0] - c[0], p[1] - c[1]];
    const a = d[0] * d[0] + d[1] * d[1], b = 2 * (f[0] * d[0] + f[1] * d[1]), cc = f[0] * f[0] + f[1] * f[1] - R * R;
    const disc = b * b - 4 * a * cc;
    if (disc <= 0) return [[p, q]];
    const s = Math.sqrt(disc), t1 = (-b - s) / (2 * a), t2 = (-b + s) / (2 * a);
    const at = t => [p[0] + d[0] * t, p[1] + d[1] * t];
    const out = [];
    if (t1 > 0) out.push([p, at(Math.min(t1, 1))]);
    if (t2 < 1) out.push([at(Math.max(t2, 0)), q]);
    return out.filter(([u, v]) => Math.hypot(v[0] - u[0], v[1] - u[1]) > 1e-3);
  }

  // A turned assembly on one horizontal axis, held in a fixed body (bracket / housing).
  //   body: { name, mat, section: [polys] (in the cutting plane, x along the axis, y up from the
  //           base), hatch, end: [polylines] (outline seen from the right, y up, z sideways with
  //           the axis at z = 0), detail(x, y): reveals for the given drawing }
  //   parts: [{ name, mat, qty, kind: 'turned'|'washer'|'nut', profile, at, flip, sectioned,
  //             hatch, D, thread: [x0, x1] }]
  function assembly(cfg) {
    const AX = cfg.ax, BY = cfg.by, H = cfg.axisH;          // section view origin and axis height
    const P = (x, y) => [AX + x, BY - y];
    const ay = BY - H;
    const RX = cfg.rx;                                       // right view: centre line x
    const steps = [];

    // ── Sheet A: the given part drawings and the parts list (a separate exercise)
    const partSteps = cfg.details.map((dt, i) => ({
      id: i + 1,
      instruction: dt.note,
      calloutAt: dt.at,
      reveals: dt.draw(),
    }));
    partSteps.push({
      id: partSteps.length + 1,
      instruction: 'The PARTS LIST names every part with its number, how many there are and what it is made of. ' + cfg.story,
      calloutAt: cfg.listAt,
      reveals: A.partsList(cfg.listAt[0], cfg.listAt[1], cfg.listRows || [[cfg.body.name, 1, cfg.body.mat]].concat(cfg.parts.filter(p => p.list !== false).map(p => [p.name, p.qty || 1, p.mat]))),
    });
    const OUT = cfg.into || CONSTRUCTIONS;
    if (!cfg.noPartsSheet) OUT[cfg.id + '-parts'] = {
      id: cfg.id + '-parts', title: cfg.title.replace(/ \(Gr/, ': Parts (Gr'), projection: 'third', printLayout: 'full',
      summary: 'Sheet A of the assembly: the drawing of every part and the parts list. Study it before drawing the assembled section on sheet B.',
      workbookPrompt: 'Study the parts of the ' + cfg.title.replace(/ \(Gr.*$/, '').toLowerCase() + ' and the parts list. Use them to answer the next exercise (the assembled sectional view).',
      bounds: { w: 260, h: 160 },
      steps: partSteps,
    };

    // ── step 1: the body, cut by the plane A-A
    const bodyAll = cfg.body.section.flatMap(it => { const pl = it.poly || it, ang = it.hatch || cfg.body.hatch; return [...A.hatch([pl.map(([x, y]) => P(x, y))], ang, 2.4), { kind: 'polygon', points: pl.map(([x, y]) => P(x, y)), lineType: 'A' }]; });
    steps.push({
      id: 1,
      instruction: 'Draw the centre line of the shaft. Using the parts on sheet A, draw the outline of the ' + cfg.body.name.toLowerCase() + ' (part 1) as it is cut through its centre on A-A.',
      calloutAt: P(cfg.body.callout[0], cfg.body.callout[1]),
      reveals: [L([AX + cfg.axisFrom - 6, ay], [AX + cfg.axisTo + 6, ay], 'centre'), ...bodyAll.filter(r => !r.hatch)],
    });
    steps.push({
      id: 2,
      instruction: 'Hatch every part of the ' + cfg.body.name.toLowerCase() + ' that the cutting plane passes through: thin lines at 45°, evenly spaced. Leave the holes clear.',
      calloutAt: P(cfg.body.callout[0], cfg.body.callout[1]),
      reveals: bodyAll.filter(r => r.hatch),
    });

    // ── steps 3...: the parts in assembly order
    // A shaft, pin or bolt is hidden where a washer or nut sits round it (both are drawn in outside
    // view, in front of it), so its lines stop at their faces.
    const solid = p => !p.sectioned && p.kind !== 'nut' && Math.min(...p.profile.map(q => q[1])) === 0;
    const fronts = cfg.parts.filter(p => p.kind === 'nut' || (!p.sectioned && !solid(p))).map(p => p.kind === 'nut'
      ? { x0: AX + p.at, x1: AX + p.at + (p.h || 0.8 * p.D), r: 1.5 * p.D / Math.sqrt(3) }
      : { x0: AX + p.at, x1: AX + p.at + A.profLen(p.profile), r: Math.max(...p.profile.map(q => q[1])) });
    cfg.order.forEach((grp, gi) => {
      const rev = [];
      let text = [];
      grp.forEach(i => {
        const p = cfg.parts[i];
        const own = [];
        if (p.kind === 'nut') own.push(...A.nutSide(AX + p.at, ay, p.D, p.h || 0.8 * p.D, { bothEnds: false, chamferAt: p.h ? 'left' : 'right' }));
        else if (p.sectioned) own.push(...A.sectioned(p.profile, AX + p.at, ay, p.hatch, { flip: p.flip }));
        else own.push(...A.outside(p.profile, AX + p.at, ay, { flip: p.flip }));
        if (p.thread) own.push(...A.threadLines(AX + p.thread[0], AX + p.thread[1], ay, p.D, { limit: 'left' }));
        rev.push(...(solid(p) ? A.hideBehind(own, fronts, ay) : own));
        if (p.extra) rev.push(...p.extra(P, ay));
        if (p.note) text.push(p.note);
      });
      const at = [AX + cfg.parts[grp[0]].at + 4, ay - 6];
      const outline = rev.filter(r => !r.hatch), hatchLines = rev.filter(r => r.hatch);
      steps.push({ id: steps.length + 1, instruction: text.join(' '), calloutAt: at, reveals: outline });
      if (hatchLines.length) steps.push({ id: steps.length + 1, instruction: 'Now hatch it. Parts that touch are hatched in opposite directions so they read as separate pieces.', calloutAt: at, reveals: hatchLines });
    });

    // ── last step: right view, cutting plane, labels
    // Right view, nearest first. Every face of a turned part is a circle at a known distance;
    // a circle (or a bit of the body outline) is drawn only where nothing nearer covers it.
    const inPoly = (pt, pl) => { let c = false; for (let i = 0, j = pl.length - 1; i < pl.length; j = i++) { const [xi, yi] = pl[i], [xj, yj] = pl[j]; if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) c = !c; } return c; };
    const region = (cfg.body.endRegion || cfg.body.end[0]).map(([z, y]) => [RX + z, BY - y]);
    const rv = [];
    let covered = 0, bodyIn = false, drawingBody = false;
    const hidden = pt => Math.hypot(pt[0] - RX, pt[1] - ay) < covered - 0.05 || (bodyIn && inPoly(pt, region));
    const visibleRuns = pts => {
      let run = [];
      const flush = () => { if (run.length > 1) rv.push({ kind: 'polyline', points: run, lineType: 'A', body: drawingBody }); run = []; };
      pts.forEach(p => { if (hidden(p)) flush(); else run.push(p); });
      flush();
    };
    const circlePts = r => Array.from({ length: 97 }, (_, i) => { const t = 2 * Math.PI * i / 96; return [RX + r * Math.cos(t), ay + r * Math.sin(t)]; });
    const dense = pl => { const out = []; for (let i = 0; i + 1 < pl.length; i++) { const [p, q] = [pl[i], pl[i + 1]]; const n = Math.max(2, Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1]) / 0.6)); for (let k = 0; k < n; k++) out.push([p[0] + (q[0] - p[0]) * k / n, p[1] + (q[1] - p[1]) * k / n]); } out.push(pl[pl.length - 1]); return out; };
    // elements: one per (part face depth), the nut, and the body's near face
    const elems = [];
    cfg.parts.forEach(p => {
      if (p.kind === 'nut') { elems.push({ x: p.at + (p.h || 0.8 * p.D), nut: p }); return; }
      if (p.hiddenInEnd) return;
      const len = A.profLen(p.profile);
      const byX = new Map();
      p.profile.forEach(([x, r]) => { if (r <= 0) return; const gx = p.at + (p.flip ? len - x : x); const k = gx.toFixed(3); if (!byX.has(k)) byX.set(k, new Set()); byX.get(k).add(+r.toFixed(3)); });
      byX.forEach((radii, k) => elems.push({ x: +k, radii: [...radii].sort((u, v) => v - u) }));
    });
    elems.push({ x: cfg.body.nearX, body: true });
    elems.sort((u, v) => v.x - u.x || (u.body ? 1 : -1));
    elems.forEach(e => {
      if (e.nut) {
        rv.push(...A.nutEnd(RX, ay, e.nut.D, { bolt: true }));
        covered = Math.max(covered, 0.75 * e.nut.D);
      } else if (e.body) {
        drawingBody = true;
        cfg.body.end.forEach(pl => visibleRuns(dense(pl.map(([z, y]) => [RX + z, BY - y]))));
        drawingBody = false;
        bodyIn = true;
      } else {
        e.radii.forEach(r => { if (r > covered + 0.05) visibleRuns(circlePts(r)); });
        covered = Math.max(covered, e.radii[0]);
      }
    });
    const cpTop = BY - cfg.cutTop, cpBot = BY + 6;
    const rvLen = rv.length;
    rv.push(
      L([RX - cfg.rvHalf, ay], [RX + cfg.rvHalf, ay], 'centre'),
      L([RX, cpTop - 4], [RX, cpBot], 'centre'),
      L([RX, cpTop - 4], [RX, cpTop + 2], 'A'), L([RX, cpBot - 2], [RX, cpBot], 'A'),
      // 3rd angle: the side of the right view nearest the section is the front, so the arrows
      // point away from it, the way you look when drawing the section
      L([RX, cpTop - 4], [RX + 7, cpTop - 4], 'B'), L([RX, cpBot], [RX + 7, cpBot], 'B'),
      { kind: 'polyline', points: [[RX + 4.5, cpTop - 5.5], [RX + 7, cpTop - 4], [RX + 4.5, cpTop - 2.5]], lineType: 'B' },
      { kind: 'polyline', points: [[RX + 4.5, cpBot - 1.5], [RX + 7, cpBot], [RX + 4.5, cpBot + 1.5]], lineType: 'B' },
      lbl([RX - 4, cpTop - 6], 'A', { size: 4.2, color: '#fde047' }), lbl([RX - 4, cpBot + 4], 'A', { size: 4.2, color: '#fde047' }),
      lbl([AX + (cfg.axisFrom + cfg.axisTo) / 2, BY + 10], 'SECTION A-A / SNIT A-A', { size: 3.8, color: '#fde047' }),
      lbl([RX, BY + 16], 'RIGHT VIEW / REGTERAANSIG', { size: 3.4, color: '#94a3b8' }),
    );
    const rvParts = rv.slice(0, rvLen).filter(r => !r.body), rvBody = rv.slice(0, rvLen).filter(r => r.body), rvRest = rv.slice(rvLen);
    steps.push({
      id: steps.length + 1,
      instruction: 'RIGHT VIEW, projected across from the section: start with the nearest parts. The nut is a hexagon; each turned part shows as circles, but only where no nearer part covers it.',
      calloutAt: [RX, ay], reveals: rvParts,
    });
    steps.push({
      id: steps.length + 1,
      instruction: 'Add the ' + cfg.body.name.toLowerCase() + ' in the right view: only the parts of its outline you can see around the turned parts.',
      calloutAt: [RX, BY - 6], reveals: rvBody,
    });
    steps.push({
      id: steps.length + 1,
      instruction: 'Draw the centre lines and the cutting plane A-A on the right view, with the arrows pointing the way you look at the section, and label the section and the views.',
      calloutAt: [RX, BY - cfg.cutTop], reveals: rvRest,
    });

    OUT[cfg.id] = {
      id: cfg.id, title: cfg.title, summary: cfg.summary, workbookPrompt: cfg.prompt,
      projection: 'third', printLayout: 'full', bounds: { w: 300, h: 200 },
      steps,
    };
  }

  // A small part drawing for the given sheet: a turned part as an outside view (or a section
  // for hollow parts), its end view, the main sizes and its number and name.
  function partDetail(n, name, profile, x, y, opts) {
    opts = opts || {};
    const len = A.profLen(profile), R = Math.max(...profile.map(p => p[1]));
    const rin = Math.min(...profile.map(p => p[1]));
    const ay = y + R;
    const out = [];
    if (opts.section) out.push(...A.sectioned(profile, x, ay, 45, { spacing: 2 }));
    else out.push(...A.outside(profile, x, ay));
    out.push(L([x - 3, ay], [x + len + 3, ay], 'centre'));
    if (opts.end !== false) {
      out.push(...A.endCircles(profile, x + len + R + 8, ay));
    }
    out.push({ kind: 'dimension', p1: [x, ay + R], p2: [x + len, ay + R], offset: 5, text: String(+len.toFixed(1)) });
    out.push({ kind: 'dimension', p1: [x + len + R + 8 - R, ay + R + 3], p2: [x + len + R + 8 + R, ay + R + 3], offset: 4, text: 'Ø' + (2 * R) });
    if (rin > 0 && opts.section) out.push(lbl([x + len + R + 8, ay + R + 13], 'Ø' + (2 * rin) + ' BORE', { size: 2.6, color: '#94a3b8' }));
    out.push(lbl([x + (len + 2 * R + 8) / 2, y - 3], '(' + n + ') ' + name, { size: 3, color: '#fde047' }));
    return out;
  }

  // Course Drawings page: export the builder and stop before this chapter's own exercises.
  global.AssemblyBuilder = { assembly, partDetail, fork, forkDetail };
  if (global.DD_BUILDERS_ONLY) return;

  // ── 1. Hexagon bolt, nut and washer to proportions (M20) ──
  (function () {
    const D = 20, head = 0.7 * D, nutH = 0.8 * D, wT = 0.2 * D, wD = 2 * D, len = 100, thr = 50, td = 0.1 * D;
    const X0 = 30, AY = 80;
    const AC = 1.5 * D * 2 / Math.sqrt(3);
    const XH = X0 + head, XW = XH + 62, XN = XW + wT;            // under the head; washer; nut
    // the washer and nut sit round the bolt, in front of it: the shank is hidden there
    const covers = [{ x0: XW, x1: XW + wT, r: wD / 2 }, { x0: XN, x1: XN + nutH, r: AC / 2 }];
    CONSTRUCTIONS['hex-bolt-representation'] = {
      id: 'hex-bolt-representation', title: 'Hexagon Bolt, Nut and Washer (M20)', projection: 'third',
      summary: 'Draw an M20 bolt with its washer and nut using the standard proportions of the diameter D: across flats 1.5D, head 0.7D, nut 0.8D, washer 2D x 0.2D, thread root 0.8D.',
      bounds: { w: 260, h: 150 },
      workbookPrompt: 'Draw the M20 hexagon bolt (length 100, thread length 50) with a washer and nut, to the proportions of D. Show three faces of the head and nut in the front view and the hexagon in the end view.',
      steps: [
        {
          id: 1,
          instruction: 'Work out the sizes from D = 20: across flats 1.5D = 30 (across corners 34.6), head 0.7D = 14, nut 0.8D = 16, washer 2D = 40 by 0.2D = 4, thread root 0.8D = 16. Draw the centre line.',
          calloutAt: [X0 + 60, AY],
          reveals: [
            L([X0 - 6, AY], [X0 + head + len + 8, AY], 'centre'),
            lbl([X0 + 150, AY - 48], 'D = 20', { anchor: 'start', size: 3.6, color: '#fde047' }),
            ...[['ACROSS FLATS 1.5D = 30', -42], ['HEAD 0.7D = 14', -37], ['NUT 0.8D = 16', -32], ['WASHER 2D x 0.2D = 40 x 4', -27], ['THREAD ROOT 0.8D = 16', -22]].map(([t, dy]) => lbl([X0 + 150, AY + dy], t, { anchor: 'start', size: 3, color: '#94a3b8' })),
          ],
        },
        {
          id: 2,
          instruction: 'The bolt head, seen across its corners: 14 thick and 34.6 across, with the two face edges showing three faces, and the chamfer arcs on the outer end.',
          calloutAt: [X0 + head / 2, AY - AC / 2],
          reveals: A.nutSide(X0, AY, D, head, { bothEnds: false, chamferAt: 'left' }),
        },
        {
          id: 3,
          instruction: 'The washer (40 x 4) and the nut (16 thick, chamfered on the outer face) on the thread, leaving two or three threads showing past the nut.',
          calloutAt: [XW + 10, AY - AC / 2],
          reveals: [
            ...A.outside([[0, 0], [0, wD / 2], [wT, wD / 2], [wT, 0]], XW, AY),
            ...A.nutSide(XN, AY, D, nutH, { bothEnds: false, chamferAt: 'right' }),
          ],
        },
        {
          id: 4,
          instruction: 'The shank, Ø20 for 100 mm from under the head; the washer and nut hide it where they sit round it. The thread is on the last 50: thin root lines 0.1D = 2 in from each side, right to the end; a thick line across where the thread ends, with the run-out drawn at 60° back to the sides; and the 45° chamfer (0.1D) on the end, with a line across where it starts.',
          calloutAt: [XH + 40, AY - D / 2],
          reveals: A.hideBehind([
            ...A.outside([[0, 0], [0, D / 2], [len - td, D / 2], [len, D / 2 - td], [len, 0]], XH, AY),
            ...A.threadLines(XH + len - thr, XH + len, AY, D, { limit: 'left' }),
          ], covers, AY),
        },
        {
          id: 5,
          instruction: 'END VIEW of the nut, looking along the bolt: the hexagon (30 across flats) with the chamfer circle touching its flats, the bolt\'s Ø20 crest circle and the thread root as a three-quarter thin circle.',
          calloutAt: [X0 + 215, AY],
          reveals: [
            ...A.nutEnd(X0 + 215, AY, D, { cornersUp: true }),
            lbl([X0 + 215, AY + 30], 'END VIEW / ENTAANSIG', { size: 3.2, color: '#94a3b8' }),
          ],
        },
      ],
    };
  })();

  // ── 2. Pulley bracket (Gr 10) ──
  (function () {
    const D = 16;
    const shaft = [[0, 0], [0, 14], [6, 14], [6, 8], [70, 8], [70, 0]];
    const bush = [[0, 8], [20, 8], [20, 18], [16, 18], [16, 12], [0, 12]];
    const pulley = [[0, 8], [24, 8], [24, 14], [16, 14], [16, 32], [22, 32], [22, 40], [15, 40], [12, 34], [9, 40], [2, 40], [2, 32], [8, 32], [8, 14], [0, 14]];
    const washer = [[0, 8.5], [3, 8.5], [3, 16], [0, 16]];
    const body = {
      name: 'BRACKET', mat: 'CAST IRON / GIETYSTER', callout: [14, 30], nearX: 22,
      section: [
        [[-24, 0], [60, 0], [60, 12], [22, 12], [22, 43], [6, 43], [6, 12], [-24, 12]],
        [[6, 67], [22, 67], [22, 85], [6, 85]],
      ],
      hatch: 45,
      end: [
        [[-50, 0], [50, 0], [50, 12], [-50, 12], [-50, 0]],
        [[-30, 12], [-30, 55]].concat(Array.from({ length: 13 }, (_, i) => { const a = Math.PI - Math.PI * i / 12; return [30 * Math.cos(a), 55 + 30 * Math.sin(a)]; })).concat([[30, 12]]),
      ],
    };
    assembly({
      id: 'pulley-bracket-assembly', title: 'Pulley Bracket Assembly (Gr 10)',
      summary: 'A V-pulley turning on a shaft held in a cast-iron bracket, with a flanged bronze bush, a washer and an M16 nut. Draw the sectional front view on A-A and the right view.',
      prompt: 'The parts of a pulley bracket assembly are given. Draw, full size in 3rd-angle projection: the sectional front view on A-A and the right view. Do not section the shaft, washer or nut; show three faces of the nut.',
      story: 'the bush is pressed into the bracket from the right, the shaft goes in from the left until its collar meets the bracket, the pulley slides on and the washer and nut hold it.',
      ax: 110, by: 150, axisH: 55, rx: 250, cutTop: 100, axisFrom: -24, axisTo: 74, rvHalf: 56,
      body,
      parts: [
        { name: 'BUSH', mat: 'BRONZE / BRONS', profile: bush, at: 6, sectioned: true, hatch: 135, note: 'Part 2, the flanged BUSH, sits in the bracket\'s bore with its flange against the right face. It is bronze and sectioned, hatched the opposite way to the bracket because they touch.' },
        { name: 'SHAFT', mat: 'MILD STEEL / SAGTE STAAL', profile: shaft, at: 0, sectioned: false, D, thread: [56, 70], note: 'Part 3, the SHAFT, goes through from the left until its collar meets the bracket. A shaft is NEVER sectioned, even though the cutting plane runs along it: draw it as a plain outside view, with its thread at the end.' },
        { name: 'PULLEY', mat: 'CAST IRON / GIETYSTER', profile: pulley, at: 26, sectioned: true, hatch: 45, note: 'Part 4, the PULLEY, slides onto the shaft against the bush flange. Section it: hub, web and V-grooved rim. It touches the bush, not the bracket, so its hatching goes opposite to the bush.' },
        { name: 'WASHER', mat: 'MILD STEEL / SAGTE STAAL', profile: washer, at: 50, sectioned: false, note: 'Part 5, the WASHER, and' },
        { name: 'M16 NUT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: 53, D, profile: [[0, 0], [12.8, 0]], note: 'part 6, the M16 NUT (12.8 thick, three faces showing). Washers and nuts are never sectioned.' },
      ],
      order: [[0], [1], [2], [3, 4]],
      details: [
        {
          note: 'Part 1, the BRACKET (cast iron): a base plate with an upright that is rounded at the top. The upright has a Ø24 hole for the bush, its centre 55 above the base. Front view and right view.',
          at: [60, 60],
          draw: () => {
            const F = (x, y) => [40 + x, 100 - y], R = (z, y) => [160 + z, 100 - y];
            return [
              { kind: 'polygon', points: [[-24, 0], [60, 0], [60, 12], [22, 12], [22, 85], [6, 85], [6, 12], [-24, 12]].map(([x, y]) => F(x, y)), lineType: 'A' },
              L(F(6, 43), F(22, 43), 'hidden'), L(F(6, 67), F(22, 67), 'hidden'), L(F(2, 55), F(26, 55), 'centre'),
              ...body.end.map(pl => ({ kind: 'polyline', points: pl.map(([z, y]) => R(z, y)), lineType: 'A' })),
              { kind: 'circle', center: R(0, 55), r: 12, lineType: 'A' },
              L(R(-34, 55), R(34, 55), 'centre'), L(R(0, 20), R(0, 90), 'centre'),
              { kind: 'dimension', p1: F(-24, 0), p2: F(60, 0), offset: 7, text: '84' },
              { kind: 'dimension', p1: F(6, 85), p2: F(22, 85), offset: -5, text: '16' },
              { kind: 'dimension', p1: R(-50, 0), p2: R(50, 0), offset: 7, text: '100' },
              { kind: 'dimension', p1: R(50, 0), p2: R(50, 55), offset: -8, text: '55' },
              lbl(R(-34, 76), 'R30', { size: 2.8 }), lbl(R(16, 64), 'Ø24', { size: 2.8 }),
              lbl(F(18, 104), '(1) BRACKET', { size: 3, color: '#fde047' }),
            ];
          },
        },
        { note: 'Part 2, the BUSH (bronze): Ø16 bore, Ø24 outside where it fits the bracket, with a Ø36 flange 4 thick.', at: [30, 128], draw: () => partDetail(2, 'BUSH', bush, 16, 128, { section: true }) },
        { note: 'Part 3, the SHAFT (mild steel): a Ø28 collar 6 long, then Ø16, threaded M16 at the end.', at: [110, 128], draw: () => partDetail(3, 'SHAFT', shaft, 84, 132) },
        { note: 'Part 4, the PULLEY (cast iron): hub Ø28 x 24 with a Ø16 bore, a web 8 thick, and a rim Ø80 x 20 with a V-groove.', at: [240, 50], draw: () => partDetail(4, 'PULLEY', pulley, 214, 12, { section: true }) },
        { note: 'Part 5, the WASHER (Ø32 x 3), and part 6, the M16 NUT: across flats 1.5D = 24, 0.8D = 12.8 thick.', at: [232, 136], draw: () => [...partDetail(5, 'WASHER', washer, 214, 132, { section: true }), ...A.nutEnd(292, 148, D, {}), lbl([292, 133], '(6) M16 NUT', { size: 3, color: '#fde047' })] },
      ],
      listAt: [16, 170],
    });
  })();

  // A fork (base with two uprights) in section and seen from the right, for the next two
  // assemblies. Uprights t thick at x = 0..t and w-t..w, holes of radius rh on the axis at h,
  // tops rounded with radius R (seen from the right), base b thick, overhanging o each end.
  function fork(w, t, h, rh, R, b, o, baseHalf) {
    const top = h + R;
    return {
      section: [
        [[-o, 0], [w + o, 0], [w + o, b], [w, b], [w, h - rh], [w - t, h - rh], [w - t, b], [t, b], [t, h - rh], [0, h - rh], [0, b], [-o, b]],
        [[0, h + rh], [t, h + rh], [t, top], [0, top]],
        [[w - t, h + rh], [w, h + rh], [w, top], [w - t, top]],
      ],
      end: [
        [[-baseHalf, 0], [baseHalf, 0], [baseHalf, b], [-baseHalf, b], [-baseHalf, 0]],
        [[-R, b], [-R, h]].concat(Array.from({ length: 13 }, (_, i) => { const a = Math.PI - Math.PI * i / 12; return [R * Math.cos(a), h + R * Math.sin(a)]; })).concat([[R, b]]),
      ],
      front: [[-o, 0], [w + o, 0], [w + o, b], [w, b], [w, top], [w - t, top], [w - t, b], [t, b], [t, top], [0, top], [0, b], [-o, b]],
      nearX: w,
    };
  }

  // Given-sheet drawing of a fork body: front view (holes hidden) and right view.
  function forkDetail(fk, w, h, rh, R, fx, fy, rxc, label) {
    const F = (x, y) => [fx + x, fy - y], Rv = (z, y) => [rxc + z, fy - y];
    return [
      { kind: 'polygon', points: fk.front.map(([x, y]) => F(x, y)), lineType: 'A' },
      ...[[0, fk.section[0][9][0] === 0 ? fk.section[0][8][0] : 0]].flatMap(() => []),
      ...[[0, fk.section[0][8][0]], [fk.section[0][5][0], w]].flatMap(([x0, x1]) => [L(F(x0, h - rh), F(x1, h - rh), 'hidden'), L(F(x0, h + rh), F(x1, h + rh), 'hidden')]),
      L(F(-4, h), F(w + 4, h), 'centre'),
      ...fk.end.map(pl => ({ kind: 'polyline', points: pl.map(([z, y]) => Rv(z, y)), lineType: 'A' })),
      { kind: 'circle', center: Rv(0, h), r: rh, lineType: 'A' },
      L(Rv(-R - 5, h), Rv(R + 5, h), 'centre'), L(Rv(0, h - rh - 5), Rv(0, h + R + 4), 'centre'),
      lbl(F(w / 2, h + R + 8), label, { size: 3, color: '#fde047' }),
    ];
  }

  // ── 3. Roller support (Gr 10) ──
  (function () {
    const D = 20;
    const fk = fork(64, 12, 45, 10, 27, 12, 10, 40);
    const shaft = [[0, 0], [0, 16], [6, 16], [6, 10], [92, 10], [92, 0]];
    const bush = [[0, 10], [38, 10], [38, 14], [0, 14]];
    const roller = [[0, 14], [38, 14], [38, 28], [36, 30], [2, 30], [0, 28]];
    const washer = [[0, 10.5], [4, 10.5], [4, 20], [0, 20]];
    assembly({
      id: 'roller-support-assembly', title: 'Roller Support Assembly (Gr 10)',
      summary: 'A roller turning on a bronze bush, carried on a pin between the two uprights of a cast-iron fork, held by a washer and an M20 nut.',
      prompt: 'The parts of a roller support are given. Draw, full size in 3rd-angle projection: the sectional front view on A-A and the right view. Do not section the pin, washer or nut; show three faces of the nut.',
      story: 'the bush is pressed into the roller, the roller sits between the uprights, the pin goes through the left upright, the roller and the right upright, and the washer and nut hold it.',
      ax: 70, by: 140, axisH: 45, rx: 225, cutTop: 82, axisFrom: -10, axisTo: 88, rvHalf: 48,
      body: { name: 'FORK', mat: 'CAST IRON / GIETYSTER', callout: [6, 25], nearX: fk.nearX, section: fk.section, hatch: 45, end: fk.end },
      parts: [
        { name: 'PIN', mat: 'MILD STEEL / SAGTE STAAL', profile: shaft, at: -6, sectioned: false, D, thread: [62, 86], note: 'Part 2, the PIN: its Ø32 head against the left upright, the Ø20 shank through both uprights. Never sectioned.' },
        { name: 'BUSH', mat: 'BRONZE / BRONS', profile: bush, at: 13, sectioned: true, hatch: 135, note: 'Part 3, the BUSH, on the pin between the uprights: sectioned, hatched opposite to the roller.' },
        { name: 'ROLLER', mat: 'CAST IRON / GIETYSTER', profile: roller, at: 13, sectioned: true, hatch: 45, note: 'Part 4, the ROLLER, around the bush: Ø60 with chamfered edges, sectioned. It does not touch the fork: leave the small gaps.' },
        { name: 'WASHER', mat: 'MILD STEEL / SAGTE STAAL', profile: washer, at: 64, sectioned: false, note: 'Part 5, the WASHER (Ø40 x 4), and' },
        { name: 'M20 NUT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: 68, D, profile: [[0, 0], [16, 0]], note: 'part 6, the M20 NUT (16 thick, three faces).' },
      ],
      order: [[0], [1], [2], [3, 4]],
      details: [
        { note: 'Part 1, the FORK (cast iron): a base with two uprights 12 thick, 52 apart inside. Each upright has a Ø20 hole 45 above the base and a rounded top (R27). Front view and right view.', at: [40, 50],
          draw: () => [
            ...forkDetail(fk, 64, 45, 10, 27, 30, 90, 160, '(1) FORK'),
            { kind: 'dimension', p1: [20, 90], p2: [104, 90], offset: 7, text: '84' },
            { kind: 'dimension', p1: [30, 18], p2: [42, 18], offset: -5, text: '12' },
            { kind: 'dimension', p1: [42, 34], p2: [82, 34], offset: -5, text: '40' },
            { kind: 'dimension', p1: [200, 90], p2: [200, 45], offset: -8, text: '45' },
            { kind: 'dimension', p1: [120, 90], p2: [200, 90], offset: 7, text: '80' },
            lbl([192, 30], 'R27', { size: 2.8 }), lbl([170, 40], 'Ø20', { size: 2.8 }),
          ] },
        { note: 'Part 2, the PIN (mild steel): head Ø32 x 6, shank Ø20 x 86, threaded M20 for the last 24.', at: [40, 125], draw: () => partDetail(2, 'PIN', shaft, 16, 114) },
        { note: 'Part 3, the BUSH (bronze): Ø20 bore, Ø28 outside, 38 long.', at: [160, 125], draw: () => partDetail(3, 'BUSH', bush, 160, 116, { section: true }) },
        { note: 'Part 4, the ROLLER (cast iron): Ø28 bore, Ø60 outside, 38 wide, edges chamfered 2 x 45°.', at: [250, 40], draw: () => partDetail(4, 'ROLLER', roller, 222, 12, { section: true }) },
        { note: 'Part 5, the WASHER (Ø40 x 4), and part 6, the M20 NUT (across flats 30, 16 thick).', at: [250, 120], draw: () => [...partDetail(5, 'WASHER', washer, 236, 108, { section: true }), ...A.nutEnd(310, 128, D, {}), lbl([310, 108], '(6) M20 NUT', { size: 3, color: '#fde047' })] },
      ],
      listAt: [16, 170],
    });
  })();

  // ── 4. Wheel on two ball bearings (Gr 11) ──
  (function () {
    const D = 12;
    const fk = fork(64, 8, 35, 6, 25, 10, 8, 36);
    const bolt = [[0, 0], [0, 6], [79, 6], [79, 0]];
    const spacer = [[0, 6.2], [6, 6.2], [6, 9], [0, 9]];
    const inner = [[0, 6], [10, 6], [10, 8.5], [0, 8.5]];
    const outer = [[0, 11], [10, 11], [10, 14], [0, 14]];
    const wheel = [[0, 14], [10, 14], [10, 11.5], [24, 11.5], [24, 14], [34, 14], [34, 22], [32, 24], [2, 24], [0, 22]];
    const washer = [[0, 6.5], [2.4, 6.5], [2.4, 12], [0, 12]];
    const balls = (x) => (P, ay) => [-1, 1].map(s => ({ kind: 'circle', center: [P(0, 0)[0] + x, ay + s * 9.75], r: 1.5, lineType: 'A' }));
    assembly({
      id: 'wheel-bearing-assembly', title: 'Wheel on Ball Bearings (Gr 11)',
      summary: 'A wheel running on two ball bearings on an M12 axle bolt in a fork, with spacers either side. Ball bearings are drawn with their rings sectioned and the balls left unhatched.',
      prompt: 'The parts of a wheel assembly are given. Draw, full size in 3rd-angle projection: the sectional front view on A-A and the right view. Draw both ball bearings in section with their balls; do not section the bolt, washer, nut or balls.',
      story: 'the two bearings are pressed into the wheel from either side against its inner shoulder; with a spacer each side the wheel sits between the fork plates, and the M12 bolt passes through everything and is held by a washer and nut.',
      ax: 70, by: 125, axisH: 35, rx: 210, cutTop: 70, axisFrom: -12, axisTo: 82, rvHalf: 40,
      body: { name: 'FORK', mat: 'MILD STEEL / SAGTE STAAL', callout: [4, 20], nearX: fk.nearX, section: fk.section, hatch: 45, end: fk.end },
      parts: [
        { name: 'M12 BOLT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: -8.4, h: 8.4, D, profile: [[0, 0], [8.4, 0]], note: 'Part 2, the M12 BOLT: the hexagon head (0.7D = 8.4) against the left plate,' },
        { name: 'M12 BOLT', mat: 'MILD STEEL / SAGTE STAAL', profile: bolt, at: 0, sectioned: false, D, thread: [52, 79], list: false, note: 'and its Ø12 shank through the whole assembly. Bolts are never sectioned.' },
        { name: 'SPACER', mat: 'MILD STEEL / SAGTE STAAL', profile: spacer, at: 8, sectioned: true, hatch: 135, note: 'Part 3, a SPACER inside each fork plate,' },
        { name: 'SPACER', mat: 'MILD STEEL / SAGTE STAAL', profile: spacer, at: 50, sectioned: true, hatch: 135, list: false, note: '' },
        { name: 'BALL BEARING', mat: 'STEEL / STAAL', profile: inner, at: 14, sectioned: true, hatch: 45, extra: balls(19), note: 'Part 4, the two BALL BEARINGS: inner and outer rings sectioned (hatched opposite ways), the balls drawn as circles and never hatched.' },
        { name: 'BALL BEARING', mat: 'STEEL / STAAL', profile: outer, at: 14, sectioned: true, hatch: 135, list: false, note: '' },
        { name: 'BALL BEARING', mat: 'STEEL / STAAL', profile: inner, at: 40, sectioned: true, hatch: 45, extra: balls(45), list: false, note: '' },
        { name: 'BALL BEARING', mat: 'STEEL / STAAL', profile: outer, at: 40, sectioned: true, hatch: 135, list: false, note: '' },
        { name: 'WHEEL', mat: 'CAST IRON / GIETYSTER', profile: wheel, at: 14, sectioned: true, hatch: 45, note: 'Part 5, the WHEEL around the bearings, sectioned: note the shoulder between the two bearings.' },
        { name: 'WASHER', mat: 'MILD STEEL / SAGTE STAAL', profile: washer, at: 64, sectioned: false, note: 'Part 6, the WASHER, and' },
        { name: 'M12 NUT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: 66.4, D, profile: [[0, 0], [9.6, 0]], note: 'part 7, the M12 NUT (three faces).' },
      ],
      listRows: [['FORK', 1, 'MILD STEEL / SAGTE STAAL'], ['M12 BOLT', 1, 'MILD STEEL / SAGTE STAAL'], ['SPACER', 2, 'MILD STEEL / SAGTE STAAL'], ['BALL BEARING', 2, 'STEEL / STAAL'], ['WHEEL', 1, 'CAST IRON / GIETYSTER'], ['WASHER', 1, 'MILD STEEL / SAGTE STAAL'], ['M12 NUT', 1, 'MILD STEEL / SAGTE STAAL']],
      order: [[0, 1], [2, 3], [4, 5, 6, 7], [8], [9, 10]],
      details: [
        { note: 'Part 1, the FORK: base and two plates 8 thick, 48 apart inside, with Ø12 holes 35 above the base and rounded tops (R25).', at: [40, 45],
          draw: () => [
            ...forkDetail(fk, 64, 35, 6, 25, 30, 80, 150, '(1) FORK'),
            { kind: 'dimension', p1: [22, 80], p2: [102, 80], offset: 7, text: '80' },
            { kind: 'dimension', p1: [38, 30], p2: [86, 30], offset: -5, text: '48' },
            { kind: 'dimension', p1: [186, 80], p2: [186, 45], offset: -8, text: '35' },
            lbl([176, 24], 'R25', { size: 2.8 }), lbl([160, 38], 'Ø12', { size: 2.8 }),
          ] },
        { note: 'Part 2, the M12 BOLT, 79 long under the head, and part 3, the SPACER (Ø12.4 bore, Ø18 x 6).', at: [40, 112],
          draw: () => [...partDetail(2, 'M12 BOLT', bolt, 16, 106, { end: false }), ...A.nutSide(8, 112, D, 8.4, { bothEnds: false, chamferAt: 'left' }), ...partDetail(3, 'SPACER', spacer, 110, 104, { section: true })] },
        { note: 'Part 4, the BALL BEARING (6201 size): Ø12 bore, Ø28 outside, 10 wide. Drawn simplified: rings sectioned, balls as circles.', at: [200, 112],
          draw: () => [...A.sectioned(inner, 200, 116, 45, { spacing: 1.6 }), ...A.sectioned(outer, 200, 116, 135, { spacing: 1.6 }), ...[-1, 1].map(s => ({ kind: 'circle', center: [205, 116 + s * 9.75], r: 1.5, lineType: 'A' })), L([196, 116], [214, 116], 'centre'), lbl([206, 99], '(4) BALL BEARING', { size: 3, color: '#fde047' })] },
        { note: 'Part 5, the WHEEL (cast iron): Ø48 x 34 with a Ø28 bore from each side and a Ø23 shoulder in the middle.', at: [250, 40], draw: () => partDetail(5, 'WHEEL', wheel, 228, 12, { section: true }) },
        { note: 'Part 6, the WASHER (Ø24 x 2.4), and part 7, the M12 NUT (across flats 18, 9.6 thick).', at: [270, 125], draw: () => [...partDetail(6, 'WASHER', washer, 236, 110, { section: true }), ...A.nutEnd(300, 122, D, {}), lbl([300, 108], '(7) M12 NUT', { size: 3, color: '#fde047' })] },
      ],
      listAt: [16, 150],
    });
  })();

  // ── 5. Bolted joint: two plates (Gr 10) ──
  (function () {
    const D = 16;
    const shank = [[0, 0], [0, 8], [43, 8], [43, 0]];
    const washer = [[0, 8.5], [3.2, 8.5], [3.2, 16], [0, 16]];
    assembly({
      id: 'bolted-joint-assembly', title: 'Bolted Joint: Two Plates (Gr 10)', noPartsSheet: true,
      summary: 'Two plates joined by an M16 bolt, washer and nut. The plates touch, so they are hatched in opposite directions; the bolt, washer and nut are never sectioned.',
      prompt: 'Draw the sectional view of two plates (12 and 12 thick) joined by an M16 hexagon bolt, washer and nut, and the right view. Hatch the plates in opposite directions.',
      story: '',
      ax: 80, by: 120, axisH: 40, rx: 180, cutTop: 86, axisFrom: -12, axisTo: 46, rvHalf: 36,
      body: {
        name: 'PLATES', mat: 'MILD STEEL / SAGTE STAAL', callout: [6, 20], nearX: 24, hatch: 45,
        section: [
          { poly: [[0, 0], [12, 0], [12, 31], [0, 31]], hatch: 45 }, { poly: [[0, 49], [12, 49], [12, 80], [0, 80]], hatch: 45 },
          { poly: [[12, 0], [24, 0], [24, 31], [12, 31]], hatch: 135 }, { poly: [[12, 49], [24, 49], [24, 80], [12, 80]], hatch: 135 },
        ],
        end: [[[-30, 0], [30, 0], [30, 80], [-30, 80], [-30, 0]]],
      },
      parts: [
        { name: 'M16 BOLT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: -11.2, h: 11.2, D, profile: [[0, 0], [11.2, 0]], note: 'The BOLT head (0.7D = 11.2, three faces showing) against the left plate,' },
        { name: 'M16 BOLT', mat: 'MILD STEEL / SAGTE STAAL', profile: shank, at: 0, sectioned: false, D, thread: [26, 43], note: 'and the shank through the Ø18 clearance holes, threaded at the end. Never sectioned.' },
        { name: 'WASHER', mat: 'MILD STEEL / SAGTE STAAL', profile: washer, at: 24, sectioned: false, note: 'The WASHER (2D = 32, 0.2D = 3.2 thick) and' },
        { name: 'M16 NUT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: 27.2, D, profile: [[0, 0], [12.8, 0]], note: 'the NUT (0.8D = 12.8), with two or three threads showing past it.' },
      ],
      order: [[0, 1], [2, 3]],
      details: [], listAt: [0, 0],
    });
  })();

  // shared with the Gr 11-12 assemblies page
  global.AssemblyBuilder = { assembly, partDetail, fork, forkDetail };

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'In a sectional assembly drawing, a cutting plane passes lengthwise through a bolt, nut, washer or shaft. What convention is followed?',
      options: [
        'These standard fasteners/shafts are conventionally shown UN-sectioned (not hatched), even though the cutting plane passes through them',
        'They are always hatched, exactly like any other solid material',
        'They are always shown as hidden (dashed) detail instead',
        'They are simply omitted from the drawing entirely',
      ],
      answer: 0,
      explanation: 'Sectioning a fastener or shaft along its length adds no useful information, so by long-standing convention bolts, nuts, screws, rivets, keys and shafts are always drawn un-hatched even when the cutting plane runs through them.',
    },
    {
      text: 'Two adjacent parts are both cut by the same section plane. How does the drawing make clear they are two separate parts, not one?',
      options: [
        'The hatching is drawn at a different angle (or spacing) in each part',
        'They are drawn in two different colours',
        'Only one of the two parts is ever hatched',
        'A double-thick border line always separates them',
      ],
      answer: 0,
      explanation: 'Varying the hatch angle (typically 45° vs 135°) or spacing between touching parts is the standard way to show they are distinct components, even though both are cut by the same plane.',
    },
    {
      text: 'In the simplified representation of an EXTERNAL thread (e.g. a bolt), which line type is used for the crest (major diameter) and which for the root (minor diameter)?',
      options: [
        'Crest = thick (A) continuous line; root = thin (B) continuous line, shown as a broken (3/4) circle in the end view',
        'Crest = thin (B) line; root = thick (A) line',
        'Both crest and root are drawn with the same thick (A) line',
        'Both are drawn dashed, since a thread is technically hidden detail',
      ],
      answer: 0,
      explanation: 'The visible outer edge of an external thread (crest) is thick/A; the root sits just inside it and is drawn thin/B, conventionally broken into a 3/4 circle in the end view — never dashed.',
    },
    {
      text: 'For an INTERNAL thread (inside a nut or a tapped hole), which diameter is drawn with the thick line?',
      options: [
        'The root (minor) diameter is thick (A); the crest (major) diameter is thin (B) — the reverse of an external thread',
        'The same as an external thread: crest thick, root thin',
        'Internal threads are never shown on assembly drawings',
        'Both diameters are shown thin (B)',
      ],
      answer: 0,
      explanation: 'The convention reverses for an internal thread: the root (the actual drilled/tapped hole edge) reads as the solid boundary and is thick/A, while the crest (where the thread cuts into the material) is thin/B.',
    },
    {
      text: 'What is the purpose of an item number ("balloon") on an assembly drawing?',
      options: [
        'It identifies each unique part, cross-referenced to a parts list (bill of materials) giving its description and quantity',
        'It shows the exact mass of that part in kilograms',
        'It indicates which part was drawn most recently',
        'It replaces the need for any hatching on that part',
      ],
      answer: 0,
      explanation: 'A numbered balloon on a leader line links a part in the drawing to its row in the parts list, where its description, material and quantity are recorded.',
    },
    {
      text: 'Which of these is NOT one of the four sectional view types used for mechanical assembly drawings?',
      options: [
        'Isometric-sectional',
        'Non-sectional',
        'Half-sectional',
        'Part-sectional',
      ],
      answer: 0,
      explanation: 'Mechanical assemblies are drawn non-sectional, full-sectional, half-sectional or part-sectional (a local "broken-out" section) — "isometric-sectional" is not a recognised drawing type.',
    },
    {
      text: 'What is a key and keyway used for in a mechanical assembly?',
      options: [
        'A key fits into matching keyways cut into a shaft and a hub (e.g. a gear or pulley) so the two rotate together, transmitting torque without slipping',
        'A key locks a drawing file so it cannot be edited',
        'A keyway is another name for a bolt hole',
        'Keys are used only to hold two plates apart, never to transmit rotation',
      ],
      answer: 0,
      explanation: 'A key sits in aligned keyway slots machined into both the shaft and the component mounted on it, preventing relative rotation while torque is transmitted.',
    },
    {
      text: 'What accuracy tolerance is permitted on all aspects of a CAPS Engineering Graphics and Design drawing, including assemblies?',
      options: ['A deviation of only 1 mm or 1°', 'A deviation of up to 5 mm or 5°', 'No tolerance is permitted at all', 'A deviation of up to 10%'],
      answer: 0,
      explanation: 'Because accuracy is fundamental to EGD, the DBE exam guidelines allow a deviation of only 1 mm or 1° on any aspect of any drawing.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'hex-bolt-representation', 'bolted-joint-assembly', 'pulley-bracket-assembly-parts', 'pulley-bracket-assembly', 'roller-support-assembly-parts', 'roller-support-assembly', 'wheel-bearing-assembly-parts', 'wheel-bearing-assembly',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
