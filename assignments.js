// ============================================================
// THE MAGIC LAB — assignments.js
// Assignment-setting SDK — include after auth.js and progress.js
// Usage: <script src="auth.js"></script>
//        <script src="progress.js"></script>
//        <script src="assignments.js"></script>
//
// Requires the tables created by assignments-schema.sql
// (assignments, assignment_topics) to exist in Supabase.
//
// An assigned lesson with a `ref` (its fixed id from lesson-catalog.js:
// mm:<grade>:<topic id>, ss:/tt:<grade>:<strand/file>) is matched on that id,
// in either language, and gets a score from the learner's saved results
// (mm_results for Math Magician, lesson_results for Science Sage and Tech
// Tower). Older assignments without refs are matched by lesson name.
// An assignment with student_ids is only for those learners of the class.
// ============================================================

document.addEventListener('magiclab:auth:ready', () => {
  window.MagicLabAssignments = {
    createAssignment,
    getClassAssignments,
    getAssignmentCompletion,
    deleteAssignment,
    getMyAssignments
  };
  document.dispatchEvent(new CustomEvent('magiclab:assignments:ready'));
});

/**
 * Create an assignment for a class.
 * @param {Object} opts
 * @param {string} opts.classId
 * @param {string} opts.tool          — one of window.ML_TOOLS (see progress.js)
 * @param {string} opts.title
 * @param {string} [opts.instructions]
 * @param {string} [opts.dueDate]     — ISO date, e.g. '2026-08-01'
 * @param {Array<string|{topic:string, ref?:string}>} [opts.topics]
 *                                    — the lessons to do: a name (matched against
 *                                      progress_events.topic) or { topic, ref }.
 *                                      Omit for a tool-wide assignment
 *                                      ("complete anything in this tool").
 * @param {string[]} [opts.studentIds] — only these learners; omit for the whole class.
 */
async function createAssignment({ classId, tool, title, instructions = null, dueDate = null, topics = [], studentIds = null }) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  if (!auth.isTeacher())   return { error: { message: 'Only teachers can create assignments' } };
  if (!classId || !tool || !title) return { error: { message: 'classId, tool, and title are required' } };

  const supabase  = auth._supabase();
  const teacherId = auth.getProfile()?.id ?? auth.getSession()?.user?.id;

  const { data: assignment, error } = await supabase
    .from('assignments')
    .insert({ class_id: classId, teacher_id: teacherId, tool, title, instructions, due_date: dueDate,
              student_ids: studentIds && studentIds.length ? studentIds : null })
    .select()
    .single();

  if (error) return { error };

  const rows = topics
    .map(t => typeof t === 'string' ? { topic: t.trim() } : { topic: (t.topic || '').trim(), ref: t.ref || null })
    .filter(t => t.topic);
  if (rows.length) {
    const { error: topicErr } = await supabase.from('assignment_topics')
      .insert(rows.map(r => ({ assignment_id: assignment.id, topic: r.topic, ref: r.ref || null })));
    if (topicErr) return { error: topicErr };
  }

  return { data: { ...assignment, topics: rows.map(r => r.topic), items: rows } };
}

/**
 * All assignments for a class, each annotated with completion counts and the
 * class's average score across the learners it is for.
 */
async function getClassAssignments(classId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const supabase = auth._supabase();

  const { data: assignments, error } = await supabase
    .from('assignments')
    .select('*, assignment_topics(topic, ref)')
    .eq('class_id', classId)
    .order('due_date', { ascending: true, nullsFirst: false });

  if (error) { console.warn('[MagicLab] getClassAssignments error:', error.message); return []; }
  if (!assignments?.length) return [];

  const students   = await auth.getClassStudents(classId);
  const studentIds = students.map(s => s.id);
  const data = await _loadProgress(assignments, studentIds);

  return assignments.map(a => {
    const items = _items(a);
    const forIds = _targets(a, studentIds);
    const { completedCount, perStudent, classScore } = _computeCompletion(a, items, forIds, data);
    return {
      ...a, items, topics: items.map(i => i.topic),
      completedCount,
      totalCount: forIds.length,
      classScore,
      perStudent
    };
  });
}

