// Drawing Druid — a small rotatable 3D model of an exercise's object, drawn on a canvas.
// Faces are SolidKit faces ({ pts, holes, n, smooth }); shading is flat, depth by painter's order.
// Axes: x to the right, y to the back, z up (the same as every builder).
//   DruidModel3D.attach(container) → { show(solids, opts), hide() }
//   opts.projection: 'first' | 'third' (which side view the side button shows first)
(function (global) {
  'use strict';
  const VIEWS = { iso: [45, 35.264], front: [0, 0], top: [0, 90], left: [-90, 0], right: [90, 0] };
  const rad = d => d * Math.PI / 180;

  function injectStyle() {
    if (document.getElementById('m3d-style')) return;
    const s = document.createElement('style');
    s.id = 'm3d-style';
    s.textContent = '.m3d{margin-top:12px;border:1px solid var(--border);border-radius:12px;overflow:hidden}' +
      '.m3d summary{cursor:pointer;padding:9px 14px;font-weight:800;font-size:13px;color:var(--text)}' +
      '.m3d summary span{font-weight:500;color:var(--muted);margin-left:6px;font-size:12px}' +
      '.m3d-body{position:relative;background:#f7f5ef}' +
      '.m3d canvas{display:block;width:100%;height:300px;cursor:grab;touch-action:none}.m3d canvas:active{cursor:grabbing}' +
      '.m3d-btns{position:absolute;top:8px;left:8px;display:flex;gap:4px;flex-wrap:wrap}' +
      '.m3d-btns button{font:600 11.5px system-ui,sans-serif;padding:5px 9px;border-radius:7px;border:1px solid rgba(0,0,0,.2);background:#fff;color:#1b1b1f;cursor:pointer}' +
      '.m3d-btns button.on{background:#1b1b1f;color:#fff}' +
      '.m3d-btns button:focus-visible{outline:2px solid #2563eb;outline-offset:1px}';
    document.head.appendChild(s);
  }

  function attach(container) {
    injectStyle();
    const box = document.createElement('details');
    box.className = 'm3d';
    // closed until the learner opens it (on some exercises the model is the answer); the choice is remembered
    try { box.open = localStorage.getItem('dd-3d-open') === '1'; } catch (e) { box.open = false; }
    box.innerHTML = '<summary>3D model <span>open it to turn the object; drag to rotate, or pick a view</span></summary><div class="m3d-body"><canvas></canvas><div class="m3d-btns"></div></div>';
    container.appendChild(box);
    const cv = box.querySelector('canvas'), btns = box.querySelector('.m3d-btns');
    box.addEventListener('toggle', () => { try { localStorage.setItem('dd-3d-open', box.open ? '1' : '0'); } catch (e) { /* private mode */ } if (box.open) draw(); });
    let yaw = VIEWS.iso[0], pitch = VIEWS.iso[1], anim = null;
    const names = [['iso', 'Iso'], ['front', 'Front'], ['top', 'Top'], ['left', 'Left'], ['right', 'Right']];
    names.forEach(([k, t]) => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = t; b.dataset.v = k;
      b.onclick = () => turnTo(VIEWS[k], k);
      btns.appendChild(b);
    });
    const mark = k => btns.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === k));

    function turnTo([y1, p1], k) {
      cancelAnimationFrame(anim);
      const y0 = yaw, p0 = pitch, dy = ((y1 - y0 + 540) % 360) - 180, t0 = performance.now();
      const step = now => { const t = Math.min(1, (now - t0) / 450), e = t * t * (3 - 2 * t); yaw = y0 + dy * e; pitch = p0 + (p1 - p0) * e; draw(); if (t < 1) anim = requestAnimationFrame(step); };
      mark(k); anim = requestAnimationFrame(step);
    }

    // ── prepared once per model: faces, their surfaces, and the unique edges ──
    let M = null;
    function prepare(sol) {
      const faces = []; sol.forEach(sd => sd.forEach(f => faces.push(f)));
      const kq = q => q.map(v => Math.round(v * 1e3)).join(',');
      // a surface: faces joined across smooth seams (a cylinder, a cone), so the seams are not outlined
      const parent = faces.map((f, i) => i), root = i => { while (parent[i] !== i) i = parent[i] = parent[parent[i]]; return i; };
      const edges = new Map();
      faces.forEach((f, fi) => [f.pts, ...(f.holes || [])].forEach((loop, li) => loop.forEach((q, i) => {
        const r = loop[(i + 1) % loop.length], key = [kq(q), kq(r)].sort().join('|');
        if (!edges.has(key)) edges.set(key, { p: q, q: r, faces: [], smooth: false });
        const e = edges.get(key); e.faces.push(fi);
        const sm = f.smooth;
        if (li === 0 && sm && f.pts.length === 4 && ((i === 1 && sm.b) || (i === 3 && sm.a))) e.smooth = true;
      })));
      edges.forEach(e => {
        if (e.faces.length === 2 && e.faces.every(fi => faces[fi].smooth && faces[fi].smooth.all)) e.smooth = true;
        if (!e.smooth || e.faces.length < 2) return;
        const [m, n] = e.faces, A = faces[m].n, B = faces[n].n;
        const la = Math.hypot(A[0], A[1], A[2]) || 1, lb = Math.hypot(B[0], B[1], B[2]) || 1;
        if ((A[0] * B[0] + A[1] * B[1] + A[2] * B[2]) / la / lb >= 0.8) parent[root(m)] = root(n);
      });
      // faces in one plane count as one surface too (blocks stacked flush show no seam)
      const plane = faces.map(f => {
        const n = f.n, l = Math.hypot(n[0], n[1], n[2]) || 1, u = n.map(v => v / l), q = f.pts[0];
        return u.map(v => Math.round(v * 1e3)).join(',') + '|' + Math.round((u[0] * q[0] + u[1] * q[1] + u[2] * q[2]) * 10);
      });
      const all = faces.flatMap(f => f.pts);
      const ext = i => [Math.min(...all.map(q => q[i])), Math.max(...all.map(q => q[i]))];
      const c = [0, 1, 2].map(i => { const [lo, hi] = ext(i); return (lo + hi) / 2; });
      const R = Math.max(1e-6, ...all.map(q => Math.hypot(q[0] - c[0], q[1] - c[1], q[2] - c[2])));
      M = { faces, edges: [...edges.values()], surf: faces.map((f, i) => root(i)), plane, c, R };
    }

    function draw() {
      const dpr = Math.min(1.5, global.devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight;   // capped: the fill is done per pixel in JS
      if (!W || !M) return;
      const PW = Math.round(W * dpr), PH = Math.round(H * dpr);
      cv.width = PW; cv.height = PH;
      const g = cv.getContext('2d');
      const a = rad(yaw), p = rad(pitch), ca = Math.cos(a), sa = Math.sin(a), cp = Math.cos(p), sp = Math.sin(p);
      // view space: [across, depth (away from the viewer), up]
      const tf = q => { const x1 = q[0] * ca + q[1] * sa, y1 = -q[0] * sa + q[1] * ca, z1 = q[2]; return [x1, y1 * cp - z1 * sp, y1 * sp + z1 * cp]; };
      const C0 = tf(M.c), k = Math.min(PW, PH) * 0.44 / M.R;
      const SX = v => PW / 2 + (v[0] - C0[0]) * k, SY = v => PH / 2 - (v[2] - C0[2]) * k;
      const zb = new Float32Array(PW * PH).fill(Infinity), fb = new Int32Array(PW * PH).fill(-1);
      const img = g.createImageData(PW, PH), px = img.data;
      const light = [-0.35, -0.55, 0.76];
      const colour = M.faces.map(f => {
        const n = f.n, l = Math.hypot(n[0], n[1], n[2]) || 1, lit = Math.max(0, (n[0] * light[0] + n[1] * light[1] + n[2] * light[2]) / l);
        const sh = 150 + 85 * lit;
        return f.opening ? [120, 120, 120] : f.cutFace ? [sh * 0.98, sh * 0.78, sh * 0.55] : [sh, sh, Math.min(255, sh + 10)];
      });
      // fill: scanline per face (even-odd, so holes stay open), depth from the face's plane
      M.faces.forEach((f, fi) => {
        const nv = tf(f.n);
        if (nv[1] > -1e-6) return;                                   // facing away
        const loops = [f.pts, ...(f.holes || [])].map(L => L.map(q => { const v = tf(q); return [SX(v), SY(v)]; }));
        const v0 = tf(f.pts[0]), d0 = nv[0] * v0[0] + nv[1] * v0[1] + nv[2] * v0[2];
        // depth at a pixel: solve the face's plane for the depth coordinate
        const depthAt = (X, Y) => { const vx = (X - PW / 2) / k + C0[0], vu = (PH / 2 - Y) / k + C0[2]; return (d0 - nv[0] * vx - nv[2] * vu) / nv[1]; };
        let y0 = Infinity, y1 = -Infinity;
        loops.forEach(L => L.forEach(q => { y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); }));
        const ya = Math.max(0, Math.ceil(y0 - 0.5)), yb = Math.min(PH - 1, Math.floor(y1 - 0.5));
        const col = colour[fi];
        for (let y = ya; y <= yb; y++) {
          const yc = y + 0.5, xs = [];
          loops.forEach(L => L.forEach((q, i) => {
            const r = L[(i + 1) % L.length];
            if ((q[1] <= yc) !== (r[1] <= yc)) xs.push(q[0] + (yc - q[1]) / (r[1] - q[1]) * (r[0] - q[0]));
          }));
          xs.sort((m, n) => m - n);
          for (let j = 0; j + 1 < xs.length; j += 2) {
            const xa = Math.max(0, Math.ceil(xs[j] - 0.5)), xe = Math.min(PW - 1, Math.floor(xs[j + 1] - 0.5));
            if (xe < xa) continue;
            const za = depthAt(xa + 0.5, yc), dz = depthAt(xa + 1.5, yc) - za;
            for (let x = xa, z = za; x <= xe; x++, z += dz) {
              const o = y * PW + x;
              if (z < zb[o]) { zb[o] = z; fb[o] = fi; const o4 = o * 4; px[o4] = col[0]; px[o4 + 1] = col[1]; px[o4 + 2] = col[2]; px[o4 + 3] = 255; }
            }
          }
        }
      });
      g.putImageData(img, 0, 0);
      // edges: drawn where they are in front, and only where the surface really changes across them
      const eps = 0.012 * M.R + 2 / k;                               // depth tolerance, model units
      const same = (i, j) => i >= 0 && j >= 0 && (M.surf[i] === M.surf[j] || M.plane[i] === M.plane[j]);
      const at = (x, y) => { x = Math.floor(x); y = Math.floor(y); return x < 0 || y < 0 || x >= PW || y >= PH ? -1 : y * PW + x; };
      const off = 1.6 * dpr;
      g.beginPath();
      M.edges.forEach(e => {
        const A = tf(e.p), B = tf(e.q), ax = SX(A), ay = SY(A), bx = SX(B), by = SY(B);
        const len = Math.hypot(bx - ax, by - ay); if (len < 0.5) return;
        const nx = -(by - ay) / len * off, ny = (bx - ax) / len * off, n = Math.ceil(len);
        let run = null;
        const es = new Set(e.faces.map(f => M.surf[f]));
        // a run of a pixel or two is where a seam meets the outline (one side is the background there): no tick
        const flush = () => { if (run && (Math.hypot(run[2] - run[0], run[3] - run[1]) > 2.5 * dpr || len < 4 * dpr)) { g.moveTo(run[0], run[1]); g.lineTo(run[2], run[3]); } run = null; };
        for (let i = 0; i <= n; i++) {
          const t = i / n, x = ax + (bx - ax) * t, y = ay + (by - ay) * t, z = A[1] + (B[1] - A[1]) * t;
          const o = at(x, y);
          // nothing nearer covers it; its own surface, seen almost edge-on, may be a little nearer within the pixel
          let vis = o >= 0 && (z <= zb[o] + eps || (es.has(M.surf[fb[o]]) && z <= zb[o] + 0.1 * M.R));
          if (vis) {
            const l = at(x + nx, y + ny), r = at(x - nx, y - ny), fl = l >= 0 ? fb[l] : -1, fr = r >= 0 ? fb[r] : -1;
            vis = !same(fl, fr);
          }
          if (vis) { if (run) { run[2] = x; run[3] = y; } else run = [x, y, x, y]; } else flush();
        }
        flush();
      });
      g.strokeStyle = '#1b1b1f'; g.lineWidth = 1.3 * dpr; g.lineCap = 'round'; g.stroke();
    }

    let drag = null;
    cv.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, yaw, pitch }; cv.setPointerCapture(e.pointerId); cancelAnimationFrame(anim); mark(''); });
    cv.addEventListener('pointermove', e => { if (!drag) return; yaw = drag.yaw - (e.clientX - drag.x) * 0.5; pitch = Math.max(-89, Math.min(89, drag.pitch + (e.clientY - drag.y) * 0.5)); draw(); });
    ['pointerup', 'pointercancel'].forEach(t => cv.addEventListener(t, () => { drag = null; }));
    global.addEventListener('resize', draw);

    return {
      show(s, opts) {
        prepare(s); box.hidden = false;
        btns.querySelector('[data-v="left"]').hidden = (opts && opts.projection) === 'third';
        btns.querySelector('[data-v="right"]').hidden = (opts && opts.projection) === 'first';
        draw();
      },
      hide() { M = null; box.hidden = true; },
      redraw: draw,
    };
  }

  global.DruidModel3D = { attach };
})(window);
