// Drawing Druid — Course Drawings access.
//   Teachers: see every drawing with its full step-by-step memo, and set each drawing per class to
//             Locked / Open / Opens when the chapter is complete (table course_drawing_releases).
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
    if (!error) { (S.releases[classId] = S.releases[classId] || {})[id] = mode; }
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
    box.querySelector('#cdClass').onchange = e => { S.cls = e.target.value; teacherPanel(); };
    box.querySelectorAll('select[data-id]').forEach(sel => { sel.onchange = () => saveMode(cls, sel.dataset.id, sel.value); });
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
    mount() {
      applyView();
      lesson = global.DruidLesson.mount({ order: ORDER, constructions: C, locked, onRender });
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
