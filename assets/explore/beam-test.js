/* Gr9 Technology: Forces and material properties — load a beam.
 * A beam rests on two supports with a load in the middle. It bends
 * (deflection δ = F·L³ / 48·E·I); its top is squashed (compression) and its
 * bottom stretched (tension). It fails when the bending stress σ = M·c / I
 * (M = F·L / 4) reaches the material's strength. Same material, different
 * shape: the shape of the cross-section matters as much as the material.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const MAT = {
    steel: { n: { en: 'Steel', af: 'Staal' }, E: 200000, S: 250, col: '#94a3b8', fail: 'yield' },
    alu: { n: { en: 'Aluminium', af: 'Aluminium' }, E: 70000, S: 150, col: '#cbd5e1', fail: 'yield' },
    wood: { n: { en: 'Pine wood', af: 'Dennehout' }, E: 10000, S: 40, col: '#b45309', fail: 'snap' },
    concrete: { n: { en: 'Concrete (no steel)', af: 'Beton (sonder staal)' }, E: 30000, S: 3, col: '#a8a29e', fail: 'crack' },
    pvc: { n: { en: 'PVC plastic', af: 'PVC-plastiek' }, E: 3000, S: 50, col: '#e5e7eb', fail: 'yield' },
  };
  // cross-sections (mm): second moment of area I (mm⁴) and distance c to the outer edge
  const SHAPE = {
    flat: { n: { en: 'Flat plank 60×10', af: 'Plat plank 60×10' }, I: 60 * 1000 / 12, c: 5, draw: [[-30, -5, 60, 10]] },
    edge: { n: { en: 'Plank on edge', af: 'Plank op sy kant' }, I: 10 * 216000 / 12, c: 30, draw: [[-5, -30, 10, 60]] },
    ibeam: { n: { en: 'I-beam', af: 'I-balk' }, I: (40 * 216000 - 35 * 125000) / 12, c: 30, draw: [[-20, -30, 40, 5], [-2.5, -25, 5, 50], [-20, 25, 40, 5]] },
    tube: { n: { en: 'Square tube', af: 'Vierkantige buis' }, I: (810000 - 160000) / 12, c: 15, draw: [[-15, -15, 30, 5], [-15, 10, 30, 5], [-15, -10, 5, 20], [10, -10, 5, 20]] },
  };
  const T = {
    aria: { en: 'A beam on two supports with a load in the middle', af: '\'n Balk op twee stutte met \'n las in die middel' },
    beam: { en: 'The beam', af: 'Die balk' }, mat: { en: 'Material', af: 'Materiaal' }, shape: { en: 'Cross-section (same amount of material)', af: 'Deursnee (dieselfde hoeveelheid materiaal)' },
    span: { en: 'Span', af: 'Spanwydte' }, load: { en: 'Load in the middle', af: 'Las in die middel' },
    res: { en: 'Result', af: 'Resultaat' }, bend: { en: 'Bends down by', af: 'Buig af met' }, stress: { en: 'Stress in the beam', af: 'Spanning in die balk' },
    str: { en: 'Material strength', af: 'Materiaalsterkte' }, used: { en: 'Strength used', af: 'Sterkte gebruik' },
    comp: { en: 'compression (squashed)', af: 'kompressie (saamgedruk)' }, tens: { en: 'tension (stretched)', af: 'trekspanning (gerek)' },
    yield: { en: 'It bends permanently (yields).', af: 'Dit buig permanent (gee mee).' }, snap: { en: 'It snaps.', af: 'Dit breek.' }, crack: { en: 'It cracks and breaks on the stretched side.', af: 'Dit kraak en breek aan die gerekte kant.' },
    ok: { en: 'Safe', af: 'Veilig' },
  };
  let mat = 'steel', shape = 'flat', span = 1, load = 0.2;
  const ui = MLX.layout(root, { height: (w) => Math.max(260, Math.min(330, Math.round(w * 0.4))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.beam);
  MLX.seg(c1, { label: T.mat, options: Object.keys(MAT).map(k => [k, MAT[k].n]), value: mat, onChange: (v) => { mat = v; update(); } });
  MLX.seg(c1, { label: T.shape, options: Object.keys(SHAPE).map(k => [k, SHAPE[k].n]), value: shape, onChange: (v) => { shape = v; update(); } });
  MLX.slider(c1, { label: T.span, min: 0.5, max: 3, step: 0.1, value: span, fmt: (v) => num(v, 1) + ' m', onInput: (v) => { span = v; update(); } });
  MLX.slider(c1, { label: T.load, min: 0, max: 5, step: 0.1, value: load, fmt: (v) => num(v, 1) + ' kN', onInput: (v) => { load = v; update(); } });
  const c2 = MLX.card(ui.side, T.res);
  const ro = MLX.readout(c2, [['bend', T.bend], ['stress', T.stress], ['str', T.str], ['used', T.used]]);

  function model() {
    const m = MAT[mat], s = SHAPE[shape], F = load * 1000, Lmm = span * 1000;
    const defl = F * Lmm ** 3 / (48 * m.E * s.I);
    const M = F * Lmm / 4, stress = M * s.c / s.I;
    return { m, s, defl, stress, frac: stress / m.S, failed: stress >= m.S };
  }
  function update() {
    const r = model();
    ro.set('bend', r.failed ? '—' : (r.defl < 10 ? num(r.defl, 1) : Math.round(r.defl)) + ' mm');
    ro.set('stress', (r.stress < 10 ? num(r.stress, 1) : Math.round(r.stress)) + ' MPa');
    ro.set('str', r.m.S + ' MPa');
    ro.set('used', r.failed ? '> 100%' : Math.round(r.frac * 100) + '%', r.failed ? '#fca5a5' : r.frac > 0.6 ? '#fde68a' : '#86efac');
    let c;
    if (r.failed) c = { en: `${L(r.m.n)}: the stress (${Math.round(r.stress)} MPa) is more than the material can take. ${L(T[r.m.fail])} Try a stiffer shape, a shorter span or a smaller load.`, af: `${L(r.m.n)}: die spanning (${Math.round(r.stress)} MPa) is meer as wat die materiaal kan hanteer. ${L(T[r.m.fail])} Probeer 'n stywer vorm, 'n korter spanwydte of 'n kleiner las.` };
    else if (shape === 'flat' && load > 0) c = { en: 'Turn the same plank on its edge: the same material, but it bends far less — the deeper the beam, the stiffer it is.', af: 'Draai dieselfde plank op sy kant: dieselfde materiaal, maar dit buig baie minder — hoe dieper die balk, hoe stywer is dit.' };
    else c = { en: 'The top of the beam is squashed (compression) and the bottom is stretched (tension). The beam holds this load.', af: 'Die bokant van die balk word saamgedruk (kompressie) en die onderkant gerek (trekspanning). Die balk hou hierdie las.' };
    ui.setCaption(c);
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    const r = model();
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const xs = W * 0.08, xe = W * 0.72, by = H * 0.3, thick = Math.max(10, Math.min(30, r.s.c * 0.9 + 6));
    const ground = H - 34, maxSag = Math.min(70, ground - by - thick - 20);
    // supports: pillars tall enough that the beam never sags into the ground
    ctx.fillStyle = '#475569';
    [xs, xe].forEach(x => { ctx.beginPath(); ctx.moveTo(x, by + thick / 2); ctx.lineTo(x - 16, by + thick / 2 + 20); ctx.lineTo(x - 9, by + thick / 2 + 20); ctx.lineTo(x - 9, ground); ctx.lineTo(x + 9, ground); ctx.lineTo(x + 9, by + thick / 2 + 20); ctx.lineTo(x + 16, by + thick / 2 + 20); ctx.closePath(); ctx.fill(); });
    ctx.fillStyle = '#1e293b'; ctx.fillRect(xs - 40, ground, xe - xs + 80, 6);
    // bent shape: exaggerated but capped; broken beams show a gap at mid-span
    const sag = r.failed ? maxSag : Math.min(maxSag, r.defl * 0.6 + (r.defl > 0 ? 1 : 0));
    const curve = (u) => { const v = u <= 0.5 ? u : 1 - u; return by + sag * (3 * (2 * v) - (2 * v) ** 3) / 2; };
    const steps = 60;
    for (let i = 0; i < steps; i++) {
      const u0 = i / steps, u1 = (i + 1) / steps;
      if (r.failed && r.m.fail !== 'yield' && Math.abs(u0 - 0.5) < 0.02) continue;
      const x0 = xs + u0 * (xe - xs), x1 = xs + u1 * (xe - xs) + 0.8, y0 = curve(u0), y1 = curve(u1);   // slight overlap: no seams
      // bending stress is largest in the middle: colour the top (compression) and bottom (tension)
      const k = Math.min(1, r.frac) * (1 - Math.abs(0.5 - (u0 + u1) / 2) * 2);
      ctx.fillStyle = r.m.col; ctx.beginPath(); ctx.moveTo(x0, y0 - thick / 2); ctx.lineTo(x1, y1 - thick / 2); ctx.lineTo(x1, y1 + thick / 2); ctx.lineTo(x0, y0 + thick / 2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = `rgba(59,130,246,${0.85 * k})`; ctx.beginPath(); ctx.moveTo(x0, y0 - thick / 2); ctx.lineTo(x1, y1 - thick / 2); ctx.lineTo(x1, y1 - thick / 6); ctx.lineTo(x0, y0 - thick / 6); ctx.closePath(); ctx.fill();
      ctx.fillStyle = `rgba(239,68,68,${0.85 * k})`; ctx.beginPath(); ctx.moveTo(x0, y0 + thick / 6); ctx.lineTo(x1, y1 + thick / 6); ctx.lineTo(x1, y1 + thick / 2); ctx.lineTo(x0, y0 + thick / 2); ctx.closePath(); ctx.fill();
    }
    if (r.failed && r.m.fail === 'crack') { ctx.strokeStyle = '#fca5a5'; ctx.lineWidth = 2; const mx = (xs + xe) / 2, my = curve(0.5); ctx.beginPath(); ctx.moveTo(mx, my + thick / 2); ctx.lineTo(mx - 4, my + 2); ctx.lineTo(mx + 3, my - 4); ctx.lineTo(mx - 2, my - thick / 2); ctx.stroke(); }
    // the load
    const mx = (xs + xe) / 2, my = curve(0.5) - thick / 2;
    if (load > 0) {
      ctx.fillStyle = '#334155'; const bw = 30 + load * 6; ctx.fillRect(mx - bw / 2, my - 34 - load * 4, bw, 34 + load * 4);
      text(ctx, num(load, 1) + ' kN', mx, my - 14 - load * 2, { size: 12, mono: true, weight: 700, align: 'center', color: '#e2e8f0' });
    }
    // labels
    if (!r.failed && load > 0) {
      text(ctx, T.comp, xs + (xe - xs) * 0.18, curve(0.18) - thick / 2 - 8, { size: 11, weight: 700, color: '#93c5fd' });
      text(ctx, T.tens, xs + (xe - xs) * 0.18, curve(0.18) + thick / 2 + 16, { size: 11, weight: 700, color: '#fca5a5' });
    }
    if (r.failed) text(ctx, T[r.m.fail], mx, ground - 10, { size: 14, weight: 800, align: 'center', color: '#fca5a5' });
    text(ctx, num(span, 1) + ' m', mx, ground + 20, { size: 11, mono: true, align: 'center', color: 'rgba(226,232,240,0.55)' });
    // cross-section, drawn to scale
    const cx = W * 0.87, cy = H * 0.42, sc = Math.min(1.6, W / 600);
    ctx.fillStyle = r.m.col;
    r.s.draw.forEach(([x, y, w, h]) => ctx.fillRect(cx + x * sc, cy + y * sc, w * sc, h * sc));
    text(ctx, L({ en: 'cross-section', af: 'deursnee' }), cx, cy + 34 * sc + 20, { size: 11, align: 'center', color: 'rgba(226,232,240,0.6)' });
  }

  update();
});
