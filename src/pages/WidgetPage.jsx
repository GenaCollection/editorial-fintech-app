import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { SITE_URL } from '../config/site.js'
import { mailto } from '../config/monetization.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'

// /widget — configurator for the embeddable calculator (public/embed.js).
// Free widget = backlinks + referral traffic; white-label = B2B revenue.

var FIELD = 'w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-blue-400'

function Choice(props) {
  return (
    <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
      {props.options.map(function(o) {
        var on = props.value === o[0]
        return (
          <button key={o[0]} type="button" onClick={function() { props.onChange(o[0]) }}
            className={'flex-1 py-2 text-xs font-bold rounded-lg transition-all ' + (on ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200')}>
            {o[1]}
          </button>
        )
      })}
    </div>
  )
}

export default function WidgetPage() {
  var lang = useLanguage().language
  useSeo(pageSeo('widget', lang))
  var cfgArr = useState({ lang: lang === 'AM' ? 'hy' : lang.toLowerCase(), amount: 5000000, rate: 12, term: 60, theme: 'light', accent: '1d4ed8', ref: '' })
  var cfg = cfgArr[0]; var setCfg = cfgArr[1]
  var copiedArr = useState(false); var copied = copiedArr[0]; var setCopied = copiedArr[1]
  var hArr = useState(640); var frameH = hArr[0]; var setFrameH = hArr[1]

  function set(k) { return function(v) { setCfg(function(p) { var n = Object.assign({}, p); n[k] = v; return n }) } }

  var attrs = [['lang', cfg.lang], ['amount', Math.round(Number(cfg.amount) || 0)], ['rate', Number(cfg.rate) || ''], ['term', Math.round(Number(cfg.term) || 0)], ['theme', cfg.theme], ['accent', cfg.accent]]
  var ref = cfg.ref.replace(/[^a-z0-9._-]/gi, '').slice(0, 40)
  if (ref) attrs.push(['ref', ref])
  attrs = attrs.filter(function(a) { return a[1] !== '' && a[1] !== 0 })

  var snippet = '<div data-armfincredit ' + attrs.map(function(a) { return 'data-' + a[0] + '="' + a[1] + '"' }).join(' ') + '></div>\n' +
    '<script src="' + SITE_URL + '/embed.js" async></script>'
  var previewSrc = '/embed?id=preview&' + attrs.map(function(a) { return a[0] + '=' + encodeURIComponent(a[1]) }).join('&')

  // Reload the preview iframe only after typing pauses.
  var srcArr = useState(previewSrc); var frameSrc = srcArr[0]; var setFrameSrc = srcArr[1]
  useEffect(function() {
    var id = setTimeout(function() { setFrameSrc(previewSrc) }, 500)
    return function() { clearTimeout(id) }
  }, [previewSrc])

  useEffect(function() {
    function onMsg(e) {
      if (e.origin !== window.location.origin || !e.data || e.data.type !== 'armfincredit:height' || e.data.id !== 'preview') return
      var h = Number(e.data.height)
      if (h > 0 && h < 5000) setFrameH(h)
    }
    window.addEventListener('message', onMsg)
    return function() { window.removeEventListener('message', onMsg) }
  }, [])

  function copy() {
    function done() { setCopied(true); setTimeout(function() { setCopied(false) }, 2000) }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(snippet).then(done, done)
    else done()
  }

  var features = [{ icon: 'volunteer_activism', key: 'f1' }, { icon: 'height', key: 'f2' }, { icon: 'palette', key: 'f3' }]

  return (
    <main className="flex-1 pt-24 pb-24 px-4 md:px-8 w-full max-w-6xl mx-auto animate-fade-up">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest uppercase text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-900/40 rounded-full px-3 py-1 mb-4">
          <span className="material-symbols-outlined" style={{fontSize:'16px'}}>widgets</span> {t(lang,'widget','badge')}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          <span className="text-gradient">{t(lang,'widget','title')}</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{t(lang,'widget','subtitle')}</p>
        <p className="text-sm text-slate-400 mt-2">{t(lang,'widget','who')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {features.map(function(f) {
          return (
            <div key={f.key} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-5">
              <span className="material-symbols-outlined text-blue-600 mb-2 block">{f.icon}</span>
              <p className="font-extrabold text-slate-900 dark:text-white">{t(lang,'widget',f.key)}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t(lang,'widget',f.key + 'd')}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 p-6 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t(lang,'widget','settings')}</p>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">{t(lang,'widget','language')}</label>
              <Choice value={cfg.lang} onChange={set('lang')} options={[['hy', 'Հայերեն'], ['ru', 'Русский'], ['en', 'English']]} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">{t(lang,'widget','theme')}</label>
              <Choice value={cfg.theme} onChange={set('theme')} options={[['light', t(lang,'widget','light')], ['dark', t(lang,'widget','dark')], ['auto', t(lang,'widget','auto')]]} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5" htmlFor="w-accent">{t(lang,'widget','accent')}</label>
                <div className="flex gap-2 items-center">
                  <input id="w-accent" type="color" value={'#' + cfg.accent}
                    onChange={function(e) { set('accent')(e.target.value.replace('#', '')) }}
                    className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent cursor-pointer" />
                  <span className="font-mono text-sm text-slate-500">#{cfg.accent}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5" htmlFor="w-ref">{t(lang,'widget','ref')}</label>
                <input id="w-ref" value={cfg.ref} maxLength={40} placeholder="my-site" onChange={function(e) { set('ref')(e.target.value) }} className={FIELD} />
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 pt-2">{t(lang,'widget','defaults')}</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5" htmlFor="w-amount">{t(lang,'calc','amount')}</label>
                <input id="w-amount" type="number" min="100000" step="100000" value={cfg.amount} onChange={function(e) { set('amount')(e.target.value) }} className={FIELD} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5" htmlFor="w-rate">{t(lang,'calc','rate')}</label>
                <input id="w-rate" type="number" min="0.1" step="0.1" value={cfg.rate} onChange={function(e) { set('rate')(e.target.value) }} className={FIELD} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5" htmlFor="w-term">{t(lang,'calc','term')}</label>
                <input id="w-term" type="number" min="1" max="360" value={cfg.term} onChange={function(e) { set('term')(e.target.value) }} className={FIELD} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 text-slate-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold">{t(lang,'widget','code')}</p>
              <button type="button" onClick={copy}
                className={'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ' + (copied ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20')}>
                <span className="material-symbols-outlined" style={{fontSize:'16px'}}>{copied ? 'check' : 'content_copy'}</span>
                {copied ? t(lang,'widget','copied') : t(lang,'widget','copy')}
              </button>
            </div>
            <pre className="text-xs leading-relaxed whitespace-pre-wrap break-all font-mono text-emerald-300">{snippet}</pre>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{t(lang,'widget','preview')}</p>
          <div className={'rounded-3xl p-4 sm:p-6 border border-dashed border-slate-300 dark:border-slate-700 ' + (cfg.theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100/60 dark:bg-slate-900/40')}>
            <iframe key={frameSrc} src={frameSrc} title={t(lang,'widget','preview')}
              className="w-full max-w-[560px] mx-auto block border-0 bg-transparent"
              style={{ height: frameH + 'px' }} />
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-brand-gradient text-white p-7 md:p-9 flex flex-col md:flex-row md:items-center gap-5 justify-between shadow-xl shadow-blue-700/20">
        <div>
          <p className="text-2xl font-extrabold">{t(lang,'widget','proT')}</p>
          <p className="opacity-85 mt-1 max-w-xl">{t(lang,'widget','proD')}</p>
        </div>
        <a href={mailto('ArmFinCredit white-label widget')}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-800 rounded-2xl font-extrabold hover:bg-blue-50">
          <span className="material-symbols-outlined" style={{fontSize:'18px'}}>send</span>
          {t(lang,'widget','proB')}
        </a>
      </div>
    </main>
  )
}
