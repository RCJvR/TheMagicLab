// ============================================================
// THE MAGIC LAB — lesson-results.js
// What each learner gets right and wrong in lesson quizzes, per tool and
// grade (Science Sage and Tech Tower).
//
// On a lesson page (…/science-sage/ or …/tech-tower/gr{N}/{strand}/{file}.html) it records
// every quiz answer by watching the shared .mc-opt answer buttons, so no
// lesson file needs its own code: after a click it reads the result from
// the classes the page's own quiz code adds (correct / wrong, or ok / bad
// on the feedback box). It also notes when the quiz is finished, and shows
// a "last time" note above the quiz.
//
// Data per tool + grade, in localStorage "ml_results_<tool>_g<grade>":
//   { l: { "strand/file": { r: [recent 0/1], q: { qIndex: 0|1 }, d: finished-ms, t: last-ms } }, u: last-ms, o: owner }
// For a signed-in learner it is also kept in the lesson_results table, so it
// follows them to other devices; class teachers can read their learners' rows.
// The English and Afrikaans copy of a lesson share one key.
// ============================================================
(function () {
  if (window.MLResults) return;
  const MASTERY = 70, RECENT = 12, MIN_FOR_STATUS = 3, SYNC_DELAY = 2000;
  const cache = {}, dirty = new Set();
  let timer = null;
  const key = (tool, g) => `ml_results_${tool}_g${g}`;
  const id = (tool, g) => tool + '|' + g;

  function load(tool, g) {
    const k = id(tool, g);
    if (cache[k]) return cache[k];
    let d = null;
    try { d = JSON.parse(localStorage.getItem(key(tool, g)) || 'null'); } catch (_) {}
    if (!d || typeof d !== 'object') d = {};
    d.l = d.l || {};
    return (cache[k] = d);
  }
  function save(tool, g) { try { localStorage.setItem(key(tool, g), JSON.stringify(cache[id(tool, g)])); } catch (_) {} }
  const pct = arr => arr && arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 100) : null;

  // ── Account sync ──
  function account() {
    const A = window.MagicLabAuth;
    if (!A || !A.isLoggedIn()) return null;
    const s = A.getSession(), uid = s && s.user && s.user.id;
    return uid ? { sb: A._supabase(), uid } : null;
  }
  // Lesson by lesson, the more recently practised copy wins.
  function merge(a, b) {
    const l = Object.assign({}, a.l);
    Object.entries(b.l || {}).forEach(([k, v]) => { if (!l[k] || (v.t || 0) > (l[k].t || 0)) l[k] = v; });
    return { l, u: Math.max(a.u || 0, b.u || 0) };
  }
  const same = (a, b) => JSON.stringify(a.l) === JSON.stringify(b.l);

  // Pull every grade of a tool from the account and merge it into this device.
  async function pull(tool) {
    const acc = account();
    if (!acc) return;
    const { data: rows, error } = await acc.sb.from('lesson_results').select('grade, data').eq('user_id', acc.uid).eq('tool', tool);
    if (error) { console.warn('[MagicLab] lesson results load failed:', error.message); return; }
    const grades = new Set((rows || []).map(r => r.grade));
    for (let g = 1; g <= 12; g++) { try { if (localStorage.getItem(key(tool, g))) grades.add(g); } catch (_) {} }
    let changed = false;
    grades.forEach(g => {
      const local = load(tool, g);
      const mine = !local.o || local.o === acc.uid ? local : { l: {} };   // never merge another learner's results
      const row = (rows || []).find(r => r.grade === g);
      const server = row && row.data && typeof row.data === 'object' ? Object.assign({ l: {} }, row.data) : null;
      const merged = server ? merge(mine, server) : mine;
      merged.o = acc.uid;
      cache[id(tool, g)] = merged;
      save(tool, g);
      if (Object.keys(merged.l).length && (!server || !same(merged, server))) { dirty.add(id(tool, g)); schedule(); }
      if (!same(merged, local)) changed = true;
    });
    if (changed) document.dispatchEvent(new CustomEvent('ml:results:sync', { detail: { tool } }));
  }
  async function push() {
    timer = null;
    const acc = account();
    if (!acc) return;
    for (const k of [...dirty]) {
      dirty.delete(k);
      const [tool, g] = k.split('|');
      const { o, ...data } = load(tool, +g);
      const { error } = await acc.sb.from('lesson_results').upsert(
        { user_id: acc.uid, tool, grade: +g, data, updated_at: new Date().toISOString() }, { onConflict: 'user_id,tool,grade' });
      if (error) { console.warn('[MagicLab] lesson results save failed:', error.message); dirty.add(k); }
    }
  }
  function schedule() { if (!timer) timer = setTimeout(push, SYNC_DELAY); }
  function flush() { if (dirty.size) { clearTimeout(timer); push(); } }

  function signedOut() {
    // Remove this device's copy of the signed-out learner's results.
    try {
      Object.keys(localStorage).filter(k => k.startsWith('ml_results_')).forEach(k => {
        let d = null; try { d = JSON.parse(localStorage.getItem(k)); } catch (_) {}
        if (d && d.o) localStorage.removeItem(k);
      });
    } catch (_) {}
    Object.keys(cache).forEach(k => delete cache[k]);
    dirty.clear();
  }

  const tools = new Set();   // tools this page has asked about, pulled on sign-in
  document.addEventListener('magiclab:auth:ready', () => { if (account()) tools.forEach(pull); });
  document.addEventListener('magiclab:auth:change', e => {
    const ev = e.detail && e.detail.event;
    if (ev === 'SIGNED_IN') tools.forEach(pull);
    else if (ev === 'SIGNED_OUT') signedOut();
  });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
  window.addEventListener('pagehide', flush);

  window.MLResults = {
    MASTERY,
    // Start following a tool: pulls its results now if signed in, and on sign-in.
    use(tool) { if (!tools.has(tool)) { tools.add(tool); if (account()) pull(tool); } },

    record(tool, g, lesson, qIndex, ok) {
      const acc = account();
      if (acc && load(tool, g).o && load(tool, g).o !== acc.uid) cache[id(tool, g)] = { l: {} };
      const d = load(tool, g), L = d.l[lesson] = d.l[lesson] || { r: [], q: {} };
      L.r.push(ok ? 1 : 0);
      if (L.r.length > RECENT) L.r.splice(0, L.r.length - RECENT);
      L.q[qIndex] = ok ? 1 : 0;
      L.t = d.u = Date.now();
      if (acc) { d.o = acc.uid; dirty.add(id(tool, g)); schedule(); }
      save(tool, g);
    },
    finished(tool, g, lesson) {
      const d = load(tool, g), L = d.l[lesson];
      if (!L) return;
      L.d = L.t = d.u = Date.now();
      const acc = account();
      if (acc) { d.o = acc.uid; dirty.add(id(tool, g)); schedule(); }
      save(tool, g);
    },

    // { pct, n, wrong: [qIndex…], done, last } for one lesson, or null if never practised.
    lesson(tool, g, lesson) {
      const L = load(tool, g).l[lesson];
      if (!L || !L.r.length) return null;
      const wrong = Object.keys(L.q).filter(k => L.q[k] === 0).map(Number).sort((a, b) => a - b);
      return { pct: pct(L.r), n: L.r.length, wrong, done: !!L.d, last: L.t || null };
    },
    isWeak(tool, g, lesson) { const s = this.lesson(tool, g, lesson); return !!s && s.n >= MIN_FOR_STATUS && s.pct < MASTERY; },
    all(tool, g) { return load(tool, g).l; }
  };

  // ── On a lesson page: record answers ──────────────────────────
  const m = location.pathname.match(/\/(science-sage|tech-tower)\/gr(\d+)\/([^/]+)\/([^/]+?)(?:\.af)?\.html$/);
  if (!m) return;
  const TOOL = m[1], GRADE = +m[2], LESSON = m[3] + '/' + m[4], AF = /\.af\.html$/.test(location.pathname);
  MLResults.use(TOOL);

  const seen = new Set();   // each question counts once per visit
  function result(btn) {
    const has = (el, ...cls) => !!el && cls.some(c => el.classList.contains(c));
    if (has(btn, 'wrong', 'chosen-wrong', 'incorrect', 'bad')) return false;
    if (has(btn, 'correct', 'chosen-correct', 'right', 'ok')) return true;
    const card = btn.closest('.q-card') || btn.closest('.mc-options')?.parentElement;
    // Some pages keep a hidden "right" and a hidden "wrong" box; read only the one shown.
    const fb = card && [...card.querySelectorAll('.feedback')].find(f => f.classList.contains('show') || getComputedStyle(f).display !== 'none');
    if (has(fb, 'bad', 'wrong-fb', 'wrong')) return false;
    if (has(fb, 'ok', 'correct-fb', 'correct')) return true;
    return null;
  }
  document.addEventListener('click', e => {
    const btn = e.target.closest && e.target.closest('.mc-opt');
    if (!btn) return;
    const groups = [...document.querySelectorAll('.mc-options')];
    const qi = groups.indexOf(btn.closest('.mc-options'));
    if (qi < 0 || seen.has(qi)) return;
    // The page's own handler runs first; read what it marked.
    setTimeout(() => {
      const ok = result(btn);
      if (ok === null || seen.has(qi)) return;
      seen.add(qi);
      MLResults.record(TOOL, GRADE, LESSON, qi, ok);
    }, 0);
  });

  // The quiz is finished when the page shows its score banner.
  function watchBanner() {
    const banner = document.getElementById('scoreBanner') || document.getElementById('score-banner') || document.querySelector('.score-banner');
    if (!banner) return;
    const done = () => { if (banner.classList.contains('show') || getComputedStyle(banner).display !== 'none') { MLResults.finished(TOOL, GRADE, LESSON); return true; } };
    new MutationObserver((ms, obs) => { if (done()) obs.disconnect(); }).observe(banner, { attributes: true, attributeFilter: ['class', 'style'] });
  }

  // "Last time" note above the quiz.
  const TXT = {
    en: { last: (p, n) => `Last time: ${p}% of your last ${n} answers right.`, retry: list => ` Questions to try again: ${list}.`, clean: ' Every question right on your last try.' },
    af: { last: (p, n) => `Vorige keer: ${p}% van jou laaste ${n} antwoorde reg.`, retry: list => ` Vrae om weer te probeer: ${list}.`, clean: ' Elke vraag reg met jou laaste poging.' }
  };
  function note() {
    const s = MLResults.lesson(TOOL, GRADE, LESSON);
    const first = document.querySelector('.mc-options');
    const host = first && (first.closest('.q-card') || first);
    let el = document.getElementById('mlLastTime');
    if (!s || !host) { if (el) el.remove(); return; }
    const t = TXT[AF ? 'af' : 'en'];
    if (!el) { el = document.createElement('p'); el.id = 'mlLastTime'; el.className = 'ml-last-time'; host.parentNode.insertBefore(el, host); }
    el.classList.toggle('weak', MLResults.isWeak(TOOL, GRADE, LESSON));
    el.textContent = t.last(s.pct, s.n) + (s.wrong.length ? t.retry(s.wrong.map(i => i + 1).join(', ')) : t.clean);
  }
  function addStyle() {
    const st = document.createElement('style');
    st.textContent = '.ml-last-time{margin:0 0 14px;padding:10px 14px;border-radius:12px;border:1px solid rgba(74,207,127,.30);background:rgba(74,207,127,.08);color:var(--text-2,#c9d1dc);font-size:13.5px;line-height:1.5}'
      + '.ml-last-time.weak{border-color:rgba(245,178,61,.40);background:rgba(245,178,61,.09)}';
    document.head.appendChild(st);
  }
  function init() { addStyle(); watchBanner(); note(); }
  document.addEventListener('ml:results:sync', note);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
