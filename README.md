# lexlawandtax.com

Static website for **H.R. Legal Associate**, a firm of advocates based in
Lucknow, Uttar Pradesh.

This repository holds the site structure, the design system, the shared
components and the completed homepage. The remaining pages carry scaffolding and
a visible "being prepared" notice where their content is still outstanding.

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

Twenty-six pages share one header, footer, navigation and card set. Rather than
maintain twenty-six copies, the markup is generated:

```
node tools/build-pages.js
```

This is an **authoring aid, not a build step**. The published site has no
dependency on it — Node is not needed to view, host or deploy anything here.
Run it only after editing a shared component in `tools/build-pages.js` or the
image registry.

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
├── locations/                     Office and areas covered
├── legal-guides/                  General information notes
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
├── src/data/images.js             Image registry — every URL lives here
├── src/data/advocates.js          Advocate registry, incl. withheld details
├── tools/build-pages.js           Page generator (authoring aid)
├── robots.txt
├── sitemap.xml
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

## Homepage

`index.html` is written in full: hero, nine practice-area cards, property and
tax/business feature sections, advocates, positioning, a four-step process,
Lucknow and Uttar Pradesh coverage, legal-guide cards and a contact section.

It carries `LegalService` structured data built from the same `{{PLACEHOLDER}}`
values as the rest of the site. `site.js` substitutes the resolved ones and
**deletes any that are still unresolved**, so search engines are never told
that `{{PHONE_NUMBER}}` is a telephone number.

Two things on the homepage point at index pages rather than their own URLs,
because those pages are not written yet:

- the eight city links and *View All Service Locations* all go to `/locations/`
- the three legal-guide cards all go to `/legal-guides/`

Neither is a dead link. When the city and guide pages are written, update the
`href`s in `tools/build-pages.js` (`cityLinks` and the `GUIDES` array).

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

## Still to do

- Replace the placeholders in `assets/js/site-config.js`
- Add the three advocate photographs
- Verify and rewrite the provisional image alt text
- Write the practice area, location and guide page content
- Supply the withheld advocate details in `src/data/advocates.js`, if the firm
  wishes to publish them
