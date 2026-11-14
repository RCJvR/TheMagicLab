/* Gr11 Photosynthesis — rate of photosynthesis and limiting factors (pondweed investigation).
 *
 * The CAPS investigation: Elodea in water with sodium hydrogen carbonate (CO₂ source), a lamp at a measured
 * distance, a heat shield, and oxygen bubbles counted per minute. The learner reads a number with a unit,
 * records readings, and sees the limiting-factor plateau form on a graph.
 *
 * Model (smooth Blackman limiting factors; gross O₂ release, respiration ignored as at this level):
 *   I    = lamp on ? 100·(10/d)² : 0                 relative light intensity, % of the value at 10 cm
 *   a    = 1.6·I                                     light-limited rate
 *   g(T) = 2^((T−25)/10) / (1 + e^((T−40)/2.5))      enzymes: ~doubles per 10 °C, denature above ~40 °C
 *   b    = 125·[g(T)/g(25)]·c/(c + 0.2)              ceiling set by CO₂ (c, % NaHCO₃) and temperature
 *   R    = [(a+b) − √((a+b)² − 4θab)] / (2θ), θ = 0.97 (θ = 1 gives min(a, b)); R = 0 if a or b is 0
 * At 25 °C and 0.2% NaHCO₃ the lamp distances 5, 10, 20, 30, 40 cm give about 62, 61, 38, 18, 10 bubbles/min,
 * matching the exam question on this page.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Pondweed investigation: a lamp, heat shield and a beaker of pondweed giving off oxygen bubbles, with a graph of the rate', af: 'Waterplant-ondersoek: \'n lamp, hitteskerm en \'n beker met waterplant wat suurstofborrels afgee, met \'n grafiek van die tempo' },
    rate: { en: 'Rate of photosynthesis', af: 'Tempo van fotosintese' }, perMin: { en: 'oxygen bubbles per minute', af: 'suurstofborrels per minuut' },
    limit: { en: 'Limiting factor', af: 'Beperkende faktor' }, intensity: { en: 'Relative light intensity', af: 'Relatiewe ligintensiteit' },
    set: { en: 'Conditions', af: 'Toestande' }, lamp: { en: 'Lamp switched on', af: 'Lamp aangeskakel' },
    dist: { en: 'Lamp distance', af: 'Lampafstand' }, co2: { en: 'CO₂ supply (sodium hydrogen carbonate)', af: 'CO₂-toevoer (natriumwaterstofkarbonaat)' },
    temp: { en: 'Water temperature', af: 'Watertemperatuur' }, plot: { en: 'Plot the rate against', af: 'Stip die tempo teen' },
    pLight: { en: 'Light', af: 'Lig' }, pCO2: { en: 'CO₂', af: 'CO₂' }, pTemp: { en: 'Temperature', af: 'Temperatuur' },
    record: { en: 'Record reading', af: 'Teken lesing aan' }, keep: { en: 'Keep this curve', af: 'Hou hierdie kurwe' }, reset: { en: 'Reset', af: 'Herstel' },
    view: { en: 'Show', af: 'Wys' }, vApp: { en: 'Apparatus', af: 'Apparaat' }, vGraph: { en: 'Graph', af: 'Grafiek' },
    readings: { en: 'Your readings', af: 'Jou lesings' }, hD: { en: 'Distance', af: 'Afstand' }, hT: { en: 'Temp.', af: 'Temp.' }, hR: { en: 'Bubbles/min', af: 'Borrels/min' }, none: { en: 'No readings yet. Press Record reading.', af: 'Nog geen lesings nie. Druk Teken lesing aan.' },
    yAxis: { en: 'Rate (bubbles per minute)', af: 'Tempo (borrels per minuut)' },
    xLight: { en: 'Relative light intensity (%)', af: 'Relatiewe ligintensiteit (%)' }, xCO2: { en: 'NaHCO₃ concentration (%)', af: 'NaHCO₃-konsentrasie (%)' }, xTemp: { en: 'Temperature (°C)', af: 'Temperatuur (°C)' },
    fLight: { en: 'light intensity', af: 'ligintensiteit' }, fCO2: { en: 'CO₂ concentration', af: 'CO₂-konsentrasie' }, fTemp: { en: 'temperature', af: 'temperatuur' },
    fNone: { en: 'no light (lamp off)', af: 'geen lig (lamp af)' }, fNoCO2: { en: 'no CO₂', af: 'geen CO₂' },
    limBy: { en: 'limited by', af: 'beperk deur' },
    capLight: { en: 'Light is the limiting factor: moving the lamp closer raises the rate.', af: 'Lig is die beperkende faktor: om die lamp nader te skuif, verhoog die tempo.' },
    capCO2: { en: 'CO₂ is the limiting factor: more light makes no difference now; add more sodium hydrogen carbonate.', af: 'CO₂ is die beperkende faktor: meer lig maak nou geen verskil nie; voeg meer natriumwaterstofkarbonaat by.' },
    capTemp: { en: 'Temperature is the limiting factor: the enzymes set the ceiling, so more light or CO₂ makes no difference.', af: 'Temperatuur is die beperkende faktor: die ensieme bepaal die plafon, dus maak meer lig of CO₂ geen verskil nie.' },
    capOff: { en: 'No light, so no light phase: no oxygen is produced.', af: 'Geen lig nie, dus geen ligfase nie: geen suurstof word geproduseer nie.' },
    capNoCO2: { en: 'No CO₂, so no glucose can be made and the rate drops to zero.', af: 'Geen CO₂ nie, dus kan geen glukose gemaak word nie en die tempo daal na nul.' },
    hot: { en: 'Above about 40 °C the enzymes denature and the rate falls steeply.', af: 'Bo ongeveer 40 °C denatureer die ensieme en die tempo daal skerp.' },
    lampL: { en: 'Lamp', af: 'Lamp' }, shield: { en: 'Heat shield (water)', af: 'Hitteskerm (water)' }, plant: { en: 'Elodea', af: 'Elodea' },
    gas: { en: 'Oxygen collects', af: 'Suurstof versamel' }, cm: { en: 'Distance from plant (cm)', af: 'Afstand van plant (cm)' },
    kept: { en: 'kept curve', af: 'gehoue kurwe' },
    predict: { en: 'If you keep moving the lamp closer, will the bubbles keep getting faster?', af: 'As jy die lamp al hoe nader skuif, sal die borrels al hoe vinniger kom?' },
    test: { en: 'Record readings at several distances, watch the graph level off, then keep the curve and raise the CO₂.', af: 'Teken lesings by verskeie afstande aan, kyk hoe die grafiek afplat, hou dan die kurwe en verhoog die CO₂.' },
    desc: { en: 'Lamp {d} cm from the plant, {c}% sodium hydrogen carbonate, {t} °C: {r} bubbles per minute, limited by {f}.', af: 'Lamp {d} cm van die plant, {c}% natriumwaterstofkarbonaat, {t} °C: {r} borrels per minuut, beperk deur {f}.' },
  };

  // ── Model ──
  const g = (t) => Math.pow(2, (t - 25) / 10) / (1 + Math.exp((t - 40) / 2.5));
  const g25 = g(25);
  let gMax = 0; for (let t = 0; t <= 50; t += 0.5) gMax = Math.max(gMax, g(t));
  const intensityOf = (on, d) => on ? 100 * Math.pow(10 / d, 2) : 0;
  function rateFrom(I, c, t) {
    const a = 1.6 * I, b = 125 * (g(t) / g25) * c / (c + 0.2);
    if (a <= 0 || b <= 0) return { R: 0, a, b };
    const th = 0.97, s = a + b;
    return { R: (s - Math.sqrt(s * s - 4 * th * a * b)) / (2 * th), a, b };
  }
  const S = { on: true, d: 20, c: 0.2, t: 25, plot: 'light', view: 'app', kept: null, recs: [], gas: 0 };
  function current() { const I = intensityOf(S.on, S.d); return Object.assign({ I }, rateFrom(I, S.c, S.t)); }
  // Once light is no longer limiting, the ceiling is set by CO₂ and temperature together. Report temperature
  // when it is well away from the optimum (below 20 °C or above 40 °C) or when CO₂ is already plentiful;
  // otherwise CO₂ (as in the classic investigation at room temperature).
  function ceilingFactor() { return (S.t < 20 || S.t > 40 || S.c >= 0.6) ? 'temp' : 'co2'; }
  function limiting(m) {
    if (!S.on) return 'off';
    if (S.c <= 0) return 'noco2';
    if (m.a < m.b) return 'light';
    return ceilingFactor();
  }
  const LIM = { off: T.fNone, noco2: T.fNoCO2, light: T.fLight, co2: T.fCO2, temp: T.fTemp };

  // ── Layout ──
  const panel = root.closest('.tab-panel') || root.parentNode;
  const pred = MLX.predict(panel, { predict: T.predict, test: T.test });
  root.parentNode.insertBefore(pred, root); // between the intro and the simulation
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 300 : Math.max(330, Math.min(400, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');
  // Phone: apparatus and graph share the stage as two views
  const tabs = MLX.h('div', { class: 'mlx-tabs' });
  ui.stage.insertBefore(tabs, ui.stage.firstChild);
  MLX.seg(tabs, { options: [['app', T.vApp], ['graph', T.vGraph]], value: S.view, onChange: (v) => { S.view = v; ui.cv.draw(); } });

  const prim = MLX.primary(ui.side, { label: T.rate, unit: T.perMin });
  const ro = MLX.readout(prim.el, [['lim', T.limit], ['int', T.intensity]]);
  const c1 = MLX.card(ui.side, T.set);
  const lampChk = MLX.check(c1, { label: T.lamp, value: S.on, onChange: (v) => { S.on = v; update(); } });
  const sD = MLX.slider(c1, { label: T.dist, min: 5, max: 60, step: 5, value: S.d, fmt: (v) => v + ' cm', speak: (v) => v + ' cm, ' + Math.round(intensityOf(true, v)) + '% ' + L(T.intensity).toLowerCase(), onInput: (v) => { S.d = v; update(); } });
  const sC = MLX.slider(c1, { label: T.co2, min: 0, max: 1, step: 0.05, value: S.c, fmt: (v) => num(v, 2) + '%', onInput: (v) => { S.c = v; update(); } });
  const sT = MLX.slider(c1, { label: T.temp, min: 5, max: 45, step: 1, value: S.t, fmt: (v) => v + ' °C', onInput: (v) => { S.t = v; update(); } });
  const segPlot = MLX.seg(c1, { label: T.plot, options: [['light', T.pLight], ['co2', T.pCO2], ['temp', T.pTemp]], value: S.plot, onChange: (v) => { S.plot = v; S.kept = null; S.recs = []; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.record, () => { const m = current(); S.recs.push({ x: xOf(), R: m.R, d: S.d, c: S.c, t: S.t, on: S.on }); if (S.recs.length > 12) S.recs.shift(); update(); }, 'primary');
  MLX.button(bt, T.keep, () => { S.kept = curvePts(); update(); });
  MLX.button(bt, T.reset, () => {
    Object.assign(S, { on: true, d: 20, c: 0.2, t: 25, plot: 'light', kept: null, recs: [], gas: 0 });
    lampChk.set(true); sD.set(20); sC.set(0.2); sT.set(25); segPlot.set('light'); update();
  });
  // Readings table (also the screen-reader equivalent of the graph's recorded points)
  const c2 = MLX.card(ui.side, T.readings);
  const tbl = MLX.h('div', { class: 'mlx-note' }); c2.appendChild(tbl);

  // ── Graph data ──
  const XR = { light: [0, 400], co2: [0, 1], temp: [5, 45] };
  function xOf() { return S.plot === 'light' ? intensityOf(S.on, S.d) : S.plot === 'co2' ? S.c : S.t; }
  function rAt(x) {
    const I = S.plot === 'light' ? x : intensityOf(S.on, S.d), c = S.plot === 'co2' ? x : S.c, t = S.plot === 'temp' ? x : S.t;
    return rateFrom(I, c, t).R;
  }
  function curvePts() { const [lo, hi] = XR[S.plot], out = []; for (let i = 0; i <= 120; i++) { const x = lo + (hi - lo) * i / 120; out.push([x, rAt(x)]); } return out; }

  // ── Bubbles: emitted at the true rate (one every 60/R seconds), rising at a constant speed ──
  let bubbles = [], since = 0;
  const loop = MLX.loop(ui.cv.el, (dt) => {
    const m = current();
    if (!MLX.reducedMotion && m.R > 0) {
      since += dt;
      const every = 60 / m.R;
      while (since >= every) { since -= every; bubbles.push({ y: 0, x: (Math.random() - 0.5) * 4 }); S.gas = Math.min(1, S.gas + 0.004); }
    }
    bubbles.forEach(b => { b.y += dt * 0.55; });
    bubbles = bubbles.filter(b => b.y < 1);
    ui.cv.draw();
  });
  loop.start();
  MLX.onTheme(() => ui.cv.draw());

  // ── Drawing ──
  function draw(ctx, W, H) {
    const c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const wide = W >= 640;
    if (wide) {
      const aw = Math.round(W * 0.56);
      drawApparatus(ctx, 0, aw, H, c);
      ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(aw + 0.5, 16); ctx.lineTo(aw + 0.5, H - 16); ctx.stroke();
      drawGraph(ctx, aw + 8, W - aw - 8, H, c);
    } else if (S.view === 'app') drawApparatus(ctx, 0, W, H, c);
    else drawGraph(ctx, 0, W, H, c);
  }

  function drawApparatus(ctx, x0, w, H, c) {
    const benchY = H - 44;
    const bh = Math.max(150, Math.min(240, H * 0.56)), bw = Math.max(96, Math.min(150, w * 0.24)), s = bh / 150;
    const bx = x0 + w - bw - 22, bTop = benchY - bh;
    const px = bx + bw * 0.42;                     // plant / funnel centre
    const hx = bx - 30 * s, hw = 12 * s;           // heat shield
    // The ruler shows the lamp-to-plant distance. The closest lamp position (5 cm) is drawn just left of the
    // heat shield, so the part of the scale between the shield and the plant is not drawn to scale.
    const near = hx - 18, far = x0 + 40, xAt = (d) => near - (d - 5) * (near - far) / 55;
    const lampX = xAt(S.d), lampY = benchY - bh * 0.48;
    const m = current();

    // bench and ruler (distance measured from the plant)
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x0 + 12, benchY); ctx.lineTo(x0 + w - 8, benchY); ctx.stroke();
    ctx.lineWidth = 1;
    for (let cm = 5; cm <= 60; cm += 5) {
      const x = xAt(cm), big = cm % 10 === 0 || cm === 5;
      ctx.beginPath(); ctx.moveTo(x, benchY + 2); ctx.lineTo(x, benchY + (big ? 10 : 6)); ctx.stroke();
      if (big) text(ctx, String(cm), x, benchY + 22, { size: 11, mono: true, align: 'center', color: c.text3 });
    }
    text(ctx, T.cm, x0 + 14, benchY + 36, { size: 11, color: c.text3 });

    // light from the lamp: flat fill whose strength follows the relative intensity (no glow, no gradient)
    if (S.on) {
      const a = Math.min(0.22, 0.03 + m.I / 900);
      ctx.fillStyle = c.light ? `rgba(234,179,8,${a})` : `rgba(253,224,71,${a})`;
      ctx.beginPath(); ctx.moveTo(lampX + 16, lampY - 9); ctx.lineTo(bx + 4, bTop + 12); ctx.lineTo(bx + 4, benchY - 4); ctx.lineTo(lampX + 16, lampY + 9); ctx.closePath(); ctx.fill();
    }
    // lamp: base, stand, shade facing the plant
    ctx.strokeStyle = c.text2; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(lampX - 14, benchY); ctx.lineTo(lampX + 6, benchY); ctx.moveTo(lampX - 4, benchY); ctx.lineTo(lampX - 4, lampY); ctx.lineTo(lampX + 4, lampY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(lampX + 2, lampY - 6); ctx.lineTo(lampX + 16, lampY - 12); ctx.lineTo(lampX + 16, lampY + 12); ctx.lineTo(lampX + 2, lampY + 6); ctx.closePath();
    ctx.fillStyle = S.on ? (c.light ? '#eab308' : '#fde047') : 'transparent'; ctx.fill(); ctx.stroke();
    text(ctx, T.lampL, lampX - 4, lampY - 20, { size: 12, align: 'center', color: c.text2 });

    // heat shield: a flat tank of water between lamp and beaker
    const hh = bh * 0.72;
    ctx.fillStyle = c.water; ctx.fillRect(hx, benchY - hh, hw, hh);
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.2; ctx.strokeRect(hx, benchY - hh, hw, hh);
    text(ctx, T.shield, hx + hw / 2, benchY - hh - 8, { size: 11, align: 'center', color: c.text3 });

    // beaker of water with NaHCO₃
    ctx.fillStyle = c.water; ctx.fillRect(bx, bTop + 16, bw, bh - 16);
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(bx, bTop); ctx.lineTo(bx, benchY); ctx.lineTo(bx + bw, benchY); ctx.lineTo(bx + bw, bTop); ctx.stroke();
    text(ctx, num(S.c, 2) + '% NaHCO₃', bx + bw / 2, benchY - 8, { size: 11, align: 'center', mono: true, color: c.text3 });

    // pondweed sprig (cut end up, under the funnel)
    const stemTop = benchY - bh * 0.56, stemBot = benchY - 22;
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px, stemBot); ctx.lineTo(px, stemTop); ctx.stroke();
    ctx.lineWidth = 1.6;
    for (let y = stemBot - 6; y > stemTop + 6; y -= 9) {
      [-1, 1].forEach(dir => { ctx.beginPath(); ctx.moveTo(px, y); ctx.quadraticCurveTo(px + dir * 6, y - 2, px + dir * 10, y - 7); ctx.stroke(); });
    }
    text(ctx, T.plant, px + 14, stemBot - 4, { size: 11, color: c.text3 });

    // inverted funnel over the plant, and the collecting tube above it
    const fBase = benchY - 14, fNeck = benchY - bh * 0.62, tubeTop = bTop - 58 * s, tw = 14;
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(px - 30 * s, fBase); ctx.lineTo(px - 5, fNeck); ctx.lineTo(px - 5, bTop + 4);
    ctx.moveTo(px + 30 * s, fBase); ctx.lineTo(px + 5, fNeck); ctx.lineTo(px + 5, bTop + 4); ctx.stroke();
    // test tube (closed, rounded top), full of water with a growing cap of oxygen
    ctx.fillStyle = c.water; ctx.fillRect(px - tw / 2, tubeTop + tw / 2, tw, bTop + 16 - tubeTop - tw / 2);
    const gasH = S.gas * (bTop - tubeTop) * 0.7;
    ctx.fillStyle = c.stage; ctx.fillRect(px - tw / 2 + 1, tubeTop + tw / 2, tw - 2, gasH);
    ctx.beginPath(); ctx.moveTo(px - tw / 2, bTop + 4); ctx.lineTo(px - tw / 2, tubeTop + tw / 2); ctx.arc(px, tubeTop + tw / 2, tw / 2, Math.PI, 0); ctx.lineTo(px + tw / 2, bTop + 4); ctx.stroke();
    if (S.gas > 0.02) text(ctx, T.gas, px + tw / 2 + 6, tubeTop + tw / 2 + Math.max(10, gasH / 2), { size: 11, color: c.text3 });

    // bubbles from the cut end up the tube; reduced motion: a static column spaced by the rate
    const yFrom = stemTop - 2, yTo = tubeTop + tw / 2 + gasH + 4;
    ctx.strokeStyle = c.text; ctx.lineWidth = 1.2;
    if (MLX.reducedMotion) {
      const n = Math.round(Math.min(12, m.R / 10));
      for (let i = 0; i < n; i++) { const y = yFrom - (i + 0.5) / Math.max(n, 1) * (yFrom - yTo); ctx.beginPath(); ctx.arc(px, y, 2.4, 0, Math.PI * 2); ctx.stroke(); }
    } else bubbles.forEach(b => { const y = yFrom - b.y * (yFrom - yTo); ctx.beginPath(); ctx.arc(px + b.x * (y > fNeck ? 1 : 0.3), y, 2.4, 0, Math.PI * 2); ctx.stroke(); });

    // thermometer
    const thx = bx + bw - 14, thTop = bTop - 20 * s, thBot = benchY - 12;
    ctx.strokeStyle = c.glass; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(thx - 3, thTop); ctx.lineTo(thx - 3, thBot - 5); ctx.moveTo(thx + 3, thTop); ctx.lineTo(thx + 3, thBot - 5); ctx.stroke();
    ctx.beginPath(); ctx.arc(thx, thBot, 5, 0, Math.PI * 2); ctx.fillStyle = '#ef5b5b'; ctx.fill();
    const lvl = thBot - 5 - (S.t / 50) * (thBot - 5 - thTop);
    ctx.fillStyle = '#ef5b5b'; ctx.fillRect(thx - 1.5, lvl, 3, thBot - lvl);
    text(ctx, S.t + ' °C', thx + 8, thTop + 10, { size: 12, mono: true, color: c.text2 });
  }

  function drawGraph(ctx, x0, w, H, c) {
    const [lo, hi] = XR[S.plot];
    const ax = MLX.axes(ctx, { x0, y0: 8, w, h: H - 8, xMin: lo, xMax: hi, yMin: 0, yMax: 200,
      xTitle: S.plot === 'light' ? T.xLight : S.plot === 'co2' ? T.xCO2 : T.xTemp, yTitle: T.yAxis,
      fmtX: (v) => S.plot === 'co2' ? num(v, 1) : num(v, 0), xTicks: 4, yTicks: 4 });
    const pts = curvePts();
    // shade where the curve has levelled off and name what limits it (light plot only)
    if (S.plot === 'light' && S.on) {
      const lim = rateFrom(400, S.c, S.t);
      if (lim.b > 0) {
        const xPl = Math.min(hi, lim.b / 1.6);
        ctx.fillStyle = c.lineSoft; ctx.fillRect(ax.X(xPl), ax.box.y0, ax.box.x1 - ax.X(xPl), ax.box.y1 - ax.box.y0);
        text(ctx, L(T.limBy) + ' ' + L(ceilingFactor() === 'co2' ? T.fCO2 : T.fTemp), (ax.X(xPl) + ax.box.x1) / 2, ax.box.y0 + 16, { size: 12, align: 'center', color: c.text2 });
      }
    }
    if (S.kept) {
      ctx.setLineDash([5, 4]); ctx.strokeStyle = c.text3; ctx.lineWidth = 1.6; ctx.beginPath();
      S.kept.forEach(([x, r], i) => { const X = ax.X(x), Y = ax.Y(Math.min(200, r)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke(); ctx.setLineDash([]);
    }
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2; ctx.beginPath();
    pts.forEach(([x, r], i) => { const X = ax.X(x), Y = ax.Y(Math.min(200, r)); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
    S.recs.forEach(p => { ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(ax.X(p.x), ax.Y(Math.min(200, p.R)), 4.5, 0, Math.PI * 2); ctx.stroke(); });
    const xc = Math.max(lo, Math.min(hi, xOf())), rc = current().R;
    ctx.fillStyle = c.ink; ctx.beginPath(); ctx.arc(ax.X(xc), ax.Y(Math.min(200, rc)), 5, 0, Math.PI * 2); ctx.fill();
    const nearRight = ax.X(xc) > ax.box.x1 - 30;
    text(ctx, num(rc, 0), ax.X(xc) + (nearRight ? -8 : 8), ax.Y(Math.min(200, rc)) - 8, { size: 12, mono: true, color: c.ink, align: nearRight ? 'right' : 'left' });
  }

  function update() {
    const m = current(), lim = limiting(m), R = Math.round(m.R);
    prim.set(String(R));
    ro.set('lim', L(LIM[lim]).replace(/^./, (ch) => ch.toUpperCase()));
    ro.set('int', S.on ? num(m.I, 0) + '%' : '0%');
    let cap = lim === 'off' ? L(T.capOff) : lim === 'noco2' ? L(T.capNoCO2) : lim === 'light' ? L(T.capLight) : lim === 'co2' ? L(T.capCO2) : L(T.capTemp);
    if (S.t > 40) cap += ' ' + L(T.hot);
    ui.setCaption(cap);
    ui.caption.style.color = S.t > 40 ? MLX.colors().warn : '';
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + L(T.desc).replace('{d}', S.d).replace('{c}', num(S.c, 2)).replace('{t}', S.t).replace('{r}', R).replace('{f}', L(LIM[lim])));
    tbl.innerHTML = '';
    if (!S.recs.length) tbl.textContent = L(T.none);
    else {
      const t = MLX.h('table', { class: 'mlx-table' });
      t.appendChild(MLX.h('tr', null, [MLX.h('th', { text: L(T.hD) }), MLX.h('th', { text: 'NaHCO₃' }), MLX.h('th', { text: L(T.hT) }), MLX.h('th', { text: L(T.hR) })]));
      S.recs.forEach(r => t.appendChild(MLX.h('tr', null, [MLX.h('td', { text: r.on ? r.d + ' cm' : '—' }), MLX.h('td', { text: num(r.c, 2) + '%' }), MLX.h('td', { text: r.t + ' °C' }), MLX.h('td', { text: num(r.R, 0) })])));
      tbl.appendChild(t);
    }
    ui.cv.draw();
  }
  update();
});
