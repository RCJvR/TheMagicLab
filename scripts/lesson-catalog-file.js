// Shared by the build scripts: replace one tool's section of lesson-catalog.js
// (the teacher's assignment lesson picker), keeping the file's header comment.
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const FILE = path.join(__dirname, '..', 'lesson-catalog.js');

function setCatalogSection(tool, groups) {
  const src = fs.readFileSync(FILE, 'utf8');
  const w = {};
  vm.runInNewContext(src, { window: w });
  w.ML_LESSON_CATALOG[tool] = groups;
  const head = src.slice(0, src.indexOf('window.ML_LESSON_CATALOG = '));
  fs.writeFileSync(FILE, head + 'window.ML_LESSON_CATALOG = ' + JSON.stringify(w.ML_LESSON_CATALOG, null, 2) + ';\n');
}

module.exports = { setCatalogSection };
