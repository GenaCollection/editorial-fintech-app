import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usePro } from '../context/ProContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { PLANS } from '../config/monetization.js'

var REASON_KEY = { saves: 'rSaves', csv: 'rCsv', ai: 'rAi', compare: 'rCompare', pdf: 'rPdf', generic: 'rGeneric' }
var FEATURES = [
  ['block', 'fNoAds'], ['auto_awesome', 'fAi'], ['picture_as_pdf', 'fPdf'],
  ['table_view', 'fCsv'], ['bookmarks', 'fSaves'], ['compare_arrows', 'fCompare']
]

// Global paywall. Opened via usePro().openUpgrade(reason).
export default function UpgradeModal() {
  var pro = usePro()
  var lang = useLanguage().language
  var navigate = useNavigate()
  if (!pro.upgradeReason) return null

  function trial() {
    pro.startTrial()
    pro.closeUpgrade()
  }
  function plans() {
    pro.closeUpgrade()
    navigate('/pro')
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={pro.closeUpgrade}>
      <div className="relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={function(e) { e.stopPropagation() }}>
        <div className="bg-brand-gradient px-7 pt-7 pb-6 text-white">
          <button onClick={pro.closeUpgrade} aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center">
            <span className="material-symbols-outlined" style={{fontSize:'18px'}}>close</span>
          </button>
          <div className="inline-flex items-center gap-1 text-[11px] font-black tracking-widest bg-white/20 rounded-full px-2.5 py-1 mb-3">
            <span className="material-symbols-outlined" style={{fontSize:'14px'}}>workspace_premium</span> PRO
          </div>
          <p className="text-2xl font-extrabold leading-tight">{t(lang,'pro', REASON_KEY[pro.upgradeReason] || 'rGeneric')}</p>
          <p className="text-sm opacity-80 mt-1">{t(lang,'pro','subtitle')}</p>
        </div>
        <div className="p-7">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6">
            {FEATURES.map(function(f) {
              return (
                <li key={f[1]} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-emerald-500" style={{fontSize:'18px'}}>{f[0]}</span>
                  {t(lang,'pro',f[1])}
                </li>
              )
            })}
          </ul>
          {!pro.trialUsed ? (
            <>
              <button onClick={trial}
                className="w-full py-3.5 bg-brand-gradient text-white rounded-2xl font-extrabold shadow-lg shadow-blue-700/30 hover:opacity-95 active:scale-[0.98] transition-all">
                {t(lang,'pro','startTrial')}
              </button>
              <p className="text-center text-xs text-slate-400 mt-2">{t(lang,'pro','trialNote')}</p>
              <button onClick={plans} className="w-full mt-3 py-2 text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline">
                {t(lang,'pro','seePlans')}
              </button>
            </>
          ) : (
            <button onClick={plans}
              className="w-full py-3.5 bg-brand-gradient text-white rounded-2xl font-extrabold shadow-lg shadow-blue-700/30 hover:opacity-95 active:scale-[0.98] transition-all">
              {t(lang,'pro','seePlans')} · {PLANS[0].price}{PLANS[0].period[lang]}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
