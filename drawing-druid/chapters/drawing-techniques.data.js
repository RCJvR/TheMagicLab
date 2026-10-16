// Drawing Techniques (Gr 10): the instrument skills every later chapter relies on — SANS 10111 line
// types, lettering, set-square angles, the drawing sheet, copying figures to scale, dimensioning and
// hatching. Original exercises in small steps. Requires engine.js.
(function (global) {
  'use strict';
  const C = {}, ORDER = [];
  const TOOL = global.ConstructionEngine.tools;   // ruler / set-square overlays (screen only, current step only)
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#e8eaf2' }, opts || {});
  const YEL = { color: '#fde047' }, GREY = { color: '#94a3b8' };
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const pl = (pts, lt) => ({ kind: 'polyline', points: pts, lineType: lt || 'A' });
  const circ = (c, r, lt) => ({ kind: 'circle', center: c, r, lineType: lt || 'A' });
  const pt = (at, label) => ({ kind: 'point', at, label });
  const dim = (p1, p2, offset, text) => ({ kind: 'dimension', p1, p2, offset, text });
  const arcA = (c, r, a0, a1, lt) => ({ kind: 'arc-construction', center: c, r, startDeg: a0, endDeg: a1, lineType: lt || 'A' });
  const rad = d => d * Math.PI / 180;
  const at = (o, r, deg) => [o[0] + r * Math.cos(rad(deg)), o[1] - r * Math.sin(rad(deg))];   // angle measured anticlockwise on the paper
  const cross = (c, e) => [L([c[0] - e, c[1]], [c[0] + e, c[1]], 'centre'), L([c[0], c[1] - e], [c[0], c[1] + e], 'centre')];
  function hatchBox(x0, y0, x1, y1, sp, dir) {
    const a = Math.min(x0, x1), b = Math.min(y0, y1), w = Math.abs(x1 - x0), h = Math.abs(y1 - y0), out = [];
    for (let k = -h; k <= w + 0.01; k += sp) {
      const lo = Math.max(0, -k), hi = Math.min(h, w - k);
      if (hi <= lo) continue;
      out.push(dir < 0 ? L([a + lo + k, b + lo], [a + hi + k, b + hi], 'B') : L([a + lo + k, b + h - lo], [a + hi + k, b + h - hi], 'B'));
    }
    return out;
  }
  // rounded rectangle outline (thick), corners R
  function roundRect(x0, y0, x1, y1, R) {
    return [L([x0 + R, y0], [x1 - R, y0]), L([x1, y0 + R], [x1, y1 - R]), L([x1 - R, y1], [x0 + R, y1]), L([x0, y1 - R], [x0, y0 + R]),
      arcA([x1 - R, y0 + R], R, -90, 0), arcA([x1 - R, y1 - R], R, 0, 90), arcA([x0 + R, y1 - R], R, 90, 180), arcA([x0 + R, y0 + R], R, 180, 270)];
  }
  function add(id, title, summary, prompt, steps, extra) {
    C[id] = Object.assign({ id, title, summary, workbookPrompt: prompt, bounds: { w: 200, h: 180 }, steps: steps.map((s, i) => Object.assign({ id: i + 1 }, s)) }, extra || {});
    ORDER.push(id);
  }

  // ═══ 1. Line types ═══
  (function () {
    const x0 = 70, x1 = 185, row = i => 22 + i * 21;
    const name = (i, t, d) => [lbl([10, row(i) - 2], t, { anchor: 'start', size: 3, color: '#fde047' }), lbl([10, row(i) + 3.5], d, { anchor: 'start', size: 2.3, color: '#94a3b8' })];
    const wave = y => pl(Array.from({ length: 25 }, (_, k) => [x0 + k * (x1 - x0) / 24, y + (k % 2 ? 1.6 : -1.2) * Math.sin(k)]), 'B');
    add('line-types', 'Line Types (SANS 10111)',
      'Every line on an engineering drawing has a meaning given by its type and thickness: the seven line types you will use in every chapter.',
      'Draw each SANS 10111 line type 115 mm long and name it: type A (visible outline), type B (dimensions, hatching, leaders), type C (construction), centre line, hidden detail, cutting plane and a freehand break line.',
      [
        { instruction: 'TYPE A — thick continuous line (about 0.5–0.7 mm): visible outlines and edges.', calloutAt: [x1, row(0)], reveals: [TOOL.ruler([x0, row(0)], [x1, row(0)], { side: -1, tail: 5 }), ...name(0, 'TYPE A', 'VISIBLE OUTLINES'), L([x0, row(0)], [x1, row(0)], 'A')] },
        { instruction: 'TYPE B — thin continuous line (about 0.35 mm): dimension lines, extension lines, leaders and hatching.', calloutAt: [x1, row(1)], reveals: [...name(1, 'TYPE B', 'DIMENSIONS, HATCHING, LEADERS'), L([x0, row(1)], [x1, row(1)], 'B')] },
        { instruction: 'TYPE C — very thin, light line: construction and guidelines. It should hardly show on the finished drawing.', calloutAt: [x1, row(2)], reveals: [...name(2, 'TYPE C', 'CONSTRUCTION, GUIDELINES'), L([x0, row(2)], [x1, row(2)], 'C')] },
        { instruction: 'CENTRE LINE — thin chain line (long dash, short dash): axes of holes, cylinders and symmetrical parts.', calloutAt: [x1, row(3)], reveals: [...name(3, 'CENTRE LINE', 'AXES, LINES OF SYMMETRY'), L([x0, row(3)], [x1, row(3)], 'centre')] },
        { instruction: 'HIDDEN DETAIL — short dashes: edges that cannot be seen from the direction of viewing.', calloutAt: [x1, row(4)], reveals: [...name(4, 'HIDDEN DETAIL', 'EDGES OUT OF SIGHT'), L([x0, row(4)], [x1, row(4)], 'hidden')] },
        { instruction: 'CUTTING PLANE — thin chain line, thick at the ends and where it changes direction, with arrows showing the direction of viewing.', calloutAt: [x1, row(5)],
          reveals: [...name(5, 'CUTTING PLANE', 'WHERE A SECTION IS TAKEN'), L([x0, row(5)], [x1, row(5)], 'centre'), L([x0, row(5)], [x0 + 8, row(5)]), L([x1 - 8, row(5)], [x1, row(5)]),
            L([x0, row(5)], [x0, row(5) - 6], 'B'), pl([[x0 - 1.3, row(5) - 3.5], [x0, row(5) - 6], [x0 + 1.3, row(5) - 3.5]], 'B'), L([x1, row(5)], [x1, row(5) - 6], 'B'), pl([[x1 - 1.3, row(5) - 3.5], [x1, row(5) - 6], [x1 + 1.3, row(5) - 3.5]], 'B'),
            lbl([x0 - 4, row(5) - 6], 'A', Object.assign({ size: 3 }, YEL)), lbl([x1 + 4, row(5) - 6], 'A', Object.assign({ size: 3 }, YEL))] },
        { instruction: 'BREAK LINE — thin freehand wavy line: where part of a long object is left out.', calloutAt: [x1, row(6)], reveals: [...name(6, 'BREAK LINE', 'PART LEFT OUT (FREEHAND)'), wave(row(6))] },
      ], { bounds: { w: 200, h: 165 } });
  })();

  // ═══ 2. Lettering ═══
  (function () {
    const X = 15, W = 175;
    const guides = (y, h) => [L([X, y], [X + W, y], 'C'), L([X, y - h], [X + W, y - h], 'C')];
    const row = (y, h, text) => lbl([X + 1, y], text, { anchor: 'start', size: h * 1.25, color: '#e8eaf2' });
    add('lettering', 'Lettering: Guidelines and Single-Stroke Capitals',
      'All writing on a drawing is upright single-stroke capitals between thin guidelines: 5 mm for titles, 3.5 mm for notes and dimensions, evenly spaced.',
      'Draw guidelines and letter the alphabet and numerals in 5 mm and 3.5 mm single-stroke capitals, then a title and a note.',
      [
        { instruction: 'Draw pairs of type C guidelines 5 mm apart, with 5 mm gaps between the pairs.', calloutAt: [X, 30], reveals: [20, 35, 50].flatMap(y => guides(y, 5)) },
        { instruction: 'Letter A to M in 5 mm upright capitals. Each letter touches both guidelines; leave equal space between letters.', calloutAt: [X + 60, 20], reveals: [row(20, 5, 'A B C D E F G H I J K L M')] },
        { instruction: 'Letter N to Z the same way.', calloutAt: [X + 60, 35], reveals: [row(35, 5, 'N O P Q R S T U V W X Y Z')] },
        { instruction: 'Numerals 0 to 9, also 5 mm high. Numerals on dimensions are never smaller than 3.5 mm.', calloutAt: [X + 40, 50], reveals: [row(50, 5, '0 1 2 3 4 5 6 7 8 9')] },
        { instruction: 'Draw 3.5 mm guidelines and letter a note in 3.5 mm capitals.', calloutAt: [X + 60, 75], reveals: [...guides(75, 3.5), ...guides(85, 3.5), row(75, 3.5, 'ALL DIMENSIONS IN MILLIMETRES.'), row(85, 3.5, 'REMOVE ALL SHARP EDGES.')] },
        { instruction: 'A drawing title: 7 mm capitals, the space between words about one letter wide.', calloutAt: [X + 60, 110], reveals: [...guides(110, 7), row(110, 7, 'BEARING BRACKET')] },
      ], { bounds: { w: 200, h: 125 } });
  })();

  // ═══ 3. Set-square angles ═══
  (function () {
    const O = [100, 140], R = 80, end = d => at(O, R, d), tag = (d, c) => lbl(at(O, R + 7, d), d + '°', { size: 2.6, color: c || '#e8eaf2' });
    const ln = d => L(O, end(d), 'A');
    add('set-square-angles', 'Angles with the Set Squares',
      'With the 45° and the 30°/60° set squares on the T-square or ruler, every multiple of 15° can be drawn — alone or by combining the two squares.',
      'From point O on a horizontal line, draw lines at every 15° from 15° to 165° using only the set squares. Label each angle.',
      [
        { instruction: 'Draw the base line and mark O. Draw the 90° line with either set square standing on the ruler.', calloutAt: O, reveals: [{ kind: 'tool', tool: 'set-square', deg: 45, use: 'leg', at: O, angle: 0, size: 45 }, TOOL.ruler([15, 140], [185, 140], { side: -1 }), L([15, 140], [185, 140]), pt(O, 'O'), ln(90), tag(90, '#fde047')] },
        { instruction: '45° set square: 45° and 135°.', calloutAt: end(45), reveals: [...TOOL.squareOn(O, end(45), { deg: 45, size: 48, ruler: false }), ...TOOL.squareOn(O, end(135), { deg: 45, size: 48, flip: true, ruler: false }), TOOL.ruler([15, 140], [185, 140], { side: -1 }), ln(45), ln(135), tag(45), tag(135)] },
        { instruction: '30°/60° set square: 30°, 60°, 120° and 150°.', calloutAt: end(60), reveals: [...TOOL.squareOn(O, end(60), { deg: 60, size: 32, ruler: false }), ...TOOL.squareOn(O, end(150), { deg: 30, size: 62, flip: true, ruler: false }), TOOL.ruler([15, 140], [185, 140], { side: -1 }), ...[30, 60, 120, 150].flatMap(d => [ln(d), tag(d)])] },
        { instruction: 'Combine both squares: 45° + 30° = 75°, 60° + 45° = 105°, 45° − 30° = 15° and 180° − 15° = 165°.', calloutAt: end(75), reveals: [...TOOL.squareOn(O, end(45), { deg: 45, size: 70, ruler: false }), ...TOOL.squareOn(O, end(75), { deg: 30, size: 52, ruler: false }), TOOL.ruler([15, 140], [185, 140], { side: -1 }), ...[15, 75, 105, 165].flatMap(d => [ln(d), tag(d, '#fde047')])] },
        { instruction: 'Check: the lines are 15° apart all round. Add a thin arc through their ends.', calloutAt: end(120), reveals: [arcA(O, R - 10, 180, 360, 'C')] },
      ], { bounds: { w: 200, h: 155 } });
  })();

  // ═══ 4. The drawing sheet ═══
  (function () {
    const s = 0.5, W = 420 * s, H = 297 * s, X = 0, Y = 0, b = 10 * s;   // A3 at 1:2
    const tb = { x0: X + b, x1: X + W - b, y1: Y + H - b, h: 20 * s };
    const cols = [0, 30, 110, 260, 380, 400].map(v => tb.x0 + v * s);
    add('drawing-sheet', 'The Drawing Sheet: Border and Title Block',
      'An A3 sheet (420 × 297) with a 10 mm border and a title strip across the bottom, the layout used for every worksheet. Drawn here at 1:2.',
      'Draw, to scale 1:2, an A3 landscape sheet with a 10 mm border and a 20 mm title strip along the bottom, divided for: logo, name and grade, subject, topic and date, sheet number. Letter it.',
      [
        { instruction: 'The paper: 420 × 297 (A3 landscape), drawn at 1:2 so it is 210 × 148.5 here. Type C line.', calloutAt: [W / 2, Y], reveals: [poly([[X, Y], [X + W, Y], [X + W, Y + H], [X, Y + H]], 'C')] },
        { instruction: 'The border: 10 mm in from every edge, type A.', calloutAt: [X + b, Y + b], reveals: [poly([[X + b, Y + b], [X + W - b, Y + b], [X + W - b, Y + H - b], [X + b, Y + H - b]])] },
        { instruction: 'The title strip: a line 20 mm above the bottom border, right across.', calloutAt: [W / 2, tb.y1 - tb.h], reveals: [L([tb.x0, tb.y1 - tb.h], [tb.x1, tb.y1 - tb.h])] },
        { instruction: 'Divide the strip into its boxes (30, 80, 150, 120 and 20 mm wide at full size).', calloutAt: [cols[3], tb.y1 - tb.h / 2], reveals: cols.slice(1, 5).map(x => L([x, tb.y1 - tb.h], [x, tb.y1], 'B')) },
        { instruction: 'Letter the boxes: NAME / GRADE, the subject, TOPIC / DATE and the sheet number.', calloutAt: [cols[2], tb.y1 - tb.h / 2],
          reveals: [lbl([(cols[0] + cols[1]) / 2, tb.y1 - 4], 'LOGO', Object.assign({ size: 2 }, GREY)), lbl([cols[1] + 2, tb.y1 - 6.5], 'NAME:', { anchor: 'start', size: 2 }), lbl([cols[1] + 2, tb.y1 - 2], 'GRADE:', { anchor: 'start', size: 2 }),
            lbl([(cols[2] + cols[3]) / 2, tb.y1 - 4], 'ENGINEERING GRAPHICS & DESIGN', { size: 2.6 }), lbl([cols[3] + 2, tb.y1 - 6.5], 'TOPIC:', { anchor: 'start', size: 2 }), lbl([cols[3] + 2, tb.y1 - 2], 'DATE:', { anchor: 'start', size: 2 }),
            lbl([(cols[4] + cols[5]) / 2, tb.y1 - 3.5], '1', Object.assign({ size: 3.6 }, YEL))] },
        { instruction: 'Sheet layout rule: keep every drawing inside the border and above the title strip, and centre the views in the space.', calloutAt: [W / 2, H / 2],
          reveals: [lbl([W / 2, H / 2 - 6], 'DRAWING SPACE', Object.assign({ size: 4 }, GREY)), lbl([W / 2, H / 2 + 3], 'A3 SHEET  —  SCALE 1:2', Object.assign({ size: 2.6 }, GREY))] },
      ], { bounds: { w: 215, h: 152 }, scale: '1:2' });
  })();

  // ═══ 5–8. Patterns with the set squares and compass ═══
  (function () {
    const O = [100, 92], R = 60;
    const P = d => at(O, R, d);
    add('pattern-hexagram', 'Set-Square Pattern: Six-Pointed Star',
      'Two equilateral triangles in a circle, drawn with the 30°/60° set square: the star outlines a regular hexagon in the middle.',
      'Copy the star pattern to scale 1:1 in a circle of radius 60, using only the 30°/60° set square and ruler.',
      [
        { instruction: 'Draw the centre lines and a construction circle of radius 60.', calloutAt: O, reveals: [...cross(O, R + 6), circ(O, R, 'C')] },
        { instruction: 'Mark the six points where the 60° set square lines through O cut the circle (every 60°, starting at the top).', calloutAt: P(90), reveals: [...TOOL.squareOn(P(210), P(30), { deg: 30, size: 60 }), ...[30, 90, 150].map(d => L(P(d), P(d + 180), 'C')), ...[90, 150, 210, 270, 330, 30].map(d => pt(P(d)))] },
        { instruction: 'Join every second point: the upright triangle (sides at 60° and horizontal).', calloutAt: P(210), reveals: [...TOOL.squareOn(P(210), P(90), { deg: 60, size: 40 }), poly([P(90), P(210), P(330)])] },
        { instruction: 'Join the other three points: the inverted triangle.', calloutAt: P(270), reveals: [poly([P(270), P(30), P(150)])] },
        { instruction: 'Draw the circle in type A to finish the pattern.', calloutAt: P(0), reveals: [circ(O, R)] },
      ]);
    const Q = (d, r) => at(O, r || R, d);
    add('pattern-octagram', 'Set-Square Pattern: Eight-Pointed Star',
      'A square and the same square turned 45°, drawn with the 45° set square: their overlap is a regular octagon.',
      'Copy the eight-pointed star to scale 1:1 (squares 84 mm, on the same centre), using the 45° set square, and outline the octagon where they overlap.',
      [
        { instruction: 'Centre lines and a construction circle of radius 60.', calloutAt: O, reveals: [...cross(O, R + 6), circ(O, R, 'C')] },
        { instruction: 'The first square: corners where the 45° lines through O cut the circle. Its sides are vertical and horizontal.', calloutAt: Q(45), reveals: [poly([45, 135, 225, 315].map(d => Q(d)))] },
        { instruction: 'The second square: corners on the centre lines, sides at 45°.', calloutAt: Q(90), reveals: [...TOOL.squareOn(Q(180), Q(90), { deg: 45, size: 50 }), poly([0, 90, 180, 270].map(d => Q(d)))] },
        { instruction: 'Where the two squares overlap they outline a regular octagon. Finish with a circle of radius 12 at the centre.', calloutAt: O, reveals: [circ(O, 12)] },
      ]);
    // tumbling blocks: each block is a hexagon (corner up) split into three rhombi, like a cube seen in isometric
    const s = 30, step = 2 * s * Math.cos(rad(30));
    const blocks = [[100 - step, 95], [100, 95], [100 + step, 95]].map(c => ({ c, hex: [90, 150, 210, 270, 330, 30].map(d => at(c, s, d)) }));
    const yLines = b => [L(b.c, at(b.c, s, 270)), L(b.c, at(b.c, s, 30)), L(b.c, at(b.c, s, 150))];
    add('pattern-cubes', 'Set-Square Pattern: Isometric Cubes',
      'Three blocks that read as cubes, drawn only with vertical lines and 30° lines: exactly the lines used for every isometric drawing.',
      'Copy the three-cube pattern to scale 1:1 (cube edges 30 mm), using the 30°/60° set square. Show only the edges.',
      [
        { instruction: 'Mark the centre of the middle block and draw a construction circle of radius 30 round it.', calloutAt: blocks[1].c, reveals: [pt(blocks[1].c), circ(blocks[1].c, s, 'C')] },
        { instruction: 'Draw the hexagon in the circle: two vertical sides and four sides at 30° (corners at the top and bottom).', calloutAt: blocks[1].hex[0], reveals: [...TOOL.squareOn(blocks[1].hex[3], blocks[1].hex[4], { deg: 30, size: 40 }), poly(blocks[1].hex)] },
        { instruction: 'From the centre draw three edges: straight down, and up at 30° to the left and right. The hexagon now reads as a cube.', calloutAt: blocks[1].c, reveals: yLines(blocks[1]) },
        { instruction: 'Draw the same block on each side, sharing a vertical side with the middle one (centres 52 apart).', calloutAt: blocks[2].c, reveals: [poly(blocks[0].hex), poly(blocks[2].hex), ...yLines(blocks[0]), ...yLines(blocks[2])] },
      ], { bounds: { w: 200, h: 160 } });
    // chevron border with the 30/60 set square
    const n = 6, w = 26;
    const band = yy => pl(Array.from({ length: 2 * n + 1 }, (_, k) => [25 + k * w / 2, yy - (k % 2) * (w / 2) * Math.tan(rad(60))]), 'A');
    add('pattern-chevron', 'Set-Square Pattern: Chevron Border',
      'A border of zig-zags drawn with the 60° set square, the equal steps marked off along a base line.',
      'Copy the chevron border to scale 1:1: three zig-zag bands with 60° sides, 26 mm pitch, between two parallel border lines.',
      [
        { instruction: 'Draw two parallel border lines 85 apart, and mark 13 mm steps along the bottom line.', calloutAt: [25, 140], reveals: [L([20, 140], [185, 140]), L([20, 55], [185, 55]), ...Array.from({ length: 2 * n + 1 }, (_, k) => pt([25 + k * w / 2, 140]))] },
        { instruction: 'From each step draw a 60° line up and to the right, and one up and to the left, to meet: the first zig-zag band.', calloutAt: [25 + w / 2, 140 - 22], reveals: [...TOOL.squareOn([25, 140], [25 + w / 2, 140 - (w / 2) * Math.tan(rad(60))], { deg: 60, size: 22 }), band(140)] },
        { instruction: 'Repeat the band 25 higher, and again 25 higher still.', calloutAt: [25 + w / 2, 115 - 22], reveals: [band(115), band(90)] },
        { instruction: 'Join the bands at the ends with vertical lines to close the border.', calloutAt: [25, 115], reveals: [L([25, 140], [25, 90]), L([25 + n * w, 140], [25 + n * w, 90])] },
      ], { bounds: { w: 200, h: 155 } });
  })();

  // ═══ 9–12. Copy a machine part to scale 1:1 and add three dimensions ═══
  function part(id, title, summary, prompt, build, missing) {
    const g = build();
    add(id, title, summary, prompt, [
      { instruction: 'Draw the centre lines of the part and of every hole.', calloutAt: g.c, reveals: g.centres },
      { instruction: 'Draw the straight edges of the outline (type A).', calloutAt: g.c, reveals: g.edges },
      { instruction: 'Draw the arcs and rounded corners, joining the straight edges smoothly.', calloutAt: g.c, reveals: g.arcs },
      { instruction: 'Draw the holes.', calloutAt: g.c, reveals: g.holes },
      { instruction: 'The given dimensions (type B lines, 3.5 mm figures).', calloutAt: g.c, reveals: g.dims },
      { instruction: 'Now add the THREE missing dimensions: ' + missing + '. Measure them on your drawing.', calloutAt: g.c, reveals: g.missing },
    ]);
  }
  part('copy-gasket', 'Copy a Part: Gasket', 'A flange gasket: rounded corners, a central bore and four bolt holes. Copy it and add three missing dimensions.',
    'Copy the gasket to scale 1:1 (120 × 70 with R10 corners, Ø40 bore, four Ø10 holes at 100 × 50 centres). Add the dimensions for the overall length, the corner radius and the bore.',
    () => {
      const c = [100, 90], x0 = 40, x1 = 160, y0 = 55, y1 = 125, R = 10, hs = [[50, 25], [-50, 25], [-50, -25], [50, -25]].map(([dx, dy]) => [c[0] + dx, c[1] + dy]);
      const rr = roundRect(x0, y0, x1, y1, R);
      return { c, centres: [...cross(c, 66), ...hs.flatMap(h => cross(h, 8))], edges: rr.slice(0, 4), arcs: rr.slice(4), holes: [circ(c, 20), ...hs.map(h => circ(h, 5))],
        dims: [dim([hs[1][0], y1], [hs[0][0], y1], 10, '100'), dim([x1, hs[2][1]], [x1, hs[1][1]], 10, '50'), dim([x0, y1], [x0, y0], 10, '70'), lbl([hs[2][0] - 9, hs[2][1] - 9], '4 × Ø10', { size: 2.5 })],
        missing: [dim([x0, y0], [x1, y0], -10, '120'), lbl([x1 + 6, y0 - 4], 'R10', Object.assign({ size: 2.8, anchor: 'start' }, YEL)), L([x1 - 3, y0 + 3], [x1 + 5, y0 - 3], 'B'), lbl([c[0] + 22, c[1] - 18], 'Ø40', Object.assign({ size: 2.8, anchor: 'start' }, YEL)), L([c[0] + 14, c[1] - 14], [c[0] + 21, c[1] - 17], 'B')] };
    }, 'the overall length 120, the corner radius R10 and the bore Ø40');
  part('copy-slotted-bracket', 'Copy a Part: Slotted Plate', 'A plate with a round-ended slot and two holes. Copy it and add three missing dimensions.',
    'Copy the slotted plate to scale 1:1 (140 × 60, slot 50 long and 12 wide on the centre line, two Ø12 holes 110 apart). Add the slot length, the hole centres and the plate height.',
    () => {
      const c = [100, 90], x0 = 30, x1 = 170, y0 = 60, y1 = 120, sL = 50, sw = 6;
      const s0 = [c[0] - sL / 2 + sw, c[1]], s1 = [c[0] + sL / 2 - sw, c[1]], hs = [[c[0] - 55, c[1]], [c[0] + 55, c[1]]];
      return { c, centres: [L([x0 - 6, c[1]], [x1 + 6, c[1]], 'centre'), L([c[0], y0 - 6], [c[0], y1 + 6], 'centre'), ...hs.map(h => L([h[0], y0 - 4], [h[0], y1 + 4], 'centre')), L([s0[0], c[1] - 10], [s0[0], c[1] + 10], 'centre'), L([s1[0], c[1] - 10], [s1[0], c[1] + 10], 'centre')],
        edges: [poly([[x0, y0], [x1, y0], [x1, y1], [x0, y1]]), L([s0[0], c[1] - sw], [s1[0], c[1] - sw]), L([s0[0], c[1] + sw], [s1[0], c[1] + sw])],
        arcs: [arcA(s0, sw, 90, 270), arcA(s1, sw, -90, 90)], holes: hs.map(h => circ(h, 6)),
        dims: [dim([x0, y1], [x1, y1], 10, '140'), dim([s0[0], c[1] + sw], [s1[0], c[1] + sw], 8, '38'), lbl([hs[1][0] + 2, hs[1][1] - 10], '2 × Ø12', { size: 2.5 }), lbl([s1[0] + 10, c[1] - 9], 'SLOT 12 WIDE', { size: 2.3, anchor: 'start' })],
        missing: [dim([s0[0] - sw, y0], [s1[0] + sw, y0], -8, '50'), dim([hs[0][0], y0], [hs[1][0], y0], -16, '110'), dim([x1, y1], [x1, y0], 10, '60')] };
    }, 'the slot length 50, the hole centres 110 and the plate height 60');
  part('copy-hex-spacer', 'Copy a Part: Hexagonal Spacer Plate', 'A hexagonal plate with a bore and six holes on a pitch circle. Copy it and add three missing dimensions.',
    'Copy the spacer plate to scale 1:1 (a regular hexagon 80 across flats, Ø30 bore, six Ø6 holes equally spaced on a Ø60 pitch circle). Add the across-flats size, the pitch circle diameter and the bore.',
    () => {
      const c = [100, 92], af = 80, Rh = af / 2 / Math.cos(rad(30)), hex = Array.from({ length: 6 }, (_, i) => at(c, Rh, i * 60)), hs = Array.from({ length: 6 }, (_, i) => at(c, 30, 30 + i * 60));
      return { c, centres: [...cross(c, Rh + 6), circ(c, 30, 'centre'), ...hs.flatMap(h => cross(h, 5))], edges: [poly(hex)], arcs: [], holes: [circ(c, 15), ...hs.map(h => circ(h, 3))],
        dims: [lbl([hs[0][0] + 6, hs[0][1] - 5], '6 × Ø6', { size: 2.5, anchor: 'start' }), lbl([c[0], c[1] + Rh + 14], 'REGULAR HEXAGON', Object.assign({ size: 2.3 }, GREY))],
        missing: [dim(hex[5], hex[1], 32, '80 A/F'), lbl([c[0] - 34, c[1] - 26], 'PCD Ø60', Object.assign({ size: 2.6, anchor: 'end' }, YEL)), L([c[0] - 33, c[1] - 26], at(c, 30, 140), 'B'), lbl([c[0] + 4, c[1] - 4], 'Ø30', Object.assign({ size: 2.6, anchor: 'start' }, YEL))] };
    }, 'the size across the flats 80, the pitch circle diameter Ø60 and the bore Ø30');
  part('copy-stepped-link', 'Copy a Part: Stepped Link', 'A link with a stepped body and a round end. Copy it and add three missing dimensions.',
    'Copy the stepped link to scale 1:1 (body 100 long, 50 high stepping down to 30 high after 40, round end R20 with a Ø16 hole). Add the overall length to the centre of the round end, the radius and the step height.',
    () => {
      const y = 115, x0 = 40, sx = 80, ex = 140, c = [ex, y - 20];
      return { c: [95, 95], centres: [...cross(c, 26), L([x0 - 5, y - 20], [ex + 26, y - 20], 'centre')],
        edges: [pl([[ex, y], [x0, y], [x0, y - 50], [sx, y - 50], [sx, y - 40], [ex, y - 40]])], arcs: [arcA(c, 20, -90, 90)], holes: [circ(c, 8)],
        dims: [dim([x0, y], [sx, y], 10, '40'), dim([x0, y], [x0, y - 50], 10, '50'), lbl([c[0] + 12, c[1] - 14], 'Ø16', { size: 2.5, anchor: 'start' })],
        missing: [dim([x0, y - 50], [ex, y - 50], -12, '100'), lbl([c[0] + 24, c[1] + 14], 'R20', Object.assign({ size: 2.8, anchor: 'start' }, YEL)), L([c[0] + 14, c[1] + 14], [c[0] + 23, c[1] + 15], 'B'), dim([ex, y], [ex, y - 40], -10, '40')] };
    }, 'the length 100 to the centre of the round end, the radius R20 and the height 40 of the narrow part');

  // ═══ 13. Scale ═══
  (function () {
    const plate = (ox, oy, k) => { const w = 60 * k, h = 40 * k; return { box: [[ox, oy], [ox + w, oy], [ox + w, oy - h], [ox, oy - h]], hole: [ox + 40 * k, oy - 20 * k], r: 8 * k, w, h }; };
    const A = plate(15, 120, 1), B = plate(90, 120, 0.5), T = plate(130, 140, 2);
    add('scale-drawing', 'Drawing to Scale: 1:1, 1:2 and 2:1',
      'The same plate drawn full size, half size and twice full size. The figures on the dimensions are always the TRUE sizes, whatever the scale.',
      'A plate 60 × 40 has a Ø16 hole 40 from the left and 20 up. Draw it at 1:1, at 1:2 and at 2:1, and dimension each with the true sizes.',
      [
        { instruction: 'SCALE 1:1 (full size): draw the plate 60 × 40 and the Ø16 hole.', calloutAt: A.box[0], reveals: [TOOL.ruler(A.box[0], A.box[1], { side: -1, tail: 10 }), poly(A.box), circ(A.hole, A.r), ...cross(A.hole, A.r + 4)] },
        { instruction: 'Dimension it: 60, 40 and Ø16.', calloutAt: A.box[0], reveals: [dim(A.box[0], A.box[1], 8, '60'), dim(A.box[0], A.box[3], -8, '40'), lbl([A.hole[0] + 10, A.hole[1] - 10], 'Ø16', { size: 2.5, anchor: 'start' }), lbl([A.box[0][0] + 30, 140], 'SCALE 1:1', YEL)] },
        { instruction: 'SCALE 1:2 (half size): every size is divided by 2, so draw 30 × 20 with a Ø8 hole. The dimensions still read 60, 40 and Ø16.', calloutAt: B.box[0],
          reveals: [poly(B.box), circ(B.hole, B.r), ...cross(B.hole, B.r + 3), dim(B.box[0], B.box[1], 8, '60'), dim(B.box[0], B.box[3], -6, '40'), lbl([B.box[0][0] + 15, 140], 'SCALE 1:2', YEL)] },
        { instruction: 'SCALE 2:1 (twice full size): every size is multiplied by 2: 120 × 80 with a Ø32 hole. The dimensions still read the true sizes.', calloutAt: [140, 100],
          reveals: [poly(T.box), circ(T.hole, T.r), ...cross(T.hole, T.r + 4), dim(T.box[0], T.box[1], 8, '60'), dim(T.box[1], T.box[2], 8, '40'), lbl([T.hole[0] + 18, T.hole[1] - 18], 'Ø16', { size: 2.6, anchor: 'start' }), lbl([T.box[0][0] + 60, 160], 'SCALE 2:1', YEL)] },
      ], { bounds: { w: 260, h: 170 } });
  })();

  // ═══ 14–15. Dimensioning: chain and parallel ═══
  function dimPlate(id, title, summary, prompt, mode) {
    const x0 = 25, y0 = 110, xs = [20, 55, 95, 130], L0 = 160, H = 45;
    const holes = xs.map(x => [x0 + x, y0 - H / 2]);
    const outline = [poly([[x0, y0], [x0 + L0, y0], [x0 + L0, y0 - H], [x0, y0 - H]]), ...holes.map(h => circ(h, 5)), ...holes.flatMap(h => cross(h, 8))];
    const chain = [[0, xs[0]], [xs[0], xs[1]], [xs[1], xs[2]], [xs[2], xs[3]]].map(([a, b]) => dim([x0 + a, y0], [x0 + b, y0], 10, String(b - a)));
    const datum = xs.map((x, i) => dim([x0, y0], [x0 + x, y0], 10 + 8 * i, String(x)));
    add(id, title, summary, prompt, [
      { instruction: 'Draw the plate (160 × 45) and the four Ø10 holes with their centre lines.', calloutAt: [x0, y0], reveals: outline },
      ...(mode === 'chain'
        ? [{ instruction: 'CHAIN dimensioning: one dimension follows the next, end to end, along a single line below the plate.', calloutAt: [x0 + 40, y0 + 10], reveals: chain },
           { instruction: 'Add the overall length on a line further out, and the height and hole size. (Leave one chain dimension out if the overall size is given, so nothing is dimensioned twice.)', calloutAt: [x0 + 80, y0 + 20],
             reveals: [dim([x0, y0], [x0 + L0, y0], 20, '160'), dim([x0 + L0, y0], [x0 + L0, y0 - H], 10, '45'), lbl([holes[3][0] + 6, holes[3][1] - 8], '4 × Ø10', { size: 2.5, anchor: 'start' })] }]
        : [{ instruction: 'PARALLEL (datum) dimensioning: every hole is measured from the same datum, the left-hand edge, on stacked lines 8 apart. Errors do not add up.', calloutAt: [x0, y0 + 20], reveals: [L([x0, y0 + 2], [x0, y0 + 46], 'B'), ...datum] },
           { instruction: 'Add the overall length on the outermost line, and the height and hole size.', calloutAt: [x0 + 80, y0 + 44], reveals: [dim([x0, y0], [x0 + L0, y0], 42, '160'), dim([x0 + L0, y0], [x0 + L0, y0 - H], 10, '45'), lbl([holes[3][0] + 6, holes[3][1] - 8], '4 × Ø10', { size: 2.5, anchor: 'start' })] }]),
      { instruction: 'Check the dimensioning rules: figures 3.5 mm high, read from the bottom or the right, dimension lines 8–10 from the outline, small gaps at the extension lines.', calloutAt: [x0 + 80, y0 - H - 10], reveals: [lbl([x0 + 80, y0 - H - 12], mode === 'chain' ? 'CHAIN DIMENSIONING' : 'PARALLEL (DATUM) DIMENSIONING', YEL)] },
    ], { bounds: { w: 200, h: mode === 'chain' ? 150 : 170 } });
  }
  dimPlate('dim-chain', 'Dimensioning: Chain Dimensions', 'Hole positions dimensioned end to end along one line.', 'Draw the plate with four holes and dimension the hole positions by chain dimensioning. Add the overall size, height and hole size.', 'chain');
  dimPlate('dim-parallel', 'Dimensioning: Parallel (Datum) Dimensions', 'Hole positions all measured from one datum edge, on stacked dimension lines.', 'Draw the same plate and dimension the hole positions from the left-hand edge as a datum (parallel dimensioning). Add the overall size, height and hole size.', 'datum');

  // ═══ 16. Dimensioning circles, arcs and angles ═══
  (function () {
    const c = [70, 95], R = 30, c2 = [150, 95];
    add('dim-circles', 'Dimensioning Circles, Arcs and Angles',
      'Diameters get Ø across the circle or on a leader; radii get R on a leader from the centre; angles get an arc with the figure in degrees.',
      'Draw a Ø60 circle, a Ø10 hole, an R25 arc and a 60° chamfer corner, and dimension each correctly.',
      [
        { instruction: 'Draw a Ø60 circle with centre lines.', calloutAt: c, reveals: [circ(c, R), ...cross(c, R + 6)] },
        { instruction: 'A LARGE circle: a dimension line across it through the centre, arrows on the circle, figure Ø60.', calloutAt: at(c, R, 45), reveals: [{ kind: 'dimension', p1: at(c, R, 225), p2: at(c, R, 45), offset: 0, text: 'Ø60' }] },
        { instruction: 'A SMALL hole (Ø10): too small for a line inside, so use a leader from outside pointing at the centre, with the figure on a short horizontal shoulder.', calloutAt: [c[0] + 50, 135],
          reveals: [circ([c[0] + 40, 140], 5), ...cross([c[0] + 40, 140], 8), L(at([c[0] + 40, 140], 5, 45), [c[0] + 52, 128], 'B'), L([c[0] + 52, 128], [c[0] + 60, 128], 'B'), lbl([c[0] + 61, 129], 'Ø10', { size: 2.6, anchor: 'start' })] },
        { instruction: 'An ARC (R25): a leader from the centre side, arrow on the arc, figure R25. Only arcs get R; full circles always get Ø.', calloutAt: [c2[0], c2[1] - 25],
          reveals: [arcA(c2, 25, 180, 360), ...cross(c2, 6), L([c2[0] - 25, c2[1]], [c2[0] - 25, c2[1] + 15]), L([c2[0] + 25, c2[1]], [c2[0] + 25, c2[1] + 15]), L([c2[0] - 25, c2[1] + 15], [c2[0] + 25, c2[1] + 15]),
            L(c2, at(c2, 25, 60), 'B'), lbl(at(c2, 31, 60), 'R25', { size: 2.6, anchor: 'start' })] },
        { instruction: 'An ANGLE: an arc drawn from the corner, arrows on both lines, figure in degrees.', calloutAt: [40, 40],
          reveals: [L([20, 50], [80, 50]), L([20, 50], at([20, 50], 50, 60)), { kind: 'angle-arc', vertex: [20, 50], p1: at([20, 50], 40, 60), p2: [60, 50], radius: 22, text: '60°' }] },
      ]);
  })();

  // ═══ 17. Hatching ═══
  (function () {
    const y0 = 70, y1 = 130;
    const parts = [[20, 70], [70, 130], [130, 180]];
    add('hatching', 'Section Hatching',
      'Cut surfaces are hatched with thin type B lines at 45°, about 3 mm apart. Parts that touch are hatched in opposite directions; one part keeps the same hatching in every view.',
      'Three plates are clamped together and cut. Draw the section and hatch each plate correctly: 45°, about 3 mm apart, neighbouring plates in opposite directions.',
      [
        { instruction: 'Draw the three plates side by side in section (type A outlines).', calloutAt: [100, y0], reveals: parts.map(([a, b]) => poly([[a, y0], [b, y0], [b, y1], [a, y1]])) },
        { instruction: 'Hatch the left plate at 45° (lines rising to the right), about 3 mm apart, type B.', calloutAt: [45, 100], reveals: hatchBox(parts[0][0], y0, parts[0][1], y1, 3, 1) },
        { instruction: 'Hatch the middle plate in the OPPOSITE direction, because it touches the left plate.', calloutAt: [100, 100], reveals: hatchBox(parts[1][0], y0, parts[1][1], y1, 3, -1) },
        { instruction: 'The right plate touches the middle one: 45° the first way again, but with wider spacing (about 5 mm) so it still looks different from the left plate.', calloutAt: [155, 100], reveals: hatchBox(parts[2][0], y0, parts[2][1], y1, 5, 1) },
        { instruction: 'Label the parts and the section.', calloutAt: [100, y1 + 12], reveals: [lbl([45, y0 - 6], 'PLATE 1', { size: 2.6 }), lbl([100, y0 - 6], 'PLATE 2', { size: 2.6 }), lbl([155, y0 - 6], 'PLATE 3', { size: 2.6 }), lbl([100, y1 + 12], 'SECTION A-A', YEL)] },
      ], { bounds: { w: 200, h: 150 } });
  })();

  const PRACTICE_QUESTIONS = [
    { text: 'Which line type is used for the visible outline of an object?', options: ['Type A: thick continuous', 'Type B: thin continuous', 'A chain line', 'Short dashes'], answer: 0,
      explanation: 'Visible outlines and edges are type A, the thick continuous line. Thin type B lines are for dimensions, hatching and leaders.' },
    { text: 'What does a line of short dashes show?', options: ['Hidden detail', 'A centre line', 'A construction line', 'A break in the part'], answer: 0,
      explanation: 'Short dashes show edges that are hidden from the direction of viewing.' },
    { text: 'Which two set squares together give a 75° line?', options: ['45° and 30°', '60° and 60°', '45° and 45°', '30° and 30°'], answer: 0,
      explanation: '45° + 30° = 75°. Combining the two set squares gives every multiple of 15°.' },
    { text: 'A part 80 mm long is drawn at scale 1:2. How long is it on the paper, and what figure goes on the dimension?', options: ['40 mm on paper; the dimension reads 80', '40 mm on paper; the dimension reads 40', '160 mm on paper; the dimension reads 80', '80 mm on paper; the dimension reads 40'], answer: 0,
      explanation: 'At 1:2 everything is half size on paper, but dimensions always state the TRUE size.' },
    { text: 'How should two parts that touch be hatched in a section?', options: ['At 45° in opposite directions', 'Both the same way', 'One hatched, one left clear', 'With dashed lines'], answer: 0,
      explanation: 'Neighbouring parts are hatched in opposite directions (or with clearly different spacing) so you can tell them apart.' },
    { text: 'When do you use R and when Ø?', options: ['R for arcs, Ø for full circles', 'R for small circles, Ø for large ones', 'Either, they mean the same', 'Ø for arcs, R for holes'], answer: 0,
      explanation: 'A full circle is dimensioned by its diameter (Ø); an arc by its radius (R).' },
  ];

  global.CONSTRUCTIONS = C;
  global.CONSTRUCTION_ORDER = ORDER;
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
