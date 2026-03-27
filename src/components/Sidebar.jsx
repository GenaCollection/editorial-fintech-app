import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'

export default function Sidebar() {
  var loc = useLocation()
  var langCtx = useLanguage()
  var language = langCtx.language

  function cls(path) {
    var b = 'flex items-center px-4 py-3 mx-2 rounded-xl transition-all text-sm font-medium '
    return b + (loc.pathname === path
      ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800')
  }
  var inact = 'flex items-center px-4 py-3 mx-2 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'

  return (
    <aside className="hidden lg:flex flex-col py-6 w-60 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 sticky top-16 h-screen shrink-0">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center">
          <span className="material-symbols-outlined text-white" style={{fontSize:'18px'}}>account_balance</span>
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">ArmFinCredit</div>
          <div className="text-xs text-slate-400 uppercase tracking-widest">{t(language,'sidebar','inst')}</div>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        <Link to="/" className={cls('/')}>
          <span className="material-symbols-outlined mr-3" style={{fontSize:'18px'}}>add_chart</span>
          {t(language,'sidebar','newCalc')}
        </Link>
        <Link to="/schedule" className={cls('/schedule')}>
          <span className="material-symbols-outlined mr-3" style={{fontSize:'18px'}}>calendar_month</span>
          {t(language,'nav','sched')}
        </Link>
        <a href="#" className={inact}>
          <span className="material-symbols-outlined mr-3" style={{fontSize:'18px'}}>bookmark</span>
          {t(language,'sidebar','saved')}
        </a>
        <a href="#" className={inact}>
          <span className="material-symbols-outlined mr-3" style={{fontSize:'18px'}}>settings</span>
          {t(language,'sidebar','settings')}
        </a>
      </nav>
      <div className="px-6 py-4">
        <button className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold text-sm hover:bg-blue-800">
          {t(language,'sidebar','newApp')}
        </button>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
        <a href="#" className={inact}>
          <span className="material-symbols-outlined mr-3" style={{fontSize:'18px'}}>help</span>
          {t(language,'sidebar','help')}
        </a>
      </div>
    </aside>
  )
}
