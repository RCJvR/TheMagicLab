// Solid Geometry: generated 1st-angle exercises (front view, top view below it, left view to its
// right, 45° mitre line). Requires solid-kit.js and assembly-kit.js, and runs after
// solid-geometry.data.js (it adds to CONSTRUCTIONS and CONSTRUCTION_ORDER).
(function (global) {
  'use strict';
  const SK = global.SolidKit, AK = global.AssemblyKit;
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lineType) => ({ kind: 'line', p1, p2, lineType: lineType || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3.2, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const VIEW = lbl, YEL = { color: '#fde047' };
  const near = (a, b) => Math.abs(a - b) < 0.05;
  const uniqBy = (arr, k) => { const out = []; arr.forEach(v => { if (!out.some(w => near(k(w), k(v)))) out.push(v); }); return out; };
  const dist2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

  // A regular polygon (anticlockwise seen from above): n sides on circumradius R, first corner
  // at angle a0 (degrees, measured from +x), centre (cx, cy).
  function reg(n, R, a0, cx, cy) {
    return Array.from({ length: n }, (_, i) => {
      const a = (a0 + i * 360 / n) * Math.PI / 180;
      return [(cx || 0) + R * Math.cos(a), (cy || 0) + R * Math.sin(a)];
    });
  }
  const prism = (base, h) => SK.extrude(base, 'xy', 0, h);
  const pyramidOn = (base, z0, h) => {
    const cx = base.reduce((s, p) => s + p[0], 0) / base.length, cy = base.reduce((s, p) => s + p[1], 0) / base.length;
    return SK.pyramid(base, z0, [cx, cy, z0 + h]);
  };

  // Points on a segment?
  function onSeg(p, a, b) {
    const L2 = (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2;
    if (L2 < 1e-9) return dist2(p, a) < 0.05;
    let t = ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / L2;
    if (t < -1e-3 || t > 1 + 1e-3) return false;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]) < 0.05;
  }
  // Visible and hidden lines of the solids in a view, in 2D. Hidden lines that lie under a visible
  // line, zero-length lines (edges seen end-on) and repeats are left out.
  function lines(solids, view) {
    const r = SK.hlr(solids, view);
    const pr = s => [view.project(s[0]), view.project(s[1])];
    const vis = [], hid = [];
    const covered = (s, set) => [0, 0.25, 0.5, 0.75, 1].every(t => {
      const p = [s[0][0] + (s[1][0] - s[0][0]) * t, s[0][1] + (s[1][1] - s[0][1]) * t];
      return set.some(v => onSeg(p, v[0], v[1]));
    });
    r.visible.map(pr).forEach(s => { if (dist2(s[0], s[1]) > 0.05 && !covered(s, vis)) vis.push(s); });
    r.hidden.map(pr).forEach(s => { if (dist2(s[0], s[1]) > 0.05 && !covered(s, vis) && !covered(s, hid)) hid.push(s); });
    return { vis: vis.map(s => L(s[0], s[1], 'A')), hid: hid.map(s => L(s[0], s[1], 'hidden')) };
  }
  const corners = solids => {
    const pts = [];
    solids.forEach(s => s.forEach(f => f.pts.forEach(p => { if (!pts.some(q => Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]) < 1e-6)) pts.push(p); })));
    return pts;
  };
  const extent = (pts, i) => [Math.min(...pts.map(p => p[i])), Math.max(...pts.map(p => p[i]))];

  // Layout: FV origin (FX, GY) with z = 0 on the XY line; TV below it with the FRONT (y = yMin)
  // at the bottom; LV to the right of the FV with the front on its right-hand side.
  function layout(solids, extra, padRight) {
    const pts = corners(solids).concat(extra || []);
    const [x0, x1] = extent(pts, 0), [y0, y1] = extent(pts, 1), [, z1] = extent(pts, 2);
    const FX = 40 - x0, GY = 30 + z1, gap = 24;
    const TY = GY + gap + (y1 - y0) + y0;                    // screen y of y = 0 in the top view
    const LX = FX + x1 + gap + y1 + (padRight || 0);                           // screen x of y = 0 in the left view
    const fv = SK.orthoView('front', [FX, GY]), tv = SK.orthoView('top', [FX, TY]), lv = SK.orthoView('left', [LX, GY]);
    return { FX, GY, TY, LX, x0, x1, y0, y1, z1, fv, tv, lv, pts,
      mitre: y => [LX - y, TY - y] };
  }

  const xyLine = Lo => {
    const right = Lo.LX - Lo.y0 + 12, left = Lo.FX + Lo.x0 - 12;
    return [L([left, Lo.GY], [right, Lo.GY], 'B'), lbl([left - 3, Lo.GY + 1.2], 'X', { size: 3.4, anchor: 'end' }), lbl([right + 3, Lo.GY + 1.2], 'Y', { size: 3.4, anchor: 'start' })];
  };
  const mitreLine = Lo => [L(Lo.mitre(Lo.y0 - 6), Lo.mitre(Lo.y1 + 6), 'construction')];
  const lowestTV = Lo => Lo.TY - Lo.y0;

  // construction lines: TV corners up to the FV / FV corners down to the TV
  function tvToFv(Lo, pts, zTop) {
    return uniqBy(pts, p => p[0]).map(p => L([Lo.FX + p[0], Lo.TY - p[1]], [Lo.FX + p[0], Lo.GY - (zTop === undefined ? p[2] : zTop)], 'construction'));
  }
  // TV corners across to the mitre and up to the LV
  function tvToLv(Lo, pts) {
    return uniqBy(pts, p => p[1]).flatMap(p => {
      const m = Lo.mitre(p[1]);
      return [L([Lo.FX + p[0], Lo.TY - p[1]], m, 'construction'), L(m, [m[0], Lo.GY - p[2]], 'construction')];
    });
  }
  // FV heights across to the LV
  function fvToLv(Lo, pts) {
    const xL = Lo.LX - Lo.y1;
    return uniqBy(pts, p => p[2]).map(p => L([Lo.FX + p[0], Lo.GY - p[2]], [xL - 3, Lo.GY - p[2]], 'construction'));
  }
  const centreV = (x, ya, yb) => L([x, ya], [x, yb], 'centre');
  const centreH = (y, xa, xb) => L([xa, y], [xb, y], 'centre');

  // view titles, English with the Afrikaans underneath: names [front, top, left] as [en, af]
  function viewLabels(Lo, names) {
    names = names || [['FRONT VIEW', 'VOORAANSIG'], ['TOP VIEW', 'BOAANSIG'], ['LEFT VIEW', 'LINKERAANSIG']];
    const yFV = Lo.GY + 7, yTV = lowestTV(Lo) + 8;
    const at = [[Lo.FX + (Lo.x0 + Lo.x1) / 2, yFV], [Lo.FX + (Lo.x0 + Lo.x1) / 2, yTV], [Lo.LX - (Lo.y0 + Lo.y1) / 2, yFV]];
    return names.flatMap((n, i) => [VIEW(at[i], n[0], { size: 3, color: '#94a3b8' }), VIEW([at[i][0], at[i][1] + 4], n[1], { size: 2.6, color: '#94a3b8' })]);
  }

  function finish(id, title, summary, prompt, steps, extras) {
    steps = steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s));
    C[id] = Object.assign({ id, title, projection: 'first', summary, workbookPrompt: prompt, steps, printLayout: 'full' }, extras || {});
    ORDER.push(id);
  }

  // ── Upright prisms and pyramids: three views from the given top view ──
  //   cfg: id, title, name, solids, H, kind 'prism'|'pyramid', summary, prompt, note
  function threeViews(cfg) {
    const Lo = layout(cfg.solids);
    const F = lines(cfg.solids, Lo.fv), T = lines(cfg.solids, Lo.tv), S = lines(cfg.solids, Lo.lv);
    const pts = Lo.pts;
    const cx = (Lo.x0 + Lo.x1) / 2, cy = (Lo.y0 + Lo.y1) / 2;
    const ax = cfg.axis || [cx, cy];
    const pyr = cfg.kind === 'pyramid';
    const steps = [
      { instruction: 'Draw the XY line: the solid stands on the horizontal plane, so the bottom of the front view sits on it. In 1st-angle projection the TOP view goes BELOW the front view and the LEFT view goes to the RIGHT of it. Draw the 45° mitre line below the left view; it carries depths from the top view to the left view.',
        calloutAt: [Lo.LX - Lo.y0, Lo.GY], reveals: [...xyLine(Lo), ...mitreLine(Lo)] },
      { instruction: 'Draw the centre lines of the top view where the axis of the ' + cfg.name + ' stands.',
        calloutAt: [Lo.FX + ax[0], Lo.TY - ax[1]], reveals: [centreH(Lo.TY - ax[1], Lo.FX + Lo.x0 - 5, Lo.FX + Lo.x1 + 5), centreV(Lo.FX + ax[0], Lo.TY - Lo.y1 - 5, Lo.TY - Lo.y0 + 5)] },
      { instruction: 'Draw the TOP VIEW. ' + (pyr ? 'The base shows in its true shape; join each corner to the apex in the middle.' : 'The ends of an upright prism show in their true shape.') + (cfg.note ? ' ' + cfg.note : ''),
        calloutAt: [Lo.FX + Lo.x1, Lo.TY - cy], reveals: T.vis.concat(T.hid) },
      { instruction: 'Project each corner of the top view straight up into the front view with thin construction lines.',
        calloutAt: [Lo.FX + cx, (Lo.GY + Lo.TY - Lo.y1) / 2], reveals: tvToFv(Lo, pts, cfg.H) },
      { instruction: 'Measure the height (' + cfg.H + ' mm) up from the XY line and draw the visible edges of the FRONT VIEW.' + (pyr ? ' Every sloping edge runs from a base corner to the apex.' : ''),
        calloutAt: [Lo.FX + cx, Lo.GY - cfg.H / 2], reveals: [centreV(Lo.FX + ax[0], Lo.GY + 3, Lo.GY - cfg.H - 5), ...F.vis] },
      { instruction: 'Add any hidden edges in the front view as short dashes (edges at the back that a front face covers, and that no visible line already shows).',
        calloutAt: [Lo.FX + cx, Lo.GY - cfg.H / 3], reveals: F.hid },
      { instruction: 'Project each corner of the top view across to the 45° mitre line and from there straight up into the left view. This transfers the depths.',
        calloutAt: Lo.mitre(cy), reveals: tvToLv(Lo, pts) },
      { instruction: 'Project the heights across from the front view to the left view.',
        calloutAt: [(Lo.FX + Lo.x1 + Lo.LX - Lo.y1) / 2, Lo.GY - cfg.H], reveals: fvToLv(Lo, pts) },
      { instruction: 'Draw the visible edges of the LEFT VIEW where the depth and height lines cross. In 1st angle the front of the solid is on the RIGHT of the left view.',
        calloutAt: [Lo.LX - cy, Lo.GY - cfg.H / 2], reveals: [centreV(Lo.LX - ax[1], Lo.GY + 3, Lo.GY - cfg.H - 5), ...S.vis] },
      { instruction: 'Add the hidden edges of the left view, if any, as short dashes.',
        calloutAt: [Lo.LX - cy, Lo.GY - cfg.H / 3], reveals: S.hid },
      { instruction: 'Label the views and the XY line. Leave the construction lines thin and light.',
        calloutAt: [Lo.FX + cx, lowestTV(Lo) + 9], reveals: viewLabels(Lo) },
    ];
    finish(cfg.id, cfg.title, cfg.summary, cfg.prompt, steps);
  }

  // ── Prism lying on a side face (axis along x): start from the true shape in the left view ──
  function lyingPrism(cfg) {
    const Lo = layout(cfg.solids);
    const F = lines(cfg.solids, Lo.fv), T = lines(cfg.solids, Lo.tv), S = lines(cfg.solids, Lo.lv);
    const pts = Lo.pts, end = pts.filter(p => near(p[0], Lo.x0));
    const cy = cfg.axis[0], cz = cfg.axis[1];
    const steps = [
      { instruction: 'Draw the XY line and the 45° mitre line. The prism lies on one of its faces with its axis parallel to both planes, so its end is seen in its true shape in the LEFT view.',
        calloutAt: [Lo.LX - Lo.y0, Lo.GY], reveals: [...xyLine(Lo), ...mitreLine(Lo)] },
      { instruction: 'Draw the centre lines of the left view on the axis of the prism.',
        calloutAt: [Lo.LX - cy, Lo.GY - cz], reveals: [centreH(Lo.GY - cz, Lo.LX - Lo.y1 - 5, Lo.LX - Lo.y0 + 5), centreV(Lo.LX - cy, Lo.GY + 3, Lo.GY - Lo.z1 - 5)] },
      { instruction: 'Draw the LEFT VIEW: the ' + cfg.shape + ' in its true shape, resting on one side on the XY line.' + (cfg.note ? ' ' + cfg.note : ''),
        calloutAt: [Lo.LX - cy, Lo.GY - cz], reveals: S.vis.concat(S.hid) },
      { instruction: 'Project each corner of the left view across into the front view with horizontal construction lines (the heights).',
        calloutAt: [(Lo.FX + Lo.x1 + Lo.LX - Lo.y1) / 2, Lo.GY - cz], reveals: uniqBy(end, p => p[2]).map(p => L([Lo.LX - p[1], Lo.GY - p[2]], [Lo.FX + Lo.x0 - 3, Lo.GY - p[2]], 'construction')) },
      { instruction: 'Measure the length (' + (Lo.x1 - Lo.x0) + ' mm) and draw the visible edges of the FRONT VIEW: every corner of the end view becomes a line running the full length.',
        calloutAt: [Lo.FX + (Lo.x0 + Lo.x1) / 2, Lo.GY - cz], reveals: [centreH(Lo.GY - cz, Lo.FX + Lo.x0 - 5, Lo.FX + Lo.x1 + 5), ...F.vis] },
      { instruction: 'Add the hidden edges of the front view as short dashes.',
        calloutAt: [Lo.FX + (Lo.x0 + Lo.x1) / 2, Lo.GY - cz / 2], reveals: F.hid },
      { instruction: 'Project each corner of the left view straight down to the 45° mitre line and from there across to the left into the top view. This transfers the depths.',
        calloutAt: Lo.mitre(cy), reveals: uniqBy(end, p => p[1]).flatMap(p => { const m = Lo.mitre(p[1]); return [L([Lo.LX - p[1], Lo.GY - p[2]], m, 'construction'), L(m, [Lo.FX + Lo.x0 - 3, m[1]], 'construction')]; }) },
      { instruction: 'Project the ends of the prism straight down from the front view into the top view.',
        calloutAt: [Lo.FX + Lo.x0, (Lo.GY + Lo.TY - Lo.y1) / 2], reveals: [Lo.x0, Lo.x1].map(x => L([Lo.FX + x, Lo.GY], [Lo.FX + x, Lo.TY - Lo.y0 + 3], 'construction')) },
      { instruction: 'Draw the visible edges of the TOP VIEW. In 1st angle the front of the solid is at the BOTTOM of the top view.',
        calloutAt: [Lo.FX + (Lo.x0 + Lo.x1) / 2, Lo.TY - cy], reveals: [centreH(Lo.TY - cy, Lo.FX + Lo.x0 - 5, Lo.FX + Lo.x1 + 5), ...T.vis] },
      { instruction: 'Add the hidden edges of the top view as short dashes.',
        calloutAt: [Lo.FX + (Lo.x0 + Lo.x1) / 2, Lo.TY - cy], reveals: T.hid },
      { instruction: 'Label the views and the XY line.',
        calloutAt: [Lo.FX + (Lo.x0 + Lo.x1) / 2, lowestTV(Lo) + 9], reveals: viewLabels(Lo) },
    ];
    finish(cfg.id, cfg.title, cfg.summary, cfg.prompt, steps);
  }

  // ── A solid cut by a plane A-A that is perpendicular to the front (VP): sectional top view,
  //    sectional left view and true shape. The plane passes through (xa, za) at deg° to the HP,
  //    rising to the right; the part above it is removed.
  function cutSolid(cfg) {
    const t = cfg.deg * Math.PI / 180;
    const n = [-Math.sin(t), 0, Math.cos(t)];
    const d = n[0] * cfg.through[0] + n[2] * cfg.through[1];
    const whole = cfg.solids;
    const res = whole.map(s => SK.cut(s, n, d));
    const kept = res.map(r => r.faces), caps = res.map(r => r.cap).filter(Boolean);
    const Lo = layout(whole);
    const cx = (Lo.x0 + Lo.x1) / 2, cy = (Lo.y0 + Lo.y1) / 2, ax = cfg.axis || [cx, cy];
    const Fw = lines(whole, Lo.fv), Tw = lines(whole, Lo.tv);
    const F = lines(kept, Lo.fv), T = lines(kept, Lo.tv), S = lines(kept, Lo.lv);
    const capPts = caps.flatMap(c => c.pts);
    // the cutting-plane line across the front view, a little past the solid
    const zAt = x => (d - n[0] * x) / n[2];
    const xa = Lo.x0 - 6, xb = Lo.x1 + 6;
    const A1 = [Lo.FX + xa, Lo.GY - zAt(xa)], A2 = [Lo.FX + xb, Lo.GY - zAt(xb)];
    const dirS = [Math.cos(t), -Math.sin(t)], up = [-Math.sin(t), -Math.cos(t)];   // along the line; away from the solid
    const arrow = (p, k) => {
      const tip = [p[0] + up[0] * 7 * k, p[1] + up[1] * 7 * k];
      return [L(p, tip, 'B'), { kind: 'polyline', points: [[tip[0] - up[0] * 2.5 * k + dirS[0] * 1.3, tip[1] - up[1] * 2.5 * k + dirS[1] * 1.3], tip, [tip[0] - up[0] * 2.5 * k - dirS[0] * 1.3, tip[1] - up[1] * 2.5 * k - dirS[1] * 1.3]], lineType: 'B' }];
    };
    const sorted = capPts.slice().sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
    const fvCut = uniqBy(sorted.map(p => Lo.fv.project(p)), q => q[0] * 1000 + q[1]);
    const hatchView = (view, ang) => caps.flatMap(c => {
      const vis = c.n[0] * view.toViewer()[0] + c.n[1] * view.toViewer()[1] + c.n[2] * view.toViewer()[2] > 1e-6;
      return vis ? AK.hatch([c.pts.map(view.project)], ang, 2.5) : [];
    });
    // true shape: each cut point is laid off from the cutting-plane line, perpendicular to it
    const maxDev = Math.max(...capPts.map(p => Math.abs(p[1] - ax[1])));
    const G = maxDev + 14;
    const sOf = p => { const q = Lo.fv.project(p); return q; };
    const tsPt = p => { const b = sOf(p), o = G + (ax[1] - p[1]); return [b[0] + up[0] * o, b[1] + up[1] * o]; };
    const capSorted = caps.map(c => c.pts.map(tsPt));
    const fvLine = [A1, A2];
    const auxC = [[A1[0] + up[0] * G, A1[1] + up[1] * G], [A2[0] + up[0] * G, A2[1] + up[1] * G]];
    const tsMid = capSorted[0].reduce((s, p) => [s[0] + p[0] / capSorted[0].length, s[1] + p[1] / capSorted[0].length], [0, 0]);
    const pyr = cfg.kind === 'pyramid';
    const steps = [
      { instruction: 'Draw the XY line and the 45° mitre line.', calloutAt: [Lo.LX - Lo.y0, Lo.GY], reveals: [...xyLine(Lo), ...mitreLine(Lo)] },
      { instruction: 'Draw the centre lines, then the complete ' + cfg.name + ' in thin lines in the front view and the top view, as if it were not cut.',
        calloutAt: [Lo.FX + cx, Lo.GY - Lo.z1 / 2],
        reveals: [centreV(Lo.FX + ax[0], Lo.GY + 3, Lo.GY - Lo.z1 - 5), centreH(Lo.TY - ax[1], Lo.FX + Lo.x0 - 5, Lo.FX + Lo.x1 + 5), centreV(Lo.FX + ax[0], Lo.TY - Lo.y1 - 5, Lo.TY - Lo.y0 + 5),
          ...Fw.vis.concat(Tw.vis).map(r => Object.assign({}, r, { lineType: 'C' }))] },
      { instruction: 'Draw the cutting plane A-A in the front view: a chain line at ' + cfg.deg + '° to the XY line, thick at the ends, with arrows showing the direction of viewing for the true shape.',
        calloutAt: A2, reveals: [L(A1, A2, 'centre'), L(A1, [A1[0] + dirS[0] * 6, A1[1] + dirS[1] * 6], 'A'), L(A2, [A2[0] - dirS[0] * 6, A2[1] - dirS[1] * 6], 'A'), ...arrow(A1, 1), ...arrow(A2, 1),
          lbl([A1[0] - 4, A1[1] + 1], 'A', Object.assign({ size: 4, anchor: 'end' }, YEL)), lbl([A2[0] + 4, A2[1] + 1], 'A', Object.assign({ size: 4, anchor: 'start' }, YEL))] },
      { instruction: 'Number the points where the cutting plane crosses the edges of the ' + cfg.name + ' (1, 2, 3 …). Edges at the back fall on top of those at the front.',
        calloutAt: fvCut[0], reveals: fvCut.map((q, i) => ({ kind: 'point', at: q, label: String(i + 1) })) },
      { instruction: 'Project the cut points straight down into the top view, onto the edges they lie on.' + (pyr ? ' A point on an edge that shows as a vertical line in the front view cannot be found this way: take it across to the left view first and bring it back by the mitre line.' : ''),
        calloutAt: [Lo.FX + cx, (Lo.GY + Lo.TY - Lo.y1) / 2], reveals: uniqBy(capPts, p => p[0]).map(p => L(Lo.fv.project(p), [Lo.FX + p[0], Lo.TY - Lo.y0 + 3], 'construction')) },
      { instruction: 'Line in the SECTIONAL TOP VIEW: the part of the ' + cfg.name + ' below the cutting plane, with the cut face outlined.',
        calloutAt: [Lo.FX + cx, Lo.TY - cy], reveals: T.vis.concat(T.hid) },
      { instruction: 'Hatch the cut face in the top view with thin lines at 45°.',
        calloutAt: [Lo.FX + cx, Lo.TY - cy], reveals: hatchView(Lo.tv, 45) },
      { instruction: 'Line in the front view: the part below A-A in thick lines (the part above is removed).',
        calloutAt: [Lo.FX + cx, Lo.GY - Lo.z1 / 3], reveals: F.vis.concat(F.hid) },
      { instruction: 'Project the corners and the cut points across from the front view to the left view (heights).',
        calloutAt: [(Lo.FX + Lo.x1 + Lo.LX - Lo.y1) / 2, Lo.GY - Lo.z1 / 2], reveals: fvToLv(Lo, corners(kept)) },
      { instruction: 'Project them from the top view across to the mitre line and up into the left view (depths).',
        calloutAt: Lo.mitre(cy), reveals: tvToLv(Lo, corners(kept)) },
      { instruction: 'Line in the SECTIONAL LEFT VIEW where the height and depth lines cross. The front of the solid is on the right.',
        calloutAt: [Lo.LX - cy, Lo.GY - Lo.z1 / 2], reveals: [centreV(Lo.LX - ax[1], Lo.GY + 3, Lo.GY - Lo.z1 - 5), ...S.vis, ...S.hid] },
      { instruction: 'Hatch the cut face in the left view.',
        calloutAt: [Lo.LX - cy, Lo.GY - Lo.z1 / 2], reveals: hatchView(Lo.lv, 45) },
      { instruction: 'TRUE SHAPE of the section: project each cut point from A-A at 90° to the cutting plane, away from the solid.',
        calloutAt: [(A1[0] + A2[0]) / 2 + up[0] * G / 2, (A1[1] + A2[1]) / 2 + up[1] * G / 2],
        reveals: uniqBy(capPts.map(p => [Lo.fv.project(p), p]), v => v[0][0] * 1000 + v[0][1]).map(v => { const b = v[0], o = G + maxDev + 4; return L(b, [b[0] + up[0] * o, b[1] + up[1] * o], 'construction'); }) },
      { instruction: 'Draw a centre line parallel to A-A. It stands for the axis of the solid seen in the top view.',
        calloutAt: auxC[1], reveals: [L(auxC[0], auxC[1], 'centre')] },
      { instruction: 'Measure each point\'s distance from the centre line in the TOP view and mark it off the centre line on its projector. Join the points: this is the true shape.',
        calloutAt: tsMid, reveals: capSorted.map(pl => ({ kind: 'polygon', points: pl, lineType: 'A' })) },
      { instruction: 'Hatch the true shape and label it.',
        calloutAt: tsMid, reveals: [...capSorted.flatMap(pl => AK.hatch([pl], 45, 2.5)),
          lbl([tsMid[0] + up[0] * (maxDev + 12), tsMid[1] + up[1] * (maxDev + 12) - 2], 'TRUE SHAPE A-A', Object.assign({ size: 3 }, YEL)),
          lbl([tsMid[0] + up[0] * (maxDev + 12), tsMid[1] + up[1] * (maxDev + 12) + 2], 'WARE VORM A-A', Object.assign({ size: 2.6 }, YEL))] },
      { instruction: 'Label the views and the XY line.', calloutAt: [Lo.FX + cx, lowestTV(Lo) + 9],
        reveals: viewLabels(Lo, [['FRONT VIEW', 'VOORAANSIG'], ['SECTIONAL TOP VIEW', 'DEURSNEE-BOAANSIG'], ['SECTIONAL LEFT VIEW', 'DEURSNEE-LINKERAANSIG']]) },
    ];
    void fvLine;
    finish(cfg.id, cfg.title, cfg.summary, cfg.prompt, steps);
  }

  // ── A solid tilted in the front view (rotated about a y-axis edge), drawn from the true shape of
  //    its end in an auxiliary view on the extension of its axis.
  //    cfg.make(): solid upright with its axis on z through (ax, ay); cfg.tilt (deg); cfg.pivot.
  function inclined(cfg) {
    const s0 = cfg.solids0, tilt = cfg.tilt, pv = cfg.pivot;
    const solids = s0.map(s => SK.rotate(s, 'y', tilt, pv));
    const r = tilt * Math.PI / 180;
    // the axis after rotation (rotate about y by +tilt takes +z towards +x)
    const a = [Math.sin(r), 0, Math.cos(r)];
    const rot = p => { const x = p[0] - pv[0], z = p[2] - pv[2]; return [pv[0] + x * Math.cos(r) + z * Math.sin(r), p[1], pv[2] - x * Math.sin(r) + z * Math.cos(r)]; };
    const base0 = rot([cfg.axis[0], cfg.axis[1], 0]);
    const aS = [a[0], -a[2]];                                   // up the axis on the sheet
    const b = [Math.cos(r), 0, -Math.sin(r)];                  // across the axis (in the xz plane)
    const bS = [b[0], -b[2]];
    const G = cfg.auxGap || 16;
    const all = corners(solids);
    const maxDev = Math.max(...all.map(p => Math.abs(p[1] - cfg.axis[1])));
    // auxiliary view: looking up the axis from the base end, placed (1st angle) beyond the top end
    const mk = Lo => {
      const B0 = Lo.fv.project(base0), T0 = [B0[0] + aS[0] * cfg.len, B0[1] + aS[1] * cfg.len];
      const auxP = p => {
        const w = (p[0] - base0[0]) * b[0] + (p[2] - base0[2]) * b[2];
        const o = G + maxDev + (cfg.axis[1] - p[1]);
        return [T0[0] + bS[0] * w + aS[0] * o, T0[1] + bS[1] * w + aS[1] * o];
      };
      return { B0, T0, auxP };
    };
    let Lo = layout(solids);
    { const m = mk(Lo); const ax = Math.max(...all.map(p => m.auxP(p)[0])) + 14; Lo = layout(solids, null, Math.max(0, ax - (Lo.LX - Lo.y1))); }
    const { B0, T0, auxP } = mk(Lo);
    const F = lines(solids, Lo.fv), T = lines(solids, Lo.tv), S = lines(solids, Lo.lv);
    const auxView = { toViewer: () => [-a[0], -a[1], -a[2]], distance: () => Infinity, project: auxP };
    const X = lines(solids, auxView);
    const auxCen = [T0[0] + aS[0] * (G + maxDev), T0[1] + aS[1] * (G + maxDev)];
    const pts = Lo.pts;
    const cx = (Lo.x0 + Lo.x1) / 2, cy = (Lo.y0 + Lo.y1) / 2;
    const auxEnd = pts.filter(p => near((p[0] - base0[0]) * a[0] + (p[2] - base0[2]) * a[2], 0) || cfg.allAux);
    const steps = [
      { instruction: 'Draw the XY line and the 45° mitre line. The ' + cfg.name + ' rests on the horizontal plane with its axis at ' + (90 - tilt) + '° to it, parallel to the vertical plane.',
        calloutAt: [Lo.LX - Lo.y0, Lo.GY], reveals: [...xyLine(Lo), ...mitreLine(Lo)] },
      { instruction: 'Draw the axis of the ' + cfg.name + ' in the front view at ' + (90 - tilt) + '° to the XY line and extend it beyond the top end. Draw a centre line across it for the auxiliary view.',
        calloutAt: T0, reveals: [L([B0[0] - aS[0] * 6, B0[1] - aS[1] * 6], [T0[0] + aS[0] * (G + 2 * maxDev + 6), T0[1] + aS[1] * (G + 2 * maxDev + 6)], 'centre'),
          L([auxCen[0] - bS[0] * (maxDev + 6), auxCen[1] - bS[1] * (maxDev + 6)], [auxCen[0] + bS[0] * (maxDev + 6), auxCen[1] + bS[1] * (maxDev + 6)], 'centre')] },
      { instruction: 'Draw the AUXILIARY VIEW on the axis: the ' + cfg.base + ' in its true shape, as seen looking straight up the axis from below. In 1st angle it is placed beyond the far end.',
        calloutAt: auxCen, reveals: X.vis.concat(X.hid) },
      { instruction: 'Project the corners of the auxiliary view back into the front view, parallel to the axis.',
        calloutAt: [(auxCen[0] + T0[0]) / 2, (auxCen[1] + T0[1]) / 2],
        reveals: uniqBy(auxEnd, p => (p[0] - base0[0]) * b[0] + (p[2] - base0[2]) * b[2]).map(p => { const q = auxP(p); const w = (p[0] - base0[0]) * b[0] + (p[2] - base0[2]) * b[2]; const e = [B0[0] + bS[0] * w - aS[0] * 3, B0[1] + bS[1] * w - aS[1] * 3]; return L(q, e, 'construction'); }) },
      { instruction: 'Measure the length of the ' + cfg.name + ' (' + cfg.len + ' mm) along the axis and draw the visible edges of the FRONT VIEW.',
        calloutAt: [Lo.FX + cx, Lo.GY - Lo.z1 / 2], reveals: F.vis },
      { instruction: 'Add the hidden edges of the front view as short dashes.', calloutAt: [Lo.FX + cx, Lo.GY - Lo.z1 / 3], reveals: F.hid },
      { instruction: 'Project every corner straight down from the front view into the top view.',
        calloutAt: [Lo.FX + cx, (Lo.GY + Lo.TY - Lo.y1) / 2], reveals: uniqBy(pts, p => p[0]).map(p => L(Lo.fv.project(p), [Lo.FX + p[0], Lo.TY - Lo.y0 + 3], 'construction')) },
      { instruction: 'Draw the centre line of the top view, then take each corner\'s depth from the auxiliary view (its distance from the centre line there) and mark it off the centre line in the top view.',
        calloutAt: [Lo.FX + cx, Lo.TY - cfg.axis[1]], reveals: [centreH(Lo.TY - cfg.axis[1], Lo.FX + Lo.x0 - 5, Lo.FX + Lo.x1 + 5),
          ...uniqBy(pts, p => p[1]).filter(p => !near(p[1], cfg.axis[1])).map(p => L([Lo.FX + Lo.x0 - 3, Lo.TY - p[1]], [Lo.FX + Lo.x1 + 3, Lo.TY - p[1]], 'construction'))] },
      { instruction: 'Draw the visible edges of the TOP VIEW.', calloutAt: [Lo.FX + cx, Lo.TY - cy], reveals: T.vis },
      { instruction: 'Add the hidden edges of the top view.', calloutAt: [Lo.FX + cx, Lo.TY - cy], reveals: T.hid },
      { instruction: 'Project the heights across from the front view to the left view.',
        calloutAt: [(Lo.FX + Lo.x1 + Lo.LX - Lo.y1) / 2, Lo.GY - Lo.z1 / 2], reveals: fvToLv(Lo, pts) },
      { instruction: 'Project the depths from the top view across to the mitre line and up into the left view.',
        calloutAt: Lo.mitre(cy), reveals: tvToLv(Lo, pts) },
      { instruction: 'Draw the visible edges of the LEFT VIEW.', calloutAt: [Lo.LX - cy, Lo.GY - Lo.z1 / 2], reveals: [centreV(Lo.LX - cfg.axis[1], Lo.GY + 3, Lo.GY - Lo.z1 - 5), ...S.vis] },
      { instruction: 'Add the hidden edges of the left view.', calloutAt: [Lo.LX - cy, Lo.GY - Lo.z1 / 2], reveals: S.hid },
      { instruction: 'Label the views and the XY line.', calloutAt: [Lo.FX + cx, lowestTV(Lo) + 9],
        reveals: [...viewLabels(Lo), lbl([auxCen[0] + aS[0] * (maxDev + 8), auxCen[1] + aS[1] * (maxDev + 8)], 'AUXILIARY VIEW / HULPAANSIG', { size: 3, color: '#94a3b8' })] },
    ];
    finish(cfg.id, cfg.title, cfg.summary, cfg.prompt, steps);
  }

  // ═══ The exercises ═══

  threeViews({
    id: 'sg-triangular-prism', title: 'Triangular Prism: Three Views', name: 'triangular prism', H: 60,
    solids: [prism(reg(3, 30, 120, 0, 0), 60)],
    summary: 'An upright equilateral triangular prism with one face square to the left: front, top and left views in 1st angle, depths carried across by the mitre line.',
    prompt: 'An upright equilateral triangular prism (circumradius 30 mm, height 60 mm) stands on the HP with one rectangular face on the left, perpendicular to the VP, and the opposite edge pointing to the right. Draw, in 1st-angle projection, the top view, the front view and the left view. Show hidden edges.',
  });
  threeViews({
    id: 'sg-square-pyramid-30', title: 'Square Pyramid at 30°: Three Views', name: 'square pyramid', kind: 'pyramid', H: 65,
    solids: [pyramidOn(reg(4, 32, 75, 0, 0), 0, 65)],
    summary: 'A right square pyramid with its base edges at 30° and 60° to the vertical plane: the base corners are found in the top view, the apex sits on the axis.',
    prompt: 'A right square pyramid (base edges 45 mm, height 65 mm) stands on its base with its base edges at 30°/60° to the VP. Draw, in 1st angle, the top view, front view and left view. Show hidden edges.',
  });
  threeViews({
    id: 'sg-pentagonal-pyramid', title: 'Pentagonal Pyramid: Three Views', name: 'pentagonal pyramid', kind: 'pyramid', H: 70,
    solids: [pyramidOn(reg(5, 30, 90, 0, 0), 0, 70)],
    summary: 'A right regular pentagonal pyramid with one corner of its base pointing to the back: one sloping edge is hidden in the front view.',
    prompt: 'A right regular pentagonal pyramid (base circumradius 30 mm, height 70 mm) stands on the HP with a base corner pointing directly backwards. Draw the top view, front view and left view in 1st angle.',
  });
  threeViews({
    id: 'sg-hexagonal-pyramid', title: 'Hexagonal Pyramid: Three Views', name: 'hexagonal pyramid', kind: 'pyramid', H: 70,
    solids: [pyramidOn(reg(6, 30, 0, 0, 0), 0, 70)],
    summary: 'A right regular hexagonal pyramid with two corners on the left-right centre line: the top view gives the true shape of the base, the other views follow by projection.',
    prompt: 'A right regular hexagonal pyramid (base 60 mm across corners, height 70 mm) stands on the HP with two base corners on a line parallel to the VP. Draw the top view, front view and left view in 1st angle.',
  });
  threeViews({
    id: 'sg-triangular-pyramid', title: 'Triangular Pyramid: Three Views', name: 'triangular pyramid', kind: 'pyramid', H: 65,
    solids: [pyramidOn(reg(3, 32, -90, 0, 0), 0, 65)],
    summary: 'A right triangular pyramid with one base edge at the back, parallel to the VP: watch which sloping edge is hidden in each view.',
    prompt: 'A right triangular pyramid (equilateral base, circumradius 32 mm, height 65 mm) stands on the HP with one corner of the base pointing forward. Draw the top view, front view and left view in 1st angle.',
  });
  threeViews({
    id: 'sg-octagonal-prism', title: 'Octagonal Prism: Three Views', name: 'octagonal prism', H: 55,
    solids: [prism(reg(8, 30, 22.5, 0, 0), 55)],
    summary: 'An upright regular octagonal prism: the top view is the true shape, and each face you see in the front and left views becomes a strip of the same height.',
    prompt: 'An upright regular octagonal prism (60 mm across corners, height 55 mm) stands on the HP with two faces parallel to the VP. Draw the top view, front view and left view in 1st angle.',
  });
  lyingPrism({
    id: 'sg-hex-prism-lying', title: 'Hexagonal Prism Lying on a Face', shape: 'hexagon',
    solids: [SK.extrude(reg(6, 28, 0, 0, 28 * Math.cos(Math.PI / 6)), 'yz', 0, 80)],
    axis: [0, 28 * Math.cos(Math.PI / 6)],
    summary: 'A hexagonal prism lying on one of its faces with its axis parallel to both planes: the end view, in its true shape, is drawn first and everything else is projected from it.',
    prompt: 'A regular hexagonal prism (56 mm across corners, 80 mm long) lies on one of its rectangular faces on the HP, with its axis parallel to the VP. Draw the left view (true shape), front view and top view in 1st angle.',
  });

  cutSolid({
    id: 'sg-square-pyramid-cut', title: 'Square Pyramid Cut by an Inclined Plane', name: 'square pyramid', kind: 'pyramid', deg: 30, through: [0, 26],
    solids: [pyramidOn(reg(4, 34, 45, 0, 0), 0, 70)],
    summary: 'A square pyramid cut by a plane at 30° to the HP: sectional top view, sectional left view and the true shape of the cut, found by projecting at 90° from the cutting plane.',
    prompt: 'A right square pyramid (base 48 mm, height 70 mm) stands on the HP with two base edges parallel to the VP. It is cut by plane A-A, at 30° to the HP, passing through the axis 26 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.',
  });
  cutSolid({
    id: 'sg-hexagonal-pyramid-cut', title: 'Hexagonal Pyramid Cut by an Inclined Plane', name: 'hexagonal pyramid', kind: 'pyramid', deg: 25, through: [0, 30],
    solids: [pyramidOn(reg(6, 32, 0, 0, 0), 0, 75)],
    summary: 'A hexagonal pyramid cut by a plane at 25° to the HP: number the cut points, project them into the sectional views, then lay out the true shape.',
    prompt: 'A right regular hexagonal pyramid (base 64 mm across corners, height 75 mm) stands on the HP with two base corners on a line parallel to the VP. Plane A-A, at 25° to the HP, cuts the axis 30 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.',
  });
  cutSolid({
    id: 'sg-pentagonal-prism-cut', title: 'Pentagonal Prism Cut by an Inclined Plane', name: 'pentagonal prism', deg: 35, through: [0, 45],
    solids: [prism(reg(5, 30, -90, 0, 0), 75)],
    summary: 'An upright pentagonal prism cut at 35°: the sectional top view looks like the uncut prism, but the left view and the true shape show the sloping cut face.',
    prompt: 'An upright regular pentagonal prism (circumradius 30 mm, height 75 mm) stands on the HP with one face at the back, parallel to the VP. Plane A-A, at 35° to the HP, cuts the axis 45 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.',
  });
  cutSolid({
    id: 'sg-triangular-prism-cut', title: 'Triangular Prism Cut by an Inclined Plane', name: 'triangular prism', deg: 40, through: [0, 40],
    solids: [prism(reg(3, 32, 90, 0, 0), 70)],
    summary: 'An upright triangular prism cut by a steep plane at 40° to the HP: the true shape of the cut is a triangle larger than the base.',
    prompt: 'An upright equilateral triangular prism (circumradius 32 mm, height 70 mm) stands on the HP with one face at the front, parallel to the VP. Plane A-A, at 40° to the HP, cuts the axis 40 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.',
  });

  inclined({
    id: 'sg-hex-prism-inclined', title: 'Inclined Hexagonal Prism', name: 'hexagonal prism', base: 'hexagonal end',
    solids0: [prism(reg(6, 25, 0, 0, 0), 70)], axis: [0, 0], tilt: 30, pivot: [25, 0, 0], len: 70,
    summary: 'A hexagonal prism resting on one base corner with its axis at 60° to the HP: start from the true shape of the end in an auxiliary view, then project the front, top and left views.',
    prompt: 'A regular hexagonal prism (50 mm across corners, 70 mm long) rests on one corner of its base on the HP. Its axis is parallel to the VP and at 60° to the HP. Draw the auxiliary view of the end, the front view, the top view and the left view in 1st angle.',
  });
  inclined({
    id: 'sg-square-pyramid-inclined', title: 'Inclined Square Pyramid', name: 'square pyramid', base: 'square base',
    solids0: [pyramidOn(reg(4, 30, 45, 0, 0), 0, 65)], axis: [0, 0], tilt: 25, pivot: [30 / Math.SQRT2, 0, 0], len: 65,
    summary: 'A square pyramid resting on one base edge with its axis tilted at 65° to the HP: the true shape of the base comes first, in an auxiliary view on the axis.',
    prompt: 'A right square pyramid (base 42 mm, height 65 mm) rests on one base edge on the HP, with that edge perpendicular to the VP. Its axis is parallel to the VP and at 65° to the HP. Draw the auxiliary view of the base, the front view, the top view and the left view in 1st angle.',
  });

  threeViews({
    id: 'sg-combined-prism-pyramid', title: 'Combined Solids: Pyramid on a Prism', name: 'hexagonal prism with a square pyramid on it', H: 75,
    solids: [prism(reg(6, 32, 0, 0, 0), 30), pyramidOn(reg(4, 24, 45, 0, 0), 30, 45)],
    note: 'Here the top view shows both solids: the hexagon of the prism, and inside it the square base of the pyramid with its edges to the apex.',
    summary: 'A square pyramid standing centrally on a hexagonal prism: draw both solids together in three views, keeping each corner\'s projector to the right solid.',
    prompt: 'A square pyramid (base 34 mm, height 45 mm) stands centrally on top of a regular hexagonal prism (64 mm across corners, 30 mm high). Draw the combined solid in 1st angle: top view, front view and left view.',
  });
  threeViews({
    id: 'sg-combined-slab-pyramid', title: 'Combined Solids: Pyramid on a Slab', name: 'square slab with a hexagonal pyramid on it', H: 80,
    solids: [prism(reg(4, 40, 45, 0, 0), 15), pyramidOn(reg(6, 26, 90, 0, 0), 15, 65)],
    note: 'The top view shows the square slab with the hexagonal base of the pyramid inside it.',
    summary: 'A hexagonal pyramid standing on a square slab: the slab hides nothing, but its corners and the pyramid\'s corners project to different places in the left view.',
    prompt: 'A right regular hexagonal pyramid (base 52 mm across corners, height 65 mm) stands centrally on a square slab (56 mm square, 15 mm thick) with two of its base corners on the front-to-back centre line. Draw the top view, front view and left view in 1st angle.',
  });

  // ═══ More exercises (JPEGD-volume pass, 2026-10-15) ═══
  const tv = (id, title, name, kind, H, solids, summary, prompt, note) => threeViews({ id, title, name, kind, H, solids, summary, prompt, note });
  tv('sg-square-prism-30', 'Square Prism at 30°: Three Views', 'square prism', null, 60, [prism(reg(4, 28, 75, 0, 0), 60)],
    'An upright square prism turned with its faces at 30° and 60° to the vertical plane: three faces and one hidden edge to find.',
    'An upright square prism (base edges 40 mm, height 60 mm) stands on the HP with its faces at 30°/60° to the VP. Draw, in 1st angle, the top view, front view and left view. Show hidden edges.');
  tv('sg-pentagonal-prism', 'Pentagonal Prism: Three Views', 'pentagonal prism', null, 60, [prism(reg(5, 30, 90, 0, 0), 60)],
    'An upright pentagonal prism with a corner pointing to the back: one long edge is hidden in the front view.',
    'An upright regular pentagonal prism (circumradius 30 mm, height 60 mm) stands on the HP with one base corner pointing directly backwards. Draw the top view, front view and left view in 1st angle. Show hidden edges.');
  tv('sg-hexagonal-prism-faces', 'Hexagonal Prism, Faces Parallel to the VP', 'hexagonal prism', null, 55, [prism(reg(6, 30, 30, 0, 0), 55)],
    'An upright hexagonal prism with two faces parallel to the vertical plane: the front view shows three faces, the left view two.',
    'An upright regular hexagonal prism (60 mm across corners, height 55 mm) stands on the HP with two faces parallel to the VP. Draw the top view, front view and left view in 1st angle.');
  tv('sg-triangular-prism-point', 'Triangular Prism, Corner to the Front', 'triangular prism', null, 65, [prism(reg(3, 32, -90, 0, 0), 65)],
    'An upright triangular prism with one long edge pointing to the front: the back face is seen as a single line in the left view.',
    'An upright equilateral triangular prism (circumradius 32 mm, height 65 mm) stands on the HP with one corner pointing directly forward. Draw the top view, front view and left view in 1st angle. Show hidden edges.');
  tv('sg-square-pyramid-45', 'Square Pyramid, Edges at 45°', 'square pyramid', 'pyramid', 70, [pyramidOn(reg(4, 32, 0, 0, 0), 0, 70)],
    'A square pyramid with its base edges at 45° to the vertical plane: the corner sloping edges show in the front view, one of them hidden.',
    'A right square pyramid (base 45 mm, height 70 mm) stands on its base with the base edges at 45° to the VP. Draw the top view, front view and left view in 1st angle. Show hidden edges.');
  tv('sg-octagonal-pyramid', 'Octagonal Pyramid: Three Views', 'octagonal pyramid', 'pyramid', 70, [pyramidOn(reg(8, 30, 22.5, 0, 0), 0, 70)],
    'A right octagonal pyramid: eight sloping edges, three of them hidden in the front view behind the visible ones.',
    'A right regular octagonal pyramid (60 mm across corners, height 70 mm) stands on the HP with two base edges parallel to the VP. Draw the top view, front view and left view in 1st angle.');
  tv('sg-pentagonal-prism-15', 'Pentagonal Prism Turned 15°', 'pentagonal prism', null, 60, [prism(reg(5, 30, 15, 0, 0), 60)],
    'A pentagonal prism turned so that no face is parallel to either plane: every edge position comes from the top view.',
    'An upright regular pentagonal prism (circumradius 30 mm, height 60 mm) stands on the HP with one corner at 15° to the left-right centre line. Draw the top view, front view and left view in 1st angle. Show hidden edges.');
  tv('sg-hexagonal-pyramid-corners', 'Hexagonal Pyramid, Corner to the Front', 'hexagonal pyramid', 'pyramid', 72, [pyramidOn(reg(6, 30, 90, 0, 0), 0, 72)],
    'A hexagonal pyramid with a base corner to the front: the front view is symmetrical, with the back edge hidden behind the front one.',
    'A right regular hexagonal pyramid (base 60 mm across corners, height 72 mm) stands on the HP with one base corner pointing forward. Draw the top view, front view and left view in 1st angle.');

  lyingPrism({ id: 'sg-tri-prism-lying', title: 'Triangular Prism Lying on a Face', shape: 'triangle',
    solids: [SK.extrude(reg(3, 30, 90, 0, 15), 'yz', 0, 85)], axis: [0, 15],
    summary: 'A triangular prism lying on one rectangular face, axis parallel to both planes: the left view is the true triangle; the top view shows the ridge.',
    prompt: 'An equilateral triangular prism (circumradius 30 mm, 85 mm long) lies on one rectangular face on the HP with its axis parallel to the VP. Draw the left view (true shape), front view and top view in 1st angle.' });
  lyingPrism({ id: 'sg-pent-prism-lying', title: 'Pentagonal Prism Lying on a Face', shape: 'pentagon',
    solids: [SK.extrude(reg(5, 30, 90, 0, 30 * Math.cos(Math.PI / 5)), 'yz', 0, 80)], axis: [0, 30 * Math.cos(Math.PI / 5)],
    summary: 'A pentagonal prism lying on one face: the end view in its true shape comes first, the long edges are projected from its corners.',
    prompt: 'A regular pentagonal prism (circumradius 30 mm, 80 mm long) lies on one rectangular face on the HP with its axis parallel to the VP. Draw the left view (true shape), front view and top view in 1st angle.' });
  lyingPrism({ id: 'sg-square-prism-edge', title: 'Square Prism Resting on an Edge', shape: 'square',
    solids: [SK.extrude(reg(4, 26, 90, 0, 26), 'yz', 0, 85)], axis: [0, 26],
    summary: 'A square prism resting on one long edge with its faces at 45°: the end view is a square standing on a corner.',
    prompt: 'A square prism (ends 36.8 mm square, 85 mm long) rests on one long edge on the HP with its faces at 45° to the HP and its axis parallel to the VP. Draw the left view (true shape), front view and top view in 1st angle.' });

  const cs = (id, title, name, kind, deg, through, solids, summary, prompt) => cutSolid({ id, title, name, kind, deg, through, solids, summary, prompt });
  cs('sg-square-prism-cut', 'Square Prism Cut at 45°', 'square prism', null, 45, [0, 40], [prism(reg(4, 30, 45, 0, 0), 70)],
    'An upright square prism cut at 45°: the true shape of the cut is a rectangle longer than the base by the factor √2.',
    'An upright square prism (base 42 mm, height 70 mm) stands on the HP with two faces parallel to the VP. Plane A-A, at 45° to the HP, cuts the axis 40 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-hexagonal-prism-cut', 'Hexagonal Prism Cut at 30°', 'hexagonal prism', null, 30, [0, 38], [prism(reg(6, 30, 0, 0, 0), 70)],
    'An upright hexagonal prism cut by a plane at 30°: the cut face is an elongated hexagon in its true shape.',
    'An upright regular hexagonal prism (60 mm across corners, height 70 mm) stands on the HP with two corners on a line parallel to the VP. Plane A-A, at 30° to the HP, cuts the axis 38 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-octagonal-prism-cut', 'Octagonal Prism Cut at 35°', 'octagonal prism', null, 35, [0, 40], [prism(reg(8, 30, 22.5, 0, 0), 70)],
    'An octagonal prism cut by an inclined plane: eight cut points, an octagon in its true shape stretched along the plane.',
    'An upright regular octagonal prism (60 mm across corners, height 70 mm) stands on the HP with two faces parallel to the VP. Plane A-A, at 35° to the HP, cuts the axis 40 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-pentagonal-pyramid-cut', 'Pentagonal Pyramid Cut by an Inclined Plane', 'pentagonal pyramid', 'pyramid', 30, [0, 28], [pyramidOn(reg(5, 32, 90, 0, 0), 0, 75)],
    'A pentagonal pyramid cut at 30°: the cut points on the sloping edges are carried into the top view along the projectors and the true shape is laid out at 90° to the plane.',
    'A right regular pentagonal pyramid (circumradius 32 mm, height 75 mm) stands on the HP with one base corner pointing backwards. Plane A-A, at 30° to the HP, cuts the axis 28 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-triangular-pyramid-cut', 'Triangular Pyramid Cut by an Inclined Plane', 'triangular pyramid', 'pyramid', 35, [0, 25], [pyramidOn(reg(3, 34, 90, 0, 0), 0, 70)],
    'A triangular pyramid cut at 35°: three cut points, one of them on the edge at the back, give a triangular true shape.',
    'A right triangular pyramid (equilateral base, circumradius 34 mm, height 70 mm) stands on the HP with one base corner pointing backwards. Plane A-A, at 35° to the HP, cuts the axis 25 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-square-pyramid-cut-45', 'Square Pyramid Cut at 45°', 'square pyramid', 'pyramid', 45, [0, 30], [pyramidOn(reg(4, 34, 0, 0, 0), 0, 75)],
    'A square pyramid with its base edges at 45°, cut by a plane at 45°: the cut passes one corner edge near the base and the opposite one near the apex.',
    'A right square pyramid (base 48 mm, height 75 mm) stands on the HP with its base edges at 45° to the VP. Plane A-A, at 45° to the HP, cuts the axis 30 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-hexagonal-prism-cut-top', 'Hexagonal Prism Cut Through the Top', 'hexagonal prism', null, 40, [0, 50], [prism(reg(6, 30, 30, 0, 0), 65)],
    'A hexagonal prism cut by a plane that leaves through the top face: part of the true shape lies on the top face, so the cut face has a straight edge across the top.',
    'An upright regular hexagonal prism (60 mm across corners, height 65 mm) stands on the HP with two faces parallel to the VP. Plane A-A, at 40° to the HP, cuts the axis 50 mm above the base and passes out through the top face. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');

  inclined({ id: 'sg-pent-prism-inclined', title: 'Inclined Pentagonal Prism', name: 'pentagonal prism', base: 'pentagonal end',
    solids0: [prism(reg(5, 24, 0, 0, 0), 60)], axis: [0, 0], tilt: 30, pivot: [24, 0, 0], len: 60,
    summary: 'A pentagonal prism resting on one base corner with its axis at 60° to the HP: auxiliary view of the end first, then front, top and left views.',
    prompt: 'A regular pentagonal prism (circumradius 24 mm, 60 mm long) rests on one corner of its base on the HP. Its axis is parallel to the VP and at 60° to the HP. Draw the auxiliary view of the end, the front view, the top view and the left view in 1st angle.' });
  inclined({ id: 'sg-tri-prism-inclined', title: 'Inclined Triangular Prism', name: 'triangular prism', base: 'triangular end',
    solids0: [prism(reg(3, 26, 0, 0, 0), 60)], axis: [0, 0], tilt: 35, pivot: [26, 0, 0], len: 60,
    summary: 'A triangular prism resting on a base corner with its axis at 55° to the HP.',
    prompt: 'An equilateral triangular prism (circumradius 26 mm, 60 mm long) rests on one corner of its base on the HP. Its axis is parallel to the VP and at 55° to the HP. Draw the auxiliary view of the end, the front view, the top view and the left view in 1st angle.' });
  inclined({ id: 'sg-hex-pyramid-inclined', title: 'Inclined Hexagonal Pyramid', name: 'hexagonal pyramid', base: 'hexagonal base',
    solids0: [pyramidOn(reg(6, 28, 0, 0, 0), 0, 65)], axis: [0, 0], tilt: 25, pivot: [28, 0, 0], len: 65,
    summary: 'A hexagonal pyramid resting on one base corner with its axis at 65° to the HP: the base becomes a flattened hexagon in the top view.',
    prompt: 'A right regular hexagonal pyramid (56 mm across corners, height 65 mm) rests on one base corner on the HP. Its axis is parallel to the VP and at 65° to the HP. Draw the auxiliary view of the base, the front view, the top view and the left view in 1st angle.' });
  inclined({ id: 'sg-square-prism-inclined', title: 'Inclined Square Prism', name: 'square prism', base: 'square end',
    solids0: [prism(reg(4, 28, 45, 0, 0), 70)], axis: [0, 0], tilt: 30, pivot: [28 / Math.SQRT2, 0, 0], len: 70,
    summary: 'A square prism resting on one edge of its end, with its axis at 60° to the HP.',
    prompt: 'A square prism (ends 39.6 mm square, 70 mm long) rests on one edge of its end on the HP, that edge perpendicular to the VP. Its axis is parallel to the VP and at 60° to the HP. Draw the auxiliary view of the end, the front view, the top view and the left view in 1st angle.' });

  tv('sg-combined-tri-on-slab', 'Combined Solids: Triangular Prism on a Slab', 'square slab with a triangular prism on it', null, 60,
    [prism(reg(4, 42, 45, 0, 0), 12), prism(reg(3, 26, 90, 0, 0), 60)],
    'An upright triangular prism standing centrally on a square slab: three views of the combined solid.',
    'An upright equilateral triangular prism (circumradius 26 mm, 48 mm tall) stands centrally on a square slab (59 mm square, 12 mm thick) with one corner pointing backwards. Draw the top view, front view and left view in 1st angle.',
    'The top view shows the square slab with the triangle of the prism inside it.');
  tv('sg-combined-pent-on-hex', 'Combined Solids: Pentagonal Pyramid on a Hexagonal Prism', 'hexagonal prism with a pentagonal pyramid on it', null, 80,
    [prism(reg(6, 34, 30, 0, 0), 25), pyramidOn(reg(5, 26, 90, 0, 0), 25, 55)],
    'A pentagonal pyramid standing centrally on a hexagonal prism: two different polygons in one top view, every corner projected to its own solid.',
    'A right regular pentagonal pyramid (circumradius 26 mm, height 55 mm) stands centrally on a regular hexagonal prism (68 mm across corners, 25 mm high, two faces parallel to the VP). Draw the top view, front view and left view in 1st angle.',
    'The top view shows the hexagon of the prism with the pentagonal base of the pyramid and its edges to the apex inside it.');

  // ═══ Combined solids cut by a plane (Gr 11 type) ═══
  cs('sg-cut-pyramid-on-prism', 'Combined Solids Cut: Pyramid on a Hexagonal Prism', 'combined solid', null, 30, [0, 34],
    [prism(reg(6, 32, 0, 0, 0), 30), pyramidOn(reg(4, 24, 45, 0, 0), 30, 45)],
    'A square pyramid on a hexagonal prism, cut by a plane at 30° that passes from the prism into the pyramid: the true shape has a corner where it crosses the join.',
    'A square pyramid (base 34 mm, height 45 mm) stands centrally on a regular hexagonal prism (64 mm across corners, 30 mm high). Plane A-A, at 30° to the HP, cuts the axis 34 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-cut-slab-pyramid', 'Combined Solids Cut: Hexagonal Pyramid on a Slab', 'combined solid', null, 25, [0, 22],
    [prism(reg(4, 40, 45, 0, 0), 15), pyramidOn(reg(6, 26, 90, 0, 0), 15, 60)],
    'A hexagonal pyramid on a square slab, cut at 25° through both: the section is part slab, part pyramid.',
    'A right regular hexagonal pyramid (52 mm across corners, 60 mm high) stands centrally on a square slab (56 mm square, 15 mm thick). Plane A-A, at 25° to the HP, cuts the axis 22 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-cut-stacked-prisms', 'Combined Solids Cut: Square Prism on a Hexagonal Prism', 'combined solid', null, 35, [0, 32],
    [prism(reg(6, 32, 30, 0, 0), 24), SK.extrude(reg(4, 20, 45, 0, 0), 'xy', 24, 60)],
    'A square prism standing on a hexagonal prism, cut by a plane at 35°: two different polygons in one true shape.',
    'A square prism (28 mm square, 36 mm high) stands centrally on a regular hexagonal prism (64 mm across corners, 24 mm high, two faces parallel to the VP). Plane A-A, at 35° to the HP, cuts the axis 32 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-cut-tri-on-slab', 'Combined Solids Cut: Triangular Prism on a Slab', 'combined solid', null, 40, [0, 26],
    [prism(reg(4, 42, 45, 0, 0), 12), SK.extrude(reg(3, 26, 90, 0, 0), 'xy', 12, 60)],
    'A triangular prism on a square slab, cut steeply at 40%: the cut leaves the slab and runs up the prism.'.replace('40%', '40°'),
    'An equilateral triangular prism (circumradius 26 mm, 48 mm tall) stands centrally on a square slab (59 mm square, 12 mm thick) with one corner pointing backwards. Plane A-A, at 40° to the HP, cuts the axis 26 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
  cs('sg-cut-pent-on-hex', 'Combined Solids Cut: Pentagonal Pyramid on a Hexagonal Prism', 'combined solid', null, 30, [0, 30],
    [prism(reg(6, 34, 30, 0, 0), 25), pyramidOn(reg(5, 26, 90, 0, 0), 25, 55)],
    'A pentagonal pyramid on a hexagonal prism, cut at 30°: number the cut points on both solids, then lay out one true shape.',
    'A right regular pentagonal pyramid (circumradius 26 mm, height 55 mm) stands centrally on a regular hexagonal prism (68 mm across corners, 25 mm high). Plane A-A, at 30° to the HP, cuts the axis 30 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section.');
})(window);
