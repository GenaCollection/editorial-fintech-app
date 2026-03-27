import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { t } from '../i18n/labels'

export default function Sidebar({ language }) {
  const location = useLocation()
  const base = 'flex items-center px-4 py-3 mx-2 rounded-xl transition-all duration-200 hover:translate-x-1'
  const active = base + ' text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold'
  const inactive = base + ' text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  const cls = (path) => location.pathname === path ? active : inactive

  return (
    <aside className="hidden lg:flex flex-col py-6 h-[calc(100vh-5rem)] w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 sticky top-20 shrink-0">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">account_balance</span>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {t(language, 'sidebar', 'planner')}
            </div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">
              {t(language, 'sidebar', 'access')}
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <Link to="/" className={cls('/')}>
          <span className="material-symbols-outlined mr-3 text-xl">add_chart</span>
          <span className="text-sm font-medium">{t(language, 'sidebar', 'newCalc')}</span>
        </Link>
        <Link to="/schedule" className={cls('/schedule')}>
          <span className="material-symbols-outlined mr-3 text-xl">calendar_month</span>
          <span className="text-sm font-medium">{t(language, 'sidebar', 'history')}</span>
        </Link>
        <a href="#" className={inactive}>
          <span className="material-symbols-outlined mr-3 text-xl">bookmark</span>
          <span className="text-sm font-medium">{t(language, 'sidebar', 'saved')}</span>
        </a>
        <a href="#" className={inactive}>
          <span className="material-symbols-outlined mr-3 text-xl">settings</span>
          <span className="text-sm font-medium">{t(language, 'sidebar', 'settings')}</span>
        </a>
      </nav>

      <div className="px-6 py-4">
        <button className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold text-sm hover:bg-blue-800 active:scale-95 transition-all shadow-lg shadow-blue-700/20">
          {t(language, 'sidebar', 'apply')}
        </button>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
        <a className={inactive} href="#">
          <span className="material-symbols-outlined mr-3 text-xl">help</span>
          <span className="text-sm font-medium">{t(language, 'sidebar', 'help')}</span>
        </a>
      </div>
    </aside>
  )
}
