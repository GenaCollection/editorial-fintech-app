import test from 'node:test'
import assert from 'node:assert/strict'
import { BANK_OFFERS, BANKS_NO_DATA, OFFERS_AS_OF, activeOffers } from '../src/config/bankOffers.js'

var LANGS = ['AM', 'RU', 'EN']

function text(v, where) {
  if (typeof v === 'string') { assert.ok(v.trim(), where + ': empty text'); return }
  assert.ok(v && typeof v === 'object', where + ': missing text')
  LANGS.forEach(function(l) { assert.ok(v[l] && String(v[l]).trim(), where + ': missing ' + l) })
}

test('every offer is complete and consistent', function() {
  assert.match(OFFERS_AS_OF, /^\d{4}-\d{2}$/)
  BANK_OFFERS.forEach(function(o, i) {
    var at = '#' + i + ' ' + o.bank
    assert.ok(o.bank, at + ': bank')
    assert.ok(['deposit', 'mortgage', 'loan'].indexOf(o.kind) >= 0, at + ': kind')
    assert.ok(['AMD', 'USD', 'EUR'].indexOf(o.currency) >= 0, at + ': currency')
    assert.equal(o.rate.length, 2, at + ': rate is [min, max]')
    assert.ok(o.rate[0] >= 0 && o.rate[0] <= o.rate[1] && o.rate[1] < 40, at + ': rate range')
    assert.ok(!(o.upTo && o.from), at + ': upTo and from together')
    assert.match(o.url, /^https:\/\//, at + ': url')
    assert.ok(o.source, at + ': source')
    text(o.term, at + ' term')
    if (o.product) text(o.product, at + ' product')
    if (o.minAmount) text(o.minAmount, at + ' minAmount')
    ;(o.conditions || []).forEach(function(c, j) { text(c, at + ' condition ' + j) })
    if (o.validUntil) assert.match(o.validUntil, /^\d{4}-\d{2}-\d{2}$/, at + ': validUntil')
    if (o.compare) assert.ok(o.compare[0] <= o.compare[1], at + ': compare range')
    if (o.limits) {
      ;['amount', 'term'].forEach(function(k) {
        var l = o.limits[k]
        if (l) assert.ok(l.length === 2 && l[0] >= 0 && l[0] <= l[1], at + ': limits.' + k)
      })
    }
  })
})

test('no duplicate offers', function() {
  var seen = {}
  BANK_OFFERS.forEach(function(o) {
    var id = [o.bank, o.kind, o.currency, JSON.stringify(o.product || ''), o.rate.join('-')].join('|')
    assert.ok(!seen[id], 'duplicate: ' + id)
    seen[id] = true
  })
})

test('each tab has offers and expired promotions are hidden', function() {
  ;['deposit', 'mortgage', 'loan'].forEach(function(kind) {
    assert.ok(activeOffers().some(function(o) { return o.kind === kind }), 'no ' + kind + ' offers')
  })
  var expired = { bank: 'X', validUntil: '2000-01-01' }
  BANK_OFFERS.push(expired)
  try { assert.ok(activeOffers('2026-01-01').indexOf(expired) < 0) } finally { BANK_OFFERS.pop() }
})

test('banks without data have a link and a note', function() {
  BANKS_NO_DATA.forEach(function(b) {
    assert.match(b.url, /^https:\/\//, b.bank)
    text(b.note, b.bank + ' note')
  })
})
