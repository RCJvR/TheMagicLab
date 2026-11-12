// ============================================================
// THE MAGIC LAB — tool-welcome.js
// A short welcome guide for every tool: three steps for learners and three
// for teachers ("how to introduce this to a class in a minute").
//
// - Shown once, on a learner's or teacher's first visit to a tool (except
//   where auto is false, e.g. tools used live in front of a class). Closing
//   it counts as seen; the Help button in the shared header (assets/ml-bar.js)
//   opens it again at any time.
// - Opens on the teacher steps for teacher accounts.
// - The tool comes from the shared header (data-ml-bar), <body data-tool-id>,
//   or the page path.
//
// API: MagicLabWelcome.has(id), .show(id, audience?), .reset(id)
// ============================================================
(function () {
  if (window.MagicLabWelcome) return;

  // [title, one line] × 3 for learners (steps) and teachers (teach).
  const TOOL_CONFIG = {
    'code-conjurer': { name: 'Code Conjurer', grade: 'Grade 10–12 IT', steps: [
        ['Pick your grade and a lesson', 'Choose Grade 10, 11 or 12 under Lessons, then open a lesson. Each one explains an idea and gives you code to try.'],
        ['Write and run Java', 'Type in the editor and press Run. The output appears beside your code.'],
        ['Save your work', 'Save downloads your program as a .java file; Load opens it again on any device.']],
      teach: [
        ['Start from an example', 'Open Examples and run one on the board, so learners see a whole program work before they write their own.'],
        ['Set it as homework', 'Create an assignment for Code Conjurer from your teacher dashboard.'],
        ['Use it for the PAT', 'It runs real Java in the browser, so learners can practise the practical without installing anything.']] },
    'java-genie': { name: 'Java Genie', grade: 'Grade 8–9', steps: [
        ['Open Learn Java', 'The guided tutorial starts from your first line of Java and builds up to loops and methods.'],
        ['Write code, watch it draw', 'Type turtle commands in the editor and press Run code. The turtle draws your program on the board.'],
        ['Try a challenge', 'Challenges ask you to draw a shape with as little code as you can. Save and Load keep your programs.']],
      teach: [
        ['Run an example first', 'Open Examples, run the star or the house on the board, and change one number together.'],
        ['One idea per lesson', 'The tutorial follows sequence, loops, then methods: one step per period works well in Grade 8.'],
        ['Track who has done what', 'Completed tutorial steps show in the class table on your teacher dashboard.']] },
    'web-wizard': { name: 'Web Wizard', grade: 'Grade 8–9', steps: [
        ['Open Learn HTML', 'The guided lessons cover tags, structure, CSS styling, classes and Flexbox, one step at a time.'],
        ['Type and see it live', 'Write HTML and CSS on the left; the preview on the right updates as you type.'],
        ['Check other screens', 'Switch the preview between desktop, tablet and phone sizes. Save downloads your page as an .html file.']],
      teach: [
        ['Start from a template', 'Open Examples and change the colours or text of one together, so learners see cause and effect straight away.'],
        ['No server needed', 'Everything runs in the browser, so it works on Chromebooks and school laptops without setup.'],
        ['Set it as homework', 'Create an assignment for Web Wizard from your teacher dashboard.']] },
    'computer-codex': { name: 'Computer Codex', grade: 'Grade 8–12', steps: [
        ['Choose your subject and grade', 'Coding & Robotics (Gr 8–9), or CAT or IT (Gr 10–12) in CAPS or IEB tracks. Pick yours at the top of the sidebar.'],
        ['Read, then try it', 'Lessons include working models, like a Windows desktop or a small word processor, to practise on.'],
        ['Pass the quiz', 'Each lesson ends with a quiz. Score 70% or more to complete the lesson.']],
      teach: [
        ['Theory without a computer lab', 'Lessons are short and work on a phone or a laptop.'],
        ['See the class results', 'Your dashboard shows each learner\'s quiz score, the lessons to reteach and the wrong answers the class shares.'],
        ['Assign a lesson', 'Set lessons for the whole class, or only for learners who are weak in them.']] },
    'ai-oracle': { name: 'AI Oracle', grade: 'Grade 8–12', steps: [
        ['Nine lessons in three units', 'How AI works, how to write good prompts, and how to use AI honestly at school.'],
        ['Try the interactive parts', 'Move the sliders on the neuron, sort the prompts and fill in the blanks as you read.'],
        ['Check yourself', 'Each lesson has a knowledge check. Your progress is shown at the top.']],
      teach: [
        ['One lesson per period', 'Read and try a lesson together, then discuss what the AI got right or wrong.'],
        ['Use it before projects', 'Unit 3 on academic integrity works well just before learners start an assignment.'],
        ['See who finished', 'Completed lessons show in the class table on your teacher dashboard.']] },
    'model-mage': { name: 'Model Mage', grade: 'Grade 9–12', steps: [
        ['Choose a workshop', 'The CAD workshop sketches and extrudes 3D parts; the Circuit Simulator wires up real components.'],
        ['Build step by step', 'In CAD, sketch a closed shape, then extrude it. In circuits, drag parts onto the board and connect them.'],
        ['Save and export', 'Save keeps your work as a file. CAD parts export as STL for a 3D printer.']],
      teach: [
        ['Start from an example', 'Load an example circuit or a 3D model and take it apart together.'],
        ['Best on a computer', 'Use a mouse and a larger screen; a phone is too small for CAD.'],
        ['Link it to the PAT', 'Learners can design and test a part or circuit before they build it.']] },
    'drawing-druid': { name: 'Drawing Druid', grade: 'Grade 10–12 EGD', auto: false, steps: [
        ['Pick a chapter', 'Chapters follow the EGD syllabus: geometry, loci and cams, orthographic, isometric, perspective and more.'],
        ['Build each drawing step by step', 'Use Next to add one line at a time, and Lines on or off to compare with the finished drawing.'],
        ['Then draw it yourself', 'Each chapter ends with drawings to do on paper, with a self-check.']],
      teach: [
        ['Project the steps', 'Step through a construction on the board while learners draw along.'],
        ['Release course drawings', 'Course drawings can be released to a class from your teacher dashboard.'],
        ['Still being built', 'Drawing Druid is in preview: check new constructions against your textbook before relying on them.']] },
    'science-sage': { name: 'Science Sage', grade: 'Grade 7–12', steps: [
        ['Choose your grade and a lesson', 'Natural Sciences for Grade 7 to 9; Life and Physical Sciences for Grade 10 to 12.'],
        ['Read, explore, practise', 'Each lesson has four tabs: Lesson, Explore (a simulation), Practice (a quiz) and Workbook.'],
        ['Predict first', 'Before each simulation, write down what you think will happen, then test it.']],
      teach: [
        ['Open the Teacher toolbox', 'Find circuit builders, motion and reaction graphs and more for the board.'],
        ['See what to reteach', 'Your dashboard shows the class\'s accuracy per lesson and the wrong answers learners share.'],
        ['Assign lessons', 'Set a lesson for a class, or only for the learners who need it.']] },
    'math-magician': { name: 'Math Magician', grade: 'Grade 8–12', steps: [
        ['Choose your grade, then a topic', 'Topics follow the CAPS order for your grade.'],
        ['Lesson, practice, workbook', 'Read the lesson with worked examples, practise with questions that mark themselves, then try the workbook.'],
        ['Watch your weak spots', 'Topics under 70% are marked, so you know what to practise next.']],
      teach: [
        ['Open the Teacher Toolbox', 'Graph plotters, a geometry sketcher and worksheet tools for the board.'],
        ['See the class\'s level', 'Your dashboard shows accuracy per CAPS cognitive level and the topics to reteach.'],
        ['Assign a topic', 'Set a topic for the learners who are weak in it, straight from the results.']] },
    'spike-spellcaster': { name: 'Spike Spellcaster', grade: 'Grade 4–9', steps: [
        ['Choose blocks or Python', 'Snap blocks together, or type Python. Both drive the same robot.'],
        ['Try a mission in the simulator', 'Pick a mission on the right and press Run to watch the robot drive.'],
        ['Then use a real robot', 'Connect Hub links a LEGO SPIKE Prime over Bluetooth to run your program on it.']],
      teach: [
        ['No robot for every learner?', 'The simulator lets the whole class code while groups take turns on the real hub.'],
        ['Built for WRO RoboMission', 'The missions practise line following, obstacles and colour zones.'],
        ['Best on a computer', 'Bluetooth to the hub needs Chrome or Edge on a laptop or desktop.']] },
    'tech-tower': { name: 'The Tech Tower', grade: 'Grade 8–9', steps: [
        ['Choose your grade and a lesson', 'Structures, mechanical systems, electrical systems and processing, in CAPS order.'],
        ['Read, explore, practise', 'Each lesson has a simulation to try in the Explore tab and a quiz in Practice.'],
        ['Predict, then test', 'Say what you think will happen before you move a gear, a load or a switch.']],
      teach: [
        ['A simulation for every lesson', 'Project the Explore tab when you introduce gears, levers or circuits.'],
        ['See what to reteach', 'Your dashboard shows accuracy per lesson and shared wrong answers.'],
        ['Assign a lesson', 'Set a lesson as homework before or after the practical.']] },
    'robot-realm': { name: 'Robot Realm', grade: 'Grade 8–12', steps: [
        ['Pick a map', 'Choose an arena on the right: a maze, a line to follow, obstacles and more.'],
        ['Code the robot', 'Use blocks, or switch to JavaScript, to move, turn and read the sensors.'],
        ['Run and improve', 'Press Run. Reach the goal faster and with fewer bumps for a higher score.']],
      teach: [
        ['No kits needed', 'Every learner programs a robot at the same time in the simulator.'],
        ['Start with blocks', 'Learners who struggle with typing can use blocks; the ideas are the same.'],
        ['Best on a computer', 'The arena and code side by side need a larger screen.']] },
    'time-turner': { name: 'Time Turner', grade: 'Every grade', steps: [
        ['Add your week', 'Add blocks for school, homework, sport, chores, meals and rest.'],
        ['See what is missing', 'Your two weeks at a glance show where there is no time to study or to rest.'],
        ['Print your plan', 'Export a plan built around the gaps, to put on your wall.']],
      teach: [
        ['A study-skills lesson', 'Learners fill in their own week in one period, then compare in pairs.'],
        ['Before exams', 'Use it with Exam Enchanter to plan study around the exam timetable.'],
        ['Free for everyone', 'Learners need only a free account.']] },
    'timer-talisman': { name: 'Timer Talisman', grade: 'Every grade', auto: false, steps: [
        ['Choose a timer', 'Pomodoro, countdown, clock, stopwatch or exam timer.'],
        ['Set it up', 'For an exam, add the subject, date, reading time and instructions.'],
        ['Show it full screen', 'Open in a new tab for the board or projector. Space starts and pauses; F fills the screen.']],
      teach: [
        ['Exam sessions', 'Fill in from the exam timetable, then project it for the whole venue.'],
        ['Answer sheet layout', 'The Answer sheet button shows learners how to set out their answer sheet.'],
        ['Free, no sign-in', 'Share the link with colleagues; nothing to install.']] },
    'exam-enchanter': { name: 'Exam Enchanter', grade: 'Grade 8–11', steps: [
        ['Choose your grade, add your subjects', 'Your exams appear on the calendar.'],
        ['Plan study sessions', 'Click an empty slot to add a study session or a break, and drag it to fit.'],
        ['Save it as a wallpaper', 'Save my plan makes a phone or computer wallpaper, or a PDF.']],
      teach: [
        ['Ten minutes in class', 'Learners build their plan in a register or study period before exams.'],
        ['Check the dates', 'Exam dates come from the school timetable; learners should check them against their own.'],
        ['Free, no sign-in', 'Nothing is stored online; the plan stays on the learner\'s device.']] },
    'arena': { name: 'The Arena', grade: 'Live quiz', auto: false, steps: [
        ['Get the code from your teacher', 'Type the six-letter Arena code and your name.'],
        ['Answer fast', 'Both speed and accuracy count towards your score.'],
        ['Watch the leaderboard', 'See where you stand after every question.']],
      teach: [
        ['Host from your dashboard', 'Open The Arena tab, pick a tool and topics, and launch a round.'],
        ['Questions from the lessons', 'Questions come from each lesson\'s own knowledge check.'],
        ['Use it to revise', 'A five-minute round at the start or end of a lesson.']] },
    'memory-mirror': { name: 'Memory Mirror', grade: 'Grade 12', steps: [
        ['Choose a subject and topics', 'Revise by paper, by term or by topic.'],
        ['Rate each card', 'Didn\'t know, Unsure or Knew it. Cards you miss come back sooner.'],
        ['Print if you prefer', 'Print the cards to cut out, or a revision list.']],
      teach: [
        ['A starter or a plenary', 'Five minutes of cards on the board, with the class answering out loud.'],
        ['Printed packs', 'Print a topic as cut-out cards for learners without devices.'],
        ['Written from the lessons', 'Cards follow the Science Sage lessons, so they match what you teach.']] },
    'test-tome': { name: 'Test Tome', grade: 'Grade 8–12', steps: [
        ['Choose a test', 'Practice tests are set out like the exam, in several versions.'],
        ['Answer and say how sure you are', 'Mark Sure, Not sure or Guessing for each answer.'],
        ['Submit for your mark', 'See your mark straight away, with an explanation for every answer.']],
      teach: [
        ['Start a results session', 'From your dashboard, get a class code: learners\' marks come to you.'],
        ['See what the class missed', 'Results show the questions and topics the class got wrong most.'],
        ['Print a paper', 'Download the paper and memo to write in class.']] },
  };

  const key = id => `ml_welcome_seen_${id}`;
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const CSS = `
  #ml-welcome{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(8,9,11,.78);opacity:0;transition:opacity 200ms ease}
  #ml-welcome.on{opacity:1}
  #ml-welcome .mw-card{position:relative;width:100%;max-width:500px;max-height:calc(100vh - 32px);overflow:auto;box-sizing:border-box;padding:26px 26px 22px;border-radius:18px;border:1px solid rgba(255,255,255,.12);background:#111418;color:#e3e8ef;font:15px/1.5 "Cabinet Grotesk","Segoe UI",system-ui,sans-serif;box-shadow:0 24px 60px -24px rgba(0,0,0,.8)}
  #ml-welcome .mw-close{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:transparent;color:inherit;font-size:18px;line-height:1;cursor:pointer}
  #ml-welcome .mw-kicker{font:600 11px "JetBrains Mono",ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:#8b94a1}
  #ml-welcome h2{margin:4px 40px 2px 0;font-size:26px;font-weight:800;letter-spacing:-.02em;color:#f2f5f9}
  #ml-welcome .mw-grade{font:12px "JetBrains Mono",ui-monospace,monospace;color:#8b94a1}
  #ml-welcome .mw-tabs{display:inline-flex;gap:4px;margin:18px 0 6px;padding:3px;border-radius:999px;border:1px solid rgba(255,255,255,.12)}
  #ml-welcome .mw-tab{font:inherit;font-size:13px;font-weight:700;padding:6px 14px;border-radius:999px;border:0;background:transparent;color:#aab3bf;cursor:pointer}
  #ml-welcome .mw-tab[aria-selected="true"]{background:#f2f5f9;color:#0b0d10}
  #ml-welcome ol{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:14px;counter-reset:mw}
  #ml-welcome li{display:grid;grid-template-columns:28px minmax(0,1fr);gap:12px;counter-increment:mw}
  #ml-welcome li::before{content:counter(mw);display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;border:1px solid rgba(255,255,255,.18);font:700 13px "JetBrains Mono",ui-monospace,monospace;color:#f2f5f9}
  #ml-welcome li b{display:block;font-size:15px;color:#f2f5f9}
  #ml-welcome li span{display:block;font-size:14px;color:#aab3bf}
  #ml-welcome .mw-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:22px}
  #ml-welcome .mw-note{font-size:12.5px;color:#8b94a1}
  #ml-welcome .mw-note a{color:inherit;text-decoration:underline}
  #ml-welcome .mw-go{font:inherit;font-size:14px;font-weight:700;padding:10px 20px;border-radius:999px;border:1px solid #f2f5f9;background:#f2f5f9;color:#0b0d10;cursor:pointer}
  #ml-welcome button:focus-visible{outline:2px solid #6ea8ff;outline-offset:2px}
  html[data-theme="light"] #ml-welcome{background:rgba(22,24,29,.45)}
  html[data-theme="light"] #ml-welcome .mw-card{background:#fff;color:#16181d;border-color:rgba(0,0,0,.12)}
  html[data-theme="light"] #ml-welcome h2,html[data-theme="light"] #ml-welcome li b{color:#0b0d10}
  html[data-theme="light"] #ml-welcome li span{color:#4a525e}
  html[data-theme="light"] #ml-welcome .mw-close,html[data-theme="light"] #ml-welcome .mw-tabs,html[data-theme="light"] #ml-welcome li::before{border-color:rgba(0,0,0,.16)}
  html[data-theme="light"] #ml-welcome li::before{color:#0b0d10}
  html[data-theme="light"] #ml-welcome .mw-tab{color:#4a525e}
  html[data-theme="light"] #ml-welcome .mw-tab[aria-selected="true"],html[data-theme="light"] #ml-welcome .mw-go{background:#16181d;border-color:#16181d;color:#fff}
  @media (max-width:480px){#ml-welcome .mw-card{padding:22px 18px 18px}#ml-welcome h2{font-size:22px}#ml-welcome .mw-foot{flex-direction:column-reverse;align-items:stretch}}
  @media (prefers-reduced-motion:reduce){#ml-welcome{transition:none}}`;

  function isTeacher() {
    try { const p = window.MagicLabAuth && MagicLabAuth.getProfile && MagicLabAuth.getProfile(); return !!p && p.role === 'teacher'; } catch (_) { return false; }
  }

  let open = null;
  function show(id, audience) {
    const cfg = TOOL_CONFIG[id];
    if (!cfg || open) return;
    if (!document.getElementById('ml-welcome-css')) {
      const st = document.createElement('style'); st.id = 'ml-welcome-css'; st.setAttribute('data-ml-no-theme', ''); st.textContent = CSS; document.head.appendChild(st);
    }
    const back = document.activeElement;
    let who = audience || (isTeacher() ? 'teach' : 'steps');
    const ov = document.createElement('div');
    ov.id = 'ml-welcome'; ov.setAttribute('data-ml-no-theme', '');
    ov.innerHTML = `<div class="mw-card" role="dialog" aria-modal="true" aria-labelledby="mw-title">
        <button type="button" class="mw-close" aria-label="Close">×</button>
        <div class="mw-kicker">Welcome to</div>
        <h2 id="mw-title">${esc(cfg.name)}</h2>
        <div class="mw-grade">${esc(cfg.grade)}</div>
        <div class="mw-tabs" role="tablist" aria-label="Guide for">
          <button type="button" class="mw-tab" role="tab" data-who="steps">For learners</button>
          <button type="button" class="mw-tab" role="tab" data-who="teach">For teachers</button>
        </div>
        <ol aria-live="polite"></ol>
        <div class="mw-foot"><span class="mw-note">Open this again with the ? button at the top. Questions? <a href="mailto:ruhan@themagiclab.co.za?subject=${encodeURIComponent('The Magic Lab - ' + cfg.name)}">Email us</a>.</span><button type="button" class="mw-go">Got it</button></div>
      </div>`;
    const list = ov.querySelector('ol');
    function paint() {
      list.innerHTML = cfg[who].map(([t, d]) => `<li><div><b>${esc(t)}</b><span>${esc(d)}</span></div></li>`).join('');
      ov.querySelectorAll('.mw-tab').forEach(b => b.setAttribute('aria-selected', b.dataset.who === who ? 'true' : 'false'));
    }
    paint();
    ov.querySelectorAll('.mw-tab').forEach(b => b.addEventListener('click', () => { who = b.dataset.who; paint(); }));
    function close() {
      try { localStorage.setItem(key(id), '1'); } catch (_) {}
      document.removeEventListener('keydown', onKey, true);
      ov.classList.remove('on');
      setTimeout(() => ov.remove(), 220);
      open = null;
      if (back && back.focus) try { back.focus(); } catch (_) {}
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Tab') {
        const f = [...ov.querySelectorAll('button, a[href]')]; const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    }
    ov.querySelector('.mw-close').addEventListener('click', close);
    ov.querySelector('.mw-go').addEventListener('click', close);
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    document.addEventListener('keydown', onKey, true);
    document.body.appendChild(ov);
    open = ov;
    requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('on')));
    ov.querySelector('.mw-go').focus();
  }

  function toolId() {
    const bar = document.querySelector('[data-ml-bar]');
    if (bar && TOOL_CONFIG[bar.getAttribute('data-ml-bar')]) return bar.getAttribute('data-ml-bar');
    const b = document.body && document.body.dataset.toolId;
    if (b && TOOL_CONFIG[b]) return b;
    const p = location.pathname;
    return Object.keys(TOOL_CONFIG).find(k => p.includes('/' + k)) || null;
  }

  function init() {
    const id = toolId();
    if (!id || TOOL_CONFIG[id].auto === false) return;
    try { if (localStorage.getItem(key(id))) return; } catch (_) { return; }
    // A little later, so the tool and any account check are ready first.
    setTimeout(() => { if (!document.getElementById('ml-welcome')) show(id); }, 700);
  }

  window.MagicLabWelcome = {
    has: id => !!TOOL_CONFIG[id],
    show,
    reset: id => { try { localStorage.removeItem(key(id || '')); } catch (_) {} }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
