const pwaCache = 'pwa-cache-1';

const staticCache = ['/', 'index.html', '/AnimeDetails.html', '/ContactUs.html', '/Movies.html', '/RatingList.html', '/SearchResults.html', '/UpcomingAnime.html'];

// SW fetch handler with different caching strategies
self.addEventListener('fetch', (e) => {

     // 4. Cache with Network Update
     e.respondWith(
       caches.open(pwaCache).then( (cache) => {
    
         // Return from cache
         return cache.match(e.request).then( (res) => {
    
           // Update
           let updatedRes = fetch(e.request).then( (newRes) => {
             // Cache new response
             cache.put(e.request, newRes.clone());
             return newRes;
           });
           
           return res || updatedRes;
         })
      })
     );
  

  
  });
  
  
  // SW install and cache static assets
  self.addEventListener('install', (e) => {
      e.waitUntil(
        caches.open(pwaCache)
          .then( cache => cache.addAll(staticCache) )
      );
  });
  
  // SW Activate and cache cleanup
  self.addEventListener('activate', (e) => {
      let cacheCleaned = caches.keys().then((keys) => {
          keys.forEach( (key) => {
              if (key !== pwaCache) return caches.delete(key);
          });
      });
      e.waitUntil(cacheCleaned);
  });