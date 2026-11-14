/* Gr11 Population ecology — geometric (J-shaped) and logistic (S-shaped) growth.
 * Logistic: N(t) = K / (1 + ((K − N₀)/N₀)·e^(−rt)); geometric (no limits): N(t) = N₀·e^(rt).
 * The gap between the two curves is environmental resistance (food, space, predators, disease).
 * Phases: lag (slow start), exponential (log), decelerating (growth slows above about K/2), stationary (N ≈ K).
 * The axes are fixed, so a smaller carrying capacity visibly gives a lower plateau.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A habitat with a growing population, and a graph of population size against time showing J-shaped and S-shaped growth', af: '\'n Habitat met \'n groeiende bevolking, en \'n grafiek van bevolkingsgrootte teen tyd wat J-vormige en S-vormige groei wys' },
    N: { en: 'Population size', af: 'Bevolkingsgrootte' }, ind: { en: 'individuals', af: 'individue' }, phase: { en: 'Phase', af: 'Fase' }, time: { en: 'Time', af: 'Tyd' },
    set: { en: 'Population', af: 'Bevolking' }, r: { en: 'Growth rate r (per week)', af: 'Groeitempo r (per week)' }, K: { en: 'Carrying capacity K', af: 'Drakrag K' }, N0: { en: 'Starting population N₀', af: 'Beginbevolking N₀' },
    J: { en: 'Show growth with no limits (J-curve)', af: 'Wys groei sonder perke (J-kurwe)' }, play: { en: 'Play', af: 'Speel' }, pause: { en: 'Pause', af: 'Pouseer' }, reset: { en: 'Restart', af: 'Begin oor' },
    xT: { en: 'Time (weeks)', af: 'Tyd (weke)' }, yN: { en: 'Number of individuals', af: 'Aantal individue' }, res: { en: 'environmental resistance', af: 'omgewingsweerstand' },
    lag: { en: 'Lag phase', af: 'Sloerfase' }, exp: { en: 'Exponential (log) phase', af: 'Eksponensiële (log-) fase' }, dec: { en: 'Decelerating phase', af: 'Vertragingsfase' }, stat: { en: 'Stationary phase (at K)', af: 'Stasionêre fase (by K)' },
    capLag: { en: 'Lag phase: few individuals, still adjusting and finding mates, so numbers rise slowly.', af: 'Sloerfase: min individue wat nog aanpas en maats vind, dus styg die getalle stadig.' },
    capExp: { en: 'Exponential phase: plenty of resources; the population grows faster and faster.', af: 'Eksponensiële fase: volop hulpbronne; die bevolking groei al vinniger.' },
    capDec: { en: 'Growth slows: food and space run short, so the death rate rises towards the birth rate.', af: 'Groei vertraag: voedsel en ruimte raak min, dus styg die sterftesyfer na die geboortesyfer.' },
    capStat: { en: 'Stationary: births ≈ deaths, and the population levels off at the carrying capacity K.', af: 'Stasionêr: geboortes ≈ sterftes, en die bevolking plat af by die drakrag K.' },
  };
  const TMAX = 30, YMAX = 1000;
  const S = { r: 0.4, K: 600, N0: 10, J: true, t: 0, playing: true };
  const Nl = (t) => S.K / (1 + ((S.K - S.N0) / S.N0) * Math.exp(-S.r * t));
  const Ng = (t) => S.N0 * Math.exp(S.r * t);
  function phase(t) { const n = Nl(t), f = n / S.K; if (f < 0.08) return 'lag'; if (f < 0.5) return 'exp'; if (f < 0.95) return 'dec'; return 'stat'; }

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 420 : Math.max(330, Math.min(400, Math.round(w * 0.4))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.N, unit: T.ind });
  const ro = MLX.readout(prim.el, [['p', T.phase], ['t', T.time]]);
  const c1 = MLX.card(ui.side, T.set);
  const restart = () => { S.t = 0; S.playing = true; bP.textContent = L(T.pause); update(); };
  MLX.slider(c1, { label: T.r, min: 0.1, max: 1, step: 0.05, value: S.r, fmt: (v) => num(v, 2), onInput: (v) => { S.r = v; update(); } });
  MLX.slider(c1, { label: T.K, min: 100, max: 900, step: 50, value: S.K, fmt: (v) => String(v), onInput: (v) => { S.K = v; update(); } });
  MLX.slider(c1, { label: T.N0, min: 2, max: 50, step: 1, value: S.N0, fmt: (v) => String(v), onInput: (v) => { S.N0 = v; update(); } });
  MLX.check(c1, { label: T.J, value: S.J, onChange: (v) => { S.J = v; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  const bP = MLX.button(bt, T.pause, () => { S.playing = !S.playing; if (S.playing && S.t >= TMAX) S.t = 0; bP.textContent = L(S.playing ? T.pause : T.play); }, 'primary');
  MLX.button(bt, T.reset, restart);
  MLX.loop(ui.cv.el, (dt) => { if (S.playing) { S.t = Math.min(TMAX, S.t + (MLX.reducedMotion ? TMAX : dt * 2.5)); if (S.t >= TMAX) { S.playing = false; bP.textContent = L(T.play); } update(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors(); ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) { const hw = Math.round(W * 0.3); habitat(0, hw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(hw + 0.5, 14); ctx.lineTo(hw + 0.5, H - 14); ctx.stroke(); graph(hw + 6, W - hw - 6, 0, H); }
    else { habitat(0, W, H * 0.34); graph(0, W, H * 0.34, H * 0.66); }
  }
  // a fixed habitat; one dot per 5 individuals
  function habitat(x0, w, H) {
    const pad = 14, bx = x0 + pad, by = pad + 14, bw = w - 2 * pad, bh = H - by - 22;
    ctx.fillStyle = c.light ? 'rgba(63,122,58,0.10)' : 'rgba(123,191,106,0.08)'; ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = c.lineHard; ctx.strokeRect(bx, by, bw, bh);
    const n = Math.round(Nl(S.t) / 5);
    ctx.fillStyle = c.accent;
    for (let i = 0; i < n; i++) { const u = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1, v = Math.abs(Math.sin(i * 78.233) * 12345.678) % 1; ctx.beginPath(); ctx.arc(bx + 5 + u * (bw - 10), by + 5 + v * (bh - 10), 2.2, 0, Math.PI * 2); ctx.fill(); }
    text(ctx, { en: 'habitat (1 dot = 5 individuals)', af: 'habitat (1 kolletjie = 5 individue)' }, bx, by - 5, { size: 11, color: c.text3 });
  }
  function graph(x0, w, y0, H) {
    const ax = MLX.axes(ctx, { x0, y0: y0 + 6, w, h: H - 6, xMin: 0, xMax: TMAX, yMin: 0, yMax: YMAX, xTitle: T.xT, yTitle: T.yN, xTicks: 6, yTicks: 5 });
    // K line
    ctx.strokeStyle = c.text3; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(S.K)); ctx.lineTo(ax.box.x1, ax.Y(S.K)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, 'K = ' + S.K, ax.box.x1 - 4, ax.Y(S.K) - 6, { size: 12, mono: true, align: 'right', color: c.text2 });
    const path = (f, t1) => { ctx.beginPath(); let moved = false; for (let i = 0; i <= 200; i++) { const t = t1 * i / 200, n = f(t); if (n > YMAX * 1.05) break; const X = ax.X(t), Y = ax.Y(Math.min(YMAX, n)); moved ? ctx.lineTo(X, Y) : (ctx.moveTo(X, Y), moved = true); } };
    if (S.J) {
      // environmental resistance: the gap between J and S
      ctx.fillStyle = c.light ? 'rgba(168,106,0,0.12)' : 'rgba(245,178,61,0.12)'; ctx.beginPath();
      const pts = []; for (let i = 0; i <= 200; i++) { const t = TMAX * i / 200; if (Ng(t) > YMAX) break; pts.push(t); }
      pts.forEach((t, i) => i ? ctx.lineTo(ax.X(t), ax.Y(Ng(t))) : ctx.moveTo(ax.X(t), ax.Y(Ng(t))));
      for (let i = pts.length - 1; i >= 0; i--) ctx.lineTo(ax.X(pts[i]), ax.Y(Nl(pts[i])));
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = c.text2; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]); path(Ng, TMAX); ctx.stroke(); ctx.setLineDash([]);
      const tm = pts.length ? pts[Math.floor(pts.length * 0.8)] : 0;
      if (tm) text(ctx, T.res, ax.X(tm) + 6, ax.Y((Ng(tm) + Nl(tm)) / 2), { size: 11, color: c.warn });
    }
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; path(Nl, TMAX); ctx.stroke();
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2.4; path(Nl, S.t); ctx.stroke();
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(S.t), ax.Y(Nl(S.t)), 5, 0, Math.PI * 2); ctx.fill();
  }
  function update() {
    const n = Nl(S.t), p = phase(S.t);
    prim.set(num(n, 0));
    ro.set('p', L(T[p])); ro.set('t', num(S.t, 1) + (MLX.af ? ' weke' : ' weeks'));
    ui.setCaption(T['cap' + p[0].toUpperCase() + p.slice(1)]);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + num(n, 0) + ', ' + L(T[p]) + '.');
    ui.cv.draw();
  }
  update();
});
