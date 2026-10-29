# Homepage reviews

The homepage includes 20 complete reviews copied from the text supplied by the
firm on 29 October 2026. Names and wording are preserved, including spelling.
Rafi Ahmad’s English text is labelled as translated by Google. Empty entries,
owner replies, interface labels and the truncated Asfar Ahmed review are omitted.
No star ratings, review totals, absolute dates or reviewer photographs were
provided, so these are not invented. No Review/AggregateRating schema is added.

The source link is https://share.google/uQauRVQV4QKgKefoZ. Reviews are selected
static content, not a live Google feed or an automatic synchronisation service.
The environment could not independently open Google; the firm supplied the text.

To update, edit `src/data/reviews.js` and run `node tools/build-pages.js`.
Required fields: `name` and `text`. Optional fields: confirmed `rating` (1–5),
`date` and `translated`. Upload the rebuilt HTML, CSS and JavaScript together.
No API key, third-party widget or extra hosting service is required.

Cards stream left to right, pause on hover and while reading with the keyboard,
and have an explicit pause/resume button. Duplicate animation groups are inert
and hidden from assistive technology. Reduced-motion preferences remove autoplay;
without JavaScript the original review list remains manually scrollable.

Validation covers desktop/mobile, reduced motion, no JavaScript, motion direction,
pause/resume, keyboard access, correct review count and escaping supplied text.
