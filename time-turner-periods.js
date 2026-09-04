// ============================================================
// THE MAGIC LAB — time-turner-periods.js
// The school's shared period schedule (up to 6 periods/day, a "regular"
// day and an early-finish "friday" variant). Requires the
// period_schedule table from time-turner-periods-schema.sql.
// Teachers edit it; every student's planner reads the same schedule —
// exactly like the assessment calendar, this is a fact about the
// school, not something each student should have to re-enter.
// Include after auth.js.
// ============================================================

(function () {
  const PERIOD_COUNT = 6;
  const DAY_TYPES = [
    { key: 'regular', label: 'Regular day' },
    { key: 'friday', label: 'Friday' }
  ];

  let profile = null;
  // { regular: { 1: {start,end}, ... }, friday: { ... } }
  let schedule = { regular: {}, friday: {} };

  function supabase() { return window.MagicLabAuth._supabase(); }
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function fmtTime(hhmm) {
    if (!hhmm) return '';
    const [h, m] = hhmm.slice(0, 5).split(':').map(Number);
    const period = h < 12 ? 'am' : 'pm';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, '0')}${period}`;
  }

  function requireTeacher() {
    if (!window.MagicLabAuth.isTeacher()) return { error: { message: 'Only teachers can do that' } };
    return null;
  }

  async function fetchSchedule() {
    const { data, error } = await supabase().from('period_schedule').select('*');
    if (error) { console.warn('[MagicLab] fetchSchedule error:', error.message); return; }
    schedule = { regular: {}, friday: {} };
    (data || []).forEach(row => {
      schedule[row.day_type][row.period] = { start: row.start_time.slice(0, 5), end: row.end_time.slice(0, 5) };
    });
  }

  async function savePeriod(dayType, period, start, end) {
    const denied = requireTeacher();
    if (denied) return denied;
    const { error } = await supabase().from('period_schedule')
      .upsert({ day_type: dayType, period, start_time: start, end_time: end, updated_by: profile.id }, { onConflict: 'day_type,period' });
    if (!error) schedule[dayType][period] = { start, end };
    return { error };
  }

  /** Every consumer (e.g. time-turner.js's add-block form) reads through this. */
  function getCached() { return schedule; }
  function isComplete(dayType) {
    return Array.from({ length: PERIOD_COUNT }, (_, i) => i + 1).every(p => schedule[dayType]?.[p]);
  }

  // ── Rendering ────────────────────────────────────────────────
  function renderSchedule() {
    const box = document.getElementById('period-schedule');
    if (!box) return;
    const isTeacher = window.MagicLabAuth.isTeacher();

    box.innerHTML = DAY_TYPES.map(dt => `
      <div class="period-table-wrap">
        <div class="week-label">${esc(dt.label)}</div>
        <div class="period-table">
          ${Array.from({ length: PERIOD_COUNT }, (_, i) => i + 1).map(p => {
            const row = schedule[dt.key][p];
            return isTeacher
              ? `<div class="period-row">
                  <span class="period-num">P${p}</span>
                  <input class="form-input period-time-input" type="time" data-day="${dt.key}" data-period="${p}" data-field="start" value="${row?.start || ''}">
                  <span class="period-sep">–</span>
                  <input class="form-input period-time-input" type="time" data-day="${dt.key}" data-period="${p}" data-field="end" value="${row?.end || ''}">
                </div>`
              : `<div class="period-row">
                  <span class="period-num">P${p}</span>
                  <span class="period-time-display">${row ? `${fmtTime(row.start)} – ${fmtTime(row.end)}` : 'Not set yet'}</span>
                </div>`;
          }).join('')}
        </div>
      </div>`).join('');

    if (!isTeacher && !isComplete('regular') && !isComplete('friday')) {
      box.insertAdjacentHTML('afterbegin', '<div class="empty-hint">Your teachers haven\'t set up period times yet.</div>');
    }

    if (isTeacher) wireTeacherInputs();
  }

  function wireTeacherInputs() {
    document.querySelectorAll('.period-time-input').forEach(input => {
      input.addEventListener('change', async () => {
        const { day, period } = input.dataset;
        const p = Number(period);
        const startEl = document.querySelector(`.period-time-input[data-day="${day}"][data-period="${period}"][data-field="start"]`);
        const endEl = document.querySelector(`.period-time-input[data-day="${day}"][data-period="${period}"][data-field="end"]`);
        if (!startEl.value || !endEl.value) return;
        const msg = document.getElementById('period-schedule-msg');
        const { error } = await savePeriod(day, p, startEl.value, endEl.value);
        if (msg) { msg.textContent = error ? error.message : 'Saved.'; msg.className = error ? 'msg err' : 'msg ok'; }
        document.dispatchEvent(new CustomEvent('magiclab:periods:changed'));
      });
    });
  }

  async function init() {
    profile = window.MagicLabAuth.getProfile();
    await fetchSchedule();
    renderSchedule();
    document.dispatchEvent(new CustomEvent('magiclab:periods:ready'));
  }

  window.TimeTurnerPeriods = { init, getCached, isComplete, PERIOD_COUNT, DAY_TYPES };
})();
