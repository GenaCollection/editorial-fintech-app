import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { TRIAL_DAYS, LIMITS, PRO_ENABLED } from '../config/monetization.js'

// Plan state for the freemium model:
//   free          — ads, limited saves / AI questions, watermarked PDF
//   trial         — full Pro for TRIAL_DAYS, no card required
//   pro           — license key verified by /api/license
// State lives in localStorage; the license is re-validated server-side.

var ProContext = createContext(null)

export function usePro() { return useContext(ProContext) }

var LS_KEY = 'afc_pro'
var DAY = 24 * 60 * 60 * 1000
var REVALIDATE_EVERY = 3 * DAY

function readLS() {
  try {
    var raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw) || {}
  } catch(e) {}
  return {}
}

function writeLS(obj) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(obj)) } catch(e) {}
}

function today() { return new Date().toISOString().slice(0, 10) }

export function validateLicenseRemote(key) {
  return fetch('/api/license', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ licenseKey: key })
  }).then(function(r) {
    return r.json().catch(function() { return { valid: false, error: 'bad_response' } })
  })
}

export function ProProvider(props) {
  var arr = useState(readLS)
  var state = arr[0]; var setState = arr[1]
  var upArr = useState(null)
  var upgradeReason = upArr[0]; var setUpgradeReason = upArr[1]
  var nowArr = useState(Date.now)
  var now = nowArr[0]

  var update = useCallback(function(patch) {
    setState(function(prev) {
      var next = Object.assign({}, prev, patch)
      writeLS(next)
      return next
    })
  }, [])

  // Superuser / tester access: open any page with ?access=<KEY> (one of the
  // PRO_DEMO_KEYS set in Vercel). The key is checked by /api/license, saved on
  // this device, and removed from the address bar.
  useEffect(function() {
    if (typeof window === 'undefined') return
    var params = new URLSearchParams(window.location.search)
    var key = params.get('access')
    if (!key) return
    params.delete('access')
    var qs = params.toString()
    window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash)
    validateLicenseRemote(key).then(function(res) {
      if (res && res.valid) update({ license: { key: key, plan: res.plan, expiresAt: res.expiresAt || null, validatedAt: Date.now() } })
    }).catch(function() {})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Periodically re-check the license so refunds/expired subscriptions lapse.
  useEffect(function() {
    var lic = state.license
    if (!lic || !lic.key) return
    if (lic.validatedAt && now - lic.validatedAt < REVALIDATE_EVERY) return
    validateLicenseRemote(lic.key).then(function(res) {
      if (res && res.valid) {
        update({ license: { key: lic.key, plan: res.plan, expiresAt: res.expiresAt || null, validatedAt: Date.now() } })
      } else if (res && res.valid === false && res.error !== 'network' && res.error !== 'not_configured') {
        update({ license: null })
      }
    }).catch(function() { /* offline: keep current license */ })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  var trialEndsAt = state.trialStartedAt ? state.trialStartedAt + TRIAL_DAYS * DAY : 0
  // While Pro is "coming soon" a started trial is ignored; a valid license
  // (e.g. PRO_DEMO_KEYS for testing) still works.
  var trialActive = PRO_ENABLED && trialEndsAt > now
  var licenseActive = !!(state.license && state.license.key &&
    (!state.license.expiresAt || new Date(state.license.expiresAt).getTime() > now))

  var status = licenseActive ? 'pro'
    : trialActive ? 'trial'
    : PRO_ENABLED && state.trialStartedAt ? 'trial_expired'
    : 'free'
  var isPro = status === 'pro' || status === 'trial'
  var limits = isPro ? LIMITS.pro : LIMITS.free
  var trialDaysLeft = trialActive ? Math.ceil((trialEndsAt - now) / DAY) : 0

  var aiUsedToday = state.ai && state.ai.date === today() ? state.ai.count : 0
  var aiLeft = Math.max(0, limits.aiPerDay - aiUsedToday)

  var startTrial = useCallback(function() {
    if (!PRO_ENABLED || state.trialStartedAt) return false
    update({ trialStartedAt: Date.now() })
    return true
  }, [state.trialStartedAt, update])

  var activateLicense = useCallback(function(key) {
    var k = String(key || '').trim()
    if (!k) return Promise.resolve({ valid: false, error: 'empty' })
    return validateLicenseRemote(k).then(function(res) {
      if (res && res.valid) {
        update({ license: { key: k, plan: res.plan, expiresAt: res.expiresAt || null, validatedAt: Date.now() } })
      }
      return res
    }).catch(function() { return { valid: false, error: 'network' } })
  }, [update])

  var deactivate = useCallback(function() { update({ license: null }) }, [update])

  var pdfUsedToday = state.pdf && state.pdf.date === today() ? state.pdf.count : 0
  var pdfLeft = Math.max(0, limits.pdfPerDay - pdfUsedToday)
  var recordPdfUse = useCallback(function() {
    setState(function(prev) {
      var d = today()
      var count = prev.pdf && prev.pdf.date === d ? prev.pdf.count + 1 : 1
      var next = Object.assign({}, prev, { pdf: { date: d, count: count } })
      writeLS(next)
      return next
    })
  }, [])

  var recordAiUse = useCallback(function() {
    setState(function(prev) {
      var d = today()
      var count = prev.ai && prev.ai.date === d ? prev.ai.count + 1 : 1
      var next = Object.assign({}, prev, { ai: { date: d, count: count } })
      writeLS(next)
      return next
    })
  }, [])

  var openUpgrade = useCallback(function(reason) { setUpgradeReason(reason || 'generic') }, [])
  var closeUpgrade = useCallback(function() { setUpgradeReason(null) }, [])

  var value = useMemo(function() {
    return {
      status: status, isPro: isPro, limits: limits,
      trialDaysLeft: trialDaysLeft, trialUsed: !!state.trialStartedAt, proEnabled: PRO_ENABLED,
      license: state.license || null,
      aiLeft: aiLeft, recordAiUse: recordAiUse, pdfLeft: pdfLeft, recordPdfUse: recordPdfUse,
      isTester: !!(state.license && state.license.plan === 'tester'),
      startTrial: startTrial, activateLicense: activateLicense, deactivate: deactivate,
      upgradeReason: upgradeReason, openUpgrade: openUpgrade, closeUpgrade: closeUpgrade
    }
  }, [status, isPro, limits, trialDaysLeft, state, aiLeft, recordAiUse, pdfLeft, recordPdfUse, startTrial,
      activateLicense, deactivate, upgradeReason, openUpgrade, closeUpgrade])

  return React.createElement(ProContext.Provider, { value: value }, props.children)
}
