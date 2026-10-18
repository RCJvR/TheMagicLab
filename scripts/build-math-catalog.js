#!/usr/bin/env node
// Keeps the Math Magician lists that are copied out of the chapter files in step:
//   · the "math-magician" section of lesson-catalog.js (assignable lessons), and
//   · the topic totals on the grade cards (data-total in math-magician/index.html),
//   · the topic count of each chapter in the grade pages' CHAPTER_MANIFEST.
// Run after adding or renaming chapters or topics:  node scripts/build-math-catalog.js
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), MM = path.join(ROOT, 'math-magician');
const { setCatalogSection } = require('./lesson-catalog-file');

const groups = [], totals = {};
for (const g of [8, 9, 10, 11, 12]) {
  const idxPath = path.join(MM, 'gr' + g, 'index.html');
  let idx = fs.readFileSync(idxPath, 'utf8');
  const rows = [...idx.matchAll(/\{ num:\s*(\d+), name: "([^"]+)",[^\n]*?topics:\s*(\d+), file: "([^"]+)"/g)];
  let total = 0;
  for (const m of rows) {
    const num = +m[1], name = m[2], file = m[4];
    let reg = null;
    vm.runInNewContext(fs.readFileSync(path.join(MM, 'gr' + g, file), 'utf8'), { MathMagician: { registerChapter: (n, o) => { reg = o; } }, window: {} });
    const names = reg.topics.map(t => t.name);
    // ref: the topic's fixed id, which assignments match on (the name is shown and kept for older assignments).
    total += names.length;
    if (+m[3] !== names.length) idx = idx.replace(m[0], m[0].replace(/topics:(\s*)\d+/, (x, sp) => 'topics:' + sp + names.length));
    groups.push({ group: `Grade ${g} — Ch ${num} — ${name}`, lessons: reg.topics.map(t => ({ value: t.name, label: t.name, ref: `mm:${g}:${t.id}` })) });
  }
  fs.writeFileSync(idxPath, idx);
  totals[g] = total;
}

// lesson-catalog.js: replace the math-magician section
setCatalogSection('math-magician', groups);

// grade cards
const homePath = path.join(MM, 'index.html');
let home = fs.readFileSync(homePath, 'utf8');
for (const g in totals) home = home.replace(new RegExp(`(data-grade="${g}" data-total=")\\d+(")`), `$1${totals[g]}$2`);
fs.writeFileSync(homePath, home);
console.log('topics per grade:', totals, '| catalog groups:', groups.length);
