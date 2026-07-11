// Civil Drawing — Chapter 7 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';
  const G = global.ConstructionGeometry;
  const CONSTRUCTIONS = {};

  function hatchRect(x0, y0, w, h, spacing) {
    const lines = [];
    for (let k = -h; k <= w + 0.01; k += spacing) {
      const vLo = Math.max(0, -k), vHi = Math.min(h, w - k);
      if (vHi <= vLo) continue;
      const u1 = vLo + k, v1 = vLo, u2 = vHi + k, v2 = vHi;
      lines.push({ kind: 'line', p1: [x0 + u1, y0 + v1], p2: [x0 + u2, y0 + v2], lineType: 'C' });
    }
    return lines;
  }

  // ── 1. Simple Floor Plan (Single-Storey Dwelling) ──
  (function () {
    // Outer wall footprint and inner wall face (wall thickness = 6).
    const OX1 = 40, OY1 = 40, OX2 = 110, OY2 = 90;
    const T = 6;
    const IX1 = OX1 + T, IY1 = OY1 + T, IX2 = OX2 - T, IY2 = OY2 - T;

    const doorX1 = 60, doorX2 = 75; // gap in the bottom wall
    const winY1 = 55, winY2 = 75;   // gap in the right wall

    CONSTRUCTIONS['floor-plan'] = {
      id: 'floor-plan', title: 'Simple Floor Plan',
      summary: 'Draw a single-storey floor plan in 1st-angle convention: cavity walls, a door with its swing symbol, a window, dimensions and the floor area.',
      bounds: { w: 155, h: 135 },
      workbookPrompt: 'Draw the floor plan of this single room at a scale of 1:100. Show the cavity wall, door swing, window frame lines, overall dimensions and the calculated floor area.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the outer wall line first — the true outside footprint of the dwelling.',
          calloutAt: [(OX1 + OX2) / 2, OY1],
          reveals: [
            { kind: 'line', p1: [OX1, OY1], p2: [OX2, OY1], lineType: 'A' },
            { kind: 'line', p1: [OX2, OY1], p2: [OX2, winY1], lineType: 'A' },
            { kind: 'line', p1: [OX2, winY2], p2: [OX2, OY2], lineType: 'A' },
            { kind: 'line', p1: [OX2, OY2], p2: [doorX2, OY2], lineType: 'A' },
            { kind: 'line', p1: [doorX1, OY2], p2: [OX1, OY2], lineType: 'A' },
            { kind: 'line', p1: [OX1, OY2], p2: [OX1, OY1], lineType: 'A' },
          ],
        },
        {
          id: 2,
          instruction: 'Draw the inner wall face, offset in from the outer line by the wall thickness — this is what makes it a proper cavity wall in plan, not just a single line.',
          calloutAt: [(IX1 + IX2) / 2, IY1],
          reveals: [
            { kind: 'line', p1: [IX1, IY1], p2: [IX2, IY1], lineType: 'A' },
            { kind: 'line', p1: [IX2, IY1], p2: [IX2, winY1], lineType: 'A' },
            { kind: 'line', p1: [IX2, winY2], p2: [IX2, IY2], lineType: 'A' },
            { kind: 'line', p1: [IX2, IY2], p2: [doorX2, IY2], lineType: 'A' },
            { kind: 'line', p1: [doorX1, IY2], p2: [IX1, IY2], lineType: 'A' },
            { kind: 'line', p1: [IX1, IY2], p2: [IX1, IY1], lineType: 'A' },
            { kind: 'line', p1: [doorX1, OY2], p2: [doorX1, IY2], lineType: 'A' },
            { kind: 'line', p1: [doorX2, OY2], p2: [doorX2, IY2], lineType: 'A' },
            { kind: 'line', p1: [OX2, winY1], p2: [IX2, winY1], lineType: 'A' },
            { kind: 'line', p1: [OX2, winY2], p2: [IX2, winY2], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'At the door opening, draw the door leaf at its hinge and the quarter-circle swing symbol showing the path it sweeps through as it opens.',
          calloutAt: [doorX1 + 7, IY2 - 10],
          reveals: [
            { kind: 'line', p1: [doorX1, IY2], p2: [doorX1, IY2 - (doorX2 - doorX1)], lineType: 'B' },
            { kind: 'arc-construction', center: [doorX1, IY2], r: doorX2 - doorX1, startDeg: -90, endDeg: 0, lineType: 'C' },
          ],
        },
        {
          id: 4,
          instruction: 'At the window opening, draw thin parallel lines across the gap to represent the window frame and glazing bars.',
          calloutAt: [OX2 + 8, (winY1 + winY2) / 2],
          reveals: [
            { kind: 'line', p1: [IX2, winY1 + 3], p2: [OX2, winY1 + 3], lineType: 'B' },
            { kind: 'line', p1: [IX2, (winY1 + winY2) / 2], p2: [OX2, (winY1 + winY2) / 2], lineType: 'B' },
            { kind: 'line', p1: [IX2, winY2 - 3], p2: [OX2, winY2 - 3], lineType: 'B' },
          ],
        },
        {
          id: 5,
          instruction: 'Label the room, dimension the overall (outer) width and height, and calculate the floor area from the inner dimensions. Assume this plan is drawn at a scale of 1:100 — each drawing unit represents 100 mm.',
          calloutAt: [(OX1 + OX2) / 2, (OY1 + OY2) / 2],
          reveals: [
            { kind: 'label', at: [(IX1 + IX2) / 2 - 14, (IY1 + IY2) / 2], text: 'BEDROOM', size: 4.2, anchor: 'start', color: '#94a3b8' },
            { kind: 'dimension', p1: [OX1, OY1 - 8], p2: [OX2, OY1 - 8], offset: -6, text: ((OX2 - OX1) / 10).toFixed(1) + 'm' },
            { kind: 'dimension', p1: [OX1 - 8, OY1], p2: [OX1 - 8, OY2], offset: -6, text: ((OY2 - OY1) / 10).toFixed(1) + 'm' },
            { kind: 'label', at: [OX1, OY2 + 16], text: 'Floor area = ' + ((IX2 - IX1) / 10).toFixed(1) + 'm × ' + ((IY2 - IY1) / 10).toFixed(1) + 'm = ' + (((IX2 - IX1) / 10) * ((IY2 - IY1) / 10)).toFixed(2) + 'm²', size: 4.2, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── 2. Sectional Elevation: Foundation to Slab ──
  (function () {
    const wallCX = 100, wallHalf = 12.5;
    const footingY1 = 130, footingY2 = 150, footingHalf = 25;
    const dpcY = 85, groundY = 90;
    const slabY1 = 75, slabY2 = 85, slabLeftX = 60;
    const breakY = 40;

    CONSTRUCTIONS['foundation-section'] = {
      id: 'foundation-section', title: 'Foundation-to-Slab Section',
      summary: 'A sectional elevation through an external wall, from the concrete strip foundation up to the floor slab — including the damp-proof course.',
      bounds: { w: 150, h: 165 },
      workbookPrompt: 'Draw the sectional elevation from the foundation footing up to the floor slab, hatching all concrete correctly and clearly labelling the DPC, footing, slab and ground level.',
      steps: [
        {
          id: 1,
          instruction: 'Draw the concrete strip foundation (the footing) below ground level, and hatch it — concrete that has been cut through is always shown hatched.',
          calloutAt: [wallCX, (footingY1 + footingY2) / 2],
          reveals: [
            { kind: 'polygon', points: [[wallCX - footingHalf, footingY1], [wallCX + footingHalf, footingY1], [wallCX + footingHalf, footingY2], [wallCX - footingHalf, footingY2]], lineType: 'A' },
            ...hatchRect(wallCX - footingHalf, footingY1, footingHalf * 2, footingY2 - footingY1, 6),
          ],
        },
        {
          id: 2,
          instruction: 'Draw the foundation wall rising from the footing up to just below ground level — narrower than the footing, and left unhatched to show it is masonry, not concrete.',
          calloutAt: [wallCX, (dpcY + footingY1) / 2],
          reveals: [
            { kind: 'line', p1: [wallCX - wallHalf, dpcY], p2: [wallCX - wallHalf, footingY1], lineType: 'A' },
            { kind: 'line', p1: [wallCX + wallHalf, dpcY], p2: [wallCX + wallHalf, footingY1], lineType: 'A' },
          ],
        },
        {
          id: 3,
          instruction: 'Add the ground line, and the damp-proof course (DPC) just above it — a waterproof membrane, shown as a short thick line, that stops rising damp from reaching the wall above.',
          calloutAt: [wallCX - wallHalf - 20, groundY],
          reveals: [
            { kind: 'line', p1: [40, groundY], p2: [wallCX - wallHalf, groundY], lineType: 'B' },
            { kind: 'label', at: [38, groundY - 2], text: 'GROUND LEVEL', size: 3.6, anchor: 'end', color: '#94a3b8' },
            { kind: 'line', p1: [wallCX - wallHalf - 2, dpcY], p2: [wallCX + wallHalf + 2, dpcY], lineType: 'A' },
            { kind: 'label', at: [wallCX + wallHalf + 5, dpcY + 1], text: 'DPC', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
        {
          id: 4,
          instruction: 'Draw the concrete floor slab resting at DPC level (hatched, since it too is concrete), and continue the wall upward above it — shown cut off with a break line, since this is only a partial detail.',
          calloutAt: [(slabLeftX + wallCX + wallHalf) / 2, (slabY1 + slabY2) / 2],
          reveals: [
            { kind: 'polygon', points: [[slabLeftX, slabY1], [wallCX + wallHalf, slabY1], [wallCX + wallHalf, slabY2], [slabLeftX, slabY2]], lineType: 'A' },
            ...hatchRect(slabLeftX, slabY1, (wallCX + wallHalf) - slabLeftX, slabY2 - slabY1, 6),
            { kind: 'line', p1: [wallCX - wallHalf, slabY1], p2: [wallCX - wallHalf, breakY + 4], lineType: 'A' },
            { kind: 'line', p1: [wallCX + wallHalf, slabY1], p2: [wallCX + wallHalf, breakY + 4], lineType: 'A' },
            { kind: 'polyline', points: [[wallCX - wallHalf - 3, breakY + 4], [wallCX - wallHalf + 2, breakY], [wallCX - wallHalf - 2, breakY - 4], [wallCX - wallHalf + 3, breakY - 8]], lineType: 'B' },
            { kind: 'polyline', points: [[wallCX + wallHalf - 3, breakY + 4], [wallCX + wallHalf + 2, breakY], [wallCX + wallHalf - 2, breakY - 4], [wallCX + wallHalf + 3, breakY - 8]], lineType: 'B' },
          ],
        },
        {
          id: 5,
          instruction: 'Label each part of the section: footing, foundation wall, and floor slab.',
          calloutAt: [wallCX + footingHalf + 6, (footingY1 + footingY2) / 2],
          reveals: [
            { kind: 'label', at: [wallCX + footingHalf + 4, (footingY1 + footingY2) / 2], text: 'FOOTING', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [wallCX + wallHalf + 4, (dpcY + footingY1) / 2], text: 'FOUNDATION WALL', size: 4, anchor: 'start', color: '#fde047' },
            { kind: 'label', at: [slabLeftX, slabY2 + 8], text: 'FLOOR SLAB', size: 4, anchor: 'start', color: '#fde047' },
          ],
        },
      ],
    };
  })();

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'Which SANS guideline governs civil drawing conventions (as opposed to SANS 0111 for general/mechanical drawing)?',
      options: ['SANS 0143', 'SANS 0111', 'SANS 10400', 'SANS 0157'],
      answer: 0,
      explanation: 'Civil working drawings — floor plans, elevations and sectional elevations — must comply with the SANS (SABS) 0143 Guidelines.',
    },
    {
      text: 'On a floor plan, what does the quarter-circle arc at a door opening represent?',
      options: [
        'The path swept by the door leaf as it opens',
        'A window',
        'A structural column',
        'The direction of north'
      ],
      answer: 0,
      explanation: 'The quarter-circle (or similar arc) shows the swing of the door leaf, letting the reader see which way the door opens and confirming it will not obstruct anything.',
    },
    {
      text: 'On a floor plan, how is a window opening typically shown, as opposed to a door opening?',
      options: [
        'As a gap in the wall crossed by thin parallel frame lines, with no swing arc',
        'Exactly the same as a door, including a swing arc',
        'As a solid, unbroken wall line',
        'Windows are never shown on floor plans',
      ],
      answer: 0,
      explanation: 'A window opening is shown with thin lines across the gap representing the frame and glazing bars — there is no swing arc, since a window does not swing open the way a hinged door does.',
    },
    {
      text: 'Why is concrete shown hatched wherever a section cuts through it, while masonry (brick) is often left unhatched?',
      options: [
        'It is a drawing convention used to visually distinguish between different materials cut by the section',
        'Concrete is always the same colour as brick, so hatching is needed to tell them apart in a photograph',
        'It has no real purpose — it is purely decorative',
        'Masonry can never be hatched under any circumstances',
      ],
      answer: 0,
      explanation: 'Hatching (and varying the hatch style) is a drawing convention that lets the reader instantly distinguish which material a sectioned surface is made of.',
    },
    {
      text: 'What is the purpose of the damp-proof course (DPC)?',
      options: [
        'To form a waterproof barrier that stops rising damp/moisture from the ground reaching the wall above',
        'To support the full weight of the roof',
        'To provide the building\'s electrical earth connection',
        'It is purely decorative brickwork',
      ],
      answer: 0,
      explanation: 'The DPC is a waterproof membrane built into the wall, positioned above ground level, specifically to stop moisture rising up through the masonry from the ground.',
    },
    {
      text: 'Why is the strip foundation (footing) wider than the wall that sits on top of it?',
      options: [
        'To spread the building\'s load over a larger area of soil, preventing excessive settlement',
        'To save on concrete costs',
        'It has no structural purpose, only an aesthetic one',
        'Because SANS 0143 requires all footings to be exactly double the wall width',
      ],
      answer: 0,
      explanation: 'A wider footing spreads the structure\'s weight over more ground area, reducing the pressure on the soil and helping prevent the foundation from sinking unevenly.',
    },
    {
      text: 'How is the floor area of a room calculated from a floor plan?',
      options: [
        'By multiplying the INNER (internal) width and length of the room, not the outer wall-to-wall dimensions',
        'By multiplying the outer wall-to-wall width and length',
        'By adding the perimeter and the room\'s height',
        'Floor area cannot be calculated from a plan — it must be measured on site',
      ],
      answer: 0,
      explanation: 'Floor area refers to usable internal space, so it is always calculated using the inner (internal) dimensions of the room, measured from the inside wall faces — not the outer footprint, which includes the wall thickness.',
    },
    {
      text: 'What does a jagged "break line" on a sectional elevation indicate?',
      options: [
        'That the drawing has been deliberately cut off there, because only part of the full height needed to be shown',
        'A structural crack in the wall',
        'The exact location of the damp-proof course',
        'That the material is broken or damaged'
      ],
      answer: 0,
      explanation: 'A break line shows that the drawing has intentionally been shortened — the object continues beyond that point, but showing it in full was not necessary for this detail.',
    },
  ];

  global.CONSTRUCTIONS = CONSTRUCTIONS;
  global.CONSTRUCTION_ORDER = ['floor-plan', 'foundation-section'];
  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
})(window);
