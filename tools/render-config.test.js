"use strict";
const test = require('node:test');
const assert = require('node:assert/strict');
const { renderConfig } = require('./render-config');
const config = { phone: '+918318772717', phoneDisplay: '+91 83187 72717', address: 'Shop 4 & Office', addressLines: ['Shop 4 & Office', 'Lucknow'], email: 'legal@example.com', googleMapsUrl: 'https://example.com/maps?a=1&b=2' };
test('confirmed contact links preserve icons and fill the nested text slot', () => {
 const out=renderConfig('<a data-config="phone" data-config-role="tel"><svg><path></path></svg><span data-config-slot>Telephone to be published</span></a>',config,{});
 assert.match(out,/href="tel:\+918318772717"/);assert.match(out,/<svg><path><\/path><\/svg>/);assert.match(out,/<span data-config-slot>\+91 83187 72717<\/span>/);assert.doesNotMatch(out,/to be published/);
});
test('addresses are escaped, multiline and no longer marked pending',()=>{
 const out=renderConfig('<address class="contact is-pending" data-config="address" data-config-role="lines"></address>',config,{});
 assert.match(out,/Shop 4 &amp; Office<br>Lucknow/);assert.doesNotMatch(out,/is-pending/);
});
test('fixed link labels remain intact and missing values remain unresolved',()=>{
 const input='<a data-config="googleMapsUrl" data-config-role="url" data-config-text="keep">Directions</a><span data-config="unknown">Withheld</span>';
 const out=renderConfig(input,config,{});assert.match(out,/>Directions<\/a>/);assert.match(out,/a=1&amp;b=2/);assert.match(out,/<span data-config="unknown">Withheld<\/span>/);
});
test('registered structured-data tokens resolve and unrelated prose remains untouched',()=>{
 const input='<p>Author-written article.</p><script type="application/ld+json">{"telephone":"{{PHONE_NUMBER}}","education":"{{WITHHELD}}"}</script>';
 const out=renderConfig(input,config,{PHONE_NUMBER:'phone'});assert.match(out,/"telephone":"\+918318772717"/);assert.match(out,/\{\{WITHHELD\}\}/);assert.match(out,/<p>Author-written article\.<\/p>/);
});
test('rendering twice is stable',()=>{
 const input='<a class="is-pending" aria-disabled="true" data-config="email" data-config-role="email">to be published</a>';
 const first=renderConfig(input,config,{});assert.equal(renderConfig(first,config,{}),first);
});

test('nested contact card values resolve inside fixed-label contact links',()=>{
 const input='<a data-config="phone" data-config-role="tel" data-config-text="keep"><span>Telephone</span><span data-config="phone">To be published</span></a>';
 const out=renderConfig(input,config,{});assert.match(out,/>Telephone<\/span>/);assert.match(out,/<span data-config="phone">\+91 83187 72717<\/span>/);assert.doesNotMatch(out,/To be published/);
});

test('unconfigured contact form controls cannot submit without JavaScript',()=>{
 const out=renderConfig('<form data-form="enquiry"><input name="name"><select><option>Item</option></select><textarea></textarea><button>Send</button></form>',config,{});
 assert.match(out,/<input name="name" disabled>/);assert.match(out,/<select disabled>/);assert.match(out,/<textarea disabled>/);assert.match(out,/<button disabled>/);assert.doesNotMatch(out,/action=/);
});
