// WRO 2026 Game Mat Planner — code export
// Converts paths/poses into starter robot code in several styles.

(function() {
  'use strict';

  const M = window.WRO_TOOLS.math;

  // Convert a list of waypoints into a sequence of (heading, drive_dist, turn_deg) actions.
  // Assumes the robot starts facing "north" (0°) unless a starting heading is provided.
  function pathToActions(points, startHeading) {
    const actions = [];
    if (points.length < 2) return actions;

    let currentHeading = (startHeading == null) ? 0 : startHeading;
    let prevAng = currentHeading;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i], b = points[i+1];
      const segBearing = M.bearing(a, b);
      let turn = segBearing - currentHeading;
      // Normalise turn to [-180, 180]
      while (turn >  180) turn -= 360;
      while (turn < -180) turn += 360;
      if (Math.abs(turn) > 0.5) {
        actions.push({ kind: 'turn', deg: turn, fromHeading: currentHeading, toHeading: segBearing });
      }
      const d = M.dist(a, b);
      actions.push({ kind: 'forward', mm: d, atHeading: segBearing });
      currentHeading = segBearing;
    }
    return actions;
  }

  function generatePython(paths, opts) {
    const robotSize = opts.robotSize || 250;
    let out = '';
    out += `# ${document.title || 'WRO 2026 Game Mat Planner'} - generated path code (Python / Spike Prime style)\n`;
    out += `# Mat origin (0,0) is top-left. Heading 0deg = up; 90deg = right.\n`;
    out += `# Robot footprint: ${robotSize} x ${robotSize} mm\n`;
    out += `# These are placeholder calls — adapt forward()/turn_right()/turn_left() to your robot's API.\n\n`;

    paths.forEach((path, idx) => {
      const points = path.points;
      const actions = pathToActions(points, path.startHeading);
      out += `# ----- Path ${idx + 1}: ${points.length} points, ${M.pathLength(points).toFixed(0)} mm total -----\n`;
      out += `def run_path_${idx + 1}():\n`;
      if (actions.length === 0) {
        out += `    pass  # no movement\n`;
      } else {
        actions.forEach(a => {
          if (a.kind === 'forward') {
            out += `    forward(${a.mm.toFixed(0)})  # heading ${a.atHeading.toFixed(1)} deg\n`;
          } else if (a.kind === 'turn') {
            const dir = a.deg > 0 ? 'turn_right' : 'turn_left';
            out += `    ${dir}(${Math.abs(a.deg).toFixed(1)})  # ${a.fromHeading.toFixed(1)} -> ${a.toHeading.toFixed(1)} deg\n`;
          }
        });
      }
      out += '\n';
    });

    if (paths.length > 0) {
      out += `# Run all paths in sequence:\n`;
      out += `def main():\n`;
      paths.forEach((_, idx) => {
        out += `    run_path_${idx + 1}()\n`;
      });
      out += `\nif __name__ == "__main__":\n    main()\n`;
    }
    return out;
  }

  function generateWordBlocks(paths, opts) {
    let out = '';
    const title = `${document.title || 'WRO 2026 Game Mat Planner'} - Word Blocks pseudocode (EV3 / Spike style)`;
    out += `${title}\n`;
    out += `${'='.repeat(title.length)}\n\n`;
    paths.forEach((path, idx) => {
      const actions = pathToActions(path.points, path.startHeading);
      out += `Path ${idx + 1}  (${M.pathLength(path.points).toFixed(0)} mm total)\n`;
      out += `--------------------------------------------------\n`;
      if (actions.length === 0) {
        out += `  (no movement)\n`;
      } else {
        actions.forEach((a, i) => {
          const step = String(i + 1).padStart(2, ' ');
          if (a.kind === 'forward') {
            out += `  ${step}. MOVE STRAIGHT  ·  ${a.mm.toFixed(0)} mm forward\n`;
          } else if (a.kind === 'turn') {
            const dir = a.deg > 0 ? 'RIGHT' : 'LEFT';
            out += `  ${step}. TURN ${dir}     ·  ${Math.abs(a.deg).toFixed(1)} deg\n`;
          }
        });
      }
      out += '\n';
    });
    return out;
  }

  function generateTable(paths, opts) {
    let out = 'Step\tAction\tValue\tHeading after\tNotes\n';
    paths.forEach((path, idx) => {
      const actions = pathToActions(path.points, path.startHeading);
      out += `# Path ${idx + 1}\n`;
      let n = 1;
      let h = path.startHeading || 0;
      actions.forEach(a => {
        if (a.kind === 'forward') {
          out += `${n++}\tforward\t${a.mm.toFixed(0)} mm\t${a.atHeading.toFixed(1)}°\t\n`;
          h = a.atHeading;
        } else if (a.kind === 'turn') {
          const dir = a.deg > 0 ? 'right' : 'left';
          out += `${n++}\tturn ${dir}\t${Math.abs(a.deg).toFixed(1)}°\t${a.toHeading.toFixed(1)}°\t\n`;
          h = a.toHeading;
        }
      });
    });
    return out;
  }

  function generateJSON(paths, opts) {
    return JSON.stringify(paths.map((p, idx) => ({
      pathNumber: idx + 1,
      points: p.points,
      startHeading: p.startHeading || 0,
      actions: pathToActions(p.points, p.startHeading),
      totalDistance: M.pathLength(p.points)
    })), null, 2);
  }

  function generate(format, measurements, opts) {
    // Filter to paths only; if no paths but there are poses, treat consecutive poses as a path.
    let paths = measurements.filter(m => m.tool === 'path').map(m => ({
      points: m.points,
      startHeading: 0
    }));
    // If user has placed a "pose" + a "path", use the pose as the path's start heading.
    const poses = measurements.filter(m => m.tool === 'pose');
    if (poses.length === 1 && paths.length === 1) {
      // Apply the pose's heading as the start heading of the (only) path
      paths[0].startHeading = poses[0].heading;
    }
    if (paths.length === 0) {
      return '// No paths to export. Use the PATH tool to lay out a robot route, then export again.\n';
    }
    switch (format) {
      case 'python':     return generatePython(paths, opts);
      case 'wordblocks': return generateWordBlocks(paths, opts);
      case 'table':      return generateTable(paths, opts);
      case 'json':       return generateJSON(paths, opts);
      default:           return generatePython(paths, opts);
    }
  }

  window.WRO_CODEGEN = { generate, pathToActions };
})();
