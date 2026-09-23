import React, { useState, useEffect, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { CURRENCY_NAMES } from '../config/currencies.js'
import { initialFx } from '../lib/fxSnapshot.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'
import AdSlot from '../components/AdSlot.jsx'

// Official CBA exchange rates (/api/rates) with a converter to/from drams.
// The build-time snapshot (initialFx) makes the static HTML indexable; the
// page then refreshes from the API.

var MAIN = ['USD', 'EUR', 'RUB', 'GBP']

function cname(iso, lang) { var n = CURRENCY_NAMES[iso]; return n ? n[lang] || n.EN : iso }
function fmt(n, digits) {
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}
function perUnit(r) { return r.rate / r.amount }

var FAQ = {
  AM: [
    ['Ինչ է ԿԲ պաշտոնական փոխարժեքը', 'Այն ՀՀ Կենտրոնական բանկի կողմից ամեն աշխատանքային օր հրապարակվող փոխարժեքն է։ Այն օգտագործվում է հաշվապահության, հարկերի և պետական վճարումների համար։'],
    ['Ինչու է բանկերում փոխարժեքը տարբեր', 'Բանկերն ու փոխանակման կետերը սահմանում են իրենց առք ու վաճառքի փոխարժեքները։ Դրանք մոտ են պաշտոնականին, բայց ներառում են բանկի տարբերությունը (սպրեդ)։'],
    ['Երբ է թարմացվում փոխարժեքը', 'ԿԲ-ն փոխարժեքները հրապարակում է աշխատանքային օրերին։ Հանգստյան օրերին գործում է վերջին հրապարակված փոխարժեքը։']
  ],
  RU: [
    ['Что такое официальный курс ЦБ Армении?', 'Это курс, который Центральный банк Армении публикует каждый рабочий день. Он используется в бухгалтерии, для налогов и государственных платежей.'],
    ['Почему курс в банках отличается?', 'Банки и обменные пункты устанавливают свои курсы покупки и продажи. Они близки к официальному, но включают маржу банка (спред).'],
    ['Когда обновляется курс?', 'ЦБ публикует курсы в рабочие дни. В выходные действует последний опубликованный курс.']
  ],
  EN: [
    ['What is the official CBA exchange rate?', 'It is the rate the Central Bank of Armenia publishes every business day. It is used for accounting, taxes and state payments.'],
    ['Why do bank rates differ?', 'Banks and exchange offices set their own buy and sell rates. They are close to the official rate but include the bank margin (spread).'],
    ['When is the rate updated?', 'The CBA publishes rates on business days. On weekends the last published rate applies.']
  ]
}

export default function FxPage() {
  var lang = useLanguage().language
  var dataArr = useState(initialFx); var data = dataArr[0]; var setData = dataArr[1]
  var errArr = useState(false); var err = errArr[0]; var setErr = errArr[1]
  var amountArr = useState(100); var amount = amountArr[0]; var setAmount = amountArr[1]
  var curArr = useState('USD'); var cur = curArr[0]; var setCur = curArr[1]
  var toAmdArr = useState(true); var toAmd = toAmdArr[0]; var setToAmd = toAmdArr[1]

  useEffect(function() {
    var alive = true
    fetch('/api/rates').then(function(r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() })
      .then(function(j) { if (alive && j && j.rates) setData(j) })
      .catch(function() { if (alive) setErr(true) })
    return function() { alive = false }
  }, [])

  var rates = data ? data.rates : []
  var byIso = useMemo(function() { var m = {}; rates.forEach(function(r) { m[r.iso] = r }); return m }, [rates])
  var sel = byIso[cur]
  var result = sel ? (toAmd ? amount * perUnit(sel) : amount / perUnit(sel)) : 0

  var seo = pageSeo('fx', lang)
  if (data) {
    seo.jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: t(lang, 'fx', 'title') + ' — ' + data.date,
      itemListElement: rates.filter(function(r) { return MAIN.indexOf(r.iso) >= 0 }).map(function(r, i) {
        return {
          '@type': 'ListItem', position: i + 1,
          item: {
            '@type': 'ExchangeRateSpecification',
            currency: r.iso,
            currentExchangeRate: { '@type': 'UnitPriceSpecification', price: perUnit(r), priceCurrency: 'AMD' }
          }
        }
      })
    }
  }
  useSeo(seo)

  return (
    <main data-fx-page className="flex-1 px-4 md:px-8 pt-24 pb-24 max-w-5xl mx-auto w-full animate-fade-up">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight break-words mb-2"><span className="text-gradient">{t(lang, 'fx', 'title')}</span></h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang, 'fx', 'desc')}</p>
        {data && (
          <p className="text-sm text-slate-400 mt-1">
            {t(lang, 'fx', 'on')} <b className="text-slate-600 dark:text-slate-300">{data.date}</b> · {t(lang, 'fx', data.source === 'cba' ? 'srcCba' : 'srcMarket')}
          </p>
        )}
      </div>

      <AdSlot placement="top" className="mb-6" />

      {!data && <p className="text-slate-500 mb-8">{err ? t(lang, 'fx', 'error') : t(lang, 'fx', 'loading')}</p>}

      {data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {MAIN.map(function(iso) {
              var r = byIso[iso]
              if (!r) return null
              var up = r.diff > 0, down = r.diff < 0
              return (
                <div key={iso} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-4">
                  <div className="text-xs font-bold text-slate-400">{r.amount > 1 ? r.amount + ' ' : ''}{iso}</div>
                  <div className="text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">{fmt(r.rate, 2)} ֏</div>
                  {typeof r.diff === 'number' && (
                    <div className={'text-xs font-bold tabular-nums ' + (up ? 'text-emerald-600' : down ? 'text-rose-600' : 'text-slate-400')}>
                      {up ? '▲ +' : down ? '▼ ' : ''}{fmt(r.diff, 2)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <section className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-5 mb-8">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-3">{t(lang, 'fx', 'converter')}</h2>
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex flex-col text-xs font-bold text-slate-500 gap-1">
                {t(lang, 'fx', 'amount')}
                <input type="number" min="0" inputMode="decimal" value={amount}
                  onChange={function(e) { setAmount(Math.max(0, Number(e.target.value) || 0)) }}
                  className="w-40 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base font-bold text-slate-900 dark:text-white" />
              </label>
              <label className="flex flex-col text-xs font-bold text-slate-500 gap-1">
                {t(lang, 'fx', 'currency')}
                <select value={toAmd ? cur : 'AMD'} disabled={!toAmd}
                  onChange={function(e) { setCur(e.target.value) }}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base font-bold text-slate-900 dark:text-white">
                  {toAmd ? rates.map(function(r) { return <option key={r.iso} value={r.iso}>{r.iso}</option> }) : <option value="AMD">AMD</option>}
                </select>
              </label>
              <button type="button" onClick={function() { setToAmd(!toAmd) }} aria-label={t(lang, 'fx', 'swap')}
                className="h-11 w-11 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-blue-600 hover:border-blue-400">
                <span className="material-symbols-outlined">swap_horiz</span>
              </button>
              <label className="flex flex-col text-xs font-bold text-slate-500 gap-1">
                {t(lang, 'fx', 'currency')}
                <select value={toAmd ? 'AMD' : cur} disabled={toAmd}
                  onChange={function(e) { setCur(e.target.value) }}
                  className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-base font-bold text-slate-900 dark:text-white">
                  {toAmd ? <option value="AMD">AMD</option> : rates.map(function(r) { return <option key={r.iso} value={r.iso}>{r.iso}</option> })}
                </select>
              </label>
              <div className="text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white pb-1.5">
                = {fmt(result, toAmd ? 0 : 2)} {toAmd ? '֏' : cur}
              </div>
            </div>
          </section>

          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">{t(lang, 'fx', 'all')}</h2>
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 overflow-x-auto mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="px-4 py-3 font-bold">{t(lang, 'fx', 'currency')}</th>
                  <th className="px-4 py-3 font-bold text-right">{t(lang, 'fx', 'per')}</th>
                  <th className="px-4 py-3 font-bold text-right">{t(lang, 'fx', 'rate')}</th>
                  <th className="px-4 py-3 font-bold text-right">{t(lang, 'fx', 'change')}</th>
                </tr>
              </thead>
              <tbody>
                {rates.map(function(r) {
                  return (
                    <tr key={r.iso} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="px-4 py-2.5">
                        <span className="font-extrabold text-slate-900 dark:text-white">{r.iso}</span>
                        <span className="text-slate-500 dark:text-slate-400"> · {cname(r.iso, lang)}</span>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-500">{r.amount}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-extrabold text-slate-900 dark:text-white">{fmt(r.rate, 2)}</td>
                      <td className={'px-4 py-2.5 text-right tabular-nums font-bold ' + (r.diff > 0 ? 'text-emerald-600' : r.diff < 0 ? 'text-rose-600' : 'text-slate-400')}>
                        {typeof r.diff === 'number' ? (r.diff > 0 ? '+' : '') + fmt(r.diff, 2) : '—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className="text-xs text-slate-400 mb-10">
        {t(lang, 'fx', 'banksNote')}{' '}
        <a href="https://www.rate.am" target="_blank" rel="noopener noreferrer nofollow" className="text-blue-600 dark:text-blue-400 hover:underline">rate.am</a>
      </p>

      <AdSlot placement="bottom" className="mb-10" />

      <section className="max-w-3xl">
        {FAQ[lang].map(function(q, i) {
          return (
            <details key={i} className="group border-b border-slate-200 dark:border-slate-800 py-4" open={i === 0}>
              <summary className="flex justify-between items-center gap-4 cursor-pointer font-bold text-slate-800 dark:text-slate-200 list-none">
                <h3 className="text-base">{q[0]}</h3>
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">{q[1]}</p>
            </details>
          )
        })}
      </section>
    </main>
  )
}
