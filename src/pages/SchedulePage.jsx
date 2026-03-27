import React, { useState, useMemo } from 'react'
import { useLoan, generateAmortization } from '../context/LoanContext'
import Sidebar from '../components/Sidebar'
import { t } from '../i18n/labels'

export default function SchedulePage({ language }) {
  const { schedule, loanState, monthlyPayment, totalInterest, addExtraPayment, extraPayments } = useLoan()
  const [extraAmount, setExtraAmount] = useState('')
  const [extraMonth, setExtraMonth] = useState(1)
  const [page, setPage] = useState(1)
  const perPage = 12
  const symbol = '֏'

  const baseSchedule = useMemo(() =>
    generateAmortization(loanState.amount, loanState.rate, loanState.term, []).schedule,
    [loanState]
  )

  const monthsSaved = baseSchedule.length - schedule.length
  const baseInterest = baseSchedule.reduce((s, r) => s + r.interest, 0)
  const interestSaved = Math.max(0, baseInterest - totalInterest)

  const totalPages = Math.ceil(schedule.length / perPage)
  const pageRows = schedule.slice((page - 1) * perPage, page * perPage)

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
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-7xl mx-auto overflow-x-hidden">
        <header className="mb-10">
          <h1 className="font-headline text-4xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight mb-2">
            {t(language,'schedule','title')}
          </h1>
          <p className="text-lg text-on-surface-variant dark:text-slate-400">{t(language,'schedule','desc')}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Early payment */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">speed</span>
              <h2 className="font-headline text-xl font-bold text-on-surface dark:text-slate-100">{t(language,'schedule','addEarly')}</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Month #</label>
                <input type="number" min={1} max={loanState.term} value={extraMonth}
                  onChange={e => setExtraMonth(e.target.value)}
                  className="w-full bg-surface-container-low dark:bg-slate-800 border-none rounded-xl px-4 py-3 font-headline font-bold text-lg text-on-surface dark:text-white focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">{t(language,'schedule','amount')}</label>
                <div className="flex items-center bg-surface-container-low dark:bg-slate-800 rounded-xl px-4 gap-2">
                  <span className="text-on-surface-variant text-lg">{symbol}</span>
                  <input type="number" min={1} value={extraAmount} onChange={e => setExtraAmount(e.target.value)}
                    placeholder="500,000"
                    className="flex-1 bg-transparent border-none outline-none font-headline font-bold text-xl text-on-surface dark:text-white py-3" />
                </div>
              </div>
              <button onClick={handleAdd}
                className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline font-bold hover:brightness-110 active:scale-[0.98] transition-all">
                {t(language,'schedule','apply')}
              </button>
              {extraPayments.length > 0 && (
                <div className="space-y-1 pt-2">
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Applied</p>
                  {extraPayments.map(ep => (
                    <div key={ep.month} className="flex justify-between text-sm bg-secondary-container/30 dark:bg-green-900/20 rounded-lg px-3 py-2">
                      <span className="text-on-surface dark:text-slate-300">Month {ep.month}</span>
                      <span className="font-bold text-secondary dark:text-green-400">{symbol}{ep.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Savings forecast */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
            <h2 className="font-headline text-xl font-bold text-on-surface dark:text-slate-100 mb-5">Savings Forecast</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-primary/10 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Months Saved</div>
                <div className="text-3xl font-headline font-extrabold text-primary dark:text-blue-400">{monthsSaved > 0 ? monthsSaved : '—'}</div>
              </div>
              <div className="bg-secondary-container/30 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Interest Saved</div>
                <div className="text-2xl font-headline font-extrabold text-secondary dark:text-green-400">
                  {interestSaved > 0 ? symbol + Math.round(interestSaved).toLocaleString() : '—'}
                </div>
              </div>
            </div>
            <svg className="w-full" height="110" viewBox="0 0 400 100" preserveAspectRatio="none">
              <polyline points={makePoints(baseSchedule)} fill="none" stroke="#c3c6d6" strokeWidth="2" strokeDasharray="5" />
              <polyline points={makePoints(schedule)} fill="none" stroke="#003d9b" strokeWidth="3" />
            </svg>
            <div className="flex gap-6 mt-2 text-[10px] text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="w-5 h-px bg-slate-300 inline-block" /> Original</span>
              <span className="flex items-center gap-1"><span className="w-5 h-px bg-primary inline-block" /> With extra payments</span>
            </div>
          </div>
        </div>

        {/* Full table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="font-headline font-bold text-on-surface dark:text-slate-100">Full Amortization Schedule</h2>
            <span className="text-xs text-on-surface-variant bg-surface-container-low dark:bg-slate-800 px-3 py-1 rounded-full">{schedule.length} months</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-container-low dark:bg-slate-800">
                <tr>
                  {['#', t(language,'schedule','month'), t(language,'schedule','payment'), 'Principal', 'Interest', t(language,'schedule','balance')].map((h,i) => (
                    <th key={h} className={`px-5 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ${i>1?'text-right':'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.map(row => (
                  <tr key={row.month}
                    className={`border-t border-slate-50 dark:border-slate-800 hover:bg-primary-fixed/10 dark:hover:bg-blue-900/10 transition-colors ${
                      row.extra > 0 ? 'bg-secondary-container/20 dark:bg-green-900/10' : ''
                    }`}>
                    <td className="px-5 py-4 font-bold text-primary dark:text-blue-400 text-xs">{row.month}</td>
                    <td className="px-5 py-4 text-on-surface-variant dark:text-slate-400">{row.label}</td>
                    <td className="px-5 py-4 text-right font-mono text-on-surface dark:text-slate-200">{symbol}{Math.round(row.payment).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono text-primary dark:text-blue-400">{symbol}{Math.round(row.principal).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono text-secondary dark:text-green-400">{symbol}{Math.round(row.interest).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold dark:text-white">{symbol}{Math.round(row.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button disabled={page===1} onClick={() => setPage(p=>p-1)}
                className="flex items-center gap-1 text-sm font-bold text-primary disabled:opacity-30">
                <span className="material-symbols-outlined text-sm">chevron_left</span> Prev
              </button>
              <span className="text-xs text-on-surface-variant">Page {page} / {totalPages}</span>
              <button disabled={page===totalPages} onClick={() => setPage(p=>p+1)}
                className="flex items-center gap-1 text-sm font-bold text-primary disabled:opacity-30">
                Next <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
