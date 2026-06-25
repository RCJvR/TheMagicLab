// Model Mage — replicad Web Worker (ES module)
// Uses replicad@0.23.1 + replicad-opencascadejs@0.23.0 (custom OpenCascade WASM build).
// Both packages expose ES modules, so this file runs as type:"module".

import Module from 'https://cdn.jsdelivr.net/npm/replicad-opencascadejs@0.23.0/src/replicad_single.js';
import { setOC, draw, drawRectangle, drawCircle } from 'https://cdn.jsdelivr.net/npm/replicad@0.23.1/dist/replicad.js';

const OC_BASE = 'https://cdn.jsdelivr.net/npm/replicad-opencascadejs@0.23.0/src/';

// ── Boot ──────────────────────────────────────────────────────────────────────

let kernelReady = false;

const bootPromise = (async () => {
  try {
    self.postMessage({ type: 'status', message: 'Initialising OpenCascade WASM (~20 MB)…' });
    // Module({...}) returns Module.ready directly (a Promise that resolves with the OC instance)
    const oc = await Module({ locateFile: (path) => OC_BASE + path });
    setOC(oc);
    kernelReady = true;
    self.postMessage({ type: 'ready' });
  } catch (e) {
    self.postMessage({ type: 'fatalError', message: 'OpenCascade init failed: ' + e.message });
  }
})();

// ── Message handler ───────────────────────────────────────────────────────────

self.onmessage = async function ({ data }) {
  if (data.type !== 'rebuild') return;

  if (!kernelReady) {
    await bootPromise;
    if (!kernelReady) return;
  }

  try {
    const { vertices, normals, triangles } = buildModel(data.params);
    self.postMessage(
      { type: 'mesh', vertices, normals, triangles },
      [vertices.buffer, normals.buffer, triangles.buffer]
    );
  } catch (e) {
    self.postMessage({ type: 'buildError', message: e.message });
  }
};

// ── Geometry builder ──────────────────────────────────────────────────────────

function buildModel(p) {
  const hw = p.width  / 2;
  const hd = p.depth  / 2;
  const wt = clamp(p.wallThk, 3, Math.min(p.width, p.depth) * 0.42);

  // ── 1. Base shape ─────────────────────────────────────────────────────────

  let solid;

  if (p.shape === 'box') {
    solid = drawRectangle(p.width, p.depth)
      .sketchOnPlane('XY')
      .extrude(p.height);

  } else if (p.shape === 'l-profile') {
    // L = full-width bottom bar + left vertical column, centered at origin
    solid = draw([-hw, -hd])
      .hLine(p.width)
      .vLine(wt)
      .hLine(-(p.width - wt))
      .vLine(p.depth - wt)
      .hLine(-wt)
      .close()
      .sketchOnPlane('XY')
      .extrude(p.height);

  } else if (p.shape === 't-profile') {
    // T = central stem + top flange, centered at origin
    const sw  = clamp(wt * 1.2, 6, p.width * 0.30);
    const hsw = sw / 2;
    solid = draw([-hsw, -hd])
      .hLine(sw)
      .vLine(p.depth - wt)
      .hLine(hw - hsw)
      .vLine(wt)
      .hLine(-p.width)
      .vLine(-wt)
      .hLine(hw - hsw)
      .vLine(-(p.depth - wt))
      .close()
      .sketchOnPlane('XY')
      .extrude(p.height);
  }

  if (!solid) throw new Error('Shape build failed');

  // ── 2. Hole 1 (boolean cut through Z axis) ────────────────────────────────

  if (p.holeEnabled && p.holeDia > 2) {
    const r  = p.holeDia / 2;
    const cx = clamp(p.holeX, -hw + r + 1, hw - r - 1);
    const cy = clamp(p.holeY, -hd + r + 1, hd - r - 1);
    try {
      const tool = drawCircle(r)
        .sketchOnPlane('XY', -1)   // 1 mm below the bottom face
        .extrude(p.height + 2)     // 1 mm past the top face
        .translate([cx, cy, 0]);
      solid = solid.cut(tool);
    } catch (e) { /* hole outside solid boundary — skip */ }
  }

  // ── 3. Hole 2 ─────────────────────────────────────────────────────────────

  if (p.hole2Enabled && p.hole2Dia > 2) {
    const r  = p.hole2Dia / 2;
    const cx = clamp(p.hole2X, -hw + r + 1, hw - r - 1);
    const cy = clamp(p.hole2Y, -hd + r + 1, hd - r - 1);
    try {
      const tool = drawCircle(r)
        .sketchOnPlane('XY', -1)
        .extrude(p.height + 2)
        .translate([cx, cy, 0]);
      solid = solid.cut(tool);
    } catch (e) { /* skip */ }
  }

  // ── 4. Fillet — all edges (true OpenCascade BRep fillet) ─────────────────

  if (p.filletEnabled && p.filletR > 0) {
    const safeR = Math.min(
      p.filletR,
      p.height * 0.35,
      Math.min(p.width, p.depth) * 0.18
    );
    try {
      solid = solid.fillet(safeR);
    } catch (e) {
      // Complex geometry can cause fillet failures — halve radius and retry
      try { solid = solid.fillet(safeR * 0.5); } catch (_) { /* skip */ }
    }
  }

  // ── 5. Tessellate ─────────────────────────────────────────────────────────

  const mesh = solid.mesh({ tolerance: 0.04, angularTolerance: 10 });

  // Confirm field names (API is vertices / normals / triangles)
  const vertices  = mesh.vertices  instanceof Float32Array ? mesh.vertices  : new Float32Array(mesh.vertices);
  const normals   = mesh.normals   instanceof Float32Array ? mesh.normals   : new Float32Array(mesh.normals);
  const triangles = mesh.triangles instanceof Uint32Array  ? mesh.triangles : new Uint32Array(mesh.triangles);

  return { vertices, normals, triangles };
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
