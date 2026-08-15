# lexlawandtax.com

Static website for **H.R. Legal Associate**, a firm of advocates based in
Lucknow, Uttar Pradesh.

This repository holds the whole site: the structure, the design system, the
shared components, the homepage, the about and advocate pages, seven practice
sections with their Lucknow service pages, the Uttar Pradesh location pages,
twelve legal guides, the frequently asked questions, and the contact,
disclaimer and privacy pages.

## Technology

HTML5, CSS3 and vanilla JavaScript.

- No framework, no bundler, no package manager, no `node_modules`
- No CSS preprocessor
- Two third-party hosts: Google Fonts (typefaces) and Pexels (photographs).
  Both are referenced by URL; nothing is downloaded into the repository.

## Running the site

Open `index.html` directly in a browser. Nothing needs to be installed.

Every internal link is relative and points at an explicit `index.html`, and
every script is a classic (non-module) script, so the site works from a
`file://` URL as well as over HTTP. Without a network connection the font
stacks fall back to Georgia and the system UI font, and remote photographs
degrade to a neutral block.

To preview over HTTP, which is closer to production and lets clean `/about/`
URLs resolve:

```
python3 -m http.server 8000
```

### Regenerating pages

One hundred and two pages share one header, footer, navigation and card set. Rather
than maintain a hundred copies, the markup is generated:

```
node tools/build-pages.js
```

One run also writes three things that must never be edited by hand, because
the next run overwrites them:

- `sitemap.xml`, from the pages that actually exist and are indexable;
- `assets/css/style.min.css` and `assets/js/site.min.js`, from their
  unminified sources.

This is an **authoring aid, not a build step**. Everything it writes is
committed, so the published site has no dependency on it — Node is not needed
to view, host or deploy anything here. Run it after editing a shared component
in `tools/build-pages.js`, a data file, the stylesheet or `site.js`.

```
node tools/build-assets.js
```

A second, rarer aid: it re-renders the PNG icons and the social-sharing card
from `assets/images/favicon.svg` and `assets/images/og-default.svg` using the
Chromium that Playwright provides. It downloads nothing. Run it only if you
edit one of those two SVGs; the PNGs it produces are committed.

## Structure

```
/
├── index.html                     Homepage
├── 404.html                       Not-found page
├── about/                         About the firm
├── advocates/                     Advocate profiles
│   ├── mohammad-kamran/
│   ├── hamid-razzaq/
│   └── irfan-ahmad-khan/
├── practice-areas/                12 practice areas
│   ├── civil-litigation/          criminal-law/
│   ├── cheque-bounce-recovery/    property-law/
│   ├── property-registration/     corporate-law/
│   ├── contractual-agreements/    service-law/
│   ├── employment-law/            income-tax/
│   └── gst/                       firm-business-registration/
├── locations/                     Index + 14 Uttar Pradesh city pages
├── legal-guides/                  Index + 12 guide articles
├── frequently-asked-questions/    9 categories of common questions
├── contact/                       Office details and enquiry form
├── disclaimer/                    Website disclaimer
├── privacy-policy/                Privacy policy
├── components/                    Design-system preview (noindex, not linked)
├── assets/
│   ├── css/style.css              Design system and components
│   ├── js/site-config.js          Firm details (placeholders)
│   ├── js/image-data.js           Adapter over the image registry
│   ├── js/site.js                 Behaviour
│   └── images/
├── civil-litigation/              Practice hub + 4 Lucknow service pages
├── criminal-law/                  Practice hub + 4 Lucknow service pages
├── cheque-bounce-and-recovery/    Practice hub + 4 Lucknow service pages
├── property-law-and-registration/ Practice hub + 9 Lucknow service pages
├── corporate-and-contracts/       Practice hub + 6 Lucknow service pages
├── tax-and-gst/                   Hub + 9 income-tax and GST pages
├── business-registration/         Hub + 6 registration pages
├── src/data/images.js             Image registry — every URL lives here
├── src/data/advocates.js          Advocate registry, incl. withheld details
├── src/data/legal-services.js     Legal hub and service page content
├── src/data/tax-business.js       Tax, GST and registration page content
├── src/data/locations.js          Per-city wording for the location pages
├── src/data/guides.js             Legal guide articles
├── src/data/faqs.js               Frequently asked questions
├── tools/build-pages.js           Page generator (authoring aid)
├── tools/build-assets.js          Icon and social-card renderer (aid)
├── tools/minify.js                CSS and JS minifiers used by the generator
├── assets/css/style.min.css       Generated — do not edit
├── assets/js/site.min.js          Generated — do not edit
├── assets/images/favicon.svg      Placeholder mark; PNGs derived from it
├── assets/images/og-default.svg   Social-sharing card; PNG derived from it
├── site.webmanifest
├── humans.txt
├── robots.txt
├── sitemap.xml                    Generated — do not edit
├── IMAGE-CREDITS.md
└── README.md
```

