import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSaved } from '../context/SavedContext.jsx'
import { useLoan } from '../context/LoanContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { usePro } from '../context/ProContext.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'

var SYM = '\u058f'

function formatDate(iso, lang) {
  try {
    return new Date(iso).toLocaleDateString(lang === 'AM' ? 'hy-AM' : lang === 'RU' ? 'ru-RU' : 'en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch(e) { return iso }
}

export default function SavedPage() {
  var saved = useSaved()
  var saves = saved.saves
  var deleteSave = saved.deleteSave
  var clearAll = saved.clearAll
  var loan = useLoan()
  var setLoanState = loan.setLoanState
  var lang = useLanguage().language
  useSeo(pageSeo('saved', lang))
  var navigate = useNavigate()
  var pro = usePro()

  var confirmArr = useState(null)
  var confirmId = confirmArr[0]; var setConfirmId = confirmArr[1]

  function handleLoad(entry) {
    setLoanState(entry.loanState)
    navigate('/')
  }

  function handleDelete(id) {
    setConfirmId(id)
  }

  function confirmDelete() {
    deleteSave(confirmId)
    setConfirmId(null)
  }

  var lbl = {
    title:     { AM: 'Պահված հաշվարկներ', RU: 'Сохранённые расчёты', EN: 'Saved Calculations' },
    desc:      { AM: 'Պահված կոնֆիգուրացիաների պատմությունը', RU: 'История сохранённых конфигураций', EN: 'History of saved configurations' },
    empty:     { AM: 'Պահված հաշվարկներ դեռ չկան', RU: 'Нет сохранённых расчётов', EN: 'No saved calculations yet' },
    emptyHint: { AM: 'Սեղմեք «Պահպանել» հաշվիչի էջում', RU: 'Нажмите «Сохранить» на странице калькулятора', EN: 'Click \u201cSave\u201d on the calculator page' },
    load:      { AM: 'Բեռնել', RU: 'Загрузить', EN: 'Load' },
    del:       { AM: 'Ջնջել', RU: 'Удалить', EN: 'Delete' },
    clearAll:  { AM: 'Ջնջել բոլորը', RU: 'Очистить всё', EN: 'Clear All' },
    cancel:    { AM: 'Չեղարկել', RU: 'Отмена', EN: 'Cancel' },
    confirm:   { AM: 'Ջնջե՞լ այս հաշվարկը', RU: 'Удалить этот расчёт?', EN: 'Delete this calculation?' },
    monthly:   { AM: 'Ամսական', RU: 'Ежемес.', EN: 'Monthly' },
    overpay:   { AM: 'Գերավճար', RU: 'Переплата', EN: 'Overpay' },
    apr:       { AM: 'APR', RU: 'APR', EN: 'APR' },
    used:      { AM: 'Օգտագործված', RU: 'Использовано', EN: 'Used' }
  }
  function lb(key) { return (lbl[key] && (lbl[key][lang] || lbl[key]['EN'])) || key }

  return (
    <div className="flex pt-16 min-h-screen animate-fade-up">
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">{lb('title')}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">{lb('desc')}</p>
            {!pro.isPro && (
              <button onClick={function() { pro.openUpgrade('saves') }} className="mt-2 text-xs font-bold text-slate-400 hover:text-blue-600">
                {lb('used')}: {Math.min(saves.length, pro.limits.saves)} / {pro.limits.saves} · <span className="text-blue-600">PRO &rarr; 50</span>
              </button>
            )}
          </div>
          {saves.length > 0 && (
            <button onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
              <span className="material-symbols-outlined" style={{fontSize:'16px'}}>delete_sweep</span>
              {lb('clearAll')}
            </button>
          )}
        </div>

        {/* Empty state */}
        {saves.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">bookmark_border</span>
            <p className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-2">{lb('empty')}</p>
            <p className="text-sm text-slate-400">{lb('emptyHint')}</p>
            <button onClick={function() { navigate('/') }}
              className="mt-6 px-6 py-3 bg-blue-700 text-white rounded-xl font-bold hover:bg-blue-800 transition-all">
              {t(lang,'common','home')}
            </button>
          </div>
        )}

        {/* Cards grid */}
        {saves.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {saves.map(function(entry) {
              var ls = entry.loanState
              var isDiff = ls.loanType === 'differentiated'
              return (
                <div key={entry.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-200 dark:hover:border-blue-800 transition-all group">

                  {/* Card header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">{entry.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatDate(entry.savedAt, lang)}</p>
                    </div>
                    <span className={'text-xs font-bold px-2 py-1 rounded-full ' +
                      (isDiff
                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700')}>
                      {isDiff ? t(lang,'calc','diff') : t(lang,'calc','annuity')}
                    </span>
                  </div>

                  {/* Main params */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-0.5">{t(lang,'calc','amount')}</div>
                      <div className="font-extrabold text-slate-900 dark:text-white text-sm">{SYM}{ls.amount.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-0.5">{t(lang,'calc','rate')}</div>
                      <div className="font-extrabold text-slate-900 dark:text-white text-sm">{ls.rate}%</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                      <div className="text-xs text-slate-400 mb-0.5">{t(lang,'calc','term')}</div>
                      <div className="font-extrabold text-slate-900 dark:text-white text-sm">{ls.term} {t(lang,'calc','months')}</div>
                    </div>
                  </div>

                  {/* KPI row */}
                  <div className="flex gap-4 mb-5 text-sm">
                    <div>
                      <span className="text-xs text-slate-400">{lb('monthly')} </span>
                      <span className="font-bold text-blue-700">{SYM}{Math.round(entry.monthlyPayment).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">{lb('overpay')} </span>
                      <span className="font-bold text-emerald-600">{SYM}{Math.round(entry.totalInterest).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">APR </span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{entry.apr.toFixed(2)}%</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={function() { handleLoad(entry) }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-bold hover:bg-blue-800 transition-all active:scale-95">
                      <span className="material-symbols-outlined" style={{fontSize:'16px'}}>upload</span>
                      {lb('load')}
                    </button>
                    <button onClick={function() { handleDelete(entry.id) }}
                      className="w-11 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                      <span className="material-symbols-outlined" style={{fontSize:'18px'}}>delete</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <AdSlot placement="saved" className="mt-10" />

        {/* Delete confirm modal */}
        {confirmId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 shadow-2xl max-w-sm w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-red-500 text-3xl">warning</span>
                <p className="font-bold text-slate-900 dark:text-white text-lg">{lb('confirm')}</p>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={function() { setConfirmId(null) }}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200">
                  {lb('cancel')}
                </button>
                <button onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600">
                  {lb('del')}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
