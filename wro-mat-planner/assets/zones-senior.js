// WRO 2026 RoboMission Senior — "Mosaic Masters" — zone definitions
// All coordinates are in mm with origin (0,0) at the top-left of the mat.
// Detected from the official printing file (gamemat-senior.jpg) by colour
// region analysis and cross-checked against the official WRO 2026 Senior
// Game Rules (wro-association.org, version Jan 15 2026).
//
// NOTE: robotMaxSize below is carried over from the 2026 Elementary rules.
// The Senior general rules mention "some robot limitations have changed for
// 2026" without stating the number on the pages we parsed — double-check the
// current WRO RoboMission General Rules §5.1 for your season before relying
// on this figure.

window.WRO_MAT = {
  width:  2362,
  height: 1143,
  tolerance: 5,

  robotMaxSize: 250,

  snapDefault: 10,
};

window.WRO_ZONES = [
  // ---- Start area (also the Masonry trowel target) ----
  {
    id: 'start',
    name: 'Start area',
    desc: 'White square with the WRO / RoboMission Senior 2026 "Mosaic Masters" placard, blue border. Robot starts here.',
    rule: 'Rules §3.1 — "the start area is the white area where the robot starts, without the blue border." Masonry trowel: 15 pts completely in, 5 pts partly in (max 15).',
    klass: 'start',
    type: 'rect',
    x: 61.4, y: 831.9, w: 249.8, h: 249.7,
    label: { x: 186, y: 815, anchor: 'middle', text: 'START AREA' },
    sub:   { x: 186, y: 1100, anchor: 'middle', text: 'masonry trowel target · ≈250×250mm' },
    centre: { x: 186, y: 957 }
  },

  // ---- Tool targets ----
  {
    id: 'sponsor_area',
    name: 'Sponsor area',
    desc: 'White area with WRO Premium/Gold Partner logos (aramco, MathWorks, fischertechnik, ROBOROBO), bottom edge of the mat.',
    rule: 'Rules §3.1 — "the sponsor area is the white area with the logos next to the start area." Rectangular trowel: 15 pts completely in, 5 pts partly in (max 15).',
    klass: 'target',
    type: 'rect',
    x: 490.1, y: 973.0, w: 219.7, h: 170.0,
    label: { x: 600, y: 958, anchor: 'middle', text: 'SPONSOR AREA' },
    sub:   { x: 600, y: 1130, anchor: 'middle', text: 'rectangular trowel target' },
    centre: { x: 600, y: 1058 }
  },
  {
    id: 'parking_area',
    name: 'Parking space',
    desc: 'Whole brown-paved area including the cars, pool and palm trees, right-of-centre on the mat.',
    rule: 'Rules §3.1 — "the parking space is the whole brown area including the cars, pool, palm trees, etc." Cement bowl: 15 pts completely in, 5 pts partly in (max 15).',
    klass: 'target',
    type: 'rect',
    x: 1594.9, y: 521.3, w: 185.4, h: 297.6,
    label: { x: 1687, y: 505, anchor: 'middle', text: 'PARKING SPACE' },
    sub:   { x: 1687, y: 835, anchor: 'middle', text: 'cement bowl target' },
    centre: { x: 1687, y: 670 }
  },

  // ---- Mosaic tile storage (24 tiles: 6 each colour, left edge of mat) ----
  {
    id: 'tiles_white',
    name: 'Mosaic tiles · white (×6)',
    desc: '2×3 grid of white mosaic-tile pickup squares on the grey pad, left edge of the mat.',
    rule: 'Rules §3 p.5 — 24 mosaic tiles (6 yellow, 6 blue, 6 green, 6 white) start at the left end; more tiles than needed to solve the mission.',
    klass: 'cable',
    type: 'rect',
    x: 106.9, y: 159.4, w: 159.4, h: 95.1,
    label: { x: 350, y: 190, anchor: 'start', text: 'MOSAIC TILES · WHITE' },
    leader: { x1: 266, y1: 207, x2: 348, y2: 195 },
    centre: { x: 187, y: 207 }
  },
  {
    id: 'tiles_green',
    name: 'Mosaic tiles · green (×6)',
    desc: '2×3 grid of green mosaic-tile pickup squares on the grey pad.',
    rule: 'Rules §3 p.5 — see tiles_white.',
    klass: 'cable',
    type: 'rect',
    x: 106.9, y: 318.2, w: 159.4, h: 96.2,
    label: { x: 350, y: 372, anchor: 'start', text: 'MOSAIC TILES · GREEN' },
    leader: { x1: 266, y1: 366, x2: 348, y2: 372 },
    centre: { x: 187, y: 366 }
  },
  {
    id: 'tiles_blue',
    name: 'Mosaic tiles · blue (×6)',
    desc: '2×3 grid of blue mosaic-tile pickup squares on the grey pad.',
    rule: 'Rules §3 p.5 — see tiles_white.',
    klass: 'cable',
    type: 'rect',
    x: 106.9, y: 478.2, w: 159.4, h: 95.6,
    label: { x: 350, y: 531, anchor: 'start', text: 'MOSAIC TILES · BLUE' },
    leader: { x1: 266, y1: 526, x2: 348, y2: 531 },
    centre: { x: 187, y: 526 }
  },
  {
    id: 'tiles_yellow',
    name: 'Mosaic tiles · yellow (×6)',
    desc: '2×3 grid of yellow mosaic-tile pickup squares on the grey pad.',
    rule: 'Rules §3 p.5 — see tiles_white.',
    klass: 'cable',
    type: 'rect',
    x: 106.9, y: 637.6, w: 159.4, h: 95.6,
    label: { x: 350, y: 691, anchor: 'start', text: 'MOSAIC TILES · YELLOW' },
    leader: { x1: 266, y1: 685, x2: 348, y2: 691 },
    centre: { x: 187, y: 685 }
  },

  // ---- Mosaic frame (middle of the field) ----
  {
    id: 'mosaic_frame_marking',
    name: 'Mosaic frame — orientation marking',
    desc: 'Blue / white / grey / yellow / green marking in the middle of the field showing the frame footprint and orientation.',
    rule: 'Rules §3 p.5 — "there is a mosaic frame on the field. The frame is a 3D-printed object and is placed in the middle of the field. The marking on the field shows the orientation of the frame."',
    klass: 'stage',
    type: 'rect',
    x: 923.0, y: 213.4, w: 516.0, h: 467.0,
    label: { x: 1181, y: 198, anchor: 'middle', text: 'MOSAIC FRAME · ORIENTATION MARKING' },
    centre: { x: 1181, y: 447 }
  },
  {
    id: 'mosaic_frame_mount',
    name: 'Mosaic frame — 3D object mount',
    desc: 'Inner white square, double-sided taped, where the 3D-printed mosaic frame is physically placed. Sits on the mat centreline.',
    rule: 'Rules §3.2 — mosaic tiles are placed correctly when "only touching the corresponding-coloured area in the mosaic frame and standing evenly on the ground." 10 pts/tile, 120 pts max (all 12 slots correct).',
    klass: 'stage',
    type: 'rect',
    x: 1072.9, y: 363.7, w: 216.1, h: 165.9,
    label: { x: 1181, y: 350, anchor: 'middle', text: 'FRAME MOUNT' },
    sub:   { x: 1181, y: 546, anchor: 'middle', text: '(3D object, taped in place)' },
    centre: { x: 1181, y: 447 }
  },

  // ---- Cement target areas (40 elements: 10 each colour, right edge of mat) ----
  {
    id: 'cement_yellow',
    name: 'Cement target · yellow',
    desc: 'Yellow rectangle at the right edge of the mat. Cement elements start (randomised) within their matching colour area.',
    rule: 'Rules §3.3 — "deliver the cement in the corresponding-coloured cement target areas." 1 pt/element completely in, 10 pts/colour, 40 pts max total.',
    klass: 'notes',
    type: 'rect',
    x: 2161.8, y: 86.8, w: 150.0, h: 219.6,
    label: { x: 2145, y: 70, anchor: 'end', text: 'CEMENT · YELLOW' },
    centre: { x: 2237, y: 197 }
  },
  {
    id: 'cement_green',
    name: 'Cement target · green',
    desc: 'Green rectangle at the right edge of the mat.',
    rule: 'Rules §3.3 — see cement_yellow.',
    klass: 'notes',
    type: 'rect',
    x: 2161.8, y: 336.5, w: 150.0, h: 219.6,
    label: { x: 2145, y: 320, anchor: 'end', text: 'CEMENT · GREEN' },
    centre: { x: 2237, y: 446 }
  },
  {
    id: 'cement_blue',
    name: 'Cement target · blue',
    desc: 'Blue rectangle at the right edge of the mat.',
    rule: 'Rules §3.3 — see cement_yellow.',
    klass: 'notes',
    type: 'rect',
    x: 2161.8, y: 586.3, w: 150.0, h: 220.2,
    label: { x: 2145, y: 570, anchor: 'end', text: 'CEMENT · BLUE' },
    centre: { x: 2237, y: 696 }
  },
  {
    id: 'cement_white',
    name: 'Cement target · white',
    desc: 'White rectangle at the right edge of the mat.',
    rule: 'Rules §3.3 — see cement_yellow.',
    klass: 'notes',
    type: 'rect',
    x: 2161.8, y: 836.6, w: 150.0, h: 219.6,
    label: { x: 2145, y: 820, anchor: 'end', text: 'CEMENT · WHITE' },
    centre: { x: 2237, y: 946 }
  },

  // ---- Barriers (obstacles at the 4 corners of the mosaic frame) ----
  // Footprints located by colour analysis and cross-checked against the
  // official reference photo (rules p.6) — LEGO L-shaped walls with a
  // coloured ball on top. Diagonal pairs share a colour: TL/BR are red
  // (blue ball), TR/BL are black (red ball). Scoring is presence-only —
  // "not damaged or moved" — so these are obstacle-avoidance references,
  // not placement targets.
  // Each barrier is a 6-vertex "L" hexagon (~16mm arm thickness), traced
  // from the actual pixel contour rather than a bounding box — the dashed
  // outline now hugs the real LEGO wall shape instead of a loose square.
  {
    id: 'barrier_tl',
    name: 'Barrier · top-left (red / blue ball)',
    desc: 'L-shaped LEGO wall, red bricks with a blue ball on top. Arms run along the top and left edges of the frame\'s top-left corner.',
    rule: 'Rules §3.4 — 7 pts if not damaged or moved (touching the mat outside its grey pad counts as moved). 28 pts max across all 4 barriers.',
    klass: 'barrier',
    type: 'polygon',
    points: [
      { x: 861.6, y: 263.3 }, { x: 861.6, y: 151.8 }, { x: 973.1, y: 151.8 },
      { x: 973.1, y: 135.8 }, { x: 845.6, y: 135.8 }, { x: 845.6, y: 263.3 },
    ],
    label: { x: 845, y: 122, anchor: 'start', text: 'BARRIER · RED' },
    centre: { x: 909, y: 199 }
  },
  {
    id: 'barrier_tr',
    name: 'Barrier · top-right (black / red ball)',
    desc: 'L-shaped LEGO wall, black bricks with a red ball on top. Arms run along the top and right edges of the frame\'s top-right corner.',
    rule: 'Rules §3.4 — see barrier_tl.',
    klass: 'barrier',
    type: 'polygon',
    points: [
      { x: 1500.4, y: 263.3 }, { x: 1500.4, y: 152.4 }, { x: 1388.9, y: 152.4 },
      { x: 1388.9, y: 136.4 }, { x: 1516.4, y: 136.4 }, { x: 1516.4, y: 263.3 },
    ],
    label: { x: 1520, y: 122, anchor: 'end', text: 'BARRIER · BLACK' },
    centre: { x: 1452, y: 199 }
  },
  {
    id: 'barrier_bl',
    name: 'Barrier · bottom-left (black / red ball)',
    desc: 'L-shaped LEGO wall, black bricks with a red ball on top. Arms run along the bottom and left edges of the frame\'s bottom-left corner.',
    rule: 'Rules §3.4 — see barrier_tl.',
    klass: 'barrier',
    type: 'polygon',
    points: [
      { x: 861.6, y: 629.4 }, { x: 861.6, y: 740.9 }, { x: 973.1, y: 740.9 },
      { x: 973.1, y: 756.9 }, { x: 845.6, y: 756.9 }, { x: 845.6, y: 629.4 },
    ],
    label: { x: 845, y: 772, anchor: 'start', text: 'BARRIER · BLACK' },
    centre: { x: 909, y: 693 }
  },
  {
    id: 'barrier_br',
    name: 'Barrier · bottom-right (red / blue ball)',
    desc: 'L-shaped LEGO wall, red bricks with a blue ball on top. Arms run along the bottom and right edges of the frame\'s bottom-right corner.',
    rule: 'Rules §3.4 — see barrier_tl.',
    klass: 'barrier',
    type: 'polygon',
    points: [
      { x: 1500.4, y: 629.4 }, { x: 1516.4, y: 629.4 }, { x: 1516.4, y: 756.9 },
      { x: 1388.9, y: 756.9 }, { x: 1388.9, y: 740.9 }, { x: 1500.4, y: 740.9 },
    ],
    label: { x: 1520, y: 772, anchor: 'end', text: 'BARRIER · RED' },
    centre: { x: 1452, y: 693 }
  },
];

// Common robot profiles (size in mm, square footprint)
window.WRO_ROBOT_PROFILES = [
  { id: 'custom',    name: 'Custom (set size →)',       size: 220, custom: true },
  { id: 'wro250',    name: 'WRO max (250 mm cube)',     size: 250 },
  { id: 'spike',     name: 'LEGO Spike Prime (~200 mm)', size: 200 },
  { id: 'ev3',       name: 'LEGO EV3 (~250 mm)',         size: 250 },
  { id: 'small',     name: 'Compact (~180 mm)',          size: 180 },
];
