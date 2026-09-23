import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import { t } from '../i18n/labels.js'
import { BANK_OFFERS, OFFERS_AS_OF, CBA_RATE, MORE_SOURCES } from '../config/bankOffers.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'
import AdSlot from '../components/AdSlot.jsx'

// Pro catalog of public Armenian bank rates (src/config/bankOffers.js).
// Free users see the first offer of each kind; the rest is blurred.

function name(v, lang) { return typeof v === 'string' ? v : (v[lang] || v.EN) }
function pct(n) { return String(n).replace(/\.0$/, '') + '%' }

function OfferRow(props) {
  var o = props.offer; var lang = props.lang
  var rate = o.rate[0] === o.rate[1] ? pct(o.rate[0]) : pct(o.rate[0]) + '–' + pct(o.rate[1])
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-t border-slate-100 dark:border-slate-800 first:border-t-0">
      <div className="flex-1 min-w-0">
        <p className="font-extrabold text-slate-900 dark:text-white">{name(o.bank, lang)}</p>
        <p className="text-xs text-slate-400">{o.currency} · {name(o.term, lang)}{o.note ? ' · ' + name(o.note, lang) : ''}</p>
      </div>
      <div className="sm:w-40 sm:text-right">
        <span className="text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">
          {o.upTo && <span className="text-xs font-bold text-slate-400 mr-1">{t(lang, 'banks', 'upTo')}</span>}{rate}
        </span>
      </div>
      <div className="sm:w-44 flex sm:flex-col sm:items-end gap-2 text-xs">
        <a href={o.url} target="_blank" rel="noopener noreferrer nofollow" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">{t(lang, 'banks', 'open')} ↗</a>
        <span className="text-slate-400">{t(lang, 'banks', 'source')}: {o.source}</span>
      </div>
    </div>
  )
}

export default function BanksPage() {
  var lang = useLanguage().language
  var pro = usePro()
  useSeo(pageSeo('banks', lang))
  var tabArr = useState('deposit'); var tab = tabArr[0]; var setTab = tabArr[1]
  var list = BANK_OFFERS.filter(function(o) { return o.kind === tab })
    .sort(function(a, b) { return tab === 'deposit' ? b.rate[1] - a.rate[1] : a.rate[0] - b.rate[0] })
  var visible = pro.limits.bankOffersVisible
  var open = list.slice(0, visible); var locked = list.slice(visible)

  return (
    <main className="flex-1 px-4 md:px-8 pt-24 pb-24 max-w-5xl mx-auto w-full animate-fade-up">
      <div className="mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"><span className="text-gradient">{t(lang, 'banks', 'title')}</span></h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang, 'banks', 'desc')}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
          {[['deposit', 'deposits'], ['mortgage', 'mortgage']].map(function(x) {
            var on = tab === x[0]
            return (
              <button key={x[0]} type="button" onClick={function() { setTab(x[0]) }}
                className={'px-4 py-2 text-sm font-bold rounded-lg transition-all ' + (on ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200')}>
                {t(lang, 'banks', x[1])}
              </button>
            )
          })}
        </div>
        <span className="text-xs text-slate-400">{t(lang, 'banks', 'asOf')} {OFFERS_AS_OF} · {t(lang, 'banks', 'cba')}: <b>{pct(CBA_RATE.value)}</b> ({CBA_RATE.asOf})</span>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 overflow-hidden mb-4">
        {open.map(function(o, i) { return <OfferRow key={i} offer={o} lang={lang} /> })}
        {locked.length > 0 && (
          <div className="relative">
            <div aria-hidden="true" className="blur-sm select-none pointer-events-none opacity-60">
              {locked.map(function(o, i) { return <OfferRow key={i} offer={o} lang={lang} /> })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
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

      <div className="text-sm text-slate-500 dark:text-slate-400">
        <span className="font-bold">{t(lang, 'banks', 'more')}:</span>{' '}
        {MORE_SOURCES.map(function(s, i) {
          return <span key={s.url}>{i > 0 ? ' · ' : ''}<a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-blue-600 dark:text-blue-400 hover:underline">{s.name}</a></span>
        })}
      </div>
    </main>
  )
}
