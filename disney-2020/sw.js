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
    './img/backgrounds/9322026dbcf95e28b6f49b97e5afce46.jpg',
    './img/backgrounds/Disneyworld-Castle-1440x2560.jpg',
    './img/backgrounds/disney-boardwalk.jpg',
    './img/backgrounds/disney-hero.jpg',
    './img/backgrounds/disney-princesses.jpg',
    './img/backgrounds/disney-world-secrets1215.jpg',
    './img/backgrounds/fh9z9tbojonz.png',
    './img/backgrounds/royal-holiday-hotel-resort-the-rosen-centre-hotel-estados-unidos-florida-orlando.jpg',
    './img/backgrounds/videoblocks-monorail-disney-world-park-epcot-orlando-usa_rzncodv0x_thumbnail-full09.png',
    './img/backgrounds/videoblocks-sunny-day-in-walt-disney-world-magic-kingdom-orlando-usa_rztcz-8cg_thumbnail-full11.png',
    './img/backgrounds/walt-disney-world-six-parks-uk-video-loop.jpg',
    './img/backgrounds/wdw-balloons.jpg',
    './img/backgrounds/wdw-fireworks.jpg',
    './img/backgrounds/wdw-sign.jpg'
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