// Civil Drawing (Gr 10): symbol sheets as drawable tables (materials and civil symbols, more
// sanitary fittings in plan and elevation, more electrical symbols, door and window symbols).
// Runs after civil-drawing.data.js.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER;
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'start', color: '#e8eaf2' }, opts || {});
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const circ = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const rect = (x0, y0, x1, y1, lt) => poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], lt);
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const arcPts = (c, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / n) * Math.PI / 180; return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]; });
  // parallel hatching of a rectangle at an angle (degrees), spacing sp
  function hatch(x0, y0, x1, y1, ang, sp, lt) {
    const a = ang * Math.PI / 180, d = [Math.cos(a), -Math.sin(a)], n = [-d[1], d[0]], out = [];
    const cs = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]], ss = cs.map(p => p[0] * n[0] + p[1] * n[1]);
    for (let s = Math.min(...ss) + sp / 2; s < Math.max(...ss); s += sp) {
      const ts = [];
      cs.forEach((p, i) => { const q = cs[(i + 1) % 4], sp0 = p[0] * n[0] + p[1] * n[1], sq = q[0] * n[0] + q[1] * n[1]; if ((sp0 - s) * (sq - s) < 0) { const t = (s - sp0) / (sq - sp0); ts.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); } });
      if (ts.length === 2) out.push(L(ts[0], ts[1], lt || 'B'));
    }
    return out;
  }
  function dots(x0, y0, x1, y1, step, r) { const out = []; let k = 0; for (let y = y0 + step / 2; y < y1; y += step) { for (let x = x0 + step / 2 + (k % 2) * step / 2; x < x1; x += step) out.push(circ([x, y], r || 0.15, 'C')); k++; } return out; }
  function stones(x0, y0, x1, y1) { const out = []; let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; for (let i = 0; i < Math.round((x1 - x0) * (y1 - y0) * 0.09); i++) { const x = x0 + 1 + rnd() * (x1 - x0 - 2), y = y0 + 1 + rnd() * (y1 - y0 - 2); out.push(i % 2 ? poly([[x, y - 0.6], [x + 0.6, y + 0.45], [x - 0.6, y + 0.45]], 'C') : circ([x, y], 0.25, 'C')); } return out; }
  function rubble(x0, y0, x1, y1) { const out = []; for (let x = x0 + 1.2; x < x1 - 1.6; x += 3.2) for (let y = y0 + 1; y < y1 - 1; y += 2.6) { const dx = ((x * 7 + y * 3) % 1.2) - 0.6; out.push(poly([[x + dx, y], [x + 1.1 + dx, y - 0.5], [x + 1.6 + dx, y + 0.5], [x + 0.5 + dx, y + 0.9]], 'C')); } return out; }
  function earthStrokes(x0, y0, x1, y1) { const out = []; for (let y = y0 + 2; y < y1 - 1; y += 3.5) for (let x = x0 + 1 + (y % 2); x < x1 - 3; x += 4.5) out.push(L([x, y + 2], [x + 2, y], 'C'), L([x + 1.2, y + 2], [x + 3.2, y], 'C')); return out; }

  // a table: columns [{ x, title }], rows of { cells: [draw(x, y) | text], ... }, row height rh
  function table(id, title, summary, prompt, cols, rows, opts) {
    const X0 = 8, Y0 = 18, rh = opts.rh || 13, w = opts.w || 200;
    const head = [rect(X0, Y0 - 9, X0 + w, Y0), ...cols.map(c => lbl([c.x + 1.5, Y0 - 3], c.title, Object.assign({ size: 2.7 }, YEL))), ...cols.slice(1).map(c => L([c.x, Y0 - 9], [c.x, Y0]))];
    const steps = [{ instruction: opts.intro, calloutAt: [X0 + 10, Y0 - 4], reveals: head }];
    const groups = opts.groups;
    groups.forEach(g => {
      const rev = [];
      g.rows.forEach(ri => {
        const r = rows[ri], y = Y0 + ri * rh;
        rev.push(rect(X0, y, X0 + w, y + rh, 'C'), ...cols.slice(1).map(c => L([c.x, y], [c.x, y + rh], 'C')));
        r.forEach((cell, ci) => {
          const x = cols[ci].x;
          if (typeof cell === 'function') rev.push(...cell(x + 2, y + 1.5, (cols[ci + 1] ? cols[ci + 1].x : X0 + w) - x - 4, rh - 3));
          else if (cell) { const [en, af] = cell.split(' / '); rev.push(lbl([x + 1.5, y + rh / 2 - (af ? 0.8 : -1)], en, { size: 2.6 })); if (af) rev.push(lbl([x + 1.5, y + rh / 2 + 3.2], af, Object.assign({ size: 2.3 }, GREY))); }
        });
      });
      steps.push({ instruction: g.text, calloutAt: [X0 + 4, Y0 + (g.rows[0] + 0.5) * rh], reveals: rev });
    });
    if (opts.extra) steps.push(...opts.extra(Y0 + rows.length * rh + 10));
    C[id] = { id, title, scale: 'NTS', projection: 'none', summary, workbookPrompt: prompt, printLayout: 'full', steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) };
    ORDER.push(id);
  }

  // ═══ 1. Materials (hatching) and civil symbols ═══
  {
    const sw = (fn) => (x, y, w, h) => [rect(x, y, x + w, y + h, 'B'), ...fn(x, y, x + w, y + h)];
    const rows = [
      ['FACE BRICK / SIERSTEEN', sw((a, b, c, d) => [...hatch(a, b, c, d, 45, 1.4), ...hatch(a, b, c, d, 45, 4.2, 'A').slice(0, 0)])],
      ['COMMON BRICK / GEWONE STEEN', sw((a, b, c, d) => hatch(a, b, c, d, 45, 2.2))],
      ['CONCRETE / BETON', sw(stones)],
      ['SCREED / BLAD', sw((a, b, c, d) => dots(a, b, c, d, 1.4, 0.12))],
      ['PLASTER / PLEISTER', sw((a, b, c, d) => dots(a, b, c, d, 0.9, 0.08))],
      ['COMPACTED HARDCORE FILL / VERDIGTE PUINVULLING', sw(rubble)],
      ['EARTH FILL / GRONDVULLING', sw((a, b, c, d) => [...hatch(a, b, c, d, 45, 3), ...hatch(a, b, c, d, 135, 3)])],
      ['UNDISTURBED EARTH / ONVERSTEURDE GROND', sw(earthStrokes)],
      ['TIMBER / HOUT', sw((a, b, c, d) => [0.25, 0.5, 0.75].map(t => pl(Array.from({ length: 9 }, (_, i) => [a + (c - a) * i / 8, b + (d - b) * t + Math.sin(i * 0.9 + t * 5) * 0.8]), 'C')))],
      ['GLASS (IN SECTION) / GLAS (IN SNIT)', (x, y, w, h) => [L([x, y + h / 2 - 0.6], [x + w, y + h / 2 - 0.6]), L([x, y + h / 2 + 0.6], [x + w, y + h / 2 + 0.6])]],
    ];
    const cols = [{ x: 8, title: 'MATERIAL / MATERIAAL' }, { x: 108, title: 'IN SECTION / IN SNIT' }];
    table('symbols-materials', 'Symbols: Materials in Section', 'The hatching and symbols for building materials cut by a section (SANS 10143 style): bricks, concrete, screed, plaster, fill, earth, timber and glass, in a bilingual table.',
      'Copy the table of building materials and draw the symbol for each material in its box. Use thin lines and neat, even spacing.',
      [...cols, { x: 160, title: '' }].slice(0, 2), rows.map(r => [r[0], r[1]]),
      { w: 150, rh: 12, intro: 'Draw the table: one column for the name of the material, one for its symbol in section.',
        groups: [{ rows: [0, 1], text: 'BRICKWORK: hatched at 45°. Face brick is hatched closer than common brick.' }, { rows: [2, 3, 4], text: 'CONCRETE is shown with small stones (triangles and dots); SCREED with fine dots; PLASTER with very fine dots (in plan, plaster is a thin line and is not hatched).' },
          { rows: [5, 6, 7], text: 'FILLS AND GROUND: compacted hardcore as broken stones; earth fill cross-hatched; undisturbed earth with short sloping strokes.' }, { rows: [8, 9], text: 'TIMBER in section shows its grain; GLASS in section is two close, thin lines.' }],
        extra: (y) => [{ instruction: 'Levels and abbreviations: the FFL symbol (a triangle on the level line) and the abbreviations used on every civil drawing.', calloutAt: [14, y + 6],
          reveals: [L([14, y + 6], [40, y + 6]), poly([[22, y + 6], [19.5, y + 2], [24.5, y + 2]], 'B'), lbl([42, y + 7], 'FFL / VVV  FINISHED FLOOR LEVEL / VOLTOOIDE VLOERVLAK', { size: 2.6 }),
            ...[['NGL / NGV', 'NATURAL GROUND LEVEL / NATUURLIKE GRONDVLAK'], ['DPC / VWL', 'DAMP-PROOF COURSE / VOGWEERLAAG'], ['NTS / NVS', 'NOT TO SCALE / NIE VOLGENS SKAAL'], ['UP / OP', 'ARROW ON A STAIR OR RAMP POINTING UP / PYL OP TRAP OF HELLING']]
              .map(([a, b], i) => lbl([14, y + 14 + i * 5.5], a + '   ' + b, { size: 2.6 }))] }] });
  }

  // ═══ 2. More sanitary fittings: plan and elevation ═══
  {
    const S = 50, u = mm => mm / S;
    const fit = (planFn, elevFn) => [(x, y, w, h) => planFn(x + 2, y), (x, y, w, h) => elevFn(x + 2, y + h)];
    const rows = [
      ['SHOWER (800 × 800) / STORT', ...fit((x, y) => [rect(x, y, x + u(800), y + u(800)), L([x, y], [x + u(800), y + u(800)], 'B'), L([x + u(800), y], [x, y + u(800)], 'B'), circ([x + u(400), y + u(400)], 0.9, 'B')],
        (x, b) => [L([x, b], [x + u(800), b]), rect(x, b - u(100), x + u(800), b), L([x + u(650), b - u(100)], [x + u(650), b - u(1900)], 'B'), circ([x + u(650), b - u(1950)], 1.2, 'B')])],
      ['DOUBLE SINK (1500 × 500) / DUBBELE OPWASBAK', ...fit((x, y) => [rect(x, y, x + u(1500), y + u(500)), rect(x + u(60), y + u(60), x + u(450), y + u(440), 'B'), rect(x + u(510), y + u(60), x + u(900), y + u(440), 'B'), ...Array.from({ length: 5 }, (_, i) => L([x + u(1000) + i * u(100), y + u(80)], [x + u(1000) + i * u(100), y + u(420)], 'C'))],
        (x, b) => [rect(x, b - u(900), x + u(1500), b - u(860)), rect(x + u(60), b - u(860), x + u(900), b - u(700), 'hidden'), L([x, b], [x + u(1500), b], 'B'), L([x + u(30), b - u(860)], [x + u(30), b]), L([x + u(1470), b - u(860)], [x + u(1470), b])])],
      ['BIDET (560 × 380) / BIDET', ...fit((x, y) => [pl(arcPts([x + u(190), y + u(370)], u(190), 0, 180, 12).concat([[x, y], [x + u(380), y], [x + u(380), y + u(370)]])), circ([x + u(190), y + u(120)], 0.7, 'B')],
        (x, b) => [poly([[x, b], [x + u(380), b], [x + u(420), b - u(400)], [x - u(40), b - u(400)]]), L([x + u(190), b - u(400)], [x + u(190), b - u(460)], 'B')])],
      ['WASH TUB (600 × 500) / WASBAK (WASGOED)', ...fit((x, y) => [rect(x, y, x + u(600), y + u(500)), rect(x + u(60), y + u(60), x + u(540), y + u(440), 'B'), circ([x + u(300), y + u(300)], 0.9, 'B')],
        (x, b) => [rect(x, b - u(900), x + u(600), b - u(500)), L([x + u(80), b - u(500)], [x + u(80), b]), L([x + u(520), b - u(500)], [x + u(520), b])])],
      ['URINAL (WALL-MOUNTED) / URINAAL (MUURTIPE)', ...fit((x, y) => [pl([[x, y], [x + u(400), y], [x + u(380), y + u(250)], [x + u(200), y + u(350)], [x + u(20), y + u(250)], [x, y]])],
        (x, b) => [poly([[x, b - u(1100)], [x + u(400), b - u(1100)], [x + u(380), b - u(550)], [x + u(200), b - u(450)], [x + u(20), b - u(550)]]), L([x - 4, b], [x + 14, b], 'B')])],
    ];
    table('symbols-sanitary-2', 'Symbols: More Sanitary Fittings (Plan and Elevation)', 'Five more sanitary fittings at 1:50, each in plan and in elevation: shower, double sink, bidet, wash tub and a wall-mounted urinal.',
      'Copy the table and draw each fitting to scale 1:50 in plan and in elevation. Label each with its name in both languages.',
      [{ x: 8, title: 'FITTING / TOEBEHORE' }, { x: 78, title: 'PLAN / PLAN (1:50)' }, { x: 130, title: 'ELEVATION / AANSIG (1:50)' }],
      rows, { w: 182, rh: 44, intro: 'Draw the table: the name, the plan symbol and the elevation of each fitting. All at 1:50 (20 mm = 1 m).',
        groups: [{ rows: [0], text: 'SHOWER: in plan a square tray with crossed diagonals and the waste; in elevation the tray and the shower rose.' }, { rows: [1], text: 'DOUBLE SINK: two bowls and the drainer grooves in plan; the worktop and the cupboard in elevation.' },
          { rows: [2], text: 'BIDET: rounded at the front in plan, with the tap hole; a low pedestal in elevation.' }, { rows: [3], text: 'WASH TUB: a deep bowl in plan; a tub on legs in elevation.' }, { rows: [4], text: 'URINAL (wall-mounted): its curved bowl in plan and in elevation, fixed on the wall above the floor.' }] });
  }

  // ═══ 3. More electrical symbols, and two-way switching on a plan ═══
  {
    const sw1 = (x, y) => [circ([x, y], 1.4), L([x + 1, y - 1], [x + 5, y - 5]), L([x + 5, y - 5], [x + 6.6, y - 3.4])];
    const rows = [
      ['ONE-WAY SWITCH (THREE POLE) / EENRIGTINGSKAKELAAR (DRIEPOOL)', (x, y, w, h) => { const c = [x + 6, y + h / 2 + 2]; return [...sw1(...c), L([c[0] + 3.6, c[1] - 3.6], [c[0] + 5.2, c[1] - 2]), L([c[0] + 2.4, c[1] - 2.4], [c[0] + 4, c[1] - 0.8])]; }],
      ['TWO-WAY SWITCH / TWEERIGTINGSKAKELAAR', (x, y, w, h) => { const c = [x + 8, y + h / 2]; return [circ(c, 1.4), L([c[0] + 1, c[1] - 1], [c[0] + 5, c[1] - 5]), L([c[0] + 5, c[1] - 5], [c[0] + 6.6, c[1] - 3.4]), L([c[0] - 1, c[1] + 1], [c[0] - 5, c[1] + 5]), L([c[0] - 5, c[1] + 5], [c[0] - 6.6, c[1] + 3.4])]; }],
      ['EARTH / AARDE', (x, y, w, h) => { const c = [x + 8, y + 2]; return [L(c, [c[0], c[1] + 4]), L([c[0] - 4, c[1] + 4], [c[0] + 4, c[1] + 4]), L([c[0] - 2.6, c[1] + 5.6], [c[0] + 2.6, c[1] + 5.6]), L([c[0] - 1.2, c[1] + 7.2], [c[0] + 1.2, c[1] + 7.2])]; }],
      ['ELECTRICITY METER / ELEKTRISITEITSMETER', (x, y, w, h) => [rect(x + 3, y + 1.5, x + 13, y + h - 1.5), lbl([x + 8, y + h / 2 + 1.4], 'W', { anchor: 'middle', size: 3.4 })]],
    ];
    table('symbols-electrical-2', 'Symbols: More Electrical Symbols and Two-Way Switching', 'The remaining electrical symbols (three-pole switch, two-way switch, earth, electricity meter), then a passage with a light switched from both ends using two-way switches.',
      'Copy the table and draw each electrical symbol. Then draw the passage plan and show the light switched from both doors with two-way switches.',
      [{ x: 8, title: 'DESCRIPTION / BESKRYWING' }, { x: 128, title: 'SYMBOL / SIMBOOL' }], rows,
      { w: 158, rh: 12, intro: 'Draw the table: the description in both languages and the symbol.',
        groups: [{ rows: [0, 1], text: 'Switches: three strokes on the switch arm for a three-pole switch; a two-way switch has an arm on each side of the circle.' }, { rows: [2, 3], text: 'EARTH: a vertical stroke on three shortening lines. ELECTRICITY METER: a rectangle marked W (watt-hour).' }],
        extra: (y) => {
          const x0 = 20, x1 = 150, ya = y + 4, yb = y + 26;
          const walls = [rect(x0, ya, x1, ya + 2.4), rect(x0, yb, x1, yb + 2.4)];
          const s1 = [x0 + 8, yb - 3], s2 = [x1 - 8, ya + 5.4], lt = [(x0 + x1) / 2, (ya + yb) / 2 + 1];
          const twoWay = (c, flip) => [circ(c, 1.2), L([c[0] + flip * 0.9, c[1] - 0.9], [c[0] + flip * 4, c[1] - 4]), L([c[0] - flip * 0.9, c[1] + 0.9], [c[0] - flip * 4, c[1] + 4])];
          const k = 2;
          return [{ instruction: 'A passage between two walls. Draw the walls in thick lines.', calloutAt: [x0, ya], reveals: [...walls, lbl([(x0 + x1) / 2, ya - 3], 'PASSAGE / GANG (NTS)', { anchor: 'middle', size: 2.8, color: '#fde047' })] },
            { instruction: 'Draw a two-way switch beside each door and the ceiling light in the middle of the passage.', calloutAt: lt, reveals: [...twoWay(s1, 1), ...twoWay(s2, -1), L([lt[0] - k, lt[1] - k], [lt[0] + k, lt[1] + k]), L([lt[0] - k, lt[1] + k], [lt[0] + k, lt[1] - k])] },
            { instruction: 'Join each switch to the light with a curved broken line: switching from either end turns the same light on or off.', calloutAt: [(s1[0] + lt[0]) / 2, lt[1]],
              reveals: [pl(Array.from({ length: 13 }, (_, i) => { const t = i / 12; return [s1[0] + (lt[0] - s1[0]) * t, s1[1] + (lt[1] - s1[1]) * t - 5 * Math.sin(Math.PI * t)]; }), 'hidden'), pl(Array.from({ length: 13 }, (_, i) => { const t = i / 12; return [s2[0] + (lt[0] - s2[0]) * t, s2[1] + (lt[1] - s2[1]) * t + 5 * Math.sin(Math.PI * t)]; }), 'hidden')] }];
        } });
  }

  // ═══ 4. Doors and windows ═══
  {
    const doorPlan = (kind) => (x, y, w, h) => {
      const b = y + h - 1, wl = 2.4, o0 = x + 6, o1 = x + 20, out = [rect(x, b, o0, b + wl), rect(o1, b, x + w, b + wl)];
      if (kind === 'single') out.push(rect(o0, b - 13, o0 + 0.8, b), pl(arcPts([o0, b], 14, -90, 0, 10), 'C'));
      if (kind === 'double') out.push(rect(o0, b - 7, o0 + 0.8, b), rect(o1 - 0.8, b - 7, o1, b), pl(arcPts([o0, b], 7, -90, 0, 8), 'C'), pl(arcPts([o1, b], 7, 180, 270, 8), 'C'));
      if (kind === 'sliding') out.push(L([o0, b + 0.6], [o0 + 8, b + 0.6]), L([o0 + 6, b + 1.8], [o1, b + 1.8]), pl([[o0 + 4, b - 3], [o0 + 10, b - 3]], 'B'), pl([[o0 + 8, b - 4.2], [o0 + 10, b - 3], [o0 + 8, b - 1.8]], 'B'));
      if (kind === 'folding') { const n = 4, s = (o1 - o0) / n; out.push(pl(Array.from({ length: n + 1 }, (_, i) => [o0 + i * s * 0.6, b - (i % 2 ? 4 : 0)]))); }
      if (kind === 'arch') out.push(L([o0, b], [o1, b], 'hidden'), L([o0, b + wl], [o1, b + wl], 'hidden'));
      return out;
    };
    const winElev = (kind) => (x, y, w, h) => {
      const x0 = x + 4, x1 = x + 28, y0 = y + 1, y1 = y + h - 1, out = [rect(x0, y0, x1, y1), rect(x0 + 1, y0 + 1, x1 - 1, y1 - 1, 'B')];
      if (kind === 'side') out.push(L([x1 - 1, y0 + 1], [x0 + 1, (y0 + y1) / 2], 'hidden'), L([x0 + 1, (y0 + y1) / 2], [x1 - 1, y1 - 1], 'hidden'));
      if (kind === 'top') out.push(L([x0 + 1, y1 - 1], [(x0 + x1) / 2, y0 + 1], 'hidden'), L([(x0 + x1) / 2, y0 + 1], [x1 - 1, y1 - 1], 'hidden'));
      if (kind === 'bottom') out.push(L([x0 + 1, y0 + 1], [(x0 + x1) / 2, y1 - 1], 'hidden'), L([(x0 + x1) / 2, y1 - 1], [x1 - 1, y0 + 1], 'hidden'));
      return out;
    };
    const rows = [
      ['SINGLE DOOR (SWING) / ENKELDEUR', doorPlan('single')], ['DOUBLE DOORS / DUBBELDEURE', doorPlan('double')], ['SLIDING DOOR / SKUIFDEUR', doorPlan('sliding')], ['FOLDING DOOR / VOUDEUR', doorPlan('folding')], ['ARCHWAY (NO DOOR) / BOOGINGANG', doorPlan('arch')],
      ['FIXED PANE / VASTE RUIT', winElev('fixed')], ['SIDE-HUNG CASEMENT / SYHANGRAAM', winElev('side')], ['TOP-HUNG VENT / BOHANGRAAM', winElev('top')], ['BOTTOM-HUNG HOPPER / ONDERHANGRAAM', winElev('bottom')],
    ];
    table('symbols-doors-windows', 'Symbols: Doors (Plan) and Windows (Elevation)', 'Door types as they appear on a floor plan (swing, double, sliding, folding, archway) and window types as they appear in elevation, where broken lines point to the hinged side.',
      'Copy the table and draw the plan symbol of each door type and the elevation of each window type.',
      [{ x: 8, title: 'TYPE / TIPE' }, { x: 108, title: 'SYMBOL / SIMBOOL' }], rows,
      { w: 150, rh: 16, intro: 'Draw the table: the type in both languages and its symbol. Doors are shown in plan, windows in elevation.',
        groups: [{ rows: [0, 1], text: 'Swing doors in plan: the leaf open at 90° and a thin arc for the swing. Double doors have a leaf and a swing on each side.' }, { rows: [2, 3, 4], text: 'A sliding door: the panels side by side with an arrow; a folding door: a zig-zag of panels; an archway: an opening with broken lines across it and no door.' },
          { rows: [5, 6], text: 'Windows in elevation: a fixed pane has no lines; an opening casement has broken lines meeting at the HINGED side.' }, { rows: [7, 8], text: 'A top-hung vent opens outwards from the top: the lines meet at the top. A bottom-hung hopper: the lines meet at the bottom.' }] });
  }
})(window);
