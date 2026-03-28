import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSaved } from '../context/SavedContext.jsx'
import { useLoan } from '../context/LoanContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import Sidebar from '../components/Sidebar.jsx'

var SYM = '\u058f'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
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
  var navigate = useNavigate()

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
    title:    { AM: '\u054a\u0561\u0570\u057e\u0561\u056e \u0540\u0561\u0577\u057e\u0561\u0580\u056f\u0576\u0565\u0580', RU: '\u0421\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0435 \u0440\u0430\u0441\u0447\u0451\u0442\u044b', EN: 'Saved Calculations' },
    desc:     { AM: '\u054a\u0561\u0570\u057e\u0561\u056e \u056f\u0578\u0576\u0586\u056b\u0563\u0578\u0582\u0580\u0561\u0581\u056b\u0561\u0576\u0565\u0580\u056b \u0562\u0561\u0579\u056f\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0568', RU: '\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0445 \u043a\u043e\u043d\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0439', EN: 'History of saved configurations' },
    empty:    { AM: '\u054a\u0561\u0570\u057e\u0561\u056e\u0576\u0565\u0580 \u0579\u056f\u0561', RU: '\u041d\u0435\u0442 \u0441\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0445 \u0440\u0430\u0441\u0447\u0451\u0442\u043e\u0432', EN: 'No saved calculations yet' },
    emptyHint:{ AM: '\u0540\u0561\u0577\u056b\u0579\u056b\u0579 \u0562\u0561\u0562\u056c\u056c\u0565\u056c \u00ab\u054a\u0561\u0570\u057e\u0565\u056c\u00bb \u056f\u0578\u0ճapí', RU: '\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u00ab\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c\u00bb \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435', EN: 'Click \u201cSave\u201d on the calculator page' },
    load:     { AM: '\u0532\u0565\u057c\u0576\u0565\u056c', RU: '\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c', EN: 'Load' },
    del:      { AM: '\u0531\u056e\u0565\u056c', RU: '\u0423\u0434\u0430\u043b\u0438\u0442\u044c', EN: 'Delete' },
    clearAll: { AM: '\u0531\u056e\u0565\u056c \u0532\u0578\u056c\u0578\u0580\u056b\u0576', RU: '\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0432\u0441\u0451', EN: 'Clear All' },
    cancel:   { AM: '\u0531\u056c\u056c\u0565\u056c', RU: '\u041e\u0442\u043c\u0435\u043d\u0430', EN: 'Cancel' },
    confirm:  { AM: '\u0540\u0561\u057d\u057f\u0561\u057f\u0565\u056c?', RU: '\u0423\u0434\u0430\u043b\u0438\u0442\u044c?', EN: 'Delete this calculation?' },
    monthly:  { AM: '\u0531\u0574\u057d\u0561\u056f\u0561\u0576', RU: '\u0415\u0436\u0435\u043c\u0435\u0441.', EN: 'Monthly' },
    overpay:  { AM: '\u0531\u056c\u0561\u056c\u057e\u0561\u056e\u0578\u0582\u0569\u0575', RU: '\u041f\u0435\u0440\u0435\u043f\u043b\u0430\u0442\u0430', EN: 'Overpay' },
    apr:      { AM: 'APR', RU: 'APR', EN: 'APR' }
  }
  function lb(key) { return (lbl[key] && (lbl[key][lang] || lbl[key]['EN'])) || key }

  return (
    <div className="flex pt-16 min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 lg:px-10 py-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-2">{lb('title')}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">{lb('desc')}</p>
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
                      <p className="text-xs text-slate-400 mt-0.5">{formatDate(entry.savedAt)}</p>
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
