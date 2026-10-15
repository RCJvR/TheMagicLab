// Isometric Drawing II (Gr 11-12): isometric from given views with round ends, bosses and holes.
// Needs solid-kit.js and isometric-drawing-more.data.js (window.IsoFromViews).
(function (global) {
  'use strict';
  const SK = global.SolidKit, build = global.IsoFromViews;
  const N = 36;                                         // segments in a full circle

  // a closed arc as points, anticlockwise from a0 to a1 (degrees) about c
  const arcPts = (c, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
  const circ = (c, r) => arcPts(c, r, 0, 360 - 360 / N, N - 1);

  // Extrude a profile (anticlockwise) with round holes. smoothIdx: profile vertices on curves.
  function extrudeH(profile, holes, plane, t0, t1, smoothIdx) {
    const to3 = (a, b, t) => plane === 'xz' ? [a, t, b] : plane === 'yz' ? [t, a, b] : [a, b, t];
    const axis = plane === 'xz' ? [0, 1, 0] : plane === 'yz' ? [1, 0, 0] : [0, 0, 1];
    const nrm = (na, nb) => plane === 'xz' ? [na, 0, nb] : plane === 'yz' ? [0, na, nb] : [na, nb, 0];
    const sm = new Set(smoothIdx || []);
    const faces = [
      SK.face(profile.map(([a, b]) => to3(a, b, t0)), { n: axis.map(v => -v), holes: holes.map(h => h.map(([a, b]) => to3(a, b, t0))) }),
      SK.face(profile.map(([a, b]) => to3(a, b, t1)), { n: axis, holes: holes.map(h => h.map(([a, b]) => to3(a, b, t1))) }),
    ];
    const sides = (loop, inward, smoothAll) => loop.forEach((p, i) => {
      const j = (i + 1) % loop.length, q = loop[j];
      const na = q[1] - p[1], nb = -(q[0] - p[0]);
      faces.push(SK.face([to3(p[0], p[1], t0), to3(q[0], q[1], t0), to3(q[0], q[1], t1), to3(p[0], p[1], t1)],
        { n: inward ? nrm(-na, -nb) : nrm(na, nb), smooth: smoothAll ? { a: true, b: true } : (sm.size ? { a: sm.has(i), b: sm.has(j) } : null) }));
    });
    sides(profile, false, false);
    holes.forEach(h => sides(h, true, true));
    return faces;
  }
  // a profile with a round end: straight part from (x0, y0) to (x1, y0) … closed by a semicircle
  // of radius r about (cx, cy); returns { pts, smooth }
  function roundEnded(left, right, r, cy) {
    // a slot shape: semicircles about (left, cy) and (right, cy)
    const a = arcPts([right, cy], r, -90, 90, 12), b = arcPts([left, cy], r, 90, 270, 12);
    const pts = [...a, ...b];
    return { pts, smooth: pts.map((_, i) => i) };
  }

  // ── Link plate: two round ends and two holes ──
  (function () {
    const R = 20, T = 12, L = 70;
    const sh = roundEnded(R, R + L, R, R);
    build({
      id: 'iso2-link-plate', title: 'Isometric from Views: Link Plate',
      summary: 'A flat link with round ends and two holes: every circle on the top face becomes an isometric ellipse, drawn in its isometric square.',
      prompt: 'The given views show a link plate (round ends R20, holes Ø20 at 70 mm centres, 12 thick) in 3rd-angle projection. Draw an isometric view, full size, starting at S. Show no hidden detail.',
      note: 'S is the corner of the enclosing box: the round ends do not reach it.',
      parts: [{ solid: extrudeH(sh.pts, [circ([R, R], 10), circ([R + L, R], 10)], 'xy', 0, T, sh.smooth),
        text: 'Locate the centres of the two round ends on the top of the box. Box each end in an isometric square of side 40 and draw the R20 ends as parts of isometric circles; join them with the two straight sides. Drop the visible outline 12 mm for the bottom edge, then draw the Ø20 holes as isometric circles in squares of side 20. You see a little of the bottom edge of each hole through it.', at: [R + L / 2, 0, T] }],
    });
  })();

  // ── Bearing block: base with an upright that has a round top and a hole ──
  (function () {
    const W = 84, D = 40, Tb = 12, uw = 44, ux = (W - uw) / 2, ut = 14, cz = 46, R = uw / 2;
    const up = [[ux, Tb], [ux + uw, Tb], ...arcPts([W / 2, cz], R, 0, 180, 14).slice(0, 15)];
    const smooth = up.map((_, i) => i).filter(i => i >= 2);
    build({
      id: 'iso2-bearing-block', title: 'Isometric from Views: Bearing Block',
      summary: 'An upright with a semicircular top and a bearing hole, standing on a base plate: the round top and the hole are isometric circles in the front plane.',
      prompt: 'Draw an isometric view of the bearing block from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
      parts: [
        { solid: SK.box(0, 0, 0, W, D, Tb), text: 'Draw the base plate: 84 × 40 × 12.', at: [W / 2, 0, 6] },
        { solid: extrudeH(up, [circ([W / 2, cz], 11)], 'xz', 0, ut, smooth), text: 'Draw the upright on the front face, 14 thick: its sides, then the R22 top as half an isometric circle in the front plane (box it first), and the Ø22 bearing hole on the same centre. Carry the top curve back 14 and draw the outline that joins the two curves.', at: [W / 2, 0, cz] },
      ],
    });
  })();

  // ── Boss on a base: a vertical cylinder with a hole ──
  (function () {
    const W = 80, D = 56, T = 12, c = [40, 28], Rb = 18, Rh = 9, Hb = 32;
    const boss = extrudeH(circ(c, Rb), [circ(c, Rh)], 'xy', T, T + Hb, Array.from({ length: N }, (_, i) => i));
    build({
      id: 'iso2-boss-on-base', title: 'Isometric from Views: Boss on a Base Plate',
      summary: 'A cylindrical boss with a hole, standing on a base plate: the top circle, the base circle and the two straight outlines that join them.',
      prompt: 'Draw an isometric view of the base plate with its boss (Ø36, 32 high, hole Ø18) from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
      parts: [
        { solid: SK.box(0, 0, 0, W, D, T), text: 'Draw the base plate: 80 × 56 × 12.', at: [W / 2, 0, 6] },
        { solid: boss, text: 'Locate the centre of the boss on the top of the base. Draw the Ø36 circle where it stands as an isometric circle, and again 32 higher for its top. Join the two ellipses with vertical lines touching them on each side, and draw the Ø18 hole in the top.', at: [c[0], c[1], T + Hb] },
      ],
    });
  })();

  // ── Angle plate with a round-topped upright and holes ──
  (function () {
    const W = 76, D = 50, T = 12, Hu = 56, R = D / 2;
    // upright in the yz plane at the left end: rectangle with a round top
    const up = [[0, 0], [D, 0], ...arcPts([R, Hu - R], R, 0, 180, 14)];
    const smooth = up.map((_, i) => i).filter(i => i >= 2);
    const base = extrudeH([[T, 0], [W, 0], [W, D], [T, D]], [circ([W - 20, R], 8)], 'xy', 0, T, []);
    build({
      id: 'iso2-angle-plate', title: 'Isometric from Views: Angle Plate',
      summary: 'An upright with a round top and a hole, joined to a base plate with its own hole: circles in two different isometric planes.',
      prompt: 'Draw an isometric view of the angle plate from the given 3rd-angle views, full size, starting at S. Show no hidden detail.',
      parts: [
        { solid: extrudeH(up, [circ([R, Hu - R], 10)], 'yz', 0, T, smooth), text: 'Draw the upright at the left-hand end, 12 thick: its profile is in the left (side) plane, so the R25 top and the Ø20 hole are isometric circles in that plane.', at: [0, R, Hu] },
        { solid: base, text: 'Draw the base, 12 thick, from the upright to the right-hand end, with the Ø16 hole 20 in from the end. The hole is an isometric circle in the horizontal plane.', at: [W - 20, 0, T] },
      ],
    });
  })();
})(window);
