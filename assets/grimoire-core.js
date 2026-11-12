/* Grading Grimoire — shared core (ES module).
   Used by the learner editor (written-task.html) and the marking view (grimoire-mark.html).
   Spec: docs/marking-platform-spec.md §2–§4. Keep the document schema identical on both pages:
   the marking view renders exactly what the learner wrote, with the same extensions. */
import {
  Extension, StarterKit, TableKit, Image, UniqueID, Subscript, Superscript, CharacterCount, Placeholder,
  Plugin, PluginKey, Decoration, DecorationSet
} from './vendor/tiptap-3.32.1.bundle.js';

export const DOC_SCHEMA = 1;
export const BUCKET = 'submission-files';

/* ── Small helpers ─────────────────────────────────────────── */
export const auth = () => window.MagicLabAuth;
export const sb = () => auth() && auth()._supabase && auth()._supabase();
export const me = () => { const s = auth() && auth().getSession && auth().getSession(); return s && s.user ? s.user.id : null; };
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const capsLevel = pct => pct >= 80 ? 7 : pct >= 70 ? 6 : pct >= 60 ? 5 : pct >= 50 ? 4 : pct >= 40 ? 3 : pct >= 30 ? 2 : 1;
export const round1 = n => Math.round(n * 10) / 10;
export const fmtNum = n => (n == null || isNaN(n)) ? '–' : String(round1(n)).replace(/\.0$/, '');
export function fmtWhen(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}
export function el(tag, attrs, kids) {
  const n = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (v == null || v === false) return;
    if (k === 'text') n.textContent = v;
    else if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;            // only ever with esc()'d or constant markup
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  });
  (kids || []).forEach(c => c != null && n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return n;
}
/** Wait until auth.js has restored the session (it fires magiclab:auth:ready). */
export function whenAuthReady() {
  // auth.js assigns window.MagicLabAuth only once the session is restored, then fires the event.
  return new Promise(resolve => {
    if (auth()) return resolve();
    document.addEventListener('magiclab:auth:ready', () => resolve(), { once: true });
  });
}
export const friendly = err => String((err && err.message) || err || 'Something went wrong').replace(/^.*?:\s*(?=[A-Z])/, '');

/* ── Images: private storage, short-lived signed URLs ──────── */
const urlCache = new Map();   // path → { url, until }
export async function signedUrl(path) {
  if (!path) return '';
  const hit = urlCache.get(path);
  if (hit && hit.until > Date.now()) return hit.url;
  const { data, error } = await sb().storage.from(BUCKET).createSignedUrl(path, 3600);
  if (error) { console.warn('[grimoire] image', error.message); return ''; }
  urlCache.set(path, { url: data.signedUrl, until: Date.now() + 50 * 60 * 1000 });
  return data.signedUrl;
}
/** Shrink to ≤1600px, re-encode as WebP (JPEG fallback). Re-encoding drops EXIF (GPS, device). */
export async function prepareImage(file, opts = {}) {
  const bmp = await createImageBitmap(file).catch(() => null);
  if (!bmp) throw new Error('That image could not be read. Try a JPEG or PNG.');
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const w = Math.round(bmp.width * scale), h = Math.round(bmp.height * scale);
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  c.getContext('2d').drawImage(bmp, 0, 0, w, h);
  let blob = opts.type === 'image/jpeg' ? null : await new Promise(r => c.toBlob(r, 'image/webp', 0.82));
  let type = 'image/webp', ext = 'webp';
  if (!blob || blob.type !== 'image/webp') { blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.85)); type = 'image/jpeg'; ext = 'jpg'; }
  if (blob.size > 2 * 1024 * 1024) throw new Error('That image is still over 2 MB after shrinking it.');
  return { blob, type, ext, w, h };
}

const GImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      src: { default: null, rendered: false },          // never stored: images live in private storage
      path: { default: null, parseHTML: e => e.getAttribute('data-path'), renderHTML: a => a.path ? { 'data-path': a.path } : {} },
      width: { default: null }, height: { default: null }
    };
  },
  addNodeView() {
    return ({ node }) => {
      const img = document.createElement('img');
      img.className = 'gg-img';
      img.alt = node.attrs.alt || '';
      if (node.attrs.width && node.attrs.height) { img.width = node.attrs.width; img.height = node.attrs.height; }
      if (node.attrs.path) signedUrl(node.attrs.path).then(u => { if (u) img.src = u; });
      else if (node.attrs.src && String(node.attrs.src).startsWith('blob:')) img.src = node.attrs.src;   // upload in progress
      return { dom: img };
    };
  }
});

/* ── Range highlights (comments on a phrase) as ProseMirror decorations ── */
export const highlightKey = new PluginKey('gg-highlights');
const Highlights = Extension.create({
  name: 'ggHighlights',
  addProseMirrorPlugins() {
    return [new Plugin({
      key: highlightKey,
      state: {
        init: () => DecorationSet.empty,
        apply(tr, set) {
          const meta = tr.getMeta(highlightKey);
          if (meta) return DecorationSet.create(tr.doc, meta.map(m => Decoration.inline(m.from, m.to, { class: 'gg-hl' + (m.active ? ' is-active' : ''), 'data-ann': m.id })));
          return set.map(tr.mapping, tr.doc);
        }
      },
      props: { decorations(state) { return highlightKey.getState(state); } }
    })];
  }
});

/* Question headings (spec §2.2): a task's questions can start the learner's answer as headings
   carrying the question id. In the learner's editor they are locked: any change that removes or
   edits one is refused, so the learner writes under them but cannot delete or retype them. */
const qidMap = doc => { const m = new Map(); doc.descendants(n => { if (n.type.name === 'heading' && n.attrs.qid) m.set(n.attrs.qid, n.textContent); }); return m; };
const QuestionHeadings = Extension.create({
  name: 'ggQuestionHeadings',
  addOptions() { return { lock: false }; },
  addGlobalAttributes() {
    return [{ types: ['heading'], attributes: { qid: { default: null, keepOnSplit: false,
      parseHTML: e => e.getAttribute('data-qid'), renderHTML: a => a.qid ? { 'data-qid': a.qid } : {} } } }];
  },
  addProseMirrorPlugins() {
    if (!this.options.lock) return [];
    return [new Plugin({ filterTransaction: (tr, state) => {
      if (!tr.docChanged) return true;
      const before = qidMap(state.doc); if (!before.size) return true;
      const after = qidMap(tr.doc);
      for (const [k, v] of before) if (after.get(k) !== v) return false;
      return true;
    } })];
  }
});
/** The starting document for a task with questions: a locked heading per question, then space to answer. */
export function questionTemplate(questions) {
  return { type: 'doc', content: questions.flatMap(q => [
    { type: 'heading', attrs: { level: 3, qid: q.id }, content: [{ type: 'text', text: (q.number + ' ' + (q.label || '')).trim() }] },
    { type: 'paragraph' }
  ]) };
}

const BLOCK_TYPES = ['heading', 'paragraph', 'blockquote', 'codeBlock', 'bulletList', 'orderedList', 'listItem',
  'table', 'tableRow', 'tableCell', 'tableHeader', 'image', 'horizontalRule', 'taskList', 'taskItem'];

/** Fresh extension instances every time (two editors must never share instances). */
export function extensions({ editable = false, placeholder = '', wordLimit = null } = {}) {
  const list = [
    StarterKit.configure({
      heading: { levels: [2, 3] },
      link: { protocols: ['http', 'https', 'mailto'], openOnClick: !editable, autolink: true,
              HTMLAttributes: { rel: 'noopener noreferrer nofollow', target: '_blank' },
              isAllowedUri: (url, ctx) => /^(https?:|mailto:)/i.test(url) && ctx.defaultValidate(url) }
    }),
    Subscript, Superscript,
    TableKit.configure({ table: { resizable: false } }),
    GImage.configure({ inline: false, allowBase64: false }),
    UniqueID.configure({ types: BLOCK_TYPES, attributeName: 'bid', generateID: () => Math.random().toString(36).slice(2, 10) }),
    CharacterCount.configure(wordLimit ? { wordCounter: t => countWords(t) } : {}),
    QuestionHeadings.configure({ lock: editable }),
    Highlights
  ];
  if (editable && placeholder) list.push(Placeholder.configure({ placeholder }));
  return list;
}

