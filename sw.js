/* Learning Roots Royal Academy — service worker */
const VERSION = 'lrra-2026-10-04';
const CORE = ['./','offline.html','assets/style.css','assets/enhance.css','assets/site.js','icon-192.png','manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Pages: network first, fall back to cache, then the offline page
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('offline.html')))
    );
    return;
  }
  // Assets: serve from cache, refresh in the background
  e.respondWith(
    caches.match(req).then(cached => {
      const fresh = fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; }).catch(() => cached);
      return cached || fresh;
    })
  );
});