Every page lives in its own folder as `index.html`, so production URLs are
clean (`/about/`, `/practice-areas/gst/`).

Service Law and Employment Law are deliberately separate: service law covers
government employment, employment law covers private employment. Each page
links across to the other.

## Design system

The full set of components is rendered on one page for review:
**`components/index.html`**. It is `noindex`, disallowed in `robots.txt`, and
not linked from the public site.

### Colour

Predominantly white. Navy and teal carry the interface; gold appears only as
fine rules, borders, icons, small labels and hover details.

| Token | Value | Use |
| --- | --- | --- |
| `--color-navy` | `#102A43` | Headings, primary buttons, header |
| `--color-navy-deep` | `#081C2C` | Top bar, footer |
| `--color-teal` | `#16656B` | Links, focus ring, hover |
| `--color-teal-dark` | `#104D52` | Link hover |
| `--color-gold` | `#B78B4A` | Rules, borders, icons — never text |
| `--color-gold-soft` | `#D8C39A` | Decorative lines on dark |
| `--color-gold-ink` | `#8A6636` | The only gold used for wording |
| `--color-ivory` | `#F8F7F3` | Soft section backgrounds |
| `--color-warm-white` | `#FCFCFA` | Alternate section backgrounds |
| `--color-slate` | `#52606D` | Body text on tinted panels |
| `--color-border` | `#E4E8EB` | Hairlines |
| `--color-text` | `#18232D` | Body text |
| `--color-muted` | `#62717D` | Secondary text |

`--color-gold` is 3.1:1 on white, below the 4.5:1 needed for text, so
`--color-gold-ink` (5.2:1) was derived for eyebrow labels and other small gold
wording. Everything else in the palette is used as supplied.

### Typography

Playfair Display for headings (500/600/700), Manrope for body and interface
(400/500/600/700), both from Google Fonts with `display=swap` and `preconnect`
hints. Sizes are fluid via `clamp()`; paragraphs are capped at 72 characters.
Uppercase is used only for small eyebrow labels.

### Shape and motion

Radii stay at 1–3px — this is an editorial layout, not a rounded-card one.
Reveal animations fade in and rise 18px over 620ms, with a 90ms stagger between
cards capped at 360ms.

## Components

Skip link · top contact bar · header (sticky, compacts on scroll) · desktop
navigation · mega menu · dropdown · mobile drawer · breadcrumbs · section
heading · primary button · secondary button · ghost / inverse / outline buttons
· arrow link · practice-area card · advocate card · location card · article
card · image-and-text split · trust strip · FAQ accordion · contact CTA band ·
footer · disclaimer acknowledgement · back-to-top · 404 layout · media figure
with fallback · form controls · notices.

## Accessibility

- Visible keyboard focus on every interactive element, via one `:focus-visible`
  rule
- Semantic landmarks, a skip link, and breadcrumbs on every inner page
- Buttons that act are `<button>`; links that navigate are `<a>`
- Mobile drawer is a modal dialog with a focus trap, Escape to close and a
  scroll lock; menus expose `aria-expanded` and `aria-controls`
- Accordion triggers are buttons with `aria-expanded` controlling labelled
  regions, and stay open and readable without JavaScript
