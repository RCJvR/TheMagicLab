/* Gr11 Human Impact on the Environment — eutrophication of a dam.
 * Daily model: fertiliser/sewage runoff adds nutrients; algae grow on them and
 * die; decomposers break down the dead algae and use up dissolved oxygen
 * (faster in warmer water, which also holds less oxygen); fish die when oxygen
 * falls below about 3 mg/L. A restored wetland traps most of the nutrients.
 * Oxygen saturation: 14.6 − 0.39T + 0.007T² mg/L.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'A dam with farmland, algae, fish and a chart of oxygen over time', af: '\'n Dam met landbougrond, alge, visse en \'n grafiek van suurstof oor tyd' },
    ctrl: { en: 'Around the dam', af: 'Rondom die dam' }, runoff: { en: 'Fertiliser and sewage runoff', af: 'Kunsmis- en rioolafloop' },
    temp: { en: 'Water temperature', af: 'Watertemperatuur' }, wet: { en: 'Restore the wetland (traps nutrients)', af: 'Herstel die vleiland (vang voedingstowwe)' },
    restart: { en: 'Start again', af: 'Begin weer' }, state: { en: 'The dam on day', af: 'Die dam op dag' },
    nut: { en: 'Nutrients', af: 'Voedingstowwe' }, algae: { en: 'Algae', af: 'Alge' }, o2: { en: 'Dissolved oxygen', af: 'Opgeloste suurstof' }, fish: { en: 'Fish alive', af: 'Visse lewend' },
    low: { en: 'low', af: 'laag' }, med: { en: 'medium', af: 'medium' }, high: { en: 'high', af: 'hoog' }, bloom: { en: 'bloom', af: 'opbloei' },
    days: { en: 'days', af: 'dae' }, farm: { en: 'Farmland', af: 'Landbougrond' }, wetland: { en: 'Wetland', af: 'Vleiland' },
    o2line: { en: 'O₂ (mg/L)', af: 'O₂ (mg/L)' }, danger: { en: 'fish die below 3 mg/L', af: 'visse vrek onder 3 mg/L' },
  };
  const sat = (t) => 14.6 - 0.39 * t + 0.007 * t * t;
  let runoff = 60, temp = 20, wet = false, st, hist, acc = 0, now = 0;
  function reset() { st = { day: 0, N: 0.05, A: 0.2, D: 0, Dsum: 0, O: sat(temp), F: 100 }; hist = [[0, st.O, st.A, st.F]]; }
  function step() {
    if (st.day >= 120) return;
    const inflow = runoff / 100 * 0.12 * (wet ? 0.3 : 1);
    const growth = 0.45 * st.A * st.N / (st.N + 0.3) * (1 - st.A / 12);
    st.N = Math.max(0, st.N + inflow - growth * 0.12 - 0.03 * st.N);
    const death = 0.08 * st.A + 0.02 * st.A * Math.max(0, st.A - 4);
    st.A = Math.max(0.1, st.A + growth - death);
    st.D += death; st.Dsum += death;
    const decomp = 0.2 * st.D * (1 + 0.04 * (temp - 20)); st.D -= decomp;
    st.O += 0.12 * (sat(temp) - st.O) - 0.02 * st.A - 1.5 * decomp;
    st.O = Math.max(0, Math.min(sat(temp) * 1.25, st.O));
    if (st.O < 3) st.F = Math.max(0, st.F - 12 * (3 - st.O)); else if (st.O > 5) st.F = Math.min(100, st.F + 0.5);
    st.day++;
    hist.push([st.day, st.O, st.A, st.F]);
  }

  const ui = MLX.layout(root, { height: (w) => Math.max(320, Math.min(420, Math.round(w * 0.5))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.ctrl);
  MLX.slider(c1, { label: T.runoff, min: 0, max: 100, step: 5, value: runoff, fmt: (v) => v + '%', onInput: (v) => { runoff = v; } });
  MLX.slider(c1, { label: T.temp, min: 15, max: 32, step: 1, value: temp, fmt: (v) => v + ' °C', onInput: (v) => { temp = v; } });
  MLX.check(c1, { label: T.wet, value: wet, onChange: (v) => { wet = v; } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.restart, () => { reset(); show(); }, 'primary');
  const c2 = MLX.card(ui.side);
  const head = MLX.h('div', { class: 'mlx-card-title' }); c2.appendChild(head);
  const ro = MLX.readout(c2, [['nut', T.nut], ['algae', T.algae], ['o2', T.o2], ['fish', T.fish]]);

  const lvl = (v, a, b) => L(v < a ? T.low : v < b ? T.med : T.high);
  function show() {
    head.textContent = L(T.state) + ' ' + st.day;
    ro.set('nut', lvl(st.N, 0.15, 0.4), st.N > 0.4 ? '#fca5a5' : '');
    ro.set('algae', st.A > 4.5 ? L(T.bloom) : lvl(st.A, 1, 3), st.A > 4.5 ? '#86efac' : '');
    ro.set('o2', num(st.O, 1) + ' mg/L', st.O < 3 ? '#fca5a5' : st.O < 5 ? '#fde68a' : '');
    ro.set('fish', Math.round(st.F) + '%', st.F < 50 ? '#fca5a5' : st.F < 95 ? '#fde68a' : '');
    let c;
    if (st.F < 50) c = { en: 'Fish kill: decomposers breaking down the dead algae have used up the oxygen. Restore the wetland or cut the runoff and start again.', af: 'Visvrekte: ontbinders wat die dooie alge afbreek, het die suurstof opgebruik. Herstel die vleiland of verminder die afloop en begin weer.' };
    else if (st.O < 5 && st.A > 3) c = { en: 'Algae are dying in large numbers; decomposers use oxygen as they break them down, so the oxygen is falling.', af: 'Alge vrek in groot getalle; ontbinders gebruik suurstof terwyl hulle dit afbreek, so die suurstof daal.' };
    else if (st.A > 4.5) c = { en: 'Nutrients from the runoff act as fertiliser for algae: an algal bloom covers the surface.', af: 'Voedingstowwe uit die afloop werk soos kunsmis vir alge: \'n alge-opbloei bedek die oppervlak.' };
    else if (wet && runoff > 0) c = { en: 'The wetland traps most of the nutrients before they reach the dam, so the algae stay in check and the oxygen stays high.', af: 'Die vleiland vang die meeste voedingstowwe voordat dit die dam bereik, so die alge bly beperk en die suurstof bly hoog.' };
    else if (st.A > 1) c = { en: 'Algae are growing on the nutrients washing in.', af: 'Alge groei op die voedingstowwe wat inspoel.' };
    else if (runoff === 0) c = { en: 'No runoff: few nutrients, few algae, plenty of oxygen for the fish.', af: 'Geen afloop nie: min voedingstowwe, min alge, baie suurstof vir die visse.' };
    else c = { en: 'Nutrients are washing into the dam…', af: 'Voedingstowwe spoel in die dam in…' };
    ui.setCaption(c);
  }

  function draw(ctx, W, H) {
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const sceneH = H * 0.58, wy = sceneH * 0.42;             // water surface
    // sky and banks
    ctx.fillStyle = '#0f1b2d'; ctx.fillRect(0, 0, W, wy);
    ctx.fillStyle = '#4d3b22'; ctx.beginPath(); ctx.moveTo(0, wy - 30); ctx.lineTo(W * 0.24, wy - 10); ctx.lineTo(W * 0.3, sceneH); ctx.lineTo(0, sceneH); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(W, wy - 20); ctx.lineTo(W * 0.86, wy); ctx.lineTo(W * 0.82, sceneH); ctx.lineTo(W, sceneH); ctx.closePath(); ctx.fill();
    // farmland with crop rows; fertiliser runoff arrows
    ctx.fillStyle = '#3f6212';
    for (let k = 0; k < 6; k++) ctx.fillRect(W * 0.02 + k * W * 0.03, wy - 44 + k * 2.4, W * 0.018, 10);
    text(ctx, T.farm, W * 0.02, wy - 52, { size: 11, weight: 700, color: '#bef264' });
    if (runoff > 0) {
      ctx.strokeStyle = `rgba(251,191,36,${0.25 + 0.6 * runoff / 100})`; ctx.lineWidth = 2;
      for (let k = 0; k < 3; k++) { const x = W * (0.1 + k * 0.05), o = (now * 30 + k * 12) % 24; ctx.beginPath(); ctx.moveTo(x + o * 0.6, wy - 22 + o * 0.5); ctx.lineTo(x + o * 0.6 + 12, wy - 16 + o * 0.5); ctx.stroke(); }
    }
    if (wet) {                                                 // reeds trap nutrients
      ctx.strokeStyle = '#65a30d'; ctx.lineWidth = 2;
      for (let k = 0; k < 14; k++) { const x = W * 0.2 + k * 5; ctx.beginPath(); ctx.moveTo(x, wy - 8); ctx.quadraticCurveTo(x + 3, wy - 22, x + (k % 2 ? 4 : -2), wy - 30); ctx.stroke(); }
      text(ctx, T.wetland, W * 0.2, wy - 36, { size: 11, weight: 700, color: '#86efac' });
    }
    // water: greener with more algae
    const g = Math.min(1, st.A / 7);
    ctx.fillStyle = `rgb(${Math.round(30 + 20 * g)},${Math.round(80 + 70 * g)},${Math.round(150 - 90 * g)})`;
    ctx.beginPath(); ctx.moveTo(W * 0.24, wy); ctx.lineTo(W * 0.86, wy); ctx.lineTo(W * 0.82, sceneH); ctx.lineTo(W * 0.3, sceneH); ctx.closePath(); ctx.fill();
    // algal mat on the surface
    if (st.A > 0.5) { ctx.fillStyle = `rgba(74,222,128,${Math.min(0.9, st.A / 7)})`; for (let x = W * 0.25; x < W * 0.85; x += 9) { const hh = 2 + Math.min(10, st.A * 1.6) * (0.6 + 0.4 * Math.sin(x * 0.3)); ctx.fillRect(x, wy, 8, hh); } }
    // dead organic matter settling on the bottom
    const mud = Math.min(16, st.Dsum * 0.25);
    ctx.fillStyle = '#3b2f1e'; ctx.fillRect(W * 0.3, sceneH - mud, W * 0.52, mud);
    // oxygen bubbles (fewer when O₂ is low)
    ctx.strokeStyle = 'rgba(219,234,254,0.6)'; ctx.lineWidth = 1;
    for (let k = 0; k < Math.round(st.O * 1.5); k++) { const x = W * 0.33 + (k * 37) % (W * 0.45), y = sceneH - 20 - ((now * 25 + k * 17) % (sceneH - wy - 30)); ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2); ctx.stroke(); }
    // fish: alive below, dead ones float belly-up at the surface
    const alive = Math.round(8 * st.F / 100);
    for (let k = 0; k < 8; k++) {
      const deadF = k >= alive;
      const x = deadF ? W * 0.32 + k * W * 0.06 : W * 0.34 + ((now * 18 + k * 53) % (W * 0.44)), y = deadF ? wy + 4 : wy + 30 + (k * 19) % (sceneH - wy - 50);
      ctx.save(); ctx.translate(x, y); if (deadF) ctx.scale(1, -1);
      ctx.fillStyle = deadF ? '#9ca3af' : '#fbbf24'; ctx.beginPath(); ctx.ellipse(0, 0, 9, 4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-14, -5); ctx.lineTo(-14, 5); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    // power-station outflow when the water is warm
    if (temp > 22) { ctx.fillStyle = '#475569'; ctx.fillRect(W * 0.88, wy - 40, 30, 40); ctx.fillStyle = `rgba(248,113,113,${(temp - 22) / 12})`; ctx.fillRect(W * 0.84, wy + 2, W * 0.05, 6); }
    // ── chart: O₂, algae and fish over 120 days
    const cx0 = 44, cx1 = W - 16, cy0 = sceneH + 22, cy1 = H - 22;
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1; ctx.strokeRect(cx0, cy0, cx1 - cx0, cy1 - cy0);
    const X = (d) => cx0 + d / 120 * (cx1 - cx0), Yo = (o) => cy1 - o / 12 * (cy1 - cy0);
    ctx.strokeStyle = 'rgba(248,113,113,0.6)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cx0, Yo(3)); ctx.lineTo(cx1, Yo(3)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, T.danger, cx1 - 4, Yo(3) - 4, { size: 10, align: 'right', color: 'rgba(248,113,113,0.8)' });
    const line = (idx, col, sc) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); hist.forEach((p, i) => { const y = cy1 - Math.min(1, p[idx] / sc) * (cy1 - cy0); i ? ctx.lineTo(X(p[0]), y) : ctx.moveTo(X(p[0]), y); }); ctx.stroke(); };
    line(2, '#4ade80', 8); line(3, '#fbbf24', 125); line(1, '#60a5fa', 12);
    [[T.o2line, '#60a5fa'], [T.algae, '#4ade80'], [T.fish, '#fbbf24']].forEach(([s, c], i) => text(ctx, s, cx0 + 6 + i * 110, cy0 + 14, { size: 11, weight: 700, color: c }));
    text(ctx, '0', cx0, cy1 + 14, { size: 10, mono: true, align: 'center', color: 'rgba(226,232,240,0.5)' });
    text(ctx, '120 ' + L(T.days), cx1, cy1 + 14, { size: 10, mono: true, align: 'right', color: 'rgba(226,232,240,0.5)' });
    for (const o of [0, 6, 12]) text(ctx, String(o), cx0 - 6, Yo(o) + 3, { size: 10, mono: true, align: 'right', color: 'rgba(147,197,253,0.7)' });
  }

  reset(); show();
  MLX.loop(ui.stage, (dt, t) => {
    now = t; acc += dt;
    if (acc > 0.12) { acc = 0; if (st.day < 120) { step(); show(); } }
    ui.cv.draw();
  }).start();
});
