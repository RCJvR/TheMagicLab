// WRO 2026 Game Mat Planner — main app
// Initialises the static SVG overlay (grid, ruler, zones, dimensions) and
// wires up the toolbar, measurement tools, save/load, code export, print,
// custom robot presets, saved-path comparison, and the scoring estimator.

(function() {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const STORAGE_KEY = 'wro2026-gamemat-planner';
  const CUSTOM_ROBOTS_KEY = 'wro2026-custom-robots';
  const SAVED_PATHS_KEY = 'wro2026-saved-paths';
  const SCORING_KEY = 'wro2026-scoring-state';

  function el(tag, attrs = {}, parent = null) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  }
  // ---- Custom-styled dropdowns ----
  // Native <select> popups render with the OS's light-theme colours in a
  // lot of real browser/OS combinations, regardless of the page's own dark
  // theme or `color-scheme` — confirmed against an actual user's browser,
  // not just one test environment. Rather than hope color-scheme is
  // honoured, this replaces the visible popup with one this page fully
  // controls, while the original <select> stays in the DOM (invisible) as
  // the single source of truth for .value and 'change' events — so every
  // other file that reads/listens to these selects needs zero changes.
  const selectSyncRegistry = new WeakMap();
  function enhanceSelect(select) {
    if (select.dataset.enhanced) return;
    select.dataset.enhanced = '1';

    const wrap = document.createElement('span');
    wrap.className = 'csel';
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'csel-btn';
    wrap.appendChild(btn);

    const list = document.createElement('div');
    list.className = 'csel-list';
    wrap.appendChild(list);

    function sync() {
      const opt = select.options[select.selectedIndex];
      btn.textContent = opt ? opt.textContent : '';
    }
    function makeItem(opt) {
      const item = document.createElement('div');
      item.className = 'csel-item' + (opt.selected ? ' active' : '');
      item.textContent = opt.textContent;
      item.addEventListener('click', () => {
        select.value = opt.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        sync();
        close();
      });
      return item;
    }
    function build() {
      list.innerHTML = '';
      Array.from(select.children).forEach(node => {
        if (node.tagName === 'OPTGROUP') {
          const label = document.createElement('div');
          label.className = 'csel-group';
          label.textContent = node.label;
          list.appendChild(label);
          Array.from(node.children).forEach(opt => list.appendChild(makeItem(opt)));
        } else if (node.tagName === 'OPTION') {
          list.appendChild(makeItem(node));
        }
      });
    }
    function open() { build(); list.classList.add('open'); btn.classList.add('open'); }
    function close() { list.classList.remove('open'); btn.classList.remove('open'); }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (list.classList.contains('open')) close(); else open();
    });
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) close();
    });

    sync();
    selectSyncRegistry.set(select, sync);
  }
  function enhanceAllSelects() {
    document.querySelectorAll('select').forEach(enhanceSelect);
  }
  function syncSelect(select) {
    const fn = selectSyncRegistry.get(select);
    if (fn) fn();
  }

  function h(tag, attrs = {}, parent = null) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'text') e.textContent = v;
      else if (k === 'html') e.innerHTML = v;
      else e.setAttribute(k, v);
    }
    if (parent) parent.appendChild(e);
    return e;
  }

  function buildOverlay() {
    const W = window.WRO_MAT.width, H = window.WRO_MAT.height;
    const svg = document.getElementById('overlaySvg');

    // -- minor grid (50 mm) --
    const minor = el('g', { class: 'grid-minor' }, svg);
    for (let x = 50; x < W; x += 50) el('line', { x1: x, y1: 0, x2: x, y2: H }, minor);
    for (let y = 50; y < H; y += 50) el('line', { x1: 0, y1: y, x2: W, y2: y }, minor);

    // -- major grid (200 mm) --
    const major = el('g', { class: 'grid-major' }, svg);
    for (let x = 200; x < W; x += 200) el('line', { x1: x, y1: 0, x2: x, y2: H }, major);
    for (let y = 200; y < H; y += 200) el('line', { x1: 0, y1: y, x2: W, y2: y }, major);

    // -- ruler ticks + edge labels --
    const ruler = el('g', { class: 'ruler-layer' }, svg);
    for (let x = 0; x <= W; x += 100) {
      const wtick = (x % 500 === 0) ? 22 : 12;
      el('line', { class: 'tick', x1: x, y1: 0, x2: x, y2: wtick }, ruler);
      if (x % 500 === 0 && x !== 0 && x !== W) {
        const t = el('text', { x: x, y: 40,
          class: 'dim-text-light', 'font-size': 22, 'text-anchor': 'middle' }, ruler);
        t.textContent = String(x);
      }
    }
    for (let y = 0; y <= H; y += 100) {
      const wtick = (y % 500 === 0) ? 22 : 12;
      el('line', { class: 'tick', x1: 0, y1: y, x2: wtick, y2: y }, ruler);
      if (y % 500 === 0 && y !== 0 && y !== H) {
        const t = el('text', { x: 32, y: y + 8,
          class: 'dim-text-light', 'font-size': 22, 'text-anchor': 'start' }, ruler);
        t.textContent = String(y);
      }
    }

    // -- mat outer border --
    el('rect', { class: 'border-stroke', x: 0, y: 0, width: W, height: H }, svg);

    // -- centre cross-hair --
    el('line', { x1: W/2, y1: 0, x2: W/2, y2: H,
      stroke: 'rgba(255,209,102,.45)', 'stroke-dasharray': '6 6',
      'stroke-width': 1.4, 'vector-effect': 'non-scaling-stroke' }, svg);
    el('line', { x1: 0, y1: H/2, x2: W, y2: H/2,
      stroke: 'rgba(255,209,102,.45)', 'stroke-dasharray': '6 6',
      'stroke-width': 1.4, 'vector-effect': 'non-scaling-stroke' }, svg);

    // -- ½W / ½H labels (subtle) --
    const halfW = el('text', { x: W/2, y: 38,
      class: 'dim-text-light', 'font-size': 14, 'text-anchor': 'middle', opacity: .85 }, svg);
    halfW.textContent = `½ W · ${W/2}`;
    const halfH = el('text', { x: 42, y: H/2,
      class: 'dim-text-light', 'font-size': 14, 'text-anchor': 'start', opacity: .85 }, svg);
    halfH.textContent = `½ H · ${H/2}`;

    // -- zones layer --
    const zonesLayer = el('g', { class: 'zones-layer' }, svg);
    window.WRO_ZONES.forEach(z => {
      if (z.type === 'rect') {
        el('rect', {
          class: `zone-box ${z.klass}`,
          x: z.x, y: z.y, width: z.w, height: z.h, rx: 4
        }, zonesLayer);
      }
      if (z.type === 'polygon') {
        el('polygon', {
          class: `zone-box ${z.klass}`,
          points: z.points.map(p => `${p.x},${p.y}`).join(' ')
        }, zonesLayer);
      }
      if (z.label) {
        const t = el('text', {
          x: z.label.x, y: z.label.y,
          class: 'label-text', 'font-size': z.label.size || 22,
          'text-anchor': z.label.anchor || 'middle'
        }, zonesLayer);
        t.textContent = z.label.text;
      }
      if (z.sub) {
        const t = el('text', {
          x: z.sub.x, y: z.sub.y,
          class: 'label-text', 'font-size': z.sub.size || 13,
          'text-anchor': z.sub.anchor || 'middle'
        }, zonesLayer);
        t.textContent = z.sub.text;
      }
      if (z.leader) {
        el('line', {
          class: 'leader',
          x1: z.leader.x1, y1: z.leader.y1,
          x2: z.leader.x2, y2: z.leader.y2
        }, zonesLayer);
      }
    });
  }

  function zoneBBox(z) {
    if (z.type === 'rect') return { x: z.x, y: z.y, x2: z.x + z.w, y2: z.y + z.h, w: z.w, h: z.h };
    if (z.type === 'polygon') {
      const xs = z.points.map(p => p.x), ys = z.points.map(p => p.y);
      const x = Math.min(...xs), y = Math.min(...ys), x2 = Math.max(...xs), y2 = Math.max(...ys);
      return { x, y, x2, y2, w: x2 - x, h: y2 - y };
    }
    return null;
  }

  function buildKeyZonesPanel() {
    const tbody = document.querySelector('#keyZones tbody');
    if (!tbody) return;
    window.WRO_ZONES.forEach(z => {
      const b = zoneBBox(z);
      if (!b) return;
      const tr = h('tr', {}, tbody);
      h('td', { class: 'zone-name', text: z.name }, tr);
      [b.x, b.y, b.x2, b.y2, b.w, b.h].forEach(v => {
        h('td', { text: v.toFixed(0) }, tr);
      });
    });
  }

  // ---- Custom robot presets (named, saved via localStorage) ----
  function loadCustomRobots() {
    try {
      const raw = localStorage.getItem(CUSTOM_ROBOTS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
  function saveCustomRobots(list) {
    localStorage.setItem(CUSTOM_ROBOTS_KEY, JSON.stringify(list));
  }

  // A saved custom robot is { id, name, closed, open }. Older saves only had
  // { id, name, size } (from before open/closed states existed) — normalise
  // those to closed = open = size so nothing breaks for existing users.
  function normalizeCustomRobot(r) {
    const closed = r.closed != null ? r.closed : r.size;
    const open = r.open != null ? r.open : closed;
    return { id: r.id, name: r.name, closed, open };
  }
  function formatRobotLabel(name, closed, open) {
    return closed === open ? `${name} (${closed} mm)` : `${name} (${closed}/${open} mm)`;
  }

  function buildRobotProfileSelect(tools) {
    const sel = document.getElementById('robotProfile');
    const closedInput = document.getElementById('robotSizeCustom');
    const openInput = document.getElementById('robotSizeCustomOpen');
    if (!sel) return;

    // Custom presets live directly in WRO_ROBOT_PROFILES so tools.js's
    // existing getRobotSize() lookup (which only knows that array) picks
    // them up with no changes on its side. This is the single source of
    // truth for what populate() renders — it must never also re-read
    // localStorage directly, or saved robots end up listed twice.
    function syncProfilesArray() {
      const builtins = window.WRO_ROBOT_PROFILES.filter(p => !p.userAdded);
      const saved = loadCustomRobots().map(normalizeCustomRobot).map(r => ({
        id: r.id, name: formatRobotLabel(r.name, r.closed, r.open),
        size: r.closed, openSize: r.open, userAdded: true,
      }));
      window.WRO_ROBOT_PROFILES = builtins.concat(saved);
    }
    syncProfilesArray();

    function populate() {
      sel.innerHTML = '';
      window.WRO_ROBOT_PROFILES.filter(p => !p.userAdded).forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        if (p.id === 'custom') opt.selected = true;
        sel.appendChild(opt);
      });
      const saved = window.WRO_ROBOT_PROFILES.filter(p => p.userAdded);
      if (saved.length) {
        const group = document.createElement('optgroup');
        group.label = 'Your saved robots';
        saved.forEach(r => {
          const opt = document.createElement('option');
          opt.value = r.id;
          opt.textContent = r.name;
          group.appendChild(opt);
        });
        sel.appendChild(group);
      }
    }
    populate();

    function syncCustomVisibility() {
      const profile = window.WRO_ROBOT_PROFILES.find(p => p.id === sel.value);
      const visible = !!(profile && profile.custom);
      const fields = document.getElementById('robotSizeFields');
      if (fields) fields.style.display = visible ? '' : 'none';
    }
    sel.addEventListener('change', syncCustomVisibility);
    syncCustomVisibility();

    // ---- Closed/Open toggle (controls which size ROBOT/POSE draw) ----
    const stateToggle = document.getElementById('robotStateToggle');
    if (stateToggle) {
      stateToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          stateToggle.dataset.state = btn.dataset.state;
          stateToggle.querySelectorAll('button').forEach(b => b.classList.toggle('active', b === btn));
          if (tools) tools.redraw();
        });
      });
    }

    function currentSizes() {
      const profile = window.WRO_ROBOT_PROFILES.find(p => p.id === sel.value);
      if (profile && profile.custom && closedInput) {
        const c = parseInt(closedInput.value, 10);
        const o = openInput ? parseInt(openInput.value, 10) : c;
        return {
          closed: (!isNaN(c) && c > 0) ? c : profile.size,
          open: (!isNaN(o) && o > 0) ? o : ((!isNaN(c) && c > 0) ? c : profile.size),
        };
      }
      if (!profile) return { closed: 250, open: 250 };
      return { closed: profile.size, open: profile.openSize || profile.size };
    }

    // ---- Save-as-preset inline form (replaces a chain of prompt() calls
    // so both sizes can be entered/edited together) ----
    const saveBtn = document.getElementById('robotSaveBtn');
    const saveForm = document.getElementById('robotSaveForm');
    const saveNameInput = document.getElementById('robotSaveName');
    const saveClosedInput = document.getElementById('robotSaveClosed');
    const saveOpenInput = document.getElementById('robotSaveOpen');
    if (saveBtn && saveForm) {
      saveBtn.addEventListener('click', () => {
        const sizes = currentSizes();
        saveNameInput.value = '';
        saveClosedInput.value = sizes.closed;
        saveOpenInput.value = sizes.open;
        saveForm.style.display = '';
        saveNameInput.focus();
      });
      document.getElementById('robotSaveCancel').addEventListener('click', () => {
        saveForm.style.display = 'none';
      });
      document.getElementById('robotSaveConfirm').addEventListener('click', () => {
        const trimmed = saveNameInput.value.trim();
        if (!trimmed) { toast('Name needed — not saved'); saveNameInput.focus(); return; }
        const closed = parseInt(saveClosedInput.value, 10) || 220;
        const open = parseInt(saveOpenInput.value, 10) || closed;
        const list = loadCustomRobots();
        list.push({ id: `user_${Date.now()}`, name: trimmed, closed, open });
        saveCustomRobots(list);
        syncProfilesArray();
        populate();
        sel.value = list[list.length - 1].id;
        syncSelect(sel);
        syncCustomVisibility();
        renderCustomRobotList();
        saveForm.style.display = 'none';
        toast(`Saved "${trimmed}" · ${closed === open ? closed + ' mm' : closed + '/' + open + ' mm'}`);
      });
    }

    function renderCustomRobotList() {
      const box = document.getElementById('robotCustomList');
      if (!box) return;
      const list = loadCustomRobots().map(normalizeCustomRobot);
      box.innerHTML = '';
      box.style.display = list.length ? '' : 'none';
      list.forEach(r => {
        const row = h('div', { class: 'chip' }, box);
        h('span', { text: r.closed === r.open ? `${r.name} · ${r.closed} mm` : `${r.name} · ${r.closed}/${r.open} mm` }, row);
        const del = h('button', { text: '×', title: 'Delete this preset', type: 'button' }, row);
        del.addEventListener('click', () => {
          const next = loadCustomRobots().filter(x => x.id !== r.id);
          saveCustomRobots(next);
          syncProfilesArray();
          const wasSelected = sel.value === r.id;
          populate();
          if (wasSelected) sel.value = 'custom';
          syncSelect(sel);
          syncCustomVisibility();
          renderCustomRobotList();
          toast(`Deleted "${r.name}"`);
        });
      });
    }
    renderCustomRobotList();

    return { currentSizes };
  }

  // ---- Toast ----
  let toastTimer = null;
  function toast(message) {
    const t = document.getElementById('toast');
    t.textContent = message;
    t.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  // ---- Save / Load (localStorage) ----
  function saveState(tools) {
    try {
      const state = { measurements: tools.measurements, savedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      toast(`Saved · ${state.measurements.length} measurement${state.measurements.length === 1 ? '' : 's'}`);
    } catch (err) {
      toast('Save failed · ' + err.message);
    }
  }
  function loadState(tools) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { toast('Nothing saved yet'); return; }
      const state = JSON.parse(raw);
      if (!state.measurements) { toast('Saved data is corrupt'); return; }
      tools.measurements = state.measurements;
      const when = new Date(state.savedAt).toLocaleString();
      toast(`Loaded ${state.measurements.length} from ${when}`);
    } catch (err) {
      toast('Load failed · ' + err.message);
    }
  }

  // ---- Saved / named paths, with a comparison table ----
  function loadSavedPaths() {
    try {
      const raw = localStorage.getItem(SAVED_PATHS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }
  function persistSavedPaths(list) {
    localStorage.setItem(SAVED_PATHS_KEY, JSON.stringify(list));
  }

  function setupSavedPaths(tools) {
    const section = document.getElementById('savedPathsSection');
    const tbody = document.getElementById('savedPathsBody');
    const saveBtn = document.getElementById('savePathBtn');
    if (!section || !tbody) return;

    const M = window.WRO_TOOLS.math;

    function render() {
      const list = loadSavedPaths();
      section.style.display = list.length ? '' : 'none';
      tbody.innerHTML = '';
      const sorted = list.slice().sort((a, b) => a.totalMm - b.totalMm);
      const shortest = sorted.length ? sorted[0].totalMm : null;
      sorted.forEach(p => {
        const tr = h('tr', {}, tbody);
        h('td', { text: p.name }, tr);
        h('td', { text: `${p.points.length}` }, tr);
        const distTd = h('td', { text: `${p.totalMm.toFixed(0)} mm` }, tr);
        if (shortest !== null && p.totalMm === shortest && sorted.length > 1) {
          distTd.classList.add('best');
        }
        h('td', { text: p.legs.map(l => l.toFixed(0)).join(' + ') }, tr);
        h('td', { text: new Date(p.savedAt).toLocaleDateString() }, tr);
        const actions = h('td', { class: 'actions' }, tr);
        const loadBtn = h('button', { text: 'Load', type: 'button', class: 'chip-btn' }, actions);
        loadBtn.addEventListener('click', () => {
          const newPath = {
            id: Date.now(),
            tool: 'path',
            points: p.points.map(pt => ({ x: pt.x, y: pt.y })),
            colour: window.WRO_TOOLS.COLOURS[tools.measurements.length % window.WRO_TOOLS.COLOURS.length],
          };
          tools.measurements = tools.measurements.concat([newPath]);
          toast(`Loaded "${p.name}" onto the mat`);
        });
        const delBtn = h('button', { text: '×', type: 'button', class: 'chip-btn danger', title: 'Delete saved path' }, actions);
        delBtn.addEventListener('click', () => {
          persistSavedPaths(loadSavedPaths().filter(x => x.id !== p.id));
          render();
          toast(`Deleted "${p.name}"`);
        });
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const paths = tools.measurements.filter(m => m.tool === 'path' && m.points.length >= 2);
        if (!paths.length) { toast('Draw a PATH first'); return; }
        const last = paths[paths.length - 1];
        const name = window.prompt('Save this path as:', `Path ${loadSavedPaths().length + 1}`);
        if (name === null) return;
        const trimmed = name.trim();
        if (!trimmed) { toast('Name needed — not saved'); return; }
        const legs = [];
        for (let i = 1; i < last.points.length; i++) legs.push(M.dist(last.points[i-1], last.points[i]));
        const entry = {
          id: Date.now(),
          name: trimmed,
          savedAt: new Date().toISOString(),
          points: last.points.map(pt => ({ x: pt.x, y: pt.y })),
          totalMm: M.pathLength(last.points),
          legs,
        };
        const list = loadSavedPaths();
        list.push(entry);
        persistSavedPaths(list);
        render();
        toast(`Saved "${trimmed}" · ${entry.totalMm.toFixed(0)} mm`);
      });
    }

    render();
  }

  // ---- Scoring estimator (mirrors the official scoring sheet) ----
  function loadScoringState() {
    try {
      const raw = localStorage.getItem(SCORING_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  }
  function persistScoringState(state) {
    localStorage.setItem(SCORING_KEY, JSON.stringify(state));
  }

  function buildScoringPanel() {
    const section = document.getElementById('scoringPanel');
    if (!section) return;
    if (!window.WRO_SCORING) { section.style.display = 'none'; return; }
    section.style.display = '';

    const state = loadScoringState();
    const totalEl = document.getElementById('scoringTotal');
    const body = document.getElementById('scoringBody');
    body.innerHTML = '';

    function getItemPoints(item) {
      const v = state[item.id];
      if (item.type === 'tristate') {
        const s = item.states.find(s => s.value === v) || item.states[0];
        return s.points;
      }
      if (item.type === 'counter') {
        const n = Math.max(0, Math.min(item.maxCount, parseInt(v, 10) || 0));
        return n * item.points;
      }
      if (item.type === 'checkbox') {
        return v ? item.points : 0;
      }
      return 0;
    }

    function recompute() {
      let total = 0;
      window.WRO_SCORING.categories.forEach(cat => {
        let catTotal = 0;
        cat.items.forEach(item => { catTotal += getItemPoints(item); });
        total += catTotal;
        const catEl = document.getElementById(`scoreCat_${cat.id}`);
        if (catEl) catEl.textContent = `${catTotal} pts`;
      });
      totalEl.textContent = `${total} / ${window.WRO_SCORING.maxScore}`;
      persistScoringState(state);
    }

    window.WRO_SCORING.categories.forEach(cat => {
      const catBox = h('div', { class: 'score-cat' }, body);
      const head = h('div', { class: 'score-cat-head' }, catBox);
      h('span', { class: 'score-cat-name', text: cat.name }, head);
      h('span', { class: 'score-cat-sub', id: `scoreCat_${cat.id}` }, head);

      cat.items.forEach(item => {
        const row = h('div', { class: 'score-row' }, catBox);
        h('span', { class: 'score-row-label', text: item.label }, row);
        const ctrl = h('div', { class: 'score-row-ctrl' }, row);

        if (item.type === 'tristate') {
          if (state[item.id] === undefined) state[item.id] = 'none';
          const group = h('div', { class: 'tristate' }, ctrl);
          item.states.forEach(s => {
            const btn = h('button', { type: 'button', text: s.value === 'none' ? '—' : `${s.points}`, title: s.label }, group);
            btn.classList.toggle('active', state[item.id] === s.value);
            btn.addEventListener('click', () => {
              state[item.id] = s.value;
              group.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', item.states[i].value === s.value));
              recompute();
            });
          });
        } else if (item.type === 'counter') {
          if (state[item.id] === undefined) state[item.id] = 0;
          const input = h('input', { type: 'number', min: '0', max: String(item.maxCount), value: String(state[item.id]) }, ctrl);
          h('span', { class: 'score-row-hint', text: `× ${item.points} (max ${item.max})` }, ctrl);
          input.addEventListener('input', () => {
            state[item.id] = Math.max(0, Math.min(item.maxCount, parseInt(input.value, 10) || 0));
            recompute();
          });
        } else if (item.type === 'checkbox') {
          if (state[item.id] === undefined) state[item.id] = false;
          const label = h('label', { class: 'score-check' }, ctrl);
          const cb = h('input', { type: 'checkbox' }, label);
          cb.checked = !!state[item.id];
          h('span', { text: `${item.points} pts` }, label);
          cb.addEventListener('change', () => {
            state[item.id] = cb.checked;
            recompute();
          });
        }
      });
    });

    recompute();

    const resetBtn = document.getElementById('scoringReset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        Object.keys(state).forEach(k => delete state[k]);
        persistScoringState(state);
        buildScoringPanel();
        toast('Scoring reset');
      });
    }
  }
  // Lets program.js's route-simulation push tool/mosaic/cement counts into
  // the same localStorage the panel reads, then ask it to redraw.
  window.WRO_SCORING_REFRESH = buildScoringPanel;

  // ---- Code export modal ----
  function setupExportModal(tools) {
    const modal = document.getElementById('exportModal');
    const exportBtn = document.getElementById('exportCode');
    const closeBtn = modal.querySelector('button.close');
    const formatSel = modal.querySelector('#exportFormat');
    const ta = modal.querySelector('textarea');
    const copyBtn = modal.querySelector('#copyCode');
    const downloadBtn = modal.querySelector('#downloadCode');

    function regenerate() {
      const fmt = formatSel.value;
      const code = window.WRO_CODEGEN.generate(fmt, tools.measurements, { robotSize: 250 });
      ta.value = code;
    }

    exportBtn.addEventListener('click', () => {
      regenerate();
      modal.classList.add('open');
    });
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });
    formatSel.addEventListener('change', regenerate);
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(ta.value);
        toast('Copied to clipboard');
      } catch {
        ta.select();
        document.execCommand('copy');
        toast('Copied');
      }
    });
    downloadBtn.addEventListener('click', () => {
      const fmt = formatSel.value;
      const ext = (fmt === 'python') ? 'py' : (fmt === 'json') ? 'json' : 'txt';
      const blob = new Blob([ta.value], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `wro2026-path.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // ---- Init ----
  function init() {
    buildOverlay();
    buildKeyZonesPanel();
    buildScoringPanel();

    const stage = document.getElementById('stage');
    const measSvg = document.getElementById('measureSvg');
    const measLayer = document.getElementById('measLayer');
    const liveLayer = document.getElementById('liveLayer');
    const readout = document.getElementById('readout');
    const measList = document.getElementById('measList');
    const snapEl = document.getElementById('snapToggle');
    const robotSelect = document.getElementById('robotProfile');

    const tools = window.WRO_TOOLS.create({
      stage, measSvg, measLayer, liveLayer, readout, measList, snapEl, robotSelect,
      onChange: () => {}
    });

    buildRobotProfileSelect(tools);

    // Toolbar wiring
    document.querySelectorAll('button[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => tools.setTool(btn.dataset.tool));
    });
    document.getElementById('showGrid').addEventListener('change', e => {
      stage.dataset.showGrid = e.target.checked ? 'true' : 'false';
    });
    document.getElementById('showZones').addEventListener('change', e => {
      stage.dataset.showZones = e.target.checked ? 'true' : 'false';
    });
    document.getElementById('showRuler').addEventListener('change', e => {
      stage.dataset.showRuler = e.target.checked ? 'true' : 'false';
    });
    document.getElementById('clearAll').addEventListener('click', () => tools.clearAll());

    document.getElementById('saveBtn').addEventListener('click', () => saveState(tools));
    document.getElementById('loadBtn').addEventListener('click', () => loadState(tools));
    document.getElementById('printBtn').addEventListener('click', () => window.print());

    // Robot profile change → redraw existing footprints with new size
    robotSelect.addEventListener('change', () => tools.redraw());
    const customInput = document.getElementById('robotSizeCustom');
    const customOpenInput = document.getElementById('robotSizeCustomOpen');
    if (customInput) customInput.addEventListener('input', () => tools.redraw());
    if (customOpenInput) customOpenInput.addEventListener('input', () => tools.redraw());

    setupExportModal(tools);
    setupSavedPaths(tools);
    if (window.WRO_PROGRAM) window.WRO_PROGRAM.init(tools);

    // Runs last so it picks up every <select> — including the ones
    // program.js just populated (robot ports, etc).
    enhanceAllSelects();

    // Auto-load if there's saved state? Skip — explicit is better.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
