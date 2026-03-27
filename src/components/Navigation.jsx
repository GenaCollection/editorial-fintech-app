import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navigation(props) {
  var language = props.language
  var setLanguage = props.setLanguage
  var theme = props.theme
  var toggleTheme = props.toggleTheme
  var location = useLocation()
  var openArr = useState(false)
  var open = openArr[0]
  var setOpen = openArr[1]

  function linkCls(path) {
    var base = 'text-sm font-bold transition-colors '
    if (location.pathname === path) {
      return base + 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 pb-1'
    }
    return base + 'text-slate-500 dark:text-slate-400 hover:text-blue-600'
  }

  function mlinkCls(path) {
    var base = 'block px-6 py-4 font-bold border-b border-slate-100 dark:border-slate-800 '
    if (location.pathname === path) {
      return base + 'text-blue-700 bg-blue-50 dark:bg-blue-900/20'
    }
    return base + 'text-slate-700 dark:text-slate-300 hover:bg-slate-50'
  }

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm h-16 flex items-center justify-between px-4 md:px-8">
        <span className="text-lg font-black text-blue-900 dark:text-blue-100 uppercase tracking-tighter">Editorial Fintech</span>

        <div className="hidden md:flex items-center gap-8">
          <Link className={linkCls('/')} to="/">Calculator</Link>
          <Link className={linkCls('/schedule')} to="/schedule">Schedule</Link>
          <Link className={linkCls('/early')} to="/early">Early Repayment</Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg gap-0.5">
            {['AM', 'RU', 'EN'].map(function(l) {
              return (
                <button
                  key={l}
                  onClick={function() { setLanguage(l) }}
                  className={'px-2 py-1 text-xs font-bold rounded transition-colors ' +
                    (language === l ? 'bg-blue-700 text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700')
                  }
                >{l}</button>
              )
            })}
          </div>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-lg"
          >{theme === 'light' ? '🌙' : '☀️'}</button>
          <button className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-800">Apply Now</button>
          <button
            onClick={function() { setOpen(function(v) { return !v }) }}
            className="md:hidden w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xl"
          >{open ? 'x' : '='}</button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={function() { setOpen(false) }} />
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 shadow-2xl">
            <Link to="/" className={mlinkCls('/')} onClick={function() { setOpen(false) }}>Calculator</Link>
            <Link to="/schedule" className={mlinkCls('/schedule')} onClick={function() { setOpen(false) }}>Schedule</Link>
            <Link to="/early" className={mlinkCls('/early')} onClick={function() { setOpen(false) }}>Early Repayment</Link>
            <div className="px-6 py-4">
              <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold">Apply Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
