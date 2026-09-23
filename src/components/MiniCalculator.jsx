import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { generateAmortization } from '../context/LoanContext.jsx'
import { t } from '../i18n/labels.js'
import { SITE_URL } from '../config/site.js'

// Compact, self-contained calculator used by the SEO landing pages and the
// embeddable widget. It keeps its own state (not LoanContext) so an embed
// never touches the visitor's saved calculation.
//
// props: lang, initial {amount, rate, term, type}, accent ('#rrggbb'),
//        external (links open the main site in a new tab), refId, showBranding

var SYM = '֏'
var LIMITS = { amount: [100000, 100000000], rate: [0.1, 50], term: [1, 360] }
var TERM_CHIPS = [12, 36, 60, 120, 240, 360]

function clamp(v, k) { return Math.min(LIMITS[k][1], Math.max(LIMITS[k][0], v)) }
function money(n) { return SYM + Math.round(n).toLocaleString('en-US') }

function NumberField(props) {
  var focusArr = useState(false); var focused = focusArr[0]; var setFocused = focusArr[1]
  var rawArr = useState(''); var raw = rawArr[0]; var setRaw = rawArr[1]
  function commit() {
    setFocused(false)
    var n = parseFloat(String(raw).replace(',', '.').replace(/[^0-9.]/g, ''))
    if (!isNaN(n)) props.onChange(n)
  }
  return (
    <input
      inputMode="decimal"
      aria-label={props.label}
      value={focused ? raw : props.display}
      onFocus={function() { setFocused(true); setRaw(String(props.value)) }}
      onChange={function(e) { setRaw(e.target.value) }}
      onBlur={commit}
      onKeyDown={function(e) { if (e.key === 'Enter') e.target.blur() }}
      className="w-36 text-right text-lg font-extrabold bg-transparent text-slate-900 dark:text-white rounded-lg px-2 py-0.5 outline-none focus:bg-slate-100 dark:focus:bg-slate-800 tabular-nums" />
  )
}

function Row(props) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2 gap-2">
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">{props.label}</label>
        {props.field}
      </div>
      <input type="range" min={props.min} max={props.max} step={props.step} value={props.value}
        aria-label={props.label}
        onChange={function(e) { props.onChange(Number(e.target.value)) }}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-700"
        style={{ accentColor: props.accent }} />
    </div>
  )
}

