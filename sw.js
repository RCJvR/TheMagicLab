const CACHE_NAME = 'magic-lab-v2';
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
  'https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(() => {
        return cache.addAll(['/', '/index.html']);
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
});

self.addEventListener('fetch', event => {
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
