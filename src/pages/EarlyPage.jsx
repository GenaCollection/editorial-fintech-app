import React, { useMemo } from 'react'
import { useLoan, generateAmortization } from '../context/LoanContext'
import Sidebar from '../components/Sidebar'

const SYM = '\u058f'

export default function EarlyPage() {
  const { loanState, monthlyPayment, totalInterest, schedule } = useLoan()

  const scenarios = useMemo(() =>
    [50000, 100000, 200000].map(extra => {
      const eps = Array.from({ length: loanState.term }, (_, i) => ({ month: i + 1, amount: extra }))
      const { schedule: sc } = generateAmortization(loanState.amount, loanState.rate, loanState.term, eps)
      const interest = sc.reduce((s, r) => s + r.interest, 0)
      return {
        extra,
        months: sc.length,
        monthsSaved: Math.max(0, schedule.length - sc.length),
        saved: Math.max(0, totalInterest - interest),
      }
    }),
    [loanState, totalInterest, schedule]
  )

  const kpis = [
    { label: 'Loan Amount',     value: SYM + loanState.amount.toLocaleString(),          icon: 'payments' },
    { label: 'Monthly Payment', value: SYM + Math.round(monthlyPayment).toLocaleString(), icon: 'calendar_today' },
    { label: 'Total Interest',  value: SYM + Math.round(totalInterest).toLocaleString(),  icon: 'percent' },
    { label: 'Total Months',    value: schedule.length,                                   icon: 'format_list_numbered' },
  ]

  return (
    <div className="flex pt-16 min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">Early Repayment Intelligence</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Understand how every extra payment accelerates your loan maturity.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {kpis.map(item => (
            <div key={item.label} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-blue-700 mb-2 block">{item.icon}</span>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">{item.value}</div>
              <div className="text-xs text-slate-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-100">Extra Payment Scenarios</h2>
            <p className="text-xs text-slate-400 mt-1">What if you add a fixed extra amount every month?</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {['Extra monthly','New Term','Term reduction','Interest saved'].map((h, i) => (
                    <th key={h} className={`px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${i > 0 ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scenarios.map((sc, i) => (
                  <tr key={i} className="border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">+{SYM}{sc.extra.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-slate-700 dark:text-slate-300">{sc.months} mo.</td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 font-bold px-2 py-1 rounded-lg text-xs">-{sc.monthsSaved} mo.</span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">
                      {sc.saved > 0 ? SYM + Math.round(sc.saved).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-emerald-50 dark:bg-green-900/20 p-8 rounded-2xl flex flex-col justify-between h-48">
            <span className="material-symbols-outlined text-emerald-600 text-4xl">verified</span>
            <div>
              <p className="text-slate-800 font-black text-xl">Lowest APR Guarantee</p>
              <p className="text-slate-500 text-sm mt-1">Institutional pricing applied.</p>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl flex flex-col justify-between h-48">
            <span className="material-symbols-outlined text-blue-700 text-4xl">support_agent</span>
            <div>
              <p className="text-slate-900 dark:text-slate-100 font-bold">Talk to a Loan Specialist</p>
              <button className="mt-2 text-xs font-bold text-blue-700 hover:underline">Contact us</button>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950 p-8 rounded-2xl flex flex-col justify-between h-48">
            <span className="material-symbols-outlined text-blue-700 text-4xl">trending_up</span>
            <div>
              <p className="text-blue-900 dark:text-blue-200 font-black text-xl">Market Analytics</p>
              <p className="text-blue-600 text-sm mt-1">Real-time rate tracking.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
