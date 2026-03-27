import React, { useState, useMemo } from 'react'
import { useLoan, generateAmortization } from '../context/LoanContext'
import Sidebar from '../components/Sidebar'
import { t } from '../i18n/labels'

const SYMBOL = '֏'
const PER_PAGE = 12

export default function SchedulePage({ language }) {
  const { schedule, loanState, monthlyPayment, totalInterest, addExtraPayment, extraPayments } = useLoan()
  const [extraAmount, setExtraAmount] = useState('')
  const [extraMonth, setExtraMonth] = useState(1)
  const [page, setPage] = useState(1)

  const baseSchedule = useMemo(
    () => generateAmortization(loanState.amount, loanState.rate, loanState.term, []).schedule,
    [loanState]
  )

  const baseInterest = baseSchedule.reduce((s, r) => s + r.interest, 0)
  const monthsSaved = Math.max(0, baseSchedule.length - schedule.length)
  const interestSaved = Math.max(0, baseInterest - totalInterest)

  const totalPages = Math.ceil(schedule.length / PER_PAGE)
  const pageRows = schedule.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleAdd = () => {
    if (!extraAmount || Number(extraAmount) <= 0) return
    addExtraPayment(Number(extraMonth), Number(extraAmount))
    setExtraAmount('')
  }

  const makePoints = (sc) => {
    if (sc.length < 2) return ''
    const maxB = loanState.amount
    return sc.map((row, i) => {
      const x = (i / (sc.length - 1)) * 400
      const y = 100 - (row.balance / maxB) * 100
      return `${x},${y}`
    }).join(' ')
  }

  return (
    <div className="flex pt-20 min-h-screen">
      <Sidebar language={language} />
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-5xl mx-auto overflow-x-hidden">
        <header className="mb-10">
          <h1 className="font-headline text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
            {t(language, 'schedule', 'title')}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            {t(language, 'schedule', 'desc')}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Early payment form */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-blue-700 text-3xl">speed</span>
              <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-slate-100">
                {t(language,'schedule','addEarly')}
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Month #</label>
                <input
                  type="number" min={1} max={loanState.term}
                  value={extraMonth}
                  onChange={e => setExtraMonth(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 font-headline font-bold text-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-700 outline-none border-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {t(language,'schedule','amount')}
                </label>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-4 gap-2">
                  <span className="text-slate-400 text-lg">{SYMBOL}</span>
                  <input
                    type="number" min={1}
                    value={extraAmount}
                    onChange={e => setExtraAmount(e.target.value)}
                    placeholder="500000"
                    className="flex-1 bg-transparent border-none outline-none font-headline font-bold text-xl text-slate-900 dark:text-white py-3"
                  />
                </div>
              </div>
              <button
                onClick={handleAdd}
                className="w-full py-4 bg-blue-700 text-white rounded-xl font-headline font-bold hover:bg-blue-800 active:scale-95 transition-all"
              >
                {t(language,'schedule','apply')}
              </button>
              {extraPayments.length > 0 && (
                <div className="space-y-1 pt-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Applied</p>
                  {extraPayments.map(ep => (
                    <div key={ep.month} className="flex justify-between text-sm bg-emerald-50 dark:bg-green-900/20 rounded-lg px-3 py-2">
                      <span className="text-slate-700 dark:text-slate-300">Month {ep.month}</span>
                      <span className="font-bold text-emerald-600 dark:text-green-400">{SYMBOL}{ep.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Savings forecast */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <h2 className="font-headline text-xl font-bold text-slate-900 dark:text-slate-100 mb-5">Savings Forecast</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Months Saved</div>
                <div className="text-3xl font-headline font-extrabold text-blue-700 dark:text-blue-400">
                  {monthsSaved > 0 ? monthsSaved : '-'}
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Interest Saved</div>
                <div className="text-2xl font-headline font-extrabold text-emerald-600 dark:text-green-400">
                  {interestSaved > 0 ? SYMBOL + Math.round(interestSaved).toLocaleString() : '-'}
                </div>
              </div>
            </div>
            <svg className="w-full" height="110" viewBox="0 0 400 100" preserveAspectRatio="none">
              <polyline points={makePoints(baseSchedule)} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5" />
              <polyline points={makePoints(schedule)} fill="none" stroke="#1d4ed8" strokeWidth="3" />
            </svg>
            <div className="flex gap-6 mt-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-5 h-0.5 bg-slate-300 inline-block" /> Original</span>
              <span className="flex items-center gap-1"><span className="w-5 h-0.5 bg-blue-700 inline-block" /> With extra payments</span>
            </div>
          </div>
        </div>

        {/* Full amortization table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="font-headline font-bold text-slate-900 dark:text-slate-100">Full Amortization Schedule</h2>
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {schedule.length} months
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {['#', 'Date', t(language,'schedule','payment'), 'Principal', 'Interest', t(language,'schedule','balance')].map((h, i) => (
                    <th key={i} className={`px-5 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${
                      i > 1 ? 'text-right' : 'text-left'
                    }`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.map(row => (
                  <tr
                    key={row.month}
                    className={`border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors ${
                      row.extra > 0 ? 'bg-emerald-50/50 dark:bg-green-900/10' : ''
                    }`}
                  >
                    <td className="px-5 py-4 font-bold text-blue-700 dark:text-blue-400 text-xs">{row.month}</td>
                    <td className="px-5 py-4 text-slate-400 dark:text-slate-500">{row.label}</td>
                    <td className="px-5 py-4 text-right font-mono text-slate-800 dark:text-slate-200">{SYMBOL}{Math.round(row.payment).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono text-blue-700 dark:text-blue-400">{SYMBOL}{Math.round(row.principal).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono text-emerald-600 dark:text-green-400">{SYMBOL}{Math.round(row.interest).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-slate-900 dark:text-white">{SYMBOL}{Math.round(row.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="flex items-center gap-1 text-sm font-bold text-blue-700 disabled:opacity-30"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span> Prev
              </button>
              <span className="text-xs text-slate-400">Page {page} / {totalPages}</span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="flex items-center gap-1 text-sm font-bold text-blue-700 disabled:opacity-30"
              >
                Next <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
