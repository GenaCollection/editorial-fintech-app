import test from 'node:test'
import assert from 'node:assert/strict'
import { parseCba, parseErApi } from '../api/_lib/fx.js'

// Shape of the CBA web service response (api.cba.am/exchangerates.asmx,
// SOAP method ExchangeRatesLatest).
var CBA_SOAP = '<?xml version="1.0" encoding="utf-8"?>' +
  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
  '<soap:Body><ExchangeRatesLatestResponse xmlns="http://www.cba.am/"><ExchangeRatesLatestResult>' +
  '<CurrentDate>2026-09-23T00:00:00+04:00</CurrentDate><NextAvailableDate>2026-09-24T00:00:00+04:00</NextAvailableDate>' +
  '<PreviousDate>2026-09-22T00:00:00+04:00</PreviousDate><Rates>' +
  '<ExchangeRate><ISO>RUB</ISO><Amount>1</Amount><Rate>4.72</Rate><Difference>0.03</Difference></ExchangeRate>' +
  '<ExchangeRate><ISO>JPY</ISO><Amount>10</Amount><Rate>26.4</Rate><Difference>-0.1</Difference></ExchangeRate>' +
  '<ExchangeRate><ISO>USD</ISO><Amount>1</Amount><Rate>386.12</Rate><Difference>-0.54</Difference></ExchangeRate>' +
  '<ExchangeRate><ISO>EUR</ISO><Amount>1</Amount><Rate>452.3</Rate><Difference>1.2</Difference></ExchangeRate>' +
  '<ExchangeRate><ISO>XDR</ISO><Amount>1</Amount><Rate>526.1</Rate><Difference>0</Difference></ExchangeRate>' +
  '</Rates></ExchangeRatesLatestResult></ExchangeRatesLatestResponse></soap:Body></soap:Envelope>'

test('CBA SOAP response: dates, rates per amount, change, main currencies first', function() {
  var d = parseCba(CBA_SOAP)
  assert.equal(d.date, '2026-09-23')
  assert.equal(d.prevDate, '2026-09-22')
  assert.equal(d.source, 'cba')
  assert.deepEqual(d.rates.map(function(r) { return r.iso }), ['USD', 'EUR', 'RUB', 'JPY', 'XDR'])
  assert.deepEqual(d.rates[0], { iso: 'USD', amount: 1, rate: 386.12, diff: -0.54 })
  assert.equal(d.rates[3].amount, 10)
})

test('plain asmx XML (no SOAP envelope) is accepted too', function() {
  var xml = '<ExchangeRates xmlns="http://www.cba.am/"><CurrentDate>2026-09-23T00:00:00</CurrentDate><Rates>' +
    '<ExchangeRate><ISO>USD</ISO><Amount>1</Amount><Rate>386</Rate><Difference>0</Difference></ExchangeRate></Rates></ExchangeRates>'
  assert.equal(parseCba(xml).rates[0].rate, 386)
})

test('an empty or broken CBA response is an error (so the fallback is used)', function() {
  assert.throws(function() { parseCba('<html>Service Unavailable</html>') })
})

test('market fallback converts per-AMD quotes and picks a readable unit', function() {
  var d = parseErApi({ result: 'success', time_last_update_unix: 1790121600, rates: { AMD: 1, USD: 1 / 386, RUB: 1 / 4.7, JPY: 1 / 2.64, IRR: 1 / 0.0092 } })
  assert.equal(d.source, 'er-api')
  var by = {}; d.rates.forEach(function(r) { by[r.iso] = r })
  assert.equal(by.USD.amount, 1); assert.equal(by.USD.rate, 386)
  assert.equal(by.RUB.amount, 1); assert.equal(by.RUB.rate, 4.7)
  assert.equal(by.JPY.amount, 1); assert.equal(by.JPY.rate, 2.64)
  assert.equal(by.IRR.amount, 1000); assert.equal(by.IRR.rate, 9.2)
  assert.throws(function() { parseErApi({ result: 'error' }) })
})
