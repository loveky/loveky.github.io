var cacheName = 'hugo-nuo-v2';
var filesToCache = [
  '404.html',
  'favicon.ico',
  'manifest.json',
  'icons/icon-16x16.png',
  'icons/icon-32x32.png',
  'icons/icon-128x128.png',
  'icons/icon-144x144.png',
  'icons/icon-152x152.png',
  'icons/icon-192x192.png',
  'icons/icon-256x256.png',
  'icons/icon-512x512.png',
  'images/grey-prism.svg',
  'styles/main.min.css',
  'scripts/index.min.js',

  // Google fonts
  'https://fonts.googleapis.com/css?family=Lobster',
  'https://fonts.gstatic.com/s/lobster/v20/neILzCirqoswsqX9zoKmM4MwWJU.woff2',

  // Iconfont
  'https://at.alicdn.com/t/font_174169_qmgvd10zwbf.woff',

  // smooth-scroll
  'https://cdn.jsdelivr.net/npm/smooth-scroll@15.0.0/dist/smooth-scroll.min.js',

  // medium-zoom
  'https://cdn.jsdelivr.net/npm/medium-zoom@1.0.2/dist/medium-zoom.min.js',

  // Video.js
  'https://cdn.jsdelivr.net/npm/video.js@7.3.0/dist/video-js.min.css',
  'https://cdn.jsdelivr.net/npm/video.js@7.3.0/dist/video.min.js',

  // MathJax
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/config/TeX-AMS-MML_HTMLorMML.js?V=2.7.5',
];

// Cache the application assets
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)));
});

// network first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return fetch(event.request)
        .then(function(response) {
          if (response.status === 404) return caches.match('404.html');
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(function() {
          return caches.match(event.request);
        });
    }),
  );
});

// Delete outdated caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
