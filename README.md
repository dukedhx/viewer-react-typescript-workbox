[![Build Status](https://travis-ci.org/dukedhx/viewer-react-typescript-workbox.svg?branch=master)](https://travis-ci.org/dukedhx/viewer-react-typescript-workbox)
[![Autodesk Forge](https://img.shields.io/badge/Autodesk-Forge-orange.svg)](http://forge.autodesk.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v3-blue.svg)](https://www.typescriptlang.org/)
[![Workbox](https://img.shields.io/badge/workbox-v4-orange.svg)](https://developers.google.com/web/tools/workbox/)

## Description

This is a sample project intended as a starting point for React, TypeScript and Autodesk Forge Viewer with sought after features like lazy loading, caching and PWA. 

## Prerequisites

- Install [Node.js](https://nodejs.org/en/download/)

## Setup and Run

- Clone this sample and navigates to this
- `npm install` //install dependencies
- `npm start` //a browser session should start and navigate to http://localhost:3000 for preview

## Tips and Tricks

This sample leverages Workbox (a set of libraries and Node modules that make it easy to cache assets and take full advantage of the Service Worker and Cache APIs and their features used to build Progressive Web Apps) as well as key new features of React 16 such as the Hooks API.

With the Workbox it's extremely easy to cache responses by adding routes to your service worker:

```
//./public/sw.js
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

```

So if you'd like to cache models hosted on Forge or your own services simply add routes accordingly:

```
workbox.routing.registerRoute(
 /^https:\/\/developer.api.autodesk.com\/derivativeservice\/v2\/derivatives\/{your model URN goes here}/,
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
 /^https:\/\/path\/to\/your\/modelSVF/,
  new workbox.strategies.CacheFirst({
    cacheName: 'forge-viewer-library',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
```

Note that in our sample we explicitly reference and import the workbox library at the top of our script - this can be managed by your build tools for a more managed/streamlined developer experience and you can use workbox-webpack-plugin for example.

And once the model is cached (loaded once with the network available) it'd load from cache  without network from there on:

<iframe class="embeddedObject shadow resizable" name="embedded_content" scrolling="no" frameborder="0" type="text/html" 
        style="overflow:hidden;" src="https://www.screencast.com/users/dukedhx/folders/Default/media/9bfbaeab-f797-456f-9ced-cfc4b171cbaf/embed" height="600" width="800" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

You may also want to brand your app as a PWA by customizing the "manifest.json" which would get picked up by client browser when installing the app:

```
//./public/manifest.json
{
  "short_name": "Your APP",
  "name": "Your APP name",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

## License

[MIT](http://opensource.org/licenses/MIT)

## Written By

[Bryan Huang](https://www.linkedin.com/in/bryan-huang-1447b862) - Forge Partner Development https://forge.autodesk.com
