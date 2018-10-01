
/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js")


workbox.skipWaiting()
workbox.clientsClaim()

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat([
  {
    "revision": "$version-main",
    "url": "/dist/main.js.gz"
  },
  {
    "revision": "$version-bundle",
    "url": "/dist/bundle.css.gz"
  },
  {
    "revision": "$version-app",
    "url": "/dist/app.js.gz"
  }
]
|| [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerRoute(/.*\.html/, workbox.strategies.staleWhileRevalidate({
  cacheName: "$version-pages",
  plugins: [new workbox.expiration.Plugin({
    "maxEntries": 20,
    "maxAgeSeconds": 259200
  }), new workbox.cacheableResponse.Plugin({ "statuses": [0, 200] })]
}), 'GET')
workbox.routing.registerRoute(/https:\/\/api.SITE_NAME.ca\/v1\/areas\/area-selector/, workbox.strategies.cacheFirst({
  cacheName: "$version-area-selector",
  plugins: [new workbox.expiration.Plugin({
    "maxEntries": 1,
    "maxAgeSeconds": 259200
  }), new workbox.cacheableResponse.Plugin({ "statuses": [0, 200] })]
}), 'GET')
workbox.routing.registerRoute(/https:\/\/api.SITE_NAME.ca\/v1\/.*\/stats/, workbox.strategies.cacheFirst({
  cacheName: "$version-stats",
  plugins: [new workbox.expiration.Plugin({
    "maxEntries": 15,
    "maxAgeSeconds": 43200
  }), new workbox.cacheableResponse.Plugin({ "statuses": [0, 200] })]
}), 'GET')
workbox.routing.registerRoute(/https:\/\/api.SITE_NAME.ca\/v1\/listings\/meta/, workbox.strategies.cacheFirst({
  cacheName: "$version-meta",
  plugins: [new workbox.expiration.Plugin({
    "maxEntries": 1,
    "maxAgeSeconds": 259200
  }), new workbox.cacheableResponse.Plugin({ "statuses": [0, 200] })]
}), 'GET')
workbox.routing.registerRoute(/https:\/\/api.SITE_NAME.ca\/v1\/mappings/, workbox.strategies.cacheFirst({
  cacheName: "$version-areas",
  plugins: [new workbox.expiration.Plugin({
    "maxEntries": 10,
    "maxAgeSeconds": 259200
  }), new workbox.cacheableResponse.Plugin({ "statuses": [0, 200] })]
}), 'GET')
workbox.routing.registerRoute(/\.(?:png|jpg|gif|font)$/, workbox.strategies.cacheFirst({
  cacheName: "static",
  plugins: [new workbox.expiration.Plugin({
    "maxEntries": 100,
    "maxAgeSeconds": 259200
  }), new workbox.cacheableResponse.Plugin({ "statuses": [0, 200] })]
}), 'GET')
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return !cacheName.match('$version-')
        }).map(function(cacheName) {
          return caches.delete(cacheName)
        })
      )
    })
  )
})
