"""
The Magic Lab — search-engine build step.

    python scripts/seo-build.py          # rewrite pages, sitemap.xml, robots.txt
    python scripts/seo-build.py --check  # report only, change nothing

Run it after adding or renaming lessons. For every page Google should find it
writes one generated block straight after <title> (description, canonical URL,
English/Afrikaans alternates, social-card tags, structured data), between
<!-- ml-seo --> markers, so edit this script, never the block. It also:

- gives lessons a descriptive <title> ("Topic — Grade 10 Physics | Science Sage")
- marks lessons window.MLLessonPreview (require-auth.js then shows anyone
  without access the lesson's header and first section, and a sign-up panel)
- opens the tool hubs to everyone (window.MLPublicPreview)
- marks private pages (accounts, dashboards, payments) noindex
- writes sitemap.xml (with hreflang alternates) and robots.txt
"""
import html, json, os, re, subprocess, sys

SITE = 'https://themagiclab.co.za'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OG_IMAGE = SITE + '/assets/og-card.png'
# Per-tool social cards (rendered by scripts/build-og-cards.js into assets/og/).
# A page uses its tool's card, the Afrikaans one on .af.html pages when it
# exists, and the site card otherwise.
OG_CARDS = ['code-conjurer', 'ai-oracle', 'java-genie', 'computer-codex', 'web-wizard', 'model-mage',
            'drawing-druid', 'science-sage', 'math-magician', 'spike-spellcaster', 'tech-tower',
            'robot-realm', 'time-turner']
# App pages that stay behind sign-in and out of Google, but still get a
# description and a card: link previews (WhatsApp, Facebook, Teams) read the
# page's tags without signing in, so a shared link shows the tool properly.
SHARE_ONLY = {
    'code-conjurer.html': 'Advanced Java for IT learners, Grades 10–12: classes, arrays, algorithms, exception handling and full OOP, in a browser-based IDE.',
    'ai-oracle.html': 'Understand how AI really works, learn to prompt well, and use AI ethically for studying, research and assignments. Grades 8–12.',
    'java-genie.html': 'Learn Java visually with turtle graphics, loops and interactive tutorials. Write real programs from day one. Grades 8–9.',
    'computer-codex.html': 'Digital literacy for Grades 8–12: Windows, Office, file management, Excel and Word, and a unit on using AI responsibly.',
    'web-wizard.html': 'Build websites in HTML and CSS with a live preview, in the browser. No server, no setup. Grades 8–9.',
    'model-mage-cad.html': 'Browser-based parametric CAD: sketch a profile, extrude it, cut holes and fillet edges, then export it for 3D printing.',
    'model-mage-circuits.html': 'Build circuits on a virtual breadboard, run a live simulation and program a microcontroller in code or blocks.',
    'spike-spellcaster/index.html': 'Code a LEGO® SPIKE Prime in Python or blocks, in the built-in simulator or on the real robot over Bluetooth. Built for WRO RoboMission.',
    'robot-realm/index.html': 'Program and simulate robots in a 2D arena: motors, sensors, obstacles and line following. No hardware needed.',
    'time-turner.html': 'A weekly time-management planner: school, homework, activities, meals, chores and rest, planned around what the week is missing.',
}


def og_image(rel):
    base = (rel.split('/')[1] if rel.startswith('tools/') else rel.split('/')[0]).replace('.html', '')
    tool = next((t for t in OG_CARDS if base == t or base.startswith(t + '-')), None)
    if not tool: return OG_IMAGE
    if rel.endswith('.af.html') and os.path.exists(os.path.join(ROOT, 'assets', 'og', tool + '-af.png')):
        tool += '-af'
    return SITE + '/assets/og/' + tool + '.png'
ORG = {'@type': 'Organization', 'name': 'The Magic Lab', 'url': SITE + '/',
       'logo': SITE + '/assets/logo-prism.svg'}
CHECK = '--check' in sys.argv

