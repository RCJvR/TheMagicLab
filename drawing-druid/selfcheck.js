// Drawing Druid — "Check my drawing": the learner photographs their drawing, lays the finished drawing
// over it (drag to move, pinch / wheel / buttons to scale and turn), compares with the opacity slider
// or Blink, and ticks a checklist. The photo stays on the device unless the learner presses
// "Send to my teacher": then the aligned picture (photo + overlay, as a JPEG), the ticks and a note go
// to Supabase (table drawing_submissions, private bucket drawing-checks), and any comment and mark the
// teacher gives come back here.
//   DruidSelfCheck.mount(container) → { show(model) }      (loaded on demand by lesson-ui.js)
(function (global) {
  'use strict';
  const CE = global.ConstructionEngine;
  const INK = '#e11d48';

  function injectStyle() {
    if (document.getElementById('dck-style')) return;
    const s = document.createElement('style');
    s.id = 'dck-style';
    s.textContent =
      '.dck-wrap{display:grid;gap:12px}' +
      '.dck-note{font-size:12.5px;color:var(--muted);line-height:1.6;margin:0}' +
      '.dck-row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}' +
      '.dck-row label{font-size:12.5px;color:var(--text);display:inline-flex;align-items:center;gap:6px}' +
      '.dck-btn{font:600 12.5px system-ui,sans-serif;padding:7px 12px;border-radius:9px;border:1px solid var(--border);background:var(--surface);color:var(--text);cursor:pointer}' +
      '.dck-btn[aria-pressed="true"]{background:rgba(234,179,8,.16)}' +
      '.dck-btn:focus-visible{outline:2px solid #eab308;outline-offset:2px}' +
      '.dck-file{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}' +
      '.dck-stage{position:relative;background:#f7f5ef;border:1px solid var(--border);border-radius:12px;overflow:hidden;touch-action:none;min-height:180px}' +
      '.dck-stage canvas{display:block;width:100%;cursor:move}' +
      '.dck-empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:20px;color:#55595f;font-size:13px}' +
      '.dck-list{list-style:none;margin:0;padding:0;display:grid;gap:6px}' +
      '.dck-list li label{display:flex;gap:9px;align-items:flex-start;font-size:13px;line-height:1.5;color:var(--text);cursor:pointer}' +
      '.dck-list input{margin-top:3px;accent-color:#eab308}' +
      '.dck-score{font:700 13px var(--fm,monospace);color:var(--text)}' +
      '.dck-send{border-top:1px solid var(--border);padding-top:12px;display:grid;gap:8px}' +
      '.dck-send textarea{font:inherit;font-size:13px;color:var(--text);background:var(--surface);border:1px solid var(--border);border-radius:9px;padding:8px;min-height:54px;resize:vertical}' +
      '.dck-send select{font:inherit;font-size:13px;color:var(--text);background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:5px 8px}' +
      '.dck-sent{list-style:none;margin:0;padding:0;display:grid;gap:8px}' +
      '.dck-sent li{border:1px solid var(--border);border-radius:10px;padding:8px 10px;font-size:12.5px;color:var(--text);line-height:1.5}' +
      '.dck-sent .fb{color:#fde047}';
    document.head.appendChild(s);
  }

  // the finished drawing as an image: print render (black ink, true proportions), recoloured red,
  // construction lines left out unless asked for
  function drawingImage(model, withConstruction) {
    const steps = model.steps.map(st => Object.assign({}, st, { reveals: (st.reveals || []).filter(r =>
      r.kind !== 'tool' && (withConstruction || (r.lineType !== 'construction' && !(r.kind === 'point' && !r.label)))) }));
    const m = Object.assign({}, model, { steps });
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('xmlns', NS);
    CE.render(svg, m, { uptoStep: Infinity, mode: 'print-full', scale: 1, showCallouts: false, fit: 'extents', pad: 4 });
    const vb = (svg.getAttribute('viewBox') || '0 0 200 150').split(/[ ,]+/).map(Number);
    const px = 5;                                                   // 5 px per mm: sharp enough to compare
    svg.setAttribute('width', vb[2] * px); svg.setAttribute('height', vb[3] * px);
    const st = document.createElementNS(NS, 'style');
    st.textContent = '*{stroke:' + INK + '!important}text{fill:' + INK + '!important;stroke:none!important}' +
      '[fill]:not([fill="none"]):not([fill="#fff"]):not([fill="#ffffff"]):not([fill="white"]):not(text){fill:' + INK + '!important}' +
      'rect[fill="#fff"],rect[fill="#ffffff"],rect[fill="white"]{fill:none!important}';
    svg.insertBefore(st, svg.firstChild);
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: 'image/svg+xml' }));
    return new Promise((ok, bad) => { const im = new Image(); im.onload = () => { URL.revokeObjectURL(url); ok({ im, w: vb[2], h: vb[3] }); }; im.onerror = bad; im.src = url; });
  }

  // checklist: drawn from what the drawing actually contains (or the course drawing's rubric)
  function checklist(model) {
    const rs = model.steps.flatMap(s => s.reveals || []);
    const has = f => rs.some(f);
    const items = ['Every part of the drawing is there: compare it with the overlay piece by piece.',
      'Outlines are thick, dark type A lines; thin lines are thin.'];
    if (has(r => r.lineType === 'hidden')) items.push('Hidden detail is shown with short, even dashes.');
    if (has(r => r.lineType === 'centre')) items.push('Centre lines are chain lines through every hole and curve, a little past the outline.');
    if (has(r => r.lineType === 'construction')) items.push('Construction lines are thin and light, and left on the drawing.');
    if (model.projection === 'first' || model.projection === 'third') items.push('The views are in the right places for ' + (model.projection === 'first' ? '1st' : '3rd') + '-angle projection and line up with each other.');
    if (has(r => r.kind === 'dimension')) items.push('Dimensions: thin lines with arrowheads, the figure above the line, readable from the bottom or the right.');
    if (has(r => r.kind === 'label')) items.push('Views, points and parts are labelled in neat capitals.');
    items.push('Your lines lie on the red lines to within 1 mm (the CAPS tolerance).');
    return items;
  }

  function mount(container) {
    injectStyle();
    const wrap = document.createElement('div');
    wrap.className = 'dck-wrap';
    wrap.innerHTML =
      '<p class="dck-note">Take a photo of your drawing from straight above, in good light, with the whole drawing in the frame. The finished drawing is laid over it in red: line it up, then compare. <strong>Your photo stays on this device unless you send it to your teacher.</strong></p>' +
      '<div class="dck-row"><input type="file" accept="image/*" capture="environment" class="dck-file" id="dckFile"><label for="dckFile" class="dck-btn" role="button" tabindex="0">Choose or take a photo</label>' +
      '<button type="button" class="dck-btn" data-a="fit">Fit</button><button type="button" class="dck-btn" data-a="blink" aria-pressed="false">Blink</button>' +
      '<label><input type="checkbox" data-a="cons"> Construction lines</label></div>' +
      '<div class="dck-stage"><canvas></canvas><div class="dck-empty">Your photo will appear here.</div></div>' +
      '<div class="dck-row"><label>Overlay <input type="range" min="0" max="100" value="60" data-a="op" aria-label="Overlay strength"></label>' +
      '<button type="button" class="dck-btn" data-a="s-" aria-label="Smaller">−</button><button type="button" class="dck-btn" data-a="s+" aria-label="Bigger">+</button>' +
      '<button type="button" class="dck-btn" data-a="r-" aria-label="Turn anticlockwise">⟲</button><button type="button" class="dck-btn" data-a="r+" aria-label="Turn clockwise">⟳</button>' +
      '<span class="dck-note">Drag to move · wheel or pinch to scale · arrow keys nudge</span></div>' +
      '<div><div class="dck-row" style="justify-content:space-between"><strong style="font-size:13px">Checklist</strong><span class="dck-score"></span></div><ul class="dck-list"></ul></div>' +
      '<div class="dck-send" hidden><strong style="font-size:13px">Send to my teacher</strong>' +
      '<p class="dck-note">Your teacher sees the photo with the red overlay exactly as you lined it up, your ticks and your note.</p>' +
      '<label class="dck-note" data-cls hidden>Class <select></select></label>' +
      '<textarea maxlength="500" placeholder="A note for your teacher (optional)"></textarea>' +
      '<div class="dck-row"><button type="button" class="dck-btn" data-a="send">Send to my teacher</button><span class="dck-note" data-st aria-live="polite"></span></div>' +
      '<ul class="dck-sent"></ul></div>';
    container.appendChild(wrap);
    const $ = s => wrap.querySelector(s);
    const cv = $('canvas'), stage = $('.dck-stage'), empty = $('.dck-empty');
    const S = { model: null, photo: null, over: null, x: 0, y: 0, k: 1, rot: 0, op: 0.6, hidden: false, cons: false, blink: null };

    // the photo with the overlay, W px wide
    function paint(g, W, H, overlay, alpha) {
      const P = S.photo;
      g.drawImage(P, 0, 0, W, H);
      if (!overlay || !S.over) return;
      const sc = W / P.width;                                       // photo px → target px
      g.save(); g.globalAlpha = alpha;
      g.translate(S.x * sc, S.y * sc); g.rotate(S.rot * Math.PI / 180); g.scale(S.k * sc, S.k * sc);
      g.drawImage(S.over.im, -S.over.im.width / 2, -S.over.im.height / 2);
      g.restore();
    }
    function draw() {
      const W = stage.clientWidth || 600, P = S.photo;
      const H = P ? Math.round(W * P.height / P.width) : 180;
      const dpr = Math.min(2, global.devicePixelRatio || 1);
      cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + 'px';
      const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);
      empty.hidden = !!P;
      if (!P) return;
      paint(g, W, H, !S.hidden, S.op);
    }
    // the overlay centred on the photo, as large as fits (most photos crop the sheet a little)
    function fit() {
      if (!S.photo || !S.over) return;
      S.x = S.photo.width / 2; S.y = S.photo.height / 2; S.rot = 0;
      S.k = 0.9 * Math.min(S.photo.width / S.over.im.width, S.photo.height / S.over.im.height);
      draw();
    }
    async function loadOverlay(refit) {
      if (!S.model) return;
      try { S.over = await drawingImage(S.model, S.cons); } catch (e) { S.over = null; }
      if (refit) fit(); else draw();
    }

    // checklist with ticks remembered on this device
    function renderList() {
      const key = 'dd-check-' + S.model.id, list = $('.dck-list');
      let saved = []; try { saved = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { saved = []; }
      const items = checklist(S.model);
      list.innerHTML = '';
      items.forEach((t, i) => {
        const li = document.createElement('li');
        li.innerHTML = '<label><input type="checkbox"> <span></span></label>';
        li.querySelector('span').textContent = t;
        const box = li.querySelector('input'); box.checked = saved.includes(i);
        box.onchange = () => { const now = items.map((_, j) => j).filter(j => list.querySelectorAll('input')[j].checked); try { localStorage.setItem(key, JSON.stringify(now)); } catch (e) { /* private mode */ } score(); };
        list.appendChild(li);
      });
      const score = () => { const n = list.querySelectorAll('input:checked').length; $('.dck-score').textContent = n + ' / ' + items.length; };
      score();
    }

    // photo
    $('#dckFile').addEventListener('change', e => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      const url = URL.createObjectURL(f), im = new Image();
      im.onload = () => { S.photo = im; fit(); };
      im.src = url;
    });
    $('label[for="dckFile"]').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#dckFile').click(); } });
    // controls
    wrap.addEventListener('click', e => {
      const a = e.target.closest('[data-a]'); if (!a) return;
      const act = a.dataset.a;
      if (act === 'fit') fit();
      if (act === 's-' || act === 's+') { S.k *= act === 's+' ? 1.01 : 1 / 1.01; draw(); }
      if (act === 'r-' || act === 'r+') { S.rot += act === 'r+' ? 0.5 : -0.5; draw(); }
      if (act === 'blink') {
        const on = !S.blink; a.setAttribute('aria-pressed', String(on));
        if (on) S.blink = setInterval(() => { S.hidden = !S.hidden; draw(); }, 550);
        else { clearInterval(S.blink); S.blink = null; S.hidden = false; draw(); }
      }
    });
    $('[data-a="op"]').addEventListener('input', e => { S.op = e.target.value / 100; draw(); });
    $('[data-a="cons"]').addEventListener('change', e => { S.cons = e.target.checked; loadOverlay(false); });
    // drag, pinch, wheel (in photo pixels)
    const pts = new Map(); let base = null;
    const toPhoto = e => { const r = cv.getBoundingClientRect(), f = S.photo ? S.photo.width / r.width : 1; return [(e.clientX - r.left) * f, (e.clientY - r.top) * f]; };
    cv.addEventListener('pointerdown', e => { if (!S.photo) return; cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, toPhoto(e)); base = null; });
    cv.addEventListener('pointermove', e => {
      if (!pts.has(e.pointerId)) return;
      const prev = pts.get(e.pointerId), now = toPhoto(e); pts.set(e.pointerId, now);
      if (pts.size === 1) { S.x += now[0] - prev[0]; S.y += now[1] - prev[1]; }
      else if (pts.size === 2) {
        const [a, b] = [...pts.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]), ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
        if (base) { S.k *= d / base.d; S.rot += (ang - base.ang) * 180 / Math.PI; }
        base = { d, ang };
      }
      draw();
    });
    ['pointerup', 'pointercancel'].forEach(t => cv.addEventListener(t, e => { pts.delete(e.pointerId); base = null; }));
    cv.addEventListener('wheel', e => { if (!S.photo) return; e.preventDefault(); S.k *= e.deltaY < 0 ? 1.02 : 1 / 1.02; draw(); }, { passive: false });
    cv.tabIndex = 0; cv.setAttribute('aria-label', 'Your photo with the finished drawing over it. Arrow keys move the overlay.');
    cv.addEventListener('keydown', e => {
      const m = { ArrowLeft: [-2, 0], ArrowRight: [2, 0], ArrowUp: [0, -2], ArrowDown: [0, 2] }[e.key];
      if (m && S.photo) { e.preventDefault(); e.stopPropagation(); S.x += m[0] * S.photo.width / 600; S.y += m[1] * S.photo.width / 600; draw(); }
    });
    global.addEventListener('resize', draw);

    // ── sending to the teacher (signed-in learners in a class) ──
    const send = $('.dck-send'), stEl = $('[data-st]'), clsSel = $('[data-cls] select');
    const A = () => global.MagicLabAuth, sb = () => A() && A()._supabase && A()._supabase();
    const uid = () => { const s = A() && A().getSession && A().getSession(); return s && s.user && s.user.id; };
    let classes = null;
    async function myClasses() {
      if (classes) return classes;
      const { data } = await sb().rpc('get_my_teachers');
      const seen = new Set(); classes = (data || []).filter(c => !seen.has(c.class_id) && seen.add(c.class_id)).map(c => ({ id: c.class_id, name: c.class_name }));
      return classes;
    }
    async function setupSend() {
      send.hidden = true;
      if (!sb() || !uid() || (A().isTeacher && A().isTeacher())) return;
      try { await myClasses(); } catch (e) { return; }
      if (!classes.length) return;
      clsSel.innerHTML = classes.map(c => '<option value="' + c.id + '"></option>').join('');
      [...clsSel.options].forEach((o, i) => { o.textContent = classes[i].name || 'Class'; });
      $('[data-cls]').hidden = classes.length < 2;
      send.hidden = false;
      listSent();
    }
    function picture() {
      // the aligned photo and overlay, at most 1600 px wide, as a JPEG under 1 MB
      const P = S.photo, W = Math.min(1600, P.width), H = Math.round(W * P.height / P.width);
      const c = document.createElement('canvas'); c.width = W; c.height = H;
      paint(c.getContext('2d'), W, H, true, 0.7);
      const tryQ = q => new Promise(ok => c.toBlob(b => ok(b), 'image/jpeg', q));
      return tryQ(0.82).then(b => (b && b.size > 950000 ? tryQ(0.6) : b));
    }
    async function doSend() {
      if (!S.photo) { stEl.textContent = 'Take or choose a photo first.'; return; }
      const btn = $('[data-a="send"]'); btn.disabled = true; stEl.textContent = 'Sending…';
      try {
        const blob = await picture(), me = uid(), name = me + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.jpg';
        const up = await sb().storage.from('drawing-checks').upload(name, blob, { contentType: 'image/jpeg' });
        if (up.error) throw up.error;
        const ticks = [...$('.dck-list').querySelectorAll('li')].map(li => ({ item: li.querySelector('span').textContent, done: li.querySelector('input').checked }));
        const ins = await sb().from('drawing_submissions').insert({ student_id: me, class_id: clsSel.value, drawing_id: S.model.id, drawing_title: S.model.title,
          chapter: (location.pathname.split('/').pop() || '').replace(/\.html$/, ''), photo_path: name, checklist: ticks, note: $('.dck-send textarea').value.trim() || null });
        if (ins.error) { await sb().storage.from('drawing-checks').remove([name]); throw ins.error; }
        stEl.textContent = 'Sent. Your teacher\'s comment will appear below.';
        $('.dck-send textarea').value = '';
        listSent();
      } catch (e) {
        stEl.textContent = 'Could not send: ' + (e.message || e);
      } finally { btn.disabled = false; }
    }
    async function listSent() {
      const ul = $('.dck-sent');
      const { data } = await sb().from('drawing_submissions').select('id, created_at, note, teacher_comment, mark, reviewed_at, photo_path')
        .eq('student_id', uid()).eq('drawing_id', S.model.id).order('created_at', { ascending: false }).limit(5);
      ul.innerHTML = '';
      (data || []).forEach(r => {
        const li = document.createElement('li');
        const when = new Date(r.created_at).toLocaleString();
        li.innerHTML = '<div><strong></strong></div><div class="fb"></div><button type="button" class="dck-btn" style="margin-top:6px">Delete</button>';
        li.querySelector('strong').textContent = 'Sent ' + when + (r.reviewed_at ? '' : ': waiting for your teacher');
        li.querySelector('.fb').textContent = r.reviewed_at ? 'Teacher: ' + (r.mark ? '[' + r.mark + '] ' : '') + (r.teacher_comment || '(no comment)') : '';
        li.querySelector('button').onclick = async () => {
          if (!confirm('Delete this drawing from your teacher\'s list?')) return;
          await sb().from('drawing_submissions').delete().eq('id', r.id);
          await sb().storage.from('drawing-checks').remove([r.photo_path]);
          listSent();
        };
        ul.appendChild(li);
      });
    }
    $('[data-a="send"]').addEventListener('click', e => { e.stopPropagation(); doSend(); });
    document.addEventListener('magiclab:auth:ready', () => { classes = null; if (S.model) setupSend(); });

    return {
      show(model) {
        if (S.model === model) return;
        S.model = model; renderList(); loadOverlay(true); setupSend();
      },
    };
  }

  global.DruidSelfCheck = { mount };
})(window);
