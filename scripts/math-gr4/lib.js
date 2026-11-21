// Shared helpers for the Grade 4 Math Magician chapter generators (gen_chN.js).
// A chapter is written as one bilingual source; writeChapter() emits chN.js, chN.af.js and chN.help.js.
const fs = require('fs'), path = require('path');

const PRELUDE = `window.G4 = Object.assign(window.G4 || {}, {
  fmt: n => String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g, '\\u00a0'),
  stk: (name, cls) => '<img class="g4-stk ' + (cls || '') + '" src="/assets/stickers/' + name + '.webp" srcset="/assets/stickers/' + name + '@2x.webp 2x" alt="">',
  rnd: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
  num: s => { const v = parseInt(String(s).replace(/[\\s\\u00a0]/g, ''), 10); return isNaN(v) ? null : v; },
  q: (root, k) => root.querySelector('[data-k="' + k + '"]'),
  pt: (svg, e) => { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); },
  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
});`;
const REVIVE = `const __rev = o => { for (const k in o) if (o[k] && o[k].__fn) o[k] = (0, eval)('(' + o[k].__fn + ')'); return o; };`;
const Lfix = L => Object.fromEntries(Object.entries(L).map(([k, v]) => [k, typeof v === 'function' ? { __fn: v.toString() } : v]));

const stk = (n, cls) => `<img class="g4-stk ${cls || ''}" src="/assets/stickers/${n}.webp" srcset="/assets/stickers/${n}@2x.webp 2x" alt="">`;
const fp = q => q.type === 'mc' ? 'm' + q.options.length + ':' + q.answer : 'i:' + String(q.answer).replace(/,/g, '.').replace(/[^0-9.\-\/]/g, '');
const ex = (title, steps) => `<div class="example-box"><div class="example-box-title">✏️ ${title}</div>${steps.map((s, i) => `<div class="example-step"><span class="step-num">${i + 1}</span><span>${s}</span></div>`).join('')}</div>`;
const def = (title, html) => `<div class="def-box"><div class="def-box-title">📖 ${title}</div><p>${html}</p></div>`;
const tip = html => `<div class="tip-box"><span class="tip-icon">💡</span><span>${html}</span></div>`;
const hero = (s, html) => `<div class="g4-hero">${stk(s)}<p>${html.replace(/(\d) (?=\d{3}\b)/g, '$1&nbsp;')}</p></div>`;
// A sim: markup in a .g4-sim box plus an inline script. Each script sits in its own block so re-rendering a lesson never redeclares anything.
const sim = (id, fn, L, markup) => `<div class="g4-sim" id="${id}">${markup}</div><script>${PRELUDE}\n{ ${REVIVE}\n(${fn.toString()})(__rev(${JSON.stringify(Lfix(L))}), document.getElementById('${id}')); }</script>`;
const W = {
  en: { check: 'Check', next: 'Next', newQ: 'New one', again: 'Play again', score: (a, b) => 'Score: ' + a + ' out of ' + b + '.' },
  af: { check: 'Toets', next: 'Volgende', newQ: 'Nog een', again: 'Speel weer', score: (a, b) => 'Telling: ' + a + ' uit ' + b + '.' }
};

// TOPICS: [{ id, name:{en,af}, full:{en,af}, body: lang => html, qs:[{en,af,o?:[[en],[af]],a,lv,h:[en,af],s:[[en],[af]]}], wb:{en:[{t,p,m}],af:[...],ans:[[ans,noteEn,noteAf]]} }]
function writeChapter(num, CH, TOPICS, OUT) {
  const SUB = { en: n => `Chapter ${num} · Topic ${n}`, af: n => `Hoofstuk ${num} · Onderwerp ${n}` };
  function chapter(lang) {
    const topics = TOPICS.map((t, i) => ({
      id: t.id, chapter: num, name: t.name[lang], fullName: t.full[lang],
      lesson: { heading: t.full[lang], sub: SUB[lang](i + 1), body: t.body(lang) },
      questions: t.qs.map(q => q.o ? { type: 'mc', text: q[lang], options: q.o[lang === 'en' ? 0 : 1], answer: q.a, topic: t.name[lang] } : { type: 'input', text: q[lang], answer: q.a, topic: t.name[lang] })
    }));
    let qn = 0; const wbTopics = [], akTopics = [];
    TOPICS.forEach(t => {
      const qs = [], ans = []; let ai = 0;
      t.wb[lang].forEach(w => {
        qn++;
        qs.push({ num: String(qn), text: w.t, parts: w.p.map((p, j) => ({ label: w.p.length > 1 ? String.fromCharCode(97 + j) + ')' : '', text: p, marks: w.m[j] })) });
        w.p.forEach((_, j) => { const a = t.wb.ans[ai++]; ans.push({ num: 'Q' + qn + (w.p.length > 1 ? String.fromCharCode(97 + j) : ''), ans: a[0], note: lang === 'en' ? a[1] : a[2] }); });
      });
      if (ai !== t.wb.ans.length) throw new Error(`Topic ${t.id}: ${t.wb.ans.length} answers for ${ai} workbook parts`);
      wbTopics.push({ name: t.name[lang], questions: qs }); akTopics.push({ name: t.name[lang], answers: ans });
    });
    return { topics, workbook: { chapter: num, chapterName: CH[lang], topics: wbTopics }, answerKey: { chapter: num, chapterName: (lang === 'en' ? `Chapter ${num} — ` : `Hoofstuk ${num} — `) + CH[lang], topics: akTopics } };
  }
  for (const lang of ['en', 'af']) {
    const head = `// Math Magician — Grade 4, Chapter ${num} (${CH[lang]})${lang === 'af' ? ' — Afrikaans' : ''}\n// Generated from one bilingual source (scripts/math-gr4/gen_ch${num}.js); edit both languages there.\n`;
    fs.writeFileSync(path.join(OUT, lang === 'en' ? `ch${num}.js` : `ch${num}.af.js`), head + `MathMagician.registerChapter(${num}, ` + JSON.stringify(chapter(lang), null, 1) + ');\n');
  }
  const help = {};
  TOPICS.forEach(t => { help[t.id] = t.qs.map(q => [q.lv, fp(q.o ? { type: 'mc', options: q.o[0], answer: q.a } : { type: 'input', answer: q.a }), q.h[0], q.h[1], q.s[0], q.s[1]]); });
  fs.writeFileSync(path.join(OUT, `ch${num}.help.js`), `/* Hints, worked solutions and CAPS cognitive levels for Grade 4, chapter ${num} practice questions.\n   Entry: [level, fingerprint, hint EN, hint AF, steps EN, steps AF]. Levels: K knowledge, R routine, C complex, P problem solving. */\nMMHelp.add(4, ${num}, ` + JSON.stringify(help, null, 1) + ');\n');
  console.log(`wrote ch${num}.js, ch${num}.af.js, ch${num}.help.js; ${TOPICS.length} topics, ${TOPICS.reduce((a, t) => a + t.qs.length, 0)} questions`);
}
const OUT_DEFAULT = path.join(__dirname, '..', '..', 'math-magician', 'gr4');
module.exports = { PRELUDE, stk, fp, ex, def, tip, hero, sim, W, writeChapter, OUT_DEFAULT };