/* ── Text, words, images ───────────────────────────────────── */
export function countWords(text) { const m = String(text || '').trim().match(/[\p{L}\p{N}'’-]+/gu); return m ? m.length : 0; }
export function docText(json) {
  const out = [];
  (function walk(n) {
    if (!n) return;
    if (n.type === 'text') out.push(n.text || '');
    if (n.content) n.content.forEach(walk);
    if (['paragraph', 'heading', 'listItem', 'tableCell', 'tableHeader', 'blockquote'].includes(n.type)) out.push('\n');
  })(json);
  return out.join('').replace(/\n{3,}/g, '\n\n').trim();
}
export function imagePaths(json) {
  const out = [];
  (function walk(n) { if (!n) return; if (n.type === 'image' && n.attrs && n.attrs.path) out.push(n.attrs.path); (n.content || []).forEach(walk); })(json);
  return [...new Set(out)];
}

/* ── Anchors (spec §3.3): a place in the content, never a pixel ── */
/** The nearest ancestor with a block id, at document position pos. */
export function blockAt(state, pos) {
  const $p = state.doc.resolve(Math.max(0, Math.min(pos, state.doc.content.size)));
  for (let d = $p.depth; d > 0; d--) {
    const node = $p.node(d);
    if (node.attrs && node.attrs.bid && node.isTextblock) return { bid: node.attrs.bid, start: $p.start(d), node };
  }
  for (let d = $p.depth; d > 0; d--) {
    const node = $p.node(d);
    if (node.attrs && node.attrs.bid) return { bid: node.attrs.bid, start: $p.start(d), node };
  }
  return null;
}
/** Find a block by id: { pos (before the node), node }. */
export function findBlock(state, bid) {
  let hit = null;
  state.doc.descendants((node, pos) => { if (hit) return false; if (node.attrs && node.attrs.bid === bid) { hit = { pos, node }; return false; } });
  return hit;
}
export function anchorFromPos(state, pos, lane = 'text') {
  const b = blockAt(state, pos);
  if (!b) return null;
  return { kind: 'point', bid: b.bid, offset: Math.max(0, pos - b.start), lane };
}
/** Document position for a point anchor (clamped inside its block), or null if the block is gone. */
export function posFromAnchor(state, a) {
  const hit = findBlock(state, a.bid);
  if (!hit) return null;
  const start = hit.pos + 1;
  return Math.min(start + (a.offset || 0), hit.pos + hit.node.nodeSize - 1);
}
export function rangeToPositions(state, a) {
  const f = findBlock(state, a.from.bid), t = findBlock(state, a.to.bid);
  if (!f || !t) return null;
  const from = Math.min(f.pos + 1 + a.from.offset, f.pos + f.node.nodeSize - 1);
  const to = Math.min(t.pos + 1 + a.to.offset, t.pos + t.node.nodeSize - 1);
  return from < to ? { from, to } : null;
}
export function rangeAnchor(state, from, to) {
  const a = blockAt(state, from), b = blockAt(state, to);
  if (!a || !b) return null;
  return { kind: 'range', from: { bid: a.bid, offset: from - a.start }, to: { bid: b.bid, offset: to - b.start },
           quote: { exact: state.doc.textBetween(from, to, ' ').slice(0, 300) } };
}

/* ── Questions and totals (spec §3.5) ───────────────────────── */
/** Map every block id to the question whose heading (or numbered first line) comes before it. */
export function questionMap(doc, questions) {
  const map = new Map();
  if (!questions || !questions.length) return map;
  const nums = questions.map(q => ({ q, re: new RegExp('^\\s*(?:question\\s*|vraag\\s*|q\\.?\\s*)?' + q.number.replace(/[.()]/g, m => '\\' + m) + '(?![0-9.])', 'i') }))
    .sort((a, b) => b.q.number.length - a.q.number.length);   // "1.10" before "1.1"
  let current = null;
  const ids = new Set(questions.map(q => q.id));
  doc.forEach(top => {
    const text = (top.textContent || '').slice(0, 40);
    const fixed = top.type.name === 'heading' && top.attrs.qid && ids.has(top.attrs.qid) ? top.attrs.qid : null;
    const hit = fixed ? null : nums.find(n => n.re.test(text));
    if (fixed) current = fixed; else if (hit) current = hit.q.id;
    const mark = n => { if (n.attrs && n.attrs.bid) map.set(n.attrs.bid, current); };
    mark(top);
    top.descendants(n => { mark(n); });
  });
  return map;
}
export function annotationBid(a) { return a.anchor.kind === 'range' ? a.anchor.from.bid : a.anchor.bid; }

/** PDF hand-ins: a mark belongs to the last "Question n starts here" marker above it. */
export function pageQuestionOf(anns) {
  const starts = anns.filter(a => a.type === 'qstart' && a.anchor.kind === 'page' && a.question_id)
    .sort((a, b) => a.anchor.page - b.anchor.page || a.anchor.fy - b.anchor.fy);
  return a => {
    if (a.anchor.kind !== 'page') return null;
    let q = null;
    for (const s of starts) { if (s.anchor.page < a.anchor.page || (s.anchor.page === a.anchor.page && s.anchor.fy <= a.anchor.fy + 0.002)) q = s.question_id; else break; }
    return q;
  };
}

/** Totals from ticks and marked comments. overrides: { qid: number }. */
export function tickTotals(annotations, qmap, questions, overrides) {
  const perQ = {}; let unsorted = 0;
  (questions || []).forEach(q => { perQ[q.id] = { got: 0, max: Number(q.max_marks), number: q.number, override: null }; });
  annotations.forEach(a => {
    if (a.layer && a.layer !== 'marker') return;
    const m = Number(a.marks) || 0;
    if (!m || (a.type !== 'tick' && a.type !== 'comment' && a.type !== 'stamp')) return;
    const qid = typeof qmap === 'function' ? qmap(a) : qmap.get(annotationBid(a));
    if (qid && perQ[qid]) perQ[qid].got += m; else unsorted += m;
  });
  let total = unsorted;
  Object.entries(perQ).forEach(([qid, t]) => {
    if (overrides && overrides[qid] != null && overrides[qid] !== '') t.override = Number(overrides[qid]);
    total += t.override != null ? t.override : t.got;
  });
  return { perQ, unsorted, total };
}

/* ── Rubrics (spec §4) ─────────────────────────────────────── */
export function criterionLevels(def, c) { return (c.levels && c.levels.length ? c.levels : def.levels) || []; }
export function levelRange(l) {
  if (l.min != null && l.max != null) return { min: Number(l.min), max: Number(l.max) };
  return { min: Number(l.points), max: Number(l.points) };
}
export function criterionMax(def, c) {
  if (c.max != null) return Number(c.max);
  const ls = criterionLevels(def, c); return ls.reduce((m, l) => Math.max(m, levelRange(l).max), 0);
}
/** scores: { criterion_id: { level_id, mark } } → { got, max, complete } */
export function rubricScore(def, scores) {
  if (!def) return { got: 0, max: 0, complete: false };
  let got = 0, max = 0, done = 0, wsum = 0, wgot = 0;
  def.criteria.forEach(c => {
    const cmax = criterionMax(def, c), s = scores[c.id], w = Number(c.weight) || 1;
    max += cmax; wsum += w;
    if (s && s.mark != null && s.mark !== '') { got += Number(s.mark); done++; wgot += w * (Number(s.mark) / (cmax || 1)); }
  });
  if (def.weighted && def.total) return { got: wsum ? wgot / wsum * def.total : 0, max: Number(def.total), complete: done === def.criteria.length };
  return { got, max, complete: done === def.criteria.length };
}

/* ── Annotation shapes (inline SVG, no external icons) ─────── */
export const SHAPES = {
  tick: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13.5l5 5L20 6" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  cross: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  comment: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>'
};
export function annLabel(a, quoteText) {
  const what = a.type === 'tick' ? 'Tick' : a.type === 'cross' ? 'Cross' : a.type === 'stamp' ? 'Stamp ' + (a.stamp || '') : 'Comment';
  const m = a.marks ? ', ' + fmtNum(a.marks) + (Number(a.marks) === 1 ? ' mark' : ' marks') : '';
  const body = a.body ? ': ' + a.body : '';
  return what + m + body + (quoteText ? ' on "' + quoteText + '"' : '');
}

/* ── Overlay: draws point marks over a TipTap view, re-placed on any reflow ── */
export class Overlay {
  /** host: positioned wrapper containing the editor element; opts: { onSelect(ann, el), interactive } */
  constructor(editor, host, opts = {}) {
    this.editor = editor; this.host = host; this.opts = opts; this.anns = []; this.selected = null; this.extra = [];
    this.layer = el('div', { class: 'gg-layer', 'data-ml-no-theme': '' });
    host.appendChild(this.layer);
    this.ro = new ResizeObserver(() => this.place());
    this.ro.observe(host);
    host.addEventListener('load', () => this.place(), true);   // images finishing load change heights
    window.addEventListener('resize', () => this.place());
  }
  set(anns, extra) { this.anns = anns; if (extra) this.extra = extra; this.render(); }
  render() {
    const state = this.editor ? this.editor.state : null;
    this.layer.textContent = '';
    // range highlights go through decorations
    if (this.editor) {
      const ranges = [];
      this.anns.filter(a => a.anchor.kind === 'range').forEach(a => {
        const r = rangeToPositions(state, a.anchor); if (r) ranges.push({ ...r, id: a.id, active: this.selected === a.id });
      });
      this.editor.view.dispatch(this.editor.state.tr.setMeta(highlightKey, ranges).setMeta('addToHistory', false));
    }
    this.anns.forEach(a => {
      const shape = a.type === 'tick' ? SHAPES.tick : a.type === 'cross' ? SHAPES.cross : (a.type === 'stamp' || a.type === 'qstart') ? '' : SHAPES.comment;
      const quote = a.anchor.kind === 'range' ? (a.anchor.quote && a.anchor.quote.exact || '').slice(0, 60) : '';
      const b = el(this.opts.interactive ? 'button' : 'span', {
        class: 'gg-ann gg-ann--' + a.type + (a.anchor.lane === 'margin' ? ' is-margin' : '') + (this.selected === a.id ? ' is-selected' : ''),
        type: this.opts.interactive ? 'button' : null, 'data-id': a.id,
        'aria-label': annLabel(a, quote), title: a.body || null, tabindex: this.opts.interactive ? '0' : null
      });
      b.innerHTML = shape;
      if (a.type === 'stamp') b.appendChild(el('span', { class: 'gg-stamp-text', text: a.stamp || 'Stamp' }));
      if (a.type === 'qstart') b.appendChild(el('span', { class: 'gg-qstart-text', text: 'Q' + (a.body || '') + (this.opts.qLabel ? '  ' + this.opts.qLabel(a) : '') }));
      if (a.marks != null && Number(a.marks) !== 0 && a.type !== 'cross') b.appendChild(el('span', { class: 'gg-ann-marks', text: fmtNum(a.marks) }));
      if (a.type === 'comment' && a.body) b.appendChild(el('span', { class: 'gg-ann-note', text: a.body }));
      if (this.opts.interactive) {
        b.addEventListener('click', e => { e.stopPropagation(); this.opts.onSelect && this.opts.onSelect(a, b); });
        b.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); this.opts.onContext && this.opts.onContext(a, e); });
      }
      this.layer.appendChild(b);
    });
    this.extra.forEach(x => this.layer.appendChild(x.el));
    this.place();
  }
  /** Pixel position for an anchor, relative to the host. */
  coords(anchor) {
    const hr = this.host.getBoundingClientRect();
    if (anchor.kind === 'page') {
      const pg = this.host.querySelector('.gg-page[data-page="' + anchor.page + '"]'); if (!pg) return null;
      const r = pg.getBoundingClientRect();
      return { x: r.left - hr.left + r.width * anchor.fx, y: r.top - hr.top + r.height * anchor.fy, h: 0 };
    }
    if (!this.editor) return null;
    const view = this.editor.view, { state } = this.editor;
    try {
      if (anchor.kind === 'box') {
        const hit = findBlock(state, anchor.bid); if (!hit) return null;
        const dom = view.nodeDOM(hit.pos); if (!dom || !dom.getBoundingClientRect) return null;
        const r = dom.getBoundingClientRect();
        return { x: r.left - hr.left + r.width * anchor.fx, y: r.top - hr.top + r.height * anchor.fy, h: 0 };
      }
      const pos = anchor.kind === 'range' ? (rangeToPositions(state, anchor) || {}).to : posFromAnchor(state, anchor);
      if (pos == null) return null;
      const c = view.coordsAtPos(pos);
      return { x: c.left - hr.left, y: c.top - hr.top, h: c.bottom - c.top };
    } catch (e) { return null; }
  }
  place() {
    const marginX = this.host.clientWidth - 30, used = new Map();
    [...this.layer.querySelectorAll('.gg-ann')].forEach(node => {
      const a = this.anns.find(x => x.id === node.dataset.id); if (!a) return;
      const c = this.coords(a.anchor);
      if (!c) { node.hidden = true; node.classList.add('is-unplaced'); return; }
      node.hidden = false;
      // In-text marks sit just above the word they belong to, so the learner's words stay readable.
      let x = c.x, y = c.h ? c.y - 4 : c.y;
      if (a.anchor.lane === 'margin' || a.anchor.kind === 'range' || (a.type === 'comment' && a.anchor.kind !== 'page')) {
        y = c.y + (c.h ? c.h / 2 : 0);
        const key = Math.round(y / 8); const n = used.get(key) || 0; used.set(key, n + 1);
        x = marginX - n * 26;
      }
      node.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
    });
    this.extra.forEach(x => { const c = x.place(this); if (c) x.el.style.transform = `translate(${Math.round(c.x)}px, ${Math.round(c.y)}px)`; x.el.hidden = !c; });
  }
  unplaced() { return this.anns.filter(a => !this.coords(a.anchor)); }
  destroy() { this.ro.disconnect(); this.layer.remove(); }
}

