"use strict";
const externalIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>`;
const html = value => String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
function stars(rating) {
  return Array.from({length:5}, (_, i) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="${i < rating ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9Z"/></svg>`).join("");
}
function reviewsSection(data) {
  const url = new URL(data.url);
  if(url.protocol !== "https:") throw new Error("Reviews require an HTTPS source link");
  if (data.overallRating != null && (!Number.isFinite(data.overallRating) || data.overallRating < 1 || data.overallRating > 5)) throw new Error("Overall rating must be between 1 and 5");
  const ratingSummary = data.overallRating == null ? "" : `<div class="review-rating" aria-label="Firm rated ${data.overallRating} out of 5 on Google"><span class="review-rating__score">${data.overallRating.toFixed(1)}<span> / 5</span></span><div><span class="review-rating__stars" aria-hidden="true">${stars(Math.round(data.overallRating))}</span><span class="review-rating__label">Rated ${data.overallRating} stars on Google</span></div></div>`;
  const rows = data.reviews || [];
  const cards = rows.map(r => {
    if(!r.name || !r.text || (r.rating != null && (!Number.isInteger(r.rating) || r.rating<1 || r.rating>5))) throw new Error("A review needs a real display name and text; any supplied rating must be 1 to 5");
    return `<li class="review-card">
        <div class="review-card__top"><span class="review-card__avatar" aria-hidden="true">${html(r.name.trim().slice(0,1).toUpperCase())}</span><div><p class="review-card__name">${html(r.name)}</p><p class="review-card__source">Google review${r.date ? " · "+html(r.date) : ""}${r.translated ? " · Translated by Google" : ""}</p></div><span class="review-card__google" aria-hidden="true">G</span></div>
        ${r.rating != null ? `<p class="review-card__stars" aria-label="${r.rating} out of 5 stars"><span aria-hidden="true">${stars(r.rating)}</span></p>` : ""}
        <blockquote><p>${html(r.text)}</p></blockquote>
        <a class="review-card__link" href="${html(url.href)}" target="_blank" rel="noopener noreferrer">View on Google ${externalIcon}</a>
      </li>`;
  }).join("\n");
  return `
  <section class="section review-section" aria-labelledby="reviews-title">
    <div class="container">
      <div class="review-section__heading"><div><p class="eyebrow">On Google</p><h2 id="reviews-title">Reviews of Our Firm</h2><p class="review-section__lead">Read the experiences shared on our Google profile.</p></div><div class="review-section__aside">${ratingSummary}<a class="btn btn--secondary" href="${html(url.href)}" target="_blank" rel="noopener noreferrer">Read reviews on Google ${externalIcon}</a></div></div>
      ${cards ? `<div class="review-stream" data-review-stream><div class="review-stream__controls"><span class="review-stream__label">Selected Google reviews</span><button type="button" class="review-stream__pause" data-review-pause aria-pressed="false" hidden>Pause scrolling</button></div><div class="review-stream__viewport" tabindex="0" aria-label="Selected reviews; scrolling pauses while focused"><div class="review-stream__track" data-review-track><ul class="review-stream__group" data-review-group>${cards}</ul></div></div></div>` : `<a class="review-profile" href="${html(url.href)}" target="_blank" rel="noopener noreferrer"><span class="review-profile__mark" aria-hidden="true">G</span><div><p class="review-profile__eyebrow">Google reviews</p><h3>Visit our Google profile</h3><p>Browse reviews and see the original posts on Google.</p></div><span class="review-profile__arrow" aria-hidden="true">↗</span></a>`}
    </div>
  </section>`.replace(/ +$/gm, "");
}
module.exports = { reviewsSection };
