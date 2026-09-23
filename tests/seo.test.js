import test from 'node:test'
import assert from 'node:assert/strict'
import { prerenderRoutes, pageSeo, landingSeo } from '../src/seo/meta.js'
import { LANDINGS, landingPath, findLanding, alternatePath } from '../src/seo/landings.js'
import { RATE_PAGES, ratePagePath, ratePageSeo, findRatePage, rateFaq } from '../src/seo/rates.js'
import { LOCAL_PAGES, localPath, findLocalPage, localPathFor } from '../src/seo/localPages.js'

var LANGS = ['AM', 'RU', 'EN']

test('prerendered routes are unique and every sitemap URL resolves', function() {
  var routes = prerenderRoutes()
  var seen = {}
  routes.forEach(function(r) {
    assert.ok(!seen[r.path], 'duplicate route ' + r.path)
    seen[r.path] = true
  })
  // hreflang alternates point only to URLs we actually prerender
  routes.forEach(function(r) {
    ;(r.alternates || []).forEach(function(a) { assert.ok(seen[a.path], r.path + ' → missing alternate ' + a.path) })
  })
})

test('/<lang>/<slug> URLs never collide between landings, rate pages and tools', function() {
  var owner = {}
  function claim(path, who) {
    assert.ok(!owner[path], path + ' used by ' + owner[path] + ' and ' + who)
    owner[path] = who
  }
  LANGS.forEach(function(l) {
    LANDINGS.forEach(function(x) { claim(landingPath(x, l), 'landing ' + x.key) })
    RATE_PAGES.forEach(function(x) { claim(ratePagePath(x, l), 'rates ' + x.key) })
    Object.keys(LOCAL_PAGES).forEach(function(k) { claim(localPath(k, l), 'tool ' + k) })
  })
})

test('each localized URL resolves back to its page and language', function() {
  LANGS.forEach(function(l) {
    LANDINGS.forEach(function(x) { assert.equal(findLanding(landingPath(x, l)).lang, l) })
    RATE_PAGES.forEach(function(x) { assert.equal(findRatePage(ratePagePath(x, l)).page.key, x.key) })
    Object.keys(LOCAL_PAGES).forEach(function(k) {
      var found = findLocalPage(localPath(k, l))
      assert.equal(found.key, k); assert.equal(found.lang, l)
      assert.equal(localPathFor(LOCAL_PAGES[k].path, l), localPath(k, l))
      // the language switcher moves between versions of the same page
      assert.equal(alternatePath(localPath(k, 'EN'), l), localPath(k, l))
      assert.equal(alternatePath(LOCAL_PAGES[k].path, l), localPath(k, l))
    })
  })
})

test('tool pages are canonical on their language URL with hreflang for all languages', function() {
  Object.keys(LOCAL_PAGES).forEach(function(k) {
    LANGS.forEach(function(l) {
      var m = pageSeo(k, l)
      assert.equal(m.path, localPath(k, l))
      assert.deepEqual(m.alternates.map(function(a) { return a.hreflang }).sort(), ['en', 'hy', 'ru', 'x-default'])
    })
  })
})

test('titles and descriptions are present and sane in every language', function() {
  var metas = []
  LANGS.forEach(function(l) {
    ;['home', 'early', 'pro', 'widget'].concat(Object.keys(LOCAL_PAGES)).forEach(function(k) { metas.push(pageSeo(k, l)) })
    LANDINGS.forEach(function(x) { metas.push(landingSeo(x, l)) })
    RATE_PAGES.forEach(function(x) { metas.push(ratePageSeo(x, l)) })
  })
  metas.forEach(function(m) {
    assert.ok(m.title && m.title.length >= 15 && m.title.length <= 100, 'title: ' + m.title)
    assert.ok(m.description && m.description.length >= 40 && m.description.length <= 200, 'description (' + m.path + '): ' + m.description)
    assert.doesNotMatch(m.title + m.description, /\{[A-Z]+\}|undefined|NaN/, 'unfilled template in ' + m.path)
  })
})

test('rate pages have FAQ answers built from data', function() {
  RATE_PAGES.forEach(function(x) {
    LANGS.forEach(function(l) {
      var faq = rateFaq(x, l)
      assert.ok(faq.length >= 3)
      faq.forEach(function(q) { assert.ok(q[0] && q[1] && !/undefined|NaN/.test(q[1]), x.key + ' ' + l) })
    })
  })
})
