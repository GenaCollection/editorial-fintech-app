// Loan currencies: symbol, slider bounds, a sensible default amount and the
// monthly extra payments used in early-repayment scenarios.
// Armenian banks lend mostly in drams, but also in USD, EUR and RUB.

export var LOAN_CURRENCIES = {
  AMD: { sym: '֏', min: 100000, max: 100000000, step: 100000, def: 5000000, extras: [50000, 100000, 200000, 500000] },
  USD: { sym: '$', min: 500,    max: 500000,    step: 500,    def: 15000,   extras: [100, 250, 500, 1000] },
  EUR: { sym: '€', min: 500,    max: 500000,    step: 500,    def: 15000,   extras: [100, 250, 500, 1000] },
  RUB: { sym: '₽', min: 10000,  max: 50000000,  step: 10000,  def: 1000000, extras: [5000, 10000, 20000, 50000] }
}
export var CURRENCY_CODES = Object.keys(LOAN_CURRENCIES)

export function currencyInfo(cur) { return LOAN_CURRENCIES[cur] || LOAN_CURRENCIES.AMD }
export function currencySymbol(cur) { return currencyInfo(cur).sym }

// The PDF font has no ₽ glyph, so the code is written out there.
export function pdfSymbol(cur) { return cur === 'RUB' ? 'RUB ' : currencySymbol(cur) }

export function formatMoney(n, cur) { return currencySymbol(cur) + Math.round(n).toLocaleString() }

export function clampAmount(amount, cur) {
  var c = currencyInfo(cur)
  return Math.min(c.max, Math.max(c.min, amount))
}

// AMD per one unit of `cur` from CBA rates ({ rates: [{ iso, amount, rate }] }).
export function amdPerUnit(fx, cur) {
  if (cur === 'AMD') return 1
  var list = fx && fx.rates
  if (!list) return null
  for (var i = 0; i < list.length; i++) if (list[i].iso === cur) return list[i].rate / list[i].amount
  return null
}

// Converts an amount between loan currencies at CBA rates and rounds it to
// the slider step of the target currency; null when a rate is missing.
export function convertAmount(amount, from, to, fx) {
  if (from === to) return amount
  var a = amdPerUnit(fx, from), b = amdPerUnit(fx, to)
  if (!a || !b) return null
  var step = currencyInfo(to).step
  return clampAmount(Math.round(amount * a / b / step) * step, to)
}

// Short label for slider ends: 100K, 100M.
export function shortAmount(n, cur) {
  var v = n >= 1e6 ? (n / 1e6) + 'M' : n >= 1e3 ? (n / 1e3) + 'K' : String(n)
  return currencySymbol(cur) + v
}
