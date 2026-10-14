/* Gr9 The Earth as a System — change one sphere, watch the others respond.
 * A simple, connected model (one step per simulated year):
 *   CO₂ rises with fuel burning and with forest loss, and is slowly absorbed;
 *   temperature follows CO₂ (greenhouse effect), minus volcanic dust;
 *   cleared forest leaves soil unprotected, so rain washes it into the river;
 *   a muddy, warmer river supports fewer fish.
 * The numbers are illustrative; the directions of the links are the point.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Landscape showing the atmosphere, lithosphere, hydrosphere and biosphere', af: 'Landskap met die atmosfeer, litosfeer, hidrosfeer en biosfeer' },
    act: { en: 'Change something', af: 'Verander iets' },
    clear: { en: 'Forest cleared', af: 'Woud skoongekap' }, burn: { en: 'Fossil fuels burned', af: 'Fossielbrandstof verbrand' },
    erupt: { en: 'Erupt the volcano', af: 'Laat die vulkaan uitbars' }, reset: { en: 'Start again', af: 'Begin weer' },
    state: { en: 'The spheres after', af: 'Die sfere ná' }, years: { en: 'years', af: 'jaar' },
    co2: { en: 'Atmosphere: CO₂', af: 'Atmosfeer: CO₂' }, temp: { en: 'Atmosphere: temperature', af: 'Atmosfeer: temperatuur' },
    soil: { en: 'Lithosphere: topsoil left', af: 'Litosfeer: bogrond oor' }, mud: { en: 'Hydrosphere: mud in river', af: 'Hidrosfeer: modder in rivier' },
    fish: { en: 'Biosphere: fish', af: 'Biosfeer: visse' },
    atm: { en: 'Atmosphere', af: 'Atmosfeer' }, lith: { en: 'Lithosphere', af: 'Litosfeer' }, hyd: { en: 'Hydrosphere', af: 'Hidrosfeer' }, bio: { en: 'Biosphere', af: 'Biosfeer' },
    calm: { en: 'Everything is in balance. Change one sphere and watch how the others respond.', af: 'Alles is in balans. Verander een sfeer en kyk hoe die ander reageer.' },
  };
  const LINKS = {
    erosion: { en: 'Biosphere → lithosphere → hydrosphere: with fewer tree roots holding it, rain washes soil into the river.', af: 'Biosfeer → litosfeer → hidrosfeer: met minder boomwortels wat dit vashou, spoel reën grond in die rivier in.' },
    fish: { en: 'Hydrosphere → biosphere: muddy water blocks light and clogs gills, so fewer fish survive.', af: 'Hidrosfeer → biosfeer: modderige water keer lig en verstop kieue, so minder visse oorleef.' },
    co2burn: { en: 'Lithosphere → atmosphere: burning coal and oil (from the lithosphere) adds CO₂ to the air.', af: 'Litosfeer → atmosfeer: die verbranding van steenkool en olie (uit die litosfeer) voeg CO₂ by die lug.' },
    co2tree: { en: 'Biosphere → atmosphere: fewer trees take in less CO₂ through photosynthesis.', af: 'Biosfeer → atmosfeer: minder bome neem minder CO₂ op deur fotosintese.' },
    warm: { en: 'Atmosphere → hydrosphere → biosphere: more CO₂ traps heat; warmer water holds less oxygen for fish.', af: 'Atmosfeer → hidrosfeer → biosfeer: meer CO₂ hou hitte vas; warmer water hou minder suurstof vir visse.' },
    dust: { en: 'Lithosphere → atmosphere: volcanic dust blocks sunlight and cools the Earth for a few years.', af: 'Litosfeer → atmosfeer: vulkaniese stof keer sonlig en verkoel die aarde vir \'n paar jaar.' },
    ash: { en: 'Lithosphere → hydrosphere: volcanic ash washes into the river and makes it muddy.', af: 'Litosfeer → hidrosfeer: vulkaniese as spoel in die rivier en maak dit modderig.' },
  };

  const S0 = () => ({ yr: 0, co2: 300, dust: 0, soil: 100, silt: 4, fish: 100, ash: 0, eruptT: -1 });
  let clear = 0, burn = 0, st = S0(), acc = 0, now = 0;
  const ui = MLX.layout(root, { height: (w) => Math.max(260, Math.min(360, Math.round(w * 0.44))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.act);
  const sClear = MLX.slider(c1, { label: T.clear, min: 0, max: 100, step: 5, value: 0, fmt: (v) => v + '%', onInput: (v) => { clear = v; } });
  const sBurn = MLX.slider(c1, { label: T.burn, min: 0, max: 100, step: 5, value: 0, fmt: (v) => v + '%', onInput: (v) => { burn = v; } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.erupt, () => { st.dust = 1; st.ash = 1; st.co2 += 6; st.eruptT = 0; }, 'primary');
  MLX.button(bt, T.reset, () => { st = S0(); clear = burn = 0; sClear.set(0); sBurn.set(0); });
  const c2 = MLX.card(ui.side, T.state);
  const yrEl = MLX.h('div', { class: 'mlx-note', style: 'margin:-4px 0 6px' }); c2.appendChild(yrEl);
  const ro = MLX.readout(c2, [['co2', T.co2], ['temp', T.temp], ['soil', T.soil], ['mud', T.mud], ['fish', T.fish]]);

  const temp = () => 3 * Math.log2(st.co2 / 300) - 1.2 * st.dust;
  function step() {               // one simulated year
    const F = 100 - clear;
    st.co2 += 0.06 * burn + 0.03 * (100 - F) - 0.02 * (st.co2 - 300);
    st.dust *= 0.7; st.ash *= 0.75;
    const erosion = (1 - F / 100) * 1.6;
    st.soil = Math.max(0, st.soil - erosion * 0.6);
    st.silt += (4 + erosion * 30 + st.ash * 40 - st.silt) * 0.25;
    const target = Math.max(0, 100 - Math.max(0, st.silt - 4) * 1.6 - Math.max(0, temp()) * 9);
    st.fish += (target - st.fish) * 0.2;
    st.yr++;
  }
  function link() {
    const c = [];
    if (st.eruptT >= 0 && st.eruptT < 3) c.push([3, LINKS.dust]);
    if (st.ash > 0.2) c.push([2.5, LINKS.ash]);
    if (clear >= 20) c.push([clear / 30, LINKS.erosion]);
    if (st.silt > 15) c.push([st.silt / 25, LINKS.fish]);
    if (burn >= 20) c.push([burn / 35, LINKS.co2burn]);
    if (clear >= 40) c.push([clear / 50, LINKS.co2tree]);
    if (temp() > 0.6) c.push([temp(), LINKS.warm]);
    if (!c.length) return T.calm;
    c.sort((a, b) => b[0] - a[0]);
    return c[Math.floor(st.yr / 6) % Math.min(2, c.length)][1];
  }
  function show() {
    const t = temp();
    yrEl.textContent = st.yr + ' ' + L(T.years);
    ro.set('co2', Math.round(st.co2) + ' ppm', st.co2 > 400 ? '#fca5a5' : st.co2 > 330 ? '#fde68a' : '');
    ro.set('temp', (t >= 0 ? '+' : '') + num(t, 1) + ' °C', t > 1 ? '#fca5a5' : t < -0.3 ? '#93c5fd' : '');
    ro.set('soil', Math.round(st.soil) + '%', st.soil < 60 ? '#fca5a5' : '');
    ro.set('mud', Math.round(st.silt) + '%', st.silt > 20 ? '#fca5a5' : st.silt > 10 ? '#fde68a' : '');
    ro.set('fish', Math.round(st.fish) + '%', st.fish < 50 ? '#fca5a5' : st.fish < 80 ? '#fde68a' : '');
    ui.setCaption(link());
  }

  function draw(ctx, W, H) {
    const time = now;
    const t = temp(), haze = Math.min(1, Math.max(0, (st.co2 - 300) / 300) + st.dust * 0.8);
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.6);
    sky.addColorStop(0, `rgb(${Math.round(20 + 60 * haze)},${Math.round(40 + 20 * haze)},${Math.round(80 - 40 * haze)})`);
    sky.addColorStop(1, `rgb(${Math.round(40 + 90 * haze)},${Math.round(80 + 20 * haze)},${Math.round(120 - 60 * haze)})`);
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // sun, dimmed by volcanic dust
    ctx.fillStyle = `rgba(253,224,71,${0.95 - 0.6 * st.dust})`; ctx.beginPath(); ctx.arc(W * 0.86, H * 0.14, 20, 0, Math.PI * 2); ctx.fill();
    // ground and hills
    const gy = H * 0.62;
    ctx.fillStyle = '#3f3a2e'; ctx.fillRect(0, gy, W, H - gy);
    // volcano (lithosphere)
    const vx = W * 0.14;
    ctx.fillStyle = '#57534e'; ctx.beginPath(); ctx.moveTo(vx - 90, gy); ctx.lineTo(vx - 14, gy - 110); ctx.lineTo(vx + 14, gy - 110); ctx.lineTo(vx + 90, gy); ctx.closePath(); ctx.fill();
    if (st.eruptT >= 0 && st.eruptT < 12) {
      // ash plume for about three seconds, fading as the dust settles
      const fade = 1 - st.eruptT / 12;
      for (let k = 0; k < 16; k++) { const a = -Math.PI / 2 + (k - 8) * 0.11, r = 20 + ((k * 23 + time * 40) % 110); ctx.fillStyle = `rgba(120,113,108,${Math.max(0, (0.75 - r / 170) * fade)})`; ctx.beginPath(); ctx.arc(vx + Math.cos(a) * r, gy - 110 + Math.sin(a) * r, 10 + r / 7, 0, Math.PI * 2); ctx.fill(); }
      if (st.eruptT < 6) { ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(vx - 14, gy - 110); ctx.lineTo(vx, gy - 130 - 20 * Math.abs(Math.sin(time * 8))); ctx.lineTo(vx + 14, gy - 110); ctx.fill(); }
    }
    // forest (biosphere): trees disappear as the forest is cleared
    const trees = 22, standing = Math.round(trees * (1 - clear / 100));
    for (let k = 0; k < trees; k++) {
      const x = W * 0.3 + (k % 11) * W * 0.03 + (k > 10 ? W * 0.015 : 0), y = gy - 4 + (k > 10 ? 10 : 0);
      if (k < standing) { ctx.fillStyle = '#5b3a1e'; ctx.fillRect(x - 2, y - 10, 4, 10); ctx.fillStyle = '#15803d'; ctx.beginPath(); ctx.moveTo(x - 10, y - 8); ctx.lineTo(x, y - 34); ctx.lineTo(x + 10, y - 8); ctx.closePath(); ctx.fill(); }
      else { ctx.fillStyle = '#5b3a1e'; ctx.fillRect(x - 3, y - 4, 6, 4); }
    }
    // factory burning fuel
    const fx = W * 0.68;
    ctx.fillStyle = '#334155'; ctx.fillRect(fx - 30, gy - 40, 60, 40); ctx.fillRect(fx + 12, gy - 80, 12, 40);
    for (let k = 0; k < Math.round(burn / 12); k++) { const r = 8 + k * 4, yy = gy - 90 - k * 14 - (time * 20) % 14; ctx.fillStyle = `rgba(100,100,100,${0.5 - k * 0.05})`; ctx.beginPath(); ctx.arc(fx + 18 + k * 6, yy, r, 0, Math.PI * 2); ctx.fill(); }
    // river and sea (hydrosphere): browner with more silt
    const mud = Math.min(1, (st.silt - 4) / 40);
    const water = `rgb(${Math.round(37 + 110 * mud)},${Math.round(99 + 20 * mud)},${Math.round(235 - 170 * mud)})`;
    ctx.fillStyle = water;
    ctx.beginPath(); ctx.moveTo(W * 0.36, gy); ctx.bezierCurveTo(W * 0.42, gy + 40, W * 0.55, gy + 30, W * 0.62, H); ctx.lineTo(W * 0.74, H); ctx.bezierCurveTo(W * 0.64, gy + 40, W * 0.5, gy + 20, W * 0.4, gy); ctx.closePath(); ctx.fill();
    // fish
    const nf = Math.round(6 * st.fish / 100);
    for (let k = 0; k < nf; k++) {
      const p = ((time * 0.05 + k / 6) % 1), x = W * 0.45 + p * W * 0.2, y = gy + 40 + p * (H - gy - 50) + Math.sin(time * 3 + k) * 3;
      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.ellipse(x, y, 7, 3.5, 0.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - 6, y - 4); ctx.lineTo(x - 12, y - 7); ctx.lineTo(x - 10, y); ctx.fill();
    }
    // sphere labels
    const tag = (s, x, y, c) => { text(ctx, s, x, y, { size: 12, weight: 800, color: c }); };
    tag(T.atm, 12, 22, '#bae6fd'); tag(T.lith, vx - 40, gy + 24, '#d6d3d1'); tag(T.bio, W * 0.3, gy - 44, '#86efac'); tag(T.hyd, W * 0.62, H - 12, '#93c5fd');
    text(ctx, (t >= 0 ? '+' : '') + num(t, 1) + ' °C', W - 12, 22, { size: 13, mono: true, weight: 700, align: 'right', color: t > 1 ? '#fca5a5' : t < -0.3 ? '#93c5fd' : '#e2e8f0' });
  }

  show();
  MLX.loop(ui.stage, (dt, time) => {
    acc += dt;
    if (acc > 0.25) { acc = 0; step(); if (st.eruptT >= 0) st.eruptT += 1; show(); }
    now = time;
    ui.cv.draw();
  }).start();
});
