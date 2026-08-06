/*
 * H.R. Legal Associate - site behaviour
 * ------------------------------------
 * Vanilla JavaScript only. No build step, no dependencies.
 *
 * Everything here is progressive enhancement: every page is fully
 * readable and navigable with JavaScript switched off. This file only
 * adds the mobile menu, fills in configuration values and resolves
 * image paths.
 *
 * Load order (see the <head> of every page):
 *   site-config.js -> image-data.js -> site.js
 */

(function () {
  "use strict";

  var config = window.siteConfig || {};
  var images = window.imageData || {};

  /* Base path for the current page, e.g. "" at the root, "../" one
     folder down, "../../" two folders down. Declared per page on
     <html data-base="...">, which keeps every link working when the
     site is opened directly from disk with file:// URLs. */
  var BASE = document.documentElement.getAttribute("data-base") || "";

  /* ---------------------------------------------------------------
     Helpers
     --------------------------------------------------------------- */

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call(
      (scope || document).querySelectorAll(selector)
    );
  }

  /* A value is "unresolved" while it is still a {{PLACEHOLDER}}. */
  function isPlaceholder(value) {
    return (
      typeof value !== "string" ||
      value === "" ||
      /^\{\{[A-Z0-9_]+\}\}$/.test(value.trim())
    );
  }

  function resolvePath(rootRelativePath) {
    if (!rootRelativePath) return "";
    if (/^([a-z]+:)?\/\//i.test(rootRelativePath)) return rootRelativePath;
    return BASE + rootRelativePath;
  }

  /* Strip spaces, brackets and dashes so a displayed number such as
     "+91 98765 43210" still produces a valid tel: / wa.me target. */
  function digitsOnly(value) {
    return String(value).replace(/[^\d+]/g, "");
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* ---------------------------------------------------------------
     Mobile menu
     --------------------------------------------------------------- */

  function initMobileMenu() {
    var toggle = $(".nav-toggle");
    var nav = $("#primary-nav");
    var header = $(".site-header");
    if (!toggle || !nav) return;

    /* The menu is only collapsible once JavaScript is available.
       Without this class the CSS leaves the navigation visible. */
    if (header) header.classList.add("has-js-menu");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
      if (header) header.classList.toggle("nav-is-open", open);
    }

    function isOpen() {
      return toggle.getAttribute("aria-expanded") === "true";
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    /* Escape closes the menu and returns focus to the button. */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* A tap outside the header closes the menu. */
    document.addEventListener("click", function (event) {
      if (!isOpen()) return;
      if (header && header.contains(event.target)) return;
      setOpen(false);
    });

    /* Keep state sane when the viewport grows past the mobile breakpoint. */
    var wide = window.matchMedia("(min-width: 48em)");
    var onChange = function (event) {
      if (event.matches) setOpen(false);
    };
    if (typeof wide.addEventListener === "function") {
      wide.addEventListener("change", onChange);
    } else if (typeof wide.addListener === "function") {
      wide.addListener(onChange);
    }

    setOpen(false);
  }

  /* ---------------------------------------------------------------
     Current page marker in the navigation
     --------------------------------------------------------------- */

  function initActiveNav() {
    var path = window.location.pathname.replace(/index\.html?$/i, "");
    var segments = path.split("/").filter(Boolean);
    var current = segments.length ? segments[segments.length - 1] : "";

    $$(".site-nav a[data-nav]").forEach(function (link) {
      var key = link.getAttribute("data-nav");
      var isHome = key === "home";
      var match = isHome ? current === "" : current === key;
      if (match) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ---------------------------------------------------------------
     Configuration values
     ---------------------------------------------------------------
     Markup declares what it wants with data-config="phone" and, where
     relevant, data-config-role="link". Unresolved placeholders are
     replaced with a neutral label and any link is made inert rather
     than left pointing at a broken target.                            */

  function applyConfigValue(element) {
    var key = element.getAttribute("data-config");
    var role = element.getAttribute("data-config-role") || "text";
    var value = config[key];
    var pending = isPlaceholder(value);

    if (pending) {
      element.classList.add("is-pending");
      element.setAttribute("data-config-state", "pending");

      var label = element.getAttribute("data-pending-label");
      if (label) element.textContent = label;

      if (element.tagName === "A") {
        element.removeAttribute("href");
        element.setAttribute("role", "link");
        element.setAttribute("aria-disabled", "true");
      }
      return;
    }

    element.classList.remove("is-pending");
    element.setAttribute("data-config-state", "ready");

    if (element.tagName === "A") {
      if (role === "tel") {
        element.setAttribute("href", "tel:" + digitsOnly(value));
      } else if (role === "email") {
        element.setAttribute("href", "mailto:" + value);
      } else if (role === "whatsapp") {
        element.setAttribute(
          "href",
          "https://wa.me/" + digitsOnly(value).replace(/^\+/, "")
        );
        element.setAttribute("rel", "noopener noreferrer");
        element.setAttribute("target", "_blank");
      } else if (role === "url") {
        element.setAttribute("href", value);
        element.setAttribute("rel", "noopener noreferrer");
        element.setAttribute("target", "_blank");
      }
    }

    /* Only write text when the element is not marked as link-only. */
    if (element.getAttribute("data-config-text") !== "keep") {
      element.textContent = value;
    }
  }

  function initConfig() {
    $$("[data-config]").forEach(applyConfigValue);

    $$("[data-firm-name]").forEach(function (element) {
      element.textContent = config.firmName || "H.R. Legal Associate";
    });

    $$("[data-year]").forEach(function (element) {
      element.textContent = String(new Date().getFullYear());
    });
  }

  /* ---------------------------------------------------------------
     Images
     ---------------------------------------------------------------
     <img data-image="advocates.mohammad-kamran"> picks up its path,
     alt text and dimensions from image-data.js, and quietly falls back
     to the placeholder graphic while the photographs are outstanding. */

  function lookupImage(reference) {
    var parts = String(reference).split(".");
    var node = images;
    for (var i = 0; i < parts.length; i += 1) {
      if (!node || typeof node !== "object") return null;
      node = node[parts[i]];
    }
    return node && node.src ? node : null;
  }

  function initImages() {
    $$("img[data-image]").forEach(function (img) {
      var record = lookupImage(img.getAttribute("data-image"));
      if (!record) return;

      var fallback = resolvePath(
        record.fallback || images.placeholders.advocate || ""
      );

      /* Markup ships with the placeholder in place, so a page without
         JavaScript still shows something. Drop the placeholder styling
         once the real photograph loads, and restore it if the file is
         not there yet. */
      img.addEventListener("load", function () {
        if (img.getAttribute("src") !== fallback) {
          img.classList.remove("is-placeholder");
        }
      });

      img.addEventListener("error", function onError() {
        img.removeEventListener("error", onError);
        if (fallback) {
          img.classList.add("is-placeholder");
          img.src = fallback;
        }
      });

      if (!img.getAttribute("alt")) img.setAttribute("alt", record.alt || "");
      if (record.width) img.setAttribute("width", record.width);
      if (record.height) img.setAttribute("height", record.height);
      img.src = resolvePath(record.src);
    });
  }

  /* ---------------------------------------------------------------
     Enquiry form
     ---------------------------------------------------------------
     The form endpoint is a placeholder until the firm supplies one, so
     the form is shown but held inactive instead of silently failing.  */

  function initForms() {
    $$("form[data-form]").forEach(function (form) {
      var notice = $("[data-form-notice]", form);
      var ready = !isPlaceholder(config.formEndpoint);

      if (ready) {
        form.setAttribute("action", config.formEndpoint);
        form.removeAttribute("data-form-state");
        if (notice) notice.hidden = true;
        return;
      }

      form.setAttribute("data-form-state", "pending");
      $$("input, textarea, select, button", form).forEach(function (field) {
        field.disabled = true;
      });
      if (notice) notice.hidden = false;

      form.addEventListener("submit", function (event) {
        event.preventDefault();
      });
    });
  }

  /* ---------------------------------------------------------------
     In-page anchors
     --------------------------------------------------------------- */

  function initSmoothAnchors() {
    if (prefersReducedMotion()) return;
    document.documentElement.classList.add("has-smooth-scroll");
  }

  /* ---------------------------------------------------------------
     Start
     --------------------------------------------------------------- */

  function init() {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    initMobileMenu();
    initActiveNav();
    initConfig();
    initImages();
    initForms();
    initSmoothAnchors();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
