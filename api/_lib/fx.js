// Official exchange rates of the Central Bank of Armenia (CBA).
//
// Primary source: CBA web service api.cba.am/exchangerates.asmx
// (SOAP method ExchangeRatesLatest — AMD per `amount` units of a currency,
// plus the change from the previous rate). If it is unreachable, a public
// market reference (open.er-api.com) is used and labelled as such.
//
// Result: { date: 'YYYY-MM-DD', prevDate?, source: 'cba' | 'er-api',
//           rates: [{ iso, amount, rate, diff? }] }   rate = AMD per `amount`

var CBA_URL = process.env.FX_CBA_URL || 'https://api.cba.am/exchangerates.asmx' // override for local testing
var ER_URL = 'https://open.er-api.com/v6/latest/AMD'

// Main currencies first, the rest alphabetically.
export var FX_ORDER = ['USD', 'EUR', 'RUB', 'GBP', 'GEL', 'CHF', 'CNY', 'AED', 'JPY', 'CAD', 'UAH', 'KZT', 'IRR', 'TRY']
// Currencies shown when only the market fallback is available.
var FALLBACK_CODES = FX_ORDER.concat(['AUD', 'BYN', 'CZK', 'DKK', 'HKD', 'INR', 'KGS', 'KRW', 'NOK', 'PLN', 'SEK', 'SGD', 'UZS'])

function tag(xml, name) {
  var m = new RegExp('<(?:\\w+:)?' + name + '>([^<]*)</(?:\\w+:)?' + name + '>').exec(xml)
  return m ? m[1].trim() : ''
}

function sortRates(rates) {
  return rates.sort(function(a, b) {
    var ia = FX_ORDER.indexOf(a.iso), ib = FX_ORDER.indexOf(b.iso)
    if (ia < 0) ia = 999
    if (ib < 0) ib = 999
    return ia - ib || (a.iso < b.iso ? -1 : 1)
  })
}

// Parses the SOAP (or plain asmx XML) response of ExchangeRatesLatest.
export function parseCba(xml) {
  var rates = []
  var re = /<(?:\w+:)?ExchangeRate>([\s\S]*?)<\/(?:\w+:)?ExchangeRate>/g, m
  while ((m = re.exec(String(xml || '')))) {
    var iso = tag(m[1], 'ISO').toUpperCase()
    var amount = Number(tag(m[1], 'Amount')) || 1
    var rate = Number(tag(m[1], 'Rate'))
    var diff = Number(tag(m[1], 'Difference'))
    if (/^[A-Z]{3}$/.test(iso) && rate > 0) rates.push({ iso: iso, amount: amount, rate: rate, diff: isFinite(diff) ? diff : 0 })
  }
  if (!rates.length) throw new Error('cba: no rates in response')
  return {
    date: tag(xml, 'CurrentDate').slice(0, 10),
    prevDate: tag(xml, 'PreviousDate').slice(0, 10) || undefined,
    source: 'cba',
    rates: sortRates(rates)
  }
}

// Parses open.er-api.com (base AMD: units of currency per 1 AMD).
export function parseErApi(j) {
  if (!j || j.result !== 'success' || !j.rates) throw new Error('er-api: bad response')
  var rates = []
  FALLBACK_CODES.forEach(function(iso) {
    var perAmd = Number(j.rates[iso])
    if (!(perAmd > 0)) return
    var per1 = 1 / perAmd
    // Weak currencies are quoted per 100/1000 units, like the CBA does.
    var amount = per1 < 0.1 ? 1000 : per1 < 1 ? 100 : 1
    rates.push({ iso: iso, amount: amount, rate: Math.round(per1 * amount * 100) / 100 })
  })
  var d = j.time_last_update_unix ? new Date(j.time_last_update_unix * 1000) : new Date()
  return { date: d.toISOString().slice(0, 10), source: 'er-api', rates: sortRates(rates) }
}

async function fromCba() {
  var body = '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soap:Body><ExchangeRatesLatest xmlns="http://www.cba.am/" /></soap:Body></soap:Envelope>'
  var r = await fetch(CBA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/xml; charset=utf-8', SOAPAction: '"http://www.cba.am/ExchangeRatesLatest"' },
    body: body,
    signal: AbortSignal.timeout(8000)
  })
  if (!r.ok) throw new Error('cba HTTP ' + r.status)
  return parseCba(await r.text())
}

async function fromErApi() {
  var r = await fetch(ER_URL, { signal: AbortSignal.timeout(8000) })
  if (!r.ok) throw new Error('er-api HTTP ' + r.status)
  return parseErApi(await r.json())
}

export async function fetchRates() {
  try { return await fromCba() } catch (e) {
    console.warn('[fx] CBA unavailable, using market reference:', e && e.message)
    return await fromErApi()
  }
}
