/* Grading Grimoire tab in the teacher dashboard.
   Every written task across the teacher's classes (owned and co-taught), with what still needs
   marking first. Links to set a task, mark it and edit it. Loads when the tab opens. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const when = ts => ts ? new Date(ts).toLocaleString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
  const HANDED = ['submitted', 'marking', 'returned'];
  let loading = null;

  async function load() {
    if (loading) return loading;
    loading = (async () => {
      const host = $('gg-tab-list'); if (!host) return;
      const A = window.MagicLabAuth;
      if (!A || !A.isLoggedIn()) return;
      host.innerHTML = '<div class="empty-state"><h3>Loading written tasks…</h3></div>';
      const sb = A._supabase();
      const classes = await A.getMyClasses();
      if (!classes.length) { host.innerHTML = '<div class="empty-state"><h3>No classes yet</h3><p>Create a class on the My Classes tab first.</p></div>'; return; }
      const byClass = Object.fromEntries(classes.map(c => [c.id, c]));
      const { data: tasks, error } = await sb.from('assignments').select('id, class_id, title, due_at, total_marks, submission_mode, student_ids, created_at')
        .eq('kind', 'written').in('class_id', classes.map(c => c.id));
      if (error) { host.innerHTML = '<div class="empty-state"><h3>Could not load written tasks</h3><p>' + esc(error.message) + '</p></div>'; return; }
      if (!tasks.length) {
        host.innerHTML = '<div class="empty-state"><h3>No written tasks yet</h3><p>Set one with "+ New written task". Learners write online or upload a PDF or photos, and you mark it here.</p></div>';
        return;
      }
      const ids = tasks.map(t => t.id);
      const [{ data: subs }, { data: roster }] = await Promise.all([
        sb.from('submissions').select('id, assignment_id, status, released_at').in('assignment_id', ids),
        sb.from('class_roster').select('class_id, student_id, active').in('class_id', [...new Set(tasks.map(t => t.class_id))])
      ]);
      const subIds = (subs || []).map(s => s.id);
      const { data: marks } = subIds.length ? await sb.from('submission_marks').select('submission_id, score').in('submission_id', subIds) : { data: [] };
      const scored = new Set((marks || []).filter(m => m.score != null).map(m => m.submission_id));

      const rows = tasks.map(t => {
        const mine = (subs || []).filter(s => s.assignment_id === t.id);
        const handed = mine.filter(s => HANDED.includes(s.status));
        const marked = handed.filter(s => scored.has(s.id));
        const returned = handed.filter(s => s.released_at);
        const learners = t.student_ids && t.student_ids.length ? t.student_ids.length
          : (roster || []).filter(r => r.class_id === t.class_id && r.active && r.student_id).length;
        return { t, handed: handed.length, toMark: handed.length - marked.length, marked: marked.length, returned: returned.length,
                 unreturned: marked.length - returned.length, learners };
      }).sort((a, b) => (b.toMark > 0) - (a.toMark > 0) || (b.unreturned > 0) - (a.unreturned > 0) || String(b.t.due_at).localeCompare(String(a.t.due_at)));

      const toMark = rows.reduce((n, r) => n + r.toMark, 0), unreturned = rows.reduce((n, r) => n + r.unreturned, 0);
      $('gg-tab-summary').textContent = toMark || unreturned
        ? [toMark ? toMark + ' piece' + (toMark === 1 ? '' : 's') + ' to mark' : '', unreturned ? unreturned + ' marked but not returned' : ''].filter(Boolean).join(' · ')
        : 'Nothing waiting to be marked.';
      const now = Date.now();
      host.innerHTML = rows.map(r => {
        const t = r.t, cls = byClass[t.class_id], past = t.due_at && new Date(t.due_at).getTime() < now;
        const pct = r.learners ? Math.round(r.handed / r.learners * 100) : 0;
        const mode = t.submission_mode === 'upload' ? 'PDF or photos' : t.submission_mode === 'either' ? 'online or upload' : 'written online';
        const status = r.toMark ? '<span class="assign-score" style="color:var(--warn,#f5b23d)">' + r.toMark + ' to mark</span>'
          : r.unreturned ? '<span class="assign-score">' + r.unreturned + ' ready to return</span>'
          : r.handed ? '<span class="assign-score" style="color:var(--good,#4acf7f)">all marked</span>' : '';
        return '<div class="assignment-card">' +
          '<div class="assignment-card-top"><div>' +
            '<div class="assignment-title">' + esc(t.title) + '</div>' +
            '<div class="assignment-meta"><span>' + esc(cls ? cls.name : 'Class') + '</span><span>· ' + esc(String(t.total_marks)) + ' marks</span><span>· ' + mode + '</span>' +
              (t.due_at ? '<span class="assignment-due' + (past && r.handed < r.learners ? ' overdue' : '') + '">' + (past ? 'Was due ' : 'Due ') + esc(when(t.due_at)) + '</span>' : '') + '</div>' +
          '</div><div class="assignment-actions">' +
            '<a class="assign-detail-toggle" style="text-decoration:none" href="grimoire-mark.html?a=' + encodeURIComponent(t.id) + '">Mark</a>' +
            '<a class="assign-detail-toggle" style="text-decoration:none" href="grimoire-set.html?a=' + encodeURIComponent(t.id) + '">Edit</a>' +
          '</div></div>' +
          '<div class="assignment-progress-row"><div class="assignment-progress-bar"><div class="assignment-progress-fill" style="width:' + pct + '%"></div></div>' +
            '<div class="assignment-progress-label">' + r.handed + '/' + r.learners + ' handed in · ' + r.marked + ' marked · ' + r.returned + ' returned' + (status ? ' · ' + status : '') + '</div></div>' +
        '</div>';
      }).join('');
    })().finally(() => { loading = null; });
    return loading;
  }

  window.MLGrimoireTab = { load };
  // Opened straight away when the dashboard restores this tab from last time.
  document.addEventListener('magiclab:auth:ready', () => {
    const panel = $('tab-marking'); if (panel && panel.classList.contains('active')) load();
  });
})();
