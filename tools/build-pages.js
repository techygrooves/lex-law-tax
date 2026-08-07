#!/usr/bin/env node
/*
 * Page builder
 * ------------
 *   node tools/build-pages.js
 *
 * The published site is plain HTML, CSS and JavaScript with no runtime
 * dependencies — this script is only an authoring aid. It writes the
 * shared components (header, footer, cards, and the rest) into every
 * page at the correct relative depth, so one edit here updates all of
 * them instead of twenty-six copies.
 *
 * It reads src/data/images.js, so image URLs live in exactly one place.
 *
 * Node is not needed to view, host or deploy the site. Run this only
 * after editing a shared component or the image registry.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const DOMAIN = "https://lexlawandtax.com";
const FIRM = "H.R. Legal Associate";
const DESCRIPTOR = "Legal, Property, Corporate &amp; Tax Services";

const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700" +
  "&family=Playfair+Display:wght@500;600;700&display=swap";

/* Ampersands inside an HTML attribute must be escaped, or a strict
   parser reads "&family" as an entity reference. */
const attr = (value) => value.replace(/&/g, "&amp;");

/* Escapes a bare & for text and attribute content, leaving entities that
   are already written (&amp;, &middot;, &#8212;) untouched. */
const esc = (value) => String(value).replace(/&(?!#?\w+;)/g, "&amp;");

/* ------------------------------------------------------------------ */
/* Image registry — loaded from the one file that holds the URLs        */
/* ------------------------------------------------------------------ */

function loadData(relative, globalName) {
  const file = path.join(ROOT, relative);
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  if (!sandbox.window[globalName]) {
    throw new Error(relative + " did not define window." + globalName);
  }
  return sandbox.window[globalName];
}

const IMAGES = loadData("src/data/images.js", "siteImages");
const ADVOCATE_DATA = loadData("src/data/advocates.js", "advocateData");
const LEGAL = loadData("src/data/legal-services.js", "legalServices");
const TAXBIZ = loadData("src/data/tax-business.js", "taxBusinessServices");
const LOCATIONS = loadData("src/data/locations.js", "siteLocations");

/* Both content files use the same page model, so the renderer treats
   them as one list. The coverage statement and the review date are
   site-wide and come from the legal-services file. */
const SECTION_HUBS = LEGAL.hubs.concat(TAXBIZ.hubs);

/* A withheld detail is still {{TO_BE_PROVIDED}}. Those rows are dropped
   from the page rather than rendered empty, so nothing unverified is
   ever published beside an advocate's name. */
const isWithheld = (value) =>
  typeof value !== "string" || value.trim() === "" || /^\{\{[A-Z0-9_]+\}\}$/.test(value.trim());

/* True only when the firm has actually supplied the photograph. */
const advocatePhotoExists = (slug) =>
  fs.existsSync(path.join(ROOT, IMAGES.advocates[slug].src));

/* ------------------------------------------------------------------ */
/* Site data                                                            */
/* ------------------------------------------------------------------ */

const PRACTICE_AREAS = [
  ["civil-litigation", "Civil Litigation", "Civil suits, appeals and related proceedings before courts in Uttar Pradesh."],
  ["criminal-law", "Criminal Law", "Criminal complaints, bail matters, trials and appeals."],
  ["cheque-bounce-recovery", "Cheque Bounce and Recovery", "Proceedings under the Negotiable Instruments Act and recovery of dues."],
  ["property-law", "Property Law", "Title, partition, tenancy and other immovable property disputes."],
  ["property-registration", "Property Registration", "Sale deeds, gift deeds, mutation and registration formalities."],
  ["corporate-law", "Corporate Law", "Company and LLP matters, compliance and commercial disputes."],
  ["contractual-agreements", "Contractual Agreements", "Drafting, review and enforcement of commercial contracts."],
  ["service-law", "Service Law", "Service conditions and disputes concerning government employment."],
  ["employment-law", "Employment Law", "Employment documentation, workplace matters and employer compliance."],
  ["income-tax", "Income Tax", "Assessments, appeals, notices and income tax compliance."],
  ["gst", "GST", "Registration, returns, notices, audits and appellate proceedings."],
  ["firm-business-registration", "Firm and Business Registration", "Formation and registration of firms, companies and other entities."]
];

const SERVICE_LAW_SCOPE = [
  "Government employee disputes",
  "Departmental inquiries",
  "Suspension matters",
  "Promotion and seniority disputes",
  "Transfer matters",
  "Pension and retirement benefits",
  "Disciplinary proceedings",
  "Service-related writ matters"
];

const EMPLOYMENT_LAW_SCOPE = [
  "Employment agreements",
  "Appointment letters",
  "Workplace disputes",
  "Termination matters",
  "Employee policies",
  "Employer compliance",
  "Salary and employment claims",
  "Confidentiality and non-disclosure agreements"
];

const ADVOCATES = ADVOCATE_DATA.order.map((slug) =>
  Object.assign({ slug }, ADVOCATE_DATA.advocates[slug])
);

const CREDENTIALS = [
  "Enrolled with the Bar Council of Uttar Pradesh",
  "Certificate of Practice holder"
];

/* The five detailed hubs are the developed pages for these topics. The
   practice-area page for each links straight through, so the two do not
   compete for the same reader. */
const PRACTICE_AREA_HUBS = {
  "civil-litigation": "civil-litigation",
  "criminal-law": "criminal-law",
  "cheque-bounce-recovery": "cheque-bounce-and-recovery",
  "property-law": "property-law-and-registration",
  "property-registration": "property-law-and-registration",
  "corporate-law": "corporate-and-contracts",
  "contractual-agreements": "corporate-and-contracts",
  "income-tax": "tax-and-gst",
  "gst": "tax-and-gst",
  "firm-business-registration": "business-registration"
};

/* Every city list on the site is derived from src/data/locations.js, so a
   city cannot appear in the navigation without a page behind it.

   TIER_1 are the pages indexable at launch. Only those are linked from
   the footer and the homepage: the rest carry noindex until their local
   content has been independently reviewed, and a sitewide link to a page
   that is not meant to be indexed is a mixed signal. The locations index
   links to all fourteen, grouped. */
const CITIES = LOCATIONS.cities;
const TIER_1 = CITIES.filter((c) => c.index);
const TIER_2 = CITIES.filter((c) => !c.index);
const OFFICE_CITY = CITIES.find((c) => c.isOffice);

const NAV = [
  ["home", "Home", "index.html"],
  ["about", "About", "about/index.html"],
  ["practice-areas", "Practice Areas", "practice-areas/index.html"],
  ["advocates", "Advocates", "advocates/index.html"],
  ["locations", "Locations", "locations/index.html"],
  ["legal-guides", "Legal Guides", "legal-guides/index.html"],
  ["contact", "Contact", "contact/index.html"]
];

/* ================================================================== */
/* COMPONENTS                                                          */
/* ================================================================== */

/* --- Icons -------------------------------------------------------- */

const ico = (paths, size) =>
  '<svg width="' + (size || 16) + '" height="' + (size || 16) +
  '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"' +
  ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
  paths + "</svg>";

const ICON = {
  chevron: (s) => ico('<path d="m6 9 6 6 6-6"/>', s || 14),
  arrow: (s) => ico('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', s || 15),
  arrowUp: (s) => ico('<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>', s || 18),
  phone: (s) => ico('<path d="M6.6 3h3l1.5 4-2 1.4a12 12 0 0 0 5.5 5.5l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z"/>', s || 15),
  mail: (s) => ico('<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6.5 8.5 6 8.5-6"/>', s || 15),
  pin: (s) => ico('<path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>', s || 15),
  clock: (s) => ico('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>', s || 15),
  seal: (s) => ico('<path d="M12 3 5 6v5.2c0 4.3 2.9 8.2 7 9.8 4.1-1.6 7-5.5 7-9.8V6l-7-3Z"/><path d="m9.2 12 2 2 3.6-3.8"/>', s || 20),
  scale: (s) => ico('<path d="M12 4v16"/><path d="M7 20h10"/><path d="M4.5 8h15"/><path d="M4.5 8 2 14h5L4.5 8Z"/><path d="M19.5 8 17 14h5l-2.5-6Z"/>', s || 20),
  file: (s) => ico('<path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3Z"/><path d="M14 3v4.5h4.5"/>', s || 20),
  map: (s) => ico('<path d="m9 4-6 2.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z"/><path d="M9 4v13"/><path d="M15 6.5v13"/>', s || 20),
  close: (s) => ico('<path d="M6 6l12 12M18 6 6 18"/>', s || 18),
  image: (s) => ico('<rect x="3" y="4.5" width="18" height="15" rx="1.5"/><circle cx="8.5" cy="10" r="1.5"/><path d="m3.5 17 5-4.5 4 3.5 3-2.5 5 4"/>', s || 22),
  check: (s) => ico('<path d="m4.5 12.5 4.5 4.5 10.5-11"/>', s || 16),
  chat: (s) => ico('<path d="M20.5 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 20.5 12Z"/>', s || 20),
  handshake: (s) => ico('<path d="m3 11 4-4 3.2 2.4a2 2 0 0 0 2.4 0L16 7l5 4"/><path d="M21 11v5a1.5 1.5 0 0 1-1.5 1.5H17"/><path d="M3 11v5a1.5 1.5 0 0 0 1.5 1.5H7"/><path d="m8 15 2.5 2.5a1.8 1.8 0 0 0 2.6 0L16 15"/>', s || 20),
  building: (s) => ico('<path d="M4 21V6.5L12 3l8 3.5V21"/><path d="M3 21h18"/><path d="M9.5 21v-4.5h5V21"/><path d="M9 10h1.5M13.5 10H15M9 13.5h1.5M13.5 13.5H15"/>', s || 20),
  compass: (s) => ico('<circle cx="12" cy="12" r="8.5"/><path d="m15 9-1.8 4.2L9 15l1.8-4.2L15 9Z"/>', s || 20),
  key: (s) => ico('<circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H21"/><path d="M17.5 12v3M20 12v2"/>', s || 20),
  receipt: (s) => ico('<path d="M6 3h12v18l-3-1.6-3 1.6-3-1.6L6 21V3Z"/><path d="M9.5 8h5M9.5 12h5"/>', s || 20),
  alert: (s) => ico('<path d="M12 4.5 2.8 20h18.4L12 4.5Z"/><path d="M12 10v4"/><path d="M12 17h.01"/>', s || 16)
};

/* --- Legal guides ---------------------------------------------------
   The individual guide pages are not written yet, so each card points at
   the guides index rather than a URL that does not exist. */

const GUIDES = [
  {
    title: "Property Documents to Review Before a Purchase",
    category: "Property",
    text: "Which title documents, encumbrance records and approvals are usually examined before an agreement is signed.",
    imageKey: "photos.legalGuides",
    href: "legal-guides/index.html"
  },
  {
    title: "Responding to a Cheque-Bounce Matter",
    category: "Recovery",
    text: "The notice period, the limitation involved and the steps that follow dishonour of a cheque.",
    icon: () => ICON.receipt(44),
    href: "legal-guides/index.html"
  },
  {
    title: "Legal and Tax Checklist for Starting a Firm",
    category: "Business",
    text: "Registration, partnership documentation and the tax registrations a new firm generally has to consider.",
    icon: () => ICON.building(44),
    href: "legal-guides/index.html"
  }
];

/* --- 1. Skip link -------------------------------------------------- */

const skipLink = () =>
  '<a class="skip-link" href="#main">Skip to main content</a>';

/* --- 2. Top contact bar -------------------------------------------- */

const topbar = () => `<div class="topbar">
  <div class="container topbar__inner">
    <p class="topbar__location">${ICON.pin(14)}<span>Lucknow, Uttar Pradesh &middot; matters across Uttar Pradesh</span></p>
    <ul class="topbar__links">
      <li><a data-config="phone" data-config-role="tel" data-pending-label="Telephone to be published">${ICON.phone(14)}<span data-config-slot>Telephone to be published</span></a></li>
      <li><a data-config="email" data-config-role="email" data-pending-label="Email to be published">${ICON.mail(14)}<span data-config-slot>Email to be published</span></a></li>
    </ul>
  </div>
</div>`;

/* --- 3-6. Header, desktop nav, mega menu, dropdown ------------------ */

function megaPractice(P) {
  const columns = PRACTICE_AREAS.map(
    ([slug, name]) =>
      `            <li><a class="mega__link" href="${P}practice-areas/${slug}/index.html">${name}</a></li>`
  ).join("\n");

  return `        <div class="mega" id="menu-practice-areas" hidden>
          <div class="container mega__inner">
            <div class="mega__intro">
              <h2>Practice areas</h2>
              <p>Legal and tax matters handled by the firm across Uttar Pradesh.</p>
              <p class="mega__group-label">Detailed sections</p>
              <ul class="mega__hubs">
${SECTION_HUBS.map((h) => `                <li><a href="${P}${h.slug}/index.html">${h.name}</a></li>`).join("\n")}
              </ul>
              <a class="arrow-link" href="${P}practice-areas/index.html">View all areas ${ICON.arrow()}</a>
            </div>
            <ul class="mega__columns">
${columns}
            </ul>
          </div>
        </div>`;
}

function dropdownAdvocates(P) {
  const items = ADVOCATES.map(
    (a) => `            <li><a class="dropdown__link" href="${P}advocates/${a.slug}/index.html">${a.name}<span class="dropdown__meta">${a.experience}</span></a></li>`
  ).join("\n");

  return `        <ul class="dropdown" id="menu-advocates" hidden>
${items}
            <li><a class="dropdown__link" href="${P}advocates/index.html">All advocates</a></li>
        </ul>`;
}

function desktopNav(P) {
  const items = NAV.map(([key, label, href]) => {
    if (key === "practice-areas") {
      return `      <li class="nav__item">
        <button class="nav__link" type="button" data-menu-trigger aria-expanded="false" aria-controls="menu-practice-areas">${label} <span class="nav__chevron">${ICON.chevron()}</span></button>
${megaPractice(P)}
      </li>`;
    }
    if (key === "advocates") {
      return `      <li class="nav__item nav__item--dropdown">
        <button class="nav__link" type="button" data-menu-trigger aria-expanded="false" aria-controls="menu-advocates">${label} <span class="nav__chevron">${ICON.chevron()}</span></button>
${dropdownAdvocates(P)}
      </li>`;
    }
    return `      <li class="nav__item"><a class="nav__link" data-nav="${key}" href="${P}${href}">${label}</a></li>`;
  }).join("\n");

  return `  <nav class="nav" aria-label="Primary">
    <ul class="nav__list">
${items}
    </ul>
  </nav>`;
}

function header(P) {
  return `<header class="site-header" data-header>
  <div class="container site-header__inner">

    <a class="logo" href="${P}index.html">
      <span class="logo__monogram" aria-hidden="true">HR</span>
      <span class="logo__text">
        <span class="logo__name">${FIRM}</span>
        <span class="logo__descriptor">${DESCRIPTOR}</span>
      </span>
    </a>

${desktopNav(P)}

    <div class="header-actions">
      <a class="btn btn--ghost" data-config="phone" data-config-role="tel" data-config-text="keep" data-pending-label="Telephone to be published">${ICON.phone()}<span class="btn__label">Call</span></a>
      <a class="btn btn--primary" href="${P}contact/index.html">Consultation</a>
      <button class="menu-toggle" type="button" data-drawer-toggle aria-expanded="false" aria-controls="mobile-nav">
        <span class="menu-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
        <span>Menu</span>
      </button>
    </div>

  </div>
</header>`;
}

/* --- 7. Mobile navigation ------------------------------------------ */

function mobileNav(P) {
  const items = NAV.map(([key, label, href]) => {
    if (key === "practice-areas") {
      const sub = PRACTICE_AREAS.map(
        ([slug, name]) => `            <li><a href="${P}practice-areas/${slug}/index.html">${name}</a></li>`
      ).join("\n");
      return `        <li>
          <button class="mobile-nav__link" type="button" data-drawer-sub aria-expanded="false" aria-controls="m-practice-areas">${label}<span class="nav__chevron">${ICON.chevron()}</span></button>
          <ul class="mobile-nav__sub" id="m-practice-areas" hidden>
${SECTION_HUBS.map((h) => `            <li><a href="${P}${h.slug}/index.html">${h.name}</a></li>`).join("\n")}
            <li><a href="${P}practice-areas/index.html">All practice areas</a></li>
${sub}
          </ul>
        </li>`;
    }
    if (key === "advocates") {
      const sub = ADVOCATES.map(
        (a) => `            <li><a href="${P}advocates/${a.slug}/index.html">${a.name}</a></li>`
      ).join("\n");
      return `        <li>
          <button class="mobile-nav__link" type="button" data-drawer-sub aria-expanded="false" aria-controls="m-advocates">${label}<span class="nav__chevron">${ICON.chevron()}</span></button>
          <ul class="mobile-nav__sub" id="m-advocates" hidden>
            <li><a href="${P}advocates/index.html">All advocates</a></li>
${sub}
          </ul>
        </li>`;
    }
    return `        <li><a class="mobile-nav__link" data-nav="${key}" href="${P}${href}">${label}</a></li>`;
  }).join("\n");

  return `<div class="drawer-backdrop" data-drawer-backdrop hidden></div>

<div class="mobile-nav" id="mobile-nav" data-drawer role="dialog" aria-modal="true" aria-label="Site menu" tabindex="-1" hidden>
  <div class="mobile-nav__head">
    <p class="mobile-nav__title">${FIRM}</p>
    <button class="mobile-nav__close" type="button" data-drawer-close aria-label="Close menu">${ICON.close()}</button>
  </div>

  <div class="mobile-nav__body">
    <nav aria-label="Site">
      <ul class="mobile-nav__list">
${items}
      </ul>
    </nav>
  </div>

  <div class="mobile-nav__foot">
    <a class="btn btn--secondary btn--block" data-config="phone" data-config-role="tel" data-config-text="keep" data-pending-label="Telephone to be published">${ICON.phone()}<span>Call the office</span></a>
    <a class="btn btn--primary btn--block" href="${P}contact/index.html">Request a consultation</a>
  </div>
</div>`;
}

/* --- 8. Breadcrumbs ------------------------------------------------- */

function breadcrumb(P, trail) {
  if (!trail || !trail.length) return "";
  const items = trail
    .map((item) =>
      item.href
        ? `          <li><a href="${P}${item.href}">${item.label}</a></li>`
        : `          <li aria-current="page">${item.label}</li>`
    )
    .join("\n");

  return `      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol>
${items}
        </ol>
      </nav>`;
}

/* --- 9. Section heading --------------------------------------------- */

function sectionHead(o) {
  const cls = ["section-head"];
  if (o.center) cls.push("section-head--center");
  const eyebrow = o.eyebrow
    ? `      <p class="eyebrow${o.light ? " eyebrow--light" : ""}">${o.eyebrow}</p>\n`
    : "";
  const lead = o.lead ? `      <p class="section-head__lead">${o.lead}</p>\n` : "";
  const level = o.level || "h2";

  const id = o.id ? ` id="${o.id}"` : "";

  return `    <div class="${cls.join(" ")}"${o.reveal === false ? "" : " data-reveal"}>
${eyebrow}      <${level} class="section-head__title"${id}>${o.title}</${level}>
${lead}    </div>`;
}

/* --- 10-12. Buttons and arrow link ---------------------------------- */

const btnPrimary = (label, href, extra) =>
  `<a class="btn btn--primary${extra ? " " + extra : ""}" href="${href}">${label}</a>`;

const btnSecondary = (label, href, extra) =>
  `<a class="btn btn--secondary${extra ? " " + extra : ""}" href="${href}">${label}</a>`;

const arrowLink = (label, href, extra) =>
  `<a class="arrow-link${extra ? " " + extra : ""}" href="${href}">${label} ${ICON.arrow()}</a>`;

/* --- Media figure with neutral fallback ------------------------------ */

function media(o) {
  const cls = ["media"];
  if (o.ratio) cls.push("media--ratio-" + o.ratio);
  if (o.overlay) cls.push("media--overlay");
  if (o.framed) cls.push("media--framed");
  if (o.className) cls.push(o.className);

  const record = o.imageKey.indexOf("advocates.") === 0
    ? IMAGES.advocates[o.imageKey.split(".")[1]]
    : IMAGES.photos[o.imageKey.split(".")[1]];

  if (!record) throw new Error("Unknown image key: " + o.imageKey);

  const isAdvocate = o.imageKey.indexOf("advocates.") === 0;
  /* Advocate photographs are local. Ship the real file once it exists so
     the page is right without JavaScript; until then ship the silhouette
     and let site.js retry the photograph on each visit. */
  const hasPhoto = isAdvocate && advocatePhotoExists(o.imageKey.split(".")[1]);
  const src = isAdvocate
    ? o.base + (hasPhoto ? record.src : IMAGES.fallbacks.advocate)
    : record.url;

  const loading = o.priority ? "" : ' loading="lazy"';
  const priority = o.priority ? ' fetchpriority="high"' : "";
  const placeholderClass = isAdvocate && !hasPhoto ? ' class="is-placeholder"' : "";

  return `<figure class="${cls.join(" ")}">
${o.pad || ""}  <img${placeholderClass} data-image="${o.imageKey}" src="${src}" alt="${record.alt}" width="${record.width}" height="${record.height}"${loading} decoding="async"${priority}>
${o.pad || ""}  <span class="media__fallback" aria-hidden="true">${ICON.image()}<span>Image unavailable</span></span>
${o.pad || ""}</figure>`;
}

/* --- 13. Practice-area card ------------------------------------------ */

function practiceCard(P, area, index, withImage) {
  const [slug, name, blurb] = area;
  const num = String(index + 1).padStart(2, "0");
  const key = IMAGES.practiceAreas[slug];

  const figure = withImage
    ? "      " + media({ imageKey: "photos." + key, ratio: "3x2", base: P, pad: "      " }) + "\n"
    : "";

  return `      <article class="card card--practice" data-reveal>
${figure}        <div class="card__body">
          <p class="card__index">${num}</p>
          <h3 class="card__title"><a href="${P}practice-areas/${slug}/index.html">${name}</a></h3>
          <p class="card__text">${blurb}</p>
          <p class="card__foot">${arrowLink("Read more", P + "practice-areas/" + slug + "/index.html")}</p>
        </div>
      </article>`;
}

/* --- 14. Advocate card ----------------------------------------------- */

function advocateCard(P, advocate) {
  return `      <article class="card card--advocate" data-reveal>
        ${media({ imageKey: "advocates." + advocate.slug, className: "advocate-photo", base: P, pad: "        " })}
        <div class="card__body">
          <h3 class="card__title"><a href="${P}advocates/${advocate.slug}/index.html">${advocate.name}</a></h3>
          <ul class="credentials credentials--lead">
            <li>${advocate.experience}</li>
            <li>${CREDENTIALS[0]}</li>
            <li>${CREDENTIALS[1]}</li>
          </ul>
          <p class="card__foot">${arrowLink("View profile", P + "advocates/" + advocate.slug + "/index.html")}</p>
        </div>
      </article>`;
}

/* --- 15. Location card ------------------------------------------------
   `href` is optional: without one the card is a label, with one it is the
   linked card used on the locations index. */

function locationCard(name, meta, note, href) {
  const title = href
    ? `<a href="${href}">${name}</a>`
    : name;
  const foot = href
    ? `\n          <p class="card__foot">${arrowLink("Read more", href)}</p>`
    : "";
  return `      <article class="card card--location" data-reveal>
        <div class="card__body">
          <p class="card__meta">${meta}</p>
          <h3 class="card__title">${title}</h3>
          <p class="card__text">${note}</p>${foot}
        </div>
      </article>`;
}

/* --- 16. Article card -------------------------------------------------- */

function articleCard(P, o) {
  return `      <article class="card card--article" data-reveal>
        ${media({ imageKey: o.imageKey, ratio: "16x9", base: P, pad: "        " })}
        <div class="card__body">
          <p class="card__meta"><span>${o.category}</span><span>${o.meta}</span></p>
          <h3 class="card__title">${o.href ? '<a href="' + o.href + '">' + o.title + "</a>" : o.title}</h3>
          <p class="card__text">${o.text}</p>
        </div>
      </article>`;
}

/* --- 17. Image-and-text split ------------------------------------------ */

function splitSection(P, o) {
  return `    <div class="split${o.reverse ? " split--reverse" : ""}">
      <div class="split__media" data-reveal>
        ${media({ imageKey: o.imageKey, ratio: o.ratio || "4x3", framed: true, base: P, pad: "        " })}
      </div>
      <div class="split__content" data-reveal>
${o.body}
      </div>
    </div>`;
}

/* --- 18. Trust strip ---------------------------------------------------- */

function trustStrip() {
  const items = [
    [ICON.seal(20), "Bar Council of Uttar Pradesh", "Each advocate of the firm is enrolled"],
    [ICON.file(20), "Certificate of Practice", "Held by each advocate"],
    [ICON.pin(20), "Lucknow office", "Uttar Pradesh"],
    [ICON.scale(20), "Legal and tax matters", "Attended to across Uttar Pradesh"]
  ]
    .map(
      ([icon, label, note]) => `        <li class="trust-strip__item" data-reveal>
          <span class="trust-strip__icon">${icon}</span>
          <span>
            <span class="trust-strip__label">${label}</span>
            <span class="trust-strip__note">${note}</span>
          </span>
        </li>`
    )
    .join("\n");

  return `  <section class="trust-strip" aria-label="About the firm">
    <div class="container">
      <ul class="trust-strip__list" data-reveal-group>
${items}
      </ul>
    </div>
  </section>`;
}

/* --- 19. FAQ accordion --------------------------------------------------- */

function accordion(id, items, single) {
  const rows = items
    .map(
      (item, i) => `        <div class="accordion__item">
          <h3 class="accordion__heading">
            <button class="accordion__trigger" type="button" data-accordion-trigger aria-expanded="true" aria-controls="${id}-panel-${i}" id="${id}-trigger-${i}">
              <span>${item[0]}</span>
              <span class="accordion__icon" aria-hidden="true"></span>
            </button>
          </h3>
          <div class="accordion__panel" id="${id}-panel-${i}" role="region" aria-labelledby="${id}-trigger-${i}">
            <div><p>${item[1]}</p></div>
          </div>
        </div>`
    )
    .join("\n");

  return `      <div class="accordion" data-accordion="${single ? "single" : "multi"}">
${rows}
      </div>`;
}

/* --- 20. Contact CTA ------------------------------------------------------ */

function ctaBand(P, o) {
  const opts = o || {};
  return `  <section class="cta-band">
    <div class="container cta-band__inner">
      <div class="cta-band__content" data-reveal>
        <p class="eyebrow eyebrow--light">${opts.eyebrow || "Contact"}</p>
        <h2>${opts.title || "Discuss a matter with the office"}</h2>
        <p>${opts.text || "Write to the office with a short description of the matter, or telephone during working hours."}</p>
      </div>
      <div class="cta-band__actions" data-reveal>
        <a class="btn btn--inverse" href="${P}contact/index.html">Contact the office</a>
        <a class="btn btn--outline-light" data-config="phone" data-config-role="tel" data-config-text="keep" data-pending-label="Telephone to be published">${ICON.phone()}<span>Call</span></a>
      </div>
    </div>
  </section>`;
}

/* --- Homepage: hero information panel -------------------------------------- */

function heroPanel(items) {
  return `        <ul class="hero__panel">
${items.map((t) => `          <li>${ICON.check(15)}<span>${t}</span></li>`).join("\n")}
        </ul>`;
}

/* --- Homepage: service card (image, factual line, explore link) ------------- */

function serviceCard(P, o) {
  return `      <article class="card service-card" data-reveal>
        ${media({ imageKey: o.imageKey, ratio: "16x9", base: P, pad: "        " })}
        <div class="card__body">
          <h3 class="card__title"><a href="${P}${o.href}">${o.title}</a></h3>
          <p class="card__text">${o.text}</p>
          <p class="card__foot">${arrowLink("Explore Service", P + o.href)}</p>
        </div>
      </article>`;
}

/* --- Homepage: checklist used inside the feature sections ------------------- */

function checkList(items) {
  return `        <ul class="check-list">
${items
  .map(
    ([label, note]) => `          <li>${ICON.check()}<span><strong>${label}</strong><span>${note}</span></span></li>`
  )
  .join("\n")}
        </ul>`;
}

/* --- Homepage: positioning pillars ----------------------------------------- */

function pillars(items, modifier) {
  return `      <ul class="pillars${modifier ? " pillars--" + modifier : ""}" data-reveal-group data-reveal-step="70">
${items
  .map(
    ([icon, title, text]) => `        <li class="pillar" data-reveal>
          <span class="pillar__icon">${icon}</span>
          <h3>${title}</h3>
          <p>${text}</p>
        </li>`
  )
  .join("\n")}
      </ul>`;
}

/* --- Homepage: four-step process ------------------------------------------- */

function processSteps(items) {
  return `      <ol class="steps" data-reveal-group data-reveal-step="70">
${items
  .map(
    ([title, text], i) => `        <li class="step" data-reveal>
          <span class="step__number">Step ${String(i + 1).padStart(2, "0")}</span>
          <h3>${title}</h3>
          <p>${text}</p>
        </li>`
  )
  .join("\n")}
      </ol>`;
}

/* --- Homepage: city links --------------------------------------------------
   Each chip points at that city's own page. The office chip is marked so
   Lucknow is visibly the office rather than one district among many. */

function cityLinks(P, cities) {
  return `      <ul class="city-links">
${cities
  .map(
    (c) => `        <li><a href="${P}locations/${c.slug}/index.html"${c.isOffice ? " data-office" : ""}>${ICON.pin(14)}<span>${c.name}</span></a></li>`
  )
  .join("\n")}
      </ul>`;
}

/* --- Homepage: legal guide card -------------------------------------------
   A card either carries a photograph or a colour-block header with a
   category icon, so no single image repeats across the row. */

function guideCard(P, o) {
  const head = o.imageKey
    ? `        <div class="guide-card__head">
          ${media({ imageKey: o.imageKey, ratio: "16x9", base: P, pad: "          " })}
        </div>`
    : `        <div class="guide-card__head guide-card__head--tint" aria-hidden="true">
          ${o.icon()}
        </div>`;

  return `      <article class="card card--article" data-reveal>
${head}
        <div class="card__body">
          <p class="guide-card__category">${ICON.file(13)}<span>${o.category}</span></p>
          <h3 class="card__title"><a href="${P}${o.href}">${o.title}</a></h3>
          <p class="card__text">${o.text}</p>
          <p class="card__foot">${arrowLink("Read the guide", P + o.href)}</p>
        </div>
      </article>`;
}

/* --- Homepage: contact panel ----------------------------------------------- */

function contactPanel(P) {
  return `      <ul class="contact-panel" data-reveal-group data-reveal-step="70">
        <li class="contact-method" data-reveal>
          <span class="contact-method__icon">${ICON.phone(20)}</span>
          <span>
            <span class="contact-method__label">Telephone</span>
            <a class="contact-method__value" data-config="phone" data-config-role="tel" data-pending-label="To be published"><span data-config-slot>To be published</span></a>
          </span>
        </li>
        <li class="contact-method" data-reveal>
          <span class="contact-method__icon">${ICON.chat(20)}</span>
          <span>
            <span class="contact-method__label">WhatsApp</span>
            <a class="contact-method__value" data-config="whatsapp" data-config-role="whatsapp" data-pending-label="To be published"><span data-config-slot>To be published</span></a>
          </span>
        </li>
        <li class="contact-method" data-reveal>
          <span class="contact-method__icon">${ICON.mail(20)}</span>
          <span>
            <span class="contact-method__label">Email</span>
            <a class="contact-method__value" data-config="email" data-config-role="email" data-pending-label="To be published"><span data-config-slot>To be published</span></a>
          </span>
        </li>
        <li class="contact-method" data-reveal>
          <span class="contact-method__icon">${ICON.pin(20)}</span>
          <span>
            <span class="contact-method__label">Lucknow office</span>
            <span class="contact-method__value" data-config="address" data-pending-label="Office address to be published">Office address to be published</span>
          </span>
        </li>
      </ul>`;
}

/* --- 21. Footer ------------------------------------------------------------ */

function footer(P) {
  const areas = PRACTICE_AREAS.slice(0, 7)
    .map(([slug, name]) => `            <li><a href="${P}practice-areas/${slug}/index.html">${name}</a></li>`)
    .join("\n");

  const advocates = ADVOCATES.map(
    (a) => `            <li><a href="${P}advocates/${a.slug}/index.html">${a.short}</a></li>`
  ).join("\n");

  const cities = TIER_1.map(
    (c) => `            <li><a href="${P}locations/${c.slug}/index.html">${c.name}</a></li>`
  ).join("\n");

  const guides = GUIDES.map(
    (g) => `            <li><a href="${P}legal-guides/index.html">${g.title}</a></li>`
  ).join("\n");

  return `<footer class="site-footer">
  <div class="container">

    <div class="footer-top">
      <div class="footer-brand">
        <p class="footer-brand__name" data-firm-name>${FIRM}</p>
        <p class="footer-brand__descriptor">${DESCRIPTOR}</p>
        <p>Advocates based in Lucknow, assisting individuals, property owners,
        professionals and businesses with legal, documentation, registration and
        tax matters across Uttar Pradesh.</p>
      </div>

      <div>
        <h2 class="footer-heading">Practice areas</h2>
        <ul class="footer-list">
${areas}
            <li><a href="${P}practice-areas/index.html">All practice areas</a></li>
        </ul>
      </div>

      <div>
        <h2 class="footer-heading">Advocates</h2>
        <ul class="footer-list">
${advocates}
            <li><a href="${P}advocates/index.html">All advocates</a></li>
        </ul>

        <h2 class="footer-heading footer-heading--stacked">Legal guides</h2>
        <ul class="footer-list">
${guides}
        </ul>
      </div>

      <div>
        <h2 class="footer-heading">Service locations</h2>
        <ul class="footer-list">
${cities}
            <li><a href="${P}locations/index.html">All locations</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h2 class="footer-heading">Office</h2>
        <address>
          <p class="is-pending" data-config="address" data-pending-label="Office address to be published"></p>
          <p><a data-config="phone" data-config-role="tel" data-pending-label="Telephone to be published"><span data-config-slot>Telephone to be published</span></a></p>
          <p><a data-config="whatsapp" data-config-role="whatsapp" data-pending-label="WhatsApp to be published"><span data-config-slot>WhatsApp to be published</span></a></p>
          <p><a data-config="email" data-config-role="email" data-pending-label="Email to be published"><span data-config-slot>Email to be published</span></a></p>
          <p><a data-config="googleMapsUrl" data-config-role="url" data-config-text="keep" data-pending-label="Map link to be published">View on Google Maps</a></p>
          <p><a href="${P}contact/index.html">Contact form</a></p>
        </address>
      </div>
    </div>

    <div class="footer-legal">
      <p>
        This website is intended to provide information about ${FIRM} and is not an
        advertisement or a solicitation of work. Nothing on this website constitutes legal
        advice, and no advocate&ndash;client relationship is created by using it.
        Please read the <a href="${P}disclaimer/index.html">disclaimer</a> in full, or
        <a href="#" data-disclaimer-open>review the acknowledgement</a>.
      </p>
    </div>

    <div class="footer-bar">
      <p>&copy; <span data-year>2026</span> ${FIRM}. All rights reserved.</p>
      <ul class="footer-bar__links">
        <li><a href="${P}disclaimer/index.html">Disclaimer</a></li>
        <li><a href="${P}privacy-policy/index.html">Privacy Policy</a></li>
        <li><a href="${P}contact/index.html">Contact</a></li>
      </ul>
    </div>

  </div>
</footer>`;
}

/* --- 22. Disclaimer acknowledgement ----------------------------------------- */

function disclaimerGate(P, auto) {
  const points = [
    "This website provides general information about " + FIRM + " and its areas of practice.",
    "It is not intended as advertising or as a solicitation of work.",
    "Viewing this website does not create an advocate&ndash;client relationship.",
    "Legal outcomes depend on the facts of each matter and the law applicable to it.",
    "Please obtain advice on your own specific matter before acting on anything read here."
  ];

  return `<div class="disclaimer-gate" data-disclaimer-gate="${auto ? "auto" : "manual"}" role="dialog" aria-modal="true" aria-labelledby="disclaimer-gate-title" aria-describedby="disclaimer-gate-points" hidden>
  <div class="disclaimer-gate__dialog">
    <p class="eyebrow">Please read before continuing</p>
    <h2 class="disclaimer-gate__title" id="disclaimer-gate-title">Disclaimer</h2>
    <ul class="disclaimer-gate__points" id="disclaimer-gate-points">
${points.map((t) => `      <li>${ICON.check(15)}<span>${t}</span></li>`).join("\n")}
    </ul>
    <div class="disclaimer-gate__actions">
      <button class="btn btn--primary" type="button" data-disclaimer-accept>I Understand and Continue</button>
      <button class="btn btn--secondary" type="button" data-disclaimer-exit>Exit Website</button>
    </div>
    <p class="disclaimer-gate__foot">
      The full terms are set out in the <a href="${P}disclaimer/index.html">disclaimer</a>.
    </p>
  </div>
</div>`;
}

/* --- 23. Back to top --------------------------------------------------------- */

const backToTop = () =>
  `<button class="to-top" type="button" data-to-top aria-label="Back to top">${ICON.arrowUp()}</button>`;

/* --- Page header (inner pages) ------------------------------------------------ */

function pageHeader(P, o) {
  return `  <section class="page-header">
    <div class="container">
      <div class="page-header__inner">
${breadcrumb(P, o.trail)}
        <h1>${o.title}</h1>
        <p class="page-header__lead">${o.lead}</p>
      </div>
    </div>
  </section>`;
}

const PREP_NOTE = `      <div class="notice" data-reveal>
        <p>Detailed content for this page is being prepared and will be published shortly.</p>
      </div>`;

/* ================================================================== */
/* PAGE SHELL                                                          */
/* ================================================================== */

function page(o) {
  const P = "../".repeat(o.depth);
  const robots = o.noindex ? '  <meta name="robots" content="noindex,follow">\n' : "";
  /* A note left in the source where a maintainer will see it, next to the
     directive it explains, rather than in a tracker nobody opens. */
  const sourceNote = o.sourceNote ? "  <!-- " + o.sourceNote + " -->\n" : "";
  const canonical = o.canonical ? `  <link rel="canonical" href="${DOMAIN}${o.canonical}">\n` : "";
  /* Only pages that show a remote photograph benefit from the extra
     connection, so the hint is not paid for everywhere. */
  const imgPreconnect = o.remoteImages
    ? '  <link rel="preconnect" href="https://images.pexels.com" crossorigin>\n'
    : "";

  /* Structured data carries the same {{PLACEHOLDERS}} as the rest of the
     site; site.js substitutes the real values once site-config.js is
     filled in, and drops any property still unresolved so the markup is
     never published claiming a placeholder is a telephone number. */
  const ldBlocks = o.jsonLd ? [].concat(o.jsonLd) : [];
  const structuredData = ldBlocks.length
    ? ldBlocks
        .map(
          (block) =>
            '\n  <script type="application/ld+json" data-config-json>\n' +
            JSON.stringify(block, null, 2).replace(/^/gm, "  ") +
            "\n  </script>\n"
        )
        .join("")
    : "";

  return `<!DOCTYPE html>
<html lang="en" class="no-js" data-base="${P}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(o.title)}</title>
  <meta name="description" content="${esc(o.description)}">
${sourceNote}${robots}${canonical}  <meta name="theme-color" content="#102a43">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${FIRM}">
  <meta property="og:title" content="${esc(o.title)}">
  <meta property="og:description" content="${esc(o.description)}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${imgPreconnect}  <link rel="stylesheet" href="${attr(FONT_CSS)}">

  <link rel="icon" href="${P}assets/images/advocate-placeholder.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${P}assets/css/style.css">

  <script src="${P}src/data/images.js" defer></script>
  <script src="${P}assets/js/site-config.js" defer></script>
  <script src="${P}assets/js/image-data.js" defer></script>
  <script src="${P}assets/js/site.js" defer></script>
${structuredData}</head>
<body>

${skipLink()}

${topbar()}

${header(P)}

${mobileNav(P)}

<main id="main">
${o.body}
</main>

${o.cta === false ? "" : ctaBand(P, o.cta)}
${footer(P)}

${disclaimerGate(P, o.depth === 0 && !o.noindex)}

${backToTop()}

</body>
</html>
`;
}

/* ================================================================== */
/* PAGES                                                               */
/* ================================================================== */

const files = {};

/* --- Home ------------------------------------------------------------ */

const HOME_SERVICES = [
  ["Civil Litigation", "civil", "practice-areas/civil-litigation/index.html",
   "Suits, appeals and execution proceedings before civil courts in Uttar Pradesh."],
  ["Criminal Law", "criminal", "practice-areas/criminal-law/index.html",
   "Complaints, bail applications, trials and appeals before criminal courts."],
  ["Cheque Bounce &amp; Recovery", "chequeBounce", "practice-areas/cheque-bounce-recovery/index.html",
   "Notices and complaints under the Negotiable Instruments Act, and recovery of dues."],
  ["Property Law", "property", "practice-areas/property-law/index.html",
   "Title, partition, tenancy, possession and other immovable property disputes."],
  ["Property Registration", "registration", "practice-areas/property-registration/index.html",
   "Sale deeds, gift deeds, registration formalities and mutation of records."],
  ["Corporate Law", "corporate", "practice-areas/corporate-law/index.html",
   "Company and LLP matters, secretarial compliance and commercial disputes."],
  ["Contractual Agreements", "contracts", "practice-areas/contractual-agreements/index.html",
   "Drafting, review and enforcement of commercial and personal agreements."],
  ["Income Tax &amp; GST", "tax", "practice-areas/income-tax/index.html",
   "Returns, notices, assessments and appellate proceedings in direct and indirect tax."],
  ["Firm Registration", "registration", "practice-areas/firm-business-registration/index.html",
   "Formation and registration of firms, partnerships, companies and other entities."]
];

const HOME_CITIES = TIER_1;

files["index.html"] = page({
  depth: 0,
  canonical: "/",
  remoteImages: true,
  cta: false,
  title: "H.R. Legal Associate | Legal, Property, Corporate & Tax Services in Lucknow",
  description:
    "H.R. Legal Associate provides civil, criminal, cheque-bounce, property, registration, contractual, corporate, income-tax, GST and firm-registration assistance in Lucknow and across Uttar Pradesh.",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": DOMAIN + "/#practice",
    name: FIRM,
    url: DOMAIN + "/",
    description:
      "Advocates in Lucknow assisting individuals, property owners, professionals and businesses with litigation, documentation, registration, taxation and regulatory matters across Uttar Pradesh.",
    telephone: "{{PHONE_NUMBER}}",
    email: "{{EMAIL_ADDRESS}}",
    hasMap: "{{GOOGLE_MAPS_URL}}",
    address: {
      "@type": "PostalAddress",
      streetAddress: "{{OFFICE_ADDRESS}}",
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN"
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Uttar Pradesh" },
      { "@type": "City", name: "Lucknow" }
    ],
    knowsAbout: HOME_SERVICES.map(([title]) => title.replace("&amp;", "and")),
    employee: ADVOCATES.map((a) => ({
      "@type": "Person",
      name: a.name,
      jobTitle: "Advocate",
      url: DOMAIN + "/advocates/" + a.slug + "/"
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legal and tax services",
      itemListElement: HOME_SERVICES.map(([title, , href]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: title.replace("&amp;", "and") },
        url: DOMAIN + "/" + href.replace("index.html", "")
      }))
    }
  },
  body: `  <section class="hero" aria-labelledby="hero-title">
    <div class="media hero__media media--overlay">
      <img data-image="photos.hero" src="${IMAGES.photos.hero.url}" alt="${IMAGES.photos.hero.alt}" width="${IMAGES.photos.hero.width}" height="${IMAGES.photos.hero.height}" decoding="async" fetchpriority="high">
      <span class="media__fallback" aria-hidden="true">${ICON.image()}<span>Image unavailable</span></span>
    </div>
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="eyebrow eyebrow--light">${FIRM} &bull; Lucknow, Uttar Pradesh</p>
        <h1 id="hero-title">Legal, Property, Corporate and Tax Assistance in Lucknow</h1>
        <p class="hero__lead">
          A multidisciplinary practice assisting individuals, property owners,
          professionals and businesses with litigation, documentation,
          registration, taxation and regulatory matters in Lucknow and across
          Uttar Pradesh.
        </p>
        <div class="hero__actions">
          <a class="btn btn--inverse" href="contact/index.html">Discuss Your Matter</a>
          <a class="btn btn--outline-light" href="practice-areas/index.html">Explore Practice Areas</a>
        </div>
${heroPanel([
  "Civil and criminal matters",
  "Property documentation and registration",
  "Corporate contracts and compliance",
  "Income-tax and GST assistance"
])}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="services-title">
    <div class="container">
${sectionHead({
  eyebrow: "Practice areas",
  title: "Integrated Legal and Tax Services",
  lead: "Litigation, documentation, registration and taxation handled within one practice, so a matter that crosses more than one of them is not split between separate advisers.",
  id: "services-title"
})}
      <div class="grid grid--3 grid--services" data-reveal-group data-reveal-step="70">
${HOME_SERVICES.map(([title, key, href, text]) =>
  serviceCard("", { title, href, text, imageKey: "photos." + key })
).join("\n")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="property-title">
    <div class="container">
${splitSection("", {
  imageKey: "photos.property",
  ratio: "3x2",
  body: `        <p class="eyebrow">Property</p>
        <h2 id="property-title">Legal Support Through the Property Transaction Lifecycle</h2>
        <p>
          Property matters rarely stop at one document. The firm assists at each
          stage, from examining the title before money changes hands to the
          record entries that follow registration.
        </p>
${checkList([
  ["Title and document review", "Examination of title deeds, encumbrance position and approvals before an agreement is entered into."],
  ["Agreement-to-sell drafting and review", "Preparation and review of the terms, timelines and payment schedule."],
  ["Sale deed and gift deed assistance", "Drafting and vetting of the conveyance, including stamp duty and valuation questions."],
  ["Registration support", "Attendance and assistance with formalities before the Sub-Registrar."],
  ["Mutation and post-registration matters", "Correction and updating of revenue and municipal records after registration."],
  ["Property disputes", "Title, partition, possession and tenancy proceedings before the appropriate forum."]
])}
        <p class="cluster">${btnPrimary("Explore Property Services", "practice-areas/property-law/index.html")}</p>`
})}
    </div>
  </section>

  <section class="section" aria-labelledby="business-title">
    <div class="container">
${splitSection("", {
  reverse: true,
  imageKey: "photos.corporate",
  ratio: "3x2",
  body: `        <p class="eyebrow">Tax and business</p>
        <h2 id="business-title">Legal, Tax and Business Compliance Under One Practice</h2>
        <p>
          Setting up and running a business raises legal and tax questions at the
          same time. Both are dealt with here, which keeps the documentation and
          the filings consistent with each other.
        </p>
${checkList([
  ["Income-tax filings and notices", "Returns, responses to notices, assessments and appellate proceedings."],
  ["GST registration, filing and notices", "Registration, periodic returns, departmental notices and audits."],
  ["Firm and partnership registration", "Formation and registration of firms, partnerships and other entities."],
  ["Partnership deeds", "Drafting of deeds covering capital, profit sharing, retirement and dissolution."],
  ["Commercial contracts", "Supply, service, agency and confidentiality agreements."],
  ["Business compliance assistance", "Periodic filings and statutory record-keeping for ongoing operations."]
])}
        <p class="cluster">
          ${btnSecondary("Income Tax &amp; GST", "practice-areas/income-tax/index.html")}
          ${btnSecondary("Firm Registration", "practice-areas/firm-business-registration/index.html")}
        </p>`
})}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="advocates-title">
    <div class="container">
${sectionHead({
  eyebrow: "The practice",
  title: "Meet Our Advocates",
  lead: "Each advocate of the firm is enrolled with the Bar Council of Uttar Pradesh and holds a Certificate of Practice.",
  id: "advocates-title"
})}
      <div class="grid grid--3" data-reveal-group>
${ADVOCATES.map((a) => advocateCard("", a)).join("\n")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="why-title">
    <div class="container">
${sectionHead({
  eyebrow: "Working with the firm",
  title: "Why H.R. Legal Associate",
  lead: "What the practice offers, stated plainly. No outcome can be promised in any matter.",
  id: "why-title"
})}
${pillars([
  [ICON.scale(22), "A combined legal, documentation and tax perspective",
   "Litigation, drafting, registration and taxation sit in the same practice, so advice on one takes account of the others."],
  [ICON.handshake(22), "Assistance for individuals and businesses",
   "Work is undertaken for private individuals and property owners as well as firms, companies and professionals."],
  [ICON.file(22), "Clear communication and organised documentation",
   "Papers are set out and kept in order, and the position in a matter is explained in plain terms."],
  [ICON.pin(22), "Lucknow practice with Uttar Pradesh coverage",
   "The office is in Lucknow, and matters are attended to before forums across the state."],
  [ICON.compass(22), "Matter-specific consultation",
   "Advice is given on the facts and papers of the particular matter rather than from a general template."]
])}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="process-title">
    <div class="container">
${sectionHead({
  eyebrow: "Process",
  title: "How the Process Works",
  lead: "How a matter is generally taken forward. The steps vary with the nature of the matter and the forum involved.",
  id: "process-title"
})}
${processSteps([
  ["Initial discussion", "A first conversation about what has happened, what is sought and what timelines apply."],
  ["Document review", "The papers already available are examined, and anything still required is identified."],
  ["Scope and next steps", "The available course of action, the work involved and the likely stages are set out."],
  ["Representation, drafting, filing or compliance assistance", "The agreed work is carried out, whether that is appearance, drafting, filing or continuing compliance."]
])}
    </div>
  </section>

  <section class="section" aria-labelledby="locations-title">
    <div class="container">
${splitSection("", {
  imageKey: "photos.lucknow",
  ratio: "3x2",
  body: `        <p class="eyebrow">Where the firm works</p>
        <h2 id="locations-title">Based in Lucknow, Assisting Clients Across Uttar Pradesh</h2>
        <p>
          The firm has a single principal office, in Lucknow. There is no branch
          office anywhere else. Matters elsewhere in Uttar Pradesh are attended to
          from Lucknow before the court, tribunal or authority concerned.
        </p>
${cityLinks("", HOME_CITIES)}
        <p class="text-muted">Lucknow is the office; the remaining districts are areas the firm serves.</p>
        <p class="cluster">${btnSecondary("View All Service Locations", "locations/index.html")}</p>`
})}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="guides-title">
    <div class="container">
${sectionHead({
  eyebrow: "Legal guides",
  title: "General Information Notes",
  lead: "Short notes on procedure, published for general information. They are not legal advice.",
  id: "guides-title"
})}
      <div class="grid grid--3" data-reveal-group>
${GUIDES.map((g) => guideCard("", g)).join("\n")}
      </div>
      <p class="cluster mt-l">${arrowLink("All legal guides", "legal-guides/index.html")}</p>
    </div>
  </section>

  <section class="cta-band" aria-labelledby="contact-title">
    <div class="container cta-band__body">
      <div class="section-head" data-reveal>
        <p class="eyebrow eyebrow--light">Contact</p>
        <h2 class="section-head__title" id="contact-title">Speak With H.R. Legal Associate</h2>
        <p class="section-head__lead">
          Describe the matter briefly and the office will revert. Sending an
          enquiry does not create an advocate&ndash;client relationship, and
          confidential documents should not be sent through this website.
        </p>
      </div>
${contactPanel("")}
      <div class="cta-band__actions" data-reveal>
        <a class="btn btn--inverse" href="contact/index.html">Go to the contact form</a>
        <a class="btn btn--outline-light" data-config="phone" data-config-role="tel" data-config-text="keep" data-pending-label="Telephone to be published">${ICON.phone()}<span>Call the office</span></a>
      </div>
    </div>
  </section>`
});

/* --- About ------------------------------------------------------------- */

files["about/index.html"] = page({
  depth: 1,
  canonical: "/about/",
  remoteImages: true,
  title: "About " + FIRM + " | Lucknow Legal and Tax Practice",
  description:
    "H.R. Legal Associate is a legal and tax practice based in Lucknow, assisting individuals, property owners, professionals and businesses with matters across Uttar Pradesh.",
  body:
    pageHeader("../", {
      title: "About " + FIRM,
      lead: "A legal and tax practice based in Lucknow, assisting clients across Uttar Pradesh.",
      trail: [{ label: "Home", href: "index.html" }, { label: "About" }]
    }) +
    `

  <section class="section" aria-labelledby="overview-title">
    <div class="container">
${splitSection("../", {
  imageKey: "photos.about",
  ratio: "3x2",
  body: `        <p class="eyebrow">Firm overview</p>
        <h2 id="overview-title">A practice built around related legal and tax work</h2>
        <p class="lead">
          ${FIRM} is a practice of advocates in Lucknow. It assists with
          litigation, documentation, registration, taxation and regulatory
          matters, and appears before the courts, tribunals and authorities
          concerned with them.
        </p>
        <p>
          The work of the firm falls into four broad groups: contested matters
          before civil and criminal courts; property documentation, registration
          and the disputes that arise from them; corporate, contractual and
          registration work for businesses; and direct and indirect tax
          compliance and proceedings.
        </p>
        <p>
          Each advocate of the firm is enrolled with the Bar Council of Uttar
          Pradesh and holds a Certificate of Practice.
        </p>`
})}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="base-title">
    <div class="container">
${sectionHead({
  eyebrow: "Where the firm works",
  title: "Lucknow Base and Uttar Pradesh Coverage",
  lead: "One office, and matters attended to across the state from it.",
  id: "base-title"
})}
      <div class="grid grid--2" data-reveal-group>
        <div class="prose" data-reveal>
          <h3>The office</h3>
          <p>
            The firm has a single principal office, in Lucknow. There is no
            branch office anywhere else, and none is described on this website.
          </p>
          <address class="stack">
            <p class="is-pending" data-config="address" data-pending-label="Office address to be published"></p>
            <p><a data-config="phone" data-config-role="tel" data-pending-label="Telephone to be published"><span data-config-slot>Telephone to be published</span></a></p>
          </address>
        </div>
        <div class="prose" data-reveal>
          <h3>Matters elsewhere in the state</h3>
          <p>
            Matters arising in other districts of Uttar Pradesh are conducted
            from Lucknow before the court, tribunal or authority that has
            jurisdiction over them. Where a matter requires attendance
            elsewhere, that is arranged for the particular hearing.
          </p>
          <p>${arrowLink("Service locations", "../locations/index.html")}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="integrated-title">
    <div class="container">
${splitSection("../", {
  reverse: true,
  imageKey: "photos.contracts",
  ratio: "3x2",
  body: `        <p class="eyebrow">Approach</p>
        <h2 id="integrated-title">An Integrated Legal and Tax Approach</h2>
        <p>
          Legal and tax questions frequently arise from the same set of facts. A
          sale of property carries stamp duty and capital gains consequences; a
          new firm needs both a partnership deed and its tax registrations; a
          recovery matter turns on documents that also have to stand up to a tax
          assessment.
        </p>
        <p>
          Because both sides of that work are handled within the same practice,
          the drafting and the filings can be kept consistent with each other,
          and a client is not left to carry information between separate
          advisers.
        </p>`
})}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="clients-title">
    <div class="container">
${sectionHead({
  eyebrow: "Who the firm assists",
  title: "Clients Assisted",
  lead: "Instructions are accepted from private individuals as well as from businesses.",
  id: "clients-title"
})}
${pillars([
  [ICON.handshake(22), "Individuals",
   "Personal matters before civil and criminal courts, family property questions, recovery of dues and responses to notices."],
  [ICON.key(22), "Property owners",
   "Purchase and sale documentation, registration, mutation of records, tenancy questions and title disputes."],
  [ICON.file(22), "Professionals",
   "Engagement and confidentiality agreements, income-tax and GST compliance, and responses to departmental correspondence."],
  [ICON.building(22), "Businesses",
   "Firm and company registration, commercial contracts, statutory compliance and commercial disputes."]
], "four")}
    </div>
  </section>

  <section class="section" aria-labelledby="areas-title">
    <div class="container">
${sectionHead({
  eyebrow: "Scope",
  title: "Areas of Assistance",
  lead: "The twelve areas the firm handles. Each links to its own page.",
  id: "areas-title"
})}
      <ul class="link-list" data-reveal>
${PRACTICE_AREAS.map(
  ([slug, name]) => `        <li><a href="../practice-areas/${slug}/index.html">${name}</a></li>`
).join("\n")}
      </ul>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="process-title">
    <div class="container">
${sectionHead({
  eyebrow: "Working process",
  title: "How a Matter Is Taken Forward",
  lead: "The stages vary with the nature of the matter and the forum involved.",
  id: "process-title"
})}
${processSteps([
  ["Initial discussion", "A first conversation about what has happened, what is sought and what timelines apply."],
  ["Document review", "The papers already available are examined, and anything still required is identified."],
  ["Scope and next steps", "The available course of action, the work involved and the likely stages are set out."],
  ["Representation, drafting, filing or compliance assistance", "The agreed work is carried out, whether that is appearance, drafting, filing or continuing compliance."]
])}
    </div>
  </section>

  <section class="section" aria-labelledby="advocates-title">
    <div class="container">
${sectionHead({
  eyebrow: "The practice",
  title: "Advocates",
  lead: "Each advocate of the firm is enrolled with the Bar Council of Uttar Pradesh and holds a Certificate of Practice.",
  id: "advocates-title"
})}
      <div class="grid grid--3" data-reveal-group>
${ADVOCATES.map((a) => advocateCard("../", a)).join("\n")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="conduct-title">
    <div class="container container--narrow">
${sectionHead({
  eyebrow: "Professional conduct",
  title: "A Note on What This Website Is",
  id: "conduct-title"
})}
      <div class="disclaimer-note" data-reveal>
        <p>
          The rules of the Bar Council of India prohibit advocates from
          advertising or soliciting work. This website is published for
          information only, for the benefit of persons who seek it of their own
          accord. It is not an advertisement, an inducement or a solicitation.
        </p>
        <p>
          Nothing on this page is a promise or prediction of any outcome. No
          result can be assured in any matter: outcomes depend on the facts, the
          evidence and the law applied to them.
        </p>
        <p>
          Nothing here is legal advice, and reading it creates no
          advocate&ndash;client relationship. Please take advice on your own
          matter before acting.
        </p>
        <p>${arrowLink("Read the full disclaimer", "../disclaimer/index.html")}</p>
      </div>
    </div>
  </section>`
});

/* --- Advocates index ------------------------------------------------------ */

/* Premium profile card used on the advocates index. */
function advocateProfileCard(P, a, href) {
  return `      <article class="advocate-card-lg" data-reveal>
        <a class="advocate-card-lg__link" href="${href}">
          ${media({ imageKey: "advocates." + a.slug, className: "advocate-photo", base: P, pad: "          " })}
          <div class="advocate-card-lg__body">
            <p class="advocate-card-lg__years">${a.experience}</p>
            <h3 class="advocate-card-lg__name">${a.name}</h3>
            <ul class="credentials">
              <li>${CREDENTIALS[0]}</li>
              <li>${CREDENTIALS[1]}</li>
            </ul>
            <span class="arrow-link advocate-card-lg__cta">View profile ${ICON.arrow()}</span>
          </div>
        </a>
      </article>`;
}

files["advocates/index.html"] = page({
  depth: 1,
  canonical: "/advocates/",
  title: "Advocates | " + FIRM + " Lucknow",
  description:
    "The advocates of H.R. Legal Associate, Lucknow. Each is enrolled with the Bar Council of Uttar Pradesh and holds a Certificate of Practice.",
  body:
    pageHeader("../", {
      title: "Advocates at " + FIRM,
      lead: "Each advocate of the firm is enrolled with the Bar Council of Uttar Pradesh and holds a Certificate of Practice.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Advocates" }]
    }) +
    `

  <section class="section" aria-label="Advocates of the firm">
    <div class="grid-advocates container" data-reveal-group>
${ADVOCATES.map((a) => advocateProfileCard("../", a, a.slug + "/index.html")).join("\n")}
    </div>
  </section>

  <section class="section section--soft">
    <div class="container container--narrow">
      <div class="disclaimer-note" data-reveal>
        <p>
          The details on these pages are limited to what the firm has verified:
          years in practice, enrolment with the Bar Council of Uttar Pradesh and
          the holding of a Certificate of Practice. No specialisation,
          court list, qualification or result is claimed for any advocate.
        </p>
        <p>
          This website is not an advertisement or a solicitation of work, and
          nothing on it is legal advice.
          ${arrowLink("Read the full disclaimer", "../disclaimer/index.html")}
        </p>
      </div>
    </div>
  </section>`
});

