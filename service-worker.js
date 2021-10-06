var CACHE_NAME = 'cache';
// lista di quel che ci deve essere
var urlsToCache = [
  'index.htm',
  'legdb.htm',
  'manifest.json',
  'legdb1.htm',
  'legdb2.htm',
  'legdb3.htm',
  'ciapasys.htm',
  'imposta.htm',
  'handleDb.js',
  'salvasys.htm',
  'launcher-icon-0-75x.png',
  'launcher-icon-4x.png',
  'launcher-icon-5x.png',
  'launcher-icon-7x.png'
];

console.log('me sto a caricare');

self.addEventListener('install', function(event) {
    // installa
    console.log('me sto a `nstalla`');
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
                console.log('aperta a cascia');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
 zz=event.request.url
 
if (!zz.includes("?")){
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
    	
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('launcher-icon-4x.png');
      });
    }
  }));}
});
