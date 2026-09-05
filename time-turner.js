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
  function minToHHMM(mins) {
    return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;
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

  function computeBySlot() {
    const bySlot = Array.from({ length: SLOT_COUNT }, () => []);
    entries.flatMap(blocksForEntry).forEach(p => bySlot[p.slot].push(p));
    return bySlot;
  }

  function renderGrid() {
    const bySlot = computeBySlot();

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
      insights.push({ level: 'warn', icon: '😴', text: "No sleep/rest blocks scheduled yet — add your usual bedtime and wake time so the plan accounts for it. \"Fill your open time\" below can suggest a wind-down slot." });
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
      insights.push({ level: 'info', icon: '🧹', text: 'No time set aside for chores/cleaning up yet — even 15 minutes a day keeps it from piling up into a whole afternoon later. See "Fill your open time" below for a suggested slot.' });
    }
    if (totals.meals === 0) {
      insights.push({ level: 'info', icon: '🍽️', text: 'No meal times blocked yet — scheduling them (not just "whenever") makes it easier to protect study time around them. "Fill your open time" below can suggest lunch and dinner slots.' });
    }
    if (totals.family === 0) {
      insights.push({ level: 'info', icon: '❤️', text: 'No family time blocked yet — even a shared dinner or a fixed evening slot keeps it from getting crowded out by everything else. See "Fill your open time" below for a suggested slot.' });
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

  // ── Fill-your-open-time suggestions (rule-based, no AI) ───────
  // Looks at the gaps left in each slot after existing entries and the
  // school timetable, and proposes specific blocks — meals, a homework
  // session, a wind-down before bed, or just free time — for the
  // student to accept or dismiss. Every rule reads only from the data
  // already on this page (entries + categories); nothing is guessed
  // beyond what a reasonable default schedule would do.
  const SUGGEST_START = 6 * 60, SUGGEST_END = 21 * 60, MIN_GAP = 20;
  const DISMISSED_KEY = 'ml-time-turner-dismissed-v1';
  let dismissedSuggestionKeys = new Set();

  function loadDismissed() {
    try { dismissedSuggestionKeys = new Set(JSON.parse(localStorage.getItem(DISMISSED_KEY)) || []); } catch (e) { dismissedSuggestionKeys = new Set(); }
  }
  function saveDismissed() {
    try { localStorage.setItem(DISMISSED_KEY, JSON.stringify([...dismissedSuggestionKeys])); } catch (e) {}
  }

  function freeGapsForSlot(pieces) {
    const merged = [];
    [...pieces].sort((a, b) => a.start - b.start).forEach(p => {
      if (merged.length && p.start <= merged[merged.length - 1].end) {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, p.end);
      } else {
        merged.push({ start: p.start, end: p.end });
      }
    });
    const gaps = [];
    let cursor = SUGGEST_START;
    merged.forEach(m => {
      if (m.start > cursor) gaps.push({ start: cursor, end: Math.min(m.start, SUGGEST_END) });
      cursor = Math.max(cursor, m.end);
    });
    if (cursor < SUGGEST_END) gaps.push({ start: cursor, end: SUGGEST_END });
    return gaps.filter(g => g.end - g.start >= MIN_GAP);
  }

  function hasCategoryNear(pieces, category, from, to) {
    return pieces.some(p => p.entry.category === category && p.start < to && p.end > from);
  }
  function categoryMinutes(pieces, category) {
    return pieces.filter(p => p.entry.category === category).reduce((sum, p) => sum + (p.end - p.start), 0);
  }
  function mkSuggestion(slot, category, title, start, end, reason) {
    return { slot, category, title, start, end, reason, key: `${slot}|${category}|${start}` };
  }

  /** Within one contiguous free gap, carve out suggestions in priority
   * order (lunch, dinner, homework, wind-down, then whatever's left),
   * shrinking the remaining free window as each is claimed — so a
   * single long afternoon-to-evening gap can yield dinner AND a study
   * block AND a wind-down, instead of just the first thing that fits. */
  function suggestionsForSlot(slot, pieces) {
    const hasSchool = pieces.some(p => p.entry.category === 'school');
    const out = [];

    freeGapsForSlot(pieces).forEach(gap => {
      let remaining = [{ start: gap.start, end: gap.end }];

      function take(from, to, category, title, reason) {
        for (let i = 0; i < remaining.length; i++) {
          const r = remaining[i];
          if (r.start <= from && r.end >= to) {
            out.push(mkSuggestion(slot, category, title, from, to, reason));
            const pieces2 = [];
            if (from - r.start > 0) pieces2.push({ start: r.start, end: from });
            if (r.end - to > 0) pieces2.push({ start: to, end: r.end });
            remaining.splice(i, 1, ...pieces2);
            return true;
          }
        }
        return false;
      }

      if (!hasCategoryNear(pieces, 'meals', 11 * 60, 15 * 60)) {
        const from = Math.max(gap.start, 12 * 60), to = Math.min(from + 45, 14 * 60);
        if (to - from >= MIN_GAP) take(from, to, 'meals', 'Lunch', 'No lunch logged around midday');
      }
      if (!hasCategoryNear(pieces, 'meals', 17 * 60 + 30, 20 * 60)) {
        const from = Math.max(gap.start, 18 * 60), to = Math.min(from + 45, 19 * 60 + 30);
        if (to - from >= MIN_GAP) take(from, to, 'meals', 'Dinner', 'No dinner logged in the evening');
      }
      if (hasSchool && categoryMinutes(pieces, 'homework') < 60) {
        let best = null;
        remaining.filter(r => r.end > 14 * 60).forEach(r => {
          const s = Math.max(r.start, 14 * 60), e = r.end;
          if (e - s >= 30 && (!best || (e - s) > (best.end - best.start))) best = { start: s, end: e };
        });
        if (best) take(best.start, Math.min(best.start + 60, best.end), 'homework', 'Study block', 'Less than 1h of study blocked today');
      }
      if (!hasCategoryNear(pieces, 'rest', 19 * 60, SUGGEST_END)) {
        const tail = remaining.find(r => r.end >= SUGGEST_END - 15 && r.start >= 19 * 60 - 30);
        if (tail) {
          const s = Math.max(tail.start, 20 * 60), e = tail.end;
          if (e - s >= MIN_GAP) take(s, e, 'rest', 'Wind down', 'No rest/wind-down block yet this evening');
        }
      }
      remaining.forEach(r => {
        if (r.end - r.start >= 90) out.push(mkSuggestion(slot, 'free', 'Free time', r.start, Math.min(r.start + 60, r.end), 'Open time with nothing planned'));
      });
    });

    return out.slice(0, 4);
  }

  /** Habits that matter over a whole week (chores, family time, exercise)
   * shouldn't get suggested on every single day — that's noise, not help.
   * Each gets at most one suggestion across the whole two-week view,
   * placed on the first day with room for it, and only while the habit
   * has essentially no time logged anywhere in the plan yet. */
  function addWeeklyHabitOnce(all, bySlot, category, title, minDuration, reason, preferAfternoon) {
    for (let slot = 0; slot < SLOT_COUNT; slot++) {
      const pieces = bySlot[slot];
      if (categoryMinutes(pieces, category) > 0) continue;
      const claimed = all.filter(s => s.slot === slot);
      const candidates = [];
      freeGapsForSlot(pieces).forEach(gap => {
        let segs = [{ start: gap.start, end: gap.end }];
        claimed.forEach(c => {
          segs = segs.flatMap(sg => {
            if (c.start >= sg.end || c.end <= sg.start) return [sg];
            const pieces2 = [];
            if (c.start > sg.start) pieces2.push({ start: sg.start, end: c.start });
            if (c.end < sg.end) pieces2.push({ start: c.end, end: sg.end });
            return pieces2;
          });
        });
        segs.filter(sg => sg.end - sg.start >= minDuration).forEach(sg => candidates.push(sg));
      });
      if (!candidates.length) continue;
      const afternoon = candidates.find(sg => sg.start >= 14 * 60);
      const seg = (preferAfternoon && afternoon) ? afternoon : candidates[0];
      const s = mkSuggestion(slot, category, title, seg.start, seg.start + minDuration, reason);
      if (!dismissedSuggestionKeys.has(s.key)) all.push(s);
      return;
    }
  }

  function computeSuggestions() {
    const bySlot = computeBySlot();
    const all = [];
    for (let slot = 0; slot < SLOT_COUNT; slot++) {
      suggestionsForSlot(slot, bySlot[slot]).forEach(s => { if (!dismissedSuggestionKeys.has(s.key)) all.push(s); });
    }

    const totals = weeklyAverages();
    if (totals.chores === 0) addWeeklyHabitOnce(all, bySlot, 'chores', 'Chores', 15, 'No chores time logged this week', true);
    if (totals.family === 0) addWeeklyHabitOnce(all, bySlot, 'family', 'Family time', 30, 'No family time logged this week', true);
    if (totals.extracurricular / 60 < 3) addWeeklyHabitOnce(all, bySlot, 'extracurricular', 'Exercise / activity', 45, 'Less than 3h of exercise logged this week', false);

    return all;
  }

  function renderSuggestions() {
    const box = document.getElementById('suggestions-list');
    if (!box) return;
    if (!entries.length) { box.innerHTML = '<div class="empty-hint">Add a few blocks above, then check back here for gaps worth filling.</div>'; return; }

    const suggestions = computeSuggestions();
    if (!suggestions.length) { box.innerHTML = '<div class="empty-hint">Nothing obvious left to fill — your week already covers the basics.</div>'; return; }

    box.innerHTML = suggestions.map(s => {
      const cat = CATEGORIES[s.category];
      return `<div class="suggestion-row">
        <div class="suggestion-emoji">${cat.emoji}</div>
        <div class="suggestion-body">
          <div class="suggestion-title">${esc(s.title)}</div>
          <div class="suggestion-meta">${esc(slotLabel(s.slot))} · ${fmtTime(minToHHMM(s.start))}–${fmtTime(minToHHMM(s.end))}</div>
          ${s.reason ? `<div class="suggestion-reason">${esc(s.reason)}</div>` : ''}
        </div>
        <div class="suggestion-actions">
          <button class="btn-primary small" data-add="${esc(s.key)}">Add</button>
          <button class="suggestion-dismiss" data-dismiss="${esc(s.key)}" title="Dismiss"><i data-lucide="x" style="width:13px;height:13px;"></i></button>
        </div>
      </div>`;
    }).join('');

    box.querySelectorAll('[data-add]').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = suggestions.find(x => x.key === btn.dataset.add);
        if (!s) return;
        const cycleDay = slotCycleDay(s.slot);
        const entry = { category: s.category, title: s.title, start: minToHHMM(s.start), end: minToHHMM(s.end) };
        if (cycleDay) { entry.recurrence = 'cycle'; entry.cycleDays = [cycleDay]; }
        else { entry.recurrence = 'weekly'; entry.weekdays = [s.slot % 7]; }
        addEntry(entry);
        renderAll();
      });
    });
    box.querySelectorAll('[data-dismiss]').forEach(btn => {
      btn.addEventListener('click', () => {
        dismissedSuggestionKeys.add(btn.dataset.dismiss);
        saveDismissed();
        renderSuggestions();
      });
    });
    window.lucide?.createIcons();
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
    renderSuggestions();
    renderTotals();
    renderInsights();
    renderGeneralTips();
    renderEntriesList();
    renderPrintHeader();
    window.lucide?.createIcons();
  }

  // ── Calendar export (.ics) ────────────────────────────────────
  // Weekly entries export as real recurring events — no setup needed,
  // since "every Monday" doesn't depend on any external date. Cycle
  // (timetable-day) entries have no anchor to a real calendar date
  // anywhere in this app, so they need the student to supply the real
  // date of Day 1; without it they're skipped rather than guessed.
  const ICS_BYDAY = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  function icsPad2(n) { return String(n).padStart(2, '0'); }
  function icsDateTime(y, mo, d, hh, mm) { return `${y}${icsPad2(mo)}${icsPad2(d)}T${icsPad2(hh)}${icsPad2(mm)}00`; }
  function icsEscape(s) { return String(s || '').replace(/([\\,;])/g, '\\$1').replace(/\n/g, '\\n'); }
  function icsAddDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
  function icsNextDateForWeekday(weekday) {
    // weekday: 0=Mon..6=Sun (this app's convention) -> JS getDay(): 0=Sun..6=Sat
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const jsTarget = (weekday + 1) % 7;
    const diff = (jsTarget - today.getDay() + 7) % 7;
    return icsAddDays(today, diff);
  }

  function buildICS(anchorDateStr) {
    let anchor = null;
    if (anchorDateStr) {
      const [y, mo, d] = anchorDateStr.split('-').map(Number);
      anchor = new Date(y, mo - 1, d);
    }
    let skippedCycle = 0;
    const stampNow = new Date();
    const stamp = `${stampNow.getUTCFullYear()}${icsPad2(stampNow.getUTCMonth() + 1)}${icsPad2(stampNow.getUTCDate())}T${icsPad2(stampNow.getUTCHours())}${icsPad2(stampNow.getUTCMinutes())}${icsPad2(stampNow.getUTCSeconds())}Z`;

    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//The Magic Lab//Time Turner//EN', 'CALSCALE:GREGORIAN'];

    function pushEvent(uid, startDate, endDate, sh, sm, eh, em, title, catLabel, rrule) {
      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}@themagiclab.co.za`);
      lines.push(`DTSTAMP:${stamp}`);
      lines.push(`DTSTART:${icsDateTime(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), sh, sm)}`);
      lines.push(`DTEND:${icsDateTime(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate(), eh, em)}`);
      if (rrule) lines.push(`RRULE:${rrule}`);
      lines.push(`SUMMARY:${icsEscape(title)}`);
      lines.push(`CATEGORIES:${icsEscape(catLabel)}`);
      lines.push('END:VEVENT');
    }

    entries.forEach(entry => {
      const cat = CATEGORIES[entry.category] || CATEGORIES.other;
      const title = entry.title || cat.label;
      const [sh, sm] = entry.start.split(':').map(Number);
      const [eh, em] = entry.end.split(':').map(Number);
      const crosses = toMinutes(entry.end) <= toMinutes(entry.start);

      if (entry.recurrence === 'weekly') {
        const days = [...entry.weekdays].sort((a, b) => a - b);
        if (!days.length) return;
        const first = days.map(icsNextDateForWeekday).reduce((a, b) => (a < b ? a : b));
        const endDate = crosses ? icsAddDays(first, 1) : first;
        pushEvent(`tt-${entry.id}`, first, endDate, sh, sm, eh, em, title, cat.label, `FREQ=WEEKLY;BYDAY=${days.map(d => ICS_BYDAY[d]).join(',')}`);
      } else if (entry.recurrence === 'cycle') {
        if (!anchor) { skippedCycle++; return; }
        entry.cycleDays.forEach(day => {
          const week = day <= 5 ? 0 : 1;
          const weekday = (day - 1) % 5;
          const date = icsAddDays(anchor, week * 7 + weekday);
          const endDate = crosses ? icsAddDays(date, 1) : date;
          pushEvent(`tt-${entry.id}-d${day}`, date, endDate, sh, sm, eh, em, title, cat.label, null);
        });
      }
    });

    lines.push('END:VCALENDAR');
    return { ics: lines.join('\r\n'), skippedCycle };
  }

  function exportICS() {
    const msg = document.getElementById('ics-msg');
    const anchorDateStr = document.getElementById('ics-anchor-date').value || null;
    if (!entries.length) { msg.textContent = 'Add a few blocks first.'; msg.className = 'msg err'; return; }

    const { ics, skippedCycle } = buildICS(anchorDateStr);
    if (skippedCycle > 0) {
      msg.textContent = `Exported without ${skippedCycle} timetable-day block${skippedCycle === 1 ? '' : 's'} — enter the real date for Day 1 above to include ${skippedCycle === 1 ? 'it' : 'them'}.`;
      msg.className = 'msg';
    } else {
      msg.textContent = 'Exported.';
      msg.className = 'msg ok';
    }

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'time-turner-plan.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

    document.getElementById('ics-export-btn').addEventListener('click', exportICS);
    document.getElementById('print-btn').addEventListener('click', () => window.print());
    document.getElementById('clear-btn').addEventListener('click', () => {
      if (!entries.length) return;
      if (confirm('Remove everything you’ve added? This can’t be undone.')) { clearAll(); renderAll(); }
    });
  }

  function init() {
    loadEntries();
    loadDismissed();
    wireForm();
    renderAll();
  }

  window.TimeTurner = { init };
})();