/* --- Advocate profiles ------------------------------------------------------
   Only supplied facts are published. Anything still {{TO_BE_PROVIDED}} in
   src/data/advocates.js is omitted from the markup altogether — no empty
   row, no "to be updated" label. */

function advocateDetails(a) {
  const rows = Object.keys(a.details || {})
    .filter((key) => !isWithheld(a.details[key]))
    .map(
      (key) => `            <div class="detail-row">
              <dt>${ADVOCATE_DATA.detailLabels[key] || key}</dt>
              <dd>${a.details[key]}</dd>
            </div>`
    );

  if (!rows.length) return "";

  return `          <dl class="detail-list">
${rows.join("\n")}
          </dl>
`;
}

function personJsonLd(a) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    jobTitle: "Advocate",
    url: DOMAIN + "/advocates/" + a.slug + "/",
    description: a.experience + ". " + CREDENTIALS[0] + ". " + CREDENTIALS[1] + ".",
    worksFor: {
      "@type": "LegalService",
      name: FIRM,
      url: DOMAIN + "/"
    },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN"
      }
    },
    /* Stated as credentials rather than membership: the supplied wording
       is "enrolled with", and no membership of any other body is claimed. */
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Bar enrolment",
        recognizedBy: { "@type": "Organization", name: "Bar Council of Uttar Pradesh" }
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Certificate of Practice"
      }
    ]
  };

  /* Only claim a photograph once the file is actually there. */
  if (advocatePhotoExists(a.slug)) {
    data.image = DOMAIN + "/" + IMAGES.advocates[a.slug].src;
  }

  return data;
}

