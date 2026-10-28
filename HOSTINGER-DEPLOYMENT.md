# Hostinger upload and final validation

Prepared 28 October 2026 for lexlawandtax.com.

## Use the tested files

The prepared `lexlawandtax-hostinger.zip` contains the tested working branch,
including practice-page, photo, contact-detail and byline fixes. At validation time
GitHub `main` did not yet contain those changes. If downloading from GitHub instead,
merge `codex/complete-practice-pages` into `main` first, then download the updated
branch. Do not upload an older archive.

The upload ZIP has `index.html` at its top level, not inside a repository folder.
It includes `assets/`, `src/data/`, all public page folders, sitemap, robots,
manifest and other runtime files. The `src/data/` JavaScript files are needed by
the browser; do not omit them. Development tools, Git metadata and Markdown audit
files are excluded. File permissions in the archive are normalised to 644.

## Hostinger upload steps

1. In Hostinger hPanel, open File Manager for **lexlawandtax.com**. Locate that
   domain’s **public_html** document root; do not use another domain’s folder.
2. Download or archive a backup of the existing site before replacing files.
   Preserve hosting configuration such as `.htaccess` and `.well-known` unless
   you deliberately need to change it.
3. Upload `lexlawandtax-hostinger.zip` into `public_html` and extract it there,
   overwriting matching website files. Do not create an extra `lex-law-tax/`
   folder. The final path must be `public_html/index.html`.
4. Confirm `public_html/assets/images/` contains the three advocate PNGs and
   `public_html/src/data/images.js` exists. Extracting only the HTML is insufficient.
5. Enable SSL and Force HTTPS in hPanel if not already active. If the domain
   already opens the Hostinger site, no DNS change is needed. Otherwise follow
   Hostinger’s domain connection instructions; preserve existing email records.
6. Purge Hostinger/CDN cache if enabled, then open the site in a private window.
   Delete the uploaded ZIP from public_html after successful extraction.
7. Check the home page, all three advocate profiles, the practice-area menu,
   Property Law and Registration, Legal Guides and Contact on desktop and phone.
   Open the article URLs below directly. If the default hosting page appears,
   check the document root and whether a default index file is overriding index.html.
8. Submit one test enquiry yourself and verify receipt in the firm’s inbox and
   Formspree account. The automated checks did not transmit any enquiries.
9. In Google Search Console, inspect the new article URLs and submit
   https://lexlawandtax.com/sitemap.xml.

## Final check results

- 119 HTML pages audited; 14,806 link references and 1,393 local asset references checked. No missing local targets, duplicate IDs, duplicate canonicals or unresolved fragment targets.
- 476 responsive Chromium page checks passed at widths 320, 375, 768 and 1440 pixels, including 812 advocate-photo instances. No horizontal page overflow, local image failures or JavaScript page errors.
- Ten renderer/attribution regression tests passed; repeated generation preserves identical HTML and sitemap output.
- First-visit disclaimer, persistent acceptance and footer reopening.
- Desktop menu keyboard opening and Escape.
- FAQ accordion opens and closes.
- All guide category filters and employment deep link.
- Back-to-top scroll control.
- Both forms: empty required fields blocked; contact consent enforced; validity verified with JavaScript on/off; JavaScript-enabled submit events intercepted locally.
- Touch-emulated mobile drawer, nested navigation, Escape and property section link.

The final ZIP was extracted separately and passed the same static link/asset audit. Ten additional desktop/mobile browser checks passed against that extracted package, including the homepage portraits and all three newly written articles. Every archived file matches the tested checkout byte for byte.

## Corrections made during this final pass

- Removed `novalidate` from the contact form so browser-required fields and the
  consent checkbox cannot be bypassed by normal submission.
- Added real anchor targets to guide-category buttons while preserving existing
  filtering behaviour and appearance.
- Made web manifest start, scope and icon paths relative so they work at the
  domain root and under a GitHub Pages project path.
- Prepared a deployment archive that excludes development files and preserves
  all browser runtime dependencies. Layout, CSS, fonts and existing images are unchanged.

## Scope and remaining live checks

Browser testing used local Chromium and Pixel 7 touch emulation; it does not
establish physical-device Safari/Firefox compatibility. External Google Fonts,
Pexels photos and Google Analytics requests were deliberately blocked during the
local checks, so their live availability and performance were not verified.
First-party production-domain asset links were routed to the local build so
hand-authored pages were checked with the actual site CSS and scripts.

The three advocate photos loaded and were checked locally. Their supplied PNGs
total approximately 6.8 MB; further image optimisation is optional and was not
performed. The existing fonts and pictures have not been edited.

