// Deposit / savings projection, month by month.
//   initial   starting amount
//   monthly   top-up added at the end of every month
//   rate      nominal annual rate, %
//   months    term
//   cap       'monthly' | 'quarterly' | 'end' — when accrued interest is added
//   taxPct    tax withheld from interest when it is paid out/capitalised, %
export function projectDeposit(p) {
  var r = (Number(p.rate) || 0) / 100 / 12
  var months = Math.max(1, Math.round(Number(p.months) || 1))
  var tax = Math.min(100, Math.max(0, Number(p.taxPct) || 0)) / 100
  var every = p.cap === 'quarterly' ? 3 : p.cap === 'end' ? months : 1
  var balance = Number(p.initial) || 0
  var contributed = balance
  var accrued = 0, gross = 0, taxPaid = 0
  var rows = []
  for (var m = 1; m <= months; m++) {
    accrued += balance * r
    if (m % every === 0 || m === months) {
      var t = accrued * tax
      gross += accrued; taxPaid += t
      balance += accrued - t
      accrued = 0
    }
    if (m < months || p.topUpLastMonth) {
      balance += Number(p.monthly) || 0
      contributed += Number(p.monthly) || 0
    }
    rows.push({ month: m, balance: balance, contributed: contributed })
  }
  var net = gross - taxPaid
  // Effective annual yield of the chosen capitalisation, before tax.
  var perYear = 12 / every
  var eff = every >= months ? (Number(p.rate) || 0) : (Math.pow(1 + (Number(p.rate) || 0) / 100 / perYear, perYear) - 1) * 100
  return { rows: rows, final: balance, contributed: contributed, gross: gross, tax: taxPaid, net: net, effective: eff }
}