ADVOCATES.forEach((a) => {
  files["advocates/" + a.slug + "/index.html"] = page({
    depth: 2,
    canonical: "/advocates/" + a.slug + "/",
    title: a.name + " | Advocate at " + FIRM + ", Lucknow",
    description:
      a.name + " practises with " + FIRM + " in Lucknow. " + a.experience +
      ", enrolled with the Bar Council of Uttar Pradesh and holding a Certificate of Practice.",
    jsonLd: personJsonLd(a),
    body:
      pageHeader("../../", {
        title: a.name,
        lead: a.experience,
        trail: [
          { label: "Home", href: "index.html" },
          { label: "Advocates", href: "advocates/index.html" },
          { label: a.short }
        ]
      }) +
      `

  <section class="section" aria-labelledby="profile-title">
    <div class="container">
      <div class="split">
        <div class="split__media" data-reveal>
          ${media({ imageKey: "advocates." + a.slug, className: "advocate-photo media--framed", base: "../../", pad: "          " })}
          <ul class="credentials credentials--lead advocate-side-facts">
            <li>${a.experience}</li>
            <li>${CREDENTIALS[0]}</li>
            <li>${CREDENTIALS[1]}</li>
          </ul>
${advocateDetails(a)}        </div>

        <div class="split__content prose" data-reveal>
          <p class="eyebrow">Profile</p>
          <h2 id="profile-title">Professional summary</h2>
          <p class="lead">
            ${a.name} practises with ${FIRM}, a legal and tax practice based in
            Lucknow, and has ${a.years}+ years in practice.
          </p>
          <p>
            ${a.short} is enrolled with the Bar Council of Uttar Pradesh and
            holds a Certificate of Practice. Work is undertaken as part of the
            firm, across the areas the firm handles, and before the courts,
            tribunals and authorities having jurisdiction over the matter
            concerned.
          </p>
          <p class="text-muted">
            No specialisation is claimed. Whether a particular matter is taken
            up, and by which advocate of the firm, depends on its subject and
            the forum involved.
          </p>

          <h2>Consultation approach</h2>
          <p>
            A first discussion covers what has happened, what is sought and what
            timelines apply. The papers already available are examined, anything
            further that is needed is identified, and the available course of
            action is then set out along with the work it involves.
          </p>
          <p>
            Advice is given on the facts and documents of the particular matter.
            No outcome is promised or predicted, in this or any matter.
          </p>

          <h2>Practice areas of the firm</h2>
          <p>
            ${a.short} works within the firm&rsquo;s practice areas, each of which
            is set out on its own page.
          </p>
          <ul class="link-list link-list--compact">
${PRACTICE_AREAS.map(
  ([slug, name]) => `            <li><a href="../../practice-areas/${slug}/index.html">${name}</a></li>`
).join("\n")}
          </ul>

          <div class="cluster">
            ${btnPrimary("Discuss a matter", "../../contact/index.html")}
            ${btnSecondary("All advocates", "../index.html")}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container container--narrow">
      <div class="disclaimer-note" data-reveal>
        <p>
          This page is published for information only. It is not an
          advertisement, an inducement or a solicitation of work, and reading it
          creates no advocate&ndash;client relationship.
        </p>
        <p>
          The particulars given above are limited to the years in practice,
          enrolment with the Bar Council of Uttar Pradesh and the holding of a
          Certificate of Practice. No qualification, court list, membership,
          designation, reported matter or result is claimed.
        </p>
        <p>${arrowLink("Read the full disclaimer", "../../disclaimer/index.html")}</p>
      </div>
    </div>
  </section>`
  });
});

