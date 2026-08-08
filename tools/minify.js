/*
 * Conservative CSS and JavaScript minifiers.
 * ------------------------------------------
 * Used by tools/build-pages.js to write assets/css/style.min.css and
 * assets/js/site.min.js. The unminified files stay in the repository and
 * remain the editable truth; the .min files are generated and committed
 * so the published site still needs no build step.
 *
 * Both are deliberately conservative. Neither renames anything, reorders
 * anything, or rewrites any expression:
 *
 *   CSS  - strips comments, collapses whitespace, and removes space
 *          around braces, semicolons and commas. It never touches space
 *          around ':' , because ".a :hover" and ".a:hover" are different
 *          selectors and telling a declaration colon from a selector
 *          colon needs a real parser.
 *
 *   JS   - strips comments and leading indentation but KEEPS every
 *          newline, so automatic semicolon insertion cannot change
 *          meaning. Statements are never joined.
 *
 * Both scanners track strings (and template literals and regex literals
 * in JS) so nothing inside one is ever altered. build-pages.js parses
 * the minified JavaScript before writing it, and the browser suites run
 * against the minified files, so a mistake here fails loudly.
 */

/* ------------------------------------------------------------------ */
/* CSS                                                                 */
/* ------------------------------------------------------------------ */

function minifyCss(src) {
  let out = "";
  let i = 0;

  while (i < src.length) {
    const c = src[i];

    /* Comment */
    if (c === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      i = end === -1 ? src.length : end + 2;
      continue;
    }

    /* String — copied through untouched, quotes and all */
    if (c === '"' || c === "'") {
      const quote = c;
      let j = i + 1;
      while (j < src.length) {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === quote) { j += 1; break; }
        j += 1;
      }
      out += src.slice(i, j);
      i = j;
      continue;
    }

    /* url(...) unquoted — also copied through untouched */
    if (src.slice(i, i + 4).toLowerCase() === "url(") {
      const end = src.indexOf(")", i);
      if (end !== -1) {
        out += src.slice(i, end + 1);
        i = end + 1;
        continue;
      }
    }

    /* Whitespace run -> at most one space, dropped entirely only next to
       a brace, a semicolon or a comma.

       Combinators are deliberately NOT in that set. '>' , '+' and '~'
       need no space in a selector, but '+' and '-' inside calc() and
       clamp() are operators that require surrounding whitespace, and
       '>' appears in media-query range syntax. Telling those apart needs
       a real parser; keeping one space costs a few hundred bytes and
       cannot silently drop a declaration. */
    if (/\s/.test(c)) {
      let j = i;
      while (j < src.length && /\s/.test(src[j])) j += 1;
      const prev = out[out.length - 1];
      const next = src[j];
      if (prev && next && !"{};,".includes(prev) && !"{};,".includes(next)) {
        out += " ";
      }
      i = j;
      continue;
    }

    /* A brace, semicolon or comma never needs the space before it. */
    if ("{};,".includes(c) && out[out.length - 1] === " ") {
      out = out.slice(0, -1);
    }

    /* The last declaration's semicolon is redundant. */
    if (c === "}" && out[out.length - 1] === ";") {
      out = out.slice(0, -1);
    }

    out += c;
    i += 1;
  }

  return out.trim() + "\n";
}

/* ------------------------------------------------------------------ */
/* JavaScript                                                          */
/* ------------------------------------------------------------------ */

/* True when a '/' at this point starts a regex literal rather than a
   division. Decided from the last significant character, which is the
   standard heuristic and is sufficient for code we control. */
function regexAllowed(out) {
  let k = out.length - 1;
  while (k >= 0 && /\s/.test(out[k])) k -= 1;
  if (k < 0) return true;
  const c = out[k];
  if ("(,=:[!&|?{};+-*%~^<>".includes(c)) return true;
  /* `return /re/`, `typeof /re/`, `case /re/` and friends. */
  const word = (out.slice(0, k + 1).match(/[A-Za-z_$][\w$]*$/) || [""])[0];
  return ["return", "typeof", "instanceof", "in", "of", "new", "delete",
    "void", "case", "do", "else", "yield", "await"].includes(word);
}

function minifyJs(src) {
  let out = "";
  let i = 0;

  while (i < src.length) {
    const c = src[i];

    /* Block comment -> gone. If it spanned lines, leave one newline
       behind so nothing is joined that was not joined before. */
    if (c === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      const body = src.slice(i, end === -1 ? src.length : end + 2);
      i = end === -1 ? src.length : end + 2;
      if (body.includes("\n")) out += "\n";
      continue;
    }

    /* Line comment -> gone, up to but not including the newline. */
    if (c === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i += 1;
      continue;
    }

    /* String or template literal — copied through untouched. A template
       literal may contain newlines and ${...}, so it is copied whole. */
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      let j = i + 1;
      let depth = 0;
      while (j < src.length) {
        if (src[j] === "\\") { j += 2; continue; }
        if (quote === "`") {
          if (src[j] === "$" && src[j + 1] === "{") { depth += 1; j += 2; continue; }
          if (src[j] === "}" && depth > 0) { depth -= 1; j += 1; continue; }
        }
        if (src[j] === quote && depth === 0) { j += 1; break; }
        j += 1;
      }
      out += src.slice(i, j);
      i = j;
      continue;
    }

    /* Regex literal — copied through untouched, character class aware. */
    if (c === "/" && regexAllowed(out)) {
      let j = i + 1;
      let inClass = false;
      let closed = false;
      while (j < src.length) {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === "\n") break;
        if (src[j] === "[") inClass = true;
        else if (src[j] === "]") inClass = false;
        else if (src[j] === "/" && !inClass) { j += 1; closed = true; break; }
        j += 1;
      }
      if (closed) {
        while (j < src.length && /[a-z]/.test(src[j])) j += 1;   /* flags */
        out += src.slice(i, j);
        i = j;
        continue;
      }
    }

    /* Newline: keep exactly one, and drop the indentation after it.
       Keeping the line break is what makes this safe. */
    if (c === "\n") {
      let j = i;
      while (j < src.length && /\s/.test(src[j])) j += 1;
      if (out.length) out += "\n";
      i = j;
      continue;
    }

    /* Any other whitespace run collapses to a single space. */
    if (/\s/.test(c)) {
      let j = i;
      while (j < src.length && /\s/.test(src[j]) && src[j] !== "\n") j += 1;
      if (src[j] === "\n") continue;   /* handled next pass */
      out += " ";
      i = j;
      continue;
    }

    out += c;
    i += 1;
  }

  return out.replace(/\n{2,}/g, "\n").trim() + "\n";
}

module.exports = { minifyCss, minifyJs };
