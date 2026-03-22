/* ============================================================
   Urg Pocket — Service Worker v1.2.0
   Cache-first pour l'app, network-first pour CGU/privacy
   ============================================================ */

const CACHE_NAME = 'urg-pocket-v1.2.0';
const STATIC_ASSETS = [
  '/urg-pocket/',
  '/urg-pocket/index.html',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
];

/* ---- Install : mise en cache des ressources statiques ---- */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Certaines ressources non mises en cache :', err);
      });
    })
  );
  self.skipWaiting();
});

/* ---- Activate : nettoyage des anciens caches ---- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Suppression ancien cache :', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

/* ---- Fetch : stratégie par type de ressource ---- */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') return;

  // CGU et privacy : network-first (contenu pouvant évoluer)
  if (url.pathname.includes('cgu.html') || url.pathname.includes('privacy.html')) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Fonts Google : cache-first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, res.clone()));
          return res;
        });
      })
    );
    return;
  }

  // App principale : cache-first, fallback réseau
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        // Mettre en cache les ressources de l'origine
        if (url.origin === self.location.origin && res.status === 200) {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => {
        // Fallback vers index.html pour la navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/urg-pocket/');
        }
      });
    })
  );
});
