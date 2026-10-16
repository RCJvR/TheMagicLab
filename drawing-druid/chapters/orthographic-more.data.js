// Orthographic projection (Gr 10): generated sectional-view exercises for turned parts, as in the
// workbooks: the front view (looking along the axis) and the right view are given with cutting
// plane A-A; draw the front view and the SECTIONAL right view on A-A, full size, 3rd angle.
// Needs assembly-kit.js (hatching). Runs after orthographic-projection.data.js.
(function (global) {
  'use strict';
  const AK = global.AssemblyKit, C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const circ = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const rad = d => d * Math.PI / 180;
  function inPoly(p, pts) {
    let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if ((yi > p[1]) !== (yj > p[1]) && p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi) c = !c; }
    return c;
  }

  // cfg: id, title, name, profile [[x, r], …] (x along the axis from the front face, r ≥ 0; one
  //      closed outline of the material, bore included), holes { pcd, d, n, x0, x1, a0 } (axial
  //      holes, one on the cutting plane), summary, prompt, dims
  function turned(cfg) {
    const P = cfg.profile, xs = P.map(p => p[0]), rs = P.map(p => p[1]);
    const len = Math.max(...xs) - Math.min(...xs), Rmax = Math.max(...rs), x0 = Math.min(...xs);
    const inMat = (x, r) => inPoly([x, Math.abs(r)], P) && !(cfg.holes && Math.abs(Math.abs(r) - cfg.holes.pcd / 2) < cfg.holes.d / 2 && x > cfg.holes.x0 && x < cfg.holes.x1);
    // layout (mm): answer on the left, given views at half size on the right
    const FX = 30 + Rmax, CY = 30 + Rmax, RX = FX + Rmax + 30;            // RX: front face (x = x0) of the right view
    const GS = 0.5, GX = RX + len + 40 + Rmax * GS, GY = 26 + Rmax * GS, GRX = GX + Rmax * GS + 12;
    // circles in the front view: visible when the line of sight (towards the front) is clear on one side
    const radii = [...new Set(rs.filter(r => r > 1e-6).map(r => +r.toFixed(3)))].sort((a, b) => b - a);
    const clearInFront = (x, r) => { for (let t = x - 0.3; t > x0 - 1; t -= 0.5) if (inMat(t, r)) return false; return true; };
    const visR = r => P.some(([x, rr]) => Math.abs(rr - r) < 1e-3 && (clearInFront(x, r - 0.02) || clearInFront(x, r + 0.02)));
    const H = cfg.holes, holeAngles = H ? Array.from({ length: H.n }, (_, k) => (H.a0 == null ? 90 : H.a0) + 360 * k / H.n) : [];
    const fvParts = (cx, cy, s) => ({
      cl: [L([cx - (Rmax + 6) * s, cy], [cx + (Rmax + 6) * s, cy], 'centre'), L([cx, cy - (Rmax + 6) * s], [cx, cy + (Rmax + 6) * s], 'centre')],
      vis: radii.filter(visR).map(r => circ([cx, cy], r * s)),
      hid: radii.filter(r => !visR(r)).map(r => circ([cx, cy], r * s, 'hidden')),
      holes: H ? [circ([cx, cy], H.pcd / 2 * s, 'centre'), ...holeAngles.map(a => circ([cx + H.pcd / 2 * s * Math.cos(rad(a)), cy - H.pcd / 2 * s * Math.sin(rad(a))], H.d / 2 * s))] : [],
    });
    // the section on the plane through the axis: the profile above and mirrored below the axis
    const sec = (rx, cy, s) => {
      const top = P.map(([x, r]) => [rx + (x - x0) * s, cy - r * s]), bot = P.map(([x, r]) => [rx + (x - x0) * s, cy + r * s]);
      const holeRects = H ? [-1, 1].map(k => { const ya = cy + k * (H.pcd / 2 - H.d / 2) * s, yb = cy + k * (H.pcd / 2 + H.d / 2) * s; return [[rx + (H.x0 - x0) * s, ya], [rx + (H.x1 - x0) * s, ya], [rx + (H.x1 - x0) * s, yb], [rx + (H.x0 - x0) * s, yb]]; }) : [];
      // edges seen beyond the plane: each circle edge is a vertical line, shown where there is no material on either side of it
      const beyond = [];
      const seenX = new Set();
      P.forEach(([x, r]) => {
        if (r < 1e-6) return;
        const key = x.toFixed(3) + ':' + r.toFixed(3); if (seenX.has(key)) return; seenX.add(key);
        let run = [];
        const flush = () => { if (run.length > 1) beyond.push(L([rx + (x - x0) * s, cy - run[0] * s], [rx + (x - x0) * s, cy - run[run.length - 1] * s])); run = []; };
        // the edge point at height y lies sqrt(r² - y²) behind the plane; the line of sight to it
        // passes radii |y| … r at this x: it is hidden where material lies on both sides of x there
        const seen = y => { for (let rho = Math.abs(y); rho < r - 0.05; rho += 0.25) if (inMat(x - 0.05, rho) && inMat(x + 0.05, rho)) return false; return true; };
        for (let y = -r; y <= r + 1e-9; y += 0.25) { if (seen(y)) run.push(y); else flush(); }
        flush();
      });
      const holeLines = H ? [-1, 1].flatMap(k => [L([rx + (H.x0 - x0) * s, cy + k * (H.pcd / 2 - H.d / 2) * s], [rx + (H.x1 - x0) * s, cy + k * (H.pcd / 2 - H.d / 2) * s]), L([rx + (H.x0 - x0) * s, cy + k * (H.pcd / 2 + H.d / 2) * s], [rx + (H.x1 - x0) * s, cy + k * (H.pcd / 2 + H.d / 2) * s])]) : [];
      return { top, bot, holeRects, beyond, holeLines, hatch: [...AK.hatch([top, ...holeRects.slice(0, 1)], 45, 2.4), ...AK.hatch([bot, ...holeRects.slice(1)], 45, 2.4)] };
    };
    // the given right view (outside, not sectioned): outline plus hidden bore and hole lines
    const outside = (rx, cy, s) => {
      const out = [];
      const outer = [];
      // outer silhouette: for each x, the largest radius of material
      const xsS = [...new Set(xs)].sort((a, b) => a - b);
      xsS.forEach(x => out.push(L([rx + (x - x0) * s, cy - Math.max(...P.filter(p => Math.abs(p[0] - x) < 1e-6).map(p => p[1])) * s], [rx + (x - x0) * s, cy + Math.max(...P.filter(p => Math.abs(p[0] - x) < 1e-6).map(p => p[1])) * s], 'B')));
      void outer;
      P.forEach(([x, r], i) => { const [x2, r2] = P[(i + 1) % P.length]; [-1, 1].forEach(k => out.push(L([rx + (x - x0) * s, cy + k * r * s], [rx + (x2 - x0) * s, cy + k * r2 * s], 'hidden'))); });
      return out;
    };
    const fv = fvParts(FX, CY, 1), gfv = fvParts(GX, GY, GS), S = sec(RX, CY, 1), gS = sec(GRX, GY, GS);
    // given right view: draw the section outline shapes as an outside view with hidden lines for interior
    // hidden lines of the given right view: the profile edges that are not on the outside envelope
    const envR = x => { let m = 0; for (let r = Rmax; r > 0; r -= 0.25) if (inPoly([x, r], P)) { m = r; break; } return m; };
    const onEnv = (p, q) => Math.abs(p[1] - q[1]) < 1e-6 && Math.abs(envR((p[0] + q[0]) / 2) - p[1]) < 0.3;
    const gOut = P.flatMap((p, i) => { const q = P[(i + 1) % P.length]; if (onEnv(p, q) || Math.abs(p[0] - q[0]) < 1e-6) return []; return [-1, 1].map(k => L([GRX + (p[0] - x0) * GS, GY + k * p[1] * GS], [GRX + (q[0] - x0) * GS, GY + k * q[1] * GS], 'hidden')); });
    const silhouette = (() => {   // visible outline of the given right view: the outer envelope
      const xsS = [...new Set(xs)].sort((a, b) => a - b), env = [];
      for (let i = 0; i + 1 < xsS.length; i++) { const xm = (xsS[i] + xsS[i + 1]) / 2; let rmax = 0; for (let r = Rmax; r > 0; r -= 0.25) if (inPoly([xm, r], P)) { rmax = r; break; } env.push([xsS[i], xsS[i + 1], rmax]); }
      const out = [];
      env.forEach(([a, b, r], i) => { [-1, 1].forEach(k => out.push(L([GRX + (a - x0) * GS, GY + k * r * GS], [GRX + (b - x0) * GS, GY + k * r * GS]))); const rp = i ? env[i - 1][2] : 0; out.push(L([GRX + (a - x0) * GS, GY - Math.max(r, rp) * GS], [GRX + (a - x0) * GS, GY + Math.max(r, rp) * GS])); });
      const last = env[env.length - 1]; out.push(L([GRX + (last[1] - x0) * GS, GY - last[2] * GS], [GRX + (last[1] - x0) * GS, GY + last[2] * GS]));
      return out;
    })();
    void outside;
    const cut = (cx, cy, s) => { const t = cy - (Rmax + 8) * s, b = cy + (Rmax + 8) * s; return [L([cx, t], [cx, b], 'centre'), L([cx, t], [cx, t + 4], 'A'), L([cx, b - 4], [cx, b], 'A'),
      L([cx, t], [cx - 6 * s - 2, t], 'B'), pl([[cx - 6 * s - 0.4, t - 1.4], [cx - 6 * s - 2, t], [cx - 6 * s - 0.4, t + 1.4]], 'B'), L([cx, b], [cx - 6 * s - 2, b], 'B'), pl([[cx - 6 * s - 0.4, b - 1.4], [cx - 6 * s - 2, b], [cx - 6 * s - 0.4, b + 1.4]], 'B'),
      lbl([cx + 3, t - 1], 'A', Object.assign({ size: 3.6, anchor: 'start' }, YEL)), lbl([cx + 3, b + 4], 'A', Object.assign({ size: 3.6, anchor: 'start' }, YEL))]; };
    const heights = [...new Set([...radii, ...(H ? [H.pcd / 2 - H.d / 2, H.pcd / 2 + H.d / 2] : [])])];
    const steps = [
      { instruction: 'GIVEN (half size, 3rd angle): the front view of the ' + cfg.name + ' looking along its axis, and the right view, with cutting plane A-A. You redraw the front view full size and draw the SECTIONAL right view on A-A. Start with the centre lines of both views at S.',
        calloutAt: [GX, GY], reveals: [...gfv.cl, ...gfv.vis, ...gfv.hid, ...gfv.holes, ...cut(GX, GY, GS), ...silhouette, ...gOut, L([GRX - 3, GY], [GRX + len * GS + 3, GY], 'centre'),
          lbl([(GX + GRX + len * GS) / 2, GY + Rmax * GS + 16], 'GIVEN / GEGEE (HALF SIZE)', Object.assign({ size: 2.8 }, GREY)),
          ...fv.cl, L([RX - 6, CY], [RX + len + 6, CY], 'centre'), { kind: 'point', at: [FX, CY], label: 'S' }] },
      { instruction: 'FRONT VIEW: draw every circle you can see, from the largest inwards' + (cfg.note ? ' (' + cfg.note + ')' : '') + '.', calloutAt: [FX + Rmax, CY], reveals: fv.vis },
      { instruction: 'Add the circles that are hidden behind the front face as short dashes.', calloutAt: [FX, CY], reveals: fv.hid },
      { instruction: H ? 'The ' + H.n + ' holes (Ø' + H.d + ') on a pitch circle of Ø' + H.pcd + ': draw the pitch circle as a chain line, then the holes on it.' : '', calloutAt: H ? [FX, CY - H.pcd / 2] : [FX, CY], reveals: fv.holes },
      { instruction: 'Draw the cutting plane A-A through the centre: a chain line, thick at the ends, with arrows pointing the way you look to see the section (3rd angle: from the right, so the arrows point left).', calloutAt: [FX, CY - Rmax - 8], reveals: cut(FX, CY, 1) },
      { instruction: 'Project every height across from the front view to the right view with thin lines.', calloutAt: [(FX + Rmax + RX) / 2, CY - Rmax],
        reveals: heights.flatMap(r => [-1, 1].map(k => L([FX, CY + k * r], [RX + len + 4, CY + k * r], 'construction'))) },
      { instruction: 'SECTIONAL RIGHT VIEW: measure the lengths along the axis and draw the outline of the cut face, above and below the centre line.', calloutAt: [RX + len / 2, CY - Rmax / 2], reveals: [poly(S.top), poly(S.bot)] },
      { instruction: H ? 'The cutting plane passes through two of the holes: draw their sides across the flange, and leave them unhatched.' : '', calloutAt: H ? [RX + (H.x0 + H.x1) / 2 - x0, CY - H.pcd / 2] : [RX, CY], reveals: H ? S.holeLines : [] },
      { instruction: 'Draw the edges you see BEYOND the cutting plane: the circles of the bore and the steps appear as straight lines across the open spaces.', calloutAt: [RX, CY], reveals: S.beyond },
      { instruction: 'Hatch the cut faces with thin lines at 45°. It is one part, so all of it is hatched the same way; the holes and the bore stay clear.', calloutAt: [RX + len / 2, CY - Rmax + 3], reveals: S.hatch },
      { instruction: 'Label the views and add the main dimensions.', calloutAt: [RX + len / 2, CY + Rmax + 12],
        reveals: [lbl([FX, CY + Rmax + 22], 'FRONT VIEW / VOORAANSIG', GREY), lbl([RX + len / 2, CY + Rmax + 22], 'SECTION A-A / SNIT A-A', YEL),
          { kind: 'dimension', p1: [FX - Rmax, CY + Rmax + 4], p2: [FX + Rmax, CY + Rmax + 4], offset: 4, text: 'Ø' + (2 * Rmax) },
          { kind: 'dimension', p1: [RX, CY - Rmax - 4], p2: [RX + len, CY - Rmax - 4], offset: -4, text: String(+len.toFixed(1)) }] },
    ];
    C[cfg.id] = { id: cfg.id, title: cfg.title, projection: 'third', summary: cfg.summary, workbookPrompt: cfg.prompt, printLayout: 'full', _turned: P,
      steps: steps.filter(s => s.reveals.length).map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(cfg.id);
  }

  // ═══ Exercises (original parts) ═══
  turned({ id: 'sect-v-pulley', title: 'Sectional View: V-Pulley', name: 'V-pulley',
    // x along the axis (front face at 0), r from the axis: hub Ø36 × 40 with a Ø20 bore, web 8, rim Ø110 × 26 with a V-groove
    profile: [[0, 10], [40, 10], [40, 18], [24, 18], [24, 42], [33, 42], [33, 55], [26, 55], [20, 46], [14, 55], [7, 55], [7, 42], [16, 42], [16, 18], [0, 18]],
    summary: 'A V-pulley given in two views with cutting plane A-A: redraw the front view and draw the sectional right view, hub, web and V-grooved rim cut and hatched, with the bore and the rim edges seen beyond the cut.',
    prompt: 'The front view and right view of a V-pulley are given with cutting plane A-A (3rd angle). Draw full size: the front view and the sectional right view on A-A. Show all hidden circles in the front view and all construction.' });
  turned({ id: 'sect-flanged-boss', title: 'Sectional View: Flanged Boss with Bolt Holes', name: 'flanged boss',
    profile: [[0, 11], [50, 11], [50, 22], [12, 22], [12, 48], [0, 48]],
    holes: { pcd: 76, d: 10, n: 4, x0: 0, x1: 12, a0: 90 },
    note: 'the flange Ø96, the boss Ø44 and the bore Ø22',
    summary: 'A flanged boss with four bolt holes on a pitch circle: the cutting plane passes through two holes, which are left unhatched in the section.',
    prompt: 'The front view and right view of a flanged boss are given with cutting plane A-A (3rd angle). Draw full size: the front view, with the four Ø10 holes on a Ø76 pitch circle, and the sectional right view on A-A.' });
  turned({ id: 'sect-stepped-bush', title: 'Sectional View: Stepped Bush with a Counterbore', name: 'stepped bush',
    profile: [[0, 16], [10, 16], [10, 11], [56, 11], [56, 26], [44, 26], [44, 34], [0, 34]],
    note: 'outside Ø68 and Ø52, bore Ø22 counterbored Ø32 × 10',
    summary: 'A stepped bush with a counterbored bore: in the front view the counterbore and bore show as circles; in the section, the step of the bore shows as a line seen beyond the cut.',
    prompt: 'The front view and right view of a stepped bush are given with cutting plane A-A (3rd angle). Draw full size: the front view and the sectional right view on A-A, showing the counterbore.' });
})(window);
