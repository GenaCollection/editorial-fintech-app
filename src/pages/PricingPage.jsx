import React, { useState } from 'react'
import { usePro } from '../context/ProContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { PLANS } from '../config/monetization.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'

var ROWS = [
  ['calculate', 'fCalc', 'fCalc'],
  ['auto_awesome', 'fAiFree', 'fAi'],
  ['bookmarks', 'fSavesFree', 'fSaves'],
  ['compare_arrows', 'fCompareFree', 'fCompare'],
  ['picture_as_pdf', 'fPdfFree', 'fPdf'],
  ['table_view', null, 'fCsv'],
  ['block', null, 'fNoAds']
]

function Check(props) {
  return props.on
    ? <span className="material-symbols-outlined text-emerald-500" style={{fontSize:'18px'}}>check_circle</span>
    : <span className="material-symbols-outlined text-slate-300 dark:text-slate-600" style={{fontSize:'18px'}}>remove</span>
}

export default function PricingPage() {
  var pro = usePro()
  var lang = useLanguage().language
  useSeo(pageSeo('pro', lang))
  var keyArr = useState(''); var key = keyArr[0]; var setKey = keyArr[1]
  var msgArr = useState(null); var msg = msgArr[0]; var setMsg = msgArr[1]
  var busyArr = useState(false); var busy = busyArr[0]; var setBusy = busyArr[1]

  function activate(e) {
    e.preventDefault()
    setBusy(true); setMsg(null)
    pro.activateLicense(key).then(function(res) {
      setBusy(false)
      if (res.valid) { setKey(''); setMsg({ ok: true, text: t(lang,'pro','thanks') }) }
      else setMsg({ ok: false, text: t(lang,'pro', res.error === 'network' || res.error === 'not_configured' ? 'netErr' : 'badKey') })
    })
  }

  var statusBanner = null
  if (pro.status === 'pro') {
    statusBanner = (
      <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl px-5 py-4 mb-8">
        <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-300 font-bold">
          <span className="material-symbols-outlined">verified</span>
          {t(lang,'pro','active')} · {pro.license && pro.license.plan}
        </div>
        <button onClick={pro.deactivate} className="text-xs font-bold text-slate-500 hover:text-red-500">{t(lang,'pro','deactivate')}</button>
      </div>
    )
  } else if (pro.status === 'trial') {
    statusBanner = (
      <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl px-5 py-4 mb-8 text-blue-800 dark:text-blue-300 font-bold">
        <span className="material-symbols-outlined">hourglass_top</span>
        {t(lang,'pro','trialOn')} · {pro.trialDaysLeft} {t(lang,'menu','daysLeft')}
      </div>
    )
  } else if (pro.status === 'trial_expired') {
    statusBanner = (
      <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl px-5 py-4 mb-8 text-amber-800 dark:text-amber-300 font-bold">
        <span className="material-symbols-outlined">schedule</span>
        {t(lang,'pro','trialEnded')}
      </div>
    )
  }

  return (
    <main className="flex-1 pt-24 pb-20 px-4 md:px-8 w-full max-w-5xl mx-auto animate-fade-up">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 rounded-full px-3 py-1 mb-4">
          <span className="material-symbols-outlined" style={{fontSize:'16px'}}>workspace_premium</span> PRO
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          <span className="text-gradient">{t(lang,'pro','title')}</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">{t(lang,'pro','subtitle')}</p>
      </div>

      {statusBanner}

      {!pro.proEnabled && pro.status !== 'pro' && (
        <div className="rounded-3xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 md:p-7 mb-10 flex items-start gap-4">
          <span className="material-symbols-outlined text-amber-600 text-3xl">schedule</span>
          <div>
            <p className="text-xl font-extrabold text-amber-900 dark:text-amber-100">{t(lang,'pro','soonTitle')}</p>
            <p className="text-amber-800 dark:text-amber-200 mt-1">{t(lang,'pro','soonDesc')}</p>
          </div>
        </div>
      )}

      {pro.proEnabled && pro.status === 'free' && (
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient text-white p-7 md:p-9 mb-10 shadow-xl shadow-blue-700/20">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <p className="text-2xl md:text-3xl font-extrabold">{t(lang,'pro','startTrial')}</p>
              <p className="opacity-80 mt-1">{t(lang,'pro','trialNote')}</p>
            </div>
            <button onClick={pro.startTrial}
              className="px-7 py-4 bg-white text-blue-800 rounded-2xl font-extrabold hover:bg-blue-50 active:scale-95 transition-all shadow-lg">
              <span className="inline-flex items-center gap-2">PRO · $0 <span className="material-symbols-outlined">arrow_forward</span></span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 flex flex-col">
          <p className="font-bold text-slate-500 mb-1">{t(lang,'pro','free')}</p>
          <p className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">$0</p>
          <p className="text-sm text-slate-400 mb-6">{t(lang,'pro','freeDesc')}</p>
          <ul className="space-y-3 text-sm flex-1">
            {ROWS.map(function(r) {
              return (
                <li key={r[2]} className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                  <Check on={!!r[1]} /> <span className={r[1] ? '' : 'text-slate-400 line-through'}>{t(lang,'pro', r[1] || r[2])}</span>
                </li>
              )
            })}
          </ul>
          {!pro.isPro && (
            <div className="mt-6 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{t(lang,'pro','current')}</div>
          )}
        </div>

        {PLANS.map(function(plan) {
          var available = pro.proEnabled && !!plan.checkoutUrl
          return (
            <div key={plan.id}
              className={'relative rounded-3xl p-7 flex flex-col ' +
                (plan.best
                  ? 'bg-slate-900 dark:bg-slate-800 text-white ring-2 ring-blue-500 shadow-2xl shadow-blue-700/20 md:-translate-y-2'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800')}>
              {plan.best && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gradient text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                  {t(lang,'pro','bestValue')}
                </span>
              )}
              <p className={'font-bold mb-1 ' + (plan.best ? 'text-blue-300' : 'text-blue-700 dark:text-blue-400')}>
                PRO · {plan.id === 'lifetime' ? 'Lifetime' : 'Monthly'}
              </p>
              <p className={'text-4xl font-extrabold mb-1 ' + (plan.best ? '' : 'text-slate-900 dark:text-white')}>
                {plan.price}<span className="text-base font-bold opacity-60"> {plan.period[lang]}</span>
              </p>
              <p className={'text-sm mb-6 ' + (plan.best ? 'text-slate-300' : 'text-slate-400')}>{t(lang,'pro','subtitle')}</p>
              <ul className="space-y-3 text-sm flex-1">
                {ROWS.map(function(r) {
                  return (
                    <li key={r[2]} className={'flex items-center gap-2.5 ' + (plan.best ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300')}>
                      <Check on /> {t(lang,'pro', r[2])}
                    </li>
                  )
                })}
              </ul>
              <a href={available ? plan.checkoutUrl : undefined} target="_blank" rel="noopener noreferrer"
                aria-disabled={!available}
                className={'mt-6 block text-center py-3.5 rounded-2xl font-extrabold transition-all ' +
                  (!available ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed pointer-events-none'
                    : plan.best ? 'bg-brand-gradient text-white hover:opacity-95 active:scale-[0.98]'
                    : 'bg-blue-700 text-white hover:bg-blue-800 active:scale-[0.98]')}>
                {available ? t(lang,'pro','buy') : t(lang,'pro','soon')}
              </a>
            </div>
          )
        })}
      </div>

      {pro.proEnabled && pro.status !== 'pro' && (
        <form onSubmit={activate} className="max-w-xl mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-12">
          <label className="block font-bold text-slate-900 dark:text-white mb-3">{t(lang,'pro','haveKey')}</label>
          <div className="flex gap-2">
            <input value={key} onChange={function(e) { setKey(e.target.value) }} placeholder={t(lang,'pro','keyPh')}
              className="flex-1 min-w-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-mono text-sm text-slate-900 dark:text-white outline-none focus:border-blue-400" />
            <button type="submit" disabled={busy || !key.trim()}
              className="px-5 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 disabled:opacity-50">
              {busy ? '…' : t(lang,'pro','activate')}
            </button>
          </div>
          {msg && <p className={'text-sm mt-3 font-semibold ' + (msg.ok ? 'text-emerald-600' : 'text-red-500')}>{msg.text}</p>}
        </form>
      )}

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-5 text-center">{t(lang,'pro','faq')}</h2>
        {['1','2','3'].map(function(n) {
          return (
            <details key={n} className="group border-b border-slate-200 dark:border-slate-800 py-4">
              <summary className="flex justify-between items-center cursor-pointer font-bold text-slate-800 dark:text-slate-200 list-none">
                {t(lang,'pro','q'+n)}
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t(lang,'pro','a'+n)}</p>
            </details>
          )
        })}
      </div>
    </main>
  )
}
