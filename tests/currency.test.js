import test from 'node:test'
import assert from 'node:assert/strict'
import { LOAN_CURRENCIES, currencySymbol, pdfSymbol, formatMoney, clampAmount, amdPerUnit, convertAmount, shortAmount } from '../src/lib/currency.js'
import { buildLoanSnapshot, analyzeLoan } from '../src/lib/insights.js'

var FX = { rates: [{ iso: 'USD', amount: 1, rate: 386 }, { iso: 'EUR', amount: 1, rate: 452 }, { iso: 'RUB', amount: 1, rate: 4.7 }] }

test('every loan currency has consistent slider bounds and scenarios', function() {
  Object.keys(LOAN_CURRENCIES).forEach(function(c) {
    var x = LOAN_CURRENCIES[c]
    assert.ok(x.min < x.def && x.def < x.max, c)
    assert.equal(x.def % x.step, 0, c + ' default on the step grid')
    assert.equal(x.extras.length, 4, c)
  })
  assert.equal(currencySymbol('USD'), '$'); assert.equal(currencySymbol('XYZ'), '֏')
  assert.equal(pdfSymbol('RUB'), 'RUB '); assert.equal(pdfSymbol('EUR'), '€')
  assert.equal(shortAmount(100000000, 'AMD'), '֏100M'); assert.equal(shortAmount(500, 'USD'), '$500')
})

test('amounts are clamped to the currency range', function() {
  assert.equal(clampAmount(50, 'USD'), 500)
  assert.equal(clampAmount(5e9, 'AMD'), 100000000)
})

test('conversion at CBA rates, rounded to the target step', function() {
  assert.equal(amdPerUnit(FX, 'AMD'), 1)
  assert.equal(amdPerUnit(FX, 'USD'), 386)
  assert.ok(Math.abs(amdPerUnit({ rates: [{ iso: 'JPY', amount: 10, rate: 26.4 }] }, 'JPY') - 2.64) < 1e-9)
  assert.equal(convertAmount(5000000, 'AMD', 'USD', FX), 13000)     // 12 953 → step 500
  assert.equal(convertAmount(13000, 'USD', 'AMD', FX), 5000000)     // 5 018 000 → step 100 000
  assert.equal(convertAmount(10000, 'USD', 'EUR', FX), 8500)        // 8 540 → step 500
  assert.equal(convertAmount(1000, 'USD', 'AMD', null), null)       // no rates → caller uses default
  assert.equal(formatMoney(1234.6, 'EUR').replace(/\s/g, ''), '€1,235')
})

test('offline analysis speaks in the loan currency', function() {
  var ctx = { loanState: { amount: 20000, rate: 9, term: 60, loanType: 'annuity', currency: 'USD' },
    monthlyPayment: 415.17, totalInterest: 4910, totalPayment: 24910, apr: 9, schedule: new Array(60), extraPayments: [] }
  var snap = buildLoanSnapshot(ctx)
  assert.equal(snap.currency, 'USD')
  var ru = analyzeLoan(snap, 'rate', 'RU')
  assert.match(ru, /в долларах/); assert.match(ru, /\$/); assert.doesNotMatch(ru, /֏/)
  assert.match(analyzeLoan(Object.assign({}, snap, { currency: 'AMD' }), 'rate', 'EN'), /in drams/)
})
