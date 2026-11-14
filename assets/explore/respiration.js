/* Gr11 Cellular respiration during exercise — aerobic and anaerobic respiration in muscle.
 * The muscles' energy demand rises with exercise intensity. Aerobic respiration (glucose + O₂ → CO₂ + H₂O, about
 * 36–38 ATP per glucose) can supply at most the aerobic capacity, set by how fast blood delivers oxygen (higher in a
 * trained athlete). Above that, aerobic respiration keeps running at its maximum and anaerobic respiration
 * (glucose → lactic acid, 2 ATP per glucose) covers the shortfall. Lactic acid builds up, and after exercise it is
 * cleared using extra oxygen: the oxygen debt, which keeps breathing fast.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Muscle tissue with a blood capillary delivering oxygen, and a graph of energy demand, aerobic supply and lactic acid', af: 'Spierweefsel met \'n bloedkapillêr wat suurstof aflewer, en \'n grafiek van energiebehoefte, aërobiese toevoer en melksuur' },
    share: { en: 'Energy from aerobic respiration', af: 'Energie uit aërobiese respirasie' }, lact: { en: 'Lactic acid in the muscle', af: 'Melksuur in die spier' },
    breath: { en: 'Breathing rate', af: 'Asemhalingstempo' }, mode: { en: 'Respiration now', af: 'Respirasie nou' },
    aer: { en: 'aerobic only', af: 'slegs aërobies' }, both: { en: 'aerobic + anaerobic', af: 'aërobies + anaërobies' }, debt: { en: 'repaying the oxygen debt', af: 'betaal die suurstofskuld terug' },
    ex: { en: 'Exercise', af: 'Oefening' }, inten: { en: 'Exercise intensity', af: 'Oefenintensiteit' }, rest: { en: 'rest', af: 'rus' }, sprint: { en: 'sprint', af: 'naelloop' },
    fit: { en: 'Fitness', af: 'Fiksheid' }, untr: { en: 'Untrained', af: 'Onopgelei' }, trained: { en: 'Trained athlete', af: 'Opgeleide atleet' },
    stop: { en: 'Stop exercising', af: 'Hou op oefen' },
    cap: { en: 'blood capillary', af: 'bloedkapillêr' }, fibre: { en: 'muscle fibre', af: 'spiervesel' }, mito: { en: 'mitochondria', af: 'mitochondria' },
    xT: { en: 'Time (s)', af: 'Tyd (s)' }, yE: { en: 'Energy (% of maximum)', af: 'Energie (% van maksimum)' },
    lDem: { en: 'demand', af: 'behoefte' }, lAer: { en: 'aerobic supply', af: 'aërobiese toevoer' }, lLac: { en: 'lactic acid', af: 'melksuur' },
    eqA: { en: 'Aerobic: glucose + oxygen → carbon dioxide + water + energy (36–38 ATP)', af: 'Aërobies: glukose + suurstof → koolstofdioksied + water + energie (36–38 ATP)' },
    eqN: { en: 'Anaerobic: glucose → lactic acid + energy (2 ATP)', af: 'Anaërobies: glukose → melksuur + energie (2 ATP)' },
    capA: { en: 'Oxygen arrives fast enough: all the energy comes from aerobic respiration in the mitochondria.', af: 'Suurstof kom vinnig genoeg aan: al die energie kom van aërobiese respirasie in die mitochondria.' },
    capB: { en: 'Demand is above the aerobic capacity: aerobic respiration runs at its maximum and anaerobic respiration supplies the rest, so lactic acid builds up.', af: 'Die behoefte is bo die aërobiese kapasiteit: aërobiese respirasie werk teen sy maksimum en anaërobiese respirasie voorsien die res, dus bou melksuur op.' },
    capD: { en: 'Exercise has eased, but breathing stays fast: extra oxygen is used to break down the lactic acid (the oxygen debt).', af: 'Die oefening het afgeneem, maar asemhaling bly vinnig: ekstra suurstof word gebruik om die melksuur af te breek (die suurstofskuld).' },
  };
  const S = { I: 20, trained: false, lac: 0, t: 0, hist: [] };
  const capA = () => S.trained ? 70 : 50;
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 440 : Math.max(340, Math.min(420, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.share, unit: '%' });
  const ro = MLX.readout(prim.el, [['m', T.mode], ['l', T.lact], ['b', T.breath]]);
  const c1 = MLX.card(ui.side, T.ex);
  const sI = MLX.slider(c1, { label: T.inten, min: 0, max: 100, step: 5, value: S.I, fmt: (v) => v + '%', minLabel: T.rest, maxLabel: T.sprint, onInput: (v) => { S.I = v; } });
  MLX.seg(c1, { label: T.fit, options: [['u', T.untr], ['t', T.trained]], value: 'u', onChange: (v) => { S.trained = v === 't'; } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.stop, () => { S.I = 0; sI.set(0); });
  const c2 = MLX.card(ui.side);
  c2.appendChild(MLX.h('p', { class: 'mlx-note', text: L(T.eqA) }));
  c2.appendChild(MLX.h('p', { class: 'mlx-note', style: 'margin-top:6px', text: L(T.eqN) }));

  let o2 = [];
  const sim = MLX.loop(ui.cv.el, (dt) => {
    S.t += dt;
    const aer = Math.min(S.I, capA()), an = S.I - aer;
    // lactic acid: made by anaerobic respiration; broken down using spare oxygen (slowly)
    S.lac = Math.max(0, Math.min(100, S.lac + dt * (an * 0.25 - (an > 0 ? 0 : (capA() - aer) * 0.03 + 0.4))));
    S.hist.push([S.t, S.I, aer, S.lac]); while (S.hist.length && S.hist[0][0] < S.t - 60) S.hist.shift();
    if (!MLX.reducedMotion) {
      if (Math.random() < dt * (1 + aer / 6)) o2.push({ p: 0, x: Math.random() });
      o2.forEach(d => { d.p += dt * 0.8; }); o2 = o2.filter(d => d.p < 1);
    }
    update();
  });
  sim.start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) { const tw = Math.round(W * 0.44); drawTissue(0, tw, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(tw + 0.5, 14); ctx.lineTo(tw + 0.5, H - 14); ctx.stroke(); drawGraph(tw + 6, W - tw - 6, 0, H); }
    else { drawTissue(0, W, H * 0.48); drawGraph(0, W, H * 0.48, H * 0.52); }
  }
  function drawTissue(x0, w, H) {
    const pad = 16, capY = 34, capH = 26, fx = x0 + pad, fw = w - 2 * pad, fy = capY + capH + 16, fh = H - fy - 30;
    // capillary with red blood cells flowing faster at higher demand
    ctx.fillStyle = c.light ? 'rgba(220,38,38,0.10)' : 'rgba(239,68,68,0.12)'; ctx.fillRect(fx, capY, fw, capH);
    ctx.strokeStyle = c.light ? '#b91c1c' : '#ef5b5b'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(fx, capY); ctx.lineTo(fx + fw, capY); ctx.moveTo(fx, capY + capH); ctx.lineTo(fx + fw, capY + capH); ctx.stroke();
    const flow = (S.t * (30 + S.I * 1.2)) % 40;
    ctx.fillStyle = c.light ? '#dc2626' : '#ef5b5b';
    for (let x = fx - 40 + flow; x < fx + fw; x += 40) if (x > fx + 6) { ctx.beginPath(); ctx.ellipse(x, capY + capH / 2, 7, 4.5, 0, 0, Math.PI * 2); ctx.fill(); }
    text(ctx, T.cap, fx, capY - 8, { size: 12, color: c.text3 });
    // muscle fibre: striated, with mitochondria
    ctx.fillStyle = c.light ? 'rgba(190,80,80,0.10)' : 'rgba(239,140,140,0.08)'; ctx.fillRect(fx, fy, fw, fh);
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.2; ctx.strokeRect(fx, fy, fw, fh);
    ctx.strokeStyle = c.lineSoft; for (let x = fx + 8; x < fx + fw; x += 9) { ctx.beginPath(); ctx.moveTo(x, fy + 2); ctx.lineTo(x, fy + fh - 2); ctx.stroke(); }
    const mitos = [[0.15, 0.3], [0.38, 0.62], [0.6, 0.28], [0.82, 0.66], [0.27, 0.8], [0.7, 0.85]];
    mitos.forEach(([u, v]) => { const mx = fx + u * fw, my = fy + v * fh; ctx.fillStyle = c.light ? 'rgba(31,138,62,0.22)' : 'rgba(74,207,107,0.2)'; ctx.strokeStyle = c.accent; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(mx, my, 16, 8, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(mx - 10, my); ctx.quadraticCurveTo(mx - 4, my - 5, mx, my); ctx.quadraticCurveTo(mx + 4, my + 5, mx + 10, my); ctx.stroke(); });
    text(ctx, T.fibre, fx, fy + fh + 18, { size: 12, color: c.text3 });
    text(ctx, T.mito, fx + fw, fy + fh + 18, { size: 12, align: 'right', color: c.accent });
    // oxygen diffusing from the blood into the fibre
    ctx.fillStyle = c.light ? '#2563eb' : '#93c5fd';
    o2.forEach(d => { const x = fx + d.x * fw, y = capY + capH + d.p * (fh * 0.7 + 16); ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill(); });
    // lactic acid building up in the fibre
    ctx.fillStyle = c.warn;
    const nL = Math.round(S.lac / 2.5);
    const fr = (x) => x - Math.floor(x);
    for (let i = 0; i < nL; i++) { const u = fr(Math.sin(i * 12.9898) * 43758.5453), v = fr(Math.sin(i * 78.233) * 12345.6789); ctx.fillRect(fx + 6 + u * (fw - 12), fy + 6 + v * (fh - 12), 3, 3); }
    text(ctx, 'O₂', fx + fw - 4, capY + capH + 14, { size: 12, align: 'right', color: c.light ? '#2563eb' : '#93c5fd' });
  }
  function drawGraph(x0, w, y0, H) {
    const t1 = Math.max(60, S.t), t0 = t1 - 60;
    const ax = MLX.axes(ctx, { x0, y0: y0 + 6, w, h: H - 6, xMin: 0, xMax: 60, yMin: 0, yMax: 100, xTitle: T.xT, yTitle: T.yE, xTicks: 6, yTicks: 4, fmtX: (v) => num(v + t0, 0) });
    const X = (t) => ax.X(t - t0);
    // shaded gap = anaerobic part
    if (S.hist.length > 1) {
      ctx.fillStyle = c.light ? 'rgba(168,106,0,0.18)' : 'rgba(245,178,61,0.18)'; ctx.beginPath();
      S.hist.forEach(([t, d], i) => i ? ctx.lineTo(X(t), ax.Y(d)) : ctx.moveTo(X(t), ax.Y(d)));
      for (let i = S.hist.length - 1; i >= 0; i--) ctx.lineTo(X(S.hist[i][0]), ax.Y(S.hist[i][2]));
      ctx.closePath(); ctx.fill();
      const line = (k, col, dash) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.setLineDash(dash || []); ctx.beginPath(); S.hist.forEach((h, i) => i ? ctx.lineTo(X(h[0]), ax.Y(h[k])) : ctx.moveTo(X(h[0]), ax.Y(h[k]))); ctx.stroke(); ctx.setLineDash([]); };
      line(1, c.text2, [5, 4]); line(2, c.accent); line(3, c.warn, [2, 3]);
    }
    ctx.strokeStyle = c.lineHard; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(ax.box.x0, ax.Y(capA())); ctx.lineTo(ax.box.x1, ax.Y(capA())); ctx.stroke(); ctx.setLineDash([]);
    const lx = ax.box.x0 + 8; let ly = ax.box.y0 + 14;
    [[T.lDem, c.text2], [T.lAer, c.accent], [T.lLac, c.warn]].forEach(([lab, col]) => { ctx.fillStyle = col; ctx.fillRect(lx, ly - 8, 14, 3); text(ctx, lab, lx + 20, ly - 3, { size: 11, color: col }); ly += 15; });
  }
  function update() {
    const aer = Math.min(S.I, capA()), an = S.I - aer;
    prim.set(S.I > 0 ? num(100 * aer / S.I, 0) : '100');
    ro.set('m', L(an > 0 ? T.both : S.lac > 2 ? T.debt : T.aer));
    ro.set('l', num(S.lac, 0) + ' %');
    ro.set('b', num(12 + aer * 0.3 + S.lac * 0.15, 0) + ' /min');
    ui.setCaption(an > 0 ? T.capB : S.lac > 2 ? T.capD : T.capA);
    ui.cv.draw();
  }
  update();
});
