import React, { createContext, useContext, useState, useMemo } from 'react'

const LoanContext = createContext(null)

export function useLoan() {
  return useContext(LoanContext)
}

export function generateAmortization(amount, rate, term, extraPayments) {
  var eps = extraPayments || []
  var r = rate / 100 / 12
  var mp = r === 0
    ? amount / term
    : (amount * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1)

  var schedule = []
  var balance = amount
  var startDate = new Date()
  startDate.setDate(1)

  for (var i = 1; i <= term && balance > 0.01; i++) {
    var interest = balance * r
    var principal = Math.min(mp - interest, balance)
    var extra = 0
    for (var j = 0; j < eps.length; j++) {
      if (eps[j].month === i) { extra = eps[j].amount; break }
    }
    balance = Math.max(0, balance - principal - extra)

    var d = new Date(startDate)
    d.setMonth(startDate.getMonth() + i)
    var label = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

    schedule.push({
      month: i,
      label: label,
      payment: mp,
      principal: principal,
      interest: interest,
      extra: extra,
      balance: balance
    })
    if (balance <= 0.01) break
  }
  return { schedule: schedule, monthlyPayment: mp }
}

export function LoanProvider(props) {
  var children = props.children
  var initialState = { amount: 5000000, rate: 12, term: 24 }
  var loanStateArr = useState(initialState)
  var loanState = loanStateArr[0]
  var setLoanState = loanStateArr[1]

  var extraArr = useState([])
  var extraPayments = extraArr[0]
  var setExtraPayments = extraArr[1]

  var computed = useMemo(function() {
    return generateAmortization(loanState.amount, loanState.rate, loanState.term, extraPayments)
  }, [loanState, extraPayments])

  var schedule = computed.schedule
  var monthlyPayment = computed.monthlyPayment

  var totalInterest = useMemo(function() {
    var sum = 0
    for (var i = 0; i < schedule.length; i++) { sum += schedule[i].interest }
    return sum
  }, [schedule])

  function addExtraPayment(month, amount) {
    setExtraPayments(function(prev) {
      var filtered = prev.filter(function(ep) { return ep.month !== Number(month) })
      return filtered.concat([{ month: Number(month), amount: Number(amount) }])
    })
  }

  var value = {
    loanState: loanState,
    setLoanState: setLoanState,
    schedule: schedule,
    monthlyPayment: monthlyPayment,
    totalInterest: totalInterest,
    extraPayments: extraPayments,
    addExtraPayment: addExtraPayment
  }

  return React.createElement(LoanContext.Provider, { value: value }, children)
}