/* --- Practice areas index ----------------------------------------------------- */

files["practice-areas/index.html"] = page({
  depth: 1,
  canonical: "/practice-areas/",
  remoteImages: true,
  title: "Practice Areas | " + FIRM,
  description:
    "Practice areas covered by " + FIRM + ", including civil, criminal, property, corporate, service, employment and tax matters.",
  body:
    pageHeader("../", {
      title: "Practice areas",
      lead: "Matters handled by the firm across Uttar Pradesh.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Practice Areas" }]
    }) +
    `

  <section class="section">
    <div class="container">
      <div class="grid grid--3" data-reveal-group data-reveal-step="70">
${PRACTICE_AREAS.map((area, i) => practiceCard("../", area, i, true)).join("\n")}
      </div>
    </div>
  </section>`
});

/* --- Practice area pages ------------------------------------------------------- */

function scopeList(items) {
  return items.map((item) => `            <li>${item}</li>`).join("\n");
}

PRACTICE_AREAS.forEach(([slug, name, blurb]) => {
  let scope = "";
  let related = "";

  const hubSlug = PRACTICE_AREA_HUBS[slug];
  const hubPointer = hubSlug
    ? `          <div class="notice">
            <p>This area has a detailed section with its own service pages.
            <a href="../../${hubSlug}/index.html">Go to ${SECTION_HUBS.find((h) => h.slug === hubSlug).name}</a>.</p>
          </div>
`
    : "";

  if (slug === "service-law") {
    scope = `          <h2>Scope</h2>
          <p>The following matters fall within this practice area.</p>
          <ul>
${scopeList(SERVICE_LAW_SCOPE)}
          </ul>`;
    related = `          <div class="notice">
            <p>Service law concerns government employment. For matters arising out of
            private employment, see <a href="../employment-law/index.html">Employment Law</a>.</p>
          </div>`;
  } else if (slug === "employment-law") {
    scope = `          <h2>Scope</h2>
          <p>The following matters fall within this practice area.</p>
          <ul>
${scopeList(EMPLOYMENT_LAW_SCOPE)}
          </ul>`;
    related = `          <div class="notice">
            <p>Employment law concerns private employment. For matters arising out of
            government service, see <a href="../service-law/index.html">Service Law</a>.</p>
          </div>`;
  }

  files["practice-areas/" + slug + "/index.html"] = page({
    depth: 2,
    canonical: "/practice-areas/" + slug + "/",
    remoteImages: true,
    title: name + " | " + FIRM,
    description: name + " — " + blurb,
    body:
      pageHeader("../../", {
        title: name,
        lead: blurb,
        trail: [
          { label: "Home", href: "index.html" },
          { label: "Practice Areas", href: "practice-areas/index.html" },
          { label: name }
        ]
      }) +
      `

  <section class="section">
    <div class="container">
${splitSection("../../", {
  imageKey: "photos." + IMAGES.practiceAreas[slug],
  ratio: "3x2",
  body: `        <p class="eyebrow">Practice area</p>
        <h2>${name}</h2>
        <p class="lead">${blurb}</p>
${hubPointer}${scope}
${related}`
})}
    </div>
  </section>

  <section class="section section--soft">
    <div class="container prose">
${PREP_NOTE}
      <p class="cluster">
        ${btnSecondary("All practice areas", "../index.html")}
        ${btnPrimary("Contact the office", "../../contact/index.html")}
      </p>
    </div>
  </section>`
  });
});

