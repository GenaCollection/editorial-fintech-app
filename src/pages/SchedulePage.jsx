import React, { useState, useMemo } from 'react'
import { useLoan, generateAmortization } from '../context/LoanContext'
import Sidebar from '../components/Sidebar'

const SYM = '\u058f'
const PER = 12

export default function SchedulePage() {
  const { schedule, loanState, totalInterest, addExtraPayment, extraPayments } = useLoan()
  const [extraAmount, setExtraAmount] = useState('')
  const [extraMonth, setExtraMonth] = useState(1)
  const [page, setPage] = useState(1)

  const base = useMemo(() =>
    generateAmortization(loanState.amount, loanState.rate, loanState.term, []).schedule,
    [loanState]
  )
  const baseInterest = base.reduce((s, r) => s + r.interest, 0)
  const monthsSaved = Math.max(0, base.length - schedule.length)
  const interestSaved = Math.max(0, baseInterest - totalInterest)
  const totalPages = Math.ceil(schedule.length / PER)
  const rows = schedule.slice((page - 1) * PER, page * PER)

  const handleAdd = () => {
    if (!extraAmount || Number(extraAmount) <= 0) return
    addExtraPayment(Number(extraMonth), Number(extraAmount))
    setExtraAmount('')
  }

  const pts = (sc) => {
    if (sc.length < 2) return ''
    return sc.map((r, i) => `${(i / (sc.length - 1)) * 400},${100 - (r.balance / loanState.amount) * 100}`).join(' ')
  }

  return (
    <div className="flex pt-16 min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-5xl mx-auto overflow-x-hidden">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">Payment Schedule</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">Analyze your full amortization timeline.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-6">Add Early Payment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Month #</label>
                <input type="number" min={1} max={loanState.term} value={extraMonth}
                  onChange={e => setExtraMonth(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white outline-none border-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Amount ({SYM})</label>
                <input type="number" min={1} value={extraAmount} onChange={e => setExtraAmount(e.target.value)}
                  placeholder="500000"
                  className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white outline-none border-none" />
              </div>
              <button onClick={handleAdd}
                className="w-full py-4 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 active:scale-95 transition-all">
                Apply to Schedule
              </button>
              {extraPayments.length > 0 && (
                <div className="space-y-1 pt-2">
                  {extraPayments.map(ep => (
                    <div key={ep.month} className="flex justify-between text-sm bg-emerald-50 dark:bg-green-900/20 rounded-lg px-3 py-2">
                      <span className="text-slate-700 dark:text-slate-300">Month {ep.month}</span>
                      <span className="font-bold text-emerald-600">{SYM}{ep.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-5">Savings Forecast</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Months Saved</div>
                <div className="text-3xl font-extrabold text-blue-700">{monthsSaved > 0 ? monthsSaved : '-'}</div>
              </div>
              <div className="bg-emerald-50 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Interest Saved</div>
                <div className="text-2xl font-extrabold text-emerald-600">
                  {interestSaved > 0 ? SYM + Math.round(interestSaved).toLocaleString() : '-'}
                </div>
              </div>
            </div>
            <svg className="w-full" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
              <polyline points={pts(base)} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5" />
              <polyline points={pts(schedule)} fill="none" stroke="#1d4ed8" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 dark:text-slate-100">Full Amortization Schedule</h2>
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{schedule.length} months</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {['#','Date','Payment','Principal','Interest','Balance'].map((h, i) => (
                    <th key={i} className={`px-5 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${i > 1 ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.month} className={`border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/30 transition-colors ${row.extra > 0 ? 'bg-emerald-50/50 dark:bg-green-900/10' : ''}`}>
                    <td className="px-5 py-4 font-bold text-blue-700 text-xs">{row.month}</td>
                    <td className="px-5 py-4 text-slate-400">{row.label}</td>
                    <td className="px-5 py-4 text-right font-mono text-slate-800 dark:text-slate-200">{SYM}{Math.round(row.payment).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono text-blue-700">{SYM}{Math.round(row.principal).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono text-emerald-600">{SYM}{Math.round(row.interest).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold dark:text-white">{SYM}{Math.round(row.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="text-sm font-bold text-blue-700 disabled:opacity-30">Prev</button>
              <span className="text-xs text-slate-400">Page {page} / {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                className="text-sm font-bold text-blue-700 disabled:opacity-30">Next</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
