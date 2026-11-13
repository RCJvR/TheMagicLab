/* Exam covers — Word and PDF output from the school's own templates.
 *
 *   ExamCoversOutput.load()            loads cover-all.docx and cover-accommodations.docx (once)
 *   ExamCoversOutput.docx(covers)      -> Promise<Blob>   one page per cover, filled in
 *   ExamCoversOutput.pdf(covers)       -> Promise<jsPDF>  same layout, drawn
 *
 * A cover is { kind: 'class' | 'acc', code, f: { venue, date, subject, grade, time, examiner,
 * teachers, afr, eng, learner, additional: [lines], acc: [lines] } }.
 * Needs JSZip (and jsPDF + its fonts for pdf()). */
(function (global) {
  'use strict';
  var W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
  var R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
  var WP = 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing';
  var W14 = 'http://schemas.microsoft.com/office/word/2010/wordml';
  // Page order of cover-all.docx (one page per subject; each page shows that subject's icon).
  var PAGE_CODES = ['ACC01', 'AFR01', 'AFR03', 'BUS01', 'CAT01', 'CON01', 'DAN01', 'DAR01', 'EGD01', 'LIF01', 'ENG01', 'ENG03',
    'GEO01', 'HIS01', 'INT01', 'LSC01', 'MAT01', 'MLT01', 'MUS01', 'PSC01', 'VAR01', 'CORO', 'ECO01', 'TOU01', 'SOT01', 'XHO01', 'ZUL01'];
  var BASE = '/assets/exam-covers/';
  var T = null;    // loaded templates

  function kids(el, name) { var out = []; for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 1 && n.localName === name && n.namespaceURI === W) out.push(n); return out; }
  function all(el, ns, name) { return Array.prototype.slice.call(el.getElementsByTagNameNS(ns, name)); }
  function text(el) { return all(el, W, 't').map(function (t) { return t.textContent; }).join(''); }
  function key(s) { return String(s).replace(/\s+/g, ' ').replace(/\s*:\s*$/, ':').trim().toLowerCase(); }

  function parse(xml) { return new DOMParser().parseFromString(xml, 'application/xml'); }

  function load() {
    if (T) return Promise.resolve(T);
    function get(name) { return fetch(BASE + name).then(function (r) { if (!r.ok) throw new Error('Template missing: ' + name); return r.arrayBuffer(); }); }
    return Promise.all([get('cover-all.docx'), get('cover-accommodations.docx')]).then(function (bufs) {
      return Promise.all([JSZip.loadAsync(bufs[0]), JSZip.loadAsync(bufs[1])]).then(function (z) {
        return Promise.all([z[0].file('word/document.xml').async('string'), z[0].file('word/_rels/document.xml.rels').async('string'),
                            z[1].file('word/document.xml').async('string'), z[1].file('word/_rels/document.xml.rels').async('string')])
          .then(function (x) {
            var allDoc = parse(x[0]), allRels = parse(x[1]), accDoc = parse(x[2]), accRels = parse(x[3]);
            var body = all(allDoc, W, 'body')[0];
            var tables = kids(body, 'tbl');
            var spacer = kids(body, 'p')[0];
            var rel = {}; all(allRels, 'http://schemas.openxmlformats.org/package/2006/relationships', 'Relationship').forEach(function (r) { rel[r.getAttribute('Id')] = r.getAttribute('Target'); });
            var arel = {}; all(accRels, 'http://schemas.openxmlformats.org/package/2006/relationships', 'Relationship').forEach(function (r) { arel[r.getAttribute('Id')] = r.getAttribute('Target'); });
            var logoRel = Object.keys(rel).find(function (k) { return /image2\.jpe?g$/.test(rel[k]); });
            // images per page: [icon, logo]
            var pageImages = tables.map(function (t) { return all(t, 'http://schemas.openxmlformats.org/drawingml/2006/main', 'blip').map(function (b) { return rel[b.getAttributeNS(R, 'embed')]; }); });
            T = { bufAll: bufs[0], allZip: z[0], accZip: z[1], allDoc: allDoc, accDoc: accDoc, body: body, tables: tables, spacer: spacer,
                  accTable: kids(all(accDoc, W, 'body')[0], 'tbl')[0], logoRel: logoRel, pageImages: pageImages, images: {} };
            return T;
          });
      });
    });
  }

  function tableFor(code) {
    var i = PAGE_CODES.indexOf(code);
    var t = (i > -1 ? T.tables[i] : T.tables[0]).cloneNode(true);
    if (i < 0) {   // no page for this subject (e.g. French): use a page without a subject icon
      var first = kids(kids(t, 'tr')[0], 'tc')[0];
      all(first, W, 'drawing').forEach(function (d) { var r = d.parentNode; r.parentNode.removeChild(r); });
    }
    return t;
  }

  function runProps(p, bold) {
    var doc = p.ownerDocument, rPr = doc.createElementNS(W, 'w:rPr');
    function el(n, attrs) { var e = doc.createElementNS(W, 'w:' + n); Object.keys(attrs || {}).forEach(function (a) { e.setAttributeNS(W, 'w:' + a, attrs[a]); }); rPr.appendChild(e); }
    el('rFonts', { ascii: 'Arial', hAnsi: 'Arial', cs: 'Arial' });
    if (bold) { el('b'); }
    el('sz', { val: bold ? '32' : '28' }); el('szCs', { val: bold ? '32' : '28' });
    if (bold) el('u', { val: 'single' });
    return rPr;
  }
  function setText(tc, value, bold) {
    var p = kids(tc, 'p')[0], doc = tc.ownerDocument;
    kids(p, 'r').forEach(function (r) { p.removeChild(r); });
    var lines = String(value == null ? '' : value).split('\n');
    var r = doc.createElementNS(W, 'w:r'); r.appendChild(runProps(p, bold));
    lines.forEach(function (line, i) {
      if (i) r.appendChild(doc.createElementNS(W, 'w:br'));
      var t = doc.createElementNS(W, 'w:t'); t.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve'); t.textContent = line; r.appendChild(t);
    });
    p.appendChild(r);
  }

  // Fill one cover table: label rows ("Date:") get their value cell; blocks
  // ("Additional information:", "Learner accommodations:") get the empty rows below.
  function fill(tbl, f, kind) {
    var rows = kids(tbl, 'tr');
    var single = {
      'exam venue:': f.venue, 'date:': f.date, 'subject:': f.subject, 'grade:': f.grade, 'time:': f.time,
      'examiner:': f.examiner, 'teacher(s):': f.teachers, 'teacher:': f.teachers,
      'number of afrikaans papers:': f.afr, 'number of english papers:': f.eng
    };
    var learnerDone = kind !== 'acc';
    for (var i = 0; i < rows.length; i++) {
      var cells = kids(rows[i], 'tc'); if (!cells.length) continue;
      var label = key(text(cells[0]));
      if (Object.prototype.hasOwnProperty.call(single, label) && cells[1]) { setText(cells[1], single[label] || ''); continue; }
      if (!learnerDone && label === '' && cells.length === 2 && i > 3) {   // first blank pair on the accommodation cover
        setText(cells[0], 'Learner:', true); setText(cells[1], f.learner || ''); learnerDone = true; continue;
      }
      var block = null;
      if (label === 'additional information:') block = f.additional || [];
      else if (label === 'learner accommodations:' || label === 'types of accommodations received:') block = f.acc || [];
      if (!block) continue;
      var lines = block.slice();
      if (cells.length === 2 && cells[1]) setText(cells[1], lines.shift() || '');   // "Additional information:" has a value cell too
      // the empty full-width rows below are the block's lines
      var slots = [];
      for (var j = i + 1; j < rows.length; j++) {
        var c = kids(rows[j], 'tc');
        if (c.length !== 1 || key(text(c[0])) !== '') break;
        slots.push(rows[j]);
      }
      if (!slots.length) continue;
      while (slots.length < lines.length) {   // more lines than the template has: add rows
        var extra = slots[slots.length - 1].cloneNode(true);
        slots[slots.length - 1].parentNode.insertBefore(extra, slots[slots.length - 1].nextSibling);
        slots.push(extra);
      }
      slots.forEach(function (row, k) { setText(kids(row, 'tc')[0], lines[k] || ''); });
      i += slots.length;
    }
  }

  function docx(covers) {
    return load().then(function () {
      return JSZip.loadAsync(T.bufAll).then(function (out) {
        var doc = T.allDoc.cloneNode(true);
        var body = all(doc, W, 'body')[0];
        var sectPr = kids(body, 'sectPr')[0];
        Array.prototype.slice.call(body.childNodes).forEach(function (n) { if (n !== sectPr) body.removeChild(n); });
        covers.forEach(function (c) {
          var tbl;
          if (c.kind === 'acc') {
            tbl = doc.importNode(T.accTable, true);
            all(tbl, 'http://schemas.openxmlformats.org/drawingml/2006/main', 'blip').forEach(function (b) { b.setAttributeNS(R, 'r:embed', T.logoRel); });
          } else {
            tbl = doc.importNode(tableFor(c.code), true);
          }
          fill(tbl, c.f, c.kind);
          body.insertBefore(tbl, sectPr);
          body.insertBefore(doc.importNode(T.spacer, true), sectPr);
        });
        // every drawing needs its own id, and repeated paragraph ids confuse Word
        var id = 1;
        all(doc, WP, 'docPr').forEach(function (d) { d.setAttribute('id', String(id++)); });
        all(body, '*', '*').forEach(function (e) { if (e.hasAttributeNS(W14, 'paraId')) { e.removeAttributeNS(W14, 'paraId'); e.removeAttributeNS(W14, 'textId'); } });
        var xml = new XMLSerializer().serializeToString(doc);
        if (xml.indexOf('<?xml') !== 0) xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n' + xml;
        out.file('word/document.xml', xml);
        return out.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', compression: 'DEFLATE' });
      });
    });
  }

  // ── PDF ─────────────────────────────────────────────────────────────────
  function image(path) {
    if (T.images[path]) return Promise.resolve(T.images[path]);
    var f = T.allZip.file('word/' + path);
    if (!f) return Promise.resolve(null);
    return f.async('base64').then(function (b64) {
      var type = /\.png$/i.test(path) ? 'PNG' : 'JPEG';
      var src = 'data:image/' + type.toLowerCase() + ';base64,' + b64;
      // scale down to print size (the template's images are much larger than they are printed)
      return new Promise(function (res) {
        var img = new Image();
        img.onload = function () {
          // the PDF stores transparent PNGs uncompressed (~1 MB per icon): flatten onto the
          // white page and store as JPEG, at print size
          var max = 700, s = Math.min(1, max / Math.max(img.width, img.height));
          var c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
          var g = c.getContext('2d');
          g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
          g.drawImage(img, 0, 0, c.width, c.height);
          res({ data: c.toDataURL('image/jpeg', 0.9), type: 'JPEG' });
        };
        img.onerror = function () { res({ data: src, type: type }); };
        img.src = src;
      }).then(function (im) { im.alias = path; return (T.images[path] = im); });
    });
  }
  function pdfText(s) {
    return String(s == null ? '' : s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-')
      .replace(/…/g, '...').replace(/[^\x00-\xFF]/g, '?');
  }

  function pdf(covers) {
    return load().then(function () {
      var need = [];
      covers.forEach(function (c) { var i = PAGE_CODES.indexOf(c.code); if (c.kind === 'class' && i > -1) need.push(T.pageImages[i][0]); });
      need.push(T.pageImages[0][1]);   // the school logo
      return Promise.all(need.filter(function (v, i, a) { return v && a.indexOf(v) === i; }).map(image)).then(function () {
        var doc = new global.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        var logo = T.images[T.pageImages[0][1]];
        covers.forEach(function (c, n) {
          if (n) doc.addPage();
          drawCover(doc, c, logo);
        });
        return doc;
      });
    });
  }

  // Template geometry (twips/EMU converted to mm): margins 12.7, label column 89.5, value column 91.2,
  // rows 8 mm (454 twips), title row 12 mm, page border 8.5 mm from the edge.
  function drawCover(doc, c, logo) {
    var L = 12.7, MID = L + 89.5, Rt = L + 89.5 + 91.2, y = 12.7, ROW = 8, f = c.f;
    doc.setDrawColor(0); doc.setLineWidth(0.8); doc.rect(8.5, 8.5, 210 - 17, 297 - 17);
    var i = PAGE_CODES.indexOf(c.code), icon = c.kind === 'class' && i > -1 ? T.images[T.pageImages[i][0]] : null;
    if (icon) doc.addImage(icon.data, icon.type, L + 2, y, 41.4, 49.1, icon.alias);   // alias: stored once, reused on every page
    if (logo) doc.addImage(logo.data, logo.type, Rt - 70.4, y + 4, 70.4, 40, logo.alias);
    y += 51;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(18); doc.setTextColor(13);
    doc.text(c.kind === 'acc' ? 'ACCOMMODATION: FRONT COVER' : 'EXAMINATION FRONT COVER', 105, y + 7.5, { align: 'center' });
    y += 12;
    function label(t, yy) { doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.text(t, L, yy); var w = doc.getTextWidth(t); doc.setLineWidth(0.3); doc.line(L, yy + 0.8, L + w, yy + 0.8); }
    function value(t, x0, x1, yy) {
      doc.setFont('helvetica', 'normal'); var size = 13; doc.setFontSize(size); t = pdfText(t);
      while (size > 8 && doc.getTextWidth(t) > x1 - x0 - 2) { size -= 0.5; doc.setFontSize(size); }
      doc.text(t, x0 + 1, yy);
    }
    function line(x0, x1, yy) { doc.setLineWidth(0.25); doc.line(x0, yy + 2, x1, yy + 2); }
    function row(lbl, val) { var yy = y + 5.5; label(lbl, yy); value(val, MID, Rt, yy); line(MID, Rt, yy); y += ROW; }
    function full(val) { var yy = y + 5.5; value(val, L, Rt, yy); line(L, Rt, yy); y += ROW; }
    function heading(t) { label(t, y + 5.5); y += ROW; }
    row('Exam venue:', f.venue); row('Date:', f.date); row('Subject:', f.subject); row('Grade:', f.grade); row('Time:', f.time);
    row('Examiner:', f.examiner); row(c.kind === 'acc' ? 'Teacher:' : 'Teacher(s):', f.teachers);
    if (c.kind === 'acc') { row('Learner:', f.learner); y += ROW; }
    else { row('Number of Afrikaans papers:', f.afr); row('Number of English papers:', f.eng); y += ROW; }
    var add = (f.additional || []).slice();
    row('Additional information:', add.shift() || '');
    var nAdd = c.kind === 'acc' ? 3 : 3; while (add.length > nAdd) nAdd++;
    for (var k = 0; k < nAdd; k++) full(add[k] || '');
    heading(c.kind === 'acc' ? 'Types of accommodations received:' : 'Learner accommodations:');
    var acc = f.acc || [], nAcc = Math.max(c.kind === 'acc' ? 3 : 4, acc.length);
    for (k = 0; k < nAcc; k++) full(acc[k] || '');
    if (c.kind !== 'acc') { row('Absent:', ''); full(''); full(''); full(''); }
    row('Invigilator:', ''); row("Invigilator's signature:", '');
  }

  global.ExamCoversOutput = { load: load, docx: docx, pdf: pdf, PAGE_CODES: PAGE_CODES };
})(window);