/**
 * Per-learner breakdown for one assignment (teacher drill-down view):
 * each learner's done flag, score and per-lesson results.
 */
async function getAssignmentCompletion(assignmentId, classId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return null;
  const supabase = auth._supabase();

  const { data: assignment, error } = await supabase
    .from('assignments')
    .select('*, assignment_topics(topic, ref)')
    .eq('id', assignmentId)
    .single();
  if (error || !assignment) return null;

  const students = await auth.getClassStudents(classId);
  const forIds   = _targets(assignment, students.map(s => s.id));
  const items    = _items(assignment);
  const data     = await _loadProgress([assignment], forIds);
  const { perStudent } = _computeCompletion(assignment, items, forIds, data);

  return {
    assignment: { ...assignment, items, topics: items.map(i => i.topic) },
    students: students.filter(s => forIds.includes(s.id)).map(s => ({ ...s, ...perStudent[s.id] }))
  };
}

/**
 * Delete an assignment. RLS restricts this to the owning teacher.
 */
async function deleteAssignment(assignmentId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const supabase = auth._supabase();
  const { error } = await supabase.from('assignments').delete().eq('id', assignmentId);
  return { error };
}

/**
 * Student-facing: every assignment across every class the current student
 * belongs to (only the ones meant for them), annotated with this student's
 * own completion, score, per-lesson results and overdue status.
 */
async function getMyAssignments() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const supabase = auth._supabase();
  const userId   = auth.getProfile()?.id ?? auth.getSession()?.user?.id;
  if (!userId) return [];

  const { data: memberships, error: memErr } = await supabase
    .from('class_members')
    .select('class_id, classes(name)')
    .eq('student_id', userId);

  if (memErr) { console.warn('[MagicLab] getMyAssignments membership error:', memErr.message); return []; }
  if (!memberships?.length) return [];

  const classIds       = memberships.map(m => m.class_id);
  const classNameById  = Object.fromEntries(memberships.map(m => [m.class_id, m.classes?.name || 'Class']));

  const { data: assignments, error } = await supabase
    .from('assignments')
    .select('*, assignment_topics(topic, ref)')
    .in('class_id', classIds)
    .order('due_date', { ascending: true, nullsFirst: false });

  if (error) { console.warn('[MagicLab] getMyAssignments error:', error.message); return []; }
  if (!assignments?.length) return [];

  const data  = await _loadProgress(assignments, [userId]);
  const today = new Date().toISOString().slice(0, 10);
  return assignments.map(a => {
    const items = _items(a);
    const mine  = _computeCompletion(a, items, [userId], data).perStudent[userId];
    return {
      ...a, items, topics: items.map(i => i.topic),
      className: classNameById[a.class_id],
      done: mine.done,
      score: mine.score,
      results: mine.items,
      overdue: !!a.due_date && a.due_date < today && !mine.done
    };
  });
}

// ── Shared completion and score logic ─────────────────────────

function _items(a) {
  return (a.assignment_topics || []).map(t => ({ topic: t.topic, ref: t.ref || null }));
}
// The learners an assignment is for: its own list (still in the class), or the whole class.
function _targets(a, classIds) {
  return a.student_ids && a.student_ids.length ? classIds.filter(id => a.student_ids.includes(id)) : classIds;
}
function _parseRef(ref) {
  const m = ref && ref.match(/^(mm|ss|tt|cc):(\d+):(.+)$/);
  return m ? { kind: m[1], grade: +m[2], key: m[3] } : null;
}
const _pct = arr => Array.isArray(arr) && arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length * 100) : null;

/**
 * One round of queries for a set of assignments and learners: lesson_complete
 * events since the oldest assignment, and the saved results rows the refs need.
 * Each source fails soft (empty), so completion still works without it.
 */
