/* Timer Talisman's service worker (registered by timer.html, scope /timer).
   It lets the timer be installed as an app and keeps it working when the
   venue's Wi-Fi drops: every request the timer makes goes to the network
   first, and a copy is kept; offline, the kept copy is used. Recordings are
   streamed in parts (range requests), so they are not kept. */
var CACHE = 'timer-talisman-v1';

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(req, { ignoreSearch: false }).then(function (hit) {
      return hit || (req.mode === 'navigate' ? caches.match('timer.html') : Response.error());
    });
  }));
});
