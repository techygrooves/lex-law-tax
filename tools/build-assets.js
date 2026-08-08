#!/usr/bin/env node
/*
 * Raster asset generator — an authoring aid, not a build step.
 * ------------------------------------------------------------
 * Renders the PNGs that social platforms and mobile launchers need from
 * the committed SVG sources, using the Chromium that Playwright already
 * provides. The PNGs it writes are committed, so the published site has
 * no dependency on Node or on this script.
 *
 * Run it only after editing assets/images/favicon.svg or og-default.svg:
 *
 *   node tools/build-assets.js
 *
 * It never downloads anything. The only inputs are the two SVGs in this
 * repository.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const IMG = path.join(ROOT, "assets/images");

/* [source svg, output png, width, height] */
const TARGETS = [
  ["favicon.svg", "favicon-32.png", 32, 32],
  ["favicon.svg", "favicon-180.png", 180, 180],
  ["favicon.svg", "icon-192.png", 192, 192],
  ["favicon.svg", "icon-512.png", 512, 512],
  ["og-default.svg", "og-default.png", 1200, 630]
];

(async () => {
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch (e) {
    console.error(
      "Playwright is not resolvable. The PNGs in assets/images are committed,\n" +
      "so this only matters if you have edited one of the SVG sources.\n" +
      "Run with: NODE_PATH=$(npm root -g) node tools/build-assets.js"
    );
    process.exit(1);
  }

  const browser = await chromium.launch();
  for (const [src, out, w, h] of TARGETS) {
    const svg = fs.readFileSync(path.join(IMG, src), "utf8");
    const page = await browser.newPage({
      viewport: { width: w, height: h },
      deviceScaleFactor: 1
    });
    /* The SVG is inlined rather than loaded, so nothing is fetched. */
    await page.setContent(
      '<!doctype html><meta charset="utf-8">' +
      "<style>html,body{margin:0;padding:0;background:transparent}" +
      "svg{display:block;width:" + w + "px;height:" + h + "px}</style>" +
      svg,
      { waitUntil: "load" }
    );
    await page.screenshot({ path: path.join(IMG, out), omitBackground: false });
    await page.close();
    console.log("  assets/images/" + out + "  " + w + "x" + h);
  }
  await browser.close();
  console.log("\n" + TARGETS.length + " images written.");
})();
