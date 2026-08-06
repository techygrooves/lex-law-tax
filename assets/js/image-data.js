/*
 * Image data adapter
 * ------------------
 * The registry itself lives in src/data/images.js — that file is the
 * single place any image URL is written.
 *
 * This file derives the flat `window.imageData` lookup that site.js
 * resolves `data-image="..."` references against, so markup can say
 * `data-image="photos.hero"` or `data-image="advocates.hamid-razzaq"`
 * without knowing how the registry is shaped.
 *
 * Load order matters: src/data/images.js must come before this file.
 */

(function () {
  "use strict";

  var registry = window.siteImages;

  if (!registry) {
    /* Missing registry is a wiring mistake, not a runtime condition.
       Fail quietly with an empty map so pages still render — every
       image already carries a usable src in the markup. */
    window.imageData = { photos: {}, advocates: {}, fallbacks: {} };
    return;
  }

  var data = {
    photos: {},
    advocates: {},
    fallbacks: registry.fallbacks || {},
    practiceAreas: registry.practiceAreas || {}
  };

  /* Remote photographs: `url` becomes `src` so every record the
     resolver sees has the same shape. Neutral block, not the advocate
     silhouette, when a remote photograph fails. */
  Object.keys(registry.photos || {}).forEach(function (key) {
    var photo = registry.photos[key];
    data.photos[key] = {
      src: photo.url,
      alt: photo.alt,
      width: photo.width,
      height: photo.height,
      source: photo.source,
      altVerified: photo.altVerified === true,
      fallback: null
    };
  });

  /* Advocate photographs fall back to the SVG silhouette. */
  Object.keys(registry.advocates || {}).forEach(function (key) {
    var advocate = registry.advocates[key];
    data.advocates[key] = {
      src: advocate.src,
      alt: advocate.alt,
      width: advocate.width,
      height: advocate.height,
      fallback: (registry.fallbacks || {}).advocate || null
    };
  });

  window.imageData = data;
})();
