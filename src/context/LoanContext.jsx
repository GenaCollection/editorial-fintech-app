import React, { createContext, useContext, useState, useMemo } from 'react'

export const LoanContext = createContext(null)
export const useLoan = () => useContext(LoanContext)

export const generateAmortization = (amount, rate, term, extraPayments = []) => {
  const r = rate / 100 / 12
  const monthlyPayment = r === 0
    ? amount / term
    : (amount * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1)

  const schedule = []
  let balance = amount
  const startDate = new Date()
  startDate.setDate(1)

  for (let i = 1; i <= term && balance > 0.01; i++) {
    const interestPayment = balance * r
    const principalPayment = Math.min(monthlyPayment - interestPayment, balance)
    const extra = extraPayments.find(ep => ep.month === i)?.amount || 0
    balance = Math.max(0, balance - principalPayment - extra)

    const date = new Date(startDate)
    date.setMonth(startDate.getMonth() + i)
    const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

    schedule.push({ month: i, label, payment: monthlyPayment, principal: principalPayment, interest: interestPayment, extra, balance })
    if (balance <= 0.01) break
  }
  return { schedule, monthlyPayment }
}

export const LoanProvider = ({ children }) => {
  const [loanState, setLoanState] = useState({ amount: 5000000, rate: 12, term: 24 })
  const [extraPayments, setExtraPayments] = useState([])
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.className = next
      return next
    })
  }

  const { schedule, monthlyPayment } = useMemo(
    () => generateAmortization(loanState.amount, loanState.rate, loanState.term, extraPayments),
    [loanState, extraPayments]
  )

  const totalInterest = useMemo(
    () => schedule.reduce((sum, row) => sum + row.interest, 0),
    [schedule]
  )

  const addExtraPayment = (month, amount) => {
    setExtraPayments(prev => [...prev.filter(ep => ep.month !== month), { month: Number(month), amount: Number(amount) }])
  }

  return (
    <LoanContext.Provider value={{ loanState, setLoanState, schedule, monthlyPayment, totalInterest, extraPayments, addExtraPayment, theme, toggleTheme }}>
      {children}
    </LoanContext.Provider>
  )
}
