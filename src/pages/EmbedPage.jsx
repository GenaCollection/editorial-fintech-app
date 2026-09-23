import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { URL_TO_LANG } from '../config/site.js'
import { pageSeo } from '../seo/meta.js'
import { useSeo } from '../seo/Seo.jsx'
import MiniCalculator from '../components/MiniCalculator.jsx'

// /embed — the calculator alone, rendered inside the iframe that
// public/embed.js inserts on third-party sites. No menu, ads or AI here.
//
// Query: lang=hy|ru|en  amount  rate  term  type=annuity|differentiated
//        theme=light|dark|auto  accent=RRGGBB  ref=<partner id>  id=<iframe id>

function num(v) { var n = Number(v); return isFinite(n) && n > 0 ? n : undefined }

export function parseEmbedParams(search) {
  var q = new URLSearchParams(search || '')
  var accent = (q.get('accent') || '').replace(/^#/, '')
  var ref = (q.get('ref') || '').slice(0, 40)
  return {
    lang: URL_TO_LANG[(q.get('lang') || '').toLowerCase()] || 'EN',
    initial: { amount: num(q.get('amount')), rate: num(q.get('rate')), term: num(q.get('term')), type: q.get('type') },
    theme: ['light', 'dark', 'auto'].indexOf(q.get('theme')) !== -1 ? q.get('theme') : 'light',
    accent: /^[0-9a-f]{6}$/i.test(accent) ? '#' + accent : undefined,
    ref: /^[a-z0-9._-]+$/i.test(ref) ? ref : '',
    id: (q.get('id') || '').replace(/[^a-z0-9_-]/gi, '').slice(0, 40)
  }
}

export default function EmbedPage() {
  var loc = useLocation()
  var p = parseEmbedParams(loc.search)
  var rootRef = useRef(null)
  useSeo(pageSeo('embed', p.lang))

  // Theme comes from the embed code, not from the visitor's choice on our site.
  useEffect(function() {
    var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
    function apply() {
      var dark = p.theme === 'dark' || (p.theme === 'auto' && mq && mq.matches)
      document.documentElement.classList.toggle('dark', !!dark)
    }
    apply()
    document.documentElement.style.background = 'transparent'
    document.body.style.background = 'transparent'
    if (p.theme === 'auto' && mq && mq.addEventListener) {
      mq.addEventListener('change', apply)
      return function() { mq.removeEventListener('change', apply) }
    }
  }, [p.theme])

  // Report the content height so embed.js can size the iframe (no scrollbars).
  useEffect(function() {
    if (!rootRef.current || window.parent === window) return
    var last = 0
    function send() {
      var h = Math.ceil(rootRef.current.getBoundingClientRect().height)
      if (h && h !== last) {
        last = h
        window.parent.postMessage({ type: 'armfincredit:height', id: p.id, height: h }, '*')
      }
    }
    send()
    if (typeof ResizeObserver === 'undefined') return
    var ro = new ResizeObserver(send)
    ro.observe(rootRef.current)
    return function() { ro.disconnect() }
  }, [p.id])

  return (
    <div ref={rootRef} className="p-1">
      <MiniCalculator lang={p.lang} initial={p.initial} accent={p.accent} external refId={p.ref} />
    </div>
  )
}
