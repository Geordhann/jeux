// Garde l'appli en mémoire sur le téléphone : elle s'ouvre vite, même sans réseau.
// Chaque nouvelle version remplace l'ancienne au prochain lancement.
const CACHE = 'tournee-20261014155243';
const FILES = ["./", "fonts/BagelFatOne-normal-400.woff2", "fonts/Figtree-normal-400.woff2", "fonts/Fraunces-italic-500.woff2", "fonts/Fraunces-normal-500.woff2", "fonts/fonts.css", "icon-180.png", "icon-192.png", "icon-512.png", "index.html", "manifest.webmanifest"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // Réseau d'abord (pour avoir la dernière version), mémoire si pas de réseau
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./'))));
});