- Interactive targets are at least 44px
- Text over a photograph always sits on a navy overlay
- All text meets WCAG AA contrast

### Reduced motion

`prefers-reduced-motion: reduce` is respected in two places that back each
other up:

- **JavaScript** does not add the `.js-reveal` class, so the hidden state is
  never applied and content appears immediately.
- **CSS** forces `opacity: 1`, `transform: none` and `transition: none` inside
  the reduced-motion media query, which also covers a visitor who changes the
  setting after the page has loaded.

Smooth scrolling and the back-to-top scroll also switch to instant.

Content is never hidden by CSS that JavaScript might fail to undo: the hidden
state depends on a class that only JavaScript adds.

## Images

Every URL is declared in `src/data/images.js` and nowhere else. Markup carries
a real `src` so images load without JavaScript and the hero still counts for
LCP; `site.js` re-reads the registry at runtime and corrects any `src` that no
longer matches, so editing the registry alone is enough.

- Stock photographs are never downloaded — they load from Pexels
- Never used for the three named advocates, who fall back to an SVG silhouette
- `width`/`height` on every image to avoid layout shift; `object-fit: cover`
- `loading="lazy"` below the fold; the homepage hero is eager with
  `fetchpriority="high"`
- A failed remote image leaves a neutral block, not a broken-image icon
- No image is used more than twice on one page

**Alt text for twelve of the fourteen photographs is provisional and must be
verified** — see [IMAGE-CREDITS.md](IMAGE-CREDITS.md).

## Configuration

Firm contact details live in one place: `assets/js/site-config.js`.

Values in `{{DOUBLE_BRACES}}` are unresolved placeholders. While a value is
unresolved, `site.js` shows a neutral "to be published" label and leaves the
related link inert rather than pointing at a broken target. Replacing the value
is all that is needed — no markup changes.

| Attribute | Purpose |
| --- | --- |
| `data-config` | Key from `window.siteConfig` |
| `data-config-role` | `tel`, `email`, `whatsapp`, `url` or `text` |
| `data-config-text="keep"` | Keep the existing link text, set only the `href` |
| `data-config-slot` | Child element that receives the text |
| `data-pending-label` | Text shown while the value is a placeholder |

While `formEndpoint` is unresolved the contact form renders but its fields are
disabled behind a notice pointing to the telephone and email details.

## Content notes

The site follows the Bar Council of India position that advocates may not
advertise or solicit work. Content is informational and avoids promotional
claims, comparative or superlative wording, testimonials and case results. The
footer carries a standing notice on every page, a disclaimer acknowledgement is
shown once per visitor, and `/disclaimer/` sets out the position in full.

## Deployment

Upload the repository contents to the web root. No build step.

Configure the host to serve `404.html` for missing pages and `index.html` for
folder URLs (most static hosts do this by default). `sitemap.xml` lists
production URLs in their clean `/folder/` form.

Internal links are written as `…/index.html` so the site can be opened from
the filesystem, which was a requirement from the outset. Every page therefore
declares a canonical in the clean `/folder/` form, which is the URL search
engines index. If your host can also redirect `/path/index.html` to `/path/`,
turn that on; the canonical already resolves the duplication either way.

## Homepage

`index.html` is written in full: hero, nine practice-area cards, property and
tax/business feature sections, advocates, positioning, a four-step process,
Lucknow and Uttar Pradesh coverage, legal-guide cards and a contact section.

It carries `LegalService` structured data built from the same `{{PLACEHOLDER}}`
values as the rest of the site. `site.js` substitutes the resolved ones and
**deletes any that are still unresolved**, so search engines are never told
that `{{PHONE_NUMBER}}` is a telephone number.

The three legal-guide cards on the homepage and the guide list in the footer
are both derived from the real articles in `src/data/guides.js` (see
`HOME_GUIDE_SLUGS` in `tools/build-pages.js`), so a card cannot advertise a
guide that does not exist.

## Practice hubs and service pages

