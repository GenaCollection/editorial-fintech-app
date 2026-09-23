import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePro } from '../context/ProContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { ADSENSE_CLIENT, AD_SLOTS } from '../config/monetization.js'

var SCRIPT_ID = 'adsbygoogle-js'

// Loads the AdSense script only for free users, so Pro is truly ad-free
// (no Auto ads, no third-party cookies, faster page).
export function AdsLoader() {
  var isPro = usePro().isPro
  useEffect(function() {
    if (isPro || !ADSENSE_CLIENT || document.getElementById(SCRIPT_ID)) return
    var s = document.createElement('script')
    s.id = SCRIPT_ID
    s.async = true
    s.crossOrigin = 'anonymous'
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT
    document.head.appendChild(s)
  }, [isPro])
  return null
}

// In-content responsive display unit with a "Remove ads" upsell link.
export default function AdSlot(props) {
  var placement = props.placement
  var slot = AD_SLOTS[placement]
  var isPro = usePro().isPro
  var lang = useLanguage().language
  var pushed = useRef(false)

  useEffect(function() {
    if (isPro || !slot || pushed.current) return
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
      pushed.current = true
    } catch(e) {}
  }, [isPro, slot])

  if (isPro) return null
  if (!slot && !import.meta.env.DEV) return null

  return (
    <div className={'no-print ' + (props.className || '')}>
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="text-[10px] uppercase tracking-widest text-slate-400">{t(lang,'ads','label')}</span>
        <Link to="/pro" className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
          {t(lang,'ads','remove')} &rarr;
        </Link>
      </div>
      {slot ? (
        <ins className="adsbygoogle block rounded-2xl overflow-hidden"
          style={{ display: 'block', minHeight: '100px' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true" />
      ) : (
        <div className="h-24 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400">
          AdSense · {placement} (dev placeholder)
        </div>
      )}
    </div>
  )
}
