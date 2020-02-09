var cacheName = 'v1';
var cacheFiles = [
    '../Classwork2/',
    '../Classwork2/login.html',
    '../Classwork2/app.js ',
    '../Classwork2/node.js',
    '../Classwork2/search.html',
    '../Classwork2/sign_up',
    '../Classwork2/service-worker.js',
    '../Classwork2/manifest.json',
    '../Classwork2/user_success.html'
]


self.addEventListener('install', function(e){
    console.log("[ServiceWorker] Installed")

    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("[Service] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e){
    console.log("[ServiceWorker] Activated")

    e.waitUntil(
        caches.keys().then(function(cachesNames) {
            return Promise.all(cachesNames.map(function(thisCacheName){
                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing Cached Files from", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
            return cacheRes || fetch(e.request);
        })
    );
    // console.log("[ServiceWorker] Fetching", e.request.url);

    // e.respondWith(
    //     caches.match(e.request).then(function(response) {
    //         if ( response) {
    //             console.log("[ServiceWorker] Found in cache", e.request.url);
    //             return response;
    //         }

    //         return fetch(e.request);
    //     })
    // )
});