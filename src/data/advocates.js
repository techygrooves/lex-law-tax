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
 * credential statements. No further qualifications, enrolment numbers or
 * languages are requested or awaited for publication.
 *
 * `details` holds optional, firm-supplied particulars, shown on the
 * advocate's own profile only. Labels come from `detailLabels`. An empty
 * object means nothing further has been supplied, not that it is missing.
 * The only one in use is `courts`, for an advocate whose court of practice
 * the firm has stated.
 *
 * After editing this file run:  node tools/build-pages.js
 * ---------------------------------------------------------------------
 */

window.advocateData = {
  order: ["mohammad-kamran", "hamid-razzaq", "mohd-mateen", "pradyumn-jaiswal", "harshit-tiwari"],

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
    },

    "pradyumn-jaiswal": {
      name: "Advocate Pradyumn Jaiswal",
      short: "Pradyumn Jaiswal",
      experience: "10+ Years of Legal Experience",
      years: 10,

      details: { courts: "High Court" }
    },

    "harshit-tiwari": {
      name: "Advocate Harshit Tiwari",
      short: "Harshit Tiwari",
      experience: "5+ Years of Legal Experience",
      years: 5,

      details: {}
    }
  },

  /* Labels for the optional particulars in `details`. */
  detailLabels: { courts: "Court of practice" }
};
