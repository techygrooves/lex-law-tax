# Image credits

All images used on lexlawandtax.com are listed here. Every image must have a
clear source and a usage right before it goes live. No third-party stock,
scraped or AI-generated likeness images are used on this site.

## Advocate photographs

These three files are **referenced but not yet present** in the repository.
They must be supplied by the firm as original photographs of the advocates
concerned, with the written consent of each advocate.

| File | Subject | Status | Source | Licence |
| --- | --- | --- | --- | --- |
| `assets/images/kamran-adv.jpg` | Advocate Mohammad Kamran | Outstanding | To be supplied by the firm | Firm-owned, consent of subject required |
| `assets/images/hamid-adv.jpg` | Advocate Hamid Razzaq | Outstanding | To be supplied by the firm | Firm-owned, consent of subject required |
| `assets/images/irfan-adv.jpg` | Advocate Irfan Ahmad Khan | Outstanding | To be supplied by the firm | Firm-owned, consent of subject required |

Until each file is added, `assets/js/site.js` falls back automatically to
`assets/images/advocate-placeholder.svg`, so no page shows a broken image.

**Recommended specification**

- Format: JPEG, progressive, quality 80
- Aspect ratio: 4:5 (portrait)
- Dimensions: 640 x 800 pixels minimum
- File size: under 150 KB each
- Plain, uncluttered background; consistent framing across all three

## Site graphics

| File | Description | Source | Licence |
| --- | --- | --- | --- |
| `assets/images/advocate-placeholder.svg` | Neutral silhouette shown while an advocate photograph is outstanding. Also used as the site favicon. | Created for this project | Owned by the firm |

## Adding a new image

1. Place the file in `assets/images/`.
2. Add a record to `assets/js/image-data.js` with `src`, `alt`, `width`,
   `height` and `credit`. Paths there are written relative to the site root.
3. Add a row to this file recording the source and the licence.
4. Reference it in markup with `<img data-image="...">` so the fallback
   behaviour applies.
