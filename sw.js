// Update this cache name on each release to invalidate stale app shell files.
const CACHE_NAME = 'coaching-v1.0.12';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function getProgramCacheKey(requestUrl) {
  const u = new URL(requestUrl);
  // Remove query params like ?t=Date.now() so offline fallback can find the latest JSON.
  return `${u.origin}${u.pathname}`;
}

function isProgramJsonRequest(urlObj) {
  const p = urlObj.pathname || '';
  return p.includes('/clients/') && p.endsWith('.json');
}

function fetchFresh(request) {
  // Force a network revalidation to avoid stale app shell on mobile browsers/PWA.
  return fetch(new Request(request, { cache: 'no-store' }));
}

self.addEventListener('fetch', (e) => {
  const reqUrl = new URL(e.request.url);
  if (reqUrl.origin !== self.location.origin) return;

  // Never serve the Service Worker script itself from app cache.
  if (reqUrl.pathname.endsWith('/sw.js')) return;

  // 1) HTML navigation requests: network first to avoid stale shells on mobile/PWA.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetchFresh(e.request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', clone));
          }
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // 2) Client program JSON: network first, normalized cache key fallback.
  if (isProgramJsonRequest(reqUrl)) {
    const cacheKey = getProgramCacheKey(e.request.url);
    e.respondWith(
      fetchFresh(e.request)
        .then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(cacheKey, clone));
          }
          return res;
        })
        .catch(() => caches.match(cacheKey))
    );
    return;
  }

  // 3) Static assets: network first for immediate updates after a simple refresh.
  e.respondWith(
    fetchFresh(e.request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then((cached) => {
          if (cached) return cached;
          return caches.match('./index.html').then((r) => r || caches.match('./'));
        })
      )
  );
});
