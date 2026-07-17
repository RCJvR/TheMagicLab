// ============================================================
// THE MAGIC LAB — sw.js  (updated for Phase 1)
// ============================================================

const CACHE_NAME = 'magic-lab-v44'; // BUMP ON EVERY DEPLOY — cache-first SW serves stale pages otherwise
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
  '/progress.js',
  '/auth-modal.js',
  '/auth-modal.css',
  '/xp.js',
  '/quiz-engine.js',
  '/tool-welcome.js',
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
