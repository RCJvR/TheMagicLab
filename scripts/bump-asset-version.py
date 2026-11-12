#!/usr/bin/env python3
"""Give the Grading Grimoire and markbook files a fresh ?v= tag everywhere they are referenced.

Why: GitHub Pages lets browsers keep files for 10 minutes. Right after a release a browser can mix
a new page with an old cached module (for example a new grimoire-set.html with an old
grimoire-core.js), and an ES module import of a name the old file does not have stops the page.
A version tag that changes with every release makes the browser fetch matching files.

Every reference gets the SAME tag, so a module is never loaded twice under two names.
Run before committing a release that changes any of these files:  python scripts/bump-asset-version.py
"""
import re, sys, time, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ['grimoire-core.js', 'grimoire-pdf.js', 'grimoire-mark.js', 'grimoire-write.js', 'grimoire.css',
          'grimoire-tab.js', 'markbook.js', 'markbook-calc.js', 'markbook.css', 'co-teachers.js']
FILES = ['grimoire-mark.html', 'grimoire-set.html', 'written-task.html', 'dashboard-teacher.html',
         'assets/grimoire-mark.js', 'assets/grimoire-write.js', 'assets/grimoire-pdf.js']

version = sys.argv[1] if len(sys.argv) > 1 else time.strftime('%Y%m%d%H%M')
pattern = re.compile(r'''((?:src|href)="(?:/|\./)?(?:assets/)?|from '\./(?:assets/)?)(''' + '|'.join(map(re.escape, ASSETS)) + r''')(\?v=[\w.-]+)?(?=["'])''')
changed = 0
for name in FILES:
    p = ROOT / name
    text = p.read_text(encoding='utf-8')
    new, n = pattern.subn(lambda m: m.group(1) + m.group(2) + '?v=' + version, text)
    if new != text:
        p.write_text(new, encoding='utf-8', newline='')
        changed += n
print(f'set ?v={version} on {changed} references')
