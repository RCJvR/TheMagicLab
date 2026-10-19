// ══════════════════════════════════════════════════════════
// SCIENCE SAGE, TECH TOWER and COMPUTER CODEX RESULTS — class detail view
// What a class has answered in a tool's lesson quizzes, read from the
// lesson_results table (one row per learner, tool and grade, written by
// /lesson-results.js). Shows class accuracy per strand, the lessons most
// worth reteaching and, per learner, lessons finished, accuracy, weak
// lessons and when they last practised. Uses the same layout classes as the
// Math Magician card (teacher-math-results.css).
// One card per tool: window.TeacherScienceResults, window.TeacherTechResults
// and window.TeacherCodexResults.
// ══════════════════════════════════════════════════════════
(function () {
  const MASTERY = 70, MIN_FOR_STATUS = 3, IDLE_DAYS = 7;
  const STRANDS = { life: 'Life & Living', matter: 'Matter & Materials', energy: 'Energy & Change', earth: 'Planet Earth & Beyond', physics: 'Physics', chemistry: 'Chemistry',
                    structures: 'Structures', mechanical: 'Mechanical Systems', electrical: 'Electrical Systems', processing: 'Processing',
                    coding: 'Coding & Robotics', 'cat-caps': 'CAT (CAPS)', 'cat-ieb': 'CAT (IEB)', 'it-caps': 'IT (CAPS)', 'it-ieb': 'IT (IEB)' };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pct = (c, n) => n ? Math.round(c / n * 100) : null;
  const sum = arr => arr.reduce((a, b) => a + b, 0);
  const tone = p => p == null ? '' : p >= MASTERY ? 'good' : p >= 50 ? 'warn' : 'crit';
  const strandName = (s, g) => s === 'life' && g >= 10 ? 'Life Sciences' : STRANDS[s] || s;
  const stale = iso => !iso || (Date.now() - new Date(iso).getTime()) > IDLE_DAYS * 86400000;
  function ago(iso) {
    if (!iso) return null;
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    return days <= 0 ? 'today' : days === 1 ? 'yesterday' : days + ' days ago';
  }

  // prefix: the assignment ref prefix (ss, tt, cc); gradeLabels: button text for a grade, where not "Gr <n>".
  // byTrack: a learner follows one or two tracks (Computer Codex: CAT or IT, CAPS or IEB), so
  // "lessons finished" counts out of the lessons in the tracks they have worked in.
  function card({ tool, title, grades, index, containerId, prefix, gradeLabels = {}, byTrack = false }) {
    const TOOL = tool;
    const gradeName = g => gradeLabels[g] || 'Gr ' + g;
    const lessonName = (g, k) => (window[index] || {})[g]?.[k] || k.split('/').pop().replace(/-/g, ' ');
    let state = null, seq = 0;

    function learnerStats(s, g) {
      const row = state.rows.find(r => r.user_id === s.id && r.grade === g);
      const lessons = row?.data?.l || {};
      let c = 0, n = 0, answered = 0, finished = 0;
      const weak = [];
      Object.entries(lessons).forEach(([k, L]) => {
        const r = Array.isArray(L.r) ? L.r : [];
        c += sum(r); n += r.length; answered += Object.keys(L.q || {}).length;
        if (L.d) finished++;
        const p = pct(sum(r), r.length);
        if (r.length >= MIN_FOR_STATUS && p < MASTERY) weak.push({ k, p, n: r.length });
      });
      weak.sort((a, b) => a.p - b.p);
      return { s, row, lessons, c, n, answered, finished, acc: pct(c, n), weak, updated: row?.updated_at || null };
    }

    function render() {
      const wrap = document.getElementById(containerId);
      if (!wrap || !state) return;
      const g = state.grade;
      const keys = Object.keys((window[index] || {})[g] || {});
      const totalFor = x => {
        if (!byTrack) return keys.length;
        const tracks = new Set(Object.keys(x.lessons).map(k => k.split('/')[0]));
        return tracks.size ? keys.filter(k => tracks.has(k.split('/')[0])).length : null;
      };
      const stats = state.students.map(s => learnerStats(s, g));
      const active = stats.filter(x => x.n > 0);

      const strands = {}, lessons = {};
      active.forEach(x => Object.entries(x.lessons).forEach(([k, L]) => {
        const r = Array.isArray(L.r) ? L.r : [], st = k.split('/')[0];
        const S = strands[st] = strands[st] || [0, 0]; S[0] += sum(r); S[1] += r.length;
        const T = lessons[k] = lessons[k] || { k, c: 0, n: 0, learners: 0, weak: 0, weakIds: [] };
        T.c += sum(r); T.n += r.length; T.learners++;
        if (r.length >= MIN_FOR_STATUS && pct(sum(r), r.length) < MASTERY) { T.weak++; T.weakIds.push(x.s.id); }
      }));
      const reteach = Object.values(lessons)
        .filter(t => t.n >= 6 || t.learners >= 2)
        .map(t => Object.assign(t, { p: pct(t.c, t.n) }))
        .filter(t => t.p < MASTERY)
        .sort((a, b) => a.p - b.p || b.weak - a.weak)
        .slice(0, 8);
      const classC = sum(active.map(x => x.c)), classN = sum(active.map(x => x.n));
      const idle = stats.filter(x => stale(x.updated));
      stats.sort((a, b) => (a.acc == null) - (b.acc == null) || (a.acc ?? 0) - (b.acc ?? 0));

      const has = new Set(state.rows.map(r => r.grade));
      wrap.innerHTML = `
        <div class="mmr-head">
          <div>
            <div class="mmr-title">${title} results</div>
            <div class="mmr-sub">Lesson quiz answers by learners in this class while signed in. A lesson is weak below ${MASTERY}% over the learner's last 12 answers in it.</div>
          </div>
          <div class="mmr-grades" role="group" aria-label="Grade">
            ${grades.map(x => `<button type="button" class="mmr-grade${x === g ? ' on' : ''}${has.has(x) ? '' : ' empty'}" data-g="${x}" aria-pressed="${x === g}">${gradeName(x)}</button>`).join('')}
          </div>
        </div>
        ${!active.length ? `<div class="mmr-empty">No learner in this class has answered a ${gradeName(g).replace('Gr ', 'Grade ')} ${title} quiz while signed in yet.${has.size ? ' Grades with results are shown in bold above.' : ''}</div>` : `
        <div class="mmr-summary">
          <div class="mmr-stat"><div class="mmr-stat-v">${active.length}<span>/${state.students.length}</span></div><div class="mmr-stat-l">learners practising</div></div>
          <div class="mmr-stat"><div class="mmr-stat-v">${sum(active.map(x => x.answered)).toLocaleString()}</div><div class="mmr-stat-l">questions answered</div></div>
          <div class="mmr-stat"><div class="mmr-stat-v mmr-${tone(pct(classC, classN))}">${pct(classC, classN)}%</div><div class="mmr-stat-l">class accuracy</div></div>
          <div class="mmr-stat"><div class="mmr-stat-v">${idle.length}</div><div class="mmr-stat-l">not practised in ${IDLE_DAYS} days</div></div>
        </div>
        <div class="mmr-cols">
          <section class="mmr-block">
            <h3 class="mmr-h">Accuracy by strand</h3>
            <div class="mmr-levels">
              ${Object.entries(strands).map(([st, v]) => { const p = pct(v[0], v[1]); return `
                <div class="mmr-level">
                  <span class="mmr-level-name">${esc(strandName(st, g))}</span>
                  <span class="mmr-bar"><span class="mmr-bar-fill mmr-${tone(p)}" style="width:${p ?? 0}%"></span></span>
                  <span class="mmr-level-p">${p == null ? '—' : p + '%'}</span>
                  <span class="mmr-level-n">${v[1]}</span>
                </div>`; }).join('')}
            </div>
          </section>
          <section class="mmr-block">
            <h3 class="mmr-h">Lessons to reteach</h3>
            ${reteach.length ? `<ol class="mmr-topics">${reteach.map(t => `
              <li class="mmr-topic">
                <span class="mmr-topic-name"><span class="mmr-ch">${esc(strandName(t.k.split('/')[0], g))}</span>${esc(lessonName(g, t.k))}</span>
                <span class="mmr-topic-p mmr-${tone(t.p)}">${t.p}%</span>
                <span class="mmr-topic-n">${t.weak} of ${t.learners} weak</span>
                ${t.weak ? `<button type="button" class="mmr-assign" data-k="${esc(t.k)}" title="Set this lesson as an assignment for the ${t.weak} weak learner${t.weak > 1 ? 's' : ''}">Assign</button>` : '<span></span>'}
              </li>`).join('')}</ol>` : `<p class="mmr-note">No lesson is below ${MASTERY}% for the class.</p>`}
          </section>
        </div>`}
        <div class="mmr-table-wrap">
          <table class="student-table mmr-table">
            <thead><tr>
              <th>Learner <span class="mmr-th-note">weakest first</span></th>
              <th>Lessons finished</th><th>Answered</th><th>Accuracy</th><th>Weak lessons</th><th>Last practised</th>
            </tr></thead>
            <tbody>${stats.map(x => {
              const name = x.s.display_name || x.s.email?.split('@')[0] || 'Learner';
              return `<tr>
                <td><span class="student-name">${esc(name)}</span></td>
                <td class="mmr-num">${totalFor(x) == null ? '—' : `${x.finished}<span class="mmr-of">/${totalFor(x)}</span>`}</td>
                <td class="mmr-num">${x.answered || '—'}</td>
                <td class="mmr-num">${x.acc == null ? '—' : `<span class="mmr-pill mmr-${tone(x.acc)}">${x.acc}%</span>`}</td>
                <td>${x.weak.length ? `<span class="mmr-weak-list">${x.weak.slice(0, 3).map(w => `<span class="mmr-chip" title="${w.p}% over the last ${w.n} answers">${esc(lessonName(g, w.k))}</span>`).join('')}${x.weak.length > 3 ? `<span class="mmr-more">+${x.weak.length - 3}</span>` : ''}</span>` : (x.n ? '<span class="mmr-none">None</span>' : '—')}</td>
                <td class="mmr-when${stale(x.updated) ? ' stale' : ''}">${ago(x.updated) || 'Never'}</td>
              </tr>`; }).join('')}</tbody>
          </table>
        </div>`;
      wrap.querySelectorAll('.mmr-grade').forEach(b => b.addEventListener('click', () => { state.grade = +b.dataset.g; render(); }));
      // Assign a weak lesson to just the learners who are weak in it (assignments form, pre-filled).
      wrap.querySelectorAll('.mmr-assign').forEach(b => b.addEventListener('click', () => {
        const t = reteach.find(x => x.k === b.dataset.k);
        if (!t || typeof window.openCreateAssignmentModal !== 'function') return;
        window.openCreateAssignmentModal({ classId: state.cls.id, tool: TOOL, title: 'Practise: ' + lessonName(g, t.k),
          refs: [`${prefix}:${g}:${t.k}`], studentIds: t.weakIds });
      }));
    }

    async function show(cls, students) {
      const wrap = document.getElementById(containerId);
      if (!wrap) return;
      const my = ++seq;
      state = null;
      wrap.innerHTML = '';
      if (!students?.length || !window.MagicLabAuth?.isLoggedIn()) return;
      wrap.innerHTML = `<div class="mmr-empty">Loading ${title} results…</div>`;
      const sb = window.MagicLabAuth._supabase();
      const res = await sb.from('lesson_results').select('user_id, grade, data, updated_at').eq('tool', TOOL).in('user_id', students.map(s => s.id));
      if (my !== seq) return;
      if (res.error) { wrap.innerHTML = `<div class="mmr-empty">Could not load ${title} results: ${esc(res.error.message)}</div>`; return; }
      state = { cls, students, rows: res.data || [] };
      // Start on the class's grade, else the grade with the most learners practising.
      const counts = {}; state.rows.forEach(r => { counts[r.grade] = (counts[r.grade] || 0) + 1; });
      const busiest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
      const own = grades.includes(cls.grade) ? cls.grade : null;
      state.grade = own && (counts[own] || !busiest) ? own : busiest ? +busiest : own || grades[0];
      render();
    }

    function clear() { seq++; state = null; const w = document.getElementById(containerId); if (w) w.innerHTML = ''; }

    return { show, clear };
  }

  window.TeacherScienceResults = card({ tool: 'science-sage', title: 'Science Sage', grades: [7, 8, 9, 10, 11, 12], index: 'SS_LESSON_INDEX', containerId: 'ss-class-results', prefix: 'ss' });
  window.TeacherTechResults = card({ tool: 'tech-tower', title: 'Tech Tower', grades: [8, 9], index: 'TT_LESSON_INDEX', containerId: 'tt-class-results', prefix: 'tt' });
  window.TeacherCodexResults = card({ tool: 'computer-codex', title: 'Computer Codex', grades: [8, 10, 11, 12], index: 'CC_LESSON_INDEX', containerId: 'cc-class-results', prefix: 'cc',
                                      gradeLabels: { 8: 'Gr 8–9' }, byTrack: true });
})();
