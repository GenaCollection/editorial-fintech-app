import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useSaved } from '../context/SavedContext.jsx'
import { t } from '../i18n/labels.js'

export default function Navigation(props) {
  var theme = props.theme; var toggleTheme = props.toggleTheme
  var loc = useLocation()
  var langCtx = useLanguage(); var language = langCtx.language; var setLanguage = langCtx.setLanguage
  var saves = useSaved().saves
  var openArr = useState(false); var open = openArr[0]; var setOpen = openArr[1]

  function lc(path) {
    var b = 'text-sm font-bold transition-colors '
    return b + (loc.pathname === path
      ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700 pb-1'
      : 'text-slate-500 dark:text-slate-400 hover:text-blue-600')
  }
  function mc(path) {
    var b = 'block px-6 py-4 font-bold border-b border-slate-100 dark:border-slate-800 '
    return b + (loc.pathname === path
      ? 'text-blue-700 bg-blue-50 dark:bg-blue-900/20'
      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50')
  }

  var savedLabel = { AM: '\u054a\u0561\u0570\u057e\u0561\u056e', RU: '\u0421\u043e\u0445\u0440\u0430\u043d\u0451\u043d\u043d\u044b\u0435', EN: 'Saved' }
  var savedLbl = savedLabel[language] || 'Saved'

  return (
    <div>
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm h-16 flex items-center justify-between px-4 md:px-8">
        <span className="text-lg font-black text-blue-900 dark:text-blue-100 uppercase tracking-tighter">ArmFinCredit</span>

        <div className="hidden md:flex items-center gap-8">
          <Link className={lc('/')} to="/">{t(language,'nav','calc')}</Link>
          <Link className={lc('/schedule')} to="/schedule">{t(language,'nav','sched')}</Link>
          <Link className={lc('/early')} to="/early">{t(language,'nav','early')}</Link>
          <Link className={lc('/saved')} to="/saved">
            <span className="relative">
              {savedLbl}
              {saves.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-blue-700 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {saves.length > 9 ? '9+' : saves.length}
                </span>
              )}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg gap-0.5">
            {['AM','RU','EN'].map(function(l) {
              return (
                <button key={l} onClick={function() { setLanguage(l) }}
                  className={'px-2 py-1 text-xs font-bold rounded transition-colors ' +
                    (language === l ? 'bg-blue-700 text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700')}
                >{l}</button>
              )
            })}
          </div>
          <button onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-lg"
          >{theme === 'light' ? '\uD83C\uDF19' : '\u2600\uFE0F'}</button>
          <button className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-800">
            {t(language,'nav','apply')}
          </button>
          <button onClick={function() { setOpen(function(v) { return !v }) }}
            className="md:hidden w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xl"
          >{open ? 'x' : '='}</button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={function() { setOpen(false) }} />
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 shadow-2xl">
            <Link to="/" className={mc('/')} onClick={function() { setOpen(false) }}>{t(language,'nav','calc')}</Link>
            <Link to="/schedule" className={mc('/schedule')} onClick={function() { setOpen(false) }}>{t(language,'nav','sched')}</Link>
            <Link to="/early" className={mc('/early')} onClick={function() { setOpen(false) }}>{t(language,'nav','early')}</Link>
            <Link to="/saved" className={mc('/saved')} onClick={function() { setOpen(false) }}>
              {savedLbl}{saves.length > 0 ? ' ('+saves.length+')' : ''}
            </Link>
            <div className="px-6 py-4">
              <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold">{t(language,'nav','apply')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
