/* Math Magician — what each learner gets right and wrong, kept in this browser.
 *
 * Every answer from topic practice and mixed exam papers is recorded per
 * grade: the last result for each question, the last 12 results for each
 * topic and a running total per CAPS cognitive level. A topic counts as
 * complete only at MASTERY % or better; topics below it are flagged in the
 * sidebar and weighted up in "My weak spots" exam papers.
 *
 * Data lives in localStorage ("mm_results_g<grade>"). For a signed-in learner it
 * is also kept in the mm_results table (one row per grade), so it follows them
 * to other devices: the two copies are merged on sign-in and each change is
 * saved a few seconds later. The browser copy is tagged with its owner, so on
 * a shared device one learner never inherits another's results. */
(function () {
  const MASTERY = 70, RECENT = 12, MIN_FOR_STATUS = 3;
  const TXT = {
    en: { weakTip: 'Needs more practice: under 70% recently', almost: 'Almost there',
          scored: (c, t, p, name) => `You scored <strong>${c} / ${t}</strong> (${p}%) on <em>${name}</em>. Score ${MASTERY}% or more to complete this topic.`,
          again: 'Try this topic again', lesson: 'Back to the lesson', next: name => `Skip to: ${name}` },
    af: { weakTip: 'Het meer oefening nodig: onlangs onder 70%', almost: 'Amper daar',
          scored: (c, t, p, name) => `Jy het <strong>${c} / ${t}</strong> (${p}%) behaal vir <em>${name}</em>. Behaal ${MASTERY}% of meer om hierdie onderwerp te voltooi.`,
          again: 'Probeer hierdie onderwerp weer', lesson: 'Terug na die les', next: name => `Gaan na: ${name}` }
  };
  const cache = {};
  const key = g => 'mm_results_g' + g;

  function load(g) {
    if (cache[g]) return cache[g];
    let d = null;
    try { d = JSON.parse(localStorage.getItem(key(g)) || 'null'); } catch (_) {}
    if (!d || typeof d !== 'object') d = {};
    d.t = d.t || {}; d.q = d.q || {}; d.l = d.l || {};
    return (cache[g] = d);
  }
  function save(g) { try { localStorage.setItem(key(g), JSON.stringify(cache[g])); } catch (_) {} }

  // ── Account sync ──
  const SYNC_DELAY = 3000;
  const dirty = new Set();
  let timer = null;
  const pageGrade = +((location.pathname.match(/\/gr(\d+)\//) || [])[1]) || null;

  function account() {
    const A = window.MagicLabAuth;
    if (!A || !A.isLoggedIn()) return null;
    const s = A.getSession(), uid = s && s.user && s.user.id;
    return uid ? { sb: A._supabase(), uid } : null;
  }
  // Newer copy wins where both have a value; the other fills the gaps.
  function merge(a, b) {
    const [base, other] = (b.u || 0) > (a.u || 0) ? [b, a] : [a, b];
    return { t: Object.assign({}, other.t, base.t), q: Object.assign({}, other.q, base.q),
             l: Object.assign({}, other.l, base.l), u: Math.max(a.u || 0, b.u || 0) };
  }
  const same = (a, b) => JSON.stringify([a.t, a.q, a.l]) === JSON.stringify([b.t, b.q, b.l]);

  async function pull(g) {
    const acc = account();
    if (!acc) return;
    const { data: row, error } = await acc.sb.from('mm_results').select('data').eq('user_id', acc.uid).eq('grade', g).maybeSingle();
    if (error) { console.warn('[MathMagician] results load failed:', error.message); return; }
    const local = load(g);
    // Results left by someone else on this device are dropped, not merged.
    const mine = !local.o || local.o === acc.uid ? local : { t: {}, q: {}, l: {} };
    const server = row && row.data && typeof row.data === 'object' ? Object.assign({ t: {}, q: {}, l: {} }, row.data) : null;
    const merged = server ? merge(mine, server) : mine;
    merged.o = acc.uid;
    cache[g] = merged;
    save(g);
    if (!server || !same(merged, server)) { dirty.add(g); schedule(); }
    if (!same(merged, local)) document.dispatchEvent(new CustomEvent('mm:results:sync', { detail: { grade: g } }));
  }
  async function push() {
    timer = null;
    const acc = account();
    if (!acc) return;
    for (const g of [...dirty]) {
      dirty.delete(g);
      const d = load(g);
      const { o, ...data } = d;
      const { error } = await acc.sb.from('mm_results').upsert({ user_id: acc.uid, grade: g, data, updated_at: new Date().toISOString() }, { onConflict: 'user_id,grade' });
      if (error) { console.warn('[MathMagician] results save failed:', error.message); dirty.add(g); }
    }
  }
  function schedule() { if (!timer) timer = setTimeout(push, SYNC_DELAY); }

  function onSignIn() { if (pageGrade) pull(pageGrade); }
  function onSignOut() {
    // Clear this device's copy of the learner's results when they sign out.
    for (let g = 8; g <= 12; g++) {
      let d = null;
      try { d = JSON.parse(localStorage.getItem(key(g)) || 'null'); } catch (_) {}
      if (d && d.o) { try { localStorage.removeItem(key(g)); } catch (_) {} delete cache[g]; }
    }
    dirty.clear();
  }
  document.addEventListener('magiclab:auth:ready', () => { if (account()) onSignIn(); });
  document.addEventListener('magiclab:auth:change', e => {
    const ev = e.detail && e.detail.event;
    if (ev === 'SIGNED_IN') onSignIn();
    else if (ev === 'SIGNED_OUT') onSignOut();
  });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && dirty.size) { clearTimeout(timer); push(); } });

  const pct = arr => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 100) : null;

  window.MMResults = {
    MASTERY,

    record(g, topic, qIndex, q, ok) {
      const acc = account();
      // Never add to results another learner left on this device.
      if (acc && load(g).o && load(g).o !== acc.uid) cache[g] = { t: {}, q: {}, l: {} };
      const d = load(g), tid = String(topic.id);
      const r = ok ? 1 : 0;
      (d.t[tid] = d.t[tid] || []).push(r);
      if (d.t[tid].length > RECENT) d.t[tid].splice(0, d.t[tid].length - RECENT);
      d.q[tid + ':' + qIndex] = r;
      const lv = (window.MMHelp && MMHelp.level(g, topic, qIndex, q)) || null;
      if (lv) { const L = d.l[lv] = d.l[lv] || [0, 0]; L[0] += r; L[1] += 1; }
      d.u = Date.now();
      if (acc) { d.o = acc.uid; dirty.add(g); schedule(); }
      save(g);
    },

    // Recent accuracy for a topic: { pct, n } or null if never practised.
    topic(g, tid) {
      const arr = load(g).t[String(tid)] || [];
      return arr.length ? { pct: pct(arr), n: arr.length } : null;
    },
    isWeak(g, tid) {
      const s = this.topic(g, tid);
      return !!s && s.n >= MIN_FOR_STATUS && s.pct < MASTERY;
    },
    badge(g, tid, lang) {
      if (!this.isWeak(g, tid)) return '';
      const L = TXT[lang] || TXT.en;
      return `<span class="mm-weak" title="${L.weakTip}" aria-label="${L.weakTip}"></span>`;
    },

    // How strongly a question should be preferred in a weak-spots paper.
    weight(g, tid, qIndex) {
      const d = load(g), last = d.q[tid + ':' + qIndex];
      // Strong enough that a handful of misses outweighs hundreds of unseen questions.
      if (last === 0) return 30;
      if (this.isWeak(g, tid)) return last === 1 ? 4 : 10;
      return last === 1 ? 0.2 : 1;
    },
    hasData(g) { return Object.keys(load(g).q).length > 0; },

    // Overall accuracy per level, and the weakest practised topics.
    summary(g, topics) {
      const d = load(g), levels = {};
      Object.keys(d.l).forEach(k => { const [c, n] = d.l[k]; if (n) levels[k] = { c, n, pct: Math.round(c / n * 100) }; });
      const weak = (topics || []).map(t => ({ topic: t, s: this.topic(g, t.id) }))
        .filter(x => x.s && x.s.n >= MIN_FOR_STATUS && x.s.pct < MASTERY)
        .sort((a, b) => a.s.pct - b.s.pct);
      return { levels, weak };
    },

    // End-of-topic screen when the score is below mastery.
    renderRetry(o) {
      const L = TXT[o.lang] || TXT.en, s = o.score;
      const p = s.total ? Math.round(s.correct / s.total * 100) : 0;
      const idx = o.topics.findIndex(t => t.id === o.topic.id);
      const next = idx >= 0 && idx + 1 < o.topics.length ? o.topics[idx + 1] : null;
      o.panel.innerHTML = `
        <div class="complete-banner mm-retry">
          <h2>${L.almost}</h2>
          <p>${L.scored(s.correct, s.total, p, o.topic.name)}</p>
          <div class="mm-retry-actions">
            <button class="lesson-next-btn" id="mmRetry">${L.again}</button>
            <button type="button" class="mx-link" id="mmToLesson">${L.lesson}</button>
            ${next ? `<button type="button" class="mx-link" id="mmSkip">${L.next(next.name)}</button>` : ''}
          </div>
        </div>`;
      o.panel.querySelector('#mmRetry').addEventListener('click', o.retry);
      o.panel.querySelector('#mmToLesson').addEventListener('click', o.toLesson);
      if (next) o.panel.querySelector('#mmSkip').addEventListener('click', () => o.open(next.id));
    }
  };
})();
