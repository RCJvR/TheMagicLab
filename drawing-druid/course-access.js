// Drawing Druid — Course Drawings access.
//   Teachers: see every drawing with its full step-by-step memo, and set each drawing per class to
//             Locked / Open / Opens when the chapter is complete (table course_drawing_releases).
//             Teachers also get a class progress table: each learner's finished drawings per chapter,
//             and how many course drawings are open to them (CSV download).
//   Learners: see the task (step 1) and the rubric only. A drawing is available when
//             - a class they belong to has it Open, or
//             - it is on "chapter complete" (the default, and the rule for learners who are not in a
//               class, e.g. individual subscribers) and they have finished every drawing of its chapter.
// Needs: CONSTRUCTIONS / CONSTRUCTION_ORDER / CD_META (course-drawings.data.js), DD_CHAPTERS
// (chapter-manifest.js), DruidLesson (lesson-ui.js), and MagicLabAuth (auth.js) when signed in.
(function (global) {
  'use strict';
  const C = global.CONSTRUCTIONS, ORDER = global.CONSTRUCTION_ORDER, META = global.CD_META, CH = global.DD_CHAPTERS || {};
  const CE = global.ConstructionEngine;
  CE.addFinishSteps(C);
  const MEMO = {}; ORDER.forEach(id => { MEMO[id] = C[id].steps.slice(); });
  const MODES = [['auto', 'Opens when the chapter is complete'], ['open', 'Open'], ['locked', 'Locked']];
  const S = { ready: false, teacher: false, done: new Set(), releases: {}, inClass: false, classes: [], cls: null };
  const chapterName = ch => ch.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function learnerMode(id) {
    if (!S.inClass) return 'auto';
    const ms = Object.values(S.releases).map(r => r[id] || 'auto');
    if (ms.includes('open')) return 'open';
    if (ms.includes('auto')) return 'auto';
    return 'locked';
  }
  function chapterProgress(id) {
    const ids = CH[META[id].chapter] || [];
    return { total: ids.length, done: ids.filter(x => S.done.has(x)).length };
  }
  function locked(id) {
    if (!S.ready) return 'checking your access…';
    if (S.teacher) return null;
    const m = learnerMode(id);
    if (m === 'open') return null;
    if (m === 'locked') return 'your teacher has not released this course drawing yet.';
    const p = chapterProgress(id);
    if (p.total && p.done >= p.total) return null;
    return 'finish every drawing in the ' + chapterName(META[id].chapter) + ' chapter first (you have finished ' + p.done + ' of ' + p.total + '). Each drawing counts once you reach its finished step.';
  }

  function applyView() {
    ORDER.forEach(id => {
      if (S.teacher) C[id].steps = MEMO[id];
      else C[id].steps = MEMO[id].slice(0, 1).map(s => Object.assign({}, s, { instruction: s.instruction.replace(/^GIVEN:?\s*/i, 'TASK: ') }));
    });
  }

  function rubricHtml(id) {
    const m = META[id], tot = m.rubric.reduce((s, r) => s + r[1], 0);
    return '<div class="cd-rubric"><div class="cd-rubric-head">MARKING RUBRIC / NASIENRUBRIEK <span>Term ' + m.term + ' · ' + esc(chapterName(m.chapter)) + '</span></div><table>' +
      m.rubric.map(r => '<tr><td>' + esc(r[0]) + '</td><td>' + r[1] + '</td></tr>').join('') + '<tr class="cd-total"><td>TOTAL</td><td>' + tot + '</td></tr></table>' +
      (S.teacher ? '<p class="cd-note">You are seeing the full memo (all steps). Learners see only the task and this rubric.</p>' : '') + '</div>';
  }

  let lesson = null;
  function onRender(id) { const box = document.getElementById('cdRubric'); if (box) box.innerHTML = rubricHtml(id); }

  async function saveMode(classId, id, mode) {
    const sb = global.MagicLabAuth._supabase(), uid = global.MagicLabAuth.getSession().user.id;
    const { error } = await sb.from('course_drawing_releases').upsert({ class_id: classId, drawing_id: id, mode, updated_by: uid, updated_at: new Date().toISOString() });
    const st = document.getElementById('cdSaveState');
    if (st) st.textContent = error ? 'Could not save: ' + error.message : 'Saved.';
    if (!error) {
      (S.releases[classId] = S.releases[classId] || {})[id] = mode;
      const body = document.getElementById('cdProgressBody');
      if (body && PROG[classId]) renderProgress(classId, body);
    }
  }

  function teacherPanel() {
    const box = document.getElementById('cdTeacher');
    if (!box) return;
    if (!S.teacher) { box.innerHTML = ''; return; }
    if (!S.classes.length) { box.innerHTML = '<div class="cd-panel"><strong>Release settings.</strong> You have no classes yet. Learners who are not in a class get each drawing once they finish its chapter.</div>'; return; }
    const cls = S.cls || S.classes[0].id, rel = S.releases[cls] || {};
    box.innerHTML = '<details class="cd-panel" open><summary>Release settings for your class</summary>' +
      '<label class="cd-row">Class <select id="cdClass">' + S.classes.map(c => '<option value="' + c.id + '"' + (c.id === cls ? ' selected' : '') + '>' + esc(c.name) + '</option>').join('') + '</select> <span id="cdSaveState" class="cd-save"></span></label>' +
      '<table class="cd-rel">' + ORDER.map(id => '<tr><td>' + esc(C[id].title) + '</td><td><select data-id="' + id + '">' + MODES.map(([v, t]) => '<option value="' + v + '"' + ((rel[id] || 'auto') === v ? ' selected' : '') + '>' + t + '</option>').join('') + '</select></td></tr>').join('') + '</table></details>';
    box.insertAdjacentHTML('beforeend', '<details class="cd-panel" id="cdProgress" open><summary>Class progress</summary><div id="cdProgressBody" class="cd-prog-body">Loading…</div></details>' +
      '<details class="cd-panel" id="cdSubs"><summary>Learner drawings <span class="cd-save" id="cdSubsCount"></span></summary><div id="cdSubsBody">Loading…</div></details>');
    box.querySelector('#cdClass').onchange = e => { S.cls = e.target.value; teacherPanel(); };
    classProgress(cls);
    submissions(cls);
    box.querySelectorAll('select[data-id]').forEach(sel => { sel.onchange = () => saveMode(cls, sel.dataset.id, sel.value); });
  }

  // ── class progress (teachers): progress_events of their learners are readable under RLS ──
  const PROG = {};
  async function classProgress(classId) {
    const body = document.getElementById('cdProgressBody');
    if (!body) return;
    try {
      if (!PROG[classId]) {
        const sb = global.MagicLabAuth._supabase();
        const { data: mem, error: e1 } = await sb.from('class_members').select('student_id, profiles:student_id(display_name)').eq('class_id', classId);
        if (e1) throw e1;
        const learners = (mem || []).map(m => ({ id: m.student_id, name: (m.profiles && m.profiles.display_name) || 'Learner', done: new Set() }));
        if (learners.length) {
          const { data: ev, error: e2 } = await sb.from('progress_events').select('user_id, topic').in('user_id', learners.map(l => l.id))
            .eq('tool', 'drawing-druid').eq('event_type', 'lesson_complete').not('topic', 'is', null);
          if (e2) throw e2;
          const by = Object.fromEntries(learners.map(l => [l.id, l]));
          (ev || []).forEach(r => { if (by[r.user_id]) by[r.user_id].done.add(r.topic); });
        }
        learners.sort((a, b) => a.name.localeCompare(b.name));
        PROG[classId] = learners;
      }
      if (S.cls && S.cls !== classId) return;
      renderProgress(classId, body);
    } catch (err) {
      body.textContent = 'Could not load the progress: ' + (err.message || err);
    }
  }
  function progressRows(classId) {
    const chapters = Object.keys(CH).sort(), rel = S.releases[classId] || {};
    return { chapters, rows: PROG[classId].map(l => {
      const per = chapters.map(ch => [CH[ch].filter(id => l.done.has(id)).length, CH[ch].length]);
      const open = ORDER.filter(id => { const m = rel[id] || 'auto'; if (m === 'open') return true; if (m === 'locked') return false; const ids = CH[META[id].chapter] || []; return ids.length && ids.every(x => l.done.has(x)); }).length;
      return { name: l.name, per, total: per.reduce((t, p) => t + p[0], 0), open };
    }) };
  }
  function renderProgress(classId, body) {
    if (!PROG[classId].length) { body.textContent = 'No learners in this class yet.'; return; }
    const { chapters, rows } = progressRows(classId), all = chapters.reduce((t, ch) => t + CH[ch].length, 0);
    const cell = ([d, n]) => '<td class="cd-pc' + (d === n ? ' full' : d ? ' part' : '') + '" title="' + d + ' of ' + n + ' finished">' + (d ? d + '/' + n : '·') + '</td>';
    body.innerHTML = '<p class="cd-note" style="margin:0 0 8px">A drawing counts once the learner reaches its finished step. Course drawings open uses this class\u2019s release settings.</p>' +
      '<div class="cd-prog-scroll"><table class="cd-prog"><thead><tr><th>Learner</th><th>All</th><th>Course drawings open</th>' + chapters.map(ch => '<th class="cd-ch"><span>' + esc(chapterName(ch)) + '</span></th>').join('') + '</tr></thead><tbody>' +
      rows.map(r => '<tr><th>' + esc(r.name) + '</th><td class="cd-pt">' + r.total + '/' + all + '</td><td class="cd-pt">' + r.open + '/' + ORDER.length + '</td>' + r.per.map(cell).join('') + '</tr>').join('') +
      '</tbody></table></div><button type="button" class="cd-csv" id="cdCsv">Download CSV</button>';
    body.querySelector('#cdCsv').onclick = () => {
      const q = v => '"' + String(v).replace(/"/g, '""') + '"';
      const lines = [['Learner', 'Drawings finished', 'Course drawings open', ...chapters.map(chapterName)].map(q).join(',')]
        .concat(rows.map(r => [r.name, r.total + '/' + all, r.open + '/' + ORDER.length, ...r.per.map(p => p[0] + '/' + p[1])].map(q).join(',')));
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv' }));
      const c = S.classes.find(x => x.id === classId);
      a.download = 'drawing-druid-progress-' + ((c && c.name) || 'class').replace(/[^\w-]+/g, '-') + '.csv';
      document.body.appendChild(a); a.click(); a.remove();
    };
  }

  // ── learner drawings sent from "Check my drawing" (table drawing_submissions, bucket drawing-checks) ──
  async function submissions(classId) {
    const body = document.getElementById('cdSubsBody'), count = document.getElementById('cdSubsCount');
    if (!body) return;
    const sb = global.MagicLabAuth._supabase();
    const { data, error } = await sb.from('drawing_submissions').select('id, drawing_title, chapter, created_at, note, checklist, photo_path, teacher_comment, mark, reviewed_at, profiles:student_id(display_name)')
      .eq('class_id', classId).order('created_at', { ascending: false }).limit(60);
    if (S.cls && S.cls !== classId) return;
    if (error) { body.textContent = 'Could not load the drawings: ' + error.message; return; }
    const rows = data || [], waiting = rows.filter(r => !r.reviewed_at).length;
    count.textContent = rows.length ? '(' + waiting + ' waiting)' : '';
    if (!rows.length) { body.innerHTML = '<p class="cd-note" style="margin:0">No drawings yet. Learners send them from <strong>Check my drawing</strong> under any drawing.</p>'; return; }
    body.innerHTML = '<p class="cd-note" style="margin:0 0 8px">Each picture shows the learner\'s photo with the finished drawing over it in red, as they lined it up.</p><div class="cd-subs"></div>';
    const list = body.querySelector('.cd-subs');
    const urls = await sb.storage.from('drawing-checks').createSignedUrls(rows.map(r => r.photo_path), 3600);
    const urlOf = {}; ((urls && urls.data) || []).forEach(u => { if (u && u.path) urlOf[u.path] = u.signedUrl; });
    rows.forEach(r => {
      const card = document.createElement('div');
      card.className = 'cd-sub' + (r.reviewed_at ? '' : ' new');
      const ticks = (r.checklist || []), done = ticks.filter(t => t.done).length;
      card.innerHTML = '<a target="_blank" rel="noopener" class="cd-sub-img"><img alt="Learner drawing with the overlay"></a><div class="cd-sub-info">' +
        '<div class="cd-sub-head"><strong></strong> <span></span></div><div class="cd-sub-meta"></div><div class="cd-sub-note"></div>' +
        '<details><summary>Checklist ' + done + ' / ' + ticks.length + '</summary><ul></ul></details>' +
        '<div class="cd-row"><input type="text" maxlength="20" placeholder="Mark" class="cd-mark"><button type="button" class="cd-btn">Save</button><span class="cd-save"></span></div>' +
        '<textarea maxlength="1000" placeholder="Comment for the learner"></textarea></div>';
      const url = urlOf[r.photo_path];
      if (url) { card.querySelector('a').href = url; card.querySelector('img').src = url; }
      card.querySelector('strong').textContent = (r.profiles && r.profiles.display_name) || 'Learner';
      card.querySelector('.cd-sub-head span').textContent = r.drawing_title;
      card.querySelector('.cd-sub-meta').textContent = new Date(r.created_at).toLocaleString() + (r.reviewed_at ? ' · reviewed' : ' · waiting');
      card.querySelector('.cd-sub-note').textContent = r.note ? '“' + r.note + '”' : '';
      const ul = card.querySelector('ul'); ticks.forEach(t => { const li = document.createElement('li'); li.textContent = (t.done ? '✓ ' : '✗ ') + t.item; ul.appendChild(li); });
      const mark = card.querySelector('.cd-mark'), ta = card.querySelector('textarea'), st = card.querySelector('.cd-row .cd-save');
      mark.value = r.mark || ''; ta.value = r.teacher_comment || '';
      card.querySelector('.cd-btn').onclick = async () => {
        st.textContent = 'Saving…';
        const { error: e2 } = await sb.from('drawing_submissions').update({ mark: mark.value.trim() || null, teacher_comment: ta.value.trim() || null, reviewed_at: new Date().toISOString() }).eq('id', r.id);
        st.textContent = e2 ? 'Could not save: ' + e2.message : 'Saved. The learner sees it under the drawing.';
        if (!e2) card.classList.remove('new');
      };
      list.appendChild(card);
    });
  }

  async function load(profile) {
    const A = global.MagicLabAuth, sb = A && A._supabase && A._supabase(), sess = A && A.getSession && A.getSession();
    S.teacher = !!(A && A.isTeacher && A.isTeacher()) || (profile && profile.role === 'admin');
    if (sb && sess) {
      const uid = sess.user.id;
      if (S.teacher) {
        const { data: cls } = await sb.from('classes').select('id,name').eq('teacher_id', uid).order('created_at');
        S.classes = cls || [];
      } else {
        const { data: ev } = await sb.from('progress_events').select('topic').eq('user_id', uid).eq('tool', 'drawing-druid').eq('event_type', 'lesson_complete').not('topic', 'is', null);
        S.done = new Set((ev || []).map(r => r.topic));
        const { data: mem } = await sb.from('class_members').select('class_id').eq('student_id', uid);
        S.classes = (mem || []).map(m => ({ id: m.class_id }));
        S.inClass = S.classes.length > 0;
      }
      if (S.classes.length) {
        const { data: rel } = await sb.from('course_drawing_releases').select('class_id,drawing_id,mode').in('class_id', S.classes.map(c => c.id));
        S.classes.forEach(c => { S.releases[c.id] = {}; });
        (rel || []).forEach(r => { S.releases[r.class_id][r.drawing_id] = r.mode; });
      }
    }
    S.ready = true;
    applyView();
    teacherPanel();
    if (lesson) lesson.render();
    if (global.CDRebuild) global.CDRebuild(id => !locked(id));
  }

  global.CourseAccess = {
    _progressRows: progressRows, _PROG: PROG,   // for testing
    mount() {
      applyView();
      lesson = global.DruidLesson.mount({ order: ORDER, constructions: C, locked, onRender, show3d: () => S.teacher, selfCheck: () => S.teacher });   // the model and the overlay would give the answer away
      return lesson;
    },
    locked,
  };
  let started = false;
  const start = e => { if (started) return; started = true; load(e && e.detail && e.detail.profile).catch(err => { console.warn('[course drawings]', err); S.ready = true; if (lesson) lesson.render(); }); };
  document.addEventListener('magiclab:auth:ready', start);
  // signed out or auth unavailable: after a short wait, apply the learner rules with no progress
  setTimeout(() => { if (!started) start(null); }, 6000);
})(window);
