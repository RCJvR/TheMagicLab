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

  // Course Drawings page: export the builder and stop before this chapter's own exercises.
  global.DDBuild = Object.assign(global.DDBuild || {}, { fromIso: cfg => { fromIso(cfg); return C[cfg.id]; }, casting: cfg => { casting(cfg); return C[cfg.id]; } });
  if (global.DD_BUILDERS_ONLY) return;

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
  // ═══ Orthographic views from a given (dimensioned) isometric, in small steps ═══
  //   cfg: id, title, name, solids, dims [[a3, b3, dirName, offset, text]], axes [{ p, dir: 'z'|'y', len, r }]
  function fromIso(cfg) {
    const IK = global.IsoKit, solids = cfg.solids;
    const pts = solids.flatMap(s => s.flatMap(f => f.pts));
    const ext = i => [Math.min(...pts.map(p => p[i])), Math.max(...pts.map(p => p[i]))];
    const [x0, x1] = ext(0), [y0, y1] = ext(1), [z0, z1] = ext(2);
    const gap = 24, FX = 30 - x0, GY = 30 + (y1 - y0) + gap + z1, TYf = GY - z1 - gap + y0, RX = FX + x1 + gap - y0;
    const fv = SK.orthoView('front', [FX, GY]), tv = SK.orthoView('top', [FX, TYf]), rv = SK.orthoView('right', [RX, GY]);
    const F = VL(solids, fv, true), T = VL(solids, tv, true), R = VL(solids, rv, true);
    const AS = (q, lt) => L(q[0], q[1], lt || 'A');
    // the given isometric, to the right of the right view
    const IO = [RX + (y1 - y0) + 40 + (y1 - y0) * 0.87, GY - 6];
    const isoO = [IO[0] - (x0 - y0) * 0.866, IO[1] + (x0 + y0) * 0.5 + z0];
    const iso = SK.isoView(isoO);
    const I = VL(solids, iso, false);
    const arrowA = iso.project([x0 + (x1 - x0) * 0.1, y0 - 30, z0 + (z1 - z0) * 0.5]), arrowB = iso.project([x0 + (x1 - x0) * 0.1, y0 - 6, z0 + (z1 - z0) * 0.5]);
    const corners = solids.flatMap(s => s.flatMap(f => f.pts));
    const uniq = a => { const o = []; a.forEach(v => { if (!o.some(w => Math.abs(w - v) < 0.05)) o.push(v); }); return o; };
    const whole = v => Math.abs(v - Math.round(v)) < 0.01;
    const xs = uniq(corners.map(p => p[0])).filter(whole), ys = uniq(corners.map(p => p[1])).filter(whole), zs = uniq(corners.map(p => p[2])).filter(whole);
    const mitre = y => [RX + y, TYf - y];
    const axesIn = view => (cfg.axes || []).flatMap(a => {
      const e = a.r + 3;
      if (view === 'fv') return a.dir === 'z' ? [L([FX + a.p[0], GY - a.p[2] + 3], [FX + a.p[0], GY - a.p[2] - a.len - 3], 'centre')]
        : [L([FX + a.p[0] - e, GY - a.p[2]], [FX + a.p[0] + e, GY - a.p[2]], 'centre'), L([FX + a.p[0], GY - a.p[2] - e], [FX + a.p[0], GY - a.p[2] + e], 'centre')];
      if (view === 'tv') return a.dir === 'z' ? [L([FX + a.p[0] - e, TYf - a.p[1]], [FX + a.p[0] + e, TYf - a.p[1]], 'centre'), L([FX + a.p[0], TYf - a.p[1] - e], [FX + a.p[0], TYf - a.p[1] + e], 'centre')]
        : [L([FX + a.p[0], TYf - a.p[1] + 3], [FX + a.p[0], TYf - a.p[1] - a.len - 3], 'centre')];
      return a.dir === 'z' ? [L([RX + a.p[1], GY - a.p[2] + 3], [RX + a.p[1], GY - a.p[2] - a.len - 3], 'centre')]
        : [L([RX + a.p[1] - 3, GY - a.p[2]], [RX + a.p[1] + a.len + 3, GY - a.p[2]], 'centre')];
    });
    const steps = [
      { instruction: 'GIVEN: the isometric drawing of the ' + cfg.name + ', with its dimensions and an arrow showing the direction of the FRONT view. Draw, full size in 3rd-angle projection, the front view, the top view and the right view. Start at S.',
        calloutAt: IO, reveals: [...I.vis.map(q => AS(q)), ...(cfg.dims || []).map(([a, b, d, off, t]) => IK.dim(isoO, a, b, IK.DIR[d], off, t)),
          L(arrowA, arrowB, 'B'), pl([[arrowB[0] - 1.6, arrowB[1] + 1.8], arrowB, [arrowB[0] + 2.2, arrowB[1] + 0.4]], 'B'), lbl([arrowA[0] + 2, arrowA[1] - 3], 'FRONT / VOOR', Object.assign({ size: 2.6 }, YEL)),
          { kind: 'point', at: [FX + x0, GY], label: 'S' }] },
      { instruction: 'FRONT VIEW (looking in the direction of the arrow): draw its visible outline and edges with thick lines.', calloutAt: [FX + (x0 + x1) / 2, GY - z1 / 2], reveals: F.vis.map(q => AS(q)) },
      { instruction: 'Add the hidden edges of the front view as short dashes.', calloutAt: [FX + (x0 + x1) / 2, GY - z1 / 3], reveals: F.hid.map(q => AS(q, 'hidden')) },
      { instruction: 'Project the widths straight up from the front view into the top view (3rd angle: the top view goes ABOVE the front view).', calloutAt: [FX + x0, (GY - z1 + TYf - y1) / 2], reveals: xs.map(x => L([FX + x, GY - z1], [FX + x, TYf - y1 - 3], 'construction')) },
      { instruction: 'TOP VIEW: measure the depths from the isometric (the front of the object is at the bottom, nearest the front view) and draw the visible edges.', calloutAt: [FX + (x0 + x1) / 2, TYf - (y0 + y1) / 2], reveals: T.vis.map(q => AS(q)) },
      { instruction: 'Add the hidden edges of the top view.', calloutAt: [FX + (x0 + x1) / 2, TYf - (y0 + y1) / 2], reveals: T.hid.map(q => AS(q, 'hidden')) },
      { instruction: 'Draw a 45° mitre line beside the top view. Carry each depth from the top view across to the mitre line and down into the right view.', calloutAt: mitre((y0 + y1) / 2),
        reveals: [L(mitre(y0 - 6), mitre(y1 + 6), 'construction'), ...ys.flatMap(y => [L([FX + x1, TYf - y], mitre(y), 'construction'), L(mitre(y), [RX + y, GY + 3], 'construction')])] },
      { instruction: 'Project the heights straight across from the front view to the right view.', calloutAt: [(FX + x1 + RX) / 2, GY - z1 / 2], reveals: zs.map(z => L([FX + x1, GY - z], [RX + y1 + 4, GY - z], 'construction')) },
      { instruction: 'RIGHT VIEW (3rd angle: to the RIGHT of the front view, with the front of the object nearest the front view): draw the visible edges where the depth and height lines cross.', calloutAt: [RX + (y0 + y1) / 2, GY - z1 / 2], reveals: R.vis.map(q => AS(q)) },
      { instruction: 'Add the hidden edges of the right view.', calloutAt: [RX + (y0 + y1) / 2, GY - z1 / 3], reveals: R.hid.map(q => AS(q, 'hidden')) },
      { instruction: 'Add the centre lines of the holes and curves in all three views (chain lines, a little past the outline).', calloutAt: [FX + (x0 + x1) / 2, GY - z1], reveals: [...axesIn('fv'), ...axesIn('tv'), ...axesIn('rv')] },
      { instruction: 'Label the views.', calloutAt: [FX + (x0 + x1) / 2, GY + 8],
        reveals: [lbl([FX + (x0 + x1) / 2, GY + 8], 'FRONT VIEW / VOORAANSIG', GREY), lbl([FX + (x0 + x1) / 2, TYf - y1 - 9], 'TOP VIEW / BOAANSIG', GREY), lbl([RX + (y0 + y1) / 2, GY + 8], 'RIGHT VIEW / REGTERAANSIG', GREY)] },
    ];
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'third', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full',
      steps: steps.filter(st => st.reveals.length).map((st, i) => Object.assign({ id: i + 1 }, st)) };
    ORDER.push(cfg.id);
  }

  {
    // angle block with a hole through the base
    const base = extrudeH([[24, 0], [76, 0], [76, 44], [24, 44]], [circle([52, 22], 7)], 'xy', 0, 14, () => false);
    fromIso({ id: 'iso2ortho-angle-block', title: 'From an Isometric: Angle Block with a Hole', name: 'angle block',
      solids: [SK.box(0, 0, 0, 24, 44, 48), base],
      dims: [[[0, 0, 0], [76, 0, 0], 'negY', 10, 76], [[76, 0, 0], [76, 44, 0], 'negX', 10, 44], [[0, 0, 0], [0, 0, 48], 'negY', 8, 48]],
      axes: [{ p: [52, 22, 0], dir: 'z', len: 14, r: 7 }],
      summary: 'An L-shaped block with a hole drilled down through its base: three views from the isometric, the hole shown hidden in the front and right views.',
      prompt: 'The isometric drawing of an angle block is given (76 × 44 × 48; upright 24 thick; base 14 thick; Ø14 hole through the base, 28 from the right-hand end, central in the depth). Draw, full size in 3rd-angle projection: the front view, top view and right view. Show hidden detail and centre lines.' });
  }
  {
    // bearing block: base with two holes, upright with a round top and a bore front to back
    const base = extrudeH([[0, 0], [90, 0], [90, 50], [0, 50]], [circle([14, 25], 5), circle([76, 25], 5)], 'xy', 0, 12, () => false);
    const prof = [[25, 12], [65, 12], [65, 50], ...arc([45, 50], 20, 0, 180, 18).slice(1, -1), [25, 50]];
    const up = extrudeH(prof, [circle([45, 50], 10)], 'xz', 15, 35, p => p[1] > 50 + 1e-6);
    fromIso({ id: 'iso2ortho-bearing-block', title: 'From an Isometric: Bearing Block', name: 'bearing block',
      solids: [base, up],
      dims: [[[0, 0, 0], [90, 0, 0], 'negY', 10, 90], [[90, 0, 0], [90, 50, 0], 'negX', 10, 50], [[25, 15, 12], [65, 15, 12], 'negY', 6, 40]],
      axes: [{ p: [14, 25, 0], dir: 'z', len: 12, r: 5 }, { p: [76, 25, 0], dir: 'z', len: 12, r: 5 }, { p: [45, 15, 50], dir: 'y', len: 20, r: 20 }],
      summary: 'A base plate with two bolt holes and an upright with a round top and a bearing hole: curves and holes in all three views.',
      prompt: 'The isometric drawing of a bearing block is given (base 90 × 50 × 12 with two Ø10 holes; upright 40 wide and 20 thick, centred, with an R20 top and a Ø20 hole on a centre 50 above the base). Draw, full size in 3rd-angle projection: the front view, top view and right view. Show hidden detail and centre lines.' });
  }
  {
    // T-slot block
    const prof = [[0, 0], [80, 0], [80, 40], [52, 40], [52, 30], [60, 30], [60, 16], [20, 16], [20, 30], [28, 30], [28, 40], [0, 40]];
    fromIso({ id: 'iso2ortho-t-slot-block', title: 'From an Isometric: T-Slot Block', name: 'T-slot block',
      solids: [SK.extrude(prof, 'xz', 0, 50)],
      dims: [[[0, 0, 0], [80, 0, 0], 'negY', 10, 80], [[80, 0, 0], [80, 50, 0], 'negX', 10, 50], [[0, 0, 0], [0, 0, 40], 'negY', 8, 40]],
      summary: 'A block with a T-slot running front to back: the slot is seen in the front view and shows as hidden lines in the top and right views.',
      prompt: 'The isometric drawing of a T-slot block is given (80 × 50 × 40; the slot is 24 wide at the top for 10, then 40 wide for 14, running front to back). Draw, full size in 3rd-angle projection: the front view, top view and right view. Show hidden detail.' });
  }

})(window);
