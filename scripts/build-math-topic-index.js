// Writes math-magician/topic-index.js: topic id → [English name, chapter] per grade, for the teacher dashboard.
// Run: node scripts/build-math-topic-index.js (after adding or renaming Math Magician topics).
const fs = require('fs'), vm = require('vm'), path = require('path');
const M = path.join(__dirname, '..', 'math-magician') + '/';
const out = {};
for (const g of [8, 9, 10, 11, 12]) {
  out[g] = {};
  const n = fs.readdirSync(M + 'gr' + g).filter(f => /^ch\d+\.js$/.test(f)).length;
  for (let c = 1; c <= n; c++) {
    let reg; vm.runInNewContext(fs.readFileSync(M + `gr${g}/ch${c}.js`, 'utf8'), { MathMagician: { registerChapter: (a, o) => reg = o }, window: {}, document: {} });
    reg.topics.forEach(t => { out[g][t.id] = [t.name, t.chapter || c]; });
  }
}
const body = Object.entries(out).map(([g, m]) => `  ${g}: {\n` + Object.entries(m).map(([id, v]) => `    ${id}: ${JSON.stringify(v)}`).join(',\n') + '\n  }').join(',\n');
fs.writeFileSync(M + 'topic-index.js', `/* Math Magician topic names by grade: topic id → [English name, chapter].\n   Generated from the chapter files; used by the teacher dashboard. */\nwindow.MM_TOPIC_INDEX = {\n${body}\n};\n`);
console.log(Object.fromEntries(Object.entries(out).map(([g, m]) => [g, Object.keys(m).length])));
