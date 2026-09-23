import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePro } from '../context/ProContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { t } from '../i18n/labels.js'
import { ADSENSE_CLIENT, adSlotFor, PRO_ENABLED } from '../config/monetization.js'

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
  var slot = adSlotFor(placement)
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
        {!props.vertical && (
          <Link to="/pro" className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
            {t(lang,'ads', PRO_ENABLED ? 'remove' : 'removeSoon')} &rarr;
          </Link>
        )}
      </div>
      {slot ? (
        <ins className="adsbygoogle block rounded-2xl overflow-hidden"
          style={{ display: 'block', minHeight: props.vertical ? '600px' : '100px' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={props.vertical ? 'vertical' : 'auto'}
          data-full-width-responsive={props.vertical ? 'false' : 'true'} />
      ) : (
        <div className={(props.vertical ? 'h-[600px]' : 'h-24') + ' rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs text-slate-400'}>
          AdSense · {placement} (dev placeholder)
        </div>
      )}
    </div>
  )
}

// Vertical ad rails beside the content on wide screens (≥1536px), where the
// centred layout leaves empty side space. Hidden on content-less pages.
export function AdRails() {
  var isPro = usePro().isPro
  if (isPro) return null
  return (
    <>
      <div className="hidden 2xl:block fixed top-24 left-4 w-[160px] z-10"><AdSlot placement="rail" vertical /></div>
      <div className="hidden 2xl:block fixed top-24 right-4 w-[160px] z-10"><AdSlot placement="rail" vertical /></div>
    </>
  )
}
