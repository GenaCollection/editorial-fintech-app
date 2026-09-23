import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import { t } from '../i18n/labels.js'
import { activeOffers, BANKS_NO_DATA, OFFERS_AS_OF, CBA_RATE, MORE_SOURCES } from '../config/bankOffers.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'
import AdSlot from '../components/AdSlot.jsx'

// Pro catalog of public Armenian bank rates (src/config/bankOffers.js).
// Free users see the first offer of each tab; the rest is blurred.

var TABS = [['deposit', 'deposits'], ['mortgage', 'mortgage'], ['loan', 'loans']]
var CURRENCIES = ['ALL', 'AMD', 'USD', 'EUR']

function name(v, lang) { return !v ? '' : typeof v === 'string' ? v : (v[lang] || v.EN) }
function pct(n) { return String(n).replace(/\.0$/, '') + '%' }

function OfferRow(props) {
  var o = props.offer; var lang = props.lang
  var rate = o.rate[0] === o.rate[1] ? pct(o.rate[0]) : pct(o.rate[0]) + '–' + pct(o.rate[1])
  var prefix = o.upTo ? t(lang, 'banks', 'upTo') : o.from ? t(lang, 'banks', 'from') : ''
  return (
    <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800 first:border-t-0">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-slate-900 dark:text-white">
            {o.bank}
            {o.product && <span className="font-semibold text-slate-500 dark:text-slate-400"> · {name(o.product, lang)}</span>}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            <span className="inline-block font-black text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mr-1.5 align-middle">{o.currency}</span>
            {name(o.term, lang)}
            {o.minAmount && <span> · {t(lang, 'banks', 'min')} {name(o.minAmount, lang)}</span>}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white whitespace-nowrap">
            {prefix && <span className="text-xs font-bold text-slate-400 mr-1">{prefix}</span>}{rate}
          </span>
        </div>
      </div>
      {o.conditions && o.conditions.length > 0 && (
        <ul className="mt-2 space-y-1 text-[13px] text-slate-600 dark:text-slate-300">
          {o.conditions.map(function(c, i) {
            return <li key={i} className="flex gap-2"><span className="text-blue-600 dark:text-blue-400">•</span><span>{name(c, lang)}</span></li>
          })}
        </ul>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <a href={o.url} target="_blank" rel="noopener noreferrer nofollow" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">{t(lang, 'banks', 'open')} ↗</a>
        <span className="text-slate-400">{t(lang, 'banks', 'source')}: {o.source}{o.asOf ? ', ' + o.asOf : ''}</span>
        {o.validUntil && <span className="text-amber-600 dark:text-amber-400 font-bold">{t(lang, 'banks', 'until')} {o.validUntil}</span>}
      </div>
    </div>
  )
}

export default function BanksPage() {
  var lang = useLanguage().language
  var pro = usePro()
  useSeo(pageSeo('banks', lang))
  var tabArr = useState('deposit'); var tab = tabArr[0]; var setTab = tabArr[1]
  var curArr = useState('ALL'); var cur = curArr[0]; var setCur = curArr[1]

  var all = activeOffers()
  var list = all.filter(function(o) { return o.kind === tab && (tab !== 'deposit' || cur === 'ALL' || o.currency === cur) })
    .sort(function(a, b) { return tab === 'deposit' ? b.rate[1] - a.rate[1] : a.rate[0] - b.rate[0] })
  var banksCount = {}
  all.forEach(function(o) { banksCount[o.bank] = 1 })
  var visible = pro.limits.bankOffersVisible
  var open = list.slice(0, visible); var locked = list.slice(visible)

  return (
    <main className="flex-1 px-4 md:px-8 pt-24 pb-24 max-w-5xl mx-auto w-full animate-fade-up">
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"><span className="text-gradient">{t(lang, 'banks', 'title')}</span></h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang, 'banks', 'desc')}</p>
        <p className="text-sm text-slate-400 mt-1">{all.length} {t(lang, 'banks', 'offersFrom')} {Object.keys(banksCount).length} {t(lang, 'banks', 'banksN')}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
          {TABS.map(function(x) {
            var on = tab === x[0]
            return (
              <button key={x[0]} type="button" onClick={function() { setTab(x[0]) }}
                className={'px-4 py-2 text-sm font-bold rounded-lg transition-all ' + (on ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200')}>
                {t(lang, 'banks', x[1])}
              </button>
            )
          })}
        </div>
        {tab === 'deposit' && (
          <div className="flex gap-1">
            {CURRENCIES.map(function(c) {
              var on = cur === c
              return (
                <button key={c} type="button" onClick={function() { setCur(c) }}
                  className={'px-3 py-1.5 text-xs font-black rounded-lg border transition-colors ' + (on ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200')}>
                  {c === 'ALL' ? t(lang, 'banks', 'all') : c}
                </button>
              )
            })}
          </div>
        )}
      </div>
      <p className="text-xs text-slate-400 mb-4">{t(lang, 'banks', 'asOf')} {OFFERS_AS_OF} · {t(lang, 'banks', 'cba')}: <b>{pct(CBA_RATE.value)}</b> ({CBA_RATE.asOf})</p>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 overflow-hidden mb-4">
        {list.length === 0 && <p className="px-5 py-6 text-sm text-slate-400">{t(lang, 'banks', 'empty')}</p>}
        {open.map(function(o, i) { return <OfferRow key={i} offer={o} lang={lang} /> })}
        {locked.length > 0 && (
          <div className="relative">
            <div aria-hidden="true" className="blur-sm select-none pointer-events-none opacity-60 max-h-[520px] overflow-hidden">
              {locked.map(function(o, i) { return <OfferRow key={i} offer={o} lang={lang} /> })}
            </div>
            <div className="absolute inset-0 flex items-start justify-center p-4 pt-16">
              <button type="button" onClick={function() { pro.openUpgrade('banks') }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gradient text-white rounded-2xl font-extrabold shadow-xl shadow-blue-700/30 hover:opacity-95">
                <span className="material-symbols-outlined" style={{fontSize:'18px'}}>lock</span>
                {t(lang, 'banks', 'locked')} ({locked.length})
                {!pro.proEnabled && <span className="text-[9px] font-black uppercase bg-white/25 rounded px-1 py-0.5">{t(lang, 'pro', 'soonBadge')}</span>}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 leading-relaxed mb-8">{t(lang, 'banks', 'warn')}</p>

      <AdSlot placement="bottom" className="mb-8" />

      <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-5 mb-8">
        <p className="font-extrabold text-slate-900 dark:text-white mb-1">{t(lang, 'banks', 'noData')}</p>
        <p className="text-xs text-slate-400 mb-3">{t(lang, 'banks', 'noDataDesc')}</p>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm">
          {BANKS_NO_DATA.map(function(b) {
            return (
              <li key={b.bank}>
                <a href={b.url} target="_blank" rel="noopener noreferrer nofollow" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">{b.bank} ↗</a>
                <span className="text-slate-500 dark:text-slate-400"> — {name(b.note, lang)}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="text-sm text-slate-500 dark:text-slate-400">
        <span className="font-bold">{t(lang, 'banks', 'more')}:</span>{' '}
        {MORE_SOURCES.map(function(s, i) {
          return <span key={s.url}>{i > 0 ? ' · ' : ''}<a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-blue-600 dark:text-blue-400 hover:underline">{s.name}</a></span>
        })}
      </div>
    </main>
  )
}
