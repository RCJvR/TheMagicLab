/* Grading Grimoire — PDF and photo hand-ins (ES module).
   pdf.js (already vendored) draws pages; pdf-lib (vendored, MIT) joins phone photos into one
   PDF and writes the "marked PDF" download. Both load only when a page needs them.
   PDFs are drawn by pdf.js with scripting off; they are never opened in the browser's viewer. */
import { prepareImage, fmtNum, capsLevel } from './grimoire-core.js?v=202611121502';

const PDFJS = '/assets/vendor/pdfjs-3.11.174/pdf.min.js';
const PDFJS_WORKER = '/assets/vendor/pdfjs-3.11.174/pdf.worker.min.js';
const PDFLIB = '/assets/vendor/pdf-lib-1.17.1/pdf-lib.min.js';
export const MAX_PDF_BYTES = 15 * 1024 * 1024;
export const MAX_PAGES = 60;

const loaded = {};
function loadScript(src) {
  if (!loaded[src]) loaded[src] = new Promise((res, rej) => {
    const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s);
  });
  return loaded[src];
}
export async function pdfjs() {
  await loadScript(PDFJS);
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  return window.pdfjsLib;
}
async function pdflib() { await loadScript(PDFLIB); return window.PDFLib; }

/** Open PDF bytes safely; returns the pdf.js document. */
export async function openPdf(bytes) {
  const lib = await pdfjs();
  return lib.getDocument({ data: bytes, isEvalSupported: false, enableXfa: false, disableAutoFetch: true, disableFontFace: false }).promise;
}
export async function pageCount(bytes) { const d = await openPdf(bytes.slice(0)); const n = d.numPages; d.destroy(); return n; }

/** Draw every page into host as .gg-page > canvas. Marks are positioned on these elements. */
export async function renderPdf(host, bytes) {
  const doc = await openPdf(bytes);
  host.textContent = '';
  const width = Math.max(320, host.clientWidth - 8), dpr = Math.min(window.devicePixelRatio || 1, 2);
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const v1 = page.getViewport({ scale: 1 }), scale = width / v1.width, vp = page.getViewport({ scale: scale * dpr });
    const wrap = document.createElement('div');
    wrap.className = 'gg-page'; wrap.dataset.page = String(i);
    wrap.setAttribute('role', 'img'); wrap.setAttribute('aria-label', 'Page ' + i + ' of ' + doc.numPages);
    const c = document.createElement('canvas'); c.width = Math.round(vp.width); c.height = Math.round(vp.height);
    wrap.style.aspectRatio = v1.width + ' / ' + v1.height;
    wrap.appendChild(c); host.appendChild(wrap);
    await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
  }
  const n = doc.numPages; doc.destroy();
  return n;
}

/** Phone photos → one PDF (A4 pages, each photo fitted, EXIF dropped by re-encoding). */
export async function photosToPdf(files, onProgress) {
  const { PDFDocument } = await pdflib();
  const pdf = await PDFDocument.create();
  let i = 0;
  for (const f of files) {
    const img = await prepareImage(f, { type: 'image/jpeg' });
    const jpg = await pdf.embedJpg(await img.blob.arrayBuffer());
    const W = 595.28, H = 841.89, m = 18;                      // A4 in points
    const s = Math.min((W - 2 * m) / jpg.width, (H - 2 * m) / jpg.height);
    const page = pdf.addPage([W, H]);
    page.drawImage(jpg, { x: (W - jpg.width * s) / 2, y: (H - jpg.height * s) / 2, width: jpg.width * s, height: jpg.height * s });
    onProgress && onProgress(++i, files.length);
  }
  return new Uint8Array(await pdf.save());
}

/* ── Marked PDF: the learner's file with the marking drawn on it ── */
const winAnsi = t => String(t || '').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').replace(/[^\x20-\x7e\xa0-\xff]/g, '?');
function wrap(text, n) {
  const out = []; let line = '';
  winAnsi(text).split(/\s+/).forEach(w => { if ((line + ' ' + w).trim().length > n) { if (line) out.push(line); line = w; } else line = (line + ' ' + w).trim(); });
  if (line) out.push(line); return out;
}
/**
 * bytes: the handed-in PDF. anns: annotations with page anchors. info: { title, learner, score, max,
 * perQ: [{ number, got, max }], comment, rubric: [{ name, got, max, level }] }
 */
