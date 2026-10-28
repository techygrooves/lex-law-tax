# Current editorial status

The firm has completed its image-description verification and opted against further advocate credentials. Article bylines use H.R. Legal Associate. Older launch observations below are historical; see `PLACEHOLDER-AUDIT.md` for the current audit.

# Final audit — lexlawandtax.com

**H.R. Legal Associate**, advocates, Lucknow, Uttar Pradesh.
Audit date: 8 August 2026. Content last reviewed: 7 August 2026.

This file records the state of the site as built, what is still missing,
and what has to happen before it goes live. It is written to be read by
whoever presses publish.

---

## 1. Pages completed

**102 pages.** A clean build — deleting every generated file and running
`node tools/build-pages.js` again — reproduces the committed tree with no
difference, so nothing on disk is stale and nothing is hand-edited.

| Section | Pages |
| --- | --- |
| Homepage | 1 |
| About, advocates index, 3 advocate profiles | 5 |
| Practice areas index + 12 areas | 13 |
| 7 practice hubs + 42 Lucknow service pages | 49 |
| Locations index + 14 city pages | 15 |
| Legal guides index + 12 guides | 13 |
| Frequently asked questions | 1 |
| Contact, disclaimer, privacy policy | 3 |
| 404 | 1 |
| Component preview (internal, unlinked, `noindex`) | 1 |
| **Total** | **102** |

Also generated: `sitemap.xml` (81 URLs), `robots.txt`, `humans.txt`,
`site.webmanifest`, a favicon set, a social-sharing card,
`assets/css/style.min.css` (83kB → 60kB) and `assets/js/site.min.js`
(28kB → 17kB).

---

## 2. Indexable pages

**81.** Every one carries a unique title, a unique meta description, a
unique canonical in the clean `https://lexlawandtax.com/folder/` form,
exactly one H1, no skipped heading level, the full Open Graph and Twitter
set, and structured data. All 81 appear in `sitemap.xml`, and nothing
else does.

---

## 3. Noindex pages

**21**, each deliberate and each carrying `<meta name="robots"
content="noindex,follow">`.

**12 guides awaiting professional review** — every guide the site has:

- `/legal-guides/property-documents-to-check-before-buying-in-lucknow/`
- `/legal-guides/sale-deed-vs-agreement-to-sell-uttar-pradesh/`
- `/legal-guides/property-mutation-dakhil-kharij-overview/`
- `/legal-guides/gift-deed-vs-will-for-property-transfer/`
- `/legal-guides/steps-after-a-cheque-is-dishonoured/`
- `/legal-guides/cheque-bounce-case-vs-money-recovery-suit/`
- `/legal-guides/important-clauses-in-a-partnership-deed/`
- `/legal-guides/mou-vs-legally-binding-agreement/`
- `/legal-guides/commercial-lease-agreement-checklist/`
- `/legal-guides/how-to-respond-to-a-gst-notice/`
- `/legal-guides/income-tax-notice-general-response-guide/`
- `/legal-guides/legal-and-tax-checklist-for-starting-a-firm/`

**7 tier-2 city pages awaiting independently verified local content** —
Ghaziabad, Meerut, Aligarh, Moradabad, Saharanpur, Noida, Firozabad.

**2 pages that should never be indexed** — `/404.html` and
`/components/` (the internal design-system preview, which is also
unlinked and disallowed in `robots.txt`).

---

## 4. Remaining placeholders

### Firm contact details — `assets/js/site-config.js`

**The firm's contact details are confirmed and embedded in the HTML.**
Telephone and WhatsApp use `+91 83187 72717`; email is
`legal@lexlawandtax.com`. The address is Shop No. 4, Opposite Shia P.G.
College, Sitapur Road, Lucknow, Uttar Pradesh 226020, India.

The contact form now uses the same existing Formspree destination as the
homepage. No contact or address field remains unresolved, including when
JavaScript is unavailable. See `PLACEHOLDER-AUDIT.md` for the current audit.

### Advocate public information — complete by firm decision

The firm has confirmed that the existing names, experience and credential lines
are sufficient. Optional further personal particulars were removed from the
registry; none are awaited for publication. Unassigned articles use the firm’s
Organization byline without inventing individual authors or reviewers. The
remaining twelve image descriptions were also confirmed by the firm.

See `PLACEHOLDER-AUDIT.md` for the latest editorial status.

---

## 5. Advocate photographs — corrected 28 October 2026

