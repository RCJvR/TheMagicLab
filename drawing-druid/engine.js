// ConstructionEngine — data-first SVG renderer for EGD step-by-step constructions.
// A "model" is a plain object { id, title, bounds:{w,h}, steps:[{ id, instruction, measurement, calloutAt, reveals:[...] }] }.
// The same model renders three ways (interactive / print-full / print-thumb) by changing render() opts.
(function (global) {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';

  // SANS drawing line-type conventions (A/B/C) + in-app-only helper conventions.
  const LINE_TYPES = {
    A:            { width: 0.7,  dash: null,        color: '#e8eaf2' }, // continuous thick — outlines/final result
    B:            { width: 0.35, dash: null,        color: '#cbd5e1' }, // continuous thin — dimension/projection lines
    C:             { width: 0.35, dash: null,        color: '#cbd5e1' }, // continuous thin freehand — break lines
    construction: { width: 0.25, dash: '2,2',        color: '#eab308' }, // in-app-only: distinguishes scaffolding from result
    centre:       { width: 0.3,  dash: '8,2,1,2',    color: '#94a3b8' },
    hidden:       { width: 0.35, dash: '4,2',        color: '#94a3b8' },
  };

  const CALLOUT_COLORS = ['#eab308', '#f472b6', '#60a5fa', '#4ade80', '#fb923c', '#a78bfa', '#22d3ee', '#f87171'];

  // The on-screen palette is light-on-dark. Printed sheets are dark ink on white paper, so
  // print modes remap every colour to something that actually reads as ink on a physical page.
  const PRINT_COLORS = {
    A: '#111111', B: '#3f3f46', C: '#8a8a92', construction: '#b45309', centre: '#52525b', hidden: '#52525b',
  };
  const PRINT_TEXT_COLOR = '#1c1c1f';

  // On-screen strokes are scaled up relative to true mm width for legibility; print modes use true mm.
  const MODE_STROKE_MULT = { interactive: 2.4, 'print-full': 1, 'print-thumb': 1 };
  function isPrintMode(mode) { return mode === 'print-full' || mode === 'print-thumb'; }

  function el(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) {
      if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    return e;
  }

  function strokeAttrs(lineType, mode) {
    const lt = LINE_TYPES[lineType] || LINE_TYPES.B;
    const mult = MODE_STROKE_MULT[mode] || 1;
    const color = isPrintMode(mode) ? (PRINT_COLORS[lineType] || PRINT_COLORS.B) : lt.color;
    return {
      stroke: color,
      'stroke-width': (lt.width * mult).toFixed(3),
      'stroke-dasharray': lt.dash || null,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      fill: 'none',
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

  // ── Primitive renderers ──

  function renderLine(r, mode) {
    return el('line', Object.assign(
      { x1: r.p1[0], y1: r.p1[1], x2: r.p2[0], y2: r.p2[1] },
      strokeAttrs(r.lineType || 'A', mode)
    ));
  }

  function renderArcConstruction(r, mode) {
    const d = arcPath(r.center[0], r.center[1], r.r, r.startDeg, r.endDeg);
    return el('path', Object.assign({ d }, strokeAttrs(r.lineType || 'construction', mode)));
  }

  function renderCircle(r, mode) {
    return el('circle', Object.assign(
      { cx: r.center[0], cy: r.center[1], r: r.r },
      strokeAttrs(r.lineType || 'B', mode)
    ));
  }

  function renderPoint(r, mode, showLabels) {
    const g = el('g', { class: 'ce-point' });
    const [x, y] = r.at;
    const printMode = isPrintMode(mode);
    g.appendChild(el('circle', { cx: x, cy: y, r: r.size || 0.9, fill: printMode ? PRINT_COLORS.A : (r.color || '#fde047') }));
    if (r.draggable) {
      g.appendChild(el('circle', { cx: x, cy: y, r: (r.size || 0.9) + 4, fill: 'transparent', class: 'ce-drag-hit' }));
    }
    if (showLabels && r.label) {
      const t = el('text', {
        x: x + 2.2, y: y - 1.8, 'font-size': 3.6, fill: printMode ? PRINT_TEXT_COLOR : '#e8eaf2',
        'font-family': '"Cabinet Grotesk",sans-serif', 'font-weight': '700',
      });
      t.textContent = r.label;
      g.appendChild(t);
    }
    return g;
  }

  function renderDimension(r, mode) {
    const g = el('g', { class: 'ce-dim' });
    const [x1, y1] = r.p1, [x2, y2] = r.p2;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    const offset = r.offset != null ? r.offset : 10;
    const ox = nx * offset, oy = ny * offset;
    const sa = strokeAttrs('B', mode);
    const printMode = isPrintMode(mode);
    g.appendChild(el('line', Object.assign({ x1, y1, x2: x1 + ox, y2: y1 + oy }, sa)));
    g.appendChild(el('line', Object.assign({ x1: x2, y1: y2, x2: x2 + ox, y2: y2 + oy }, sa)));
    const dax = x1 + ox, day = y1 + oy, dbx = x2 + ox, dby = y2 + oy;
    g.appendChild(el('line', Object.assign({ x1: dax, y1: day, x2: dbx, y2: dby }, sa)));
    // simple arrowheads at each end of the dimension line
    [[dax, day, dbx, dby], [dbx, dby, dax, day]].forEach(([fx, fy, tx, ty]) => {
      const ang = Math.atan2(ty - fy, tx - fx);
      const s = 2.2;
      const p1 = [fx + s * Math.cos(ang - 0.4), fy + s * Math.sin(ang - 0.4)];
      const p2 = [fx + s * Math.cos(ang + 0.4), fy + s * Math.sin(ang + 0.4)];
      g.appendChild(el('polygon', { points: `${fx},${fy} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`, fill: printMode ? PRINT_COLORS.B : LINE_TYPES.B.color }));
    });
    const mx = (dax + dbx) / 2, my = (day + dby) / 2;
    const text = el('text', {
      x: mx, y: my - 1.4, 'text-anchor': 'middle', 'font-size': 4.2, fill: printMode ? PRINT_TEXT_COLOR : '#fde047',
      'font-family': '"JetBrains Mono",monospace', 'font-weight': '600',
    });
    text.textContent = r.text || '';
    g.appendChild(text);
    return g;
  }

  function renderAngleArc(r, mode) {
    const g = el('g', { class: 'ce-angle' });
    const [vx, vy] = r.vertex;
    const a1 = Math.atan2(r.p1[1] - vy, r.p1[0] - vx) * 180 / Math.PI;
    const a2 = Math.atan2(r.p2[1] - vy, r.p2[0] - vx) * 180 / Math.PI;
    const radius = r.radius || 10;
    g.appendChild(el('path', Object.assign({ d: arcPath(vx, vy, radius, a1, a2) }, strokeAttrs('B', mode))));
    if (r.text) {
      let sweep = a2 - a1; while (sweep < 0) sweep += 360;
      const midDeg = a1 + sweep / 2;
      const tx = vx + (radius + 3.5) * Math.cos(toRad(midDeg));
      const ty = vy + (radius + 3.5) * Math.sin(toRad(midDeg));
      const t = el('text', { x: tx, y: ty, 'text-anchor': 'middle', 'font-size': 3.8, fill: isPrintMode(mode) ? PRINT_TEXT_COLOR : '#fde047', 'font-family': '"JetBrains Mono",monospace' });
      t.textContent = r.text;
      g.appendChild(t);
    }
    return g;
  }

  function renderRightAngleMarker(r, mode) {
    const size = r.size || 3.5;
    const [x, y] = r.at;
    const rot = r.rotationDeg || 0;
    const g = el('g', { transform: `translate(${x} ${y}) rotate(${rot})` });
    g.appendChild(el('path', {
      d: `M 0 -${size} L ${size} -${size} L ${size} 0`,
      stroke: isPrintMode(mode) ? PRINT_COLORS.B : LINE_TYPES.B.color, 'stroke-width': 0.35, fill: 'none',
    }));
    return g;
  }

  function renderPolyline(r, mode) {
    const pts = r.points.map(p => p.join(',')).join(' ');
    return el('polyline', Object.assign({ points: pts }, strokeAttrs(r.lineType || 'A', mode)));
  }

  function renderPolygon(r, mode) {
    const pts = r.points.map(p => p.join(',')).join(' ');
    return el('polygon', Object.assign({ points: pts }, strokeAttrs(r.lineType || 'A', mode)));
  }

  function renderLabel(r, mode) {
    const t = el('text', {
      x: r.at[0], y: r.at[1], 'font-size': r.size || 3.8, fill: isPrintMode(mode) ? PRINT_TEXT_COLOR : (r.color || '#cbd5e1'),
      'text-anchor': r.anchor || 'start', 'font-family': '"Cabinet Grotesk",sans-serif',
    });
    t.textContent = r.text;
    return t;
  }

  function renderCallout(at, number, color) {
    const g = el('g', { class: 'ce-callout' });
    const [x, y] = at;
    g.appendChild(el('circle', { cx: x, cy: y, r: 3.4, fill: color, stroke: '#0a0c12', 'stroke-width': 0.5 }));
    const t = el('text', {
      x, y: y + 1.3, 'text-anchor': 'middle', 'font-size': 3.8,
      'font-family': '"Cabinet Grotesk",sans-serif', 'font-weight': '900', fill: '#0a0c12',
    });
    t.textContent = String(number);
    g.appendChild(t);
    return g;
  }

  function renderPrimitive(r, ctx) {
    switch (r.kind) {
      case 'line': return renderLine(r, ctx.mode);
      case 'arc-construction': return renderArcConstruction(r, ctx.mode);
      case 'circle': return renderCircle(r, ctx.mode);
      case 'point': return renderPoint(r, ctx.mode, ctx.showLabels);
      case 'dimension': return ctx.showMeasurements ? renderDimension(r, ctx.mode) : null;
      case 'angle-arc': return renderAngleArc(r, ctx.mode);
      case 'right-angle-marker': return renderRightAngleMarker(r, ctx.mode);
      case 'polyline': return renderPolyline(r, ctx.mode);
      case 'polygon': return renderPolygon(r, ctx.mode);
      case 'label': return ctx.showLabels ? renderLabel(r, ctx.mode) : null;
      default: return null;
    }
  }

  // ── Main render ──

  function render(svgEl, model, opts) {
    opts = opts || {};
    const mode = opts.mode || 'interactive';
    const uptoStep = opts.uptoStep == null ? Infinity : opts.uptoStep;
    const showLabels = opts.showLabels !== false;
    const showMeasurements = opts.showMeasurements !== false;
    const showCallouts = opts.showCallouts !== false;
    const pad = opts.pad != null ? opts.pad : 14;

    while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);

    const bounds = model.bounds || { w: 200, h: 150 };
    const vbW = bounds.w + pad * 2, vbH = bounds.h + pad * 2;
    svgEl.setAttribute('viewBox', `${-pad} ${-pad} ${vbW} ${vbH}`);
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    if (typeof opts.scale === 'number') {
      svgEl.setAttribute('width', (vbW * opts.scale).toFixed(3) + 'mm');
      svgEl.setAttribute('height', (vbH * opts.scale).toFixed(3) + 'mm');
    } else {
      svgEl.removeAttribute('width');
      svgEl.removeAttribute('height');
    }

    const group = el('g', { class: 'ce-construction' });
    svgEl.appendChild(group);

    const ctx = { mode, showLabels, showMeasurements };
    const steps = model.steps || [];
    for (let i = 0; i < steps.length && i < uptoStep; i++) {
      const step = steps[i];
      (step.reveals || []).forEach(r => {
        const node = renderPrimitive(r, ctx);
        if (node) {
          if (r.id) node.setAttribute('data-ce-id', r.id);
          group.appendChild(node);
        }
      });
      if (showCallouts && step.calloutAt) {
        const color = CALLOUT_COLORS[i % CALLOUT_COLORS.length];
        group.appendChild(renderCallout(step.calloutAt, i + 1, color));
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

  global.ConstructionEngine = { render, wirePractice, LINE_TYPES, CALLOUT_COLORS };
})(window);
