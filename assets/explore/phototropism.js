/* Gr12 Plant responses — phototropism and auxin (the classic coleoptile experiments).
 * Auxin is made in the shoot tip and moves down. Light from one side makes auxin move to the SHADED side; cells
 * there elongate more, so the shoot bends towards the light (positive phototropism). Light from above, or darkness:
 * auxin is spread evenly and the shoot grows straight. Tip covered with foil: the tip cannot detect the direction,
 * no bend. Tip removed: no auxin, little growth and no bend.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, text } = MLX;
  const T = {
    aria: { en: 'An oat seedling shoot with auxin moving to the shaded side and the shoot bending towards the light', af: '\'n Hawersaailing-loot met ouksien wat na die skadukant beweeg en die loot wat na die lig buig' },
    bend: { en: 'Bend towards the light', af: 'Buiging na die lig' }, aux: { en: 'Auxin on the shaded side', af: 'Ouksien aan die skadukant' }, grow: { en: 'Growth', af: 'Groei' },
    light: { en: 'Light', af: 'Lig' }, left: { en: 'From the left', af: 'Van links' }, top: { en: 'From above', af: 'Van bo' }, right: { en: 'From the right', af: 'Van regs' }, dark: { en: 'Dark', af: 'Donker' },
    tip: { en: 'Shoot tip', af: 'Lootpunt' }, normal: { en: 'Normal', af: 'Normaal' }, foil: { en: 'Covered with foil', af: 'Met foelie bedek' }, cut: { en: 'Removed', af: 'Verwyder' },
    play: { en: 'Grow', af: 'Groei' }, reset: { en: 'New seedling', af: 'Nuwe saailing' }, hours: { en: 'h', af: 'h' },
    capSide: { en: 'Auxin moves to the shaded side; those cells elongate more, so the shoot bends towards the light.', af: 'Ouksien beweeg na die skadukant; daardie selle verleng meer, dus buig die loot na die lig.' },
    capEven: { en: 'Light from above (or none): auxin is spread evenly, so both sides grow equally and the shoot grows straight.', af: 'Lig van bo (of geen): ouksien is eweredig versprei, dus groei albei kante ewe veel en die loot groei reguit.' },
    capFoil: { en: 'With the tip covered, the shoot cannot detect where the light comes from: it grows straight. The tip is where light is detected.', af: 'Met die punt bedek kan die loot nie bespeur waar die lig vandaan kom nie: dit groei reguit. Die punt is waar lig bespeur word.' },
    capCut: { en: 'Without the tip there is no auxin: the shoot hardly grows and does not bend. The tip makes auxin.', af: 'Sonder die punt is daar geen ouksien nie: die loot groei skaars en buig nie. Die punt maak ouksien.' },
  };
  const S = { light: 'left', tip: 'normal', t: 0, playing: true };
  const TMAX = 12;
  function model() {
    const side = S.light === 'left' ? -1 : S.light === 'right' ? 1 : 0;
    const detects = S.tip === 'normal';
    const auxin = S.tip !== 'cut';
    const shaded = auxin ? (side && detects ? 0.72 : 0.5) : 0;      // fraction of auxin on the shaded side
    const growth = auxin ? 1 : 0.15;
    const bend = side && detects ? side * 38 * (S.t / TMAX) : 0;    // degrees; negative = towards the left (canvas y points down)
    return { side, shaded, growth, bend, len: 70 + 80 * growth * (S.t / TMAX) };
  }
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 380 : Math.max(340, Math.min(420, Math.round(w * 0.42))), ariaLabel: T.aria, draw });
  ui.wrap.classList.add('mlx-sticky'); ui.cv.el.classList.add('mlx-themed');
  const prim = MLX.primary(ui.side, { label: T.bend, unit: '°' });
  const ro = MLX.readout(prim.el, [['a', T.aux], ['g', T.grow]]);
  const c1 = MLX.card(ui.side);
  const regrow = () => { S.t = 0; S.playing = true; update(); };
  MLX.seg(c1, { label: T.light, options: [['left', T.left], ['top', T.top], ['right', T.right], ['dark', T.dark]], value: S.light, onChange: (v) => { S.light = v; regrow(); } });
  MLX.seg(c1, { label: T.tip, options: [['normal', T.normal], ['foil', T.foil], ['cut', T.cut]], value: S.tip, onChange: (v) => { S.tip = v; regrow(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.reset, regrow, 'primary');
  MLX.loop(ui.cv.el, (dt) => { if (S.playing) { S.t = Math.min(TMAX, S.t + (MLX.reducedMotion ? TMAX : dt * 1.5)); if (S.t >= TMAX) S.playing = false; update(); } }).start();
  MLX.onTheme(() => ui.cv.draw());

  function draw(ctx, W, H) {
    const c = MLX.colors(), m = model();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const cx = W / 2, base = H - 40, k = Math.min(1.6, H / 300);
    // light source and rays
    const lit = S.light !== 'dark', lx = S.light === 'left' ? 30 : S.light === 'right' ? W - 30 : cx, ly = S.light === 'top' ? 24 : H * 0.42;
    if (lit) {
      ctx.fillStyle = c.light ? '#eab308' : '#fde047'; ctx.beginPath(); ctx.arc(lx, ly, 12, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = c.light ? 'rgba(161,98,7,0.6)' : 'rgba(253,224,71,0.5)'; ctx.lineWidth = 1.2;
      for (let i = -2; i <= 2; i++) { ctx.beginPath(); if (S.light === 'top') { ctx.moveTo(lx + i * 30, ly + 18); ctx.lineTo(lx + i * 30, ly + 60); } else { const d = S.light === 'left' ? 1 : -1; ctx.moveTo(lx + d * 20, ly + i * 24); ctx.lineTo(lx + d * 90, ly + i * 24); } ctx.stroke(); }
    } else text(ctx, T.dark, 16, 24, { size: 12, color: c.text3 });
    // soil and pot
    ctx.fillStyle = c.light ? 'rgba(120,80,40,0.35)' : 'rgba(150,105,60,0.35)'; ctx.fillRect(cx - 60, base, 120, 26);
    // shoot: drawn as a curve of segments; each side's length differs by the auxin split, bending it
    const segs = 24, L0 = m.len * k, w0 = 12 * k;
    let x = cx, y = base, ang = -Math.PI / 2;
    const dAng = (m.bend * Math.PI / 180) / segs;
    const left = [], right = [];
    for (let i = 0; i <= segs; i++) {
      const nx = Math.cos(ang + Math.PI / 2), ny = Math.sin(ang + Math.PI / 2);
      left.push([x - nx * w0 / 2, y - ny * w0 / 2]); right.push([x + nx * w0 / 2, y + ny * w0 / 2]);
      if (i < segs) { ang += dAng; x += Math.cos(ang) * L0 / segs; y += Math.sin(ang) * L0 / segs; }
    }
    ctx.fillStyle = c.light ? 'rgba(74,160,70,0.45)' : 'rgba(123,191,106,0.4)'; ctx.strokeStyle = c.accent; ctx.lineWidth = 1.5;
    ctx.beginPath(); left.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i][0], right[i][1]); ctx.closePath(); ctx.fill(); ctx.stroke();
    // tip: normal (rounded), foil cap, or cut off
    if (S.tip !== 'cut') {
      ctx.fillStyle = S.tip === 'foil' ? (c.light ? '#9ca3af' : '#cbd5e1') : (c.light ? 'rgba(74,160,70,0.7)' : 'rgba(123,191,106,0.7)');
      ctx.beginPath(); ctx.arc(x, y, w0 * 0.75, 0, Math.PI * 2); ctx.fill();
    }
    // auxin dots: more on the shaded side (the side away from the light)
    if (m.shaded > 0) {
      ctx.fillStyle = c.warn;
      const nS = Math.round(14 * m.shaded), nL = Math.round(14 * (1 - m.shaded)), shadeIsLeft = m.side > 0;
      const put = (n, onLeft) => { for (let i = 0; i < n; i++) { const j = 2 + Math.floor((i / n) * (segs - 4)), a = onLeft ? left[j] : right[j], b = onLeft ? right[j] : left[j]; const px = a[0] + (b[0] - a[0]) * 0.25, py = a[1] + (b[1] - a[1]) * 0.25; ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fill(); } };
      if (m.side) { put(nS, shadeIsLeft); put(nL, !shadeIsLeft); } else { put(7, true); put(7, false); }
      text(ctx, { en: 'auxin', af: 'ouksien' }, 16, H - 14, { size: 12, color: c.warn });
    }
  }
  function update() {
    const m = model();
    prim.set(num(Math.abs(m.bend), 0));
    ro.set('a', m.shaded > 0 ? num(100 * m.shaded, 0) + '%' : '—');
    ro.set('g', num(S.t, 1) + ' ' + L(T.hours));
    ui.setCaption(S.tip === 'cut' ? T.capCut : S.tip === 'foil' && m.side ? T.capFoil : m.side ? T.capSide : T.capEven);
    ui.cv.el.setAttribute('aria-label', L(T.aria) + '. ' + num(Math.abs(m.bend), 0) + '°.');
    ui.cv.draw();
  }
  update();
});
