/* Math Magician — mixed exam practice.
 * Draws practice questions from the chapters a learner picks, in the CAPS
 * cognitive-level mix for tests and exams (20% knowledge, 35% routine,
 * 30% complex, 15% problem solving), then reports the score per level and
 * the topics to revisit. Uses the page's practice styles, MMHelp for levels,
 * hints and worked solutions, and MMAnswer for checking typed answers.
 *
 * A grade page calls MMExam.init({...}) once, returns MMExam.render() from
 * renderQuestion() while MMExam.active, and calls MMExam.stop() in selectTopic(). */
(function () {
  const MIX = [['K', 0.20], ['R', 0.35], ['C', 0.30], ['P', 0.15]];
  const ORDER = { K: 0, R: 1, C: 2, P: 3 };
  // When a chapter selection runs short of one level, borrow from its neighbours.
  const FALLBACK = { P: ['C', 'R'], C: ['R', 'P', 'K'], R: ['K', 'C'], K: ['R'] };

  const TXT = {
    en: {
      button: 'Mixed exam practice',
      title: 'Mixed exam practice',
      intro: 'Questions from the chapters you choose, in the CAPS mix for tests and exams: 20% knowledge, 35% routine procedures, 30% complex procedures and 15% problem solving. Easier questions come first, as in a real paper.',
      chapters: 'Chapters',
      all: 'All', none: 'None',
      length: 'Length',
      quick: n => `Quick · ${n} questions`,
      full: n => `Full · ${n} questions`,
      start: 'Start',
      pickOne: 'Pick at least one chapter.',
      loading: 'Preparing your paper…',
      qOf: (i, n) => `Q <span>${i}</span> of <span>${n}</span>`,
      score: (c, t) => `Score <span>${c}/${t}</span>`,
      chapterTag: n => `Ch ${n}`,
      placeholder: 'Type your answer…',
      check: 'Check',
      next: 'Next question',
      finish: 'See results',
      correct: '✓ Correct!',
      wrong: '✗ Not quite',
      done: 'Paper complete',
      result: (c, t, p) => `You scored <strong>${c} / ${t}</strong> (${p}%).`,
      byLevel: 'By cognitive level',
      review: 'Topics to revisit',
      noReview: 'Nothing to revisit. Every topic in this paper was answered correctly.',
      again: 'New paper, same chapters',
      change: 'Change chapters',
      short: 'These chapters have too few problem-solving questions for the full mix, so some places went to the next level down.',
      levels: { K: 'Knowledge', R: 'Routine', C: 'Complex', P: 'Problem solving' },
      mode: 'Questions', fresh: 'A fresh mix', weak: 'My weak spots',
      weakNote: 'Favours questions you got wrong and topics where you scored under 70%.',
      noData: 'Answer some practice questions first: then this paper can target your weak spots.',
      record: 'Your record so far', weakTopics: 'Topics under 70% recently', noWeak: 'No weak topics: every topic you have practised is at 70% or more.'
    },
    af: {
      button: 'Gemengde eksamenoefening',
      title: 'Gemengde eksamenoefening',
      intro: 'Vrae uit die hoofstukke wat jy kies, in die KABV-mengsel vir toetse en eksamens: 20% kennis, 35% roetineprosedures, 30% komplekse prosedures en 15% probleemoplossing. Makliker vrae kom eerste, soos in \'n regte vraestel.',
      chapters: 'Hoofstukke',
      all: 'Alle', none: 'Geen',
      length: 'Lengte',
      quick: n => `Kort · ${n} vrae`,
      full: n => `Volledig · ${n} vrae`,
      start: 'Begin',
      pickOne: 'Kies ten minste een hoofstuk.',
      loading: 'Jou vraestel word voorberei…',
      qOf: (i, n) => `Vraag <span>${i}</span> van <span>${n}</span>`,
      score: (c, t) => `Telling <span>${c}/${t}</span>`,
      chapterTag: n => `Hfst ${n}`,
      placeholder: 'Tik jou antwoord…',
      check: 'Gaan na',
      next: 'Volgende vraag',
      finish: 'Sien uitslae',
      correct: '✓ Korrek!',
      wrong: '✗ Nie heeltemal reg nie',
      done: 'Vraestel voltooi',
      result: (c, t, p) => `Jy het <strong>${c} / ${t}</strong> (${p}%) behaal.`,
      byLevel: 'Volgens kognitiewe vlak',
      review: 'Onderwerpe om te hersien',
      noReview: 'Niks om te hersien nie. Elke onderwerp in hierdie vraestel is korrek beantwoord.',
      again: 'Nuwe vraestel, dieselfde hoofstukke',
      change: 'Verander hoofstukke',
      short: 'Hierdie hoofstukke het te min probleemoplossingsvrae vir die volle mengsel, dus het sommige plekke na die volgende vlak laer gegaan.',
      levels: { K: 'Kennis', R: 'Roetine', C: 'Kompleks', P: 'Probleemoplossing' },
      mode: 'Vrae', fresh: '\'n Nuwe mengsel', weak: 'My swak plekke',
      weakNote: 'Verkies vrae wat jy verkeerd gehad het en onderwerpe waar jy onder 70% behaal het.',
      noData: 'Beantwoord eers \'n paar oefenvrae: dan kan hierdie vraestel jou swak plekke teiken.',
      record: 'Jou rekord tot dusver', weakTopics: 'Onderwerpe onlangs onder 70%', noWeak: 'Geen swak onderwerpe nie: elke onderwerp wat jy geoefen het, is op 70% of meer.'
    }
  };

  let cfg = null;
  let picked = null;          // Set of chapter numbers
  let length = 10;
  let focus = 'mix';          // 'mix' | 'weak'
  let paper = null;           // { items: [{topic, qIndex, q, level}], i, answers: [bool], short }
  let view = 'setup';         // 'setup' | 'paper'

  const L = () => TXT[cfg.lang()] || TXT.en;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function chapterList() {
    return cfg.chapters().filter(m => m.file).map(m => ({
      num: m.num,
      name: cfg.lang() === 'af' && m.nameAf ? m.nameAf : m.name
    }));
  }

  function topicsIn(chapters) {
    return cfg.topics().filter(t => chapters.has(MMHelp.chapterOf(t)));
  }

  // Pick `want` items from `pool`, one per topic before any topic repeats.
  function spreadPick(pool, want, usedTopics) {
    const out = [];
    const fresh = shuffle(pool.filter(it => !usedTopics.has(it.topic.id)));
    const rest = shuffle(pool.filter(it => usedTopics.has(it.topic.id)));
    const seen = new Set();
    for (const it of fresh) {
      if (out.length >= want) break;
      if (seen.has(it.topic.id)) continue;
      seen.add(it.topic.id); out.push(it);
    }
    for (const it of fresh.concat(rest)) {
      if (out.length >= want) break;
      if (!out.includes(it)) out.push(it);
    }
    out.forEach(it => usedTopics.add(it.topic.id));
    return out;
  }

  // Pick `want` items at random, each in proportion to its weak-spot weight.
  function weightedPick(pool, want) {
    const left = pool.map(it => ({ it, w: MMResults.weight(cfg.grade, it.topic.id, it.qIndex) }));
    const out = [];
    while (out.length < want && left.length) {
      let r = Math.random() * left.reduce((a, x) => a + x.w, 0), k = 0;
      while (k < left.length - 1 && (r -= left[k].w) > 0) k++;
      out.push(left.splice(k, 1)[0].it);
    }
    return out;
  }

  async function build(chapters, n) {
    const grade = cfg.grade;
    await Promise.all([...chapters].map(ch => MMHelp.ensure(grade, ch)));
    const pools = { K: [], R: [], C: [], P: [] };
    topicsIn(chapters).forEach(topic => {
      (topic.questions || []).forEach((q, qIndex) => {
        const level = MMHelp.level(grade, topic, qIndex, q) || 'R';
        pools[level].push({ topic, qIndex, q, level });
      });
    });
    // 10 questions → 2 K, 4 R, 3 C, 1 P; 20 → 4 K, 7 R, 6 C, 3 P.
    const want = { K: Math.round(n * 0.20), C: Math.round(n * 0.30), P: Math.floor(n * 0.15) };
    want.R = n - want.K - want.C - want.P;

    const used = new Set(), items = [];
    let short = false;
    ['P', 'C', 'K', 'R'].forEach(lv => {
      let need = want[lv];
      const pick = (pool, k) => focus === 'weak' ? weightedPick(pool, k) : spreadPick(pool, k, used);
      const got = pick(pools[lv], need);
      got.forEach(it => { pools[lv].splice(pools[lv].indexOf(it), 1); });
      items.push(...got);
      need -= got.length;
      for (const alt of FALLBACK[lv]) {
        if (need <= 0) break;
        const extra = pick(pools[alt], need);
        extra.forEach(it => { pools[alt].splice(pools[alt].indexOf(it), 1); });
        items.push(...extra);
        need -= extra.length;
      }
      if (want[lv] > 0 && got.length < want[lv] && lv === 'P') short = true;
    });
    items.sort((a, b) => ORDER[a.level] - ORDER[b.level] || MMHelp.chapterOf(a.topic) - MMHelp.chapterOf(b.topic));
    return { items, i: 0, answers: [], short };
  }

  // ── Setup screen ─────────────────────────────────────────────
  // What this learner gets right per level, and their weakest topics.
  function recordHTML(t) {
    const sum = MMResults.summary(cfg.grade, cfg.topics());
    const bars = MIX.map(([lv]) => lv).filter(lv => sum.levels[lv]).map(lv => {
      const p = sum.levels[lv];
      return `<div class="mx-bar-row"><span class="mm-level mm-level-${lv}">${t.levels[lv]}</span>
        <span class="mx-bar"><span class="mx-bar-fill mx-seg-${lv}" style="width:${p.pct}%"></span></span>
        <span class="mx-bar-num">${p.pct}%</span></div>`;
    }).join('');
    const weak = sum.weak.slice(0, 5).map(x => `<button type="button" class="mx-topic" data-id="${x.topic.id}"><span class="mx-chip-num">${MMHelp.chapterOf(x.topic)}</span>${esc(x.topic.name)} · ${x.s.pct}% →</button>`).join('');
    return `<section class="mx-record">
      <div class="mx-label">${t.record}</div><div class="mx-bars">${bars}</div>
      <div class="mx-label">${t.weakTopics}</div>
      ${weak ? `<div class="mx-review">${weak}</div>` : `<p class="mx-note">${t.noWeak}</p>`}
    </section>`;
  }

  function renderSetup() {
    const t = L();
    const hasData = !!(window.MMResults && MMResults.hasData(cfg.grade));
    if (!hasData) focus = 'mix';
    const chs = chapterList();
    if (!picked) picked = new Set(chs.map(c => c.num));
    const chips = chs.map(c => `
      <button type="button" class="mx-chip${picked.has(c.num) ? ' on' : ''}" data-ch="${c.num}" aria-pressed="${picked.has(c.num)}">
        <span class="mx-chip-num">${c.num}</span>${esc(c.name)}
      </button>`).join('');
    cfg.panel.innerHTML = `
      <div class="lesson-heading">${t.title}</div>
      <p class="mx-intro">${t.intro}</p>
      <div class="mx-mix" aria-hidden="true">${MIX.map(([lv, s]) => `<span class="mx-mix-seg mx-seg-${lv}" style="flex:${s}"><span>${t.levels[lv]} ${Math.round(s * 100)}%</span></span>`).join('')}</div>
      <div class="mx-row-head"><span class="mx-label">${t.chapters}</span>
        <span class="mx-links"><button type="button" class="mx-link" data-all="1">${t.all}</button><button type="button" class="mx-link" data-all="0">${t.none}</button></span></div>
      <div class="mx-chips">${chips}</div>
      <div class="mx-row-head"><span class="mx-label">${t.length}</span></div>
      <div class="mx-lengths">
        <button type="button" class="mx-len${length === 10 ? ' on' : ''}" data-n="10" aria-pressed="${length === 10}">${t.quick(10)}</button>
        <button type="button" class="mx-len${length === 20 ? ' on' : ''}" data-n="20" aria-pressed="${length === 20}">${t.full(20)}</button>
      </div>
      <div class="mx-row-head"><span class="mx-label">${t.mode}</span></div>
      <div class="mx-lengths mx-modes">
        <button type="button" class="mx-len${focus === 'mix' ? ' on' : ''}" data-f="mix" aria-pressed="${focus === 'mix'}">${t.fresh}</button>
        <button type="button" class="mx-len${focus === 'weak' ? ' on' : ''}" data-f="weak" aria-pressed="${focus === 'weak'}"${hasData ? '' : ' disabled'}>${t.weak}</button>
      </div>
      <p class="mx-note mx-mode-note">${hasData ? t.weakNote : t.noData}</p>
      <p class="mx-warn" id="mxWarn" hidden>${t.pickOne}</p>
      <button type="button" class="lesson-next-btn" id="mxStart">${t.start} →</button>
      ${hasData ? recordHTML(t) : ''}`;
    const P = cfg.panel;
    P.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => { focus = b.dataset.f; renderSetup(); }));
    P.querySelectorAll('.mx-record .mx-topic').forEach(b => b.addEventListener('click', () => cfg.openTopic(+b.dataset.id)));
    P.querySelectorAll('.mx-chip').forEach(b => b.addEventListener('click', () => {
      const n = +b.dataset.ch;
      picked.has(n) ? picked.delete(n) : picked.add(n);
      b.classList.toggle('on', picked.has(n));
      b.setAttribute('aria-pressed', picked.has(n));
    }));
    P.querySelectorAll('.mx-link').forEach(b => b.addEventListener('click', () => {
      picked = b.dataset.all === '1' ? new Set(chs.map(c => c.num)) : new Set();
      renderSetup();
    }));
    P.querySelectorAll('.mx-len[data-n]').forEach(b => b.addEventListener('click', () => { length = +b.dataset.n; renderSetup(); }));
    P.querySelector('#mxStart').addEventListener('click', start);
  }

  async function start() {
    if (!picked || !picked.size) { cfg.panel.querySelector('#mxWarn').hidden = false; return; }
    cfg.panel.innerHTML = `<p class="mx-intro">${L().loading}</p>`;
    paper = await build(picked, length);
    view = 'paper';
    renderPaper();
  }

  // The same question in the current language (the learner may switch mid-paper).
  function current(it) {
    const topic = cfg.topics().find(tp => tp.id === it.topic.id) || it.topic;
    const q = (topic.questions || [])[it.qIndex];
    return q && MMHelp.fingerprint(q) === MMHelp.fingerprint(it.q) ? { topic, q } : { topic: it.topic, q: it.q };
  }

  // ── Question screen ──────────────────────────────────────────
  function renderPaper() {
    const t = L();
    // Coming back to an answered question (e.g. after visiting the Lesson tab) moves on.
    while (paper.i < paper.items.length && paper.answers[paper.i] !== undefined) paper.i++;
    if (paper.i >= paper.items.length) return renderResults();
    const it = Object.assign({}, paper.items[paper.i], current(paper.items[paper.i]));
    const q = it.q;
    const correct = paper.answers.filter(a => a === true).length;
    const done = paper.answers.filter(a => a !== undefined).length;
    const opts = q.type === 'mc'
      ? `<div class="mc-options">${q.options.map((o, k) => `
          <div class="mc-option" data-idx="${k}"><span class="mc-letter">${'ABCD'[k]}</span><span class="mc-text">${o}</span></div>`).join('')}</div>`
      : `<div class="input-row">
          <input aria-label="Your answer" type="text" class="answer-input" id="mxInput" placeholder="${t.placeholder}" autocomplete="off">
          <button class="submit-btn" id="mxSubmit">${t.check}</button></div>`;
    const last = paper.i === paper.items.length - 1;
    cfg.panel.innerHTML = `
      <div class="score-row">
        <span class="score-pill">${t.qOf(paper.i + 1, paper.items.length)}</span>
        <span class="score-pill">${t.score(correct, done)}</span>
        <span class="q-topic-tag">${t.chapterTag(MMHelp.chapterOf(it.topic))} · ${esc(it.topic.name)}</span>
        <span id="mmLevel"></span>
      </div>
      <div class="question-text">${q.text}</div>
      <div id="mmHint"></div>
      ${opts}
      <div id="feedbackArea"><div class="feedback-label" id="feedbackLabel"></div><div id="feedbackText"></div></div>
      <button id="nextQBtn">${last ? t.finish : t.next} →</button>`;

    const ctx = { grade: cfg.grade, topic: it.topic, qIndex: it.qIndex, q, lang: cfg.lang() };
    MMHelp.mount(Object.assign({ levelEl: cfg.panel.querySelector('#mmLevel'), hintEl: cfg.panel.querySelector('#mmHint') }, ctx));
    let answered = false;
    const slot = paper.i;

    const area = cfg.panel.querySelector('#feedbackArea');
    const next = cfg.panel.querySelector('#nextQBtn');
    const finish = ok => {
      answered = true;
      paper.answers[slot] = ok;
      if (window.MMResults) MMResults.record(cfg.grade, it.topic, it.qIndex, q, ok);
      area.style.display = 'block';
      area.className = ok ? 'correct' : 'wrong';
      cfg.panel.querySelector('#feedbackLabel').textContent = ok ? t.correct : t.wrong;
      cfg.panel.querySelector('#feedbackText').innerHTML = ok ? MMHelp.rightHTML(ctx) : MMHelp.wrongHTML(ctx);
      next.classList.add('show');
      next.focus({ preventScroll: true });
      if (window.MagicLabProgress && window.ML_TOOLS) {
        MagicLabProgress.track(ML_TOOLS.MATH_MAGICIAN, ok ? 'quiz_correct' : 'quiz_wrong', {
          topic: it.topic.name, grade: cfg.grade, score: ok ? 1 : 0,
          metadata: { mode: 'mixed_exam', question: String(q.text).replace(/<[^>]+>/g, '').substring(0, 100) }
        });
      }
    };
    next.addEventListener('click', () => { paper.i++; renderPaper(); cfg.panel.scrollTop = 0; });

    if (q.type === 'mc') {
      const all = cfg.panel.querySelectorAll('.mc-option');
      all.forEach(opt => opt.addEventListener('click', () => {
        if (answered) return;
        const idx = +opt.dataset.idx;
        all.forEach(o => o.classList.add('disabled'));
        opt.classList.add('selected');
        all[q.answer].classList.add('correct');
        if (idx !== q.answer) opt.classList.add('wrong');
        finish(idx === q.answer);
      }));
    } else {
      const input = cfg.panel.querySelector('#mxInput'), btn = cfg.panel.querySelector('#mxSubmit');
      const submit = () => {
        if (answered) return;
        const val = input.value.trim();
        if (!val) return;
        input.disabled = btn.disabled = true;
        const ok = MMAnswer.matches(val, q);
        input.classList.add(ok ? 'correct' : 'wrong');
        finish(ok);
      };
      btn.addEventListener('click', submit);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
      input.focus({ preventScroll: true });
    }
  }

  // ── Results screen ───────────────────────────────────────────
  function renderResults() {
    const t = L();
    const total = paper.items.length;
    const right = paper.answers.filter(a => a === true).length;
    const pct = total ? Math.round(right / total * 100) : 0;
    const per = {};
    paper.items.forEach((it, k) => {
      const p = per[it.level] = per[it.level] || { c: 0, n: 0 };
      p.n++; if (paper.answers[k]) p.c++;
    });
    const bars = MIX.map(([lv]) => lv).filter(lv => per[lv]).map(lv => {
      const p = per[lv], w = Math.round(p.c / p.n * 100);
      return `<div class="mx-bar-row"><span class="mm-level mm-level-${lv}">${t.levels[lv]}</span>
        <span class="mx-bar"><span class="mx-bar-fill mx-seg-${lv}" style="width:${w}%"></span></span>
        <span class="mx-bar-num">${p.c}/${p.n}</span></div>`;
    }).join('');
    const missed = [];
    paper.items.forEach((it, k) => {
      const topic = current(it).topic;
      if (!paper.answers[k] && !missed.includes(topic)) missed.push(topic);
    });
    missed.sort((x, y) => MMHelp.chapterOf(x) - MMHelp.chapterOf(y));
    const review = missed.length
      ? `<div class="mx-review">${missed.map(tp => `<button type="button" class="mx-topic" data-id="${tp.id}"><span class="mx-chip-num">${MMHelp.chapterOf(tp)}</span>${esc(tp.name)} →</button>`).join('')}</div>`
      : `<p class="mx-intro">${t.noReview}</p>`;
    cfg.panel.innerHTML = `
      <div class="mx-results">
        <div class="lesson-heading">${t.done}</div>
        <div class="mx-score"><span class="mx-score-big">${pct}%</span><span class="mx-score-text">${t.result(right, total, pct)}</span></div>
      </div>
      <div class="mx-label">${t.byLevel}</div>
      <div class="mx-bars">${bars}</div>
      ${paper.short ? `<p class="mx-note">${t.short}</p>` : ''}
      <div class="mx-label">${t.review}</div>
      ${review}
      <div class="mx-actions">
        <button type="button" class="lesson-next-btn" id="mxAgain">${t.again}</button>
        <button type="button" class="mx-link" id="mxChange">${t.change}</button>
      </div>`;
    cfg.panel.querySelectorAll('.mx-topic').forEach(b => b.addEventListener('click', () => cfg.openTopic(+b.dataset.id)));
    cfg.panel.querySelector('#mxAgain').addEventListener('click', start);
    cfg.panel.querySelector('#mxChange').addEventListener('click', () => { view = 'setup'; renderSetup(); });
  }

  function mountButton() {
    const list = document.getElementById('sidebarList');
    if (!list || document.getElementById('mxOpen')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.id = 'mxOpen';
    b.className = 'mx-open';
    b.innerHTML = '<span class="mx-open-icon" aria-hidden="true">✎</span><span class="mx-open-text"></span>';
    b.addEventListener('click', () => MMExam.open());
    list.parentNode.insertBefore(b, list);
    MMExam.relabel();
  }

  window.MMExam = {
    active: false,
    init(o) { cfg = o; mountButton(); },
    open() {
      this.active = true;
      view = paper && paper.i < paper.items.length ? view : 'setup';
      document.getElementById('mxOpen')?.classList.add('on');
      document.querySelectorAll('#sidebarList .topic-item.active').forEach(el => el.classList.remove('active'));
      cfg.showPractice();
    },
    stop() {
      this.active = false;
      document.getElementById('mxOpen')?.classList.remove('on');
    },
    render() { view === 'paper' && paper ? renderPaper() : renderSetup(); },
    relabel() {
      const el = document.querySelector('#mxOpen .mx-open-text');
      if (el && cfg) el.textContent = L().button;
    }
  };
})();