/* --- Locations --------------------------------------------------------------
   The firm has one office, in Lucknow. That single fact governs everything
   in this section:

     - only the Lucknow page carries an address, a telephone number, a map
       link or LocalBusiness-style structured data;
     - every other page carries, immediately under the heading, a statement
       that it does not represent a separate office in that city;
     - no page names a local advocate, a branch, a local client or a court
       building, and no page claims to be near one.

   The wording that makes each city read differently lives in
   src/data/locations.js, not here. This file only decides how a city is
   laid out, so a page cannot become a doorway page by being generated. */

/* The six service areas the content model sets out, in order. `emphasis`
   names the per-city sentence used for the area, and `links` are the pages
   in that section most often reached from a location page. */
const CITY_SERVICE_AREAS = [
  {
    key: "civil",
    id: "civil",
    eyebrow: "Litigation",
    title: "Civil and Criminal Matters",
    links: [
      ["Civil litigation", "civil-litigation/index.html"],
      ["Criminal law", "criminal-law/index.html"],
      ["Bail and anticipatory bail", "criminal-law/bail-anticipatory-bail-lawyer-lucknow/index.html"],
      ["Money recovery suits", "civil-litigation/money-recovery-lawyer-lucknow/index.html"]
    ]
  },
  {
    key: "cheque",
    id: "cheque",
    eyebrow: "Recovery",
    title: "Cheque Bounce and Recovery",
    links: [
      ["Cheque bounce and recovery", "cheque-bounce-and-recovery/index.html"],
      ["Cheque-bounce demand notice", "cheque-bounce-and-recovery/cheque-bounce-legal-notice-lucknow/index.html"],
      ["Section 138 defence", "cheque-bounce-and-recovery/section-138-defence-lawyer-lucknow/index.html"],
      ["Recovery notice", "cheque-bounce-and-recovery/money-recovery-legal-notice-lucknow/index.html"]
    ]
  },
  {
    key: "property",
    id: "property",
    eyebrow: "Property",
    title: "Property and Registration Matters",
    links: [
      ["Property law and registration", "property-law-and-registration/index.html"],
      ["Title verification", "property-law-and-registration/property-title-verification-lucknow/index.html"],
      ["Sale deed drafting and registration", "property-law-and-registration/sale-deed-drafting-registration-lucknow/index.html"],
      ["Mutation of records", "property-law-and-registration/mutation-dakhil-kharij-lucknow/index.html"]
    ]
  },
  {
    key: "corporate",
    id: "corporate",
    eyebrow: "Business",
    title: "Corporate and Contractual Assistance",
    links: [
      ["Corporate and contracts", "corporate-and-contracts/index.html"],
      ["Contract drafting and review", "corporate-and-contracts/contract-drafting-lawyer-lucknow/index.html"],
      ["Partnership deeds", "corporate-and-contracts/partnership-deed-drafting-lucknow/index.html"],
      ["Vendor and service agreements", "corporate-and-contracts/vendor-service-agreement-lucknow/index.html"]
    ]
  },
  {
    key: "tax",
    id: "tax",
    eyebrow: "Tax",
    title: "Income Tax and GST",
    links: [
      ["Tax and GST", "tax-and-gst/index.html"],
      ["Income-tax notices", "tax-and-gst/income-tax-notice-lawyer-lucknow/index.html"],
      ["GST registration", "tax-and-gst/gst-registration-lucknow/index.html"],
      ["Replies to GST notices", "tax-and-gst/gst-notice-reply-lawyer-lucknow/index.html"]
    ]
  },
  {
    key: "registration",
    id: "registration",
    eyebrow: "Registration",
    title: "Firm and Business Registration",
    links: [
      ["Business registration", "business-registration/index.html"],
      ["Partnership firm registration", "business-registration/partnership-firm-registration-lucknow/index.html"],
      ["LLP registration", "business-registration/llp-registration-lucknow/index.html"],
      ["Company registration", "business-registration/private-limited-company-registration-lucknow/index.html"]
    ]
  }
];

/* Work that can sensibly start before anyone travels, and work that
   cannot. Neither list names a court or claims proximity to one: which
   forum hears a matter depends on its facts and is confirmed before
   anything is filed. */
const REMOTE_START = [
  "A first discussion about what has happened and what is sought, by telephone or video call.",
  "Reading scanned documents &mdash; agreements, notices, returns, orders and correspondence &mdash; before originals are seen.",
  "Drafting and settling notices, replies, agreements and deeds, with revisions exchanged electronically.",
  "Preparing and submitting registration and return filings that are made online.",
  "Written replies to notices issued by a tax or registration authority."
];

const IN_PERSON = [
  "Execution and registration of a deed, where the parties must attend the registration office in person.",
  "Hearings where the court, tribunal or authority requires a party rather than only the advocate to be present.",
  "Examination of original title documents, which frequently cannot be assessed from a photograph or a scan.",
  "Recording of evidence, and any proceeding in which a party must be identified in person.",
  "Any step for which the forum concerned directs personal attendance."
];

const LOCATION_GUIDES = [
  ["Property Documents to Review Before a Purchase", "legal-guides/index.html"],
  ["Responding to a Cheque-Bounce Matter", "legal-guides/index.html"],
  ["Legal and Tax Checklist for Starting a Firm", "legal-guides/index.html"]
];

/* Typographic hero for every city other than Lucknow.

   There is one photograph of Lucknow in the image registry and no
   verified photograph of any other city. Putting a stock photograph on
   the Kanpur page that may show somewhere else would be a small lie in a
   prominent position, so those pages get a plate built from type instead:
   ivory ground, a fine map-line pattern, the city name, the state and a
   location mark. It is decorative, and the heading beside it carries the
   meaning. */
function cityHero(P, city, trail) {
  return `  <section class="hero hero--city">
    <span class="hero--city__lines" aria-hidden="true"></span>
    <div class="container hero__inner">
      <div class="hero--city__grid">
        <div class="hero__content">
${breadcrumb(P, trail)}
          <h1>${city.h1}</h1>
          <p class="hero__lead">${city.lead}</p>
        </div>
        <p class="city-plate" aria-hidden="true">
          <span class="city-plate__icon">${ICON.pin(18)}</span>
          <span class="city-plate__name">${city.name}</span>
          <span class="city-plate__region">Uttar Pradesh</span>
        </p>
      </div>
    </div>
  </section>`;
}

/* Section 3 of the content model. The office page states where the office
   is; every other page states, in the firm's own words and before any
   service copy, that it is not one. */
