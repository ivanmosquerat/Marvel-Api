const CACHE_NAME = "parcial-v1"
const cache_urls = ["/offline/offline.html",
    "/offline/main.css",
    "/offline/offline.png",
    "/offline/marvel-logo2.png"
]

self.addEventListener("install", function(ev) {
    console.log("SW instalada")

    caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log("Cache opened")
            return cache.addAll(cache_urls)
        })
})

self.addEventListener("fetch", function(ev) {
    ev.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response
            }
            return fetch(ev.request)
        })
    )
})