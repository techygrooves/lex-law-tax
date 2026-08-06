# lexlawandtax.com

Static website foundation for **H.R. Legal Associate**, a firm of advocates
based in Lucknow, Uttar Pradesh.

This repository contains the site structure, shared header and footer, base
stylesheet, JavaScript and configuration. Full page content is written in a
later stage.

## Technology

HTML5, CSS3 and vanilla JavaScript only.

- No build step
- No package manager, no `node_modules`, no dependencies
- No frameworks, no CSS preprocessors
- No external requests: no CDN scripts, no web fonts, no analytics

## Running the site

Open `index.html` directly in a browser. Nothing needs to be installed and no
server is required.

Every internal link is relative and points at an explicit `index.html`, and
every script is a classic (non-module) script, so the site works from a
`file://` URL as well as over HTTP.

To preview it over HTTP instead — which is closer to production, and lets the
clean `/about/` style URLs resolve — any static server will do, for example:

```
python3 -m http.server 8000
```

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
│   ├── civil-litigation/
│   ├── criminal-law/
│   ├── cheque-bounce-recovery/
│   ├── property-law/
│   ├── property-registration/
│   ├── corporate-law/
│   ├── contractual-agreements/
│   ├── service-law/
│   ├── employment-law/
│   ├── income-tax/
│   ├── gst/
│   └── firm-business-registration/
├── locations/                     Office and areas covered
├── legal-guides/                  General information notes
├── contact/                       Office details and enquiry form
├── disclaimer/                    Website disclaimer
├── privacy-policy/                Privacy policy
├── assets/
│   ├── css/style.css
│   ├── js/site-config.js          Firm details (placeholders)
│   ├── js/image-data.js           Image registry
│   ├── js/site.js                 Behaviour
│   └── images/
├── robots.txt
├── sitemap.xml
├── IMAGE-CREDITS.md
└── README.md
```

Every page lives in its own folder as `index.html`, so production URLs are
clean (`/about/`, `/practice-areas/gst/`).

Service Law and Employment Law are deliberately kept as separate practice
areas: service law covers government employment, employment law covers private
employment. Each page links across to the other.

## Configuration

Firm contact details live in one place: `assets/js/site-config.js`.

```js
window.siteConfig = {
  firmName: "H.R. Legal Associate",
  domain: "https://lexlawandtax.com",
  phone: "{{PHONE_NUMBER}}",
  whatsapp: "{{WHATSAPP_NUMBER}}",
  email: "{{EMAIL_ADDRESS}}",
  address: "{{OFFICE_ADDRESS}}",
  googleMapsUrl: "{{GOOGLE_MAPS_URL}}",
  formEndpoint: "{{FORM_ENDPOINT}}"
};
```

Values in `{{DOUBLE_BRACES}}` are unresolved placeholders. While a value is
unresolved, `site.js` shows a neutral "to be published" label and leaves the
related link inert rather than pointing at a broken target. Replacing the value
is all that is needed — no markup changes.

Markup requests a value with `data-config`:

```html
<a data-config="phone" data-config-role="tel" data-pending-label="to be published"></a>
```

| Attribute | Purpose |
| --- | --- |
| `data-config` | Key from `window.siteConfig` |
| `data-config-role` | `tel`, `email`, `whatsapp`, `url` or `text` |
| `data-config-text="keep"` | Keep the existing link text, set only the `href` |
| `data-pending-label` | Text shown while the value is a placeholder |

While `formEndpoint` is unresolved, the contact form renders but its fields are
disabled and a notice points visitors to the telephone and email details.

## Images

Images are registered in `assets/js/image-data.js` and referenced as
`<img data-image="advocates.mohammad-kamran">`. `site.js` resolves the path for
the page's folder depth and swaps in `advocate-placeholder.svg` if the file is
missing.

The three advocate photographs are still outstanding — see
[IMAGE-CREDITS.md](IMAGE-CREDITS.md).

## Design

Set up at foundation level only; the full visual design follows in the next
stage.

- Predominantly white background
- Navy (`#0d2440`) and teal (`#0f7b7b`) as primary colours
- Gold (`#c8a24a`) as a sparing accent
- Responsive layout, single breakpoint set at 48em / 60em / 30em
- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip link,
  breadcrumbs
- Visible keyboard focus on every interactive element
- Mobile menu with `aria-expanded`, Escape to close and click-outside to close;
  the navigation stays visible when JavaScript is unavailable
- `prefers-reduced-motion` respected in both CSS and JavaScript

Design tokens are CSS custom properties at the top of `assets/css/style.css`.

## Content notes

The site follows the Bar Council of India position that advocates may not
advertise or solicit work. Content is informational and avoids promotional
claims, comparative or superlative wording, testimonials and case results. The
footer carries a standing notice on every page, and `/disclaimer/` sets out the
position in full.

## Deployment

Upload the repository contents to the web root. No build step.

Configure the host to serve `404.html` for missing pages, and to serve
`index.html` for folder URLs (most static hosts do this by default).

`sitemap.xml` lists the production URLs in their clean `/folder/` form and
should have `lastmod` refreshed when content is published.

## Still to do

- Replace the placeholders in `assets/js/site-config.js`
- Add the three advocate photographs
- Write the homepage, about, practice area, location and guide content
- Complete the visual design
