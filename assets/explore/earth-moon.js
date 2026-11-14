/* Gr7 The Earth and the Moon — phases and tides.
 * Phases: seen from above, the Sun always lights the half of the Moon facing it. The phase is how much of that lit
 * half faces Earth. Synodic month 29.5 days; lit fraction = (1 − cos(2π·age/29.5))/2. In the Southern Hemisphere
 * the waxing Moon is lit on the LEFT (the mirror image of the Northern view).
 * Tides: the Moon raises two bulges on opposite sides of Earth; the Sun adds bulges about 0.46× as big. In line
 * (new and full Moon) they add: spring tides; at right angles (quarters) they partly cancel: neap tides.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'The Moon orbiting Earth seen from above with sunlight from one side, and the Moon\'s phase as seen from South Africa', af: 'Die maan wat om die aarde wentel, van bo gesien met sonlig van een kant, en die maan se fase soos van Suid-Afrika gesien' },
    phase: { en: 'Phase', af: 'Fase' }, age: { en: 'Days since new Moon', af: 'Dae sedert nuwemaan' }, lit: { en: 'Face lit, seen from Earth', af: 'Gesig verlig, van die aarde gesien' },
    tide: { en: 'Tides', af: 'Getye' }, view: { en: 'Show', af: 'Wys' }, vPh: { en: 'Phases', af: 'Fases' }, vTi: { en: 'Tides', af: 'Getye' },
    day: { en: 'Day of the lunar month', af: 'Dag van die maanmaand' }, play: { en: 'Play', af: 'Speel' }, pause: { en: 'Pause', af: 'Pouseer' },
    sun: { en: 'Sunlight', af: 'Sonlig' }, earth: { en: 'Earth', af: 'Aarde' }, moon: { en: 'Moon', af: 'Maan' },
    fromSA: { en: 'Seen from South Africa', af: 'Van Suid-Afrika gesien' }, above: { en: 'Seen from above the North Pole (not to scale)', af: 'Van bo die Noordpool gesien (nie volgens skaal nie)' },
    spring: { en: 'Spring tide (big range)', af: 'Springgety (groot verskil)' }, neap: { en: 'Neap tide (small range)', af: 'Dooie gety (klein verskil)' }, between: { en: 'Between spring and neap', af: 'Tussen spring- en dooie gety' },
    range: { en: 'Tidal range', af: 'Gety-verskil' },
    names: [{ en: 'New Moon', af: 'Nuwemaan' }, { en: 'Waxing crescent', af: 'Groeiende sekel' }, { en: 'First quarter', af: 'Eerste kwartier' }, { en: 'Waxing gibbous', af: 'Groeiende bolvormig' },
      { en: 'Full Moon', af: 'Volmaan' }, { en: 'Waning gibbous', af: 'Afnemende bolvormig' }, { en: 'Last quarter', af: 'Laaste kwartier' }, { en: 'Waning crescent', af: 'Afnemende sekel' }],
    capPh: { en: 'The Sun always lights half the Moon. Earth\'s shadow does not cause the phases: they come from how much of the lit half faces us.', af: 'Die son verlig altyd die helfte van die maan. Die aarde se skaduwee veroorsaak nie die fases nie: hulle kom van hoeveel van die verligte helfte na ons wys.' },
    capTi: { en: 'The Moon pulls two bulges of ocean (one towards it, one opposite). When the Sun lines up with the Moon the bulges add up: spring tides.', af: 'Die maan trek twee bulte see (een na hom toe, een aan die teenoorgestelde kant). Wanneer die son en maan in lyn is, tel die bulte op: springgetye.' },
  };
  const P = 29.53;
  const S = { age: 7.4, mode: 'phase', playing: false };
  const phaseIdx = (a) => Math.floor(((a / P) * 8 + 0.5)) % 8;
  const litFrac = (a) => (1 - Math.cos(2 * Math.PI * a / P)) / 2;

  const ui = MLX.layout(root, { height: (w) => w < 640 ? 440 : Math.max(340, Math.min(420, Math.round(w * 0.4))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky');
  ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.phase, unit: '' });
  prim.el.querySelector('.mlx-primary-val').style.fontFamily = 'inherit';
  prim.el.querySelector('.mlx-primary-val').style.fontSize = '26px';
  const ro = MLX.readout(prim.el, [['a', T.age], ['b', T.lit], ['c', T.tide]]);
  const c1 = MLX.card(ui.side);
  MLX.seg(c1, { label: T.view, options: [['phase', T.vPh], ['tide', T.vTi]], value: S.mode, onChange: (v) => { S.mode = v; update(); } });
  const sA = MLX.slider(c1, { label: T.day, min: 0, max: 29.5, step: 0.5, value: S.age, fmt: (v) => num(v, 1), onInput: (v) => { S.age = v; update(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  const bP = MLX.button(bt, T.play, () => { S.playing = !S.playing; bP.textContent = L(S.playing ? T.pause : T.play); }, 'primary');
  const loop = MLX.loop(ui.cv.el, (dt) => { if (S.playing && !MLX.reducedMotion) { S.age = (S.age + dt * 2) % P; sA.set(Math.round(S.age * 2) / 2); update(); } });
  loop.start();
  MLX.onTheme(() => ui.cv.draw());

  let c, ctx;
  // Moon disc as seen from Earth. North view: waxing lit on the right; South (mirror): waxing lit on the left.
  function moonDisc(x, y, r, age, south) {
    const p = 2 * Math.PI * age / P, k = Math.cos(p);          // terminator half-width factor
    const waxing = age < P / 2;
    const litRight = south ? !waxing : waxing;
    ctx.fillStyle = c.light ? '#3a3f48' : '#262b33'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e8e2cf';
    ctx.beginPath();
    // lit limb half
    ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2, !litRight);
    // terminator: ellipse from bottom back to top
    // crescent (k > 0): the terminator bulges towards the lit limb; gibbous: towards the dark side
    ctx.ellipse(x, y, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, (k > 0) === litRight);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
  }

  function draw(cx, W, H) {
    ctx = cx; c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const wide = W >= 640, mw = wide ? W * 0.62 : W, mh = wide ? H : H * 0.6;
    if (S.mode === 'phase') drawOrbit(0, mw, mh); else drawTide(0, mw, mh);
    if (wide) { ctx.strokeStyle = c.line; ctx.beginPath(); ctx.moveTo(mw + 0.5, 14); ctx.lineTo(mw + 0.5, H - 14); ctx.stroke(); drawSAView(mw, W - mw, 0, H); }
    else drawSAView(0, W, mh, H - mh);
  }

  function sunArrows(x1, H) {
    ctx.strokeStyle = c.light ? '#a16207' : '#fde047'; ctx.lineWidth = 1.2;
    for (let i = 0; i < 5; i++) { const y = H * (0.18 + i * 0.16); ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x1 - 26, y); ctx.lineTo(x1 - 20, y - 4); ctx.moveTo(x1 - 26, y); ctx.lineTo(x1 - 20, y + 4); ctx.stroke(); }
    text(ctx, T.sun, x1 - 4, H * 0.1, { size: 12, align: 'right', color: c.text2 });
  }

  // Top view: sunlight from the right. Earth at the centre; the Moon's angle from the Earth→Sun line is 2π·age/P.
  function drawOrbit(x0, w, H) {
    const cx = x0 + w * 0.46, cy = H * 0.52, R = Math.min(w * 0.32, H * 0.36);
    sunArrows(x0 + w - 10, H);
    ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    // Earth with its day side towards the Sun
    const er = Math.max(16, R * 0.18);
    ctx.fillStyle = '#1d3557'; ctx.beginPath(); ctx.arc(cx, cy, er, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4c8fd6'; ctx.beginPath(); ctx.arc(cx, cy, er, -Math.PI / 2, Math.PI / 2); ctx.fill();
    text(ctx, T.earth, cx, cy + er + 16, { size: 12, align: 'center', color: c.text2 });
    // the eight positions, faint
    for (let i = 0; i < 8; i++) { const a = i / 8 * 2 * Math.PI, x = cx + Math.cos(a) * R, y = cy - Math.sin(a) * R; ctx.fillStyle = c.lineHard; ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill(); }
    // the Moon: right half (facing the Sun) always lit
    const a = 2 * Math.PI * S.age / P, mx = cx + Math.cos(a) * R, my = cy - Math.sin(a) * R, mr = Math.max(10, er * 0.55);
    ctx.fillStyle = c.light ? '#3a3f48' : '#262b33'; ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#e8e2cf'; ctx.beginPath(); ctx.arc(mx, my, mr, -Math.PI / 2, Math.PI / 2); ctx.fill();
    ctx.strokeStyle = c.lineHard; ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.stroke();
    text(ctx, T.moon, mx, my - mr - 8, { size: 12, align: 'center', color: c.text2 });
    // the half of the Moon that faces Earth
    ctx.strokeStyle = c.accent; ctx.lineWidth = 2;
    const toE = Math.atan2(cy - my, cx - mx);
    ctx.beginPath(); ctx.arc(mx, my, mr + 4, toE - Math.PI / 2, toE + Math.PI / 2); ctx.stroke();
    text(ctx, T.above, x0 + 12, H - 12, { size: 11, color: c.text3 });
  }

  // Tides: ocean outline r(θ) = r0 + m·cos 2(θ − θMoon) + s·cos 2(θ − θSun)
  function drawTide(x0, w, H) {
    const cx = x0 + w * 0.46, cy = H * 0.52, r0 = Math.min(w, H) * 0.2;
    sunArrows(x0 + w - 10, H);
    const thM = 2 * Math.PI * S.age / P, m = r0 * 0.16, s = m * 0.46;
    ctx.fillStyle = c.water.replace(/0\.1\d?\)/, '0.35)'); ctx.strokeStyle = c.light ? '#2563eb' : '#60a5fa'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= 120; i++) { const th = i / 120 * 2 * Math.PI, r = r0 + m * Math.cos(2 * (th - thM)) + s * Math.cos(2 * th); const x = cx + Math.cos(th) * r, y = cy - Math.sin(th) * r; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#4b7a46'; ctx.beginPath(); ctx.arc(cx, cy, r0 * 0.82, 0, Math.PI * 2); ctx.fill();
    text(ctx, T.earth, cx, cy + 4, { size: 12, align: 'center', color: '#fff' });
    const R = r0 * 2.1, mx = cx + Math.cos(thM) * R, my = cy - Math.sin(thM) * R;
    ctx.fillStyle = '#d6d0bd'; ctx.beginPath(); ctx.arc(mx, my, 10, 0, Math.PI * 2); ctx.fill();
    text(ctx, T.moon, mx, my - 16, { size: 12, align: 'center', color: c.text2 });
  }

  function drawSAView(x0, w, y0, H) {
    const cx = x0 + w / 2, cy = y0 + H * 0.48, r = Math.min(w, H) * 0.28;
    text(ctx, T.fromSA, cx, y0 + 26, { size: 12, align: 'center', color: c.text2 });
    moonDisc(cx, cy, r, S.age, true);
    text(ctx, L(T.names[phaseIdx(S.age)]), cx, cy + r + 24, { size: 14, weight: 600, align: 'center', color: c.ink });
  }

  function tideState() { const d = Math.abs(Math.cos(2 * Math.PI * S.age / P)); return d > 0.85 ? T.spring : d < 0.35 ? T.neap : T.between; }
  function update() {
    prim.set(L(T.names[phaseIdx(S.age)]));
    ro.set('a', num(S.age, 1)); ro.set('b', num(100 * litFrac(S.age), 0) + '%'); ro.set('c', L(tideState()));
    ui.setCaption(S.mode === 'phase' ? T.capPh : T.capTi);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + L(T.names[phaseIdx(S.age)]) + ', ' + num(100 * litFrac(S.age), 0) + '%.');
    ui.cv.draw();
  }
  update();
});
