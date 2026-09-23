// Minimal offline support: network-first for pages, cache-first for built assets.
var CACHE = 'afc-v2'

self.addEventListener('install', function(e) { self.skipWaiting() })
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE }).map(function(k) { return caches.delete(k) }))
  }).then(function() { return self.clients.claim() }))
})

self.addEventListener('fetch', function(e) {
  var req = e.request
  var url = new URL(req.url)
  if (req.method !== 'GET' || url.origin !== location.origin || url.pathname.indexOf('/api/') === 0) return

  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function(res) {
      if (res.ok) {
        var copy = res.clone()
        caches.open(CACHE).then(function(c) { c.put(url.pathname, copy) })
      }
      return res
    }).catch(function() {
      return caches.match(url.pathname).then(function(hit) { return hit || caches.match('/') })
    }))
    return
  }
  if (url.pathname.indexOf('/assets/') === 0) {
    e.respondWith(caches.match(req).then(function(hit) {
      return hit || fetch(req).then(function(res) {
        var copy = res.clone()
        caches.open(CACHE).then(function(c) { c.put(req, copy) })
        return res
      })
    }))
  }
})