async function _loadProgress(assignments, studentIds) {
  const out = { events: [], mm: [], lessons: [] };
  if (!studentIds.length || !assignments.length) return out;
  const supabase = window.MagicLabAuth._supabase();
  const tools  = [...new Set(assignments.map(a => a.tool))];
  const since  = assignments.map(a => a.created_at).sort()[0];
  const refs   = assignments.flatMap(a => _items(a).map(i => _parseRef(i.ref)).filter(Boolean));
  const kinds  = new Set(refs.map(r => r.kind));

  const jobs = [
    supabase.from('progress_events').select('user_id, tool, topic, grade, metadata, created_at')
      .in('tool', tools).eq('event_type', 'lesson_complete').in('user_id', studentIds).gte('created_at', since)
      .then(r => { if (r.error) console.warn('[MagicLab] completion check error:', r.error.message); else out.events = r.data || []; })
  ];
  if (kinds.has('mm')) jobs.push(
    supabase.from('mm_results').select('user_id, grade, data').in('user_id', studentIds)
      .then(r => { if (!r.error) out.mm = r.data || []; }));
  if (kinds.has('ss') || kinds.has('tt') || kinds.has('cc')) jobs.push(
    supabase.from('lesson_results').select('user_id, tool, grade, data').in('user_id', studentIds)
      .then(r => { if (!r.error) out.lessons = r.data || []; }));
  await Promise.all(jobs);
  return out;
}

/**
 * Completion and scores for one assignment.
 * - A lesson with a ref is done once it is finished after the assignment was
 *   set: a lesson_complete event with that topic id and grade (Math Magician),
 *   or the lesson's quiz finished (Science Sage, Tech Tower, Computer Codex). Its score is the
 *   learner's recent accuracy on it.
 * - A lesson without a ref is done once there is a lesson_complete event with
 *   that name (case/whitespace-insensitive) after the assignment was set.
 * - With no lessons (tool-wide assignment), a learner is done once they have
 *   any lesson_complete event for that tool after the assignment was set.
 * A learner is done when every lesson is; their score is the average over the
 * lessons they have attempted.
 */
function _computeCompletion(assignment, items, studentIds, data) {
  const created = new Date(assignment.created_at).getTime();
  const events = data.events.filter(e => e.tool === assignment.tool && new Date(e.created_at).getTime() >= created);
  const perStudent = {};
  const scores = [];

  studentIds.forEach(id => {
    const mine = events.filter(e => e.user_id === id);
    let res;
    if (!items.length) {
      res = { done: mine.length > 0, items: [], score: null };
    } else {
      const results = items.map(it => {
        const r = _parseRef(it.ref);
        if (!r) {
          const name = it.topic.trim().toLowerCase();
          return { ...it, done: mine.some(e => e.topic && e.topic.trim().toLowerCase() === name), score: null, n: 0 };
        }
        if (r.kind === 'mm') {
          const tid = +r.key;
          const row = data.mm.find(x => x.user_id === id && x.grade === r.grade);
          const arr = row?.data?.t?.[tid];
          return { ...it, done: mine.some(e => e.grade === r.grade && +e.metadata?.topicId === tid),
                   score: _pct(arr), n: Array.isArray(arr) ? arr.length : 0 };
        }
        const tool = { ss: 'science-sage', tt: 'tech-tower', cc: 'computer-codex' }[r.kind];
        const row = data.lessons.find(x => x.user_id === id && x.tool === tool && x.grade === r.grade);
        const L = row?.data?.l?.[r.key];
        return { ...it, done: !!(L && L.d && L.d >= created), score: _pct(L?.r), n: L?.r?.length || 0 };
      });
      const tried = results.filter(x => x.score != null);
      res = { done: results.every(x => x.done), items: results,
              score: tried.length ? Math.round(tried.reduce((a, x) => a + x.score, 0) / tried.length) : null };
    }
    res.started = res.done || res.items.some(x => x.n > 0 || x.done);
    if (res.score != null) scores.push(res.score);
    perStudent[id] = res;
  });

  const completedCount = Object.values(perStudent).filter(s => s.done).length;
  const classScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  return { completedCount, perStudent, classScore };
}
