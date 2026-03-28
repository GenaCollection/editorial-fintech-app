import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

export default function Footer() {
  var langCtx = useLanguage()
  var lang = langCtx.language

  return (
    <footer className="w-full pt-10 pb-6 px-8 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand + disclaimer */}
          <div>
            <div className="font-black text-blue-900 dark:text-blue-100 text-lg tracking-tight mb-2">ArmFinCredit</div>
            <p className="text-xs text-slate-400 leading-relaxed">{t(lang, 'footer', 'disclaimer')}</p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              {t(lang, 'footer', 'nav')}
            </div>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'nav', 'calc')}</Link>
              <Link to="/schedule" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'nav', 'sched')}</Link>
              <Link to="/early" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'nav', 'early')}</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              {t(lang, 'footer', 'legal')}
            </div>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'footer', 'privacy')}</Link>
              <Link to="/terms" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'footer', 'terms')}</Link>
              <a href="mailto:support@armfincredit.app" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'footer', 'support')}</a>
            </div>
          </div>

        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-5 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-slate-400">{t(lang, 'footer', 'rights')}</p>
          <p className="text-xs text-slate-400">armfincredit-app.vercel.app</p>
        </div>
      </div>
    </footer>
  )
}
