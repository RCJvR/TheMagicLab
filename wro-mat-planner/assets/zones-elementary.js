// WRO 2026 Robot Rockstars — zone definitions
// All coordinates are in mm with origin (0,0) at the top-left of the mat.
// Auto-detected from the official printing PNG by colour and cross-checked
// against the WRO 2026 Elementary game rules.

window.WRO_MAT = {
  width:  2362,
  height: 1143,
  tolerance: 5,

  // Robot constraints (General Rules §5.1)
  robotMaxSize: 250,

  // Snap step for clicks (mm)
  snapDefault: 10,
};

window.WRO_ZONES = [
  {
    id: 'start',
    name: 'Start Area',
    desc: 'Robot start position — WRO RoboMission card on the right edge.',
    rule: 'Rules §3 Game Field; Robot must fit in 250×250×250 mm cube (§5.1).',
    klass: 'start',
    type: 'rect',
    x: 2038.7, y: 435.0, w: 273.2, h: 273.0,
    label: { x: 2175, y: 412, anchor: 'middle', text: 'START AREA' },
    sub:   { x: 2175, y: 730, anchor: 'middle', text: '≈ 273 × 273 mm' },
    centre: { x: 2175, y: 571 }
  },
  {
    id: 'cable_upper',
    name: 'Cable target (upper)',
    desc: 'Light-grey rectangle on the stage (top-left).',
    rule: 'Rules §3.1 — place cables in the grey areas. 15 pts each (max 30).',
    klass: 'cable',
    type: 'rect',
    x: 20.1, y: 98.4, w: 113.6, h: 216.6,
    label: { x: 155, y: 200, anchor: 'start', text: 'CABLE TARGET (upper)' },
    leader: { x1: 135, y1: 207, x2: 153, y2: 200 },
    centre: { x: 77, y: 207 }
  },
  {
    id: 'cable_lower',
    name: 'Cable target (lower)',
    desc: 'Light-grey rectangle on the stage (bottom-left).',
    rule: 'Rules §3.1 — place cables in the grey areas. 15 pts each (max 30).',
    klass: 'cable',
    type: 'rect',
    x: 20.1, y: 484.7, w: 113.3, h: 216.3,
    label: { x: 155, y: 595, anchor: 'start', text: 'CABLE TARGET (lower)' },
    leader: { x1: 135, y1: 592, x2: 153, y2: 595 },
    centre: { x: 77, y: 593 }
  },
  {
    id: 'mic_target',
    name: 'Microphone target',
    desc: 'Light-green (chartreuse) square in the centre of the stage.',
    rule: 'Rules §3.2 footnote — "the microphone target area is the light green area on the stage". 20 pts.',
    klass: 'target',
    type: 'rect',
    x: 220.1, y: 352.4, w: 79.4, h: 94.9,
    label: { x: 335, y: 385, anchor: 'start', text: 'MIC TARGET' },
    sub:   { x: 335, y: 408, anchor: 'start', text: '(light-green sq)' },
    leader: { x1: 300, y1: 395, x2: 333, y2: 382 },
    centre: { x: 260, y: 400 }
  },
  {
    id: 'backstage',
    name: 'Backstage area',
    desc: 'Pink area in the bottom-left corner — instruments target.',
    rule: 'Rules §3.2 footnote — pink area only, NOT including grey border. 15 pts/instrument (max 45).',
    klass: 'stage',
    type: 'rect',
    x: 0, y: 825.5, w: 393.4, h: 317.1,
    label: { x: 195, y: 1115, anchor: 'middle', text: 'BACKSTAGE AREA' },
    sub:   { x: 195, y: 1135, anchor: 'middle', text: '(instruments target)' },
    centre: { x: 196, y: 984 }
  },
  {
    id: 'notes_start',
    name: 'Notes start area',
    desc: '6 squares along the top edge. 4 light-green (random: black/white/yellow/blue) + red & dark-green fixed.',
    rule: 'Rules §3 page 5 / page 7.',
    klass: 'notes',
    type: 'rect',
    x: 1180, y: 60, w: 760, h: 100,
    label: { x: 1560, y: 50, anchor: 'middle', text: 'NOTES START AREA · 4 random + red & green fixed' },
    centre: { x: 1560, y: 110 }
  },
  {
    id: 'notes_target',
    name: 'Notes target area',
    desc: 'Staff lines with 6 colour-matched note targets. Each square has a grey border.',
    rule: 'Rules §3.3 — notes must be completely in the matching colour target including grey border. 20 pts each (max 120).',
    klass: 'notes',
    type: 'rect',
    x: 810, y: 380, w: 1090, h: 305,
    label: { x: 1355, y: 710, anchor: 'middle', text: 'NOTES TARGET AREA · staff lines (6 colours)' },
    centre: { x: 1355, y: 532 }
  },
  {
    id: 'truck',
    name: 'Truck (instruments + microphone start)',
    desc: 'Pink van + 2 trailers carrying the 3 instruments and the microphone.',
    rule: 'Rules §3 page 4 — starting positions for instruments & microphone.',
    klass: 'target',
    type: 'rect',
    x: 1000, y: 985, w: 660, h: 130,
    label: { x: 1330, y: 975, anchor: 'middle', text: 'INSTRUMENTS & MICROPHONE START · truck' },
    centre: { x: 1330, y: 1050 }
  },
  {
    id: 'clef',
    name: 'Clef start',
    desc: 'Cyan square at the left end of the staff lines.',
    rule: 'Rules §3 page 6 — "in the middle on the left end of the staff lines". Bonus +10 pts if not moved/damaged (§3.4).',
    klass: 'stage',
    type: 'rect',
    x: 829.8, y: 577.1, w: 47.6, h: 31.4,
    label: { x: 775, y: 555, anchor: 'middle', text: 'CLEF START' },
    leader: { x1: 830, y1: 585, x2: 780, y2: 562 },
    centre: { x: 854, y: 593 }
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
