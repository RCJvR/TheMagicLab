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
  // The 6 printed pickup squares in each tile-colour zone aren't evenly
  // distributed across the zone (grid() above) -- traced from the official
  // printing file at full resolution (27898x13500, ~10.7x this data's
  // working copy): each square is 31.7x31.7mm, flush with the zone's
  // top-left corner, on a 63.8mm grid (one tile-width of gap between
  // squares). Offsets are relative to the zone's own x/y so they apply to
  // all 4 colour zones, which share the same internal layout.
  function tileGrid(zoneId) {
    const z = zone(zoneId);
    const colOffsets = [16, 80, 144];
    const rowOffsets = [16, 80];
    const pts = [];
    rowOffsets.forEach(ry => colOffsets.forEach(rx => pts.push({ x: z.x + rx, y: z.y + ry })));
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
    tileGrid('tiles_' + colour).forEach((p, i) => {
      tiles.push({ id: `tile_${colour}_${i}`, colour, x: p.x, y: p.y });
    });
  });

  const cement = [];
  CEMENT_COLOURS.forEach((colour, ci) => {
    scatter('cement_' + colour, 10, 91 + ci * 17).forEach((p, i) => {
      cement.push({ id: `cement_${colour}_${i}`, colour, x: p.x, y: p.y });
    });
  });

  // Exact 4x3 pocket layout traced from the official 3D-print file (the
  // "3d-files" link in the rules PDF -> WRO-2026-RoboMission-Senior-3D-
  // Printing.zip -> "Template without logo.stl"): parsed the mesh directly
  // (binary STL, painter's-algorithm top-down height render) to find 12
  // square pockets, each 33.6x33.6mm, on a clean 50mm grid -- local coords
  // (33,83,133,183) x (33,83,133) from the mesh's own bounding-box corner.
  // That corner maps 1:1 onto mosaic_frame_mount's top-left, since the
  // mesh's overall footprint (216.6x166.6mm) matches the mount zone
  // (216.1x165.9mm) almost exactly. The paper pattern under the frame (not
  // this geometry) decides each pocket's *colour* each round -- that's what
  // the mosaicPattern configurator in program.js is for.
  const FRAME_POCKET_MM = 33.6;
  const frameSlots = [];
  {
    const mount = zone('mosaic_frame_mount');
    const localXs = [33, 83, 133, 183];
    const localYs = [33, 83, 133];
    let i = 0;
    localYs.forEach(ly => {
      localXs.forEach(lx => {
        frameSlots.push({ id: `slot_${i}`, index: i, x: mount.x + lx, y: mount.y + ly });
        i++;
      });
    });
  }

  // Footprints traced from the official printing file at full resolution
  // (27898x13500 source, not the 2600px working copy -- confirmed clean,
  // un-tapered edges at that resolution where the working copy's JPEG
  // blur had made them ambiguous), matching each pad's actual grey fill,
  // not its wooden-pallet border:
  //  - trowel_rect and cement_bowl are plain rectangles/squares.
  //  - trowel_masonry's pad is a genuine 3-tier staircase, not a
  //    rectangle -- confirmed two ways: the pad's own pixel outline, and
  //    the official building instructions (WRO-2026-RM-Senior-BI-All.pdf),
  //    which show it built as a stepped white base with an angled red
  //    handle (the rectangular trowel is a flat blade + straight handle
  //    by contrast). `points` are relative to (x,y), clockwise from the
  //    shortest tier's top-left corner.
  const tools = [
    { id: 'trowel_rect', name: 'Rectangular trowel', scoringId: 'trowel_rect', target: 'sponsor_area',
      shape: 'rect', x: 893, y: 1061, w: 127, h: 64 },
    { id: 'cement_bowl', name: 'Cement bowl', scoringId: 'cement_bowl', target: 'parking_area',
      shape: 'rect', x: 1181, y: 1061, w: 32, h: 32 },
    { id: 'trowel_masonry', name: 'Masonry trowel', scoringId: 'trowel_masonry', target: 'start',
      shape: 'polygon', x: 1488, y: 1061, w: 86, h: 80,
      points: [
        { x: -43, y: -24 }, { x: -14, y: -24 }, { x: -14, y: -32 }, { x: 15, y: -32 },
        { x: 15, y: -40 }, { x: 43, y: -40 }, { x: 43, y: 40 }, { x: 15, y: 40 },
        { x: 15, y: 32 }, { x: -14, y: 32 }, { x: -14, y: 24 }, { x: -43, y: 24 },
      ] },
  ];

  return {
    tiles, cement, frameSlots, tools, TILE_COLOURS, CEMENT_COLOURS,
    FRAME_POCKET_MM,
    frameOuter: zone('mosaic_frame_mount'), // outer footprint for the frame graphic itself
  };
})();
