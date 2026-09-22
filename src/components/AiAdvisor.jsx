import React, { useState, useRef, useEffect } from 'react'
import { useLoan } from '../context/LoanContext.jsx'
import { usePro } from '../context/ProContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { buildLoanSnapshot, analyzeLoan } from '../lib/insights.js'

var SUGGESTIONS = [['s1', 'summary'], ['s2', 'save'], ['s3', 'type'], ['s4', 'rate']]

// Renders **bold** and "- " bullets from model output without a markdown lib.
function RichText(props) {
  var lines = String(props.text || '').split('\n')
  return (
    <div className="space-y-1.5">
      {lines.map(function(line, i) {
        if (!line.trim()) return null
        var bullet = /^\s*([-*•]|\d+\.)\s+/.test(line)
        var clean = line.replace(/^\s*([-*•]|\d+\.)\s+/, '').replace(/^#+\s*/, '')
        var parts = clean.split(/(\*\*[^*]+\*\*)/g)
        return (
          <p key={i} className={bullet ? 'pl-4 relative before:content-["•"] before:absolute before:left-0 before:text-blue-500' : ''}>
            {parts.map(function(p, j) {
              return /^\*\*[^*]+\*\*$/.test(p) ? <strong key={j}>{p.slice(2, -2)}</strong> : <React.Fragment key={j}>{p}</React.Fragment>
            })}
          </p>
        )
      })}
    </div>
  )
}

export default function AiAdvisor() {
  var loan = useLoan()
  var pro = usePro()
  var lang = useLanguage().language
  var openArr = useState(false); var open = openArr[0]; var setOpen = openArr[1]
  var msgArr = useState([]); var messages = msgArr[0]; var setMessages = msgArr[1]
  var inArr = useState(''); var input = inArr[0]; var setInput = inArr[1]
  var busyArr = useState(false); var busy = busyArr[0]; var setBusy = busyArr[1]
  var listRef = useRef(null)

  useEffect(function() {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, busy])

  function ask(text, topic) {
    var q = String(text || '').trim()
    if (!q || busy) return
    if (pro.aiLeft <= 0) { pro.openUpgrade('ai'); return }

    var snap = buildLoanSnapshot(loan)
    var history = messages.concat([{ role: 'user', content: q }])
    setMessages(history)
    setInput('')
    setBusy(true)

    fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lang: lang, loan: snap,
        licenseKey: pro.license ? pro.license.key : undefined,
        messages: history.filter(function(m) { return !m.offline }).slice(-8)
          .map(function(m) { return { role: m.role, content: m.content } })
      })
    }).then(function(r) {
      return r.json().catch(function() { return {} }).then(function(j) { return { ok: r.ok, body: j } })
    }).then(function(res) {
      if (res.ok && res.body.reply) {
        pro.recordAiUse()
        setMessages(function(prev) { return prev.concat([{ role: 'assistant', content: res.body.reply }]) })
      } else {
        throw new Error(res.body.error || 'unavailable')
      }
    }).catch(function() {
      // No provider configured / quota hit / offline → local rule-based analysis.
      var reply = analyzeLoan(snap, topic || 'all', lang)
      setMessages(function(prev) { return prev.concat([{ role: 'assistant', content: reply, offline: true }]) })
    }).then(function() { setBusy(false) })
  }

  function onSubmit(e) { e.preventDefault(); ask(input) }

  return (
    <>
      <button onClick={function() { setOpen(true) }}
        aria-label={t(lang,'ai','title')}
        className={'no-print fixed bottom-5 right-5 z-40 flex items-center gap-2 pl-4 pr-5 h-14 rounded-full bg-brand-gradient text-white font-bold shadow-xl shadow-blue-700/30 hover:scale-105 active:scale-95 transition-transform ' + (open ? 'hidden' : '')}>
        <span className="material-symbols-outlined animate-pulse-soft">auto_awesome</span>
        <span className="hidden sm:inline text-sm">AI</span>
      </button>

      {open && (
        <div className="no-print fixed inset-0 z-50 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[400px] sm:h-[600px] sm:max-h-[calc(100vh-6rem)] flex flex-col bg-white dark:bg-slate-900 sm:rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden animate-slide-up">
          <div className="bg-brand-gradient text-white px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined" style={{fontSize:'20px'}}>auto_awesome</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold leading-tight">{t(lang,'ai','title')}</div>
              <div className="text-[11px] opacity-80">{pro.aiLeft} {t(lang,'ai','left')}{pro.isPro ? ' · PRO' : ''}</div>
            </div>
            <button onClick={function() { setOpen(false) }} aria-label="Close"
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center">
              <span className="material-symbols-outlined" style={{fontSize:'18px'}}>close</span>
            </button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 text-sm">
            <div className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-md px-4 py-3 max-w-[88%]">
              {t(lang,'ai','hello')}
            </div>
            {messages.map(function(m, i) {
              var mine = m.role === 'user'
              return (
                <div key={i} className={mine ? 'flex justify-end' : ''}>
                  <div className={'rounded-2xl px-4 py-3 max-w-[88%] leading-relaxed ' +
                    (mine ? 'bg-blue-700 text-white rounded-tr-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-md')}>
                    {m.offline && (
                      <div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">{t(lang,'ai','offline')}</div>
                    )}
                    {mine ? m.content : <RichText text={m.content} />}
                  </div>
                </div>
              )
            })}
            {busy && (
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-md px-4 py-3 inline-flex items-center gap-2 text-slate-500">
                <span className="material-symbols-outlined animate-spin" style={{fontSize:'16px'}}>progress_activity</span>
                {t(lang,'ai','thinking')}
              </div>
            )}
          </div>

          <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            {SUGGESTIONS.map(function(s) {
              return (
                <button key={s[0]} disabled={busy} onClick={function() { ask(t(lang,'ai',s[0]), s[1]) }}
                  className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-900/20 hover:bg-blue-100 disabled:opacity-50">
                  {t(lang,'ai',s[0])}
                </button>
              )
            })}
          </div>

          <form onSubmit={onSubmit} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input value={input} onChange={function(e) { setInput(e.target.value) }} maxLength={500}
              placeholder={t(lang,'ai','ph')}
              className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="submit" disabled={busy || !input.trim()} aria-label={t(lang,'ai','send')}
              className="w-11 h-11 rounded-xl bg-blue-700 text-white flex items-center justify-center disabled:opacity-40 hover:bg-blue-800">
              <span className="material-symbols-outlined" style={{fontSize:'20px'}}>send</span>
            </button>
          </form>
          <div className="px-4 pb-3 flex justify-between items-center text-[10px] text-slate-400">
            <span>{t(lang,'ai','disclaimer')}</span>
            {!pro.isPro && (
              <button onClick={function() { pro.openUpgrade('ai') }} className="font-bold text-blue-600 hover:underline">
                {t(lang,'ai','upgrade')}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
