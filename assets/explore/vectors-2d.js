/* Gr11 Vectors in two dimensions — resultant, components and equilibrium.
 * Angles θ are measured anticlockwise from the positive x-axis (East); bearings clockwise from North.
 *   Fx = F cos θ,  Fy = F sin θ;   R = √((ΣFx)² + (ΣFy)²),   reference angle = tan⁻¹(|ΣFy| / |ΣFx|), then the quadrant
 *   Perpendicular vectors: R = √(F₁² + F₂²).   Equilibrium: ΣFx = 0 and ΣFy = 0 (closed vector diagram);
 *   the equilibrant has the size of R and the opposite direction (θ + 180°).
 * Modes: add two vectors (tail-to-head or parallelogram), resolve one vector, three forces in equilibrium.
 * Drawn on a square grid whose scale (N per square) is chosen to fit, like choosing a scale for a scale diagram.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Force vectors drawn to scale on a square grid with x- and y-axes, with their resultant, components and direction angle', af: 'Kragvektore op skaal op \'n vierkantrooster met x- en y-asse geteken, met hul resultant, komponente en rigtinghoek' },
    mode: { en: 'Explore', af: 'Verken' }, mAdd: { en: 'Add two', af: 'Tel twee op' }, mRes: { en: 'Resolve', af: 'Ontbind' }, mEq: { en: 'Equilibrium', af: 'Ewewig' },
    vecs: { en: 'Forces', af: 'Kragte' }, size: { en: 'size', af: 'grootte' }, angle: { en: 'angle θ', af: 'hoek θ' },
    meth: { en: 'Method', af: 'Metode' }, tth: { en: 'Tail-to-head', af: 'Kop-tot-stert' }, para: { en: 'Parallelogram', af: 'Parallelogram' },
    comps: { en: 'Show components', af: 'Wys komponente' }, try: { en: 'Try', af: 'Probeer' },
    pPerp: { en: '40 N ⟂ 30 N', af: '40 N ⟂ 30 N' }, pQ1: { en: '45 N and 35 N at 60°', af: '45 N en 35 N teen 60°' },
    R: { en: 'Resultant R', af: 'Resultant R' }, F: { en: 'Force F', af: 'Krag F' },
    sx: { en: 'ΣFx', af: 'ΣFx' }, sy: { en: 'ΣFy', af: 'ΣFy' }, fx: { en: 'Fx = F cos θ', af: 'Fx = F cos θ' }, fy: { en: 'Fy = F sin θ', af: 'Fy = F sin θ' },
    th: { en: 'θ from +x (anticlockwise)', af: 'θ vanaf +x (antikloksgewys)' }, br: { en: 'Bearing', af: 'Peiling' }, st: { en: 'State', af: 'Toestand' },
    work: { en: 'The working', af: 'Die bewerking' },
    eqYes: { en: 'in equilibrium', af: 'in ewewig' }, eqNo: { en: 'not in equilibrium', af: 'nie in ewewig nie' },
    scale: { en: 'Scale: 1 square = ', af: 'Skaal: 1 blokkie = ' },
    eqnt: { en: 'equilibrant', af: 'ewewigskrag' },
  };
  const DEG = Math.PI / 180;
  const S = { mode: 'add', meth: 'tth', comps: false, v: [{ m: 40, a: 0 }, { m: 30, a: 90 }, { m: 50, a: 200 }], eqSeen: false };
  const xy = (o) => ({ x: o.m * Math.cos(o.a * DEG), y: o.m * Math.sin(o.a * DEG) });
  const active = () => S.mode === 'resolve' ? S.v.slice(0, 1) : S.mode === 'eq' ? S.v : S.v.slice(0, 2);
  const deg360 = (a) => ((a % 360) + 360) % 360;
  const clean = (v) => Math.abs(v) < 0.005 ? 0 : v;
  const n1 = (v) => num(clean(v), 1);

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 380 : Math.max(400, Math.min(480, Math.round(w * 0.6))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.R, unit: 'N' });
  const ro = MLX.readout(prim.el, [['x', T.sx], ['y', T.sy], ['t', T.th], ['b', T.br], ['s', T.st]]);
  const roLab = [...prim.el.querySelectorAll('.mlx-row')].map(r => r.firstChild);
  const roRow = [...prim.el.querySelectorAll('.mlx-row')];
  const primTitle = prim.el.querySelector('.mlx-card-title');

  const c0 = MLX.card(ui.side, null);
  MLX.seg(c0, { label: T.mode, options: [['add', T.mAdd], ['resolve', T.mRes], ['eq', T.mEq]], value: S.mode, onChange: (v) => {
    S.mode = v;
    if (v === 'eq' && !S.eqSeen) { S.eqSeen = true; setV([{ m: 30, a: 0 }, { m: 40, a: 90 }, { m: 50, a: 200 }]); }
    update();
  } });
  const c1 = MLX.card(ui.side, T.vecs);
  const names = ['F₁', 'F₂', 'F₃'];
  const sl = [0, 1, 2].map(i => {
    const box = MLX.h('div'); c1.appendChild(box);
    const m = MLX.slider(box, { label: names[i] + ' ' + L(T.size), min: 0, max: 100, step: 1, value: S.v[i].m, fmt: (v) => v + ' N', onInput: (v) => { S.v[i].m = v; pre.set(null); update(); } });
    const a = MLX.slider(box, { label: names[i] + ' ' + L(T.angle), min: 0, max: 359, step: 1, value: S.v[i].a, fmt: (v) => v + '°', speak: (v) => v + ' ' + L({ en: 'degrees', af: 'grade' }), onInput: (v) => { S.v[i].a = v; pre.set(null); update(); } });
    return { box, m, a };
  });
  const methSeg = MLX.seg(c1, { label: T.meth, options: [['tth', T.tth], ['para', T.para]], value: S.meth, onChange: (v) => { S.meth = v; update(); } });
  const pre = MLX.seg(c1, { label: T.try, options: [['perp', T.pPerp], ['q1', T.pQ1]], value: null, onChange: (k) => {
    setV(k === 'perp' ? [{ m: 40, a: 0 }, { m: 30, a: 90 }] : [{ m: 45, a: 0 }, { m: 35, a: 60 }]); pre.set(k); update();
  } });
  const chk = MLX.check(c1, { label: T.comps, value: S.comps, onChange: (v) => { S.comps = v; update(); } });
  const c2 = MLX.card(ui.side, T.work);
  const eqEl = MLX.h('div', { class: 'mlx-note', style: 'font-family:var(--fm,"JetBrains Mono",monospace);line-height:1.85;font-size:13px' }); c2.appendChild(eqEl);
  function setV(list) { list.forEach((o, i) => { S.v[i].m = o.m; S.v[i].a = o.a; sl[i].m.set(o.m); sl[i].a.set(o.a); }); }
  MLX.onTheme(() => ui.cv.draw());

  function sums() { let x = 0, y = 0; active().forEach(o => { const p = xy(o); x += p.x; y += p.y; }); return { x: clean(x), y: clean(y) }; }
  // reference angle and compass wording, e.g. 36,9° N of E
  function compass(x, y) {
    const ref = Math.atan2(Math.abs(y), Math.abs(x)) / DEG;
    if (Math.abs(y) < 0.005) return x >= 0 ? L({ en: 'East', af: 'Oos' }) : L({ en: 'West', af: 'Wes' });
    if (Math.abs(x) < 0.005) return y > 0 ? L({ en: 'North', af: 'Noord' }) : L({ en: 'South', af: 'Suid' });
    const ns = y > 0 ? 'N' : 'S', ew = x > 0 ? (MLX.af ? 'O' : 'E') : 'W';
    return num(ref, 1) + '° ' + ns + ' ' + L({ en: 'of', af: 'van' }) + ' ' + ew;
  }
  const theta = (x, y) => deg360(Math.atan2(y, x) / DEG);
  const bearing = (x, y) => { const b = deg360(90 - theta(x, y)); return (b < 99.95 ? (b < 9.95 ? '00' : '0') : '') + num(b, 1) + '°'; };
  const quad = (x, y) => x >= 0 && y >= 0 ? 'I' : x < 0 && y >= 0 ? 'II' : x < 0 ? 'III' : 'IV';

  function draw(ctx, W, H) {
    const c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const phone = W < 640, sq = phone ? 30 : 40, m = 26, bottom = 30;
    const cols = [c.accent, c.warn, c.text2];
    const vs = active(), P = vs.map(xy), s = sums();
    // every point the drawing needs, in newtons
    const pts = [{ x: 0, y: 0 }];
    if (S.mode === 'add' && S.meth === 'para') { pts.push(P[0], P[1], s); }
    else { let x = 0, y = 0; P.forEach(p => { x += p.x; y += p.y; pts.push({ x, y }); }); }
    if (S.mode === 'eq') pts.push({ x: -s.x, y: -s.y });
    const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const availW = W - 2 * m, availH = H - m - bottom - 10;
    const per = [5, 10, 20, 25, 50].find(n => (maxX - minX) / n * sq <= availW && (maxY - minY) / n * sq <= availH) || 50;
    const k = sq / per;                                 // px per newton
    const ox = Math.round(W / 2 - (minX + maxX) / 2 * k), oy = Math.round(m + 4 + availH / 2 + (minY + maxY) / 2 * k);
    const X = (x) => ox + x * k, Y = (y) => oy - y * k;
    const poly = pts.slice(0, P.length + 1), cen = { x: X(poly.reduce((a, p) => a + p.x, 0) / poly.length), y: Y(poly.reduce((a, p) => a + p.y, 0) / poly.length) };
    // grid aligned to the origin
    ctx.strokeStyle = c.lineSoft; ctx.lineWidth = 1;
    for (let gx = ox % sq; gx <= W; gx += sq) { ctx.beginPath(); ctx.moveTo(gx + 0.5, 0); ctx.lineTo(gx + 0.5, H); ctx.stroke(); }
    for (let gy = oy % sq; gy <= H; gy += sq) { ctx.beginPath(); ctx.moveTo(0, gy + 0.5); ctx.lineTo(W, gy + 0.5); ctx.stroke(); }
    // axes through the origin
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(0, oy + 0.5); ctx.lineTo(W, oy + 0.5); ctx.moveTo(ox + 0.5, 0); ctx.lineTo(ox + 0.5, H); ctx.stroke();
    text(ctx, '+x (' + (MLX.af ? 'O' : 'E') + ')', W - 8, oy + 18, { size: 12, align: 'right', color: c.text2, weight: 600 });
    text(ctx, '+y (N)', ox + 8, 16, { size: 12, color: c.text2, weight: 600 });
    // scale key
    const key = L(T.scale) + per + ' N';
    ctx.font = '600 12px "Cabinet Grotesk", sans-serif'; const kw = ctx.measureText(key).width + 16;
    ctx.fillStyle = c.stage; MLX.roundRect(ctx, 8, H - 28, kw, 22, 5); ctx.fill(); ctx.strokeStyle = c.line; ctx.stroke();
    text(ctx, key, 16, H - 13, { size: 12, color: c.text2, weight: 600 });

    if (S.mode === 'resolve') {
      const p = P[0];
      // dashed rectangle, then Fx along the x-axis and Fy from its head (tail-to-head adds back to F)
      ctx.setLineDash([4, 4]); ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(0), Y(p.y)); ctx.lineTo(X(p.x), Y(p.y)); ctx.stroke(); ctx.setLineDash([]);
      arrow(ctx, X(0), Y(0), X(p.x), Y(0), c.warn, 2.5);
      arrow(ctx, X(p.x), Y(0), X(p.x), Y(p.y), c.warn, 2.5);
      arrow(ctx, X(0), Y(0), X(p.x), Y(p.y), c.accent, 3.5);
      if (Math.abs(p.x) * k > 4) tag(ctx, 'Fx = ' + n1(p.x) + ' N', X(p.x / 2), Y(0) + (p.y >= 0 ? 18 : -10), c.warn, W, 'center');
      if (Math.abs(p.y) * k > 4) tag(ctx, 'Fy = ' + n1(p.y) + ' N', X(p.x) + (p.x >= 0 ? 8 : -8), Y(p.y / 2) + 4, c.warn, W, p.x >= 0 ? 'left' : 'right');
      vecLabel(ctx, 'F = ' + S.v[0].m + ' N', X(0), Y(0), X(p.x), Y(p.y), c.accent, W, -1);
      arc(ctx, X(0), Y(0), S.v[0].a, c);
      return;
    }
    if (S.mode === 'add' && S.meth === 'para') {
      ctx.setLineDash([5, 4]); ctx.lineWidth = 1.4;
      ctx.strokeStyle = cols[1]; ctx.beginPath(); ctx.moveTo(X(P[0].x), Y(P[0].y)); ctx.lineTo(X(s.x), Y(s.y)); ctx.stroke();
      ctx.strokeStyle = cols[0]; ctx.beginPath(); ctx.moveTo(X(P[1].x), Y(P[1].y)); ctx.lineTo(X(s.x), Y(s.y)); ctx.stroke(); ctx.setLineDash([]);
      P.forEach((p, i) => { arrow(ctx, X(0), Y(0), X(p.x), Y(p.y), cols[i], 3); vecLabel(ctx, names[i] + ' = ' + vs[i].m + ' N', X(0), Y(0), X(p.x), Y(p.y), cols[i], W, i ? -1 : 1); });
    } else {
      // tail-to-head chain; labels go outside the polygon (away from its centre)
      let x = 0, y = 0;
      P.forEach((p, i) => {
        if (S.comps) {
          ctx.setLineDash([4, 4]); ctx.strokeStyle = cols[i]; ctx.lineWidth = 1.2; ctx.globalAlpha = 0.75;
          ctx.beginPath(); ctx.moveTo(X(x), Y(y)); ctx.lineTo(X(x + p.x), Y(y)); ctx.lineTo(X(x + p.x), Y(y + p.y)); ctx.stroke();
          ctx.setLineDash([]); ctx.globalAlpha = 1;
        }
        arrow(ctx, X(x), Y(y), X(x + p.x), Y(y + p.y), cols[i], 3);
        vecLabel(ctx, names[i] + ' = ' + vs[i].m + ' N', X(x), Y(y), X(x + p.x), Y(y + p.y), cols[i], W, cen);
        x += p.x; y += p.y;
      });
    }
    const Rm = Math.hypot(s.x, s.y);
    if (S.comps && S.mode !== 'resolve') {
      ctx.setLineDash([6, 4]); ctx.strokeStyle = c.ink; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(s.x), Y(0)); ctx.lineTo(X(s.x), Y(s.y)); ctx.stroke(); ctx.setLineDash([]);
      // a line further out than the force labels, so the two sets do not overlap
      if (Math.abs(s.x) * k > 30) tag(ctx, 'ΣFx = ' + n1(s.x) + ' N', X(s.x / 2), Y(0) + (s.y >= 0 ? 38 : -30), c.ink, W, 'center');
      if (Math.abs(s.y) * k > 20) tag(ctx, 'ΣFy = ' + n1(s.y) + ' N', X(s.x) + (s.x >= 0 ? 8 : -8), Y(s.y * 0.85) + 4, c.ink, W, s.x >= 0 ? 'left' : 'right');
    }
    if (Rm >= 0.5) {
      arrow(ctx, X(0), Y(0), X(s.x), Y(s.y), c.ink, 4);
      vecLabel(ctx, 'R = ' + n1(Rm) + ' N', X(0), Y(0), X(s.x), Y(s.y), c.ink, W, S.meth === 'para' && S.mode === 'add' ? -1 : cen, 700);
      arc(ctx, X(0), Y(0), theta(s.x, s.y), c);
      if (S.mode === 'eq') {
        // the equilibrant acts at the same point: the size of R, opposite in direction
        ctx.setLineDash([6, 5]); arrow(ctx, X(0), Y(0), X(-s.x), Y(-s.y), c.text2, 2); ctx.setLineDash([]);
        vecLabel(ctx, L(T.eqnt) + ' ' + n1(Rm) + ' N', X(0), Y(0), X(-s.x), Y(-s.y), c.text2, W, -1);
      }
    } else {
      ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(X(0), Y(0), 4.5, 0, Math.PI * 2); ctx.fill();
      tag(ctx, L({ en: 'closed: R ≈ 0', af: 'geslote: R ≈ 0' }), X(0) + 10, Y(0) + 20, c.ink, W, 'left');
    }
  }
  function tag(ctx, s, x, y, col, W, align, wt) {
    ctx.font = (wt || 600) + ' 13px "Cabinet Grotesk", sans-serif';
    const w = ctx.measureText(s).width;
    let lx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    lx = Math.max(6, Math.min(W - 6 - w, lx));
    const c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.globalAlpha = 0.85; ctx.fillRect(lx - 3, y - 13, w + 6, 18); ctx.globalAlpha = 1;
    text(ctx, s, lx, y, { size: 13, color: col, weight: wt || 600 });
  }
  // label beside the middle of a vector, offset to one side (side = +1 left of travel, −1 right)
  // side may be a point {x, y}: the label then goes on the side away from it (outside the vector polygon)
  function vecLabel(ctx, s, x1, y1, x2, y2, col, W, side, wt) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    if (len < 6) return;
    let nx = dy / len, ny = -dx / len;
    if (typeof side === 'object') { if (nx * ((x1 + x2) / 2 - side.x) + ny * ((y1 + y2) / 2 - side.y) < 0) { nx = -nx; ny = -ny; } }
    else if (side < 0) { nx = -nx; ny = -ny; }
    const mx = (x1 + x2) / 2 + nx * 16, my = (y1 + y2) / 2 + ny * 16;
    tag(ctx, s, mx, my + 4, col, W, nx > 0.35 ? 'left' : nx < -0.35 ? 'right' : 'center', wt);
  }
  function arrow(ctx, x1, y1, x2, y2, col, lw) {
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    if (len < 2) return;
    const ux = dx / len, uy = dy / len, hl = Math.min(13, len * 0.5), hw = 5.5;
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - ux * hl, y2 - uy * hl); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - ux * hl - uy * hw, y2 - uy * hl + ux * hw); ctx.lineTo(x2 - ux * hl + uy * hw, y2 - uy * hl - ux * hw); ctx.closePath(); ctx.fill();
  }
  // θ arc from the +x-axis, anticlockwise
  function arc(ctx, x, y, a, c) {
    if (a < 0.5) return;
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, 26, 0, -a * DEG, true); ctx.stroke();
    const mid = a / 2 * DEG;
    text(ctx, 'θ', x + Math.cos(mid) * 38, y - Math.sin(mid) * 38 + 5, { size: 13, align: 'center', color: c.text2, weight: 700 });
  }

  function update() {
    const res = S.mode === 'resolve', eq = S.mode === 'eq';
    sl.forEach((o, i) => { o.box.style.display = i < active().length ? '' : 'none'; });
    methSeg.el.style.display = S.mode === 'add' ? '' : 'none';
    pre.el.style.display = S.mode === 'add' ? '' : 'none';
    chk.el.style.display = res ? 'none' : '';
    const s = sums(), Rm = Math.hypot(s.x, s.y);
    primTitle.textContent = L(res ? T.F : T.R);
    roLab[0].textContent = L(res ? T.fx : T.sx); roLab[1].textContent = L(res ? T.fy : T.sy);
    roRow[4].style.display = eq ? '' : 'none';
    prim.set(n1(res ? S.v[0].m : Rm));
    ro.set('x', n1(s.x) + ' N'); ro.set('y', n1(s.y) + ' N');
    const hasDir = (res ? S.v[0].m : Rm) >= 0.05;
    ro.set('t', hasDir ? (res ? S.v[0].a + '°' : num(theta(s.x, s.y), 1) + '°') : '–');
    ro.set('b', hasDir ? bearing(s.x, s.y) : '–');
    ro.set('s', L(Rm < 0.5 ? T.eqYes : T.eqNo));

    // the working, with the current numbers
    const lines = [];
    if (res) {
      const o = S.v[0];
      lines.push('Fx = ' + o.m + ' cos ' + o.a + '° = ' + n1(s.x) + ' N', 'Fy = ' + o.m + ' sin ' + o.a + '° = ' + n1(s.y) + ' N',
        L({ en: 'check', af: 'kontrole' }) + ': √(' + n1(s.x) + '² + ' + n1(s.y) + '²) = ' + n1(Math.hypot(s.x, s.y)) + ' N',
        L({ en: 'quadrant', af: 'kwadrant' }) + ' ' + quad(s.x, s.y) + ': Fx ' + (s.x < 0 ? '< 0' : '≥ 0') + ', Fy ' + (s.y < 0 ? '< 0' : '≥ 0'));
    } else {
      active().forEach((o, i) => { const p = xy(o); lines.push(names[i] + 'x = ' + o.m + ' cos ' + o.a + '° = ' + n1(p.x) + ' N', names[i] + 'y = ' + o.m + ' sin ' + o.a + '° = ' + n1(p.y) + ' N'); });
      lines.push('ΣFx = ' + n1(s.x) + ' N', 'ΣFy = ' + n1(s.y) + ' N');
      lines.push('R = √(' + n1(s.x) + '² + ' + n1(s.y) + '²) = ' + n1(Rm) + ' N');
      if (Rm >= 0.05) {
        const ref = Math.atan2(Math.abs(s.y), Math.abs(s.x)) / DEG;
        lines.push('tan⁻¹(' + n1(Math.abs(s.y)) + ' / ' + n1(Math.abs(s.x)) + ') = ' + num(ref, 1) + '°  (' + L({ en: 'quadrant', af: 'kwadrant' }) + ' ' + quad(s.x, s.y) + ')');
        lines.push('θ = ' + num(theta(s.x, s.y), 1) + '° = ' + compass(s.x, s.y));
      }
      if (eq) lines.push(L(T.eqnt) + ': ' + n1(Rm) + ' N, θ = ' + (Rm >= 0.05 ? num(deg360(theta(s.x, s.y) + 180), 1) + '°' : '–'));
    }
    eqEl.innerHTML = ''; lines.forEach(t => eqEl.appendChild(MLX.h('div', { text: t })));

    // caption
    let cap;
    const diff = deg360(S.v[0].a - S.v[1].a), perp = Math.abs(diff - 90) < 0.5 || Math.abs(diff - 270) < 0.5;
    if (res) {
      const o = S.v[0];
      cap = o.a > 90
        ? { en: 'In quadrant ' + quad(s.x, s.y) + ' a component is negative: cos θ or sin θ gives the sign automatically when θ is measured from the +x-axis.', af: 'In kwadrant ' + quad(s.x, s.y) + ' is \'n komponent negatief: cos θ of sin θ gee die teken outomaties wanneer θ vanaf die +x-as gemeet word.' }
        : { en: 'Fx = F cos θ and Fy = F sin θ: the two perpendicular components, drawn tail-to-head, add up to F exactly.', af: 'Fx = F cos θ en Fy = F sin θ: die twee loodregte komponente, kop-tot-stert geteken, tel presies op tot F.' };
    } else if (eq) {
      cap = Rm < 0.5
        ? { en: 'The three forces form a closed triangle: ΣFx = 0 and ΣFy = 0, so the object is in equilibrium.', af: 'Die drie kragte vorm \'n geslote driehoek: ΣFx = 0 en ΣFy = 0, dus is die voorwerp in ewewig.' }
        : { en: 'The diagram does not close: R = ' + n1(Rm) + ' N. The dashed equilibrant (same size as R, opposite direction) would bring the object into equilibrium.', af: 'Die diagram sluit nie: R = ' + n1(Rm) + ' N. Die gestippelde ewewigskrag (dieselfde grootte as R, teenoorgestelde rigting) sou die voorwerp in ewewig bring.' };
    } else if (perp) {
      cap = { en: 'F₁ and F₂ are perpendicular, so they form a right-angled triangle: R = √(' + S.v[0].m + '² + ' + S.v[1].m + '²) = ' + n1(Rm) + ' N.', af: 'F₁ en F₂ is loodreg, dus vorm hulle \'n reghoekige driehoek: R = √(' + S.v[0].m + '² + ' + S.v[1].m + '²) = ' + n1(Rm) + ' N.' };
    } else if (S.meth === 'para') {
      cap = { en: 'Parallelogram: both forces start at the same point; the resultant is the diagonal from that point.', af: 'Parallelogram: albei kragte begin by dieselfde punt; die resultant is die diagonaal vanaf daardie punt.' };
    } else {
      cap = { en: 'Tail-to-head: F₂ starts at the head of F₁; R joins the tail of F₁ to the head of F₂. These forces are not perpendicular, so add the components.', af: 'Kop-tot-stert: F₂ begin by die kop van F₁; R verbind die stert van F₁ met die kop van F₂. Hierdie kragte is nie loodreg nie, dus tel die komponente op.' };
    }
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + active().map((o, i) => names[i] + ' ' + o.m + ' N, ' + o.a + '°').join('; ') + '. ' + (res ? 'Fx ' + n1(s.x) + ' N, Fy ' + n1(s.y) + ' N.' : 'R ' + n1(Rm) + ' N, θ ' + num(theta(s.x, s.y), 1) + '°.'));
    ui.cv.draw();
  }
  update();
});
