import React, { useMemo } from 'react'
import { useLoan, generateAmortization, useLoanParamsFromUrl } from '../context/LoanContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { PARTNER_OFFERS, PARTNER_CONTACT_EMAIL, withUtm } from '../config/monetization.js'
import AdSlot from '../components/AdSlot.jsx'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'

var SYM = '֏'
function money(n) { return SYM + Math.round(n).toLocaleString() }

export default function OffersPage() {
  var loan = useLoan()
  useLoanParamsFromUrl()
  var ls = loan.loanState
  var lang = useLanguage().language
  useSeo(pageSeo('offers', lang))

  var offers = useMemo(function() {
    return PARTNER_OFFERS.map(function(o) {
      var fits = ls.amount <= o.maxAmount && ls.term <= o.maxTerm
      var res = generateAmortization(ls.amount, o.rateFrom, ls.term, [], ls.loanType)
      var interest = 0; for (var i = 0; i < res.schedule.length; i++) interest += res.schedule[i].interest
      return Object.assign({}, o, { fits: fits, monthly: res.monthlyPayment, saving: loan.totalInterest - interest })
    }).sort(function(a, b) { return (b.fits - a.fits) || (a.rateFrom - b.rateFrom) })
  }, [ls, loan.totalInterest])

  return (
    <main className="flex-1 pt-24 pb-20 px-4 md:px-8 w-full max-w-5xl mx-auto animate-fade-up">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">{t(lang,'offers','title')}</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang,'offers','desc')}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        <span className="text-slate-400 font-semibold mr-1">{t(lang,'offers','yourCalc')}:</span>
        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">{money(ls.amount)}</span>
        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">{ls.rate}%</span>
        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200">{ls.term} {t(lang,'calc','months')}</span>
        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 font-bold text-blue-700 dark:text-blue-300">{money(loan.monthlyPayment)}/{t(lang,'calc','months')}</span>
      </div>

      <div className="space-y-4 mb-8">
        {offers.map(function(o) {
          var href = o.demo ? '' : withUtm(o.url, o.id)
          return (
            <div key={o.id}
              className={'group relative rounded-3xl border bg-white dark:bg-slate-900 p-5 md:p-6 transition-all ' +
                (o.fits ? 'border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-700/5' : 'border-slate-100 dark:border-slate-800/60 opacity-60')}>
              <div className="flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex items-center gap-4 md:w-60 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gradient text-white flex items-center justify-center font-black text-lg">
                    {o.name.charAt(o.name.length - 1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-slate-900 dark:text-white">{o.name}</p>
                      {o.demo && <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">{t(lang,'offers','example')}</span>}
                    </div>
                    <p className="text-xs text-slate-400">{o.kind[lang]} · {t(lang,'ads','sponsored')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 flex-1">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{t(lang,'offers','rateFrom')}</div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">{o.rateFrom}%</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{t(lang,'offers','estPay')}</div>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">{money(o.monthly)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{t(lang,'offers','save')}</div>
                    <div className={'text-xl font-extrabold ' + (o.saving > 0 ? 'text-emerald-600' : 'text-slate-400')}>
                      {o.saving > 0 ? money(o.saving) : '—'}
                    </div>
                  </div>
                </div>

                <div className="md:w-40 shrink-0">
                  <a href={href || undefined} target="_blank" rel="sponsored noopener noreferrer"
                    aria-disabled={!href}
                    className={'block text-center py-3 rounded-2xl font-extrabold transition-all ' +
                      (href && o.fits ? 'bg-blue-700 text-white hover:bg-blue-800 active:scale-95' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 pointer-events-none')}>
                    {t(lang,'offers','apply')}
                  </a>
                  <p className={'text-[11px] text-center mt-1.5 font-semibold ' + (o.fits ? 'text-emerald-600' : 'text-slate-400')}>
                    {o.fits ? '✓ ' + t(lang,'offers','fits') : t(lang,'offers','noFit')}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {(o.perks[lang] || o.perks.EN).map(function(p) {
                  return <span key={p} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">{p}</span>
                })}
                <span className="text-xs text-slate-400 px-1 py-1">{t(lang,'offers','upTo')} {money(o.maxAmount)} · {o.maxTerm} {t(lang,'calc','months')}</span>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-400 mb-10 leading-relaxed">{t(lang,'offers','disclosure')}</p>

      <AdSlot placement="offers" className="mb-10" />

      <div className="rounded-3xl border-2 border-dashed border-blue-200 dark:border-blue-900 p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-5 justify-between">
        <div>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white">{t(lang,'offers','partnerT')}</p>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-lg">{t(lang,'offers','partnerD')}</p>
        </div>
        <a href={'mailto:' + PARTNER_CONTACT_EMAIL + '?subject=ArmFinCredit%20partnership'}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-extrabold hover:opacity-90">
          <span className="material-symbols-outlined" style={{fontSize:'18px'}}>handshake</span>
          {t(lang,'offers','partnerB')}
        </a>
      </div>
    </main>
  )
}
