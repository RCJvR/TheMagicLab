// Perspective Drawing — Grade 10: one-point perspective by the plan (measured) method.
// Requires engine-geometry.js and perspective-kit.js loaded first.
(function (global) {
  'use strict';
  const K = global.PerspectiveKit;
  const CONSTRUCTIONS = {};

  const lbl = (at, text, anchor, size) => ({ kind: 'label', at, text, size: size || 3.4, anchor: anchor || 'middle', color: '#94a3b8' });

  // The front elevation drawn standing on GL to the left, with its heights projected across
  // to the true-height line (the front face, which lies on the picture plane).
  function elevation(P, ex, profile, label) {
    const pts = profile.map(([u, z]) => [ex + u, P.yGL - z]);
    return [
      { kind: 'polygon', points: pts, lineType: 'A' },
      lbl([ex + (Math.max(...profile.map(p => p[0])) / 2), P.yGL + 6], label || 'FRONT VIEW / VOORAANSIG'),
    ];
  }
  function heightProjectors(P, ex, heights, toX) {
    return heights.map(z => ({ kind: 'line', p1: [ex, P.yGL - z], p2: [toX, P.yGL - z], lineType: 'construction' }));
  }
  const frontOnly = edges => edges.filter(([p, q]) => p[1] === 0 && q[1] === 0);
  const notFront = edges => edges.filter(([p, q]) => !(p[1] === 0 && q[1] === 0));

  // ── 1. Setting up one-point perspective: a rectangular block ──
  (function () {
    const W = 50, D = 40, H = 30;
    const P = K.setup({ sx: 125, d: 120, yPP: 62, yGL: 150, h: 48, theta: 0, cx: 45 });
    const faces = K.extrude([[0, 0], [W, 0], [W, H], [0, H]], 'uz', 0, D);
    const edges = K.visibleEdges(P, faces);
    const EX = -30;
    const VP = P.vps.VP;
    const backPts = [[0, D], [W, D]];

    CONSTRUCTIONS['one-point-setup'] = {
      id: 'one-point-setup', title: 'One-Point Perspective: Setting Up (Block)',
      summary: 'The full one-point set-up: the top view on the picture plane, the station point, ground line, horizon line and vanishing point, then the block found by visual rays and lines to the VP.',
      bounds: { w: 230, h: 200 },
      workbookPrompt: 'Draw the block (50 x 40 x 30) in one-point perspective. The front face lies on the picture plane. SP is 120 mm in front of PP and 80 mm to the right of the block\'s left edge; the eye is 48 mm above GL.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the picture-plane line PP. Draw the TOP VIEW above it with its front edge ON the PP. In one-point perspective the front face is parallel to the picture plane, so it will appear at its true shape and size.',
          calloutAt: P.plan(W / 2, D / 2),
          reveals: [
            { kind: 'line', p1: [EX - 26, P.yPP], p2: [P.sx + 40, P.yPP], lineType: 'B' },
            lbl([EX - 28, P.yPP - 1], 'PP', 'end', 3.6), lbl([EX - 28, P.yPP + 5.5], 'PV', 'end', 3.6),
            { kind: 'polygon', points: [P.plan(0, 0), P.plan(W, 0), P.plan(W, D), P.plan(0, D)], lineType: 'A' },
            lbl([P.plan(W / 2, D)[0], P.plan(W / 2, D)[1] - 4], 'TOP VIEW / BO-AANSIG'),
          ],
        },
        {
          id: 2,
          instruction: 'Mark the station point SP (the eye) in front of the PP. Draw the ground line GL and the horizon line HL at eye height above it. The single vanishing point VP lies on the HL directly above SP.',
          calloutAt: VP,
          reveals: [
            ...K.spMark(P),
            { kind: 'line', p1: [EX - 26, P.yGL], p2: [P.sx + 40, P.yGL], lineType: 'B' }, lbl([EX - 28, P.yGL + 1.3], 'GL', 'end', 3.6),
            { kind: 'line', p1: [EX - 26, P.yHL], p2: [P.sx + 40, P.yHL], lineType: 'B' }, lbl([EX - 28, P.yHL + 1.3], 'HL', 'end', 3.6),
            { kind: 'line', p1: P.SP, p2: VP, lineType: 'construction' },
            { kind: 'point', at: VP, label: 'VP', size: 1.3 },
          ],
        },
        {
          id: 3,
          instruction: 'Draw the FRONT VIEW standing on GL at the side and project its heights across. Because the front face lies on the PP, its width comes straight down from the top view and its heights are true: draw it full size.',
          calloutAt: P.persp(W / 2, 0, H / 2),
          reveals: [
            ...elevation(P, EX, [[0, 0], [W, 0], [W, H], [0, H]]),
            ...heightProjectors(P, EX + W, [H], P.persp(0, 0, H)[0]),
            { kind: 'line', p1: P.plan(0, 0), p2: P.persp(0, 0, 0), lineType: 'construction' },
            { kind: 'line', p1: P.plan(W, 0), p2: P.persp(W, 0, 0), lineType: 'construction' },
            ...K.perspLines(P, frontOnly(edges), 'A'),
          ],
        },
        {
          id: 4,
          instruction: 'Draw visual rays from SP to the two back corners of the top view. Where each ray crosses the PP, drop a vertical line down into the drawing.',
          calloutAt: P.onPP(W, D),
          reveals: [
            ...K.rays(P, backPts),
            ...backPts.map(([u, v]) => ({ kind: 'point', at: P.onPP(u, v), size: 0.9 })),
            ...K.drops(P, [[0, D, H], [W, D, 0]]),
          ],
        },
        {
          id: 5,
          instruction: 'Join the corners of the front face to the VP. Where these lines cut the dropped verticals are the back corners. Draw the visible edges with Type A lines; the hidden back edges are left out.',
          calloutAt: P.persp(W, D / 2, H),
          reveals: [
            ...[[0, H], [W, H], [W, 0]].map(([u, z]) => ({ kind: 'line', p1: P.persp(u, 0, z), p2: VP, lineType: 'construction' })),
            ...K.perspLines(P, notFront(edges), 'A'),
          ],
        },
      ],
    };
  })();

  // ── 2. Stepped block ──
  (function () {
    const W = 56, D = 36;
    const prof = [[0, 0], [W, 0], [W, 16], [28, 16], [28, 36], [0, 36]];
    const P = K.setup({ sx: 130, d: 125, yPP: 60, yGL: 152, h: 55, theta: 0, cx: 40 });
    const faces = K.extrude(prof, 'uz', 0, D);
    const edges = K.visibleEdges(P, faces);
    const EX = -36;
    const VP = P.vps.VP;
    const corners = [[28, D], [W, D], [0, D]];

    CONSTRUCTIONS['one-point-stepped-block'] = {
      id: 'one-point-stepped-block', title: 'One-Point Perspective: Stepped Block',
      summary: 'A block with a step: the front face is true shape on the PP, and every receding edge runs to the one VP and stops where its visual ray says.',
      bounds: { w: 230, h: 200 },
      workbookPrompt: 'Draw the stepped block in one-point perspective from the given top view and front view. The front face lies on PP; SP is 125 mm in front of PP; the eye is 55 mm above GL.',
      steps: [
        {
          id: 1,
          instruction: 'Set up as before: top view with its front edge on PP, SP below, GL, and HL at eye height with the VP above SP. Draw the front view on GL at the side.',
          calloutAt: VP,
          reveals: [
            ...K.frame(P, EX - 26, P.sx + 40),
            { kind: 'polygon', points: [P.plan(0, 0), P.plan(W, 0), P.plan(W, D), P.plan(0, D)], lineType: 'A' },
            { kind: 'line', p1: P.plan(28, 0), p2: P.plan(28, D), lineType: 'A' },
            lbl([P.plan(W / 2, D)[0], P.plan(W / 2, D)[1] - 4], 'TOP VIEW / BO-AANSIG'),
            ...K.spMark(P),
            { kind: 'line', p1: P.SP, p2: VP, lineType: 'construction' },
            { kind: 'point', at: VP, label: 'VP', size: 1.3 },
            ...elevation(P, EX, prof),
          ],
        },
        {
          id: 2,
          instruction: 'The front face is on the PP, so draw it at true size: widths straight down from the top view, heights projected across from the front view.',
          calloutAt: P.persp(14, 0, 18),
          reveals: [
            ...heightProjectors(P, EX + W, [16, 36], P.persp(0, 0, 0)[0]),
            ...[0, 28, W].map(u => ({ kind: 'line', p1: P.plan(u, 0), p2: P.persp(u, 0, 0), lineType: 'construction' })),
            ...K.perspLines(P, frontOnly(edges), 'A'),
          ],
        },
        {
          id: 3,
          instruction: 'Visual rays from SP to the back corners of the top view; drop verticals where they cross PP. Join the front corners to the VP.',
          calloutAt: P.onPP(W, D),
          reveals: [
            ...K.rays(P, corners),
            ...K.drops(P, [[28, D, 36], [W, D, 0], [0, D, 36]]),
            ...[[0, 36], [28, 36], [28, 16], [W, 16], [W, 0]].map(([u, z]) => ({ kind: 'line', p1: P.persp(u, 0, z), p2: VP, lineType: 'construction' })),
          ],
        },
        {
          id: 4,
          instruction: 'Complete the block where the VP lines cut the verticals. Note how the tread of the step and the top of the upright both run back to the same VP: every edge going straight back does.',
          calloutAt: P.persp(42, D / 2, 16),
          reveals: K.perspLines(P, notFront(edges), 'A'),
        },
      ],
    };
  })();

  // ── 3. Small building with a door and a window ──
  (function () {
    const W = 60, D = 50, WALL = 30, RIDGE = 46;
    const prof = [[0, 0], [W, 0], [W, WALL], [W / 2, RIDGE], [0, WALL]];
    const P = K.setup({ sx: 140, d: 135, yPP: 70, yGL: 165, h: 22, theta: 0, cx: 50 });
    const faces = K.extrude(prof, 'uz', 0, D);
    const edges = K.visibleEdges(P, faces);
    const EX = -34;
    const VP = P.vps.VP;
    // door on the front (gable) face; window on the right-hand side wall (u = W)
    const DOOR = { u0: 14, u1: 26, h: 22 };
    const WIN = { v0: 18, v1: 34, z0: 10, z1: 22 };

    CONSTRUCTIONS['one-point-building'] = {
      id: 'one-point-building', title: 'One-Point Perspective: Small Building',
      summary: 'A gable-ended building with its gable on the picture plane: the door is drawn true size, while the window on the receding side wall is found with visual rays and lines to the VP.',
      bounds: { w: 240, h: 210 },
      workbookPrompt: 'Draw the building in one-point perspective with its gable end on PP. Show the door on the gable end and the window on the right-hand wall. The eye is 22 mm above GL (a natural, standing view).',
      steps: [
        {
          id: 1,
          instruction: 'Set up: top view with the gable end on PP, SP, GL, HL at a natural eye height and the VP above SP. Draw the front view (the gable end with its door) on GL at the side.',
          calloutAt: VP,
          reveals: [
            ...K.frame(P, EX - 26, P.sx + 40),
            { kind: 'polygon', points: [P.plan(0, 0), P.plan(W, 0), P.plan(W, D), P.plan(0, D)], lineType: 'A' },
            { kind: 'line', p1: P.plan(W / 2, 0), p2: P.plan(W / 2, D), lineType: 'A' },
            lbl([P.plan(W / 2, D)[0], P.plan(W / 2, D)[1] - 4], 'TOP VIEW / BO-AANSIG'),
            ...K.spMark(P),
            { kind: 'line', p1: P.SP, p2: VP, lineType: 'construction' },
            { kind: 'point', at: VP, label: 'VP', size: 1.3 },
            ...elevation(P, EX, prof),
            { kind: 'polyline', points: [[EX + DOOR.u0, P.yGL], [EX + DOOR.u0, P.yGL - DOOR.h], [EX + DOOR.u1, P.yGL - DOOR.h], [EX + DOOR.u1, P.yGL]], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the gable end at true size on the PP, door included: the ridge, eaves and door heights are projected across from the front view.',
          calloutAt: P.persp(W / 2, 0, RIDGE - 6),
          reveals: [
            ...heightProjectors(P, EX + W, [WALL, DOOR.h], P.persp(0, 0, 0)[0]),
            { kind: 'line', p1: [EX + W / 2, P.yGL - RIDGE], p2: P.persp(W / 2, 0, RIDGE), lineType: 'construction' },
            ...K.perspLines(P, frontOnly(edges), 'A'),
            { kind: 'polyline', points: [P.persp(DOOR.u0, 0, 0), P.persp(DOOR.u0, 0, DOOR.h), P.persp(DOOR.u1, 0, DOOR.h), P.persp(DOOR.u1, 0, 0)], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Rays from SP to the back corners and the ridge end in the top view; drop verticals from the PP crossings. Join the front corners and the ridge to the VP, then complete the roof and the side wall.',
          calloutAt: P.persp(W, D / 2, WALL),
          reveals: [
            ...K.rays(P, [[W, D], [W / 2, D]]),
            ...K.drops(P, [[W, D, 0], [W / 2, D, RIDGE]]),
            ...[[W, 0], [W, WALL], [W / 2, RIDGE], [0, WALL]].map(([u, z]) => ({ kind: 'line', p1: P.persp(u, 0, z), p2: VP, lineType: 'construction' })),
            ...K.perspLines(P, notFront(edges), 'A'),
          ],
        },
        {
          id: 4,
          instruction: 'The window is on the receding side wall. Mark its two edges on the side of the top view and send visual rays to them; drop verticals. Its sill and head heights go on the front corner (the true-height line) and run back to the VP.',
          calloutAt: P.persp(W, (WIN.v0 + WIN.v1) / 2, (WIN.z0 + WIN.z1) / 2),
          reveals: [
            { kind: 'point', at: P.plan(W, WIN.v0), size: 0.9 }, { kind: 'point', at: P.plan(W, WIN.v1), size: 0.9 },
            ...K.rays(P, [[W, WIN.v0], [W, WIN.v1]]),
            ...K.drops(P, [[W, WIN.v0, WIN.z1], [W, WIN.v1, WIN.z1]]),
            ...[WIN.z0, WIN.z1].map(z => ({ kind: 'line', p1: P.persp(W, 0, z), p2: VP, lineType: 'construction' })),
            { kind: 'polygon', points: [P.persp(W, WIN.v0, WIN.z0), P.persp(W, WIN.v1, WIN.z0), P.persp(W, WIN.v1, WIN.z1), P.persp(W, WIN.v0, WIN.z1)], lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 4. Bird's-eye, natural and worm's-eye: the eye height decides the view ──
  (function () {
    const W = 30, D = 30, H = 24;
    const views = [
      { name: 'BIRD\'S-EYE', h: 60, cx: 0 },
      { name: 'NATURAL', h: 12, cx: 75 },
      { name: 'WORM\'S-EYE', h: -14, cx: 150 },
    ];
    const yPP = 40, yGL = 135, d = 90;
    const steps = views.map((vw, i) => {
      const P = K.setup({ sx: vw.cx + W + 12, d, yPP, yGL, h: vw.h, theta: 0, cx: vw.cx });
      const faces = K.extrude([[0, 0], [W, 0], [W, H], [0, H]], 'uz', 0, D);
      const edges = K.visibleEdges(P, faces);
      const VP = P.vps.VP;
      const reveals = [
        { kind: 'polygon', points: [P.plan(0, 0), P.plan(W, 0), P.plan(W, D), P.plan(0, D)], lineType: 'A' },
        { kind: 'line', p1: [vw.cx - 6, P.yHL], p2: [vw.cx + W + 22, P.yHL], lineType: 'B' },
        { kind: 'point', at: VP, label: 'VP', size: 1.1 },
        ...[[0, 0], [W, 0], [W, H], [0, H]].map(([u, z]) => ({ kind: 'line', p1: P.persp(u, 0, z), p2: VP, lineType: 'construction' })),
        ...K.perspLines(P, edges, 'A'),
        { kind: 'label', at: [vw.cx + W / 2, yPP - D - 9], text: vw.name, size: 3.6, anchor: 'middle', color: '#fde047' },
        { kind: 'label', at: [vw.cx + W / 2, yPP - D - 4], text: 'eye ' + (vw.h >= 0 ? vw.h + ' mm above GL' : (-vw.h) + ' mm below GL'), size: 3, anchor: 'middle', color: '#94a3b8' },
      ];
      const instr = [
        'BIRD\'S-EYE VIEW: the eye (and so the HL) is well ABOVE the block. Every receding edge runs UP to the VP, and you see the top of the block.',
        'NATURAL VIEW: the HL passes through the block, at a person\'s eye height. Edges above the HL run down to the VP, edges below it run up; you see neither the top nor the bottom.',
        'WORM\'S-EYE VIEW: the HL is BELOW the ground line, as if looking up from below. Receding edges run DOWN to the VP and you see the underside.',
      ][i];
      return { id: i + 1, instruction: instr, calloutAt: P.persp(W, D, H), reveals };
    });
    CONSTRUCTIONS['viewpoint-comparison'] = {
      id: 'viewpoint-comparison', title: 'Bird’s-Eye, Natural & Worm’s-Eye',
      summary: 'The same block, the same station point distance, three eye heights: only the height of the horizon line changes the view.',
      bounds: { w: 230, h: 160 },
      workbookPrompt: 'Draw the same 30 x 30 x 24 block three times in one-point perspective, changing only the eye height: 60 mm above GL, 12 mm above GL and 14 mm below GL.',
      steps: [
        {
          id: 1, instruction: 'Draw the PP and GL across the sheet, and the three top views on PP, spaced apart. Each block gets its own SP and VP, at the same distance in front of PP.',
          calloutAt: [100, yPP],
          reveals: [
            { kind: 'line', p1: [-10, yPP], p2: [215, yPP], lineType: 'B' }, { kind: 'label', at: [-12, yPP + 1.3], text: 'PP', size: 3.6, anchor: 'end', color: '#e8eaf2' },
            { kind: 'line', p1: [-10, yGL], p2: [215, yGL], lineType: 'B' }, { kind: 'label', at: [-12, yGL + 1.3], text: 'GL', size: 3.6, anchor: 'end', color: '#e8eaf2' },
          ],
        },
        ...steps.map((s, i) => Object.assign(s, { id: i + 2 })),
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'In one-point perspective, why is the front face of a building drawn at its true shape and size?',
      options: [
        'Because it touches the picture plane, so it is not distorted by the perspective projection',
        'Because true shape is always easier to draw',
        'It is not really true shape — it just looks that way',
        'Only the roof is ever drawn true shape',
      ],
      answer: 0,
      explanation: 'Any surface lying directly on the picture plane is projected onto it without any distortion, so it is drawn at its true, undistorted shape and size.',
    },
    {
      text: 'What is the Vanishing Point (VP) in one-point perspective?',
      options: [
        'The single point on the horizon line where all lines receding into the distance appear to converge',
        'The exact centre of the front face',
        'A point used only for hidden detail',
        'The position of the observer\'s feet',
      ],
      answer: 0,
      explanation: 'In one-point perspective, every edge that recedes away from the viewer (in the depth direction) is drawn converging towards a single vanishing point placed on the horizon line.',
    },
    {
      text: 'Which lines do NOT converge towards the vanishing point in one-point perspective?',
      options: [
        'Horizontal and vertical lines that lie in the picture plane (the front face)',
        'Every single line in the drawing converges to the VP',
        'Only curved lines avoid converging',
        'Lines converge randomly with no rule',
      ],
      answer: 0,
      explanation: 'Only lines receding in depth converge to the VP. Lines running horizontally or vertically within the picture-plane face stay parallel to themselves, exactly as in the true-shape front view.',
    },
    {
      text: 'The Horizon Line (HL) represents:',
      options: ['The observer\'s eye level', 'The ground line only', 'The back edge of the object', 'The picture plane'],
      answer: 0,
      explanation: 'The horizon line represents the height of the observer\'s eye — it is where the vanishing point(s) for a perspective drawing are placed.',
    },
    {
      text: 'To produce a "bird\'s-eye view" of a building, where should the horizon line (and VP) be placed?',
      options: [
        'Well above the object, as if looking down from a height',
        'Well below the object, as if looking up from ground level',
        'Exactly through the middle of the object',
        'The horizon line has no effect on the type of view produced',
      ],
      answer: 0,
      explanation: 'A bird’s-eye view simulates looking down on the object from above, which is achieved by placing the horizon line (and vanishing point) well above the object.',
    },
    {
      text: 'To produce a "worm\'s-eye view" of a building, where should the horizon line (and VP) be placed?',
      options: [
        'Well below the object, as if looking up from ground level',
        'Well above the object',
        'It is identical to a natural view',
        'On the roof ridge line',
      ],
      answer: 0,
      explanation: 'A worm’s-eye view simulates looking up at the object from ground level, achieved by placing the horizon line (and vanishing point) well below the object.',
    },
    {
      text: 'What do the abbreviations HL, PP and SP stand for in perspective drawing?',
      options: [
        'Horizon Line, Picture Plane, Station Point',
        'Height Line, Plan Position, Section Point',
        'Horizontal Layout, Projection Plane, Scale Point',
        'Hidden Line, Perspective Plane, Symmetry Point',
      ],
      answer: 0,
      explanation: 'HL is the Horizon Line (eye level), PP is the Picture Plane (the imaginary glass surface the image is projected onto), and SP is the Station Point (the observer\'s eye position).',
    },
    {
      text: 'A door is cut into the receding side wall of a building in one-point perspective. Why do the door\'s vertical edges stay perfectly vertical, while its top and bottom reveal edges converge toward the VP?',
      options: [
        'Only lines running in the DEPTH direction converge to the VP — the door\'s verticals run in the height direction, which never converges in one-point perspective',
        'All lines on a receding wall must converge, without exception',
        'The door\'s vertical edges are a common exception with no real explanation',
        'Vertical edges only stay vertical if the door is exactly at the vanishing point',
      ],
      answer: 0,
      explanation: 'In one-point perspective, only edges receding in depth converge to the VP. True verticals (height) and the horizontals within the picture-plane face never converge — the door\'s reveal edges converge because they run in the depth direction, but its jambs stay vertical.',
    },
    {
      text: 'Why does constructing a window opening require TWO separate height-projection lines to the VP, while a door only needs one?',
      options: [
        'A door\'s bottom is at ground level (already established by the wall\'s own bottom edge), but a window\'s sill AND head both sit above the ground, so both need their own true height projected',
        'Windows are simply more complicated shapes than doors in every respect',
        'It is a mistake — a window only ever needs one projection line too',
        'The number of projection lines depends only on the window\'s width, not its position',
      ],
      answer: 0,
      explanation: 'A door bottom coincides with the ground line, which is already established. A window\'s sill height and head height are both new heights above the ground, so each needs its own true-height point projected to the VP before the reveal can be constructed.',
    },
    {
      text: 'How is a circular feature (e.g. a porthole window) on a receding wall constructed in one-point perspective?',
      options: [
        'Plot the true circle at the picture-plane depth, then project each of its points individually toward the VP, stopping all of them at the same required depth',
        'Draw a normal true circle directly on the receding wall — circles are never distorted by perspective',
        'It cannot be done; circular features are impossible to show accurately in perspective',
        'Simply squash a true circle vertically by an arbitrary amount',
      ],
      answer: 0,
      explanation: 'Because the receding wall is foreshortened, a circle drawn on it is never a true circle. Plotting the true circle at the picture plane and projecting every point to the correct depth (exactly like an isometric circle\'s coordinate method) produces the correct foreshortened result.',
    },
    {
      text: 'Two identical, true-size boxes are drawn in one-point perspective from the same VP, one closer to the picture plane and one set further back along the same projectors. What is true of their drawn sizes?',
      options: [
        'The farther box is drawn smaller, purely as a result of being farther from the picture plane — no separate scaling step is applied',
        'Both boxes must always be drawn exactly the same size, since they are the same true size',
        'The farther box must be drawn LARGER to compensate for the distance',
        'Size in perspective drawing has nothing to do with distance from the picture plane',
      ],
      answer: 0,
      explanation: 'Perspective foreshortening naturally makes objects appear smaller with distance — the SAME construction technique (projecting toward the VP and stopping at the required depth) automatically produces the correct, smaller size for the farther object.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = [
    'one-point-setup', 'one-point-stepped-block', 'one-point-building', 'viewpoint-comparison',
  ];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