Five hubs, each with its Lucknow service pages beneath it, live at the site
root. All of their content is in `src/data/legal-services.js`, which carries
the writing rules at the top of the file. In short: name statutes rather than
sections, never state a court fee or stamp duty rate, never promise a timeline
or an outcome, never cite a judgment, and mark limitation periods and
procedures as the general position to be confirmed on the facts.

Every service page follows the same fifteen-part model — breadcrumbs, a
service-and-location H1, introduction, who it may assist, typical matters,
process, documents required, risks, related services, advocate cards, FAQs, a
coverage statement, contact CTA, disclaimer, and a last-reviewed date driven by
`lastReviewed` in the data file.

### Tax, GST and business registration

`/tax-and-gst/` and `/business-registration/` use the same page model, with
their content in `src/data/tax-business.js`. Two rules apply there that do not
apply elsewhere.

**Nothing numeric that the government sets.** No fee, rate, threshold, penalty
amount, filing due date or processing time appears on any of those pages. These
are notified and revised, and a figure that is right today is wrong next year.
Every page says the position for the particular matter must be checked against
the current notification and portal. Nothing describes how a government portal
behaves, and no approval or notice outcome is promised.

**Who does what.** This is a firm of advocates. Every service page in that
section carries a *scope of assistance* block stating which kinds of work a
matter involves — legal advisory, drafting, return preparation, registration
assistance, representation before an authority, and coordination with other
professionals. It states plainly that audit, and any certificate only a
chartered accountant or company secretary may sign, is coordinated rather than
performed here, and that no designation is claimed for anyone at the firm
beyond enrolment as an advocate. A test asserts that block is present on every
page and that no page claims an in-house CA, an audit or a certification.

### Relationship to `/practice-areas/`

`/practice-areas/` remains the index of all twelve areas. Ten of those pages
cover a topic that now has a developed hub, and each links straight through to
it so the two do not compete for the same reader. The mega menu and the mobile
drawer list the seven hubs above the twelve areas.

### Images

One hero photograph per page, eager with `fetchpriority="high"` and a navy
overlay behind the text. Every other section uses icons. Images follow the
mapping in the data file: `civil` for civil litigation and recovery, `criminal`
for criminal pages, `chequeBounce` for cheque matters, `property` for property,
title and deed pages, `contracts` for agreement pages, `corporate` for
corporate and retainer pages, `tax` for income-tax and GST pages, and
`registration` for firm, LLP, company, proprietorship and Udyam pages.

## Legal guides

Twelve notes at `/legal-guides/<slug>/`, all written in `src/data/guides.js`,
which carries the writing rules at the top of the file.

**Nothing numeric that the law or a notification sets.** No guide states a
court fee, a stamp duty rate, a tax rate, a limitation period, a notice period,
a filing deadline or a processing time. A provision may be *named* — section
138 of the Negotiable Instruments Act, 1881, for example — and the period it
prescribes may be described as one the statute fixes; it may never be given a
number. A figure in a note like this reads as advice and goes stale without
anyone noticing. No case, citation, statutory quotation, portal procedure or
assured outcome appears either.

Each guide instead carries its own `verify` sentence saying what has to be
checked against the current law and the facts of the matter. It is rendered
from the data onto the page and the template cannot omit it. A test asserts
every guide renders its own.

**Nothing is attributed to anyone who has not been assigned to it.** Each
article has `author`, `reviewedBy` and `reviewStatus`. While `reviewStatus` is
`"pending"` the page:

- names no author and no reviewer — the builder omits a withheld name
  entirely, and never prints a placeholder;
- displays *"Drafted for general information and pending final professional
  review."*;
- carries `<meta name="robots" content="noindex,follow">` and is left out of
  `sitemap.xml`.

**All twelve are currently `pending`.** To publish one: have an advocate read
it, put their name in `reviewedBy`, set `reviewStatus: "approved"`, rebuild and
regenerate the sitemap. Do not set `approved` without naming the reviewer — a
test fails if you do.

Each guide follows the same fourteen-part model: breadcrumbs, category, H1,
summary, table of contents, main explanation, practical checklist, common
mistakes, related services, related guides, an authorship-and-review section,
both dates, the disclaimer with its verification sentence, and a contact CTA.
The table of contents is generated from the section headings, so the two
cannot drift apart.

