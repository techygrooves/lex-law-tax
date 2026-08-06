/*
 * Central image registry
 * ----------------------
 * Every image URL used anywhere on the site is declared here and nowhere
 * else. Changing a photograph is a one-line edit in this file.
 *
 * Remote photographs are loaded from their Pexels URLs and are never
 * downloaded into the repository.
 *
 * Local paths are written relative to the site root (site root = the
 * folder holding index.html). site.js prefixes them with the per-page
 * base declared on <html data-base="..."> so one record works at any
 * folder depth and from a file:// URL.
 *
 * ---------------------------------------------------------------------
 * ALT TEXT IS PROVISIONAL
 * ---------------------------------------------------------------------
 * Only `serviceLaw` and `employmentLaw` carry alt text confirmed against
 * the photograph. Every other entry is marked `altVerified: false` and
 * carries a neutral description written from the role the image plays on
 * the page, because the Pexels source was not reachable to check what it
 * actually shows. Open each `source` URL, look at the photograph and
 * rewrite its `alt` before the site goes live. See IMAGE-CREDITS.md.
 * ---------------------------------------------------------------------
 *
 * No stock photograph is ever used for a named advocate.
 */

window.siteImages = {

  /* ---------------- Remote photographs (Pexels) ---------------- */

  photos: {
    hero: {
      url: "https://images.pexels.com/photos/8112166/pexels-photo-8112166.jpeg?auto=compress&cs=tinysrgb&w=1800",
      source: "https://www.pexels.com/photo/8112166/",
      alt: "Interior of a professional legal office",
      width: 1800,
      height: 1200,
      altVerified: false
    },
    civil: {
      url: "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/5669602/",
      alt: "Legal papers prepared for civil court proceedings",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    criminal: {
      url: "https://images.pexels.com/photos/10475035/pexels-photo-10475035.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/10475035/",
      alt: "Court building associated with criminal proceedings",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    chequeBounce: {
      url: "https://images.pexels.com/photos/6862457/pexels-photo-6862457.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/6862457/",
      alt: "Financial paperwork of the kind involved in recovery matters",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    property: {
      url: "https://images.pexels.com/photos/12955837/pexels-photo-12955837.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/12955837/",
      alt: "Residential property of the kind involved in property disputes",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    corporate: {
      url: "https://images.pexels.com/photos/12885861/pexels-photo-12885861.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/12885861/",
      alt: "Commercial office building associated with corporate matters",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    contracts: {
      url: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/3760067/",
      alt: "Written agreement being prepared at a desk",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    tax: {
      url: "https://images.pexels.com/photos/6863334/pexels-photo-6863334.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/6863334/",
      alt: "Tax paperwork and calculations on a desk",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    serviceLaw: {
      url: "https://images.pexels.com/photos/8152746/pexels-photo-8152746.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/man-signing-documents-on-desk-8152746/",
      alt: "Person signing official documents in a legal office",
      width: 1600,
      height: 1067,
      altVerified: true
    },
    employmentLaw: {
      url: "https://images.pexels.com/photos/5673489/pexels-photo-5673489.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/crop-business-partners-signing-contract-in-office-5673489/",
      alt: "Professionals reviewing and signing workplace documents",
      width: 1600,
      height: 1067,
      altVerified: true
    },
    registration: {
      url: "https://images.pexels.com/photos/10376233/pexels-photo-10376233.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/10376233/",
      alt: "Official registration documents being completed",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    about: {
      url: "https://images.pexels.com/photos/8518616/pexels-photo-8518616.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/8518616/",
      alt: "Working area of a legal practice",
      width: 1600,
      height: 1067,
      altVerified: false
    },
    lucknow: {
      url: "https://images.pexels.com/photos/34459408/pexels-photo-34459408.jpeg?auto=compress&cs=tinysrgb&w=1800",
      source: "https://www.pexels.com/photo/34459408/",
      alt: "View of Lucknow, Uttar Pradesh",
      width: 1800,
      height: 1200,
      altVerified: false
    },
    legalGuides: {
      url: "https://images.pexels.com/photos/8730994/pexels-photo-8730994.jpeg?auto=compress&cs=tinysrgb&w=1600",
      source: "https://www.pexels.com/photo/8730994/",
      alt: "Reference material of the kind used when preparing legal notes",
      width: 1600,
      height: 1067,
      altVerified: false
    }
  },

  /* ---------------- Advocate photographs (local only) ----------------
     Never stock imagery. Each file is an original photograph supplied by
     the firm with the consent of the advocate concerned. Until a file is
     added, the SVG silhouette below is shown instead. */

  advocates: {
    "mohammad-kamran": {
      src: "assets/images/kamran-adv.jpg",
      alt: "Photograph of Advocate Mohammad Kamran",
      width: 640,
      height: 800
    },
    "hamid-razzaq": {
      src: "assets/images/hamid-adv.jpg",
      alt: "Photograph of Advocate Hamid Razzaq",
      width: 640,
      height: 800
    },
    "irfan-ahmad-khan": {
      src: "assets/images/irfan-adv.jpg",
      alt: "Photograph of Advocate Irfan Ahmad Khan",
      width: 640,
      height: 800
    }
  },

  /* ---------------- Fallbacks ---------------- */

  fallbacks: {
    advocate: "assets/images/advocate-placeholder.svg"
  },

  /* Which photograph illustrates which practice area. Keeping the
     mapping here means no page hard-codes a URL. */

  practiceAreas: {
    "civil-litigation": "civil",
    "criminal-law": "criminal",
    "cheque-bounce-recovery": "chequeBounce",
    "property-law": "property",
    "property-registration": "registration",
    "corporate-law": "corporate",
    "contractual-agreements": "contracts",
    "service-law": "serviceLaw",
    "employment-law": "employmentLaw",
    "income-tax": "tax",
    "gst": "tax",
    "firm-business-registration": "registration"
  }
};
