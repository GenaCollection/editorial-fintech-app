import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'

var DEFAULTS = [
  { amount: 5000000, rate: 12, term: 60, type: 'annuity', fee: 0, insurance: 0 },
  { amount: 5000000, rate: 10, term: 48, type: 'annuity', fee: 0, insurance: 0 }
]
var NAMES = ['A', 'B', 'C', 'D']
var COLORS = [
  { text: 'text-blue-600',    bar: 'bg-blue-500',    panel: 'border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20',       win: 'bg-blue-600' },
  { text: 'text-violet-600',  bar: 'bg-violet-500',  panel: 'border-violet-200 dark:border-violet-800 bg-violet-50/30 dark:bg-violet-950/20', win: 'bg-violet-600' },
  { text: 'text-emerald-600', bar: 'bg-emerald-500', panel: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20', win: 'bg-emerald-600' },
  { text: 'text-amber-600',   bar: 'bg-amber-500',   panel: 'border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/20',   win: 'bg-amber-600' }
]

function calcLoan(p) {
  var P = Number(p.amount) || 0
  var r = (Number(p.rate) || 0) / 100 / 12
  var n = Number(p.term) || 1
  var fee = Number(p.fee) || 0
  var ins = Number(p.insurance) || 0
  var monthly = 0
  if (r === 0) {
    monthly = P / n
  } else if (p.type === 'annuity') {
    monthly = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
  } else {
    monthly = P / n + P * r
  }
  var total = monthly * n + fee + ins * n
  var totalInt = total - P - fee
  var effR = r === 0 ? 0 : (Math.pow(1 + r, 12) - 1) * 100
  return {
    monthly: monthly + ins,
    total: total,
    totalInt: totalInt > 0 ? totalInt : 0,
    effRate: effR
  }
}

function NumInput(props) {
  var label = props.label; var value = props.value; var onChange = props.onChange
  var suffix = props.suffix || ''
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</label>
      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
        <input
          type="number" value={value}
          onChange={function(e) { onChange(e.target.value) }}
          className="flex-1 px-3 py-2 text-sm font-semibold bg-transparent outline-none text-slate-800 dark:text-slate-100"
        />
        {suffix && <span className="px-3 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 h-full flex items-center border-l border-slate-200 dark:border-slate-700">{suffix}</span>}
      </div>
    </div>
  )
}

function fmt(n) { return Number(n.toFixed(0)).toLocaleString() }
function fmtR(n) { return n.toFixed(2) }

