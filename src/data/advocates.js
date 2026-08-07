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
 * Everything in `details` is still {{TO_BE_PROVIDED}}. The page builder
 * OMITS any such row from the rendered HTML entirely — the placeholder
 * text is never shown to a visitor, and no row appears with a blank or
 * "coming soon" value beside it. Supply a real value here and the row
 * appears on the next build; leave it and nothing is claimed.
 *
 * Do not fill these in from assumption. An enrolment number, a court
 * list or a qualification published in error is a professional-conduct
 * problem, not a content gap.
 *
 * After editing this file run:  node tools/build-pages.js
 * ---------------------------------------------------------------------
 */

window.advocateData = {
  order: ["mohammad-kamran", "hamid-razzaq", "irfan-ahmad-khan"],

  advocates: {
    "mohammad-kamran": {
      name: "Advocate Mohammad Kamran",
      short: "Mohammad Kamran",
      experience: "10+ Years of Legal Experience",
      years: 10,

      /* Withheld until supplied. Never rendered while {{TO_BE_PROVIDED}}. */
      details: {
        enrolmentNumber: "{{TO_BE_PROVIDED}}",
        copNumber: "{{TO_BE_PROVIDED}}",
        education: "{{TO_BE_PROVIDED}}",
        languages: "{{TO_BE_PROVIDED}}",
        courtsAndForums: "{{TO_BE_PROVIDED}}"
      }
    },

    "hamid-razzaq": {
      name: "Advocate Hamid Razzaq",
      short: "Hamid Razzaq",
      experience: "15+ Years of Legal Experience",
      years: 15,

      details: {
        enrolmentNumber: "{{TO_BE_PROVIDED}}",
        copNumber: "{{TO_BE_PROVIDED}}",
        education: "{{TO_BE_PROVIDED}}",
        languages: "{{TO_BE_PROVIDED}}",
        courtsAndForums: "{{TO_BE_PROVIDED}}"
      }
    },

    "irfan-ahmad-khan": {
      name: "Advocate Irfan Ahmad Khan",
      short: "Irfan Ahmad Khan",
      experience: "20+ Years of Legal Experience",
      years: 20,

      details: {
        enrolmentNumber: "{{TO_BE_PROVIDED}}",
        copNumber: "{{TO_BE_PROVIDED}}",
        education: "{{TO_BE_PROVIDED}}",
        languages: "{{TO_BE_PROVIDED}}",
        courtsAndForums: "{{TO_BE_PROVIDED}}"
      }
    }
  },

  /* Labels used for a detail row once its value is supplied. */
  detailLabels: {
    enrolmentNumber: "Bar Council enrolment number",
    copNumber: "Certificate of Practice number",
    education: "Education",
    languages: "Languages",
    courtsAndForums: "Courts and forums"
  }
};