export default function MiniCalculator(props) {
  var lang = props.lang || 'EN'
  var init = props.initial || {}
  var accent = props.accent || '#1d4ed8'
  var arr = useState({
    amount: clamp(init.amount || 5000000, 'amount'),
    rate: clamp(init.rate || 12, 'rate'),
    term: Math.round(clamp(init.term || 60, 'term')),
    type: init.type === 'differentiated' ? 'differentiated' : 'annuity'
  })
  var s = arr[0]; var setS = arr[1]
  function set(k) {
    return function(v) {
      setS(function(prev) {
        var n = Object.assign({}, prev)
        n[k] = k === 'type' ? v : (k === 'term' ? Math.round(clamp(v, k)) : clamp(v, k))
        return n
      })
    }
  }

  var res = useMemo(function() {
    var r = generateAmortization(s.amount, s.rate, s.term, [], s.type)
    var interest = 0; var total = 0
    for (var i = 0; i < r.schedule.length; i++) { interest += r.schedule[i].interest; total += r.schedule[i].payment }
    var last = r.schedule.length ? r.schedule[r.schedule.length - 1].payment : 0
    return { monthly: r.monthlyPayment, last: last, interest: interest, total: total }
  }, [s])

  var isDiff = s.type === 'differentiated'
  var pctInterest = res.total > 0 ? Math.round(res.interest / res.total * 100) : 0
  var query = '?amount=' + Math.round(s.amount) + '&rate=' + s.rate + '&term=' + s.term + '&type=' + s.type
  var utm = props.external
    ? '&utm_source=' + encodeURIComponent(props.refId || 'widget') + '&utm_medium=embed&utm_campaign=widget'
    : ''

  function Cta(p) {
    var cls = p.className
    if (props.external) {
      return <a href={SITE_URL + p.to + utm} target="_blank" rel="noopener" className={cls} style={p.style}>{p.children}</a>
    }
    return <Link to={p.to} className={cls} style={p.style}>{p.children}</Link>
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/70 dark:border-slate-800 shadow-sm p-5 sm:p-6">
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1 mb-5">
        {['annuity', 'differentiated'].map(function(tp) {
          var on = s.type === tp
          return (
            <button key={tp} type="button" onClick={function() { set('type')(tp) }}
              className={'flex-1 py-2 text-sm font-bold rounded-lg transition-all ' + (on ? 'text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700')}
              style={on ? { backgroundColor: accent } : undefined}>
              {tp === 'annuity' ? t(lang, 'calc', 'annuity') : t(lang, 'calc', 'diff')}
            </button>
          )
        })}
      </div>

      <Row label={t(lang, 'calc', 'amount')} min={100000} max={100000000} step={100000} value={s.amount} onChange={set('amount')} accent={accent}
        field={<NumberField label={t(lang, 'calc', 'amount')} value={s.amount} display={money(s.amount)} onChange={set('amount')} />} />
      <Row label={t(lang, 'calc', 'rate')} min={0.5} max={50} step={0.1} value={s.rate} onChange={set('rate')} accent={accent}
        field={<NumberField label={t(lang, 'calc', 'rate')} value={s.rate} display={s.rate + '%'} onChange={set('rate')} />} />
      <Row label={t(lang, 'calc', 'term')} min={1} max={360} step={1} value={s.term} onChange={set('term')} accent={accent}
        field={<NumberField label={t(lang, 'calc', 'term')} value={s.term} display={s.term + ' ' + t(lang, 'calc', 'months')} onChange={set('term')} />} />
      <div className="grid grid-cols-6 gap-1.5 -mt-2 mb-5">
        {TERM_CHIPS.map(function(m) {
          var on = s.term === m
          return (
            <button key={m} type="button" onClick={function() { set('term')(m) }}
              className={'py-1.5 text-[11px] font-bold rounded-lg transition-colors ' + (on ? 'text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700')}
              style={on ? { backgroundColor: accent } : undefined}>
              {m / 12}{t(lang, 'widget', 'years')}
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl p-5 text-white mb-3" style={{ background: 'linear-gradient(135deg, ' + accent + ', ' + accent + 'cc)' }}>
        <div className="text-[11px] font-bold uppercase tracking-widest opacity-80">{t(lang, 'calc', 'monthly')}</div>
        <div className="text-3xl font-extrabold tabular-nums tracking-tight" aria-live="polite">{money(res.monthly)}</div>
        {isDiff && <div className="text-xs opacity-80 mt-0.5">{t(lang, 'calc', 'firstDown')} {money(res.last)}</div>}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{t(lang, 'widget', 'overpay')}</div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">{money(res.interest)}</div>
        </div>
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{t(lang, 'calc', 'total')}</div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">{money(res.total)}</div>
        </div>
      </div>
      <div className="h-2 rounded-full bg-emerald-400/80 overflow-hidden mb-1.5" aria-hidden="true">
        <div className="h-full" style={{ width: (100 - pctInterest) + '%', backgroundColor: accent }} />
      </div>
      <div className="flex justify-between text-[11px] text-slate-400 mb-5">
        <span>{t(lang, 'calc', 'principal')} {100 - pctInterest}%</span>
        <span>{t(lang, 'calc', 'interest')} {pctInterest}%</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Cta to={'/' + query} className="text-center py-3 rounded-xl font-extrabold text-white hover:opacity-90 active:scale-[0.98] transition-all" style={{ backgroundColor: accent }}>
          {t(lang, 'widget', 'full')} &rarr;
        </Cta>
        <Cta to={'/offers' + query} className="text-center py-3 rounded-xl font-extrabold border-2 border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all">
          {t(lang, 'widget', 'lower')}
        </Cta>
      </div>

      {props.showBranding !== false && (
        <div className="text-center text-[11px] text-slate-400 mt-4">
          {t(lang, 'widget', 'powered')}{' '}
          <a href={SITE_URL + '/' + (props.external ? '?utm_source=' + encodeURIComponent(props.refId || 'widget') + '&utm_medium=embed&utm_campaign=branding' : '')}
            target={props.external ? '_blank' : undefined} rel="noopener"
            className="font-bold text-slate-500 dark:text-slate-300 hover:underline">ArmFinCredit</a>
        </div>
      )}
    </div>
  )
}
