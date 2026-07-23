// ============================================================
// THE MAGIC LAB — sw.js  (updated for Phase 1)
// ============================================================

const CACHE_NAME = 'magic-lab-v53'; // BUMP ON EVERY DEPLOY — cache-first SW serves stale pages otherwise
                                    // v34: pitch.html — mobile problem-stat overflow fix, tool card
                                    // fact-checks (Science Sage Gr7-12, Model Mage AI claims removed,
                                    // Web Wizard/Computer Codex/AI Oracle accuracy), AI Tutor language
                                    // removed platform-wide, roadmap "player"/Supabase/pilot-location
                                    // wording, gamification level list alignment fix. computer-codex.html
                                    // — mobile sidebar nav drawer added
                                    // v35: Computer Codex pitch card corrected to Grade 8-12/160 lessons.
                                    // New assignments feature: assignments.js SDK, assignments-schema.sql
                                    // migration, teacher "Assignments" tab (create/list/delete, per-learner
                                    // completion drill-down), student "My Assignments" panel. Completion is
                                    // auto-detected from progress_events, no submission step.
                                    // v36: lesson-catalog.js — real per-tool lesson catalogs (extracted
                                    // from each tool's own lesson data, 488 entries across 7 tools) replace
                                    // the free-text "type the exact lesson title" field in the assignment
                                    // creation modal with a searchable, grouped checkbox picker. Added the
                                    // missing lesson_complete tracking to java-genie.html and web-wizard.html
                                    // (previously never fired, so assignments against those two tools could
                                    // never be marked done).
                                    // v37: robot-realm/index.html — 2D/3D view button replaced with a
                                    // sliding pill toggle (matches the JS/Blocks segmented control style).
                                    // v38: Live Game (Kahoot-style) feature — game-schema.sql migration,
                                    // games.js SDK, question-bank.js (988 MCQs extracted from Computer
                                    // Codex/AI Oracle Knowledge Checks), teacher "Live Game" tab
                                    // (topic picker + launch), game-host.html (join code, live lobby,
                                    // question/reveal/podium, all polling-based), game-play.html (join by
                                    // code, answer, live rank). Correct answers never reach a player's
                                    // client except via the scoped submit_game_answer() RPC result for the
                                    // question they just answered.
                                    // v39: renamed the Live Game feature to "The Arena" throughout —
                                    // game-host.html -> arena-host.html, game-play.html -> arena.html
                                    // (now a proper branded landing page, not a bare join form), teacher
                                    // dashboard tab and student dashboard join box relabelled, and
                                    // index.html gets a dedicated Arena banner + footer link so it's
                                    // actually discoverable from the main hub instead of buried in the
                                    // dashboards.
                                    // v40: fixed a live production bug — the game_participants RLS
                                    // policy "Participants read the lobby they're in" queried
                                    // game_participants from within a policy on game_participants itself,
                                    // causing Postgres to recurse into itself and error out (500 on every
                                    // read). Learners could join fine but the host never saw them. Fixed
                                    // via a security-definer function (is_game_participant) — see
                                    // game-schema.sql / supabase-setup.sql, already applied directly to
                                    // the live database. Also: arena-host.html now auto-advances a
                                    // question straight to reveal once every joined player has answered,
                                    // instead of always waiting for the host to click Reveal or the timer
                                    // to run out.
                                    // v41: arena.html gets a persistent status bar — the quiz's title,
                                    // a rolling strip of the player's last 5 right/wrong answers, and a
                                    // rank badge captured at the moment each question starts (so it's
                                    // "where you stood going in," not the same number as the post-answer
                                    // rank already shown on the result screen). Host and player answer
                                    // tiles both swap the plain shapes (▲◆●■) for four themed icons —
                                    // wand/orb/star/gem — chosen to stay silhouette-distinct at a glance
                                    // the same way the shapes were, not just decorative.
                                    // v42: arena-host.html gets an "End Quiz" button next to the game
                                    // title, visible any time the session isn't already ended (lobby,
                                    // question, or reveal) — lets the host wrap up early instead of only
                                    // being able to end once every question is exhausted. Confirms before
                                    // acting, then just flips the session to 'ended', which players already
                                    // pick up on their normal poll loop.
                                    // v43: dashboard-teacher.html — fixed light-on-light <select> dropdown
                                    // text on the Arena/assignment/class pickers. The .form-input box itself
                                    // is dark-themed, but browsers render a <select>'s open option list with
                                    // their own default (usually white) background while still inheriting
                                    // the light --text color, making the options unreadable. Added explicit
                                    // dark background + light text on `option` so the popup list matches
                                    // the rest of the UI.
                                    // v44: pitch.html gets an 8th, full-width feature cell in the platform
                                    // features section covering The Arena — live quiz battles, question
                                    // tiles, and a mini leaderboard demo, matching the visual language of
                                    // the real product (same wand/orb/star/gem icons and colors as
                                    // arena-host.html). "Twelve tools" claim is untouched — the Arena stays
                                    // out of the tools-grid, same as its treatment on index.html. Roadmap's
                                    // Phase 3 (Gamification Engine) description and tag list updated to
                                    // list The Arena alongside XP/badges/streaks, since it shipped as part
                                    // of that phase.
                                    // v45: index.html gets a "🔔 Homework" nav pill for logged-in students,
                                    // visible whenever they have any not-yet-done assignment (uses the
                                    // existing assignments.js getMyAssignments() — no schema change), with
                                    // a badge showing the pending count and turning red if any assignment
                                    // is overdue. Hidden for teachers and logged-out visitors, and kept
                                    // visible on mobile (unlike the other secondary nav pills) since it's a
                                    // notification, not just a link. Clicking it deep-links to
                                    // dashboard-student.html#assignments-panel, which now auto-scrolls to
                                    // the existing "My Assignments" list on arrival.
                                    // v46: fixed a bug in the v45 homework bell — it set the nav pill
                                    // visible for every logged-in student as soon as their assignment list
                                    // loaded, before checking whether anything was actually pending, so it
                                    // showed up even with zero homework and clicking it landed on a
                                    // dashboard with nothing to see. Now the pill only renders at all when
                                    // there's at least one not-yet-done assignment. Also added a brief
                                    // highlight pulse on the "My Assignments" panel when arriving via the
                                    // bell's deep link, so the destination is unmistakable.
                                    // v47: temporary [DEBUG-assignments]-prefixed console logging added to
                                    // assignments.js's getMyAssignments() and its call site in
                                    // dashboard-student.html, to track down a live report of a real
                                    // assignment (confirmed to exist in the DB, with correct RLS policies
                                    // and class membership) not showing up in a student's "My Assignments"
                                    // panel. To be removed once root-caused.
                                    // v48: root-caused and fixed the v47 bug — dashboard-student.html's
                                    // data-load trigger (_once/_tryLoad) only waited for
                                    // window.MagicLabAuth and window.MagicLabProgress before firing, a
                                    // readiness check written before assignments.js existed and never
                                    // updated. Whichever of the auth/progress/xp "ready" events (or the
                                    // fallback poll) won the race could fire before assignments.js had
                                    // finished setting window.MagicLabAssignments, so getMyAssignments()
                                    // was silently skipped — the assignment genuinely existed in the DB
                                    // with correct RLS, but the client never asked. Now the trigger also
                                    // waits for window.MagicLabAssignments (and its
                                    // magiclab:assignments:ready event), with a ~3s poll-count timeout
                                    // fallback so a slow or failed assignments.js can't hang the rest of
                                    // the dashboard. Removed the temporary v47 debug logging.
                                    // v49: dashboard-student.html — moved the "My Assignments" panel to
                                    // sit right after the profile/XP stats summary, above the Streak
                                    // section and the Join a class / Enter The Arena boxes, instead of
                                    // below them — a student's active homework should be one of the first
                                    // things they see, not something they scroll past.
                                    // v50: dashboard-student.html — "My Assignments" now groups items
                                    // into Overdue / Due Today / Upcoming / Completed (in that order,
                                    // colour-coded dots, each with a count), instead of one flat list.
                                    // No-due-date assignments fall under Upcoming; a completed assignment
                                    // always shows under Completed even if its due date has passed. Empty
                                    // groups are simply omitted.
                                    // v51: sign-in is now required on every tool/lesson page
                                    // (require-auth.js + pre-paint hide, fail-closed), signup gains
                                    // optional School/Province and teacher Subjects fields, and PayFast
                                    // R45/mo Pro checkout ships (pricing.html, payment.js,
                                    // payment-success/cancelled pages, Upgrade nav pill, Edge Functions
                                    // + payments schema on Supabase). Sandbox-signed with the shared
                                    // sandbox passphrase; live needs PAYFAST_* secrets.
                                    // v52: de-densified the Science Sage, Tech Tower and Math Magician
                                    // index pages — Science Sage shows one grade/path at a time (the
                                    // dropdown now filters instead of scrolling, persisted per browser),
                                    // long topic lists collapse behind "Show all N topics", the repeated
                                    // "Lesson" badges are gone, and both Science Sage and Tech Tower get
                                    // a "Continue where you left off" card + visited-lesson ticks via the
                                    // new shared topic-memory.js (localStorage only). Math Magician's
                                    // landing reframes "N chapters" tags as phase labels.
                                    // v53: math-magician/index.html grade cards now show real per-grade
                                    // progress (X/Y topics + %, CTA swaps to "Continue"/"Review again")
                                    // pulled from Supabase via a new progress.js helper,
                                    // getLessonHistoryByGrade(tool) — buckets lesson_complete history by
                                    // the `grade` already recorded on each event, so the landing page
                                    // doesn't need to load every grade's chapter manifest. Cards with no
                                    // completions yet render exactly as before (no bar, "Start learning").

