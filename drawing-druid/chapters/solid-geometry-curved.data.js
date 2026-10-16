// Solid Geometry: right cylinders and cones cut by a plane perpendicular to the VP, in 1st angle.
// The base circle is divided into 12 generators (the workbook method); the cut points are found
// on the generators, projected into the sectional top and left views, and the true shape is laid
// off at 90° to the cutting plane. Runs after solid-geometry-views.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER, AK = global.AssemblyKit;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#94a3b8' }, opts || {});
  const YEL = { color: '#fde047' };
  const pt = (at, label) => ({ kind: 'point', at, label });
  const circ = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const rad = d => d * Math.PI / 180;
  const uniq = (arr, k) => { const out = []; arr.forEach(v => { if (!out.some(w => Math.abs(k(w) - k(v)) < 0.05)) out.push(v); }); return out; };

  // cfg: id, title, kind 'cylinder' | 'cone', R, H, deg (plane at deg° to the HP, rising to the right), za (where it cuts the axis)
  // the cut solid for the 3D model: 48 flat facets marked as one smooth surface (smooth.all)
  function model3d(cone, R, H, T, za) {
    const SK = global.SolidKit, N = 48, ring = Array.from({ length: N }, (_, i) => { const a = 2 * Math.PI * i / N; return [R * Math.cos(a), R * Math.sin(a)]; });
    const faces = [SK.face(ring.slice().reverse().map(([x, y]) => [x, y, 0]), { n: [0, 0, -1] })];
    ring.forEach((p, i) => {
      const q = ring[(i + 1) % N], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], l = Math.hypot(m[0], m[1]);
      const n = cone ? [m[0] / l * H, m[1] / l * H, R] : [m[0] / l, m[1] / l, 0];
      const pts = cone ? [[p[0], p[1], 0], [q[0], q[1], 0], [0, 0, H]] : [[p[0], p[1], 0], [q[0], q[1], 0], [q[0], q[1], H], [p[0], p[1], H]];
      faces.push(SK.face(pts, { n, smooth: { a: true, b: true, all: true } }));
    });
    if (!cone) faces.push(SK.face(ring.map(([x, y]) => [x, y, H]), { n: [0, 0, 1] }));
    const k = Math.hypot(T, 1), res = SK.cut(faces, [-T / k, 0, 1 / k], za / k);   // keep z - T·x ≤ za
    if (res.cap) res.cap.cutFace = true;
    return [res.faces];
  }

  function curvedCut(cfg) {
    const { R, H, deg, za } = cfg, cone = cfg.kind === 'cone', T = Math.tan(rad(deg)), name = cone ? 'cone' : 'cylinder';
    const gap = 24, FX = 40 + R, GY = 30 + H, TY = GY + gap + R, LX = FX + R + gap + R;
    const F = p => [FX + p[0], GY - p[2]], Tv = p => [FX + p[0], TY - p[1]], Lv = p => [LX - p[1], GY - p[2]];
    const mitre = y => [LX - y, TY - y];
    // the cut point on the generator through the base point at plan angle a
    const cutAt = a => {
      const x = R * Math.cos(a), y = R * Math.sin(a);
      if (!cone) return [x, y, za + T * x];
      const s = (za + T * x) / (H + T * x);
      return [x * (1 - s), y * (1 - s), H * s];
    };
    const gens = Array.from({ length: 12 }, (_, k) => { const a = rad(180 + 30 * k); return { k, a, base: [R * Math.cos(a), R * Math.sin(a), 0], cut: cutAt(a) }; });
    const curve = Array.from({ length: 97 }, (_, i) => cutAt(rad(180 + 360 * i / 96)));
    const up = [-Math.sin(rad(deg)), -Math.cos(rad(deg))], along = [Math.cos(rad(deg)), -Math.sin(rad(deg))];
    const zL = za - T * (R + 8), zR = za + T * (R + 8);
    const A1 = F([-R - 8, 0, zL]), A2 = F([R + 8, 0, zR]);
    const G = R + 6 + 0.55 * (H - za + R * T) * Math.cos(rad(deg));   // clear of the lined-in part
    const ts = p => { const b = F(p); return [b[0] + up[0] * (G - p[1]), b[1] + up[1] * (G - p[1])]; };
    const leftCut = cutAt(Math.PI), rightCut = cutAt(0), back = cutAt(rad(90)), front = cutAt(rad(270));
    const arrow = (p) => { const tip = [p[0] + up[0] * 7, p[1] + up[1] * 7]; return [L(p, tip, 'B'), pl([[tip[0] - up[0] * 2.5 + along[0] * 1.3, tip[1] - up[1] * 2.5 + along[1] * 1.3], tip, [tip[0] - up[0] * 2.5 - along[0] * 1.3, tip[1] - up[1] * 2.5 - along[1] * 1.3]], 'B')]; };
    const fvCuts = uniq(gens.map(g => g), g => g.cut[0]);
    const tvCurve = curve.map(Tv), lvCurve = curve.map(Lv), tsCurve = curve.map(ts);
    const steps = [
      { instruction: 'Draw the XY line and the 45° mitre line (1st angle: the top view goes BELOW the front view, the left view to its RIGHT).', calloutAt: [LX + R, GY],
        reveals: [L([FX - R - 14, GY], [LX + R + 14, GY], 'B'), lbl([FX - R - 17, GY + 1.2], 'X', { size: 3.4, anchor: 'end', color: '#e8eaf2' }), lbl([LX + R + 17, GY + 1.2], 'Y', { size: 3.4, anchor: 'start', color: '#e8eaf2' }), L(mitre(-R - 6), mitre(R + 6), 'construction')] },
      { instruction: 'TOP VIEW: draw the base circle (Ø' + 2 * R + ') with its centre lines.' + (cone ? ' The apex is seen at the centre.' : ''), calloutAt: Tv([0, -R, 0]),
        reveals: [circ(Tv([0, 0, 0]), R, 'construction'), L(Tv([-R - 6, 0, 0]), Tv([R + 6, 0, 0]), 'centre'), L(Tv([0, -R - 6, 0]), Tv([0, R + 6, 0]), 'centre')] },
      { instruction: 'Divide the circle into 12 equal parts (30° each) and number the points 1 to 12. Each point is the foot of a GENERATOR: a straight line on the surface' + (cone ? ' running up to the apex.' : ' running straight up the side.'),
        calloutAt: Tv(gens[1].base), reveals: [...gens.map(g => pt(Tv(g.base), String(g.k + 1))), ...(cone ? gens.map(g => L(Tv([0, 0, 0]), Tv(g.base), 'construction')) : [])] },
      { instruction: 'FRONT VIEW: project the 12 points up to the base line and draw the ' + name + ' in thin lines (' + (cone ? 'height ' + H + ', with each generator joined to the apex' : 'height ' + H + ', each generator a vertical line') + ').', calloutAt: F([0, 0, H / 2]),
        reveals: [...uniq(gens, g => g.base[0]).map(g => L(Tv(g.base), F(g.base), 'construction')),
          ...(cone ? [poly([F([-R, 0, 0]), F([R, 0, 0]), F([0, 0, H])], 'construction'), ...uniq(gens, g => g.base[0]).map(g => L(F(g.base), F([0, 0, H]), 'construction'))]
            : [poly([F([-R, 0, 0]), F([R, 0, 0]), F([R, 0, H]), F([-R, 0, H])], 'construction'), ...uniq(gens, g => g.base[0]).map(g => L(F(g.base), F([g.base[0], 0, H]), 'construction'))]),
          L(F([0, 0, -4]), F([0, 0, H + 6]), 'centre')] },
      { instruction: 'Draw the cutting plane A-A at ' + deg + '° to the XY line, crossing the axis ' + za + ' above the base, with the arrows for the true shape.', calloutAt: A2,
        reveals: [L(A1, A2, 'centre'), L(A1, [A1[0] + along[0] * 6, A1[1] + along[1] * 6]), L(A2, [A2[0] - along[0] * 6, A2[1] - along[1] * 6]), ...arrow(A1), ...arrow(A2),
          lbl([A1[0] - 4, A1[1] + 1], 'A', Object.assign({ size: 4, anchor: 'end' }, YEL)), lbl([A2[0] + 4, A2[1] + 1], 'A', Object.assign({ size: 4, anchor: 'start' }, YEL))] },
      { instruction: 'Mark where A-A crosses each generator in the front view. A front generator and the back one with the same position fall on the same point.', calloutAt: F(fvCuts[2].cut),
        reveals: fvCuts.map(g => pt(F(g.cut))) },
      { instruction: cone ? 'Project each cut point straight down into the top view onto ITS OWN generator (the radial line with the same number). Points 1 and 7 lie on the centre line; carry 4 and 10 across from the left view later if they are hard to place.'
        : 'Project each cut point straight down into the top view. On a cylinder every cut point lands on the circle itself, so the sectional top view is the full circle.', calloutAt: Tv(gens[2].cut),
        reveals: [...fvCuts.map(g => L(F(g.cut), Tv([g.cut[0], -R - 2, 0]), 'construction')), ...gens.map(g => pt(Tv(g.cut)))] },
      { instruction: 'Line in the SECTIONAL TOP VIEW: ' + (cone ? 'the base circle, and the cut face as a smooth curve through the 12 points' : 'the circle') + '. Hatch the cut face.', calloutAt: Tv([0, 0, 0]),
        reveals: [circ(Tv([0, 0, 0]), R), ...(cone ? [pl(tvCurve)] : []), ...AK.hatch([tvCurve], 45, 2.5)] },
      { instruction: 'Line in the FRONT VIEW: only the part below A-A.', calloutAt: F([0, 0, za / 2]),
        reveals: [pl([F(leftCut), F([-R, 0, 0]), F([R, 0, 0]), F(rightCut)]), L(F(leftCut), F(rightCut))] },
      { instruction: 'LEFT VIEW: carry the 12 points from the top view across to the mitre line and up (depths), and the cut points across from the front view (heights).', calloutAt: mitre(0),
        reveals: [...uniq(gens, g => g.cut[1]).flatMap(g => [L(Tv(g.cut), mitre(g.cut[1]), 'construction'), L(mitre(g.cut[1]), Lv([0, g.cut[1], g.cut[2] + 3]), 'construction')]),
          ...fvCuts.map(g => L(F(g.cut), Lv([0, -R - 3, g.cut[2]]), 'construction'))] },
      { instruction: 'Where the depth and height lines with the same number cross is a point of the cut in the left view. Mark all 12.', calloutAt: Lv(gens[3].cut), reveals: gens.map(g => pt(Lv(g.cut), String(g.k + 1))) },
      { instruction: 'Line in the SECTIONAL LEFT VIEW: the base, the outline generators up to the cut, and a smooth curve through the points. Hatch the cut face. The front is on the right.', calloutAt: Lv([0, 0, za]),
        reveals: [L(Lv([0, -R, 0]), Lv([0, R, 0])), L(Lv([0, R, 0]), Lv(back)), L(Lv([0, -R, 0]), Lv(front)), pl(lvCurve), ...AK.hatch([lvCurve], 45, 2.5), L(Lv([0, 0, -4]), Lv([0, 0, Math.max(...curve.map(p => p[2])) + 6]), 'centre')] },
      { instruction: 'TRUE SHAPE: from each cut point on A-A draw a projector at 90° to the cutting plane, away from the solid.', calloutAt: [(A1[0] + A2[0]) / 2 + up[0] * G, (A1[1] + A2[1]) / 2 + up[1] * G],
        reveals: fvCuts.map(g => { const b = F(g.cut), o = G + R + 4; return L(b, [b[0] + up[0] * o, b[1] + up[1] * o], 'construction'); }) },
      { instruction: 'Draw a centre line parallel to A-A, ' + Math.round(G) + ' from it: it stands for the centre line of the top view.', calloutAt: [A2[0] + up[0] * G, A2[1] + up[1] * G],
        reveals: [L([A1[0] + up[0] * G, A1[1] + up[1] * G], [A2[0] + up[0] * G, A2[1] + up[1] * G], 'centre')] },
      { instruction: 'Measure each point\'s distance from the centre line in the TOP view and mark it on both sides of the new centre line on its projector. Join the points with a smooth curve: ' + (cone ? 'an ellipse.' : 'an ellipse whose short axis equals the diameter.'), calloutAt: ts(gens[3].cut),
        reveals: [...gens.map(g => pt(ts(g.cut))), pl(tsCurve)] },
      { instruction: 'Hatch the true shape and label it, and name the views.', calloutAt: ts([0, 0, za]),
        reveals: [...AK.hatch([tsCurve], 45, 2.5), lbl([ts([0, 0, za])[0], ts([0, 0, za])[1] - R / Math.cos(rad(deg)) - 5], 'TRUE SHAPE A-A', Object.assign({ size: 3 }, YEL)),
          lbl([FX, GY + 8], 'FRONT VIEW', { size: 3 }), lbl([FX, TY + R + 9], 'SECTIONAL TOP VIEW', { size: 3 }), lbl([LX, GY + 8], 'SECTIONAL LEFT VIEW', { size: 3 })] },
    ];
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'first', printLayout: 'full', summary: cfg.summary, _solids: model3d(cone, R, H, T, za),
      workbookPrompt: 'A right ' + name + ' (base Ø' + 2 * R + ', height ' + H + ') stands on its base on the HP. It is cut by plane A-A, perpendicular to the VP, at ' + deg + '° to the HP, crossing the axis ' + za + ' above the base. Draw, in 1st angle, the front view, the sectional top view, the sectional left view and the true shape of the section. Use 12 generators.',
      steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(cfg.id);
  }

  curvedCut({ id: 'sg-cyl-cut-30', title: 'Cylinder Cut at 30°', kind: 'cylinder', R: 25, H: 70, deg: 30, za: 38,
    summary: 'A cylinder cut by a plane at 30°: every cut point lies on the circle in the top view, the left view shows a curve, and the true shape is an ellipse 50 wide.' });
  curvedCut({ id: 'sg-cyl-cut-45', title: 'Cylinder Cut at 45°', kind: 'cylinder', R: 22, H: 75, deg: 45, za: 40,
    summary: 'At 45° the cut on a cylinder shows as a CIRCLE in the left view: the heights and depths change at the same rate. The true shape is still an ellipse.' });
  curvedCut({ id: 'sg-cyl-cut-55', title: 'Cylinder Cut at 55°', kind: 'cylinder', R: 18, H: 80, deg: 55, za: 42,
    summary: 'A steep cut on a slender cylinder: a long, narrow ellipse for the true shape and a curve in the left view that is taller than it is wide.' });
  curvedCut({ id: 'sg-cyl-cut-20', title: 'Cylinder Cut at 20°', kind: 'cylinder', R: 30, H: 55, deg: 20, za: 30,
    summary: 'A shallow cut on a wide cylinder: the true shape is an ellipse only a little longer than the circle.' });
  curvedCut({ id: 'sg-cone-cut-25', title: 'Cone Cut at 25°', kind: 'cone', R: 30, H: 75, deg: 25, za: 30,
    summary: 'A cone cut by a plane at 25°: each cut point is found on its own generator and projected down to the radial line in the top view. The true shape is an ellipse.' });
  curvedCut({ id: 'sg-cone-cut-35', title: 'Cone Cut at 35°', kind: 'cone', R: 28, H: 70, deg: 35, za: 30,
    summary: 'A cone cut at 35°: the cut face shows as an egg-shaped curve in the top view, offset from the centre, and the true shape is an ellipse.' });
  curvedCut({ id: 'sg-cone-cut-15', title: 'Cone Cut at 15°', kind: 'cone', R: 28, H: 54, deg: 15, za: 22,
    summary: 'A low cut at 15° across a broad cone: the section is close to a circle, slightly larger on the high side.' });
  curvedCut({ id: 'sg-cone-cut-45', title: 'Cone Cut at 45°', kind: 'cone', R: 24, H: 74, deg: 45, za: 32,
    summary: 'A steep cut on a tall cone, still less steep than the side: a long ellipse for the true shape.' });
})(window);
