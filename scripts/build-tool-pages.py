"""
The Magic Lab — public landing pages for the app-style tools.

    python scripts/build-tool-pages.py

The apps themselves (code-conjurer.html, robot-realm/index.html …) sit behind
sign-in, so search engines and signed-out visitors never see what they are.
This writes one public page per app at tools/<id>.html from the TOOLS data
below: what it teaches, its real lesson list, a screenshot (assets/tools/),
and a way in. require-auth.js sends signed-out visitors who open an app to
its page here. Afterwards run scripts/seo-build.py for the head tags.
Edit the data here, never the generated pages.
"""
import html, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://themagiclab.co.za'
e = lambda s: html.escape(s, quote=True)

TOOLS = [
  dict(id='code-conjurer', name='Code Conjurer', app='/code-conjurer.html', icon='wand-2', hue='conjurer',
    eyebrow='Grade 10–12 · Information Technology',
    title='Code Conjurer — Java for Grade 10–12 IT (IEB & CAPS), in the browser',
    desc='A Java editor and course in one for Grade 10, 11 and 12 Information Technology: variables to OOP, arrays, sorting and searching, recursion and exception handling, aligned to IEB and CAPS.',
    h1='Java for IT learners, right in the browser.',
    intro='Code Conjurer is a Java editor and a course in one. Learners write and run real Java without installing anything, and work through lesson tracks for Grades 10, 11 and 12 that follow the IEB and CAPS Information Technology curriculum, all the way to exam patterns and tips.',
    shot='The Java editor with the console and the quick reference.',
    features=[('play', 'Real Java, no installs', 'Write, run and debug Java in the browser, with keyboard input through Scanner and a variable inspector after every run.'),
              ('layers', 'A track for each grade', 'Separate lesson tracks for Grade 10, 11 and 12, each building on the last.'),
              ('target', 'Practice after every lesson', 'Coding challenges follow each lesson, so the idea is used straight away.'),
              ('bug', 'Read code like an examiner', 'Predict-the-output and spot-the-bug quizzes train the reading skills exams test.')],
    topics=[('Grade 10', ['What is Java?', 'Variables and data types', 'Operators and expressions', 'if / else if / else', 'The switch statement', 'for loops', 'while and do-while loops', '1D arrays', 'String methods', 'Writing and calling methods']),
            ('Grade 11', ['2D arrays', 'Bubble sort', 'Linear and binary search', 'Classes and objects', 'Arrays of objects', 'private fields, getters and setters']),
            ('Grade 12', ['Inheritance', 'Polymorphism and @Override', 'try / catch / finally', 'Recursion', 'IEB exam patterns and tips'])],
    faq=[('Do learners need to install Java?', 'No. Code Conjurer runs Java in the browser, so it works on school computers and Chromebooks where installing software is not allowed. A keyboard makes coding much easier than a phone.'),
         ('Which curriculum does it follow?', 'The lessons follow Information Technology for Grades 10 to 12, for both IEB and CAPS schools, and finish with the question patterns that appear in IEB exams.')],
    related=['java-genie', 'web-wizard', 'ai-oracle']),

  dict(id='ai-oracle', name='AI Oracle', app='/ai-oracle.html', icon='sparkles', hue='oracle',
    eyebrow='Grade 8–12 · AI literacy',
    title='AI Oracle — Learn how AI works, how to prompt, and how to use it ethically (Grade 8–12)',
    desc='A short course for Grade 8–12 learners: how AI, neural networks and large language models like ChatGPT work, how to write good prompts, and how to use AI honestly for schoolwork.',
    h1='Understand AI before you lean on it.',
    intro='AI Oracle is a nine-lesson course that explains what AI is and how chatbots like ChatGPT, Claude and Gemini actually work, teaches the craft of a good prompt, and spends a whole unit on using AI honestly: academic integrity, checking what it tells you, and studying with it rather than letting it do the work.',
    shot='A lesson from Unit 1, How AI Works.',
    features=[('brain', 'How it really works', 'Machine learning, neural networks and large language models explained without hype, with South African examples.'),
              ('message-square', 'Prompting as a skill', 'The parts of a good prompt, the techniques that improve answers, and an interactive prompt builder.'),
              ('shield-check', 'Ethics that matter at school', 'Academic integrity, verifying AI answers, and using AI as a study partner, not a ghost-writer.'),
              ('list-checks', 'Reviews and progress', 'A review at the end of each unit, and progress that is saved as learners go.')],
    topics=[('Unit 1 · How AI Works', ['What is artificial intelligence?', 'Neural networks and training', 'Large language models']),
            ('Unit 2 · The Art of Prompting', ['Anatomy of a good prompt', 'Prompt techniques', 'Build your own prompt']),
            ('Unit 3 · AI Ethics in Education', ['AI and academic integrity', 'Verify, question, think', 'AI as your study partner'])],
    faq=[('Do learners need an AI account to take the course?', 'No. Everything is explained and practised inside AI Oracle itself; nobody needs to sign up for ChatGPT or any other AI service.'),
         ('Who is it for?', 'Learners from Grade 8 to 12, and it works well as a short unit before a school starts allowing AI for projects and research.')],
    related=['computer-codex', 'code-conjurer', 'java-genie']),

  dict(id='java-genie', name='Java Genie', app='/java-genie.html', icon='code-2', hue='java',
    eyebrow='Grade 8–9 · Coding',
    title='Java Genie — Learn Java with turtle graphics (Grade 8–9)',
    desc='Learners write real Java and watch it draw: a turtle-graphics editor with a built-in step-by-step tutorial, an advanced course on errors, decisions, loops and methods, and coding challenges. Grade 8–9.',
    h1='Write real Java. Watch it draw.',
    intro='Java Genie teaches Java through turtle graphics: every line of code moves a pen on the drawing board, so learners see exactly what their program does. A built-in tutorial goes from the first variable to drawing a windmill, and an advanced course takes them through reading errors, if / else, while loops and writing their own methods.',
    shot='A for loop drawing a square on the drawing board.',
    features=[('pen-tool', 'Code you can see', 'Turtle graphics turn loops and variables into shapes, so mistakes are visible straight away.'),
              ('graduation-cap', 'A tutorial built in', 'Fifteen guided steps from "What is Java?" to a capstone windmill drawing.'),
              ('zap', 'Challenges', 'Drawing challenges that test what learners can do on their own.'),
              ('save', 'Save and continue', 'Programs are saved, so work carries over from one lesson to the next.')],
    topics=[('Learn Java', ['What is Java?', 'Variables', 'Creating an object and calling a method', 'Sequences', 'Repeating with a for loop', 'Drawing a square, stairs and a heartbeat', 'Nested loops and variables', 'Capstone: drawing a house and a windmill']),
            ('Advanced Java', ['Reading error messages', 'Missing semicolons and mismatched braces', 'Unknown variables and classes', 'Infinite loops', 'Making decisions with if / else', 'The while loop', 'Writing your own methods', 'Methods with parameters'])],
    faq=[('Is it real Java?', 'Yes. Learners write standard Java classes and methods; the drawing pen is just an object they control, which makes the step to Grade 10 IT smaller.'),
         ('Do learners need to install anything?', 'No, it runs in the browser on school computers and Chromebooks.')],
    related=['code-conjurer', 'web-wizard', 'robot-realm']),

  dict(id='computer-codex', name='Computer Codex', app='/computer-codex.html', icon='book-open', hue='codex',
    eyebrow='Grade 8–12 · Coding & Robotics, CAT and IT · CAPS & IEB',
    title='Computer Codex — CAT, IT theory and Coding & Robotics lessons, Grades 8–12 (CAPS & IEB)',
    desc='160 theory lessons in five tracks: Coding & Robotics for Grades 8–9, and Computer Applications Technology and Information Technology for Grades 10–12, each written separately for CAPS and IEB, with a quiz in every lesson.',
    h1='The theory behind CAT, IT and Coding & Robotics.',
    intro='Computer Codex holds the theory side of three computing subjects in one place: Coding & Robotics for Grades 8 and 9, and Computer Applications Technology and Information Technology for Grades 10 to 12, with separate CAPS and IEB tracks for both. That is 160 lessons, from using Windows and Excel to networks, databases, OOP, cybercrime and the law, each ending in a quiz.',
    shot='Lesson 1 of the Coding & Robotics track. Learners pick their subject and grade at the top.',
    features=[('library', 'Five tracks, one tool', 'Coding & Robotics, CAT (CAPS and IEB) and IT (CAPS and IEB), chosen from the subject and grade menu.'),
              ('git-branch', 'CAPS and IEB written separately', 'The CAPS and IEB tracks follow their own curricula and terminology, not one text relabelled.'),
              ('layers', 'Grade by grade', 'Each senior track runs through Grade 10, 11 and 12, with units for every strand of the subject.'),
              ('check-circle', 'A quiz with every lesson', 'Each lesson ends in a quiz with an explanation for every answer; 70% completes it.')],
    topics=[('Coding & Robotics · Gr 8–9 · 27 lessons', ['Windows, files and file extensions', 'Word and Excel: formulas, COUNTIF and SUMIF, absolute references, charts', 'Computational thinking: decomposition, patterns, abstraction, algorithms', 'Pseudo code and flow diagrams', 'AI, machine learning and large language models']),
            ('CAT · Gr 10–12 · CAPS (30) and IEB (29)', ['Systems technologies: hardware, software, choosing systems, troubleshooting', 'Network and internet technologies: LANs, WANs, the web, cloud and IoT', 'Solution development: spreadsheets, databases and HTML', 'Information management and preparing for the PAT', 'Social implications: ergonomics, green computing, security, ethics and the law']),
            ('IT theory · Gr 10–12 · CAPS (36) and IEB (38)', ['Systems technologies: number systems, the CPU and machine cycle, operating systems and virtualisation', 'Communication technologies: networks, topologies, mobile and wireless', 'Solution development: algorithms, OOP and GUI programming, arrays, file handling, software engineering', 'Data and information management: relational databases, SQL, big data and data mining', 'Social implications: cybercrime, privacy, the deep web and emerging technology'])],
    faq=[('Which subjects and curricula does it cover?', 'Coding & Robotics (Grades 8–9), and Computer Applications Technology and Information Technology (Grades 10–12) for both CAPS and IEB schools. Learners choose their subject and grade inside the tool.'),
         ('Is the IT programming practical in here too?', 'Computer Codex is the theory. For Java practicals, IT learners use Code Conjurer, which has its own Grade 10–12 lessons and a Java editor in the browser.')],
    related=['code-conjurer', 'ai-oracle', 'web-wizard']),

  dict(id='web-wizard', name='Web Wizard', app='/web-wizard.html', icon='globe', hue='web',
    eyebrow='Grade 8–9 · Coding',
    title='Web Wizard — Learn HTML and CSS with a live preview (Grade 8–9)',
    desc='Learners build web pages in HTML and CSS and see them change as they type: a code editor with a live preview at phone, tablet and desktop size, a guided tutorial and example templates. Grade 8–9.',
    h1='Build websites. See them live.',
    intro='Web Wizard puts an HTML and CSS editor next to a live preview, so every change shows up as learners type. A guided tutorial covers page structure, styling, classes, flexbox layout and colour, and the preview switches between phone, tablet and desktop sizes so learners see why responsive design matters.',
    shot='The editor and the live preview of a starter page.',
    features=[('eye', 'Live preview', 'The page updates as learners type, with no save-and-refresh loop.'),
              ('book-open', 'Guided tutorial', 'Seven steps from "What is HTML?" to building their own page.'),
              ('layout-template', 'Example templates', 'Start from working examples and change them, which is how most people learn the web.'),
              ('smartphone', 'Phone, tablet and desktop', 'Preview the page at three screen sizes.')],
    topics=[('Learn HTML & CSS', ['What is HTML?', 'The structure of a web page', 'Adding style with CSS', 'Using classes', 'Layout with flexbox', 'Colours in CSS', 'Now build something!'])],
    faq=[('Is a server or hosting needed?', 'No. Everything runs in the browser; learners can save their work and load it again later.'),
         ('Who is it for?', 'Grade 8–9 learners meeting web design for the first time, and older learners who need a quick way to try HTML and CSS.')],
    related=['code-conjurer', 'java-genie', 'computer-codex']),

  dict(id='robot-realm', name='Robot Realm', app='/robot-realm/index.html', icon='cpu', hue='robot',
    eyebrow='Grade 8–12 · Robotics',
    title='Robot Realm — Program a simulated robot with blocks or JavaScript (Grade 8–12)',
    desc='A robot simulator for Coding & Robotics: program a robot in blocks or JavaScript, read its distance, line and colour sensors, and solve mazes, line-following tracks and obstacle courses. No hardware needed.',
    h1='Robotics, without the robot.',
    intro='Robot Realm gives every learner a robot to program. They write code in blocks or JavaScript to drive its motors, read its distance, line and colour sensors, and solve arenas from an empty floor to mazes, line-following tracks and tight squeezes, in a 2D or 3D view.',
    shot='A block program and the arena with the robot’s sensors.',
    features=[('blocks', 'Blocks or JavaScript', 'Start with drag-and-drop blocks and move on to typed JavaScript in the same tool.'),
              ('radar', 'Real sensors', 'Front, left and right distance sensors, three line sensors and a colour sensor.'),
              ('map', 'Seven arenas', 'Empty arena, maze, line follow, chicane, asteroid field, tight squeeze and colour zones.'),
              ('box', '2D and 3D views', 'Watch the run from above or in 3D, step through a program, and speed it up or slow it down.')],
    topics=[('Programming the robot', ['Moving forward and back, turning by degrees', 'Loops, logic, maths and variables', 'Reading distance, line and colour sensors', 'Setting speed and logging to the console']),
            ('Arenas', ['Empty arena', 'Maze', 'Line follow', 'Chicane', 'Asteroid field', 'Tight squeeze', 'Colour zones'])],
    faq=[('Do we need robot kits?', 'No. Robot Realm is a simulator, so every learner can program a robot at the same time; it is a good way in before a school buys kits.'),
         ('Is it the same as Spike Spellcaster?', 'No. Spike Spellcaster programs a real LEGO SPIKE Prime in Python; Robot Realm is a general robot simulator in blocks and JavaScript.')],
    related=['spike-spellcaster', 'java-genie', 'code-conjurer']),

  dict(id='spike-spellcaster', name='Spike Spellcaster', app='/spike-spellcaster/index.html', icon='bot', hue='spike',
    eyebrow='Grade 4–9 · Robotics · WRO RoboMission',
    title='Spike Spellcaster — Code LEGO SPIKE Prime in Python or blocks, with a simulator (WRO)',
    desc='Program a LEGO SPIKE Prime in Python or blocks: practise on a simulated robot with distance, colour and force sensors, then connect a real hub over Bluetooth. Built for WRO RoboMission, Grades 4–9.',
    h1='Code your SPIKE Prime. Test it before the table.',
    intro='Spike Spellcaster is a coding environment for the LEGO SPIKE Prime. Learners program in blocks or Python, test their code on a simulated robot with the same drive base, sensors and light matrix, and when it works, connect their real hub over Bluetooth and run it there. It was built with WRO RoboMission teams in mind.',
    shot='A block program running on the simulated mission table.',
    features=[('code-xml', 'Python or blocks', 'Blocks for beginners and SPIKE Python for teams that are ready; both drive the same robot.'),
              ('gamepad-2', 'A simulator first', 'Drive base, distance, colour and force sensors and the 5×5 light matrix, all simulated.'),
              ('bluetooth', 'Then the real hub', 'Connect a SPIKE Prime hub over Bluetooth and run the same program on the robot.'),
              ('flag', 'Mission tables', 'Free play, line track, obstacle slalom and colour zones.')],
    topics=[('Programming', ['Driving straight and pivoting the drive base', 'Motors and accuracy', 'Distance, colour, reflection and force sensors', 'The light matrix and the speaker', 'Loops, logic, maths and variables']),
            ('Missions', ['Free play table', 'Line track', 'Obstacle slalom', 'Colour zones'])],
    faq=[('Do we need a SPIKE Prime to use it?', 'No. The simulator works on its own; a real hub is only needed to run the program on the robot.'),
         ('Which browsers can connect to the hub?', 'Connecting over Bluetooth needs a browser with Web Bluetooth, such as Chrome or Edge on a laptop or Chromebook.')],
    related=['robot-realm', 'java-genie', 'web-wizard']),

  dict(id='time-turner', name='Time Turner', app='/time-turner.html', icon='hourglass', hue='turner',
    eyebrow='All grades · Time management',
    title='Time Turner — A weekly time-management planner for learners',
    desc='Learners map school, homework, activities, meals, chores and rest across their school’s 10-day timetable, add tests and assessments, and print a time-management plan with tips built around the gaps it finds.',
    h1='A plan for the week you actually have.',
    intro='Time Turner helps learners see where their time goes. They map school, homework, sport, meals, chores and rest across their school’s 10-day timetable, add the tests and assessments coming up, and get a printable plan with tips built around the gaps it finds, from their own schedule and without AI.',
    shot='The two-week planner with suggested open-time blocks.',
    features=[('calendar-days', 'Built on the school timetable', 'Works with a 10-day cycle as well as the things that happen on the same day every week.'),
              ('clipboard-list', 'Assessments in view', 'Tests and assignments sit in the same plan as everything else.'),
              ('lightbulb', 'Suggestions from the learner’s own week', 'Open time is spotted and suggested from their schedule, with no AI involved.'),
              ('printer', 'Print and share', 'Export a time-management plan to print or keep.')],
    topics=[('What learners plan', ['School and academics', 'Homework and study', 'Extracurriculars and exercise', 'Family time and meals', 'Chores', 'Rest and sleep', 'Free time'])],
    faq=[('Who is it for?', 'Any learner who feels there is never enough time, and teachers or parents helping them build a routine.'),
         ('Does it use AI?', 'No. The suggestions come from the learner’s own schedule.')],
    related=['ai-oracle', 'computer-codex', 'spike-spellcaster']),
]
BY_ID = {t['id']: t for t in TOOLS}
# hubs that already have public pages, for "other tools" links
OTHER = {'science-sage': ('Science Sage', '/science-sage/index.html', 'microscope', 'science'),
         'math-magician': ('Math Magician', '/math-magician/index.html', 'calculator', 'math')}


