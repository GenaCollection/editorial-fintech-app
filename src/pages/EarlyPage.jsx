import React, { useMemo } from 'react'
import { useLoan, generateAmortization } from '../context/LoanContext.jsx'
import Sidebar from '../components/Sidebar.jsx'

var SYM = '\u058f'

export default function EarlyPage() {
  var ctx = useLoan()
  var loanState = ctx.loanState
  var monthlyPayment = ctx.monthlyPayment
  var totalInterest = ctx.totalInterest
  var schedule = ctx.schedule

  var scenarios = useMemo(function() {
    return [50000, 100000, 200000].map(function(extra) {
      var eps = []
      for (var i = 1; i <= loanState.term; i++) {
        eps.push({ month: i, amount: extra })
      }
      var res = generateAmortization(loanState.amount, loanState.rate, loanState.term, eps)
      var sc = res.schedule
      var interest = 0
      for (var j = 0; j < sc.length; j++) { interest += sc[j].interest }
      return {
        extra: extra,
        months: sc.length,
        monthsSaved: schedule.length > sc.length ? schedule.length - sc.length : 0,
        saved: totalInterest > interest ? totalInterest - interest : 0
      }
    })
  }, [loanState, totalInterest, schedule])

  var kpis = [
    { label: 'Loan Amount',     value: SYM + loanState.amount.toLocaleString(),          icon: 'payments' },
    { label: 'Monthly Payment', value: SYM + Math.round(monthlyPayment).toLocaleString(), icon: 'calendar_today' },
    { label: 'Total Interest',  value: SYM + Math.round(totalInterest).toLocaleString(),  icon: 'percent' },
    { label: 'Total Months',    value: String(schedule.length),                           icon: 'format_list_numbered' }
  ]

  return (
    <div className="flex pt-16 min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">Early Repayment</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">See how extra payments reduce your loan term and interest.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {kpis.map(function(item) {
            return (
              <div key={item.label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                <span className="material-symbols-outlined text-blue-700 mb-2 block">{item.icon}</span>
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">{item.value}</div>
                <div className="text-xs text-slate-400 mt-1">{item.label}</div>
              </div>
            )
          })}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-100">Extra Payment Scenarios</h2>
            <p className="text-xs text-slate-400 mt-1">Fixed extra payment added every month</p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">Extra / month</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase">New Term</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase">Saved</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase">Interest saved</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map(function(sc, i) {
                return (
                  <tr key={i} className="border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/20">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">+{SYM}{sc.extra.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">{sc.months} mo.</td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 font-bold px-2 py-1 rounded text-xs">-{sc.monthsSaved} mo.</span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">
                      {sc.saved > 0 ? (SYM + Math.round(sc.saved).toLocaleString()) : '-'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-emerald-50 dark:bg-green-900/20 p-8 rounded-2xl">
            <span className="material-symbols-outlined text-emerald-600 text-4xl mb-4 block">verified</span>
            <p className="font-black text-xl text-slate-800">Lowest APR Guarantee</p>
            <p className="text-slate-500 text-sm mt-1">Institutional pricing applied.</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl">
            <span className="material-symbols-outlined text-blue-700 text-4xl mb-4 block">support_agent</span>
            <p className="font-bold text-slate-900 dark:text-slate-100">Talk to a Loan Specialist</p>
            <button className="mt-2 text-xs font-bold text-blue-700 hover:underline">Contact us</button>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950 p-8 rounded-2xl">
            <span className="material-symbols-outlined text-blue-700 text-4xl mb-4 block">trending_up</span>
            <p className="font-black text-xl text-blue-900 dark:text-blue-200">Market Analytics</p>
            <p className="text-blue-600 text-sm mt-1">Real-time rate tracking.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
