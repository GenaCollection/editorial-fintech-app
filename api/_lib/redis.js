// Minimal Redis client over the REST API of Upstash (Vercel Storage →
// Upstash Redis, the successor of Vercel KV). Connecting the database to the
// project adds KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*).

export function redisConfig() {
  var url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  var token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url: String(url).trim().replace(/\/+$/, ''), token: String(token).trim() } : null
}

// Runs commands in one round trip: [['INCRBY', 'k', '1'], …] → [result, …].
// Throws when Redis is not configured or answers with an error.
export async function redisPipeline(commands) {
  var cfg = redisConfig()
  if (!cfg) throw new Error('redis not configured')
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
