import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

export default function Footer() {
  var langCtx = useLanguage()
  var language = langCtx.language
  return (
    <footer className="w-full py-10 px-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">ArmFinCredit</div>
          <p className="text-xs text-slate-400">{t(language,'footer','rights')}</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-slate-400 hover:text-blue-600">{t(language,'footer','privacy')}</a>
          <a href="#" className="text-xs text-slate-400 hover:text-blue-600">{t(language,'footer','terms')}</a>
          <a href="#" className="text-xs text-slate-400 hover:text-blue-600">{t(language,'footer','support')}</a>
        </div>
      </div>
    </footer>
  )
}
