// Geometrical constructions (Gr 10): applied "copy the figure" exercises, workbook style.
// figure(cfg) takes a loop of bosses joined by tangent lines, concave tangent arcs (outside both
// circles) or enclosing arcs, works out every centre and tangent point, and writes the construction
// in small steps. All parts are original designs. Runs after geometric-constructions-more.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#fde047' }, opts || {});
  const pt = (at, label) => ({ kind: 'point', at, label });
  const circle = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const unit = a => { const l = Math.hypot(a[0], a[1]) || 1; return [a[0] / l, a[1] / l]; };
  const rot = (v, t) => [v[0] * Math.cos(t) - v[1] * Math.sin(t), v[0] * Math.sin(t) + v[1] * Math.cos(t)];
  const ang = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]) * 180 / Math.PI;
  const mod = a => ((a % 360) + 360) % 360;
  const arcS = (c, r, a0, a1, lt) => ({ kind: 'arc-construction', center: c, r, startDeg: a0, endDeg: a1, lineType: lt || 'construction' });
  const arcVia = (c, r, p, q, m, lt) => {
    const ap = ang(c, p), aq = ang(c, q), am = ang(c, m);
    return mod(am - ap) < mod(aq - ap) ? arcS(c, r, ap, ap + mod(aq - ap), lt) : arcS(c, r, aq, aq + mod(ap - aq), lt);
  };
  const swing = (c, r, p, half) => { const a = ang(c, p); return arcS(c, r, a - (half || 12), a + (half || 12)); };
  const cc = (c1, r1, c2, r2) => {
    const d = dist(c1, c2), a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    const u = unit(sub(c2, c1)), m = add(c1, mul(u, a));
    return [add(m, [-u[1] * h, u[0] * h]), add(m, [u[1] * h, -u[0] * h])];
  };
  const fmt = v => String(Math.round(v * 10) / 10);

  // cfg: id, title, part, bosses [{ c:[x,y], r, hole }], links [{ type:'line' } | { type:'arc', R } | { type:'enclose', R }]
  //      (links[i] joins boss i to boss i+1, going round the loop), extra: (helpers) => reveals for inner detail
  function figure(cfg) {
    const B = cfg.bosses, n = B.length;
    const G = mul(B.reduce((s, b) => add(s, b.c), [0, 0]), 1 / n);
    // outward normal of each link from the loop's orientation (shoelace sign; two bosses: link 0 is on top)
    let area = 0; B.forEach((b, i) => { const q = B[(i + 1) % n].c; area += b.c[0] * q[1] - q[0] * b.c[1]; });
    const sgn = Math.abs(area) < 1e-6 ? 1 : Math.sign(area);
    const outN = i => { const u = unit(sub(B[(i + 1) % n].c, B[i].c)); return sgn > 0 ? [u[1], -u[0]] : [-u[1], u[0]]; };
    const dot = (p, q) => p[0] * q[0] + p[1] * q[1];
    const K = [];                            // per link: { tA, tB, steps: [...] }
    const nm = i => String.fromCharCode(65 + i);
    cfg.links.forEach((lk, i) => {
      const a = B[i], b = B[(i + 1) % n], d = dist(a.c, b.c), u = unit(sub(b.c, a.c)), A = nm(i), Bn = nm((i + 1) % n);
      if (lk.type === 'line') {
        const th = Math.acos((a.r - b.r) / d);
        const cand = [th, -th].map(t => { const v = rot(u, t); return { v, tA: add(a.c, mul(v, a.r)), tB: add(b.c, mul(v, b.r)) }; });
        const s = dot(cand[0].v, outN(i)) > dot(cand[1].v, outN(i)) ? cand[0] : cand[1];
        const steps = [];
        if (Math.abs(a.r - b.r) < 0.01) {
          steps.push({ instruction: 'TANGENT ' + A + Bn + ' (equal radii): draw lines square to ' + A + Bn + ' through both centres. They cut the circles at the tangent points; join them.',
            calloutAt: s.tA, reveals: [L(a.c, s.tA, 'construction'), L(b.c, s.tB, 'construction'), pt(s.tA), pt(s.tB), L(s.tA, s.tB)] });
        } else {
          const big = a.r > b.r ? a : b, small = a.r > b.r ? b : a, M = mul(add(a.c, b.c), 0.5);
          const k = add(big.c, mul(big === a ? s.v : s.v, Math.abs(a.r - b.r)));
          steps.push({ instruction: 'TANGENT ' + A + Bn + ': from the centre of the larger circle draw a thin circle of radius ' + fmt(Math.abs(a.r - b.r)) + ' (the difference of the radii). Bisect ' + A + Bn + ' and draw a semicircle on it to cut the thin circle at K.',
            calloutAt: k, reveals: [circle(big.c, Math.abs(a.r - b.r), 'construction'), pt(M), arcVia(M, d / 2, a.c, b.c, add(M, mul(s.v, d / 2)), 'construction'), pt(k, 'K')] });
          steps.push({ instruction: 'Draw a line from the larger centre through K to its circle, and a parallel line from the other centre: the tangent points. Join them with a thick line.',
            calloutAt: s.tA, reveals: [L(big.c, big === a ? s.tA : s.tB, 'construction'), L(small.c, small === a ? s.tA : s.tB, 'construction'), pt(s.tA), pt(s.tB), L(s.tA, s.tB)] });
        }
        K.push({ tA: s.tA, tB: s.tB, steps });
      } else {
        const R = lk.R, enc = lk.type === 'enclose';
        const r1 = enc ? R - a.r : R + a.r, r2 = enc ? R - b.r : R + b.r;
        if (r1 + r2 < d || Math.abs(r1 - r2) > d) { console.warn('figure ' + cfg.id + ': R' + R + ' cannot reach both bosses'); K.push({ tA: [NaN, NaN], tB: [NaN, NaN], steps: [] }); return; }
        const ps = cc(a.c, r1, b.c, r2);
        const Mab = mul(add(a.c, b.c), 0.5), side = p => dot(sub(p, Mab), outN(i));
        const O = enc ? (side(ps[0]) < side(ps[1]) ? ps[0] : ps[1]) : (side(ps[0]) > side(ps[1]) ? ps[0] : ps[1]);
        const tA = enc ? add(O, mul(unit(sub(a.c, O)), R)) : add(a.c, mul(unit(sub(O, a.c)), a.r));
        const tB = enc ? add(O, mul(unit(sub(b.c, O)), R)) : add(b.c, mul(unit(sub(O, b.c)), b.r));
        const mid = add(O, mul(unit(sub(mul(add(tA, tB), 0.5), O)), R));
        const how = enc ? ' − ' : ' + ';
        K.push({ tA, tB, steps: [
          { instruction: 'R' + R + ' ' + (enc ? 'ARC ROUND ' : 'ARC BETWEEN ') + A + ' AND ' + Bn + ': from ' + A + ' draw an arc of radius ' + fmt(enc ? R - a.r : R + a.r) + ' (' + R + how + a.r + '), and from ' + Bn + ' one of radius ' + fmt(enc ? R - b.r : R + b.r) + ' (' + R + how + b.r + '). They cross at O' + (i + 1) + '.',
            calloutAt: O, reveals: [swing(a.c, enc ? R - a.r : R + a.r, O, 12), swing(b.c, enc ? R - b.r : R + b.r, O, 12), pt(O, 'O' + (i + 1))] },
          { instruction: (enc ? 'Draw lines from O' + (i + 1) + ' through ' + A + ' and ' + Bn + ', extended to the circles' : 'Join O' + (i + 1) + ' to ' + A + ' and to ' + Bn) + ': the tangent points. With centre O' + (i + 1) + ', draw the R' + R + ' arc between them.',
            calloutAt: mid, reveals: [L(O, enc ? tA : a.c, 'construction'), L(O, enc ? tB : b.c, 'construction'), pt(tA), pt(tB), arcVia(O, R, tA, tB, mid, 'A')] }] });
      }
    });
    const valid = K.every(k => [k.tA, k.tB].every(p => isFinite(p[0]) && isFinite(p[1])));
    if (!valid) { console.warn('figure ' + cfg.id + ': impossible tangent'); return; }
    // outer arcs of each boss, between the incoming and outgoing tangent points
    const bossArcs = B.map((b, i) => {
      const pin = K[(i - 1 + n) % n].tB, pout = K[i].tA, sumN = add(outN((i - 1 + n) % n), outN(i)), m = add(b.c, mul(Math.hypot(...sumN) > 0.2 ? unit(sumN) : unit(sub(b.c, G)), b.r));
      return arcVia(b.c, b.r, pin, pout, m, 'A');
    });
    const cl = b => { const e = b.r + 5; return [L([b.c[0] - e, b.c[1]], [b.c[0] + e, b.c[1]], 'centre'), L([b.c[0], b.c[1] - e], [b.c[0], b.c[1] + e], 'centre')]; };
    const xs = B.map(b => b.c[0]), ys = B.map(b => b.c[1]);
    const minY = Math.min(...B.map(b => b.c[1] - b.r)), maxY = Math.max(...B.map(b => b.c[1] + b.r)), minX = Math.min(...B.map(b => b.c[0] - b.r));
    const uniqSorted = arr => arr.slice().sort((p, q) => p - q).filter((v, i, s) => i === 0 || v - s[i - 1] > 0.5);
    const dx = uniqSorted(xs), dy = uniqSorted(ys);
    const dims = [...dx.slice(1).map((x, i) => ({ kind: 'dimension', p1: [dx[i], maxY], p2: [x, maxY], offset: 10, text: fmt(x - dx[i]) })),
      ...dy.slice(1).map((y, i) => ({ kind: 'dimension', p1: [minX, y], p2: [minX, dy[i]], offset: -10, text: fmt(y - dy[i]) }))];
    const S0 = B[0].c;
    const steps = [
      { instruction: 'GIVEN: the ' + cfg.part + ' (see the specification). Copy it to scale 1:1, starting with centre A at S. Show ALL constructions. First draw the centre lines of every boss: ' + B.map((b, i) => nm(i)).join(', ') + '.',
        calloutAt: S0, reveals: [...B.flatMap(cl), ...B.map((b, i) => pt(b.c, i === 0 ? 'S' : nm(i))), ...dims] },
      { instruction: 'Draw each boss as a thin circle: ' + B.map((b, i) => nm(i) + ' R' + b.r).join(', ') + '.', calloutAt: add(S0, [B[0].r, 0]), reveals: B.map(b => circle(b.c, b.r, 'construction')) },
      ...K.flatMap(k => k.steps),
      { instruction: 'Line in the outside of each boss between its tangent points (thick).', calloutAt: add(S0, mul(unit(sub(S0, G)), B[0].r)), reveals: bossArcs },
      { instruction: 'Draw the holes: ' + B.filter(b => b.hole).map(b => 'Ø' + b.hole).join(', ') + (cfg.extraText ? '. ' + cfg.extraText : '.'), calloutAt: S0,
        reveals: [...B.filter(b => b.hole).map(b => circle(b.c, b.hole / 2)), ...(cfg.extra ? cfg.extra() : [])] },
      { instruction: 'Add the radii and diameters, and name the figure.', calloutAt: [G[0], maxY + 22],
        reveals: [...B.map((b, i) => lbl(add(b.c, mul(unit(sub(b.c, G)), b.r + 7)), 'R' + b.r, { size: 2.6, color: '#e8eaf2' })),
          ...cfg.links.map((lk, i) => lk.type === 'line' ? null : lbl(mul(add(K[i].tA, K[i].tB), 0.5), 'R' + lk.R, { size: 2.6, color: '#e8eaf2' })).filter(Boolean),
          lbl([G[0], maxY + 28], cfg.part.toUpperCase() + '  SCALE 1:1', { size: 3.2 })] },
    ];
    const spec = B.map((b, i) => nm(i) + ': R' + b.r + (b.hole ? ', hole Ø' + b.hole : '')).join('; ');
    C[cfg.id] = { id: cfg.id, title: cfg.title, summary: cfg.summary, printLayout: 'full',
      workbookPrompt: 'Copy the ' + cfg.part + ' to scale 1:1. Bosses ' + spec + '. ' + cfg.prompt + ' Show all constructions for the tangents and tangent arcs.',
      steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(cfg.id);
  }

  figure({ id: 'fig-rocker-arm', title: 'Copy a Figure: Rocker Arm', part: 'rocker arm',
    bosses: [{ c: [70, 140], r: 22, hole: 24 }, { c: [150, 80], r: 14, hole: 12 }, { c: [215, 135], r: 12, hole: 10 }],
    links: [{ type: 'line' }, { type: 'enclose', R: 75 }, { type: 'arc', R: 80 }],
    summary: 'A three-boss rocker arm: a straight tangent, an enclosing arc over the right-hand end and a concave arc underneath.',
    prompt: 'A to B is 80 right and 60 up; A to C is 145 right and 5 up. A straight tangent joins A and B, an R75 arc encloses B and C, and an R80 concave arc joins C and A underneath.' });
  figure({ id: 'fig-concave-link', title: 'Copy a Figure: Link with Concave Sides', part: 'concave link',
    bosses: [{ c: [70, 110], r: 24, hole: 22 }, { c: [200, 110], r: 18, hole: 16 }],
    links: [{ type: 'arc', R: 120 }, { type: 'arc', R: 120 }],
    summary: 'A two-boss link waisted on both sides by R120 concave arcs: the same construction twice, above and below.',
    prompt: 'The bosses are 130 apart on one horizontal centre line. R120 concave arcs join them above and below.' });
  figure({ id: 'fig-mounting-plate', title: 'Copy a Figure: Four-Hole Mounting Plate', part: 'mounting plate',
    bosses: [{ c: [60, 70], r: 14, hole: 12 }, { c: [200, 70], r: 14, hole: 12 }, { c: [200, 160], r: 14, hole: 12 }, { c: [60, 160], r: 14, hole: 12 }],
    links: [{ type: 'arc', R: 120 }, { type: 'line' }, { type: 'arc', R: 120 }, { type: 'line' }],
    extra: () => [circle([130, 115], 20), circle([130, 115], 28, 'construction')], extraText: 'Add the Ø40 central hole.',
    summary: 'A mounting plate with four equal corner bosses: straight sides, R120 concave arcs top and bottom, and a central hole.',
    prompt: 'The hole centres form a rectangle 140 × 90. The ends are straight tangents; the top and bottom are R120 concave arcs. A Ø40 hole is in the middle.' });
  figure({ id: 'fig-cam-lever', title: 'Copy a Figure: Cam Lever', part: 'cam lever',
    bosses: [{ c: [70, 120], r: 26, hole: 20 }, { c: [195, 95], r: 12, hole: 8 }],
    links: [{ type: 'line' }, { type: 'enclose', R: 140 }],
    summary: 'A lever with a straight top edge and a large R140 arc enclosing both bosses underneath.',
    prompt: 'B is 125 right and 25 up from A. A straight tangent joins the bosses along the top; an R140 arc encloses both bosses underneath.' });
  figure({ id: 'fig-triangular-plate', title: 'Copy a Figure: Triangular Link Plate', part: 'triangular link plate',
    bosses: [{ c: [70, 150], r: 18, hole: 16 }, { c: [135, 55], r: 18, hole: 16 }, { c: [205, 150], r: 18, hole: 16 }],
    links: [{ type: 'line' }, { type: 'line' }, { type: 'arc', R: 60 }],
    extra: () => [circle([137, 118], 14)], extraText: 'Add the Ø28 lightening hole.',
    summary: 'Three equal bosses: straight tangents on two sides and an R60 concave arc along the base, with a lightening hole.',
    prompt: 'A and C are 135 apart; B is 65 right of A and 95 up. Straight tangents join A-B and B-C; an R60 concave arc joins C and A. A Ø28 hole is at 67 right and 32 up from A.' });
  figure({ id: 'fig-crank', title: 'Copy a Figure: Crank', part: 'crank',
    bosses: [{ c: [70, 110], r: 28, hole: 26 }, { c: [195, 110], r: 16, hole: 14 }],
    links: [{ type: 'line' }, { type: 'line' }],
    extra: () => [{ kind: 'polygon', points: [[64, 97], [76, 97], [76, 123], [64, 123]], lineType: 'B' }], extraText: 'Add the 12 mm key flat in the large hole (thin square marks the flat position).',
    summary: 'A tapered crank: two external tangents, one above and one below, between unequal bosses.',
    prompt: 'The bosses are 125 apart on one horizontal centre line. Straight tangents join them above and below.' });
  figure({ id: 'fig-bell-crank', title: 'Copy a Figure: Bell Crank', part: 'bell crank',
    bosses: [{ c: [80, 60], r: 15, hole: 12 }, { c: [80, 155], r: 24, hole: 22 }, { c: [195, 155], r: 15, hole: 12 }],
    links: [{ type: 'line' }, { type: 'line' }, { type: 'arc', R: 70 }],
    summary: 'An L-shaped bell crank: straight outside edges and an R70 concave arc in the inside corner.',
    prompt: 'A is 95 above B; C is 115 to the right of B. Straight tangents join A-B and B-C on the outside; an R70 concave arc joins C and A in the inside corner.' });
  figure({ id: 'fig-pedal-arm', title: 'Copy a Figure: Pedal Arm', part: 'pedal arm',
    bosses: [{ c: [60, 90], r: 25, hole: 24 }, { c: [170, 145], r: 15, hole: 12 }, { c: [225, 75], r: 13, hole: 10 }],
    links: [{ type: 'arc', R: 70 }, { type: 'line' }, { type: 'enclose', R: 120 }],
    summary: 'A three-boss pedal arm: a concave arc underneath, a straight edge on the right and a big enclosing arc over the top.',
    prompt: 'B is 110 right and 55 down from A; C is 165 right and 15 up from A. An R70 concave arc joins A and B, a straight tangent joins B and C, and an R120 arc encloses C and A over the top.' });
  figure({ id: 'fig-clamp-jaw', title: 'Copy a Figure: Clamp Jaw', part: 'clamp jaw',
    bosses: [{ c: [60, 80], r: 16, hole: 14 }, { c: [150, 60], r: 20, hole: 18 }, { c: [215, 120], r: 14, hole: 10 }, { c: [110, 165], r: 16, hole: 14 }],
    links: [{ type: 'line' }, { type: 'enclose', R: 70 }, { type: 'arc', R: 50 }, { type: 'line' }],
    summary: 'A four-boss clamp jaw mixing all three joints: straight tangents, an enclosing arc and a concave arc.',
    prompt: 'From A: B is 90 right and 20 up, C is 155 right and 40 down, D is 50 right and 85 down. Straight tangents join A-B and D-A, an R70 arc encloses B and C, and an R50 concave arc joins C and D.' });
  figure({ id: 'fig-hanger', title: 'Copy a Figure: Hanger Bracket', part: 'hanger bracket',
    bosses: [{ c: [65, 70], r: 14, hole: 12 }, { c: [205, 70], r: 14, hole: 12 }, { c: [135, 160], r: 26, hole: 28 }],
    links: [{ type: 'arc', R: 100 }, { type: 'arc', R: 45 }, { type: 'arc', R: 45 }],
    summary: 'A hanger: two fixing lugs with an R100 concave top edge, and R45 concave arcs sweeping down to the bearing boss.',
    prompt: 'A and B are 140 apart on one horizontal line; C is midway, 90 below. An R100 concave arc joins A and B; R45 concave arcs join B-C and C-A.' });
})(window);
