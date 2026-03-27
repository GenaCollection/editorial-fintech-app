import React, { useState, useMemo } from 'react'
import { useLoan, generateAmortization } from '../context/LoanContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import Sidebar from '../components/Sidebar.jsx'

var SYM = '\u058f'
var PER = 12

export default function SchedulePage() {
  var ctx = useLoan()
  var schedule = ctx.schedule
  var loanState = ctx.loanState
  var totalInterest = ctx.totalInterest
  var addExtraPayment = ctx.addExtraPayment
  var extraPayments = ctx.extraPayments
  var lang = useLanguage().language

  var amtArr = useState('')
  var extraAmount = amtArr[0]
  var setExtraAmount = amtArr[1]
  var moArr = useState(1)
  var extraMonth = moArr[0]
  var setExtraMonth = moArr[1]
  var pgArr = useState(1)
  var page = pgArr[0]
  var setPage = pgArr[1]

  var base = useMemo(function() {
    return generateAmortization(loanState.amount, loanState.rate, loanState.term, []).schedule
  }, [loanState])

  var baseInterest = 0
  for (var k = 0; k < base.length; k++) { baseInterest += base[k].interest }
  var monthsSaved = base.length > schedule.length ? base.length - schedule.length : 0
  var interestSaved = baseInterest > totalInterest ? baseInterest - totalInterest : 0
  var totalPages = Math.ceil(schedule.length / PER)
  var rows = schedule.slice((page-1)*PER, page*PER)

  function handleAdd() {
    var n = Number(extraAmount)
    if (!n || n <= 0) return
    addExtraPayment(Number(extraMonth), n)
    setExtraAmount('')
  }

  function makePts(sc) {
    if (sc.length < 2) return ''
    var pts = []
    for (var i = 0; i < sc.length; i++) {
      pts.push(((i/(sc.length-1))*400) + ',' + (100 - (sc[i].balance/loanState.amount)*100))
    }
    return pts.join(' ')
  }

  return (
    <div className="flex pt-16 min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-5xl mx-auto overflow-x-hidden">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">{t(lang,'sched','title')}</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang,'sched','desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-5">{t(lang,'sched','addEarly')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t(lang,'sched','month')}</label>
                <input type="number" min="1" max={loanState.term} value={extraMonth}
                  onChange={function(e) { setExtraMonth(Number(e.target.value)) }}
                  className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">{t(lang,'sched','amount')}</label>
                <input type="number" min="1" value={extraAmount}
                  onChange={function(e) { setExtraAmount(e.target.value) }}
                  placeholder="500000"
                  className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white outline-none" />
              </div>
              <button onClick={handleAdd}
                className="w-full py-4 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800">
                {t(lang,'sched','apply')}
              </button>
              {extraPayments.length > 0 && (
                <div>
                  {extraPayments.map(function(ep) {
                    return (
                      <div key={ep.month} className="flex justify-between text-sm bg-emerald-50 dark:bg-green-900/20 rounded-lg px-3 py-2 mt-1">
                        <span className="text-slate-700 dark:text-slate-300">{t(lang,'sched','month')} {ep.month}</span>
                        <span className="font-bold text-emerald-600">{SYM}{ep.amount.toLocaleString()}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-5">{t(lang,'sched','forecast')}</h2>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t(lang,'sched','saved')}</div>
                <div className="text-3xl font-extrabold text-blue-700">{monthsSaved > 0 ? monthsSaved : '-'}</div>
              </div>
              <div className="bg-emerald-50 dark:bg-green-900/20 p-4 rounded-xl">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t(lang,'sched','intSaved')}</div>
                <div className="text-2xl font-extrabold text-emerald-600">
                  {interestSaved > 0 ? (SYM + Math.round(interestSaved).toLocaleString()) : '-'}
                </div>
              </div>
            </div>
            <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none">
              <polyline points={makePts(base)} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6"/>
              <polyline points={makePts(schedule)} fill="none" stroke="#1d4ed8" strokeWidth="3"/>
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 dark:text-slate-100">{t(lang,'sched','table')}</h2>
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{schedule.length} {t(lang,'calc','months')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','month')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','payment')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','principal')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','interest')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','balance')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(function(row) {
                  return (
                    <tr key={row.month} className={'border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/20 ' + (row.extra > 0 ? 'bg-emerald-50/30' : '')}>
                      <td className="px-4 py-3 font-bold text-blue-700 text-xs">{row.month}</td>
                      <td className="px-4 py-3 text-slate-400">{row.label}</td>
                      <td className="px-4 py-3 text-right font-mono">{SYM}{Math.round(row.payment).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-mono text-blue-700">{SYM}{Math.round(row.principal).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-mono text-emerald-600">{SYM}{Math.round(row.interest).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold">{SYM}{Math.round(row.balance).toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button disabled={page===1} onClick={function() { setPage(function(p){return p-1}) }}
                className="text-sm font-bold text-blue-700 disabled:opacity-30">{t(lang,'sched','prev')}</button>
              <span className="text-xs text-slate-400">{t(lang,'sched','page')} {page} / {totalPages}</span>
              <button disabled={page===totalPages} onClick={function() { setPage(function(p){return p+1}) }}
                className="text-sm font-bold text-blue-700 disabled:opacity-30">{t(lang,'sched','next')}</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
