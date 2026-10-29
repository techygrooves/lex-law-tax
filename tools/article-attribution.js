"use strict";

// Use the firm's editorial byline without inventing a human author or reviewer.
function articleAttribution(html, firm) {
  let firmArticle = false;
  const organization = { "@type": "Organization", name: firm, url: "https://lexlawandtax.com/about/" };
  html = html.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi, (all, start, body, end) => {
    const data = JSON.parse(body);
    let changed = false;
    function visit(node) {
      if (!node || typeof node !== "object") return;
      if (Array.isArray(node)) return node.forEach(visit);
      if ([].concat(node["@type"] || []).some(t => ["Article", "BlogPosting"].includes(t))) {
        const author = node.author;
        const name = typeof author === "string" ? author : author && author.name;
        if (!author || name === firm || (typeof name === "string" && /^\{\{/.test(name))) {
          firmArticle = true;
          if (JSON.stringify(author) !== JSON.stringify(organization)) {
            node.author = organization;
            changed = true;
          }
        }
      }
      Object.values(node).forEach(visit);
    }
    visit(data);
    return changed ? start + JSON.stringify(data).replace(/</g, "\\u003c") + end : all;
  });
  if (!firmArticle) return html;
  const metadata = /(<p\b[^>]*class=["'][^"']*\barticle-meta\b[^"']*["'][^>]*>)([\s\S]*?)(<\/p>)/i;
  if (metadata.test(html)) {
    return html.replace(metadata, (all, start, text, end) => text.includes(firm) ? all : start + "By " + firm + " · " + text + end);
  }
  return html.replace(/(<p\b[^>]*class=["'][^"']*\bpage-header__lead\b[^"']*["'][^>]*>[\s\S]*?<\/p>)/i, "$1\n<p class=\"article-meta\">By " + firm + "</p>");
}
module.exports = { articleAttribution };
