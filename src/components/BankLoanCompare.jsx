import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoan, generateAmortization } from '../context/LoanContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import { t } from '../i18n/labels.js'
import { activeOffers, OFFERS_AS_OF } from '../config/bankOffers.js'
import LeadModal from './LeadModal.jsx'

// Real Armenian bank loan/mortgage offers (src/config/bankOffers.js) applied to
// the user's own amount and term: monthly payment, overpayment and the
// difference with the user's calculation. Free users see the best match only.

function money(n) { return '֏' + Math.round(n).toLocaleString() }
function pct(n) { return String(n).replace(/\.0$/, '') + '%' }
function name(v, lang) { return !v ? '' : typeof v === 'string' ? v : (v[lang] || v.EN) }

function interestOf(res) {
  var s = 0; for (var i = 0; i < res.schedule.length; i++) s += res.schedule[i].interest; return s
}

// null = limit unknown, true/false = within the bank's published limits
function fitsLimits(o, amount, term) {
  var l = o.limits
  if (!l) return null
  if (l.amount && (amount < l.amount[0] || amount > l.amount[1])) return false
  if (l.term && (term < l.term[0] || term > l.term[1])) return false
  return true
}

function limitsText(o, lang) {
  var l = o.limits; var parts = []
  if (l && l.amount) parts.push(t(lang, 'offers', 'upTo') + ' ' + money(l.amount[1]))
  if (l && l.term) parts.push(l.term[0] + '–' + l.term[1] + ' ' + t(lang, 'calc', 'months'))
  return parts.join(' · ')
}

