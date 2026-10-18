// Writes science-sage/lesson-index.js and tech-tower/lesson-index.js: grade → { "strand/file": English lesson name },
// from each tool's home page. Used by the teacher dashboard.
// Run: node scripts/build-lesson-index.js (after adding or renaming Science Sage or Tech Tower lessons).
const fs = require('fs'), path = require('path');
for (const [dir, global, title] of [['science-sage', 'SS_LESSON_INDEX', 'Science Sage'], ['tech-tower', 'TT_LESSON_INDEX', 'Tech Tower']]) {
const R = path.join(__dirname, '..', dir) + '/';
const html = fs.readFileSync(R + 'index.html', 'utf8');
const out = {};
const decode = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
// Read whole attributes: the Afrikaans label attribute itself contains markup with ">".
for (const m of html.matchAll(/<a((?:\s+[\w-]+=(?:"[^"]*"|'[^']*'))*)\s*>([\s\S]*?)<\/a>/g)) {
  const attrs = m[1], inner = m[2];
  if (!/class="strand-topic"/.test(attrs)) continue;
  const h = attrs.match(/href="gr(\d+)\/([^/"]+)\/([^/"]+?)\.html"/);
  if (!h) continue;
  const [, g, strand, file] = h;
  (out[g] = out[g] || {})[strand + '/' + file] = decode(inner);
}
// Lesson pages that the home page does not list still get a readable name.
for (const g of fs.readdirSync(R).filter(d => /^gr\d+$/.test(d))) for (const strand of fs.readdirSync(R + g)) for (const f of fs.readdirSync(R + g + '/' + strand)) {
  if (!/\.html$/.test(f) || /\.af\.html$/.test(f)) continue;
  const k = strand + '/' + f.replace(/\.html$/, ''), gn = g.slice(2);
  out[gn] = out[gn] || {};
  if (!out[gn][k]) { const t = fs.readFileSync(R + g + '/' + strand + '/' + f, 'utf8').match(/<title>([^<]*)<\/title>/); out[gn][k] = t ? decode(t[1]).replace(/\s*[·|—–-]\s*(Science Sage|Tech Tower|The Tech Tower|The Magic Lab).*$/i, '') : k; console.log('not on home page:', gn, k, '→', out[gn][k]); }
}
const body = Object.entries(out).map(([g, m]) => `  ${g}: {\n` + Object.entries(m).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n') + '\n  }').join(',\n');
fs.writeFileSync(R + 'lesson-index.js', `/* ${title} lesson names by grade: "strand/file" → English name.\n   Generated from the ${title} home page by scripts/build-lesson-index.js; used by the teacher dashboard. */\nwindow.${global} = {\n${body}\n};\n`);
console.log(dir, Object.fromEntries(Object.entries(out).map(([g, m]) => [g, Object.keys(m).length])));
}
