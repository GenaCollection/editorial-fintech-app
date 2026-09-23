import React, { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { projectDeposit } from '../lib/deposit.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'
import AdSlot from '../components/AdSlot.jsx'

var SYM = '֏'
function money(n) { return SYM + Math.round(n).toLocaleString('en-US') }
function short(n) {
  var a = Math.abs(n)
  if (a >= 1e6) return SYM + (n / 1e6).toFixed(a >= 1e7 ? 0 : 1) + 'M'
  if (a >= 1e3) return SYM + Math.round(n / 1e3) + 'K'
  return SYM + Math.round(n)
}

// Validated pair (light + dark): balance = blue solid, contributions = green dashed.
var C_BAL = 'text-[#2563eb] dark:text-[#3b82f6]'
var C_CON = 'text-[#059669]'

function Field(props) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2 gap-3">
        <label htmlFor={props.id} className="text-sm font-semibold text-slate-600 dark:text-slate-300">{props.label}</label>
        <div className="flex items-center gap-1">
          <input id={props.id} type="number" inputMode="decimal" value={props.value} min={props.min} max={props.max} step={props.step}
            onChange={function(e) { props.onChange(e.target.value === '' ? '' : Number(e.target.value)) }}
            className="w-36 text-right text-lg font-extrabold bg-slate-50 dark:bg-slate-800 rounded-lg px-2 py-1 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400 tabular-nums" />
          {props.suffix && <span className="text-sm text-slate-400 w-10">{props.suffix}</span>}
        </div>
      </div>
      <input type="range" aria-label={props.label} min={props.min} max={props.max} step={props.step} value={Number(props.value) || 0}
        onChange={function(e) { props.onChange(Number(e.target.value)) }}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-700 bg-slate-200 dark:bg-slate-700" />
    </div>
  )
}

function GrowthChart(props) {
  var rows = props.rows; var lang = props.lang
  var hArr = useState(null); var hover = hArr[0]; var setHover = hArr[1]
  var ref = useRef(null)
  var W = 640, H = 240, L = 56, R = 16, T = 12, B = 28
  var max = rows.reduce(function(m, r) { return Math.max(m, r.balance) }, 0) || 1
  var n = rows.length
  function x(i) { return L + (n <= 1 ? 0 : i / (n - 1) * (W - L - R)) }
  function y(v) { return T + (1 - v / max) * (H - T - B) }
  var balPts = rows.map(function(r, i) { return x(i) + ',' + y(r.balance) }).join(' ')
  var conPts = rows.map(function(r, i) { return x(i) + ',' + y(r.contributed) }).join(' ')
  var area = 'M' + x(0) + ',' + y(0) + ' L' + balPts.split(' ').join(' L') + ' L' + x(n - 1) + ',' + y(0) + ' Z'
  var ticks = [0, 0.5, 1].map(function(f) { return max * f })
  var yearTicks = rows.filter(function(r) { return r.month % 12 === 0 })
  if (yearTicks.length > 8) yearTicks = yearTicks.filter(function(r, i) { return i % Math.ceil(yearTicks.length / 8) === 0 })

  function onMove(e) {
    var box = ref.current.getBoundingClientRect()
    var px = (e.clientX - box.left) / box.width * W
    var i = Math.round((px - L) / (W - L - R) * (n - 1))
    setHover(Math.max(0, Math.min(n - 1, i)))
  }
  var hr = hover != null ? rows[hover] : null

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 mb-2">
        <span className="inline-flex items-center gap-1.5"><svg width="18" height="6" className={C_BAL}><line x1="0" y1="3" x2="18" y2="3" stroke="currentColor" strokeWidth="2" /></svg>{t(lang, 'dep', 'final')}</span>
        <span className="inline-flex items-center gap-1.5"><svg width="18" height="6" className={C_CON}><line x1="0" y1="3" x2="18" y2="3" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" /></svg>{t(lang, 'dep', 'contrib')}</span>
      </div>
      <svg ref={ref} viewBox={'0 0 ' + W + ' ' + H} className="w-full h-auto touch-none" role="img"
        aria-label={t(lang, 'dep', 'growth')}
        onPointerMove={onMove} onPointerLeave={function() { setHover(null) }}>
        {ticks.map(function(v, i) {
          return (
            <g key={i}>
              <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" />
              <text x={L - 8} y={y(v) + 4} textAnchor="end" className="fill-slate-400 text-[11px]">{short(v)}</text>
            </g>
          )
        })}
        {yearTicks.map(function(r) {
          return <text key={r.month} x={x(r.month - 1)} y={H - 8} textAnchor="middle" className="fill-slate-400 text-[11px]">{r.month / 12}{t(lang, 'widget', 'years')}</text>
        })}
        <path d={area} className={C_BAL} fill="currentColor" fillOpacity="0.1" />
        <polyline points={balPts} fill="none" className={C_BAL} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <polyline points={conPts} fill="none" className={C_CON} stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" strokeLinejoin="round" />
        {hr && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} className="stroke-slate-400" strokeWidth="1" />
            <circle cx={x(hover)} cy={y(hr.balance)} r="4.5" className={C_BAL + ' stroke-white dark:stroke-slate-900'} fill="currentColor" strokeWidth="2" />
            <circle cx={x(hover)} cy={y(hr.contributed)} r="4.5" className={C_CON + ' stroke-white dark:stroke-slate-900'} fill="currentColor" strokeWidth="2" />
          </g>
        )}
      </svg>
      {hr && (
        <div className="pointer-events-none absolute top-8 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs"
          style={{ left: Math.min(78, Math.max(2, hover / Math.max(1, n - 1) * 100 - 10)) + '%' }}>
          <div className="font-bold text-slate-900 dark:text-white mb-1">{t(lang, 'sched', 'month')} {hr.month}</div>
          <div className="text-slate-600 dark:text-slate-300">{t(lang, 'dep', 'final')}: <b className="text-slate-900 dark:text-white">{money(hr.balance)}</b></div>
          <div className="text-slate-600 dark:text-slate-300">{t(lang, 'dep', 'contrib')}: <b className="text-slate-900 dark:text-white">{money(hr.contributed)}</b></div>
        </div>
      )}
    </div>
  )
}

