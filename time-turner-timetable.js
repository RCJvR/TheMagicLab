// ============================================================
// THE MAGIC LAB — time-turner-timetable.js
// Bulk timetable upload for Time Turner, instead of adding all 60
// periods (10 days × 6 periods) one at a time through "Add a block".
//
// Two destinations, one shared row format ({ "1": [p1..p6], ... }):
//   - Personal: any signed-in profile (student OR teacher — a teacher's
//     own teaching timetable works exactly the same way) uploads their
//     own, which is turned straight into their Time Turner entries via
//     window.TimeTurner.importScheduleFromGrid(). No table of our own —
//     it lands in the existing planner_entries row.
//   - Grade-shared: a teacher uploads one timetable per grade (the
//     grade_timetables table, same access pattern as `assessments` —
//     any signed-in user reads, any teacher writes), and a student in
//     that grade can one-click import it into their own plan the same
//     way. Grade 10-12 electives mean this can only cover the
//     compulsory/core periods for those grades.
//
// Requires auth.js, time-turner.js and time-turner-periods.js (for the
// period-time lookup importScheduleFromGrid itself uses). Include after
// all three.
// ============================================================

(function () {
  let profile = null;

  function supabase() { return window.MagicLabAuth._supabase(); }
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ── Shared "Day, P1, P2, P3, P4, P5, P6" parsing ────────────────
  function parseCSVLine(line) {
    const cells = [];
    let cur = '', inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQuotes) {
        if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else inQuotes = false; }
        else cur += c;
      } else if (c === '"') inQuotes = true;
      else if (c === ',') { cells.push(cur); cur = ''; }
      else cur += c;
    }
    cells.push(cur);
    return cells.map(c => c.trim());
  }

  function parseTimetableText(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const grid = {};
    const errors = [];
    lines.forEach((line, idx) => {
      const cells = parseCSVLine(line);
      if (idx === 0 && /^day$/i.test(cells[0] || '')) return; // skip an optional header row
      const lineNo = idx + 1;
      const day = parseInt(cells[0], 10);
      if (!day || day < 1 || day > 10) { errors.push(`Line ${lineNo}: day must be 1-10 (got "${cells[0] || ''}")`); return; }
      const subjects = cells.slice(1, 7).map(c => (c || '').trim());
      while (subjects.length < 6) subjects.push('');
      grid[day] = subjects;
    });
    return { grid, errors };
  }

  function gridFilledCount(grid) {
    return Object.values(grid).reduce((sum, row) => sum + row.filter(s => s).length, 0);
  }

  function importResultMessage({ imported, skipped }) {
    if (skipped > 0) return `Added ${imported} period${imported === 1 ? '' : 's'} to your plan — skipped ${skipped} because period times aren't set up yet for that day type (see "Period times" above).`;
    return `Added ${imported} period${imported === 1 ? '' : 's'} to your plan.`;
  }

  // ── Personal upload (student's own, or a teacher's own teaching timetable) ──
  function wirePersonalUpload() {
    const fileInput = document.getElementById('tt-file');
    const textArea = document.getElementById('tt-text');
    const previewBtn = document.getElementById('tt-preview-btn');
    const submitBtn = document.getElementById('tt-submit-btn');
    const previewBox = document.getElementById('tt-preview-box');
    const msg = document.getElementById('tt-msg');
    if (!fileInput) return;

    let pendingGrid = null;

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => { textArea.value = reader.result; };
      reader.readAsText(file);
    });

    previewBtn.addEventListener('click', () => {
      const { grid, errors } = parseTimetableText(textArea.value);
      pendingGrid = grid;
      const filled = gridFilledCount(grid);
      const parts = [];
      if (filled) parts.push(`<div class="msg ok">${filled} period${filled === 1 ? '' : 's'} across ${Object.keys(grid).length} day${Object.keys(grid).length === 1 ? '' : 's'} ready to add.</div>`);
      if (errors.length) parts.push(`<div class="msg err">${errors.length} problem${errors.length === 1 ? '' : 's'}:<br>${errors.map(esc).join('<br>')}</div>`);
      if (!filled && !errors.length) parts.push('<div class="msg err">Nothing to add — paste rows or choose a file first.</div>');
      previewBox.innerHTML = parts.join('');
      submitBtn.classList.toggle('hidden', !filled);
    });

    submitBtn.addEventListener('click', () => {
      if (!pendingGrid) return;
      const result = window.TimeTurner.importScheduleFromGrid(pendingGrid);
      msg.textContent = importResultMessage(result);
      msg.className = result.skipped ? 'msg' : 'msg ok';
      textArea.value = '';
      fileInput.value = '';
      previewBox.innerHTML = '';
      submitBtn.classList.add('hidden');
      pendingGrid = null;
    });
  }

  // ── "Import my grade's timetable" convenience ───────────────────
  async function wireGradeImport() {
    const box = document.getElementById('tt-import-grade-box');
    if (!box || !profile?.grade) return;
    const { data, error } = await supabase().from('grade_timetables').select('grid').eq('grade', profile.grade).maybeSingle();
    if (error || !data || !gridFilledCount(data.grid || {})) return;
    box.classList.remove('hidden');
    document.getElementById('tt-import-grade-btn').addEventListener('click', () => {
      const result = window.TimeTurner.importScheduleFromGrid(data.grid);
      const msg = document.getElementById('tt-import-grade-msg');
      msg.textContent = importResultMessage(result);
      msg.className = result.skipped ? 'msg' : 'msg ok';
    });
  }

  // ── Teacher admin: upload a grade's shared timetable ────────────
  function requireTeacher() {
    if (!window.MagicLabAuth.isTeacher()) return { error: { message: 'Only teachers can do that' } };
    return null;
  }

  async function saveGradeTimetable(grade, grid) {
    const denied = requireTeacher();
    if (denied) return denied;
    return supabase().from('grade_timetables').upsert({ grade, grid, updated_by: profile.id, updated_at: new Date().toISOString() });
  }

  async function deleteGradeTimetable(grade) {
    const denied = requireTeacher();
    if (denied) return denied;
    return supabase().from('grade_timetables').delete().eq('grade', grade);
  }

  async function fetchAllGradeTimetables() {
    const { data, error } = await supabase().from('grade_timetables').select('*').order('grade', { ascending: true });
    if (error) { console.warn('[MagicLab] fetchAllGradeTimetables error:', error.message); return []; }
    return data || [];
  }

  function fmtDate(d) {
    return d ? new Date(d).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  }

  function renderGridRows(grid) {
    return Array.from({ length: 10 }, (_, i) => i + 1).map(day => {
      const row = grid[day] || grid[String(day)] || [];
      const text = row.some(s => s) ? row.map(s => s || '—').join(' · ') : null;
      if (!text) return '';
      return `<div class="admin-list-meta" style="padding:3px 0;">Day ${day}: ${esc(text)}</div>`;
    }).join('');
  }

  async function refreshAdminTimetableList() {
    const box = document.getElementById('tt-admin-list');
    if (!box) return;
    const rows = (await fetchAllGradeTimetables()).filter(r => gridFilledCount(r.grid || {}) > 0);
    if (!rows.length) { box.innerHTML = '<div class="empty-hint">No grade timetables uploaded yet.</div>'; return; }

    box.innerHTML = rows.map(r => `
      <div class="admin-month-group">
        <button type="button" class="admin-month-header" data-tt-view="${r.grade}">
          <i data-lucide="chevron-right" style="width:14px;height:14px;flex-shrink:0;"></i>
          <span>Grade ${r.grade}</span>
          <span class="admin-month-count">${fmtDate(r.updated_at)}</span>
        </button>
        <div class="admin-month-body hidden" id="tt-admin-grid-${r.grade}">
          ${renderGridRows(r.grid || {})}
          <button class="btn-ghost danger" data-tt-delete="${r.grade}" style="margin-top:8px;"><i data-lucide="trash-2" style="width:13px;height:13px;"></i>Delete Grade ${r.grade}'s timetable</button>
        </div>
      </div>`).join('');

    box.querySelectorAll('[data-tt-view]').forEach(btn => {
      btn.addEventListener('click', () => {
        const body = document.getElementById(`tt-admin-grid-${btn.dataset.ttView}`);
        const icon = btn.querySelector('i');
        const nowHidden = body.classList.toggle('hidden');
        icon.setAttribute('data-lucide', nowHidden ? 'chevron-right' : 'chevron-down');
        window.lucide?.createIcons();
      });
    });
    box.querySelectorAll('[data-tt-delete]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm(`Delete Grade ${btn.dataset.ttDelete}'s timetable? Students will no longer be able to import it.`)) return;
        await deleteGradeTimetable(parseInt(btn.dataset.ttDelete, 10));
        refreshAdminTimetableList();
      });
    });
    window.lucide?.createIcons();
  }

  function wireAdminUpload() {
    const gradeSelect = document.getElementById('tt-admin-grade');
    const fileInput = document.getElementById('tt-admin-file');
    const textArea = document.getElementById('tt-admin-text');
    const previewBtn = document.getElementById('tt-admin-preview-btn');
    const submitBtn = document.getElementById('tt-admin-submit-btn');
    const previewBox = document.getElementById('tt-admin-preview-box');
    if (!gradeSelect) return;

    let pendingGrid = null;

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => { textArea.value = reader.result; };
      reader.readAsText(file);
    });

    previewBtn.addEventListener('click', () => {
      const { grid, errors } = parseTimetableText(textArea.value);
      pendingGrid = grid;
      const filled = gridFilledCount(grid);
      const parts = [];
      if (filled) parts.push(`<div class="msg ok">${filled} period${filled === 1 ? '' : 's'} across ${Object.keys(grid).length} day${Object.keys(grid).length === 1 ? '' : 's'} ready to upload.</div>`);
      if (errors.length) parts.push(`<div class="msg err">${errors.length} problem${errors.length === 1 ? '' : 's'}:<br>${errors.map(esc).join('<br>')}</div>`);
      if (!filled && !errors.length) parts.push('<div class="msg err">Nothing to upload — paste rows or choose a file first.</div>');
      previewBox.innerHTML = parts.join('');
      submitBtn.classList.toggle('hidden', !filled);
    });

    submitBtn.addEventListener('click', async () => {
      if (!pendingGrid) return;
      const grade = parseInt(gradeSelect.value, 10);
      const { error } = await saveGradeTimetable(grade, pendingGrid);
      if (error) { previewBox.innerHTML = `<div class="msg err">${esc(error.message)}</div>`; return; }
      previewBox.innerHTML = `<div class="msg ok">Saved Grade ${grade}'s timetable.</div>`;
      textArea.value = '';
      fileInput.value = '';
      submitBtn.classList.add('hidden');
      pendingGrid = null;
      refreshAdminTimetableList();
    });
  }

  async function init() {
    profile = window.MagicLabAuth.getProfile();
    wirePersonalUpload();
    wireGradeImport();
    if (window.MagicLabAuth.isTeacher()) {
      wireAdminUpload();
      refreshAdminTimetableList();
    }
  }

  window.TimeTurnerTimetable = { init };
})();
