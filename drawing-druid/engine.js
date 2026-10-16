// ConstructionEngine — data-first SVG renderer for EGD step-by-step constructions.
// A "model" is a plain object { id, title, bounds:{w,h}, steps:[{ id, instruction, measurement, calloutAt, reveals:[...] }] }.
// The same model renders three ways (interactive / print-full / print-thumb) by changing render() opts.
//
// Interactive mode:
//   - frames the drawing on the extents of ALL its steps, so the view stays still while steps are added;
//   - draws on paper (graphite ink) by default, with a dark-canvas option the student can switch to;
//   - keeps true line-type proportions at any zoom (strokes are sized in screen pixels);
//   - colours the lines added in the current step, and shows only the current step's callout,
//     placed beside the geometry with a leader line rather than on top of it;
//   - moves point labels to whichever side is clear of lines and other labels;
//   - adds zoom / fit / paper controls when the SVG sits inside a .svg-wrap.
(function (global) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';

  // SANS (SABS) 0111/0143 line-type conventions, per the CAPS EGD spec:
  //   A-type (darkest/thickest, continuous): outlines, visible parts, borders/title blocks.
  //     Pencil equivalent: HB, 0.5mm lead.
  //   B-type (medium, continuous): dimensions, writing, hatching, break lines. Also used at
  //     B-weight for two chain/broken variants: medium chain-line (centre lines) and short
  //     broken-line (hidden detail) — never dashed at C-weight, and never used for construction.
  //     Pencil equivalent: H, 0.5mm lead — same lead diameter as A, but harder graphite wears
  //     to a finer point and lays down less, so a B line reads thinner and lighter than A even
  //     though both start from a 0.5mm lead.
  //   C-type (lightest/thinnest, continuous — NOT dashed): constructions, planning, guidelines.
  //     Pencil equivalent: 2H, 0.3mm lead — a genuinely thinner lead, so C is the biggest step
  //     down in both width and tone.
  const LINE_TYPES = {
    A:            { width: 0.5,  dash: null,        color: '#e8eaf2' },
    B:            { width: 0.4,  dash: null,        color: '#cbd5e1' },
    C:            { width: 0.25, dash: null,        color: '#94a3b8' },
    construction: { width: 0.25, dash: null,        color: '#eab308' }, // in-app-only colour alias of C: same weight, distinct hue so scaffolding reads apart from the final result on screen
    centre:       { width: 0.4,  dash: '8,2,1,2',    color: '#94a3b8' }, // medium chain-line (B-weight)
    hidden:       { width: 0.4,  dash: '4,2',        color: '#94a3b8' }, // short broken-line (B-weight)
  };

  const CALLOUT_COLORS = ['#eab308', '#f472b6', '#60a5fa', '#4ade80', '#fb923c', '#a78bfa', '#22d3ee', '#f87171'];

  // The on-screen palette is light-on-dark. Printed sheets are dark ink on white paper, so
  // print modes remap every colour to something that actually reads as ink on a physical page.
  const PRINT_COLORS = {
    A: '#111111', B: '#3f3f46', C: '#8a8a92', construction: '#b45309', centre: '#52525b', hidden: '#52525b',
  };
  const PRINT_TEXT_COLOR = '#1c1c1f';

  // On-screen "paper": graphite on cartridge paper. Construction keeps an ochre tint so it
  // still reads apart from the finished outline, as the dark canvas does with yellow.
  const PAPER = {
    bg: '#f7f5ee',
    lines: { A: '#1b1b1f', B: '#4a4f5a', C: '#8b9099', construction: '#b7791f', centre: '#4a4f5a', hidden: '#4a4f5a' },
    text: '#1f2329',
    accent: '#1d4ed8',
  };
  const DARK = { bg: '#05070c', text: '#e8eaf2', accent: '#38bdf8' };
  // Accent colours the chapter data uses for labels were picked for the dark canvas.
  const PAPER_INK = {
    '#fde047': '#a16207', '#eab308': '#a16207', '#94a3b8': '#4b5563', '#64748b': '#4b5563',
    '#e8eaf2': '#1b1b1f', '#cbd5e1': '#374151', '#f472b6': '#be185d', '#38bdf8': '#0369a1',
    '#60a5fa': '#1d4ed8', '#4ade80': '#15803d', '#fb923c': '#c2410c', '#a78bfa': '#6d28d9',
    '#22d3ee': '#0e7490', '#f87171': '#b91c1c',
  };

  // Screen stroke widths in CSS pixels. Ratios follow the line-type spec (A : B : C ≈ 0.5 : 0.4 : 0.25,
  // nudged apart so the three weights stay distinguishable on a screen).
  const SCREEN_PX = { A: 2.1, B: 1.3, C: 0.85, construction: 0.9, centre: 1.25, hidden: 1.25 };
  const SCREEN_DASH = { centre: '16,4,3,4', hidden: '7,4' };

  // Kept for any page that still reads it; interactive strokes are now sized in pixels.
  const MODE_STROKE_MULT = { interactive: 2.4, 'print-full': 1, 'print-thumb': 1 };
  function isPrintMode(mode) { return mode === 'print-full' || mode === 'print-thumb'; }

  const PREF_KEY = 'drawingDruidCanvas';
  function getCanvasTheme() {
    try { return localStorage.getItem(PREF_KEY) === 'dark' ? 'dark' : 'paper'; } catch (e) { return 'paper'; }
  }
  function setCanvasTheme(t) {
    try { localStorage.setItem(PREF_KEY, t); } catch (e) { /* private mode: keep for this page only */ }
    memoryTheme = t;
  }
  let memoryTheme = null;
  function currentTheme() { return memoryTheme || getCanvasTheme(); }

  // Construction lines on or off (screen only; printed sheets always show them). The choice is
  // remembered per browser. The current step's own construction lines always stay visible.
  let showConstruction = true;
  try { showConstruction = localStorage.getItem('ce-show-construction') !== '0'; } catch (e) { /* storage blocked */ }
  function setShowConstruction(on) {
    showConstruction = !!on;
    try { localStorage.setItem('ce-show-construction', on ? '1' : '0'); } catch (e) { /* storage blocked */ }
  }

  // Every exercise ends with a FINISHED DRAWING step: the whole drawing, nothing new, so the
  // construction lines can be switched off to see the clean result.
  function addFinishSteps(constructions) {
    Object.values(constructions || {}).forEach(m => {
      if (!m || !Array.isArray(m.steps) || !m.steps.length || m.steps[m.steps.length - 1].finished) return;
      m.steps.push({ id: m.steps.length + 1, finished: true,
        instruction: 'FINISHED DRAWING: the complete drawing. Use the Lines button above the drawing to switch the construction lines off and on.',
        reveals: [] });
    });
  }

  function el(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) {
      if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    return e;
  }

  // Colour for text/annotation ink in the current context.
  function ink(color, ctx) {
    if (ctx.print) return PRINT_TEXT_COLOR;
    if (ctx.theme === 'dark') return color || DARK.text;
    if (!color) return PAPER.text;
    const c = color.toLowerCase();
    if (PAPER_INK[c]) return PAPER_INK[c];
    const m = /^#([0-9a-f]{6})$/.exec(c);
    if (!m) return PAPER.text;
    const n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    if (lum < 0.5) return color;
    const f = 0.45 / lum;
    return '#' + [r, g, b].map(v => Math.round(v * f).toString(16).padStart(2, '0')).join('');
  }

  function strokeAttrs(lineType, ctx) {
    const lt = LINE_TYPES[lineType] ? lineType : 'B';
    if (ctx.print) {
      return {
        stroke: PRINT_COLORS[lt],
        'stroke-width': LINE_TYPES[lt].width.toFixed(3),
        'stroke-dasharray': LINE_TYPES[lt].dash || null,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none',
      };
    }
    let color = ctx.theme === 'dark' ? LINE_TYPES[lt].color : PAPER.lines[lt];
    if (ctx.current) color = ctx.theme === 'dark' ? DARK.accent : PAPER.accent;
    return {
      stroke: color,
      'stroke-width': SCREEN_PX[lt],
      'stroke-dasharray': SCREEN_DASH[lt] || null,
      'vector-effect': 'non-scaling-stroke',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none',
    };
  }

  function toRad(deg) { return deg * Math.PI / 180; }

  function arcPath(cx, cy, r, startDeg, endDeg) {
    const sx = cx + r * Math.cos(toRad(startDeg));
    const sy = cy + r * Math.sin(toRad(startDeg));
    const ex = cx + r * Math.cos(toRad(endDeg));
    const ey = cy + r * Math.sin(toRad(endDeg));
    let sweep = endDeg - startDeg;
    while (sweep < 0) sweep += 360;
    const largeArc = sweep > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`;
  }

  function arcPoints(cx, cy, r, startDeg, endDeg, n) {
    let sweep = endDeg - startDeg;
    while (sweep < 0) sweep += 360;
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = toRad(startDeg + sweep * i / n);
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    return pts;
  }

  // ── Geometry helpers for layout (segments as [x1,y1,x2,y2], boxes as [x0,y0,x1,y1]) ──

  function pushPath(segs, pts, closed) {
    for (let i = 0; i + 1 < pts.length; i++) segs.push([pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]]);
    if (closed && pts.length > 2) segs.push([pts[pts.length - 1][0], pts[pts.length - 1][1], pts[0][0], pts[0][1]]);
  }

  function dimensionGeom(r) {
    const [x1, y1] = r.p1, [x2, y2] = r.p2;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    const offset = r.offset != null ? r.offset : 10;
    // r.dir: extension lines run in this (unit) direction instead of square to the dimension
    // line, as on an isometric drawing where they follow an isometric axis.
    const ox = (r.dir ? r.dir[0] : nx) * offset, oy = (r.dir ? r.dir[1] : ny) * offset;
    return { x1, y1, x2, y2, ox, oy, dax: x1 + ox, day: y1 + oy, dbx: x2 + ox, dby: y2 + oy };
  }

  // Line segments a primitive occupies (used to keep labels and callouts off the drawing).
  function primSegments(r, segs) {
    switch (r.kind) {
      case 'line': segs.push([r.p1[0], r.p1[1], r.p2[0], r.p2[1]]); break;
      case 'polyline': pushPath(segs, r.points, false); break;
      case 'polygon': pushPath(segs, r.points, true); break;
      case 'circle': pushPath(segs, arcPoints(r.center[0], r.center[1], r.r, 0, 359.99, 32), true); break;
      case 'arc-construction': pushPath(segs, arcPoints(r.center[0], r.center[1], r.r, r.startDeg, r.endDeg, 16), false); break;
      case 'dimension': {
        const d = dimensionGeom(r);
        segs.push([d.x1, d.y1, d.dax, d.day], [d.x2, d.y2, d.dbx, d.dby], [d.dax, d.day, d.dbx, d.dby]);
        break;
      }
      case 'angle-arc': {
        const [vx, vy] = r.vertex;
        const a1 = Math.atan2(r.p1[1] - vy, r.p1[0] - vx) * 180 / Math.PI;
        const a2 = Math.atan2(r.p2[1] - vy, r.p2[0] - vx) * 180 / Math.PI;
        pushPath(segs, arcPoints(vx, vy, r.radius || 10, a1, a2, 8), false);
        break;
      }
      default: break;
    }
  }

  // Extents of a primitive (for framing).
  function primExtents(r, acc) {
    const add = (x, y) => {
      if (!isFinite(x) || !isFinite(y)) return;
      if (x < acc[0]) acc[0] = x; if (y < acc[1]) acc[1] = y;
      if (x > acc[2]) acc[2] = x; if (y > acc[3]) acc[3] = y;
    };
    switch (r.kind) {
      case 'circle': add(r.center[0] - r.r, r.center[1] - r.r); add(r.center[0] + r.r, r.center[1] + r.r); return;
      case 'point': add(r.at[0], r.at[1]); return;
      case 'label': {
        const fs = r.size || 3.8, w = 0.58 * fs * String(r.text || '').length;
        const x0 = r.anchor === 'middle' ? r.at[0] - w / 2 : r.anchor === 'end' ? r.at[0] - w : r.at[0];
        add(x0, r.at[1] - fs); add(x0 + w, r.at[1] + fs * 0.25);
        return;
      }
      case 'right-angle-marker': add(r.at[0], r.at[1]); return;
      case 'tool': return;   // instruments never change the framing
      default: {
        const segs = [];
        primSegments(r, segs);
        segs.forEach(s => { add(s[0], s[1]); add(s[2], s[3]); });
        if (r.kind === 'dimension') {
          const d = dimensionGeom(r), mx = (d.dax + d.dbx) / 2, my = (d.day + d.dby) / 2;
          add(mx, my - 6); add(mx, my + 2);
        }
      }
    }
  }

  function segBox(s, b) {
    // Liang–Barsky: does segment s cross axis-aligned box b?
    let t0 = 0, t1 = 1;
    const dx = s[2] - s[0], dy = s[3] - s[1];
    const p = [-dx, dx, -dy, dy], q = [s[0] - b[0], b[2] - s[0], s[1] - b[1], b[3] - s[1]];
    for (let i = 0; i < 4; i++) {
      if (p[i] === 0) { if (q[i] < 0) return false; continue; }
      const t = q[i] / p[i];
      if (p[i] < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
    }
    return true;
  }

  function segDist(px, py, s) {
    const dx = s[2] - s[0], dy = s[3] - s[1];
    const l2 = dx * dx + dy * dy;
    let t = l2 ? ((px - s[0]) * dx + (py - s[1]) * dy) / l2 : 0;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (s[0] + t * dx), py - (s[1] + t * dy));
  }

  function boxOverlap(a, b) {
    return a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
  }

  function outside(b, vb) {
    return b[0] < vb[0] || b[1] < vb[1] || b[2] > vb[0] + vb[2] || b[3] > vb[1] + vb[3];
  }

  // ── Primitive renderers ──

  function renderLine(r, ctx) {
    return el('line', Object.assign(
      { x1: r.p1[0], y1: r.p1[1], x2: r.p2[0], y2: r.p2[1] },
      strokeAttrs(r.lineType || 'A', ctx)
    ));
  }

  function renderArcConstruction(r, ctx) {
    const d = arcPath(r.center[0], r.center[1], r.r, r.startDeg, r.endDeg);
    return el('path', Object.assign({ d }, strokeAttrs(r.lineType || 'construction', ctx)));
  }

  function renderCircle(r, ctx) {
    return el('circle', Object.assign(
      { cx: r.center[0], cy: r.center[1], r: r.r },
      strokeAttrs(r.lineType || 'B', ctx)
    ));
  }

  function pointDotRadius(r, ctx) { return (r.size || 0.9) * ctx.k; }

  function renderPoint(r, ctx) {
    const g = el('g', { class: 'ce-point' });
    const [x, y] = r.at;
    let fill;
    if (ctx.print) fill = PRINT_COLORS.A;
    else if (ctx.theme === 'dark') fill = r.color || '#fde047';
    else fill = r.color ? ink(r.color, ctx) : PAPER.lines.A;
    g.appendChild(el('circle', { cx: x, cy: y, r: pointDotRadius(r, ctx), fill }));
    if (r.draggable) {
      g.appendChild(el('circle', { cx: x, cy: y, r: (r.size || 0.9) + 4, fill: 'transparent', class: 'ce-drag-hit' }));
    }
    return g;
  }

  // Point labels are placed after all geometry is known: try eight sides of the point and
  // take the one that crosses the fewest lines and other labels.
  const LABEL_DIRS = [[1, -1], [-1, -1], [1, 1], [-1, 1], [1, 0], [-1, 0], [0, -1], [0, 1]];

  function placePointLabel(r, ctx, layout) {
    const [x, y] = r.at;
    const fs = 3.6 * ctx.k;
    const text = String(r.label);
    const w = 0.62 * fs * text.length, h = 0.78 * fs;
    const gap = pointDotRadius(r, ctx) + 0.9 * ctx.k;
    let best = null;
    LABEL_DIRS.forEach((d, i) => {
      const [dx, dy] = d;
      const bx = dx > 0 ? x + gap : dx < 0 ? x - gap - w : x - w / 2;
      const by = dy < 0 ? y - gap * 0.6 - h : dy > 0 ? y + gap * 0.6 : y - h / 2;
      const box = [bx, by, bx + w, by + h];
      let score = i * 0.6;
      for (const s of layout.segs) if (segBox(s, box)) score += 10;
      for (const b of layout.boxes) if (boxOverlap(b, box)) score += 25;
      if (outside(box, layout.vb)) score += 30;
      if (!best || score < best.score) best = { score, box, anchor: dx > 0 ? 'start' : dx < 0 ? 'end' : 'middle' };
    });
    const b = best.box;
    layout.boxes.push(b);
    const tx = best.anchor === 'start' ? b[0] : best.anchor === 'end' ? b[2] : (b[0] + b[2]) / 2;
    const t = el('text', {
      x: tx, y: b[3] - 0.08 * fs, 'font-size': fs, fill: ink(null, ctx), 'text-anchor': best.anchor,
      'font-family': '"Cabinet Grotesk",sans-serif', 'font-weight': '700',
    });
    t.textContent = text;
    return t;
  }

  function renderDimension(r, ctx) {
    const g = el('g', { class: 'ce-dim' });
    const d = dimensionGeom(r);
    const sa = strokeAttrs('B', ctx);
    g.appendChild(el('line', Object.assign({ x1: d.x1, y1: d.y1, x2: d.dax, y2: d.day }, sa)));
    g.appendChild(el('line', Object.assign({ x1: d.x2, y1: d.y2, x2: d.dbx, y2: d.dby }, sa)));
    g.appendChild(el('line', Object.assign({ x1: d.dax, y1: d.day, x2: d.dbx, y2: d.dby }, sa)));
    const headFill = ctx.print ? PRINT_COLORS.B : sa.stroke;
    // simple arrowheads at each end of the dimension line
    [[d.dax, d.day, d.dbx, d.dby], [d.dbx, d.dby, d.dax, d.day]].forEach(([fx, fy, tx, ty]) => {
      const ang = Math.atan2(ty - fy, tx - fx);
      const s = 2.2 * ctx.k;
      const p1 = [fx + s * Math.cos(ang - 0.35), fy + s * Math.sin(ang - 0.35)];
      const p2 = [fx + s * Math.cos(ang + 0.35), fy + s * Math.sin(ang + 0.35)];
      g.appendChild(el('polygon', { points: `${fx},${fy} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`, fill: headFill }));
    });
    const pos = ctx.layout ? placeDimensionText(r, ctx.k, ctx.layout) : dimensionTextPos(r, ctx.k, 0.5);
    const text = el('text', {
      x: pos.cx, y: pos.cy, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': pos.fs,
      fill: ctx.print ? PRINT_TEXT_COLOR : (ctx.theme === 'dark' ? '#fde047' : PAPER.text),
      'font-family': '"JetBrains Mono",monospace', 'font-weight': '600',
      transform: Math.abs(pos.ang) > 0.5 ? `rotate(${pos.ang.toFixed(2)} ${pos.cx} ${pos.cy})` : null,
    });
    text.textContent = r.text || '';
    g.appendChild(text);
    return g;
  }

  // Dimension text sits just above its dimension line, parallel to it, reading from the
  // bottom or the right of the sheet (aligned system). t is the position along the line.
  function dimensionTextPos(r, k, t) {
    const d = dimensionGeom(r);
    const fs = 4.2 * k;
    let ang = Math.atan2(d.dby - d.day, d.dbx - d.dax) * 180 / Math.PI;
    if (ang >= 89.9) ang -= 180; else if (ang < -90.1) ang += 180;
    const upx = Math.sin(toRad(ang)), upy = -Math.cos(toRad(ang));
    const off = fs * 0.5 + 0.8 * k;
    const cx = d.dax + (d.dbx - d.dax) * t + upx * off, cy = d.day + (d.dby - d.day) * t + upy * off;
    // axis-aligned box around the rotated text
    const w = 0.62 * fs * String(r.text || '').length + 0.4 * fs, h = fs;
    const c = Math.abs(Math.cos(toRad(ang))), sn = Math.abs(Math.sin(toRad(ang)));
    const bw = w * c + h * sn, bh = w * sn + h * c;
    return { cx, cy, ang, fs, box: [cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2] };
  }

  // Slide the text along the dimension line to the spot that crosses the fewest other lines.
  function placeDimensionText(r, k, layout) {
    let best = null;
    [0.5, 0.35, 0.65, 0.22, 0.78].forEach((t, i) => {
      const pos = dimensionTextPos(r, k, t);
      let score = i * 1.5;
      for (const s of layout.segs) if (segBox(s, pos.box)) score += 10;
      for (const b of layout.boxes) if (boxOverlap(b, pos.box)) score += 15;
      if (!best || score < best.score) best = Object.assign(pos, { score });
    });
    layout.boxes.push(best.box);
    return best;
  }

  function renderAngleArc(r, ctx) {
    const g = el('g', { class: 'ce-angle' });
    const [vx, vy] = r.vertex;
    const a1 = Math.atan2(r.p1[1] - vy, r.p1[0] - vx) * 180 / Math.PI;
    const a2 = Math.atan2(r.p2[1] - vy, r.p2[0] - vx) * 180 / Math.PI;
    const radius = r.radius || 10;
    g.appendChild(el('path', Object.assign({ d: arcPath(vx, vy, radius, a1, a2) }, strokeAttrs('B', ctx))));
    if (r.text) {
      let sweep = a2 - a1; while (sweep < 0) sweep += 360;
      const midDeg = a1 + sweep / 2;
      const fs = 3.8 * ctx.k;
      const tx = vx + (radius + 1.2 * fs) * Math.cos(toRad(midDeg));
      const ty = vy + (radius + 1.2 * fs) * Math.sin(toRad(midDeg)) + fs * 0.35;
      const t = el('text', {
        x: tx, y: ty, 'text-anchor': 'middle', 'font-size': fs,
        fill: ctx.print ? PRINT_TEXT_COLOR : (ctx.theme === 'dark' ? '#fde047' : PAPER.text),
        'font-family': '"JetBrains Mono",monospace',
      });
      t.textContent = r.text;
      g.appendChild(t);
    }
    return g;
  }

  // ── Drawing instruments (on screen only, on the current step only) ──
  // { kind: 'tool', tool: 'ruler', at, angle, length, side }
  //     the measuring edge runs from `at` along `angle` (screen degrees, 0 = +x) for `length` mm;
  //     the body lies on the left of that direction (side: -1 puts it on the right).
  // { kind: 'tool', tool: 'set-square', deg: 45 | 30 | 60, at, angle, size, use: 'hyp' | 'leg', flip }
  //     use 'hyp': `at` is where the sloping edge meets the base; the base runs along `angle` for
  //     `size` mm to the right angle and the sloping edge rises at `deg` (up-right; flip: up-left).
  //     use 'leg': the right angle sits at `at` and the second leg stands square to the base.
  function renderTool(r, ctx) {
    const paper = ctx.theme === 'paper';
    const k = ctx.k || 1;
    const g = el('g', { class: 'ce-tool', 'pointer-events': 'none',
      transform: 'translate(' + r.at[0] + ' ' + r.at[1] + ') rotate(' + (r.angle || 0) + ')' + (r.flip ? ' scale(-1 1)' : '') });
    const sw = (1.1 / k).toFixed(3);
    const txt = (x, y, t, rot) => {
      const e = el('text', { x, y, 'font-size': 2.3, 'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle', fill: paper ? '#4b5563' : '#cbd5e1',
        transform: (rot ? 'rotate(' + rot + ' ' + x + ' ' + y + ')' : '') + (r.flip ? ' scale(-1 1) translate(' + (-2 * x) + ' 0)' : '') });
      e.textContent = t; return e;
    };
    if (r.tool === 'ruler') {
      const L = r.length || 150, W = 13, side = r.side === -1 ? 1 : -1;     // body above the edge by default
      g.appendChild(el('rect', { x: 0, y: side < 0 ? -W : 0, width: L, height: W, rx: 1.2,
        fill: paper ? 'rgba(217,170,40,.16)' : 'rgba(250,204,21,.10)', stroke: paper ? 'rgba(146,104,10,.75)' : 'rgba(250,204,21,.55)', 'stroke-width': sw, 'vector-effect': 'non-scaling-stroke' }));
      let d = '';
      for (let m = 0; m <= L; m += 1) {
        const h = m % 10 === 0 ? 4 : m % 5 === 0 ? 2.6 : 1.5;
        d += 'M' + m + ' 0 L' + m + ' ' + (side * h) + ' ';
      }
      g.appendChild(el('path', { d, stroke: paper ? 'rgba(90,70,20,.75)' : 'rgba(250,230,150,.6)', 'stroke-width': (0.6 / k).toFixed(3), 'vector-effect': 'non-scaling-stroke', fill: 'none' }));
      for (let m = 10; m < L; m += 10) g.appendChild(txt(m, side * 6.6 + (side < 0 ? 0.6 : 1.6), String(m / 10)));
      return g;
    }
    // set square
    const deg = r.deg || 45, a = r.size || 60, b = a * Math.tan(deg * Math.PI / 180);
    const pts = r.use === 'leg' ? [[0, 0], [a, 0], [0, -b]] : [[0, 0], [a, 0], [a, -b]];
    // hollow centre: the same triangle shrunk towards its incentre
    const [A, B, Cc] = pts, la = Math.hypot(B[0] - Cc[0], B[1] - Cc[1]), lb = Math.hypot(A[0] - Cc[0], A[1] - Cc[1]), lc = Math.hypot(A[0] - B[0], A[1] - B[1]);
    const I = [(la * A[0] + lb * B[0] + lc * Cc[0]) / (la + lb + lc), (la * A[1] + lb * B[1] + lc * Cc[1]) / (la + lb + lc)];
    const inner = pts.map(p => [I[0] + (p[0] - I[0]) * 0.42, I[1] + (p[1] - I[1]) * 0.42]);
    const P = ps => ps.map(p => p.join(',')).join(' ');
    g.appendChild(el('path', { d: 'M' + P(pts).replace(/ /g, ' L') + ' Z M' + P(inner.slice().reverse()).replace(/ /g, ' L') + ' Z', 'fill-rule': 'evenodd',
      fill: paper ? 'rgba(37,99,235,.10)' : 'rgba(96,165,250,.10)', stroke: paper ? 'rgba(30,64,175,.7)' : 'rgba(147,197,253,.6)', 'stroke-width': sw, 'vector-effect': 'non-scaling-stroke' }));
    const lab = deg === 45 ? '45°' : '30°/60°';
    g.appendChild(txt(I[0], I[1] + 0.8, lab));
    return g;
  }

  function renderRightAngleMarker(r, ctx) {
    const size = r.size || 3.5;
    const [x, y] = r.at;
    const rot = r.rotationDeg || 0;
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${rot})` });
    const sa = ctx.print
      ? { stroke: PRINT_COLORS.B, 'stroke-width': 0.35, fill: 'none' }
      : strokeAttrs('B', ctx);
    g.appendChild(el('path', Object.assign({ d: `M 0 -${size} L ${size} -${size} L ${size} 0` }, sa)));
    return g;
  }

  function renderPolyline(r, ctx) {
    const pts = r.points.map(p => p.join(',')).join(' ');
    return el('polyline', Object.assign({ points: pts }, strokeAttrs(r.lineType || 'A', ctx)));
  }

  function renderPolygon(r, ctx) {
    const pts = r.points.map(p => p.join(',')).join(' ');
    const a = strokeAttrs(r.lineType || 'A', ctx);
    if (r.solid) a.fill = a.stroke;            // filled solid, e.g. welds in section
    return el('polygon', Object.assign({ points: pts }, a));
  }

  function labelBox(r, fs) {
    const w = 0.58 * fs * String(r.text || '').length;
    const x0 = r.anchor === 'middle' ? r.at[0] - w / 2 : r.anchor === 'end' ? r.at[0] - w : r.at[0];
    return [x0, r.at[1] - 0.8 * fs, x0 + w, r.at[1] + 0.2 * fs];
  }

  function renderLabel(r, ctx) {
    const t = el('text', {
      x: r.at[0], y: r.at[1], 'font-size': (r.size || 3.8) * Math.min(ctx.k, 1.6), fill: ink(r.color || '#cbd5e1', ctx),
      'text-anchor': r.anchor || 'start', 'font-family': '"Cabinet Grotesk",sans-serif',
    });
    t.textContent = r.text;
    return t;
  }

  function renderCallout(at, number, color, ctx, layout) {
    const g = el('g', { class: 'ce-callout' });
    const [x, y] = at;
    const rb = 3.4 * ctx.k;
    // Search rings around the target for a spot clear of lines and labels.
    let best = null;
    [2.4, 3.6, 5].forEach((ring, ri) => {
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2 - Math.PI / 4;
        const cx = x + Math.cos(a) * rb * ring, cy = y + Math.sin(a) * rb * ring;
        const box = [cx - rb, cy - rb, cx + rb, cy + rb];
        let score = ri * 4 + i * 0.05;
        for (const s of layout.segs) if (segDist(cx, cy, s) < rb * 1.25) score += 10;
        const leader = [x, y, cx, cy];
        for (const b of layout.boxes) {
          if (boxOverlap(b, box)) score += 15;
          // a leader drawn through someone else's text makes both hard to read
          else if (segBox(leader, b) && !(x > b[0] && x < b[2] && y > b[1] && y < b[3])) score += 6;
        }
        if (outside(box, layout.vb)) score += 60;
        if (!best || score < best.score) best = { score, cx, cy, box };
      }
    });
    layout.boxes.push(best.box);
    const lineInk = ctx.print ? PRINT_COLORS.B : ink(color, ctx);
    const dist = Math.hypot(best.cx - x, best.cy - y) || 1;
    const ex = best.cx - (best.cx - x) / dist * rb, ey = best.cy - (best.cy - y) / dist * rb;
    // If the target is inside a piece of text, start the leader where it leaves that text.
    let t0 = 0;
    for (const b of layout.boxes) {
      if (b === best.box || !(x > b[0] && x < b[2] && y > b[1] && y < b[3])) continue;
      const tx = ex !== x ? Math.max((b[0] - x) / (ex - x), (b[2] - x) / (ex - x)) : Infinity;
      const ty = ey !== y ? Math.max((b[1] - y) / (ey - y), (b[3] - y) / (ey - y)) : Infinity;
      t0 = Math.max(t0, Math.min(tx, ty));
    }
    if (t0 < 0.85) {
      const sx = x + (ex - x) * t0, sy = y + (ey - y) * t0;
      g.appendChild(el('line', {
        x1: sx, y1: sy, x2: ex, y2: ey, stroke: lineInk,
        'stroke-width': ctx.print ? 0.25 : 1.2, 'vector-effect': ctx.print ? null : 'non-scaling-stroke',
      }));
      if (t0 === 0) g.appendChild(el('circle', { cx: x, cy: y, r: 0.55 * ctx.k, fill: lineInk }));
    }
    g.appendChild(el('circle', {
      cx: best.cx, cy: best.cy, r: rb, fill: color,
      stroke: ctx.print || ctx.theme !== 'dark' ? '#1b1b1f' : '#0a0c12',
      'stroke-width': ctx.print ? 0.3 : 1, 'vector-effect': ctx.print ? null : 'non-scaling-stroke',
    }));
    const t = el('text', {
      x: best.cx, y: best.cy + 1.35 * ctx.k, 'text-anchor': 'middle', 'font-size': 3.8 * ctx.k,
      'font-family': '"Cabinet Grotesk",sans-serif', 'font-weight': '900', fill: '#0a0c12',
    });
    t.textContent = String(number);
    g.appendChild(t);
    return g;
  }

  function renderPrimitive(r, ctx) {
    switch (r.kind) {
      case 'line': return renderLine(r, ctx);
      case 'arc-construction': return renderArcConstruction(r, ctx);
      case 'circle': return renderCircle(r, ctx);
      case 'point': return renderPoint(r, ctx);
      case 'dimension': return ctx.showMeasurements ? renderDimension(r, ctx) : null;
      case 'angle-arc': return renderAngleArc(r, ctx);
      case 'right-angle-marker': return renderRightAngleMarker(r, ctx);
      case 'tool': return renderTool(r, ctx);
      case 'polyline': return renderPolyline(r, ctx);
      case 'polygon': return renderPolygon(r, ctx);
      case 'label': return ctx.showLabels ? renderLabel(r, ctx) : null;
      default: return null;
    }
  }

  // ── Framing ──

  const fitCache = new WeakMap();

  // Extents of everything the model will ever draw, so the framing never jumps between steps.
  function modelExtents(model) {
    if (fitCache.has(model)) return fitCache.get(model);
    const acc = [Infinity, Infinity, -Infinity, -Infinity];
    (model.steps || []).forEach(step => {
      (step.reveals || []).forEach(r => primExtents(r, acc));
      if (step.calloutAt) primExtents({ kind: 'point', at: step.calloutAt }, acc);
    });
    let res = isFinite(acc[0]) ? acc : null;
    // Some drawings (grid paper) run past the sheet and rely on being clipped: those set
    // clipToBounds, and are never framed wider than their bounds plus a margin.
    if (res && model.bounds && model.clipToBounds) {
      const mx = Math.min(model.bounds.w * 0.12, 3), my = Math.min(model.bounds.h * 0.12, 3);
      res = [Math.max(res[0], -mx), Math.max(res[1], -my), Math.min(res[2], model.bounds.w + mx), Math.min(res[3], model.bounds.h + my)];
      if (res[2] <= res[0] || res[3] <= res[1]) res = null;
    }
    fitCache.set(model, res);
    return res;
  }

  function hasDraggable(model) {
    return (model.steps || []).some(s => (s.reveals || []).some(r => r.draggable));
  }

  function svgPixelSize(svgEl) {
    const rect = svgEl.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) return [rect.width, rect.height];
    const wrap = svgEl.parentElement;
    const w = (wrap && wrap.getBoundingClientRect().width) || 880;
    return [w, svgEl.classList.contains('ce-small') ? 140 : 380];
  }

  // ── Interactive view: zoom, pan and the canvas toggle ──

  let styleInjected = false;
  function injectStyle() {
    if (styleInjected) return;
    styleInjected = true;
    const s = document.createElement('style');
    s.id = 'ce-style';
    s.textContent =
      '.svg-wrap.ce-host{position:relative}' +
      '.svg-wrap.ce-paper{background:' + PAPER.bg + '!important;border-color:#d9d5c7!important}' +
      'svg.ce-paper-svg{background:' + PAPER.bg + '!important}' +
      '.ce-tools{position:absolute;top:8px;right:8px;display:flex;gap:4px;z-index:2}' +
      '.ce-tools button{font:600 12px/1 system-ui,-apple-system,"Segoe UI",sans-serif;min-width:30px;height:30px;padding:0 9px;border-radius:8px;border:1px solid rgba(0,0,0,.2);background:#fff;color:#1b1b1f;cursor:pointer}' +
      '.ce-tools button:hover{background:#efede4}' +
      '.svg-wrap:not(.ce-paper) .ce-tools button{background:#151923;color:#e8eaf2;border-color:rgba(255,255,255,.16)}' +
      '.svg-wrap:not(.ce-paper) .ce-tools button:hover{background:#1f2533}' +
      '.ce-tools button:focus-visible{outline:2px solid #2563eb;outline-offset:1px}' +
      'svg.ce-pannable{cursor:grab;touch-action:none}svg.ce-panning{cursor:grabbing}' +
      '.ce-hint{position:absolute;left:10px;bottom:8px;font:500 11px/1.2 system-ui,sans-serif;color:#6b6f78;pointer-events:none}' +
      '.svg-wrap:not(.ce-paper) .ce-hint{color:#8b93a5}' +
      '@media print{.ce-tools,.ce-hint{display:none}}';
    document.head.appendChild(s);
  }

  function applyView(svgEl) {
    const v = svgEl._ceView, b = svgEl._ceBase;
    if (!v || !b) return;
    const w = b[2] / v.z, h = b[3] / v.z;
    svgEl.setAttribute('viewBox', `${v.cx - w / 2} ${v.cy - h / 2} ${w} ${h}`);
    svgEl.classList.toggle('ce-pannable', v.z > 1.001);
  }

  function zoomBy(svgEl, factor, fx, fy) {
    const v = svgEl._ceView, b = svgEl._ceBase;
    if (!v || !b) return;
    const z = Math.max(1, Math.min(8, v.z * factor));
    if (fx != null) {
      // keep the point under the cursor fixed
      v.cx = fx - (fx - v.cx) * v.z / z;
      v.cy = fy - (fy - v.cy) * v.z / z;
    }
    v.z = z;
    if (z === 1) { v.cx = b[0] + b[2] / 2; v.cy = b[1] + b[3] / 2; }
    applyView(svgEl);
  }

  function rerenderAll() {
    document.querySelectorAll('svg[data-ce]').forEach(svg => {
      if (svg._ceLast) render(svg, svg._ceLast[0], svg._ceLast[1]);
    });
  }

  function attachTools(svgEl) {
    const wrap = svgEl.parentElement;
    if (!wrap || !wrap.classList.contains('svg-wrap') || wrap._ceTools) return;
    wrap._ceTools = true;
    wrap.classList.add('ce-host');
    const bar = document.createElement('div');
    bar.className = 'ce-tools';
    const mk = (label, title, fn) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = label; b.title = title; b.setAttribute('aria-label', title);
      b.addEventListener('click', fn);
      bar.appendChild(b);
      return b;
    };
    mk('+', 'Zoom in', () => zoomBy(svgEl, 1.5));
    mk('−', 'Zoom out', () => zoomBy(svgEl, 1 / 1.5));
    mk('Fit', 'Fit the whole drawing', () => zoomBy(svgEl, 0));
    const linesBtn = mk('', 'Show or hide the construction lines', () => {
      setShowConstruction(!showConstruction);
      rerenderAll();
    });
    wrap._ceLinesBtn = linesBtn;
    const themeBtn = mk('', 'Switch drawing background', () => {
      setCanvasTheme(currentTheme() === 'paper' ? 'dark' : 'paper');
      rerenderAll();
    });
    wrap._ceThemeBtn = themeBtn;
    wrap.appendChild(bar);

    svgEl.addEventListener('wheel', e => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const p = toSvgPoint(svgEl, e);
      zoomBy(svgEl, e.deltaY < 0 ? 1.15 : 1 / 1.15, p[0], p[1]);
    }, { passive: false });

    let pan = null;
    svgEl.addEventListener('pointerdown', e => {
      const v = svgEl._ceView;
      if (!v || v.z <= 1.001 || e.button !== 0) return;
      if (e.target.closest && e.target.closest('.ce-drag-hit, [data-ce-id]')) return;
      pan = { x: e.clientX, y: e.clientY, cx: v.cx, cy: v.cy };
      svgEl.setPointerCapture(e.pointerId);
      svgEl.classList.add('ce-panning');
    });
    svgEl.addEventListener('pointermove', e => {
      if (!pan) return;
      const v = svgEl._ceView, b = svgEl._ceBase;
      const [pw, ph] = svgPixelSize(svgEl);
      const ppu = Math.min(pw / (b[2] / v.z), ph / (b[3] / v.z));
      v.cx = pan.cx - (e.clientX - pan.x) / ppu;
      v.cy = pan.cy - (e.clientY - pan.y) / ppu;
      applyView(svgEl);
    });
    ['pointerup', 'pointercancel'].forEach(t => svgEl.addEventListener(t, () => {
      pan = null; svgEl.classList.remove('ce-panning');
    }));
  }

  function toSvgPoint(svgEl, evt) {
    const pt = svgEl.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    const loc = pt.matrixTransform(svgEl.getScreenCTM().inverse());
    return [loc.x, loc.y];
  }

  // ── Main render ──

  function render(svgEl, model, opts) {
    opts = opts || {};
    const mode = opts.mode || 'interactive';
    const print = isPrintMode(mode);
    const uptoStep = opts.uptoStep == null ? Infinity : opts.uptoStep;
    const showLabels = opts.showLabels !== false;
    const showMeasurements = opts.showMeasurements !== false;
    const showCallouts = opts.showCallouts !== false;
    const steps = model.steps || [];

    while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);

    // Framing: print keeps the model's sheet bounds (true scale); the screen fits the drawing.
    let vb;
    const bounds = model.bounds || { w: 200, h: 150 };
    const ext = (print && opts.fit !== 'extents') || hasDraggable(model) || opts.fit === 'bounds' ? null : modelExtents(model);
    if (ext) {
      const w = Math.max(ext[2] - ext[0], 20), h = Math.max(ext[3] - ext[1], 20);
      const p = opts.pad != null ? opts.pad : Math.max(w, h) * 0.1 + 9;
      const cx = (ext[0] + ext[2]) / 2, cy = (ext[1] + ext[3]) / 2;
      vb = [cx - w / 2 - p, cy - h / 2 - p, w + 2 * p, h + 2 * p];
    } else {
      const pad = opts.pad != null ? opts.pad : 14;
      vb = [-pad, -pad, bounds.w + pad * 2, bounds.h + pad * 2];
    }
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    if (typeof opts.scale === 'number') {
      svgEl.setAttribute('width', (vb[2] * opts.scale).toFixed(3) + 'mm');
      svgEl.setAttribute('height', (vb[3] * opts.scale).toFixed(3) + 'mm');
    } else {
      svgEl.removeAttribute('width');
      svgEl.removeAttribute('height');
    }

    const theme = print ? 'print' : currentTheme();
    let k = 1;
    if (!print) {
      // On a narrow screen let the canvas height follow the drawing's proportions rather
      // than leaving a tall empty band above and below it.
      const wrapEl = svgEl.parentElement;
      if (wrapEl && wrapEl.classList.contains('svg-wrap')) {
        const ww = svgEl.getBoundingClientRect().width;
        if (ww > 0 && ww < 600) svgEl.style.height = Math.round(Math.max(220, Math.min(380, ww * vb[3] / vb[2] + 40))) + 'px';
        else if (ww >= 600) svgEl.style.height = '';
      }
      // Annotation scale: keep labels, dots, arrowheads and callouts readable however
      // large the drawing is relative to the screen.
      const [pw, ph] = svgPixelSize(svgEl);
      const ppu = Math.min(pw / vb[2], ph / vb[3]);
      k = Math.max(1, Math.min(3.2, 12.5 / (3.6 * ppu)));
      if (ppu * 3.6 * k > 17) k = Math.max(0.6, 17 / (3.6 * ppu));

      injectStyle();
      svgEl.setAttribute('data-ce', '');
      svgEl.setAttribute('data-ml-no-theme', '');
      svgEl._ceLast = [model, opts];
      const wrap = svgEl.parentElement;
      const inWrap = wrap && wrap.classList.contains('svg-wrap');
      if (inWrap) {
        wrap.classList.toggle('ce-paper', theme === 'paper');
        wrap.setAttribute('data-ml-no-theme', '');
        attachTools(svgEl);
        if (wrap._ceThemeBtn) wrap._ceThemeBtn.textContent = theme === 'paper' ? 'Dark' : 'Paper';
        if (wrap._ceLinesBtn) { wrap._ceLinesBtn.textContent = showConstruction ? 'Lines on' : 'Lines off'; wrap._ceLinesBtn.setAttribute('aria-pressed', showConstruction ? 'true' : 'false'); }
      } else {
        svgEl.classList.toggle('ce-paper-svg', theme === 'paper');
      }
      const key = (model.id || model.title || '') + '|' + (svgEl.id || '');
      if (!svgEl._ceView || svgEl._ceView.key !== key) {
        svgEl._ceView = { key, z: 1, cx: vb[0] + vb[2] / 2, cy: vb[1] + vb[3] / 2 };
      }
      const prevBase = svgEl._ceBase;
      svgEl._ceBase = vb;
      if (svgEl._ceView.z <= 1.001 || !prevBase) {
        svgEl._ceView.cx = vb[0] + vb[2] / 2; svgEl._ceView.cy = vb[1] + vb[3] / 2;
      }
      applyView(svgEl);
    } else {
      svgEl.setAttribute('viewBox', vb.join(' '));
    }

    const group = el('g', { class: 'ce-construction' });
    svgEl.appendChild(group);

    // Which step counts as "current": the last one revealed in a stepped lesson.
    const lastIndex = Math.min(uptoStep, steps.length) - 1;
    const stepped = !print && isFinite(uptoStep) && uptoStep > 0;

    const layout = { segs: [], boxes: [], vb };
    const visible = [];
    const hideCons = !print && !showConstruction;
    for (let i = 0; i <= lastIndex; i++) {
      (steps[i].reveals || []).forEach(r => {
        if (hideCons && i < lastIndex && (r.lineType === 'construction' || (r.kind === 'point' && !r.label))) return;
        if (r.kind === 'tool') { if (!print && stepped && i === lastIndex) visible.push([r, i]); return; }
        visible.push([r, i]);
        if (r.kind === 'dimension' && !showMeasurements) return;
        primSegments(r, layout.segs);
        if (r.kind === 'label' && showLabels) layout.boxes.push(labelBox(r, (r.size || 3.8) * Math.min(k, 1.6)));
        if (r.kind === 'point') {
          const d = (r.size || 0.9) * k;
          layout.boxes.push([r.at[0] - d, r.at[1] - d, r.at[0] + d, r.at[1] + d]);
        }
      });
    }

    const baseCtx = { mode, print, theme, showLabels, showMeasurements, k, layout };
    const curCtx = Object.assign({}, baseCtx, { current: stepped && steps.length > 1 });
    const labelLayer = el('g', { class: 'ce-labels' });
    visible.forEach(([r, i]) => {
      const ctx = i === lastIndex ? curCtx : baseCtx;
      const node = renderPrimitive(r, ctx);
      if (node) {
        if (r.id) node.setAttribute('data-ce-id', r.id);
        if (i === lastIndex && stepped) node.setAttribute('data-ce-current', '');
        group.appendChild(node);
      }
    });
    if (showLabels) {
      visible.forEach(([r]) => {
        if (r.kind === 'point' && r.label) labelLayer.appendChild(placePointLabel(r, baseCtx, layout));
      });
    }
    group.appendChild(labelLayer);

    if (showCallouts) {
      // On screen only the current step's callout is shown; a full print shows them all.
      for (let i = 0; i <= lastIndex; i++) {
        const step = steps[i];
        if (!step.calloutAt) continue;
        if (!print && !(stepped && i === lastIndex)) continue;
        const color = CALLOUT_COLORS[i % CALLOUT_COLORS.length];
        group.appendChild(renderCallout(step.calloutAt, i + 1, color, baseCtx, layout));
      }
    }
    return group;
  }

  // ── Shared Practice-tab MCQ wiring (Science-Sage-style, generalized) ──

  function wirePractice(containerEl, questions, opts) {
    opts = opts || {};
    const tool = opts.tool || 'drawing-druid';
    const defaultTopic = opts.topic || '';
    containerEl.innerHTML = '';
    questions.forEach((q, qi) => {
      const card = document.createElement('div');
      card.className = 'q-card';

      const qText = document.createElement('div');
      qText.className = 'q-text';
      qText.textContent = (qi + 1) + '. ' + q.text;
      card.appendChild(qText);

      const optsWrap = document.createElement('div');
      optsWrap.className = 'q-opts';
      q.options.forEach((optText, oi) => {
        const btn = document.createElement('button');
        btn.className = 'mc-opt';
        btn.type = 'button';
        btn.textContent = optText;
        btn.addEventListener('click', () => {
          if (optsWrap.classList.contains('answered')) return;
          optsWrap.classList.add('answered');
          const correct = oi === q.answer;
          Array.from(optsWrap.children).forEach((b, bi) => {
            if (bi === q.answer) b.classList.add('correct');
            else if (bi === oi) b.classList.add('wrong');
          });
          if (global.MagicLabProgress) {
            global.MagicLabProgress.track(tool, correct ? 'quiz_correct' : 'quiz_wrong', { topic: q.topic || defaultTopic });
          }
          if (q.explanation) {
            const exp = card.querySelector('.q-explain');
            if (exp) exp.classList.add('show');
          }
        });
        optsWrap.appendChild(btn);
      });
      card.appendChild(optsWrap);

      if (q.explanation) {
        const exp = document.createElement('div');
        exp.className = 'q-explain';
        exp.textContent = q.explanation;
        card.appendChild(exp);
      }
      containerEl.appendChild(card);
    });
  }

  // ── A3 workbook sheets ──

  // 'first' | 'third' | null. A model can say so itself (model.projection); otherwise read it
  // from the title, then from the rest of the text if only one method is ever mentioned.
  function projectionOf(model) {
    if (model.projection === 'first' || model.projection === 'third') return model.projection;
    const FIRST = /\b(first|1st)[- ]angle\b/i, THIRD = /\b(third|3rd)[- ]angle\b/i;
    const title = model.title || '';
    if (FIRST.test(title) && !THIRD.test(title)) return 'first';
    if (THIRD.test(title) && !FIRST.test(title)) return 'third';
    const text = [model.summary, model.workbookPrompt].concat((model.steps || []).map(s => s.instruction)).join(' ');
    const f = FIRST.test(text), t = THIRD.test(text);
    return f && !t ? 'first' : t && !f ? 'third' : null;
  }

  // ISO 128 / SANS 10111 projection-method symbol: a truncated cone's elevation (trapezium,
  // small end on the left) and its end view (two circles). First angle puts the circles on
  // the right of the trapezium; third angle puts them on the left.
  function projectionSymbolSvg(kind) {
    const D = 10, d = 5, L = 10, gap = 5, pad = 2;
    const trapX = kind === 'third' ? pad + D + gap : pad;
    const circX = kind === 'third' ? pad + D / 2 : pad + L + gap + D / 2;
    const cy = pad + D / 2, W = pad * 2 + L + gap + D, H = pad * 2 + D;
    const trap = `${trapX},${cy - d / 2} ${trapX + L},${cy - D / 2} ${trapX + L},${cy + D / 2} ${trapX},${cy + d / 2}`;
    const ln = 'stroke="#111" stroke-width="0.5" fill="none"';
    const cl = 'stroke="#444" stroke-width="0.25" stroke-dasharray="3,1,0.6,1"';
    return `<svg xmlns="${NS}" viewBox="0 0 ${W} ${H}" width="${W * 0.9}mm" height="${H * 0.9}mm" aria-label="${kind === 'third' ? 'Third' : 'First'}-angle projection symbol">` +
      `<polygon points="${trap}" ${ln}/>` +
      `<circle cx="${circX}" cy="${cy}" r="${D / 2}" ${ln}/><circle cx="${circX}" cy="${cy}" r="${d / 2}" ${ln}/>` +
      `<line x1="0.5" y1="${cy}" x2="${W - 0.5}" y2="${cy}" ${cl}/>` +
      `<line x1="${circX}" y1="0.5" x2="${circX}" y2="${H - 0.5}" ${cl}/></svg>`;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  // Chapter names in Afrikaans for the bilingual title strip, keyed by the page's <h1>.
  const TOPIC_AF = {
    'Freehand Drawing': 'Vryhandtekeninge',
    'Geometric Constructions': 'Geometriese konstruksies',
    'Orthographic Projection': 'Ortografiese projeksie',
    'Isometric Drawing': 'Isometriese tekeninge',
    'Solid Geometry': 'Vaste liggame',
    'Descriptive Geometry': 'Beskrywende meetkunde',
    'Civil Drawing': 'Siviele tekeninge',
    'Civil Analytical': 'Siviel analities',
    'Perspective Drawing': 'Perspektieftekeninge',
    'Electrical Drawing': 'Elektriese tekeninge',
    'Practical Assessment Task': 'Praktiese assesseringstaak',
    'Mechanical Assemblies': 'Meganiese samestelling',
    'Mechanical Analytical': 'Meganies analities',
    'Loci': 'Lokusse',
    'Interpenetration & Development': 'Deurdringing & ontwikkeling',
    'Transition Pieces': 'Oorgangstukke',
  };

  function pageTopic() {
    const h1 = document.querySelector('h1.lesson-title, h1');
    const full = h1 ? h1.textContent.trim() : '';
    const base = full.split(' — ')[0].replace(/\s+II$/, '').trim();
    return { en: base, af: TOPIC_AF[base] || '' };
  }

  function pageGrade() {
    const tag = document.querySelector('.chapter-tag');
    const m = tag && /Grade\s+(\d+)(?!\s*[-–])/.exec(tag.textContent);
    return m ? m[1] : '';
  }

  // Sheet geometry, landscape A3 (mm). The drawing goes left of the reference box; a drawing
  // too wide for that but short enough may use the full width below the reference box.
  const AREA_SIDE = { x: 26, y: 30, w: 308, h: 229 };
  const AREA_LOW = { x: 26, y: 97, w: 380, h: 162 };
  // model.printLayout === 'full': no reference box, the whole sheet is drawing area
  // (perspective set-ups, where the plan, both VPs and SP all have to fit).
  const AREA_FULL = { x: 26, y: 26, w: 380, h: 233 };

  // Builds one landscape A3 worksheet per model inside host: border, question bar, the
  // full-size construction, a reference drawing and the bilingual title strip.
  //   opts.scale      — text for the Scale cell (default '1:1'; a model's own .scale wins)
  //   opts.thumb(model) — optional { model, label, maxScale } to show something else as the reference
  //   opts.code       — short chapter code used for the sheet number, e.g. 'OP'
  //   opts.projection — the chapter's default method ('first' | 'third') when a model doesn't state one
  function buildPrintSheets(host, models, opts) {
    opts = opts || {};
    host.innerHTML = '';
    const topic = pageTopic(), grade = pageGrade();
    models.forEach((model, idx) => {
      const sheet = document.createElement('div');
      sheet.className = 'a3-sheet';
      sheet.appendChild(Object.assign(document.createElement('div'), { className: 'frame' }));

      const promptEl = document.createElement('div');
      promptEl.className = 'sheet-prompt';
      promptEl.innerHTML = '<span class="q-k">QUESTION / VRAAG:</span>' + esc(model.workbookPrompt || '');
      sheet.appendChild(promptEl);

      const mainSvg = document.createElementNS(NS, 'svg');
      mainSvg.setAttribute('class', 'a3-main-svg');
      sheet.appendChild(mainSvg);

      const full = model.printLayout === 'full';
      const thumb = (opts.thumb && opts.thumb(model)) || null;
      const thumbBox = document.createElement('div');
      thumbBox.className = 'thumb-box';
      const thumbLabel = document.createElement('div');
      thumbLabel.className = 'thumb-label';
      thumbLabel.textContent = (thumb && thumb.label) || 'Reference / Verwysing (not to scale)';
      thumbBox.appendChild(thumbLabel);
      const thumbSvg = document.createElementNS(NS, 'svg');
      thumbBox.appendChild(thumbSvg);
      if (!full) sheet.appendChild(thumbBox);

      // True scale where it fits; otherwise the next standard reduction.
      const ext = modelExtents(model);
      let scale = 1, area = AREA_SIDE;
      // a model drawn to a stated scale (civil plans at 1:50, details at 1:25) carries its own
      let scaleText = model.scale || opts.scale || '1:1';
      if (ext && scaleText === '1:1') {
        const w = ext[2] - ext[0] + 8, h = ext[3] - ext[1] + 8;
        if (full) { area = AREA_FULL; if (w > AREA_FULL.w || h > AREA_FULL.h) { scale = 0.5; scaleText = '1:2'; } }
        else if (w <= AREA_SIDE.w && h <= AREA_SIDE.h) area = AREA_SIDE;
        else if (w <= AREA_LOW.w && h <= AREA_LOW.h) area = AREA_LOW;
        else { scale = 0.5; scaleText = '1:2'; }
      }

      const proj = projectionOf(model) || (model.projection === 'none' ? null : opts.projection || null);
      const titleBlock = document.createElement('div');
      titleBlock.className = 'title-block';
      titleBlock.innerHTML =
        '<div class="tb-cell tb-brand"><strong>DRAWING DRUID</strong>The Magic Lab</div>' +
        '<div class="tb-cell tb-person">' +
          '<div class="tb-line"><span>NAME / NAAM:</span><span class="tb-blank"></span></div>' +
          '<div class="tb-line"><span>GRADE / GRAAD' + (grade ? ' ' + esc(grade) : '') + ':</span><span class="tb-blank"></span></div>' +
        '</div>' +
        '<div class="tb-cell tb-main">' +
          '<div class="tb-subject">ENGINEERING GRAPHICS &amp; DESIGN<br>INGENIEURSGRAFIKA &amp; ONTWERP</div>' +
          '<div class="tb-exercise">' + esc(model.title) + '</div>' +
        '</div>' +
        '<div class="tb-cell tb-topic">' +
          '<div class="tb-topic-name">' + esc(topic.en.toUpperCase()) + (topic.af ? ' / ' + esc(topic.af.toUpperCase()) : '') + '</div>' +
          '<div class="tb-line"><span>DATE / DATUM:</span><span class="tb-blank"></span></div>' +
        '</div>' +
        '<div class="tb-cell tb-scale"><span class="tb-k">SCALE / SKAAL</span><div class="tb-v">' + esc(scaleText) + '</div></div>' +
        '<div class="tb-cell tb-proj"><span class="tb-k">' + (proj === 'third' ? '3RD ANGLE / 3DE HOEK' : proj === 'first' ? '1ST ANGLE / 1STE HOEK' : 'PROJECTION') + '</span>' +
          (proj ? '<div class="tb-sym">' + projectionSymbolSvg(proj) + '</div>' : '') + '</div>' +
        '<div class="tb-cell tb-no"><span class="tb-k">' + esc(opts.code || '') + '</span><div class="tb-num">' + (idx + 1) + '</div></div>';
      sheet.appendChild(titleBlock);

      host.appendChild(sheet);

      render(mainSvg, model, { uptoStep: Infinity, mode: 'print-full', scale, showCallouts: false, fit: ext ? 'extents' : null, pad: 4 });
      // centre the drawing in its area
      const mw = parseFloat(mainSvg.getAttribute('width')), mh = parseFloat(mainSvg.getAttribute('height'));
      if (mw > 0 && mh > 0) {
        mainSvg.style.left = (area.x + Math.max(0, (area.w - mw) / 2)).toFixed(1) + 'mm';
        mainSvg.style.top = (area.y + Math.max(0, (area.h - mh) / 2)).toFixed(1) + 'mm';
      }
      if (full) return;
      const tm = thumb && thumb.model ? thumb.model : model;
      const b = tm.bounds || { w: 200, h: 150 };
      const fitScale = Math.min(66 / (b.w + 28), 60 / (b.h + 28), (thumb && thumb.maxScale) || 0.35);
      render(thumbSvg, tm, { uptoStep: Infinity, mode: 'print-thumb', scale: fitScale, showCallouts: false, showLabels: false, pad: 14 });
    });
  }

  // Placement helpers for the drawing instruments, so lessons only say which line a tool lies on.
  const tools = {
    // a ruler whose measuring edge lies along P→Q, zero at P (start before P with `lead`), body on `side`
    ruler(P, Q, opts) {
      opts = opts || {};
      const ang = Math.atan2(Q[1] - P[1], Q[0] - P[0]), lead = opts.lead || 0, len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
      return { kind: 'tool', tool: 'ruler', at: [P[0] - lead * Math.cos(ang), P[1] - lead * Math.sin(ang)], angle: ang * 180 / Math.PI,
        length: opts.length || Math.ceil((len + lead + (opts.tail == null ? 15 : opts.tail)) / 10) * 10, side: opts.side || 1 };
    },
    // a set square whose sloping edge runs from P towards Q, standing on a ruler along its base
    squareOn(P, Q, opts) {
      opts = opts || {};
      const deg = opts.deg || 45, size = opts.size || 45, flip = !!opts.flip;
      const phi = Math.atan2(Q[1] - P[1], Q[0] - P[0]) * 180 / Math.PI;
      const theta = flip ? phi - deg + 180 : phi + deg, beta = (flip ? phi - deg : phi + deg) * Math.PI / 180;
      const sq = { kind: 'tool', tool: 'set-square', deg, at: P, angle: theta, size, flip, use: 'hyp' };
      if (opts.ruler === false) return [sq];
      const u = [Math.cos(beta), Math.sin(beta)], Lr = Math.ceil((size + 45) / 10) * 10;
      let R0 = [P[0] - 20 * u[0], P[1] - 20 * u[1]], ang = beta * 180 / Math.PI, side = flip ? 1 : -1;
      if (u[0] < -1e-6) { R0 = [R0[0] + Lr * u[0], R0[1] + Lr * u[1]]; ang += 180; side = -side; }   // keep the figures reading left to right
      return [sq, { kind: 'tool', tool: 'ruler', at: R0, angle: ang, length: Lr, side }];
    },
  };

  // Keyboard-friendly view controls for a rendered interactive SVG.
  function panBy(svgEl, fx, fy) {
    const v = svgEl._ceView, b = svgEl._ceBase;
    if (!v || !b || v.z <= 1.001) return;
    v.cx += fx * b[2] / v.z;
    v.cy += fy * b[3] / v.z;
    applyView(svgEl);
  }
  const view = {
    zoom: (svgEl, factor) => zoomBy(svgEl, factor),
    fit: svgEl => zoomBy(svgEl, 0),
    pan: panBy,
    toggleLines: () => { setShowConstruction(!showConstruction); rerenderAll(); return showConstruction; },
    toggleTheme: () => { setCanvasTheme(currentTheme() === 'paper' ? 'dark' : 'paper'); rerenderAll(); return currentTheme(); },
  };

  global.ConstructionEngine = {
    render, wirePractice, buildPrintSheets, projectionOf, projectionSymbolSvg, addFinishSteps, setShowConstruction, view, tools,
    LINE_TYPES, CALLOUT_COLORS, PRINT_COLORS, MODE_STROKE_MULT,
  };
})(window);
