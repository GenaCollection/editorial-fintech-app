// License validation shared by /api/license and /api/ai.
// Supports Lemon Squeezy (default) and Gumroad license keys.
//
// Env:
//   LICENSE_PROVIDER      lemonsqueezy | gumroad            (default lemonsqueezy)
//   LEMONSQUEEZY_STORE_ID optional — reject keys from other stores
//   GUMROAD_PRODUCT_ID    required for gumroad
//   PRO_DEMO_KEYS         comma-separated superuser/tester keys (full Pro, plan "tester")

var cache = new Map()
var CACHE_MS = 10 * 60 * 1000

function result(valid, extra) { return Object.assign({ valid: valid }, extra || {}) }

async function lemonSqueezy(key) {
  var r = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ license_key: key }).toString()
  })
  var j = await r.json().catch(function() { return {} })
  if (!j.valid || !j.license_key) return result(false, { error: 'invalid' })
  var storeId = process.env.LEMONSQUEEZY_STORE_ID
  if (storeId && j.meta && String(j.meta.store_id) !== String(storeId)) return result(false, { error: 'invalid' })
  if (j.license_key.status === 'expired' || j.license_key.status === 'disabled') return result(false, { error: 'expired' })
  var variant = (j.meta && j.meta.variant_name) || ''
  return result(true, {
    plan: /life/i.test(variant) || !j.license_key.expires_at ? 'lifetime' : 'monthly',
    expiresAt: j.license_key.expires_at || null
  })
}

async function gumroad(key) {
  var productId = process.env.GUMROAD_PRODUCT_ID
  if (!productId) return result(false, { error: 'not_configured' })
  var r = await fetch('https://api.gumroad.com/v2/licenses/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ product_id: productId, license_key: key, increment_uses_count: 'false' }).toString()
  })
  var j = await r.json().catch(function() { return {} })
  var p = j.purchase
  if (!j.success || !p) return result(false, { error: 'invalid' })
  if (p.refunded || p.chargebacked || p.disputed) return result(false, { error: 'invalid' })
  if (p.subscription_ended_at || p.subscription_cancelled_at || p.subscription_failed_at) return result(false, { error: 'expired' })
  return result(true, { plan: p.recurrence ? 'monthly' : 'lifetime', expiresAt: null })
}

export async function validateLicense(rawKey) {
  var key = String(rawKey || '').trim()
  if (!key || key.length > 200) return result(false, { error: 'invalid' })

  var demo = (process.env.PRO_DEMO_KEYS || '').split(',').map(function(s) { return s.trim() }).filter(Boolean)
  if (demo.indexOf(key) !== -1) return result(true, { plan: 'tester', expiresAt: null })

  var hit = cache.get(key)
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.res

  var provider = (process.env.LICENSE_PROVIDER || 'lemonsqueezy').toLowerCase()
  var res
  try {
    res = provider === 'gumroad' ? await gumroad(key) : await lemonSqueezy(key)
  } catch (e) {
    return result(false, { error: 'network' })
  }
  cache.set(key, { at: Date.now(), res: res })
  return res
}

export function readJson(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body)
  if (typeof req.body === 'string') {
    try { return Promise.resolve(JSON.parse(req.body)) } catch (e) { return Promise.resolve({}) }
  }
  return new Promise(function(resolve) {
    var data = ''
    req.on('data', function(c) { data += c; if (data.length > 64 * 1024) req.destroy() })
    req.on('end', function() { try { resolve(JSON.parse(data || '{}')) } catch (e) { resolve({}) } })
    req.on('error', function() { resolve({}) })
  })
}

export function clientIp(req) {
  var fwd = req.headers['x-forwarded-for']
  return (Array.isArray(fwd) ? fwd[0] : String(fwd || '')).split(',')[0].trim() || (req.socket && req.socket.remoteAddress) || 'unknown'
}
