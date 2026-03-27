import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoan } from '../context/LoanContext'

const SYM = '\u058f'

export default function CalculatorPage() {
  const { loanState, setLoanState, monthlyPayment, totalInterest, schedule } = useLoan()
  const { amount, rate, term } = loanState
  const navigate = useNavigate()

  const clamp = (key, min, max) => (e) => {
    const v = Number(e.target.value)
    setLoanState(prev => ({ ...prev, [key]: Math.max(min, Math.min(max, v || min)) }))
  }
  const slide = (key) => (e) => setLoanState(prev => ({ ...prev, [key]: Number(e.target.value) }))

  const totalPayable = monthlyPayment * term
  const pct = Math.round((amount / totalPayable) * 100)

  return (
    <main className="flex-1 px-6 md:px-12 pt-24 pb-16 max-w-7xl mx-auto w-full">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">Loan Calculator</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">Define your parameters to see your lending projection.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-5 space-y-5">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-7">Loan Parameters</p>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Amount</span>
                <div className="flex items-baseline gap-1">
                  <input type="number" min={100000} max={100000000} step={100000} value={amount}
                    onChange={clamp('amount', 100000, 100000000)}
                    className="w-32 text-right text-2xl font-bold text-slate-900 dark:text-white bg-transparent border-none outline-none p-0" />
                  <span className="text-slate-400">{SYM}</span>
                </div>
              </div>
              <input type="range" min={100000} max={100000000} step={100000} value={amount}
                onChange={slide('amount')} className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700" />
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Interest Rate (APR)</span>
                <div className="flex items-baseline gap-1">
                  <input type="number" min={0.1} max={100} step={0.1} value={rate}
                    onChange={clamp('rate', 0.1, 100)}
                    className="w-20 text-right text-2xl font-bold text-slate-900 dark:text-white bg-transparent border-none outline-none p-0" />
                  <span className="text-slate-400">%</span>
                </div>
              </div>
              <input type="range" min={0.1} max={100} step={0.1} value={rate}
                onChange={slide('rate')} className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loan Term</span>
                <div className="flex items-baseline gap-1">
                  <input type="number" min={1} max={360} value={term}
                    onChange={clamp('term', 1, 360)}
                    className="w-16 text-right text-2xl font-bold text-slate-900 dark:text-white bg-transparent border-none outline-none p-0" />
                  <span className="text-slate-400 text-xs">mos.</span>
                </div>
              </div>
              <input type="range" min={1} max={360} value={term}
                onChange={slide('term')} className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700 mb-4" />
              <div className="grid grid-cols-5 gap-2">
                {[6,12,24,36,60].map(v => (
                  <button key={v} onClick={() => setLoanState(p => ({ ...p, term: v }))}
                    className={`py-2 text-xs font-bold rounded-xl transition-colors ${
                      term === v ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                    }`}>{v}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Loan Breakdown</p>
            <div className="flex rounded-full overflow-hidden h-3 mb-3">
              <div className="bg-blue-700 transition-all duration-500" style={{ width: pct + '%' }} />
              <div className="bg-emerald-500 transition-all duration-500" style={{ width: (100 - pct) + '%' }} />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Principal {pct}%</span>
              <span>Interest {100 - pct}%</span>
            </div>
          </div>
        </section>

        <section className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-blue-700 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <p className="text-xs uppercase tracking-widest opacity-70 mb-2">Monthly Payment</p>
              <h2 className="text-4xl font-black tracking-tighter">{SYM}{Math.round(monthlyPayment).toLocaleString()}</h2>
              <p className="text-xs opacity-60 mt-2">{term} mos.</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">Total Interest</p>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{SYM}{Math.round(totalInterest).toLocaleString()}</h2>
              <div className="mt-4 text-emerald-600 text-sm font-bold">Total: {SYM}{Math.round(totalPayable).toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-slate-100">Schedule Preview</span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{schedule.length} payments</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {['#','Date','Payment','Balance'].map((h, i) => (
                    <th key={h} className={`px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest ${i > 1 ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, 3).map(row => (
                  <tr key={row.month} className="border-t border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3 font-bold text-blue-700">{row.month}</td>
                    <td className="px-5 py-3 text-slate-400">{row.label}</td>
                    <td className="px-5 py-3 text-right font-mono text-slate-800 dark:text-slate-200">{SYM}{Math.round(row.payment).toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-mono font-bold dark:text-white">{SYM}{Math.round(row.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate('/schedule')}
              className="flex-1 bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 active:scale-95 transition-all">
              View Full Schedule
            </button>
            <button onClick={() => window.print()}
              className="sm:w-44 bg-slate-100 dark:bg-slate-800 text-blue-700 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors">
              Print / PDF
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
