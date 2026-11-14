/* Gr9 Sexual reproduction in plants — a labelled half-flower (longitudinal section) and fertilisation, step by step.
 * Steps: 1 pollination (pollen lands on the stigma), 2 a pollen tube grows down the style, 3 the tube enters the
 * ovule through the micropyle, 4 a male gamete fuses with the egg cell (fertilisation), 5 the ovule becomes a seed and
 * the ovary a fruit.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, text } = MLX;
  const T = {
    aria: { en: 'A labelled half-flower showing its parts, and how pollination and fertilisation happen', af: '\'n Benoemde halwe blom wat sy dele wys, en hoe bestuiwing en bevrugting plaasvind' },
    view: { en: 'Show', af: 'Wys' }, parts: { en: 'Parts', af: 'Dele' }, fert: { en: 'Fertilisation', af: 'Bevrugting' },
    step: { en: 'Step', af: 'Stap' }, prev: { en: 'Back', af: 'Terug' }, next: { en: 'Next', af: 'Volgende' },
    male: { en: 'male part (stamen)', af: 'manlike deel (meeldraad)' }, female: { en: 'female part (carpel)', af: 'vroulike deel (vrugblaar)' },
    ns: { en: 'half-flower, cut lengthways', af: 'halwe blom, in die lengte gesny' },
    steps: [
      { en: 'Pollination: pollen from an anther lands on the sticky stigma (carried by insects, birds or wind).', af: 'Bestuiwing: stuifmeel van \'n helmknop land op die taai stempel (gedra deur insekte, voëls of wind).' },
      { en: 'The pollen grain grows a pollen tube down through the style towards the ovary.', af: 'Die stuifmeelkorrel groei \'n stuifmeelbuis deur die styl af na die vrugbeginsel.' },
      { en: 'The pollen tube enters an ovule through a tiny opening, the micropyle.', af: 'Die stuifmeelbuis gaan \'n saadknop binne deur \'n klein opening, die mikropiel.' },
      { en: 'Fertilisation: a male gamete from the tube fuses with the egg cell, forming a zygote.', af: 'Bevrugting: \'n manlike gameet uit die buis versmelt met die eiersel en vorm \'n sigoot.' },
      { en: 'The fertilised ovule develops into a seed, and the ovary becomes the fruit; petals and stamens wither.', af: 'Die bevrugte saadknop ontwikkel tot \'n saad, en die vrugbeginsel word die vrug; kroonblare en meeldrade verwelk.' },
    ],
  };
  const P = {
    petal: { en: 'Petal', af: 'Kroonblaar' }, sepal: { en: 'Sepal', af: 'Kelkblaar' }, anther: { en: 'Anther', af: 'Helmknop' }, filament: { en: 'Filament', af: 'Helmdraad' },
    stigma: { en: 'Stigma', af: 'Stempel' }, style: { en: 'Style', af: 'Styl' }, ovary: { en: 'Ovary', af: 'Vrugbeginsel' }, ovule: { en: 'Ovule', af: 'Saadknop' },
    recept: { en: 'Receptacle', af: 'Blombodem' }, nectary: { en: 'Nectary', af: 'Nektarklier' }, stalk: { en: 'Flower stalk', af: 'Blomsteel' },
  };
  const S = { mode: 'parts', step: 0, t: 0 };
  const ui = MLX.layout(root, { height: (w) => w < 640 ? 400 : Math.max(380, Math.min(460, Math.round(w * 0.46))), ariaLabel: T.aria, draw });
  ui.cv.el.classList.add('mlx-themed');
  const c1 = MLX.card(ui.side);
  MLX.seg(c1, { label: T.view, options: [['parts', T.parts], ['fert', T.fert]], value: S.mode, onChange: (v) => { S.mode = v; S.t = 0; update(); } });
  const c2 = MLX.card(ui.side, T.step);
  const stepTxt = MLX.h('p', { class: 'mlx-note' }); c2.appendChild(stepTxt);
  const bt = MLX.h('div', { class: 'mlx-btns' }); c2.appendChild(bt);
  MLX.button(bt, T.prev, () => { S.step = Math.max(0, S.step - 1); S.t = 0; update(); });
  MLX.button(bt, T.next, () => { S.step = Math.min(4, S.step + 1); S.t = 0; update(); }, 'primary');
  const loop = MLX.loop(ui.cv.el, (dt) => { if (S.mode === 'fert' && S.t < 1) { S.t = MLX.reducedMotion ? 1 : Math.min(1, S.t + dt * 0.6); ui.cv.draw(); } });
  loop.start();
  MLX.onTheme(() => ui.cv.draw());

  function draw(ctx, W, H) {
    const c = MLX.colors();
    ctx.fillStyle = c.stage; ctx.fillRect(0, 0, W, H);
    const narrow = W < 640, s = Math.min(H / 420, (narrow ? W * 0.62 : W * 0.5) / 360);
    const cx = narrow ? W * 0.36 : W * 0.4, base = H * 0.86;
    const X = (u) => cx + u * s, Y = (v) => base - v * s;
    const done = S.mode === 'fert' && S.step === 4;
    // fixed colours that mean something: stamen (male) amber, carpel (female) green
    const male = c.light ? '#b45309' : '#f59e0b', fem = c.light ? '#15803d' : '#4ade80', tube = c.ink;
    const petalCol = c.light ? 'rgba(219,39,119,0.18)' : 'rgba(244,114,182,0.22)', petalLine = c.light ? '#be185d' : '#f9a8d4';
    // stalk and receptacle
    ctx.strokeStyle = c.light ? '#3f7a3a' : '#7bbf6a'; ctx.lineWidth = 6 * s; ctx.beginPath(); ctx.moveTo(X(0), Y(-70)); ctx.lineTo(X(0), Y(10)); ctx.stroke();
    ctx.fillStyle = c.light ? 'rgba(63,122,58,0.35)' : 'rgba(123,191,106,0.35)'; ctx.beginPath(); ctx.ellipse(X(0), Y(18), 46 * s, 16 * s, 0, 0, Math.PI * 2); ctx.fill();
    // sepals (green, below the petals)
    [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(X(d * 30), Y(22)); ctx.quadraticCurveTo(X(d * 92), Y(30), X(d * 104), Y(64)); ctx.quadraticCurveTo(X(d * 70), Y(40), X(d * 30), Y(30)); ctx.closePath(); ctx.fillStyle = c.light ? 'rgba(63,122,58,0.45)' : 'rgba(123,191,106,0.45)'; ctx.fill(); });
    // petals (cut in half, so we see one on each side)
    if (!done) [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(X(d * 34), Y(28)); ctx.bezierCurveTo(X(d * 120), Y(60), X(d * 150), Y(190), X(d * 96), Y(240)); ctx.bezierCurveTo(X(d * 80), Y(170), X(d * 60), Y(80), X(d * 34), Y(40)); ctx.closePath(); ctx.fillStyle = petalCol; ctx.fill(); ctx.strokeStyle = petalLine; ctx.lineWidth = 1.4; ctx.stroke(); });
    // nectaries at the base
    [-1, 1].forEach(d => { ctx.fillStyle = c.light ? '#ca8a04' : '#fde047'; ctx.beginPath(); ctx.ellipse(X(d * 30), Y(32), 6 * s, 4 * s, 0, 0, Math.PI * 2); ctx.fill(); });
    // stamens
    if (!done) [-1, 1].forEach(d => {
      ctx.strokeStyle = male; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(d * 26), Y(34)); ctx.quadraticCurveTo(X(d * 44), Y(110), X(d * 54), Y(170)); ctx.stroke();
      ctx.fillStyle = male; ctx.beginPath(); ctx.ellipse(X(d * 56), Y(180), 7 * s, 14 * s, d * 0.2, 0, Math.PI * 2); ctx.fill();
    });
    // carpel: ovary with ovules, style, stigma
    const ovH = done ? 95 : 70, ovW = done ? 46 : 32;
    ctx.beginPath(); ctx.ellipse(X(0), Y(30 + ovH / 2), ovW * s, ovH / 2 * s, 0, 0, Math.PI * 2);
    ctx.fillStyle = c.light ? 'rgba(22,163,74,0.18)' : 'rgba(74,207,107,0.2)'; ctx.fill(); ctx.strokeStyle = fem; ctx.lineWidth = 1.6; ctx.stroke();
    const ovules = [[0, 48], [-12, 66], [12, 66], [0, 84]];
    ovules.forEach(([u, v], i) => { ctx.beginPath(); ctx.ellipse(X(u), Y(v + (done ? 8 : 0)), (done ? 9 : 6) * s, (done ? 7 : 5) * s, 0, 0, Math.PI * 2); ctx.fillStyle = done ? (c.light ? '#92400e' : '#d6a35c') : c.stage; ctx.fill(); ctx.strokeStyle = c.ink; ctx.lineWidth = 1.2; ctx.stroke(); });
    if (!done) {
      ctx.strokeStyle = fem; ctx.lineWidth = 7 * s; ctx.beginPath(); ctx.moveTo(X(0), Y(30 + ovH)); ctx.lineTo(X(0), Y(200)); ctx.stroke();
      ctx.fillStyle = fem; ctx.beginPath(); ctx.ellipse(X(0), Y(206), 14 * s, 7 * s, 0, 0, Math.PI * 2); ctx.fill();
    }
    // fertilisation sequence
    if (S.mode === 'fert' && !done) {
      const k = S.step + S.t;          // continuous progress 0..4
      ctx.fillStyle = tube;
      const pg = [X(-3), Y(212)];
      if (k > 0) { ctx.beginPath(); ctx.arc(pg[0], pg[1], 4 * s, 0, Math.PI * 2); ctx.fill(); }
      if (k < 1) { const f = k; ctx.beginPath(); ctx.arc(X(-56 + 53 * f), Y(180 + 32 * f), 3.5 * s, 0, Math.PI * 2); ctx.fill(); }
      // pollen tube down the style, then into the ovule at the top (micropyle)
      if (k > 1) {
        const f = Math.min(1, k - 1), yEnd = 200 - f * (200 - (30 + ovH));
        ctx.strokeStyle = tube; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.moveTo(pg[0], pg[1]); ctx.lineTo(X(-1), Y(yEnd)); ctx.stroke();
        if (k > 2) { const g = Math.min(1, k - 2); ctx.beginPath(); ctx.moveTo(X(-1), Y(30 + ovH)); ctx.lineTo(X(-1 + g), Y(30 + ovH - g * (30 + ovH - 89))); ctx.stroke(); }
        if (k > 3) { ctx.fillStyle = c.warn; ctx.beginPath(); ctx.arc(X(0), Y(84), 3 * s, 0, Math.PI * 2); ctx.fill(); }
      }
    }
    // leader-line labels
    const lx = narrow ? W - 8 : cx + 200 * s;
    const lab = done ? [['ovary', 0, 30 + ovH / 2, { en: 'Fruit (from the ovary)', af: 'Vrug (uit die vrugbeginsel)' }], ['ovule', 0, 92, { en: 'Seeds (from the ovules)', af: 'Sade (uit die saadknoppe)' }]] :
      [['stigma', 8, 206], ['anther', 60, 180], ['style', 3, 150], ['filament', 46, 120], ['petal', 120, 150], ['ovary', ovW, 30 + ovH / 2], ['ovule', 12, 66], ['sepal', 90, 50], ['nectary', 34, 32], ['recept', 40, 16], ['stalk', 2, -40]];
    lab.sort((a, b) => b[2] - a[2]);
    lab.forEach(([k, u, v, name], i) => {
      const ly = 26 + i * ((H - 40) / Math.max(1, lab.length - 1));
      ctx.strokeStyle = c.lineHard; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(u), Y(v)); ctx.lineTo(lx - (narrow ? 70 : 8), ly); ctx.stroke();
      text(ctx, L(name || P[k]), narrow ? lx : lx, ly + 4, { size: 12, align: narrow ? 'right' : 'left', color: c.text });
    });
    if (S.mode === 'parts') {
      text(ctx, T.male, 12, H - 46, { size: 12, color: male });
      text(ctx, T.female, 12, H - 28, { size: 12, color: fem });
    }
    text(ctx, T.ns, 12, H - 10, { size: 11, color: c.text3 });
  }
  function update() {
    stepTxt.textContent = S.mode === 'fert' ? (S.step + 1) + '. ' + L(T.steps[S.step]) : L({ en: 'Switch to Fertilisation and use Next to follow the steps.', af: 'Skakel oor na Bevrugting en gebruik Volgende om die stappe te volg.' });
    ui.setCaption(S.mode === 'fert' ? T.steps[S.step] : { en: 'The stamen (anther and filament) makes pollen; the carpel (stigma, style and ovary) contains the ovules with the egg cells.', af: 'Die meeldraad (helmknop en helmdraad) maak stuifmeel; die vrugblaar (stempel, styl en vrugbeginsel) bevat die saadknoppe met die eierselle.' });
    ui.cv.draw();
  }
  update();
});
