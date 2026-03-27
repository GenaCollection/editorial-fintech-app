import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation({ language, setLanguage, theme, toggleTheme }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const active = 'font-bold text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 pb-1'
  const inactive = 'font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600'
  const cls = (path) => `text-sm transition-colors ${location.pathname === path ? active : inactive}`

  const mActive = 'block px-6 py-4 font-bold border-b border-slate-100 dark:border-slate-800 text-blue-700 bg-blue-50 dark:bg-blue-900/20'
  const mInactive = 'block px-6 py-4 font-bold border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
  const mcls = (path) => location.pathname === path ? mActive : mInactive

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm flex justify-between items-center px-4 md:px-8 h-16">
        <span className="text-lg font-black text-blue-900 dark:text-blue-100 uppercase tracking-tighter">Editorial Fintech</span>
        <div className="hidden md:flex items-center gap-8">
          <Link className={cls('/')} to="/">Calculator</Link>
          <Link className={cls('/schedule')} to="/schedule">Schedule</Link>
          <Link className={cls('/early')} to="/early">Early Repayment</Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {['AM','RU','EN'].map(l => (
              <button key={l} onClick={() => setLanguage(l)}
                className={`px-2 py-1 text-[10px] font-bold rounded transition-colors ${
                  language === l ? 'bg-blue-700 text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}>{l}</button>
            ))}
          </div>
          <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-800">Apply Now</button>
          <button onClick={() => setOpen(v => !v)} className="md:hidden w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 shadow-2xl">
            <Link to="/" className={mcls('/')} onClick={() => setOpen(false)}>Calculator</Link>
            <Link to="/schedule" className={mcls('/schedule')} onClick={() => setOpen(false)}>Schedule</Link>
            <Link to="/early" className={mcls('/early')} onClick={() => setOpen(false)}>Early Repayment</Link>
            <div className="px-6 py-4">
              <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold">Apply Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
