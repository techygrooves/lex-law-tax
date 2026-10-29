# Website placeholder audit — 28 October 2026

## What was fixed

- Replaced the preparation notices on all 12 practice-area pages with relevant overview, scope, detailed-service links, document checklists, process guidance and FAQs. Existing layout, styles and fonts are unchanged.
- Embedded confirmed telephone, WhatsApp, email, address and map links in every page’s static HTML. JavaScript is no longer required to replace contact fallback text.
- Updated contact elements in hand-authored pages without regenerating article bodies.
- Resolved the contact form endpoint using the same Formspree destination already present on the homepage, added a static form action and updated the privacy policy. This connection was explicitly authorised by the user. No test submission was sent; email delivery and account limits were not verified.
- Preserved existing sitemap publication dates during regeneration.

## Confirmed contact details

| Detail | Published value |
| --- | --- |
| Telephone / WhatsApp | +91 83187 72717 |
| Email | legal@lexlawandtax.com |
| Address | Shop No. 4, Opposite Shia P.G. College, Sitapur Road, Lucknow, Uttar Pradesh 226020, India |
| Directions | Existing Google Maps link in site-config.js |

No contact or address value is missing. No new contact information was invented.

## Remaining source fields and deliberate fallbacks

- **Advocate profiles:** the existing public information is sufficient by the firm’s decision. Optional unpublished fields were removed from the registry; no further qualifications or enrolment numbers are awaited.
- **Article bylines:** unassigned articles now use H.R. Legal Associate as a visible editorial author and an Organization in structured data. No individual reviewer is invented or claimed.
- **Image descriptions:** the firm confirmed the remaining 12 descriptions; all current photo records have `altVerified: true`.
- **Image fallbacks:** the silhouette and neutral media fallback remain for genuine loading errors. Real advocate PNGs continue to be referenced.
- **Map panel:** intentionally links to Google Maps instead of embedding it; it is not missing an address.
- **Form input hints:** ordinary placeholders such as “Full name” are input guidance, not missing page content.
- **Fallback-label attributes:** `data-pending-label` values remain as defensive metadata if a future config value is removed; they are not the text currently published in the HTML.
- **City-page indexability:** cities lacking independently verified local content retain their existing noindex settings; no branch offices or local facts were invented.

## Validation

Static audit: 119 HTML pages and 1,503 contact configuration elements checked, with no visible preparation notice, unresolved contact/address text, placeholder token or missing contact-link destination. All 12 practice pages have substantive guidance. Seven renderer regression tests cover icon preservation, nested contact cards, escaping, addresses, structured-data tokens, missing values and repeatability. A second build produces identical HTML and sitemap output.

Browser verification: 268 page checks passed with JavaScript enabled and disabled, covering all 119 pages at the root plus practice/contact/home pages under a simulated GitHub Pages project path. No page JavaScript errors or pending contact values were found. Form actions and enabled controls were checked without submitting messages.

These results concern the checked-out site. Merge and deploy the changes to update Hostinger and GitHub Pages.

## Editorial completion

The firm’s subsequent instructions have been applied: no additional advocate
credentials are required, the twelve outstanding image descriptions are confirmed,
and all 29 Article/BlogPosting records have firm Organization authors. Authored
articles carry the firm byline, while generated guides show the firm in the
existing authorship block. Existing individually assigned authors would be preserved.

Editorial verification: all 29 Article/BlogPosting records use an Organization
author. All 18 photo descriptions are verified, including the 12 confirmed in
this update. Fifty-eight article-byline browser checks passed with JavaScript
on/off under a GitHub Pages project path. Three attribution regression tests
passed alongside the seven contact-rendering tests. Advocate profile HTML and
shared CSS remain unchanged.
