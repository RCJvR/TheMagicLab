// Perspective Drawing — Chapter 8 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  function recede(P, VP, t) { return [P[0] + t * (VP[0] - P[0]), P[1] + t * (VP[1] - P[1])]; }

  // ── 1. One-Point Perspective: A Simple Building ──
  (function () {
    const FL = [40, 120], FR = [100, 120], TR = [100, 80], TL = [40, 80], apex = [70, 60];
    const VP = [170, 100];
    const T = 0.35;
    const bFL = recede(FL, VP, T), bFR = recede(FR, VP, T), bTR = recede(TR, VP, T), bTL = recede(TL, VP, T), bApex = recede(apex, VP, T);

    CONSTRUCTIONS['one-point-building'] = {
      id: 'one-point-building', title: 'One-Point Perspective: A Building',
      summary: 'Draw a simple pitched-roof building in one-point perspective — the front face at true shape, with every receding edge converging on a single vanishing point.',
      bounds: { w: 205, h: 150 },
      workbookPrompt: 'Draw this building in one-point perspective: the true-shape front face, the horizon line and vanishing point, and the receding depth edges converging correctly.',
      steps: [
        {
          id: 1,
          instruction: 'The front face of the building touches the picture plane, so it is drawn at its TRUE SHAPE and size — completely undistorted, just like an ordinary front view.',
          calloutAt: [70, 100],
          reveals: [
            { kind: 'polygon', points: [FL, FR, TR, TL], lineType: 'A' },
            { kind: 'polygon', points: [TL, TR, apex], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the Horizon Line (HL) at eye level, and mark a single Vanishing Point (VP) on it. In one-point perspective, every edge receding into the distance appears to converge on this one point.',
          calloutAt: [VP[0] - 15, VP[1] - 8],
          reveals: [
            { kind: 'line', p1: [0, VP[1]], p2: [205, VP[1]], lineType: 'B' },
            { kind: 'point', at: VP, label: 'VP', size: 1.6 },
            { kind: 'label', at: [5, VP[1] - 3], text: 'HL', size: 4.5, anchor: 'start', color: '#94a3b8' },
          ],
        },
        {
          id: 3,
          instruction: 'From every corner of the front face — including the roof apex — draw a feint construction line towards the VP. These show the direction each receding edge will follow.',
          calloutAt: [(FR[0] + VP[0]) / 2, (FR[1] + VP[1]) / 2],
          reveals: [
            { kind: 'line', p1: FL, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: FR, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: TR, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: TL, p2: VP, lineType: 'construction' },
            { kind: 'line', p1: apex, p2: VP, lineType: 'construction' },
          ],
        },
        {
          id: 4,
          instruction: 'Choose how deep the building should be, and mark that depth along each receding line. Complete the back face with lines PARALLEL to the front face\'s own edges — only the depth direction converges in one-point perspective.',
          calloutAt: [(bFL[0] + bFR[0]) / 2, bFL[1] + 6],
          reveals: [
            { kind: 'line', p1: bFL, p2: bFR, lineType: 'A' },
            { kind: 'line', p1: bTL, p2: bTR, lineType: 'A' },
          ],
        },
        {
          id: 5,
          instruction: 'Add the visible depth edges on the side facing the vanishing point, and the roof ridge line, to complete the pictorial view.',
          calloutAt: [(TR[0] + bTR[0]) / 2, (TR[1] + bTR[1]) / 2 - 8],
          reveals: [
            { kind: 'line', p1: FR, p2: bFR, lineType: 'A' },
            { kind: 'line', p1: TR, p2: bTR, lineType: 'A' },
            { kind: 'line', p1: bTR, p2: bFR, lineType: 'A' },
            { kind: 'line', p1: apex, p2: bApex, lineType: 'A' },
            { kind: 'line', p1: bApex, p2: bTR, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 2. Bird's-Eye, Natural and Worm's-Eye Views ──
  (function () {
    const boxes = [
      { name: 'Bird’s-Eye View', x1: 15, x2: 55, y1: 70, y2: 100, vp: [80, 20], note: 'VP high above — looking down' },
      { name: 'Natural (Eye-Level) View', x1: 75, x2: 115, y1: 70, y2: 100, vp: [140, 85], note: 'VP through the object — a natural view' },
      { name: 'Worm’s-Eye View', x1: 135, x2: 175, y1: 70, y2: 100, vp: [200, 150], note: 'VP low below — looking up' },
    ];

    CONSTRUCTIONS['viewpoint-comparison'] = {
      id: 'viewpoint-comparison', title: 'Bird’s-Eye, Natural & Worm’s-Eye',
      summary: 'The same simple box, drawn three times with the vanishing point at a different height each time — showing how moving the horizon line changes the viewpoint.',
      bounds: { w: 225, h: 175 },
      workbookPrompt: 'Draw the same simple box three times, moving only the position of the VP each time, to produce a bird’s-eye, a natural, and a worm’s-eye view.',
      steps: boxes.map((b, i) => ({
        id: i + 1,
        instruction: (i === 0
          ? 'For a BIRD’S-EYE view, place the horizon line (and VP) well ABOVE the object, as if looking down from a height.'
          : i === 1
          ? 'For a NATURAL view, place the horizon line at normal eye level, roughly passing through the object itself.'
          : 'For a WORM’S-EYE view, place the horizon line (and VP) well BELOW the object, as if looking up from ground level.'),
        calloutAt: [(b.x1 + b.x2) / 2, b.y1 - 10],
        reveals: [
          { kind: 'polygon', points: [[b.x1, b.y1], [b.x2, b.y1], [b.x2, b.y2], [b.x1, b.y2]], lineType: 'A' },
          { kind: 'point', at: b.vp, label: 'VP', size: 1.4 },
          { kind: 'line', p1: [b.x2, b.y1], p2: b.vp, lineType: 'construction' },
          { kind: 'line', p1: [b.x2, b.y2], p2: b.vp, lineType: 'construction' },
          { kind: 'label', at: [b.x1, b.y2 + 12], text: b.name, size: 4, anchor: 'start', color: '#fde047' },
          { kind: 'label', at: [b.x1, b.y2 + 18], text: b.note, size: 3.2, anchor: 'start', color: '#94a3b8' },
        ],
      })),
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
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['one-point-building', 'viewpoint-comparison'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