The supplied PNG files were present, but the image registry requested nonexistent
JPG filenames. The registry now references `kamran-adv.png`, `hamid-adv.png` and
`mateen-adv.png` in `assets/images/`, with their intrinsic dimensions of
1086 × 1448. Generated pages now embed the real photos, and advocate profile
structured data includes the matching image URLs. The existing CSS crop and
layout remain unchanged. Missing images retain the silhouette fallback.

See `IMAGE-AUDIT.md` for the current section inventory and validation scope,
and `IMAGE-CREDITS.md` for the exact replacement paths.

---

## 6. Contact information — supplied

The firm has **one office, in Lucknow**, and its details are now
confirmed and live across the site:

| | |
| --- | --- |
| Address | Shop No. 4, Opposite Shia P.G. College, Sitapur Road, Lucknow, Uttar Pradesh 226020, India |
| Telephone | +91 83187 72717 — `tel:+918318772717` |
| WhatsApp | +91 83187 72717 — `https://wa.me/918318772717` |
| Email | legal@lexlawandtax.com |
| Map | the firm's own Google Maps link, opened in a new tab |

The address appears in three forms, all derived from the one official
value in `site-config.js`: set over three lines where there is room (the
contact page, the footer, the Lucknow page, the contact panels), compact
in the header bar and the mobile menu (*Sitapur Road, Lucknow 226020*),
and split across `streetAddress` / `addressLocality` / `addressRegion` /
`postalCode` / `addressCountry` in the structured data.

Still no second office, no other telephone number, no map embed and no
map listing other than the firm's own.

---

## 7. Enquiry forms — connected to the existing destination

The home and contact pages both post to the existing Formspree endpoint.
The contact form includes a static action and is not disabled. The privacy
policy describes Formspree processing for both forms. Delivery, quota and
account configuration must be checked in the Formspree dashboard; no test
message was submitted during the placeholder audit.

---

## 8. Pages pending professional review

**All 12 guides.** Each carries `reviewStatus: "pending"` in
`src/data/guides.js`, and while it does the page:

- names no author and no reviewer — the builder omits a withheld name
  entirely and never prints a placeholder;
- displays *"Drafted for general information and pending final
  professional review."*;
- carries `noindex,follow` with a TODO comment in the source, and is
  excluded from the sitemap.

To publish one: an advocate reads it, their name goes in `reviewedBy`,
`reviewStatus` becomes `"approved"`, then rebuild. A test fails the build
process if an article is marked approved without a named reviewer.

No guide states a court fee, stamp duty rate, tax rate, limitation
period, notice period, filing deadline or processing time, and none
cites a case or quotes a statute. Each carries its own sentence saying
what must be verified against current law and the facts of the matter.

---

## 9. Remote images

**None could be verified from the build environment.** All 18
photographs are referenced by URL from `images.pexels.com`, and outbound
access to that host is blocked here — the proxy answers `403` to
`CONNECT`, and Chromium reports `ERR_TUNNEL_CONNECTION_FAILED` for every
one.

This is an environment limitation, not a fault found in the site. The
correct reading is **"unverified", not "failed"**: no URL has been shown
to be broken, and none has been shown to work.

Two consequences follow, and both need attention before launch:

1. **Alt text for 12 of the 18 photographs is provisional**, marked
   `altVerified: false` in `src/data/images.js`. It was written from what
   each image is meant to depict, not from seeing it. Someone must open
   each URL, confirm the photograph is appropriate for a legal practice,
   and rewrite the alt text to describe what is actually shown.
2. **Every URL should be loaded once** from a machine with normal
   internet access to confirm it resolves and the licence still holds.
   Credits are in `IMAGE-CREDITS.md`.

Every image is wrapped in a figure carrying a neutral fallback — a
muted panel with an "Image unavailable" note — so a failed request
degrades quietly rather than leaving a broken icon. All 249 media figures
on the site carry it. Nothing from Pexels is copied into this repository.

**Google Fonts is also unreachable here**, so the site has only ever been
rendered in its fallback stacks (Georgia for headings, system sans for
body). The web fonts are declared correctly with `display=swap`, a
preload and preconnects, but the rendered result with Playfair Display
and Manrope actually loading has never been seen. Look at it once on a
normal connection.

---

## 10. What was checked, and what was found

Every item below is asserted by a test in the audit suite, not just
eyeballed.

### Build

