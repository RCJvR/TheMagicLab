// ============================================================
// THE MAGIC LAB — time-turner.js
// A private time-management planner. Entries live only in this
// browser's localStorage — there's nothing to share between students or
// teachers here, so there's no Supabase table for it.
//
// Two ways an entry can repeat, because school timetables and daily life
// don't run on the same clock:
//   - 'weekly'  — same weekday(s) every single week (practices, meals,
//                 chores, sleep, weekly tests). Applies identically to
//                 both weeks shown.
//   - 'cycle'   — tied to a specific day of a 10-day rotating school
//                 timetable (e.g. Day 3, Day 7). Cycle days 1–5 map onto
//                 Week 1's Mon–Fri and days 6–10 onto Week 2's Mon–Fri,
//                 so a 10-day cycle is always exactly two calendar weeks.
// Both kinds are shown together across the same two-week view so a
// Friday early finish (whichever cycle days land on a Friday) and a
// Tuesday-afternoon practice both show up in the right place.
// ============================================================

(function () {
  const STORAGE_KEY = 'ml-time-turner-entries-v2';
  const OLD_STORAGE_KEY = 'ml-time-turner-entries-v1';
  const NAME_KEY = 'ml-time-turner-name';
  const DAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const DAY_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const DAY_MIN = 1440;
  const SLOT_COUNT = 14; // two 7-day weeks
  const PX_PER_MIN = 0.5; // 720px-tall grid, one hour = 30px

  const CATEGORIES = {
    school:          { label: 'School / Academics',      emoji: '🎓', color: '#60a5fa' },
    homework:        { label: 'Homework / Study',        emoji: '📚', color: '#a78bfa' },
    extracurricular: { label: 'Extracurricular / Exercise', emoji: '🏅', color: '#fb923c' },
    family:          { label: 'Family time',              emoji: '❤️', color: '#e879f9' },
    meals:           { label: 'Meals',                    emoji: '🍽️', color: '#fbbf24' },
    chores:          { label: 'Chores / Cleaning up',     emoji: '🧹', color: '#2dd4bf' },
    rest:            { label: 'Rest / Sleep',             emoji: '😴', color: '#818cf8' },
    free:            { label: 'Free time / Recreation',   emoji: '🎮', color: '#4ade80' },
    other:           { label: 'Other',                    emoji: '⭐', color: '#94a3b8' }
  };

  let entries = [];
  let recurrence = 'weekly'; // 'weekly' | 'cycle' — which day-picker the add form is showing
  let selectedWeekdays = new Set();
  let selectedCycleDays = new Set();

  // ── Cycle <-> slot mapping ───────────────────────────────────
  // Slot 0-6 = Week 1 Mon..Sun, slot 7-13 = Week 2 Mon..Sun.
  function cycleDayToSlot(d) {
    const week = d <= 5 ? 0 : 1;
    const weekday = (d - 1) % 5; // 0..4, Mon..Fri
    return week * 7 + weekday;
  }
  function slotCycleDay(slot) {
    const weekday = slot % 7, week = Math.floor(slot / 7);
    if (weekday > 4) return null; // Sat/Sun aren't timetable days
    return week * 5 + weekday + 1;
  }
  function slotLabel(slot) {
    const weekday = slot % 7, week = Math.floor(slot / 7);
    const cd = slotCycleDay(slot);
    return cd ? `${DAY_FULL[weekday]} (Day ${cd})` : `${DAY_FULL[weekday]} (Week ${week + 1})`;
  }

  function loadEntries() {
    try { entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch (e) { entries = []; }
    if (!entries.length) {
      // Migrate the old single-week format (days: [0-6], no recurrence) if present.
      try {
        const old = JSON.parse(localStorage.getItem(OLD_STORAGE_KEY));
        if (Array.isArray(old) && old.length) {
          entries = old.map(e => ({ ...e, recurrence: 'weekly', weekdays: e.days || [] }));
          delete_deprecated_days_field();
          saveEntries();
        }
      } catch (e) {}
    }
    function delete_deprecated_days_field() { entries.forEach(e => { delete e.days; }); }
  }
  function saveEntries() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); } catch (e) {}
  }

  function toMinutes(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  }
  function duration(start, end) {
    const s = toMinutes(start), e = toMinutes(end);
    return e > s ? e - s : (DAY_MIN - s) + e;
  }
  function fmtHours(mins) {
    return (mins / 60).toFixed(1).replace(/\.0$/, '');
  }
  function fmtTime(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    const period = h < 12 ? 'am' : 'pm';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, '0')}${period}`;
  }
  function fmtWeekdays(days) {
    const sorted = [...days].sort((a, b) => a - b);
    if (sorted.length === 7) return 'Every day';
    if (sorted.join(',') === '0,1,2,3,4') return 'Mon–Fri';
    if (sorted.join(',') === '5,6') return 'Sat–Sun';
    let consecutive = true;
    for (let i = 1; i < sorted.length; i++) if (sorted[i] !== sorted[i - 1] + 1) consecutive = false;
    if (consecutive && sorted.length > 1) return `${DAY_ABBR[sorted[0]]}–${DAY_ABBR[sorted[sorted.length - 1]]}`;
    return sorted.map(d => DAY_ABBR[d]).join(', ');
  }
  function fmtCycleDays(days) {
    const sorted = [...days].sort((a, b) => a - b);
    if (sorted.length === 10) return 'Every timetable day';
    const runs = [];
    let start = sorted[0], prev = sorted[0];
    for (let i = 1; i <= sorted.length; i++) {
      if (i < sorted.length && sorted[i] === prev + 1) { prev = sorted[i]; continue; }
      runs.push(start === prev ? `${start}` : `${start}–${prev}`);
      if (i < sorted.length) { start = sorted[i]; prev = sorted[i]; }
    }
    return 'Day ' + runs.join(', ');
  }
  function fmtRecurrence(entry) {
    return entry.recurrence === 'cycle' ? fmtCycleDays(entry.cycleDays) : fmtWeekdays(entry.weekdays);
  }
  function fmtPeriodInfo(info) {
    const dayLabel = info.dayType === 'friday' ? 'Friday' : 'Regular';
    const range = info.from === info.to ? `P${info.from}` : `P${info.from}–P${info.to}`;
    return `${range} (${dayLabel})`;
  }
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function slotsForEntry(entry) {
    return entry.recurrence === 'cycle'
      ? entry.cycleDays.map(cycleDayToSlot)
      : entry.weekdays.flatMap(w => [w, w + 7]);
  }

  function addEntry(entry) {
    entries.push({ id: 'e' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), ...entry });
    saveEntries();
  }
  function deleteEntry(id) {
    entries = entries.filter(e => e.id !== id);
    saveEntries();
  }
  function clearAll() {
    entries = [];
    saveEntries();
  }

  // ── Two-week grid ────────────────────────────────────────────
  function blocksForEntry(entry) {
    const s = toMinutes(entry.start), e = toMinutes(entry.end);
    const pieces = [];
    slotsForEntry(entry).forEach(slot => {
      if (e > s) {
        pieces.push({ slot, start: s, end: e, entry });
      } else {
        pieces.push({ slot, start: s, end: DAY_MIN, entry });
        pieces.push({ slot: (slot + 1) % SLOT_COUNT, start: 0, end: e, entry });
      }
    });
    return pieces;
  }

  function packLanes(pieces) {
    // Greedy interval-graph lane packing so overlapping blocks sit side by side.
    const sorted = [...pieces].sort((a, b) => a.start - b.start);
    const laneEnds = [];
    sorted.forEach(p => {
      let lane = laneEnds.findIndex(end => end <= p.start);
      if (lane === -1) { lane = laneEnds.length; laneEnds.push(p.end); }
      else laneEnds[lane] = p.end;
      p.lane = lane;
    });
    const laneCount = laneEnds.length || 1;
    sorted.forEach(p => { p.laneCount = laneCount; });
    return sorted;
  }

  function renderWeekGrid(elId, weekIndex, bySlot) {
    const todayIdx = (new Date().getDay() + 6) % 7; // JS 0=Sun -> our 0=Mon

    const gutter = `<div class="grid-gutter">${
      Array.from({ length: 24 }, (_, h) =>
        `<div class="grid-gutter-label" style="top:${h * 60 * PX_PER_MIN}px;">${String(h).padStart(2, '0')}:00</div>`
      ).join('')
    }</div>`;

    const days = DAY_ABBR.map((name, weekday) => {
      const slot = weekIndex * 7 + weekday;
      const pieces = packLanes(bySlot[slot]);
      const cycleDay = slotCycleDay(slot);
      const blocks = pieces.map(p => {
        const cat = CATEGORIES[p.entry.category] || CATEGORIES.other;
        const top = p.start * PX_PER_MIN;
        const height = Math.max((p.end - p.start) * PX_PER_MIN, 10);
        const widthPct = 100 / p.laneCount;
        const leftPct = p.lane * widthPct;
        const label = p.entry.title || cat.label;
        const showText = height >= 16;
        return `<div class="grid-block" style="top:${top}px;height:${height}px;left:${leftPct}%;width:calc(${widthPct}% - 2px);background:${cat.color}33;border-left-color:${cat.color};" title="${esc(label)} (${fmtTime(p.entry.start)}–${fmtTime(p.entry.end)})">${showText ? `<div class="gb-title">${cat.emoji} ${esc(label)}</div>` : ''}</div>`;
      }).join('');
      return `<div class="grid-day">
        <div class="grid-day-head${weekday === todayIdx ? ' today' : ''}">${name}${cycleDay ? `<div class="grid-day-cycle">Day ${cycleDay}</div>` : ''}</div>
        <div class="grid-day-col" style="height:${DAY_MIN * PX_PER_MIN}px;">${blocks}</div>
      </div>`;
    }).join('');

    document.getElementById(elId).innerHTML = `${gutter}<div class="grid-days">${days}</div>`;
  }

  function renderGrid() {
    const bySlot = Array.from({ length: SLOT_COUNT }, () => []);
    entries.flatMap(blocksForEntry).forEach(p => bySlot[p.slot].push(p));

    renderWeekGrid('week-grid-1', 0, bySlot);
    renderWeekGrid('week-grid-2', 1, bySlot);

    document.getElementById('legend').innerHTML = Object.entries(CATEGORIES).map(([key, c]) =>
      `<div class="legend-item"><span class="legend-swatch" style="background:${c.color};"></span>${c.emoji} ${esc(c.label)}</div>`
    ).join('');
  }

  // ── Totals ───────────────────────────────────────────────────
  // Totals are counted across the full 2-week cycle, then halved for a
  // "per week" average — the natural unit whether an entry repeats every
  // week or only on specific timetable days.
  function totalsOverCycle() {
    const totals = {};
    Object.keys(CATEGORIES).forEach(c => { totals[c] = 0; });
    entries.forEach(e => { totals[e.category] += duration(e.start, e.end) * slotsForEntry(e).length; });
    return totals;
  }
  function weeklyAverages() {
    const cycle = totalsOverCycle();
    const weekly = {};
    Object.keys(cycle).forEach(k => { weekly[k] = cycle[k] / 2; });
    return weekly;
  }

  function renderTotals() {
    const box = document.getElementById('totals');
    if (!entries.length) { box.innerHTML = '<div class="empty-hint">Add a few blocks above to see your totals.</div>'; return; }

    const totals = weeklyAverages();
    const maxWeek = 7 * 24 * 60;
    box.innerHTML = Object.entries(CATEGORIES).map(([key, c]) => {
      const mins = totals[key];
      const pct = Math.min(100, (mins / maxWeek) * 100 * 6); // scaled so a realistic ~20h/wk category reads as a full-ish bar
      return `<div class="total-row">
        <div class="total-label">${c.emoji} ${esc(c.label)}</div>
        <div class="total-bar-track"><div class="total-bar-fill" style="width:${pct}%;background:${c.color};"></div></div>
        <div class="total-hours">${fmtHours(mins)} h</div>
      </div>`;
    }).join('');
  }

  // ── Insights (data-driven tips) ──────────────────────────────
  function computeInsights() {
    if (!entries.length) {
      return [{ level: 'info', icon: '👋', text: 'Start with your fixed commitments — school hours and sleep — everything else fits around those two.' }];
    }

    const totals = weeklyAverages();
    const insights = [];

    const sleepPerNight = totals.rest / 7 / 60;
    if (totals.rest === 0) {
      insights.push({ level: 'warn', icon: '😴', text: "No sleep/rest blocks scheduled yet — add your usual bedtime and wake time so the plan accounts for it." });
    } else if (sleepPerNight < 7.5) {
      insights.push({ level: 'warn', icon: '😴', text: `Sleep averages about ${sleepPerNight.toFixed(1)} h/night in this plan. Teenagers need roughly 8–10 hours a night — try moving bedtime earlier.` });
    }

    const freeHours = totals.free / 60;
    if (freeHours < 3) {
      insights.push({ level: 'warn', icon: '🎮', text: 'Very little unstructured free time is scheduled. Downtime isn’t wasted time — it helps you concentrate better in the hours you do study.' });
    }

    const perSlotHomework = Array(SLOT_COUNT).fill(0);
    entries.filter(e => e.category === 'homework').forEach(e => {
      const mins = duration(e.start, e.end);
      slotsForEntry(e).forEach(slot => { perSlotHomework[slot] += mins; });
    });
    const heavySlot = perSlotHomework.findIndex(m => m > 180);
    if (heavySlot >= 0) {
      insights.push({ level: 'warn', icon: '📚', text: `${slotLabel(heavySlot)} has more than 3 hours of homework/study blocked. Split long sessions into 25–45 minute focused blocks with short breaks — it works better than one long sitting.` });
    }

    if (totals.chores === 0) {
      insights.push({ level: 'info', icon: '🧹', text: 'No time set aside for chores/cleaning up yet — even 15 minutes a day keeps it from piling up into a whole afternoon later.' });
    }
    if (totals.meals === 0) {
      insights.push({ level: 'info', icon: '🍽️', text: 'No meal times blocked yet — scheduling them (not just "whenever") makes it easier to protect study time around them.' });
    }
    if (totals.family === 0) {
      insights.push({ level: 'info', icon: '❤️', text: 'No family time blocked yet — even a shared dinner or a fixed evening slot keeps it from getting crowded out by everything else.' });
    }

    if (!insights.length) {
      insights.push({ level: 'ok', icon: '✅', text: 'This looks like a balanced plan — school, study, activities, rest and free time all have a place.' });
    }
    return insights;
  }

  function renderInsights() {
    const insights = computeInsights();
    document.getElementById('insights').innerHTML = insights.map(i =>
      `<div class="tip ${i.level}"><span class="tip-icon">${i.icon}</span><span>${esc(i.text)}</span></div>`
    ).join('');
  }

  const GENERAL_TIPS = [
    { icon: '🎯', text: 'Do your hardest or most disliked subject first, while your energy and focus are highest.' },
    { icon: '⏲️', text: 'Study in focused blocks of 25–45 minutes with a 5–10 minute break between them — it beats one long unbroken session.' },
    { icon: '🔁', text: "Go back over the day's classwork that same afternoon, even for 10 minutes — it cuts revision time before tests dramatically." },
    { icon: '🌙', text: 'Keep bedtime and wake time consistent, even on weekends — it matters more than a few extra hours some nights.' },
    { icon: '🎒', text: "Pack your bag and lay out tomorrow's things the night before — it removes decisions from your morning." }
  ];

  function renderGeneralTips() {
    document.getElementById('general-tips').innerHTML = GENERAL_TIPS.map(t =>
      `<div class="tip"><span class="tip-icon">${t.icon}</span><span>${esc(t.text)}</span></div>`
    ).join('');
  }

  // ── Entries list ─────────────────────────────────────────────
  function renderEntriesList() {
    const box = document.getElementById('entries-list');
    if (!entries.length) { box.innerHTML = '<div class="empty-hint">Nothing added yet.</div>'; return; }

    const sorted = [...entries].sort((a, b) => a.category.localeCompare(b.category) || toMinutes(a.start) - toMinutes(b.start));
    box.innerHTML = sorted.map(e => {
      const cat = CATEGORIES[e.category] || CATEGORIES.other;
      const recurTag = e.recurrence === 'cycle' ? ' · timetable' : '';
      const timeLabel = e.periodInfo ? fmtPeriodInfo(e.periodInfo) : `${fmtTime(e.start)}–${fmtTime(e.end)}`;
      return `<div class="entry-row" data-id="${e.id}">
        <div class="entry-emoji">${cat.emoji}</div>
        <div class="entry-body">
          <div class="entry-title">${esc(e.title || cat.label)}</div>
          <div class="entry-meta">${esc(fmtRecurrence(e))}${recurTag} · ${esc(timeLabel)}</div>
        </div>
        <button class="entry-del" data-del="${e.id}" title="Delete"><i data-lucide="trash-2" style="width:14px;height:14px;"></i></button>
      </div>`;
    }).join('');

    box.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', () => { deleteEntry(btn.dataset.del); renderAll(); });
    });
    window.lucide?.createIcons();
  }

  // ── Print header ─────────────────────────────────────────────
  function renderPrintHeader() {
    const name = document.getElementById('plan-name').value.trim();
    document.getElementById('print-name').textContent = name ? `for ${name}` : '';
    document.getElementById('print-date').textContent = 'Prepared ' + new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function renderAll() {
    renderGrid();
    renderTotals();
    renderInsights();
    renderGeneralTips();
    renderEntriesList();
    renderPrintHeader();
    window.lucide?.createIcons();
  }

  // ── Add-entry form ───────────────────────────────────────────
  function renderWeekdayPicker() {
    const box = document.getElementById('af-weekdays');
    box.innerHTML = DAY_ABBR.map((name, d) => `<button type="button" class="day-btn" data-weekday="${d}">${name}</button>`).join('');
    box.querySelectorAll('.day-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = Number(btn.dataset.weekday);
        if (selectedWeekdays.has(d)) selectedWeekdays.delete(d); else selectedWeekdays.add(d);
        btn.classList.toggle('active');
      });
    });
  }

  function renderCycleDayPicker() {
    const box = document.getElementById('af-cycledays');
    const rows = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]];
    box.innerHTML = rows.map((row, week) => `
      <div class="cycle-week-row">
        <span class="cycle-week-tag">Wk ${week + 1}</span>
        ${row.map(d => `<button type="button" class="day-btn cycle-day-btn" data-cycleday="${d}">${d}<small>${DAY_ABBR[(d - 1) % 5]}</small></button>`).join('')}
      </div>`).join('');
    box.querySelectorAll('.day-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = Number(btn.dataset.cycleday);
        if (selectedCycleDays.has(d)) selectedCycleDays.delete(d); else selectedCycleDays.add(d);
        btn.classList.toggle('active');
      });
    });
  }

  function setRecurrenceMode(mode) {
    recurrence = mode;
    document.querySelectorAll('.recur-btn').forEach(b => b.classList.toggle('active', b.dataset.recur === mode));
    document.getElementById('weekday-picker').classList.toggle('hidden', mode !== 'weekly');
    document.getElementById('cycleday-picker').classList.toggle('hidden', mode !== 'cycle');
  }

  let timeMode = 'clock';
  function setTimeMode(mode) {
    timeMode = mode;
    document.querySelectorAll('.timemode-btn').forEach(b => b.classList.toggle('active', b.dataset.timemode === mode));
    document.getElementById('clock-time-picker').classList.toggle('hidden', mode !== 'clock');
    document.getElementById('period-time-picker').classList.toggle('hidden', mode !== 'period');
  }
  function populatePeriodSelects() {
    const count = window.TimeTurnerPeriods?.PERIOD_COUNT || 6;
    const options = Array.from({ length: count }, (_, i) => i + 1).map(p => `<option value="${p}">Period ${p}</option>`).join('');
    document.getElementById('af-period-from').innerHTML = options;
    document.getElementById('af-period-to').innerHTML = options;
  }

  function wireForm() {
    const catSelect = document.getElementById('af-category');
    catSelect.innerHTML = Object.entries(CATEGORIES).map(([key, c]) => `<option value="${key}">${c.emoji} ${esc(c.label)}</option>`).join('');

    renderWeekdayPicker();
    renderCycleDayPicker();
    setRecurrenceMode('weekly');
    populatePeriodSelects();
    setTimeMode('clock');

    document.querySelectorAll('.recur-btn').forEach(btn => {
      btn.addEventListener('click', () => setRecurrenceMode(btn.dataset.recur));
    });

    document.querySelectorAll('.timemode-btn').forEach(btn => {
      btn.addEventListener('click', () => setTimeMode(btn.dataset.timemode));
    });

    document.querySelectorAll('#weekday-picker .day-quick [data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.dataset.preset;
        if (preset === 'weekdays') selectedWeekdays = new Set([0, 1, 2, 3, 4]);
        else if (preset === 'weekend') selectedWeekdays = new Set([5, 6]);
        else if (preset === 'everyday') selectedWeekdays = new Set([0, 1, 2, 3, 4, 5, 6]);
        else selectedWeekdays = new Set();
        document.querySelectorAll('#af-weekdays .day-btn').forEach(b => b.classList.toggle('active', selectedWeekdays.has(Number(b.dataset.weekday))));
      });
    });

    document.querySelectorAll('#cycleday-picker .day-quick [data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = btn.dataset.preset;
        if (preset === 'all10') selectedCycleDays = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        else if (preset === 'mon-thu') selectedCycleDays = new Set([1, 2, 3, 4, 6, 7, 8, 9]);
        else if (preset === 'fri') selectedCycleDays = new Set([5, 10]);
        else if (preset === 'week1') selectedCycleDays = new Set([1, 2, 3, 4, 5]);
        else if (preset === 'week2') selectedCycleDays = new Set([6, 7, 8, 9, 10]);
        else selectedCycleDays = new Set();
        document.querySelectorAll('#af-cycledays .day-btn').forEach(b => b.classList.toggle('active', selectedCycleDays.has(Number(b.dataset.cycleday))));
      });
    });

    document.getElementById('af-submit').addEventListener('click', () => {
      const msg = document.getElementById('af-msg');
      const category = catSelect.value;
      const title = document.getElementById('af-title').value.trim();

      const daySet = recurrence === 'cycle' ? selectedCycleDays : selectedWeekdays;
      if (!daySet.size) { msg.textContent = recurrence === 'cycle' ? 'Pick at least one timetable day.' : 'Pick at least one day.'; msg.className = 'msg err'; return; }

      let start, end, periodInfo = null;
      if (timeMode === 'period') {
        const dayType = document.getElementById('af-daytype').value;
        const from = Number(document.getElementById('af-period-from').value);
        const to = Number(document.getElementById('af-period-to').value);
        if (to < from) { msg.textContent = '"To period" can’t be before "From period".'; msg.className = 'msg err'; return; }
        const daySchedule = window.TimeTurnerPeriods?.getCached()?.[dayType] || {};
        if (!daySchedule[from] || !daySchedule[to]) { msg.textContent = 'Those period times haven’t been set up yet — ask your teacher, or switch to clock time.'; msg.className = 'msg err'; return; }
        start = daySchedule[from].start;
        end = daySchedule[to].end;
        periodInfo = { dayType, from, to };
      } else {
        start = document.getElementById('af-start').value;
        end = document.getElementById('af-end').value;
        if (!start || !end) { msg.textContent = 'Set a start and end time.'; msg.className = 'msg err'; return; }
        if (start === end) { msg.textContent = 'Start and end time can’t be the same.'; msg.className = 'msg err'; return; }
      }

      const entry = { category, title: title || null, recurrence, start, end };
      if (periodInfo) entry.periodInfo = periodInfo;
      if (recurrence === 'cycle') entry.cycleDays = [...selectedCycleDays];
      else entry.weekdays = [...selectedWeekdays];

      addEntry(entry);
      msg.textContent = '';
      document.getElementById('af-title').value = '';
      renderAll();
    });

    const nameInput = document.getElementById('plan-name');
    try { nameInput.value = localStorage.getItem(NAME_KEY) || ''; } catch (e) {}
    nameInput.addEventListener('input', () => {
      try { localStorage.setItem(NAME_KEY, nameInput.value); } catch (e) {}
      renderPrintHeader();
    });

    document.getElementById('print-btn').addEventListener('click', () => window.print());
    document.getElementById('clear-btn').addEventListener('click', () => {
      if (!entries.length) return;
      if (confirm('Remove everything you’ve added? This can’t be undone.')) { clearAll(); renderAll(); }
    });
  }

  function init() {
    loadEntries();
    wireForm();
    renderAll();
  }

  window.TimeTurner = { init };
})();
