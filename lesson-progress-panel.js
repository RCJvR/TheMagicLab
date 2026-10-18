// Science Sage and Tech Tower home pages — the learner's own quiz results (from lesson-results.js).
// Each lesson link gets its recent score, flagged when under 70%, and each
// grade gets a "My progress" card: lessons finished, questions answered,
// accuracy, accuracy per strand and the lessons to practise again.
// On a wide screen the card is a column beside the lessons that stays in view
// while scrolling; on narrower screens it sits above them, folded to its
// three numbers until "Show more" is tapped.
// Nothing shows until the learner has answered a quiz in that grade.
(function () {
  if (!window.MLResults) return;
  const TOOL = (location.pathname.match(/\/(science-sage|tech-tower)\//) || [])[1];
  if (!TOOL) return;
  MLResults.use(TOOL);
  // Each grade's block of lessons on the home page.
  const SECTIONS = TOOL === 'tech-tower' ? '#gradeSection8, #gradeSection9' : '.grade-section';
  const PREFIX = TOOL === 'tech-tower' ? 'tt' : 'ss';   // lesson ids in assignments

  const TXT = {
    en: { title: 'My progress', local: 'Saved on this device only. Sign in to keep it on any device and share it with your teacher.', synced: 'Saved to your account.',
          finished: 'lessons finished', answered: 'questions answered', accuracy: 'accuracy', byStrand: 'By strand', weak: 'Practise again: under 70% recently',
          noWeak: 'Nothing under 70%. Well done.', more: 'Show more', less: 'Show less', notYet: 'not practised', badge: (p, n) => `${p}% of your last ${n} answers right`, weakTip: 'Under 70% recently: practise again',
          strands: { life: 'Life & Living', matter: 'Matter & Materials', energy: 'Energy & Change', earth: 'Planet Earth & Beyond', physics: 'Physics', chemistry: 'Chemistry', lifesci: 'Life Sciences',
                     structures: 'Structures', mechanical: 'Mechanical Systems', electrical: 'Electrical Systems', processing: 'Processing' } },
    af: { title: 'My vordering', local: 'Slegs op hierdie toestel gestoor. Meld aan om dit op enige toestel te hou en met jou onderwyser te deel.', synced: 'In jou rekening gestoor.',
          finished: 'lesse voltooi', answered: 'vrae beantwoord', accuracy: 'akkuraatheid', byStrand: 'Volgens strand', weak: 'Oefen weer: onlangs onder 70%',
          noWeak: 'Niks onder 70% nie. Mooi so.', more: 'Wys meer', less: 'Wys minder', notYet: 'nog nie geoefen nie', badge: (p, n) => `${p}% van jou laaste ${n} antwoorde reg`, weakTip: 'Onlangs onder 70%: oefen weer',
          strands: { life: 'Lewe en Lewende Dinge', matter: 'Materie en Materiale', energy: 'Energie en Verandering', earth: 'Planeet Aarde en die Ruimte', physics: 'Fisika', chemistry: 'Chemie', lifesci: 'Lewenswetenskappe',
                     structures: 'Strukture', mechanical: 'Meganiese Stelsels', electrical: 'Elektriese Stelsels', processing: 'Verwerking' } }
  };
  const L = () => TXT[document.documentElement.lang === 'af' ? 'af' : 'en'];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tone = p => p == null ? '' : p >= MLResults.MASTERY ? 'good' : p >= 50 ? 'warn' : 'crit';

  function lessonOf(a) {
    const h = a.dataset.enHref || a.getAttribute('href') || '';
    const m = h.match(/^gr(\d+)\/([^/]+)\/([^/]+?)(?:\.af)?\.html$/);
    return m ? { g: +m[1], strand: m[2], key: m[2] + '/' + m[3] } : null;
  }
  function nameOf(a) {
    const c = a.cloneNode(true);
    c.querySelectorAll('.sr-badge, .ml-due, .topic-visited').forEach(x => x.remove());
    return c.textContent.trim();
  }
  const strandName = (s, g) => L().strands[s === 'life' && g >= 10 ? 'lifesci' : s] || s;

  function badges() {
    const t = L();
    document.querySelectorAll('a.strand-topic').forEach(a => {
      a.querySelectorAll('.sr-badge, .ml-due').forEach(x => x.remove());
      const l = lessonOf(a); if (!l) return;
      const assigned = window.MLAssigned && MLAssigned.get(PREFIX + ':' + l.g + ':' + l.key);
      if (assigned) {
        // Done once the quiz is finished after the assignment was set.
        const fin = (MLResults.all(TOOL, l.g)[l.key] || {}).d;
        a.insertAdjacentHTML('beforeend', MLAssigned.badge(PREFIX + ':' + l.g + ':' + l.key, document.documentElement.lang === 'af' ? 'af' : 'en', !!fin && fin >= assigned.created));
      }
      const s = MLResults.lesson(TOOL, l.g, l.key); if (!s) return;
      const weak = MLResults.isWeak(TOOL, l.g, l.key);
      const b = document.createElement('span');
      b.className = 'sr-badge sr-' + (weak ? 'crit' : tone(s.pct));
      b.textContent = s.pct + '%';
      b.title = (weak ? t.weakTip + ' · ' : '') + t.badge(s.pct, s.n);
      a.appendChild(b);
    });
  }

  let open = false;   // narrow screens: the folded card's state, shared by every grade
  function panels() {
    const t = L(), signedIn = !!(window.MagicLabAuth && MagicLabAuth.isLoggedIn());
    document.querySelectorAll(SECTIONS).forEach(outer => {
      // The card and the lessons share a grid inside the section, so the page's
      // own show/hide of a section is left alone.
      let sec = outer.querySelector(':scope > .sr-grid');
      if (!sec) { sec = document.createElement('div'); sec.className = 'sr-grid'; sec.append(...outer.childNodes); outer.appendChild(sec); }
      sec.querySelector('.sr-prog')?.remove();
      sec.classList.remove('sr-has-prog');
      const seen = new Set(), lessons = [];
      sec.querySelectorAll('a.strand-topic').forEach(a => {
        const l = lessonOf(a); if (!l || seen.has(l.key)) return;
        seen.add(l.key);
        lessons.push({ ...l, a, s: MLResults.lesson(TOOL, l.g, l.key) });
      });
      const practised = lessons.filter(x => x.s);
      if (!practised.length) return;
      const all = MLResults.all(TOOL, lessons[0].g);
      let c = 0, n = 0, answered = 0;
      const strands = {};
      practised.forEach(x => {
        const rec = all[x.key], r = rec.r;
        const rc = r.reduce((p, q) => p + q, 0);
        c += rc; n += r.length; answered += Object.keys(rec.q).length;
        const st = strands[x.strand] = strands[x.strand] || { c: 0, n: 0 };
        st.c += rc; st.n += r.length;
      });
      const order = [...new Set(lessons.map(x => x.strand))];
      const finished = practised.filter(x => x.s.done).length;
      const acc = Math.round(c / n * 100);
      const weak = practised.filter(x => MLResults.isWeak(TOOL, x.g, x.key)).sort((p, q) => p.s.pct - q.s.pct);
      const el = document.createElement('aside');
      el.className = 'sr-prog' + (open ? ' sr-open' : '');
      el.setAttribute('aria-label', t.title);
      el.innerHTML = `
        <div class="sr-head"><h3 class="sr-title">${t.title}</h3><span class="sr-save${signedIn ? ' on' : ''}">${signedIn ? t.synced : t.local}</span></div>
        <div class="sr-stats">
          <div class="sr-stat"><span class="sr-v">${finished}<small>/${lessons.length}</small></span><span class="sr-l">${t.finished}</span></div>
          <div class="sr-stat"><span class="sr-v">${answered}</span><span class="sr-l">${t.answered}</span></div>
          <div class="sr-stat"><span class="sr-v sr-${tone(acc)}">${acc}%</span><span class="sr-l">${t.accuracy}</span></div>
        </div>
        <button type="button" class="sr-toggle" aria-expanded="${open}">${open ? t.less : t.more}</button>
        <div class="sr-cols">
          <div>
            <div class="sr-label">${t.byStrand}</div>
            ${order.map(s => { const st = strands[s]; const p = st ? Math.round(st.c / st.n * 100) : null; return `
              <div class="sr-strand"><span class="sr-strand-name">${esc(strandName(s, lessons[0].g))}</span>
                <span class="sr-bar"><span class="sr-fill sr-${tone(p)}" style="width:${p ?? 0}%"></span></span>
                <span class="sr-strand-p">${p == null ? t.notYet : p + '%'}</span></div>`; }).join('')}
          </div>
          <div>
            <div class="sr-label">${t.weak}</div>
            ${weak.length ? `<div class="sr-weak">${weak.map(x => `<a class="sr-weak-link" href="${esc(x.a.getAttribute('href'))}">${esc(nameOf(x.a))}<span>${x.s.pct}%</span></a>`).join('')}</div>` : `<p class="sr-note">${t.noWeak}</p>`}
          </div>
        </div>`;
      const anchor = sec.querySelector('.section-row');
      anchor.parentNode.insertBefore(el, anchor.nextSibling);
      sec.classList.add('sr-has-prog');
      el.querySelector('.sr-toggle').addEventListener('click', () => {
        open = !open;
        document.querySelectorAll('.sr-prog').forEach(p => {
          p.classList.toggle('sr-open', open);
          const b = p.querySelector('.sr-toggle');
          b.setAttribute('aria-expanded', open);
          b.textContent = open ? t.less : t.more;
        });
      });
    });
  }

  function addStyle() {
    const st = document.createElement('style');
    st.textContent = `
      .sr-badge { margin-left: auto; flex-shrink: 0; padding: 1px 7px; border-radius: 99px; border: 1px solid currentColor; font: 600 10.5px var(--font-mono, monospace); }
      .sr-badge.sr-good { color: var(--good, #4acf7f); }
      .sr-badge.sr-warn { color: var(--warn, #f5b23d); }
      .sr-badge.sr-crit { color: var(--crit, #ef5b5b); }
      .strand-topic .sr-badge + .topic-visited, .strand-topic .topic-visited + .sr-badge { margin-left: 6px; }
      .sr-prog { margin: 0 var(--gutter, 52px) 28px; padding: 18px 20px; border-radius: var(--radius-md, 16px); border: 1px solid var(--line, rgba(255,255,255,.1)); background: rgba(255,255,255,0.03); }
      .sr-head { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 6px 16px; }
      .sr-title { margin: 0; font: 800 17px var(--font-display, sans-serif); letter-spacing: -0.02em; color: var(--paper, #fff); }
      .sr-save { font-size: 12.5px; color: var(--text-3, #8b95a5); }
      .sr-save.on { color: var(--good, #4acf7f); }
      .sr-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 14px 0 16px; border: 1px solid var(--line-soft, rgba(255,255,255,.07)); border-radius: 12px; overflow: hidden; }
      .sr-stat { display: flex; flex-direction: column; gap: 2px; padding: 10px 14px; }
      .sr-stat + .sr-stat { border-left: 1px solid var(--line-soft, rgba(255,255,255,.07)); }
      .sr-v { font: 800 24px var(--font-display, sans-serif); letter-spacing: -0.02em; color: var(--paper, #fff); font-variant-numeric: tabular-nums; }
      .sr-v small { margin-left: 2px; font-size: 14px; font-weight: 600; color: var(--text-3, #8b95a5); }
      .sr-v.sr-good { color: var(--good, #4acf7f); } .sr-v.sr-warn { color: var(--warn, #f5b23d); } .sr-v.sr-crit { color: var(--crit, #ef5b5b); }
      .sr-l, .sr-label { font: 600 10.5px var(--font-mono, monospace); text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-3, #8b95a5); }
      .sr-label { display: block; margin-bottom: 8px; }
      .sr-cols { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px 28px; }
      .sr-strand { display: grid; grid-template-columns: minmax(0, 150px) minmax(0, 1fr) auto; align-items: center; gap: 10px; margin-bottom: 8px; font-size: 13px; }
      .sr-strand-name { color: var(--text-2, #c9d1dc); }
      .sr-bar { height: 6px; border-radius: 99px; background: rgba(255,255,255,0.08); overflow: hidden; }
      .sr-fill { display: block; height: 100%; border-radius: 99px; background: var(--text-3, #8b95a5); }
      .sr-fill.sr-good { background: var(--good, #4acf7f); } .sr-fill.sr-warn { background: var(--warn, #f5b23d); } .sr-fill.sr-crit { background: var(--crit, #ef5b5b); }
      .sr-strand-p { min-width: 40px; text-align: right; font: 600 12px var(--font-mono, monospace); color: var(--text-2, #c9d1dc); }
      .sr-weak { display: flex; flex-direction: column; gap: 6px; }
      .sr-weak-link { display: flex; justify-content: space-between; gap: 12px; padding: 7px 12px; border-radius: 8px; border: 1px solid rgba(239,91,91,0.30); background: rgba(239,91,91,0.07); color: var(--text-2, #c9d1dc); font-size: 13px; text-decoration: none; }
      .sr-weak-link:hover { background: rgba(239,91,91,0.13); color: var(--paper, #fff); }
      .sr-weak-link span { font: 600 12px var(--font-mono, monospace); color: var(--crit, #ef5b5b); }
      .sr-weak-link:focus-visible { outline: 2px solid var(--accent, #4acf7f); outline-offset: 2px; }
      .sr-note { margin: 0; font-size: 13px; color: var(--text-3, #8b95a5); }
      .sr-toggle { display: none; padding: 0; border: 0; background: none; color: var(--accent, #4acf7f); font: 600 13px var(--font-body, sans-serif); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
      .sr-toggle:focus-visible { outline: 2px solid var(--accent, #4acf7f); outline-offset: 2px; }
      /* Wide screens: a column beside the lessons that stays in view. */
      @media (min-width: 1100px) {
        /* Same width and right edge as the rest of the page. */
        .sr-grid.sr-has-prog { display: grid; grid-template-columns: minmax(0, 1fr) 300px; column-gap: var(--space-5, 24px); align-items: start; max-width: var(--measure, 1360px); margin-inline: auto; }
        .sr-grid.sr-has-prog > * { grid-column: 1; }
        .sr-grid.sr-has-prog > .section-row { grid-column: 1 / -1; }
        .sr-grid.sr-has-prog > .strands { padding-right: 0; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
        .sr-grid.sr-has-prog > .sr-prog { grid-column: 2; grid-row: 2 / span 20; position: sticky; top: 84px; margin: 0 var(--gutter, 52px) 28px 0; max-height: calc(100vh - 100px); overflow-y: auto; }
        .sr-prog .sr-head { flex-direction: column; align-items: flex-start; gap: 4px; }
        .sr-prog .sr-stats { grid-template-columns: minmax(0, 1fr); }
        .sr-prog .sr-stat { flex-direction: row; align-items: baseline; justify-content: space-between; gap: 10px; padding: 8px 12px; }
        .sr-prog .sr-stat + .sr-stat { border-left: none; border-top: 1px solid var(--line-soft, rgba(255,255,255,.07)); }
        .sr-prog .sr-v { order: 2; font-size: 20px; }
        .sr-prog .sr-cols { grid-template-columns: minmax(0, 1fr); gap: 16px; }
        .sr-prog .sr-strand { grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: "name p" "bar bar"; gap: 4px 10px; }
        .sr-prog .sr-strand-name { grid-area: name; }
        .sr-prog .sr-strand-p { grid-area: p; }
        .sr-prog .sr-bar { grid-area: bar; }
      }
      /* Narrower screens: above the lessons, folded to the three numbers. */
      @media (max-width: 1099px) {
        .sr-toggle { display: inline-block; }
        .sr-prog:not(.sr-open) .sr-cols { display: none; }
        .sr-prog .sr-cols { margin-top: 14px; }
      }
      @media (max-width: 700px) {
        .sr-prog { margin-left: 16px; margin-right: 16px; padding: 14px; }
        .sr-cols { grid-template-columns: minmax(0, 1fr); }
        .sr-stat { padding: 8px 10px; }
        .sr-v { font-size: 20px; }
        .sr-strand { grid-template-columns: minmax(0, 110px) minmax(0, 1fr) auto; }
      }`;
    document.head.appendChild(st);
  }

  function render() { badges(); panels(); }
  addStyle();
  render();
  document.addEventListener('ml:results:sync', render);
  document.addEventListener('ml:assigned', badges);
  document.addEventListener('magiclab:auth:ready', panels);
  // The page rewrites the lesson links when the language changes, which removes the badges.
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
