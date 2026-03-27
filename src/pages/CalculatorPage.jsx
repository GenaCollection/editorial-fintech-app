import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoan, generateAmortization } from '../context/LoanContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

var SYM = '\u058f'

// ── Reusable dual-input (slider + number field) ───────────────────────────────
function DualInput(props) {
  var label = props.label
  var value = props.value
  var min = props.min
  var max = props.max
  var step = props.step
  var onChange = props.onChange
  var format = props.format
  var suffix = props.suffix || ''

  var rawArr = useState('')
  var raw = rawArr[0]
  var setRaw = rawArr[1]
  var focusArr = useState(false)
  var focused = focusArr[0]
  var setFocused = focusArr[1]

  function handleFocus() { setFocused(true); setRaw(String(value)) }
  function handleBlur() {
    setFocused(false)
    var n = parseFloat(raw.replace(/[^0-9.]/g, ''))
    if (!isNaN(n)) onChange(Math.max(min, Math.min(max, n)))
    setRaw('')
  }
  function handleKey(e) {
    if (e.key === 'Enter') e.target.blur()
  }

  return (
    <div className="mb-7">
      <div className="flex justify-between items-end mb-3">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</span>
        <div className="flex items-center gap-1">
          {focused
            ? <input
                autoFocus
                type="text"
                value={raw}
                onChange={function(e) { setRaw(e.target.value) }}
                onBlur={handleBlur}
                onKeyDown={handleKey}
                className="w-32 text-right text-xl font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg px-2 py-0.5 outline-none border border-blue-400"
              />
            : <button
                onClick={handleFocus}
                className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-700 transition-colors tabular-nums"
              >{format ? format(value) : value}{suffix}</button>
          }
        </div>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={function(e) { onChange(Number(e.target.value)) }}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700"
      />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{props.minLabel || min}</span>
        <span>{props.maxLabel || max}</span>
      </div>
    </div>
  )
}

