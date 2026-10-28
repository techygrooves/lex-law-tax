# Website image audit

Audit of the checked-out website on 28 October 2026. Live Hostinger and GitHub Pages deployments were not inspected.

## Root cause and fix

The advocate registry referenced `.jpg` files while the supplied photographs are `.png`. Corrected the central registry and regenerated the affected HTML so photographs load with or without JavaScript. No CSS, fonts or displayed image containers were changed.

## Every section containing images

| Section | HTML pages audited | Image elements | Local images | Remote images | Advocate portraits |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage / root pages | 2 | 19 | 3 | 16 | 3 |
| about | 1 | 5 | 3 | 2 | 3 |
| advocates | 4 | 6 | 6 | 0 | 6 |
| business-registration | 7 | 28 | 21 | 7 | 21 |
| cheque-bounce-and-recovery | 5 | 20 | 15 | 5 | 15 |
| civil-litigation | 5 | 20 | 15 | 5 | 15 |
| components | 1 | 7 | 2 | 5 | 2 |
| corporate-and-contracts | 7 | 28 | 21 | 7 | 21 |
| criminal-law | 5 | 20 | 15 | 5 | 15 |
| legal-guides | 18 | 1 | 0 | 1 | 0 |
| locations | 15 | 44 | 42 | 2 | 42 |
| practice-areas | 13 | 24 | 0 | 24 | 0 |
| property-law-and-registration | 20 | 40 | 30 | 10 | 30 |
| tax-and-gst | 10 | 40 | 30 | 10 | 30 |

Checked 117 HTML pages. All local HTML image references resolve to existing files. External photographs use 18 distinct Pexels URLs; their live availability was not validated.

## Updating photographs

- Advocate photographs: replace the corresponding file in `assets/images/`; update filename and dimensions in `src/data/images.js` if needed.
- Heroes, practice cards, feature sections and location images: update the matching `photos` entry or practice-area mapping in `src/data/images.js`. These are currently remote Pexels images.
- Run `node tools/build-pages.js`, then review generated pages. The existing generator resets sitemap dates from shared metadata; preserve unrelated publication dates when reviewing changes.
- The existing `data-base` paths support the domain root and GitHub Pages project subdirectories. Do not replace them with `/assets/...` absolute paths.
- Upload every changed HTML page and the registry along with the image files. Preserve folders and letter case. For Hostinger, deploy beneath `public_html`; for GitHub Pages, deploy the merged publishing branch.
- Clear hosting/CDN cache if configured, then hard-refresh the browser after deployment.

## Browser verification

Chromium passed 246 page checks with zero failures: all 117 HTML pages with
JavaScript enabled at both the domain root and a simulated `/lex-law-tax/`
GitHub Pages project path, plus six representative pages at both paths with
JavaScript disabled. The run verified 430 advocate-photo instances: every
portrait loaded the real PNG with a nonzero natural width and no placeholder
class. Local image references, page JavaScript errors and missing-file responses
were checked. External font and Pexels requests were deliberately blocked during
these local-path checks; their live availability is not claimed.
