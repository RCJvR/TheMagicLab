/* ============================================================
   THE MAGIC LAB — Study Spellbook (assets/notebook.js)
   The learner notebook: dividers → pages → rich-text notes, with clips from
   lessons. Spec: docs/notebook-spec.md. Pro only (Pro or School plan).

   Saving: every change is written to this device first (IndexedDB, so it is
   instant and works offline), then backed up to the learner's account
   (Supabase: notebook_dividers / notebook_pages, see notebook-schema.sql).
   A page is saved with the version the device last saw; if another device
   saved a newer copy first, both copies are kept, so nothing is ever lost.

   Used two ways:
   - on a lesson, inside the side panel (assets/notebook-launcher.js), and
   - on its own in notebook.html (the "pop out" window, or opened directly).
   Both call mount(root, opts) and talk to each other over BroadcastChannel.
   ============================================================ */
import {
  Editor, Node, StarterKit, TableKit, Image, Subscript, Superscript, Highlight,
  TextStyle, Color, TaskList, TaskItem, Placeholder, generateHTML
} from './vendor/tiptap-notebook-3.32.1.bundle.js';

/* ── Small helpers ─────────────────────────────────────────── */
const PRO_PLANS = ['pro', 'school'];
const PRICING_URL = '/pricing.html';
const DIVIDER_COLOURS = ['#4acf6b', '#9ed43c', '#eda13c', '#ee7544', '#ed5c86', '#9b6bff', '#5b93ff', '#1fb8dc', '#17c4c0', '#e8c63a', '#94a3b8'];
const TEXT_COLOURS = [['Default', ''], ['Red', '#ef4444'], ['Orange', '#f97316'], ['Green', '#22c55e'], ['Blue', '#3b82f6'], ['Purple', '#a855f7'], ['Grey', '#94a3b8']];
const HIGHLIGHTS = [['Yellow', '#fde047'], ['Green', '#86efac'], ['Blue', '#93c5fd'], ['Pink', '#f9a8d4'], ['Orange', '#fdba74']];
const BACKGROUNDS = [['blank', 'Blank'], ['lined', 'Lined'], ['grid', 'Grid'], ['dotted', 'Dotted']];
const BIN_DAYS = 30;

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16);
}));
const ic = (name, label) => `<i data-lucide="${name}" aria-hidden="true"></i>${label ? `<span>${esc(label)}</span>` : ''}`;
function el(tag, attrs = {}, html) {
  const n = document.createElement(tag);
  for (const k in attrs) {
    if (attrs[k] == null || attrs[k] === false) continue;
    if (k === 'text') n.textContent = attrs[k];
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), attrs[k]);
    else n.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
  }
  if (html != null) n.innerHTML = html;
  return n;
}
let lucideLoading = null;
function icons(root) {
  if (window.lucide && window.lucide.createIcons) {
    try { window.lucide.createIcons({ root, attrs: { width: 16, height: 16, 'stroke-width': 2 } }); } catch (e) { window.lucide.createIcons(); }
    return;
  }
  if (!lucideLoading) {
    lucideLoading = new Promise(res => {
      const s = document.createElement('script');
      s.src = '/assets/vendor/lucide-1.56.0.min.js'; s.onload = res; s.onerror = res;
      document.head.appendChild(s);
    });
  }
  lucideLoading.then(() => window.lucide && icons(root));
}
const bySort = (a, b) => (a.sort - b.sort) || String(a.id).localeCompare(String(b.id));

/* ── Accounts ──────────────────────────────────────────────── */
function auth() { return window.MagicLabAuth || null; }
function whenAuthReady(timeout = 6000) {
  return new Promise(resolve => {
    if (auth()) return resolve(true);
    const done = () => { clearTimeout(t); resolve(!!auth()); };
    const t = setTimeout(done, timeout);
    document.addEventListener('magiclab:auth:ready', done, { once: true });
  });
}
function userId() { const a = auth(); const s = a && a.getSession && a.getSession(); return (s && s.user && s.user.id) || null; }
function client() { const a = auth(); return a && a.isLoggedIn() && a._supabase ? a._supabase() : null; }

/* ── This device: IndexedDB ────────────────────────────────── */
const DB = {
  db: null,
  STORES: ['dividers', 'pages', 'meta'],
  open(version) {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((resolve, reject) => {
      const req = version ? indexedDB.open('ml-notebook', version) : indexedDB.open('ml-notebook');
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('dividers')) db.createObjectStore('dividers', { keyPath: 'id' }).createIndex('owner', 'owner');
        if (!db.objectStoreNames.contains('pages')) db.createObjectStore('pages', { keyPath: 'id' }).createIndex('owner', 'owner');
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta');
      };
      req.onsuccess = () => {
        const db = req.result;
        // A store can go missing (cleared site data, a half-finished first open):
        // reopen one version up so the upgrade step recreates it. Notes already on
        // the server come back on the next pull.
        if (this.STORES.some(s => !db.objectStoreNames.contains(s))) {
          const next = db.version + 1; db.close();
          return this.open(next).then(resolve, reject);
        }
        db.onversionchange = () => { db.close(); this.db = null; };   // let another tab upgrade or clear it
        this.db = db; resolve(db);
      };
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('The notebook is being updated in another tab. Close other Magic Lab tabs and try again.'));
    });
  },
  async run(store, mode, fn) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, mode);
      const os = tx.objectStore(store);
      let out;
      Promise.resolve(fn(os)).then(v => { out = v; });
      tx.oncomplete = () => resolve(out);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  },
  req(r) { return new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); }); },
  all(store, owner) { return this.run(store, 'readonly', os => this.req(os.index('owner').getAll(owner))); },
  get(store, id) { return this.run(store, 'readonly', os => this.req(os.get(id))); },
  put(store, obj) { return this.run(store, 'readwrite', os => { os.put(obj); }); },
  putMany(store, list) { return this.run(store, 'readwrite', os => { list.forEach(o => os.put(o)); }); },
  del(store, id) { return this.run(store, 'readwrite', os => { os.delete(id); }); },
  getMeta(k) { return this.run('meta', 'readonly', os => this.req(os.get(k))); },
  setMeta(k, v) { return this.run('meta', 'readwrite', os => { os.put(v, k); }); }
};

/* ── Between windows (lesson panel ⇄ pop-out window) ───────── */
const channel = ('BroadcastChannel' in window) ? new BroadcastChannel('ml-notebook') : null;
const WINDOW_ID = uuid();
function broadcast(msg) { try { channel && channel.postMessage(Object.assign({ from: WINDOW_ID }, msg)); } catch (e) {} }

/* ── The editor's content types ────────────────────────────── */
// A clip from a lesson: the copied content plus a link back to where it came from.
const Clip = Node.create({
  name: 'clip',
  group: 'block',
  content: 'block+',
  defining: true,
  addAttributes() {
    return {
      title: { default: '', parseHTML: e => e.getAttribute('data-title') || '' },
      url: { default: '', parseHTML: e => e.getAttribute('data-url') || '' },
      section: { default: '', parseHTML: e => e.getAttribute('data-section') || '' }
    };
  },
  parseHTML() { return [{ tag: 'aside[data-clip]', contentElement: '.nb-clip-body' }]; },
  renderHTML({ node }) {
    const a = node.attrs;
    const label = 'From: ' + (a.title || 'lesson') + (a.section ? ' — ' + a.section : '');
    return ['aside', { 'data-clip': '', 'data-title': a.title, 'data-url': a.url, 'data-section': a.section, class: 'nb-clip' },
      ['div', { class: 'nb-clip-body' }, 0],
      ['div', { class: 'nb-clip-src', contenteditable: 'false' }, ['a', { href: a.url || '#', 'data-section': a.section }, label]]];
  }
});

function extensions(placeholder) {
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
      link: { openOnClick: false, autolink: true, defaultProtocol: 'https' }
    }),
    TableKit.configure({ table: { resizable: false } }),
    Image.configure({ allowBase64: false }),
    Subscript, Superscript,
    Highlight.configure({ multicolor: true }),
    TextStyle, Color,
    TaskList, TaskItem.configure({ nested: true }),
    Placeholder.configure({ placeholder: placeholder || '' }),
    Clip
  ];
}
const EMPTY_DOC = { type: 'doc', content: [{ type: 'paragraph' }] };
function docText(doc) {
  const out = [];
  (function walk(n) { if (!n) return; if (n.text) out.push(n.text); (n.content || []).forEach(walk); if (n.type === 'paragraph' || n.type === 'heading') out.push(' '); })(doc);
  return out.join('').replace(/\s+/g, ' ').trim().slice(0, 200000);
}
function docIsEmpty(doc) { return !docText(doc) && !JSON.stringify(doc || {}).includes('"image"'); }