### Category filter

The index filters by the seven categories in the browser. It is progressive
enhancement over a list that is already complete: **all twelve cards are in the
markup, unhidden**, and the filter bar is displayed only under the `js` class
that `site.js` adds, so without JavaScript the full list is readable and
crawlable and no dead control is shown. A category chip on an article links to
`/legal-guides/#property`, and the index applies that filter on load and on
`hashchange`.

A card the filter reveals is marked revealed explicitly — while it is hidden
its bounding box is zero, so neither the IntersectionObserver nor the safety
net in `initReveal` would ever bring it back.

## Frequently asked questions

`/frequently-asked-questions/`, from `src/data/faqs.js`: nine categories,
fifty-four questions. Every answer describes how something generally works and
what a position depends on. **None of them advises anyone.** No answer tells a
reader what to do in their own matter, addresses their facts or predicts an
outcome, and a test scans for exactly those constructions.

## Contact page and the enquiry form

The form asks for name, telephone, email, city, service category, a brief
description, a preferred contact method and a consent acknowledgement.

**It is deliberately inert.** `formEndpoint` in `assets/js/site-config.js` is
`{{FORM_ENDPOINT}}`, so `site.js` disables every control, shows the notice
saying online submission is being configured, and prevents submission. The
markup ships with no `action` attribute at all. Nothing typed into it is
transmitted or stored, and nothing on the page suggests a message was sent.
Telephone, WhatsApp and email stay available throughout, because those are the
routes that actually work today.

Supply a real `formEndpoint` and `site.js` sets the `action`, re-enables the
controls and hides the notice. **Update the privacy policy to say where
submissions go before doing that.**

The map is a placeholder rather than an embed. No address has been confirmed,
and an embedded map would have to point somewhere.

## Location pages

`/locations/` plus fourteen city pages. All of their wording lives in
`src/data/locations.js`; the generator only decides layout.

**One office.** The firm has a single office, in Lucknow. Only
`/locations/lucknow/` carries an address, a telephone number, a map link or
`LegalService` structured data — and that node reuses the homepage's
`@id`, so it is the same organisation with its address stated, not a second
one. Every other city page carries, immediately under the heading, this
sentence with its own city name substituted:

> H.R. Legal Associate is based in Lucknow and assists clients with
> appropriate matters across Uttar Pradesh. This page does not represent a
> separate office in *[city]*.

Those pages carry `WebPage`, `Service` and `BreadcrumbList` and nothing else.
No page names a local office, a local number, a local advocate, a branch, a
local client or a court building, and none claims to be near one. No court or
authority address appears anywhere in the section. The contact block on every
city page is explicitly labelled *Lucknow office*.

**Not doorway pages.** Each city carries its own region description,
introduction, emphasis for each of the six service areas, consultation wording
and three questions. A test measures sentence overlap between every pair of
city pages and fails above 75%; the closest pair currently shares 61%, which is
the firm-wide material (advocates, disclaimer, contact) that is supposed to
repeat.

**Indexing.** `index: true` in the data file makes a page indexable. Seven are
— Lucknow, Kanpur, Prayagraj, Varanasi, Gorakhpur, Bareilly and Agra. The other
seven carry `<meta name="robots" content="noindex,follow">` and this comment in
the source:

```
TODO: Add independently verified city-specific content before changing to index,follow.
```

They are also left out of `sitemap.xml`: listing a page while telling crawlers
not to index it is a contradictory signal. Flip `index` to `true` in
`src/data/locations.js`, rebuild, and regenerate the sitemap.

Only the seven indexable cities are linked from the footer and the homepage.
The locations index links all fourteen, grouped as *Primary launch locations*
and *Additional Uttar Pradesh service areas*.

**Images.** The registry holds one verified photograph of Lucknow and none of
any other district, so that photograph appears on exactly three pages — the
homepage location section, the locations index and the Lucknow page. Every
other city gets a typographic hero instead: ivory ground, a fine map-line
pattern drawn in CSS, the city name, an *Uttar Pradesh* label and a location
mark. A stock photograph that may show somewhere else is not used to stand in
for a city.

