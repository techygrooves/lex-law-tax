# Image credits

Every image used on lexlawandtax.com is listed here. All URLs are declared in
one file — [`src/data/images.js`](src/data/images.js) — and nowhere else.

Stock photographs are **never downloaded** into this repository. They are
loaded from their remote Pexels URLs at request time.

No stock photograph is used for any of the three named advocates.

## ⚠️ Alt text needs verification before launch

The network policy of the environment this site was built in blocks
`pexels.com`, so the photographs below could not be opened and checked. Every
entry marked **Unverified** carries provisional alt text written from the role
the image plays on the page, not from what the photograph actually shows.

**Before the site goes live:** open each source URL, look at the photograph,
and rewrite its `alt` in `src/data/images.js`. Then set `altVerified: true`.
Six entries carry confirmed alt text and are already correct: two were
supplied at the outset, and four were chosen by the firm after a visual
review, which described what each photograph shows.

Provisional alt text is not a cosmetic issue — a screen-reader user is told
something that may not be true.

## Remote photographs (Pexels)

Pexels images are free to use under the [Pexels
licence](https://www.pexels.com/license/): no attribution required,
modification permitted, not for resale as stock, and identifiable people may
not be shown in a way that is offensive or implies endorsement.

| Key | Used for | Source | Alt text |
| --- | --- | --- | --- |
| `hero` | Homepage hero | [pexels.com/photo/8112166](https://www.pexels.com/photo/8112166/) | Unverified |
| `civil` | Civil Litigation | [pexels.com/photo/5669602](https://www.pexels.com/photo/5669602/) | Unverified |
| `criminal` | Criminal Law | [pexels.com/photo/10475035](https://www.pexels.com/photo/10475035/) | Unverified |
| `chequeBounce` | Cheque Bounce and Recovery | [pexels.com/photo/6862457](https://www.pexels.com/photo/6862457/) | Unverified |
| `property` | Property Law | [pexels.com/photo/12955837](https://www.pexels.com/photo/12955837/) | Unverified |
| `corporate` | Corporate Law | [pexels.com/photo/12885861](https://www.pexels.com/photo/12885861/) | Unverified |
| `contracts` | Contractual Agreements | [pexels.com/photo/3760067](https://www.pexels.com/photo/3760067/) | Unverified |
| `tax` | Income Tax, GST | [pexels.com/photo/6863334](https://www.pexels.com/photo/6863334/) | Unverified |
| `serviceLaw` | Service Law | [man-signing-documents-on-desk-8152746](https://www.pexels.com/photo/man-signing-documents-on-desk-8152746/) | **Confirmed** — "Person signing official documents in a legal office" |
| `employmentLaw` | Employment Law | [crop-business-partners-signing-contract-in-office-5673489](https://www.pexels.com/photo/crop-business-partners-signing-contract-in-office-5673489/) | **Confirmed** — "Professionals reviewing and signing workplace documents" |
| `registration` | *(no longer used — kept for reference)* | [pexels.com/photo/10376233](https://www.pexels.com/photo/10376233/) | Unverified |
| `about` | About the firm | [pexels.com/photo/8518616](https://www.pexels.com/photo/8518616/) | Unverified |
| `lucknow` | Locations | [pexels.com/photo/34459408](https://www.pexels.com/photo/34459408/) | Unverified |
| `legalGuides` | Legal Guides, first homepage guide card | [pexels.com/photo/8730994](https://www.pexels.com/photo/8730994/) | Unverified |
| `propertyRegistration` | Property Registration | [pexels.com/photo/7415057](https://www.pexels.com/photo/7415057/) | **Confirmed** — "Property registration and real estate document signing" |
| `firmRegistration` | Firm and Business Registration | [crop-business-partners-signing-contract-in-office-5673489](https://www.pexels.com/photo/crop-business-partners-signing-contract-in-office-5673489/) | **Confirmed** — "Business professionals completing firm registration documents" |
| `guideChequeBounce` | Cheque-bounce guide card | [pexels.com/photo/6862457](https://www.pexels.com/photo/6862457/) | **Confirmed** — "Cheque and banking document related to cheque dishonour" |
| `guideBusiness` | Business-registration guide card | [pexels.com/photo/7821913](https://www.pexels.com/photo/7821913/) | **Confirmed** — "Business registration and startup legal document signing" |

### Photographs that appear twice on one page

No photograph appears more than twice on any single page. Five pairs do
appear twice, and two of them are worth knowing about:

| Page | Photo | Why |
| --- | --- | --- |
| `/practice-areas/` | 5673489 | `employmentLaw` and `firmRegistration` are the **same photograph** under two records. The firm supplied this URL for the firm-registration card; the picture was already serving employment law. |
| `/` | 6862457 | `chequeBounce` (practice card) and `guideChequeBounce` (guide card) are the **same photograph**. The firm supplied this URL for the guide card; it was already serving the cheque-bounce practice card. |
| `/practice-areas/` | 6863334 | `tax` illustrates both Income Tax and GST. Long-standing. |
| `/` | 12955837 | `property` appears in the property feature section and the property card. |
| `/` | 12885861 | `corporate` appears in the corporate feature section and the corporate card. |

The first two are one-line fixes in `src/data/images.js` if the firm would
rather each card had a photograph of its own: point
`practiceAreas["firm-business-registration"]` at a new record, or give the
cheque-bounce guide card its own picture.

## Advocate photographs

Original photographs supplied by the firm, with the written consent of each
advocate. **Referenced but not yet present** in the repository.

| File | Subject | Status |
| --- | --- | --- |
| `assets/images/kamran-adv.jpg` | Advocate Mohammad Kamran | Outstanding |
| `assets/images/hamid-adv.jpg` | Advocate Hamid Razzaq | Outstanding |
| `assets/images/irfan-adv.jpg` | Advocate Irfan Ahmad Khan | Outstanding |

Until each file is added, the pages ship pointing at the SVG silhouette, so
nothing appears broken and no stock photograph ever stands in for a real
person. On every visit, `site.js` attempts the JPG first and shows it the
moment the file exists — adding the three files to `assets/images/` is the
whole job, with no markup or rebuild step needed.

**Recommended specification**

- Format: JPEG, progressive, quality 80
- Aspect ratio: 4:5 portrait, 640 × 800 pixels minimum
- File size under 150 KB each
- Plain, uncluttered background; consistent framing across all three

## Site graphics

| File | Description | Source | Licence |
| --- | --- | --- | --- |
| `assets/images/advocate-placeholder.svg` | Silhouette shown in place of a missing advocate photograph. Also the site favicon. | Created for this project | Owned by the firm |

Interface icons are inline SVG generated in `tools/build-pages.js`. They are
original, drawn on a 24×24 grid, and inherit `currentColor`.

## Adding or changing an image

1. Edit `src/data/images.js` — add or change the URL, `alt`, `width`, `height`
   and `source`.
2. Add a row to this file recording the source and licence.
3. Run `node tools/build-pages.js` so the pages pick up the new URL.

Step 3 is a convenience, not a requirement: `site.js` re-reads the registry at
runtime and corrects any `src` that no longer matches, so an edit to
`src/data/images.js` alone still takes effect.