export async function markedPdf(bytes, anns, info) {
  const { PDFDocument, StandardFonts, rgb } = await pdflib();
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const font = await pdf.embedFont(StandardFonts.Helvetica), bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const red = rgb(0.75, 0.1, 0.1), pages = pdf.getPages();
  anns.forEach(a => {
    if (!a.anchor || a.anchor.kind !== 'page') return;
    const page = pages[a.anchor.page - 1]; if (!page) return;
    const { width, height } = page.getSize(), x = a.anchor.fx * width, y = height - a.anchor.fy * height, u = Math.max(width, height) / 70;
    const line = (x1, y1, x2, y2) => page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness: u / 4, color: red });
    if (a.type === 'tick') { line(x - u * 0.6, y, x - u * 0.15, y - u * 0.5); line(x - u * 0.15, y - u * 0.5, x + u * 0.7, y + u * 0.6); }
    if (a.type === 'cross') { line(x - u / 2, y - u / 2, x + u / 2, y + u / 2); line(x - u / 2, y + u / 2, x + u / 2, y - u / 2); }
    if ((a.type === 'tick' || a.type === 'comment') && a.marks) page.drawText(fmtNum(a.marks), { x: x + u * 0.8, y: y + u * 0.3, size: u * 0.8, font: bold, color: red });
    if (a.type === 'stamp') {
      const t = winAnsi((a.stamp || 'Stamp').toUpperCase()), w = bold.widthOfTextAtSize(t, u * 0.8);
      page.drawRectangle({ x: x - 4, y: y - u * 0.5, width: w + 8, height: u * 1.2, borderColor: red, borderWidth: u / 6 });
      page.drawText(t, { x, y: y - u * 0.15, size: u * 0.8, font: bold, color: red });
    }
    if (a.type === 'comment') {
      page.drawText('*', { x: x - u * 0.3, y: y - u * 0.3, size: u * 1.4, font: bold, color: red });
      wrap(a.body, 38).slice(0, 8).forEach((l, i) => page.drawText(l, { x: Math.min(x + u, width - 200), y: y - u * 0.4 - i * u * 0.9, size: u * 0.7, font, color: red }));
    }
    if (a.type === 'qstart') {
      const q = (info.perQ || []).find(r => r.number === a.body);
      page.drawText('Q' + winAnsi(a.body) + (q ? '   ' + fmtNum(q.got) + '/' + fmtNum(q.max) : ''), { x: Math.max(4, x), y: y + u * 0.2, size: u * 0.9, font: bold, color: red });
    }
  });
  // A results page at the end
  const p = pdf.addPage([595.28, 841.89]); let y = 790;
  const say = (t, size = 11, f = font) => { wrap(t, size > 12 ? 60 : 90).forEach(l => { p.drawText(l, { x: 48, y, size, font: f, color: rgb(0.1, 0.1, 0.1) }); y -= size * 1.5; }); };
  say(info.title || 'Marked work', 18, bold); y -= 4;
  say((info.learner ? info.learner + ' - ' : '') + (info.score != null ? 'Mark: ' + fmtNum(info.score) + ' / ' + fmtNum(info.max) + ' (' + Math.round(info.score / info.max * 100) + '%, level ' + capsLevel(info.score / info.max * 100) + ')' : 'Not marked'), 13, bold);
  y -= 6;
  (info.perQ || []).forEach(q => say('Question ' + q.number + ':  ' + fmtNum(q.got) + ' / ' + fmtNum(q.max)));
  if (info.rubric && info.rubric.length) { y -= 6; say('Rubric', 12, bold); info.rubric.forEach(r => say(r.name + ':  ' + fmtNum(r.got) + ' / ' + fmtNum(r.max) + (r.level ? '  (' + r.level + ')' : ''))); }
  if (info.comment) { y -= 6; say('Comment from your teacher', 12, bold); say(info.comment); }
  const notes = anns.filter(a => a.body && a.type === 'comment');
  if (notes.length) { y -= 6; say('Comments on the work', 12, bold); notes.forEach(a => say('Page ' + a.anchor.page + ': ' + a.body)); }
  return new Uint8Array(await pdf.save());
}

export function download(bytes, name, type = 'application/pdf') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([bytes], { type })); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
}
