import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

var DEFAULT_A = { amount: 5000000, rate: 12, term: 60, type: 'annuity', fee: 0, insurance: 0 }
var DEFAULT_B = { amount: 5000000, rate: 10, term: 48, type: 'annuity', fee: 0, insurance: 0 }

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

  var aArr = useState(DEFAULT_A); var a = aArr[0]; var setA = aArr[1]
  var bArr = useState(DEFAULT_B); var b = bArr[0]; var setB = bArr[1]

  function updateA(k, v) { setA(function(prev) { var o = Object.assign({}, prev); o[k] = v; return o }) }
  function updateB(k, v) { setB(function(prev) { var o = Object.assign({}, prev); o[k] = v; return o }) }

  var rA = calcLoan(a)
  var rB = calcLoan(b)

  var lbl = {
    title:      { AM: 'Վարկերի Համեմատություն', RU: 'Сравнение кредитов', EN: 'Loan Comparison' },
    desc:       { AM: 'Համեմատեք երկու վարկային առաջարկ կողք կողքի', RU: 'Сравните два кредитных предложения бок о бок', EN: 'Compare two loan offers side by side' },
    loanA:      { AM: 'Վարկ A', RU: 'Кредит A', EN: 'Loan A' },
    loanB:      { AM: 'Վարկ B', RU: 'Кредит B', EN: 'Loan B' },
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
    params:     { AM: 'Պարամետրեր', RU: 'Параметры', EN: 'Parameters' },
    results:    { AM: 'Արդյունքներ', RU: 'Результаты', EN: 'Results' },
    months:     { AM: 'ամիս', RU: 'мес.', EN: 'mo.' }
  }

  function tr(k) { return (lbl[k] && lbl[k][lang]) || lbl[k]['EN'] }
  function currency() { return lang === 'EN' ? '֏' : '֏' }

  var winMonthly = rA.monthly < rB.monthly ? 'A' : rB.monthly < rA.monthly ? 'B' : '='
  var winTotal   = rA.total   < rB.total   ? 'A' : rB.total   < rA.total   ? 'B' : '='
  var winInt     = rA.totalInt< rB.totalInt ? 'A' : rB.totalInt< rA.totalInt? 'B' : '='
  var winEff     = rA.effRate < rB.effRate  ? 'A' : rB.effRate < rA.effRate  ? 'B' : '='

  function badge(w, side) {
    if (w === '=') return null
    if (w === side) return (
      <span className="ml-2 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] font-black px-1.5 py-0.5 rounded-full">
        ✓ {tr('winner')}
      </span>
    )
    return null
  }

  function diffBadge(vA, vB) {
    var d = Math.abs(vA - vB)
    if (d < 0.01) return null
    return (
      <div className="text-center">
        <span className="text-xs text-slate-500 dark:text-slate-400">Δ {fmt(d)} {currency()}</span>
      </div>
    )
  }

  function InputPanel(props) {
    var vals = props.vals; var upd = props.upd; var label = props.label; var color = props.color
    return (
      <div className={"rounded-2xl border-2 p-4 flex flex-col gap-3 " + color}>
        <div className="text-base font-black text-slate-800 dark:text-slate-100 mb-1">{label}</div>
        <NumInput label={tr('amount')} value={vals.amount} onChange={function(v) { upd('amount', v) }} suffix={currency()} />
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
        <NumInput label={tr('fee')} value={vals.fee} onChange={function(v) { upd('fee', v) }} suffix={currency()} />
        <NumInput label={tr('insurance')} value={vals.insurance} onChange={function(v) { upd('insurance', v) }} suffix={currency()} />
      </div>
    )
  }

  var rows = [
    { key: 'monthly', vA: rA.monthly, vB: rB.monthly, win: winMonthly, fmt: function(v) { return fmt(v) + ' ' + currency() } },
    { key: 'totalInt', vA: rA.totalInt, vB: rB.totalInt, win: winInt, fmt: function(v) { return fmt(v) + ' ' + currency() } },
    { key: 'total', vA: rA.total, vB: rB.total, win: winTotal, fmt: function(v) { return fmt(v) + ' ' + currency() } },
    { key: 'effRate', vA: rA.effRate, vB: rB.effRate, win: winEff, fmt: function(v) { return fmtR(v) + '%' } }
  ]

  var overallWin = (function() {
    var scores = { A: 0, B: 0 }
    ;[winMonthly, winInt, winTotal, winEff].forEach(function(w) { if (w !== '=') scores[w]++ })
    if (scores.A > scores.B) return 'A'
    if (scores.B > scores.A) return 'B'
    return '='
  })()

  var saving = Math.abs(rA.total - rB.total)

  return (
    <main className="pt-20 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            <span className="material-symbols-outlined align-middle mr-2 text-blue-600">compare_arrows</span>
            {tr('title')}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tr('desc')}</p>
        </div>

        {/* Input panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <InputPanel vals={a} upd={updateA} label={tr('loanA')}
            color="border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20" />
          <InputPanel vals={b} upd={updateB} label={tr('loanB')}
            color="border-violet-200 dark:border-violet-800 bg-violet-50/30 dark:bg-violet-950/20" />
        </div>

        {/* Winner banner */}
        {overallWin !== '=' && (
          <div className={'mb-6 rounded-2xl p-4 flex items-center gap-4 ' +
            (overallWin === 'A'
              ? 'bg-blue-600 text-white'
              : 'bg-violet-600 text-white')}>
            <span className="material-symbols-outlined text-4xl">emoji_events</span>
            <div>
              <div className="font-black text-lg">
                {tr('winner')}: {tr('loan' + overallWin)}
              </div>
              {saving > 0 && (
                <div className="text-sm opacity-90">
                  {tr('saving')}: {fmt(saving)} {currency()}
                </div>
              )}
            </div>
          </div>
        )}
        {overallWin === '=' && (
          <div className="mb-6 rounded-2xl p-4 flex items-center gap-4 bg-slate-200 dark:bg-slate-800">
            <span className="material-symbols-outlined text-4xl text-slate-500">balance</span>
            <div className="font-black text-lg text-slate-700 dark:text-slate-200">{tr('equal')}</div>
          </div>
        )}

        {/* Results table */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
            <div className="px-4 py-3 text-xs font-black uppercase text-slate-400 tracking-widest">{tr('results')}</div>
            <div className="px-4 py-3 text-xs font-black uppercase text-blue-600 tracking-widest text-center">{tr('loanA')}</div>
            <div className="px-4 py-3 text-xs font-black uppercase text-violet-600 tracking-widest text-center">{tr('loanB')}</div>
          </div>
          {rows.map(function(row) {
            return (
              <div key={row.key} className="grid grid-cols-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <div className="px-4 py-4 text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center">
                  {tr(row.key)}
                </div>
                <div className="px-4 py-4 text-center">
                  <div className={'text-sm font-black ' + (row.win === 'A' ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-100')}>
                    {row.fmt(row.vA)}
                    {badge(row.win, 'A')}
                  </div>
                </div>
                <div className="px-4 py-4 text-center">
                  <div className={'text-sm font-black ' + (row.win === 'B' ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-100')}>
                    {row.fmt(row.vB)}
                    {badge(row.win, 'B')}
                  </div>
                  {diffBadge(row.vA, row.vB)}
                </div>
              </div>
            )
          })}
        </div>

        {/* Visual bar comparison */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map(function(row) {
            var maxV = Math.max(row.vA, row.vB) || 1
            var pA = (row.vA / maxV * 100).toFixed(1)
            var pB = (row.vB / maxV * 100).toFixed(1)
            return (
              <div key={row.key + '_bar'} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-3">{tr(row.key)}</div>
                <div className="flex flex-col gap-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-blue-600">{tr('loanA')}</span>
                      <span className="text-slate-600 dark:text-slate-300 font-semibold">{row.fmt(row.vA)}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className="h-2.5 rounded-full bg-blue-500 transition-all duration-500" style={{ width: pA + '%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-violet-600">{tr('loanB')}</span>
                      <span className="text-slate-600 dark:text-slate-300 font-semibold">{row.fmt(row.vB)}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800">
                      <div className="h-2.5 rounded-full bg-violet-500 transition-all duration-500" style={{ width: pB + '%' }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}
