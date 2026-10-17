// Course Drawings: fourteen exam-style formal tasks, one per topic, built with the chapter builders
// (loaded on this page with DD_BUILDERS_ONLY, so the chapters' own exercises are not built).
// Each drawing has: the chapter it belongs to (for automatic release), a term, and a marking rubric.
// Learners see the task (step 1) and the rubric; teachers see the full step-by-step memo.
(function (global) {
  'use strict';
  const B = global.DDBuild, SK = global.SolidKit, IFV = global.IsoFromViews, AB = global.AssemblyBuilder, AK = global.AssemblyKit;
  const CD = {}, ORDER = [], META = {};
  const L = (p1, p2, lt) => ({ kind: 'line', p1, p2, lineType: lt || 'A' });
  const lbl = (at, text, opts) => Object.assign({ kind: 'label', at, text, size: 3, anchor: 'middle', color: '#94a3b8' }, opts || {});
  const YEL = { color: '#fde047' };
  const poly = (pts, lt) => ({ kind: 'polygon', points: pts, lineType: lt || 'A' });
  const pt = (at, label) => ({ kind: 'point', at, label });
  const grid = (x0, y0, x1, y1, s) => { const o = []; for (let x = x0; x <= x1 + 1e-6; x += s) o.push(L([x, y0], [x, y1], 'C')); for (let y = y0; y <= y1 + 1e-6; y += s) o.push(L([x0, y], [x1, y], 'C')); return o; };

  function add(n, model, meta) {
    if (!model) { console.warn('course drawing ' + n + ' did not build'); return; }
    model.title = 'Course Drawing ' + n + ': ' + model.title.replace(/^(Copy a Figure|Applied|Schedule of Areas|One-Point|Two-Point|From an Isometric|Cam): ?/, '');
    CD[model.id] = model; ORDER.push(model.id); META[model.id] = Object.assign({ n }, meta);
  }

  // 1. Freehand: enlarge a bracket outline 2:1 on a grid (Term 1)
  (function () {
    const shape = [[0, 0], [12, 0], [12, 2], [9, 2], [9, 6], [12, 6], [12, 8], [6, 8], [6, 5], [4, 5], [4, 8], [0, 8], [0, 6], [2, 6], [2, 2], [0, 2]];
    const P = q => [20 + q[0] * 4, 70 - q[1] * 4], Q = q => [95 + q[0] * 8, 150 - q[1] * 8];
    add(1, { id: 'cd-freehand-enlarge', title: 'Freehand Enlargement of a Clamp Plate', projection: 'none', bounds: { w: 220, h: 170 },
      summary: 'A freehand task: enlarge the clamp plate 2:1 by grid, with light blocking-in lines and firm, even final lines.',
      workbookPrompt: 'Enlarge the given clamp plate freehand to twice its size (2:1) on the 8 mm grid. Show light blocking-in; line in with firm, even freehand lines. No instruments.',
      steps: [
        { instruction: 'TASK: the clamp plate is given on a 4 mm grid. Enlarge it FREEHAND to twice its size on the 8 mm grid, starting at S. No instruments.', calloutAt: Q([0, 0]),
          reveals: [...grid(20, 34, 72, 70, 4), poly(shape.map(P)), ...grid(95, 78, 199, 150, 8), pt(Q([0, 0]), 'S'), lbl([46, 80], 'GIVEN (4 mm GRID)', YEL)] },
        { instruction: 'Block in: mark every corner on the 8 mm grid by counting squares from S.', calloutAt: Q([12, 8]), reveals: shape.map(q => pt(Q(q))) },
        { instruction: 'Sketch the outline lightly between the points.', calloutAt: Q([6, 5]), reveals: [poly(shape.map(Q), 'construction')] },
        { instruction: 'Line in with firm, even freehand lines.', calloutAt: Q([12, 0]), reveals: [poly(shape.map(Q))] },
      ] }, { chapter: 'freehand-drawing', term: 1, rubric: [['Blocking-in visible and light', 4], ['Proportions correct (2:1)', 8], ['All corners in the right squares', 6], ['Line quality: even, firm, freehand', 6], ['Neatness', 1]] });
  })();

  // 2–3. Geometrical constructions
  add(2, B.figure({ id: 'cd-con-adjuster', title: 'Adjuster Plate', part: 'adjuster plate',
    bosses: [{ c: [60, 70], r: 18, hole: 16 }, { c: [175, 60], r: 14, hole: 12 }, { c: [200, 140], r: 20, hole: 18 }, { c: [80, 155], r: 14, hole: 10 }],
    links: [{ type: 'arc', R: 110 }, { type: 'line' }, { type: 'enclose', R: 95 }, { type: 'line' }],
    summary: 'A four-boss adjuster plate: a concave arc, two tangent lines and an enclosing arc, each constructed with its centre and tangent points.',
    prompt: 'From A: B is 115 right and 10 up, C is 140 right and 70 down, D is 20 right and 85 down.' }),
    { chapter: 'geometric-constructions', term: 1, rubric: [['Centres located correctly', 6], ['Concave arc: centre and tangent points', 8], ['Tangent lines: construction', 8], ['Enclosing arc: centre and tangent points', 8], ['Holes and boss outlines', 4], ['Line types and neatness', 6]] });
  add(3, B.figure({ id: 'cd-con-rocker', title: 'Double Rocker', part: 'double rocker',
    bosses: [{ c: [55, 110], r: 15, hole: 12 }, { c: [130, 80], r: 24, hole: 22 }, { c: [205, 110], r: 15, hole: 12 }],
    links: [{ type: 'arc', R: 40 }, { type: 'arc', R: 40 }, { type: 'enclose', R: 120 }],
    summary: 'A symmetrical rocker: two R40 concave arcs up to the centre boss and an R120 arc enclosing all three bosses underneath.',
    prompt: 'B is 75 right and 30 up from A; C is 150 right of A, level with it.' }),
    { chapter: 'geometric-constructions', term: 1, rubric: [['Centre lines and bosses', 6], ['Both R40 arcs: centres and tangent points', 12], ['R120 enclosing arc', 10], ['Holes', 3], ['Line types and neatness', 9]] });

  // 4. Isometric from views (Term 2)
  {
    const box = SK.box;
    IFV({ id: 'cd-iso-support', title: 'Isometric of a Support Block',
      summary: 'Exam-style isometric from three views: a base with a step, an upright with a sloping face and a slot.',
      prompt: 'Convert the given 3rd-angle views into an isometric drawing, full size, with S as the lowest corner. Show no hidden detail.',
      parts: [
        { solid: box(0, 0, 0, 90, 50, 14), text: 'The base: 90 × 50 × 14.', at: [45, 0, 7] },
        { solid: SK.extrude([[0, 14], [50, 14], [50, 34], [30, 54], [0, 54]], 'yz', 0, 26), text: 'The upright on the left-hand end: 26 long, profile from the right view with a sloping face from 34 up to 54.', at: [0, 25, 34] },
        { solid: box(26, 0, 14, 90, 18, 26), text: 'The step along the front: 64 long, 18 deep, 12 high, against the upright.', at: [58, 0, 20] },
      ] });
    add(4, global.CONSTRUCTIONS['cd-iso-support'], { chapter: 'isometric-drawing', term: 2, rubric: [['Start point and isometric axes', 4], ['Base correct', 8], ['Upright with sloping face', 12], ['Step', 8], ['No hidden detail; correct line types', 4], ['Neatness', 4]] });
  }

  // 5. Orthographic from an isometric (Term 2)
  add(5, B.fromIso({ id: 'cd-ortho-bracket', title: 'Three Views of a Bracket', name: 'bracket',
    solids: [SK.box(0, 0, 0, 84, 50, 12), SK.box(0, 0, 12, 14, 50, 60), SK.box(56, 15, 12, 84, 35, 40)],
    dims: [[[0, 0, 0], [84, 0, 0], 'negY', 10, 84], [[84, 0, 0], [84, 50, 0], 'negX', 10, 50], [[0, 0, 0], [0, 0, 60], 'negY', 8, 60]],
    summary: 'An exam-style orthographic task: three views in 3rd angle from a dimensioned isometric.',
    prompt: 'The isometric drawing of a bracket is given. Draw, full size in 3rd-angle projection: the front view, top view and right view. Show hidden detail and centre lines.' }),
    { chapter: 'orthographic-projection', term: 2, rubric: [['Front view', 12], ['Top view (above, 3rd angle)', 10], ['Right view', 10], ['Hidden detail', 6], ['Projection lines and alignment', 6], ['Projection symbol and labels', 4], ['Line types and neatness', 2]] });

  // 6–7. Solid geometry (Term 2)
  const reg = B.reg, prism = B.prism, pyramidOn = B.pyramidOn;
  add(6, B.cutSolid({ id: 'cd-solid-cut', title: 'Cut Hexagonal Pyramid', name: 'hexagonal pyramid', kind: 'pyramid', deg: 35, through: [0, 28],
    solids: [pyramidOn(reg(6, 32, 0, 0, 0), 0, 76)],
    summary: 'A hexagonal pyramid cut by a plane at 35°: front view, sectional top and left views and the true shape.',
    prompt: 'A right regular hexagonal pyramid (64 mm across corners, height 76 mm) stands on the HP with two base corners on a line parallel to the VP. Plane A-A, at 35° to the HP, cuts the axis 28 mm above the base. Draw the front view, the sectional top view, the sectional left view and the true shape of the section (1st angle).' }),
    { chapter: 'solid-geometry', term: 2, rubric: [['Top view and front view of the whole solid', 8], ['Cutting plane and cut points', 6], ['Sectional top view and hatching', 8], ['Sectional left view and hatching', 10], ['True shape', 10], ['Line types, labels, neatness', 8]] });
  add(7, B.inclined({ id: 'cd-solid-inclined', title: 'Inclined Hexagonal Prism', name: 'hexagonal prism', base: 'hexagonal end',
    solids0: [prism(reg(6, 24, 0, 0, 0), 64)], axis: [0, 0], tilt: 30, pivot: [24, 0, 0], len: 64,
    summary: 'A hexagonal prism resting on a corner with its axis at 60° to the HP: auxiliary view, front, top and left views.',
    prompt: 'A regular hexagonal prism (48 mm across corners, 64 mm long) rests on one corner of its base on the HP, its axis parallel to the VP and at 60° to the HP. Draw the auxiliary view of the end, the front view, the top view and the left view (1st angle). Show hidden edges.' }),
    { chapter: 'solid-geometry', term: 2, rubric: [['Auxiliary view (true shape of the end)', 8], ['Front view', 10], ['Top view', 12], ['Left view', 12], ['Hidden edges', 4], ['Line types and neatness', 4]] });

  // 8. Descriptive geometry (Term 2)
  add(8, B.lineTL({ id: 'cd-dg-strut', title: 'Roof Strut (1:50)', name: 'strut', scale: 50,
    A: { x: 15, h: 6, v: 55 }, B: { x: 85, h: 52, v: 15 },
    context: 'A steel strut runs from a wall bracket at A (0.3 m up, 2.75 m from the wall) to a roof beam at B (2.6 m up, 0.75 m from the wall). At 1:50 B is 70 mm to the right of A.',
    summary: 'Find the true length of a strut at 1:50, converted to metres, and its true inclinations.' }),
    { chapter: 'descriptive-geometry', term: 2, rubric: [['Front and top views from the data', 6], ['Rotation for the true length and θ', 8], ['Rotation for φ', 6], ['Answers, with TL in metres', 6], ['Neatness and labelling', 4]] });

  // 9. Civil: schedule of areas (Term 3)
  add(9, B.areas({ id: 'cd-civil-areas', title: 'Schedule of Areas: Small House', plan: 'SMALL HOUSE / KLEIN HUIS',
    outline: [[0, 0], [11, 0], [11, 5], [7, 5], [7, 9], [0, 9]], walls: [[4.0, 0.23, 4.11, 4.77], [7.0, 0.23, 7.11, 4.77], [0.23, 4.77, 6.77, 4.88]],
    rooms: [{ name: 'BEDROOM 1', r: [0.23, 0.23, 4.0, 4.77] }, { name: 'BATHROOM', r: [4.11, 0.23, 7.0, 4.77] }, { name: 'BEDROOM 2', r: [7.11, 0.23, 10.77, 4.77] }, { name: 'LIVING', r: [0.23, 4.88, 6.77, 8.77] }],
    split: [[0, 0, 11, 5], [0, 5, 7, 9]], dims: [[[7, 5], [11, 5], 6], [[7, 9], [7, 5], -6]],
    summary: 'A schedule of areas for an L-shaped house: four rooms, the net and gross areas and the perimeter.' }),
    { chapter: 'civil-drawing', term: 3, rubric: [['Each room area (4 × 3)', 12], ['Net floor area', 3], ['Gross area by rectangles', 6], ['Perimeter', 4], ['Schedule neat and complete', 5]] });

  // 10. Civil: detailed section (Term 3)
  add(10, B.detail({ id: 'cd-civil-section', kind: 'window', title: 'Detailed Section through a Window (1:20)',
    summary: 'The detailed section through a window from the footing to the ceiling at 1:20, fully labelled.',
    prompt: 'Using the given partial floor plan, draw to scale 1:20 the detailed section on A-A through the window, from the foundation up to ceiling height. Show all hatching and label NGL, FFL and DPC.' }),
    { chapter: 'civil-drawing-2', term: 3, rubric: [['Footing and foundation wall', 8], ['Floor: hardcore, surface bed, screed, DPC', 8], ['Wall, sills and window', 10], ['Double lintel, wall plate, tie beam, ceiling', 8], ['Hatching (materials)', 6], ['Labels, dimensions, title', 6]] });

  // 11. One-point perspective (Term 4)
  (function () {
    const S = SK, house = S.extrude([[0, 0], [56, 0], [56, 24], [28, 38], [0, 24]], 'xz', 0, 44);
    S.openingAt(house, 0, [10, 0, 0], [19, 0, 21], 2.5);
    S.openingAt(house, 0, [32, 0, 9], [48, 0, 19], 2.5);
    S.openingAt(house, 3, [56, 14, 9], [56, 30, 19], 2.5);
    add(11, B.onePoint({ id: 'cd-persp-one', title: 'House in One-Point Perspective (1:100)',
      summary: 'A gable-ended house on the PP with a door and two windows, in one-point perspective at 1:100.',
      prompt: 'Draw the house in one-point perspective at 1:100 from the given top view and front view. PP, SP, GL and HL are given. Show the wall thickness at the openings.',
      setup: { sx: 128, d: 125, yPP: 70, yGL: 172, h: 18, cx: 48 }, planDepth: 44, solids: [house] }),
      { chapter: 'perspective-drawing', term: 4, rubric: [['Vanishing point and rays from SP', 6], ['Front gable true size on PP', 6], ['Depth by rays and drops', 10], ['Roof and ridge', 6], ['Door and windows with reveals', 8], ['Neatness and line types', 4]] });
  })();

  // 12. Two-point perspective (Gr 11)
  (function () {
    const S = SK, house = S.extrude([[0, 0], [36, 0], [36, 22], [18, 34], [0, 22]], 'yz', 0, 56);
    S.openingAt(house, 0, [0, 9, 9], [0, 27, 19], 2.5);
    const longWall = house.findIndex(f => f.n[1] < -0.9);
    S.openingAt(house, longWall, [10, 0, 0], [19, 0, 21], 2.5);
    S.openingAt(house, longWall, [30, 0, 9], [46, 0, 19], 2.5);
    add(12, B.twoPoint({ id: 'cd-persp-two', title: 'House in Two-Point Perspective (1:100)',
      summary: 'A gable house turned 30° / 60° to the PP, with a door and windows, in two-point perspective.',
      prompt: 'Draw the house in two-point perspective at 1:100. The top view is at 30° / 60° to the PP touching it at the nearest corner; SP and HL are given.',
      setup: { sx: 152, d: 118, yPP: 74, yGL: 176, h: 16, theta: 30 }, solids: [house] }),
      { chapter: 'perspective-drawing-2', term: 4, rubric: [['VPs from SP', 6], ['True-height line', 6], ['Walls by rays and drops', 10], ['Gable and ridge', 8], ['Openings with reveals', 8], ['Neatness', 2]] });
  })();

  // 13. Mechanical assembly (Term 3)
  (function () {
    const D = 16, fk = AB.fork(60, 10, 46, 8, 24, 10, 10, 38);
    const pin = [[0, 0], [0, 13], [6, 13], [6, 8], [90, 8], [90, 0]];
    const bush = [[0, 8], [36, 8], [36, 12], [0, 12]];
    const wheel = [[0, 12], [36, 12], [36, 26], [34, 28], [2, 28], [0, 26]];
    const washer = [[0, 8.5], [3, 8.5], [3, 16], [0, 16]];
    AB.assembly({ into: CD, id: 'cd-mech-castor', title: 'Castor Wheel Assembly',
      summary: 'A castor wheel turning on a bronze bush on a pin through a fork: sectional front view and right view from the parts.',
      prompt: 'The parts of a castor wheel are given. Draw, full size in 3rd-angle projection: the sectional front view on A-A and the right view. Do not section the pin, washer or nut; show three faces of the nut. Add a parts list.',
      story: 'the bush is pressed into the wheel, the wheel sits between the uprights, the pin goes through the left upright, the bush and the right upright, and the washer and nut hold it.',
      ax: 70, by: 150, axisH: 46, rx: 236, cutTop: 92, axisFrom: -10, axisTo: 88, rvHalf: 46,
      body: { name: 'FORK', mat: 'CAST IRON / GIETYSTER', callout: [5, 26], nearX: fk.nearX, section: fk.section, hatch: 45, end: fk.end },
      parts: [
        { name: 'PIN', mat: 'MILD STEEL / SAGTE STAAL', profile: pin, at: -6, sectioned: false, D, thread: [66, 84], note: 'Part 2, the PIN through the fork. Never sectioned.' },
        { name: 'BUSH', mat: 'BRONZE / BRONS', profile: bush, at: 12, sectioned: true, hatch: 135, note: 'Part 3, the BUSH, hatched opposite to the wheel.' },
        { name: 'WHEEL', mat: 'NYLON / NILON', profile: wheel, at: 12, sectioned: true, hatch: 45, note: 'Part 4, the WHEEL round the bush, sectioned, with chamfered edges.' },
        { name: 'WASHER', mat: 'MILD STEEL / SAGTE STAAL', profile: washer, at: 60, sectioned: false, note: 'Part 5, the WASHER, and' },
        { name: 'M16 NUT', mat: 'MILD STEEL / SAGTE STAAL', kind: 'nut', at: 63, D, profile: [[0, 0], [12.8, 0]], note: 'part 6, the M16 NUT (three faces).' },
      ],
      order: [[0], [1], [2], [3, 4]],
      details: [
        { note: 'Part 1, the FORK: uprights 10 thick, 40 apart inside, Ø16 holes 46 above the base, R24 tops.', at: [40, 50], draw: () => AB.forkDetail(fk, 60, 46, 8, 24, 30, 100, 168, '(1) FORK') },
        { note: 'Part 2, the PIN: head Ø26 × 6, shank Ø16 × 84, threaded M16 for the last 24.', at: [40, 128], draw: () => AB.partDetail(2, 'PIN', pin, 16, 122) },
        { note: 'Part 3, the BUSH: Ø16 bore, Ø24 outside, 36 long.', at: [170, 128], draw: () => AB.partDetail(3, 'BUSH', bush, 150, 124, { section: true }) },
        { note: 'Part 4, the WHEEL: Ø56, 36 wide, Ø24 bore, 2 × 2 chamfers.', at: [262, 50], draw: () => AB.partDetail(4, 'WHEEL', wheel, 250, 18, { section: true }) },
        { note: 'Part 5, the WASHER (Ø32 × 3), and part 6, the M16 NUT.', at: [262, 136], draw: () => [...AB.partDetail(5, 'WASHER', washer, 236, 130, { section: true }), ...AK.nutEnd(312, 146, D, {}), lbl([312, 131], '(6) M16 NUT', { size: 3, color: '#fde047' })] },
      ],
      listAt: [16, 172],
    });
    add(13, CD['cd-mech-castor'], { chapter: 'mechanical-assemblies', term: 3, rubric: [['Sectional front view: fork', 8], ['Pin, washer, nut (not sectioned; 3 nut faces)', 10], ['Wheel and bush in section, hatching directions', 10], ['Right view', 10], ['Cutting plane, labels, parts list', 6], ['Line types and neatness', 6]] });
  })();

  // 14. Loci: cam (Gr 11)
  add(14, B.cam({ id: 'cd-loci-cam', title: 'Cam with a Roller Follower', follower: 'roller', roller: 16, base: 22, shaft: 20, dir: 'cw', sc: 10,
    segs: [{ to: 90, lift: 18, law: 'uniform' }, { to: 150 }, { to: 240, lift: 14, law: 'shm' }, { to: 270 }, { to: 360, lift: -32, law: 'uarm' }],
    summary: 'A cam with all three motion laws and a roller follower: displacement graph and cam profile.',
    prompt: 'A cam turning clockwise drives a Ø16 roller follower. Camshaft Ø20; minimum distance 22 mm. 0°–90°: rise 18 mm, uniform; 90°–150°: dwell; 150°–240°: rise 14 mm, SHM; 240°–270°: dwell; 270°–360°: fall 32 mm, UARM. Draw the displacement graph (10 mm = 30°) and the cam profile.' }),
    { chapter: 'loci', term: 4, rubric: [['Graph axes and divisions', 4], ['Uniform rise', 4], ['SHM rise (semicircle)', 6], ['UARM fall (1:3:5)', 6], ['Transfer to the cam', 8], ['Roller positions and profile', 8], ['Neatness, labels', 4]] });

  global.CONSTRUCTIONS = CD;
  global.CONSTRUCTION_ORDER = ORDER;
  global.CD_META = META;
})(window);