function officeStatement(P, city) {
  if (city.isOffice) {
    /* The hero above already carries the one photograph of Lucknow the
       registry holds, so the address sits in a panel rather than beside a
       second copy of the same picture. */
    return `  <section class="section section--tight" aria-labelledby="loc-office">
    <div class="container container--reading">
      <div class="service-area-note service-area-note--office" data-reveal>
        <span class="service-area-note__icon" aria-hidden="true">${ICON.pin(20)}</span>
        <div>
          <h2 class="service-area-note__title" id="loc-office">The Firm's Office Is in Lucknow</h2>
          <p class="service-area-note__statement">
            This is the firm's principal and only office. There is no branch
            office in any other district, and no other page of this website
            represents one.
          </p>
          <address class="stack">
            <p class="is-pending" data-config="address" data-pending-label="Office address to be published"></p>
            <p><a data-config="phone" data-config-role="tel" data-pending-label="Telephone to be published"><span data-config-slot>Telephone to be published</span></a></p>
            <p><a data-config="googleMapsUrl" data-config-role="url" data-config-text="keep" data-pending-label="Map link to be published">View on Google Maps</a></p>
          </address>
        </div>
      </div>
    </div>
  </section>`;
  }

  return `  <section class="section section--tight" aria-labelledby="loc-office">
    <div class="container container--reading">
      <div class="service-area-note" data-reveal>
        <span class="service-area-note__icon" aria-hidden="true">${ICON.pin(20)}</span>
        <div>
          <h2 class="service-area-note__title" id="loc-office">Service area, not an office</h2>
          <p class="service-area-note__statement">
            ${LOCATIONS.serviceAreaStatement.replace("{{CITY}}", city.name)}
          </p>
          <p>
            There is no office, no telephone line and no advocate of the firm
            based in ${city.name}. Instructions from the district are taken at
            the Lucknow office, or remotely, and matters are conducted before
            whichever court, tribunal or authority has jurisdiction over them.
          </p>
          <p>${arrowLink("Where the office is", P + "locations/lucknow/index.html")}</p>
        </div>
      </div>
    </div>
  </section>`;
}

function locationPage(city) {
  const P = "../../";
  const canonical = "/locations/" + city.slug + "/";
  const trail = [
    { label: "Home", href: "index.html", canonical: "" },
    { label: "Locations", href: "locations/index.html", canonical: "locations/" },
    { label: city.name, canonical: "locations/" + city.slug + "/" }
  ];

  /* Sections 5 to 10. The heading names the area and the city name is
     carried by the eyebrow, so the page does not repeat the city in six
     consecutive headings. */
  const serviceSections = CITY_SERVICE_AREAS.map(
    (area, i) => `  <section class="section${i % 2 ? " section--soft" : ""}" aria-labelledby="loc-${area.id}">
    <div class="container container--reading">
${sectionHead({ eyebrow: area.eyebrow, title: area.title, id: "loc-" + area.id })}
      <p>${city.emphasis[area.key]}</p>
${relatedLinks(P, area.links)}
    </div>
  </section>`
  ).join("\n\n");

  const jsonLd = city.isOffice
    ? [
        breadcrumbJsonLd(trail),
        /* Same @id as the node on the homepage: this is the one firm, with
           its address stated on the page that describes its office, not a
           second organisation. */
        {
          "@context": "https://schema.org",
          "@type": "LegalService",
          "@id": DOMAIN + "/#practice",
          name: FIRM,
          url: DOMAIN + "/",
          telephone: "{{PHONE}}",
          email: "{{EMAIL}}",
          hasMap: "{{GOOGLE_MAPS_URL}}",
          address: {
            "@type": "PostalAddress",
            streetAddress: "{{STREET_ADDRESS}}",
            addressLocality: "Lucknow",
            addressRegion: "Uttar Pradesh",
            postalCode: "{{POSTAL_CODE}}",
            addressCountry: "IN"
          },
          areaServed: { "@type": "AdministrativeArea", name: "Uttar Pradesh" }
        }
      ]
    : [
        breadcrumbJsonLd(trail),
        /* No address, no telephone, no geo. The page describes an area the
           firm serves from Lucknow, and the schema says exactly that. */
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: city.h1,
          description: city.description,
          url: DOMAIN + canonical,
          inLanguage: "en-IN",
          isPartOf: { "@id": DOMAIN + "/#practice" }
        },
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Legal and tax assistance for clients in " + city.name,
          serviceType: "Legal services",
          description: city.description,
          url: DOMAIN + canonical,
          provider: { "@id": DOMAIN + "/#practice" },
          areaServed: [
            { "@type": "City", name: city.name },
            { "@type": "AdministrativeArea", name: "Uttar Pradesh" }
          ]
        }
      ];

  return page({
    depth: 2,
    canonical,
    noindex: !city.index,
    sourceNote: city.index
      ? null
      : "TODO: Add independently verified city-specific content before changing to index,follow.",
    remoteImages: city.isOffice,
    cta: false,
    title: city.title,
    description: city.description,
    jsonLd,
    body:
      (city.isOffice
        ? sectionHero(P, { imageKey: "lucknow", h1: city.h1, lead: city.lead, trail })
        : cityHero(P, city, trail)) +
      "\n\n" +
      officeStatement(P, city) +
      `

  <section class="section${city.isOffice ? " section--soft" : ""}" aria-labelledby="loc-overview">
    <div class="container container--reading prose">
${sectionHead({ eyebrow: "Overview", title: "How the Firm Assists Clients Here", id: "loc-overview" })}
      <p>${city.region}</p>
${city.intro.map((t) => `      <p>${t}</p>`).join("\n")}
    </div>
  </section>

${serviceSections}

  <section class="section" aria-labelledby="loc-consultation">
    <div class="container container--reading">
${sectionHead({
  eyebrow: "Getting started",
  title: "How Consultation and Document Review Work",
  id: "loc-consultation"
})}
      <p>${city.consultation}</p>
${processSteps([
  ["First discussion", "What has happened, what is sought and whether anything is running against time."],
  ["Document review", "The papers already held are read, and anything still to be obtained is identified."],
  ["Scope and next steps", "The available course of action, the work it involves and its likely stages are set out before it is begun."]
])}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="loc-remote">
    <div class="container container--reading">
${sectionHead({
  eyebrow: "Remote",
  title: "Matters That May Begin Remotely",
  lead: "Whether a particular matter can be taken this far without a meeting depends on the papers, and is settled at the outset rather than assumed.",
  id: "loc-remote"
})}
${markerList(REMOTE_START)}
    </div>
  </section>

  <section class="section" aria-labelledby="loc-in-person">
    <div class="container container--reading">
${sectionHead({
  eyebrow: "In person",
  title: "Matters That May Require Physical Appearance",
  lead: "Some steps cannot be completed remotely. Where attendance is required, that is said in advance rather than discovered on the day.",
  id: "loc-in-person"
})}
${markerList(IN_PERSON)}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="loc-advocates">
    <div class="container">
${sectionHead({
  eyebrow: "The practice",
  title: "Advocates",
  lead: "Each advocate of the firm is enrolled with the Bar Council of Uttar Pradesh and holds a Certificate of Practice. All three work from the Lucknow office.",
  id: "loc-advocates"
})}
      <div class="grid grid--3" data-reveal-group>
${ADVOCATES.map((a) => advocateCard(P, a)).join("\n")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="loc-guides">
    <div class="container container--reading">
${sectionHead({ eyebrow: "Reading", title: "Related Guides", id: "loc-guides" })}
${relatedLinks(P, LOCATION_GUIDES)}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="loc-faq">
    <div class="container">
${sectionHead({ eyebrow: "Questions", title: "Frequently Asked Questions", id: "loc-faq" })}
${accordion("loc-faq-" + city.slug, city.faqs, true)}
    </div>
  </section>

  <section class="section section--navy" aria-labelledby="loc-contact">
    <div class="container">
${sectionHead({
  eyebrow: "Contact",
  light: true,
  title: "Contact the Lucknow Office",
  lead: city.isOffice
    ? "Please arrange a time before attending, so that the papers can be looked at properly. Sending an enquiry does not create an advocate&ndash;client relationship, and confidential documents should not be sent through this website."
    : "Enquiries from " + city.name + " are answered from the Lucknow office; there is no separate local number. Sending an enquiry does not create an advocate&ndash;client relationship, and confidential documents should not be sent through this website.",
  id: "loc-contact"
})}
${contactPanel(P)}
      <div class="cta-band__actions" data-reveal>
        <a class="btn btn--inverse" href="${P}contact/index.html">Go to the contact form</a>
        <a class="btn btn--outline-light" data-config="phone" data-config-role="tel" data-config-text="keep" data-pending-label="Telephone to be published">${ICON.phone()}<span>Call the office</span></a>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container container--reading">
${disclaimerBlock(P)}
${lastReviewed()}
    </div>
  </section>`
  });
}

CITIES.forEach((city) => {
  files["locations/" + city.slug + "/index.html"] = locationPage(city);
});

/* --- Locations index -------------------------------------------------------
   Grouped rather than listed flat, so the office, the pages that are
   indexable at launch and the pages still being developed are not
   presented as equivalent. */

const locationIndexCard = (city) =>
  locationCard(
    city.name,
    city.isOffice ? "Office" : "Service area",
    city.lead,
    city.slug + "/index.html"
  );

files["locations/index.html"] = page({
  depth: 1,
  canonical: "/locations/",
  remoteImages: true,
  title: "Locations Across Uttar Pradesh | " + FIRM,
  description:
    FIRM + " is based in Lucknow and assists clients with appropriate matters across Uttar Pradesh. One office, in Lucknow; no branch office elsewhere.",
  jsonLd: breadcrumbJsonLd([
    { label: "Home", href: "index.html", canonical: "" },
    { label: "Locations", canonical: "locations/" }
  ]),
  body:
    pageHeader("../", {
      title: "Locations Across Uttar Pradesh",
      lead: "One office, in Lucknow. Matters arising elsewhere in the state are conducted from it.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Locations" }]
    }) +
    `

  <section class="section">
    <div class="container">
${splitSection("../", {
  imageKey: "photos.lucknow",
  ratio: "3x2",
  body: `        <p class="eyebrow">The office</p>
        <h2>Lucknow, Uttar Pradesh</h2>
        <p>
          The firm has one office and it is in Lucknow. There is no branch
          office in any other district. The pages below describe districts
          the firm assists clients in; none of them is a second office, and
          none carries a local address or a local telephone number.
        </p>
        <address class="stack">
          <p class="is-pending" data-config="address" data-pending-label="Office address to be published"></p>
          <p><a data-config="phone" data-config-role="tel" data-pending-label="Telephone to be published"><span data-config-slot>Telephone to be published</span></a></p>
          <p><a data-config="googleMapsUrl" data-config-role="url" data-config-text="keep" data-pending-label="Map link to be published">View on Google Maps</a></p>
        </address>
        <p class="cluster">${btnSecondary("The Lucknow page", "lucknow/index.html")}</p>`
})}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="loc-primary">
    <div class="container">
${sectionHead({
  eyebrow: "Primary launch locations",
  title: "Districts With Published Location Pages",
  lead: "These pages are complete and describe how matters from each district are usually taken forward.",
  id: "loc-primary"
})}
      <div class="grid grid--cities" data-reveal-group data-reveal-step="60">
${TIER_1.map(locationIndexCard).join("\n")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="loc-additional">
    <div class="container">
${sectionHead({
  eyebrow: "Additional Uttar Pradesh service areas",
  title: "Further Districts the Firm Assists Clients In",
  lead: "These pages are being developed. They are published for reference and are not submitted for indexing until their content has been independently reviewed.",
  id: "loc-additional"
})}
      <div class="grid grid--cities" data-reveal-group data-reveal-step="60">
${TIER_2.map(locationIndexCard).join("\n")}
      </div>
    </div>
  </section>

${coverageBlock("loc-coverage")}

  <section class="section">
    <div class="container container--reading">
${disclaimerBlock("../")}
${lastReviewed()}
    </div>
  </section>`
});

/* --- Legal guides ----------------------------------------------------------------- */

const FAQ = [
  [
    "Does using this website create an advocate&ndash;client relationship?",
    "No. Reading this website, or sending an enquiry through it, does not create an advocate&ndash;client relationship with the firm or any of its advocates."
  ],
  [
    "Is the information published here legal advice?",
    "No. The notes in this section are general information about procedure. They are not legal advice and should not be relied upon in place of advice taken on the facts of a particular matter."
  ],
  [
    "Which matters does the firm attend to?",
    "The firm attends to civil and criminal litigation, property and corporate matters, service and employment matters, and direct and indirect tax matters. The full list is set out under practice areas."
  ],
  [
    "Where is the firm based?",
    "The office is in Lucknow, and the firm attends to matters across Uttar Pradesh."
  ]
];

files["legal-guides/index.html"] = page({
  depth: 1,
  canonical: "/legal-guides/",
  remoteImages: true,
  title: "Legal Guides | " + FIRM,
  description: "General information notes on legal and tax procedure in Uttar Pradesh, published by " + FIRM + ".",
  body:
    pageHeader("../", {
      title: "Legal guides",
      lead: "General information notes on legal and tax procedure.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Legal Guides" }]
    }) +
    `

  <section class="section">
    <div class="container">
${sectionHead({
  eyebrow: "Notes",
  title: "Guides being prepared",
  lead: "This section will carry general information notes on procedure and commonly asked questions."
})}
      <div class="grid grid--3" data-reveal-group>
${articleCard("../", {
  imageKey: "photos.legalGuides",
  category: "Guide",
  meta: "In preparation",
  title: "Procedure notes",
  text: "Short notes explaining the stages of common proceedings."
})}
${articleCard("../", {
  imageKey: "photos.contracts",
  category: "Guide",
  meta: "In preparation",
  title: "Documents and drafting",
  text: "What a matter of each kind usually requires by way of documents."
})}
${articleCard("../", {
  imageKey: "photos.tax",
  category: "Guide",
  meta: "In preparation",
  title: "Tax compliance notes",
  text: "General notes on notices, returns and appellate timelines."
})}
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
${sectionHead({ eyebrow: "Questions", title: "Commonly asked questions" })}
${accordion("faq", FAQ, false)}
    </div>
  </section>`
});

/* --- Contact ------------------------------------------------------------------------- */

files["contact/index.html"] = page({
  depth: 1,
  canonical: "/contact/",
  title: "Contact | " + FIRM,
  description: "Contact details for " + FIRM + ", advocates in Lucknow, Uttar Pradesh.",
  body:
    pageHeader("../", {
      title: "Contact",
      lead: "Office details and enquiry form.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Contact" }]
    }) +
    `

  <section class="section">
    <div class="container">
      <div class="split">

        <div class="split__content prose" data-reveal>
          <p class="eyebrow">The office</p>
          <h2>Lucknow, Uttar Pradesh</h2>
          <address class="stack">
            <p class="is-pending" data-config="address" data-pending-label="Office address to be published"></p>
            <p>Telephone: <a data-config="phone" data-config-role="tel" data-pending-label="to be published"><span data-config-slot>to be published</span></a></p>
            <p>WhatsApp: <a data-config="whatsapp" data-config-role="whatsapp" data-pending-label="to be published"><span data-config-slot>to be published</span></a></p>
            <p>Email: <a data-config="email" data-config-role="email" data-pending-label="to be published"><span data-config-slot>to be published</span></a></p>
            <p><a data-config="googleMapsUrl" data-config-role="url" data-config-text="keep" data-pending-label="Map link to be published">View on Google Maps</a></p>
          </address>
          <div class="disclaimer-note">
            <p>Sending an enquiry does not create an advocate&ndash;client relationship.
            Please do not send confidential documents through this website.</p>
          </div>
        </div>

        <div data-reveal>
          <p class="eyebrow">Enquiry</p>
          <h2>Write to the office</h2>

          <form class="form" data-form="enquiry" method="post" novalidate>
            <div class="notice" data-form-notice hidden>
              <p>The enquiry form is not active yet. Please use the telephone or email
              details listed on this page.</p>
            </div>

            <div class="field">
              <label for="enquiry-name">Name <span class="required" aria-hidden="true">*</span></label>
              <input id="enquiry-name" name="name" type="text" autocomplete="name" required>
            </div>

            <div class="field">
              <label for="enquiry-phone">Telephone <span class="required" aria-hidden="true">*</span></label>
              <input id="enquiry-phone" name="phone" type="tel" autocomplete="tel" required>
            </div>

            <div class="field">
              <label for="enquiry-email">Email</label>
              <input id="enquiry-email" name="email" type="email" autocomplete="email">
            </div>

            <div class="field">
              <label for="enquiry-subject">Subject</label>
              <select id="enquiry-subject" name="subject">
                <option value="">Please select</option>
${PRACTICE_AREAS.map(([slug, name]) => `                <option value="${slug}">${name}</option>`).join("\n")}
                <option value="other">Other</option>
              </select>
            </div>

            <div class="field">
              <label for="enquiry-message">Message <span class="required" aria-hidden="true">*</span></label>
              <textarea id="enquiry-message" name="message" aria-describedby="enquiry-message-hint" required></textarea>
              <span class="hint" id="enquiry-message-hint">Please do not send confidential documents through this form.</span>
            </div>

            <div>
              <button class="btn btn--primary" type="submit">Send enquiry</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </section>`
});

