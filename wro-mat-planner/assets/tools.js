// WRO 2026 Game Mat Planner — measurement tool logic
// Exposes: window.WRO_TOOLS

(function(){
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const COLOURS = ['#ff6b6b', '#4ecdc4', '#ffd166', '#c084fc', '#80ffb4', '#fb923c', '#60a5fa', '#f472b6'];

  function el(tag, attrs = {}) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  // ---- math helpers ----
  function dist(a, b) { return Math.hypot(b.x - a.x, b.y - a.y); }

  // Bearing: 0° = up (north on screen), 90° = right (east), increases CW.
  function bearing(a, b) {
    const dx = b.x - a.x, dy = b.y - a.y;
    let deg = Math.atan2(dx, -dy) * 180 / Math.PI;
    if (deg < 0) deg += 360;
    return deg;
  }
  function pathLength(pts) {
    let s = 0;
    for (let i = 1; i < pts.length; i++) s += dist(pts[i-1], pts[i]);
    return s;
  }
  // Signed turn at b coming from a heading toward c.
  // Positive = right turn (CW on screen, since y goes down).
  function turnAngle(a, b, c) {
    const v1x = b.x - a.x, v1y = b.y - a.y;
    const v2x = c.x - b.x, v2y = c.y - b.y;
    const cross = v1x * v2y - v1y * v2x;
    const dot   = v1x * v2x + v1y * v2y;
    return Math.atan2(cross, dot) * 180 / Math.PI;
  }

  // ---- tool factory ----
  function createTools(opts) {
    const {
      stage,             // .stage element
      measSvg,           // overlay <svg>
      measLayer,         // <g> for committed measurements
      liveLayer,         // <g> for live preview
      readout,           // readout element
      measList,          // <div> list element
      snapEl,            // checkbox for snap
      robotSelect,       // <select> for robot profile
      onChange,          // callback when measurements change
    } = opts;

    const MAT_W = window.WRO_MAT.width;
    const MAT_H = window.WRO_MAT.height;
    const SNAP_STEP = window.WRO_MAT.snapDefault;

    let tool = 'none';
    let workingPoints = [];
    let measurements = [];
    let nextId = 1;
    let liveMouse = null;
    let poseRotateState = null;  // { centre, isRotating, currentHeading }

    function clientToMM(e) {
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * MAT_W;
      const y = ((e.clientY - r.top)  / r.height) * MAT_H;
      return { x, y };
    }
    function snap(pt) {
      if (!snapEl.checked) return pt;
      return { x: Math.round(pt.x / SNAP_STEP) * SNAP_STEP, y: Math.round(pt.y / SNAP_STEP) * SNAP_STEP };
    }
    function getRobotSize() {
      if (!robotSelect) return 250;
      const profile = window.WRO_ROBOT_PROFILES.find(p => p.id === robotSelect.value);
      if (!profile) return 250;
      if (profile.custom) {
        const customInput = document.getElementById('robotSizeCustom');
        if (customInput) {
          const v = parseInt(customInput.value, 10);
          if (!isNaN(v) && v > 0) return v;
        }
      }
      return profile.size;
    }

    function setTool(t) {
      tool = t;
      workingPoints = [];
      poseRotateState = null;
      drawLive();
      stage.dataset.tool = t;
      document.querySelectorAll('button[data-tool]').forEach(b =>
        b.classList.toggle('active', b.dataset.tool === t));
    }

    function commitMeasurement(extra = {}) {
      if (!workingPoints.length && !extra.points) return;
      const m = Object.assign({
        id: nextId++,
        tool: tool,
        points: workingPoints.slice(),
        colour: COLOURS[(nextId - 2) % COLOURS.length],
      }, extra);
      measurements.push(m);
      workingPoints = [];
      poseRotateState = null;
      redrawAll();
      drawLive();
      refreshList();
      if (onChange) onChange(measurements);
    }
    function clearAll() {
      measurements = [];
      workingPoints = [];
      poseRotateState = null;
      redrawAll();
      drawLive();
      refreshList();
      if (onChange) onChange(measurements);
    }

    // ---- Drawing primitives ----
    function drawPoint(parent, p, colour, r=8) {
      parent.appendChild(el('circle', { cx: p.x, cy: p.y, r,
        fill: 'white', stroke: colour, 'stroke-width': 2.5,
        'vector-effect': 'non-scaling-stroke' }));
    }
    function drawLineWithLabel(parent, a, b, colour, label, labelOffset = 0) {
      parent.appendChild(el('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        class: 'm-line-shadow' }));
      parent.appendChild(el('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        class: 'm-line', stroke: colour }));
      if (label) {
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const ox = -dy / len * (labelOffset || 26);
        const oy =  dx / len * (labelOffset || 26);
        const t = el('text', { x: mx + ox, y: my + oy,
          class: 'm-label', 'font-size': 22, 'text-anchor': 'middle',
          fill: colour });
        t.textContent = label;
        parent.appendChild(t);
      }
    }
    function drawAngleArc(parent, a, b, c, colour) {
      const r = 60;
      const angA = Math.atan2(a.y - b.y, a.x - b.x);
      const angC = Math.atan2(c.y - b.y, c.x - b.x);
      let delta = angC - angA;
      while (delta >  Math.PI) delta -= 2*Math.PI;
      while (delta < -Math.PI) delta += 2*Math.PI;
      const sweep = delta > 0 ? 1 : 0;
      const large = Math.abs(delta) > Math.PI ? 1 : 0;
      const x1 = b.x + r * Math.cos(angA), y1 = b.y + r * Math.sin(angA);
      const x2 = b.x + r * Math.cos(angC), y2 = b.y + r * Math.sin(angC);
      parent.appendChild(el('path', {
        d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`,
        class: 'm-arc', stroke: colour
      }));
      const midAng = angA + delta / 2;
      const lx = b.x + (r + 22) * Math.cos(midAng);
      const ly = b.y + (r + 22) * Math.sin(midAng);
      const turnDeg = -delta * 180 / Math.PI;
      const t = el('text', { x: lx, y: ly + 6,
        class: 'm-label', 'font-size': 20, 'text-anchor': 'middle',
        fill: colour });
      const dir = turnDeg > 0 ? '↻' : (turnDeg < 0 ? '↺' : '');
      t.textContent = `${dir} ${Math.abs(turnDeg).toFixed(1)}°`;
      parent.appendChild(t);
    }

    function drawRobotShape(parent, centre, headingDeg, size, colour, label) {
      const half = size / 2;
      // Rotate group around centre by headingDeg (where 0° = up)
      const g = el('g', {
        transform: `translate(${centre.x} ${centre.y}) rotate(${headingDeg})`
      });
      // body
      g.appendChild(el('rect', {
        x: -half, y: -half, width: size, height: size,
        class: 'm-footprint', stroke: colour
      }));
      // direction arrow (points up in local frame, which is "forward")
      const arrow = el('polygon', {
        points: `0,${-half + 12} ${-22},${-half + 50} ${22},${-half + 50}`,
        class: 'm-pose-arrow'
      });
      g.appendChild(arrow);
      // crosshair at robot centre
      g.appendChild(el('line', { x1: -16, y1: 0, x2: 16, y2: 0,
        stroke: colour, 'stroke-width': 2, 'vector-effect': 'non-scaling-stroke' }));
      g.appendChild(el('line', { x1: 0, y1: -16, x2: 0, y2: 16,
        stroke: colour, 'stroke-width': 2, 'vector-effect': 'non-scaling-stroke' }));
      parent.appendChild(g);
      // label outside the rotation, in mat coords
      if (label) {
        const t = el('text', {
          x: centre.x + half + 8, y: centre.y - half + 22,
          class: 'm-footprint-label', 'font-size': 20, 'text-anchor': 'start',
          fill: colour
        });
        t.textContent = label;
        parent.appendChild(t);
      }
    }

    function drawMeasurement(parent, m, isLive=false) {
      const c = isLive ? '#ffffff' : m.colour;
      if (m.tool === 'distance') {
        const [a, b] = m.points;
        drawPoint(parent, a, c);
        if (b) {
          drawPoint(parent, b, c);
          const d = dist(a, b);
          const brg = bearing(a, b);
          const dx = b.x - a.x, dy = b.y - a.y;
          drawLineWithLabel(parent, a, b, c, `${d.toFixed(0)} mm · ${brg.toFixed(1)}°  (Δ ${dx.toFixed(0)}, ${dy.toFixed(0)})`);
        }
      } else if (m.tool === 'path') {
        m.points.forEach(p => drawPoint(parent, p, c));
        for (let i = 1; i < m.points.length; i++) {
          const a = m.points[i-1], b = m.points[i];
          const d = dist(a, b);
          drawLineWithLabel(parent, a, b, c, `${d.toFixed(0)}`, 22);
        }
        if (m.points.length >= 2) {
          const last = m.points[m.points.length - 1];
          const total = pathLength(m.points);
          const t = el('text', {
            x: last.x + 18, y: last.y - 18,
            class: 'm-label', 'font-size': 22, 'text-anchor': 'start',
            fill: c
          });
          t.textContent = `Σ ${total.toFixed(0)} mm`;
          parent.appendChild(t);
        }
      } else if (m.tool === 'angle') {
        const [a, b, c2] = m.points;
        drawPoint(parent, a, c);
        if (b) drawPoint(parent, b, c);
        if (c2) drawPoint(parent, c2, c);
        if (b) drawLineWithLabel(parent, a, b, c, '', 0);
        if (c2) {
          drawLineWithLabel(parent, b, c2, c, '', 0);
          drawAngleArc(parent, a, b, c2, c);
        }
      } else if (m.tool === 'footprint') {
        const p = m.points[0];
        const size = m.robotSize || 250;
        drawRobotShape(parent, p, 0, size, c, `${size}×${size} robot @ (${p.x.toFixed(0)},${p.y.toFixed(0)})`);
      } else if (m.tool === 'pose') {
        const p = m.points[0];
        const heading = m.heading || 0;
        const size = m.robotSize || 250;
        drawRobotShape(parent, p, heading, size, c,
          `Pose @ (${p.x.toFixed(0)},${p.y.toFixed(0)}) · ${heading.toFixed(1)}°`);
      }
    }

    function redrawAll() {
      clear(measLayer);
      measurements.forEach(m => drawMeasurement(measLayer, m, false));
    }
    function drawLive() {
      clear(liveLayer);
      if (liveMouse && tool !== 'none') {
        liveLayer.appendChild(el('circle', {
          cx: liveMouse.x, cy: liveMouse.y, r: 6,
          class: 'snap-ring'
        }));
      }
      if (workingPoints.length) {
        const live = { tool: tool, points: workingPoints.slice() };
        if (liveMouse && (tool === 'distance' || tool === 'path' || tool === 'angle')) {
          if ((tool === 'distance' && live.points.length < 2) ||
              (tool === 'angle' && live.points.length < 3) ||
              (tool === 'path')) {
            live.points.push(liveMouse);
          }
        }
        live.colour = COLOURS[(measurements.length) % COLOURS.length];
        live.robotSize = getRobotSize();
        drawMeasurement(liveLayer, live, true);
      }
      // Pose: live rotation preview
      if (tool === 'pose' && poseRotateState && poseRotateState.isRotating && liveMouse) {
        const c = poseRotateState.centre;
        const heading = Math.atan2(liveMouse.x - c.x, -(liveMouse.y - c.y)) * 180 / Math.PI;
        const live = {
          tool: 'pose',
          points: [c],
          heading: ((heading % 360) + 360) % 360,
          colour: COLOURS[(measurements.length) % COLOURS.length],
          robotSize: getRobotSize(),
        };
        drawMeasurement(liveLayer, live, true);
      }
    }

    // ---- list rendering ----
    function refreshList() {
      measList.innerHTML = '';
      measurements.forEach((m, idx) => {
        const row = document.createElement('div');
        row.className = 'row';
        const swatch = document.createElement('span');
        swatch.className = 'swatch-dot';
        swatch.style.background = m.colour;
        const desc = document.createElement('span');
        desc.className = 'desc';
        const info = document.createElement('span');
        info.className = 'info';
        const del = document.createElement('button');
        del.className = 'delete';
        del.title = 'Remove this measurement';
        del.textContent = '×';
        del.addEventListener('click', () => {
          measurements.splice(idx, 1);
          redrawAll();
          refreshList();
          if (onChange) onChange(measurements);
        });

        if (m.tool === 'distance') {
          const [a, b] = m.points;
          const d = dist(a, b);
          const dx = b.x - a.x, dy = b.y - a.y;
          desc.textContent = `Distance #${m.id}`;
          info.textContent = `(${a.x.toFixed(0)},${a.y.toFixed(0)}) → (${b.x.toFixed(0)},${b.y.toFixed(0)})  ·  ${d.toFixed(1)} mm  ·  bearing ${bearing(a,b).toFixed(1)}°  ·  Δx ${dx.toFixed(0)} · Δy ${dy.toFixed(0)}`;
        } else if (m.tool === 'path') {
          const total = pathLength(m.points);
          const legs = [];
          for (let i = 1; i < m.points.length; i++) {
            legs.push(dist(m.points[i-1], m.points[i]).toFixed(0));
          }
          desc.textContent = `Path #${m.id} (${m.points.length} pts)`;
          info.textContent = `Σ ${total.toFixed(1)} mm  ·  legs: ${legs.join(' + ')} mm`;
        } else if (m.tool === 'angle') {
          const [a, b, c] = m.points;
          const t = turnAngle(a, b, c);
          const interior = 180 - Math.abs(t);
          const dir = t > 0 ? 'RIGHT (CW)' : (t < 0 ? 'LEFT (CCW)' : 'STRAIGHT');
          desc.textContent = `Turn #${m.id}`;
          info.textContent = `vertex (${b.x.toFixed(0)},${b.y.toFixed(0)})  ·  turn ${Math.abs(t).toFixed(1)}° ${dir}  ·  interior ${interior.toFixed(1)}°`;
        } else if (m.tool === 'footprint') {
          const p = m.points[0];
          const size = m.robotSize || 250;
          desc.textContent = `Robot footprint #${m.id}`;
          info.textContent = `centre (${p.x.toFixed(0)},${p.y.toFixed(0)})  ·  ${size} × ${size} mm`;
        } else if (m.tool === 'pose') {
          const p = m.points[0];
          const size = m.robotSize || 250;
          desc.textContent = `Robot pose #${m.id}`;
          info.textContent = `(${p.x.toFixed(0)},${p.y.toFixed(0)})  ·  heading ${(m.heading || 0).toFixed(1)}°  ·  ${size} mm`;
        }
        row.appendChild(swatch);
        row.appendChild(desc);
        row.appendChild(info);
        row.appendChild(del);
        measList.appendChild(row);
      });
    }

    // ---- event wiring ----
    measSvg.addEventListener('mousemove', e => {
      const raw = clientToMM(e);
      const pt = snap(raw);
      liveMouse = pt;
      readout.textContent = `${pt.x.toFixed(0).padStart(4, ' ')} , ${pt.y.toFixed(0).padStart(4, ' ')} mm`;
      drawLive();
    });
    measSvg.addEventListener('mouseleave', () => {
      liveMouse = null;
      readout.textContent = '— , — mm';
      drawLive();
    });
    function pushPoint(pt) {
      // Don't add a point identical to the last one — avoids dblclick firing
      // an extra (duplicate) click event and breaking commit behaviour.
      const last = workingPoints[workingPoints.length - 1];
      if (last && Math.hypot(pt.x - last.x, pt.y - last.y) < 0.5) return false;
      workingPoints.push(pt);
      return true;
    }

    measSvg.addEventListener('click', e => {
      if (tool === 'none') return;
      const pt = snap(clientToMM(e));

      if (tool === 'distance') {
        if (pushPoint(pt) && workingPoints.length === 2) commitMeasurement();
      } else if (tool === 'path') {
        pushPoint(pt);
      } else if (tool === 'angle') {
        if (pushPoint(pt) && workingPoints.length === 3) commitMeasurement();
      } else if (tool === 'footprint') {
        workingPoints = [pt];
        commitMeasurement({ robotSize: getRobotSize() });
      } else if (tool === 'pose') {
        if (!poseRotateState) {
          poseRotateState = { centre: pt, isRotating: true };
        } else if (poseRotateState.isRotating) {
          const c = poseRotateState.centre;
          const heading = Math.atan2(pt.x - c.x, -(pt.y - c.y)) * 180 / Math.PI;
          const headNorm = ((heading % 360) + 360) % 360;
          workingPoints = [c];
          commitMeasurement({ heading: headNorm, robotSize: getRobotSize() });
        }
      }
      drawLive();
    });
    measSvg.addEventListener('dblclick', e => {
      if (tool === 'path' && workingPoints.length >= 2) commitMeasurement();
    });

    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
      const k = e.key.toLowerCase();
      if (k === 'escape') { workingPoints = []; poseRotateState = null; drawLive(); }
      else if (k === 'enter') {
        if (tool === 'path' && workingPoints.length >= 2) commitMeasurement();
      }
      else if (k === 'delete' || k === 'backspace') {
        if (workingPoints.length) { workingPoints.pop(); drawLive(); }
        else if (measurements.length) { measurements.pop(); redrawAll(); refreshList(); if (onChange) onChange(measurements); }
      }
      else if (k === 'c') clearAll();
      else if (k === 'p') setTool('none');
      else if (k === 'd') setTool('distance');
      else if (k === 'm') setTool('path');
      else if (k === 'a') setTool('angle');
      else if (k === 'r') setTool('footprint');
      else if (k === 'o') setTool('pose');
    });

    // ---- public API ----
    return {
      setTool,
      clearAll,
      get measurements() { return measurements; },
      set measurements(arr) {
        measurements = arr.slice();
        nextId = Math.max(0, ...measurements.map(m => m.id || 0)) + 1;
        redrawAll();
        refreshList();
        if (onChange) onChange(measurements);
      },
      redraw: () => { redrawAll(); drawLive(); },
      math: { dist, bearing, pathLength, turnAngle },
    };
  }

  window.WRO_TOOLS = { create: createTools, COLOURS, math: { dist, bearing, pathLength, turnAngle } };
})();
