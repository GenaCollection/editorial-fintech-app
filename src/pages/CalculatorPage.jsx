import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLoan, generateAmortization } from '../context/LoanContext.jsx'
import { useSaved } from '../context/SavedContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

var SYM = '\u058f'

// ── Pie chart (SVG, no deps) ──────────────────────────────────────────────────
function PieChart(props) {
  var principal = props.principal || 0
  var interest = props.interest || 0
  var lang = props.lang
  var total = principal + interest
  if (total <= 0) return null
  var pctP = principal / total
  var pctI = interest / total
  var r = 56; var cx = 70; var cy = 70
  function arc(pct, startAngle) {
    var angle = pct * 2 * Math.PI
    var endAngle = startAngle + angle
    var x1 = cx + r * Math.sin(startAngle); var y1 = cy - r * Math.cos(startAngle)
    var x2 = cx + r * Math.sin(endAngle);   var y2 = cy - r * Math.cos(endAngle)
    var large = angle > Math.PI ? 1 : 0
    return 'M '+cx+' '+cy+' L '+x1+' '+y1+' A '+r+' '+r+' 0 '+large+' 1 '+x2+' '+y2+' Z'
  }
  var pLabel = Math.round(pctP * 100) + '%'
  var iLabel = Math.round(pctI * 100) + '%'
  return (
    <div className="flex items-center gap-5">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <path d={arc(pctP, 0)} fill="#1d4ed8" />
        <path d={arc(pctI, pctP * 2 * Math.PI)} fill="#10b981" />
        <circle cx={cx} cy={cy} r="32" fill="white" className="dark:fill-slate-900" />
        <text x={cx} y={cy-4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">{pLabel}</text>
        <text x={cx} y={cy+10} textAnchor="middle" fontSize="9" fill="#64748b">{iLabel}</text>
      </svg>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-700 inline-block"></span>
          <span className="text-slate-600 dark:text-slate-300">{t(lang,'calc','principal')}</span>
          <span className="font-bold text-slate-900 dark:text-white ml-auto">{pLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span className="text-slate-600 dark:text-slate-300">{t(lang,'calc','interest')}</span>
          <span className="font-bold text-slate-900 dark:text-white ml-auto">{iLabel}</span>
        </div>
      </div>
    </div>
  )
}

// ── Save modal ────────────────────────────────────────────────────────────────
function SaveModal(props) {
  var onSave = props.onSave
  var onClose = props.onClose
  var lang = props.lang
  var nameArr = useState('')
  var name = nameArr[0]; var setName = nameArr[1]

  var lbl = {
    title:       { AM: 'Պahvel Հաշvark', RU: 'Сохранить расчёт', EN: 'Save Calculation' },
    nameLbl:     { AM: 'Անուն', RU: 'Название', EN: 'Name' },
    placeholder: { AM: 'Օր. Բն. Վarк 2026', RU: 'Напр., Ипотека 2026', EN: 'e.g. Home Loan 2026' },
    save:        { AM: 'Պahvel', RU: 'Сохранить', EN: 'Save' },
    cancel:      { AM: 'Allel', RU: 'Отмена', EN: 'Cancel' }
  }
  function lb(key) { return (lbl[key] && (lbl[key][lang] || lbl[key]['EN'])) || key }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(name.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 shadow-2xl max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-blue-700 text-3xl">bookmark_add</span>
          <p className="font-extrabold text-slate-900 dark:text-white text-xl">{lb('title')}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{lb('nameLbl')}</label>
          <input
            autoFocus
            type="text"
            value={name}
            onChange={function(e) { setName(e.target.value) }}
            placeholder={lb('placeholder')}
            maxLength={40}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400 mb-5"
          />
          <div className="flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200">
              {lb('cancel')}
            </button>
            <button type="submit"
              className="flex-1 py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800">
              {lb('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Reusable dual-input (slider + number field) ───────────────────────────────
function DualInput(props) {
  var label = props.label; var value = props.value; var min = props.min; var max = props.max
  var step = props.step; var onChange = props.onChange; var format = props.format
  var suffix = props.suffix || ''
  var rawArr = useState(''); var raw = rawArr[0]; var setRaw = rawArr[1]
  var focusArr = useState(false); var focused = focusArr[0]; var setFocused = focusArr[1]
  function handleFocus() { setFocused(true); setRaw(String(value)) }
  function handleBlur() {
    setFocused(false)
    var n = parseFloat(raw.replace(/[^0-9.]/g, ''))
    if (!isNaN(n)) onChange(Math.max(min, Math.min(max, n)))
    setRaw('')
  }
  function handleKey(e) { if (e.key === 'Enter') e.target.blur() }
  return (
    <div className="mb-7">
      <div className="flex justify-between items-end mb-3">
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</span>
        <div className="flex items-center gap-1">
          {focused
            ? <input autoFocus type="text" value={raw}
                onChange={function(e) { setRaw(e.target.value) }}
                onBlur={handleBlur} onKeyDown={handleKey}
                className="w-32 text-right text-xl font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg px-2 py-0.5 outline-none border border-blue-400" />
            : <button onClick={handleFocus}
                className="text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-700 transition-colors tabular-nums">
                {format ? format(value) : value}{suffix}
              </button>
          }
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={function(e) { onChange(Number(e.target.value)) }}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700" />
      <div className="flex justify-between text-xs text-slate-400 mt-1">
        <span>{props.minLabel || min}</span><span>{props.maxLabel || max}</span>
      </div>
    </div>
  )
}

// ── Loan type toggle ──────────────────────────────────────────────────────────
function LoanTypeToggle(props) {
  var value = props.value; var onChange = props.onChange; var lang = props.lang
  var types = [
    { key: 'annuity',        label: function(l) { return t(l,'calc','annuity') } },
    { key: 'differentiated', label: function(l) { return t(l,'calc','diff') } }
  ]
  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1 mb-6">
      {types.map(function(tp) {
        return (
          <button key={tp.key} onClick={function() { onChange(tp.key) }}
            className={'flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ' +
              (value === tp.key ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700')}
          >{tp.label(lang)}</button>
        )
      })}
    </div>
  )
}

// ── Mini stat card ────────────────────────────────────────────────────────────
function StatCard(props) {
  return (
    <div className={'rounded-2xl p-5 ' + (props.accent ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800')}>
      <div className={'text-xs font-bold uppercase tracking-widest mb-1 ' + (props.accent ? 'opacity-70' : 'text-slate-400')}>{props.label}</div>
      <div className={'text-2xl font-extrabold ' + (props.accent ? '' : 'text-slate-900 dark:text-white')}>{props.value}</div>
      {props.sub && <div className={'text-xs mt-1 ' + (props.accent ? 'opacity-60' : 'text-slate-400')}>{props.sub}</div>}
    </div>
  )
}

// ── Early repayment panel ─────────────────────────────────────────────────────
function EarlyPanel(props) {
  var ctx = props.ctx; var loanState = ctx.loanState; var extraPayments = ctx.extraPayments
  var addExtraPayment = ctx.addExtraPayment; var removeExtraPayment = ctx.removeExtraPayment
  var schedule = ctx.schedule; var totalInterest = ctx.totalInterest; var lang = props.lang
  var mArr = useState(1); var epMonth = mArr[0]; var setEpMonth = mArr[1]
  var aArr = useState(''); var epAmount = aArr[0]; var setEpAmount = aArr[1]
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
      return { extra: extra, months: res.schedule.length, monthsSaved: baseComputed.months > res.schedule.length ? baseComputed.months - res.schedule.length : 0, saved: baseComputed.interest > interest ? baseComputed.interest - interest : 0 }
    })
  }, [loanState, baseComputed])
  function handleAdd() { var n = Number(epAmount); if (!n || n <= 0) return; addExtraPayment(epMonth, n); setEpAmount('') }
  return (
    <div className="space-y-5">
      {extraPayments.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t(lang,'early','moSaved')}</div>
            <div className="text-3xl font-extrabold text-emerald-600">{monthsSaved > 0 ? monthsSaved : '\u2014'}</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5">
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t(lang,'early','intSavedLbl')}</div>
            <div className="text-2xl font-extrabold text-blue-700">{interestSaved > 0 ? (SYM + Math.round(interestSaved).toLocaleString()) : '\u2014'}</div>
          </div>
        </div>
      )}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t(lang,'early','addEarly')}</div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">{t(lang,'sched','month')}</label>
            <input type="number" min="1" max={loanState.term} value={epMonth}
              onChange={function(e) { setEpMonth(Number(e.target.value)) }}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">{t(lang,'sched','amount')}</label>
            <input type="number" min="1" value={epAmount} onChange={function(e) { setEpAmount(e.target.value) }} placeholder="100 000"
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
          </div>
        </div>
        <button onClick={handleAdd} className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors">
          {t(lang,'early','addPayment')}
        </button>
      </div>
      {extraPayments.length > 0 && (
        <div className="space-y-2">
          {extraPayments.map(function(ep) {
            return (
              <div key={ep.month} className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3">
                <div>
                  <span className="text-xs text-slate-400">{t(lang,'sched','mo')} {ep.month}</span>
                  <span className="ml-3 font-bold text-slate-900 dark:text-white">{SYM}{Number(ep.amount).toLocaleString()}</span>
                </div>
                <button onClick={function() { removeExtraPayment(ep.month) }} className="text-slate-400 hover:text-red-500 transition-colors text-lg font-bold">&times;</button>
              </div>
            )
          })}
        </div>
      )}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{t(lang,'early','extraHdr')}</div>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{t(lang,'early','extraCol')}</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'early','months')}</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">-{t(lang,'sched','mo')}</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'early','saved')}</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map(function(sc, i) {
                return (
                  <tr key={i} className="border-t border-slate-50 dark:border-slate-800 hover:bg-blue-50/20">
                    <td className="px-4 py-3 font-bold">{SYM}{sc.extra.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-slate-500">{sc.months}</td>
                    <td className="px-4 py-3 text-right">{sc.monthsSaved > 0 ? <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 font-bold px-2 py-0.5 rounded text-xs">-{sc.monthsSaved}</span> : <span className="text-slate-300">\u2014</span>}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-600">{sc.saved > 0 ? (SYM + Math.round(sc.saved).toLocaleString()) : '\u2014'}</td>
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
  var loanState = props.loanState; var setLoanState = props.setLoanState; var lang = props.lang
  function set(key) {
    return function(val) {
      setLoanState(function(prev) {
        var n = { amount: prev.amount, rate: prev.rate, term: prev.term, loanType: prev.loanType, fee: prev.fee, insurance: prev.insurance, startDate: prev.startDate }
        n[key] = val; return n
      })
    }
  }
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t(lang,'adv','fee')}</label>
          <div className="flex gap-2">
            <input type="number" min="0" step="1000" value={loanState.fee}
              onChange={function(e) { set('fee')(Number(e.target.value)) }}
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
            <span className="flex items-center text-slate-400 font-bold">{SYM}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">{t(lang,'adv','feeNote')}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t(lang,'adv','insurance')}</label>
          <div className="flex gap-2">
            <input type="number" min="0" step="100" value={loanState.insurance}
              onChange={function(e) { set('insurance')(Number(e.target.value)) }}
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
            <span className="flex items-center text-slate-400 font-bold">{SYM}</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">{t(lang,'adv','insNote')}</p>
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t(lang,'adv','startDate')}</label>
        <input type="month" value={loanState.startDate}
          onChange={function(e) { set('startDate')(e.target.value) }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-400" />
      </div>
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 text-sm text-amber-800 dark:text-amber-200">
        <span className="font-bold">&#9432;</span>{' '}{t(lang,'adv','aprNote')}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CalculatorPage() {
  var ctx = useLoan()
  var loanState = ctx.loanState; var setLoanState = ctx.setLoanState
  var monthlyPayment = ctx.monthlyPayment; var totalInterest = ctx.totalInterest
  var totalPayment = ctx.totalPayment; var schedule = ctx.schedule; var apr = ctx.apr
  var extraPayments = ctx.extraPayments
  var savedCtx = useSaved()
  var saveCalc = savedCtx.saveCalc
  var saves = savedCtx.saves
  var navigate = useNavigate()
  var lang = useLanguage().language
  var searchParamsArr = useSearchParams()
  var searchParams = searchParamsArr[0]

  useEffect(function() {
    var a = Number(searchParams.get('amount')); var r = Number(searchParams.get('rate'))
    var m = Number(searchParams.get('term'));   var tp = searchParams.get('type')
    if (a > 0 || r > 0 || m > 0) {
      setLoanState(function(prev) {
        return {
          amount:    a > 0 ? Math.min(100000000, Math.max(100000, a)) : prev.amount,
          rate:      r > 0 ? Math.min(50, Math.max(0.1, r))           : prev.rate,
          term:      m > 0 ? Math.min(360, Math.max(1, m))            : prev.term,
          loanType:  tp === 'differentiated' ? 'differentiated'       : prev.loanType,
          fee: prev.fee, insurance: prev.insurance, startDate: prev.startDate
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  var tabArr = useState('params'); var activeTab = tabArr[0]; var setTab = tabArr[1]
  var copiedArr = useState(false); var copied = copiedArr[0]; var setCopied = copiedArr[1]
  var showSaveArr = useState(false); var showSave = showSaveArr[0]; var setShowSave = showSaveArr[1]

  var amount = loanState.amount; var rate = loanState.rate; var term = loanState.term

  function set(key, min, max) {
    return function(val) {
      var v = Math.max(min, Math.min(max, val))
      setLoanState(function(prev) {
        var n = { amount: prev.amount, rate: prev.rate, term: prev.term, loanType: prev.loanType, fee: prev.fee, insurance: prev.insurance, startDate: prev.startDate }
        n[key] = v; return n
      })
    }
  }

  function handleShare() {
    var url = window.location.origin + '/?amount=' + amount + '&rate=' + rate + '&term=' + term + '&type=' + loanState.loanType
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function() { setCopied(true); setTimeout(function() { setCopied(false) }, 2000) })
    } else {
      var el = document.createElement('textarea'); el.value = url; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el)
      setCopied(true); setTimeout(function() { setCopied(false) }, 2000)
    }
  }

  function handleSave(name) {
    saveCalc(loanState, extraPayments, {
      name: name || ('Calc #' + (saves.length + 1)),
      monthlyPayment: monthlyPayment,
      totalInterest: totalInterest,
      apr: apr
    })
    setShowSave(false)
  }

  var totalPay = totalPayment || (monthlyPayment * term)
  var isDiff = loanState.loanType === 'differentiated'
  var firstPayment = schedule.length > 0 ? schedule[0].payment : monthlyPayment
  var lastPayment  = schedule.length > 0 ? schedule[schedule.length - 1].payment : monthlyPayment
  var tabs = [{ key: 'params', icon: 'tune' }, { key: 'early', icon: 'rocket_launch' }, { key: 'advanced', icon: 'settings' }]

  var saveLbl = {
    save:   { AM: 'Պahvel', RU: 'Сохранить', EN: 'Save' },
    share:  { AM: 'Կիsarc', RU: 'Поделиться', EN: 'Share' },
    copied: { AM: 'Պатlvah!', RU: 'Скопировано!', EN: 'Copied!' }
  }
  function sl(k) { return (saveLbl[k] && (saveLbl[k][lang] || saveLbl[k]['EN'])) || k }

  return (
    <main className="flex-1 px-4 md:px-10 pt-20 pb-16 max-w-7xl mx-auto w-full">
      {showSave && <SaveModal onSave={handleSave} onClose={function() { setShowSave(false) }} lang={lang} />}

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">{t(lang,'calc','title')}</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang,'calc','desc')}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={function() { setShowSave(true) }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-bold hover:bg-blue-100 transition-all">
            <span className="material-symbols-outlined" style={{fontSize:'18px'}}>bookmark_add</span>
            {sl('save')}
          </button>
          <button onClick={handleShare}
            className={'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ' +
              (copied
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-400'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-700')}>
            <span className="material-symbols-outlined" style={{fontSize:'18px'}}>{copied ? 'check_circle' : 'share'}</span>
            {copied ? sl('copied') : sl('share')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 gap-1">
            {tabs.map(function(tb) {
              return (
                <button key={tb.key} onClick={function() { setTab(tb.key) }}
                  className={'flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ' +
                    (activeTab === tb.key ? 'bg-white dark:bg-slate-900 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300')}
                >
                  <span className="material-symbols-outlined" style={{fontSize:'15px'}}>{tb.icon}</span>
                  {t(lang,'tabs',tb.key)}
                </button>
              )
            })}
          </div>

          {activeTab === 'params' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t(lang,'calc','payType')}</p>
              <LoanTypeToggle value={loanState.loanType}
                onChange={function(v) { setLoanState(function(prev) { return { amount: prev.amount, rate: prev.rate, term: prev.term, loanType: v, fee: prev.fee, insurance: prev.insurance, startDate: prev.startDate } }) }}
                lang={lang} />
              <DualInput label={t(lang,'calc','amount')} value={amount} min={100000} max={100000000} step={100000}
                onChange={set('amount',100000,100000000)} format={function(v) { return SYM + v.toLocaleString() }}
                minLabel={SYM+'100K'} maxLabel={SYM+'100M'} />
              <DualInput label={t(lang,'calc','rate')} value={rate} min={1} max={50} step={0.5}
                onChange={set('rate',0.1,50)} format={function(v) { return v }} suffix="%" minLabel="1%" maxLabel="50%" />
              <DualInput label={t(lang,'calc','term')} value={term} min={1} max={360} step={1}
                onChange={set('term',1,360)} format={function(v) { return v }}
                suffix={' '+t(lang,'calc','months')} minLabel={'1 '+t(lang,'calc','months')} maxLabel={'360 '+t(lang,'calc','months')} />
              <div className="grid grid-cols-5 gap-2">
                {[6,12,24,36,60].map(function(v) {
                  return (
                    <button key={v} onClick={function() { set('term',1,360)(v) }}
                      className={'py-2 text-xs font-bold rounded-xl transition-colors ' +
                        (term===v ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700')}
                    >{v}</button>
                  )
                })}
              </div>
              <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{t(lang,'calc','breakd')}</p>
                <PieChart principal={amount} interest={Math.round(totalInterest)} lang={lang} />
              </div>
            </div>
          )}

          {activeTab === 'early' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <EarlyPanel ctx={ctx} lang={lang} />
            </div>
          )}
          {activeTab === 'advanced' && (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <AdvancedPanel loanState={loanState} setLoanState={setLoanState} lang={lang} />
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard accent label={t(lang,'calc','monthly')}
              value={isDiff ? (SYM+Math.round(firstPayment).toLocaleString()) : (SYM+Math.round(monthlyPayment).toLocaleString())}
              sub={isDiff ? (t(lang,'calc','firstDown')+' '+SYM+Math.round(lastPayment).toLocaleString()) : (term+' '+t(lang,'calc','months'))} />
            <StatCard label={t(lang,'calc','totalInt')} value={SYM+Math.round(totalInterest).toLocaleString()}
              sub={t(lang,'calc','total')+': '+SYM+Math.round(totalPay).toLocaleString()} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">APR</div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">{apr.toFixed(2)}%</div>
              <div className="text-xs text-slate-400 mt-1">{t(lang,'calc','effRate')}</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t(lang,'calc','payments')}</div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white">{schedule.length}</div>
              <div className="text-xs text-slate-400 mt-1">{t(lang,'calc','months')}</div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t(lang,'calc','type')}</div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">{isDiff ? t(lang,'calc','diff') : t(lang,'calc','annuity')}</div>
              <div className="text-xs text-slate-400 mt-1">{t(lang,'calc','schema')}</div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="font-bold text-slate-900 dark:text-slate-100">{t(lang,'calc','preview')}</span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{schedule.length} {t(lang,'calc','months')}</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">#</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','month')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','payment')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','interest')}</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang,'sched','balance')}</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0,4).map(function(row) {
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
          <div className="flex gap-3">
            <button onClick={function() { navigate('/schedule') }}
              className="flex-1 bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 active:scale-95 transition-all">
              {t(lang,'calc','viewFull')}
            </button>
            <button onClick={function() { window.print() }}
              className="w-36 bg-slate-100 dark:bg-slate-800 text-blue-700 py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700">
              {t(lang,'calc','print')}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
