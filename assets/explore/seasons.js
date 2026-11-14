/* Gr7 Seasons — the tilted Earth in orbit, and what it means for sunlight in South Africa.
 * The axis is tilted 23.4° and points the same way in space all year. Earth is drawn in 3D (seen from above the
 * orbit at an angle) and lit by the Sun pixel by pixel, so the polar day and night show correctly.
 *   Solar declination δ = −23.44°·cos(2π(N + 10)/365)  (N = day of the year; δ = −23.4° on about 21 December)
 *   Noon sun height at latitude φ: 90° − |φ − δ|.   Day length: (24/π)·arccos(−tan φ·tan δ) hours.
 *   Earth–Sun distance: 149.6 × (1 − 0.0167·cos(2π(N − 3)/365)) million km: closest about 3 January (147 million km),
 *   in South Africa's summer, but that 3% change is not what causes the seasons; the tilt is.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'Earth orbiting the Sun with its tilted axis, and the noon sunlight striking South Africa', af: 'Die aarde wat om die son wentel met sy skuins as, en die middagsonlig wat Suid-Afrika tref' },
    season: { en: 'Season in South Africa', af: 'Seisoen in Suid-Afrika' }, date: { en: 'Date', af: 'Datum' },
    noon: { en: 'Noon sun height', af: 'Middagsonhoogte' }, day: { en: 'Daylight', af: 'Daglig' }, dist: { en: 'Distance from the Sun', af: 'Afstand van die son' },
    place: { en: 'Place', af: 'Plek' }, musina: { en: 'Musina 22°S', af: 'Musina 22°S' }, jhb: { en: 'Johannesburg 26°S', af: 'Johannesburg 26°S' }, ct: { en: 'Cape Town 34°S', af: 'Kaapstad 34°S' },
    time: { en: 'Time of year', af: 'Tyd van die jaar' }, play: { en: 'Play the year', af: 'Speel die jaar' }, pause: { en: 'Pause', af: 'Pouseer' },
    summer: { en: 'Summer', af: 'Somer' }, autumn: { en: 'Autumn', af: 'Herfs' }, winter: { en: 'Winter', af: 'Winter' }, spring: { en: 'Spring', af: 'Lente' },
    sun: { en: 'Sun', af: 'Son' }, ns: { en: 'not to scale', af: 'nie volgens skaal nie' },
    rays: { en: 'Noon sunlight in', af: 'Middagsonlig in' }, spread: { en: 'the same beam spreads over', af: 'dieselfde bundel versprei oor' },
    m2: { en: 'times the ground area of overhead sun', af: 'keer die grondoppervlakte van loodregte son' },
    capS: { en: 'December: the southern half of Earth leans towards the Sun. The Sun is high at noon and days are long, so South Africa gets more energy per square metre.', af: 'Desember: die suidelike helfte van die aarde leun na die son. Die son is hoog in die middag en die dae is lank, dus kry Suid-Afrika meer energie per vierkante meter.' },
    capW: { en: 'June: the southern half leans away from the Sun. The noon Sun is low and its light spreads over more ground; days are short.', af: 'Junie: die suidelike helfte leun weg van die son. Die middagson is laag en sy lig versprei oor meer grond; die dae is kort.' },
    capE: { en: 'Equinox: the axis leans neither towards nor away from the Sun; day and night are about 12 hours everywhere.', af: 'Equinoks: die as leun nie na of weg van die son nie; dag en nag is oral omtrent 12 uur.' },
    capDist: { en: 'Earth is closest to the Sun in early January (147 million km), in our summer, but only 3% closer: the tilt, not the distance, causes the seasons.', af: 'Die aarde is die naaste aan die son vroeg in Januarie (147 miljoen km), in ons somer, maar net 3% nader: die skuinste, nie die afstand nie, veroorsaak die seisoene.' },
  };
  const MON = { en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], af: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'] };
  const DIM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const S = { N: 355, lat: -26, playing: false };
  const RAD = Math.PI / 180, EPS = 23.44;
  const decl = (N) => -EPS * Math.cos(2 * Math.PI * (N + 10) / 365);
  const noonAlt = (N) => 90 - Math.abs(S.lat - decl(N));
  const dayLen = (N) => { const x = -Math.tan(S.lat * RAD) * Math.tan(decl(N) * RAD); return x <= -1 ? 24 : x >= 1 ? 0 : 24 / Math.PI * Math.acos(x); };
  const distMkm = (N) => 149.6 * (1 - 0.0167 * Math.cos(2 * Math.PI * (N - 3) / 365));
  function dateOf(N) { let d = Math.round(N), m = 0; while (m < 11 && d > DIM[m]) { d -= DIM[m]; m++; } return d + ' ' + (MLX.af ? MON.af : MON.en)[m]; }
  function seasonOf(N) { const d = Math.round(N); if (d >= 335 || d < 60) return T.summer; if (d < 152) return T.autumn; if (d < 244) return T.winter; return T.spring; }

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 440 : Math.max(360, Math.min(440, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.season, unit: '' });
  prim.el.querySelector('.mlx-primary-val').style.fontFamily = 'inherit'; // a word, not a number
  const ro = MLX.readout(prim.el, [['d', T.date], ['n', T.noon], ['l', T.day], ['r', T.dist]]);
  const c1 = MLX.card(ui.side);
  const sN = MLX.slider(c1, { label: T.time, min: 1, max: 365, step: 1, value: S.N, fmt: (v) => dateOf(v), ends: false, onInput: (v) => { S.N = v; update(); } });
  MLX.seg(c1, { label: T.place, options: [[-22, T.musina], [-26, T.jhb], [-34, T.ct]], value: S.lat, onChange: (v) => { S.lat = v; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  const bP = MLX.button(bt, T.play, () => { S.playing = !S.playing; bP.textContent = L(S.playing ? T.pause : T.play); }, 'primary');
  const loop = MLX.loop(ui.cv.el, (dt) => { if (S.playing && !MLX.reducedMotion) { S.N = ((S.N - 1 + dt * 30) % 365) + 1; sN.set(Math.round(S.N)); update(); } });
  loop.start();
  MLX.onTheme(() => ui.cv.draw());

  // 3D helpers. World: orbit in the XY plane, Z up, Sun at the origin. Axis (to the north pole) n = (sin ε, 0, cos ε),
  // fixed in space; on the December solstice (N = 355) Earth is at +X, so the south pole leans towards the Sun.
  const nAx = [Math.sin(EPS * RAD), 0, Math.cos(EPS * RAD)];
  const EX = [1, 0, 0], EY = [0, 0.4, -0.9165], VIEW = [0, 0.9165, 0.4];   // screen x, screen y (down), towards the viewer
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const add = (a, b, k) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
  const unit = (a) => { const l = Math.hypot(a[0], a[1], a[2]); return [a[0] / l, a[1] / l, a[2] / l]; };
  const off = document.createElement('canvas');

  let c, ctx;
  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    if (W >= 640) { const ow = Math.round(W * 0.6); drawOrbit(0, ow, H); ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(ow + 0.5, 14); ctx.lineTo(ow + 0.5, H - 14); ctx.stroke(); drawRays(ow + 8, W - ow - 8, 0, H); }
    else { drawOrbit(0, W, H * 0.56); drawRays(0, W, H * 0.56, H * 0.44); }
  }

  function drawOrbit(x0, w, H) {
    const cx = x0 + w / 2, cy = H * 0.5, R = Math.min(w * 0.34, H * 0.95);
    const P = (p) => [cx + dot(p, EX) * R, cy + dot(p, EY) * R];
    // orbit path
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath();
    for (let i = 0; i <= 72; i++) { const a = i / 72 * 2 * Math.PI, q = P([Math.cos(a), Math.sin(a), 0]); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.stroke();
    // month marks
    [355, 80, 172, 266].forEach(Nm => { const a = 2 * Math.PI * (Nm - 355) / 365, q = P([Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0]); text(ctx, dateOf(Nm), q[0], q[1] + 4, { size: 11, align: 'center', color: c.text3 }); });
    // Sun: flat disc
    ctx.fillStyle = c.light ? '#eab308' : '#fde047'; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
    text(ctx, T.sun, cx, cy + 32, { size: 12, align: 'center', color: c.text2 });
    // Earth
    const a = 2 * Math.PI * (S.N - 355) / 365, E = [Math.cos(a), Math.sin(a), 0], sDir = unit([-E[0], -E[1], 0]);
    const [ex, ey] = P(E), r = Math.max(22, Math.min(38, w * 0.06));
    drawEarth(ex, ey, r, sDir);
    text(ctx, T.ns, x0 + 10, H - 10, { size: 11, color: c.text3 });
  }

  // Earth shaded pixel by pixel: each screen point on the disc is turned back into a direction on the globe
  function drawEarth(ex, ey, r, sDir) {
    const n = Math.ceil(r * 2), dpr = 2;
    off.width = n * dpr; off.height = n * dpr;
    const o = off.getContext('2d'), img = o.createImageData(n * dpr, n * dpr), D = img.data;
    const latR = S.lat * RAD;
    const m = unit(add(sDir, nAx, -dot(sDir, nAx)));              // noon meridian (facing the Sun)
    for (let j = 0; j < n * dpr; j++) for (let i = 0; i < n * dpr; i++) {
      const u = (i / dpr - r) / r, v = (j / dpr - r) / r, q = u * u + v * v;
      if (q > 1) continue;
      const z = Math.sqrt(1 - q);
      const w3 = add(add([EX[0] * u, EX[1] * u, EX[2] * u], EY, v), VIEW, z);  // world normal
      const lit = dot(w3, sDir) > 0;
      const lat = Math.asin(Math.max(-1, Math.min(1, dot(w3, nAx))));
      const k = (j * n * dpr + i) * 4;
      let col = lit ? [64, 140, 214] : [22, 40, 70];
      if (Math.abs(lat) < 0.012) col = lit ? [190, 215, 240] : [70, 90, 120];                  // equator
      if (Math.abs(lat - latR) < 0.02 && dot(w3, m) > 0.2) col = [253, 224, 71];                 // the chosen latitude, day side
      D[k] = col[0]; D[k + 1] = col[1]; D[k + 2] = col[2]; D[k + 3] = 255;
    }
    o.putImageData(img, 0, 0);
    ctx.drawImage(off, ex - r, ey - r, n, n);
    // axis line through the poles
    const np = [ex + dot(nAx, EX) * r * 1.45, ey + dot(nAx, EY) * r * 1.45], sp = [ex - dot(nAx, EX) * r * 1.45, ey - dot(nAx, EY) * r * 1.45];
    ctx.strokeStyle = c.ink; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(sp[0], sp[1]); ctx.lineTo(np[0], np[1]); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, 'N', np[0] + 4, np[1] - 2, { size: 12, weight: 700, color: c.ink });
    text(ctx, 'S', sp[0] + 4, sp[1] + 12, { size: 12, weight: 700, color: c.ink });
  }

  // Noon sunlight on flat ground at the chosen place: a beam 1 unit wide covers 1/sin(height) units of ground
  function drawRays(x0, w, y0, H) {
    const alt = Math.max(1, noonAlt(S.N)), gy = y0 + H - 60, gx0 = x0 + 20, gx1 = x0 + w - 20;
    text(ctx, L(T.rays) + ' ' + L(S.lat === -22 ? T.musina : S.lat === -26 ? T.jhb : T.ct).split(' ')[0], x0 + 14, y0 + 22, { size: 12, color: c.text2 });
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx0, gy); ctx.lineTo(gx1, gy); ctx.stroke();
    const beam = 40, foot = beam / Math.sin(alt * RAD), mid = (gx0 + gx1) / 2;
    const dx = Math.cos(alt * RAD), dy = Math.sin(alt * RAD), len = Math.min(H - 90, 160);
    ctx.fillStyle = c.light ? 'rgba(234,179,8,0.25)' : 'rgba(253,224,71,0.22)';
    ctx.beginPath(); ctx.moveTo(mid - foot / 2, gy); ctx.lineTo(mid + foot / 2, gy); ctx.lineTo(mid + foot / 2 - dx * len, gy - dy * len); ctx.lineTo(mid - foot / 2 - dx * len, gy - dy * len); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = c.light ? '#a16207' : '#fde047'; ctx.lineWidth = 1.5;
    [-0.5, 0.5].forEach(k => { ctx.beginPath(); ctx.moveTo(mid + k * foot, gy); ctx.lineTo(mid + k * foot - dx * len, gy - dy * len); ctx.stroke(); });
    ctx.strokeStyle = c.accent; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(mid - foot / 2, gy); ctx.lineTo(mid + foot / 2, gy); ctx.stroke();
    // angle arc
    ctx.strokeStyle = c.text2; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(mid + foot / 2, gy, 26, Math.PI, Math.PI + alt * RAD, false); ctx.stroke();
    text(ctx, num(alt, 0) + '°', mid + foot / 2 - 34, gy - 8, { size: 12, mono: true, align: 'right', color: c.ink });
    ctx.font = '12px "Cabinet Grotesk", sans-serif';
    MLX.wrap(ctx, L(T.spread) + ' ' + num(1 / Math.sin(alt * RAD), 2) + ' ' + L(T.m2), w - 28).forEach((ln, i) => text(ctx, ln, x0 + 14, gy + 24 + i * 16, { size: 12, color: c.text2 }));
  }

  function update() {
    const N = Math.round(S.N);
    prim.set(L(seasonOf(N)));
    ro.set('d', dateOf(N)); ro.set('n', num(noonAlt(N), 0) + '°'); ro.set('l', num(dayLen(N), 1) + ' h'); ro.set('r', num(distMkm(N), 1) + (MLX.af ? ' miljoen km' : ' million km'));
    const dcl = decl(N);
    let cap = Math.abs(dcl) < 4 ? T.capE : dcl < 0 ? T.capS : T.capW;
    if (N <= 15 || N >= 360) cap = T.capDist;
    ui.setCaption(cap);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + dateOf(N) + ': ' + L(seasonOf(N)) + ', noon sun ' + num(noonAlt(N), 0) + '°, ' + num(dayLen(N), 1) + ' h of daylight.');
    ui.cv.draw();
  }
  update();
});
