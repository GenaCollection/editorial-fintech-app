import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { generateAmortization, calcAPR } from '../lib/loan.js'

// Loan math lives in src/lib/loan.js; re-exported for existing imports.
export { generateAnnuity, generateDifferentiated, generateAmortization, calcAPR } from '../lib/loan.js'

var LoanContext = createContext(null)

export function useLoan() { return useContext(LoanContext) }

// Applies ?amount=&rate=&term=&type= (share links, widget, landing pages) to
// the shared loan state once, when the page mounts.
export function useLoanParamsFromUrl() {
  var setLoanState = useContext(LoanContext).setLoanState
  var searchParams = useSearchParams()[0]
  useEffect(function() {
    var a = Number(searchParams.get('amount')); var r = Number(searchParams.get('rate'))
    var m = Number(searchParams.get('term'));   var tp = searchParams.get('type')
    if (a > 0 || r > 0 || m > 0) {
      setLoanState(function(prev) {
        return {
          amount:    a > 0 ? Math.min(100000000, Math.max(100000, a)) : prev.amount,
          rate:      r > 0 ? Math.min(50, Math.max(0.1, r))           : prev.rate,
          term:      m > 0 ? Math.min(360, Math.max(1, Math.round(m))) : prev.term,
          loanType:  tp === 'differentiated' ? 'differentiated'       : prev.loanType,
          fee: prev.fee, insurance: prev.insurance, startDate: prev.startDate
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function LoanProvider(props) {
  var initialState = {
    amount: 5000000, rate: 12, term: 24,
    loanType: 'annuity',
    fee: 0,
    insurance: 0,
    startDate: new Date().toISOString().slice(0, 7)
  }

  var lsArr = useState(initialState)
  var loanState = lsArr[0]
  var setLoanState = lsArr[1]

  var epArr = useState([])
  var extraPayments = epArr[0]
  var setExtraPayments = epArr[1]

  var computed = useMemo(function() {
    return generateAmortization(
      loanState.amount, loanState.rate, loanState.term,
      extraPayments, loanState.loanType, loanState.startDate
    )
  }, [loanState, extraPayments])

  var schedule = computed.schedule
  var monthlyPayment = computed.monthlyPayment

  var totalInterest = useMemo(function() {
    var s = 0; for (var i = 0; i < schedule.length; i++) s += schedule[i].interest; return s
  }, [schedule])

  var totalPayment = useMemo(function() {
    var s = 0; for (var i = 0; i < schedule.length; i++) s += schedule[i].payment; return s
  }, [schedule])

  var apr = useMemo(function() {
    return calcAPR(loanState.amount, loanState.rate, loanState.term, loanState.fee, loanState.insurance)
  }, [loanState])

  function addExtraPayment(month, amount) {
    setExtraPayments(function(prev) {
      var filtered = prev.filter(function(ep) { return ep.month !== Number(month) })
      if (Number(amount) > 0) return filtered.concat([{ month: Number(month), amount: Number(amount) }])
      return filtered
    })
  }

  function removeExtraPayment(month) {
    setExtraPayments(function(prev) { return prev.filter(function(ep) { return ep.month !== Number(month) }) })
  }

  return React.createElement(LoanContext.Provider, {
    value: {
      loanState, setLoanState, schedule, monthlyPayment,
      totalInterest, totalPayment, extraPayments,
      addExtraPayment, removeExtraPayment, apr
    }
  }, props.children)
}
