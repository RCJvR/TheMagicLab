// WRO 2026 Game Mat Planner — main app
// Initialises the static SVG overlay (grid, ruler, zones, dimensions) and
// wires up the toolbar, measurement tools, save/load, code export, and print.

(function() {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const STORAGE_KEY = 'wro2026-gamemat-planner';

  function el(tag, attrs = {}, parent = null) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
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
      const h = (x % 500 === 0) ? 22 : 12;
      el('line', { class: 'tick', x1: x, y1: 0, x2: x, y2: h }, ruler);
      if (x % 500 === 0 && x !== 0 && x !== W) {
        const t = el('text', { x: x, y: 40,
          class: 'dim-text-light', 'font-size': 22, 'text-anchor': 'middle' }, ruler);
        t.textContent = String(x);
      }
    }
    for (let y = 0; y <= H; y += 100) {
      const w = (y % 500 === 0) ? 22 : 12;
      el('line', { class: 'tick', x1: 0, y1: y, x2: w, y2: y }, ruler);
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

  function buildKeyZonesPanel() {
    const dl = document.querySelector('#keyZones dl');
    if (!dl) return;
    window.WRO_ZONES.forEach(z => {
      const dt = document.createElement('dt');
      dt.textContent = z.name;
      const dd = document.createElement('dd');
      if (z.type === 'rect') {
        dd.textContent = `(${z.x.toFixed(0)}, ${z.y.toFixed(0)}) → (${(z.x+z.w).toFixed(0)}, ${(z.y+z.h).toFixed(0)})  ·  ${z.w.toFixed(0)} × ${z.h.toFixed(0)} mm`;
      }
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
  }

  function buildRobotProfileSelect() {
    const sel = document.getElementById('robotProfile');
    const customInput = document.getElementById('robotSizeCustom');
    if (!sel) return;
    window.WRO_ROBOT_PROFILES.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      if (p.id === 'custom') opt.selected = true;
      sel.appendChild(opt);
    });
    function syncCustomVisibility() {
      const profile = window.WRO_ROBOT_PROFILES.find(p => p.id === sel.value);
      const visible = !!(profile && profile.custom);
      const unitLabel = document.getElementById('robotSizeUnit');
      if (customInput) customInput.style.display = visible ? '' : 'none';
      if (unitLabel)   unitLabel.style.display = visible ? '' : 'none';
    }
    sel.addEventListener('change', syncCustomVisibility);
    syncCustomVisibility();
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
    buildRobotProfileSelect();

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
    if (customInput) {
      customInput.addEventListener('input', () => tools.redraw());
    }

    setupExportModal(tools);

    // Auto-load if there's saved state? Skip — explicit is better.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
