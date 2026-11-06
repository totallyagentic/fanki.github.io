const BASE = "/fanki.github.io/";
const PREFIX = "frontier-shell-" + BASE + "-";
const CACHE = PREFIX + "dd6dedc07009";
const ASSETS = ["/fanki.github.io/","/fanki.github.io/index.html","/fanki.github.io/manifest.webmanifest","/fanki.github.io/icon.svg","/fanki.github.io/deck-credits.html","/fanki.github.io/import-credits.html","/fanki.github.io/icon-192.png","/fanki.github.io/icon-512.png","/fanki.github.io/assets/index-BuwbsD_8.js","/fanki.github.io/assets/AnkiImport-IJftrP0y.js","/fanki.github.io/assets/library-CH7FzTgY.js","/fanki.github.io/assets/memory-57VzzVVK.js","/fanki.github.io/assets/react-KPuNr9iS.js","/fanki.github.io/assets/rolldown-runtime-XKyaHtl9.js","/fanki.github.io/assets/sql-wasm-browser-DzocAKyf.js","/fanki.github.io/assets/storage-BGGz-qPp.js","/fanki.github.io/assets/validation-DBLlTRm-.js","/fanki.github.io/assets/index-C_gLXJeP.css","/fanki.github.io/assets/sql-wasm-B-9ndiyM.wasm"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(PREFIX) && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("message", (event) => {
  if (event.data?.type === "ACTIVATE_UPDATE") self.skipWaiting();
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (
    event.request.method !== "GET" ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/auth/")
  )
    return;
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches
        .open(CACHE)
        .then(
          async (cache) =>
            (await cache.match(BASE + "index.html")) || fetch(event.request),
        ),
    );
    return;
  }
  if (ASSETS.includes(url.pathname))
    event.respondWith(
      caches
        .open(CACHE)
        .then(
          async (cache) =>
            (await cache.match(url.pathname)) || fetch(event.request),
        ),
    );
});
