import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoan } from '../context/LoanContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

var SYM = '\u058f'

export default function CalculatorPage() {
  var ctx = useLoan()
  var loanState = ctx.loanState
  var setLoanState = ctx.setLoanState
  var monthlyPayment = ctx.monthlyPayment
  var totalInterest = ctx.totalInterest
  var schedule = ctx.schedule
  var amount = loanState.amount
  var rate = loanState.rate
  var term = loanState.term
  var navigate = useNavigate()
  var lang = useLanguage().language

  function setVal(key, min, max) {
    return function(e) {
      var v = Number(e.target.value)
      if (isNaN(v)) return
      v = Math.max(min, Math.min(max, v))
      setLoanState(function(prev) {
        var n = { amount: prev.amount, rate: prev.rate, term: prev.term }
        n[key] = v
        return n
      })
    }
  }

  var totalPay = monthlyPayment * term
  var pct = totalPay > 0 ? Math.round((amount / totalPay) * 100) : 50

  return (
    <main className="flex-1 px-6 md:px-12 pt-24 pb-16 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          {t(lang,'calc','title')}
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">{t(lang,'calc','desc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-7">{t(lang,'calc','params')}</p>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t(lang,'calc','amount')}</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{SYM}{amount.toLocaleString()}</span>
              </div>
              <input type="range" min="100000" max="100000000" step="100000" value={amount}
                onChange={setVal('amount',100000,100000000)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700" />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>{SYM}100K</span><span>{SYM}100M</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t(lang,'calc','rate')}</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{rate}%</span>
              </div>
              <input type="range" min="1" max="50" step="0.5" value={rate}
                onChange={setVal('rate',1,50)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700" />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1%</span><span>50%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t(lang,'calc','term')}</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{term} {t(lang,'calc','months')}</span>
              </div>
              <input type="range" min="1" max="360" step="1" value={term}
                onChange={setVal('term',1,360)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700 mb-4" />
              <div className="grid grid-cols-5 gap-2">
                {[6,12,24,36,60].map(function(v) {
                  return (
                    <button key={v}
                      onClick={function() { setLoanState(function(p) { return { amount:p.amount, rate:p.rate, term:v } }) }}
                      className={'py-2 text-xs font-bold rounded-xl transition-colors ' +
                        (term===v ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200')}
                    >{v}</button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{t(lang,'calc','breakd')}</p>
            <div className="flex rounded-full overflow-hidden h-3 mb-2">
              <div className="bg-blue-700 transition-all" style={{width:pct+'%'}} />
              <div className="bg-emerald-500 transition-all" style={{width:(100-pct)+'%'}} />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>{t(lang,'calc','principal')} {pct}%</span>
              <span>Interest {100-pct}%</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-blue-700 text-white p-8 rounded-2xl shadow-xl">
              <p className="text-xs uppercase tracking-widest opacity-70 mb-2">{t(lang,'calc','monthly')}</p>
              <p className="text-4xl font-black tracking-tighter">{SYM}{Math.round(monthlyPayment).toLocaleString()}</p>
              <p className="text-xs opacity-60 mt-2">{term} {t(lang,'calc','months')}</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">{t(lang,'calc','totalInt')}</p>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{SYM}{Math.round(totalInterest).toLocaleString()}</p>
              <p className="mt-3 text-emerald-600 text-sm font-bold">{t(lang,'calc','total')}: {SYM}{Math.round(totalPay).toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100">{t(lang,'calc','preview')}</span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{schedule.length} {t(lang,'calc','months')}</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','month')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','payment')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','balance')}</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0,3).map(function(row) {
                  return (
                    <tr key={row.month} className="border-t border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3 font-bold text-blue-700">{row.month}</td>
                      <td className="px-4 py-3 text-slate-400">{row.label}</td>
                      <td className="px-4 py-3 text-right font-mono">{SYM}{Math.round(row.payment).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold">{SYM}{Math.round(row.balance).toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4">
            <button onClick={function() { navigate('/schedule') }}
              className="flex-1 bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 active:scale-95 transition-all">
              {t(lang,'calc','viewFull')}
            </button>
            <button onClick={function() { window.print() }}
              className="w-40 bg-slate-100 dark:bg-slate-800 text-blue-700 py-4 rounded-xl font-bold hover:bg-slate-200">
              {t(lang,'calc','print')}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
