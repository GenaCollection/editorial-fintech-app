import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoan } from '../context/LoanContext'
import { t } from '../i18n/labels'

export default function CalculatorPage({ language }) {
  const { loanState, setLoanState, monthlyPayment, totalInterest, schedule } = useLoan()
  const { amount, rate, term } = loanState
  const navigate = useNavigate()
  const symbol = '֏'

  const set = (key) => (e) => {
    const ranges = { amount: [100000, 100000000], rate: [0.1, 100], term: [1, 360] }
    const [min, max] = ranges[key]
    setLoanState(prev => ({ ...prev, [key]: Math.max(min, Math.min(max, Number(e.target.value) || min)) }))
  }
  const slide = (key) => (e) => setLoanState(prev => ({ ...prev, [key]: Number(e.target.value) }))

  const totalPayable = monthlyPayment * term
  const principalPct = Math.round((amount / totalPayable) * 100)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-6 md:px-12 pt-28 pb-16 max-w-7xl mx-auto w-full">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface dark:text-slate-100 tracking-tight mb-2 font-headline">
            {t(language, 'calculator', 'title')}
          </h1>
          <p className="text-xl text-on-surface-variant dark:text-slate-400">{t(language, 'calculator', 'desc')}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Parameters */}
          <section className="lg:col-span-5 space-y-5">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-500 mb-7">
                {t(language, 'calculator', 'param')}
              </p>

              {[{
                key: 'amount', label: t(language,'calculator','loanAmt'),
                min: 100000, max: 100000000, step: 100000,
                display: amount.toLocaleString(), suffix: symbol
              },{
                key: 'rate', label: t(language,'calculator','intRate'),
                min: 0.1, max: 100, step: 0.1,
                display: rate, suffix: '%'
              }].map(({ key, label, min, max, step, display, suffix }) => (
                <div key={key} className="mb-8">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-sm font-semibold text-on-surface dark:text-slate-300">{label}</span>
                    <div className="flex items-baseline gap-1">
                      <input type="number" min={min} max={max} step={step} value={loanState[key]}
                        onChange={set(key)}
                        className="w-32 text-right text-2xl font-headline font-bold text-on-surface dark:text-white bg-transparent border-none outline-none p-0" />
                      <span className="text-on-surface-variant">{suffix}</span>
                    </div>
                  </div>
                  <input type="range" min={min} max={max} step={step} value={loanState[key]}
                    onChange={slide(key)}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
              ))}

              <div>
                <div className="flex justify-between items-end mb-3">
                  <span className="text-sm font-semibold text-on-surface dark:text-slate-300">{t(language,'calculator','term')}</span>
                  <div className="flex items-baseline gap-1">
                    <input type="number" min={1} max={360} value={term} onChange={set('term')}
                      className="w-16 text-right text-2xl font-headline font-bold text-on-surface dark:text-white bg-transparent border-none outline-none p-0" />
                    <span className="text-on-surface-variant text-xs">{t(language,'calculator','months')}</span>
                  </div>
                </div>
                <input type="range" min={1} max={360} value={term} onChange={slide('term')}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary mb-4" />
                <div className="grid grid-cols-5 gap-2">
                  {[6,12,24,36,60].map(v => (
                    <button key={v} onClick={() => setLoanState(p => ({...p, term: v}))}
                      className={`py-2 text-xs font-bold rounded-xl transition-colors ${
                        term === v ? 'bg-primary text-on-primary' : 'bg-surface-container-low dark:bg-slate-800 text-on-surface-variant hover:bg-surface-variant dark:hover:bg-slate-700'
                      }`}>{v}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Breakdown bar */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant dark:text-slate-500 mb-4">Loan Breakdown</p>
              <div className="flex rounded-full overflow-hidden h-3 mb-3">
                <div className="bg-primary transition-all duration-500" style={{width: principalPct+'%'}} />
                <div className="bg-secondary transition-all duration-500" style={{width: (100-principalPct)+'%'}} />
              </div>
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />Principal {principalPct}%</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block" />Interest {100-principalPct}%</span>
              </div>
            </div>
          </section>

          {/* Results */}
          <section className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-primary text-on-primary p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-widest opacity-70 mb-2">{t(language,'calculator','monthly')}</p>
                  <h2 className="text-4xl font-black font-headline tracking-tighter">
                    {symbol}{Math.round(monthlyPayment).toLocaleString()}
                  </h2>
                  <p className="text-xs opacity-60 mt-2">{term} {t(language,'calculator','months')}</p>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10">
                  <span className="material-symbols-outlined" style={{fontSize:'9rem'}}>account_balance</span>
                </div>
              </div>
              <div className="bg-surface-container-highest dark:bg-slate-800 p-8 rounded-2xl">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mb-2 font-bold">{t(language,'calculator','totalInt')}</p>
                <h2 className="text-3xl font-extrabold font-headline text-on-surface dark:text-white">
                  {symbol}{Math.round(totalInterest).toLocaleString()}
                </h2>
                <div className="mt-4 flex items-center text-secondary text-sm font-bold">
                  <span className="material-symbols-outlined mr-1 text-sm">trending_down</span>
                  Total: {symbol}{Math.round(totalPayable).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Mini preview table */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="font-headline font-bold text-on-surface dark:text-slate-100">Schedule Preview</span>
                <span className="text-xs text-on-surface-variant bg-surface-container-low dark:bg-slate-800 px-3 py-1 rounded-full">{schedule.length} payments</span>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low dark:bg-slate-800">
                  <tr>
                    {['#','Date','Payment','Balance'].map(h => (
                      <th key={h} className={`px-5 py-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ${h==='Payment'||h==='Balance'?'text-right':'text-left'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.slice(0,3).map(row => (
                    <tr key={row.month} className="border-t border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-3 font-bold text-primary dark:text-blue-400">{row.month}</td>
                      <td className="px-5 py-3 text-on-surface-variant dark:text-slate-400">{row.label}</td>
                      <td className="px-5 py-3 text-right font-mono text-on-surface dark:text-slate-200">{symbol}{Math.round(row.payment).toLocaleString()}</td>
                      <td className="px-5 py-3 text-right font-mono font-bold dark:text-white">{symbol}{Math.round(row.balance).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/schedule')}
                className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-headline font-bold hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">calendar_month</span>
                {t(language,'calculator','scheduleBtn')}
              </button>
              <button onClick={() => window.print()}
                className="sm:w-44 bg-surface-container-high dark:bg-slate-800 text-primary dark:text-blue-400 py-4 rounded-xl font-headline font-bold hover:bg-surface-variant dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">print</span> Print / PDF
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