export default function ComparePage() {
  var langCtx = useLanguage()
  var lang = langCtx.language
  useSeo(pageSeo('compare', lang))
  var pro = usePro()

  var loansArr = useState(DEFAULTS); var loans = loansArr[0]; var setLoans = loansArr[1]

  function update(i, k, v) {
    setLoans(function(prev) {
      return prev.map(function(p, j) { if (j !== i) return p; var o = Object.assign({}, p); o[k] = v; return o })
    })
  }
  function addLoan() {
    if (loans.length >= pro.limits.compareSlots) { pro.openUpgrade('compare'); return }
    setLoans(function(prev) { return prev.concat([Object.assign({}, prev[prev.length - 1])]) })
  }
  function removeLoan(i) {
    setLoans(function(prev) { return prev.filter(function(p, j) { return j !== i }) })
  }

  var results = loans.map(calcLoan)

  var lbl = {
    title:      { AM: 'Վարկերի Համեմատություն', RU: 'Сравнение кредитов', EN: 'Loan Comparison' },
    desc:       { AM: 'Համեմատեք վարկային առաջարկները կողք կողքի', RU: 'Сравните кредитные предложения бок о бок', EN: 'Compare loan offers side by side' },
    loan:       { AM: 'Վարկ', RU: 'Кредит', EN: 'Loan' },
    add:        { AM: 'Ավելացնել վարկ', RU: 'Добавить кредит', EN: 'Add loan' },
    amount:     { AM: 'Գումար', RU: 'Сумма', EN: 'Amount' },
    rate:       { AM: 'Տոկոսադրույք', RU: 'Ставка', EN: 'Rate' },
    term:       { AM: 'Ժամկետ', RU: 'Срок', EN: 'Term' },
    type:       { AM: 'Տեսակ', RU: 'Тип', EN: 'Type' },
    fee:        { AM: 'Տրամ. Վճար', RU: 'Комиссия', EN: 'Fee' },
    insurance:  { AM: 'Ապահ. / ամիս', RU: 'Страховка / мес.', EN: 'Insurance / mo.' },
    annuity:    { AM: 'Անուիտետ', RU: 'Аннуитет', EN: 'Annuity' },
    diff:       { AM: 'Դիֆ.', RU: 'Дифф.', EN: 'Diff.' },
    monthly:    { AM: 'Ամսական Վճար', RU: 'Ежемес. платёж', EN: 'Monthly Payment' },
    totalInt:   { AM: 'Ընդհանուր Տոկոս', RU: 'Сумма процентов', EN: 'Total Interest' },
    total:      { AM: 'Ընդհանուր Գումար', RU: 'Итого к оплате', EN: 'Total Payout' },
    effRate:    { AM: 'Իրական Տոկ.', RU: 'Реальная ставка', EN: 'Effective Rate' },
    winner:     { AM: 'Ավելի ձեռնտու', RU: 'Выгоднее', EN: 'Better deal' },
    equal:      { AM: 'Հավասար', RU: 'Равнозначно', EN: 'Equal' },
    saving:     { AM: 'Խնայողություն', RU: 'Экономия', EN: 'Saving' },
    results:    { AM: 'Արդյունքներ', RU: 'Результаты', EN: 'Results' },
    months:     { AM: 'ամիս', RU: 'мес.', EN: 'mo.' }
  }

  function tr(k) { return (lbl[k] && lbl[k][lang]) || lbl[k]['EN'] }
  var CUR = '\u058f'
  function name(i) { return tr('loan') + ' ' + NAMES[i] }

  // Index of the lowest value, or -1 when every loan ties.
  function best(vals) {
    var min = Math.min.apply(null, vals)
    var idx = vals.indexOf(min)
    return vals.every(function(v) { return Math.abs(v - min) < 0.005 }) ? -1 : idx
  }

  var rows = [
    { key: 'monthly',  vals: results.map(function(r) { return r.monthly }),  fmt: function(v) { return fmt(v) + ' ' + CUR } },
    { key: 'totalInt', vals: results.map(function(r) { return r.totalInt }), fmt: function(v) { return fmt(v) + ' ' + CUR } },
    { key: 'total',    vals: results.map(function(r) { return r.total }),    fmt: function(v) { return fmt(v) + ' ' + CUR } },
    { key: 'effRate',  vals: results.map(function(r) { return r.effRate }),  fmt: function(v) { return fmtR(v) + '%' } }
  ].map(function(r) { return Object.assign(r, { win: best(r.vals) }) })

  // Overall winner = cheapest total payout.
  var overallWin = rows[2].win
  var totals = rows[2].vals
  var saving = overallWin === -1 ? 0 : Math.max.apply(null, totals) - totals[overallWin]

  // Plain render function (not a component) so inputs keep focus while typing.
  function renderPanel(vals, i) {
    function upd(k, v) { update(i, k, v) }
    return (
      <div key={i} className={'rounded-2xl border-2 p-4 flex flex-col gap-3 ' + COLORS[i].panel}>
        <div className="flex items-center justify-between mb-1">
          <div className="text-base font-black text-slate-800 dark:text-slate-100">{name(i)}</div>
          {loans.length > 2 && (
            <button onClick={function() { removeLoan(i) }} aria-label="Remove" className="text-slate-400 hover:text-red-500">
              <span className="material-symbols-outlined" style={{fontSize:'18px'}}>close</span>
            </button>
          )}
        </div>
        <NumInput label={tr('amount')} value={vals.amount} onChange={function(v) { upd('amount', v) }} suffix={CUR} />
        <NumInput label={tr('rate')} value={vals.rate} onChange={function(v) { upd('rate', v) }} suffix="%" />
        <NumInput label={tr('term')} value={vals.term} onChange={function(v) { upd('term', v) }} suffix={tr('months')} />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{tr('type')}</label>
          <div className="flex gap-2">
            {['annuity','diff'].map(function(tp) {
              return (
                <button key={tp}
                  onClick={function() { upd('type', tp) }}
                  className={'flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ' +
                    (vals.type === tp
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-blue-400')}
                >{tr(tp)}</button>
              )
            })}
          </div>
        </div>
        <NumInput label={tr('fee')} value={vals.fee} onChange={function(v) { upd('fee', v) }} suffix={CUR} />
        <NumInput label={tr('insurance')} value={vals.insurance} onChange={function(v) { upd('insurance', v) }} suffix={CUR} />
      </div>
    )
  }

  var gridCols = loans.length === 2 ? 'md:grid-cols-2' : loans.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 xl:grid-cols-4'

  return (
    <main className="pt-24 pb-16 min-h-screen animate-fade-up">
      <div className="max-w-6xl mx-auto px-4">

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined text-blue-600">compare_arrows</span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight">{tr('title')}</h1>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tr('desc')}</p>
          </div>
          {loans.length < 4 && (
            <button onClick={addLoan}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-200 hover:border-blue-400">
              <span className="material-symbols-outlined" style={{fontSize:'18px'}}>add</span>
              {tr('add')}
              {loans.length >= pro.limits.compareSlots && <span className="text-[9px] font-black bg-brand-gradient text-white px-1.5 py-0.5 rounded">PRO</span>}
            </button>
          )}
        </div>

        <div className={'grid grid-cols-1 gap-4 mb-8 ' + gridCols}>
          {loans.map(renderPanel)}
        </div>

        {overallWin !== -1 ? (
          <div className={'mb-6 rounded-2xl p-4 flex items-center gap-4 text-white ' + COLORS[overallWin].win}>
            <span className="material-symbols-outlined text-4xl">emoji_events</span>
            <div>
              <div className="font-black text-lg">{tr('winner')}: {name(overallWin)}</div>
              {saving > 0 && <div className="text-sm opacity-90">{tr('saving')}: {fmt(saving)} {CUR}</div>}
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl p-4 flex items-center gap-4 bg-slate-200 dark:bg-slate-800">
            <span className="material-symbols-outlined text-4xl text-slate-500">balance</span>
            <div className="font-black text-lg text-slate-700 dark:text-slate-200">{tr('equal')}</div>
          </div>
        )}

        <AdSlot placement="compare" className="mb-6" />

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto bg-white dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-black uppercase text-slate-400 tracking-widest">{tr('results')}</th>
                {loans.map(function(l, i) {
                  return <th key={i} className={'px-4 py-3 text-center text-xs font-black uppercase tracking-widest ' + COLORS[i].text}>{name(i)}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map(function(row) {
                return (
                  <tr key={row.key} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-4 font-semibold text-slate-600 dark:text-slate-400">{tr(row.key)}</td>
                    {row.vals.map(function(v, i) {
                      return (
                        <td key={i} className={'px-4 py-4 text-center font-black whitespace-nowrap ' + (row.win === i ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-100')}>
                          {row.fmt(v)}{row.win === i ? ' \u2713' : ''}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map(function(row) {
            var maxV = Math.max.apply(null, row.vals) || 1
            return (
              <div key={row.key + '_bar'} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-3">{tr(row.key)}</div>
                <div className="flex flex-col gap-2">
                  {row.vals.map(function(v, i) {
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className={'font-bold ' + COLORS[i].text}>{name(i)}</span>
                          <span className="text-slate-600 dark:text-slate-300 font-semibold">{row.fmt(v)}</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800">
                          <div className={'h-2.5 rounded-full transition-all duration-500 ' + COLORS[i].bar} style={{ width: (v / maxV * 100).toFixed(1) + '%' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <AdSlot placement="bottom" className="mt-8" />
      </div>
    </main>
  )
}