export default function DepositPage() {
  var lang = useLanguage().language
  useSeo(pageSeo('deposit', lang))
  var sArr = useState({ initial: 2000000, monthly: 50000, rate: 10, months: 24, cap: 'monthly', taxPct: 10 })
  var s = sArr[0]; var setS = sArr[1]
  function set(k) { return function(v) { setS(function(p) { var n = Object.assign({}, p); n[k] = v; return n }) } }

  var res = useMemo(function() {
    return projectDeposit({
      initial: Number(s.initial) || 0, monthly: Number(s.monthly) || 0, rate: Number(s.rate) || 0,
      months: Math.min(360, Math.max(1, Number(s.months) || 1)), cap: s.cap, taxPct: Number(s.taxPct) || 0
    })
  }, [s])

  var years = res.rows.filter(function(r) { return r.month % 12 === 0 || r.month === res.rows.length })
  var caps = [['monthly', 'capM'], ['quarterly', 'capQ'], ['end', 'capE']]

  return (
    <main className="flex-1 px-4 md:px-10 pt-24 pb-24 max-w-7xl mx-auto w-full animate-fade-up">
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"><span className="text-gradient">{t(lang, 'dep', 'title')}</span></h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang, 'dep', 'desc')}</p>
      </div>

      <AdSlot placement="top" className="mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/70 dark:border-slate-800 p-6">
          <Field id="d-init" label={t(lang, 'dep', 'initial')} value={s.initial} min={0} max={100000000} step={100000} onChange={set('initial')} suffix={SYM} />
          <Field id="d-mon" label={t(lang, 'dep', 'monthly')} value={s.monthly} min={0} max={2000000} step={10000} onChange={set('monthly')} suffix={SYM} />
          <Field id="d-rate" label={t(lang, 'dep', 'rate')} value={s.rate} min={0} max={20} step={0.1} onChange={set('rate')} suffix="%" />
          <Field id="d-term" label={t(lang, 'dep', 'term')} value={s.months} min={1} max={360} step={1} onChange={set('months')} suffix={t(lang, 'calc', 'months')} />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">{t(lang, 'dep', 'cap')}</p>
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1 mb-5">
            {caps.map(function(c) {
              var on = s.cap === c[0]
              return (
                <button key={c[0]} type="button" onClick={function() { set('cap')(c[0]) }}
                  className={'flex-1 py-2 text-xs font-bold rounded-lg transition-all ' + (on ? 'bg-blue-700 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700')}>
                  {t(lang, 'dep', c[1])}
                </button>
              )
            })}
          </div>
          <Field id="d-tax" label={t(lang, 'dep', 'tax')} value={s.taxPct} min={0} max={30} step={1} onChange={set('taxPct')} suffix="%" />
          <p className="text-xs text-slate-400 -mt-3">{t(lang, 'dep', 'taxNote')}</p>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl p-5 md:p-6 bg-brand-gradient text-white shadow-xl shadow-blue-700/25">
              <div className="text-xs font-bold uppercase tracking-widest opacity-75 mb-1">{t(lang, 'dep', 'final')}</div>
              <div className="text-2xl md:text-3xl font-extrabold tabular-nums tracking-tight" aria-live="polite">{money(res.final)}</div>
              <div className="text-xs opacity-75 mt-1">{t(lang, 'dep', 'effective')}: {res.effective.toFixed(2)}% {t(lang, 'dep', 'perYear')}</div>
            </div>
            <div className="rounded-3xl p-5 md:p-6 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{t(lang, 'dep', 'earned')}</div>
              <div className="text-2xl md:text-3xl font-extrabold tabular-nums tracking-tight text-emerald-600">+{money(res.net)}</div>
              <div className="text-xs text-slate-400 mt-1">{t(lang, 'dep', 'taxPaid')}: {money(res.tax)}</div>
            </div>
          </div>
          <div className="rounded-3xl p-5 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
            <div className="flex justify-between items-baseline mb-2">
              <p className="font-bold text-slate-900 dark:text-white">{t(lang, 'dep', 'growth')}</p>
              <p className="text-xs text-slate-400">{t(lang, 'dep', 'contrib')}: {money(res.contributed)}</p>
            </div>
            <GrowthChart rows={res.rows} lang={lang} />
          </div>
          <Link to="/banks" className="group flex items-center gap-4 rounded-3xl border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-blue-950/30 px-5 py-4 hover:border-blue-400 transition-all">
            <span className="w-11 h-11 shrink-0 rounded-2xl bg-blue-700 text-white flex items-center justify-center">
              <span className="material-symbols-outlined">account_balance</span>
            </span>
            <span className="flex-1">
              <span className="block font-extrabold text-slate-900 dark:text-white">{t(lang, 'dep', 'banksCta')} <span className="ml-1 text-[9px] font-black bg-brand-gradient text-white px-1.5 py-0.5 rounded align-middle">PRO</span></span>
              <span className="block text-sm text-slate-500 dark:text-slate-400">{t(lang, 'dep', 'banksCtaD')}</span>
            </span>
            <span className="material-symbols-outlined text-blue-600 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 overflow-x-auto mb-8">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">{t(lang, 'dep', 'byYear')}</div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold text-slate-400 uppercase">{t(lang, 'dep', 'year')}</th>
              <th className="px-5 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang, 'dep', 'contrib')}</th>
              <th className="px-5 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang, 'dep', 'earned')}</th>
              <th className="px-5 py-3 text-right text-xs font-bold text-slate-400 uppercase">{t(lang, 'dep', 'balance')}</th>
            </tr>
          </thead>
          <tbody>
            {years.map(function(r) {
              return (
                <tr key={r.month} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-5 py-3 font-bold text-blue-700 dark:text-blue-400">{(r.month / 12) % 1 === 0 ? r.month / 12 : (r.month / 12).toFixed(1)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-slate-600 dark:text-slate-300">{money(r.contributed)}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-emerald-600">+{money(r.balance - r.contributed)}</td>
                  <td className="px-5 py-3 text-right tabular-nums font-bold text-slate-900 dark:text-white">{money(r.balance)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-400 mb-8">{t(lang, 'dep', 'disclaimer')}</p>
      <AdSlot placement="bottom" />
    </main>
  )
}
