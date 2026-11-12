// ══════════════════════════════════════════════════════════
// CLASS OVERVIEW — the top of the class detail view
// One answer, across every tool, to the questions a teacher asks first:
// who has done the work, who is struggling, how the class is doing on
// quizzes, which wrong answers the class shares, how much time learners
// spend, and what to reteach. The per-tool cards below it give the detail.
//
// Reads: lesson_results (Science Sage, Tech Tower, Computer Codex: every
// quiz answer, wrong answers chosen and time per lesson), mm_results
// (Math Magician practice) and tool_progress (lessons completed and quiz
// totals in the other tools). Teachers can read these rows only for
// learners in their own classes.
// ══════════════════════════════════════════════════════════
(function () {
  const MASTERY = 70, MIN_FOR_STATUS = 3, IDLE_DAYS = 7, STRUGGLE_ACC = 50, STRUGGLE_WEAK = 3;
  const LESSON_TOOLS = { 'science-sage': ['Science Sage', 'SS_LESSON_INDEX'], 'tech-tower': ['Tech Tower', 'TT_LESSON_INDEX'], 'computer-codex': ['Computer Codex', 'CC_LESSON_INDEX'] };
  const OTHER_TOOLS = { 'math-magician': 'Math Magician', 'java-genie': 'Java Genie', 'web-wizard': 'Web Wizard', 'code-conjurer': 'Code Conjurer', 'ai-oracle': 'AI Oracle', 'robot-realm': 'Robot Realm', 'model-mage': 'Model Mage', 'drawing-druid': 'Drawing Druid', 'spike-spellcaster': 'Spike Spellcaster' };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pct = (c, n) => n ? Math.round(c / n * 100) : null;
  const sum = arr => arr.reduce((a, b) => a + b, 0);
  const tone = p => p == null ? '' : p >= MASTERY ? 'good' : p >= 50 ? 'warn' : 'crit';
  const dur = s => (window.MLTeacherDur ? window.MLTeacherDur(s) : (s ? Math.round(s / 60) + ' min' : '—'));
  const days = iso => iso ? (Date.now() - new Date(iso).getTime()) / 86400000 : Infinity;
  function ago(iso) {
    if (!iso) return null;
    const d = Math.floor(days(iso));
    return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d + ' days ago';
  }
  const later = (a, b) => (!a ? b : !b ? a : (new Date(a) > new Date(b) ? a : b));
  function lessonName(tool, g, k) {
    const idx = window[(LESSON_TOOLS[tool] || [])[1]] || {};
    return idx[g]?.[k] || k.split('/').pop().replace(/-/g, ' ');
  }
  function topicName(g, tid) { const t = (window.MM_TOPIC_INDEX || {})[g]?.[tid]; return t ? t[0] : 'Topic ' + tid; }
  const gradeLabel = (tool, g) => tool === 'computer-codex' && +g === 8 ? 'Gr 8–9' : 'Gr ' + g;

  let seq = 0;

  function analyse(students, lessonRows, mmRows, progress, codingRows) {
    const by = {};
    students.forEach(s => { by[s.id] = { s, finished: 0, c: 0, n: 0, secs: 0, last: null, weak: [], tools: {}, any: false }; });
    const tool = (x, t) => (x.tools[t] = x.tools[t] || { c: 0, n: 0 });
    const reteach = {}, mis = {};

    lessonRows.forEach(r => {
      const x = by[r.user_id]; if (!x) return;
      x.last = later(x.last, r.updated_at);
      Object.entries(r.data?.l || {}).forEach(([k, L]) => {
        const res = Array.isArray(L.r) ? L.r : [], c = sum(res), T = tool(x, r.tool);
        x.any = true;
        x.c += c; x.n += res.length; T.c += c; T.n += res.length;
        if (L.d) x.finished++;
        x.secs += +L.s || 0;
        const id = r.tool + '|' + r.grade + '|' + k;
        const R = reteach[id] = reteach[id] || { name: lessonName(r.tool, r.grade, k), where: LESSON_TOOLS[r.tool][0] + ' · ' + gradeLabel(r.tool, r.grade), c: 0, n: 0, weak: 0, learners: 0 };
        R.c += c; R.n += res.length; R.learners++;
        if (res.length >= MIN_FOR_STATUS && pct(c, res.length) < MASTERY) {
          R.weak++;
          x.weak.push({ name: R.name, p: pct(c, res.length) });
        }
        Object.entries(L.w || {}).forEach(([qi, w]) => {
          if (!Array.isArray(w) || !w[1]) return;
          const mid = id + '|' + qi + '|' + w[1];
          const M = mis[mid] = mis[mid] || { name: R.name, where: R.where, q: w[0], a: w[1], n: 0 };
          M.n++;
        });
      });
    });

    mmRows.forEach(r => {
      const x = by[r.user_id]; if (!x) return;
      x.last = later(x.last, r.updated_at);
      const d = r.data || {}, T = tool(x, 'math-magician');
      Object.values(d.s || {}).forEach(v => { x.secs += +v || 0; if (v) x.any = true; });
      Object.values(d.l || {}).forEach(v => { if (Array.isArray(v) && v[1]) { x.any = true; x.c += v[0]; x.n += v[1]; T.c += v[0]; T.n += v[1]; } });
      Object.entries(d.t || {}).forEach(([tid, arr]) => {
        if (!Array.isArray(arr) || !arr.length) return;
        const c = sum(arr), id = 'mm|' + r.grade + '|' + tid;
        const R = reteach[id] = reteach[id] || { name: topicName(r.grade, tid), where: 'Math Magician · Gr ' + r.grade, c: 0, n: 0, weak: 0, learners: 0 };
        R.c += c; R.n += arr.length; R.learners++;
        if (arr.length >= MIN_FOR_STATUS && pct(c, arr.length) < MASTERY) { R.weak++; x.weak.push({ name: R.name, p: pct(c, arr.length) }); }
      });
    });

    // Code Conjurer and Java Genie: time spent typing and running programs.
    (codingRows || []).forEach(r => {
      const x = by[r.user_id]; if (!x) return;
      x.last = later(x.last, r.updated_at);
      Object.values(r.data?.l || {}).forEach(L => { if (+L.s) { x.secs += +L.s; x.any = true; } });
    });

    (progress || []).forEach(p => {
      const x = by[p.user_id]; if (!x || !OTHER_TOOLS[p.tool]) return;
      x.last = later(x.last, p.last_active);
      x.finished += p.topics_complete || 0;
      if (p.topics_complete || p.quiz_total || p.code_runs) x.any = true;
      // Math Magician answers come from mm_results above.
      if (p.tool !== 'math-magician' && p.quiz_total) {
        const T = tool(x, p.tool);
        x.c += p.quiz_correct || 0; x.n += p.quiz_total; T.c += p.quiz_correct || 0; T.n += p.quiz_total;
      }
    });

    const learners = Object.values(by).map(x => {
      x.acc = pct(x.c, x.n);
      x.weak.sort((a, b) => a.p - b.p);
      const reasons = [];
      if (x.n >= 8 && x.acc < STRUGGLE_ACC) reasons.push(`${x.acc}% of answers right`);
      if (x.weak.length >= STRUGGLE_WEAK) reasons.push(`weak in ${x.weak.length} lessons or topics`);
      x.reasons = reasons;
      x.status = !x.any ? 'none' : reasons.length ? 'struggling' : days(x.last) > IDLE_DAYS ? 'idle' : 'ok';
      return x;
    });
    const order = { struggling: 0, idle: 1, ok: 2, none: 3 };
    learners.sort((a, b) => order[a.status] - order[b.status] || (a.acc ?? 101) - (b.acc ?? 101));

    const toolAcc = {};
    learners.forEach(x => Object.entries(x.tools).forEach(([t, v]) => { const A = toolAcc[t] = toolAcc[t] || [0, 0]; A[0] += v.c; A[1] += v.n; }));
    const reteachList = Object.values(reteach).filter(R => R.weak >= 2 || (R.learners >= 2 && pct(R.c, R.n) < MASTERY))
      .map(R => Object.assign(R, { p: pct(R.c, R.n) })).sort((a, b) => b.weak - a.weak || a.p - b.p).slice(0, 6);
    const misList = Object.values(mis).filter(M => M.n >= 2).sort((a, b) => b.n - a.n).slice(0, 4);
    return { learners, toolAcc, reteachList, misList };
  }

  const STATUS = { struggling: ['Struggling', 'crit'], idle: [`Inactive ${IDLE_DAYS}+ days`, 'warn'], ok: ['On track', 'good'], none: ['Not started', ''] };
  const toolName = t => (LESSON_TOOLS[t] || [])[0] || OTHER_TOOLS[t] || t;

  function render(wrap, a, total) {
    const L = a.learners, active = L.filter(x => x.any), timed = L.filter(x => x.secs > 0);
    const struggling = L.filter(x => x.status === 'struggling');
    const classC = sum(L.map(x => x.c)), classN = sum(L.map(x => x.n)), classP = pct(classC, classN);
    wrap.innerHTML = `
      <div class="mmr-head">
        <div>
          <div class="mmr-title">Class overview</div>
          <div class="mmr-sub">Every tool together: Science Sage, Tech Tower, Computer Codex, Math Magician, Java Genie, Web Wizard, Code Conjurer, AI Oracle, Robot Realm, Model Mage, Drawing Druid and Spike Spellcaster. Time counts active use of lessons and Math Magician, and typing or running programs in Code Conjurer and Java Genie. The cards below give each tool in detail.</div>
        </div>
      </div>
      ${!active.length ? `<div class="mmr-empty">No learner in this class has used a tool while signed in yet.</div>` : `
      <div class="mmr-summary">
        <div class="mmr-stat"><div class="mmr-stat-v">${active.length}<span>/${total}</span></div><div class="mmr-stat-l">learners active</div></div>
        <div class="mmr-stat"><div class="mmr-stat-v">${sum(L.map(x => x.finished)).toLocaleString()}</div><div class="mmr-stat-l">lessons completed</div></div>
        <div class="mmr-stat"><div class="mmr-stat-v mmr-${tone(classP)}">${classP == null ? '—' : classP + '%'}</div><div class="mmr-stat-l">average quiz score</div></div>
        <div class="mmr-stat"><div class="mmr-stat-v${struggling.length ? ' mmr-crit' : ''}">${struggling.length}</div><div class="mmr-stat-l">struggling</div></div>
        <div class="mmr-stat"><div class="mmr-stat-v">${timed.length ? dur(sum(timed.map(x => x.secs)) / timed.length) : '—'}</div><div class="mmr-stat-l">average time in tools</div></div>
      </div>
      <div class="mmr-cols">
        <section class="mmr-block">
          <h3 class="mmr-h">Needs attention</h3>
          ${struggling.length ? `<ol class="mmr-topics">${struggling.slice(0, 8).map(x => `
            <li class="mmr-topic mco-need">
              <span class="mmr-topic-name">${esc(x.s.display_name || x.s.email?.split('@')[0] || 'Learner')}</span>
              <span class="mco-why">${esc(x.reasons.join('; '))}${x.weak.length ? ' · ' + esc(x.weak.slice(0, 2).map(w => w.name).join(', ')) : ''}</span>
            </li>`).join('')}</ol>` : `<p class="mmr-note">No learner is below ${STRUGGLE_ACC}% overall or weak in ${STRUGGLE_WEAK} or more lessons.</p>`}
        </section>
        <section class="mmr-block">
          <h3 class="mmr-h">Reteach across tools</h3>
          ${a.reteachList.length ? `<ol class="mmr-topics">${a.reteachList.map(t => `
            <li class="mmr-topic mco-re">
              <span class="mmr-topic-name"><span class="mmr-ch">${esc(t.where)}</span>${esc(t.name)}</span>
              <span class="mmr-topic-p mmr-${tone(t.p)}">${t.p}%</span>
              <span class="mmr-topic-n">${t.weak} of ${t.learners} weak</span>
            </li>`).join('')}</ol>` : `<p class="mmr-note">Nothing needs reteaching yet: no lesson or topic has two or more weak learners.</p>`}
        </section>
      </div>
      <div class="mmr-cols">
        <section class="mmr-block">
          <h3 class="mmr-h">Quiz score by tool</h3>
          <div class="mmr-levels">
            ${Object.entries(a.toolAcc).filter(([, v]) => v[1]).sort((x, y) => y[1][1] - x[1][1]).map(([t, v]) => { const p = pct(v[0], v[1]); return `
              <div class="mmr-level mco-level">
                <span class="mmr-level-name">${esc(toolName(t))}</span>
                <span class="mmr-bar"><span class="mmr-bar-fill mmr-${tone(p)}" style="width:${p ?? 0}%"></span></span>
                <span class="mmr-level-p">${p == null ? '—' : p + '%'}</span>
                <span class="mmr-level-n">${v[1]}</span>
              </div>`; }).join('') || '<p class="mmr-note">No quiz answers yet.</p>'}
          </div>
        </section>
        <section class="mmr-block">
          <h3 class="mmr-h">Common misconceptions</h3>
          ${a.misList.length ? `<ol class="mmr-topics">${a.misList.map(m => `
            <li class="mco-mis">
              <span class="mmr-ch">${esc(m.where)} · ${esc(m.name)}</span>
              ${m.q ? `<span class="mmr-mis-q">${esc(m.q)}</span>` : ''}
              <span class="mmr-mis-a"><b>${m.n}</b> learners chose <q>${esc(m.a)}</q></span>
            </li>`).join('')}</ol>` : `<p class="mmr-note">No wrong answer is shared by two or more learners yet. Wrong answers are recorded in lesson quizzes from 12 November 2026.</p>`}
        </section>
      </div>`}
      <div class="mmr-table-wrap">
        <table class="student-table mmr-table">
          <thead><tr>
            <th>Learner <span class="mmr-th-note">struggling first</span></th>
            <th>Status</th><th>Lessons completed</th><th>Quiz score</th><th>Time in tools</th><th>Needs help with</th><th>Last active</th>
          </tr></thead>
          <tbody>${L.map(x => {
            const [label, cls] = STATUS[x.status];
            return `<tr>
              <td><span class="student-name">${esc(x.s.display_name || x.s.email?.split('@')[0] || 'Learner')}</span></td>
              <td><span class="mco-status${cls ? ' mmr-' + cls : ''}">${label}</span></td>
              <td class="mmr-num">${x.finished || '—'}</td>
              <td class="mmr-num">${x.acc == null ? '—' : `<span class="mmr-pill mmr-${tone(x.acc)}">${x.acc}%</span>`}</td>
              <td class="mmr-num">${dur(x.secs)}</td>
              <td>${x.weak.length ? `<span class="mmr-weak-list">${x.weak.slice(0, 3).map(w => `<span class="mmr-chip" title="${w.p}% right">${esc(w.name)}</span>`).join('')}${x.weak.length > 3 ? `<span class="mmr-more">+${x.weak.length - 3}</span>` : ''}</span>` : (x.any ? '<span class="mmr-none">Nothing yet</span>' : '—')}</td>
              <td class="mmr-when${days(x.last) > IDLE_DAYS ? ' stale' : ''}">${ago(x.last) || 'Never'}</td>
            </tr>`; }).join('')}</tbody>
        </table>
      </div>`;
  }

  async function show(cls, students, progress) {
    const wrap = document.getElementById('class-overview');
    if (!wrap) return;
    const my = ++seq;
    wrap.innerHTML = '';
    if (!students?.length || !window.MagicLabAuth?.isLoggedIn()) return;
    wrap.innerHTML = '<div class="mmr-empty">Loading the class overview…</div>';
    const sb = window.MagicLabAuth._supabase(), ids = students.map(s => s.id);
    const [lr, mm] = await Promise.all([
      sb.from('lesson_results').select('user_id, tool, grade, data, updated_at').in('user_id', ids),
      sb.from('mm_results').select('user_id, grade, data, updated_at').in('user_id', ids)
    ]);
    if (my !== seq) return;
    if (lr.error && mm.error) { wrap.innerHTML = `<div class="mmr-empty">Could not load the class overview: ${esc(lr.error.message)}</div>`; return; }
    const lessonRows = (lr.data || []).filter(r => LESSON_TOOLS[r.tool]);
    const codingRows = (lr.data || []).filter(r => r.tool === 'code-conjurer' || r.tool === 'java-genie');
    render(wrap, analyse(students, lessonRows, mm.data || [], progress, codingRows), students.length);
  }
  function clear() { seq++; const w = document.getElementById('class-overview'); if (w) w.innerHTML = ''; }

  window.TeacherClassOverview = { show, clear, _analyse: analyse };
})();
