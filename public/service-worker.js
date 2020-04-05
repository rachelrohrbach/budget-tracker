const FILES_TO_CACHE = [
  `/`,
  `/index.html`,
  `/manifest.webmanifest`,
  `/assets/img/piggy-bank-96x96.png`,
  `/assets/img/piggy-bank-192x192.png`,
  `/assets/js/index.js`,
  `/assets/js/db.js`,
  `/assets/css/style.css`
];

const CACHE_NAME = `static-cache-v2`;
const DATA_CACHE_NAME = `data-cache-v1`;

//install
self.addEventListener(`install`, event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener(`activate`, event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            return caches.delete(key);
          }
          return undefined;
        })
      )
    )
  );

  self.clients.claim();
});

self.addEventListener(`fetch`, event => {
  if (event.request.url.includes(`/api/`)) {
    event.respondWith(
      caches
        .open(DATA_CACHE_NAME)
        .then(cache =>
          fetch(event.request)
            .then(response => {
              if (response.status === 200) {
                cache.put(event.request.url, response.clone());
              }

              return response;
            })
            .catch(err => {
              cache.match(event.request);
              console.error(err);
            })
        )
        .catch(err => console.error(err))
    );
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then(response => response || fetch(event.request))
        .catch(err => console.error(err))
    );
  }
});
