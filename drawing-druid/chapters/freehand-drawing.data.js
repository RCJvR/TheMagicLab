// Freehand Drawing — Chapter 1 data. Requires engine-geometry.js loaded first (window.ConstructionGeometry).
(function (global) {
  'use strict';

  // ── Practice questions ──
  const PRACTICE_QUESTIONS = [
    {
      text: 'Why should a freehand line be drawn with one long, confident stroke rather than several short, scratchy strokes?',
      options: [
        'A single confident stroke gives a straighter, cleaner line',
        'It uses less lead on the pencil',
        'SANS 0111 requires it',
        'It has no effect on the result',
      ],
      answer: 0,
      explanation: 'Short, hesitant strokes wobble and drift off-line. Committing to one smooth, confident stroke — even if you sketch the direction first — produces a straighter, more controlled line.',
    },
    {
      text: 'What should you focus your eyes on while sketching a freehand line from A to B?',
      options: [
        'The target point you are drawing towards, not the pencil tip',
        'The pencil tip at all times',
        'Your other hand',
        'It does not matter where you look',
      ],
      answer: 0,
      explanation: 'Watching the target point (not the pencil tip) helps your hand guide the line straight towards it, instead of over-correcting for every small wobble.',
    },
    {
      text: 'What is the standard technique for sketching an accurate freehand circle?',
      options: [
        'Sketch a bounding square first, mark the midpoint of each side, then connect them with four arcs',
        'Draw the circle in one continuous freehand stroke with no guidelines',
        'Use a coin or round object to trace around',
        'Estimate the centre and sketch outward without any guide',
      ],
      answer: 0,
      explanation: 'A lightly sketched bounding square gives four accurate tangent points (the midpoints of each side) — connecting them with four freehand arcs produces a far more accurate circle than sketching freehand with no guide at all.',
    },
    {
      text: 'What is "blocking-in" used for in freehand drawing?',
      options: [
        'Lightly sketching an overall bounding shape first to establish correct proportions before adding any detail',
        'Colouring in the finished drawing',
        'Blocking out (hiding) unwanted lines with correction fluid',
        'A method used only for orthographic projection, not freehand work',
      ],
      answer: 0,
      explanation: 'Blocking-in means sketching a light bounding box (and subdividing it) first, so the overall proportions and placement of the object are correct before any detail is added. CAPS specifically assesses this skill for Grade 10.',
    },
    {
      text: 'Even without a ruler, a freehand drawing still follows which line-type convention?',
      options: [
        'The same SANS A/B/C line types used in instrument drawing',
        'No line-type convention applies to freehand work',
        'Only Type A lines are ever used',
        'A special freehand-only line-type system',
      ],
      answer: 0,
      explanation: 'Freehand drawings still use Type A (outlines), Type B (dimensions/writing) and Type C (construction/guidelines) — the same SANS 0111/0143 conventions used in instrument drawing.',
    },
    {
      text: 'A chain line made up of a long dash, then a short dash, repeating, is used for:',
      options: [
        'Centre lines and centre points of circles',
        'Visible outlines',
        'Hidden detail',
        'Dimension lines only',
      ],
      answer: 0,
      explanation: 'The long-short-long-short "chain line" marks centre lines and the centre points of circles — you should be able to recognise and draw this pattern freehand, not just with instruments.',
    },
    {
      text: 'On a raster (square) grid, what is the main benefit of sketching an object across a fixed number of grid squares?',
      options: [
        'It makes it easy to keep width-to-height proportions accurate by counting squares',
        'It forces every drawing to be exactly square',
        'It replaces the need for line types',
        'It only works for circular objects',
      ],
      answer: 0,
      explanation: 'Counting grid squares lets you transfer an object\'s proportions (e.g. "3 squares wide, 2 squares tall") accurately without measuring instruments — the grid does the proportion-checking for you.',
    },
    {
      text: 'An isometric (30°) grid is specifically useful for freehand sketching because it:',
      options: [
        'Keeps the three isometric axes (vertical, and 30° left/right) consistent, so pictorial sketches look proportioned in 3D',
        'Is only used for lettering practice',
        'Replaces orthographic projection entirely',
        'Is identical to a square raster grid',
      ],
      answer: 0,
      explanation: 'Isometric drawing uses one vertical axis and two axes at 30° to the horizontal. A pre-printed 30° grid keeps those three directions consistent while you sketch, which is very hard to judge freehand with no guide at all.',
    },
  ];

  // ── Grid generators (Type C guide lines, reused by the raster/isometric sheets) ──
  function squareGridLines(w, h, spacing) {
    const lines = [];
    for (let x = 0; x <= w + 0.01; x += spacing) lines.push({ kind: 'line', p1: [x, 0], p2: [x, h], lineType: 'C' });
    for (let y = 0; y <= h + 0.01; y += spacing) lines.push({ kind: 'line', p1: [0, y], p2: [w, y], lineType: 'C' });
    return lines;
  }

  function isoGridLines(w, h, spacing) {
    const lines = [];
    for (let x = 0; x <= w + 0.01; x += spacing) lines.push({ kind: 'line', p1: [x, 0], p2: [x, h], lineType: 'C' });
    const rad = 30 * Math.PI / 180;
    const reach = h * 1.8 + spacing;
    const dx = Math.cos(rad) * reach, dy = Math.sin(rad) * reach;
    for (let x0 = -reach; x0 <= w + reach; x0 += spacing) {
      lines.push({ kind: 'line', p1: [x0 - dx, 0 + dy], p2: [x0 + dx, 0 - dy], lineType: 'C' }); // rising left-to-right (+30°)
      lines.push({ kind: 'line', p1: [x0 - dx, 0 - dy], p2: [x0 + dx, 0 + dy], lineType: 'C' }); // falling left-to-right (-30°/150°)
    }
    return lines;
  }

  // One row per character (like a real lettering worksheet): a light Type C cap-height/baseline
  // guideline pair spanning the full row, a handful of printed examples on the left to copy, and
  // the rest of the guideline left blank so the student continues the row freehand by hand.
  function letteringSheetReveals() {
    const W = 200, rowH = 7, letterSize = 5, repeatCount = 6, spacing = 9, startX = 6;
    const reveals = [];
    let row = 0;
    function addRow(char) {
      const yBase = 16 + row * rowH;
      const yCap = yBase - letterSize;
      reveals.push({ kind: 'line', p1: [0, yCap], p2: [W, yCap], lineType: 'C' });
      reveals.push({ kind: 'line', p1: [0, yBase], p2: [W, yBase], lineType: 'C' });
      for (let i = 0; i < repeatCount; i++) {
        reveals.push({ kind: 'label', at: [startX + i * spacing, yBase], text: char, size: letterSize, anchor: 'start', color: '#e8eaf2' });
      }
      row++;
    }
    reveals.push({ kind: 'label', at: [0, 8], text: 'CAPITAL LETTERS — SINGLE-STROKE, SANS 0111', size: 4, anchor: 'start', color: '#fde047' });
    for (let c = 65; c <= 90; c++) addRow(String.fromCharCode(c));
    row += 1; // blank gap row before numerals
    reveals.push({ kind: 'label', at: [0, 16 + row * rowH - letterSize - 3], text: 'NUMERALS', size: 4, anchor: 'start', color: '#fde047' });
    for (let c = 48; c <= 57; c++) addRow(String.fromCharCode(c));
    return { reveals, width: W, height: 16 + row * rowH + 6 };
  }

  // ── Reference-object icons (small, deliberately simple line art) ──

  // A "roller": circular front view with a bored hole, centre lines, plus a side view with hidden (dashed) bore.
  function rollerIcon(ox, oy) {
    const R = 15, r = 5;
    const cx = ox + R, cy = oy + R;
    const reveals = [
      { kind: 'circle', center: [cx, cy], r: R, lineType: 'A' },
      { kind: 'circle', center: [cx, cy], r: r, lineType: 'A' },
      { kind: 'line', p1: [cx - R - 4, cy], p2: [cx + R + 4, cy], lineType: 'centre' },
      { kind: 'line', p1: [cx, cy - R - 4], p2: [cx, cy + R + 4], lineType: 'centre' },
    ];
    const sx = cx + R + 18, sy = cy;
    const sw = 20, sh = R * 2;
    reveals.push(
      { kind: 'polygon', points: [[sx, sy - sh / 2], [sx + sw, sy - sh / 2], [sx + sw, sy + sh / 2], [sx, sy + sh / 2]], lineType: 'A' },
      { kind: 'line', p1: [sx - 4, sy], p2: [sx + sw + 4, sy], lineType: 'centre' },
      { kind: 'line', p1: [sx, sy - r], p2: [sx + sw, sy - r], lineType: 'hidden' },
      { kind: 'line', p1: [sx, sy + r], p2: [sx + sw, sy + r], lineType: 'hidden' }
    );
    return reveals;
  }

  // A stepped bracket: an L-shaped stepped profile with a hidden hole and a centre line.
  function steppedBracketIcon(ox, oy) {
    const pts = [
      [ox, oy + 34], [ox, oy + 10], [ox + 14, oy + 10], [ox + 14, oy],
      [ox + 44, oy], [ox + 44, oy + 34],
    ];
    const holeX = ox + 30, holeY = oy + 20, holeR = 4;
    return [
      { kind: 'polygon', points: pts, lineType: 'A' },
      { kind: 'circle', center: [holeX, holeY], r: holeR, lineType: 'hidden' },
      { kind: 'line', p1: [holeX - holeR - 4, holeY], p2: [holeX + holeR + 4, holeY], lineType: 'centre' },
      { kind: 'line', p1: [holeX, holeY - holeR - 4], p2: [holeX, holeY + holeR + 4], lineType: 'centre' },
    ];
  }

  // A simple side-view car silhouette (flat 2D icon, not pre-projected — the student sketches it pictorially).
  function carIcon(ox, oy) {
    const body = [
      [ox, oy + 22], [ox, oy + 14], [ox + 10, oy + 14], [ox + 16, oy], [ox + 40, oy],
      [ox + 46, oy + 14], [ox + 58, oy + 14], [ox + 58, oy + 22], [ox, oy + 22],
    ];
    return [
      { kind: 'polyline', points: body, lineType: 'A' },
      { kind: 'circle', center: [ox + 14, oy + 22], r: 5, lineType: 'A' },
      { kind: 'circle', center: [ox + 46, oy + 22], r: 5, lineType: 'A' },
    ];
  }

  // A simple lever (first-class): fulcrum triangle, beam, and a load block — a basic "simple machine".
  function leverMachineIcon(ox, oy) {
    const fulcrumX = ox + 30, baseY = oy + 30;
    return [
      { kind: 'polygon', points: [[fulcrumX - 8, baseY], [fulcrumX + 8, baseY], [fulcrumX, baseY - 14]], lineType: 'A' },
      { kind: 'line', p1: [ox, baseY - 20], p2: [ox + 60, baseY - 8], lineType: 'A' },
      { kind: 'polygon', points: [[ox + 2, baseY - 30], [ox + 14, baseY - 30], [ox + 14, baseY - 21], [ox + 2, baseY - 21]], lineType: 'A' },
      { kind: 'line', p1: [ox, baseY], p2: [ox + 60, baseY], lineType: 'centre' },
    ];
  }

  // ── Workbook / print sheets ──
  const WORKBOOK_SHEETS = {};

  (function () {
    const lettering = letteringSheetReveals();
    WORKBOOK_SHEETS['lettering'] = {
      id: 'lettering',
      title: 'Lettering Practice',
      workbookPrompt: 'Each row has a guideline pair (cap-height and baseline) and a few printed examples on the left. Continue the row freehand along the same guideline, keeping every letter the same height, evenly spaced, in single confident strokes.',
      bounds: { w: lettering.width, h: lettering.height },
      steps: [{ id: 1, reveals: lettering.reveals }],
    };
  })();

  WORKBOOK_SHEETS['line-types'] = {
    id: 'line-types',
    title: 'Line Types Practice',
    workbookPrompt: 'For each row, copy the example on the left in the blank space, repeating that exact line type freehand all the way across the guide strip.',
    bounds: { w: 200, h: 170 },
    steps: [{
      id: 1,
      reveals: [
        { kind: 'label', at: [4, 10], text: 'A — continuous thick (outlines)', size: 5.5, anchor: 'start', color: '#fde047' },
        { kind: 'line', p1: [4, 16], p2: [50, 16], lineType: 'A' },
        { kind: 'line', p1: [4, 26], p2: [200, 26], lineType: 'construction' },

        { kind: 'label', at: [4, 42], text: 'B — continuous medium (dimensions & writing)', size: 5.5, anchor: 'start', color: '#fde047' },
        { kind: 'line', p1: [4, 48], p2: [50, 48], lineType: 'B' },
        { kind: 'line', p1: [4, 58], p2: [200, 58], lineType: 'construction' },

        { kind: 'label', at: [4, 74], text: 'C — continuous thin (construction & guidelines)', size: 5.5, anchor: 'start', color: '#fde047' },
        { kind: 'line', p1: [4, 80], p2: [50, 80], lineType: 'C' },
        { kind: 'line', p1: [4, 90], p2: [200, 90], lineType: 'construction' },

        { kind: 'label', at: [4, 106], text: 'Centre / chain (long-short-long-short)', size: 5.5, anchor: 'start', color: '#fde047' },
        { kind: 'line', p1: [4, 112], p2: [50, 112], lineType: 'centre' },
        { kind: 'line', p1: [4, 122], p2: [200, 122], lineType: 'construction' },

        { kind: 'label', at: [4, 138], text: 'Hidden / broken (short dashes)', size: 5.5, anchor: 'start', color: '#fde047' },
        { kind: 'line', p1: [4, 144], p2: [50, 144], lineType: 'hidden' },
        { kind: 'line', p1: [4, 154], p2: [200, 154], lineType: 'construction' },
      ],
    }],
  };

  WORKBOOK_SHEETS['raster-grid'] = {
    id: 'raster-grid',
    title: 'Raster Grid — Multi-View Sketching',
    workbookPrompt: 'Using the square grid, freehand-sketch each reference object as a front view AND a side view, counting grid squares to keep proportions accurate. Include centre lines and hidden detail where shown.',
    bounds: { w: 240, h: 190 },
    referenceBounds: { w: 150, h: 46 },
    referenceReveals: [...rollerIcon(4, 6), ...steppedBracketIcon(96, 6)],
    steps: [{
      id: 1,
      reveals: squareGridLines(240, 190, 10),
    }],
  };

  WORKBOOK_SHEETS['isometric-grid'] = {
    id: 'isometric-grid',
    title: 'Isometric Grid — Pictorial Sketching',
    workbookPrompt: 'Using the 30° isometric grid, freehand-sketch each reference object pictorially (in 3D), keeping every edge along one of the three grid directions: vertical, or 30° left/right.',
    bounds: { w: 240, h: 190 },
    referenceBounds: { w: 145, h: 40 },
    referenceReveals: [...carIcon(4, 4), ...leverMachineIcon(76, 2)],
    steps: [{
      id: 1,
      reveals: isoGridLines(240, 190, 10),
    }],
  };

  global.PRACTICE_QUESTIONS = PRACTICE_QUESTIONS;
  global.WORKBOOK_SHEETS = WORKBOOK_SHEETS;
  global.WORKBOOK_ORDER = ['lettering', 'line-types', 'raster-grid', 'isometric-grid'];
})(window);
