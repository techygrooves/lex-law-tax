const test=require('node:test');const assert=require('node:assert/strict');const {reviewsSection}=require('./reviews-section');
const url='https://share.google/uQauRVQV4QKgKefoZ';
test('empty source links to Google without fabricating cards',()=>{const s=reviewsSection({url,reviews:[]});assert.match(s,/Visit our Google profile/);assert.doesNotMatch(s,/<blockquote>|data-review-stream/)});
test('real text is escaped, no stars or dates invented',()=>{const s=reviewsSection({url,reviews:[{name:'A & B',text:'Helpful <script>alert(1)</script>'}]});assert.match(s,/A &amp; B/);assert.match(s,/&lt;script&gt;/);assert.doesNotMatch(s,/review-card__stars|out of 5 stars|<script>/)});
test('supplied rating is rendered and translated text is labelled',()=>{const s=reviewsSection({url,reviews:[{name:'Reviewer',text:'Review',rating:4,translated:true}]});assert.match(s,/4 out of 5 stars/);assert.match(s,/Translated by Google/)});
test('invalid rating and unsafe link are rejected',()=>{assert.throws(()=>reviewsSection({url,reviews:[{name:'A',text:'B',rating:6}]}));assert.throws(()=>reviewsSection({url:'javascript:alert(1)',reviews:[]}))});