// ── Loan type toggle ──────────────────────────────────────────────────────────
function LoanTypeToggle(props) {
  var value = props.value
  var onChange = props.onChange
  var lang = props.lang
  var types = [
    { key: 'annuity',       labelEN: 'Annuity',         labelRU: '\u0410\u043d\u043d\u0443\u0438\u0442\u0435\u0442', labelAM: '\u0531\u0576\u0578\u0582\u056b\u057f\u0565\u057f' },
    { key: 'differentiated', labelEN: 'Differentiated', labelRU: '\u0414\u0438\u0444\u0444\u0435\u0440\u0435\u043d\u0446.', labelAM: '\u0534\u056b\u0586.' }
  ]
  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1 mb-6">
      {types.map(function(tp) {
        var lbl = lang === 'AM' ? tp.labelAM : lang === 'RU' ? tp.labelRU : tp.labelEN
        return (
          <button key={tp.key}
            onClick={function() { onChange(tp.key) }}
            className={'flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ' +
              (value === tp.key
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700')}
          >{lbl}</button>
        )
      })}
    </div>
  )
}

// ── Mini stat card ────────────────────────────────────────────────────────────
function StatCard(props) {
  return (
    <div className={'rounded-2xl p-5 ' + (props.accent
      ? 'bg-blue-700 text-white'
      : 'bg-slate-100 dark:bg-slate-800')}>
      <div className={'text-xs font-bold uppercase tracking-widest mb-1 ' + (props.accent ? 'opacity-70' : 'text-slate-400')}>
        {props.label}
      </div>
      <div className={'text-2xl font-extrabold ' + (props.accent ? '' : 'text-slate-900 dark:text-white')}>
        {props.value}
      </div>
      {props.sub && (
        <div className={'text-xs mt-1 ' + (props.accent ? 'opacity-60' : 'text-slate-400')}>{props.sub}</div>
      )}
    </div>
  )
}

// ── Early repayment panel ─────────────────────────────────────────────────────
function EarlyPanel(props) {
  var ctx = props.ctx
  var loanState = ctx.loanState
  var extraPayments = ctx.extraPayments
  var addExtraPayment = ctx.addExtraPayment
  var removeExtraPayment = ctx.removeExtraPayment
  var schedule = ctx.schedule
  var totalInterest = ctx.totalInterest
  var lang = props.lang

  var mArr = useState(1)
  var epMonth = mArr[0]; var setEpMonth = mArr[1]
  var aArr = useState('')
  var epAmount = aArr[0]; var setEpAmount = aArr[1]

  var baseComputed = useMemo(function() {
    var res = generateAmortization(loanState.amount, loanState.rate, loanState.term, [], loanState.loanType)
    var bi = 0; for (var i = 0; i < res.schedule.length; i++) bi += res.schedule[i].interest
    return { months: res.schedule.length, interest: bi }
  }, [loanState])

  var monthsSaved = baseComputed.months > schedule.length ? baseComputed.months - schedule.length : 0
  var interestSaved = baseComputed.interest > totalInterest ? baseComputed.interest - totalInterest : 0

  var scenarios = useMemo(function() {
    return [50000, 100000, 200000, 500000].map(function(extra) {
      var eps = []
      for (var i = 1; i <= loanState.term; i++) eps.push({ month: i, amount: extra })
      var res = generateAmortization(loanState.amount, loanState.rate, loanState.term, eps, loanState.loanType)
      var interest = 0; for (var j = 0; j < res.schedule.length; j++) interest += res.schedule[j].interest
      return {
        extra: extra,
        months: res.schedule.length,
        monthsSaved: baseComputed.months > res.schedule.length ? baseComputed.months - res.schedule.length : 0,
        saved: baseComputed.interest > interest ? baseComputed.interest - interest : 0
      }
    })
  }, [loanState, baseComputed])

  function handleAdd() {
    var n = Number(epAmount)
    if (!n || n <= 0) return
    addExtraPayment(epMonth, n)
    setEpAmount('')
  }

  return (
    <div className="space-y-5">
      {/* Savings summary */}
      {extraPayments.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">
              {lang === 'RU' ? '\u041c\u0435\u0441. \u0441\u044b\u043d.' : lang === 'AM' ? '\u053c\u0580\u0561\u0581. \u0531\u0574.' : 'Months Saved'}
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">{monthsSaved > 0 ? monthsSaved : '—'}</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">
              {lang === 'RU' ? '\u042d\u043a\u043e\u043d. \u043d\u0430 \u043f\u0440\u043e\u0446.' : lang === 'AM' ? '\u054f\u0578\u056f. \u053c\u0580\u0561\u0581.' : 'Interest Saved'}
            </div>
            <div className="text-2xl font-extrabold text-blue-700">
              {interestSaved > 0 ? (SYM + Math.round(interestSaved).toLocaleString()) : '—'}
            </div>
          </div>
        </div>
      )}

      {/* Add payment form */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          {lang === 'RU' ? '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0434\u043e\u0441\u0440\u043e\u0447. \u043f\u043b\u0430\u0442\u0435\u0436' : lang === 'AM' ? '\u0531\u057e\u0565\u056c\u0561\u056c \u054e\u0561\u0572. \u054e\u0579\u0561\u0580' : 'Add Early Payment'}
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              {lang === 'RU' ? '\u041c\u0435\u0441\u044f\u0446' : lang === 'AM' ? '\u0531\u0574\u056b\u057d' : 'Month'}
            </label>
            <input type="number" min="1" max={loanState.term} value={epMonth}
              onChange={function(e) { setEpMonth(Number(e.target.value)) }}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              {lang === 'RU' ? '\u0421\u0443\u043c\u043c\u0430' : lang === 'AM' ? '\u0533\u0578\u0582\u0574\u0561\u0580' : 'Amount'}
            </label>
            <input type="number" min="1" value={epAmount}
              onChange={function(e) { setEpAmount(e.target.value) }}
              placeholder="100 000"
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
          </div>
        </div>
        <button onClick={handleAdd}
          className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors">
          {lang === 'RU' ? '\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c' : lang === 'AM' ? '\u0531\u057e\u0565\u056c\u0561\u056c' : 'Add Payment'}
        </button>
      </div>

      {/* Payment list */}
      {extraPayments.length > 0 && (
        <div className="space-y-2">
          {extraPayments.map(function(ep) {
            return (
              <div key={ep.month} className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3">
                <div>
                  <span className="text-xs text-slate-400">
                    {lang === 'RU' ? '\u041c\u0435\u0441.' : lang === 'AM' ? '\u0531\u0574.' : 'Mo.'} {ep.month}
                  </span>
                  <span className="ml-3 font-bold text-slate-900 dark:text-white">{SYM}{Number(ep.amount).toLocaleString()}</span>
                </div>
                <button onClick={function() { removeExtraPayment(ep.month) }}
                  className="text-slate-400 hover:text-red-500 transition-colors text-lg font-bold">&times;</button>
              </div>
            )
          })}
        </div>
      )}

      {/* Scenarios */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
          {lang === 'RU' ? '\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0438 \u0435\u0436\u0435\u043c\u0435\u0441. \u0434\u043e\u043f\u043b\u0430\u0442' : lang === 'AM' ? '\u054d\u0581\u0565\u0576\u0561\u0580\u0576\u0565\u0580' : 'Monthly extra — scenarios'}
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">+{lang === 'RU' ? '\u0414\u043e\u043f.' : 'Extra'}/mo</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{lang === 'RU' ? '\u041c\u0435\u0441.' : 'Months'}</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">-{lang === 'RU' ? '\u041c\u0435\u0441.' : 'Mo.'}</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{lang === 'RU' ? '\u042d\u043a\u043e\u043d.' : 'Saved'}</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map(function(sc, i) {
                return (
                  <tr key={i} className="border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/20">
                    <td className="px-4 py-3 font-bold">{SYM}{sc.extra.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{sc.months}</td>
                    <td className="px-4 py-3 text-right">
                      {sc.monthsSaved > 0
                        ? <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 font-bold px-2 py-0.5 rounded text-xs">-{sc.monthsSaved}</span>
                        : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">
                      {sc.saved > 0 ? (SYM + Math.round(sc.saved).toLocaleString()) : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ── Advanced params panel ─────────────────────────────────────────────────────
function AdvancedPanel(props) {
  var loanState = props.loanState
  var setLoanState = props.setLoanState
  var lang = props.lang

  function set(key) {
    return function(val) {
      setLoanState(function(prev) {
        var n = { amount: prev.amount, rate: prev.rate, term: prev.term, loanType: prev.loanType, fee: prev.fee, insurance: prev.insurance, startDate: prev.startDate }
        n[key] = val; return n
      })
    }
  }

  var feeSet = set('fee')
  var insSet = set('insurance')

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fee */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            {lang === 'RU' ? '\u041a\u043e\u043c\u0438\u0441\u0441\u0438\u044f \u0437\u0430 \u0432\u044b\u0434\u0430\u0447\u0443' : lang === 'AM' ? '\u054f\u0580\u0561\u0574\u0561\u0564\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576' : 'Origination Fee'}
          </label>
          <div className="flex gap-2">
            <input type="number" min="0" step="1000" value={loanState.fee}
              onChange={function(e) { feeSet(Number(e.target.value)) }}
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
            <span className="flex items-center text-slate-400 font-bold">{SYM}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {lang === 'RU' ? '\u0415\u0434\u0438\u043d\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043f\u0440\u0438 \u0432\u044b\u0434\u0430\u0447\u0435' : 'One-time at disbursement'}
          </p>
        </div>
        {/* Insurance */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            {lang === 'RU' ? '\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0430 (/\u043c\u0435\u0441.)' : lang === 'AM' ? '\u0531\u067b\u056e\u0561\u0563\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576' : 'Insurance / month'}
          </label>
          <div className="flex gap-2">
            <input type="number" min="0" step="100" value={loanState.insurance}
              onChange={function(e) { insSet(Number(e.target.value)) }}
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
            <span className="flex items-center text-slate-400 font-bold">{SYM}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {lang === 'RU' ? '\u0415\u0436\u0435\u043c\u0435\u0441\u044f\u0447\u043d\u043e' : 'Added each month'}
          </p>
        </div>
      </div>

      {/* Start date */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          {lang === 'RU' ? '\u0414\u0430\u0442\u0430 \u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u044b\u043f\u043b\u0430\u0442' : lang === 'AM' ? '\u054e\u0579\u0561\u0580\u0578\u0582\u0574\u0576\u0565\u0580\u056b \u057d\u056f\u056b\u0566\u0562' : 'Repayment Start'}
        </label>
        <input type="month" value={loanState.startDate}
          onChange={function(e) { set('startDate')(e.target.value) }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
      </div>

      {/* Info */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 text-sm text-amber-800 dark:text-amber-200">
        <span className="font-bold">&#9432;</span>
        {' '}{lang === 'RU'
          ? '\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0430 \u0438 \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u044f \u0443\u0447\u0438\u0442\u044b\u0432\u0430\u044e\u0442\u0441\u044f \u043f\u0440\u0438 \u0440\u0430\u0441\u0447\u0451\u0442\u0435 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u0439 \u0421\u0422\u041f (APR).'
          : 'Insurance and fee are included when computing the real APR.'}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CalculatorPage() {
  var ctx = useLoan()
  var loanState = ctx.loanState
  var setLoanState = ctx.setLoanState
  var monthlyPayment = ctx.monthlyPayment
  var totalInterest = ctx.totalInterest
  var totalPayment = ctx.totalPayment
  var schedule = ctx.schedule
  var apr = ctx.apr
  var navigate = useNavigate()
  var lang = useLanguage().language

  var tabArr = useState('params')  // params | early | advanced
  var activeTab = tabArr[0]
  var setTab = tabArr[1]

  var amount = loanState.amount
  var rate = loanState.rate
  var term = loanState.term

  function set(key, min, max) {
    return function(val) {
      var v = Math.max(min, Math.min(max, val))
      setLoanState(function(prev) {
        var n = { amount: prev.amount, rate: prev.rate, term: prev.term, loanType: prev.loanType, fee: prev.fee, insurance: prev.insurance, startDate: prev.startDate }
        n[key] = v; return n
      })
    }
  }

  var totalPay = totalPayment || (monthlyPayment * term)
  var pct = totalPay > 0 ? Math.round((amount / totalPay) * 100) : 50

  var isDiff = loanState.loanType === 'differentiated'
  var firstPayment = schedule.length > 0 ? schedule[0].payment : monthlyPayment
  var lastPayment  = schedule.length > 0 ? schedule[schedule.length - 1].payment : monthlyPayment

  var tabs = [
    { key: 'params',   icon: 'tune',          labelEN: 'Parameters', labelRU: '\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b', labelAM: '\u054a\u0561\u0580\u0561\u0574.' },
    { key: 'early',    icon: 'rocket_launch',  labelEN: 'Early',      labelRU: '\u0414\u043e\u0441\u0440\u043e\u0447.', labelAM: '\u054e\u0561\u0572.' },
    { key: 'advanced', icon: 'settings',       labelEN: 'Advanced',   labelRU: '\u0414\u043e\u043f.', labelAM: '\u0531\u057e\u0565\u056c.' }
  ]

  return (
    <main className="flex-1 px-4 md:px-10 pt-20 pb-16 max-w-7xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          {t(lang, 'calc', 'title')}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang, 'calc', 'desc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT COLUMN ── */}
        <div className="lg:col-span-5 space-y-4">

          {/* Tab bar */}
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 gap-1">
            {tabs.map(function(tb) {
              var lbl = lang === 'AM' ? tb.labelAM : lang === 'RU' ? tb.labelRU : tb.labelEN
              return (
                <button key={tb.key}
                  onClick={function() { setTab(tb.key) }}
                  className={'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ' +
                    (activeTab === tb.key
                      ? 'bg-white dark:bg-slate-900 text-blue-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')}
                >
                  <span className="material-symbols-outlined" style={{fontSize:'15px'}}>{tb.icon}</span>
                  {lbl}
                </button>
              )
            })}
          </div>

          {/* Parameters tab */}
          {activeTab === 'params' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                {lang === 'RU' ? '\u0422\u0438\u043f \u043f\u043b\u0430\u0442\u0435\u0436\u0430' : lang === 'AM' ? '\u054e\u0579\u0561\u0580\u056b \u057f\u0565\u057d\u0561\u056f' : 'Payment Type'}
              </p>
              <LoanTypeToggle
                value={loanState.loanType}
                onChange={function(v) {
                  setLoanState(function(prev) {
                    return { amount: prev.amount, rate: prev.rate, term: prev.term, loanType: v, fee: prev.fee, insurance: prev.insurance, startDate: prev.startDate }
                  })
                }}
                lang={lang}
              />

              <DualInput
                label={t(lang, 'calc', 'amount')}
                value={amount} min={100000} max={100000000} step={100000}
                onChange={set('amount', 100000, 100000000)}
                format={function(v) { return SYM + v.toLocaleString() }}
                minLabel={SYM + '100K'} maxLabel={SYM + '100M'}
              />
              <DualInput
                label={t(lang, 'calc', 'rate')}
                value={rate} min={1} max={50} step={0.5}
                onChange={set('rate', 0.1, 50)}
                format={function(v) { return v }}
                suffix="%" minLabel="1%" maxLabel="50%"
              />
              <DualInput
                label={t(lang, 'calc', 'term')}
                value={term} min={1} max={360} step={1}
                onChange={set('term', 1, 360)}
                format={function(v) { return v }}
                suffix={' ' + t(lang, 'calc', 'months')}
                minLabel={'1 ' + t(lang, 'calc', 'months')} maxLabel={'360 ' + t(lang, 'calc', 'months')}
              />

              {/* Quick term buttons */}
              <div className="grid grid-cols-5 gap-2">
                {[6, 12, 24, 36, 60].map(function(v) {
                  return (
                    <button key={v}
                      onClick={function() { set('term', 1, 360)(v) }}
                      className={'py-2 text-xs font-bold rounded-xl transition-colors ' +
                        (term === v
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700')}
                    >{v}</button>
                  )
                })}
              </div>

              {/* Breakdown bar */}
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>{t(lang, 'calc', 'principal')} {pct}%</span>
                  <span>{lang === 'RU' ? '\u041f\u0440\u043e\u0446\u0435\u043d\u0442\u044b' : 'Interest'} {100 - pct}%</span>
                </div>
                <div className="flex rounded-full overflow-hidden h-3">
                  <div className="bg-blue-700 transition-all" style={{width: pct + '%'}} />
                  <div className="bg-emerald-500 transition-all" style={{width: (100 - pct) + '%'}} />
                </div>
              </div>
            </div>
          )}

          {/* Early repayment tab */}
          {activeTab === 'early' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <EarlyPanel ctx={ctx} lang={lang} />
            </div>
          )}

          {/* Advanced tab */}
          {activeTab === 'advanced' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <AdvancedPanel loanState={loanState} setLoanState={setLoanState} lang={lang} />
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="lg:col-span-7 space-y-4">

          {/* Main KPI cards */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard accent label={t(lang, 'calc', 'monthly')}
              value={isDiff
                ? (SYM + Math.round(firstPayment).toLocaleString())
                : (SYM + Math.round(monthlyPayment).toLocaleString())}
              sub={isDiff
                ? (lang === 'RU' ? '\u043f\u0435\u0440\u0432\u044b\u0439, \u0434\u043e ' + SYM + Math.round(lastPayment).toLocaleString() : 'first, down to ' + SYM + Math.round(lastPayment).toLocaleString())
                : (term + ' ' + t(lang, 'calc', 'months'))}
            />
            <StatCard label={t(lang, 'calc', 'totalInt')}
              value={SYM + Math.round(totalInterest).toLocaleString()}
              sub={t(lang, 'calc', 'total') + ': ' + SYM + Math.round(totalPay).toLocaleString()}
            />
          </div>

          {/* APR card */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">APR</div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">{apr.toFixed(2)}%</div>
              <div className="text-xs text-slate-400 mt-1">
                {lang === 'RU' ? '\u0420\u0435\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0442\u0430\u0432\u043a\u0430' : 'Effective rate'}
              </div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                {lang === 'RU' ? '\u041f\u043b\u0430\u0442\u0435\u0436\u0435\u0439' : 'Payments'}
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">{schedule.length}</div>
              <div className="text-xs text-slate-400 mt-1">{t(lang, 'calc', 'months')}</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                {lang === 'RU' ? '\u0422\u0438\u043f' : 'Type'}
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                {isDiff
                  ? (lang === 'RU' ? '\u0414\u0438\u0444\u0444.' : 'Diff.')
                  : (lang === 'RU' ? '\u0410\u043d\u043d.' : 'Ann.')}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {lang === 'RU' ? '\u0441\u0445\u0435\u043c\u0430' : 'schema'}
              </div>
            </div>
          </div>

          {/* Schedule preview */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-slate-100">{t(lang, 'calc', 'preview')}</span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {schedule.length} {t(lang, 'calc', 'months')}
              </span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{t(lang, 'sched', 'month')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang, 'sched', 'payment')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang, 'sched', 'interest')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang, 'sched', 'balance')}</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, 4).map(function(row) {
                  return (
                    <tr key={row.month} className="border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/20">
                      <td className="px-4 py-2.5 font-bold text-blue-700 text-xs">{row.month}</td>
                      <td className="px-4 py-2.5 text-slate-400 text-xs">{row.label}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs">{SYM}{Math.round(row.payment).toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-xs text-emerald-600">{SYM}{Math.round(row.interest).toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-xs">{SYM}{Math.round(row.balance).toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button onClick={function() { navigate('/schedule') }}
              className="flex-1 bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 active:scale-95 transition-all">
              {t(lang, 'calc', 'viewFull')}
            </button>
            <button onClick={function() { window.print() }}
              className="w-36 bg-slate-100 dark:bg-slate-800 text-blue-700 py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700">
              {t(lang, 'calc', 'print')}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
