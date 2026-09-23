import crypto from 'node:crypto'
import { redisConfig, redisPipeline } from './redis.js'

// Daily usage counters (AI advisor, lead form), shared by all serverless
// instances via Redis (see ./redis.js). Without Redis, or if it is
// unreachable, counters fall back to memory of the current instance (best
// effort, resets on cold start).

var DAY_TTL = 2 * 24 * 3600
var memory = new Map()

export function quotaStore() { return redisConfig() ? 'redis' : 'memory' }

// Short, non-reversible id for keys (IPs and license keys are never stored).
export function hashId(s) {
  return crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 20)
}

function memAdd(key, by) {
  var n = (memory.get(key) || 0) + by
  memory.set(key, n)
  if (memory.size > 5000) memory.clear()
  return n
}

async function add(keys, by) {
  if (redisConfig()) {
    try {
      var cmds = []
      keys.forEach(function(k) { cmds.push(['INCRBY', k, String(by)]); cmds.push(['EXPIRE', k, String(DAY_TTL)]) })
      var res = await redisPipeline(cmds)
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
// `ns` separates counters of different features ('ai', 'lead').
export async function takeQuota(checks, ns) {
  var day = new Date().toISOString().slice(0, 10)
  var keys = checks.map(function(c) { return 'afc:' + (ns || 'ai') + ':' + day + ':' + c.id })
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