def page(t):
    tid = t['id']
    groups = ''.join(f'<div class="tl-group"><h3>{e(g)}</h3><ul>' + ''.join(f'<li>{e(i)}</li>' for i in items) + '</ul></div>' for g, items in t['topics'])
    feats = ''.join(f'<div class="tl-feat"><span class="tl-ficon"><i data-lucide="{ic}"></i></span><h3>{e(h)}</h3><p>{e(p)}</p></div>' for ic, h, p in t['features'])
    faq = list(t['faq']) + [('How much does it cost?', f'{t["name"]} is one of thirteen tools on The Magic Lab. Start with a free account; full access to every tool is one plan, and schools can get a quote for all their learners and teachers.')]
    faqs = ''.join(f'<details class="tl-q"><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q, a in faq)
    rel = ''
    for r in t['related']:
        o = BY_ID.get(r)
        name, href, icon, hue = (o['name'], f'/tools/{r}.html', o['icon'], o['hue']) if o else OTHER[r]
        blurb = o['h1'] if o else ''
        rel += f'<a class="tl-rel" href="{href}" style="--fam: var(--t-{hue})"><span class="tl-ficon"><i data-lucide="{icon}"></i></span><span><strong>{e(name)}</strong><span>{e(blurb)}</span></span></a>'
    ld = {'@context': 'https://schema.org', '@type': 'WebPage', 'name': t['title'], 'description': t['desc'],
          'url': f'{SITE}/tools/{tid}.html',
          'about': {'@type': 'SoftwareApplication', 'name': t['name'], 'applicationCategory': 'EducationalApplication',
                    'operatingSystem': 'Web browser', 'url': SITE + t['app']},
          'breadcrumb': {'@type': 'BreadcrumbList', 'itemListElement': [
              {'@type': 'ListItem', 'position': 1, 'name': 'The Magic Lab', 'item': SITE + '/'},
              {'@type': 'ListItem', 'position': 2, 'name': t['name'], 'item': f'{SITE}/tools/{tid}.html'}]}}
    ldjson = json.dumps(ld, ensure_ascii=False).replace('</', '<\\/')
    nxt = e(t['app'])
    return f'''<!doctype html>
<!-- © 2026 Ruhan Janse van Rensburg. All rights reserved. -->
<!-- Generated by scripts/build-tool-pages.py: edit the TOOLS data there, not this file. -->
<html lang="en">
<head>
  <meta charset="UTF-8">
<script src="/assets/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#08090b">
  <title>{e(t['title'])}</title>
  <meta name="description" content="{e(t['desc'])}">
  <link rel="icon" type="image/svg+xml" href="/assets/logo-prism.svg">
  <link rel="preconnect" href="https://api.fontshare.com">
  <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800,900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="/assets/vendor/lucide-1.56.0.min.js"></script>
  <link rel="stylesheet" href="/assets/magic-lab.css">
  <link rel="stylesheet" href="/assets/tool-landing.css">
  <link rel="stylesheet" href="/auth-modal.css">
  <script type="application/ld+json">{ldjson}</script>
</head>
<body style="--fam: var(--t-{t['hue']})">
  <a class="ml-skip" href="#ml-main">Skip to content</a>
  <nav class="ml-nav" id="site-nav">
    <div class="ml-shell ml-nav-inner">
      <a class="tool-brand" href="/index.html"><img src="/assets/logo-prism.svg" alt="" width="26" height="26">The Magic Lab</a>
      <div class="ml-nav-right">
        <a class="ml-pill" href="/index.html#catalogue"><i data-lucide="layout-grid"></i>All tools</a>
        <button class="ml-pill ml-pill--solid ml-auth-btn" data-ml-auth onclick="window.MagicLabModal?.open()">Sign in</button>
      </div>
    </div>
  </nav>

  <main id="ml-main" tabindex="-1">
    <section class="ml-shell tl-lead">
      <div class="tl-name"><span class="tl-icon"><i data-lucide="{t['icon']}"></i></span>{e(t['name'])}</div>
      <div class="tl-eyebrow ml-label"><span class="dot"></span>{e(t['eyebrow'])}</div>
      <h1>{e(t['h1'])}</h1>
      <p>{e(t['intro'])}</p>
      <div class="tl-cta" data-tl-cta data-app="{nxt}" data-name="{e(t['name'])}">
        <a class="ml-btn ml-btn--primary" href="/index.html?auth=required&amp;mode=signup&amp;next={nxt}" data-tl-primary>Create a free account</a>
        <a class="ml-btn ml-btn--ghost" href="/index.html?auth=required&amp;next={nxt}" data-tl-secondary>Sign in</a>
      </div>
      <p class="tl-note">Runs in any modern browser. Nothing to install.</p>
    </section>

    <section class="ml-shell">
      <figure class="tl-shot">
        <img src="/assets/tools/{tid}.jpg" width="1440" height="900" alt="{e(t['name'])}: {e(t['shot'])}" loading="eager">
        <figcaption>{e(t['shot'])}</figcaption>
      </figure>
    </section>

    <section class="ml-shell tl-section">
      <h2>What learners do</h2>
      <div class="tl-feats">{feats}</div>
    </section>

    <section class="ml-shell tl-section">
      <h2>What&rsquo;s inside</h2>
      <div class="tl-groups">{groups}</div>
    </section>

    <section class="ml-shell tl-section">
      <h2>Questions</h2>
      <div class="tl-faq">{faqs}</div>
    </section>

    <section class="ml-shell tl-section">
      <h2>Other tools</h2>
      <div class="tl-rels">{rel}</div>
    </section>
  </main>

  <footer class="ml-footer">
    <div class="ml-shell ml-footer-inner">
      <div>
        <div class="ml-footer-brand"><img src="/assets/logo-prism.svg" alt="">The Magic Lab</div>
        <p class="ml-footer-line">{e(t['name'])} is one of thirteen browser-based STEM tools for South African schools.</p>
      </div>
      <div class="ml-footer-links">
        <a href="/index.html">All tools</a><a href="/pitch.html">About</a><a href="/pricing.html">Pricing</a><a href="/terms.html">Terms</a><a href="/privacy.html">Privacy</a>
      </div>
      <div class="ml-footer-legal ml-label">© 2026 Ruhan Janse van Rensburg · All rights reserved</div>
    </div>
  </footer>

<script defer src="/auth.js"></script>
<script defer src="/auth-modal.js"></script>
<script>
  if (window.lucide) lucide.createIcons();
  // Signed in already: the way in is the tool itself, not a sign-up form.
  document.addEventListener('magiclab:auth:ready', (ev) => {{
    if (!ev.detail || !ev.detail.profile) return;
    const box = document.querySelector('[data-tl-cta]');
    const p = box.querySelector('[data-tl-primary]');
    p.href = box.dataset.app;
    p.textContent = 'Open ' + box.dataset.name;
    box.querySelector('[data-tl-secondary]').remove();
  }});
  (function () {{
    const nav = document.getElementById('site-nav');
    const sync = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
    sync(); window.addEventListener('scroll', sync, {{ passive: true }});
  }})();
</script>
<script src="/contact-button.js" defer></script>
</body>
</html>
'''


def main():
    os.makedirs(os.path.join(ROOT, 'tools'), exist_ok=True)
    for t in TOOLS:
        open(os.path.join(ROOT, 'tools', t['id'] + '.html'), 'w', encoding='utf-8', newline='\n').write(page(t))
    print(len(TOOLS), 'tool pages written')


if __name__ == '__main__':
    main()
