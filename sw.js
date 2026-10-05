// sw.js - Service Worker hỗ trợ 100% Offline-First PWA (Network-First với Fallback Cache)
const CACHE_NAME = "ngan-learning-v4";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./data/data-core.js",
  "./data/curriculum-registry.js",
  "./data/diagnostic-assessment.js",
  "./data/modules/mod-01-foundation.js",
  "./data/modules/mod-02-integers.js",
  "./data/modules/mod-03-integers-z.js",
  "./data/modules/mod-04-fractions.js",
  "./data/modules/mod-05-geometry.js",
  "./data/modules/mod-06-symmetry.js",
  "./data/modules/mod-07-statistics.js",
  "./data/modules/mod-08-probability.js",
  "./data/modules/mod-09-algebra-olympiad.js",
  "./data/games/rush-hour-boards.js",
  "./data/games/rush-hour-boards-part1.js",
  "./data/games/rush-hour-boards-part2.js",
  "./data/games/spatial-3d-challenges.js",
  "./data/games/spatial-3d-challenges-part1.js",
  "./data/games/spatial-3d-challenges-part2.js",
  "./data/games/tangram-puzzles.js",
  "./data/games/logic-grid-cases.js",
  "./data/games/logic-grid-cases-part1.js",
  "./data/games/logic-grid-cases-part2.js",
  "./data/games/bar-model-challenges.js",
  "./data/games/balance-scale-detective.js",
  "./js/core.js",
  "./js/game-registry.js",
  "./js/competency-engine.js",
  "./js/touch-keypad.js",
  "./js/keyboard-adapt.js",
  "./js/image-compressor.js",
  "./js/photo-grader.js",
  "./js/parent-feedback.js",
  "./js/study-timer.js",
  "./js/drive-sync.js",
  "./js/render-views.js",
  "./js/games/speed-math.js",
  "./js/games/rush-hour.js",
  "./js/games/spatial-3d.js",
  "./js/games/tangram.js",
  "./js/games/chimp-memory.js",
  "./js/games/logic-grid.js",
  "./js/games/bar-model.js",
  "./js/games/balance-detective.js",
  "./js/games/integer-submarine.js",
  "./js/games/prime-buster.js",
  "./js/games/fraction-forge.js",
  "./js/games/algebra-scale.js",
  "./js/games/spot-the-bug.js",
  "./js/games/symmetry-lab.js",
  "./js/games/make-target.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("[SW] Cache prefetch partial failure:", err);
      });
    })
  );
});

self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

// Network-First cho tài nguyên ứng dụng để luôn nhận bản cập nhật mới nhất
self.addEventListener("fetch", (e) => {
  if (e.request.url.includes("/api/")) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
