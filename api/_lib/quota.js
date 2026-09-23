import crypto from 'node:crypto'

// Daily usage counters for the AI advisor, shared by all serverless instances.
//
// Storage: Redis over its REST API — Vercel → Storage → "Upstash Redis" (the
// successor of Vercel KV). Connecting it to the project adds
//   KV_REST_API_URL + KV_REST_API_TOKEN   (or UPSTASH_REDIS_REST_URL/_TOKEN)
// Without them, or if Redis is unreachable, counters fall back to memory of
// the current instance (best effort, resets on cold start).

var DAY_TTL = 2 * 24 * 3600
var memory = new Map()

function redisConfig() {
  var url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  var token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url: String(url).trim().replace(/\/+$/, ''), token: String(token).trim() } : null
}

export function quotaStore() { return redisConfig() ? 'redis' : 'memory' }

// Short, non-reversible id for keys (IPs and license keys are never stored).
export function hashId(s) {
  return crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 20)
}

async function redis(cfg, commands) {
  var r = await fetch(cfg.url + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + cfg.token, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(3000)
  })
  if (!r.ok) throw new Error('redis HTTP ' + r.status)
  var out = await r.json()
  out.forEach(function(x) { if (x && x.error) throw new Error('redis: ' + x.error) })
  return out.map(function(x) { return x && x.result })
}

function memAdd(key, by) {
  var n = (memory.get(key) || 0) + by
  memory.set(key, n)
  if (memory.size > 5000) memory.clear()
  return n
}

async function add(keys, by) {
  var cfg = redisConfig()
  if (cfg) {
    try {
      var cmds = []
      keys.forEach(function(k) { cmds.push(['INCRBY', k, String(by)]); cmds.push(['EXPIRE', k, String(DAY_TTL)]) })
      var res = await redis(cfg, cmds)
      return { counts: keys.map(function(_, i) { return Number(res[i * 2]) }), store: 'redis' }
    } catch (e) {
      console.warn('[quota] Redis unavailable, using memory:', e && e.message)
    }
  }
  return { counts: keys.map(function(k) { return memAdd(k, by) }), store: 'memory' }
}

// checks: [{ id, limit }]. Counts one use against every check; the request is
// allowed only if all counters stay within their limits.
// Returns { ok, left, store, refund() } — call refund() if the use should not
// count (e.g. the AI provider failed).
export async function takeQuota(checks) {
  var day = new Date().toISOString().slice(0, 10)
  var keys = checks.map(function(c) { return 'afc:ai:' + day + ':' + c.id })
  var r = await add(keys, 1)
  var left = Infinity, ok = true
  checks.forEach(function(c, i) {
    if (r.counts[i] > c.limit) ok = false
    left = Math.min(left, Math.max(0, c.limit - r.counts[i]))
  })
  // A refused request does not count, so retries cannot eat into the shared
  // per-IP allowance of other people behind the same address.
  if (!ok) { await add(keys, -1).catch(function() {}); left = 0 }
  return {
    ok: ok,
    left: left,
    store: r.store,
    refund: function() { return add(keys, -1).catch(function() {}) }
  }
}