/* ── Mapping between the device and the server ─────────────── */
function divToRow(d) {
  return { id: d.id, owner: d.owner, name: d.name, colour: d.colour, sort: d.sort, deleted_at: d.deletedAt ? new Date(d.deletedAt).toISOString() : null };
}
function divFromRow(r) {
  return { id: r.id, owner: r.owner, name: r.name, colour: r.colour, sort: r.sort, deletedAt: r.deleted_at ? Date.parse(r.deleted_at) : null, dirty: 0, rev: 0 };
}
function pageToRow(p) {
  return {
    id: p.id, divider_id: p.dividerId, title: p.title, kind: p.kind || 'page', background: p.background || 'blank', sort: p.sort,
    lesson_ref: p.lessonRef || null, lesson_url: p.lessonUrl || null, lesson_title: p.lessonTitle || null,
    doc: p.doc || EMPTY_DOC, text_index: p.text || '', deleted_at: p.deletedAt ? new Date(p.deletedAt).toISOString() : null
  };
}
function pageFromRow(r) {
  return {
    id: r.id, owner: r.owner, dividerId: r.divider_id, title: r.title, kind: r.kind, background: r.background, sort: r.sort,
    lessonRef: r.lesson_ref, lessonUrl: r.lesson_url, lessonTitle: r.lesson_title, doc: r.doc, text: r.text_index,
    version: r.version, deletedAt: r.deleted_at ? Date.parse(r.deleted_at) : null, updatedAt: Date.parse(r.updated_at) || Date.now(), dirty: 0, rev: 0
  };
}

/* ── Backing up to the account ─────────────────────────────── */
// One sync at a time across all windows (Web Locks where available).
function withLock(fn) {
  if (navigator.locks && navigator.locks.request) return navigator.locks.request('ml-notebook-sync', fn);
  return fn();
}
async function pushAndPull(owner, onConflict) {
  const sb = client();
  if (!sb || !navigator.onLine) return { skipped: true };
  let proRequired = false;

  // Dividers first: pages point at them.
  const divs = (await DB.all('dividers', owner)).filter(d => d.dirty && !d.auto);
  if (divs.length) {
    const { error } = await sb.from('notebook_dividers').upsert(divs.map(divToRow));
    if (error) { if (/row-level security/i.test(error.message)) proRequired = true; else throw error; }
    else {
      for (const d of divs) {
        const cur = await DB.get('dividers', d.id);
        if (cur && cur.rev === d.rev) { cur.dirty = 0; await DB.put('dividers', cur); }
      }
    }
  }

  // Pages, each with the version this device last saw.
  const pages = proRequired ? [] : (await DB.all('pages', owner)).filter(p => p.dirty && !p.auto);
  for (const p of pages) {
    const { data, error } = await sb.rpc('notebook_save_page', { p: pageToRow(p), p_base: p.version || 0 });
    if (error) throw error;
    if (data && data.pro_required) { proRequired = true; break; }
    const cur = await DB.get('pages', p.id);
    if (!cur) continue;
    if (data && data.ok) {
      cur.version = data.version;
      if (cur.rev === p.rev) cur.dirty = 0;
      await DB.put('pages', cur);
    } else if (data && data.conflict) {
      // Another device saved this page first. Keep both: this device's copy
      // becomes a new page next to it, and the page itself takes the server's copy.
      const copy = Object.assign({}, cur, { id: uuid(), title: cur.title + ' (copy from this device)', version: 0, dirty: 1, rev: 1, sort: cur.sort + 0.001 });
      const server = pageFromRow(data.server);
      await DB.putMany('pages', [copy, server]);
      onConflict && onConflict(cur.id, copy.id);
    }
  }

  // Pull whatever changed elsewhere since the last pull.
  const key = 'lastSync:' + owner;
  const since = (await DB.getMeta(key)) || '1970-01-01T00:00:00Z';
  let newest = since;
  const changed = [];
  for (const table of ['notebook_dividers', 'notebook_pages']) {
    for (let from = 0; ; from += 500) {
      const { data, error } = await sb.from(table).select('*').gte('updated_at', since).order('updated_at').range(from, from + 499);
      if (error) throw error;
      for (const r of data) {
        if (r.updated_at > newest) newest = r.updated_at;
        const store = table === 'notebook_pages' ? 'pages' : 'dividers';
        const local = await DB.get(store, r.id);
        if (local && local.dirty) continue;                 // our unsent edit wins; the push sorts out any clash
        if (store === 'pages' && local && local.version >= r.version) continue;
        await DB.put(store, store === 'pages' ? pageFromRow(r) : divFromRow(r));
        changed.push(r.id);
      }
      if (data.length < 500) break;
    }
  }
  await DB.setMeta(key, newest);
  return { changed, proRequired };
}

/* ── Pro check (cached so the notebook still opens offline) ── */
async function proStatus(uid) {
  const prof = auth() && auth().getProfile && auth().getProfile();
  const key = 'pro:' + uid;
  if (prof && prof.package) {
    const pro = PRO_PLANS.includes(prof.package);
    try { await DB.setMeta(key, { pro, at: Date.now() }); } catch (e) {}
    return pro;
  }
  // Profile not loaded (offline): trust the last answer for up to 30 days.
  const cached = await DB.getMeta(key).catch(() => null);
  return !!(cached && cached.pro && Date.now() - cached.at < 30 * 864e5);
}

/* ============================================================
   mount(root, opts) — draws the notebook into root.
   opts: { embedded, lesson, onClose, onPopOut, startPageId }
   Returns { insertClip, openForLesson, flush, destroy, ready }.
   ============================================================ */
