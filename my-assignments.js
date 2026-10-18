// ============================================================
// THE MAGIC LAB — my-assignments.js
// The signed-in learner's assigned lessons, for "due" badges inside the tools
// (Math Magician's topic list, the Science Sage and Tech Tower home pages).
// Reads the assignments the learner can see (the database only returns the
// ones meant for them) and maps each assigned lesson's fixed id (ref, e.g.
// "mm:10:703" or "ss:10:physics/motion-1d") to its due date.
//
//   MLAssigned.get(ref)                 → { title, due, created } or null
//   MLAssigned.badge(ref, lang, done)   → badge HTML, or '' if not assigned or done
// Fires "ml:assigned" on document once loaded (or reloaded after sign-in).
// ============================================================
(function () {
  if (window.MLAssigned) return;
  const TXT = {
    en: { due: d => `Due ${d}`, today: 'Due today', late: 'Overdue', open: 'Assigned', tip: t => `Assignment: ${t}` },
    af: { due: d => `Sperdatum ${d}`, today: 'Sperdatum vandag', late: 'Laat', open: 'Opgedra', tip: t => `Opdrag: ${t}` }
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let byRef = {};

  // Learners only: a teacher would otherwise see badges for what they set.
  async function load() {
    const A = window.MagicLabAuth, map = {};
    if (A && A.isLoggedIn() && A.isStudent && A.isStudent()) {
      const { data, error } = await A._supabase().from('assignments')
        .select('title, due_date, created_at, assignment_topics(ref)')
        .order('due_date', { ascending: true, nullsFirst: false });
      if (error) { console.warn('[MagicLab] my assignments load failed:', error.message); return; }
      collect(data, map);
    }
    byRef = map;
    document.dispatchEvent(new CustomEvent('ml:assigned'));
  }
  function collect(data, map) {
    (data || []).forEach(a => (a.assignment_topics || []).forEach(t => {
      if (!t.ref) return;
      // Keep the soonest due date when a lesson is in more than one assignment.
      const cur = map[t.ref];
      if (!cur || (a.due_date && (!cur.due || a.due_date < cur.due))) map[t.ref] = { title: a.title, due: a.due_date, created: Date.parse(a.created_at) };
    }));
  }

  window.MLAssigned = {
    get: ref => byRef[ref] || null,
    badge(ref, lang, done) {
      const a = byRef[ref];
      if (!a || done) return '';
      const t = TXT[lang] || TXT.en, today = new Date().toISOString().slice(0, 10);
      let text = t.open, cls = '';
      if (a.due) {
        if (a.due < today) { text = t.late; cls = ' late'; }
        else if (a.due === today) { text = t.today; cls = ' soon'; }
        else text = t.due(new Date(a.due + 'T12:00:00').toLocaleDateString(lang === 'af' ? 'af-ZA' : 'en-ZA', { day: 'numeric', month: 'short' }));
      }
      return `<span class="ml-due${cls}" title="${esc(t.tip(a.title))}">${esc(text)}</span>`;
    },
    reload: load
  };

  // Shared look for the badge on every page that uses it.
  const st = document.createElement('style');
  st.textContent = '.ml-due{flex-shrink:0;margin-left:auto;padding:1px 7px;border-radius:99px;border:1px solid rgba(43,184,207,.45);background:rgba(43,184,207,.10);color:#2bb8cf;font:600 10.5px "JetBrains Mono",monospace;white-space:nowrap}'
    + '.ml-due.soon{border-color:rgba(245,178,61,.5);background:rgba(245,178,61,.12);color:#f5b23d}'
    + '.ml-due.late{border-color:rgba(239,91,91,.5);background:rgba(239,91,91,.12);color:#ef5b5b}'
    + '.ml-due + .sr-badge,.ml-due + .mm-weak{margin-left:6px}';
  document.head.appendChild(st);

  document.addEventListener('magiclab:auth:ready', load);
  document.addEventListener('magiclab:auth:change', e => {
    const ev = e.detail && e.detail.event;
    if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT') load();
  });
  if (window.MagicLabAuth) load();
})();
