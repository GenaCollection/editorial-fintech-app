import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { LANDINGS, LANDING_UI, landingPath } from '../seo/landings.js'

export default function Footer() {
  var langCtx = useLanguage()
  var lang = langCtx.language

  return (
    <footer className="no-print w-full pt-10 pb-24 md:pb-8 px-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur border-t border-slate-200 dark:border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* Brand + disclaimer */}
          <div className="col-span-2 md:col-span-1">
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
              <Link to="/compare" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'menu', 'compare')}</Link>
              <Link to="/offers" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'menu', 'offers')}</Link>
              <Link to="/pro" className="block text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">ArmFinCredit Pro</Link>
            </div>
          </div>

          {/* SEO landing pages in the current language + widget */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              {LANDING_UI.menuTitle[lang]}
            </div>
            <div className="space-y-2">
              {LANDINGS.map(function(l) {
                return <Link key={l.key} to={landingPath(l, lang)} className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{l.short[lang]}</Link>
              })}
              <Link to="/widget" className="block text-sm text-slate-500 hover:text-blue-600 transition-colors">{t(lang, 'widget', 'badge')}</Link>
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
          <p className="text-xs text-slate-400">www.armfincredit.site</p>
        </div>
      </div>
    </footer>
  )
}
