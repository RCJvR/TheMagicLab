/* Gr10 Vectors and scalars — adding vectors in one dimension.
 * A learner walks two or three legs East or West along a straight path. Distance (scalar) adds the lengths of
 * the legs; displacement (vector) adds them with signs, after choosing a positive direction:
 *   R = Δx₁ + Δx₂ (+ Δx₃)   with East = + (or West = +),   distance = |Δx₁| + |Δx₂| (+ |Δx₃|)
 *   average speed = distance / Δt,   average velocity = displacement / Δt (with a direction)
 * The legs are drawn tail-to-head on a number line; the resultant joins the first tail to the last head.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A learner walking East and West along a straight path marked as a number line in metres, with each leg drawn as a vector tail-to-head and the resultant displacement below', af: '\'n Leerder wat Oos en Wes langs \'n reguit pad loop wat as \'n getallelyn in meter gemerk is, met elke been as \'n vektor stert-tot-kop geteken en die resulterende verplasing onderaan' },
    res: { en: 'Resultant displacement', af: 'Resulterende verplasing' },
    dir: { en: 'Direction', af: 'Rigting' }, dist: { en: 'Distance walked (scalar)', af: 'Afstand geloop (skalaar)' },
    spd: { en: 'Average speed (scalar)', af: 'Gemiddelde spoed (skalaar)' }, vel: { en: 'Average velocity (vector)', af: 'Gemiddelde snelheid (vektor)' },
    walk: { en: 'The walk', af: 'Die stappie' }, leg: { en: 'Leg', af: 'Been' }, legs: { en: 'Number of legs', af: 'Aantal bene' },
    conv: { en: 'Positive direction', af: 'Positiewe rigting' }, time: { en: 'Time for the whole walk', af: 'Tyd vir die hele stappie' },
    E: { en: 'East', af: 'Oos' }, W: { en: 'West', af: 'Wes' }, Es: { en: 'E', af: 'O' }, Ws: { en: 'W', af: 'W' },
    go: { en: 'Walk it', af: 'Loop dit' }, again: { en: 'Show the end', af: 'Wys die einde' },
    work: { en: 'The working', af: 'Die bewerking' }, none: { en: 'none (back at the start)', af: 'geen (terug by die begin)' },
    start: { en: 'start', af: 'begin' }, posT: { en: 'position (m)', af: 'posisie (m)' }, posIs: { en: 'positive:', af: 'positief:' },
    so: { en: 'so far', af: 'tot dusver' },
    capZero: { en: 'The learner is back where they started: the resultant displacement is zero (a closed vector diagram), but the distance walked is not.', af: 'Die leerder is terug waar hy begin het: die resulterende verplasing is nul (\'n geslote vektordiagram), maar die afstand geloop is nie nul nie.' },
  };
  const S = { legs: [6, -2, 4], n: 2, conv: 'E', t: 20, prog: Infinity, playing: false };
  const legs = () => S.legs.slice(0, S.n);
  const total = () => legs().reduce((s, v) => s + Math.abs(v), 0);
  const dirW = (v) => L(v > 0 ? T.E : T.W);
  const sg = (v) => (S.conv === 'E' ? v : -v);               // East-positive value -> value in the chosen convention
  const fmtS = (v, d) => (v > 0 ? '+' : '') + num(v, d || 0);
  const mag = (v, d) => num(Math.abs(v), d || 0);

  // position (East +) after walking a distance p along the legs
  function where(p) {
    let x = 0, left = p;
    for (const v of legs()) { const a = Math.abs(v); if (left >= a) { x += v; left -= a; } else { x += Math.sign(v) * left; return x; } }
    return x;
  }

  const ui = MLX.layout(root, { height: (w) => (w < 640 ? 304 : 284) + (S.n === 3 ? (w < 640 ? 40 : 36) : 0), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.res, unit: 'm' });
  const ro = MLX.readout(prim.el, [['d', T.dir], ['s', T.dist], ['sp', T.spd], ['v', T.vel]]);

  const c1 = MLX.card(ui.side, T.walk);
  const fmtLeg = (v) => v === 0 ? '0 m' : mag(v) + ' m ' + dirW(v);
  const speakLeg = (v) => v === 0 ? '0 m' : mag(v) + ' m ' + dirW(v);
  const sl = [0, 1, 2].map(i => MLX.slider(c1, { label: L(T.leg) + ' ' + (i + 1), min: -20, max: 20, step: 1, value: S.legs[i], fmt: fmtLeg, speak: speakLeg,
    minLabel: '20 m ' + L(T.W), maxLabel: '20 m ' + L(T.E), onInput: (v) => { S.legs[i] = v; showEnd(); } }));
  MLX.seg(c1, { label: T.legs, options: [[2, '2'], [3, '3']], value: S.n, onChange: (v) => { S.n = v; sl[2].el.style.display = v === 3 ? '' : 'none'; showEnd(); } });
  sl[2].el.style.display = 'none';
  MLX.seg(c1, { label: T.conv, options: [['E', T.E], ['W', T.W]], value: S.conv, onChange: (v) => { S.conv = v; update(); } });
  MLX.slider(c1, { label: T.time, min: 5, max: 100, step: 1, value: S.t, fmt: (v) => v + ' s', onInput: (v) => { S.t = v; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.go, () => { if (MLX.reducedMotion) { showEnd(); return; } S.prog = 0; S.playing = true; update(); }, 'primary');
  MLX.button(bt, T.again, showEnd);
  const c2 = MLX.card(ui.side, T.work);
  const eqEl = MLX.h('div', { class: 'mlx-note', style: 'font-family:var(--fm,"JetBrains Mono",monospace);line-height:1.9' }); c2.appendChild(eqEl);

  function showEnd() { S.playing = false; S.prog = Infinity; update(); }
  // the walker moves at about 6 m per second of screen time
  MLX.loop(ui.cv.el, (dt) => { if (S.playing) { S.prog += dt * Math.max(6, total() / 3); if (S.prog >= total()) { S.playing = false; S.prog = Infinity; } update(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  function draw(ctx, W, H) {
    const c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const phone = W < 640, m = phone ? 22 : 40;
    // number-line span: the smallest of these that holds every point of the walk
    let ext = 0, x = 0; legs().forEach(v => { x += v; ext = Math.max(ext, Math.abs(x)); }); legs().forEach(v => { ext = Math.max(ext, Math.abs(v)); });
    const span = [5, 10, 20, 30, 40, 60].find(s => s >= ext * 1.04) || 60;
    const X = (e) => W / 2 + e / span * (W / 2 - m);                 // e = East-positive position in m
    const colA = [c.accent, c.warn, c.text2];
    const lineY = phone ? 96 : 92;

    // heading row: compass and the chosen convention
    text(ctx, L(T.posIs) + ' ' + L(S.conv === 'E' ? T.E : T.W), 12, 22, { size: 12, color: c.text2, weight: 600 });
    text(ctx, L(T.Ws) + ' ←   → ' + L(T.Es), W - 12, 22, { size: 12, color: c.text2, align: 'right', weight: 600 });

    // the path, used as a number line in the chosen convention
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(m - 10, lineY); ctx.lineTo(W - m + 10, lineY); ctx.stroke();
    const tk = MLX.ticks(-span, span, phone ? 4 : 10);
    tk.values.forEach(v => {
      const px = X(v);
      ctx.beginPath(); ctx.moveTo(px, lineY - 5); ctx.lineTo(px, lineY + 5); ctx.stroke();
      text(ctx, num(sg(v), 0), px, lineY + 20, { size: 12, mono: true, align: 'center', color: v === 0 ? c.text : c.text3 });
    });
    // + end of the axis
    const plusRight = S.conv === 'E';
    text(ctx, '+', plusRight ? W - m + 16 : m - 16, lineY + 4, { size: 14, align: 'center', color: c.text2, weight: 700 });
    text(ctx, T.posT, plusRight ? W - m + 10 : m - 10, lineY + 36, { size: 12, align: plusRight ? 'right' : 'left', color: c.text3 });
    // start flag
    ctx.strokeStyle = c.text3; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(X(0), lineY); ctx.lineTo(X(0), lineY - 30); ctx.stroke();
    ctx.fillStyle = c.text3; ctx.beginPath(); ctx.moveTo(X(0), lineY - 30); ctx.lineTo(X(0) + 12, lineY - 26); ctx.lineTo(X(0), lineY - 22); ctx.fill();
    text(ctx, T.start, X(0), lineY - 50, { size: 12, align: 'center', color: c.text3 });

    // the walker: a simple standing figure on the path
    const p = Math.min(S.prog, total()), wx = X(where(p));
    ctx.strokeStyle = c.ink; ctx.fillStyle = c.ink; ctx.lineWidth = 2.2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(wx, lineY - 37, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(wx, lineY - 31); ctx.lineTo(wx, lineY - 15);
    ctx.moveTo(wx, lineY - 15); ctx.lineTo(wx - 5, lineY - 2); ctx.moveTo(wx, lineY - 15); ctx.lineTo(wx + 5, lineY - 2);
    ctx.moveTo(wx - 6, lineY - 25); ctx.lineTo(wx + 6, lineY - 25); ctx.stroke(); ctx.lineCap = 'butt';

    // legs tail-to-head, one row each, with the resultant underneath
    const row0 = lineY + 72, gap = phone ? 40 : 36;
    let tail = 0, walked = 0;
    legs().forEach((v, i) => {
      const y = row0 + i * gap, head = tail + v;
      // part of this leg already walked
      const done = Math.max(0, Math.min(Math.abs(v), p - walked)), on = Math.abs(v) < 1e-9 || done > 0;
      if (i > 0) { ctx.strokeStyle = c.lineHard; ctx.setLineDash([2, 3]); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(tail), y - gap + 6); ctx.lineTo(X(tail), y + 6); ctx.stroke(); ctx.setLineDash([]); }
      arrow(ctx, X(tail), y, X(head), y, on ? colA[i] : c.lineHard, 3);
      const lab = String.fromCharCode(65 + i) + ' = ' + fmtS(sg(v)) + ' m';
      label(ctx, lab, (X(tail) + X(head)) / 2, y - 9, on ? colA[i] : c.text3, W, c);
      walked += Math.abs(v); tail = head;
    });
    const R = where(p), yR = row0 + S.n * gap + 10;
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([2, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(0), row0 - 14); ctx.lineTo(X(0), yR + 6); ctx.stroke(); ctx.setLineDash([]);
    if (Math.abs(R) > 1e-9) arrow(ctx, X(0), yR, X(R), yR, c.ink, 4);
    else { ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(X(0), yR, 4, 0, Math.PI * 2); ctx.fill(); }
    label(ctx, 'R = ' + fmtS(sg(R)) + ' m' + (S.prog < total() ? ' (' + L(T.so) + ')' : ''), Math.abs(R) > 1e-9 ? (X(0) + X(R)) / 2 : X(0), yR - 10, c.ink, W, c, 700);
  }
  function label(ctx, s, x, y, col, W, c, wt) {
    ctx.font = (wt || 600) + ' 13px "Cabinet Grotesk", sans-serif';
    const w = ctx.measureText(s).width, cx = Math.max(8 + w / 2, Math.min(W - 8 - w / 2, x));
    text(ctx, s, cx, y, { size: 13, align: 'center', color: col, weight: wt || 600 });
  }
  function arrow(ctx, x1, y1, x2, y2, col, lw) {
    const dx = x2 - x1, len = Math.abs(dx);
    if (len < 1) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x1, y1, 3.5, 0, Math.PI * 2); ctx.fill(); return; }
    const u = Math.sign(dx), hl = Math.min(12, len * 0.6), hw = 6;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - u * hl, y2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - u * hl, y2 - hw); ctx.lineTo(x2 - u * hl, y2 + hw); ctx.closePath(); ctx.fill();
    // tail mark
    ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(x1, y1 - 5); ctx.lineTo(x1, y1 + 5); ctx.stroke();
  }

  function update() {
    const ls = legs(), d = total(), p = Math.min(S.prog, d), R = where(p), dSo = p, done = S.prog >= d;
    const Rf = ls.reduce((s, v) => s + v, 0);
    prim.set(fmtS(sg(R)));
    ro.set('d', Math.abs(R) < 1e-9 ? L(T.none) : dirW(R));
    ro.set('s', num(dSo, 0) + ' m');
    ro.set('sp', done ? num(d / S.t, 2) + ' m·s⁻¹' : '–');
    ro.set('v', done ? (Math.abs(Rf) < 1e-9 ? '0 m·s⁻¹' : num(Math.abs(Rf) / S.t, 2) + ' m·s⁻¹ ' + dirW(Rf)) : '–');
    // working with the current numbers
    const terms = ls.map(v => '(' + fmtS(sg(v)) + ')').join(' + ');
    const lines = [
      L(T.posIs) + ' ' + L(S.conv === 'E' ? T.E : T.W),
      'R = ' + terms + ' = ' + fmtS(sg(Rf)) + ' m',
      'R = ' + (Math.abs(Rf) < 1e-9 ? '0 m' : mag(Rf) + ' m ' + dirW(Rf)),
      L({ en: 'distance', af: 'afstand' }) + ' = ' + ls.map(v => mag(v)).join(' + ') + ' = ' + num(d, 0) + ' m',
      L({ en: 'speed', af: 'spoed' }) + ' = ' + num(d, 0) + ' ÷ ' + S.t + ' = ' + num(d / S.t, 2) + ' m·s⁻¹',
      L({ en: 'velocity', af: 'snelheid' }) + ' = ' + fmtS(sg(Rf)) + ' ÷ ' + S.t + ' = ' + fmtS(sg(Rf) / S.t, 2) + ' m·s⁻¹',
    ];
    eqEl.innerHTML = ''; lines.forEach(s => eqEl.appendChild(MLX.h('div', { text: s })));
    // caption
    let cap;
    if (!done) cap = { en: 'Walking: the distance only grows, but the displacement (' + mag(R) + ' m from the start) grows and shrinks as the learner turns back.', af: 'Aan die loop: die afstand word net groter, maar die verplasing (' + mag(R) + ' m van die begin af) word groter en kleiner soos die leerder omdraai.' };
    else if (d > 0 && Math.abs(Rf) < 1e-9) cap = T.capZero;
    else if (ls.every(v => v >= 0) || ls.every(v => v <= 0)) cap = { en: 'All the legs point the same way, so the size of the displacement (' + mag(Rf) + ' m) equals the distance walked (' + num(d, 0) + ' m).', af: 'Al die bene wys dieselfde kant toe, dus is die grootte van die verplasing (' + mag(Rf) + ' m) gelyk aan die afstand geloop (' + num(d, 0) + ' m).' };
    else cap = { en: 'Legs in opposite directions have opposite signs and cancel in part: the displacement is ' + mag(Rf) + ' m ' + dirW(Rf) + ', but the distance walked is ' + num(d, 0) + ' m.', af: 'Bene in teenoorgestelde rigtings het teenoorgestelde tekens en kanselleer gedeeltelik: die verplasing is ' + mag(Rf) + ' m ' + dirW(Rf) + ', maar die afstand geloop is ' + num(d, 0) + ' m.' };
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + ls.map((v, i) => L(T.leg) + ' ' + (i + 1) + ': ' + fmtLeg(v)).join('; ') + '. R = ' + (Math.abs(Rf) < 1e-9 ? '0 m' : mag(Rf) + ' m ' + dirW(Rf)) + ', ' + L(T.dist) + ' ' + num(d, 0) + ' m.');
    ui.cv.draw();
  }
  update();
});