/* --- Disclaimer ------------------------------------------------------------------------ */

files["disclaimer/index.html"] = page({
  depth: 1,
  canonical: "/disclaimer/",
  title: "Disclaimer | " + FIRM,
  description: "Disclaimer governing the use of the " + FIRM + " website.",
  body:
    pageHeader("../", {
      title: "Disclaimer",
      lead: "Terms governing the use of this website.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Disclaimer" }]
    }) +
    `

  <section class="section">
    <div class="container container--narrow prose">
      <div class="disclaimer-note" data-reveal>
        <p>By accessing this website, the user acknowledges having read and accepted
        the terms set out below.</p>
      </div>

      <h2>No advertisement or solicitation</h2>
      <p>
        The rules of the Bar Council of India prohibit advocates from advertising or
        soliciting work. This website is not an advertisement and is not intended to
        solicit work. It is published for the limited purpose of providing information
        about ${FIRM} to persons who ask for it of their own accord.
      </p>

      <h2>No legal advice</h2>
      <p>
        The material on this website is general information and is not legal advice. It
        may not reflect the most current position of law and should not be relied upon
        in place of advice taken on the facts of a particular matter.
      </p>

      <h2>No advocate&ndash;client relationship</h2>
      <p>
        Accessing this website, or sending an enquiry through it, does not create an
        advocate&ndash;client relationship between the user and the firm or any of its
        advocates. Please do not send confidential information through this website.
      </p>

      <h2>Accuracy and liability</h2>
      <p>
        While care is taken in preparing the content of this website, the firm does not
        warrant that it is accurate, complete or current, and accepts no liability for
        any action taken or not taken in reliance on it.
      </p>

      <h2>External links</h2>
      <p>
        This website may link to other websites. The firm is not responsible for the
        content of any external website.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this disclaimer may be sent to
        <a data-config="email" data-config-role="email" data-pending-label="the email address to be published"><span data-config-slot>the email address to be published</span></a>.
      </p>
    </div>
  </section>`
});

/* --- Privacy policy ---------------------------------------------------------------------- */

files["privacy-policy/index.html"] = page({
  depth: 1,
  canonical: "/privacy-policy/",
  title: "Privacy Policy | " + FIRM,
  description: "How " + FIRM + " handles information submitted through the lexlawandtax.com website.",
  body:
    pageHeader("../", {
      title: "Privacy policy",
      lead: "How information submitted through this website is handled.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Privacy Policy" }]
    }) +
    `

  <section class="section">
    <div class="container container--narrow prose">
      <p class="lead">
        This policy explains what information is collected through lexlawandtax.com
        and how it is used.
      </p>

      <h2>Information collected</h2>
      <p>
        The website collects only the information a visitor chooses to submit through
        the enquiry form, such as name, telephone number, email address and a
        description of the matter.
      </p>

      <h2>Use of information</h2>
      <p>
        Information submitted is used only to respond to the enquiry. It is not sold,
        rented or shared for marketing purposes.
      </p>

      <h2>Confidentiality</h2>
      <p>
        Enquiries are treated in confidence. Sending an enquiry does not by itself
        create an advocate&ndash;client relationship, and visitors are asked not to send
        confidential documents through this website.
      </p>

      <h2>Cookies and storage</h2>
      <p>
        This website does not set cookies for tracking or advertising. A single entry is
        kept in the browser&rsquo;s local storage to record that the disclaimer
        acknowledgement has been shown, so that it is not repeated on every visit.
      </p>

      <h2>Fonts and images</h2>
      <p>
        Typefaces are served by Google Fonts and some photographs are served by Pexels.
        Requests to those services carry the visitor&rsquo;s IP address, as any request
        to a third-party host does.
      </p>

      <h2>Retention</h2>
      <p>
        Enquiry records are retained only for as long as is necessary for the purpose
        for which they were submitted, or as required by law.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy may be sent to
        <a data-config="email" data-config-role="email" data-pending-label="the email address to be published"><span data-config-slot>the email address to be published</span></a>.
      </p>
    </div>
  </section>`
});

/* --- 404 ----------------------------------------------------------------------------------- */

files["404.html"] = page({
  depth: 0,
  noindex: true,
  title: "Page not found | " + FIRM,
  description: "The requested page could not be found on lexlawandtax.com.",
  body: `  <section class="section">
    <div class="container error-page">
      <div>
        <p class="error-page__code" aria-hidden="true">404</p>
        <h1>Page not found</h1>
        <p class="lead mx-auto measure-narrow">
          The address may be out of date, or the page may have been moved.
        </p>
        <hr class="rule rule--center">
        <ul class="error-page__links">
${NAV.map(([, label, href]) => `          <li><a href="${href}">${label}</a></li>`).join("\n")}
        </ul>
      </div>
    </div>
  </section>`
});

/* --- Component preview ---------------------------------------------------------------------- */

const SWATCHES = [
  ["--color-navy", "#102A43"],
  ["--color-navy-deep", "#081C2C"],
  ["--color-teal", "#16656B"],
  ["--color-teal-dark", "#104D52"],
  ["--color-gold", "#B78B4A"],
  ["--color-gold-soft", "#D8C39A"],
  ["--color-gold-ink", "#8A6636"],
  ["--color-ivory", "#F8F7F3"],
  ["--color-warm-white", "#FCFCFA"],
  ["--color-slate", "#52606D"],
  ["--color-border", "#E4E8EB"],
  ["--color-text", "#18232D"],
  ["--color-muted", "#62717D"],
  ["--color-white", "#FFFFFF"]
];

const PREVIEW_SECTIONS = [
  ["colour", "Colour"],
  ["typography", "Typography"],
  ["buttons", "Buttons and links"],
  ["section-heading", "Section heading"],
  ["breadcrumbs", "Breadcrumbs"],
  ["cards", "Cards"],
  ["split", "Split section"],
  ["trust", "Trust strip"],
  ["accordion", "Accordion"],
  ["forms", "Forms"],
  ["notices", "Notices and disclaimer"],
  ["media", "Media and fallbacks"],
  ["motion", "Motion"]
];

function previewBlock(id, title, selector, inner, flush) {
  return `      <section class="preview-block" id="${id}">
        <div class="preview-block__label">
          <h2>${title}</h2>
          <code>${selector}</code>
        </div>
        <div class="preview-frame${flush ? " preview-frame--flush" : ""}">
${inner}
        </div>
      </section>`;
}

files["components/index.html"] = page({
  depth: 1,
  noindex: true,
  remoteImages: true,
  title: "Component preview | " + FIRM,
  description: "Internal preview of the design system and shared components.",
  body:
    pageHeader("../", {
      title: "Component preview",
      lead: "Internal reference for the design system. Not linked from the public site and excluded from search engines.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Components" }]
    }) +
    `

  <section class="section">
    <div class="container">
      <div class="preview-layout">

        <nav class="preview-nav" aria-label="Components">
          <ol>
${PREVIEW_SECTIONS.map(([id, label]) => `            <li><a href="#${id}">${label}</a></li>`).join("\n")}
          </ol>
        </nav>

        <div>

${previewBlock(
  "colour",
  "Colour",
  ":root",
  `          <ul class="swatches">
${SWATCHES.map(
  ([name, hex]) => `            <li class="swatch">
              <div class="swatch__chip" style="background:${hex}"></div>
              <span class="swatch__name">${name}</span>
              <span class="swatch__value">${hex}</span>
            </li>`
).join("\n")}
          </ul>
          <p class="text-muted" style="margin-top:1.5rem">
            <code>--color-gold</code> is 3.1:1 on white and is used only for rules,
            borders and icons. <code>--color-gold-ink</code> is the text-safe step at
            5.2:1 and is the only gold applied to wording.
          </p>`
)}

${previewBlock(
  "typography",
  "Typography",
  "h1&ndash;h4, .lead, .eyebrow",
  `          <div class="type-row"><span class="type-row__meta">Playfair Display 600 &middot; --fs-3xl &middot; h1</span><p class="type-sample type-sample--1">Established practice in Lucknow</p></div>
          <div class="type-row"><span class="type-row__meta">Playfair Display 600 &middot; --fs-2xl &middot; h2</span><p class="type-sample type-sample--2">Matters handled by the firm</p></div>
          <div class="type-row"><span class="type-row__meta">Playfair Display 600 &middot; --fs-xl &middot; h3</span><p class="type-sample type-sample--3">Cheque bounce and recovery</p></div>
          <div class="type-row"><span class="type-row__meta">Manrope 600 &middot; --fs-xs &middot; uppercase</span><p class="eyebrow" style="margin:0">Practice areas</p></div>
          <div class="type-row"><span class="type-row__meta">Manrope 400 &middot; --fs-md &middot; .lead</span><p class="lead" style="margin:0">A firm of advocates attending to legal, property, corporate and tax matters for clients across Uttar Pradesh.</p></div>
          <div class="type-row"><span class="type-row__meta">Manrope 400 &middot; --fs-base &middot; max 72ch</span><p style="margin:0">The firm advises and appears for individuals, businesses and government employees in matters before courts, tribunals and departmental authorities in Uttar Pradesh. Paragraph width is capped so that a line stays within a comfortable reading measure.</p></div>`
)}

${previewBlock(
  "buttons",
  "Buttons and links",
  ".btn, .arrow-link",
  `          <p class="cluster">
            <a class="btn btn--primary" href="#buttons">Primary button</a>
            <a class="btn btn--secondary" href="#buttons">Secondary button</a>
            <a class="btn btn--ghost" href="#buttons">${ICON.phone()}<span>Ghost</span></a>
            <button class="btn btn--primary" type="button" disabled>Disabled</button>
          </p>
          <p class="cluster" style="margin-top:1rem">
            ${arrowLink("Text link with arrow", "#buttons")}
          </p>
          <div style="margin-top:1.5rem;padding:1.5rem;background:var(--color-navy);border-radius:3px">
            <p class="cluster" style="margin:0">
              <a class="btn btn--inverse" href="#buttons">Inverse</a>
              <a class="btn btn--outline-light" href="#buttons">Outline light</a>
              ${arrowLink("Arrow link on navy", "#buttons", "arrow-link--light")}
            </p>
          </div>`
)}

${previewBlock(
  "section-heading",
  "Section heading",
  ".section-head",
  sectionHead({
    eyebrow: "Practice areas",
    title: "Matters handled by the firm",
    lead: "Twelve areas of practice across litigation, property, corporate, service, employment and tax.",
    reveal: false
  })
)}

${previewBlock(
  "breadcrumbs",
  "Breadcrumbs",
  ".breadcrumb",
  breadcrumb("../", [
    { label: "Home", href: "index.html" },
    { label: "Practice Areas", href: "practice-areas/index.html" },
    { label: "Service Law" }
  ])
)}

${previewBlock(
  "cards",
  "Cards",
  ".card--practice, .card--advocate, .card--location, .card--article",
  `          <div class="grid grid--3">
${practiceCard("../", PRACTICE_AREAS[7], 7, true)}
${advocateCard("../", ADVOCATES[0])}
${articleCard("../", {
  imageKey: "photos.legalGuides",
  category: "Guide",
  meta: "In preparation",
  title: "Procedure notes",
  text: "Short notes explaining the stages of common proceedings."
})}
          </div>
          <div class="grid grid--4" style="margin-top:1.5rem">
${locationCard("Lucknow", "Office", "The firm's office is in Lucknow.", "../locations/lucknow/index.html")}
${locationCard("Prayagraj", "Service area", "Assistance for clients in Prayagraj, conducted from the Lucknow office.", "../locations/prayagraj/index.html")}
          </div>`
)}

${previewBlock(
  "split",
  "Image and text split",
  ".split",
  splitSection("../", {
    imageKey: "photos.about",
    body: `        <p class="eyebrow">About the firm</p>
        <h2>An established practice in Lucknow</h2>
        <p>The firm advises and appears for individuals, businesses and government
        employees in matters before courts, tribunals and departmental authorities.</p>
        <p>${arrowLink("More about the firm", "../about/index.html")}</p>`
  })
)}

${previewBlock("trust", "Trust strip", ".trust-strip", trustStrip(), true)}

${previewBlock("accordion", "FAQ accordion", ".accordion", accordion("preview-faq", FAQ, true))}

${previewBlock(
  "forms",
  "Form controls",
  ".form, .field",
  `          <div class="form">
            <div class="field">
              <label for="pv-name">Name <span class="required" aria-hidden="true">*</span></label>
              <input id="pv-name" type="text" placeholder="Full name">
            </div>
            <div class="field">
              <label for="pv-subject">Subject</label>
              <select id="pv-subject">
                <option>Please select</option>
                <option>Service Law</option>
                <option>Employment Law</option>
              </select>
            </div>
            <div class="field">
              <label for="pv-msg">Message</label>
              <textarea id="pv-msg" placeholder="A short description of the matter"></textarea>
              <span class="hint">Please do not send confidential documents through this form.</span>
            </div>
            <div class="field">
              <label for="pv-disabled">Disabled control</label>
              <input id="pv-disabled" type="text" value="Not available yet" disabled>
            </div>
          </div>`
)}

${previewBlock(
  "notices",
  "Notices and disclaimer",
  ".notice, .disclaimer-note, .disclaimer-gate",
  `          <div class="notice"><p>Detailed content for this page is being prepared and will be published shortly.</p></div>
          <div class="disclaimer-note" style="margin-top:1rem">
            <p>Sending an enquiry does not create an advocate&ndash;client relationship.
            Please do not send confidential documents through this website.</p>
          </div>
          <p class="cluster" style="margin-top:1.5rem">
            <button class="btn btn--secondary" type="button" data-disclaimer-open>Open the disclaimer acknowledgement</button>
          </p>`
)}

${previewBlock(
  "media",
  "Media and fallbacks",
  ".media, .media--overlay, .advocate-photo",
  `          <div class="grid grid--3">
            <div>
              ${media({ imageKey: "photos.property", ratio: "3x2", base: "../", pad: "              " })}
              <p class="card__text" style="margin-top:.5rem">Remote photograph</p>
            </div>
            <div>
              ${media({ imageKey: "photos.corporate", ratio: "3x2", overlay: true, base: "../", pad: "              " })}
              <p class="card__text" style="margin-top:.5rem">With navy overlay, for text over an image</p>
            </div>
            <div>
              <figure class="media media--ratio-3x2 is-failed">
                <span class="media__fallback" aria-hidden="true">${ICON.image()}<span>Image unavailable</span></span>
              </figure>
              <p class="card__text" style="margin-top:.5rem">Failed remote image</p>
            </div>
            <div>
              ${media({ imageKey: "advocates.hamid-razzaq", className: "advocate-photo", base: "../", pad: "              " })}
              <p class="card__text" style="margin-top:.5rem">Advocate silhouette fallback</p>
            </div>
          </div>`
)}

${previewBlock(
  "motion",
  "Motion",
  "[data-reveal]",
  `          <p>Elements marked <code>data-reveal</code> fade in and rise
          ${"18"}px over 620ms when they enter the viewport. Children of a
          <code>data-reveal-group</code> are staggered by 90ms, capped at 360ms.</p>
          <p>The hidden state is applied only when site.js adds <code>.js-reveal</code>
          to the document element, and it does that only when IntersectionObserver
          exists <em>and</em> reduced motion is not requested. With
          <code>prefers-reduced-motion: reduce</code> nothing is ever hidden and no
          transition runs.</p>
          <div class="grid grid--3" data-reveal-group style="margin-top:1.5rem">
            <div class="card card--quiet" data-reveal><div class="card__body"><h3 class="card__title">First</h3><p class="card__text">delay 0ms</p></div></div>
            <div class="card card--quiet" data-reveal><div class="card__body"><h3 class="card__title">Second</h3><p class="card__text">delay 90ms</p></div></div>
            <div class="card card--quiet" data-reveal><div class="card__body"><h3 class="card__title">Third</h3><p class="card__text">delay 180ms</p></div></div>
          </div>`
)}

        </div>
      </div>
    </div>
  </section>`
});


