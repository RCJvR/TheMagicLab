// Transition pieces: generated triangulation exercises (Gr 11-12). Runs after
// transition-pieces.data.js. Front view above, top view below (as in the workbooks), a
// true-length diagram beside the front view, and the development built triangle by triangle.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#fde047' }, opts || {});
  const GREY = { color: '#94a3b8' };
  const d2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const LETTERS = 'abcdefghijklmnop';

  const reg = (n, R, a0, c) => Array.from({ length: n }, (_, i) => { const a = (a0 + i * 360 / n) * Math.PI / 180; return [c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)]; });
  const rect = (w, d, c) => [[c[0] - w / 2, c[1] - d / 2], [c[0] + w / 2, c[1] - d / 2], [c[0] + w / 2, c[1] + d / 2], [c[0] - w / 2, c[1] + d / 2]];

  // circle-circle intersections
  function cc(c1, r1, c2, r2) {
    const d = d2(c1, c2), a = (r1 * r1 - r2 * r2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
    const u = [(c2[0] - c1[0]) / d, (c2[1] - c1[1]) / d], m = [c1[0] + u[0] * a, c1[1] + u[1] * a];
    return [[m[0] - u[1] * h, m[1] + u[0] * h], [m[0] + u[1] * h, m[1] - u[0] * h]];
  }
  const side = (a, b, p) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);

  // cfg: id, title, summary, prompt, bottom [[x, y]…], top [[x, y]…] (both anticlockwise from above), h
  function transition(cfg) {
    const B = cfg.bottom, T = cfg.top, h = cfg.h, nB = B.length, nT = T.length;
    const cx = B.reduce((s, p) => s + p[0], 0) / nB, cy = B.reduce((s, p) => s + p[1], 0) / nB;
    const angOf = p => Math.atan2(p[1] - cy, p[0] - cx);
    const TAU = 2 * Math.PI, md = a => ((a % TAU) + TAU) % TAU;
    // the seam starts at the front-left bottom corner
    let b0 = 0; B.forEach((p, i) => { const q = B[b0]; if (p[1] < q[1] - 1e-6 || (Math.abs(p[1] - q[1]) < 1e-6 && p[0] < q[0])) b0 = i; });
    const aB0 = angOf(B[b0]);
    const signed = a => { const d = md(a - aB0); return d > Math.PI ? d - TAU : d; };
    let t0 = 0; T.forEach((p, i) => { if (Math.abs(signed(angOf(p))) < Math.abs(signed(angOf(T[t0]))) - 1e-9) t0 = i; });
    const AB = [0], AT = [signed(angOf(T[t0]))];
    for (let k = 1; k <= nB; k++) AB.push(AB[k - 1] + (k === nB ? md(aB0 - angOf(B[(b0 + k - 1) % nB])) || TAU : md(angOf(B[(b0 + k) % nB]) - angOf(B[(b0 + k - 1) % nB]))));
    for (let k = 1; k <= nT; k++) AT.push(AT[k - 1] + md(angOf(T[(t0 + k) % nT]) - angOf(T[(t0 + k - 1) % nT])) );
    AT[nT] = AT[0] + TAU;
    const bAng = k => AB[k], tAng = k => AT[k];
    // zipper triangulation: lateral edges (bi, tj) in order round the piece
    const lat = [[0, 0]], tris = [];
    let i = 0, j = 0;
    while (i < nB || j < nT) {
      const nextB = i < nB ? bAng(i + 1) : Infinity, nextT = j < nT ? tAng(j + 1) : Infinity;
      if (nextB <= nextT + 1e-9) { tris.push({ kind: 'b', b: i, t: j }); i++; } else { tris.push({ kind: 't', b: i, t: j }); j++; }
      lat.push([i, j]);
    }
    const Bk = k => B[(b0 + k) % nB], Tk = k => T[(t0 + k) % nT];
    const B3 = k => [Bk(k)[0], Bk(k)[1], 0], T3 = k => [Tk(k)[0], Tk(k)[1], h];
    const plan = ([bi, tj]) => d2(Bk(bi), Tk(tj));
    const tl = e => Math.hypot(plan(e), h);

    // length classes
    const classes = [];
    lat.forEach(e => { const l = tl(e); if (!classes.some(c => Math.abs(c.l - l) < 0.3)) classes.push({ l, p: plan(e) }); });
    classes.sort((a, b) => a.l - b.l);
    const cls = e => classes.findIndex(c => Math.abs(c.l - tl(e)) < 0.3);

    // layout
    const xs = B.concat(T).map(p => p[0]), ys = B.concat(T).map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const FX = 30 - x0, GY = 30 + h, gap = 22, TY = GY + gap + y1;   // top view: screen y = TY - y (front at the bottom)
    const F = p => [FX + p[0], GY - p[2]], Tv = p => [FX + p[0], TY - p[1]];
    const TLX = FX + x1 + 26, maxP = Math.max(...classes.map(c => c.p));
    const steps = [];

    // 1. top view
    const nameB = k => String.fromCharCode(65 + k), nameT = k => String.fromCharCode(65 + nB + k);
    steps.push({ instruction: 'Draw the TOP VIEW: the bottom outline and the top outline (it is a hollow duct, so both are seen). Letter the corners, starting at the seam.',
      calloutAt: Tv([x1, y1, 0]),
      reveals: [{ kind: 'polygon', points: B.map(p => Tv(p)), lineType: 'A' }, { kind: 'polygon', points: T.map(p => Tv(p)), lineType: 'A' },
        ...Array.from({ length: nB }, (_, k) => { const p = Tv(Bk(k)), c = Tv([cx, cy]), u = [(p[0] - c[0]), (p[1] - c[1])], l = Math.hypot(u[0], u[1]) || 1; return lbl([p[0] + u[0] / l * 4.5, p[1] + u[1] / l * 4.5 + 1], nameB(k), { size: 2.8 }); }),
        ...Array.from({ length: nT }, (_, k) => { const p = Tv(Tk(k)), c = Tv([cx, cy]), u = [(p[0] - c[0]), (p[1] - c[1])], l = Math.hypot(u[0], u[1]) || 1; return lbl([p[0] - u[0] / l * 4, p[1] - u[1] / l * 4 + 1], nameT(k), { size: 2.6 }); })] });
    steps.push({ instruction: 'Divide the sides into triangles: join each top corner to the bottom corners it is nearest to, so that every face is made of flat triangles. These lines are the fold lines.',
      calloutAt: Tv([(Bk(0)[0] + Tk(0)[0]) / 2, (Bk(0)[1] + Tk(0)[1]) / 2]), reveals: lat.slice(0, -1).map(e => L(Tv(Bk(e[0])), Tv(Tk(e[1])), 'C')) });
    // 2. front view
    const triN = tr => {
      const a = B3(tr.b), b = tr.kind === 'b' ? B3(tr.b + 1) : T3(tr.t + 1), c = T3(tr.t);
      const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      let n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
      const m = [(a[0] + b[0] + c[0]) / 3 - cx, (a[1] + b[1] + c[1]) / 3 - cy];
      if (n[0] * m[0] + n[1] * m[1] < 0) n = n.map(q => -q);
      return n;
    };
    const front = tris.map(tr => triN(tr)[1] < -1e-6);
    steps.push({ instruction: 'Project the corners straight up from the top view and draw the FRONT VIEW: the bottom on the XY line, the top ' + h + ' mm above it.',
      calloutAt: F([x1, 0, h / 2]),
      reveals: [L([FX + x0 - 10, GY], [FX + x1 + 10, GY], 'B'), ...[...B, ...T].map(p => L(Tv(p), [FX + p[0], GY - (T.includes(p) ? h : 0)], 'construction')),
        L(F([Math.min(...B.map(p => p[0])), 0, 0]), F([Math.max(...B.map(p => p[0])), 0, 0])), L(F([Math.min(...T.map(p => p[0])), 0, h]), F([Math.max(...T.map(p => p[0])), 0, h]))] });
    const latVis = lat.slice(0, -1).map((e, k) => { const prev = front[(k - 1 + tris.length) % tris.length], next = front[k]; return prev || next; });
    const xMinE = Math.min(...lat.map(e => Math.min(F(B3(e[0]))[0], F(T3(e[1]))[0]))), xMaxE = Math.max(...lat.map(e => Math.max(F(B3(e[0]))[0], F(T3(e[1]))[0])));
    steps.push({ instruction: 'Draw the fold lines in the front view: the outline at each end, and the lines on the faces you can see.',
      calloutAt: F([cx, 0, h / 2]),
      reveals: lat.slice(0, -1).filter((e, k) => latVis[k]).map(e => { const p = F(B3(e[0])), q = F(T3(e[1])); const outline = Math.min(p[0], q[0]) <= xMinE + 0.05 || Math.max(p[0], q[0]) >= xMaxE - 0.05; return L(p, q, outline ? 'A' : 'C'); }) });
    // 3. true lengths
    steps.push({ instruction: 'Name the fold lines by their length in the top view: lines of the same plan length get the same letter (' + classes.map((c, k) => LETTERS[k]).join(', ') + ').',
      calloutAt: Tv([cx, cy, 0]),
      reveals: lat.slice(0, -1).map(e => { const p = Tv(Bk(e[0])), q = Tv(Tk(e[1])); return lbl([(p[0] + q[0]) / 2 + 1.5, (p[1] + q[1]) / 2 - 1], LETTERS[cls(e)], { size: 2.6, color: '#f472b6' }); }) });
    steps.push({ instruction: 'TRUE-LENGTH DIAGRAM beside the front view: a vertical line ' + h + ' mm high (the height of the piece) and a base line on the XY line.',
      calloutAt: [TLX, GY - h / 2], reveals: [L([TLX, GY], [TLX, GY - h]), L([TLX - 4, GY], [TLX + maxP + 6, GY], 'B'), L([TLX - 3, GY - h], [TLX + 3, GY - h], 'B')] });
    steps.push({ instruction: 'Mark each plan length along the base line from the foot of the vertical, and join it to the top: the hypotenuse is the TRUE LENGTH.',
      calloutAt: [TLX + maxP / 2, GY - h / 2],
      reveals: classes.flatMap((c, k) => [L([TLX, GY - h], [TLX + c.p, GY], 'C'), lbl([TLX + c.p, GY + 4], LETTERS[k], { size: 2.6, color: '#f472b6' }),
        lbl([TLX + maxP + 10, GY - h + 4 + k * 4.5], LETTERS[k] + ' = ' + c.l.toFixed(0) + ' mm', { size: 2.8, anchor: 'start', color: '#f472b6' })]) });
    // 4. development
    const DX0 = TLX, DY0 = GY + 16;
    const pos = { b: {}, t: {} };
    pos.b[0] = [DX0, DY0]; pos.t[0] = [DX0, DY0 - tl([0, 0])];
    let last = null;
    const triPts = []; let devBox = null;
    tris.forEach((tr, k) => {
      const pb = pos.b[tr.b], pt = pos.t[tr.t];
      let nw, rB, rT;
      if (tr.kind === 'b') { rB = d2(Bk(tr.b), Bk(tr.b + 1)); rT = tl([tr.b + 1, tr.t]); }
      else { rB = tl([tr.b, tr.t + 1]); rT = d2(Tk(tr.t), Tk(tr.t + 1)); }
      const cand = cc(pb, rB, pt, rT);
      if (last) nw = side(pb, pt, cand[0]) * side(pb, pt, last) < 0 ? cand[0] : cand[1];
      else nw = cand[0][0] > cand[1][0] ? cand[0] : cand[1];
      last = tr.kind === 'b' ? pb : pt;
      if (tr.kind === 'b') pos.b[tr.b + 1] = nw; else pos.t[tr.t + 1] = nw;
      triPts.push({ tr, pb, pt, nw });
    });
    // turn the development to its flattest position and place it beside the true-length diagram
    {
      const all = [...Object.values(pos.b), ...Object.values(pos.t)];
      let best = null;
      for (let a = 0; a < 180; a += 3) {
        const c = Math.cos(a * Math.PI / 180), sn = Math.sin(a * Math.PI / 180), ys = all.map(p => p[0] * sn + p[1] * c);
        const hh = Math.max(...ys) - Math.min(...ys);
        if (!best || hh < best.h - 1e-6) best = { a, h: hh };
      }
      const c = Math.cos(best.a * Math.PI / 180), sn = Math.sin(best.a * Math.PI / 180);
      const R = p => [p[0] * c - p[1] * sn, p[0] * sn + p[1] * c];
      const rr = all.map(R), mx = Math.min(...rr.map(p => p[0])), my = Math.min(...rr.map(p => p[1]));
      const Tf = p => { const q = R(p); return [q[0] - mx + DX0, q[1] - my + DY0]; };
      ['b', 't'].forEach(k => Object.keys(pos[k]).forEach(i => { pos[k][i] = Tf(pos[k][i]); }));
      triPts.forEach(o => { o.pb = Tf(o.pb); o.pt = Tf(o.pt); o.nw = Tf(o.nw); });
      devBox = [DX0, DY0 + best.h];
    }
    steps.push({ instruction: 'DEVELOPMENT: start with the seam ' + nameB(0) + nameT(0) + ' at its true length (' + LETTERS[cls([0, 0])] + ').',
      calloutAt: pos.b[0], reveals: [L(pos.b[0], pos.t[0]), lbl([pos.b[0][0] - 4, pos.b[0][1] + 2], nameB(0), { size: 2.8 }), lbl([pos.t[0][0] - 4, pos.t[0][1]], nameT(0), { size: 2.8 })] });
    // two triangles per step
    for (let k = 0; k < triPts.length; k += 2) {
      const grp = triPts.slice(k, k + 2), rev = [];
      grp.forEach(({ tr, pb, pt, nw }) => {
        if (tr.kind === 'b') { rev.push({ kind: 'arc-construction', ...arcAt(pb, d2(pb, nw), nw) }, { kind: 'arc-construction', ...arcAt(pt, d2(pt, nw), nw) }, L(pb, nw, 'A'), L(pt, nw, 'C'), lbl([nw[0] + 2, nw[1] + 4], nameB((tr.b + 1) % nB), { size: 2.6 })); }
        else { rev.push({ kind: 'arc-construction', ...arcAt(pb, d2(pb, nw), nw) }, { kind: 'arc-construction', ...arcAt(pt, d2(pt, nw), nw) }, L(pt, nw, 'A'), L(pb, nw, 'C'), lbl([nw[0] + 2, nw[1] - 2], nameT((tr.t + 1) % nT), { size: 2.6 })); }
      });
      const kinds = grp.map(g => g.tr.kind === 'b' ? 'a bottom edge (true length from the top view)' : 'a top edge (true length from the top view)');
      steps.push({ instruction: k === 0 ? 'Add the triangles one at a time. Each new corner is found by two arcs: one the length of ' + kinds[0] + ', the other the true length of the next fold line from the diagram.' : 'Add the next triangles the same way, keeping to the order round the top view.',
        calloutAt: grp[grp.length - 1].nw, reveals: rev });
    }
    const lastB = pos.b[nB], lastT = pos.t[nT];
    steps.push({ instruction: 'Close the development with the second half of the seam, ' + nameB(0) + nameT(0) + ' again, and line in the outline. The fold lines stay thin.',
      calloutAt: lastB, reveals: [L(lastB, lastT), lbl([(lastB[0] + lastT[0]) / 2 + 6, (lastB[1] + lastT[1]) / 2], 'SEAM / NAAT', { size: 2.6 }),
        lbl([devBox[0] + 50, devBox[1] + 8], 'DEVELOPMENT / ONTWIKKELING', GREY), lbl([FX + (x0 + x1) / 2, GY + 6], 'FRONT VIEW / VOORAANSIG', Object.assign({ size: 2.6 }, GREY)), lbl([FX + (x0 + x1) / 2, TY - y0 + 7], 'TOP VIEW / BOAANSIG', Object.assign({ size: 2.6 }, GREY))] });
    // the 3D model: the triangles as thin sheet (two-sided; the ends stay open)
    const sheet = pts => { const u = pts[1].map((v, k) => v - pts[0][k]), w = pts[2].map((v, k) => v - pts[0][k]);
      return { pts, holes: [], n: [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]], twoSided: true }; };
    const model = tris.map(t => sheet(t.kind === 'b' ? [B3(t.b), B3(t.b + 1), T3(t.t)] : [B3(t.b), T3(t.t + 1), T3(t.t)]));
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'first', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full', _solids: [model],
      steps: steps.filter(s => s.reveals.length).map((s, k) => Object.assign({ id: k + 1 }, s)) };
    ORDER.push(cfg.id);
  }
  // a short arc of circle (c, r) around the direction of p, in the engine's screen degrees
  function arcAt(c, r, p) { const a = Math.atan2(p[1] - c[1], p[0] - c[0]) * 180 / Math.PI; return { center: c, r, startDeg: a - 8, endDeg: a + 8, lineType: 'construction' }; }

  transition({ id: 'tp-square-to-rotated-square', title: 'Square to Square at 45°', h: 60,
    bottom: rect(72, 72, [0, 0]), top: reg(4, 24, 0, [0, 0]),
    summary: 'A square duct joined to a smaller square turned through 45°: every face is a triangle, so the triangulation is already done for you.',
    prompt: 'A transition piece joins a 72 mm square duct (bottom) to a smaller square duct turned at 45° (diagonal 48 mm), 60 mm higher. Draw the front view, top view, true-length diagram and the development, with the seam at the front-left corner.' });
  transition({ id: 'tp-rectangle-to-square-offset', title: 'Rectangle to Offset Square', h: 64,
    bottom: rect(90, 60, [0, 0]), top: rect(36, 36, [-12, 8]),
    summary: 'A rectangular duct to a smaller square duct that is not central: no two faces are the same, so every fold line needs its own true length.',
    prompt: 'A transition piece joins a 90 × 60 rectangular duct to a 36 mm square duct, 64 mm higher, whose centre is 12 mm to the left and 8 mm behind the centre of the rectangle. Draw the front view, top view, true-length diagram and development.' });
  transition({ id: 'tp-square-to-hexagon', title: 'Square to Hexagon', h: 58,
    bottom: rect(70, 70, [0, 0]), top: reg(6, 24, 0, [0, 0]),
    summary: 'A square duct to a hexagonal duct: four corners below, six above, joined by a strip of ten triangles.',
    prompt: 'A transition piece joins a 70 mm square duct (bottom) to a regular hexagonal duct (48 mm across corners, two corners on the left-right centre line), 58 mm higher. Draw the front view, top view, true-length diagram and development.' });
  transition({ id: 'tp-hexagon-to-square', title: 'Hexagon to Square', h: 55,
    bottom: reg(6, 42, 0, [0, 0]), top: rect(36, 36, [0, 0]),
    summary: 'The other way round: a hexagonal base narrowing to a square top.',
    prompt: 'A transition piece joins a regular hexagonal duct (84 mm across corners) at the bottom to a 36 mm square duct, 55 mm higher. Draw the front view, top view, true-length diagram and development.' });
  transition({ id: 'tp-eccentric-hopper', title: 'Eccentric Square Hopper', h: 60,
    bottom: rect(76, 76, [0, 0]), top: rect(34, 34, [16, 0]),
    summary: 'A square hopper with its outlet moved to one side: each face is a quadrilateral split into two triangles by a diagonal.',
    prompt: 'A square-to-square hopper: inlet 76 mm square at the bottom, outlet 34 mm square 60 mm higher, with its centre 16 mm to the right. Draw the front view, top view, true-length diagram and development.' });
})(window);
