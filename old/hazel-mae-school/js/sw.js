self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('hmf-school').then((cache) => {
            return cache.addAll([
                'index.html',
                'css/easypiechart.css',
                'css/hmf-school.css',
                'js/hmf-school.js',
                'js/luxon.min.js',
                'img/backgrounds/landscape/rose-glen-winter.png',
                'img/backgrounds/portrait/rose-glen-logo-bg.png',
                'img/favicon/android-chrome-192x192.png',
                'img/favicon/apple-touch-icon.png',
                'img/favicon/favicon-32x32.png',
                'img/favicon/mstile-150x150.png',
                'img/favicon/android-chrome-512x512.png',
                'img/favicon/favicon-16x16.png',
                'img/favicon/favicon.ico',
                'img/favicon/safari-pinned-tab.svg'
            ])
        })
    )
});