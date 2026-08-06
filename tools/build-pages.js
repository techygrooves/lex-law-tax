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

/* ------------------------------------------------------------------ */
/* Image registry — loaded from the one file that holds the URLs        */
/* ------------------------------------------------------------------ */

function loadImages() {
  const file = path.join(ROOT, "src", "data", "images.js");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  if (!sandbox.window.siteImages) {
    throw new Error("src/data/images.js did not define window.siteImages");
  }
  return sandbox.window.siteImages;
}

const IMAGES = loadImages();

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

const ADVOCATES = [
  { slug: "mohammad-kamran", name: "Advocate Mohammad Kamran", short: "Mohammad Kamran", experience: "10+ Years of Legal Experience" },
  { slug: "hamid-razzaq", name: "Advocate Hamid Razzaq", short: "Hamid Razzaq", experience: "15+ Years of Legal Experience" },
  { slug: "irfan-ahmad-khan", name: "Advocate Irfan Ahmad Khan", short: "Irfan Ahmad Khan", experience: "20+ Years of Legal Experience" }
];

const CREDENTIALS = [
  "Enrolled with the Bar Council of Uttar Pradesh",
  "Certificate of Practice holder"
];

const UP_LOCATIONS = [
  ["Lucknow", "Office"],
  ["Kanpur", "Uttar Pradesh"],
  ["Prayagraj", "Uttar Pradesh"],
  ["Varanasi", "Uttar Pradesh"],
  ["Gorakhpur", "Uttar Pradesh"],
  ["Ayodhya", "Uttar Pradesh"],
  ["Barabanki", "Uttar Pradesh"],
  ["Raebareli", "Uttar Pradesh"]
];

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
  image: (s) => ico('<rect x="3" y="4.5" width="18" height="15" rx="1.5"/><circle cx="8.5" cy="10" r="1.5"/><path d="m3.5 17 5-4.5 4 3.5 3-2.5 5 4"/>', s || 22)
};

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

  return `    <div class="${cls.join(" ")}"${o.reveal === false ? "" : " data-reveal"}>
${eyebrow}      <${level} class="section-head__title">${o.title}</${level}>
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
  /* Advocate photographs are local paths; the silhouette stands in until
     the firm supplies the file, so the markup ships pointing at it. */
  const src = isAdvocate
    ? o.base + IMAGES.fallbacks.advocate
    : record.url;

  const loading = o.priority ? "" : ' loading="lazy"';
  const priority = o.priority ? ' fetchpriority="high"' : "";
  const placeholderClass = isAdvocate ? ' class="is-placeholder"' : "";

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

/* --- 15. Location card ------------------------------------------------ */

function locationCard(name, meta, note) {
  return `      <article class="card card--location" data-reveal>
        <div class="card__body">
          <p class="card__meta">${meta}</p>
          <h3 class="card__title">${name}</h3>
          <p class="card__text">${note}</p>
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

/* --- 21. Footer ------------------------------------------------------------ */