# Pages written by hand: title (None keeps the page's own), description.
PAGES = {
    'index.html': ('The Magic Lab — Interactive CAPS STEM tools for South African schools',
                   'Thirteen browser-based STEM tools for South African classrooms, aligned to CAPS and IEB: Physical and Natural Sciences, Mathematics, Technology, EGD, coding, robotics and design. Lessons, simulations and practice in English and Afrikaans.'),
    'pricing.html': ('Pricing — The Magic Lab',
                     'One plan for all thirteen Magic Lab tools, for every grade they cover. Start with a free trial; schools can request a quote for every learner and teacher.'),
    'pitch.html': ('About The Magic Lab — Reimagining STEM education in South Africa',
                   'Why The Magic Lab exists: interactive, curriculum-aligned STEM tools that run in any browser, built for South African learners and the teachers who teach them.'),
    'privacy.html': (None, 'How The Magic Lab collects, uses and protects personal information, in line with POPIA.'),
    'terms.html': (None, 'The terms of use for The Magic Lab’s STEM learning tools.'),
    'french-tutor.html': ('French Tutor — Listening, reading, writing and speaking practice | The Magic Lab',
                          'Practise French listening, reading, writing and speaking with real corrections, and a conversation partner whenever you need one.'),
    'mosaic-mage.html': (None, 'Mosaic Mage: design colourful pixel mosaics and patterns in the browser.'),
    'math-magician/calculator.html': ('Free online scientific calculator — Math Magician',
                                      'A free scientific calculator in the browser, laid out like the ones South African learners use in class and exams.'),
    'wro-mat-planner/index.html': (None, None),
    'wro-mat-planner/junior.html': (None, None),
    'wro-mat-planner/elementary.html': (None, None),
}
HUBS = {
    'science-sage/index.html': ('Science Sage — CAPS Natural & Physical Sciences, Grades 7–12',
                                'Interactive science lessons for Grades 7–12, aligned to CAPS (NSC) and IEB: Natural Sciences, Physics and Chemistry, each with simulations, practice questions and a workbook, in English and Afrikaans.'),
    'tech-tower/index.html': ('The Tech Tower — CAPS Technology for Grades 8 and 9',
                              'CAPS-aligned Technology lessons for Grades 8 and 9: structures, mechanical systems, electrical systems and processing, with simulations and practice, in English and Afrikaans.'),
    'drawing-druid/index.html': ('Drawing Druid — Engineering Graphics & Design (EGD), Grades 10–12',
                                 'Interactive Engineering Graphics & Design for Grades 10–12: step-by-step constructions, orthographic and isometric drawing, perspective, loci, solid geometry and the civil, mechanical and electrical drawings in the CAPS curriculum.'),
    'math-magician/index.html': ('Math Magician — CAPS Mathematics, Grades 8–12',
                                 'Interactive mathematics lessons, guided practice and workbook exercises for Grades 8–12, aligned to the South African curriculum, plus graphing, geometry and statistics tools.'),
    'model-mage.html': ('Model Mage — CAD workshop and circuit simulator',
                        'Sketch and 3D-print parts in a browser-based CAD workshop, or build working circuits and program a microcontroller in the Circuit Simulator. For Grades 8–12.'),
}
NOINDEX = ['account.html', 'admin.html', 'dashboard-student.html', 'dashboard-teacher.html',
           'payment-success.html', 'payment-cancelled.html', 'reset-password.html',
           'arena.html', 'arena-host.html', 'time-turner.html', 'time-turner-checkin.html', 'pitch-deck.html']
# interactive Drawing Druid chapters (resources and exam tasks stay members-only)
TOOLS = {'science-sage': 'Science Sage', 'tech-tower': 'The Tech Tower', 'drawing-druid': 'Drawing Druid'}
DD_SKIP = {'resources.html', 'course-drawings.html', 'practical-assessment-task.html'}


def lesson_pages():
    out = []
    for tool in ('science-sage', 'tech-tower'):
        for d, _, fs in os.walk(os.path.join(ROOT, tool)):
            rel = os.path.relpath(d, ROOT).replace(os.sep, '/')
            if not re.match(r'^[a-z-]+/gr\d+', rel): continue
            out += [rel + '/' + f for f in fs if f.endswith('.html')]
    dd = os.path.join(ROOT, 'drawing-druid', 'chapters')
    out += ['drawing-druid/chapters/' + f for f in os.listdir(dd) if f.endswith('.html') and f not in DD_SKIP]
    return sorted(out)


def text(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s or ''))).strip()


def clip(s, n=158):
    if len(s) <= n: return s
    s = s[:n].rsplit(' ', 1)[0].rstrip(',;:—-')
    return s + '…'


