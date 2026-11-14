/* DC circuits (Gr 10, 11, 12) — one shared simulation, configured per page with data-circuit on #mlx-root:
 *   gr10: series, parallel and mixed with an ideal cell (no internal resistance)
 *   gr11: internal resistance (V = ε − Ir, with the V–I graph) and R₁ in series with R₂ ∥ R₃, real cell
 *   gr12: as gr11
 * Circuit symbols follow CAPS/SANS: cell (long thin plate = +, short thick plate = −), resistors as rectangles,
 * ammeter A in series, voltmeter V in parallel. Conventional current leaves the + terminal; the dots move at a
 * speed proportional to the current in each branch, so the current visibly divides at a junction.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const grade = root.getAttribute('data-circuit') || 'gr10';
  const T = {
    aria: { en: 'A circuit diagram with a cell, resistors, an ammeter and a voltmeter, with current flowing', af: '\'n Stroombaandiagram met \'n sel, resistors, \'n ammeter en \'n voltmeter, met stroom wat vloei' },
    I: { en: 'Current from the cell', af: 'Stroom uit die sel' }, Rt: { en: 'Total resistance', af: 'Totale weerstand' }, Vt: { en: 'Terminal voltage', af: 'Terminaalspanning' },
    lost: { en: '"Lost volts" (Ir)', af: '"Verlore volts" (Ir)' }, P: { en: 'Power delivered to the circuit', af: 'Drywing aan die stroombaan gelewer' },
    V1: { en: 'Voltage across R₁', af: 'Spanning oor R₁' }, I1: { en: 'Current in R₁', af: 'Stroom in R₁' }, I2: { en: 'Current in R₂', af: 'Stroom in R₂' }, I3: { en: 'Current in R₃', af: 'Stroom in R₃' },
    type: { en: 'Circuit', af: 'Stroombaan' }, series: { en: 'Series', af: 'Serie' }, parallel: { en: 'Parallel', af: 'Parallel' },
    mixed: { en: 'R₁ + (R₂ ∥ R₃)', af: 'R₁ + (R₂ ∥ R₃)' }, internal: { en: 'Internal resistance', af: 'Interne weerstand' },
    vals: { en: 'Values', af: 'Waardes' }, emf: { en: 'emf ε', af: 'emk ε' }, r: { en: 'Internal resistance r', af: 'Interne weerstand r' },
    Rext: { en: 'External resistance R', af: 'Eksterne weerstand R' },
    cell: { en: 'cell', af: 'sel' }, xI: { en: 'Current I (A)', af: 'Stroom I (A)' }, yV: { en: 'Terminal voltage V (V)', af: 'Terminaalspanning V (V)' },
    grad: { en: 'gradient = −r', af: 'gradiënt = −r' },
    capS: { en: 'Series: the same current flows through every component; the voltages add up to the emf.', af: 'Serie: dieselfde stroom vloei deur elke komponent; die spannings tel op tot die emk.' },
    capP: { en: 'Parallel: each branch gets the full voltage; the branch currents add up to the current from the cell.', af: 'Parallel: elke tak kry die volle spanning; die takstrome tel op tot die stroom uit die sel.' },
    capM: { en: 'The current through R₁ divides between R₂ and R₃ (I₁ = I₂ + I₃); R₂ and R₃ share the same voltage.', af: 'Die stroom deur R₁ verdeel tussen R₂ en R₃ (I₁ = I₂ + I₃); R₂ en R₃ het dieselfde spanning.' },
    capI: { en: 'A smaller external resistance draws more current, so more volts are "lost" inside the cell (Ir) and the terminal voltage falls.', af: '\'n Kleiner eksterne weerstand trek meer stroom, dus gaan meer volts in die sel "verlore" (Ir) en die terminaalspanning daal.' },
  };
  const real = grade !== 'gr10';
  const modes = real ? ['internal', 'mixed'] : ['series', 'parallel', 'mixed'];
  const S = { mode: modes[0], emf: real ? 12 : 6, r: real ? 1 : 0, R1: 4, R2: 6, R3: 12, R: 5 };

  function solve() {
    const r = real ? S.r : 0;
    if (S.mode === 'internal') { const I = S.emf / (S.R + r); return { Rt: S.R + r, Rext: S.R, I, Vt: S.emf - I * r, branch: { R: I } }; }
    if (S.mode === 'series') { const Rx = S.R1 + S.R2, I = S.emf / (Rx + r); return { Rt: Rx + r, Rext: Rx, I, Vt: S.emf - I * r, branch: { R1: I, R2: I } }; }
    if (S.mode === 'parallel') { const Rx = 1 / (1 / S.R1 + 1 / S.R2), I = S.emf / (Rx + r), V = S.emf - I * r; return { Rt: Rx + r, Rext: Rx, I, Vt: V, branch: { R1: V / S.R1, R2: V / S.R2 } }; }
    const Rp = 1 / (1 / S.R2 + 1 / S.R3), Rx = S.R1 + Rp, I = S.emf / (Rx + r), Vp = I * Rp;
    return { Rt: Rx + r, Rext: Rx, I, Vt: S.emf - I * r, branch: { R1: I, R2: Vp / S.R2, R3: Vp / S.R3 } };
  }

  const panel = root.closest('.tab-panel') || root.parentNode;
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 300 : Math.max(340, Math.min(420, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.I, unit: 'A' });
  const ro = MLX.readout(prim.el, [['a', T.Rt], ['b', T.Vt], ['c', T.lost], ['d', T.P]]);
  const c1 = MLX.card(ui.side, T.type);
  MLX.seg(c1, { options: modes.map(m => [m, T[m]]), value: S.mode, onChange: (v) => { S.mode = v; showRows(); update(); } });
  const c2 = MLX.card(ui.side, T.vals);
  MLX.slider(c2, { label: T.emf, min: 1.5, max: 12, step: 0.5, value: S.emf, fmt: (v) => num(v, 1) + ' V', onInput: (v) => { S.emf = v; update(); } });
  const sr = real ? MLX.slider(c2, { label: T.r, min: 0, max: 3, step: 0.1, value: S.r, fmt: (v) => num(v, 1) + ' Ω', onInput: (v) => { S.r = v; update(); } }) : null;
  const sR = MLX.slider(c2, { label: T.Rext, min: 0.5, max: 20, step: 0.5, value: S.R, fmt: (v) => num(v, 1) + ' Ω', onInput: (v) => { S.R = v; update(); } });
  const s1 = MLX.slider(c2, { label: 'R₁', min: 1, max: 20, step: 1, value: S.R1, fmt: (v) => v + ' Ω', onInput: (v) => { S.R1 = v; update(); } });
  const s2 = MLX.slider(c2, { label: 'R₂', min: 1, max: 20, step: 1, value: S.R2, fmt: (v) => v + ' Ω', onInput: (v) => { S.R2 = v; update(); } });
  const s3 = MLX.slider(c2, { label: 'R₃', min: 1, max: 20, step: 1, value: S.R3, fmt: (v) => v + ' Ω', onInput: (v) => { S.R3 = v; update(); } });
  function showRows() {
    const show = (sl, on) => { sl.el.style.display = on ? '' : 'none'; };
    show(sR, S.mode === 'internal'); show(s1, S.mode !== 'internal'); show(s2, S.mode !== 'internal'); show(s3, S.mode === 'mixed');
    const lab = prim.el.querySelectorAll('.mlx-row > span:first-child');
    lab[2].textContent = L(real ? T.lost : T.V1);
    lab[3].textContent = L(S.mode === 'internal' || S.mode === 'series' ? T.P : T.I2);
  }

  const loop = MLX.loop(ui.cv.el, () => ui.cv.draw());
  loop.start();
  MLX.onTheme(() => ui.cv.draw());

  // ── drawing helpers ──
  let c, ctx;
  function wire(pts) { ctx.strokeStyle = c.lineHard; ctx.lineWidth = 2; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); }
  function resistor(x, y, vert, name, val, cur) {
    const w = vert ? 18 : 48, h = vert ? 48 : 18;
    ctx.fillStyle = c.stage; ctx.fillRect(x - w / 2, y - h / 2, w, h);
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.8; ctx.strokeRect(x - w / 2, y - h / 2, w, h);
    const lx = vert ? x + 18 : x, ly = vert ? y - 4 : y - 18;
    text(ctx, name + ' = ' + num(val, val % 1 ? 1 : 0) + ' Ω', lx, ly, { size: 12, mono: true, align: vert ? 'left' : 'center', color: c.text });
    if (cur != null) text(ctx, num(cur, 2) + ' A', lx, vert ? y + 14 : y + 30, { size: 12, mono: true, align: vert ? 'left' : 'center', color: c.accent });
  }
  function meter(x, y, letter, reading) {
    ctx.fillStyle = c.stage; ctx.beginPath(); ctx.arc(x, y, 13, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.8; ctx.stroke();
    text(ctx, letter, x, y + 5, { size: 14, weight: 700, align: 'center', color: c.ink });
    text(ctx, reading, x, y - 20, { size: 12, mono: true, align: 'center', color: c.ink });
  }
  // vertical cell at x between y-? ; + at the top. With a real cell, r is drawn in series inside a dashed box.
  function cell(x, yTop, yBot) {
    const mid = (yTop + yBot) / 2, gapY = mid - (real ? 16 : 0);
    wire([[x, yTop], [x, gapY - 6]]);
    ctx.strokeStyle = c.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 14, gapY - 6); ctx.lineTo(x + 14, gapY - 6); ctx.stroke();
    ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x - 7, gapY + 6); ctx.lineTo(x + 7, gapY + 6); ctx.stroke();
    text(ctx, '+', x - 20, gapY - 2, { size: 13, align: 'right', color: c.text2 });
    text(ctx, 'ε = ' + num(S.emf, 1) + ' V', x + (real ? 28 : 20), gapY + 4, { size: 12, mono: true, color: c.text });
    if (real) {
      wire([[x, gapY + 6], [x, gapY + 18]]);
      ctx.fillStyle = c.stage; ctx.fillRect(x - 8, gapY + 18, 16, 28); ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.strokeRect(x - 8, gapY + 18, 16, 28);
      text(ctx, 'r = ' + num(S.r, 1) + ' Ω', x + 28, gapY + 36, { size: 12, mono: true, color: c.text });
      ctx.setLineDash([3, 3]); ctx.strokeStyle = c.text3; ctx.lineWidth = 1; ctx.strokeRect(x - 20, gapY - 18, 40, 72); ctx.setLineDash([]);
      text(ctx, T.cell, x, gapY + 68, { size: 11, align: 'center', color: c.text3 });
      wire([[x, gapY + 46], [x, yBot]]);
    } else wire([[x, gapY + 6], [x, yBot]]);
  }
  // current dots along each loop, speed ∝ current
  function dots(paths) {
    const now = performance.now() / 1000;
    paths.forEach((p, pi) => {
      const lens = []; let len = 0;
      for (let i = 1; i < p.pts.length; i++) { const d = Math.hypot(p.pts[i][0] - p.pts[i - 1][0], p.pts[i][1] - p.pts[i - 1][1]); lens.push(d); len += d; }
      const n = Math.max(4, Math.round(len / 46)), v = MLX.reducedMotion ? 0 : Math.min(200, 45 * p.I);
      ctx.fillStyle = c.accent;
      for (let k = 0; k < n; k++) {
        let s = ((now * v + k * len / n + pi * 11) % len + len) % len, i = 0;
        while (i < lens.length - 1 && s > lens[i]) { s -= lens[i]; i++; }
        const a = p.pts[i], b = p.pts[i + 1], f = Math.min(1, s / lens[i]);
        ctx.beginPath(); ctx.arc(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 2.6, 0, Math.PI * 2); ctx.fill();
      }
    });
  }

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const m = solve();
    const graph = S.mode === 'internal' && W >= 640;
    const cw = graph ? W * 0.56 : W;
    // leave room on the left for the cell labels (and the voltmeter in internal-resistance mode), and on the right for resistor labels
    const L0 = S.mode === 'internal' ? 130 : 70, R0 = cw - 110, T0 = 56, B0 = H - 50, mid = (T0 + B0) / 2;
    let paths = [];
    // dots first, components drawn over them
    const loop = (xs) => [[L0, mid - 22], [L0, T0], [xs, T0], [xs, B0], [L0, B0], [L0, mid + 30]];
    if (S.mode === 'internal' || S.mode === 'series') paths = [{ I: m.I, pts: loop(R0) }];
    else if (S.mode === 'parallel') paths = [{ I: m.branch.R1, pts: loop(L0 + (R0 - L0) * 0.55) }, { I: m.branch.R2, pts: loop(R0) }];
    else paths = [{ I: m.branch.R2, pts: loop(L0 + (R0 - L0) * 0.62) }, { I: m.branch.R3, pts: loop(R0) }];
    // wires
    if (S.mode === 'internal' || S.mode === 'series') wire([[L0, T0], [R0, T0], [R0, B0], [L0, B0]]);
    else { const xa = paths[0].pts[2][0]; wire([[L0, T0], [R0, T0], [R0, B0], [L0, B0]]); wire([[xa, T0], [xa, B0]]); }
    dots(paths);
    cell(L0, T0, B0);
    // ammeter in the main line, near the + terminal
    meter(L0 + 60, T0, 'A', num(m.I, 2) + ' A');
    if (S.mode === 'internal') {
      resistor(R0, mid, true, 'R', S.R, null);
      // voltmeter across the cell terminals reads the terminal voltage
      const vx = L0 - 60; wire([[L0, T0 + 8], [vx, T0 + 8], [vx, mid - 14]]); wire([[vx, mid + 14], [vx, B0 - 8], [L0, B0 - 8]]);
      meter(vx, mid, 'V', '');
      text(ctx, num(m.Vt, 2) + ' V', vx - 18, mid + 4, { size: 12, mono: true, align: 'right', color: c.ink });
    } else if (S.mode === 'series') {
      resistor(L0 + (R0 - L0) * 0.45, T0, false, 'R₁', S.R1, null);
      resistor(L0 + (R0 - L0) * 0.78, T0, false, 'R₂', S.R2, null);
      const x1 = L0 + (R0 - L0) * 0.45, vy = T0 + 46;
      wire([[x1 - 40, T0], [x1 - 40, vy], [x1 - 14, vy]]); wire([[x1 + 14, vy], [x1 + 40, vy], [x1 + 40, T0]]);
      meter(x1, vy, 'V', num(m.I * S.R1, 2) + ' V');
    } else if (S.mode === 'parallel') {
      const xa = paths[0].pts[2][0];
      resistor(xa, mid, true, 'R₁', S.R1, m.branch.R1); resistor(R0, mid, true, 'R₂', S.R2, m.branch.R2);
    } else {
      const xa = paths[0].pts[2][0];
      resistor(L0 + (xa - L0) * 0.62, T0, false, 'R₁', S.R1, m.branch.R1);
      resistor(xa, mid, true, 'R₂', S.R2, m.branch.R2); resistor(R0, mid, true, 'R₃', S.R3, m.branch.R3);
    }
    if (graph) drawVI(cw + 8, W - cw - 8, H, m);
  }
  // V–I graph for a real cell: V = ε − Ir, a straight line with gradient −r and y-intercept ε
  function drawVI(x0, w, H, m) {
    const Imax = S.r > 0 ? Math.min(30, S.emf / S.r) : S.emf / 0.5;
    const ax = MLX.axes(ctx, { x0, y0: 8, w, h: H - 8, xMin: 0, xMax: Math.max(1, Math.ceil(Imax)), yMin: 0, yMax: Math.ceil(S.emf + 1), xTitle: T.xI, yTitle: T.yV, xTicks: 5, yTicks: 4 });
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ax.X(0), ax.Y(S.emf)); ctx.lineTo(ax.X(Imax), ax.Y(Math.max(0, S.emf - S.r * Imax))); ctx.stroke();
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(m.I), ax.Y(m.Vt), 5, 0, Math.PI * 2); ctx.fill();
    text(ctx, 'ε', ax.X(0) + 6, ax.Y(S.emf) - 6, { size: 13, color: c.ink });
    text(ctx, L(T.grad), ax.X(Imax * 0.55), ax.Y(S.emf - S.r * Imax * 0.55) - 10, { size: 12, color: c.text2 });
  }

  function update() {
    const m = solve();
    prim.set(num(m.I, 2));
    ro.set('a', num(m.Rt, 2) + ' Ω');
    ro.set('b', num(m.Vt, 2) + ' V');
    ro.set('c', real ? num(m.I * S.r, 2) + ' V' : num(S.mode === 'parallel' ? S.emf : m.branch.R1 * S.R1, 2) + ' V');
    ro.set('d', S.mode === 'internal' || S.mode === 'series' ? num(m.I * m.Vt, 2) + ' W' : num(m.branch.R2, 2) + ' A');
    ui.setCaption(S.mode === 'internal' ? T.capI : S.mode === 'series' ? T.capS : S.mode === 'parallel' ? T.capP : T.capM);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ε = ' + num(S.emf, 1) + ' V, I = ' + num(m.I, 2) + ' A, V = ' + num(m.Vt, 2) + ' V.');
    ui.cv.draw();
  }
  showRows();
  update();
});
