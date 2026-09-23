import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import { useSaved } from '../context/SavedContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import { t } from '../i18n/labels.js'
import { alternatePath } from '../seo/landings.js'
import { localPathFor } from '../seo/localPages.js'

var LINKS = [
  { to: '/',         icon: 'calculate',      label: function(l) { return t(l,'nav','calc') } },
  { to: '/schedule', icon: 'calendar_month', label: function(l) { return t(l,'nav','sched') } },
  { to: '/early',    icon: 'rocket_launch',  label: function(l) { return t(l,'nav','early') }, compact: true },
  { to: '/compare',  icon: 'compare_arrows', label: function(l) { return t(l,'menu','compare') } },
  { to: '/deposit',  icon: 'savings',        label: function(l) { return t(l,'menu','deposit') } },
  { to: '/banks',    icon: 'account_balance',label: function(l) { return t(l,'menu','banks') } },
  { to: '/exchange-rates', icon: 'currency_exchange', label: function(l) { return t(l,'menu','fx') } },
  { to: '/offers',   icon: 'local_offer',    label: function(l) { return t(l,'menu','offers') } },
  { to: '/saved',    icon: 'bookmark',       label: function(l) { return t(l,'menu','saved') }, compact: true }
]

function ProButton(props) {
  var pro = props.pro; var lang = props.lang
  if (pro.status === 'pro') {
    return (
      <Link to="/pro" className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-brand-gradient text-white text-xs font-black tracking-wider">
        <span className="material-symbols-outlined" style={{fontSize:'15px'}}>workspace_premium</span> PRO
      </Link>
    )
  }
  return (
    <Link to="/pro" onClick={props.onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-gradient text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-700/25 hover:opacity-95 active:scale-95 transition-all">
      <span className="material-symbols-outlined" style={{fontSize:'16px'}}>workspace_premium</span>
      {pro.status === 'trial'
        ? <span>{t(lang,'menu','trial')} · {pro.trialDaysLeft} {t(lang,'menu','daysLeft')}</span>
        : <span>{t(lang,'menu','pro')}{!pro.proEnabled && <span className="ml-1 text-[9px] font-black uppercase bg-white/25 rounded px-1 py-0.5 align-middle">{t(lang,'pro','soonBadge')}</span>}</span>}
    </Link>
  )
}

export default function Navigation(props) {
  var theme = props.theme; var toggleTheme = props.toggleTheme
  var loc = useLocation()
  var navigate = useNavigate()
  var langCtx = useLanguage(); var language = langCtx.language; var setLanguage = langCtx.setLanguage
  var saves = useSaved().saves
  var pro = usePro()
  var openArr = useState(false); var open = openArr[0]; var setOpen = openArr[1]
  var scrolledArr = useState(false); var scrolled = scrolledArr[0]; var setScrolled = scrolledArr[1]

  useEffect(function() {
    function onScroll() { setScrolled(window.scrollY > 8) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return function() { window.removeEventListener('scroll', onScroll) }
  }, [])
  useEffect(function() { setOpen(false) }, [loc.pathname])

  function isActive(path) {
    return loc.pathname === path || (path !== '/' && loc.pathname === localPathFor(path, language))
  }

  function lc(path) {
    var active = isActive(path)
    return 'relative px-2.5 py-2 rounded-xl text-sm font-bold transition-colors ' +
      (active ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/70')
  }

  return (
    <div className="no-print">
      <nav className={'fixed top-0 w-full z-50 h-16 flex items-center justify-between px-4 md:px-6 transition-all duration-300 ' +
        (scrolled || open ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60' : 'bg-transparent border-b border-transparent')}>
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 rounded-xl bg-brand-gradient text-white flex items-center justify-center shadow-md shadow-blue-700/30">
            <span className="material-symbols-outlined" style={{fontSize:'20px'}}>account_balance</span>
          </span>
          <span className="text-base font-black text-slate-900 dark:text-white tracking-tight hidden sm:inline">ArmFin<span className="text-gradient">Credit</span></span>
        </Link>

        {/* `compact` links live in the menu only, so the bar fits from 1280px. */}
        <div className="hidden xl:flex items-center gap-0.5">
          {LINKS.filter(function(l) { return !l.compact }).map(function(l) {
            return (
              <Link key={l.to} className={lc(l.to)} to={localPathFor(l.to, language)}>
                {l.label(language)}
                {l.to === '/saved' && saves.length > 0 && (
                  <span className="ml-1.5 bg-blue-700 text-white text-[10px] font-black min-w-4 h-4 px-1 rounded-full inline-flex items-center justify-center align-middle">
                    {saves.length > 9 ? '9+' : saves.length}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-0.5">
            {['AM','RU','EN'].map(function(l) {
              return (
                <button key={l} onClick={function() {
                    setLanguage(l)
                    var alt = alternatePath(loc.pathname, l)
                    if (alt && alt !== loc.pathname) navigate(alt)
                  }}
                  className={'px-2 py-1 text-[11px] font-bold rounded-lg transition-colors ' +
                    (language === l ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200')}
                >{l}</button>
              )
            })}
          </div>
          <button onClick={toggleTheme} aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined" style={{fontSize:'20px'}}>{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
          </button>
          <ProButton pro={pro} lang={language} />
          <button onClick={function() { setOpen(function(v) { return !v }) }} aria-label="Menu"
            className="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm animate-fade-in" onClick={function() { setOpen(false) }} />
          <div className="absolute top-16 left-3 right-3 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-2 animate-slide-down border border-slate-200/60 dark:border-slate-800">
            {LINKS.map(function(l) {
              var active = isActive(l.to)
              return (
                <Link key={l.to} to={localPathFor(l.to, language)}
                  className={'flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold ' +
                    (active ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800')}>
                  <span className="material-symbols-outlined" style={{fontSize:'20px'}}>{l.icon}</span>
                  {l.label(language)}
                  {l.to === '/saved' && saves.length > 0 ? <span className="ml-auto text-xs text-slate-400">{saves.length}</span> : null}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