Hostinger/DNS/SSL state and Formspree delivery were not changed or verified by the
agent. The package contains 110 sitemap entries; the existing seven city noindex
pages plus the 404 and internal component preview remain excluded intentionally.
The DA guide labels salary figures as examples and does not claim an independently
verified current 2026 DA percentage. This browser check is not a new legal-content review.

## Article URLs after upload

- **Cheque-Bounce Complaint and Money Recovery Suit: Choosing the Route**
  https://lexlawandtax.com/legal-guides/cheque-bounce-case-vs-money-recovery-suit/
- **Commercial Lease Agreements: What to Settle Before Signing**
  https://lexlawandtax.com/legal-guides/commercial-lease-agreement-checklist/
- **DA Hike for Central Government Employees 2026: Salary, Arrears and Pensioner Guide**
  https://lexlawandtax.com/legal-guides/da-hike-central-government-employees-2026/
- **EPFO Withdrawals: Eligibility, Online Process, Forms and Tax**
  https://lexlawandtax.com/legal-guides/epfo-withdrawal-rules-process-tax/
- **Can a Father Sell Ancestral Property Without His Children’s Consent? Supreme Court Decision Explained**
  https://lexlawandtax.com/legal-guides/father-sell-ancestral-property-without-children-consent/
- **Gift Deed Stamp Duty in Uttar Pradesh: Who Qualifies for the ₹5,000 Concession?**
  https://lexlawandtax.com/legal-guides/gift-deed-stamp-duty-uttar-pradesh-5000-concession/
- **Gift Deed and Will: Two Different Ways of Passing Property On**
  https://lexlawandtax.com/legal-guides/gift-deed-vs-will-for-property-transfer/
- **How to Make a Will in India: Legal Requirements, Registration and Common Mistakes**
  https://lexlawandtax.com/legal-guides/how-to-make-will-india/
- **Responding to a GST Notice: A General Approach**
  https://lexlawandtax.com/legal-guides/how-to-respond-to-a-gst-notice/
- **The Clauses That Matter in a Partnership Deed**
  https://lexlawandtax.com/legal-guides/important-clauses-in-a-partnership-deed/
- **Income-Tax Notices: A General Guide to Responding**
  https://lexlawandtax.com/legal-guides/income-tax-notice-general-response-guide/
- **Starting a Business: The Legal and Tax Questions to Settle First**
  https://lexlawandtax.com/legal-guides/legal-and-tax-checklist-for-starting-a-firm/
- **Memorandum of Understanding and Binding Agreement: What Actually Separates Them**
  https://lexlawandtax.com/legal-guides/mou-vs-legally-binding-agreement/
- **Property Documents to Check Before Buying in Lucknow**
  https://lexlawandtax.com/legal-guides/property-documents-to-check-before-buying-in-lucknow/
- **Property Mutation (Dakhil Kharij): What It Is and What It Is Not**
  https://lexlawandtax.com/legal-guides/property-mutation-dakhil-kharij-overview/
- **Sale Deed and Agreement to Sell: What the Difference Means**
  https://lexlawandtax.com/legal-guides/sale-deed-vs-agreement-to-sell-uttar-pradesh/
- **What to Do After a Cheque Is Dishonoured**
  https://lexlawandtax.com/legal-guides/steps-after-a-cheque-is-dishonoured/
- **Supreme Court on Mutation: Ownership and Dakhil Kharij Explained**
  https://lexlawandtax.com/legal-guides/supreme-court-mutation-does-not-confer-title/
- **Ancestral Property Dispute Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/ancestral-property-dispute-lawyer-lucknow/
- **Buying Property Through a Power of Attorney: Legal Risks and Essential Checks**
  https://lexlawandtax.com/property-law-and-registration/buying-property-through-power-of-attorney/
- **Family Settlement Deed Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/family-settlement-deed-lawyer-lucknow/
- **Gift Deed Cancellation Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/gift-deed-cancellation-lawyer-lucknow/
- **Muslim Property Inheritance Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/muslim-property-inheritance-lawyer-lucknow/
- **Probate Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/probate-lawyer-lucknow/
- **Property Partition Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/property-partition-lawyer-lucknow/
- **Relinquishment Deed Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/relinquishment-deed-lawyer-lucknow/
- **Succession Certificate Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/succession-certificate-lawyer-lucknow/
- **Will Dispute Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/will-dispute-lawyer-lucknow/
- **Will Drafting and Registration Lawyer in Lucknow**
  https://lexlawandtax.com/property-law-and-registration/will-drafting-registration-lawyer-lucknow/