def attr(s):
    return html.escape(s, quote=True)


def first(pat, s):
    m = re.search(pat, s, re.S)
    return m.group(1) if m else ''


def tool_name(title):
    title = html.unescape(title)
    if '|' in title: return title.rsplit('|', 1)[1].strip()   # a title this script already wrote
    parts = re.split(r'\s+[—–-]\s+', title)
    name = parts[-1].strip() if len(parts) > 1 else 'The Magic Lab'
    return re.sub(r'\s+Gr\s*\d+$', '', name)


def url(rel):
    return SITE + '/' + ('' if rel == 'index.html' else rel)


def twin(rel):
    """(en, af) paths when the page has an Afrikaans twin, else None."""
    if rel.endswith('.af.html'):
        en = rel[:-8] + '.html'
        return (en, rel) if os.path.exists(os.path.join(ROOT, en)) else None
    af = rel[:-5] + '.af.html'
    return (rel, af) if os.path.exists(os.path.join(ROOT, af)) else None


def lesson_meta(rel, s):
    af = rel.endswith('.af.html')
    h1 = text(first(r'<h1[^>]*class="lesson-title"[^>]*>(.*?)</h1>', s) or first(r'<h1[^>]*>(.*?)</h1>', s))
    sub = text(first(r'<p class="lesson-sub"[^>]*>(.*?)</p>', s))
    tag = text(first(r'<div class="lesson-tag"[^>]*>(.*?)</div>', s))
    tool = TOOLS[rel.split('/')[0]]
    parts = [p.strip() for p in tag.split('·')] if tag else []
    grade = parts[0] if parts and re.match(r'(Grade|Graad)\s*\d+', parts[0]) else ''
    gnum = int(re.search(r'\d+', grade).group()) if grade else 0
    if rel.startswith('tech-tower/'):
        subject = 'Tegnologie' if af else 'Technology'
    elif rel.startswith('drawing-druid/'):
        subject, grade = 'EGD', ('Graad 10–12' if af else 'Grade 10–12')
    elif gnum >= 10 and '/life/' in rel:
        subject = 'Lewenswetenskappe' if af else 'Life Sciences'
    elif gnum >= 10 and len(parts) > 1:
        subject = parts[1]
    else:
        subject = 'Natuurwetenskappe' if af else 'Natural Sciences'
    level = f'{grade} {subject}'.strip()
    title = f'{h1} — {level} | {tool}' if level else f'{h1} | {tool}'
    if len(title) > 70 and level: title = f'{h1} — {level}'   # Google cuts long titles; the topic matters more than the brand
    desc = clip(sub or h1)
    return h1, title, desc, level, subject, grade


def build_block(rel, s, kind, title, desc, extra=None):
    af = rel.endswith('.af.html') or s[:400].find('lang="af"') >= 0
    lines = ['<!-- ml-seo: generated by scripts/seo-build.py, edit the script not this block -->']
    lines.append(f'<meta name="description" content="{attr(desc)}">')
    lines.append(f'<link rel="canonical" href="{url(rel)}">')
    tw = twin(rel)
    if tw:
        lines.append(f'<link rel="alternate" hreflang="en-ZA" href="{url(tw[0])}">')
        lines.append(f'<link rel="alternate" hreflang="af-ZA" href="{url(tw[1])}">')
        lines.append(f'<link rel="alternate" hreflang="x-default" href="{url(tw[0])}">')
    og = {'og:type': 'article' if kind == 'lesson' else 'website', 'og:site_name': 'The Magic Lab',
          'og:title': title, 'og:description': desc, 'og:url': url(rel), 'og:image': og_image(rel),
          'og:image:width': '1200', 'og:image:height': '630', 'og:locale': 'af_ZA' if af else 'en_ZA'}
    lines += [f'<meta property="{k}" content="{attr(v)}">' for k, v in og.items()]
    lines.append('<meta name="twitter:card" content="summary_large_image">')
    if extra:
        lines.append('<script type="application/ld+json">' + json.dumps(extra, ensure_ascii=False).replace('</', '<\\/') + '</script>')
    lines.append('<!-- /ml-seo -->')
    return '\n'.join(lines)


