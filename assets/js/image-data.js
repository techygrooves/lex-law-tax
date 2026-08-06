/*
 * Image data
 * ----------
 * Single registry for every image used on the site.
 *
 * All `src` values are written RELATIVE TO THE SITE ROOT.
 * site.js prefixes them with the per-page base path that is declared on
 * <html data-base="..."> so the same record works at any folder depth
 * and when the site is opened directly from the file system.
 *
 * `fallback` is used automatically when the primary file is missing, so
 * pages stay presentable before the photographs are supplied.
 */

window.imageData = {
  placeholders: {
    advocate: "assets/images/advocate-placeholder.svg"
  },

  advocates: {
    "mohammad-kamran": {
      src: "assets/images/kamran-adv.jpg",
      fallback: "assets/images/advocate-placeholder.svg",
      alt: "Portrait of Advocate Mohammad Kamran",
      width: 640,
      height: 800,
      credit: "To be supplied by the firm"
    },
    "hamid-razzaq": {
      src: "assets/images/hamid-adv.jpg",
      fallback: "assets/images/advocate-placeholder.svg",
      alt: "Portrait of Advocate Hamid Razzaq",
      width: 640,
      height: 800,
      credit: "To be supplied by the firm"
    },
    "irfan-ahmad-khan": {
      src: "assets/images/irfan-adv.jpg",
      fallback: "assets/images/advocate-placeholder.svg",
      alt: "Portrait of Advocate Irfan Ahmad Khan",
      width: 640,
      height: 800,
      credit: "To be supplied by the firm"
    }
  }
};
