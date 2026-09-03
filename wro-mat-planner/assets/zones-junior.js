// WRO 2026 RoboMission Junior — "Heritage Heroes" — zone definitions
// All coordinates are in mm with origin (0,0) at the TOP-LEFT of the mat,
// x to the right, y downward — the same frame zones-senior.js and
// zones-elementary.js use, and the frame every tool on the page assumes.
//
// STATUS: mat dimensions below are real (General Rules §7.2 gives every
// RoboMission age category the same 2362 x 1143 field, which is why the
// Elementary and Senior files carry these exact numbers). WRO_ZONES is
// deliberately EMPTY rather than filled with plausible-looking guesses:
// the call-outs are only useful if they match the printed mat to the
// millimetre, and inventing them would put wrong coordinates on screen
// that look authoritative. Populate it from the official materials —
// see "HOW TO POPULATE" below.
//
// Everything on the page that does NOT depend on zone data already works
// with this file as-is: the grid, ruler, distance/path/angle tools, robot
// footprint and pose, saved paths, code export, and the PyBricks route
// importer and simulator. An empty list simply draws no call-outs.

window.WRO_MAT = {
  width:  2362,
  height: 1143,
  tolerance: 5,

  // Robot constraints (General Rules §5.1). Carried over from the other two
  // categories — confirm against the Junior rules for your season.
  robotMaxSize: 250,

  // Snap step for clicks (mm)
  snapDefault: 10,
};

// HOW TO POPULATE
// ---------------
// 1. Save the official WRO 2026 RoboMission Junior game mat printing file as
//    img/gamemat-junior.jpg (the other two categories' files live beside it).
//    The mat photo is not only decoration: the route simulator's colour
//    sensor samples pixels straight out of it (see sampleMatPixel() in
//    program.js), so colour-stop line following needs the real artwork.
//
// 2. For each named area in the Junior game rules, add an entry below. The
//    Elementary and Senior files' coordinates were obtained by colour-region
//    analysis of the printing file and then cross-checked against the rules
//    text, which is the approach to repeat here — measuring off the rendered
//    page by eye will not be accurate enough to plan against.
//
//    To convert a pixel box in the printing file to mm:
//        x_mm = x_px * (2362 / image_natural_width)
//        y_mm = y_px * (1143 / image_natural_height)
//
// 3. Entry format (see zones-senior.js for worked examples):
//
//    {
//      id:     'start',                       // unique, referenced by tooling
//      name:   'Start area',                  // shown in the zone list
//      desc:   'What the area physically is.',
//      rule:   'Rules §3.1 — what it scores.', // cite the section
//      klass:  'start',                       // CSS class -> colour. Existing
//                                             // classes: start, cable, tool,
//                                             // frame, cement, parking
//      type:   'rect',                        // 'rect' | 'circle' | 'poly'
//      x: 61.4, y: 831.9, w: 249.8, h: 249.7, // mm, top-left origin
//      label:  { x: 186, y: 815, anchor: 'middle', text: 'START AREA' },
//      sub:    { x: 186, y: 1100, anchor: 'middle', text: '≈250×250mm' }, // optional
//      leader: { x1: 266, y1: 207, x2: 348, y2: 195 },                    // optional
//      centre: { x: 186, y: 957 }             // used for "go to zone" helpers
//    }
//
// 4. Delete the "Setup needed" notice block from junior.html once both the
//    image and the zones are in (the snippet at the bottom of this file
//    hides it automatically as soon as WRO_ZONES is non-empty).

window.WRO_ZONES = [
  // ← Junior zone call-outs go here. See HOW TO POPULATE above.
];

// Robot size presets for the ROBOT/POSE tools and the route walker's
// footprint. Mirrors zones-elementary.js/zones-senior.js's list exactly --
// this is required by app.js/tools.js (WRO_ROBOT_PROFILES.filter/.find),
// not optional decoration, so the page throws on load without it.
// "WRO max (250 mm cube)" carries over General Rules §5.1's robot size
// limit from the other two categories -- confirm it's the same number for
// Junior in your season's rules before relying on it (the Senior file
// carries this same caveat).
window.WRO_ROBOT_PROFILES = [
  { id: 'custom',    name: 'Custom (set size →)',       size: 220, custom: true },
  { id: 'wro250',    name: 'WRO max (250 mm cube)',     size: 250 },
  { id: 'spike',     name: 'LEGO Spike Prime (~200 mm)', size: 200 },
  { id: 'ev3',       name: 'LEGO EV3 (~250 mm)',         size: 250 },
  { id: 'small',     name: 'Compact (~180 mm)',          size: 180 },
];

// Hide the page's "Setup needed" banner automatically once this file has
// real zones in it, so the notice can't outlive the thing it's asking for.
// Kept here rather than in the shared app.js because it is junior-only.
document.addEventListener('DOMContentLoaded', function () {
  if (window.WRO_ZONES && window.WRO_ZONES.length) {
    const notice = document.getElementById('juniorSetupNotice');
    if (notice) notice.style.display = 'none';
  }
});