A clean rebuild after deleting all 102 generated pages, the sitemap and
both minified assets reproduces the committed tree exactly. No stale
file, no source map, no lock file, no editor backup, no `node_modules`.

There is **no `dist` directory**: the site is served from the repository
root, because opening `index.html` directly has been a requirement since
the first stage. `tools/` is an authoring aid, is excluded in
`robots.txt`, and need not be uploaded at all.

### Visual — 19 representative pages at 320, 375, 430, 768, 1024, 1280, 1440 and 1920px

No horizontal overflow anywhere. No cut-off heading. No overlapping
navigation. No cramped button. No distorted image. Cards in a row share a
height, and no grid strands a single card. Long city names wrap. The
mobile menu opens as a focus-trapping modal, locks scroll, and Escape
closes it and restores focus. Both desktop dropdowns open and close on
Escape.

**Two defects were found and fixed in this pass:**

1. At 320px the header truncated the firm's own name to "H.R. Le…" — an
   ellipsis safety net added earlier to prevent overflow was doing its
   job too literally. The name now wraps to two lines below 36em, which
   cannot overflow and never abbreviates the firm.
2. The four-service hubs (civil litigation, criminal law, cheque bounce)
   stranded a single card as 3+1 at 1024px. Hub grids now take their
   column count from the number of services — four across when the count
   divides by four, three otherwise — so no band strands a card.

### Design

43 radius declarations, all 3px or under apart from the one deliberate
pill chip. Three shadows, none above 0.09 alpha. Ten gradients, confined
to the image overlay, the guide-card header and the city-hero map lines.
No bounce easing, no zoom, no infinite animation. No emoji anywhere. No
gavel imagery. The most-used photograph accounts for 15% of 97 image
placements, and no photograph appears more than twice on a page.

### Animation

Reveals move 18px over 620ms, settle to full opacity with no transform,
and run once — a revealed element is unobserved, so scrolling back cannot
replay it. Only `opacity` and `transform` are animated, so mobile stays
smooth. `prefers-reduced-motion` disables the reveal system entirely and
turns off smooth scrolling; nothing is ever hidden. With JavaScript
disabled, all 19 pages show every block, their navigation, open
accordions and no blocking dialog.

### Accessibility

Skip link is first in the tab order and visibly focused. Every form
control is labelled. Every anchor has an `href`. No inline handler. Every
icon is `aria-hidden`. Every image has meaningful alt text. Accordions
are real buttons controlling regions labelled by their trigger. The
disclaimer acknowledgement is a labelled, described modal that takes
focus, traps it, and offers both choices. Escape closes every overlay.
No interactive element in `main` is removed from the tab order.
**15,954 text nodes meet WCAG 2.1 AA contrast.**

### Content

No lorem ipsum. No telephone number, email address, PIN code or premises
number. No client count, case count or success rate. No award, rating or
review. No emoji. No case citation, law-report reference, rupee amount,
tax rate, statutory period or filing deadline. No `AOR`,
`Advocate-on-Record`, `member of Bar Council of India`, `best lawyer`,
`top lawyer`, `number one lawyer`, `guaranteed result`, `guaranteed
bail`, `guaranteed registration` or `100% success`.

Two wordings were corrected across this and the previous pass: a
civil-litigation answer that said appearance is through the "advocate on
record" — meaning the advocate conducting the matter, but reading as the
Supreme Court designation — and a cheque-bounce answer that stated the
maximum sentence and fine as figures. Both now use the qualitative form
the rest of the site uses.

### Advocates

All three carry exactly the four supplied facts and nothing more:

| Advocate | Experience | Credentials |
| --- | --- | --- |
| Advocate Mohammad Kamran | 10+ Years of Legal Experience | Enrolled with the Bar Council of Uttar Pradesh · Certificate of Practice holder |
| Advocate Hamid Razzaq | 15+ Years of Legal Experience | Enrolled with the Bar Council of Uttar Pradesh · Certificate of Practice holder |
| Advocate Irfan Ahmad Khan | 20+ Years of Legal Experience | Enrolled with the Bar Council of Uttar Pradesh · Certificate of Practice holder |

No specialisation, qualification, court list, designation or firm role is
claimed for any of them, and no withheld detail is rendered.

### Locations

One principal office, Lucknow, and it is the only page carrying an
address, a telephone number, a map link or `LegalService` structured
data. The other 13 cities each state, above the fold:

