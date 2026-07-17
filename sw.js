// ============================================================
// THE MAGIC LAB — sw.js  (updated for Phase 1)
// ============================================================

const CACHE_NAME = 'magic-lab-v36'; // BUMP ON EVERY DEPLOY — cache-first SW serves stale pages otherwise
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
