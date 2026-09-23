import React, { useState, useEffect } from 'react'
import { t } from '../i18n/labels.js'
import { CONTACT_EMAIL, mailto } from '../config/monetization.js'

// "Apply" form for a bank offer: name + phone + consent → /api/lead.
// props: offer { bank, product (text), kind, rate }, amount, term, lang, onClose

var INPUT = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'

export default function LeadModal(props) {
  var o = props.offer; var lang = props.lang
  var nameArr = useState(''); var nm = nameArr[0]; var setName = nameArr[1]
  var phoneArr = useState('+374 '); var phone = phoneArr[0]; var setPhone = phoneArr[1]
  var commentArr = useState(''); var comment = commentArr[0]; var setComment = commentArr[1]
  var consentArr = useState(false); var consent = consentArr[0]; var setConsent = consentArr[1]
  var trapArr = useState(''); var trap = trapArr[0]; var setTrap = trapArr[1]
  var stateArr = useState('form'); var state = stateArr[0]; var setState = stateArr[1] // form | sending | sent | failed | tooMany

  useEffect(function() {
    function onKey(e) { if (e.key === 'Escape') props.onClose() }
    window.addEventListener('keydown', onKey)
    return function() { window.removeEventListener('keydown', onKey) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function submit(e) {
    e.preventDefault()
    if (!consent || state === 'sending') return
    setState('sending')
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bank: o.bank, product: o.product, kind: o.kind, rate: o.rate,
        amount: props.amount, term: props.term,
        name: nm, phone: phone, comment: comment, lang: lang, consent: true, website: trap
      })
    }).then(function(r) {
      setState(r.ok ? 'sent' : r.status === 429 ? 'tooMany' : 'failed')
      if (r.ok && window.va) window.va('event', { name: 'lead', data: { bank: o.bank } })
    }).catch(function() { setState('failed') })
  }

  var mail = <a href={mailto('ArmFinCredit: ' + o.bank)} className="font-bold text-blue-600 dark:text-blue-400 hover:underline break-all">{CONTACT_EMAIL}</a>

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label={t(lang, 'partners', 'leadTitle')}>
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={props.onClose} />
      <div className="relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <button type="button" onClick={props.onClose} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
          <span className="material-symbols-outlined">close</span>
        </button>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t(lang, 'partners', 'leadTitle')}</p>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white pr-10">{o.bank}{o.product ? ' · ' + o.product : ''}</h2>
        {props.amount > 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            ֏{Math.round(props.amount).toLocaleString()} · {props.term} {t(lang, 'calc', 'months')}{o.rate ? ' · ' + o.rate + '%' : ''}
          </p>
        )}

        {state === 'sent' ? (
          <p className="py-6 text-emerald-600 font-bold flex items-center gap-2">
            <span className="material-symbols-outlined">check_circle</span>{t(lang, 'partners', 'sent')}
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <p className="text-sm text-slate-500 dark:text-slate-400">{t(lang, 'partners', 'leadDesc')}</p>
            <label className="block text-xs font-bold text-slate-500">{t(lang, 'partners', 'name')}
              <input required minLength={2} maxLength={60} autoComplete="name" value={nm} onChange={function(e) { setName(e.target.value) }} className={INPUT + ' mt-1'} />
            </label>
            <label className="block text-xs font-bold text-slate-500">{t(lang, 'partners', 'phone')}
              <input required type="tel" autoComplete="tel" inputMode="tel" pattern="\+?[0-9 ]{8,24}" placeholder="+374 91 123456" value={phone} onChange={function(e) { setPhone(e.target.value) }} className={INPUT + ' mt-1'} />
            </label>
            <label className="block text-xs font-bold text-slate-500">{t(lang, 'partners', 'comment')}
              <textarea rows={2} maxLength={500} value={comment} onChange={function(e) { setComment(e.target.value) }} className={INPUT + ' mt-1'} />
            </label>
            {/* Hidden from people; bots that fill every field are ignored. */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={function(e) { setTrap(e.target.value) }}
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }} />
            <label className="flex gap-2 items-start text-xs text-slate-500 dark:text-slate-400">
              <input type="checkbox" required checked={consent} onChange={function(e) { setConsent(e.target.checked) }} className="mt-0.5" />
              <span>{t(lang, 'partners', 'consent')}</span>
            </label>
            {state === 'failed' && <p className="text-sm text-rose-600">{t(lang, 'partners', 'failed')} {mail}</p>}
            {state === 'tooMany' && <p className="text-sm text-rose-600">{t(lang, 'partners', 'tooMany')}</p>}
            <button type="submit" disabled={!consent || state === 'sending'}
              className="w-full py-3.5 rounded-2xl bg-brand-gradient text-white font-extrabold disabled:opacity-50">
              {state === 'sending' ? '…' : t(lang, 'partners', 'send')}
            </button>
            <p className="text-[11px] text-slate-400">{t(lang, 'partners', 'notBank')}</p>
          </form>
        )}
      </div>
    </div>
  )
}
