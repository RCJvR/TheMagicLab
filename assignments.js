// ============================================================
// THE MAGIC LAB — assignments.js
// Assignment-setting SDK — include after auth.js and progress.js
// Usage: <script src="auth.js"></script>
//        <script src="progress.js"></script>
//        <script src="assignments.js"></script>
//
// Requires the tables created by assignments-schema.sql
// (assignments, assignment_topics) to exist in Supabase.
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
 * @param {string[]} [opts.topics]    — specific lesson titles (exact match against
 *                                      progress_events.topic). Omit for a tool-wide
 *                                      assignment ("complete anything in this tool").
 */
async function createAssignment({ classId, tool, title, instructions = null, dueDate = null, topics = [] }) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  if (!auth.isTeacher())   return { error: { message: 'Only teachers can create assignments' } };
  if (!classId || !tool || !title) return { error: { message: 'classId, tool, and title are required' } };

  const supabase  = auth._supabase();
  const teacherId = auth.getProfile()?.id ?? auth.getSession()?.user?.id;

  const { data: assignment, error } = await supabase
    .from('assignments')
    .insert({ class_id: classId, teacher_id: teacherId, tool, title, instructions, due_date: dueDate })
    .select()
    .single();

  if (error) return { error };

  const cleanTopics = topics.map(t => t.trim()).filter(Boolean);
  if (cleanTopics.length) {
    const rows = cleanTopics.map(topic => ({ assignment_id: assignment.id, topic }));
    const { error: topicErr } = await supabase.from('assignment_topics').insert(rows);
    if (topicErr) return { error: topicErr };
  }

  return { data: { ...assignment, topics: cleanTopics } };
}

/**
 * All assignments for a class, each annotated with completion counts across
 * every current member of the class.
 */
async function getClassAssignments(classId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const supabase = auth._supabase();

  const { data: assignments, error } = await supabase
    .from('assignments')
    .select('*, assignment_topics(topic)')
    .eq('class_id', classId)
    .order('due_date', { ascending: true, nullsFirst: false });

  if (error) { console.warn('[MagicLab] getClassAssignments error:', error.message); return []; }
  if (!assignments?.length) return [];

  const students   = await auth.getClassStudents(classId);
  const studentIds = students.map(s => s.id);

  const results = [];
  for (const a of assignments) {
    const topics = (a.assignment_topics || []).map(t => t.topic);
    const { completedCount, perStudent } = await _computeCompletion(a, topics, studentIds);
    results.push({
      ...a, topics,
      completedCount,
      totalCount: studentIds.length,
      perStudent
    });
  }
  return results;
}

/**
 * Per-student completion breakdown for one assignment (teacher drill-down view).
 */
async function getAssignmentCompletion(assignmentId, classId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return null;
  const supabase = auth._supabase();

  const { data: assignment, error } = await supabase
    .from('assignments')
    .select('*, assignment_topics(topic)')
    .eq('id', assignmentId)
    .single();
  if (error || !assignment) return null;

  const students = await auth.getClassStudents(classId);
  const topics   = (assignment.assignment_topics || []).map(t => t.topic);
  const { perStudent } = await _computeCompletion(assignment, topics, students.map(s => s.id));

  return {
    assignment: { ...assignment, topics },
    students: students.map(s => ({ ...s, done: perStudent[s.id] || false }))
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
 * belongs to, annotated with this student's own completion + overdue status.
 */
async function getMyAssignments() {
  const auth = window.MagicLabAuth;
  console.log('[DEBUG-assignments] getMyAssignments called. auth exists:', !!auth, 'isLoggedIn:', auth?.isLoggedIn());
  if (!auth?.isLoggedIn()) { console.log('[DEBUG-assignments] bailing: not logged in'); return []; }
  const supabase = auth._supabase();
  const userId   = auth.getProfile()?.id ?? auth.getSession()?.user?.id;
  console.log('[DEBUG-assignments] userId:', userId);
  if (!userId) { console.log('[DEBUG-assignments] bailing: no userId'); return []; }

  const { data: memberships, error: memErr } = await supabase
    .from('class_members')
    .select('class_id, classes(name)')
    .eq('student_id', userId);

  console.log('[DEBUG-assignments] class_members query result — memberships:', memberships, 'error:', memErr);
  if (memErr) { console.warn('[MagicLab] getMyAssignments membership error:', memErr.message); return []; }
  if (!memberships?.length) { console.log('[DEBUG-assignments] bailing: memberships empty'); return []; }

  const classIds       = memberships.map(m => m.class_id);
  const classNameById  = Object.fromEntries(memberships.map(m => [m.class_id, m.classes?.name || 'Class']));

  const { data: assignments, error } = await supabase
    .from('assignments')
    .select('*, assignment_topics(topic)')
    .in('class_id', classIds)
    .order('due_date', { ascending: true, nullsFirst: false });

  if (error) { console.warn('[MagicLab] getMyAssignments error:', error.message); return []; }
  if (!assignments?.length) return [];

  const today = new Date().toISOString().slice(0, 10);
  const results = [];
  for (const a of assignments) {
    const topics = (a.assignment_topics || []).map(t => t.topic);
    const { perStudent } = await _computeCompletion(a, topics, [userId]);
    const done = perStudent[userId] || false;
    results.push({
      ...a, topics,
      className: classNameById[a.class_id],
      done,
      overdue: !!a.due_date && a.due_date < today && !done
    });
  }
  return results;
}

/**
 * Shared completion logic.
 * - With topics: a student is "done" once they have a lesson_complete
 *   progress_event for every listed topic (case/whitespace-insensitive match),
 *   logged any time after the assignment was created.
 * - Without topics (tool-wide assignment): a student is "done" once they have
 *   any lesson_complete event for that tool logged after the assignment was
 *   created — a coarser signal, since there's no single lesson to check.
 */
async function _computeCompletion(assignment, topics, studentIds) {
  const perStudent = {};
  studentIds.forEach(id => perStudent[id] = false);
  if (!studentIds.length) return { completedCount: 0, perStudent };

  const supabase = window.MagicLabAuth._supabase();
  const { data: events, error } = await supabase
    .from('progress_events')
    .select('user_id, topic, created_at')
    .eq('tool', assignment.tool)
    .eq('event_type', 'lesson_complete')
    .in('user_id', studentIds)
    .gte('created_at', assignment.created_at);

  if (error) { console.warn('[MagicLab] completion check error:', error.message); return { completedCount: 0, perStudent }; }

  if (topics.length) {
    const normTopics = new Set(topics.map(t => t.trim().toLowerCase()));
    const doneByStudent = {};
    (events || []).forEach(e => {
      if (!e.topic) return;
      const norm = e.topic.trim().toLowerCase();
      if (!normTopics.has(norm)) return;
      (doneByStudent[e.user_id] ??= new Set()).add(norm);
    });
    studentIds.forEach(id => {
      perStudent[id] = (doneByStudent[id]?.size || 0) >= normTopics.size;
    });
  } else {
    const doneStudents = new Set((events || []).map(e => e.user_id));
    studentIds.forEach(id => perStudent[id] = doneStudents.has(id));
  }

  const completedCount = Object.values(perStudent).filter(Boolean).length;
  return { completedCount, perStudent };
}
