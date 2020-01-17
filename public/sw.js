
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
  /^https:\/\/developer\.api\.autodesk\.com\/modelderivative\/v2\/viewers/,
  new workbox.strategies.CacheFirst({
    cacheName: 'forge-viewer-library',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  /^https:\/\/dukedhx\.github\.io\/Forge\-Workshop\/shaver/,
  new workbox.strategies.CacheFirst({
    cacheName: 'model-svf',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
); 