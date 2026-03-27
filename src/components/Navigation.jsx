import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLoan } from '../context/LoanContext'
import { t } from '../i18n/labels'

export default function Navigation({ language, setLanguage }) {
  const location = useLocation()
  const { theme, toggleTheme } = useLoan()
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkCls = (path) =>
    `font-manrope font-bold text-lg tracking-tight transition-colors duration-200 ${
      location.pathname === path
        ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 dark:border-blue-400 pb-1'
        : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300'
    }`

  const mobileLinkCls = (path) =>
    `block px-6 py-4 font-manrope font-bold text-lg border-b border-slate-100 dark:border-slate-800 transition-colors ${
      location.pathname === path
        ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
    }`

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm flex justify-between items-center px-4 md:px-8 h-20">
        <div className="text-xl md:text-2xl font-black text-blue-900 dark:text-blue-100 uppercase tracking-tighter font-headline">
          Editorial Fintech
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link className={linkCls('/')} to="/">{t(language, 'navigation', 'calculator')}</Link>
          <Link className={linkCls('/schedule')} to="/schedule">{t(language, 'navigation', 'schedule')}</Link>
          <Link className={linkCls('/early')} to="/early">{t(language, 'navigation', 'earlyInfo')}</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-1 bg-surface-container-low dark:bg-slate-800 p-1 rounded-lg">
            {['AM','RU','EN'].map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)}
                className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${
                  language === lang
                    ? 'bg-primary text-on-primary'
                    : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-700'
                }`}>{lang}</button>
            ))}
          </div>
          <button onClick={toggleTheme}
            className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </button>
          <button className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">notifications</button>
          <button className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">account_circle</button>
          <button className="hidden md:block bg-primary text-on-primary px-5 py-2.5 rounded-xl font-headline font-bold hover:brightness-110 active:scale-95 transition-all">
            {t(language, 'navigation', 'apply')}
          </button>
          <button onClick={() => setMobileOpen(v => !v)}
            className="md:hidden material-symbols-outlined text-on-surface-variant dark:text-slate-300 p-2">
            {mobileOpen ? 'close' : 'menu'}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 shadow-2xl">
            <Link to="/" className={mobileLinkCls('/')} onClick={() => setMobileOpen(false)}>{t(language, 'navigation', 'calculator')}</Link>
            <Link to="/schedule" className={mobileLinkCls('/schedule')} onClick={() => setMobileOpen(false)}>{t(language, 'navigation', 'schedule')}</Link>
            <Link to="/early" className={mobileLinkCls('/early')} onClick={() => setMobileOpen(false)}>{t(language, 'navigation', 'earlyInfo')}</Link>
            <div className="px-6 py-4">
              <button className="w-full bg-primary text-on-primary py-3 rounded-xl font-headline font-bold">
                {t(language, 'navigation', 'apply')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
