/* Exam covers — importer.
 *
 * Reads the school's own exports in the browser (nothing is uploaded until the
 * admin confirms), and turns them into what the cover tool needs:
 *
 *   readXlsx(arrayBuffer)            -> { sheetName: [[cell, ...], ...] }
 *   parseGuardian(rows)              -> [{ first, last, grade, cls }]       "Learner Class List"
 *   parseKeys(rows)                  -> [{ grade, subject, code, key, kclass, staff, members:[{sno, first, last, cls}] }]
 *                                                                            "Learners Per Key"
 *   buildRoster(guardian, groups)    -> [{ sno, first, last, grade, cls }]   (student numbers from the key list)
 *   parseTimetable(pdfDoc)           -> sessions (see resolveSessions)       "Exam invigilation" PDF
 *   matchRegister(regLearners, roster) -> [{ id, sno|null, how, candidates }]
 *
 * Depends on JSZip (xlsx) and pdf.js (timetable), loaded by the page. */
(function (global) {
  'use strict';

  // ── Subject names (key list) ↔ timetable/template codes ─────────────────
  var SUBJECT_CODES = {
    'Accounting': 'ACC01', 'Afrikaans Home Language': 'AFR01', 'Afrikaans First Additional Language': 'AFR03',
    'Business Studies': 'BUS01', 'Computer Applications Technology': 'CAT01', 'Consumer Studies': 'CON01',
    'Dance Studies': 'DAN01', 'Dramatic Arts': 'DAR01', 'Engineering Graphics and Design': 'EGD01',
    'Life Orientation': 'LIF01', 'English Home Language': 'ENG01', 'English First Additional Language': 'ENG03',
    'Geography': 'GEO01', 'History': 'HIS01', 'Information Technology': 'INT01', 'Life Sciences': 'LSC01',
    'Mathematics': 'MAT01', 'Mathematical Literacy': 'MLT01', 'Music': 'MUS01', 'Physical Sciences': 'PSC01',
    'Visual Arts': 'VAR01', 'Coding and Robotics': 'CORO', 'Economics': 'ECO01', 'Tourism': 'TOU01',
    'isiXhosa First Additional Language': 'XHO01', 'isiZulu First Additional Language': 'ZUL01',
    'Sesotho First Additional Language': 'SOT01', 'French Second Additional Language': 'FRE',
    'Further Studies English': 'FSE'
  };
  // Grades 8–9 write some subjects under other codes (one paper of a combined subject).
  var JUNIOR_ALIASES = {
    'Natural Sciences': ['LSC01', 'PSC01'], 'Social Sciences': ['HIS01', 'GEO01'],
    'Economic and Management Sciences': ['BUS01', 'ACC01', 'ECO01']
  };
  var CODE_NAMES = { DES01: 'Design', FRE01: 'French', FRE02: 'French' };
  Object.keys(SUBJECT_CODES).forEach(function (n) { if (!CODE_NAMES[SUBJECT_CODES[n]]) CODE_NAMES[SUBJECT_CODES[n]] = n; });

  function codesForSubject(name, grade) {
    var g = +grade, out = [];
    if (SUBJECT_CODES[name]) out.push(SUBJECT_CODES[name]);
    if (g <= 9 && JUNIOR_ALIASES[name]) out = out.concat(JUNIOR_ALIASES[name]);
    if (SUBJECT_CODES[name] === 'FRE') out = ['FRE01', 'FRE02'];
    return out;
  }
  function subjectName(code, grade) {
    if (+grade <= 9) for (var n in JUNIOR_ALIASES) if (JUNIOR_ALIASES[n].indexOf(code) > -1) return n;
    return CODE_NAMES[code] || code;
  }

  // ── Small helpers ───────────────────────────────────────────────────────
  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function medium(cls) { return /^\d+A/.test(cls) ? 'A' : 'E'; }   // A classes are Afrikaans medium

  // ── XLSX (via JSZip) ────────────────────────────────────────────────────
  function readXlsx(buf) {
    return JSZip.loadAsync(buf).then(function (z) {
      function text(path) { var f = z.file(path); return f ? f.async('string') : Promise.resolve(null); }
      return Promise.all([text('xl/sharedStrings.xml'), text('xl/workbook.xml'), text('xl/_rels/workbook.xml.rels')]).then(function (r) {
        var P = new DOMParser(), shared = [];
        if (r[0]) Array.prototype.forEach.call(P.parseFromString(r[0], 'application/xml').getElementsByTagName('si'), function (si) {
          shared.push(Array.prototype.map.call(si.getElementsByTagName('t'), function (t) { return t.textContent; }).join(''));
        });
        var wb = P.parseFromString(r[1], 'application/xml'), rels = P.parseFromString(r[2], 'application/xml'), rmap = {};
        Array.prototype.forEach.call(rels.getElementsByTagName('Relationship'), function (x) { rmap[x.getAttribute('Id')] = x.getAttribute('Target'); });
        var sheets = Array.prototype.map.call(wb.getElementsByTagName('sheet'), function (s) {
          var t = rmap[s.getAttribute('r:id')] || rmap[s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id')];
          t = t.replace(/^\//, ''); if (t.indexOf('xl/') !== 0) t = 'xl/' + t;
          return { name: s.getAttribute('name'), path: t };
        });
        var out = {}, merges = {};
        Object.defineProperty(out, '$merges', { value: merges, enumerable: false });
        return Promise.all(sheets.map(function (s) {
          return text(s.path).then(function (x) {
            var doc = P.parseFromString(x, 'application/xml'), rows = [];
            merges[s.name] = Array.prototype.map.call(doc.getElementsByTagName('mergeCell'), function (mc) {
              return mc.getAttribute('ref').split(':').map(function (ref) {
                var mm = ref.match(/^([A-Z]+)(\d+)$/), col = 0;
                for (var i = 0; i < mm[1].length; i++) col = col * 26 + mm[1].charCodeAt(i) - 64;
                return { r: +mm[2] - 1, c: col - 1 };
              });
            });
            Array.prototype.forEach.call(doc.getElementsByTagName('row'), function (row) {
              var vals = [], rIdx = +row.getAttribute('r') - 1;
              while (rows.length < rIdx) rows.push([]);          // keep row numbers aligned with the sheet (for merges)
              if (row.getAttribute('hidden') === '1') { rows.push([]); return; }   // hidden rows are not part of the timetable
              Array.prototype.forEach.call(row.getElementsByTagName('c'), function (c) {
                var ref = c.getAttribute('r'), col = 0, m = ref.match(/^[A-Z]+/)[0];
                for (var i = 0; i < m.length; i++) col = col * 26 + m.charCodeAt(i) - 64;
                var t = c.getAttribute('t'), v = c.getElementsByTagName('v')[0], val;
                if (t === 'inlineStr') val = Array.prototype.map.call(c.getElementsByTagName('t'), function (n) { return n.textContent; }).join('');
                else if (!v) return;
                else if (t === 's') val = shared[+v.textContent];
                else val = v.textContent;
                vals[col - 1] = val;
              });
              for (var i = 0; i < vals.length; i++) if (vals[i] === undefined) vals[i] = '';
              rows.push(vals);
            });
            out[s.name] = rows;
          });
        })).then(function () { return out; });
      });
    });
  }
  function firstSheet(book) { return book[Object.keys(book)[0]]; }

  // "Learner Class List": Learner Name | Learner Surname | School | Grade | Register Class Name
  function parseGuardian(rows) {
    var head = rows.findIndex(function (r) { return r.some(function (c) { return /Register Class/i.test(c); }); });
    if (head < 0) throw new Error('This does not look like the learner class list (no "Register Class Name" column).');
    var H = rows[head].map(function (c) { return String(c).trim(); });
    var iF = H.findIndex(function (c) { return /^Learner Name$/i.test(c); }), iL = H.findIndex(function (c) { return /Surname/i.test(c); });
    var iG = H.findIndex(function (c) { return /^Grade$/i.test(c); }), iC = H.findIndex(function (c) { return /Register Class/i.test(c); });
    return rows.slice(head + 1).map(function (r) {
      var g = String(r[iG] || '').replace(/Grade\s*/i, '').trim(), c = String(r[iC] || '').trim();
      return { first: String(r[iF] || '').trim(), last: String(r[iL] || '').trim(), grade: g, cls: g + c };
    }).filter(function (p) { return p.first && p.grade && p.cls.length > p.grade.length; });
  }

  // "Learners Per Key": blocks of  Grade: | Subject: | KEY:  then  Key Class: | Staff Member:  then learners.
  function parseKeys(rows) {
    var groups = [], cur = null, g, s, k;
    rows.forEach(function (r) {
      var a = String(r[0] || '').trim();
      if (/^Grade:/i.test(a)) {
        g = a.split(':')[1].replace(/Grade/i, '').trim();
        s = String(r[2] || '').split(':').slice(1).join(':').trim();
        k = String(r[6] || '').split(':').slice(1).join(':').trim();
      } else if (/^Key Class:/i.test(a)) {
        cur = { grade: g, subject: s, key: k, kclass: a.split(':')[1].trim().replace(/Class\s*/i, 'c'),
                staff: String(r[4] || '').split(':').slice(1).join(':').trim(), members: [] };
        groups.push(cur);
      } else if (cur && a && a !== 'Student Number' && r[3]) {
        if (String(r[15] || '').trim() === 'Yes') return;           // dropped subject
        var reg = String(r[10] || '').trim();
        cur.members.push({ sno: a, first: String(r[3]).trim(), last: String(r[4] || '').trim(), cls: reg ? cur.grade + reg : '' });
      }
    });
    // The export repeats a key class under a second staff member for a learner or two;
    // keep each (grade, subject, key, class, staff) as its own group.
    groups.forEach(function (x) {
      x.codes = codesForSubject(x.subject, x.grade);
      x.id = [x.grade, x.key, x.kclass, x.subject, x.staff].join('|');
    });
    return groups.filter(function (x) { return x.members.length; });
  }

  // Learner list with student numbers: guardian list joined to key-list members.
  function buildRoster(guardian, groups) {
    var bySno = {};
    groups.forEach(function (gr) { gr.members.forEach(function (m) { if (!bySno[m.sno]) bySno[m.sno] = { sno: m.sno, first: m.first, last: m.last, grade: gr.grade, cls: m.cls }; }); });
    var index = {};
    Object.keys(bySno).forEach(function (s) { var p = bySno[s]; index[norm(p.first + ' ' + p.last) + '|' + p.cls] = p; });
    var roster = guardian.map(function (p) {
      var hit = index[norm(p.first + ' ' + p.last) + '|' + p.cls];
      return { sno: hit ? hit.sno : 'G-' + p.cls + '-' + norm(p.first + ' ' + p.last).replace(/ /g, '-'),
               first: p.first, last: p.last, grade: p.grade, cls: p.cls };
    });
    // learners on the key list but not on the guardian list (e.g. PM classes)
    var seen = {}; roster.forEach(function (p) { seen[p.sno] = 1; });
    Object.keys(bySno).forEach(function (s) { if (!seen[s] && bySno[s].cls) roster.push(bySno[s]); });
    return roster;
  }

  // ── Register learners ↔ roster ──────────────────────────────────────────
  // Register names are "First Last" as typed; class lists have full first names.
  function matchRegister(reg, roster) {
    return reg.map(function (l) {
      var full = norm(l.name), words = full.split(' ');
      var inGrade = roster.filter(function (p) { return p.grade === l.grade; });
      function lastMatches(p) { var L = norm(p.last); return full === L || full.slice(-L.length - 1) === ' ' + L; }
      function firstMatches(p) { var F = norm(p.first).split(' '); return F.indexOf(words[0]) > -1; }
      var c = inGrade.filter(function (p) { return lastMatches(p) && firstMatches(p) && p.cls === l.class_name; });
      if (c.length === 1) return { id: l.id, sno: c[0].sno, how: 'exact', person: c[0] };
      c = inGrade.filter(function (p) { return lastMatches(p) && p.cls === l.class_name; });
      if (c.length === 1) return { id: l.id, sno: c[0].sno, how: 'surname + class', person: c[0] };
      c = inGrade.filter(function (p) { return lastMatches(p) && firstMatches(p); });
      if (c.length === 1) return { id: l.id, sno: c[0].sno, how: 'name, other class', person: c[0] };
      // spelling differences: closest surname in the same class
      var last = words[words.length - 1];
      var close = inGrade.filter(function (p) { return p.cls === l.class_name; }).map(function (p) {
        return { p: p, d: lev(norm(p.last).split(' ').pop(), last) - (firstMatches(p) ? 2 : 0) };
      }).sort(function (a, b) { return a.d - b.d; });
      if (close.length && close[0].d <= 0) return { id: l.id, sno: close[0].p.sno, how: 'similar spelling', person: close[0].p };
      return { id: l.id, sno: null, how: 'not found', candidates: close.slice(0, 3).map(function (x) { return x.p; }) };
    });
  }
  function lev(a, b) {
    var m = [], i, j;
    for (i = 0; i <= a.length; i++) { m[i] = [i]; }
    for (j = 0; j <= b.length; j++) m[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++)
      m[i][j] = Math.min(m[i - 1][j] + 1, m[i][j - 1] + 1, m[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return m[a.length][b.length];
  }

  // ── Timetable PDF ───────────────────────────────────────────────────────
  var MONTHS = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };
  var CODE_RE = /\b([A-Z]{3}0\d|CORO)\b(?:\s*(P\s?\d|V\s?\d))?/g;

  function pdfPages(pdf) {
    var pages = [];
    var chain = Promise.resolve();
    for (var n = 1; n <= pdf.numPages; n++) (function (n) {
      chain = chain.then(function () { return pdf.getPage(n); }).then(function (pg) {
        var vp = pg.getViewport({ scale: 1 });
        return pg.getTextContent().then(function (tc) {
          pages.push(tc.items.filter(function (i) { return i.str.trim(); })
            .map(function (i) { return { s: i.str.trim(), x: Math.round(i.transform[4]), y: Math.round(vp.height - i.transform[5]) }; }));
        });
      });
    })(n);
    return chain.then(function () { return pages; });
  }

  // One block per (date, session, grade) with its rows as printed.
  function parseBlocks(pages) {
    var out = [];
    pages.forEach(function (items, pi) {
      var its = items.slice().sort(function (a, b) { return a.y - b.y || a.x - b.x; });
      var rows = [];
      its.forEach(function (i) { var r = rows.find(function (r) { return Math.abs(r.y - i.y) <= 3; }); if (r) r.it.push(i); else rows.push({ y: i.y, it: [i] }); });
      rows.forEach(function (r) { r.it.sort(function (a, b) { return a.x - b.x; }); });
      var title = its.find(function (i) { return /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday),\s+\d+\s+\w+\s+\d{4}$/.test(i.s); });
      if (!title) return;
      var m = title.s.match(/(\d+)\s+(\w+)\s+(\d{4})/);
      var date = m[3] + '-' + String(MONTHS[m[2]]).padStart(2, '0') + '-' + m[1].padStart(2, '0');
      var sec = null, cols = null, pendingPM = false;
      function flush() { if (sec && sec.rows.length) out.push(sec); }
      rows.forEach(function (r) {
        var txt = r.it.map(function (i) { return i.s; }).join(' | ');
        var h = txt.match(/(MORNING|AFTERNOON) SESSION:?\s*GRADE\s*(\d+)/i);
        if (h) { flush(); sec = { page: pi + 1, date: date, session: h[1][0].toUpperCase() === 'M' ? 'AM' : 'PM', grade: h[2], rows: [], extras: [] }; cols = null; return; }
        if (/AFTERNOON SESSION/i.test(txt)) { flush(); sec = null; pendingPM = true; return; }
        if (pendingPM) { var g = txt.match(/^Grade\s*(\d+)$/i); if (g) { sec = { page: pi + 1, date: date, session: 'PM', grade: g[1], rows: [], extras: [] }; cols = null; pendingPM = false; return; } }
        if (!sec) return;
        if (/Total learners/.test(txt)) {
          cols = {};
          r.it.forEach(function (i) {
            if (/Total learners/.test(i.s)) cols.learners = i.x; else if (/^Venue|^Room/.test(i.s)) cols.venue = i.x;
            else if (/^Subject/.test(i.s)) cols.subject = i.x; else if (/^Duration/.test(i.s)) cols.duration = i.x;
            else if (/^Start/.test(i.s)) cols.start = i.x; else if (/^End/.test(i.s)) cols.end = i.x;
          });
          return;
        }
        if (!cols || !cols.learners || !cols.subject) return;
        if (/^(ACCOMMODATIONS|STUDY VENUE|As on)/.test(txt)) { flush(); sec = null; return; }
        var row = { y: r.y };
        r.it.forEach(function (i) {
          var s = i.s, x = i.x;
          if (x < cols.learners - 12) { if (/^(8|9|10|11|12)[AE]\d$/.test(s)) row.cls = s; else if (/^K\d\d\b/.test(s) || s === 'CNL') row.key = s; }
          else if (x < (cols.venue || cols.learners + 40) - 8 && /^\d+$/.test(s)) row.learners = +s;
          else if (x < cols.subject - 6) row.venue = (row.venue ? row.venue + ' ' : '') + s;
          else if (cols.duration && x < cols.duration - 6) row.subject = (row.subject ? row.subject + ' ' : '') + s;
          else if (cols.start && x < cols.start - 8 && /^\d+(\.\d+)?$/.test(s)) row.duration = +s;
          else if (cols.end && x < cols.end - 8 && /^\d{1,2}:\d{2}$/.test(s)) row.start = s;
          else if (cols.end && x < cols.end + 30 && /^\d{1,2}:\d{2}$/.test(s)) row.end = s;
        });
        if (row.cls || row.key) {
          // a class row from another grade means the block ended without a heading
          if (row.cls && row.cls.indexOf(sec.grade) !== 0) return;
          sec.rows.push(row);
        } else if (row.venue || row.subject || row.duration) sec.extras.push(row);
      });
      flush();
    });
    return out;
  }

  // Initials used in the timetable ("CG", "MiC", "JdK") against a staff name ("Surname, First").
  function initialsMatch(ini, staff) {
    if (!ini || !staff) return false;
    var p = staff.split(','), last = norm(p[0]), first = norm(p[1] || '');
    var lw = last.split(' '), fw = first.split(' ');
    var I = ini.toLowerCase();
    var cands = [fw[0][0] + lw[lw.length - 1][0], fw[0].slice(0, 2) + lw[lw.length - 1][0], fw[0][0] + lw.map(function (w) { return w[0]; }).join(''),
                 fw[0][0] + lw[lw.length - 1].slice(0, 2), fw.map(function (w) { return w[0]; }).join('') + lw[lw.length - 1][0]];
    return cands.indexOf(I) > -1;
  }

  // Language papers: the timetable's 01/03 (Home / First Additional) labels are not
  // reliable, so a class or key writes the language at the level its learners take.
  function family(code) { return /^AFR/.test(code) ? 'AFR' : /^ENG/.test(code) ? 'ENG' : code; }
  function isLang(code) { return /^(AFR|ENG)/.test(code); }
  function fits(g, code) { return isLang(code) ? g.codes.some(function (c) { return family(c) === family(code); }) : g.codes.indexOf(code) > -1; }
  function levelOf(g, code) { if (!isLang(code)) return code; var c = g.codes.find(function (c2) { return family(c2) === family(code); }); return c || code; }

  // Blocks → sessions: one per (date, session, grade, code, paper) with its cover units.
  function resolveSessions(blocks, groups) {
    var sessions = {};
    blocks.forEach(function (b) {
      var all = b.rows.concat(b.extras), subj = [];
      all.forEach(function (r) {
        if (!r.subject) return;
        var m; CODE_RE.lastIndex = 0;
        while ((m = CODE_RE.exec(r.subject))) subj.push({ code: m[1], paper: (m[2] || '').replace(/\s/g, ''), y: r.y, duration: r.duration, start: r.start, end: r.end });
      });
      if (!subj.length) return;                         // a normal school day
      // times missing on a subject: borrow from another paper in the same block
      var withTime = subj.find(function (x) { return x.start; });
      subj.forEach(function (x) { if (!x.start && withTime) { x.start = withTime.start; x.end = withTime.end; x.duration = withTime.duration; x.timeGuessed = true; } });
      var venues = all.filter(function (r) { return r.venue; });
      function nearestVenue(y) {
        var best = null; venues.forEach(function (v) { if (!best || Math.abs(v.y - y) < Math.abs(best.y - y)) best = v; });
        return best ? best.venue : '';
      }
      function sessionFor(x, grade) {
        grade = grade || b.grade;
        var id = [b.date, b.session, grade, x.code, x.paper].join('|');
        if (!sessions[id]) sessions[id] = { id: id, date: b.date, session: b.session, grade: grade, code: x.code, paper: x.paper,
          subject: subjectName(x.code, grade), duration: x.duration || null, start: x.start || '', end: x.end || '', timeGuessed: !!x.timeGuessed, units: [] };
        return sessions[id];
      }
      var gGroups = groups.filter(function (g) { return g.grade === b.grade; });
      // the block's papers, once each
      var uniq = []; subj.forEach(function (x) { if (!uniq.some(function (u) { return u.code === x.code && u.paper === x.paper; })) uniq.push(x); });
      // a row that names its own paper(s) (always, from Excel) writes only those
      function papersFor(r) {
        if (!r.subject) {
          // PDF: a class row under a block with two different subjects (e.g. Afrikaans for the
          // A classes, English for the E classes) takes the subject printed nearest to it
          var fams = uniq.map(function (u) { return family(u.code); }).filter(function (v, i, a) { return a.indexOf(v) === i; });
          if (r.cls && fams.length > 1) {
            var near = subj.slice().sort(function (a, c) { return Math.abs(a.y - r.y) - Math.abs(c.y - r.y); })[0];
            return uniq.filter(function (u) { return family(u.code) === family(near.code); });
          }
          return uniq;
        }
        var own = [], m2; CODE_RE.lastIndex = 0;
        while ((m2 = CODE_RE.exec(r.subject))) own.push({ code: m2[1], paper: (m2[2] || '').replace(/\s/g, '') });
        var list = uniq.filter(function (u) { return own.some(function (o) { return o.code === u.code && o.paper === u.paper; }); });
        return list.length ? list : uniq;
      }
      b.rows.forEach(function (r) {
        var rowSubj = papersFor(r);
        var venue = r.venue || (+b.grade >= 10 ? nearestVenue(r.y) : '');
        if (r.cls) {
          // Grades 8–9: the class writes every paper of the block that its learners take
          var done = {};
          rowSubj.forEach(function (x) {
            // per actual paper (for languages: the level each learner takes)
            var byCode = {}, staffBy = {};
            gGroups.filter(function (g) { return fits(g, x.code); }).forEach(function (g) {
              var code = levelOf(g, x.code), n = 0;
              g.members.forEach(function (m) { if (m.cls === r.cls) { n++; (byCode[code] = byCode[code] || []); if (byCode[code].indexOf(m.sno) < 0) byCode[code].push(m.sno); } });
              if (n > 1 && g.staff) { staffBy[code] = staffBy[code] || []; if (staffBy[code].indexOf(g.staff) < 0) staffBy[code].push(g.staff); }
            });
            Object.keys(byCode).forEach(function (code) {
              var k2 = code + '|' + x.paper; if (done[k2]) return; done[k2] = 1;
              var own = gGroups.filter(function (g) { return fits(g, code) && levelOf(g, code) === code; });
              var spread = {}; own.forEach(function (g) { g.members.forEach(function (m) { spread[m.cls] = 1; }); });
              var isElective = own.length === 1 && Object.keys(spread).length > 1;
              if (isElective) {
                var ses = sessionFor(Object.assign({}, x, { code: code })), ref = subjectName(code, b.grade) + ' group';
                if (!ses.units.some(function (u) { return u.ref === ref; }))
                  ses.units.push({ type: 'key', ref: ref, venue: '', printed: null, staff: [own[0].staff], groups: [own[0].id], members: own[0].members.map(function (m) { return m.sno; }) });
                return;
              }
              sessionFor(Object.assign({}, x, { code: code })).units.push({ type: 'class', ref: r.cls, venue: venue, printed: r.learners || null, staff: staffBy[code] || [], members: byCode[code] });
            });
          });
        } else {
          // Grades 10–11: a key ("K04 LV") belongs to one of the block's papers
          var km = r.key.match(/^(K\d\d)\s*(.*)$/), key = km ? km[1] : r.key, ini = km ? km[2].trim() : '';
          function candidates(list) {
            var c = [];
            list.forEach(function (x) { gGroups.forEach(function (g) { if (g.key === key && fits(g, x.code)) c.push({ x: Object.assign({}, x, { code: levelOf(g, x.code) }), g: g }); }); });
            return c;
          }
          var cand = candidates(rowSubj);
          if (!cand.length && rowSubj !== uniq) cand = candidates(uniq);
          // a key printed under the wrong grade heading: look in the other grades (key + paper + teacher must all fit)
          if (!cand.length) {
            var other = [];
            rowSubj.forEach(function (x) {
              groups.forEach(function (g) { if (g.grade !== b.grade && g.key === key && fits(g, x.code) && initialsMatch(ini, g.staff)) other.push({ x: Object.assign({}, x, { code: levelOf(g, x.code) }), g: g }); });
            });
            var grades = other.map(function (c) { return c.g.grade; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
            if (grades.length === 1) cand = other;
          }
          var byIni = cand.filter(function (c) { return initialsMatch(ini, c.g.staff); });
          if (!byIni.length && cand.length > 1) {
            // initials that fit nobody (e.g. a married name): rule out the classes whose
            // teacher is already another row of this block
            var others = b.rows.filter(function (o) { return o !== r && o.key; }).map(function (o) { var mm = o.key.match(/^(K\d\d)\s*(.*)$/); return mm ? mm[2].trim() : ''; });
            var left = cand.filter(function (c) { return !others.some(function (oi) { return initialsMatch(oi, c.g.staff); }); });
            if (left.length) byIni = left;
          }
          var pick = byIni.length ? byIni : cand;
          var x0 = pick.length ? pick[0].x : null;
          var gs = pick.filter(function (c) { return x0 && c.x.code === x0.code; }).map(function (c) { return c.g; });
          // the export lists one key class under several staff members when a learner or two
          // has another teacher: those entries are the same class
          gs.slice().forEach(function (g0) {
            groups.forEach(function (g) { if (gs.indexOf(g) < 0 && g.grade === g0.grade && g.subject === g0.subject && g.key === g0.key && g.kclass === g0.kclass) gs.push(g); });
          });
          if (!x0) {
            // unknown group (e.g. CNL): attach to the nearest paper by position
            x0 = (r.subject ? rowSubj : subj).slice().sort(function (a, c) { return Math.abs(a.y - r.y) - Math.abs(c.y - r.y); })[0];
          }
          var members = []; gs.forEach(function (g) { g.members.forEach(function (m) { if (members.indexOf(m.sno) < 0) members.push(m.sno); }); });
          var target = sessionFor(x0, gs.length ? gs[0].grade : b.grade);
          if (gs.length && target.units.some(function (u) { return u.ref === r.key && u.type === 'key'; })) return;
          // CNL = Curro Online: a separate school whose learners write here; no class lists for them
          target.units.push({ type: gs.length ? 'key' : (r.key === 'CNL' ? 'online' : 'other'),
            ref: r.key === 'CNL' ? 'Curro Online' : r.key, venue: venue, printed: r.learners || null,
            staff: gs.map(function (g) { return g.staff; }).filter(function (v, i, a) { return v && a.indexOf(v) === i; }),
            groups: gs.map(function (g) { return g.id; }), members: members });
        }
      });
    });
    return Object.keys(sessions).map(function (k) { return sessions[k]; })
      .filter(function (s) { return s.units.length; })
      .sort(function (a, b) { return a.date.localeCompare(b.date) || a.session.localeCompare(b.session) || (+a.grade - +b.grade) || a.code.localeCompare(b.code); });
  }

  // ── Timetable as an Excel workbook (one sheet per day, e.g. "9 Nov") ─────
  // Merged cells (one venue or subject for several keys) are filled into every
  // row they cover, so each class / key row carries its own venue and paper.
  function excelTime(v) {
    var s = String(v == null ? '' : v).trim();
    if (/^\d{1,2}:\d{2}/.test(s)) return s.slice(0, 5);
    var f = parseFloat(s); if (isNaN(f) || f <= 0 || f >= 1) return '';
    var mins = Math.round(f * 24 * 60);
    return String(Math.floor(mins / 60)).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
  }
  function parseTimetableBook(book) {
    var blocks = [], merges = book.$merges || {};
    Object.keys(book).forEach(function (name) {
      if (!/^\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*$/i.test(name.trim())) return;
      var rows = book[name].map(function (r) { return r.slice(); });
      (merges[name] || []).forEach(function (m) {
        if (m[0].c > 6) return;                              // only the session columns matter
        var v = (rows[m[0].r] || [])[m[0].c];
        for (var r = m[0].r; r <= m[1].r; r++) for (var c = m[0].c; c <= Math.min(m[1].c, 6); c++) {
          rows[r] = rows[r] || []; if (r !== m[0].r || c !== m[0].c) rows[r][c] = v;
        }
      });
      var serial = parseFloat((rows[0] || [])[0]);
      if (!serial) return;
      var d = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
      var date = d.toISOString().slice(0, 10);
      var sec = null, col = null, pendingPM = false;
      function flush() { if (sec && sec.rows.length) blocks.push(sec); }
      rows.forEach(function (r, y) {
        var a = String(r[0] || '').trim();
        var h = a.match(/(MORNING|AFTERNOON) SESSION:?\s*GRADE\s*(\d+)/i);
        if (h) { flush(); sec = { date: date, session: /^M/i.test(h[1]) ? 'AM' : 'PM', grade: h[2], rows: [], extras: [], fromExcel: true }; col = null; return; }
        if (/AFTERNOON SESSION/i.test(a)) { flush(); sec = null; pendingPM = true; return; }
        if (pendingPM) { var g = a.match(/^Grade\s*(\d+)$/i); if (g) { sec = { date: date, session: 'PM', grade: g[1], rows: [], extras: [], fromExcel: true }; col = null; pendingPM = false; return; } }
        if (!sec) return;
        if (r.some(function (c) { return /Total learners/i.test(c); })) {
          col = {};
          r.forEach(function (c, i) {
            c = String(c);
            if (/Total learners/i.test(c)) col.learners = i; else if (/^Venue|^Room/i.test(c)) col.venue = i; else if (/^Subject/i.test(c)) col.subject = i;
            else if (/Duration/i.test(c)) col.duration = i; else if (/^Start/i.test(c)) col.start = i; else if (/^End/i.test(c)) col.end = i;
          });
          return;
        }
        if (!col || col.subject == null) return;
        if (/^(ACCOMMODATIONS|STUDY VENUE)/i.test(a)) { flush(); sec = null; return; }
        var row = { y: y }, isCls = /^(8|9|10|11|12)[AE]\d$/.test(a), isKey = /^K\d\d\b/.test(a) || a === 'CNL';
        if (!isCls && !isKey) return;
        if (isCls) { if (a.indexOf(sec.grade) !== 0) return; row.cls = a; } else row.key = a.replace(/\s+/g, ' ');
        var n = parseInt(r[col.learners], 10); if (!isNaN(n)) row.learners = n;
        if (col.venue != null && String(r[col.venue] || '').trim()) row.venue = String(r[col.venue]).trim();
        if (String(r[col.subject] || '').trim()) row.subject = String(r[col.subject]).trim();
        var dur = parseFloat(r[col.duration]); if (!isNaN(dur)) row.duration = dur;
        if (col.start != null) row.start = excelTime(r[col.start]);
        if (col.end != null) row.end = excelTime(r[col.end]);
        sec.rows.push(row);
      });
      flush();
    });
    return blocks;
  }
  function parseTimetableXlsx(book, groups) {
    var blocks = parseTimetableBook(book);
    return { blocks: blocks, sessions: resolveSessions(blocks, groups) };
  }

  function parseTimetable(pdf, groups) {
    return pdfPages(pdf).then(function (pages) { var blocks = parseBlocks(pages); return { blocks: blocks, sessions: resolveSessions(blocks, groups) }; });
  }

  global.ExamCoversImport = {
    readXlsx: readXlsx, firstSheet: firstSheet, parseGuardian: parseGuardian, parseKeys: parseKeys, buildRoster: buildRoster,
    matchRegister: matchRegister, parseTimetable: parseTimetable, parseTimetableXlsx: parseTimetableXlsx, parseBlocks: parseBlocks, resolveSessions: resolveSessions,
    subjectName: subjectName, codesForSubject: codesForSubject, medium: medium, initialsMatch: initialsMatch, norm: norm
  };
})(window);
