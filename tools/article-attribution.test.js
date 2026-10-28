const test = require('node:test');const assert = require('node:assert/strict');const {articleAttribution}=require('./article-attribution');
const firm='H.R. Legal Associate';
const page=(author)=>'<p class="article-meta">Published today</p><script type="application/ld+json">'+JSON.stringify({'@type':'Article',headline:'A guide',...(author?{author}:{})})+'</script>';
test('unassigned article gets a visible firm byline and Organization schema',()=>{const out=articleAttribution(page(),firm);assert.match(out,/By H.R. Legal Associate/);assert.match(out,/"@type":"Organization"/);assert.doesNotMatch(out,/reviewedBy/)});
test('firm is never represented as a Person and rendering is stable',()=>{const out=articleAttribution(page({'@type':'Person',name:firm}),firm);assert.doesNotMatch(out,/"@type":"Person"/);assert.equal(articleAttribution(out,firm),out)});
test('existing individual author is preserved',()=>{const input=page({'@type':'Person',name:'Named Writer'});assert.equal(articleAttribution(input,firm),input)});
