// Copies assets/exam-paper.js to supabase/functions/_shared/exam-paper.js, where
// the exam-mark edge function imports it (the published site leaves out supabase/,
// and the function bundle cannot reach assets/). Run after editing the module:
//   node scripts/sync-exam-paper.js          copy
//   node scripts/sync-exam-paper.js --check  fail if the copy is out of date
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const src = path.join(root, 'assets', 'exam-paper.js');
const dst = path.join(root, 'supabase', 'functions', '_shared', 'exam-paper.js');
const banner = '// GENERATED from assets/exam-paper.js by scripts/sync-exam-paper.js. Do not edit here.\n';
const want = banner + fs.readFileSync(src, 'utf8');
if (process.argv.includes('--check')) {
  const have = fs.existsSync(dst) ? fs.readFileSync(dst, 'utf8') : '';
  if (have !== want) { console.error('supabase/functions/_shared/exam-paper.js is out of date: run node scripts/sync-exam-paper.js'); process.exit(1); }
  console.log('exam-paper.js copy is up to date');
} else {
  fs.writeFileSync(dst, want);
  console.log('copied to', path.relative(root, dst));
}