function Row(props) {
  var o = props.o; var lang = props.lang
  var single = o.lo.monthly === o.hi.monthly
  var r = o.cmp
  var rate = r[0] === r[1] ? (o.from ? t(lang, 'banks', 'from') + ' ' : o.compare ? t(lang, 'banks', 'upTo') + ' ' : '') + pct(r[0]) : pct(r[0]) + '–' + pct(r[1])
  var diff = props.yourInterest - o.lo.interest // > 0: cheaper than the user's calc at the best rate
  return (
    <div className={'px-5 py-4 border-t border-slate-100 dark:border-slate-800 first:border-t-0 ' + (o.fit === false ? 'opacity-60' : '')}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-extrabold text-slate-900 dark:text-white">{o.bank}<span className="font-semibold text-slate-500 dark:text-slate-400"> · {name(o.product, lang)}</span></p>
          <p className={'text-xs font-semibold mt-0.5 ' + (o.fit === false ? 'text-amber-600 dark:text-amber-400' : o.fit ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400')}>
            {o.fit === false ? t(lang, 'offers', 'outLimit') + ' (' + limitsText(o, lang) + ')'
              : o.fit ? '✓ ' + t(lang, 'offers', 'fits') + ' (' + limitsText(o, lang) + ')'
              : t(lang, 'offers', 'limitsUnknown')}
          </p>
        </div>
        <span className="text-xl font-extrabold tabular-nums text-slate-900 dark:text-white whitespace-nowrap">{rate}</span>
      </div>
      {o.conditions && o.conditions.length > 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{o.conditions.map(function(c) { return name(c, lang) }).join(' · ')}</p>
      )}
      <div className="grid grid-cols-3 gap-3 mt-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{t(lang, 'offers', 'estPay')}</div>
          <div className="text-sm sm:text-lg font-extrabold tabular-nums break-words text-slate-900 dark:text-white">
            {single ? money(o.lo.monthly) : money(o.lo.monthly) + ' – ' + money(o.hi.monthly)}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{t(lang, 'offers', 'overpay')}</div>
          <div className="text-sm sm:text-lg font-extrabold tabular-nums break-words text-slate-900 dark:text-white">
            {single ? money(o.lo.interest) : money(o.lo.interest) + ' – ' + money(o.hi.interest)}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{t(lang, 'offers', 'vsYou')}</div>
          <div className={'text-sm sm:text-lg font-extrabold tabular-nums break-words ' + (diff > 0 ? 'text-emerald-600' : 'text-rose-600')}>
            {diff > 0 ? (single ? '−' : t(lang, 'offers', 'upTo').toLowerCase() + ' −') + money(diff) : '+' + money(-diff)}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        {props.onLead && (
          <button type="button" onClick={function() { props.onLead(o) }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700">
            {t(lang, 'partners', 'lead')}
          </button>
        )}
        <button type="button" onClick={function() { props.onUse(o) }} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
          {t(lang, 'offers', 'useRate')} {pct(o.useRate)} →
        </button>
        <a href={o.url} target="_blank" rel="noopener noreferrer nofollow" className="font-bold text-slate-500 dark:text-slate-400 hover:underline">{t(lang, 'banks', 'open')} ↗</a>
        <span className="text-slate-400">{t(lang, 'banks', 'source')}: {o.source}</span>
      </div>
    </div>
  )
}

export default function BankLoanCompare(props) {
  var lang = props.lang
  var loan = useLoan(); var ls = loan.loanState
  var pro = usePro()
  var navigate = useNavigate()
  // Until the user picks a tab, large amounts default to mortgages.
  var kindArr = useState(null); var setKind = kindArr[1]
  var kind = kindArr[0] || (ls.amount > 5000000 ? 'mortgage' : 'loan')
  var leadArr = useState(null); var lead = leadArr[0]; var setLead = leadArr[1]

  var rows = useMemo(function() {
    return activeOffers().filter(function(o) { return o.kind === kind && o.currency === 'AMD' })
      .map(function(o) {
        var cmp = o.compare || o.rate
        var lo = generateAmortization(ls.amount, cmp[0], ls.term, [], ls.loanType)
        var hi = cmp[1] === cmp[0] ? lo : generateAmortization(ls.amount, cmp[1], ls.term, [], ls.loanType)
        return Object.assign({}, o, {
          cmp: cmp,
          fit: fitsLimits(o, ls.amount, ls.term),
          useRate: cmp[0],
          lo: { monthly: lo.monthlyPayment, interest: interestOf(lo) },
          hi: { monthly: hi.monthlyPayment, interest: interestOf(hi) }
        })
      })
      // Offers that fit first, state programmes after regular ones, then by the
      // upper rate (the realistic worst case).
      .sort(function(a, b) { return ((b.fit !== false) - (a.fit !== false)) || (!!a.program - !!b.program) || (a.cmp[1] - b.cmp[1]) || (a.cmp[0] - b.cmp[0]) })
  }, [kind, ls.amount, ls.term, ls.loanType])

  function applyOffer(o) {
    loan.setLoanState(function(prev) { return Object.assign({}, prev, { rate: o.useRate }) })
    navigate('/')
  }

  var visible = pro.limits.bankOffersVisible
  var open = rows.slice(0, visible); var locked = rows.slice(visible)

  return (
    <section className="mb-10">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t(lang, 'offers', 'bankT')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t(lang, 'offers', 'bankD')} · {t(lang, 'banks', 'asOf')} {OFFERS_AS_OF}</p>
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
          {[['loan', 'loans'], ['mortgage', 'mortgage']].map(function(x) {
            var on = kind === x[0]
            return (
              <button key={x[0]} type="button" onClick={function() { setKind(x[0]) }}
                className={'px-4 py-2 text-sm font-bold rounded-lg transition-all ' + (on ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200')}>
                {t(lang, 'banks', x[1])}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 overflow-hidden">
        {open.map(function(o, i) { return <Row key={i} o={o} lang={lang} yourInterest={loan.totalInterest} onUse={applyOffer} onLead={setLead} /> })}
        {locked.length > 0 && (
          <div className="relative">
            <div aria-hidden="true" className="blur-sm select-none pointer-events-none opacity-60 max-h-[420px] overflow-hidden">
              {locked.map(function(o, i) { return <Row key={i} o={o} lang={lang} yourInterest={loan.totalInterest} onUse={function() {}} /> })}
            </div>
            <div className="absolute inset-0 flex items-start justify-center p-4 pt-12">
              <button type="button" onClick={function() { pro.openUpgrade('banks') }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gradient text-white rounded-2xl font-extrabold shadow-xl shadow-blue-700/30 hover:opacity-95">
                <span className="material-symbols-outlined" style={{fontSize:'18px'}}>lock</span>
                {t(lang, 'offers', 'compareAll')} ({locked.length})
                {!pro.proEnabled && <span className="text-[9px] font-black uppercase bg-white/25 rounded px-1 py-0.5">{t(lang, 'pro', 'soonBadge')}</span>}
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mt-3">{t(lang, 'offers', 'bankNote')}</p>
      {lead && (
        <LeadModal lang={lang} amount={ls.amount} term={ls.term} onClose={function() { setLead(null) }}
          offer={{ bank: lead.bank, product: name(lead.product, lang), kind: lead.kind, rate: lead.useRate }} />
      )}
    </section>
  )
}
