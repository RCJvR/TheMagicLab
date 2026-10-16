// Civil (Gr 10): schedules of areas. A plan at 1:100 with 230 external and 110 internal walls;
// the learner works out each room's floor area from its inside sizes, the net and gross floor
// areas and the outside perimeter, and fills in the schedule one line at a time.
// Runs after civil-more.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 2.6, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const dim = (p1, p2, offset, text) => ({ kind: 'dimension', p1, p2, offset, text });
  const f2 = v => v.toFixed(2);
  const T = 0.23;

  // inward offset of a clockwise (on screen) rectilinear polygon
  function inset(pts, t) {
    const n = pts.length, off = [];
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), nx = -dy / l, ny = dx / l;
      off.push([[a[0] + nx * t, a[1] + ny * t], [b[0] + nx * t, b[1] + ny * t]]);
    }
    return off.map((s, i) => {
      const r = off[(i + n - 1) % n], [p, q] = s, [u, v] = r;
      const d = (p[0] - q[0]) * (u[1] - v[1]) - (p[1] - q[1]) * (u[0] - v[0]);
      const k = ((p[0] - u[0]) * (u[1] - v[1]) - (p[1] - u[1]) * (u[0] - v[0])) / d;
      return [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
    });
  }
  const polyArea = p => Math.abs(p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + a[0] * b[1] - b[0] * a[1]; }, 0)) / 2;
  const polyPer = p => p.reduce((s, a, i) => { const b = p[(i + 1) % p.length]; return s + Math.hypot(b[0] - a[0], b[1] - a[1]); }, 0);

  // cfg: id, title, outline [[x, y] m, clockwise on screen], walls [[x0, y0, x1, y1] internal 110 walls],
  //      rooms [{ name, r: [x0, y0, x1, y1] inside faces }], split [[x0, y0, x1, y1] outside rectangles], summary
  function areas(cfg) {
    const k = 10, X0 = 22, Y0 = 26, P = p => [X0 + p[0] * k, Y0 + p[1] * k];
    const out = cfg.outline, inn = inset(out, T);
    const W = Math.max(...out.map(p => p[0])), D = Math.max(...out.map(p => p[1]));
    const TX = X0 + W * k + 26, rowH = 6.5, colX = [TX, TX + 34, TX + 70, TX + 96];
    const rows = cfg.rooms.length + 3, TY = Y0;
    const rowY = i => TY + rowH * (i + 1);
    const cell = (i, c, text, opts) => lbl([colX[c] + 1.5, rowY(i) + 4.6], text, Object.assign({ anchor: 'start', size: 2.5 }, opts || {}));
    const table = [poly([[colX[0], TY], [colX[3], TY], [colX[3], rowY(rows)], [colX[0], rowY(rows)]]), ...Array.from({ length: rows }, (_, i) => L([colX[0], rowY(i)], [colX[3], rowY(i)], 'B')),
      L([colX[1], TY], [colX[1], rowY(rows)], 'B'), L([colX[2], TY], [colX[2], rowY(rows)], 'B'),
      lbl([colX[0] + 1.5, TY + 4.4], 'ROOM / VERTREK', { anchor: 'start', size: 2.4, color: '#fde047' }), lbl([colX[1] + 1.5, TY + 4.4], 'SIZE / GROOTTE (m)', { anchor: 'start', size: 2.4, color: '#fde047' }), lbl([colX[2] + 1.5, TY + 4.4], 'AREA (m²)', { anchor: 'start', size: 2.4, color: '#fde047' }),
      lbl([(colX[0] + colX[3]) / 2, TY - 4], 'SCHEDULE OF AREAS / SKEDULE VAN OPPERVLAKTES', Object.assign({ size: 2.8 }, YEL))];
    // inside wall faces and internal wall faces, broken where another wall runs into them
    const zones = cfg.walls.map(([x0, y0, x1, y1]) => (x1 - x0) < (y1 - y0) ? [x0, y0 - 0.01, x1, y1 + 0.01] : [x0 - 0.01, y0, x1 + 0.01, y1]);
    const cut = (a, b) => {          // axis-aligned segment a-b minus the inside of every zone
      const hz = Math.abs(a[1] - b[1]) < 1e-9, lo = hz ? Math.min(a[0], b[0]) : Math.min(a[1], b[1]), hi = hz ? Math.max(a[0], b[0]) : Math.max(a[1], b[1]), c = hz ? a[1] : a[0];
      let parts = [[lo, hi]];
      zones.forEach(([x0, y0, x1, y1]) => {
        const [z0, z1, w0, w1] = hz ? [x0, x1, y0, y1] : [y0, y1, x0, x1];
        if (!(c > w0 + 1e-6 && c < w1 - 1e-6)) return;
        parts = parts.flatMap(([u, v]) => [[u, Math.min(v, z0)], [Math.max(u, z1), v]].filter(([p, q]) => q - p > 1e-6));
      });
      return parts.map(([u, v]) => hz ? L(P([u, c]), P([v, c])) : L(P([c, u]), P([c, v])));
    };
    const innerLines = inn.flatMap((p, i) => cut(p, inn[(i + 1) % inn.length]));
    const wallFaces = cfg.walls.flatMap(([x0, y0, x1, y1]) => (x1 - x0) < (y1 - y0) ? [...cut([x0, y0], [x0, y1]), ...cut([x1, y0], [x1, y1])] : [...cut([x0, y0], [x1, y0]), ...cut([x0, y1], [x1, y1])]);
    const given = [poly(out.map(P)), ...innerLines, ...wallFaces,
      ...cfg.rooms.flatMap(r => { const c = [(r.r[0] + r.r[2]) / 2, (r.r[1] + r.r[3]) / 2]; return [lbl([P(c)[0], P(c)[1] - 2], r.name, { size: 2.6 }), lbl([P(c)[0], P(c)[1] + 2.5], f2(r.r[2] - r.r[0]) + ' × ' + f2(r.r[3] - r.r[1]), Object.assign({ size: 2.3 }, GREY))]; }),
      dim(P([0, 0]), P([W, 0]), -8, String(Math.round(W * 1000))), (out.some(p => p[0] === 0 && p[1] === D) ? dim(P([0, D]), P([0, 0]), -8, String(Math.round(D * 1000))) : dim(P([W, 0]), P([W, D]), -8, String(Math.round(D * 1000)))),
      ...(cfg.dims || []).map(([a, b, o]) => dim(P(a), P(b), o, String(Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) * 1000)))),
      lbl([X0 + W * k / 2, Y0 + D * k + 12], cfg.plan + '  SCALE / SKAAL 1:100', Object.assign({ size: 3 }, YEL)), ...table];
    const steps = [{ instruction: 'GIVEN: the plan of the ' + cfg.plan.toLowerCase() + ' at 1:100 (230 external and 110 internal walls). The inside sizes of each room are written in it. Complete the schedule of areas, one line at a time. Areas are in m², to two decimals.',
      calloutAt: [colX[0], TY], reveals: given }];
    let net = 0;
    cfg.rooms.forEach((r, i) => {
      const w = r.r[2] - r.r[0], h = r.r[3] - r.r[1], a = w * h; net += a;
      steps.push({ instruction: r.name + ': area = length × breadth = ' + f2(w) + ' × ' + f2(h) + ' = ' + f2(a) + ' m². Measure INSIDE the walls: floor area does not include the walls.', calloutAt: P([(r.r[0] + r.r[2]) / 2, (r.r[1] + r.r[3]) / 2]),
        reveals: [cell(i, 0, r.name), cell(i, 1, f2(w) + ' × ' + f2(h)), cell(i, 2, f2(a))] });
    });
    const n = cfg.rooms.length, gross = polyArea(out), per = polyPer(out);
    steps.push({ instruction: 'NET FLOOR AREA: the sum of the room areas = ' + f2(net) + ' m².', calloutAt: [colX[2], rowY(n) + 3], reveals: [cell(n, 0, 'NET FLOOR AREA', YEL), cell(n, 2, f2(net), YEL)] });
    const split = (cfg.split || []).map(([x0, y0, x1, y1]) => ({ s: [x0, y0, x1, y1], a: (x1 - x0) * (y1 - y0) }));
    steps.push({ instruction: 'GROSS (BUILDING) AREA: measured to the OUTSIDE of the walls.' + (split.length > 1 ? ' Split the outline into rectangles: ' + split.map(q => f2(q.s[2] - q.s[0]) + ' × ' + f2(q.s[3] - q.s[1])).join(' + ') + ' = ' + f2(gross) + ' m².' : ' ' + f2(W) + ' × ' + f2(D) + ' = ' + f2(gross) + ' m².'),
      calloutAt: P([W / 2, D / 2]), reveals: [...split.slice(1).flatMap(q => [L(P([q.s[0], q.s[1]]), P([q.s[2], q.s[1]]), 'construction'), L(P([q.s[0], q.s[1]]), P([q.s[0], q.s[3]]), 'construction')]),
        cell(n + 1, 0, 'GROSS AREA', YEL), cell(n + 1, 1, 'OUTSIDE'), cell(n + 1, 2, f2(gross), YEL)] });
    steps.push({ instruction: 'PERIMETER: add up the length of every OUTSIDE wall face, going right round the building: ' + out.map((a, i) => f2(Math.hypot(out[(i + 1) % out.length][0] - a[0], out[(i + 1) % out.length][1] - a[1]))).join(' + ') + ' = ' + f2(per) + ' m.',
      calloutAt: P(out[0]), reveals: [cell(n + 2, 0, 'PERIMETER', YEL), cell(n + 2, 1, 'OUTSIDE (m)'), cell(n + 2, 2, f2(per), YEL)] });
    steps.push({ instruction: 'Check: the gross area is always bigger than the net floor area. The difference (' + f2(gross - net) + ' m²) is the area taken up by the walls.', calloutAt: [colX[2], rowY(rows) + 6],
      reveals: [lbl([colX[0], rowY(rows) + 7], 'WALLS / MURE: ' + f2(gross) + ' − ' + f2(net) + ' = ' + f2(gross - net) + ' m²', { anchor: 'start', size: 2.5, color: '#94a3b8' })] });
    C[cfg.id] = { id: cfg.id, title: cfg.title, scale: '1:100', projection: 'none', printLayout: 'full', summary: cfg.summary,
      workbookPrompt: 'From the plan of the ' + cfg.plan.toLowerCase() + ' (scale 1:100), complete a schedule of areas: the floor area of each room, the net floor area, the gross area to the outside of the walls and the outside perimeter.',
      steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(cfg.id);
  }

  // Course Drawings page: export the builder and stop before this chapter's own exercises.
  global.DDBuild = Object.assign(global.DDBuild || {}, { areas: cfg => { areas(cfg); return C[cfg.id]; } });
  if (global.DD_BUILDERS_ONLY) return;

  areas({ id: 'areas-flatlet', title: 'Schedule of Areas: Flatlet', plan: 'FLATLET / WOONSTELLETJIE',
    outline: [[0, 0], [8, 0], [8, 6], [0, 6]], walls: [[3.5, 0.23, 3.61, 5.77]],
    rooms: [{ name: 'BEDROOM', r: [0.23, 0.23, 3.5, 5.77] }, { name: 'LOUNGE', r: [3.61, 0.23, 7.77, 5.77] }], split: [[0, 0, 8, 6]],
    summary: 'A two-room flatlet: room areas from the inside sizes, then the net and gross areas and the perimeter.' });
  areas({ id: 'areas-cottage', title: 'Schedule of Areas: Cottage with a Bathroom', plan: 'COTTAGE / HUISIE',
    outline: [[0, 0], [9, 0], [9, 6.5], [0, 6.5]], walls: [[4.0, 0.23, 4.11, 6.27], [4.11, 3.5, 8.77, 3.61]],
    rooms: [{ name: 'LOUNGE/KITCHEN', r: [0.23, 0.23, 4.0, 6.27] }, { name: 'BEDROOM', r: [4.11, 0.23, 8.77, 3.5] }, { name: 'BATHROOM', r: [4.11, 3.61, 8.77, 6.27] }], split: [[0, 0, 9, 6.5]],
    summary: 'Three rooms in a rectangle: the internal walls are left out of every room area.' });
  areas({ id: 'areas-office-block', title: 'Schedule of Areas: Three Offices', plan: 'OFFICE BLOCK / KANTOORBLOK',
    outline: [[0, 0], [10, 0], [10, 5], [0, 5]], walls: [[3.3, 0.23, 3.41, 4.77], [6.6, 0.23, 6.71, 4.77]],
    rooms: [{ name: 'OFFICE 1', r: [0.23, 0.23, 3.3, 4.77] }, { name: 'OFFICE 2', r: [3.41, 0.23, 6.6, 4.77] }, { name: 'OFFICE 3', r: [6.71, 0.23, 9.77, 4.77] }], split: [[0, 0, 10, 5]],
    summary: 'Three offices side by side: rooms of nearly the same size, but not quite, because of where the walls fall.' });
  areas({ id: 'areas-garage', title: 'Schedule of Areas: Garage and Store', plan: 'GARAGE / MOTORHUIS',
    outline: [[0, 0], [6, 0], [6, 8], [0, 8]], walls: [[0.23, 5.5, 5.77, 5.61]],
    rooms: [{ name: 'GARAGE', r: [0.23, 0.23, 5.77, 5.5] }, { name: 'STORE', r: [0.23, 5.61, 5.77, 7.77] }], split: [[0, 0, 6, 8]],
    summary: 'A garage with a store behind it: one internal wall across the width.' });
  areas({ id: 'areas-l-house', title: 'Schedule of Areas: L-Shaped House', plan: 'L-SHAPED HOUSE / L-VORMIGE HUIS',
    outline: [[0, 0], [10, 0], [10, 4], [5, 4], [5, 8], [0, 8]], walls: [[0.23, 3.77, 4.77, 3.88], [6.0, 0.23, 6.11, 3.77]],
    rooms: [{ name: 'LIVING', r: [0.23, 0.23, 6.0, 3.77] }, { name: 'KITCHEN', r: [6.11, 0.23, 9.77, 3.77] }, { name: 'BEDROOM', r: [0.23, 3.88, 4.77, 7.77] }],
    split: [[0, 0, 10, 4], [0, 4, 5, 8]], dims: [[[5, 4], [10, 4], 6], [[5, 8], [5, 4], -6]],
    summary: 'An L-shaped house: the gross area is found by splitting the outline into two rectangles.' });
  areas({ id: 'areas-l-house-2', title: 'Schedule of Areas: House with a Bedroom Wing', plan: 'HOUSE WITH A WING / HUIS MET \'N VLERK',
    outline: [[0, 0], [9, 0], [9, 9], [5, 9], [5, 5], [0, 5]], walls: [[5.0, 0.23, 5.11, 4.77], [5.23, 4.77, 8.77, 4.88]],
    rooms: [{ name: 'LOUNGE', r: [0.23, 0.23, 5.0, 4.77] }, { name: 'KITCHEN', r: [5.11, 0.23, 8.77, 4.77] }, { name: 'BEDROOM', r: [5.23, 4.88, 8.77, 8.77] }],
    split: [[0, 0, 9, 5], [5, 5, 9, 9]], dims: [[[0, 5], [5, 5], 6], [[9, 9], [5, 9], -6]],
    summary: 'A house with a bedroom wing: two rectangles for the gross area, and six sides for the perimeter.' });
  areas({ id: 'areas-u-house', title: 'Schedule of Areas: U-Shaped House', plan: 'U-SHAPED HOUSE / U-VORMIGE HUIS',
    outline: [[0, 0], [12, 0], [12, 7], [8, 7], [8, 3], [4, 3], [4, 7], [0, 7]], walls: [[3.77, 0.23, 3.88, 2.77], [8.12, 0.23, 8.23, 2.77]],
    rooms: [{ name: 'BEDROOM 1', r: [0.23, 0.23, 3.77, 6.77] }, { name: 'LOUNGE', r: [3.88, 0.23, 8.12, 2.77] }, { name: 'BEDROOM 2', r: [8.23, 0.23, 11.77, 6.77] }],
    split: [[0, 0, 12, 3], [0, 3, 4, 7], [8, 3, 12, 7]], dims: [[[4, 7], [8, 7], 6], [[4, 3], [4, 7], 6]],
    summary: 'A U-shaped house round a courtyard: three rectangles for the gross area, and eight sides for the perimeter, including the courtyard walls.' });
})(window);
