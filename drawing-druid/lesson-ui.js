// Drawing Druid: the Lesson tab controller shared by every chapter page.
//   - a drop-down to choose the drawing, with previous / next drawing buttons;
//   - a step track under the drawing (one numbered segment per step, the finished drawing last),
//     Previous / Next buttons, the full instruction, and an "All steps" overview;
//   - keyboard: ← → steps, Home / End first step / finished drawing, [ ] or PgUp / PgDn drawings,
//     + − 0 zoom, Shift + arrows pan, L construction lines, B background, ? help;
//   - the place is kept in the URL (#d=<id>&s=<step>) so a refresh or a shared link returns to it;
//   - a rotatable 3D model under the instruction when the model carries its solids (_solids or _iso)
//     or model-defs.js has one for its id (model3d.js and model-defs.js are loaded on demand). opts.show3d(id) → false hides it (course drawings, learners).
// Usage (after engine.js and the chapter data): const lesson = DruidLesson.mount({ order, constructions, stepWord });
(function (global) {
  'use strict';
  const CE = global.ConstructionEngine;
  const HERE = (document.currentScript && document.currentScript.src) || '';

  // the 3D model panel: loads model3d.js the first time a drawing has solids
  function model3dPanel(after) {
    const holder = document.createElement('div');
    after.insertAdjacentElement('afterend', holder);
    let viewer = null, want = null;
    const loaded = {};
    const script = (name, ready) => loaded[name] || (loaded[name] = new Promise((ok, bad) => {
      if (ready()) return ok();
      const sc = document.createElement('script');
      sc.src = HERE.replace(/lesson-ui\.js(\?.*)?$/, name);
      sc.onload = ok; sc.onerror = bad; document.head.appendChild(sc);
    }));
    return {
      show(md) {
        want = md;
        if (!md) { if (viewer) viewer.hide(); return; }
        // a builder's own solids, or a hand-made model from model-defs.js
        const own = md._solids || md._iso;
        const defs = own ? Promise.resolve(null) : script('model-defs.js', () => global.DruidModelDefs);
        defs.then(() => {
          const solids = own || global.DruidModelDefs.get(md.id, md);
          if (want !== md) return;
          if (!solids) { if (viewer) viewer.hide(); return; }
          return script('model3d.js', () => global.DruidModel3D).then(() => {
            if (want !== md) return;
            if (!viewer) viewer = global.DruidModel3D.attach(holder);
            viewer.show(solids, { projection: md.projection });
          });
        }).catch(() => {});
      },
    };
  }

  // "Check my drawing": closed until opened, then selfcheck.js is loaded for the current drawing
  function selfCheckPanel(after) {
    const box = document.createElement('details');
    box.className = 'dl-check';
    box.innerHTML = '<summary>Check my drawing <span>photograph your drawing and lay the finished drawing over it</span></summary><div class="dl-check-body"></div>';
    after.insertAdjacentElement('afterend', box);
    let tool = null, model = null, loading = null;
    const load = () => loading || (loading = new Promise((ok, bad) => {
      if (global.DruidSelfCheck) return ok();
      const sc = document.createElement('script');
      sc.src = HERE.replace(/lesson-ui\.js(\?.*)?$/, 'selfcheck.js');
      sc.onload = ok; sc.onerror = bad; document.head.appendChild(sc);
    }));
    const sync = () => { if (!box.open || !model) return; load().then(() => { if (!tool) tool = global.DruidSelfCheck.mount(box.querySelector('.dl-check-body')); tool.show(model); }).catch(() => {}); };
    box.addEventListener('toggle', sync);
    return { show(md) { model = md; box.hidden = !md; sync(); } };
  }

  function injectStyle() {
    if (document.getElementById('dl-style')) return;
    const s = document.createElement('style');
    s.id = 'dl-style';
    s.textContent = [
      '.dl-check{margin-top:12px;border:1px solid var(--border);border-radius:12px;overflow:hidden}',
      '.dl-check summary{cursor:pointer;padding:9px 14px;font-weight:800;font-size:13px;color:var(--text)}',
      '.dl-check summary span{font-weight:500;color:var(--muted);margin-left:6px;font-size:12px}',
      '.dl-check-body{padding:4px 14px 14px}',
      '.lesson-main.dl-single{display:block}',
      '.lesson-main.dl-single .step-panel{display:none}',
      '.dl-bar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:18px}',
      '.dl-label{font-family:var(--fm);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}',
      '.dl-select-wrap{position:relative;flex:1 1 320px;min-width:0;max-width:640px}',
      '.dl-select{width:100%;appearance:none;-webkit-appearance:none;font-family:var(--fd);font-size:14px;font-weight:700;color:var(--text);background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 38px 10px 14px;cursor:pointer;text-overflow:ellipsis}',
      '.dl-select-wrap::after{content:"";position:absolute;right:15px;top:50%;width:8px;height:8px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:translateY(-70%) rotate(45deg);pointer-events:none}',
      '.dl-select option{color:#111;background:#fff}',
      '.dl-drawnav{display:flex;align-items:center;gap:6px}',
      '.dl-count{font-family:var(--fm);font-size:12px;color:var(--muted);min-width:58px;text-align:center}',
      '.dl-btn{font-family:var(--fd);font-size:13px;font-weight:700;min-width:38px;height:38px;padding:0 12px;border-radius:9px;border:1px solid var(--border);background:var(--surface);color:var(--text);cursor:pointer}',
      '.dl-btn:hover:not(:disabled){border-color:rgba(234,179,8,.45)}',
      '.dl-btn:disabled{opacity:.35;cursor:default}',
      '.dl-btn:focus-visible,.dl-select:focus-visible,.dl-seg:focus-visible,.dl-link:focus-visible{outline:2px solid #fde047;outline-offset:2px}',
      '.dl-primary{background:rgba(234,179,8,.14);border-color:rgba(234,179,8,.45);color:#fde047}',
      '.dl-stepper{display:flex;align-items:center;gap:10px}',
      '.dl-single .svg-card-title{display:none}',
      '.dl-single .callout{margin:12px 0 0}',
      '.dl-track{flex:1;display:flex;gap:3px;min-width:0}',
      '.dl-seg{flex:1 1 0;min-width:6px;height:30px;border-radius:6px;border:1px solid var(--border);background:var(--surface);color:var(--muted);font-family:var(--fm);font-size:11px;font-weight:700;cursor:pointer;padding:0;overflow:hidden;white-space:nowrap}',
      '.dl-seg:hover{border-color:rgba(234,179,8,.45);color:var(--text)}',
      '.dl-seg.done{background:rgba(234,179,8,.16);color:#fde047}',
      '.dl-seg.current{background:#fde047;border-color:#fde047;color:#0a0c12}',
      '.dl-track.dense .dl-seg{font-size:0}',
      '.dl-track.dense .dl-seg.current{font-size:11px;flex:0 0 auto;min-width:30px}',
      '.dl-status{display:flex;justify-content:space-between;align-items:center;gap:10px;font-family:var(--fm);font-size:12px;color:var(--muted)}',
      '.dl-link{background:none;border:none;padding:2px 0;font:inherit;color:var(--muted);text-decoration:underline;cursor:pointer}',
      '.dl-link:hover{color:var(--text)}',
      '.dl-all{margin-top:12px;font-size:12.5px;color:var(--muted)}',
      '.dl-all summary{cursor:pointer;font-family:var(--fd);font-weight:700;color:var(--text);padding:4px 0}',
      '.dl-all ol{margin:8px 0 0;padding-left:24px;display:flex;flex-direction:column;gap:4px;line-height:1.55}',
      '.dl-all li{cursor:pointer;padding:3px 6px;border-radius:6px}',
      '.dl-all li:hover{color:var(--text)}',
      '.dl-all li.current{color:#fde047;background:rgba(234,179,8,.10)}',
      '.dl-help{margin:auto;max-width:440px;width:calc(100% - 32px);border:1px solid var(--border);border-radius:14px;background:#11141c;color:#e8eaf2;padding:20px 22px}',
      '.dl-help::backdrop{background:rgba(0,0,0,.55)}',
      '.dl-help h3{margin:0 0 12px;font-size:15px}',
      '.dl-help table{width:100%;border-collapse:collapse;font-size:13px}',
      '.dl-help td{padding:5px 4px;border-bottom:1px solid rgba(255,255,255,.08);vertical-align:top}',
      '.dl-help td:first-child{white-space:nowrap;padding-right:14px}',
      '.dl-help kbd{font-family:var(--fm);font-size:11.5px;padding:2px 6px;border-radius:5px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.06)}',
      '.dl-help .dl-btn{margin-top:14px}',
      '@media (max-width:640px){.dl-stepper{flex-wrap:wrap}.dl-track{order:-1;flex-basis:100%}.dl-stepper .dl-btn{flex:1}.dl-status .dl-link{display:none}}',
    ].join('');
    document.head.appendChild(s);
  }

  const KEYS = [
    ['→  or  Space', 'Next step'], ['←', 'Previous step'], ['Home', 'First step'], ['End', 'Finished drawing'],
    [']  or  Page Down', 'Next drawing'], ['[  or  Page Up', 'Previous drawing'],
    ['+  /  −', 'Zoom in / out'], ['0', 'Fit the whole drawing'], ['Shift + arrows', 'Move around when zoomed in'],
    ['L', 'Construction lines on / off'], ['B', 'Paper / dark background'], ['?', 'Show these shortcuts'],
  ];

  function mount(opts) {
    injectStyle();
    const order = opts.order, C = opts.constructions, word = opts.stepWord || 'Step';
    let id = order[0], step = 1;
    const m = /#d=([^&]+)&s=(\d+)/.exec(location.hash);
    if (m && C[decodeURIComponent(m[1])] && order.includes(decodeURIComponent(m[1]))) { id = decodeURIComponent(m[1]); step = +m[2] || 1; }

    const tab = document.getElementById('tab-lesson');
    const svg = document.getElementById('lessonSvg');
    const callout = document.getElementById('stepCallout');
    const titleEl = document.getElementById('constrTitle');
    tab.querySelector('.lesson-main').classList.add('dl-single');
    const panel3d = model3dPanel(callout);
    const panelCheck = selfCheckPanel(callout.nextElementSibling);
    // opts.selfCheck(id) → false hides it (course drawings: the overlay would show learners the memo)
    const showCheck = md => panelCheck.show(md && (!opts.selfCheck || opts.selfCheck(md.id)) ? md : null);
    let shown3d = null;
    function show3d(md) {
      const k = md && (!opts.show3d || opts.show3d(md.id)) ? md : null;
      if (k === shown3d) return;
      shown3d = k; panel3d.show(k);
    }

    // ── drawing chooser ──
    const bar = document.getElementById('constrPicker');
    bar.className = 'dl-bar';
    bar.innerHTML = '<label class="dl-label" for="dlSelect">Drawing</label>' +
      '<div class="dl-select-wrap"><select id="dlSelect" class="dl-select"></select></div>' +
      '<div class="dl-drawnav"><button type="button" class="dl-btn" id="dlPrevDrawing" aria-label="Previous drawing" title="Previous drawing ( [ )">‹</button>' +
      '<span class="dl-count" id="dlDrawCount" aria-live="polite"></span>' +
      '<button type="button" class="dl-btn" id="dlNextDrawing" aria-label="Next drawing" title="Next drawing ( ] )">›</button></div>';
    const select = bar.querySelector('#dlSelect');
    // opts.locked(id) → a message while a drawing is not available yet (course drawings), else null
    const lockMsg = k => (opts.locked ? opts.locked(k) : null);
    function fillSelect() {
      select.innerHTML = '';
      order.forEach((k, i) => { const o = document.createElement('option'); o.value = k; o.textContent = (i + 1) + '.  ' + (lockMsg(k) ? '🔒 ' : '') + C[k].title; select.appendChild(o); });
    }
    fillSelect();

    // ── step track, status, all-steps overview, help ──
    const wrap = svg.closest('.svg-wrap');
    const stepper = document.createElement('div');
    stepper.className = 'dl-stepper';
    stepper.innerHTML = '<button type="button" class="dl-btn" id="dlPrev" title="Previous step ( ← )">← Previous</button>' +
      '<div class="dl-track" id="dlTrack" role="group" aria-label="Steps"></div>' +
      '<button type="button" class="dl-btn dl-primary" id="dlNext" title="Next step ( → )">Next →</button>';
    wrap.before(stepper);
    stepper.after(callout);
    const status = document.createElement('div');
    status.className = 'dl-status';
    status.innerHTML = '<span id="dlStepLabel" aria-live="polite"></span><button type="button" class="dl-link" id="dlKeysBtn">Keyboard shortcuts ( ? )</button>';
    wrap.after(status);
    const all = document.createElement('details');
    all.className = 'dl-all';
    all.innerHTML = '<summary>All steps</summary><ol id="dlAll"></ol>';
    status.after(all);
    const help = document.createElement('dialog');
    help.className = 'dl-help';
    help.innerHTML = '<h3>Keyboard shortcuts</h3><table>' + KEYS.map(([k, d]) => '<tr><td>' + k.split('  ').map(x => /^(or|\/|\+)$/.test(x.trim()) ? ' ' + x.trim() + ' ' : '<kbd>' + x.trim() + '</kbd>').join('') + '</td><td>' + d + '</td></tr>').join('') +
      '</table><button type="button" class="dl-btn" id="dlHelpClose">Close</button>';
    document.body.appendChild(help);

    const $ = s => document.getElementById(s);
    const track = $('dlTrack'), list = $('dlAll');

    function model() { return C[id]; }
    function setDrawing(k) { if (k === id) return; id = k; step = 1; render(); }
    function go(n) { const N = model().steps.length; step = Math.max(1, Math.min(N, n)); render(); }
    function moveDrawing(d) { const i = order.indexOf(id) + d; if (i >= 0 && i < order.length) setDrawing(order[i]); }

    function render() {
      fillSelect();
      const lockedNow = lockMsg(id);
      if (lockedNow) {
        const idx = order.indexOf(id);
        if (titleEl) titleEl.textContent = C[id].title;
        select.value = id;
        $('dlDrawCount').textContent = (idx + 1) + ' / ' + order.length;
        $('dlPrevDrawing').disabled = idx <= 0;
        $('dlNextDrawing').disabled = idx >= order.length - 1;
        track.innerHTML = ''; list.innerHTML = '';
        $('dlPrev').disabled = true; $('dlNext').disabled = true;
        while (svg.firstChild) svg.removeChild(svg.firstChild);
        callout.innerHTML = '<strong>🔒 Locked:</strong> ' + lockedNow;
        $('dlStepLabel').textContent = 'Locked';
        show3d(null);
        showCheck(null);
        if (opts.onRender) opts.onRender(id, 0, true);
        return;
      }
      const md = model(), N = md.steps.length, idx = order.indexOf(id);
      step = Math.max(1, Math.min(N, step));
      if (titleEl) titleEl.textContent = md.title;
      select.value = id;
      $('dlDrawCount').textContent = (idx + 1) + ' / ' + order.length;
      $('dlPrevDrawing').disabled = idx <= 0;
      $('dlNextDrawing').disabled = idx >= order.length - 1;

      track.innerHTML = '';
      track.classList.toggle('dense', N > 24);
      md.steps.forEach((s, i) => {
        const n = i + 1, b = document.createElement('button');
        b.type = 'button';
        b.className = 'dl-seg' + (n < step ? ' done' : '') + (n === step ? ' current' : '');
        const fin = /^FINISHED DRAWING/.test(s.instruction);
        b.textContent = fin ? '✓' : String(n);
        b.title = (fin ? 'Finished drawing' : word + ' ' + n) + ': ' + s.instruction.slice(0, 90) + (s.instruction.length > 90 ? '…' : '');
        b.setAttribute('aria-label', fin ? 'Finished drawing' : word + ' ' + n);
        if (n === step) b.setAttribute('aria-current', 'step');
        b.onclick = () => go(n);
        track.appendChild(b);
      });

      CE.render(svg, md, { uptoStep: step, mode: 'interactive' });
      show3d(md);
      showCheck(md);
      const s = md.steps[step - 1];
      let html = '<strong>' + word + ' ' + step + ' of ' + N + ':</strong> ' + s.instruction;
      if (s.measurement && s.measurement.label) html += '<div class="step-measure">📏 ' + s.measurement.label + '</div>';
      callout.innerHTML = html;
      $('dlStepLabel').textContent = step === N ? 'Finished drawing' : word + ' ' + step + ' of ' + N;
      $('dlPrev').disabled = step <= 1;
      $('dlNext').disabled = step >= N;

      list.innerHTML = '';
      md.steps.forEach((st, i) => {
        const li = document.createElement('li');
        li.textContent = st.instruction;
        if (i + 1 === step) li.className = 'current';
        li.onclick = () => go(i + 1);
        list.appendChild(li);
      });

      try { history.replaceState(null, '', '#d=' + encodeURIComponent(id) + '&s=' + step); } catch (e) { /* sandboxed */ }
      if (step === N && global.MagicLabProgress) global.MagicLabProgress.track('drawing-druid', 'lesson_complete', { topic: id });
      if (opts.onRender) opts.onRender(id, step);
    }

    select.addEventListener('change', () => setDrawing(select.value));
    $('dlPrevDrawing').onclick = () => moveDrawing(-1);
    $('dlNextDrawing').onclick = () => moveDrawing(1);
    $('dlPrev').onclick = () => go(step - 1);
    $('dlNext').onclick = () => go(step + 1);
    $('dlKeysBtn').onclick = () => help.showModal();
    $('dlHelpClose').onclick = () => help.close();

    document.addEventListener('keydown', e => {
      if (!tab.classList.contains('active') || help.open) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && t.closest && t.closest('input, textarea, select, [contenteditable="true"]')) return;
      const onButton = t && t.closest && t.closest('button, summary, a');
      const k = e.key;
      let done = true;
      if (e.shiftKey && k.startsWith('Arrow')) {
        const d = { ArrowLeft: [-0.15, 0], ArrowRight: [0.15, 0], ArrowUp: [0, -0.15], ArrowDown: [0, 0.15] }[k];
        CE.view.pan(svg, d[0], d[1]);
      } else if (k === 'ArrowRight' || (k === ' ' && !onButton)) go(step + 1);
      else if (k === 'ArrowLeft') go(step - 1);
      else if (k === 'Home') go(1);
      else if (k === 'End') go(model().steps.length);
      else if (k === ']' || k === 'PageDown') moveDrawing(1);
      else if (k === '[' || k === 'PageUp') moveDrawing(-1);
      else if (k === '+' || k === '=') CE.view.zoom(svg, 1.4);
      else if (k === '-' || k === '_') CE.view.zoom(svg, 1 / 1.4);
      else if (k === '0') CE.view.fit(svg);
      else if (k === 'l' || k === 'L') CE.view.toggleLines();
      else if (k === 'b' || k === 'B') CE.view.toggleTheme();
      else if (k === '?') help.showModal();
      else done = false;
      if (done) e.preventDefault();
    });

    window.addEventListener('hashchange', () => {
      const h = /#d=([^&]+)&s=(\d+)/.exec(location.hash);
      if (!h) return;
      const k = decodeURIComponent(h[1]);
      if (C[k] && order.includes(k) && (k !== id || +h[2] !== step)) { id = k; step = +h[2] || 1; render(); }
    });

    render();
    return { render, go, setDrawing, get id() { return id; }, get step() { return step; } };
  }

  global.DruidLesson = { mount };
})(window);
