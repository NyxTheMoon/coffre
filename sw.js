const C="coffre-v6",A=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})))))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request,{cache:"no-cache"}).then(r=>{
    if(r.ok&&new URL(e.request.url).origin===location.origin){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}
    return r;
  }).catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))));
});
