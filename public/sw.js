// BUSINESS PRO v4 — offline ishlash uchun (API so'rovlariga tegmaydi)
const CACHE="business-pro-v13";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png","./logo-256.png","./favicon-32.png","./favicon-48.png","./vendor/crystal-ball.js","./vendor/reflective-card.js","./vendor/micro-slats.js","./fonts/inter-latin-wght-normal.woff2","./fonts/inter-latin-ext-wght-normal.woff2","./fonts/inter-cyrillic-wght-normal.woff2"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const req=e.request;if(req.method!=="GET")return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin||url.pathname.startsWith("/api/"))return;
  e.respondWith(fetch(req).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(x=>x.put(req,c))}return r})
    .catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match("./index.html"))));
});
