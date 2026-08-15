/*
 * Site configuration
 * ------------------
 * Central place for firm contact details used across the site.
 *
 * The contact details below are the firm's confirmed particulars. The
 * only value still outstanding is `formEndpoint`: while it holds a
 * {{PLACEHOLDER}}, site.js disables the enquiry form and shows the
 * "being configured" notice, and the telephone, WhatsApp and email
 * routes carry enquiries instead. Supplying a real endpoint enables the
 * form — update /privacy-policy/ to say where submissions go first.
 *
 * Anything still wrapped in double curly braces is UNRESOLVED. site.js
 * hides or disables the related links, shows a neutral "to be published"
 * label, and deletes the corresponding property from the structured data
 * rather than publishing a placeholder as though it were a value.
 */

window.siteConfig = {
  firmName: "H.R. Legal Associate",
  domain: "https://lexlawandtax.com",
  phone: "+918318772717",
  phoneDisplay: "+91 83187 72717",
  whatsapp: "+918318772717",
  email: "legal@lexlawandtax.com",
  address: "Shop No. 4, Opposite Shia P.G. College, Sitapur Road, Lucknow, Uttar Pradesh 226020, India",
  postalCode: "226020",
  googleMapsUrl: "https://maps.app.goo.gl/CAFRw6227png94257?g_st=ac",
  formEndpoint: "{{FORM_ENDPOINT}}"
};

/* ---------------------------------------------------------------------
 * Derived forms of the same address
 * ---------------------------------------------------------------------
 * The address above is the official one-line form and is the only place
 * it is written out. The site needs three renderings of it, so they are
 * derived here rather than being retyped in markup where they could
 * drift apart:
 *
 *   addressLines   the official address broken for display where there
 *                  is room for it — the contact page, the footer, the
 *                  Lucknow page. Nothing is dropped.
 *
 *   addressShort   for the header bar and the mobile menu, where a
 *                  three-line address would not fit. It is a locator,
 *                  not a substitute: the full address is a scroll away
 *                  in the footer of the same page.
 *
 *   streetAddress  the premises and street only, for the PostalAddress
 *                  in the structured data, where locality, region,
 *                  postal code and country are separate fields and
 *                  repeating them inside streetAddress would duplicate
 *                  them.
 *
 * If the address changes, change it above and check these three.
 * ------------------------------------------------------------------- */

window.siteConfig.addressLines = [
  "Shop No. 4, Opposite Shia P.G. College,",
  "Sitapur Road, Lucknow,",
  "Uttar Pradesh 226020, India"
];

window.siteConfig.addressShort = "Sitapur Road, Lucknow 226020";

window.siteConfig.streetAddress = "Shop No. 4, Opposite Shia P.G. College, Sitapur Road";

/* The same number reaches the office by telephone and on WhatsApp, so
   both are shown in the same readable form. */
window.siteConfig.whatsappDisplay = window.siteConfig.phoneDisplay;

/* The firm's Google Business Profile. Kept here with the other external
   links so no page hardcodes it, same as googleMapsUrl. */
window.siteConfig.googleProfileUrl = "https://share.google/wAlNNfsLw6whbZHPa";

/* The rating shown beside the profile link is the firm's own Google
   rating. It is displayed as plain text and is deliberately NOT marked up
   as schema.org AggregateRating: that markup is for ratings a site hosts
   itself, it requires a review count, and no count has been supplied.
   Nothing here may be turned into a review, a testimonial or a count. */
window.siteConfig.googleRating = "5.0";

/* Google Analytics 4 measurement ID. The tag itself is written into the
   head of every page by tools/build-pages.js; this is here so the ID is
   recorded in one place with the rest of the account details, and so
   site.js can tell whether measurement is meant to be on at all.

   Setting this to "" turns the whole thing off: no tag in the head, no
   events sent, and the privacy policy's analytics section stops applying.
   Anything measured here is described in /privacy-policy/. */
window.siteConfig.analyticsId = "G-WESK6RHJFG";
