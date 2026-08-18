// WRO 2026 Senior "Mosaic Masters" — game element positions for the
// simulated-run feature (pick up tiles/cement/tools, place them, watch the
// scoring estimator fill in as you step through the route).
// Depends on window.WRO_ZONES (zones-senior.js) being loaded first.
// Senior-only for now -- Elementary has no equivalent and doesn't load this
// file, so window.WRO_ELEMENTS is simply undefined there.
//
// Tool pickup pad positions (3 grey pads at the bottom of the field) were
// located by colour-analysing the official printing file the same way the
// zones/barriers were: WRO-2026-RoboMission-Senior-Game-Rules.pdf §3
// confirms all three tools "are place[d] on the bottom end of the game
// field" rather than starting attached to the robot.

window.WRO_ELEMENTS = (function() {
  function zone(id) {
    const z = window.WRO_ZONES.find(z => z.id === id);
    if (!z) throw new Error('WRO_ELEMENTS: missing zone "' + id + '"');
    return z;
  }
  function grid(zoneId, cols, rows, marginPct) {
    const z = zone(zoneId);
    const mx = z.w * marginPct, my = z.h * marginPct;
    const innerW = z.w - 2 * mx, innerH = z.h - 2 * my;
    const pts = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pts.push({
          x: z.x + mx + (cols === 1 ? innerW / 2 : innerW * c / (cols - 1)),
          y: z.y + my + (rows === 1 ? innerH / 2 : innerH * r / (rows - 1)),
        });
      }
    }
    return pts;
  }
  // Rules: cement elements are "randomly placed... and can even be stacked".
  // A deterministic jittered scatter (seeded PRNG, not Math.random) reads
  // better for a shared planning reference than a literal live-random one --
  // re-opening the page shouldn't reshuffle the layout you planned against.
  function scatter(zoneId, count, seed) {
    const z = zone(zoneId);
    let s = seed;
    function rnd() { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s % 1000) / 1000; }
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: z.x + z.w * (0.12 + 0.76 * rnd()),
        y: z.y + z.h * (0.12 + 0.76 * rnd()),
      });
    }
    return pts;
  }

  const TILE_COLOURS = ['white', 'green', 'blue', 'yellow'];
  const CEMENT_COLOURS = ['yellow', 'green', 'blue', 'white'];

  const tiles = [];
  TILE_COLOURS.forEach(colour => {
    grid('tiles_' + colour, 3, 2, 0.18).forEach((p, i) => {
      tiles.push({ id: `tile_${colour}_${i}`, colour, x: p.x, y: p.y });
    });
  });

  const cement = [];
  CEMENT_COLOURS.forEach((colour, ci) => {
    scatter('cement_' + colour, 10, 91 + ci * 17).forEach((p, i) => {
      cement.push({ id: `cement_${colour}_${i}`, colour, x: p.x, y: p.y });
    });
  });

  // 4x3 grid inside the frame mount -- the real 12-slot layout depends on
  // the paper pattern placed under the frame that round, which the
  // configurator (mosaicPattern in program.js) lets you set to match.
  const frameSlots = grid('mosaic_frame_mount', 4, 3, 0.10).map((p, i) => ({
    id: `slot_${i}`, index: i, x: p.x, y: p.y,
  }));

  // w/h are the tool's own footprint, sized to match the grey pickup pad it
  // sits on exactly (re-measured by isolating each pad's fill colour from
  // the surrounding wood-pallet border and pavement, not just the pallet's
  // outer edge -- the cement bowl's pad in particular is much smaller than
  // its wooden pallet).
  const tools = [
    { id: 'trowel_rect',    name: 'Rectangular trowel', scoringId: 'trowel_rect',    target: 'sponsor_area', x: 892,  y: 1061, w: 124, h: 61 },
    { id: 'cement_bowl',    name: 'Cement bowl',         scoringId: 'cement_bowl',    target: 'parking_area', x: 1181, y: 1060, w: 34,  h: 33 },
    { id: 'trowel_masonry', name: 'Masonry trowel',      scoringId: 'trowel_masonry', target: 'start',        x: 1506, y: 1070, w: 116, h: 78 },
  ];

  return { tiles, cement, frameSlots, tools, TILE_COLOURS, CEMENT_COLOURS };
})();
