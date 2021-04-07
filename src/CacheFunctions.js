import React from "react";

/*takes a url and attempts to store it in the cache, returns true if the cache operation was
successful, false otherwise.
*/
export function CacheDocument(url) {
  return caches.open('favorites').then(function(cache) {
    var updateCache = fetch(url, {redirect:"error"}).then(function(response) {
      if (!response.ok) {
        throw new TypeError('bad response status');
      }
      return cache.put(url, response);
    })
    return updateCache.then(function() {
      console.log("article was cached in favorites")
      caches.open("documents").then(function(cache){
          cache.delete(url)
      })
      return true
      
    }).catch(function (error) {
      console.log("article was not cached in favorites")
      return false
    })
  })
}

// deletes a document from the cache if it exists
export function UncacheDocument(url){
    caches.open('favorites').then(cache => {
      cache.delete(url)
    })
}

/* React hook used to store and retrieve values from localStorage.
used to maintain state variables across sessions*/
export function UseStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}

/*updates the graphQL query stored in the Cache*/
export function UpdateQuery(operation){
  fetch('http://192.168.1.201:4000', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 
    `
    {
    feed {
        id
          name
          url   
      }
    }
    `
    }),
  })
  .then(res => res.json())
  .then(res => window.localStorage.setItem("Query", JSON.stringify(res.data)))
  .catch(function(error) {
    console.log(error)
  });
  if (operation ==="reload"){
    window.location.reload()
  }
  
}