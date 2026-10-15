// Orthographic projection (Gr 10): sectional views of CASTINGS, as in the workbooks. The front and
// top views are given (half size) with cutting plane A-A along the middle of the top view; learners
// draw the top view and the SECTIONAL front view on A-A, full size, 3rd angle.
// A casting is made of simple pieces (prisms with drilled holes). The section is the back half
// (y ≥ 0) of every piece, so holes on the plane come out as gaps and ribs cut lengthwise are known.
// Needs solid-kit.js, assembly-kit.js and isometric-drawing-more.data.js (window.ViewLines).
(function (global) {
  'use strict';
  const SK = global.SolidKit, AK = global.AssemblyKit, VL = global.ViewLines;
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const rad = d => d * Math.PI / 180;
  const N = 36;
  const circle = (c, r) => Array.from({ length: N }, (_, i) => { const a = rad(360 * i / N); return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
  const arc = (c, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = rad(a0 + (a1 - a0) * i / n); return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });

  // extrude a profile (anticlockwise) with round holes; smooth: a predicate on profile vertices
  function extrudeH(profile, holes, plane, t0, t1, smooth) {
    const to3 = (a, b, t) => plane === 'xz' ? [a, t, b] : [a, b, t];
    const axis = plane === 'xz' ? [0, 1, 0] : [0, 0, 1];
    const nrm = (na, nb) => plane === 'xz' ? [na, 0, nb] : [na, nb, 0];
    const faces = [
      SK.face(profile.map(([a, b]) => to3(a, b, t0)), { n: axis.map(v => -v), holes: holes.map(h => h.map(([a, b]) => to3(a, b, t0))) }),
      SK.face(profile.map(([a, b]) => to3(a, b, t1)), { n: axis, holes: holes.map(h => h.map(([a, b]) => to3(a, b, t1))) }),
    ];
    const sides = (loop, inward, sm) => loop.forEach((p, i) => {
      const j = (i + 1) % loop.length, q = loop[j], na = q[1] - p[1], nb = -(q[0] - p[0]);
      faces.push(SK.face([to3(p[0], p[1], t0), to3(q[0], q[1], t0), to3(q[0], q[1], t1), to3(p[0], p[1], t1)],
        { n: inward ? nrm(-na, -nb) : nrm(na, nb), smooth: sm ? { a: sm(p), b: sm(q) } : null }));
    });
    sides(profile, false, smooth);
    holes.forEach(h => sides(h, true, () => true));
    return faces;
  }
  // keep the part of an anticlockwise plan polygon with y ≥ 0 (Sutherland–Hodgman)
  function clipY(poly) {
    const out = [];
    poly.forEach((p, i) => {
      const q = poly[(i + 1) % poly.length];
      if (p[1] >= -1e-9) out.push(p);
      if ((p[1] > 1e-9 && q[1] < -1e-9) || (p[1] < -1e-9 && q[1] > 1e-9)) { const t = p[1] / (p[1] - q[1]); out.push([p[0] + (q[0] - p[0]) * t, 0]); }
    });
    return out.map(p => [p[0], Math.abs(p[1]) < 1e-9 ? 0 : p[1]]);
  }
  // along the cut edge (y = 0, running +x), notch out the holes centred on the plane
  function notch(poly, holes) {
    const on = holes.filter(h => Math.abs(h.c[1]) < 1e-6);
    if (!on.length) return poly;
    const out = [];
    poly.forEach((p, i) => {
      const q = poly[(i + 1) % poly.length];
      out.push(p);
      if (Math.abs(p[1]) < 1e-9 && Math.abs(q[1]) < 1e-9 && q[0] > p[0]) {
        on.filter(h => h.c[0] - h.r > p[0] - 1e-6 && h.c[0] + h.r < q[0] + 1e-6).sort((a, b) => a.c[0] - b.c[0])
          .forEach(h => out.push(...arc(h.c, h.r, 180, 0, 18)));
      }
    });
    return out;
  }
  // x-intervals where a polygon crosses the line y = 0
  function spansOnY0(poly) {
    const xs = [];
    poly.forEach((p, i) => { const q = poly[(i + 1) % poly.length]; if ((p[1] > 0) !== (q[1] > 0)) xs.push(p[0] + (q[0] - p[0]) * (0 - p[1]) / (q[1] - p[1])); });
    xs.sort((a, b) => a - b);
    const out = []; for (let i = 0; i + 1 < xs.length; i += 2) out.push([xs[i], xs[i + 1]]);
    return out;
  }
  const minus = (spans, cuts) => { let s = spans; cuts.forEach(([a, b]) => { s = s.flatMap(([u, v]) => { if (b <= u || a >= v) return [[u, v]]; const r = []; if (a > u) r.push([u, a]); if (b < v) r.push([b, v]); return r; }); }); return s; };

  // pieces: { kind: 'xz', profile, holes: [{ c: [x, z], r }], y0, y1, rib, smooth } (a profile in the
  //   front plane, extruded front to back) or { kind: 'xy', profile, holes: [{ c: [x, y], r }], z0, z1, round }
  function build(pieces) {
    const full = [], kept = [], caps = [];
    pieces.forEach(pc => {
      if (pc.kind === 'xz') {
        const hs = (pc.holes || []).map(h => circle(h.c, h.r)), sm = pc.smooth || null;
        full.push(extrudeH(pc.profile, hs, 'xz', pc.y0, pc.y1, sm));
        if (pc.y1 > 1e-9) kept.push(extrudeH(pc.profile, hs, 'xz', Math.max(0, pc.y0), pc.y1, sm));
        if (pc.y0 < -1e-9 && pc.y1 > 1e-9) caps.push({ polys: [pc.profile, ...hs], rib: pc.rib });
      } else {
        const hs = pc.holes || [];
        // smooth along the round surfaces, but not at the cut line, where the surface meets the flat cut face
        const onRound = p => Math.abs(p[1]) > 1e-6 && ((pc.round && Math.abs(Math.hypot(p[0] - pc.round.c[0], p[1] - pc.round.c[1]) - pc.round.r) < 1e-3) || hs.some(h => Math.abs(Math.hypot(p[0] - h.c[0], p[1] - h.c[1]) - h.r) < 1e-3));
        full.push(extrudeH(pc.profile, hs.map(h => circle(h.c, h.r)), 'xy', pc.z0, pc.z1, onRound));
        const clipped = notch(clipY(pc.profile), hs);
        const keptHoles = hs.filter(h => h.c[1] - h.r > 1e-6).map(h => circle(h.c, h.r));
        if (clipped.length >= 3) kept.push(extrudeH(clipped, keptHoles, 'xy', pc.z0, pc.z1, onRound));
        minus(spansOnY0(pc.profile), hs.filter(h => Math.abs(h.c[1]) < h.r).map(h => { const w = Math.sqrt(h.r * h.r - h.c[1] * h.c[1]); return [h.c[0] - w, h.c[0] + w]; }))
          .forEach(([a, b]) => caps.push({ polys: [[[a, pc.z0], [b, pc.z0], [b, pc.z1], [a, pc.z1]]], rib: false }));
      }
    });
    return { full, kept, caps };
  }

  const front = (ox, oy, s) => ({ toViewer: () => [0, -1, 0], distance: () => Infinity, project: p => [ox + p[0] * s, oy - p[2] * s] });
  const top = (ox, oy, s) => ({ toViewer: () => [0, 0, 1], distance: () => Infinity, project: p => [ox + p[0] * s, oy - p[1] * s] });

  function casting(cfg) {
    const B = build(cfg.pieces);
    const pts = B.full.flatMap(s => s.flatMap(f => f.pts));
    const ext = i => [Math.min(...pts.map(p => p[i])), Math.max(...pts.map(p => p[i]))];
    const [x0, x1] = ext(0), [y0, y1] = ext(1), [, z1] = ext(2);
    const gap = 26;
    const FX = 30 - x0, GY = 40 + (y1 - y0) + gap + z1;            // answer: front view base line at GY
    const TY = GY - z1 - gap + y0;                                    // top view: y = 0 at TY - 0 … front edge (y0) lowest
    const GS = 0.5, GX = FX + x1 + 40 - x0 * GS, GGY = 30 + ((y1 - y0) + gap + z1) * GS, GTY = GGY - (z1 + gap) * GS + y0 * GS;
    const fvA = front(FX, GY, 1), tvA = top(FX, TY, 1), fvG = front(GX, GGY, GS), tvG = top(GX, GTY, GS);
    const AS = (q, lt) => L(q[0], q[1], lt || 'A');
    const gF = VL(B.full, fvG, true), gT = VL(B.full, tvG, true), aT = VL(B.full, tvA, true), aS = VL(B.kept, fvA, false);
    const cutLine = (ox, oy, s) => {
      const a = [ox + (x0 - 8) * s, oy], b = [ox + (x1 + 8) * s, oy], k = 5 * s + 2;
      return [L(a, b, 'centre'), L(a, [a[0] + 4, a[1]], 'A'), L([b[0] - 4, b[1]], b, 'A'),
        L(a, [a[0], a[1] - k], 'B'), pl([[a[0] - 1.4, a[1] - k + 1.6], [a[0], a[1] - k], [a[0] + 1.4, a[1] - k + 1.6]], 'B'),
        L(b, [b[0], b[1] - k], 'B'), pl([[b[0] - 1.4, b[1] - k + 1.6], [b[0], b[1] - k], [b[0] + 1.4, b[1] - k + 1.6]], 'B'),
        lbl([a[0] - 3, a[1] + 1], 'A', Object.assign({ size: 3.6, anchor: 'end' }, YEL)), lbl([b[0] + 3, b[1] + 1], 'A', Object.assign({ size: 3.6, anchor: 'start' }, YEL))];
    };
    const keptPts = B.kept.flatMap(s => s.flatMap(f => f.pts));
    const uniq = a => { const o = []; a.forEach(v => { if (!o.some(w => Math.abs(w - v) < 0.05)) o.push(v); }); return o; };
    const xsK = uniq(keptPts.map(p => p[0])).filter(x => Math.abs(x - Math.round(x)) < 0.01);       // corner positions (not points on curves)
    const zsK = uniq(keptPts.map(p => p[2])).filter(z => Math.abs(z - Math.round(z)) < 0.01);   // corner heights (not points on curves)
    const sc = poly => poly.map(([x, z]) => [FX + x, GY - z]);
    const hatch = B.caps.filter(c => !c.rib).flatMap(c => AK.hatch(c.polys.map(sc), 45, 2.4));
    const ribs = B.caps.filter(c => c.rib);
    const steps = [
      { instruction: 'GIVEN (half size, 3rd angle): the front view and the top view of the ' + cfg.name + ', with cutting plane A-A along the middle of the top view. Draw, full size, the top view and the SECTIONAL FRONT VIEW on A-A. Start at S.',
        calloutAt: [GX, GGY], reveals: [...gF.vis.map(q => AS(q)), ...gF.hid.map(q => AS(q, 'hidden')), ...gT.vis.map(q => AS(q)), ...gT.hid.map(q => AS(q, 'hidden')), ...cutLine(GX, GTY, GS),
          lbl([GX + (x0 + x1) / 2 * GS, GGY + 8], 'GIVEN / GEGEE (HALF SIZE)', Object.assign({ size: 2.8 }, GREY)), { kind: 'point', at: [FX + x0, GY], label: 'S' }] },
      { instruction: 'TOP VIEW (above the front view in 3rd angle): draw its visible outline and edges.', calloutAt: [FX + x1, TY - y1], reveals: aT.vis.map(q => AS(q)) },
      { instruction: 'Add the hidden edges of the top view as short dashes.', calloutAt: [FX + (x0 + x1) / 2, TY], reveals: aT.hid.map(q => AS(q, 'hidden')) },
      { instruction: 'Draw the cutting plane A-A along the centre line of the top view. The arrows point the way you look to see the section: away from the front view.', calloutAt: [FX + x1 + 8, TY], reveals: cutLine(FX, TY, 1) },
      { instruction: 'Project the widths down from the top view into the front view with thin lines.', calloutAt: [FX + x0, (TY + GY - z1) / 2], reveals: xsK.map(x => L([FX + x, TY], [FX + x, GY + 3], 'construction')) },
      { instruction: 'Measure the heights from the given front view and draw thin horizontal lines at each.', calloutAt: [FX + x0 - 4, GY - z1 / 2], reveals: zsK.map(z => L([FX + x0 - 6, GY - z], [FX + x1 + 6, GY - z], 'construction')) },
      { instruction: 'SECTIONAL FRONT VIEW: draw the outline of everything the cutting plane passes through, and the edges you see behind it. Holes on the plane show as gaps; no hidden detail is shown in a section.', calloutAt: [FX + (x0 + x1) / 2, GY - z1 / 2], reveals: aS.vis.map(q => AS(q)) },
      { instruction: 'Hatch the cut faces at 45°: it is one casting, so all of it is hatched the same way.' + (ribs.length ? ' The RIB lies along the cutting plane: by convention a rib cut lengthwise is NOT hatched.' : ''), calloutAt: [FX + x0 + 6, GY - 4],
        reveals: [...hatch, ...ribs.map(c => ({ kind: 'polygon', points: sc(c.polys[0]), lineType: 'A' })), ...ribs.map(c => { const ps = c.polys[0], cx = ps.reduce((s, p) => s + p[0], 0) / ps.length, cz = ps.reduce((s, p) => s + p[1], 0) / ps.length; return lbl([FX + cx, GY - cz + 1], 'RIB', Object.assign({ size: 2.4 }, GREY)); })] },
      { instruction: 'Label the views and add the main dimensions.', calloutAt: [FX + (x0 + x1) / 2, GY + 10],
        reveals: [lbl([FX + (x0 + x1) / 2, GY + 24], 'SECTION A-A / SNIT A-A', YEL), lbl([FX + (x0 + x1) / 2, TY - y1 - 8], 'TOP VIEW / BOAANSIG', GREY),
          { kind: 'dimension', p1: [FX + x0, GY + 3], p2: [FX + x1, GY + 3], offset: 10, text: String(Math.round(x1 - x0)) },
          { kind: 'dimension', p1: [FX + x1 + 4, GY], p2: [FX + x1 + 4, GY - z1], offset: 6, text: String(Math.round(z1)) }] },
    ];
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'third', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full',
      steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(cfg.id);
  }

  // ═══ Exercises (original castings) ═══
  {
    const up = [[-20, 12], [20, 12], [20, 52], ...arc([0, 52], 20, 0, 180, 18).slice(1, -1), [-20, 52]];
    casting({ id: 'sect-bearing-bracket', title: 'Sectional View: Bearing Bracket (Casting)', name: 'bearing bracket',
      pieces: [
        { kind: 'xy', profile: [[-50, -25], [50, -25], [50, 25], [-50, 25]], holes: [{ c: [-36, 0], r: 6 }, { c: [36, 0], r: 6 }], z0: 0, z1: 12 },
        { kind: 'xz', profile: up, holes: [{ c: [0, 52], r: 10 }], y0: -10, y1: 10, smooth: p => p[1] > 52 + 1e-6 || (Math.abs(p[0]) === 20 && p[1] === 52) },
      ],
      summary: 'A cast bearing bracket: a base plate with two bolt holes and an upright with a round top and a bearing hole. The cutting plane runs through the holes, so they show as gaps in the section.',
      prompt: 'The front view and top view of a bearing bracket are given (3rd angle) with cutting plane A-A. Draw, full size: the top view and the sectional front view on A-A. Show all hidden detail in the top view.' });
  }
  {
    const ribR = [[16, 10], [40, 10], [16, 42]], ribL = [[-16, 10], [-16, 42], [-40, 10]];
    casting({ id: 'sect-column-bracket', title: 'Sectional View: Column Bracket with Ribs (Casting)', name: 'column bracket',
      pieces: [
        { kind: 'xy', profile: [[-46, -30], [46, -30], [46, 30], [-46, 30]], holes: [{ c: [-34, 0], r: 5 }, { c: [34, 0], r: 5 }, { c: [0, 0], r: 8 }], z0: 0, z1: 10 },
        { kind: 'xy', profile: circle([0, 0], 16), holes: [{ c: [0, 0], r: 8 }], z0: 10, z1: 60, round: { c: [0, 0], r: 16 } },
        { kind: 'xz', profile: ribR, y0: -4, y1: 4, rib: true },
        { kind: 'xz', profile: ribL, y0: -4, y1: 4, rib: true },
      ],
      summary: 'A cast column bracket: a base plate, a hollow round column and two ribs. The cutting plane runs along the ribs, so by convention the ribs are not hatched, although they are cut.',
      prompt: 'The front view and top view of a column bracket are given (3rd angle) with cutting plane A-A. Draw, full size: the top view and the sectional front view on A-A. Do not hatch the ribs. Show all hidden detail in the top view.' });
  }
})(window);