There are no service-by-city pages. `/locations/kanpur/` links through to the
Lucknow service pages rather than duplicating them per district.

## Technical SEO

### What every page carries

`lang="en-IN"`, UTF-8, a viewport tag, a unique title and description, a
canonical, exactly one H1 with no skipped heading levels, the full Open Graph
set (`type`, `site_name`, `locale`, `title`, `description`, `url`, `image` with
dimensions and alt), a Twitter summary card, `theme-color`, an SVG favicon with
a PNG fallback, an apple-touch icon, the web manifest, and breadcrumbs wherever
a page sits below the root.

### Canonicals and the `index.html` question

Internal links end in `index.html` because the site has to open from the
filesystem — that was a requirement from the first stage and it has not
changed. Canonicals are always the clean `https://lexlawandtax.com/folder/`
form: lowercase, hyphen-separated, trailing slash, no query string. The
canonical is what search engines index, so the two forms do not compete. A
test asserts every one of those properties on every indexable page.

### Sitemap

`sitemap.xml` is written by `tools/build-pages.js` from the pages that exist,
so it cannot drift. It contains **only indexable canonical URLs**. Excluded:
every page carrying `noindex` (the pending-review guides and the tier-2 city
pages), the 404 page, and the component preview. `robots.txt` points at it and
disallows `/components/`.

### Structured data

| Type | Where |
| --- | --- |
| `Organization` | homepage, `@id` `#organization` — the entity everything else references |
| `WebSite` | homepage, `@id` `#website` |
| `LegalService` | homepage `@id` `#practice`; restated on the Lucknow page with the address |
| `Person` | the three advocate profiles — name, `jobTitle: Advocate`, `worksFor`, description from verified facts only, and `image` only once the photograph file exists |
| `Service` | every practice-area page, hub and service page |
| `FAQPage` | hub and service pages — **only where the questions are visible on the page** |
| `Article` | the twelve guides, with `datePublished` and `dateModified` |
| `BreadcrumbList` | every page below the root |
| `ItemList` | the advocates index |

**What is deliberately absent**, and asserted absent by a test: `Review`,
`AggregateRating`, any star rating, `award`, `foundingDate`, and `sameAs`. None
has been supplied, and a guessed `sameAs` points at somebody else's profile.
No non-Lucknow city page carries a `PostalAddress` or a `LocalBusiness` node.
`openingHours` is absent because no hours were supplied. An `Article` gains
`author` or `reviewedBy` only when the data assigns one — so today, none does.

Every placeholder inside JSON-LD sits in a `data-config-json` block, and
`site.js` deletes any property still unresolved rather than publishing
`{{PHONE_NUMBER}}` as a telephone number.

### Internal linking

Every service page links to its hub, and every hub links to all its children.
Guides declare the services they concern; that declaration is **inverted** by
the generator so each service and hub links back to the guides that name it.
The two directions therefore cannot disagree — there is no second hand-kept
list to fall out of date.

Where no guide covers an area at all, the related-reading section is omitted
rather than padded with a guide from somewhere else. That is currently true of
criminal law, and it is a gap in the guides, not in the linking.

Advocate profiles link to all twelve practice areas. Each city page links to
the six principal hubs and to no other city from its own content; the footer
carries the seven launch locations as ordinary sitewide navigation, and 35
links in total.

### Performance

`assets/css/style.min.css` and `assets/js/site.min.js` are generated by
`tools/minify.js` and committed. Both minifiers are deliberately conservative:
nothing is renamed, reordered or rewritten. The CSS one never touches space
around `:` (`.a :hover` and `.a:hover` are different selectors) or around `+`
and `-` (they are operators inside `calc()` and `clamp()`, where the spaces are
required). The JS one keeps every newline, so automatic semicolon insertion
cannot change meaning.

Two things verify them rather than trusting them: the generator parses the
minified JavaScript before writing it, and a test loads both stylesheets into
the browser's CSSOM and compares the rule sets it actually builds — 557 rules,
identical. Both suites also run against the minified files.

