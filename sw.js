const CACHE_NAME = 'weather-dashboard-v1';
const urlsToCache = [
    './wetter.html',
    './manifest.json'
];

// Installation des Service Workers
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Anfragen abfangen (Wetter-Daten werden absichtlich NICHT gecacht, damit sie immer live sind)
self.addEventListener('fetch', event => {
    if (event.request.url.includes('api.open-meteo.com')) {
        return; // Live-API immer direkt aus dem Netz laden
    }
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