/* ================================================================== */
/* LEGAL PRACTICE HUBS AND LUCKNOW SERVICE PAGES                       */
/* ================================================================== */

/* BreadcrumbList built from the same trail that renders the visible
   breadcrumb, so the two can never drift apart. */
function breadcrumbJsonLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: DOMAIN + "/" + (item.canonical || "")
    }))
  };
}

/* Service schema. `provider` is a reference to the LegalService node
   defined once on the homepage, so the organisation is not restated on
   every page in the section. */
function serviceJsonLd(service, canonical) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name.replace(/ in Lucknow$/, ""),
    description: service.description,
    url: DOMAIN + canonical,
    provider: { "@id": DOMAIN + "/#practice" },
    areaServed: [
      { "@type": "City", name: "Lucknow" },
      { "@type": "AdministrativeArea", name: "Uttar Pradesh" }
    ]
  };
}

/* Compact hero used at the top of every page in this section: one
   photograph, a navy wash so the text is legible over it, breadcrumb
   and heading. No other section on these pages carries a large image. */
function sectionHero(P, o) {
  const record = IMAGES.photos[o.imageKey];
  return `  <section class="hero hero--page">
    <div class="media hero__media media--overlay">
      <img data-image="photos.${o.imageKey}" src="${record.url}" alt="${record.alt}" width="${record.width}" height="${record.height}" decoding="async" fetchpriority="high">
      <span class="media__fallback" aria-hidden="true">${ICON.image()}<span>Image unavailable</span></span>
    </div>
    <div class="container hero__inner">
      <div class="hero__content">
${breadcrumb(P, o.trail).replace(/class="breadcrumb"/, 'class="breadcrumb breadcrumb--light"')}
        <h1>${o.h1}</h1>
        <p class="hero__lead">${o.lead}</p>
      </div>
    </div>
  </section>`;
}

/* --- Scope of assistance -------------------------------------------
   Tax and registration matters mix work an advocate does with work only
   another professional may sign. The block below states which kinds are
   involved on the page, so the division is explicit rather than implied.
   No page claims that a named person will certify, audit or appear. */

const SCOPE_KINDS = {
  advisory: [
    "Legal advisory",
    "Advice on the legal position, the options open and the consequences of each."
  ],
  drafting: [
    "Document drafting",
    "Preparation and review of the agreements, deeds and written replies the matter requires."
  ],
  returns: [
    "Return preparation",
    "Carried out with, or coordinated with, a chartered accountant. Audit and any certificate that only a chartered accountant may sign is their work."
  ],
  registration: [
    "Registration assistance",
    "Assembling the application and its supporting documents, filing it with the authority and answering queries raised on it."
  ],
  representation: [
    "Response and representation before an authority",
    "Written replies and appearance before the authority concerned, where an advocate may act as authorised representative."
  ],
  coordination: [
    "Coordination with other professionals",
    "Where a matter requires audit, or a certificate or filing that only a specified professional may sign, it is coordinated with a chartered accountant or company secretary."
  ]
};

function scopeBlock(keys, id) {
  const items = keys
    .filter((k) => SCOPE_KINDS[k])
    .map(
      (k) => `        <li>
          <span class="scope-list__marker" aria-hidden="true">${ICON.check(16)}</span>
          <span><strong>${SCOPE_KINDS[k][0]}</strong><span>${SCOPE_KINDS[k][1]}</span></span>
        </li>`
    )
    .join("\n");

  return `  <section class="section" aria-labelledby="${id}">
    <div class="container container--reading">
${sectionHead({
  eyebrow: "Scope of assistance",
  title: "What this work involves, and what it does not",
  lead: "Different parts of a matter of this kind are different kinds of work. This is how they divide.",
  id
})}
      <ul class="scope-list">
${items}
      </ul>
      <div class="notice" data-reveal>
        <p>Nothing on this page is an offer to audit accounts or to issue any
        certificate that only a chartered accountant or company secretary may
        issue. No professional designation is claimed for anyone at the firm
        beyond enrolment as an advocate, and no undertaking is given that any
        particular person will certify, audit or appear in a given matter.</p>
      </div>
    </div>
  </section>`;
}

/* Plain bulleted list with a gold marker, used for matters handled. */
function markerList(items) {
  return `      <ul class="marker-list">
${items.map((t) => `        <li>${ICON.check(15)}<span>${t}</span></li>`).join("\n")}
      </ul>`;
}

/* Risks and mistakes: same shape as the checklist but with a distinct
   marker, so the two are not confused when skimming. */
function riskList(items) {
  return `      <ul class="risk-list">
${items
  .map(
    ([label, note]) => `        <li>
          <span class="risk-list__marker" aria-hidden="true">${ICON.alert(16)}</span>
          <span><strong>${label}</strong><span>${note}</span></span>
        </li>`
  )
  .join("\n")}
      </ul>`;
}

function relatedLinks(P, items) {
  return `      <ul class="link-list">
${items.map(([label, href]) => `        <li><a href="${P}${href}">${label}</a></li>`).join("\n")}
      </ul>`;
}

function coverageBlock(id) {
  return `  <section class="section section--soft" aria-labelledby="${id}">
    <div class="container container--reading">
${sectionHead({ eyebrow: "Where the firm works", title: "Lucknow and Uttar Pradesh Coverage", id })}
      <p>${LEGAL.coverage}</p>
    </div>
  </section>`;
}

function disclaimerBlock(P) {
  return `      <div class="disclaimer-note" data-reveal>
        <p>
          This page is general information about an area of practice. It is not
          legal advice, and it is not an advertisement or a solicitation of
          work. Reading it creates no advocate&ndash;client relationship.
        </p>
        <p>
          Procedures, limitation periods, court fees, stamp duty and government
          charges change, and what applies depends on the facts of the
          particular matter. Nothing here should be acted on without advice on
          your own documents, and no outcome is promised or predicted.
        </p>
        <p>${arrowLink("Read the full disclaimer", P + "disclaimer/index.html")}</p>
      </div>`;
}

function lastReviewed() {
  const d = new Date(LEGAL.lastReviewed + "T00:00:00Z");
  const shown = d.toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC"
  });
  return `      <p class="last-reviewed">
        Last reviewed: <time datetime="${LEGAL.lastReviewed}">${shown}</time>
      </p>`;
}

/* --- Hub page --------------------------------------------------------- */

function hubPage(hub) {
  const P = "../";
  const trail = [
    { label: "Home", href: "index.html", canonical: "" },
    { label: hub.name, canonical: hub.slug + "/" }
  ];

  const serviceCards = hub.services
    .map(
      (s) => `      <article class="card svc-card" data-reveal>
        <div class="card__body">
          <h3 class="card__title"><a href="${P}${hub.slug}/${s.slug}/index.html">${s.navLabel}</a></h3>
          <p class="card__text">${s.lead}</p>
          <p class="card__foot">${arrowLink("Read more", P + hub.slug + "/" + s.slug + "/index.html")}</p>
        </div>
      </article>`
    )
    .join("\n");

  return page({
    depth: 1,
    canonical: "/" + hub.slug + "/",
    remoteImages: true,
    title: hub.title,
    description: hub.description,
    jsonLd: breadcrumbJsonLd(trail),
    body:
      sectionHero(P, { imageKey: hub.image, h1: hub.h1, lead: hub.lead, trail }) +
      `

  <section class="section" aria-labelledby="hub-about">
    <div class="container container--reading prose">
${sectionHead({ eyebrow: hub.name, title: "About this area of practice", id: "hub-about" })}
${hub.intro.map((t) => `      <p>${t}</p>`).join("\n")}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="hub-services">
    <div class="container">
${sectionHead({
  eyebrow: "Services",
  title: "Services in this area",
  lead: "Each page below deals with one service and the questions it raises.",
  id: "hub-services"
})}
      <div class="grid grid--3" data-reveal-group data-reveal-step="70">
${serviceCards}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="hub-faq">
    <div class="container">
${sectionHead({ eyebrow: "Questions", title: "Frequently asked questions", id: "hub-faq" })}
${accordion("hub-faq-" + hub.slug, hub.faqs, true)}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="hub-advocates">
    <div class="container">
${sectionHead({
  eyebrow: "The practice",
  title: "Advocates",
  lead: "Each advocate of the firm is enrolled with the Bar Council of Uttar Pradesh and holds a Certificate of Practice.",
  id: "hub-advocates"
})}
      <div class="grid grid--3" data-reveal-group>
${ADVOCATES.map((a) => advocateCard(P, a)).join("\n")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="hub-guides">
    <div class="container container--reading">
${sectionHead({ eyebrow: "Reading", title: "Related guides", id: "hub-guides" })}
${relatedLinks(P, hub.relatedGuides)}
    </div>
  </section>

${coverageBlock("hub-coverage")}

  <section class="section">
    <div class="container container--reading">
${disclaimerBlock(P)}
${lastReviewed()}
    </div>
  </section>`
  });
}

/* --- Service page ----------------------------------------------------- */

function servicePage(hub, svc) {
  const P = "../../";
  const L = Object.assign(
    {
      matters: "Typical matters handled",
      risks: "Common risks and mistakes",
      related: "Related services"
    },
    hub.labels || {}
  );
  const canonical = "/" + hub.slug + "/" + svc.slug + "/";
  const trail = [
    { label: "Home", href: "index.html", canonical: "" },
    { label: hub.name, href: hub.slug + "/index.html", canonical: hub.slug + "/" },
    { label: svc.navLabel, canonical: hub.slug + "/" + svc.slug + "/" }
  ];

  return page({
    depth: 2,
    canonical,
    remoteImages: true,
    title: svc.title,
    description: svc.description,
    jsonLd: [breadcrumbJsonLd(trail), serviceJsonLd(svc, canonical)],
    body:
      sectionHero(P, { imageKey: svc.image, h1: svc.h1, lead: svc.lead, trail }) +
      `

  <section class="section" aria-labelledby="svc-intro">
    <div class="container container--reading prose">
${sectionHead({ eyebrow: hub.name, title: "What this covers", id: "svc-intro" })}
${svc.intro.map((t) => `      <p>${t}</p>`).join("\n")}
    </div>
  </section>

${svc.scope ? scopeBlock(svc.scope, "svc-scope") + "\n" : ""}
  <section class="section section--soft" aria-labelledby="svc-who">
    <div class="container">
${sectionHead({
  eyebrow: "Who this may assist",
  title: "Who this service may assist",
  lead: "If your situation is not listed, it does not mean it cannot be dealt with. It means it should be discussed.",
  id: "svc-who"
})}
${pillars(svc.whoFor.map(([label, note]) => [ICON.check(20), label, note]), "four")}
    </div>
  </section>

  <section class="section" aria-labelledby="svc-matters">
    <div class="container container--reading">
${sectionHead({ eyebrow: "Scope", title: L.matters, id: "svc-matters" })}
${markerList(svc.matters)}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="svc-process">
    <div class="container">
${sectionHead({
  eyebrow: "Process",
  title: "How the work generally proceeds",
  lead: "The sequence varies with the facts and the forum. This is the usual shape of it.",
  id: "svc-process"
})}
${processSteps(svc.process)}
    </div>
  </section>

  <section class="section" aria-labelledby="svc-docs">
    <div class="container container--reading">
${sectionHead({
  eyebrow: "Preparation",
  title: "Documents commonly required",
  lead: "Bringing what you have makes the first discussion considerably more useful. Missing items can be obtained later.",
  id: "svc-docs"
})}
${markerList(svc.documents)}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="svc-risks">
    <div class="container container--reading">
${sectionHead({ eyebrow: "Cautions", title: L.risks, id: "svc-risks" })}
${riskList(svc.risks)}
    </div>
  </section>

  <section class="section" aria-labelledby="svc-related">
    <div class="container container--reading">
${sectionHead({ eyebrow: "See also", title: L.related, id: "svc-related" })}
${relatedLinks(P, svc.related)}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="svc-advocates">
    <div class="container">
${sectionHead({
  eyebrow: "The practice",
  title: "Advocates",
  lead: "Each advocate of the firm is enrolled with the Bar Council of Uttar Pradesh and holds a Certificate of Practice.",
  id: "svc-advocates"
})}
      <div class="grid grid--3" data-reveal-group>
${ADVOCATES.map((a) => advocateCard(P, a)).join("\n")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="svc-faq">
    <div class="container">
${sectionHead({ eyebrow: "Questions", title: "Frequently asked questions", id: "svc-faq" })}
${accordion("svc-faq-" + svc.slug, svc.faqs, true)}
    </div>
  </section>

${coverageBlock("svc-coverage")}

  <section class="section">
    <div class="container container--reading">
${disclaimerBlock(P)}
${lastReviewed()}
    </div>
  </section>`
  });
}

SECTION_HUBS.forEach((hub) => {
  files[hub.slug + "/index.html"] = hubPage(hub);
  hub.services.forEach((svc) => {
    files[hub.slug + "/" + svc.slug + "/index.html"] = servicePage(hub, svc);
  });
});

/* ================================================================== */
/* WRITE                                                               */
/* ================================================================== */

let written = 0;
Object.keys(files)
  .sort()
  .forEach((relative) => {
    const target = path.join(ROOT, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, files[relative], "utf8");
    written += 1;
    console.log("  " + relative);
  });

console.log("\n" + written + " pages written.");
