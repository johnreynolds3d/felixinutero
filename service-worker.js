/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/3worldsVR.html","9e0426750f694e4de97b00f7e35bf5b1"],["/CSS3D.html","226ed68ab2324aae45bf320b10f2d5e3"],["/CubeBlaster.html","36aeca4717ff8ec94d879a9e9e8a8262"],["/about.html","8c90f5bdd2a966f2e3280b850f1e9e68"],["/aframe_text.html","0bd42e60de0e756e7e96e35c4f019a44"],["/blog.html","b283141aa015098b3c7abc2c33afe374"],["/blog010118.html","cc5d6cffa3f4b154dc31aae07fcc89b9"],["/blog031217.html","261c82de4e0899f2d16725527113b557"],["/blog171117.html","0626020481db4ce838bd6ef56bd141fe"],["/blog181117.html","31a2e7f9c6f9dec05a621ba50c344548"],["/blog201117.html","944017db68e001e075c5899532fcb154"],["/blog211117.html","4957fbe1892d2cbc39b9a3e042ce8c40"],["/blog311217.html","3d6718b30946958a0317485c6cf31c29"],["/breakr.html","44f197616be5de485461829a61102d37"],["/crypto_plotly.html","24b6784323446b4279e3cb9426956838"],["/css/CSS3D.min.css","8c0a07ee6a05f39c6545251977ce8212"],["/css/about.min.css","52791a1cdf4ecd86f9f813a8b76889ac"],["/css/aframe_text.min.css","54f3a145873729fbe9fef55d510c95cc"],["/css/blog.min.css","678b650813be9424d78ae55ddfecde4e"],["/css/fonts/GoudyOldStyleRegular.woff","a6a5c98cf96b12ca7145ec31747d91e5"],["/css/fonts/HelveticaNeueLTStd-Hv.woff","5aaf54c038cc0b63d757f6ffceb42703"],["/css/fonts/Savoy-Roman-webfont.woff2","eb2d54bd60b8e2a53d3778f49bfd8c22"],["/css/fonts/berthold_city_light_regular-webfont.woff","57525d4096285abf8adbf3c7871e0e08"],["/css/fonts/droid_sans_regular.typeface.json","249cfcd3c661b2857622fd7eca460ab0"],["/css/index.min.css","3ded3c1b47d1c1f67b62e90fbb68dcd5"],["/drivr.html","067d1d316458c38d479348da0d2701e0"],["/drivr2.html","b94001852ce094c4e07ab58bfd79ec56"],["/favicon.ico","7dcc9025811c888602d2814971aeed1c"],["/images/LakeAurora2.jpg","8c08a6f50f290980d5e8b0da5adb2e1f"],["/images/MountainSky.jpg","bf09f339d15c8a15405693ba184c4175"],["/images/StockSnap_0HC9KGLRQJ.jpg","f2ded891c625ea86bebeb85d9916ec95"],["/images/StockSnap_0HC9KGLRQJ_crop.jpg","7da9dfd5993f064d112b1a8298a5fe00"],["/images/StockSnap_22DVN8IWSV.jpg","f6a074aa874dc8fdf349869a89165d8c"],["/images/StockSnap_55TDWI6FC6.jpg","fa19dcbeb7362161df2dfb1d879c6b13"],["/images/StockSnap_FUR5372BT3.jpg","65b60e5bacca1f292acd3698e966abe6"],["/images/StockSnap_IOCZXSRH3C.jpg","f77b167d4d82a5cee2ee14a87970465f"],["/images/StockSnap_KEYPZX8EKK.jpg","20c2bb2430b124054364da985a943eaf"],["/images/StockSnap_S3XBRRS2D9.jpg","f2e861dda00bad9a52a01e8a711595c9"],["/images/StockSnap_YM1V8KLYPK.jpg","70b225497acfead5b9e518c4585bec6e"],["/images/StockSnap_YM1V8KLYPK_crop.jpg","08d505fd5b36982904dfe6611b122a89"],["/images/cube/MilkyWay/nx.jpg","dc0f9416f63992b58ad8b03d38cb301f"],["/images/cube/MilkyWay/ny.jpg","ca10c999e70676f266bf0153940f5225"],["/images/cube/MilkyWay/nz.jpg","311d543f0d609fe3e6083f98525c6dda"],["/images/cube/MilkyWay/px.jpg","32ec0da4a53a52eac199e9e7b6edf3ff"],["/images/cube/MilkyWay/py.jpg","9bf98898e72fe109c8272ac5e81b2e83"],["/images/cube/MilkyWay/pz.jpg","5d9416249b5ff02ebbf2db9adeb6c4b7"],["/images/cube/winter/nx.jpg","f733b2b68ae195ee92cbcf42d908c194"],["/images/cube/winter/ny.jpg","d83edf0a07192b3cc3d89560564681a1"],["/images/cube/winter/nz.jpg","e9a9d2f32f2e9ee3f7d5f2c11ecde620"],["/images/cube/winter/px.jpg","6ae4be457d0fb6db237d7935747857af"],["/images/cube/winter/py.jpg","e2e3a2caf7e1b381babc1cf89a270539"],["/images/cube/winter/pz.jpg","38bb3b86a51e5cb948ce63293a3ce869"],["/images/grid.png","44ed1baca44d13d1f9a2be9d7b09d18b"],["/images/icons/icon-128x128.png","321208f5c38154c1d327c50ef2b34191"],["/images/icons/icon-144x144.png","8a853d271129b31fc441eb6ec87c9062"],["/images/icons/icon-152x152.png","edca70c5ea4420c8abbf2090557b6cf8"],["/images/icons/icon-192x192.png","72bec65ae9133be7894bc2e89c2ff224"],["/images/icons/icon-256x256.png","d761389c5e7f8bba906b771c49d94719"],["/images/icons/icon-512x512.png","671b504160dc094ad47fb31ff533fff7"],["/images/sphere/CrabNebula.jpg","54c8798f4200dca096d18ea5b0d23bc3"],["/index.html","24e55b2a99bb3f31bf2a00c3a6ef92b3"],["/js/CSS3DRenderer.min.js","3366558ea53367d2ce2deec19715eee9"],["/js/ConvexObjectBreaker.min.js","b47e989a3f1694c3b36b26bfd48cd6f6"],["/js/QuickHull.min.js","66c60eee9e0c5ac22802f402bb21fb08"],["/js/WebVR.min.js","9e0822ee37f0bcfc137f54ce2d692b78"],["/js/app.min.js","96767ce46df337b1ad07741bc64691b8"],["/js/controls/OrbitControls.min.js","37901d1442e80f427ba12b5f24360ed7"],["/js/controls/TrackballControls.min.js","7e10f1f1efd7292c51dbb719d57369df"],["/js/fontawesome-all.min.js","9f05663f6fa3663f5ecf914542dd1e4d"],["/js/geometries/ConvexGeometry.min.js","bf4bfe0eb4506314ffdf940054b156ca"],["/js/libs/Detector.min.js","5cc9ebbd3ea67276d34424cd794d168a"],["/js/libs/ammo.min.js","d52a36840bd16c85b69adddd173323b0"],["/js/libs/ammo2.min.js","2669874c6235ef3c7e7edc53ed47f9b2"],["/js/prism.min.js","fb324892cfb3988b4757776e2ccaafe9"],["/js/ray.min.js","edc0d19b6a379126202f0b59c41adcc5"],["/js/three.min.js","cca0c9c7548b6fa62c4de253a5ead729"],["/manifest.json","00f221c0798117eafc8db617da732e42"],["/spidr.html","2857a2d4a9afa02387ee2d27c21c1b8a"],["/walkr.html","8e5298e4f0bfb20d94338433e7ea9096"],["/walkr2.html","ba5c3bd3460340988cf52bebb512582f"],["/webaudio_timing.html","035da020c32fbf0b9923a9bd232e294c"],["/worker.html","8807df891ed35db013afb7c6e6035c76"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







