"use strict";

// Put confirmed contact details in the saved HTML as well as the browser DOM.
// Only data-config elements and registered JSON-LD tokens are changed; authored
// article content and unresolved professional particulars remain untouched.
const escapeHtml = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ready = (value) => value != null && String(value).trim() !== "" && !/^\{\{[A-Z0-9_]+\}\}$/.test(String(value).trim());

function renderConfig(html, config, tokens) {
  const opening = /<([a-z][\w:-]*)\b([^<>]*\bdata-config\s*=\s*["']([^"']+)["'][^<>]*)>/gi;
  const edits = [];
  let match;
  while ((match = opening.exec(html))) {
    const [startTag, tag, attrs, key] = match;
    const value = config[key];
    if (!ready(value)) continue;
    const closing = new RegExp("</?" + tag + "\\b[^>]*>", "gi");
    closing.lastIndex = opening.lastIndex;
    let depth = 1, end;
    while ((end = closing.exec(html))) {
      depth += end[0][1] === "/" ? -1 : 1;
      if (depth === 0) break;
    }
    if (!end || depth) throw new Error("Unclosed data-config element: " + key);
    let content = renderConfig(html.slice(opening.lastIndex, end.index), config, tokens);
    let attributes = attrs.replace(/\s(?:aria-disabled|data-config-state|role)=(['"])(?:true|pending|link)\1/g, "");
    attributes = attributes.replace(/\bclass=(["'])(.*?)\1/g, (_, q, classes) => "class=" + q + classes.split(/\s+/).filter(c => c !== "is-pending").join(" ") + q);
    const role = (attrs.match(/data-config-role=["']([^"']+)/) || [])[1] || "text";
    const keep = /data-config-text=["']keep["']/.test(attrs);
    function setAttribute(name, text) {
      attributes = attributes.replace(new RegExp("\\s" + name + "=([\"'])(.*?)\\1", "gi"), "");
      attributes += " " + name + '="' + escapeHtml(text) + '"';
    }
    if (tag.toLowerCase() === "a") {
      const digits = String(value).replace(/[^\d+]/g, "");
      const href = role === "tel" ? "tel:" + digits : role === "email" ? "mailto:" + value : role === "whatsapp" ? "https://wa.me/" + digits.replace(/^\+/, "") : role === "url" ? value : null;
      if (href) setAttribute("href", href);
      if (role === "whatsapp" || role === "url") {
        setAttribute("rel", "noopener noreferrer");
        setAttribute("target", "_blank");
      }
    }
    if (role === "lines") {
      content = (config[key + "Lines"] || [value]).map(escapeHtml).join("<br>");
    } else if (!keep) {
      const text = escapeHtml(ready(config[key + "Display"]) ? config[key + "Display"] : value);
      if (/data-config-slot\b/.test(content)) {
        content = content.replace(/(<([a-z][\w:-]*)\b[^>]*data-config-slot[^>]*>)[\s\S]*?(<\/\2>)/i, (_, start, tag, end) => start + text + end);
      } else if (!/<[a-z]/i.test(content)) {
        content = text;
      } else {
        setAttribute("title", value);
      }
    }
    edits.push({ start: match.index, end: closing.lastIndex, text: "<" + tag + attributes + ">" + content + end[0] });
    opening.lastIndex = closing.lastIndex;
  }
  for (const edit of edits.reverse()) html = html.slice(0, edit.start) + edit.text + html.slice(edit.end);
  if (!ready(config.formEndpoint)) {
    html = html.replace(/(<form\b[^>]*data-form=["']enquiry["'][^>]*>)([\s\S]*?)(<\/form>)/gi, (_, start, body, end) => {
      body = body.replace(/<(input|select|textarea|button)\b([^>]*)>/gi, (tag, name, attrs) => /\bdisabled\b/.test(attrs) ? tag : "<" + name + attrs + " disabled>");
      return start + body + end;
    });
  }
  return html.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi, (_, start, body, end) => {
    const resolved = body.replace(/\{\{([A-Z0-9_]+)\}\}/g, (token, key) => ready(config[tokens[key]]) ? JSON.stringify(String(config[tokens[key]])).slice(1, -1) : token);
    JSON.parse(resolved);
    return start + resolved + end;
  });
}
module.exports = { renderConfig };