def charset_first(s):
    """<meta charset> must sit in the first 1024 bytes; put it first in <head>."""
    m = re.search(r'\s*<meta charset="[^"]*">', s)
    if not m or len(s[:m.start()].encode('utf-8')) < 900: return s
    tag = m.group().strip()
    s = s[:m.start()] + s[m.end():]
    h = re.search(r'<head[^>]*>', s)
    return s[:h.end()] + '\n  ' + tag + s[h.end():]


def put_block(s, block):
    s = charset_first(s)
    s = re.sub(r'\n?<!-- ml-seo:.*?<!-- /ml-seo -->', '', s, flags=re.S)
    m = re.search(r'</title>', s)
    return s[:m.end()] + '\n' + block + s[m.end():]


def set_title(s, title):
    return re.sub(r'<title>.*?</title>', '<title>' + attr(title).replace('&#x27;', '’') + '</title>', s, count=1, flags=re.S)


def set_flag(s, flag):
    """Declare window.<flag> just before require-auth.js loads."""
    if re.search(r'window\.ML(Public|Lesson)Preview\s*=\s*true', s):
        if flag == 'MLPublicPreview' or 'MLPublicPreview' in s: return s
        return re.sub(r'window\.MLLessonPreview\s*=\s*true', 'window.' + flag + ' = true', s)
    m = re.search(r'<script[^>]*src="[^"]*require-auth\.js"[^>]*></script>', s)
    if not m: return s
    return s[:m.start()] + f'<script>window.{flag} = true;</script>\n' + s[m.start():]


def lastmod(rel):
    try:
        out = subprocess.run(['git', 'log', '-1', '--format=%cs', '--', rel], cwd=ROOT, capture_output=True, text=True).stdout.strip()
        return out or None
    except Exception:
        return None


