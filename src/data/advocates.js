/*
 * Advocate registry
 * -----------------
 * The single place the advocates' details are written.
 *
 * ---------------------------------------------------------------------
 * PUBLISHED vs WITHHELD
 * ---------------------------------------------------------------------
 * Only the four fields below are published, because only they have been
 * supplied and verified:
 *
 *   name, short, experience, and the two credential lines that every
 *   advocate of the firm shares (see CREDENTIALS in tools/build-pages.js)
 *
 * The firm has chosen to publish only the existing name, experience and
 * credential statements. No further qualifications, enrolment numbers,
 * languages or court lists are requested or awaited for publication.
 * Optional detail collections are intentionally empty, not incomplete.
 *
 * After editing this file run:  node tools/build-pages.js
 * ---------------------------------------------------------------------
 */

window.advocateData = {
  order: ["mohammad-kamran", "hamid-razzaq", "mohd-mateen"],

  advocates: {
    "mohammad-kamran": {
      name: "Advocate Mohammad Kamran",
      short: "Mohammad Kamran",
      experience: "10+ Years of Legal Experience",
      years: 10,
      details: {}
    },

    "hamid-razzaq": {
      name: "Advocate Hamid Razzaq",
      short: "Hamid Razzaq",
      experience: "15+ Years of Legal Experience",
      years: 15,

      details: {}
    },

    "mohd-mateen": {
      name: "Advocate Mohd. Mateen",
      short: "Mohd. Mateen",
      experience: "20+ Years of Legal Experience",
      years: 20,

      details: {}
    }
  },

  /* No additional personal particulars are published. */
  detailLabels: {}
};
