/* Gr12 Reproduction in Vertebrates — many cheap eggs or a few cared-for young?
 * Every parent has the same energy for one breeding season. Each offspring
 * costs more energy the more it develops inside the parent and the more care
 * it gets — but it is also far more likely to survive. External fertilisation
 * wastes many gametes. Illustrative numbers; the trade-off is the point.
 */
MLX.ready(function () {
  const root = document.getElementById('mlx-root');
  if (!root) return;
  const { L, num, big, text } = MLX;
  const BUDGET = 1000;
  const DEV = { water: { cost: 0.25, surv: 0.001 }, amnio: { cost: 25, surv: 0.05 }, vivi: { cost: 150, surv: 0.2 } };
  const CARE = { none: { cost: 1, surv: 1 }, some: { cost: 2, surv: 4 }, lots: { cost: 5, surv: 10 } };
  const T = {
    aria: { en: 'Offspring produced and offspring that survive to adulthood', af: 'Nakomelinge geproduseer en nakomelinge wat volwassenheid bereik' },
    strat: { en: 'Reproductive strategy', af: 'Voortplantingstrategie' },
    fert: { en: 'Fertilisation', af: 'Bevrugting' }, ext: { en: 'External (in water)', af: 'Ekstern (in water)' }, int: { en: 'Internal', af: 'Intern' },
    dev: { en: 'The young develop', af: 'Die kleintjies ontwikkel' }, water: { en: 'in eggs in water', af: 'in eiers in water' }, amnio: { en: 'in shelled eggs on land', af: 'in eiers met doppe op land' }, vivi: { en: 'inside the mother', af: 'binne die moeder' },
    care: { en: 'Parental care', af: 'Ouersorg' }, none: { en: 'None', af: 'Geen' }, some: { en: 'Some', af: 'Bietjie' }, lots: { en: 'A lot', af: 'Baie' },
    run: { en: 'Run a breeding season', af: 'Doen \'n broeiseisoen' },
    res: { en: 'One season', af: 'Een seisoen' }, made: { en: 'Eggs / young produced', af: 'Eiers / kleintjies geproduseer' },
    fertd: { en: 'Fertilised', af: 'Bevrug' }, chance: { en: 'Chance each one survives', af: 'Kans dat elkeen oorleef' },
    expect: { en: 'Expected to reach adulthood', af: 'Verwag om volwasse te word' }, got: { en: 'Survived this season', af: 'Hierdie seisoen oorleef' },
    like: { en: 'Like', af: 'Soos' }, produced: { en: 'produced', af: 'geproduseer' }, survive: { en: 'survive to adulthood', af: 'word volwasse' },
    each: { en: 'each dot =', af: 'elke kolletjie =' },
  };
  const LIKE = (f, d, c) => f === 'ext' ? (c === 'none' ? { en: 'most fish and frogs', af: 'meeste visse en paddas' } : { en: 'mouth-brooding fish, some frogs', af: 'bekbroeiende visse, sommige paddas' })
    : d === 'amnio' ? (c === 'none' ? { en: 'most reptiles (e.g. turtles)', af: 'meeste reptiele (bv. skilpaaie)' } : { en: 'birds, crocodiles', af: 'voëls, krokodille' })
    : d === 'vivi' ? (c === 'lots' ? { en: 'mammals', af: 'soogdiere' } : { en: 'some sharks and snakes', af: 'sommige haaie en slange' })
    : { en: 'sharks (internal fertilisation, eggs in water)', af: 'haaie (interne bevrugting, eiers in water)' };

  let fert = 'ext', dev = 'water', care = 'none', season = null, prog = 0;
  const ui = MLX.layout(root, { height: (w) => Math.max(260, Math.min(330, Math.round(w * 0.4))), ariaLabel: T.aria, draw });
  const c1 = MLX.card(ui.side, T.strat);
  const sF = MLX.seg(c1, { label: T.fert, options: [['ext', T.ext], ['int', T.int]], value: fert, onChange: (v) => { fert = v; if (v === 'ext') { dev = 'water'; sD.set('water'); } changed(); } });
  const sD = MLX.seg(c1, { label: T.dev, options: [['water', T.water], ['amnio', T.amnio], ['vivi', T.vivi]], value: dev, onChange: (v) => { dev = v; if (v !== 'water') { fert = 'int'; sF.set('int'); } changed(); } });
  MLX.seg(c1, { label: T.care, options: [['none', T.none], ['some', T.some], ['lots', T.lots]], value: care, onChange: (v) => { care = v; changed(); } });
  const bt = MLX.h('div', { class: 'mlx-btns' }); c1.appendChild(bt);
  MLX.button(bt, T.run, () => runSeason(), 'primary');
  const c2 = MLX.card(ui.side, T.res);
  const ro = MLX.readout(c2, [['made', T.made], ['fertd', T.fertd], ['chance', T.chance], ['expect', T.expect], ['got', T.got]]);

  function model() {
    const cost = DEV[dev].cost * CARE[care].cost;
    const made = Math.max(1, Math.floor(BUDGET / cost));
    const fertRate = fert === 'ext' ? 0.5 : 0.95;
    const fertd = Math.max(1, Math.round(made * fertRate));
    const surv = Math.min(0.9, DEV[dev].surv * CARE[care].surv);
    return { made, fertd, surv, expect: fertd * surv };
  }
  function runSeason() {
    const m = model();
    let n = 0;
    if (m.fertd > 2000) { const mean = m.fertd * m.surv, sd = Math.sqrt(mean * (1 - m.surv)); n = Math.max(0, Math.round(mean + sd * (Math.random() + Math.random() + Math.random() - 1.5) * 1.4)); }
    else for (let i = 0; i < m.fertd; i++) if (Math.random() < m.surv) n++;
    season = n; prog = 0; show();
  }
  function changed() { season = null; prog = 1; show(); }
  function show() {
    const m = model();
    ro.set('made', big(m.made)); ro.set('fertd', big(m.fertd));
    ro.set('chance', m.surv < 0.01 ? num(m.surv * 100, 1) + '%' : Math.round(m.surv * 100) + '%');
    ro.set('expect', num(m.expect, m.expect < 10 ? 1 : 0));
    ro.set('got', season == null ? '—' : String(season), season != null ? '#86efac' : '');
    ui.setCaption({ en: `${L(T.like)} ${L(LIKE(fert, dev, care))}: ${big(m.made)} produced, about ${num(m.expect, m.expect < 10 ? 1 : 0)} reach adulthood. More care means fewer, costlier young — but far more of them survive.`, af: `${L(T.like)} ${L(LIKE(fert, dev, care))}: ${big(m.made)} geproduseer, omtrent ${num(m.expect, m.expect < 10 ? 1 : 0)} word volwasse. Meer sorg beteken minder, duurder kleintjies — maar baie meer van hulle oorleef.` });
    ui.cv.draw();
  }

  function draw(ctx, W, H) {
    const m = model();
    ctx.fillStyle = '#060a14'; ctx.fillRect(0, 0, W, H);
    const half = W * 0.58;
    // left: everything produced, as a dot grid
    const per = Math.max(1, Math.ceil(m.made / 400));
    const n = Math.ceil(m.made / per), cols = Math.ceil(Math.sqrt(n * 1.6)), sz = Math.min(18, (half - 40) / cols, (H - 80) / Math.ceil(n / cols));
    text(ctx, big(m.made) + ' ' + L(T.produced), 16, 24, { size: 13, weight: 700, color: '#e2e8f0' });
    if (per > 1) text(ctx, L(T.each) + ' ' + big(per), 16, 42, { size: 11, mono: true, color: 'rgba(226,232,240,0.55)' });
    const dead = season == null ? 0 : Math.min(1, prog);
    for (let i = 0; i < n; i++) {
      const x = 20 + (i % cols) * sz + sz / 2, y = 56 + Math.floor(i / cols) * sz + sz / 2;
      const r = Math.max(1.5, sz * 0.32);
      const lost = season != null && i >= Math.ceil(season / per) && (i / n) < dead * 1.05;
      ctx.fillStyle = lost ? 'rgba(148,163,184,0.18)' : dev === 'water' ? '#93c5fd' : dev === 'amnio' ? '#fde68a' : '#f9a8d4';
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    // right: expected survivors, drawn as figures
    const sx = half + 20;
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.moveTo(half, 14); ctx.lineTo(half, H - 14); ctx.stroke();
    const showN = season == null ? Math.round(m.expect) : season;
    text(ctx, (season == null ? '≈ ' + num(m.expect, m.expect < 10 ? 1 : 0) : String(season)) + ' ' + L(T.survive), sx, 24, { size: 13, weight: 700, color: '#86efac' });
    const fig = Math.min(10, showN);
    for (let i = 0; i < fig; i++) {
      const x = sx + 20 + (i % 5) * 42, y = 80 + Math.floor(i / 5) * 70;
      ctx.fillStyle = '#86efac';
      if (dev === 'water') {            // young fish
        ctx.beginPath(); ctx.ellipse(x, y, 16, 8, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x - 26, y - 8); ctx.lineTo(x - 26, y + 8); ctx.closePath(); ctx.fill();
      } else if (dev === 'amnio') {     // hatchling
        ctx.beginPath(); ctx.ellipse(x - 4, y + 4, 13, 10, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 9, y - 8, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(x + 15, y - 9); ctx.lineTo(x + 22, y - 7); ctx.lineTo(x + 15, y - 5); ctx.fill(); ctx.fillStyle = '#86efac';
      } else {                          // young mammal
        ctx.beginPath(); ctx.ellipse(x - 4, y + 4, 15, 9, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 11, y - 4, 7, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + 9, y - 12, 3, 0, Math.PI * 2); ctx.arc(x + 15, y - 11, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillRect(x - 14, y + 9, 3, 7); ctx.fillRect(x + 2, y + 9, 3, 7);
      }
      ctx.fillStyle = '#060a14'; ctx.beginPath(); ctx.arc(x + (dev === 'water' ? 9 : 12), y + (dev === 'water' ? -2 : dev === 'amnio' ? -9 : -5), 1.8, 0, Math.PI * 2); ctx.fill();
    }
    if (showN > 10) text(ctx, '+ ' + (showN - 10), sx + 20, 230, { size: 12, mono: true, color: '#86efac' });
    if (showN === 0) text(ctx, '0', sx + 20, 90, { size: 28, weight: 800, color: 'rgba(226,232,240,0.4)' });
  }

  changed();
  MLX.loop(ui.stage, (dt) => { if (season != null && prog < 1) { prog = Math.min(1, prog + dt / 1.8); ui.cv.draw(); } }).start();
});
