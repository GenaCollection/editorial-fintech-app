import test from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import { Readable } from 'node:stream'

// End-to-end check of /api/ai limits against local stand-ins for the AI
// provider and for Redis (same REST pipeline protocol as Upstash / Vercel KV).

var redisData = new Map()
var providerFails = false
var redisDown = false

var server = http.createServer(function(req, res) {
  var body = ''
  req.on('data', function(c) { body += c })
  req.on('end', function() {
    res.setHeader('Content-Type', 'application/json')
    if (req.url === '/v1/chat/completions') {
      if (providerFails) { res.statusCode = 500; return res.end(JSON.stringify({ error: { message: 'boom' } })) }
      return res.end(JSON.stringify({ choices: [{ message: { content: 'Answer' }, finish_reason: 'stop' }] }))
    }
    if (req.url === '/redis/pipeline') {
      if (redisDown) { res.statusCode = 503; return res.end('{}') }
      assert.equal(req.headers.authorization, 'Bearer secret')
      var out = JSON.parse(body).map(function(cmd) {
        if (cmd[0] === 'INCRBY') {
          var n = (redisData.get(cmd[1]) || 0) + Number(cmd[2])
          redisData.set(cmd[1], n)
          return { result: n }
        }
        if (cmd[0] === 'EXPIRE') return { result: 1 }
        return { error: 'ERR unknown command' }
      })
      return res.end(JSON.stringify(out))
    }
    res.statusCode = 404; res.end('{}')
  })
})

var handler
test.before(async function() {
  await new Promise(function(r) { server.listen(0, '127.0.0.1', r) })
  var base = 'http://127.0.0.1:' + server.address().port
  process.env.AI_API_KEY = 'test-key'
  process.env.AI_BASE_URL = base + '/v1'
  process.env.AI_MODEL = 'test-model'
  process.env.KV_REST_API_URL = base + '/redis'
  process.env.KV_REST_API_TOKEN = 'secret'
  process.env.AI_FREE_PER_DAY = '2'
  process.env.AI_IP_PER_DAY = '4'
  process.env.PRO_DEMO_KEYS = 'AFC-TEST-KEY'
  handler = (await import('../api/ai.js')).default
})
test.after(function() { server.close() })

function ask(opts) {
  var req = Readable.from([JSON.stringify({
    lang: 'EN', loan: {}, clientId: opts.cid, licenseKey: opts.key,
    messages: [{ role: 'user', content: 'Hi' }]
  })])
  req.method = 'POST'
  req.headers = { 'x-forwarded-for': opts.ip || '10.0.0.1' }
  return new Promise(function(resolve) {
    var res = {
      statusCode: 200, headers: {},
      setHeader: function(k, v) { this.headers[k] = v },
      status: function(c) { this.statusCode = c; return this },
      json: function(obj) { resolve({ status: this.statusCode, body: obj }); return this }
    }
    handler(req, res)
  })
}

test('free: 2 answers per browser, then 429 with left = 0', async function() {
  var a = await ask({ cid: 'browser-aaaa-1111' })
  assert.equal(a.status, 200); assert.equal(a.body.left, 1)
  var b = await ask({ cid: 'browser-aaaa-1111' })
  assert.equal(b.status, 200); assert.equal(b.body.left, 0)
  var c = await ask({ cid: 'browser-aaaa-1111' })
  assert.equal(c.status, 429); assert.equal(c.body.error, 'quota')
  // counters are in Redis, keyed by hashed ids only
  assert.ok(Array.from(redisData.keys()).every(function(k) { return /^afc:ai:\d{4}-\d{2}-\d{2}:(cid|ip):[0-9a-f]{20}$/.test(k) }))
})

test('per-IP cap stops a new browser id on the same IP, refused requests do not count', async function() {
  // IP 10.0.0.1 has used 2 of 4; the refused request above was refunded.
  assert.equal((await ask({ cid: 'browser-bbbb-2222' })).status, 200)
  assert.equal((await ask({ cid: 'browser-bbbb-2222' })).status, 200)
  var r = await ask({ cid: 'browser-cccc-3333' })
  assert.equal(r.status, 429)
  // another IP is unaffected
  assert.equal((await ask({ cid: 'browser-cccc-3333', ip: '10.0.0.2' })).status, 200)
})

test('a failed AI answer does not use up the allowance', async function() {
  providerFails = true
  var r = await ask({ cid: 'browser-dddd-4444', ip: '10.0.0.3' })
  assert.equal(r.status, 502)
  providerFails = false
  assert.equal((await ask({ cid: 'browser-dddd-4444', ip: '10.0.0.3' })).body.left, 1)
})

test('Pro license keys get their own, larger limit', async function() {
  var r = await ask({ cid: 'browser-aaaa-1111', key: 'AFC-TEST-KEY' })
  assert.equal(r.status, 200)
  assert.equal(r.body.left, 119)
})

test('if Redis is down, the advisor keeps working with in-memory limits', async function() {
  redisDown = true
  try {
    var r = await ask({ cid: 'browser-eeee-5555', ip: '10.0.0.9' })
    assert.equal(r.status, 200)
  } finally { redisDown = false }
})
