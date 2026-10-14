/* Gr8 Energy and the National Electricity Grid — transmission losses.
 * A power station sends 100 MW along a transmission line. The learner picks the
 * transmission voltage and the line length; the sim shows the current needed
 * (I = P / V), the heat lost in the cables (I²R, the line has 0.03 Ω per km)
 * and how much power is left for the homes at the far end.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, big, text } = MLX;
  const P = 100e6;                          // power sent, W
  const OHM_PER_KM = 0.03;                  // resistance of the line
  const VOLTS = [11, 22, 33, 66, 88, 132, 275, 400, 765];   // kV options (SA grid uses 88-765 kV)
  const T = {
    aria: { en: 'Power station, transformers, transmission line and homes', af: 'Kragstasie, transformators, transmissielyn en huise' },
    controls: { en: 'Transmission line', af: 'Transmissielyn' },
    volt: { en: 'Transmission voltage', af: 'Transmissiespanning' },
    len: { en: 'Line length', af: 'Lynlengte' },
    results: { en: 'With 100 MW sent', af: 'Met 100 MW gestuur' },
    current: { en: 'Current in the line', af: 'Stroom in die lyn' },
    lost: { en: 'Lost as heat in the cables', af: 'Verlore as hitte in die kabels' },
    delivered: { en: 'Reaches the homes', af: 'Bereik die huise' },
    station: { en: 'Power station', af: 'Kragstasie' },
    up: { en: 'Step-up', af: 'Op-transformator' },
    down: { en: 'Step-down', af: 'Af-transformator' },
    homes: { en: 'Homes', af: 'Huise' },
    tooMuch: { en: 'At this voltage the current is so large that more energy would be lost as heat than is sent — no power reaches the homes.', af: 'By hierdie spanning is die stroom so groot dat meer energie as hitte verlore sou gaan as wat gestuur word — geen krag bereik die huise nie.' },
    note: { en: 'The same power can be sent as a low voltage with a big current, or a high voltage with a small current. The heat lost in the cables grows very fast with the current (double the current gives four times the heat).', af: 'Dieselfde drywing kan gestuur word as \'n lae spanning met \'n groot stroom, of \'n hoë spanning met \'n klein stroom. Die hitte wat in die kabels verlore gaan, groei baie vinnig met die stroom (dubbel die stroom gee vier keer die hitte).' },
  };
  const cap = (pct, kv) => kv >= 275
    ? { en: `At ${kv} kV only a small current is needed, so very little energy is wasted: ${pct}% of the power reaches the homes.`, af: `By ${kv} kV is net 'n klein stroom nodig, so baie min energie word vermors: ${pct}% van die drywing bereik die huise.` }
    : { en: `At ${kv} kV a large current is needed, and the cables waste a lot of energy as heat. Try a higher voltage.`, af: `By ${kv} kV is 'n groot stroom nodig, en die kabels vermors baie energie as hitte. Probeer 'n hoër spanning.` };

  let vi = 7, km = 300, phase = 0;
  const ui = MLX.layout(root, { height: (w) => Math.max(240, Math.min(340, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.controls);
  MLX.slider(c1, { label: T.volt, min: 0, max: VOLTS.length - 1, value: vi, fmt: (i) => VOLTS[i] + ' kV', onInput: (i) => { vi = i; update(); } });
  MLX.slider(c1, { label: T.len, min: 50, max: 600, step: 25, value: km, fmt: (v) => v + ' km', onInput: (v) => { km = v; update(); } });
  const c2 = MLX.card(ui.side, T.results);
  const ro = MLX.readout(c2, [['I', T.current], ['loss', T.lost], ['got', T.delivered]]);
  const c3 = MLX.card(ui.side);
  c3.appendChild(MLX.h('p', { class: 'mlx-note', text: L(T.note) }));

  function model() {
    const V = VOLTS[vi] * 1000, I = P / V, R = OHM_PER_KM * km;
    const loss = I * I * R;                     // W
    const lossFrac = Math.min(1, loss / P);
    return { V, I, R, loss, lossFrac, got: Math.max(0, P - loss) };
  }
  function update() {
    const m = model();
    ro.set('I', big(m.I) + ' A');
    ro.set('loss', m.lossFrac >= 1 ? '> 100 MW' : num(m.loss / 1e6, m.loss < 1e7 ? 1 : 0) + ' MW (' + num(m.lossFrac * 100, m.lossFrac < 0.1 ? 1 : 0) + '%)', m.lossFrac > 0.2 ? '#f87171' : m.lossFrac > 0.05 ? '#fbbf24' : '#86efac');
    ro.set('got', num(m.got / 1e6, m.got < 1e7 && m.got > 0 ? 1 : 0) + ' MW');
    ui.setCaption(m.lossFrac >= 1 ? T.tooMuch : cap(num((1 - m.lossFrac) * 100, m.lossFrac < 0.1 ? 1 : 0), VOLTS[vi]));
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    const m = model();
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const gy = H * 0.78;                          // ground
    ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fillRect(0, gy, W, H - gy);
    const xS = W * 0.07, xU = W * 0.2, xD = W * 0.78, xH = W * 0.89;
    const lineY = H * 0.3;
    // power station
    ctx.fillStyle = '#334155'; ctx.fillRect(xS - 30, gy - 56, 60, 56);
    ctx.fillStyle = '#475569'; ctx.fillRect(xS - 22, gy - 92, 14, 36); ctx.fillRect(xS + 6, gy - 82, 14, 26);
    ctx.fillStyle = 'rgba(203,213,225,0.18)';
    for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(xS - 15 + k * 6, gy - 100 - k * 10 - (phase * 6) % 10, 8 + k * 3, 0, Math.PI * 2); ctx.fill(); }
    // transformers
    [[xU, T.up], [xD, T.down]].forEach(([x]) => {
      ctx.fillStyle = '#1e293b'; ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
      ctx.fillRect(x - 16, gy - 46, 32, 46); ctx.strokeRect(x - 16, gy - 46, 32, 46);
      ctx.strokeStyle = '#94a3b8'; for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(x - 10, gy - 38 + k * 8); ctx.lineTo(x + 10, gy - 38 + k * 8); ctx.stroke(); }
    });
    // towers
    const nT = 4, towers = [];
    for (let k = 0; k < nT; k++) towers.push(xU + 40 + k * (xD - xU - 80) / (nT - 1));
    ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1.5;
    towers.forEach(x => {
      ctx.beginPath(); ctx.moveTo(x - 14, gy); ctx.lineTo(x, lineY - 8); ctx.lineTo(x + 14, gy);
      ctx.moveTo(x - 18, lineY); ctx.lineTo(x + 18, lineY); ctx.moveTo(x - 9, (gy + lineY) / 2); ctx.lineTo(x + 9, (gy + lineY) / 2); ctx.stroke();
    });
    // the line: sags between towers, glows hotter with more loss
    const pts = [[xU, gy - 46]].concat(towers.map(x => [x, lineY])).concat([[xD, gy - 46]]);
    const hot = Math.pow(m.lossFrac, 0.5);
    const lineCol = `rgb(${Math.round(100 + 155 * hot)},${Math.round(140 - 60 * hot)},${Math.round(180 - 150 * hot)})`;
    function linePath() {
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let k = 1; k < pts.length; k++) { const [x0, y0] = pts[k - 1], [x1, y1] = pts[k]; ctx.quadraticCurveTo((x0 + x1) / 2, Math.max(y0, y1) + 16, x1, y1); }
    }
    if (hot > 0.05) { ctx.save(); ctx.shadowColor = 'rgba(248,113,113,' + (0.8 * hot) + ')'; ctx.shadowBlur = 18 * hot; ctx.strokeStyle = lineCol; ctx.lineWidth = 2 + 3 * hot; linePath(); ctx.stroke(); ctx.restore(); }
    ctx.strokeStyle = lineCol; ctx.lineWidth = 2 + 2 * hot; linePath(); ctx.stroke();
    // heat shimmer above the line
    if (hot > 0.1) {
      ctx.strokeStyle = 'rgba(251,146,60,' + (0.5 * hot) + ')'; ctx.lineWidth = 1.2;
      for (let k = 0; k < 10; k++) {
        const x = xU + 60 + k * (xD - xU - 120) / 9, y0 = lineY + 6 - ((phase * 30 + k * 13) % 20);
        ctx.beginPath(); ctx.moveTo(x, y0); ctx.quadraticCurveTo(x + 5, y0 - 6, x, y0 - 12); ctx.stroke();
      }
    }
    // moving charges: more dots for a bigger current
    const nDots = Math.round(Math.max(4, Math.min(60, 6 + 22 * Math.log10(m.I / 100))));
    const segLen = []; let total = 0;
    for (let k = 1; k < pts.length; k++) { const d = Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]); segLen.push(d); total += d; }
    ctx.fillStyle = '#fde68a';
    for (let k = 0; k < nDots; k++) {
      let s = ((k / nDots) + phase * 0.08) % 1 * total, j = 0;
      while (j < segLen.length - 1 && s > segLen[j]) { s -= segLen[j]; j++; }
      const u = s / segLen[j], [x0, y0] = pts[j], [x1, y1] = pts[j + 1];
      const cy = Math.max(y0, y1) + 16, x = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * (x0 + x1) / 2 + u * u * x1, y = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * cy + u * u * y1;
      ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
    }
    // homes: lit in proportion to the power that arrives
    const lit = Math.round(6 * (m.got / P));
    for (let k = 0; k < 6; k++) {
      const x = xH - 18 + (k % 3) * 24, y = gy - 18 - Math.floor(k / 3) * 30;
      ctx.fillStyle = '#1f2937'; ctx.fillRect(x - 9, y - 8, 18, 16);
      ctx.beginPath(); ctx.moveTo(x - 11, y - 8); ctx.lineTo(x, y - 17); ctx.lineTo(x + 11, y - 8); ctx.closePath(); ctx.fillStyle = '#374151'; ctx.fill();
      ctx.fillStyle = k < lit ? '#fde047' : '#0b1220';
      if (k < lit) { ctx.shadowColor = '#fde047'; ctx.shadowBlur = 8; }
      ctx.fillRect(x - 4, y - 4, 8, 7); ctx.shadowBlur = 0;
    }
    // labels with the voltage at each stage
    const lab = (s, x, v) => { text(ctx, s, x, gy + 18, { size: 11, weight: 700, align: 'center', color: 'rgba(226,232,240,0.8)' }); text(ctx, v, x, gy + 33, { size: 11, mono: true, align: 'center', color: '#93c5fd' }); };
    lab(T.station, xS, '11–22 kV'); lab(T.up, xU, '→ ' + VOLTS[vi] + ' kV'); lab(T.down, xD, '→ 11 kV'); lab(T.homes, xH, '230 V');
    text(ctx, VOLTS[vi] + ' kV · ' + big(m.I) + ' A · ' + km + ' km', (xU + xD) / 2, lineY - 22, { size: 12, mono: true, weight: 600, align: 'center', color: '#e2e8f0' });
  }

  update();
  MLX.loop(ui.stage, (dt) => { phase += dt; ui.cv.draw(); }).start();
});