const urlsToCache = [
  '/',
  '/index.html',
  '/java-genie.html',
  '/web-wizard.html',
  '/code-conjurer.html',
  '/computer-codex.html',
  '/conjurer_interpreter.js',
  '/math-magician/index.html',
  '/math-magician/gr8/index.html',
  '/math-magician/gr8/ch1.js',
  '/math-magician/gr8/ch2.js',
  '/math-magician/gr8/ch3.js',
  '/math-magician/gr8/ch4.js',
  '/spike-spellcaster/index.html',
  '/spike-spellcaster/spike-python.js',
  '/spike-spellcaster/spike-ble.js',

  // ── Phase 1 additions ──────────────────────────────────────
  '/auth.js',
  '/require-auth.js',
  '/progress.js',
  '/auth-modal.js',
  '/auth-modal.css',
  '/payment.js',
  '/pricing.html',
  '/xp.js',
  '/quiz-engine.js',
  '/tool-welcome.js',
  '/topic-memory.js',
  '/dashboard-student.html',
  '/dashboard-teacher.html',
  '/assignments.js',
  '/lesson-catalog.js',
  '/question-bank.js',
  '/games.js',
  '/arena-host.html',
  '/arena.html',

  // CDN resources
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js',
  'https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js',
  'https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(() => {
        // If CDN resources fail, at minimum cache the core app
        return cache.addAll(['/', '/index.html', '/auth.js', '/progress.js', '/xp.js', '/quiz-engine.js',
  '/tool-welcome.js', '/auth-modal.js', '/auth-modal.css']);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Auth API calls to Supabase should NEVER be served from cache
  const url = event.request.url;
  if (url.includes('supabase.co') && !url.includes('supabase.min.js')) {
    return; // let it go to the network
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});