export function mount(root, opts = {}) {
  const S = {
    owner: null, access: 'loading',     // loading | signedout | nopro | readonly | pro
    dividers: [], pages: [], currentId: null, editor: null,
    saveTimer: null, syncTimer: null, pollTimer: null, status: '', destroyed: false,
    collapsed: loadCollapsed(), binOpen: false, narrow: false, sideOpen: true, lesson: opts.lesson || null
  };

  root.classList.add('nb-root');
  root.setAttribute('data-ml-no-theme', '');
  root.innerHTML = `
    <div class="nb-top">
      <button type="button" class="nb-icon-btn nb-side-toggle" title="Show or hide the page list" aria-label="Show or hide the page list" aria-expanded="true">${ic('panel-left')}</button>
      <div class="nb-brand"><i data-lucide="notebook-pen" aria-hidden="true"></i><span>Study Spellbook</span></div>
      <span class="nb-status" aria-live="polite"></span>
      <div class="nb-top-actions">
        ${opts.homeHref ? `<a class="nb-text-btn nb-home" href="${esc(opts.homeHref)}" title="Back to my dashboard">${ic('layout-dashboard', 'My dashboard')}</a>` : ''}
        <button type="button" class="nb-icon-btn nb-print" title="Print" aria-label="Print">${ic('printer')}</button>
        ${opts.embedded && opts.onPopOut ? `<button type="button" class="nb-icon-btn nb-popout" title="Open in its own window" aria-label="Open in its own window">${ic('external-link')}</button>` : ''}
        ${opts.embedded && opts.onClose ? `<button type="button" class="nb-icon-btn nb-close" title="Close notebook (Esc)" aria-label="Close notebook">${ic('x')}</button>` : ''}
      </div>
    </div>
    <div class="nb-banner" hidden></div>
    <div class="nb-body">
      <div class="nb-side" role="navigation" aria-label="Dividers and pages">
        <div class="nb-tree"></div>
        <div class="nb-side-foot">
          <button type="button" class="nb-text-btn nb-add-div">${ic('plus', 'New divider')}</button>
        </div>
      </div>
      <div class="nb-scrim" hidden></div>
      <div class="nb-main">
        <div class="nb-gate" hidden></div>
        <div class="nb-pagewrap" hidden>
          <div class="nb-pagehead">
            <input class="nb-title" type="text" maxlength="160" aria-label="Page title" placeholder="Untitled page">
            <button type="button" class="nb-icon-btn nb-page-menu" title="Page options" aria-label="Page options" aria-haspopup="menu">${ic('ellipsis')}</button>
          </div>
          <div class="nb-lessonlink" hidden></div>
          <div class="nb-sharebar" hidden></div>
          <div class="nb-toolbar" role="toolbar" aria-label="Formatting"></div>
          <div class="nb-paper"><div class="nb-editor"></div></div>
        </div>
        <div class="nb-empty" hidden></div>
      </div>
    </div>`;
  const $ = sel => root.querySelector(sel);
  icons(root);

  /* ── Layout: wide shows the list beside the page; narrow makes it a drawer ── */
  const ro = new ResizeObserver(() => {
    const narrow = root.clientWidth < 760;
    if (narrow !== S.narrow) { S.narrow = narrow; S.sideOpen = !narrow; applySide(); }
  });
  ro.observe(root);
  function applySide() {
    root.classList.toggle('nb-narrow', S.narrow);
    root.classList.toggle('nb-side-closed', !S.sideOpen);
    $('.nb-side-toggle').setAttribute('aria-expanded', String(S.sideOpen));
    $('.nb-scrim').hidden = !(S.narrow && S.sideOpen);
  }
  $('.nb-side-toggle').addEventListener('click', () => { S.sideOpen = !S.sideOpen; applySide(); });
  $('.nb-scrim').addEventListener('click', () => { S.sideOpen = false; applySide(); });
  if (opts.onClose) $('.nb-close')?.addEventListener('click', () => opts.onClose());
  if (opts.onPopOut) $('.nb-popout')?.addEventListener('click', async () => { await flush(); opts.onPopOut(S.currentId); });
  $('.nb-print').addEventListener('click', e => printMenu(e.currentTarget));
  $('.nb-add-div').addEventListener('click', () => addDivider());

  /* ── Status line ───────────────────────────────────────── */
  function setStatus(kind) {
    S.status = kind;
    const s = $('.nb-status');
    const map = {
      saving: ['loader', 'Backing up…'],
      saved: ['cloud-check', 'Backed up'],
      offline: ['cloud-off', 'Offline: saved on this device, will back up when online'],
      local: ['hard-drive', 'Saved on this device'],
      error: ['cloud-alert', 'Not backed up yet, will try again'],
      readonly: ['lock', 'Read only'],
      '': ['', '']
    };
    const [icon, text] = map[kind] || map[''];
    s.className = 'nb-status nb-status-' + (kind || 'none');
    s.innerHTML = icon ? `<i data-lucide="${icon}" aria-hidden="true"></i><span>${esc(text)}</span>` : '';
    s.title = text;
    icons(s);
  }

  /* ── Access: signed in? Pro? ───────────────────────────── */
  async function start() {
    await whenAuthReady();
    if (S.destroyed) return;
    const uid = userId();
    if (!uid) { S.owner = null; S.access = 'signedout'; return render(); }
    S.owner = uid;
    await loadState();
    const pro = await proStatus(uid);
    S.access = pro ? 'pro' : (S.pages.some(p => !p.deletedAt) ? 'readonly' : 'nopro');
    // Pull from the account even when not Pro, so a lapsed learner can still read on a new device.
    await sync(true);
    if (S.access === 'nopro' && S.pages.some(p => !p.deletedAt)) S.access = 'readonly';
    if (S.access === 'pro' && S.lesson) await openForLesson(S.lesson, true);
    else if (opts.startPageId && S.pages.find(p => p.id === opts.startPageId && !p.deletedAt)) S.currentId = opts.startPageId;
    else if (!S.currentId) S.currentId = lastOpenPage();
    render();
    S.pollTimer = setInterval(() => sync(), 60000);
  }
  document.addEventListener('magiclab:auth:change', onAuthChange);
  function onAuthChange() {
    const uid = userId();
    if (uid === S.owner) { if (uid) proStatus(uid).then(pro => { if (pro && S.access !== 'pro') { S.access = 'pro'; render(); } }); return; }
    // Someone signed in or out: start again with the right person's notebook.
    destroyEditor(true);
    S.currentId = null; S.dividers = []; S.pages = []; myClasses = null;
    start();
  }

  async function loadState() {
    const [d, p] = await Promise.all([DB.all('dividers', S.owner), DB.all('pages', S.owner)]);
    S.dividers = d; S.pages = p;
    // Lesson pages that were opened but never written in (e.g. the tab was closed) are dropped.
    for (const x of S.pages.filter(x => x.auto && x.id !== S.currentId && docIsEmpty(x.doc))) {
      S.pages = S.pages.filter(y => y !== x); await DB.del('pages', x.id);
    }
    for (const x of S.dividers.filter(x => x.auto && !S.pages.some(y => y.dividerId === x.id))) {
      S.dividers = S.dividers.filter(y => y !== x); await DB.del('dividers', x.id);
    }
  }
  const canWrite = () => S.access === 'pro';
  const liveDividers = () => S.dividers.filter(d => !d.deletedAt).sort(bySort);
  const livePages = divId => S.pages.filter(p => !p.deletedAt && p.dividerId === divId).sort(bySort);
  const pageById = id => S.pages.find(p => p.id === id);
  const divById = id => S.dividers.find(d => d.id === id);
  function lastOpenPage() {
    let id = null; try { id = localStorage.getItem('ml-nb-last:' + S.owner); } catch (e) {}
    const p = id && pageById(id);
    if (p && !p.deletedAt) return id;
    const first = liveDividers().map(d => livePages(d.id)[0]).find(Boolean);
    return first ? first.id : null;
  }
  function rememberPage(id) { try { localStorage.setItem('ml-nb-last:' + S.owner, id); } catch (e) {} }

  /* ── Saving ────────────────────────────────────────────── */
  async function saveDivider(d) {
    d.rev = (d.rev || 0) + 1; d.dirty = 1;
    await DB.put('dividers', d);
    broadcast({ type: 'changed' });
    scheduleSync();
  }
  async function savePage(p) {
    p.rev = (p.rev || 0) + 1; p.dirty = 1; p.updatedAt = Date.now();
    // The page record on the device may have a newer server version than our copy.
    const cur = await DB.get('pages', p.id);
    if (cur && cur.version > (p.version || 0) && !cur.dirty) p.version = cur.version;
    await DB.put('pages', p);
    broadcast({ type: 'changed', pageId: p.id });
    scheduleSync();
  }
  function scheduleSync(ms = 1500) {
    clearTimeout(S.syncTimer);
    S.syncTimer = setTimeout(() => sync(), ms);
  }
  let syncing = null;
  async function sync(quiet) {
    if (!S.owner) return;
    if (syncing) { scheduleSync(800); return syncing; }
    if (!navigator.onLine) { setStatus(canWrite() ? 'offline' : (S.access === 'readonly' ? 'readonly' : '')); return; }
    if (!quiet && canWrite()) setStatus('saving');
    syncing = withLock(() => pushAndPull(S.owner, (origId) => {
      if (origId === S.currentId) S.reopen = true;
      toast('This page was also changed on another device. Both copies are kept.');
    })).then(async res => {
      if (!res || res.skipped) { setStatus(canWrite() ? 'local' : ''); return; }
      if (res.proRequired && S.access === 'pro') { S.access = S.pages.length ? 'readonly' : 'nopro'; render(); }
      const unsent = (await DB.all('pages', S.owner)).some(p => p.dirty && !p.auto);
      setStatus(S.access === 'readonly' ? 'readonly' : (unsent ? 'error' : 'saved'));
      if (res.changed.length || S.reopen) await refreshFromDevice(res.changed);
    }).catch(err => {
      console.warn('[notebook] backup failed', err);
      if (canWrite()) setStatus('error');
      scheduleSync(20000);
    }).finally(() => { syncing = null; });
    return syncing;
  }
  // Something changed in another window or on another device: reload from this device.
  async function refreshFromDevice(changedIds = []) {
    await loadState();
    const cur = pageById(S.currentId);
    const editing = S.editor && S.editor.isFocused;
    if (!cur || cur.deletedAt) { S.currentId = lastOpenPage(); renderPage(); }
    else if (S.reopen || (changedIds.includes(S.currentId) && !editing)) { S.reopen = false; renderPage(); }
    renderTree();
  }
  window.addEventListener('online', onOnline);
  function onOnline() { sync(); }
  document.addEventListener('visibilitychange', onVis);
  function onVis() { if (document.visibilityState === 'hidden') flush(); else sync(true); }
  channel && channel.addEventListener('message', onMessage);
  function onMessage(e) {
    const m = e.data || {};
    if (m.from === WINDOW_ID) return;
    if (m.type === 'changed') refreshFromDevice(m.pageId ? [m.pageId] : []);
  }

  async function flush() {
    if (S.saveTimer) { clearTimeout(S.saveTimer); S.saveTimer = null; await writeEditor(); }
    if (canWrite() && navigator.onLine) await sync(true);
  }

  /* ── Creating things ───────────────────────────────────── */
  function nextSort(list) { return list.length ? Math.max(...list.map(x => x.sort)) + 1 : 1; }
  async function addDivider(name, colour, auto) {
    if (!canWrite()) return null;
    const d = { id: uuid(), owner: S.owner, name: name || 'New divider', colour: colour || DIVIDER_COLOURS[liveDividers().length % DIVIDER_COLOURS.length],
      sort: nextSort(S.dividers), deletedAt: null, auto: auto ? 1 : 0 };
    S.dividers.push(d);
    await saveDivider(d);
    if (!auto) { renderTree(); startRename('div', d.id); }
    return d;
  }
  async function addPage(divId, extra = {}, auto) {
    if (!canWrite()) return null;
    const p = Object.assign({
      id: uuid(), owner: S.owner, dividerId: divId, title: 'Untitled page', kind: 'page', background: 'blank',
      sort: nextSort(livePages(divId)), doc: EMPTY_DOC, text: '', version: 0, deletedAt: null, auto: auto ? 1 : 0
    }, extra);
    S.pages.push(p);
    S.collapsed[divId] = false; saveCollapsed();
    await savePage(p);
    return p;
  }

  // Open (or quietly prepare) the page for a lesson. The page and its subject
  // divider stay "auto" — on this device only — until the learner writes in it,
  // so peeking at the notebook never leaves empty pages behind.
  async function openForLesson(lesson, silent) {
    S.lesson = lesson;
    if (!canWrite() || !lesson) { if (!silent) render(); return; }
    let p = S.pages.find(x => !x.deletedAt && lesson.ref && x.lessonRef === lesson.ref);
    if (!p) {
      const divName = lesson.divider || lesson.subject || 'My notes';
      let d = liveDividers().find(x => x.name.toLowerCase() === divName.toLowerCase());
      if (!d) d = await addDivider(divName, lesson.colour, true);
      p = await addPage(d.id, { title: lesson.title || 'Lesson notes', lessonRef: lesson.ref || null, lessonUrl: lesson.url || null, lessonTitle: lesson.title || null }, true);
    }
    await switchTo(p.id, silent);
  }

  async function switchTo(id, silent) {
    if (id === S.currentId && S.editor) return;
    await writeEditor();
    await discardIfUntouched(S.currentId);
    S.currentId = id;
    if (id) rememberPage(id);
    if (S.narrow) { S.sideOpen = false; applySide(); }
    if (!silent) { renderTree(); renderPage(); }
  }
  // Drop an auto-made lesson page (and its auto divider) if nothing was written.
  async function discardIfUntouched(id) {
    const p = id && pageById(id);
    if (!p || !p.auto) return;
    if (S.editor && S.currentId === id && !S.editor.isEmpty) return;
    S.pages = S.pages.filter(x => x !== p);
    await DB.del('pages', p.id);
    const d = divById(p.dividerId);
    if (d && d.auto && !S.pages.some(x => x.dividerId === d.id)) {
      S.dividers = S.dividers.filter(x => x !== d);
      await DB.del('dividers', d.id);
    }
  }
  // First real edit: make the page (and its divider) permanent so it backs up.
  async function promote(p) {
    if (!p.auto) return;
    p.auto = 0;
    const d = divById(p.dividerId);
    if (d && d.auto) { d.auto = 0; await saveDivider(d); }
    renderTree();
  }

  /* ── Rendering ─────────────────────────────────────────── */
  function render() {
    if (S.destroyed) return;
    root.dataset.access = S.access;
    const gate = $('.nb-gate');
    const hasNotes = S.access === 'pro' || S.access === 'readonly';
    $('.nb-side').hidden = !hasNotes;
    $('.nb-side-toggle').hidden = !hasNotes;
    $('.nb-print').hidden = !hasNotes;
    gate.hidden = hasNotes;
    if (!hasNotes) { destroyEditor(); $('.nb-pagewrap').hidden = true; $('.nb-empty').hidden = true; renderGate(); setStatus(''); return; }
    renderBanner();
    renderTree();
    renderPage();
    if (S.access === 'readonly') setStatus('readonly');
  }

  function renderGate() {
    const g = $('.nb-gate');
    if (S.access === 'loading') { g.innerHTML = `<p class="nb-muted">Opening your notebook…</p>`; return; }
    const signedOut = S.access === 'signedout';
    g.innerHTML = `
      <div class="nb-gate-card">
        <div class="nb-gate-icon">${ic('notebook-pen')}</div>
        <p class="nb-kicker">Pro feature</p>
        <h2>Your own notebook, next to every lesson</h2>
        <ul class="nb-gate-list">
          <li>Clip text from lessons, with a link back to where it came from</li>
          <li>Type, highlight, add checklists, tables and links</li>
          <li>Sort notes into a divider for each subject</li>
          <li>Backed up to your account: open your notes on any device</li>
          <li>Print a page, a subject, or the whole notebook</li>
        </ul>
        <div class="nb-gate-actions">
          ${signedOut
            ? `<button type="button" class="nb-btn nb-btn-primary nb-signin">Sign in</button><a class="nb-btn" href="${PRICING_URL}">See Pro</a>`
            : `<a class="nb-btn nb-btn-primary" href="${PRICING_URL}">Upgrade to Pro</a>`}
        </div>
        ${signedOut ? '<p class="nb-muted">Study Spellbook is part of the Pro plan. Sign in to open your notebook.</p>' : '<p class="nb-muted">Study Spellbook is part of the Pro plan.</p>'}
      </div>`;
    icons(g);
    g.querySelector('.nb-signin')?.addEventListener('click', () => {
      if (window.MagicLabModal && window.MagicLabModal.open) window.MagicLabModal.open();
      else location.href = '/index.html';
    });
  }

  function renderBanner() {
    const b = $('.nb-banner');
    if (S.access === 'readonly') {
      b.hidden = false;
      b.innerHTML = `<span>${ic('lock')} Your notes are safe. Notebook editing is part of Pro: you can read and print your notes, and upgrade to keep writing.</span><a class="nb-btn nb-btn-sm nb-btn-primary" href="${PRICING_URL}">Upgrade</a>`;
      icons(b);
    } else b.hidden = true;
  }

  function renderTree() {
    const tree = $('.nb-tree');
    const divs = liveDividers();
    const ro = !canWrite();
    tree.innerHTML = '';
    if (!divs.length) {
      tree.appendChild(el('p', { class: 'nb-muted nb-tree-empty' }, ro ? 'No notes yet.' : 'No dividers yet. Make one for each subject, or open the notebook from a lesson.'));
    }
    divs.forEach(d => {
      const pages = livePages(d.id);
      const open = !S.collapsed[d.id];
      const sec = el('section', { class: 'nb-div' + (d.auto ? ' nb-auto' : ''), style: `--div:${d.colour}`, 'data-id': d.id });
      const row = el('div', { class: 'nb-div-row' });
      const tog = el('button', { type: 'button', class: 'nb-div-toggle', 'aria-expanded': String(open), title: d.name },
        `<i data-lucide="chevron-right" class="nb-chev" aria-hidden="true"></i><span class="nb-swatch" aria-hidden="true"></span><span class="nb-div-name">${esc(d.name)}</span><span class="nb-count">${pages.length}</span>`);
      tog.addEventListener('click', () => { S.collapsed[d.id] = open; saveCollapsed(); renderTree(); });
      tog.addEventListener('dblclick', () => !ro && startRename('div', d.id));
      row.appendChild(tog);
      if (!ro) {
        const more = el('button', { type: 'button', class: 'nb-icon-btn nb-sm', title: 'Divider options', 'aria-label': `Options for ${d.name}`, 'aria-haspopup': 'menu' }, ic('ellipsis'));
        more.addEventListener('click', e => dividerMenu(e.currentTarget, d));
        row.appendChild(more);
      }
      sec.appendChild(row);
      if (open) {
        const ul = el('ul', { class: 'nb-pages' });
        pages.forEach(p => {
          const li = el('li', { 'data-id': p.id, draggable: ro ? null : 'true' });
          const b = el('button', { type: 'button', class: 'nb-page-btn' + (p.auto ? ' nb-auto' : ''), 'aria-current': p.id === S.currentId ? 'page' : null },
            `<i data-lucide="${p.lessonRef ? 'book-open' : 'file-text'}" aria-hidden="true"></i><span>${esc(p.title || 'Untitled page')}</span>`);
          b.addEventListener('click', () => switchTo(p.id));
          li.appendChild(b);
          if (!ro) {
            const m = el('button', { type: 'button', class: 'nb-icon-btn nb-sm nb-page-more', title: 'Page options', 'aria-label': `Options for ${p.title}`, 'aria-haspopup': 'menu' }, ic('ellipsis'));
            m.addEventListener('click', e => pageMenu(e.currentTarget, p));
            li.appendChild(m);
            dragPage(li, p);
          }
          ul.appendChild(li);
        });
        if (!ro) {
          const add = el('li', {}, '');
          const ab = el('button', { type: 'button', class: 'nb-text-btn nb-add-page' }, ic('plus', 'New page'));
          ab.addEventListener('click', async () => { const p = await addPage(d.id); await switchTo(p.id); startRename('page', p.id); });
          add.appendChild(ab); ul.appendChild(add);
        }
        dropOnDivider(sec, d);
        sec.appendChild(ul);
      }
      tree.appendChild(sec);
    });
    // The bin: deleted pages stay for 30 days and can be put back.
    const binned = S.pages.filter(p => p.deletedAt && Date.now() - p.deletedAt < BIN_DAYS * 864e5).sort((a, b) => b.deletedAt - a.deletedAt);
    if (binned.length && !ro) {
      const bin = el('section', { class: 'nb-bin' });
      const tog = el('button', { type: 'button', class: 'nb-div-toggle', 'aria-expanded': String(S.binOpen) },
        `<i data-lucide="chevron-right" class="nb-chev" aria-hidden="true"></i><i data-lucide="trash-2" aria-hidden="true"></i><span class="nb-div-name">Bin</span><span class="nb-count">${binned.length}</span>`);
      tog.addEventListener('click', () => { S.binOpen = !S.binOpen; renderTree(); });
      bin.appendChild(tog);
      if (S.binOpen) {
        bin.appendChild(el('p', { class: 'nb-muted nb-bin-note' }, `Deleted pages are kept for ${BIN_DAYS} days.`));
        const ul = el('ul', { class: 'nb-pages' });
        binned.forEach(p => {
          const li = el('li');
          li.appendChild(el('span', { class: 'nb-bin-title', text: p.title || 'Untitled page' }));
          const r = el('button', { type: 'button', class: 'nb-text-btn nb-sm' }, ic('undo-2', 'Restore'));
          r.addEventListener('click', () => restorePage(p));
          li.appendChild(r); ul.appendChild(li);
        });
        bin.appendChild(ul);
      }
      tree.appendChild(bin);
    }
    $('.nb-add-div').hidden = ro;
    icons(tree);
  }

  /* ── Drag pages to reorder or move between dividers ────── */
  let dragId = null;
  function dragPage(li, p) {
    li.addEventListener('dragstart', e => { dragId = p.id; li.classList.add('nb-dragging'); e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', p.title); } catch (x) {} });
    li.addEventListener('dragend', () => { dragId = null; li.classList.remove('nb-dragging'); root.querySelectorAll('.nb-drop-before').forEach(n => n.classList.remove('nb-drop-before')); });
    li.addEventListener('dragover', e => { if (!dragId || dragId === p.id) return; e.preventDefault(); li.classList.add('nb-drop-before'); });
    li.addEventListener('dragleave', () => li.classList.remove('nb-drop-before'));
    li.addEventListener('drop', async e => {
      e.preventDefault(); e.stopPropagation(); li.classList.remove('nb-drop-before');
      const moving = pageById(dragId); if (!moving || moving === p) return;
      const sibs = livePages(p.dividerId).filter(x => x !== moving);
      const i = sibs.indexOf(p);
      const before = sibs[i - 1];
      moving.dividerId = p.dividerId;
      moving.sort = before ? (before.sort + p.sort) / 2 : p.sort - 1;
      await savePage(moving); renderTree();
    });
  }
  function dropOnDivider(sec, d) {
    sec.addEventListener('dragover', e => { if (dragId) { e.preventDefault(); sec.classList.add('nb-drop-into'); } });
    sec.addEventListener('dragleave', e => { if (!sec.contains(e.relatedTarget)) sec.classList.remove('nb-drop-into'); });
    sec.addEventListener('drop', async e => {
      sec.classList.remove('nb-drop-into');
      const moving = pageById(dragId); if (!moving) return;
      e.preventDefault();
      moving.dividerId = d.id; moving.sort = nextSort(livePages(d.id).filter(x => x !== moving));
      await savePage(moving); renderTree();
    });
  }

  /* ── Renaming in place ─────────────────────────────────── */
  function startRename(kind, id) {
    const sel = kind === 'div' ? `.nb-div[data-id="${id}"] .nb-div-name` : null;
    if (kind === 'page') {
      if (id === S.currentId) { const t = $('.nb-title'); t.focus(); t.select(); }
      return;
    }
    const span = root.querySelector(sel); if (!span) return;
    const d = divById(id);
    const input = el('input', { type: 'text', class: 'nb-rename', value: d.name, maxlength: '80', 'aria-label': 'Divider name' });
    const btn = span.closest('button');
    btn.replaceWith(input);
    input.focus(); input.select();
    let done = false;
    const finish = async save => {
      if (done) return; done = true;
      const v = input.value.trim();
      if (save && v && v !== d.name) { d.name = v; if (d.auto) d.auto = 0; await saveDivider(d); }
      renderTree();
    };
    input.addEventListener('keydown', e => { if (e.key === 'Enter') finish(true); if (e.key === 'Escape') finish(false); });
    input.addEventListener('blur', () => finish(true));
  }

  /* ── Menus ─────────────────────────────────────────────── */
  let openMenu = null;
  function closeMenu() { if (openMenu) { openMenu.remove(); openMenu = null; document.removeEventListener('pointerdown', outsideMenu, true); document.removeEventListener('keydown', menuKey, true); } }
  function outsideMenu(e) { if (openMenu && !openMenu.contains(e.target)) closeMenu(); }
  function menuKey(e) {
    if (e.key === 'Escape') { e.stopPropagation(); const a = openMenu && openMenu._anchor; closeMenu(); a && a.focus(); }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && openMenu) {
      const items = [...openMenu.querySelectorAll('button:not([disabled]), input')];
      const i = items.indexOf(document.activeElement);
      const n = items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length];
      n && n.focus(); e.preventDefault();
    }
  }
  // items: [{ label, icon, action, danger, disabled }] or { html, mount(menuEl) } or 'sep'
  function menu(anchor, items, cls) {
    closeMenu();
    const m = el('div', { class: 'nb-menu' + (cls ? ' ' + cls : ''), role: 'menu', 'data-ml-no-theme': '' });
    items.forEach(it => {
      if (it === 'sep') { m.appendChild(el('div', { class: 'nb-menu-sep', role: 'separator' })); return; }
      if (it.html != null) { const box = el('div', { class: 'nb-menu-custom' }, it.html); m.appendChild(box); it.mount && it.mount(box); return; }
      const b = el('button', { type: 'button', role: 'menuitem', class: it.danger ? 'nb-danger' : null, disabled: it.disabled || null }, ic(it.icon || 'dot', it.label));
      b.addEventListener('click', () => { closeMenu(); it.action(); });
      m.appendChild(b);
    });
    root.appendChild(m);
    m._anchor = anchor;
    const r = anchor.getBoundingClientRect(), rr = root.getBoundingClientRect();
    const w = m.offsetWidth, h = m.offsetHeight;
    let left = r.right - rr.left - w; if (left < 8) left = Math.min(r.left - rr.left, rr.width - w - 8);
    let top = r.bottom - rr.top + 6; if (top + h > rr.height - 8) top = Math.max(8, r.top - rr.top - h - 6);
    m.style.left = Math.max(8, left) + 'px'; m.style.top = top + 'px';
    icons(m);
    openMenu = m;
    setTimeout(() => { document.addEventListener('pointerdown', outsideMenu, true); document.addEventListener('keydown', menuKey, true); }, 0);
    const first = m.querySelector('button, input'); first && first.focus();
    return m;
  }

  function colourPicker(current, onPick) {
    return {
      html: `<div class="nb-menu-label">Colour</div><div class="nb-swatches">${DIVIDER_COLOURS.map(c => `<button type="button" class="nb-swatch-btn" style="--c:${c}" data-c="${c}" aria-label="Colour ${c}" aria-pressed="${c === current}"></button>`).join('')}</div>`,
      mount: box => box.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => { closeMenu(); onPick(b.dataset.c); }))
    };
  }

  function dividerMenu(anchor, d) {
    const divs = liveDividers(); const i = divs.indexOf(d);
    menu(anchor, [
      { label: 'Rename', icon: 'pencil', action: () => startRename('div', d.id) },
      colourPicker(d.colour, async c => { d.colour = c; await saveDivider(d); renderTree(); }),
      'sep',
      { label: 'Move up', icon: 'arrow-up', disabled: i === 0, action: () => swapDiv(d, divs[i - 1]) },
      { label: 'Move down', icon: 'arrow-down', disabled: i === divs.length - 1, action: () => swapDiv(d, divs[i + 1]) },
      { label: 'Print this divider', icon: 'printer', action: () => printPages(livePages(d.id), d.name) },
      'sep',
      { label: 'Delete divider', icon: 'trash-2', danger: true, action: () => deleteDivider(d) }
    ]);
  }
  async function swapDiv(a, b) { if (!b) return; [a.sort, b.sort] = [b.sort, a.sort]; await saveDivider(a); await saveDivider(b); renderTree(); }

  function pageMenu(anchor, p) {
    const sibs = livePages(p.dividerId); const i = sibs.indexOf(p);
    const others = liveDividers().filter(d => d.id !== p.dividerId);
    menu(anchor, [
      { label: 'Rename', icon: 'pencil', action: async () => { await switchTo(p.id); startRename('page', p.id); } },
      { label: 'Duplicate', icon: 'copy', action: () => duplicatePage(p) },
      { label: 'Move up', icon: 'arrow-up', disabled: i === 0, action: () => swapPage(p, sibs[i - 1]) },
      { label: 'Move down', icon: 'arrow-down', disabled: i === sibs.length - 1, action: () => swapPage(p, sibs[i + 1]) },
      { label: 'Move to another divider…', icon: 'folder-input', disabled: !others.length, action: () => moveMenu(anchor, p, others) },
      { label: 'Share with my teacher…', icon: 'send', action: async () => { await switchTo(p.id); shareMenu($('.nb-page-menu'), p); } },
      { label: 'Print this page', icon: 'printer', action: () => printPages([p], null) },
      'sep',
      { label: 'Delete page', icon: 'trash-2', danger: true, action: () => deletePage(p) }
    ]);
  }
  function moveMenu(anchor, p, divs) {
    menu(anchor, divs.map(d => ({ label: d.name, icon: 'folder', action: async () => {
      p.dividerId = d.id; p.sort = nextSort(livePages(d.id)); await promote(p); await savePage(p); S.collapsed[d.id] = false; saveCollapsed(); renderTree();
    } })));
  }
  async function swapPage(a, b) { if (!b) return; [a.sort, b.sort] = [b.sort, a.sort]; await savePage(a); await savePage(b); renderTree(); }
  async function duplicatePage(p) {
    if (p.id === S.currentId) await writeEditor();
    const copy = await addPage(p.dividerId, { title: p.title + ' (copy)', doc: JSON.parse(JSON.stringify(p.doc || EMPTY_DOC)), text: p.text, background: p.background,
      lessonRef: null, lessonUrl: p.lessonUrl, lessonTitle: p.lessonTitle, sort: p.sort + 0.5 });
    await switchTo(copy.id);
  }
  async function deletePage(p) {
    if (p.auto) { await discardIfUntouched(p.id); }
    p.deletedAt = Date.now();
    await savePage(p);
    if (p.id === S.currentId) { destroyEditor(); S.currentId = lastOpenPage(); }
    renderTree(); renderPage();
    toast('Page moved to the bin.', 'Undo', () => restorePage(p));
  }
  async function restorePage(p) {
    p.deletedAt = null;
    const d = divById(p.dividerId);
    if (d && d.deletedAt) { d.deletedAt = null; await saveDivider(d); }
    if (!d) { const nd = await addDivider('Restored', null, false); p.dividerId = nd.id; }
    await savePage(p);
    await switchTo(p.id);
  }
  async function deleteDivider(d) {
    const pages = livePages(d.id);
    if (pages.length && !confirm(`Delete “${d.name}” and its ${pages.length} page${pages.length === 1 ? '' : 's'}? They stay in the bin for ${BIN_DAYS} days.`)) return;
    const now = Date.now();
    for (const p of pages) { p.deletedAt = now; await savePage(p); }
    d.deletedAt = now; await saveDivider(d);
    if (pages.some(p => p.id === S.currentId)) { destroyEditor(); S.currentId = lastOpenPage(); }
    renderTree(); renderPage();
    toast(`“${d.name}” deleted.`, 'Undo', async () => {
      d.deletedAt = null; await saveDivider(d);
      for (const p of pages) { p.deletedAt = null; await savePage(p); }
      renderTree();
    });
  }

  /* ── The page and its editor ───────────────────────────── */
  function destroyEditor(skipWrite) {
    if (!S.editor) return;
    if (!skipWrite && S.saveTimer) { clearTimeout(S.saveTimer); S.saveTimer = null; writeEditorSync(); }
    S.editor.destroy(); S.editor = null;
  }
  function renderPage() {
    const p = pageById(S.currentId);
    const wrap = $('.nb-pagewrap'), empty = $('.nb-empty');
    if (!p || p.deletedAt) {
      destroyEditor();
      wrap.hidden = true; empty.hidden = false;
      const hasDivs = liveDividers().length;
      empty.innerHTML = canWrite()
        ? `<div class="nb-empty-card">${ic('notebook-pen')}<h2>${hasDivs ? 'Pick a page' : 'Start your notebook'}</h2><p class="nb-muted">${hasDivs ? 'Choose a page from the list, or make a new one.' : 'Make a divider for each subject, then add pages to it. Opening the notebook from a lesson makes a page for that lesson.'}</p>${hasDivs ? '' : '<button type="button" class="nb-btn nb-btn-primary nb-empty-add">New divider</button>'}</div>`
        : `<div class="nb-empty-card">${ic('notebook-pen')}<h2>Pick a page</h2><p class="nb-muted">Choose a page from the list to read it.</p></div>`;
      empty.querySelector('.nb-empty-add')?.addEventListener('click', () => addDivider());
      icons(empty);
      return;
    }
    empty.hidden = true; wrap.hidden = false;
    const ro = !canWrite();
    const title = $('.nb-title');
    title.value = p.title || '';
    title.readOnly = ro;
    title.oninput = () => { p.title = title.value.slice(0, 160); queueWrite(); };
    title.onchange = () => { if (!p.title.trim()) { p.title = 'Untitled page'; title.value = p.title; } queueWrite(0); renderTree(); };
    title.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); S.editor && S.editor.commands.focus('start'); } };
    $('.nb-page-menu').hidden = ro;
    $('.nb-page-menu').onclick = e => pageOptions(e.currentTarget, p);
    const ll = $('.nb-lessonlink');
    if (p.lessonUrl) {
      ll.hidden = false;
      ll.innerHTML = `${ic('book-open')}<span>Lesson:</span> <a href="${esc(p.lessonUrl)}">${esc(p.lessonTitle || p.title)}</a>`;
      ll.querySelector('a').addEventListener('click', e => { e.preventDefault(); goToLesson(p.lessonUrl, ''); });
      icons(ll);
    } else ll.hidden = true;
    $('.nb-paper').className = 'nb-paper nb-bg-' + (p.background || 'blank');
    loadShares(p);

    destroyEditor();
    S.editor = new Editor({
      element: $('.nb-editor'),
      extensions: extensions(ro ? '' : 'Start typing, or select text in a lesson and choose “Add to notes”.'),
      content: p.doc || EMPTY_DOC,
      editable: !ro,
      editorProps: { attributes: { class: 'nb-prose', 'aria-label': 'Page notes', spellcheck: 'true' } },
      onUpdate: () => { queueWrite(); },
      onSelectionUpdate: () => updateToolbar(),
      onTransaction: () => updateToolbar()
    });
    S.editor.view.dom.addEventListener('click', onEditorClick);
    renderToolbar(ro);
  }
  function pageOptions(anchor, p) {
    menu(anchor, [
      { html: `<div class="nb-menu-label">Page background</div><div class="nb-bgs">${BACKGROUNDS.map(([k, l]) => `<button type="button" data-bg="${k}" aria-pressed="${(p.background || 'blank') === k}"><span class="nb-bg-sample nb-bg-${k}"></span>${l}</button>`).join('')}</div>`,
        mount: box => box.querySelectorAll('[data-bg]').forEach(b => b.addEventListener('click', async () => {
          closeMenu(); p.background = b.dataset.bg; $('.nb-paper').className = 'nb-paper nb-bg-' + p.background; await promote(p); await savePage(p);
        })) },
      'sep',
      ...[{ label: 'Share with my teacher…', icon: 'send', action: () => shareMenu(anchor, p) },
        { label: 'Duplicate', icon: 'copy', action: () => duplicatePage(p) },
        { label: 'Print this page', icon: 'printer', action: () => printPages([p], null) },
        { label: 'Delete page', icon: 'trash-2', danger: true, action: () => deletePage(p) }]
    ]);
  }
  // Clip source links and lesson links go back to the lesson.
  function onEditorClick(e) {
    const a = e.target.closest('.nb-clip-src a');
    if (a) { e.preventDefault(); goToLesson(a.getAttribute('href'), a.getAttribute('data-section') || ''); return; }
    const link = e.target.closest('a[href]');
    if (link && (e.ctrlKey || e.metaKey || !S.editor.isEditable)) { e.preventDefault(); window.open(link.href, '_blank', 'noopener'); }
  }
  function goToLesson(url, section) {
    if (!url) return;
    let u; try { u = new URL(url, location.href); } catch (e) { return; }
    if (u.origin !== location.origin) return;
    if (opts.goToLesson) return opts.goToLesson(u.pathname + u.search, section);
    // Pop-out window: take the lesson window there if it's still open.
    try {
      const op = window.opener;
      if (op && !op.closed && op.MLNotebook && op.MLNotebook.goToLesson) {
        op.MLNotebook.goToLesson(u.pathname + u.search, section);
        op.focus();
        return;
      }
    } catch (x) {}
    window.open(u.pathname + u.search, '_blank');
  }

  // Edits are written to this device 400 ms after typing stops.
  function queueWrite(ms = 400) {
    if (!canWrite()) return;
    clearTimeout(S.saveTimer);
    S.saveTimer = setTimeout(() => { S.saveTimer = null; writeEditor(); }, ms);
  }
  function collectPage() {
    const p = pageById(S.currentId);
    if (!p || !S.editor) return null;
    p.doc = S.editor.getJSON();
    p.text = docText(p.doc);
    return p;
  }
  async function writeEditor() {
    if (!canWrite()) return;
    const p = collectPage(); if (!p) return;
    if (p.auto && S.editor.isEmpty && p.title === (p.lessonTitle || p.title)) return;   // still an untouched lesson page
    await promote(p);
    await savePage(p);
  }
  function writeEditorSync() { writeEditor(); }

  /* ── Toolbar ───────────────────────────────────────────── */
  const TOOLS = [
    { id: 'undo', icon: 'undo-2', label: 'Undo (Ctrl+Z)', run: c => c.undo() },
    { id: 'redo', icon: 'redo-2', label: 'Redo (Ctrl+Y)', run: c => c.redo() },
    '|',
    { id: 'style', kind: 'select' },
    '|',
    { id: 'bold', icon: 'bold', label: 'Bold (Ctrl+B)', run: c => c.toggleBold(), active: e => e.isActive('bold') },
    { id: 'italic', icon: 'italic', label: 'Italic (Ctrl+I)', run: c => c.toggleItalic(), active: e => e.isActive('italic') },
    { id: 'underline', icon: 'underline', label: 'Underline (Ctrl+U)', run: c => c.toggleUnderline(), active: e => e.isActive('underline') },
    { id: 'strike', icon: 'strikethrough', label: 'Strikethrough', run: c => c.toggleStrike(), active: e => e.isActive('strike') },
    { id: 'highlight', icon: 'highlighter', label: 'Highlight', menu: 'highlight', active: e => e.isActive('highlight') },
    { id: 'color', icon: 'baseline', label: 'Text colour', menu: 'color' },
    '|',
    { id: 'bullet', icon: 'list', label: 'Bulleted list', run: c => c.toggleBulletList(), active: e => e.isActive('bulletList') },
    { id: 'ordered', icon: 'list-ordered', label: 'Numbered list', run: c => c.toggleOrderedList(), active: e => e.isActive('orderedList') },
    { id: 'task', icon: 'list-checks', label: 'Checklist', run: c => c.toggleTaskList(), active: e => e.isActive('taskList') },
    { id: 'quote', icon: 'text-quote', label: 'Quote', run: c => c.toggleBlockquote(), active: e => e.isActive('blockquote') },
    '|',
    { id: 'link', icon: 'link', label: 'Link (Ctrl+K)', menu: 'link', active: e => e.isActive('link') },
    { id: 'table', icon: 'table', label: 'Table', menu: 'table', active: e => e.isActive('table') },
    { id: 'sub', icon: 'subscript', label: 'Subscript', run: c => c.toggleSubscript(), active: e => e.isActive('subscript') },
    { id: 'sup', icon: 'superscript', label: 'Superscript', run: c => c.toggleSuperscript(), active: e => e.isActive('superscript') },
    { id: 'clear', icon: 'remove-formatting', label: 'Clear formatting', run: c => c.unsetAllMarks().clearNodes() }
  ];
  function renderToolbar(ro) {
    const tb = $('.nb-toolbar');
    tb.hidden = ro;
    if (ro) return;
    tb.innerHTML = '';
    TOOLS.forEach(t => {
      if (t === '|') { tb.appendChild(el('span', { class: 'nb-tb-sep', 'aria-hidden': 'true' })); return; }
      if (t.kind === 'select') {
        const s = el('select', { class: 'nb-tb-select', 'aria-label': 'Text style', title: 'Text style' },
          '<option value="p">Normal text</option><option value="1">Heading 1</option><option value="2">Heading 2</option><option value="3">Heading 3</option>');
        s.addEventListener('change', () => {
          const c = S.editor.chain().focus();
          (s.value === 'p' ? c.setParagraph() : c.setHeading({ level: +s.value })).run();
        });
        tb.appendChild(s); return;
      }
      const b = el('button', { type: 'button', class: 'nb-tb-btn', 'data-tool': t.id, title: t.label, 'aria-label': t.label, 'aria-pressed': t.active ? 'false' : null, 'aria-haspopup': t.menu ? 'menu' : null }, ic(t.icon));
      b.addEventListener('mousedown', e => e.preventDefault());      // keep the text selection
      b.addEventListener('click', () => {
        if (t.menu) return toolMenu(t.menu, b);
        t.run(S.editor.chain().focus()).run();
      });
      tb.appendChild(b);
    });
    icons(tb);
    updateToolbar();
  }
  function updateToolbar() {
    const e = S.editor; if (!e) return;
    const tb = $('.nb-toolbar'); if (tb.hidden) return;
    TOOLS.forEach(t => {
      if (!t.active) return;
      const b = tb.querySelector(`[data-tool="${t.id}"]`); if (b) b.setAttribute('aria-pressed', String(!!t.active(e)));
    });
    const s = tb.querySelector('.nb-tb-select');
    if (s) s.value = e.isActive('heading', { level: 1 }) ? '1' : e.isActive('heading', { level: 2 }) ? '2' : e.isActive('heading', { level: 3 }) ? '3' : 'p';
    const u = tb.querySelector('[data-tool="undo"]'), r = tb.querySelector('[data-tool="redo"]');
    if (u) u.disabled = !e.can().undo();
    if (r) r.disabled = !e.can().redo();
  }
  function toolMenu(kind, anchor) {
    const ed = S.editor;
    if (kind === 'highlight') {
      menu(anchor, [{
        html: `<div class="nb-menu-label">Highlight</div><div class="nb-swatches">${HIGHLIGHTS.map(([n, c]) => `<button type="button" class="nb-swatch-btn" style="--c:${c}" data-c="${c}" aria-label="${n}"></button>`).join('')}</div>`,
        mount: box => box.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => { closeMenu(); ed.chain().focus().toggleHighlight({ color: b.dataset.c }).run(); }))
      }, { label: 'Remove highlight', icon: 'eraser', action: () => ed.chain().focus().unsetHighlight().run() }]);
    } else if (kind === 'color') {
      menu(anchor, [{
        html: `<div class="nb-menu-label">Text colour</div><div class="nb-swatches">${TEXT_COLOURS.map(([n, c]) => `<button type="button" class="nb-swatch-btn${c ? '' : ' nb-swatch-none'}" style="--c:${c || 'transparent'}" data-c="${c}" aria-label="${n}"></button>`).join('')}</div>`,
        mount: box => box.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => {
          closeMenu(); const c = b.dataset.c; c ? ed.chain().focus().setColor(c).run() : ed.chain().focus().unsetColor().run();
        }))
      }]);
    } else if (kind === 'link') {
      const cur = ed.getAttributes('link').href || '';
      menu(anchor, [{
        html: `<form class="nb-linkform"><label class="nb-menu-label" for="nbLinkUrl">Link address</label><input id="nbLinkUrl" type="url" inputmode="url" placeholder="https://" value="${esc(cur)}"><div class="nb-linkrow"><button type="submit" class="nb-btn nb-btn-sm nb-btn-primary">Apply</button>${cur ? '<button type="button" class="nb-btn nb-btn-sm nb-unlink">Remove link</button>' : ''}</div></form>`,
        mount: box => {
          const f = box.querySelector('form'), inp = box.querySelector('input');
          f.addEventListener('submit', e => {
            e.preventDefault(); let v = inp.value.trim(); closeMenu();
            if (!v) return ed.chain().focus().extendMarkRange('link').unsetLink().run();
            if (!/^(https?:|mailto:|\/)/i.test(v)) v = 'https://' + v;
            if (ed.state.selection.empty && !ed.isActive('link')) ed.chain().focus().insertContent(`<a href="${esc(v)}">${esc(v)}</a> `).run();
            else ed.chain().focus().extendMarkRange('link').setLink({ href: v }).run();
          });
          box.querySelector('.nb-unlink')?.addEventListener('click', () => { closeMenu(); ed.chain().focus().extendMarkRange('link').unsetLink().run(); });
          setTimeout(() => inp.focus(), 0);
        }
      }]);
    } else if (kind === 'table') {
      const inTable = ed.isActive('table');
      menu(anchor, inTable ? [
        { label: 'Add row below', icon: 'between-horizontal-end', action: () => ed.chain().focus().addRowAfter().run() },
        { label: 'Add column right', icon: 'between-vertical-end', action: () => ed.chain().focus().addColumnAfter().run() },
        { label: 'Delete row', icon: 'minus', action: () => ed.chain().focus().deleteRow().run() },
        { label: 'Delete column', icon: 'minus', action: () => ed.chain().focus().deleteColumn().run() },
        'sep',
        { label: 'Delete table', icon: 'trash-2', danger: true, action: () => ed.chain().focus().deleteTable().run() }
      ] : [
        { label: 'Insert 2 × 2 table', icon: 'table', action: () => ed.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run() },
        { label: 'Insert 3 × 3 table', icon: 'table', action: () => ed.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
        { label: 'Insert 4 × 4 table', icon: 'table', action: () => ed.chain().focus().insertTable({ rows: 4, cols: 4, withHeaderRow: true }).run() }
      ]);
    }
  }
  root.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k' && S.editor && S.editor.isFocused) {
      e.preventDefault(); const b = root.querySelector('[data-tool="link"]'); b && toolMenu('link', b);
    }
    if (e.key === 'Escape' && !openMenu && opts.onClose && !e.defaultPrevented) {
      if (S.narrow && S.sideOpen && S.currentId) { S.sideOpen = false; applySide(); return; }
      opts.onClose();
    }
  });

  /* ── Sharing a page with a teacher ─────────────────────────
     The learner picks one of their classes; that class's teachers can then
     read this page (always the current version) and comment on it. Stopping
     sharing takes their access away straight away. Needs the network. */
  let myClasses = null;
  async function getMyClasses() {
    if (myClasses) return myClasses;
    const { data, error } = await client().rpc('notebook_my_classes');
    if (error) throw error;
    return (myClasses = data || []);
  }
  async function shareMenu(anchor, p) {
    if (!client() || !navigator.onLine) { toast('Sharing needs an internet connection.'); return; }
    await flush();
    const cur = pageById(p.id);
    if (!cur || !(cur.version > 0) || cur.dirty) { toast('This page is still backing up. Try again in a moment.'); scheduleSync(0); return; }
    let classes, shares;
    try {
      classes = await getMyClasses();
      const { data, error } = await client().from('notebook_shares').select('id,class_id').eq('page_id', p.id);
      if (error) throw error;
      shares = data || [];
    } catch (e) { console.warn('[notebook] share', e); toast('Sharing couldn’t load. Please try again.'); return; }
    if (!classes.length) { toast('Join your class first (on your dashboard, under To do). Then you can share pages with your teacher.'); return; }
    const sharedWith = new Map(shares.map(s => [s.class_id, s.id]));
    menu(anchor, [{
      html: `<div class="nb-menu-label">Share this page with a class’s teachers</div>
        <div class="nb-sharelist">${classes.map(c => {
          const on = sharedWith.has(c.class_id);
          return `<div class="nb-sharerow"><span>${esc(c.name)}</span><button type="button" class="nb-btn nb-btn-sm${on ? '' : ' nb-btn-primary'}" data-class="${esc(c.class_id)}" data-on="${on}">${on ? 'Stop sharing' : 'Share'}</button></div>`;
        }).join('')}</div>
        <p class="nb-menu-note">Your teacher can read this page, including later changes, and leave comments. Nothing else in your notebook is shared.</p>`,
      mount: box => box.querySelectorAll('[data-class]').forEach(b => b.addEventListener('click', async () => {
        b.disabled = true;
        const classId = b.dataset.class, on = b.dataset.on === 'true';
        const res = on
          ? await client().from('notebook_shares').delete().eq('id', sharedWith.get(classId))
          : await client().from('notebook_shares').insert({ page_id: p.id, owner: S.owner, class_id: classId });
        closeMenu();
        if (res.error) { console.warn('[notebook] share', res.error); toast('That didn’t work. Please try again.'); return; }
        const name = (classes.find(c => c.class_id === classId) || {}).name || 'your class';
        toast(on ? `Stopped sharing with ${name}.` : `Shared with ${name}’s teachers.`);
        loadShares(p);
      }))
    }], 'nb-menu-wide');
  }
  // The strip under the title: who it's shared with, and the teacher's comments.
  let shareLoadToken = 0;
  async function loadShares(p) {
    const bar = $('.nb-sharebar');
    const token = ++shareLoadToken;
    bar.hidden = true; bar.innerHTML = '';
    const sb = client();
    if (!sb || !navigator.onLine || !(p.version > 0)) return;
    try {
      const { data: shares, error } = await sb.from('notebook_shares').select('id,class_id,created_at').eq('page_id', p.id);
      if (error) throw error;
      if (token !== shareLoadToken || !shares.length) return;
      const classes = await getMyClasses().catch(() => []);
      const { data: comments, error: e2 } = await sb.from('notebook_share_comments').select('id,share_id,author,body,created_at')
        .in('share_id', shares.map(s => s.id)).order('created_at');
      if (e2) throw e2;
      if (token !== shareLoadToken) return;
      renderShareBar(p, shares, classes, comments || []);
    } catch (e) { console.warn('[notebook] shares', e); }
  }
  function renderShareBar(p, shares, classes, comments) {
    const bar = $('.nb-sharebar');
    const nameOf = id => (classes.find(c => c.class_id === id) || {}).name || 'your class';
    const names = shares.map(s => nameOf(s.class_id));
    const open = bar.dataset.open === p.id;
    const when = iso => new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' }) + ' ' + new Date(iso).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
    bar.hidden = false;
    bar.innerHTML = `
      <button type="button" class="nb-sharebar-toggle" aria-expanded="${open}">
        ${ic('users')}<span>Shared with ${esc(names.join(', '))}</span>
        ${comments.length ? `<span class="nb-sharebar-count">${comments.length} comment${comments.length === 1 ? '' : 's'}</span>` : ''}
        <i data-lucide="chevron-down" class="nb-chev2" aria-hidden="true"></i>
      </button>
      <div class="nb-thread"${open ? '' : ' hidden'}>
        ${shares.map(s => {
          const list = comments.filter(k => k.share_id === s.id);
          return `<div class="nb-thread-share">
            ${shares.length > 1 ? `<div class="nb-menu-label">${esc(nameOf(s.class_id))}</div>` : ''}
            ${list.length ? list.map(k => `<div class="nb-comment${k.author === S.owner ? ' nb-mine' : ''}">
              <div class="nb-comment-who">${k.author === S.owner ? 'You' : 'Teacher'} · <span>${esc(when(k.created_at))}</span></div>
              <div class="nb-comment-body">${esc(k.body)}</div></div>`).join('') : '<p class="nb-muted">No comments yet.</p>'}
            <form class="nb-reply" data-share="${esc(s.id)}">
              <textarea rows="2" maxlength="2000" placeholder="Reply to your teacher…" aria-label="Reply to your teacher"></textarea>
              <button type="submit" class="nb-btn nb-btn-sm nb-btn-primary">Send</button>
            </form>
          </div>`;
        }).join('')}
        <button type="button" class="nb-text-btn nb-sm nb-share-manage">${ic('settings-2', 'Change who can see this page')}</button>
      </div>`;
    icons(bar);
    bar.querySelector('.nb-sharebar-toggle').addEventListener('click', () => {
      bar.dataset.open = bar.dataset.open === p.id ? '' : p.id;
      renderShareBar(p, shares, classes, comments);
    });
    bar.querySelector('.nb-share-manage')?.addEventListener('click', e => shareMenu(e.currentTarget, p));
    bar.querySelectorAll('.nb-reply').forEach(f => f.addEventListener('submit', async e => {
      e.preventDefault();
      const ta = f.querySelector('textarea'), body = ta.value.trim();
      if (!body) return;
      f.querySelector('button').disabled = true;
      const { error } = await client().from('notebook_share_comments').insert({ share_id: f.dataset.share, author: S.owner, body });
      if (error) { toast('Your reply didn’t send. Please try again.'); f.querySelector('button').disabled = false; return; }
      bar.dataset.open = p.id;
      loadShares(p);
    }));
  }

  /* ── Clips from lessons ────────────────────────────────── */
  async function insertClip(clip) {
    if (!canWrite()) { toast('Notebook editing is part of Pro.'); return false; }
    if (clip.lesson && (!S.currentId || !pageById(S.currentId))) await openForLesson(clip.lesson, false);
    if (!S.currentId) { await openForLesson(S.lesson || { title: 'Clippings', divider: 'My notes' }, false); }
    if (!S.editor) renderPage();
    const html = `<aside data-clip data-title="${esc(clip.title)}" data-url="${esc(clip.url)}" data-section="${esc(clip.section || '')}"><div class="nb-clip-body">${clip.html}</div></aside><p></p>`;
    S.editor.chain().focus('end').insertContent(html).run();
    S.editor.commands.scrollIntoView();
    await writeEditor();
    return true;
  }

  /* ── Printing ──────────────────────────────────────────── */
  function printMenu(anchor) {
    const p = pageById(S.currentId);
    const d = p && divById(p.dividerId);
    menu(anchor, [
      { label: 'This page', icon: 'file-text', disabled: !p, action: () => printPages([p], null) },
      { label: d ? `This divider (${d.name})` : 'This divider', icon: 'folder', disabled: !d, action: () => printPages(livePages(d.id), d.name) },
      { label: 'Whole notebook', icon: 'notebook', action: () => printAll() }
    ]);
  }
  function printAll() {
    const groups = liveDividers().map(d => ({ name: d.name, pages: livePages(d.id) })).filter(g => g.pages.length);
    doPrint(groups);
  }
  async function printPages(pages, dividerName) {
    if (pages.some(p => p.id === S.currentId)) { collectPage(); await writeEditor(); }
    doPrint([{ name: dividerName, pages }]);
  }
  function doPrint(groups) {
    document.getElementById('nb-print')?.remove();
    const exts = extensions('');
    const box = el('div', { id: 'nb-print', 'data-ml-no-theme': '' });
    groups.forEach(g => {
      if (g.name) box.appendChild(el('h1', { class: 'nb-print-divider', text: g.name }));
      g.pages.forEach(p => {
        const art = el('article', { class: 'nb-print-page nb-bg-' + (p.background || 'blank') });
        art.appendChild(el('h2', { class: 'nb-print-title', text: p.title || 'Untitled page' }));
        if (p.lessonTitle) art.appendChild(el('p', { class: 'nb-print-lesson', text: 'Lesson: ' + p.lessonTitle }));
        let html = '';
        try { html = generateHTML(p.doc || EMPTY_DOC, exts); } catch (e) { html = `<p>${esc(p.text || '')}</p>`; }
        art.appendChild(el('div', { class: 'nb-prose' }, html));
        box.appendChild(art);
      });
    });
    document.body.appendChild(box);
    document.documentElement.classList.add('nb-printing');
    const done = () => { document.documentElement.classList.remove('nb-printing'); box.remove(); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(() => window.print(), 50);
  }

  /* ── Toasts ────────────────────────────────────────────── */
  function toast(msg, actionLabel, action) {
    root.querySelector('.nb-toast')?.remove();
    const t = el('div', { class: 'nb-toast', role: 'status' }, `<span>${esc(msg)}</span>`);
    if (actionLabel) {
      const b = el('button', { type: 'button', class: 'nb-text-btn' }, esc(actionLabel));
      b.addEventListener('click', () => { t.remove(); action(); });
      t.appendChild(b);
    }
    root.appendChild(t);
    setTimeout(() => t.remove(), actionLabel ? 8000 : 4500);
  }

  /* ── Remembered UI state ───────────────────────────────── */
  function loadCollapsed() { try { return JSON.parse(localStorage.getItem('ml-nb-collapsed') || '{}'); } catch (e) { return {}; } }
  function saveCollapsed() { try { localStorage.setItem('ml-nb-collapsed', JSON.stringify(S.collapsed)); } catch (e) {} }

  /* ── Go ────────────────────────────────────────────────── */
  applySide();
  render();
  const ready = start();

  return {
    ready,
    insertClip,
    async openForLesson(lesson) { await ready; await openForLesson(lesson, false); render(); },
    // The learner opened another lesson in the same page (Code Conjurer, Codex …):
    // follow it, unless they have started writing on the page that is open.
    async followLesson(lesson) {
      await ready;
      const p = pageById(S.currentId);
      if (p && !p.auto) return;
      await openForLesson(lesson, false);
    },
    flush,
    focus() { (S.editor && S.editor.isEditable ? S.editor.commands.focus() : root.querySelector('button:not([hidden])')?.focus()); },
    currentPageId: () => S.currentId,
    async destroy() {
      await flush().catch(() => {});
      await discardIfUntouched(S.currentId).catch(() => {});
      S.destroyed = true;
      clearInterval(S.pollTimer); clearTimeout(S.syncTimer);
      destroyEditor(true); closeMenu(); ro.disconnect();
      document.removeEventListener('magiclab:auth:change', onAuthChange);
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onVis);
      channel && channel.removeEventListener('message', onMessage);
      root.innerHTML = '';
    }
  };
}

export { channel as notebookChannel, WINDOW_ID, extensions as notebookExtensions, EMPTY_DOC };