Every script is deferred; there are no libraries. Preconnects go only to the
origins a page actually uses, and the Pexels hint is emitted only on pages that
show a Pexels photograph. One preload per page, for the font stylesheet. Every
`<img>` carries explicit `width` and `height`, and everything except the single
hero per page is lazy-loaded.

### Images

Nothing from Pexels is copied into this repository; the photographs are
referenced by URL and every media figure carries a neutral fallback that
appears if the request fails. The three advocate images remain local paths
served by the silhouette placeholder until real photographs are supplied.

### Prohibited phrases

A test scans all 102 pages and every source, data, config and documentation
file for: `best lawyer`, `top lawyer`, `number one lawyer`, `guaranteed
result`, `guaranteed bail`, `guaranteed registration`, `100% success`,
`member of Bar Council of India`, `Advocate-on-Record`, `advocate on record`
and `AOR`. None appears in prose anywhere.

The list above is written in backticks precisely so the scanner can tell a
documented rule from a breach of it: code spans in Markdown are skipped, plain
prose is not.

One phrase was removed in an earlier pass: a civil-litigation FAQ said
appearance is through `advocate on record`, meaning simply the advocate
conducting the
matter. It reads as the Supreme Court designation to anyone scanning, so it now
says "through the advocate conducting the matter".

## Advocate details

`src/data/advocates.js` holds the advocates' particulars. Only the four
verified facts are published: name, years in practice, Bar Council of Uttar
Pradesh enrolment and the Certificate of Practice.

Everything under `details` is still `{{TO_BE_PROVIDED}}`:

| Field | Published? |
| --- | --- |
| `enrolmentNumber` | withheld |
| `copNumber` | withheld |
| `education` | withheld |
| `languages` | withheld |
| `courtsAndForums` | withheld |

The builder **omits a withheld row from the HTML entirely** — no empty row, no
"coming soon" label, no placeholder text reaching a visitor. Supply a real
value and the row appears on the next build; leave it and nothing is claimed.
The same rule governs `Person` structured data, which also only claims an
`image` once the photograph file actually exists on disk.

Do not fill these in from assumption. An enrolment number or qualification
published in error is a professional-conduct problem, not a content gap.

After editing, run `node tools/build-pages.js`.

## First-visit acknowledgement

The disclaimer acknowledgement opens automatically on the homepage only, and
records acceptance in `localStorage` under `hrla.disclaimer.accepted`. *Exit
Website* closes the tab where the browser permits it and otherwise navigates to
a blank page. The footer link reopens it on any page.

## Final audit

`FINAL-AUDIT.md` records the state of the site as built: what is complete,
what is still missing, and the ordered list of what has to happen before
launch. It is the file to read first if you are the one publishing this.

Two defects were found in that audit and fixed:

- at 320px the header truncated the firm's own name to "H.R. Le…", because
  an ellipsis safety net added earlier to prevent overflow was doing its job
  too literally. The name now wraps to two lines below 36em, which cannot
  overflow and never abbreviates the firm;
- the three four-service hubs stranded a single card as 3+1 at 1024px. Hub
  grids now take their column count from the number of services — four
  across when the count divides by four, three otherwise — so no breakpoint
  strands a card.

## Still to do

- Replace the placeholders in `assets/js/site-config.js`
- Add the three advocate photographs
- Verify and rewrite the provisional image alt text
- **Have an advocate read each of the twelve guides**, then name them as
  `reviewedBy` and set `reviewStatus: "approved"` in `src/data/guides.js`.
  Until that happens every guide is `noindex`
- Supply `formEndpoint` in `assets/js/site-config.js` so the enquiry form can
  send, and update the privacy policy to say where submissions go **before**
  enabling it
- Review the seven `noindex` city pages, add independently verified local
  content, then set `index: true` in `src/data/locations.js` and regenerate
  the sitemap
- Repoint the `relatedGuides` links on the practice hub pages at the guides
  that now exist; they still go to the guides index
- Supply the withheld advocate details in `src/data/advocates.js`, if the firm
  wishes to publish them
