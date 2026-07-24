// ============================================================
// THE MAGIC LAB — help-chat.js
// Student ↔ teacher help chat SDK — include after auth.js
// Usage: <script src="auth.js"></script>
//        <script src="help-chat.js"></script>
//
// Requires the tables/functions created by help-schema.sql
// (help_threads, help_messages, get_my_teachers, etc.) to exist in
// Supabase. There is no student-to-student chat — see social.js for
// friends and lesson invites.
// ============================================================

document.addEventListener('magiclab:auth:ready', () => {
  window.MagicLabHelpChat = {
    getMyTeachers,
    openHelpThread,
    getThreadMessages,
    sendHelpMessage,
    markThreadRead,
    getTeacherHelpThreads,
  };
  document.dispatchEvent(new CustomEvent('magiclab:helpchat:ready'));
});

/** Student-facing: every class the current student belongs to, with that class's teacher. */
async function getMyTeachers() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const { data, error } = await auth._supabase().rpc('get_my_teachers');
  if (error) { console.warn('[MagicLab] getMyTeachers error:', error.message); return []; }
  return (data || []).map(r => ({
    classId: r.class_id, className: r.class_name,
    teacherId: r.teacher_id, teacherName: r.teacher_name,
  }));
}

/** Student-facing: find or create the help thread for a class. Returns the thread id. */
async function openHelpThread(classId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const { data, error } = await auth._supabase().rpc('get_or_create_help_thread', { p_class_id: classId });
  if (error) return { error };
  return { data: { threadId: data } };
}

/** Messages in a thread, oldest first. Works for either participant. */
async function getThreadMessages(threadId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const { data, error } = await auth._supabase()
    .from('help_messages')
    .select('id, sender_id, body, created_at, read_at')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });
  if (error) { console.warn('[MagicLab] getThreadMessages error:', error.message); return []; }
  return data || [];
}

async function sendHelpMessage(threadId, body) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return { error: { message: 'Not logged in' } };
  const senderId = auth.getProfile()?.id ?? auth.getSession()?.user?.id;
  const trimmed  = (body || '').trim();
  if (!trimmed) return { error: { message: 'Message is empty' } };
  const { data, error } = await auth._supabase()
    .from('help_messages')
    .insert({ thread_id: threadId, sender_id: senderId, body: trimmed })
    .select()
    .single();
  return { data, error };
}

/** Marks every message in a thread not sent by the caller as read. */
async function markThreadRead(threadId) {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return;
  const { error } = await auth._supabase().rpc('mark_help_thread_read', { p_thread_id: threadId });
  if (error) console.warn('[MagicLab] markThreadRead error:', error.message);
}

/** Teacher-facing: every help thread across the teacher's classes, newest activity first. */
async function getTeacherHelpThreads() {
  const auth = window.MagicLabAuth;
  if (!auth?.isLoggedIn()) return [];
  const { data, error } = await auth._supabase().rpc('get_teacher_help_threads');
  if (error) { console.warn('[MagicLab] getTeacherHelpThreads error:', error.message); return []; }
  return (data || []).map(r => ({
    threadId: r.thread_id, classId: r.class_id, className: r.class_name,
    studentId: r.student_id, studentName: r.student_name,
    lastMessageAt: r.last_message_at, unreadCount: r.unread_count,
  }));
}
