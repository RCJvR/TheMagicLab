// ══════════════════════════════════════════════════════════
// MATH MAGICIAN RESULTS — class detail view
// What a class has practised in Math Magician, read from the mm_results
// table (one row per learner per grade, written by math-magician/
// practice-results.js) and from lesson_complete events. Shows the class's
// accuracy per CAPS cognitive level, the topics most worth reteaching and,
// per learner, their accuracy, weak topics and when they last practised.
// Teachers can read these rows for learners in their own classes only.
// ══════════════════════════════════════════════════════════
(function () {
  const MASTERY = 70, MIN_FOR_STATUS = 3, IDLE_DAYS = 7;
  const LEVELS = [['K', 'Knowledge'], ['R', 'Routine'], ['C', 'Complex'], ['P', 'Problem solving']];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pct = (c, n) => n ? Math.round(c / n * 100) : null;
  const sum = arr => arr.reduce((a, b) => a + b, 0);

  let state = null;   // { cls, students, rows, events, grade }
  let seq = 0;        // ignores a slow load for a class that is no longer open

  function topicName(g, tid) {
    const t = (window.MM_TOPIC_INDEX || {})[g]?.[tid];
    return t ? { name: t[0], ch: t[1] } : { name: 'Topic ' + tid, ch: null };
  }
  function ago(iso) {
    if (!iso) return null;
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    return days <= 0 ? 'today' : days === 1 ? 'yesterday' : days + ' days ago';
  }
  const tone = p => p == null ? '' : p >= MASTERY ? 'good' : p >= 50 ? 'warn' : 'crit';

  // Per-learner summary for one grade.
  function learnerStats(s, g) {
    const row = state.rows.find(r => r.user_id === s.id && r.grade === g);
    const d = row?.data || {};
    const levels = {}; let c = 0, n = 0;
    Object.entries(d.l || {}).forEach(([k, v]) => { if (Array.isArray(v) && v[1]) { levels[k] = v; c += v[0]; n += v[1]; } });
    const weak = Object.entries(d.t || {})
      .map(([tid, arr]) => ({ tid, p: pct(sum(arr), arr.length), n: arr.length }))
      .filter(x => x.n >= MIN_FOR_STATUS && x.p < MASTERY)
      .sort((a, b) => a.p - b.p);
    const done = new Set(state.events.filter(e => e.user_id === s.id && e.grade === g && e.metadata?.topicId != null).map(e => e.metadata.topicId));
    return { s, row, levels, c, n, acc: pct(c, n), weak, done: done.size, updated: row?.updated_at || null };
  }

  function gradesWithData() {
    return [...new Set(state.rows.map(r => r.grade))].sort((a, b) => a - b);
  }

  function render() {
    const wrap = document.getElementById('mm-class-results');
    if (!wrap || !state) return;
    const g = state.grade;
    const total = Object.keys((window.MM_TOPIC_INDEX || {})[g] || {}).length;
    const stats = state.students.map(s => learnerStats(s, g));
    const active = stats.filter(x => x.n > 0);

    // Class accuracy per level and per topic.
    const lv = {}; active.forEach(x => Object.entries(x.levels).forEach(([k, v]) => { lv[k] = lv[k] || [0, 0]; lv[k][0] += v[0]; lv[k][1] += v[1]; }));
    const topics = {};
    active.forEach(x => Object.entries(x.row.data.t || {}).forEach(([tid, arr]) => {
      const t = topics[tid] = topics[tid] || { tid, c: 0, n: 0, learners: 0, weak: 0, weakIds: [] };
      t.c += sum(arr); t.n += arr.length; t.learners++;
      if (arr.length >= MIN_FOR_STATUS && pct(sum(arr), arr.length) < MASTERY) { t.weak++; t.weakIds.push(x.s.id); }
    }));
    const reteach = Object.values(topics)
      .filter(t => t.n >= 6 || t.learners >= 2)
      .map(t => Object.assign(t, { p: pct(t.c, t.n) }))
      .filter(t => t.p < MASTERY)
      .sort((a, b) => a.p - b.p || b.weak - a.weak)
      .slice(0, 8);
    const classC = sum(active.map(x => x.c)), classN = sum(active.map(x => x.n));
    const idle = stats.filter(x => !x.updated || (Date.now() - new Date(x.updated).getTime()) > IDLE_DAYS * 86400000);

    // Weakest learners first; learners with no practice at the end.
    stats.sort((a, b) => (a.acc == null) - (b.acc == null) || (a.acc ?? 0) - (b.acc ?? 0));

    const grades = [8, 9, 10, 11, 12], has = new Set(gradesWithData());
    wrap.innerHTML = `
      <div class="mmr-head">
        <div>
          <div class="mmr-title">Math Magician results</div>
          <div class="mmr-sub">Practice by learners in this class while signed in. A topic is weak below ${MASTERY}% over the learner's last 12 answers.</div>
        </div>
        <div class="mmr-grades" role="group" aria-label="Grade">
          ${grades.map(x => `<button type="button" class="mmr-grade${x === g ? ' on' : ''}${has.has(x) ? '' : ' empty'}" data-g="${x}" aria-pressed="${x === g}">Gr ${x}</button>`).join('')}
        </div>
      </div>
      ${!active.length ? `<div class="mmr-empty">No learner in this class has practised Grade ${g} Math Magician while signed in yet.${has.size ? ' Grades with results are shown in bold above.' : ''}</div>` : `
      <div class="mmr-summary">
        <div class="mmr-stat"><div class="mmr-stat-v">${active.length}<span>/${state.students.length}</span></div><div class="mmr-stat-l">learners practising</div></div>
        <div class="mmr-stat"><div class="mmr-stat-v">${classN.toLocaleString()}</div><div class="mmr-stat-l">questions answered</div></div>
        <div class="mmr-stat"><div class="mmr-stat-v mmr-${tone(pct(classC, classN))}">${pct(classC, classN)}%</div><div class="mmr-stat-l">class accuracy</div></div>
        <div class="mmr-stat"><div class="mmr-stat-v">${idle.length}</div><div class="mmr-stat-l">not practised in ${IDLE_DAYS} days</div></div>
      </div>
      <div class="mmr-cols">
        <section class="mmr-block">
          <h3 class="mmr-h">Accuracy by CAPS level</h3>
          <div class="mmr-levels">
            ${LEVELS.map(([k, name]) => { const v = lv[k]; const p = v ? pct(v[0], v[1]) : null; return `
              <div class="mmr-level">
                <span class="mmr-level-name">${name}</span>
                <span class="mmr-bar"><span class="mmr-bar-fill mmr-${tone(p)}" style="width:${p ?? 0}%"></span></span>
                <span class="mmr-level-p">${p == null ? '—' : p + '%'}</span>
                <span class="mmr-level-n">${v ? v[1] : 0}</span>
              </div>`; }).join('')}
          </div>
        </section>
        <section class="mmr-block">
          <h3 class="mmr-h">Topics to reteach</h3>
          ${reteach.length ? `<ol class="mmr-topics">${reteach.map(t => { const tn = topicName(g, t.tid); return `
            <li class="mmr-topic">
              <span class="mmr-topic-name">${tn.ch ? `<span class="mmr-ch">Ch ${tn.ch}</span>` : ''}${esc(tn.name)}</span>
              <span class="mmr-topic-p mmr-${tone(t.p)}">${t.p}%</span>
              <span class="mmr-topic-n">${t.weak} of ${t.learners} weak</span>
              ${t.weak ? `<button type="button" class="mmr-assign" data-tid="${t.tid}" title="Set this topic as an assignment for the ${t.weak} weak learner${t.weak > 1 ? 's' : ''}">Assign</button>` : '<span></span>'}
            </li>`; }).join('')}</ol>` : `<p class="mmr-note">No topic is below ${MASTERY}% for the class.</p>`}
        </section>
      </div>`}
      <div class="mmr-table-wrap">
        <table class="student-table mmr-table">
          <thead><tr>
            <th>Learner <span class="mmr-th-note">weakest first</span></th>
            <th>Topics done</th><th>Answered</th><th>Accuracy</th>
            <th>K · R · C · P</th><th>Weak topics</th><th>Last practised</th>
          </tr></thead>
          <tbody>${stats.map(x => {
            const name = x.s.display_name || x.s.email?.split('@')[0] || 'Learner';
            const when = ago(x.updated);
            const stale = !x.updated || (Date.now() - new Date(x.updated).getTime()) > IDLE_DAYS * 86400000;
            return `<tr>
              <td><span class="student-name">${esc(name)}</span></td>
              <td class="mmr-num">${x.done}<span class="mmr-of">/${total}</span></td>
              <td class="mmr-num">${x.n || '—'}</td>
              <td class="mmr-num">${x.acc == null ? '—' : `<span class="mmr-pill mmr-${tone(x.acc)}">${x.acc}%</span>`}</td>
              <td class="mmr-num mmr-lv">${LEVELS.map(([k, name]) => { const v = x.levels[k]; const p = v ? pct(v[0], v[1]) : null; return `<span class="mmr-${tone(p)}" title="${name}: ${v ? `${v[0]} of ${v[1]}` : 'none yet'}">${p == null ? '·' : p}</span>`; }).join('')}</td>
              <td>${x.weak.length ? `<span class="mmr-weak-list">${x.weak.slice(0, 3).map(w => `<span class="mmr-chip" title="${w.p}% over the last ${w.n} answers">${esc(topicName(g, w.tid).name)}</span>`).join('')}${x.weak.length > 3 ? `<span class="mmr-more">+${x.weak.length - 3}</span>` : ''}</span>` : (x.n ? '<span class="mmr-none">None</span>' : '—')}</td>
              <td class="mmr-when${stale ? ' stale' : ''}">${when || 'Never'}</td>
            </tr>`; }).join('')}</tbody>
        </table>
      </div>`;
    wrap.querySelectorAll('.mmr-grade').forEach(b => b.addEventListener('click', () => { state.grade = +b.dataset.g; render(); }));
    // Assign a weak topic to just the learners who are weak in it (assignments form, pre-filled).
    wrap.querySelectorAll('.mmr-assign').forEach(b => b.addEventListener('click', () => {
      const t = reteach.find(x => String(x.tid) === b.dataset.tid);
      if (!t || typeof window.openCreateAssignmentModal !== 'function') return;
      window.openCreateAssignmentModal({ classId: state.cls.id, tool: 'math-magician', title: 'Practise: ' + topicName(g, t.tid).name,
        refs: [`mm:${g}:${t.tid}`], studentIds: t.weakIds });
    }));
  }

  async function show(cls, students) {
    const wrap = document.getElementById('mm-class-results');
    if (!wrap) return;
    const my = ++seq;
    state = null;
    wrap.innerHTML = '';
    if (!students?.length || !window.MagicLabAuth?.isLoggedIn()) return;
    wrap.innerHTML = '<div class="mmr-empty">Loading Math Magician results…</div>';
    const sb = window.MagicLabAuth._supabase(), ids = students.map(s => s.id);
    const [res, ev] = await Promise.all([
      sb.from('mm_results').select('user_id, grade, data, updated_at').in('user_id', ids),
      sb.from('progress_events').select('user_id, grade, metadata').eq('tool', 'math-magician').eq('event_type', 'lesson_complete').in('user_id', ids)
    ]);
    if (res.error) { wrap.innerHTML = `<div class="mmr-empty">Could not load Math Magician results: ${esc(res.error.message)}</div>`; return; }
    if (my !== seq) return;
    state = { cls, students, rows: res.data || [], events: ev.data || [] };
    // Start on the class's grade, else the grade with the most learners practising.
    const counts = {}; state.rows.forEach(r => { counts[r.grade] = (counts[r.grade] || 0) + 1; });
    const busiest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    state.grade = cls.grade >= 8 && cls.grade <= 12 && (counts[cls.grade] || !busiest) ? cls.grade : busiest ? +busiest : (cls.grade >= 8 && cls.grade <= 12 ? cls.grade : 10);
    render();
  }

  function clear() { seq++; state = null; const w = document.getElementById('mm-class-results'); if (w) w.innerHTML = ''; }

  window.TeacherMathResults = { show, clear };
})();