> H.R. Legal Associate is based in Lucknow and assists clients with
> appropriate matters across Uttar Pradesh. This page does not represent
> a separate office in *[city]*.

No fake branch, no fake local number, no locally based advocate, no local
testimonial, no court-proximity claim, and no Google Maps listing or
embed anywhere on the site. The city excluded by the brief, `Ayodhya`,
appears in no page, data file or asset — the name is written in backticks
here so the test that enforces its absence can tell this record apart
from a breach of the rule. The seven tier-1 pages are indexable; the
other seven are not.

### Technical

All internal links resolve. Every breadcrumb link resolves and matches
its `BreadcrumbList`. All JSON-LD parses, with `@context`, `@type` and no
empty value. No duplicate title, description or H1 among the 81
indexable pages. Every external image is HTTPS and in the registry.
`robots.txt`, the 404 page and the 81-URL sitemap are well formed and
resolve. HTML structure is sound: tags balanced, ids unique, no nested
interactive element, no block inside a paragraph, one `<main>` per page
with header and footer landmarks, lists containing only list items.
**Zero JavaScript errors** across every page.

Structured data implemented: `Organization`, `WebSite`, `LegalService`,
`Person` ×3, `Service` ×67, `FAQPage` ×50 (only where the questions are
visible), `Article` ×12, `BreadcrumbList` ×96, `ItemList`. Deliberately
absent: `Review`, `AggregateRating`, star ratings, `award`,
`foundingDate`, `sameAs`, `openingHours`, and any address or
`LocalBusiness` node on a non-Lucknow city page — none was supplied.

---

## 11. Recommended steps before launch

**Must be done — the site should not go live without these.**

1. ~~Supply the office details~~ — **done.** Telephone, WhatsApp, email,
   address, postal code and map link are confirmed and live.
2. **Have an advocate read all 12 guides.** Name them in `reviewedBy`,
   set `reviewStatus: "approved"`, rebuild, and the guides become
   indexable. Publishing legal information the firm has not read is the
   single largest professional risk on this site.
3. **Open every one of the 18 Pexels URLs**, confirm each photograph is
   appropriate, and rewrite the alt text for the 12 marked
   `altVerified: false`. Then set `altVerified: true`.
4. **Review the disclaimer and privacy policy with the firm**, since both
   speak for it.

**Should be done before launch.**

5. **Deploy the corrected advocate photograph references** together with the
   three supplied PNG files and regenerated nested HTML pages; see §5.
6. **Verify Formspree delivery and account settings** for the configured
   enquiry forms; see §7. Telephone, WhatsApp and email remain available. A
   half-configured form is not.
7. **Look at the site once with the web fonts loading.** It has only ever
   been seen in fallback type here.
8. **Replace the placeholder favicon and social card.** Both are
   typographic stand-ins built from the firm's initials and brand
   colours. They claim nothing, but they are not a designed mark.
9. **Supply the withheld advocate details**, if the firm wishes to
   publish them. They are optional; the pages are complete without them.

**After launch.**

10. Add local content to the seven tier-2 city pages, have it verified,
    then set `index: true` in `src/data/locations.js` and rebuild.
11. Write a criminal-law guide. It is the one practice area with no
    guide, so those five service pages omit the related-reading section
    rather than link to something unrelated.
12. Configure the host to serve `404.html` for missing pages and
    `index.html` for folder URLs, and — if it can — redirect
    `/path/index.html` to `/path/`. The canonical already resolves that
    duplication, so this is tidiness rather than a fix.
13. Submit `sitemap.xml` to Google Search Console and Bing Webmaster
    Tools, and re-submit after step 2, when 12 more pages become
    indexable.
14. Set a review cadence. Every page carries a last-reviewed date, and
    those dates are a promise to keep looking.

---

## 12. Standing rules for whoever maintains this

- **Never replace a placeholder with a plausible guess.** Every
  `{{PLACEHOLDER}}` in this repository is there because the real value
  was not supplied. An invented address, enrolment number or fee is worse
  than a visible gap.
- **Never state a fee, rate, limitation period or deadline** on any page.
  They are set by statute and notification, they change, and a figure on
  a website is wrong the day it changes. Say what must be verified
  instead.
- **Never attribute an article to an advocate who has not read it.**
- **The firm has one office.** No page may imply a second.
- Edit content in `src/data/*.js`, never in the generated HTML, and run
  `node tools/build-pages.js` afterwards. It also regenerates the
  sitemap and the minified assets.
