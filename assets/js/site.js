/*
 * H.R. Legal Associate — site behaviour
 * -------------------------------------
 * Vanilla JavaScript. No build step, no dependencies.
 *
 * Everything here is progressive enhancement. Every page is readable,
 * navigable and complete with JavaScript switched off; this file adds
 * the menus, the reveal animations and the configuration values.
 *
 * Load order (see the <head> of every page):
 *   src/data/images.js -> site-config.js -> image-data.js -> site.js
 */

(function () {
  "use strict";

  var config = window.siteConfig || {};
  var images = window.imageData || {};

  /* Base path for the current page — "" at the root, "../" one folder
     down, and so on. Declared per page on <html data-base="...">, which
     is what keeps every reference working from a file:// URL. */
  var BASE = document.documentElement.getAttribute("data-base") || "";

  var FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]),' +
    ' textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /* ---------------------------------------------------------------
     Helpers
     --------------------------------------------------------------- */

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* A configuration value is unresolved while it is still {{LIKE_THIS}}. */
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

  function digitsOnly(value) {
    return String(value).replace(/[^\d+]/g, "");
  }

  /* Keeps Tab inside an open drawer or dialog. */
  function trapFocus(container, event) {
    var items = $$(FOCUSABLE, container).filter(function (el) {
      return el.offsetParent !== null || el === document.activeElement;
    });
    if (!items.length) return;

    var first = items[0];
    var last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  var scrollLocks = 0;

  function lockScroll(locked) {
    scrollLocks = Math.max(0, scrollLocks + (locked ? 1 : -1));
    document.body.classList.toggle("is-locked", scrollLocks > 0);
  }

  /* ---------------------------------------------------------------
     Configuration values
     ---------------------------------------------------------------
     Markup asks for a value with data-config="phone" and, where it is a
     link, data-config-role. While a value is a placeholder the element
     shows a neutral label and any link is left inert rather than
     pointing at a broken target.                                      */

  /* Write text without destroying markup. An element such as the Call
     button holds an icon and a label, so assigning textContent to it
     would wipe both out; those elements either name a [data-config-slot]
     child to receive the text, or get the value as a title instead. */
  function writeConfigText(element, text) {
    var slot = $("[data-config-slot]", element);
    if (slot) {
      slot.textContent = text;
      return true;
    }
    if (element.children.length === 0) {
      element.textContent = text;
      return true;
    }
    element.setAttribute("title", text);
    return false;
  }

  function applyConfigValue(element) {
    var key = element.getAttribute("data-config");
    var role = element.getAttribute("data-config-role") || "text";
    var value = config[key];

    if (isPlaceholder(value)) {
      element.classList.add("is-pending");
      element.setAttribute("data-config-state", "pending");

      var label = element.getAttribute("data-pending-label");
      if (label) writeConfigText(element, label);

      if (element.tagName === "A") {
        element.removeAttribute("href");
        element.setAttribute("role", "link");
        element.setAttribute("aria-disabled", "true");
      }
      return;
    }

    element.classList.remove("is-pending");
    element.removeAttribute("aria-disabled");
    element.setAttribute("data-config-state", "ready");

    if (element.tagName === "A") {
      if (role === "tel") {
        element.setAttribute("href", "tel:" + digitsOnly(value));
      } else if (role === "email") {
        element.setAttribute("href", "mailto:" + value);
      } else if (role === "whatsapp") {
        element.setAttribute("href", "https://wa.me/" + digitsOnly(value).replace(/^\+/, ""));
        element.setAttribute("rel", "noopener noreferrer");
        element.setAttribute("target", "_blank");
      } else if (role === "url") {
        element.setAttribute("href", value);
        element.setAttribute("rel", "noopener noreferrer");
        element.setAttribute("target", "_blank");
      }
    }

    if (element.getAttribute("data-config-text") !== "keep") {
      writeConfigText(element, value);
    } else {
      element.removeAttribute("title");
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
     Markup already carries a real src, so images load without waiting
     for JavaScript and the hero still counts for LCP. This pass only
     (a) re-syncs the src if src/data/images.js has been edited without
     the pages being regenerated, and (b) handles failures: advocate
     photographs fall back to the silhouette, remote photographs leave a
     neutral block rather than a broken-image icon.                    */

  function lookupImage(reference) {
    var parts = String(reference).split(".");
    var node = images;
    for (var i = 0; i < parts.length; i += 1) {
      if (!node || typeof node !== "object") return null;
      node = node[parts[i]];
    }
    return node && node.src ? node : null;
  }

  function handleImageFailure(img, record) {
    var fallback = record.fallback ? resolvePath(record.fallback) : null;

    if (fallback && img.getAttribute("src") !== fallback) {
      img.classList.add("is-placeholder");
      img.src = fallback;
      return;
    }

    /* No fallback artwork: let the neutral wrapper stand in. */
    var media = img.closest(".media");
    if (media) media.classList.add("is-failed");
  }

  function initImages() {
    $$("img[data-image]").forEach(function (img) {
      var record = lookupImage(img.getAttribute("data-image"));
      if (!record) return;

      var wanted = resolvePath(record.src);

      img.addEventListener("error", function onError() {
        img.removeEventListener("error", onError);
        handleImageFailure(img, record);
      });

      img.addEventListener("load", function () {
        var media = img.closest(".media");
        if (media) media.classList.remove("is-failed");
        if (record.fallback && img.getAttribute("src") !== resolvePath(record.fallback)) {
          img.classList.remove("is-placeholder");
        }
      });

      if (!img.getAttribute("alt")) img.setAttribute("alt", record.alt || "");
      if (record.width && !img.getAttribute("width")) img.setAttribute("width", record.width);
      if (record.height && !img.getAttribute("height")) img.setAttribute("height", record.height);

      /* Attempt the record's real image whenever the markup points
         elsewhere. Advocate pages ship the silhouette as their src, so
         this line is what makes the photograph appear the moment the
         firm supplies the file — and while the file is absent, the
         error handler above falls straight back to the silhouette. */
      if (img.getAttribute("src") !== wanted) {
        img.src = wanted;
      }

      /* An image that already failed before this script ran. */
      if (img.complete && img.naturalWidth === 0) {
        handleImageFailure(img, record);
      }
    });
  }

  /* ---------------------------------------------------------------
     Header — compact after scrolling
     --------------------------------------------------------------- */

  function initHeader() {
    var header = $("[data-header]");
    if (!header) return;

    var threshold = 24;
    var ticking = false;

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > threshold);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();
  }

  /* ---------------------------------------------------------------
     Current page marker
     --------------------------------------------------------------- */

  function initActiveNav() {
    var path = window.location.pathname.replace(/index\.html?$/i, "");
    var segments = path.split("/").filter(Boolean);
    var current = segments.length ? segments[segments.length - 1] : "";

    $$("[data-nav]").forEach(function (link) {
      var key = link.getAttribute("data-nav");
      var match = key === "home" ? current === "" : current === key;
      if (match) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ---------------------------------------------------------------
     Desktop dropdown and mega menu
     --------------------------------------------------------------- */

  function initMenus() {
    var triggers = $$("[data-menu-trigger]");
    if (!triggers.length) return;

    var openTimer = null;

    function panelFor(trigger) {
      return document.getElementById(trigger.getAttribute("aria-controls"));
    }

    function setOpen(trigger, open) {
      var panel = panelFor(trigger);
      if (!panel) return;
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    }

    function closeAll(except) {
      triggers.forEach(function (trigger) {
        if (trigger !== except) setOpen(trigger, false);
      });
    }

    triggers.forEach(function (trigger) {
      var item = trigger.closest(".nav__item");
      var panel = panelFor(trigger);
      if (!panel) return;

      /* Hovering already opened the panel, so the click that follows
         must not read as "toggle" and shut it again. */
      var openedByHover = false;

      setOpen(trigger, false);

      trigger.addEventListener("click", function () {
        if (openedByHover) {
          openedByHover = false;
          return;
        }
        var open = trigger.getAttribute("aria-expanded") === "true";
        closeAll(trigger);
        setOpen(trigger, !open);
      });

      /* Pointer users get hover, with a short close delay so the cursor
         can cross the gap between the trigger and the panel. */
      if (item && window.matchMedia("(hover: hover)").matches) {
        item.addEventListener("mouseenter", function () {
          window.clearTimeout(openTimer);
          if (trigger.getAttribute("aria-expanded") !== "true") {
            closeAll(trigger);
            setOpen(trigger, true);
            openedByHover = true;
          }
        });

        item.addEventListener("mouseleave", function () {
          window.clearTimeout(openTimer);
          openTimer = window.setTimeout(function () {
            setOpen(trigger, false);
            openedByHover = false;
          }, 140);
        });
      }

      /* Close when focus leaves the item entirely. */
      if (item) {
        item.addEventListener("focusout", function (event) {
          if (!item.contains(event.relatedTarget)) setOpen(trigger, false);
        });
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var open = triggers.filter(function (t) {
        return t.getAttribute("aria-expanded") === "true";
      });
      if (!open.length) return;
      closeAll();
      open[0].focus();
    });

    document.addEventListener("click", function (event) {
      if (event.target.closest(".nav__item")) return;
      closeAll();
    });
  }

  /* ---------------------------------------------------------------
     Mobile navigation drawer
     --------------------------------------------------------------- */

  function initMobileNav() {
    var toggle = $("[data-drawer-toggle]");
    var drawer = $("[data-drawer]");
    if (!toggle || !drawer) return;

    var closeBtn = $("[data-drawer-close]", drawer);
    var backdrop = $("[data-drawer-backdrop]");
    var lastFocused = null;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      drawer.hidden = !open;
      if (backdrop) backdrop.hidden = !open;

      /* Let the element paint hidden before transitioning it in. */
      window.requestAnimationFrame(function () {
        drawer.classList.toggle("is-open", open);
        if (backdrop) backdrop.classList.toggle("is-open", open);
      });

      lockScroll(open);

      if (open) {
        lastFocused = document.activeElement;
        (closeBtn || drawer).focus();
      } else if (lastFocused) {
        lastFocused.focus();
        lastFocused = null;
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    if (closeBtn) closeBtn.addEventListener("click", function () { setOpen(false); });
    if (backdrop) backdrop.addEventListener("click", function () { setOpen(false); });

    drawer.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      } else if (event.key === "Tab") {
        trapFocus(drawer, event);
      }
    });

    /* Collapsible groups inside the drawer. */
    $$("[data-drawer-sub]", drawer).forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("click", function () {
        var open = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", open ? "false" : "true");
        panel.hidden = open;
      });
    });

    /* Reset when the viewport grows past the mobile breakpoint. */
    var wide = window.matchMedia("(min-width: 75.0625em)");
    var onChange = function (event) {
      if (event.matches && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
      }
    };
    if (typeof wide.addEventListener === "function") wide.addEventListener("change", onChange);
    else if (typeof wide.addListener === "function") wide.addListener(onChange);

    setOpen(false);
  }

  /* ---------------------------------------------------------------
     Accordion
     ---------------------------------------------------------------
     Panels are open in the markup so they are readable without
     JavaScript; this collapses them and wires the triggers.          */

  function initAccordions() {
    $$("[data-accordion]").forEach(function (accordion) {
      var single = accordion.getAttribute("data-accordion") === "single";
      var triggers = $$("[data-accordion-trigger]", accordion);

      triggers.forEach(function (trigger) {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        if (!panel) return;

        var startOpen = trigger.getAttribute("data-accordion-open") === "true";
        trigger.setAttribute("aria-expanded", startOpen ? "true" : "false");
        panel.classList.toggle("is-open", startOpen);

        trigger.addEventListener("click", function () {
          var open = trigger.getAttribute("aria-expanded") === "true";

          if (single && !open) {
            triggers.forEach(function (other) {
              if (other === trigger) return;
              var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
              other.setAttribute("aria-expanded", "false");
              if (otherPanel) otherPanel.classList.remove("is-open");
            });
          }

          trigger.setAttribute("aria-expanded", open ? "false" : "true");
          panel.classList.toggle("is-open", !open);
        });
      });
    });
  }

  /* ---------------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------------
     The hidden state comes from `.js-reveal` on <html>, which is only
     added when IntersectionObserver is available and reduced motion is
     not requested. If either is untrue, nothing is ever hidden.       */

  function initReveal() {
    var items = $$("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) return;

    document.documentElement.classList.add("js-reveal");

    /* Stagger siblings within a group, capped so a long list never
       leaves the last card waiting. */
    $$("[data-reveal-group]").forEach(function (group) {
      var step = parseInt(group.getAttribute("data-reveal-step"), 10) || 90;
      var max = parseInt(group.getAttribute("data-reveal-max"), 10) || 360;
      $$("[data-reveal]", group).forEach(function (child, index) {
        child.style.setProperty("--reveal-delay", Math.min(index * step, max) + "ms");
      });
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });

    /* Safety net: anything still hidden after load gets shown, so a
       mis-observed element can never leave content invisible. */
    window.addEventListener("load", function () {
      window.setTimeout(function () {
        items.forEach(function (item) {
          var box = item.getBoundingClientRect();
          if (box.top < window.innerHeight && !item.classList.contains("is-revealed")) {
            item.classList.add("is-revealed");
          }
        });
      }, 200);
    });
  }

  /* ---------------------------------------------------------------
     Back to top
     --------------------------------------------------------------- */

  function initBackToTop() {
    var button = $("[data-to-top]");
    if (!button) return;

    var ticking = false;

    function update() {
      button.classList.toggle("is-visible", window.scrollY > 640);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth"
      });
      var main = $("#main");
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
      }
    });

    update();
  }

  /* ---------------------------------------------------------------
     Disclaimer acknowledgement
     ---------------------------------------------------------------
     Shown once per visitor. Storage is wrapped because file:// origins
     can refuse it; if storage is unavailable the acknowledgement still
     works, it just is not remembered.                                 */

  var STORE_KEY = "hrla.disclaimer.accepted";

  function readStore(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStore(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* Not fatal — the acknowledgement simply is not remembered. */
    }
  }

  function initDisclaimerGate() {
    var gate = $("[data-disclaimer-gate]");
    if (!gate) return;

    var accept = $("[data-disclaimer-accept]", gate);
    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      gate.hidden = false;
      lockScroll(true);
      if (accept) accept.focus();
    }

    function close(remember) {
      gate.hidden = true;
      lockScroll(false);
      if (remember) writeStore(STORE_KEY, "1");
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    if (accept) {
      accept.addEventListener("click", function () {
        close(true);
      });
    }

    /* "Exit Website" closes the tab where the browser allows it — which is
       only when a script opened it — and otherwise navigates away to a
       blank page. Either way the visitor leaves without acknowledging. */
    $$("[data-disclaimer-exit]", gate).forEach(function (button) {
      button.addEventListener("click", function () {
        window.close();
        window.setTimeout(function () {
          window.location.replace("about:blank");
        }, 120);
      });
    });

    gate.addEventListener("keydown", function (event) {
      if (event.key === "Tab") trapFocus(gate, event);
    });

    /* Anything that opens the acknowledgement on demand. */
    $$("[data-disclaimer-open]").forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        open();
      });
    });

    if (gate.getAttribute("data-disclaimer-gate") === "auto" && !readStore(STORE_KEY)) {
      open();
    }
  }

  /* ---------------------------------------------------------------
     Structured data
     ---------------------------------------------------------------
     The JSON-LD ships with the same {{PLACEHOLDERS}} as the markup.
     Resolved values are substituted; anything still unresolved is
     removed, so search engines are never told that a placeholder is a
     telephone number.                                                 */

  var PLACEHOLDER_KEYS = {
    PHONE_NUMBER: "phone",
    WHATSAPP_NUMBER: "whatsapp",
    EMAIL_ADDRESS: "email",
    OFFICE_ADDRESS: "address",
    GOOGLE_MAPS_URL: "googleMapsUrl"
  };

  function resolveNode(node) {
    var touched = false;

    Object.keys(node).forEach(function (key) {
      var value = node[key];

      if (typeof value === "string") {
        var match = value.match(/^\{\{([A-Z0-9_]+)\}\}$/);
        if (!match) return;

        var resolved = config[PLACEHOLDER_KEYS[match[1]]];
        touched = true;

        if (isPlaceholder(resolved)) {
          /* Deleting from an array would leave a hole, so blank it. */
          if (Array.isArray(node)) node[key] = "";
          else delete node[key];
        } else {
          node[key] = resolved;
        }
      } else if (value && typeof value === "object") {
        if (resolveNode(value)) touched = true;
      }
    });

    return touched;
  }

  function initStructuredData() {
    $$('script[type="application/ld+json"][data-config-json]').forEach(function (node) {
      var data;
      try {
        data = JSON.parse(node.textContent);
      } catch (error) {
        return;
      }
      if (resolveNode(data)) {
        node.textContent = JSON.stringify(data, null, 2);
      }
    });
  }

  /* ---------------------------------------------------------------
     Enquiry form
     --------------------------------------------------------------- */

  function initForms() {
    $$("form[data-form]").forEach(function (form) {
      var notice = $("[data-form-notice]", form);

      if (!isPlaceholder(config.formEndpoint)) {
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
     Start
     --------------------------------------------------------------- */

  function init() {
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    if (!prefersReducedMotion()) {
      document.documentElement.classList.add("has-smooth-scroll");
    }

    initConfig();
    initImages();
    initHeader();
    initActiveNav();
    initMenus();
    initMobileNav();
    initAccordions();
    initReveal();
    initBackToTop();
    initDisclaimerGate();
    initStructuredData();
    initForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
