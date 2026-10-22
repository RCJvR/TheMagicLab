/* ════════════════════════════════════════════════════════════════════
   Skills Seer — teacher readiness framework (prototype, CAT only).

   One place for everything both pages need:
   - SS.FRAMEWORK   the CAT skills map: strands → skills, with the grade
                    each first appears in, CAPS/IEB, whether it is one of
                    the "technical" skills, a practical check question,
                    and the Computer Codex lessons that teach it
   - SS.level()     how a teacher's confidence + check answer become a
                    readiness level per skill
   - SS.store       saves a teacher's own assessment: to the database
                    when the Skills Seer tables exist, else this browser
   - SS.live        a lead's view of their assigned schools (database)
   - SS.demo()      a fictional network for demonstrations

   Edit the framework here; both pages read it.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  const CC = key => '/computer-codex.html?key=' + key;

  // Confidence scale shown to teachers
  const CONFIDENCE = [
    { v: 1, label: 'I couldn’t teach this yet' },
    { v: 2, label: 'I’d need a lot of preparation' },
    { v: 3, label: 'I can teach this confidently' },
    { v: 4, label: 'I could train other teachers on it' },
  ];
  const LEVELS = [
    { v: 0, name: 'Not assessed', short: '—', color: '#3a4050' },
    { v: 1, name: 'Not yet', short: 'Not yet', color: '#b44a4a' },
    { v: 2, name: 'Developing', short: 'Developing', color: '#c98a2b' },
    { v: 3, name: 'Ready', short: 'Ready', color: '#3f9d5f' },
    { v: 4, name: 'Can lead', short: 'Can lead', color: '#2f8f9d' },
  ];

  /* ── The CAT skills map ──────────────────────────────────────────────
     grade: where it is first taught. cur: 'both' | 'caps' | 'ieb'.
     tech: one of the more technical skills a lead most needs to see.
     check: [question, options, index of the correct option, why]. */
  const FRAMEWORK = {
    subject: 'cat',
    name: 'Computer Applications Technology',
    strands: [
      { id: 'ss', name: 'Spreadsheets', skills: [
        { id: 'ss-refs', name: 'Relative and absolute cell references', grade: 10, cur: 'both', tech: false,
          check: ['C2 contains =B2*$E$1. It is copied down to C3. What does C3 contain?',
                  ['=B3*$E$2', '=B3*$E$1', '=B2*$E$1', '=C3*$E$1'], 1,
                  'B2 is relative and becomes B3; $E$1 is absolute and does not change.'],
          lessons: ['cat-caps/spreadsheet-skills-conditional-formatting-functions-and-charts'] },
        { id: 'ss-if', name: 'IF and nested IF with AND / OR', grade: 10, cur: 'both', tech: true,
          check: ['B2 contains 40. What does =IF(B2>=50,"Pass",IF(B2>=40,"Borderline","Fail")) return?',
                  ['Pass', 'Borderline', 'Fail', '#VALUE!'], 1,
                  '40 is not ≥ 50, so the second IF runs; 40 ≥ 40 is true, giving "Borderline".'],
          lessons: ['cat-caps/spreadsheet-skills-conditional-formatting-functions-and-charts'] },
        { id: 'ss-countifs', name: 'COUNTIF(S), SUMIF(S) and AVERAGEIF(S)', grade: 11, cur: 'both', tech: true,
          check: ['What does =COUNTIFS(A2:A40,"Grade 11",C2:C40,">=70") count?',
                  ['Rows where column A is "Grade 11" OR column C is at least 70',
                   'Rows where column A is "Grade 11" AND column C is at least 70',
                   'The total of column C for Grade 11 learners',
                   'Rows in column C above 70, then adds the Grade 11 rows'], 1,
                  'COUNTIFS counts a row only when every criteria pair is met, so both conditions must be true.'],
          lessons: ['cat-caps/spreadsheet-skills-conditional-formatting-functions-and-charts', 'cat-caps/advanced-spreadsheet-and-database-concepts'] },
        { id: 'ss-lookup', name: 'VLOOKUP / HLOOKUP (and XLOOKUP)', grade: 11, cur: 'both', tech: true,
          check: ['In =VLOOKUP(D2,$A$2:$C$50,3,FALSE), what does the FALSE do?',
                  ['Returns FALSE when nothing is found', 'Looks for an exact match of D2 in column A',
                   'Searches the table from the bottom up', 'Allows the closest smaller match'], 1,
                  'FALSE (or 0) asks for an exact match in the first column of the range; TRUE allows an approximate match on sorted data.'],
          lessons: ['cat-caps/advanced-spreadsheet-and-database-concepts'] },
        { id: 'ss-text', name: 'Text and date functions (LEFT, MID, LEN, CONCAT, TODAY…)', grade: 11, cur: 'both', tech: true,
          check: ['What does =MID("CAT2026",4,4) return?', ['"CAT2"', '"2026"', '"T202"', '"026"'], 1,
                  'MID starts at character 4 ("2") and returns 4 characters: "2026".'],
          lessons: ['cat-caps/advanced-spreadsheet-and-database-concepts'] },
        { id: 'ss-validate', name: 'Data validation and conditional formatting', grade: 11, cur: 'both', tech: false,
          check: ['A teacher wants a cell to accept only whole numbers from 0 to 100. Which feature does that?',
                  ['Conditional formatting', 'Data validation', 'Cell protection', 'Number format "0"'], 1,
                  'Data validation restricts what can be entered; conditional formatting only changes how values look.'],
          lessons: ['cat-caps/spreadsheet-skills-conditional-formatting-functions-and-charts'] },
        { id: 'ss-errors', name: 'Finding and fixing formula errors', grade: 12, cur: 'both', tech: true,
          check: ['A1:A5 are all empty. What does =SUM(A1:A5)/COUNT(A1:A5) show?', ['0', '#DIV/0!', '#VALUE!', '#REF!'], 1,
                  'COUNT of empty cells is 0, and dividing by zero gives #DIV/0!.'],
          lessons: ['cat-caps/advanced-spreadsheet-and-database-concepts'] },
      ] },
      { id: 'db', name: 'Databases', skills: [
        { id: 'db-design', name: 'Table design: data types, field properties, primary keys', grade: 10, cur: 'both', tech: false,
          check: ['Which data type should store learners’ cellphone numbers, such as 0821234567?',
                  ['Number', 'Short Text', 'Currency', 'AutoNumber'], 1,
                  'Phone numbers are not calculated with and must keep the leading zero, so Short Text.'],
          lessons: ['cat-caps/introduction-to-databases', 'cat-ieb/databases-reports-and-the-pat'] },
        { id: 'db-validation', name: 'Validation rules, input masks and lookup fields', grade: 11, cur: 'both', tech: true,
          check: ['Which validation rule allows only the values 1 to 5 in a field?',
                  ['Like "1-5"', 'Between 1 And 5', '>1 And <5', 'In (1-5)'], 1,
                  'Between 1 And 5 includes both ends; >1 And <5 would exclude 1 and 5.'],
          lessons: ['cat-caps/introduction-to-databases'] },
        { id: 'db-queries', name: 'Queries with criteria (AND / OR, wildcards, ranges)', grade: 11, cur: 'both', tech: true,
          check: ['In an Access query, which criterion finds surnames that start with S?',
                  ['= "S"', 'Like "S*"', 'Like "*S"', 'Starts "S"'], 1,
                  'Like with the * wildcard after S matches any surname beginning with S.'],
          lessons: ['cat-caps/introduction-to-databases', 'cat-caps/advanced-spreadsheet-and-database-concepts'] },
        { id: 'db-calc', name: 'Calculated fields and grouped (totals) queries', grade: 12, cur: 'both', tech: true,
          check: ['Which entry in a query’s Field row creates a calculated field?',
                  ['Total = Price * Quantity', 'Total: [Price]*[Quantity]', '[Total]=[Price]x[Quantity]', 'SUM(Price, Quantity)'], 1,
                  'Access uses Name: expression, with field names in square brackets.'],
          lessons: ['cat-caps/advanced-spreadsheet-and-database-concepts'] },
        { id: 'db-reports', name: 'Forms and reports with grouping and summaries', grade: 11, cur: 'both', tech: false,
          check: ['In an Access report grouped by class, where should a count of learners per class go?',
                  ['Report Header', 'Page Footer', 'Class Footer (group footer)', 'Detail section'], 2,
                  'A group footer is calculated once per group, so =Count(*) there counts each class.'],
          lessons: ['cat-ieb/databases-reports-and-the-pat'] },
        { id: 'db-relations', name: 'Relationships between tables', grade: 12, cur: 'both', tech: true,
          check: ['In a one-to-many relationship between Classes and Learners, the ClassID field in the Learners table is a…',
                  ['Primary key', 'Foreign key', 'Composite key', 'Index only'], 1,
                  'The “many” side holds a foreign key that points to the primary key on the “one” side.'],
          lessons: ['cat-ieb/databases-reports-and-the-pat'] },
      ] },
      { id: 'wp', name: 'Word processing', skills: [
        { id: 'wp-styles', name: 'Styles, headings and an automatic table of contents', grade: 10, cur: 'both', tech: false,
          check: ['What must a document use for Word to build an automatic table of contents?',
                  ['Bold, larger text for headings', 'Built-in heading styles', 'Section breaks', 'Numbered lists'], 1,
                  'The automatic table of contents is built from text formatted with heading styles.'],
          lessons: ['cat-caps/word-processing-spreadsheet-and-presentation-theory'] },
        { id: 'wp-layout', name: 'Tables, tabs, sections, columns, headers and footers', grade: 10, cur: 'both', tech: false,
          check: ['Page 1 must be in portrait and page 2 in landscape. What is needed between them?',
                  ['A page break', 'A section break (next page)', 'A column break', 'Nothing, just change the orientation'], 1,
                  'Orientation is a section setting, so a next-page section break is needed.'],
          lessons: ['cat-caps/word-processing-spreadsheet-and-presentation-theory'] },
        { id: 'wp-merge', name: 'Mail merge with rules and filters', grade: 11, cur: 'both', tech: true,
          check: ['Letters must go only to learners in Grade 12. What should be used in the mail merge?',
                  ['A Next Record rule', 'A filter on the recipient list (or a Skip Record If rule)', 'An ASK field', 'Merge to email'], 1,
                  'Filter the recipients, or use Skip Record If to skip everyone not in Grade 12.'],
          lessons: ['cat-caps/word-processing-spreadsheet-and-presentation-theory'] },
        { id: 'wp-review', name: 'Track changes, comments, captions and cross-references', grade: 12, cur: 'both', tech: true,
          check: ['A cross-reference to “Figure 3” should update when figures are added. What must the figure have?',
                  ['A bookmark on its picture', 'An inserted caption', 'A text box around it', 'Its own section'], 1,
                  'Cross-references to figures point at captions; numbering updates when fields are updated.'],
          lessons: ['cat-caps/professional-reports-and-final-exam-readiness'] },
      ] },
      { id: 'web', name: 'HTML', skills: [
        { id: 'web-structure', name: 'HTML structure and formatting tags', grade: 11, cur: 'both', tech: true,
          check: ['Which tag gives the largest built-in heading?', ['<h6>', '<head>', '<h1>', '<header>'], 2,
                  '<h1> is the top-level heading; <head> holds page information, not visible headings.'],
          lessons: ['cat-caps/html-and-web-design-basics'] },
        { id: 'web-links', name: 'Hyperlinks, images, lists and tables in HTML', grade: 11, cur: 'both', tech: true,
          check: ['Which line makes a working hyperlink to rules.html?',
                  ['<link href="rules.html">Rules</link>', '<a href="rules.html">Rules</a>', '<a src="rules.html">Rules</a>', '<href="rules.html">Rules</href>'], 1,
                  'Hyperlinks use the <a> tag with an href attribute.'],
          lessons: ['cat-caps/html-and-web-design-basics'] },
      ] },
      { id: 'th', name: 'Systems, networks and internet', skills: [
        { id: 'th-hardware', name: 'Hardware specifications and recommending systems', grade: 10, cur: 'both', tech: false,
          check: ['A user’s computer slows down badly with many programs open. Which upgrade helps most?',
                  ['A bigger monitor', 'More RAM', 'A faster printer', 'A bigger hard drive with the same speed'], 1,
                  'Too little RAM forces the system to swap to storage; more RAM fixes that.'],
          lessons: ['cat-caps/choosing-the-right-system-for-every-user', 'cat-ieb/recommending-systems-for-real-scenarios'] },
        { id: 'th-networks', name: 'Networks: LAN, WAN, topologies and network hardware', grade: 11, cur: 'both', tech: true,
          check: ['Which device connects a school’s LAN to the internet and forwards data between networks?',
                  ['Switch', 'Router', 'Network interface card', 'Access point'], 1,
                  'A router forwards traffic between different networks; a switch connects devices within one LAN.'],
          lessons: ['cat-caps/lans-wlans-and-network-components', 'cat-ieb/network-security-and-topologies'] },
        { id: 'th-internet', name: 'Internet services, cloud computing and mobile technology', grade: 12, cur: 'both', tech: false,
          check: ['A school stores files on servers it does not own and reaches them over the internet. This is…',
                  ['A LAN', 'Cloud storage', 'An intranet', 'A VPN'], 1,
                  'Storing data on someone else’s servers, reached over the internet, is cloud storage.'],
          lessons: ['cat-caps/wans-internet-services-and-getting-connected', 'cat-ieb/cloud-computing-and-the-internet-of-things'] },
        { id: 'th-security', name: 'Security, malware and online safety', grade: 10, cur: 'both', tech: false,
          check: ['An email that copies the school’s logo asks staff to “verify” their password on a link. This is…',
                  ['Spam', 'Phishing', 'A virus', 'A firewall alert'], 1,
                  'Tricking people into giving up credentials with a fake message is phishing.'],
          lessons: ['cat-caps/cybercrime-malware-and-online-safety', 'cat-ieb/staying-safe-online'] },
      ] },
      { id: 'as', name: 'Assessment and the PAT', skills: [
        { id: 'as-pat', name: 'Running and marking the PAT (phases, rubrics, evidence)', grade: 10, cur: 'both', tech: false,
          check: null, lessons: ['cat-ieb/preparing-for-the-pat', 'cat-ieb/databases-reports-and-the-pat'] },
        { id: 'as-exam', name: 'Setting and marking exam-level practical tasks', grade: 12, cur: 'both', tech: true,
          check: null, lessons: ['cat-caps/professional-reports-and-final-exam-readiness'] },
      ] },
    ],
  };
  // short names for table headings
  const SHORT = { 'ss-refs': 'Cell references', 'ss-if': 'IF / nested IF', 'ss-countifs': 'COUNTIFS / SUMIFS', 'ss-lookup': 'Lookups',
    'ss-text': 'Text & date functions', 'ss-validate': 'Validation & cond. formatting', 'ss-errors': 'Formula errors',
    'db-design': 'Table design', 'db-validation': 'Validation rules', 'db-queries': 'Queries', 'db-calc': 'Calculated & totals queries',
    'db-reports': 'Forms & reports', 'db-relations': 'Relationships', 'wp-styles': 'Styles & TOC', 'wp-layout': 'Layout & sections',
    'wp-merge': 'Mail merge', 'wp-review': 'Review & references', 'web-structure': 'HTML structure', 'web-links': 'Links, images & tables',
    'th-hardware': 'Hardware', 'th-networks': 'Networks', 'th-internet': 'Internet & cloud', 'th-security': 'Security',
    'as-pat': 'The PAT', 'as-exam': 'Exam practicals' };
  // For the training planner: where learners lose marks (in line with the NSC
  // Chief Marker's reports) and a hands-on task for a teacher session.
  const COACH = {
    'ss-if': ['Nested IFs without AND / OR where one outcome needs two tests; missing quotes around text; no building blocks, so no partial marks.', 'Grade a mark list with a nested IF that also uses AND, built up step by step so each part earns marks.'],
    'ss-countifs': ['Criteria with operators not in quotes (">=70"); criteria ranges of different sizes.', 'Count and total learners by grade and mark band with COUNTIFS and SUMIFS.'],
    'ss-lookup': ['FALSE / 0 left out, giving approximate matches; the lookup value not in the first column; ranges not made absolute before copying.', 'Look up prices from a price list with VLOOKUP, then rewrite the same lookup with XLOOKUP.'],
    'ss-text': ['Positions in MID and LEFT miscounted; numbers left stored as text.', 'Build usernames from names and ID numbers with LEFT, MID and CONCAT.'],
    'ss-errors': ['Learners recreate a given formula instead of editing it, and lose the marks for the original.', 'Edit, don’t recreate: fix five broken formulas in a given sheet without retyping any of them.'],
    'db-validation': ['Validation rule and validation text confused; forgetting that Between includes both ends.', 'Add validation rules and helpful messages to a learner table.'],
    'db-queries': ['AND criteria on one row versus OR on separate rows; wildcards used without Like.', 'Query “surname starts with S and in Grade 11”, then “Grade 10 or Grade 11”.'],
    'db-calc': ['Field names without square brackets; grouping on the wrong field.', 'Add a calculated total, then a grouped count of learners per class.'],
    'db-relations': ['Foreign key of a different data type; referential integrity not enforced.', 'Join Classes and Learners one-to-many and enforce referential integrity.'],
    'wp-merge': ['Rules such as Skip Record If in the wrong place; merge fields without spaces or punctuation.', 'Merge a letter to Grade 12 parents only, using a rule and a filter.'],
    'wp-review': ['Captions typed by hand, so cross-references cannot update.', 'Caption three figures, cross-reference them, insert a fourth and update the fields.'],
    'web-structure': ['Unclosed or wrongly nested tags; headings used for size instead of structure.', 'Fix and extend a given HTML page: headings, paragraphs and formatting.'],
    'web-links': ['href and src mixed up; table rows and cells mis-nested.', 'Add a list, a table, a link and an image to the same page.'],
    'th-networks': ['One-word answers such as “faster” that earn no marks; vague terminology.', 'Explain router, switch and access point in full-sentence answers worth two marks each.'],
    'as-exam': ['Mark allocation ignored; memos not built around building-block marking.', 'Moderate one Paper 1 question together against the memo.'],
  };
  FRAMEWORK.strands.forEach(s => s.skills.forEach(k => {
    k.short = SHORT[k.id] || k.name;
    const c = COACH[k.id];
    k.pitfall = c ? c[0] : '';
    k.practice = c ? c[1] : 'Work through the Computer Codex lesson and its quiz together, then plan how to teach it.';
  }));
  const SKILLS = FRAMEWORK.strands.flatMap(s => s.skills.map(k => Object.assign({ strand: s.id }, k)));

  /* ── Readiness level for one skill ─────────────────────────────────
     confidence 1–4 (or null), check true / false / null (not answered).
     A wrong check answer caps the level at Developing: confidence alone
     is not evidence. Mismatches are flagged so a lead can see them. */
  function level(conf, check) {
    if (!conf) return { v: 0, flag: null };
    let v = conf;
    let flag = null;
    if (check === false) { if (conf >= 3) flag = 'overconfident'; v = Math.min(v, 2); }
    if (check === true && conf <= 2) flag = 'underconfident';
    return { v, flag };
  }
  const levelInfo = v => LEVELS[Math.max(0, Math.min(4, Math.round(v)))];

  /* ── Storage of a teacher's own assessment ───────────────────────── */
  const LOCAL = 'ml_skills_seer_cat';
  const sb = () => window.MagicLabAuth && window.MagicLabAuth._supabase && window.MagicLabAuth._supabase();
  const store = {
    async load() {
      const db = sb(), prof = window.MagicLabAuth && window.MagicLabAuth.getProfile();
      if (db && prof) {
        const { data, error } = await db.from('skill_assessments').select('skill_id, confidence, check_correct').eq('teacher_id', prof.id).eq('subject', 'cat');
        if (!error) {
          const out = {};
          data.forEach(r => { out[r.skill_id] = { conf: r.confidence, check: r.check_correct }; });
          return { where: 'db', answers: out };
        }
      }
      try { return { where: 'local', answers: JSON.parse(localStorage.getItem(LOCAL)) || {} }; } catch (e) { return { where: 'local', answers: {} }; }
    },
    async save(answers) {
      try { localStorage.setItem(LOCAL, JSON.stringify(answers)); } catch (e) {}
      const db = sb(), prof = window.MagicLabAuth && window.MagicLabAuth.getProfile();
      if (!db || !prof) return 'local';
      const rows = Object.entries(answers).filter(([, a]) => a.conf).map(([skill, a]) => ({
        teacher_id: prof.id, subject: 'cat', skill_id: skill, confidence: a.conf,
        check_correct: a.check === undefined ? null : a.check, updated_at: new Date().toISOString() }));
      if (!rows.length) return 'local';
      const { error } = await db.from('skill_assessments').upsert(rows, { onConflict: 'teacher_id,subject,skill_id' });
      return error ? 'local' : 'db';
    },
    async requestOptOut(reason) {
      const db = sb(), prof = window.MagicLabAuth && window.MagicLabAuth.getProfile();
      if (!db || !prof) return false;
      const { error } = await db.from('skill_optouts').upsert({ teacher_id: prof.id, subject: 'cat', reason, status: 'pending' }, { onConflict: 'teacher_id,subject' });
      return !error;
    },
  };

  /* ── A lead's live view (needs the Skills Seer tables) ──────────── */
  const live = {
    async overview() {
      const db = sb();
      if (!db) return { ok: false, reason: 'signed-out' };
      const { data, error } = await db.rpc('skills_seer_lead_overview', { p_subject: 'cat' });
      if (error) return { ok: false, reason: error.code === 'PGRST202' || /does not exist|Could not find/i.test(error.message) ? 'not-installed' : 'denied', error };
      // rows: school_id, school_name, region, curriculum, teacher_id, teacher_name, opt_out, skill_id, confidence, check_correct, updated_at
      const schools = {};
      data.forEach(r => {
        const s = schools[r.school_id] = schools[r.school_id] || { id: r.school_id, name: r.school_name, region: r.region, curriculum: r.curriculum, teachers: {} };
        if (!r.teacher_id) return;
        const t = s.teachers[r.teacher_id] = s.teachers[r.teacher_id] || { id: r.teacher_id, name: r.teacher_name, optOut: r.opt_out, optReason: r.opt_reason, answers: {}, updated: null };
        if (r.skill_id) { t.answers[r.skill_id] = { conf: r.confidence, check: r.check_correct }; if (!t.updated || r.updated_at > t.updated) t.updated = r.updated_at; }
      });
      return { ok: true, schools: Object.values(schools).map(s => Object.assign(s, { teachers: Object.values(s.teachers) })) };
    },
    async decideOptOut(teacherId, approve) {
      const db = sb(); if (!db) return false;
      const { error } = await db.rpc('skills_seer_decide_optout', { p_teacher: teacherId, p_subject: 'cat', p_approve: approve });
      return !error;
    },
  };

  /* ── Fictional demonstration network ───────────────────────────────
     Deterministic (seeded), so the same demo shows every time. Shapes the
     results the way such audits usually come out: theory strong, the
     database and lookup skills weakest, a few confidence/check mismatches. */
  function demo() {
    let seed = 20261023;
    const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
    // shaped like the Curro DBE group (Academy and Meridian, NSC / CAPS):
    // mostly Gauteng, single campuses elsewhere. Names are invented.
    const schools = [
      ['Academy Northcliff', 'Gauteng'], ['Academy Eastgate', 'Gauteng'], ['Meridian Southview', 'Gauteng'],
      ['Academy Westfield', 'Gauteng'], ['Meridian Highveld', 'Gauteng'], ['Academy Bayside', 'Western Cape'],
      ['Meridian Boland', 'Western Cape'], ['Meridian Coastlands', 'KwaZulu-Natal'], ['Academy Lowveld', 'Mpumalanga'],
      ['Meridian Bushveld', 'Limpopo'],
    ].map(([n, r]) => [n, r, 'CAPS']);
    const names = ['Thandi Mokoena', 'Pieter van Wyk', 'Aisha Patel', 'Sipho Dlamini', 'Megan Botha', 'Johan Pretorius',
      'Lerato Nkosi', 'Priya Naidoo', 'Kobus Steyn', 'Nomvula Khumalo', 'Ricardo Adams', 'Fatima Jacobs', 'Liezl du Plessis',
      'Themba Zulu', 'Sarah Peters', 'Andile Mthembu', 'Marisa Coetzee', 'Kagiso Molefe', 'Zanele Ndlovu', 'Hennie Swanepoel',
      'Ayanda Cele', 'Chantal Williams', 'Musa Sithole', 'Elna Kruger', 'Bongani Shabalala', 'Natasha Fourie',
      'Yusuf Ebrahim', 'Karabo Mahlangu', 'Annemarie Joubert', 'Lindiwe Mabaso', 'Danie Venter', 'Refilwe Tau'];
    // how hard each skill tends to be (higher = weaker confidence)
    const hard = { 'ss-lookup': 1.3, 'ss-text': 0.8, 'ss-errors': 0.7, 'ss-countifs': 0.6, 'db-calc': 1.4, 'db-queries': 1.1, 'db-relations': 1.3,
      'db-validation': 0.9, 'wp-merge': 0.7, 'wp-review': 0.6, 'web-structure': 0.5, 'web-links': 0.6, 'th-networks': 0.4, 'as-exam': 0.8 };
    let n = 0;
    return schools.map(([name, region, curriculum], si) => {
      // Gauteng campuses have small CAT departments; elsewhere often one teacher
      const count = region === 'Gauteng' ? 2 + Math.floor(rnd() * 3) : 1 + Math.floor(rnd() * 2);
      // campus strength, chosen so the demo tells a believable story: most campuses
      // solid, a couple clearly in need of support, nobody flat at zero
      const strength = [1.45, 0.95, 1.15, 0.8, 1.0, 1.2, 1.3, 1.4, 0.9, 0.75][si] + (rnd() - 0.5) * 0.3;
      const teachers = [];
      for (let i = 0; i < count; i++) {
        const t = { id: 'demo-' + n, name: names[n++ % names.length], answers: {}, optOut: null, updated: null };
        const skill = strength + (rnd() - 0.5) * 0.9;
        const notStarted = rnd() < 0.08;
        if (si === 0 && i === 1) { t.optOut = 'approved'; t.optReason = 'Moving to Mathematical Literacy full-time from next term.'; }
        if (si === 3 && i === 0) { t.optOut = 'pending'; t.optReason = 'On maternity leave for Term 4.'; }
        if (!notStarted && t.optOut !== 'approved') {
          SKILLS.forEach(k => {
            if (k.cur !== 'both' && k.cur.toUpperCase() !== curriculum) return;
            let c = Math.round(2.6 + skill - (hard[k.id] || 0) + (rnd() - 0.5) * 1.6);
            c = Math.max(1, Math.min(4, c));
            let check = null;
            if (k.check) {
              const pRight = 0.25 + 0.18 * c + skill * 0.08;
              check = rnd() < pRight;
            }
            t.answers[k.id] = { conf: c, check };
          });
          t.updated = new Date(Date.UTC(2026, 9, 5 + Math.floor(rnd() * 16))).toISOString();
        }
        teachers.push(t);
      }
      return { id: 'demo-school-' + si, name: name + ' (demo)', region, curriculum, teachers };
    });
  }

  window.SkillsSeer = { FRAMEWORK, SKILLS, CONFIDENCE, LEVELS, level, levelInfo, store, live, demo, lessonUrl: CC };
})();
