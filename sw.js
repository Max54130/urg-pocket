/* ============================================================
   Urg Pocket — Service Worker v1.3.2
   Cache-first pour l'app, network-first pour CGU/privacy/version.json
   Mise à jour automatique : le cache est versionné et les anciens
   caches sont purgés à chaque activation.
   ============================================================ */

const CACHE_NAME = 'urg-pocket-v1.3.4';
const STATIC_ASSETS = [
  '/',
  '/index.html',
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
  // Ne pas skipWaiting automatiquement : on attend le message côté client
});

/* ---- Message depuis le client (pour forcer l'activation) ---- */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
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
    ).then(() => self.clients.claim())
  );
});

/* ---- Fetch : stratégie par type de ressource ---- */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') return;

  // version.json : toujours réseau en priorité, pas de cache
  if (url.pathname.endsWith('/version.json')) {
    event.respondWith(
      fetch(event.request, {cache: 'no-store'}).catch(() => caches.match(event.request))
    );
    return;
  }

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

  // App principale (navigation / index.html) : network-first
  // pour toujours servir la dernière version quand le réseau est disponible,
  // tout en restant hors-ligne fonctionnel via le fallback cache.
  if (event.request.mode === 'navigate' ||
      url.pathname.endsWith('/') ||
      url.pathname.endsWith('index.html') ||
      url.pathname.endsWith('urg_pocket.html')) {
    event.respondWith(
      fetch(event.request).then((res) => {
        if (url.origin === self.location.origin && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => {
        return caches.match(event.request).then((cached) => {
          return cached || caches.match('/');
        });
      })
    );
    return;
  }

  // Autres ressources : cache-first, fallback réseau
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        if (url.origin === self.location.origin && res.status === 200) {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});
