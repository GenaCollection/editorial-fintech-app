// Loan math shared by the app, the SSR prerender and the tests (no React).

// ── Annuity schedule ──────────────────────────────────────────────────────────
export function generateAnnuity(amount, rate, term, extraPayments, startDate) {
  var eps = extraPayments || []
  var r = rate / 100 / 12
  var mp = r === 0
    ? amount / term
    : (amount * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1)

  var schedule = []
  var balance = amount
  var sd = startDate ? new Date(startDate) : new Date()
  sd.setDate(1)

  for (var i = 1; i <= term && balance > 0.01; i++) {
    var interest = balance * r
    var principal = Math.min(mp - interest, balance)
    var extra = 0
    for (var j = 0; j < eps.length; j++) {
      if (eps[j].month === i) { extra = Number(eps[j].amount); break }
    }
    principal = Math.min(principal, balance)
    balance = Math.max(0, balance - principal - extra)
    var d = new Date(sd); d.setMonth(sd.getMonth() + i)
    schedule.push({
      month: i, label: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      year: d.getFullYear(), monthIndex: d.getMonth(),
      payment: mp + extra, principal: principal, interest: interest, extra: extra, balance: balance
    })
    if (balance <= 0.01) break
  }
  return { schedule: schedule, monthlyPayment: mp, type: 'annuity' }
}

// ── Differentiated schedule ───────────────────────────────────────────────────
export function generateDifferentiated(amount, rate, term, extraPayments, startDate) {
  var eps = extraPayments || []
  var r = rate / 100 / 12
  var principalPart = amount / term
  var schedule = []
  var balance = amount
  var sd = startDate ? new Date(startDate) : new Date()
  sd.setDate(1)

  for (var i = 1; i <= term && balance > 0.01; i++) {
    var interest = balance * r
    var principal = Math.min(principalPart, balance)
    var extra = 0
    for (var j = 0; j < eps.length; j++) {
      if (eps[j].month === i) { extra = Number(eps[j].amount); break }
    }
    balance = Math.max(0, balance - principal - extra)
    var d = new Date(sd); d.setMonth(sd.getMonth() + i)
    schedule.push({
      month: i, label: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      year: d.getFullYear(), monthIndex: d.getMonth(),
      payment: principal + interest + extra, principal: principal, interest: interest, extra: extra, balance: balance
    })
    if (balance <= 0.01) break
  }
  var firstPayment = schedule.length > 0 ? schedule[0].payment : 0
  return { schedule: schedule, monthlyPayment: firstPayment, type: 'differentiated' }
}

// ── Universal dispatcher ──────────────────────────────────────────────────────
export function generateAmortization(amount, rate, term, extraPayments, loanType, startDate) {
  if (loanType === 'differentiated') {
    return generateDifferentiated(amount, rate, term, extraPayments, startDate)
  }
  return generateAnnuity(amount, rate, term, extraPayments, startDate)
}

// ── APR calculation ───────────────────────────────────────────────────────────
export function calcAPR(amount, rate, term, fee, insurance) {
  var f = fee || 0
  var ins = insurance || 0
  var r = rate / 100 / 12
  var mp = r === 0
    ? amount / term
    : (amount * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1)
  var totalCost = mp * term + f + ins * term
  var netReceived = amount - f
  if (netReceived <= 0) return rate
  // Newton-Raphson IRR approach
  var guess = rate / 100 / 12
  for (var iter = 0; iter < 100; iter++) {
    var pv = 0; var dpv = 0
    for (var k = 1; k <= term; k++) {
      var disc = Math.pow(1 + guess, k)
      pv += (mp + ins) / disc
      dpv -= k * (mp + ins) / (disc * (1 + guess))
    }
    var fx = pv - netReceived
    if (Math.abs(fx) < 0.0001) break
    guess = guess - fx / dpv
  }
  return Math.max(0, guess * 12 * 100)
}
