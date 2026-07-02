// Geometric Constructions — Chapter 1 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  function arcTowards(center, target, r, halfWidthDeg, lineType) {
    const ang = Math.atan2(target[1] - center[1], target[0] - center[0]) * 180 / Math.PI;
    return { kind: 'arc-construction', center, r, startDeg: ang - halfWidthDeg, endDeg: ang + halfWidthDeg, lineType: lineType || 'construction' };
  }

  // ── 1. Bisect a straight line ──
  (function () {
    const A = [60, 90], B = [140, 90];
    const r = 55;
    const half = G.distance(A, B) / 2;
    const h = Math.sqrt(r * r - half * half);
    const M = G.midpoint(A, B);
    const Q = [M[0], M[1] - h];
    const P = [M[0], M[1] + h];
    CONSTRUCTIONS['bisect-line'] = {
      id: 'bisect-line', title: 'Bisect a Straight Line',
      summary: 'Find the exact midpoint of a line and construct a line perpendicular to it, using only a compass and straightedge.',
      bounds: { w: 200, h: 180 },
      workbookPrompt: 'Bisect line AB (80 mm) using compass and straightedge. Show all construction arcs and label points P, Q and M.',
      steps: [
        {
          id: 1,
          instruction: 'Draw line AB, 80 mm long, using a Type A (continuous thick) line.',
          measurement: { label: 'AB = 80 mm' },
          calloutAt: A,
          reveals: [
            { kind: 'line', p1: A, p2: B, lineType: 'A' },
            { kind: 'point', at: A, label: 'A' }, { kind: 'point', at: B, label: 'B' },
          ],
        },
        {
          id: 2,
          instruction: 'From A, open your compass to more than half of AB — use 55 mm. Swing one arc above the line and one below it.',
          measurement: { label: 'radius = 55 mm (> 40 mm)' },
          calloutAt: [A[0] - 10, A[1]],
          reveals: [arcTowards(A, Q, r, 24), arcTowards(A, P, r, 24)],
        },
        {
          id: 3,
          instruction: 'Keeping the same radius, swing two more arcs from B. Where the arcs cross above and below AB, mark points Q and P.',
          calloutAt: Q,
          reveals: [
            arcTowards(B, Q, r, 24), arcTowards(B, P, r, 24),
            { kind: 'point', at: Q, label: 'Q' }, { kind: 'point', at: P, label: 'P' },
          ],
        },
        {
          id: 4,
          instruction: 'Join P to Q with a Type A line. PQ is the perpendicular bisector of AB — it crosses AB at its midpoint, M, at exactly 90°.',
          measurement: { label: 'PQ ⟂ AB at M' },
          calloutAt: M,
          reveals: [
            { kind: 'line', p1: P, p2: Q, lineType: 'A' },
            { kind: 'point', at: M, label: 'M' },
            { kind: 'right-angle-marker', at: M, rotationDeg: 0 },
            { kind: 'dimension', p1: A, p2: B, offset: -22, text: '80' },
          ],
        },
      ],
    };
  })();

  // ── 2. Bisect an angle ──
  (function () {
    const V = [70, 130];
    const A = [160, 130];
    const rayAngle2 = -70;
    const C = G.lineAtAngleLength(V, rayAngle2, 90);
    const r1 = 50;
    const X = G.lineAtAngleLength(V, 0, r1);
    const Y = G.lineAtAngleLength(V, rayAngle2, r1);
    const D = G.angleBisector(V, A, C, 90).p2;
    const bisectorFar = G.angleBisector(V, A, C, 105).p2;
    const r2 = G.distance(X, D);
    CONSTRUCTIONS['bisect-angle'] = {
      id: 'bisect-angle', title: 'Bisect an Angle',
      summary: 'Divide an angle into two exactly equal parts using compass and straightedge.',
      bounds: { w: 200, h: 180 },
      workbookPrompt: 'Bisect angle AVC (approximately 70°) using compass and straightedge. Show all construction arcs.',
      steps: [
        {
          id: 1,
          instruction: 'Draw angle AVC at vertex V, with arms VA and VC (approximately 70° apart).',
          measurement: { label: '∠AVC ≈ 70°' },
          calloutAt: V,
          reveals: [
            { kind: 'line', p1: V, p2: A, lineType: 'A' }, { kind: 'line', p1: V, p2: C, lineType: 'A' },
            { kind: 'point', at: V, label: 'V' }, { kind: 'point', at: A, label: 'A' }, { kind: 'point', at: C, label: 'C' },
            { kind: 'angle-arc', vertex: V, p1: A, p2: C, radius: 20, text: '70°' },
          ],
        },
        {
          id: 2,
          instruction: 'From V, swing a single arc (radius 50 mm) crossing both arms. Mark the crossing points X and Y.',
          measurement: { label: 'radius = 50 mm' },
          calloutAt: X,
          reveals: [
            arcTowards(V, G.midpoint(X, Y), r1, 45),
            { kind: 'point', at: X, label: 'X' }, { kind: 'point', at: Y, label: 'Y' },
          ],
        },
        {
          id: 3,
          instruction: 'From X and Y, swing two equal arcs of the same radius so they cross at point D.',
          calloutAt: D,
          reveals: [arcTowards(X, D, r2, 22), arcTowards(Y, D, r2, 22), { kind: 'point', at: D, label: 'D' }],
        },
        {
          id: 4,
          instruction: 'Join V to D with a Type A line. VD bisects angle AVC into two equal 35° angles.',
          measurement: { label: '∠AVD = ∠DVC = 35°' },
          calloutAt: G.midpoint(V, D),
          reveals: [
            { kind: 'line', p1: V, p2: bisectorFar, lineType: 'A' },
            { kind: 'angle-arc', vertex: V, p1: A, p2: bisectorFar, radius: 14, text: '35°' },
          ],
        },
      ],
    };
  })();

  // ── 3. Tangent to a circle from an external point ──
  (function () {
    const O = [70, 110], r = 35;
    const Pext = [O[0] + 70, O[1]];
    const tan = G.circleTangentFromExternalPoint(O, r, Pext);
    const [T1, T2] = tan.tangentPoints;
    const N = G.midpoint(O, Pext);
    const auxR = G.distance(O, Pext) / 2;
    CONSTRUCTIONS['tangent-external'] = {
      id: 'tangent-external', title: 'Tangent to a Circle from an External Point',
      summary: 'Construct the two tangent lines from a point outside a circle, using the Thales semicircle method.',
      bounds: { w: 230, h: 180 },
      workbookPrompt: 'Construct the two tangents from external point P to a circle of radius 35 mm, given OP = 70 mm. Show the construction circle and label the tangent points.',
      steps: [
        {
          id: 1,
          instruction: 'Draw circle O, radius 35 mm. Mark external point P, 70 mm from O.',
          measurement: { label: 'r = 35 mm, OP = 70 mm' },
          calloutAt: O,
          reveals: [
            { kind: 'circle', center: O, r, lineType: 'A' },
            { kind: 'point', at: O, label: 'O' }, { kind: 'point', at: Pext, label: 'P' },
            { kind: 'line', p1: O, p2: Pext, lineType: 'construction' },
          ],
        },
        {
          id: 2,
          instruction: 'Bisect OP to find its midpoint, N.',
          calloutAt: N,
          reveals: [{ kind: 'point', at: N, label: 'N' }],
        },
        {
          id: 3,
          instruction: 'With centre N and radius NO, draw a circle. It crosses the original circle at the two tangent points, T1 and T2.',
          measurement: { label: 'radius NO = NP = 35 mm' },
          calloutAt: T1,
          reveals: [
            { kind: 'circle', center: N, r: auxR, lineType: 'construction' },
            { kind: 'point', at: T1, label: 'T1' }, { kind: 'point', at: T2, label: 'T2' },
          ],
        },
        {
          id: 4,
          instruction: 'Join P to T1 and P to T2 with Type A lines. These are the two required tangents — each meets the circle at exactly 90° to the radius.',
          measurement: { label: 'tangent length ≈ ' + tan.tangentLength.toFixed(1) + ' mm' },
          calloutAt: G.midpoint(Pext, T1),
          reveals: [
            { kind: 'line', p1: Pext, p2: T1, lineType: 'A' },
            { kind: 'line', p1: Pext, p2: T2, lineType: 'A' },
          ],
        },
      ],
    };
  })();

  // ── 4. Regular hexagon inscribed in a circle (compass-radius-step method) ──
  (function () {
    const center = [100, 100], r = 30; // 60mm diameter
    const verts = G.regularPolygonInCircle(center, r, 6, -90);
    const steps = [{
      id: 1,
      instruction: 'Draw a circle of radius 30 mm, centre O. Mark point 1 where it crosses the vertical centre line at the top.',
      measurement: { label: 'r = 30 mm' },
      calloutAt: center,
      reveals: [
        { kind: 'circle', center, r, lineType: 'A' },
        { kind: 'point', at: center, label: 'O' }, { kind: 'point', at: verts[0], label: '1' },
      ],
    }];
    for (let i = 1; i < 6; i++) {
      steps.push({
        id: i + 1,
        instruction: i === 1
          ? "A regular hexagon's side length always equals the circle's radius. Without changing your compass, step from point 1 around the circle to mark point 2."
          : `Keep the same radius and step around again to mark point ${i + 1}.`,
        calloutAt: verts[i],
        reveals: [{ kind: 'point', at: verts[i], label: String(i + 1) }],
      });
    }
    steps.push({
      id: 7,
      instruction: 'Join points 1–6 in order with Type A lines to complete the hexagon.',
      calloutAt: G.midpoint(verts[0], verts[1]),
      reveals: [{ kind: 'polygon', points: verts, lineType: 'A' }],
    });
    CONSTRUCTIONS['hexagon-in-circle'] = {
      id: 'hexagon-in-circle', title: 'Regular Hexagon Inscribed in a Circle',
      summary: "Construct a regular hexagon using the compass-step method — for a hexagon, the compass radius never changes.",
      bounds: { w: 200, h: 180 },
      workbookPrompt: 'Inscribe a regular hexagon in a circle of 60 mm diameter, using the compass-step method. Label all six vertices.',
      steps,
    };
  })();

  // ── 5. Regular pentagon inscribed in a circle (central-angle method) ──
  (function () {
    const center = [100, 100], r = 35; // 70mm diameter
    const verts = G.regularPolygonInCircle(center, r, 5, -90);
    const steps = [{
      id: 1,
      instruction: 'Draw a circle of radius 35 mm, centre O. Mark point 1 at the top, where it crosses the vertical centre line.',
      measurement: { label: 'r = 35 mm' },
      calloutAt: center,
      reveals: [
        { kind: 'circle', center, r, lineType: 'A' },
        { kind: 'point', at: center, label: 'O' }, { kind: 'point', at: verts[0], label: '1' },
      ],
    }];
    for (let i = 1; i < 5; i++) {
      steps.push({
        id: i + 1,
        instruction: i === 1
          ? 'A regular pentagon divides the circle into 5 equal angles at the centre: 360° ÷ 5 = 72°. Using a protractor at O, mark point 2, 72° from point 1.'
          : `Continue marking every 72° around the circle to place point ${i + 1}.`,
        measurement: i === 1 ? { label: '360° ÷ 5 = 72°' } : undefined,
        calloutAt: verts[i],
        reveals: [
          { kind: 'point', at: verts[i], label: String(i + 1) },
          { kind: 'angle-arc', vertex: center, p1: verts[i - 1], p2: verts[i], radius: 12, text: i === 1 ? '72°' : '' },
        ],
      });
    }
    steps.push({
      id: 6,
      instruction: 'Join points 1–5 in order with Type A lines to complete the pentagon.',
      calloutAt: G.midpoint(verts[0], verts[1]),
      reveals: [{ kind: 'polygon', points: verts, lineType: 'A' }],
    });
    CONSTRUCTIONS['pentagon-in-circle'] = {
      id: 'pentagon-in-circle', title: 'Regular Pentagon Inscribed in a Circle',
      summary: 'Construct a regular pentagon by dividing a circle into 5 equal central angles — the method used for odd-sided polygons.',
      bounds: { w: 200, h: 180 },
      workbookPrompt: 'Inscribe a regular pentagon in a circle of 70 mm diameter, dividing it into 5 equal 72° angles. Label all five vertices.',
      steps,
    };
  })();

  // ── 6. Helix / spring curve (plan + elevation projection) ──
  (function () {
    const planCenter = [60, 150], planR = 20; // 40mm diameter
    const planPts = G.regularPolygonInCircle(planCenter, planR, 12, -90);
    const elevX0 = 110, elevWidth = 90, pitch = 20, elevBaseY = 150;
    const elevPts = planPts.map((p, i) => [elevX0 + i * (elevWidth / 12), elevBaseY - (i / 12) * pitch]);
    const curvePts = G.catmullRomExpand(elevPts, 8);

    CONSTRUCTIONS['helix-spring'] = {
      id: 'helix-spring', title: 'Helix / Spring Curve',
      summary: 'Project one full turn of a helix from its plan (circle) and elevation (pitch) views — the method used to draw springs and screw threads.',
      bounds: { w: 220, h: 190 },
      workbookPrompt: 'Project one full turn of a helix curve (base circle 40 mm diameter, pitch 20 mm) from its plan and elevation views.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the plan view: a circle of 40 mm diameter, centre O, divided into 12 equal parts (30° apart).',
          measurement: { label: '12 × 30° = 360°' },
          calloutAt: planCenter,
          reveals: [
            { kind: 'circle', center: planCenter, r: planR, lineType: 'A' },
            { kind: 'point', at: planCenter, label: 'O' },
            ...planPts.map((p, i) => ({ kind: 'point', at: p, label: String(i + 1) })),
          ],
        },
        {
          id: 2,
          instruction: 'Draw the elevation baseline to the right, and a vertical line one pitch high (20 mm). Divide the pitch line into 12 equal parts.',
          measurement: { label: 'pitch = 20 mm' },
          calloutAt: [elevX0, elevBaseY],
          reveals: [
            { kind: 'line', p1: [elevX0, elevBaseY], p2: [elevX0 + elevWidth, elevBaseY], lineType: 'B' },
            { kind: 'line', p1: [elevX0, elevBaseY], p2: [elevX0, elevBaseY - pitch], lineType: 'A' },
            { kind: 'dimension', p1: [elevX0, elevBaseY], p2: [elevX0, elevBaseY - pitch], offset: -16, text: '20' },
          ],
        },
        {
          id: 3,
          instruction: 'Project each of the 12 plan points horizontally across to the elevation, marking each at its correct rise — point 1 at 0 mm, point 2 at 1/12 of a pitch, and so on.',
          calloutAt: elevPts[6],
          reveals: [
            ...planPts.map((p, i) => ({ kind: 'line', p1: p, p2: [elevPts[i][0], p[1]], lineType: 'construction' })),
            ...elevPts.map((p, i) => ({ kind: 'point', at: p, label: String(i + 1) })),
          ],
        },
        {
          id: 4,
          instruction: 'Join the 12 elevation points with a smooth curve. This is one full turn of the helix.',
          calloutAt: elevPts[elevPts.length - 1],
          reveals: [{ kind: 'polyline', points: curvePts, lineType: 'A' }],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'Which SANS line type is used for a visible outline or the final result of a construction?',
      options: ['Type A — continuous thick', 'Type B — continuous thin', 'Type C — continuous thin freehand', 'Chain thin (centre line)'],
      answer: 0,
      explanation: 'Type A (continuous thick) lines represent visible outlines and the final, finished lines of a drawing.',
    },
    {
      text: 'When bisecting a line AB with a compass, why must the radius be more than half the length of AB?',
      options: ['So the arcs actually cross each other above and below the line', 'So the drawing looks neater', 'It has no effect on the construction', 'To match the SANS Type A line width'],
      answer: 0,
      explanation: 'If the radius were less than or equal to half of AB, the arcs from A and B would never intersect.',
    },
    {
      text: 'In the tangent-from-an-external-point construction, what is true about the angle between a tangent and the radius at the point of contact?',
      options: ['It is always 90°', 'It is always 45°', 'It equals half the angle at the centre', 'It depends on the circle\'s radius'],
      answer: 0,
      explanation: 'A tangent to a circle is always perpendicular to the radius drawn to the point of contact — this is what makes the Thales semicircle method work.',
    },
    {
      text: "For a regular hexagon inscribed in a circle, how does the side length compare to the circle's radius?",
      options: ['They are equal', 'The side is double the radius', 'The side is half the radius', 'There is no fixed relationship'],
      answer: 0,
      explanation: "A regular hexagon's side length always equals the radius of its circumscribing circle — this is why the compass-step method works without recalculating.",
    },
    {
      text: 'A regular pentagon is inscribed in a circle by dividing it into equal central angles. What is that angle?',
      options: ['72°', '60°', '90°', '108°'],
      answer: 0,
      explanation: '360° ÷ 5 = 72°. (108° is the pentagon\'s interior angle, not the central angle.)',
    },
    {
      text: 'When projecting a helix from its plan and elevation, what does the "pitch" represent?',
      options: ['The vertical rise for one complete turn', 'The diameter of the base circle', 'The number of divisions used', 'The angle between plan points'],
      answer: 0,
      explanation: 'Pitch is the vertical distance the helix rises for one complete 360° turn — the spacing between coils of a spring or thread.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['bisect-line', 'bisect-angle', 'tangent-external', 'hexagon-in-circle', 'pentagon-in-circle', 'helix-spring'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
