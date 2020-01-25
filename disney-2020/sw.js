const CACHE_NAME = 'cache-disney-2020-v1';
const urlsToCache = [
    '/shared/css/countdowns.css',
    '/shared/css/easypiechart.css',
    '/shared/fonts/waltograph42.otf',
    '/shared/fonts/waltographUI.ttf',
    '/shared/js/countdown-image-type.js',
    '/shared/js/countdown-page-background.js',
    '/shared/js/countdown-timer.js',
    '/shared/js/countdown-timers.js',
    '/shared/js/countdown-utils.js',
    '/shared/js/easypiechart.min.js',
    '/shared/js/luxon.min.js',
    '/shared/js/vibrant.min.js',
    './index.html',
    './img/backgrounds/castle-shooting-star.jpg',
    './img/backgrounds/walt-disney-world-six-parks-uk-video-loop.jpg'
];

self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});