def main():
    changed, indexable = [], []
    # never mix generated changes into someone's unfinished edits
    dirty = set(l[3:].strip().strip('"') for l in subprocess.run(['git', 'status', '--porcelain'], cwd=ROOT,
                capture_output=True, text=True).stdout.splitlines() if l[:2].strip() == 'M')

    def save(rel, s, orig):
        # (a page this script has already processed is fair game: its pending changes are ours)
        if s != orig and rel in dirty and '<!-- ml-seo' not in orig:
            print('  skipped (has uncommitted changes):', rel)
            return
        if s != orig:
            changed.append(rel)
            if not CHECK: open(os.path.join(ROOT, rel), 'w', encoding='utf-8', newline='').write(s)

    for rel in lesson_pages():
        p = os.path.join(ROOT, rel)
        orig = s = open(p, encoding='utf-8').read()
        h1, title, desc, level, subject, grade = lesson_meta(rel, s)
        public = 'MLPublicPreview' in s
        af = rel.endswith('.af.html')
        tool = TOOLS[rel.split('/')[0]]
        hub = rel.split('/')[0] + '/index.html'
        ld = [{
            '@context': 'https://schema.org', '@type': 'LearningResource', 'name': h1, 'description': desc,
            'url': url(rel), 'inLanguage': 'af-ZA' if af else 'en-ZA', 'learningResourceType': 'Lesson',
            'educationalLevel': grade or None, 'provider': ORG, 'isAccessibleForFree': public,
            'educationalAlignment': {'@type': 'AlignmentObject', 'alignmentType': 'educationalSubject',
                                     'educationalFramework': 'CAPS', 'targetName': subject},
            'audience': {'@type': 'EducationalAudience', 'educationalRole': 'student'},
            'isPartOf': {'@type': 'WebSite', 'name': 'The Magic Lab', 'url': SITE + '/'},
        }, {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'The Magic Lab', 'item': SITE + '/'},
                {'@type': 'ListItem', 'position': 2, 'name': tool.strip(), 'item': url(hub)},
                {'@type': 'ListItem', 'position': 3, 'name': h1, 'item': url(rel)}]}]
        if not public:
            ld[0]['hasPart'] = {'@type': 'WebPageElement', 'isAccessibleForFree': False, 'cssSelector': '.ml-paywalled'}
        ld[0] = {k: v for k, v in ld[0].items() if v is not None}
        s = set_title(s, title)
        s = put_block(s, build_block(rel, s, 'lesson', title, desc, ld))
        if not public: s = set_flag(s, 'MLLessonPreview')
        save(rel, s, orig)
        indexable.append(rel)

    # public tool pages from scripts/build-tool-pages.py: their own title and description
    tool_pages = {'tools/' + f: (None, None) for f in sorted(os.listdir(os.path.join(ROOT, 'tools')))
                  if f.endswith('.html')} if os.path.isdir(os.path.join(ROOT, 'tools')) else {}
    for rel, (title, desc) in list(PAGES.items()) + list(HUBS.items()) + list(tool_pages.items()):
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p): continue
        orig = s = open(p, encoding='utf-8').read()
        if title: s = set_title(s, title)
        title = text(first(r'<title>(.*?)</title>', s))
        desc = desc or text(first(r'<meta\s+name="description"\s+content="(.*?)"', s)) or title
        ld = None
        if rel == 'index.html':
            ld = [dict(ORG, **{'@context': 'https://schema.org', 'description': desc, 'areaServed': 'ZA'}),
                  {'@context': 'https://schema.org', '@type': 'WebSite', 'name': 'The Magic Lab', 'url': SITE + '/', 'inLanguage': ['en-ZA', 'af-ZA']}]
        elif rel in HUBS:
            ld = {'@context': 'https://schema.org', '@type': 'CollectionPage', 'name': title, 'description': desc,
                  'url': url(rel), 'isPartOf': {'@type': 'WebSite', 'name': 'The Magic Lab', 'url': SITE + '/'}}
            s = set_flag(s, 'MLPublicPreview')
        # an existing hand-written description gives way to the generated one
        s = re.sub(r'\n?\s*<meta\s+name="description"\s+content="[^"]*">', '', s, count=1) if '<!-- ml-seo' not in s else s
        s = put_block(s, build_block(rel, s, 'page', title, desc, ld))
        save(rel, s, orig)
        indexable.append(rel)

    for rel, desc in SHARE_ONLY.items():
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p): continue
        orig = s = open(p, encoding='utf-8').read()
        title = text(first(r'<title>(.*?)</title>', s))
        s = re.sub(r'\n?\s*<meta\s+name="description"\s+content="[^"]*">', '', s, count=1) if '<!-- ml-seo' not in s else s
        s = put_block(s, build_block(rel, s, 'page', title, desc))
        save(rel, s, orig)

    for rel in NOINDEX:
        p = os.path.join(ROOT, rel)
        if not os.path.exists(p): continue
        orig = s = open(p, encoding='utf-8').read()
        if 'name="robots"' not in s:
            s = re.sub(r'(<meta charset="[^"]*">)', r'\1\n  <meta name="robots" content="noindex">', s, count=1)
        save(rel, s, orig)

    # sitemap: every indexable page, with its language twin
    items = []
    for rel in sorted(set(indexable), key=lambda r: (r != 'index.html', r)):
        alt = ''
        tw = twin(rel)
        if tw:
            alt = ''.join(f'\n    <xhtml:link rel="alternate" hreflang="{h}" href="{url(u)}"/>'
                          for h, u in (('en-ZA', tw[0]), ('af-ZA', tw[1]), ('x-default', tw[0])))
        lm = lastmod(rel)
        items.append(f'  <url>\n    <loc>{url(rel)}</loc>' + (f'\n    <lastmod>{lm}</lastmod>' if lm else '') + alt + '\n  </url>')
    sitemap = ('<?xml version="1.0" encoding="UTF-8"?>\n'
               '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
               + '\n'.join(items) + '\n</urlset>\n')
    robots = ('# The Magic Lab\n'
              'User-agent: *\n'
              'Disallow: /supabase/\n'
              'Disallow: /scripts/\n'
              'Disallow: /mockups/\n'
              'Disallow: /*.sql$\n'
              'Disallow: /*.md$\n'
              '\n'
              f'Sitemap: {SITE}/sitemap.xml\n')
    for name, body in (('sitemap.xml', sitemap), ('robots.txt', robots)):
        p = os.path.join(ROOT, name)
        old = open(p, encoding='utf-8').read() if os.path.exists(p) else None
        if old != body:
            changed.append(name)
            if not CHECK: open(p, 'w', encoding='utf-8', newline='\n').write(body)

    print(f'{len(indexable)} indexable pages, {len(changed)} files {"would change" if CHECK else "changed"}')


if __name__ == '__main__':
    main()