function footer(P) {
  const areas = PRACTICE_AREAS.slice(0, 6)
    .map(([slug, name]) => `            <li><a href="${P}practice-areas/${slug}/index.html">${name}</a></li>`)
    .join("\n");

  const site = NAV.slice(1)
    .map(([, label, href]) => `            <li><a href="${P}${href}">${label}</a></li>`)
    .join("\n");

  return `<footer class="site-footer">
  <div class="container">

    <div class="footer-top">
      <div class="footer-brand">
        <p class="footer-brand__name" data-firm-name>${FIRM}</p>
        <p class="footer-brand__descriptor">${DESCRIPTOR}</p>
        <p>Advocates based in Lucknow, attending to legal and tax matters across Uttar Pradesh.</p>
      </div>

      <div>
        <h2 class="footer-heading">Site</h2>
        <ul class="footer-list">
${site}
        </ul>
      </div>

      <div>
        <h2 class="footer-heading">Practice areas</h2>
        <ul class="footer-list">
${areas}
            <li><a href="${P}practice-areas/index.html">All practice areas</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h2 class="footer-heading">Office</h2>
        <address>
          <p class="is-pending" data-config="address" data-pending-label="Office address to be published"></p>
          <p><a data-config="phone" data-config-role="tel" data-pending-label="Telephone to be published"><span data-config-slot>Telephone to be published</span></a></p>
          <p><a data-config="email" data-config-role="email" data-pending-label="Email to be published"><span data-config-slot>Email to be published</span></a></p>
          <p><a data-config="googleMapsUrl" data-config-role="url" data-config-text="keep" data-pending-label="Map link to be published">View on Google Maps</a></p>
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
  return `<div class="disclaimer-gate" data-disclaimer-gate="${auto ? "auto" : "manual"}" role="dialog" aria-modal="true" aria-labelledby="disclaimer-gate-title" hidden>
  <div class="disclaimer-gate__dialog">
    <p class="eyebrow">Please note</p>
    <h2 class="disclaimer-gate__title" id="disclaimer-gate-title">Disclaimer</h2>
    <p>
      The rules of the Bar Council of India prohibit advocates from advertising or
      soliciting work. By continuing, you acknowledge that you are seeking information
      about ${FIRM} of your own accord and that no part of this website is an
      advertisement or a solicitation.
    </p>
    <p>
      Nothing on this website is legal advice, and using it does not create an
      advocate&ndash;client relationship.
    </p>
    <div class="disclaimer-gate__actions">
      <button class="btn btn--primary" type="button" data-disclaimer-accept>I acknowledge</button>
      <a class="btn btn--secondary" href="${P}disclaimer/index.html">Read the full disclaimer</a>
    </div>
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
  const robots = o.noindex ? '  <meta name="robots" content="noindex, follow">\n' : "";
  const canonical = o.canonical ? `  <link rel="canonical" href="${DOMAIN}${o.canonical}">\n` : "";
  /* Only pages that show a remote photograph benefit from the extra
     connection, so the hint is not paid for everywhere. */
  const imgPreconnect = o.remoteImages
    ? '  <link rel="preconnect" href="https://images.pexels.com" crossorigin>\n'
    : "";

  return `<!DOCTYPE html>
<html lang="en" class="no-js" data-base="${P}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${o.title}</title>
  <meta name="description" content="${o.description}">
${robots}${canonical}  <meta name="theme-color" content="#102a43">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${FIRM}">
  <meta property="og:title" content="${o.title}">
  <meta property="og:description" content="${o.description}">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${imgPreconnect}  <link rel="stylesheet" href="${attr(FONT_CSS)}">

  <link rel="icon" href="${P}assets/images/advocate-placeholder.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${P}assets/css/style.css">

  <script src="${P}src/data/images.js" defer></script>
  <script src="${P}assets/js/site-config.js" defer></script>
  <script src="${P}assets/js/image-data.js" defer></script>
  <script src="${P}assets/js/site.js" defer></script>
</head>
<body>

${skipLink()}

${topbar()}

${header(P)}

${mobileNav(P)}

<main id="main">
${o.body}
</main>

${ctaBand(P, o.cta)}

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

files["index.html"] = page({
  depth: 0,
  canonical: "/",
  remoteImages: true,
  title: FIRM + " | Advocates in Lucknow, Uttar Pradesh",
  description:
    "H.R. Legal Associate is a firm of advocates based in Lucknow, attending to legal, property, corporate and tax matters across Uttar Pradesh.",
  body: `  <section class="hero">
    <div class="media hero__media media--overlay">
      <img data-image="photos.hero" src="${IMAGES.photos.hero.url}" alt="${IMAGES.photos.hero.alt}" width="${IMAGES.photos.hero.width}" height="${IMAGES.photos.hero.height}" decoding="async" fetchpriority="high">
      <span class="media__fallback" aria-hidden="true">${ICON.image()}<span>Image unavailable</span></span>
    </div>
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="eyebrow eyebrow--light">Lucknow, Uttar Pradesh</p>
        <h1>${FIRM}</h1>
        <p class="hero__lead">
          A firm of advocates attending to legal, property, corporate and tax
          matters for clients across Uttar Pradesh.
        </p>
        <div class="hero__actions">
          <a class="btn btn--inverse" href="practice-areas/index.html">Practice areas</a>
          <a class="btn btn--outline-light" href="contact/index.html">Contact the office</a>
        </div>
        <ul class="hero__meta">
          <li>${ICON.pin(15)}<span>Office in Lucknow</span></li>
          <li>${ICON.seal(15)}<span>Bar Council of Uttar Pradesh</span></li>
          <li>${ICON.scale(15)}<span>Twelve practice areas</span></li>
        </ul>
      </div>
    </div>
  </section>

${trustStrip()}

  <section class="section">
    <div class="container">
${sectionHead({
  eyebrow: "Practice areas",
  title: "Matters handled by the firm",
  lead: "Twelve areas of practice across litigation, property, corporate, service, employment and tax."
})}
      <div class="grid grid--3" data-reveal-group data-reveal-step="70">
${PRACTICE_AREAS.map((area, i) => practiceCard("", area, i, false)).join("\n")}
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
${splitSection("", {
  imageKey: "photos.about",
  body: `        <p class="eyebrow">About the firm</p>
        <h2>An established practice in Lucknow</h2>
        <p>
          The firm advises and appears for individuals, businesses and government
          employees in matters before courts, tribunals and departmental authorities
          in Uttar Pradesh.
        </p>
        <hr class="rule">
        <p class="text-muted">Full content for this section is being prepared.</p>
        <p>${arrowLink("More about the firm", "about/index.html")}</p>`
})}
    </div>
  </section>

  <section class="section">
    <div class="container">
${sectionHead({
  eyebrow: "Advocates",
  title: "The advocates of the firm",
  lead: "Each advocate is enrolled with the Bar Council of Uttar Pradesh and holds a Certificate of Practice."
})}
      <div class="grid grid--3" data-reveal-group>
${ADVOCATES.map((a) => advocateCard("", a)).join("\n")}
      </div>
    </div>
  </section>`
});

/* --- About ------------------------------------------------------------- */

files["about/index.html"] = page({
  depth: 1,
  canonical: "/about/",
  remoteImages: true,
  title: "About the firm | " + FIRM,
  description: "About " + FIRM + ", a firm of advocates based in Lucknow, Uttar Pradesh.",
  body:
    pageHeader("../", {
      title: "About the firm",
      lead: "Advocates based in Lucknow, attending to matters across Uttar Pradesh.",
      trail: [{ label: "Home", href: "index.html" }, { label: "About" }]
    }) +
    `

  <section class="section">
    <div class="container">
${splitSection("../", {
  imageKey: "photos.about",
  body: `        <p class="eyebrow">The practice</p>
        <h2>Legal, property, corporate and tax matters</h2>
        <p class="lead">
          ${FIRM} is a firm of advocates based in Lucknow. The firm attends to legal
          and tax matters across Uttar Pradesh.
        </p>
        <p>
          The firm&rsquo;s work covers civil and criminal litigation, property and
          corporate matters, service and employment matters, and direct and indirect
          tax matters.
        </p>
        <p>${arrowLink("View all practice areas", "../practice-areas/index.html")}</p>`
})}
    </div>
  </section>

${trustStrip()}

  <section class="section section--soft">
    <div class="container prose">
${sectionHead({ eyebrow: "The advocates", title: "Enrolment and practice" })}
      <p>
        The advocates associated with the firm are enrolled with the Bar Council of
        Uttar Pradesh and hold a Certificate of Practice.
      </p>
      <p>${arrowLink("View advocate profiles", "../advocates/index.html")}</p>
${PREP_NOTE}
    </div>
  </section>`
});

/* --- Advocates index ------------------------------------------------------ */

files["advocates/index.html"] = page({
  depth: 1,
  canonical: "/advocates/",
  title: "Advocates | " + FIRM,
  description: "Profiles of the advocates associated with " + FIRM + ", Lucknow, Uttar Pradesh.",
  body:
    pageHeader("../", {
      title: "Advocates",
      lead: "Advocates associated with the firm.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Advocates" }]
    }) +
    `

  <section class="section">
    <div class="container">
      <div class="grid grid--3" data-reveal-group>
${ADVOCATES.map((a) => advocateCard("../", a)).join("\n")}
      </div>
    </div>
  </section>`
});

/* --- Advocate profiles ------------------------------------------------------ */

ADVOCATES.forEach((a) => {
  files["advocates/" + a.slug + "/index.html"] = page({
    depth: 2,
    canonical: "/advocates/" + a.slug + "/",
    title: a.name + " | " + FIRM,
    description:
      a.name + ", " + a.experience.toLowerCase() + ", enrolled with the Bar Council of Uttar Pradesh.",
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

  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split__media" data-reveal>
          ${media({ imageKey: "advocates." + a.slug, className: "advocate-photo media--framed", base: "../../", pad: "          " })}
        </div>
        <div class="split__content prose" data-reveal>
          <p class="eyebrow">Profile</p>
          <h2>${a.name}</h2>
          <ul class="credentials credentials--lead">
            <li>${a.experience}</li>
            <li>${CREDENTIALS[0]}</li>
            <li>${CREDENTIALS[1]}</li>
          </ul>
          <hr class="rule">
${PREP_NOTE}
          <p class="cluster">
            ${btnSecondary("All advocates", "../index.html")}
            ${btnPrimary("Contact the office", "../../contact/index.html")}
          </p>
        </div>
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
${scope}
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

/* --- Locations -------------------------------------------------------------------- */

files["locations/index.html"] = page({
  depth: 1,
  canonical: "/locations/",
  remoteImages: true,
  title: "Locations | " + FIRM,
  description: FIRM + " is based in Lucknow and attends to matters across Uttar Pradesh.",
  body:
    pageHeader("../", {
      title: "Locations",
      lead: "Based in Lucknow, attending to matters across Uttar Pradesh.",
      trail: [{ label: "Home", href: "index.html" }, { label: "Locations" }]
    }) +
    `

  <section class="section">
    <div class="container">
${splitSection("../", {
  imageKey: "photos.lucknow",
  body: `        <p class="eyebrow">The office</p>
        <h2>Lucknow, Uttar Pradesh</h2>
        <address class="stack">
          <p class="is-pending" data-config="address" data-pending-label="Office address to be published"></p>
          <p><a data-config="phone" data-config-role="tel" data-pending-label="Telephone to be published"><span data-config-slot>Telephone to be published</span></a></p>
          <p><a data-config="googleMapsUrl" data-config-role="url" data-config-text="keep" data-pending-label="Map link to be published">View on Google Maps</a></p>
        </address>`
})}
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
${sectionHead({
  eyebrow: "Areas covered",
  title: "Matters attended to across Uttar Pradesh",
  lead: "Individual location pages are being prepared."
})}
      <div class="grid grid--4" data-reveal-group data-reveal-step="60">
${UP_LOCATIONS.map(([name, meta]) =>
  locationCard(name, meta, meta === "Office" ? "The firm's office is in Lucknow." : "Matters attended to in this district.")
).join("\n")}
      </div>
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
${locationCard("Lucknow", "Office", "The firm's office is in Lucknow.")}
${locationCard("Prayagraj", "Uttar Pradesh", "Matters attended to in this district.")}
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
