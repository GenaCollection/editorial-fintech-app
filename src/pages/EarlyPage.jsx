import React, { useMemo } from 'react'
import { useLoan, generateAmortization } from '../context/LoanContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { Link } from 'react-router-dom'
import { usePro } from '../context/ProContext.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'

var SYM = '\u058f'

export default function EarlyPage() {
  var ctx = useLoan()
  var loanState = ctx.loanState
  var monthlyPayment = ctx.monthlyPayment
  var totalInterest = ctx.totalInterest
  var schedule = ctx.schedule
  var lang = useLanguage().language
  useSeo(pageSeo('early', lang))
  var pro = usePro()

  var scenarios = useMemo(function() {
    return [50000, 100000, 200000].map(function(extra) {
      var eps = []
      for (var i = 1; i <= loanState.term; i++) { eps.push({ month: i, amount: extra }) }
      var res = generateAmortization(loanState.amount, loanState.rate, loanState.term, eps, loanState.loanType)
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
    { label: t(lang,'early','loanAmt'),  value: SYM + loanState.amount.toLocaleString(),           icon: 'payments' },
    { label: t(lang,'early','monthly'),  value: SYM + Math.round(monthlyPayment).toLocaleString(), icon: 'calendar_today' },
    { label: t(lang,'early','interest'), value: SYM + Math.round(totalInterest).toLocaleString(),  icon: 'percent' },
    { label: t(lang,'early','totalMo'),  value: String(schedule.length),                           icon: 'format_list_numbered' }
  ]

  return (
    <div className="flex pt-16 min-h-screen animate-fade-up">
      <main className="flex-1 min-w-0 px-4 md:px-6 lg:px-10 py-10 max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">{t(lang,'early','title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">{t(lang,'early','desc')}</p>
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
            <h2 className="font-bold text-slate-900 dark:text-slate-100">{t(lang,'early','scenarios')}</h2>
          </div>
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase">{t(lang,'early','extra')}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'early','newTerm')}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'early','reduction')}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'early','intSaved')}</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map(function(sc, i) {
                return (
                  <tr key={i} className="border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/20">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">+{SYM}{sc.extra.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">{sc.months} {t(lang,'calc','months')}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 font-bold px-2 py-1 rounded text-xs">-{sc.monthsSaved} {t(lang,'calc','months')}</span>
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
        </div>

        <AdSlot placement="early" className="mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link to="/offers" className="group bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 p-7 rounded-3xl hover:border-emerald-300 transition-all">
            <span className="material-symbols-outlined text-emerald-600 text-4xl mb-4 block">savings</span>
            <p className="font-extrabold text-lg text-slate-900 dark:text-white">{t(lang,'offers','title')}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t(lang,'offers','desc')}</p>
          </Link>
          <button onClick={function() { pro.openUpgrade('ai') }} className="text-left group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 rounded-3xl hover:border-blue-300 transition-all">
            <span className="material-symbols-outlined text-blue-700 text-4xl mb-4 block">auto_awesome</span>
            <p className="font-extrabold text-lg text-slate-900 dark:text-white">{t(lang,'ai','title')}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t(lang,'ai','s2')}</p>
          </button>
          <Link to="/pro" className="group bg-brand-gradient text-white p-7 rounded-3xl shadow-xl shadow-blue-700/20 hover:opacity-95 transition-all">
            <span className="material-symbols-outlined text-4xl mb-4 block">workspace_premium</span>
            <p className="font-extrabold text-lg">{t(lang,'pro','title')}</p>
            <p className="text-sm mt-1 opacity-80">{t(lang,'pro','subtitle')}</p>
          </Link>
        </div>
        <AdSlot placement="bottom" className="mt-8" />
      </main>
    </div>
  )
}