/** Question totals drawn in the margin after each question's last block, as on paper. */
export function questionBadges(editor, questions, totals, qmap) {
  const lastBid = {};
  editor.state.doc.forEach(top => { const q = qmap.get(top.attrs && top.attrs.bid); if (q) lastBid[q] = top.attrs.bid; });
  return questions.filter(q => lastBid[q.id]).map(q => {
    const r = totals.perQ[q.id], got = r.override != null ? r.override : r.got;
    const node = el('span', { class: 'gg-qtotal' + (got > r.max ? ' is-over' : ''), role: 'note',
      'aria-label': 'Question ' + q.number + ': ' + fmtNum(got) + ' out of ' + fmtNum(r.max), text: fmtNum(got) + '/' + fmtNum(r.max) });
    return { el: node, place: ov => { const c = ov.coords({ kind: 'point', bid: lastBid[q.id], offset: 1e6 }); return c ? { x: ov.host.clientWidth - 22, y: c.y + c.h + 14 } : null; } };
  });
}

/* ── Assignment loading (both pages) ───────────────────────── */
export async function loadAssignment(id) {
  const { data, error } = await sb().from('assignments').select('*').eq('id', id).single();
  if (error) throw error;
  const { data: qs } = await sb().from('assignment_questions').select('*').eq('assignment_id', id).order('position');
  let rubric = null;
  if (data.rubric_version_id) {
    const { data: rv } = await sb().from('rubric_versions').select('id, definition, max_score').eq('id', data.rubric_version_id).single();
    rubric = rv || null;
  }
  return { a: data, questions: qs || [], rubric };
}
